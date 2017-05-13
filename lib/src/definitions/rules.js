// @flow
import type {StyleRule, StyleProperty, StyleRuleDefinition,
    StylePropertiesDefinition} from "./types.js";

function defineProperties(
    definition: StylePropertiesDefinition,
    options: {stable: boolean},
): Array<StyleProperty> {
    const properties = [];

    for (const propertyName of Object.keys(definition)) {
        const propertyValue = definition[propertyName];
        properties.push({
            name: propertyName,
            value: propertyValue,
            stable: options.stable,
        });
    }

    return properties;
}

function defineRule(
    ruleDef: StyleRuleDefinition, options: {stable: boolean},
): StyleRule {
    if (!ruleDef) {
        return {
            __type: "StyleRule",
            names: [],
            properties: [],
        };
    }

    if (Array.isArray(ruleDef)) {
        const allNames = [];
        const allProperties = [];
        for (const child of ruleDef) {
            const rule = defineRule(child, options);
            allNames.push(...rule.names);
            allProperties.push(...rule.properties);
        }
        return {
            __type: "StyleRule",
            names: allNames,
            properties: allProperties,
        };
    }

    if (ruleDef.__type === "StyleRule") {
        // I guess this isn't *guaranteed* to be a StyleRule, but the only way
        // this check fails is if someone intentionally sabotages the lib, in
        // which case it's their fault :P
        const rule: StyleRule = (ruleDef: any);
        return rule;
    }

    return {
        __type: "StyleRule",
        names: [],
        properties: defineProperties(ruleDef, options),
    };
}

export function defineStableRule(ruleDef: StyleRuleDefinition): StyleRule {
    return defineRule(ruleDef, {stable: true});
}

export function defineVolatileRule(ruleDef: StyleRuleDefinition): StyleRule {
    return defineRule(ruleDef, {stable: false});
}
