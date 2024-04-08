import { createHandler } from 'graphql-http/lib/use/express';

import { schema } from './schema';
import resolvers from './resolvers';

// ... code

app.all(
  '/graphql',
  createHandler({
    schema,
    rootValue: resolvers,

    // * Errors handler for GraphQL
    formatError(err) {
      const originalError = err.originalError;

      const status = originalError.statusCode || 500;
      const message = originalError.message || 'An error occured';
      const errors = originalError.data;

      return { message, status, errors };
    },
  })
);

// ... code
