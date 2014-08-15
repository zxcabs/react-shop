require('./node_modules/gulp-traceur/node_modules/traceur/bin/traceur-runtime.js');
var Server = require('./dist/app/Server.jsx').default;
var SupplyClubFrontend = require('./dist/app/SupplyClubFrontend.jsx').default;
var app = new Server();
app.init();
app.mount('/', SupplyClubFrontend);
app.run();
