import { useContext } from 'react';
import { NotificationsContext } from '@frontend-graphql/providers/NotificationsProvider';

export default function useNotifications() {
  return useContext(NotificationsContext);
}
