"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeEnvVarDicts = void 0;
const error_utils_1 = require("../utils/error/error-utils");
const helper_utils_1 = require("../utils/misc/helper-utils");
const env_var_parser_1 = require("./env-var-parser");
const env_var_tokeniser_1 = require("./env-var-tokeniser");
const env_var_utils_1 = require("./env-var-utils");
const env_var_validator_1 = require("./env-var-validator");
const env_var_value_type_parser_1 = require("./env-var-value-type/env-var-value-type-parser");
const env_var_parse_error_1 = require("./errors/env-var-parse.error");
/**
 * Tokenise config value, validate then parse into EnvVarDefault object(s).
 * @param value - e.g. ${ENV_VAR:somevalue}
 */
const getEnvVarDefaults = (value) => {
    const valueTokens = (0, env_var_tokeniser_1.tokenise)(value);
    if (valueTokens.length === 0) {
        return [];
    }
    (0, env_var_validator_1.validateEnvVarSyntax)(valueTokens);
    const envVarDefaults = (0, env_var_parser_1.parseTokensIntoEnvVarDefaults)(valueTokens);
    return envVarDefaults;
};
const main = (keyValuePairs) => {
    const variables = {};
    // tokenize each value
    keyValuePairs.forEach((keyValue) => {
        if ((0, helper_utils_1.isString)(keyValue.value)) {
            try {
                const envVarDefaults = getEnvVarDefaults(keyValue.value);
                envVarDefaults.forEach((envVarDefault) => {
                    const valueType = (0, env_var_value_type_parser_1.getValueType)(envVarDefault.default);
                    const defaultValue = (0, env_var_value_type_parser_1.convertValueIntoType)(envVarDefault.default, valueType);
                    variables[envVarDefault.envVar] = (0, env_var_utils_1.getUpdatedEnvVarData)(variables, keyValue.key, envVarDefault.envVar, valueType, defaultValue);
                });
            }
            catch (err) {
                if (err instanceof env_var_parse_error_1.EnvVarParseError) {
                    console.error((0, error_utils_1.formatParseError)(err) + ` for config ${keyValue.key}`);
                    // EnvVarParseError - caused by MISSING_CLOSING_BRACE
                    // Env var is not closed by a closing brace
                }
                else {
                    console.error(err);
                }
                process.exit(1);
            }
        }
    });
    return variables;
};
exports.default = main;
const mergeInstances = (oldInstances, newInstances) => {
    const mergedInstances = (0, helper_utils_1.clone)(oldInstances);
    newInstances.forEach((newInstance) => {
        const oldInstanceIndex = (0, env_var_utils_1.findInstanceIndex)(mergedInstances, newInstance.key);
        if (oldInstanceIndex !== -1) {
            mergedInstances[oldInstanceIndex] = newInstance;
        }
        else {
            mergedInstances.push(newInstance);
        }
    });
    return mergedInstances;
};
const mergeEnvVarDicts = (oldDict, newDict) => {
    const merged = (0, helper_utils_1.clone)(oldDict);
    Object.entries(newDict).forEach(([newEnvVar, newData]) => {
        if (newEnvVar in merged) {
            const mergedInstances = mergeInstances(merged[newEnvVar].instances, newData.instances);
            merged[newEnvVar] = Object.assign(Object.assign({}, merged[newEnvVar]), { default: newData.default, instances: mergedInstances });
        }
        else {
            merged[newEnvVar] = newData;
        }
    });
    return merged;
};
exports.mergeEnvVarDicts = mergeEnvVarDicts;
