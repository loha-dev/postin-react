import { ReactLocation, Router } from "@tanstack/react-location";
import { ReactLocationDevtools } from "@tanstack/react-location-devtools";
import { routes } from "./routes/routes";

const location = new ReactLocation();

const App = () => {
  return (
    <Router location={location} routes={routes}>
      <ReactLocationDevtools />
    </Router>
  );
};

export default App;
