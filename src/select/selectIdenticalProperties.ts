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
 * matches the hierarchy exactly. Handy when you've duplicated a shape
 * layer and want update the same property on all the instances.
 */

(function selectIdenticalProperties() {
	//@include "../lib/aequery.js"; 

	/**
	 * @hidden
	 */
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
			let result = ""
			this.propHierarchyAry.reverse()
			aeq.forEach(this.propHierarchyAry, (item: Property) => {
				result += `${item.name}, `
			})
			this.propHierarchyAry.reverse()
			return result
		}

		makePropertySpec = () => {
			// loop thru the array, wrapping each prop in property("x")
			// I don't think I can use Array.map due to AE's old version of js?

			const result = []
			aeq.forEach(this.propHierarchyAry, (item: Property) => {
				// result.push("property(\"" + item.name + "\")")
				result.push(`property("${item.name}")`)
			})
			return result.reverse().join(".")
		}
	}

	// start here
	app.beginUndoGroup("Select Identical Properties")
	const comp = aeq.getActiveComposition()
	const propertyBankAry = []

	aeq.forEach(aeq.getSelectedProperties(comp), (prop: Property) => {
		// loop through all the selected properties
		const currentProp = prop

		// create a new object for each selected property
		const currentPropertyBank = new PropertyBank(currentProp)

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
				// biome-ignore lint/security/noGlobalEval: <explanation>
				const propSpec = eval(`layer.${prop.makePropertySpec()}`)
				propSpec.selected = true

			} catch (e) { }
		})

	})


}())
