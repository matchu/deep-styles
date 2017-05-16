// @flow
export type CSSStyleValue = string;
export type CSSDOMStyleMap = {
    [propertyName: string]: CSSStyleValue,
};
export type DOMElementStyleProps = {
    className?: string,
    style?: CSSDOMStyleMap,
};
