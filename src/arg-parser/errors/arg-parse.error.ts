export type ArgParseErrorCode =
  | "INVALID_COMMAND"
  | "INVALID_PARSE_ARGS"
  | "INVALID_GEN_ARGS"
  | "INVALID_PARSEGEN_ARGS";

export class ArgParseError extends Error {
  name = "ArgParseError";
  code: ArgParseErrorCode = "INVALID_PARSE_ARGS";
  message: string;

  constructor(code: ArgParseErrorCode) {
    super();
    this.code = code;
    if (code === "INVALID_COMMAND") {
      this.message = "\n\nCommands:\n\n";
      this.message +=
        " sedocs p [.yaml/.properties] [.json] [-a]?         Parse configs into environment variables\n";
      this.message +=
        " sedocs g [.json] [.md]                             Generate environment variables docs\n";
      this.message +=
        " sedocs pg [.yaml/.properties] [.json] [.md] [-a]?  Parse configs into environment properties and generate docs";
    } else if (code === "INVALID_PARSE_ARGS") {
      this.message = "\n\n Syntax: sedocs p [.yaml/.properties] [.json] [-a]?";
    } else if (code === "INVALID_GEN_ARGS") {
      this.message = "\n\n Syntax: sedocs g [.json] [.md]";
    } else {
      this.message =
        "\n\n Syntax: sedocs pg [.yaml/.properties] [.json] [.md] [-a]?";
    }
  }
}
