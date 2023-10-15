#!/usr/bin/env node

import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import parseKeyValuePairsIntoEnvVarDict, {
  mergeEnvVarDicts,
} from "./env-var-parser/main";
import { EnvVarDict } from "./env-var-parser/types/env-var-data.type";
import parseInputFileIntoKeyValuePairs from "./input-parser/main";
import { generateMdFromJson } from "./md-generator/md-generator";
import { writeFile, isFileExist, readFile } from "./utils/file/file-utils";
import { isObjsEqual } from "./utils/misc/helper-utils";

const writeJsonFile = (jsonFileName: string, envVarDict: EnvVarDict): void => {
  console.log(JSON.stringify(envVarDict, undefined, 2));

  writeFile(jsonFileName, JSON.stringify(envVarDict, undefined, 2));

  console.log("Json file has been created/updated");
};

const writeMdFile = (mdFileName: string, envVarDict: EnvVarDict): void => {
  const doc = generateMdFromJson(envVarDict);

  writeFile(mdFileName, doc);

  console.log("Md file has been created");
};

const main = () => {
  const fileArgs = parseArgs();

  let variablesDict: any = {};

  if (fileArgs.command === Command.PARSE) {
    const inputFileName = fileArgs.configFile;
    const jsonFileName = fileArgs.jsonFile;
    const append = fileArgs.append;

    const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

    variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

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

        writeJsonFile(jsonFileName, variablesDict);
      }
    } else {
      console.log(
        `Json file ${jsonFileName} does not exist, will be creating it...`
      );
      writeJsonFile(jsonFileName, variablesDict);
    }
  } else if (fileArgs.command === Command.GEN) {
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    variablesDict = JSON.parse(readFile(jsonFileName));

    console.log(JSON.stringify(variablesDict, undefined, 2));

    writeMdFile(mdFileName, variablesDict);
  } else {
    const inputFileName = fileArgs.configFile;
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;
    const append = fileArgs.append;

    const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

    variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

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

        writeJsonFile(jsonFileName, variablesDict);
      }
    } else {
      console.log(
        `Json file ${jsonFileName} does not exist, will be creating it...`
      );
      writeJsonFile(jsonFileName, variablesDict);
    }

    writeMdFile(mdFileName, variablesDict);
  }
};

main();
