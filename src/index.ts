#!/usr/bin/env node

import getModeInputFileOutputJsonOutputMd from "./utils/arg/arg-parser";
import { readFile, writeFile } from "./utils/file/file-utils";
import { generateMdFromJson } from "./md-generator/md-generator";
import { Mode } from "./utils/arg/mode.enum";
import parseInputFileIntoKeyValuePairs from "./input-parser/main";
import parseKeyValuePairsIntoEnvVarDict, {
  mergeEnvVarDicts,
} from "./env-var-parser/main";

const [mode, inputFileName, jsonOutputFileName, mdOutputFileName] =
  getModeInputFileOutputJsonOutputMd();

let variablesDict: any = {};

if (mode === Mode.PARSE_JSON) {
  variablesDict = JSON.parse(readFile(inputFileName));
} else {
  const keyValuePairs = parseInputFileIntoKeyValuePairs(inputFileName);

  variablesDict = parseKeyValuePairsIntoEnvVarDict(keyValuePairs);

  const ogDict = JSON.parse(readFile(jsonOutputFileName));
  variablesDict = mergeEnvVarDicts(ogDict, variablesDict);
}

console.log(JSON.stringify(variablesDict, undefined, 2));

// if (mode === Mode.PARSE_PROPERTY) {
writeFile(jsonOutputFileName, JSON.stringify(variablesDict, undefined, 2));
// }

const doc = generateMdFromJson(variablesDict);

writeFile(mdOutputFileName, doc);
