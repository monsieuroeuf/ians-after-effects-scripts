//@target aftereffects

/**
 * Select all comps that are not nested in any other comp
 */

(function selectNonNestedComps() {
	//@include "./lib/aequery.js"
	app.beginUndoGroup("Select Non-nested Comps")

	aeq.getCompositions().forEach((comp: CompItem) => {
		// what if this comp has no ancestors? what then?
		if (comp.usedIn.length == 0) comp.selected = true
	})
})()
