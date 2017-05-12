// @flow
import type {PropertiesMap, StyleValue} from "./types.js";

export type DOMPropertiesMap = {
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

export function convertToDOMPropertiesMap(
    properties: PropertiesMap,
): DOMPropertiesMap {
    const domProperties = {};
    for (const name of Object.keys(properties)) {
        const styleValue = properties[name].styleValue;
        domProperties[name] = convertToCSSStyleValue(styleValue);
    }
    return domProperties;
}

export function convertToCSSString(
    selector: string, properties: PropertiesMap,
): string {
    let result = selector + "{";
    for (const name of Object.keys(properties)) {
        const value = convertToCSSStyleValue(properties[name].styleValue);
        result += `${kebabify(name)}: ${value};`;
    }
    result += "}";

    return result;
}
