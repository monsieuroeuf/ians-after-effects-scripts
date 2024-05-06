//@target aftereffects

/**
 * Creates nulls at the same position as the selected layers, and parents them
 * to each. Also moves each null to be directly above the layer it's parented
 * to, and inherits its label.
*/

(function maskTypeWithShapes() {
	//@include "./lib/aequery.js"
	//@include "./lib/underscore.js"

	app.beginUndoGroup("Mask Type with Shapes")

	const selectedLayers = aeq.getSelectedLayers()
	const thisComp = app.project.activeItem as CompItem

	// make two arrays: one of shapes, and one of text layers
	let shapeArray: Layer[] = []
	let textArray: ShapeLayer[] = []

	selectedLayers.forEach(layer => {
		if (layer instanceof TextLayer) {
			textArray.push(layer)
		}
		if (layer instanceof ShapeLayer) {
			shapeArray.push(layer)
		}
	})

	// sort each array by layer name
	shapeArray = _.sortBy(shapeArray, layer => layer.name)
	textArray = _.sortBy(textArray, layer => layer.name)

	if (textArray.length !== shapeArray.length) {
		alert("Please select an equal number of text layers and nulls.")
		return
	}

	// loop through the text layers
	for (let i=0; i<textArray.length; i++) {
		const currentTextLayer = textArray[i]
		const currentShapeLayer = shapeArray[i] as AVLayer
		currentTextLayer.setTrackMatte(currentShapeLayer, TrackMatteType.ALPHA)
	}





	// alert(textArray.length.toString())


})()
