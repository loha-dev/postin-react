import { atom } from "jotai";
import type { accountsType } from "../types/accounts";
export const actives = atom<accountsType>("all");
