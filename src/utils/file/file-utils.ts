import fs from "fs";

const validateFileExists = (fileName: string): void => {
  if (!fs.existsSync(fileName)) {
    console.error(`${fileName} does not exist`);
    process.exit(1);
  }
};

export const readFile = (fileName: string): string => {
  validateFileExists(fileName);
  console.log(`${fileName} exists`);

  const file = fs.readFileSync(fileName, "utf8");
  return file;
};

export const writeFile = (fileName: string, contents: string): void => {
  try {
    fs.writeFileSync(fileName, contents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
