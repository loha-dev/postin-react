import CardView from "./CardView/CardView";
import TableView from "./TableView/TableView";
import { ScrollArea, Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import Beauty from "./Beautiful/Beauty";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { TasksType } from "../../../types/short";
const Tasks = () => {
  const { data } = useQuery(["tasks"], async () => {
    const request = await supabase.from("tasks").select("*").range(0, 20);
    return request.data as TasksType[] | null;
  });
  return (
    <Tabs defaultValue="gallery" color="dark" variant="pills">
      <Tabs.List>
        <Tabs.Tab value="gallery" icon={<IconPhoto size={14} />}>
          Vue Table
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size={14} />}>
          Vue Card
        </Tabs.Tab>
        <Tabs.Tab value="settings" icon={<IconSettings size={14} />}>
          Vue kanban
        </Tabs.Tab>
      </Tabs.List>
      <ScrollArea
        style={{
          height: "78vh",
          padding: "1rem",
        }}
      >
        <Tabs.Panel value="gallery" pt="xs">
          <TableView />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="xs">
          <CardView />
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="xs">
          <Beauty tasks={data ? data : null} />
        </Tabs.Panel>
      </ScrollArea>
    </Tabs>
  );
};

export default Tasks;
