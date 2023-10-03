import { FileType } from "./file-type";
import { Property } from "./property.type";
import parseProperties from "./properties-parser";
import parseYaml from "./yaml-parser";

const main = (file: string, fileName: string): Property[] => {
  const fileType: FileType =
    fileName.endsWith(FileType.YAML) || fileName.endsWith(FileType.YML)
      ? FileType.YAML
      : FileType.PROPERTIES;
  if (fileType === FileType.YAML) {
    return parseYaml(file);
  } else {
    return parseProperties(file);
  }
};

export default main;
