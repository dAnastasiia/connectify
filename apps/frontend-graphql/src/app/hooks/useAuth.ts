import { useContext } from 'react';
import { AuthContext } from '@frontend-graphql/providers/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}
