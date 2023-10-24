#!/usr/bin/env node

import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import parseKeyValuePairsIntoEnvVarDict, {
  mergeEnvVarDicts,
} from "./env-var-parser/main";
import { EnvVarsDict } from "./env-var-parser/types/env-var-data.type";
import parseInputFileIntoKeyValuePairs from "./config-parser/main";
import { generateMdFromJson } from "./md-generator/md-generator";
import { writeFile, isFileExist, readFile } from "./utils/file/file-utils";
import { isObjsEqual } from "./utils/misc/helper-utils";
import { Version } from "./types/version.type";
import { EnvVarsInfo } from "./types/env-vars-info.type";

const writeJsonFile = (
  jsonFileName: string,
  envVarDict: EnvVarsDict,
  version: Version | undefined
): void => {
  console.log(JSON.stringify(envVarDict, undefined, 2));

  const jsonFileContent: EnvVarsInfo = {
    version,
    envVars: envVarDict,
  };

  writeFile(jsonFileName, JSON.stringify(jsonFileContent, undefined, 2));

  console.log("Json file has been created/updated");
};

const writeMdFile = (mdFileName: string, envVarDict: EnvVarsDict): void => {
  const doc = generateMdFromJson(envVarDict);

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
      const ogDict = JSON.parse(readFile(jsonFileName));

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);

      if (isObjsEqual(ogDict, variablesDict)) {
        console.log(
          "Environment variables have not changed - json file will not be updated."
        );
      } else {
        console.log(
          "Environment variables have changed - proceeding to update json file."
        );

        writeJsonFile(jsonFileName, variablesDict, version);
      }
    } else {
      console.log(
        `Json file ${jsonFileName} does not exist, will be creating it...`
      );
      writeJsonFile(jsonFileName, variablesDict, version);
    }
  } else if (fileArgs.command === Command.GEN) {
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    const jsonFileContent: EnvVarsInfo = JSON.parse(readFile(jsonFileName));

    const variablesDict = jsonFileContent.envVars;

    console.log(JSON.stringify(variablesDict, undefined, 2));

    writeMdFile(mdFileName, variablesDict);
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
      const ogDict = JSON.parse(readFile(jsonFileName));

      variablesDict = mergeEnvVarDicts(ogDict, variablesDict);

      if (isObjsEqual(ogDict, variablesDict)) {
        console.log(
          "Environment variables have not changed - json file will not be updated."
        );
      } else {
        console.log(
          "Environment variables have changed - proceeding to update json file."
        );

        writeJsonFile(jsonFileName, variablesDict, version);
      }
    } else {
      console.log(
        `Json file ${jsonFileName} does not exist, will be creating it...`
      );
      writeJsonFile(jsonFileName, variablesDict, version);
    }

    writeMdFile(mdFileName, variablesDict);
  }
};

main();
