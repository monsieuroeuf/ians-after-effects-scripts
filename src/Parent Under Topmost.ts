//@target aftereffects

/**
 * Parents the selected layers to the topmost layer, while trying to keep any
 * existing hierarchy intact.
 */

(function parentUnderTopmost() {
	//@include "./lib/aequery.js"
	app.beginUndoGroup("Parent from topmost")

	const activeComp = app.project.activeItem as CompItem
	const selectedLayers = activeComp.selectedLayers

	// sort by index, then take the first one
	const topLayer = selectedLayers.sort((a, b) => {
		return a.index - b.index
	}).shift()

	// if it's in an existing hierarchy, take it out
	topLayer.parent = null

	for (let currentLayer of selectedLayers) {

		// hide if the shift key is down
		if (ScriptUI.environment.keyboardState.shiftKey) {
			currentLayer.enabled = false
		}

		// ignore if it's the top layer
		if (currentLayer === topLayer) continue

		// ignore if it already has a parent
		if (currentLayer.parent) continue

		currentLayer.parent = topLayer
	}
})()
