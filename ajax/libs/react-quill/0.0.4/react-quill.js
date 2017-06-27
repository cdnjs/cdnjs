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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2YzllZjhjNjc1ODAwNTI5ZDk3MSIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Rvb2xiYXIuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwiLFwicm9vdFwiOlwiUmVhY3RcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJxdWlsbFwiLFwiY29tbW9uanMyXCI6XCJxdWlsbFwiLFwiYW1kXCI6XCJxdWlsbFwiLFwicm9vdFwiOlwiUXVpbGxcIn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDTkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVG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Q0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxvQ0FBbUM7QUFDbkM7QUFDQTtBQUNBOztBQUVBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLDRDOzs7Ozs7Ozs7QUNsSUEsZ0Q7Ozs7Ozs7OztBQ0FBLGdEIiwiZmlsZSI6Ii4vZGlzdC9yZWFjdC1xdWlsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcInJlYWN0XCIpLCByZXF1aXJlKFwicXVpbGxcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wicmVhY3RcIiwgXCJxdWlsbFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJSZWFjdFF1aWxsXCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIiksIHJlcXVpcmUoXCJxdWlsbFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiUmVhY3RRdWlsbFwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdLCByb290W1wiUXVpbGxcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV80X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2YzllZjhjNjc1ODAwNTI5ZDk3MVxuICoqLyIsIi8qXG5SZWFjdC1RdWlsbCB2MC4wLjNcbmh0dHBzOi8vZ2l0aHViLmNvbS96ZW5vYW1hcm8vcmVhY3QtcXVpbGxcbiovXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tcG9uZW50Jyk7XG5tb2R1bGUuZXhwb3J0cy5NaXhpbiA9IHJlcXVpcmUoJy4vbWl4aW4nKTtcbm1vZHVsZS5leHBvcnRzLlRvb2xiYXIgPSByZXF1aXJlKCcuL3Rvb2xiYXInKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdFF1aWxsVG9vbGJhciA9IHJlcXVpcmUoJy4vdG9vbGJhcicpLFxuXHRRdWlsbE1peGluID0gcmVxdWlyZSgnLi9taXhpbicpLFxuXHRUID0gUmVhY3QuUHJvcFR5cGVzO1xuXG4vLyBTdXBwb3J0IFJlYWN0IDAuMTEgYW5kIDAuMTJcbi8vIEZJWE1FOiBSZW1vdmUgd2l0aCBSZWFjdCAwLjEzXG5pZiAoUmVhY3QuY3JlYXRlRmFjdG9yeSkge1xuXHRRdWlsbFRvb2xiYXIgPSBSZWFjdC5jcmVhdGVGYWN0b3J5KFF1aWxsVG9vbGJhcik7XG59XG5cbnZhciBRdWlsbENvbXBvbmVudCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcblxuXHRkaXNwbGF5TmFtZTogJ1F1aWxsJyxcblxuXHRtaXhpbnM6IFsgUXVpbGxNaXhpbiBdLFxuXG5cdHByb3BUeXBlczoge1xuXHRcdGlkOiAgICAgICAgICAgVC5zdHJpbmcsXG5cdFx0Y2xhc3NOYW1lOiAgICBULnN0cmluZyxcblx0XHR2YWx1ZTogICAgICAgIFQuc3RyaW5nLFxuXHRcdGRlZmF1bHRWYWx1ZTogVC5zdHJpbmcsXG5cdFx0cmVhZE9ubHk6ICAgICBULmJvb2wsXG5cdFx0dG9vbGJhcjogICAgICBULm9iamVjdCxcblx0XHRmb3JtYXRzOiAgICAgIFQuYXJyYXksXG5cdFx0c3R5bGVzOiAgICAgICBULm9iamVjdCxcblx0XHR0aGVtZTogICAgICAgIFQuc3RyaW5nLFxuXHRcdHBvbGxJbnRlcnZhbDogVC5udW1iZXIsXG5cdFx0b25DaGFuZ2U6ICAgICBULmZ1bmNcblx0fSxcblxuXHRnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjbGFzc05hbWU6ICcnLFxuXHRcdFx0dGhlbWU6ICdiYXNlJyxcblx0XHRcdG1vZHVsZXM6IHt9XG5cdFx0fTtcblx0fSxcblxuXHQvKlxuXHRSZXRyaWV2ZSB0aGUgaW5pdGlhbCB2YWx1ZSBmcm9tIGVpdGhlciBgdmFsdWVgIChwcmVmZXJyZWQpXG5cdG9yIGBkZWZhdWx0VmFsdWVgIGlmIHlvdSB3YW50IGFuIHVuLWNvbnRyb2xsZWQgY29tcG9uZW50LlxuXHQqL1xuXHRnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB7fTtcblx0fSxcblxuXHQvKlxuXHRVcGRhdGUgb25seSBpZiB3ZSd2ZSBiZWVuIHBhc3NlZCBhIG5ldyBgdmFsdWVgLlxuXHRUaGlzIGxlYXZlcyBjb21wb25lbnRzIHVzaW5nIGBkZWZhdWx0VmFsdWVgIGFsb25lLlxuXHQqL1xuXHRjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMpIHtcblx0XHRpZiAoJ3ZhbHVlJyBpbiBuZXh0UHJvcHMpIHtcblx0XHRcdGlmIChuZXh0UHJvcHMudmFsdWUgIT09IHRoaXMucHJvcHMudmFsdWUpIHtcblx0XHRcdFx0dGhpcy5zZXRFZGl0b3JDb250ZW50cyh0aGlzLnN0YXRlLmVkaXRvciwgbmV4dFByb3BzLnZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0Y29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBlZGl0b3IgPSB0aGlzLmNyZWF0ZUVkaXRvcihcblx0XHRcdHRoaXMuZ2V0RWRpdG9yRWxlbWVudCgpLFxuXHRcdFx0dGhpcy5nZXRFZGl0b3JDb25maWcoKSk7XG5cdFx0dGhpcy5zZXRTdGF0ZSh7IGVkaXRvcjplZGl0b3IgfSk7XG5cdH0sXG5cblx0Y29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuZGVzdHJveUVkaXRvcih0aGlzLnN0YXRlLmVkaXRvcik7XG5cdFx0Ly8gTk9URTogRG9uJ3Qgc2V0IHRoZSBzdGF0ZSB0byBudWxsIGhlcmVcblx0XHQvLyAgICAgICBhcyBpdCB3b3VsZCBnZW5lcmF0ZSBhIGxvb3AuXG5cdH0sXG5cblx0c2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSkge1xuXHRcdC8vIE5ldmVyIHJlLXJlbmRlciBvciB3ZSBsb3NlIHRoZSBlbGVtZW50LlxuXHRcdHJldHVybiBmYWxzZTtcblx0fSxcblxuXHQvKlxuXHRJZiBmb3Igd2hhdGV2ZXIgcmVhc29uIHdlIGFyZSByZW5kZXJpbmcgYWdhaW4sXG5cdHdlIHNob3VsZCB0ZWFyIGRvd24gdGhlIGVkaXRvciBhbmQgYnJpbmcgaXQgdXBcblx0YWdhaW4uXG5cdCovXG5cdGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuY29tcG9uZW50V2lsbFVubW91bnQoKTtcblx0fSxcblxuXHRjb21wb25lbnREaWRVcGRhdGU6IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMuY29tcG9uZW50RGlkTW91bnQoKTtcblx0fSxcblxuXHRnZXRFZGl0b3JDb25maWc6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBjb25maWcgPSB7XG5cdFx0XHRyZWFkT25seTogICAgIHRoaXMucHJvcHMucmVhZE9ubHksXG5cdFx0XHR0aGVtZTogICAgICAgIHRoaXMucHJvcHMudGhlbWUsXG5cdFx0XHRmb3JtYXRzOiAgICAgIHRoaXMucHJvcHMuZm9ybWF0cyxcblx0XHRcdHN0eWxlczogICAgICAgdGhpcy5wcm9wcy5zdHlsZXMsXG5cdFx0XHRtb2R1bGVzOiAgICAgIHRoaXMucHJvcHMubW9kdWxlcyxcblx0XHRcdHBvbGxJbnRlcnZhbDogdGhpcy5wcm9wcy5wb2xsSW50ZXJ2YWxcblx0XHR9O1xuXHRcdC8vIFVubGVzcyB3ZSdyZSByZWRlZmluaW5nIHRoZSB0b29sYmFyLFxuXHRcdC8vIGF0dGFjaCB0byB0aGUgZGVmYXVsdCBvbmUgYXMgYSByZWYuXG5cdFx0aWYgKCFjb25maWcubW9kdWxlcy50b29sYmFyKSB7XG5cdFx0XHQvLyBEb24ndCBtdXRhdGUgdGhlIG9yaWdpbmFsIG1vZHVsZXNcblx0XHRcdC8vIGJlY2F1c2UgaXQncyBzaGFyZWQgYmV0d2VlbiBjb21wb25lbnRzLlxuXHRcdFx0Y29uZmlnLm1vZHVsZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbmZpZy5tb2R1bGVzKSk7XG5cdFx0XHRjb25maWcubW9kdWxlcy50b29sYmFyID0ge1xuXHRcdFx0XHRjb250YWluZXI6IHRoaXMucmVmcy50b29sYmFyLmdldERPTU5vZGUoKVxuXHRcdFx0fTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbmZpZztcblx0fSxcblxuXHRnZXRFZGl0b3JFbGVtZW50OiBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gdGhpcy5yZWZzLmVkaXRvci5nZXRET01Ob2RlKCk7XG5cdH0sXG5cblx0Z2V0RWRpdG9yQ29udGVudHM6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiB0aGlzLnByb3BzLnZhbHVlIHx8IHRoaXMucHJvcHMuZGVmYXVsdFZhbHVlO1xuXHR9LFxuXG5cdGdldENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFsncXVpbGwnLCB0aGlzLnByb3BzLmNsYXNzTmFtZV0uam9pbignICcpO1xuXHR9LFxuXG5cdC8qXG5cdFJlbmRlcnMgZWl0aGVyIHRoZSBzcGVjaWZpZWQgY29udGVudHMsIG9yIGEgZGVmYXVsdFxuXHRjb25maWd1cmF0aW9uIG9mIHRvb2xiYXIgYW5kIGNvbnRlbnRzIGFyZWEuXG5cdCovXG5cdHJlbmRlckNvbnRlbnRzOiBmdW5jdGlvbigpIHtcblx0XHRpZiAoUmVhY3QuQ2hpbGRyZW4uY291bnQodGhpcy5wcm9wcy5jaGlsZHJlbikpIHtcblx0XHRcdHJldHVybiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRRdWlsbFRvb2xiYXIoe1xuXHRcdFx0XHRcdGtleTondG9vbGJhcicsXG5cdFx0XHRcdFx0cmVmOid0b29sYmFyJyxcblx0XHRcdFx0XHRpdGVtczogdGhpcy5wcm9wcy50b29sYmFyXG5cdFx0XHRcdH0pLFxuXHRcdFx0XHRSZWFjdC5ET00uZGl2KHtcblx0XHRcdFx0XHRrZXk6J2VkaXRvcicsXG5cdFx0XHRcdFx0cmVmOidlZGl0b3InLFxuXHRcdFx0XHRcdGNsYXNzTmFtZTogJ3F1aWxsLWNvbnRlbnRzJyxcblx0XHRcdFx0XHRkYW5nZXJvdXNseVNldElubmVySFRNTDogeyBfX2h0bWw6dGhpcy5nZXRFZGl0b3JDb250ZW50cygpIH1cblx0XHRcdFx0fSlcblx0XHRcdF07XG5cdFx0fVxuXHR9LFxuXG5cdHJlbmRlcjogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5kaXYoe1xuXHRcdFx0Y2xhc3NOYW1lOiB0aGlzLmdldENsYXNzTmFtZSgpLFxuXHRcdFx0b25DaGFuZ2U6IHRoaXMucHJldmVudERlZmF1bHQgfSxcblx0XHRcdHRoaXMucmVuZGVyQ29udGVudHMoKVxuXHRcdCk7XG5cdH0sXG5cblx0Lypcblx0VXBkYXRlcyB0aGUgbG9jYWwgc3RhdGUgd2l0aCB0aGUgbmV3IGNvbnRlbnRzLFxuXHRleGVjdXRlcyB0aGUgY2hhbmdlIGhhbmRsZXIgcGFzc2VkIGFzIHByb3BzLlxuXHQqL1xuXHRvbkVkaXRvckNoYW5nZTogZnVuY3Rpb24odmFsdWUpIHtcblx0XHRpZiAodmFsdWUgIT09IHRoaXMuc3RhdGUudmFsdWUpIHtcblx0XHRcdGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlKSB7XG5cdFx0XHRcdHRoaXMucHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHQvKlxuXHRTdG9wIGNoYW5nZSBldmVudHMgZnJvbSB0aGUgdG9vbGJhciBmcm9tXG5cdGJ1YmJsaW5nIHVwIG91dHNpZGUuXG5cdCovXG5cdHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbihldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxDb21wb25lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jb21wb25lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JyksXG5cdFF1aWxsID0gcmVxdWlyZSgncXVpbGwnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIFF1aWxsTWl4aW4gPSB7XG5cblx0LyoqXG5cdENyZWF0ZXMgYW4gZWRpdG9yIG9uIHRoZSBnaXZlbiBlbGVtZW50LiBUaGUgZWRpdG9yIHdpbGxcblx0YmUgcGFzc2VkIHRoZSBjb25maWd1cmF0aW9uLCBoYXZlIGl0cyBldmVudHMgYm91bmQsXG5cdCovXG5cdGNyZWF0ZUVkaXRvcjogZnVuY3Rpb24oJGVsLCBjb25maWcpIHtcblx0XHR2YXIgZWRpdG9yID0gbmV3IFF1aWxsKCRlbCwgY29uZmlnKTtcblx0XHR0aGlzLmhvb2tFZGl0b3IoZWRpdG9yKTtcblx0XHRyZXR1cm4gZWRpdG9yO1xuXHR9LFxuXG5cdGhvb2tFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvcikge1xuXHRcdHZhciBzZWxmID0gdGhpcztcblx0XHRlZGl0b3Iub24oJ3RleHQtY2hhbmdlJywgZnVuY3Rpb24oZGVsdGEsIHNvdXJjZSkge1xuXHRcdFx0aWYgKHNlbGYub25FZGl0b3JDaGFuZ2UpIHtcblx0XHRcdFx0c2VsZi5vbkVkaXRvckNoYW5nZShlZGl0b3IuZ2V0SFRNTCgpLCBkZWx0YSwgc291cmNlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fSxcblxuXHR1cGRhdGVFZGl0b3I6IGZ1bmN0aW9uKGVkaXRvciwgY29uZmlnKSB7XG5cdFx0Ly8gTk9URTogVGhpcyB0ZWFycyB0aGUgZWRpdG9yIGRvd24sIGFuZCByZWluaXRpYWxpemVzXG5cdFx0Ly8gICAgICAgaXQgd2l0aCB0aGUgbmV3IGNvbmZpZy4gVWdseSBidXQgbmVjZXNzYXJ5XG5cdFx0Ly8gICAgICAgYXMgdGhlcmUgaXMgbm8gYXBpIGZvciB1cGRhdGluZyBpdC5cblx0XHR0aGlzLmRlc3Ryb3lFZGl0b3IoZWRpdG9yKTtcblx0XHR0aGlzLmNyZWF0ZUVkaXRvcihjb25maWcpO1xuXHRcdHJldHVybiBlZGl0b3I7XG5cdH0sXG5cblx0ZGVzdHJveUVkaXRvcjogZnVuY3Rpb24oZWRpdG9yKSB7XG5cdFx0ZWRpdG9yLmRlc3Ryb3koKTtcblx0fSxcblxuXHQvKlxuXHRSZXBsYWNlIHRoZSBjb250ZW50cyBvZiB0aGUgZWRpdG9yLCBidXQga2VlcFxuXHR0aGUgcHJldmlvdXMgc2VsZWN0aW9uIGhhbmdpbmcgYXJvdW5kIHNvIHRoYXRcblx0dGhlIGN1cnNvciB3b24ndCBtb3ZlLlxuXHQqL1xuXHRzZXRFZGl0b3JDb250ZW50czogZnVuY3Rpb24oZWRpdG9yLCB2YWx1ZSkge1xuXHRcdHZhciBzZWwgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0ZWRpdG9yLnNldEhUTUwodmFsdWUpO1xuXHRcdGVkaXRvci5zZXRTZWxlY3Rpb24oc2VsKTtcblx0fVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFF1aWxsTWl4aW47XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9taXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKSxcblx0VCA9IFJlYWN0LlByb3BUeXBlcztcblxudmFyIGRlZmF1bHRDb2xvcnMgPSBbXG5cdCdyZ2IoICAwLCAgIDAsICAgMCknLCAncmdiKDIzMCwgICAwLCAgIDApJywgJ3JnYigyNTUsIDE1MywgICAwKScsXG5cdCdyZ2IoMjU1LCAyNTUsICAgMCknLCAncmdiKCAgMCwgMTM4LCAgIDApJywgJ3JnYiggIDAsIDEwMiwgMjA0KScsXG5cdCdyZ2IoMTUzLCAgNTEsIDI1NSknLCAncmdiKDI1NSwgMjU1LCAyNTUpJywgJ3JnYigyNTAsIDIwNCwgMjA0KScsXG5cdCdyZ2IoMjU1LCAyMzUsIDIwNCknLCAncmdiKDI1NSwgMjU1LCAyMDQpJywgJ3JnYigyMDQsIDIzMiwgMjA0KScsXG5cdCdyZ2IoMjA0LCAyMjQsIDI0NSknLCAncmdiKDIzNSwgMjE0LCAyNTUpJywgJ3JnYigxODcsIDE4NywgMTg3KScsXG5cdCdyZ2IoMjQwLCAxMDIsIDEwMiknLCAncmdiKDI1NSwgMTk0LCAxMDIpJywgJ3JnYigyNTUsIDI1NSwgMTAyKScsXG5cdCdyZ2IoMTAyLCAxODUsIDEwMiknLCAncmdiKDEwMiwgMTYzLCAyMjQpJywgJ3JnYigxOTQsIDEzMywgMjU1KScsXG5cdCdyZ2IoMTM2LCAxMzYsIDEzNiknLCAncmdiKDE2MSwgICAwLCAgIDApJywgJ3JnYigxNzgsIDEwNywgICAwKScsXG5cdCdyZ2IoMTc4LCAxNzgsICAgMCknLCAncmdiKCAgMCwgIDk3LCAgIDApJywgJ3JnYiggIDAsICA3MSwgMTc4KScsXG5cdCdyZ2IoMTA3LCAgMzYsIDE3OCknLCAncmdiKCA2OCwgIDY4LCAgNjgpJywgJ3JnYiggOTIsICAgMCwgICAwKScsXG5cdCdyZ2IoMTAyLCAgNjEsICAgMCknLCAncmdiKDEwMiwgMTAyLCAgIDApJywgJ3JnYiggIDAsICA1NSwgICAwKScsXG5cdCdyZ2IoICAwLCAgNDEsIDEwMiknLCAncmdiKCA2MSwgIDIwLCAgMTApJyxcbl0ubWFwKGZ1bmN0aW9uKGNvbG9yKXsgcmV0dXJuIHsgdmFsdWU6IGNvbG9yIH0gfSk7XG5cbnZhciBkZWZhdWx0SXRlbXMgPSBbXG5cblx0eyBsYWJlbDonRm9ybWF0cycsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IGxhYmVsOidTaXplJywgdHlwZTonc2l6ZScsIGl0ZW1zOiBbXG5cdFx0XHR7IGxhYmVsOidOb3JtYWwnLCB2YWx1ZTonJyB9LFxuXHRcdFx0eyBsYWJlbDonU21hbGxlcicsIHZhbHVlOicwLjhlbScgfSxcblx0XHRcdHsgbGFiZWw6J0xhcmdlcicsIHZhbHVlOicxLjRlbScgfSxcblx0XHRcdHsgbGFiZWw6J0h1Z2UnLCB2YWx1ZTonMmVtJyB9XG5cdFx0XX0sXG5cdFx0eyBsYWJlbDonQWxpZ25tZW50JywgdHlwZTonYWxpZ24nLCBpdGVtczogW1xuXHRcdFx0eyBsYWJlbDonQ2VudGVyJywgdmFsdWU6J2NlbnRlcicgfSxcblx0XHRcdHsgbGFiZWw6J0xlZnQnLCB2YWx1ZTonbGVmdCcgfSxcblx0XHRcdHsgbGFiZWw6J1JpZ2h0JywgdmFsdWU6J3JpZ2h0JyB9LFxuXHRcdFx0eyBsYWJlbDonSnVzdGlmeScsIHZhbHVlOidqdXN0aWZ5JyB9XG5cdFx0XX1cblx0XX0sXG5cblx0eyBsYWJlbDonVGV4dCcsIHR5cGU6J2dyb3VwJywgaXRlbXM6IFtcblx0XHR7IHR5cGU6J2JvbGQnLCBsYWJlbDonQm9sZCcgfSxcblx0XHR7IHR5cGU6J2l0YWxpYycsIGxhYmVsOidJdGFsaWMnIH0sXG5cdFx0eyB0eXBlOidzdHJpa2UnLCBsYWJlbDonU3RyaWtlJyB9LFxuXHRcdHsgdHlwZTondW5kZXJsaW5lJywgbGFiZWw6J1VuZGVybGluZScgfSxcblx0XHR7IHR5cGU6J2xpbmsnLCBsYWJlbDonTGluaycgfSxcblx0XHR7IHR5cGU6J2NvbG9yJywgbGFiZWw6J0NvbG9yJywgaXRlbXM6ZGVmYXVsdENvbG9ycyB9LFxuXHRdfSxcblxuXHR7IGxhYmVsOidCbG9ja3MnLCB0eXBlOidncm91cCcsIGl0ZW1zOiBbXG5cdFx0eyB0eXBlOididWxsZXQnLCBsYWJlbDonQnVsbGV0JyB9LFxuXHRcdHsgdHlwZTonbGlzdCcsIGxhYmVsOidMaXN0JyB9XG5cdF19XG5cbl07XG5cbnZhciBRdWlsbFRvb2xiYXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cblx0ZGlzcGxheU5hbWU6ICdRdWlsbCBUb29sYmFyJyxcblxuXHRwcm9wVHlwZXM6IHtcblx0XHRpZDogICAgICAgIFQuc3RyaW5nLFxuXHRcdGNsYXNzTmFtZTogVC5zdHJpbmcsXG5cdFx0aXRlbXM6ICAgICBULmFycmF5XG5cdH0sXG5cblx0Z2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRpdGVtczogZGVmYXVsdEl0ZW1zXG5cdFx0fTtcblx0fSxcblxuXHRyZW5kZXJHcm91cDogZnVuY3Rpb24oaXRlbSkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uc3Bhbih7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwsXG5cdFx0XHRjbGFzc05hbWU6J3FsLWZvcm1hdC1ncm91cCcgfSxcblx0XHRcdGl0ZW0uaXRlbXMubWFwKHRoaXMucmVuZGVySXRlbSlcblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckNob2ljZUl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLm9wdGlvbih7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwgfHwgaXRlbS52YWx1ZSxcblx0XHRcdHZhbHVlOml0ZW0udmFsdWUgfSxcblx0XHRcdGl0ZW0ubGFiZWxcblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckNob2ljZXM6IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRyZXR1cm4gUmVhY3QuRE9NLnNlbGVjdCh7XG5cdFx0XHRrZXk6IGl0ZW0ubGFiZWwsXG5cdFx0XHRjbGFzc05hbWU6ICdxbC0nK2l0ZW0udHlwZSB9LFxuXHRcdFx0aXRlbS5pdGVtcy5tYXAodGhpcy5yZW5kZXJDaG9pY2VJdGVtKVxuXHRcdCk7XG5cdH0sXG5cblx0cmVuZGVyQWN0aW9uOiBmdW5jdGlvbihpdGVtKSB7XG5cdFx0cmV0dXJuIFJlYWN0LkRPTS5zcGFuKHtcblx0XHRcdGtleTogaXRlbS5sYWJlbCB8fCBpdGVtLnZhbHVlLFxuXHRcdFx0Y2xhc3NOYW1lOiAncWwtZm9ybWF0LWJ1dHRvbiBxbC0nK2l0ZW0udHlwZSxcblx0XHRcdHRpdGxlOiBpdGVtLmxhYmVsIH1cblx0XHQpO1xuXHR9LFxuXG5cdHJlbmRlckl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcblx0XHRzd2l0Y2ggKGl0ZW0udHlwZSkge1xuXHRcdFx0Y2FzZSAnZ3JvdXAnOlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJHcm91cChpdGVtKTtcblx0XHRcdGNhc2UgJ2FsaWduJzpcblx0XHRcdGNhc2UgJ3NpemUnOlxuXHRcdFx0Y2FzZSAnY29sb3InOlxuXHRcdFx0Y2FzZSAnYmFja2dyb3VuZCc6XG5cdFx0XHRcdHJldHVybiB0aGlzLnJlbmRlckNob2ljZXMoaXRlbSk7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gdGhpcy5yZW5kZXJBY3Rpb24oaXRlbSk7XG5cdFx0fVxuXHR9LFxuXG5cdGdldENsYXNzTmFtZTogZnVuY3Rpb24oKSB7XG5cdFx0cmV0dXJuICdxdWlsbC10b29sYmFyICcgKyAodGhpcy5wcm9wcy5jbGFzc05hbWV8fCcnKTtcblx0fSxcblxuXHRyZW5kZXI6IGZ1bmN0aW9uKCkge1xuXHRcdHJldHVybiBSZWFjdC5ET00uZGl2KHtcblx0XHRcdGNsYXNzTmFtZTogdGhpcy5nZXRDbGFzc05hbWUoKSB9LFxuXHRcdFx0dGhpcy5wcm9wcy5pdGVtcy5tYXAodGhpcy5yZW5kZXJJdGVtKVxuXHRcdCk7XG5cdH1cblxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUXVpbGxUb29sYmFyO1xuUXVpbGxUb29sYmFyLmRlZmF1bHRJdGVtcyA9IGRlZmF1bHRJdGVtcztcblF1aWxsVG9vbGJhci5kZWZhdWx0Q29sb3JzID0gZGVmYXVsdENvbG9ycztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3Rvb2xiYXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfNF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInJlYWN0XCIsXCJjb21tb25qczJcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCIsXCJyb290XCI6XCJSZWFjdFwifVxuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwicXVpbGxcIixcImNvbW1vbmpzMlwiOlwicXVpbGxcIixcImFtZFwiOlwicXVpbGxcIixcInJvb3RcIjpcIlF1aWxsXCJ9XG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==