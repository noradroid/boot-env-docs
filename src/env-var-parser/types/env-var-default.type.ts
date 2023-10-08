import { Default } from "./default.type";

export type EnvVarDefault = {
  envVar: string;
  default: Default | null;
};
