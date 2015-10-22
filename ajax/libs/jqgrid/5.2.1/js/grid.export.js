/*jshint eqeqeq:false, eqnull:true, devel:true */
/*global jQuery, JSZip, pdfMake, XMLSerializer, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./grid.base",
			"./jquery.fmatter",
			"./grid.utils"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
"use strict";
//module begin

$.jgrid = $.jgrid || {};


$.extend($.jgrid,{
	formatCell : function ( cellval , colpos, rwdat, cm, $t){
		var v;
		if(cm.formatter !== undefined) {
			var opts= {rowId: '', colModel:cm, gid: $t.p.id, pos:colpos, styleUI: '' };
			if($.isFunction( cm.formatter ) ) {
				v = cm.formatter.call($t,cellval,opts,rwdat);
			} else if($.fmatter){
				v = $.fn.fmatter.call($t,cm.formatter,cellval,opts,rwdat);
			} else {
				v = cellval;
			}
		} else {
			v = cellval;
		}
		return v;
	},
	formatCellCsv : function (v, p) {
		v = v == null ? '' : String(v);
		try {
			v = v.replace(p._regexsep ,p.separatorReplace).replace(/\r\n/g, p.replaceNewLine).replace(/\n/g, p.replaceNewLine);
		} catch (_e) {
			v="";
		}
		if(p.escquote) {
			v = v.replace(p._regexquot, p.escquote + p.quote);
		}
		if( v.indexOf(p.separator) === -1 || v.indexOf(p.qoute) === -1) {
			v = p.quote + v + p.quote;
		}
		return v;		
	},

	excelCellPos : function ( n ){
		var ordA = 'A'.charCodeAt(0),
		ordZ = 'Z'.charCodeAt(0),
		len = ordZ - ordA + 1,
		s = "";

		while( n >= 0 ) {
			s = String.fromCharCode(n % len + ordA) + s;
			n = Math.floor(n / len) - 1;
		}

		return s;
	},

	makeNode : function ( root, elemName, options ) {
		var currNode = root.createElement( elemName );

		if ( options ) {
			if ( options.attr ) {
				$(currNode).attr( options.attr );
			}
			if( options.children ) {
				$.each( options.children, function ( key, value ) {
					currNode.appendChild( value );
				});
			}
			if( options.text ) {
				currNode.appendChild( root.createTextNode( options.text ) );
			}
		}
		return currNode;
	},
	xmlToZip : function ( zip, obj ) {
		var $t = this,
		xmlserialiser = new XMLSerializer(),
		// IE >= 9
		ieExcel = xmlserialiser.serializeToString(	
			$.parseXML( $.jgrid.excelStrings['xl/worksheets/sheet1.xml'] ) )
			.indexOf( 'xmlns:r' ) === -1,
		newDir, worksheet, i, ien, attr, attrs = [], str;

		$.each( obj, function ( name, val ) {
			if ( $.isPlainObject( val ) ) {
				newDir = zip.folder( name );
				$t.xmlToZip( newDir, val );
			} else {
				if ( ieExcel ) {
					worksheet = val.childNodes[0];
					for ( i=worksheet.attributes.length-1 ; i>=0 ; i-- ) {
						var attrName = worksheet.attributes[i].nodeName;
						var attrValue = worksheet.attributes[i].nodeValue;

						if ( attrName.indexOf( ':' ) !== -1 ) {
							attrs.push( { name: attrName, value: attrValue } );

							worksheet.removeAttribute( attrName );
						}
					}

					for ( i=0, ien=attrs.length ; i<ien ; i++ ) {
						attr = val.createAttribute( attrs[i].name.replace( ':', '_dt_b_namespace_token_' ) );
						attr.value = attrs[i].value;
						worksheet.setAttributeNode( attr );
					}
				}
				// suuport of all browsers
				str = xmlserialiser.serializeToString(val);
				// Fix IE's XML
				if ( ieExcel ) {
					if ( str.indexOf( '<?xml' ) === -1 ) {
						str = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+str;
					}
					str = str.replace( /_dt_b_namespace_token_/g, ':' );
				}

				str = str
					.replace( /<row xmlns="" /g, '<row ' )
					.replace( /<cols xmlns="">/g, '<cols>' )
					.replace( /<mergeCells xmlns="" /g, '<mergeCells ' );

				zip.file( name, str );
			}
		} );
	},
	// Excel - Pre-defined strings to build a basic XLSX file
	excelStrings  : {
		"_rels/.rels":
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
				'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>'+
			'</Relationships>',

		"xl/_rels/workbook.xml.rels":
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
			'<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'+
				'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>'+
				'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>'+
			'</Relationships>',

		"[Content_Types].xml":
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
			'<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'+
				'<Default Extension="xml" ContentType="application/xml" />'+
				'<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />'+
				'<Default Extension="jpeg" ContentType="image/jpeg" />'+
				'<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />'+
				'<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />'+
				'<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" />'+
			'</Types>',

		"xl/workbook.xml":
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
			'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">'+
				'<fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/>'+
				'<workbookPr showInkAnnotation="0" autoCompressPictures="0"/>'+
				'<bookViews>'+
					'<workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/>'+
				'</bookViews>'+
				'<sheets>'+
					'<sheet name="Sheet1" sheetId="1" r:id="rId1"/>'+
				'</sheets>'+
			'</workbook>',

		"xl/worksheets/sheet1.xml":
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'+
			'<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
				'<sheetData/>'+
			'</worksheet>',

		"xl/styles.xml": 
			'<?xml version="1.0" encoding="UTF-8"?>'+
			'<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">'+
				'<fonts count="5" x14ac:knownFonts="1">'+
					'<font>'+
						'<sz val="11" />'+
						'<name val="Calibri" />'+
					'</font>'+
					'<font>'+
						'<sz val="11" />'+
						'<name val="Calibri" />'+
						'<color rgb="FFFFFFFF" />'+
					'</font>'+
					'<font>'+
						'<sz val="11" />'+
						'<name val="Calibri" />'+
						'<b />'+
					'</font>'+
					'<font>'+
						'<sz val="11" />'+
						'<name val="Calibri" />'+
						'<i />'+
					'</font>'+
					'<font>'+
						'<sz val="11" />'+
						'<name val="Calibri" />'+
						'<u />'+
					'</font>'+
				'</fonts>'+
				'<fills count="6">'+
					'<fill>'+
						'<patternFill patternType="none" />'+
					'</fill>'+
					'<fill/>'+ 
					'<fill>'+
						'<patternFill patternType="solid">'+
							'<fgColor rgb="FFD9D9D9" />'+
							'<bgColor indexed="64" />'+
						'</patternFill>'+
					'</fill>'+
					'<fill>'+
						'<patternFill patternType="solid">'+
							'<fgColor rgb="FFD99795" />'+
							'<bgColor indexed="64" />'+
						'</patternFill>'+
					'</fill>'+
					'<fill>'+
						'<patternFill patternType="solid">'+
							'<fgColor rgb="ffc6efce" />'+
							'<bgColor indexed="64" />'+
						'</patternFill>'+
					'</fill>'+
					'<fill>'+
						'<patternFill patternType="solid">'+
							'<fgColor rgb="ffc6cfef" />'+
							'<bgColor indexed="64" />'+
						'</patternFill>'+
					'</fill>'+
				'</fills>'+
				'<borders count="2">'+
					'<border>'+
						'<left />'+
						'<right />'+
						'<top />'+
						'<bottom />'+
						'<diagonal />'+
					'</border>'+
					'<border diagonalUp="false" diagonalDown="false">'+
						'<left style="thin">'+
							'<color auto="1" />'+
						'</left>'+
						'<right style="thin">'+
							'<color auto="1" />'+
						'</right>'+
						'<top style="thin">'+
							'<color auto="1" />'+
						'</top>'+
						'<bottom style="thin">'+
							'<color auto="1" />'+
						'</bottom>'+
						'<diagonal />'+
					'</border>'+
				'</borders>'+
				'<cellStyleXfs count="1">'+
					'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" />'+
				'</cellStyleXfs>'+
				'<cellXfs count="2">'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"><alignment horizontal="center" /></xf>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'<xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/>'+
				'</cellXfs>'+
				'<cellStyles count="1">'+
					'<cellStyle name="Normal" xfId="0" builtinId="0" />'+
				'</cellStyles>'+
				'<dxfs count="0" />'+
				'<tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" />'+
			'</styleSheet>'
	}
	
});
/******************************************************************** 
*
* due to speed, every export method will have separate module
* to collect grouped data
*
*********************************************************************/
$.jgrid.extend({
	exportToCsv : function ( p ) {
		p = $.extend(true, {
			separator: ",",
			separatorReplace : " ",
			quote : '"', 
			escquote : '"', 
			newLine : "\r\n", // navigator.userAgent.match(/Windows/) ?	'\r\n' : '\n';
			replaceNewLine : " ",
			includeCaption : true,
			includeLabels : true,
			includeGroupHeader : true,
			includeFooter: true,
			fileName : "jqGridExport.csv",
			mimetype : "text/csv;charset=utf-8",
			returnAsString : false
		}, p || {});
		var ret ="";
		this.each(function(){

			p._regexsep = new RegExp(p.separator, "g");
			p._regexquot = new RegExp(p.quote, "g");
						
			var $t = this,
			// get the filtered data
			data1 = this.addLocalData( true ), 
			dlen = data1.length,
			cm = $t.p.colModel,
			cmlen = cm.length,
			clbl = $t.p.colNames,
			i, j=0, row, str = '' , tmp, k,
			cap = "", hdr = "", ftr="",	lbl="", albl=[], restorevis = [];
			function groupToCsv (grdata, p) {
				var str="",
				grp = $t.p.groupingView, 
				cp=[], len =grp.groupField.length,
				cm = $t.p.colModel,
				colspans = cm.length,
				toEnd = 0;

				$.each(cm, function (i,n){
					var ii;
					for(ii=0;ii<len;ii++) {
						if(grp.groupField[ii] === n.name ) {
							cp[ii] = i;
							break;
						}
					}
				});
				function findGroupIdx( ind , offset, grp) {
					var ret = false, i;
					if(offset===0) {
						ret = grp[ind];
					} else {
						var id = grp[ind].idx;
						if(id===0) { 
							ret = grp[ind]; 
						}  else {
							for(i=ind;i >= 0; i--) {
								if(grp[i].idx === id-offset) {
									ret = grp[i];
									break;
								}
							}
						}
					}
					return ret;
				}
				function buildSummaryTd(i, ik, grp, foffset) {
					var fdata = findGroupIdx(i, ik, grp),
					//cm = $t.p.colModel,
					vv, grlen = fdata.cnt, k, retarr= new Array(p.collen), j=0;
					for(k=foffset; k<colspans;k++) {
						if(cm[k].hidden) {
							continue;
						}
						var tplfld = "{0}";
						$.each(fdata.summary,function(){
							if(this.nm === cm[k].name) {
								if(cm[k].summaryTpl)  {
									tplfld = cm[k].summaryTpl;
								}
								if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
									if(this.sd && this.vd) { 
										this.v = (this.v/this.vd);
									} else if(this.v && grlen > 0) {
										this.v = (this.v/grlen);
									}
								}
								try {
									this.groupCount = fdata.cnt;
									this.groupIndex = fdata.dataIndex;
									this.groupValue = fdata.value;
									vv = $t.formatter('', this.v, k, this);
								} catch (ef) {
									vv = this.v;
								}
								retarr[j] = 
									$.jgrid.formatCellCsv(
									$.jgrid.stripHtml( 
									$.jgrid.template(tplfld,vv) 
									), p ) ;
								return false;
							}
						});
						j++;
					}
					return retarr;
				}
				var sumreverse = $.makeArray(grp.groupSummary), gv, k;
				sumreverse.reverse();
				$.each(grp.groups,function(i,n){
					toEnd++;
					try {
						if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
							gv = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, $t.p.colModel[cp[n.idx]], n.idx, grp);
						} else {
							gv = $t.formatter('', n.displayValue, cp[n.idx], n.value );
						}
					} catch (egv) {
						gv = n.displayValue;
					}
					var grpTextStr = ''; 
					if($.isFunction(grp.groupText[n.idx])) { 
						grpTextStr = grp.groupText[n.idx].call($t, gv, n.cnt, n.summary);
					} else {
						grpTextStr = $.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
					}
					if( !(typeof grpTextStr ==='string' || typeof grpTextStr ==='number' ) ) {
						grpTextStr = gv;
					}
					var arr;
					if(grp.groupSummaryPos[n.idx] === 'header')  {
						arr = buildSummaryTd(i, 0, grp.groups, 0 /*grp.groupColumnShow[n.idx] === false ? (mul ==="" ? 2 : 3) : ((mul ==="") ? 1 : 2)*/ );
					} else {
						arr = new Array(p.collen);
					}
					arr[0] = $.jgrid.formatCellCsv( $.jgrid.stripHtml( grpTextStr ), p);
					str +=  arr.join( p.separator ) + p.newLine;
					var leaf = len-1 === n.idx; 
					if( leaf ) {
						var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow, to,
						end = gg !== undefined ?  gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
						for(kk=sgr;kk<end;kk++) {
							if(!grdata[kk - offset]) { break; }
							to = grdata[kk - offset];
							k = 0;
							for(ik = 0; ik < cm.length; ik++) {
								if(!cm[ik].hidden) {
									arr[k] = $.jgrid.formatCellCsv( 
										$.jgrid.formatCell( to[cm[ik].name], ik, to, cm[ik], $t ) , p);
									k++;
								}
							}
							str += arr.join( p.separator ) + p.newLine;
						}
						
						if(grp.groupSummaryPos[n.idx] !== 'header') {
							var jj;
							if (gg !== undefined) {
								for (jj = 0; jj < grp.groupField.length; jj++) {
									if (gg.dataIndex === grp.groupField[jj]) {
										break;
									}
								}
								toEnd = grp.groupField.length - jj;
							}
							for (ik = 0; ik < toEnd; ik++) {
								if(!sumreverse[ik]) { continue; }
								arr = buildSummaryTd(i, ik, grp.groups, 0);
								str += arr.join( p.separator ) + p.newLine;
							}
							toEnd = jj;
						}
					}
				});
				return str;
			}

			// end group function
			var def = [], key, restorexcol=[];
			$.each(cm,function(i,n) {
				if(n.exportcol === undefined) {
					n.exportcol = true;
				}
				if((n.name === 'cb' || n.name === 'rn') && !n.hidden) {
					restorevis.push(i);
					n.hidden = true;
				}
				if(!n.exportcol) {
					if(!n.hidden) {
						restorexcol.push(i);
						n.hidden = true;
					}
				}
				if(!n.hidden && n.exportcol) {
					albl.push( $.jgrid.formatCellCsv( clbl[i], p) );
					def.push( n.name ); // clbl[i];
				}
			});
			
			if(p.includeLabels) {
				lbl = albl.join( p.separator ) + p.newLine;
			}
			
			p.collen = albl.length;
			
			if( $t.p.grouping ) {
				
				str += groupToCsv(data1, p);
				
			}  else {
				while(j < dlen) {
					row = data1[j];
					tmp = [];
					k =0;
					for(i = 0; i < cmlen; i++) {
						if(!cm[i].hidden) {
							tmp[k] = $.jgrid.formatCellCsv( $.jgrid.formatCell( row[cm[i].name], i, row, cm[i], $t ), p );
							k++;
						}
					}
					str += tmp.join( p.separator ) + p.newLine;
					j++;
				}
			}
			data1 = null; // free
			// get the column length.
			tmp = new Array(p.collen);
			if(p.includeCaption && $t.p.caption) {
				j=p.collen;
				while(--j) {tmp[j]="";}
				tmp[0] = $.jgrid.formatCellCsv( $t.p.caption, p );
				cap += tmp.join( p.separator ) + p.newLine;
			}
			if(p.includeGroupHeader && $t.p.groupHeader && $t.p.groupHeader.length) {
				var gh = $t.p.groupHeader;
				for (i=0;i < gh.length; i++) {
					var ghdata = gh[i].groupHeaders;
					j = 0; tmp = [];
					for(key=0; key<def.length; key++ ) {
						//if(!def.hasOwnProperty( key )) {
						//	continue;
						//}
						tmp[j] = '';
						for(k=0;k<ghdata.length;k++) {
							if(ghdata[k].startColumnName === def[key]) {
								tmp[j]= $.jgrid.formatCellCsv( ghdata[k].titleText, p);
							}
						}
						j++;
					}
					hdr += tmp.join( p.separator ) + p.newLine;
				}
			}
			if(p.includeFooter && $t.p.footerrow) {
				// already formated
				var foot = $(".ui-jqgrid-ftable", this.sDiv);
				if(foot.length) {
					var frows = foot[0].rows[0];
					i=0;j=0; tmp=[];
					while(i < frows.cells.length){
						var fc = frows.cells[i],
						coln = $(fc).attr('aria-describedby').slice(-3);
						if(!fc.hidden && coln !== '_cb' && coln !== '_rn' ) {
							tmp[j] = $.jgrid.formatCellCsv( $(fc).text(), p );
							j++;
						}
						i++;
					}
					ftr += tmp.join( p.separator ) + p.newLine;
				}
			}
			ret = cap + hdr + lbl + str + ftr;
			
			for(i=0;i<restorevis.length;i++) {
				cm[restorevis[i]].hidden = false;
			}
			for(i=0;i<restorexcol.length;i++) {
				cm[restorexcol[i]].hidden = false;
			}
		});
		if (p.returnAsString) {
			return ret;
		} else {
			$.jgrid.saveAs( ret, p.fileName, { type : p.mimetype });
		}
	},
	/*
	 * 
	 * @param object o - settings for the export
	 * @returns excel 2007 document
	 * The method requiere jsZip lib in order to create excel document
	 */
	exportToExcel : function ( o ) {
		o = $.extend(true, {
			includeLabels : true,
			includeGroupHeader : true,
			includeFooter: true,
			fileName : "jqGridExport.xlsx",
			mimetype : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
			maxlength : 40, // maxlength for visible string data 
			onBeforeExport : null,
			replaceStr : null
		}, o || {} );
		this.each(function() {
			var $t = this,
			es = $.jgrid.excelStrings,
			rowPos = 0,
			rels = $.parseXML( es['xl/worksheets/sheet1.xml']),
			relsGet = rels.getElementsByTagName( "sheetData" )[0],
			xlsx = {
				_rels: {
					".rels": $.parseXML( es['_rels/.rels'])
				},
				xl: {
					_rels: {
						"workbook.xml.rels": $.parseXML( es['xl/_rels/workbook.xml.rels'])
					},
					"workbook.xml": $.parseXML( es['xl/workbook.xml']),
					"styles.xml": $.parseXML( es['xl/styles.xml']),
					"worksheets": {
						"sheet1.xml": rels
					}
				},
				"[Content_Types].xml": $.parseXML( es['[Content_Types].xml'])
			},
			cm = $t.p.colModel,
			i=0, j, ien, //obj={},
			data = { 
				body  : $t.addLocalData( true ),
				header : [],
				footer : [],
				width : [],
				map : [] 
			};
			for ( j=0, ien=cm.length ; j<ien ; j++ ) {
				if(cm[j].exportcol === undefined) {
					cm[j].exportcol =  true;
				}
				if(cm[j].hidden || cm[j].name === 'cb' || cm[j].name === 'rn' || !cm[j].exportcol) {
					continue;
				}
				data.header[i] = cm[j].name;
				data.width[ i ] = 5;
				data.map[i] = j;
				i++;
			}
			function _replStrFunc (v) {
				return v.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')
						.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');						
			}
			var _replStr = $.isFunction(o.replaceStr) ? o.replaceStr : _replStrFunc,
			currentRow, rowNode,
			addRow = function ( row, header ) {
				currentRow = rowPos+1;
				rowNode = $.jgrid.makeNode( rels, "row", { attr: {r:currentRow} } );
				for ( var i =0; i < data.header.length; i++) {
					// key = cm[i].name;
					// Concat both the Cell Columns as a letter and the Row of the cell.
					var cellId = $.jgrid.excelCellPos(i) + '' + currentRow,
					cell,
					v= ($.isArray(row) && header) ? $t.p.colNames[data.map[i]] : row[  data.header[i] ];
					if ( v == null ) {
						v = '';
					}
					if(!header) {
						v = v !== '' ? $.jgrid.formatCell( v, data.map[i], row, cm[data.map[i]], $t) : v;
					}
					data.width[i] = Math.max(data.width[i], Math.min(parseInt(v.length,10), o.maxlength) );
					// Detect numbers - don't match numbers with leading zeros or a negative
					// anywhere but the start
					// $.jgrid.formatCell( row[cm[i].name], i, row, cm[i], $t )
					if ( typeof v === 'number' || (
							v.match &&
							$.trim(v).match(/^-?\d+(\.\d+)?$/) &&
							! $.trim(v).match(/^0\d+/) )
					) {
						cell = $.jgrid.makeNode( rels, 'c', {
							attr: {
								t: 'n',
								r: cellId
							},
							children: [
								$.jgrid.makeNode( rels, 'v', { text: v } )
							]
						} );
					} else {
						// Replace non standard characters for text output
						var text = ! v.replace ?
							v : _replStr(v);
							//$.jgrid.htmlEncode (v );
							cell = $.jgrid.makeNode( rels, 'c', {
							attr: {
								t: 'inlineStr',
								r: cellId
							},
							children:{
								row: $.jgrid.makeNode( rels, 'is', {
									children: {
										row: $.jgrid.makeNode( rels, 't', {
											text: text
										} )
									}
								} )
							}
						} );
					}
					rowNode.appendChild( cell );
				}
				relsGet.appendChild(rowNode);
				rowPos++;
			};
//=========================================================================			
			function groupToExcel ( grdata ) {
				var grp = $t.p.groupingView, 
				cp=[], len =grp.groupField.length,
				colspans = cm.length,
				toEnd = 0;
					$.each(cm, function (i,n){
					var ii;
					for(ii=0;ii<len;ii++) {
						if(grp.groupField[ii] === n.name ) {
							cp[ii] = i;
							break;
						}
					}
				});
				function findGroupIdx( ind , offset, grp) {
					var ret = false, i;
					if(offset===0) {
						ret = grp[ind];
					} else {
						var id = grp[ind].idx;
						if(id===0) { 
							ret = grp[ind]; 
						}  else {
							for(i=ind;i >= 0; i--) {
								if(grp[i].idx === id-offset) {
									ret = grp[i];
									break;
								}
							}
						}
					}
					return ret;
				}
				function buildSummaryTd(i, ik, grp, foffset) {
					var fdata = findGroupIdx(i, ik, grp),
					//cm = $t.p.colModel,
					vv, grlen = fdata.cnt, k, retarr = emptyData(data.header);
					for(k=foffset; k<colspans;k++) {
						if(cm[k].hidden || cm[k].exportcol) {
							continue;
						}
						var tplfld = "{0}";
						$.each(fdata.summary,function(){
							if(this.nm === cm[k].name) {
								if(cm[k].summaryTpl)  {
									tplfld = cm[k].summaryTpl;
								}
								if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
									if(this.sd && this.vd) { 
										this.v = (this.v/this.vd);
									} else if(this.v && grlen > 0) {
										this.v = (this.v/grlen);
									}
								}
								try {
									this.groupCount = fdata.cnt;
									this.groupIndex = fdata.dataIndex;
									this.groupValue = fdata.value;
									vv = $t.formatter('', this.v, k, this);
								} catch (ef) {
									vv = this.v;
								}
								retarr[this.nm] = $.jgrid.stripHtml( $.jgrid.template(tplfld,vv) );
								return false;
							}
						});
					}
					return retarr;
				}
				function emptyData ( d ) {
					var clone = {};
					for(var key=0;key<d.length; key++ ) {
						clone[ d[key] ] = "";
					}
					return clone;
				}
				var sumreverse = $.makeArray(grp.groupSummary), gv;
				sumreverse.reverse();
				$.each(grp.groups,function(i,n){
					toEnd++;
					try {
						if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
							gv = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, $t.p.colModel[cp[n.idx]], n.idx, grp);
						} else {
							gv = $t.formatter('', n.displayValue, cp[n.idx], n.value );
						}
					} catch (egv) {
						gv = n.displayValue;
					}
					var grpTextStr = ''; 
					if($.isFunction(grp.groupText[n.idx])) { 
						grpTextStr = grp.groupText[n.idx].call($t, gv, n.cnt, n.summary);
					} else {
						grpTextStr = $.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
					}
					if( !(typeof grpTextStr ==='string' || typeof grpTextStr ==='number' ) ) {
						grpTextStr = gv;
					}
					var arr;
					if(grp.groupSummaryPos[n.idx] === 'header')  {
						arr = buildSummaryTd(i, 0, grp.groups, 0 /*grp.groupColumnShow[n.idx] === false ? (mul ==="" ? 2 : 3) : ((mul ==="") ? 1 : 2)*/ );
					} else {
						arr = emptyData(data.header);
					}
					var fkey = Object.keys(arr);
					arr[fkey[0]] = $.jgrid.stripHtml( new Array(n.idx*5).join(' ') + grpTextStr );
					addRow( arr, true );
					var leaf = len-1 === n.idx; 
					if( leaf ) {
						var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow,
						end = gg !== undefined ?  gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
						for(kk=sgr;kk<end;kk++) {
							if(!grdata[kk - offset]) { break; }
							var to = grdata[kk - offset];
							addRow( to, false );
						}
				
						if(grp.groupSummaryPos[n.idx] !== 'header') {
							var jj;
							if (gg !== undefined) {
								for (jj = 0; jj < grp.groupField.length; jj++) {
									if (gg.dataIndex === grp.groupField[jj]) {
										break;
									}
								}
								toEnd = grp.groupField.length - jj;
							}
							for (ik = 0; ik < toEnd; ik++) {
								if(!sumreverse[ik]) { continue; }
								arr = buildSummaryTd(i, ik, grp.groups, 0);
								addRow( arr, true );
							}
							toEnd = jj;
						}
					}
				});
			}
//============================================================================			
			
			$( 'sheets sheet', xlsx.xl['workbook.xml'] ).attr( 'name', o.sheetName );
			if(o.includeGroupHeader && $t.p.groupHeader && $t.p.groupHeader.length) {
				var gh = $t.p.groupHeader, mergecell=[],
				mrow = 0, key, l;
				for (l = 0; l < gh.length; l++) {
					var ghdata = gh[l].groupHeaders, clone ={};
					mrow++; j=0;
					for(j = 0; j < data.header.length; j++  ) {
						key = data.header[j];
						clone[key] = "";
						for(var k = 0; k < ghdata.length; k++) {
							if(ghdata[k].startColumnName === key) {
								clone[key] = ghdata[k].titleText;
								var start = $.jgrid.excelCellPos(j) + mrow,
									end = $.jgrid.excelCellPos(j+ghdata[k].numberOfColumns -1) + mrow;
								mergecell.push({ ref: start+":"+end });
							}
						}
					}
					addRow( clone, true );
				}
				
				$('row c', rels).attr( 's', '2' ); // bold
				
				var merge = $.jgrid.makeNode( rels, 'mergeCells', {
					attr : {
						count : mergecell.length
					}
				});
				$('worksheet', rels).append( merge );
				for(i=0;i<mergecell.length;i++) {
					merge.appendChild($.jgrid.makeNode(rels, 'mergeCell',{ 
						attr:  mergecell[i]
					}));
				}	
			}
			
			if ( o.includeLabels ) {
				addRow( data.header, true );
				$('row:last c', rels).attr( 's', '2' ); // bold
			}
			if( $t.p.grouping ) {
				groupToExcel(data.body);
			} else {
				for ( var n=0, ie=data.body.length ; n<ie ; n++ ) {
					addRow( data.body[n], false );
				}
			}
			if ( o.includeFooter || $t.p.footerrow) {
				data.footer = $($t).jqGrid('footerData', 'get');
				for( i in data.footer) {
					if(data.footer.hasOwnProperty(i)) {
						data.footer[i] = $.jgrid.stripHtml(data.footer[i]);
					}
				}
				addRow( data.footer, true );
				$('row:last c', rels).attr( 's', '2' ); // bold
			}
			
			// Set column widths
			var cols = $.jgrid.makeNode( rels, 'cols' );
			$('worksheet', rels).prepend( cols );

			for ( i=0, ien=data.width.length ; i<ien ; i++ ) {
				cols.appendChild( $.jgrid.makeNode( rels, 'col', {
					attr: {
						min: i+1,
						max: i+1,
						width: data.width[i],
						customWidth: 1
					}
				} ) );
			}
			if($.isFunction( o.onBeforeExport) ) {
				o.onBeforeExport( xlsx );
			}
			data = null; // free memory
			try {
				var zip = new JSZip();
				var zipConfig = {
					type: 'blob',
					mimeType: o.mimetype
				};
				$.jgrid.xmlToZip( zip, xlsx );
				if ( zip.generateAsync ) {
					// JSZip 3+
					zip.generateAsync( zipConfig )
					.then( function ( blob ) {
						$.jgrid.saveAs( blob, o.fileName, { type : o.mimetype } );
					});
				} else {
					// JSZip 2.5
					$.jgrid.saveAs( zip.generate( zipConfig ), o.fileName, { type : o.mimetype } );				}
			} catch(e) {
				throw e;
			}
		});
	},
	exportToPdf : function (o) {
		o = $.extend(true,{
			title: null,
			orientation: 'portrait',
			pageSize: 'A4',
			description: null,
			onBeforeExport: null,
			download: 'download',
			includeLabels : true,
			includeGroupHeader : true,
			includeFooter: true,
			fileName : "jqGridExport.pdf",
			mimetype : "application/pdf"
			
		}, o || {} );
		return this.each(function() {
			var $t = this, rows = [], j, cm = $t.p.colModel, ien, obj = {}, key, 
			data = $t.addLocalData( true ), def = [], i=0, map=[], test=[], widths = [],  align={};
// Group function			
			function groupToPdf ( grdata ) {
				var grp = $t.p.groupingView, 
				cp=[], len =grp.groupField.length,
				cm = $t.p.colModel,
				colspans = cm.length,
				toEnd = 0;

				$.each(cm, function (i,n){
					var ii;
					for(ii=0;ii<len;ii++) {
						if(grp.groupField[ii] === n.name ) {
							cp[ii] = i;
							break;
						}
					}
				});
				
				function constructRow( row, fmt ) {
					var k =0, test=[];
					//row = data[i];
					for( var key=0; key < def.length; key++ ) {
						obj = {
							text: row[def[key]] == null ? '' : (fmt ? $.jgrid.formatCell( row[def[key]] + '', map[k], data[i], cm[map[k]], $t) : row[def[key]]),
							alignment : align[key],
							style : 'tableBody'
						};
						test.push(obj);
						k++;
					}
					return test;
				}
				
				function findGroupIdx( ind , offset, grp) {
					var ret = false, i;
					if(offset===0) {
						ret = grp[ind];
					} else {
						var id = grp[ind].idx;
						if(id===0) { 
							ret = grp[ind]; 
						}  else {
							for(i=ind;i >= 0; i--) {
								if(grp[i].idx === id-offset) {
									ret = grp[i];
									break;
								}
							}
						}
					}
					return ret;
				}
				
				function buildSummaryTd(i, ik, grp, foffset) {
					var fdata = findGroupIdx(i, ik, grp),
					//cm = $t.p.colModel,
					vv, grlen = fdata.cnt, k, retarr = emptyData(def);
					for(k=foffset; k<colspans;k++) {
						if(cm[k].hidden || !cm[k].exportcol) {
							continue;
						}
						var tplfld = "{0}";
						$.each(fdata.summary,function(){
							if(this.nm === cm[k].name) {
								if(cm[k].summaryTpl)  {
									tplfld = cm[k].summaryTpl;
								}
								if(typeof this.st === 'string' && this.st.toLowerCase() === 'avg') {
									if(this.sd && this.vd) { 
										this.v = (this.v/this.vd);
									} else if(this.v && grlen > 0) {
										this.v = (this.v/grlen);
									}
								}
								try {
									this.groupCount = fdata.cnt;
									this.groupIndex = fdata.dataIndex;
									this.groupValue = fdata.value;
									vv = $t.formatter('', this.v, k, this);
								} catch (ef) {
									vv = this.v;
								}
								retarr[this.nm] = $.jgrid.stripHtml( $.jgrid.template(tplfld,vv) );
								return false;
							}
						});
					}
					return retarr;
				}
				
				function emptyData ( d ) {
					var clone = {};
					for(var key = 0; key< d.length; key++ ) {
						clone[d[key]] = "";
					}
					return clone;
				}

				var sumreverse = $.makeArray(grp.groupSummary), gv;
				sumreverse.reverse();
				$.each(grp.groups,function(i,n){
					toEnd++;
					try {
						if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
							gv = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, $t.p.colModel[cp[n.idx]], n.idx, grp);
						} else {
							gv = $t.formatter('', n.displayValue, cp[n.idx], n.value );
						}
					} catch (egv) {
						gv = n.displayValue;
					}
					var grpTextStr = ''; 
					if($.isFunction(grp.groupText[n.idx])) { 
						grpTextStr = grp.groupText[n.idx].call($t, gv, n.cnt, n.summary);
					} else {
						grpTextStr = $.jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
					}
					if( !(typeof grpTextStr ==='string' || typeof grpTextStr ==='number' ) ) {
						grpTextStr = gv;
					}
					var arr;
					if(grp.groupSummaryPos[n.idx] === 'header')  {
						arr = buildSummaryTd(i, 0, grp.groups, 0 /*grp.groupColumnShow[n.idx] === false ? (mul ==="" ? 2 : 3) : ((mul ==="") ? 1 : 2)*/ );
					} else {
						arr = emptyData(def);
					}
					var fkey = Object.keys(arr);
					arr[fkey[0]] = $.jgrid.stripHtml( new Array(n.idx*5).join(' ') + grpTextStr );
					rows.push( constructRow (arr, false) );
					var leaf = len-1 === n.idx; 
					if( leaf ) {
						var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow,
						end = gg !== undefined ?  gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
						for(kk=sgr;kk<end;kk++) {
							if(!grdata[kk - offset]) { break; }
							var to = grdata[kk - offset];
							rows.push( constructRow (to, true) );
						}

						if(grp.groupSummaryPos[n.idx] !== 'header') {
							var jj;
							if (gg !== undefined) {
								for (jj = 0; jj < grp.groupField.length; jj++) {
									if (gg.dataIndex === grp.groupField[jj]) {
										break;
									}
								}
								toEnd = grp.groupField.length - jj;
							}
							for (ik = 0; ik < toEnd; ik++) {
								if(!sumreverse[ik]) { continue; }
								arr = buildSummaryTd(i, ik, grp.groups, 0);
								rows.push( constructRow (arr, false) );
							}
							toEnd = jj;
						}
					}
				});
			}
//============================================================================			
			var k;
			for ( j=0, ien=cm.length ; j<ien ; j++ ) {
				if(cm[j].exportcol === undefined ) {
					cm[j].exportcol = true;
				}
				if(cm[j].hidden || cm[j].name === 'cb' || cm[j].name === 'rn' || !cm[j].exportcol) {
					continue;
				}
				obj = { text:  $t.p.colNames[j], style: 'tableHeader' };
				test.push( obj );
				def[i]  = cm[j].name;
				map[i] = j;
				widths.push(cm[j].width); 
				align[cm[j].name] = cm[j].align || 'left';
				i++;
			}
			var gh;
			if(o.includeGroupHeader && $t.p.groupHeader && $t.p.groupHeader.length) {
				gh = $t.p.groupHeader;
				for (i=0;i < gh.length; i++) {
					var clone = [],
					ghdata = gh[i].groupHeaders;
					for(key=0; key < def.length; key++ ) {
						obj = {text:'', style: 'tableHeader'};
						for(k=0;k<ghdata.length;k++) {
							if(ghdata[k].startColumnName === def[key]) {
								obj = { 
									text : ghdata[k].titleText, 
									colSpan: ghdata[k].numberOfColumns,
									style: 'tableHeader'
								};
							}
						}
						clone.push(obj);
						j++;
					}
					rows.push(clone);
				}
			}
			
			if(o.includeLabels) {
				rows.push( test );
			}
			if($t.p.grouping) {
				groupToPdf(data);
			} else {
				var row;
				for ( i=0, ien=data.length ; i<ien ; i++ ) {
					k =0; 
					test=[];
					row = data[i];
					for( key = 0;key < def.length; key++ ) {
						obj	= {
							text: row[def[key]] == null ? '' : $.jgrid.formatCell( row[def[key]] + '', map[k], data[i], cm[map[k]], $t),
							alignment : align[def[key]],
							style : 'tableBody'
						};
						test.push(obj);
						k++;
					}
					rows.push(test);
				}
			}
			
			if ( o.includeFooter && $t.p.footerrow) {
				var fdata = $($t).jqGrid('footerData', 'get');
				test=[];
				for( key =0; key< def.length; key++) {
					obj  =  {
						text : $.jgrid.stripHtml(fdata[def[key]]),
						style : 'tableFooter',
						alignment : align[def[key]]
					};
					test.push( obj );
				}
				rows.push( test );
			}

			var doc = {
				pageSize: o.pageSize,
				pageOrientation: o.orientation,
				content: [
					{
						style : 'tableExample',
						widths : widths,
						table: {
							headerRows: (gh!=null) ? 0 : 1,
							body: rows
						}
					}
				],
				styles: {
					tableHeader: {
						bold: true,
						fontSize: 11,
						color: '#2e6e9e',
						fillColor: '#dfeffc',
						alignment: 'center'
					},
					tableBody: {
						fontSize: 10
					},
					tableFooter: {
						bold: true,
						fontSize: 11,
						color: '#2e6e9e',
						fillColor: '#dfeffc'
					},
					title: {
						alignment: 'center',
						fontSize: 15
					},
					description: {}
				},
				defaultStyle: {
					fontSize: 10
				}
			};
			if ( o.description ) {
				doc.content.unshift( {
					text: o.description,
					style: 'description',
					margin: [ 0, 0, 0, 12 ]
				} );
			}

			if ( o.title ) {
				doc.content.unshift( {
					text: o.title,
					style: 'title',
					margin: [ 0, 0, 0, 12 ]
				} );
			}
			if( $.isFunction( o.onBeforeExport ) ) {
				o.onBeforeExport.call($t, doc);
			}
			try {
				var pdf = pdfMake.createPdf( doc );
				if ( o.download === 'open' ) {
					pdf.open();
				} else {
					pdf.getBuffer( function (buffer) {
						$.jgrid.saveAs( buffer, o.fileName, {type: o.mimetype } );
					} );
				}
			} catch(e) {
				throw e;
			}
		});
	}
});
//module end	
}));