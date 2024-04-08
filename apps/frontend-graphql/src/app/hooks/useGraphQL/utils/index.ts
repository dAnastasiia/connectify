import { CustomError } from '@frontend-graphql/types';

// Function to handle GraphQL errors
export const handleGraphQLErrors = (errors: any[]): CustomError[] => {
  return errors.map((err: any) => ({
    message: err.message,
    status: err.status,
    errors: err.errors,
  }));
};

// Function to handle generic errors
export const handleGenericError = (): CustomError[] => {
  return [{ message: 'Unknown error occurred', status: 500 }];
};
