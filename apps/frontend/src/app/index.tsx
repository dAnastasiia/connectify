import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
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
                <RouterProvider />
                <ToastContainer position="bottom-right" theme="colored" />
              </BrowserRouter>
            </NotificationsProvider>
          </LoggerProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
