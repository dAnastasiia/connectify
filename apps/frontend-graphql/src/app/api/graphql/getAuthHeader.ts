import { LOCAL_STORAGE_KEYS } from '@frontend-graphql/utils/constants';
import getJwtExpDate from '@frontend-graphql/utils/getJwtExpDate';

import { handleLogout } from '../utils/handleLogout';

export default function getAuthHeader() {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.accessToken);

  const expirationDate = getJwtExpDate(accessToken);
  const isTokenExpired = expirationDate < Date.now();

  if (accessToken && isTokenExpired) {
    handleLogout();
    return '';
  }

  return accessToken ? `Bearer ${accessToken}` : '';
}
