"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileType = void 0;
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
        throw new Error("Invalid file type!");
    }
};
exports.getFileType = getFileType;
