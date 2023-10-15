import { COLON_SEPARATOR } from "./constants/tokens";
import { getEnvVarStartIndex, getEnvVarEndIndex } from "./env-var-utils";
import { EnvVarDefault } from "./types/env-var-default.type";
import { Tokens } from "./types/tokens.type";

/**
 * Parse tokens between startIndex and endIndex into env var and default value.
 */
const parseTokensIntoEnvVarDefault = (
  tokens: Tokens,
  startIndex: number,
  endIndex: number
): EnvVarDefault => {
  const colonIndex = tokens.indexOf(COLON_SEPARATOR, startIndex);
  const envVar = tokens[colonIndex - 1];
  const defaultStr = tokens.slice(colonIndex + 1, endIndex).join("");
  return { envVar, default: defaultStr };
};

export const parseTokensIntoEnvVarDefaults = (
  tokens: Tokens
): EnvVarDefault[] => {
  const envVarDefaults: EnvVarDefault[] = [];
  let startIndex = getEnvVarStartIndex(tokens);
  let endIndex = 0;

  while (startIndex < tokens.length) {
    endIndex = getEnvVarEndIndex(tokens, startIndex);
    envVarDefaults.push(
      parseTokensIntoEnvVarDefault(tokens, startIndex, endIndex)
    );
    startIndex = endIndex + 1;
  }
  return envVarDefaults;
};
