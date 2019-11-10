/*
HeapBox 0.9.4
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
		heapsize: undefined,
        emptyMessage: 'Empty',
        tabindex: 'undefined',
        title: undefined,
        showFirst: true,
        inheritVisibility: true,
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
		this.elem_isVisible = '';
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
	          heapId: $(this.element).attr('id') || Math.round(Math.random() * 99999999),
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

	_setSliderEvents: function() {

	    var self = this;
	    this.scrollingStatus = false;

	    heap = $("#heapbox_"+this.instance.heapId+" .heap");
	 
	 	// Slider Down
	    heap.find(".sliderDown").click(function(e){e.preventDefault();e.stopPropagation();self._setHeapboxFocus();});

	    heap.find(".sliderDown").mousedown(function(e){
		   self.scrollingStatus = true;
		   self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down");
		   self.interval = setInterval(function(){self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down");},300);	
	    }).mouseup(function(e){ 
	    	clearInterval(self.interval);
		    self.scrollingStatus = false;
	    }).mouseout(function(e){
	    	clearInterval(self.interval);
		    self.scrollingStatus = false;
	    });

		// Slider Up
	    heap.find(".sliderUp").click(function(e){e.preventDefault();e.stopPropagation();self._setHeapboxFocus();});

	    heap.find(".sliderUp").mousedown(function(e){
		   self.scrollingStatus = true;
		   self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up");
		   self.interval = setInterval(function(){self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up");},300);	
	    }).mouseup(function(e){ 
			clearInterval(self.interval);
		    self.scrollingStatus = false;
	    }).mouseout(function(e){
	    	clearInterval(self.interval);
		    self.scrollingStatus = false;
	    });

	},

	_setViewPosition: function(heapbox) {
	
		heap = $("div#heapbox_"+this.instance.heapId+" .heap");
		heap.show();
		var self = this;
		selected = heapbox.find(".heapOptions li a.selected");
		firstTop = heapbox.find(".heapOptions li a").first().offset().top;
		actTop = $(selected).offset().top;
		newTop = firstTop - actTop + this.sliderUpHeight;
		heapHeight = $("div#heapbox_"+this.instance.heapId+" .heapOptions").height();
		maxPosition = heapHeight-parseInt(this.options.heapsize,10)+this.sliderDownHeight;
		minPosition = 0+this.sliderUpHeight;
		
		if((-1*newTop) > maxPosition) newTop = -1*(maxPosition);
		heapbox.find(".heapOptions").css("top",newTop);
			
		if(!this.instance.state) heap.hide();
	},

	_setKeyboardEvents: function() {
		
		var self = this;

		heapbox = $("#heapbox_"+this.instance.heapId);

		heapbox.keydown(function(e) {

			switch(e.which)
			{
				case 13: self._handlerClicked();
						 return false;
						 break;
				case 27: self._closeheap();
						 break;
				case 37: self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up");
						 e.preventDefault();
						 break;
				case 39: self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down");
						 e.preventDefault();
						 break;
				case 38: self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"up");
						 e.preventDefault();
						 break;
				case 40: self._keyArrowHandler($("#heapbox_"+self.instance.heapId),"down");
					     e.preventDefault();
						 break;
			}
		});
	
	},
	
	/*
	 *	Adds mouse wheel events
	 *	@require	jquery-mousewheel
	 *	@see 		https://github.com/brandonaaron/jquery-mousewheel
	 */
	_setMouseWheelEvents:function() {
		
		var self = this,
			heapBoxEl = $("div#heapbox_"+this.instance.heapId+" .handler"),
			heap = heapBoxEl.find('div.heap');
			
		heapBoxEl.on('mousewheel',function(event,delta){
			
			event.preventDefault();
			if ( delta == -1 ) {
				heap.find(".sliderDown")
					.mousedown()
					.mouseup();
			} else {
				heap.find(".sliderUp")
					.mousedown()
					.mouseup();
			}
			
		});	
	},

	_keyArrowHandler:function(heapboxEl,direction){
		var self = this;
		var selected = false;

		heapboxEl.find("div.heap ul li").each(function(){
			if(($(this).find("a").hasClass("selected")))
			{	
				selected = true;
				
				selectItem = direction == "down" ? self._findNext($(this)):self._findPrev($(this));

				if(selectItem) {
					self._heapChanged(self,selectItem,true);
					return false;
				}
			}
		});

		if(selected == false) {
			selectItem = $("div#heapbox_"+self.instance.heapId+" .heapOptions .heapOption").first().find("a").addClass("selected");		
			self._heapChanged(self,selectItem,true);
		}

		self._setViewPosition($("#heapbox_"+self.instance.heapId));	
	},	

	/*
	 *	Adds mouse wheel events
	 *	@require	jquery-mousewheel
	 *	@see 		https://github.com/brandonaaron/jquery-mousewheel
	 */
	_setMouseWheelEvents: function() {
		var self = this,
			heapBoxEl = $("div#heapbox_"+this.instance.heapId),
			heap = heapBoxEl.find('div.heap');
			
		heapBoxEl.on('mousewheel',function(event,delta){
			event.preventDefault();
			if ( delta == -1 ) {
				heap.find(".sliderDown")
					.mousedown()
					.mouseup();
			} else {
				heap.find(".sliderUp")
					.mousedown()
					.mouseup();
			}
			
		});	
	},

	/*
	 * Find prev selectable heapbox option (ignore disabled)
	 */
	_findPrev:function(startItem){
		if(startItem.prev().length > 0){
			if(!startItem.prev().find("a").hasClass("disabled")) {
				return startItem.prev().find("a");
			}else{
				return this._findPrev(startItem.prev());
			}
		}
	},

	/*
	 * Find next selectable heapbox option (ignore disabled)
	 */
	_findNext:function(startItem){
		if(startItem.next().length > 0){
			if(!startItem.next().find("a").hasClass("disabled")) {
				return startItem.next().find("a");
			}else{
				return this._findNext(startItem.next());
			}
		}
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

		// Set visibility according to original <select> element
		if ( self.options.inheritVisibility == true && self.elem_isVisible == false ) {
			heapBoxEl.css('display','none');
		}

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
		
		this._initView(heapBoxEl);
		this._setHolderTitle();
		this._setTabindex();
		this._setEvents();
		this._handleFirst();
    },

    _setHeapboxFocus: function()
    {
    	heapbox = $("div#heapbox_"+this.instance.heapId+" .handler");
    	heapbox.focus();
    },

    _setHeapSize: function() {
		if(this.options.heapsize) {
			if(heapBoxheapEl.height() < parseInt(this.options.heapsize,10)) {
				delete this.options.heapsize;
				return;
			} else {
				heapBoxheapEl.css("height",this.options.heapsize);
			}
		}

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
     * Init view with right position
     */
     _initView: function(heapbox){

		if(this._isHeapEmpty()){
			return;
		}else{
			this._setViewPosition(heapbox);
		}
    },

    /*
     * Show or hide first option?
     */
     _handleFirst: function(){

     	if(!this.options.showFirst){
     		$("div#heapbox_"+this.instance.heapId+" .heapOptions .heapOption").first().remove();
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

    	if(selectedEl.length != 0)
    	{	
    		if(this.options.title){
    			holderEl.text(this.options.title);
    		}else{
    			holderEl.text(selectedEl.text());
    		}

    		holderEl.attr("rel",selectedEl.attr("rel"));
    
    		if(selectedEl.attr("data-icon-src")) {
				iconEl = this._createIconElement(selectedEl.attr("data-icon-src"));
				holderEl.append(iconEl);
			}
    	}
    	else
    	{
    		holderEl.text(this.options.emptyMessage);
    		this._removeHeapboxHolderEvents();
    		this._removeHeapboxHandlerEvents();
    	}
    },

    /*
     * Set tabindex to heapbox element
     */
    _setTabindex: function(){
    	var tabindex;
 
		tabindex = this.options.tabindex != "undefined" ? this.options.tabindex : $(this.element).attr("tabindex");

		if(tabindex != "undefined") {
			$("#heapbox_"+this.instance.heapId).attr("tabindex",tabindex);
		}
    },

    /*
     * Set data to heap
     */
    _setData: function(data)
    {
    	var self = this;
		var _data = jQuery.parseJSON(data);
		var selected = false;


		// No need to refresh the Select box
		// if(this.isSourceElementSelect) this._refreshSourceSelectbox(_data);

		heapBoxheapOptionsEl = $('<ul/>', {  
			'class': 'heapOptions'
		});
    	
    	$.each(_data,function(){

    		if(this.selected) { selected = true; }
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

			if(this.disabled) {
				heapBoxheapOptionAEl.unbind("click");
				heapBoxheapOptionAEl.addClass("disabled");
				heapBoxheapOptionAEl.click(function(e){
					e.preventDefault();
					e.stopPropagation();
				});
			}

			if(this.icon)
			{
				heapBoxheapOptionAEl.attr('data-icon-src',this.icon);
				heapBoxOptionIcon = self._createIconElement(this.icon);

				heapBoxheapOptionAEl.append(heapBoxOptionIcon);
			}
			
			heapBoxOptionLiEl.append(heapBoxheapOptionAEl);
			heapBoxheapOptionsEl.append(heapBoxOptionLiEl);
		});

		$("div#heapbox_"+this.instance.heapId+" .heap ul").remove();
		$("div#heapbox_"+this.instance.heapId+" .heap").append(heapBoxheapOptionsEl);

		

		this._setHeapSize();

		if(this._isHeapsizeSet()) {
			this._createSliderUpElement();
			this._createSliderDownElement();
		}

		if(selected != true){
			$("div#heapbox_"+this.instance.heapId+" .heap ul li a").first().addClass("selected");
		}

    },

   /*
     * Create sliderUp element 
     */ 
    _createSliderUpElement: function() {
			
		slideUp = $('<a/>', {  
				'class': 'sliderUp',
				'href': ''
		});
 		
		$("div#heapbox_"+this.instance.heapId+" .heap .heapOptions").before(slideUp);
		
		sliderUp = $("#heapbox_"+this.instance.heapId+" .sliderUp");
	    this.sliderUpHeight = parseInt(sliderUp.css("height"),10)+parseInt(sliderUp.css("border-top-width"),10)+parseInt(sliderUp.css("border-bottom-width"),10);

	    $("#heapbox_"+this.instance.heapId+" .heapOptions").css("top",this.sliderUpHeight);

    },

    /*
     * Create sliderDown element 
     */ 
    _createSliderDownElement: function() {
			
		slideDown = $('<a/>', {  
				'class': 'sliderDown',
				'href': ''
		});

		$("div#heapbox_"+this.instance.heapId+" .heap .heapOptions").after(slideDown);

	    sliderDown = $("#heapbox_"+this.instance.heapId+" .sliderDown");
	    this.sliderDownHeight = parseInt(sliderDown.css("height"),10)+parseInt(sliderDown.css("border-top-width"))+parseInt(sliderDown.css("border-bottom-width"));
    },

    /*
     * Creat img element for icon
     */ 
    _createIconElement: function(iconSrc) {
			
		heapBoxOptionIcon = $('<img/>', {
			src: iconSrc,
			alt: iconSrc
		});

		return heapBoxOptionIcon;
    },

    /*
     * If source element is <select>, get options as json
     */

    _optionsToJson: function(){

    	var options = [];
    	
    	$(this.element).find("option").each(function(){
   
    		options.push({
    			'value'		: $(this).attr("value"),
    			'text'		: $(this).text(),
    			'icon'		: $(this).attr("data-icon-src"),
    			'disabled'	: $(this).attr("disabled"),
    			'selected'	: $(this).is(":selected") ? "selected":''
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
			this._setKeyboardEvents();
			this._setSliderEvents();

			// Mouse Wheel events
			if ( typeof( $.event.special.mousewheel ) == 'object' ) {
				this._setMouseWheelEvents();
			}
		}
	},
	/*
	 * Check if source element is selectbox
	 */
	_isSourceSelectbox: function() {
		this.isSourceElementSelect = $(this.element).is("select");
	},

	/*
	 * Check if user defined heap size
	 */
	_isHeapsizeSet: function() {
		return this.options.heapsize ? true : false;
	},

	/*
	 * Refresh source selectbox
	 */
	_refreshSourceSelectbox: function(data) {
		var self = this;
		var selected = false;

		$(this.element).find("option").remove();

		$.each(data,function(){
			
			option = $('<option/>',{  
              value: this.value,
			  text: this.text,
			});

			if(this.selected){
				option.attr("selected","selected");
				selected = true;
			}

			$(self.element).append(option);	
		});	

		if(selected != true) $(self.element).find("option").first().attr("selected","selected");
	},

	/*
	 * Change selected option 
	 */
	_setSelectedOption: function(value) {
		var self = this;
		this._deselectSelectedOptions();

		$(this.element).val(value);
		$(this.element).find("option[value='"+value+"']").attr("selected","selected");

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
			self._setHeapboxFocus();
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
			//$(this).focus();
			self._setHeapboxFocus();
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
		heapBoxEl.unbind("keydown");

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
		  if(!stageReady)
		  	this._closeOthers();
		  else this._openheap();
		}
	},

	/*
	 * Selectbox change handler
	*/
	_heapChanged: function(self,clickedEl,keepOpened) {
		
		if(!keepOpened) this._closeheap(true,function(){},function(){});
		this._setSelected($(clickedEl));
		this._setHolderTitle();
		this._setHeapboxFocus();
		this._setSelectedOption($(clickedEl).attr("rel"));

		this.options.onChange( $(clickedEl).attr("rel"), $(this.element) );

	},


	/*
	 * Add class "selected" to selected option in heapbox
	 */
	_setSelected: function(selectedEl) {
		this._deselectAll();
		selectedEl.addClass("selected");
	},

	_deselectAll: function(self) {
		heapLinks = $("#heapbox_"+this.instance.heapId).find(".heap ul li a");
		heapLinks.each(function(){
			$(this).removeClass("selected");
		});
	},

	/*
	 * Close opened selectbox
	*/
	_closeheap: function(internal,closeStartEvent,closeCompleteEvent) {
		
		heapEl = $("#heapbox_"+this.instance.heapId).removeClass('open').find(".heap");	
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
		
		if(this._isHeapsizeSet()) {
			this._setViewPosition($("div#heapbox_"+this.instance.heapId));
		}

		heapEl = $("#heapbox_"+this.instance.heapId).addClass('open').find(".heap");	
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

	select: function(value) {
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);
		this._heapChanged( this, heapBoxEl.find('.heapOptions [rel="'+ value +'"]') );
	},
	update: function() {
		this._setDefaultValues();	
	},
	_hideSourceElement: function() {

		// preserve original visibility of the element
		this.elem_isVisible = $(this.element).is(':visible');
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
	},
	_remove: function() {
		heapBoxEl = $("div#heapbox_"+this.instance.heapId);
		heapBoxEl.remove();

		this._showSourceElement();
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
			case "select":
				heapBoxInst.select(optional);
			    break;
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
			case "remove":
				heapBoxInst._remove();
				break;
			}

	    }	
        });
    };

})( jQuery, window, document );
