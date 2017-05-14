// @flow
export type StyleValue = string | number;
export type StyleProperty = {
    name: string,
    value: StyleValue,
    stable: boolean,
};

export type StyleSet = {
    names: Array<string>,
    properties: Array<StyleProperty>,
};

export type StyleDefinition =
    StyleDefinitionRule |
    StyleDefinitionProperties |
    Array<StyleDefinition> |
    null |
    typeof undefined;

export type StyleDefinitionProperties = {[propertyName: string]: StyleValue};

export type StyleDefinitionRule = {
    __type: "rule",
    name: string,
    spec: StyleDefinition,
};
