#!/usr/bin/env node

import { readFile, writeFile } from "./utils/file/file-utils";
import { generateMdFromJson } from "./md-generator/md-generator";
import parseInputFileIntoKeyValuePairs from "./input-parser/main";
import parseKeyValuePairsIntoEnvVarDict, {
  mergeEnvVarDicts,
} from "./env-var-parser/main";
import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import { EnvVarDict } from "./env-var-parser/types/env-var-data.type";

const skipDictMergeIfJsonFileNotExist = (
  jsonFileName: string,
  dictToMerge: EnvVarDict
): EnvVarDict => {
  // Skip if json file does not exist
  try {
    const ogDict = JSON.parse(readFile(jsonFileName));

    return mergeEnvVarDicts(ogDict, dictToMerge);
  } catch (err) {
    console.log(
      `Json file ${jsonFileName} does not exist, will be creating it...`
    );
    return dictToMerge;
  }
};

const main = () => {
  const fileArgs = parseArgs();

  let variablesDict: any = {};

  if (fileArgs.command === Command.PARSE) {
    const inputFileName = fileArgs.configFile;
    const jsonFileName = fileArgs.jsonFile;

    const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

    variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    variablesDict = skipDictMergeIfJsonFileNotExist(
      jsonFileName,
      variablesDict
    );

    console.log(JSON.stringify(variablesDict, undefined, 2));

    writeFile(jsonFileName, JSON.stringify(variablesDict, undefined, 2));
  } else if (fileArgs.command === Command.GEN) {
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    variablesDict = JSON.parse(readFile(jsonFileName));

    console.log(JSON.stringify(variablesDict, undefined, 2));

    const doc = generateMdFromJson(variablesDict);

    writeFile(mdFileName, doc);
  } else {
    const inputFileName = fileArgs.configFile;
    const jsonFileName = fileArgs.jsonFile;
    const mdFileName = fileArgs.mdFile;

    const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

    variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

    variablesDict = skipDictMergeIfJsonFileNotExist(
      jsonFileName,
      variablesDict
    );

    console.log(JSON.stringify(variablesDict, undefined, 2));

    writeFile(jsonFileName, JSON.stringify(variablesDict, undefined, 2));

    const doc = generateMdFromJson(variablesDict);

    writeFile(mdFileName, doc);
  }
};

main();
