/**
 * @summary     SlidingChild
 * @description Show / Hide row child plugin
 * @version     2.0.2
 * @file        dataTables.slidingChild.js
 * @author      Nick Adkinson (https://github.com/data-handler)
 * @copyright   Copyright 2018 Nick Adkinson
 * 
 * License      MIT - http://datatables.net/license/mit
 *
 * This feature plug-in provides functionality for showing and hiding row child 
 * information in DataTables. This can be particularly useful for displaying
 * hierarchical data as a drill-down, or where you wish to convey more information
 * about a row than there is space for in the host table.
 *
 * @example
 *    $('#myTable').DataTable({
 *        slidingChild: {
 *            source: function(parent, response) {
 *                $.get('/Child/GetByParentId/' + parent.data('id'), response);
 *            }
 *        }
 *    });
 *
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, document );
	}
}(function( $, document ) {
'use strict';

var SlidingChild = function (dt, options)
{
	var that = this;
	dt.on('draw', function() {
		that._updateFadedRows();
	});
    var table = dt.table();
    var sliderElement = document.createElement('div');
    sliderElement.className = 'slider';

	this.s = $.extend({}, 
		{
			dt:         dt,
            table:      $(table.node()),
            slider:     $(sliderElement)
		}, 
		SlidingChild.defaults, 
		options
	);	

	this._bind();
};

SlidingChild.prototype = {
	_bind: function() {
		var that = this;
		var settings = that.s;
		$(settings.table, '> tbody').on('click', settings.selector, function() {     
            var $this = $(this);
            var tr = $this.is('tr') ? $this : $this.closest('tr');

			if (!tr.is('tr')) { return; } // throw error?
			
			var dtRow = settings.dt.row(tr);            
			that._toggleChild(dtRow);			
        });
	},	
	_toggleChild: function(dtRow) {
		var settings = this.s;
		if (dtRow.child.isShown()) {
			this._hideChild(dtRow, function() {});						
		} else {      			    
            var existingShownDtRow = settings.dt.row('.shown');
			if (existingShownDtRow.length && settings.toggle) {     
                this._hideChild(existingShownDtRow, this._showChildCallback(dtRow));
            } else {            
                this._showChild(dtRow);
            }
		}
	},	
	_showChildCallback: function(dtRow) {
		return function( dtRow ) {			
			this._showChild(dtRow);
		}.bind( this, dtRow );
	},
	_showChild: function(dtRow) {	
		var $tr = $(dtRow.node());
		if (this.s.displayLoadingIndicator) {
			this._addLoadingIndicator($tr);
		}
		this.s.source( $tr, this._response(dtRow) );		
    },
	_response: function(dtRow) {
		return function( dtRow, childData ) {
			this.__showChild( dtRow, childData );
		}.bind( this, dtRow );
	},    
	__showChild: function(dtRow, data) {   
		var settings = this.s;                 
		var slider = settings.slider;
		var $tr = $(dtRow.node());

		if (settings.displayLoadingIndicator) {
			$('.'+this.s.loadingIndicatorClass).remove();
		}

        slider.append(data);
		dtRow.child(slider, settings.childClass).show();
		
		$tr.toggleClass('shown');
		this._updateFadedRows();

        if (settings.animateShow) {
            this._showChildWithAnimation(dtRow);
        } else {
            this._showChildWithoutAnimation(dtRow);
        }   
    },
    _showChildWithAnimation: function(dtRow) {
        var settings = this.s;
        $(settings.slider, dtRow.child()).slideDown(settings.animationSpeed, function () {
            settings.onShown(dtRow);
        });
    },
    _showChildWithoutAnimation: function(dtRow) {
        var settings = this.s;
        $(settings.slider, dtRow.child()).show();
        settings.onShown(dtRow);
    },
	_hideChild: function(dtRow, callback) {  
		var settings = this.s;     

		$(dtRow.node()).toggleClass('shown');
		this._updateFadedRows();

		if (settings.animateHide) {
            this._hideChildWithAnimation(dtRow, callback);
        } else {
            this._hideChildWithoutAnimation(dtRow, callback);
		}		
	},
    _hideChildWithAnimation: function(dtRow, callback) {
        var settings = this.s;
        var slider = settings.slider;
        $(slider, dtRow.child()).slideUp(settings.animationSpeed, function () {          
            dtRow.child.remove();            
            slider.empty();            
            settings.onHidden(dtRow);                       
            callback();
		});
    },
    _hideChildWithoutAnimation: function(dtRow, callback) {
        var settings = this.s;
        var slider = settings.slider;
        $(slider, dtRow.child()).hide();   
        dtRow.child.remove();            
        slider.empty();            
        settings.onHidden(dtRow);                       
        callback();
	},
	_updateFadedRows: function() {
		if (this.s.fadeNonShowingRows) {
			this._fadeNonShowingRows();
			this._removeFadeFromShowingRows();
		} else {
			this._removeFadeFromRows();
		}
	},
	_fadeNonShowingRows: function() {
		if (this.s.dt.rows('.shown:visible').count()) {			
			this.s.dt.rows(':visible:not(.shown):not(.faded)')
				.nodes()
				.to$()
				.css('opacity', this.s.fadeOpacity)
				.addClass('faded');					
		} else {
			this._removeFadeFromRows();
		}
	},
	_removeFadeFromShowingRows: function() {
		this.s.dt.rows('.shown.faded:visible')
			.nodes()
			.to$()
			.css('opacity', 1)
			.removeClass('faded');
	},
	_removeFadeFromRows: function() {
		this.s.dt.rows('.faded')
			.nodes()
			.to$()
			.css('opacity', 1)
			.removeClass('faded');
	},
	_addLoadingIndicator: function($tr) {
		var position = $tr.position();
		var indicator = $(this.s.loadingIndicatorContent);
		indicator.addClass(this.s.loadingIndicatorClass);
		indicator.css('top', position.top);
		indicator.css('left', position.left);
		indicator.css('height', $tr.height());
		
		$tr.append(indicator);
	}
};

SlidingChild.defaults = {
	selector: "tr",
	childClass: 'child',
	source: function() {},
    toggle: true,
    animateShow: true,
	animateHide: true,
	fadeNonShowingRows: false,
	fadeOpacity: 0.4,
	animationSpeed: 200,
	onShown: function() {},
	onHidden: function() {},
	displayLoadingIndicator: false,
	loadingIndicatorClass: 'loading-indicator',
	loadingIndicatorContent: '<div style="background: black; color: white; display: flex; align-items: center; justify-content: center; opacity: 0.5; position: absolute; width: 100%; z-index: 100;">Loading...</div>'
};


$.fn.dataTable.SlidingChild = SlidingChild;
$.fn.DataTable.SlidingChild = SlidingChild;

// Automatic initialisation listener
$(document).on( 'init.dt', function ( e, settings ) {	
	if ( e.namespace !== 'dt' ) {
		return;
	}

	var api = new $.fn.dataTable.Api( settings );

	if ( $( api.table().node() ).hasClass( 'slidingChild' ) ||
		 settings.oInit.slidingChild ||
		 $.fn.dataTable.defaults.slidingChild )
	{
		new SlidingChild( api, settings.oInit.slidingChild );
	}
} );


}));
