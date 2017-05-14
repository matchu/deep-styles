// @flow
import type {ReactElementStyleAttrs} from "./css/react.js";
import type {StyleDefinition} from "./types.js";
import {applyStylesAsReactElementAttrs} from "./css/react.js";
import {createStyleBuffer} from "./css/style-buffer.js";
import {defineSheet} from "./definitions/index.js";
import {resolveDefinitionToStyleSet} from "./resolve/index.js";

const globalStyleBuffer = createStyleBuffer();

export const sheet = defineSheet;

export function apply(
    ...definitions: Array<StyleDefinition>
): ReactElementStyleAttrs {
    // An array of definitions is itself a definition.
    const definition = definitions;

    const styleSet = resolveDefinitionToStyleSet(definition);

    return applyStylesAsReactElementAttrs(
        styleSet.names, styleSet.properties, globalStyleBuffer);
}

export default {sheet, apply};
