// @flow
import type {StyleProperty, StyleValue} from "deep-styles-core";

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
