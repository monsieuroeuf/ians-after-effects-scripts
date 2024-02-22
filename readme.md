# Ian’s After Effect Scripts

Hi. Here's a smattering of little scripts that I've found helpful when using After Effects. They're written in TypeScript and then compiled into JavaScript that After Effects understands.

## Requirements

Everything you need is in the zip file. Skip to the next bit.

OR if you're a glutton for detail, read on.

- Most of these use the wonderful [aequery library](https://github.com/docsforadobe/aequery). I've included it in the `lib` folder (I hope that's OK, kind and benevolent aequery authors). Follow the link if you want to learn more, or grab the latest version, but I get the feeling it's not updated much these days.
- One of them uses `json2.js`, but in the source code it says "USE YOUR OWN COPY" literally, in all caps like that. So I guess that one is cool.
- And `underscore.js` is in the `lib` folder too, mainly to make up for the fact that After Effects still uses some ancient version of JavaScript that is missing a bunch of Array methods. But I digress.

## Getting started

1. Download the zip file, unzip it. You'll get a folder with some `*.js` files (they're the ones you run in After Effects), and a folder named `lib`. The `lib` folder contains libraries you'll need to run the scripts. 
2. Launch After Effects, and choose `File > Scripts > Run Script File …`. Navigate to the folder you just unzipped, choose the one that will bring you happiness, and kablammo you're in business.
3. Not working? [Let me know](mailto:ian@ketchup.net.au).


## Building from source

Get your mitts on something like node and npm (or pnpm), head to the terminal, cd to the folder, and try this:

```bash
npm install
npm run build
```

## Never-before-asked questions

- I'd like to use these scripts with [KBar](https://aescripts.com/kbar/) or something. How that be done?
	- Uh sure that's possible I think. You'll need to rename the script's extension to `jsx` rather than `js` though. My version of KBar only recognises `*.jsx` files when adding a script.
- Something isn't clear or doesn't work. Question?
	- OK wow your question is interestingly phrased. But that's fine. [Give me a shout](mailto:ian@ketchup.net.au) and I'll try to help.


## The Scripts

- [allCompsToSameTime](#allcompstosametime)
- [applyPresetAtBeginningOfSelectedLayers](#applypresetatbeginningofselectedlayers)
- [collectSelectionIntoFolder](#collectselectionintofolder)
- [distributeLayerInPoints](#distributelayerinpoints)
- [easeAlternateKeyframes](#easealternatekeyframes)
- [easeLayerDurations](#easelayerdurations)
- [embiggenSelectedComps](#embiggenselectedcomps)
- [evenlySpacedLayerMarkers](#evenlyspacedlayermarkers)
- [fuzzyOpen](#fuzzyopen)
- [highlightLatestComps](#highlightlatestcomps)
- [highlightNestedComps](#highlightnestedcomps)
- [hyphenate](#hyphenate)
- [layerStartTimesToInPoints](#layerstarttimestoinpoints)
- [listComps](#listcomps)
- [listLayers](#listlayers)
- [nullsFromSelected](#nullsfromselected)
- [lastSelectedIsParent](#lastselectedisparent)
- [parentUnderTopmost](#parentundertopmost)
- [quickCompPrefixer](#quickcompprefixer)
- [quickLayerRenamer](#quicklayerrenamer)
- [rectangleAroundComp](#rectanglearoundcomp)
- [selectAllPathProps](#selectallpathprops)
- [selectAllColourProperties](#selectallcolourproperties)
- [selectStrokesWithoutExpression](#selectstrokeswithoutexpression)
- [selectDescendants](#selectdescendants)
- [selectEllipses](#selectellipses)
- [selectIdenticalProperties](#selectidenticalproperties)
- [selectImmediateChildren](#selectimmediatechildren)
- [selectKeysToTheRight](#selectkeystotheright)
- [selectLayersWithoutParents](#selectlayerswithoutparents)
- [selectNonNestedComps](#selectnonnestedcomps)
- [selectPropertiesByRegexp](#selectpropertiesbyregexp)
- [selectRelated](#selectrelated)
- [selectStrokeColours](#selectstrokecolours)
- [selectStrokeWidths](#selectstrokewidths)
- [selectStrokesAndFills](#selectstrokesandfills)
- [selectTopLevelGroups](#selecttoplevelgroups)
- [setupMaskAnimation](#setupmaskanimation)

#### allCompsToSameTime

Sets the current time in all selected comps to 4 seconds. I wrote this to see
titles after they've built, and ensure everything looks OK.

Also works with folders, just select top level folders and it will look in
them (and their subfolders) for comps – thanks aequery!

(Wondering what "Poster Time" is? It refers to the thumbnail that's shown in
the Project panel. Often my comps start out black, so I set the Poster Time to
4 seconds so I can see what's in the comp without opening it.)

#### applyPresetAtBeginningOfSelectedLayers

If you apply a preset that contains keyframes, it will apply them at the
current time. If you want to apply to several layers that have different in
points, you have to do it manually. This will quickly apply a preset at the
beginning of each selected layer.

Select the layers you want to apply the preset to, run the script, and choose
the preset using the file dialog.

#### collectSelectionIntoFolder

Select some items in the project panel (comps, folders, etc) and this script
will collect them into a new folder with a witty and clever name of your
choosing.

#### distributeLayerInPoints

There are many scripts out there that do this … but this is mine. It
distributes selected layers, by frame, starting where you have the time indicator.

#### easeAlternateKeyframes

Eases alternate keyframes on selected properties.
Part experiment, part work-in-progress.

#### easeLayerDurations

Select a group of layers and this will adjust the in and out points so that
their overall duration eases out exponentially. Play with the constants at
the top of the file to get different results.

#### embiggenSelectedComps

Quick and rough way to embiggen a few comps

#### evenlySpacedLayerMarkers

Evenly Spaced Layer Markers

#### fuzzyOpen

Reads a plain text file that contains a comp ID, and opens that comp.

#### highlightLatestComps

I use a numbering system for my comps, so I can keep track of versions. Each
unique top-level comp starts with a two digit number, and if I need to bump
the version then I append the version. For example if I had 74 versions of
the 01-cool-intro comp:

    01-cool-intro-01
    01-cool-intro-02
    ...
    01-cool-intro-74

… this script would select `01-cool-intro-74`.

This script descends into all folders and subfolders, and selects the highest
version of each comp.

It uses the underscore.js library, which is included in the repo.

Note that this ONLY looks at the first two digits of the comp name, so if two
separate comps begin with the same numbered prefix, it's not gonna work.

#### highlightNestedComps

Select every comp that's nested in another comp.

#### hyphenate

Replace spaces in selected project items with hyphens.

#### layerStartTimesToInPoints

A layer's inPoint is often the same as its startPoint. But if you've trimmed
it (either a nested comp or a footage file, say) then the inPoint reflects
the trimmed point, whereas the startPoint will reflect the "untrimmed"
beginning of the layer.

This script will move the selected layers so that each one's startPoint lines up
with their current inPoint is (moving the inPoint in the process).

BONUS THING: hold down alt (option on Mac) to line up all the layers'
startTimes to the comp's current time.

#### listComps

Dumps a list of all the comps in the project to a JSON file for use with
"fuzzyFinder".

#### listLayers

Dumps a list of layers in the current comp to a plain text file.

#### nullsFromSelected

Creates nulls at the same position as the selected layers, and parents them
to each. Also moves each null to be directly above the layer it's parented
to, and inherits its label.

#### lastSelectedIsParent

Parents the selected layers to the last selected layer, while trying to keep
the hierarchy intact.

#### parentUnderTopmost

Parents the selected layers to the topmost layer, while trying to keep any
existing hierarchy intact.

#### quickCompPrefixer

Adds a prefix to the name of each selected comp. That's it.

Here's my favourite way to use this. If you prefix a comp with a name
followed by a forward slash, during rendering it will be placed in a folder
with that name. For example, if you have a series of comps named like so:

```javascript
cool-comps/banana
cool-comps/mango
cool-comps/pear
```

… then the renderer will output files called "banana", "mango", and "pear" in
a folder named "cool-comps" (if it exists).

I [made a video][41] about this nifty feature.

#### quickLayerRenamer

Asks for a prefix, and renames each layer to that prefix, with a number.
e.g. with the prefix "foo", the layers would be named "foo:1", "foo:2", etc.

#### rectangleAroundComp

Make a shape layer with a rect the size of THIS comp. Holding down the alt
key will add an expression to the size, so that it always matches the comp
size. Default is blue, but the auto-sizing version is yellow. For some reason.

#### selectAllPathProps

Selects every "path" property on selected layers.

#### selectAllColourProperties

Selects all the "colour" properties in the selected layers.

#### selectStrokesWithoutExpression

Selects all strokes without an expression. Not sure what the original goal
was, but I like the use of `aeq()`, so here it stays.

#### selectDescendants

Recursively select children of selected layers. You can right-click on a
layer and do the same thing, but this is helpful enough that I wanted to
assign a keyboard shortcut to it.

#### selectEllipses

Selects all the layers with an ellipse in 'em.

#### selectIdenticalProperties

Selects the same property on all layers, respecting the hierarchy.
For example, if you've selected a property that looks like this:

```javascript
property("Contents").property("Rectangle 2").property("Contents").property("Stroke 1").property("Stroke Width")
```

… the script will select the same property on other layers, but only if it
matches the hierarchy exactly. Handy when you've duplicated a shape
layer and want update the same property on all the instances.

#### selectImmediateChildren

Given a selection, select only the immediate children of those layers (not
the whole tree).

#### selectKeysToTheRight

With each selected property, select keys to the right of the current time.
Deselect keys to the left.

#### selectLayersWithoutParents

Select layers in the active compostion that don't have any parent, while
deselecting those that do.

#### selectNonNestedComps

Select all comps that are not nested in any other comp.

#### selectPropertiesByRegexp

Select all properties that match a regex. Ignores properties that are
usually hidden, like "Layer Styles" and "Material Options".

#### selectRelated

Uses aequery's Layer.relatedLayers() to select all parents and children of
the selected layers.

#### selectStrokeColours

Selects all "stroke colour" properties in the active composition.

#### selectStrokeWidths

Selects all the "Stroke Width" properties on selected layers.

#### selectStrokesAndFills

Selects all strokes and fills on selected layers using the extremely nifty
aeq function. It'll descend into groups and select strokes 'n' fills at any
level.

Default is to select both strokes and fills. If you hold alt (option on Mac),
it'll select only strokes. If you hold shift, it'll select only fills.

#### selectTopLevelGroups

Operates on selected layers in current comp.  Simplify shape layers by
selecting all the top-level groups … which then you can group. If there are
no top-level groups on a layer, it will deselect it and continue looking.

NOTE: this seems to run faster if you select all the layers? Rather than
just one. Weird

#### setupMaskAnimation

This adds default masks to each selected layer, then keyframes the mask shape
twice: *now*, and KEYFRAME\_DISTANCE from now. Plus position property. Then you
can use the "pan behind" tool to move the layer, creating a little
self-contained reveal. Neat!

[1]: #allcompstosametime

[2]: #applypresetatbeginningofselectedlayers

[3]: #collectselectionintofolder

[4]: #distributelayerinpoints

[5]: #easealternatekeyframes

[6]: #easelayerdurations

[7]: #embiggenselectedcomps

[8]: #evenlyspacedlayermarkers

[9]: #fuzzyopen

[10]: #highlightlatestcomps

[11]: #highlightnestedcomps

[12]: #hyphenate

[13]: #layerstarttimestoinpoints

[14]: #listcomps

[15]: #listlayers

[16]: #nullsfromselected

[17]: #lastselectedisparent

[18]: #parentundertopmost

[19]: #quickcompprefixer

[20]: #quicklayerrenamer

[21]: #rectanglearoundcomp

[22]: #selectallpathprops

[23]: #selectallcolourproperties

[24]: #selectstrokeswithoutexpression

[25]: #selectdescendants

[26]: #selectellipses

[27]: #selectidenticalproperties

[28]: #propertybank

[29]: #propertybank-1

[30]: #selectimmediatechildren

[31]: #selectkeystotheright

[32]: #selectlayerswithoutparents

[33]: #selectnonnestedcomps

[34]: #selectpropertiesbyregexp

[35]: #selectrelated

[36]: #selectstrokecolours

[37]: #selectstrokewidths

[38]: #selectstrokesandfills

[39]: #selecttoplevelgroups

[40]: #setupmaskanimation

[41]: https://youtu.be/d1WLeTFQ15k
