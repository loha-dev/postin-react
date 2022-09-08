import PostUI from "./sub/post-ui";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../utils/supabase";
import type { fullQueryPostType } from "../../../../types/post";
const Posts = () => {
  const { data: posts } = useQuery(["posts"], async () => {
    const { data } = await supabase
      .from("posts")
      .select(
        `
    id, created_at, title, description, img, video, likes, 
    shares, page(id, title, owner (id, name, phone, avatar),
     social (id, title, img) ))
    `
      )
      .range(10, 20);
    console.log(data![0]);
    return data as fullQueryPostType[];
  });
  return (
    <div className="flex flex-col gap-2">
      {posts?.map((post) => {
        return <PostUI key={post.id} item={post} />;
      })}
    </div>
  );
};
export default Posts;
