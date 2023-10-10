import { Default } from "./types/default.type";

export type EnvVarArr = EnvVarInfo[];

export type EnvVarDict = { [envVar: string]: EnvVarInfo };

export type EnvVarInfo = {
  envVar: string;
  description: string;
  type: string;
  instances: EnvVarInstance[];
};

export type EnvVarInstance = {
  key: string;
  default: Default | null;
};
