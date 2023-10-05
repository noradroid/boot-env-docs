import { Document, parseAllDocuments, YAMLParseError } from "yaml";

const formatYAMLParseError = (err: YAMLParseError): string => {
  return `${err.name} - caused by ${err.code}`;
};

const isDocumentValid = (document: Document): boolean => {
  if (document.errors.length > 0) {
    throw document.errors[0];
  } else {
    return true;
  }
};

const parseYaml = (content: string): boolean => {
  try {
    const result: Document[] = parseAllDocuments(content);
    return result.every(isDocumentValid);
  } catch (err) {
    // YAMLParseError
    if (err instanceof YAMLParseError) {
      console.error(formatYAMLParseError(err));
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
