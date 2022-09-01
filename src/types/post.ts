import { MakeGenerics } from "@tanstack/react-location";
type PostType = {
  id: string;
  title: string;
  body: string;
};
type LocationGenerics = MakeGenerics<{
  LoaderData: {
    posts: PostType[];
    post: PostType;
  };
}>;
