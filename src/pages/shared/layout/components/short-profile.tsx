import type { clientsType } from "../../../../types/account-type";
import type { socialMediaDataTypes } from "../../../../types/social-type";
const ShortProfile = ({
  name,
  phone,
  id,
  avatar,
  makeActive = () => {},
  social = null,
}: {
  name: string;
  phone: string;
  avatar: string;
  id: number;
  makeActive?: (data: clientsType) => void;
  social?: socialMediaDataTypes | null | undefined;
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
      className=" transition  group hover:shadow-sm flex items-center gap-2 rounded-xl p-1 cursor-pointer relative"
      onClick={handleMakeActive}
    >
      {social !== null ? (
        <img src={social.img} className="absolute top-0 bottom-0 w-5 h-5" />
      ) : (
        <></>
      )}
      <img
        className="w-10 h-10 rounded-lg ml-1 object-cover"
        src={avatar}
        alt={name}
      />
      <div>
        <h5 className="text-lg text-gray-800 transition group-hover:text-blue-600 font-semibold">
          {name}
        </h5>
        <p className="text-sm text-gray-400">{phone}</p>
      </div>
    </div>
  );
};
export default ShortProfile;
