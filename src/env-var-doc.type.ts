export type EnvVarDoc = {
  envVar: string;
  type?: string;
  instances: EnvVarInstance[];
};

export type EnvVarInstance = {
  key: string;
  default?: string;
};
