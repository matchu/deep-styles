// @flow
import type {PropertiesMap, Rule} from "./types.js";

function mergePropertiesInto(
    propertiesToAdd: PropertiesMap,
    propertiesToMutate: PropertiesMap,
): void {
    for (const propertyName of Object.keys(propertiesToAdd)) {
        propertiesToMutate[propertyName] = propertiesToAdd[propertyName];
    }
}

export function composeRules(rules: Array<Rule>): Rule {
    const compositeRule = {
        name: rules.map(r => r.name).join("--"),
        properties: {},
    };
    for (const rule of rules) {
        mergePropertiesInto(rule.properties, compositeRule.properties);
    }
    return compositeRule;
}
