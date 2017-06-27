/*
    Copyright 2008 - 2011
        Matthias Ehmann,
        Michael Gerhaeuser,
        Carsten Miller,
        Bianca Valentin,
        Alfred Wassermann,
        Peter Wilfahrt

    This file is part of JSXGraph.

    JSXGraph is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    JSXGraph is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with JSXGraph.  If not, see <http://www.gnu.org/licenses/>.
*/
JXG.debug = function() {};
JXG.GeonextReader = {

    changeOriginIds: function (board, id) {
        if ((id == 'gOOe0') || (id == 'gXOe0') || (id == 'gYOe0') || (id == 'gXLe0') || (id == 'gYLe0')) {
            return board.id + id;
        } else {
            return id;
        }
    },

    /**
     * Retrieves data by TagName from an XML node.
     * @param {Node} node The Node that contains the data we want to get.
     * @param {String} tag The Name of the tag we are looking for.
     * @param {Number} [idx=0] getElementsByTagName returns an array; This parameter decides which element to use.
     * @param {Boolean} [fc=true] If True, the result will be the <tt>data</tt> of <tt>firstChild</tt> instead of the result node.
     * @returns {String} The gathered data
     */
    gEBTN: function (node, tag, idx, fc) {
        var tmp;

        if (!JXG.exists(node || !node.getElementsByTagName )/* || !JXG.exists(node.getElementsByTagName)*/) {
            return '';
        }
        // Default values for optional parameters idx and fc
        if (!JXG.exists(fc)) {
            fc = true;
        }
        idx = idx || 0;
        tmp = node.getElementsByTagName(tag);
        if (tmp.length > 0) {
            tmp = tmp[idx];
            if (fc && tmp.firstChild) {
                tmp = tmp.firstChild.data;
            }
        }
        return tmp;
    },

    /**
     * Set color properties of a geonext element.
     * Set stroke, fill, lighting, label and draft color attributes.
     * @param {Object} gxtEl element of which attributes are to set
     */
    colorProperties: function (gxtEl, Data) {
        var color = this.gEBTN(Data, 'color', 0, false),
            rgbo;

        //gxtEl.strokewidth = Data.getElementsByTagName('strokewidth')[0].firstChild.data;
        // colorStroke = strokeColor etc. is here for downwards compatibility:
        // once upon a time we used to create elements in here using the "new JXG.Element" constructor mechanism
        // then we changed to board.create + setProperty afterwords
        // now i want to use the board.create method with an appropriate attributes object to avoid setProperty calls
        // and as gxtEl happens to be somewhat like an attributes object it's  just slightly different so we adjust it
        // for downwards compatibility during the transformation of this reader we use both properties

        rgbo = JXG.rgba2rgbo(this.gEBTN(color, 'stroke'));
        gxtEl.strokeColor = rgbo[0];
        gxtEl.strokeOpacity = rgbo[1];

        rgbo = JXG.rgba2rgbo(this.gEBTN(color, 'lighting'));
        gxtEl.highlightStrokeColor = rgbo[0];
        gxtEl.highlightStrokeOpacity = rgbo[1];

        rgbo = JXG.rgba2rgbo(this.gEBTN(color, 'fill'));
        gxtEl.fillColor = rgbo[0];
        gxtEl.fillOpacity = rgbo[1];

        gxtEl.highlightFillColor = gxtEl.fillColor;
        gxtEl.highlightFillOpacity = gxtEl.fillOpacity;

        gxtEl.labelColor = JXG.rgba2rgbo(this.gEBTN(color, 'label'))[0];
        gxtEl.colorDraft = JXG.rgba2rgbo(this.gEBTN(color, 'draft'))[0];

        // GEONExT hides labels by setting opacity to 0.
        if (JXG.rgba2rgbo(this.gEBTN(color, 'label'))[1]==0) {
            gxtEl.withLabel = false;
        }
        
        // backwards compatibility
        gxtEl.colorStroke = gxtEl.strokeColor;
        gxtEl.colorFill = gxtEl.fillColor;
        gxtEl.colorLabel = gxtEl.labelColor;

        return gxtEl;
    },

    firstLevelProperties: function (gxtEl, Data) {
        if (!JXG.exists(Data) || !JXG.exists(Data.childNodes))
            return gxtEl;
        
        var arr = Data.childNodes, n, key;

        for (n = 0; n < arr.length; n++) {
            if (JXG.exists(arr[n].firstChild) && arr[n].nodeName !== 'data' && arr[n].nodeName !== 'straight') {
                key = arr[n].nodeName;
                gxtEl[key] = arr[n].firstChild.data;
            }
        }
        
        return gxtEl;
    },

    /**
     * Set the defining properties of a geonext element.
     * Writing the nodeName to ident; setting the name attribute and defining the element id.
     * @param {Object} gxtEl element of which attributes are to set
     */
    defProperties: function (gxtEl, Data) {
        // 3==TEXT_NODE, 8==COMMENT_NODE
        if (Data.nodeType==3 || Data.nodeType==8 ) {
            return null;
        }

        gxtEl.ident = Data.nodeName;
        
        if(gxtEl.ident == "text" || gxtEl.ident == "intersection" || gxtEl.ident == "composition") {
            gxtEl.name = '';
        } else {
            gxtEl.name = this.gEBTN(Data, 'name');
        }
        
        gxtEl.id = this.gEBTN(Data, 'id');

        return gxtEl;
    },

    visualProperties: function (gxtEl, Data) {
        gxtEl.visible = JXG.str2Bool(this.gEBTN(Data, 'visible'));
        gxtEl.trace = JXG.str2Bool(this.gEBTN(Data, 'trace'));
        
        return gxtEl;
    },

    transformProperties: function (gxtEl, type) {
        var facemap = [
                // 0-2
                'cross', 'cross', 'cross',
                // 3-6
                'circle', 'circle', 'circle', 'circle',
                // 7-9
                'square', 'square', 'square',
                // 10-12
                'plus', 'plus', 'plus'
            ], sizemap = [
                // 0-2
                2, 3, 4,
                // 3-6
                1, 2, 3, 4,
                // 7-9
                2, 3, 4,
                // 10-12
                2, 3, 4
            ];

        gxtEl.strokeWidth = gxtEl.strokewidth;
        gxtEl.face = facemap[parseInt(gxtEl.style, 10)] || 'cross';
        gxtEl.size = sizemap[parseInt(gxtEl.style, 10)] || 3;

        gxtEl.straightFirst = JXG.str2Bool(gxtEl.straightFirst);
        gxtEl.straightLast = JXG.str2Bool(gxtEl.straightLast);

        gxtEl.visible = JXG.str2Bool(gxtEl.visible);
        //gxtEl.withLabel = gxtEl.visible;           // withLabel is set in colorProperties()
        gxtEl.draft = JXG.str2Bool(gxtEl.draft);
        gxtEl.trace = JXG.str2Bool(gxtEl.trace);
        
        if (type==='point') {
            // Fill properties are ignored by GEONExT
            gxtEl.fillColor = gxtEl.strokeColor;
            gxtEl.highlightFillColor = gxtEl.highlightStrokeColor;
            gxtEl.fillOpacity = gxtEl.strokeOpacity;
            gxtEl.highlightFillOpacity = gxtEl.highlightStrokeOpacity;
        }

        if (typeof(gxtEl.label === 'string')) {
            delete(gxtEl.label);
        }

        delete gxtEl.color;
        return gxtEl;
    },

    readNodes: function (gxtEl, Data, nodeType, prefix) {
        var arr = this.gEBTN(Data, nodeType, 0, false).childNodes,
            key, n;

        for (n = 0; n < arr.length; n++) {
            if (arr[n].firstChild != null) {
                if (prefix != null) {
                    key = prefix + JXG.capitalize(arr[n].nodeName);
                } else {
                    key = arr[n].nodeName;
                }
                gxtEl[key] = arr[n].firstChild.data;
            }
        }
        return gxtEl;
    },

    subtreeToString: function (root) {
        try {
            // firefox
            return (new XMLSerializer()).serializeToString(root);
        } catch (e) {
            // IE
            return root.xml;
        }
    },

    readImage: function (node) {
        var pic = '',
            nod = node;

        if (nod != null) {
            pic = nod.data;
            while (nod.nextSibling != null) {
                nod = nod.nextSibling;
                pic += nod.data;
            }
        }
        return pic;
    },

    parseImage: function (board, fileNode, level, x, y, w, h, el) {
        var tag, id, im, picStr, tmpImg;

        if (fileNode == null) {
            return null;
        }

        if (fileNode.getElementsByTagName('src')[0] != null) {  // Background image
            tag = 'src';
        } else if (fileNode.getElementsByTagName('image')[0] != null) {
            tag = 'image';
        } else {
            return null;
        }

        picStr = this.readImage(this.gEBTN(fileNode, tag, 0, false).firstChild);
        if (picStr!='') {
            picStr = 'data:image/png;base64,' + picStr;
            if (tag=='src') {  // Background image
                x = this.gEBTN(fileNode, 'x');
                y = this.gEBTN(fileNode, 'y');
                w = this.gEBTN(fileNode, 'width');
                h = this.gEBTN(fileNode, 'height');
                im = board.create('image', [picStr,[x, y],[w, h]], {
                        anchor: el, layer: level
                        });
                return im;
            } else {
                // Image bound to an element
                // Read the original dimensions, i.e. the ratio h/w with the help of a temporary image.
                // We have to wait until the image is loaded, therefore
                // we need "onload".
                tmpImg = new Image();
                tmpImg.src = picStr;
                id = el.id + '_image';
                tmpImg.onload = function(){
                    // Now, we can read the original dimensions of the image.
                    var wOrg = this.width,
                        hOrg = this.height,
                        xf, yf, wf, hf, im, tRot;
                        
                    if (el.elementClass == JXG.OBJECT_CLASS_LINE) {
                        // A line containing an image, runs through the horizontal middle
                        // of the image.
                        xf = function(){ return el.point1.X(); };
                        wf = function(){ return el.point1.Dist(el.point2); };
                        hf = function(){ return wf() * hOrg / wOrg; };
                        yf = function(){ return el.point1.Y() - hf() * 0.5; };
                        im = board.create('image', [picStr, [xf,yf], [wf,hf]], {
                                layer: level,
                                id: id,
                                anchor: el
                            });
                        tRot = board.create('transform', [
                                function () {
                                    return Math.atan2(el.point2.Y()-el.point1.Y(), el.point2.X()-el.point1.X())
                                },
                                el.point1
                            ], {
                                type:'rotate'
                            });
                        tRot.bindTo(im);
                        el.image = im;
                    } else if (el.elementClass == JXG.OBJECT_CLASS_POINT) {
                        wf = function(){ return wOrg / board.unitX; };
                        hf = function(){ return hOrg / board.unitY; };
                        xf = function(){ return el.X() - wf() * 0.5; };
                        yf = function(){ return el.Y() - hf() * 0.5; };

                        im = board.create('image', [picStr, [xf,yf], [wf,hf]], {
                                layer: level,
                                id: id,
                                anchor: el
                            });
                        board.renderer.hide(el.label.content);
                        el.image = im;
                    } else if (el.elementClass == JXG.OBJECT_CLASS_CIRCLE) {
                        // A circle containing an image
                        wf = function(){ return 2.0 * el.Radius(); };
                        hf = function(){ return wf() * hOrg / wOrg; };
                        xf = function(){ return el.center.X() - wf() * 0.5; };
                        yf = function(){ return el.center.Y() - hf() * 0.5; };
                        im = board.create('image', [picStr, [xf,yf], [wf,hf]], {
                            layer: level,
                            id: id,
                            anchor: el
                        });
                        el.image = im;
                    } else {
                        im = board.create('image', [picStr, [x, y], [w, h]], {
                            layer: level,
                            id: id,
                            anchor: el
                        });
                        el.image = im;
                    }
                };
            }
            return im;
        }
    },

    readConditions: function(node) {
        var i, s, ob,
            conditions = '';

        if (JXG.exists(node)) {
            for(i = 0; i < node.getElementsByTagName('data').length; i++) {
                ob = node.getElementsByTagName('data')[i];
                s = this.subtreeToString(ob);
                conditions += s;
            }
        }

        return conditions;
    },

    printDebugMessage: function(outputEl,gxtEl,nodetyp,success) {
        JXG.debug("* " + success + ":  " + nodetyp + " " + gxtEl.name + " " + gxtEl.id + "<br>\n");
    },

    /**
     * Reading the elements of a geonext file
     * @param {XMLTree} tree expects the content of the parsed geonext file returned by function parseFF/parseIE
     * @param {Object} board board object
     */
    readGeonext: function(tree, board) {
        var xmlNode, elChildNodes,
            s, Data, inter, boardData, el, p,
            conditions, tmp, strTrue = 'true', gxtReader = this;

        // maybe this is not necessary as we already provide layer options for sectors and circles via JXG.Options but
        // maybe these have to be the same for geonext.
        board.options.layer.sector = board.options.layer.angle;
        board.options.layer.circle = board.options.layer.angle;

        boardData = this.gEBTN(tree, 'board', 0, false);
        conditions = this.readConditions(boardData.getElementsByTagName('conditions')[0]);

        // set the origin
        xmlNode = this.gEBTN(boardData, 'coordinates', 0, false);
        tmp = this.gEBTN(xmlNode, 'origin', 0, false);
        board.origin = {
            usrCoords: [1, 0, 0],
            scrCoords: [1, parseFloat(this.gEBTN(tmp, 'x')), parseFloat(this.gEBTN(tmp, 'y'))]
        };

        // zoom level
        tmp = this.gEBTN(xmlNode, 'zoom', 0, false);
        board.zoomX = parseFloat(this.gEBTN(tmp, 'x'));
        board.zoomY = parseFloat(this.gEBTN(tmp, 'y'));

        // screen to user coordinates conversion
        tmp = this.gEBTN(xmlNode, 'unit', 0, false);
        board.unitX = parseFloat(this.gEBTN(tmp, 'x'));
        board.unitY = parseFloat(this.gEBTN(tmp, 'y'));

        // resize board
        if (board.options.takeSizeFromFile) {
            board.resizeContainer(this.gEBTN(boardData, 'width'), this.gEBTN(boardData, 'height'));
        }

        // check and set fontSize
        if (!(parseFloat(board.options.text.fontSize) > 0)) {
            board.options.text.fontSize = 12;
        }

        board.geonextCompatibilityMode = true;

        // jsxgraph chooses an id for the board but we don't want to use it, we want to use
        // the id stored in the geonext file. if you know why this is required, please note it here.
        delete(JXG.JSXGraph.boards[board.id]);
        board.id = this.gEBTN(boardData, 'id');
        JXG.JSXGraph.boards[board.id] = board;

        // this creates some basic elements present in every geonext construction but not explicitly present in the file
        board.initGeonextBoard();
        
        // Update of properties during update() is not necessary in GEONExT files
        // But it maybe necessary if we construct with JavaScript afterwards
        board.renderer.enhancedRendering = true;

        // Read background image
        this.parseImage(board, this.gEBTN(boardData, 'file', 0, false), board.options.layer['image']);

        board.options.point.snapToGrid = (this.gEBTN(this.gEBTN(boardData, 'coordinates', 0, false), 'snap') == strTrue);
        //
        // TODO: Missing jsxgraph feature snapToPoint
        // If snapToGrid and snapToPoint are both true, point snapping is enabled
        if (board.options.point.snapToGrid && this.gEBTN(this.gEBTN(boardData, 'grid', 1, false), 'pointsnap') == strTrue) {
            board.options.point.snapToGrid = false;
        }
        //board.options.grid.snapToGrid = false;

        xmlNode = this.gEBTN(boardData, 'grid', 1, false);
        tmp = this.gEBTN(xmlNode,  'x');
        if (tmp) {
            board.options.grid.gridX = 1 / parseFloat(tmp);
            board.options.point.snapSizeX = parseFloat(tmp);
        }
        tmp = this.gEBTN(xmlNode,  'y');
        if (tmp) {
            board.options.grid.gridY = 1 / parseFloat(tmp);
            board.options.point.snapSizeY = parseFloat(tmp);
        }
        //board.calculateSnapSizes();             // Seems not to be correct
        board.options.grid.gridDash = JXG.str2Bool(this.gEBTN(xmlNode, 'dash'));

        tmp = JXG.rgba2rgbo(this.gEBTN(xmlNode, 'color'));
        board.options.grid.gridColor = tmp[0];
        board.options.grid.gridOpacity = tmp[1];

        xmlNode = this.gEBTN(boardData, 'coordinates', 0, false);
        if (this.gEBTN(xmlNode, 'grid') == strTrue) {
            board.create('grid', []);
        }

        if (this.gEBTN(xmlNode, 'coord') == strTrue) {
            board.options.axis.ticks.majorHeight = 10;        // Hard coded default option
            board.options.axis.ticks.minorHeight = 4;         // Hard coded default option
            board.create('axis', [[0, 0], [1, 0]]);
            board.create('axis', [[0, 0], [0, 1]]);
        }

        board.containerObj.style.backgroundColor = JXG.rgba2rgbo(this.gEBTN(this.gEBTN(boardData, 'background', 0, false), 'color'))[0];

        elChildNodes = tree.getElementsByTagName("elements")[0].childNodes;
        for (s = 0; s < elChildNodes.length; s++) {
            (function (s) {
                var i, gxtEl = {},
                    l, x, y, c, numberDefEls,
                    el, p, inter, rgbo, tmp;

                Data = elChildNodes[s];
                gxtEl = gxtReader.defProperties(gxtEl, Data);

                // Skip text nodes
                if (!JXG.exists(gxtEl)) {
                    return;
                }

                gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName.toLowerCase, 'READ:');
                switch (Data.nodeName.toLowerCase()) {
                    case "point":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl.fixed = JXG.str2Bool(gxtReader.gEBTN(Data, 'fix'));
                        gxtEl = gxtReader.transformProperties(gxtEl, 'point');

                        //try {
                            p = board.create('point', [parseFloat(gxtEl.x), parseFloat(gxtEl.y)], gxtEl);

                            var v = function(){ return p.visProp.visible; };
                            el = gxtReader.parseImage(board, Data, board.options.layer['image'], 0, 0, 0, 0, p);
                            gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        /*
                        if (JXG.exists(el)) {
                            el.visProp.visible = function() { return p.visProp.visible; };
                            alert(p.visProp.visible);
                            if (el.visProp.visible()) {el.showElement();} else {el.hideElement();}
                        }
                        */
                        //} catch(e) {
                        //    JXG.debug(e);
                        //}
                        break;
                    case "line":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'straight', 'straight');
                        gxtEl = gxtReader.transformProperties(gxtEl);

                        gxtEl.first = gxtReader.changeOriginIds(board, gxtEl.first);
                        gxtEl.last = gxtReader.changeOriginIds(board, gxtEl.last);

                        l = board.create('line', [gxtEl.first, gxtEl.last], gxtEl);

                        gxtReader.parseImage(board, Data, board.options.layer['image'], 0, 0, 0, 0, l);
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "circle":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);

                        tmp = gxtReader.gEBTN(Data, 'data', 0, false);
                        gxtEl.center = gxtReader.changeOriginIds(board, gxtReader.gEBTN(tmp, 'midpoint'));

                        if (tmp.getElementsByTagName('radius').length > 0) {
                            gxtEl.radius = gxtReader.changeOriginIds(board, gxtReader.gEBTN(tmp, 'radius'));
                        } else if (tmp.getElementsByTagName('radiusvalue').length > 0) {
                            gxtEl.radius = gxtReader.gEBTN(tmp, 'radiusvalue');
                        }
                        gxtEl = gxtReader.transformProperties(gxtEl);
                        c = board.create('circle', [gxtEl.center, gxtEl.radius], gxtEl);

                        gxtReader.parseImage(board, Data, board.options.layer['image'], 0, 0, 0, 0, c);
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "slider":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);

                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl.fixed = JXG.str2Bool(gxtReader.gEBTN(Data, 'fix'));
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'animate', 'animate');
                        gxtEl = gxtReader.transformProperties(gxtEl, 'point');
                        try {
                            gxtEl.parent = gxtReader.changeOriginIds(board, gxtEl.parent);

                            // if (board.isSuspendedUpdate) { board.unsuspendUpdate().suspendUpdate(); }
                            p = board.create('glider', [parseFloat(gxtEl.x), parseFloat(gxtEl.y), gxtEl.parent], gxtEl);
                            p.onPolygon = JXG.exists(gxtEl.onpolygon) && JXG.str2Bool(gxtEl.onpolygon);
                            
                            gxtReader.parseImage(board, Data, board.options.layer['point'], 0, 0, 0, 0, p);
                            
                            //if (board.isSuspendedUpdate) { board.unsuspendUpdate().suspendUpdate(); }
                            
                            gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        } catch(e) {
                            JXG.debug("* <b>Err:</b>  Slider " + gxtEl.name + " " + gxtEl.id + ': '+ gxtEl.parent +"<br>\n");
                        }
                        break;
                    case "cas":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl.fixed = JXG.str2Bool(Data.getElementsByTagName('fix')[0].firstChild.data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl = gxtReader.transformProperties(gxtEl, 'point');

						if (false) { // Handle weird element names
							gxtEl.x = JXG.GeonextParser.gxt2jc(gxtEl.x, board);
							gxtEl.y = JXG.GeonextParser.gxt2jc(gxtEl.y, board);
						} else {  // Workaround until the jessiecode compiler is 100% compatible
							gxtEl.x = JXG.GeonextParser.geonext2JS(gxtEl.x, board);
							gxtEl.x = new Function('return ' + gxtEl.x + ';');
							gxtEl.y = JXG.GeonextParser.geonext2JS(gxtEl.y, board);
							gxtEl.y = new Function('return ' + gxtEl.y + ';');
						}

                        /*
                        p = board.create('point', [parseFloat(gxtEl.xval), parseFloat(gxtEl.yval)], gxtEl);
                        p.addConstraint([gxtEl.x, gxtEl.y]);
                        p.type = JXG.OBJECT_TYPE_CAS;
                        */
                        p = board.create('point', [gxtEl.x, gxtEl.y], gxtEl);
                        gxtReader.parseImage(board, Data, board.options.layer['point'], 0, 0, 0, 0, p);
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "intersection":
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        xmlNode = Data.getElementsByTagName('first')[1];

                        gxtEl.outFirst = {};
                        gxtEl.outFirst = gxtReader.colorProperties(gxtEl.outFirst, xmlNode);
                        gxtEl.outFirst = gxtReader.visualProperties(gxtEl.outFirst, xmlNode);
                        gxtEl.outFirst = gxtReader.firstLevelProperties(gxtEl.outFirst, xmlNode); 
                        gxtEl.outFirst.fixed = JXG.str2Bool(xmlNode.getElementsByTagName('fix')[0].firstChild.data);
                        gxtEl.outFirst = gxtReader.transformProperties(gxtEl.outFirst, 'point');
                        gxtEl.first = gxtReader.changeOriginIds(board, gxtEl.first);
                        gxtEl.last = gxtReader.changeOriginIds(board, gxtEl.last);

                        //if ((board.objects[gxtEl.first].type == JXG.OBJECT_TYPE_LINE || board.objects[gxtEl.first].type == JXG.OBJECT_TYPE_ARROW)
                        // && (board.objects[gxtEl.last].type == JXG.OBJECT_TYPE_LINE || board.objects[gxtEl.last].type == JXG.OBJECT_TYPE_ARROW)) {
                        if ((JXG.getReference(board, gxtEl.first).elementClass == JXG.OBJECT_CLASS_LINE)
                         && (JXG.getReference(board, gxtEl.last).elementClass == JXG.OBJECT_CLASS_LINE)) {
                            /*
                            inter = new JXG.Intersection(board, gxtEl.id, board.objects[gxtEl.first],
                                    board.objects[gxtEl.last], gxtEl.outFirst.id, '',
                                    gxtEl.outFirst.name, '');
                            inter.p.setProperty(gxtEl.outFirst);
                            */
                            inter = board.create('intersection', [board.objects[gxtEl.first], board.objects[gxtEl.last], 0], gxtEl.outFirst);
                            /* offensichtlich braucht man dieses if doch */
                            if (gxtEl.outFirst.visible == "false") {
                                inter.hideElement();
                            }
                        } else {
                            xmlNode = Data.getElementsByTagName('last')[1];
                            if (JXG.exists(xmlNode)) {
                                gxtEl.outLast = {};
                                gxtEl.outLast = gxtReader.colorProperties(gxtEl.outLast, xmlNode);
                                gxtEl.outLast = gxtReader.visualProperties(gxtEl.outLast, xmlNode);
                                gxtEl.outLast = gxtReader.firstLevelProperties(gxtEl.outLast, xmlNode);
                                gxtEl.outLast.fixed = JXG.str2Bool(xmlNode.getElementsByTagName('fix')[0].firstChild.data);
                                gxtEl.outLast = gxtReader.transformProperties(gxtEl.outLast, 'point');
                            /*
                                inter = new JXG.Intersection(board, gxtEl.id, board.objects[gxtEl.first],
                                    board.objects[gxtEl.last], gxtEl.outFirst.id, gxtEl.outLast.id,
                                    gxtEl.outFirst.name, gxtEl.outLast.name);
                                inter.p1.setProperty(gxtEl.outFirst);
                                inter.p2.setProperty(gxtEl.outLast);
                            */
                                inter = board.create('intersection', [board.objects[gxtEl.first], board.objects[gxtEl.last], 0], gxtEl.outFirst);
                                inter = board.create('intersection', [board.objects[gxtEl.first], board.objects[gxtEl.last], 1], gxtEl.outLast);
                            }
                        }
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "composition":
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl.defEl = [];
                        numberDefEls = 0;
                        xmlNode = Data.getElementsByTagName('data')[0].getElementsByTagName('input');
                        for (i = 0; i < xmlNode.length; i++) {
                            gxtEl.defEl[i] = xmlNode[i].firstChild.data;
                            numberDefEls = i + 1;
                        }

                        // every composition produces at least one element and the data for this element is stored
                        // in gxtEl.out. if additional elements are created their data is read in the according case.
                        xmlNode = Data.getElementsByTagName('output')[0];
                        gxtEl.out = {};
                        gxtEl.out = gxtReader.colorProperties(gxtEl.out, xmlNode);
                        gxtEl.out = gxtReader.visualProperties(gxtEl.out, xmlNode);
                        gxtEl.out = gxtReader.firstLevelProperties(gxtEl.out, xmlNode);
                        gxtEl.out = gxtReader.transformProperties(gxtEl.out);

                        gxtEl.defEl[0] = gxtReader.changeOriginIds(board, gxtEl.defEl[0]);
                        gxtEl.defEl[1] = gxtReader.changeOriginIds(board, gxtEl.defEl[1]);
                        gxtEl.defEl[2] = gxtReader.changeOriginIds(board, gxtEl.defEl[2]);

                        // if (board.isSuspendedUpdate) { board.unsuspendUpdate().suspendUpdate(); }
                        switch (gxtEl.type) {
                            // ARROW_PARALLEL
                            case "210070":
                                gxtEl.out.fixed = gxtReader.gEBTN(xmlNode, 'fix');

                                xmlNode = Data.getElementsByTagName('output')[1];
                                gxtEl.outPoint = {};
                                gxtEl.outPoint = gxtReader.defProperties(gxtEl.outPoint, xmlNode);
                                gxtEl.outPoint = gxtReader.colorProperties(gxtEl.outPoint, xmlNode);
                                gxtEl.outPoint = gxtReader.visualProperties(gxtEl.outPoint, xmlNode);
                                gxtEl.outPoint = gxtReader.firstLevelProperties(gxtEl.outPoint, xmlNode);
                                gxtEl.outPoint = gxtReader.transformProperties(gxtEl.outPoint);
                                gxtEl.out.point = gxtEl.outPoint;

                                board.create('arrowparallel', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                break;

                            // BISECTOR
                            case "210080":
                                gxtEl.out.straightFirst = false;
                                board.create('bisector', [gxtEl.defEl[0], gxtEl.defEl[1], gxtEl.defEl[2]], gxtEl.out);
                                break;

                            // CIRCUMCIRCLE
                            case "210090":
                                xmlNode = Data.getElementsByTagName('output')[1];
                                gxtEl.outCircle = {};
                                gxtEl.outCircle = gxtReader.defProperties(gxtEl.outCircle, xmlNode);
                                gxtEl.outCircle = gxtReader.colorProperties(gxtEl.outCircle, xmlNode);
                                gxtEl.outCircle = gxtReader.visualProperties(gxtEl.outCircle, xmlNode);
                                gxtEl.outCircle = gxtReader.firstLevelProperties(gxtEl.outCircle, xmlNode);
                                gxtEl.outCircle = gxtReader.transformProperties(gxtEl.outCircle);
                                gxtEl.outCircle.point = gxtEl.out;
                                board.create('circumcircle', [gxtEl.defEl[0], gxtEl.defEl[1], gxtEl.defEl[2]], gxtEl.outCircle);
                                break;

                            // CIRCUMCIRCLE_CENTER
                            case "210100":
                                board.create('circumcenter', [gxtEl.defEl[0], gxtEl.defEl[1], gxtEl.defEl[2]], gxtEl.out);
                                break;

                            // MIDPOINT
                            case "210110":
                                board.create('midpoint', gxtEl.defEl.slice(0, numberDefEls), gxtEl.out);
                                break;

                             // MIRRORLINE
                            case "210120":
                                board.create('reflection', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                break;

                            // MIRROR_POINT
                            case "210125":
                                board.create('mirrorpoint', [gxtEl.defEl[0], gxtEl.defEl[1]], gxtEl.out);
                                break;

                            // NORMAL
                            case "210130":
                                board.create('normal', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                break;

                            // PARALLEL
                            case "210140":
                                p =  board.create('parallelpoint', [gxtEl.defEl[1], gxtEl.defEl[0]], 
                                        {withLabel:false, visible:false, name:'', fixed:true});
                                el = board.create('parallel', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                el.parallelpoint = p;
                                break;

                            // PARALLELOGRAM_POINT
                            case "210150":
                                board.create('parallelpoint', gxtEl.defEl.slice(0, numberDefEls), gxtEl.out);
                                break;

                            // PERPENDICULAR
                            case "210160":
                                // output[0] was already read and is stored in gxtEl.out
                                gxtEl.out.fixed = gxtReader.gEBTN(xmlNode, 'fix');

                                xmlNode = Data.getElementsByTagName('output')[1];
                                gxtEl.outLine = {};
                                gxtEl.outLine = gxtReader.defProperties(gxtEl.outLine, xmlNode);
                                gxtEl.outLine = gxtReader.colorProperties(gxtEl.outLine, xmlNode);
                                gxtEl.outLine = gxtReader.visualProperties(gxtEl.outLine, xmlNode);
                                gxtEl.outLine = gxtReader.firstLevelProperties(gxtEl.outLine, xmlNode);
                                gxtEl.outLine = gxtReader.readNodes(gxtEl.outLine, xmlNode, 'straight', 'straight');
                                gxtEl.outLine = gxtReader.transformProperties(gxtEl.outLine);
                                gxtEl.outLine.point = gxtEl.out;

                                board.create('perpendicularsegment', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.outLine);
                                break;

                            // PERPENDICULAR_POINT
                            case "210170":
                                board.create('perpendicularpoint', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                break;

                            // ROTATION
                            case "210180":
                                throw new Error('JSXGraph: Element ROTATION not yet implemented.');
                                break;

                            // SECTOR
                            case "210190":
                                // sectors usually provide more than one output element but JSXGraph is not fully compatible
                                // to GEONExT sector elements. GEONExT sectors consist of two lines, a point, and a sector,
                                // JSXGraph uses a curve to display the sector incl. the borders, and
                                // a point and two lines. 
                                // Gliders on sectors also run through the borders.
                                gxtEl.out = gxtReader.defProperties(gxtEl.out, xmlNode);
                                gxtEl.out.firstArrow = JXG.str2Bool(gxtReader.gEBTN(xmlNode, 'firstarrow'));
                                gxtEl.out.lastArrow = JXG.str2Bool(gxtReader.gEBTN(xmlNode, 'lastarrow'));

                                // el = board.create('sector', gxtEl.defEl, gxtEl.out);
                                for (i=0; i<4;i++) {
                                    xmlNode = Data.getElementsByTagName('output')[i];
                                    gxtEl.out = gxtReader.defProperties(gxtEl.out, xmlNode);
                                    gxtEl.out = gxtReader.colorProperties(gxtEl.out, xmlNode);
                                    gxtEl.out = gxtReader.visualProperties(gxtEl.out, xmlNode);
                                    gxtEl.out = gxtReader.firstLevelProperties(gxtEl.out, xmlNode);
                                    gxtEl.out = gxtReader.transformProperties(gxtEl.out);
                                    
                                    if (i==0) {
                                        el = board.create('sector', gxtEl.defEl, gxtEl.out);
                                    } else if (i==1) {
                                        p = board.create('point', [
                                            function(){ 
                                                var p1 = JXG.getRef(board,gxtEl.defEl[1]), p2 = JXG.getRef(board,gxtEl.defEl[2]);
                                                return p1.X() + (p2.X()-p1.X())*el.Radius/p1.Dist(p2);
                                            },
                                            function(){ 
                                                var p1 = JXG.getRef(board,gxtEl.defEl[1]), p2 = JXG.getRef(board,gxtEl.defEl[2]);
                                                return p1.Y() + (p2.Y()-p1.Y())*el.Radius/p1.Dist(p2);
                                            }], gxtEl.out);
                                        //p = JXG.getReference(board,gxtEl.defEl[2]);
                                    } else if (i==2) {
                                        el = board.create('segment', [gxtEl.defEl[1], gxtEl.defEl[0]], gxtEl.out);
                                    } else if (i==3) {
                                        el = board.create('segment', [gxtEl.defEl[1], p], gxtEl.out);
                                    }
                                }
                                break;
                            default:
                                throw new Error("JSXGraph: GEONExT-Element " + gxtEl.type + ' not implemented.');
                                break;
                        }

                        // if (board.isSuspendedUpdate) { board.unsuspendUpdate().suspendUpdate(); }
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "polygon":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        var dataVertex = [];
                        // In Geonext file format the first vertex is equal to the last vertex:
                        for (i = 0; i < Data.getElementsByTagName('data')[0].getElementsByTagName('vertex').length-1; i++) {
                            dataVertex[i] = Data.getElementsByTagName('data')[0].getElementsByTagName('vertex')[i].firstChild.data;
                            dataVertex[i] = gxtReader.changeOriginIds(board, dataVertex[i]);
                        }
                        gxtEl.border = [];
                        gxtEl.borders = {
                            ids: []
                        };
                        for (i = 0; i < Data.getElementsByTagName('border').length; i++) {
                            gxtEl.border[i] = {};
                            xmlNode = Data.getElementsByTagName('border')[i];
                            gxtEl.border[i].id = xmlNode.getElementsByTagName('id')[0].firstChild.data;
                            gxtEl.borders.ids.push(gxtEl.border[i].id);
                            gxtEl.border[i].name = xmlNode.getElementsByTagName('name')[0].firstChild.data;
                            gxtEl.border[i].straightFirst = JXG.str2Bool(xmlNode.getElementsByTagName('straight')[0].getElementsByTagName('first')[0].firstChild.data);
                            gxtEl.border[i].straightLast = JXG.str2Bool(xmlNode.getElementsByTagName('straight')[0].getElementsByTagName('last')[0].firstChild.data);
                            gxtEl.border[i].strokeWidth = xmlNode.getElementsByTagName('strokewidth')[0].firstChild.data;
                            gxtEl.border[i].dash = JXG.str2Bool(xmlNode.getElementsByTagName('dash')[0].firstChild.data);
                            gxtEl.border[i].visible = JXG.str2Bool(xmlNode.getElementsByTagName('visible')[0].firstChild.data);
                            gxtEl.border[i].draft = JXG.str2Bool(xmlNode.getElementsByTagName('draft')[0].firstChild.data);
                            gxtEl.border[i].trace = JXG.str2Bool(xmlNode.getElementsByTagName('trace')[0].firstChild.data);

                            xmlNode = Data.getElementsByTagName('border')[i].getElementsByTagName('color')[0];
                            rgbo = JXG.rgba2rgbo(xmlNode.getElementsByTagName('stroke')[0].firstChild.data);
                            gxtEl.border[i].strokeColor = rgbo[0];
                            gxtEl.border[i].strokeOpacity = rgbo[1];

                            rgbo = JXG.rgba2rgbo(xmlNode.getElementsByTagName('lighting')[0].firstChild.data);
                            gxtEl.border[i].highlightStrokeColor = rgbo[0];
                            gxtEl.border[i].highlightStrokeOpacity = rgbo[1];

                            rgbo = JXG.rgba2rgbo(xmlNode.getElementsByTagName('fill')[0].firstChild.data);
                            gxtEl.border[i].fillColor = rgbo[0];
                            gxtEl.border[i].fillOpacity = rgbo[1];

                            gxtEl.border[i].highlightFillColor = gxtEl.border[i].fillColor;
                            gxtEl.border[i].highlightFillOpacity = gxtEl.border[i].fillOpacity;

                            gxtEl.border[i].labelColor = xmlNode.getElementsByTagName('label')[0].firstChild.data;
                            gxtEl.border[i].colorDraft = xmlNode.getElementsByTagName('draft')[0].firstChild.data;
                        }
                        gxtEl = gxtReader.transformProperties(gxtEl);
                        p = board.create('polygon', dataVertex, gxtEl);

                        // to emulate the geonext behaviour on invisible polygons
                        // A.W.: Why do we need this?
/*                        
                        if (!gxtEl.visible) {
                            p.setProperty({
                                fillColor: 'none',
                                highlightFillColor: 'none'
                            });
                        }
*/
                        for (i = 0; i < p.borders.length; i++) {
                            p.borders[i].setProperty(gxtEl.border[i]);
                        }
                            
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "graph":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl.funct = Data.getElementsByTagName('data')[0].getElementsByTagName('function')[0].firstChild.data;
						if (false) {
							gxtEl.funct = JXG.GeonextParser.gxt2jc(gxtEl.funct, board); // Handle weird element names
						} else { // Workaround until the jessiecode compiler is 100% compatible
							gxtEl.funct = JXG.GeonextParser.geonext2JS(gxtEl.funct, board);
							gxtEl.funct = new Function('x', 'return ' + gxtEl.funct + ';');
						}
						
                        c = board.create('curve', ['x', gxtEl.funct], {
                                id: gxtEl.id,
                                name: gxtEl.name,
                                strokeColor: gxtEl.strokeColor,
                                strokeWidth: gxtEl.strokeWidth,
                                fillColor: 'none',
                                highlightFillColor: 'none',
                                highlightStrokeColor: gxtEl.highlightStrokeColor,
                                visible: JXG.str2Bool(gxtEl.visible)
                            });

                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "arrow":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'straight', 'straight');

                        gxtEl = gxtReader.transformProperties(gxtEl);
                        gxtEl.first = gxtReader.changeOriginIds(board, gxtEl.first);
                        gxtEl.last = gxtReader.changeOriginIds(board, gxtEl.last);

                        l = board.create('arrow', [gxtEl.first, gxtEl.last], gxtEl);

                        gxtReader.printDebugMessage('debug', l, Data.nodeName, 'OK');
                        break;
                    case "arc":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');

                        gxtEl.firstArrow = JXG.str2Bool(Data.getElementsByTagName('lastarrow')[0].firstChild.data);   // It seems that JSXGraph and GEONExT
                        gxtEl.lastArrow = JXG.str2Bool(Data.getElementsByTagName('firstarrow')[0].firstChild.data);   // use opposite directions.

                        gxtEl = gxtReader.transformProperties(gxtEl);

                        gxtEl.center = gxtReader.changeOriginIds(board, gxtEl.midpoint);
                        gxtEl.angle = gxtReader.changeOriginIds(board, gxtEl.angle);
                        gxtEl.radius = gxtReader.changeOriginIds(board, gxtEl.radius);

                        c = board.create('arc', [gxtEl.center, gxtEl.radius, gxtEl.angle], gxtEl);

                        gxtReader.printDebugMessage('debug', c, Data.nodeName, 'OK');
                        break;
                    case "angle":
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl = gxtReader.transformProperties(gxtEl);

                        tmp = gxtEl.name;
                        try {
                            gxtEl.name = Data.getElementsByTagName('text')[0].firstChild.data;
                        } catch (e) {
                            gxtEl.name = '';
                        }
                        c = board.create('angle', [gxtEl.first, gxtEl.middle, gxtEl.last], gxtEl);
                        c.setProperty({name:tmp});

                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case "text":
                        if (gxtEl.id.match(/oldVersion/)) {
                            break;
                        }
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);

                        gxtEl = gxtReader.readNodes(gxtEl, Data, 'data');
                        gxtEl.mpStr = gxtReader.subtreeToString(Data.getElementsByTagName('data')[0].getElementsByTagName('mp')[0]);
                        gxtEl.mpStr = gxtEl.mpStr.replace(/<\/?mp>/g, '');
						gxtEl.fixed = false;
                        try {
                            if (Data.getElementsByTagName('data')[0].getElementsByTagName('parent')[0].firstChild) {
                                gxtEl.parent = Data.getElementsByTagName('data')[0].getElementsByTagName('parent')[0].firstChild.data;
								gxtEl.fixed = true;
                            }
                        } catch (e) {
                        }
                        
                        gxtEl.condition = Data.getElementsByTagName('condition')[0].firstChild.data;
                        gxtEl.content = Data.getElementsByTagName('content')[0].firstChild.data;
                        gxtEl.fix = Data.getElementsByTagName('fix')[0].firstChild.data;
                        // not used: gxtEl.digits = Data.getElementsByTagName('cs')[0].firstChild.data;
                        gxtEl.autodigits = Data.getElementsByTagName('digits')[0].firstChild.data;
                        gxtEl.parent = gxtReader.changeOriginIds(board, gxtEl.parent);
                        
                        c = board.create('text', [gxtEl.x, gxtEl.y, gxtEl.mpStr], {
                                anchor: gxtEl.parent,
                                id: gxtEl.id,
                                name: gxtEl.name,
                                digits: gxtEl.autodigits,
                                isLabel: false,
                                strokeColor: gxtEl.colorLabel,
								fixed: gxtEl.fixed,
                                visible: JXG.str2Bool(gxtEl.visible)
                            });
                        break;
                    case 'parametercurve':
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.visualProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl = gxtReader.transformProperties(gxtEl);                        
                        gxtEl.functionx = Data.getElementsByTagName('functionx')[0].firstChild.data;
                        gxtEl.functiony = Data.getElementsByTagName('functiony')[0].firstChild.data;
                        gxtEl.min = Data.getElementsByTagName('min')[0].firstChild.data;
                        gxtEl.max = Data.getElementsByTagName('max')[0].firstChild.data;
						/*
						gxtEl.functionx = JXG.GeonextParser.gxt2jc(gxtEl.functionx, board);
						gxtEl.functiony = JXG.GeonextParser.gxt2jc(gxtEl.functiony, board);
						gxtEl.min = JXG.GeonextParser.gxt2jc(gxtEl.min, board);
						gxtEl.max = JXG.GeonextParser.gxt2jc(gxtEl.max, board);
						*/
                        gxtEl.fillColor = 'none';
                        gxtEl.highlightFillColor = 'none';
                        
                        board.create('curve', 
                                    [ new Function('t', 'return ' + JXG.GeonextParser.geonext2JS(gxtEl.functionx, board) + ';' ),
                                      new Function('t', 'return ' + JXG.GeonextParser.geonext2JS(gxtEl.functiony, board) + ';' ),
                                      new Function('return ' + JXG.GeonextParser.geonext2JS(gxtEl.min, board) + ';' ),
                                      new Function('return ' + JXG.GeonextParser.geonext2JS(gxtEl.max, board) + ';' )
                                    ], gxtEl); 
                        /*
                        c = new JXG.Curve(board, [
                            't',gxtEl.functionx,gxtEl.functiony,gxtEl.min,gxtEl.max
                        ], gxtEl.id, gxtEl.name);
                        c.setProperty('strokeColor:' + gxtEl.colorStroke, 'strokeWidth:' + gxtEl.strokewidth, 'fillColor:none',
                                'highlightStrokeColor:' + gxtEl.highlightStrokeColor);
                        */
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case 'tracecurve':
                        gxtEl.tracepoint = Data.getElementsByTagName('tracepoint')[0].firstChild.data;
                        gxtEl.traceslider = Data.getElementsByTagName('traceslider')[0].firstChild.data;
                        board.create('tracecurve', [gxtEl.traceslider, gxtEl.tracepoint], gxtEl);
                        // JXG.getRef(board, gxtEl.tracepoint).setProperty({trace:true});
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    case 'group':
                        gxtEl = gxtReader.colorProperties(gxtEl, Data);
                        gxtEl = gxtReader.firstLevelProperties(gxtEl, Data);
                        gxtEl.members = [
                        ];
                        for (i = 0; i < Data.getElementsByTagName('data')[0].getElementsByTagName('member').length; i++) {
                            gxtEl.members[i] = Data.getElementsByTagName('data')[0].getElementsByTagName('member')[i].firstChild.data;
                            gxtEl.members[i] = gxtReader.changeOriginIds(board, gxtEl.members[i]);
                        }
                        c = new JXG.Group(board, gxtEl.id, gxtEl.name, gxtEl.members);
                        gxtReader.printDebugMessage('debug', gxtEl, Data.nodeName, 'OK');
                        break;
                    default:
                        JXG.debug("* <b>Err:</b> " + Data.nodeName + " not yet implemented <br>\n");
                }
                delete(gxtEl);
            })(s);
        }
        board.addConditions(conditions);
    },

    decodeString: function(str) {
        var unz;
        if (str.indexOf("<GEONEXT>")<0){
            unz = (new JXG.Util.Unzip(JXG.Util.Base64.decodeAsArray(str))).unzip(); // war Gunzip ME
            if (unz=="")
                return str;
            else
                return unz;
        } else {
            return str;
        }
    },

    prepareString: function(fileStr){
        try {
            if (fileStr.indexOf('GEONEXT')<0) {
                fileStr = (this.decodeString(fileStr))[0][0];  // Base64 decoding
            }
            // Hacks to enable not well formed XML. Will be redone in Algebra.geonext2JS and Board.addConditions
            fileStr = this.fixXML(fileStr);
        } catch(e) {
            fileStr = '';
        }
        return fileStr;
    },

    fixXML: function(str) {
        var arr = ["active", "angle", "animate", "animated", "arc", "area", "arrow", "author", "autodigits", "axis", "back", "background", "board", "border", "bottom", "buttonsize", "cas", "circle", "color", "comment", "composition", "condition", "conditions", "content", "continuous", "control", "coord", "coordinates", "cross", "cs", "dash", "data", "description", "digits", "direction", "draft", "editable", "elements", "event", "file", "fill", "first", "firstarrow", "fix", "fontsize", "free", "full", "function", "functionx", "functiony", "GEONEXT", "graph", "grid", "group", "height", "id", "image", "info", "information", "input", "intersection", "item", "jsf", "label", "last", "lastarrow", "left", "lefttoolbar", "lighting", "line", "loop", "max", "maximized", "member", "middle", "midpoint", "min", "modifier", "modus", "mp", "mpx", "multi", "name", "onpolygon", "order", "origin", "output", "overline", "parametercurve", "parent", "point", "pointsnap", "polygon", "position", "radius", "radiusnum", "radiusvalue", "right", "section", "selectedlefttoolbar", "showconstruction", "showcoord", "showinfo", "showunit", "showx", "showy", "size", "slider", "snap", "speed", "src", "start", "stop", "straight", "stroke", "strokewidth", "style", "term", "text", "top", "trace", "tracecurve", "tracepoint", "traceslider", "type", "unit", "value", "VERSION", "vertex", "viewport", "visible", "width", "wot", "x", "xooy", "xval", "y", "yval", "zoom"],
                list = arr.join('|'),
                regex = '\&lt;(/?('+list+'))\&gt;',
                expr = new RegExp(regex,'g');

        // First, we convert all < to &lt; and > to &gt;
        str = JXG.escapeHTML(str);
        // Second, we convert all GEONExT tags of the form &lt;tag&gt; back to <tag>
        str = str.replace(expr,'<$1>');

        str = str.replace(/(<content>.*)<arc>(.*<\/content>)/g,'$1&lt;arc&gt;$2');
        str = str.replace(/(<mp>.*)<arc>(.*<\/mpx>)/g,'$1&lt;arc&gt;$2');
        str = str.replace(/(<mpx>.*)<arc>(.*<\/mpx>)/g,'$1&lt;arc&gt;$2');
        return str;
    }

}; // end: GeonextReader
