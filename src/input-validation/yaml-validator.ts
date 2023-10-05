import { Document, parse, parseAllDocuments, YAMLParseError } from "yaml";

const formatYAMLParseError = (err: YAMLParseError): string => {
  return `${err.name} - caused by ${err.code}`;
};

const parseSingleDocument = (content: string): boolean => {
  try {
    parse(content);
    return true;
  } catch (err) {
    // YAMLParseError
    if (err instanceof YAMLParseError) {
      console.error(formatYAMLParseError(err)); // YAMLParseError - caused by MULTIPLE_DOCS
    } else {
      console.error(err);
    }
    return false;
  }
};

const multiDocumentContainsError = (documents: Document[]): boolean => {
  return documents.some((document) => {
    if (document.errors.length > 0) {
      // YAMLParseError
      console.log(formatYAMLParseError(document.errors[0]));
      // YAMLParseError - caused by BLOCK_AS_IMPLICIT_KEY
      // = Nested mappings are not allowed in compact mappings
    }
  });
};

const parseMultiDocument = (content: string): boolean => {
  try {
    const result: Document[] = parseAllDocuments(content);
    return !multiDocumentContainsError(result);
  } catch (err) {
    // YAMLParseError
    console.error(err);
    return false;
  }
};

/**
 * Return true if content is valid yaml.
 * @param content - Yaml file content
 */
export const validateYaml = (content: string): boolean => {
  return parseSingleDocument(content) || parseMultiDocument(content);
};
