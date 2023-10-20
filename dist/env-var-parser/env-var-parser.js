"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTokensIntoEnvVarDefaults = void 0;
const tokens_1 = require("./constants/tokens");
const env_var_utils_1 = require("./env-var-utils");
const non_env_var_config_error_1 = require("./errors/non-env-var-config.error");
/**
 * Parse tokens between startIndex and endIndex into env var and default value.
 * @param startIndex - index of `${`
 * @param endIndex - index of `}`
 * @returns
 */
const parseTokensIntoEnvVarDefault = (tokens, startIndex, endIndex) => {
    const colonIndex = tokens.indexOf(tokens_1.COLON_SEPARATOR, startIndex);
    if (colonIndex === -1) {
        const configName = tokens[startIndex + 1];
        throw new non_env_var_config_error_1.NonEnvVarConfigError(configName);
    }
    const envVar = tokens[colonIndex - 1];
    const defaultStr = tokens.slice(colonIndex + 1, endIndex).join("");
    return { envVar, default: defaultStr };
};
const parseTokensIntoEnvVarDefaults = (tokens) => {
    const envVarDefaults = [];
    let startIndex = (0, env_var_utils_1.getEnvVarStartIndex)(tokens); // ${
    let endIndex = 0;
    while (startIndex < tokens.length) {
        endIndex = (0, env_var_utils_1.getEnvVarEndIndex)(tokens, startIndex); // }
        try {
            envVarDefaults.push(parseTokensIntoEnvVarDefault(tokens, startIndex, endIndex));
        }
        catch (err) {
            // EnvVarParseError
            if (err instanceof non_env_var_config_error_1.NonEnvVarConfigError) {
                console.log(`${err.name} - ${err.message}. Skipping...`);
                // EnvVarParseError - caused by MISSING_CLOSING_BRACE
                // = Env var is not closed by a closing brace
            }
            else {
                console.error(err);
            }
        }
        startIndex = endIndex + 1;
    }
    return envVarDefaults;
};
exports.parseTokensIntoEnvVarDefaults = parseTokensIntoEnvVarDefaults;
