(function selectedPropsToVars() {
    function toCamelCase(str: string): string {
        return str
            .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
            .split(" ")
            .map((word, index) =>
                index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join("")
    }

    function getExpressionRefs(): void {
        const comp = app.project?.activeItem
        if (!comp || !(comp instanceof CompItem)) {
            alert("Please select a composition.")
            return
        }

        const selectedProps = comp.selectedProperties
        if (!selectedProps || selectedProps.length === 0) {
            alert("Please select one or more effect properties.")
            return
        }

        const refs: string[] = []

        selectedProps.forEach((prop: PropertyBase) => {
            // Get the effect container
            const effect = prop.propertyGroup(1) as PropertyGroup
            const effectName = effect.name
            const propName = prop.name
            const varName = toCamelCase(propName)

            // Build the full expression chain including parent groups if available.
            let chain = effectName
            // If prop.propertyDepth > 2 then there are intermediate groups.
            for (let i = 2; i < prop.propertyDepth; i++) {
                const parentGroup = prop.propertyGroup(i)
                chain += `("${parentGroup.name}")`
            }
            chain += `("${propName}")`

            refs.push(`const ${varName} = ${chain};`)
        })

        if (refs.length > 0) {
            const output = refs.join("\n")
            // Uncomment the following lines if you want to write the output to a temporary clipboard file.
            // const clipboardFile = new File(`${Folder.temp.fullName}/ae_expression_refs.txt`)
            // clipboardFile.open("w")
            // clipboardFile.write(output)
            // clipboardFile.close()
            // clipboardFile.execute() // Opens the file for easy copy-paste

            alert(`Expression references copied to clipboard:\n\n${output}`)
        } else {
            alert("No valid effect properties selected.")
        }
    }

    app.beginUndoGroup("Generate Expression References")
    getExpressionRefs()
    app.endUndoGroup()
})()