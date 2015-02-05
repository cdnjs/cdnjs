/**
 * orb v1.0.5, Pivot grid javascript library.
 *
 * Copyright (c) 2014 Najmeddine Nouri <devnajm@gmail.com>.
 *
 * @version v1.0.5
 * @link http://nnajm.github.io/orb/
 * @license MIT
 */

'use strict';
! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var f;
        "undefined" != typeof window ? f = window : "undefined" != typeof global ? f = global : "undefined" != typeof self && (f = self), f.orb = e()
    }
}(function() {
    var define, module, exports;
    return (function e(t, n, r) {
        function s(o, u) {
            if (!n[o]) {
                if (!t[o]) {
                    var a = typeof require == "function" && require;
                    if (!u && a) return a(o, !0);
                    if (i) return i(o, !0);
                    var f = new Error("Cannot find module '" + o + "'");
                    throw f.code = "MODULE_NOT_FOUND", f
                }
                var l = n[o] = {
                    exports: {}
                };
                t[o][0].call(l.exports, function(e) {
                    var n = t[o][1][e];
                    return s(n ? n : e)
                }, l, l.exports, e, t, n, r)
            }
            return n[o].exports
        }
        var i = typeof require == "function" && require;
        for (var o = 0; o < r.length; o++) s(r[o]);
        return s
    })({
        1: [function(_dereq_, module, exports) {

            module.exports.utils = _dereq_('./orb.utils');
            module.exports.pgrid = _dereq_('./orb.pgrid');
            module.exports.pgridwidget = _dereq_('./orb.ui.pgridwidget');

        }, {
            "./orb.pgrid": 7,
            "./orb.ui.pgridwidget": 12,
            "./orb.utils": 14
        }],
        2: [function(_dereq_, module, exports) {

        }, {}],
        3: [function(_dereq_, module, exports) {

            module.exports = {
                count: function(datafield, intersection, datasource) {
                    return intersection === 'all' ? datasource.length : intersection.length;
                },
                sum: function(datafield, intersection, datasource) {
                    var sum = 0;
                    forEachIntersection(datafield, intersection, datasource, function(val) {
                        sum += val;
                    });
                    return sum;
                },
                min: function(datafield, intersection, datasource) {
                    var min = null;
                    forEachIntersection(datafield, intersection, datasource, function(val) {
                        if (min == null || val < min) {
                            min = val;
                        }
                    });
                    return min;
                },
                max: function(datafield, intersection, datasource) {
                    var max = null;
                    forEachIntersection(datafield, intersection, datasource, function(val) {
                        if (max == null || val > max) {
                            max = val;
                        }
                    });
                    return max;
                },
                avg: function(datafield, intersection, datasource) {
                    var avg = 0;
                    var len = (intersection === 'all' ? datasource : intersection).length;
                    if (len > 0) {
                        forEachIntersection(datafield, intersection, datasource, function(val) {
                            avg += val;
                        });
                        avg /= len;
                    }
                    return avg;
                },
                prod: function(datafield, intersection, datasource) {
                    var prod;
                    var len = (intersection === 'all' ? datasource : intersection).length;
                    if (len > 0) {
                        prod = 1;
                        forEachIntersection(datafield, intersection, datasource, function(val) {
                            prod *= val;
                        });
                    }
                    return prod;
                },
                stdev: function(datafield, intersection, datasource) {
                    return Math.sqrt(calcVariance(datafield, intersection, datasource, false));
                },
                stdevp: function(datafield, intersection, datasource) {
                    return Math.sqrt(calcVariance(datafield, intersection, datasource, true));
                },
                var: function(datafield, intersection, datasource) {
                    return calcVariance(datafield, intersection, datasource, false);
                },
                varp: function(datafield, intersection, datasource) {
                    return calcVariance(datafield, intersection, datasource, true);
                }
            };

            function calcVariance(datafield, intersection, datasource, population) {
                var variance = 0;
                var avg = 0;
                var len = (intersection === 'all' ? datasource : intersection).length;
                if (len > 0) {
                    if (population || len > 1) {
                        forEachIntersection(datafield, intersection, datasource, function(val) {
                            avg += val;
                        });
                        avg /= len;
                        forEachIntersection(datafield, intersection, datasource, function(val) {
                            variance += (val - avg) * (val - avg);
                        });
                        variance = variance / (population ? len : len - 1);
                    } else {
                        variance = NaN;
                    }
                }
                return variance;
            }

            function forEachIntersection(datafield, intersection, datasource, callback) {
                var all = intersection === 'all';
                intersection = all ? datasource : intersection;
                if (intersection.length > 0) {
                    for (var i = 0; i < intersection.length; i++) {
                        callback((all ? intersection[i] : datasource[intersection[i]])[datafield]);
                    }
                }
            }

        }, {}],
        4: [function(_dereq_, module, exports) {

            var utils = _dereq_('./orb.utils');
            var dimension = _dereq_('./orb.dimension');

            var AxeType = {
                COLUMNS: 1,
                ROWS: 2,
                DATA: 3
            };

            module.exports = function(pgrid, type) {

                var self = this;
                var dimid = 0;

                if (pgrid != null && pgrid.config != null) {


                    this.pgrid = pgrid;


                    this.type = type;


                    this.fields = (function() {
                        switch (type) {
                            case AxeType.COLUMNS:
                                return self.pgrid.config.columnFields;
                            case AxeType.ROWS:
                                return self.pgrid.config.rowFields;
                            case AxeType.DATA:
                                return self.pgrid.config.dataFields;
                            default:
                                return [];
                        }
                    }());


                    this.dimensionsCount = null;


                    this.root = null;


                    this.dimensionsByDepth = null;

                    this.update = function() {
                        self.dimensionsCount = self.fields.length;
                        self.root = new dimension(++dimid, null, null, null, self.dimensionsCount + 1, true);

                        self.dimensionsByDepth = {};
                        for (var depth = 1; depth <= self.dimensionsCount; depth++) {
                            self.dimensionsByDepth[depth] = [];
                        }

                        // fill data
                        fill();

                        // initial sort
                        for (var findex = 0; findex < self.fields.length; findex++) {
                            var ffield = self.fields[findex];
                            if (ffield.sort.order === 'asc' || ffield.sort.order === 'desc') {
                                self.sort(ffield, true);
                            }
                        }
                    };

                    this.sort = function(field, donottoggle) {
                        if (field != null) {
                            if (donottoggle !== true) {
                                if (field.sort.order !== 'asc') {
                                    field.sort.order = 'asc';
                                } else {
                                    field.sort.order = 'desc';
                                }
                            }

                            var depth = self.dimensionsCount - getfieldindex(field);
                            var parents = depth === self.dimensionsCount ? [self.root] : self.dimensionsByDepth[depth + 1];
                            for (var i = 0; i < parents.length; i++) {
                                parents[i].values.sort();
                                if (field.sort.order === 'desc') {
                                    parents[i].values.reverse();
                                }
                            }
                        }
                    };

                    this.update();
                }

                function getfieldindex(field) {
                    for (var i = 0; i < self.fields.length; i++) {
                        if (self.fields[i].name === field.name) {
                            return i;
                        }
                    }
                    return -1;
                }


                function fill() {

                    if (self.pgrid.config.dataSource != null && self.dimensionsCount > 0) {

                        var datasource = self.pgrid.config.dataSource;
                        if (datasource != null && utils.isArray(datasource) && datasource.length > 0) {
                            for (var rowIndex = 0, dataLength = datasource.length; rowIndex < dataLength; rowIndex++) {
                                var row = datasource[rowIndex];
                                var dim = self.root;
                                for (var findex = 0; findex < self.dimensionsCount; findex++) {
                                    var depth = self.dimensionsCount - findex;
                                    var subfield = self.fields[findex];
                                    var subvalue = row[subfield.name];
                                    var subdimvals = dim.subdimvals;

                                    if (subdimvals[subvalue] !== undefined) {
                                        dim = subdimvals[subvalue];
                                    } else {
                                        dim.values.push(subvalue);
                                        dim = new dimension(++dimid, dim, subvalue, subfield, depth, false, findex == self.dimensionsCount - 1);
                                        subdimvals[subvalue] = dim;
                                        dim.rowIndexes = [];
                                        self.dimensionsByDepth[depth].push(dim);
                                    }

                                    dim.rowIndexes.push(rowIndex);
                                }
                            }
                        }
                    }
                }
            };

            module.exports.Type = AxeType;

        }, {
            "./orb.dimension": 6,
            "./orb.utils": 14
        }],
        5: [function(_dereq_, module, exports) {

            var utils = _dereq_('./orb.utils');
            var axe = _dereq_('./orb.axe');
            var aggregation = _dereq_('./orb.aggregation');

            function getpropertyvalue(property, configs, defaultvalue) {
                for (var i = 0; i < configs.length; i++) {
                    if (configs[i][property] != null) {
                        return configs[i][property];
                    }
                }
                return defaultvalue;
            }

            function mergefieldconfigs() {

                var configs = [];
                var sorts = [];
                var subtotals = [];
                var filters = [];
                var functions = [];

                for (var i = 0; i < arguments.length; i++) {
                    var nnconfig = arguments[i] || {};
                    configs.push(nnconfig);
                    sorts.push(nnconfig.sort || {});
                    subtotals.push(nnconfig.subTotal || {});
                    filters.push(nnconfig.filter || {});
                    functions.push({
                        aggregateFunc: i === 0 ? nnconfig.aggregateFunc : (nnconfig.aggregateFunc ? nnconfig.aggregateFunc() : null),
                        formatFunc: i === 0 ? nnconfig.formatFunc : (nnconfig.formatFunc ? nnconfig.formatFunc() : null),
                    });
                }

                return new Field({
                    name: getpropertyvalue('name', configs, ''),

                    caption: getpropertyvalue('caption', configs, ''),
                    filter: {
                        type: getpropertyvalue('type', filters, 'operator'),
                        regexp: getpropertyvalue('regexp', filters, null),
                        operator: getpropertyvalue('operator', filters, null),
                        value: getpropertyvalue('value', filters, null)
                    },

                    sort: {
                        order: getpropertyvalue('order', sorts, null),
                        customfunc: getpropertyvalue('customfunc', sorts, null)
                    },
                    subTotal: {
                        visible: getpropertyvalue('visible', subtotals, true),
                        collapsible: getpropertyvalue('collapsible', subtotals, true),
                        collapsed: getpropertyvalue('collapsed', subtotals, false)
                    },

                    aggregateFunc: getpropertyvalue('aggregateFunc', functions, null),
                    formatFunc: getpropertyvalue('formatFunc', functions, null)
                }, false);
            }

            function createfield(rootconfig, axetype, fieldconfig, defaultfieldconfig) {

                var axeconfig;

                if (defaultfieldconfig) {
                    switch (axetype) {
                        case axe.Type.ROWS:
                            axeconfig = defaultfieldconfig.rowSettings;
                            break;
                        case axe.Type.COLUMNS:
                            axeconfig = defaultfieldconfig.columnSettings;
                            break;
                        case axe.Type.DATA:
                            axeconfig = defaultfieldconfig.dataSettings;
                            break;
                        default:
                            axeconfig = null;
                            break;
                    }
                } else {
                    axeconfig = null;
                }

                return mergefieldconfigs(fieldconfig, axeconfig, defaultfieldconfig, rootconfig);
            }

            function GrandTotalConfig(options) {

                options = options || {};

                this.rowsvisible = options.rowsvisible !== undefined ? options.rowsvisible : true;
                this.columnsvisible = options.columnsvisible !== undefined ? options.columnsvisible : true;
            }

            function SubTotalConfig(options, setdefaults) {

                var defaults = {
                    visible: setdefaults === true ? true : undefined,
                    collapsible: setdefaults === true ? true : undefined,
                    collapsed: setdefaults === true ? false : undefined
                };
                options = options || {};

                this.visible = options.visible !== undefined ? options.visible : defaults.visible;
                this.collapsible = options.collapsible !== undefined ? options.collapsible : defaults.collapsible;
                this.collapsed = options.collapsed !== undefined ? options.collapsed : defaults.collapsed;
            }

            function SortConfig(options) {
                options = options || {};

                this.order = options.order;
                this.customfunc = options.customfunc;
            }

            function FilterConfig(options) {
                options = options || {};

                this.type = options.type;
                this.regexp = options.regexp;
                this.operator = options.operator;
                this.value = options.value;
            }

            var Field = module.exports.field = function(options, createSubOptions) {

                options = options || {};

                // field name
                this.name = options.name;

                // shared settings
                this.caption = options.caption || this.name;
                this.filter = new FilterConfig(options.filter);

                // rows & columns settings
                this.sort = new SortConfig(options.sort);
                this.subTotal = new SubTotalConfig(options.subTotal);

                // data settings
                var _aggregatefunc;
                var _formatfunc;

                function defaultFormatFunc(val) {
                    return val ? val.toString() : '';
                }

                this.aggregateFunc = function(func) {
                    if (func) {
                        if (typeof func === 'string' && aggregation[func]) {
                            _aggregatefunc = aggregation[func];
                        } else if (typeof func === 'function') {
                            _aggregatefunc = func;
                        } else {
                            _aggregatefunc = aggregation.sum;
                        }
                    } else {
                        return _aggregatefunc;
                    }
                };

                this.formatFunc = function(func) {
                    if (func) {
                        _formatfunc = func;
                    } else {
                        return _formatfunc;
                    }
                };

                this.aggregateFunc(options.aggregateFunc || 'sum');
                this.formatFunc(options.formatFunc || defaultFormatFunc);

                if (createSubOptions !== false) {
                    (this.rowSettings = new Field(options.rowSettings, false)).name = this.name;
                    (this.columnSettings = new Field(options.columnSettings, false)).name = this.name;
                    (this.dataSettings = new Field(options.dataSettings, false)).name = this.name;
                }
            };

            module.exports.config = function(config) {

                var self = this;

                this.dataSource = config.dataSource;
                this.dataHeadersLocation = config.dataHeadersLocation === 'columns' ? 'columns' : 'rows';
                this.grandTotal = new GrandTotalConfig(config.grandTotal);
                this.subTotal = new SubTotalConfig(config.subTotal, true);

                // datasource field names
                this.dataSourceFieldNames = null;
                // datasource field captions
                this.dataSourceFieldCaptions = null;

                var firstRow = this.dataSource[0];
                if (this.dataSource && (firstRow = this.dataSource[0])) {
                    if (utils.isArray(firstRow)) {
                        this.dataSourceFieldNames = [];
                        for (var ci = 0; ci < firstRow.length; ci++) {
                            this.dataSourceFieldNames.push(ci + '');
                        }
                    } else if (typeof firstRow === 'object') {
                        this.dataSourceFieldNames = utils.ownProperties(firstRow);
                    } else {
                        this.dataSourceFieldNames = [];
                    }

                    this.dataSourceFieldCaptions = new Array(this.dataSourceFieldNames.length);
                }

                this.allFields = (config.fields || []).map(function(fieldconfig) {
                    var f = new Field(fieldconfig);
                    var fnameIndex;
                    if (self.dataSourceFieldCaptions && (fnameIndex = self.dataSourceFieldNames.indexOf(f.name)) >= 0) {
                        self.dataSourceFieldCaptions[fnameIndex] = f.caption;
                    }
                    return f;
                });

                function ensureFieldConfig(obj) {
                    if (typeof obj === 'string') {
                        var fcaptionIndex = self.dataSourceFieldCaptions.indexOf(obj);
                        var fname = fcaptionIndex >= 0 ? self.dataSourceFieldNames[fcaptionIndex] : obj;
                        return {
                            name: fname
                        };
                    }
                    return obj;
                }

                this.rowFields = (config.rows || []).map(function(fieldconfig) {
                    fieldconfig = ensureFieldConfig(fieldconfig);
                    return createfield(self, axe.Type.ROWS, fieldconfig, getfield(self.allFields, fieldconfig.name));
                });

                this.columnFields = (config.columns || []).map(function(fieldconfig) {
                    fieldconfig = ensureFieldConfig(fieldconfig);
                    return createfield(self, axe.Type.COLUMNS, fieldconfig, getfield(self.allFields, fieldconfig.name));
                });

                this.dataFields = (config.data || []).map(function(fieldconfig) {
                    fieldconfig = ensureFieldConfig(fieldconfig);
                    return createfield(self, axe.Type.DATA, fieldconfig, getfield(self.allFields, fieldconfig.name));
                });

                this.dataFieldsCount = this.dataFields ? (this.dataFields.length || 1) : 1;

                function getfield(axefields, fieldname) {
                    var fieldindex = getfieldindex(axefields, fieldname);
                    if (fieldindex > -1) {
                        return axefields[fieldindex];
                    }
                    return null;
                }

                function getfieldindex(axefields, fieldname) {
                    for (var fi = 0; fi < axefields.length; fi++) {
                        if (axefields[fi].name === fieldname) {
                            return fi;
                        }
                    }
                    return -1;
                }

                self.availablefields = function() {
                    return self.allFields.filter(function(field) {
                        var notequalfield = function(otherfield) {
                            return field.name !== otherfield.name;
                        };

                        return self.dataFields.every(notequalfield) &&
                            self.rowFields.every(notequalfield) &&
                            self.columnFields.every(notequalfield);
                    });
                };

                this.moveField = function(fieldname, oldaxetype, newaxetype, position) {

                    var oldaxe, oldposition;
                    var newaxe;
                    var field = getfield(self.allFields, fieldname);

                    if (field) {

                        switch (oldaxetype) {
                            case axe.Type.ROWS:
                                oldaxe = self.rowFields;
                                break;
                            case axe.Type.COLUMNS:
                                oldaxe = self.columnFields;
                                break;
                            case axe.Type.DATA:
                                oldaxe = self.dataFields;
                                break;
                            default:
                                break;
                        }

                        switch (newaxetype) {
                            case axe.Type.ROWS:
                                newaxe = self.rowFields;
                                break;
                            case axe.Type.COLUMNS:
                                newaxe = self.columnFields;
                                break;
                            case axe.Type.DATA:
                                newaxe = self.dataFields;
                                break;
                            default:
                                break;
                        }

                        if (oldaxe || newaxe) {

                            if (oldaxe) {
                                oldposition = getfieldindex(oldaxe, fieldname);
                                if (oldaxetype === newaxetype) {
                                    if (oldposition == oldaxe.length - 1 &&
                                        position == null ||
                                        oldposition === position - 1) {
                                        return false;
                                    }
                                }
                                oldaxe.splice(oldposition, 1);
                            }

                            field = createfield(self, newaxetype, null, field);

                            if (newaxe) {
                                if (position != null) {
                                    newaxe.splice(position, 0, field);
                                } else {
                                    newaxe.push(field);
                                }
                            }

                            // update data fields count
                            self.dataFieldsCount = self.dataFields ? (self.dataFields.length || 1) : 1;

                            return true;
                        }
                    }
                };
            };

        }, {
            "./orb.aggregation": 3,
            "./orb.axe": 4,
            "./orb.utils": 14
        }],
        6: [function(_dereq_, module, exports) {

            module.exports = function(id, parent, value, field, depth, isRoot, isLeaf) {

                var self = this;

                this.id = id;

                this.parent = parent;

                this.value = value;

                this.isRoot = isRoot;

                this.isLeaf = isLeaf;

                this.field = field;

                this.depth = depth;

                this.values = [];

                this.subdimvals = {};

                this.rowIndexes = null;

                this.getRowIndexes = function(result) {
                    if (self.rowIndexes == null) {
                        this.rowIndexes = [];
                        for (var i = 0; i < self.values.length; i++) {
                            self.subdimvals[self.values[i]].getRowIndexes(this.rowIndexes);
                        }
                    }
                    if (result != null) {
                        for (var j = 0; j < self.rowIndexes.length; j++) {
                            result.push(self.rowIndexes[j]);
                        }
                        return result;
                    } else {
                        return self.rowIndexes;
                    }
                };
            };

        }, {}],
        7: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var configuration = _dereq_('./orb.config').config;
            var query = _dereq_('./orb.query');

            module.exports = function(config) {

                var defaultfield = {
                    name: '#undefined#'
                };

                var self = this;
                var _iCache;

                this.config = new configuration(config);

                this.rows = new axe(self, axe.Type.ROWS);
                this.columns = new axe(self, axe.Type.COLUMNS);
                this.dataMatrix = {};

                this.moveField = function(fieldname, oldaxetype, newaxetype, position) {
                    if (self.config.moveField(fieldname, oldaxetype, newaxetype, position)) {
                        self.rows.update();
                        self.columns.update();
                        buildData();
                    }
                };

                this.getData = function(datafield, rowdim, coldim) {

                    if (rowdim && coldim) {
                        datafield = datafield || (self.config.dataFields[0] || defaultfield).name;

                        if (self.dataMatrix[rowdim.id] && self.dataMatrix[rowdim.id][coldim.id]) {
                            return self.dataMatrix[rowdim.id][coldim.id][datafield] || null;
                        }
                        return null;
                    }
                };

                this.query = query(self);

                buildData();

                function calcCellData(rowIndexes, colIndexes, origRowIndexes) {

                    var res = {};

                    if (self.config.dataFieldsCount > 0) {

                        var intersection;

                        if (rowIndexes == null) {
                            intersection = colIndexes;
                        } else if (colIndexes == null) {
                            intersection = rowIndexes;
                        } else {
                            intersection = [];
                            for (var ri = 0; ri < rowIndexes.length; ri++) {
                                var rowindex = rowIndexes[ri];
                                if (rowindex >= 0) {
                                    var colrowindex = colIndexes.indexOf(rowindex);
                                    if (colrowindex >= 0) {
                                        rowIndexes[ri] = 0 - (rowindex + 2);
                                        intersection.push(rowindex);
                                    }
                                }
                            }
                        }

                        var datasource = self.config.dataSource;

                        for (var datafieldIndex = 0; datafieldIndex < self.config.dataFieldsCount; datafieldIndex++) {
                            var datafield = self.config.dataFields[datafieldIndex] || defaultfield;
                            if (datafield.aggregateFunc) {
                                res[datafield.name] = datafield.aggregateFunc()(datafield.name, intersection || 'all', datasource, origRowIndexes, colIndexes);
                            }
                        }
                    }

                    return res;
                }

                function calcRowData(rowDim) {

                    if (rowDim) {
                        var data = {};
                        var rid = 'r' + rowDim.id;

                        // set cached row indexes for current row dimension
                        if (_iCache[rid] === undefined) {
                            _iCache[rid] = rowDim.isRoot ? null : (_iCache[rowDim.parent.id] || rowDim.getRowIndexes());
                        }

                        // calc grand-total cell
                        data[self.columns.root.id] = calcCellData(rowDim.isRoot ? null : _iCache[rid].slice(0), null);

                        if (self.columns.dimensionsCount > 0) {
                            var p = 0;
                            var parents = [self.columns.root];

                            while (p < parents.length) {
                                var parent = parents[p];
                                var rowindexes = rowDim.isRoot ?
                                    null :
                                    (parent.isRoot ?
                                        _iCache[rid].slice(0) :
                                        _iCache['c' + parent.id].slice(0));

                                for (var i = 0; i < parent.values.length; i++) {
                                    var subdim = parent.subdimvals[parent.values[i]];
                                    var cid = 'c' + subdim.id;

                                    // set cached row indexes for this column leaf dimension
                                    if (_iCache[cid] === undefined) {
                                        _iCache[cid] = _iCache[cid] || subdim.getRowIndexes().slice(0);
                                    }

                                    data[subdim.id] = calcCellData(rowindexes, _iCache[cid], rowDim.isRoot ? null : rowDim.getRowIndexes());

                                    if (!subdim.isLeaf) {
                                        parents.push(subdim);
                                        if (rowindexes) {
                                            _iCache[cid] = [];
                                            for (var ur = 0; ur < rowindexes.length; ur++) {
                                                var vr = rowindexes[ur];
                                                if (vr != -1 && vr < 0) {
                                                    _iCache[cid].push(0 - (vr + 2));
                                                    rowindexes[ur] = -1;
                                                }
                                            }
                                        }
                                    }
                                }
                                _iCache['c' + parent.id] = undefined;
                                p++;
                            }
                        }

                        return data;
                    }
                }

                function buildData() {
                    self.dataMatrix = {};
                    _iCache = {};

                    // calc grand total row
                    self.dataMatrix[self.rows.root.id] = calcRowData(self.rows.root);

                    if (self.rows.dimensionsCount > 0) {
                        var parents = [self.rows.root];
                        var p = 0;
                        var parent;
                        while (p < parents.length) {
                            parent = parents[p];
                            // calc children rows
                            for (var i = 0; i < parent.values.length; i++) {
                                var subdim = parent.subdimvals[parent.values[i]];
                                // calc child row
                                self.dataMatrix[subdim.id] = calcRowData(subdim);
                                // if row is not a leaf, add it to parents array to process its children
                                if (!subdim.isLeaf) {
                                    parents.push(subdim);
                                }
                            }
                            // next parent
                            p++;
                        }
                    }
                }
            };

        }, {
            "./orb.axe": 4,
            "./orb.config": 5,
            "./orb.query": 8
        }],
        8: [function(_dereq_, module, exports) {

            ////var utils = require('./orb.utils');
            var axe = _dereq_('./orb.axe');

            module.exports = function(pgrid) {

                return function(parameters) {

                    var query = {};
                    var filters = {};
                    var captionNameDict = {};

                    var rowfields = pgrid.config.rowFields;
                    var colfields = pgrid.config.columnFields;
                    var datafields = pgrid.config.dataFields;

                    for (var i = 0; i < rowfields.length; i++) {
                        var rfield = rowfields[i];
                        var rfieldFilter = pushFilter(
                            axe.Type.ROWS,
                            rfield.name,
                            rowfields.length - i
                        );
                        query[rfield.name] = rfieldFilter;
                        if (rfield.caption && rfield.name !== rfield.caption) {
                            query[rfield.caption] = rfieldFilter;
                            captionNameDict[rfield.caption] = rfield.name;
                        }
                    }

                    for (var j = 0; j < colfields.length; j++) {
                        var cfield = colfields[j];
                        var cfieldFilter = pushFilter(
                            axe.Type.COLUMNS,
                            cfield.name,
                            colfields.length - j
                        );

                        query[colfields[j].name] = cfieldFilter;
                        if (cfield.caption && cfield.name !== cfield.caption) {
                            query[cfield.caption] = cfieldFilter;
                            captionNameDict[cfield.caption] = cfield.name;
                        }
                    }

                    for (var k = 0; k < datafields.length; k++) {
                        var dfield = datafields[k];
                        query[dfield.name] = getMeasure(dfield.name);
                        query[dfield.name].flat = getMeasure(dfield.name, true);
                        if (dfield.caption && dfield.name !== dfield.caption) {
                            query[dfield.caption] = query[dfield.name];
                            query[dfield.caption].flat = query[dfield.name].flat;
                            captionNameDict[dfield.caption] = dfield.name;
                        }
                    }

                    query.data = getMeasure();
                    query.data.flat = getMeasure(undefined, true);

                    if (parameters) {
                        for (var param in parameters) {
                            if (parameters.hasOwnProperty(param)) {
                                query[param](parameters[param]);
                            }
                        }
                    }

                    return query;

                    function pushFilter(axetype, fieldname, fielddepth) {
                        return function(val) {
                            var f = {
                                name: fieldname,
                                val: val,
                                depth: fielddepth
                            };
                            (filters[axetype] = filters[axetype] || []).push(f);
                            return query;
                        }
                    }

                    function applyFilter(axetype) {
                        if (filters[axetype]) {
                            var rarr = filters[axetype].sort(function(f1, f2) {
                                return f2.depth - f1.depth;
                            });

                            var rfi = 0;
                            var dims = null;
                            while (rfi < rarr.length) {
                                dims = pgrid[axetype === axe.Type.ROWS ? 'rows' : 'columns'].dimensionsByDepth[rarr[rfi].depth].filter(function(d) {
                                    return d.value === rarr[rfi].val && (rfi === 0 || dims.some(function(dd) {
                                        var parent = d.parent;
                                        var dp = d.depth + 1;
                                        while (dp < dd.depth) {
                                            parent = parent.parent;
                                            dp++;
                                        }
                                        return parent === dd;
                                    }));
                                });

                                rfi++;
                            }
                            return dims;
                        }
                        return null;
                    }

                    function getFieldName(name) {
                        return captionNameDict[name] ? captionNameDict[name] : name;
                    }

                    function getMeasure(datafieldname, flat) {
                        datafieldname = getFieldName(datafieldname);

                        return function() {
                            var rowdims = applyFilter(axe.Type.ROWS) || [pgrid.rows.root];
                            var coldims = applyFilter(axe.Type.COLUMNS) || [pgrid.columns.root];
                            var res = [];
                            for (var rdi = 0; rdi < rowdims.length; rdi++) {
                                for (var cdi = 0; cdi < coldims.length; cdi++) {
                                    var rowdim = rowdims[rdi];
                                    var coldim = coldims[cdi];
                                    var resv;

                                    if (flat !== true) {
                                        resv = {};
                                        if (!rowdim.isRoot) {
                                            resv[rowdim.field.name] = rowdim.value;
                                        }
                                        if (!coldim.isRoot) {
                                            resv[coldim.field.name] = coldim.value;
                                        }

                                        if (arguments.length == 0) {
                                            resv[datafieldname || 'data'] = pgrid.getData(datafieldname, rowdim, coldim);
                                        } else {
                                            var datares = {};
                                            for (var ai = 0; ai < arguments.length; ai++) {
                                                datares[arguments[ai]] = pgrid.getData(getFieldName(arguments[ai]), rowdim, coldim);
                                            }
                                            resv.data = datares;
                                        }
                                    } else {
                                        resv = [];
                                        if (arguments.length == 0) {
                                            resv.push(pgrid.getData(datafieldname, rowdim, coldim));
                                        } else {
                                            for (var ai = 0; ai < arguments.length; ai++) {
                                                resv.push(pgrid.getData(getFieldName(arguments[ai]), rowdim, coldim));
                                            }
                                        }
                                    }
                                    res.push(resv);
                                }
                            }
                            return res;
                        }
                    }
                };
            };

        }, {
            "./orb.axe": 4
        }],
        9: [function(_dereq_, module, exports) {

            module.exports = function() {
                var states = {};

                this.set = function(key, state) {
                    states[key] = state;
                };

                this.get = function(key) {
                    return states[key];
                };
            };
        }, {}],
        10: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var uiheaders = _dereq_('./orb.ui.header');

            module.exports = function(columnsAxe) {

                var self = this;


                this.axe = columnsAxe;


                this.uiInfos = null;

                this.leafsHeaders = null;

                var _multidatafields;
                var _datafieldscount;

                this.build = function() {

                    _datafieldscount = self.axe.pgrid.config.dataHeadersLocation === 'columns' ? self.axe.pgrid.config.dataFieldsCount : 1;
                    _multidatafields = self.axe.pgrid.config.dataHeadersLocation === 'columns' && _datafieldscount > 1;

                    self.uiInfos = [];

                    if (self.axe != null) {
                        // Fill columns layout infos
                        for (var depth = self.axe.root.depth; depth > 1; depth--) {
                            self.uiInfos.push([]);
                            getUiInfo(depth, self.uiInfos);
                        }

                        if (self.axe.pgrid.config.grandTotal.columnsvisible) {
                            // add grandtotal header
                            (self.uiInfos[0] = self.uiInfos[0] || []).push(new uiheaders.header(axe.Type.COLUMNS, uiheaders.HeaderType.GRAND_TOTAL, self.axe.root, null, _datafieldscount));
                        }

                        if (self.uiInfos.length === 0) {
                            self.uiInfos.push([new uiheaders.header(axe.Type.COLUMNS, uiheaders.HeaderType.INNER, self.axe.root, null, _datafieldscount)]);
                        }

                        // generate leafs headers
                        generateLeafsHeaders();
                    }
                };

                function generateLeafsHeaders() {

                    var leafsHeaders = [];

                    function pushsubtotal(pheader) {
                        if (pheader && pheader.dim.field.subTotal.visible) {
                            leafsHeaders.push(pheader.subtotalHeader);
                        }
                    }

                    if (self.uiInfos.length > 0) {
                        // last headers row
                        var infos = self.uiInfos[self.uiInfos.length - 1];
                        var header = infos[0];

                        var currparent,
                            prevpar = header.parent;

                        for (var i = 0; i < infos.length; i++) {
                            header = infos[i];
                            currparent = header.parent;
                            // if current header parent is different than previous header parent,
                            // add previous parent
                            if (currparent != prevpar) {
                                pushsubtotal(prevpar);
                                if (currparent != null) {
                                    // walk up parent hierarchy and add grand parents if different 
                                    // than current header grand parents
                                    var grandpar = currparent.parent;
                                    var prevgrandpar = prevpar ? prevpar.parent : null;
                                    while (grandpar != prevgrandpar && prevgrandpar != null) {
                                        pushsubtotal(prevgrandpar);
                                        grandpar = grandpar ? grandpar.parent : null;
                                        prevgrandpar = prevgrandpar ? prevgrandpar.parent : null;
                                    }
                                }
                                // update previous parent variable
                                prevpar = currparent;
                            }
                            // push current header
                            leafsHeaders.push(infos[i]);

                            // if it's the last header, add all of its parents up to the top
                            if (i === infos.length - 1) {
                                while (prevpar != null) {
                                    pushsubtotal(prevpar);
                                    prevpar = prevpar.parent;
                                }
                            }
                        }
                        // grandtotal is visible for columns and if there is more than one dimension in this axe
                        if (self.axe.pgrid.config.grandTotal.columnsvisible && self.axe.dimensionsCount > 1) {
                            // push also grand total header
                            leafsHeaders.push(self.uiInfos[0][self.uiInfos[0].length - 1]);
                        }
                    }

                    // add data headers if more than 1 data field and they willbe the leaf headers
                    if (_multidatafields) {
                        self.leafsHeaders = [];
                        for (var leafIndex = 0; leafIndex < leafsHeaders.length; leafIndex++) {
                            for (var datafieldindex = 0; datafieldindex < _datafieldscount; datafieldindex++) {
                                self.leafsHeaders.push(new uiheaders.dataHeader(self.axe.pgrid.config.dataFields[datafieldindex], leafsHeaders[leafIndex]));
                            }
                        }
                        self.uiInfos.push(self.leafsHeaders);
                    } else {
                        self.leafsHeaders = leafsHeaders;
                    }
                }

                this.build();


                function getUiInfo(depth, uiInfos) {

                    var infos = uiInfos[uiInfos.length - 1];
                    var parents = self.axe.root.depth === depth ? [null] :
                        uiInfos[self.axe.root.depth - depth - 1].filter(function(p) {
                            return p.type !== uiheaders.HeaderType.SUB_TOTAL;
                        });

                    for (var pi = 0; pi < parents.length; pi++) {

                        var parent = parents[pi];
                        var parentDim = parent == null ? self.axe.root : parent.dim;

                        for (var di = 0; di < parentDim.values.length; di++) {

                            var subvalue = parentDim.values[di];
                            var subdim = parentDim.subdimvals[subvalue];

                            var subtotalHeader;
                            if (!subdim.isLeaf && subdim.field.subTotal.visible) {
                                subtotalHeader = new uiheaders.header(axe.Type.COLUMNS, uiheaders.HeaderType.SUB_TOTAL, subdim, parent, _datafieldscount);
                            } else {
                                subtotalHeader = null;
                            }

                            var header = new uiheaders.header(axe.Type.COLUMNS, null, subdim, parent, _datafieldscount, subtotalHeader);
                            infos.push(header);

                            if (!subdim.isLeaf && subdim.field.subTotal.visible) {
                                infos.push(subtotalHeader);
                            }
                        }
                    }
                }
            };

        }, {
            "./orb.axe": 4,
            "./orb.ui.header": 11
        }],
        11: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var state = new(_dereq_('./orb.state'));

            var HeaderType = module.exports.HeaderType = {
                EMPTY: 1,
                DATA_HEADER: 2,
                DATA_VALUE: 3,
                FIELD_BUTTON: 4,
                INNER: 5,
                WRAPPER: 6,
                SUB_TOTAL: 7,
                GRAND_TOTAL: 8,
                getHeaderClass: function(headerType, axetype) {
                    var cssclass = '';
                    switch (headerType) {
                        case HeaderType.EMPTY:
                        case HeaderType.FIELD_BUTTON:
                            cssclass = 'empty';
                            break;
                        case HeaderType.INNER:
                            cssclass = 'header';
                            break;
                        case HeaderType.WRAPPER:
                            if (axetype === axe.Type.ROWS) {
                                cssclass = 'header';
                            } else if (axetype === axe.Type.COLUMNS) {
                                cssclass = 'header';
                            }
                            break;
                        case HeaderType.SUB_TOTAL:
                            cssclass = 'header header-sub-total';
                            break;
                        case HeaderType.GRAND_TOTAL:
                            cssclass = 'header header-grand-total';
                            break;
                    }

                    return cssclass;
                },
                getCellClass: function(rowHeaderType, colHeaderType) {
                    var cssclass = '';
                    switch (rowHeaderType) {
                        case HeaderType.GRAND_TOTAL:
                            cssclass = 'cell-grand-total';
                            break;
                        case HeaderType.SUB_TOTAL:
                            if (colHeaderType === HeaderType.GRAND_TOTAL) {
                                cssclass = 'cell-grand-total';
                            } else {
                                cssclass = 'cell-sub-total';
                            }
                            break;
                        default:
                            if (colHeaderType === HeaderType.GRAND_TOTAL) {
                                cssclass = 'cell-grand-total';
                            } else if (colHeaderType === HeaderType.SUB_TOTAL) {
                                cssclass = 'cell-sub-total';
                            } else {
                                cssclass = 'cell';
                            }
                    }
                    return cssclass;
                }
            };

            function CellBase(options) {

                this.axetype = options.axetype;

                this.type = options.type;

                this.template = options.template;

                this.value = options.value;

                this.expanded = true;

                this.cssclass = options.cssclass;

                this.hspan = options.hspan || function() {
                    return 1;
                };

                this.vspan = options.vspan || function() {
                    return 1;
                };

                this.visible = options.isvisible || function() {
                    return true;
                };

                this.key = this.axetype + this.type + this.value;
                this.getState = function() {
                    return state.get(this.key);
                };
                this.setState = function(newState) {
                    state.set(this.key, newState);
                };
            }

            module.exports.header = function(axetype, headerType, dim, parent, datafieldscount, subtotalHeader) {

                var self = this;

                var hspan;
                var vspan;
                var value;

                var isRowsAxe = axetype === axe.Type.ROWS;
                headerType = headerType || (dim.depth === 1 ? HeaderType.INNER : HeaderType.WRAPPER);

                switch (headerType) {
                    case HeaderType.GRAND_TOTAL:
                        value = 'Grand Total';
                        hspan = isRowsAxe ? dim.depth - 1 || 1 : datafieldscount;
                        vspan = isRowsAxe ? datafieldscount : dim.depth - 1 || 1;
                        break;
                    case HeaderType.SUB_TOTAL:
                        value = 'Total ' + dim.value;
                        hspan = isRowsAxe ? dim.depth : datafieldscount;
                        vspan = isRowsAxe ? datafieldscount : dim.depth;
                        break;
                    default:
                        value = dim.value;
                        hspan = isRowsAxe ? 1 : null;
                        vspan = isRowsAxe ? null : 1;
                        break;
                }

                CellBase.call(this, {
                    axetype: axetype,
                    type: headerType,
                    template: isRowsAxe ? 'cell-template-row-header' : 'cell-template-column-header',
                    value: value,
                    cssclass: HeaderType.getHeaderClass(headerType, axetype),
                    hspan: hspan != null ? function() {
                        return hspan;
                    } : calcSpan,
                    vspan: vspan != null ? function() {
                        return vspan;
                    } : calcSpan,
                    isvisible: isParentExpanded
                });

                this.subtotalHeader = subtotalHeader;
                this.parent = parent;
                this.subheaders = [];
                this.dim = dim;
                this.expanded = this.getState() ? this.getState().expanded : (headerType !== HeaderType.SUB_TOTAL || !dim.field.subTotal.collapsed);

                this.expand = function() {
                    self.expanded = true;
                    this.setState({
                        expanded: self.expanded
                    });
                };
                this.collapse = function() {
                    self.expanded = false;
                    this.setState({
                        expanded: self.expanded
                    });
                };

                if (parent != null) {
                    parent.subheaders.push(this);
                }

                function isParentExpanded() {
                    if (self.type === HeaderType.SUB_TOTAL) {
                        var hparent = self.parent;
                        while (hparent != null) {
                            if (hparent.subtotalHeader && !hparent.subtotalHeader.expanded) {
                                return false;
                            }
                            hparent = hparent.parent;
                        }
                        return true;
                    } else {

                        var isexpanded = self.dim.isRoot || self.dim.isLeaf || !self.dim.field.subTotal.visible || self.subtotalHeader.expanded;
                        if (!isexpanded) {
                            return false;
                        }

                        var par = self.parent;
                        while (par != null && (!par.dim.field.subTotal.visible || (par.subtotalHeader != null && par.subtotalHeader.expanded))) {
                            par = par.parent;
                        }
                        return par == null || par.subtotalHeader == null ? isexpanded : par.subtotalHeader.expanded;
                    }
                }

                function calcSpan() {
                    var tspan = 0;
                    var subSpan;
                    var addone = false;

                    if (self.visible()) {
                        if (!self.dim.isLeaf) {
                            // subdimvals 'own' properties are the set of values for this dimension
                            for (var i = 0; i < self.subheaders.length; i++) {
                                var subheader = self.subheaders[i];
                                // if its not an array
                                if (!subheader.dim.isLeaf) {
                                    subSpan = isRowsAxe ? subheader.vspan() : subheader.hspan();
                                    tspan += subSpan;
                                    if (i === 0 && (subSpan === 0 || (isRowsAxe && subheader.type === HeaderType.SUB_TOTAL && !subheader.expanded))) {
                                        addone = true;
                                    }
                                } else {
                                    tspan += datafieldscount;
                                }
                            }
                        } else {
                            return datafieldscount;
                        }
                        return tspan + (addone ? 1 : 0);
                    }
                    return tspan;
                }
            };

            module.exports.dataHeader = function(datafield, parent) {

                CellBase.call(this, {
                    axetype: null,
                    type: HeaderType.DATA_HEADER,
                    template: 'cell-template-dataheader',
                    value: datafield,
                    cssclass: HeaderType.getHeaderClass(parent.type),
                    isvisible: parent.visible
                });

                this.parent = parent;
            };

            module.exports.dataCell = function(pgrid, isvisible, rowinfo, colinfo) {

                this.rowDimension = rowinfo.type === HeaderType.DATA_HEADER ? rowinfo.parent.dim : rowinfo.dim;
                this.columnDimension = colinfo.type === HeaderType.DATA_HEADER ? colinfo.parent.dim : colinfo.dim;
                this.rowType = rowinfo.type === HeaderType.DATA_HEADER ? rowinfo.parent.type : rowinfo.type;
                this.colType = colinfo.type === HeaderType.DATA_HEADER ? colinfo.parent.type : colinfo.type;

                this.datafield = pgrid.config.dataFieldsCount > 1 ?
                    (pgrid.config.dataHeadersLocation === 'rows' ?
                        rowinfo.value :
                        colinfo.value) :
                    pgrid.config.dataFields[0];

                CellBase.call(this, {
                    axetype: null,
                    type: HeaderType.DATA_VALUE,
                    template: 'cell-template-datavalue',
                    value: pgrid.getData(this.datafield ? this.datafield.name : null, this.rowDimension, this.columnDimension),
                    cssclass: 'cell ' + HeaderType.getCellClass(this.rowType, this.colType),
                    isvisible: isvisible
                });
            };

            module.exports.buttonCell = function(field) {

                CellBase.call(this, {
                    axetype: null,
                    type: HeaderType.FIELD_BUTTON,
                    template: 'cell-template-fieldbutton',
                    value: field,
                    cssclass: HeaderType.getHeaderClass(HeaderType.FIELD_BUTTON)
                });
            };

            module.exports.emptyCell = function(hspan, vspan) {

                CellBase.call(this, {
                    axetype: null,
                    type: HeaderType.EMPTY,
                    template: 'cell-template-empty',
                    value: null,
                    cssclass: HeaderType.getHeaderClass(HeaderType.EMPTY),
                    hspan: function() {
                        return hspan;
                    },
                    vspan: function() {
                        return vspan;
                    },
                });
            };

        }, {
            "./orb.axe": 4,
            "./orb.state": 9
        }],
        12: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var pgrid = _dereq_('./orb.pgrid');
            var uiheaders = _dereq_('./orb.ui.header');
            var uirows = _dereq_('./orb.ui.rows');
            var uicols = _dereq_('./orb.ui.cols');
            //var React = require('react');
            var OrbReactComps = _dereq_('./react/orb.react.compiled');

            module.exports = function(config) {

                var self = this;
                var renderElement;


                this.pgrid = new pgrid(config);


                this.rows = null;

                this.columns = null;


                this.rowHeadersWidth = null;


                this.columnHeadersWidth = null;


                this.rowHeadersHeight = null;


                this.columnHeadersHeight = null;


                this.totalWidth = null;


                this.totalWidth = null;

                this.sort = function(axetype, field) {
                    if (axetype === axe.Type.ROWS) {
                        self.pgrid.rows.sort(field);
                    } else if (axetype === axe.Type.COLUMNS) {
                        self.pgrid.columns.sort(field);
                    } else {
                        return;
                    }

                    buildUi();
                };

                this.moveField = function(field, oldAxeType, newAxeType, position) {
                    self.pgrid.moveField(field, oldAxeType, newAxeType, position);
                    buildUi();
                };

                this.filters = null;

                this.cells = [];

                var pivotComponent;

                this.render = function(element) {
                    renderElement = element;
                    if (renderElement) {
                        var pivotTableFactory = React.createFactory(OrbReactComps.PivotTable);
                        var pivottable = pivotTableFactory({
                            data: self,
                            config: config
                        });

                        pivotComponent = React.render(pivottable, element);
                    }
                };

                var dialog = OrbReactComps.Dialog.create();

                this.drilldown = function(dataCell, pivotId) {
                    if (dataCell) {
                        var colIndexes = dataCell.columnDimension.getRowIndexes();
                        var data = dataCell.rowDimension.getRowIndexes().filter(function(index) {
                            return colIndexes.indexOf(index) >= 0;
                        }).map(function(index) {
                            return self.pgrid.config.dataSource[index];
                        });

                        var title;
                        if (dataCell.rowType === uiheaders.HeaderType.GRAND_TOTAL && dataCell.colType === uiheaders.HeaderType.GRAND_TOTAL) {
                            title = 'Grand total';
                        } else {
                            if (dataCell.rowType === uiheaders.HeaderType.GRAND_TOTAL) {
                                title = dataCell.columnDimension.value + '/Grand total ';
                            } else if (dataCell.colType === uiheaders.HeaderType.GRAND_TOTAL) {
                                title = dataCell.rowDimension.value + '/Grand total ';
                            } else {
                                title = dataCell.rowDimension.value + '/' + dataCell.columnDimension.value;
                            }
                        }

                        var pivotStyle = window.getComputedStyle(pivotComponent.getDOMNode(), null);

                        dialog.show({
                            title: title,
                            comp: {
                                type: OrbReactComps.Grid,
                                props: {
                                    headers: self.pgrid.config.dataSourceFieldCaptions,
                                    data: data
                                }
                            },
                            style: {
                                fontFamily: pivotStyle.getPropertyValue('font-family'),
                                fontSize: pivotStyle.getPropertyValue('font-size')
                            }
                        });
                    }
                };

                buildUi();

                function buildUi() {

                    // build rows and columns
                    self.rows = new uirows(self.pgrid.rows);
                    self.columns = new uicols(self.pgrid.columns);

                    var rowsInfos = self.rows.uiInfos;
                    var rowsInfoslength = rowsInfos.length;

                    var columnsInfos = self.columns.uiInfos;
                    var columnsInfoslength = columnsInfos.length;

                    var columnsAllHeaders = self.columns.leafsHeaders;
                    var columnsAllHeaderslength = columnsAllHeaders.length;

                    // set control properties		
                    self.rowHeadersWidth = (self.pgrid.rows.fields.length || 1) + (self.pgrid.config.dataHeadersLocation === 'rows' && self.pgrid.config.dataFieldsCount > 1 ? 1 : 0);
                    self.columnHeadersWidth = columnsAllHeaderslength;
                    self.rowHeadersHeight = rowsInfoslength;
                    self.columnHeadersHeight = (self.pgrid.columns.fields.length || 1) + (self.pgrid.config.dataHeadersLocation === 'columns' && self.pgrid.config.dataFieldsCount > 1 ? 1 : 0);
                    self.totalWidth = self.rowHeadersWidth + self.columnHeadersWidth;
                    self.totalHeight = self.rowHeadersHeight + self.columnHeadersHeight;

                    var cells = [];
                    setArrayLength(cells, columnsInfoslength + rowsInfoslength);

                    function setArrayLength(arr, length) {
                        if (arr.length !== length) {
                            arr.length = length;
                            return true;
                        }
                        return false;
                    }

                    var arr;

                    for (var ci = 0; ci < columnsInfoslength; ci++) {

                        var uiinfo = columnsInfos[ci];
                        var prelength = 0;
                        arr = (cells[ci] = cells[ci] || []);
                        if (columnsInfoslength > 1 && ci === 0) {
                            prelength = 1;
                            setArrayLength(arr, prelength + uiinfo.length);
                            arr[0] = new uiheaders.emptyCell(self.rowHeadersWidth, self.columnHeadersHeight - 1);
                        } else if (ci === columnsInfoslength - 1) {
                            prelength = self.rowHeadersWidth;
                            setArrayLength(arr, prelength + uiinfo.length);
                            if (self.pgrid.rows.fields.length > 0) {
                                for (var findex = 0; findex < self.pgrid.config.rowFields.length; findex++) {
                                    arr[findex] = new uiheaders.buttonCell(self.pgrid.config.rowFields[findex]);
                                }
                            } else {
                                arr[0] = new uiheaders.emptyCell(self.rowHeadersWidth, 1);
                            }
                        }

                        for (var ui = 0; ui < uiinfo.length; ui++) {
                            arr[prelength + ui] = uiinfo[ui];
                        }
                    }

                    function createVisibleFunc(rowvisible, colvisible) {
                        return function() {
                            return rowvisible() && colvisible();
                        };
                    }

                    for (var ri = 0; ri < rowsInfoslength; ri++) {
                        var ruiinfo = rowsInfos[ri];

                        arr = (cells[columnsInfoslength + ri] = cells[columnsInfoslength + ri] || new Array(ruiinfo.length + columnsAllHeaderslength));
                        setArrayLength(arr, ruiinfo.length + columnsAllHeaderslength);

                        for (var uri = 0; uri < ruiinfo.length; uri++) {
                            arr[uri] = ruiinfo[uri];
                        }

                        var rinfo = ruiinfo[ruiinfo.length - 1];
                        for (var cinfosIndex = 0; cinfosIndex < columnsAllHeaderslength; cinfosIndex++) {
                            var cinfo = columnsAllHeaders[cinfosIndex];
                            var isvisible = createVisibleFunc(rinfo.visible, cinfo.visible);
                            arr[ruiinfo.length + cinfosIndex] = new uiheaders.dataCell(self.pgrid, isvisible, rinfo, cinfo);
                        }
                    }
                    self.cells = cells;
                }
            };

        }, {
            "./orb.axe": 4,
            "./orb.pgrid": 7,
            "./orb.ui.cols": 10,
            "./orb.ui.header": 11,
            "./orb.ui.rows": 13,
            "./react/orb.react.compiled": 15
        }],
        13: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var uiheaders = _dereq_('./orb.ui.header');

            module.exports = function(rowsAxe) {

                var self = this;


                this.axe = rowsAxe;


                this.uiInfos = [];

                var _multidatafields;
                var _datafieldscount;

                this.build = function() {

                    _datafieldscount = self.axe.pgrid.config.dataHeadersLocation === 'rows' ? (self.axe.pgrid.config.dataFieldsCount || 1) : 1;
                    _multidatafields = self.axe.pgrid.config.dataHeadersLocation === 'rows' && _datafieldscount > 1;

                    var uiInfos = [
                        []
                    ];
                    if (self.axe != null) {
                        // Fill Rows layout infos
                        getUiInfo(uiInfos, self.axe.root);

                        if (self.axe.pgrid.config.grandTotal.rowsvisible) {
                            var lastrow = uiInfos[uiInfos.length - 1];
                            var grandtotalHeader = new uiheaders.header(axe.Type.ROWS, uiheaders.HeaderType.GRAND_TOTAL, self.axe.root, null, _datafieldscount);
                            if (lastrow.length === 0) {
                                lastrow.push(grandtotalHeader);
                            } else {
                                uiInfos.push([grandtotalHeader]);
                            }

                            // add grand-total data headers if more than 1 data field and they will be the leaf headers
                            addDataHeaders(uiInfos, grandtotalHeader);
                        }

                        if (uiInfos[0].length === 0) {
                            uiInfos[0].push(new uiheaders.header(axe.Type.ROWS, uiheaders.HeaderType.INNER, self.axe.root, null, _datafieldscount));
                        }

                    }
                    self.uiInfos = uiInfos;
                };

                this.build();

                function addDataHeaders(infos, parent) {
                    if (_multidatafields) {
                        var lastInfosArray = infos[infos.length - 1];
                        for (var datafieldindex = 0; datafieldindex < _datafieldscount; datafieldindex++) {
                            lastInfosArray.push(new uiheaders.dataHeader(self.axe.pgrid.config.dataFields[datafieldindex], parent));
                            if (datafieldindex < _datafieldscount - 1) {
                                infos.push((lastInfosArray = []));
                            }
                        }
                    }
                }


                function getUiInfo(infos, dimension) {
                    if (dimension.values.length > 0) {

                        var infosMaxIndex = infos.length - 1;
                        var lastInfosArray = infos[infosMaxIndex];
                        var parent = lastInfosArray.length > 0 ? lastInfosArray[lastInfosArray.length - 1] : null;

                        for (var valIndex = 0; valIndex < dimension.values.length; valIndex++) {
                            var subvalue = dimension.values[valIndex];
                            var subdim = dimension.subdimvals[subvalue];

                            var subTotalHeader;
                            if (!subdim.isLeaf && subdim.field.subTotal.visible) {
                                subTotalHeader = new uiheaders.header(axe.Type.ROWS, uiheaders.HeaderType.SUB_TOTAL, subdim, parent, _datafieldscount);
                            } else {
                                subTotalHeader = null;
                            }

                            var newHeader = new uiheaders.header(axe.Type.ROWS, null, subdim, parent, _datafieldscount, subTotalHeader);

                            if (valIndex > 0) {
                                infos.push((lastInfosArray = []));
                            }

                            lastInfosArray.push(newHeader);

                            if (!subdim.isLeaf) {
                                getUiInfo(infos, subdim);
                                if (subdim.field.subTotal.visible) {
                                    infos.push([subTotalHeader]);

                                    // add sub-total data headers if more than 1 data field and they will be the leaf headers
                                    addDataHeaders(infos, subTotalHeader);
                                }
                            } else {
                                // add data headers if more than 1 data field and they will be the leaf headers
                                addDataHeaders(infos, newHeader);
                            }
                        }
                    }
                }
            };

        }, {
            "./orb.axe": 4,
            "./orb.ui.header": 11
        }],
        14: [function(_dereq_, module, exports) {

            module.exports = {

                ns: function(identifier, parent) {
                    var parts = identifier.split('.');
                    var i = 0;
                    parent = parent || window;
                    while (i < parts.length) {
                        parent[parts[i]] = parent[parts[i]] || {};
                        parent = parent[parts[i]];
                        i++;
                    }
                    return parent;
                },

                ownProperties: function(obj) {
                    var arr = [];
                    for (var prop in obj) {
                        if (obj.hasOwnProperty(prop)) {
                            arr.push(prop);
                        }
                    }
                    return arr;
                },

                isArray: function(obj) {
                    return Object.prototype.toString.apply(obj) === '[object Array]';
                },

                findInArray: function(array, predicate) {
                    if (this.isArray(array) && predicate) {
                        for (var i = 0; i < array.length; i++) {
                            var item = array[i];
                            if (predicate(item)) {
                                return item;
                            }
                        }
                    }
                    return undefined;
                },

                jsonStringify: function(obj, censorKeywords) {
                    function censor(key, value) {
                        return censorKeywords && censorKeywords.indexOf(key) > -1 ? undefined : value;
                    }
                    return JSON.stringify(obj, censor, 2);
                }
            };

        }, {}],
        15: [function(_dereq_, module, exports) {

            var react = typeof window === 'undefined' ? _dereq_('react') : window.React;
            var utils = _dereq_('../orb.utils');
            var axe = _dereq_('../orb.axe');
            var uiheaders = _dereq_('../orb.ui.header');

            var pivotId = 1;
            var extraCol = 1;
            var comps = module.exports;

            module.exports.PivotTable = react.createClass({
                getInitialState: function() {
                    comps.DragManager.init(this);
                    return {};
                },
                id: pivotId++,
                sort: function(axetype, field) {
                    this.props.data.sort(axetype, field);
                    this.setProps(this.props);
                },
                moveButton: function(button, newAxeType, position) {
                    this.props.data.moveField(button.props.field.name, button.props.axetype, newAxeType, position);
                    this.setProps(this.props);
                },
                expandRow: function(cell) {
                    cell.expand();
                    this.setProps({});
                },
                collapseRow: function(cell) {
                    cell.subtotalHeader.collapse();
                    this.setProps({});
                },
                render: function() {

                    var self = this;

                    var ptc = this.props.data;
                    var PivotButton = comps.PivotButton;
                    var PivotRow = comps.PivotRow;
                    var DropTarget = comps.DropTarget;

                    var fieldButtons = ptc.pgrid.config.availablefields().map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: null,
                            position: index,
                            rootComp: self
                        });
                    });

                    var dataButtons = ptc.pgrid.config.dataFields.map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: axe.Type.DATA,
                            position: index,
                            rootComp: self
                        });
                    });

                    var columnButtons = ptc.pgrid.config.columnFields.map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: axe.Type.COLUMNS,
                            position: index,
                            rootComp: self
                        });
                    });

                    // get 'row buttons' row (also last row containing column headers)
                    var rowButtons = utils.findInArray(ptc.cells, function(row) {
                        return row[0].template === 'cell-template-fieldbutton';
                    });

                    // build row buttons
                    if (rowButtons !== undefined) {
                        rowButtons = rowButtons.filter(function(buttonCell) {
                            return buttonCell.template === 'cell-template-fieldbutton';
                        }).map(function(buttonCell, index) {
                            return React.createElement(PivotButton, {
                                key: buttonCell.value.name,
                                field: buttonCell.value,
                                axetype: axe.Type.ROWS,
                                position: index,
                                rootComp: self
                            });
                        });
                    } else {
                        rowButtons = [];
                    }

                    // build the cell that will contains 'row buttons'
                    var rowButtonsCell = React.createElement("td", {
                            className: "empty",
                            colSpan: ptc.rowHeadersWidth + extraCol,
                            rowSpan: "1"
                        },
                        React.createElement(DropTarget, {
                            data: rowButtons,
                            axetype: axe.Type.ROWS
                        })
                    );

                    var rows = ptc.cells.map(function(row, index) {
                        if (index == ptc.columnHeadersHeight - 1) {
                            return React.createElement(PivotRow, {
                                key: index,
                                row: row,
                                rowButtonsCount: ptc.rowHeadersWidth,
                                rowButtonsCell: rowButtonsCell,
                                rootComp: self
                            });
                        } else {
                            return React.createElement(PivotRow, {
                                key: index,
                                row: row,
                                rootComp: self
                            });
                        }
                    });

                    var tblStyle = {};
                    if (this.props.config.width) {
                        tblStyle.width = this.props.config.width;
                    }
                    if (this.props.config.height) {
                        tblStyle.height = this.props.config.height;
                    }

                    return (
                        React.createElement("div", {
                                className: "orb-container",
                                style: tblStyle
                            },
                            React.createElement("table", {
                                    id: "{'tbl' + self.id}",
                                    className: "orb",
                                    style: {
                                        width: '100%'
                                    }
                                },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                                className: "available-fields field-group",
                                                colSpan: extraCol,
                                                rowSpan: "1"
                                            },
                                            React.createElement("div", {
                                                className: "field-group-caption"
                                            }, "Fields")
                                        ),
                                        React.createElement("td", {
                                                className: "available-fields",
                                                colSpan: ptc.totalWidth,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                data: fieldButtons,
                                                axetype: null
                                            })
                                        )
                                    ),
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                                className: "field-group",
                                                colSpan: extraCol,
                                                rowSpan: "1"
                                            },
                                            React.createElement("div", {
                                                className: "field-group-caption"
                                            }, "Data")
                                        ),
                                        React.createElement("td", {
                                                className: "empty",
                                                colSpan: ptc.totalWidth,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                data: dataButtons,
                                                axetype: axe.Type.DATA
                                            })
                                        )
                                    ),
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                            className: "empty",
                                            colSpan: ptc.rowHeadersWidth + extraCol,
                                            rowSpan: "1"
                                        }),
                                        React.createElement("td", {
                                                className: "empty",
                                                colSpan: ptc.columnHeadersWidth,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                data: columnButtons,
                                                axetype: axe.Type.COLUMNS
                                            })
                                        )
                                    ),
                                    rows
                                )
                            ),
                            React.createElement("div", {
                                className: "orb-overlay orb-overlay-hidden",
                                id: 'drilldialog' + self.id
                            })
                        )
                    );
                }
            });

            module.exports.PivotRow = react.createClass({
                render: function() {
                    var self = this;
                    var PivotCell = comps.PivotCell;

                    var lastCellIndex = this.props.row.length - 1;
                    var cell0 = this.props.row[0];
                    var cells;

                    var rowstyle = {};

                    if (this.props.rowButtonsCell !== undefined) {
                        cells = this.props.row.slice(this.props.rowButtonsCount).map(function(cell, index) {
                            var isrightmost = index === (lastCellIndex - self.props.rowButtonsCount);
                            return React.createElement(PivotCell, {
                                key: index,
                                cell: cell,
                                rightmost: isrightmost,
                                leftmost: false,
                                rootComp: self.props.rootComp
                            });
                        });

                        return (
                            React.createElement("tr", null,
                                this.props.rowButtonsCell,
                                cells
                            )
                        );

                    } else {

                        if (cell0.template == 'cell-template-row-header' && cell0.visible && !cell0.visible()) {
                            rowstyle.display = 'none';
                        }

                        cells = this.props.row.map(function(cell, index) {
                            var isrightmost = index === lastCellIndex;
                            var isleftmost = index === 0 && (
                                cell.type === uiheaders.HeaderType.EMPTY ||
                                (cell.type === uiheaders.HeaderType.SUB_TOTAL && cell.dim.parent.isRoot) ||
                                cell.type === uiheaders.HeaderType.GRAND_TOTAL ||
                                (cell.dim && (cell.dim.isRoot || cell.dim.parent.isRoot))
                            );

                            return React.createElement(PivotCell, {
                                key: index,
                                cell: cell,
                                rightmost: isrightmost,
                                leftmost: isleftmost,
                                rootComp: self.props.rootComp
                            });
                        });

                        return (
                            React.createElement("tr", {
                                    style: rowstyle
                                },
                                cells
                            )
                        );
                    }
                }
            });

            module.exports.PivotCell = react.createClass({
                expand: function() {
                    this.props.rootComp.expandRow(this.props.cell);
                },
                collapse: function() {
                    this.props.rootComp.collapseRow(this.props.cell);
                },
                render: function() {
                    var self = this;
                    var cell = this.props.cell;
                    var divcontent = [];
                    var value;
                    var vArrow = '\u25bc';
                    var hArrow = '\u25b6';
                    var cellClick;

                    switch (cell.template) {
                        case 'cell-template-row-header':
                        case 'cell-template-column-header':
                            if (cell.type === uiheaders.HeaderType.WRAPPER && cell.dim.field.subTotal.visible && cell.dim.field.subTotal.collapsible && cell.subtotalHeader.expanded) {
                                divcontent.push(React.createElement("span", {
                                    key: "toggle-button",
                                    className: "toggle-button toggle-button-down",
                                    onClick: this.collapse
                                }));
                            } else if (cell.type === uiheaders.HeaderType.SUB_TOTAL && !cell.expanded) {
                                divcontent.push(React.createElement("span", {
                                    key: "toggle-button",
                                    className: "toggle-button toggle-button-right",
                                    onClick: this.expand
                                }));
                            }
                            value = cell.value;
                            break;
                        case 'cell-template-dataheader':
                            value = cell.value.caption;
                            break;
                        case 'cell-template-datavalue':
                            value = (cell.datafield && cell.datafield.formatFunc) ? cell.datafield.formatFunc()(cell.value) : cell.value;
                            cellClick = function() {
                                self.props.rootComp.props.data.drilldown(cell, self.props.rootComp.id);
                            }
                            break;
                        default:
                            break;
                    }

                    divcontent.push(React.createElement("span", {
                        key: "cell-value",
                        style: {
                            whiteSpace: 'nowrap'
                        }
                    }, value));

                    var classname = cell.cssclass;
                    var isHidden = !cell.visible();
                    if (isHidden || this.props.rightmost || this.props.leftmost) {

                        if (isHidden) {
                            classname += ' cell-hidden';
                        }

                        if (this.props.rightmost && (cell.axetype !== axe.Type.COLUMNS || cell.type === uiheaders.HeaderType.GRAND_TOTAL)) {
                            classname += ' cell-rightmost';
                        }

                        if (this.props.leftmost) {
                            classname += ' cell-leftmost';
                        }
                    }

                    if (cell.template === 'cell-template-column-header' || cell.template === 'cell-template-dataheader') {
                        classname += ' centered';
                    }

                    return React.createElement("td", {
                            className: classname,
                            onDoubleClick: cellClick,
                            colSpan: cell.hspan() + (this.props.leftmost ? extraCol : 0),
                            rowSpan: cell.vspan()
                        },
                        React.createElement("div", null,
                            divcontent
                        )
                    );
                }
            });

            module.exports.Grid = react.createClass({
                render: function() {
                    var data = this.props.data;
                    var headers = this.props.headers;

                    var rows = [];

                    if (headers && headers.length > 0) {
                        var headerRow = [];
                        for (var h = 0; h < headers.length; h++) {
                            headerRow.push(React.createElement("th", null, headers[h]));
                        }
                        rows.push(React.createElement("tr", null, headerRow));
                    }

                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var row = [];
                            for (var j = 0; j < data[i].length; j++) {
                                row.push(React.createElement("td", null, data[i][j]));
                            }
                            rows.push(React.createElement("tr", null, row));
                        }
                    }

                    return React.createElement("table", {
                            className: "orb-table"
                        },
                        React.createElement("tbody", null,
                            rows
                        )
                    );
                }
            });

            function createOverlay() {
                var overlayElement = document.createElement('div');
                overlayElement.className = 'orb-overlay orb-overlay-hidden';
                document.body.appendChild(overlayElement);
                return overlayElement;
            }

            var Dialog = module.exports.Dialog = react.createClass({
                statics: {
                    create: function() {
                        var dialogFactory = React.createFactory(Dialog);
                        var dialog = dialogFactory({});
                        var overlay = createOverlay();

                        return {
                            show: function(props) {
                                dialog.props = props;
                                React.render(dialog, overlay);
                            }
                        }
                    }
                },
                overlayElement: null,
                componentDidMount: function() {
                    this.overlayElement = this.getDOMNode().parentNode;
                    this.overlayElement.className = 'orb-overlay orb-overlay-visible';
                    this.overlayElement.addEventListener('click', this.close);

                    var dialogElement = this.overlayElement.children[0];
                    var dialogBodyElement = dialogElement.children[1];

                    var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
                    var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                    var maxHeight = screenHeight / 3;
                    maxHeight = maxHeight < 101 ? 101 : maxHeight;
                    var dWidth = dialogElement.offsetWidth + (dialogElement.offsetHeight > maxHeight ? 11 : 0);
                    var dHeight = dialogElement.offsetHeight > maxHeight ? maxHeight : dialogElement.offsetHeight;

                    dialogElement.style.top = (screenHeight > dHeight ? (screenHeight - dHeight) / 2 : 0) + 'px';
                    dialogElement.style.left = (screenWidth > dWidth ? (screenWidth - dWidth) / 2 : 0) + 'px';
                    dialogElement.style.height = dHeight + 'px';
                    dialogBodyElement.style.width = dWidth + 'px';
                    dialogBodyElement.style.height = (dHeight - 45) + 'px';
                },
                close: function(e) {
                    if (e.target == this.overlayElement || e.target.className === 'button-close') {
                        this.overlayElement.removeEventListener('click', this.close);
                        React.unmountComponentAtNode(this.overlayElement);
                        this.overlayElement.className = 'orb-overlay orb-overlay-hidden';
                    }
                },
                render: function() {
                    var comp = React.createElement(this.props.comp.type, this.props.comp.props);
                    return React.createElement("div", {
                            className: "orb-dialog",
                            style: this.props.style || {}
                        },
                        React.createElement("div", {
                            className: "orb-dialog-header"
                        }, this.props.title, React.createElement("div", {
                            className: "button-close",
                            onClick: this.close
                        })),
                        React.createElement("div", {
                                className: "orb-dialog-body"
                            },
                            comp
                        )
                    );
                }
            });

            function forEach(list, func, defStop) {
                var ret;
                if (list != null) {
                    for (var i = 0, l = list.length; i < l; i++) {
                        ret = func(list[i], i);
                        if (ret !== undefined && defStop === true) {
                            break;
                        }
                    }
                }
                return ret;
            }

            var dragManager = module.exports.DragManager = (function() {

                var _pivotComp = null;
                var _dragElement = null;
                var _dragNode = null;
                var _dropTargets = [];
                var _dropIndicators = [];

                function doElementsOverlap(elem1Rect, elem2Rect) {
                    return !(elem1Rect.right < elem2Rect.left ||
                        elem1Rect.left > elem2Rect.right ||
                        elem1Rect.bottom < elem2Rect.top ||
                        elem1Rect.top > elem2Rect.bottom);
                }

                function signalDragOver(target) {
                    if (target.onDragOver) {
                        target.onDragOver(_dragElement);
                        return true;
                    }
                    return false;
                }

                function signalDragEnd(target) {
                    if (target.onDragEnd) {
                        target.onDragEnd();
                        return true;
                    }
                    return false;
                }

                function getDropTarget() {
                    return forEach(_dropTargets, function(target) {
                        if (target.component.state.isover) {
                            return target;
                        }
                    }, true);
                }

                function getDropIndicator() {
                    return forEach(_dropIndicators, function(indicator) {
                        if (indicator.component.state.isover) {
                            return indicator;
                        }
                    }, true);
                }

                var _initialized = false;

                return {
                    init: function(pivotComp) {
                        _initialized = true;
                        _pivotComp = pivotComp;
                    },
                    dragElement: function(elem) {

                        var prevDragElement = _dragElement;
                        _dragElement = elem;
                        if (_dragElement != prevDragElement) {
                            if (elem == null) {

                                // Drop Target
                                var dropTarget = getDropTarget();
                                // Drop Indicator
                                var dropIndicator = getDropIndicator();

                                if (dropTarget) {
                                    var position = dropIndicator != null ? dropIndicator.position : null;
                                    _pivotComp.moveButton(prevDragElement, dropTarget.component.props.axetype, position);
                                }

                                _dragNode = null;
                                forEach(_dropTargets, function(target) {
                                    signalDragEnd(target);
                                });

                                forEach(_dropIndicators, function(indicator) {
                                    signalDragEnd(indicator);
                                });

                            } else {
                                _dragNode = _dragElement.getDOMNode();
                            }
                        }
                    },
                    registerTarget: function(target, axetype, dragOverHandler, dargEndHandler) {
                        _dropTargets.push({
                            component: target,
                            axetype: axetype,
                            onDragOver: dragOverHandler,
                            onDragEnd: dargEndHandler
                        });
                    },
                    unregisterTarget: function(target) {
                        var tindex;
                        for (var i = 0; i < _dropTargets.length; i++) {
                            if (_dropTargets[i].component == target) {
                                tindex = i;
                                break;
                            }
                        }
                        if (tindex != null) {
                            _dropTargets.splice(tindex, 1);
                        }
                    },
                    registerIndicator: function(indicator, axetype, position, dragOverHandler, dargEndHandler) {
                        _dropIndicators.push({
                            component: indicator,
                            axetype: axetype,
                            position: position,
                            onDragOver: dragOverHandler,
                            onDragEnd: dargEndHandler
                        });
                    },
                    unregisterIndicator: function(indicator) {
                        var iindex;
                        for (var i = 0; i < _dropIndicators.length; i++) {
                            if (_dropIndicators[i].component == indicator) {
                                iindex = i;
                                break;
                            }
                        }
                        if (iindex != null) {
                            _dropIndicators.splice(iindex, 1);
                        }
                    },
                    elementMoved: function() {
                        if (_dragElement != null) {
                            var dragNodeRect = _dragNode.getBoundingClientRect();
                            var foundTarget;

                            forEach(_dropTargets, function(target) {
                                if (!foundTarget) {
                                    var tnodeRect = target.component.getDOMNode().getBoundingClientRect();
                                    var isOverlap = doElementsOverlap(dragNodeRect, tnodeRect);
                                    if (isOverlap && signalDragOver(target)) {
                                        foundTarget = target;
                                        return true;
                                    } else {
                                        signalDragEnd(target);
                                    }
                                }
                            }, true);

                            var foundIndicator;

                            if (foundTarget) {
                                forEach(_dropIndicators, function(indicator, index) {
                                    if (!foundIndicator) {
                                        var elementOwnIndicator = indicator.component.props.axetype === _dragElement.props.axetype &&
                                            indicator.component.props.position === _dragElement.props.position;

                                        var targetIndicator = indicator.component.props.axetype === foundTarget.component.props.axetype;
                                        if (targetIndicator && !elementOwnIndicator) {
                                            var tnodeRect = indicator.component.getDOMNode().getBoundingClientRect();
                                            var isOverlap = doElementsOverlap(dragNodeRect, tnodeRect);
                                            if (isOverlap && signalDragOver(indicator)) {
                                                foundIndicator = indicator;
                                                return;
                                            }
                                        }
                                    }

                                    signalDragEnd(indicator);
                                });

                                if (!foundIndicator) {
                                    var axeIndicators = _dropIndicators.filter(function(indicator) {
                                        return indicator.component.props.axetype === foundTarget.component.props.axetype;
                                    });
                                    if (axeIndicators.length > 0) {
                                        signalDragOver(axeIndicators[axeIndicators.length - 1]);
                                    }
                                }
                            } else {
                                forEach(_dropIndicators, function(indicator, index) {
                                    signalDragEnd(indicator);
                                });
                            }
                        }
                    }
                };
            }());

            var dtid = 0;

            module.exports.DropTarget = react.createClass({
                getInitialState: function() {
                    this.dtid = ++dtid;
                    // initial state, all zero.
                    dragManager.registerTarget(this, this.props.axetype, this.onDragOver, this.onDragEnd);
                    return {
                        isover: false
                    };
                },
                componentWillUnmount: function() {
                    dragManager.unregisterTarget(this);
                },
                onDragOver: function(component) {
                    this.setState({
                        isover: true
                    });
                },
                onDragEnd: function() {
                    this.setState({
                        isover: false
                    });
                },
                render: function() {
                    var self = this;
                    var DropIndicator = module.exports.DropIndicator;
                    var buttons = this.props.data.map(function(button, index) {
                        if (index < self.props.data.length - 1) {
                            return [
                                React.createElement(DropIndicator, {
                                    isFirst: index === 0,
                                    position: index,
                                    axetype: self.props.axetype
                                }),
                                button
                            ];
                        } else {
                            return [
                                React.createElement(DropIndicator, {
                                    isFirst: index === 0,
                                    position: index,
                                    axetype: self.props.axetype
                                }),
                                button,
                                React.createElement(DropIndicator, {
                                    isLast: true,
                                    position: null,
                                    axetype: self.props.axetype
                                })
                            ];
                        }
                    });

                    return React.createElement("div", {
                            className: 'drop-target' + (this.state.isover ? ' drag-over' : '')
                        },
                        buttons
                    );
                }
            });

            function getOffset(element) {
                if (element != null) {
                    var rect = element.getBoundingClientRect();
                    return {
                        x: rect.left + 0,
                        y: rect.top + 0
                    };
                }
                return {
                    x: 0,
                    y: 0
                };
            }

            function getSize(element) {
                if (element != null) {
                    var rect = element.getBoundingClientRect();
                    return {
                        width: rect.right - rect.left,
                        height: rect.bottom - rect.top
                    };
                }
                return {
                    x: 0,
                    y: 0
                };
            }

            module.exports.DropIndicator = react.createClass({
                displayName: 'DropIndicator',
                getInitialState: function() {
                    dragManager.registerIndicator(this, this.props.axetype, this.props.position, this.onDragOver, this.onDragEnd);
                    return {
                        isover: false
                    };
                },
                componentWillUnmount: function() {
                    dragManager.unregisterIndicator(this);
                },
                onDragOver: function(component) {
                    this.setState({
                        isover: true,
                        width: component.getDOMNode().style.width
                    });
                },
                onDragEnd: function() {
                    this.setState({
                        isover: false,
                        width: null
                    });
                },
                render: function() {
                    var classname = 'drop-indicator';

                    if (this.props.isFirst) {
                        classname += ' drop-indicator-first';
                    }

                    if (this.props.isLast) {
                        classname += ' drop-indicator-last';
                    }

                    var style = {};
                    if (this.state.isover) {
                        classname += ' drop-indicator-drag-over';
                    }

                    return React.createElement("div", {
                        style: style,
                        className: classname
                    });
                }
            });

            var pbid = 0;

            module.exports.PivotButton = react.createClass({
                displayName: 'PivotButton',
                getInitialState: function() {
                    this.pbid = ++pbid;

                    // initial state, all zero.
                    return {
                        pos: {
                            x: 0,
                            y: 0
                        },
                        startpos: {
                            x: 0,
                            y: 0
                        },
                        mousedown: false,
                        dragging: false
                    };
                },
                onMouseDown: function(e) {
                    // drag/sort with left mouse button
                    if (e.button !== 0) return;

                    var thispos = getOffset(this.getDOMNode());

                    // inform mousedown, save start pos
                    this.setState({
                        mousedown: true,
                        mouseoffset: {
                            x: thispos.x - e.pageX,
                            y: thispos.y - e.pageY,
                        },
                        startpos: {
                            x: e.pageX,
                            y: e.pageY
                        }
                    });
                    // prevent event bubbling (to prevent text selection while dragging for example)
                    e.stopPropagation();
                    e.preventDefault();
                },
                componentDidUpdate: function() {
                    if (!this.state.mousedown) {
                        // mouse not down, don't care about mouse up/move events.
                        dragManager.dragElement(null);
                        document.removeEventListener('mousemove', this.onMouseMove);
                        document.removeEventListener('mouseup', this.onMouseUp);
                    } else if (this.state.mousedown) {
                        // mouse down, interested by mouse up/move events.
                        dragManager.dragElement(this);
                        document.addEventListener('mousemove', this.onMouseMove);
                        document.addEventListener('mouseup', this.onMouseUp);
                    }
                },
                componentWillUnmount: function() {
                    document.removeEventListener('mousemove', this.onMouseMove);
                    document.removeEventListener('mouseup', this.onMouseUp);
                },
                onMouseUp: function() {
                    var wasdragging = this.state.dragging;

                    this.setState({
                        mousedown: false,
                        dragging: false,
                        size: null,
                        pos: {
                            x: 0,
                            y: 0
                        }
                    });

                    // if button was not dragged, proceed as a click
                    if (!wasdragging) {
                        this.props.rootComp.sort(this.props.axetype, this.props.field);
                    }
                },
                onMouseMove: function(e) {
                    // if the mouse is not down while moving, return (no drag)
                    if (!this.state.mousedown) return;

                    var size = null;
                    if (!this.state.dragging) {
                        size = getSize(this.getDOMNode());
                    } else {
                        size = this.state.size;
                    }

                    var newpos = {
                        x: e.pageX + this.state.mouseoffset.x,
                        y: e.pageY + this.state.mouseoffset.y
                    };

                    this.setState({
                        dragging: true,
                        size: size,
                        pos: newpos
                    });

                    dragManager.elementMoved();

                    e.stopPropagation();
                    e.preventDefault();
                },
                render: function() {
                    var self = this;
                    var divstyle = {
                        left: self.state.pos.x + 'px',
                        top: self.state.pos.y + 'px',
                        position: self.state.dragging ? 'fixed' : ''
                    };

                    if (self.state.size) {
                        divstyle.width = self.state.size.width + 'px';
                    }

                    var DropIndicator = module.exports.DropIndicator;
                    var sortIndicator = self.props.field.sort.order === 'asc' ?
                        ' \u2191' :
                        (self.props.field.sort.order === 'desc' ?
                            ' \u2193' :
                            '');

                    return React.createElement("div", {
                            key: self.props.field.name,
                            className: "field-button",
                            onMouseDown: this.onMouseDown,
                            style: divstyle
                        },
                        self.props.field.caption,
                        React.createElement("span", null, sortIndicator)
                    );
                }
            });

        }, {
            "../orb.axe": 4,
            "../orb.ui.header": 11,
            "../orb.utils": 14,
            "react": 2
        }]
    }, {}, [1])(1)
});
