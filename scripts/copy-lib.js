const { globSync } = require('glob');
const { ncp } = require('ncp')
const { join, basename } = require('node:path');

const srcGlob = './src/lib/*js'
const destDir = './ae-scripts-dist/lib/';

const libFiles = globSync(srcGlob);
console.log(libFiles);

for (const file of libFiles) {
    const destFile = join(destDir, basename(file));

    ncp(file, destFile, (err) => {
        if (err) {
            return console.error(`Error copying ${file}:`, err);
        }
        console.log(`Copied ${file} to ${destFile}`);
    });
}
