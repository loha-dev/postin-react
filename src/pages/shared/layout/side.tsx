import Horizontal from "./horizontal";
import Ads from "./ads";
const Side = () => {
  return (
    <div className="m-4 flex flex-col gap-2 overflow-hidden">
      <Horizontal />
      <Ads />
    </div>
  );
};
export default Side;
