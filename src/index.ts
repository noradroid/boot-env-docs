#!/usr/bin/env node

import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import { parseKeyValuePairsIntoEnvVarDict } from "./env-var-parser/main";
import { parseIntoKeyValuePairs } from "./config-parser/main";
import { generateMdFromJson } from "./md-generator/md-generator";
import { writeFile, isFileExist, readFile } from "./utils/file/file-utils";
import { EnvVarStore } from "./shared/models/env-var-store/env-vars-info.type";
import { mergeEnvVarDicts } from "./env-var-storage/main";

const writeJsonFile = (
  jsonFileName: string,
  envVarStore: EnvVarStore
): void => {
  console.log(JSON.stringify(envVarStore.envVars, undefined, 2));

  writeFile(jsonFileName, JSON.stringify(envVarStore, undefined, 2));

  console.log("Json file has been created/updated");
};

const writeMdFile = (mdFileName: string, envVarStore: EnvVarStore): void => {
  const doc = generateMdFromJson(envVarStore);

  writeFile(mdFileName, doc);

  console.log("Md file has been created");
};

const main = () => {
  const fileArgs = parseArgs();

  if (fileArgs.command === Command.PARSE) {
    const configFileName = fileArgs.configFile;
    const configFileType = fileArgs.configFileType;
    const jsonFileName = fileArgs.jsonFile;
    const append = fileArgs.append;
    const version = fileArgs.version;

    const configFileContent: string = readFile(configFileName);
    const keyValuePairs = parseIntoKeyValuePairs(
      configFileContent,
      configFileType
    );

    let variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    if (append && isFileExist(jsonFileName)) {
      const ogEnvVarStore: EnvVarStore = JSON.parse(readFile(jsonFileName));
      const ogDict = ogEnvVarStore.envVars;

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);
    }

    const envVarStore: EnvVarStore = {
      version,
      envVars: variablesDict,
    };

    writeJsonFile(jsonFileName, envVarStore);
  } else if (fileArgs.command === Command.GEN) {
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    const envVarStore: EnvVarStore = JSON.parse(readFile(jsonFileName));

    console.log(JSON.stringify(envVarStore.envVars, undefined, 2));

    writeMdFile(mdFileName, envVarStore);
  } else {
    const configFileName = fileArgs.configFile;
    const configFileType = fileArgs.configFileType;
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;
    const append = fileArgs.append;
    const version = fileArgs.version;

    const configFileContent: string = readFile(configFileName);
    const keyValuePairs = parseIntoKeyValuePairs(
      configFileContent,
      configFileType
    );

    let variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    if (append && isFileExist(jsonFileName)) {
      const ogEnvVarStore: EnvVarStore = JSON.parse(readFile(jsonFileName));
      const ogDict = ogEnvVarStore.envVars;

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);
    }

    const envVarStore: EnvVarStore = {
      version,
      envVars: variablesDict,
    };

    writeJsonFile(jsonFileName, envVarStore);

    writeMdFile(mdFileName, envVarStore);
  }
};

main();
