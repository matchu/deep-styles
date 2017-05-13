// @flow
import type {CSSDOMStyleMap} from "./css.js";
import type {StyleBuffer} from "./style-buffer.js";
import type {StyleMap, StyleProperty, StyleRule} from "../types.js";
import {convertToCSSDOMStyleMap} from "./css.js";

export type ReactElementStyleAttrs = {
    style: CSSDOMStyleMap,
};

type SplitProperties = {
    stableProperties: Array<StyleProperty>,
    volatileProperties: Array<StyleProperty>,
};
function splitRuleByStability(rule: StyleRule): SplitProperties {
    const stableProperties = [];
    const volatileProperties = [];

    for (const property of rule.properties) {
        if (property.stable) {
            stableProperties.push(property);
        } else {
            volatileProperties.push(property);
        }
    }

    return {stableProperties, volatileProperties};
}

function flattenPropertiesToStyleMap(
    properties: Array<StyleProperty>,
): StyleMap {
    const styles = {};
    for (const property of properties) {
        styles[property.name] = property.value;
    }
    return styles;
}

export function applyRuleAsReactElementAttrs(
    rule: StyleRule,
    styleBuffer: StyleBuffer,
): ReactElementStyleAttrs {
    const {stableProperties, volatileProperties} = splitRuleByStability(rule);

    const stableStyles = flattenPropertiesToStyleMap(stableProperties);
    const volatileStyles = flattenPropertiesToStyleMap(volatileProperties);

    return {
        className: styleBuffer.addCSSClass(rule.name, stableStyles),
        style: convertToCSSDOMStyleMap(volatileStyles),
    };
}
