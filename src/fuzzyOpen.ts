//@target aftereffects

declare var JSON: any;

(function () {
	//@include "../lib/aequery.js"
	//@include "./listComps.js"
	//@include "./ianlib.js"

	clearOutput()

	const fuzzyFileToOpen = ianlib.getFuzzyOpenFile()

	// run the listComps script to create the file
	if (!fuzzyFileToOpen.exists) LISTCOMPS.update()

	fuzzyFileToOpen.open("r")
	const compID = fuzzyFileToOpen.readln()
	const compIDNum = parseInt(compID)


	
	// writeLn(compName)
	fuzzyFileToOpen.close()

	// let c = aeq.getComposition(compID) as CompItem
	let c = app.project.itemByID(compIDNum) as CompItem
	if (c) {
		writeLn(`Yep: ${c.name}`)
	} else {
		throw new Error(`Error: couldn't open comp ID: "${compID.toString()}"`)
	}
	c.openInViewer()

})()
