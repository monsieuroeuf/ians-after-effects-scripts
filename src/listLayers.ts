//@target aftereffects

/**
 * Dumps a list of layers in the current comp to a plain text file.
 */

(function listLayers() {
	//@include "./lib/aequery.js"
	app.beginUndoGroup("List comps")

	const DEST = '/Users/ian/tmp/ae/layers.out.txt'

	const f = new File(DEST)
	f.lineFeed = "Unix"

	f.open("w")

	const thisComp = app.project.activeItem as CompItem

	for (let c = 1; c <= thisComp.layers.length; c++) {
		const currentLayer = thisComp.layers[c]
		f.writeln(currentLayer.name)
		writeLn(currentLayer.name)
	}
	f.close()
})()
