"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tokens_1 = require("./tokens");
const getProperties = (file) => {
    const lines = file
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 1 && !line.startsWith("#"));
    const properties = lines.map((line) => {
        const equalSeparatorIndex = getEqualSeparatorIndex(line);
        if (equalSeparatorIndex === -1) {
            console.error("Properties file is invalid.");
            process.exit(1);
        }
        if (equalSeparatorIndex === line.length - 1) {
            return {
                key: line.substring(0, equalSeparatorIndex),
                value: "",
            };
        }
        else {
            return {
                key: line.substring(0, equalSeparatorIndex),
                value: line.substring(equalSeparatorIndex + 1),
            };
        }
    });
    return properties;
};
const getEqualSeparatorIndex = (value) => {
    return value.indexOf(tokens_1.EQUAL_SEPARATOR);
};
const main = (file) => {
    const properties = getProperties(file);
    console.log(properties);
    return properties;
};
exports.default = main;
