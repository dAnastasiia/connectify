import { LOCAL_STORAGE_KEYS } from '@frontend-graphql/utils/constants';

export default function getAuthHeader() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  return accessToken ? `Bearer ${accessToken}` : '';
}
