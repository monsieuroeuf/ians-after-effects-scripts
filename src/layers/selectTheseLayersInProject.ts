(function selectTheseLayers() {
    clearOutput()
    app.beginUndoGroup("main")

    const project = app.project

    // deselect all the project items first
    for (const item of project.selection) {
        item.selected = false
    }

    const comp = project.activeItem as CompItem
    const layers = comp.selectedLayers as AVLayer[]
    for (const current of layers) {
        if (current.source) current.source.selected = true
    }
})()