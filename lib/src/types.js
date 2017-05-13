// @flow
export type StyleRule = {
    __type: "StyleRule",
    names: Array<string>,
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

export type StylePropertiesDefinition = {[propertyName: string]: StyleValue};
export type StyleSet =
    StyleRule |
    StylePropertiesDefinition |
    Array<StyleSet> |
    null |
    typeof undefined;
