import type {
  FacebookPageTokenRespone,
  FacebookUserLongLivedToken,
} from "./../types/facebook";
import { atom } from "jotai";

export const pageCredentialAtom = atom<{
  access_token: string;
  category?: string;
  page_id?: string;
}>({
  access_token: "string",
  category: "string",
  page_id: "string",
});

export const accountCredentialAtom = atom<FacebookUserLongLivedToken | null>(
  null
);
