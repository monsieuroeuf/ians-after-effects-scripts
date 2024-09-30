// writeLn("reading kbar");
if (kbar.button) {
    writeLn("reading kbar");
    writeLn("kbar: " + kbar.button.argument);
}

// writeLn($.global.banana.arg);
// writeLn($.stack);
// writeLn($.about());
// writeLn($.colorPicker())

writeLn("argumentative: " + $.getenv("argumentative"));

// alert("argumentative: " + $.getenv("argumentative"));
// writeLn("filename: " + $.fileName)