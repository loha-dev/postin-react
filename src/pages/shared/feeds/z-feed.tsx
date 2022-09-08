import { useSearch } from "@tanstack/react-location";
import {
  activeAccountSearch,
  activePageTypeSearch,
} from "../../../types/account-type";
import { socialFilterSearch } from "../../../types/social-type";
import Stories from "./components/stories";
import Posts from "./components/posts";
import Recent from "./components/recent";
import Recomendation from "./components/recomendation";
import Sponsored from "./components/sponsored";
import { ScrollArea } from "@mantine/core";

const Feed = () => {
  const search = useSearch<
    socialFilterSearch & activeAccountSearch & activePageTypeSearch
  >();

  return (
    <div className="w-full grid grid-cols-feeds gap-4">
      <ScrollArea
        style={{
          height: "100vh",
        }}
      >
        <div className="flex  gap-5 flex-col">
          <Stories />
          <Posts />
        </div>
      </ScrollArea>
      <div className="flex gap-5 flex-col">
        <Recent />
        <Recomendation />
        <Sponsored />
      </div>
    </div>
  );
};

export default Feed;
