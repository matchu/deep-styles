// @flow
export type StyleRule = {
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
