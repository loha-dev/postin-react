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
    <div className="p-2 bg-white rounded-lg grid grid-rows-[auto_1fr] ">
      <h2 className="text-lg font-semibold capitalize m-2">{column.title}</h2>
      <div>
        <Droppable droppableId={column.id}>
          {(provided, snapshot) => {
            const { isDraggingOver } = snapshot;
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex flex-col flex-1 gap-5 transition-colors h-full`}
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
