(function selectTheseLayers() {
    clearOutput()
    app.beginUndoGroup("main")

    const project = app.project
    const comp = project.activeItem as CompItem
    const layers = comp.selectedLayers as AVLayer[]
    for (const current of layers) {
        current.source.selected = true
    }
})()