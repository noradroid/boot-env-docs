"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNonExistentError = void 0;
class FileNonExistentError extends Error {
    constructor(fileName) {
        super();
        this.name = "FileNonExistentError";
        this.code = "FILE_NON_EXISTENT";
        this.message = `File ${fileName} does not exist.`;
    }
}
exports.FileNonExistentError = FileNonExistentError;
