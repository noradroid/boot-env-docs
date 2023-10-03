import fs from "fs";

import getModeInputFileOutputJsonOutputMd from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import {
  convertEnvVarInfoDictToArr,
  getEnvVarInfoDict,
} from "./src/env-var-parser";
import { generateMdFromJson } from "./src/md-generator";
import { Mode } from "./src/mode.enum";

const [mode, inputFileName, jsonOutputFileName, mdOutputFileName] =
  getModeInputFileOutputJsonOutputMd();

let variablesDict: any = {};

if (mode === Mode.PARSE_JSON) {
  variablesDict = JSON.parse(readFile(inputFileName));
} else {
  const file = readFile(inputFileName);

  const properties = parseYamlProperties(file);

  variablesDict = getEnvVarInfoDict(properties);
}

const variablesArr = convertEnvVarInfoDictToArr(variablesDict);

console.log(JSON.stringify(variablesArr, undefined, 2));

if (mode === Mode.PARSE_YAML) {
  try {
    fs.writeFileSync(
      jsonOutputFileName,
      JSON.stringify(variablesDict, undefined, 2)
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

const doc = generateMdFromJson(variablesArr);

try {
  fs.writeFileSync(mdOutputFileName, doc);
} catch (err) {
  console.error(err);
  process.exit(1);
}
