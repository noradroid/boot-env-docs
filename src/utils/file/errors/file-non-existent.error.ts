export class FileNonExistentError extends Error {
  name = "FileNonExistentError";
  code = "FILE_NON_EXISTENT";
  message: string;

  constructor(fileName: string) {
    super();
    this.message = `File ${fileName} does not exist.`;
  }
}
