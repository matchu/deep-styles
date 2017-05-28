// @flow
import type {StyleProperty} from "../../core/types";

import type {CSSDOMStyleMap, DOMElementStyleProps} from "../types";
import type {StyleBuffer} from "./style-buffer";
import {convertToCSSDOMStyleMap, flattenPropertiesToStyleMap} from "./util";

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
