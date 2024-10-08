// declare var kbar: any

(function oneBeautifulGuide() {
    if (typeof kbar !== 'undefined' && kbar.button) {
        main(kbar.button.argument)
    } else {
        main("")
    }

    function main(argument?: any) {
        clearOutput()

        writeLn("One beautiful guide")

        const SECTION = "com.ianhaigh"
        const KEY = "OneBeautifulGuide"

        app.beginUndoGroup("One beautiful guide")

        const proj = app.project
        const comp = proj.activeItem as CompItem

        let defaultGuideTxt = null
        if (app.settings.haveSetting(SECTION, KEY)) {
            defaultGuideTxt = app.settings.getSetting(SECTION, KEY)
        } else {
            defaultGuideTxt = `0 ${comp.height / 2}`
        }

        const ans = prompt("0:horizontal, 1:vertical", defaultGuideTxt, "One beautiful guide")
        if (ans !== null) {
            writeLn("saving settings")
            app.settings.saveSetting(SECTION, KEY, ans)
            const [direction, position] = ans.split(" ").map(Number)
            if (direction === 0) {
                // horizontal
                comp.addGuide(0, position)
            } else {
                // vertical
                comp.addGuide(1, position)
            }
        }
    }

})()