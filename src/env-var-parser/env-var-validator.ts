import {
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
  ENV_VAR_CLOSING_BRACE,
  ENV_VAR_OPENING_BRACE,
  OPENING_CURLY_BRACE,
} from "./constants/tokens";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { Token, Tokens } from "./types/tokens.type";

const isTokenOneOfInvalidTokens = (
  token: Token,
  validTokens: Tokens
): boolean => {
  return validTokens.some((t) => token === t);
};

export const validateEnvVarSyntax = (tokens: Tokens): boolean => {
  let currIndex = 0;
  let openedBracketsCount = 0;

  let prevToken: string | null = null;

  while (currIndex < tokens.length) {
    if (prevToken === null) {
      if (tokens[currIndex] === ENV_VAR_OPENING_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
      } else {
        return false;
      }
    } else if (prevToken === ENV_VAR_OPENING_BRACE) {
      if (tokens[currIndex] === COLON_SEPARATOR) {
        prevToken = tokens[currIndex];
      } else if (tokens[currIndex] === ENV_VAR_CLOSING_BRACE) {
        throw new EnvVarParseError("MISSING_COLON");
      } else if (
        isTokenOneOfInvalidTokens(tokens[currIndex], [
          ENV_VAR_OPENING_BRACE,
          OPENING_CURLY_BRACE,
        ])
      ) {
        throw new EnvVarParseError("MISSING_CLOSING_BRACE");
      }
    } else if (prevToken === COLON_SEPARATOR) {
      if (tokens[currIndex] === ENV_VAR_CLOSING_BRACE) {
        openedBracketsCount -= 1;
        prevToken = null;
      } else if (tokens[currIndex] === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
      }
    } else if (prevToken === OPENING_CURLY_BRACE) {
      if (tokens[currIndex] === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = tokens[currIndex];
        }
      }
    } else if (prevToken === CLOSING_CURLY_BRACE) {
      if (tokens[currIndex] === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = tokens[currIndex];
        }
      } else if (tokens[currIndex] === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
      }
    } else {
      throw new EnvVarParseError("IDK_WHAT_HAPPENED");
    }
    currIndex += 1;
  }

  if (prevToken === null) {
    return true;
  } else {
    throw new EnvVarParseError("MISSING_CLOSING_BRACE");
  }
};
