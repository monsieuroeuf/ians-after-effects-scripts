//@target aftereffects

/**
 * Adds a prefix to the name of each selected comp. That's it. 
 * 
 * Here's my favourite way to use this. If you prefix a comp with a name
 * followed by a forward slash, during rendering it will be placed in a folder
 * with that name. For example, if you have a series of comps named like so:
 * 
 * ```
 * cool-comps/banana
 * cool-comps/mango
 * cool-comps/pear
 * ```
 * 
 * … then the renderer will output files called "banana", "mango", and "pear" in
 * a folder named "cool-comps" (if it exists).
 * 
 * I made a video about this: https://youtu.be/d1WLeTFQ15k
 */ 

(function quickCompPrefixer() {
	//@include "./lib/aequery.js"
	//@include "./lib/IanLib.js"

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
