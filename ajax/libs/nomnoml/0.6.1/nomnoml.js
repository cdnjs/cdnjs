;(function (factoryFn) {
  if (typeof module === 'object' && module.exports)
  	module.exports = factoryFn(require('dagre'));
  else this.nomnoml = factoryFn(dagre);
})(function (dagre) {
  var nomnoml;
(function (nomnoml) {
    function buildStyle(conf) {
        return {
            bold: conf.bold || false,
            underline: conf.underline || false,
            italic: conf.italic || false,
            dashed: conf.dashed || false,
            empty: conf.empty || false,
            center: conf.center || false,
            fill: conf.fill || undefined,
            stroke: conf.stroke || undefined,
            visual: conf.visual || 'class',
            direction: conf.direction || undefined,
            hull: conf.hull || 'auto'
        };
    }
    nomnoml.buildStyle = buildStyle;
    var Compartment = (function () {
        function Compartment(lines, nodes, relations) {
            this.lines = lines;
            this.nodes = nodes;
            this.relations = relations;
        }
        return Compartment;
    }());
    nomnoml.Compartment = Compartment;
    var Relation = (function () {
        function Relation() {
        }
        return Relation;
    }());
    nomnoml.Relation = Relation;
    var Classifier = (function () {
        function Classifier(type, name, compartments) {
            this.type = type;
            this.name = name;
            this.compartments = compartments;
        }
        return Classifier;
    }());
    nomnoml.Classifier = Classifier;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    function layout(measurer, config, ast) {
        function measureLines(lines, fontWeight) {
            if (!lines.length)
                return { width: 0, height: config.padding };
            measurer.setFont(config, fontWeight, 'normal');
            return {
                width: Math.round(nomnoml.skanaar.max(lines.map(measurer.textWidth)) + 2 * config.padding),
                height: Math.round(measurer.textHeight() * lines.length + 2 * config.padding)
            };
        }
        function layoutCompartment(c, compartmentIndex, style) {
            var textSize = measureLines(c.lines, compartmentIndex ? 'normal' : 'bold');
            c.width = textSize.width;
            c.height = textSize.height;
            if (!c.nodes.length && !c.relations.length)
                return;
            c.nodes.forEach(layoutClassifier);
            var g = new dagre.graphlib.Graph();
            g.setGraph({
                rankdir: style.direction || config.direction,
                nodesep: config.spacing,
                edgesep: config.spacing,
                ranksep: config.spacing,
                acyclicer: config.acyclicer,
                ranker: config.ranker
            });
            c.nodes.forEach(function (e) {
                g.setNode(e.name, { width: e.layoutWidth, height: e.layoutHeight });
            });
            c.relations.forEach(function (r) {
                g.setEdge(r.start, r.end, { id: r.id });
            });
            dagre.layout(g);
            var rels = nomnoml.skanaar.indexBy(c.relations, 'id');
            var nodes = nomnoml.skanaar.indexBy(c.nodes, 'name');
            function toPoint(o) { return { x: o.x, y: o.y }; }
            g.nodes().forEach(function (name) {
                var node = g.node(name);
                nodes[name].x = node.x;
                nodes[name].y = node.y;
            });
            g.edges().forEach(function (edgeObj) {
                var edge = g.edge(edgeObj);
                var start = nodes[edgeObj.v];
                var end = nodes[edgeObj.w];
                rels[edge.id].path = nomnoml.skanaar.flatten([[start], edge.points, [end]]).map(toPoint);
            });
            var graph = g.graph();
            var graphHeight = graph.height ? graph.height + 2 * config.gutter : 0;
            var graphWidth = graph.width ? graph.width + 2 * config.gutter : 0;
            c.width = Math.max(textSize.width, graphWidth) + 2 * config.padding;
            c.height = textSize.height + graphHeight + config.padding;
        }
        function layoutClassifier(clas) {
            var layout = getLayouter(clas);
            layout(clas);
            clas.layoutWidth = clas.width + 2 * config.edgeMargin;
            clas.layoutHeight = clas.height + 2 * config.edgeMargin;
        }
        function getLayouter(clas) {
            var style = config.styles[clas.type] || nomnoml.styles.CLASS;
            switch (style.hull) {
                case 'icon': return function (clas) {
                    clas.width = config.fontSize * 2.5;
                    clas.height = config.fontSize * 2.5;
                };
                case 'empty': return function (clas) {
                    clas.width = 0;
                    clas.height = 0;
                };
                default: return function (clas) {
                    clas.compartments.forEach(function (co, i) { layoutCompartment(co, i, style); });
                    clas.width = nomnoml.skanaar.max(clas.compartments, 'width');
                    clas.height = nomnoml.skanaar.sum(clas.compartments, 'height');
                    clas.x = clas.layoutWidth / 2;
                    clas.y = clas.layoutHeight / 2;
                    clas.compartments.forEach(function (co) { co.width = clas.width; });
                };
            }
        }
        layoutCompartment(ast, 0, nomnoml.styles.CLASS);
        return ast;
    }
    nomnoml.layout = layout;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    function fitCanvasSize(canvas, rect, zoom) {
        canvas.width = rect.width * zoom;
        canvas.height = rect.height * zoom;
    }
    function setFont(config, isBold, isItalic, graphics) {
        var style = (isBold === 'bold' ? 'bold' : '');
        if (isItalic)
            style = 'italic ' + style;
        var defaultFont = 'Helvetica, sans-serif';
        var font = nomnoml.skanaar.format('# #pt #, #', style, config.fontSize, config.font, defaultFont);
        graphics.font(font);
    }
    function parseAndRender(code, graphics, canvas, scale) {
        var parsedDiagram = nomnoml.parse(code);
        var config = parsedDiagram.config;
        var measurer = {
            setFont: function (conf, bold, ital) {
                setFont(conf, bold, ital, graphics);
            },
            textWidth: function (s) { return graphics.measureText(s).width; },
            textHeight: function () { return config.leading * config.fontSize; }
        };
        var layout = nomnoml.layout(measurer, config, parsedDiagram.root);
        fitCanvasSize(canvas, layout, config.zoom * scale);
        config.zoom *= scale;
        nomnoml.render(graphics, config, layout, measurer.setFont);
        return { config: config };
    }
    nomnoml.version = '0.6.1';
    function draw(canvas, code, scale) {
        return parseAndRender(code, nomnoml.skanaar.Canvas(canvas), canvas, scale || 1);
    }
    nomnoml.draw = draw;
    function renderSvg(code, docCanvas) {
        var parsedDiagram = nomnoml.parse(code);
        var config = parsedDiagram.config;
        var skCanvas = nomnoml.skanaar.Svg('', docCanvas);
        function setFont(config, isBold, isItalic) {
            var style = (isBold === 'bold' ? 'bold' : '');
            if (isItalic)
                style = 'italic ' + style;
            var defFont = 'Helvetica, sans-serif';
            var template = 'font-weight:#; font-size:#pt; font-family:\'#\', #';
            var font = nomnoml.skanaar.format(template, style, config.fontSize, config.font, defFont);
            skCanvas.font(font);
        }
        var measurer = {
            setFont: function (conf, bold, ital) {
                setFont(conf, bold, ital);
            },
            textWidth: function (s) { return skCanvas.measureText(s).width; },
            textHeight: function () { return config.leading * config.fontSize; }
        };
        var layout = nomnoml.layout(measurer, config, parsedDiagram.root);
        nomnoml.render(skCanvas, config, layout, measurer.setFont);
        return skCanvas.serialize({
            width: layout.width,
            height: layout.height
        });
    }
    nomnoml.renderSvg = renderSvg;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var Line = (function () {
        function Line() {
        }
        return Line;
    }());
    function parse(source) {
        function onlyCompilables(line) {
            var ok = line[0] !== '#' && line.trim().substring(0, 2) !== '//';
            return ok ? line.trim() : '';
        }
        function isDirective(line) { return line.text[0] === '#'; }
        var lines = source.split('\n').map(function (s, i) {
            return { text: s, index: i };
        });
        var pureDirectives = lines.filter(isDirective);
        var directives = {};
        pureDirectives.forEach(function (line) {
            try {
                var tokens = line.text.substring(1).split(':');
                directives[tokens[0].trim()] = tokens[1].trim();
            }
            catch (e) {
                throw new Error('line ' + (line.index + 1));
            }
        });
        var pureDiagramCode = lines.map(function (e) { return onlyCompilables(e.text); }).join('\n').trim();
        var parseTree = nomnoml.intermediateParse(pureDiagramCode);
        return {
            root: nomnoml.transformParseIntoSyntaxTree(parseTree),
            config: getConfig(directives)
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
            var contains = nomnoml.skanaar.hasSubstring;
            return {
                bold: contains(styleDef, 'bold'),
                underline: contains(styleDef, 'underline'),
                italic: contains(styleDef, 'italic'),
                dashed: contains(styleDef, 'dashed'),
                empty: contains(styleDef, 'empty'),
                center: nomnoml.skanaar.last(styleDef.match('align=([^ ]*)') || []) == 'left' ? false : true,
                fill: nomnoml.skanaar.last(styleDef.match('fill=([^ ]*)') || []),
                stroke: nomnoml.skanaar.last(styleDef.match('stroke=([^ ]*)') || []),
                visual: nomnoml.skanaar.last(styleDef.match('visual=([^ ]*)') || []) || 'class',
                direction: directionToDagre(nomnoml.skanaar.last(styleDef.match('direction=([^ ]*)') || [])),
                hull: 'auto'
            };
        }
        function getConfig(d) {
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
                gutter: +d.gutter || 5,
                edgeMargin: (+d.edgeMargin) || 0,
                edges: d.edges == 'hard' ? 'hard' : 'rounded',
                fill: (d.fill || '#eee8d5;#fdf6e3;#eee8d5;#fdf6e3').split(';'),
                fillArrows: d.fillArrows === 'true',
                font: d.font || 'Calibri',
                fontSize: (+d.fontSize) || 12,
                leading: (+d.leading) || 1.25,
                lineWidth: (+d.lineWidth) || 3,
                padding: (+d.padding) || 8,
                spacing: (+d.spacing) || 40,
                stroke: d.stroke || '#33322E',
                title: d.title || 'nomnoml',
                zoom: +d.zoom || 1,
                acyclicer: d.acyclicer === 'greedy' ? 'greedy' : undefined,
                ranker: parseRanker(d.ranker),
                styles: nomnoml.skanaar.merged(nomnoml.styles, userStyles)
            };
        }
    }
    nomnoml.parse = parse;
    function intermediateParse(source) {
        return nomnomlCoreParser.parse(source);
    }
    nomnoml.intermediateParse = intermediateParse;
    function transformParseIntoSyntaxTree(entity) {
        function isAstClassifier(obj) {
            return obj.parts !== undefined;
        }
        function isAstRelation(obj) {
            return obj.assoc !== undefined;
        }
        function isAstCompartment(obj) {
            return Array.isArray(obj);
        }
        var relationId = 0;
        function transformCompartment(slots) {
            var lines = [];
            var rawClassifiers = [];
            var relations = [];
            slots.forEach(function (p) {
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
                        startLabel: p.startLabel,
                        endLabel: p.endLabel
                    });
                }
                if (isAstClassifier(p)) {
                    rawClassifiers.push(p);
                }
            });
            var allClassifiers = rawClassifiers
                .map(transformClassifier)
                .sort(function (a, b) {
                return b.compartments.length - a.compartments.length;
            });
            var uniqClassifiers = nomnoml.skanaar.uniqueBy(allClassifiers, 'name');
            var uniqRelations = relations.filter(function (a) {
                for (var _i = 0, relations_1 = relations; _i < relations_1.length; _i++) {
                    var b = relations_1[_i];
                    if (a === b)
                        return true;
                    if (b.start == a.start && b.end == a.end)
                        return false;
                }
                return true;
            });
            return new nomnoml.Compartment(lines, uniqClassifiers, uniqRelations);
        }
        function transformClassifier(entity) {
            var compartments = entity.parts.map(transformCompartment);
            return new nomnoml.Classifier(entity.type, entity.id, compartments);
        }
        return transformCompartment(entity);
    }
    nomnoml.transformParseIntoSyntaxTree = transformParseIntoSyntaxTree;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    function render(graphics, config, compartment, setFont) {
        var padding = config.padding;
        var g = graphics;
        var vm = nomnoml.skanaar.vector;
        function renderCompartment(compartment, style, level) {
            g.save();
            g.translate(padding, padding);
            g.fillStyle(style.stroke || config.stroke);
            compartment.lines.forEach(function (text, i) {
                g.textAlign(style.center ? 'center' : 'left');
                var x = style.center ? compartment.width / 2 - padding : 0;
                var y = (0.5 + (i + 0.5) * config.leading) * config.fontSize;
                if (text) {
                    g.fillText(text, x, y);
                }
                if (style.underline) {
                    var w = g.measureText(text).width;
                    y += Math.round(config.fontSize * 0.2) + 0.5;
                    g.path([{ x: x - w / 2, y: y }, { x: x + w / 2, y: y }]).stroke();
                    g.lineWidth(config.lineWidth);
                }
            });
            g.translate(config.gutter, config.gutter);
            compartment.relations.forEach(function (r) { renderRelation(r, compartment); });
            compartment.nodes.forEach(function (n) { renderNode(n, level); });
            g.restore();
        }
        function renderNode(node, level) {
            var x = Math.round(node.x - node.width / 2);
            var y = Math.round(node.y - node.height / 2);
            var style = config.styles[node.type] || nomnoml.styles.CLASS;
            g.fillStyle(style.fill || config.fill[level] || nomnoml.skanaar.last(config.fill));
            g.strokeStyle(style.stroke || config.stroke);
            if (style.dashed) {
                var dash = Math.max(4, 2 * config.lineWidth);
                g.setLineDash([dash, dash]);
            }
            var drawNode = nomnoml.visualizers[style.visual] || nomnoml.visualizers["class"];
            drawNode(node, x, y, config, g);
            g.setLineDash([]);
            var yDivider = (style.visual === 'actor' ? y + padding * 3 / 4 : y);
            node.compartments.forEach(function (part, i) {
                var s = i > 0 ? nomnoml.buildStyle({ stroke: style.stroke }) : style;
                if (s.empty)
                    return;
                g.save();
                g.translate(x, yDivider);
                setFont(config, s.bold ? 'bold' : 'normal', s.italic ? 'italic' : undefined);
                renderCompartment(part, s, level + 1);
                g.restore();
                if (i + 1 === node.compartments.length)
                    return;
                yDivider += part.height;
                if (style.visual === 'frame' && i === 0) {
                    var w = g.measureText(node.name).width + part.height / 2 + padding;
                    g.path([
                        { x: x, y: yDivider },
                        { x: x + w - part.height / 2, y: yDivider },
                        { x: x + w, y: yDivider - part.height / 2 },
                        { x: x + w, y: yDivider - part.height }
                    ]).stroke();
                }
                else {
                    g.path([{ x: x, y: yDivider }, { x: x + node.width, y: yDivider }]).stroke();
                }
            });
        }
        function strokePath(p) {
            if (config.edges === 'rounded') {
                var radius = config.spacing * config.bendSize;
                g.beginPath();
                g.moveTo(p[0].x, p[0].y);
                for (var i = 1; i < p.length - 1; i++) {
                    g.arcTo(p[i].x, p[i].y, p[i + 1].x, p[i + 1].y, radius);
                }
                g.lineTo(nomnoml.skanaar.last(p).x, nomnoml.skanaar.last(p).y);
                g.stroke();
            }
            else
                g.path(p).stroke();
        }
        var empty = false, filled = true, diamond = true;
        function renderLabel(text, pos, quadrant) {
            if (text) {
                var fontSize = config.fontSize;
                var lines = text.split('`');
                var area = {
                    width: nomnoml.skanaar.max(lines.map(function (l) { return g.measureText(l).width; })),
                    height: fontSize * lines.length
                };
                var origin = {
                    x: pos.x + ((quadrant == 1 || quadrant == 4) ? padding : -area.width - padding),
                    y: pos.y + ((quadrant == 3 || quadrant == 4) ? padding : -area.height - padding)
                };
                lines.forEach(function (l, i) { g.fillText(l, origin.x, origin.y + fontSize * (i + 1)); });
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
            if ((opposite.x == point.x) || (opposite.y == point.y))
                return quadrant;
            var flipHorizontally = [4, 3, 2, 1];
            var flipVertically = [2, 1, 4, 3];
            var oppositeQuadrant = (opposite.y < point.y) ?
                ((opposite.x < point.x) ? 2 : 1) :
                ((opposite.x < point.x) ? 3 : 4);
            if (oppositeQuadrant === quadrant) {
                if (config.direction === 'LR')
                    return flipHorizontally[quadrant - 1];
                if (config.direction === 'TB')
                    return flipVertically[quadrant - 1];
            }
            return quadrant;
        }
        function renderRelation(r, compartment) {
            var startNode = nomnoml.skanaar.find(compartment.nodes, function (e) { return e.name == r.start; });
            var endNode = nomnoml.skanaar.find(compartment.nodes, function (e) { return e.name == r.end; });
            var start = r.path[1];
            var end = r.path[r.path.length - 2];
            var path = r.path.slice(1, -1);
            g.fillStyle(config.stroke);
            setFont(config, 'normal');
            renderLabel(r.startLabel, start, adjustQuadrant(quadrant(start, startNode, 4), start, end));
            renderLabel(r.endLabel, end, adjustQuadrant(quadrant(end, endNode, 2), end, start));
            if (r.assoc !== '-/-') {
                if (nomnoml.skanaar.hasSubstring(r.assoc, '--')) {
                    var dash = Math.max(4, 2 * config.lineWidth);
                    g.setLineDash([dash, dash]);
                    strokePath(path);
                    g.setLineDash([]);
                }
                else
                    strokePath(path);
            }
            function drawArrowEnd(id, path, end) {
                if (id === '>' || id === '<')
                    drawArrow(path, filled, end, false);
                else if (id === ':>' || id === '<:')
                    drawArrow(path, empty, end, false);
                else if (id === '+')
                    drawArrow(path, filled, end, diamond);
                else if (id === 'o')
                    drawArrow(path, empty, end, diamond);
            }
            var tokens = r.assoc.split('-');
            drawArrowEnd(nomnoml.skanaar.last(tokens), path, end);
            drawArrowEnd(tokens[0], path.reverse(), start);
        }
        function drawArrow(path, isOpen, arrowPoint, diamond) {
            var size = config.spacing * config.arrowSize / 30;
            var v = vm.diff(path[path.length - 2], nomnoml.skanaar.last(path));
            var nv = vm.normalize(v);
            function getArrowBase(s) { return vm.add(arrowPoint, vm.mult(nv, s * size)); }
            var arrowBase = getArrowBase(diamond ? 7 : 10);
            var t = vm.rot(nv);
            var arrowButt = (diamond) ? getArrowBase(14)
                : (isOpen && !config.fillArrows) ? getArrowBase(5) : arrowBase;
            var arrow = [
                vm.add(arrowBase, vm.mult(t, 4 * size)),
                arrowButt,
                vm.add(arrowBase, vm.mult(t, -4 * size)),
                arrowPoint
            ];
            g.fillStyle(isOpen ? config.stroke : config.fill[0]);
            g.circuit(arrow).fillAndStroke();
        }
        function snapToPixels() {
            if (config.lineWidth % 2 === 1)
                g.translate(0.5, 0.5);
        }
        g.clear();
        setFont(config, 'bold');
        g.save();
        g.lineWidth(config.lineWidth);
        g.lineJoin('round');
        g.lineCap('round');
        g.strokeStyle(config.stroke);
        g.scale(config.zoom, config.zoom);
        snapToPixels();
        renderCompartment(compartment, nomnoml.buildStyle({ stroke: undefined }), 0);
        g.restore();
    }
    nomnoml.render = render;
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function Canvas(canvas, callbacks) {
            var ctx = canvas.getContext('2d');
            var mousePos = { x: 0, y: 0 };
            var twopi = 2 * 3.1416;
            function mouseEventToPos(event) {
                var e = canvas;
                return {
                    x: event.clientX - e.getBoundingClientRect().left - e.clientLeft + e.scrollLeft,
                    y: event.clientY - e.getBoundingClientRect().top - e.clientTop + e.scrollTop
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
                }
            };
            function color255(r, g, b, a) {
                var optionalAlpha = a === undefined ? 1 : a;
                var comps = [Math.floor(r), Math.floor(g), Math.floor(b), optionalAlpha];
                return 'rgba(' + comps.join() + ')';
            }
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
                mousePos: function () { return mousePos; },
                width: function () { return canvas.width; },
                height: function () { return canvas.height; },
                background: function (r, g, b) {
                    ctx.fillStyle = color255(r, g, b);
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
                font: function (f) { ctx.font = f; },
                fillStyle: function (s) { ctx.fillStyle = s; },
                strokeStyle: function (s) { ctx.strokeStyle = s; },
                textAlign: function (a) { ctx.textAlign = a; },
                lineCap: function (cap) { ctx.lineCap = cap; return chainable; },
                lineJoin: function (join) { ctx.lineJoin = join; return chainable; },
                lineWidth: function (w) { ctx.lineWidth = w; return chainable; },
                arcTo: function () { return ctx.arcTo.apply(ctx, arguments); },
                beginPath: function () { return ctx.beginPath.apply(ctx, arguments); },
                fillText: function () { return ctx.fillText.apply(ctx, arguments); },
                lineTo: function () { return ctx.lineTo.apply(ctx, arguments); },
                measureText: function () { return ctx.measureText.apply(ctx, arguments); },
                moveTo: function () { return ctx.moveTo.apply(ctx, arguments); },
                restore: function () { return ctx.restore.apply(ctx, arguments); },
                save: function () { return ctx.save.apply(ctx, arguments); },
                scale: function () { return ctx.scale.apply(ctx, arguments); },
                setLineDash: function () { return ctx.setLineDash.apply(ctx, arguments); },
                stroke: function () { return ctx.stroke.apply(ctx, arguments); },
                translate: function () { return ctx.translate.apply(ctx, arguments); }
            };
        }
        skanaar.Canvas = Canvas;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function Svg(globalStyle, canvas) {
            var initialState = {
                x: 0,
                y: 0,
                stroke: 'none',
                dashArray: 'none',
                fill: 'none',
                textAlign: 'left',
                font: null
            };
            var states = [initialState];
            var elements = [];
            var ctx = canvas ? canvas.getContext('2d') : null;
            var canUseCanvas = false;
            var waitingForFirstFont = true;
            var docFont = '';
            function Element(name, attr, content) {
                attr.style = attr.style || '';
                return {
                    name: name,
                    attr: attr,
                    content: content || undefined,
                    stroke: function () {
                        this.attr.style += 'stroke:' + lastDefined('stroke') +
                            ';fill:none;stroke-dasharray:' + lastDefined('dashArray') + ';';
                        return this;
                    },
                    fill: function () {
                        this.attr.style += 'stroke:none; fill:' + lastDefined('fill') + ';';
                        return this;
                    },
                    fillAndStroke: function () {
                        this.attr.style += 'stroke:' + lastDefined('stroke') + ';fill:' + lastDefined('fill') +
                            ';stroke-dasharray:' + lastDefined('dashArray') + ';';
                        return this;
                    }
                };
            }
            function State(dx, dy) {
                return { x: dx, y: dy, stroke: null, fill: null, textAlign: null, dashArray: 'none', font: null };
            }
            function trans(coord, axis) {
                states.forEach(function (t) { coord += t[axis]; });
                return coord;
            }
            function tX(coord) { return Math.round(10 * trans(coord, 'x')) / 10; }
            function tY(coord) { return Math.round(10 * trans(coord, 'y')) / 10; }
            function lastDefined(property) {
                for (var i = states.length - 1; i >= 0; i--)
                    if (states[i][property])
                        return states[i][property];
                return undefined;
            }
            function last(list) { return list[list.length - 1]; }
            function tracePath(path, offset, s) {
                s = s === undefined ? 1 : s;
                offset = offset || { x: 0, y: 0 };
                var d = path.map(function (e, i) {
                    return (i ? 'L' : 'M') + tX(offset.x + s * e.x) + ' ' + tY(offset.y + s * e.y);
                }).join(' ');
                return newElement('path', { d: d });
            }
            function newElement(type, attr, content) {
                var element = Element(type, attr, content);
                elements.push(element);
                return element;
            }
            return {
                width: function () { return 0; },
                height: function () { return 0; },
                background: function () { },
                clear: function () { },
                circle: function (p, r) {
                    var element = Element('circle', { r: r, cx: tX(p.x), cy: tY(p.y) });
                    elements.push(element);
                    return element;
                },
                ellipse: function (center, w, h, start, stop) {
                    if (stop) {
                        var y = tY(center.y);
                        return newElement('path', { d: 'M' + tX(center.x - w / 2) + ' ' + y +
                                'A' + w / 2 + ' ' + h / 2 + ' 0 1 0 ' + tX(center.x + w / 2) + ' ' + y
                        });
                    }
                    else {
                        return newElement('ellipse', { cx: tX(center.x), cy: tY(center.y), rx: w / 2, ry: h / 2 });
                    }
                },
                arc: function (x, y, r) {
                    return newElement('ellipse', { cx: tX(x), cy: tY(y), rx: r, ry: r });
                },
                roundRect: function (x, y, w, h, r) {
                    return newElement('rect', { x: tX(x), y: tY(y), rx: r, ry: r, height: h, width: w });
                },
                rect: function (x, y, w, h) {
                    return newElement('rect', { x: tX(x), y: tY(y), height: h, width: w });
                },
                path: tracePath,
                circuit: function (path, offset, s) {
                    var element = tracePath(path, offset, s);
                    element.attr.d += ' Z';
                    return element;
                },
                font: function (font) {
                    last(states).font = font;
                    if (waitingForFirstFont) {
                        if (ctx) {
                            var primaryFont = font.replace(/^.*family:/, '').replace(/[, ].*$/, '');
                            primaryFont = primaryFont.replace(/'/g, '');
                            canUseCanvas = /^(Arial|Helvetica|Times|Times New Roman)$/.test(primaryFont);
                            if (canUseCanvas) {
                                var fontSize = font.replace(/^.*font-size:/, '').replace(/;.*$/, '') + ' ';
                                if (primaryFont === 'Arial') {
                                    docFont = fontSize + 'Arial, Helvetica, sans-serif';
                                }
                                else if (primaryFont === 'Helvetica') {
                                    docFont = fontSize + 'Helvetica, Arial, sans-serif';
                                }
                                else if (primaryFont === 'Times New Roman') {
                                    docFont = fontSize + '"Times New Roman", Times, serif';
                                }
                                else if (primaryFont === 'Times') {
                                    docFont = fontSize + 'Times, "Times New Roman", serif';
                                }
                            }
                        }
                        waitingForFirstFont = false;
                    }
                },
                strokeStyle: function (stroke) {
                    last(states).stroke = stroke;
                },
                fillStyle: function (fill) {
                    last(states).fill = fill;
                },
                arcTo: function (x1, y1, x2, y2) {
                    last(elements).attr.d += ('L' + tX(x1) + ' ' + tY(y1) + ' L' + tX(x2) + ' ' + tY(y2) + ' ');
                },
                beginPath: function () {
                    return newElement('path', { d: '' });
                },
                fillText: function (text, x, y) {
                    var attr = { x: tX(x), y: tY(y), style: '' };
                    var font = lastDefined('font');
                    if (font.indexOf('bold') === -1) {
                        attr.style = 'font-weight:normal;';
                    }
                    if (font.indexOf('italic') > -1) {
                        attr.style += 'font-style:italic;';
                    }
                    if (lastDefined('textAlign') === 'center') {
                        attr.style += 'text-anchor: middle;';
                    }
                    function escapeHtml(unsafe) {
                        return unsafe
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#039;');
                    }
                    return newElement('text', attr, escapeHtml(text));
                },
                lineCap: function (cap) { globalStyle += ';stroke-linecap:' + cap; return last(elements); },
                lineJoin: function (join) { globalStyle += ';stroke-linejoin:' + join; return last(elements); },
                lineTo: function (x, y) {
                    last(elements).attr.d += ('L' + tX(x) + ' ' + tY(y) + ' ');
                    return last(elements);
                },
                lineWidth: function (w) { globalStyle += ';stroke-width:' + w; return last(elements); },
                measureText: function (s) {
                    if (canUseCanvas) {
                        var fontStr = lastDefined('font');
                        var italicSpec = (/\bitalic\b/.test(fontStr) ? 'italic' : 'normal') + ' normal ';
                        var boldSpec = /\bbold\b/.test(fontStr) ? 'bold ' : 'normal ';
                        ctx.font = italicSpec + boldSpec + docFont;
                        return ctx.measureText(s);
                    }
                    else {
                        return {
                            width: skanaar.sum(s, function (c) {
                                if (c === 'M' || c === 'W') {
                                    return 14;
                                }
                                return c.charCodeAt(0) < 200 ? 9.5 : 16;
                            })
                        };
                    }
                },
                moveTo: function (x, y) {
                    last(elements).attr.d += ('M' + tX(x) + ' ' + tY(y) + ' ');
                },
                restore: function () {
                    states.pop();
                },
                save: function () {
                    states.push(State(0, 0));
                },
                scale: function () { },
                setLineDash: function (d) {
                    last(states).dashArray = (d.length === 0) ? 'none' : d[0] + ' ' + d[1];
                },
                stroke: function () {
                    last(elements).stroke();
                },
                textAlign: function (a) {
                    last(states).textAlign = a;
                },
                translate: function (dx, dy) {
                    last(states).x += dx;
                    last(states).y += dy;
                },
                serialize: function (_attributes) {
                    var attrs = _attributes || {};
                    attrs.version = attrs.version || '1.1';
                    attrs.baseProfile = attrs.baseProfile || 'full';
                    attrs.width = attrs.width || '100%';
                    attrs.height = attrs.height || '100%';
                    if (attrs.width !== '100%' && attrs.height != '100%') {
                        attrs.viewbox = '0 0 ' + attrs.width + ' ' + attrs.height;
                    }
                    attrs.xmlns = attrs.xmlns || 'http://www.w3.org/2000/svg';
                    attrs['xmlns:xlink'] = attrs['xmlns:xlink'] || 'http://www.w3.org/1999/xlink';
                    attrs['xmlns:ev'] = attrs['xmlns:ev'] || 'http://www.w3.org/2001/xml-events';
                    attrs.style = attrs.style || lastDefined('font') + ';' + globalStyle;
                    function toAttr(obj) {
                        function toKeyValue(key) { return key + '="' + obj[key] + '"'; }
                        return Object.keys(obj).map(toKeyValue).join(' ');
                    }
                    function toHtml(e) {
                        return '<' + e.name + ' ' + toAttr(e.attr) + '>' + (e.content || '') + '</' + e.name + '>';
                    }
                    var innerSvg = elements.map(toHtml).join('\n');
                    return toHtml(Element('svg', attrs, innerSvg));
                }
            };
        }
        skanaar.Svg = Svg;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        function plucker(pluckerDef) {
            switch (typeof pluckerDef) {
                case 'undefined': return function (e) { return e; };
                case 'string': return function (obj) { return obj[pluckerDef]; };
                case 'number': return function (obj) { return obj[pluckerDef]; };
                case 'function': return pluckerDef;
            }
        }
        skanaar.plucker = plucker;
        function max(list, plucker) {
            var transform = skanaar.plucker(plucker);
            var maximum = transform(list[0]);
            for (var i = 0; i < list.length; i++) {
                var item = transform(list[i]);
                maximum = (item > maximum) ? item : maximum;
            }
            return maximum;
        }
        skanaar.max = max;
        function sum(list, plucker) {
            var transform = skanaar.plucker(plucker);
            for (var i = 0, summation = 0, len = list.length; i < len; i++)
                summation += transform(list[i]);
            return summation;
        }
        skanaar.sum = sum;
        function flatten(lists) {
            var out = [];
            for (var i = 0; i < lists.length; i++)
                out = out.concat(lists[i]);
            return out;
        }
        skanaar.flatten = flatten;
        function find(list, predicate) {
            for (var i = 0; i < list.length; i++)
                if (predicate(list[i]))
                    return list[i];
            return undefined;
        }
        skanaar.find = find;
        function last(list) {
            return list[list.length - 1];
        }
        skanaar.last = last;
        function hasSubstring(haystack, needle) {
            if (needle === '')
                return true;
            if (!haystack)
                return false;
            return haystack.indexOf(needle) !== -1;
        }
        skanaar.hasSubstring = hasSubstring;
        function format(template) {
            var parts = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                parts[_i - 1] = arguments[_i];
            }
            var matrix = template.split('#');
            var output = [matrix[0]];
            for (var i = 0; i < matrix.length - 1; i++) {
                output.push(parts[i] || '');
                output.push(matrix[i + 1]);
            }
            return output.join('');
        }
        skanaar.format = format;
        function merged(a, b) {
            function assign(target, data) {
                for (var key in data)
                    target[key] = data[key];
            }
            var obj = {};
            assign(obj, a);
            assign(obj, b);
            return obj;
        }
        skanaar.merged = merged;
        function indexBy(list, key) {
            var obj = {};
            for (var i = 0; i < list.length; i++)
                obj[list[i][key]] = list[i];
            return obj;
        }
        skanaar.indexBy = indexBy;
        function uniqueBy(list, pluckerDef) {
            var seen = {};
            var getKey = skanaar.plucker(pluckerDef);
            var out = [];
            for (var i = 0; i < list.length; i++) {
                var key = getKey(list[i]);
                if (!seen[key]) {
                    seen[key] = true;
                    out.push(list[i]);
                }
            }
            return out;
        }
        skanaar.uniqueBy = uniqueBy;
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    var skanaar;
    (function (skanaar) {
        skanaar.vector = {
            dist: function (a, b) { return skanaar.vector.mag(skanaar.vector.diff(a, b)); },
            add: function (a, b) { return { x: a.x + b.x, y: a.y + b.y }; },
            diff: function (a, b) { return { x: a.x - b.x, y: a.y - b.y }; },
            mult: function (v, factor) { return { x: factor * v.x, y: factor * v.y }; },
            mag: function (v) { return Math.sqrt(v.x * v.x + v.y * v.y); },
            normalize: function (v) { return skanaar.vector.mult(v, 1 / skanaar.vector.mag(v)); },
            rot: function (a) { return { x: a.y, y: -a.x }; }
        };
    })(skanaar = nomnoml.skanaar || (nomnoml.skanaar = {}));
})(nomnoml || (nomnoml = {}));
var nomnoml;
(function (nomnoml) {
    nomnoml.styles = {
        ABSTRACT: nomnoml.buildStyle({ visual: 'class', center: true, italic: true }),
        ACTOR: nomnoml.buildStyle({ visual: 'actor', center: true }),
        CHOICE: nomnoml.buildStyle({ visual: 'rhomb', center: true }),
        CLASS: nomnoml.buildStyle({ visual: 'class', center: true, bold: true }),
        DATABASE: nomnoml.buildStyle({ visual: 'database', center: true, bold: true }),
        END: nomnoml.buildStyle({ visual: 'end', center: true, empty: true, hull: 'icon' }),
        FRAME: nomnoml.buildStyle({ visual: 'frame' }),
        HIDDEN: nomnoml.buildStyle({ visual: 'hidden', center: true, empty: true, hull: 'empty' }),
        INPUT: nomnoml.buildStyle({ visual: 'input', center: true }),
        INSTANCE: nomnoml.buildStyle({ visual: 'class', center: true, underline: true }),
        LABEL: nomnoml.buildStyle({ visual: 'none' }),
        NOTE: nomnoml.buildStyle({ visual: 'note' }),
        PACKAGE: nomnoml.buildStyle({ visual: 'package' }),
        RECEIVER: nomnoml.buildStyle({ visual: 'receiver' }),
        REFERENCE: nomnoml.buildStyle({ visual: 'class', center: true, dashed: true }),
        SENDER: nomnoml.buildStyle({ visual: 'sender' }),
        START: nomnoml.buildStyle({ visual: 'start', center: true, empty: true, hull: 'icon' }),
        STATE: nomnoml.buildStyle({ visual: 'roundrect', center: true }),
        TRANSCEIVER: nomnoml.buildStyle({ visual: 'transceiver' }),
        USECASE: nomnoml.buildStyle({ visual: 'ellipse', center: true })
    };
    nomnoml.visualizers = {
        actor: function (node, x, y, config, g) {
            var a = config.padding / 2;
            var yp = y + a / 2;
            var actorCenter = { x: node.x, y: yp - a };
            g.circle(actorCenter, a).fillAndStroke();
            g.path([{ x: node.x, y: yp }, { x: node.x, y: yp + 2 * a }]).stroke();
            g.path([{ x: node.x - a, y: yp + a }, { x: node.x + a, y: yp + a }]).stroke();
            g.path([{ x: node.x - a, y: yp + a + config.padding },
                { x: node.x, y: yp + config.padding },
                { x: node.x + a, y: yp + a + config.padding }]).stroke();
        },
        "class": function (node, x, y, config, g) {
            g.rect(x, y, node.width, node.height).fillAndStroke();
        },
        database: function (node, x, y, config, g) {
            var cy = y - config.padding / 2;
            var pi = 3.1416;
            g.rect(x, y, node.width, node.height).fill();
            g.path([{ x: x, y: cy }, { x: x, y: cy + node.height }]).stroke();
            g.path([
                { x: x + node.width, y: cy },
                { x: x + node.width, y: cy + node.height }
            ]).stroke();
            g.ellipse({ x: node.x, y: cy }, node.width, config.padding * 1.5).fillAndStroke();
            g.ellipse({ x: node.x, y: cy + node.height }, node.width, config.padding * 1.5, 0, pi)
                .fillAndStroke();
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
        hidden: function (node, x, y, config, g) {
        },
        input: function (node, x, y, config, g) {
            g.circuit([
                { x: x + config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width - config.padding, y: y + node.height },
                { x: x, y: y + node.height }
            ]).fillAndStroke();
        },
        none: function (node, x, y, config, g) {
        },
        note: function (node, x, y, config, g) {
            g.circuit([
                { x: x, y: y },
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width, y: y + config.padding },
                { x: x + node.width, y: y + node.height },
                { x: x, y: y + node.height },
                { x: x, y: y }
            ]).fillAndStroke();
            g.path([
                { x: x + node.width - config.padding, y: y },
                { x: x + node.width - config.padding, y: y + config.padding },
                { x: x + node.width, y: y + config.padding }
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
                { x: x + w, y: y + headHeight }
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
                { x: node.x, y: y - config.padding },
                { x: x + node.width + config.padding, y: node.y },
                { x: node.x, y: y + node.height + config.padding },
                { x: x - config.padding, y: node.y }
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
                { x: x, y: y + node.height }
            ]).fillAndStroke();
        },
        start: function (node, x, y, config, g) {
            g.fillStyle(config.stroke);
            g.circle({ x: node.x, y: y + node.height / 2 }, node.height / 2.5).fill();
        },
        transceiver: function (node, x, y, config, g) {
            g.circuit([
                { x: x - config.padding, y: y },
                { x: x + node.width, y: y },
                { x: x + node.width + config.padding, y: y + node.height / 2 },
                { x: x + node.width, y: y + node.height },
                { x: x - config.padding, y: y + node.height },
                { x: x, y: y + node.height / 2 }
            ]).fillAndStroke();
        }
    };
})(nomnoml || (nomnoml = {}));
;
/* parser generated by jison 0.4.13 */
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
var parser = {trace: function trace () { },
yy: {},
symbols_: {"error":2,"root":3,"compartment":4,"EOF":5,"slot":6,"IDENT":7,"class":8,"association":9,"SEP":10,"parts":11,"|":12,"[":13,"]":14,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",7:"IDENT",10:"SEP",12:"|",13:"[",14:"]"},
productions_: [0,[3,2],[6,1],[6,1],[6,1],[4,1],[4,3],[11,1],[11,3],[11,2],[9,3],[8,3]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */
) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1] 
break;
case 2:this.$ = $$[$0].trim().replace(/\\(\[|\]|\|)/g, '$'+'1');
break;
case 3:this.$ = $$[$0];
break;
case 4:this.$ = $$[$0];
break;
case 5:this.$ = [$$[$0]];
break;
case 6:this.$ = $$[$0-2].concat($$[$0]);
break;
case 7:this.$ = [$$[$0]];
break;
case 8:this.$ = $$[$0-2].concat([$$[$0]]);
break;
case 9:this.$ = $$[$0-1].concat([[]]);
break;
case 10:
           var t = $$[$0-1].trim().replace(/\\(\[|\]|\|)/g, '$'+'1').match('^(.*?)([<:o+]*-/?-*[:o+>]*)(.*)$');
           this.$ = {assoc:t[2], start:$$[$0-2], end:$$[$0], startLabel:t[1].trim(), endLabel:t[3].trim()};
  
break;
case 11:
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
table: [{3:1,4:2,6:3,7:[1,4],8:5,9:6,13:[1,7]},{1:[3]},{5:[1,8],10:[1,9]},{5:[2,5],10:[2,5],12:[2,5],14:[2,5]},{5:[2,2],10:[2,2],12:[2,2],14:[2,2]},{5:[2,3],7:[1,10],10:[2,3],12:[2,3],14:[2,3]},{5:[2,4],10:[2,4],12:[2,4],14:[2,4]},{4:12,6:3,7:[1,4],8:5,9:6,11:11,13:[1,7]},{1:[2,1]},{6:13,7:[1,4],8:5,9:6,13:[1,7]},{8:14,13:[1,7]},{12:[1,16],14:[1,15]},{10:[1,9],12:[2,7],14:[2,7]},{5:[2,6],10:[2,6],12:[2,6],14:[2,6]},{5:[2,10],10:[2,10],12:[2,10],14:[2,10]},{5:[2,11],7:[2,11],10:[2,11],12:[2,11],14:[2,11]},{4:17,6:3,7:[1,4],8:5,9:6,12:[2,9],13:[1,7],14:[2,9]},{10:[1,9],12:[2,8],14:[2,8]}],
defaultActions: {8:[2,1]},
parseError: function parseError (str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        throw new Error(str);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    this.yy.parser = this;
    if (typeof this.lexer.yylloc == 'undefined') {
        this.lexer.yylloc = {};
    }
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    var ranges = this.lexer.options && this.lexer.options.ranges;
    if (typeof this.yy.parseError === 'function') {
        this.parseError = this.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || EOF;
        if (typeof token !== 'number') {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
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
                if (this.lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + this.lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: this.lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: this.lexer.yylineno,
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
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
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
                this.yy,
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
/* generated by jison-lex 0.2.1 */
var lexer = (function(){
var lexer = {

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input) {
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
        this.yytext = this.yytext.substr(0, this.yytext.length - len - 1);
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
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START
) {

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:return 12
break;
case 1:return 7
break;
case 2:return 13
break;
case 3:return 14
break;
case 4:return 10
break;
case 5:return 5
break;
case 6:return 'INVALID'
break;
}
},
rules: [/^(?:\s*\|\s*)/,/^(?:(\\(\[|\]|\|)|[^\]\[|;\n])+)/,/^(?:\[)/,/^(?:\s*\])/,/^(?:[ ]*(;|\n)+[ ]*)/,/^(?:$)/,/^(?:.)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6],"inclusive":true}}
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();;
  return nomnoml;
});