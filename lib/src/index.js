// @flow
import type {DOMElementStyleProps} from "./apply/css/exported-types.js";
import type {StyleDefinition} from "./types.js";
import {applyStylesAsDOMElementProps} from "./apply/css/dom.js";
import {createStyleBuffer} from "./apply/css/style-buffer.js";
import {defineSheet} from "./define/index.js";
import {resolveDefinitionToStyleSet} from "./resolve/index.js";

const globalStyleBuffer = createStyleBuffer();

export const create = defineSheet;

export function apply(
    ...definitions: Array<StyleDefinition>
): DOMElementStyleProps {
    // An array of definitions is itself a definition.
    const definition = definitions;

    const styleSet = resolveDefinitionToStyleSet(definition);

    return applyStylesAsDOMElementProps(
        styleSet.names, styleSet.properties, globalStyleBuffer);
}

export default {create, apply};
