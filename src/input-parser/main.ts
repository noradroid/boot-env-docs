import { FileType } from "./shared/types/file.type";
import { getFileType } from "./shared/utils/file-type.utils";
import { validateDotYaml } from "./yaml/yaml-validator";
import readFile from "../utils/file/file-util";
import { validateDotProperties } from "./properties/properties-validator";
import { KeyValuePairs } from "./shared/types/key-value.type";
import { parseDotProperties } from "./properties/properties-parser";
import { parseDotYaml } from "./yaml/yaml-parser";

const main = (fileName: string) => {
  const fileType = getFileType(fileName);

  const contents: string = readFile(fileName);

  if (fileType === FileType.YAML) {
    const valid = validateDotYaml(contents);
    if (!valid) {
      console.error("Invalid yaml file. Program terminating...");
      process.exit(1);
    }
    const keyValuePairs: KeyValuePairs = parseDotYaml(contents);
    return keyValuePairs;
  } else {
    const valid = validateDotProperties(contents);
    if (!valid) {
      console.error("Invalid properties file. Program terminating...");
      process.exit(1);
    }
    const keyValuePairs: KeyValuePairs = parseDotProperties(contents);
    return keyValuePairs;
  }
};

export default main;
