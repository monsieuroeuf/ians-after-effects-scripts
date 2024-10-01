//@target aftereffects

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
declare let JSON               : any
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
declare let FUZZYOPEN_LISTCOMPS: any

// declare LISTCOMPS at the top level so that it's available to other scripts
if (typeof FUZZYOPEN_LISTCOMPS !== "object") {
	FUZZYOPEN_LISTCOMPS = {}
}


/**
 * Dumps a list of all the comps in the project to a JSON file for use with
 * "fuzzyFinder". 
*/

(function listComps() {
	//@include "./lib/aequery.js"
	//@include "./lib/json2.js"
	//@include "./lib/IanLib.jsx"

	const DEBUGGING = true


	const writeFuzzyJSON = () => {
		const fuzzyFile = IanLib.getFuzzyCompsFile()

		fuzzyFile.lineFeed = "Unix"
		fuzzyFile.open("w")

		const allComps = aeq.getCompositions()

		const results = []

		// make an array of objects with the name and id of each comp
		for (let c = 0; c < allComps.length; c++) {
			const current = allComps[c] as CompItem
			const obj = {
				name: current.name,
				id: current.id
			}
			results.push(obj)
		}
		// pretty print the JSON
		fuzzyFile.write(JSON.stringify(results, null, "\t"))
		fuzzyFile.close()
	}

	if (DEBUGGING) {
		// if debugging, set the update evey time
		FUZZYOPEN_LISTCOMPS.update = writeFuzzyJSON
	} else {
		// if this is the first time we've run this script, set the update function
		if (typeof FUZZYOPEN_LISTCOMPS.update !== "function") {
			FUZZYOPEN_LISTCOMPS.update = writeFuzzyJSON
		}
	}

})()
FUZZYOPEN_LISTCOMPS.update()