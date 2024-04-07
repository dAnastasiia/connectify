// Queries, invitations, types for GraphQL service
import { buildSchema } from 'graphql';

// * if no ! will be return an error for the wrong type

export const schema = buildSchema(`
   type TestData {
      text: String!
      views: Int!
   }

   type RootQuery {
      hello: TestData!
   }

   schema {
      query: RootQuery
   }
`);
// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

// /**
//  * Construct a GraphQL schema and define the necessary resolvers.
//  *
//  * type Query {
//  *   hello: String
//  * }
//  */
// export const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve: () => 'world',
//       },
//     },
//   }),
// });
