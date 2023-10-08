import {
  CLOSING_CURLY_BRACE,
  COLON_SEPARATOR,
  DOLLAR_SIGN,
  ENV_VAR_OPENING_BRACE,
  OPENING_CURLY_BRACE,
} from "./constants/tokens";

const IMPT_TOKENS = [COLON_SEPARATOR, OPENING_CURLY_BRACE, CLOSING_CURLY_BRACE];

const isTokenInImptTokens = (token: string): boolean => {
  return IMPT_TOKENS.some((t) => token === t);
};

export const tokenise = (content: string): string[] => {
  const tokens: string[] = [];
  let currIndex: number = 0;
  let prevTokenIndex: number = 0;
  while (currIndex < content.length) {
    const currChar = content.charAt(currIndex);
    if (
      currChar === DOLLAR_SIGN &&
      content.charAt(currIndex + 1) === OPENING_CURLY_BRACE
    ) {
      tokens.push(ENV_VAR_OPENING_BRACE);
      currIndex += 2;
      prevTokenIndex = currIndex;
    } else if (isTokenInImptTokens(currChar)) {
      const textToken = content.substring(prevTokenIndex, currIndex);
      tokens.push(textToken);
      tokens.push(currChar);
      currIndex += 1;
      prevTokenIndex = currIndex;
    } else {
      currIndex += 1;
    }
  }
  return tokens;
};
