//@target aftereffects

/**
 * Selects the same property on all layers, respecting the hierarchy.
 * For example, if you've selected a property that looks like this:
 * 
 * ```javascript
 * property("Contents").property("Rectangle 2").property("Contents").property("Stroke 1").property("Stroke Width")
 * ```
 * 
 * … the script will select the same property on other layers, but only if it
 * matches the hierarchy exactly. Very handy when you've duplicated a shape
 * layer and want to update its colour or stroke etc.
 *  @name Select Identical Properties
 */

(function selectIdenticalProperties() {
	//@include "../lib/aequery.js"; 

	class PropertyBank {
		propHierarchyAry: Array<PropertyBase>

		// make a constructor
		constructor(prop: Property) {
			this.propHierarchyAry = new Array(prop)
		}

		// methods
		addProp = (prop: PropertyBase) => {
			this.propHierarchyAry.push(prop)
		}

		toString = () => {
			var result = ""
			this.propHierarchyAry.reverse()
			aeq.forEach(this.propHierarchyAry, function (item: Property) {
				result += item.name + ", "
			})
			this.propHierarchyAry.reverse()
			return result
		}

		makePropertySpec = () => {
			// loop thru the array, wrapping each prop in property("x")
			// I don't think I can use Array.map due to AE's old version of js?

			var result = []
			aeq.forEach(this.propHierarchyAry, function (item: Property) {
				// result.push("property(\"" + item.name + "\")")
				result.push(`property("${item.name}")`)
			})
			return result.reverse().join(".")
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
	})

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
