import { YAMLParseError } from "yaml";

import { EnvVarParseError } from "../../env-var-parser/errors/env-var-parse.error";
import { PropertiesParseError } from "../../input-parser/properties/errors/properties-parse.error";

/**
 * Format PropertiesParseError or YAMLParseError or EnvVarParseError to display name and code.
 * @param err PropertiesParseError or YAMLParseError or EnvVarParseError
 */
export const formatParseError = (
  err: PropertiesParseError | YAMLParseError | EnvVarParseError
): string => {
  return `${err.name} - caused by ${err.code}`;
};
