"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileType = void 0;
const file_type_error_1 = require("../../../utils/file/errors/file-type.error");
const file_extensions_1 = require("../constants/file-extensions");
const file_type_1 = require("../types/file.type");
const getFileType = (fileName) => {
    const name = fileName.toLowerCase();
    if (name.endsWith(file_extensions_1.YAML_EXT) || name.endsWith(file_extensions_1.YML_EXT)) {
        return file_type_1.FileType.YAML;
    }
    else if (name.endsWith(file_extensions_1.PROPERTIES_EXT)) {
        return file_type_1.FileType.PROPERTIES;
    }
    else {
        throw new file_type_error_1.FileTypeError(fileName, [file_type_1.FileType.YAML, file_type_1.FileType.PROPERTIES]);
    }
};
exports.getFileType = getFileType;
