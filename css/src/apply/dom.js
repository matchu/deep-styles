// @flow
import type {StyleProperty} from "deep-styles-core";

import type {CSSDOMStyleMap, DOMElementStyleProps, StyleMap} from "../types";
import type {StyleBuffer} from "./style-buffer";
import {convertToCSSDOMStyleMap} from "./util";

export function applyStylesAsDOMElementProps(
    names: Array<string>,
    properties: Array<StyleProperty>,
    styleBuffer: StyleBuffer,
): DOMElementStyleProps {
    const stableStyles: StyleMap = {};
    const volatileStyles: StyleMap = {};

    for (const property of properties) {
        if (property.stable) {
            stableStyles[property.name] = property.value;

            // If a corresponding volatile property has already appeared in the
            // list, this property overrides it, so delete the corresponding
            // volatile property.
            //
            // NOTE(mdr): Volatile properties don't need to delete the
            //     corresponding stable properties, because they're overridden
            //     by the style attribute anyway. Not deleting is an
            //     optimization, because it increases the likelihood that we
            //     can reuse an existing CSS class.
            //
            // TODO(mdr): Something about this seems inefficient. Can we maybe
            //     just output CSS classes corresponding to the style rules,
            //     instead of always building a new stable set for each element
            //     and hashing it?
            delete volatileStyles[property.name];
        } else {
            volatileStyles[property.name] = property.value;
        }
    }

    return {
        className: styleBuffer.addCSSClass(names, stableStyles),
        style: convertToCSSDOMStyleMap(volatileStyles),
    };
}
