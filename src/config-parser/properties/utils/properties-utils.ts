import { KeyValue } from "../../shared/types/key-value.type";
import {
  COMMENT_CHARACTER,
  EQUAL_SEPARATOR,
  NEWLINE_SEPARATOR,
} from "../constants/tokens";
import { PropertiesParseError } from "../errors/properties-parse.error";
import { Line } from "../types/line.type";

const trimLine = (line: string): string => {
  return line.trim();
};

const isNotEmptyLine = (line: string): boolean => {
  return line.length > 0;
};

const isNotComment = (line: string): boolean => {
  return !line.startsWith(COMMENT_CHARACTER);
};

export const isLineValid = (line: string): void => {
  if (!line.includes(EQUAL_SEPARATOR)) {
    throw new PropertiesParseError(line);
  }
};

export const splitPropertiesIntoLines = (content: string): Line[] => {
  return content
    .split(NEWLINE_SEPARATOR)
    .map(trimLine)
    .filter(isNotEmptyLine)
    .filter(isNotComment);
};

/**
 * Split line into key-value pair.
 * @param line - Line containing property key and value
 */
export const splitLineIntoKeyValue = (line: Line): KeyValue => {
  const equalSeparatorIndex = line.indexOf(EQUAL_SEPARATOR);
  const key: string = line.substring(0, equalSeparatorIndex).trim();
  const value: string = line.substring(equalSeparatorIndex + 1).trim();
  return { key, value };
};
