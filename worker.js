require.cache = {};
var Server = require('./dist/app/Server.jsx').Server;
var app = new Server();
app.init();
app.run();