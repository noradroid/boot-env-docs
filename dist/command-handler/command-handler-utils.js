"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertConfigToEnvVarStore = exports.writeMdFile = exports.writeJsonFile = void 0;
const main_1 = require("../config-parser/main");
const main_2 = require("../env-var-parser/main");
const main_3 = require("../env-var-storage/main");
const md_generator_1 = require("../md-generator/md-generator");
const file_utils_1 = require("../utils/file/file-utils");
const writeJsonFile = (jsonFileName, envVarStore) => {
    console.log(JSON.stringify(envVarStore.envVars, undefined, 2));
    (0, file_utils_1.writeFile)(jsonFileName, JSON.stringify(envVarStore, undefined, 2));
    console.log("Json file has been created/updated");
};
exports.writeJsonFile = writeJsonFile;
const writeMdFile = (mdFileName, envVarStore) => {
    const doc = (0, md_generator_1.generateMdFromJson)(envVarStore);
    (0, file_utils_1.writeFile)(mdFileName, doc);
    console.log("Md file has been created");
};
exports.writeMdFile = writeMdFile;
const convertConfigToEnvVarStore = (configFileName, configFileType, jsonFileName, update, version) => {
    const newKeyValues = (0, main_1.parseIntoKeyValuePairs)((0, file_utils_1.readFile)(configFileName), configFileType);
    const newEnvVars = (0, main_3.addVersionToEnvVarsDict)((0, main_2.parseKeyValuePairsIntoEnvVarDict)(newKeyValues), version);
    let envVars;
    if (update && (0, file_utils_1.isFileExist)(jsonFileName)) {
        const ogEnvVarStore = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
        const ogEnvVars = ogEnvVarStore.envVars;
        envVars = (0, main_3.updateEnvVarsDict)(ogEnvVars, newEnvVars);
    }
    else {
        envVars = newEnvVars;
    }
    return { version, envVars };
};
exports.convertConfigToEnvVarStore = convertConfigToEnvVarStore;
