/**
 * orb v1.0.7, Pivot grid javascript library.
 *
 * Copyright (c) 2014-2015 Najmeddine Nouri <devnajm@gmail.com>.
 *
 * @version v1.0.7
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
            module.exports.query = _dereq_('./orb.query');

        }, {
            "./orb.pgrid": 7,
            "./orb.query": 8,
            "./orb.ui.pgridwidget": 13,
            "./orb.utils": 15
        }],
        2: [function(_dereq_, module, exports) {

            var Aggregations = module.exports = {
                toAggregateFunc: function(func) {
                    if (func) {
                        if (typeof func === 'string' && Aggregations[func]) {
                            return Aggregations[func];
                        } else if (typeof func === 'function') {
                            return func;
                        } else {
                            return Aggregations.sum;
                        }
                    } else {
                        return Aggregations.sum;
                    }
                },
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
        3: [function(_dereq_, module, exports) {

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

                    if (self.pgrid.filteredDataSource != null && self.dimensionsCount > 0) {

                        var datasource = self.pgrid.filteredDataSource;
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
            "./orb.dimension": 5,
            "./orb.utils": 15
        }],
        4: [function(_dereq_, module, exports) {

            var utils = _dereq_('./orb.utils');
            var axe = _dereq_('./orb.axe');
            var aggregation = _dereq_('./orb.aggregation');
            var filtering = _dereq_('./orb.filtering');
            var themeManager = _dereq_('./orb.themes');

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
                var functions = [];

                for (var i = 0; i < arguments.length; i++) {
                    var nnconfig = arguments[i] || {};
                    configs.push(nnconfig);
                    sorts.push(nnconfig.sort || {});
                    subtotals.push(nnconfig.subTotal || {});
                    functions.push({
                        aggregateFuncName: nnconfig.aggregateFuncName,
                        aggregateFunc: i === 0 ? nnconfig.aggregateFunc : (nnconfig.aggregateFunc ? nnconfig.aggregateFunc() : null),
                        formatFunc: i === 0 ? nnconfig.formatFunc : (nnconfig.formatFunc ? nnconfig.formatFunc() : null),
                    });
                }

                return new Field({
                    name: getpropertyvalue('name', configs, ''),

                    caption: getpropertyvalue('caption', configs, ''),

                    sort: {
                        order: getpropertyvalue('order', sorts, null),
                        customfunc: getpropertyvalue('customfunc', sorts, null)
                    },
                    subTotal: {
                        visible: getpropertyvalue('visible', subtotals, true),
                        collapsible: getpropertyvalue('collapsible', subtotals, true),
                        collapsed: getpropertyvalue('collapsed', subtotals, false)
                    },

                    aggregateFuncName: getpropertyvalue('aggregateFuncName', functions, 'sum'),
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

            var Field = module.exports.field = function(options, createSubOptions) {

                options = options || {};

                // field name
                this.name = options.name;

                // shared settings
                this.caption = options.caption || this.name;

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
                        _aggregatefunc = aggregation.toAggregateFunc(func);
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

                this.aggregateFuncName = options.aggregateFuncName || (options.aggregateFunc && utils.isString(options.aggregateFunc) ? options.aggregateFunc : null);
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

                this.dataSource = config.dataSource || [];
                this.dataHeadersLocation = config.dataHeadersLocation === 'columns' ? 'columns' : 'rows';
                this.grandTotal = new GrandTotalConfig(config.grandTotal);
                this.subTotal = new SubTotalConfig(config.subTotal, true);
                this.width = config.width;
                this.height = config.height;
                this.showToolbar = config.showToolbar || false;
                this.theme = themeManager;

                themeManager.current(config.theme);

                // datasource field names
                this.dataSourceFieldNames = [];
                // datasource field captions
                this.dataSourceFieldCaptions = [];

                this.captionToName = function(caption) {
                    var fcaptionIndex = self.dataSourceFieldCaptions.indexOf(caption);
                    return fcaptionIndex >= 0 ? self.dataSourceFieldNames[fcaptionIndex] : caption;
                };

                this.nameToCaption = function(name) {
                    var fnameIndex = self.dataSourceFieldNames.indexOf(name);
                    return fnameIndex >= 0 ? self.dataSourceFieldCaptions[fnameIndex] : name;
                };

                this.setTheme = function(newTheme) {
                    return self.theme.current() !== self.theme.current(newTheme);
                };

                this.allFields = (config.fields || []).map(function(fieldconfig) {
                    var f = new Field(fieldconfig);
                    // map fields names to captions
                    self.dataSourceFieldNames.push(f.name);
                    self.dataSourceFieldCaptions.push(f.caption);
                    return f;
                });

                function ensureFieldConfig(obj) {
                    if (typeof obj === 'string') {
                        return {
                            name: self.captionToName(obj)
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

                this.getField = function(fieldname) {
                    return getfield(self.allFields, fieldname);
                };

                this.getRowField = function(fieldname) {
                    return getfield(self.rowFields, fieldname);
                };

                this.getColumnField = function(fieldname) {
                    return getfield(self.columnFields, fieldname);
                };

                this.getDataField = function(fieldname) {
                    return getfield(self.dataFields, fieldname);
                };

                this.availablefields = function() {
                    return self.allFields.filter(function(field) {
                        var notequalfield = function(otherfield) {
                            return field.name !== otherfield.name;
                        };

                        return self.dataFields.every(notequalfield) &&
                            self.rowFields.every(notequalfield) &&
                            self.columnFields.every(notequalfield);
                    });
                };

                this.getDataSourceFieldCaptions = function() {
                    var row0;
                    if (self.dataSource && (row0 = self.dataSource[0])) {
                        var fieldNames = utils.ownProperties(row0);
                        var headers = [];
                        for (var i = 0; i < fieldNames.length; i++) {
                            headers.push(self.nameToCaption(fieldNames[i]));
                        }
                        return headers;
                    }
                    return null;
                };

                this.getPreFilters = function() {
                    var prefilters = {};
                    if (config.preFilters) {
                        utils.ownProperties(config.preFilters).forEach(function(filteredField) {
                            var prefilterConfig = config.preFilters[filteredField];
                            if (utils.isArray(prefilterConfig)) {
                                prefilters[self.captionToName(filteredField)] = new filtering.expressionFilter(null, null, prefilterConfig, false);
                            } else {
                                var opname = utils.ownProperties(prefilterConfig)[0];
                                if (opname) {
                                    prefilters[self.captionToName(filteredField)] = new filtering.expressionFilter(opname, prefilterConfig[opname]);
                                }
                            }
                        });
                    }

                    return prefilters;
                }

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
            "./orb.aggregation": 2,
            "./orb.axe": 3,
            "./orb.filtering": 6,
            "./orb.themes": 10,
            "./orb.utils": 15
        }],
        5: [function(_dereq_, module, exports) {

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
                        self.rowIndexes = [];
                        for (var i = 0; i < self.values.length; i++) {
                            self.subdimvals[self.values[i]].getRowIndexes(self.rowIndexes);
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
        6: [function(_dereq_, module, exports) {

            var utils = _dereq_('./orb.utils');

            var filtering = module.exports = {
                ALL: '#All#',
                NONE: '#None#',
                BLANK: '#Blank#"'
            };

            filtering.expressionFilter = function(operator, term, staticValue, excludeStatic) {
                var self = this;

                this.operator = ops.get(operator);
                this.regexpMode = false;
                this.term = term || null;
                if (this.term && this.operator && this.operator.regexpSupported) {
                    if (utils.isRegExp(this.term)) {
                        this.regexpMode = true;
                        if (!this.term.ignoreCase) {
                            this.term = new RegExp(this.term.source, 'i');
                        }
                    }
                }

                this.staticValue = staticValue;
                this.excludeStatic = excludeStatic;

                this.test = function(value) {
                    if (utils.isArray(self.staticValue)) {
                        var found = self.staticValue.indexOf(value) >= 0;
                        return (self.excludeStatic && !found) || (!self.excludeStatic && found);
                    } else if (self.term) {
                        return self.operator.func(value, self.term);
                    } else if (self.staticValue === true || self.staticValue === filtering.ALL) {
                        return true;
                    } else if (self.staticValue === false || self.staticValue === filtering.NONE) {
                        return false
                    } else {
                        return true;
                    }
                }

                this.isAlwaysTrue = function() {
                    return !(self.term || utils.isArray(self.staticValue) || self.staticValue === filtering.NONE || self.staticValue === false);
                }
            };

            var ops = filtering.Operators = {
                get: function(opname) {
                    switch (opname) {
                        case ops.MATCH.name:
                            return ops.MATCH;
                        case ops.NOTMATCH.name:
                            return ops.NOTMATCH;
                        case ops.EQ.name:
                            return ops.EQ;
                        case ops.NEQ.name:
                            return ops.NEQ;
                        case ops.GT.name:
                            return ops.GT;
                        case ops.GTE.name:
                            return ops.GTE;
                        case ops.LT.name:
                            return ops.LT;
                        case ops.LTE.name:
                            return ops.LTE;
                        default:
                            return ops.NONE;
                    }
                },
                NONE: null,
                MATCH: {
                    name: 'Matches',
                    func: function(value, term) {
                        if (value) {
                            return value.toString().search(utils.isRegExp(term) ? term : new RegExp(term, 'i')) >= 0;
                        } else {
                            return !(!!term);
                        }
                    },
                    regexpSupported: true
                },
                NOTMATCH: {
                    name: 'Does Not Match',
                    func: function(value, term) {
                        if (value) {
                            return value.toString().search(utils.isRegExp(term) ? term : new RegExp(term, 'i')) < 0;
                        } else {
                            return !!term;
                        }
                    },
                    regexpSupported: true
                },
                EQ: {
                    name: '=',
                    func: function(value, term) {
                        return value == term;
                    },
                    regexpSupported: false
                },
                NEQ: {
                    name: '<>',
                    func: function(value, term) {
                        return value != term;
                    },
                    regexpSupported: false
                },
                GT: {
                    name: '>',
                    func: function(value, term) {
                        return value > term;
                    },
                    regexpSupported: false
                },
                GTE: {
                    name: '>=',
                    func: function(value, term) {
                        return value >= term;
                    },
                    regexpSupported: false
                },
                LT: {
                    name: '<',
                    func: function(value, term) {
                        return value < term;
                    },
                    regexpSupported: false
                },
                LTE: {
                    name: '<=',
                    func: function(value, term) {
                        return value <= term;
                    },
                    regexpSupported: false
                }
            };

        }, {
            "./orb.utils": 15
        }],
        7: [function(_dereq_, module, exports) {

            var axe = _dereq_('./orb.axe');
            var configuration = _dereq_('./orb.config').config;
            var filtering = _dereq_('./orb.filtering');
            var query = _dereq_('./orb.query');
            var utils = _dereq_('./orb.utils');

            module.exports = function(config) {

                var defaultfield = {
                    name: '#undefined#'
                };

                var self = this;
                var _iCache;


                this.config = new configuration(config);
                this.filters = self.config.getPreFilters();
                this.filteredDataSource = self.config.dataSource;

                this.rows = new axe(self, axe.Type.ROWS);
                this.columns = new axe(self, axe.Type.COLUMNS);
                this.dataMatrix = {};

                function refresh(refreshFilters) {
                    if (refreshFilters !== false) {
                        refreshFilteredDataSource();
                    }
                    self.rows.update();
                    self.columns.update();
                    computeValues();
                }

                function refreshFilteredDataSource() {
                    var filterFields = utils.ownProperties(self.filters);
                    if (filterFields.length > 0) {
                        self.filteredDataSource = [];

                        for (var i = 0; i < self.config.dataSource.length; i++) {
                            var row = self.config.dataSource[i];
                            var exclude = false;
                            for (var fi = 0; fi < filterFields.length; fi++) {
                                var fieldname = filterFields[fi];
                                var fieldFilter = self.filters[fieldname];

                                if (fieldFilter && !fieldFilter.test(row[fieldname])) {
                                    exclude = true;
                                    break;
                                }
                            }
                            if (!exclude) {
                                self.filteredDataSource.push(row);
                            }
                        }
                    } else {
                        self.filteredDataSource = self.config.dataSource;
                    }
                }

                this.moveField = function(fieldname, oldaxetype, newaxetype, position) {
                    if (self.config.moveField(fieldname, oldaxetype, newaxetype, position)) {
                        refresh(false);
                    }
                };

                this.applyFilter = function(fieldname, operator, term, staticValue, excludeStatic) {
                    self.filters[fieldname] = new filtering.expressionFilter(operator, term, staticValue, excludeStatic);
                    refresh();
                };

                this.refreshData = function(data) {
                    self.config.dataSource = data;
                    refresh();
                };

                this.getFieldValues = function(field, filterFunc) {
                    var values1 = [];
                    var values = [];
                    var containsBlank = false;
                    for (var i = 0; i < self.config.dataSource.length; i++) {
                        var row = self.config.dataSource[i];
                        var val = row[field];
                        if (filterFunc !== undefined) {
                            if (filterFunc === true || (typeof filterFunc === 'function' && filterFunc(val))) {
                                values1.push(val);
                            }
                        } else {
                            if (val) {
                                values1.push(val);
                            } else {
                                containsBlank = true;
                            }
                        }
                    }
                    if (values1.length > 1) {
                        if (utils.isNumber(values1[0]) || utils.isDate(values1[0])) {
                            values1.sort(function(a, b) {
                                return a ? (b ? a - b : 1) : (b ? -1 : 0);
                            });
                        } else {
                            values1.sort();
                        }

                        for (var vi = 0; vi < values1.length; vi++) {
                            if (vi === 0 || values1[vi] !== values[values.length - 1]) {
                                values.push(values1[vi]);
                            }
                        }
                    } else {
                        values = values1;
                    }
                    values.containsBlank = containsBlank;
                    return values;
                };

                this.getFieldFilter = function(field) {
                    return self.filters[field];
                }

                this.isFieldFiltered = function(field) {
                    var filter = self.getFieldFilter(field);
                    return filter != null && !filter.isAlwaysTrue();
                }

                this.getData = function(field, rowdim, coldim, aggregateFunc) {

                    if (rowdim && coldim) {

                        var datafieldName = field || (self.config.dataFields[0] || defaultfield).name;
                        var datafield = self.config.getDataField(datafieldName);

                        if (!datafield || (aggregateFunc && datafield.aggregateFunc != aggregateFunc)) {
                            return self.calcAggregation(rowdim.getRowIndexes().slice(0), coldim.getRowIndexes().slice(0), [datafieldName], aggregateFunc)[datafieldName] || null;
                        } else {
                            if (self.dataMatrix[rowdim.id] && self.dataMatrix[rowdim.id][coldim.id]) {
                                return self.dataMatrix[rowdim.id][coldim.id][datafieldName] || null;
                            }
                        }

                        return null;
                    }
                };

                this.calcAggregation = function(rowIndexes, colIndexes, fieldNames, aggregateFunc) {
                    return computeValue(rowIndexes, colIndexes, rowIndexes, fieldNames, aggregateFunc);
                }

                this.query = query(self);

                refresh();

                function computeValue(rowIndexes, colIndexes, origRowIndexes, fieldNames, aggregateFunc) {

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

                        var datasource = self.filteredDataSource;
                        var datafield;
                        var datafields = [];

                        if (fieldNames) {
                            for (var fieldnameIndex = 0; fieldnameIndex < fieldNames.length; fieldnameIndex++) {
                                datafield = self.config.getDataField(fieldNames[fieldnameIndex]);
                                if (!aggregateFunc) {
                                    if (!datafield) {
                                        datafield = self.config.getField(fieldNames[fieldnameIndex]);
                                        if (datafield) {
                                            aggregateFunc = datafield.dataSettings ? datafield.dataSettings.aggregateFunc() : datafield.aggregateFunc();
                                        }
                                    } else {
                                        aggregateFunc = datafield.aggregateFunc()
                                    }
                                }

                                if (datafield && aggregateFunc) {
                                    datafields.push({
                                        field: datafield,
                                        aggregateFunc: aggregateFunc
                                    });
                                }
                            }
                        } else {
                            for (var datafieldIndex = 0; datafieldIndex < self.config.dataFieldsCount; datafieldIndex++) {
                                datafield = self.config.dataFields[datafieldIndex] || defaultfield;
                                if (aggregateFunc || datafield.aggregateFunc) {
                                    datafields.push({
                                        field: datafield,
                                        aggregateFunc: aggregateFunc || datafield.aggregateFunc()
                                    });
                                }
                            }
                        }

                        for (var dfi = 0; dfi < datafields.length; dfi++) {
                            datafield = datafields[dfi];
                            res[datafield.field.name] = datafield.aggregateFunc(datafield.field.name, intersection || 'all', self.filteredDataSource, origRowIndexes || rowIndexes, colIndexes);
                        }
                    }

                    return res;
                }

                function computeRowValues(rowDim) {

                    if (rowDim) {
                        var data = {};
                        var rid = 'r' + rowDim.id;

                        // set cached row indexes for current row dimension
                        if (_iCache[rid] === undefined) {
                            _iCache[rid] = rowDim.isRoot ? null : (_iCache[rowDim.parent.id] || rowDim.getRowIndexes());
                        }

                        // calc grand-total cell
                        data[self.columns.root.id] = computeValue(rowDim.isRoot ? null : _iCache[rid].slice(0), null);

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

                                    data[subdim.id] = computeValue(rowindexes, _iCache[cid], rowDim.isRoot ? null : rowDim.getRowIndexes());

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

                function computeValues() {
                    self.dataMatrix = {};
                    _iCache = {};

                    // calc grand total row
                    self.dataMatrix[self.rows.root.id] = computeRowValues(self.rows.root);

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
                                self.dataMatrix[subdim.id] = computeRowValues(subdim);
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
            "./orb.axe": 3,
            "./orb.config": 4,
            "./orb.filtering": 6,
            "./orb.query": 8,
            "./orb.utils": 15
        }],
        8: [function(_dereq_, module, exports) {

            var utils = _dereq_('./orb.utils');
            var axe = _dereq_('./orb.axe');
            var aggregation = _dereq_('./orb.aggregation');

            var queryBase = function(source, query, filters) {

                var self = this;

                this.source = source;
                this.query = query;
                this.filters = filters;

                this.extractResult = function(aggs, options, outerArgs) {
                    if (outerArgs.multi === true) {
                        var res = {};
                        for (var ai = 0; ai < options.multiFieldNames.length; ai++) {
                            res[options.multiFieldNames[ai]] = aggs[self.getCaptionName(options.multiFieldNames[ai])];
                        }
                        return res;
                    } else {
                        return aggs[outerArgs.datafieldname];
                    }
                };

                this.measureFunc = function(datafieldname, multi, aggregateFunc, fieldsConfig) {

                    var outerArgs = {
                        datafieldname: self.getCaptionName(datafieldname),
                        multi: multi,
                        aggregateFunc: aggregateFunc
                    };

                    return function(options) {
                        options = self.cleanOptions(options, arguments, outerArgs);
                        var aggs = self.compute(options, fieldsConfig, multi);
                        return self.extractResult(aggs, options, outerArgs);
                    };
                };

                this.setDefaultAggFunctions = function(param) {

                    // if there is a registered field with a name or caption 'val', use 'val_'
                    var valname = self.query.val ? 'val_' : 'val';
                    self.query[valname] = self.measureFunc(undefined, true, undefined, param);


                    var aggFunctions = utils.ownProperties(aggregation);
                    for (var funcIndex = 0; funcIndex < aggFunctions.length; funcIndex++) {
                        var funcName = aggFunctions[funcIndex];
                        if (funcName !== 'toAggregateFunc') {
                            self.query[funcName] = self.measureFunc(
                                undefined,
                                true,
                                aggregation[funcName],
                                param
                            );
                        }
                    }
                }

            };

            var pgridQuery = function(pgrid) {

                queryBase.call(this, pgrid, {}, {});

                var self = this;

                this.getCaptionName = function(caption) {
                    return self.source.config.captionToName(caption);
                };

                this.cleanOptions = function(options, innerArgs, outerArgs) {
                    var opts = {
                        fieldNames: []
                    };

                    if (outerArgs.multi === true) {
                        if (options && typeof options === 'object') {
                            opts.aggregateFunc = options.aggregateFunc;
                            opts.multiFieldNames = options.fields;
                        } else {
                            opts.aggregateFunc = outerArgs.aggregateFunc;
                            opts.multiFieldNames = innerArgs;
                        }

                        for (var ai = 0; ai < opts.multiFieldNames.length; ai++) {
                            opts.fieldNames.push(self.getCaptionName(opts.multiFieldNames[ai]));
                        }
                    } else {
                        opts.aggregateFunc = options;
                        opts.fieldNames.push(outerArgs.datafieldname);
                    }

                    if (opts.aggregateFunc) {
                        opts.aggregateFunc = aggregation.toAggregateFunc(opts.aggregateFunc);
                    }

                    return opts;
                };

                this.setup = function(parameters) {
                    var rowFields = self.source.config.rowFields;
                    var colFields = self.source.config.columnFields;
                    var datafields = self.source.config.dataFields;
                    var fIndex;

                    // row fields setup
                    for (fIndex = 0; fIndex < rowFields.length; fIndex++) {
                        self.slice(rowFields[fIndex], axe.Type.ROWS, rowFields.length - fIndex);
                    }

                    // column fields setup
                    for (fIndex = 0; fIndex < colFields.length; fIndex++) {
                        self.slice(colFields[fIndex], axe.Type.COLUMNS, colFields.length - fIndex);
                    }

                    // data fields setup
                    for (fIndex = 0; fIndex < datafields.length; fIndex++) {
                        var df = datafields[fIndex];
                        var dfname = df.name;
                        var dfcaption = df.caption || dfname;

                        self.query[dfname] = self.query[dfcaption] = self.measureFunc(dfname);
                    }

                    if (parameters) {
                        for (var param in parameters) {
                            if (parameters.hasOwnProperty(param)) {
                                self.query[param](parameters[param]);
                            }
                        }
                    }

                    self.setDefaultAggFunctions();

                    return self.query;
                };

                this.slice = function(field, axetype, depth) {
                    self.query[field.name] = self.query[field.caption || field.name] = function(val) {
                        var f = {
                            name: field.name,
                            val: val,
                            depth: depth
                        };
                        (self.filters[axetype] = self.filters[axetype] || []).push(f);
                        return self.query;
                    };
                };

                function filterDimensions(upperDims, filter) {
                    return function(dim) {
                        return dim.value === filter.val &&
                            (!upperDims || upperDims.some(
                                function(upperDim) {
                                    var parent = dim.parent;
                                    if (parent) {
                                        while (parent.depth < upperDim.depth) {
                                            parent = parent.parent;
                                        }
                                    }
                                    return parent === upperDim;
                                }));
                    };
                }

                this.applyFilters = function(axetype) {
                    if (self.filters[axetype]) {
                        var sortedFilters = self.filters[axetype].sort(function(f1, f2) {
                            return f2.depth - f1.depth;
                        });

                        var currAxe = self.source[axetype === axe.Type.ROWS ? 'rows' : 'columns'];
                        var filterIndex = 0;
                        var filtered = null;
                        while (filterIndex < sortedFilters.length) {
                            var filter = sortedFilters[filterIndex];
                            filtered = currAxe.dimensionsByDepth[filter.depth]
                                .filter(filterDimensions(filtered, filter));
                            filterIndex++;
                        }
                        return filtered;
                    }
                    return null;
                };

                this.compute = function(options) {
                    var rowdims = self.applyFilters(axe.Type.ROWS) || [self.source.rows.root];
                    var coldims = self.applyFilters(axe.Type.COLUMNS) || [self.source.columns.root];

                    var aggs;

                    if (rowdims.length === 1 && coldims.length === 1) {
                        aggs = {};
                        for (var ai = 0; ai < options.fieldNames.length; ai++) {
                            aggs[options.fieldNames[ai]] = self.source.getData(options.fieldNames[ai], rowdims[0], coldims[0], options.aggregateFunc);
                        }
                    } else {
                        var rowIndexes = [];
                        var colIndexes = [];

                        for (var rdi = 0; rdi < rowdims.length; rdi++) {
                            rowIndexes = rowIndexes.concat(rowdims[rdi].getRowIndexes());
                        }
                        for (var cdi = 0; cdi < coldims.length; cdi++) {
                            colIndexes = colIndexes.concat(coldims[cdi].getRowIndexes());
                        }

                        aggs = self.source.calcAggregation(rowIndexes, colIndexes, options.fieldNames, options.aggregateFunc);
                    }

                    return aggs;
                };
            };

            var arrayQuery = function(array) {

                queryBase.call(this, array, {}, []);

                var self = this;
                var captionToName = {};

                this.setCaptionName = function(caption, name) {
                    captionToName[caption || name] = name;
                };

                this.getCaptionName = function(caption) {
                    return captionToName[caption] || caption;
                };

                this.cleanOptions = function(options, innerArgs, outerArgs) {
                    var opts = {
                        fieldNames: []
                    };

                    if (outerArgs.multi === true) {
                        if (options && typeof options === 'object') {
                            opts.aggregateFunc = options.aggregateFunc;
                            opts.multiFieldNames = options.fields;
                        } else {
                            opts.aggregateFunc = outerArgs.aggregateFunc;
                            opts.multiFieldNames = innerArgs;
                        }

                        for (var ai = 0; ai < opts.multiFieldNames.length; ai++) {
                            opts.fieldNames.push(self.getCaptionName(opts.multiFieldNames[ai]));
                        }
                    } else {
                        opts.aggregateFunc = options || outerArgs.aggregateFunc;
                        opts.fieldNames.push(outerArgs.datafieldname);
                    }

                    return opts;
                };

                this.setup = function(fieldsConfig) {

                    self.query.slice = function(field, val) {
                        var f = {
                            name: field,
                            val: val
                        };
                        self.filters.push(f);
                        return self.query;
                    };

                    if (fieldsConfig) {

                        var fieldNames = utils.ownProperties(fieldsConfig);

                        for (var fi = 0; fi < fieldNames.length; fi++) {
                            var fname = fieldNames[fi];
                            var f = fieldsConfig[fname];
                            var fcaption = f.caption || f.name;
                            f.name = fname;

                            self.setCaptionName(fcaption, fname);

                            if (f.toAggregate) {
                                self.query[fname] = self.query[fcaption] = self.measureFunc(fname, false, f.aggregateFunc);
                            } else {
                                self.slice(f);
                            }
                        }
                    }

                    self.setDefaultAggFunctions(fieldsConfig);

                    return self.query;
                };

                this.slice = function(field) {
                    self.query[field.name] = self.query[field.caption || field.name] = function(val) {
                        return self.query.slice(field.name, val);
                    };
                };

                this.applyFilters = function() {
                    var rowIndexes = [];

                    for (var i = 0; i < self.source.length; i++) {
                        var row = self.source[i];
                        var include = true;
                        for (var j = 0; j < self.filters.length; j++) {
                            var filter = self.filters[j];
                            if (row[filter.name] !== filter.val) {
                                include = false;
                                break;
                            }
                        }
                        if (include) {
                            rowIndexes.push(i);
                        }
                    }

                    return rowIndexes;
                };

                this.compute = function(options, fieldsConfig, multi) {
                    var rowIndexes = self.applyFilters();

                    var aggs = {};

                    for (var ai = 0; ai < options.fieldNames.length; ai++) {
                        var datafield = options.fieldNames[ai];
                        var aggFunc = aggregation.toAggregateFunc(
                            multi === true ?
                            options.aggregateFunc || (fieldsConfig && fieldsConfig[datafield] ?
                                fieldsConfig[datafield].aggregateFunc :
                                undefined) :
                            options.aggregateFunc);

                        aggs[datafield] = aggFunc(datafield, rowIndexes || 'all', self.source, rowIndexes, null);
                    }

                    return aggs;
                };
            };

            module.exports = function(source, fieldsConfig) {
                if (utils.isArray(source)) {
                    return new arrayQuery(source).setup(fieldsConfig);
                } else {
                    // assume it's a pgrid
                    return function(parameters) {
                        return new pgridQuery(source).setup(parameters);
                    };
                }
            };

        }, {
            "./orb.aggregation": 2,
            "./orb.axe": 3,
            "./orb.utils": 15
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

            module.exports = (function() {

                var currentTheme = 'blue';
                var themeManager = {};

                function isBootstrap() {
                    return currentTheme === 'bootstrap';
                }

                themeManager.themes = {
                    red: '#C72C48',
                    blue: '#268BD2',
                    green: '#3A9D23',
                    orange: '#f7840d',
                    flower: '#A74AC7',
                    gray: '#808080',
                    white: '#FFFFFF',
                    black: '#000000'
                };

                themeManager.current = function(newTheme) {
                    if (newTheme) {
                        currentTheme = themeManager.validateTheme(newTheme);
                    }

                    return currentTheme;
                };

                themeManager.validateTheme = function(themeName) {
                    themeName = (themeName || '').toString().trim();
                    if (!themeManager.themes[themeName] && themeName !== 'bootstrap') {
                        return 'blue';
                    } else {
                        return themeName;
                    }
                };

                themeManager.getPivotClasses = function() {
                    return {
                        container: 'orb-container orb-' + currentTheme,
                        table: 'orb' + (isBootstrap() ? ' table' : '')
                    };
                };

                themeManager.getButtonClasses = function() {
                    return {
                        pivotButton: 'fld-btn' + (isBootstrap() ? ' btn btn-default' : ''),
                        orbButton: 'orb-btn' + (isBootstrap() ? ' btn btn-default btn-xs' : '')
                    };
                };

                themeManager.getFilterClasses = function() {
                    return {
                        container: 'orb-' + currentTheme + ' orb fltr-cntnr'
                    };
                };

                themeManager.getGridClasses = function() {
                    return {
                        table: isBootstrap() ? 'table table-striped table-condensed' : 'orb-table'
                    };
                };

                themeManager.getDialogClasses = function(visible) {
                    var classes = {
                        overlay: 'orb-overlay orb-overlay-' + (visible ? 'visible' : 'hidden') + ' orb-' + currentTheme,
                        dialog: 'orb-dialog',
                        content: '',
                        header: 'orb-dialog-header',
                        title: '',
                        body: 'orb-dialog-body'
                    };

                    if (isBootstrap()) {
                        classes.overlay += ' modal';
                        classes.dialog += ' modal-dialog';
                        classes.content = 'modal-content';
                        classes.header += ' modal-header';
                        classes.title = 'modal-title';
                        classes.body += ' modal-body';
                    }
                    return classes;
                };

                return themeManager;
            }());

        }, {}],
        11: [function(_dereq_, module, exports) {

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
            "./orb.axe": 3,
            "./orb.ui.header": 12
        }],
        12: [function(_dereq_, module, exports) {

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
                    var cssclass = axetype === axe.Type.ROWS ? 'header-row' : (axetype === axe.Type.COLUMNS ? 'header-col' : '');
                    switch (headerType) {
                        case HeaderType.EMPTY:
                        case HeaderType.FIELD_BUTTON:
                            cssclass = 'empty';
                            break;
                        case HeaderType.INNER:
                            cssclass = 'header ' + cssclass;
                            break;
                        case HeaderType.WRAPPER:
                            cssclass = 'header ' + cssclass
                            break;
                        case HeaderType.SUB_TOTAL:
                            cssclass = 'header header-st ' + cssclass;
                            break;
                        case HeaderType.GRAND_TOTAL:
                            cssclass = 'header header-gt ' + cssclass;
                            break;
                    }

                    return cssclass;
                },
                getCellClass: function(rowHeaderType, colHeaderType) {
                    var cssclass = '';
                    switch (rowHeaderType) {
                        case HeaderType.GRAND_TOTAL:
                            cssclass = 'cell-gt';
                            break;
                        case HeaderType.SUB_TOTAL:
                            if (colHeaderType === HeaderType.GRAND_TOTAL) {
                                cssclass = 'cell-gt';
                            } else {
                                cssclass = 'cell-st';
                            }
                            break;
                        default:
                            if (colHeaderType === HeaderType.GRAND_TOTAL) {
                                cssclass = 'cell-gt';
                            } else if (colHeaderType === HeaderType.SUB_TOTAL) {
                                cssclass = 'cell-st';
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
                    cssclass: HeaderType.getHeaderClass(parent.type, parent.axetype),
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
            "./orb.axe": 3,
            "./orb.state": 9
        }],
        13: [function(_dereq_, module, exports) {

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
                var pivotComponent;
                var dialog = OrbReactComps.Dialog.create();


                this.pgrid = new pgrid(config);


                this.rows = null;

                this.columns = null;


                this.cells = [];

                this.layout = {
                    rowHeaders: {

                        width: null,

                        height: null
                    },
                    columnHeaders: {

                        width: null,

                        height: null,
                    },
                    pivotTable: {

                        width: null,

                        height: null
                    }
                };

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

                this.refreshData = function(data) {
                    self.pgrid.refreshData(data);
                    buildUi();
                    pivotComponent.setProps({});
                }

                this.applyFilter = function(fieldname, operator, term, staticValue, excludeStatic) {
                    self.pgrid.applyFilter(fieldname, operator, term, staticValue, excludeStatic);
                    buildUi();
                };

                this.moveField = function(field, oldAxeType, newAxeType, position) {
                    self.pgrid.moveField(field, oldAxeType, newAxeType, position);
                    buildUi();
                };

                this.changeTheme = function(newTheme) {
                    pivotComponent.changeTheme(newTheme);
                }

                this.render = function(element) {
                    renderElement = element;
                    if (renderElement) {
                        var pivotTableFactory = React.createFactory(OrbReactComps.PivotTable);
                        var pivottable = pivotTableFactory({
                            pgridwidget: self
                        });

                        pivotComponent = React.render(pivottable, element);
                    }
                };

                this.drilldown = function(dataCell, pivotId) {
                    if (dataCell) {
                        var colIndexes = dataCell.columnDimension.getRowIndexes();
                        var data = dataCell.rowDimension.getRowIndexes().filter(function(index) {
                            return colIndexes.indexOf(index) >= 0;
                        }).map(function(index) {
                            return self.pgrid.filteredDataSource[index];
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
                                    headers: self.pgrid.config.getDataSourceFieldCaptions(),
                                    data: data,
                                    theme: self.pgrid.config.theme
                                }
                            },
                            theme: self.pgrid.config.theme,
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

                    // set control layout infos		
                    self.layout = {
                        rowHeaders: {
                            width: (self.pgrid.rows.fields.length || 1) + (self.pgrid.config.dataHeadersLocation === 'rows' && self.pgrid.config.dataFieldsCount > 1 ? 1 : 0),
                            height: rowsInfoslength
                        },
                        columnHeaders: {
                            width: columnsAllHeaderslength,
                            height: (self.pgrid.columns.fields.length || 1) + (self.pgrid.config.dataHeadersLocation === 'columns' && self.pgrid.config.dataFieldsCount > 1 ? 1 : 0)
                        }
                    };

                    self.layout.pivotTable = {
                        width: self.layout.rowHeaders.width + self.layout.columnHeaders.width,
                        height: self.layout.rowHeaders.height + self.layout.columnHeaders.height
                    };

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
                            arr[0] = new uiheaders.emptyCell(self.layout.rowHeaders.width, self.layout.columnHeaders.height - 1);
                        } else if (ci === columnsInfoslength - 1) {
                            prelength = self.layout.rowHeaders.width;
                            setArrayLength(arr, prelength + uiinfo.length);
                            if (self.pgrid.rows.fields.length > 0) {
                                for (var findex = 0; findex < self.pgrid.config.rowFields.length; findex++) {
                                    arr[findex] = new uiheaders.buttonCell(self.pgrid.config.rowFields[findex]);
                                }
                            } else {
                                arr[0] = new uiheaders.emptyCell(self.layout.rowHeaders.width, 1);
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
            "./orb.axe": 3,
            "./orb.pgrid": 7,
            "./orb.ui.cols": 11,
            "./orb.ui.header": 12,
            "./orb.ui.rows": 14,
            "./react/orb.react.compiled": 16
        }],
        14: [function(_dereq_, module, exports) {

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
            "./orb.axe": 3,
            "./orb.ui.header": 12
        }],
        15: [function(_dereq_, module, exports) {

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

                isNumber: function(obj) {
                    return Object.prototype.toString.apply(obj) === '[object Number]';
                },

                isDate: function(obj) {
                    return Object.prototype.toString.apply(obj) === '[object Date]';
                },

                isString: function(obj) {
                    return Object.prototype.toString.apply(obj) === '[object String]';
                },

                isRegExp: function(obj) {
                    return Object.prototype.toString.apply(obj) === '[object RegExp]';
                },

                escapeRegex: function(re) {
                    return re.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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
        16: [function(_dereq_, module, exports) {

            var react = typeof window === 'undefined' ? _dereq_('react') : window.React;
            var utils = _dereq_('../orb.utils');
            var axe = _dereq_('../orb.axe');
            var uiheaders = _dereq_('../orb.ui.header');
            var filtering = _dereq_('../orb.filtering');
            var reactUtils = _dereq_('./orb.react.utils');

            var extraCol = 1;
            var comps = module.exports;

            var pivotId = 1;
            var themeChangeCallbacks = {};

            module.exports.PivotTable = react.createClass({
                id: pivotId++,
                pgrid: null,
                pgridwidget: null,
                getInitialState: function() {
                    comps.DragManager.init(this);

                    themeChangeCallbacks[this.id] = [];
                    this.registerThemeChanged(this.updateClasses);

                    this.pgridwidget = this.props.pgridwidget;
                    this.pgrid = this.pgridwidget.pgrid;
                    return {};
                },
                sort: function(axetype, field) {
                    this.pgridwidget.sort(axetype, field);
                    this.setProps({});
                },
                moveButton: function(button, newAxeType, position) {
                    this.pgridwidget.moveField(button.props.field.name, button.props.axetype, newAxeType, position);
                    this.setProps({});
                },
                expandRow: function(cell) {
                    cell.expand();
                    this.setProps({});
                },
                collapseRow: function(cell) {
                    cell.subtotalHeader.collapse();
                    this.setProps({});
                },
                applyFilter: function(fieldname, operator, term, staticValue, excludeStatic) {
                    this.pgridwidget.applyFilter(fieldname, operator, term, staticValue, excludeStatic);
                    this.setProps({});
                },
                registerThemeChanged: function(compCallback) {
                    if (compCallback) {
                        themeChangeCallbacks[this.id].push(compCallback);
                    }
                },
                unregisterThemeChanged: function(compCallback) {
                    var i;
                    if (compCallback && (i = themeChangeCallbacks[this.id].indexOf(compCallback)) >= 0) {
                        themeChangeCallbacks[this.id].splice(i, 1);
                    }
                },
                changeTheme: function(newTheme) {
                    if (this.pgridwidget.pgrid.config.setTheme(newTheme)) {
                        // notify self/sub-components of the theme change
                        for (var i = 0; i < themeChangeCallbacks[this.id].length; i++) {
                            themeChangeCallbacks[this.id][i]();
                        }
                    }
                },
                updateClasses: function() {
                    var thisnode = this.getDOMNode();
                    var classes = this.pgridwidget.pgrid.config.theme.getPivotClasses();
                    thisnode.className = classes.container;
                    thisnode.children[1].className = classes.table;
                },
                render: function() {

                    var self = this;

                    var config = this.pgridwidget.pgrid.config;
                    var PivotButton = comps.PivotButton;
                    var PivotRow = comps.PivotRow;
                    var DropTarget = comps.DropTarget;
                    var Toolbar = comps.Toolbar;

                    var fieldButtons = config.availablefields().map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: null,
                            position: index,
                            pivotTableComp: self
                        });
                    });

                    var dataButtons = config.dataFields.map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: axe.Type.DATA,
                            position: index,
                            pivotTableComp: self
                        });
                    });

                    var columnButtons = config.columnFields.map(function(field, index) {
                        return React.createElement(PivotButton, {
                            key: field.name,
                            field: field,
                            axetype: axe.Type.COLUMNS,
                            position: index,
                            pivotTableComp: self
                        });
                    });

                    // get 'row buttons' row (also last row containing column headers)
                    var rowButtons = utils.findInArray(this.pgridwidget.cells, function(row) {
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
                                pivotTableComp: self
                            });
                        });
                    } else {
                        rowButtons = [];
                    }

                    // build the cell that will contains 'row buttons'
                    var rowButtonsCell = React.createElement("td", {
                            className: "empty",
                            colSpan: this.pgridwidget.layout.rowHeaders.width + extraCol,
                            rowSpan: "1"
                        },
                        React.createElement(DropTarget, {
                            buttons: rowButtons,
                            axetype: axe.Type.ROWS
                        })
                    );

                    var rows = this.pgridwidget.cells.map(function(row, index) {
                        if (index == self.pgridwidget.layout.columnHeaders.height - 1) {
                            return React.createElement(PivotRow, {
                                key: index,
                                row: row,
                                topmost: index === 0,
                                rowButtonsCount: self.pgridwidget.layout.rowHeaders.width,
                                rowButtonsCell: rowButtonsCell,
                                pivotTableComp: self
                            });
                        } else {
                            return React.createElement(PivotRow, {
                                key: index,
                                topmost: index === 0,
                                row: row,
                                pivotTableComp: self
                            });
                        }
                    });

                    var classes = config.theme.getPivotClasses();

                    var tblStyle = {};
                    if (config.width) {
                        tblStyle.width = config.width;
                    }
                    if (config.height) {
                        tblStyle.height = config.height;
                    }

                    return (
                        React.createElement("div", {
                                className: classes.container,
                                style: tblStyle
                            },
                            React.createElement("div", {
                                    className: "orb-toolbar",
                                    style: {
                                        display: config.showToolbar ? 'block' : 'none'
                                    }
                                },
                                React.createElement(Toolbar, {
                                    pivotTableComp: self
                                })
                            ),
                            React.createElement("table", {
                                    id: "{'tbl' + self.id}",
                                    className: classes.table,
                                    style: {
                                        width: '100%'
                                    }
                                },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                                className: "flds-grp-cap av-flds text-muted",
                                                colSpan: extraCol,
                                                rowSpan: "1"
                                            },
                                            React.createElement("div", null, "Fields")
                                        ),
                                        React.createElement("td", {
                                                className: "av-flds",
                                                colSpan: this.pgridwidget.layout.pivotTable.width,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                buttons: fieldButtons,
                                                axetype: null
                                            })
                                        )
                                    ),
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                                className: "flds-grp-cap text-muted",
                                                colSpan: extraCol,
                                                rowSpan: "1"
                                            },
                                            React.createElement("div", null, "Data")
                                        ),
                                        React.createElement("td", {
                                                className: "empty",
                                                colSpan: this.pgridwidget.layout.pivotTable.width,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                buttons: dataButtons,
                                                axetype: axe.Type.DATA
                                            })
                                        )
                                    ),
                                    React.createElement("tr", null,
                                        React.createElement("td", {
                                            className: "empty",
                                            colSpan: this.pgridwidget.layout.rowHeaders.width + extraCol,
                                            rowSpan: "1"
                                        }),
                                        React.createElement("td", {
                                                className: "empty",
                                                colSpan: this.pgridwidget.layout.columnHeaders.width,
                                                rowSpan: "1"
                                            },
                                            React.createElement(DropTarget, {
                                                buttons: columnButtons,
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
                            var isleftmostHeader = index === 0;
                            return React.createElement(PivotCell, {
                                key: index,
                                cell: cell,
                                topmost: self.props.topmost,
                                rightmost: isrightmost,
                                leftmostheader: isleftmostHeader,
                                pivotTableComp: self.props.pivotTableComp
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
                                (cell.type === uiheaders.HeaderType.GRAND_TOTAL) ||
                                (cell.dim && (cell.dim.isRoot || cell.dim.parent.isRoot))
                            );
                            var isleftmostHeader = cell.template === 'cell-template-column-header' && index === 1;
                            var isleftmostDataValue = cell.template === 'cell-template-datavalue' && cell.visible() && (self.props.row[index - 1].template !== 'cell-template-datavalue' || !self.props.row[index - 1].visible());

                            return React.createElement(PivotCell, {
                                key: index,
                                cell: cell,
                                topmost: self.props.topmost,
                                leftmostheader: isleftmostHeader,
                                leftmostdatavalue: isleftmostDataValue,
                                rightmost: isrightmost,
                                leftmost: isleftmost,
                                pivotTableComp: self.props.pivotTableComp
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
                    this.props.pivotTableComp.expandRow(this.props.cell);
                },
                collapse: function() {
                    this.props.pivotTableComp.collapseRow(this.props.cell);
                },
                render: function() {
                    var self = this;
                    var cell = this.props.cell;
                    var divcontent = [];
                    var value;
                    var cellClick;
                    var headerPushed = false;

                    switch (cell.template) {
                        case 'cell-template-row-header':
                        case 'cell-template-column-header':
                            var isWrapper = cell.type === uiheaders.HeaderType.WRAPPER && cell.dim.field.subTotal.visible && cell.dim.field.subTotal.collapsible && cell.subtotalHeader.expanded;
                            var isSubtotal = cell.type === uiheaders.HeaderType.SUB_TOTAL && !cell.expanded;
                            if (isWrapper || isSubtotal) {
                                headerPushed = true;

                                divcontent.push(React.createElement("table", {
                                        key: "header-value"
                                    },
                                    React.createElement("tbody", null,
                                        React.createElement("tr", null, React.createElement("td", {
                                                className: "orb-tgl-btn"
                                            }, React.createElement("div", {
                                                className: 'orb-tgl-btn-' + (isWrapper ? 'down' : 'right'),
                                                onClick: (isWrapper ? this.collapse : this.expand)
                                            })),
                                            React.createElement("td", {
                                                className: "hdr-val"
                                            }, React.createElement("div", null, cell.value)))
                                    )));
                            }
                            value = cell.value;
                            break;
                        case 'cell-template-dataheader':
                            value = cell.value.caption;
                            break;
                        case 'cell-template-datavalue':
                            value = (cell.datafield && cell.datafield.formatFunc) ? cell.datafield.formatFunc()(cell.value) : cell.value;
                            cellClick = function() {
                                self.props.pivotTableComp.pgridwidget.drilldown(cell, self.props.pivotTableComp.id);
                            }
                            break;
                        default:
                            break;
                    }

                    if (!headerPushed) {
                        divcontent.push(React.createElement("div", {
                            key: "cell-value",
                            className: cell.template !== 'cell-template-datavalue' ? 'hdr-val' : ''
                        }, React.createElement("div", null, value)));
                    }

                    return React.createElement("td", {
                            className: getClassname(this.props),
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

            function getClassname(compProps) {
                var cell = compProps.cell;
                var classname = cell.cssclass;
                var isHidden = !cell.visible();
                var isEmpty = cell.template === 'cell-template-empty';

                if (isHidden) {
                    classname += ' cell-hidden';
                }

                if (compProps.leftmostheader || compProps.leftmostdatavalue || (compProps.leftmost && !isEmpty)) {
                    classname += ' cell-leftmost';
                }

                if (compProps.topmost && !isEmpty) {
                    classname += ' cell-topmost';
                }

                if (compProps.rightmost && (cell.axetype !== axe.Type.COLUMNS || cell.type === uiheaders.HeaderType.GRAND_TOTAL)) {
                    classname += ' cell-rightmost';
                }

                if (cell.template === 'cell-template-column-header' || cell.template === 'cell-template-dataheader') {
                    classname += ' cntr';
                }

                return classname;
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
                    return reactUtils.forEach(_dropTargets, function(target) {
                        if (target.component.state.isover) {
                            return target;
                        }
                    }, true);
                }

                function getDropIndicator() {
                    return reactUtils.forEach(_dropIndicators, function(indicator) {
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
                                reactUtils.forEach(_dropTargets, function(target) {
                                    signalDragEnd(target);
                                });

                                reactUtils.forEach(_dropIndicators, function(indicator) {
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

                            reactUtils.forEach(_dropTargets, function(target) {
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
                                reactUtils.forEach(_dropIndicators, function(indicator, index) {
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
                                reactUtils.forEach(_dropIndicators, function(indicator, index) {
                                    signalDragEnd(indicator);
                                });
                            }
                        }
                    }
                };
            }());

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
                    var classname = 'drp-indic';

                    if (this.props.isFirst) {
                        classname += ' drp-indic-first';
                    }

                    if (this.props.isLast) {
                        classname += ' drp-indic-last';
                    }

                    var style = {};
                    if (this.state.isover) {
                        classname += ' drp-indic-over';
                    }

                    return React.createElement("div", {
                        style: style,
                        className: classname
                    });
                }
            });

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
                    var buttons = this.props.buttons.map(function(button, index) {
                        if (index < self.props.buttons.length - 1) {
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
                            className: 'drp-trgt' + (this.state.isover ? ' drp-trgt-over' : '')
                        },
                        buttons
                    );
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
                onFilterMouseDown: function(e) {
                    // left mouse button only
                    if (e.button !== 0) return;

                    var filterButton = this.getDOMNode().childNodes[0].rows[0].cells[2].childNodes[0];
                    var filterButtonPos = reactUtils.getOffset(filterButton);
                    var filterContainer = document.createElement('div');

                    var filterPanelFactory = React.createFactory(comps.FilterPanel);
                    var filterPanel = filterPanelFactory({
                        field: this.props.field.name,
                        pivotTableComp: this.props.pivotTableComp
                    });

                    filterContainer.className = this.props.pivotTableComp.pgrid.config.theme.getFilterClasses().container;
                    filterContainer.style.top = filterButtonPos.y + 'px';
                    filterContainer.style.left = filterButtonPos.x + 'px';
                    document.body.appendChild(filterContainer);

                    React.render(filterPanel, filterContainer);

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
                componentDidMount: function() {
                    this.props.pivotTableComp.registerThemeChanged(this.updateClasses);
                },
                componentWillUnmount: function() {
                    this.props.pivotTableComp.unregisterThemeChanged(this.updateClasses);
                    document.removeEventListener('mousemove', this.onMouseMove);
                    document.removeEventListener('mouseup', this.onMouseUp);
                },
                onMouseDown: function(e) {
                    // drag/sort with left mouse button
                    if (e.button !== 0) return;

                    var thispos = reactUtils.getOffset(this.getDOMNode());

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
                        this.props.pivotTableComp.sort(this.props.axetype, this.props.field);
                    }

                    return true;
                },
                onMouseMove: function(e) {
                    // if the mouse is not down while moving, return (no drag)
                    if (!this.state.mousedown) return;

                    var size = null;
                    if (!this.state.dragging) {
                        size = reactUtils.getSize(this.getDOMNode());
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
                updateClasses: function() {
                    this.getDOMNode().className = this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().pivotButton;
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

                    var sortIndicator = self.props.field.sort.order === 'asc' ?
                        ' \u2191' :
                        (self.props.field.sort.order === 'desc' ?
                            ' \u2193' :
                            '');

                    var filterClass = (self.state.dragging ? '' : 'fltr-btn') + (this.props.pivotTableComp.pgrid.isFieldFiltered(this.props.field.name) ? ' fltr-btn-active' : '');
                    var fieldAggFunc = '';
                    if (self.props.axetype === axe.Type.DATA) {
                        fieldAggFunc = React.createElement("small", null, ' (' + self.props.field.aggregateFuncName + ')');
                    }

                    return React.createElement("div", {
                            key: self.props.field.name,
                            className: this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().pivotButton,
                            onMouseDown: this.onMouseDown,
                            style: divstyle
                        },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", {
                                        style: {
                                            padding: 0
                                        }
                                    }, self.props.field.caption, fieldAggFunc),
                                    React.createElement("td", {
                                        style: {
                                            padding: 0,
                                            width: 13
                                        }
                                    }, sortIndicator),
                                    React.createElement("td", {
                                            style: {
                                                padding: 0,
                                                verticalAlign: 'top'
                                            }
                                        },
                                        React.createElement("div", {
                                            className: filterClass,
                                            onMouseDown: self.state.dragging ? null : this.onFilterMouseDown
                                        })
                                    )
                                )
                            )
                        )
                    );
                }
            });

            module.exports.FilterPanel = react.createClass({
                pgridwidget: null,
                values: null,
                filterManager: null,
                getInitialState: function() {
                    this.pgridwidget = this.props.pivotTableComp.pgridwidget;
                    return {};
                },
                destroy: function() {
                    var container = this.getDOMNode().parentNode;
                    React.unmountComponentAtNode(container);
                    container.parentNode.removeChild(container);
                },
                onFilter: function(operator, term, staticValue, excludeStatic) {
                    this.props.pivotTableComp.applyFilter(this.props.field, operator, term, staticValue, excludeStatic);
                    this.destroy();
                },
                onMouseDown: function(e) {
                    var container = this.getDOMNode().parentNode;
                    var target = e.target;
                    while (target != null) {
                        if (target == container) {
                            return true;
                        }
                        target = target.parentNode;
                    }

                    this.destroy();
                },
                onMouseWheel: function(e) {
                    var valuesTable = this.getDOMNode().rows[1].cells[0].children[0];
                    var target = e.target;
                    while (target != null) {
                        if (target == valuesTable) {
                            if (valuesTable.scrollHeight <= valuesTable.clientHeight) {
                                e.stopPropagation();
                                e.preventDefault();
                            }
                            return;
                        }
                        target = target.parentNode;
                    }

                    this.destroy();
                },
                componentWillMount: function() {
                    document.addEventListener('mousedown', this.onMouseDown);
                    document.addEventListener('wheel', this.onMouseWheel);
                    window.addEventListener('resize', this.destroy);
                },
                componentDidMount: function() {
                    this.filterManager.init(this.getDOMNode());
                },
                componentWillUnmount: function() {
                    document.removeEventListener('mousedown', this.onMouseDown);
                    document.removeEventListener('wheel', this.onMouseWheel);
                    window.removeEventListener('resize', this.destroy);
                },
                render: function() {
                    var Dropdown = comps.Dropdown;
                    var checkboxes = [];

                    this.filterManager = new FilterManager(this, this.pgridwidget.pgrid.getFieldFilter(this.props.field));
                    this.values = this.pgridwidget.pgrid.getFieldValues(this.props.field);

                    function addCheckboxRow(value, text) {
                        return checkboxes.push(React.createElement("tr", {
                                key: value
                            },
                            React.createElement("td", {
                                    className: "fltr-chkbox"
                                },
                                React.createElement("input", {
                                    type: "checkbox",
                                    value: value,
                                    defaultChecked: "checked"
                                })
                            ),
                            React.createElement("td", {
                                className: "fltr-val",
                                title: text || value
                            }, text || value)
                        ));
                    }

                    addCheckboxRow(filtering.ALL, '(Show All)');
                    if (this.values.containsBlank) {
                        addCheckboxRow(filtering.BLANK, '(Blank)');
                    }

                    for (var i = 0; i < this.values.length; i++) {
                        addCheckboxRow(this.values[i]);
                    }

                    var buttonClass = this.props.pivotTableComp.pgrid.config.theme.getButtonClasses().orbButton;
                    var pivotStyle = window.getComputedStyle(this.props.pivotTableComp.getDOMNode(), null);
                    var style = {
                        fontFamily: pivotStyle.getPropertyValue('font-family'),
                        fontSize: pivotStyle.getPropertyValue('font-size')
                    };

                    var currentFilter = this.pgridwidget.pgrid.getFieldFilter(this.props.field);

                    return React.createElement("table", {
                            className: "fltr-scntnr",
                            style: style
                        },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", {
                                        className: "srchop-col"
                                    },
                                    React.createElement(Dropdown, {
                                        values: [
                                            filtering.Operators.MATCH.name,
                                            filtering.Operators.NOTMATCH.name,
                                            filtering.Operators.EQ.name,
                                            filtering.Operators.NEQ.name,
                                            filtering.Operators.GT.name,
                                            filtering.Operators.GTE.name,
                                            filtering.Operators.LT.name,
                                            filtering.Operators.LTE.name
                                        ],
                                        selectedValue: currentFilter && currentFilter.operator ? currentFilter.operator.name : filtering.Operators.MATCH.name,
                                        onValueChanged: this.filterManager.onOperatorChanged
                                    })
                                ),
                                React.createElement("td", {
                                    className: "srchtyp-col",
                                    title: "Enable/disable Regular expressions"
                                }, ".*"),
                                React.createElement("td", {
                                    className: "srchbox-col"
                                }, React.createElement("input", {
                                    type: "text",
                                    placeholder: "search"
                                }))
                            ),
                            React.createElement("tr", null,
                                React.createElement("td", {
                                        colSpan: "3",
                                        className: "fltr-vals-col"
                                    },
                                    React.createElement("table", {
                                            className: "fltr-vals-tbl"
                                        },
                                        React.createElement("tbody", null,
                                            checkboxes
                                        )
                                    )
                                )
                            ),
                            React.createElement("tr", {
                                    className: "bottom-row"
                                },
                                React.createElement("td", {
                                        className: "cnfrm-btn-col",
                                        colSpan: "2"
                                    },
                                    React.createElement("input", {
                                        type: "button",
                                        className: buttonClass,
                                        value: "Ok",
                                        style: {
                                            float: 'left'
                                        }
                                    }),
                                    React.createElement("input", {
                                        type: "button",
                                        className: buttonClass,
                                        value: "Cancel",
                                        style: {
                                            float: 'left'
                                        }
                                    })
                                ),
                                React.createElement("td", {
                                        className: "resize-col"
                                    },
                                    React.createElement("div", null)
                                )
                            )
                        )
                    );
                }
            });

            function FilterManager(reactComp, initialFilterObject) {

                var self = this;
                var INDETERMINATE = 'indeterminate';

                var savedCheckedValues;
                var isSearchMode = false;
                var isRegexMode = false;
                var operator = filtering.Operators.MATCH;
                var lastSearchTerm = '';

                var elems = {
                    filterContainer: null,
                    checkboxes: {},
                    searchBox: null,
                    operatorBox: null,
                    allCheckbox: null,
                    addCheckbox: null,
                    enableRegexButton: null,
                    okButton: null,
                    cancelButton: null,
                    resizeGrip: null
                };

                var resizeManager;

                this.init = function(filterContainerElement) {

                    elems.filterContainer = filterContainerElement;
                    elems.checkboxes = {};
                    elems.searchBox = elems.filterContainer.rows[0].cells[2].children[0];
                    elems.operatorBox = elems.filterContainer.rows[0].cells[0].children[0];
                    elems.okButton = elems.filterContainer.rows[2].cells[0].children[0];
                    elems.cancelButton = elems.filterContainer.rows[2].cells[0].children[1];
                    elems.resizeGrip = elems.filterContainer.rows[2].cells[1].children[0];

                    var rows = elems.filterContainer.rows[1].cells[0].children[0].rows;
                    for (var i = 0; i < rows.length; i++) {
                        var checkbox = rows[i].cells[0].children[0];
                        elems.checkboxes[checkbox.value] = checkbox;
                    }

                    elems.allCheckbox = elems.checkboxes[filtering.ALL];
                    elems.addCheckbox = null;
                    elems.enableRegexButton = elems.filterContainer.rows[0].cells[1];

                    resizeManager = new ResizeManager(elems.filterContainer.parentNode, elems.filterContainer.rows[1].cells[0].children[0], elems.resizeGrip);

                    applyInitialFilterObject();
                    addEventListeners();
                };

                this.onOperatorChanged = function(newOperator) {
                    if (operator.name !== newOperator) {
                        operator = filtering.Operators.get(newOperator);
                        self.toggleRegexpButtonVisibility();
                        self.searchChanged('operatorChanged');
                    }
                };

                function checkboxVisible(checkbox, isVisible) {
                    if (isVisible != null) {
                        checkbox.parentNode.parentNode.style.display = isVisible ? '' : 'none';
                    } else {
                        return checkbox.parentNode.parentNode.style.display != 'none';
                    }
                }

                function applyInitialFilterObject() {
                    if (initialFilterObject) {
                        var staticInfos = {
                            values: initialFilterObject.staticValue,
                            toExclude: initialFilterObject.excludeStatic
                        };

                        if (initialFilterObject.term) {
                            isSearchMode = true;

                            operator = initialFilterObject.operator;
                            self.toggleRegexpButtonVisibility();

                            if (initialFilterObject.regexpMode) {
                                isRegexMode = true;
                                self.toggleRegexpButtonState();
                                lastSearchTerm = initialFilterObject.term.source;
                            } else {
                                lastSearchTerm = initialFilterObject.term;
                            }

                            elems.searchBox.value = lastSearchTerm;

                            self.applyFilterTerm(initialFilterObject.operator, initialFilterObject.term);
                        } else {
                            savedCheckedValues = staticInfos;
                        }

                        self.updateCheckboxes(staticInfos);
                        self.updateAllCheckbox();
                    }
                }

                function addEventListeners() {
                    self.toggleRegexpButtonVisibility();

                    elems.filterContainer.addEventListener('click', self.valueChecked);
                    elems.searchBox.addEventListener('keyup', self.searchChanged);

                    elems.okButton.addEventListener('click', function() {
                        var checkedObj = self.getCheckedValues();
                        reactComp.onFilter(operator.name, operator.regexpSupported && isSearchMode && isRegexMode ? new RegExp(lastSearchTerm, 'i') : lastSearchTerm, checkedObj.values, checkedObj.toExclude);
                    });
                    elems.cancelButton.addEventListener('click', function() {
                        reactComp.destroy();
                    });
                }

                function ResizeManager(outerContainerElem, valuesTableElem, resizeGripElem) {

                    var minContainerWidth = 301;
                    var minContainerHeight = 223;

                    var mousedownpos = {
                        x: 0,
                        y: 0
                    };
                    var isMouseDown = false;

                    this.resizeMouseDown = function(e) {
                        // drag/sort with left mouse button
                        if (e.button !== 0) return;

                        isMouseDown = true;
                        document.body.style.cursor = 'se-resize';

                        mousedownpos.x = e.pageX;
                        mousedownpos.y = e.pageY;

                        // prevent event bubbling (to prevent text selection while dragging for example)
                        e.stopPropagation();
                        e.preventDefault();
                    };

                    this.resizeMouseUp = function() {
                        isMouseDown = false;
                        document.body.style.cursor = 'auto';
                        return true;
                    };

                    this.resizeMouseMove = function(e) {
                        // if the mouse is not down while moving, return (no drag)
                        if (!isMouseDown) return;

                        var resizeGripSize = resizeGripElem.getBoundingClientRect();
                        var outerContainerSize = outerContainerElem.getBoundingClientRect();
                        var valuesTableSize = valuesTableElem.getBoundingClientRect();

                        var outerContainerWidth = outerContainerSize.right - outerContainerSize.left;
                        var outerContainerHeight = outerContainerSize.bottom - outerContainerSize.top;

                        var offset = {
                            x: outerContainerWidth <= minContainerWidth && e.pageX < resizeGripSize.left ? 0 : e.pageX - mousedownpos.x,
                            y: outerContainerHeight <= minContainerHeight && e.pageY < resizeGripSize.top ? 0 : e.pageY - mousedownpos.y
                        };

                        var newContainerWidth = outerContainerWidth + offset.x;
                        var newContainerHeight = outerContainerHeight + offset.y;

                        mousedownpos.x = e.pageX;
                        mousedownpos.y = e.pageY;

                        if (newContainerWidth >= minContainerWidth) {
                            outerContainerElem.style.width = newContainerWidth + 'px';
                        }

                        if (newContainerHeight >= minContainerHeight) {
                            outerContainerElem.style.height = newContainerHeight + 'px';
                            valuesTableElem.style.height = (valuesTableSize.bottom - valuesTableSize.top + offset.y) + 'px';
                        }

                        e.stopPropagation();
                        e.preventDefault();
                    };

                    resizeGripElem.addEventListener('mousedown', this.resizeMouseDown);
                    document.addEventListener('mouseup', this.resizeMouseUp);
                    document.addEventListener('mousemove', this.resizeMouseMove);
                }

                this.toggleRegexpButtonVisibility = function() {
                    if (operator.regexpSupported) {
                        elems.enableRegexButton.addEventListener('click', self.regexpActiveChanged);
                        elems.enableRegexButton.className = elems.enableRegexButton.className.replace(/\s+srchtyp\-col\-hidden/, '');

                    } else {
                        elems.enableRegexButton.removeEventListener('click', self.regexpActiveChanged);
                        elems.enableRegexButton.className += ' srchtyp-col-hidden';
                    }
                }

                this.toggleRegexpButtonState = function() {
                    elems.enableRegexButton.className = elems.enableRegexButton.className.replace('srchtyp-col-active', '');
                    if (isRegexMode) {
                        elems.enableRegexButton.className += ' srchtyp-col-active';
                    }
                }

                this.regexpActiveChanged = function() {
                    isRegexMode = !isRegexMode;
                    self.toggleRegexpButtonState();
                    self.searchChanged('regexModeChanged');
                };

                this.valueChecked = function(e) {
                    var target = e.target;
                    if (target && target.type && target.type === 'checkbox') {
                        if (target == elems.allCheckbox) {
                            self.updateCheckboxes({
                                values: elems.allCheckbox.checked
                            });
                        } else {
                            self.updateAllCheckbox();
                        }
                    }
                };

                this.applyFilterTerm = function(operator, term) {
                    var defaultVisible = term ? false : true;
                    var opterm = operator.regexpSupported && isSearchMode ? (isRegexMode ? term : utils.escapeRegex(term)) : term;
                    checkboxVisible(elems.allCheckbox, defaultVisible);
                    for (var i = 0; i < reactComp.values.length; i++) {
                        var val = reactComp.values[i];
                        var checkbox = elems.checkboxes[val];
                        var visible = !isSearchMode || operator.func(val, opterm);
                        checkboxVisible(checkbox, visible);
                        checkbox.checked = visible;
                    }
                }

                this.searchChanged = function(e) {
                    var search = (elems.searchBox.value || '').trim();
                    if (e === 'operatorChanged' || (e === 'regexModeChanged' && search) || search != lastSearchTerm) {
                        lastSearchTerm = search;

                        var previousIsSearchMode = isSearchMode;
                        isSearchMode = search !== '';

                        if (isSearchMode && !previousIsSearchMode) {
                            savedCheckedValues = self.getCheckedValues();
                        }

                        //var searchTerm = operator.regexpSupported && isSearchMode ? new RegExp(isRegexMode ? search : utils.escapeRegex(search), 'i') : search;
                        if (e !== 'operatorChanged' || isSearchMode) {
                            self.applyFilterTerm(operator, search);
                        }

                        if (!isSearchMode && previousIsSearchMode) {
                            self.updateCheckboxes(savedCheckedValues);
                        }

                        self.updateAllCheckbox();
                    }
                };

                this.getCheckedValues = function() {
                    if (!isSearchMode && !elems.allCheckbox.indeterminate) {
                        return {
                            values: elems.allCheckbox.checked ? filtering.ALL : filtering.NONE,
                            toExclude: false
                        };
                    } else {
                        var staticValue;
                        var i,
                            val,
                            checkbox;
                        var valuesCount = 0,
                            checkedCount = 0;

                        for (i = 0; i < reactComp.values.length; i++) {
                            val = reactComp.values[i];
                            checkbox = elems.checkboxes[val];
                            if (checkboxVisible(checkbox)) {
                                valuesCount++;
                                if (checkbox.checked) {
                                    checkedCount++;
                                }
                            }
                        }

                        if (checkedCount == 0) {
                            staticValue = filtering.NONE;
                        } else if (checkedCount == valuesCount) {
                            staticValue = filtering.ALL;
                        } else {
                            staticValue = [];
                            var excludeUnchecked = checkedCount > (valuesCount / 2 + 1);

                            for (i = 0; i < reactComp.values.length; i++) {
                                val = reactComp.values[i];
                                checkbox = elems.checkboxes[val];
                                if (checkboxVisible(checkbox)) {
                                    if ((!excludeUnchecked && checkbox.checked) || (excludeUnchecked && !checkbox.checked)) {
                                        staticValue.push(val);
                                    }
                                }
                            }
                        }
                        return {
                            values: staticValue,
                            toExclude: excludeUnchecked
                        };
                    }
                };

                this.updateCheckboxes = function(checkedList) {
                    var values = checkedList ? checkedList.values : null;
                    var allchecked = utils.isArray(values) ?
                        null :
                        (values == null || values === filtering.ALL ?
                            true :
                            (values === filtering.NONE ?
                                false :
                                !!values
                            )
                        );
                    for (var i = 0; i < reactComp.values.length; i++) {
                        var val = reactComp.values[i];
                        var checkbox = elems.checkboxes[val];
                        if (checkboxVisible(checkbox)) {
                            if (allchecked != null) {
                                checkbox.checked = allchecked;
                            } else {
                                var valInList = values.indexOf(val) >= 0;
                                checkbox.checked = checkedList.toExclude ? !valInList : valInList;
                            }
                        }
                    }
                };

                this.updateAllCheckbox = function() {
                    if (!isSearchMode) {
                        var allchecked = null;
                        for (var i = 0; i < reactComp.values.length; i++) {
                            var checkbox = elems.checkboxes[reactComp.values[i]];
                            if (allchecked == null) {
                                allchecked = checkbox.checked;
                            } else {
                                if (allchecked !== checkbox.checked) {
                                    allchecked = INDETERMINATE;
                                    break;
                                }
                            }
                        }

                        if (allchecked === INDETERMINATE) {
                            elems.allCheckbox.indeterminate = true;
                            elems.allCheckbox.checked = false;
                        } else {
                            elems.allCheckbox.indeterminate = false;
                            elems.allCheckbox.checked = allchecked;
                        }
                    }
                };
            }

            module.exports.Dropdown = react.createClass({
                openOrClose: function(e) {
                    var valueNode = this.refs.valueElement.getDOMNode();
                    var valuesListNode = this.refs.valuesList.getDOMNode();
                    if (e.target === valueNode && valuesListNode.style.display === 'none') {
                        valuesListNode.style.display = 'block';
                    } else {
                        valuesListNode.style.display = 'none';
                    }
                },
                onMouseEnter: function() {
                    var valueNode = this.refs.valueElement.getDOMNode();
                    valueNode.className = "orb-tgl-btn-down";
                    valueNode.style.backgroundPosition = 'right center';
                },
                onMouseLeave: function() {
                    this.refs.valueElement.getDOMNode().className = "";
                },
                componentDidMount: function() {
                    document.addEventListener('click', this.openOrClose);
                },
                componentWillUnmount: function() {
                    document.removeEventListener('click', this.openOrClose);
                },
                selectValue: function(e) {
                    var listNode = this.refs.valuesList.getDOMNode();
                    var target = e.target;
                    var isli = false;
                    while (!isli && target != null) {
                        if (target.parentNode == listNode) {
                            isli = true;
                            break;
                        }
                        target = target.parentNode;
                    }

                    if (isli) {
                        var value = target.textContent;
                        var valueElement = this.refs.valueElement.getDOMNode();
                        if (valueElement.textContent != value) {
                            valueElement.textContent = value;
                            if (this.props.onValueChanged) {
                                this.props.onValueChanged(value);
                            }
                        }
                    }
                },
                render: function() {
                    function createSelectValueFunc(value) {
                        return function() {
                            this.selectValue(value);
                        };
                    }

                    var values = [];
                    for (var i = 0; i < this.props.values.length; i++) {
                        values.push(React.createElement("li", {
                            dangerouslySetInnerHTML: {
                                __html: this.props.values[i]
                            }
                        }))
                    }

                    return React.createElement("div", {
                            className: "orb-select"
                        },
                        React.createElement("div", {
                            ref: "valueElement",
                            dangerouslySetInnerHTML: {
                                __html: this.props.selectedValue
                            },
                            onMouseEnter: this.onMouseEnter,
                            onMouseLeave: this.onMouseLeave
                        }),
                        React.createElement("ul", {
                                ref: "valuesList",
                                style: {
                                    display: 'none'
                                },
                                onClick: this.selectValue
                            },
                            values
                        )
                    );
                }
            });

            module.exports.Grid = react.createClass({
                render: function() {
                    var data = this.props.data;
                    var headers = this.props.headers;
                    var tableClasses = this.props.theme.getGridClasses();

                    var rows = [];

                    if (headers && headers.length > 0) {
                        var headerRow = [];
                        for (var h = 0; h < headers.length; h++) {
                            headerRow.push(React.createElement("th", {
                                key: 'h' + h
                            }, headers[h]));
                        }
                        rows.push(React.createElement("tr", {
                            key: 'h'
                        }, headerRow));
                    }

                    if (data && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            var row = [];
                            for (var j = 0; j < data[i].length; j++) {
                                row.push(React.createElement("td", {
                                    key: i + '' + j
                                }, data[i][j]));
                            }
                            rows.push(React.createElement("tr", {
                                key: i
                            }, row));
                        }
                    }

                    return React.createElement("table", {
                            className: tableClasses.table
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
                        var overlay = createOverlay();

                        return {
                            show: function(props) {
                                React.render(dialogFactory(props), overlay);
                            }
                        }
                    }
                },
                overlayElement: null,
                setOverlayClass: function(visible) {
                    this.overlayElement.className = this.props.theme.getDialogClasses(visible).overlay;
                },
                componentDidMount: function() {
                    this.overlayElement = this.getDOMNode().parentNode;
                    this.setOverlayClass(true);
                    this.overlayElement.addEventListener('click', this.close);

                    var dialogElement = this.overlayElement.children[0];
                    var dialogBodyElement = dialogElement.children[0].children[1];

                    var screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
                    var screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
                    var maxHeight = 2 * screenHeight / 3;
                    maxHeight = maxHeight < 301 ? 301 : maxHeight;
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
                        this.setOverlayClass(false);
                    }
                },
                render: function() {
                    if (this.props.comp) {
                        var comp = React.createElement(this.props.comp.type, this.props.comp.props);
                        var classes = this.props.theme.getDialogClasses();

                        return React.createElement("div", {
                                className: classes.dialog,
                                style: this.props.style || {}
                            },
                            React.createElement("div", {
                                    className: classes.content
                                },
                                React.createElement("div", {
                                    className: classes.header
                                }, React.createElement("div", {
                                    className: "button-close",
                                    onClick: this.close
                                }), React.createElement("div", {
                                    className: classes.title
                                }, this.props.title)),
                                React.createElement("div", {
                                        className: classes.body
                                    },
                                    comp
                                )
                            )
                        );
                    }
                }
            });

            module.exports.Toolbar = react.createClass({
                onThemeChanged: function(newTheme) {
                    this.props.pivotTableComp.changeTheme(newTheme);
                },
                render: function() {

                    var Dropdown = comps.Dropdown;

                    var themeColors = _dereq_('../orb.themes').themes;
                    var values = [];
                    for (var color in themeColors) {
                        values.push('<div style="float: left; width: 16px; height: 16px; margin-right: 3px; border: 1px dashed lightgray; background-color: ' + themeColors[color] + '"></div><div style="float: left;">' + color + '</div>');
                    }
                    values.push('<div style="float: left; width: 16px; height: 16px; margin-right: 3px; border: 1px dashed lightgray;"></div><div style="float: left;">bootstrap</div>');

                    var buttons = [
                        React.createElement("div", {
                            className: "orb-tlbr-btn",
                            style: {
                                width: 101
                            }
                        }, React.createElement(Dropdown, {
                            values: values,
                            selectedValue: 'Theme',
                            onValueChanged: this.onThemeChanged
                        }))
                    ];

                    return React.createElement("div", null,
                        buttons
                    );
                }
            });

        }, {
            "../orb.axe": 3,
            "../orb.filtering": 6,
            "../orb.themes": 10,
            "../orb.ui.header": 12,
            "../orb.utils": 15,
            "./orb.react.utils": 17,
            "react": undefined
        }],
        17: [function(_dereq_, module, exports) {

            module.exports.forEach = function(list, func, defStop) {
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

            module.exports.getOffset = function(element) {
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

            module.exports.getSize = function(element) {
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
        }, {}]
    }, {}, [1])(1)
});
