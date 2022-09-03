import Top from "./top";
import { Outlet } from "@tanstack/react-location";
const MainLayout = () => {
  return (
    <>
      <Top />
      <div>
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
