// @flow
import type {StyleValue, PropertyValue, Rule} from "./types.js";

type RulesMapSpec = {
    [ruleName: string]: PropertiesMapSpec,
};
type PropertiesMapSpec = {[propertyName: string]: StyleValue};

type RulesMap<N> = {
    [ruleName: N]: Rule,
};

export function defineRule(
    name: string,
    properties: PropertiesMapSpec,
    stable?: boolean = false
): Rule {
    const rule = {
        name,
        properties: {},
    };

    for (const propertyName of Object.keys(properties)) {
        const styleValue = properties[propertyName];
        rule.properties[propertyName] = {styleValue, stable};
    }

    return rule;
}

export function defineRulesMap<M: RulesMapSpec>(
    rulesMapSpec: M,
): RulesMap<$Keys<M>> {
    const rules = {};
    for (const name of Object.keys(rulesMapSpec)) {
        rules[name] = defineRule(name, rulesMapSpec[name], true);
    }
    return rules;
}
