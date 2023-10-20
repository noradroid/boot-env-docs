"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertValueIntoType = exports.getValueType = void 0;
const isEmpty = (value) => {
    return value === "";
};
const isNumber = (value) => {
    return value.length === 0 ? false : !Number.isNaN(Number(value));
};
const TRUE_VALUE = "true";
const FALSE_VALUE = "false";
const isBoolean = (value) => {
    return (value.toLowerCase() === TRUE_VALUE || value.toLowerCase() === FALSE_VALUE);
};
const getValueType = (value) => {
    if (isEmpty(value)) {
        return "unknown";
    }
    else if (isNumber(value)) {
        return "number";
    }
    else if (isBoolean(value)) {
        return "boolean";
    }
    else {
        return "string";
    }
};
exports.getValueType = getValueType;
const convertIntoNumber = (value) => {
    return Number(value);
};
const convertIntoBoolean = (value) => {
    return value.toLowerCase() === TRUE_VALUE;
};
const convertValueIntoType = (value, type) => {
    if (type === "unknown") {
        return null;
    }
    else if (type === "number") {
        return convertIntoNumber(value);
    }
    else if (type === "boolean") {
        return convertIntoBoolean(value);
    }
    else {
        return value;
    }
};
exports.convertValueIntoType = convertValueIntoType;
