"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.isObjsEqual = exports.isString = void 0;
const fp_1 = require("lodash/fp");
const isString = (value) => {
    return typeof value === "string" || value instanceof String;
};
exports.isString = isString;
const isObjsEqual = (obj1, obj2) => {
    return (0, fp_1.isEqual)(obj1, obj2);
};
exports.isObjsEqual = isObjsEqual;
const clone = (obj) => {
    return (0, fp_1.cloneDeep)(obj);
};
exports.clone = clone;
