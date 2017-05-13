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

function flattenStyleSet(
    styleSet: StyleSet,
    options: {stable: boolean},
): {names: Array<string>, properties: Array<StyleProperty>} {
    if (!styleSet) {
        return {
            names: [],
            properties: [],
        };
    }

    if (Array.isArray(styleSet)) {
        const allNames = [];
        const allProperties = [];
        for (const child of styleSet) {
            const {names, properties} = flattenStyleSet(child, options);
            allNames.push(...names);
            allProperties.push(...properties);
        }
        return {names: allNames, properties: allProperties};
    }

    if (styleSet.__type === "StyleRule") {
        // I guess this isn't *guaranteed* to be a StyleRule, but the only way
        // this check fails is if someone intentionally sabotages the lib, in
        // which case it's their fault :P
        const rule: StyleRule = (styleSet: any);
        return {
            names: [rule.name],
            properties: rule.properties,
        };
    }

    return {
        names: [],
        properties: convertRuleDefinitionToProperties(styleSet, options),
    };
}

export function normalizeStyleSetToRule(
    styleSet: StyleSet, options: {stable: boolean},
): StyleRule {
    const {names, properties} = flattenStyleSet(styleSet, options);
    return {
        __type: "StyleRule",
        name: names.join("-"),
        properties,
    };
}
