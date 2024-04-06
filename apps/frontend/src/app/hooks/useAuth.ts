import { useContext } from 'react';
import { AuthContext } from '@frontend/providers/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}
