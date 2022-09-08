import { useListState } from "@mantine/hooks";
import { useSearch } from "@tanstack/react-location";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Skeleton } from "@mantine/core";
import {
  socialFilterSearch,
  socialMediaDataTypesList,
} from "../../../../types/social-type";
import { supabase } from "../../../../utils/supabase";
import { PostType } from "../../../../types/post";
const Recent = () => {
  const search = useSearch<socialFilterSearch>();
  const [socialsList, handlersSocial] =
    useListState<socialMediaDataTypesList>();
  const { isLoading } = useQuery(
    ["social-media"],
    async () => {
      const { data } = await supabase.from("social-media");
      const areOut = search.socialFilter?.out;
      if (areOut) {
        return data?.map((response) => {
          if (areOut.includes(response.id)) {
            return { ...response, isOut: true };
          } else {
            return { ...response, isOut: false };
          }
        }) as socialMediaDataTypesList[];
      } else {
        return data?.map((response) => {
          return { ...response, isOut: false };
        }) as socialMediaDataTypesList[];
      }
    },
    {
      onSuccess: (data) => {
        socialsList.length === 0 && handlersSocial.setState(data);
      },
    }
  );
  const { data: recently } = useQuery(["recent-view"], async () => {
    const { data } = await supabase.from("posts").select("*").limit(4);
    return data as PostType[];
  });
  return (
    <section className="bg-white p-3 rounded-xl">
      <div className="flex gap-1 justify-between items-center">
        <p className="font-bold text-gray-600">Recently viewed</p>
        <div className="flex items-center justify-evenly gap-2">
          <span className="bg-gray-200 p-1 rounded-full">
            <AiOutlineLeft className="w-2 h-2 " />
          </span>
          {isLoading ? (
            <Skeleton height={20} circle mb="xl" />
          ) : (
            <img src={socialsList[0]?.img} className="w-6 h-6" />
          )}
          <span className="bg-gray-200 p-1 rounded-full">
            <AiOutlineRight className="w-2 h-2 " />
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 ">
        {recently?.map((recent) => {
          const { id, description, img } = recent;
          return (
            <div key={id} className="relative overflow-hidden rounded-lg">
              <img
                src={img !== null ? img : ""}
                alt=""
                className="w-36 h-32 object-cover w-"
              />
              <div className="absolute w-full bg-slate-900 bg-opacity-40 bottom-0 ">
                <span className="text-white">{description.slice(0, 20)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
export default Recent;
