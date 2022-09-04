import type { clientsType } from "../../../../types/account-type";

const ShortProfile = ({
  name,
  phone,
  id,
  avatar,
  makeActive,
}: {
  name: string;
  phone: string;
  avatar: string;

  id: number;
  makeActive: (data: clientsType) => void;
}) => {
  const handleMakeActive = () => {
    makeActive({
      id: id,
      name: name,
      phone: phone,
      avatar: avatar,
    });
  };
  return (
    <div
      className=" transition  group hover:shadow-md flex items-center gap-2 rounded-xl p-1 cursor-pointer"
      onClick={handleMakeActive}
    >
      <img
        className="w-10 h-10 rounded-lg object-cover"
        src={avatar}
        alt={name}
      />
      <div>
        <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-blue-600">
          {name}
        </h5>
        <p className="text-sm text-gray-600">{phone}</p>
      </div>
    </div>
  );
};
export default ShortProfile;
