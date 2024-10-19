//@target aftereffects

/**
 * Sets the current time in all selected comps to 4 seconds. I wrote this to see
 * titles after they've built, and ensure everything looks OK.
 * 
 * Also works with folders, just select top level folders and it will look in
 * them (and their subfolders) for comps – thanks aequery!
 * 
 * (Wondering what "Poster Time" is? It refers to the thumbnail that's shown in
 * the Project panel. Often my comps start out black, so I set the Poster Time to
 * 4 seconds so I can see what's in the comp without opening it.)
 * 
 * @todo hold down a key to set a default for the time
 * @todo hold down a key to set Poster Time as well
*/

(function allCompsToSameTime() {
	//@include "./lib/aequery.js"

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
		app.executeCommand(2012) // Select the "Set Poster Time" menu itemjust 
	})
})()
