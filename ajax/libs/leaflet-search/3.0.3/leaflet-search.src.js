/* 
 * Leaflet Control Search v3.0.3 - 2022-10-14 
 * 
 * Copyright 2022 Stefano Cudini 
 * stefano.cudini@gmail.com 
 * https://opengeo.tech/ 
 * 
 * Licensed under the MIT license. 
 * 
 * Demo: 
 * https://opengeo.tech/maps/leaflet-search/ 
 * 
 * Source: 
 * git@github.com:stefanocudini/leaflet-search.git 
 * 
 */
/*
	Name					Data passed			   Description

	Managed Events:
	 search:locationfound	{latlng, title, layer} fired after moved and show markerLocation
	 search:expanded		{}					   fired after control was expanded
	 search:collapsed		{}					   fired after control was collapsed
 	 search:cancel			{}					   fired after cancel button clicked

	Public methods:
	 setLayer()				L.LayerGroup()         set layer search at runtime
	 showAlert()            'Text message'         show alert message
	 searchText()			'Text searched'        search text by external code
*/

//TODO implement can do research on multiple sources layers and remote		
//TODO history: false,		//show latest searches in tooltip		
//FIXME option condition problem {autoCollapse: true, markerLocation: true} not show location
//FIXME option condition problem {autoCollapse: false }
//
//TODO here insert function  search inputText FIRST in _recordsCache keys and if not find results.. 
//  run one of callbacks search(sourceData,jsonpUrl or options.layer) and run this.showTooltip
//
//TODO change structure of _recordsCache
//	like this: _recordsCache = {"text-key1": {loc:[lat,lng], ..other attributes.. }, {"text-key2": {loc:[lat,lng]}...}, ...}
//	in this mode every record can have a free structure of attributes, only 'loc' is required
//TODO important optimization!!! always append data in this._recordsCache
//  now _recordsCache content is emptied and replaced with new data founded
//  always appending data on _recordsCache give the possibility of caching ajax, jsonp and layersearch!
//
//TODO here insert function  search inputText FIRST in _recordsCache keys and if not find results.. 
//  run one of callbacks search(sourceData,jsonpUrl or options.layer) and run this.showTooltip
//
//TODO change structure of _recordsCache
//	like this: _recordsCache = {"text-key1": {loc:[lat,lng], ..other attributes.. }, {"text-key2": {loc:[lat,lng]}...}, ...}
//	in this way every record can have a free structure of attributes, only 'loc' is required

(function (factory) {
    if(typeof define === 'function' && define.amd) {
    //AMD
        define(['leaflet'], factory);
    } else if(typeof module !== 'undefined') {
    // Node/CommonJS
        module.exports = factory(require('leaflet'));
    } else {
    // Browser globals
        if(typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {


L.Control.Search = L.Control.extend({
	
	includes: L.version[0]==='1' ? L.Evented.prototype : L.Mixin.Events,

	options: {
		url: '',						//url for search by ajax request, ex: "search.php?q={s}". Can be function to returns string for dynamic parameter setting
		layer: null,					//layer where search markers(is a L.LayerGroup)				
		sourceData: null,				//function to fill _recordsCache, passed searching text by first param and callback in second				
		//TODO implements uniq option 'sourceData' to recognizes source type: url,array,callback or layer				
		jsonpParam: null,				//jsonp param name for search by jsonp service, ex: "callback"
		propertyLoc: 'loc',				//field for remapping location, using array: ['latname','lonname'] for select double fields(ex. ['lat','lon'] ) support dotted format: 'prop.subprop.title'
		propertyName: 'title',			//property in marker.options(or feature.properties for vector layer) trough filter elements in layer,
		formatData: null,				//callback for reformat all data from source to indexed data object
		filterData: null,				//callback for filtering data from text searched, params: textSearch, allRecords
		moveToLocation: null,			//callback run on location found, params: latlng, title, map
		buildTip: null,					//function to return row tip html node(or html string), receive text tooltip in first param
		container: '',					//container id to insert Search Control		
		zoom: null,						//default zoom level for move to location
		minLength: 1,					//minimal text length for autocomplete
		initial: true,					//search elements only by initial text
		casesensitive: false,			//search elements in case sensitive text
		autoType: true,					//complete input with first suggested result and select this filled-in text.
		delayType: 400,					//delay while typing for show tooltip
		tooltipLimit: -1,				//limit max results to show in tooltip. -1 for no limit, 0 for no results
		tipAutoSubmit: true,			//auto map panTo when click on tooltip
		firstTipSubmit: false,			//auto select first result con enter click
		autoResize: true,				//autoresize on input change
		collapsed: true,				//collapse search control at startup
		autoCollapse: false,			//collapse search control after submit(on button or on tips if enabled tipAutoSubmit)
		autoCollapseTime: 1200,			//delay for autoclosing alert and collapse after blur
		textErr: 'Location not found',	//error message
		textCancel: 'Cancel',		    //title in cancel button		
		textPlaceholder: 'Search...',   //placeholder value			
		hideMarkerOnCollapse: false,    //remove circle and marker on search control collapsed		
		position: 'topleft',		
		marker: {						//custom L.Marker or false for hide
			icon: false,				//custom L.Icon for maker location or false for hide
			animate: true,				//animate a circle over location found
			circle: {					//draw a circle in location found
				radius: 10,
				weight: 3,
				color: '#e03',
				stroke: true,
				fill: false
			}
		}
	},

	_getPath: function(obj, prop) {
		var parts = prop.split('.'),
			last = parts.pop(),
			len = parts.length,
			cur = parts[0],
			i = 1;

		if(len > 0)
			while((obj = obj[cur]) && i < len)
				cur = parts[i++];

		if(obj)
			return obj[last];
	},

	_isObject: function(obj) {
		return Object.prototype.toString.call(obj) === "[object Object]";
	},

	initialize: function(options) {
		L.Util.setOptions(this, options || {});
		this._inputMinSize = this.options.textPlaceholder ? this.options.textPlaceholder.length : 10;
		this._layer = this.options.layer || new L.LayerGroup();
		this._filterData = this.options.filterData || this._defaultFilterData;
		this._formatData = this.options.formatData || this._defaultFormatData;
		this._moveToLocation = this.options.moveToLocation || this._defaultMoveToLocation;
		this._autoTypeTmp = this.options.autoType;	//useful for disable autoType temporarily in delete/backspace keydown
		this._countertips = 0;		//number of tips items
		this._recordsCache = {};	//key,value table! to store locations! format: key,latlng
		this._curReq = null;
	},

	onAdd: function (map) {
		this._map = map;
		this._container = L.DomUtil.create('div', 'leaflet-control-search');
		this._input = this._createInput(this.options.textPlaceholder, 'search-input');
		this._tooltip = this._createTooltip('search-tooltip');
		this._cancel = this._createCancel(this.options.textCancel, 'search-cancel');
		this._button = this._createButton(this.options.textPlaceholder, 'search-button');
		this._alert = this._createAlert('search-alert');

		if(this.options.collapsed===false)
			this.expand(this.options.collapsed);

		if(this.options.marker) {
			
			if(this.options.marker instanceof L.Marker || this.options.marker instanceof L.CircleMarker)
				this._markerSearch = this.options.marker;

			else if(this._isObject(this.options.marker))
				this._markerSearch = new L.Control.Search.Marker([0,0], this.options.marker);

			this._markerSearch._isMarkerSearch = true;
		}

		this.setLayer( this._layer );

		map.on({
			// 		'layeradd': this._onLayerAddRemove,
			// 		'layerremove': this._onLayerAddRemove
			'resize': this._handleAutoresize
			}, this);
		return this._container;
	},
	addTo: function (map) {

		if(this.options.container) {
			this._container = this.onAdd(map);
			this._wrapper = L.DomUtil.get(this.options.container);
			this._wrapper.style.position = 'relative';
			this._wrapper.appendChild(this._container);
		}
		else
			L.Control.prototype.addTo.call(this, map);

		return this;
	},

	onRemove: function(map) {
		this._recordsCache = {};
		// map.off({
		// 		'layeradd': this._onLayerAddRemove,
		// 		'layerremove': this._onLayerAddRemove
		// 	}, this);
		map.off({
			// 		'layeradd': this._onLayerAddRemove,
			// 		'layerremove': this._onLayerAddRemove
			'resize': this._handleAutoresize
			}, this);
	},

	// _onLayerAddRemove: function(e) {
	// 	//without this, run setLayer also for each Markers!! to optimize!
	// 	if(e.layer instanceof L.LayerGroup)
	// 		if( L.stamp(e.layer) != L.stamp(this._layer) )
	// 			this.setLayer(e.layer);
	// },

	setLayer: function(layer) {	//set search layer at runtime
		//this.options.layer = layer; //setting this, run only this._recordsFromLayer()
		this._layer = layer;
		this._layer.addTo(this._map);
		return this;
	},
	
	showAlert: function(text) {
		var self = this;
		text = text || this.options.textErr;
		this._alert.style.display = 'block';
		this._alert.innerHTML = text;
		clearTimeout(this.timerAlert);
		
		this.timerAlert = setTimeout(function() {
			self.hideAlert();
		},this.options.autoCollapseTime);
		return this;
	},
	
	hideAlert: function() {
		this._alert.style.display = 'none';
		return this;
	},
		
	cancel: function() {
		this._input.value = '';
		this._handleKeypress({ keyCode: 8 });//simulate backspace keypress
		this._input.size = this._inputMinSize;
		this._input.focus();
		this._cancel.style.display = 'none';
		this._hideTooltip();
		this.fire('search:cancel');
		return this;
	},
	
	expand: function(toggle) {
		toggle = typeof toggle === 'boolean' ? toggle : true;
		this._input.style.display = 'block';
		L.DomUtil.addClass(this._container, 'search-exp');
		if ( toggle !== false ) {
			this._input.focus();
			this._map.on('dragstart click', this.collapse, this);
		}
		this.fire('search:expanded');
		return this;	
	},

	collapse: function() {
		this._hideTooltip();
		this.cancel();
		this._alert.style.display = 'none';
		this._input.blur();
		if(this.options.collapsed)
		{
			this._input.style.display = 'none';
			this._cancel.style.display = 'none';			
			L.DomUtil.removeClass(this._container, 'search-exp');		
			if (this.options.hideMarkerOnCollapse) {
				this._map.removeLayer(this._markerSearch);
			}
			this._map.off('dragstart click', this.collapse, this);
		}
		this.fire('search:collapsed');
		return this;
	},
	
	collapseDelayed: function() {	//collapse after delay, used on_input blur
		var self = this;
		if (!this.options.autoCollapse) return this;
		clearTimeout(this.timerCollapse);
		this.timerCollapse = setTimeout(function() {
			self.collapse();
		}, this.options.autoCollapseTime);
		return this;		
	},

	collapseDelayedStop: function() {
		clearTimeout(this.timerCollapse);
		return this;		
	},

	////start DOM creations
	_createAlert: function(className) {
		var alert = L.DomUtil.create('div', className, this._container);
		alert.style.display = 'none';

		L.DomEvent
			.on(alert, 'click', L.DomEvent.stop, this)
			.on(alert, 'click', this.hideAlert, this);

		return alert;
	},

	_createInput: function (text, className) {
		var self = this;
		var label = L.DomUtil.create('label', className, this._container);
		var input = L.DomUtil.create('input', className, this._container);
		input.type = 'text';
		input.size = this._inputMinSize;
		input.value = '';
		input.autocomplete = 'off';
		input.autocorrect = 'off';
		input.autocapitalize = 'off';
		input.placeholder = text;
		input.style.display = 'none';
		input.role = 'search';
		input.id = input.role + input.type + input.size;
		
		label.htmlFor = input.id;
		label.style.display = 'none';
		label.value = text;

		L.DomEvent
			.disableClickPropagation(input)
			.on(input, 'keyup', this._handleKeypress, this)
			.on(input, 'paste', function(e) {
				setTimeout(function(e) {
					self._handleKeypress(e);
				},10,e);
			}, this)
			.on(input, 'blur', this.collapseDelayed, this)
			.on(input, 'focus', this.collapseDelayedStop, this);
		
		return input;
	},

	_createCancel: function (title, className) {
		var cancel = L.DomUtil.create('a', className, this._container);
		cancel.href = '#';
		cancel.title = title;
		cancel.style.display = 'none';
		cancel.innerHTML = "<span>&otimes;</span>";//imageless(see css)

		L.DomEvent
			.on(cancel, 'click', L.DomEvent.stop, this)
			.on(cancel, 'click', this.cancel, this);

		return cancel;
	},
	
	_createButton: function (title, className) {
		var button = L.DomUtil.create('a', className, this._container);
		button.href = '#';
		button.title = title;

		L.DomEvent
			.on(button, 'click', L.DomEvent.stop, this)
			.on(button, 'click', this._handleSubmit, this)			
			.on(button, 'focus', this.collapseDelayedStop, this)
			.on(button, 'blur', this.collapseDelayed, this);

		return button;
	},

	_createTooltip: function(className) {
		var self = this;		
		var tool = L.DomUtil.create('ul', className, this._container);
		tool.style.display = 'none';
		L.DomEvent
			.disableClickPropagation(tool)
			.on(tool, 'blur', this.collapseDelayed, this)
			.on(tool, 'mousewheel', function(e) {
				self.collapseDelayedStop();
				L.DomEvent.stopPropagation(e);//disable zoom map
			}, this)
			.on(tool, 'mouseover', function(e) {
				self.collapseDelayedStop();
			}, this);
		return tool;
	},

	_createTip: function(text, val) {//val is object in recordCache, usually is Latlng
		var tip;
		
		if(this.options.buildTip)
		{
			tip = this.options.buildTip.call(this, text, val); //custom tip node or html string
			if(typeof tip === 'string')
			{
				var tmpNode = L.DomUtil.create('div');
				tmpNode.innerHTML = tip;
				tip = tmpNode.firstChild;
			}
		}
		else
		{
			tip = L.DomUtil.create('li', '');
			tip.innerHTML = text;
		}
		
		L.DomUtil.addClass(tip, 'search-tip');
		tip._text = text; //value replaced in this._input and used by _autoType

		if(this.options.tipAutoSubmit)
			L.DomEvent
				.disableClickPropagation(tip)		
				.on(tip, 'click', L.DomEvent.stop, this)
				.on(tip, 'click', function(e) {
					this._input.value = text;
					this._handleAutoresize();
					this._input.focus();
					this._hideTooltip();	
					this._handleSubmit();
				}, this);

		return tip;
	},

	//////end DOM creations

	_getUrl: function(text) {
		return (typeof this.options.url === 'function') ? this.options.url(text) : this.options.url;
	},

	_defaultFilterData: function(text, records) {
	
		var I, icase, regSearch, frecords = {};

		text = text.replace(/[.*+?^${}()|[\]\\]/g, '');  //sanitize remove all special characters
		if(text==='') {
			return [];
		}

		I = this.options.initial ? '^' : '';  //search only initial text
		icase = !this.options.casesensitive ? 'i' : undefined;

		regSearch = new RegExp(I + text, icase);

		for (let key in records) {
			if( regSearch.test(key) ) {
				frecords[key]= records[key];
			}
		}
		
		return frecords;
	},

	showTooltip: function(records) {
		
		this._countertips = 0;
		this._tooltip.innerHTML = '';
		this._tooltip.currentSelection = -1;  //inizialized for _handleArrowSelect()

		if(this.options.tooltipLimit)
		{
			for (let key in records)	//fill tooltip
			{
				if(this._countertips === this.options.tooltipLimit) {
					break;
				}
				
				this._countertips++;

				this._tooltip.appendChild( this._createTip(key, records[key]) );
			}
		}
		
		if(this._countertips > 0)
		{
			this._tooltip.style.display = 'block';
			
			if(this._autoTypeTmp) {
				this._autoType();
			}

			this._autoTypeTmp = this.options.autoType;//reset default value
		}
		else {
			this._hideTooltip();
		}

		this._tooltip.scrollTop = 0;

		return this._countertips;
	},

	_hideTooltip: function() {
		this._tooltip.style.display = 'none';
		this._tooltip.innerHTML = '';
		return 0;
	},

	_defaultFormatData: function(json) {	//default callback for format data to indexed data
		var self = this,
			propName = this.options.propertyName,
			propLoc = this.options.propertyLoc,
			jsonret = {};

		if( L.Util.isArray(propLoc) ) {
			for (let i in json) {
				jsonret[ self._getPath(json[i],propName) ]= L.latLng( self._getPath(json[i], propLoc[0]), self._getPath(json[i], propLoc[1]) );
			}
		}
		else {
			for (let i in json) {
				jsonret[ self._getPath(json[i],propName) ]= L.latLng( self._getPath(json[i],propLoc) );
			}
		}
		//TODO throw new Error("propertyName '"+propName+"' not found in JSON data");
		return jsonret;
	},

	_recordsFromJsonp: function(text, callAfter) {  //extract searched records from remote jsonp service
		L.Control.Search.callJsonp = callAfter;
		var script = L.DomUtil.create('script','leaflet-search-jsonp', document.getElementsByTagName('body')[0] ),			
			url = L.Util.template(this._getUrl(text)+'&'+this.options.jsonpParam+'=L.Control.Search.callJsonp', {s: text}); //parsing url
			//rnd = '&_='+Math.floor(Math.random()*10000);
			//TODO add rnd param or randomize callback name! in recordsFromJsonp
		script.type = 'text/javascript';
		script.src = url;
		return { abort: function() { script.parentNode.removeChild(script); } };
	},

	_recordsFromAjax: function(text, callAfter) {	//Ajax request
		if (window.XMLHttpRequest === undefined) {
			window.XMLHttpRequest = function() {
				try { return new ActiveXObject("Microsoft.XMLHTTP.6.0"); }
				catch  (e1) {
					try { return new ActiveXObject("Microsoft.XMLHTTP.3.0"); }
					catch (e2) { throw new Error("XMLHttpRequest is not supported"); }
				}
			};
		}
		var IE8or9 = ( L.Browser.ie && !window.atob && document.querySelector ),
			request = IE8or9 ? new XDomainRequest() : new XMLHttpRequest(),
			url = L.Util.template(this._getUrl(text), {s: text});

		//rnd = '&_='+Math.floor(Math.random()*10000);
		//TODO add rnd param or randomize callback name! in recordsFromAjax			
		
		request.open("GET", url);
		

		request.onload = function() {
			callAfter( JSON.parse(request.responseText) );
		};
		request.onreadystatechange = function() {
		    if(request.readyState === 4 && request.status === 200) {
		    	this.onload();
		    }
		};

		request.send();
		return request;   
	},

  _searchInLayer: function(layer, retRecords, propName) {
    var self = this, loc;

    if(layer instanceof L.Control.Search.Marker) return;

    if(layer instanceof L.Marker || layer instanceof L.CircleMarker)
    {
      if(self._getPath(layer.options,propName))
      {
        loc = layer.getLatLng();
        loc.layer = layer;
        retRecords[ self._getPath(layer.options,propName) ] = loc;
      }
      else if(self._getPath(layer.feature.properties,propName))
      {
        loc = layer.getLatLng();
        loc.layer = layer;
        retRecords[ self._getPath(layer.feature.properties,propName) ] = loc;
      }
      else {
        //throw new Error("propertyName '"+propName+"' not found in marker"); 
         
      }
    }
    else if(layer instanceof L.Path || layer instanceof L.Polyline || layer instanceof L.Polygon)
    {
      if(self._getPath(layer.options,propName))
      {
        loc = layer.getBounds().getCenter();
        loc.layer = layer;
        retRecords[ self._getPath(layer.options,propName) ] = loc;
      }
      else if(self._getPath(layer.feature.properties,propName))
      {
        loc = layer.getBounds().getCenter();
        loc.layer = layer;
        retRecords[ self._getPath(layer.feature.properties,propName) ] = loc;
      }
      else {
        //throw new Error("propertyName '"+propName+"' not found in shape"); 
         
      }
    }
    else if(layer.hasOwnProperty('feature'))//GeoJSON
    {
      if(layer.feature.properties.hasOwnProperty(propName))
      {
        if(layer.getLatLng && typeof layer.getLatLng === 'function') {
          loc = layer.getLatLng();
          loc.layer = layer;			
          retRecords[ layer.feature.properties[propName] ] = loc;
        } else if(layer.getBounds && typeof layer.getBounds === 'function') {
          loc = layer.getBounds().getCenter();
          loc.layer = layer;			
          retRecords[ layer.feature.properties[propName] ] = loc;
        } else {
          
        }
      }
      else {
        //throw new Error("propertyName '"+propName+"' not found in feature");
         
      }
    }
    else if(layer instanceof L.LayerGroup)
    {
      layer.eachLayer(function (layer) {
        self._searchInLayer(layer, retRecords, propName);
      });
    }
  },
	
	_recordsFromLayer: function() {	//return table: key,value from layer
		var self = this,
			retRecords = {},
			propName = this.options.propertyName;
		
		this._layer.eachLayer(function (layer) {
			self._searchInLayer(layer, retRecords, propName);
		});
		
		return retRecords;
	},
	
	_autoType: function() {
		
		//TODO implements autype without selection(useful for mobile device)
		
		var start = this._input.value.length,
			firstRecord = this._tooltip.firstChild ? this._tooltip.firstChild._text : '',
			end = firstRecord.length;

		if (firstRecord.indexOf(this._input.value) === 0) { // If prefix match
			this._input.value = firstRecord;
			this._handleAutoresize();

			if (this._input.createTextRange) {
				var selRange = this._input.createTextRange();
				selRange.collapse(true);
				selRange.moveStart('character', start);
				selRange.moveEnd('character', end);
				selRange.select();
			}
			else if(this._input.setSelectionRange) {
				this._input.setSelectionRange(start, end);
			}
			else if(this._input.selectionStart) {
				this._input.selectionStart = start;
				this._input.selectionEnd = end;
			}
		}
	},

	_hideAutoType: function() {	// deselect text:

		var sel;
		if ((sel = this._input.selection) && sel.empty) {
			sel.empty();
		}
		else if (this._input.createTextRange) {
			sel = this._input.createTextRange();
			sel.collapse(true);
			var end = this._input.value.length;
			sel.moveStart('character', end);
			sel.moveEnd('character', end);
			sel.select();
		}
		else {
			if (this._input.getSelection) {
				this._input.getSelection().removeAllRanges();
			}
			this._input.selectionStart = this._input.selectionEnd;
		}
	},
	
	_handleKeypress: function (e) {	//run _input keyup event
		var self = this;

		switch(e.keyCode)
		{
			case 27://Esc
				this.collapse();
			break;
			case 13://Enter
				if(this._countertips == 1 || (this.options.firstTipSubmit && this._countertips > 0)) {
          			if(this._tooltip.currentSelection == -1) {
						this._handleArrowSelect(1);
          			}
				}
				this._handleSubmit();	//do search
			break;
			case 38://Up
				this._handleArrowSelect(-1);
			break;
			case 40://Down
				this._handleArrowSelect(1);
			break;
			case  8://Backspace
			case 45://Insert
			case 46://Delete
				this._autoTypeTmp = false;//disable temporarily autoType
			break;
			case 37://Left
			case 39://Right
			case 16://Shift
			case 17://Ctrl
			case 35://End
			case 36://Home
			break;
			default://All keys
				if(this._input.value.length)
					this._cancel.style.display = 'block';
				else
					this._cancel.style.display = 'none';

				if(this._input.value.length >= this.options.minLength)
				{
					clearTimeout(this.timerKeypress);	//cancel last search request while type in				
					this.timerKeypress = setTimeout(function() {	//delay before request, for limit jsonp/ajax request

						self._fillRecordsCache();
					
					}, this.options.delayType);
				}
				else
					this._hideTooltip();
		}

		this._handleAutoresize();
	},

	searchText: function(text) {
		var code = text.charCodeAt(text.length);

		this._input.value = text;

		this._input.style.display = 'block';
		L.DomUtil.addClass(this._container, 'search-exp');

		this._autoTypeTmp = false;

		this._handleKeypress({keyCode: code});
	},
	
	_fillRecordsCache: function() {

		var self = this,
			inputText = this._input.value, records;

		if(this._curReq && this._curReq.abort)
			this._curReq.abort();
		//abort previous requests

		L.DomUtil.addClass(this._container, 'search-load');	

		if(this.options.layer)
		{
			//TODO _recordsFromLayer must return array of objects, formatted from _formatData
			this._recordsCache = this._recordsFromLayer();
			
			records = this._filterData( this._input.value, this._recordsCache );

			this.showTooltip( records );

			L.DomUtil.removeClass(this._container, 'search-load');
		}
		else
		{
			if(this.options.sourceData)
				this._retrieveData = this.options.sourceData;

			else if(this.options.url)	//jsonp or ajax
				this._retrieveData = this.options.jsonpParam ? this._recordsFromJsonp : this._recordsFromAjax;

			this._curReq = this._retrieveData.call(this, inputText, function(data) {
				
				self._recordsCache = self._formatData.call(self, data);

				//TODO refact!
				if(self.options.sourceData)
					records = self._filterData( self._input.value, self._recordsCache );
				else
					records = self._recordsCache;

				self.showTooltip( records );
 
				L.DomUtil.removeClass(self._container, 'search-load');
			});
		}
	},
	
	_handleAutoresize: function() {
	    var maxWidth;

		if (this._input.style.maxWidth !== this._map._container.offsetWidth) {
			maxWidth = this._map._container.clientWidth;

			// other side margin + padding + width border + width search-button + width search-cancel
			maxWidth -= 10 + 20 + 1 + 30 + 22; 

			this._input.style.maxWidth = maxWidth.toString() + 'px';
		}

		if (this.options.autoResize && (this._container.offsetWidth + 20 < this._map._container.offsetWidth)) {
			this._input.size = this._input.value.length < this._inputMinSize ? this._inputMinSize : this._input.value.length;
		}
	},

	_handleArrowSelect: function(velocity) {
	
		var searchTips = this._tooltip.hasChildNodes() ? this._tooltip.childNodes : [];
			
		for (let i=0; i<searchTips.length; i++) {
			L.DomUtil.removeClass(searchTips[i], 'search-tip-select');
		}
		
		if ((velocity == 1 ) && (this._tooltip.currentSelection >= (searchTips.length - 1))) {// If at end of list.
			L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');
		}
		else if ((velocity == -1 ) && (this._tooltip.currentSelection <= 0)) { // Going back up to the search box.
			this._tooltip.currentSelection = -1;
		}
		else if (this._tooltip.style.display != 'none') {
			this._tooltip.currentSelection += velocity;
			
			L.DomUtil.addClass(searchTips[this._tooltip.currentSelection], 'search-tip-select');
			
			this._input.value = searchTips[this._tooltip.currentSelection]._text;

			// scroll:
			var tipOffsetTop = searchTips[this._tooltip.currentSelection].offsetTop;
			
			if (tipOffsetTop + searchTips[this._tooltip.currentSelection].clientHeight >= this._tooltip.scrollTop + this._tooltip.clientHeight) {
				this._tooltip.scrollTop = tipOffsetTop - this._tooltip.clientHeight + searchTips[this._tooltip.currentSelection].clientHeight;
			}
			else if (tipOffsetTop <= this._tooltip.scrollTop) {
				this._tooltip.scrollTop = tipOffsetTop;
			}
		}
	},

	_handleSubmit: function() {	//button and tooltip click and enter submit

		this._hideAutoType();
		
		this.hideAlert();
		this._hideTooltip();

		if(this._input.style.display == 'none')	//on first click show _input only
			this.expand();
		else
		{
			if(this._input.value === '')	//hide _input only
				this.collapse();
			else
			{
				var loc = this._getLocation(this._input.value);
				
				if(loc===false)
					this.showAlert();
				else
				{
					this.showLocation(loc, this._input.value);
					this.fire('search:locationfound', {
							latlng: loc,
							text: this._input.value,
							layer: loc.layer ? loc.layer : null
						});
				}
			}
		}
	},

	_getLocation: function(key) {	//extract latlng from _recordsCache

		if( this._recordsCache.hasOwnProperty(key) )
			return this._recordsCache[key];//then after use .loc attribute
		else
			return false;
	},

	_defaultMoveToLocation: function(latlng, title, map) {
		if(this.options.zoom)
 			this._map.setView(latlng, this.options.zoom);
 		else
			this._map.panTo(latlng);
	},

	showLocation: function(latlng, title) {	//set location on map from _recordsCache
		var self = this;

		self._map.once('moveend zoomend', function(e) {

			if(self._markerSearch) {
				self._markerSearch.addTo(self._map).setLatLng(latlng);
			}
			
		});

		self._moveToLocation(latlng, title, self._map);
		//FIXME autoCollapse option hide self._markerSearch before visualized!!
		if(self.options.autoCollapse)
			self.collapse();

		return self;
	}
});

L.Control.Search.Marker = L.Marker.extend({

	includes: L.version[0]==='1' ? L.Evented.prototype : L.Mixin.Events,
	
	options: {
		icon: new L.Icon.Default(),
		animate: true,
		circle: {
			radius: 10,
			weight: 3,
			color: '#e03',
			stroke: true,
			fill: false
		}
	},
	
	initialize: function (latlng, options) {
		L.setOptions(this, options);

		if(options.icon === true)
			options.icon = new L.Icon.Default();

		L.Marker.prototype.initialize.call(this, latlng, options);
		
		if( L.Control.Search.prototype._isObject(this.options.circle) )
			this._circleLoc = new L.CircleMarker(latlng, this.options.circle);
	},

	onAdd: function (map) {
		L.Marker.prototype.onAdd.call(this, map);
		if(this._circleLoc) {
			map.addLayer(this._circleLoc);
			if(this.options.animate)
				this.animate();
		}
	},

	onRemove: function (map) {
		L.Marker.prototype.onRemove.call(this, map);
		if(this._circleLoc)
			map.removeLayer(this._circleLoc);
	},
	
	setLatLng: function (latlng) {
		L.Marker.prototype.setLatLng.call(this, latlng);
		if(this._circleLoc)
			this._circleLoc.setLatLng(latlng);
		return this;
	},
	
	_initIcon: function () {
		if(this.options.icon)
			L.Marker.prototype._initIcon.call(this);
	},

	_removeIcon: function () {
		if(this.options.icon)
			L.Marker.prototype._removeIcon.call(this);
	},

	animate: function() {
	//TODO refact animate() more smooth! like this: http://goo.gl/DDlRs
		if(this._circleLoc)
		{
			var circle = this._circleLoc,
				tInt = 200,	//time interval
				ss = 5,	//frames
				mr = parseInt(circle._radius/ss),
				oldrad = this.options.circle.radius,
				newrad = circle._radius * 2,
				acc = 0;

			circle._timerAnimLoc = setInterval(function() {
				acc += 0.5;
				mr += acc;	//adding acceleration
				newrad -= mr;
				
				circle.setRadius(newrad);

				if(newrad<oldrad)
				{
					clearInterval(circle._timerAnimLoc);
					circle.setRadius(oldrad);//reset radius
					//if(typeof afterAnimCall == 'function')
						//afterAnimCall();
						//TODO use create event 'animateEnd' in L.Control.Search.Marker 
				}
			}, tInt);
		}
		
		return this;
	}
});

L.Map.addInitHook(function () {
    if (this.options.searchControl) {
        this.searchControl = L.control.search(this.options.searchControl);
        this.addControl(this.searchControl);
    }
});

L.control.search = function (options) {
    return new L.Control.Search(options);
};

return L.Control.Search;

});


