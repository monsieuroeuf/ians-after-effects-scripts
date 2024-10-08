//@target aftereffects

(function propsOfSelected() {
    //@include "./lib/aequery.js"

    clearOutput()
    const allComps = aeq.getCompositions()

    aeq.forEach(aeq.getSelectedLayers(), (layer) => {
        if (layer instanceof TextLayer) {
            const propsList = []

            const textProp = layer.property("Source Text") as Property<TextDocumentType>
            const textDocument = textProp.value

            // let's look at all the properties on the textDocument object
            for (const prop in textDocument) {
                propsList.push(prop)
                // writeLn(prop)
            }
            // alert(textDocument.autoKernType.toString())

            textDocument.autoKernType = AutoKernType.NO_AUTO_KERN
            
            textProp.setValue(textDocument)

        }
    })// alert(textLayers.join("\n"))

    app.endUndoGroup()

}


)()