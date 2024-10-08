//@target aftereffects

/**
 * Replace spaces in selected project items with hyphens.
 */

(function hyphenate() {
    const selection = app.project.selection

    app.beginUndoGroup("Hyphenate")

    for (const currentItem of selection) {
        const oldName = currentItem.name
        const newName = oldName.replace(/ /g, '-')
        currentItem.name = newName
    }
})()