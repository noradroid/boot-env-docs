import { EnvVar } from "./env-var.type";
import { Property } from "./property.type";

/**
 * Get environment variable index in property value.
 * @param {string} value - Property value
 * @param {number} startingIndex - Starting index for getting environment variable
 * @return {number} Environment variable index, or -1 if not found
 */
const getEnvVarIndex = (value: string, startingIndex?: number): number => {
  const openingBraceIndex = value.indexOf("${", startingIndex);
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
  return value.indexOf("}", envVarIndex + 1);
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
    if (startingIndex >= value.length || startingIndex === -1) {
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
    const colonSeparator = envVarDefault.indexOf(":");
    if (colonSeparator !== -1) {
      envVars.push({
        envVar: envVarDefault.substring(0, colonSeparator),
        default: envVarDefault.substring(colonSeparator + 1),
      });
    } else {
      envVars.push({
        envVar: envVarDefault,
      });
    }
  }
  return envVars;
};

const main = (property: Property): EnvVar[] => {
  return getEnvVars(property.value);
};

export default main;
