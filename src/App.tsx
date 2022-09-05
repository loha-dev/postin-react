import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from "@mantine/hooks";
import { routes } from "./routes";
import { useAtom } from "jotai";
import { darkMode } from "./atomic/theme";
import { useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

const location = new ReactLocation();
const queryClient = new QueryClient();

const App = () => {
  const color = useColorScheme();
  const [theme, setTheme] = useAtom(darkMode);
  useEffect(() => {
    const theme = localStorage.getItem("theme") as
      | "dark"
      | "light"
      | undefined
      | null;
    theme ? setTheme(theme) : setTheme(color);
  }, [color]);
  return (
    <QueryClientProvider client={queryClient}>
      <Router location={location} routes={routes}>
        <MantineProvider
          withNormalizeCSS
          withGlobalStyles
          theme={{
            fontFamily: "Nunito, Verdana, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Greycliff CF, sans-serif" },
          }}
        >
          <NotificationsProvider>
            <main
              className={`${
                theme === "dark" ? "dark" : ""
              } bg-fotsy min-h-screen`}
            >
              <Outlet />
            </main>
          </NotificationsProvider>
        </MantineProvider>
        <ReactLocationDevtools position="bottom-left" />
      </Router>
    </QueryClientProvider>
  );
};

export default App;

{
  // import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
  // <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />
}
