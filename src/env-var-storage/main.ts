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
  newDict: EnvVarsDict,
  version: Version | undefined
): EnvVarsDict => {
  const updated: EnvVarsDict = {};
  Object.entries(newDict).forEach(([envVar, data]: [string, EnvVarData]) => {
    if (envVar in oldDict) {
      const ogData = oldDict[envVar];
      if (isEnvVarDataChanged(ogData, data)) {
        updated[envVar] = {
          ...ogData,
          updatedVersion: data.updatedVersion,
          type: data.type,
          default: data.default,
          instances: data.instances,
        };
      }
    } else {
      updated[envVar] = data;
    }
  });
  Object.entries(oldDict).forEach(([envVar, data]: [string, EnvVarData]) => {
    if (!(envVar in updated)) {
      updated[envVar] = {
        ...data,
        deprecatedVersion: version,
      };
    }
  });
  return updated;
};

export const addVersionToEnvVarsDict = (
  dict: EnvVarsDict,
  version: Version | undefined
): EnvVarsDict => {
  const updated: EnvVarsDict = clone(dict);
  Object.keys(dict).forEach((envVar: string) => {
    updated[envVar] = {
      ...updated[envVar],
      introducedVersion: version,
      updatedVersion: version,
    };
  });
  return updated;
};
