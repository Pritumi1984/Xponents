const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determine the file path based on the URL
    const filePath = req.url === '/' ? 'indexyec.html' : req.url.slice(1); // Remove the leading '/'

    // Read the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // Handle file not found or other errors
            res.writeHead(404);
            res.end('File not found');
        } else {
            // Determine content type based on the file extension
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.js') {
                contentType = 'application/javascript';
            } else if (ext === '.json') {
                contentType = 'application/json';
            }

            // Set the appropriate headers and send the file content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

const port = 3000; // Choose a port for your server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
