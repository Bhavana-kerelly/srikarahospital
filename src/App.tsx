import React, { useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  // Production-grade QueryClient configuration
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes fresh
            gcTime: 1000 * 60 * 30, // 30 minutes in garbage collection cache
            retry: 1, // Single retry on network failure
            refetchOnWindowFocus: false, // Prevent unwanted re-fetches for patient stability
          },
          mutations: {
            retry: 0,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
