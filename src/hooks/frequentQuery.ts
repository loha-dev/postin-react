import { useQuery } from "@tanstack/react-query";
import { socialMediaDataTypesList } from "../types/social-type";
import { supabase } from "../utils/supabase";

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
