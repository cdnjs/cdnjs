/**
 * @license OData plugin for Free-jqGrid
 *
 * Copyright (c) 2014-2016, Mark Babayev (https://github.com/mirik123) markolog@gmail.com
 * License MIT (MIT-LICENSE.txt)
 *
 * inspired by Richard Bennett gist code: jqGrid.ODataExtensions.js
 * https://gist.github.com/dealproc/6678280
 */

/*jslint continue: true, nomen: true, plusplus: true, unparam: true, todo: true, vars: true, white: true */
/*global jQuery, define */

(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./jqdnr", "./jqmodal"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
    /*
     *Functions:
     *   parseMetadata                           - $.jgrid.odataHelper.parseMetadata(rawdata, metadatatype)
     *                                              metadatatype can be: xml,json,datajs.
     *                                             this is a generic function that can be used in external packages too, not only in jqGrid.
     *                                             It parses $metadata ajax response in xml/json format to plain javascript object.
     *                                             IT can also consume metadata returned from datajs.js method "OData.parseMetadata"
     *
     *   odataGenColModel                        - $("#grid").jqGrid('odataGenColModel', {...});
     *       This function generates jqgrid style columns by requesting odata $metadata.
     *       It is automatically called by odataInit when gencolumns=true.
     *       
     *       Options:
     *           metadatatype: 'xml'             - ajax dataType, can be json, jsonp or xml
     *           async: false                    - set ajax sync/async for $metadata request (when calling from odataInit only async=false is supported)
     *           entitySet: null                 - required field, the name of the desired entity set
     *           expandable: (none|link|json|subgrid) - the expansion type for ComplexTypes and NavigationProperties, for details see "odata colModel parameters".
     *           metadataurl: (odataurl || p.url) + '/$metadata'
     *                                           - set ajax url for $metadata request
     *           successfunc: null               - odataGenColModel callback to see when metadata request is over and jqgrid can be refreshed
     *           parsecolfunc: null              - event for converting parsed metadata data array in form of {name,type,nullable,iskey,...} to the jqgrid colModel array
     *           parsemetadatafunc: null         - event for converting unparsed metadata data (xml or json) to the jqgrid colModel array
     *           errorfunc: null                 - error callback
     *
     *       jqGrid Events:
     *           jqGridODataParseMetadata        - the same as parsemetadatafunc, when no custom function exists the default function is used: $("#grid").jqGrid('parseMetadata', rawdata, dataType)
     *           jqGridODataParseColumns         - the same as parsecolfunc, when no custom function exists the default function is used: $("#grid").jqGrid('parseColumns', {...})
     *
     *   odataInit                               - $("#grid").jqGrid('odataInit', {...});
     *       This is main plugin function. It should be called before colModel is initialized.
     *       When columns are defined manually it can be called from events beforeInitGrid, onInitGrid.
     *       When columns are created automatically it can be called from event beforeInitGrid only.
     *       
     *       Options:
     *           gencolumns: false               - automatically generate columns from odata $metadata (calls odataGenColModel)
     *           odataurl: p.url                 - required field, main odata url
     *           datatype: 'json'                - ajax dataType, can be json, jsonp or xml
     *           entitySet: null                 - required field, the name of the desired entity set
     *           annotations: false              - use odata annotations for getting jqgrid parameters: page,records,count,total
     *           annotationName: "@jqgrid.GridModelAnnotate" - odata annotations class and namespace
     *           version                         - odata version, used to set $count=true or $inlinecount=allpages
     *           errorfunc: null                 - error callback
     *           metadatatype: datatype || 'xml' - when gencolumns=true, alternative ajax dataType for $metadata request
     *           odataverbs: {                   - http verbs for odata and their corresponding actions in jqgrid
     *               inlineEditingAdd: 'POST',
     *               inlineEditingEdit: 'PATCH',
     *               formEditingAdd: 'POST',
     *               formEditingEdit: 'PUT'
     *           }
     *
     *   odata colModel parameters
     *       isnavigation                     - the column type is a NavigationProperty that points to another entity
     *       iscomplex                        - the column type is a ComplexType
     *       iscollection                     - the column is a Collection of entities that can be opened in a new subgrid
     *       nosearch                         - when true, this column is excluded from odata search
     *       unformat: function (searchField, searchString, searchOper) - works analogous to xmlmap/jsonmap,
     *                              for example the function body can be: { return searchString !== '-1' ? 'cltype/Id' : null; }
     *       expand: (link|json|subgrid) - defines data expansion types for complex amd navigation properties,
     *                              it works only with custom formatters specified in odata cmTemplates.
     *          link - the link to the property is displayed
     *          json - the property data is displayed in a json string form
     *          subgrid - jquery subgrid is opened when clicking on a link inside column
     *
     *   odata column templates (cmTemplate)
     *         odataComplexType                  - column template for odata Complex type.
     *         odataNavigationProperty           - column template for odata Navigation property.
     *
     *Plugin allows setting custom cmTemplates for any odata type, for example:
     *   $.jgrid.cmTemplate["Edm.GeographyPoint"] = {
     *       editable: false,
     *       formatter: function(cellvalue, options, rowObject) {
     *           if (!cellvalue && this.p.datatype === 'xml') {
     *               var xmlvalue = $(rowObject).filter(function() {
     *                   return this.localName.toLowerCase() === options.colModel.name.toLowerCase();
     *               });
     *               cellvalue = $.jgrid.odataHelper.convertXmlToJson(xmlvalue[0]);
     *           }
     *           if(cellvalue.crs && cellvalue.coordinates) {
     *              return $.jgrid.format('<div>{0}</div><div>[{1},{2}]</div>', cellvalue.crs.properties.name, cellvalue.coordinates[0], cellvalue.coordinates[1]);
     *           }
     *           return $.jgrid.format('<div>{0}</div>', cellvalue);
     *       }
     *   };
     *
     * Example of using standard service from http://www.odata.org/odata-services:
     * $("#grid").jqGrid({
     *    ...,
     *    beforeInitGrid: function () {
     *        $(this).jqGrid('odataInit', {
     *           annotations: false,
     *           metadatatype: 'xml',
     *           datatype: 'jsonp',
     *           version: 4,
     *           gencolumns: true,
     *           expandable: 'json',
     *           entitySet: 'Products',
     *           odataurl: "http://services.odata.org/V4/OData/OData.svc/Products",
     *           metadataurl: 'http://services.odata.org/V4/OData/OData.svc/$metadata',
     *           errorfunc: function (jqXHR, parsedError) {
     *               jqXHR = jqXHR.xhr || jqXHR;
     *               parsedError = $('#errdialog').html() + parsedError;
     *               $('#errdialog').html(parsedError).dialog('open');
     *          });
     *      }
     *  });
     *
     *  $.ajax({
     *      url: 'http://services.odata.org/V4/OData/OData.svc/$metadata',
     *      dataType: xml,
     *      type: 'GET'
     *  }).done(function(data, st, xhr) {
     *      var dataType = xhr.getResponseHeader('Content-Type').indexOf('json') >= 0 ? 'json' : 'xml';
     *      if(dataType === 'json') {
     *          data = $.jgrid.odataHelper.resolveJsonReferences(data);
     *      }
     *      data = $.jgrid.odataHelper.parseMetadata(data, dataType);
     *      var colModels = {};
     *      for (i in data) {
     *          if (data.hasOwnProperty(i) && i) {
     *             colModels[i] = $(this).jqGrid('parseColumns', data[i], 'subgrid');
     *          }
     *      }
     *      $("#grid").jqGrid({
     *        colModel: colModels['Product'],
     *        odata: {
     *           iscollection: true,
     *           subgridCols: colModels
     *        },
     *        ...,
     *        beforeInitGrid: function () {
     *            $(this).jqGrid('odataInit', {
     *               annotations: false,
     *               datatype: 'jsonp',
     *               version: 4,
     *               gencolumns: false,
     *               entitySet: 'Products',
     *               odataurl: "http://services.odata.org/V4/OData/OData.svc/Products"
     *            });
     *         }
     *     });
     * });
     *
     * Examples of using custom services from https://github.com/mirik123/jqGridSamples:
     * $("#grid").jqGrid({
     *    colModel: colModelDefinition,
     *    ...,
     *    // when columns are defined manually (gencolumns=false) the odataInit call can be also put in onInitGrid event.
     *    beforeInitGrid: function () {
     *        $(this).jqGrid('odataInit', {
     *            version: 3,
     *            gencolumns: false,
     *            odataurl: 'http://localhost:56216/odata/ODClient'
     *        });
     *    }
     * });
     * 
     * $("#grid").jqGrid({
     *    colModel: colModelDefinition,
     *    ...,
     *    beforeInitGrid: function () {
     *        $(this).jqGrid('odataInit', {
     *            version: 4,
     *            datatype: 'json',
     *            annotations: true,
     *            gencolumns: true,
     *            entitySet: 'ODClient',
     *            odataurl: 'http://localhost:56216/odata/ODClient',
     *            metadataurl: 'http://localhost:56216/odata/$metadata'
     *        });
     *    }
     * });
     *
     * $("#grid").jqGrid({
     *    colModel: colModelDefinition,
     *    ...,
     *    beforeInitGrid: function () {
     *        $(this).jqGrid('odataInit', {
     *            version: 4,
     *            datatype: 'xml',
     *            annotations: false,
     *            gencolumns: true,
     *            entitySet: 'ODClient',
     *            odataurl: 'http://localhost:56216/odata/ODClient',
     *            metadataurl: 'http://localhost:56216/odata/$metadata'
     *        });
     *    }
     * });
     */

    "use strict";
    $.jgrid.odataHelper = {
        //http://stackoverflow.com/questions/15312529/resolve-circular-references-from-json-object
        resolveJsonReferences: function (json, refs) {
            var i, ref, byid = {}; // all objects by id
            refs = refs || []; // references to objects that could not be resolved

            function recurse(obj, prop, parent) {
                if (typeof obj !== 'object' || !obj) {// a primitive value
                    return obj;
                }
                if (Object.prototype.toString.call(obj) === '[object Array]') {
                    for (i = 0; i < obj.length; i++) {
                        // check also if the array element is not a primitive value
                        if (typeof obj[i] !== 'object' || !obj[i]) {// a primitive value
                            return obj[i];
                        }
                        if (obj[i].$ref) {
                            obj[i] = recurse(obj[i], i, obj);
                        }
                        else {
                            obj[i] = recurse(obj[i], prop, obj);
                        }
                    }
                    return obj;
                }
                if (obj.$ref) { // a reference
                    ref = obj.$ref;
                    if (byid[ref]) {
                        return byid[ref];
                    }
                    // else we have to make it lazy:
                    refs.push([parent, prop, ref]);
                    return;
                }
                if (obj.$id) {
                    var id = obj.$id;
                    delete obj.$id;
                    if (obj.$values) {// an array
                        obj = obj.$values.map(recurse);
                    }
                    else {// a plain object
                        var itm;
                        for (itm in obj) {
                            if (obj.hasOwnProperty(itm)) {
                                obj[itm] = recurse(obj[itm], itm, obj);
                            }
                        }
                    }
                    byid[id] = obj;
                }
                return obj;
            }

            if (typeof json === 'string') {
                json = JSON.parse(json);
            }
            json = recurse(json); // run it!

            for (i = 0; i < refs.length; i++) { // resolve previously unknown references
                ref = refs[i];
                ref[0][ref[1]] = byid[ref[2]];
                // Notice that this throws if you put in a reference at top-level
            }

            return json;
        },

        // Changes XML to JSON
        //http://davidwalsh.name/convert-xml-json
        convertXmlToJson: function (xml) {
            // Create the return object
            var obj = {}, i, j, attribute, item, nodeName, old;

            if (!xml) { return null; }

            if (xml.nodeType === 1) { // element
                // do attributes
                if (xml.attributes.length > 0) {
                    obj["@attributes"] = {};
                    for (j = 0; j < xml.attributes.length; j++) {
                        attribute = xml.attributes.item(j);
                        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
                    }
                }
            }
            else if (xml.nodeType === 3) { // text
                obj = xml.nodeValue;
            }
            else if (!xml.nodeType) {
                obj = xml;
            }

            // do children
            if (xml.hasChildNodes && xml.hasChildNodes()) {
                for (i = 0; i < xml.childNodes.length; i++) {
                    item = xml.childNodes.item(i);
                    if (item.nodeType === 3) {
                        return item.nodeValue;
                    }

                    nodeName = item.nodeName;
                    if (obj[nodeName] === undefined) {
                        obj[nodeName] = $.jgrid.odataHelper.convertXmlToJson(item);
                    } else {
                        if (obj[nodeName].push === undefined) {
                            old = obj[nodeName];
                            obj[nodeName] = [];
                            obj[nodeName].push(old);
                        }
                        obj[nodeName].push($.jgrid.odataHelper.convertXmlToJson(item));
                    }
                }
            }

            return $.isEmptyObject(obj) ? null : obj;
        },

        parseMetadata: function (rawdata, metadatatype) {
            function parseXmlMetadata(data) {
                var entities = {}, entityValues = [], mdata = {};
                var namespace = $('Schema', data).attr('Namespace') + '.';

                $('EntityContainer EntitySet', data).each(function (i, itm) {
                    entities[$(itm).attr('EntityType').replace(namespace, '')] = $(itm).attr('Name');
                    entityValues.push($(itm).attr('Name'));
                });

                $('EntityType, ComplexType', data).each(function () {
                    var cols, props, keys, key, iskey, isComplex, isNav, entityType, attr;

                    props = $(this).find('Property,NavigationProperty');
                    keys = $('Key PropertyRef', this);
                    key = keys && keys.length > 0 ? keys.first().attr('Name') : '';
                    entityType = $(this).attr('Name');

                    if (props) {
                        cols = [];
                        props.each(function (n, itm) {
                            attr = {};
                            $.each(itm.attributes, function () {
                                attr[this.name] = this.value;
                            });

                            iskey = attr.Name === key;
                            isNav = itm.tagName === 'NavigationProperty';
                            isComplex = itm.tagName === 'Property' && $('ComplexType[Name="' + attr.Name + '"]', data).length > 0;

                            cols.push($.extend({
                                iskey: iskey,
                                isComplex: isComplex,
                                isNavigation: isNav,
                                isCollection: $.inArray(attr.Name, entityValues) >= 0
                            }, attr));
                        });

                        if(entities[entityType]) {
                            mdata[entities[entityType]] = cols;
                        }
                        mdata[entityType] = cols;
                    }
                });

                return mdata;
            }

            function parseJsonMetadata(data) {
                var cols, props, keys, key, iskey, i, j, isComplex, isNav, nullable, type, entityType, mdata = {}, entities = {}, entityValues = [];

                for (i = 0; i < data.EntityContainer.Elements.length; i++) {
                    entities[data.EntityContainer.Elements[i].Type.ElementType.Definition.Name] = data.EntityContainer.Elements[i].Name;
                    entityValues.push(data.EntityContainer.Elements[i].Name);
                }

                for (i = 0; i < data.SchemaElements.length ; i++) {
                    props = Array.prototype.concat(data.SchemaElements[i].DeclaredProperties, data.SchemaElements[i].NavigationProperties).filter(function(itm) {return !!itm;});
                    keys = data.SchemaElements[i].DeclaredKey;
                    key = keys && keys.length > 0 ? keys[0].Name : '';
                    entityType = data.SchemaElements[i].Name;

                    if (props) {
                        cols = [];
                        for (j = 0; j < props.length; j++) {
                            iskey = props[j].Name === key;
                            nullable = props[j].Type.IsNullable;
                            type = props[j].Type.Definition.Namespace + props[j].Type.Definition.Name;
                            isComplex = !!props[j].Type.Definition.DeclaredProperties;
                            isNav = !isComplex && !props[j].Type;

                            cols.push({
                                Name: props[j].Name,
                                Type: type,
                                Nullable: nullable,
                                iskey: iskey,
                                isComplex: isComplex,
                                isNavigation: isNav,
                                isCollection: $.inArray(props[j].Name, entityValues) >= 0
                            });
                        }

                        if(entities[entityType]) {
                            mdata[entities[entityType]] = cols;
                        }
                        mdata[entityType] = cols;
                    }
                }

                return mdata;
            }

            function parseDataJSMetadata(data) {
                var cols, props, keys, key, iskey, i, j, isComplex, isNav, nullable, type, entityType, mdata = {}, entities = {}, entityValues = [], entityTypes = [], complexTypes = [];
                var schema = data.dataServices.schema[0];
                var namespace = schema.namespace + '.';

                for (i = 0; i < schema.entityContainer[0].entitySet.length; i++) {
                    entities[schema.entityContainer[0].entitySet[i].entityType.replace(namespace, '')] = schema.entityContainer[0].entitySet[i].name;
                    entityValues.push(schema.entityContainer[0].entitySet[i].name);
                }

                for (i = 0; i < schema.complexType.length; i++) {
                    complexTypes.push(schema.complexType[i].name);
                }

                entityTypes = Array.prototype.concat(schema.entityType, schema.complexType).filter(function(itm) {return !!itm;});
                for (i = 0; i < entityTypes.length ; i++) {
                    props = Array.prototype.concat(entityTypes[i].property, entityTypes[i].navigationProperty).filter(function(itm) {return !!itm;});
                    keys = entityTypes[i].key;
                    key = keys && keys.propertyRef.length > 0 ? keys.propertyRef[0].name : '';
                    entityType = entityTypes[i].name;

                    if (props) {
                        cols = [];
                        for (j = 0; j < props.length; j++) {
                            iskey = props[j].name === key;
                            nullable = props[j].nullable !== "false";
                            type = props[j].type;
                            isComplex = !!props[j].type && $.inArray(props[j].type.replace(namespace, ''), complexTypes) >= 0;
                            isNav = !props[j].type;

                            cols.push({
                                Name: props[j].name,
                                Type: type,
                                Nullable: nullable,
                                iskey: iskey,
                                isComplex: isComplex,
                                isNavigation: isNav,
                                isCollection: $.inArray(props[j].name, entityValues) >= 0
                            });
                        }

                        if(entities[entityType]) {
                            mdata[entities[entityType]] = cols;
                        }
                        mdata[entityType] = cols;
                    }
                }

                return mdata;
            }

            var mdata;
            switch(metadatatype) {
                case 'xml':
                    mdata =  parseXmlMetadata(rawdata);
                    break;
                case 'json':
                    mdata =  parseJsonMetadata(rawdata);
                    break;
                case 'datajs':
                    mdata =  parseDataJSMetadata(rawdata);
                    break;
            }

            return mdata;
        },

        loadError: function (jqXHR, textStatus, errorThrown) {
            var status = jqXHR.status;
            var title = textStatus;
            var message = errorThrown;

            if (!jqXHR.responseJSON) {
                if (jqXHR.responseXML) {
                    jqXHR.responseText = jqXHR.responseText.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, "<$1$3>");
                    jqXHR.responseXML = $.parseXML(jqXHR.responseText);
                    jqXHR.responseJSON = $.jgrid.odataHelper.convertXmlToJson(jqXHR.responseXML);
                }
                else if (jqXHR.responseText) {
                    try {
                        jqXHR.responseJSON = $.parseJSON(jqXHR.responseText);
                    }
                    catch (ignore) {
                    }
                }
            }

            if (jqXHR.responseJSON) {
                var odataerr = jqXHR.responseJSON["@odata.error"] || jqXHR.responseJSON["odata.error"] || jqXHR.responseJSON.error;
                if (odataerr) {
                    if (odataerr.innererror) {
                        if (odataerr.innererror.internalexception) {
                            title = odataerr.innererror.internalexception.message;
                            message = odataerr.innererror.internalexception.stacktrace || '';
                        }
                        else {
                            title = odataerr.innererror.message;
                            message = odataerr.innererror.stacktrace || '';
                        }
                    }
                    else {
                        title = odataerr.message.value || odataerr.message;
                        message = odataerr.stacktrace || '';
                    }
                }
            }
            else if (errorThrown && $.isPlainObject(errorThrown)) {
                title = errorThrown.message;
                message = errorThrown.stack;
                status = errorThrown.code;
            }

            var errstring = "<div>Status/error code: " + status + "</div><div>Message: " + title + '</div><div style="font-size: 0.8em;">' + message + '</div><br/>';

            return errstring;
        }
    };

    $.jgrid.cmTemplate.odataComplexType = {
        editable: false,
        formatter: function (cellvalue, options, rowObject) {
            return $(this).jqGrid('odataJson', cellvalue, options, rowObject);
        }
    };

    $.jgrid.cmTemplate.odataNavigationProperty = {
        editable: false,
        formatter: function (cellvalue, options, rowObject) {
            if (!options.colModel.odata.expand || options.colModel.odata.expand === 'link') {
                return $(this).jqGrid('odataLink', cellvalue, options, rowObject);
            }
            if (options.colModel.odata.expand === 'json') {
                return $(this).jqGrid('odataJson', cellvalue, options, rowObject);
            }
            if (options.colModel.odata.expand === 'subgrid') {
                return $(this).jqGrid('odataSubgrid', cellvalue, options, rowObject);
            }
        }
    };

    $.jgrid.cmTemplate["Edm.GeographyPoint"] = {
        editable: false,
        formatter: function (cellvalue, options, rowObject) {
            if (!cellvalue && this.p.datatype === 'xml') {
                var xmlvalue = $(rowObject).filter(function () {
                    return this.localName.toLowerCase() === options.colModel.name.toLowerCase();
                });
                cellvalue = $.jgrid.odataHelper.convertXmlToJson(xmlvalue[0]);
            }

            if (cellvalue.crs && cellvalue.coordinates) {
                return $.jgrid.format('<div>{0}</div><div>[{1},{2}]</div>', cellvalue.crs.properties.name, cellvalue.coordinates[0], cellvalue.coordinates[1]);
            }

            return $.jgrid.format('<div>{0}</div>', cellvalue);
        }
    };

    $.jgrid.extend({
        odataLink: function (cellvalue, options, rowObject) {
            var keyValue, result, $p = this[0].p;
            if ($p.datatype !== 'xml') {
                if (rowObject[options.colModel.name + '@odata.navigationLink']) {
                    keyValue = rowObject[options.colModel.name + '@odata.navigationLink'];
                    result = $.jgrid.format('<a href="{0}/{1}" target="_self">{2}</a>', $p.odata.baseUrl, keyValue, options.colModel.name);
                    return result;
                }

                keyValue = rowObject[$p.jsonReader.id];
            }
            else {
                keyValue = (function (id) {
                    return $(rowObject).filter(function () {
                        return this.localName && this.localName.toLowerCase() === id;
                    }).text();
                }($p.xmlReader.id.toLowerCase()));
            }

            if ($p.odata.iscollection) {
                result = $.jgrid.format('<a href="{0}({1})/{2}" target="_self">{2}</a>', $p.url, keyValue, options.colModel.name);
            }
            else {
                result = $.jgrid.format('<a href="{0}/{1}" target="_self">{1}</a>', $p.url, options.colModel.name);
            }

            return result;
        },

        odataJson: function (cellvalue, options, rowObject) {
            var i, result, $p = this[0].p, tmpObj = {};
            if ($p.datatype === 'xml') {
                var xmlvalue = $(rowObject).filter(function () {
                    return this.localName.toLowerCase() === options.colModel.name.toLowerCase();
                });
                cellvalue = $.jgrid.odataHelper.convertXmlToJson(xmlvalue[0]);
            }

            for (i in cellvalue) {
                if (cellvalue.hasOwnProperty(i) && i && i.indexOf('@odata.') < 0 && i.indexOf('@attributes') < 0) {
                    tmpObj[i] = cellvalue[i];
                }
            }

            result = JSON.stringify(tmpObj, null, 1);
            return result;
        },

        odataSubgrid: function (cellvalue, options, rowObject) {
            var i, keyValue, result, $p = this[0].p;
            if ($p.datatype !== 'xml') {
                keyValue = rowObject[$p.jsonReader.id];
            }
            else {
                keyValue = (function (id) {
                    return $(rowObject).filter(function () {
                        return this.localName && this.localName.toLowerCase() === id;
                    }).text();
                }($p.xmlReader.id.toLowerCase()));
            }

            for (i in $p._index) {
                if ($p._index.hasOwnProperty(i) && i && keyValue === $p._index[i].toString()) {
                    keyValue = i;
                    break;
                }
            }

            var onclick = '\'$(\"#{2}\").jqGrid(\"setGridParam\", { odata: {activeEntitySet: \"{1}\" } });$(\"#{2}\").jqGrid(\"expandSubGridRow\", \"{0}\");return false;\'';
            result = '<a style="cursor:pointer" data-id="{0}" onclick=' + onclick + '>{1}</a>';
            result = $.jgrid.format(result, keyValue, options.colModel.name, options.gid);
            return result;
        },

        parseColumns: function (cols, expandable) {
            var i = 0, isInt, isNum, isDate, isBool, cmTemplate, newcol = [], searchrules, searchtype, label;
            var intTypes = 'Edm.Int16,Edm.Int32,Edm.Int64';
            var numTypes = 'Edm.Decimal,Edm.Double,Edm.Single';
            var boolTypes = 'Edm.Byte,Edm.SByte';

            for (i = 0; i < cols.length; i++) {
                isInt = intTypes.indexOf(cols[i].Type) >= 0;
                isNum = numTypes.indexOf(cols[i].Type) >= 0;
                isBool = boolTypes.indexOf(cols[i].Type) >= 0;
                isDate = cols[i].Type && (cols[i].Type.indexOf('Edm.') >= 0 && (cols[i].Type.indexOf('Date') >= 0 || cols[i].Type.indexOf('Time') >= 0));
                cmTemplate =
                    $.jgrid.cmTemplate[cols[i].Type] ? cols[i].Type :
                        cols[i].isComplex ? 'odataComplexType' :
                            cols[i].isNavigation ? 'odataNavigationProperty' :
                                isInt ? 'integerStr' :
                                    isNum ? 'numberStr' :
                                        isBool ? 'booleanCheckbox' :
                                            'text';

                searchrules = { integer: isInt, number: isNum, date: isDate, required: !cols[i].Nullable || cols[i].Nullable === 'false' };
                searchtype = isInt ? 'integer' : isNum ? 'number' : isDate ? 'datetime' : isBool ? 'checkbox' : 'text';
                label = (cols[i].isNavigation || cols[i].isComplex) ?
                '<span class="ui-icon ui-icon-arrowreturn-1-s" style="display:inline-block;vertical-align:middle;"></span>' + cols[i].Name : cols[i].Name;

                newcol.push($.extend({
                    label: label,
                    name: cols[i].Name,
                    index: cols[i].Name,
                    editable: !cols[i].isNavigation && !cols[i].iskey,
                    searchrules: searchrules,
                    editrules: searchrules,
                    searchtype: searchtype,
                    inputtype: searchtype,
                    edittype: searchtype,
                    key: cols[i].iskey,
                    odata: {
                        expand: cols[i].isNavigation ? expandable : cols[i].isComplex ? 'json' : null,
                        isnavigation: cols[i].isNavigation,
                        iscomplex: cols[i].isComplex,
                        iscollection: cols[i].isCollection
                    }
                }, $.jgrid.cmTemplate[cmTemplate]));
            }

            return newcol;
        },

        odataInit: function (options) {
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
                                if (col.odata.nosearch) { return; }
                                if (col.odata.unformat) {
                                    searchField = $.isFunction(col.odata.unformat) ? col.odata.unformat(searchField, searchString, searchOper) : col.odata.unformat;
                                    if (!searchField) { return; }
                                }
                                if (!col.searchrules || (!col.searchrules.integer && !col.searchrules.number && !col.searchrules.date)) {
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
                        case "cn":  // contains
                            //return "substringof(" + searchString + ", " + searchField + ") eq true";
                            return "indexof(" + searchField + ",tolower(" + searchString + ")) gt -1";
                        case "ni": // is not in
                        case "nc": // does not contain.
                            //return "substringof(" + searchString + ", " + searchField + ") eq false";
                            return "indexof(" + searchField + ",tolower(" + searchString + ")) eq -1";
                        case "bw": // begins with
                            return "startswith(" + searchField + "," + searchString + ") eq true";
                        case "bn": // does not begin with
                            return "startswith(" + searchField + "," + searchString + ") eq false";
                        case "ew": // ends with
                            return "endswith(" + searchField + "," + searchString + ") eq true";
                        case "en": // does not end with.
                            return "endswith(" + searchField + "," + searchString + ") eq false";
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

                filterText = filterText.trim().replace(/\s(and|or)$/, '').trim();

                return filterText;
            }

            function setupWebServiceData(p, o, postData) {
                var params = {};

                //var expandlist = p.colModel.filter(function(itm) { return itm.odata && itm.odata.isnavigation && (itm.odata.expand === 'json' || itm.odata.expand === 'subgrid'); });
                //if(expandlist.length > 0) {
                //    params.$expand = expandlist.reduce(function(x,y) { return x+','+ y.name; }, '').substring(1);
                //}

                //Query options $orderby, $count, $skip and $top cannot be applied to the requested resource
                if (!p.odata.iscollection) {
                    if (!o.version || o.version < 4) {
                        params.$format = o.datatype === 'xml' ? 'atom' : 'application/json;odata=fullmetadata';
                    }
                    else {
                        params.$format = o.datatype === 'xml' ? 'atom' : 'application/json;odata.metadata=full';
                    }

                    return params;
                }

                params = {
                    $top: postData.rows, //- $top removes odata.nextLink parameter
                    $skip: (parseInt(postData.page, 10) - 1) * p.rowNum
                };

                if (o.datatype === 'jsonp') { params.$callback = o.callback; }
                if (!o.version || o.version < 4) {
                    params.$inlinecount = "allpages";
                    params.$format = o.datatype === 'xml' ? 'atom' : 'application/json;odata=fullmetadata';
                }
                else {
                    params.$count = true;
                    params.$format = o.datatype === 'xml' ? 'atom' : 'application/json;odata.metadata=full';
                }

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

            function subgridRowExpanded(p, o, subgrid_id, row_id) {
                //var rowObject = $(this).jqGrid('getRowData', row_id, p.odata.activeEntitySet), result;
                //var rowObject = p.data[p._index[row_id]][p.odata.activeEntitySet], result;
                var result, colModel = p.colModel.filter(function (itm) { return itm.name === p.odata.activeEntitySet; })[0];
                row_id = p._index[row_id];

                if (p.odata.iscollection) {
                    result = $.jgrid.format('{0}({1})/{2}', p.url, row_id, p.odata.activeEntitySet);
                }
                else {
                    result = $.jgrid.format('{0}/{1}', p.url, p.odata.activeEntitySet);
                }

                var odatainit = {
                    datatype: o.datatype,
                    version: o.version,
                    gencolumns: false,
                    expandable: o.expandable,
                    odataurl: result,
                    errorfunc: o.errorfunc,
                    annotations: o.annotations,
                    entitySet: p.odata.activeEntitySet
                };

                $("#" + subgrid_id).html('<table id="' + subgrid_id + '_t" class="scroll"></table>');
                $("#" + subgrid_id + "_t").jqGrid({
                    colModel: p.odata.subgridCols[p.odata.activeEntitySet],
                    odata: $.extend({}, p.odata, colModel.odata),
                    loadonce: true,
                    beforeInitGrid: function () {
                        $(this).jqGrid('odataInit', odatainit);
                    },
                    loadError: function (jqXHR, textStatus, errorThrown) {
                        var parsedError = $.jgrid.odataHelper.loadError(jqXHR, textStatus, errorThrown);
                        parsedError = $('#errdialog').html() + parsedError;
                        $('#errdialog').html(parsedError).dialog('open');
                    }
                });
            }

            function initDefaults(p, o) {
                var i, defaultGetAjaxOptions = {
                        datatype: o.datatype,
                        jsonpCallback: o.callback
                    },
                    subGridRowExpandedFunc = function (subgrid_id, row_id) {
                        return subgridRowExpanded(p, o, subgrid_id, row_id);
                    };

                if (!p.odata) { p.odata = { iscollection: true }; }

                $.extend(p, {
                    serializeGridData: function (postData) {
                        postData = setupWebServiceData(p, o, postData);
                        this.p.odata.postData = postData;
                        return postData;
                    },
                    ajaxGridOptions: defaultGetAjaxOptions,
                    mtype: 'GET',
                    url: o.odataurl
                }, defaultGetAjaxOptions);

                if (p.colModel) {
                    for (i = 0; i < p.colModel.length; i++) {
                        if (p.colModel[i].odata && p.colModel[i].odata.expand === 'subgrid') {
                            p.subGrid = true;
                            p.subGridRowExpanded = subGridRowExpandedFunc;
                            p.odata.activeEntitySet = p.colModel[i].name;
                            p.loadonce = true;

                            break;
                        }
                    }
                }

                var defaultAjaxOptions = {
                    contentType: 'application/' + (o.datatype === 'jsonp' ? 'json' : o.datatype) + ';charset=utf-8',
                    datatype: (o.datatype === 'jsonp' ? 'json' : o.datatype)
                };

                p.inlineEditing = $.extend(true, {
                    beforeSaveRow: function (options, rowid) {
                        if (options.extraparam.oper === 'edit') {
                            options.url = o.odataurl;
                            options.mtype = o.odataverbs.inlineEditingEdit;
                            options.url += '(' + rowid + ')';
                        }
                        else {
                            options.url = o.odataurl;
                            options.mtype = o.odataverbs.inlineEditingAdd;
                        }

                        return true;
                    },
                    serializeSaveData: function (postdata) {
                        return JSON.stringify(postdata);
                    },
                    ajaxSaveOptions: defaultAjaxOptions
                }, p.inlineEditing || {});

                $.extend(p.formEditing, {
                    onclickSubmit: function (options, postdata, frmoper) {
                        if (frmoper === 'add') {
                            options.url = o.odataurl;
                            options.mtype = o.odataverbs.formEditingAdd;
                        }
                        else if (frmoper === 'edit') {
                            options.url = o.odataurl + '(' + postdata[p.id + "_id"] + ')';
                            options.mtype = o.odataverbs.formEditingEdit;
                        }

                        return postdata;
                    },
                    ajaxEditOptions: defaultAjaxOptions,
                    serializeEditData: function (postdata) {
                        return JSON.stringify(postdata);
                    }
                });

                $.extend(p.formDeleting, {
                    url: o.odataurl,
                    mtype: "DELETE",
                    serializeDelData: function () {
                        return "";
                    },
                    onclickSubmit: function (options, postdata) {
                        options.url += '(' + postdata + ')';
                        return '';
                    },
                    ajaxDelOptions: defaultAjaxOptions
                });

                var keyName = p.colModel.filter(function (itm) { return !!itm.key; })[0];
                keyName = keyName ? keyName.name : (p.sortname || 'id');

                if (o.datatype === 'xml') {
                    if (o.annotations) {
                        $.extend(true, p, {
                            loadBeforeSend: function (jqXHR) {
                                jqXHR.setRequestHeader("Prefer", 'odata.include-annotations="*"');
                            }
                        });
                    }

                    var root = '>feed';
                    var entry = '>entry';
                    var cell = '>content>properties';

                    $.extend(true, p, {
                        xmlReader: {
                            root: function (data) {
                                data = data.childNodes[0];
                                data.innerHTML = data.innerHTML.replace(/<(\/?)([^:>\s]*:)?([^>]+)>/g, "<$1$3>");

                                var param = $(data).attr('m:context');
                                if (param) {
                                    p.odata.baseUrl = param.substring(0, param.indexOf('/$metadata'));
                                    p.odata.entityType = param.substring(param.indexOf('#') + 1).replace('/$entity', '');
                                }

                                param = $(data).attr('m:type');
                                if (param) {
                                    p.odata.entityType = param.replace('#', '');
                                }

                                return data;
                            },
                            row: function (data) {
                                if (data.localName === 'entry') {
                                    data = [data];
                                }
                                else {
                                    data = $(entry, data);
                                }

                                return data;
                            },
                            cell: function (data) {
                                return $(cell, data).get(0).childNodes;
                            },
                            records: function (data) {
                                return $(root + entry, data).length;    //$('count', data).text()
                            },
                            page: function () {
                                var skip = p.odata.postData.$skip + p.rowNum;
                                return Math.ceil(skip / p.rowNum);
                            },
                            total: function (data) {
                                var records = $(root + entry, data).length;    //$('count', data).text()
                                var skip = p.odata.postData.$skip + p.rowNum;
                                return Math.ceil(skip / p.rowNum) + (records > 0 ? 1 : 0);
                            },
                            repeatitems: true,
                            userdata: 'userdata',
                            id: keyName
                        }
                    });
                }
                else {
                    $.extend(true, p, {
                        jsonReader: {
                            root: function (data) {
                                var param = data['@odata.context'];
                                if (param) {
                                    p.odata.baseUrl = param.substring(0, param.indexOf('/$metadata'));
                                    p.odata.entityType = param.substring(param.indexOf('#') + 1).replace('/$entity', '');
                                }

                                param = data['@odata.type'];
                                if (param) {
                                    p.odata.entityType = param.replace('#', '');
                                }

                                //data = $.jgrid.odataHelper.resolveJsonReferences(data);
                                return data.value || [data];
                            },
                            repeatitems: true,
                            id: keyName
                        }
                    });

                    if (o.annotations) {
                        $.extend(true, p, {
                            loadBeforeSend: function (jqXHR) {
                                jqXHR.setRequestHeader("Prefer", 'odata.include-annotations="*"');
                            },
                            jsonReader: {
                                records: function (data) {
                                    return data[o.annotationName].records;
                                },
                                page: function (data) { return data[o.annotationName].page; },
                                total: function (data) { return data[o.annotationName].total; },
                                userdata: function (data) { return data[o.annotationName].userdata; }
                            }
                        });
                    }
                    else {
                        $.extend(true, p, {
                            jsonReader: {
                                records: function (data) { return data["odata.count"] || data["@odata.count"]; },
                                page: function (data) {
                                    var skip;
                                    if (data["odata.nextLink"]) {
                                        skip = parseInt(data["odata.nextLink"].split('skip=')[1], 10);
                                    }
                                    else {
                                        skip = p.odata.postData.$skip + p.rowNum;
                                        var total = data["odata.count"] || data["@odata.count"];
                                        if (skip > total) { skip = total; }
                                    }

                                    return Math.ceil(skip / p.rowNum);
                                },
                                total: function (data) {
                                    var total = data["odata.count"] || data["@odata.count"];
                                    return Math.ceil(total / p.rowNum);
                                },
                                userdata: "userdata"
                            }
                        });
                    }
                }
            }

            return this.each(function () {
                var $t = this, $self = $(this), p = this.p;
                if (!$t.grid || !p) { return; }

                var o = $.extend(true, {
                    gencolumns: false,
                    odataurl: p.url,
                    datatype: 'json',     //json,jsonp,xml
                    entitySet: null,
                    annotations: false,
                    annotationName: "@jqgrid.GridModelAnnotate",
                    odataverbs: {
                        inlineEditingAdd: 'POST',
                        inlineEditingEdit: 'PATCH',
                        formEditingAdd: 'POST',
                        formEditingEdit: 'PUT'
                    }
                }, options || {});
                if (o.datatype === 'jsonp') { o.callback = "jsonpCallback"; }

                if (!o.entitySet) {
                    if ($.isFunction(o.errorfunc)) { o.errorfunc({}, 'entitySet cannot be empty', 0); }
                    return;
                }
                if (o.gencolumns) {
                    var gencol = $.extend(true, {
                        parsecolfunc: null,
                        parsemetadatafunc: null,
                        successfunc: null,
                        errorfunc: null,
                        async: false,
                        entitySet: null,
                        metadatatype: options.datatype || 'xml',
                        metadataurl: (options.odataurl || p.url) + '/$metadata'
                    }, options || {});

                    if (gencol.async) {
                        gencol.successfunc = function () {
                            if ($t.grid.hDiv) { $t.grid.hDiv.loading = false; }
                            $self.jqGrid('setGridParam', { datatype: o.datatype }).trigger('reloadGrid');
                        };

                        if ($t.grid.hDiv) { $t.grid.hDiv.loading = true; }
                    }

                    $self.jqGrid('odataGenColModel', gencol);
                }

                initDefaults(p, o);
            });
        },

        odataGenColModel: function (options) {
            var $t = this[0], p = $t.p, $self = $($t), mdata, coldata;

            var o = $.extend(true, {
                parsecolfunc: null,
                parsemetadatafunc: null,
                successfunc: null,
                errorfunc: null,
                entitySet: null,
                metadataurl: p.url + '/$metadata',
                metadatatype: 'xml',           //json,jsonp,xml
                expandable: 'link',
                async: false
            }, options || {});
            if (o.metadatatype === 'jsonp') { o.callback = "jsonpCallback"; }

            if (!o.entitySet) {
                if ($.isFunction(o.errorfunc)) { o.errorfunc({}, 'entitySet cannot be empty', 0); }
                return;
            }

            $.ajax({
                url: o.metadataurl,
                type: 'GET',
                dataType: o.metadatatype,
                jsonpCallback: o.callback,
                //contentType: 'application/' + o.metadatatype + ';charset=utf-8',
                //headers: {
                //"OData-Version": "4.0"
                //"Accept": "application/json;odata=light;q=1,application/json;odata=verbose;q=0.5"
                //},
                async: o.async,
                cache: false
            })
            .done(function (data, st, xhr) {
                var i = 0, j = 0, k = 0;

                //var data = $.parseXML(data.responseText);
                if (o.metadatatype === 'json' || o.metadatatype === 'jsonp') { data = $.jgrid.odataHelper.resolveJsonReferences(data); }
                mdata = $self.triggerHandler("jqGridODataParseMetadata", data);
                if (!mdata && $.isFunction(o.parsemetadatafunc)) { mdata = o.parsemetadatafunc(data, st, xhr); }
                if (!mdata) {
                    mdata = $.jgrid.odataHelper.parseMetadata(data, o.metadatatype);
                    if (mdata) {
                        coldata = $self.triggerHandler("jqGridODataParseColumns", [o, mdata]);
                        if (!coldata && $.isFunction(o.parsecolfunc)) { coldata = o.parsecolfunc(o, mdata); }
                        if (!coldata) {
                            coldata = {};
                            for (i in mdata) {
                                if (mdata.hasOwnProperty(i) && i) {
                                    coldata[i] = $self.jqGrid('parseColumns', mdata[i], o.expandable);
                                }
                            }
                        }
                    }
                }
                else {
                    coldata = mdata;
                }

                if (coldata) {
                    for (k in coldata) {
                        if (coldata.hasOwnProperty(k) && k) {
                            for (i = 0; i < p.colModel.length; i++) {
                                for (j = 0; j < coldata[k].length; j++) {
                                    if (coldata[k][j].name === p.colModel[i].name) {
                                        $.extend(true, coldata[k][j], p.colModel[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }

                    p.colModel = coldata[o.entitySet];
                    if (!p.colModel) {
                        if ($.isFunction(o.errorfunc)) { o.errorfunc({ data: data, status: st, xhr: xhr }, 'EntitySet ' + o.entitySet + ' is not found'); }
                    }

                    if (!p.odata) { p.odata = { iscollection: true }; }
                    p.odata.subgridCols = coldata;

                    if ($.isFunction(o.successfunc)) {
                        o.successfunc();
                    }
                }
                else {
                    if ($.isFunction(o.errorfunc)) { o.errorfunc({ data: data, status: st, xhr: xhr }, 'parse $metadata error'); }
                }
            })
            .fail(function (xhr, err, code) {
                if ($.isFunction(o.errorfunc)) {
                    var parsedError = $.jgrid.odataHelper.loadError(xhr, err, code);
                    o.errorfunc({ xhr: xhr, error: err, code: code }, parsedError);
                }
            });

            return coldata;
        }

        //TODO: make function that checks allowed types of "odata.metadata"
        /*getAllowedDataTypes: function(url, callback) {
             $.ajax({
                url: url,
                type: 'HEAD'
             })
             .done(function (data, st, xhr) {
                if($.isFunction(callback)) {
                    var result = [];
                    callback(result);
                }
             });
         }*/
    });
}));
