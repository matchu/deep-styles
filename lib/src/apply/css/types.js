// @flow
import type {StyleProperty, StyleValue} from "../../types.js";
import type {CSSStyleValue, CSSDOMStyleMap} from "./exported-types.js";
export type {CSSStyleValue, CSSDOMStyleMap};

export type StyleMap = {
    [propertyName: string]: StyleValue,
};
