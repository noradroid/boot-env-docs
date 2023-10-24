import { FileType } from "../../config-parser/shared/types/file.type";
import { Command } from "./command.type";
import { Version } from "../../shared/models/version.type";

export type CommandArgs =
  | ParseCommandArgs
  | GenCommandArgs
  | ParseGenCommandArgs;

export type ParseCommandArgs = {
  command: Command.PARSE;
} & ConfigFile &
  JsonFile & {
    append: boolean;
    version?: Version;
  };

export type GenCommandArgs = {
  command: Command.GEN;
} & JsonFile &
  MdFile;

export type ParseGenCommandArgs = {
  command: Command.PARSE_GEN;
} & ConfigFile &
  JsonFile &
  MdFile & {
    append: boolean;
    version?: Version;
  };

export type ConfigFile = {
  configFile: string;
  configFileType: FileType;
};

export type JsonFile = {
  jsonFile: string;
};

export type MdFile = {
  mdFile: string;
};
