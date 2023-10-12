import { Document, parseAllDocuments } from "yaml";
import { KeyValuePairs } from "../shared/types/key-value.type";
import { convertDocumentIntoKeyValuePairs } from "./utils/yaml-utils";

const parseYaml = (content: string): KeyValuePairs => {
  const documents: Document[] = parseAllDocuments(content);
  const keyValuePairs = documents.flatMap(convertDocumentIntoKeyValuePairs);
  console.log(keyValuePairs);
  return keyValuePairs;
};

export const parseDotYaml = (content: string): KeyValuePairs => {
  return parseYaml(content);
};
