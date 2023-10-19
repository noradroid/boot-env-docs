export class NonEnvVarConfigError extends Error {
  name = "NonEnvVarConfigError";
  code = "NON_ENV_VAR_CONFIG";
  message: string;

  constructor(configName: string) {
    super();
    this.message = `Config ${configName} is not an environment variable`;
  }
}
