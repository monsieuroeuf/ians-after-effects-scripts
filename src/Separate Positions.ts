//@target aftereffects



(function separatePositions() {

	// app.beginUndoGroup("Quick Comp Prefixer")
	// const KEY_NAME = "quickCompPrefixer"

	let proj = app.project.activeItem
	if (proj === null || !(proj instanceof CompItem)) {
        alert("Please select a composition")
        return
    }

    let selectedLayers = proj.selectedLayers
    if (selectedLayers.length === 0) {
        alert("Please select at least one layer")
        return
    }

    for (let currentLayer of selectedLayers) {
        currentLayer.property("Position").dimensionsSeparated = true
    }

	// look 


	// let defaultString = IanLib.getPref(KEY_NAME)

	// let s = Window.prompt("Prefix?", defaultString)
	// IanLib.setPref(KEY_NAME, s)

	// for (let currentComp of selectedComps) {
	// currentComp.name = `${s}${currentComp.name}`
	// }
})()
