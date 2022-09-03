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
      <Top />
      {/* other parts */}
      <div>
        <aside>{isSomehowMobile ? "" : <Side />}</aside>
        <div>
          {/* Sidenav 😴 */}
          {search.inlayout === undefined || search.inlayout === true ? (
            <Account />
          ) : (
            ""
          )}

          {/* account 😴 */}
          <Outlet />
        </div>
      </div>
    </>
  );
};
export default MainLayout;
