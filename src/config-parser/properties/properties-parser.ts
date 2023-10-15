import { KeyValuePairs } from "../shared/types/key-value.type";
import {
  splitLineIntoKeyValue,
  splitPropertiesIntoLines,
} from "./utils/properties-utils";

const parseProperties = (content: string): KeyValuePairs => {
  const lines = splitPropertiesIntoLines(content);
  const keyValuePairs = lines.map(splitLineIntoKeyValue);
  return keyValuePairs;
};

export const parseDotProperties = (content: string): KeyValuePairs => {
  return parseProperties(content);
};
