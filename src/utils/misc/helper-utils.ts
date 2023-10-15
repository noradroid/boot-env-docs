import { cloneDeep, isEqual } from "lodash/fp";

export const isString = (value: any): boolean => {
  return typeof value === "string" || value instanceof String;
};

export const isObjsEqual = (obj1: any, obj2: any): boolean => {
  return isEqual(obj1, obj2);
};

export const clone = (obj: any): any => {
  return cloneDeep(obj);
};
