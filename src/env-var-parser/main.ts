import { KeyValuePairs } from "../input-parser/shared/types/key-value.type";
import { formatParseError } from "../utils/error/error-utils";
import { isString } from "../utils/misc/type-util";
import { COLON_SEPARATOR, ENV_VAR_OPENING_BRACE } from "./constants/tokens";
import { EnvVarDict } from "./env-var-info.type";
import { tokenise } from "./env-var-tokeniser";
import { validateEnvVarSyntax } from "./env-var-validator";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { EnvVarDefault } from "./types/env-var-default.type";
import { Tokens } from "./types/tokens.type";

const convertTokensToEnvVarDefaults = (tokens: Tokens): EnvVarDefault[] => {
  let startIndex = tokens.indexOf(ENV_VAR_OPENING_BRACE);
  let endIndex = 0;
  const envVarDefaults: EnvVarDefault[] = [];

  while (startIndex < tokens.length) {
    const nextStartIndex = tokens.indexOf(
      ENV_VAR_OPENING_BRACE,
      startIndex + 1
    );
    if (nextStartIndex === -1) {
      endIndex = tokens.length - 1;
    } else {
      endIndex = nextStartIndex - 1;
    }
    const colonIndex = tokens.indexOf(COLON_SEPARATOR, startIndex);
    const envVar = tokens[colonIndex - 1];
    const defaultStr = tokens.slice(colonIndex + 1, endIndex).join();
    envVarDefaults.push({
      envVar,
      default: defaultStr,
    });
    startIndex = endIndex + 1;
  }
  return envVarDefaults;
};

const main = (keyValuePairs: KeyValuePairs): EnvVarDict => {
  const variables: EnvVarDict = {};
  try {
    // tokenize each value
    keyValuePairs.forEach((keyValue) => {
      if (isString(keyValue.value)) {
        const valueTokens = tokenise(keyValue.value);
        if (valueTokens.length > 0) {
          const valid = validateEnvVarSyntax(valueTokens);
          if (valid) {
            const envVarDefaults = convertTokensToEnvVarDefaults(valueTokens);
            envVarDefaults.forEach((envVarDefault) => {
              if (!(envVarDefault.envVar in variables)) {
                variables[envVarDefault.envVar] = {
                  envVar: envVarDefault.envVar,
                  description: "",
                  type: "",
                  instances: [],
                };
              }
              variables[envVarDefault.envVar].instances.push({
                key: keyValue.key,
                default: envVarDefault.default,
              });
            });
          }
        }
      }
    });
    return variables;
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

export default main;
