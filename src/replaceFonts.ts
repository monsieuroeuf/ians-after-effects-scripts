//@target aftereffects

/*
These fonts are used in the project 
VodafoneExB-Regular
VodafoneLt-Regular
VodafoneRg-Bold
VodafoneRg-Regular
*/

(function replaceFonts() {
    //@include "./lib/aequery.js"

    const DEBUGGING = true

    clearOutput()

    const allComps = aeq.getCompositions()
    // alert(allComps.join("\n"))

    app.beginUndoGroup("Replace Fonts")

    aeq.forEach(allComps, (comp) => {
        aeq.forEachLayer(comp, (layer) => {
            if (layer instanceof TextLayer) {

                const textProp = layer.property("Source Text") as Property<TextDocumentType>
                const textDocument = textProp.value
                switch (textDocument.font) {
                    case "VodafoneRg-Regular":
                        textDocument.font = "Vodafone-Regular"
                        break
                    case "VodafoneRg-Bold":
                        textDocument.font = "Vodafone-Bold"
                        break
                    case "VodafoneLt-Regular":
                        textDocument.font = "Vodafone-Light"
                        break
                    default:
                        textDocument.font = "Vodafone-ExtraBold"
                        break
                }
                textProp.setValue(textDocument)

            }
        })
    })

    // alert(textLayers.join("\n"))

    app.endUndoGroup()

}


)()