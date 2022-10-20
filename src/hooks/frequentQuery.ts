import { useQuery } from "@tanstack/react-query";
import { socialMediaDataTypesList } from "../types/social-type";
import { supabase } from "../utils/supabase";
import { TasksType } from "../types/short";
export const useSocialMedialList = () =>
  useQuery(
    ["social-media"],
    async () => {
      const { data } = await supabase.from("social-media");
      return data as socialMediaDataTypesList[];
    },
    {
      staleTime: Infinity,
    }
  );
export const useTaskId = (id: number) =>
  useQuery(["task", id], async () => {
    const { data } = await supabase.from("tasks").select("*").eq("id", id);
    if (data) {
      return data[0] as TasksType;
    } else {
      return null;
    }
  });
