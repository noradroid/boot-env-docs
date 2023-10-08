import { KeyValue } from "../../shared/types/key-value.type";
import { EQUAL_SEPARATOR, NEWLINE_SEPARATOR } from "../constants/tokens";
import { PropertiesParseError } from "../errors/properties-parse.error";
import { Line } from "../types/line.type";

const isNonEmptyLine = (line: string): boolean => {
  return line.trim().length > 0;
};

export const isLineValid = (line: string): boolean => {
  if (!line.includes(EQUAL_SEPARATOR)) {
    throw new PropertiesParseError(line);
  } else {
    return true;
  }
};

export const splitPropertiesIntoLines = (content: string): Line[] => {
  return content.split(NEWLINE_SEPARATOR).filter(isNonEmptyLine);
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
