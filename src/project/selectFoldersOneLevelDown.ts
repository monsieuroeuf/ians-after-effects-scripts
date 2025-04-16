//@target aftereffects

(function foldersAtThisLevel() {
    const selected = app.project.selection

    for (const currentItem of selected) {
        if (currentItem instanceof FolderItem) {
            for (let i = 1; i <= currentItem.numItems; i++) {
                const child = currentItem.item(i)
                if (child instanceof FolderItem) {
                    child.selected = true
                }
            }
        }
        currentItem.selected = false
    }
})()