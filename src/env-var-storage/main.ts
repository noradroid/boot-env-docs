import {
  EnvVarsDict,
  EnvVarData,
} from "../shared/models/env-var/env-var-data.type";
import { Version } from "../shared/models/version.type";
import { clone, isObjsEqual } from "../utils/misc/helper-utils";

const isEnvVarDataChanged = (
  oldData: EnvVarData,
  newData: EnvVarData
): boolean => {
  return (
    oldData.default !== newData.default ||
    oldData.type !== newData.type ||
    !isObjsEqual(oldData.instances, newData.instances)
  );
};

export const updateEnvVarsDict = (
  oldDict: EnvVarsDict,
  newDict: EnvVarsDict
): EnvVarsDict => {
  const updated: EnvVarsDict = clone(oldDict);
  Object.entries(newDict).forEach(([envVar, data]: [string, EnvVarData]) => {
    if (envVar in updated) {
      const ogData = updated[envVar];
      if (isEnvVarDataChanged(ogData, data)) {
        updated[envVar] = {
          ...ogData,
          version: data.version,
          type: data.type,
          default: data.default,
          instances: data.instances,
        };
      }
    } else {
      updated[envVar] = data;
    }
  });
  return updated;
};

export const addVersionToEnvVarsDict = (
  dict: EnvVarsDict,
  version: Version | undefined
): EnvVarsDict => {
  const updated: EnvVarsDict = clone(dict);
  Object.entries(dict).forEach(([envVar, data]: [string, EnvVarData]) => {
    updated[envVar] = {
      ...updated[envVar],
      version,
    };
  });
  return updated;
};
