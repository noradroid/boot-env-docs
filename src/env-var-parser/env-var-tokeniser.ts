import {
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
  DOLLAR_SIGN,
  ENV_VAR_CLOSING_BRACE,
  ENV_VAR_OPENING_BRACE,
  OPENING_CURLY_BRACE,
} from "./constants/tokens";
import { Token, Tokens } from "./types/tokens.type";

const IMPT_TOKENS = [COLON_SEPARATOR, OPENING_CURLY_BRACE, CLOSING_CURLY_BRACE];

const isTokenInImptTokens = (token: string): boolean => {
  return IMPT_TOKENS.some((t) => token === t);
};

const isDollarSign = (char: string): boolean => char === DOLLAR_SIGN;

const isOpeningCurlyBrace = (char: string): boolean =>
  char === OPENING_CURLY_BRACE;

const hasEnvVarOpeningBrace = (tokens: Tokens): boolean =>
  tokens.includes(ENV_VAR_OPENING_BRACE);

const VALID_PREV_TOKEN_FOR_COLON_SEPARATOR = [ENV_VAR_OPENING_BRACE];

const VALID_PREV_TOKEN_FOR_ENV_VAR_CLOSING_BRACE = [
  ENV_VAR_OPENING_BRACE,
  COLON_SEPARATOR,
  OPENING_CURLY_BRACE,
  CLOSING_CURLY_BRACE,
];

const VALID_PREV_TOKEN_FOR_OPENING_CURLY_BRACE = [
  OPENING_CURLY_BRACE,
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
];

const isTokenValidGivenPrevToken = (
  currToken: Token,
  prevTokens: Tokens
): boolean => {
  let validPrevTokens: Tokens = [];
  if (currToken === COLON_SEPARATOR) {
    validPrevTokens = VALID_PREV_TOKEN_FOR_COLON_SEPARATOR;
  } else if (currToken === ENV_VAR_CLOSING_BRACE) {
    validPrevTokens = VALID_PREV_TOKEN_FOR_ENV_VAR_CLOSING_BRACE;
  } else if (currToken === OPENING_CURLY_BRACE) {
    validPrevTokens = VALID_PREV_TOKEN_FOR_OPENING_CURLY_BRACE;
  }
  if (prevTokens.length === 0) {
    return false;
  }
  const prevToken = prevTokens[prevTokens.length - 1];
  return validPrevTokens.some((t) => prevToken === t);
};

/**
 * Tokenises a config value into multiple semantic tokens.
 * E.g. `${ABC_TOKEN:this is the value}` would be tokenised into "${",
 * "ABC_TOKEN", ":", "this is the value", "}".
 * @param content
 */
export const tokenise = (content: string): Tokens => {
  const tokens: Tokens = [];
  let currIndex: number = 0;
  let prevTokenIndex: number = 0;
  while (currIndex < content.length) {
    const currChar = content.charAt(currIndex);
    if (
      isDollarSign(currChar) &&
      isOpeningCurlyBrace(content.charAt(currIndex + 1))
    ) {
      tokens.push(ENV_VAR_OPENING_BRACE);
      currIndex += 2;
      prevTokenIndex = currIndex;
    } else if (
      isTokenInImptTokens(currChar) &&
      hasEnvVarOpeningBrace(tokens) &&
      isTokenValidGivenPrevToken(currChar, tokens)
    ) {
      const textToken = content.substring(prevTokenIndex, currIndex);
      tokens.push(textToken);
      tokens.push(currChar);
      currIndex += 1;
      prevTokenIndex = currIndex;
    } else {
      currIndex += 1;
    }
  }
  return tokens.filter((token) => token.length !== 0);
};
