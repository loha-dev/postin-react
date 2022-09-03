export type accountsType =
  | {
      owner: "all" | string[] | string | null;
      socials: "all" | string[] | null;
      out: "all" | string[] | null;
    }
  | null
  | "all";
