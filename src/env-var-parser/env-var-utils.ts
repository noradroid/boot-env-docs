import { ENV_VAR_OPENING_BRACE } from "./constants/tokens";
import { EnvVarInstance } from "./types/env-var-data.type";
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

export const isInstanceInArr = (
  arr: EnvVarInstance[],
  instance: EnvVarInstance
): boolean => {
  return !!arr.find(
    (ins) => ins.key === instance.key && ins.default === instance.default
  );
};
