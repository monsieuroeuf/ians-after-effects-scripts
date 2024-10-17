//@target aftereffects

/**
 * Select layers in the active compostion that don't have any parent, while
 * deselecting those that do.
 */

(function selectLayersWithoutParents() {

	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select layers without parents")

	aeq.forEachLayer(aeq.getActiveComp(), (layer: Layer) => {
		if (layer.parent === null) {
			layer.selected = true
		} else {
			layer.selected = false
		}
	})

})()