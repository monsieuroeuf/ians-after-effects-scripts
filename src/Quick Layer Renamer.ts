//@target aftereffects

/**
 * Quick Layer Renamer
 * 
 * Asks for a prefix, and renames each layer to that prefix, with a number.
 * e.g. with the prefix "foo", the layers would be named "foo:1", "foo:2", etc.
*/

(function () {
	//@include "../lib/aequery.js"
	//@include "./ianlib.js"

	app.beginUndoGroup("Quick Layer Renamer")
	const KEY_NAME = "quickLayerRenamer"

	let defaultString = ianlib.getPref(KEY_NAME)

	let selectedLayers = aeq.getSelectedLayers()

	let s = Window.prompt("Prefix?", defaultString)
	ianlib.setPref(KEY_NAME, s)

	let counter = 1

	for (let thing of selectedLayers) {
		thing.name = `${s}:${counter}`
		counter++
	}
})()
