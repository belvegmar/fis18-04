var server = require('./server');
var PORT = (process.env.PORT || 3000);

console.log("Starting API server...");

server.app.listen(PORT);

console.log("Server ready!");