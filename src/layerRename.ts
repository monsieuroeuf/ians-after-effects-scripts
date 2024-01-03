//@target aftereffects

// VERY quick 'n' dirty layer renamer.
// asks for a prefix, and renames all selected layers with that prefix and a number

(function () {
	//@include "./ianlib.js"
	app.beginUndoGroup("Layer rename");

	const KEY_NAME = "layerRename"
	const defaultString = ianlib.getPref(KEY_NAME)

	const comp = app.project.activeItem as CompItem

	if (!comp) {
		alert("No comp selected")
		return
	}
	const layers = comp.selectedLayers

	if (!layers.length) {
		alert("Select the layers you'd like to rename")
		return
	}

	const newName = prompt("What new name innit", defaultString)

	for (var c = 0; c < layers.length; c++) {
		let current = layers[c];
		current.name = `${newName}:${c}`
	}

})();
