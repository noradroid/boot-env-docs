import { COLON_SEPARATOR, DOT_SEPARATOR } from "./constants/tokens";
import { getEnvVarStartIndex, getEnvVarEndIndex } from "./env-var-utils";
import { NonEnvVarConfigError } from "./errors/non-env-var-config.error";
import { EnvVarDefault } from "./types/env-var-default.type";
import { Tokens } from "./types/tokens.type";

/**
 * Parse tokens between startIndex and endIndex into env var and default value.
 * @param startIndex - index of `${`
 * @param endIndex - index of `}`
 * @returns
 */
const parseTokensIntoEnvVarDefault = (
  tokens: Tokens,
  startIndex: number,
  endIndex: number
): EnvVarDefault => {
  const colonIndex = tokens.indexOf(COLON_SEPARATOR, startIndex);
  if (colonIndex === -1) {
    const configName = tokens[startIndex + 1];
    throw new NonEnvVarConfigError(configName);
  }
  const configName = tokens[colonIndex - 1];
  if (configName.includes(DOT_SEPARATOR)) {
    throw new NonEnvVarConfigError(configName);
  }
  const defaultStr = tokens.slice(colonIndex + 1, endIndex).join("");
  return { envVar: configName, default: defaultStr };
};

export const parseTokensIntoEnvVarDefaults = (
  tokens: Tokens
): EnvVarDefault[] => {
  const envVarDefaults: EnvVarDefault[] = [];
  let startIndex = getEnvVarStartIndex(tokens); // ${
  let endIndex = 0;

  while (startIndex < tokens.length) {
    endIndex = getEnvVarEndIndex(tokens, startIndex); // }
    try {
      envVarDefaults.push(
        parseTokensIntoEnvVarDefault(tokens, startIndex, endIndex)
      );
    } catch (err) {
      if (err instanceof NonEnvVarConfigError) {
        console.log(`${err.name} - ${err.message}. Skipping...`);
        // EnvVarParseError - caused by MISSING_CLOSING_BRACE
        // = Env var is not closed by a closing brace
      } else {
        console.error(err);
      }
    }
    startIndex = endIndex + 1;
  }
  return envVarDefaults;
};
