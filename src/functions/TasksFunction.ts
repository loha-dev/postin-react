import { supabase } from "../utils/supabase";

export const updateTask = async (id: number, toUpdate: string) => {
  const status = toUpdate === "progress" ? "in_progress" : toUpdate;
  const { data, error } = await supabase
    .from("tasks")
    .update({ status: status })
    .eq("id", id);

  return { data, error };
};
