import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult, ResponderProvided } from "@hello-pangea/dnd";
import { TasksType } from "../../../../types/short";
import Colum from "./Droppable";
import { updateTask } from "../../../../functions/TasksFunction";
const initialData = {
  columns: {
    todo: {
      id: "todo",
      title: "A faire",
      tasks: [] as TasksType[],
    },
    progress: {
      id: "progress",
      title: "En cour",
      tasks: [] as TasksType[],
    },
    completed: {
      id: "completed",
      title: "Completed",
      tasks: [] as TasksType[],
    },
    archived: {
      id: "archived",
      title: "attente de validation",
      tasks: [] as TasksType[],
    },
  },
  columnOrder: ["todo", "progress", "archived", "completed"] as const,
};

const Beauty = ({ tasks }: { tasks: TasksType[] | null }) => {
  const [data, setBeauty] = useState(initialData);
  useEffect(() => {
    if (!tasks) return;
    setBeauty((previous) => {
      return {
        ...previous,
        columns: {
          todo: {
            ...previous.columns.todo,
            tasks: tasks.filter((task) => task.status === "todo"),
          },
          archived: {
            ...previous.columns.archived,
            tasks: tasks.filter((task) => task.status === "archived"),
          },
          completed: {
            ...previous.columns.completed,
            tasks: tasks.filter((task) => task.status === "completed"),
          },
          progress: {
            ...previous.columns.progress,
            tasks: tasks.filter((task) => task.status === "in_progress"),
          },
        },
      };
    });
  }, [tasks]);

  const handleDragEnd = async (
    result: DropResult,
    provided: ResponderProvided
  ) => {
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
      setBeauty((previous) => {
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
      type droppableIdType = "todo" | "progress" | "completed" | "archived";
      const destinationId = destination.droppableId as droppableIdType;
      const sourceId = source.droppableId as droppableIdType;
      const sourceColumn = data.columns[sourceId];
      const destColumn = data.columns[destinationId];
      const sourceItems = Array.from(sourceColumn.tasks);
      const destItems = Array.from(destColumn.tasks);
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setBeauty((previous) => {
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
      const { data: resUp, error } = await updateTask(
        removed.id,
        destinationId
      );
    }
  };
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_1fr] gap-3">
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
