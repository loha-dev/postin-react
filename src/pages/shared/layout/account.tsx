import { accountsAtom } from "../../../atomic/accounts-atom";
import { useAtom } from "jotai";
import { useNavigate, useSearch } from "@tanstack/react-location";
import { Tabs } from "@mantine/core";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineAirplanemodeActive, MdPhone } from "react-icons/md";
import { Transition } from "@mantine/core";
import type {
  accountsGenericsSearch,
  clientsType,
  clientsPagesType,
} from "../../../types/account-type";
import { supabase } from "../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { IoMdSearch } from "react-icons/io";
import ShortProfile from "./components/short-profile";
import { ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
const Account = () => {
  const search = useSearch<accountsGenericsSearch>();
  const navigate = useNavigate();
  const [active, setAccount] = useAtom(accountsAtom);
  const { data: clients } = useQuery(["clients"], async () => {
    const { data } = await supabase.from("clients");
    return data as clientsType[];
  });
  const [inputSearch, setInputSearch] = useState("");
  const [filtered, setFiltered] = useState<clientsType[] | undefined>(
    undefined
  );
  const inputSearchHandler = (query: string) => {
    setFiltered(
      clients?.filter((handler) =>
        handler.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };
  useEffect(() => {
    if (search.name !== undefined) {
      setInputSearch(search.name);
      const getFilteredFromUrl = async () => {
        const { data } = await supabase
          .from("clients")
          .select("*")
          .ilike("name", `%${search.name}%`);
        setFiltered(data as clientsType[]);
      };
      getFilteredFromUrl();
    }
  }, []);
  const [activeTab, setActiveTab] = useState<"accounts" | "active">("accounts");
  const makeActive = (client: clientsType) => {
    setAccount(client);
    setActiveTab("active");
  };
  const { data: activePages } = useQuery(
    ["clients-pages", active?.id],
    async () => {
      const { data, error } = await supabase
        .from("clients-pages")
        .select(
          `
      id, title, social (id, title, img),
      owner (id)
      `
        )
        .eq("owner", active?.id);
      return data as clientsPagesType[];
    },
    { enabled: active?.id !== undefined }
  );

  return (
    <div className="my-4 bg-white rounded-xl py-4 px-3">
      <p className="text-gray-500">Choisissez une compte</p>
      <Tabs
        value={activeTab}
        onTabChange={(tab: "accounts" | "active") => {
          setActiveTab(tab);
        }}
      >
        <Tabs.List>
          <Tabs.Tab
            value="accounts"
            icon={<HiOutlineUserGroup className="w-5 h-5" />}
          >
            Accounts
          </Tabs.Tab>
          <Tabs.Tab
            value="active"
            color="teal"
            disabled={active === null}
            icon={<MdOutlineAirplanemodeActive className="w-5 h-5" />}
          >
            Active
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="accounts" pt="xs">
          <Transition
            mounted={activeTab === "accounts"}
            transition="slide-up"
            duration={350}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                <div className="relative py-3 rounded-xl mr-5">
                  <input
                    type="search"
                    name="serch"
                    value={inputSearch}
                    onChange={(event) => {
                      navigate({
                        search: (old) => ({
                          ...old,
                          name: event.target.value,
                        }),
                      });
                      setInputSearch(event.target.value);
                      inputSearchHandler(event.target.value);
                    }}
                    placeholder="Type here"
                    className="h-10 px-5 rounded-md text-sm focus:outline-none bg-fotsy w-72"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-2 mt-4 mr-4"
                  >
                    <IoMdSearch className="w-5 h-5" />
                  </button>
                </div>
                <ScrollArea
                  style={{
                    height: "75vh",
                  }}
                >
                  <div className="flex flex-col gap-2">
                    {filtered === undefined
                      ? clients?.map((client: clientsType) => {
                          const { id, name, phone, avatar } = client;
                          return (
                            <ShortProfile
                              key={id}
                              id={id}
                              name={name}
                              phone={phone}
                              avatar={avatar}
                              makeActive={makeActive}
                            />
                          );
                        })
                      : filtered?.map((client: clientsType) => {
                          const { id, name, phone, avatar } = client;
                          return (
                            <ShortProfile
                              id={id}
                              key={id}
                              name={name}
                              phone={phone}
                              avatar={avatar}
                              makeActive={makeActive}
                            />
                          );
                        })}
                  </div>
                </ScrollArea>
              </div>
            )}
          </Transition>
        </Tabs.Panel>

        <Tabs.Panel value="active" pt="xs">
          <Transition
            mounted={activeTab === "active"}
            transition="slide-up"
            duration={350}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                <div className="w-24 h-24 mb-3 p-2 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <img
                    className="w-full h-full overflow-hidden object-cover rounded-full"
                    src={active?.avatar}
                  />
                </div>
                <h2 className="text-gray-800 dark:text-gray-100 text-xl tracking-normal font-medium mb-1">
                  {active?.name}
                </h2>
                <p className="flex text-gray-600 dark:text-gray-100 text-sm tracking-normal font-normal mb-3 text-center">
                  <span className="cursor-pointer mr-1 text-gray-600 dark:text-gray-100">
                    <MdPhone className="w-5 h-5" />
                  </span>
                  {active?.phone}
                </p>
              </div>
            )}
          </Transition>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default Account;
