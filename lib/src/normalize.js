// @flow
import type {StyleRule, StyleSet} from "./types.js";
import {defineRule} from "./define.js";

function composeRules(rules: Array<StyleRule>): StyleRule {
    const name = rules.map(r => r.name).join("-");

    const properties = [];
    for (const rule of rules) {
        properties.push(...rule.properties);
    }

    return {
        __type: "StyleRule",
        name,
        properties,
    };
}

export function normalizeStyleSetToRule(styleSet: StyleSet): StyleRule {
    if (!styleSet) {
        return {
            __type: "StyleRule",
            name: "",
            properties: [],
        };
    }

    if (Array.isArray(styleSet)) {
        const childRules = [];
        for (const child of styleSet) {
            childRules.push(normalizeStyleSetToRule(child));
        }
        return composeRules(childRules);
    }

    if (styleSet.__type === "StyleRule") {
        // I guess this isn't *guaranteed* to be a StyleRule, but the only way
        // this check fails is if someone intentionally sabotages the lib, in
        // which case it's their fault :P
        return ((styleSet: any): StyleRule);
    }

    return defineRule("runtime", styleSet, {stable: false});
}
