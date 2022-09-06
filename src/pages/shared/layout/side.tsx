import Horizontal from "./components/horizontal";
import Ads from "./components/ads";
const Side = () => {
  return (
    <aside className="m-4 flex flex-col gap-2">
      <Horizontal />
      <Ads />
    </aside>
  );
};
export default Side;
