//@target aftereffects

/* 
renames your comps to include the hierarchy of folders they are in

For example, if you have a folder structure like this:
└── 01-transitions
    └── 01-push-in
        ├── 1.1.1
        ├── 1.1.2
        ├── 1.1.3
        ├── 1.1.4
        └── 1.1.5

Where 1.1.1, 1.1.2, 1.1.3, 1.1.4, 1.1.5 are comps.

With `01-transitions` selected, running this script will rename the comps to:

01-transitions/01-push-in/1.1.1
01-transitions/01-push-in/1.1.2
01-transitions/01-push-in/1.1.3
01-transitions/01-push-in/1.1.4
01-transitions/01-push-in/1.1.5

In theory.

*/

(function hierarchyCompRename() {

    app.beginUndoGroup("Hierarchy comp rename");

    const projectPanelSelection = app.project.selection;
    if (projectPanelSelection.length === 0) {
        alert("Select some items in the Project Panel first.");
        return;
    }

    for (const currentItem of projectPanelSelection) {
        if (currentItem instanceof FolderItem) {
            // loop through its contents
            descend(currentItem, currentItem.name);
        }
    }

    function descend(folder: FolderItem, prefix: string) {
        const items = [];
        for (let i = 1; i <= folder.numItems; i++) {
            items.push(folder.item(i));
        }

        for (const currentItem of items) {
            if (currentItem instanceof FolderItem) {
                // skip if it starts with underscore
                if (currentItem.name.slice(0, 1) === "_") {
                    continue;
                }
                descend(currentItem, `${prefix}/${currentItem.name}`);
            }
            // rename the item
            if (currentItem instanceof CompItem) {
                // chop off the folder names
                const basename = currentItem.name.replace(/^.*\//, "");
                currentItem.name = `${prefix}/${basename}`;
            }
        }
    }

    app.endUndoGroup();
})();
