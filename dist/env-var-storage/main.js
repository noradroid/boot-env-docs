"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addVersionToEnvVarsDict = exports.updateEnvVarsDict = void 0;
const helper_utils_1 = require("../utils/misc/helper-utils");
const isEnvVarDataChanged = (oldData, newData) => {
    return (oldData.default !== newData.default ||
        oldData.type !== newData.type ||
        !(0, helper_utils_1.isObjsEqual)(oldData.instances, newData.instances));
};
const updateEnvVarsDict = (oldDict, newDict, version) => {
    const updated = {};
    Object.entries(newDict).forEach(([envVar, data]) => {
        if (envVar in oldDict) {
            const ogData = oldDict[envVar];
            if (isEnvVarDataChanged(ogData, data)) {
                updated[envVar] = Object.assign(Object.assign({}, ogData), { updatedVersion: data.updatedVersion, type: data.type, default: data.default, instances: data.instances });
            }
        }
        else {
            updated[envVar] = data;
        }
    });
    Object.entries(oldDict).forEach(([envVar, data]) => {
        if (!(envVar in updated)) {
            updated[envVar] = Object.assign(Object.assign({}, data), { deprecatedVersion: version });
        }
    });
    return updated;
};
exports.updateEnvVarsDict = updateEnvVarsDict;
const addVersionToEnvVarsDict = (dict, version) => {
    const updated = (0, helper_utils_1.clone)(dict);
    Object.keys(dict).forEach((envVar) => {
        updated[envVar] = Object.assign(Object.assign({}, updated[envVar]), { introducedVersion: version, updatedVersion: version });
    });
    return updated;
};
exports.addVersionToEnvVarsDict = addVersionToEnvVarsDict;
