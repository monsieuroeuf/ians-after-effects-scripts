//@target aftereffects

/**
 * Select a layer, run this, no more expressions.
 */

(function killExpressionsOnSelected() {

    //@include "../lib/aequery.js"

    app.beginUndoGroup("Kill expressions on selected")

    const comp = app.project.activeItem as CompItem
    aeq.forEachProperty(aeq.getSelectedLayers(comp), prop => {
        if (prop.expressionEnabled) {
            prop.expression = ""
        }
    })

    app.endUndoGroup()


})()