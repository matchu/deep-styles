// @flow
import type {StyleValue, StyleProperty, StyleDefinition,
    StyleDefinitionProperties, StyleDefinitionRule}
    from "./exported-types.js";
export type {StyleValue, StyleProperty, StyleDefinition,
    StyleDefinitionProperties, StyleDefinitionRule};

export type StyleSet = {
    names: Array<string>,
    properties: Array<StyleProperty>,
};
