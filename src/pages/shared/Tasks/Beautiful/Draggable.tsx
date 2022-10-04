import { Draggable } from "@hello-pangea/dnd";
interface TaskInterface {
  id: number;
  title: string;
  content: string;
  page: number;
  status: string;
  date: string;
  time: string;
}
const Task = ({ task, index }: { task: TaskInterface; index: number }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => {
        const { isDragging } = snapshot;
        return (
          <div
            key={task.id}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className={`border border-slate-200 p-2 ${
              isDragging ? "bg-green-400" : "bg-white"
            }`}
          >
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.content.slice(0, 20)}</p>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
};
export default Task;
