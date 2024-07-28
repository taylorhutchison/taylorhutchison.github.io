const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Directory containing markdown files
const publishDir = path.join(__dirname, 'publish');
// Template file
const templateFile = path.join(__dirname, 'templates\\post-template.html');
// Output directory
const outputDir = path.join(__dirname, 'posts');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

// Read template content
const templateContent = fs.readFileSync(templateFile, 'utf8');

// Read all markdown files in the publish directory
fs.readdir(publishDir, (err, files) => {
    if (err) {
        console.error('Error reading publish directory:', err);
        return;
    }

    files.filter(file => path.extname(file) === '.md').forEach(file => {
        const filePath = path.join(publishDir, file);
        convertAndInject(filePath);
    });
});


// Function to convert markdown to HTML and inject into template
function convertAndInject(file) {
    const markdownContent = fs.readFileSync(file, 'utf8');
    const htmlContent = marked.parse(markdownContent);
    const finalContent = templateContent.replace('<!-- CONTENT_PLACEHOLDER -->', htmlContent);
    const outputFileName = path.basename(file, '.md') + '.html';
    const outputPath = path.join(outputDir, outputFileName);
    fs.writeFileSync(outputPath, finalContent, 'utf8');
    console.log(`Converted ${file} to ${outputPath}`);
}