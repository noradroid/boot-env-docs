import { Markdown, bold } from "@scdev/declarative-markdown";
import { EnvVarArr } from "./env-var-info.type";

export const generateMdFromJson = (jsonArr: EnvVarArr): string => {
  const md = new Markdown("Environment Variables Documentation");

  jsonArr.forEach((info) => {
    md.header(info.envVar, 3).paragraph("Description");

    md.paragraph(`${bold("Type:")} ${info.type ?? "unknown"}`);

    if (info.envVar === "server.servlet.context-path") {
      console.log(info);
    }

    md.paragraph(`${bold("Used in:")}`);
    md.table(
      ["Property", "Default value"],
      [
        ...info.instances.map((instance) => [
          instance.key,
          instance.default ?? "-",
        ]),
      ]
    );
  });

  return md.render();
};
