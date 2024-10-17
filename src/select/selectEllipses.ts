//@target aftereffects

/**
 * Selects all the layers with an ellipse in 'em.
 * 
 * @todo make a speeder "non aeq()" version
 */

(function selectEllipses() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select ellipses")

	const shapeLayers = aeq.getSelectedLayersOrAll().filter( (layer:Layer) => {
		return aeq.isShapeLayer(layer)
	})

	// now search the shape layers' PropertyGroups for "ellipse"
	for (const layer of shapeLayers) {
		const ary = aeq.getPropertyChildren(layer, { groups: true }) as PropertyGroup[]
		for (const prop of ary) {
			if (prop.name.match(/ellipse/i)) {
				// layer.selected = true
				prop.selected = true
			}
		}
	}
})()
