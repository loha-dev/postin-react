import { actions, assign, createMachine } from "xstate";

const createPostMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgGMAnMAQwBcwA6AMVILACMssBrfEABy1gEtzeWDBwAeiAMwA2dAE9EAVgCcVRZIAcAdkkBGLRv1rx45GhDEylKgBUA7v0pEO3PgKGiJ0kHITbx2leIaACxqOn6hAAwATPIm6OYUYE48-ILCSCBiPlGyiAC02v6KxaoxquIR4komJkA */
  createMachine({
    states: {
      Facebook: {},
      Twitter: {},
    },
    type: "parallel",
    id: "create",
  });
