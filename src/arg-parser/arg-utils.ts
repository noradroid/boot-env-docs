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

const getArgsFileTypes = (fileNames: string[]): FileType[] => {
  return fileNames.map(getFileType);
};

const isConfigFileType = (fileType: string): boolean => {
  return fileType === FileType.YAML || fileType === FileType.PROPERTIES;
};

const isJsonFileType = (fileType: string): boolean => {
  return fileType === FileType.JSON;
};

const isMdFileType = (fileType: string): boolean => {
  return fileType === FileType.MD;
};

const validateParseArgs = (fileTypes: FileType[]) => {
  if (
    !(
      fileTypes.length === 2 &&
      isConfigFileType(fileTypes[0]) &&
      isJsonFileType(fileTypes[1])
    )
  ) {
    throw new ArgParseError("INVALID_PARSE_ARGS");
  }
};

const validateGenArgs = (fileTypes: string[]) => {
  if (
    !(
      fileTypes.length === 2 &&
      isJsonFileType(fileTypes[0]) &&
      isMdFileType(fileTypes[1])
    )
  ) {
    throw new ArgParseError("INVALID_GEN_ARGS");
  }
};

const validateParseGenArgs = (fileTypes: string[]) => {
  if (
    !(
      fileTypes.length === 3 &&
      isConfigFileType(fileTypes[0]) &&
      isJsonFileType(fileTypes[1]) &&
      isMdFileType(fileTypes[2])
    )
  ) {
    throw new ArgParseError("INVALID_PARSEGEN_ARGS");
  }
};

const getParseFileArgs = (
  fileNames: string[],
  configFileType: FileType,
  append: boolean
): ParseFileArgs => {
  return {
    command: Command.PARSE,
    configFile: fileNames[0],
    configFileType: configFileType as ConfigFileType,
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
  configFileType: FileType,
  append: boolean
): ParseGenFileArgs => {
  return {
    command: Command.PARSE_GEN,
    configFile: fileNames[0],
    configFileType: configFileType as ConfigFileType,
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
  const fileTypes: FileType[] = getArgsFileTypes(fileNames);
  if (command === Command.PARSE) {
    validateParseArgs(fileTypes);
    const configFileType = fileTypes[0];
    return getParseFileArgs(fileNames, configFileType, append);
  } else if (command === Command.GEN) {
    validateGenArgs(fileTypes);
    return getGenFileArgs(fileNames);
  } else {
    // PARSE_GEN
    validateParseGenArgs(fileTypes);
    const configFileType = fileTypes[0];
    return getParseGenFileArgs(fileNames, configFileType, append);
  }
};
