class PropertiesParseError extends Error {
  name = "PropertiesParseError";
  code = "MISSING_VALUE_ASSIGN";
  message: string;

  constructor(property: string) {
    super();
    this.message = `Property '${property}' is not assigned a value`;
  }
}

const formatPropertiesParseError = (err: PropertiesParseError): string => {
  return `${err.name} - caused by ${err.code}`;
};

const isNonEmptyLine = (line: string): boolean => {
  return line.trim().length > 0;
};

const isLineValid = (line: string): boolean => {
  const EQUAL_SEPARATOR = "=";
  if (!line.includes(EQUAL_SEPARATOR)) {
    throw new PropertiesParseError(line);
  } else {
    return true;
  }
};

const parseProperties = (content: string): boolean => {
  const NEWLINE_SEPARATOR = "\n";
  const lines = content.split(NEWLINE_SEPARATOR).filter(isNonEmptyLine);

  try {
    lines.forEach(isLineValid);
    return true;
  } catch (err) {
    // PropertiesParseError
    if (err instanceof PropertiesParseError) {
      console.error(formatPropertiesParseError(err));
      // PropertiesParseError - caused by MISSING_VALUE_ASSIGN
      // = Property is not assigned a value
    } else {
      console.error(err);
    }
    return false;
  }
};

export const validateDotProperties = (content: string): boolean => {
  return parseProperties(content);
};
