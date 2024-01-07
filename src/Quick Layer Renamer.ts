//@target aftereffects

/**
 * Asks for a prefix, and renames each layer to that prefix, with a number.
 * e.g. with the prefix "foo", the layers would be named "foo:1", "foo:2", etc.
*/

(function quickLayerRenamer() {
	//@include "../lib/aequery.js"
	//@include "./IanLib.js"

	app.beginUndoGroup("Quick Layer Renamer")
	const KEY_NAME = "quickLayerRenamer"

	let defaultString = IanLib.getPref(KEY_NAME)

	let selectedLayers = aeq.getSelectedLayers()

	let s = Window.prompt("Prefix?", defaultString)
	IanLib.setPref(KEY_NAME, s)

	let counter = 1

	for (let currentLayer of selectedLayers) {
		currentLayer.name = `${s}:${counter}`
		counter++
	}
})()
