export class PropertiesParseError extends Error {
  name = "PropertiesParseError";
  code = "MISSING_VALUE_ASSIGN";
  message: string;

  constructor(property: string) {
    super();
    this.message = `Property '${property}' is not assigned a value`;
  }
}
