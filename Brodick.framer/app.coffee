# msummaryElementText1.states.a =
# 	color: '#40515B'
# 	
# msummaryElementText1.states.b =
# 	color: '#000'
# 	
# barchart1.onMouseOver (event, layer) ->
# 	msummaryElementText1.animate "b"
# 	
# barchart1.onMouseOut (event, layer) ->
# 	msummaryElementText1.animate "a"  
# 
# for i in [0...mSummaryLabels.subLayers.length]
# 	mSummaryLabels.subLayers[i].states.a =
# 		color: '#40515B'
# 	mSummaryLabels.subLayers[i].states.b =
# 		color: '#000'

toolTipX = toolTip.x
toolTipY = toolTip.y
toolTipTextContent = toolTipText.text

setAnimation = (mouseTarget, dest) ->
	mouseTarget.onMouseOver (event, layer) ->
		dest.animate "a"
	mouseTarget.onMouseOut (event, layer) ->
		dest.animate "b"

setTooltip = (mouseTarget, textContent) ->
	mouseTarget.onMouseOver (event, layer) ->
		toolTipText.text = textContent
	mouseTarget.onMouseMove (event, layer) ->
		toolTip.x = event.pageX - 10
		toolTip.y = event.pageY - toolTip.height
	mouseTarget.onMouseOut (event, layer) ->
		toolTip.x = toolTipX
		toolTip.y = toolTipY
		toolTipText.text = toolTipTextContent

mSummaryLabels.children.forEach (row, i) ->
  row.states.a = scale: 1.1
  row.states.b = scale: 1
  bar = barChart.children[i]
  setAnimation(bar, row)
  setTooltip(bar, 'dupaaaa')
  row.children.forEach (label) ->
    console.log label
    if label instanceof TextLayer
      label.states.a = color: 'green'
      label.states.b = color: 'red'
      setAnimation(bar, label)