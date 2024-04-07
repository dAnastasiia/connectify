import { GraphQLClient } from 'graphql-request';
import { environment } from '../../../environments/environment';

const graphQLClient = new GraphQLClient(environment.API_URL);

export default graphQLClient;
