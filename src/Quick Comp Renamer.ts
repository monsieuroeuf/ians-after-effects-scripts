//@target aftereffects

/**
 * Adds a prefix to the name of each selected comp.
 * 
 */

(function quickCompRenamer() {
	//@include "../lib/aequery.js"
	//@include "./ianlib.js"

	app.beginUndoGroup("Quick Comp Renamer")
	const KEY_NAME = "quickCompRenamer"

	let selectedComps = aeq.project.getSelectedComps()
	let defaultString = ianlib.getPref(KEY_NAME)

	let s = Window.prompt("Prefix?", defaultString)
	ianlib.setPref(KEY_NAME, s)

	for (let currentComp of selectedComps) {
		currentComp.name = `${s}${currentComp.name}`
	}
})()
