import { formatParseError } from "../utils/error-utils";
import { PropertiesParseError } from "./errors/properties-parse.error";
import {
  isLineValid,
  splitPropertiesIntoLines,
} from "./utils/properties-utils";

const parseProperties = (content: string): boolean => {
  const lines = splitPropertiesIntoLines(content);

  try {
    lines.forEach(isLineValid);
    return true;
  } catch (err) {
    // PropertiesParseError
    if (err instanceof PropertiesParseError) {
      console.error(formatParseError(err));
      // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
      // = Property is not assigned a value
    } else {
      console.error(err);
    }
    return false;
  }
};

/**
 * Return true if content is valid properties.
 * @param content - Properties file content
 */
export const validateDotProperties = (content: string): boolean => {
  return parseProperties(content);
};
