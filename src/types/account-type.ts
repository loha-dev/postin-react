import { MakeGenerics } from "@tanstack/react-location";
export type accountsType =
  | {
      owner: "all" | string[] | string | null;
      socials: "all" | string[] | null;
      out: "all" | string[] | null;
    }
  | null
  | "all";

export type accountsUrlSearch = MakeGenerics<{
  Search: {
    pagination?: {
      index?: number;
      size: number;
    };
    inlayout?: boolean;
    filters?: {
      name?: string;
      phone?: string;
    };
    order?: "byname" | "account";
  };
}>;
