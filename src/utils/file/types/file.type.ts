import {
  JSON_EXT,
  MD_EXT,
  PROPERTIES_EXT,
  YAML_EXT,
} from "../constants/file-extensions";

export enum FileType {
  YAML = YAML_EXT,
  PROPERTIES = PROPERTIES_EXT,
  JSON = JSON_EXT,
  MD = MD_EXT,
}

export enum ConfigFileType {
  YAML = YAML_EXT,
  PROPERTIES = PROPERTIES_EXT,
}
