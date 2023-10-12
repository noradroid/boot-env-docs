import { Document, parseAllDocuments, YAMLParseError } from "yaml";

import { formatParseError } from "../../utils/error/error-utils";
import { isDocumentValid } from "./utils/yaml-utils";

const parseYaml = (content: string): boolean => {
  try {
    const result: Document[] = parseAllDocuments(content);
    return result.every(isDocumentValid);
  } catch (err) {
    // YAMLParseError
    if (err instanceof YAMLParseError) {
      console.error(formatParseError(err));
      // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
      // = Nested mappings are not allowed in compact mappings
    } else {
      console.error(err);
    }
    return false;
  }
};

/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
export const validateDotYaml = (content: string): boolean => {
  return parseYaml(content);
};
