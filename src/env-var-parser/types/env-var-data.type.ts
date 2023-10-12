import { Default } from "./default.type";

export type EnvVarDict = { [envVar: string]: EnvVarData };

export type EnvVarData = {
  envVar: string;
  description: string;
  type: string;
  default?: Default;
  instances: EnvVarInstance[];
};

export type EnvVarInstance = {
  key: string;
  default: Default;
};
