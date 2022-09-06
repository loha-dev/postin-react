import { MakeGenerics } from "@tanstack/react-location";
export type socialFilterType = {
  socialFilter: {
    out?: number[];
    all?: boolean;
  };
};
export type socialFilterSearch = MakeGenerics<{
  Search: socialFilterType;
}>;
export type socialMediaDataTypes = { id: number; title: string; img: string };
export type socialMediaDataTypesList = {
  id: number;
  title: string;
  img: string;
  isOut: boolean;
};
