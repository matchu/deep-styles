// @flow
import stringHash from "string-hash";

import type {StyleMap} from "./types.js";
import {convertToCSSString} from "./util.js";

function hashObject(obj: mixed): string {
    return stringHash(JSON.stringify(obj)).toString(36);
}

function generateClassName(baseClassName: string, styles: StyleMap): string {
    return `${baseClassName}_${hashObject(styles)}`;
}

class StyleBuffer {
    _element: HTMLStyleElement
    _cachedClassNames: {[className: string]: true} = {}

    constructor(element: HTMLStyleElement) {
        this._element = element;
    }

    _insertCSSString(css: string): void {
        const cssTextNode = document.createTextNode(css);
        this._element.appendChild(cssTextNode);
    }

    addCSSClass(baseClassNames: Array<string>, styles: StyleMap): string {
        if (Object.keys(styles).length === 0) {
            return "";
        }

        const className = generateClassName(baseClassNames.join("-"), styles);
        const isCached = className in this._cachedClassNames;
        if (!isCached) {
            const css = convertToCSSString("." + className, styles);
            this._insertCSSString(css);
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
