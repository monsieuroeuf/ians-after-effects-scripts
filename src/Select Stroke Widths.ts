//@target aftereffects

/**
 * Selects all the "Stroke Width" properties on selected layers.
 */

(function () {
	//@include "../lib/aequery.js"
	function useAEQ() {
		// I love using the CSS style selectors, but it's slow
		aeq("layer[selected] prop[name='Stroke Width']").forEach((currentProp: Property) => {
			try {
				currentProp.selected = true
			} catch (error) {
			}
		})
	}
	function usePropertyChildren() {
		// this version is one billion times faster
		aeq.forEachProperty(aeq.getSelectedLayers(), (currentProp: Property) => {
			if (currentProp.name === "Stroke Width") {
				currentProp.selected = true
			}
		})
	}

	usePropertyChildren()
	// useAEQ()

}())
