import {
  isLineValid,
  splitPropertiesIntoLines,
} from "./utils/properties-utils";

const validateProperties = (content: string): void => {
  const lines = splitPropertiesIntoLines(content);
  lines.forEach(isLineValid);
};

/**
 * Return true if content is valid properties.
 * @param content - Properties file content
 */
export const validateDotProperties = (content: string): void => {
  validateProperties(content);
};
