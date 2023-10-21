import { FileType } from "../types/file.type";

export class FileTypeError extends Error {
  name = "FileTypeError";
  code = "INVALID_FILE_TYPE";
  message: string;

  constructor(fileName: string, validFileTypes: FileType[]) {
    super();
    this.message = `File ${fileName} is not a valid file type of either ${validFileTypes.join(
      ", "
    )}`;
  }
}
