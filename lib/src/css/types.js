// @flow
import type {StyleProperty, StyleValue} from "../core/types";

export type CSSStyleValue = string;

export type CSSDOMStyleMap = {
    [propertyName: string]: CSSStyleValue,
};

export type DOMElementStyleProps = {
    className?: string,
    style?: CSSDOMStyleMap,
};

export type StyleMap = {
    [propertyName: string]: StyleValue,
};
