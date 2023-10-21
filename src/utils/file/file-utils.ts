import fs from "fs";

import { formatParseError } from "../errors/error-utils";
import {
  JSON_EXT,
  MD_EXT,
  PROPERTIES_EXT,
  YAML_EXT,
  YML_EXT,
} from "./constants/file-extensions";
import { FileNonExistentError } from "./errors/file-non-existent.error";
import { FileTypeError } from "./errors/file-type.error";
import { FileType } from "./types/file.type";

export const isFileExist = (fileName: string): boolean => {
  return fs.existsSync(fileName);
};

const validateFileExists = (fileName: string): void => {
  if (!isFileExist(fileName)) {
    throw new FileNonExistentError(fileName);
  }
};

export const readFile = (fileName: string): string => {
  try {
    validateFileExists(fileName);
    console.log(`${fileName} exists`);

    const file = fs.readFileSync(fileName, "utf8");
    return file;
  } catch (err) {
    if (err instanceof FileNonExistentError) {
      console.error(formatParseError(err) + ` - ${err.message}`);
      // FileNonExistentError - caused by FILE_NON_EXISTENT
      // File does not exist.
    } else {
      console.error(err);
    }
    process.exit(1);
  }
};

export const writeFile = (fileName: string, contents: string): void => {
  try {
    fs.writeFileSync(fileName, contents);
  } catch (err) {
    throw err;
  }
};

export const isYamlFile = (fileName: string): boolean => {
  const name = fileName.toLowerCase();
  return name.endsWith(YAML_EXT) || name.endsWith(YML_EXT);
};

export const isPropertiesFile = (fileName: string): boolean => {
  const name = fileName.toLowerCase();
  return name.endsWith(PROPERTIES_EXT);
};

export const isJsonFile = (fileName: string): boolean => {
  const name = fileName.toLowerCase();
  return name.endsWith(JSON_EXT);
};

export const isMdFile = (fileName: string): boolean => {
  const name = fileName.toLowerCase();
  return name.endsWith(MD_EXT);
};

export const getFileType = (fileName: string): FileType => {
  if (isYamlFile(fileName)) {
    return FileType.YAML;
  } else if (isPropertiesFile(fileName)) {
    return FileType.PROPERTIES;
  } else if (isJsonFile(fileName)) {
    return FileType.JSON;
  } else if (isMdFile(fileName)) {
    return FileType.MD;
  } else {
    throw new FileTypeError(fileName, [
      FileType.YAML,
      FileType.PROPERTIES,
      FileType.JSON,
      FileType.MD,
    ]);
  }
};
