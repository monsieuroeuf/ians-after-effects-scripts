<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

*   [embiggenSelectedComps][1]
*   [fuzzyOpen][2]
*   [highlightNestedComps][3]
*   [IanLib][4]
*   [listComps][5]
*   [listLayers][6]
*   [nullsFromSelected][7]
*   [lastSelectedIsParent][8]
*   [parentUnderTopmost][9]
*   [beginUndoGroup][10]
    *   [Parameters][11]
*   [beginUndoGroup][12]
*   [quickLayerRenamer][13]
*   [selectAllPathProps][14]
*   [selectIdenticalProperties][15]
*   [PropertyBank][16]
*   [DEBUGGING][17]
*   [useAEQ][18]
*   [defaultMatch][19]

## embiggenSelectedComps

Quick and rough way to embiggen a few comps

## fuzzyOpen

Reads a plain text file that contains a comp ID, and opens that comp.

## highlightNestedComps

First, deselect everything in the project. Then, select every comp that's
nested in another comp.

## IanLib

## listComps

Dumps a list of all the comps in the project to a JSON file for use with
"fuzzyFinder".

## listLayers

Dumps a list of layers in the current comp to a plain text file.

## nullsFromSelected

Creates nulls at the same position as the selected layers, and parents them
to each. Also moves each null to be directly above the layer it's parented
to, and inherits its label.

## lastSelectedIsParent

Parents the selected layers to the last selected layer, while trying to keep
the hierarchy intact.

## parentUnderTopmost

Parents the selected layers to the topmost layer, while trying to keep any
existing hierarchy intact.

## beginUndoGroup

Quick Comp Renamer

Adds a prefix to the name of each selected comp.

### Parameters

*   `s` **[string][20]** The prefix to add to the comp name. (optional, default `""`)

Returns **void**&#x20;

## beginUndoGroup

Uses aequery's Layer.relatedLayers() to select all parents and children of
the selected layers.

## quickLayerRenamer

Asks for a prefix, and renames each layer to that prefix, with a number.
e.g. with the prefix "foo", the layers would be named "foo:1", "foo:2", etc.

## selectAllPathProps

Selects every "path" property on selected layers

## selectIdenticalProperties

Selects the same property on all layers, respecting the hierarchy.
For example, if you've selected a property that looks like this:

```javascript
property("Contents").property("Rectangle 2").property("Contents").property("Stroke 1").property("Stroke Width")
```

… the script will select the same property on other layers, but only if it
matches the hierarchy exactly. Very handy when you've duplicated a shape
layer and want to update its colour or stroke etc.

## PropertyBank

## DEBUGGING

Select all properties that match a regex. We'll ignore properties that are
usually hidden, like "Layer Styles" and "Material Options".

## useAEQ

Selects all the "Stroke Width" properties on selected layers.

## defaultMatch

Select Strokes and Fills

Selects all strokes and fills on selected layers using the extremely nifty
aeq function. It'll descend into groups and select strokes 'n' fills at any
level.

Default is to select both strokes and fills. If you hold alt (option on Mac),
it'll select only strokes. If you hold shift, it'll select only fills.

[1]: #embiggenselectedcomps

[2]: #fuzzyopen

[3]: #highlightnestedcomps

[4]: #ianlib

[5]: #listcomps

[6]: #listlayers

[7]: #nullsfromselected

[8]: #lastselectedisparent

[9]: #parentundertopmost

[10]: #beginundogroup

[11]: #parameters

[12]: #beginundogroup-1

[13]: #quicklayerrenamer

[14]: #selectallpathprops

[15]: #selectidenticalproperties

[16]: #propertybank

[17]: #debugging

[18]: #useaeq

[19]: #defaultmatch

[20]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String
