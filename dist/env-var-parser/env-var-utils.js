"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isWordFileVariable = exports.getMatchingClosingBraceIndex = exports.getEnvVarEndIndex = exports.getEnvVarStartIndex = void 0;
const tokens_1 = require("./constants/tokens");
/**
 * Get env var opening brace index from start index.
 * @param startIndex - Default zero
 */
const getEnvVarStartIndex = (tokens, startIndex = 0) => {
    return tokens.indexOf(tokens_1.ENV_VAR_OPENING_BRACE, startIndex);
};
exports.getEnvVarStartIndex = getEnvVarStartIndex;
/**
 * Get env var closing brace index from start index.
 * @param startIndex - Env var opening index
 */
const getEnvVarEndIndex = (tokens, startIndex) => {
    const nextStartIndex = (0, exports.getEnvVarStartIndex)(tokens, startIndex + 1);
    return nextStartIndex === -1 ? tokens.length - 1 : nextStartIndex - 1;
};
exports.getEnvVarEndIndex = getEnvVarEndIndex;
const getMatchingClosingBraceIndex = (tokens, startIndex, endIndex) => {
    let index = startIndex + 1;
    let openedBracketsCount = 1;
    while (index < endIndex) {
        if (tokens[index] === tokens_1.OPENING_CURLY_BRACE) {
            openedBracketsCount += 1;
        }
        else if (tokens[index] === tokens_1.CLOSING_CURLY_BRACE) {
            openedBracketsCount -= 1;
        }
        if (openedBracketsCount === 0) {
            return index;
        }
        index += 1;
    }
    return endIndex;
};
exports.getMatchingClosingBraceIndex = getMatchingClosingBraceIndex;
const isWordFileVariable = (word) => {
    return word.includes(tokens_1.DOT_SEPARATOR);
};
exports.isWordFileVariable = isWordFileVariable;
