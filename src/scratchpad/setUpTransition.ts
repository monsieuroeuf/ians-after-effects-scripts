//@target aftereffects

(function setUpTransition() {
	app.beginUndoGroup("Set up transition")

	const thisComp = app.project.activeItem as CompItem
	const selectedLayers = thisComp.selectedLayers
	
	// apply hero preset to selected layers
	selectedLayers.forEach(layer => {
		layer.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/transitions/vf-hero.ffx"))
	})

	// make a control null
	const controlNull = thisComp.layers.addNull()
	controlNull.name = "_control"

	// deselect all layers
	for (let i = 1; i <= thisComp.numLayers; i++) {
		thisComp.layer(i).selected = false
	}

	// select the control null
	controlNull.selected = true
	controlNull.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/transitions/vf-control-←.ffx"))

	// move it to the bottom of the layer stack
	controlNull.moveToEnd()

	// select the last layer that was previously selected
	selectedLayers[selectedLayers.length - 1].selected = true

	const myIn = thisComp.time
	const myOut = thisComp.time + (1 / thisComp.frameRate) * 30


	// create three shape layers
	// apply a preset to each
	const shapeLayer1 = thisComp.layers.addShape()
	shapeLayer1.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/shapes/vf-white.ffx"))
	shapeLayer1.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/transitions/vf-inBetween-shape.ffx"))
	shapeLayer1.inPoint = thisComp.time
	// make it 30 frames long
	shapeLayer1.outPoint = myOut
	
	// set current layer in point to current time


	const shapeLayer2 = thisComp.layers.addShape()
	shapeLayer2.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/shapes/vf-red.ffx"))
	shapeLayer2.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/transitions/vf-inBetween-shape.ffx"))
	shapeLayer2.inPoint = thisComp.time
	shapeLayer2.outPoint = myOut
	
	const shapeLayer3 = thisComp.layers.addShape()
	shapeLayer3.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/shapes/vf-grey.ffx"))
	shapeLayer3.applyPreset(File("/Volumes/ARC8050T3-4/work/VOD010-motion-guidelines/support/presets/transitions/vf-inBetween-shape.ffx"))
	shapeLayer3.inPoint = thisComp.time
	shapeLayer3.outPoint = myOut


	// move the new shape layers to be above the last selected layer
	shapeLayer1.moveBefore(selectedLayers[selectedLayers.length - 1])
	shapeLayer2.moveBefore(shapeLayer1)
	shapeLayer3.moveBefore(shapeLayer2)



}

)()
