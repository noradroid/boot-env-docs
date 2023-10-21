import { formatParseError } from "../utils/errors/error-utils";
import { FileTypeError } from "../utils/file/errors/file-type.error";
import {
  checkArgsProvided,
  getAppendFlag,
  getArgs,
  getCommand,
  getFileArgs,
  getFileNames,
} from "./arg-utils";
import { ArgParseError } from "./errors/arg-parse.error";
import { Command } from "./types/command.type";
import { FileArgs } from "./types/file-args.type";

export const parseArgs = (): FileArgs => {
  try {
    checkArgsProvided();

    const args = getArgs();

    const command: Command = getCommand(args);

    const append: boolean = getAppendFlag(args);

    const fileNames = getFileNames(args, append);

    const fileArgs: FileArgs = getFileArgs(command, fileNames, append);
    return fileArgs;
  } catch (err) {
    if (err instanceof ArgParseError) {
      console.error(formatParseError(err) + err.message);
      // ArgParseError - caused by INVALID_PARSE_ARGS
      // Syntax: sedocs p [.yaml/.properties] [.json] [-a]?
    } else if (err instanceof FileTypeError) {
      console.error(formatParseError(err) + err.message);
      // FileTypeError - caused by INVALID_FILE_TYPE
      // File ${fileName} is not a valid file type
    } else {
      console.error(err);
    }
    process.exit(1);
  }
};
