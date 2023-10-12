import { Document, Pair, parse } from "yaml";
import { KeyValuePairs } from "../../shared/types/key-value.type";

export const isDocumentValid = (document: Document): boolean => {
  if (document.errors.length > 0) {
    throw document.errors[0];
  } else {
    return true;
  }
};

export const convertPairIntoYamlObj = (pair: Pair): any => {
  return parse(JSON.stringify(pair));
};

const isJsonObject = (value: any): boolean => {
  return typeof value === "object" && !Array.isArray(value) && value !== null;
};

const isNull = (value: any): boolean => {
  return value === null;
};

/**
 * Recurse Yaml object to parse into .properties format.
 * @param {any} value - Current value
 * @param {string} keyPath - Path of current value
 */
const recurseYaml = (value: any, keyPath = ""): KeyValuePairs => {
  if (isJsonObject(value)) {
    const keys = Object.keys(value);
    const keyValuePairs = keys.flatMap((key) =>
      recurseYaml(value[key], keyPath ? keyPath + "." + key : key)
    );
    return keyValuePairs;
  } else {
    return [{ key: keyPath, value: isNull(value) ? "" : value }];
  }
};

export const convertYamlObjIntoKeyValuePairs = (obj: any): KeyValuePairs => {
  return recurseYaml(obj);
};

export const convertDocumentIntoKeyValuePairs = (
  document: Document
): KeyValuePairs => {
  const documentTopLevelKeyObjs: Pair[] = (document.contents as any).items;
  const keyValuePairs = documentTopLevelKeyObjs
    .map(convertPairIntoYamlObj)
    .flatMap(convertYamlObjIntoKeyValuePairs);
  return keyValuePairs;
};
