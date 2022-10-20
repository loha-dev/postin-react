import TableView from "./TableView/TableView";
import { ScrollArea, Tabs } from "@mantine/core";
import Beauty from "./Beautiful/Beauty";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TasksType } from "../../../types/short";
import TaskMenu from "./TaskMenu";
import { useState } from "react";
import { Skeleton } from "@mantine/core";
const Tasks = () => {
  const [data, setData] = useState<TasksType[] | null>(null);
  const { refetch } = useQuery(
    ["tasks"],
    async () => {
      const request = await supabase.from("tasks").select("*").range(0, 20);
      return request.data as TasksType[] | null;
    },
    {
      onSuccess(data) {
        setData(data);
      },
    }
  );
  const revalidateTasksQuery = () => {
    refetch();
  };
  return (
    <div>
      <TaskMenu />
      <Tabs
        defaultValue="table"
        color="dark"
        onTabChange={revalidateTasksQuery}
      >
        <Tabs.List>
          <Tabs.Tab value="table">Table</Tabs.Tab>
          <Tabs.Tab value="kanban">kanban</Tabs.Tab>
        </Tabs.List>
        <ScrollArea
          style={{
            height: "72vh",
          }}
        >
          <Tabs.Panel value="table" pt="xs">
            {data ? (
              <TableView tasks={data} />
            ) : (
              <div className="my-5">
                <Skeleton width={"100%"} height={70} />
                <div className="flex flex-col gap-4 my-5">
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                  <Skeleton height={100} />
                </div>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="kanban" pt="xs">
            {data ? (
              <Beauty tasks={data} />
            ) : (
              <div className="grid grid-cols-4"></div>
            )}
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default Tasks;
