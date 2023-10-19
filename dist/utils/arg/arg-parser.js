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
Object.defineProperty(exports, "__esModule", { value: true });
const process = __importStar(require("process"));
const mode_enum_1 = require("./mode.enum");
const flags_1 = require("./flags");
const defaults_args_1 = require("./defaults-args");
/**
 * Check if the file flag (-f) is provided in the args.
 * @param {string[]} args - Program arguments
 * @param {string} flag - Flag
 * @return {boolean} True if the file flag is provided, false otherwise
 */
const containsFileFlag = (args, flag) => {
    return args.includes(flag);
};
const getFileIndex = (args, flag) => {
    const fileFlagIndex = args.findIndex((arg) => arg === flag);
    const fileIndex = fileFlagIndex + 1;
    return fileIndex < args.length ? fileIndex : -1;
};
const getInputFileArg = (args, flag = flags_1.INPUT_FLAG) => {
    if (containsFileFlag(args, flag)) {
        const fileIndex = getFileIndex(args, flag);
        if (fileIndex >= 0) {
            return args[fileIndex];
        }
        console.error("File name was not provided.");
        process.exit(1);
    }
    console.error(`Flag (${flag}) was not provided.`);
    process.exit(1);
};
const getOutputFileArg = (args, flag, defaultValue) => {
    if (containsFileFlag(args, flag)) {
        const fileIndex = getFileIndex(args, flag);
        if (fileIndex >= 0) {
            return "output/" + args[fileIndex];
        }
        console.log("File name was not provided.");
        process.exit(1);
    }
    console.log(`Flag (${flag}) was not provided. Defaulting to ${defaultValue}`);
    return defaultValue;
};
const getMode = (args) => {
    if (args[0] === flags_1.MODE_FLAG) {
        return args[1] === mode_enum_1.Mode.PARSE_PROPERTY
            ? mode_enum_1.Mode.PARSE_PROPERTY
            : mode_enum_1.Mode.PARSE_JSON;
    }
    else {
        return mode_enum_1.Mode.PARSE_PROPERTY;
    }
};
/**
 * Parse and return program arguments - mode, input file name, json output file name, md output file name
 * @return string[]
 */
const main = () => {
    if (process.argv.length === 2) {
        console.error("Expected at least one argument.");
        process.exit(1);
    }
    const args = process.argv.slice(2);
    const mode = getMode(args);
    const inputFileName = getInputFileArg(args);
    const jsonOutputFileName = getOutputFileArg(args, flags_1.JSON_OUTPUT_FLAG, defaults_args_1.DEFAULT_JSON_OUTPUT);
    const mdOutputFileName = getOutputFileArg(args, flags_1.MD_OUTPUT_FLAG, defaults_args_1.DEFAULT_MD_OUTPUT);
    return [mode, inputFileName, jsonOutputFileName, mdOutputFileName];
};
exports.default = main;
