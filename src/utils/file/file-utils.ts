import fs from "fs";

import {
  JSON_EXT,
  MD_EXT,
  PROPERTIES_EXT,
  YAML_EXT,
  YML_EXT,
} from "./constants/file-extensions";
import { FileType } from "./types/file.type";

const validateFileExists = (fileName: string): void => {
  if (!fs.existsSync(fileName)) {
    throw new Error(`${fileName} does not exist`);
  }
};

export const readFile = (fileName: string): string => {
  validateFileExists(fileName);
  console.log(`${fileName} exists`);

  const file = fs.readFileSync(fileName, "utf8");
  return file;
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
    throw new Error("Invalid file type!");
  }
};
