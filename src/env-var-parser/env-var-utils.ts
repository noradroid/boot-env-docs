import { DOT_SEPARATOR, ENV_VAR_OPENING_BRACE } from "./constants/tokens";
import { ValueType } from "./env-var-value-type/types/value-type.type";
import { DefaultValue } from "./types/default-value.type";
import {
  EnvVarData,
  EnvVarDict,
  EnvVarInstance,
} from "./types/env-var-data.type";
import { Tokens } from "./types/tokens.type";

/**
 * Get env var opening brace index from start index.
 * @param startIndex - Default zero
 */
export const getEnvVarStartIndex = (
  tokens: Tokens,
  startIndex: number = 0
): number => {
  return tokens.indexOf(ENV_VAR_OPENING_BRACE, startIndex);
};

/**
 * Get env var closing brace index from start index.
 * @param startIndex - Env var opening index
 */
export const getEnvVarEndIndex = (
  tokens: Tokens,
  startIndex: number
): number => {
  const nextStartIndex = getEnvVarStartIndex(tokens, startIndex + 1);
  return nextStartIndex === -1 ? tokens.length - 1 : nextStartIndex - 1;
};

export const findInstanceIndex = (
  arr: EnvVarInstance[],
  key: string
): number => {
  return arr.findIndex((ins) => ins.key === key);
};

export const isWordFileVariable = (word: string): boolean => {
  return word.includes(DOT_SEPARATOR);
};

export const getUpdatedEnvVarData = (
  variables: EnvVarDict,
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
