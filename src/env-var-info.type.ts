export type EnvVarArr = EnvVarInfo[];

export type EnvVarDict = { [envVar: string]: EnvVarInfo };

export type EnvVarInfo = {
  envVar: string;
  type?: string;
  instances: EnvVarInstance[];
};

export type EnvVarInstance = {
  key: string;
  default?: string;
};
