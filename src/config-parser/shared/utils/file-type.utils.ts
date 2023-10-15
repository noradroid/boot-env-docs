import {
  PROPERTIES_EXT,
  YAML_EXT,
  YML_EXT,
} from "../constants/file-extensions";
import { FileType } from "../types/file.type";

export const getFileType = (fileName: string): FileType => {
  const name = fileName.toLowerCase();
  if (name.endsWith(YAML_EXT) || name.endsWith(YML_EXT)) {
    return FileType.YAML;
  } else if (name.endsWith(PROPERTIES_EXT)) {
    return FileType.PROPERTIES;
  } else {
    throw new Error("Invalid file type!");
  }
};
