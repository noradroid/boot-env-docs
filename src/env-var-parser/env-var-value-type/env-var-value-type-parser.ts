import { DefaultValue } from "../types/default-value.type";
import { ValueType } from "./types/value-type.type";

const isEmpty = (value: string): boolean => {
  return value === "";
};

const isNumber = (value: string): boolean => {
  return value.length === 0 ? false : !Number.isNaN(Number(value));
};

const isBoolean = (value: string): boolean => {
  return value.toLowerCase() === "true" || value.toLowerCase() === "false";
};

export const getValueType = (value: string): ValueType => {
  if (isEmpty(value)) {
    return "unknown";
  } else if (isNumber(value)) {
    return "number";
  } else if (isBoolean(value)) {
    return "boolean";
  } else {
    return "string";
  }
};

const convertIntoNumber = (value: string): number => {
  return Number(value);
};

const convertIntoBoolean = (value: string): boolean => {
  return value.toLowerCase() === "true";
};

export const convertValueIntoType = (
  value: string,
  type: ValueType
): DefaultValue => {
  if (type === "unknown") {
    return null;
  } else if (type === "number") {
    return convertIntoNumber(value);
  } else if (type === "boolean") {
    return convertIntoBoolean(value);
  } else {
    return value;
  }
};
