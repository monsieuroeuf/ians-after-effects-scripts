//@target aftereffects
//@include "../lib/aequery.js"



(function () {
	app.beginUndoGroup("ian Layer Renamer");

	let selectedLayers = aeq.getSelectedLayers()
	// $.writeln(`selected: "${selectedComp.name}"`);
	let s = Window.prompt("Prefix?", "banana")
	// Window.alert(`${s} is a nice thing to type`)

	let counter = 1

	for (const item of selectedLayers) {
		let thing = item as Layer
		$.writeln(`${item}:${counter}`);
		// thing.name = `${s}:${counter}`
		thing.name = `${s}:${counter}`
		counter++
	}


})();
