import { MakeGenerics } from "@tanstack/react-location";
export type accountsType =
  | {
      owner?:
        | "all"
        | {
            name: string;
            id: number;
            phone: string;
          }[]
        | {
            name: string;
            id: number;
            phone: string;
          }
        | null;
      socials?: "all" | string[] | null;
      out?: "all" | string[] | null;
    }
  | null
  | "all";

export type accountsGenericsSearch = MakeGenerics<{
  Search: {
    name?: string;
    phone?: string;
    id?: number;
  };
}>;
export type activeAccountSearch = MakeGenerics<{
  Search: {
    activename?: string;
    activeid?: number;
    activephone?: string;
  };
}>;
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
export type clientsType = {
  name: string;
  phone: string;
  id: number;
  avatar: string;
};
export type clientsPagesType = {
  id: number;
  title: string;
  social: {
    id: number;
    title: string;
    img: string;
  };
};

export type activePagesType = {
  id: number;
  title: string;
  social: {
    title: string;
    img: string;
    id: number;
  };
  owner: clientsType | null;
};
export type activePageTypeSearch = MakeGenerics<{
  Search: activePagesType;
}>;
