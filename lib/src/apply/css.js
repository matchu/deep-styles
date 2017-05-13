// @flow
import type {StyleMap, StyleValue} from "../types.js";

export type CSSDOMStyleMap = {
    [propertyName: string]: CSSStyleValue,
};
type CSSStyleValue = string;

function kebabify(key: string): string {
    return key.replace(/[A-Z]/g, x => `-${x.toLowerCase()}`);
}

function convertToCSSStyleValue(value: StyleValue): CSSStyleValue {
    if (typeof value === "number") {
        return `${value}px`;
    } else {
        return value;
    }
}

export function convertToCSSDOMStyleMap(styles: StyleMap): CSSDOMStyleMap {
    const domProperties = {};
    for (const name of Object.keys(styles)) {
        domProperties[name] = convertToCSSStyleValue(styles[name]);
    }
    return domProperties;
}

export function convertToCSSString(
    selector: string, styles: StyleMap,
): string {
    let result = selector + "{";
    for (const name of Object.keys(styles)) {
        const value = convertToCSSStyleValue(styles[name]);
        result += `${kebabify(name)}: ${value};`;
    }
    result += "}";

    return result;
}
