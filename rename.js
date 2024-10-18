const chokidar = require('chokidar');
const path = require('node:path');
const fs = require('node:fs');

// Path to your output directory
const outputDir = './ae-scripts-dist';

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

// Function to rename files in a directory
const renameFilesInDirectory = (dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error stating file: ${err}`);
                    return;
                }

                if (stats.isFile()) {
                    renameFile(filePath);
                }
            });
        });
    });
};

// Check command-line arguments
const args = process.argv.slice(2);
if (args.includes('--one-off')) {
    // Run as a one-off
    renameFilesInDirectory(outputDir);
} else {
    // Initialize watcher
    const watcher = chokidar.watch(outputDir, {
        persistent: true,
        ignoreInitial: true,
        ignored: '**/lib/**'
    });

    // Watch for added or changed files
    watcher
        .on('add', renameFile)
        .on('change', renameFile);

    console.log(`Watching for changes in ${outputDir}...`);
}

