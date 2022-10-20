import { socialMediaDataTypes } from "../../../../types/social-type";
import { TableResponse } from "./types";
import { Checkbox } from "@mantine/core";
import { Chip } from "@mantine/core";
import { supabase } from "../../../../utils/supabase";
import SocialMenu from "../components/SocialMenu";
import { useListState } from "@mantine/hooks";
import AddKeywords from "../components/AddKeywords";
import { DatePicker } from "@mantine/dates";
import { TimeInput } from "@mantine/dates";
import { useState } from "react";
const Row = ({ task, social: socials, selection, toggleRow }: RowPorpsType) => {
  const handleTitleBlur = async (value: any) => {
    const text = value.target?.innerText;
    const { error } = await supabase
      .from("tasks")
      .update({ title: text })
      .eq("id", task.id);
    console.log("ROW NAME CHANGE", error);
  };
  const [keywords, handleKeyword] = useListState(task.keywords);
  const [date, handleDate] = useState<any>(new Date(task.date));
  const [time, handleTime] = useState<any>(new Date(task.date));
  return (
    <tr className="h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100">
      <td>
        <Checkbox
          checked={selection.includes(task.id)}
          onChange={() => toggleRow(task.id)}
          transitionDuration={0}
        />
      </td>
      <td className="pl-4 cursor-pointer">
        <div className="flex items-center">
          <div className="w-10 h-10">
            <SocialMenu
              src={
                socials ? socials.find((sc) => sc.id === task.social)?.img : ""
              }
              socials={socials}
              id={task.id}
            />
          </div>
          <div className="pl-4">
            <p
              className="font-medium"
              contentEditable
              suppressContentEditableWarning
              onBlur={handleTitleBlur}
            >
              {task.title}
            </p>
            <p className="text-xs leading-3 text-gray-600 pt- capitalize">
              {socials
                ? socials.find((sc) => sc.id === task.social)?.title
                : ""}
            </p>
          </div>
        </div>
      </td>
      <td>
        <div className="text-sm font-medium leading-none text-gray-800 flex flex-wrap justify-evenly">
          {keywords.map((keyword, index) => (
            <Chip
              size={"xs"}
              key={keyword}
              checked={false}
              variant="filled"
              onDoubleClick={() => handleKeyword.remove(index)}
            >
              {keyword}
            </Chip>
          ))}
          <AddKeywords id={task.id} handleAdd={handleKeyword.append} />
        </div>
      </td>
      <td>
        <DatePicker value={date} onChange={handleDate} />
      </td>
      <td>
        <TimeInput value={time} onChange={handleTime} />
      </td>
      <td>
        <p className="font-medium mr-5">{task.status}</p>
      </td>
      <td>
        <p className="font-medium mr-5">{task.validation}</p>
      </td>
      <td>
        <div className="flex-wrap flex">
          {task.labels.map((label) => (
            <Chip size={"xs"} key={label} checked={true} color="green">
              {label}
            </Chip>
          ))}
        </div>
      </td>
      <td>
        <p className="font-medium mr-5">$ {task.boost}</p>
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
      <td className="flex justify-end items-center mr-5"></td>
    </tr>
  );
};
export default Row;
interface RowPorpsType {
  task: TableResponse;
  social: socialMediaDataTypes[] | undefined;
  selection: number[];
  toggleRow: (id: number) => void;
}
