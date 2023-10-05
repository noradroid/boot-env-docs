import { Property } from "./property.type";
import parseProperties from "./properties-parser";
import parseYaml from "./yaml-parser";
import { getFileType } from "../../input-parser/shared/utils/file-type.utils";
import { FileType } from "../../input-parser/shared/types/file.type";

const main = (file: string, fileName: string): Property[] => {
  const fileType: FileType = getFileType(fileName);
  if (fileType === FileType.YAML) {
    return parseYaml(file);
  } else {
    return parseProperties(file);
  }
};

export default main;
