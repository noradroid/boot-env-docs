"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonEnvVarConfigError = void 0;
class NonEnvVarConfigError extends Error {
    constructor(configName) {
        super();
        this.name = "NonEnvVarConfigError";
        this.code = "NON_ENV_VAR_CONFIG";
        this.message = `Config ${configName} is not an environment variable`;
    }
}
exports.NonEnvVarConfigError = NonEnvVarConfigError;
