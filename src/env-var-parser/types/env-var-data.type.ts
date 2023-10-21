import { DefaultValue } from "./default-value.type";

export type EnvVarDict = { [envVar: string]: EnvVarData };

export type EnvVarData = {
  envVar: string;
  description: string;
  type: string;
  default?: DefaultValue;
  instances: EnvVarInstance[];
};

export type EnvVarInstance = {
  key: string;
  default: DefaultValue;
};
