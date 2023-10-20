"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenise = void 0;
const tokens_1 = require("./constants/tokens");
const IMPT_TOKENS = [tokens_1.COLON_SEPARATOR, tokens_1.OPENING_CURLY_BRACE, tokens_1.CLOSING_CURLY_BRACE];
const isTokenInImptTokens = (token) => {
    return IMPT_TOKENS.some((t) => token === t);
};
const isDollarSign = (char) => char === tokens_1.DOLLAR_SIGN;
const isOpeningCurlyBrace = (char) => char === tokens_1.OPENING_CURLY_BRACE;
const hasEnvVarOpeningBrace = (tokens) => tokens.includes(tokens_1.ENV_VAR_OPENING_BRACE);
const VALID_PREV_TOKEN_FOR_COLON_SEPARATOR = [tokens_1.ENV_VAR_OPENING_BRACE];
const VALID_PREV_TOKEN_FOR_ENV_VAR_CLOSING_BRACE = [
    tokens_1.ENV_VAR_OPENING_BRACE,
    tokens_1.COLON_SEPARATOR,
    tokens_1.OPENING_CURLY_BRACE,
    tokens_1.CLOSING_CURLY_BRACE,
];
const VALID_PREV_TOKEN_FOR_OPENING_CURLY_BRACE = [
    tokens_1.OPENING_CURLY_BRACE,
    tokens_1.CLOSING_CURLY_BRACE,
    tokens_1.COLON_SEPARATOR,
];
const isTokenValidGivenPrevToken = (currToken, prevTokens) => {
    let validPrevTokens = [];
    if (currToken === tokens_1.COLON_SEPARATOR) {
        validPrevTokens = VALID_PREV_TOKEN_FOR_COLON_SEPARATOR;
    }
    else if (currToken === tokens_1.ENV_VAR_CLOSING_BRACE) {
        validPrevTokens = VALID_PREV_TOKEN_FOR_ENV_VAR_CLOSING_BRACE;
    }
    else if (currToken === tokens_1.OPENING_CURLY_BRACE) {
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
const tokenise = (content) => {
    const tokens = [];
    let currIndex = 0;
    let prevTokenIndex = 0;
    while (currIndex < content.length) {
        const currChar = content.charAt(currIndex);
        if (isDollarSign(currChar) &&
            isOpeningCurlyBrace(content.charAt(currIndex + 1))) {
            tokens.push(tokens_1.ENV_VAR_OPENING_BRACE);
            currIndex += 2;
            prevTokenIndex = currIndex;
        }
        else if (isTokenInImptTokens(currChar) &&
            hasEnvVarOpeningBrace(tokens) &&
            isTokenValidGivenPrevToken(currChar, tokens)) {
            const textToken = content.substring(prevTokenIndex, currIndex);
            tokens.push(textToken);
            tokens.push(currChar);
            currIndex += 1;
            prevTokenIndex = currIndex;
        }
        else {
            currIndex += 1;
        }
    }
    return tokens.filter((token) => token.length !== 0);
};
exports.tokenise = tokenise;
