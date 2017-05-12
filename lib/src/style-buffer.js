// @flow
import stringHash from "string-hash";

import type {Rule} from "./types.js";
import {convertToCSSString} from "./css.js";

function hashObject(obj: Object): string {
    return stringHash(JSON.stringify(obj)).toString(36);
}

function generateClassName(rule: Rule): string {
    return `${rule.name}__${hashObject(rule.properties)}`;
}

class StyleBuffer {
    _element: HTMLStyleElement
    _cachedClassNames: {[className: string]: true} = {}

    constructor(element: HTMLStyleElement) {
        this._element = element;
    }

    addRuleAsCSSClass(rule: Rule): string {
        const className = generateClassName(rule);
        const isCached = className in this._cachedClassNames;
        if (!isCached) {
            const css = convertToCSSString("." + className, rule.properties);
            const cssTextNode = document.createTextNode(css);
            this._element.appendChild(cssTextNode);
            this._cachedClassNames[className] = true;
        }
        return className;
    }
}

export function createStyleBuffer(): StyleBuffer {
    const element = document.createElement("style");

    if (!document.head) {
        throw new Error("document.head not ready yet");
    }
    document.head.appendChild(element);

    return new StyleBuffer(element);
}

export type {StyleBuffer};
