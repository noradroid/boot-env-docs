import * as process from "process";

/**
 * Check if the file flag (-f) is provided in the args.
 * @param {string[]} args - Program arguments
 * @return {boolean} True if the file flag is provided, false otherwise
 */
const containsFileFlag = (args: string[]): boolean => {
  return args.includes("-f");
};

const getFileIndex = (args: string[]): number => {
  const fileFlagIndex = args.findIndex((arg) => arg === "-f");
  const fileIndex = fileFlagIndex + 1;
  return fileIndex < args.length ? fileIndex : -1;
};

const getFileArg = (args: string[]): string => {
  if (containsFileFlag(args)) {
    const fileIndex = getFileIndex(args);
    if (fileIndex >= 0) {
      return args[fileIndex];
    }
    console.error("File name was not provided.");
    process.exit(1);
  }
  console.error("File flag (-f) was not provided.");
  process.exit(1);
};

/**
 * Parse and return file name from program arguments.
 * @return File name
 */
const main = (): string => {
  if (process.argv.length === 2) {
    console.error("Expected at least one argument.");
    process.exit(1);
  }

  const args = process.argv.slice(2);

  return getFileArg(args);
};

export default main;
