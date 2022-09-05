import { atom } from "jotai";
import type { clientsType } from "../types/account-type";
export const accountsAtom = atom<clientsType | null>(null);
