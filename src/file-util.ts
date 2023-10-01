import fs from "fs";

const main = (fileName: string): string => {
  if (!fs.existsSync(fileName)) {
    console.error(`${fileName} does not exist`);
    process.exit(1);
  }

  console.log(`${fileName} exists`);

  const file = fs.readFileSync(fileName, "utf8");

  return file;
};

export default main;
