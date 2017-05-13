// @flow
import type {StyleProperty, StyleRule, StyleValue} from "./types.js";

export type RuleDefinition = {[propertyName: string]: StyleValue};

export function defineRule(
    name: string,
    definition: RuleDefinition,
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

    return {name, properties};
}
