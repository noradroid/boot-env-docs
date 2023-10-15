import { Command } from "./command.type";

export type FileArgs = ParseFileArgs | GenFileArgs | ParseGenFileArgs;

export type ParseFileArgs = {
  command: Command.PARSE;
} & ConfigFile &
  JsonFile & {
    append: boolean;
  };

export type GenFileArgs = {
  command: Command.GEN;
} & JsonFile &
  MdFile;

export type ParseGenFileArgs = {
  command: Command.PARSE_GEN;
} & ConfigFile &
  JsonFile &
  MdFile & {
    append: boolean;
  };

export type ConfigFile = {
  configFile: string;
};

export type JsonFile = {
  jsonFile: string;
};

export type MdFile = {
  mdFile: string;
};
