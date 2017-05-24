/*
 * pagination.js 2.0.5
 * A jQuery plugin to provide simple yet fully customisable pagination.
 * https://github.com/superRaytin/paginationjs
 *
 * Homepage: http://paginationjs.com
 *
 * Copyright 2014-2100, superRaytin
 * Released under the MIT license.
 */

(function(global, $){

    if(typeof $ === 'undefined'){
        throwError('Pagination requires jQuery.');
    }

    var pluginName = 'pagination';

    var pluginHookMethod = 'addHook';

    var eventPrefix = '__pagination-';

    // Conflict, use backup
    if($.fn.pagination){
        pluginName = 'pagination2';
    }

    $.fn[pluginName] = function(options){

        if(typeof options === 'undefined'){
            return this;
        }

        var container = $(this);

        var pagination = {

            initialize: function(){
                var self = this;

                // Save attributes of current instance
                if(!container.data('pagination')){
                    container.data('pagination', {});
                }

                // Before initialize
                if(self.callHook('beforeInit') === false) return;

                // If pagination has been initialized, destroy it
                if(container.data('pagination').initialized){
                    $('.paginationjs', container).remove();
                }

                // Inline style
                if(attributes.inlineStyle === true){
                    addStyle();
                }

                // Passed to the callback function
                var model = self.model = {
                    pageRange: attributes.pageRange,
                    pageSize: attributes.pageSize
                };

                // "dataSource"`s type is unknown, parse it to find true data
                self.parseDataSource(attributes.dataSource, function(dataSource){

                    // Whether simulated pagination
                    self.sync = Helpers.isArray(dataSource);
                    if(self.sync){
                        model.totalNumber = attributes.totalNumber = dataSource.length;
                    }

                    // Obtain the total number of pages
                    model.totalPage = self.getTotalPage();

                    // Less than one page
                    if(attributes.hideWhenLessThanOnePage){
                        if(model.totalPage <= 1) return;
                    }

                    var el = self.render(true);

                    // Extra className
                    if(attributes.className){
                        el.addClass(attributes.className);
                    }

                    model.el = el;

                    // Load template
                    container[attributes.position === 'bottom' ? 'append' : 'prepend'](el);

                    // Binding events
                    self.observer();

                    // initialized flag
                    container.data('pagination').initialized = true;

                    // After initialize
                    self.callHook('afterInit', el);

                });

            },

            render: function(isBoot){

                var self = this;
                var model = self.model;
                var el = model.el || $('<div class="paginationjs"></div>');
                var isForced = isBoot !== true;

                // Before render
                self.callHook('beforeRender', isForced);

                var currentPage = model.pageNumber || attributes.pageNumber;
                var pageRange = attributes.pageRange;
                var totalPage = model.totalPage;

                var rangeStart = currentPage - pageRange;
                var rangeEnd = currentPage + pageRange;

                if(rangeEnd > totalPage){
                    rangeEnd = totalPage;
                    rangeStart = totalPage - pageRange * 2;
                    rangeStart = rangeStart < 1 ? 1 : rangeStart;
                }

                if(rangeStart <= 1){
                    rangeStart = 1;

                    rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
                }

                el.html(self.createTemplate({
                    currentPage: currentPage,
                    pageRange: pageRange,
                    totalPage: totalPage,
                    rangeStart: rangeStart,
                    rangeEnd: rangeEnd
                }));

                // After render
                self.callHook('afterRender', isForced);

                return el;
            },

            // Create template
            createTemplate: function(args){

                var self = this;
                var currentPage = args.currentPage;
                var totalPage = args.totalPage;
                var rangeStart = args.rangeStart;
                var rangeEnd = args.rangeEnd;

                var totalNumber = attributes.totalNumber;

                var showPrevious = attributes.showPrevious;
                var showNext = attributes.showNext;
                var showPageNumbers = attributes.showPageNumbers;
                var showNavigator = attributes.showNavigator;
                var showGoInput = attributes.showGoInput;
                var showGoButton = attributes.showGoButton;

                var pageLink = attributes.pageLink;
                var prevText = attributes.prevText;
                var nextText = attributes.nextText;
                var ellipsisText = attributes.ellipsisText;
                var goButtonText = attributes.goButtonText;

                var classPrefix = attributes.classPrefix;
                var activeClassName = attributes.activeClassName;
                var disableClassName = attributes.disableClassName;
                var ulClassName = attributes.ulClassName;

                var formatNavigator = $.isFunction(attributes.formatNavigator) ? attributes.formatNavigator() : attributes.formatNavigator;
                var formatGoInput = $.isFunction(attributes.formatGoInput) ? attributes.formatGoInput() : attributes.formatGoInput;
                var formatGoButton = $.isFunction(attributes.formatGoButton) ? attributes.formatGoButton() : attributes.formatGoButton;

                var autoHidePrevious = $.isFunction(attributes.autoHidePrevious) ? attributes.autoHidePrevious() : attributes.autoHidePrevious;
                var autoHideNext = $.isFunction(attributes.autoHideNext) ? attributes.autoHideNext() : attributes.autoHideNext;

                var header = $.isFunction(attributes.header) ? attributes.header() : attributes.header;
                var footer = $.isFunction(attributes.footer) ? attributes.footer() : attributes.footer;

                var html = '';
                var goInput = '<input type="text" class="J-paginationjs-go-pagenumber">';
                var goButton = '<input type="button" class="J-paginationjs-go-button" value="'+ goButtonText +'">';
                var formattedString;
                var i;

                if(header){

                    formattedString = self.replaceVariables(header, {
                        currentPage: currentPage,
                        totalPage: totalPage,
                        totalNumber: totalNumber
                    });

                    html += formattedString;
                }

                if(showPrevious || showPageNumbers || showNext){

                    html += '<div class="paginationjs-pages">';

                    if(ulClassName){
                        html += '<ul class="'+ ulClassName +'">';
                    }
                    else{
                        html += '<ul>';
                    }

                    // Previous page button
                    if(showPrevious){
                        if(currentPage === 1){
                            if(!autoHidePrevious){
                                html += '<li class="'+ classPrefix +'-prev '+ disableClassName +'"><a>'+ prevText +'<\/a><\/li>';
                            }
                        }
                        else{
                            html += '<li class="'+ classPrefix +'-prev J-paginationjs-previous" data-num="'+ (currentPage - 1) +'" title="Previous page"><a href="'+ pageLink +'">'+ prevText +'<\/a><\/li>';
                        }
                    }

                    // Page numbers
                    if(showPageNumbers){
                        if(rangeStart <= 3){
                            for(i = 1; i < rangeStart; i++){
                                if(i == currentPage){
                                    html += '<li class="'+ classPrefix +'-page J-paginationjs-page '+ activeClassName +'" data-num="'+ i +'"><a>'+ i +'<\/a><\/li>';
                                }
                                else{
                                    html += '<li class="'+ classPrefix +'-page J-paginationjs-page" data-num="'+ i +'"><a href="'+ pageLink +'">'+ i +'<\/a><\/li>';
                                }
                            }
                        }
                        else{
                            if(attributes.showFirstOnEllipsisShow){
                                html += '<li class="'+ classPrefix +'-page '+ classPrefix +'-first J-paginationjs-page" data-num="1"><a href="'+ pageLink +'">1<\/a><\/li>';
                            }

                            html += '<li class="'+ classPrefix +'-ellipsis '+ disableClassName +'"><a>'+ ellipsisText +'<\/a><\/li>';
                        }

                        // Main loop
                        for(i = rangeStart; i <= rangeEnd; i++){
                            if(i == currentPage){
                                html += '<li class="'+ classPrefix +'-page J-paginationjs-page '+ activeClassName +'" data-num="'+ i +'"><a>'+ i +'<\/a><\/li>';
                            }
                            else{
                                html += '<li class="'+ classPrefix +'-page J-paginationjs-page" data-num="'+ i +'"><a href="'+ pageLink +'">'+ i +'<\/a><\/li>';
                            }
                        }

                        if(rangeEnd >= totalPage - 2){
                            for(i = rangeEnd + 1; i <= totalPage; i++){
                                html += '<li class="'+ classPrefix +'-page J-paginationjs-page" data-num="'+ i +'"><a href="'+ pageLink +'">'+ i +'<\/a><\/li>';
                            }
                        }
                        else{
                            html += '<li class="'+ classPrefix +'-ellipsis '+ disableClassName +'"><a>'+ ellipsisText +'<\/a><\/li>';

                            if(attributes.showLastOnEllipsisShow){
                                html += '<li class="'+ classPrefix +'-page '+ classPrefix +'-last J-paginationjs-page" data-num="'+ totalPage +'"><a href="'+ pageLink +'">'+ totalPage +'<\/a><\/li>';
                            }
                        }
                    }

                    // Next page button
                    if(showNext){
                        if(currentPage == totalPage){
                            if(!autoHideNext){
                                html += '<li class="'+ classPrefix +'-next '+ disableClassName +'"><a>'+ nextText +'<\/a><\/li>';
                            }
                        }
                        else{
                            html += '<li class="'+ classPrefix +'-next J-paginationjs-next" data-num="'+ (currentPage + 1) +'" title="Next page"><a href="'+ pageLink +'">'+ nextText +'<\/a><\/li>';
                        }
                    }

                    html += '<\/ul><\/div>';

                }

                // Navigator
                if(showNavigator){

                    if(formatNavigator){

                        formattedString = self.replaceVariables(formatNavigator, {
                            currentPage: currentPage,
                            totalPage: totalPage,
                            totalNumber: totalNumber
                        });

                        html += '<div class="'+ classPrefix +'-nav J-paginationjs-nav">'+ formattedString +'<\/div>';
                    }
                }

                // Go input
                if(showGoInput){

                    if(formatGoInput){

                        formattedString = self.replaceVariables(formatGoInput, {
                            currentPage: currentPage,
                            totalPage: totalPage,
                            totalNumber: totalNumber,
                            input: goInput
                        });

                        html += '<div class="'+ classPrefix +'-go-input">'+ formattedString +'</div>';
                    }
                }

                // Go button
                if(showGoButton){

                    if(formatGoButton){

                        formattedString = self.replaceVariables(formatGoButton, {
                            currentPage: currentPage,
                            totalPage: totalPage,
                            totalNumber: totalNumber,
                            button: goButton
                        });

                        html += '<div class="'+ classPrefix +'-go-button">'+ formattedString +'</div>';
                    }
                }

                if(footer){

                    formattedString = self.replaceVariables(footer, {
                        currentPage: currentPage,
                        totalPage: totalPage,
                        totalNumber: totalNumber
                    });

                    html += formattedString;
                }

                return html;
            },

            // Go to the specified page
            go: function(number, callback){

                var self = this;
                var model = self.model;

                if(self.disabled) return;

                var pageNumber = number;
                var pageSize = attributes.pageSize;
                var totalPage = model.totalPage;

                pageNumber = parseInt(pageNumber);

                // Page number out of bounds
                if(!pageNumber || pageNumber < 1 || pageNumber > totalPage) return;

                // Simulated pagination
                if(self.sync){
                    render(self.getDataSegment(pageNumber));
                    return;
                }

                var postData = {};
                var alias = attributes.alias || {};

                postData[alias.pageSize ? alias.pageSize : 'pageSize'] = pageSize;
                postData[alias.pageNumber ? alias.pageNumber : 'pageNumber'] = pageNumber;

                var formatAjaxParams = {
                    type: 'get',
                    cache: false,
                    data: {},
                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                    dataType: 'json',
                    async: true
                };

                $.extend(true, formatAjaxParams, attributes.ajax);
                $.extend(formatAjaxParams.data || {}, postData);

                formatAjaxParams.url = attributes.dataSource;
                formatAjaxParams.success = function(response){
                    render(self.filterDataByLocator(response));
                };
                formatAjaxParams.error = function(jqXHR, textStatus, errorThrown){
                    attributes.formatAjaxError && attributes.formatAjaxError(jqXHR, textStatus, errorThrown);
                    self.enable();
                };

                self.disable();

                $.ajax(formatAjaxParams);

                function render(data){
                    // Pagination direction
                    model.direction = typeof model.pageNumber === 'undefined' ? 0 : (pageNumber > model.pageNumber ? 1 : -1);

                    model.pageNumber = pageNumber;

                    self.render();

                    if(self.disabled && !self.sync){
                        // enable
                        self.enable();
                    }

                    // cache model data
                    container.data('pagination').model = model;

                    // format result before execute callback
                    if($.isFunction(attributes.formatResult)){
                        var cloneData = $.extend(true, [], data);
                        if(!Helpers.isArray(data = attributes.formatResult(cloneData))){
                            data = cloneData;
                        }
                    }

                    container.data('pagination').currentPageData = data;

                    // Before paging
                    self.callHook('beforePaging');

                    // callback
                    self.doCallback(data, callback);

                    // After pageing
                    self.callHook('afterPaging');

                    // Already the first page
                    if(pageNumber == 1){
                        self.callHook('afterIsFirstPage');
                    }

                    // Already the last page
                    if(pageNumber == model.totalPage){
                        self.callHook('afterIsLastPage');
                    }

                }
            },

            doCallback: function(data, customCallback){
                var self = this;
                var model = self.model;

                if ($.isFunction(customCallback)) {
                    customCallback(data, model);
                }
                else if ($.isFunction(attributes.callback)) {
                    attributes.callback(data, model);
                }
            },

            destroy: function(){

                // Before destroy
                if(this.callHook('beforeDestroy') === false) return;

                this.model.el.remove();
                container.off();

                // Remove style element
                $('#paginationjs-style').remove();

                // After destroy
                this.callHook('afterDestroy');
            },

            previous: function(callback){
                this.go(this.model.pageNumber - 1, callback);
            },

            next: function(callback){
                this.go(this.model.pageNumber + 1, callback);
            },

            disable: function(){
                var self = this;
                var source = self.sync ? 'sync' : 'async';

                // Before disable
                if(self.callHook('beforeDisable', source) === false) return;

                self.disabled = true;
                self.model.disabled = true;

                // After disable
                self.callHook('afterDisable', source);
            },

            enable: function(){
                var self = this;
                var source = self.sync ? 'sync' : 'async';

                // Before enable
                if(self.callHook('beforeEnable', source) === false) return;

                self.disabled = false;
                self.model.disabled = false;

                // After enable
                self.callHook('afterEnable', source);
            },

            show: function(){
                var self = this;

                if(self.model.el.is(':visible')) return;

                self.model.el.show();
            },

            hide: function(){
                var self = this;

                if(!self.model.el.is(':visible')) return;

                self.model.el.hide();
            },

            // Replace the variables of template
            replaceVariables: function(template, variables){

                var formattedString;

                for(var key in variables){
                    var value = variables[key];
                    var regexp = new RegExp('<%=\\s*'+ key +'\\s*%>', 'img');

                    formattedString = (formattedString || template).replace(regexp, value);
                }

                return formattedString;
            },

            // Get data segments
            getDataSegment: function(number){
                var pageSize = attributes.pageSize;
                var dataSource = attributes.dataSource;
                var totalNumber = attributes.totalNumber;

                var start = pageSize * (number - 1) + 1;
                var end = Math.min(number * pageSize, totalNumber);

                return dataSource.slice(start - 1, end);
            },

            // Get total page
            getTotalPage: function(){
                return Math.ceil(attributes.totalNumber / attributes.pageSize);
            },

            // Get locator
            getLocator: function(locator){
                var result;

                if(typeof locator === 'string'){
                    result = locator;
                }
                else if($.isFunction(locator)){
                    result = locator();
                }
                else{
                    throwError('"locator" is incorrect. (String | Function)');
                }

                return result;
            },

            // Filter data by "locator"
            filterDataByLocator: function(dataSource){

                var locator = this.getLocator(attributes.locator);
                var filteredData;

                // Data source is an Object, use "locator" to locate the true data
                if(Helpers.isObject(dataSource)){
                    try{
                        $.each(locator.split('.'), function(index, item){
                            filteredData = (filteredData ? filteredData : dataSource)[item];
                        });
                    }
                    catch(e){}

                    if(!filteredData){
                        throwError('dataSource.'+ locator +' is undefined.');
                    }
                    else if(!Helpers.isArray(filteredData)){
                        throwError('dataSource.'+ locator +' must be an Array.');
                    }
                }

                return filteredData || dataSource;
            },

            // Parse dataSource
            parseDataSource: function(dataSource, callback){

                var self = this;
                var args = arguments;

                if(Helpers.isObject(dataSource)){
                    callback(attributes.dataSource = self.filterDataByLocator(dataSource));
                }
                else if(Helpers.isArray(dataSource)){
                    callback(attributes.dataSource = dataSource);
                }
                else if($.isFunction(dataSource)){
                    attributes.dataSource(function(data){
                        if($.isFunction(data)){
                            throwError('Unexpect parameter of the "done" Function.');
                        }

                        args.callee.call(self, data, callback);
                    });
                }
                else if(typeof dataSource === 'string'){
                    if(/^https?|file:/.test(dataSource)){
                        attributes.ajaxDataType = 'jsonp';
                    }

                    callback(dataSource);
                }
                else{
                    throwError('Unexpect data type of the "dataSource".');
                }
            },

            callHook: function(hook){
                var paginationData = container.data('pagination');
                var result;

                var args = Array.prototype.slice.apply(arguments);
                args.shift();

                if(attributes[hook] && $.isFunction(attributes[hook])){
                    if(attributes[hook].apply(global, args) === false){
                        result = false;
                    }
                }

                if(paginationData.hooks && paginationData.hooks[hook]){
                    $.each(paginationData.hooks[hook], function(index, item){
                        if(item.apply(global, args) === false){
                            result = false;
                        }
                    });
                }

                return result !== false;
            },

            observer: function(){

                var self = this;
                var el = self.model.el;

                // Go to page
                container.on(eventPrefix + 'go', function(event, pageNumber, done){

                    pageNumber = parseInt($.trim(pageNumber));

                    if(!pageNumber) return;

                    if(!$.isNumeric(pageNumber)){
                        throwError('"pageNumber" is incorrect. (Number)');
                    }

                    self.go(pageNumber, done);
                });

                // Page click
                el.delegate('.J-paginationjs-page', 'click', function(event){
                    var current = $(event.currentTarget);
                    var pageNumber = $.trim(current.attr('data-num'));

                    if(!pageNumber || current.hasClass(attributes.disableClassName) || current.hasClass(attributes.activeClassName)) return;

                    // Before page button clicked
                    if(self.callHook('beforePageOnClick', event) === false) return false;

                    self.go(pageNumber);

                    // After page button clicked
                    self.callHook('afterPageOnClick', event);

                    if(!attributes.pageLink) return false;
                });

                // Previous click
                el.delegate('.J-paginationjs-previous', 'click', function(event){
                    var current = $(event.currentTarget);
                    var pageNumber = $.trim(current.attr('data-num'));

                    if(!pageNumber || current.hasClass(attributes.disableClassName)) return;

                    // Before previous clicked
                    if(self.callHook('beforePreviousOnClick', event) === false) return false;

                    self.go(pageNumber);

                    // After previous clicked
                    self.callHook('afterPreviousOnClick', event);

                    if(!attributes.pageLink) return false;
                });

                // Next click
                el.delegate('.J-paginationjs-next', 'click', function(event){
                    var current = $(event.currentTarget);
                    var pageNumber = $.trim(current.attr('data-num'));

                    if(!pageNumber || current.hasClass(attributes.disableClassName)) return;

                    // Before next clicked
                    if(self.callHook('beforeNextOnClick', event) === false) return false;

                    self.go(pageNumber);

                    // After next clicked
                    self.callHook('afterNextOnClick', event);

                    if(!attributes.pageLink) return false;
                });

                // Go button click
                el.delegate('.J-paginationjs-go-button', 'click', function(){
                    var pageNumber = $('.J-paginationjs-go-pagenumber', el).val();

                    // Before Go button clicked
                    if(self.callHook('beforeGoButtonOnClick', event, pageNumber) === false) return false;

                    container.trigger(eventPrefix + 'go', pageNumber);

                    // After Go button clicked
                    self.callHook('afterGoButtonOnClick', event, pageNumber);
                });

                // go input enter
                el.delegate('.J-paginationjs-go-pagenumber', 'keyup', function(event){
                    if(event.which === 13){
                        var pageNumber = $(event.currentTarget).val();

                        // Before Go input enter
                        if(self.callHook('beforeGoInputOnEnter', event, pageNumber) === false) return false;

                        container.trigger(eventPrefix + 'go', pageNumber);

                        // Regains focus
                        $('.J-paginationjs-go-pagenumber', el).focus();

                        // After Go input enter
                        self.callHook('afterGoInputOnEnter', event, pageNumber);
                    }
                });

                // Previous page
                container.on(eventPrefix + 'previous', function(event, done){
                    self.previous(done);
                });

                // Next page
                container.on(eventPrefix + 'next', function(event, done){
                    self.next(done);
                });

                // Disable
                container.on(eventPrefix + 'disable', function(){
                    self.disable();
                });

                // Enable
                container.on(eventPrefix + 'enable', function(){
                    self.enable();
                });

                // Show
                container.on(eventPrefix + 'show', function(){
                    self.show();
                });

                // Hide
                container.on(eventPrefix + 'hide', function(){
                    self.hide();
                });

                // Destroy
                container.on(eventPrefix + 'destroy', function(){
                    self.destroy();
                });

                // If simulated paging, trigger a default page
                if(pagination.sync || attributes.triggerPagingOnInit){
                    container.trigger(eventPrefix + 'go', Math.min(attributes.pageNumber, self.model.totalPage));
                }
            }
        };


        // If initial
        if(container.data('pagination') && container.data('pagination').initialized === true){

            // Handling events
            if($.isNumeric(options)){
                // container.pagination(5)
                container.trigger.call(this, eventPrefix + 'go', options, arguments[1]);
                return this;
            }
            else if(typeof options === 'string'){

                var args = Array.prototype.slice.apply(arguments);
                args[0] = eventPrefix + args[0];

                switch(options){
                    case 'previous':
                    case 'next':
                    case 'go':
                    case 'disable':
                    case 'enable':
                    case 'show':
                    case 'hide':
                    case 'destroy':
                        container.trigger.apply(this, args);
                        break;

                    // Get selected page number
                    case 'getSelectedPageNum':
                        if(container.data('pagination').model){
                            return container.data('pagination').model.pageNumber;
                        }
                        else{
                            return container.data('pagination').attributes.pageNumber;
                        }

                    // Get total page
                    case 'getTotalPage':
                        return container.data('pagination').model.totalPage;

                    // Get selected page data
                    case 'getSelectedPageData':
                        return container.data('pagination').currentPageData;

                    // Whether pagination was be disabled
                    case 'isDisabled':
                        return container.data('pagination').model.disabled === true;

                    default:
                        throwError('Pagination do not provide action: ' + options);
                }

                return this;
            }
        }
        else{
            if(!Helpers.isObject(options)){
                throwError('options is illegal');
            }
        }


        // Attributes
        var attributes = $.extend({}, arguments.callee.defaults, options);

        // Check parameters
        parameterChecker(attributes);

        pagination.initialize();

        return this;
    };

    // Instance defaults
    $.fn[pluginName].defaults = {

        // Data source
        // Array | String | Function | Object
        //dataSource: '',

        // String | Function
        //locator: 'data',

        // Total entries, must be specified when the pagination is asynchronous
        totalNumber: 1,

        // Default page
        pageNumber: 1,

        // entries of per page
        pageSize: 10,

        // Page range (pages on both sides of the current page)
        pageRange: 2,

        // Whether to display the 'Previous' button
        showPrevious: true,

        // Whether to display the 'Next' button
        showNext: true,

        // Whether to display the page buttons
        showPageNumbers: true,

        showNavigator: false,

        // Whether to display the 'Go' input
        showGoInput: false,

        // Whether to display the 'Go' button
        showGoButton: false,

        // Page link
        pageLink: '',

        // 'Previous' text
        prevText: '&laquo;',

        // 'Next' text
        nextText: '&raquo;',

        // Ellipsis text
        ellipsisText: '...',

        // 'Go' button text
        goButtonText: 'Go',

        // Additional className for Pagination element
        //className: '',

        classPrefix: 'paginationjs',

        // Default active class
        activeClassName: 'active',

        // Default disable class
        disableClassName: 'disabled',

        //ulClassName: '',

        // Whether to insert inline style
        inlineStyle: true,

        formatNavigator: '<%= currentPage %> / <%= totalPage %>',

        formatGoInput: '<%= input %>',

        formatGoButton: '<%= button %>',

        // Pagination element's position in the container
        position: 'bottom',

        // Auto hide previous button when current page is the first page
        autoHidePrevious: false,

        // Auto hide next button when current page is the last page
        autoHideNext: false,

        //header: '',

        //footer: '',

        // Aliases for custom pagination parameters
        //alias: {},

        // Whether to trigger pagination at initialization
        triggerPagingOnInit: true,

        // Whether to hide pagination when less than one page
        hideWhenLessThanOnePage: false,

        showFirstOnEllipsisShow: true,

        showLastOnEllipsisShow: true,

        // Pagging callback
        callback: function(){}
    };

    // Hook register
    $.fn[pluginHookMethod] = function(hook, callback){

        if(arguments.length < 2){
            throwError('Missing argument.');
        }

        if(!$.isFunction(callback)){
            throwError('callback must be a function.');
        }

        var container = $(this);
        var paginationData = container.data('pagination');

        if(!paginationData){
            container.data('pagination', {});
            paginationData = container.data('pagination');
        }

        !paginationData.hooks && (paginationData.hooks = {});

        //paginationData.hooks[hook] = callback;
        paginationData.hooks[hook] = paginationData.hooks[hook] || [];
        paginationData.hooks[hook].push(callback);

    };

    // Static method
    $[pluginName] = function(selector, options){

        if(arguments.length < 2){
            throwError('Requires two parameters.');
        }

        var container;

        // 'selector' is a jQuery object
        if(typeof selector !== 'string' && selector instanceof jQuery){
            container = selector;
        }
        else{
            container = $(selector);
        }

        if(!container.length) return;

        container.pagination(options);

        return container;

    };

    // ============================================================
    // helpers
    // ============================================================

    var Helpers = {};

    // Throw error
    function throwError(content){
        throw new Error('Pagination: '+ content);
    }

    // Check parameters
    function parameterChecker(args){

        if(!args.dataSource){
            throwError('"dataSource" is required.');
        }

        if(typeof args.dataSource === 'string'){
            if(typeof args.totalNumber === 'undefined'){
                throwError('"totalNumber" is required.');
            }
            else if(!$.isNumeric(args.totalNumber)){
                throwError('"totalNumber" is incorrect. (Number)');
            }
        }
        else if(Helpers.isObject(args.dataSource)){
            if(typeof args.locator === 'undefined'){
                throwError('"dataSource" is a Object, please specify "locator".');
            }
            else if(typeof args.locator !== 'string' && !$.isFunction(args.locator)){
                throwError(''+ args.locator +' is incorrect. (String | Function)');
            }
        }
    }

    // Object type detection
    function getObjectType(object) {
        var tmp;
        return ( (tmp = typeof(object)) == "object" ? object == null && "null" || Object.prototype.toString.call(object).slice(8, -1) : tmp ).toLowerCase();
    }
    $.each(['Object', 'Array'], function(index, name){
        Helpers['is' + name] = function(object){
            return getObjectType(object) === name.toLowerCase();
        };
    });

    // Inline style
    function addStyle(){
        var styleElement = $('#paginationjs-style');

        if(styleElement.length) return;

        var cssText = '.paginationjs{line-height:1.6;font-family:"Marmelad","Lucida Grande","Arial","Hiragino Sans GB",Georgia,sans-serif;font-size:14px;box-sizing:initial}.paginationjs:after{display:table;content:" ";clear:both}.paginationjs .paginationjs-pages{float:left}.paginationjs .paginationjs-pages ul{float:left;margin:0;padding:0}.paginationjs .paginationjs-pages li{float:left;border:1px solid #aaa;border-right:0;list-style:none}.paginationjs .paginationjs-pages li>a{min-width:30px;height:28px;line-height:28px;display:block;background:#fff;font-size:14px;color:#333;text-decoration:none;text-align:center}.paginationjs .paginationjs-pages li>a:hover{background:#eee}.paginationjs .paginationjs-pages li.active{border:0}.paginationjs .paginationjs-pages li.active>a{height:30px;line-height:30px;background:#aaa;color:#fff}.paginationjs .paginationjs-pages li.disabled>a{opacity:.3}.paginationjs .paginationjs-pages li.disabled>a:hover{background:0}.paginationjs .paginationjs-pages li:first-child{border-radius:3px 0 0 3px}.paginationjs .paginationjs-pages li:first-child>a{border-radius:3px 0 0 3px}.paginationjs .paginationjs-pages li:last-child{border-right:1px solid #aaa;border-radius:0 3px 3px 0}.paginationjs .paginationjs-pages li:last-child>a{border-radius:0 3px 3px 0}.paginationjs .paginationjs-go-input{float:left;margin-left:10px;font-size:14px}.paginationjs .paginationjs-go-input>input[type="text"]{width:30px;height:28px;background:#fff;border-radius:3px;border:1px solid #aaa;padding:0;font-size:14px;text-align:center;vertical-align:baseline;outline:0;box-shadow:none;box-sizing:initial}.paginationjs .paginationjs-go-button{float:left;margin-left:10px;font-size:14px}.paginationjs .paginationjs-go-button>input[type="button"]{min-width:40px;height:30px;line-height:28px;background:#fff;border-radius:3px;border:1px solid #aaa;text-align:center;padding:0 8px;font-size:14px;vertical-align:baseline;outline:0;box-shadow:none;color:#333;cursor:pointer}.paginationjs .paginationjs-go-button>input[type="button"]:hover{background-color:#f8f8f8}.paginationjs .paginationjs-nav{float:left;height:30px;line-height:30px;margin-left:10px;font-size:14px}.paginationjs.paginationjs-small{font-size:12px}.paginationjs.paginationjs-small .paginationjs-pages li>a{min-width:26px;height:24px;line-height:24px;font-size:12px}.paginationjs.paginationjs-small .paginationjs-pages li.active>a{height:26px;line-height:26px}.paginationjs.paginationjs-small .paginationjs-go-input{font-size:12px}.paginationjs.paginationjs-small .paginationjs-go-input>input[type="text"]{width:26px;height:24px;font-size:12px}.paginationjs.paginationjs-small .paginationjs-go-button{font-size:12px}.paginationjs.paginationjs-small .paginationjs-go-button>input[type="button"]{min-width:30px;height:26px;line-height:24px;padding:0 6px;font-size:12px}.paginationjs.paginationjs-small .paginationjs-nav{height:26px;line-height:26px;font-size:12px}.paginationjs.paginationjs-big{font-size:16px}.paginationjs.paginationjs-big .paginationjs-pages li>a{min-width:36px;height:34px;line-height:34px;font-size:16px}.paginationjs.paginationjs-big .paginationjs-pages li.active>a{height:36px;line-height:36px}.paginationjs.paginationjs-big .paginationjs-go-input{font-size:16px}.paginationjs.paginationjs-big .paginationjs-go-input>input[type="text"]{width:36px;height:34px;font-size:16px}.paginationjs.paginationjs-big .paginationjs-go-button{font-size:16px}.paginationjs.paginationjs-big .paginationjs-go-button>input[type="button"]{min-width:50px;height:36px;line-height:34px;padding:0 12px;font-size:16px}.paginationjs.paginationjs-big .paginationjs-nav{height:36px;line-height:36px;font-size:16px}.paginationjs.paginationjs-theme-blue .paginationjs-pages li{border-color:#289de9}.paginationjs.paginationjs-theme-blue .paginationjs-pages li>a{color:#289de9}.paginationjs.paginationjs-theme-blue .paginationjs-pages li>a:hover{background:#e9f4fc}.paginationjs.paginationjs-theme-blue .paginationjs-pages li.active>a{background:#289de9;color:#fff}.paginationjs.paginationjs-theme-blue .paginationjs-pages li.disabled>a:hover{background:0}.paginationjs.paginationjs-theme-blue .paginationjs-go-input>input[type="text"]{border-color:#289de9}.paginationjs.paginationjs-theme-blue .paginationjs-go-button>input[type="button"]{background:#289de9;border-color:#289de9;color:#fff}.paginationjs.paginationjs-theme-blue .paginationjs-go-button>input[type="button"]:hover{background-color:#3ca5ea}.paginationjs.paginationjs-theme-green .paginationjs-pages li{border-color:#449d44}.paginationjs.paginationjs-theme-green .paginationjs-pages li>a{color:#449d44}.paginationjs.paginationjs-theme-green .paginationjs-pages li>a:hover{background:#ebf4eb}.paginationjs.paginationjs-theme-green .paginationjs-pages li.active>a{background:#449d44;color:#fff}.paginationjs.paginationjs-theme-green .paginationjs-pages li.disabled>a:hover{background:0}.paginationjs.paginationjs-theme-green .paginationjs-go-input>input[type="text"]{border-color:#449d44}.paginationjs.paginationjs-theme-green .paginationjs-go-button>input[type="button"]{background:#449d44;border-color:#449d44;color:#fff}.paginationjs.paginationjs-theme-green .paginationjs-go-button>input[type="button"]:hover{background-color:#55a555}.paginationjs.paginationjs-theme-yellow .paginationjs-pages li{border-color:#ec971f}.paginationjs.paginationjs-theme-yellow .paginationjs-pages li>a{color:#ec971f}.paginationjs.paginationjs-theme-yellow .paginationjs-pages li>a:hover{background:#fdf5e9}.paginationjs.paginationjs-theme-yellow .paginationjs-pages li.active>a{background:#ec971f;color:#fff}.paginationjs.paginationjs-theme-yellow .paginationjs-pages li.disabled>a:hover{background:0}.paginationjs.paginationjs-theme-yellow .paginationjs-go-input>input[type="text"]{border-color:#ec971f}.paginationjs.paginationjs-theme-yellow .paginationjs-go-button>input[type="button"]{background:#ec971f;border-color:#ec971f;color:#fff}.paginationjs.paginationjs-theme-yellow .paginationjs-go-button>input[type="button"]:hover{background-color:#eea135}.paginationjs.paginationjs-theme-red .paginationjs-pages li{border-color:#c9302c}.paginationjs.paginationjs-theme-red .paginationjs-pages li>a{color:#c9302c}.paginationjs.paginationjs-theme-red .paginationjs-pages li>a:hover{background:#faeaea}.paginationjs.paginationjs-theme-red .paginationjs-pages li.active>a{background:#c9302c;color:#fff}.paginationjs.paginationjs-theme-red .paginationjs-pages li.disabled>a:hover{background:0}.paginationjs.paginationjs-theme-red .paginationjs-go-input>input[type="text"]{border-color:#c9302c}.paginationjs.paginationjs-theme-red .paginationjs-go-button>input[type="button"]{background:#c9302c;border-color:#c9302c;color:#fff}.paginationjs.paginationjs-theme-red .paginationjs-go-button>input[type="button"]:hover{background-color:#ce4541}.paginationjs .paginationjs-pages li.paginationjs-next{*border-right:1px solid #aaa;border-right:1px solid #aaa\\0}.paginationjs .paginationjs-go-input{*margin-left:5px;margin-left:5px\\0}.paginationjs .paginationjs-go-input>input[type="text"]{*line-height:28px;line-height:28px\\0;*vertical-align:middle;vertical-align:middle\\0}.paginationjs .paginationjs-go-button{*margin-left:5px;margin-left:5px\\\0}.paginationjs .paginationjs-go-button>input[type="button"]{*vertical-align:middle;vertical-align:middle\\0}.paginationjs.paginationjs-big .paginationjs-pages li>a{line-height:36px\\0}.paginationjs.paginationjs-big .paginationjs-go-input>input[type="text"]{*height:35px;height:36px\\0;*line-height:36px;line-height:36px\\0}';

        $('head').append('<style type="text\/css" id="paginationjs-style">'+ cssText +'<\/style>');
    }

    /*
     * export via AMD or CommonJS
     * */
    if(typeof define === 'function' && (define.amd || define.cmd)){
        define(function(){
            return $;
        });
    }

})(this, window.jQuery);