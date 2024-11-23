//@target aftereffects

/**
 * Select the layer in question. It will look for expressions on all its
 * properties, and add the name of the current comp as a comment at the top of
 * the expression.
 */

(function addCompNameAsComment() {

    //@include "../lib/aequery.js"

    app.beginUndoGroup("Add comp name as comment")

    const comp = app.project.activeItem as CompItem
    aeq.forEachProperty(aeq.getSelectedLayers(comp), prop => {
        if (prop.expressionEnabled) {
            prop.expression = `// ${comp.name}\n//\n\n${prop.expression}`
        }
    })

    app.endUndoGroup()


})()