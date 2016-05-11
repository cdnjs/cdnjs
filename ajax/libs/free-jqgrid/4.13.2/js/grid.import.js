/**
 * jqGrid extension for constructing Grid Data from external file
 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/

/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, define, xmlJsonClass */
/*jslint browser: true, devel: true, white: true */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery", "./grid.base", "./jsonxml"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	"use strict";
	// begin module grid.import
	$.jgrid.extend({
		jqGridImport: function (o) {
			o = $.extend({
				imptype: "xml", // xml, json, xmlstring, jsonstring
				impstring: "",
				impurl: "",
				mtype: "GET",
				impData: {},
				xmlGrid: {
					config: "roots>grid",
					data: "roots>rows"
				},
				jsonGrid: {
					config: "grid",
					data: "data"
				},
				ajaxOptions: {}
			}, o || {});
			return this.each(function () {
				var $t = this,
					xmlConvert = function (xml, options) {
						var cnfg = $(options.xmlGrid.config, xml)[0], xmldata = $(options.xmlGrid.data, xml)[0], jstr, jstr1, key, svdatatype;
						if (xmlJsonClass.xml2json) {
							jstr = xmlJsonClass.xml2json(cnfg, " ");
							jstr = $.parseJSON(jstr);
							for (key in jstr) {
								if (jstr.hasOwnProperty(key)) {
									jstr1 = jstr[key];
								}
							}
							if (jstr1 !== undefined) {
								if (xmldata) {
									// save the datatype
									svdatatype = jstr.grid.datatype;
									jstr.grid.datatype = "xmlstring";
									jstr.grid.datastr = xml;
									$($t).jqGrid(jstr1).jqGrid("setGridParam", { datatype: svdatatype });
								} else {
									$($t).jqGrid(jstr1);
								}
							}
						} else {
							alert("xml2json or parse are not present");
						}
					},
					jsonConvert = function (jsonstr, options) {
						if (jsonstr && typeof jsonstr === "string") {
							var json = $.parseJSON(jsonstr),
								gprm = json[options.jsonGrid.config],
								jdata = json[options.jsonGrid.data], svdatatype;

							if (jdata) {
								svdatatype = gprm.datatype;
								gprm.datatype = "jsonstring";
								gprm.datastr = jdata;
								$($t).jqGrid(gprm).jqGrid("setGridParam", { datatype: svdatatype });
							} else {
								$($t).jqGrid(gprm);
							}
						}
					},
					xmld;
				switch (o.imptype) {
					case "xml":
						$.ajax($.extend({
							url: o.impurl,
							type: o.mtype,
							data: o.impData,
							dataType: "xml",
							context: o,
							complete: function (jqXHR) {
								if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
									xmlConvert(jqXHR.responseXML, this);
									$($t).triggerHandler("jqGridImportComplete", [jqXHR, this]);
									if ($.isFunction(this.importComplete)) {
										this.importComplete(jqXHR);
									}
								}
							}
						}, o.ajaxOptions));
						break;
					case "xmlstring":
						// we need to make just the conversion and use the same code as xml
						if (o.impstring && typeof o.impstring === "string") {
							xmld = $.parseXML(o.impstring);
							if (xmld) {
								xmlConvert(xmld, o);
								$($t).triggerHandler("jqGridImportComplete", [xmld, o]);
								if ($.isFunction(o.importComplete)) {
									o.importComplete(xmld);
								}
								o.impstring = null;
							}
						}
						break;
					case "json":
						$.ajax($.extend({
							url: o.impurl,
							type: o.mtype,
							data: o.impData,
							dataType: "json",
							context: o,
							complete: function (jqXHR) {
								try {
									if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
										jsonConvert(jqXHR.responseText, this);
										$($t).triggerHandler("jqGridImportComplete", [jqXHR, this]);
										if ($.isFunction(this.importComplete)) {
											this.importComplete(jqXHR);
										}
									}
								} catch (ignore) { }
							}
						}, o.ajaxOptions));
						break;
					case "jsonstring":
						if (o.impstring && typeof o.impstring === "string") {
							jsonConvert(o.impstring, o);
							$($t).triggerHandler("jqGridImportComplete", [o.impstring, o]);
							if ($.isFunction(o.importComplete)) {
								o.importComplete(o.impstring);
							}
							o.impstring = null;
						}
						break;
				}
			});
		},
		jqGridExport: function (o) {
			o = $.extend({
				exptype: "xmlstring",
				root: "grid",
				ident: "\t"
			}, o || {});
			var ret = null;
			this.each(function () {
				if (!this.grid) {
					return;
				}
				var key, gprm = $.extend(true, {}, $(this).jqGrid("getGridParam"));
				// we need to check for:
				// 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
				if (gprm.rownumbers) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				if (gprm.multiselect) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				if (gprm.subGrid) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				gprm.knv = null;
				if (gprm.treeGrid) {
					for (key in gprm.treeReader) {
						if (gprm.treeReader.hasOwnProperty(key)) {
							gprm.colNames.splice(gprm.colNames.length - 1);
							gprm.colModel.splice(gprm.colModel.length - 1);
						}
					}
				}
				switch (o.exptype) {
					case "xmlstring":
						ret = "<" + o.root + ">" + xmlJsonClass.json2xml(gprm, o.ident) + "</" + o.root + ">";
						break;
					case "jsonstring":
						ret = "{" + xmlJsonClass.toJson(gprm, o.root, o.ident, false) + "}";
						if (gprm.postData.filters !== undefined) {
							ret = ret.replace(/filters":"/, "filters\":");
							ret = ret.replace(/\}\]\}"/, "}]}");
						}
						break;
				}
			});
			return ret;
		},
		excelExport: function (o) {
			o = $.extend({
				exptype: "remote",
				url: null,
				oper: "oper",
				tag: "excel",
				exportOptions: {}
			}, o || {});
			return this.each(function () {
				var url, pdata, params;
				if (!this.grid) {
					return;
				}
				if (o.exptype === "remote") {
					pdata = $.extend({}, this.p.postData, o.exportOptions);
					pdata[o.oper] = o.tag;
					params = jQuery.param(pdata);
					if (o.url.indexOf("?") !== -1) {
						url = o.url + "&" + params;
					} else {
						url = o.url + "?" + params;
					}
					window.location = url;
				}
			});
		}
	});
	// end module grid.import
}));
