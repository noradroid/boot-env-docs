import fs from "fs";

import getFileName from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import {
  convertEnvVarInfoDictToArr,
  getEnvVarInfoDict,
} from "./src/env-var-parser";
import { generateMdFromJson } from "./src/md-generator";

const OUTPUT_JSON = "output/records.json";

let variablesDict: any = {};

if (fs.existsSync(OUTPUT_JSON)) {
  variablesDict = JSON.parse(readFile(OUTPUT_JSON));
} else {
  const fileName = getFileName();
  const file = readFile(fileName);

  const properties = parseYamlProperties(file);

  variablesDict = getEnvVarInfoDict(properties);
}

const variablesArr = convertEnvVarInfoDictToArr(variablesDict);

console.log(JSON.stringify(variablesArr, undefined, 2));

try {
  fs.writeFileSync(
    "output/records.json",
    JSON.stringify(variablesDict, undefined, 2)
  );
} catch (err) {
  console.error(err);
  process.exit(1);
}

const doc = generateMdFromJson(variablesArr);

try {
  fs.writeFileSync("output/doc.md", doc);
} catch (err) {
  console.error(err);
  process.exit(1);
}
