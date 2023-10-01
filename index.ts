import getFileName from "./src/arg-parser";
import readFile from "./src/file-util";
import parseYamlProperties from "./src/yaml-parser";
import getEnvVars from "./src/env-var-parser";

const fileName = getFileName();

const file = readFile(fileName);

const properties = parseYamlProperties(file);

const variables: any = {};

properties.forEach((prop) => {
  const envVars = getEnvVars(prop);
  envVars.forEach((envVar) => {
    if (!(envVar.envVar in variables)) {
      variables[envVar.envVar] = { envVar: envVar.envVar, instances: [] };
    }
    variables[envVar.envVar].instances.push({
      key: prop.key,
      default: envVar.default,
    });
  });
});

console.log(JSON.stringify(variables, undefined, 2));
