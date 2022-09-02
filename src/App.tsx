import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routes } from "./routes";

const location = new ReactLocation();
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <Outlet />
        <ReactLocationDevtools position="top-right" />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
    </QueryClientProvider>
  );
};

export default App;
