import { Property } from "./property.type";
import { EQUAL_SEPARATOR } from "./tokens";

const getProperties = (file: string): Property[] => {
  const lines = file
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 1 && !line.startsWith("#"));
  const properties: Property[] = lines.map((line) => {
    const equalSeparatorIndex = getEqualSeparatorIndex(line);
    if (equalSeparatorIndex === -1) {
      console.error("Properties file is invalid.");
      process.exit(1);
    }

    if (equalSeparatorIndex === line.length - 1) {
      return {
        key: line.substring(0, equalSeparatorIndex),
        value: "",
      };
    } else {
      return {
        key: line.substring(0, equalSeparatorIndex),
        value: line.substring(equalSeparatorIndex + 1),
      };
    }
  });
  return properties;
};

const getEqualSeparatorIndex = (value: string): number => {
  return value.indexOf(EQUAL_SEPARATOR);
};

const main = (file: string): Property[] => {
  const properties: Property[] = getProperties(file);

  console.log(properties);

  return properties;
};

export default main;
