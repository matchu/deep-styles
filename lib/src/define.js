// @flow
import type {StyleRuleDefinition, StyleRule, StyleValue} from "./types.js";

export function defineRule(
    name: string,
    definition: StyleRuleDefinition,
    options: {stable: boolean},
): StyleRule {
    const properties = [];

    for (const propertyName of Object.keys(definition)) {
        const propertyValue = definition[propertyName];
        properties.push({
            name: propertyName,
            value: propertyValue,
            stable: options.stable,
        });
    }

    return {
        __type: "StyleRule",
        name,
        properties,
    };
}
