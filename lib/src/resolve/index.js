// @flow
import type {StyleDefinition, StyleSet, StyleDefinitionRule} from "../types.js";

function _resolveDefinitionToStyleSet(
    definition: StyleDefinition,
    stable: boolean,
): StyleSet {
    if (!definition) {
        return {
            names: [],
            properties: [],
        };
    }

    if (Array.isArray(definition)) {
        const allNames = [];
        const allProperties = [];
        for (const child of definition) {
            const styleSet = _resolveDefinitionToStyleSet(child, stable);
            allNames.push(...styleSet.names);
            allProperties.push(...styleSet.properties);
        }
        return {
            names: allNames,
            properties: allProperties,
        };
    }

    if (definition.__type === "rule") {
        // I guess this isn't *guaranteed* to be a StyleRule, but the only way
        // this check fails is if someone intentionally sabotages the lib, in
        // which case it's their fault :P
        const rule: StyleDefinitionRule = (definition: any);

        // Properties that are defined within a rule are considered stable.
        // Pass stable=true to the entire definition subtree.
        const styleSet = _resolveDefinitionToStyleSet(rule.spec, true);

        return {
            names: [rule.name, ...styleSet.names],
            properties: styleSet.properties,
        };
    }

    if (typeof definition === "object") {
        const properties = [];
        for (const propertyName of Object.keys(definition)) {
            properties.push({
                name: propertyName,
                value: definition[propertyName],
                stable,
            });
        }
        return {
            names: [],
            properties,
        };
    }

    throw new Error("received style set definition of unexpected type: " +
        JSON.stringify(definition));
}

export function resolveDefinitionToStyleSet(
    definition: StyleDefinition,
): StyleSet {
    // Properties are considered unstable by default, unless they appear within
    // a rule. So, we pass stable=false at the root of the definition tree,
    // and, when we find a rule node, we pass stable=true when recursively
    // visiting its subtree.
    return _resolveDefinitionToStyleSet(definition, false);
}
