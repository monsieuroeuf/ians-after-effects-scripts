//@target aftereffects

declare const _: any

/**
 * I use a numbering system for my comps, so I can keep track of versions. Each
 * unique top-level comp starts with a two digit number, and if I need to bump
 * the version then I append the version. For example if I had 74 versions of
 * the 01-cool-intro comp:
 *
 * ```
 * 01-cool-intro-01
 * 01-cool-intro-02
 * ...
 * 01-cool-intro-74
 * ```
 * 
 * … this script would select `01-cool-intro-74`.
 * 
 * This script descends into all folders and subfolders, and selects the highest
 * version of each comp.
 * 
 * It uses the underscore.js library, which is included in the repo.
 * 
 * Note that this ONLY looks at the first two digits of the comp name, so if two
 * separate comps begin with the same numbered prefix, it's not gonna work.
 */

(function highlightLatestComps() {
    //@include "./lib/aequery.js"
    //@include "./lib/underscore.js"

    // get all the comps, including those in folders
    const allComps = aeq.getCompositions(app.project.rootFolder, true)

    // group them by the first two digits
    const groupedByPrefix = _.groupBy(allComps, (i: CompItem) => i.name.match(/^\d\d/))

    // … and just keep the last (i.e. the highest version number)
    const highestSuffixInGroup = _.map(groupedByPrefix, (i: CompItem) => _.last(i))

    _.each(highestSuffixInGroup, (item: CompItem) => item.selected = true)
})()