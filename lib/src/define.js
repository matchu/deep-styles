// @flow
import type {StyleProperty, StyleRule, StyleValue} from "./types.js";

type StyleSheetDefinition = {
    [ruleName: string]: RuleDefinition,
};
type RuleDefinition = {[propertyName: string]: StyleValue};

type StyleSheetOutput<K> = {
    [ruleName: K]: StyleRule,
};

export function defineRule(
    name: string,
    definition: RuleDefinition,
    stable?: boolean = false
): StyleRule {
    const properties = [];

    for (const propertyName of Object.keys(definition)) {
        const propertyValue = definition[propertyName];
        properties.push({
            name: propertyName,
            value: propertyValue,
            stable,
        });
    }

    return {name, properties};
}

export function defineSheet<D: StyleSheetDefinition>(
    definition: StyleSheetDefinition,
): StyleSheetOutput<$Keys<D>> {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        const ruleDefinition = definition[ruleName];
        sheet[ruleName] = defineRule(ruleName, ruleDefinition, true);
    }
    return sheet;
}
