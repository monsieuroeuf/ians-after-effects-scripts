const chokidar = require('chokidar');
const path = require('node:path');
const fs = require('node:fs');

// Path to your output directory
const outputDir = './ae-scripts-dist';

// Initialize watcher
const watcher = chokidar.watch(outputDir, {
    persistent: true,
    ignoreInitial: true,
    ignored: '**/lib/**'
});

// Function to rename .js to .jsx
const renameFile = (filePath) => {
    const extname = path.extname(filePath);
    const basename = path.basename(filePath, extname);

    console.log(`File ${filePath} has been changed`);



    if (extname === '.js') {
        const newFilePath = path.join(path.dirname(filePath), `${basename}.jsx`);
        fs.rename(filePath, newFilePath, (err) => {
            if (err) {
                console.error(`Error renaming file: ${err}`);
            } else {
                console.log(`Renamed: ${filePath} -> ${newFilePath}`);
            }
        });
    }
};

// Watch for added or changed files
watcher
    .on('add', renameFile)
    .on('change', renameFile);

console.log(`Watching for changes in ${outputDir}...`);

