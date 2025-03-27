(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('graphre')) :
    typeof define === 'function' && define.amd ? define(['exports', 'graphre'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.nomnoml = {}, global.graphre));
})(this, (function (exports, graphre) { 'use strict';

    function range([min, max], count) {
        const output = [];
        for (let i = 0; i < count; i++)
            output.push(min + ((max - min) * i) / (count - 1));
        return output;
    }
    function sum(list, transform) {
        let summa = 0;
        for (let i = 0, len = list.length; i < len; i++)
            summa += transform(list[i]);
        return summa;
    }
    function last(list) {
        return list[list.length - 1];
    }
    function indexBy(list, key) {
        const obj = {};
        for (let i = 0; i < list.length; i++)
            obj[list[i][key]] = list[i];
        return obj;
    }

    var util = /*#__PURE__*/Object.freeze({
        __proto__: null,
        indexBy: indexBy,
        last: last,
        range: range,
        sum: sum
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
    const styles = {
        abstract: buildStyle({ visual: 'class' }, { center: true, italic: true }),
        actor: buildStyle({ visual: 'actor' }, { center: true }, { center: true }),
        choice: buildStyle({ visual: 'rhomb' }, { center: true }, { center: true }),
        class: buildStyle({ visual: 'class' }, { center: true, bold: true }),
        database: buildStyle({ visual: 'database' }, { center: true, bold: true }, { center: true }),
        end: buildStyle({ visual: 'end' }, {}),
        frame: buildStyle({ visual: 'frame' }, {}),
        hidden: buildStyle({ visual: 'hidden' }, {}),
        input: buildStyle({ visual: 'input' }, { center: true }),
        instance: buildStyle({ visual: 'class' }, { center: true, underline: true }),
        label: buildStyle({ visual: 'none' }, { center: true }),
        lollipop: buildStyle({ visual: 'lollipop' }, { center: true }),
        note: buildStyle({ visual: 'note' }, {}),
        pipe: buildStyle({ visual: 'pipe' }, { center: true, bold: true }),
        package: buildStyle({ visual: 'package' }, {}),
        receiver: buildStyle({ visual: 'receiver' }, {}),
        reference: buildStyle({ visual: 'class', dashed: true }, { center: true }),
        sender: buildStyle({ visual: 'sender' }, {}),
        socket: buildStyle({ visual: 'socket' }, {}),
        start: buildStyle({ visual: 'start' }, {}),
        state: buildStyle({ visual: 'roundrect' }, { center: true }),
        sync: buildStyle({ visual: 'sync' }, { center: true }),
        table: buildStyle({ visual: 'table' }, { center: true, bold: true }),
        transceiver: buildStyle({ visual: 'transceiver' }, {}),
        usecase: buildStyle({ visual: 'ellipse' }, { center: true }, { center: true }),
    };
    function offsetBox(config, clas, offset) {
        clas.width = Math.max(...clas.parts.map((e) => e.width ?? 0));
        clas.height = sum(clas.parts, (e) => e.height ?? 0 ?? 0);
        clas.dividers = [];
        let y = 0;
        for (const comp of clas.parts) {
            comp.x = 0 + offset.x;
            comp.y = y + offset.y;
            comp.width = clas.width;
            y += comp.height ?? 0 ?? 0;
            if (comp != last(clas.parts))
                clas.dividers.push([
                    { x: 0, y: y },
                    { x: clas.width, y: y },
                ]);
        }
    }
    function box(config, clas) {
        offsetBox(config, clas, { x: 0, y: 0 });
    }
    function icon(config, clas) {
        clas.dividers = [];
        clas.parts = [];
        clas.width = config.fontSize * 2.5;
        clas.height = config.fontSize * 2.5;
    }
    function labelledIcon(config, clas) {
        clas.width = config.fontSize * 1.5;
        clas.height = config.fontSize * 1.5;
        clas.dividers = [];
        let y = config.direction == 'LR' ? clas.height - config.padding : -clas.height / 2;
        for (const comp of clas.parts) {
            if (config.direction == 'LR') {
                comp.x = clas.width / 2 - (comp.width ?? 0) / 2;
                comp.y = y;
            }
            else {
                comp.x = clas.width / 2 + config.padding / 2;
                comp.y = y;
            }
            y += comp.height ?? 0 ?? 0;
        }
    }
    const layouters = {
        actor: function (config, clas) {
            clas.width = Math.max(config.padding * 2, ...clas.parts.map((e) => e.width ?? 0));
            clas.height = config.padding * 3 + sum(clas.parts, (e) => e.height ?? 0);
            clas.dividers = [];
            let y = config.padding * 3;
            for (const comp of clas.parts) {
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height ?? 0;
                if (comp != last(clas.parts))
                    clas.dividers.push([
                        { x: config.padding, y: y },
                        { x: clas.width - config.padding, y: y },
                    ]);
            }
        },
        class: box,
        database: function (config, clas) {
            clas.width = Math.max(...clas.parts.map((e) => e.width ?? 0));
            clas.height = sum(clas.parts, (e) => e.height ?? 0) + config.padding * 2;
            clas.dividers = [];
            let y = config.padding * 1.5;
            for (const comp of clas.parts) {
                comp.x = 0;
                comp.y = y;
                comp.width = clas.width;
                y += comp.height ?? 0;
                if (comp != last(clas.parts)) {
                    const path = range([0, Math.PI], 16).map((a) => ({
                        x: clas.width * 0.5 * (1 - Math.cos(a)),
                        y: y + config.padding * (0.75 * Math.sin(a) - 0.5),
                    }));
                    clas.dividers.push(path);
                }
            }
        },
        ellipse: function (config, clas) {
            const width = Math.max(...clas.parts.map((e) => e.width ?? 0));
            const height = sum(clas.parts, (e) => e.height ?? 0);
            clas.width = width * 1.25;
            clas.height = height * 1.25;
            clas.dividers = [];
            let y = height * 0.125;
            const sq = (x) => x * x;
            const rimPos = (y) => Math.sqrt(sq(0.5) - sq(y / clas.height - 0.5)) * clas.width;
            for (const comp of clas.parts) {
                comp.x = width * 0.125;
                comp.y = y;
                comp.width = width;
                y += comp.height ?? 0;
                if (comp != last(clas.parts))
                    clas.dividers.push([
                        { x: clas.width / 2 + rimPos(y) - 1, y: y },
                        { x: clas.width / 2 - rimPos(y) + 1, y: y },
                    ]);
            }
        },
        end: icon,
        frame: function (config, clas) {
            const w = clas.parts[0].width ?? 0;
            const h = clas.parts[0].height ?? 0;
            clas.parts[0].width = h / 2 + (clas.parts[0].width ?? 0);
            box(config, clas);
            if (clas.dividers?.length)
                clas.dividers.shift();
            clas.dividers?.unshift([
                { x: 0, y: h },
                { x: w - h / 4, y: h },
                { x: w + h / 4, y: h / 2 },
                { x: w + h / 4, y: 0 },
            ]);
        },
        hidden: function (config, clas) {
            clas.dividers = [];
            clas.parts = [];
            clas.width = 1;
            clas.height = 1;
        },
        input: box,
        lollipop: labelledIcon,
        none: box,
        note: box,
        package: box,
        pipe: function box(config, clas) {
            offsetBox(config, clas, { x: -config.padding / 2, y: 0 });
        },
        receiver: box,
        rhomb: function (config, clas) {
            const width = Math.max(...clas.parts.map((e) => e.width ?? 0));
            const height = sum(clas.parts, (e) => e.height ?? 0);
            clas.width = width * 1.5;
            clas.height = height * 1.5;
            clas.dividers = [];
            let y = height * 0.25;
            for (const comp of clas.parts) {
                comp.x = width * 0.25;
                comp.y = y;
                comp.width = width;
                y += comp.height ?? 0;
                const slope = clas.width / clas.height;
                if (comp != last(clas.parts))
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
            clas.parts = [];
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
            if (clas.parts.length == 1) {
                box(config, clas);
                return;
            }
            const gridcells = clas.parts.slice(1);
            const rows = [[]];
            function isRowBreak(e) {
                return !e.lines.length && !e.nodes.length && !e.assocs.length;
            }
            function isRowFull(e) {
                const current = last(rows);
                return rows[0] != current && rows[0].length == current.length;
            }
            function isEnd(e) {
                return e == last(gridcells);
            }
            for (const comp of gridcells) {
                if (!isEnd(comp) && isRowBreak(comp) && last(rows).length) {
                    rows.push([]);
                }
                else if (isRowFull()) {
                    rows.push([comp]);
                }
                else {
                    last(rows).push(comp);
                }
            }
            const header = clas.parts[0];
            const cellW = Math.max((header.width ?? 0) / rows[0].length, ...gridcells.map((e) => e.width ?? 0));
            const cellH = Math.max(...gridcells.map((e) => e.height ?? 0));
            clas.width = cellW * rows[0].length;
            clas.height = (header.height ?? 0) + cellH * rows.length;
            const hh = header.height ?? 0;
            clas.dividers = [
                [
                    { x: 0, y: header.height ?? 0 },
                    { x: 0, y: header.height ?? 0 },
                ],
                ...rows.map((e, i) => [
                    { x: 0, y: hh + i * cellH },
                    { x: clas.width ?? 0, y: hh + i * cellH },
                ]),
                ...rows[0].map((e, i) => [
                    { x: (i + 1) * cellW, y: hh },
                    { x: (i + 1) * cellW, y: clas.height },
                ]),
            ];
            header.x = 0;
            header.y = 0;
            header.width = clas.width;
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].length; j++) {
                    const cell = rows[i][j];
                    cell.x = j * cellW;
                    cell.y = hh + i * cellH;
                    cell.width = cellW;
                }
            }
            clas.parts = clas.parts.filter((e) => !isRowBreak(e));
        },
        transceiver: box,
    };
    const visualizers = {
        actor: function (node, x, y, config, g) {
            const a = config.padding / 2;
            const yp = y + a * 4;
            const faceCenter = { x: node.x, y: yp - a };
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
            const pad = config.padding;
            const cy = y - pad / 2;
            const pi = 3.1416;
            g.rect(x, y + pad, node.width, node.height - pad * 2).fill();
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
            const headHeight = node.parts[0].height ?? 0;
            g.rect(x, y + headHeight, node.width, node.height - headHeight).fillAndStroke();
            const w = g.measureText(node.parts[0].lines[0]).width + 2 * config.padding;
            g.circuit([
                { x: x, y: y + headHeight },
                { x: x, y: y },
                { x: x + w, y: y },
                { x: x + w, y: y + headHeight },
            ]).fillAndStroke();
        },
        pipe: function (node, x, y, config, g) {
            const pad = config.padding;
            const pi = 3.1416;
            g.rect(x, y, node.width, node.height).fill();
            g.path([
                { x: x, y: y },
                { x: x + node.width, y: y },
            ]).stroke();
            g.path([
                { x: x, y: y + node.height },
                { x: x + node.width, y: y + node.height },
            ]).stroke();
            g.ellipse({ x: x + node.width, y: node.y }, pad * 1.5, node.height).fillAndStroke();
            g.ellipse({ x: x, y: node.y }, pad * 1.5, node.height, pi / 2, (pi * 3) / 2).fillAndStroke();
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
            const r = Math.min(config.padding * 2 * config.leading, node.height / 2);
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
            const from = config.direction === 'TB' ? Math.PI : Math.PI / 2;
            const to = config.direction === 'TB' ? 2 * Math.PI : -Math.PI / 2;
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
            const textSize = measureLines(c.lines, compartmentIndex ? 'normal' : 'bold');
            if (!c.nodes.length && !c.assocs.length) {
                const layoutedPart = c;
                layoutedPart.width = textSize.width;
                layoutedPart.height = textSize.height;
                layoutedPart.offset = { x: config.padding, y: config.padding };
                return;
            }
            const styledConfig = {
                ...config,
                direction: style.direction ?? config.direction,
            };
            const layoutedNodes = c.nodes;
            const layoutedAssoc = c.assocs;
            for (let i = 0; i < layoutedAssoc.length; i++)
                layoutedAssoc[i].id = `${i}`;
            for (const e of layoutedNodes)
                layoutNode(e, styledConfig);
            const g = new graphre.graphlib.Graph({
                multigraph: true,
            });
            g.setGraph({
                rankdir: style.direction || config.direction,
                nodesep: config.spacing,
                edgesep: config.spacing,
                ranksep: config.spacing,
                acyclicer: config.acyclicer,
                ranker: config.ranker,
            });
            for (const e of layoutedNodes) {
                g.setNode(e.id, { width: e.layoutWidth, height: e.layoutHeight });
            }
            for (const r of layoutedAssoc) {
                if (r.type.indexOf('_') > -1) {
                    g.setEdge(r.start, r.end, { minlen: 0 }, r.id);
                }
                else if ((config.gravity ?? 1) != 1) {
                    g.setEdge(r.start, r.end, { minlen: config.gravity }, r.id);
                }
                else {
                    g.setEdge(r.start, r.end, {}, r.id);
                }
            }
            graphre.layout(g);
            const rels = indexBy(c.assocs, 'id');
            const nodes = indexBy(c.nodes, 'id');
            for (const name of g.nodes()) {
                const node = g.node(name);
                nodes[name].x = node.x;
                nodes[name].y = node.y;
            }
            let left = 0;
            let right = 0;
            let top = 0;
            let bottom = 0;
            for (const edgeObj of g.edges()) {
                const edge = g.edge(edgeObj);
                const start = nodes[edgeObj.v];
                const end = nodes[edgeObj.w];
                const rel = rels[edgeObj.name];
                rel.path = [start, ...edge.points, end].map(toPoint);
                const startP = rel.path[1];
                const endP = rel.path[rel.path.length - 2];
                layoutLabel(rel.startLabel, startP, adjustQuadrant(quadrant(startP, start) ?? 4, start, end));
                layoutLabel(rel.endLabel, endP, adjustQuadrant(quadrant(endP, end) ?? 2, end, start));
                left = Math.min(left, rel.startLabel.x, rel.endLabel.x, ...edge.points.map((e) => e.x), ...edge.points.map((e) => e.x));
                right = Math.max(right, rel.startLabel.x + rel.startLabel.width, rel.endLabel.x + rel.endLabel.width, ...edge.points.map((e) => e.x));
                top = Math.min(top, rel.startLabel.y, rel.endLabel.y, ...edge.points.map((e) => e.y));
                bottom = Math.max(bottom, rel.startLabel.y + rel.startLabel.height, rel.endLabel.y + rel.endLabel.height, ...edge.points.map((e) => e.y));
            }
            const graph = g.graph();
            const width = Math.max(graph.width + (left < 0 ? -left : 0), right - left);
            const height = Math.max(graph.height + (top < 0 ? -top : 0), bottom - top);
            const graphHeight = height ? height + 2 * config.gutter : 0;
            const graphWidth = width ? width + 2 * config.gutter : 0;
            const part = c;
            part.width = Math.max(textSize.width, graphWidth) + 2 * config.padding;
            part.height = textSize.height + graphHeight + config.padding;
            part.offset = { x: config.padding - left, y: config.padding - top };
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
                const fontSize = config.fontSize;
                const lines = label.text.split('`');
                label.width = Math.max(...lines.map((l) => measurer.textWidth(l)));
                label.height = fontSize * lines.length;
                label.x =
                    point.x + (quadrant == 1 || quadrant == 4 ? config.padding : -label.width - config.padding);
                label.y =
                    point.y + (quadrant == 3 || quadrant == 4 ? config.padding : -label.height - config.padding);
            }
        }
        function quadrant(point, node) {
            if (point.x < node.x && point.y < node.y)
                return 1;
            if (point.x > node.x && point.y < node.y)
                return 2;
            if (point.x > node.x && point.y > node.y)
                return 3;
            if (point.x < node.x && point.y > node.y)
                return 4;
            return undefined;
        }
        function adjustQuadrant(quadrant, point, opposite) {
            if (opposite.x == point.x || opposite.y == point.y)
                return quadrant;
            const flipHorizontally = [4, 3, 2, 1];
            const flipVertically = [2, 1, 4, 3];
            const oppositeQuadrant = opposite.y < point.y ? (opposite.x < point.x ? 2 : 1) : opposite.x < point.x ? 3 : 4;
            if (oppositeQuadrant === quadrant) {
                if (config.direction === 'LR')
                    return flipHorizontally[quadrant - 1];
                if (config.direction === 'TB')
                    return flipVertically[quadrant - 1];
            }
            return quadrant;
        }
        function layoutNode(node, config) {
            const style = config.styles[node.type] || styles.class;
            for (let i = 0; i < node.parts.length; i++) {
                layoutCompartment(node.parts[i], i, style);
            }
            const visual = layouters[style.visual] ?? layouters.class;
            visual(config, node);
            node.layoutWidth = (node.width ?? 0) + 2 * config.edgeMargin;
            node.layoutHeight = (node.height ?? 0) + 2 * config.edgeMargin;
        }
        const root = ast;
        layoutCompartment(root, 0, styles.class);
        return root;
    }

    function extractDirectives(source) {
        const directives = [];
        for (const line of source.split('\n')) {
            if (line[0] === '#') {
                const [key, ...values] = line.slice(1).split(':');
                directives.push({ key, value: values.join(':').trim() });
            }
        }
        return directives;
    }
    function linearParse(source) {
        let line = 1;
        let lineStartIndex = 0;
        let index = 0;
        const directives = extractDirectives(source);
        source = source.replace(/^[ \t]*\/\/[^\n]*/gm, '').replace(/^#[^\n]*/gm, '');
        if (source.trim() === '')
            return {
                root: { nodes: [], assocs: [], lines: [] },
                directives,
            };
        const part = parsePart();
        if (index < source.length)
            error('end of file', source[index]);
        return { root: part, directives };
        function advanceLineCounter() {
            line++;
            lineStartIndex = index;
        }
        function addNode(nodes, node) {
            const i = nodes.findIndex((e) => e.id === node.id);
            if (i === -1)
                nodes.push(node);
            else if (nodes[i].parts.length < node.parts.length)
                nodes[i] = node;
        }
        function parsePart() {
            const nodes = [];
            const assocs = [];
            const lines = [];
            while (index < source.length) {
                let lastIndex = index;
                discard(/ /);
                if (source[index] === '\n') {
                    pop();
                    advanceLineCounter();
                }
                else if (source[index] === ';') {
                    pop();
                }
                else if (source[index] == '|' || source[index] == ']') {
                    return { nodes, assocs, lines };
                }
                else if (source[index] == '[') {
                    const extracted = parseNodesAndAssocs();
                    for (const node of extracted.nodes)
                        addNode(nodes, node);
                    for (const assoc of extracted.assocs)
                        assocs.push(assoc);
                }
                else {
                    const text = parseLine().trim();
                    if (text)
                        lines.push(text);
                }
                if (index === lastIndex)
                    throw new Error('Infinite loop');
            }
            return { nodes, assocs, lines };
        }
        function parseNodesAndAssocs() {
            const nodes = [];
            const assocs = [];
            let node = parseNode();
            addNode(nodes, node);
            while (index < source.length) {
                let lastIndex = index;
                discard(/ /);
                if (isOneOf('\n', ']', '|', ';')) {
                    return { nodes, assocs };
                }
                else {
                    const { association, target } = parseAssociation(node);
                    assocs.push(association);
                    addNode(nodes, target);
                    node = target;
                }
                if (index === lastIndex)
                    throw new Error('Infinite loop');
            }
            return { nodes, assocs };
        }
        function transformEscapes(char) {
            if (char === 'n')
                return '\n';
            return char;
        }
        function parseAssociation(fromNode) {
            let startLabel = '';
            while (index < source.length) {
                let lastIndex = index;
                if (isOneOf('\\')) {
                    pop();
                    startLabel += transformEscapes(pop());
                }
                if (isOneOf('(o-', '(-', 'o<-', 'o-', '+-', '<:-', '<-', '-'))
                    break;
                else if (isOneOf('[', ']', '|', '<', '>', ';'))
                    error('label', source[index]);
                else
                    startLabel += pop();
                if (index === lastIndex)
                    throw new Error('Infinite loop');
            }
            const assoc1 = consumeOneOf('(o', '(', 'o<', 'o', '+', '<:', '<', '');
            const assoc2 = consumeOneOf('--', '-/-', '-');
            const assoc3 = consumeOneOf('o)', 'o', '>o', '>', ')', '+', ':>', '');
            const endLabel = consumeOptional(/[^\[]/);
            const target = parseNode();
            return {
                association: {
                    type: `${assoc1}${assoc2}${assoc3}`,
                    start: fromNode.id,
                    end: target.id,
                    startLabel: { text: startLabel.trim() },
                    endLabel: { text: endLabel.trim() },
                },
                target: target,
            };
        }
        function parseNode() {
            index++;
            let attr = {};
            let type = 'class';
            if (source[index] == '<') {
                const meta = parseMeta();
                attr = meta.attr;
                type = meta.type ?? 'class';
            }
            const parts = [parsePart()];
            while (source[index] == '|') {
                let lastIndex = index;
                pop();
                parts.push(parsePart());
                if (lastIndex === index)
                    throw new Error('Infinite loop');
            }
            if (source[index] == ']') {
                pop();
                discard(/ /);
                return { parts: parts, attr, id: attr.id ?? parts[0].lines[0], type };
            }
            error(']', source[index]);
        }
        function parseLine() {
            const chars = [];
            while (index < source.length) {
                let lastIndex = index;
                if (source[index] === '\\') {
                    pop();
                    chars.push(transformEscapes(pop()));
                }
                else if (source[index].match(/[\[\]|;\n]/)) {
                    break;
                }
                else {
                    chars.push(pop());
                }
                if (lastIndex === index)
                    throw new Error('Infinite loop');
            }
            return chars.join('');
        }
        function parseMeta() {
            index++;
            const type = consume(/[a-zA-Z0-9_]/);
            const char = pop();
            if (char == '>')
                return { type, attr: {} };
            if (char != ' ')
                error([' ', '>'], char);
            return { type, attr: parseAttrs() };
        }
        function parseAttrs() {
            const key = consume(/[a-zA-Z0-9_]/);
            const separator = pop();
            if (separator != '=')
                error('=', separator);
            const value = consume(/[^> ]/);
            const char = pop();
            if (char == '>')
                return { [key]: value };
            if (char == ' ')
                return { [key]: value, ...parseAttrs() };
            error([' ', '>'], char);
        }
        function pop() {
            const char = source[index];
            index++;
            return char;
        }
        function discard(regex) {
            while (source[index]?.match(regex))
                index++;
        }
        function consume(regex, optional) {
            const start = index;
            while (source[index]?.match(regex))
                index++;
            const end = index;
            if (!optional && start == end)
                error(regex, source[index]);
            return source.slice(start, end);
        }
        function consumeOptional(regex) {
            return consume(regex, 'optional');
        }
        function isOneOf(...patterns) {
            for (const pattern of patterns) {
                const token = source.slice(index, index + pattern.length);
                if (token == pattern) {
                    return true;
                }
            }
            return false;
        }
        function consumeOneOf(...patterns) {
            for (const pattern of patterns) {
                const token = source.slice(index, index + pattern.length);
                if (token == pattern) {
                    index += pattern.length;
                    return pattern;
                }
            }
            const maxPatternLength = Math.max(...patterns.map((e) => e.length));
            if (index + 1 >= source.length)
                error(patterns, undefined);
            else
                error(patterns, source.slice(index + 1, maxPatternLength));
        }
        function error(expected, actual) {
            throw new ParseError(expected, actual, line, index - lineStartIndex);
        }
    }
    function serializeValue(value) {
        if (value == null)
            return 'end of file';
        if (value instanceof RegExp)
            return value.toString().slice(1, -1);
        if (Array.isArray(value))
            return value.map(serializeValue).join(' or ');
        return JSON.stringify(value);
    }
    class ParseError extends Error {
        constructor(expected, actual, line, column) {
            const exp = serializeValue(expected);
            const act = serializeValue(actual);
            super(`Parse error at line ${line} column ${column}, expected ${exp} but got ${act}`);
            this.expected = exp;
            this.actual = act;
            this.line = line;
            this.column = column;
        }
    }

    function parse(source) {
        const { root, directives } = linearParse(source);
        return { root, directives, config: getConfig(directives) };
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
            const floatingKeywords = styleDef.replace(/[a-z]*=[^ ]+/g, '');
            const titleDef = last(styleDef.match('title=([^ ]*)') || ['']);
            const bodyDef = last(styleDef.match('body=([^ ]*)') || ['']);
            return {
                title: {
                    bold: titleDef.includes('bold') || floatingKeywords.includes('bold'),
                    underline: titleDef.includes('underline') || floatingKeywords.includes('underline'),
                    italic: titleDef.includes('italic') || floatingKeywords.includes('italic'),
                    center: !(titleDef.includes('left') || styleDef.includes('align=left')),
                },
                body: {
                    bold: bodyDef.includes('bold'),
                    underline: bodyDef.includes('underline'),
                    italic: bodyDef.includes('italic'),
                    center: bodyDef.includes('center'),
                },
                dashed: styleDef.includes('dashed'),
                fill: last(styleDef.match('fill=([^ ]*)') || []),
                stroke: last(styleDef.match('stroke=([^ ]*)') || []),
                visual: (last(styleDef.match('visual=([^ ]*)') || []) || 'class'),
                direction: directionToDagre(last(styleDef.match('direction=([^ ]*)') || [])),
            };
        }
        function getConfig(directives) {
            const d = Object.fromEntries(directives.map((e) => [e.key, e.value]));
            const userStyles = {};
            for (const key in d) {
                if (key[0] != '.')
                    continue;
                const styleDef = d[key];
                userStyles[key.substring(1)] = parseCustomStyle(styleDef);
            }
            return {
                arrowSize: +d.arrowSize || 1,
                bendSize: +d.bendSize || 0.3,
                direction: directionToDagre(d.direction),
                gutter: +d.gutter || 20,
                edgeMargin: +d.edgeMargin || 0,
                gravity: Math.round(+(d.gravity ?? 1)),
                edges: d.edges == 'hard' ? 'hard' : 'rounded',
                fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
                background: d.background || 'transparent',
                fillArrows: d.fillArrows === 'true',
                font: d.font || 'Helvetica',
                fontSize: +d.fontSize || 12,
                leading: +d.leading || 1.35,
                lineWidth: +d.lineWidth || 3,
                padding: +d.padding || 8,
                spacing: +d.spacing || 40,
                stroke: d.stroke || '#33322E',
                title: d.title || '',
                zoom: +d.zoom || 1,
                acyclicer: d.acyclicer === 'greedy' ? 'greedy' : undefined,
                ranker: parseRanker(d.ranker),
                styles: { ...styles, ...userStyles },
            };
        }
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
        const path = r.path.slice(1, -1);
        const endDir = normalize(diff(path[path.length - 2], last(path)));
        const startDir = normalize(diff(path[1], path[0]));
        const size = (config.spacing * config.arrowSize) / 30;
        const head = 0;
        const end = path.length - 1;
        const copy = path.map((p) => ({ x: p.x, y: p.y }));
        const tokens = r.type.split(/[-_]/);
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
        const start = r.path[1];
        const end = r.path[r.path.length - 2];
        const path = r.path.slice(1, -1);
        const tokens = r.type.split(/[-_]/);
        drawArrowEnd(last(tokens), path, end);
        drawArrowEnd(tokens[0], path.reverse(), start);
        function drawArrowEnd(id, path, end) {
            const dir = normalize(diff(path[path.length - 2], last(path)));
            const size = (config.spacing * config.arrowSize) / 30;
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
            const center = add(end, mult(nv, size * stem));
            g.fillStyle(config.fill[0]);
            g.ellipse(center, size * 6, size * 6).fillAndStroke();
        }
        function drawStem(nv, size, stem, end) {
            const center = add(end, mult(nv, size * stem));
            g.path([center, end]).stroke();
        }
        function drawSocket(nv, size, stem, end) {
            const base = add(end, mult(nv, size * stem));
            const t = rot(nv);
            const socket = range([-Math.PI / 2, Math.PI / 2], 12).map((a) => add(base, add(mult(nv, -6 * size * Math.cos(a)), mult(t, 6 * size * Math.sin(a)))));
            g.path(socket).stroke();
        }
        function drawArrow(nv, size, isOpen, end) {
            const x = (s) => add(end, mult(nv, s * size));
            const y = (s) => mult(rot(nv), s * size);
            const arrow = [
                add(x(10), y(4)),
                x(isOpen && !config.fillArrows ? 5 : 10),
                add(x(10), y(-4)),
                end,
            ];
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
        }
        function drawDiamond(nv, size, isOpen, end) {
            const x = (s) => add(end, mult(nv, s * size));
            const y = (s) => mult(rot(nv), s * size);
            const arrow = [add(x(7), y(4)), x(14), add(x(7), y(-4)), end];
            g.save();
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
            g.restore();
        }
    }

    function render(graphics, config, compartment) {
        const g = graphics;
        function renderCompartment(compartment, color, style, level) {
            g.save();
            g.translate(compartment.offset.x, compartment.offset.y);
            g.fillStyle(color || config.stroke);
            for (let i = 0; i < compartment.lines.length; i++) {
                const text = compartment.lines[i];
                g.textAlign(style.center ? 'center' : 'left');
                const x = style.center ? compartment.width / 2 - config.padding : 0;
                let y = (0.5 + (i + 0.5) * config.leading) * config.fontSize;
                if (text) {
                    g.fillText(text, x, y);
                }
                if (style.underline) {
                    const w = g.measureText(text).width;
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
            }
            g.save();
            g.translate(config.gutter, config.gutter);
            for (const r of compartment.assocs)
                renderRelation(r);
            for (const n of compartment.nodes)
                renderNode(n, level);
            g.restore();
            g.restore();
        }
        function renderNode(node, level) {
            const x = node.x - node.width / 2;
            const y = node.y - node.height / 2;
            const style = config.styles[node.type] || styles.class;
            g.save();
            g.setData('name', node.id);
            g.setData('compartment', undefined);
            g.save();
            g.fillStyle(style.fill || config.fill[level] || last(config.fill));
            g.strokeStyle(style.stroke || config.stroke);
            if (style.dashed) {
                const dash = Math.max(4, 2 * config.lineWidth);
                g.setLineDash([dash, dash]);
            }
            const drawNode = visualizers[style.visual] || visualizers.class;
            drawNode(node, x, y, config, g);
            for (const divider of node.dividers) {
                g.path(divider.map((e) => add(e, { x, y }))).stroke();
            }
            g.restore();
            let partIndex = 0;
            for (let part of node.parts) {
                const textStyle = part === node.parts[0] ? style.title : style.body;
                g.save();
                g.setData('compartment', String(partIndex));
                g.translate(x + part.x, y + part.y);
                g.setFont(config.font, config.fontSize, textStyle.bold ? 'bold' : 'normal', textStyle.italic ? 'italic' : 'normal');
                renderCompartment(part, style.stroke, textStyle, level + 1);
                partIndex++;
                g.restore();
            }
            g.restore();
        }
        function strokePath(p) {
            if (config.edges === 'rounded') {
                const radius = config.spacing * config.bendSize;
                g.beginPath();
                g.moveTo(p[0].x, p[0].y);
                for (let i = 1; i < p.length - 1; i++) {
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
            const fontSize = config.fontSize;
            const lines = label.text.split('`');
            for (let i = 0; i < lines.length; i++) {
                g.fillText(lines[i], label.x, label.y + fontSize * (i + 1));
            }
        }
        function renderRelation(r) {
            const path = getPath(config, r);
            g.fillStyle(config.stroke);
            g.setFont(config.font, config.fontSize, 'normal', 'normal');
            renderLabel(r.startLabel);
            renderLabel(r.endLabel);
            if (r.type !== '-/-') {
                if (r.type.includes('--')) {
                    const dash = Math.max(4, 2 * config.lineWidth);
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
        setBackground();
        g.setFont(config.font, config.fontSize, 'bold', 'normal');
        g.lineWidth(config.lineWidth);
        g.lineJoin('round');
        g.lineCap('round');
        g.strokeStyle(config.stroke);
        renderCompartment(compartment, undefined, buildStyle({}, {}).title, 0);
        g.restore();
    }

    function GraphicsCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        const twopi = 2 * 3.1416;
        let mousePos = { x: 0, y: 0 };
        const chainable = {
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
            for (let i = 1, len = path.length; i < len; i++)
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
        return (str ?? '')
            .toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
    const charWidths = { "0": 10, "1": 10, "2": 10, "3": 10, "4": 10, "5": 10, "6": 10, "7": 10, "8": 10, "9": 10, " ": 5, "!": 5, "\"": 6, "#": 10, "$": 10, "%": 15, "&": 11, "'": 4, "(": 6, ")": 6, "*": 7, "+": 10, ",": 5, "-": 6, ".": 5, "/": 5, ":": 5, ";": 5, "<": 10, "=": 10, ">": 10, "?": 10, "@": 17, "A": 11, "B": 11, "C": 12, "D": 12, "E": 11, "F": 10, "G": 13, "H": 12, "I": 5, "J": 9, "K": 11, "L": 10, "M": 14, "N": 12, "O": 13, "P": 11, "Q": 13, "R": 12, "S": 11, "T": 10, "U": 12, "V": 11, "W": 16, "X": 11, "Y": 11, "Z": 10, "[": 5, "\\": 5, "]": 5, "^": 8, "_": 10, "`": 6, "a": 10, "b": 10, "c": 9, "d": 10, "e": 10, "f": 5, "g": 10, "h": 10, "i": 4, "j": 4, "k": 9, "l": 4, "m": 14, "n": 10, "o": 10, "p": 10, "q": 10, "r": 6, "s": 9, "t": 5, "u": 10, "v": 9, "w": 12, "x": 9, "y": 9, "z": 9, "{": 6, "|": 5, "}": 6, "~": 10 };
    function GraphicsSvg(document) {
        const initialState = {
            stroke: undefined,
            'stroke-width': 1,
            'stroke-dasharray': undefined,
            'stroke-linecap': undefined,
            'stroke-linejoin': undefined,
            'text-align': 'left',
            font: '12pt Helvetica, Arial, sans-serif',
            'font-size': '12pt',
        };
        const measurementCanvas = document
            ? document.createElement('canvas')
            : null;
        const ctx = measurementCanvas ? measurementCanvas.getContext('2d') : null;
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
                const data = getAncestorData(this.group()) ?? {};
                const attrs = toAttrString({ ...this.attr, ...data });
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
        function getAncestorData(group) {
            if (!group)
                return syntheticRoot.data;
            return { ...getAncestorData(group.parent), ...group.data };
        }
        function getDefined(group, getter) {
            if (!group)
                return getter(syntheticRoot);
            return getter(group) ?? getDefined(group.parent, getter) ?? getter(syntheticRoot);
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
        const root = new Element('svg', {
            version: '1.1',
            baseProfile: 'full',
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            'xmlns:ev': 'http://www.w3.org/2001/xml-events',
        }, undefined);
        let current = new GroupElement(root);
        current.attr = initialState;
        root.children.push(current);
        let inPathBuilderMode = false;
        function tracePath(path, offset = { x: 0, y: 0 }, s = 1) {
            const d = path
                .map((e, i) => (i ? 'L' : 'M') + (offset.x + s * e.x).toFixed(1) + ' ' + (offset.y + s * e.y).toFixed(1))
                .join(' ');
            return el('path', { d: d });
        }
        function el(type, attr, text) {
            const element = new Element(type, attr, current, text);
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
                    const path = range([start, stop], 64).map((a) => add(center, { x: (Math.cos(a) * w) / 2, y: (Math.sin(a) * h) / 2 }));
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
                const element = tracePath(path, offset, s);
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
                            const size = getDefined(current, (e) => e.attr['font-size']) ?? 12;
                            const scale = parseInt(size.toString()) / 12;
                            return (charWidths[c] ?? 16) * scale;
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
                const node = new GroupElement(current);
                current.children.push(node);
                current = node;
            },
            setData: function (name, value) {
                current.data = current.data ?? {};
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
                    viewBox: '0 0 ' + size.width + ' ' + size.height,
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
        const parsedDiagram = parse(code);
        const config = parsedDiagram.config;
        const measurer = createMeasurer(config, graphics);
        const graphLayout = layout(measurer, config, parsedDiagram.root);
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
        const skCanvas = GraphicsSvg(document);
        const { config, layout } = parseAndRender(code, skCanvas, null, 1);
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
    async function processAsyncImports(source, loadFile, maxImportDepth = 10) {
        if (maxImportDepth == -1) {
            throw new ImportDepthError();
        }
        async function lenientLoadFile(key) {
            try {
                return (await loadFile(key)) || '';
            }
            catch (e) {
                return '';
            }
        }
        const imports = [];
        source.replace(/#import: *(.*)/g, (a, file) => {
            const promise = lenientLoadFile(file).then((contents) => processAsyncImports(contents, loadFile, maxImportDepth - 1));
            imports.push({ file, promise });
            return '';
        });
        const imported = {};
        for (const imp of imports) {
            imported[imp.file] = await imp.promise;
        }
        return source.replace(/#import: *(.*)/g, (a, file) => imported[file]);
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
        const fs = require('fs');
        const path = require('path');
        const directory = path.dirname(filepath);
        const rootFileName = path.basename(filepath);
        function loadFile(filename) {
            return fs.readFileSync(path.join(directory, filename), { encoding: 'utf8' });
        }
        return processImports(loadFile(rootFileName), loadFile, maxImportDepth);
    }

    const version = '1.7.0';

    exports.ImportDepthError = ImportDepthError;
    exports.ParseError = ParseError;
    exports.compileFile = compileFile;
    exports.draw = draw;
    exports.layout = layout;
    exports.parse = parse;
    exports.processAsyncImports = processAsyncImports;
    exports.processImports = processImports;
    exports.renderSvg = renderSvg;
    exports.skanaar = util;
    exports.styles = styles;
    exports.version = version;
    exports.visualizers = visualizers;

}));
