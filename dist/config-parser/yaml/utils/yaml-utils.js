"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDocumentIntoKeyValuePairs = exports.convertYamlObjIntoKeyValuePairs = exports.convertPairIntoYamlObj = exports.isDocumentValid = void 0;
const yaml_1 = require("yaml");
const isDocumentValid = (document) => {
    if (document.errors.length > 0) {
        throw document.errors[0];
    }
    else {
        return true;
    }
};
exports.isDocumentValid = isDocumentValid;
const convertPairIntoYamlObj = (pair) => {
    return (0, yaml_1.parse)(JSON.stringify(pair));
};
exports.convertPairIntoYamlObj = convertPairIntoYamlObj;
const isJsonObject = (value) => {
    return typeof value === "object" && !Array.isArray(value) && value !== null;
};
const isNull = (value) => {
    return value === null;
};
/**
 * Recurse Yaml object to parse into .properties format.
 * @param {any} value - Current value
 * @param {string} keyPath - Path of current value
 */
const recurseYaml = (value, keyPath = "") => {
    if (isJsonObject(value)) {
        const keys = Object.keys(value);
        const keyValuePairs = keys.flatMap((key) => recurseYaml(value[key], keyPath ? keyPath + "." + key : key));
        return keyValuePairs;
    }
    else {
        return [{ key: keyPath, value: isNull(value) ? "" : value }];
    }
};
const convertYamlObjIntoKeyValuePairs = (obj) => {
    return recurseYaml(obj);
};
exports.convertYamlObjIntoKeyValuePairs = convertYamlObjIntoKeyValuePairs;
const convertDocumentIntoKeyValuePairs = (document) => {
    const documentTopLevelKeyObjs = document.contents.items;
    const keyValuePairs = documentTopLevelKeyObjs
        .map(exports.convertPairIntoYamlObj)
        .flatMap(exports.convertYamlObjIntoKeyValuePairs);
    return keyValuePairs;
};
exports.convertDocumentIntoKeyValuePairs = convertDocumentIntoKeyValuePairs;
