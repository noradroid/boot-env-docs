import fs from "fs";

import getFileName from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import {
  convertEnvVarInfoDictToArr,
  getEnvVarInfoDict,
} from "./src/env-var-parser";
import { generateMdFromJson } from "./src/md-generator";

const fileName = getFileName();

const file = readFile(fileName);

const properties = parseYamlProperties(file);

const variablesDict = getEnvVarInfoDict(properties);

const variablesArr = convertEnvVarInfoDictToArr(variablesDict);

console.log(JSON.stringify(variablesArr, undefined, 2));

const doc = generateMdFromJson(variablesArr);

try {
  fs.writeFileSync("output/doc.md", doc);
} catch (err) {
  console.error(err);
  process.exit(1);
}
