print('Start #################################################################');

db = db.getSiblingDB('product-db');
db.createUser(
  {
    user: 'ecommerce',
    pwd: 'admin1234',
    roles: [{ role: 'readWrite', db: 'product-db' }],
  },
);
db.createCollection('products');
db.products.insertMany([
  {
    sku: '1',
    name: 'iphone 6',
    price: '400',
    branch: 'apple',
    colour: 'gold',
  },
  {
    sku: '2',
    name: 'iphone 6',
    price: '399',
    branch: 'apple',
    colour: 'pinky',
  },
  {
    sku: '3',
    name: 'iphone 6',
    price: '401',
    branch: 'apple',
    colour: 'white',
  },
  {
    sku: '4',
    name: 'iphone 7',
    price: '520',
    branch: 'apple',
    colour: 'red',
    inventoryCount: 10,
  },
  {
    sku: '5',
    name: 'iphone 7',
    price: '499',
    branch: 'apple',
    colour: 'blue',
  },
  {
    sku: '5',
    name: 'iphone 7',
    price: '500',
    branch: 'apple',
    colour: 'silver',
  },
  {
    sku: '6',
    name: 'iphone 8',
    price: '700',
    branch: 'apple',
    colour: 'white',
  },
  {
    sku: '7',
    name: 'iphone 8',
    price: '690',
    branch: 'apple',
    colour: 'silver',
  },
  {
    sku: '8',
    name: 'iphone 8',
    price: '720',
    branch: 'apple',
    colour: 'gold',
  },
]);

db = db.getSiblingDB('inventory-db');
db.createUser(
  {
    user: 'ecommerce',
    pwd: 'admin1234',
    roles: [{ role: 'readWrite', db: 'inventory-db' }],
  },
);
db.createCollection('products');

db.products.insertMany([
  {
    sku: '1',
    inventoryCount: 500,
  },
  {
    sku: '2',
    inventoryCount: 40,
  },
  {
    sku: '3',
    inventoryCount: 100,
  },
  {
    sku: '4',
    inventoryCount: 10,
  },
  {
    sku: '5',
    inventoryCount: 900,
  },
  {
    sku: '5',
    inventoryCount: 1,
  },
  {
    sku: '6',
    inventoryCount: 200,
  },
  {
    sku: '7',
    inventoryCount: 121,
  },
  {
    sku: '8',
    inventoryCount: 39,
  },
]);

db = db.getSiblingDB('auditor-db');
db.createUser(
  {
    user: 'ecommerce',
    pwd: 'admin1234',
    roles: [{ role: 'readWrite', db: 'auditor-db' }],
  },
);
