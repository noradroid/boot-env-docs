import {
  checkArgsProvided,
  getArgs,
  getCommand,
  getFileArgs,
  getFileNames,
} from "./arg-utils";
import { Command } from "./types/command.type";
import { FileArgs } from "./types/file-args.type";

export const parseArgs = (): FileArgs => {
  checkArgsProvided();

  const args = getArgs();

  const command: Command = getCommand(args);

  const fileNames = getFileNames(args);

  const fileArgs: FileArgs = getFileArgs(command, fileNames);

  return fileArgs;
};
