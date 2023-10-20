#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = require("./arg-parser/arg-parser");
const command_type_1 = require("./arg-parser/types/command.type");
const main_1 = __importStar(require("./env-var-parser/main"));
const main_2 = __importDefault(require("./config-parser/main"));
const md_generator_1 = require("./md-generator/md-generator");
const file_utils_1 = require("./utils/file/file-utils");
const helper_utils_1 = require("./utils/misc/helper-utils");
const writeJsonFile = (jsonFileName, envVarDict) => {
    console.log(JSON.stringify(envVarDict, undefined, 2));
    (0, file_utils_1.writeFile)(jsonFileName, JSON.stringify(envVarDict, undefined, 2));
    console.log("Json file has been created/updated");
};
const writeMdFile = (mdFileName, envVarDict) => {
    const doc = (0, md_generator_1.generateMdFromJson)(envVarDict);
    (0, file_utils_1.writeFile)(mdFileName, doc);
    console.log("Md file has been created");
};
const main = () => {
    const fileArgs = (0, arg_parser_1.parseArgs)();
    let variablesDict = {};
    if (fileArgs.command === command_type_1.Command.PARSE) {
        const inputFileName = fileArgs.configFile;
        const jsonFileName = fileArgs.jsonFile;
        const append = fileArgs.append;
        const keyValuePairs = (0, main_2.default)(inputFileName);
        variablesDict = (0, main_1.default)(keyValuePairs);
        if (append && (0, file_utils_1.isFileExist)(jsonFileName)) {
            const ogDict = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
            variablesDict = (0, main_1.mergeEnvVarDicts)(ogDict, variablesDict);
            if ((0, helper_utils_1.isObjsEqual)(ogDict, variablesDict)) {
                console.log("Environment variables have not changed - json file will not be updated.");
            }
            else {
                console.log("Environment variables have changed - proceeding to update json file.");
                writeJsonFile(jsonFileName, variablesDict);
            }
        }
        else {
            console.log(`Json file ${jsonFileName} does not exist, will be creating it...`);
            writeJsonFile(jsonFileName, variablesDict);
        }
    }
    else if (fileArgs.command === command_type_1.Command.GEN) {
        const jsonFileName = fileArgs.jsonFile;
        const mdFileName = fileArgs.mdFile;
        variablesDict = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
        console.log(JSON.stringify(variablesDict, undefined, 2));
        writeMdFile(mdFileName, variablesDict);
    }
    else {
        const inputFileName = fileArgs.configFile;
        const jsonFileName = fileArgs.jsonFile;
        const mdFileName = fileArgs.mdFile;
        const append = fileArgs.append;
        const keyValuePairs = (0, main_2.default)(inputFileName);
        variablesDict = (0, main_1.default)(keyValuePairs);
        if (append && (0, file_utils_1.isFileExist)(jsonFileName)) {
            const ogDict = JSON.parse((0, file_utils_1.readFile)(jsonFileName));
            variablesDict = (0, main_1.mergeEnvVarDicts)(ogDict, variablesDict);
            if ((0, helper_utils_1.isObjsEqual)(ogDict, variablesDict)) {
                console.log("Environment variables have not changed - json file will not be updated.");
            }
            else {
                console.log("Environment variables have changed - proceeding to update json file.");
                writeJsonFile(jsonFileName, variablesDict);
            }
        }
        else {
            console.log(`Json file ${jsonFileName} does not exist, will be creating it...`);
            writeJsonFile(jsonFileName, variablesDict);
        }
        writeMdFile(mdFileName, variablesDict);
    }
};
main();
