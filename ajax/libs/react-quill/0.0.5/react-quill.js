(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("quill"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "quill"], factory);
	else if(typeof exports === 'object')
		exports["ReactQuill"] = factory(require("react"), require("quill"));
	else
		root["ReactQuill"] = factory(root["React"], root["Quill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	/*
	React-Quill v0.0.3
	https://github.com/zenoamaro/react-quill
	*/
	module.exports = __webpack_require__(/*! ./component */ 1);
	module.exports.Mixin = __webpack_require__(/*! ./mixin */ 2);
	module.exports.Toolbar = __webpack_require__(/*! ./toolbar */ 3);


/***/ },
/* 1 */
/*!**************************!*\
  !*** ./src/component.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 4),
		QuillToolbar = __webpack_require__(/*! ./toolbar */ 3),
		QuillMixin = __webpack_require__(/*! ./mixin */ 2),
		T = React.PropTypes;
	
	// Support React 0.11 and 0.12
	// FIXME: Remove with React 0.13
	if (React.createFactory) {
		QuillToolbar = React.createFactory(QuillToolbar);
	}
	
	var QuillComponent = React.createClass({
	
		displayName: 'Quill',
	
		mixins: [ QuillMixin ],
	
		propTypes: {
			id:           T.string,
			className:    T.string,
			value:        T.string,
			defaultValue: T.string,
			readOnly:     T.bool,
			toolbar:      T.object,
			formats:      T.array,
			styles:       T.object,
			theme:        T.string,
			pollInterval: T.number,
			onChange:     T.func
		},
	
		getDefaultProps: function() {
			return {
				className: '',
				theme: 'base',
				modules: {}
			};
		},
	
		/*
		Retrieve the initial value from either `value` (preferred)
		or `defaultValue` if you want an un-controlled component.
		*/
		getInitialState: function() {
			return {};
		},
	
		/*
		Update only if we've been passed a new `value`.
		This leaves components using `defaultValue` alone.
		*/
		componentWillReceiveProps: function(nextProps) {
			if ('value' in nextProps) {
				if (nextProps.value !== this.props.value) {
					this.setEditorContents(this.state.editor, nextProps.value);
				}
			}
		},
	
		componentDidMount: function() {
			var editor = this.createEditor(
				this.getEditorElement(),
				this.getEditorConfig());
			this.setState({ editor:editor });
		},
	
		componentWillUnmount: function() {
			this.destroyEditor(this.state.editor);
			// NOTE: Don't set the state to null here
			//       as it would generate a loop.
		},
	
		shouldComponentUpdate: function(nextProps, nextState) {
			// Never re-render or we lose the element.
			return false;
		},
	
		/*
		If for whatever reason we are rendering again,
		we should tear down the editor and bring it up
		again.
		*/
		componentWillUpdate: function() {
			this.componentWillUnmount();
		},
	
		componentDidUpdate: function() {
			this.componentDidMount();
		},
	
		getEditorConfig: function() {
			var config = {
				readOnly:     this.props.readOnly,
				theme:        this.props.theme,
				formats:      this.props.formats,
				styles:       this.props.styles,
				modules:      this.props.modules,
				pollInterval: this.props.pollInterval
			};
			// Unless we're redefining the toolbar,
			// attach to the default one as a ref.
			if (!config.modules.toolbar) {
				// Don't mutate the original modules
				// because it's shared between components.
				config.modules = JSON.parse(JSON.stringify(config.modules));
				config.modules.toolbar = {
					container: this.refs.toolbar.getDOMNode()
				};
			}
			return config;
		},
	
		getEditorElement: function() {
			return this.refs.editor.getDOMNode();
		},
	
		getEditorContents: function() {
			return this.props.value || this.props.defaultValue || '';
		},
	
		getClassName: function() {
			return ['quill', this.props.className].join(' ');
		},
	
		/*
		Renders either the specified contents, or a default
		configuration of toolbar and contents area.
		*/
		renderContents: function() {
			if (React.Children.count(this.props.children)) {
				return this.props.children;
			} else {
				return [
					QuillToolbar({
						key:'toolbar',
						ref:'toolbar',
						items: this.props.toolbar
					}),
					React.DOM.div({
						key:'editor',
						ref:'editor',
						className: 'quill-contents',
						dangerouslySetInnerHTML: { __html:this.getEditorContents() }
					})
				];
			}
		},
	
		render: function() {
			return React.DOM.div({
				className: this.getClassName(),
				onChange: this.preventDefault },
				this.renderContents()
			);
		},
	
		/*
		Updates the local state with the new contents,
		executes the change handler passed as props.
		*/
		onEditorChange: function(value) {
			if (value !== this.state.value) {
				if (this.props.onChange) {
					this.props.onChange(value);
				}
			}
		},
	
		/*
		Stop change events from the toolbar from
		bubbling up outside.
		*/
		preventDefault: function(event) {
			event.preventDefault();
			event.stopPropagation();
		}
	
	});
	
	module.exports = QuillComponent;

/***/ },
/* 2 */
/*!**********************!*\
  !*** ./src/mixin.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Quill = __webpack_require__(/*! quill */ 5);
	
	var QuillMixin = {
	
		/**
		Creates an editor on the given element. The editor will
		be passed the configuration, have its events bound,
		*/
		createEditor: function($el, config) {
			var editor = new Quill($el, config);
			this.hookEditor(editor);
			return editor;
		},
	
		hookEditor: function(editor) {
			var self = this;
			editor.on('text-change', function(delta, source) {
				if (self.onEditorChange) {
					self.onEditorChange(editor.getHTML(), delta, source);
				}
			});
		},
	
		updateEditor: function(editor, config) {
			// NOTE: This tears the editor down, and reinitializes
			//       it with the new config. Ugly but necessary
			//       as there is no api for updating it.
			this.destroyEditor(editor);
			this.createEditor(config);
			return editor;
		},
	
		destroyEditor: function(editor) {
			editor.destroy();
		},
	
		/*
		Replace the contents of the editor, but keep
		the previous selection hanging around so that
		the cursor won't move.
		*/
		setEditorContents: function(editor, value) {
			var sel = editor.getSelection();
			editor.setHTML(value);
			editor.setSelection(sel);
		}
	
	};
	
	module.exports = QuillMixin;

/***/ },
/* 3 */
/*!************************!*\
  !*** ./src/toolbar.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(/*! react */ 4),
		T = React.PropTypes;
	
	var defaultColors = [
		'rgb(  0,   0,   0)', 'rgb(230,   0,   0)', 'rgb(255, 153,   0)',
		'rgb(255, 255,   0)', 'rgb(  0, 138,   0)', 'rgb(  0, 102, 204)',
		'rgb(153,  51, 255)', 'rgb(255, 255, 255)', 'rgb(250, 204, 204)',
		'rgb(255, 235, 204)', 'rgb(255, 255, 204)', 'rgb(204, 232, 204)',
		'rgb(204, 224, 245)', 'rgb(235, 214, 255)', 'rgb(187, 187, 187)',
		'rgb(240, 102, 102)', 'rgb(255, 194, 102)', 'rgb(255, 255, 102)',
		'rgb(102, 185, 102)', 'rgb(102, 163, 224)', 'rgb(194, 133, 255)',
		'rgb(136, 136, 136)', 'rgb(161,   0,   0)', 'rgb(178, 107,   0)',
		'rgb(178, 178,   0)', 'rgb(  0,  97,   0)', 'rgb(  0,  71, 178)',
		'rgb(107,  36, 178)', 'rgb( 68,  68,  68)', 'rgb( 92,   0,   0)',
		'rgb(102,  61,   0)', 'rgb(102, 102,   0)', 'rgb(  0,  55,   0)',
		'rgb(  0,  41, 102)', 'rgb( 61,  20,  10)',
	].map(function(color){ return { value: color } });
	
	var defaultItems = [
	
		{ label:'Formats', type:'group', items: [
			{ label:'Size', type:'size', items: [
				{ label:'Normal', value:'' },
				{ label:'Smaller', value:'0.8em' },
				{ label:'Larger', value:'1.4em' },
				{ label:'Huge', value:'2em' }
			]},
			{ label:'Alignment', type:'align', items: [
				{ label:'Center', value:'center' },
				{ label:'Left', value:'left' },
				{ label:'Right', value:'right' },
				{ label:'Justify', value:'justify' }
			]}
		]},
	
		{ label:'Text', type:'group', items: [
			{ type:'bold', label:'Bold' },
			{ type:'italic', label:'Italic' },
			{ type:'strike', label:'Strike' },
			{ type:'underline', label:'Underline' },
			{ type:'link', label:'Link' },
			{ type:'color', label:'Color', items:defaultColors },
		]},
	
		{ label:'Blocks', type:'group', items: [
			{ type:'bullet', label:'Bullet' },
			{ type:'list', label:'List' }
		]}
	
	];
	
	var QuillToolbar = React.createClass({
	
		displayName: 'Quill Toolbar',
	
		propTypes: {
			id:        T.string,
			className: T.string,
			items:     T.array
		},
	
		getDefaultProps: function(){
			return {
				items: defaultItems
			};
		},
	
		renderGroup: function(item) {
			return React.DOM.span({
				key: item.label,
				className:'ql-format-group' },
				item.items.map(this.renderItem)
			);
		},
	
		renderChoiceItem: function(item) {
			return React.DOM.option({
				key: item.label || item.value,
				value:item.value },
				item.label
			);
		},
	
		renderChoices: function(item) {
			return React.DOM.select({
				key: item.label,
				className: 'ql-'+item.type },
				item.items.map(this.renderChoiceItem)
			);
		},
	
		renderAction: function(item) {
			return React.DOM.span({
				key: item.label || item.value,
				className: 'ql-format-button ql-'+item.type,
				title: item.label }
			);
		},
	
		renderItem: function(item) {
			switch (item.type) {
				case 'group':
					return this.renderGroup(item);
				case 'align':
				case 'size':
				case 'color':
				case 'background':
					return this.renderChoices(item);
				default:
					return this.renderAction(item);
			}
		},
	
		getClassName: function() {
			return 'quill-toolbar ' + (this.props.className||'');
		},
	
		render: function() {
			return React.DOM.div({
				className: this.getClassName() },
				this.props.items.map(this.renderItem)
			);
		}
	
	});
	
	module.exports = QuillToolbar;
	QuillToolbar.defaultItems = defaultItems;
	QuillToolbar.defaultColors = defaultColors;

/***/ },
/* 4 */
/*!**************************************************************************************!*\
  !*** external {"commonjs":"react","commonjs2":"react","amd":"react","root":"React"} ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/*!**************************************************************************************!*\
  !*** external {"commonjs":"quill","commonjs2":"quill","amd":"quill","root":"Quill"} ***!
  \**************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjZTJhNjk1YTU3MGQ4MmZlZDdkNSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwiLFwicm9vdFwiOlwiUmVhY3RcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbFwiLFwiY29tbW9uanMyXCI6XCJxdWlsbFwiLFwiYW1kXCI6XCJxdWlsbFwiLFwicm9vdFwiOlwiUXVpbGxcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVG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Q0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLG9DQUFtQztBQUNuQztBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7QUFFRDtBQUNBO0FBQ0EsNEM7Ozs7Ozs7OztBQ2xJQSxnRDs7Ozs7Ozs7O0FDQUEsZ0QiLCJmaWxlIjoiLi9kaXN0L3JlYWN0LXF1aWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJxdWlsbFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJyZWFjdFwiLCBcInF1aWxsXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlJlYWN0UXVpbGxcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInF1aWxsXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdFF1aWxsXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJRdWlsbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGNlMmE2OTVhNTcwZDgyZmVkN2Q1XG4gKiovIiwiLypcblJlYWN0LVF1aWxsIHYwLjAuM1xuaHR0cHM6Ly9naXRodWIuY29tL3plbm9hbWFyby9yZWFjdC1xdWlsbFxuKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcbm1vZHVsZS5leHBvcnRzLk1peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xubW9kdWxlLmV4cG9ydHMuVG9vbGJhciA9IHJlcXVpcmUoJy4vdG9vbGJhcicpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0UXVpbGxUb29sYmFyID0gcmVxdWlyZSgnLi90b29sYmFyJyksXG5cdFF1aWxsTWl4aW4gPSByZXF1aXJlKCcuL21peGluJyksXG5cdFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbi8vIFN1cHBvcnQgUmVhY3QgMC4xMSBhbmQgMC4xMlxuLy8gRklYTUU6IFJlbW92ZSB3aXRoIFJlYWN0IDAuMTNcbmlmIChSZWFjdC5jcmVhdGVGYWN0b3J5KSB7XG5cdFF1aWxsVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoUXVpbGxUb29sYmFyKTtcbn1cblxudmFyIFF1aWxsQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnUXVpbGwnLFxuXG5cdG1peGluczogWyBRdWlsbE1peGluIF0sXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0aWQ6ICAgICAgICAgICBULnN0cmluZyxcblx0XHRjbGFzc05hbWU6ICAgIFQuc3RyaW5nLFxuXHRcdHZhbHVlOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0ZGVmYXVsdFZhbHVlOiBULnN0cmluZyxcblx0XHRyZWFkT25seTogICAgIFQuYm9vbCxcblx0XHR0b29sYmFyOiAgICAgIFQub2JqZWN0LFxuXHRcdGZvcm1hdHM6ICAgICAgVC5hcnJheSxcblx0XHRzdHlsZXM6ICAgICAgIFQub2JqZWN0LFxuXHRcdHRoZW1lOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0cG9sbEludGVydmFsOiBULm51bWJlcixcblx0XHRvbkNoYW5nZTogICAgIFQuZnVuY1xuXHR9LFxuXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNsYXNzTmFtZTogJycsXG5cdFx0XHR0aGVtZTogJ2Jhc2UnLFxuXHRcdFx0bW9kdWxlczoge31cblx0XHR9O1xuXHR9LFxuXG5cdC8qXG5cdFJldHJpZXZlIHRoZSBpbml0aWFsIHZhbHVlIGZyb20gZWl0aGVyIGB2YWx1ZWAgKHByZWZlcnJlZClcblx0b3IgYGRlZmF1bHRWYWx1ZWAgaWYgeW91IHdhbnQgYW4gdW4tY29udHJvbGxlZCBjb21wb25lbnQuXG5cdCovXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXG5cdC8qXG5cdFVwZGF0ZSBvbmx5IGlmIHdlJ3ZlIGJlZW4gcGFzc2VkIGEgbmV3IGB2YWx1ZWAuXG5cdFRoaXMgbGVhdmVzIGNvbXBvbmVudHMgdXNpbmcgYGRlZmF1bHRWYWx1ZWAgYWxvbmUuXG5cdCovXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xuXHRcdGlmICgndmFsdWUnIGluIG5leHRQcm9wcykge1xuXHRcdFx0aWYgKG5leHRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xuXHRcdFx0XHR0aGlzLnNldEVkaXRvckNvbnRlbnRzKHRoaXMuc3RhdGUuZWRpdG9yLCBuZXh0UHJvcHMudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGVkaXRvciA9IHRoaXMuY3JlYXRlRWRpdG9yKFxuXHRcdFx0dGhpcy5nZXRFZGl0b3JFbGVtZW50KCksXG5cdFx0XHR0aGlzLmdldEVkaXRvckNvbmZpZygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZWRpdG9yOmVkaXRvciB9KTtcblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5kZXN0cm95RWRpdG9yKHRoaXMuc3RhdGUuZWRpdG9yKTtcblx0XHQvLyBOT1RFOiBEb24ndCBzZXQgdGhlIHN0YXRlIHRvIG51bGwgaGVyZVxuXHRcdC8vICAgICAgIGFzIGl0IHdvdWxkIGdlbmVyYXRlIGEgbG9vcC5cblx0fSxcblxuXHRzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0Ly8gTmV2ZXIgcmUtcmVuZGVyIG9yIHdlIGxvc2UgdGhlIGVsZW1lbnQuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qXG5cdElmIGZvciB3aGF0ZXZlciByZWFzb24gd2UgYXJlIHJlbmRlcmluZyBhZ2Fpbixcblx0d2Ugc2hvdWxkIHRlYXIgZG93biB0aGUgZWRpdG9yIGFuZCBicmluZyBpdCB1cFxuXHRhZ2Fpbi5cblx0Ki9cblx0Y29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHR9LFxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xuXHR9LFxuXG5cdGdldEVkaXRvckNvbmZpZzogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdHJlYWRPbmx5OiAgICAgdGhpcy5wcm9wcy5yZWFkT25seSxcblx0XHRcdHRoZW1lOiAgICAgICAgdGhpcy5wcm9wcy50aGVtZSxcblx0XHRcdGZvcm1hdHM6ICAgICAgdGhpcy5wcm9wcy5mb3JtYXRzLFxuXHRcdFx0c3R5bGVzOiAgICAgICB0aGlzLnByb3BzLnN0eWxlcyxcblx0XHRcdG1vZHVsZXM6ICAgICAgdGhpcy5wcm9wcy5tb2R1bGVzLFxuXHRcdFx0cG9sbEludGVydmFsOiB0aGlzLnByb3BzLnBvbGxJbnRlcnZhbFxuXHRcdH07XG5cdFx0Ly8gVW5sZXNzIHdlJ3JlIHJlZGVmaW5pbmcgdGhlIHRvb2xiYXIsXG5cdFx0Ly8gYXR0YWNoIHRvIHRoZSBkZWZhdWx0IG9uZSBhcyBhIHJlZi5cblx0XHRpZiAoIWNvbmZpZy5tb2R1bGVzLnRvb2xiYXIpIHtcblx0XHRcdC8vIERvbid0IG11dGF0ZSB0aGUgb3JpZ2luYWwgbW9kdWxlc1xuXHRcdFx0Ly8gYmVjYXVzZSBpdCdzIHNoYXJlZCBiZXR3ZWVuIGNvbXBvbmVudHMuXG5cdFx0XHRjb25maWcubW9kdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnLm1vZHVsZXMpKTtcblx0XHRcdGNvbmZpZy5tb2R1bGVzLnRvb2xiYXIgPSB7XG5cdFx0XHRcdGNvbnRhaW5lcjogdGhpcy5yZWZzLnRvb2xiYXIuZ2V0RE9NTm9kZSgpXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gY29uZmlnO1xuXHR9LFxuXG5cdGdldEVkaXRvckVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnJlZnMuZWRpdG9yLmdldERPTU5vZGUoKTtcblx0fSxcblxuXHRnZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWUgfHwgJyc7XG5cdH0sXG5cblx0Z2V0Q2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gWydxdWlsbCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lXS5qb2luKCcgJyk7XG5cdH0sXG5cblx0Lypcblx0UmVuZGVycyBlaXRoZXIgdGhlIHNwZWNpZmllZCBjb250ZW50cywgb3IgYSBkZWZhdWx0XG5cdGNvbmZpZ3VyYXRpb24gb2YgdG9vbGJhciBhbmQgY29udGVudHMgYXJlYS5cblx0Ki9cblx0cmVuZGVyQ29udGVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKSkge1xuXHRcdFx0cmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFF1aWxsVG9vbGJhcih7XG5cdFx0XHRcdFx0a2V5Oid0b29sYmFyJyxcblx0XHRcdFx0XHRyZWY6J3Rvb2xiYXInLFxuXHRcdFx0XHRcdGl0ZW1zOiB0aGlzLnByb3BzLnRvb2xiYXJcblx0XHRcdFx0fSksXG5cdFx0XHRcdFJlYWN0LkRPTS5kaXYoe1xuXHRcdFx0XHRcdGtleTonZWRpdG9yJyxcblx0XHRcdFx0XHRyZWY6J2VkaXRvcicsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAncXVpbGwtY29udGVudHMnLFxuXHRcdFx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDp0aGlzLmdldEVkaXRvckNvbnRlbnRzKCkgfVxuXHRcdFx0XHR9KVxuXHRcdFx0XTtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLmRpdih7XG5cdFx0XHRjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3NOYW1lKCksXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5wcmV2ZW50RGVmYXVsdCB9LFxuXHRcdFx0dGhpcy5yZW5kZXJDb250ZW50cygpXG5cdFx0KTtcblx0fSxcblxuXHQvKlxuXHRVcGRhdGVzIHRoZSBsb2NhbCBzdGF0ZSB3aXRoIHRoZSBuZXcgY29udGVudHMsXG5cdGV4ZWN1dGVzIHRoZSBjaGFuZ2UgaGFuZGxlciBwYXNzZWQgYXMgcHJvcHMuXG5cdCovXG5cdG9uRWRpdG9yQ2hhbmdlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qXG5cdFN0b3AgY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0b29sYmFyIGZyb21cblx0YnViYmxpbmcgdXAgb3V0c2lkZS5cblx0Ki9cblx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWlsbENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFF1aWxsID0gcmVxdWlyZSgncXVpbGwnKTtcblxudmFyIFF1aWxsTWl4aW4gPSB7XG5cblx0LyoqXG5cdENyZWF0ZXMgYW4gZWRpdG9yIG9uIHRoZSBnaXZlbiBlbGVtZW50LiBUaGUgZWRpdG9yIHdpbGxcblx0YmUgcGFzc2VkIHRoZSBjb25maWd1cmF0aW9uLCBoYXZlIGl0cyBldmVudHMgYm91bmQsXG5cdCovXG5cdGNyZWF0ZUVkaXRvcjogZnVuY3Rpb24oJGVsLCBjb25maWcpIHtcblx0XHR2YXIgZWRpdG9yID0gbmV3IFF1aWxsKCRlbCwgY29uZmlnKTtcblx0XHR0aGlzLmhvb2tFZGl0b3IoZWRpdG9yKTtcblx0XHRyZXR1cm4gZWRpdG9yO1xuXHR9LFxuXG5cdGhvb2tFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvcikge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRlZGl0b3Iub24oJ3RleHQtY2hhbmdlJywgZnVuY3Rpb24oZGVsdGEsIHNvdXJjZSkge1xuXHRcdFx0aWYgKHNlbGYub25FZGl0b3JDaGFuZ2UpIHtcblx0XHRcdFx0c2VsZi5vbkVkaXRvckNoYW5nZShlZGl0b3IuZ2V0SFRNTCgpLCBkZWx0YSwgc291cmNlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHR1cGRhdGVFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvciwgY29uZmlnKSB7XG5cdFx0Ly8gTk9URTogVGhpcyB0ZWFycyB0aGUgZWRpdG9yIGRvd24sIGFuZCByZWluaXRpYWxpemVzXG5cdFx0Ly8gICAgICAgaXQgd2l0aCB0aGUgbmV3IGNvbmZpZy4gVWdseSBidXQgbmVjZXNzYXJ5XG5cdFx0Ly8gICAgICAgYXMgdGhlcmUgaXMgbm8gYXBpIGZvciB1cGRhdGluZyBpdC5cblx0XHR0aGlzLmRlc3Ryb3lFZGl0b3IoZWRpdG9yKTtcblx0XHR0aGlzLmNyZWF0ZUVkaXRvcihjb25maWcpO1xuXHRcdHJldHVybiBlZGl0b3I7XG5cdH0sXG5cblx0ZGVzdHJveUVkaXRvcjogZnVuY3Rpb24oZWRpdG9yKSB7XG5cdFx0ZWRpdG9yLmRlc3Ryb3koKTtcblx0fSxcblxuXHQvKlxuXHRSZXBsYWNlIHRoZSBjb250ZW50cyBvZiB0aGUgZWRpdG9yLCBidXQga2VlcFxuXHR0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGhhbmdpbmcgYXJvdW5kIHNvIHRoYXRcblx0dGhlIGN1cnNvciB3b24ndCBtb3ZlLlxuXHQqL1xuXHRzZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oZWRpdG9yLCB2YWx1ZSkge1xuXHRcdHZhciBzZWwgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0ZWRpdG9yLnNldEhUTUwodmFsdWUpO1xuXHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aWxsTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIGRlZmF1bHRDb2xvcnMgPSBbXG5cdCdyZ2IoICAwLCAgIDAsICAgMCknLCAncmdiKDIzMCwgICAwLCAgIDApJywgJ3JnYigyNTUsIDE1MywgICAwKScsXG5cdCdyZ2IoMjU1LCAyNTUsICAgMCknLCAncmdiKCAgMCwgMTM4LCAgIDApJywgJ3JnYiggIDAsIDEwMiwgMjA0KScsXG5cdCdyZ2IoMTUzLCAgNTEsIDI1NSknLCAncmdiKDI1NSwgMjU1LCAyNTUpJywgJ3JnYigyNTAsIDIwNCwgMjA0KScsXG5cdCdyZ2IoMjU1LCAyMzUsIDIwNCknLCAncmdiKDI1NSwgMjU1LCAyMDQpJywgJ3JnYigyMDQsIDIzMiwgMjA0KScsXG5cdCdyZ2IoMjA0LCAyMjQsIDI0NSknLCAncmdiKDIzNSwgMjE0LCAyNTUpJywgJ3JnYigxODcsIDE4NywgMTg3KScsXG5cdCdyZ2IoMjQwLCAxMDIsIDEwMiknLCAncmdiKDI1NSwgMTk0LCAxMDIpJywgJ3JnYigyNTUsIDI1NSwgMTAyKScsXG5cdCdyZ2IoMTAyLCAxODUsIDEwMiknLCAncmdiKDEwMiwgMTYzLCAyMjQpJywgJ3JnYigxOTQsIDEzMywgMjU1KScsXG5cdCdyZ2IoMTM2LCAxMzYsIDEzNiknLCAncmdiKDE2MSwgICAwLCAgIDApJywgJ3JnYigxNzgsIDEwNywgICAwKScsXG5cdCdyZ2IoMTc4LCAxNzgsICAgMCknLCAncmdiKCAgMCwgIDk3LCAgIDApJywgJ3JnYiggIDAsICA3MSwgMTc4KScsXG5cdCdyZ2IoMTA3LCAgMzYsIDE3OCknLCAncmdiKCA2OCwgIDY4LCAgNjgpJywgJ3JnYiggOTIsICAgMCwgICAwKScsXG5cdCdyZ2IoMTAyLCAgNjEsICAgMCknLCAncmdiKDEwMiwgMTAyLCAgIDApJywgJ3JnYiggIDAsICA1NSwgICAwKScsXG5cdCdyZ2IoICAwLCAgNDEsIDEwMiknLCAncmdiKCA2MSwgIDIwLCAgMTApJyxcbl0ubWFwKGZ1bmN0aW9uKGNvbG9yKXsgcmV0dXJuIHsgdmFsdWU6IGNvbG9yIH0gfSk7XG5cbnZhciBkZWZhdWx0SXRlbXMgPSBbXG5cblx0eyBsYWJlbDonRm9ybWF0cycsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IGxhYmVsOidTaXplJywgdHlwZTonc2l6ZScsIGl0ZW1zOiBbXG5cdFx0XHR7IGxhYmVsOidOb3JtYWwnLCB2YWx1ZTonJyB9LFxuXHRcdFx0eyBsYWJlbDonU21hbGxlcicsIHZhbHVlOicwLjhlbScgfSxcblx0XHRcdHsgbGFiZWw6J0xhcmdlcicsIHZhbHVlOicxLjRlbScgfSxcblx0XHRcdHsgbGFiZWw6J0h1Z2UnLCB2YWx1ZTonMmVtJyB9XG5cdFx0XX0sXG5cdFx0eyBsYWJlbDonQWxpZ25tZW50JywgdHlwZTonYWxpZ24nLCBpdGVtczogW1xuXHRcdFx0eyBsYWJlbDonQ2VudGVyJywgdmFsdWU6J2NlbnRlcicgfSxcblx0XHRcdHsgbGFiZWw6J0xlZnQnLCB2YWx1ZTonbGVmdCcgfSxcblx0XHRcdHsgbGFiZWw6J1JpZ2h0JywgdmFsdWU6J3JpZ2h0JyB9LFxuXHRcdFx0eyBsYWJlbDonSnVzdGlmeScsIHZhbHVlOidqdXN0aWZ5JyB9XG5cdFx0XX1cblx0XX0sXG5cblx0eyBsYWJlbDonVGV4dCcsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IHR5cGU6J2JvbGQnLCBsYWJlbDonQm9sZCcgfSxcblx0XHR7IHR5cGU6J2l0YWxpYycsIGxhYmVsOidJdGFsaWMnIH0sXG5cdFx0eyB0eXBlOidzdHJpa2UnLCBsYWJlbDonU3RyaWtlJyB9LFxuXHRcdHsgdHlwZTondW5kZXJsaW5lJywgbGFiZWw6J1VuZGVybGluZScgfSxcblx0XHR7IHR5cGU6J2xpbmsnLCBsYWJlbDonTGluaycgfSxcblx0XHR7IHR5cGU6J2NvbG9yJywgbGFiZWw6J0NvbG9yJywgaXRlbXM6ZGVmYXVsdENvbG9ycyB9LFxuXHRdfSxcblxuXHR7IGxhYmVsOidCbG9ja3MnLCB0eXBlOidncm91cCcsIGl0ZW1zOiBbXG5cdFx0eyB0eXBlOididWxsZXQnLCBsYWJlbDonQnVsbGV0JyB9LFxuXHRcdHsgdHlwZTonbGlzdCcsIGxhYmVsOidMaXN0JyB9XG5cdF19XG5cbl07XG5cbnZhciBRdWlsbFRvb2xiYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdRdWlsbCBUb29sYmFyJyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHRpZDogICAgICAgIFQuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogVC5zdHJpbmcsXG5cdFx0aXRlbXM6ICAgICBULmFycmF5XG5cdH0sXG5cblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRpdGVtczogZGVmYXVsdEl0ZW1zXG5cdFx0fTtcblx0fSxcblxuXHRyZW5kZXJHcm91cDogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uc3Bhbih7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwsXG5cdFx0XHRjbGFzc05hbWU6J3FsLWZvcm1hdC1ncm91cCcgfSxcblx0XHRcdGl0ZW0uaXRlbXMubWFwKHRoaXMucmVuZGVySXRlbSlcblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckNob2ljZUl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLm9wdGlvbih7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwgfHwgaXRlbS52YWx1ZSxcblx0XHRcdHZhbHVlOml0ZW0udmFsdWUgfSxcblx0XHRcdGl0ZW0ubGFiZWxcblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckNob2ljZXM6IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLnNlbGVjdCh7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwsXG5cdFx0XHRjbGFzc05hbWU6ICdxbC0nK2l0ZW0udHlwZSB9LFxuXHRcdFx0aXRlbS5pdGVtcy5tYXAodGhpcy5yZW5kZXJDaG9pY2VJdGVtKVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQWN0aW9uOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlLFxuXHRcdFx0Y2xhc3NOYW1lOiAncWwtZm9ybWF0LWJ1dHRvbiBxbC0nK2l0ZW0udHlwZSxcblx0XHRcdHRpdGxlOiBpdGVtLmxhYmVsIH1cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRzd2l0Y2ggKGl0ZW0udHlwZSkge1xuXHRcdFx0Y2FzZSAnZ3JvdXAnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJHcm91cChpdGVtKTtcblx0XHRcdGNhc2UgJ2FsaWduJzpcblx0XHRcdGNhc2UgJ3NpemUnOlxuXHRcdFx0Y2FzZSAnY29sb3InOlxuXHRcdFx0Y2FzZSAnYmFja2dyb3VuZCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLnJlbmRlckNob2ljZXMoaXRlbSk7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJBY3Rpb24oaXRlbSk7XG5cdFx0fVxuXHR9LFxuXG5cdGdldENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICdxdWlsbC10b29sYmFyICcgKyAodGhpcy5wcm9wcy5jbGFzc05hbWV8fCcnKTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHtcblx0XHRcdGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWUoKSB9LFxuXHRcdFx0dGhpcy5wcm9wcy5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxUb29sYmFyO1xuUXVpbGxUb29sYmFyLmRlZmF1bHRJdGVtcyA9IGRlZmF1bHRJdGVtcztcblF1aWxsVG9vbGJhci5kZWZhdWx0Q29sb3JzID0gZGVmYXVsdENvbG9ycztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Rvb2xiYXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicXVpbGxcIixcImNvbW1vbmpzMlwiOlwicXVpbGxcIixcImFtZFwiOlwicXVpbGxcIixcInJvb3RcIjpcIlF1aWxsXCJ9XG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==