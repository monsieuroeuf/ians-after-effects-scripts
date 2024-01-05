//@target aftereffects

/**
 * Adds a prefix to the name of each selected comp.
 */ 

(function () {
	//@include "../lib/aequery.js"
	//@include "./IanLib.js"

	app.beginUndoGroup("Quick Comp Prefixer")
	const KEY_NAME = "quickCompPrefixer"

	let selectedComps = aeq.project.getSelectedComps()
	let defaultString = IanLib.getPref(KEY_NAME)

	let s = Window.prompt("Prefix?", defaultString)
	IanLib.setPref(KEY_NAME, s)

	for (let currentComp of selectedComps) {
		currentComp.name = `${s}${currentComp.name}`
	}
})()
