//Old way to import. Now done like [import '' from '']
const http = require('http');
const app = require('./app');

//from environment variable [process.env.PORT] or hard coded
const port = process.env.PORT || 3000;

//Creates server
const server = http.createServer(app);

//Starts listening on the port (activate server)
server.listen(port);