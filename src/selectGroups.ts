//@target aftereffects
//@include "../lib/aequery.js"

(function () {
	const s = "Stroke Width"
	app.beginUndoGroup("Select groups");
	// stuff
	let selectedComp = aeq.getActiveComp()

	// writeLn(selectedComp.name)

	let layers: Array<Layer> = aeq.getSelectedLayersOrAll()

	aeq.forEach(layers, function (current: Layer) {
		// writeLn(current.name)

		let props = current.property("Contents") as PropertyGroup
		writeLn(String(props.numProperties))
		for (var c = 1; c <= props.numProperties; c++) {
			var currentProp = props(c)
			currentProp.selected = true
		}



		// for (let prop of aeq.getPropertyChildren(current, { groups: true, props: false })) {
		// 	writeLn(prop.name)
		// 	// let r = new RegExp(prop.name, "i")
		// 	// if (s.match(r)) {
		// 	prop.selected = true
		// 	// }
		// }


	})
	// aeq.getProperties(layers, )




})();
