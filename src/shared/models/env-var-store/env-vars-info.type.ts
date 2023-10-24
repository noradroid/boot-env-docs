import { Version } from "../version.type";
import { EnvVarsDict } from "../env-var/env-var-data.type";

export type EnvVarStore = {
  version?: Version;
  envVars: EnvVarsDict;
};
