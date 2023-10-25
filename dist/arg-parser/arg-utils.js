"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileArgs = exports.getVersionArg = exports.getUpdateFlag = exports.getCommand = exports.getFileNames = exports.getArgs = exports.checkArgsProvided = void 0;
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
const getFileNames = (args, update, hasVersion) => {
    const argsAfterCmd = args.slice(1);
    if (update) {
        const updateIndex = argsAfterCmd.findIndex((arg) => arg === flags_1.UPDATE_FLAG);
        argsAfterCmd.splice(updateIndex, 1);
    }
    if (hasVersion) {
        const versionIndex = argsAfterCmd.findIndex((arg) => arg === flags_1.VERSION_FLAG);
        argsAfterCmd.splice(versionIndex, 2);
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
// update flag
const getUpdateFlag = (args) => {
    const update = args.find((a) => a === flags_1.UPDATE_FLAG);
    return !!update;
};
exports.getUpdateFlag = getUpdateFlag;
// version flag
const isLastIndex = (arr, index) => {
    return index === arr.length - 1;
};
const getVersionArg = (args) => {
    const versionFlagIndex = args.findIndex((a) => a === flags_1.VERSION_FLAG);
    if (versionFlagIndex !== -1 && !isLastIndex(args, versionFlagIndex)) {
        return args[versionFlagIndex + 1];
    }
    else {
        return undefined;
    }
};
exports.getVersionArg = getVersionArg;
// file args
const isConfigFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.YAML || fileType === file_type_1.FileType.PROPERTIES;
};
const isJsonFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.JSON;
};
const isMdFileArg = (arg) => {
    const fileType = (0, file_utils_1.getFileType)(arg);
    return fileType === file_type_1.FileType.MD;
};
const validateParseArgs = (fileNames) => {
    if (!(fileNames.length === 2 &&
        isConfigFileArg(fileNames[0]) &&
        isJsonFileArg(fileNames[1]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_PARSE_ARGS");
    }
};
const validateGenArgs = (fileNames) => {
    if (!(fileNames.length === 2 &&
        isJsonFileArg(fileNames[0]) &&
        isMdFileArg(fileNames[1]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_GEN_ARGS");
    }
};
const validateParseGenArgs = (fileNames) => {
    if (!(fileNames.length === 3 &&
        isConfigFileArg(fileNames[0]) &&
        isJsonFileArg(fileNames[1]) &&
        isMdFileArg(fileNames[2]))) {
        throw new arg_parse_error_1.ArgParseError("INVALID_PARSEGEN_ARGS");
    }
};
const getParseFileArgs = (fileNames, update) => {
    return {
        command: command_type_1.Command.PARSE,
        configFile: fileNames[0],
        configFileType: (0, file_utils_1.getFileType)(fileNames[0]),
        jsonFile: fileNames[1],
        update: update,
    };
};
const getGenFileArgs = (fileNames) => {
    return {
        command: command_type_1.Command.GEN,
        jsonFile: fileNames[0],
        mdFile: fileNames[1],
    };
};
const getParseGenFileArgs = (fileNames, update) => {
    return {
        command: command_type_1.Command.PARSE_GEN,
        configFile: fileNames[0],
        configFileType: (0, file_utils_1.getFileType)(fileNames[0]),
        jsonFile: fileNames[1],
        mdFile: fileNames[2],
        update: update,
    };
};
const getFileArgs = (command, fileNames, update, version) => {
    if (command === command_type_1.Command.PARSE) {
        validateParseArgs(fileNames);
        return Object.assign(Object.assign({}, getParseFileArgs(fileNames, update)), { version: version });
    }
    else if (command === command_type_1.Command.GEN) {
        validateGenArgs(fileNames);
        return getGenFileArgs(fileNames);
    }
    else {
        // PARSE_GEN
        validateParseGenArgs(fileNames);
        return Object.assign(Object.assign({}, getParseGenFileArgs(fileNames, update)), { version: version });
    }
};
exports.getFileArgs = getFileArgs;
