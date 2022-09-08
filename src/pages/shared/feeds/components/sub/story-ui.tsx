import { Carousel } from "@mantine/carousel";
import { fullQueryPostType } from "../../../../../types/post";

const StoryUI = ({ item }: { item: fullQueryPostType }) => {
  const {
    id,
    img,
    page: {
      title,
      social: { title: social_title, img: social_img },
      owner: { avatar, name, id: owner_id },
    },
  } = item;
  return (
    <Carousel.Slide key={id}>
      <div className=" w-full relative rounded-xl overflow-hidden p-1 bg-white">
        <img
          src={img !== null ? img : ""}
          alt=""
          className="object-cover h-72 rounded-xl"
        />
        <div className="absolute top-3 left-3 flex items-center justify-center ">
          <div className="rounded-full overflow-hidden p-[0.16rem] bg-sky-500">
            <img
              src={avatar}
              alt=""
              className="w-10 h-10 object-cover rounded-full"
            />
          </div>
          <span className="text-white font-semibold text-base">{name}</span>
        </div>
        <span className="py-[0.16rem] px-2 bg-white absolute right-0 gap-2 bottom-4 flex items-center rounded-l-xl ">
          <img src={social_img} alt="" className="w-4 h-4" />
          <span>
            {title.slice(0, 10)}
            {title.length > 10 ? "..." : ""}
          </span>
        </span>
      </div>
    </Carousel.Slide>
  );
};
export default StoryUI;
