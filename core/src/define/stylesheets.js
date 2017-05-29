// @flow
import type {StyleDefinitionRule, StyleDefinition} from "../types";

export function defineManyStyles<D: {[ruleName: string]: StyleDefinition}>(
    definition: D,
): {[ruleName: $Keys<D>]: StyleDefinitionRule} {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        sheet[ruleName] = {
            __type: "rule",
            name: ruleName,
            spec: definition[ruleName],
        };
    }
    return sheet;
}
