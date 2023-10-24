import { Version } from "./version.type";
import { EnvVarsDict } from "../env-var-parser/types/env-var-data.type";

export type EnvVarsInfo = {
  version?: Version;
  envVars: EnvVarsDict;
};
