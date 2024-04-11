const http = require('http');
const staticContents = require('./static.js');

const server = http.createServer((request, response) => {
    staticContents(request, response, __dirname); // Pass the root directory (__dirname)
});

const port = 8920;
server.listen(port, () => {
    console.log(`Running in localhost at port ${port}`);
});
