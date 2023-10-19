"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const arg_utils_1 = require("./arg-utils");
const parseArgs = () => {
    (0, arg_utils_1.checkArgsProvided)();
    const args = (0, arg_utils_1.getArgs)();
    const command = (0, arg_utils_1.getCommand)(args);
    const append = (0, arg_utils_1.getAppendFlag)(args);
    const fileNames = (0, arg_utils_1.getFileNames)(args, append);
    const fileArgs = (0, arg_utils_1.getFileArgs)(command, fileNames, append);
    return fileArgs;
};
exports.parseArgs = parseArgs;
