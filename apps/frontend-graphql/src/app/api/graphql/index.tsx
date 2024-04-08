import { GraphQLClient } from 'graphql-request';

import getAuthHeader from './getAuthHeader';

import { environment } from '../../../environments/environment';

const graphQLClient = new GraphQLClient(environment.API_URL, {
  // method: "POST", // * by default from lib
  headers: () => ({
    //  'Content-Type': 'application/json', // * by default from lib
    Authorization: getAuthHeader(),
  }),
});

export default graphQLClient;
