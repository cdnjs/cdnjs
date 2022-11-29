import { isValueNode } from './model';
export function asNode(label, parent) {
    var _a;
    const node = {
        index: 0,
        relIndex: 0,
        label: '',
        children: [],
        expand: false,
        parent: parent ? parent.index : -1,
        level: parent ? parent.level + 1 : 0,
        center: Number.NaN,
        width: 0,
        hidden: false,
        major: !parent,
        toString() {
            return this.label;
        },
    };
    if (typeof label === 'string') {
        node.label = label;
    }
    else {
        Object.assign(node, {
            ...label,
            children: ((_a = label.children) !== null && _a !== void 0 ? _a : []).map((d) => asNode(d, node)),
        });
    }
    return node;
}
function push(node, i, flat, parent) {
    node.relIndex = i;
    node.index = flat.length;
    node.parent = parent ? parent.index : -1;
    node.hidden = Boolean(parent ? parent.expand === false || node.expand : node.expand);
    flat.push(node);
    node.children.forEach((d, j) => push(d, j, flat, node));
}
export function toNodes(labels) {
    const nodes = labels.map((d) => asNode(d));
    const flat = [];
    nodes.forEach((d, i) => push(d, i, flat));
    return flat;
}
export function parentsOf(node, flat) {
    const parents = [node];
    while (parents[0].parent >= 0) {
        parents.unshift(flat[parents[0].parent]);
    }
    return parents;
}
function rightMost(node) {
    if (!node.expand || node.children.length === 0) {
        return node;
    }
    return rightMost(node.children[node.children.length - 1]);
}
export function lastOfLevel(node, flat) {
    var _a;
    if (node.parent > -1) {
        const parent = flat[node.parent];
        return rightMost(parent.children[parent.children.length - 1]);
    }
    const sibling = (_a = flat
        .slice()
        .reverse()
        .find((d) => d.parent === -1)) !== null && _a !== void 0 ? _a : flat[0];
    return rightMost(sibling);
}
export function preOrderTraversal(node, visit) {
    const goDeep = visit(node);
    if (goDeep !== false) {
        node.children.forEach((child) => preOrderTraversal(child, visit));
    }
}
export function resolve(label, flat, dataTree) {
    const parents = parentsOf(label, flat);
    let dataItem = {
        children: dataTree,
        value: Number.NaN,
    };
    const dataParents = parents.map((p) => {
        dataItem = dataItem && isValueNode(dataItem) ? dataItem.children[p.relIndex] : Number.NaN;
        return dataItem;
    });
    const value = dataParents[dataParents.length - 1];
    if (isValueNode(value)) {
        return value.value;
    }
    return value;
}
export function countExpanded(node) {
    if (!node.expand) {
        return 1;
    }
    return node.children.reduce((acc, d) => acc + countExpanded(d), 0);
}
export function flatChildren(node, flat) {
    if (node.children.length === 0) {
        return [];
    }
    const firstChild = node.children[0];
    if (node.parent >= 0 && node.relIndex < flat[node.parent].children.length - 1) {
        const nextSibling = flat[node.parent].children[node.relIndex + 1];
        return flat.slice(firstChild.index, nextSibling.index);
    }
    const nextSibling = flat
        .slice(firstChild.index + 1)
        .find((d) => d.level < node.level || (d.parent === node.parent && d.relIndex === node.relIndex + 1));
    if (nextSibling) {
        return flat.slice(firstChild.index, nextSibling.index);
    }
    return flat.slice(firstChild.index);
}
export function determineVisible(flat) {
    const focus = flat.find((d) => d.expand === 'focus');
    if (focus) {
        return flat.slice(focus.index + 1).filter((d) => !d.hidden && parentsOf(d, flat).includes(focus));
    }
    return flat.filter((d) => !d.hidden);
}
export function spanLogic(node, flat, visibleNodes, groupLabelPosition = 'between-first-and-second') {
    if (node.children.length === 0 || !node.expand) {
        return false;
    }
    const firstChild = node.children[0];
    const lastChild = node.children[node.children.length - 1];
    const flatSubTree = flatChildren(node, flat);
    const leftVisible = flatSubTree.find((d) => visibleNodes.has(d));
    const rightVisible = flatSubTree
        .slice()
        .reverse()
        .find((d) => visibleNodes.has(d));
    if (!leftVisible || !rightVisible) {
        return false;
    }
    const leftParents = parentsOf(leftVisible, flat);
    const rightParents = parentsOf(rightVisible, flat);
    const leftFirstVisible = leftParents[node.level + 1] === firstChild;
    const rightLastVisible = rightParents[node.level + 1] === lastChild;
    const hasCollapseBox = leftFirstVisible && node.expand !== 'focus';
    const hasFocusBox = leftFirstVisible && rightLastVisible && node.children.length > 1;
    let groupLabelCenter = 0;
    switch (groupLabelPosition) {
        case 'between-first-and-second':
            {
                const nextVisible = flat.slice(leftVisible.index + 1, rightVisible.index + 1).find((d) => visibleNodes.has(d));
                groupLabelCenter = !nextVisible ? leftVisible.center : (leftVisible.center + nextVisible.center) / 2;
            }
            break;
        case 'center':
            groupLabelCenter = (leftVisible.center + rightVisible.center) / 2;
            break;
        case 'last':
            groupLabelCenter = rightVisible.center;
            break;
        case 'first':
        default:
            groupLabelCenter = leftVisible.center;
            break;
    }
    return {
        hasCollapseBox,
        hasFocusBox,
        leftVisible,
        rightVisible,
        groupLabelCenter,
        leftFirstVisible,
        rightLastVisible,
    };
}
//# sourceMappingURL=utils.js.map