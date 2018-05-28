# Using Benjamin's input module: 
# https://github.com/benjamindenboer/FramerInput
{InputLayer} = require "input"

# I've spent a lot of time playing with inputs in Framer. I hope you find this UI kit useful for creating your own realistic form prototypes. There are faster, simpler ways to write much of this code but I've chosen examples that make it easier to learn basics. Happy Framing!
# — Taylor
# PS. Need help? Contact me at taylor@uxtools.co

# Initial Setup

# Reset the cursor to normal
document.body.style.cursor = "auto"

# Turn off purple hints
Framer.Extras.Hints.disable()

# Make the frame scrollable
scroll = ScrollComponent.wrap(Main)
scroll.mouseWheelEnabled = true
scroll.scrollHorizontal = false

Main.props = 
	x: 0
	y: 0
	width: Screen.width


# Travel Form

# Original Form Data

# Object where we store the data
data =
	name: ""
	password: ""
	type: "Dog"
	age: 2
	notes: ""
	personality: ""
	fixed: false

# Function used to display data on screen using the "results" textLayer
displayFormData = () ->
	results.text = JSON.stringify(data)
	
# Fire it on load
displayFormData()

# ✏️ Text Input

# This function wraps the layer in a real input
# ------
# The first argument is base rectangle of the input
# The second argument is the text within it
input1 = InputLayer.wrap(TextInput1, TextInput1.selectChild("PlaceholderText"))
# When the user types...
input1.onValueChange ->
	# Store the data in the Object
	data.name = input1.value
	# And display it on the screen.
	displayFormData()

# Learn more here: # https://github.com/benjamindenboer/FramerInput

# ⬇️ Drop Down

# When the drop down is clicked
DropDown1.onClick () ->
	
	# Create a variable for the menu
	dropDownMenu = DropDown1.selectChild("DropDownMenu")
	
	# Show or hide its menu
	if dropDownMenu.visible
		dropDownMenu.visible = false
	else
		dropDownMenu.visible = true

	# For each menu option
	for option, i in dropDownMenu.children
		# When it's clicked
		dropDownMenu.children[i].onClick (event, layer) ->
			# Show the selected option in the drop down
			DropDown1.selectChild("text").text = layer.text
			# Update the data
			data.type = layer.text
			# Display data on screen
			displayFormData()
		# Update the cursor on hover
		dropDownMenu.children[i].onMouseOver (event, layer) ->
			document.body.style.cursor = "pointer"
		dropDownMenu.children[i].onMouseOut (event, layer) ->
			document.body.style.cursor = "auto"

# ⏫ Stepper

# This function wraps the layer in a real input
stepper1 = InputLayer.wrap(Stepper1, Stepper1.selectChild("PlaceholderText"))
stepper1.value = 2
stepUp = Stepper1.selectChild("StepUp")
stepDown = Stepper1.selectChild("StepDown")

increaseValue = () ->
	currentValue = parseInt(stepper1.value)
	stepper1.value = currentValue + 1
	# Store the data in the Object
	data.age = stepper1.value
	# And display it on the screen.
	displayFormData()

decreaseValue = () ->
	currentValue = parseInt(stepper1.value)
	stepper1.value = currentValue - 1
	# Store the data in the Object
	data.age = stepper1.value
	# And display it on the screen.
	displayFormData()

# When the up arrow is clicked
stepUp.onClick () ->
	# Run the increaseValue function
	increaseValue()

# When the down arrow is clicked
stepDown.onClick () ->
	# Run the decreaseValue function
	decreaseValue()

# Add an event
stepper1._inputElement.addEventListener 'keydown', (event) ->
	# If it's the arrow up key
	if event.which == 38
		increaseValue()
	# If it's the arrow down key
	if event.which == 40
		decreaseValue()
		
# When the value changes...
# Note: this won't catch the clicks on the arrows
# 		because they aren't real events on the input
stepper1.onValueChange ->
	# Store the data in the Object
	data.age = stepper1.value
	# And display it on the screen.
	displayFormData()

# 📝 Multi-line Text Input

# This function wraps the layer in a real input
input2 = InputLayer.wrap(TextArea1, TextArea1.selectChild("PlaceholderText"), multiLine: true)
# When the user types...
input2.onValueChange ->
	# Store the data in the Object
	data.notes = input2.value
	# And display it on the screen.
	displayFormData()

# 🔘 Radio Buttons

# Create array of radio buttons
radioButtons = [RadioBase1, RadioBase2, RadioBase3]

# Loop through the array
for button, i in radioButtons
	# Find the "outerCircle" child layer
	# and creates states for it
	button.selectChild("outerCircle").states =
		selected:
			backgroundColor: "#1199EE"
			borderColor: "transparent"
		deselected:
			backgroundColor: "white"
			borderColor: "#CED4DA"
	# When a radio button is clicked
	radioButtons[i].onClick (event, layer) ->
		# Deselect all the radio buttons
		for button, c in radioButtons
			radioButtons[c].selectChild("outerCircle").stateSwitch("deselected")
		# Select the one that was clicked
		layer.selectChild("outerCircle").stateSwitch("selected")
		# Update the data object
		data.personality = layer.selectChild("label").text
		# And display it on the screen.
		displayFormData()

# ☑️ Check Box

# Create states for the check icon
CheckBox1.selectChild("CheckIcon").states =
	selected:
		fill: "#1199EE"
		animationOptions:
			time: .1
	deselected:
		fill: "white"
		animationOptions:
			time: .1

# When the check box is clicked
CheckBox1.onClick (event, layer) ->
	checkIcon = this.selectChild("CheckIcon")
	# Toggle the states of the icon
	checkIcon.stateCycle("selected", "deselected")
	# Use the name of the state to update the data property
	if checkIcon.states.current.name == "selected"
		data.fixed = true
	else
		data.fixed = false
	# Display the data on screen
	displayFormData()


# Checkout Form

# 🙍‍♀️ Name on Card Input

# Set up the name input
name1 = InputLayer.wrap(NameField, NameField.selectChild("PlaceholderText"))

# When the user types in the field
name1.onValueChange () ->
	# Assign the icon to a variable
	checkIcon = name1.selectChild("Icon")
	# If there's anything in the field
	if name1.value && checkIcon.opacity == 0
		# Show the icon
		checkIcon.animate
			opacity: 1
			y: checkIcon.y - 10
			options:
				time: .2
	# If the field is empty
	else if !name1.value
		# Hide the icon
		checkIcon.animate
			opacity: 0
			y: checkIcon.y + 10
			options:
				time: .2

# 💳 Credit Card Input

cardNumber1 = InputLayer.wrap(CardNumberField1, CardNumberField1.selectChild("PlaceholderText"))

# using layer._inputElement lets us access the raw HTML input element. By changing to type="tel", we're making the browser think the input is a telephone number. This is useful on mobile devices for bringing up the numeric keypad instead of the standard keyboard.
cardNumber1._inputElement.type = "tel"


# Every time a key is pressed in the credit card field...
cardNumber1._inputElement.onkeyup = (event) ->

	# The .onkeyup event contains a code we can read to determine was key was pressed. To make this input helpful, we're locking down most keys but still allowing:
	# Numbers (48–57)
	# Modifier keys (16–18)
	# Arrow keys (37–40)
	# Backspace (8)
	# Tab (9)
	if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 16 && event.which != 17 && event.which != 18 && event.which != 9 && !(event.which >= 37 && event.which <= 40))
		# If the keycode isn't on our list, remove the character from the input
		modCardNumber = cardNumber1.value.slice(0, cardNumber1.value.length-1)
		cardNumber1.value = modCardNumber
		
		
	# Capture the current value in the text field
	rawCardNumber = cardNumber1.value
	rawCardNumber = rawCardNumber.replace(/\s+/g, '')
		
	#----------------------------------
	#	FORMATTING CARD NUMBER
	#----------------------------------
	# Enforce correct format and spacing by inserting spaces every 4 characters
	
	if rawCardNumber.length > 16
		modCardNumber = rawCardNumber.slice(0, 4) + " " + rawCardNumber.slice(4,8) + " " + rawCardNumber.slice(8,12) + " " + rawCardNumber.slice(12,16)
		cardNumber1._inputElement.value = modCardNumber
	# Check for the third space at position 14
	else if rawCardNumber.length > 12
		modCardNumber = rawCardNumber.slice(0, 4) + " " + rawCardNumber.slice(4,8) + " " + rawCardNumber.slice(8,12) + " " + rawCardNumber.slice(12,rawCardNumber.length)
		cardNumber1._inputElement.value = modCardNumber
	# Check for the second space at position 9
	else if rawCardNumber.length > 8
		modCardNumber = rawCardNumber.slice(0, 4) + " " + rawCardNumber.slice(4,8) + " " + rawCardNumber.slice(8,rawCardNumber.length)
		cardNumber1._inputElement.value = modCardNumber
	# Check for the first space at position 4
	else if rawCardNumber.length > 4
		modCardNumber = rawCardNumber.slice(0, 4) + " " + rawCardNumber.slice(4,rawCardNumber.length)
		cardNumber1._inputElement.value = modCardNumber


	#----------------------------------
	#		ANIMATING ICONS
	#----------------------------------
	# Find the correct card numbers here: https://creditcardjs.com/credit-card-type-detection
	
	# American Express card start with 34 or 37
	if rawCardNumber.charAt(0) == "3" && (rawCardNumber.charAt(1) == "4" || rawCardNumber.charAt(1) == "7")
		# If the icon is hidden
		if AmexIcon.opacity == 0
			# Show it by animating opacity and y position
			AmexIcon.animate
				opacity: 1
				y: AmexIcon.y - 10
				options:
					time: .2
					
	# Master Card starts with 51–55
	else if rawCardNumber.charAt(0) == "5" && (rawCardNumber.charAt(1) == "1" || rawCardNumber.charAt(1) == "2"|| rawCardNumber.charAt(1) == "3"|| rawCardNumber.charAt(1) == "4"|| rawCardNumber.charAt(1) == "5")
		# If the icon is hidden
		if MasterCardIcon.opacity == 0
			# Show it by animating opacity and y position
			MasterCardIcon.animate
				opacity: 1
				y: MasterCardIcon.y - 10
				options:
					time: .2
					
	# Visa starts with 4
	else if rawCardNumber.charAt(0) == "4"
		# If the icon is hidden
		if VisaIcon.opacity == 0
			# Show it by animating opacity and y position
			VisaIcon.animate
				opacity: 1
				y: VisaIcon.y - 10
				options:
					time: .2
					
	# Discover starts with a lot of numbers, usually 6
	else if rawCardNumber.charAt(0) == "6"
		# If the icon is hidden
		if DiscoverIcon.opacity == 0
			# Show it by animating opacity and y position
			DiscoverIcon.animate
				opacity: 1
				y: DiscoverIcon.y - 10
				options:
					time: .2
	# if the numbers don't match any of those cards
	else			
		# Create an array of all the card icons
		CCIcons = [AmexIcon,MasterCardIcon,DiscoverIcon,VisaIcon]
		# loop through the card icons
		for icon in CCIcons
			# if the icon is visible
			if icon.opacity == 1
				# hide the icon
				icon.animate
					opacity: 0
					y: icon.y + 10
					options:
						time: .2
	
	# If it looks like a full credit card number, turn the lock icon blue
	if rawCardNumber.length > 15
		LockIcon.animate
			fill: "#1199EE"
			options:
				time: .1
	# If the number isn't long enough to be a credit card, turn the lock icon gray
	else
		LockIcon.animate
			fill: "#CCC"
			options:
				time: .1

# 📅 Date Input

dateInput1 = InputLayer.wrap(DateField1, DateField1.selectChild("PlaceholderText"))

dateInput1._inputElement.onkeypress = () ->

# using layer._inputElement lets us access the raw HTML input element. By changing to type="tel", we're making the browser think the input is a telephone number. This is useful on mobile devices for bringing up the numeric keypad instead of the standard keyboard.
dateInput1._inputElement.type = "tel"


# Every time a key is pressed in the credit card field...
dateInput1._inputElement.onkeyup = (event) ->
	
	# Capture the current value in the text field
	rawDate = dateInput1.value
	# Remove any slashes to clean the numbers
	rawDate = rawDate.replace(/\/+/g, '')
	
	# The on keydown event contains a code we can read to determine was key was pressed. To make this input helpful, we're locking down most keys but still allowing:
	# Numbers (48–57)
	# Modifier keys (16–18)
	# Arrow keys (37–40)
	# Backspace (8)
	# Tab (9)
	if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 16 && event.which != 17 && event.which != 18 && event.which != 9 && !(event.which >= 37 && event.which <= 40))
		# If the keycode isn't on our list, prevent it from happening
		event.preventDefault()
	
	#----------------------------------
	#	FORMATTING DATE
	#----------------------------------
	# Enforce correct format and spacing by inserting / after 2 characters
	if rawDate.length > 2
		modDate = rawDate.slice(0, 2) + "/" + rawDate.slice(2,4)
		dateInput1._inputElement.value = modDate

	#----------------------------------
	#	SHOW CHECK MARK
	#----------------------------------
	dateIcon = dateInput1.selectChild("Icon")
	
	if dateInput1.value.length == 5 && dateInput1.value.charAt(2) == "/"
		if !dateIcon.opacity
			dateIcon.animate
				opacity: 1
				y: dateIcon.y - 10
				options:
					time: .2
	else
		if dateIcon.opacity == 1
			dateIcon.animate
				opacity: 0
				y: dateIcon.y + 10
				options:
					time: .2

# 🔢 CVC Input

cvcInput1 = InputLayer.wrap(CVCField1, CVCField1.selectChild("PlaceholderText"))

# using layer._inputElement lets us access the raw HTML input element. By changing to type="tel", we're making the browser think the input is a telephone number. This is useful on mobile devices for bringing up the numeric keypad instead of the standard keyboard.
cvcInput1._inputElement.type = "tel"


# Every time a key is pressed in the credit card field...
cvcInput1._inputElement.onkeyup = (event) ->
	
	# Capture the current value in the text field
	rawNumber = cvcInput1.value

	# The on keydown event contains a code we can read to determine was key was pressed. To make this input helpful, we're locking down most keys but still allowing:
	# Numbers (48–57)
	# Modifier keys (16–18)
	# Arrow keys (37–40)
	# Backspace (8)
	# Tab (9)
	if ((event.which < 48 || event.which > 57) && event.which != 8 && event.which != 16 && event.which != 17 && event.which != 18 && event.which != 9 && !(event.which >= 37 && event.which <= 40))
		# If the keycode isn't on our list, prevent it from happening
		event.preventDefault()

	#----------------------------------
	#	FORMATTING DATE
	#----------------------------------
	# Enforce correct format and spacing by inserting / after 2 characters
	# Check the length of the number, then check for a space, then make sure backspace works
	if rawNumber.length > 3
		modNumber = rawNumber.slice(0, 3)
		cvcInput1._inputElement.value = modNumber

	#----------------------------------
	#	SHOW CHECK MARK
	#----------------------------------
	cvcIcon = cvcInput1.selectChild("Icon")

	if cvcInput1.value.length > 2
		if !cvcIcon.opacity
			cvcIcon.animate
				opacity: 1
				y: cvcIcon.y - 10
				options:
					time: .2
	else
		if cvcIcon.opacity == 1
			cvcIcon.animate
				opacity: 0
				y: cvcIcon.y + 10
				options:
					time: .2


# Sign Up Form

# ✉️ Email Input

# Assign the email input to a variable
email1 = InputLayer.wrap(EmailField1, EmailField1.selectChild("PlaceholderText"))

# using layer._inputElement lets us access the raw HTML input element. By changing to type="email", we'll help the browser serve up the appropriate keyboard on various devices.
email1._inputElement.type = "email"

# When the user types in the field
email1._inputElement.onblur = () ->
	# Assign the icons to variables
	checkIcon = email1.selectChild("CheckIcon")
	alertIcon = email1.selectChild("AlertIcon")
	
	# Set up some functions to make it easier to show and hide multiple layers
	showAlerts = () ->
		# Show the icon
		if alertIcon.opacity == 0
			alertIcon.animate
				opacity: 1
				y: alertIcon.y - 10
				options:
					time: .2
			# Show the alert message
			AlertMessage.animate
				opacity: 1
				y: AlertMessage.y - 10
				options:
					time: .2
	hideAlerts = () ->
		if alertIcon.opacity == 1
			# Hide the alert icon
			alertIcon.animate
				opacity: 0
				y: alertIcon.y + 10
				options:
					time: .2
			# Hide the alert message
			AlertMessage.animate
				opacity: 0
				y: AlertMessage.y + 10
				options:
					time: .2
	showCheck = () ->
		if checkIcon.opacity == 0
			checkIcon.animate
				opacity: 1
				y: checkIcon.y - 10
				options:
					time: .2
	hideCheck = () ->
		if checkIcon.opacity == 1
			checkIcon.animate
				opacity: 0
				y: checkIcon.y + 10
				options:
					time: .2
					
					
	# If the field is empty
	if !email1.value
		# Hide everything
		hideAlerts()
		hideCheck()
		
	# If the email looks correct (contains @ and .)
	if email1.value && (email1.value.indexOf("@") != -1) && (email1.value.indexOf(".") != -1)
		showCheck()
		hideAlerts()
	# If the email doesn't look correct (is missing @ and .)
	else if email1.value && ((email1.value.indexOf("@") == -1) || (email1.value.indexOf(".") == -1)) && alertIcon.opacity == 0
		showAlerts()
		hideCheck()

# 🔒 Password Field

# Assign the email input to a variable
password1 = InputLayer.wrap(PasswordField1, PasswordField1.selectChild("PlaceholderText"))

# using layer._inputElement lets us access the raw HTML input element. We can use this to change the type of input to password, so the browser automatically hides the characters.
password1._inputElement.type = "password"


#-------------------

# Firefox Alert

# Show an alert if they open in Firefox
# Currently the input module doesn't work in Firefox
if navigator.userAgent.indexOf("Firefox") > 0
	alert("Sorry, Framer doesn't work very well with Firefox ¯\_(ツ)_/¯. Try Chrome or Safari instead.")
