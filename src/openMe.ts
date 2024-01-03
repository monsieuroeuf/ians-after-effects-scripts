//@target aftereffects

declare var JSON: any;

(function () {
	//@include "../lib/aequery.js"
	//@include "./listComps.js"
	clearOutput()

	const fname = app.project.file?.displayName
	const theFile = new File(`/Users/ian/tmp/ae/open.me.txt`)
	// const theFile = new File(`/Users/ian/tmp/ae/${fname}.comps.txt`)

	if (!theFile.exists) {
		writeLn("LISTCOMPS!")
		LISTCOMPS.update()
	}

	// const f = new File(theFile)
	theFile.open("r")
	const compName = theFile.readln()
	writeLn(compName)
	theFile.close()

	let c = aeq.getComposition(compName) as CompItem
	if (c) {
		writeLn(`Yep: ${c.name}`)
	} else {
		throw new Error (compName.toString())
	}
	c.openInViewer()

	// app.endUndoGroup()



})();
