const fs = require('fs'); // File system module for file operations
const path = require('path'); // Path module for working with file paths

function serveStaticFile(request, response) {
    let filePath = '.' + request.url; // Construct file path relative to current directory

    if (filePath === './') {
        filePath = './views/index.html'; // Default to serving index.html if no specific file requested
    } else {
        filePath = './views/' + filePath; // Adjust file path to look into views folder
    }

    if (filePath.endsWith('.css')) {
        const cssFilePath = path.join(__dirname, 'stylesheets', path.basename(filePath)); // Construct full path to CSS file
        if (fs.existsSync(cssFilePath)) {
            filePath = cssFilePath; // Use CSS file path if it exists
        }
    }

    // Check if the requested URL points to an image file (png, jpg/jpeg, gif, svg)
    if (filePath.match(/\.(png|jpg|gif|svg|jpeg)$/)) {
        const imageFilePath = path.join(__dirname, 'images', path.basename(filePath)); // Construct the full path to the image file
        if (fs.existsSync(imageFilePath)) {
            filePath = imageFilePath; // Use the image file path if it exists
        }
    }

    fs.readFile(filePath, function (error, content) {
        if (error) {
            response.writeHead(404); // Handle 404 errors
            response.end('404 Not Found');
        } else {
            const extname = path.extname(filePath); // Get file extension
            const contentType = getContentType(extname); // Get MIME type
            response.writeHead(200, { 'Content-Type': contentType }); // Set response headers
            response.end(content); // Send file content as response body
        }
    });
}

function getContentType(extname) {
    const contentTypeMap = { // Map file extensions to MIME types
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml'
    };
    return contentTypeMap[extname] || 'application/octet-stream'; // Default to octet-stream if type not found
}

module.exports = serveStaticFile; // Export function for use in other modules
