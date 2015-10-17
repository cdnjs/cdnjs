YUI.add('datatable-scroll', function(Y) {

/**
 * Extends DataTable base to enable x,y, and xy scrolling.
 * @module datatable
 * @submodule datatable-scroll
 */


var YNode = Y.Node,
	YLang = Y.Lang,
	YUA = Y.UA,
	YgetClassName = Y.ClassNameManager.getClassName,
	DATATABLE = "datatable",
	CLASS_HEADER = YgetClassName(DATATABLE, "hd"),
	CLASS_BODY = YgetClassName(DATATABLE, "bd"),
	CLASS_SCROLLABLE = YgetClassName(DATATABLE, "scrollable"),
	CONTAINER_HEADER = '<div class="'+CLASS_HEADER+'"></div>',
	CONTAINER_BODY = '<div class="'+CLASS_BODY+'"></div>',
	TEMPLATE_TABLE = '<table></table>';
	
/**
 * Adds scrolling to DataTable.
 * @class DataTableScroll
 * @extends Plugin.Base
 */
function DataTableScroll() {
    DataTableScroll.superclass.constructor.apply(this, arguments);
}

Y.mix(DataTableScroll, {
    NS: "scroll",

    NAME: "dataTableScroll",

    ATTRS: {
	
		/**
	    * @description The width for the table. Set to a string (ex: "200px", "20em") if you want the table to scroll in the x direction.
	    *
	    * @attribute width
	    * @public
	    * @type string
	    */
        width: {
			value: undefined,
			writeOnce: "initOnly"
		},
		
		/**
	    * @description The height for the table. Set to a string (ex: "200px", "20em") if you want the table to scroll in the y-direction.
	    *
	    * @attribute height
	    * @public
	    * @type string
	    */
		height: {
			value: undefined,
			writeOnce: "initOnly"
		},
		
		
		/**
	    * @description The scrolling direction for the table.
	    *
	    * @attribute scroll
	    * @private
	    * @type string
	    */
		_scroll: {
			//value: 'y',
			valueFn: function() {
			    var w = this.get('width'),
			    h = this.get('height');
			    
			    if (w && h) {
			        return 'xy';
			    }
			    else if (w) {
			        return 'x';
			    }
			    else if (h) {
			        return 'y';
			    }
			    else {
			        return null;
			    }
			}
		},
		
		
		/**
	    * @description The hexadecimal colour value to set on the top-right of the table if a scrollbar exists. 
	    *
	    * @attribute COLOR_COLUMNFILLER
	    * @public
	    * @type string
	    */
		COLOR_COLUMNFILLER: {
			value: '#f2f2f2',
			validator: YLang.isString,
			setter: function(param) {
				if (this._headerContainerNode) {
					this._headerContainerNode.setStyle('backgroundColor', param);
				}
			}
		}
    }
});

Y.extend(DataTableScroll, Y.Plugin.Base, {
	
	/**
    * @description The table node created in datatable-base
    *
    * @property _parentTableNode
	* @private
    * @type Y.Node
    */
	_parentTableNode: null,
	
	
	/**
    * @description The THEAD node which resides within the table node created in datatable-base
    *
    * @property _parentTheadNode
	* @private
    * @type Y.Node
    */
	_parentTheadNode: null,
	
	
	/**
    * @description The TBODY node which resides within the table node created in datatable-base
    *
    * @property _parentTbodyNode
	* @private
    * @type Y.Node
    */
	_parentTbodyNode: null,
	
	
	/**
    * @description The TBODY Message node which resides within the table node created in datatable-base
    *
    * @property _parentMsgNode
	* @private
    * @type Y.Node
    */
	_parentMsgNode: null,
	
	
	/**
    * @description The contentBox specified for the datatable in datatable-base
    *
    * @property _parentContainer
	* @private
    * @type Y.Node
    */
	_parentContainer: null,
	
	
	/**
    * @description The DIV node that contains all the scrollable elements (a table with a tbody on it)
    *
    * @property _bodyContainerNode
	* @private
    * @type Y.Node
    */
	_bodyContainerNode: null,
	
	
	/**
    * @description The DIV node that contains a table with a THEAD in it (which syncs its horizontal scroll with the _bodyContainerNode above)
    *
    * @property _headerContainerNode
	* @private
    * @type Y.Node
    */
	_headerContainerNode: null,
	
	
	//--------------------------------------
    //  Methods
    //--------------------------------------


	
	initializer: function(config) {
        var dt = this.get("host");
		this._parentContainer = dt.get('contentBox');
		this._parentContainer.addClass(CLASS_SCROLLABLE);
		this._setUpNodes();
	},
	
	/////////////////////////////////////////////////////////////////////////////
	//
	// Set up Table Nodes
	//
	/////////////////////////////////////////////////////////////////////////////
	
	/**
    * @description Set up methods to fire after host methods execute
    *
    * @method _setUpNodes
    * @private
    */			
	_setUpNodes: function() {
		
		this.afterHostMethod("_addTableNode", this._setUpParentTableNode);
		this.afterHostMethod("_addTheadNode", this._setUpParentTheadNode); 
		this.afterHostMethod("_addTbodyNode", this._setUpParentTbodyNode);
		this.afterHostMethod("_addMessageNode", this._setUpParentMessageNode);
		//this.beforeHostMethod('renderUI', this._removeCaptionNode);
		this.afterHostMethod("renderUI", this.renderUI);
		this.afterHostMethod("syncUI", this.syncUI);
		
		if (this.get('_scroll') !== 'x') {
			this.afterHostMethod('_attachTheadThNode', this._attachTheadThNode);
			this.afterHostMethod('_attachTbodyTdNode', this._attachTbodyTdNode);
		}
		
	},
		
	/**
    * @description Stores the main &lt;table&gt; node provided by the host as a private property
    *
    * @method _setUpParentTableNode
    * @private
    */
	_setUpParentTableNode: function() {
		this._parentTableNode = this.get('host')._tableNode;
	},
	
	
	/**
    * @description Stores the main &lt;thead&gt; node provided by the host as a private property
    *
    * @method _setUpParentTheadNode
    * @private
    */
	_setUpParentTheadNode: function() {
		this._parentTheadNode = this.get('host')._theadNode;
	},
	
	/**
    * @description Stores the main &lt;tbody&gt; node provided by the host as a private property
    *
    * @method _setUpParentTbodyNode
    * @private
    */
	_setUpParentTbodyNode: function() {
		this._parentTbodyNode = this.get('host')._tbodyNode;
	},
	
	
	/**
    * @description Stores the main &lt;tbody&gt; message node provided by the host as a private property
    *
    * @method _setUpParentMessageNode
    * @private
    */
	_setUpParentMessageNode: function() {
		this._parentMsgNode = this.get('host')._msgNode;
	},
	
	/////////////////////////////////////////////////////////////////////////////
	//
	// Renderer
	//
	/////////////////////////////////////////////////////////////////////////////
	
	/**
    * @description Primary rendering method that takes the datatable rendered in
    * the host, and splits it up into two separate &lt;divs&gt; each containing two 
	* separate tables (one containing the head and one containing the body). 
	* This method fires after renderUI is called on datatable-base.
	* 
    * @method renderUI
    * @public
    */
	renderUI: function() {
		//Y.Profiler.start('render');
		this._createBodyContainer();
		this._createHeaderContainer();
		this._setContentBoxDimensions();
		//Y.Profiler.stop('render');
		//console.log(Y.Profiler.getReport("render"));
	},
	
	
	/**
    * @description Post rendering method that is responsible for creating a column
	* filler, and performing width and scroll synchronization between the &lt;th&gt; 
	* elements and the &lt;td&gt; elements.
	* This method fires after syncUI is called on datatable-base
	* 
    * @method syncUI
    * @public
    */
	syncUI: function() {
		//Y.Profiler.start('sync');
		this._removeCaptionNode();
		this._syncWidths();
		this._syncScroll();
		//Y.Profiler.stop('sync');
		//console.log(Y.Profiler.getReport("sync"));
		
	},
	
	/**
    * @description Remove the caption created in base. Scrolling datatables dont support captions.
	* 
    * @method _removeCaptionNode
    * @private
    */
    _removeCaptionNode: function() {
        this.get('host')._captionNode.remove();
        //Y.DataTable.Base.prototype.createCaption = function(v) {/*do nothing*/};
		//Y.DataTable.Base.prototype._uiSetCaption = function(v) {/*do nothing*/};
    },

	/**
    * @description Adjusts the width of the TH and the TDs to make sure that the two are in sync
	* 
	* Implementation Details: 
	* 	Compares the width of the TH liner div to the the width of the TD node. The TD liner width
	*	is not actually used because the TD often stretches past the liner if the parent DIV is very
	*	large. Measuring the TD width is more accurate.
	*	
	*	Instead of measuring via .get('width'), 'clientWidth' is used, as it returns a number, whereas
	*	'width' returns a string, In IE6, 'clientWidth' is not supported, so 'offsetWidth' is used.
	*	'offsetWidth' is not as accurate on Chrome,FF as 'clientWidth' - thus the need for the fork.
	* 
    * @method _syncWidths
    * @private
    */
	_syncWidths: function() {
		var th = YNode.all('#'+this._parentContainer.get('id')+' .yui3-datatable-hd table thead th'), //nodelist of all THs
			td = YNode.one('#'+this._parentContainer.get('id')+' .yui3-datatable-bd table .yui3-datatable-data').get('firstChild').get('children'), //nodelist of all TDs in 1st row
			i,
			len,
			thWidth, tdWidth, thLiner, tdLiner,
			ie = YUA.ie;
			//stylesheet = new YStyleSheet('columnsSheet'),
			//className;
			
			/*
			This for loop goes through the first row of TDs in the table.
			In a table, the width of the row is equal to the width of the longest cell in that column.
			Therefore, we can observe the widths of the cells in the first row only, as they will be the same in all the cells below (in each respective column)
			*/
			for (i=0, len = th.size(); i<len; i++) { 
				
				//className = '.'+td.item(i).get('classList')._nodes[0];
				//If a width has not been already set on the TD:
				//if (td.item(i).get('firstChild').getStyle('width') === "auto") {
					
					//Get the liners for the TH and the TD cell in question
					thLiner = th.item(i).get('firstChild'); //TODO: use liner API - how? this is a node.
					tdLiner = td.item(i).get('firstChild');
					
					/*
					If browser is not IE - get the clientWidth of the Liner div and the TD.
					Note: 	We are not getting the width of the TDLiner, we are getting the width of the actual cell.
							Why? Because when the table is set to auto width, the cell will grow to try to fit the table in its container.
							The liner could potentially be much smaller than the cell width.
							
							TODO: Explore if there is a better way using only LINERS widths
					*/
					if (!ie) {
						thWidth = thLiner.get('clientWidth'); //TODO: this should actually be done with getComputedStyle('width') but this messes up columns. Explore this option.
						tdWidth = td.item(i).get('clientWidth');
					}
					
					//IE wasn't recognizing clientWidths, so we are using offsetWidths.
					//TODO: should use getComputedStyle('width') because offsetWidth will screw up when padding is changed.
					else {
						thWidth = thLiner.get('offsetWidth');
						tdWidth = td.item(i).get('offsetWidth');
						//thWidth = parseFloat(thLiner.getComputedStyle('width').split('px')[0]);
						//tdWidth = parseFloat(td.item(i).getComputedStyle('width').split('px')[0]); /* TODO: for some reason, using tdLiner.get('clientWidth') doesn't work - why not? */
					}
										
					//if TH is bigger than TD, enlarge TD Liner
					if (thWidth > tdWidth) {
						tdLiner.setStyle('width', (thWidth - 20 + 'px'));
						//thLiner.setStyle('width', (tdWidth - 20 + 'px'));
						//stylesheet.set(className,{'width': (thWidth - 20 + 'px')});
					}
					
					//if TD is bigger than TH, enlarge TH Liner
					else if (tdWidth > thWidth) {
						thLiner.setStyle('width', (tdWidth - 20 + 'px'));
						tdLiner.setStyle('width', (tdWidth - 20 + 'px')); //if you don't set an explicit width here, when the width is set in line 368, it will auto-shrink the widths of the other cells (because they dont have an explicit width)
						//stylesheet.set(className,{'width': (tdWidth - 20 + 'px')});
					}
					
				//}

			}
			
			//stylesheet.enable();

	},
	
	/**
    * @description Adds the approriate width to the liner divs of the TH nodes before they are appended to DOM
	*
    * @method _attachTheadThNode
    * @private
    */
	_attachTheadThNode: function(o) {
		var w = o.column.get('width') || 'auto';
		
		if (w !== 'auto') {
			o.th.get('firstChild').setStyles({width: w, overflow:'hidden'}); //TODO: use liner API but liner is undefined here (not created?)
		}
		return o;
	},
	
	/**
    * @description Adds the appropriate width to the liner divs of the TD nodes before they are appended to DOM
	*
    * @method _attachTbodyTdNode
    * @private
    */
	_attachTbodyTdNode: function(o) {
		var w = o.column.get('width') || 'auto';
		
		if (w !== 'auto') {
			o.td.get('firstChild').setStyles({width: w, overflow: 'hidden'}); //TODO: use liner API but liner is undefined here (not created?)
			//o.td.setStyles({'width': w, 'overflow': 'hidden'});
		}
		return o;
	},
	
	/**
    * @description Creates the body DIV that contains all the data. 
	*
    * @method _createBodyContainer
    * @private
    */
	_createBodyContainer: function() {
		var	bd = YNode.create(CONTAINER_BODY),
			onScrollFn = Y.bind("_onScroll", this);
			
		this._bodyContainerNode = bd;		
		this._setStylesForTbody();
		
		bd.appendChild(this._parentTableNode);
		this._parentContainer.appendChild(bd);
		bd.on('scroll', onScrollFn);
	},
	
	/**
    * @description Creates the DIV that contains a &lt;table&gt; with all the headers. 
	*
    * @method _createHeaderContainer
    * @private
    */
	_createHeaderContainer: function() {
		var hd = YNode.create(CONTAINER_HEADER),
			tbl = YNode.create(TEMPLATE_TABLE);
			
		this._headerContainerNode = hd;
		
		//hd.setStyle('backgroundColor',this.get("COLOR_COLUMNFILLER"));
		this._setStylesForThead();
		tbl.appendChild(this._parentTheadNode);
		hd.appendChild(tbl);
		this._parentContainer.prepend(hd);
		
	},
	
	/**
    * @description Creates styles for the TBODY based on what type of table it is.
	*
    * @method _setStylesForTbody
    * @private
    */
	_setStylesForTbody: function() {
		var dir = this.get('_scroll'),
			w = this.get('width') || "",
			h = this.get('height') || "",
			el = this._bodyContainerNode,
			styles = {width:"", height:h};
				
		if (dir === 'x') {
			//X-Scrolling tables should not have a Y-Scrollbar so overflow-y is hidden. THe width on x-scrolling tables must be set by user.
			styles.overflowY = 'hidden';
			styles.width = w;
		}
		else if (dir === 'y') {
			//Y-Scrolling tables should not have a X-Scrollbar so overflow-x is hidden. The width isn't neccessary because it can be auto.
			styles.overflowX = 'hidden';
		}
		
		else if (dir === 'xy') {
			styles.width = w;
		}
		
		else {
		    //scrolling is set to 'null' - ie: width and height are not set. Don't have any type of scrolling.
		    styles.overflowX = 'hidden';
		    styles.overflowY = 'hidden';
		    styles.width = w;
		}
		
		el.setStyles(styles);
		return el;
	},
	
	
	/**
    * @description Creates styles for the THEAD based on what type of datatable it is.
	*
    * @method _setStylesForThead
    * @private
    */
	_setStylesForThead: function() {
		var w = this.get('width') || "",
			el = this._headerContainerNode;
		
		//if (dir !== 'y') {
			el.setStyles({'width': w, 'overflow': 'hidden'});
		// }
	},
	
	/**
    * @description Sets an auto width on the content box if it doesn't exist or if its a y-datatable.
	*
    * @method _setContentBoxDimensions
    * @private
    */
	_setContentBoxDimensions: function() {
		
		if (this.get('_scroll') === 'y' || (!this.get('width'))) {
			this._parentContainer.setStyle('width', 'auto');
		}
		
	},
	
	/////////////////////////////////////////////////////////////////////////////
	//
	// Scroll Syncing
	//
	/////////////////////////////////////////////////////////////////////////////
	
	/**
    * @description Ensures that scrolling is synced across the two tables
	*
    * @method _onScroll
    * @private
    */
	_onScroll: function() {
		this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));
	},
	
	/**
	 * @description Syncs padding around scrollable tables, including Column header right-padding
	 * and container width and height.
	 *
	 * @method _syncScroll
	 * @private 
	 */
	_syncScroll : function() {
		this._syncScrollX();
		this._syncScrollY();
		this._syncScrollOverhang();
		if(YUA.opera) {
			// Bug 1925874
			this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));
			
			if(!this.get("width")) {
		 		// Bug 1926125
		 		document.body.style += '';
		 	}
		}
	},
	
	/**
	* @description Snaps container width for y-scrolling tables.
	*
	* @method _syncScrollY
	* @private
	*/
	_syncScrollY : function() {
		var tBody = this._parentTbodyNode,
		    tBodyContainer = this._bodyContainerNode,
			w;
		    // X-scrolling not enabled
			if(!this.get("width")) {
		        // Snap outer container width to content
		        w = (tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) ?
		    	// but account for y-scrollbar since it is visible
					(tBody.get('parentNode').get('clientWidth') + 19) + "px" :
		     		// no y-scrollbar, just borders
            		(tBody.get('parentNode').get('clientWidth') + 2) + "px";
				this._parentContainer.setStyle('width', w);
		}
	},
		
	/**
	 * @description Snaps container height for x-scrolling tables in IE. Syncs message TBODY width. 
	 * Taken from YUI2 ScrollingDataTable.js
	 *
	 * @method _syncScrollX
	 * @private
	 */
	_syncScrollX: function() {
		var tBody = this._parentTbodyNode,
			tBodyContainer = this._bodyContainerNode,
			w;
			this._headerContainerNode.set('scrollLeft', this._bodyContainerNode.get('scrollLeft'));
			
			if(!this.get('height') && (YUA.ie)) {
						w = (tBodyContainer.get('scrollWidth') > tBodyContainer.get('offsetWidth')) ?
			            (tBody.get('parentNode').get('offsetHeight') + 18) + "px" : 
			            tBody.get('parentNode').get('offsetHeight') + "px";
						
						tBodyContainer.setStyle('height', w);
					}
			
		if (tBody.get('rows').length === 0) {
			this._parentMsgNode.get('parentNode').setStyle('width', this._parentTheadNode.get('parentNode').get('offsetWidth')+'px');
		}
		else {
			this._parentMsgNode.get('parentNode').setStyle('width', "");
		}
			
	},
	
	/**
	 * @description Adds/removes Column header overhang as necesary.
	 * Taken from YUI2 ScrollingDataTable.js
	 *
	 * @method _syncScrollOverhang
	 * @private
	 */
	_syncScrollOverhang: function() {
		var tBodyContainer = this._bodyContainerNode,
			padding = 1;
		
		//when its both x and y scrolling
		if ((tBodyContainer.get('scrollHeight') > tBodyContainer.get('clientHeight')) || (tBodyContainer.get('scrollWidth') > tBodyContainer.get('clientWidth'))) {
			padding = 18;
		}
		
		this._setOverhangValue(padding);
		
		//After the widths have synced, there is a wrapping issue in the headerContainer in IE6. The header does not span the full
		//length of the table (does not cover all of the y-scrollbar). By adding this line in when there is a y-scroll, the header will span correctly.
		//TODO: this should not really occur on this.get('_scroll') === y - it should occur when scrollHeight > clientHeight, but clientHeight is not getting recognized in IE6?
		if (YUA.ie !== 0 && this.get('_scroll') === 'y' && this._bodyContainerNode.get('scrollHeight') > this._bodyContainerNode.get('offsetHeight'))
		{
			this._headerContainerNode.setStyle('width', this._parentContainer.get('width'));
		}
	},
	
	
	/**
	 * @description Sets Column header overhang to given width.
	 * Taken from YUI2 ScrollingDataTable.js with minor modifications
	 *
	 * @method _setOverhangValue
	 * @param nBorderWidth {Number} Value of new border for overhang. 
	 * @private
	 */ 
	_setOverhangValue: function(borderWidth) {
		var host = this.get('host'),
			cols = host.get('columnset').get('definitions'),
		 	//lastHeaders = cols[cols.length-1] || [],
	        len = cols.length,
	        value = borderWidth + "px solid " + this.get("COLOR_COLUMNFILLER"),
			children = YNode.all('#'+this._parentContainer.get('id')+ ' .' + CLASS_HEADER + ' table thead th');

		children.item(len-1).setStyle('borderRight', value);
	}
	
});

Y.namespace("Plugin").DataTableScroll = DataTableScroll;






}, '@VERSION@' ,{requires:['datatable-base','plugin','stylesheet']});
