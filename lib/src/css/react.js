// @flow
import type {CSSDOMStyleMap, StyleProperty} from "./types.js";
import type {StyleBuffer} from "./style-buffer.js";
import {convertToCSSDOMStyleMap, flattenPropertiesToStyleMap} from "./util.js";

export type ReactElementStyleAttrs = {
    className?: string,
    style?: CSSDOMStyleMap,
};

export function applyStylesAsReactElementAttrs(
    names: Array<string>,
    properties: Array<StyleProperty>,
    styleBuffer: StyleBuffer,
): ReactElementStyleAttrs {
    const stableProperties = [];
    const volatileProperties = [];

    for (const property of properties) {
        if (property.stable) {
            stableProperties.push(property);
        } else {
            volatileProperties.push(property);
        }
    }

    const stableStyles = flattenPropertiesToStyleMap(stableProperties);
    const volatileStyles = flattenPropertiesToStyleMap(volatileProperties);

    return {
        className: styleBuffer.addCSSClass(names, stableStyles),
        style: convertToCSSDOMStyleMap(volatileStyles),
    };
}
