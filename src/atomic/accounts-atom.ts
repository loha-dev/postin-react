import { atom } from "jotai";
import type { accountsType } from "../types/account-type";
export const accountsAtom = atom<accountsType>("all");
