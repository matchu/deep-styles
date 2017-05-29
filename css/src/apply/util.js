// @flow
import type {StyleProperty, StyleValue} from "deep-styles-core";
import type {CSSStyleValue, CSSDOMStyleMap, StyleMap} from "../types";

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

export function flattenPropertiesToStyleMap(
    properties: Array<StyleProperty>,
): StyleMap {
    const styles = {};
    for (const property of properties) {
        styles[property.name] = property.value;
    }
    return styles;
}
