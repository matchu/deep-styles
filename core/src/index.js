// @flow
import {defineManyStyles} from "./define/stylesheets";
import {resolveDefinitionToStyleSet} from "./resolve";

export const StyleSheet = {
    create: defineManyStyles,
    resolve: resolveDefinitionToStyleSet,
};
