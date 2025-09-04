/* *
 *
 *  (c) 2016-2025 Highsoft AS
 *
 *  Authors: Jon Arild Nygard
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
/* *
 *
 *  Imports
 *
 * */
import U from '../Core/Utilities.js';
const { extend, isNumber, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Creates an object map from parent id to children's index.
 *
 * @private
 * @function Highcharts.Tree#getListOfParents
 *
 * @param {Array<*>} data
 *        List of points set in options. `Array.parent` is parent id of point.
 *
 * @return {Highcharts.Dictionary<Array<*>>}
 * Map from parent id to children index in data
 */
function getListOfParents(data) {
    const root = '', ids = [], listOfParents = data.reduce((prev, curr) => {
        const { parent = '', id } = curr;
        if (typeof prev[parent] === 'undefined') {
            prev[parent] = [];
        }
        prev[parent].push(curr);
        if (id) {
            ids.push(id);
        }
        return prev;
    }, {});
    Object.keys(listOfParents).forEach((node) => {
        if ((node !== root) && (ids.indexOf(node) === -1)) {
            const adoptedByRoot = listOfParents[node].map(function (orphan) {
                const { ...parentExcluded } = orphan; // #15196
                return parentExcluded;
            });
            listOfParents[root].push(...adoptedByRoot);
            delete listOfParents[node];
        }
    });
    return listOfParents;
}
/** @private */
function getNode(id, parent, level, data, mapOfIdToChildren, options) {
    const after = options && options.after, before = options && options.before, node = {
        data,
        depth: level - 1,
        id,
        level,
        parent: (parent || '')
    };
    let descendants = 0, height = 0, start, end;
    // Allow custom logic before the children has been created.
    if (typeof before === 'function') {
        before(node, options);
    }
    // Call getNode recursively on the children. Calculate the height of the
    // node, and the number of descendants.
    const children = ((mapOfIdToChildren[id] || [])).map((child) => {
        const node = getNode(child.id, id, (level + 1), child, mapOfIdToChildren, options), childStart = child.start || NaN, childEnd = (child.milestone === true ?
            childStart :
            child.end ||
                NaN);
        // Start should be the lowest child.start.
        start = ((!isNumber(start) || childStart < start) ?
            childStart :
            start);
        // End should be the largest child.end.
        // If child is milestone, then use start as end.
        end = ((!isNumber(end) || childEnd > end) ?
            childEnd :
            end);
        descendants = descendants + 1 + node.descendants;
        height = Math.max(node.height + 1, height);
        return node;
    });
    // Calculate start and end for point if it is not already explicitly set.
    if (data) {
        data.start = pick(data.start, start);
        data.end = pick(data.end, end);
    }
    extend(node, {
        children: children,
        descendants: descendants,
        height: height
    });
    // Allow custom logic after the children has been created.
    if (typeof after === 'function') {
        after(node, options);
    }
    return node;
}
/** @private */
function getTree(data, options) {
    return getNode('', null, 1, null, getListOfParents(data), options);
}
/* *
 *
 *  Default Export
 *
 * */
const Tree = {
    getNode,
    getTree
};
export default Tree;
