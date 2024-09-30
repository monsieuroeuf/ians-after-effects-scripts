(function () {
    if (typeof kbar !== 'undefined' && kbar.button) {
        main(kbar.button.argument)
    } else {
        main()
    }

    function main(arg?:any) {
        // main
        clearOutput()
        app.beginUndoGroup("main")

        const project = app.project
        const comp = project.activeItem as CompItem
        const layers = comp.selectedLayers as AVLayer[]
        for (const current of layers) {
            current.source.selected = true
        }

        
    }
})()