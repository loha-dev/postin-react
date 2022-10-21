import { Link } from "@tanstack/react-location";
import { IoMdNotifications, IoMdSearch } from "react-icons/io";
import {
  IoSettingsOutline,
  IoPersonOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { AiFillDownCircle } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { Indicator, Menu, Avatar } from "@mantine/core";
import LinePoints from "./components/line-points";
import { supabase } from "../../../utils/supabase";
const Top = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const focus = () => {
    searchRef.current?.focus();
  };
  const [conn, setConn] = useState<null | any>(null);
  useEffect(() => {
    const state = supabase.auth.user();
    setConn(state);
    console.table(state);
  }, []);

  return (
    <div className="bg-white flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full py-1 px-4 items-center ">
      <Link className="flex justify-between  items-center space-x-3">
        <>
          <img src="/images/light-logo.png" alt="logo" className="w-12 h-12" />
          <p className="text-4xl leading-6 font-bold">Post-In</p>
          {conn ? <></> : <></>}
        </>
      </Link>
      <div className="flex-grow"></div>
      <div className="relative p-1 rounded-xl mr-5">
        <input
          type="search"
          name="serch"
          ref={searchRef}
          placeholder="Search"
          className="h-10 px-5 pr-10 rounded-full text-sm focus:outline-none bg-fotsy w-96"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-4 mr-4"
          onClick={focus}
        >
          <IoMdSearch className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-1"></div>
      <div className="flex items-center gap-3">
        <Menu
          trigger="hover"
          openDelay={100}
          closeDelay={400}
          transition="rotate-right"
        >
          <Menu.Target>
            <div className="flex bg-fotsy rounded-full p-3 cursor-pointer">
              <Indicator inline label="21" size={16}>
                <IoMdNotifications className="w-6 h-6" />
              </Indicator>
            </div>
          </Menu.Target>
          <Menu.Dropdown>
            <div className="py-8">
              <div className="max-w-sm bg-white shadow rounded p-6">
                <div className="flex items-end">
                  <p className="text-xl font-semibold leading-5 text-gray-800">
                    Activity
                  </p>
                  <p className="text-sm leading-normal pl-44 cursor-pointer underline text-right text-indigo-700">
                    View all
                  </p>
                </div>
                <div className="mt-6 flex">
                  <div className="w-10 flex flex-col items-center">
                    <img
                      className="h-10 rounded-full"
                      src="https://cdn.tuk.dev/assets/components/misc/activity-1.png"
                    />
                    <div className="pt-4">
                      <LinePoints />
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-semibold leading-normal text-gray-800">
                      John Stark
                    </p>
                    <p className="text-xs leading-3 text-gray-500 pt-1">
                      2 hours ago
                    </p>
                    <p className="pt-4 text-sm leading-4 text-gray-600">
                      Changes made to{" "}
                      <span className="text-indigo-700">styleguide.fig</span>,
                      icons <br />
                      updated with v2 colors
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="w-10 flex flex-col items-center">
                    <img
                      className="h-10 rounded-full"
                      src="https://cdn.tuk.dev/assets/components/misc/profile-img-1.png"
                    />
                    <div className="pt-4">
                      <LinePoints />
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-semibold leading-normal text-gray-800">
                      Rachel Green
                    </p>
                    <p className="text-xs leading-3 text-gray-500 pt-1">
                      5 hours ago
                    </p>
                    <p className="pt-4 text-sm leading-4 text-gray-600">
                      Reviewed and sent to{" "}
                      <span className="text-indigo-700">jill@astro.com </span>
                      <br />
                      &amp;{" "}
                      <span className="text-indigo-700">jason@ipsum.com</span>
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="w-10 flex flex-col items-center">
                    <img
                      className="h-10 rounded-full"
                      src="https://cdn.tuk.dev/assets/components/misc/activity-2.png"
                    />
                    <div className="pt-4">
                      <LinePoints />
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-semibold leading-normal text-gray-800">
                      Rachel Green
                    </p>
                    <p className="text-xs leading-3 text-gray-500 pt-1">
                      8 hours ago
                    </p>
                    <p className="pt-4 text-sm leading-4 text-gray-600">
                      Ticket number{" "}
                      <span className="text-indigo-700">#18293</span> has been
                      <br />
                      resolved.Thank you.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex">
                  <div className="w-10 flex flex-col items-center">
                    <img
                      className="h-10 rounded-full"
                      src="https://cdn.tuk.dev/assets/components/misc/activity-2.png"
                    />
                    <div className="pt-4">
                      <svg
                        width={1}
                        height={47}
                        viewBox="0 0 1 47"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="0.5"
                          y1="2.18557e-08"
                          x2="0.499998"
                          y2={47}
                          stroke="#D1D5DB"
                          strokeDasharray="2 2"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="pl-3">
                    <p className="text-sm font-semibold leading-normal text-gray-800">
                      Jill Dawson
                    </p>
                    <p className="text-xs leading-3 text-gray-500 pt-1">
                      8 hours ago
                    </p>
                    <div className="py-4 flex items-center">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.00002 5.33334L6.00202 1.33334H13.332C13.7 1.33334 14 1.63668 14 1.99468V14.0053C13.9998 14.1808 13.93 14.349 13.8059 14.473C13.6818 14.597 13.5135 14.6667 13.338 14.6667H2.66202C2.57447 14.6661 2.4879 14.6482 2.40725 14.6141C2.3266 14.5801 2.25345 14.5305 2.19197 14.4681C2.1305 14.4058 2.08191 14.3319 2.04897 14.2508C2.01604 14.1697 1.9994 14.0829 2.00002 13.9953V5.33334ZM6.66668 2.33334L3.00002 6.00001H6.66668V2.33334Z"
                          fill="#4338CA"
                        />
                      </svg>
                      <p className="text-xs leading-6 pl-2 text-indigo-700">
                        Annual Report.docx
                      </p>
                    </div>
                    <p className="text-sm leading-4 text-gray-600">
                      Shared final version of the report
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" transition="rotate-right">
          <Menu.Target>
            <button className="flex items-center gap-2">
              <div className="p-0.5 rounded-full bg-gradient-to-r from-blue-500 via-red-500 to-green-500 ">
                <div className="bg-fotsy rounded-full p-1">
                  <Avatar
                    component="a"
                    radius={"xl"}
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
                    alt="it's me"
                    sx={{
                      width: 45,
                      height: 45,
                    }}
                  />
                </div>
              </div>

              <span className="text-gray-600 dark:text-white text-lg font-bold ">
                Concetta G.
              </span>
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <a className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <IoPersonOutline className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Profile
              </span>
            </a>
            <a className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <IoSettingsOutline className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Preferences
              </span>
            </a>
            <Link
              to={"social/facebook"}
              className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <IoSettingsOutline className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Facebook
              </span>
            </Link>
            <button
              className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              onClick={() => {
                supabase.auth.signOut();
              }}
            >
              <span className="inline-flex justify-center items-center ml-4">
                <IoLogOutOutline className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Deconexion
              </span>
            </button>
          </Menu.Dropdown>
        </Menu>
        <Menu shadow="md" transition="rotate-right">
          <Menu.Target>
            <button className="flex items-center gap-2">
              <div className="bg-fotsy rounded-full p-1 relative">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg"
                  className="w-6 h-6"
                />
                <span className="absolute top-3 right-2">
                  <AiFillDownCircle className="w-4 h-4" />
                </span>
              </div>
            </button>
          </Menu.Target>
          <Menu.Dropdown>
            <a className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/be/Flag_of_England.svg"
                  className="w-6 h-6"
                />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                English
              </span>
            </a>

            <a className="relative cursor-pointer flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/bc/Flag_of_Madagascar.svg"
                  className="w-6 h-6"
                />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Malagasy
              </span>
            </a>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};
export default Top;
