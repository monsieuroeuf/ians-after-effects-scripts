//@target aftereffects

/**
 * Given a bunch of selected layers, this script will distribute them evenly in time.
 */

(function distributeLayerInPoints() {

    const thisComp = app.project.activeItem as CompItem
    const selectedLayers = thisComp.selectedLayers

    let minTime = thisComp.duration
    let maxTime = thisComp.displayStartTime

    // figure out the min and max times
    for (let c = 0; c < selectedLayers.length; c++) {
        if (selectedLayers[c].inPoint < minTime) {
            minTime = selectedLayers[c].inPoint
        }
        if (selectedLayers[c].inPoint > maxTime) {
            maxTime = selectedLayers[c].inPoint
        }
    }

/*     selectedLayers.sort((a, b) => {
        return a.index - b.index
    }) */

    app.beginUndoGroup("Distribute in points")
    clearOutput()

    const gapBetweenLayers = (maxTime - minTime) / (selectedLayers.length-1)

    // var beginTime = selectedLayers[0].startTime
    // const beginTime = thisComp.time
    /*
    let layerCounter = selectedLayers.length - 1
    for (let c = minTime; c <= maxTime; c += gapBetweenLayers) {
        selectedLayers[layerCounter].inPoint = c
        layerCounter--
    }
        */

    for (let c = 0; c < selectedLayers.length; c++) {
        selectedLayers[c].inPoint = gapBetweenLayers * c + minTime
    }

    writeLn(`Gap between layers: ${gapBetweenLayers}`)
    writeLn(`Min time: ${minTime}`)
    writeLn(`Max time: ${maxTime}`)

})()
