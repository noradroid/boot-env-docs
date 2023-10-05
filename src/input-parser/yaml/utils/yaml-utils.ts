import { Document } from "yaml";

export const isDocumentValid = (document: Document): boolean => {
  if (document.errors.length > 0) {
    throw document.errors[0];
  } else {
    return true;
  }
};
