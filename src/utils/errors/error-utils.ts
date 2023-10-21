import { YAMLParseError } from "yaml";

import { ArgParseError } from "../../arg-parser/errors/arg-parse.error";
import { PropertiesParseError } from "../../config-parser/properties/errors/properties-parse.error";
import { EnvVarParseError } from "../../env-var-parser/errors/env-var-parse.error";
import { FileNonExistentError } from "../file/errors/file-non-existent.error";
import { FileTypeError } from "../file/errors/file-type.error";

/**
 * Format PropertiesParseError or YAMLParseError or EnvVarParseError to display name and code.
 * @param err PropertiesParseError or YAMLParseError or EnvVarParseError
 */
export const formatParseError = (
  err:
    | PropertiesParseError
    | YAMLParseError
    | EnvVarParseError
    | ArgParseError
    | FileNonExistentError
    | FileTypeError
): string => {
  return `${err.name} - caused by ${err.code}`;
};
