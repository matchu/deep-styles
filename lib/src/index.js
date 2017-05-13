// @flow
import type {ReactElementStyleAttrs} from "./apply.js";
import type {StyleRule} from "./types.js";
import {applyRulesAsReactElementAttrs} from "./apply.js";
import {createStyleBuffer} from "./style-buffer.js";
import {defineRule, defineSheet} from "./define.js";

const globalStyleBuffer = createStyleBuffer();

export const StyleSheet = {
    create: defineSheet,
};

export function css(...rules: Array<StyleRule>): ReactElementStyleAttrs {
    return applyRulesAsReactElementAttrs(rules, globalStyleBuffer);
}

export const rule = defineRule;
