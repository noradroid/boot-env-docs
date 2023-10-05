import { YAMLParseError } from "yaml";

import { PropertiesParseError } from "../../properties/errors/properties-parse.error";

/**
 * Format PropertiesParseError or YAMLParseError to display name and code.
 * @param err PropertiesParseError or YAMLParseError
 */
export const formatParseError = (
  err: PropertiesParseError | YAMLParseError
): string => {
  return `${err.name} - caused by ${err.code}`;
};
