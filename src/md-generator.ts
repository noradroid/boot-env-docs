import { Markdown, bold } from "@scdev/declarative-markdown";
import { EnvVarArr } from "./env-var-info.type";

const parseTextIntoCode = (text: string): string => {
  return `
\`\`\`
${text}
\`\`\`
  `;
};

export const generateMdFromJson = (jsonArr: EnvVarArr): string => {
  const md = new Markdown("Environment Variables Documentation");

  jsonArr.forEach((info) => {
    md.header(info.envVar, 3).paragraph(info.description);

    md.paragraph(`${bold("Type:")} ${info.type ?? "unknown"}`);

    md.paragraph(`${bold("Default value:")}`);

    md.paragraph(
      `${parseTextIntoCode(info.instances[0].default ?? "<empty>")}`
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
