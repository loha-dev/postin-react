import {  useState } from "react";
import { data } from "../assets/todos-list";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult, ResponderProvided } from "@hello-pangea/dnd";
import Colum from "./Droppable";
const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "todo",
      tasks: data.slice(0, 5),
    },
    progress: {
      id: "progress",
      title: "In progress",
      tasks: [],
    },
    completed: {
      id: "completed",
      title: "Completed",
      tasks: [],
    },
  },
  columnOrder: ["todo", "progress", "completed"] as const,
};

const Beauty = () => {
  const [data, setData] = useState(initialData);
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    const { source, destination } = result;
    if (!destination) return;

    if (
      source.droppableId === destination?.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    if (source.droppableId === destination?.droppableId) {
      const destinationId = destination.droppableId as "todo";
      const column = data.columns[destinationId];
      const tasks = Array.from(column.tasks);
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      setData((previous) => {
        return {
          ...previous,
          columns: {
            ...previous.columns,
            [destination.droppableId]: {
              ...column,
              tasks: tasks,
            },
          },
        };
      });
    } else if (source.droppableId !== destination?.droppableId) {
      console.log(source.droppableId, destination.droppableId);
      const destinationId = destination.droppableId as
        | "todo"
        | "progress"
        | "completed";
      const sourceId = source.droppableId as "todo" | "progress" | "completed";

      const sourceColumn = data.columns[sourceId];
      const destColumn = data.columns[destinationId];
      const sourceItems = Array.from(sourceColumn.tasks);
      const destItems = Array.from(destColumn.tasks);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      setData((previous) => {
        return {
          ...previous,
          columns: {
            ...previous.columns,
            [destinationId]: {
              ...destColumn,
              tasks: destItems,
            },
            [sourceId]: {
              ...sourceColumn,
              tasks: sourceItems,
            },
          },
        };
      });
    }
  };
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr]">
      <DragDropContext onDragEnd={handleDragEnd}>
        {data.columnOrder.map((order) => {
          const statusCol = data.columns[order];
          return <Colum key={order} column={statusCol} />;
        })}
      </DragDropContext>
    </div>
  );
};
export default Beauty;
