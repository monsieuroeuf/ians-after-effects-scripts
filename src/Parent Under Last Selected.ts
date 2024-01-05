//@target aftereffects

/**
 * 
 * Parents the selected layers to the last selected layer, while trying to keep
 * the hierarchy intact.
 * 
 */

(function lastSelectedIsParent() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Last Selected is Parent")

	// save the selected layers
	const selectedLayers = aeq.getSelectedLayers()

	// this is the last layer that you've selected
	let lastSelected = selectedLayers.pop()

	// if it's in an existing hierarchy, take it out
	lastSelected.parent = null

	// re-parent 
	selectedLayers.forEach((currentLayer: Layer) => {
		if (currentLayer.parent) {
			// if currentLayer parent is one of the selected layers, then leave it alone
			if (selectedLayers.indexOf(currentLayer.parent) !== -1) return
		}
		currentLayer.parent = lastSelected
	})

})()
