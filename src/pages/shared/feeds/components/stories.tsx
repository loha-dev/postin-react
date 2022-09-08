import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../../utils/supabase";
import { Carousel } from "@mantine/carousel";
import StoryUI from "./sub/story-ui";
import type { fullQueryPostType } from "../../../../types/post";
const Stories = () => {
  const { data } = useQuery(["stories"], async () => {
    const { data } = await supabase
      .from("stories")
      .select(
        `
    id, created_at, title, description, img, video, likes, 
    shares, page(id, title, owner (id, name, phone, avatar),
     social (id, title, img) ))
    `
      )
      .range(0, 15);
    console.log(data![0]);
    return data as fullQueryPostType[];
  });
  return (
    <Carousel slideSize="24%" slideGap="md" align="start">
      {data?.map((item) => (
        <StoryUI key={item.id} item={item} />
      ))}
    </Carousel>
  );
};
export default Stories;
