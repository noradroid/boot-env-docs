import { Version } from "../shared/models/version.type";
import { getFileType } from "../utils/file/file-utils";
import { ConfigFileType, FileType } from "../utils/file/types/file.type";
import {
  GEN_CMD,
  GEN_CMD_SH,
  PARSE_CMD,
  PARSE_CMD_SH,
  PARSE_GEN_CMD,
  PARSE_GEN_CMD_SH,
} from "./constants/commands";
import { UPDATE_FLAG, VERSION_FLAG } from "./constants/flags";
import { ArgParseError } from "./errors/arg-parse.error";
import { Command } from "./types/command.type";
import {
  CommandArgs,
  GenCommandArgs,
  ParseCommandArgs,
  ParseGenCommandArgs,
} from "./types/file-args.type";

export const checkArgsProvided = (): void => {
  if (process.argv.length === 2) {
    throw new ArgParseError("INVALID_COMMAND");
  }
};

export const getArgs = (): string[] => {
  return process.argv.slice(2);
};

export const getFileNames = (
  args: string[],
  update: boolean,
  hasVersion: boolean
): string[] => {
  const argsAfterCmd = args.slice(1);
  if (update) {
    const updateIndex = argsAfterCmd.findIndex((arg) => arg === UPDATE_FLAG);
    argsAfterCmd.splice(updateIndex, 1);
  }
  if (hasVersion) {
    const versionIndex = argsAfterCmd.findIndex((arg) => arg === VERSION_FLAG);
    argsAfterCmd.splice(versionIndex, 2);
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

// update flag

export const getUpdateFlag = (args: string[]): boolean => {
  const update = args.find((a) => a === UPDATE_FLAG);
  return !!update;
};

// version flag

const isLastIndex = (arr: string[], index: number): boolean => {
  return index === arr.length - 1;
};

export const getVersionArg = (args: string[]): Version | undefined => {
  const versionFlagIndex = args.findIndex((a) => a === VERSION_FLAG);
  if (versionFlagIndex !== -1 && !isLastIndex(args, versionFlagIndex)) {
    return args[versionFlagIndex + 1];
  } else {
    return undefined;
  }
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
  update: boolean
): ParseCommandArgs => {
  return {
    command: Command.PARSE,
    configFile: fileNames[0],
    configFileType: getFileType(fileNames[0]) as unknown as ConfigFileType,
    jsonFile: fileNames[1],
    update: update,
  };
};

const getGenFileArgs = (fileNames: string[]): GenCommandArgs => {
  return {
    command: Command.GEN,
    jsonFile: fileNames[0],
    mdFile: fileNames[1],
  };
};

const getParseGenFileArgs = (
  fileNames: string[],
  update: boolean
): ParseGenCommandArgs => {
  return {
    command: Command.PARSE_GEN,
    configFile: fileNames[0],
    configFileType: getFileType(fileNames[0]) as unknown as ConfigFileType,
    jsonFile: fileNames[1],
    mdFile: fileNames[2],
    update: update,
  };
};

export const getFileArgs = (
  command: Command,
  fileNames: string[],
  update: boolean,
  version: Version | undefined
): CommandArgs => {
  if (command === Command.PARSE) {
    validateParseArgs(fileNames);
    return { ...getParseFileArgs(fileNames, update), version: version };
  } else if (command === Command.GEN) {
    validateGenArgs(fileNames);
    return getGenFileArgs(fileNames);
  } else {
    // PARSE_GEN
    validateParseGenArgs(fileNames);
    return { ...getParseGenFileArgs(fileNames, update), version: version };
  }
};
