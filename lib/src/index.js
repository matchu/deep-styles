// @flow
import type {ReactElementStyleAttrs} from "./apply/index.js";
import type {StyleRule, StyleSet} from "./types.js";
import {applyRuleAsReactElementAttrs} from "./apply/index.js";
import {createStyleBuffer} from "./apply/style-buffer.js";
import {normalizeStyleSetToRule} from "./normalize.js";

const globalStyleBuffer = createStyleBuffer();

export function sheet<D: {[ruleName: string]: StyleSet}>(
    definition: D,
): {[ruleName: $Keys<D>]: StyleRule} {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        const ruleStyleSet = definition[ruleName];
        const baseRule = normalizeStyleSetToRule(ruleStyleSet, {stable: true});
        sheet[ruleName] = {
            ...baseRule,
            names: [ruleName, ...baseRule.names],
        };
    }
    return sheet;
}

export function apply(
    ...styleSets: Array<StyleSet>
): ReactElementStyleAttrs {
    const rule = normalizeStyleSetToRule(styleSets, {stable: false});
    return applyRuleAsReactElementAttrs(rule, globalStyleBuffer);
}

export default {sheet, apply};
