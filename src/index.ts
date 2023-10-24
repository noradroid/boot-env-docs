#!/usr/bin/env node

import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import { parseKeyValuePairsIntoEnvVarDict } from "./env-var-parser/main";
import { parseInputFileIntoKeyValuePairs } from "./config-parser/main";
import { generateMdFromJson } from "./md-generator/md-generator";
import { writeFile, isFileExist, readFile } from "./utils/file/file-utils";
import { EnvVarsInfo } from "./types/env-vars-info.type";
import { mergeEnvVarDicts } from "./env-var-storage/main";

const writeJsonFile = (
  jsonFileName: string,
  envVarsInfo: EnvVarsInfo
): void => {
  console.log(JSON.stringify(envVarsInfo.envVars, undefined, 2));

  writeFile(jsonFileName, JSON.stringify(envVarsInfo, undefined, 2));

  console.log("Json file has been created/updated");
};

const writeMdFile = (mdFileName: string, envVarsInfo: EnvVarsInfo): void => {
  const doc = generateMdFromJson(envVarsInfo);

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

    const keyValuePairs = parseInputFileIntoKeyValuePairs(
      configFileName,
      configFileType
    );

    let variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    if (append && isFileExist(jsonFileName)) {
      const ogEnvVarsInfo: EnvVarsInfo = JSON.parse(readFile(jsonFileName));
      const ogDict = ogEnvVarsInfo.envVars;

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);
    }

    const envVarsInfo: EnvVarsInfo = {
      version,
      envVars: variablesDict,
    };

    writeJsonFile(jsonFileName, envVarsInfo);
  } else if (fileArgs.command === Command.GEN) {
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    const envVarsInfo: EnvVarsInfo = JSON.parse(readFile(jsonFileName));

    console.log(JSON.stringify(envVarsInfo.envVars, undefined, 2));

    writeMdFile(mdFileName, envVarsInfo);
  } else {
    const configFileName = fileArgs.configFile;
    const configFileType = fileArgs.configFileType;
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;
    const append = fileArgs.append;
    const version = fileArgs.version;

    const keyValuePairs = parseInputFileIntoKeyValuePairs(
      configFileName,
      configFileType
    );

    let variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    if (append && isFileExist(jsonFileName)) {
      const ogEnvVarsInfo: EnvVarsInfo = JSON.parse(readFile(jsonFileName));
      const ogDict = ogEnvVarsInfo.envVars;

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);
    }

    const envVarsInfo: EnvVarsInfo = {
      version,
      envVars: variablesDict,
    };

    writeJsonFile(jsonFileName, envVarsInfo);

    writeMdFile(mdFileName, envVarsInfo);
  }
};

main();
