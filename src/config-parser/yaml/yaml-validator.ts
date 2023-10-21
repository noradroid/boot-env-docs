import { Document, parseAllDocuments } from "yaml";

import { isDocumentValid } from "./utils/yaml-utils";

const validateYaml = (content: string): boolean => {
  const result: Document[] = parseAllDocuments(content);
  return result.every(isDocumentValid);
};

/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
export const validateDotYaml = (content: string): boolean => {
  return validateYaml(content);
};
