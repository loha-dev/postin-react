import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { AiOutlineGlobal } from "react-icons/ai";
import LinePoints from "./components/line-points";
import {BsPlusLg} from 'react-icons/bs'
import { GiCrossedBones } from "react-icons/gi";
import { useListState } from "@mantine/hooks";
const SocialMedia = () => {
  const { data: socials } = useQuery(["social-media"], async () => {
    const { data } = await supabase.from("social-media");
    return data as { id: number; title: string; img: string }[];
  });
  const [removed, handlers] = useListState();
  return (
    <div className="flex p-3 gap-5">
      <div className="flex gap-2 items-center">
        <span>
          <AiOutlineGlobal className="w-5 h-5" />
        </span>
        <span className="text-lg font-normal">Tous</span>
      </div>
      <LinePoints />
      <div className="flex gap-3">
        {socials?.map((social) => {
          return (
            <div
              className="py-2 px-4 relative bg-fotsy flex items-center justify-end gap-2 rounded-3xl"
              key={social.id}
            >
              <span>
                <img src={social.img} alt="" className="w-7 h-7" />
              </span>
              <span>{social.title}</span>

              <button className="absolute top-0 right-0 bg-fotsy">
                <GiCrossedBones className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SocialMedia;
