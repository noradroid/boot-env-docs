#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const arg_parser_1 = require("./arg-parser/arg-parser");
const command_type_1 = require("./arg-parser/types/command.type");
const command_handler_1 = require("./command-handler/command-handler");
const main = () => {
    const args = (0, arg_parser_1.parseArgs)();
    if (args.command === command_type_1.Command.PARSE) {
        (0, command_handler_1.parseCmdHandler)(args);
    }
    else if (args.command === command_type_1.Command.GEN) {
        (0, command_handler_1.genCmdHandler)(args);
    }
    else {
        (0, command_handler_1.parseGenCmdHandler)(args);
    }
};
main();
