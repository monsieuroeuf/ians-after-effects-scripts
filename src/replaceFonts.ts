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

    const missingFonts = []

    aeq.forEach(allComps, (comp) => {
        aeq.forEachLayer(comp, (layer) => {
            if (layer instanceof TextLayer) {
                const propsList = []

                const textProp = layer.property("Source Text") as Property<TextDocumentType>
                const textDocument = textProp.value
                // let's look at all the properties on the textDocument object
                for (const prop in textDocument) {
                    propsList.push(prop)
                    // writeLn(prop)
                }
                // alert(propsList.join("\n"))


                textDocument.autoKernType = AutoKernType.OPTICAL_KERN
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
                    case "VodafoneExB-Regular":
                        textDocument.font = "Vodafone-ExtraBold"
                        break
                    default:
                        missingFonts.push(textDocument.font)
                        break
                }
                textProp.setValue(textDocument)

            }
        })
    })

    // TODO the logic here is completely out
    if (missingFonts.length > 0) {
        alert(`Missing fonts: ${missingFonts.join("\n")}`)
    }

    // alert(textLayers.join("\n"))

    app.endUndoGroup()

}


)()