"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileArgs = exports.getParseGenFileArgs = exports.getGenFileArgs = exports.getParseFileArgs = exports.validateFileNames = exports.validateParseGenArgs = exports.validateGenArgs = exports.validateParseArgs = exports.isMdFileArg = exports.isJsonFileArg = exports.isConfigFileArg = exports.getAppendFlag = exports.getCommand = exports.isParseGenCmd = exports.isGenCmd = exports.isParseCmd = exports.getFileNames = exports.getArgs = exports.checkArgsProvided = void 0;
const file_utils_1 = require("../utils/file/file-utils");
const file_type_1 = require("../utils/file/types/file.type");
const commands_1 = require("./constants/commands");
const flags_1 = require("./constants/flags");
const command_type_1 = require("./types/command.type");
const checkArgsProvided = () => {
    if (process.argv.length === 2) {
        console.error("Expected at least one argument.");
        process.exit(1);
    }
};
exports.checkArgsProvided = checkArgsProvided;
const getArgs = () => {
    return process.argv.slice(2);
};
exports.getArgs = getArgs;
const getFileNames = (args, append) => {
    const argsAfterCmd = args.slice(1);
    if (append) {
        const appendIndex = argsAfterCmd.findIndex((arg) => arg === flags_1.APPEND_FLAG);
        argsAfterCmd.splice(appendIndex, 1);
    }
    return argsAfterCmd;
};
exports.getFileNames = getFileNames;
// command arg
const isParseCmd = (arg) => {
    return arg === commands_1.PARSE_CMD || arg === commands_1.PARSE_CMD_SH;
};
exports.isParseCmd = isParseCmd;
const isGenCmd = (arg) => {
    return arg === commands_1.GEN_CMD || arg === commands_1.GEN_CMD_SH;
};
exports.isGenCmd = isGenCmd;
const isParseGenCmd = (arg) => {
    return arg === commands_1.PARSE_GEN_CMD || arg === commands_1.PARSE_GEN_CMD_SH;
};
exports.isParseGenCmd = isParseGenCmd;
const getCommand = (args) => {
    if ((0, exports.isParseCmd)(args[0])) {
        return command_type_1.Command.PARSE;
    }
    else if ((0, exports.isGenCmd)(args[0])) {
        return command_type_1.Command.GEN;
    }
    else if ((0, exports.isParseGenCmd)(args[0])) {
        return command_type_1.Command.PARSE_GEN;
    }
    else {
        console.error("Command not provided.");
        process.exit(1);
    }
};
exports.getCommand = getCommand;
// append flag
const getAppendFlag = (args) => {
    const append = args.find((a) => a === flags_1.APPEND_FLAG);
    return !!append;
};
exports.getAppendFlag = getAppendFlag;
// file args
const isConfigFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.YAML || fileType === file_type_1.FileType.PROPERTIES;
};
exports.isConfigFileArg = isConfigFileArg;
const isJsonFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.JSON;
};
exports.isJsonFileArg = isJsonFileArg;
const isMdFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.MD;
};
exports.isMdFileArg = isMdFileArg;
const validateParseArgs = (fileNames) => {
    if (!((0, exports.isConfigFileArg)(fileNames[0]) && (0, exports.isJsonFileArg)(fileNames[1]))) {
        throw new Error("Invalid parse args");
    }
};
exports.validateParseArgs = validateParseArgs;
const validateGenArgs = (fileNames) => {
    if (!((0, exports.isJsonFileArg)(fileNames[0]) && (0, exports.isMdFileArg)(fileNames[1]))) {
        throw new Error("Invalid gen args");
    }
};
exports.validateGenArgs = validateGenArgs;
const validateParseGenArgs = (fileNames) => {
    if (!((0, exports.isConfigFileArg)(fileNames[0]) &&
        (0, exports.isJsonFileArg)(fileNames[1]) &&
        (0, exports.isMdFileArg)(fileNames[2]))) {
        throw new Error("Invalid parsegen args");
    }
};
exports.validateParseGenArgs = validateParseGenArgs;
const validateFileNames = (command, fileNames) => {
    if (command === command_type_1.Command.PARSE) {
        (0, exports.validateParseArgs)(fileNames);
    }
    else if (command === command_type_1.Command.GEN) {
        (0, exports.validateGenArgs)(fileNames);
    }
    else {
        // PARSE_GEN
        (0, exports.validateParseGenArgs)(fileNames);
    }
};
exports.validateFileNames = validateFileNames;
const getParseFileArgs = (fileNames, append) => {
    return {
        command: command_type_1.Command.PARSE,
        configFile: fileNames[0],
        jsonFile: fileNames[1],
        append,
    };
};
exports.getParseFileArgs = getParseFileArgs;
const getGenFileArgs = (fileNames) => {
    return {
        command: command_type_1.Command.GEN,
        jsonFile: fileNames[0],
        mdFile: fileNames[1],
    };
};
exports.getGenFileArgs = getGenFileArgs;
const getParseGenFileArgs = (fileNames, append) => {
    return {
        command: command_type_1.Command.PARSE_GEN,
        configFile: fileNames[0],
        jsonFile: fileNames[1],
        mdFile: fileNames[2],
        append,
    };
};
exports.getParseGenFileArgs = getParseGenFileArgs;
const getFileArgs = (command, fileNames, append) => {
    if (command === command_type_1.Command.PARSE) {
        return (0, exports.getParseFileArgs)(fileNames, append);
    }
    else if (command === command_type_1.Command.GEN) {
        return (0, exports.getGenFileArgs)(fileNames);
    }
    else {
        return (0, exports.getParseGenFileArgs)(fileNames, append);
    }
};
exports.getFileArgs = getFileArgs;
