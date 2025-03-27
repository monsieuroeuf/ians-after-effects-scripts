//@target aftereffects

/**
 * 2025-03-26
 * 
 */

(function reverseSelectedLayersStacking() {

    function indexCompare(layerObject: Layer, anotherLayerObject: Layer) {
        return layerObject.index - anotherLayerObject.index
    }

    const proj = app.project
    const scriptName = "Sort Layers by In Point"


    function reverseOrder(thelayers: Layer[], unlockedOnly: boolean) {
        const total_number = thelayers.length
        thelayers.sort(indexCompare)
        for (let i = 0; i < total_number - 1; i++) {
            thelayers[i].moveAfter(thelayers[total_number - 1])
        }
    }
    // change this to true if you want to leave locked layers untouched.
    const unlockedOnly = false
    if (proj) {
        const thisComp = proj.activeItem as CompItem
        const theLayers = thisComp.selectedLayers

        if (theLayers != null) {
            app.beginUndoGroup(scriptName)
            reverseOrder(theLayers, unlockedOnly)
            app.endUndoGroup()
        } else {
            alert("Please select some layers to use this script", scriptName)
        }
    } else {
        alert("Please open a project first to use this script.", scriptName)
    }
}


)()