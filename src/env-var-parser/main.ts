import { KeyValuePairs } from "../input-parser/shared/types/key-value.type";
import { formatParseError } from "../utils/error/error-utils";
import { isString } from "../utils/misc/type-util";
import { parseTokensIntoEnvVarDefaults } from "./env-var-parser";
import { tokenise } from "./env-var-tokeniser";
import { validateEnvVarSyntax } from "./env-var-validator";
import {
  convertValueIntoType,
  getValueType,
} from "./env-var-value-type/env-var-value-type-parser";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { Default } from "./types/default.type";
import { EnvVarDict } from "./types/env-var-data.type";
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
