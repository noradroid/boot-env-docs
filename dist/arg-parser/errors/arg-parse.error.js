"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgParseError = void 0;
class ArgParseError extends Error {
    constructor(code) {
        super();
        this.name = "ArgParseError";
        this.code = "INVALID_PARSE_ARGS";
        this.code = code;
        if (code === "INVALID_COMMAND") {
            this.message = "\n\nCommands:\n\n";
            this.message +=
                " sedocs p [.yaml/.properties] [.json] [-a]?         Parse configs into environment variables\n";
            this.message +=
                " sedocs g [.json] [.md]                             Generate environment variables docs\n";
            this.message +=
                " sedocs pg [.yaml/.properties] [.json] [.md] [-a]?  Parse configs into environment properties and generate docs";
        }
        else if (code === "INVALID_PARSE_ARGS") {
            this.message = "\n\n Syntax: sedocs p [.yaml/.properties] [.json] [-a]?";
        }
        else if (code === "INVALID_GEN_ARGS") {
            this.message = "\n\n Syntax: sedocs g [.json] [.md]";
        }
        else {
            this.message =
                "\n\n Syntax: sedocs pg [.yaml/.properties] [.json] [.md] [-a]?";
        }
    }
}
exports.ArgParseError = ArgParseError;
