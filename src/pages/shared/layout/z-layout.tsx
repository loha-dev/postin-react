import Top from "./top";
import Side from "./side";
import Account from "./account";
import { Outlet } from "@tanstack/react-location";
import { useSearch } from "@tanstack/react-location";
import { accountsUrlSearch } from "../../../types/account-type";
import { useMediaQuery } from "@mantine/hooks";

const MainLayout = () => {
  const search = useSearch<accountsUrlSearch>();
  const isSomehowMobile = useMediaQuery("(max-width: 900px)");

  // const isSomehowTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      {/* Topbar 🤫 */}

      <Top isSomehowMobile={isSomehowMobile} />
      {/* other parts */}
      <div className={isSomehowMobile ? "" : "grid grid-cols-[1fr_4fr]"}>
        <aside>{isSomehowMobile ? "" : <Side />}</aside>
        <div
          className={`${
            search.inlayout === undefined || search.inlayout === true
              ? "grid grid-cols-[2fr_7fr] gap-1"
              : ""
          }`}
        >
          {/* Sidenav 😴 */}
          {search.inlayout === undefined || search.inlayout === true ? (
            <Account />
          ) : (
            ""
          )}

          {/* account 😴 */}
          <div className="m-4 bg-white rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
