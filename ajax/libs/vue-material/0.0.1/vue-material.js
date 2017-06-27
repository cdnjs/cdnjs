(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-material"] = factory();
	else
		root["vue-material"] = factory();
})(this, function() {
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
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _componentsButtonIndexJs = __webpack_require__(11);

	var _componentsButtonIndexJs2 = _interopRequireDefault(_componentsButtonIndexJs);

	var _componentsCommonsIndexJs = __webpack_require__(15);

	var _componentsCommonsIndexJs2 = _interopRequireDefault(_componentsCommonsIndexJs);

	var _componentsSidenavIndexJs = __webpack_require__(33);

	var _componentsSidenavIndexJs2 = _interopRequireDefault(_componentsSidenavIndexJs);

	var _componentsNavbarIndexJs = __webpack_require__(37);

	var _componentsNavbarIndexJs2 = _interopRequireDefault(_componentsNavbarIndexJs);

	// import forms from './components/forms/index.js';
	/*import card from './components/card/index.js';
	import chip from './components/chip/index.js';
	import collection from './components/collection/index.js';
	import footer from './components/footer/index.js';
	import pagination from './components/pagination/index.js';
	import preloader from './components/preloader/index.js';*/

	exports['default'] = {
	    button: _componentsButtonIndexJs2['default'],
	    commons: _componentsCommonsIndexJs2['default'],
	    sidenav: _componentsSidenavIndexJs2['default'],
	    navbar: _componentsNavbarIndexJs2['default'],
	    // forms,
	    /*    card,
	        chip,
	        collection,
	        footer,
	        pagination,
	        preloader,*/
	    registered: [],
	    //this array should be replaced by something
	    // componentsName: ['button', 'card', 'chip', 'collection', 'footer', 'forms', 'navbar', 'pagination', 'preloader'],
	    componentsName: ['button', 'sidenav', 'navbar'],
	    register: function register(Vue, names) {
	        names = names || this.componentsName;
	        if (!Array.isArray(names)) {
	            console.log("param 'names' must be Array");
	            return;
	        }
	        this._regComponent(Vue, 'commons');
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var _name = _step.value;

	                _name = _name.toLowerCase();
	                if (_name in this && this.registered.indexOf(_name) === -1) {
	                    this._regComponent(Vue, _name);
	                }
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator['return']) {
	                    _iterator['return']();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }
	    },
	    //mdXxYy=>md-xx-yy
	    _camel2kebab: function _camel2kebab(str) {
	        var reg = /([a-zA-Z])(?=[A-Z])/g;
	        return str.replace(reg, '$1-').toLowerCase();
	    },
	    _regComponent: function _regComponent(Vue, name) {
	        var com = this[name];
	        for (var item in com) {
	            var regName = this._camel2kebab(item);
	            Vue.component(regName, com[item]);
	            console.log('registered ' + regName);
	        }
	        this.registered.push(name);
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBtnVue = __webpack_require__(12);

	var _mdBtnVue2 = _interopRequireDefault(_mdBtnVue);

	var _mdBtnFVue = __webpack_require__(27);

	var _mdBtnFVue2 = _interopRequireDefault(_mdBtnFVue);

	var _mdFabVue = __webpack_require__(30);

	var _mdFabVue2 = _interopRequireDefault(_mdFabVue);

	exports['default'] = {
	    mdBtn: _mdBtnVue2['default'],
	    mdBtnF: _mdBtnFVue2['default'],
	    mdFab: _mdFabVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13)
	module.exports.template = __webpack_require__(26)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mixinsButtonMixinJs = __webpack_require__(14);

	exports["default"] = {
	    mixins: [_mixinsButtonMixinJs.btnIcon],
	    props: {
	        disabled: Boolean,
	        iconPos: {
	            type: String,
	            "default": "left"
	        },
	        flat: Boolean
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(15);

	exports["default"] = {
	    btnIcon: {
	        props: {
	            iconText: String
	        },
	        components: {
	            "md-icon": _commonsIndexJs.mdIcon
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdBadgeVue = __webpack_require__(16);

	var _mdBadgeVue2 = _interopRequireDefault(_mdBadgeVue);

	var _mdIconVue = __webpack_require__(19);

	var _mdIconVue2 = _interopRequireDefault(_mdIconVue);

	var _mdLinkVue = __webpack_require__(22);

	var _mdLinkVue2 = _interopRequireDefault(_mdLinkVue);

	exports['default'] = {
	    mdBadge: _mdBadgeVue2['default'],
	    mdIcon: _mdIconVue2['default'],
	    mdLink: _mdLinkVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17)
	module.exports.template = __webpack_require__(18)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue"], function () {
	var newOptions = require("-!babel!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-badge.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-badge.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        badge: Object
	    },
	    computed: {
	        count: function count() {
	            return Math.trunc(undefined.badge.count);
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "<span v-show=\"count>0\" :class=\"['badge',badge.new?'new':'']\"  >{{count}}</span>";

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(20)
	module.exports.template = __webpack_require__(21)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-icon.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-icon.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-icon.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        text: String,
	        pos: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "<i v-if=\"text\" :class=\"['material-icons',pos]\">{{text}}</i>";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23)
	module.exports.template = __webpack_require__(25)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-link.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-link.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-link.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(24)['default'];

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mdBadgeVue = __webpack_require__(16);

	var _mdBadgeVue2 = _interopRequireDefault(_mdBadgeVue);

	exports['default'] = {
	    props: {
	        link: Object,
	        badge: Object
	    },
	    components: {
	        mdBadge: _mdBadgeVue2['default']
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = "<a href=\"{{link.href}}\">\n    {{link.text}}\n    <md-badge :badge=\"badge\"></md-badge>\n</a>";

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"[flat?'btn-flat':'btn',disabled?'disabled':'']\">\n    <slot  name=\"icon\">\n        <md-icon   v-if=\"!flat\"  :text=\"iconText\" :pos=\"iconPos\"></md-icon>\n    </slot>\n    <slot></slot>\n</a>";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28)
	module.exports.template = __webpack_require__(29)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn-f.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-btn-f.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-btn-f.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _mixinsButtonMixinJs = __webpack_require__(14);

	exports['default'] = {
	    mixins: [_mixinsButtonMixinJs.btnIcon],
	    props: {
	        disabled: Boolean,
	        iconText: {
	            type: String,
	            require: true
	        }
	    }
	};
	module.exports = exports['default'];

/***/ },
/* 29 */
/***/ function(module, exports) {

	module.exports = "<a :class=\"['btn-floating',disabled?'disabled':'']\" >\n        <md-icon   :text=\"iconText\"</md-icon>\n    </a>";

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(31)
	module.exports.template = __webpack_require__(32)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-fab.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-fab.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-fab.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    data: function data() {
	        return {
	            hover: false
	        };
	    },
	    props: {
	        pos: Object,
	        mainText: String
	    },
	    methods: {
	        mouseEvent: function mouseEvent() {
	            this.hover = !this.hover;
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "<div :class=\"['fixed-action-btn']\" :style=\"pos\">\n    <md-btn-f @mouseover=\"mouseEvent\" @mouseout=\"mouseEvent\" ></md-btn-f>\n    <ul  v-show=\"hover\">\n        <slot></slot>\n    </ul>\n</div>";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _mdSidenavVue = __webpack_require__(34);

	var _mdSidenavVue2 = _interopRequireDefault(_mdSidenavVue);

	exports["default"] = {
	    mdSidenav: _mdSidenavVue2["default"]
	};
	module.exports = exports["default"];

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(35)
	module.exports.template = __webpack_require__(36)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-sidenav.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-sidenav.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-sidenav.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 35 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        fixed: Boolean,
	        width: {
	            type: Number,
	            "default": 240
	        }
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = "<ul :class=\"['side-nav',fixed?'fixed':'']\" :style=\"{width:width+'px'}\">\n        <slot></slot>\n    </ul>";

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mdNavVue = __webpack_require__(38);

	var _mdNavVue2 = _interopRequireDefault(_mdNavVue);

	var _mdNavLiVue = __webpack_require__(41);

	var _mdNavLiVue2 = _interopRequireDefault(_mdNavLiVue);

	var _mdNavLogoVue = __webpack_require__(44);

	var _mdNavLogoVue2 = _interopRequireDefault(_mdNavLogoVue);

	exports['default'] = {
	    mdNav: _mdNavVue2['default'],
	    mdNavLi: _mdNavLiVue2['default'],
	    mdNavLogo: _mdNavLogoVue2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39)
	module.exports.template = __webpack_require__(40)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        fixed: Boolean,
	        logo: Object,
	        nolink: Boolean,
	        linksPos: String
	        /*        logoText:String,
	                logoPos:{
	                    type:String,
	                    default:"right",
	                },
	                logoHref:{
	                    type:String,
	                    default:"#"
	                }*/
	    },
	    created: function created() {
	        //check logo
	        //logo.pos can be empty
	        var logo = this.logo;
	        logo.href = logo.href || "#";
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = "<nav>\n      <div class=\"nav-wrapper\">\n        <md-nav-logo :href=\"logo.href\" :text=\"logo.text\" :pos=\"logo.pos\">\n            <slot name=\"logo-cus\"></slot>\n        </md-nav-logo>\n        <ul v-if=\"nolink\" :class=\"[linksPos]\">\n            <slot></slot> \n        </ul>\n      </div>\n</nav>";

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(42)
	module.exports.template = __webpack_require__(43)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-li.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-li.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-li.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _commonsIndexJs = __webpack_require__(15);

	exports["default"] = {
	    props: {
	        //can't work now
	        dropdown: {
	            type: Boolean,
	            "default": false
	        },
	        item: Object
	    },
	    components: {
	        'md-icon': _commonsIndexJs.mdIcon
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 43 */
/***/ function(module, exports) {

	module.exports = "<li>\n    <a :href=\"item.href\">\n        <md-icon v-if=\"item.icon\" :text=\"item.icon.text\" :pos=\"item.icon.pos\"></md-icon>\n        {{item.text}}\n    </a>\n</li>";

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(45)
	module.exports.template = __webpack_require__(46)
	if (false) {
	(function () {
	var hotAPI = require("/home/elviskang/Desktop/material/vue-material/node_modules/vue-loader/lib/hot-reload-api.js")
	hotAPI.install(require("vue"))
	if (!hotAPI.compatible) return
	var id = module.exports.hotID = "-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue"
	hotAPI.createRecord(id, module.exports)
	module.hot.accept(["-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue","-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-logo.vue"], function () {
	var newOptions = require("-!babel?optional[]=runtime!./../../../node_modules/vue-loader/lib/selector.js?type=script&index=0!./md-nav-logo.vue")
	var newTemplate = require("-!vue-html!./../../../node_modules/vue-loader/lib/selector.js?type=template&index=0!./md-nav-logo.vue")
	hotAPI.update(id, newOptions, newTemplate)
	})
	})()
	}

/***/ },
/* 45 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports["default"] = {
	    props: {
	        href: String,
	        text: String,
	        pos: String
	    }
	};
	module.exports = exports["default"];

/***/ },
/* 46 */
/***/ function(module, exports) {

	module.exports = "<a :href=\"href\" :class=\"['brand-logo',pos]\">\n    <slot name=\"logo-cus\">\n        {{text}}\n    </slot>\n</a>";

/***/ }
/******/ ])
});
;