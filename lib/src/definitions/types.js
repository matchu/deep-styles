// @flow
import type {StyleProperty, StyleValue} from "../types.js";

export type StyleRule = {
    __type: "StyleRule",
    names: Array<string>,
    properties: Array<StyleProperty>,
};

export type StylePropertiesDefinition = {[propertyName: string]: StyleValue};
export type StyleRuleDefinition =
    StyleRule |
    StylePropertiesDefinition |
    Array<StyleRuleDefinition> |
    null |
    typeof undefined;

export type {StyleProperty};
