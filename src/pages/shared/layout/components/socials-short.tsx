import { useAtom } from "jotai";
import { pageAtom } from "../../../../atomic/accounts-atom";
import { useNavigate } from "@tanstack/react-location";
import type {
  clientsType,
  clientsPagesType,
} from "../../../../types/account-type";
import { activePageTypeSearch } from "../../../../types/account-type";
const SocialShort = ({
  id,
  title,
  social: { title: social, img, id: socialId },
  active,
}: clientsPagesType & { active: clientsType | null }) => {
  const navigate = useNavigate<activePageTypeSearch>();
  const [page, setPage] = useAtom(pageAtom);
  const handleSetPage = () => {
    const page = {
      id: id,
      title: title,
      social: {
        id: socialId,
        title: social,
        img: img,
      },
      owner: active,
    };
    setPage(page);
    navigate({
      search: page,
      replace: true,
    });
  };
  return (
    <div
      className={`relative block p-4 overflow-hidden border border-gray-100 rounded-lg cursor-pointer hover:text-blue-400 hover:bg-fotsy ${
        id === page?.id ? "text-blue-400 bg-fotsy" : ""
      }`}
      onClick={handleSetPage}
    >
      <div className="justify-between sm:flex">
        <h5 className="text-md font-bold ">{title}</h5>

        <div className="flex-shrink-0 hidden ml-3 sm:block">
          <img
            className="object-cover w-8 h-8 rounded-lg shadow-sm"
            src={img}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
};
export default SocialShort;
