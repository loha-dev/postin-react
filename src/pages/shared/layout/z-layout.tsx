import Top from "./top";
import Side from "./side";
import Account from "./account";
import { Outlet } from "@tanstack/react-location";
import { useSearch } from "@tanstack/react-location";
import { accountsUrlSearch } from "../../../types/account-type";
import { useMediaQuery } from "@mantine/hooks";
import SocialMedia from "./social-media";
const MainLayout = () => {
  const search = useSearch<accountsUrlSearch>();
  const isSomehowMobile = useMediaQuery("(max-width: 900px)");

  // const isSomehowTablet = useMediaQuery("(max-width: 1100px)");

  return (
    <>
      <Top />
      <div className={isSomehowMobile ? "" : "grid grid-cols-[1fr_4fr]"}>
        <Side />
        <div className="grid grid-cols-[2fr_7fr] gap-1">
          <Account />

          <div className="m-4 ">
            <div className=" bg-white rounded-xl mb-3">
              <SocialMedia />
            </div>
            <div className=" bg-white rounded-xl text-center w-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLayout;
