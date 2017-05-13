// @flow
export type StyleRule = {
    __type: "StyleRule",
    name: string,
    properties: Array<StyleProperty>,
};

export type StyleValue = string | number;
export type StyleProperty = {
    name: string,
    value: StyleValue,
    stable: boolean,
};

export type StyleMap = {
    [propertyName: string]: StyleValue,
};

export type StyleRuleDefinition = {[propertyName: string]: StyleValue};
export type StyleSet =
    StyleRule | StyleRuleDefinition | Array<StyleSet> | null | typeof undefined;
