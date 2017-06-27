/*jslint continue: true, nomen: true, plusplus: true, unparam: true, todo: true, vars: true, white: true */
/*global jQuery */

(function ($) {
    /*
     * jqGrid OData (WebApi v3/v4) support
     *
     * Authors:
     *  Mark Babayev (https://github.com/mirik123)
     * 
     * License MIT (MIT-LICENSE.txt)
     * 
     * based on Richard Bennett gist code: jqGrid.ODataExtensions.js 
     * https://gist.github.com/dealproc/6678280
     *
     * The use examples:		
     * $("#grid").jqGrid({
     *    ...,
     *    beforeInitGrid: function () {           //can be also put at: onInitGrid
     *        $(this).jqGrid('odataInit', {
     *            version: 4,
     *            odataurl: 'http://localhost:56216/odata/ODClient'
     *        });
     *    }
     * });
     * 
     * $("#grid").jqGrid({
     *    ...,
     *    beforeInitGrid: function () {
     *        $(this).jqGrid('odataInit', {
     *            version: 4,
     *            async: false,
     *            gencolumns: true,
     *            odataurl: 'http://localhost:56216/odata/ODClient',
     *            metadataurl: 'http://localhost:56216/odata/$metadata'
     *        });
     *    }
     * });
     */

    "use strict";
    $.jgrid.extend({
        odataGenColModel: function (options) {
            var $t = this[0], p = $t.p, $self = $($t);

            var o = $.extend(true, {
                parsecolfunc: null, 
                parsemetadatafunc: null, 
                successfunc: null, 
                errorfunc: null,
                metadataurl: p.url + '/$metadata',
                async: false
            }, options || {});

            $.ajax({
                url: o.metadataurl,
                type: 'GET',
                dataType: 'xml',
                async: o.async,
                cache: false
            })
            .done(function (data, st, xhr) {
                var newcol = $self.triggerHandler("jqGridODataParseMetadata", data);
                if (newcol === undefined && $.isFunction(o.parsemetadatafunc)) { newcol = o.parsemetadatafunc(data, st, xhr); }
                if (newcol !== undefined) {
                    p.colModel = newcol;
                }
                else {
                    //var xmldata = $.parseXML(xhr.responseText);
                    var props = $('EntityType[Name!="Default"] Property', data);
                    if (props.length > 0) {
                        var cols = [];
                        props.each(function (n, itm) {
                            var name = $(itm).attr('Name');
                            var type = $(itm).attr('Type').replace('Edm.', '');
                            var nullable = $(itm).attr('Nullable');

                            cols.push({ name: name, type: type, nullable: nullable });
                        });

                        if (cols.length === 0) {
                            if ($.isFunction(o.errorfunc)) { o.errorfunc(xhr, 'parse $metadata error', 0); }
                        }

                        newcol = $self.triggerHandler("jqGridODataParseColumns", cols);
                        if (newcol === undefined && $.isFunction(o.parsecolfunc)) { newcol = o.parsecolfunc(cols); }
                        if (newcol !== undefined) {
                            p.colModel = newcol;
                        }
                        else {
                            var i;
                            p.colModel = [];
                            for (i = 0; i < cols.length; i++) {
                                p.colModel.push({ label: cols[i].name, name: cols[i].name, index: cols[i].name, editable: true });
                            }
                        }
                    }
                }

                if ($.isFunction(o.successfunc)) {
                    o.successfunc();
                }
            })
            .fail(function (xhr, err, code) {
                if ($.isFunction(o.errorfunc)) { o.errorfunc(xhr, err, code); }
            });
        },

        odataInit: function (options) {
            return this.each(function () {
                var $t = this, $self = $($t), p = $t.p;
                if (!$t.grid || !p) { return; }

                var o = $.extend(true, {
                    datatype: 'json',	//json,jsonp
                    gencolumns: false,
                    odataurl: p.url                    
                }, options || {});

                if (!o.version || o.version < 4) {
                    o = $.extend(true, {
                        annotations: false,
                        annotationName: "",
                        inlinecount: true,
                        count: false,
                        top: false
                    }, o || {});
                }
                else {
                    o = $.extend(true, {
                        annotations: true,
                        annotationName: "@jqgrid.GridModelAnnotate",
                        inlinecount: false,
                        count: true,
                        top: true
                    }, o || {});
                }

                if (o.datatype === 'jsonp') { o.callback = "jsonCallback_" + Math.floor((Math.random() * 1000) + 1); }
                if (o.gencolumns) {
                    var gencol = $.extend(true, {
                        parsecolfunc: null,
                        parsemetadatafunc: null,
                        errorfunc: null,
                        successfunc: null,
                        async: false,
                        metadataurl: (options.odataurl || p.url) + '/$metadata'
                    }, options || {});

                    if (gencol.async) {
                        gencol.successfunc = function () {
                            if ($t.grid.hDiv) { $t.grid.hDiv.loading = false; }
                            $self.trigger('reloadGrid');
                        };

                        if ($t.grid.hDiv) { $t.grid.hDiv.loading = true; }
                    }

                    $self.jqGrid('odataGenColModel', gencol);
                }

                initDefaults(p, o);
            });

            function initDefaults(p, o) {
                p.inlineEditing = $.extend(true, {
                    beforeSaveRow: function (options, rowid, frmoper) {
                        if (options.extraparam.oper === 'edit') {
                            options.url = o.odataurl;
                            options.mtype = "PATCH";
                            options.url += '(' + rowid + ')';
                        }
                        else {
                            options.url = o.odataurl;
                            options.mtype = "POST";
                        }

                        return true;
                    },
                    serializeSaveData: function (postdata) {
                        return JSON.stringify(postdata);
                    },
                    ajaxSaveOptions: {
                        contentType: 'application/json;charset=utf-8',
                        datatype: 'json'
                    }
                }, p.inlineEditing || {});

                $.extend(p.formEditing, {
                    onclickSubmit: function (options, postdata, frmoper) {
                        if (frmoper === 'add') {
                            options.url = o.odataurl;
                            options.mtype = "POST";
                        }
                        else if (frmoper === 'edit') {
                            options.url = o.odataurl + '(' + postdata[p.id + "_id"] + ')';
                            options.mtype = "PUT";
                        }

                        return postdata;
                    },
                    ajaxEditOptions: {
                        contentType: 'application/json;charset=utf-8',
                        datatype: 'json'
                    },
                    serializeEditData: function (postdata) {
                        return JSON.stringify(postdata);
                    }
                });

                $.extend(p.formDeleting, {
                    url: o.odataurl,
                    mtype: "DELETE",
                    serializeDelData: function (postdata) {
                        return "";
                    },
                    onclickSubmit: function (options, postdata) {
                        options.url += '(' + postdata + ')';
                        return '';
                    },
                    ajaxDelOptions: {
                        contentType: 'application/json;charset=utf-8',
                        datatype: 'json'
                    }
                });

                $.extend(p, { 
                    serializeGridData: function (postData) {
                        postData = setupWebServiceData(p, o, postData);
                        return postData;
                    },
                    ajaxGridOptions: {
                        contentType: "application/json;charset=utf-8",
                        datatype: 'json'
                    },
                    datatype: o.datatype,
                    jsonpCallback: o.callback,
                    contentType: "application/json;charset=utf-8",
                    mtype: 'GET',
                    url: o.odataurl
                });

                if (o.annotations) {
                    $.extend(true, p, {
                        loadBeforeSend: function (jqXHR) {
                            jqXHR.setRequestHeader("Prefer", 'odata.include-annotations="*"');
                        },
                        jsonReader: {
                            root: "value",
                            repeatitems: false,
                            records: function (data) { return data[o.annotationName].records; },
                            page: function (data) { return data[o.annotationName].page; },
                            total: function (data) { return data[o.annotationName].total; },
                            userdata: function (data) { return data[o.annotationName].userdata; }
                        }
                    });
                }
                else {
                    $.extend(true, p, {
                        jsonReader: {
                            root: "value",
                            repeatitems: false,
                            records: "odata.count",
                            page: function (data) {
                                if (data["odata.nextLink"] !== undefined) {
                                    var skip = data["odata.nextLink"].split('skip=')[1];
                                    return Math.ceil(parseInt(skip, 10) / p.rowNum);
                                }
                                
                                var total = data["odata.count"];
                                return Math.ceil(parseInt(total, 10) / p.rowNum);
                            },
                            total: function (data) {
                                var total = data["odata.count"];
                                return Math.ceil(parseInt(total, 10) / p.rowNum);
                            },
                            userdata: "userdata"
                        }
                    });
                }
            }

            function setupWebServiceData(p, o, postData) {
                // basic posting parameters to the OData service.
                var params = {
                    //$top: postData.rows, //- we cannot use $top because of it removes odata.nextLink parameter
                    $skip: (parseInt(postData.page, 10) - 1) * p.rowNum,
                    $format: o.datatype
                    //$inlinecount: "allpages" //- not relevant for V4
                };

                if (o.datatype === 'jsonp') { params.$callback = o.jsonpCallback; }
                if (o.count) { params.$count = true; }
                if (o.top) { params.$top = postData.rows; }
                if (o.inlinecount) { params.$inlinecount = "allpages"; }

                // if we have an order-by clause to use, then we build it.
                if (postData.sidx) {
                    // two columns have the following data:
                    // postData.sidx = "{ColumnName} {order}, {ColumnName} "
                    // postData.sord = "{order}"
                    // we need to split sidx by the ", " and see if there are multiple columns.  If there are, we need to go through
                    // each column and get its parts, then parse that for the appropriate columns to build for the sort.

                    params.$orderby = postData.sidx + " " + postData.sord;
                }

                if (!postData._search) { return params; }
            
                // complex searching, with a groupOp.  This is for if we enable the form for multiple selection criteria.
                if (postData.filters) {
                    var filterGroup = $.parseJSON(postData.filters);
                    var groupSearch = parseFilterGroup(filterGroup, p);

                    if (groupSearch.length > 0) {
                        params.$filter = groupSearch;
                    }
                }
                else {
                    params.$filter = prepareExpression(p, postData.searchField, postData.searchString, postData.searchOper);
                }

                return params;
            }

            // builds out OData expressions... the condition.
            function prepareExpression(p, searchField, searchString, searchOper) {
                var i, col;
                
                // if we want to support "in" clauses, we need to follow this stackoverflow article:
                //http://stackoverflow.com/questions/7745231/odata-where-id-in-list-query/7745321#7745321
                // this is for basic searching, with a single term.
                if (searchField && (searchString || searchOper === 'nu' || searchOper === 'nn')) {
                    if (searchString) {
                        //append '' when searched field is of the string type
                        for (i = 0; i < p.colModel.length; i++) {
                            col = p.colModel[i];
                            if (col.name === searchField) {
                                if (col.odata === false) { return; }
                                if (col.odataunformat) {
                                    searchField = $.isFunction(col.odataunformat) ? col.odataunformat(searchField, searchString, searchOper) : col.odataunformat;
                                    if (!searchField) { return; }
                                }
                                if (!col.searchrules || (!col.searchrules.integer && !col.searchrules.date)) {
                                    searchString = "'" + searchString + "'";
                                }
                                else if (col.searchrules && col.searchrules.date) {
                                    searchString = (new Date(searchString)).toISOString();
                                    //v3: postData.searchString = "datetimeoffset'" + postData.searchString + "'";  
                                    //v2: postData.searchString = "DateTime'" + postData.searchString + "'"; 
                                }

                                break;
                            }
                        }
                    }

                    switch (searchOper) {
                        case "in":  // is in
                        case "cn":	// contains
                            return "substringof(" + searchString + ", " + searchField + ") eq true";
                            //return "indexof(tolower(" + field + "), '" + data + "') gt -1";
                        case "ni": // is not in
                        case "nc": // does not contain.
                            return "substringof(" + searchString + ", " + searchField + ") eq false";
                            //return "indexof(tolower(" + field + "), '" + data + "') eq -1";
                        case "bw": // begins with
                            return "startswith(" + searchField + ", " + searchString + ") eq true";
                        case "bn": // does not begin with
                            return "startswith(" + searchField + ", " + searchString + ") eq false";
                        case "ew": // ends with
                            return "endswith(" + searchField + ", " + searchString + ") eq true";
                        case "en": // does not end with.
                            return "endswith(" + searchField + ", " + searchString + ") eq false";
                        case "nu": // is null
                            return searchField + " eq null";
                        case "nn": // is not null
                            return searchField + " ne null";
                        default:   // eq,ne,lt,le,gt,ge,
                            return searchField + " " + searchOper + " " + searchString;
                    }
                }
            }

            // when dealing with the advanced query dialog, this parses the encapsulating Json object
            // which we will then build the advanced OData expression from.
            function parseFilterGroup(filterGroup, p) {
                var i, rule, filterText = "", filterRes;
                if (filterGroup.groups) {
                    if (filterGroup.groups.length) {
                        for (i = 0; i < filterGroup.groups.length; i++) {
                            filterText += "(" + parseFilterGroup(filterGroup.groups[i], p) + ")";

                            if (i < filterGroup.groups.length - 1) {
                                filterText += " " + filterGroup.groupOp.toLowerCase() + " ";
                            }
                        }

                        if (filterGroup.rules && filterGroup.rules.length) {
                            filterText += " " + filterGroup.groupOp.toLowerCase() + " ";
                        }
                    }
                }

                if (filterGroup.rules.length) {
                    for (i = 0; i < filterGroup.rules.length; i++) {
                        rule = filterGroup.rules[i];

                        filterRes = prepareExpression(p, rule.field, rule.data, rule.op);
                        if (filterRes) {
                            filterText += filterRes + " " + filterGroup.groupOp.toLowerCase() + " ";
                        }
                    }
                }

                filterText = filterText.trim().replace(/.(and|or)$/, '').trim();

                return filterText;
            }
        }
    });
}(jQuery));
