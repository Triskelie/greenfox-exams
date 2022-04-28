const Datastore = require('nedb');
const orders = new Datastore({ filename: './db/orders.db', autoload: true });

export { orders }
