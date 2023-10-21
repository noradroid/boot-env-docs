export type EnvVarParseErrorCode =
  | "MISSING_CLOSING_BRACE"
  | "MISSING_COLON"
  | "IDK_WHAT_HAPPENED";

export class EnvVarParseError extends Error {
  name = "EnvVarParseError";
  code: EnvVarParseErrorCode = "IDK_WHAT_HAPPENED";
  message: string;

  constructor(code: EnvVarParseErrorCode) {
    super();
    this.code = code;
    if (code === "MISSING_CLOSING_BRACE") {
      this.message =
        "Environment variable definition should be closed with a closing brace '}'";
    } else if (code === "MISSING_COLON") {
      this.message =
        "Empty default value should be specified be providing a colon ':' before the closing brace";
    } else {
      this.message = "There's no way you got here";
    }
  }
}
