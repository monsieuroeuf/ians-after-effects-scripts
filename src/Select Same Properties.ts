//@target aftereffects

/**
 * Select Same Properties
 * 
 * 
 */


(function selectSameProperties() {
	//@include "../lib/aequery.js"; 

	/**
	 * 
	 * @param prop takes a property object
	 * 
	 */
	class PropertyBank {
		propAry: Array<PropertyBase>

		// make a constructor
		constructor(prop: Property) {
			// properties 
			this.propAry = new Array(prop)
		}

		// methods
		addProp = (prop: PropertyBase) => {
			this.propAry.push(prop)
		}

		toString = () => {
			var result = ""
			this.propAry.reverse()
			aeq.forEach(this.propAry, function (item: Property) {
				result += item.name + ", "
			})
			this.propAry.reverse()
			return result
		}

		makePropertySpec = () => {
			// loop thru the array, wrapping each prop in property("x")
			// I don't think I can use Array.map due to AE's old version of js?

			var result = []
			aeq.forEach(this.propAry, function (item: Property) {
				// result.push("property(\"" + item.name + "\")")
				result.push(`property("${item.name}")`)
			})
			return result.reverse().join(".")

			// return this.propAry.reverse().map(function (item: Property) {
			// 	return `property("${item.name}")`
			// }).join(".")


		}
	}

	// start here
	var comp = aeq.getActiveComposition()
	var propertyBankAry = []

	aeq.forEach(aeq.getSelectedProperties(comp), function (prop: Property) {
		// loop through all the selected properties
		var currentProp = prop

		// create a new object for each selected property
		var currentPropertyBank = new PropertyBank(currentProp)

		let parentGroup = currentProp.parentProperty

		// walk up the parent chain
		while (parentGroup.parentProperty !== null) {
			currentPropertyBank.addProp(parentGroup)
			parentGroup = parentGroup.parentProperty
		}

		// alert(currentPropertyBank.makePropertySpec())

		// add to the master list
		propertyBankAry.push(currentPropertyBank)
		/*
		if (aeq.property.type(prop) === "PROPERTY") { // ignore groups
			$.writeln(prop.name)
			aeq("prop[name='" + prop.name + "']", comp).forEach(function (prop) {
				// use the aeq selector to grab all properties with the same name ...
				prop.selected = true
			})
		}
		*/

	})

	// aeq.forEach(propertyBankAry, function (item) {
	// 	$.writeln(item.makePropertySpec())
	// })

	// select 'em all
	aeq.forEach(aeq.getLayers(comp), (layer: Layer) => {
		aeq.forEach(propertyBankAry, (prop: PropertyBank) => {
			// some are hidden by default, so we'll just ignore the ones that can't be selected
			try {
				var propSpec = eval("layer." + prop.makePropertySpec())
				propSpec.selected = true

			} catch (e) { }
		})

	})


}())
