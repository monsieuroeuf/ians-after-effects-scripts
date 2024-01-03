//@target aftereffects

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("ian Comp Renamer");

	let selectedComps = aeq.project.getSelectedComps()
	// $.writeln(`selected: "${selectedComp.name}"`);
	let s = Window.prompt("Prefix?", "banana")
	Window.alert(`${s} is a nice thing to type`)

	let counter = 1

	for (const item of selectedComps) {
		let thing = item as CompItem
		$.writeln(`${item}:${counter}`);
		// thing.name = `${s}:${counter}`
		thing.name = `${s}${thing.name}`
		counter++


	}


})();
