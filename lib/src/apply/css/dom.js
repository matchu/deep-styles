// @flow
import type {StyleProperty} from "../../types.js";

import type {CSSDOMStyleMap} from "./types.js";
import type {StyleBuffer} from "./style-buffer.js";
import {convertToCSSDOMStyleMap, flattenPropertiesToStyleMap} from "./util.js";

export type DOMElementStyleProps = {
    className?: string,
    style?: CSSDOMStyleMap,
};

export function applyStylesAsDOMElementProps(
    names: Array<string>,
    properties: Array<StyleProperty>,
    styleBuffer: StyleBuffer,
): DOMElementStyleProps {
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
