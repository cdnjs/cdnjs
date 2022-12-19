(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('graphre')) :
    typeof define === 'function' && define.amd ? define(['exports', 'graphre'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.nomnoml = {}, global.graphre));
})(this, (function (exports, graphre) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function range([min, max], count) {
        var output = [];
        for (var i = 0; i < count; i++)
            output.push(min + ((max - min) * i) / (count - 1));
        return output;
    }
    function sum(list, transform) {
        for (var i = 0, sum = 0, len = list.length; i < len; i++)
            sum += transform(list[i]);
        return sum;
    }
    function find(list, predicate) {
        for (var i = 0; i < list.length; i++)
            if (predicate(list[i]))
                return list[i];
        return undefined;
    }
    function last(list) {
        return list[list.length - 1];
    }
    function hasSubstring(haystack, needle) {
        if (needle === '')
            return true;
        if (!haystack)
            return false;
        return haystack.indexOf(needle) !== -1;
    }
    function indexBy(list, key) {
        var obj = {};
        for (var i = 0; i < list.length; i++)
            obj[list[i][key]] = list[i];
        return obj;
    }
    function uniqueBy(list, property) {
        var seen = {};
        var out = [];
        for (var i = 0; i < list.length; i++) {
            var key = list[i][property];
            if (!seen[key]) {
                seen[key] = true;
                out.push(list[i]);
            }
        }
        return out;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        range: range,
        sum: sum,
        find: find,
        last: last,
        hasSubstring: hasSubstring,
        indexBy: indexBy,
        uniqueBy: uniqueBy
    });

    function buildStyle(conf, title, body = {}) {
        return {
            title: {
                bold: title.bold || false,
                underline: title.underline || false,
                italic: title.italic || false,
                center: title.center || false,
            },
            body: {
                bold: body.bold || false,
                underline: body.underline || false,
                italic: body.italic || false,
                center: body.center || false,
            },
            dashed: conf.dashed || false,
            fill: conf.fill || undefined,
            stroke: conf.stroke || undefined,
            visual: conf.visual || 'class',
            direction: conf.direction || undefined,
        };
    }
    var styles = {
        ABSTRACT: buildStyle({ visual: 'class' }, { center: true, italic: true }),
        ACTOR: buildStyle({ visual: 'actor' }, { center: true }, { center: true }),
        CHOICE: buildStyle({ visual: 'rhomb' }, { center: true }, { center: true }),
        CLASS: buildStyle({ visual: 'class' }, { center: true, bold: true }),
        DATABASE: buildStyle({ visual: 'database' }, { center: true, bold: true }, { center: true }),
        END: buildStyle({ visual: 'end' }, {}),
        FRAME: buildStyle({ visual: 'frame' }, {}),
        HIDDEN: buildStyle({ visual: 'hidden' }, {}),
        INPUT: buildStyle({ visual: 'input' }, { center: true }),
        INSTANCE: buildStyle({ visual: 'class' }, { center: true, underline: true }),
        LABEL: buildStyle({ visual: 'none' }, { center: true }),
        LOLLIPOP: buildStyle({ visual: 'lollipop' }, { center: true }),
        NOTE: buildStyle({ visual: 'note' }, {}),
        PACKAGE: buildStyle({ visual: 'package' }, {}),
        RECEIVER: buildStyle({ visual: 'receiver' }, {}),
        REFERENCE: buildStyle({ visual: 'class', dashed: true }, { center: true }),
        SENDER: buildStyle({ visual: 'sender' }, {}),
        SOCKET: buildStyle({ visual: 'socket' }, {}),
        START: buildStyle({ visual: 'start' }, {}),
        STATE: buildStyle({ visual: 'roundrect' }, { center: true }),
        SYNC: buildStyle({ visual: 'sync' }, { center: true }),
        TABLE: buildStyle({ visual: 'table' }, { center: true, bold: true }),
        TRANSCEIVER: buildStyle({ visual: 'transceiver' }, {}),
        USECASE: buildStyle({ visual: 'ellipse' }, { center: true }, { center: true }),
    };
    function box(config, clas) {
        clas.width = Math.max(...clas.compartments.map((e) => e.width));
        clas.height = sum(clas.compartments, (e) => e.height);
        clas.dividers = [];
        var y = 0;
        for (var comp of clas.compartments) {
            comp.x = 0;
            comp.y = y;
            comp.width = clas.width;
            y += comp.height;
            if (comp != last(clas.compartments))
                clas.dividers.push([
                    { x: 0, y: y },
                    { x: clas.width, y: y },
                ]);
        }
    }
    function icon(config, clas) {
        clas.dividers = [];
        clas.compartments = [];
        clas.width = config.fontSize * 2.5;
        clas.height = config.fontSize * 2.5;
    }
    function labelledIcon(config, clas) {
        clas.width = config.fontSize * 1.5;
        clas.height = config.fontSize * 1.5;
        clas.dividers = [];
        var y = config.direction == 'LR' ? clas.height - config.padding : -clas.height / 2;
        for (var comp of clas.compartments) {
            if (config.direction == 'LR') {
                comp.x = clas.width / 2 - comp.width / 2;
                comp.y = y;
            }
            else {
                comp.x = clas.width / 2 + config.padding / 2;
                comp.y = y;
            }
            y += comp.height;
        }
    }
    var layouters = {
        actor: function (config, clas) {
            clas.width = Math.max(config.padding * 2, ...clas.compartments.map((e) => e.width));
            clas.height = config.padding * 3 + sum(clas.compartments, (e) => e.height);
            clas.dividers = [];
            var y = config.padding * 3;
            for (var comp of clas.compartments) {
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height;
                if (comp != last(clas.compartments))
                    clas.dividers.push([
                        { x: config.padding, y: y },
                        { x: clas.width - config.padding, y: y },
                    ]);
            }
        },
        class: box,
        database: function (config, clas) {
            clas.width = Math.max(...clas.compartments.map((e) => e.width));
            clas.height = sum(clas.compartments, (e) => e.height) + config.padding * 2;
            clas.dividers = [];
            var y = config.padding * 1.5;
            for (var comp of clas.compartments) {
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height;
                if (comp != last(clas.compartments)) {
                    var path = range([0, Math.PI], 16).map((a) => ({
                        x: clas.width * 0.5 * (1 - Math.cos(a)),
                        y: y + config.padding * (0.75 * Math.sin(a) - 0.5),
                    }));
                    clas.dividers.push(path);
                }
            }
        },
        ellipse: function (config, clas) {
            var width = Math.max(...clas.compartments.map((e) => e.width));
            var height = sum(clas.compartments, (e) => e.height);
            clas.width = width * 1.25;
            clas.height = height * 1.25;
            clas.dividers = [];
            var y = height * 0.125;
            var sq = (x) => x * x;
            var rimPos = (y) => Math.sqrt(sq(0.5) - sq(y / clas.height - 0.5)) * clas.width;
            for (var comp of clas.compartments) {
                comp.x = width * 0.125;
                comp.y = y;
                comp.width = width;
                y += comp.height;
                if (comp != last(clas.compartments))
                    clas.dividers.push([
                        { x: clas.width / 2 + rimPos(y) - 1, y: y },
                        { x: clas.width / 2 - rimPos(y) + 1, y: y },
                    ]);
            }
        },
        end: icon,
        frame: function (config, clas) {
            var w = clas.compartments[0].width;
            var h = clas.compartments[0].height;
            clas.compartments[0].width += h / 2;
            box(config, clas);
            if (clas.dividers.length)
                clas.dividers.shift();
            clas.dividers.unshift([
                { x: 0, y: h },
                { x: w - h / 4, y: h },
                { x: w + h / 4, y: h / 2 },
                { x: w + h / 4, y: 0 },
            ]);
        },
        hidden: function (config, clas) {
            clas.dividers = [];
            clas.compartments = [];
            clas.width = 1;
            clas.height = 1;
        },
        input: box,
        lollipop: labelledIcon,
        none: box,
        note: box,
        package: box,
        receiver: box,
        rhomb: function (config, clas) {
            var width = Math.max(...clas.compartments.map((e) => e.width));
            var height = sum(clas.compartments, (e) => e.height);
            clas.width = width * 1.5;
            clas.height = height * 1.5;
            clas.dividers = [];
            var y = height * 0.25;
            for (var comp of clas.compartments) {
                comp.x = width * 0.25;
                comp.y = y;
                comp.width = width;
                y += comp.height;
                var slope = clas.width / clas.height;
                if (comp != last(clas.compartments))
                    clas.dividers.push([
                        {
                            x: clas.width / 2 + (y < clas.height / 2 ? y * slope : (clas.height - y) * slope),
                            y: y,
                        },
                        {
                            x: clas.width / 2 - (y < clas.height / 2 ? y * slope : (clas.height - y) * slope),
                            y: y,
                        },
                    ]);
            }
        },
        roundrect: box,
        sender: box,
        socket: labelledIcon,
        start: icon,
        sync: function (config, clas) {
            clas.dividers = [];
            clas.compartments = [];
            if (config.direction == 'LR') {
                clas.width = config.lineWidth * 3;
                clas.height = config.fontSize * 5;
            }
            else {
                clas.width = config.fontSize * 5;
                clas.height = config.lineWidth * 3;
            }
        },
        table: function (config, clas) {
            if (clas.compartments.length == 1) {
                box(config, clas);
                return;
            }
            var gridcells = clas.compartments.slice(1);
            var rows = [[]];
            function isRowBreak(e) {
                return !e.lines.length && !e.nodes.length && !e.relations.length;
            }
            function isRowFull(e) {
                var current = last(rows);
                return rows[0] != current && rows[0].length == current.length;
            }
            function isEnd(e) {
                return comp == last(gridcells);
            }
            for (var comp of gridcells) {
                if (!isEnd() && isRowBreak(comp) && last(rows).length) {
                    rows.push([]);
                }
                else if (isRowFull()) {
                    rows.push([comp]);
                }
                else {
                    last(rows).push(comp);
                }
            }
            var header = clas.compartments[0];
            var cellW = Math.max(header.width / rows[0].length, ...gridcells.map((e) => e.width));
            var cellH = Math.max(...gridcells.map((e) => e.height));
            clas.width = cellW * rows[0].length;
            clas.height = header.height + cellH * rows.length;
            var hh = header.height;
            clas.dividers = [
                [
                    { x: 0, y: header.height },
                    { x: 0, y: header.height },
                ],
                ...rows.map((e, i) => [
                    { x: 0, y: hh + i * cellH },
                    { x: clas.width, y: hh + i * cellH },
                ]),
                ...rows[0].map((e, i) => [
                    { x: (i + 1) * cellW, y: hh },
                    { x: (i + 1) * cellW, y: clas.height },
                ]),
            ];
            header.x = 0;
            header.y = 0;
            header.width = clas.width;
            for (var i = 0; i < rows.length; i++) {
                for (var j = 0; j < rows[i].length; j++) {
                    var cell = rows[i][j];
                    cell.x = j * cellW;
                    cell.y = hh + i * cellH;
                    cell.width = cellW;
                }
            }
            clas.compartments = clas.compartments.filter((e) => !isRowBreak(e));
        },
        transceiver: box,
    };
    var visualizers = {
        actor: function (node, x, y, config, g) {
            var a = config.padding / 2;
            var yp = y + a * 4;
            var faceCenter = { x: node.x, y: yp - a };
            g.circle(faceCenter, a).fillAndStroke();
            g.path([
                { x: node.x, y: yp },
                { x: node.x, y: yp + 2 * a },
            ]).stroke();
            g.path([
                { x: node.x - a, y: yp + a },
                { x: node.x + a, y: yp + a },
            ]).stroke();
            g.path([
                { x: node.x - a, y: yp + a + config.padding },
                { x: node.x, y: yp + config.padding },
                { x: node.x + a, y: yp + a + config.padding },
            ]).stroke();
        },
        class: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        database: function (node, x, y, config, g) {
            var pad = config.padding;
            var cy = y - pad / 2;
            var pi = 3.1416;
            g.rect(x, y + pad, node.width, node.height - pad * 1.5).fill();
            g.path([
                { x: x, y: cy + pad * 1.5 },
                { x: x, y: cy - pad * 0.5 + node.height },
            ]).stroke();
            g.path([
                { x: x + node.width, y: cy + pad * 1.5 },
                { x: x + node.width, y: cy - pad * 0.5 + node.height },
            ]).stroke();
            g.ellipse({ x: node.x, y: cy + pad * 1.5 }, node.width, pad * 1.5).fillAndStroke();
            g.ellipse({ x: node.x, y: cy - pad * 0.5 + node.height }, node.width, pad * 1.5, 0, pi).fillAndStroke();
        },
        ellipse: function (node, x, y, config, g) {
            g.ellipse({ x: node.x, y: node.y }, node.width, node.height).fillAndStroke();
        },
        end: function (node, x, y, config, g) {
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 3).fillAndStroke();
            g.fillStyle(config.stroke);
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 3 - config.padding / 2).fill();
        },
        frame: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        hidden: function (node, x, y, config, g) { },
        input: function (node, x, y, config, g) {
            g.circuit([
                { x: x + config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x, y: y + node.height },
            ]).fillAndStroke();
        },
        lollipop: function (node, x, y, config, g) {
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 2.5).fillAndStroke();
        },
        none: function (node, x, y, config, g) { },
        note: function (node, x, y, config, g) {
            g.circuit([
                { x: x, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + config.padding },
                { x: x + node.width, y: y + node.height },
                { x: x, y: y + node.height },
                { x: x, y: y },
            ]).fillAndStroke();
            g.path([
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width - config.padding, y: y + config.padding },
                { x: x + node.width, y: y + config.padding },
            ]).stroke();
        },
        package: function (node, x, y, config, g) {
            var headHeight = node.compartments[0].height;
            g.rect(x, y + headHeight, node.width, node.height - headHeight).fillAndStroke();
            var w = g.measureText(node.name).width + 2 * config.padding;
            g.circuit([
                { x: x, y: y + headHeight },
                { x: x, y: y },
                { x: x + w, y: y },
                { x: x + w, y: y + headHeight },
            ]).fillAndStroke();
        },
        receiver: function (node, x, y, config, g) {
            g.circuit([
                { x: x - config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width, y: y + node.height },
                { x: x - config.padding, y: y + node.height },
                { x: x, y: y + node.height / 2 },
            ]).fillAndStroke();
        },
        rhomb: function (node, x, y, config, g) {
            g.circuit([
                { x: node.x, y: y },
                { x: x + node.width, y: node.y },
                { x: node.x, y: y + node.height },
                { x: x, y: node.y },
            ]).fillAndStroke();
        },
        roundrect: function (node, x, y, config, g) {
            var r = Math.min(config.padding * 2 * config.leading, node.height / 2);
            g.roundRect(x, y, node.width, node.height, r).fillAndStroke();
        },
        sender: function (node, x, y, config, g) {
            g.circuit([
                { x: x, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + node.height / 2 },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x, y: y + node.height },
            ]).fillAndStroke();
        },
        socket: function (node, x, y, config, g) {
            var from = config.direction === 'TB' ? Math.PI : Math.PI / 2;
            var to = config.direction === 'TB' ? 2 * Math.PI : -Math.PI / 2;
            g.ellipse({ x: node.x, y: node.y }, node.width, node.height, from, to).stroke();
        },
        start: function (node, x, y, config, g) {
            g.fillStyle(config.stroke);
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 2.5).fill();
        },
        sync: function (node, x, y, config, g) {
            g.fillStyle(config.stroke);
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        table: function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        transceiver: function (node, x, y, config, g) {
            g.circuit([
                { x: x - config.padding, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + node.height / 2 },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x - config.padding, y: y + node.height },
                { x: x, y: y + node.height / 2 },
            ]).fillAndStroke();
        },
    };

    function layout(measurer, config, ast) {
        function measureLines(lines, fontWeight) {
            if (!lines.length)
                return { width: 0, height: config.padding };
            measurer.setFont(config.font, config.fontSize, fontWeight, 'normal');
            return {
                width: Math.round(Math.max(...lines.map(measurer.textWidth)) + 2 * config.padding),
                height: Math.round(measurer.textHeight() * lines.length + 2 * config.padding),
            };
        }
        function layoutCompartment(c, compartmentIndex, style) {
            var _a, _b;
            var textSize = measureLines(c.lines, compartmentIndex ? 'normal' : 'bold');
            if (!c.nodes.length && !c.relations.length) {
                c.width = textSize.width;
                c.height = textSize.height;
                c.offset = { x: config.padding, y: config.padding };
                return;
            }
            var styledConfig = Object.assign(Object.assign({}, config), { direction: (_a = style.direction) !== null && _a !== void 0 ? _a : config.direction });
            c.nodes.forEach((e) => layoutClassifier(e, styledConfig));
            var g = new graphre.graphlib.Graph();
            g.setGraph({
                rankdir: style.direction || config.direction,
                nodesep: config.spacing,
                edgesep: config.spacing,
                ranksep: config.spacing,
                acyclicer: config.acyclicer,
                ranker: config.ranker,
            });
            for (var e of c.nodes) {
                g.setNode(e.name, { width: e.layoutWidth, height: e.layoutHeight });
            }
            for (var r of c.relations) {
                if (r.assoc.indexOf('_') > -1) {
                    g.setEdge(r.start, r.end, { id: r.id, minlen: 0 });
                }
                else if (((_b = config.gravity) !== null && _b !== void 0 ? _b : 1) != 1) {
                    g.setEdge(r.start, r.end, { id: r.id, minlen: config.gravity });
                }
                else {
                    g.setEdge(r.start, r.end, { id: r.id });
                }
            }
            graphre.layout(g);
            var rels = indexBy(c.relations, 'id');
            var nodes = indexBy(c.nodes, 'name');
            g.nodes().forEach((name) => {
                var node = g.node(name);
                nodes[name].x = node.x;
                nodes[name].y = node.y;
            });
            var left = 0;
            var right = 0;
            var top = 0;
            var bottom = 0;
            g.edges().forEach((edgeObj) => {
                var edge = g.edge(edgeObj);
                var start = nodes[edgeObj.v];
                var end = nodes[edgeObj.w];
                var rel = rels[edge.id];
                rel.path = [start, ...edge.points, end].map(toPoint);
                var startP = rel.path[1];
                var endP = rel.path[rel.path.length - 2];
                layoutLabel(rel.startLabel, startP, adjustQuadrant(quadrant(startP, start, 4), start, end));
                layoutLabel(rel.endLabel, endP, adjustQuadrant(quadrant(endP, end, 2), end, start));
                left = Math.min(left, rel.startLabel.x, rel.endLabel.x, ...edge.points.map((e) => e.x), ...edge.points.map((e) => e.x));
                right = Math.max(right, rel.startLabel.x + rel.startLabel.width, rel.endLabel.x + rel.endLabel.width, ...edge.points.map((e) => e.x));
                top = Math.min(top, rel.startLabel.y, rel.endLabel.y, ...edge.points.map((e) => e.y));
                bottom = Math.max(bottom, rel.startLabel.y + rel.startLabel.height, rel.endLabel.y + rel.endLabel.height, ...edge.points.map((e) => e.y));
            });
            var graph = g.graph();
            var width = Math.max(graph.width, right - left);
            var height = Math.max(graph.height, bottom - top);
            var graphHeight = height ? height + 2 * config.gutter : 0;
            var graphWidth = width ? width + 2 * config.gutter : 0;
            c.width = Math.max(textSize.width, graphWidth) + 2 * config.padding;
            c.height = textSize.height + graphHeight + config.padding;
            c.offset = { x: config.padding - left, y: config.padding - top };
        }
        function toPoint(o) {
            return { x: o.x, y: o.y };
        }
        function layoutLabel(label, point, quadrant) {
            if (!label.text) {
                label.width = 0;
                label.height = 0;
                label.x = point.x;
                label.y = point.y;
            }
            else {
                var fontSize = config.fontSize;
                var lines = label.text.split('`');
                label.width = Math.max(...lines.map((l) => measurer.textWidth(l)));
                label.height = fontSize * lines.length;
                label.x =
                    point.x + (quadrant == 1 || quadrant == 4 ? config.padding : -label.width - config.padding);
                label.y =
                    point.y + (quadrant == 3 || quadrant == 4 ? config.padding : -label.height - config.padding);
            }
        }
        function quadrant(point, node, fallback) {
            if (point.x < node.x && point.y < node.y)
                return 1;
            if (point.x > node.x && point.y < node.y)
                return 2;
            if (point.x > node.x && point.y > node.y)
                return 3;
            if (point.x < node.x && point.y > node.y)
                return 4;
            return fallback;
        }
        function adjustQuadrant(quadrant, point, opposite) {
            if (opposite.x == point.x || opposite.y == point.y)
                return quadrant;
            var flipHorizontally = [4, 3, 2, 1];
            var flipVertically = [2, 1, 4, 3];
            var oppositeQuadrant = opposite.y < point.y ? (opposite.x < point.x ? 2 : 1) : opposite.x < point.x ? 3 : 4;
            if (oppositeQuadrant === quadrant) {
                if (config.direction === 'LR')
                    return flipHorizontally[quadrant - 1];
                if (config.direction === 'TB')
                    return flipVertically[quadrant - 1];
            }
            return quadrant;
        }
        function layoutClassifier(clas, config) {
            var style = config.styles[clas.type] || styles.CLASS;
            clas.compartments.forEach((co, i) => layoutCompartment(co, i, style));
            layouters[style.visual](config, clas);
            clas.layoutWidth = clas.width + 2 * config.edgeMargin;
            clas.layoutHeight = clas.height + 2 * config.edgeMargin;
        }
        layoutCompartment(ast, 0, styles.CLASS);
        return ast;
    }

    class Compartment {
        constructor(lines, nodes, relations) {
            this.lines = lines;
            this.nodes = nodes;
            this.relations = relations;
        }
    }
    class Relation {
    }
    class Classifier {
        constructor(type, name, compartments) {
            this.type = type;
            this.name = name;
            this.compartments = compartments;
            this.dividers = [];
        }
    }

    /* parser generated by jison 0.4.18 */
    /*
      Returns a Parser object of the following structure:

      Parser: {
        yy: {}
      }

      Parser.prototype: {
        yy: {},
        trace: function(),
        symbols_: {associative list: name ==> number},
        terminals_: {associative list: number ==> name},
        productions_: [...],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
        table: [...],
        defaultActions: {...},
        parseError: function(str, hash),
        parse: function(input),

        lexer: {
            EOF: 1,
            parseError: function(str, hash),
            setInput: function(input),
            input: function(),
            unput: function(str),
            more: function(),
            less: function(n),
            pastInput: function(),
            upcomingInput: function(),
            showPosition: function(),
            test_match: function(regex_match_array, rule_index),
            next: function(),
            lex: function(),
            begin: function(condition),
            popState: function(),
            _currentRules: function(),
            topState: function(),
            pushState: function(condition),

            options: {
                ranges: boolean           (optional: true ==> token location info will include a .range[] member)
                flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
                backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
            },

            performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
            rules: [...],
            conditions: {associative list: name ==> set},
        }
      }


      token location info (@$, _$, etc.): {
        first_line: n,
        last_line: n,
        first_column: n,
        last_column: n,
        range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
      }


      the parseError function receives a 'hash' object with these members for lexer and parser errors: {
        text:        (matched text)
        token:       (the produced terminal token, if any)
        line:        (yylineno)
      }
      while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
        loc:         (yylloc)
        expected:    (string describing the set of expected tokens)
        recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
      }
    */
    var nomnomlCoreParser = (function(){
    var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,5],$V1=[1,8],$V2=[5,6,12,14],$V3=[12,14],$V4=[1,22];
    var parser = {trace: function trace () { },
    yy: {},
    symbols_: {"error":2,"root":3,"compartment":4,"EOF":5,"SEP":6,"slot":7,"IDENT":8,"class":9,"association":10,"parts":11,"|":12,"[":13,"]":14,"$accept":0,"$end":1},
    terminals_: {2:"error",5:"EOF",6:"SEP",8:"IDENT",12:"|",13:"[",14:"]"},
    productions_: [0,[3,2],[3,3],[3,4],[3,3],[7,1],[7,1],[7,1],[4,1],[4,3],[11,1],[11,3],[11,2],[10,3],[9,3]],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
    /* this == yyval */

    var $0 = $$.length - 1;
    switch (yystate) {
    case 1: case 2:
     return $$[$0-1] 
    case 3: case 4:
     return $$[$0-2] 
    case 5:
    this.$ = $$[$0].trim().replace(/\\(\[|\]|\|)/g, '$'+'1');
    break;
    case 6: case 7:
    this.$ = $$[$0];
    break;
    case 8: case 10:
    this.$ = [$$[$0]];
    break;
    case 9:
    this.$ = $$[$0-2].concat($$[$0]);
    break;
    case 11:
    this.$ = $$[$0-2].concat([$$[$0]]);
    break;
    case 12:
    this.$ = $$[$0-1].concat([[]]);
    break;
    case 13:

               var t = $$[$0-1].trim().replace(/\\(\[|\]|\|)/g, '$'+'1').match('^(.*?)([)<:o+(]*[-_]/?[-_]*[):o+>(]*)(.*)$');
               if (!t) {
                 throw new Error('line '+_$[$0].first_line+': Classifiers must be separated by a relation or a line break')
               }
               this.$ = {assoc:t[2], start:$$[$0-2], end:$$[$0], startLabel:t[1].trim(), endLabel:t[3].trim()};
      
    break;
    case 14:

               var type = 'CLASS';
               var id = $$[$0-1][0][0];
               var typeMatch = $$[$0-1][0][0].match('<([a-z]*)>(.*)');
               if (typeMatch) {
                   type = typeMatch[1].toUpperCase();
                   id = typeMatch[2].trim();
               }
               $$[$0-1][0][0] = id;
               this.$ = {type:type, id:id, parts:$$[$0-1]};
      
    break;
    }
    },
    table: [{3:1,4:2,6:[1,3],7:4,8:$V0,9:6,10:7,13:$V1},{1:[3]},{5:[1,9],6:[1,10]},{4:11,7:4,8:$V0,9:6,10:7,13:$V1},o($V2,[2,8]),o($V2,[2,5]),o($V2,[2,6],{8:[1,12]}),o($V2,[2,7]),{4:14,7:4,8:$V0,9:6,10:7,11:13,13:$V1},{1:[2,1]},{5:[1,15],7:16,8:$V0,9:6,10:7,13:$V1},{5:[1,17],6:[1,18]},{9:19,13:$V1},{12:[1,21],14:[1,20]},o($V3,[2,10],{6:$V4}),{1:[2,4]},o($V2,[2,9]),{1:[2,2]},{5:[1,23],7:16,8:$V0,9:6,10:7,13:$V1},o($V2,[2,13]),o([5,6,8,12,14],[2,14]),o($V3,[2,12],{7:4,9:6,10:7,4:24,8:$V0,13:$V1}),{7:16,8:$V0,9:6,10:7,13:$V1},{1:[2,3]},o($V3,[2,11],{6:$V4})],
    defaultActions: {9:[2,1],15:[2,4],17:[2,2],23:[2,3]},
    parseError: function parseError (str, hash) {
        if (hash.recoverable) {
            this.trace(str);
        } else {
            var error = new Error(str);
            error.hash = hash;
            throw error;
        }
    },
    parse: function parse(input) {
        var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, TERROR = 2, EOF = 1;
        var args = lstack.slice.call(arguments, 1);
        var lexer = Object.create(this.lexer);
        var sharedState = { yy: {} };
        for (var k in this.yy) {
            if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                sharedState.yy[k] = this.yy[k];
            }
        }
        lexer.setInput(input, sharedState.yy);
        sharedState.yy.lexer = lexer;
        sharedState.yy.parser = this;
        if (typeof lexer.yylloc == 'undefined') {
            lexer.yylloc = {};
        }
        var yyloc = lexer.yylloc;
        lstack.push(yyloc);
        var ranges = lexer.options && lexer.options.ranges;
        if (typeof sharedState.yy.parseError === 'function') {
            this.parseError = sharedState.yy.parseError;
        } else {
            this.parseError = Object.getPrototypeOf(this).parseError;
        }
        var lex = function () {
                var token;
                token = lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    token = self.symbols_[token] || token;
                }
                return token;
            };
        var symbol, state, action, r, yyval = {}, p, len, newState, expected;
        while (true) {
            state = stack[stack.length - 1];
            if (this.defaultActions[state]) {
                action = this.defaultActions[state];
            } else {
                if (symbol === null || typeof symbol == 'undefined') {
                    symbol = lex();
                }
                action = table[state] && table[state][symbol];
            }
                        if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
            if (action[0] instanceof Array && action.length > 1) {
                throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
            }
            switch (action[0]) {
            case 1:
                stack.push(symbol);
                vstack.push(lexer.yytext);
                lstack.push(lexer.yylloc);
                stack.push(action[1]);
                symbol = null;
                {
                    yyleng = lexer.yyleng;
                    yytext = lexer.yytext;
                    yylineno = lexer.yylineno;
                    yyloc = lexer.yylloc;
                }
                break;
            case 2:
                len = this.productions_[action[1]][1];
                yyval.$ = vstack[vstack.length - len];
                yyval._$ = {
                    first_line: lstack[lstack.length - (len || 1)].first_line,
                    last_line: lstack[lstack.length - 1].last_line,
                    first_column: lstack[lstack.length - (len || 1)].first_column,
                    last_column: lstack[lstack.length - 1].last_column
                };
                if (ranges) {
                    yyval._$.range = [
                        lstack[lstack.length - (len || 1)].range[0],
                        lstack[lstack.length - 1].range[1]
                    ];
                }
                r = this.performAction.apply(yyval, [
                    yytext,
                    yyleng,
                    yylineno,
                    sharedState.yy,
                    action[1],
                    vstack,
                    lstack
                ].concat(args));
                if (typeof r !== 'undefined') {
                    return r;
                }
                if (len) {
                    stack = stack.slice(0, -1 * len * 2);
                    vstack = vstack.slice(0, -1 * len);
                    lstack = lstack.slice(0, -1 * len);
                }
                stack.push(this.productions_[action[1]][0]);
                vstack.push(yyval.$);
                lstack.push(yyval._$);
                newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                stack.push(newState);
                break;
            case 3:
                return true;
            }
        }
        return true;
    }};
    /* generated by jison-lex 0.3.4 */
    var lexer = (function(){
    var lexer = ({

    EOF:1,

    parseError:function parseError(str, hash) {
            if (this.yy.parser) {
                this.yy.parser.parseError(str, hash);
            } else {
                throw new Error(str);
            }
        },

    // resets the lexer, sets new input
    setInput:function (input, yy) {
            this.yy = yy || this.yy || {};
            this._input = input;
            this._more = this._backtrack = this.done = false;
            this.yylineno = this.yyleng = 0;
            this.yytext = this.matched = this.match = '';
            this.conditionStack = ['INITIAL'];
            this.yylloc = {
                first_line: 1,
                first_column: 0,
                last_line: 1,
                last_column: 0
            };
            if (this.options.ranges) {
                this.yylloc.range = [0,0];
            }
            this.offset = 0;
            return this;
        },

    // consumes and returns one char from the input
    input:function () {
            var ch = this._input[0];
            this.yytext += ch;
            this.yyleng++;
            this.offset++;
            this.match += ch;
            this.matched += ch;
            var lines = ch.match(/(?:\r\n?|\n).*/g);
            if (lines) {
                this.yylineno++;
                this.yylloc.last_line++;
            } else {
                this.yylloc.last_column++;
            }
            if (this.options.ranges) {
                this.yylloc.range[1]++;
            }

            this._input = this._input.slice(1);
            return ch;
        },

    // unshifts one char (or a string) into the input
    unput:function (ch) {
            var len = ch.length;
            var lines = ch.split(/(?:\r\n?|\n)/g);

            this._input = ch + this._input;
            this.yytext = this.yytext.substr(0, this.yytext.length - len);
            //this.yyleng -= len;
            this.offset -= len;
            var oldLines = this.match.split(/(?:\r\n?|\n)/g);
            this.match = this.match.substr(0, this.match.length - 1);
            this.matched = this.matched.substr(0, this.matched.length - 1);

            if (lines.length - 1) {
                this.yylineno -= lines.length - 1;
            }
            var r = this.yylloc.range;

            this.yylloc = {
                first_line: this.yylloc.first_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.first_column,
                last_column: lines ?
                    (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                     + oldLines[oldLines.length - lines.length].length - lines[0].length :
                  this.yylloc.first_column - len
            };

            if (this.options.ranges) {
                this.yylloc.range = [r[0], r[0] + this.yyleng - len];
            }
            this.yyleng = this.yytext.length;
            return this;
        },

    // When called from action, caches matched text and appends it on next action
    more:function () {
            this._more = true;
            return this;
        },

    // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
    reject:function () {
            if (this.options.backtrack_lexer) {
                this._backtrack = true;
            } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });

            }
            return this;
        },

    // retain first n characters of the match
    less:function (n) {
            this.unput(this.match.slice(n));
        },

    // displays already matched input, i.e. for error messages
    pastInput:function () {
            var past = this.matched.substr(0, this.matched.length - this.match.length);
            return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
        },

    // displays upcoming input, i.e. for error messages
    upcomingInput:function () {
            var next = this.match;
            if (next.length < 20) {
                next += this._input.substr(0, 20-next.length);
            }
            return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
        },

    // displays the character position where the lexing error occurred, i.e. for error messages
    showPosition:function () {
            var pre = this.pastInput();
            var c = new Array(pre.length + 1).join("-");
            return pre + this.upcomingInput() + "\n" + c + "^";
        },

    // test the lexed token: return FALSE when not a match, otherwise return token
    test_match:function(match, indexed_rule) {
            var token,
                lines,
                backup;

            if (this.options.backtrack_lexer) {
                // save context
                backup = {
                    yylineno: this.yylineno,
                    yylloc: {
                        first_line: this.yylloc.first_line,
                        last_line: this.last_line,
                        first_column: this.yylloc.first_column,
                        last_column: this.yylloc.last_column
                    },
                    yytext: this.yytext,
                    match: this.match,
                    matches: this.matches,
                    matched: this.matched,
                    yyleng: this.yyleng,
                    offset: this.offset,
                    _more: this._more,
                    _input: this._input,
                    yy: this.yy,
                    conditionStack: this.conditionStack.slice(0),
                    done: this.done
                };
                if (this.options.ranges) {
                    backup.yylloc.range = this.yylloc.range.slice(0);
                }
            }

            lines = match[0].match(/(?:\r\n?|\n).*/g);
            if (lines) {
                this.yylineno += lines.length;
            }
            this.yylloc = {
                first_line: this.yylloc.last_line,
                last_line: this.yylineno + 1,
                first_column: this.yylloc.last_column,
                last_column: lines ?
                             lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                             this.yylloc.last_column + match[0].length
            };
            this.yytext += match[0];
            this.match += match[0];
            this.matches = match;
            this.yyleng = this.yytext.length;
            if (this.options.ranges) {
                this.yylloc.range = [this.offset, this.offset += this.yyleng];
            }
            this._more = false;
            this._backtrack = false;
            this._input = this._input.slice(match[0].length);
            this.matched += match[0];
            token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
            if (this.done && this._input) {
                this.done = false;
            }
            if (token) {
                return token;
            } else if (this._backtrack) {
                // recover context
                for (var k in backup) {
                    this[k] = backup[k];
                }
                return false; // rule action called reject() implying the next rule should be tested instead.
            }
            return false;
        },

    // return next match in input
    next:function () {
            if (this.done) {
                return this.EOF;
            }
            if (!this._input) {
                this.done = true;
            }

            var token,
                match,
                tempMatch,
                index;
            if (!this._more) {
                this.yytext = '';
                this.match = '';
            }
            var rules = this._currentRules();
            for (var i = 0; i < rules.length; i++) {
                tempMatch = this._input.match(this.rules[rules[i]]);
                if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                    match = tempMatch;
                    index = i;
                    if (this.options.backtrack_lexer) {
                        token = this.test_match(tempMatch, rules[i]);
                        if (token !== false) {
                            return token;
                        } else if (this._backtrack) {
                            match = false;
                            continue; // rule action called reject() implying a rule MISmatch.
                        } else {
                            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                            return false;
                        }
                    } else if (!this.options.flex) {
                        break;
                    }
                }
            }
            if (match) {
                token = this.test_match(match, rules[index]);
                if (token !== false) {
                    return token;
                }
                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                return false;
            }
            if (this._input === "") {
                return this.EOF;
            } else {
                return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                    text: "",
                    token: null,
                    line: this.yylineno
                });
            }
        },

    // return next match that has a token
    lex:function lex () {
            var r = this.next();
            if (r) {
                return r;
            } else {
                return this.lex();
            }
        },

    // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
    begin:function begin (condition) {
            this.conditionStack.push(condition);
        },

    // pop the previously active lexer condition state off the condition stack
    popState:function popState () {
            var n = this.conditionStack.length - 1;
            if (n > 0) {
                return this.conditionStack.pop();
            } else {
                return this.conditionStack[0];
            }
        },

    // produce the lexer rule set which is active for the currently active lexer condition state
    _currentRules:function _currentRules () {
            if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            } else {
                return this.conditions["INITIAL"].rules;
            }
        },

    // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
    topState:function topState (n) {
            n = this.conditionStack.length - 1 - Math.abs(n || 0);
            if (n >= 0) {
                return this.conditionStack[n];
            } else {
                return "INITIAL";
            }
        },

    // alias for begin(condition)
    pushState:function pushState (condition) {
            this.begin(condition);
        },

    // return the number of states currently on the stack
    stateStackSize:function stateStackSize() {
            return this.conditionStack.length;
        },
    options: {},
    performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
    switch($avoiding_name_collisions) {
    case 0:return 12
    case 1:return 8
    case 2:return 13
    case 3:return 14
    case 4:return 6
    case 5:return 5
    case 6:return 'INVALID'
    }
    },
    rules: [/^(?:\s*\|\s*)/,/^(?:(\\(\[|\]|\|)|[^\]\[|;\n])+)/,/^(?:\[)/,/^(?:\s*\])/,/^(?:[ ]*(;|\n)+[ ]*)/,/^(?:$)/,/^(?:.)/],
    conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}}
    });
    return lexer;
    })();
    parser.lexer = lexer;
    function Parser () {
      this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser;
    })();

    function parse(source) {
        function onlyCompilables(line) {
            var ok = line[0] !== '#' && line.trim().substring(0, 2) !== '//';
            return ok ? line.trim() : '';
        }
        function isDirective(line) {
            return line.text[0] === '#';
        }
        var lines = source.split('\n').map((s, i) => ({ text: s, index: i }));
        var pureDirectives = lines.filter(isDirective);
        var directives = {};
        pureDirectives.forEach((line) => {
            try {
                var tokens = line.text.substring(1).split(':');
                directives[tokens[0].trim()] = tokens[1].trim();
            }
            catch (e) {
                throw new Error('line ' + (line.index + 1) + ': Malformed directive');
            }
        });
        var pureDiagramCode = lines.map((e) => onlyCompilables(e.text)).join('\n');
        if (pureDiagramCode == '') {
            return {
                root: new Compartment([], [], []),
                config: getConfig(directives),
            };
        }
        var parseTree = intermediateParse(pureDiagramCode);
        return {
            root: transformParseIntoSyntaxTree(parseTree),
            config: getConfig(directives),
        };
        function directionToDagre(word) {
            if (word == 'down')
                return 'TB';
            if (word == 'right')
                return 'LR';
            else
                return 'TB';
        }
        function parseRanker(word) {
            if (word == 'network-simplex' || word == 'tight-tree' || word == 'longest-path') {
                return word;
            }
            return 'network-simplex';
        }
        function parseCustomStyle(styleDef) {
            var contains = hasSubstring;
            var floatingKeywords = styleDef.replace(/[a-z]*=[^ ]+/g, '');
            var titleDef = last(styleDef.match('title=([^ ]*)') || ['']);
            var bodyDef = last(styleDef.match('body=([^ ]*)') || ['']);
            return {
                title: {
                    bold: contains(titleDef, 'bold') || contains(floatingKeywords, 'bold'),
                    underline: contains(titleDef, 'underline') || contains(floatingKeywords, 'underline'),
                    italic: contains(titleDef, 'italic') || contains(floatingKeywords, 'italic'),
                    center: !(contains(titleDef, 'left') || contains(styleDef, 'align=left')),
                },
                body: {
                    bold: contains(bodyDef, 'bold'),
                    underline: contains(bodyDef, 'underline'),
                    italic: contains(bodyDef, 'italic'),
                    center: contains(bodyDef, 'center'),
                },
                dashed: contains(styleDef, 'dashed'),
                fill: last(styleDef.match('fill=([^ ]*)') || []),
                stroke: last(styleDef.match('stroke=([^ ]*)') || []),
                visual: (last(styleDef.match('visual=([^ ]*)') || []) || 'class'),
                direction: directionToDagre(last(styleDef.match('direction=([^ ]*)') || [])),
            };
        }
        function getConfig(d) {
            var _a;
            var userStyles = {};
            for (var key in d) {
                if (key[0] != '.')
                    continue;
                var styleDef = d[key];
                userStyles[key.substring(1).toUpperCase()] = parseCustomStyle(styleDef);
            }
            return {
                arrowSize: +d.arrowSize || 1,
                bendSize: +d.bendSize || 0.3,
                direction: directionToDagre(d.direction),
                gutter: +d.gutter || 20,
                edgeMargin: +d.edgeMargin || 0,
                gravity: +((_a = d.gravity) !== null && _a !== void 0 ? _a : 1),
                edges: d.edges == 'hard' ? 'hard' : 'rounded',
                fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
                background: d.background || 'transparent',
                fillArrows: d.fillArrows === 'true',
                font: d.font || 'Helvetica',
                fontSize: +d.fontSize || 12,
                leading: +d.leading || 1.25,
                lineWidth: +d.lineWidth || 3,
                padding: +d.padding || 8,
                spacing: +d.spacing || 40,
                stroke: d.stroke || '#33322E',
                title: d.title || '',
                zoom: +d.zoom || 1,
                acyclicer: d.acyclicer === 'greedy' ? 'greedy' : undefined,
                ranker: parseRanker(d.ranker),
                styles: Object.assign(Object.assign({}, styles), userStyles),
            };
        }
    }
    function intermediateParse(source) {
        return nomnomlCoreParser.parse(source);
    }
    function transformParseIntoSyntaxTree(entity) {
        function isAstClassifier(obj) {
            return obj.parts !== undefined;
        }
        function isAstRelation(obj) {
            return obj.assoc !== undefined;
        }
        var relationId = 0;
        function transformCompartment(slots) {
            var lines = [];
            var rawClassifiers = [];
            var relations = [];
            slots.forEach((p) => {
                if (typeof p === 'string')
                    lines.push(p);
                if (isAstRelation(p)) {
                    rawClassifiers.push(p.start);
                    rawClassifiers.push(p.end);
                    relations.push({
                        id: relationId++,
                        assoc: p.assoc,
                        start: p.start.parts[0][0],
                        end: p.end.parts[0][0],
                        startLabel: { text: p.startLabel },
                        endLabel: { text: p.endLabel },
                    });
                }
                if (isAstClassifier(p)) {
                    rawClassifiers.push(p);
                }
            });
            var allClassifiers = rawClassifiers
                .map(transformClassifier)
                .sort((a, b) => b.compartments.length - a.compartments.length);
            var uniqClassifiers = uniqueBy(allClassifiers, 'name');
            var uniqRelations = relations.filter((a) => {
                for (var b of relations) {
                    if (a === b)
                        return true;
                    if (b.start == a.start && b.end == a.end)
                        return false;
                }
                return true;
            });
            return new Compartment(lines, uniqClassifiers, uniqRelations);
        }
        function transformClassifier(entity) {
            var compartments = entity.parts.map(transformCompartment);
            return new Classifier(entity.type, entity.id, compartments);
        }
        return transformCompartment(entity);
    }

    function add(a, b) {
        return { x: a.x + b.x, y: a.y + b.y };
    }
    function diff(a, b) {
        return { x: a.x - b.x, y: a.y - b.y };
    }
    function mult(v, factor) {
        return { x: factor * v.x, y: factor * v.y };
    }
    function mag(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
    }
    function normalize(v) {
        return mult(v, 1 / mag(v));
    }
    function rot(a) {
        return { x: a.y, y: -a.x };
    }

    const empty = false;
    const filled = true;
    function getPath(config, r) {
        var path = r.path.slice(1, -1);
        var endDir = normalize(diff(path[path.length - 2], last(path)));
        var startDir = normalize(diff(path[1], path[0]));
        var size = (config.spacing * config.arrowSize) / 30;
        var head = 0;
        var end = path.length - 1;
        var copy = path.map((p) => ({ x: p.x, y: p.y }));
        var tokens = r.assoc.split(/[-_]/);
        copy[head] = add(copy[head], mult(startDir, size * terminatorSize(tokens[0])));
        copy[end] = add(copy[end], mult(endDir, size * terminatorSize(last(tokens))));
        return copy;
    }
    function terminatorSize(id) {
        if (id === '>' || id === '<')
            return 5;
        if (id === ':>' || id === '<:')
            return 10;
        if (id === '+')
            return 14;
        if (id === 'o')
            return 14;
        if (id === '(' || id === ')')
            return 11;
        if (id === '(o' || id === 'o)')
            return 11;
        if (id === '>o' || id === 'o<')
            return 15;
        return 0;
    }
    function drawTerminators(g, config, r) {
        var start = r.path[1];
        var end = r.path[r.path.length - 2];
        var path = r.path.slice(1, -1);
        var tokens = r.assoc.split(/[-_]/);
        drawArrowEnd(last(tokens), path, end);
        drawArrowEnd(tokens[0], path.reverse(), start);
        function drawArrowEnd(id, path, end) {
            var dir = normalize(diff(path[path.length - 2], last(path)));
            var size = (config.spacing * config.arrowSize) / 30;
            if (id === '>' || id === '<')
                drawArrow(dir, size, filled, end);
            else if (id === ':>' || id === '<:')
                drawArrow(dir, size, empty, end);
            else if (id === '+')
                drawDiamond(dir, size, filled, end);
            else if (id === 'o')
                drawDiamond(dir, size, empty, end);
            else if (id === '(' || id === ')') {
                drawSocket(dir, size, 11, end);
                drawStem(dir, size, 5, end);
            }
            else if (id === '(o' || id === 'o)') {
                drawSocket(dir, size, 11, end);
                drawStem(dir, size, 5, end);
                drawBall(dir, size, 11, end);
            }
            else if (id === '>o' || id === 'o<') {
                drawArrow(dir, size * 0.75, empty, add(end, mult(dir, size * 10)));
                drawStem(dir, size, 8, end);
                drawBall(dir, size, 8, end);
            }
        }
        function drawBall(nv, size, stem, end) {
            var center = add(end, mult(nv, size * stem));
            g.fillStyle(config.fill[0]);
            g.ellipse(center, size * 6, size * 6).fillAndStroke();
        }
        function drawStem(nv, size, stem, end) {
            var center = add(end, mult(nv, size * stem));
            g.path([center, end]).stroke();
        }
        function drawSocket(nv, size, stem, end) {
            var base = add(end, mult(nv, size * stem));
            var t = rot(nv);
            var socket = range([-Math.PI / 2, Math.PI / 2], 12).map((a) => add(base, add(mult(nv, -6 * size * Math.cos(a)), mult(t, 6 * size * Math.sin(a)))));
            g.path(socket).stroke();
        }
        function drawArrow(nv, size, isOpen, end) {
            const x = (s) => add(end, mult(nv, s * size));
            const y = (s) => mult(rot(nv), s * size);
            var arrow = [add(x(10), y(4)), x(isOpen && !config.fillArrows ? 5 : 10), add(x(10), y(-4)), end];
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
        }
        function drawDiamond(nv, size, isOpen, end) {
            const x = (s) => add(end, mult(nv, s * size));
            const y = (s) => mult(rot(nv), s * size);
            var arrow = [add(x(7), y(4)), x(14), add(x(7), y(-4)), end];
            g.save();
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
            g.restore();
        }
    }

    function render(graphics, config, compartment) {
        var g = graphics;
        function renderCompartment(compartment, color, style, level) {
            g.save();
            g.translate(compartment.offset.x, compartment.offset.y);
            g.fillStyle(color || config.stroke);
            compartment.lines.forEach((text, i) => {
                g.textAlign(style.center ? 'center' : 'left');
                var x = style.center ? compartment.width / 2 - config.padding : 0;
                var y = (0.5 + (i + 0.5) * config.leading) * config.fontSize;
                if (text) {
                    g.fillText(text, x, y);
                }
                if (style.underline) {
                    var w = g.measureText(text).width;
                    y += Math.round(config.fontSize * 0.2) + 0.5;
                    if (style.center) {
                        g.path([
                            { x: x - w / 2, y: y },
                            { x: x + w / 2, y: y },
                        ]).stroke();
                    }
                    else {
                        g.path([
                            { x: x, y: y },
                            { x: x + w, y: y },
                        ]).stroke();
                    }
                    g.lineWidth(config.lineWidth);
                }
            });
            g.save();
            g.translate(config.gutter, config.gutter);
            compartment.relations.forEach((r) => renderRelation(r));
            compartment.nodes.forEach((n) => renderNode(n, level));
            g.restore();
            g.restore();
        }
        function renderNode(node, level) {
            var x = Math.round(node.x - node.width / 2);
            var y = Math.round(node.y - node.height / 2);
            var style = config.styles[node.type] || styles.CLASS;
            g.save();
            g.setData('name', node.name);
            g.save();
            g.fillStyle(style.fill || config.fill[level] || last(config.fill));
            g.strokeStyle(style.stroke || config.stroke);
            if (style.dashed) {
                var dash = Math.max(4, 2 * config.lineWidth);
                g.setLineDash([dash, dash]);
            }
            var drawNode = visualizers[style.visual] || visualizers.class;
            drawNode(node, x, y, config, g);
            for (var divider of node.dividers) {
                g.path(divider.map((e) => add(e, { x, y }))).stroke();
            }
            g.restore();
            node.compartments.forEach((part, i) => {
                var textStyle = i == 0 ? style.title : style.body;
                g.save();
                g.translate(x + part.x, y + part.y);
                g.setFont(config.font, config.fontSize, textStyle.bold ? 'bold' : 'normal', textStyle.italic ? 'italic' : 'normal');
                renderCompartment(part, style.stroke, textStyle, level + 1);
                g.restore();
            });
            g.restore();
        }
        function strokePath(p) {
            if (config.edges === 'rounded') {
                var radius = config.spacing * config.bendSize;
                g.beginPath();
                g.moveTo(p[0].x, p[0].y);
                for (var i = 1; i < p.length - 1; i++) {
                    g.arcTo(p[i].x, p[i].y, p[i + 1].x, p[i + 1].y, radius);
                }
                g.lineTo(last(p).x, last(p).y);
                g.stroke();
            }
            else
                g.path(p).stroke();
        }
        function renderLabel(label) {
            if (!label || !label.text)
                return;
            var fontSize = config.fontSize;
            var lines = label.text.split('`');
            lines.forEach((l, i) => g.fillText(l, label.x, label.y + fontSize * (i + 1)));
        }
        function renderRelation(r) {
            var path = getPath(config, r);
            g.fillStyle(config.stroke);
            g.setFont(config.font, config.fontSize, 'normal', 'normal');
            renderLabel(r.startLabel);
            renderLabel(r.endLabel);
            if (r.assoc !== '-/-' && r.assoc !== '_/_') {
                if (hasSubstring(r.assoc, '--') || hasSubstring(r.assoc, '__')) {
                    var dash = Math.max(4, 2 * config.lineWidth);
                    g.save();
                    g.setLineDash([dash, dash]);
                    strokePath(path);
                    g.restore();
                }
                else
                    strokePath(path);
            }
            drawTerminators(g, config, r);
        }
        function snapToPixels() {
            if (config.lineWidth % 2 === 1)
                g.translate(0.5, 0.5);
        }
        function setBackground() {
            g.clear();
            g.save();
            g.strokeStyle('transparent');
            g.fillStyle(config.background);
            g.rect(0, 0, compartment.width, compartment.height).fill();
            g.restore();
        }
        g.save();
        g.scale(config.zoom, config.zoom);
        snapToPixels();
        setBackground();
        g.setFont(config.font, config.fontSize, 'bold', 'normal');
        g.lineWidth(config.lineWidth);
        g.lineJoin('round');
        g.lineCap('round');
        g.strokeStyle(config.stroke);
        renderCompartment(compartment, undefined, buildStyle({}, {}).title, 0);
        g.restore();
    }

    function GraphicsCanvas(canvas, callbacks) {
        var ctx = canvas.getContext('2d');
        var mousePos = { x: 0, y: 0 };
        var twopi = 2 * 3.1416;
        function mouseEventToPos(event) {
            var e = canvas;
            return {
                x: event.clientX - e.getBoundingClientRect().left - e.clientLeft + e.scrollLeft,
                y: event.clientY - e.getBoundingClientRect().top - e.clientTop + e.scrollTop,
            };
        }
        if (callbacks) {
            canvas.addEventListener('mousedown', function (event) {
                if (callbacks.mousedown)
                    callbacks.mousedown(mouseEventToPos(event));
            });
            canvas.addEventListener('mouseup', function (event) {
                if (callbacks.mouseup)
                    callbacks.mouseup(mouseEventToPos(event));
            });
            canvas.addEventListener('mousemove', function (event) {
                mousePos = mouseEventToPos(event);
                if (callbacks.mousemove)
                    callbacks.mousemove(mouseEventToPos(event));
            });
        }
        var chainable = {
            stroke: function () {
                ctx.stroke();
                return chainable;
            },
            fill: function () {
                ctx.fill();
                return chainable;
            },
            fillAndStroke: function () {
                ctx.fill();
                ctx.stroke();
                return chainable;
            },
        };
        function tracePath(path, offset, s) {
            s = s === undefined ? 1 : s;
            offset = offset || { x: 0, y: 0 };
            ctx.beginPath();
            ctx.moveTo(offset.x + s * path[0].x, offset.y + s * path[0].y);
            for (var i = 1, len = path.length; i < len; i++)
                ctx.lineTo(offset.x + s * path[i].x, offset.y + s * path[i].y);
            return chainable;
        }
        return {
            mousePos: function () {
                return mousePos;
            },
            width: function () {
                return canvas.width;
            },
            height: function () {
                return canvas.height;
            },
            clear: function () {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            },
            circle: function (p, r) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, twopi);
                return chainable;
            },
            ellipse: function (center, rx, ry, start, stop) {
                if (start === undefined)
                    start = 0;
                if (stop === undefined)
                    stop = twopi;
                ctx.beginPath();
                ctx.save();
                ctx.translate(center.x, center.y);
                ctx.scale(1, ry / rx);
                ctx.arc(0, 0, rx / 2, start, stop);
                ctx.restore();
                return chainable;
            },
            arc: function (x, y, r, start, stop) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.arc(x, y, r, start, stop);
                return chainable;
            },
            roundRect: function (x, y, w, h, r) {
                ctx.beginPath();
                ctx.moveTo(x + r, y);
                ctx.arcTo(x + w, y, x + w, y + r, r);
                ctx.lineTo(x + w, y + h - r);
                ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
                ctx.lineTo(x + r, y + h);
                ctx.arcTo(x, y + h, x, y + h - r, r);
                ctx.lineTo(x, y + r);
                ctx.arcTo(x, y, x + r, y, r);
                ctx.closePath();
                return chainable;
            },
            rect: function (x, y, w, h) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + w, y);
                ctx.lineTo(x + w, y + h);
                ctx.lineTo(x, y + h);
                ctx.closePath();
                return chainable;
            },
            path: tracePath,
            circuit: function (path, offset, s) {
                tracePath(path, offset, s);
                ctx.closePath();
                return chainable;
            },
            setFont: function (family, size, weight, style) {
                ctx.font = `${weight} ${style} ${size}pt ${family}, Helvetica, sans-serif`;
            },
            fillStyle: function (s) {
                ctx.fillStyle = s;
            },
            strokeStyle: function (s) {
                ctx.strokeStyle = s;
            },
            textAlign: function (a) {
                ctx.textAlign = a;
            },
            lineCap: function (cap) {
                ctx.lineCap = cap;
            },
            lineJoin: function (join) {
                ctx.lineJoin = join;
            },
            lineWidth: function (w) {
                ctx.lineWidth = w;
            },
            arcTo: function () {
                return ctx.arcTo.apply(ctx, arguments);
            },
            beginPath: function () {
                return ctx.beginPath.apply(ctx, arguments);
            },
            fillText: function () {
                return ctx.fillText.apply(ctx, arguments);
            },
            lineTo: function () {
                return ctx.lineTo.apply(ctx, arguments);
            },
            measureText: function () {
                return ctx.measureText.apply(ctx, arguments);
            },
            moveTo: function () {
                return ctx.moveTo.apply(ctx, arguments);
            },
            restore: function () {
                return ctx.restore.apply(ctx, arguments);
            },
            setData: function (name, value) { },
            save: function () {
                return ctx.save.apply(ctx, arguments);
            },
            scale: function () {
                return ctx.scale.apply(ctx, arguments);
            },
            setLineDash: function () {
                return ctx.setLineDash.apply(ctx, arguments);
            },
            stroke: function () {
                return ctx.stroke.apply(ctx, arguments);
            },
            translate: function () {
                return ctx.translate.apply(ctx, arguments);
            },
        };
    }

    function toAttrString(obj) {
        return Object.entries(obj)
            .filter(([_, val]) => val !== undefined)
            .map(([key, val]) => `${key}="${xmlEncode(val)}"`)
            .join(' ');
    }
    function xmlEncode(str) {
        if ('number' === typeof str)
            return str.toFixed(1);
        return (str !== null && str !== void 0 ? str : '')
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    var charWidths = { "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10, "6": 10, "7": 10, "8": 10, "9": 10, " ": 5, "!": 5, "\"": 6, "#": 10, "$": 10, "%": 15, "&": 11, "'": 4, "(": 6, ")": 6, "*": 7, "+": 10, ",": 5, "-": 6, ".": 5, "/": 5, ":": 5, ";": 5, "<": 10, "=": 10, ">": 10, "?": 10, "@": 17, "A": 11, "B": 11, "C": 12, "D": 12, "E": 11, "F": 10, "G": 13, "H": 12, "I": 5, "J": 9, "K": 11, "L": 10, "M": 14, "N": 12, "O": 13, "P": 11, "Q": 13, "R": 12, "S": 11, "T": 10, "U": 12, "V": 11, "W": 16, "X": 11, "Y": 11, "Z": 10, "[": 5, "\\": 5, "]": 5, "^": 8, "_": 10, "`": 6, "a": 10, "b": 10, "c": 9, "d": 10, "e": 10, "f": 5, "g": 10, "h": 10, "i": 4, "j": 4, "k": 9, "l": 4, "m": 14, "n": 10, "o": 10, "p": 10, "q": 10, "r": 6, "s": 9, "t": 5, "u": 10, "v": 9, "w": 12, "x": 9, "y": 9, "z": 9, "{": 6, "|": 5, "}": 6, "~": 10 };
    function GraphicsSvg(document) {
        var initialState = {
            stroke: undefined,
            'stroke-width': 1,
            'stroke-dasharray': undefined,
            'stroke-linecap': undefined,
            'stroke-linejoin': undefined,
            'text-align': 'left',
            font: '12pt Helvetica, Arial, sans-serif',
            'font-size': '12pt',
        };
        var measurementCanvas = document
            ? document.createElement('canvas')
            : null;
        var ctx = measurementCanvas ? measurementCanvas.getContext('2d') : null;
        class Element {
            constructor(name, attr, parent, text) {
                this.elideEmpty = false;
                this.name = name;
                this.attr = attr;
                this.parent = parent;
                this.children = [];
                this.text = text || undefined;
            }
            stroke() {
                this.attr.fill = 'none';
                return this;
            }
            fill() {
                this.attr.stroke = 'none';
                return this;
            }
            fillAndStroke() {
                return this;
            }
            group() {
                return this.parent;
            }
            serialize() {
                var _a;
                const data = (_a = getDefined(this.group(), (e) => e.data)) !== null && _a !== void 0 ? _a : {};
                const attrs = toAttrString(Object.assign(Object.assign({}, this.attr), data));
                const content = this.children.map((o) => o.serialize()).join('\n');
                if (this.text && this.children.length === 0)
                    return `<${this.name} ${attrs}>${xmlEncode(this.text)}</${this.name}>`;
                else if (this.children.length === 0)
                    return this.elideEmpty ? '' : `<${this.name} ${attrs}></${this.name}>`;
                else
                    return `<${this.name} ${attrs}>
	${content.replace(/\n/g, '\n\t')}
</${this.name}>`;
            }
        }
        function getDefined(group, getter) {
            var _a, _b;
            if (!group)
                return getter(syntheticRoot);
            return (_b = (_a = getter(group)) !== null && _a !== void 0 ? _a : getDefined(group.parent, getter)) !== null && _b !== void 0 ? _b : getter(syntheticRoot);
        }
        class GroupElement extends Element {
            constructor(parent) {
                super('g', {}, parent);
                this.elideEmpty = true;
            }
            group() {
                return this;
            }
        }
        const syntheticRoot = new GroupElement({});
        syntheticRoot.attr = initialState;
        var root = new Element('svg', {
            version: '1.1',
            baseProfile: 'full',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xmlns:ev': 'http://www.w3.org/2001/xml-events',
        }, undefined);
        var current = new GroupElement(root);
        current.attr = initialState;
        root.children.push(current);
        var inPathBuilderMode = false;
        function tracePath(path, offset = { x: 0, y: 0 }, s = 1) {
            var d = path
                .map((e, i) => (i ? 'L' : 'M') + (offset.x + s * e.x).toFixed(1) + ' ' + (offset.y + s * e.y).toFixed(1))
                .join(' ');
            return el('path', { d: d });
        }
        function el(type, attr, text) {
            var element = new Element(type, attr, current, text);
            current.children.push(element);
            return element;
        }
        return {
            width: function () {
                return 0;
            },
            height: function () {
                return 0;
            },
            clear: function () { },
            circle: function (p, r) {
                return el('circle', { r: r, cx: p.x, cy: p.y });
            },
            ellipse: function (center, w, h, start = 0, stop = 0) {
                if (start || stop) {
                    var path = range([start, stop], 64).map((a) => add(center, { x: (Math.cos(a) * w) / 2, y: (Math.sin(a) * h) / 2 }));
                    return tracePath(path);
                }
                else {
                    return el('ellipse', { cx: center.x, cy: center.y, rx: w / 2, ry: h / 2 });
                }
            },
            arc: function (cx, cy, r) {
                return el('ellipse', { cx, cy, rx: r, ry: r });
            },
            roundRect: function (x, y, width, height, r) {
                return el('rect', { x, y, rx: r, ry: r, height, width });
            },
            rect: function (x, y, width, height) {
                return el('rect', { x, y, height, width });
            },
            path: tracePath,
            circuit: function (path, offset, s) {
                var element = tracePath(path, offset, s);
                element.attr.d += ' Z';
                return element;
            },
            setFont: function (family, size, weight, style) {
                current.attr['font-family'] = family;
                current.attr['font-size'] = size + 'pt';
                current.attr['font-weight'] = weight;
                current.attr['font-style'] = style;
            },
            strokeStyle: function (stroke) {
                current.attr.stroke = stroke;
            },
            fillStyle: function (fill) {
                current.attr.fill = fill;
            },
            arcTo: function (x1, y1, x2, y2) {
                if (inPathBuilderMode)
                    last(current.children).attr.d += 'L' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + ' ';
                else
                    throw new Error('can only be called after .beginPath()');
            },
            beginPath: function () {
                inPathBuilderMode = true;
                return el('path', { d: '' });
            },
            fillText: function (text, x, y) {
                return el('text', {
                    x,
                    y,
                    stroke: 'none',
                    font: undefined,
                    style: undefined,
                    'text-anchor': getDefined(current, (e) => e.attr['text-align']) === 'center' ? 'middle' : undefined,
                }, text);
            },
            lineCap: function (cap) {
                current.attr['stroke-linecap'] = cap;
            },
            lineJoin: function (join) {
                current.attr['stroke-linejoin'] = join;
            },
            lineTo: function (x, y) {
                if (inPathBuilderMode)
                    last(current.children).attr.d += 'L' + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
                else
                    throw new Error('can only be called after .beginPath()');
                return current;
            },
            lineWidth: function (w) {
                current.attr['stroke-width'] = w;
            },
            measureText: function (s) {
                if (ctx) {
                    if (current)
                        ctx.font = `${getDefined(current, (e) => e.attr['font-weight'])} ${getDefined(current, (e) => e.attr['font-style'])} ${getDefined(current, (e) => e.attr['font-size'])} ${getDefined(current, (e) => e.attr['font-family'])}`;
                    else
                        ctx.font = `${initialState['font-weight']} ${initialState['font-style']} ${initialState['font-size']} ${initialState['font-family']}`;
                    return ctx.measureText(s);
                }
                else {
                    return {
                        width: sum(s, function (c) {
                            var _a, _b;
                            const size = (_a = getDefined(current, (e) => e.attr['font-size'])) !== null && _a !== void 0 ? _a : 12;
                            var scale = parseInt(size.toString()) / 12;
                            return ((_b = charWidths[c]) !== null && _b !== void 0 ? _b : 16) * scale;
                        }),
                    };
                }
            },
            moveTo: function (x, y) {
                if (inPathBuilderMode)
                    last(current.children).attr.d += 'M' + x.toFixed(1) + ' ' + y.toFixed(1) + ' ';
                else
                    throw new Error('can only be called after .beginPath()');
            },
            restore: function () {
                if (current.parent)
                    current = current.parent;
            },
            save: function () {
                var node = new GroupElement(current);
                current.children.push(node);
                current = node;
            },
            setData: function (name, value) {
                var _a;
                current.data = (_a = current.data) !== null && _a !== void 0 ? _a : {};
                current.data['data-' + name] = value;
            },
            scale: function () { },
            setLineDash: function (d) {
                current.attr['stroke-dasharray'] = d.length === 0 ? 'none' : d[0] + ' ' + d[1];
            },
            stroke: function () {
                inPathBuilderMode = false;
                last(current.children).stroke();
            },
            textAlign: function (a) {
                current.attr['text-align'] = a;
            },
            translate: function (dx, dy) {
                if (Number.isNaN(dx) || Number.isNaN(dy)) {
                    throw new Error('dx and dy must be real numbers');
                }
                current.attr.transform = `translate(${dx}, ${dy})`;
            },
            serialize: function (size, desc, title) {
                if (desc) {
                    root.children.unshift(new Element('desc', {}, undefined, desc));
                }
                if (title) {
                    root.children.unshift(new Element('title', {}, undefined, title));
                }
                root.attr = {
                    version: '1.1',
                    baseProfile: 'full',
                    width: size.width,
                    height: size.height,
                    viewbox: '0 0 ' + size.width + ' ' + size.height,
                    xmlns: 'http://www.w3.org/2000/svg',
                    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
                    'xmlns:ev': 'http://www.w3.org/2001/xml-events',
                };
                return root.serialize();
            },
        };
    }

    function fitCanvasSize(canvas, rect, zoom) {
        canvas.width = rect.width * zoom;
        canvas.height = rect.height * zoom;
    }
    function createMeasurer(config, graphics) {
        return {
            setFont(family, size, weight, style) {
                graphics.setFont(family, size, weight, style);
            },
            textWidth(s) {
                return graphics.measureText(s).width;
            },
            textHeight() {
                return config.leading * config.fontSize;
            },
        };
    }
    function parseAndRender(code, graphics, canvas, scale) {
        var parsedDiagram = parse(code);
        var config = parsedDiagram.config;
        var measurer = createMeasurer(config, graphics);
        var graphLayout = layout(measurer, config, parsedDiagram.root);
        if (canvas) {
            fitCanvasSize(canvas, graphLayout, config.zoom * scale);
        }
        config.zoom *= scale;
        render(graphics, config, graphLayout);
        return { config: config, layout: graphLayout };
    }
    function draw(canvas, code, scale) {
        return parseAndRender(code, GraphicsCanvas(canvas), canvas, scale || 1);
    }
    function renderSvg(code, document) {
        var skCanvas = GraphicsSvg(document);
        var { config, layout } = parseAndRender(code, skCanvas, null, 1);
        return skCanvas.serialize({
            width: layout.width,
            height: layout.height,
        }, code, config.title);
    }
    class ImportDepthError extends Error {
        constructor() {
            super('max_import_depth exceeded');
        }
    }
    function processAsyncImports(source, loadFile, maxImportDepth = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxImportDepth == -1) {
                throw new ImportDepthError();
            }
            function lenientLoadFile(key) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        return (yield loadFile(key)) || '';
                    }
                    catch (e) {
                        return '';
                    }
                });
            }
            var imports = [];
            source.replace(/#import: *(.*)/g, (a, file) => {
                var promise = lenientLoadFile(file).then((contents) => processAsyncImports(contents, loadFile, maxImportDepth - 1));
                imports.push({ file, promise });
                return '';
            });
            var imported = {};
            for (var imp of imports) {
                imported[imp.file] = yield imp.promise;
            }
            return source.replace(/#import: *(.*)/g, (a, file) => imported[file]);
        });
    }
    function processImports(source, loadFile, maxImportDepth = 10) {
        if (maxImportDepth == -1) {
            throw new ImportDepthError();
        }
        function lenientLoadFile(key) {
            try {
                return loadFile(key) || '';
            }
            catch (e) {
                return '';
            }
        }
        return source.replace(/#import: *(.*)/g, (a, file) => processImports(lenientLoadFile(file), loadFile, maxImportDepth - 1));
    }
    function compileFile(filepath, maxImportDepth) {
        var fs = require('fs');
        var path = require('path');
        var directory = path.dirname(filepath);
        var rootFileName = filepath.substr(directory.length);
        function loadFile(filename) {
            return fs.readFileSync(path.join(directory, filename), { encoding: 'utf8' });
        }
        return processImports(loadFile(rootFileName), loadFile, maxImportDepth);
    }

    var version = '1.5.3';

    exports.Classifier = Classifier;
    exports.Compartment = Compartment;
    exports.ImportDepthError = ImportDepthError;
    exports.Relation = Relation;
    exports.compileFile = compileFile;
    exports.draw = draw;
    exports.intermediateParse = intermediateParse;
    exports.layout = layout;
    exports.parse = parse;
    exports.processAsyncImports = processAsyncImports;
    exports.processImports = processImports;
    exports.renderSvg = renderSvg;
    exports.skanaar = util;
    exports.styles = styles;
    exports.transformParseIntoSyntaxTree = transformParseIntoSyntaxTree;
    exports.version = version;
    exports.visualizers = visualizers;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
