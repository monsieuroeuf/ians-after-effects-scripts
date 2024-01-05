//@target aftereffects

// selects all the layers with an ellipse in 'em


(function selectEllipses() {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select ellipses")

	let comp = app.project.activeItem as CompItem

	let shapeLayers = aeq.getSelectedLayersOrAll().filter( (layer:Layer) => {
		return aeq.isShapeLayer(layer)
	})

	// now search the shape layers' PropertyGroups for "ellipse"
	for (let layer of shapeLayers) {
		let ary = aeq.getPropertyChildren(layer, { groups: true }) as PropertyGroup[]
		for (let prop of ary) {
			if (prop.name.match(/ellipse/i)) {
				// layer.selected = true
				prop.selected = true
			}
		}
	}

})()
