"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGenCmdHandler = exports.genCmdHandler = exports.parseCmdHandler = void 0;
const file_utils_1 = require("../utils/file/file-utils");
const command_handler_utils_1 = require("./command-handler-utils");
const parseCmdHandler = (args) => {
    const envVarStore = (0, command_handler_utils_1.convertConfigToEnvVarStore)(args.configFile, args.configFileType, args.jsonFile, args.update, args.version);
    (0, command_handler_utils_1.writeJsonFile)(args.jsonFile, envVarStore);
};
exports.parseCmdHandler = parseCmdHandler;
const genCmdHandler = (args) => {
    const envVarStore = JSON.parse((0, file_utils_1.readFile)(args.jsonFile));
    (0, command_handler_utils_1.writeMdFile)(args.mdFile, envVarStore);
};
exports.genCmdHandler = genCmdHandler;
const parseGenCmdHandler = (args) => {
    const envVarStore = (0, command_handler_utils_1.convertConfigToEnvVarStore)(args.configFile, args.configFileType, args.jsonFile, args.update, args.version);
    (0, command_handler_utils_1.writeJsonFile)(args.jsonFile, envVarStore);
    (0, command_handler_utils_1.writeMdFile)(args.mdFile, envVarStore);
};
exports.parseGenCmdHandler = parseGenCmdHandler;
