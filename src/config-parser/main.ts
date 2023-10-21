import { YAMLParseError } from "yaml";
import { formatParseError } from "../utils/error/error-utils";
import { readFile } from "../utils/file/file-utils";
import { PropertiesParseError } from "./properties/errors/properties-parse.error";
import { parseDotProperties } from "./properties/properties-parser";
import { validateDotProperties } from "./properties/properties-validator";
import { FileType } from "./shared/types/file.type";
import { KeyValuePairs } from "./shared/types/key-value.type";
import { getFileType } from "./shared/utils/file-type.utils";
import { parseDotYaml } from "./yaml/yaml-parser";
import { validateDotYaml } from "./yaml/yaml-validator";

const main = (fileName: string) => {
  const fileType = getFileType(fileName);

  const contents: string = readFile(fileName);

  if (fileType === FileType.YAML) {
    try {
      validateDotYaml(contents);
    } catch (err) {
      if (err instanceof YAMLParseError) {
        console.error(formatParseError(err) + ` - ${err.message}`);
        // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
        // Nested mappings are not allowed in compact mappings
      } else {
        console.error(err);
      }

      console.error("Invalid yaml file. Program terminating...");
      process.exit(1);
    }
    const keyValuePairs: KeyValuePairs = parseDotYaml(contents);
    return keyValuePairs;
  } else {
    try {
      validateDotProperties(contents);
    } catch (err) {
      if (err instanceof PropertiesParseError) {
        console.error(formatParseError(err) + ` - ${err.message}`);
        // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
        // Property is not assigned a value
      } else {
        console.error(err);
      }
      console.error("Invalid properties file. Program terminating...");
      process.exit(1);
    }
    const keyValuePairs: KeyValuePairs = parseDotProperties(contents);
    return keyValuePairs;
  }
};

export default main;
