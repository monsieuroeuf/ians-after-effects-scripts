//@target aftereffects

/**
 * 2025-03-21
 * Shy all the unselected layers
 */

(function isolateInTimeline() {
    //@include "../lib/aequery.js"

    app.beginUndoGroup("isolateInTimeline")

    const unselected = aeq("activecomp layer:not(selected)") as AEQArrayEx<Layer>
    unselected.forEach((item) => {
        item.shy = true
    })

    aeq.getActiveComp().hideShyLayers = true

    // alert(`unselected: ${unselected.length}`)


})()