import { YAMLParseError } from "yaml";
import { formatParseError } from "../utils/errors/error-utils";
import { readFile } from "../utils/file/file-utils";
import { PropertiesParseError } from "./properties/errors/properties-parse.error";
import { parseDotProperties } from "./properties/properties-parser";
import { validateDotProperties } from "./properties/properties-validator";
import { FileType } from "./shared/types/file.type";
import { KeyValuePairs } from "./shared/types/key-value.type";
import { parseDotYaml } from "./yaml/yaml-parser";
import { validateDotYaml } from "./yaml/yaml-validator";

export const parseInputFileIntoKeyValuePairs = (
  fileName: string,
  fileType: FileType
) => {
  try {
    const contents: string = readFile(fileName);

    if (fileType === FileType.YAML) {
      validateDotYaml(contents);
      const keyValuePairs: KeyValuePairs = parseDotYaml(contents);
      return keyValuePairs;
    } else {
      validateDotProperties(contents);
      const keyValuePairs: KeyValuePairs = parseDotProperties(contents);
      return keyValuePairs;
    }
  } catch (err) {
    if (err instanceof YAMLParseError) {
      console.error(formatParseError(err) + ` - ${err.message}`);
      // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
      // Nested mappings are not allowed in compact mappings
    } else if (err instanceof PropertiesParseError) {
      console.error(formatParseError(err) + ` - ${err.message}`);
      // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
      // Property is not assigned a value
    } else {
      console.error(err);
    }
    process.exit(1);
  }
};
