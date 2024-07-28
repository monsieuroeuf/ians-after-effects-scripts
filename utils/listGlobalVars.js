// Function to list all global variables and functions
function listGlobalVariables() {
    var globalVars = [];
    for (var prop in $.global) {
        if ($.global.hasOwnProperty(prop)) {
            globalVars.push(prop);
        }
    }
    return globalVars;
}

// Print the global variables and functions to the console
var globals = listGlobalVariables();
for (var i = 0; i < globals.length; i++) {
    writeLn(globals[i]);
}

for (var prop in kbar) {
    if (kbar.hasOwnProperty(prop)) {
        writeLn(prop);
    }
}
