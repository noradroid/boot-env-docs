import fs from "fs";
import { Markdown, bold } from "@scdev/declarative-markdown";

import getFileName from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import {
  convertEnvVarInfoDictToArr,
  getEnvVarInfoDict,
} from "./src/env-var-parser";

const fileName = getFileName();

const file = readFile(fileName);

const properties = parseYamlProperties(file);

const variablesDict = getEnvVarInfoDict(properties);

const variablesArr = convertEnvVarInfoDictToArr(variablesDict);

console.log(JSON.stringify(variablesArr, undefined, 2));

const md = new Markdown("Environment Variables Documentation");

variablesArr.forEach((info) => {
  md.header(info.envVar, 3).paragraph("Description");

  md.paragraph(`${bold("Type:")} unknown`);

  md.paragraph(`${bold("Used in:")}`);
  md.table(
    ["Property", "Default value"],
    [info.instances.map((instance) => [instance.key, instance.default ?? "-"])]
  );
});

const doc = md.render();

try {
  fs.writeFileSync("output/doc.md", doc);
} catch (err) {
  console.error(err);
  process.exit(1);
}
