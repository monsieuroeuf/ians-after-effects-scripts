//@target aftereffects

/**
 * Quick and rough way to embiggen a few comps
 */

(function embiggenSelectedComps() {

	app.beginUndoGroup("Embiggen selected")

	const selectedComps = app.project.selection

	for (let index = 0; index < selectedComps.length; index++) {
		const currentComp = selectedComps[index] as CompItem
		const currentCompOriginalTime = currentComp.time
		const allLayers = currentComp.layers

		currentComp.time = currentComp.duration - 1

		const theNull = currentComp.layers.addNull()
		theNull.name = "embiggen"
		theNull.moveToEnd()

		for (let c = 1; c <= allLayers.length; c++) {
			const currentLayer = allLayers[c]

			// only parent layers that are not already parented
			if (currentLayer.parent !== null) continue
			if (currentLayer === theNull) continue
			currentLayer.parent = theNull
		}

		theNull.transform.scale.setValue([200, 200])

		// resize the comp 
		currentComp.width *= 2
		currentComp.height *= 2

		// and move the null to the center
		theNull.transform.position.setValue([currentComp.width / 2, currentComp.height / 2])

		// and delete our null
		theNull.remove()

		// and restore time 
		currentComp.time = currentCompOriginalTime

	}
})()
