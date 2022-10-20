import { accountAtom } from "../../../atomic/accounts-atom";
import { useAtom } from "jotai";
import { useNavigate, useSearch } from "@tanstack/react-location";
import { Skeleton, Tabs } from "@mantine/core";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineAirplanemodeActive } from "react-icons/md";
import { Transition } from "@mantine/core";
import type {
  accountsGenericsSearch,
  clientsType,
  activeAccountSearch,
} from "../../../types/account-type";
import { supabase } from "../../../utils/supabase";
import { useQuery } from "@tanstack/react-query";
import { IoMdSearch } from "react-icons/io";
import ShortProfile from "./components/short-profile";
import { ScrollArea } from "@mantine/core";
import { useEffect, useState } from "react";
import ActiveTab from "./components/active-tab";

// react export default components

const Account = () => {
  const search = useSearch<accountsGenericsSearch>();
  const searchActive = useSearch<activeAccountSearch>();
  const navigate = useNavigate<activeAccountSearch>();
  const [active, setAccount] = useAtom(accountAtom);
  const [inputSearch, setInputSearch] = useState("");
  const [filtered, setFiltered] = useState<clientsType[] | undefined>(
    undefined
  );
  const { data: clients } = useQuery(["clients"], async () => {
    const { data } = await supabase.from("clients");
    return data as clientsType[];
  });
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
      (async () => {
        const { data } = await supabase
          .from("clients")
          .select("*")
          .ilike("name", `%${search.name}%`);
        setFiltered(data as clientsType[]);
      })();
    }
  }, []);
  const [activeTab, setActiveTab] = useState<"accounts" | "active">("accounts");
  const makeActive = async (client: clientsType) => {
    setAccount(client);
    setActiveTab("active");
    navigate({
      search: (old) => ({
        ...old,
        account_name: client.name,
        account_id: client.id,
        account_phone: client.phone,
      }),
    });
    // const accountCredentials = await supabase.from("account").select('*').eq(' ');
  };
  useEffect(() => {
    if (active !== null || searchActive.account_id === undefined) {
      return;
    } else {
      setActiveTab("active");
      const getActiveFromSearch = async () => {
        const { data, error } = await supabase
          .from("clients")
          .select("*")
          .eq("id", searchActive.account_id);
        if (error === null) {
          const dat = data as clientsType[];
          setAccount(dat[0]);
        }
      };
      getActiveFromSearch();
    }
  }, [searchActive, active]);
  return (
    <div className="my-4 bg-white rounded-xl py-4 px-3 h-[90vh] min-w-[250px]">
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
            duration={300}
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
                    className="h-10 px-5 rounded-md text-sm focus:outline-none bg-fotsy w-full"
                  />
                  <button className="absolute right-0 top-2 mt-4 mr-4">
                    <IoMdSearch className="w-5 h-5" />
                  </button>
                </div>
                <ScrollArea
                  style={{
                    height: "75vh",
                  }}
                >
                  {clients ? (
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
                  ) : (
                    <div className="mx-1 flex flex-col gap-5">
                      <Skeleton height={60} />
                      <Skeleton height={60} />
                      <Skeleton height={60} />
                      <Skeleton height={60} />
                      <Skeleton height={60} />
                      <Skeleton height={60} />
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </Transition>
        </Tabs.Panel>

        <Tabs.Panel value="active" pt="xs">
          <Transition
            mounted={activeTab === "active"}
            transition="slide-up"
            duration={300}
            timingFunction="ease"
          >
            {(styles) => (
              <div style={styles}>
                <ActiveTab active={active} />
              </div>
            )}
          </Transition>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};
export default Account;
