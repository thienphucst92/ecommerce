const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { buildFederatedSchema } = require('@apollo/federation');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const dataSources = require('./datasources');
const { createLoaders } = require('./utils/loaders');

const app = express();

app.get('/healthcheck', (req, res) => {
  res.status(200).send({ isSuccess: true });
});

const context = async ({ req }) => ({
  loaders: createLoaders(),
});

const federatedSchema = buildFederatedSchema([
  {
    typeDefs: gql`${typeDefs}`,
    resolvers,
  },
]);

const server = new ApolloServer({
  schema: federatedSchema,
  dataSources,
  context,
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context: ctx, response }) {
            // Append our final result to the outgoing response headers
            response.http.headers.append(
              'audit',
              JSON.stringify(ctx.audit || {}),
            );
          },
        };
      },
    },
  ],
  formatError: (error) => {
    logger.error('error', { error: error.stack || error.message || error });
    return error;
  },
});
server.applyMiddleware({ app, path: '/' });
server.installSubscriptionHandlers(app);

module.exports = app;
