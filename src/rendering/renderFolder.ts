(function addCompsFromHere() {
    const proj = app.project
    const selectedItems = proj.selection

    app.beginUndoGroup('Render Folder')

    for (let i = 0; i < selectedItems.length; i++) {
        const item = selectedItems[i]
        writeLn(`Adding ${item.name} to render queue`)
        if (item instanceof FolderItem) {
            addComps(item)
        }
    }
    function addComps(folder: FolderItem) {
        // skip folders that begin with an underscore
        if (folder.name.charAt(0) === '_') {
            writeLn(`Skipping ${folder.name}`)
            return
        }

        const items = folder.items
        writeLn(`Adding comps from ${folder.name}`)
        for (let i = 1; i <= items.length; i++) {
            const item = items[i]
            if (item instanceof CompItem) {
                app.project.renderQueue.items.add(item)
            } else if (item instanceof FolderItem) {
                addComps(item)
            }
        }

    }

    app.endUndoGroup()
})()

