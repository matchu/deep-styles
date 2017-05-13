// @flow
import type {StyleRule} from "./types.js";

export function composeRules(rules: Array<StyleRule>): StyleRule {
    const name = rules.map(r => r.name).join("--");

    const properties = [];
    for (const rule of rules) {
        properties.push(...rule.properties);
    }

    return {name, properties};
}
