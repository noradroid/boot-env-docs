import { Version } from "../version.type";
import { DefaultValue } from "./default-value.type";

export type EnvVarsDict = { [envVar: string]: EnvVarData };

export type EnvVarData = {
  envVar: string;
  type: string;
  default?: DefaultValue;
  instances: EnvVarInstance[];
  description: string;
  version?: Version;
};

export type EnvVarInstance = {
  key: string;
  default: DefaultValue;
};
