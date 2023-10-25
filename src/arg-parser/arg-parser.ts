import { Version } from "../shared/models/version.type";
import { formatParseError } from "../utils/errors/error-utils";
import { FileTypeError } from "../utils/file/errors/file-type.error";
import {
  checkArgsProvided,
  getUpdateFlag,
  getArgs,
  getCommand,
  getFileArgs,
  getFileNames,
  getVersionArg,
} from "./arg-utils";
import { ArgParseError } from "./errors/arg-parse.error";
import { Command } from "./types/command.type";
import { CommandArgs } from "./types/file-args.type";

export const parseArgs = (): CommandArgs => {
  try {
    checkArgsProvided();

    const args = getArgs();

    const command: Command = getCommand(args);

    const update: boolean = getUpdateFlag(args);

    const version: Version | undefined = getVersionArg(args);

    const fileNames = getFileNames(args, update, version !== undefined);

    const fileArgs: CommandArgs = getFileArgs(
      command,
      fileNames,
      update,
      version
    );
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
