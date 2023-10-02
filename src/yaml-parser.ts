import { parse, parseAllDocuments } from "yaml";

import { Property } from "./property.type";

const getYamlObj = (file: string) => {
  try {
    // return parse(file, { strict: true });
    const documents = parseAllDocuments(file, { strict: true });

    let topLevelConfigArr: { key: string; value: any }[] = [];
    let topLevelConfigDict: any = {};
    documents.forEach((doc) => {
      topLevelConfigArr.push(...(doc.contents as any).items);
    });
    topLevelConfigArr.forEach((item) => {
      if (item.key in topLevelConfigDict) {
        topLevelConfigDict[item.key] = item.value;
      } else {
        topLevelConfigDict[item.key] = item.value;
      }
    });
    return topLevelConfigDict;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const isJsonObject = (value: any): boolean => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};

const isNull = (value: any): boolean => {
  return value === null;
};

/**
 * Recurse Yaml object to parse into .properties format.
 * @param {Property[]} properties - Array of properties
 * @param {string} keyPath - Path of current value
 * @param {any} value - Current value
 */
const recurseYaml = (
  properties: Property[],
  keyPath = "",
  value: any
): void => {
  if (isJsonObject(value)) {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      // console.log(key);
      // console.log(value[key]);
      recurseYaml(properties, keyPath ? keyPath + "." + key : key, value[key]);
    });
  } else {
    if (isNull(value)) {
      // properties.push({ [keyPath]: "" });
      properties.push({ key: keyPath, value: "" });
    } else {
      // properties.push({ [keyPath]: value });
      properties.push({ key: keyPath, value });
    }
  }
};

const main = (file: string): Property[] => {
  const parsedYamlObj = getYamlObj(file);

  const properties: Property[] = [];

  recurseYaml(properties, "", parsedYamlObj);

  console.log(properties);

  return properties;
};

export default main;
