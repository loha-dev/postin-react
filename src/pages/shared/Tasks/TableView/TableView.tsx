import { Head } from "./Head";
import { useState } from "react";
import Row from "./Row";
import { TasksType } from "../../../../types/short";
import { ScrollArea } from "@mantine/core";
import { useSocialMedialList } from "../../../../hooks/frequentQuery";
const TableView = ({ tasks }: { tasks: TasksType[] }) => {
  const { data: social } = useSocialMedialList();
  const [selection, setSelection] = useState<number[]>([]);
  const toggleRow = (id: number) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () => {
    if (typeof tasks === "undefined") return;
    setSelection((current) =>
      current.length === tasks.length
        ? []
        : selection.length > 0
        ? []
        : tasks.map((item) => item.id)
    );
  };
  return (
    <div className="w-full">
      <div className="bg-white shadow p-4">
        <ScrollArea sx={{ minWidth: "50vw", height: "67vh" }}>
          <table className="w-full whitespace-nowrap overflow-x-auto overflow-y-auto ">
            <Head toggleAll={toggleAll} selection={selection} data={tasks} />
            <tbody className="w-full">
              {tasks?.map((task) => (
                <Row
                  key={task.id}
                  task={task}
                  social={social}
                  selection={selection}
                  toggleRow={toggleRow}
                />
              ))}
            </tbody>
          </table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TableView;
