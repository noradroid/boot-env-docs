import {
  EnvVarInstance,
  EnvVarsDict,
  EnvVarData,
} from "../shared/models/env-var/env-var-data.type";
import { clone } from "../utils/misc/helper-utils";

export const findInstanceIndex = (
  arr: EnvVarInstance[],
  key: string
): number => {
  return arr.findIndex((ins) => ins.key === key);
};

const mergeInstances = (
  oldInstances: EnvVarInstance[],
  newInstances: EnvVarInstance[]
): EnvVarInstance[] => {
  const mergedInstances: EnvVarInstance[] = clone(oldInstances);
  newInstances.forEach((newInstance) => {
    const oldInstanceIndex = findInstanceIndex(
      mergedInstances,
      newInstance.key
    );
    if (oldInstanceIndex !== -1) {
      mergedInstances[oldInstanceIndex] = newInstance;
    } else {
      mergedInstances.push(newInstance);
    }
  });
  return mergedInstances;
};

export const mergeEnvVarDicts = (
  oldDict: EnvVarsDict,
  newDict: EnvVarsDict
): EnvVarsDict => {
  const merged: EnvVarsDict = clone(oldDict);
  Object.entries(newDict).forEach(
    ([newEnvVar, newData]: [string, EnvVarData]) => {
      if (newEnvVar in merged) {
        const mergedInstances = mergeInstances(
          merged[newEnvVar].instances,
          newData.instances
        );
        merged[newEnvVar] = {
          ...merged[newEnvVar],
          default: newData.default,
          instances: mergedInstances,
        };
      } else {
        merged[newEnvVar] = newData;
      }
    }
  );
  return merged;
};
