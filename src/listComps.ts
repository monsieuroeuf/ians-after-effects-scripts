//@target aftereffects

// dumps a list of all the comps in the project to a JSON file for use with
// "fuzzyFinder"

declare var JSON: any;
declare var LISTCOMPS: any

// declare LISTCOMPS at the top level so that it's available to other scripts
if (typeof LISTCOMPS !== "object") {
	LISTCOMPS = {}
}

(function () {
	//@include "../lib/aequery.js"
	//@include "../lib/json2.js"
	if (typeof LISTCOMPS.update !== "function") {
		LISTCOMPS.update = function () {
			// app.beginUndoGroup("List comps");

			// const fname = app.project.file?.displayName
			// const DEST = `/Users/ian/tmp/ae/${fname}.comps.txt`
			const DEST = `/Users/ian/tmp/ae/comps.out.txt`

			const f = new File(DEST)
			f.lineFeed = "Unix"

			f.open("w")

			let allComps = aeq.getCompositions()

			let results = []

			for (var c = 0; c < allComps.length; c++) {
				let obj: Record<string, any> = {}

				var current = allComps[c] as CompItem
				writeLn(current.name.toString())
				obj.name = current.name
				obj.id = current.id
				results.push(obj)

			}

			f.write(JSON.stringify(results, null, "\t"))
			f.close()

			// let thisComp = app.project.activeItem as CompItem

			// openInViewer

			// for (var c = 1; c <= thisComp.layers.length; c++) {
			// 	let currentLayer = thisComp.layers[c]
			// 	f.writeln(currentLayer.name)
			// 	writeLn(currentLayer.name)

			// }

			// f.close()


		}
	}

})();

LISTCOMPS.update()