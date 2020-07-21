require('./global');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { ApolloGateway, RemoteGraphQLDataSource } = require('@apollo/gateway');
const { auditLog } = require('./routes/audit');
const config = require('./config');

const { serviceList } = config;
const app = express();

app.get('/healthcheck', (req, res) => {
  res.status(200).send({ isSuccess: true });
});

auditLog(app);

class AuditRemoteGraphQLDataSource extends RemoteGraphQLDataSource {
  async didReceiveResponse(response, req, context) {
    const body = await super.didReceiveResponse(response, req, context);
    const audit = JSON.parse(response.headers.get('audit') || '{}');
    context.audit = { ...context.audit, ...audit };
    return body;
  }
}

const gateway = new ApolloGateway({
  serviceList,
  buildService({ url }) {
    return new AuditRemoteGraphQLDataSource({
      url,
    });
  },
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,

  context: async ({ req }) => {
    const { query } = req.body;

    if (query && query.match(/IntrospectionQuery/)) {
      return { };
    }

    return { audit: { shouldSend: true } };
  },
  plugins: [
    {
      requestDidStart() {
        return {
          willSendResponse({ context: ctx, response }) {
            response.http.headers.append(
              'audit',
              JSON.stringify(ctx.audit || {}),
            );
          },
        };
      },
    },
  ],
  playground: true,
  introspection: true,
});
server.applyMiddleware({ app, path: '/' });

module.exports = app;
