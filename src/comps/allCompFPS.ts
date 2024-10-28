//@target aftereffects


(function allCompsFPS() {
    //@include "../lib/aequery.js"
    //@include "../lib/underscore.js"

    // get all the comps, including those in folders
    const allComps = aeq.getCompositions(app.project.rootFolder, true)

    aeq.forEach(allComps, (c) => {
        c.frameRate = 25
    })
})()