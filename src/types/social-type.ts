import { MakeGenerics } from "@tanstack/react-location";
export type socialFilterType = {
  filter: {
    out?: string[];
    all?: boolean;
    only?: string[];
  };
};
export type socialFilterSearch = MakeGenerics<{
  Search: socialFilterType;
}>;
