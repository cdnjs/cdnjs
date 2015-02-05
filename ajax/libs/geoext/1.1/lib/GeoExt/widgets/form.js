/**
 * Copyright (c) 2008-2011 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */
/**
 * @require OpenLayers/Filter/Comparison.js
 * @require OpenLayers/Filter/Logical.js
 */

Ext.namespace("GeoExt.form");

/** private: function[toFilter]
 *  :param form: ``Ext.form.BasicForm|Ext.form.FormPanel``
 *  :param logicalOp: ``String`` Either ``OpenLayers.Filter.Logical.AND`` or
 *      ``OpenLayers.Filter.Logical.OR``, set to
 *      ``OpenLayers.Filter.Logical.AND`` if null or undefined
 *  :param wildcard: ``Integer`` Determines the wildcard behaviour of like
 *      queries. This behaviour can either be: none, prepend, append or both.
 *
 *  :return: ``OpenLayers.Filter``
 *
 *  Create an {OpenLayers.Filter} object from a {Ext.form.BasicForm}
 *      or a {Ext.form.FormPanel} instance.
 */
GeoExt.form.toFilter = function(form, logicalOp, wildcard) {
    if(form instanceof Ext.form.FormPanel) {
        form = form.getForm();
    }
    var filters = [], values = form.getValues(false);
    for(var prop in values) {
        var s = prop.split("__");

        var value = values[prop], type;

        if(s.length > 1 && 
           (type = GeoExt.form.toFilter.FILTER_MAP[s[1]]) !== undefined) {
            prop = s[0];
        } else {
            type = OpenLayers.Filter.Comparison.EQUAL_TO;
        }

        if (type === OpenLayers.Filter.Comparison.LIKE) {
            switch(wildcard) {
                case GeoExt.form.ENDS_WITH:
                    value = '.*' + value;
                    break;
                case GeoExt.form.STARTS_WITH:
                    value += '.*';
                    break;
                case GeoExt.form.CONTAINS:
                    value = '.*' + value + '.*';
                    break;
                default:
                    // do nothing, just take the value
                    break;
            }
        }

        filters.push(
            new OpenLayers.Filter.Comparison({
                type: type,
                value: value,
                property: prop
            })
        );
    }

    return filters.length == 1 && logicalOp != OpenLayers.Filter.Logical.NOT ?
        filters[0] :
        new OpenLayers.Filter.Logical({
            type: logicalOp || OpenLayers.Filter.Logical.AND,
            filters: filters
        });
};

/** private: constant[FILTER_MAP]
 *  An object mapping operator strings as found in field names to
 *      ``OpenLayers.Filter.Comparison`` types.
 */
GeoExt.form.toFilter.FILTER_MAP = {
    "eq": OpenLayers.Filter.Comparison.EQUAL_TO,
    "ne": OpenLayers.Filter.Comparison.NOT_EQUAL_TO,
    "lt": OpenLayers.Filter.Comparison.LESS_THAN,
    "le": OpenLayers.Filter.Comparison.LESS_THAN_OR_EQUAL_TO,
    "gt": OpenLayers.Filter.Comparison.GREATER_THAN,
    "ge": OpenLayers.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO,
    "like": OpenLayers.Filter.Comparison.LIKE
};

GeoExt.form.ENDS_WITH = 1;
GeoExt.form.STARTS_WITH = 2;
GeoExt.form.CONTAINS = 3;

/** private: function[recordToField]
 *  :param record: ``Ext.data.Record``, typically from an attributeStore
 *  :param options: ``Object``, optional object litteral. Valid options:
 *
 *  * checkboxLabelProperty - ``String`` The name of the property used to set
 *  the label in the checkbox. Only applies if the record is of the "boolean"
 *  type. Possible values are "boxLabel" and "fieldLabel". Default is "boxLabel".
 *  * mandatoryFieldLabelStyle - ``String`` A CSS style specification string
 *  to apply to the field label if the field is not nillable (that is,
 *  the corresponding record has the "nillable" attribute set to ``false``).
 *  Default is ``"font-weigth: bold;"``.
 *  * labelTpl - ``Ext.Template`` or ``String`` or ``Array`` If set, 
 *  the field label is obtained by applying the record's data hash to this 
 *  template. This allows for very customizable field labels. 
 *  See for instance :
 *
 *  .. code-block:: javascript
 *
 *      var formPanel = new Ext.form.FormPanel({
 *          autoScroll: true,
 *          plugins: [
 *              new GeoExt.plugins.AttributeForm({
 *                  attributeStore: store,
 *                  recordToFieldOptions: {
 *                      mandatoryFieldLabelStyle: 'font-style:italic;',
 *                      labelTpl: new Ext.XTemplate(
 *                          '<span ext:qtip="{[this.getTip(values)]}">{name}</span>', {
 *                              compiled: true,
 *                              disableFormats: true,
 *                              getTip: function(v) {
 *                                  if (!v.type) {
 *                                      return '';
 *                                  }
 *                                  var type = v.type.split(":").pop();
 *                                  return OpenLayers.i18n(type) + 
 *                                      (v.nillable ? '' : ' (required)');
 *                              }
 *                          }
 *                      )
 *                  }
 *              })
 *          ]
 *      });
 *
 *  :return: ``Object`` An object literal with a xtype property, use
 *  ``Ext.ComponentMgr.create`` (or ``Ext.create`` in Ext 3) to create
 *  an ``Ext.form.Field`` from this object.
 *
 *  This function can be used to create an ``Ext.form.Field`` from
 *  an ``Ext.data.Record`` containing name, type, restriction and
 *  label fields.
 */
GeoExt.form.recordToField = function(record, options) {

    options = options || {};

    var type = record.get("type");
    if(typeof type === "object" && type.xtype) {
        // we have an xtype'd object literal in the type
        // field, just return it
        return type;
    }
    type = type.split(":").pop(); // remove ns prefix
    
    var field;
    var name = record.get("name");
    var restriction = record.get("restriction") || {};
    var nillable = record.get("nillable") || false;
    
    var label = record.get("label");
    var labelTpl = options.labelTpl;
    if (labelTpl) {
        var tpl = (labelTpl instanceof Ext.Template) ?
            labelTpl :
            new Ext.XTemplate(labelTpl);
        label = tpl.apply(record.data);
    } else if (label == null) {
        // use name for label if label isn't defined in the record
        label = name;
    }
    
    var baseOptions = {
        name: name,
        labelStyle: nillable ? '' : 
                        options.mandatoryFieldLabelStyle != null ? 
                            options.mandatoryFieldLabelStyle : 
                            'font-weight:bold;'
    };

    var r = GeoExt.form.recordToField.REGEXES;

    if(type.match(r["text"])) {
        var maxLength = restriction["maxLength"] !== undefined ?
            parseFloat(restriction["maxLength"]) : undefined;
        var minLength = restriction["minLength"] !== undefined ?
            parseFloat(restriction["minLength"]) : undefined;
        field = Ext.apply({
            xtype: "textfield",
            fieldLabel: label,
            maxLength: maxLength,
            minLength: minLength
        }, baseOptions);
    } else if(type.match(r["number"])) {
        var maxValue = restriction["maxInclusive"] !== undefined ?
            parseFloat(restriction["maxInclusive"]) : undefined;
        var minValue = restriction["minInclusive"] !== undefined ?
            parseFloat(restriction["minInclusive"]) : undefined;
        field = Ext.apply({
            xtype: "numberfield",
            fieldLabel: label,
            maxValue: maxValue,
            minValue: minValue
        }, baseOptions);
    } else if(type.match(r["boolean"])) {
        field = Ext.apply({
            xtype: "checkbox"
        }, baseOptions);
        var labelProperty = options.checkboxLabelProperty || "boxLabel";
        field[labelProperty] = label;
    } else if(type.match(r["date"])) {
        field = Ext.apply({
            xtype: "datefield",
            fieldLabel: label,
            format: 'c'
        }, baseOptions);
    }

    return field;
};

/** private: constant[REGEXES]
  *  ``Object`` Regular expressions for determining what type
  *  of field to create from an attribute record.
  */
GeoExt.form.recordToField.REGEXES = {
    "text": new RegExp(
        "^(text|string)$", "i"
    ),
    "number": new RegExp(
        "^(number|float|decimal|double|int|long|integer|short)$", "i"
    ),
    "boolean": new RegExp(
        "^(boolean)$", "i"
    ),
    "date": new RegExp(
        "^(date|dateTime)$", "i"
    )
};
