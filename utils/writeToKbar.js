// write to kbar
// writeLn($.global.kbar.button);
if ($.global.banana === undefined) {
    $.global.banana = {
        arg: "woah"
    };
}

clearOutput();

writeLn("here goes nothing");
// writeLn(typeof kbar);
if (typeof kbar !== 'undefined' && kbar.button) {
    writeLn("writing kbar");
    kbar.button.argument = "oh hai mark";
        // argument: "oh hai mark"
    // };
}


$.setenv("banana", "yellow");

// $.global.kbar.button.argument = "oh hai mark"