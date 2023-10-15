import { KeyValuePairs } from "../input-parser/shared/types/key-value.type";
import { formatParseError } from "../utils/error/error-utils";
import { clone, isString } from "../utils/misc/helper-utils";
import { parseTokensIntoEnvVarDefaults } from "./env-var-parser";
import { tokenise } from "./env-var-tokeniser";
import { findInstanceIndex, isInstanceInArr } from "./env-var-utils";
import { validateEnvVarSyntax } from "./env-var-validator";
import {
  convertValueIntoType,
  getValueType,
} from "./env-var-value-type/env-var-value-type-parser";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { Default } from "./types/default.type";
import {
  EnvVarData,
  EnvVarDict,
  EnvVarInstance,
} from "./types/env-var-data.type";
import { EnvVarDefault } from "./types/env-var-default.type";

const getEnvVarDefaults = (value: string): EnvVarDefault[] => {
  const valueTokens = tokenise(value);
  if (valueTokens.length === 0) {
    return [];
  }
  try {
    validateEnvVarSyntax(valueTokens);
    const envVarDefaults = parseTokensIntoEnvVarDefaults(valueTokens);
    return envVarDefaults;
  } catch (err) {
    // EnvVarParseError
    if (err instanceof EnvVarParseError) {
      console.error(formatParseError(err));
      // EnvVarParseError - caused by MISSING_CLOSING_BRACE
      // = Env var is not closed by a closing brace
    } else {
      console.error(err);
    }
    process.exit(1);
  }
};

const main = (keyValuePairs: KeyValuePairs): EnvVarDict => {
  const variables: EnvVarDict = {};
  // tokenize each value
  keyValuePairs.forEach((keyValue) => {
    if (isString(keyValue.value)) {
      const envVarDefaults = getEnvVarDefaults(keyValue.value);
      envVarDefaults.forEach((envVarDefault) => {
        const valueType = getValueType(envVarDefault.default);
        const defaultValue: Default = convertValueIntoType(
          envVarDefault.default,
          valueType
        );
        if (!(envVarDefault.envVar in variables)) {
          variables[envVarDefault.envVar] = {
            envVar: envVarDefault.envVar,
            description: "",
            type: valueType,
            default: defaultValue,
            instances: [],
          };
        }
        variables[envVarDefault.envVar].type = valueType;
        variables[envVarDefault.envVar].default = defaultValue;
        variables[envVarDefault.envVar].instances.push({
          key: keyValue.key,
          default: defaultValue,
        });
      });
    }
  });
  return variables;
};

export default main;

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
  oldDict: EnvVarDict,
  newDict: EnvVarDict
): EnvVarDict => {
  const merged: EnvVarDict = clone(oldDict);
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
