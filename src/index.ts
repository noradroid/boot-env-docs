#!/usr/bin/env node

import {
  getEnvVarInfoDict,
  convertEnvVarInfoDictToArr,
} from "./env-var-parser/env-var-parser";
import getModeInputFileOutputJsonOutputMd from "./utils/arg/arg-parser";
import { readFile, writeFile } from "./utils/file/file-utils";
import { generateMdFromJson } from "./utils/md/md-generator";
import { Mode } from "./utils/arg/mode.enum";
import parseInputFileIntoKeyValuePairs from "./input-parser/main";

const [mode, inputFileName, jsonOutputFileName, mdOutputFileName] =
  getModeInputFileOutputJsonOutputMd();

let variablesDict: any = {};

if (mode === Mode.PARSE_JSON) {
  variablesDict = JSON.parse(readFile(inputFileName));
} else {
  const file = readFile(inputFileName);

  const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

  variablesDict = getEnvVarInfoDict(keyValuePairs);
}

const variablesArr = convertEnvVarInfoDictToArr(variablesDict);

console.log(JSON.stringify(variablesArr, undefined, 2));

// if (mode === Mode.PARSE_PROPERTY) {
writeFile(jsonOutputFileName, JSON.stringify(variablesDict, undefined, 2));
// }

const doc = generateMdFromJson(variablesArr);

writeFile(mdOutputFileName, doc);
