import { useContext } from 'react';
import { NotificationsContext } from '@frontend/providers/NotificationsProvider';

export default function useNotifications() {
  return useContext(NotificationsContext);
}
