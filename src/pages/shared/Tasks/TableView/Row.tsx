import { socialMediaDataTypes } from "../../../../types/social-type";
import { TableResponse } from "./types";
import { ActionIcon, Checkbox } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Chip } from "@mantine/core";
import { FiEdit } from "react-icons/fi";
import { Input } from "@mantine/core";

const Row = ({ task, social: socials, selection, toggleRow }: RowPorpsType) => {
  const { title, id, boost, keywords, date, time, validation, social, labels } =
    task;
  const [editMode, handleEditMode] = useDisclosure(false);
  return !editMode ? (
    <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
      <>
        <td>
          <Checkbox
            checked={selection.includes(id)}
            onChange={() => toggleRow(id)}
            transitionDuration={0}
          />
        </td>
        <td className="pl-4 cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10">
              <img
                className="w-full h-full"
                src={socials ? socials.find((sc) => sc.id === social)?.img : ""}
              />
            </div>
            <div className="pl-4">
              <p className="font-medium">{title}</p>
              <p className="text-xs leading-3 text-gray-600 pt- capitalize">
                {socials ? socials.find((sc) => sc.id === social)?.title : ""}
              </p>
            </div>
          </div>
        </td>
        <td>
          <div className="text-sm font-medium leading-none text-gray-800 flex flex-wrap">
            {keywords.map((keyword) => (
              <Chip size={"xs"} key={keyword} checked={false}>
                {keyword}
              </Chip>
            ))}
          </div>
        </td>
        <td>
          <p className="font-medium">{date}</p>
        </td>
        <td>
          <p className="font-medium">{time}</p>
        </td>
        <td>
          <p className="font-medium">{time}</p>
        </td>
        <td>{validation}</td>
        <td>
          <div className="flex-wrap flex">
            {labels.map((label) => (
              <Chip size={"xs"} key={label} checked={true} color="green">
                {label}
              </Chip>
            ))}
          </div>
        </td>
        <td>
          <p className="font-medium">$ {boost}</p>
        </td>
        <td>
          <div className="flex items-center">
            <img
              className="shadow-md w-8 h-8 rounded-full"
              src="https://cdn.tuk.dev/assets/templates/olympus/projects(8).png"
            />
            <img
              className="shadow-md w-8 h-8 rounded-full -ml-2"
              src="https://cdn.tuk.dev/assets/templates/olympus/projects(9).png"
            />
            <img
              className="shadow-md w-8 h-8 rounded-full -ml-2"
              src="https://cdn.tuk.dev/assets/templates/olympus/projects(10).png"
            />
            <img
              className="shadow-md w-8 h-8 rounded-full -ml-2"
              src="https://cdn.tuk.dev/assets/templates/olympus/projects(11).png"
            />
          </div>
        </td>
        <td className="flex justify-end items-center">
          <ActionIcon onClick={handleEditMode.toggle}>
            <FiEdit size={20} />
          </ActionIcon>
        </td>
      </>
    </tr>
  ) : (
    <div className="h-20 w-full">
      <Input></Input>
    </div>
  );
};
export default Row;
interface RowPorpsType {
  task: TableResponse;
  social: socialMediaDataTypes[] | undefined;
  selection: number[];
  toggleRow: (id: number) => void;
}
