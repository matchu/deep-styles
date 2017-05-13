// @flow
import type {StyleRule, StyleRuleDefinition} from "./types.js";
import {defineStableRule} from "./rules.js";

export function defineSheet<D: {[ruleName: string]: StyleRuleDefinition}>(
    definition: D,
): {[ruleName: $Keys<D>]: StyleRule} {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        const baseRule = defineStableRule(definition[ruleName]);
        sheet[ruleName] = {
            ...baseRule,
            names: [ruleName, ...baseRule.names],
        };
    }
    return sheet;
}
