/*
HeapBox 0.9.0
(c) 2013 Filip Bartos
*/

;(function ( $, window, document, undefined ) {

    var pluginName = "heapbox",
        defaults = {
	    effect: {
		  "type": "slide",
		  "speed": "slow"
        },
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
		this.instance = this.createInstance();
		this._createElements();
		this._hideSelect();
		this._setEvents();
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

		heapBoxheapEl = this._getheap();
		isHeapEmpty = heapBoxheapEl == null ? true : false;

		heapBoxHolderEl = this._createHolder(isHeapEmpty)

		heapBoxHandlerEl = $('<a/>', {  
	       	href: '',
			'class': 'handler'
		});
		
		heapBoxEl.append(heapBoxHolderEl);		
		heapBoxEl.append(heapBoxHandlerEl);
		heapBoxEl.append(heapBoxHandlerEl);

		heapBoxEl.append(heapBoxheapEl);
		this.heapBoxEl = heapBoxEl;
		$(this.element).before(this.heapBoxEl);
		this._setHeapboxControlsEvents(isHeapEmpty);
        },

	/*
	 * Set events for heapbox controls
	*/     
	_setHeapboxControlsEvents: function(isHeapEmpty) {

		this._setHeapboxHolderEvents(isHeapEmpty);
		this._setHeapboxHandlerEvents(isHeapEmpty);
	},

	/*
	 * Set events to heapbox holder control
	*/     
	_setHeapboxHolderEvents: function(isHeapEmpty) {
		
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		if(isHeapEmpty)
		{
			heapBoxEl.find(".holder").click(function(e){e.preventDefault();});
		}
		else
		{
			heapBoxEl.find(".holder").click(function(e){
			   e.preventDefault();
			   e.stopPropagation();
			   self._handlerClicked();
			   });
		}
	},

	/*
	 * Set events to heapbox handler control
	*/   
	_setHeapboxHandlerEvents: function(isHeapEmpty) {
	
		var self = this;
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);

		if(isHeapEmpty)
		{
			heapBoxEl.find(".handler").click(function(e){e.preventDefault();});
		}
		else
		{
			heapBoxEl.find(".handler").click(function(e){
			   e.preventDefault();
			   e.stopPropagation();
			   self._handlerClicked();
			   });
		}
	},

   	/*
	 * Get options from selectbox
	*/     
	_getheap: function() {
		
		var self = this;
	
		heapBoxheapEl = $('<div/>', {  
			'class': 'heap'
		});

		heapBoxheapOptionsEl = $('<ul/>', {  
			'class': 'heapOptions'
		});
	
		heapBoxheapEl.append(heapBoxheapOptionsEl);
		
		$(this.element).children().each(function(){
			
			heapBoxOptionLiEl = $('<li/>', {  
				'class': 'heapOption'
			});

			heapBoxheapOptionAEl = $('<a/>', {  
				href: '',
				rel: $(this).attr('value'),
				title: $(this).text(),
				text: $(this).text(),
				click: function(e){
			   	    e.preventDefault();
			        e.stopPropagation();
				    self._heapChanged(self,this);
				}
			});
			heapBoxOptionLiEl.append(heapBoxheapOptionAEl);
			heapBoxheapOptionsEl.append(heapBoxOptionLiEl);
		});

		heapBoxheapEl.append(heapBoxheapOptionsEl);
		
		return $(this.element).children().length == 0 ? null : heapBoxheapEl;
	},

	_createHolder: function(isHeapEmpty)
	{
		heapBoxHolderEl = $('<a/>', {  
	       	href: '',
			'class': 'holder',
			text: isHeapEmpty ? this.options.emptyMessage : $(this.element).children().first().text()	   
		});

		return heapBoxHolderEl;
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
	
		holderEl = $("#heapbox_"+this.instance.heapId).find(".holder");
		holderEl.text($(clickedEl).text());
		holderEl.attr("rel",$(clickedEl).attr("rel"));
		this._closeheap(true,function(){},function(){});

		$(this.element).val($(clickedEl).attr("rel"));
		this.options.onChange($(clickedEl).attr("rel"));
	},
	_heapSetFirst: function(self) {
		holderEl = $("#heapbox_"+this.instance.heapId).find(".holder");
		holderEl.text($(this.element).children().first().text());
		holderEl.attr("rel",$(this.element).children().first().attr("value"));
		$(this.element).val($(this.element).children().first().attr("value"));		
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
	 * Data setter
	*/
	setData: function(jsonOptions) {
		self = this;
		var jsonData = jQuery.parseJSON(jsonOptions);
		$(this.element).find("option").remove();
		
		$.each(jsonData,function(){
	
			option = $('<option/>', {  
                          value: this.value,
			  text: this.text
			});
			
			$(self.element).append(option);	
		});

		this.update();
	},

	/*
	 * Selectbox update
	*/
	update: function() {
	
		heap = this._getheap();
		$("div#heapbox_"+this.instance.heapId+" .heap").remove();
		$("div#heapbox_"+this.instance.heapId).append(heap);
		this._heapSetFirst(this);

	},
	_hideSelect: function() {
		$(this.element).css("display","none");
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
		heapBoxEl.find(".holder").unbind('click');
		heapBoxEl.find(".holder").click(function(e){e.preventDefault();})
		heapBoxEl.find(".handler").unbind('click');
		heapBoxEl.find(".handler").click(function(e){e.preventDefault();})
		
		return this;
	},
	enable: function() {
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);
		heapBoxEl.removeClass("disabled");
		this._setHeapboxControlsEvents();

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
				heapBoxInst.setData(optional);
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
