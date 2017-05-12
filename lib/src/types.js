// @flow
export type Rule = {
    name: string,
    properties: PropertiesMap,
};
export type PropertiesMap = {[propertyName: string]: PropertyValue};

export type StyleValue = string | number;
export type PropertyValue = {
    styleValue: StyleValue,
    stable: boolean,
};
