import { fullQueryPostType } from "../../../../../types/post";
import dayjs from "dayjs";

import relativeTime from "dayjs/plugin/relativeTime";
import { BsThreeDots } from "react-icons/bs";
import {
  AiOutlineComment,
  AiOutlineShareAlt,
  AiTwotoneLike,
} from "react-icons/ai";
dayjs.extend(relativeTime);
import { RiSendPlaneFill } from "react-icons/ri";
const PostUi = ({ item }: { item: fullQueryPostType }) => {
  const {
    id,
    img,
    created_at,
    description,
    likes,
    shares,
    page: {
      title,
      social: { title: social_title, img: social_img, id: social_id },
      owner: { avatar, name, id: owner_id, phone },
    },
  } = item;
  return (
    <div className="p-4 rounded-lg shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4 ">
        <div className="flex items-center relative gap-5">
          <div className="absolute -top-2 -left-4">
            <img
              src={social_img}
              alt=""
              className="w-8 h-8 object-cover rounded-lg"
            />
          </div>
          <figure>
            <img
              src={avatar}
              alt=""
              className="w-12 h-12 object-cover rounded-lg"
            />
          </figure>
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold ">{name}</span>
            <span className="text-xs font-medium leading-3 text-slate-500">
              {title}
            </span>
            <span className="text-xs capitalize font-medium leading-3  text-blue-500">
              {dayjs(created_at).fromNow()}
            </span>
          </div>
        </div>
        <div>
          <BsThreeDots className="w-4 h-4" />
        </div>
      </div>
      <div className="text-start font-medium mb-4">
        <p>{description}</p>
      </div>
      <img
        alt="123 Wallaby Avenue, Park Road"
        src={img ? img : ""}
        className="object-cover w-full h-72 rounded-md"
      />
      <div className="mt-2">
        <dl className="flex items-center mt-6 text-xs space-x-8 justify-end">
          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <AiTwotoneLike className="w-5 h-5 text-slate-600 cursor-pointer mr-1" />
            {likes} likes
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <AiOutlineComment className="w-5 h-5 text-slate-600 cursor-pointer mr-1" />
            {likes} Commenter
          </div>

          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <AiOutlineShareAlt className="w-5 h-5 text-slate-600 cursor-pointer mr-1" />
            {shares} Partager
          </div>
          <div className="sm:inline-flex sm:items-center sm:shrink-0">
            <RiSendPlaneFill className="w-5 h-5 text-slate-600 cursor-pointer mr-1" />
            {shares} Envoyer
          </div>
        </dl>
      </div>
    </div>
  );
};
export default PostUi;
