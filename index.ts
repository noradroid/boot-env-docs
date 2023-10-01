import getFileName from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import { getEnvVarInfoDict } from "./src/env-var-parser";

const fileName = getFileName();

const file = readFile(fileName);

const properties = parseYamlProperties(file);

const variables = getEnvVarInfoDict(properties);
