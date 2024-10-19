//@target aftereffects

(function addXKeyframe() {
    type PropType = "X Position" | "Y Position"
    let myProp: PropType = ("X Position")

    if ($.getenv("argumentative") === "y") {
        myProp = "Y Position"
    }

    const proj = app.project.activeItem
    if (proj === null || !(proj instanceof CompItem)) {
        alert("Please select a composition")
        return
    }

    const selectedLayers = proj.selectedLayers
    if (selectedLayers.length === 0) {
        alert("Please select at least one layer")
        return
    }

    for (const currentLayer of selectedLayers) {
        currentLayer.position.dimensionsSeparated = true
        const theProp = currentLayer.property("Transform").property(myProp) as Property
        theProp.setValueAtTime(proj.time, theProp.value)
    }

})()
