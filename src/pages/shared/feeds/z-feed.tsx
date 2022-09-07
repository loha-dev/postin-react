import { useSearch } from "@tanstack/react-location";
import {
  activeAccountSearch,
  activePageTypeSearch,
} from "../../../types/account-type";
import { socialFilterSearch } from "../../../types/social-type";

const Feed = () => {
  const search = useSearch<
    socialFilterSearch & activeAccountSearch & activePageTypeSearch
  >();
  return <h2>I am the feed</h2>;
};

export default Feed;
