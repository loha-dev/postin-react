import { atom } from "jotai";
import type {
  clientsType,
  activePagesType,
  currentFacebookType,
} from "../types/account-type";
export const accountAtom = atom<clientsType | null>(null);
export const pageAtom = atom<activePagesType | null>(null);
export const currentCredentialsFacebook = atom<currentFacebookType | null>(
  null
);
