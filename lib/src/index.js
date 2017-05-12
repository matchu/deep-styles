// @flow
import type {ReactElementStyleAttrs} from "./apply.js";
import type {Rule, PropertiesMap} from "./types.js";
import {applyRulesAsReactElementAttrs} from "./apply.js";
import {createStyleBuffer} from "./style-buffer.js";
import {defineRule, defineRulesMap} from "./define.js";

const globalStyleBuffer = createStyleBuffer();

export const StyleSheet = {
    create: defineRulesMap,
};

export function css(...rules: Array<Rule>): ReactElementStyleAttrs {
    return applyRulesAsReactElementAttrs(rules, globalStyleBuffer);
}

export const rule = defineRule;
