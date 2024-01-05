//@target aftereffects

/**
 * Selects every "path" property on selected layers
 * @function selectAllPathProps
 */

(function selectAllPathProps() {
	//@include "../lib/aequery.js"

	app.beginUndoGroup("Select path properties")

	function aeqVersion() {
		var layers = aeq.getSelectedLayersOrAll()
		layers.forEach((layer: Layer) => {
			aeq("prop[name='Path']", layer).forEach((item: Property) => {
				// $.writeln(item)
				item.selected = true
			})
		})
	}

	// this version seems way faster
	function nativeVersion() {
		const comp = app.project.activeItem as CompItem
		const selectedLayers = comp.selectedLayers

		
		for (let i = 0; i < selectedLayers.length; i++) {
			let hasPathFlag = false
			const currentLayer = selectedLayers[i]

			aeq.forEachProperty(currentLayer, (prop: Property) => {
				if (prop.name === "Path") {
					prop.selected = true
					hasPathFlag   = true
				}
			})
			// deselect layer if no path property
			if (!hasPathFlag) currentLayer.selected = false

		}
	}

	nativeVersion()

})()