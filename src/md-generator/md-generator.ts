import { Markdown, bold } from "@scdev/declarative-markdown";

import { EnvVarStore } from "../shared/models/env-var-store/env-vars-info.type";

const parseTextIntoCode = (text: string): string => {
  return `
\`\`\`
${text}
\`\`\`
  `;
};

export const generateMdFromJson = (envVarStore: EnvVarStore): string => {
  const envVarsDict = envVarStore.envVars;

  const md = new Markdown("Environment Variables Documentation");

  md.paragraph(`Last updated version: ${envVarStore.version ?? "<undefined>"}`);

  Object.values(envVarsDict).forEach((info) => {
    md.header(info.envVar, 3).paragraph(info.description);

    md.paragraph(`${bold("Type:")} ${info.type}`);

    md.paragraph(`${bold("Default value:")}`);

    md.paragraph(
      parseTextIntoCode(info.instances[0].default?.toString() ?? "<empty>")
    );

    md.paragraph(`${bold("Used in:")}`);
    md.table(
      ["Property"],
      [...info.instances.map((instance) => [instance.key])]
    );
  });

  md.tableOfContent();

  return md.render();
};
