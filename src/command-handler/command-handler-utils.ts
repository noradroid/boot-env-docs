import { parseIntoKeyValuePairs } from "../config-parser/main";
import { parseKeyValuePairsIntoEnvVarDict } from "../env-var-parser/main";
import {
  addVersionToEnvVarsDict,
  updateEnvVarsDict,
} from "../env-var-storage/main";
import { generateMdFromJson } from "../md-generator/md-generator";
import { EnvVarStore } from "../shared/models/env-var-store/env-vars-info.type";
import { EnvVarsDict } from "../shared/models/env-var/env-var-data.type";
import { Version } from "../shared/models/version.type";
import { isFileExist, readFile, writeFile } from "../utils/file/file-utils";
import { ConfigFileType } from "../utils/file/types/file.type";

export const writeJsonFile = (
  jsonFileName: string,
  envVarStore: EnvVarStore
): void => {
  console.log(JSON.stringify(envVarStore.envVars, undefined, 2));

  writeFile(jsonFileName, JSON.stringify(envVarStore, undefined, 2));

  console.log("Json file has been created/updated");
};

export const writeMdFile = (
  mdFileName: string,
  envVarStore: EnvVarStore
): void => {
  const doc = generateMdFromJson(envVarStore);

  writeFile(mdFileName, doc);

  console.log("Md file has been created");
};

export const convertConfigToEnvVarStore = (
  configFileName: string,
  configFileType: ConfigFileType,
  jsonFileName: string,
  append: boolean,
  version: Version | undefined
): EnvVarStore => {
  const newKeyValues = parseIntoKeyValuePairs(
    readFile(configFileName),
    configFileType
  );

  const newEnvVars: EnvVarsDict = addVersionToEnvVarsDict(
    parseKeyValuePairsIntoEnvVarDict(newKeyValues),
    version
  );

  let envVars: EnvVarsDict;

  if (append && isFileExist(jsonFileName)) {
    const ogEnvVarStore: EnvVarStore = JSON.parse(readFile(jsonFileName));
    const ogEnvVars = ogEnvVarStore.envVars;

    envVars = updateEnvVarsDict(ogEnvVars, newEnvVars);
  } else {
    envVars = newEnvVars;
  }

  return { version, envVars };
};
