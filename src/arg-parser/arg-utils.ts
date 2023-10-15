import { getFileType } from "../utils/file/file-utils";
import { FileType } from "../utils/file/types/file.type";
import {
  GEN_CMD,
  GEN_CMD_SH,
  PARSE_CMD,
  PARSE_CMD_SH,
  PARSE_GEN_CMD,
  PARSE_GEN_CMD_SH,
} from "./constants/commands";
import { APPEND_FLAG } from "./constants/flags";
import { Command } from "./types/command.type";
import {
  FileArgs,
  GenFileArgs,
  ParseFileArgs,
  ParseGenFileArgs,
} from "./types/file-args.type";

export const checkArgsProvided = (): void => {
  if (process.argv.length === 2) {
    console.error("Expected at least one argument.");
    process.exit(1);
  }
};

export const getArgs = (): string[] => {
  return process.argv.slice(2);
};

export const getFileNames = (args: string[], append: boolean): string[] => {
  const argsAfterCmd = args.slice(1);
  if (append) {
    const appendIndex = argsAfterCmd.findIndex((arg) => arg === APPEND_FLAG);
    argsAfterCmd.splice(appendIndex, 1);
  }
  return argsAfterCmd;
};

// command arg

export const isParseCmd = (arg: string): boolean => {
  return arg === PARSE_CMD || arg === PARSE_CMD_SH;
};

export const isGenCmd = (arg: string): boolean => {
  return arg === GEN_CMD || arg === GEN_CMD_SH;
};

export const isParseGenCmd = (arg: string): boolean => {
  return arg === PARSE_GEN_CMD || arg === PARSE_GEN_CMD_SH;
};

export const getCommand = (args: string[]): Command => {
  if (isParseCmd(args[0])) {
    return Command.PARSE;
  } else if (isGenCmd(args[0])) {
    return Command.GEN;
  } else if (isParseGenCmd(args[0])) {
    return Command.PARSE_GEN;
  } else {
    console.error("Command not provided.");
    process.exit(1);
  }
};

// append flag

export const getAppendFlag = (args: string[]): boolean => {
  const append = args.find((a) => a === APPEND_FLAG);
  return !!append;
};

// file args

export const isConfigFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.YAML || fileType === FileType.PROPERTIES;
};

export const isJsonFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.JSON;
};

export const isMdFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.MD;
};

export const validateParseArgs = (fileNames: string[]) => {
  if (!(isConfigFileArg(fileNames[0]) && isJsonFileArg(fileNames[1]))) {
    throw new Error("Invalid parse args");
  }
};

export const validateGenArgs = (fileNames: string[]) => {
  if (!(isJsonFileArg(fileNames[0]) && isMdFileArg(fileNames[1]))) {
    throw new Error("Invalid gen args");
  }
};

export const validateParseGenArgs = (fileNames: string[]) => {
  if (
    !(
      isConfigFileArg(fileNames[0]) &&
      isJsonFileArg(fileNames[1]) &&
      isMdFileArg(fileNames[2])
    )
  ) {
    throw new Error("Invalid parsegen args");
  }
};

export const validateFileNames = (command: Command, fileNames: string[]) => {
  if (command === Command.PARSE) {
    validateParseArgs(fileNames);
  } else if (command === Command.GEN) {
    validateGenArgs(fileNames);
  } else {
    // PARSE_GEN
    validateParseGenArgs(fileNames);
  }
};

export const getParseFileArgs = (
  fileNames: string[],
  append: boolean
): ParseFileArgs => {
  return {
    command: Command.PARSE,
    configFile: fileNames[0],
    jsonFile: fileNames[1],
    append,
  };
};

export const getGenFileArgs = (fileNames: string[]): GenFileArgs => {
  return {
    command: Command.GEN,
    jsonFile: fileNames[0],
    mdFile: fileNames[1],
  };
};

export const getParseGenFileArgs = (
  fileNames: string[],
  append: boolean
): ParseGenFileArgs => {
  return {
    command: Command.PARSE_GEN,
    configFile: fileNames[0],
    jsonFile: fileNames[1],
    mdFile: fileNames[2],
    append,
  };
};

export const getFileArgs = (
  command: Command,
  fileNames: string[],
  append: boolean
): FileArgs => {
  if (command === Command.PARSE) {
    return getParseFileArgs(fileNames, append);
  } else if (command === Command.GEN) {
    return getGenFileArgs(fileNames);
  } else {
    return getParseGenFileArgs(fileNames, append);
  }
};
