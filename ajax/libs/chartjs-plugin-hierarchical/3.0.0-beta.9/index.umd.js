/**
 * chartjs-plugin-hierarchical
 * https://github.com/sgratzl/chartjs-plugin-hierarchical
 *
 * Copyright (c) 2021 Samuel Gratzl <sam@sgratzl.com>
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('chart.js'), require('chart.js/helpers')) :
    typeof define === 'function' && define.amd ? define(['exports', 'chart.js', 'chart.js/helpers'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ChartHierarchical = {}, global.Chart, global.Chart.helpers));
}(this, (function (exports, chart_js, helpers) { 'use strict';

    function isValueNode(node) {
        return node != null && Array.isArray(node.children);
    }

    function asNode(label, parent) {
        const node = Object.assign({
            label: '',
            index: 0,
            relIndex: 0,
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
        }, typeof label === 'string'
            ? {
                label,
            }
            : label);
        node.children = node.children.map((d) => asNode(d, node));
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
    function toNodes(labels) {
        const nodes = labels.map((d) => asNode(d));
        const flat = [];
        nodes.forEach((d, i) => push(d, i, flat));
        return flat;
    }
    function parentsOf(node, flat) {
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
    function lastOfLevel(node, flat) {
        if (node.parent > -1) {
            const parent = flat[node.parent];
            return rightMost(parent.children[parent.children.length - 1]);
        }
        const sibling = flat
            .slice()
            .reverse()
            .find((d) => d.parent === -1);
        return rightMost(sibling);
    }
    function preOrderTraversal(node, visit) {
        const goDeep = visit(node);
        if (goDeep !== false) {
            node.children.forEach((child) => preOrderTraversal(child, visit));
        }
    }
    function resolve(label, flat, dataTree) {
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
    function countExpanded(node) {
        if (!node.expand) {
            return 1;
        }
        return node.children.reduce((acc, d) => acc + countExpanded(d), 0);
    }
    function flatChildren(node, flat) {
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
    function determineVisible(flat) {
        const focus = flat.find((d) => d.expand === 'focus');
        if (focus) {
            return flat.slice(focus.index + 1).filter((d) => !d.hidden && parentsOf(d, flat).includes(focus));
        }
        return flat.filter((d) => !d.hidden);
    }
    function spanLogic(node, flat, visibleNodes, groupLabelPosition = 'between-first-and-second') {
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

    function generateCode(labels) {
        let code = '';
        const encode = (label) => {
            if (typeof label === 'string') {
                code += label;
                return;
            }
            code += `(l=${label.label},e=${label.expand},c=[`;
            (label.children || []).forEach(encode);
            code += '])';
        };
        labels.forEach(encode);
        return code;
    }
    function isValidScaleType(chart, scale) {
        const scales = chart.config.options.scales;
        if (!scales || !Object.prototype.hasOwnProperty.call(scales, scale)) {
            return false;
        }
        return Object.prototype.hasOwnProperty.call(scales[scale], 'type');
    }
    function enabled(chart) {
        const options = chart.config.options;
        if (!options || !Object.prototype.hasOwnProperty.call(options, 'scales')) {
            return null;
        }
        const scales = chart.config.options.scales;
        if (isValidScaleType(chart, 'x') && scales.x.type === 'hierarchical') {
            return 'x';
        }
        if (isValidScaleType(chart, 'y') && scales.y.type === 'hierarchical') {
            return 'y';
        }
        return null;
    }
    function check(chart) {
        if (chart.data.labels && chart.data._verify === generateCode(chart.data.labels)) {
            return;
        }
        const flat = (chart.data.flatLabels = toNodes(chart.data.labels));
        chart.data.rootNodes = flat.filter((d) => d.parent === -1);
        const labels = determineVisible(flat);
        chart.data.labels = labels;
        updateVerifyCode(chart);
        chart.data.datasets.forEach((dataset) => {
            if (dataset.tree == null) {
                dataset.tree = dataset.data.slice();
            }
            dataset.data = labels.map((l) => resolve(l, flat, dataset.tree));
        });
        updateAttributes(chart);
    }
    function updateVerifyCode(chart) {
        chart.data._verify = generateCode(chart.data.labels);
    }
    function updateAttributes(chart) {
        const scale = findScale(chart);
        if (!scale) {
            return;
        }
        const attributes = scale.options.attributes;
        const nodes = chart.data.labels;
        const flat = chart.data.flatLabels;
        Object.keys(attributes).forEach((attr) => {
            chart.data.datasets.forEach((d) => {
                const v = nodes.map((n) => {
                    while (n) {
                        if (n[attr] !== undefined) {
                            return n[attr];
                        }
                        n = n.parent >= 0 ? flat[n.parent] : null;
                    }
                    return attributes[attr];
                });
                d[attr] = v.length >= 1 && v.every((vi) => vi === v[0]) ? v[0] : v;
            });
        });
    }
    function findScale(chart) {
        const scales = Object.keys(chart.scales).map((d) => chart.scales[d]);
        return scales.find((d) => d.type === 'hierarchical');
    }
    function postDataUpdate(chart) {
        updateVerifyCode(chart);
        updateAttributes(chart);
        chart.update();
    }
    function expandCollapse(chart, index, count, toAdd) {
        const labels = chart.data.labels;
        const flatLabels = chart.data.flatLabels;
        const data = chart.data.datasets;
        const removed = labels.splice(index, count, ...toAdd);
        removed.forEach((d) => {
            d.hidden = true;
        });
        toAdd.forEach((d) => {
            d.hidden = false;
        });
        findScale(chart).determineDataLimits();
        data.forEach((dataset) => {
            const toAddData = toAdd.map((d) => resolve(d, flatLabels, dataset.tree));
            dataset.data.splice(index, count, ...toAddData);
        });
    }
    function collapse(chart, index, parent) {
        const count = countExpanded(parent);
        parent.children.forEach((c) => preOrderTraversal(c, (d) => {
            d.expand = false;
        }));
        expandCollapse(chart, index, count, [parent]);
        parent.expand = false;
        postDataUpdate(chart);
    }
    function expand(chart, index, node) {
        expandCollapse(chart, index, 1, node.children);
        node.expand = true;
        postDataUpdate(chart);
    }
    function zoomIn(chart, lastIndex, parent, flat) {
        const count = countExpanded(parent);
        flat.forEach((d) => {
            if (d.expand === 'focus') {
                d.expand = true;
            }
        });
        parent.expand = 'focus';
        const index = lastIndex - count + 1;
        const labels = chart.data.labels;
        labels.splice(lastIndex + 1, labels.length);
        labels.splice(0, index);
        findScale(chart).determineDataLimits();
        const data = chart.data.datasets;
        data.forEach((dataset) => {
            dataset.data.splice(lastIndex + 1, dataset.data.length);
            dataset.data.splice(0, index);
        });
        postDataUpdate(chart);
    }
    function zoomOut(chart, parent) {
        const labels = chart.data.labels;
        const flatLabels = chart.data.flatLabels;
        parent.expand = true;
        const nextLabels = flatLabels.filter((d) => !d.hidden);
        const index = nextLabels.indexOf(labels[0]);
        const count = labels.length;
        labels.splice(labels.length, 0, ...nextLabels.slice(index + count));
        labels.splice(0, 0, ...nextLabels.slice(0, index));
        findScale(chart).determineDataLimits();
        const data = chart.data.datasets;
        data.forEach((dataset) => {
            const toAddBefore = nextLabels.slice(0, index).map((d) => resolve(d, flatLabels, dataset.tree));
            const toAddAfter = nextLabels.slice(index + count).map((d) => resolve(d, flatLabels, dataset.tree));
            dataset.data.splice(dataset.data.length, 0, ...toAddAfter);
            dataset.data.splice(0, 0, ...toAddBefore);
        });
        postDataUpdate(chart);
    }
    function resolveElement(event, scale) {
        const hor = scale.isHorizontal();
        const offset = hor ? scale.top + scale.options.padding : scale.left - scale.options.padding;
        if ((hor && event.y <= offset) || (!hor && event.x > offset)) {
            return null;
        }
        const index = scale.getValueForPixel(hor ? event.x - scale.left : event.y - scale.top);
        return {
            offset,
            index,
        };
    }
    function handleClickEvents(chart, _event, elem, offsetDelta, inRange) {
        const cc = chart;
        let offset = elem.offset;
        const index = elem.index;
        const flat = cc.data.flatLabels;
        const label = cc.data.labels[index];
        if (!label) {
            return;
        }
        const parents = parentsOf(label, flat);
        for (let i = 1; i < parents.length; ++i, offset += offsetDelta) {
            if (!inRange(offset)) {
                continue;
            }
            const node = parents[i];
            const isParentOfFirstChild = node.children[0] === parents[i + 1] || i === parents.length - 1;
            const parent = flat[node.parent];
            if (isParentOfFirstChild && node.relIndex === 0 && parent.expand === true) {
                collapse(cc, index, parent);
                return;
            }
            const isLastChildOfParent = lastOfLevel(node, flat) === label;
            if (isLastChildOfParent && parent.expand === 'focus') {
                zoomOut(cc, parent);
                return;
            }
            if (isLastChildOfParent &&
                parent.expand === true &&
                flatChildren(parent, flat).every((d) => d.expand !== 'focus')) {
                zoomIn(cc, index, parent, flat);
                return;
            }
        }
        if (label.children.length > 0 && inRange(offset)) {
            expand(cc, index, label);
            return;
        }
    }
    const hierarchicalPlugin = {
        id: 'hierarchical',
        beforeUpdate(chart) {
            if (!enabled(chart)) {
                return;
            }
            check(chart);
        },
        beforeDatasetsDraw(chart) {
            if (!enabled(chart)) {
                return;
            }
            const cc = chart;
            const scale = findScale(chart);
            const flat = cc.data.flatLabels;
            const visible = chart.data.labels;
            const roots = cc.data.rootNodes;
            const visibleNodes = new Set(visible);
            const ctx = chart.ctx;
            const hor = scale.isHorizontal();
            const boxSize = scale.options.hierarchyBoxSize;
            const boxSize05 = boxSize * 0.5;
            const boxSize01 = boxSize * 0.1;
            const boxRow = scale.options.hierarchyBoxLineHeight;
            const boxColor = scale.options.hierarchyBoxColor;
            const boxWidth = scale.options.hierarchyBoxWidth;
            const boxSpanColor = scale.options.hierarchySpanColor;
            const boxSpanWidth = scale.options.hierarchySpanWidth;
            const renderLabel = scale.options.hierarchyLabelPosition;
            const groupLabelPosition = scale.options.hierarchyGroupLabelPosition;
            const isStatic = scale.options.static;
            const scaleLabel = scale.options.scaleLabel;
            const scaleLabelFontColor = helpers.valueOrDefault(scaleLabel.color, chart_js.defaults.color);
            const scaleLabelFont = helpers.toFont(scaleLabel.font);
            function renderButton(type, vert, x, y) {
                if (isStatic) {
                    if (type === 'expand') {
                        return;
                    }
                    ctx.save();
                    ctx.strokeStyle = boxSpanColor;
                    ctx.lineWidth = boxSpanWidth;
                    ctx.beginPath();
                    if (vert) {
                        ctx.moveTo(x - boxSize01, y);
                        ctx.lineTo(x - boxSize05, y);
                    }
                    else {
                        ctx.moveTo(x, y + boxSize01);
                        ctx.lineTo(x, y + boxSize05);
                        ctx.lineTo(x + (type === 'collapse' ? boxSize05 : -boxSize05), y + boxSize05);
                    }
                    ctx.stroke();
                    ctx.restore();
                    return;
                }
                const x0 = x - (vert ? boxSize : boxSize05);
                const y0 = y - (vert ? boxSize05 : 0);
                ctx.strokeRect(x0, y0, boxSize, boxSize);
                switch (type) {
                    case 'expand':
                        ctx.fillRect(x0 + 2, y0 + boxSize05 - 1, boxSize - 4, 2);
                        ctx.fillRect(x0 + boxSize05 - 1, y0 + 2, 2, boxSize - 4);
                        break;
                    case 'collapse':
                        ctx.fillRect(x0 + 2, y0 + boxSize05 - 1, boxSize - 4, 2);
                        break;
                    case 'focus':
                        ctx.fillRect(x0 + boxSize05 - 2, y0 + boxSize05 - 2, 4, 4);
                }
            }
            ctx.save();
            ctx.strokeStyle = boxColor;
            ctx.lineWidth = boxWidth;
            ctx.fillStyle = scaleLabelFontColor;
            ctx.font = scaleLabelFont.string;
            const renderHorLevel = (node) => {
                if (node.children.length === 0) {
                    return false;
                }
                const offset = node.level * boxRow;
                if (!node.expand) {
                    if (visibleNodes.has(node)) {
                        renderButton('expand', false, node.center, offset);
                    }
                    return false;
                }
                const r = spanLogic(node, flat, visibleNodes, groupLabelPosition);
                if (!r) {
                    return false;
                }
                const { hasFocusBox, hasCollapseBox, leftVisible, rightVisible, leftFirstVisible, rightLastVisible, groupLabelCenter, } = r;
                if (renderLabel === 'below') {
                    ctx.fillText(node.label, groupLabelCenter, offset + boxSize);
                }
                else if (renderLabel === 'above') {
                    ctx.fillText(node.label, groupLabelCenter, offset - boxSize);
                }
                if (hasCollapseBox) {
                    renderButton('collapse', false, leftVisible.center, offset);
                }
                if (hasFocusBox) {
                    renderButton('focus', false, rightVisible.center, offset);
                }
                if (leftVisible !== rightVisible) {
                    ctx.strokeStyle = boxSpanColor;
                    ctx.lineWidth = boxSpanWidth;
                    ctx.beginPath();
                    if (hasCollapseBox) {
                        ctx.moveTo(leftVisible.center + boxSize05, offset + boxSize05);
                    }
                    else if (leftFirstVisible) {
                        ctx.moveTo(leftVisible.center, offset + boxSize01);
                        ctx.lineTo(leftVisible.center, offset + boxSize05);
                    }
                    else {
                        ctx.moveTo(leftVisible.center, offset + boxSize05);
                    }
                    if (hasFocusBox) {
                        ctx.lineTo(rightVisible.center - boxSize05, offset + boxSize05);
                    }
                    else if (rightLastVisible) {
                        ctx.lineTo(rightVisible.center, offset + boxSize05);
                        ctx.lineTo(rightVisible.center, offset + boxSize01);
                    }
                    else {
                        ctx.lineTo(rightVisible.center, offset + boxSize05);
                    }
                    ctx.stroke();
                    ctx.strokeStyle = boxColor;
                    ctx.lineWidth = boxWidth;
                }
                return true;
            };
            const renderVertLevel = (node) => {
                if (node.children.length === 0) {
                    return false;
                }
                const offset = node.level * boxRow * -1;
                if (!node.expand) {
                    if (visibleNodes.has(node)) {
                        renderButton('expand', true, offset, node.center);
                    }
                    return false;
                }
                const r = spanLogic(node, flat, visibleNodes, groupLabelPosition);
                if (!r) {
                    return false;
                }
                const { hasFocusBox, hasCollapseBox, leftVisible, rightVisible, leftFirstVisible, rightLastVisible, groupLabelCenter, } = r;
                ctx.fillText(node.label, offset - boxSize, groupLabelCenter);
                if (hasCollapseBox) {
                    renderButton('collapse', true, offset, leftVisible.center);
                }
                if (hasFocusBox) {
                    renderButton('focus', true, offset, rightVisible.center);
                }
                if (leftVisible !== rightVisible) {
                    ctx.strokeStyle = boxSpanColor;
                    ctx.lineWidth = boxSpanWidth;
                    ctx.beginPath();
                    if (hasCollapseBox) {
                        ctx.moveTo(offset - boxSize05, leftVisible.center + boxSize05);
                    }
                    else if (leftFirstVisible) {
                        ctx.moveTo(offset - boxSize01, leftVisible.center);
                        ctx.lineTo(offset - boxSize05, leftVisible.center);
                    }
                    else {
                        ctx.lineTo(offset - boxSize05, leftVisible.center);
                    }
                    if (hasFocusBox) {
                        ctx.lineTo(offset - boxSize05, rightVisible.center - boxSize05);
                    }
                    else if (rightLastVisible) {
                        ctx.lineTo(offset - boxSize05, rightVisible.center - boxSize05);
                        ctx.lineTo(offset - boxSize01, rightVisible.center - boxSize05);
                    }
                    else {
                        ctx.lineTo(offset - boxSize05, rightVisible.center);
                    }
                    ctx.stroke();
                    ctx.strokeStyle = boxColor;
                    ctx.lineWidth = boxWidth;
                }
                return true;
            };
            if (hor) {
                ctx.textAlign = 'center';
                ctx.textBaseline = renderLabel === 'above' ? 'bottom' : 'top';
                ctx.translate(scale.left, scale.top + scale.options.padding);
                roots.forEach((n) => preOrderTraversal(n, renderHorLevel));
            }
            else {
                ctx.textAlign = 'right';
                ctx.textBaseline = 'middle';
                ctx.translate(scale.left - scale.options.padding, scale.top);
                roots.forEach((n) => preOrderTraversal(n, renderVertLevel));
            }
            ctx.restore();
        },
        beforeEvent(chart, { event }) {
            if (event.type !== 'click' || !enabled(chart)) {
                return;
            }
            const clickEvent = event;
            const scale = findScale(chart);
            if (scale.options.static) {
                return;
            }
            const hor = scale.isHorizontal();
            const elem = resolveElement(clickEvent, scale);
            if (!elem) {
                return;
            }
            const boxRow = scale.options.hierarchyBoxLineHeight;
            const inRange = hor
                ? (o) => clickEvent.y >= o && clickEvent.y <= o + boxRow
                : (o) => clickEvent.x <= o && clickEvent.x >= o - boxRow;
            const offsetDelta = hor ? boxRow : -boxRow;
            handleClickEvents(chart, event, elem, offsetDelta, inRange);
        },
    };

    const defaultConfig = {
        offset: true,
        gridLines: {
            offsetGridLines: true,
        },
        static: false,
        levelPercentage: 0.75,
        padding: 25,
        hierarchyLabelPosition: 'below',
        hierarchyGroupLabelPosition: 'between-first-and-second',
        hierarchyBoxSize: 14,
        hierarchyBoxLineHeight: 30,
        hierarchySpanColor: 'gray',
        hierarchySpanWidth: 2,
        hierarchyBoxColor: 'gray',
        hierarchyBoxWidth: 1,
        attributes: {},
    };
    class HierarchicalScale extends chart_js.CategoryScale {
        constructor() {
            super(...arguments);
            this._nodes = [];
        }
        determineDataLimits() {
            const labels = this.getLabels();
            this._nodes = labels.slice();
            super.determineDataLimits();
        }
        buildTicks() {
            const nodes = this._nodes.slice(this.min, this.max + 1);
            const me = this;
            me._valueRange = Math.max(nodes.length, 1);
            me._startValue = this.min - 0.5;
            if (nodes.length === 0) {
                return [];
            }
            return nodes.map((d, i) => ({ label: d.label, value: i }));
        }
        configure() {
            super.configure();
            const nodes = this._nodes.slice(this.min, this.max + 1);
            const flat = this.chart.data.flatLabels;
            const total = this._length;
            if (nodes.length === 0) {
                return;
            }
            const ratio = this.options.levelPercentage;
            const ratios = [1, Math.pow(ratio, 1), Math.pow(ratio, 2), Math.pow(ratio, 3), Math.pow(ratio, 4)];
            const distances = [];
            let prev = nodes[0];
            let prevParents = parentsOf(prev, flat);
            distances.push(0.5);
            for (let i = 1; i < nodes.length; ++i) {
                const n = nodes[i];
                const parents = parentsOf(n, flat);
                if (prev.parent === n.parent) {
                    distances.push(ratios[n.level]);
                }
                else {
                    let common = 0;
                    while (parents[common] === prevParents[common]) {
                        common++;
                    }
                    distances.push(ratios[common]);
                }
                prev = n;
                prevParents = parents;
            }
            distances.push(0.5);
            const distance = distances.reduce((acc, s) => acc + s, 0);
            const factor = total / distance;
            let offset = distances[0] * factor;
            nodes.forEach((node, i) => {
                const previous = distances[i] * factor;
                const next = distances[i + 1] * factor;
                node.center = offset;
                offset += next;
                node.width = Math.min(next, previous) / 2;
            });
        }
        getPixelForDecimal(value) {
            const index = Math.min(Math.floor(value * this._nodes.length), this._nodes.length - 1);
            if (index === 1 && this._nodes.length === 1) {
                return this._nodes[0].width;
            }
            return this._centerBase(index);
        }
        _centerBase(index) {
            const centerTick = this.options.offset;
            const base = this._startPixel;
            const node = this._nodes[index];
            if (node == null) {
                return base;
            }
            const nodeCenter = node.center != null ? node.center : 0;
            const nodeWidth = node.width != null ? node.width : 0;
            return base + nodeCenter - (centerTick ? 0 : nodeWidth / 2);
        }
        getValueForPixel(pixel) {
            return this._nodes.findIndex((d) => pixel >= d.center - d.width / 2 && pixel <= d.center + d.width / 2);
        }
        static afterRegister() {
            chart_js.registry.addPlugins(hierarchicalPlugin);
        }
    }
    HierarchicalScale.id = 'hierarchical';
    HierarchicalScale.defaults = helpers.merge({}, [chart_js.CategoryScale.defaults, defaultConfig]);

    chart_js.registry.addScales(HierarchicalScale);

    exports.HierarchicalScale = HierarchicalScale;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.umd.js.map
