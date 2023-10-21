"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileTypeError = void 0;
class FileTypeError extends Error {
    constructor(fileName, validFileTypes) {
        super();
        this.name = "FileTypeError";
        this.code = "INVALID_FILE_TYPE";
        this.message = `File ${fileName} is not a valid file type of either ${validFileTypes.join(", ")}`;
    }
}
exports.FileTypeError = FileTypeError;
