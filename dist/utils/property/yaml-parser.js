"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml_1 = require("yaml");
/**
 * Parse single-document YAML files using YAML parse().
 * @param file
 * @return YAML parse() method return object
 */
const getYamlObj = (file) => {
    try {
        return (0, yaml_1.parse)(file, { strict: true });
    }
    catch (error) {
        // YAMLParseError
        console.error(error);
        return null;
    }
};
/**
 * Parse multi-document YAML files using YAML parseAllDocuments().
 * @param file
 * @returns Array of objects like getYamlObj's return type
 */
const getYamlObjsArr = (file) => {
    try {
        const documents = (0, yaml_1.parseAllDocuments)(file, { strict: true });
        const yamlObjsArr = [];
        // Convert all top-level properties into json objects
        documents.forEach((doc) => {
            const keyValueObjs = doc.contents.items;
            yamlObjsArr.push(...keyValueObjs.map((keyValue) => {
                const groupStr = (0, yaml_1.stringify)(keyValue);
                const yamlObj = (0, yaml_1.parse)(groupStr, { strict: true });
                return yamlObj;
            }));
        });
        return yamlObjsArr;
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};
const isJsonObject = (value) => {
    return typeof value === "object" && !Array.isArray(value) && value !== null;
};
const isNull = (value) => {
    return value === null;
};
/**
 * Recurse Yaml object to parse into .properties format.
 * @param {Property[]} properties - Array of properties
 * @param {string} keyPath - Path of current value
 * @param {any} value - Current value
 */
const recurseYaml = (properties, keyPath = "", value) => {
    if (isJsonObject(value)) {
        const keys = Object.keys(value);
        keys.forEach((key) => {
            // console.log(key);
            // console.log(value[key]);
            recurseYaml(properties, keyPath ? keyPath + "." + key : key, value[key]);
        });
    }
    else {
        if (isNull(value)) {
            // properties.push({ [keyPath]: "" });
            properties.push({ key: keyPath, value: "" });
        }
        else {
            // properties.push({ [keyPath]: value });
            properties.push({ key: keyPath, value });
        }
    }
};
const main = (file) => {
    const properties = [];
    const parsedYamlObj = getYamlObj(file);
    if (parsedYamlObj === null) {
        const parsedYamlObjs = getYamlObjsArr(file);
        parsedYamlObjs.forEach((obj) => {
            recurseYaml(properties, "", obj);
        });
    }
    else {
        recurseYaml(properties, "", parsedYamlObj);
    }
    console.log(properties);
    return properties;
};
exports.default = main;
