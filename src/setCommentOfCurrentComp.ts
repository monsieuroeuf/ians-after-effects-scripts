//@target aftereffects

(function setCommentOfCurrentComp() {

	app.beginUndoGroup("Set comment of current comp")

    const comp = app.project.activeItem as CompItem
    if (!comp) {
        alert("No active comp.")
        return
    }

    let preset = ""

    if (comp.comment) preset = comp.comment

    const comment = prompt("Enter comment", preset)
    if (!comment) {
        return
    }
    comp.comment = comment

})()
