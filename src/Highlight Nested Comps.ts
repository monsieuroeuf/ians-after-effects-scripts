//@target aftereffects

// First, deselect everything in the project. Then, select every comp that is
// used in another comp.

(function () {
	//@include "../lib/aequery.js"
	app.beginUndoGroup("Highlight Nested Comps");

	// const selectedCompAry = aeq.getComps().filter((comp: CompItem) => comp.selected)
	const allCompAry = aeq.getComps()
	
	// deselect everything
	for (let item of app.project.selection) {
		item.selected = false
	}

	// select every comp that has a "usedIn" array with a length greater than 0
	for (let currentComp of allCompAry) {
		// what if this comp has no ancestors? what then?
		if (currentComp.usedIn.length > 0) {
			currentComp.selected = true
		}
	}
})();
