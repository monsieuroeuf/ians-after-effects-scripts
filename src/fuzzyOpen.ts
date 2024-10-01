//@target aftereffects

/**
 * Reads a plain text file that contains a comp ID, and opens that comp.
 */

(function fuzzyOpen() {
	//@include "./lib/aequery.js"
	//@include "./listComps.jsx"
	//@include "./lib/IanLib.jsx"

	clearOutput()

	const fuzzyFileToOpen = IanLib.getFuzzyOpenFile()

	// run the listComps script to create the file
	if (!fuzzyFileToOpen.exists) FUZZYOPEN_LISTCOMPS.update()

	fuzzyFileToOpen.open("r")
	const compID = fuzzyFileToOpen.readln()
	// biome-ignore lint/style/useNumberNamespace: <explanation>
	const compIDNum = parseInt(compID)

	fuzzyFileToOpen.close()

	const compToOpen = app.project.itemByID(compIDNum) as CompItem
	if (compToOpen) {
		writeLn(`Yep: ${compToOpen.name}`)
	} else {
		throw new Error(`Error: couldn't open comp ID: "${compID.toString()}"`)
	}
	compToOpen.openInViewer()

})()
