//@target aftereffects

/**
 * Recursively select children of selected layers. You can right-click on a
 * layer and do the same thing, but this is helpful enough that I wanted to
 * assign a keyboard shortcut to it.
 * 
 * 2024-03-13 update: deselect the parent layer after selecting its children.
 */

(function selectDescendants() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select descendants")

	const selectedLayers = aeq.getSelectedLayers()

	selectedLayers.forEach((selectedLayer: Layer) => {
		const theKids = aeq.layer.allChildren(selectedLayer)
		theKids.forEach((kid: Layer) => {
			kid.selected = true
		})
		selectedLayer.selected = false
	})
})()
