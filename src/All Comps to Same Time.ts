//@target aftereffects

/**
 * Sets the current time in all selected comps to 4 seconds. So I can see titles
 * after they've built, and ensure everything looks OK.
 * 
 * @todo make it work with more selections, e.g. loose comps or more than one folder
 * @todo hold down a key to set a default for the time
 */

(function allCompsToSameTime() {
	//@include "../lib/aequery.js"
	var sel = app.project.activeItem;
	var compsToChange;

	if (sel && sel.typeName === "Folder") {
		compsToChange = aeq.getComps(sel);
	} else {
		compsToChange = aeq.project.getSelectedComps();
	}

	aeq.forEach(compsToChange, function (comp) {
		comp.time = 4;
		comp.openInViewer();
	});
})();
