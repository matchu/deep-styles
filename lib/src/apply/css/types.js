// @flow
import type {StyleProperty, StyleValue} from "../../types.js";

export type StyleMap = {
    [propertyName: string]: StyleValue,
};

export type CSSStyleValue = string;
export type CSSDOMStyleMap = {
    [propertyName: string]: CSSStyleValue,
};
