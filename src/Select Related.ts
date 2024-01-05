//@target aftereffects

/**
 * Uses aequery's Layer.relatedLayers() to select all parents and children of
 * the selected layers.
 */

(function selectRelated() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select related")

	const selectedLayers = aeq.getSelectedLayers()

	selectedLayers.forEach((currentLayer: Layer) => {
		var allRelatives = aeq.layer.relatedLayers(currentLayer)
		allRelatives.forEach((relation: Layer) => {
			relation.selected = true
		})
	})

})()
