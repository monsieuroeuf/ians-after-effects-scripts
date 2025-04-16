//@target aftereffects

(function openAllWithLabel() {
    //@include "../lib/aequery.js"
    app.beginUndoGroup("Open all with label")

    clearOutput()
    const greenComps = aeq('comp[label=6]') as AEQArrayEx<CompItem>

    greenComps.forEach((comp: CompItem) => {
        writeLn(comp.name)
        comp.openInViewer()
    })

})()