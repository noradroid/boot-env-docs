#!/usr/bin/env node

import { parseArgs } from "./arg-parser/arg-parser";
import { Command } from "./arg-parser/types/command.type";
import {
  genCmdHandler,
  parseCmdHandler,
  parseGenCmdHandler,
} from "./command-handler/command-handler";

const main = () => {
  const args = parseArgs();

  if (args.command === Command.PARSE) {
    parseCmdHandler(args);
  } else if (args.command === Command.GEN) {
    genCmdHandler(args);
  } else {
    parseGenCmdHandler(args);
  }
};

main();
