/*!
 * built in 2016-9-26:16 version 2.115 by 司徒正美
 * npm 2.1.15
 *     普通vm也支持onReady, onDispose方法(生命周期)
 *     添加norequire验证规则
 *     强化UUID的生成策略
 *     fix replaceChild的重写BUG(用于onDispose方法)
 *     xmp, wbr, template可以直接使用is属性代替ms-widget属性,
 *        即<xmp :widget="{is:'ms-button'}"></xmp> --><xmp is="ms-button"></xmp>
 *     简化attr指令的实现,其diff逻辑与css指令的diff一样,直接用css指令的
 *     一劳永逸解决IE6-8下VBS属性重复定义抛错的BUG
 *     新的 jsparser
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("avalon"));
	else if(typeof define === 'function' && define.amd)
		define(["avalon"], factory);
	else if(typeof exports === 'object')
		exports["pager"] = factory(require("avalon"));
	else
		root["pager"] = factory(root["avalon"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_109__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	var avalon = __webpack_require__(109)
	__webpack_require__(110)

	window.vm = avalon.define({
	    $id: 'test',
	    config: {
	        totalPages: 0,
	        showPages: 2,
	        currentPage:1,
	        nextText: '下一页',
	        prevText: '上一页'
	    }
	})

	setTimeout(function(){
	    window.vm.config = {
	        totalPages: 2,
	        showPages: 2
	    }
	}, 3000)

/***/ },

/***/ 109:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_109__;

/***/ },

/***/ 110:
/***/ function(module, exports, __webpack_require__) {

	
	var avalon = __webpack_require__(109)
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./style.scss\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	avalon.component('ms-pager', {
	    template: __webpack_require__(112),
	    defaults: {
	        getHref: function (a) {
	            return '#page-' + this.toPage(a)
	        },
	        getTitle: function (title) {
	            return title
	        },
	        isDisabled: function (name, page) {
	            return this.$buttons[name] = (this.currentPage === page)
	        },
	        $buttons: {},
	        showPages: 5,
	        pages: [],
	        totalPages: 15,
	        currentPage: 1,
	        firstText: 'First',
	        prevText: 'Previous',
	        nextText: 'Next',
	        lastText: 'Last',
	        onPageClick: avalon.noop,
	        toPage: function (p) {
	            var cur = this.currentPage
	            var max = this.totalPages
	            switch (p) {
	                case 'first':
	                    return 1
	                case 'prev':
	                    return Math.max(cur - 1, 0)
	                case 'next':
	                    return Math.min(cur + 1, max)
	                case 'last':
	                    return max
	                default:
	                    return p
	            }
	        }, 

	        cbProxy: function (e, p) {
	            if (this.$buttons[p] || p === this.currentPage) {
	                e.preventDefault()
	                return //disabled, active不会触发
	            }
	            var cur = this.toPage(p)
	            this.render(cur)
	            return this.onPageClick(e, p)
	        },
	        render: function(cur){
	            var obj = getPages.call(this, cur)
	            this.pages = obj.pages
	            this.currentPage = obj.currentPage
	        },
	        rpage: /(?:#|\?)page\-(\d+)/,
	        onInit: function () {
	            var cur = this.currentPage
	            var match = this.rpage && location.href.match(this.rpage)
	            if (match && match[1]) {
	                var cur = ~~match[1]
	                if (cur < 0 || cur > this.totalPages) {
	                    cur = 1
	                }
	            }
	            var that = this
	            this.$watch('totalPages', function(){
	                setTimeout(function(){
	                    that.render(that.currentPage)
	                },4)
	            })
	            this.render(cur)
	        }
	    }
	})
	function getPages(currentPage) {
	    var pages = []
	    var s = this.showPages
	    var total = this.totalPages
	    var half = Math.floor(s / 2)
	    var start = currentPage - half + 1 - s % 2
	    var end = currentPage + half

	    // handle boundary case
	    if (start <= 0) {
	        start = 1;
	        end = s;
	    }
	    if (end > total) {
	        start = total - s + 1
	        end = total
	    }

	    var itPage = start;
	    while (itPage <= end) {
	        pages.push(itPage)
	        itPage++
	    }

	    return {currentPage: currentPage, pages: pages};
	}



	//https://github.com/brantwills/Angular-Paging

/***/ },

/***/ 112:
/***/ function(module, exports) {

	module.exports = "<ul class=pagination ms-visible=@totalPages><li class=first ms-class='{disabled: @isDisabled(\"first\", 1)}'><a ms-attr='{href:@getHref(\"first\"),title:@getTitle(\"first\")}' ms-click='@cbProxy($event,\"first\")' class=icon-double-angle-left></a></li><li class=prev ms-class='{disabled: @isDisabled(\"prev\",1)}'><a ms-attr='{href:@getHref(\"prev\"),title:@getTitle(\"prev\")}' ms-click='@cbProxy($event,\"prev\")' class=icon-angle-left></a></li><li ms-for=\"page in @pages\" ms-class=\"{active: page === @currentPage}\"><a ms-attr={href:@getHref(page),title:@getTitle(page)} ms-click=@cbProxy($event,page)>{{page}}</a></li><li class=next ms-class='{disabled: @isDisabled(\"next\",@totalPages)}'><a ms-attr='{href:@getHref(\"next\"),title: @getTitle(\"next\")}' ms-click='@cbProxy($event,\"next\")' class=icon-angle-right></a></li><li class=last ms-class='{disabled: @isDisabled(\"last\",@totalPages)}'><a ms-attr='{href:@getHref(\"last\"),title: @getTitle(\"last\")}' ms-click='@cbProxy($event,\"last\")' class=icon-double-angle-right></a></li></ul>"

/***/ }

/******/ })
});
;