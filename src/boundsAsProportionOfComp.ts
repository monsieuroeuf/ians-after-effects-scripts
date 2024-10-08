//@target aftereffects
// TODO finish this

(function boundsAsProportionOfComp() {

    app.beginUndoGroup('Bounds as proportion of comp')

    clearOutput()

    const comp = app.activeViewer;
    const thisComp = app.project.activeItem as CompItem
    const sel = thisComp.selectedLayers

    for (const currentLayer of sel) {
        const currentAV = currentLayer as AVLayer
        // const {left, top, right, bottom} = getShapeBounds(currentAV, 3)
        // alert(`left: ${left}, top: ${top}, right: ${right}, bottom: ${bottom}`)
        const {left, top, width, height} = currentAV.sourceRectAtTime(4, true)
        // alert(`left: ${left}, top: ${top}, width: ${width}, height: ${height}`)

        // gotta reset the origin 
        // const leftNormalised = left - thisComp.width / 2
        // const topNormalised = top - thisComp.height / 2

        const compX = currentLayer.position.value[0]

        // writeLn(`left: ${left - compX}, ${left + width}, width: ${width}, height: ${height}`)
        writeLn(`compX: ${compX}, left: ${left}, compX + left: ${compX + left}, `)
        const leftNormalised = left + compX
        const rightNormalised = left + width + compX

        // writeLn(`leftNormalised: ${leftNormalised}, rightNormalised: ${rightNormalised}`);

        // alert(currentLayer.position.value.toString())

        const leftAsPercentage = (leftNormalised / thisComp.width) * 100
        const rightAsPercentage = (rightNormalised / thisComp.width) * 100

        writeLn(`left: ${100- leftAsPercentage}, right: ${100- rightAsPercentage}`);

        // alert(`left: ${1 + leftAsProportion}, right: ${1 + rightAsProportion}`)
        
    }




})()