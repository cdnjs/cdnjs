(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("quilljs"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "quilljs"], factory);
	else if(typeof exports === 'object')
		exports["ReactQuill"] = factory(require("react"), require("quilljs"));
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
	React-Quill 0.0.2
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
		Quill = __webpack_require__(/*! quilljs */ 5),
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
			// TODO: Unfortunately, while we can add modules and
			//       stuff, we can't remove them. And there is
			//       little API to update other parts of the config.
			//       But if we could tear down the editor, at least
			//       we could do a re-init with the new config.
			throw new Error('Not implemented');
		},
	
		destroyEditor: function(editor) {
			// TODO: How to destroy this?
			// editor.destroy();
			editor.removeAllListeners();
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
/*!********************************************************************************************!*\
  !*** external {"commonjs":"quilljs","commonjs2":"quilljs","amd":"quilljs","root":"Quill"} ***!
  \********************************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0MTlkZTQ4NzI5MjE3MzUwMzdiOSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwiLFwicm9vdFwiOlwiUmVhY3RcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbGpzXCIsXCJjb21tb25qczJcIjpcInF1aWxsanNcIixcImFtZFwiOlwicXVpbGxqc1wiLFwicm9vdFwiOlwiUXVpbGxcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLGdCQUFnQjtBQUNqQyxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0I7QUFDL0IsTUFBSztBQUNMO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOztBQUVELGlDOzs7Ozs7Ozs7QUNsTEE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsNkI7Ozs7Ozs7OztBQ3ZEQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLEdBQUU7QUFDRixJQUFHO0FBQ0gsS0FBSSwyQkFBMkI7QUFDL0IsS0FBSSxpQ0FBaUM7QUFDckMsS0FBSSxnQ0FBZ0M7QUFDcEMsS0FBSTtBQUNKLEtBQUk7QUFDSixJQUFHO0FBQ0gsS0FBSSxpQ0FBaUM7QUFDckMsS0FBSSw2QkFBNkI7QUFDakMsS0FBSSwrQkFBK0I7QUFDbkMsS0FBSTtBQUNKO0FBQ0EsSUFBRzs7QUFFSCxHQUFFO0FBQ0YsSUFBRyw0QkFBNEI7QUFDL0IsSUFBRyxnQ0FBZ0M7QUFDbkMsSUFBRyxnQ0FBZ0M7QUFDbkMsSUFBRyxzQ0FBc0M7QUFDekMsSUFBRztBQUNILElBQUc7O0FBRUgsR0FBRTtBQUNGLElBQUcsZ0NBQWdDO0FBQ25DLElBQUc7QUFDSDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQztBQUNoQztBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCO0FBQy9CO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQSxFQUFDOztBQUVELCtCOzs7Ozs7Ozs7QUM3R0EsZ0Q7Ozs7Ozs7OztBQ0FBLGdEIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJxdWlsbGpzXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcInJlYWN0XCIsIFwicXVpbGxqc1wiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdFF1aWxsXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJxdWlsbGpzXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJSZWFjdFF1aWxsXCJdID0gZmFjdG9yeShyb290W1wiUmVhY3RcIl0sIHJvb3RbXCJRdWlsbFwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA0MTlkZTQ4NzI5MjE3MzUwMzdiOVxuICoqLyIsIi8qXG5SZWFjdC1RdWlsbCAwLjAuMlxuaHR0cHM6Ly9naXRodWIuY29tL3plbm9hbWFyby9yZWFjdC1xdWlsbFxuKi9cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKTtcbm1vZHVsZS5leHBvcnRzLk1peGluID0gcmVxdWlyZSgnLi9taXhpbicpO1xubW9kdWxlLmV4cG9ydHMuVG9vbGJhciA9IHJlcXVpcmUoJy4vdG9vbGJhcicpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0UXVpbGxUb29sYmFyID0gcmVxdWlyZSgnLi90b29sYmFyJyksXG5cdFF1aWxsTWl4aW4gPSByZXF1aXJlKCcuL21peGluJyksXG5cdFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbi8vIFN1cHBvcnQgUmVhY3QgMC4xMSBhbmQgMC4xMlxuLy8gRklYTUU6IFJlbW92ZSB3aXRoIFJlYWN0IDAuMTNcbmlmIChSZWFjdC5jcmVhdGVGYWN0b3J5KSB7XG5cdFF1aWxsVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUZhY3RvcnkoUXVpbGxUb29sYmFyKTtcbn1cblxudmFyIFF1aWxsQ29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG5cdGRpc3BsYXlOYW1lOiAnUXVpbGwnLFxuXG5cdG1peGluczogWyBRdWlsbE1peGluIF0sXG5cblx0cHJvcFR5cGVzOiB7XG5cdFx0aWQ6ICAgICAgICAgICBULnN0cmluZyxcblx0XHRjbGFzc05hbWU6ICAgIFQuc3RyaW5nLFxuXHRcdHZhbHVlOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0ZGVmYXVsdFZhbHVlOiBULnN0cmluZyxcblx0XHRyZWFkT25seTogICAgIFQuYm9vbCxcblx0XHR0b29sYmFyOiAgICAgIFQub2JqZWN0LFxuXHRcdGZvcm1hdHM6ICAgICAgVC5hcnJheSxcblx0XHRzdHlsZXM6ICAgICAgIFQub2JqZWN0LFxuXHRcdHRoZW1lOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0cG9sbEludGVydmFsOiBULm51bWJlcixcblx0XHRvbkNoYW5nZTogICAgIFQuZnVuY1xuXHR9LFxuXG5cdGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGNsYXNzTmFtZTogJycsXG5cdFx0XHRtb2R1bGVzOiB7fVxuXHRcdH07XG5cdH0sXG5cblx0Lypcblx0UmV0cmlldmUgdGhlIGluaXRpYWwgdmFsdWUgZnJvbSBlaXRoZXIgYHZhbHVlYCAocHJlZmVycmVkKVxuXHRvciBgZGVmYXVsdFZhbHVlYCBpZiB5b3Ugd2FudCBhbiB1bi1jb250cm9sbGVkIGNvbXBvbmVudC5cblx0Ki9cblx0Z2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4ge307XG5cdH0sXG5cblx0Lypcblx0VXBkYXRlIG9ubHkgaWYgd2UndmUgYmVlbiBwYXNzZWQgYSBuZXcgYHZhbHVlYC5cblx0VGhpcyBsZWF2ZXMgY29tcG9uZW50cyB1c2luZyBgZGVmYXVsdFZhbHVlYCBhbG9uZS5cblx0Ki9cblx0Y29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzKSB7XG5cdFx0aWYgKCd2YWx1ZScgaW4gbmV4dFByb3BzKSB7XG5cdFx0XHRpZiAobmV4dFByb3BzLnZhbHVlICE9PSB0aGlzLnByb3BzLnZhbHVlKSB7XG5cdFx0XHRcdHRoaXMuc2V0RWRpdG9yQ29udGVudHModGhpcy5zdGF0ZS5lZGl0b3IsIG5leHRQcm9wcy52YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcblx0XHR2YXIgZWRpdG9yID0gdGhpcy5jcmVhdGVFZGl0b3IoXG5cdFx0XHR0aGlzLmdldEVkaXRvckVsZW1lbnQoKSxcblx0XHRcdHRoaXMuZ2V0RWRpdG9yQ29uZmlnKCkpO1xuXHRcdHRoaXMuc2V0U3RhdGUoeyBlZGl0b3I6ZWRpdG9yIH0pO1xuXHR9LFxuXG5cdGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmRlc3Ryb3lFZGl0b3IodGhpcy5zdGF0ZS5lZGl0b3IpO1xuXHR9LFxuXG5cdHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcblx0XHQvLyBOZXZlciByZS1yZW5kZXIgb3Igd2UgbG9zZSB0aGUgZWxlbWVudC5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0sXG5cblx0Lypcblx0SWYgZm9yIHdoYXRldmVyIHJlYXNvbiB3ZSBhcmUgcmVuZGVyaW5nIGFnYWluLFxuXHR3ZSBzaG91bGQgdGVhciBkb3duIHRoZSBlZGl0b3IgYW5kIGJyaW5nIGl0IHVwXG5cdGFnYWluLlxuXHQqL1xuXHRjb21wb25lbnRXaWxsVXBkYXRlOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNvbXBvbmVudFdpbGxVbm1vdW50KCk7XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbigpIHtcblx0XHR0aGlzLmNvbXBvbmVudERpZE1vdW50KCk7XG5cdH0sXG5cblx0Z2V0RWRpdG9yQ29uZmlnOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgY29uZmlnID0ge1xuXHRcdFx0cmVhZE9ubHk6ICAgICB0aGlzLnByb3BzLnJlYWRPbmx5LFxuXHRcdFx0dGhlbWU6ICAgICAgICB0aGlzLnByb3BzLnRoZW1lLFxuXHRcdFx0Zm9ybWF0czogICAgICB0aGlzLnByb3BzLmZvcm1hdHMsXG5cdFx0XHRzdHlsZXM6ICAgICAgIHRoaXMucHJvcHMuc3R5bGVzLFxuXHRcdFx0bW9kdWxlczogICAgICB0aGlzLnByb3BzLm1vZHVsZXMsXG5cdFx0XHRwb2xsSW50ZXJ2YWw6IHRoaXMucHJvcHMucG9sbEludGVydmFsXG5cdFx0fTtcblx0XHQvLyBVbmxlc3Mgd2UncmUgcmVkZWZpbmluZyB0aGUgdG9vbGJhcixcblx0XHQvLyBhdHRhY2ggdG8gdGhlIGRlZmF1bHQgb25lIGFzIGEgcmVmLlxuXHRcdGlmICghY29uZmlnLm1vZHVsZXMudG9vbGJhcikge1xuXHRcdFx0Ly8gRG9uJ3QgbXV0YXRlIHRoZSBvcmlnaW5hbCBtb2R1bGVzXG5cdFx0XHQvLyBiZWNhdXNlIGl0J3Mgc2hhcmVkIGJldHdlZW4gY29tcG9uZW50cy5cblx0XHRcdGNvbmZpZy5tb2R1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb25maWcubW9kdWxlcykpO1xuXHRcdFx0Y29uZmlnLm1vZHVsZXMudG9vbGJhciA9IHtcblx0XHRcdFx0Y29udGFpbmVyOiB0aGlzLnJlZnMudG9vbGJhci5nZXRET01Ob2RlKClcblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiBjb25maWc7XG5cdH0sXG5cblx0Z2V0RWRpdG9yRWxlbWVudDogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIHRoaXMucmVmcy5lZGl0b3IuZ2V0RE9NTm9kZSgpO1xuXHR9LFxuXG5cdGdldEVkaXRvckNvbnRlbnRzOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5wcm9wcy52YWx1ZSB8fCB0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZTtcblx0fSxcblxuXHRnZXRDbGFzc05hbWU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBbJ3F1aWxsJywgdGhpcy5wcm9wcy5jbGFzc05hbWVdLmpvaW4oJyAnKTtcblx0fSxcblxuXHQvKlxuXHRSZW5kZXJzIGVpdGhlciB0aGUgc3BlY2lmaWVkIGNvbnRlbnRzLCBvciBhIGRlZmF1bHRcblx0Y29uZmlndXJhdGlvbiBvZiB0b29sYmFyIGFuZCBjb250ZW50cyBhcmVhLlxuXHQqL1xuXHRyZW5kZXJDb250ZW50czogZnVuY3Rpb24oKSB7XG5cdFx0aWYgKFJlYWN0LkNoaWxkcmVuLmNvdW50KHRoaXMucHJvcHMuY2hpbGRyZW4pID4gMCkge1xuXHRcdFx0cmV0dXJuIFJlYWN0LkNoaWxkcmVuLm9ubHkodGhpcy5wcm9wcy5jaGlsZHJlbik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFF1aWxsVG9vbGJhcih7XG5cdFx0XHRcdFx0a2V5Oid0b29sYmFyJyxcblx0XHRcdFx0XHRyZWY6J3Rvb2xiYXInLFxuXHRcdFx0XHRcdGl0ZW1zOiB0aGlzLnByb3BzLnRvb2xiYXJcblx0XHRcdFx0fSksXG5cdFx0XHRcdFJlYWN0LkRPTS5kaXYoe1xuXHRcdFx0XHRcdGtleTonZWRpdG9yJyxcblx0XHRcdFx0XHRyZWY6J2VkaXRvcicsXG5cdFx0XHRcdFx0Y2xhc3NOYW1lOiAncXVpbGwtY29udGVudHMnLFxuXHRcdFx0XHRcdGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MOiB7IF9faHRtbDp0aGlzLmdldEVkaXRvckNvbnRlbnRzKCkgfVxuXHRcdFx0XHR9KVxuXHRcdFx0XTtcblx0XHR9XG5cdH0sXG5cblx0cmVuZGVyOiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLmRpdih7XG5cdFx0XHRjbGFzc05hbWU6IHRoaXMuZ2V0Q2xhc3NOYW1lKCksXG5cdFx0XHRvbkNoYW5nZTogdGhpcy5wcmV2ZW50RGVmYXVsdCB9LFxuXHRcdFx0dGhpcy5yZW5kZXJDb250ZW50cygpXG5cdFx0KTtcblx0fSxcblxuXHQvKlxuXHRVcGRhdGVzIHRoZSBsb2NhbCBzdGF0ZSB3aXRoIHRoZSBuZXcgY29udGVudHMsXG5cdGV4ZWN1dGVzIHRoZSBjaGFuZ2UgaGFuZGxlciBwYXNzZWQgYXMgcHJvcHMuXG5cdCovXG5cdG9uRWRpdG9yQ2hhbmdlOiBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGlmICh2YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuXHRcdFx0aWYgKHRoaXMucHJvcHMub25DaGFuZ2UpIHtcblx0XHRcdFx0dGhpcy5wcm9wcy5vbkNoYW5nZSh2YWx1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdC8qXG5cdFN0b3AgY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0b29sYmFyIGZyb21cblx0YnViYmxpbmcgdXAgb3V0c2lkZS5cblx0Ki9cblx0cHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0fVxuXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBRdWlsbENvbXBvbmVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2NvbXBvbmVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0UXVpbGwgPSByZXF1aXJlKCdxdWlsbGpzJyksXG5cdFQgPSBSZWFjdC5Qcm9wVHlwZXM7XG5cbnZhciBRdWlsbE1peGluID0ge1xuXG5cdC8qKlxuXHRDcmVhdGVzIGFuIGVkaXRvciBvbiB0aGUgZ2l2ZW4gZWxlbWVudC4gVGhlIGVkaXRvciB3aWxsXG5cdGJlIHBhc3NlZCB0aGUgY29uZmlndXJhdGlvbiwgaGF2ZSBpdHMgZXZlbnRzIGJvdW5kLFxuXHQqL1xuXHRjcmVhdGVFZGl0b3I6IGZ1bmN0aW9uKCRlbCwgY29uZmlnKSB7XG5cdFx0dmFyIGVkaXRvciA9IG5ldyBRdWlsbCgkZWwsIGNvbmZpZyk7XG5cdFx0dGhpcy5ob29rRWRpdG9yKGVkaXRvcik7XG5cdFx0cmV0dXJuIGVkaXRvcjtcblx0fSxcblxuXHRob29rRWRpdG9yOiBmdW5jdGlvbihlZGl0b3IpIHtcblx0XHR2YXIgc2VsZiA9IHRoaXM7XG5cdFx0ZWRpdG9yLm9uKCd0ZXh0LWNoYW5nZScsIGZ1bmN0aW9uKGRlbHRhLCBzb3VyY2UpIHtcblx0XHRcdGlmIChzZWxmLm9uRWRpdG9yQ2hhbmdlKSB7XG5cdFx0XHRcdHNlbGYub25FZGl0b3JDaGFuZ2UoZWRpdG9yLmdldEhUTUwoKSwgZGVsdGEsIHNvdXJjZSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cblx0dXBkYXRlRWRpdG9yOiBmdW5jdGlvbihlZGl0b3IsIGNvbmZpZykge1xuXHRcdC8vIFRPRE86IFVuZm9ydHVuYXRlbHksIHdoaWxlIHdlIGNhbiBhZGQgbW9kdWxlcyBhbmRcblx0XHQvLyAgICAgICBzdHVmZiwgd2UgY2FuJ3QgcmVtb3ZlIHRoZW0uIEFuZCB0aGVyZSBpc1xuXHRcdC8vICAgICAgIGxpdHRsZSBBUEkgdG8gdXBkYXRlIG90aGVyIHBhcnRzIG9mIHRoZSBjb25maWcuXG5cdFx0Ly8gICAgICAgQnV0IGlmIHdlIGNvdWxkIHRlYXIgZG93biB0aGUgZWRpdG9yLCBhdCBsZWFzdFxuXHRcdC8vICAgICAgIHdlIGNvdWxkIGRvIGEgcmUtaW5pdCB3aXRoIHRoZSBuZXcgY29uZmlnLlxuXHRcdHRocm93IG5ldyBFcnJvcignTm90IGltcGxlbWVudGVkJyk7XG5cdH0sXG5cblx0ZGVzdHJveUVkaXRvcjogZnVuY3Rpb24oZWRpdG9yKSB7XG5cdFx0Ly8gVE9ETzogSG93IHRvIGRlc3Ryb3kgdGhpcz9cblx0XHQvLyBlZGl0b3IuZGVzdHJveSgpO1xuXHRcdGVkaXRvci5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblx0fSxcblxuXHQvKlxuXHRSZXBsYWNlIHRoZSBjb250ZW50cyBvZiB0aGUgZWRpdG9yLCBidXQga2VlcFxuXHR0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGhhbmdpbmcgYXJvdW5kIHNvIHRoYXRcblx0dGhlIGN1cnNvciB3b24ndCBtb3ZlLlxuXHQqL1xuXHRzZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oZWRpdG9yLCB2YWx1ZSkge1xuXHRcdHZhciBzZWwgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0ZWRpdG9yLnNldEhUTUwodmFsdWUpO1xuXHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aWxsTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIGRlZmF1bHRJdGVtcyA9IFtcblxuXHR7IGxhYmVsOidGb3JtYXRzJywgdHlwZTonZ3JvdXAnLCBpdGVtczogW1xuXHRcdHsgbGFiZWw6J1NpemUnLCB0eXBlOidzaXplJywgaXRlbXM6IFtcblx0XHRcdHsgbGFiZWw6J05vcm1hbCcsIHZhbHVlOicnIH0sXG5cdFx0XHR7IGxhYmVsOidTbWFsbGVyJywgdmFsdWU6JzAuOGVtJyB9LFxuXHRcdFx0eyBsYWJlbDonTGFyZ2VyJywgdmFsdWU6JzEuNGVtJyB9LFxuXHRcdFx0eyBsYWJlbDonSHVnZScsIHZhbHVlOicyZW0nIH1cblx0XHRdfSxcblx0XHR7IGxhYmVsOidBbGlnbm1lbnQnLCB0eXBlOidhbGlnbicsIGl0ZW1zOiBbXG5cdFx0XHR7IGxhYmVsOidDZW50ZXInLCB2YWx1ZTonY2VudGVyJyB9LFxuXHRcdFx0eyBsYWJlbDonTGVmdCcsIHZhbHVlOidsZWZ0JyB9LFxuXHRcdFx0eyBsYWJlbDonUmlnaHQnLCB2YWx1ZToncmlnaHQnIH0sXG5cdFx0XHR7IGxhYmVsOidKdXN0aWZ5JywgdmFsdWU6J2p1c3RpZnknIH1cblx0XHRdfVxuXHRdfSxcblxuXHR7IGxhYmVsOidUZXh0JywgdHlwZTonZ3JvdXAnLCBpdGVtczogW1xuXHRcdHsgdHlwZTonYm9sZCcsIGxhYmVsOidCb2xkJyB9LFxuXHRcdHsgdHlwZTonaXRhbGljJywgbGFiZWw6J0l0YWxpYycgfSxcblx0XHR7IHR5cGU6J3N0cmlrZScsIGxhYmVsOidTdHJpa2UnIH0sXG5cdFx0eyB0eXBlOid1bmRlcmxpbmUnLCBsYWJlbDonVW5kZXJsaW5lJyB9LFxuXHRcdHsgdHlwZTonbGluaycsIGxhYmVsOidMaW5rJyB9XG5cdF19LFxuXG5cdHsgbGFiZWw6J0Jsb2NrcycsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IHR5cGU6J2J1bGxldCcsIGxhYmVsOidCdWxsZXQnIH0sXG5cdFx0eyB0eXBlOidsaXN0JywgbGFiZWw6J0xpc3QnIH1cblx0XX1cblxuXTtcblxudmFyIFF1aWxsVG9vbGJhciA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1F1aWxsIFRvb2xiYXInLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdGlkOiAgICAgICAgVC5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiBULnN0cmluZyxcblx0XHRpdGVtczogICAgIFQuYXJyYXlcblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGl0ZW1zOiBkZWZhdWx0SXRlbXNcblx0XHR9O1xuXHR9LFxuXG5cdHJlbmRlckdyb3VwOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCxcblx0XHRcdGNsYXNzTmFtZToncWwtZm9ybWF0LWdyb3VwJyB9LFxuXHRcdFx0aXRlbS5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQ2hvaWNlSXRlbTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00ub3B0aW9uKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlLFxuXHRcdFx0dmFsdWU6aXRlbS52YWx1ZSB9LFxuXHRcdFx0aXRlbS5sYWJlbFxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQ2hvaWNlczogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uc2VsZWN0KHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCxcblx0XHRcdGNsYXNzTmFtZTogJ3FsLScraXRlbS50eXBlIH0sXG5cdFx0XHRpdGVtLml0ZW1zLm1hcCh0aGlzLnJlbmRlckNob2ljZUl0ZW0pXG5cdFx0KTtcblx0fSxcblxuXHRyZW5kZXJBY3Rpb246IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLnNwYW4oe1xuXHRcdFx0a2V5OiBpdGVtLmxhYmVsIHx8IGl0ZW0udmFsdWUsXG5cdFx0XHRjbGFzc05hbWU6ICdxbC1mb3JtYXQtYnV0dG9uIHFsLScraXRlbS50eXBlLFxuXHRcdFx0dGl0bGU6IGl0ZW0ubGFiZWwgfVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVySXRlbTogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHZhciBtYXBwaW5nID0ge1xuXHRcdFx0J2dyb3VwJzogdGhpcy5yZW5kZXJHcm91cCxcblx0XHRcdCdhbGlnbic6IHRoaXMucmVuZGVyQ2hvaWNlcyxcblx0XHRcdCdzaXplJzogdGhpcy5yZW5kZXJDaG9pY2VzLFxuXHRcdFx0J2FjdGlvbic6IHRoaXMucmVuZGVyQWN0aW9uXG5cdFx0fTtcblx0XHR2YXIgcmVuZGVyZXIgPSBtYXBwaW5nW2l0ZW0udHlwZV0gfHwgbWFwcGluZy5hY3Rpb247XG5cdFx0cmV0dXJuIHJlbmRlcmVyKGl0ZW0pO1xuXHR9LFxuXG5cdGdldENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICdxdWlsbC10b29sYmFyICcgKyAodGhpcy5wcm9wcy5jbGFzc05hbWV8fCcnKTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHtcblx0XHRcdGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWUoKSB9LFxuXHRcdFx0dGhpcy5wcm9wcy5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxUb29sYmFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdG9vbGJhci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImFtZFwiOlwicmVhY3RcIixcInJvb3RcIjpcIlJlYWN0XCJ9XG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbGpzXCIsXCJjb21tb25qczJcIjpcInF1aWxsanNcIixcImFtZFwiOlwicXVpbGxqc1wiLFwicm9vdFwiOlwiUXVpbGxcIn1cbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiIuL2Rpc3QvcmVhY3QtcXVpbGwuanMifQ==