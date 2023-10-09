import {
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
  ENV_VAR_CLOSING_BRACE,
  ENV_VAR_OPENING_BRACE,
  OPENING_CURLY_BRACE,
} from "./constants/tokens";
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
  let currEnvVarTokens = [];

  let prevToken: string | null = null;

  while (currIndex < tokens.length) {
    if (prevToken === null) {
      if (tokens[currIndex] === ENV_VAR_OPENING_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
        currIndex += 1;
      } else {
        return false;
      }
    } else if (prevToken === ENV_VAR_OPENING_BRACE) {
      if (tokens[currIndex] === COLON_SEPARATOR) {
        prevToken = tokens[currIndex];
        currIndex += 1;
      } else if (
        isTokenOneOfInvalidTokens(tokens[currIndex], [
          ENV_VAR_OPENING_BRACE,
          OPENING_CURLY_BRACE,
          ENV_VAR_CLOSING_BRACE,
        ])
      ) {
        throw new Error(
          `Invalid token after environment variable opening brace: '${tokens[currIndex]}'`
        );
      } else {
        currIndex += 1;
      }
    } else if (prevToken === COLON_SEPARATOR) {
      if (tokens[currIndex] === ENV_VAR_CLOSING_BRACE) {
        openedBracketsCount -= 1;
        prevToken = null;
        currIndex += 1;
      } else if (tokens[currIndex] === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
        currIndex += 1;
      } else {
        currIndex += 1;
      }
    } else if (prevToken === OPENING_CURLY_BRACE) {
      if (tokens[currIndex] === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = tokens[currIndex];
        }
        currIndex += 1;
      } else {
        currIndex += 1;
      }
    } else if (prevToken === CLOSING_CURLY_BRACE) {
      if (tokens[currIndex] === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = tokens[currIndex];
        }
        currIndex += 1;
      } else if (tokens[currIndex] === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = tokens[currIndex];
        currIndex += 1;
      }
    } else {
      throw new Error("There's no way you got here");
    }
  }

  if (prevToken === null) {
    return true;
  } else {
    throw new Error(
      "Environment variable definition should be closed with a closing brace '}'"
    );
  }
};
