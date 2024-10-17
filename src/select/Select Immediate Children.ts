//@target aftereffects

/**
 * Given a selection, select only the immediate children of those layers (not
 * the whole tree).
 */

(function selectImmediateChildren() {
	//@include "./lib/aequery.js"
	app.beginUndoGroup("Select immediate children")

	aeq.getSelectedLayers().forEach((layer: Layer) => {
		layer.selected = false
		for (const child of aeq.layer.children(layer)) {
			child.selected = true
		}
	})
})()
