//@target aftereffects

// selects all the layers with an ellipse in em


(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Select ellipses");

	let shapeLayers = []

	let comp = app.project.activeItem as CompItem
	
	// build an array of only shape layers
	for (let i = 1; i <= comp.numLayers; i++) {
		let currentLayer = comp.layer(i)

		// and deselect everything while we're at it
		currentLayer.selected = false
		if (aeq.isShapeLayer(currentLayer)) {
			shapeLayers.push(currentLayer)
		}

	}

	// TAKE ONE
	// let groups = aeq.getProperties(shapeLayers, {groups:true}) as PropertyGroup[]
	// writeLn(groups[1].name)

	// aeq.getProperties(shapeLayers, { groups: true }).forEach(function (banana: Property<any>) {
	// 	if (banana.name.match(/ellipse/i)) {
	// 		writeLn("YASS")
	// 	}
	// })

	// ----------------------------------------

	// TAKE TWO
	// for( let layer of shapeLayers) {
	// 	let ary = aeq.getPropertyChildren(layer) as Property<any>[]
	// 	for (let prop of ary) {
	// 		writeLn(prop.name)
	// 		if (prop.name.match(/ellipse/i)) {
	// 			layer.selected = true
	// 		}
	// 	}

	// }

	// ----------------------------------------

	// now search the shape layers' PropertyGroups for "ellipse"
	for (let layer of shapeLayers) {
		let ary = aeq.getPropertyChildren(layer, { groups: true }) as PropertyGroup[]
		for (let prop of ary) {
			if (prop.name.match(/ellipse/i)) {
				layer.selected = true
			}
		}

	}

})();
