import { KeyValuePairs } from "../config-parser/shared/types/key-value.type";
import { DefaultValue } from "../shared/models/env-var/default-value.type";
import {
  EnvVarData,
  EnvVarInstance,
  EnvVarsDict,
} from "../shared/models/env-var/env-var-data.type";
import { formatParseError } from "../utils/errors/error-utils";
import { isString } from "../utils/misc/helper-utils";
import { parseTokensIntoEnvVarDefaults } from "./env-var-parser";
import { tokenise } from "./env-var-tokeniser";
import { validateEnvVarSyntax } from "./env-var-validator";
import {
  convertValueIntoType,
  getValueType,
} from "./env-var-value-type/env-var-value-type-parser";
import { ValueType } from "./env-var-value-type/types/value-type.type";
import { EnvVarParseError } from "./errors/env-var-parse.error";
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

const getUpdatedEnvVarData = (
  variables: EnvVarsDict,
  config: string,
  envVar: string,
  valueType: ValueType,
  defaultValue: DefaultValue
): EnvVarData => {
  const envVarInstance: EnvVarInstance = { key: config, default: defaultValue };
  if (envVar in variables) {
    return {
      ...variables[envVar],
      type: valueType,
      default: defaultValue,
      instances: variables[envVar].instances.concat(envVarInstance),
    };
  } else {
    return {
      envVar,
      description: "",
      type: valueType,
      default: defaultValue,
      instances: [envVarInstance],
    };
  }
};

export const parseKeyValuePairsIntoEnvVarDict = (
  keyValuePairs: KeyValuePairs
): EnvVarsDict => {
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
