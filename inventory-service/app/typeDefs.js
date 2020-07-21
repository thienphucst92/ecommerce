/* eslint global-require:off, import/no-dynamic-require:off */

const requireGraphQLFile = require('require-graphql-file');

const fs = require('fs');
const path = require('path');

const typeDefs = [];
const typesPath = path.join(__dirname, '/schemas/types');
fs.readdirSync(typesPath).forEach((file) => {
  typeDefs.push(requireGraphQLFile(`./schemas/types/${file}`));
});

module.exports = typeDefs;
