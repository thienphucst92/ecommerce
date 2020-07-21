/* eslint global-require:off, import/no-dynamic-require:off */

const requireGraphQLFile = require('require-graphql-file');

const fs = require('fs');
const path = require('path');

const typeDefs = [];
const typesPath = path.join(__dirname, '/schemas/types');
fs.readdirSync(typesPath).forEach((file) => {
  typeDefs.push(requireGraphQLFile(`./schemas/types/${file}`));
});

const inputsPath = path.join(__dirname, '/schemas/inputs');
fs.readdirSync(inputsPath).forEach((file) => {
  typeDefs.push(requireGraphQLFile(`./schemas/inputs/${file}`));
});

const queriesPath = path.join(__dirname, '/schemas/queries');
fs.readdirSync(queriesPath).forEach((file) => {
  typeDefs.push(requireGraphQLFile(`./schemas/queries/${file}`));
});

module.exports = typeDefs;
