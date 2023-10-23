import { Markdown, bold } from "@scdev/declarative-markdown";
import { EnvVarsDict } from "../env-var-parser/types/env-var-data.type";

const parseTextIntoCode = (text: string): string => {
  return `
\`\`\`
${text}
\`\`\`
  `;
};

export const generateMdFromJson = (dict: EnvVarsDict): string => {
  const md = new Markdown("Environment Variables Documentation");

  Object.values(dict).forEach((info) => {
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
