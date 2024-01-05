//@target aftereffects

/**
 * Make a shape layer with a rect the size of THIS comp. Holding down the alt
 * key will add an expression to the size, so that it always matches the comp
 * size. Default is blue, but the auto-sizing version is yellow. For some reason.
 */

(function rectangleAroundComp() {
	app.beginUndoGroup("CompRect")

	let comp = app.project.activeItem as CompItem

	let newShape = comp.layers.addShape()
	// let shapeGroup = newShape.property("Contents").addProperty("ADBE Vector Group")
	// let rect = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect") as Property<Shape>
	let shapeGroup = newShape.property("Contents") as PropertyGroup
	let rect = shapeGroup.addProperty("ADBE Vector Shape - Rect") 

	const layerColours = {
		blue: [0, 0.5, 0.9],
		yellow: [1, 0.8, 0],
	}
	let thisLayerColour = layerColours.blue
	let layerName = "CompRect"
	
	const size = rect.property("Size") as Property
	if (ScriptUI.environment.keyboardState.altKey) {
		// add an expression
		size.expression = "[thisComp.width, thisComp.height]"
		thisLayerColour = layerColours.yellow
		layerName = "AutoRect"
	} else {
		// size to comp
		size.setValue([comp.width, comp.height])
	}

	const theFill = shapeGroup.addProperty("ADBE Vector Graphic - Fill")
	const theColour = theFill.property("Color") as Property
	theColour.setValue(thisLayerColour)

	newShape.name = layerName
	newShape.moveToEnd()
})()
