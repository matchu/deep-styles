// @flow
import type {StyleRule, StyleProperty, StyleSet, StylePropertiesDefinition}
    from "./types.js";

function convertRuleDefinitionToProperties(
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

export function normalizeStyleSetToRule(
    styleSet: StyleSet,
    options: {stable: boolean},
): StyleRule {
    if (!styleSet) {
        return {
            __type: "StyleRule",
            names: [],
            properties: [],
        };
    }

    if (Array.isArray(styleSet)) {
        const allNames = [];
        const allProperties = [];
        for (const child of styleSet) {
            const rule = normalizeStyleSetToRule(child, options);
            allNames.push(...rule.names);
            allProperties.push(...rule.properties);
        }
        return {
            __type: "StyleRule",
            names: allNames,
            properties: allProperties,
        };
    }

    if (styleSet.__type === "StyleRule") {
        // I guess this isn't *guaranteed* to be a StyleRule, but the only way
        // this check fails is if someone intentionally sabotages the lib, in
        // which case it's their fault :P
        const rule: StyleRule = (styleSet: any);
        return rule;
    }

    return {
        __type: "StyleRule",
        names: [],
        properties: convertRuleDefinitionToProperties(styleSet, options),
    };
}
