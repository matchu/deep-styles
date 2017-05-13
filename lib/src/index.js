// @flow
import type {ReactElementStyleAttrs} from "./css/react.js";
import {applyStylesAsReactElementAttrs} from "./css/react.js";
import {createStyleBuffer} from "./css/style-buffer.js";

import type {StyleRuleDefinition} from "./definitions/types.js";
import {defineSheet} from "./definitions/sheets.js";
import {defineVolatileRule} from "./definitions/rules.js";

const globalStyleBuffer = createStyleBuffer();

export const sheet = defineSheet;

export function apply(
    ...ruleDefs: Array<StyleRuleDefinition>
): ReactElementStyleAttrs {
    const rule = defineVolatileRule(ruleDefs);
    return applyStylesAsReactElementAttrs(
        rule.names, rule.properties, globalStyleBuffer);
}

export default {sheet, apply};
