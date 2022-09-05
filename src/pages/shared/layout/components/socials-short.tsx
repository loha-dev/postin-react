import { useAtom } from "jotai";
import { pageAtom, accountAtom } from "../../../../atomic/accounts-atom";
import type { clientsType } from "../../../../types/account-type";
const SocialShort = ({
  id,
  title,
  social: { title: social, img, id: socialId },
  active,
}: {
  id: number;
  title: string;
  social: {
    id: number;
    title: string;
    img: string;
  };
  active: clientsType | null;
}) => {
  const [page, setPage] = useAtom(pageAtom);
  const handleSetPage = () => {
    setPage({
      id: id,
      title: title,
      social: {
        id: socialId,
        title: social,
        img: img,
      },
      owner: active,
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
