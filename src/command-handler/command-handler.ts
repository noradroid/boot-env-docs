import {
  GenCommandArgs,
  ParseCommandArgs,
  ParseGenCommandArgs,
} from "../arg-parser/types/file-args.type";
import { EnvVarStore } from "../shared/models/env-var-store/env-vars-info.type";
import { readFile } from "../utils/file/file-utils";
import {
  convertConfigToEnvVarStore,
  writeJsonFile,
  writeMdFile,
} from "./command-handler-utils";

export const parseCmdHandler = (args: ParseCommandArgs): void => {
  const envVarStore: EnvVarStore = convertConfigToEnvVarStore(
    args.configFile,
    args.configFileType,
    args.jsonFile,
    args.update,
    args.version
  );

  writeJsonFile(args.jsonFile, envVarStore);
};

export const genCmdHandler = (args: GenCommandArgs): void => {
  const envVarStore: EnvVarStore = JSON.parse(readFile(args.jsonFile));

  writeMdFile(args.mdFile, envVarStore);
};

export const parseGenCmdHandler = (args: ParseGenCommandArgs): void => {
  const envVarStore: EnvVarStore = convertConfigToEnvVarStore(
    args.configFile,
    args.configFileType,
    args.jsonFile,
    args.update,
    args.version
  );

  writeJsonFile(args.jsonFile, envVarStore);

  writeMdFile(args.mdFile, envVarStore);
};
