/*
HeapBox 0.9.1
(c) 2013 Filip Bartos
*/


;(function ( $, window, document, undefined ) {

    var pluginName = "heapbox",
        defaults = {
	    effect: {
		  "type": "slide",
		  "speed": "slow"
        },
        insert: "before",
        emptyMessage: 'Empty',
	    openStart: function(){},
	    openComplete: function(){},
	    closeStart: function(){},
	    closeComplete: function(){},
	    onChange: function(){}
        };

    function Plugin( element, options ) {
        
	    /* Settings */
	    this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
	    this.instance;
	    this.callbackManager = new Array();

        this.init();
    }

    Plugin.prototype = {

    /*
	 * Heapbox init
	*/
    init: function() {       
		this._hideSourceElement();
    	this._isSourceSelectbox();
		this.instance = this.createInstance();
		this._createElements();
		this._setDefaultValues();
	},

	/*
    *  Generate new ID for selectbox
	*/
	createInstance: function() {
         return {
	          heapId: Math.round(Math.random() * 99999999),
		      state: false
		 };
	 },

	/*
	 * Set events
	*/
	_setEvents: function() {
		var self = this;
		this._setControlsEvents();

		$(document).on("click", "html", function(e){ e.stopPropagation();self._closeheap(true,function(){},function(){});});   
	},

	/*
	 * Create heapbox html structure
	*/
    _createElements: function() {

		var self = this;
		heapBoxEl = $('<div/>', {  
			id: 'heapbox_'+this.instance.heapId,
			'class': 'heapBox',
			data: {'sourceElement':this.element}
		});

		heapBoxHolderEl = $('<a/>', {  
	       	href: '',
			'class': 'holder'
		});

		heapBoxHandlerEl = $('<a/>', {  
	       	href: '',
			'class': 'handler'
		});

		heapBoxheapEl = $('<div/>', {  
			'class': 'heap'
		});
		
		heapBoxEl.append(heapBoxHolderEl);		
		heapBoxEl.append(heapBoxHandlerEl);

		heapBoxEl.append(heapBoxheapEl);
		this.heapBoxEl = heapBoxEl;
		this._insertHeapbox(this.heapBoxEl);
    },

	/*
	 * Insert heapbox
	*/
    _insertHeapbox: function(heapbox) {
	
    if(this.isSourceElementSelect && this.options.insert == "inside")
    	this.options.insert = "before";

	switch(this.options.insert) {
		
		  case "before":
			$(this.element).before(heapbox);
			break;
		  case "after":
			$(this.element).after(heapbox);
			break;
		  case "inside":
			$(this.element).html(heapbox);
			this._showSourceElement();
			break;
		  default: 
			$(this.element).before(heapbox);
			break;
		}
    },

    /*
     * Fill heapbox with init data
     */
    _setDefaultValues: function()
    {
		this._initHeap();
		this._setHolderTitle();
		this._setEvents();
    },

    /*
     * Fill heapbox with init data
     */
     _initHeap: function(){

     	var initData;

     	if(this.isSourceElementSelect){
     		initData = this._optionsToJson();
     		this._setData(initData);
     	}
    },

    /*
     * Set title of holder
     */
    _setHolderTitle: function()
    {
    	var self = this;

		holderEl = $("#heapbox_"+this.instance.heapId).find(".holder");
		selectedEl = $("#heapbox_"+this.instance.heapId).find(".heap ul li a.selected").last();

    	if((!this._isHeapEmpty()) && (selectedEl.length == 0)) 
    	{
    		firstHeapEl = $("#heapbox_"+this.instance.heapId).find(".heap ul li a").first();
			holderEl.text(firstHeapEl.text());
			holderEl.attr("rel",firstHeapEl.attr("rel"));
    	}
    	else if(selectedEl.length != 0)
    	{
    		holderEl.text(selectedEl.text());
    		holderEl.attr("rel",selectedEl.attr("rel"));
    	}
    	else
    	{
    		holderEl.text(this.options.emptyMessage);
    		this._removeHeapboxHolderEvents();
    		this._removeHeapboxHandlerEvents();
    	}
    },

    /*
     * Set data to heap
     */
    _setData: function(data)
    {
    	var self = this;
		var _data = jQuery.parseJSON(data);

		if(this.isSourceElementSelect) this._refreshSourceSelectbox(_data);

		heapBoxheapOptionsEl = $('<ul/>', {  
			'class': 'heapOptions'
		});
    	
    	$.each(_data,function(){

    		heapBoxOptionLiEl = $('<li/>', {  
				'class': 'heapOption'
			});

			heapBoxheapOptionAEl = $('<a/>', {  
				href: '',
				rel: this.value,
				title: this.text,
				text: this.text,
				'class': this.selected ? 'selected':'',
				click: function(e){
			   	    e.preventDefault();
			        e.stopPropagation();
				    self._heapChanged(self,this);
				}
			});
			
			heapBoxOptionLiEl.append(heapBoxheapOptionAEl);
			heapBoxheapOptionsEl.append(heapBoxOptionLiEl);
		});

		$("div#heapbox_"+this.instance.heapId+" .heap ul").remove();
		$("div#heapbox_"+this.instance.heapId+" .heap").append(heapBoxheapOptionsEl);
    },

    /*
     * If source element is <select>, get options as json
     */

    _optionsToJson: function(){

    	var options = [];

    	$(this.element).find("option").each(function(){
   
    		options.push({
    			'value': $(this).attr("value"),
    			'text': $(this).text(),
    			'selected': $(this).is(":selected") ? "selected":''
    		});
    	});
    	
    	var jsonText = JSON.stringify(options);
    	return jsonText;
    },

    /*
     * Get actual heapbox state as json
     */
    _heapboxToJson: function() {
		var options = [];

		$("div#heapbox_"+this.instance.heapId+" .heap ul li a").each(function(){

			options.push({
    			'value': $(this).attr("rel"),
    			'text': $(this).text(),
    			'selected': $(this).is(":selected") ? "selected":''
    		});
		});

		var jsonText = JSON.stringify(options);
    	return jsonText;
    },
	/*
	 * Check if heap is empty
	*/     
	_isHeapEmpty: function() {
		var length = $("div#heapbox_"+this.instance.heapId+" .heap ul li").length;

		return length == 0;
	},

	/*
	 * Set events for heapbox controls
	*/     
	_setControlsEvents: function() {
		
		if(!this._isHeapEmpty())
		{
			this._setHeapboxHolderEvents();
			this._setHeapboxHandlerEvents();
		}
	},
	/*
	 * Check if source element is selectbox
	 */
	_isSourceSelectbox: function() {
		this.isSourceElementSelect = $(this.element).is("select");
	},

	/*
	 * Refresh source selectbox
	 */
	_refreshSourceSelectbox: function(data) {
		var self = this;

		$(this.element).find("option").remove();

		$.each(data,function(){
			option = $('<option/>',{  
              value: this.value,
			  text: this.text,
			});

			if(this.selected == "selected") option.attr("selected","selected");

			$(self.element).append(option);	
		});	
	},

	/*
	 * Change selected option 
	 */
	_setSelectedOption: function(value) {
		var self = this;
		this._deselectSelectedOptions();

		$(this.element).val(value);
		$(this.element).find("option[value="+value+"]").attr("selected","selected");
	},

	/*
	 * Remove selected attribute from all options in source selectbox
	 */
	_deselectSelectedOptions: function() {
		select = $(this.element).find("option");

		select.each(function(){
			$(this).removeAttr("selected");
		});
	},

	/*
	 * Set events to heapbox holder control
	*/     
	_setHeapboxHolderEvents: function() {
		
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		heapBoxEl.find(".holder").click(function(e){
			e.preventDefault();
			e.stopPropagation();
			self._handlerClicked();
		});
	},

	/*
	 * Set events to heapbox handler control
	*/   
	_setHeapboxHandlerEvents: function() {
	
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		heapBoxEl.find(".handler").click(function(e){
			e.preventDefault();
			e.stopPropagation();
			self._handlerClicked();
		});
	},

	/*
	 * Remove events from heapbox holder control
	*/     
	_removeHeapboxHolderEvents: function() {
		
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		heapBoxEl.find(".holder").unbind('click');
		heapBoxEl.find(".holder").click(function(e){e.preventDefault();})
	},

	/*
	 * Remove events from heapbox handler control
	*/     
	_removeHeapboxHandlerEvents: function() {
		
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		heapBoxEl.find(".handler").unbind('click');
		heapBoxEl.find(".handler").click(function(e){e.preventDefault();})
	},

	/*
	 * Selectbox open-close handler
	*/
	_handlerClicked: function(stageReady) {
		
		if(this.instance.state)
		{
	       this._closeheap();
		}
		else
		{
		  if(!stageReady) this._closeOthers();
		  else this._openheap();
		}
	},

	/*
	 * Selectbox change handler
	*/
	_heapChanged: function(self,clickedEl) {
	
		this._closeheap(true,function(){},function(){});
		this._setSelected($(clickedEl));
		this._setHolderTitle();
		this._setSelectedOption($(clickedEl).attr("rel"));
		
		this.options.onChange($(clickedEl).attr("rel"));
	},


	/*
	 * Add class "selected" to selected option in heapbox
	 */
	_setSelected: function(selectedEl) {
		this._deselectAll();
		selectedEl.addClass("selected");
	},

	_deselectAll: function() {
		heapLinks = $("#heapbox_"+this.instance.heapId).find(".heap ul li a");
		heapLinks.each(function(){
			$(this).removeClass("selected");
		});
	},

	/*
	 * Close opened selectbox
	*/
	_closeheap: function(internal,closeStartEvent,closeCompleteEvent) {
		
		heapEl = $("#heapbox_"+this.instance.heapId).find(".heap");	
		if(heapEl.is(":animated") && !internal) return false;	
		this.instance.state = false;

		if(internal){
		  closeStartEvent = closeStartEvent;
		  closeCompleteEvent = closeCompleteEvent;
		}else{
		  closeStartEvent = this.options.closeStart;
		  closeCompleteEvent = this.options.closeComplete;
		}
			
		closeStartEvent.call();		

		switch(this.options.effect.type) {
		
		  case "fade":
			heapEl.fadeOut(this.options.effect.speed,closeCompleteEvent);	
			break;
		  case "slide":

			heapEl.slideUp(this.options.effect.speed,closeCompleteEvent);	
			break;
		  case "standard":
			heapEl.css("display","none");
 			closeCompleteEvent.call();
			break;
		  default: 
			heapEl.slideUp(this.options.effect.speed,closeCompleteEvent);	
			break;

		}
	},
	
	/*
	 * Open selectbox
	*/
	_openheap: function() {
		
		heapEl = $("#heapbox_"+this.instance.heapId).find(".heap");		
		if(heapEl.is(":animated")) return false;
		this.instance.state = true;
		
		this.options.openStart.call();

		switch(this.options.effect.type) {
		
		  case "fade":
			heapEl.fadeIn(this.options.effect.speed,this.options.openComplete);	
			break;
		  case "slide":
			heapEl.slideDown(this.options.effect.speed,this.options.openComplete);	
			break;
		  case "standard":
			heapEl.css("display","block");
 			this.options.openComplete.call();
			break;
		  default: 
			heapEl.slideDown(this.options.effect.speed,this.options.openComplete);	
			break;
		}
	},

	/*
	 * Close other selectboxes
	*/
	_closeOthers: function() {
	
		var self = this;
	
		$('div[id^=heapbox_]').each(function(index){

			 el = $("div#"+$(this).attr("id"));

			 if(el.data("sourceElement"))
			 {
				sourceEl = $.data(this, "sourceElement");
				heapBoxInst = $.data(sourceEl, "plugin_" + pluginName);
				
				if(self.instance.heapId != heapBoxInst.instance.heapId)
				{	
				     if(heapBoxInst.instance.state)
				     {
				       self._callbackManager('change','_closeOthers',true);
				       heapBoxInst._closeheap(true,function(){},function(){self._callbackManager('change','_closeOthers',false);});
				     }
				}
			 }
		});

		 self._callbackManager('test','_closeOthers');
	},

	/*
	 * Manager of callback queue
	*/
	_callbackManager: function(type,identificator,state) 
	{	
		if(!this.callbackManager[identificator])
			this.callbackManager[identificator] = 0;
			
		if(type == "change")
		{
			state ? this.callbackManager[identificator]++ : this.callbackManager[identificator]--;
			this._callbackManager('test',identificator);

		}else if(type == "test"){
			if(this.callbackManager[identificator] == 0) this._handlerClicked(true);
		}	
	},

	/*
	 * Set own data to heap 
	 */
	set: function(data) {
		this._setData(data);
		this._setHolderTitle();
		this._setEvents();
	},

	update: function() {
		this._setDefaultValues();	
	},
	_hideSourceElement: function() {
		$(this.element).css("display","none");
	},
	_showSourceElement: function() {
		$(this.element).css("display","block");
	},
	hide: function() {	
		$("div#heapbox_"+this.instance.heapId).css("visibility","hidden");
	},
	show: function() {
		$("div#heapbox_"+this.instance.heapId).css("visibility","visible");
	},
	disable: function() {
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);
		heapBoxEl.addClass("disabled");

		this._removeHeapboxHandlerEvents();
		this._removeHeapboxHolderEvents();
		
		return this;
	},
	enable: function() {
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);
		heapBoxEl.removeClass("disabled");
		this._setEvents();

		return this;
	}
    };

    $.fn[pluginName] = function ( options, optional ) {

        return this.each(function () {
	
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
	    }
	    else
	    {
		heapBoxInst = $.data(this, "plugin_" + pluginName);

			switch(options)
			{
			case "update":
				heapBoxInst.update();
			    break;
			case "set":
				heapBoxInst.set(optional);
				break;
			case "hide":
				heapBoxInst.hide();
				break;
			case "show":
				heapBoxInst.show();
				break;
			case "disable":
				heapBoxInst.disable();
				break;
			case "enable":
				heapBoxInst.enable();
				break;
			}

	    }	
        });
    };

})( jQuery, window, document );
