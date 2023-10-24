#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = require("./arg-parser/arg-parser");
const command_type_1 = require("./arg-parser/types/command.type");
const main_1 = require("./env-var-parser/main");
const main_2 = require("./config-parser/main");
const md_generator_1 = require("./md-generator/md-generator");
const file_utils_1 = require("./utils/file/file-utils");
const main_3 = require("./env-var-storage/main");
const writeJsonFile = (jsonFileName, envVarStore) => {
    console.log(JSON.stringify(envVarStore.envVars, undefined, 2));
    (0, file_utils_1.writeFile)(jsonFileName, JSON.stringify(envVarStore, undefined, 2));
    console.log("Json file has been created/updated");
};
const writeMdFile = (mdFileName, envVarStore) => {
    const doc = (0, md_generator_1.generateMdFromJson)(envVarStore);
    (0, file_utils_1.writeFile)(mdFileName, doc);
    console.log("Md file has been created");
};
const main = () => {
    const fileArgs = (0, arg_parser_1.parseArgs)();
    if (fileArgs.command === command_type_1.Command.PARSE) {
        const configFileName = fileArgs.configFile;
        const configFileType = fileArgs.configFileType;
        const jsonFileName = fileArgs.jsonFile;
        const append = fileArgs.append;
        const version = fileArgs.version;
        const configFileContent = (0, file_utils_1.readFile)(configFileName);
        const keyValuePairs = (0, main_2.parseIntoKeyValuePairs)(configFileContent, configFileType);
        let variablesDict = (0, main_1.parseKeyValuePairsIntoEnvVarDict)(keyValuePairs);
        if (append && (0, file_utils_1.isFileExist)(jsonFileName)) {
            const ogEnvVarStore = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
            const ogDict = ogEnvVarStore.envVars;
            variablesDict = (0, main_3.mergeEnvVarDicts)(ogDict, variablesDict);
        }
        const envVarStore = {
            version,
            envVars: variablesDict,
        };
        writeJsonFile(jsonFileName, envVarStore);
    }
    else if (fileArgs.command === command_type_1.Command.GEN) {
        const jsonFileName = fileArgs.jsonFile;
        const mdFileName = fileArgs.mdFile;
        const envVarStore = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
        console.log(JSON.stringify(envVarStore.envVars, undefined, 2));
        writeMdFile(mdFileName, envVarStore);
    }
    else {
        const configFileName = fileArgs.configFile;
        const configFileType = fileArgs.configFileType;
        const jsonFileName = fileArgs.jsonFile;
        const mdFileName = fileArgs.mdFile;
        const append = fileArgs.append;
        const version = fileArgs.version;
        const configFileContent = (0, file_utils_1.readFile)(configFileName);
        const keyValuePairs = (0, main_2.parseIntoKeyValuePairs)(configFileContent, configFileType);
        let variablesDict = (0, main_1.parseKeyValuePairsIntoEnvVarDict)(keyValuePairs);
        if (append && (0, file_utils_1.isFileExist)(jsonFileName)) {
            const ogEnvVarStore = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
            const ogDict = ogEnvVarStore.envVars;
            variablesDict = (0, main_3.mergeEnvVarDicts)(ogDict, variablesDict);
        }
        const envVarStore = {
            version,
            envVars: variablesDict,
        };
        writeJsonFile(jsonFileName, envVarStore);
        writeMdFile(mdFileName, envVarStore);
    }
};
main();
