// @flow
import type {ReactElementStyleAttrs} from "./apply/index.js";
import type {StyleRule, StyleRuleDefinition, StyleSet} from "./types.js";
import {applyRuleAsReactElementAttrs} from "./apply/index.js";
import {createStyleBuffer} from "./apply/style-buffer.js";
import {defineRule} from "./define.js";
import {normalizeStyleSetToRule} from "./normalize.js";

const globalStyleBuffer = createStyleBuffer();

export function sheet<D: {[ruleName: string]: StyleRuleDefinition}>(
    definition: D,
): {[ruleName: $Keys<D>]: StyleRule} {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        const ruleDefinition = definition[ruleName];
        sheet[ruleName] = defineRule(ruleName, ruleDefinition, {stable: true});
    }
    return sheet;
}

export function apply(
    ...styleSets: Array<StyleSet>
): ReactElementStyleAttrs {
    const rule = normalizeStyleSetToRule(styleSets);
    return applyRuleAsReactElementAttrs(rule, globalStyleBuffer);
}

export default {sheet, apply};
