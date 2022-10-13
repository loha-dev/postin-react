import { supabase } from "../../../utils/supabase";
import { AiOutlineGlobal } from "react-icons/ai";
import LinePoints from "./components/line-points";
import { useListState } from "@mantine/hooks";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import type {
  socialMediaDataTypesList,
  socialFilterSearch,
} from "../../../types/social-type";
import { IoClose, IoAdd } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-location";
import { useSearch } from "@tanstack/react-location";
const SocialMedia = () => {
  const [autoAnimateSocial] = useAutoAnimate<any>();
  const navigate = useNavigate<socialFilterSearch>();
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

  const handleFilter = (id: number) => {
    const element = socialsList.filter((social) => social.id === id)[0];
    element.isOut = !element.isOut;
    const newOrder = socialsList.filter((social) => social.id !== id);
    if (element.isOut === false) {
      const result = [...newOrder, element];
      handlersSocial.setState(result);
      navigate({
        search: (old) => ({
          ...old,
          socialFilter: {
            out: old?.socialFilter?.out?.filter((high) => high !== id),
          },
        }),
      });
    } else if (element.isOut === true) {
      const result = [element, ...newOrder];
      handlersSocial.setState(result);
      navigate({
        search: (old) => ({
          ...old,
          socialFilter: {
            out:
              old?.socialFilter?.out !== undefined
                ? [...new Set([...old.socialFilter.out, id])]
                : [id],
          },
        }),
      });
    }
  };
  const resetFilter = () => {
    handlersSocial.setState((prev) =>
      prev.map((prev) => {
        prev.isOut = false;
        return prev;
      })
    );
    navigate({
      search: (old) => ({
        ...old,
        socialFilter: {
          out: [],
          all: true,
        },
      }),
    });
  };
  return (
    <div className="flex p-3 gap-5 ">
      <button className="flex gap-2 items-center" onClick={resetFilter}>
        <span>
          <AiOutlineGlobal className="w-5 h-5" />
        </span>
        <span className="text-lg font-normal">Tous</span>
      </button>
      <LinePoints />
      <ul className="flex gap-3" ref={autoAnimateSocial}>
        {socialsList?.map((social) => {
          return (
            <li
              className="py-2 px-7 relative bg-white flex items-center justify-end gap-2 rounded-3xl bg-opacity-60"
              key={social.id}
              onClick={() => handleFilter(social.id)}
            >
              <span>
                <img src={social.img} alt="" className="w-7 h-7" />
              </span>
              {/* <span>{social.title}</span> */}
              <button
                className={`absolute top-0 right-0 rounded-xl p-1 ${
                  social.isOut ? "bg-red-200" : "bg-green-500"
                }`}
              >
                {social.isOut ? (
                  <IoClose className="w-3 h-3" />
                ) : (
                  <IoAdd className="w-3 h-3" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default SocialMedia;
