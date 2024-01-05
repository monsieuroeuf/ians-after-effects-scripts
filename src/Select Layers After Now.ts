//@target aftereffects

/**
 * Select Layers After Now
 * 
 * Selects all layers after the current time in the active composition. If you
 * hold down alt (option) it will select all layers *before* the current time.
 * 
 */

// ensure inOrOut is either "inPoint" or "outPoint"
type InOrOut = "inPoint" | "outPoint"

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select layers after now")

	const thisComp = aeq.getActiveComp()
	const now      = thisComp.time

	// defaults
	let layerSelect      = true
	let inOrOut: InOrOut = "inPoint"

	if (ScriptUI.environment.keyboardState.altKey) {
		// flip the logic – select layers BEFORE now
		layerSelect = !layerSelect
		inOrOut = "outPoint"
	}

	aeq("layer").forEach((currentLayer: Layer) => {
		if (currentLayer[inOrOut] > now) {
			currentLayer.selected = layerSelect
		} else {
			currentLayer.selected = !layerSelect
		}
	})

})()
