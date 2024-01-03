//@target aftereffects
//@include "../lib/aequery.js"




(function () {
	app.beginUndoGroup("Select orphans");
	// stuff

	aeq.getCompositions().forEach((comp: any) => {

		// what if this comp has no ancestors? what then?
		if (comp.usedIn == 0) {
			comp.selected = true
		}

	})
})();
