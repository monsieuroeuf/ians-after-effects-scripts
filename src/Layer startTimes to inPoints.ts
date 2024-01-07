//@target aftereffects

/**
 * A layer's inPoint is often the same as its startPoint. But if you've trimmed
 * it (either a nested comp or a footage file, say) then the inPoint reflects
 * the trimmed point, whereas the startPoint will reflect the "untrimmed"
 * beginning of the layer.
 * 
 * This script will move the selected layers so that each one's startPoint lines up 
 *  with their current inPoint is (moving the inPoint in the process).
 * 
 * BONUS THING: hold down alt (option on Mac) to line up all the layers'
 * startTimes to the comp's current time.
 *
 */

(function layerStartTimesToInPoints() {
    //@include "../lib/aequery.js"

    const proj = app.project
    const undoStr = "Layer startTimes to inPoints"

    if (!proj) {
        alert("Please open a project first to use this script.")
        return
    }
    const myComp = app.project.activeItem
    let defaultLogic = true

    // alt key means: line up startTimes to the current time
    if (ScriptUI.environment.keyboardState.altKey) { defaultLogic = false }

    if (myComp != null && (myComp instanceof CompItem)) {
        app.beginUndoGroup(undoStr)
        for (let currentLayer of myComp.selectedLayers) {
            if (defaultLogic) {
                currentLayer.startTime = currentLayer.inPoint
            } else {
                // alt key is held down
                currentLayer.startTime = myComp.time
            }
        }
        app.endUndoGroup()
    }

})()
