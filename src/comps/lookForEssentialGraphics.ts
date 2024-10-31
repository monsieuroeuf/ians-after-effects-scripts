//@target aftereffects

(function lookForEssentialGraphics() {
    //@include "../lib/aequery.js"
    app.beginUndoGroup("Look for Essential Graphics")

    clearOutput()

    aeq.getCompositions().forEach(comp => {
        // writeLn(comp.name)
        if (comp.motionGraphicsTemplateControllerCount > 0) {
            // writeLn("  Motion Graphics Template Controller found")
            comp.openInViewer()
            comp.openInEssentialGraphics()
        }
    })

})()