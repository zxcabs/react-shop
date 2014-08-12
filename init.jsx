import Server from './Server.jsx';
import SupplyClubFrontend from './SupplyClubFrontend.jsx';
import Product from './Product.jsx';

let app = new Server();
app.init();
app.mount('/', SupplyClubFrontend);
app.run();
