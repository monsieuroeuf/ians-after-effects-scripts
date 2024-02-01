//@target aftereffects

/**
 * Select all properties that match a regex. We'll ignore properties that are
 * usually hidden, like "Layer Styles" and "Material Options".
 */


(function selectPropertiesByRegexp() {
	//@include "./lib/aequery.js"
	//@include "./lib/IanLib.js"

	const DEBUGGING = false
	const KEY_NAME = "selectPropertyByString"

	let defaultString = IanLib.getPref(KEY_NAME)

	app.beginUndoGroup("Select property by string");

	const activeComp = app.project.activeItem as CompItem
	const selectedLayers = activeComp.selectedLayers

	let lookForString = prompt("what property name do you want to select?", defaultString)

	// keep the value for next time
	IanLib.setPref(KEY_NAME, lookForString)

	function ignoredPropertyGroups(prop: PropertyBase) {
		// some properties are not selectable because they're hidden
		// let's ignore "Layer Styles" and "Material Options"

		let tempProp = prop

		// climb up the property tree until we find the top
		while (tempProp.parentProperty) {
			// short circuit if we find a match
			if (tempProp.name === "Layer Styles" || tempProp.name === "Material Options") return true
			tempProp = tempProp.parentProperty
		}
		return false
	}

	let errorList = []

	// start looping through selected layers

	for (let currentLayer of selectedLayers) {
		// use aequery to recursively get all properties
		for (let prop of aeq.getPropertyChildren(currentLayer, { groups: true })) {
			// if this property's parent is "Layer Styles" or "Material Options", skip it
			if (ignoredPropertyGroups(prop)) continue

			let r = new RegExp(prop.name, "i")
			try {
				if (prop.name.match(lookForString)) prop.selected = true
			} catch (e) {

				// make a path to this property
				let path = []
				let climb = prop
				while (climb.parentProperty) {
					path.push(climb.name)
					climb = climb.parentProperty
				}
				errorList.push(path.reverse().join(" > "))
			}
		}
	}
	if (DEBUGGING) {
		if (errorList.length > 0) alert(errorList.join("\n"))
	}
})();
