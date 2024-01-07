//@target aftereffects

/**
 * Replace spaces in selected project items with hyphens.
 */

(function hyphenate() {
    const selection = app.project.selection

    app.beginUndoGroup("Hyphenate")

    for (let currentItem of selection) {
        let oldName = currentItem.name
        let newName = oldName.replace(/ /g, '-')
        currentItem.name = newName
    }
})()