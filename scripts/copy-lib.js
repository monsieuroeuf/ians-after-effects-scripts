const { globSync } = require('glob');
const { ncp } = require('ncp')
const { join, basename } = require('path');

const srcGlob = './src/lib/*js'
const destDir = './dist/lib/';

const libFiles = globSync(srcGlob);
console.log(libFiles);

libFiles.forEach(function (file) {
    const destFile = join(destDir, basename(file));

    ncp(file, destFile, function (err) {
        if (err) {
            return console.error(`Error copying ${file}:`, err);
        }
        console.log(`Copied ${file} to ${destFile}`);
    });
});
