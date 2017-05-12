// @flow
import type {DOMPropertiesMap} from "./css.js";
import type {StyleBuffer} from "./style-buffer.js";
import type {StyleValue, Rule} from "./types.js";
import {convertToDOMPropertiesMap} from "./css.js";
import {composeRules} from "./compose.js";

export type ReactElementStyleAttrs = {
    style: DOMPropertiesMap,
};

function splitRuleByStability(
    rule: Rule,
): {stableRule: Rule, volatileRule: Rule} {
    const stableRule = {
        name: rule.name,
        properties: {},
    };
    const volatileRule = {
        name: rule.name,
        properties: {},
    };
    for (const propertyName of Object.keys(rule.properties)) {
        const propertyValue = rule.properties[propertyName];
        if (propertyValue.stable) {
            stableRule.properties[propertyName] = propertyValue;
        } else {
            volatileRule.properties[propertyName] = propertyValue;
        }
    }
    return {stableRule, volatileRule};
}

export function applyRulesAsReactElementAttrs(
    rules: Array<Rule>,
    styleBuffer: StyleBuffer,
): ReactElementStyleAttrs {
    const compositeRule = composeRules(rules);

    const {stableRule, volatileRule} = splitRuleByStability(compositeRule);

    return {
        className: styleBuffer.addRuleAsCSSClass(stableRule),
        style: convertToDOMPropertiesMap(volatileRule.properties),
        "data-deep-styles-rule": compositeRule.name,
    };
}
