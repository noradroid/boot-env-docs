import * as process from "process";
import { Mode } from "./mode.enum";
import {
  INPUT_FLAG,
  JSON_OUTPUT_FLAG,
  MD_OUTPUT_FLAG,
  MODE_FLAG,
} from "./flags";
import { DEFAULT_JSON_OUTPUT, DEFAULT_MD_OUTPUT } from "./defaults-args";

/**
 * Check if the file flag (-f) is provided in the args.
 * @param {string[]} args - Program arguments
 * @param {string} flag - Flag
 * @return {boolean} True if the file flag is provided, false otherwise
 */
const containsFileFlag = (args: string[], flag: string): boolean => {
  return args.includes(flag);
};

const getFileIndex = (args: string[], flag: string): number => {
  const fileFlagIndex = args.findIndex((arg) => arg === flag);
  const fileIndex = fileFlagIndex + 1;
  return fileIndex < args.length ? fileIndex : -1;
};

const getInputFileArg = (args: string[], flag = INPUT_FLAG): string => {
  if (containsFileFlag(args, flag)) {
    const fileIndex = getFileIndex(args, flag);
    if (fileIndex >= 0) {
      return args[fileIndex];
    }
    console.error("File name was not provided.");
    process.exit(1);
  }
  console.error(`Flag (${flag}) was not provided.`);
  process.exit(1);
};

const getOutputFileArg = (
  args: string[],
  flag: string,
  defaultValue: string
): string => {
  if (containsFileFlag(args, flag)) {
    const fileIndex = getFileIndex(args, flag);
    if (fileIndex >= 0) {
      return "output/" + args[fileIndex];
    }
    console.log("File name was not provided.");
    process.exit(1);
  }
  console.log(`Flag (${flag}) was not provided. Defaulting to ${defaultValue}`);
  return defaultValue;
};

const getMode = (args: string[]): Mode => {
  if (args[0] === MODE_FLAG) {
    return args[1] === Mode.PARSE_YAML ? Mode.PARSE_YAML : Mode.PARSE_JSON;
  } else {
    return Mode.PARSE_YAML;
  }
};

/**
 * Parse and return program arguments - mode, input file name, json output file name, md output file name
 * @return string[]
 */
const main = (): [string, string, string, string] => {
  if (process.argv.length === 2) {
    console.error("Expected at least one argument.");
    process.exit(1);
  }

  const args = process.argv.slice(2);

  const mode: Mode = getMode(args);

  const inputFileName: string = getInputFileArg(args);

  const jsonOutputFileName: string = getOutputFileArg(
    args,
    JSON_OUTPUT_FLAG,
    DEFAULT_JSON_OUTPUT
  );

  const mdOutputFileName: string = getOutputFileArg(
    args,
    MD_OUTPUT_FLAG,
    DEFAULT_MD_OUTPUT
  );

  return [mode, inputFileName, jsonOutputFileName, mdOutputFileName];
};

export default main;
