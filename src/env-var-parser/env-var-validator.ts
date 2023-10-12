import {
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
  ENV_VAR_CLOSING_BRACE,
  ENV_VAR_OPENING_BRACE,
  OPENING_CURLY_BRACE,
} from "./constants/tokens";
import { EnvVarParseError } from "./errors/env-var-parse.error";
import { Tokens } from "./types/tokens.type";

export const validateEnvVarSyntax = (tokens: Tokens): void => {
  let openedBracketsCount = 0;

  let prevToken: string | null = null;

  tokens.forEach((currToken: string) => {
    if (prevToken === null) {
      if (currToken === ENV_VAR_OPENING_BRACE) {
        openedBracketsCount += 1;
        prevToken = currToken;
      }
    } else if (prevToken === ENV_VAR_OPENING_BRACE) {
      if (currToken === COLON_SEPARATOR) {
        prevToken = currToken;
      } else if (currToken === ENV_VAR_CLOSING_BRACE) {
        throw new EnvVarParseError("MISSING_COLON");
      } else if (
        currToken === ENV_VAR_OPENING_BRACE ||
        currToken === OPENING_CURLY_BRACE
      ) {
        throw new EnvVarParseError("MISSING_CLOSING_BRACE");
      }
    } else if (prevToken === COLON_SEPARATOR) {
      if (currToken === ENV_VAR_CLOSING_BRACE) {
        openedBracketsCount -= 1;
        prevToken = null;
      } else if (currToken === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = currToken;
      }
    } else if (prevToken === OPENING_CURLY_BRACE) {
      if (currToken === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = currToken;
        }
      }
    } else if (prevToken === CLOSING_CURLY_BRACE) {
      if (currToken === CLOSING_CURLY_BRACE) {
        openedBracketsCount -= 1;
        if (openedBracketsCount === 0) {
          prevToken = null;
        } else {
          prevToken = currToken;
        }
      } else if (currToken === OPENING_CURLY_BRACE) {
        openedBracketsCount += 1;
        prevToken = currToken;
      }
    } else {
      throw new EnvVarParseError("IDK_WHAT_HAPPENED");
    }
  });

  if (prevToken !== null) {
    throw new EnvVarParseError("MISSING_CLOSING_BRACE");
  }
};
