import { accountsAtom } from "../../../atomic/accounts-atom";
import { useAtom } from "jotai";
import { useNavigate, useSearch } from "@tanstack/react-location";
import type {
  accountsGenericsSearch,
  clientsType,
} from "../../../types/account-type";
import { supabase } from "../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { IoMdSearch } from "react-icons/io";
import ShortProfile from "./components/short-profile";
import { ScrollArea } from "@mantine/core";
const Account = () => {
  const navigate = useNavigate<accountsGenericsSearch>();
  const search = useSearch<accountsGenericsSearch>();

  const { data: clients } = useQuery(["clients"], async () => {
    const { data } = await supabase.from("clients");
    return data;
  });

  return (
    <div className="my-4 bg-white rounded-xl py-4 px-5">
      <p className="text-gray-500">Choisissez une compte</p>
      <div className="relative py-3 rounded-xl mr-5">
        <input
          type="search"
          name="serch"
          placeholder="Type here"
          className="h-10 px-5 rounded-md text-sm focus:outline-none bg-fotsy w-72"
        />
        <button type="submit" className="absolute right-0 top-2 mt-4 mr-4">
          <IoMdSearch className="w-5 h-5" />
        </button>
      </div>
      <ScrollArea
        style={{
          height: "75vh",
        }}
      >
        <div className="flex flex-col gap-2">
          {clients?.map((client: clientsType) => {
            const { id, name, phone } = client;
            return <ShortProfile key={id} name={name} phone={phone} />;
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
export default Account;
