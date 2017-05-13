// @flow
import stringHash from "string-hash";

import type {StyleMap} from "../types.js";
import {convertToCSSString} from "./css.js";

function hashObject(obj: mixed): string {
    return stringHash(JSON.stringify(obj)).toString(36);
}

function generateClassName(baseClassName: string, styles: StyleMap): string {
    return `${baseClassName}__${hashObject(styles)}`;
}

class StyleBuffer {
    _element: HTMLStyleElement
    _cachedClassNames: {[className: string]: true} = {}

    constructor(element: HTMLStyleElement) {
        this._element = element;
    }

    addCSSClass(baseClassName: string, styles: StyleMap): string {
        const className = generateClassName(baseClassName, styles);
        const isCached = className in this._cachedClassNames;
        if (!isCached) {
            const css = convertToCSSString("." + className, styles);
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
