//@target aftereffects

(function separatePositions() {

    const proj = app.project.activeItem
    if (proj === null || !(proj instanceof CompItem)) {
        alert("Please select a composition")
        return
    }

    const selectedLayers = proj.selectedLayers
    if (selectedLayers.length === 0) {
        alert("Please select at least one layer")
        return
    }

    for (const currentLayer of selectedLayers) {
        currentLayer.position.dimensionsSeparated = true
    }

})()
