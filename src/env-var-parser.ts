import { EnvVarArr, EnvVarDict } from "./env-var-info.type";
import { EnvVar } from "./env-var.type";
import { Property } from "./property.type";
import {
  CURLY_OPENING_BRACE,
  ENV_VAR_CLOSING_BRACE,
  ENV_VAR_OPENING_BRACE,
} from "./tokens";
import { isString } from "./type-util";

const isOutOfBounds = (index: number, length: number): boolean => {
  return index >= length || index === -1;
};

/**
 * Get environment variable index in property value.
 * @param {string} value - Property value
 * @param {number} startingIndex - Starting index for getting environment variable
 * @return {number} Environment variable index, or -1 if not found
 */
const getEnvVarIndex = (value: string, startingIndex?: number): number => {
  const openingBraceIndex = value.indexOf(ENV_VAR_OPENING_BRACE, startingIndex);
  if (openingBraceIndex === -1) {
    return -1;
  }
  const envVarIndex = openingBraceIndex + 2;
  return envVarIndex >= value.length ? -1 : envVarIndex;
};

/**
 * Check if the property value has an environment variable (contains ${).
 * @param {string} value - Property value
 * @return {boolean} True if opening brace is found and it is not
 *                   at the end of the variable, false otherwise
 */
const hasEnvVar = (value: string): boolean => {
  const envVarIndex = getEnvVarIndex(value);
  return envVarIndex !== -1;
};

const getEnvVarClosingBraceIndex = (
  value: string,
  envVarIndex: number
): number => {
  let startingCheckIndex = envVarIndex;
  let closingBraceIndex = value.indexOf(
    ENV_VAR_CLOSING_BRACE,
    startingCheckIndex
  );
  while (
    value
      .substring(startingCheckIndex, closingBraceIndex)
      .includes(CURLY_OPENING_BRACE)
  ) {
    startingCheckIndex = closingBraceIndex + 1;
    closingBraceIndex = value.indexOf(
      ENV_VAR_CLOSING_BRACE,
      startingCheckIndex
    );
  }
  return closingBraceIndex;
};

/**
 * Get environment variable with default string (in the format of x:y
 * or just x, where x is the environment variable and y is the default value).
 * @param {string} value - Property value
 * @param {number} envVarIndex - Starting index for environment variable
 * @param {number} closingBraceIndex - Index after final index for environment variable, or -1 if no closing brace
 * @return {string} Environment variable with default string if any
 */
const getEnvVarDefault = (
  value: string,
  envVarIndex: number,
  closingBraceIndex: number
): string => {
  if (closingBraceIndex === -1) {
    return value.substring(envVarIndex);
  } else {
    return value.substring(envVarIndex, closingBraceIndex);
  }
};

/**
 * Get the environment variable and default value if any.
 * @param {string} value - Property value to check
 * @return {EnvVar[]} Environment variable and defaut value object
 */
const getEnvVars = (value: string): EnvVar[] => {
  const envVars: EnvVar[] = [];
  let startingIndex = 0;
  while (true) {
    if (isOutOfBounds(startingIndex, value.length)) {
      break;
    }
    const envVarIndex = getEnvVarIndex(value, startingIndex);
    if (envVarIndex === -1) {
      break;
    }
    const closingBraceIndex = getEnvVarClosingBraceIndex(value, envVarIndex);
    startingIndex = closingBraceIndex;
    const envVarDefault = getEnvVarDefault(
      value,
      envVarIndex,
      closingBraceIndex
    );
    const colonSeparatorIndex = envVarDefault.indexOf(":");
    if (
      colonSeparatorIndex !== -1 &&
      colonSeparatorIndex !== envVarDefault.length - 1
    ) {
      envVars.push({
        envVar: envVarDefault.substring(0, colonSeparatorIndex),
        default: envVarDefault.substring(colonSeparatorIndex + 1),
      });
    } else {
      envVars.push({
        envVar: envVarDefault,
        default: null,
      });
    }
  }
  return envVars;
};

export const getEnvVarInfoDict = (properties: Property[]): EnvVarDict => {
  const variables: EnvVarDict = {};

  properties.forEach((prop) => {
    if (isString(prop.value)) {
      const envVars = getEnvVars(prop.value);
      envVars.forEach((envVar) => {
        if (!(envVar.envVar in variables)) {
          variables[envVar.envVar] = {
            envVar: envVar.envVar,
            type: null,
            instances: [],
          };
        }
        variables[envVar.envVar].instances.push({
          key: prop.key,
          default: envVar.default,
        });
      });
    }
  });

  console.log(JSON.stringify(variables, undefined, 2));

  return variables;
};

export const convertEnvVarInfoDictToArr = (dict: EnvVarDict): EnvVarArr => {
  return Object.values(dict);
};
