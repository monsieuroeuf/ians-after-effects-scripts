(function numberCompsWithPrefix() {
    clearOutput()
    app.beginUndoGroup("Number comps with prefix")

    const project = app.project
    const projectPanelSelection = project.selection

    const prefix = prompt("Enter the prefix", "01")

    if (projectPanelSelection.length === 0) {
        alert("Select some items in the Project Panel first.")
        return
    }

    for (let i = 0; i < projectPanelSelection.length; i++) {
        const currentItem = projectPanelSelection[i]
        const increment = i + 1
        if (currentItem instanceof CompItem) {
            currentItem.name = `${prefix}.${increment}`
        }
    }

})()