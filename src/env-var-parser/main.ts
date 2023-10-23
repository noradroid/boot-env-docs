import { KeyValuePairs } from "../config-parser/shared/types/key-value.type";
import { formatParseError } from "../utils/errors/error-utils";
import { clone, isString } from "../utils/misc/helper-utils";
import { parseTokensIntoEnvVarDefaults } from "./env-var-parser";
import { tokenise } from "./env-var-tokeniser";
import { findInstanceIndex, getUpdatedEnvVarData } from "./env-var-utils";
import { validateEnvVarSyntax } from "./env-var-validator";
import {
  convertValueIntoType,
  getValueType,
} from "./env-var-value-type/env-var-value-type-parser";
import { ValueType } from "./env-var-value-type/types/value-type.type";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { DefaultValue } from "./types/default-value.type";
import {
  EnvVarData,
  EnvVarsDict,
  EnvVarInstance,
} from "./types/env-var-data.type";
import { EnvVarDefault } from "./types/env-var-default.type";

/**
 * Tokenise config value, validate then parse into EnvVarDefault object(s).
 * @param value - e.g. ${ENV_VAR:somevalue}
 */
const getEnvVarDefaults = (value: string): EnvVarDefault[] => {
  const valueTokens = tokenise(value);
  if (valueTokens.length === 0) {
    return [];
  }
  validateEnvVarSyntax(valueTokens);
  const envVarDefaults = parseTokensIntoEnvVarDefaults(valueTokens);
  return envVarDefaults;
};

const main = (keyValuePairs: KeyValuePairs): EnvVarsDict => {
  const variables: EnvVarsDict = {};
  // tokenize each value
  keyValuePairs.forEach((keyValue) => {
    if (isString(keyValue.value)) {
      try {
        const envVarDefaults = getEnvVarDefaults(keyValue.value);
        envVarDefaults.forEach((envVarDefault) => {
          const valueType: ValueType = getValueType(envVarDefault.default);
          const defaultValue: DefaultValue = convertValueIntoType(
            envVarDefault.default,
            valueType
          );
          variables[envVarDefault.envVar] = getUpdatedEnvVarData(
            variables,
            keyValue.key,
            envVarDefault.envVar,
            valueType,
            defaultValue
          );
        });
      } catch (err) {
        if (err instanceof EnvVarParseError) {
          console.error(formatParseError(err) + ` for config ${keyValue.key}`);
          // EnvVarParseError - caused by MISSING_CLOSING_BRACE
          // Env var is not closed by a closing brace
        } else {
          console.error(err);
        }
        process.exit(1);
      }
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
