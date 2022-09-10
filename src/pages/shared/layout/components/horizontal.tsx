import {
  IoHome,
  IoCreateSharp,
  IoNotificationsSharp,
  IoChatbubbles,
} from "react-icons/io5";
import { MdStickyNote2, MdPersonAdd } from "react-icons/md";
import { RiTaskFill, RiMailCheckFill, RiTeamFill } from "react-icons/ri";
import { CgFeed } from "react-icons/cg";
import { Link } from "@tanstack/react-location";
import { ImStatsDots } from "react-icons/im";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import { Divider } from "@mantine/core";

const Horizontal = () => {
  return (
    <div className="flex flex-col antialiased  text-gray-800">
      <div className="flex flex-col top-0 left-0 bg-white rounded-xl">
        <div className="overflow-y-auto overflow-x-hidden flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Menu
                </div>
              </div>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/dashboard"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <IoHome className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Tableau de bord
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/create"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <IoCreateSharp className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Crée une publication
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                  +
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/feeds"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <CgFeed className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Fils d' actualites
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/notifications"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <IoNotificationsSharp className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Notifications
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                  1.2k
                </span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Taches
                </div>
              </div>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/tasks"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <RiTaskFill className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Tache a faire
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/notes"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <MdStickyNote2 className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Memos et notes
                </span>
                <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-500 bg-green-50 rounded-full">
                  15
                </span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Communication
                </div>
              </div>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/reception"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <RiMailCheckFill className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Boite de reception
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/conversation"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <IoChatbubbles className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Conversation
                </span>
              </Link>
            </li>
            <li className="px-5">
              <div className="flex flex-row items-center h-8">
                <div className="text-sm font-light tracking-wide text-gray-500">
                  Autres
                </div>
              </div>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/stats"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <ImStatsDots className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Statistiques
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/prospect"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <BsFileEarmarkSpreadsheetFill className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Fiche de prospects
                </span>
              </Link>
            </li>
            <Divider my="md" label="x" labelPosition="center" />
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/comptes"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <MdPersonAdd className="w-5 h-5" />
                </span>
                <span className="ml-2 text-md tracking-wide truncate">
                  Gerer les comptes
                </span>
              </Link>
            </li>
            <li>
              <Link
                getActiveProps={getActiveProps}
                to="/team"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
              >
                <span className="inline-flex justify-center items-center ml-4 icon-colored">
                  <RiTeamFill className="w-5 h-5" />
                </span>
                <span>Gerer les equipes</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Horizontal;

function getActiveProps() {
  return {
    style: {
      fontWeight: "bold",
      backgroundColor: "#ebf3f7",
      borderLeftWidth: "0.25rem",
      borderColor: "rgb(99 102 241)",
      "& span": {
        color: "red",
      },
    },
  };
}
