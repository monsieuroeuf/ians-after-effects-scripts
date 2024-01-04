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

	fuzzyFileToOpen.close()

	let compToOpen = app.project.itemByID(compIDNum) as CompItem
	if (compToOpen) {
		writeLn(`Yep: ${compToOpen.name}`)
	} else {
		throw new Error(`Error: couldn't open comp ID: "${compID.toString()}"`)
	}
	compToOpen.openInViewer()

})()
