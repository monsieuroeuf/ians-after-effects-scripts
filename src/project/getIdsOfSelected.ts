//@target aftereffects

/**
 * 2025-04-09
 * Get the IDs of the selected items in the project panel.
 */

(function getIdsOfSelected() {
    const proj = app.project
    const selection = proj.selection
    const ids = []

    app.beginUndoGroup("getIdsOfSelected")

    for (let index = 0; index < selection.length; index++) {
        const element = selection[index]
        ids.push(element.id)
    }

    alert(`Selected IDs: ${ids.join(", ")}`)


})()