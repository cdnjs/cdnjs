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
			return this.props.value || this.props.defaultValue;
		},
	
		getClassName: function() {
			return ['quill', this.props.className].join(' ');
		},
	
		/*
		Renders either the specified contents, or a default
		configuration of toolbar and contents area.
		*/
		renderContents: function() {
			if (React.Children.count(this.props.children) > 0) {
				return React.Children.only(this.props.children);
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
	
	var React = __webpack_require__(/*! react */ 4),
		Quill = __webpack_require__(/*! quill */ 5),
		T = React.PropTypes;
	
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
			{ type:'link', label:'Link' }
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
			var mapping = {
				'group': this.renderGroup,
				'align': this.renderChoices,
				'size': this.renderChoices,
				'action': this.renderAction
			};
			var renderer = mapping[item.type] || mapping.action;
			return renderer(item);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4ZWFiNjNlYzQ2ODVmN2RmNWMzMiIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwiLFwicm9vdFwiOlwiUmVhY3RcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbFwiLFwiY29tbW9uanMyXCI6XCJxdWlsbFwiLFwiYW1kXCI6XCJxdWlsbFwiLFwicm9vdFwiOlwiUXVpbGxcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztB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Q0FBbUM7QUFDbkM7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQsK0I7Ozs7Ozs7OztBQzdHQSxnRDs7Ozs7Ozs7O0FDQUEsZ0QiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJyZWFjdFwiKSwgcmVxdWlyZShcInF1aWxsXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCIsIFwicXVpbGxcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiUmVhY3RRdWlsbFwiXSA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicXVpbGxcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlJlYWN0UXVpbGxcIl0gPSBmYWN0b3J5KHJvb3RbXCJSZWFjdFwiXSwgcm9vdFtcIlF1aWxsXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhlYWI2M2VjNDY4NWY3ZGY1YzMyXG4gKiovIiwiLypcblJlYWN0LVF1aWxsIHYwLjAuM1xuaHR0cHM6Ly9naXRodWIuY29tL3plbm9hbWFyby9yZWFjdC1xdWlsbFxuKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcbm1vZHVsZS5leHBvcnRzLk1peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xubW9kdWxlLmV4cG9ydHMuVG9vbGJhciA9IHJlcXVpcmUoJy4vdG9vbGJhcicpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0UXVpbGxUb29sYmFyID0gcmVxdWlyZSgnLi90b29sYmFyJyksXG5cdFF1aWxsTWl4aW4gPSByZXF1aXJlKCcuL21peGluJyksXG5cdFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbi8vIFN1cHBvcnQgUmVhY3QgMC4xMSBhbmQgMC4xMlxuLy8gRklYTUU6IFJlbW92ZSB3aXRoIFJlYWN0IDAuMTNcbmlmIChSZWFjdC5jcmVhdGVGYWN0b3J5KSB7XG5cdFF1aWxsVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoUXVpbGxUb29sYmFyKTtcbn1cblxudmFyIFF1aWxsQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnUXVpbGwnLFxuXG5cdG1peGluczogWyBRdWlsbE1peGluIF0sXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0aWQ6ICAgICAgICAgICBULnN0cmluZyxcblx0XHRjbGFzc05hbWU6ICAgIFQuc3RyaW5nLFxuXHRcdHZhbHVlOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0ZGVmYXVsdFZhbHVlOiBULnN0cmluZyxcblx0XHRyZWFkT25seTogICAgIFQuYm9vbCxcblx0XHR0b29sYmFyOiAgICAgIFQub2JqZWN0LFxuXHRcdGZvcm1hdHM6ICAgICAgVC5hcnJheSxcblx0XHRzdHlsZXM6ICAgICAgIFQub2JqZWN0LFxuXHRcdHRoZW1lOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0cG9sbEludGVydmFsOiBULm51bWJlcixcblx0XHRvbkNoYW5nZTogICAgIFQuZnVuY1xuXHR9LFxuXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNsYXNzTmFtZTogJycsXG5cdFx0XHR0aGVtZTogJ2Jhc2UnLFxuXHRcdFx0bW9kdWxlczoge31cblx0XHR9O1xuXHR9LFxuXG5cdC8qXG5cdFJldHJpZXZlIHRoZSBpbml0aWFsIHZhbHVlIGZyb20gZWl0aGVyIGB2YWx1ZWAgKHByZWZlcnJlZClcblx0b3IgYGRlZmF1bHRWYWx1ZWAgaWYgeW91IHdhbnQgYW4gdW4tY29udHJvbGxlZCBjb21wb25lbnQuXG5cdCovXG5cdGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9LFxuXG5cdC8qXG5cdFVwZGF0ZSBvbmx5IGlmIHdlJ3ZlIGJlZW4gcGFzc2VkIGEgbmV3IGB2YWx1ZWAuXG5cdFRoaXMgbGVhdmVzIGNvbXBvbmVudHMgdXNpbmcgYGRlZmF1bHRWYWx1ZWAgYWxvbmUuXG5cdCovXG5cdGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6IGZ1bmN0aW9uKG5leHRQcm9wcykge1xuXHRcdGlmICgndmFsdWUnIGluIG5leHRQcm9wcykge1xuXHRcdFx0aWYgKG5leHRQcm9wcy52YWx1ZSAhPT0gdGhpcy5wcm9wcy52YWx1ZSkge1xuXHRcdFx0XHR0aGlzLnNldEVkaXRvckNvbnRlbnRzKHRoaXMuc3RhdGUuZWRpdG9yLCBuZXh0UHJvcHMudmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGVkaXRvciA9IHRoaXMuY3JlYXRlRWRpdG9yKFxuXHRcdFx0dGhpcy5nZXRFZGl0b3JFbGVtZW50KCksXG5cdFx0XHR0aGlzLmdldEVkaXRvckNvbmZpZygpKTtcblx0XHR0aGlzLnNldFN0YXRlKHsgZWRpdG9yOmVkaXRvciB9KTtcblx0fSxcblxuXHRjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5kZXN0cm95RWRpdG9yKHRoaXMuc3RhdGUuZWRpdG9yKTtcblx0XHQvLyBOT1RFOiBEb24ndCBzZXQgdGhlIHN0YXRlIHRvIG51bGwgaGVyZVxuXHRcdC8vICAgICAgIGFzIGl0IHdvdWxkIGdlbmVyYXRlIGEgbG9vcC5cblx0fSxcblxuXHRzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG5cdFx0Ly8gTmV2ZXIgcmUtcmVuZGVyIG9yIHdlIGxvc2UgdGhlIGVsZW1lbnQuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9LFxuXG5cdC8qXG5cdElmIGZvciB3aGF0ZXZlciByZWFzb24gd2UgYXJlIHJlbmRlcmluZyBhZ2Fpbixcblx0d2Ugc2hvdWxkIHRlYXIgZG93biB0aGUgZWRpdG9yIGFuZCBicmluZyBpdCB1cFxuXHRhZ2Fpbi5cblx0Ki9cblx0Y29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jb21wb25lbnRXaWxsVW5tb3VudCgpO1xuXHR9LFxuXG5cdGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy5jb21wb25lbnREaWRNb3VudCgpO1xuXHR9LFxuXG5cdGdldEVkaXRvckNvbmZpZzogZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGNvbmZpZyA9IHtcblx0XHRcdHJlYWRPbmx5OiAgICAgdGhpcy5wcm9wcy5yZWFkT25seSxcblx0XHRcdHRoZW1lOiAgICAgICAgdGhpcy5wcm9wcy50aGVtZSxcblx0XHRcdGZvcm1hdHM6ICAgICAgdGhpcy5wcm9wcy5mb3JtYXRzLFxuXHRcdFx0c3R5bGVzOiAgICAgICB0aGlzLnByb3BzLnN0eWxlcyxcblx0XHRcdG1vZHVsZXM6ICAgICAgdGhpcy5wcm9wcy5tb2R1bGVzLFxuXHRcdFx0cG9sbEludGVydmFsOiB0aGlzLnByb3BzLnBvbGxJbnRlcnZhbFxuXHRcdH07XG5cdFx0Ly8gVW5sZXNzIHdlJ3JlIHJlZGVmaW5pbmcgdGhlIHRvb2xiYXIsXG5cdFx0Ly8gYXR0YWNoIHRvIHRoZSBkZWZhdWx0IG9uZSBhcyBhIHJlZi5cblx0XHRpZiAoIWNvbmZpZy5tb2R1bGVzLnRvb2xiYXIpIHtcblx0XHRcdC8vIERvbid0IG11dGF0ZSB0aGUgb3JpZ2luYWwgbW9kdWxlc1xuXHRcdFx0Ly8gYmVjYXVzZSBpdCdzIHNoYXJlZCBiZXR3ZWVuIGNvbXBvbmVudHMuXG5cdFx0XHRjb25maWcubW9kdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29uZmlnLm1vZHVsZXMpKTtcblx0XHRcdGNvbmZpZy5tb2R1bGVzLnRvb2xiYXIgPSB7XG5cdFx0XHRcdGNvbnRhaW5lcjogdGhpcy5yZWZzLnRvb2xiYXIuZ2V0RE9NTm9kZSgpXG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gY29uZmlnO1xuXHR9LFxuXG5cdGdldEVkaXRvckVsZW1lbnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnJlZnMuZWRpdG9yLmdldERPTU5vZGUoKTtcblx0fSxcblxuXHRnZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucHJvcHMudmFsdWUgfHwgdGhpcy5wcm9wcy5kZWZhdWx0VmFsdWU7XG5cdH0sXG5cblx0Z2V0Q2xhc3NOYW1lOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gWydxdWlsbCcsIHRoaXMucHJvcHMuY2xhc3NOYW1lXS5qb2luKCcgJyk7XG5cdH0sXG5cblx0Lypcblx0UmVuZGVycyBlaXRoZXIgdGhlIHNwZWNpZmllZCBjb250ZW50cywgb3IgYSBkZWZhdWx0XG5cdGNvbmZpZ3VyYXRpb24gb2YgdG9vbGJhciBhbmQgY29udGVudHMgYXJlYS5cblx0Ki9cblx0cmVuZGVyQ29udGVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdGlmIChSZWFjdC5DaGlsZHJlbi5jb3VudCh0aGlzLnByb3BzLmNoaWxkcmVuKSA+IDApIHtcblx0XHRcdHJldHVybiBSZWFjdC5DaGlsZHJlbi5vbmx5KHRoaXMucHJvcHMuY2hpbGRyZW4pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRRdWlsbFRvb2xiYXIoe1xuXHRcdFx0XHRcdGtleTondG9vbGJhcicsXG5cdFx0XHRcdFx0cmVmOid0b29sYmFyJyxcblx0XHRcdFx0XHRpdGVtczogdGhpcy5wcm9wcy50b29sYmFyXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRSZWFjdC5ET00uZGl2KHtcblx0XHRcdFx0XHRrZXk6J2VkaXRvcicsXG5cdFx0XHRcdFx0cmVmOidlZGl0b3InLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ3F1aWxsLWNvbnRlbnRzJyxcblx0XHRcdFx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6dGhpcy5nZXRFZGl0b3JDb250ZW50cygpIH1cblx0XHRcdFx0fSlcblx0XHRcdF07XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYoe1xuXHRcdFx0Y2xhc3NOYW1lOiB0aGlzLmdldENsYXNzTmFtZSgpLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMucHJldmVudERlZmF1bHQgfSxcblx0XHRcdHRoaXMucmVuZGVyQ29udGVudHMoKVxuXHRcdCk7XG5cdH0sXG5cblx0Lypcblx0VXBkYXRlcyB0aGUgbG9jYWwgc3RhdGUgd2l0aCB0aGUgbmV3IGNvbnRlbnRzLFxuXHRleGVjdXRlcyB0aGUgY2hhbmdlIGhhbmRsZXIgcGFzc2VkIGFzIHByb3BzLlxuXHQqL1xuXHRvbkVkaXRvckNoYW5nZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRpZiAodmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKlxuXHRTdG9wIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdG9vbGJhciBmcm9tXG5cdGJ1YmJsaW5nIHVwIG91dHNpZGUuXG5cdCovXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdFF1aWxsID0gcmVxdWlyZSgncXVpbGwnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIFF1aWxsTWl4aW4gPSB7XG5cblx0LyoqXG5cdENyZWF0ZXMgYW4gZWRpdG9yIG9uIHRoZSBnaXZlbiBlbGVtZW50LiBUaGUgZWRpdG9yIHdpbGxcblx0YmUgcGFzc2VkIHRoZSBjb25maWd1cmF0aW9uLCBoYXZlIGl0cyBldmVudHMgYm91bmQsXG5cdCovXG5cdGNyZWF0ZUVkaXRvcjogZnVuY3Rpb24oJGVsLCBjb25maWcpIHtcblx0XHR2YXIgZWRpdG9yID0gbmV3IFF1aWxsKCRlbCwgY29uZmlnKTtcblx0XHR0aGlzLmhvb2tFZGl0b3IoZWRpdG9yKTtcblx0XHRyZXR1cm4gZWRpdG9yO1xuXHR9LFxuXG5cdGhvb2tFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvcikge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRlZGl0b3Iub24oJ3RleHQtY2hhbmdlJywgZnVuY3Rpb24oZGVsdGEsIHNvdXJjZSkge1xuXHRcdFx0aWYgKHNlbGYub25FZGl0b3JDaGFuZ2UpIHtcblx0XHRcdFx0c2VsZi5vbkVkaXRvckNoYW5nZShlZGl0b3IuZ2V0SFRNTCgpLCBkZWx0YSwgc291cmNlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHR1cGRhdGVFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvciwgY29uZmlnKSB7XG5cdFx0Ly8gTk9URTogVGhpcyB0ZWFycyB0aGUgZWRpdG9yIGRvd24sIGFuZCByZWluaXRpYWxpemVzXG5cdFx0Ly8gICAgICAgaXQgd2l0aCB0aGUgbmV3IGNvbmZpZy4gVWdseSBidXQgbmVjZXNzYXJ5XG5cdFx0Ly8gICAgICAgYXMgdGhlcmUgaXMgbm8gYXBpIGZvciB1cGRhdGluZyBpdC5cblx0XHR0aGlzLmRlc3Ryb3lFZGl0b3IoZWRpdG9yKTtcblx0XHR0aGlzLmNyZWF0ZUVkaXRvcihjb25maWcpO1xuXHRcdHJldHVybiBlZGl0b3I7XG5cdH0sXG5cblx0ZGVzdHJveUVkaXRvcjogZnVuY3Rpb24oZWRpdG9yKSB7XG5cdFx0ZWRpdG9yLmRlc3Ryb3koKTtcblx0fSxcblxuXHQvKlxuXHRSZXBsYWNlIHRoZSBjb250ZW50cyBvZiB0aGUgZWRpdG9yLCBidXQga2VlcFxuXHR0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGhhbmdpbmcgYXJvdW5kIHNvIHRoYXRcblx0dGhlIGN1cnNvciB3b24ndCBtb3ZlLlxuXHQqL1xuXHRzZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oZWRpdG9yLCB2YWx1ZSkge1xuXHRcdHZhciBzZWwgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0ZWRpdG9yLnNldEhUTUwodmFsdWUpO1xuXHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aWxsTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIGRlZmF1bHRJdGVtcyA9IFtcblxuXHR7IGxhYmVsOidGb3JtYXRzJywgdHlwZTonZ3JvdXAnLCBpdGVtczogW1xuXHRcdHsgbGFiZWw6J1NpemUnLCB0eXBlOidzaXplJywgaXRlbXM6IFtcblx0XHRcdHsgbGFiZWw6J05vcm1hbCcsIHZhbHVlOicnIH0sXG5cdFx0XHR7IGxhYmVsOidTbWFsbGVyJywgdmFsdWU6JzAuOGVtJyB9LFxuXHRcdFx0eyBsYWJlbDonTGFyZ2VyJywgdmFsdWU6JzEuNGVtJyB9LFxuXHRcdFx0eyBsYWJlbDonSHVnZScsIHZhbHVlOicyZW0nIH1cblx0XHRdfSxcblx0XHR7IGxhYmVsOidBbGlnbm1lbnQnLCB0eXBlOidhbGlnbicsIGl0ZW1zOiBbXG5cdFx0XHR7IGxhYmVsOidDZW50ZXInLCB2YWx1ZTonY2VudGVyJyB9LFxuXHRcdFx0eyBsYWJlbDonTGVmdCcsIHZhbHVlOidsZWZ0JyB9LFxuXHRcdFx0eyBsYWJlbDonUmlnaHQnLCB2YWx1ZToncmlnaHQnIH0sXG5cdFx0XHR7IGxhYmVsOidKdXN0aWZ5JywgdmFsdWU6J2p1c3RpZnknIH1cblx0XHRdfVxuXHRdfSxcblxuXHR7IGxhYmVsOidUZXh0JywgdHlwZTonZ3JvdXAnLCBpdGVtczogW1xuXHRcdHsgdHlwZTonYm9sZCcsIGxhYmVsOidCb2xkJyB9LFxuXHRcdHsgdHlwZTonaXRhbGljJywgbGFiZWw6J0l0YWxpYycgfSxcblx0XHR7IHR5cGU6J3N0cmlrZScsIGxhYmVsOidTdHJpa2UnIH0sXG5cdFx0eyB0eXBlOid1bmRlcmxpbmUnLCBsYWJlbDonVW5kZXJsaW5lJyB9LFxuXHRcdHsgdHlwZTonbGluaycsIGxhYmVsOidMaW5rJyB9XG5cdF19LFxuXG5cdHsgbGFiZWw6J0Jsb2NrcycsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IHR5cGU6J2J1bGxldCcsIGxhYmVsOidCdWxsZXQnIH0sXG5cdFx0eyB0eXBlOidsaXN0JywgbGFiZWw6J0xpc3QnIH1cblx0XX1cblxuXTtcblxudmFyIFF1aWxsVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1F1aWxsIFRvb2xiYXInLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdGlkOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBULnN0cmluZyxcblx0XHRpdGVtczogICAgIFQuYXJyYXlcblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGl0ZW1zOiBkZWZhdWx0SXRlbXNcblx0XHR9O1xuXHR9LFxuXG5cdHJlbmRlckdyb3VwOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCxcblx0XHRcdGNsYXNzTmFtZToncWwtZm9ybWF0LWdyb3VwJyB9LFxuXHRcdFx0aXRlbS5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQ2hvaWNlSXRlbTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00ub3B0aW9uKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlLFxuXHRcdFx0dmFsdWU6aXRlbS52YWx1ZSB9LFxuXHRcdFx0aXRlbS5sYWJlbFxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQ2hvaWNlczogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uc2VsZWN0KHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCxcblx0XHRcdGNsYXNzTmFtZTogJ3FsLScraXRlbS50eXBlIH0sXG5cdFx0XHRpdGVtLml0ZW1zLm1hcCh0aGlzLnJlbmRlckNob2ljZUl0ZW0pXG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJBY3Rpb246IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLnNwYW4oe1xuXHRcdFx0a2V5OiBpdGVtLmxhYmVsIHx8IGl0ZW0udmFsdWUsXG5cdFx0XHRjbGFzc05hbWU6ICdxbC1mb3JtYXQtYnV0dG9uIHFsLScraXRlbS50eXBlLFxuXHRcdFx0dGl0bGU6IGl0ZW0ubGFiZWwgfVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVySXRlbTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHZhciBtYXBwaW5nID0ge1xuXHRcdFx0J2dyb3VwJzogdGhpcy5yZW5kZXJHcm91cCxcblx0XHRcdCdhbGlnbic6IHRoaXMucmVuZGVyQ2hvaWNlcyxcblx0XHRcdCdzaXplJzogdGhpcy5yZW5kZXJDaG9pY2VzLFxuXHRcdFx0J2FjdGlvbic6IHRoaXMucmVuZGVyQWN0aW9uXG5cdFx0fTtcblx0XHR2YXIgcmVuZGVyZXIgPSBtYXBwaW5nW2l0ZW0udHlwZV0gfHwgbWFwcGluZy5hY3Rpb247XG5cdFx0cmV0dXJuIHJlbmRlcmVyKGl0ZW0pO1xuXHR9LFxuXG5cdGdldENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICdxdWlsbC10b29sYmFyICcgKyAodGhpcy5wcm9wcy5jbGFzc05hbWV8fCcnKTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHtcblx0XHRcdGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWUoKSB9LFxuXHRcdFx0dGhpcy5wcm9wcy5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxUb29sYmFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdG9vbGJhci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbFwiLFwiY29tbW9uanMyXCI6XCJxdWlsbFwiLFwiYW1kXCI6XCJxdWlsbFwiLFwicm9vdFwiOlwiUXVpbGxcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIuL2Rpc3QvcmVhY3QtcXVpbGwuanMifQ==