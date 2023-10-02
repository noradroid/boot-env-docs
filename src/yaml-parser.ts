import { parse, parseAllDocuments, stringify } from "yaml";

import { Property } from "./property.type";

type KeyValue = { key: string; value: any };

/**
 * Parse single-document YAML files using YAML parse().
 * @param file
 * @return YAML parse() method return object
 */
const getYamlObj = (file: string) => {
  try {
    return parse(file, { strict: true });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

/**
 * Parse multi-document YAML files using YAML parseAllDocuments().
 * @param file
 * @returns Array of objects like getYamlObj's return type
 */
const getYamlObjsArr = (file: string) => {
  try {
    const documents = parseAllDocuments(file, { strict: true });

    const yamlObjsArr: any = [];

    // Convert all top-level properties into json objects
    documents.forEach((doc) => {
      const keyValueObjs: any = (doc.contents as any).items;
      yamlObjsArr.push(
        ...keyValueObjs.map((keyValue: any) => {
          const groupStr = stringify(keyValue);
          const yamlObj = parse(groupStr, { strict: true });
          return yamlObj;
        })
      );
    });

    return yamlObjsArr;
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
  // const parsedYamlObj = getYamlObj(file);
  const parsedYamlObjs = getYamlObjsArr(file);

  const properties: Property[] = [];

  parsedYamlObjs.forEach((obj: any) => {
    recurseYaml(properties, "", obj);
  });

  console.log(properties);

  return properties;
};

export default main;
