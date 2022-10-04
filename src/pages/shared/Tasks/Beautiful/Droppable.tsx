import { Droppable } from "@hello-pangea/dnd";
import Task from "./Draggable";
interface statusCol {
  id: string;
  title: string;
  tasks: Array<{
    id: number;
    title: string;
    content: string;
    page: number;
    status: string;
    date: string;
    time: string;
  }>;
}

const Column = ({ column }: { column: statusCol }) => {
  return (
    <div className="border border-slate-500 p-2 ">
      <h2 className="text-lg font-semibold capitalize m-2">{column.title}</h2>
      <div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => {
            const { isDraggingOver } = snapshot;
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${
                  isDraggingOver ? "bg-sky-300" : "bg-white"
                } transition-colors min-h-[10rem]`}
              >
                {column.tasks.map((task, index) => {
                  return <Task task={task} key={task.id} index={index} />;
                })}
                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
      </div>
    </div>
  );
};
export default Column;
