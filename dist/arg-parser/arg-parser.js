"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const error_utils_1 = require("../utils/errors/error-utils");
const file_type_error_1 = require("../utils/file/errors/file-type.error");
const arg_utils_1 = require("./arg-utils");
const arg_parse_error_1 = require("./errors/arg-parse.error");
const parseArgs = () => {
    try {
        (0, arg_utils_1.checkArgsProvided)();
        const args = (0, arg_utils_1.getArgs)();
        const command = (0, arg_utils_1.getCommand)(args);
        const append = (0, arg_utils_1.getAppendFlag)(args);
        const version = (0, arg_utils_1.getVersionArg)(args);
        const fileNames = (0, arg_utils_1.getFileNames)(args, append, version !== undefined);
        const fileArgs = (0, arg_utils_1.getFileArgs)(command, fileNames, append, version);
        return fileArgs;
    }
    catch (err) {
        if (err instanceof arg_parse_error_1.ArgParseError) {
            console.error((0, error_utils_1.formatParseError)(err) + err.message);
            // ArgParseError - caused by INVALID_PARSE_ARGS
            // Syntax: sedocs p [.yaml/.properties] [.json] [-a]?
        }
        else if (err instanceof file_type_error_1.FileTypeError) {
            console.error((0, error_utils_1.formatParseError)(err) + err.message);
            // FileTypeError - caused by INVALID_FILE_TYPE
            // File ${fileName} is not a valid file type
        }
        else {
            console.error(err);
        }
        process.exit(1);
    }
};
exports.parseArgs = parseArgs;
