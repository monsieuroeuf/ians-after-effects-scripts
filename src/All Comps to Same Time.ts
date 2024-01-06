//@target aftereffects

/**
 * Sets the current time in all selected comps to 4 seconds. I wrote this to see
 * titles after they've built, and ensure everything looks OK.
 * 
 * Also works with folders, just select top level folders and it will look in
 * them (and their subfolders) for comps – thanks aequery!
 * 
 * @todo hold down a key to set a default for the time
 */

(function allCompsToSameTime() {
	//@include "../lib/aequery.js"

	const DEFAULT_TIME = 4
	let compsToChange: _ItemClasses[] = []

	app.beginUndoGroup("All Comps to Same Time")

	// are we looking at comps or folders?
	aeq.forEach(app.project.selection, (item: _ItemClasses) => {
		if (item instanceof CompItem) {
			compsToChange.push(item)
		}
		if (item instanceof FolderItem) {
			compsToChange.push(...aeq.getComps(item))
		}
	})

	aeq.forEach(compsToChange, (comp: CompItem) => {
		comp.time = DEFAULT_TIME
		comp.openInViewer()
	})
})()
