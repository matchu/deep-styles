// @flow
import type {StyleDefinition} from "../../core/types";
import {resolveDefinitionToStyleSet} from "../../core/resolve";

import type {DOMElementStyleProps} from "../types";
import {applyStylesAsDOMElementProps} from "./dom";
import {createStyleBuffer} from "./style-buffer";

const globalStyleBuffer = createStyleBuffer();

export function apply(
    ...definitions: Array<StyleDefinition>
): DOMElementStyleProps {
    // An array of definitions is itself a definition.
    const definition = definitions;

    const styleSet = resolveDefinitionToStyleSet(definition);

    return applyStylesAsDOMElementProps(
        styleSet.names, styleSet.properties, globalStyleBuffer);
}
