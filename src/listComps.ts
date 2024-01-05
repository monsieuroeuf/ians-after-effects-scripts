//@target aftereffects

declare var JSON     : any;
declare var LISTCOMPS: any

// declare LISTCOMPS at the top level so that it's available to other scripts
if (typeof LISTCOMPS !== "object") {
	LISTCOMPS = {}
}

/**
 * Dumps a list of all the comps in the project to a JSON file for use with
 * "fuzzyFinder". 
 * @function listComps
 */

(function listComps() {
	//@include "../lib/aequery.js"
	//@include "../lib/json2.js"
	//@include "./ianlib.js"

	const DEBUGGING = true

	const writeFuzzyJSON = function () {
		const fuzzyFile = ianlib.getFuzzyCompsFile()

		fuzzyFile.lineFeed = "Unix"
		fuzzyFile.open("w")

		let allComps = aeq.getCompositions()

		let results = []

		// make an array of objects with the name and id of each comp
		for (var c = 0; c < allComps.length; c++) {
			let obj: Record<string, any> = {}

			var current = allComps[c] as CompItem
			obj.name = current.name
			obj.id = current.id
			results.push(obj)
		}

		// pretty print the JSON
		fuzzyFile.write(JSON.stringify(results, null, "\t"))
		fuzzyFile.close()
	}

	if (DEBUGGING) {
		// if debugging, set the update evey time
		LISTCOMPS.update = writeFuzzyJSON
	} else {
		// if this is the first time we've run this script, set the update function
		if (typeof LISTCOMPS.update !== "function") {
			LISTCOMPS.update = writeFuzzyJSON
		}
	}

})();
LISTCOMPS.update()