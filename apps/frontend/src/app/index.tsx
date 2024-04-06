import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  AuthProvider,
  LocalizationProvider,
  LoggerProvider,
  NotificationsProvider,
  QueryClientProvider,
  RouterProvider,
  ThemeProvider,
} from './providers';

export default function App() {
  return (
    <LocalizationProvider>
      <QueryClientProvider>
        <ThemeProvider>
          <LoggerProvider>
            <NotificationsProvider>
              <BrowserRouter>
                <AuthProvider>
                  <RouterProvider />
                  <ToastContainer position="bottom-right" theme="colored" />
                </AuthProvider>
              </BrowserRouter>
            </NotificationsProvider>
          </LoggerProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
