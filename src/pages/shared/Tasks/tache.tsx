import CardView from "./CardView/CardView";
import TableView from "./TableView/TableView";
import { ScrollArea, Tabs } from "@mantine/core";
import Beauty from "./Beautiful/Beauty";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TasksType } from "../../../types/short";
import TaskMenu from "./TaskMenu";
const Tasks = () => {
  const { data } = useQuery(["tasks"], async () => {
    const request = await supabase.from("tasks").select("*").range(0, 20);
    return request.data as TasksType[] | null;
  });
  return (
    <div>
      <TaskMenu />
      <Tabs defaultValue="table" color="dark">
        <Tabs.List>
          <Tabs.Tab value="table">Table</Tabs.Tab>
          <Tabs.Tab value="kanban">kanban</Tabs.Tab>
        </Tabs.List>
        <ScrollArea
          style={{
            height: "78vh",
          }}
        >
          <Tabs.Panel value="table" pt="xs">
            <TableView />
          </Tabs.Panel>

          <Tabs.Panel value="kanban" pt="xs">
            <Beauty tasks={data ? data : null} />
          </Tabs.Panel>
        </ScrollArea>
      </Tabs>
    </div>
  );
};

export default Tasks;
