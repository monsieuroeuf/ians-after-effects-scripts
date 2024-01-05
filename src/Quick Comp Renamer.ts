//@target aftereffects

/**
 * Quick Comp Renamer
 * 
 * Adds a prefix to the name of each selected comp.
 * 
 * @category comps
 * @param {string} [s=""] - The prefix to add to the comp name.
 * @returns {void}
 * 
 */ 

(function () {
	//@include "../lib/aequery.js"
	//@include "./IanLib.js"

	app.beginUndoGroup("Quick Comp Renamer")
	const KEY_NAME = "quickCompRenamer"

	let selectedComps = aeq.project.getSelectedComps()
	let defaultString = IanLib.getPref(KEY_NAME)

	let s = Window.prompt("Prefix?", defaultString)
	IanLib.setPref(KEY_NAME, s)

	for (let currentComp of selectedComps) {
		currentComp.name = `${s}${currentComp.name}`
	}
})()
