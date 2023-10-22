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
import { ArgParseError } from "./errors/arg-parse.error";
import { Command } from "./types/command.type";
import {
  FileArgs,
  GenFileArgs,
  ParseFileArgs,
  ParseGenFileArgs,
} from "./types/file-args.type";
import { FileType as ConfigFileType } from "../config-parser/shared/types/file.type";

export const checkArgsProvided = (): void => {
  if (process.argv.length === 2) {
    throw new ArgParseError("INVALID_COMMAND");
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

const isParseCmd = (arg: string): boolean => {
  return arg === PARSE_CMD || arg === PARSE_CMD_SH;
};

const isGenCmd = (arg: string): boolean => {
  return arg === GEN_CMD || arg === GEN_CMD_SH;
};

const isParseGenCmd = (arg: string): boolean => {
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
    throw new ArgParseError("INVALID_COMMAND");
  }
};

// append flag

export const getAppendFlag = (args: string[]): boolean => {
  const append = args.find((a) => a === APPEND_FLAG);
  return !!append;
};

// file args

const isConfigFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.YAML || fileType === FileType.PROPERTIES;
};

const isJsonFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.JSON;
};

const isMdFileArg = (arg: string): boolean => {
  const fileType = getFileType(arg);
  return fileType === FileType.MD;
};

const validateParseArgs = (fileNames: string[]) => {
  if (
    !(
      fileNames.length === 2 &&
      isConfigFileArg(fileNames[0]) &&
      isJsonFileArg(fileNames[1])
    )
  ) {
    throw new ArgParseError("INVALID_PARSE_ARGS");
  }
};

const validateGenArgs = (fileNames: string[]) => {
  if (
    !(
      fileNames.length === 2 &&
      isJsonFileArg(fileNames[0]) &&
      isMdFileArg(fileNames[1])
    )
  ) {
    throw new ArgParseError("INVALID_GEN_ARGS");
  }
};

const validateParseGenArgs = (fileNames: string[]) => {
  if (
    !(
      fileNames.length === 3 &&
      isConfigFileArg(fileNames[0]) &&
      isJsonFileArg(fileNames[1]) &&
      isMdFileArg(fileNames[2])
    )
  ) {
    throw new ArgParseError("INVALID_PARSEGEN_ARGS");
  }
};

const getParseFileArgs = (
  fileNames: string[],
  append: boolean
): ParseFileArgs => {
  return {
    command: Command.PARSE,
    configFile: fileNames[0],
    configFileType: getFileType(fileNames[0]) as ConfigFileType,
    jsonFile: fileNames[1],
    append,
  };
};

const getGenFileArgs = (fileNames: string[]): GenFileArgs => {
  return {
    command: Command.GEN,
    jsonFile: fileNames[0],
    mdFile: fileNames[1],
  };
};

const getParseGenFileArgs = (
  fileNames: string[],
  append: boolean
): ParseGenFileArgs => {
  return {
    command: Command.PARSE_GEN,
    configFile: fileNames[0],
    configFileType: getFileType(fileNames[0]) as ConfigFileType,
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
    validateParseArgs(fileNames);
    return getParseFileArgs(fileNames, append);
  } else if (command === Command.GEN) {
    validateGenArgs(fileNames);
    return getGenFileArgs(fileNames);
  } else {
    // PARSE_GEN
    validateParseGenArgs(fileNames);
    return getParseGenFileArgs(fileNames, append);
  }
};
