"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeEnvVarDicts = exports.findInstanceIndex = void 0;
const helper_utils_1 = require("../utils/misc/helper-utils");
const findInstanceIndex = (arr, key) => {
    return arr.findIndex((ins) => ins.key === key);
};
exports.findInstanceIndex = findInstanceIndex;
const mergeInstances = (oldInstances, newInstances) => {
    const mergedInstances = (0, helper_utils_1.clone)(oldInstances);
    newInstances.forEach((newInstance) => {
        const oldInstanceIndex = (0, exports.findInstanceIndex)(mergedInstances, newInstance.key);
        if (oldInstanceIndex !== -1) {
            mergedInstances[oldInstanceIndex] = newInstance;
        }
        else {
            mergedInstances.push(newInstance);
        }
    });
    return mergedInstances;
};
const mergeEnvVarDicts = (oldDict, newDict) => {
    const merged = (0, helper_utils_1.clone)(oldDict);
    Object.entries(newDict).forEach(([newEnvVar, newData]) => {
        if (newEnvVar in merged) {
            const mergedInstances = mergeInstances(merged[newEnvVar].instances, newData.instances);
            merged[newEnvVar] = Object.assign(Object.assign({}, merged[newEnvVar]), { default: newData.default, instances: mergedInstances });
        }
        else {
            merged[newEnvVar] = newData;
        }
    });
    return merged;
};
exports.mergeEnvVarDicts = mergeEnvVarDicts;
