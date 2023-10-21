"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdatedEnvVarData = exports.isWordFileVariable = exports.findInstanceIndex = exports.getEnvVarEndIndex = exports.getEnvVarStartIndex = void 0;
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
const findInstanceIndex = (arr, key) => {
    return arr.findIndex((ins) => ins.key === key);
};
exports.findInstanceIndex = findInstanceIndex;
const isWordFileVariable = (word) => {
    return word.includes(tokens_1.DOT_SEPARATOR);
};
exports.isWordFileVariable = isWordFileVariable;
const getUpdatedEnvVarData = (variables, config, envVar, valueType, defaultValue) => {
    const envVarInstance = { key: config, default: defaultValue };
    if (envVar in variables) {
        return Object.assign(Object.assign({}, variables[envVar]), { type: valueType, default: defaultValue, instances: variables[envVar].instances.concat(envVarInstance) });
    }
    else {
        return {
            envVar,
            description: "",
            type: valueType,
            default: defaultValue,
            instances: [envVarInstance],
        };
    }
};
exports.getUpdatedEnvVarData = getUpdatedEnvVarData;
