import Horizontal from "./components/horizontal";
import Ads from "./components/ads";
const Side = () => {
  return (
    <div className="m-4 flex flex-col gap-2 overflow-hidden">
      <Horizontal />
      <Ads />
    </div>
  );
};
export default Side;
