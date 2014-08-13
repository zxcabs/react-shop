import Server from './Server.jsx';
import SupplyClubFrontend from './SupplyClubFrontend.jsx';

let app = new Server();
app.init();
app.mount('/', SupplyClubFrontend);
app.run();
