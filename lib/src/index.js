// @flow
import type {RuleDefinition} from "./define.js";
import type {ReactElementStyleAttrs} from "./apply/index.js";
import type {StyleRule} from "./types.js";
import {applyRuleAsReactElementAttrs} from "./apply/index.js";
import {createStyleBuffer} from "./apply/style-buffer.js";
import {composeRules} from "./compose.js";
import {defineRule} from "./define.js";

export function sheet<D: {[ruleName: string]: RuleDefinition}>(
    definition: D,
): {[ruleName: $Keys<D>]: StyleRule} {
    const sheet = {};
    for (const ruleName of Object.keys(definition)) {
        const ruleDefinition = definition[ruleName];
        sheet[ruleName] = defineRule(ruleName, ruleDefinition, {stable: true});
    }
    return sheet;
}

export function runtime(name: string, definition: RuleDefinition): StyleRule {
    return defineRule(name, definition, {stable: false});
}

const globalStyleBuffer = createStyleBuffer();
export function apply(...rules: Array<StyleRule>): ReactElementStyleAttrs {
    const rule = composeRules(rules);
    return applyRuleAsReactElementAttrs(rule, globalStyleBuffer);
}

const Style = {
    sheet,
    runtime,
    apply,
};
export default Style;
