import Shop from './bootstrap.js';

let shop = new Shop({
    configDir: __dirname + '/config/'
});
shop.start(8080);
