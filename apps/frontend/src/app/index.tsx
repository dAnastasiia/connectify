import { BrowserRouter } from 'react-router-dom';

import {
  LocalizationProvider,
  LoggerProvider,
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
            <BrowserRouter>
              <RouterProvider />
            </BrowserRouter>
          </LoggerProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
}
