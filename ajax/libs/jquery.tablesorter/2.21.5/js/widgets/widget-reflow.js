/* Widget: reflow - updated 2/7/2015 (v2.19.0) *//*
 * Requires tablesorter v2.8+ and jQuery 1.7+
 * Also, this widget requires the following default css (modify as desired)

  / * REQUIRED CSS: change your reflow breakpoint here (35em below) * /
  @media ( max-width: 35em ) {
    .ui-table-reflow td,
    .ui-table-reflow th {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      float: right;
      / * if not using the stickyHeaders widget (not the css3 version)
       * the "!important" flag, and "height: auto" can be removed * /
      width: 100% !important;
      height: auto !important;
    }
    / * reflow widget * /
    .ui-table-reflow tbody td[data-title]:before {
      color: #469;
      font-size: .9em;
      content: attr(data-title);
      float: left;
      width: 50%;
      white-space: pre-wrap;
      text-align: bottom;
      display: inline-block;
    }
    / * reflow2 widget * /
    table.ui-table-reflow .ui-table-cell-label.ui-table-cell-label-top {
      display: block;
      padding: .4em 0;
      margin: .4em 0;
      text-transform: uppercase;
      font-size: .9em;
      font-weight: 400;
    }
    table.ui-table-reflow .ui-table-cell-label {
      padding: .4em;
      min-width: 30%;
      display: inline-block;
      margin: -.4em 1em -.4em -.4em;
    }
  }
  .ui-table-reflow .ui-table-cell-label {
    display: none;
  }

 */
/*jshint browser:true, jquery:true, unused:false */
/*global jQuery: false */
;(function($){
"use strict";

var ts = $.tablesorter,

tablereflow = {
	// simple reflow
	// add data-attribute to each cell which shows when media query is active
	// this widget DOES NOT WORK on a table with multiple thead rows
	init : function(table, c, wo) {
		var $this,
			title = wo.reflow_dataAttrib,
			header = wo.reflow_headerAttrib,
			headers = [];
		c.$table
			.addClass(wo.reflow_className)
			.off('refresh.tsreflow updateComplete.tsreflow2')
			// emulate jQuery Mobile refresh
			// https://api.jquerymobile.com/table-reflow/#method-refresh
			.on('refresh.tsreflow updateComplete.tsreflow2', function(){
				tablereflow.init(table, c, wo);
			});
		c.$headers.each(function(){
			$this = $(this);
			headers.push( $.trim( $this.attr(header) || $this.text() ) );
		});
		c.$tbodies.children().each(function(){
			$(this).children().each(function(i){
				$(this).attr(title, headers[i]);
			});
		});
	},
	init2: function(table, c, wo) {
		var $this, $tbody, i, $hdr, txt, len,
			cols = c.columns,
			header = wo.reflow2_headerAttrib,
			headers = [];
		c.$table
			.addClass(wo.reflow2_className)
			.off('refresh.tsreflow2 updateComplete.tsreflow2')
			// emulate jQuery Mobile refresh
			// https://api.jquerymobile.com/table-reflow/#method-refresh
			.on('refresh.tsreflow2 updateComplete.tsreflow2', function(){
				tablereflow.init2(table, c, wo);
			});

		// add <b> to every table cell with thead cell contents
		for (i = 0; i < cols; i++) {
			$hdr = c.$headers.filter('[data-column="' + i + '"]');
			if ($hdr.length > 1) {
				txt = [];
				/*jshint loopfunc:true */
				$hdr.each(function(){
					$this = $(this);
					if (!$this.hasClass(wo.reflow2_classIgnore)) {
						txt.push( $this.attr(header) || $this.text() );
					}
				});
			} else {
				txt = [ $hdr.attr(header) || $hdr.text() ];
			}
			headers.push( txt );
		}
		// include "remove-me" class so these additional elements are removed before updating
		txt = '<b class="' + c.selectorRemove.slice(1) + ' ' + wo.reflow2_labelClass;
		c.$tbodies.children().each(function(){
			$tbody = ts.processTbody(table, $(this), true);
			$tbody.children().each(function(j){
				$this = $(this);
				len = headers[j].length;
				i = len - 1;
				while (i >= 0) {
					$this.prepend(txt + (i === 0 && len > 1 ? ' ' + wo.reflow2_labelTop : '') + '">' + headers[j][i] + '</b>');
					i--;
				}
			});
			ts.processTbody(table, $tbody, false);
		});
	},
	remove : function(table, c, wo) {
		c.$table.removeClass(wo.reflow_className);
	},
	remove2 : function(table, c, wo) {
		c.$table.removeClass(wo.reflow2_className);
	}
};

ts.addWidget({
	id: "reflow",
	options: {
		// class name added to make it responsive (class name within media query)
		reflow_className    : 'ui-table-reflow',
		// header attribute containing modified header name
		reflow_headerAttrib : 'data-name',
		// data attribute added to each tbody cell
		reflow_dataAttrib   : 'data-title'
	},
	init: function(table, thisWidget, c, wo) {
		tablereflow.init(table, c, wo);
	},
	remove: function(table, c, wo){
		tablereflow.remove(table, c, wo);
	}
});

ts.addWidget({
	id: "reflow2",
	options: {
		// class name added to make it responsive (class name within media query)
		reflow2_className    : 'ui-table-reflow',
		// ignore header cell content with this class name
		reflow2_classIgnore  : 'ui-table-reflow-ignore',
		// header attribute containing modified header name
		reflow2_headerAttrib : 'data-name',
		// class name applied to thead labels
		reflow2_labelClass   : 'ui-table-cell-label',
		// class name applied to first row thead label
		reflow2_labelTop     : 'ui-table-cell-label-top'
	},
	init: function(table, thisWidget, c, wo) {
		tablereflow.init2(table, c, wo);
	},
	remove: function(table, c, wo){
		tablereflow.remove2(table, c, wo);
	}
});


})(jQuery);
