import { IoAdd } from "react-icons/io5";
import { ActionIcon } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../../utils/supabase";
import { socialMediaDataTypesList } from "../../../types/social-type";
const TaskMenu = () => {
  const { isLoading } = useQuery(["social-media"], async () => {
    const { data } = await supabase.from("social-media");
    return data as socialMediaDataTypesList[];
  });
  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <h2 className="text-2xl font-bold">TACHE A FAIRE</h2>
          <ActionIcon variant="outline" color={"green"}>
            <IoAdd size={20} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
};

export default TaskMenu;
