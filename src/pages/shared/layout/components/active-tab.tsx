import { ScrollArea } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { clientsPagesType, clientsType } from "../../../../types/account-type";
import { supabase } from "../../../../utils/supabase";
import SocialShort from "./socials-short";
const ActiveTab = ({ active }: { active: clientsType | null }) => {
  const { data: activePages } = useQuery(
    ["clients-pages", active?.id],
    async () => {
      const { data } = await supabase
        .from("clients-pages")
        .select(
          `
          id, title, social (id, title, img),
          owner (id), access_token, page_id
          `
        )
        .eq("owner", active?.id);
      return data as clientsPagesType[];
    },
    { enabled: active?.id !== undefined }
  );
  return (
    <>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded shadow">
          <img
            className="w-full h-full overflow-hidden object-cover rounded"
            src={active?.avatar}
            alt="logo"
          />
        </div>
        <div className="ml-3">
          <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">
            {active?.name}
          </h5>
          <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">
            {active?.phone}
          </p>
        </div>
      </div>
      <h3 className="text-lg text-gray-800 dark:text-gray-100 font-bold mt-5 mb-1">
        Socials
      </h3>
      <ScrollArea
        style={{
          maxHeight: "60vh",
        }}
      >
        {activePages?.map((pages) => {
          const { id, title, social, access_token, page_id } = pages;
          return (
            <SocialShort
              key={id}
              id={id}
              title={title}
              social={social}
              active={active}
              access_token={access_token}
              page_id={page_id}
            />
          );
        })}
      </ScrollArea>
    </>
  );
};
export default ActiveTab;
