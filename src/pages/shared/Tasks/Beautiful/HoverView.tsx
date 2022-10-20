import { Button } from "@mantine/core";
import { useTaskId } from "../../../../hooks/frequentQuery";
const HoverView = (props: { taskId: number }) => {
  const { data: task } = useTaskId(props.taskId);
  return task ? (
    <div className="h-72 w-72">
      <h5 className="text-xl font-bold text-gray-900">{task.title}</h5>
      <p className="text-sm text-gray-500">{task.content}</p>
      <div className="h-10"></div>
      <Button>Data</Button>
    </div>
  ) : (
    <></>
  );
};

export default HoverView;
