import Avatar from "react-nice-avatar";
import { AiOutlineDoubleRight } from "react-icons/ai";

const ShortProfile = ({ name, phone }: { name: string; phone: string }) => {
  return (
    <div className="group transition hover:z-[1] hover:shadow-md flex items-center gap-2 rounded-xl p-1 cursor-pointer">
      <Avatar className="w-10 h-10" shape="rounded" />
      <div>
        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
          {name}
        </h5>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>
    </div>
  );
};
export default ShortProfile;
