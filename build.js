const fs = require('fs-extra');
const path = require('path');

const buildDir = path.join(__dirname, 'dist');
const sourceDir = __dirname;

async function build() {
    try {
        // 1. Clean build directory
        await fs.emptyDir(buildDir);
        console.log('Cleaned build directory.');

        // 2. Create config file from environment variables
        const geminiApiKey = process.env.GEMINI_API_KEY;
        const hfApiKey = process.env.HF_API_KEY || ''; // Optional, defaults to empty

        if (!geminiApiKey) {
            throw new Error('GEMINI_API_KEY environment variable not set.');
        }

        const configContent = `
var CALORIQ_CONFIG = {
    GEMINI_API_KEY: "${geminiApiKey}",
    HF_API_KEY: "${hfApiKey}"
};
`;

        await fs.ensureDir(path.join(buildDir, 'js'));
        await fs.writeFile(path.join(buildDir, 'js', 'config.js'), configContent);
        console.log('Generated js/config.js from environment variables.');

        // 3. Copy all other static assets
        const filesToCopy = [
            'index.html',
            'css',
            'js/app.js',
            'js/chart.js',
            'img',
            'manifest.json',
            'sw.js'
        ];

        for (const file of filesToCopy) {
            const srcPath = path.join(sourceDir, file);
            const destPath = path.join(buildDir, file);
            if (await fs.pathExists(srcPath)) {
                await fs.copy(srcPath, destPath);
                console.log(`Copied ${file} to dist.`);
            }
        }

        console.log('\nBuild process completed successfully!');
        console.log('Deploy the "dist" directory to your hosting provider.');

    } catch (error) {
        console.error('\nBuild failed:', error.message);
        process.exit(1);
    }
}

build();
