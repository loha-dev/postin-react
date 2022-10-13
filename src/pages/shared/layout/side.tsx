import Horizontal from "./components/horizontal";
import Ads from "./components/ads";
import { ScrollArea } from "@mantine/core";
const Side = () => {
  return (
    <ScrollArea sx={{ height: "90vh", margin: "1rem", minWidth: "250px" }}>
      <aside className="flex flex-col gap-2">
        <Horizontal />
        <Ads />
      </aside>
    </ScrollArea>
  );
};
export default Side;
