import { atom } from "jotai";
import type { accountsType } from "../types/account-type";
export const activesAtom = atom<accountsType>("all");
