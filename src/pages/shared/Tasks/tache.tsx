import CardView from "./CardView/CardView";
import TableView from "./TableView/TableView";
import { Tabs } from "@mantine/core";
import { IconPhoto, IconMessageCircle, IconSettings } from "@tabler/icons";
import Beauty from "./Beautiful/Beauty";
const Tasks = () => {
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

      <Tabs.Panel value="gallery" pt="xs">
        <div className="border border-slate-800 border-dashed p-8">
          <Tabs defaultValue="main" color="dark" variant="pills">
            <TableView />
          </Tabs>
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="messages" pt="xs">
        <div className="border border-slate-800 border-dashed p-8">
          <CardView />
        </div>
      </Tabs.Panel>

      <Tabs.Panel value="settings" pt="xs">
        <div className="border border-slate-800 border-dashed p-8">
          <Beauty />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
};

export default Tasks;
