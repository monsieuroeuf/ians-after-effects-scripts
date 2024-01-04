#target aftereffects

( function() {
#include "../aeq.js"; // jshint ignore:line

// Class PropertyBank
function PropertyBank(prop) {

	// Constructor
	this.propAry = aeq.arrayEx(); // an array with more methods

	// methods
	this.addProp = function (prop) {
		this.propAry.push(prop);
	}

	this.toString = function () {
		var result = "";
		this.propAry.reverse();
		aeq.forEach(this.propAry, function (item) {
			// debugger;
			result += item.name + ", ";
		});
		this.propAry.reverse();
		return result;
	}

	this.makePropertySpec = function () {
		// loop thru the array, wrapping each prop in property("x")
		var result = [];
		aeq.forEach(this.propAry, function (item) {
			result.push("property(\"" + item.name + "\")");
		});
		return result.reverse().join(".");
	}
}

// start here
var comp = aeq.getActiveComposition();
var propertyBankAry = [];

aeq.forEach(aeq.getSelectedProperties(comp), function (prop) {
	// loop through all the selected properties
	var currentProp = prop;

	// create a new object for each selected property
	var currentPropertyBank = new PropertyBank();

	// walk up the parent chain
	while (currentProp.parentProperty !== null) {
		currentPropertyBank.addProp(currentProp);
		currentProp = currentProp.parentProperty;
	}

	// add to the master list
	propertyBankAry.push(currentPropertyBank);
	/*
	if (aeq.property.type(prop) === "PROPERTY") { // ignore groups
		$.writeln(prop.name);
		aeq("prop[name='" + prop.name + "']", comp).forEach(function (prop) {
			// use the aeq selector to grab all properties with the same name ...
			prop.selected = true;
		});
	}
	*/

});

aeq.forEach(propertyBankAry, function (item) {
	$.writeln(item.makePropertySpec());
});

// select 'em all
aeq.forEach(aeq.getLayers(comp), function(layer) {
    aeq.forEach(propertyBankAry, function(prop) {
    	// some are hidden by default, so we'll just ignore the ones that can't be selected
        try {
            var propSpec = eval("layer." + prop.makePropertySpec());
                    propSpec.selected = true;

           } catch(e) {}
    });

});


}() );
