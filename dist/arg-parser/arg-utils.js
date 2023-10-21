"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileArgs = exports.getAppendFlag = exports.getCommand = exports.getFileNames = exports.getArgs = exports.checkArgsProvided = void 0;
const file_utils_1 = require("../utils/file/file-utils");
const file_type_1 = require("../utils/file/types/file.type");
const commands_1 = require("./constants/commands");
const flags_1 = require("./constants/flags");
const arg_parse_error_1 = require("./errors/arg-parse.error");
const command_type_1 = require("./types/command.type");
const checkArgsProvided = () => {
    if (process.argv.length === 2) {
        throw new arg_parse_error_1.ArgParseError("INVALID_COMMAND");
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
const isGenCmd = (arg) => {
    return arg === commands_1.GEN_CMD || arg === commands_1.GEN_CMD_SH;
};
const isParseGenCmd = (arg) => {
    return arg === commands_1.PARSE_GEN_CMD || arg === commands_1.PARSE_GEN_CMD_SH;
};
const getCommand = (args) => {
    if (isParseCmd(args[0])) {
        return command_type_1.Command.PARSE;
    }
    else if (isGenCmd(args[0])) {
        return command_type_1.Command.GEN;
    }
    else if (isParseGenCmd(args[0])) {
        return command_type_1.Command.PARSE_GEN;
    }
    else {
        throw new arg_parse_error_1.ArgParseError("INVALID_COMMAND");
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
const getArgsFileTypes = (fileNames) => {
    return fileNames.map(file_utils_1.getFileType);
};
const isConfigFileType = (fileType) => {
    return fileType === file_type_1.FileType.YAML || fileType === file_type_1.FileType.PROPERTIES;
};
const isJsonFileType = (fileType) => {
    return fileType === file_type_1.FileType.JSON;
};
const isMdFileType = (fileType) => {
    return fileType === file_type_1.FileType.MD;
};
const validateParseArgs = (fileTypes) => {
    if (!(fileTypes.length === 2 &&
        isConfigFileType(fileTypes[0]) &&
        isJsonFileType(fileTypes[1]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_PARSE_ARGS");
    }
};
const validateGenArgs = (fileTypes) => {
    if (!(fileTypes.length === 2 &&
        isJsonFileType(fileTypes[0]) &&
        isMdFileType(fileTypes[1]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_GEN_ARGS");
    }
};
const validateParseGenArgs = (fileTypes) => {
    if (!(fileTypes.length === 3 &&
        isConfigFileType(fileTypes[0]) &&
        isJsonFileType(fileTypes[1]) &&
        isMdFileType(fileTypes[2]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_PARSEGEN_ARGS");
    }
};
const getParseFileArgs = (fileNames, configFileType, append) => {
    return {
        command: command_type_1.Command.PARSE,
        configFile: fileNames[0],
        configFileType: configFileType,
        jsonFile: fileNames[1],
        append,
    };
};
const getGenFileArgs = (fileNames) => {
    return {
        command: command_type_1.Command.GEN,
        jsonFile: fileNames[0],
        mdFile: fileNames[1],
    };
};
const getParseGenFileArgs = (fileNames, configFileType, append) => {
    return {
        command: command_type_1.Command.PARSE_GEN,
        configFile: fileNames[0],
        configFileType: configFileType,
        jsonFile: fileNames[1],
        mdFile: fileNames[2],
        append,
    };
};
const getFileArgs = (command, fileNames, append) => {
    const fileTypes = getArgsFileTypes(fileNames);
    if (command === command_type_1.Command.PARSE) {
        validateParseArgs(fileTypes);
        const configFileType = fileTypes[0];
        return getParseFileArgs(fileNames, configFileType, append);
    }
    else if (command === command_type_1.Command.GEN) {
        validateGenArgs(fileTypes);
        return getGenFileArgs(fileNames);
    }
    else {
        // PARSE_GEN
        validateParseGenArgs(fileTypes);
        const configFileType = fileTypes[0];
        return getParseGenFileArgs(fileNames, configFileType, append);
    }
};
exports.getFileArgs = getFileArgs;
