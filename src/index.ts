#!/usr/bin/env node

import fs from "fs";

import getModeInputFileOutputJsonOutputMd from "./utils/arg/arg-parser";
import readFile from "./utils/file/file-util";
import {
  convertEnvVarInfoDictToArr,
  getEnvVarInfoDict,
} from "./utils/env-var/env-var-parser";
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
try {
  fs.writeFileSync(
    jsonOutputFileName,
    JSON.stringify(variablesDict, undefined, 2)
  );
} catch (err) {
  console.error(err);
  process.exit(1);
}
// }

const doc = generateMdFromJson(variablesArr);

try {
  fs.writeFileSync(mdOutputFileName, doc);
} catch (err) {
  console.error(err);
  process.exit(1);
}
