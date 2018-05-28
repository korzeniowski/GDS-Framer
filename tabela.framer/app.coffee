names = ["Paweł Hawrylak", "Krystian Polański", "Karolina Miąsik", "Marzena Kawa", "Błażej Chwoła", "Patrycja Margasińska"]

# container = new Layer
#	width: tableRow.width+60
#	height: tableRow.height*6+60
#	backgroundColor: "#f2f2f2"
#container.centerX()
#container.y = 100

padding = 30



scroll = new ScrollComponent
	width: tableRow.width + padding*2
	height: tableRow.height*6 + padding*2
	backgroundColor: "rgba(193,238,255,1)"
	scrollHorizontal: false
	borderRadius: 16
scroll.centerX()
scroll.y = 100

for i in [0..10]
	newTableRow=tableRow.copy()
	newTableRow.y=newTableRow.height*(i+0)+padding
	newTableRow.superLayer = scroll.content
	newTableRow.centerX()
	
	
	newTableRow.selectChild('nameText').text=names[i]
	newTableRow.selectChild('userpic').image=Utils.randomImage()
	
	newTableRow.selectChild('actionButton').onMouseOver ->
		newTableRow.selectChild('actionButton').animate
			properties:
				backgroundColor: "#000"
	newTableRow.selectChild('actionButton').onMouseOut ->
		newTableRow.selectChild('actionButton').animate
			properties:
				backgroundColor: "#00AAFF"

	newTableRow.states = 
		a:
			scale: 2
		b:
			scale: 1
				
	newTableRow.selectChild('actionButton').onClick ->
		newTableRow.originY = 0
		newTableRow.originX = 1
		newTableRow.stateCycle("a", "b")

	
	newTableRow.on Events.MouseOver, ->
		this.animate
			properties:
				backgroundColor: "#f2f2f2"
			time: 0.2
		newTableRow.selectChild('nameText').originX = 0
		newTableRow.selectChild('nameText').animate
			properties:
				scale:1.2
	newTableRow.on Events.MouseOut, ->
		this.animate
			properties:
				backgroundColor: "#fff"
			time: 0.1
		newTableRow.selectChild('nameText').animate
			properties:
				scale:1	
	
	newTableRow.expanded = false
	
	newTableRow.onTap -> toggleExpand(@, 96)

toggleExpand = (newTableRow, distance) ->
	distance = if newTableRow.expanded is false then distance else -distance
	
	newTableRow.animate
		height: newTableRow.height + distance
		
	for sib in newTableRow.siblings
		if sib.y > newTableRow.y
			sib.animate
				y: sib.y + distance
				
	newTableRow.expanded = !newTableRow.expanded
	
	Utils.delay .3, -> scroll.updateContent()