import { EnvVarsDict } from "../env-var/env-var-data.type";
import { Version } from "../version.type";

export type EnvVarStore = {
  version?: Version;
  envVars: EnvVarsDict;
};
