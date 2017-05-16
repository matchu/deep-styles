// @flow
/**
 * These types are also used internally, but they're declared here, to make
 * them easier to export from the npm package.
 *
 * (The experimental gen-flow-files crashes on this project, and on some of
 * these types in particular, because it doesn't support recursive types. So,
 * we have to roll our own type-exporting solution.)
 */
export type StyleValue = string | number;
export type StyleProperty = {
    name: string,
    value: StyleValue,
    stable: boolean,
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
