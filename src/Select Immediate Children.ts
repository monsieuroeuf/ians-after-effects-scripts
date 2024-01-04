//@target aftereffects

// Given a selection, select the immediate children of those layers.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select immediate children")

	aeq.getSelectedLayers().forEach((layer: Layer) => {
		layer.selected = false
		for (const child of aeq.layer.children(layer)) {
			child.selected = true
		}
	})
})()
