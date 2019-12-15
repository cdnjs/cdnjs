(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mermaid"] = factory();
	else
		root["mermaid"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/mermaid.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/dark/index.scss":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/themes/dark/index.scss ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Flowchart variables */\n/* Sequence Diagram variables */\n/* Gantt chart variables */\n.label {\n  font-family: 'trebuchet ms', verdana, arial;\n  color: #333; }\n\n.node rect,\n.node circle,\n.node ellipse,\n.node polygon {\n  fill: #BDD5EA;\n  stroke: purple;\n  stroke-width: 1px; }\n\n.node.clickable {\n  cursor: pointer; }\n\n.arrowheadPath {\n  fill: lightgrey; }\n\n.edgePath .path {\n  stroke: lightgrey;\n  stroke-width: 1.5px; }\n\n.edgeLabel {\n  background-color: #e8e8e8; }\n\n.cluster rect {\n  fill: #6D6D65 !important;\n  stroke: rgba(255, 255, 255, 0.25) !important;\n  stroke-width: 1px !important; }\n\n.cluster text {\n  fill: #F9FFFE; }\n\ndiv.mermaidTooltip {\n  position: absolute;\n  text-align: center;\n  max-width: 200px;\n  padding: 2px;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 12px;\n  background: #6D6D65;\n  border: 1px solid rgba(255, 255, 255, 0.25);\n  border-radius: 2px;\n  pointer-events: none;\n  z-index: 100; }\n\n.actor {\n  stroke: #81B1DB;\n  fill: #BDD5EA; }\n\ntext.actor {\n  fill: black;\n  stroke: none; }\n\n.actor-line {\n  stroke: lightgrey; }\n\n.messageLine0 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: lightgrey; }\n\n.messageLine1 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  stroke: lightgrey; }\n\n#arrowhead {\n  fill: lightgrey; }\n\n#crosshead path {\n  fill: lightgrey !important;\n  stroke: lightgrey !important; }\n\n.messageText {\n  fill: lightgrey;\n  stroke: none; }\n\n.labelBox {\n  stroke: #81B1DB;\n  fill: #BDD5EA; }\n\n.labelText {\n  fill: lightgrey;\n  stroke: none; }\n\n.loopText {\n  fill: lightgrey;\n  stroke: none; }\n\n.loopLine {\n  stroke-width: 2;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #81B1DB; }\n\n.note {\n  stroke: rgba(255, 255, 255, 0.25);\n  fill: #fff5ad; }\n\n.noteText {\n  fill: black;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 14px; }\n\n/** Section styling */\n.section {\n  stroke: none;\n  opacity: 0.2; }\n\n.section0 {\n  fill: rgba(255, 255, 255, 0.3); }\n\n.section2 {\n  fill: #EAE8B9; }\n\n.section1,\n.section3 {\n  fill: white;\n  opacity: 0.2; }\n\n.sectionTitle0 {\n  fill: #F9FFFE; }\n\n.sectionTitle1 {\n  fill: #F9FFFE; }\n\n.sectionTitle2 {\n  fill: #F9FFFE; }\n\n.sectionTitle3 {\n  fill: #F9FFFE; }\n\n.sectionTitle {\n  text-anchor: start;\n  font-size: 11px;\n  text-height: 14px; }\n\n/* Grid and axis */\n.grid .tick {\n  stroke: lightgrey;\n  opacity: 0.3;\n  shape-rendering: crispEdges; }\n\n.grid path {\n  stroke-width: 0; }\n\n/* Today line */\n.today {\n  fill: none;\n  stroke: #DB5757;\n  stroke-width: 2px; }\n\n/* Task styling */\n/* Default task */\n.task {\n  stroke-width: 2; }\n\n.taskText {\n  text-anchor: middle;\n  font-size: 11px; }\n\n.taskTextOutsideRight {\n  fill: #323D47;\n  text-anchor: start;\n  font-size: 11px; }\n\n.taskTextOutsideLeft {\n  fill: #323D47;\n  text-anchor: end;\n  font-size: 11px; }\n\n/* Specific task settings for the sections*/\n.taskText0,\n.taskText1,\n.taskText2,\n.taskText3 {\n  fill: #323D47; }\n\n.task0,\n.task1,\n.task2,\n.task3 {\n  fill: #BDD5EA;\n  stroke: rgba(255, 255, 255, 0.5); }\n\n.taskTextOutside0,\n.taskTextOutside2 {\n  fill: lightgrey; }\n\n.taskTextOutside1,\n.taskTextOutside3 {\n  fill: lightgrey; }\n\n/* Active task */\n.active0,\n.active1,\n.active2,\n.active3 {\n  fill: #81B1DB;\n  stroke: rgba(255, 255, 255, 0.5); }\n\n.activeText0,\n.activeText1,\n.activeText2,\n.activeText3 {\n  fill: #323D47 !important; }\n\n/* Completed task */\n.done0,\n.done1,\n.done2,\n.done3 {\n  stroke: grey;\n  fill: lightgrey;\n  stroke-width: 2; }\n\n.doneText0,\n.doneText1,\n.doneText2,\n.doneText3 {\n  fill: #323D47 !important; }\n\n/* Tasks on the critical line */\n.crit0,\n.crit1,\n.crit2,\n.crit3 {\n  stroke: #E83737;\n  fill: #E83737;\n  stroke-width: 2; }\n\n.activeCrit0,\n.activeCrit1,\n.activeCrit2,\n.activeCrit3 {\n  stroke: #E83737;\n  fill: #81B1DB;\n  stroke-width: 2; }\n\n.doneCrit0,\n.doneCrit1,\n.doneCrit2,\n.doneCrit3 {\n  stroke: #E83737;\n  fill: lightgrey;\n  stroke-width: 2;\n  cursor: pointer;\n  shape-rendering: crispEdges; }\n\n.doneCritText0,\n.doneCritText1,\n.doneCritText2,\n.doneCritText3 {\n  fill: #323D47 !important; }\n\n.activeCritText0,\n.activeCritText1,\n.activeCritText2,\n.activeCritText3 {\n  fill: #323D47 !important; }\n\n.titleText {\n  text-anchor: middle;\n  font-size: 18px;\n  fill: #323D47; }\n\ng.classGroup text {\n  fill: purple;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 10px; }\n\ng.classGroup rect {\n  fill: #BDD5EA;\n  stroke: purple; }\n\ng.classGroup line {\n  stroke: purple;\n  stroke-width: 1; }\n\n.classLabel .box {\n  stroke: none;\n  stroke-width: 0;\n  fill: #BDD5EA;\n  opacity: 0.5; }\n\n.classLabel .label {\n  fill: purple;\n  font-size: 10px; }\n\n.relation {\n  stroke: purple;\n  stroke-width: 1;\n  fill: none; }\n\n#compositionStart {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n#compositionEnd {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n#aggregationStart {\n  fill: #BDD5EA;\n  stroke: purple;\n  stroke-width: 1; }\n\n#aggregationEnd {\n  fill: #BDD5EA;\n  stroke: purple;\n  stroke-width: 1; }\n\n#dependencyStart {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n#dependencyEnd {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n#extensionStart {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n#extensionEnd {\n  fill: purple;\n  stroke: purple;\n  stroke-width: 1; }\n\n.commit-id,\n.commit-msg,\n.branch-label {\n  fill: lightgrey;\n  color: lightgrey; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/default/index.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/themes/default/index.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Flowchart variables */\n/* Sequence Diagram variables */\n/* Gantt chart variables */\n.label {\n  font-family: 'trebuchet ms', verdana, arial;\n  color: #333; }\n\n.node rect,\n.node circle,\n.node ellipse,\n.node polygon {\n  fill: #ECECFF;\n  stroke: #9370DB;\n  stroke-width: 1px; }\n\n.node.clickable {\n  cursor: pointer; }\n\n.arrowheadPath {\n  fill: #333333; }\n\n.edgePath .path {\n  stroke: #333333;\n  stroke-width: 1.5px; }\n\n.edgeLabel {\n  background-color: #e8e8e8; }\n\n.cluster rect {\n  fill: #ffffde !important;\n  stroke: #aaaa33 !important;\n  stroke-width: 1px !important; }\n\n.cluster text {\n  fill: #333; }\n\ndiv.mermaidTooltip {\n  position: absolute;\n  text-align: center;\n  max-width: 200px;\n  padding: 2px;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 12px;\n  background: #ffffde;\n  border: 1px solid #aaaa33;\n  border-radius: 2px;\n  pointer-events: none;\n  z-index: 100; }\n\n.actor {\n  stroke: #CCCCFF;\n  fill: #ECECFF; }\n\ntext.actor {\n  fill: black;\n  stroke: none; }\n\n.actor-line {\n  stroke: grey; }\n\n.messageLine0 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #333; }\n\n.messageLine1 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  stroke: #333; }\n\n#arrowhead {\n  fill: #333; }\n\n#crosshead path {\n  fill: #333 !important;\n  stroke: #333 !important; }\n\n.messageText {\n  fill: #333;\n  stroke: none; }\n\n.labelBox {\n  stroke: #CCCCFF;\n  fill: #ECECFF; }\n\n.labelText {\n  fill: black;\n  stroke: none; }\n\n.loopText {\n  fill: black;\n  stroke: none; }\n\n.loopLine {\n  stroke-width: 2;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #CCCCFF; }\n\n.note {\n  stroke: #aaaa33;\n  fill: #fff5ad; }\n\n.noteText {\n  fill: black;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 14px; }\n\n/** Section styling */\n.section {\n  stroke: none;\n  opacity: 0.2; }\n\n.section0 {\n  fill: rgba(102, 102, 255, 0.49); }\n\n.section2 {\n  fill: #fff400; }\n\n.section1,\n.section3 {\n  fill: white;\n  opacity: 0.2; }\n\n.sectionTitle0 {\n  fill: #333; }\n\n.sectionTitle1 {\n  fill: #333; }\n\n.sectionTitle2 {\n  fill: #333; }\n\n.sectionTitle3 {\n  fill: #333; }\n\n.sectionTitle {\n  text-anchor: start;\n  font-size: 11px;\n  text-height: 14px; }\n\n/* Grid and axis */\n.grid .tick {\n  stroke: lightgrey;\n  opacity: 0.3;\n  shape-rendering: crispEdges; }\n\n.grid path {\n  stroke-width: 0; }\n\n/* Today line */\n.today {\n  fill: none;\n  stroke: red;\n  stroke-width: 2px; }\n\n/* Task styling */\n/* Default task */\n.task {\n  stroke-width: 2; }\n\n.taskText {\n  text-anchor: middle;\n  font-size: 11px; }\n\n.taskTextOutsideRight {\n  fill: black;\n  text-anchor: start;\n  font-size: 11px; }\n\n.taskTextOutsideLeft {\n  fill: black;\n  text-anchor: end;\n  font-size: 11px; }\n\n/* Specific task settings for the sections*/\n.taskText0,\n.taskText1,\n.taskText2,\n.taskText3 {\n  fill: white; }\n\n.task0,\n.task1,\n.task2,\n.task3 {\n  fill: #8a90dd;\n  stroke: #534fbc; }\n\n.taskTextOutside0,\n.taskTextOutside2 {\n  fill: black; }\n\n.taskTextOutside1,\n.taskTextOutside3 {\n  fill: black; }\n\n/* Active task */\n.active0,\n.active1,\n.active2,\n.active3 {\n  fill: #bfc7ff;\n  stroke: #534fbc; }\n\n.activeText0,\n.activeText1,\n.activeText2,\n.activeText3 {\n  fill: black !important; }\n\n/* Completed task */\n.done0,\n.done1,\n.done2,\n.done3 {\n  stroke: grey;\n  fill: lightgrey;\n  stroke-width: 2; }\n\n.doneText0,\n.doneText1,\n.doneText2,\n.doneText3 {\n  fill: black !important; }\n\n/* Tasks on the critical line */\n.crit0,\n.crit1,\n.crit2,\n.crit3 {\n  stroke: #ff8888;\n  fill: red;\n  stroke-width: 2; }\n\n.activeCrit0,\n.activeCrit1,\n.activeCrit2,\n.activeCrit3 {\n  stroke: #ff8888;\n  fill: #bfc7ff;\n  stroke-width: 2; }\n\n.doneCrit0,\n.doneCrit1,\n.doneCrit2,\n.doneCrit3 {\n  stroke: #ff8888;\n  fill: lightgrey;\n  stroke-width: 2;\n  cursor: pointer;\n  shape-rendering: crispEdges; }\n\n.doneCritText0,\n.doneCritText1,\n.doneCritText2,\n.doneCritText3 {\n  fill: black !important; }\n\n.activeCritText0,\n.activeCritText1,\n.activeCritText2,\n.activeCritText3 {\n  fill: black !important; }\n\n.titleText {\n  text-anchor: middle;\n  font-size: 18px;\n  fill: black; }\n\ng.classGroup text {\n  fill: #9370DB;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 10px; }\n\ng.classGroup rect {\n  fill: #ECECFF;\n  stroke: #9370DB; }\n\ng.classGroup line {\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n.classLabel .box {\n  stroke: none;\n  stroke-width: 0;\n  fill: #ECECFF;\n  opacity: 0.5; }\n\n.classLabel .label {\n  fill: #9370DB;\n  font-size: 10px; }\n\n.relation {\n  stroke: #9370DB;\n  stroke-width: 1;\n  fill: none; }\n\n#compositionStart {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#compositionEnd {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#aggregationStart {\n  fill: #ECECFF;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#aggregationEnd {\n  fill: #ECECFF;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#dependencyStart {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#dependencyEnd {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#extensionStart {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n#extensionEnd {\n  fill: #9370DB;\n  stroke: #9370DB;\n  stroke-width: 1; }\n\n.commit-id,\n.commit-msg,\n.branch-label {\n  fill: lightgrey;\n  color: lightgrey; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/forest/index.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/themes/forest/index.scss ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Flowchart variables */\n/* Sequence Diagram variables */\n/* Gantt chart variables */\n.label {\n  font-family: 'trebuchet ms', verdana, arial;\n  color: #333; }\n\n.node rect,\n.node circle,\n.node ellipse,\n.node polygon {\n  fill: #cde498;\n  stroke: #13540c;\n  stroke-width: 1px; }\n\n.node.clickable {\n  cursor: pointer; }\n\n.arrowheadPath {\n  fill: green; }\n\n.edgePath .path {\n  stroke: green;\n  stroke-width: 1.5px; }\n\n.edgeLabel {\n  background-color: #e8e8e8; }\n\n.cluster rect {\n  fill: #cdffb2 !important;\n  stroke: #6eaa49 !important;\n  stroke-width: 1px !important; }\n\n.cluster text {\n  fill: #333; }\n\ndiv.mermaidTooltip {\n  position: absolute;\n  text-align: center;\n  max-width: 200px;\n  padding: 2px;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 12px;\n  background: #cdffb2;\n  border: 1px solid #6eaa49;\n  border-radius: 2px;\n  pointer-events: none;\n  z-index: 100; }\n\n.actor {\n  stroke: #13540c;\n  fill: #cde498; }\n\ntext.actor {\n  fill: black;\n  stroke: none; }\n\n.actor-line {\n  stroke: grey; }\n\n.messageLine0 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #333; }\n\n.messageLine1 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  stroke: #333; }\n\n#arrowhead {\n  fill: #333; }\n\n#crosshead path {\n  fill: #333 !important;\n  stroke: #333 !important; }\n\n.messageText {\n  fill: #333;\n  stroke: none; }\n\n.labelBox {\n  stroke: #326932;\n  fill: #cde498; }\n\n.labelText {\n  fill: black;\n  stroke: none; }\n\n.loopText {\n  fill: black;\n  stroke: none; }\n\n.loopLine {\n  stroke-width: 2;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #326932; }\n\n.note {\n  stroke: #6eaa49;\n  fill: #fff5ad; }\n\n.noteText {\n  fill: black;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 14px; }\n\n/** Section styling */\n.section {\n  stroke: none;\n  opacity: 0.2; }\n\n.section0 {\n  fill: #6eaa49; }\n\n.section2 {\n  fill: #6eaa49; }\n\n.section1,\n.section3 {\n  fill: white;\n  opacity: 0.2; }\n\n.sectionTitle0 {\n  fill: #333; }\n\n.sectionTitle1 {\n  fill: #333; }\n\n.sectionTitle2 {\n  fill: #333; }\n\n.sectionTitle3 {\n  fill: #333; }\n\n.sectionTitle {\n  text-anchor: start;\n  font-size: 11px;\n  text-height: 14px; }\n\n/* Grid and axis */\n.grid .tick {\n  stroke: lightgrey;\n  opacity: 0.3;\n  shape-rendering: crispEdges; }\n\n.grid path {\n  stroke-width: 0; }\n\n/* Today line */\n.today {\n  fill: none;\n  stroke: red;\n  stroke-width: 2px; }\n\n/* Task styling */\n/* Default task */\n.task {\n  stroke-width: 2; }\n\n.taskText {\n  text-anchor: middle;\n  font-size: 11px; }\n\n.taskTextOutsideRight {\n  fill: black;\n  text-anchor: start;\n  font-size: 11px; }\n\n.taskTextOutsideLeft {\n  fill: black;\n  text-anchor: end;\n  font-size: 11px; }\n\n/* Specific task settings for the sections*/\n.taskText0,\n.taskText1,\n.taskText2,\n.taskText3 {\n  fill: white; }\n\n.task0,\n.task1,\n.task2,\n.task3 {\n  fill: #487e3a;\n  stroke: #13540c; }\n\n.taskTextOutside0,\n.taskTextOutside2 {\n  fill: black; }\n\n.taskTextOutside1,\n.taskTextOutside3 {\n  fill: black; }\n\n/* Active task */\n.active0,\n.active1,\n.active2,\n.active3 {\n  fill: #cde498;\n  stroke: #13540c; }\n\n.activeText0,\n.activeText1,\n.activeText2,\n.activeText3 {\n  fill: black !important; }\n\n/* Completed task */\n.done0,\n.done1,\n.done2,\n.done3 {\n  stroke: grey;\n  fill: lightgrey;\n  stroke-width: 2; }\n\n.doneText0,\n.doneText1,\n.doneText2,\n.doneText3 {\n  fill: black !important; }\n\n/* Tasks on the critical line */\n.crit0,\n.crit1,\n.crit2,\n.crit3 {\n  stroke: #ff8888;\n  fill: red;\n  stroke-width: 2; }\n\n.activeCrit0,\n.activeCrit1,\n.activeCrit2,\n.activeCrit3 {\n  stroke: #ff8888;\n  fill: #cde498;\n  stroke-width: 2; }\n\n.doneCrit0,\n.doneCrit1,\n.doneCrit2,\n.doneCrit3 {\n  stroke: #ff8888;\n  fill: lightgrey;\n  stroke-width: 2;\n  cursor: pointer;\n  shape-rendering: crispEdges; }\n\n.doneCritText0,\n.doneCritText1,\n.doneCritText2,\n.doneCritText3 {\n  fill: black !important; }\n\n.activeCritText0,\n.activeCritText1,\n.activeCritText2,\n.activeCritText3 {\n  fill: black !important; }\n\n.titleText {\n  text-anchor: middle;\n  font-size: 18px;\n  fill: black; }\n\ng.classGroup text {\n  fill: #13540c;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 10px; }\n\ng.classGroup rect {\n  fill: #cde498;\n  stroke: #13540c; }\n\ng.classGroup line {\n  stroke: #13540c;\n  stroke-width: 1; }\n\n.classLabel .box {\n  stroke: none;\n  stroke-width: 0;\n  fill: #cde498;\n  opacity: 0.5; }\n\n.classLabel .label {\n  fill: #13540c;\n  font-size: 10px; }\n\n.relation {\n  stroke: #13540c;\n  stroke-width: 1;\n  fill: none; }\n\n#compositionStart {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#compositionEnd {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#aggregationStart {\n  fill: #cde498;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#aggregationEnd {\n  fill: #cde498;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#dependencyStart {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#dependencyEnd {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#extensionStart {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n#extensionEnd {\n  fill: #13540c;\n  stroke: #13540c;\n  stroke-width: 1; }\n\n.commit-id,\n.commit-msg,\n.branch-label {\n  fill: lightgrey;\n  color: lightgrey; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/neutral/index.scss":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/sass-loader/lib/loader.js!./src/themes/neutral/index.scss ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Flowchart variables */\n/* Sequence Diagram variables */\n/* Gantt chart variables */\n.label {\n  font-family: 'trebuchet ms', verdana, arial;\n  color: #333; }\n\n.node rect,\n.node circle,\n.node ellipse,\n.node polygon {\n  fill: #eee;\n  stroke: #999;\n  stroke-width: 1px; }\n\n.node.clickable {\n  cursor: pointer; }\n\n.arrowheadPath {\n  fill: #333333; }\n\n.edgePath .path {\n  stroke: #666;\n  stroke-width: 1.5px; }\n\n.edgeLabel {\n  background-color: white; }\n\n.cluster rect {\n  fill: #eaf2fb !important;\n  stroke: #26a !important;\n  stroke-width: 1px !important; }\n\n.cluster text {\n  fill: #333; }\n\ndiv.mermaidTooltip {\n  position: absolute;\n  text-align: center;\n  max-width: 200px;\n  padding: 2px;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 12px;\n  background: #eaf2fb;\n  border: 1px solid #26a;\n  border-radius: 2px;\n  pointer-events: none;\n  z-index: 100; }\n\n.actor {\n  stroke: #999;\n  fill: #eee; }\n\ntext.actor {\n  fill: #333;\n  stroke: none; }\n\n.actor-line {\n  stroke: #666; }\n\n.messageLine0 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #333; }\n\n.messageLine1 {\n  stroke-width: 1.5;\n  stroke-dasharray: '2 2';\n  stroke: #333; }\n\n#arrowhead {\n  fill: #333; }\n\n#crosshead path {\n  fill: #333 !important;\n  stroke: #333 !important; }\n\n.messageText {\n  fill: #333;\n  stroke: none; }\n\n.labelBox {\n  stroke: #999;\n  fill: #eee; }\n\n.labelText {\n  fill: white;\n  stroke: none; }\n\n.loopText {\n  fill: white;\n  stroke: none; }\n\n.loopLine {\n  stroke-width: 2;\n  stroke-dasharray: '2 2';\n  marker-end: 'url(#arrowhead)';\n  stroke: #999; }\n\n.note {\n  stroke: #777700;\n  fill: #ffa; }\n\n.noteText {\n  fill: black;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 14px; }\n\n/** Section styling */\n.section {\n  stroke: none;\n  opacity: 0.2; }\n\n.section0 {\n  fill: #80b3e6; }\n\n.section2 {\n  fill: #80b3e6; }\n\n.section1,\n.section3 {\n  fill: white;\n  opacity: 0.2; }\n\n.sectionTitle0 {\n  fill: #333; }\n\n.sectionTitle1 {\n  fill: #333; }\n\n.sectionTitle2 {\n  fill: #333; }\n\n.sectionTitle3 {\n  fill: #333; }\n\n.sectionTitle {\n  text-anchor: start;\n  font-size: 11px;\n  text-height: 14px; }\n\n/* Grid and axis */\n.grid .tick {\n  stroke: #e6e6e6;\n  opacity: 0.3;\n  shape-rendering: crispEdges; }\n\n.grid path {\n  stroke-width: 0; }\n\n/* Today line */\n.today {\n  fill: none;\n  stroke: #d42;\n  stroke-width: 2px; }\n\n/* Task styling */\n/* Default task */\n.task {\n  stroke-width: 2; }\n\n.taskText {\n  text-anchor: middle;\n  font-size: 11px; }\n\n.taskTextOutsideRight {\n  fill: #333;\n  text-anchor: start;\n  font-size: 11px; }\n\n.taskTextOutsideLeft {\n  fill: #333;\n  text-anchor: end;\n  font-size: 11px; }\n\n/* Specific task settings for the sections*/\n.taskText0,\n.taskText1,\n.taskText2,\n.taskText3 {\n  fill: white; }\n\n.task0,\n.task1,\n.task2,\n.task3 {\n  fill: #26a;\n  stroke: #1a4d80; }\n\n.taskTextOutside0,\n.taskTextOutside2 {\n  fill: #333; }\n\n.taskTextOutside1,\n.taskTextOutside3 {\n  fill: #333; }\n\n/* Active task */\n.active0,\n.active1,\n.active2,\n.active3 {\n  fill: #eee;\n  stroke: #1a4d80; }\n\n.activeText0,\n.activeText1,\n.activeText2,\n.activeText3 {\n  fill: #333 !important; }\n\n/* Completed task */\n.done0,\n.done1,\n.done2,\n.done3 {\n  stroke: #666;\n  fill: #bbb;\n  stroke-width: 2; }\n\n.doneText0,\n.doneText1,\n.doneText2,\n.doneText3 {\n  fill: #333 !important; }\n\n/* Tasks on the critical line */\n.crit0,\n.crit1,\n.crit2,\n.crit3 {\n  stroke: #b1361b;\n  fill: #d42;\n  stroke-width: 2; }\n\n.activeCrit0,\n.activeCrit1,\n.activeCrit2,\n.activeCrit3 {\n  stroke: #b1361b;\n  fill: #eee;\n  stroke-width: 2; }\n\n.doneCrit0,\n.doneCrit1,\n.doneCrit2,\n.doneCrit3 {\n  stroke: #b1361b;\n  fill: #bbb;\n  stroke-width: 2;\n  cursor: pointer;\n  shape-rendering: crispEdges; }\n\n.doneCritText0,\n.doneCritText1,\n.doneCritText2,\n.doneCritText3 {\n  fill: #333 !important; }\n\n.activeCritText0,\n.activeCritText1,\n.activeCritText2,\n.activeCritText3 {\n  fill: #333 !important; }\n\n.titleText {\n  text-anchor: middle;\n  font-size: 18px;\n  fill: #333; }\n\ng.classGroup text {\n  fill: #999;\n  stroke: none;\n  font-family: 'trebuchet ms', verdana, arial;\n  font-size: 10px; }\n\ng.classGroup rect {\n  fill: #eee;\n  stroke: #999; }\n\ng.classGroup line {\n  stroke: #999;\n  stroke-width: 1; }\n\n.classLabel .box {\n  stroke: none;\n  stroke-width: 0;\n  fill: #eee;\n  opacity: 0.5; }\n\n.classLabel .label {\n  fill: #999;\n  font-size: 10px; }\n\n.relation {\n  stroke: #999;\n  stroke-width: 1;\n  fill: none; }\n\n#compositionStart {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n#compositionEnd {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n#aggregationStart {\n  fill: #eee;\n  stroke: #999;\n  stroke-width: 1; }\n\n#aggregationEnd {\n  fill: #eee;\n  stroke: #999;\n  stroke-width: 1; }\n\n#dependencyStart {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n#dependencyEnd {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n#extensionStart {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n#extensionEnd {\n  fill: #999;\n  stroke: #999;\n  stroke-width: 1; }\n\n.commit-id,\n.commit-msg,\n.branch-label {\n  fill: lightgrey;\n  color: lightgrey; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/*!*************************************************!*\
  !*** ./node_modules/css-loader/lib/css-base.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/node-libs-browser/mock/empty.js":
/*!******************************************************!*\
  !*** ./node_modules/node-libs-browser/mock/empty.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/path-browserify/index.js":
/*!***********************************************!*\
  !*** ./node_modules/path-browserify/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/diagrams/class/classDb.js":
/*!***************************************!*\
  !*** ./src/diagrams/class/classDb.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relationType = exports.lineType = exports.cleanupLabel = exports.addMembers = exports.addRelation = exports.getRelations = exports.getClasses = exports.getClass = exports.clear = exports.addClass = undefined;

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var relations = [];
var classes = {};

/**
 * Function called by parser when a node definition has been found.
 * @param id
 * @param text
 * @param type
 * @param style
 */
var addClass = exports.addClass = function addClass(id) {
  if (typeof classes[id] === 'undefined') {
    classes[id] = {
      id: id,
      methods: [],
      members: []
    };
  }
};

var clear = exports.clear = function clear() {
  relations = [];
  classes = {};
};

var getClass = exports.getClass = function getClass(id) {
  return classes[id];
};
var getClasses = exports.getClasses = function getClasses() {
  return classes;
};

var getRelations = exports.getRelations = function getRelations() {
  return relations;
};

var addRelation = exports.addRelation = function addRelation(relation) {
  _logger.logger.debug('Adding relation: ' + JSON.stringify(relation));
  addClass(relation.id1);
  addClass(relation.id2);
  relations.push(relation);
};

var addMembers = exports.addMembers = function addMembers(className, MembersArr) {
  var theClass = classes[className];
  if (typeof MembersArr === 'string') {
    if (MembersArr.substr(-1) === ')') {
      theClass.methods.push(MembersArr);
    } else {
      theClass.members.push(MembersArr);
    }
  }
};

var cleanupLabel = exports.cleanupLabel = function cleanupLabel(label) {
  if (label.substring(0, 1) === ':') {
    return label.substr(2).trim();
  } else {
    return label.trim();
  }
};

var lineType = exports.lineType = {
  LINE: 0,
  DOTTED_LINE: 1
};

var relationType = exports.relationType = {
  AGGREGATION: 0,
  EXTENSION: 1,
  COMPOSITION: 2,
  DEPENDENCY: 3
};

exports.default = {
  addClass: addClass,
  clear: clear,
  getClass: getClass,
  getClasses: getClasses,
  getRelations: getRelations,
  addRelation: addRelation,
  addMembers: addMembers,
  cleanupLabel: cleanupLabel,
  lineType: lineType,
  relationType: relationType
};

/***/ }),

/***/ "./src/diagrams/class/classRenderer.js":
/*!*********************************************!*\
  !*** ./src/diagrams/class/classRenderer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.setConf = undefined;

var _dagreLayout = __webpack_require__(/*! dagre-layout */ "dagre-layout");

var _dagreLayout2 = _interopRequireDefault(_dagreLayout);

var _graphlibrary = __webpack_require__(/*! graphlibrary */ "graphlibrary");

var _graphlibrary2 = _interopRequireDefault(_graphlibrary);

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _classDb = __webpack_require__(/*! ./classDb */ "./src/diagrams/class/classDb.js");

var _classDb2 = _interopRequireDefault(_classDb);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var _classDiagram = __webpack_require__(/*! ./parser/classDiagram */ "./src/diagrams/class/parser/classDiagram.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_classDiagram.parser.yy = _classDb2.default;

var idCache = {};

var classCnt = 0;
var conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10

  // Todo optimize
};var getGraphId = function getGraphId(label) {
  var keys = Object.keys(idCache);

  for (var i = 0; i < keys.length; i++) {
    if (idCache[keys[i]].label === label) {
      return keys[i];
    }
  }

  return undefined;
};

/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
var insertMarkers = function insertMarkers(elem) {
  elem.append('defs').append('marker').attr('id', 'extensionStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 1,7 L18,13 V 1 Z');

  elem.append('defs').append('marker').attr('id', 'extensionEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 1,1 V 13 L18,7 Z'); // this is actual shape for arrowhead

  elem.append('defs').append('marker').attr('id', 'compositionStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'compositionEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'aggregationStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'aggregationEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'dependencyStart').attr('class', 'extension').attr('refX', 0).attr('refY', 7).attr('markerWidth', 190).attr('markerHeight', 240).attr('orient', 'auto').append('path').attr('d', 'M 5,7 L9,13 L1,7 L9,1 Z');

  elem.append('defs').append('marker').attr('id', 'dependencyEnd').attr('refX', 19).attr('refY', 7).attr('markerWidth', 20).attr('markerHeight', 28).attr('orient', 'auto').append('path').attr('d', 'M 18,7 L9,13 L14,7 L9,1 Z');
};

var edgeCount = 0;
var drawEdge = function drawEdge(elem, path, relation) {
  var getRelationType = function getRelationType(type) {
    switch (type) {
      case _classDb2.default.relationType.AGGREGATION:
        return 'aggregation';
      case _classDb2.default.relationType.EXTENSION:
        return 'extension';
      case _classDb2.default.relationType.COMPOSITION:
        return 'composition';
      case _classDb2.default.relationType.DEPENDENCY:
        return 'dependency';
    }
  };

  // The data for our line
  var lineData = path.points;

  // This is the accessor function we talked about above
  var lineFunction = d3.line().x(function (d) {
    return d.x;
  }).y(function (d) {
    return d.y;
  }).curve(d3.curveBasis);

  var svgPath = elem.append('path').attr('d', lineFunction(lineData)).attr('id', 'edge' + edgeCount).attr('class', 'relation');
  var url = '';
  if (conf.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  if (relation.relation.type1 !== 'none') {
    svgPath.attr('marker-start', 'url(' + url + '#' + getRelationType(relation.relation.type1) + 'Start' + ')');
  }
  if (relation.relation.type2 !== 'none') {
    svgPath.attr('marker-end', 'url(' + url + '#' + getRelationType(relation.relation.type2) + 'End' + ')');
  }

  var x = void 0,
      y = void 0;
  var l = path.points.length;
  if (l % 2 !== 0) {
    var p1 = path.points[Math.floor(l / 2)];
    var p2 = path.points[Math.ceil(l / 2)];
    x = (p1.x + p2.x) / 2;
    y = (p1.y + p2.y) / 2;
  } else {
    var p = path.points[Math.floor(l / 2)];
    x = p.x;
    y = p.y;
  }

  if (typeof relation.title !== 'undefined') {
    var g = elem.append('g').attr('class', 'classLabel');
    var label = g.append('text').attr('class', 'label').attr('x', x).attr('y', y).attr('fill', 'red').attr('text-anchor', 'middle').text(relation.title);

    window.label = label;
    var bounds = label.node().getBBox();

    g.insert('rect', ':first-child').attr('class', 'box').attr('x', bounds.x - conf.padding / 2).attr('y', bounds.y - conf.padding / 2).attr('width', bounds.width + conf.padding).attr('height', bounds.height + conf.padding);
  }

  edgeCount++;
};

var drawClass = function drawClass(elem, classDef) {
  _logger.logger.info('Rendering class ' + classDef);

  var addTspan = function addTspan(textEl, txt, isFirst) {
    var tSpan = textEl.append('tspan').attr('x', conf.padding).text(txt);
    if (!isFirst) {
      tSpan.attr('dy', conf.textHeight);
    }
  };

  var id = 'classId' + classCnt;
  var classInfo = {
    id: id,
    label: classDef.id,
    width: 0,
    height: 0
  };

  var g = elem.append('g').attr('id', id).attr('class', 'classGroup');
  var title = g.append('text').attr('x', conf.padding).attr('y', conf.textHeight + conf.padding).text(classDef.id);

  var titleHeight = title.node().getBBox().height;

  var membersLine = g.append('line') // text label for the x axis
  .attr('x1', 0).attr('y1', conf.padding + titleHeight + conf.dividerMargin / 2).attr('y2', conf.padding + titleHeight + conf.dividerMargin / 2);

  var members = g.append('text') // text label for the x axis
  .attr('x', conf.padding).attr('y', titleHeight + conf.dividerMargin + conf.textHeight).attr('fill', 'white').attr('class', 'classText');

  var isFirst = true;
  classDef.members.forEach(function (member) {
    addTspan(members, member, isFirst);
    isFirst = false;
  });

  var membersBox = members.node().getBBox();

  var methodsLine = g.append('line') // text label for the x axis
  .attr('x1', 0).attr('y1', conf.padding + titleHeight + conf.dividerMargin + membersBox.height).attr('y2', conf.padding + titleHeight + conf.dividerMargin + membersBox.height);

  var methods = g.append('text') // text label for the x axis
  .attr('x', conf.padding).attr('y', titleHeight + 2 * conf.dividerMargin + membersBox.height + conf.textHeight).attr('fill', 'white').attr('class', 'classText');

  isFirst = true;

  classDef.methods.forEach(function (method) {
    addTspan(methods, method, isFirst);
    isFirst = false;
  });

  var classBox = g.node().getBBox();
  g.insert('rect', ':first-child').attr('x', 0).attr('y', 0).attr('width', classBox.width + 2 * conf.padding).attr('height', classBox.height + conf.padding + 0.5 * conf.dividerMargin);

  membersLine.attr('x2', classBox.width + 2 * conf.padding);
  methodsLine.attr('x2', classBox.width + 2 * conf.padding);

  classInfo.width = classBox.width + 2 * conf.padding;
  classInfo.height = classBox.height + conf.padding + 0.5 * conf.dividerMargin;

  idCache[id] = classInfo;
  classCnt++;
  return classInfo;
};

var setConf = exports.setConf = function setConf(cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};
/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
var draw = exports.draw = function draw(text, id) {
  _classDiagram.parser.yy.clear();
  _classDiagram.parser.parse(text);

  _logger.logger.info('Rendering diagram ' + text);

  /// / Fetch the default direction, use TD if none was found
  var diagram = d3.select('[id="' + id + '"]');
  insertMarkers(diagram);

  // Layout graph, Create a new directed graph
  var g = new _graphlibrary2.default.Graph({
    multigraph: true
  });

  // Set an object for the graph label
  g.setGraph({
    isMultiGraph: true
  });

  // Default to assigning a new object as a label for each new edge.
  g.setDefaultEdgeLabel(function () {
    return {};
  });

  var classes = _classDb2.default.getClasses();
  var keys = Object.keys(classes);
  for (var i = 0; i < keys.length; i++) {
    var classDef = classes[keys[i]];
    var node = drawClass(diagram, classDef);
    // Add nodes to the graph. The first argument is the node id. The second is
    // metadata about the node. In this case we're going to add labels to each of
    // our nodes.
    g.setNode(node.id, node);
    _logger.logger.info('Org height: ' + node.height);
  }

  var relations = _classDb2.default.getRelations();
  relations.forEach(function (relation) {
    _logger.logger.info('tjoho' + getGraphId(relation.id1) + getGraphId(relation.id2) + JSON.stringify(relation));
    g.setEdge(getGraphId(relation.id1), getGraphId(relation.id2), { relation: relation });
  });
  _dagreLayout2.default.layout(g);
  g.nodes().forEach(function (v) {
    if (typeof v !== 'undefined') {
      _logger.logger.debug('Node ' + v + ': ' + JSON.stringify(g.node(v)));
      d3.select('#' + v).attr('transform', 'translate(' + (g.node(v).x - g.node(v).width / 2) + ',' + (g.node(v).y - g.node(v).height / 2) + ' )');
    }
  });
  g.edges().forEach(function (e) {
    _logger.logger.debug('Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)));
    drawEdge(diagram, g.edge(e), g.edge(e).relation);
  });

  diagram.attr('height', '100%');
  diagram.attr('width', '100%');
  diagram.attr('viewBox', '0 0 ' + (g.graph().width + 20) + ' ' + (g.graph().height + 20));
};

exports.default = {
  setConf: setConf,
  draw: draw
};

/***/ }),

/***/ "./src/diagrams/class/parser/classDiagram.js":
/*!***************************************************!*\
  !*** ./src/diagrams/class/parser/classDiagram.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 11],
        $V1 = [1, 12],
        $V2 = [1, 13],
        $V3 = [1, 15],
        $V4 = [1, 16],
        $V5 = [1, 17],
        $V6 = [6, 8],
        $V7 = [1, 26],
        $V8 = [1, 27],
        $V9 = [1, 28],
        $Va = [1, 29],
        $Vb = [1, 30],
        $Vc = [1, 31],
        $Vd = [6, 8, 13, 17, 23, 26, 27, 28, 29, 30, 31],
        $Ve = [6, 8, 13, 17, 23, 26, 27, 28, 29, 30, 31, 45, 46, 47],
        $Vf = [23, 45, 46, 47],
        $Vg = [23, 30, 31, 45, 46, 47],
        $Vh = [23, 26, 27, 28, 29, 45, 46, 47],
        $Vi = [6, 8, 13],
        $Vj = [1, 46];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "mermaidDoc": 3, "graphConfig": 4, "CLASS_DIAGRAM": 5, "NEWLINE": 6, "statements": 7, "EOF": 8, "statement": 9, "className": 10, "alphaNumToken": 11, "relationStatement": 12, "LABEL": 13, "classStatement": 14, "methodStatement": 15, "CLASS": 16, "STRUCT_START": 17, "members": 18, "STRUCT_STOP": 19, "MEMBER": 20, "SEPARATOR": 21, "relation": 22, "STR": 23, "relationType": 24, "lineType": 25, "AGGREGATION": 26, "EXTENSION": 27, "COMPOSITION": 28, "DEPENDENCY": 29, "LINE": 30, "DOTTED_LINE": 31, "commentToken": 32, "textToken": 33, "graphCodeTokens": 34, "textNoTagsToken": 35, "TAGSTART": 36, "TAGEND": 37, "==": 38, "--": 39, "PCT": 40, "DEFAULT": 41, "SPACE": 42, "MINUS": 43, "keywords": 44, "UNICODE_TEXT": 45, "NUM": 46, "ALPHA": 47, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "CLASS_DIAGRAM", 6: "NEWLINE", 8: "EOF", 13: "LABEL", 16: "CLASS", 17: "STRUCT_START", 19: "STRUCT_STOP", 20: "MEMBER", 21: "SEPARATOR", 23: "STR", 26: "AGGREGATION", 27: "EXTENSION", 28: "COMPOSITION", 29: "DEPENDENCY", 30: "LINE", 31: "DOTTED_LINE", 34: "graphCodeTokens", 36: "TAGSTART", 37: "TAGEND", 38: "==", 39: "--", 40: "PCT", 41: "DEFAULT", 42: "SPACE", 43: "MINUS", 44: "keywords", 45: "UNICODE_TEXT", 46: "NUM", 47: "ALPHA" },
        productions_: [0, [3, 1], [4, 4], [7, 1], [7, 3], [10, 2], [10, 1], [9, 1], [9, 2], [9, 1], [9, 1], [14, 2], [14, 5], [18, 1], [18, 2], [15, 1], [15, 2], [15, 1], [15, 1], [12, 3], [12, 4], [12, 4], [12, 5], [22, 3], [22, 2], [22, 2], [22, 1], [24, 1], [24, 1], [24, 1], [24, 1], [25, 1], [25, 1], [32, 1], [32, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [33, 1], [35, 1], [35, 1], [35, 1], [35, 1], [11, 1], [11, 1], [11, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 5:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
                case 6:
                    this.$ = $$[$0];
                    break;
                case 7:
                    yy.addRelation($$[$0]);
                    break;
                case 8:
                    $$[$0 - 1].title = yy.cleanupLabel($$[$0]);yy.addRelation($$[$0 - 1]);
                    break;
                case 12:
                    /*console.log($$[$0-3],JSON.stringify($$[$0-1]));*/yy.addMembers($$[$0 - 3], $$[$0 - 1]);
                    break;
                case 13:
                    this.$ = [$$[$0]];
                    break;
                case 14:
                    $$[$0].push($$[$0 - 1]);this.$ = $$[$0];
                    break;
                case 15:
                    /*console.log('Rel found',$$[$0]);*/
                    break;
                case 16:
                    yy.addMembers($$[$0 - 1], yy.cleanupLabel($$[$0]));
                    break;
                case 17:
                    console.warn('Member', $$[$0]);
                    break;
                case 18:
                    /*console.log('sep found',$$[$0]);*/
                    break;
                case 19:
                    this.$ = { 'id1': $$[$0 - 2], 'id2': $$[$0], relation: $$[$0 - 1], relationTitle1: 'none', relationTitle2: 'none' };
                    break;
                case 20:
                    this.$ = { id1: $$[$0 - 3], id2: $$[$0], relation: $$[$0 - 1], relationTitle1: $$[$0 - 2], relationTitle2: 'none' };
                    break;
                case 21:
                    this.$ = { id1: $$[$0 - 3], id2: $$[$0], relation: $$[$0 - 2], relationTitle1: 'none', relationTitle2: $$[$0 - 1] };
                    break;
                case 22:
                    this.$ = { id1: $$[$0 - 4], id2: $$[$0], relation: $$[$0 - 2], relationTitle1: $$[$0 - 3], relationTitle2: $$[$0 - 1] };
                    break;
                case 23:
                    this.$ = { type1: $$[$0 - 2], type2: $$[$0], lineType: $$[$0 - 1] };
                    break;
                case 24:
                    this.$ = { type1: 'none', type2: $$[$0], lineType: $$[$0 - 1] };
                    break;
                case 25:
                    this.$ = { type1: $$[$0 - 1], type2: 'none', lineType: $$[$0] };
                    break;
                case 26:
                    this.$ = { type1: 'none', type2: 'none', lineType: $$[$0] };
                    break;
                case 27:
                    this.$ = yy.relationType.AGGREGATION;
                    break;
                case 28:
                    this.$ = yy.relationType.EXTENSION;
                    break;
                case 29:
                    this.$ = yy.relationType.COMPOSITION;
                    break;
                case 30:
                    this.$ = yy.relationType.DEPENDENCY;
                    break;
                case 31:
                    this.$ = yy.lineType.LINE;
                    break;
                case 32:
                    this.$ = yy.lineType.DOTTED_LINE;
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [1, 3] }, { 1: [3] }, { 1: [2, 1] }, { 6: [1, 4] }, { 7: 5, 9: 6, 10: 10, 11: 14, 12: 7, 14: 8, 15: 9, 16: $V0, 20: $V1, 21: $V2, 45: $V3, 46: $V4, 47: $V5 }, { 8: [1, 18] }, { 6: [1, 19], 8: [2, 3] }, o($V6, [2, 7], { 13: [1, 20] }), o($V6, [2, 9]), o($V6, [2, 10]), o($V6, [2, 15], { 22: 21, 24: 24, 25: 25, 13: [1, 23], 23: [1, 22], 26: $V7, 27: $V8, 28: $V9, 29: $Va, 30: $Vb, 31: $Vc }), { 10: 32, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, o($V6, [2, 17]), o($V6, [2, 18]), o($Vd, [2, 6], { 11: 14, 10: 33, 45: $V3, 46: $V4, 47: $V5 }), o($Ve, [2, 46]), o($Ve, [2, 47]), o($Ve, [2, 48]), { 1: [2, 2] }, { 7: 34, 9: 6, 10: 10, 11: 14, 12: 7, 14: 8, 15: 9, 16: $V0, 20: $V1, 21: $V2, 45: $V3, 46: $V4, 47: $V5 }, o($V6, [2, 8]), { 10: 35, 11: 14, 23: [1, 36], 45: $V3, 46: $V4, 47: $V5 }, { 22: 37, 24: 24, 25: 25, 26: $V7, 27: $V8, 28: $V9, 29: $Va, 30: $Vb, 31: $Vc }, o($V6, [2, 16]), { 25: 38, 30: $Vb, 31: $Vc }, o($Vf, [2, 26], { 24: 39, 26: $V7, 27: $V8, 28: $V9, 29: $Va }), o($Vg, [2, 27]), o($Vg, [2, 28]), o($Vg, [2, 29]), o($Vg, [2, 30]), o($Vh, [2, 31]), o($Vh, [2, 32]), o($V6, [2, 11], { 17: [1, 40] }), o($Vd, [2, 5]), { 8: [2, 4] }, o($Vi, [2, 19]), { 10: 41, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, { 10: 42, 11: 14, 23: [1, 43], 45: $V3, 46: $V4, 47: $V5 }, o($Vf, [2, 25], { 24: 44, 26: $V7, 27: $V8, 28: $V9, 29: $Va }), o($Vf, [2, 24]), { 18: 45, 20: $Vj }, o($Vi, [2, 21]), o($Vi, [2, 20]), { 10: 47, 11: 14, 45: $V3, 46: $V4, 47: $V5 }, o($Vf, [2, 23]), { 19: [1, 48] }, { 18: 49, 19: [2, 13], 20: $Vj }, o($Vi, [2, 22]), o($V6, [2, 12]), { 19: [2, 14] }],
        defaultActions: { 2: [2, 1], 18: [2, 2], 34: [2, 4], 49: [2, 14] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = tstack.pop() || lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    if (token instanceof Array) {
                        tstack = token;
                        token = tstack.pop();
                    }
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* do nothing */
                        break;
                    case 1:
                        return 6;
                        break;
                    case 2:
                        /* skip whitespace */
                        break;
                    case 3:
                        return 5;
                        break;
                    case 4:
                        this.begin("struct"); /*console.log('Starting struct');*/return 17;
                        break;
                    case 5:
                        /*console.log('Ending struct');*/this.popState();return 19;
                        break;
                    case 6:
                        /* nothing */
                        break;
                    case 7:
                        /*console.log('lex-member: ' + yy_.yytext);*/return "MEMBER";
                        break;
                    case 8:
                        return 16;
                        break;
                    case 9:
                        this.begin("string");
                        break;
                    case 10:
                        this.popState();
                        break;
                    case 11:
                        return "STR";
                        break;
                    case 12:
                        return 27;
                        break;
                    case 13:
                        return 27;
                        break;
                    case 14:
                        return 29;
                        break;
                    case 15:
                        return 29;
                        break;
                    case 16:
                        return 28;
                        break;
                    case 17:
                        return 26;
                        break;
                    case 18:
                        return 30;
                        break;
                    case 19:
                        return 31;
                        break;
                    case 20:
                        return 13;
                        break;
                    case 21:
                        return 43;
                        break;
                    case 22:
                        return 'DOT';
                        break;
                    case 23:
                        return 'PLUS';
                        break;
                    case 24:
                        return 40;
                        break;
                    case 25:
                        return 'EQUALS';
                        break;
                    case 26:
                        return 'EQUALS';
                        break;
                    case 27:
                        return 47;
                        break;
                    case 28:
                        return 'PUNCTUATION';
                        break;
                    case 29:
                        return 46;
                        break;
                    case 30:
                        return 45;
                        break;
                    case 31:
                        return 42;
                        break;
                    case 32:
                        return 8;
                        break;
                }
            },
            rules: [/^(?:%%[^\n]*)/, /^(?:\n+)/, /^(?:\s+)/, /^(?:classDiagram\b)/, /^(?:[\{])/, /^(?:\})/, /^(?:[\n])/, /^(?:[^\{\}\n]*)/, /^(?:class\b)/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:\s*<\|)/, /^(?:\s*\|>)/, /^(?:\s*>)/, /^(?:\s*<)/, /^(?:\s*\*)/, /^(?:\s*o\b)/, /^(?:--)/, /^(?:\.\.)/, /^(?::[^#\n;]+)/, /^(?:-)/, /^(?:\.)/, /^(?:\+)/, /^(?:%)/, /^(?:=)/, /^(?:=)/, /^(?:[A-Za-z]+)/, /^(?:[!"#$%&'*+,-.`?\\_\/])/, /^(?:[0-9]+)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\s)/, /^(?:$)/],
            conditions: { "string": { "rules": [10, 11], "inclusive": false }, "struct": { "rules": [5, 6, 7], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 3, 4, 8, 9, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js").readFileSync(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js").normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/diagrams/flowchart/flowDb.js":
/*!******************************************!*\
  !*** ./src/diagrams/flowchart/flowDb.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSubGraphs = exports.indexNodes = exports.getDepthFirstPos = exports.addSubGraph = exports.defaultStyle = exports.clear = exports.getClasses = exports.getEdges = exports.getVertices = exports.getDirection = exports.bindFunctions = exports.setClickEvent = exports.getTooltip = exports.setClass = exports.setDirection = exports.addClass = exports.updateLink = exports.updateLinkInterpolate = exports.addLink = exports.addVertex = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var vertices = {};
var edges = [];
var classes = [];
var subGraphs = [];
var tooltips = {};
var subCount = 0;
var direction = void 0;
// Functions to be run after graph rendering
var funs = [];
/**
 * Function called by parser when a node definition has been found
 * @param id
 * @param text
 * @param type
 * @param style
 */
var addVertex = exports.addVertex = function addVertex(id, text, type, style) {
  var txt = void 0;

  if (typeof id === 'undefined') {
    return;
  }
  if (id.trim().length === 0) {
    return;
  }

  if (typeof vertices[id] === 'undefined') {
    vertices[id] = { id: id, styles: [], classes: [] };
  }
  if (typeof text !== 'undefined') {
    txt = text.trim();

    // strip quotes if string starts and exnds with a quote
    if (txt[0] === '"' && txt[txt.length - 1] === '"') {
      txt = txt.substring(1, txt.length - 1);
    }

    vertices[id].text = txt;
  }
  if (typeof type !== 'undefined') {
    vertices[id].type = type;
  }
  if (typeof type !== 'undefined') {
    vertices[id].type = type;
  }
  if (typeof style !== 'undefined') {
    if (style !== null) {
      style.forEach(function (s) {
        vertices[id].styles.push(s);
      });
    }
  }
};

/**
 * Function called by parser when a link/edge definition has been found
 * @param start
 * @param end
 * @param type
 * @param linktext
 */
var addLink = exports.addLink = function addLink(start, end, type, linktext) {
  _logger.logger.info('Got edge...', start, end);
  var edge = { start: start, end: end, type: undefined, text: '' };
  linktext = type.text;

  if (typeof linktext !== 'undefined') {
    edge.text = linktext.trim();

    // strip quotes if string starts and exnds with a quote
    if (edge.text[0] === '"' && edge.text[edge.text.length - 1] === '"') {
      edge.text = edge.text.substring(1, edge.text.length - 1);
    }
  }

  if (typeof type !== 'undefined') {
    edge.type = type.type;
    edge.stroke = type.stroke;
  }
  edges.push(edge);
};

/**
 * Updates a link's line interpolation algorithm
 * @param pos
 * @param interpolate
 */
var updateLinkInterpolate = exports.updateLinkInterpolate = function updateLinkInterpolate(pos, interp) {
  if (pos === 'default') {
    edges.defaultInterpolate = interp;
  } else {
    edges[pos].interpolate = interp;
  }
};

/**
 * Updates a link with a style
 * @param pos
 * @param style
 */
var updateLink = exports.updateLink = function updateLink(pos, style) {
  if (pos === 'default') {
    edges.defaultStyle = style;
  } else {
    if (_utils2.default.isSubstringInArray('fill', style) === -1) {
      style.push('fill:none');
    }
    edges[pos].style = style;
  }
};

var addClass = exports.addClass = function addClass(id, style) {
  if (typeof classes[id] === 'undefined') {
    classes[id] = { id: id, styles: [] };
  }

  if (typeof style !== 'undefined') {
    if (style !== null) {
      style.forEach(function (s) {
        classes[id].styles.push(s);
      });
    }
  }
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
var setDirection = exports.setDirection = function setDirection(dir) {
  direction = dir;
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
var setClass = exports.setClass = function setClass(id, className) {
  if (id.indexOf(',') > 0) {
    id.split(',').forEach(function (id2) {
      if (typeof vertices[id2] !== 'undefined') {
        vertices[id2].classes.push(className);
      }
    });
  } else {
    if (typeof vertices[id] !== 'undefined') {
      vertices[id].classes.push(className);
    }
  }
};

var setTooltip = function setTooltip(id, tooltip) {
  if (typeof tooltip !== 'undefined') {
    tooltips[id] = tooltip;
  }
};

var setClickFun = function setClickFun(id, functionName) {
  if (typeof functionName === 'undefined') {
    return;
  }
  if (typeof vertices[id] !== 'undefined') {
    funs.push(function (element) {
      var elem = d3.select(element).select('[id="' + id + '"]');
      if (elem !== null) {
        elem.on('click', function () {
          window[functionName](id);
        });
      }
    });
  }
};

var setLink = function setLink(id, linkStr) {
  if (typeof linkStr === 'undefined') {
    return;
  }
  if (typeof vertices[id] !== 'undefined') {
    funs.push(function (element) {
      var elem = d3.select(element).select('[id="' + id + '"]');
      if (elem !== null) {
        elem.on('click', function () {
          window.open(linkStr, 'newTab');
        });
      }
    });
  }
};
var getTooltip = exports.getTooltip = function getTooltip(id) {
  return tooltips[id];
};

/**
 * Called by parser when a graph definition is found, stores the direction of the chart.
 * @param dir
 */
var setClickEvent = exports.setClickEvent = function setClickEvent(id, functionName, link, tooltip) {
  if (id.indexOf(',') > 0) {
    id.split(',').forEach(function (id2) {
      setTooltip(id2, tooltip);
      setClickFun(id2, functionName);
      setLink(id2, link);
      setClass(id, 'clickable');
    });
  } else {
    setTooltip(id, tooltip);
    setClickFun(id, functionName);
    setLink(id, link);
    setClass(id, 'clickable');
  }
};

var bindFunctions = exports.bindFunctions = function bindFunctions(element) {
  funs.forEach(function (fun) {
    fun(element);
  });
};
var getDirection = exports.getDirection = function getDirection() {
  return direction;
};
/**
 * Retrieval function for fetching the found nodes after parsing has completed.
 * @returns {{}|*|vertices}
 */
var getVertices = exports.getVertices = function getVertices() {
  return vertices;
};

/**
 * Retrieval function for fetching the found links after parsing has completed.
 * @returns {{}|*|edges}
 */
var getEdges = exports.getEdges = function getEdges() {
  return edges;
};

/**
 * Retrieval function for fetching the found class definitions after parsing has completed.
 * @returns {{}|*|classes}
 */
var getClasses = exports.getClasses = function getClasses() {
  return classes;
};

var setupToolTips = function setupToolTips(element) {
  var tooltipElem = d3.select('.mermaidTooltip');
  if ((tooltipElem._groups || tooltipElem)[0][0] === null) {
    tooltipElem = d3.select('body').append('div').attr('class', 'mermaidTooltip').style('opacity', 0);
  }

  var svg = d3.select(element).select('svg');

  var nodes = svg.selectAll('g.node');
  nodes.on('mouseover', function () {
    var el = d3.select(this);
    var title = el.attr('title');
    // Dont try to draw a tooltip if no data is provided
    if (title === null) {
      return;
    }
    var rect = this.getBoundingClientRect();

    tooltipElem.transition().duration(200).style('opacity', '.9');
    tooltipElem.html(el.attr('title')).style('left', rect.left + (rect.right - rect.left) / 2 + 'px').style('top', rect.top - 14 + document.body.scrollTop + 'px');
    el.classed('hover', true);
  }).on('mouseout', function () {
    tooltipElem.transition().duration(500).style('opacity', 0);
    var el = d3.select(this);
    el.classed('hover', false);
  });
};
funs.push(setupToolTips);

/**
 * Clears the internal graph db so that a new graph can be parsed.
 */
var clear = exports.clear = function clear() {
  vertices = {};
  classes = {};
  edges = [];
  funs = [];
  funs.push(setupToolTips);
  subGraphs = [];
  subCount = 0;
  tooltips = [];
};
/**
 *
 * @returns {string}
 */
var defaultStyle = exports.defaultStyle = function defaultStyle() {
  return 'fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;';
};

/**
 * Clears the internal graph db so that a new graph can be parsed.
 */
var addSubGraph = exports.addSubGraph = function addSubGraph(list, title) {
  function uniq(a) {
    var prims = { 'boolean': {}, 'number': {}, 'string': {} };
    var objs = [];

    return a.filter(function (item) {
      var type = typeof item === 'undefined' ? 'undefined' : _typeof(item);
      if (item.trim() === '') {
        return false;
      }
      if (type in prims) {
        return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;
      } else {
        return objs.indexOf(item) >= 0 ? false : objs.push(item);
      }
    });
  }

  var nodeList = [];

  nodeList = uniq(nodeList.concat.apply(nodeList, list));

  var subGraph = { id: 'subGraph' + subCount, nodes: nodeList, title: title.trim() };
  subGraphs.push(subGraph);
  subCount = subCount + 1;
  return subGraph.id;
};

var getPosForId = function getPosForId(id) {
  for (var i = 0; i < subGraphs.length; i++) {
    if (subGraphs[i].id === id) {
      return i;
    }
  }
  return -1;
};
var secCount = -1;
var posCrossRef = [];
var indexNodes2 = function indexNodes2(id, pos) {
  var nodes = subGraphs[pos].nodes;
  secCount = secCount + 1;
  if (secCount > 2000) {
    return;
  }
  posCrossRef[secCount] = pos;
  // Check if match
  if (subGraphs[pos].id === id) {
    return {
      result: true,
      count: 0
    };
  }

  var count = 0;
  var posCount = 1;
  while (count < nodes.length) {
    var childPos = getPosForId(nodes[count]);
    // Ignore regular nodes (pos will be -1)
    if (childPos >= 0) {
      var res = indexNodes2(id, childPos);
      if (res.result) {
        return {
          result: true,
          count: posCount + res.count
        };
      } else {
        posCount = posCount + res.count;
      }
    }
    count = count + 1;
  }

  return {
    result: false,
    count: posCount
  };
};

var getDepthFirstPos = exports.getDepthFirstPos = function getDepthFirstPos(pos) {
  return posCrossRef[pos];
};
var indexNodes = exports.indexNodes = function indexNodes() {
  secCount = -1;
  if (subGraphs.length > 0) {
    indexNodes2('none', subGraphs.length - 1, 0);
  }
};

var getSubGraphs = exports.getSubGraphs = function getSubGraphs() {
  return subGraphs;
};

exports.default = {
  addVertex: addVertex,
  addLink: addLink,
  updateLinkInterpolate: updateLinkInterpolate,
  updateLink: updateLink,
  addClass: addClass,
  setDirection: setDirection,
  setClass: setClass,
  getTooltip: getTooltip,
  setClickEvent: setClickEvent,
  bindFunctions: bindFunctions,
  getDirection: getDirection,
  getVertices: getVertices,
  getEdges: getEdges,
  getClasses: getClasses,
  clear: clear,
  defaultStyle: defaultStyle,
  addSubGraph: addSubGraph,
  getDepthFirstPos: getDepthFirstPos,
  indexNodes: indexNodes,
  getSubGraphs: getSubGraphs
};

/***/ }),

/***/ "./src/diagrams/flowchart/flowRenderer.js":
/*!************************************************!*\
  !*** ./src/diagrams/flowchart/flowRenderer.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.getClasses = exports.addEdges = exports.addVertices = exports.setConf = undefined;

var _graphlibrary = __webpack_require__(/*! graphlibrary */ "graphlibrary");

var _graphlibrary2 = _interopRequireDefault(_graphlibrary);

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _flowDb = __webpack_require__(/*! ./flowDb */ "./src/diagrams/flowchart/flowDb.js");

var _flowDb2 = _interopRequireDefault(_flowDb);

var _flow = __webpack_require__(/*! ./parser/flow */ "./src/diagrams/flowchart/parser/flow.js");

var _flow2 = _interopRequireDefault(_flow);

var _dagreD3Renderer = __webpack_require__(/*! dagre-d3-renderer */ "dagre-d3-renderer");

var _dagreD3Renderer2 = _interopRequireDefault(_dagreD3Renderer);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conf = {};
var setConf = exports.setConf = function setConf(cnf) {
  var keys = Object.keys(cnf);
  for (var i = 0; i < keys.length; i++) {
    conf[keys[i]] = cnf[keys[i]];
  }
};

/**
 * Function that adds the vertices found in the graph definition to the graph to be rendered.
 * @param vert Object containing the vertices.
 * @param g The graph that is to be drawn.
 */
var addVertices = exports.addVertices = function addVertices(vert, g) {
  var keys = Object.keys(vert);

  var styleFromStyleArr = function styleFromStyleArr(styleStr, arr) {
    // Create a compound style definition from the style definitions found for the node in the graph definition
    for (var i = 0; i < arr.length; i++) {
      if (typeof arr[i] !== 'undefined') {
        styleStr = styleStr + arr[i] + ';';
      }
    }

    return styleStr;
  };

  // Iterate through each item in the vertice object (containing all the vertices found) in the graph definition
  keys.forEach(function (id) {
    var vertice = vert[id];
    var verticeText = void 0;

    /**
     * Variable for storing the classes for the vertice
     * @type {string}
     */
    var classStr = '';
    if (vertice.classes.length > 0) {
      classStr = vertice.classes.join(' ');
    }

    /**
     * Variable for storing the extracted style for the vertice
     * @type {string}
     */
    var style = '';
    // Create a compound style definition from the style definitions found for the node in the graph definition
    style = styleFromStyleArr(style, vertice.styles);

    // Use vertice id as text in the box if no text is provided by the graph definition
    if (typeof vertice.text === 'undefined') {
      verticeText = vertice.id;
    } else {
      verticeText = vertice.text;
    }

    var labelTypeStr = '';
    if (conf.htmlLabels) {
      labelTypeStr = 'html';
      verticeText = verticeText.replace(/fa:fa[\w-]+/g, function (s) {
        return '<i class="fa ' + s.substring(3) + '"></i>';
      });
    } else {
      var svgLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');

      var rows = verticeText.split(/<br>/);

      for (var j = 0; j < rows.length; j++) {
        var tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        tspan.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:space', 'preserve');
        tspan.setAttribute('dy', '1em');
        tspan.setAttribute('x', '1');
        tspan.textContent = rows[j];
        svgLabel.appendChild(tspan);
      }

      labelTypeStr = 'svg';
      verticeText = svgLabel;
    }

    var radious = 0;
    var _shape = '';
    // Set the shape based parameters
    switch (vertice.type) {
      case 'round':
        radious = 5;
        _shape = 'rect';
        break;
      case 'square':
        _shape = 'rect';
        break;
      case 'diamond':
        _shape = 'question';
        break;
      case 'odd':
        _shape = 'rect_left_inv_arrow';
        break;
      case 'odd_right':
        _shape = 'rect_left_inv_arrow';
        break;
      case 'circle':
        _shape = 'circle';
        break;
      case 'ellipse':
        _shape = 'ellipse';
        break;
      case 'group':
        _shape = 'rect';
        // Need to create a text node if using svg labels, see #367
        verticeText = conf.htmlLabels ? '' : document.createElementNS('http://www.w3.org/2000/svg', 'text');
        break;
      default:
        _shape = 'rect';
    }
    // Add the node
    g.setNode(vertice.id, { labelType: labelTypeStr, shape: _shape, label: verticeText, rx: radious, ry: radious, 'class': classStr, style: style, id: vertice.id });
  });
};

/**
 * Add edges to graph based on parsed graph defninition
 * @param {Object} edges The edges to add to the graph
 * @param {Object} g The graph object
 */
var addEdges = exports.addEdges = function addEdges(edges, g) {
  var cnt = 0;

  var defaultStyle = void 0;
  if (typeof edges.defaultStyle !== 'undefined') {
    defaultStyle = edges.defaultStyle.toString().replace(/,/g, ';');
  }

  edges.forEach(function (edge) {
    cnt++;
    var edgeData = {};

    // Set link type for rendering
    if (edge.type === 'arrow_open') {
      edgeData.arrowhead = 'none';
    } else {
      edgeData.arrowhead = 'normal';
    }

    var style = '';
    if (typeof edge.style !== 'undefined') {
      edge.style.forEach(function (s) {
        style = style + s + ';';
      });
    } else {
      switch (edge.stroke) {
        case 'normal':
          style = 'fill:none';
          if (typeof defaultStyle !== 'undefined') {
            style = defaultStyle;
          }
          break;
        case 'dotted':
          style = 'stroke: #333; fill:none;stroke-width:2px;stroke-dasharray:3;';
          break;
        case 'thick':
          style = 'stroke: #333; stroke-width: 3.5px;fill:none';
          break;
      }
    }
    edgeData.style = style;

    if (typeof edge.interpolate !== 'undefined') {
      edgeData.curve = (0, _utils.interpolateToCurve)(edge.interpolate, d3.curveLinear);
    } else if (typeof edges.defaultInterpolate !== 'undefined') {
      edgeData.curve = (0, _utils.interpolateToCurve)(edges.defaultInterpolate, d3.curveLinear);
    } else {
      edgeData.curve = (0, _utils.interpolateToCurve)(conf.curve, d3.curveLinear);
    }

    if (typeof edge.text === 'undefined') {
      if (typeof edge.style !== 'undefined') {
        edgeData.arrowheadStyle = 'fill: #333';
      }
    } else {
      edgeData.arrowheadStyle = 'fill: #333';
      if (typeof edge.style === 'undefined') {
        edgeData.labelpos = 'c';
        if (conf.htmlLabels) {
          edgeData.labelType = 'html';
          edgeData.label = '<span class="edgeLabel">' + edge.text + '</span>';
        } else {
          edgeData.labelType = 'text';
          edgeData.style = 'stroke: #333; stroke-width: 1.5px;fill:none';
          edgeData.label = edge.text.replace(/<br>/g, '\n');
        }
      } else {
        edgeData.label = edge.text.replace(/<br>/g, '\n');
      }
    }
    // Add the edge to the graph
    g.setEdge(edge.start, edge.end, edgeData, cnt);
  });
};

/**
 * Returns the all the styles from classDef statements in the graph definition.
 * @returns {object} classDef styles
 */
var getClasses = exports.getClasses = function getClasses(text) {
  _flowDb2.default.clear();
  var parser = _flow2.default.parser;
  parser.yy = _flowDb2.default;

  // Parse the graph definition
  parser.parse(text);
  return _flowDb2.default.getClasses();
};

/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
var draw = exports.draw = function draw(text, id) {
  _logger.logger.debug('Drawing flowchart');
  _flowDb2.default.clear();
  var parser = _flow2.default.parser;
  parser.yy = _flowDb2.default;

  // Parse the graph definition
  try {
    parser.parse(text);
  } catch (err) {
    _logger.logger.debug('Parsing failed');
  }

  // Fetch the default direction, use TD if none was found
  var dir = _flowDb2.default.getDirection();
  if (typeof dir === 'undefined') {
    dir = 'TD';
  }

  // Create the input mermaid.graph
  var g = new _graphlibrary2.default.Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: dir,
    marginx: 20,
    marginy: 20

  }).setDefaultEdgeLabel(function () {
    return {};
  });

  var subG = void 0;
  var subGraphs = _flowDb2.default.getSubGraphs();
  for (var _i = subGraphs.length - 1; _i >= 0; _i--) {
    subG = subGraphs[_i];
    _flowDb2.default.addVertex(subG.id, subG.title, 'group', undefined);
  }

  // Fetch the verices/nodes and edges/links from the parsed graph definition
  var vert = _flowDb2.default.getVertices();

  var edges = _flowDb2.default.getEdges();

  var i = 0;
  for (i = subGraphs.length - 1; i >= 0; i--) {
    subG = subGraphs[i];

    d3.selectAll('cluster').append('text');

    for (var j = 0; j < subG.nodes.length; j++) {
      g.setParent(subG.nodes[j], subG.id);
    }
  }
  addVertices(vert, g);
  addEdges(edges, g);

  // Create the renderer
  var Render = _dagreD3Renderer2.default.render;
  var render = new Render();

  // Add custom shape for rhombus type of boc (decision)
  render.shapes().question = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var s = (w + h) * 0.9;
    var points = [{ x: s / 2, y: 0 }, { x: s, y: -s / 2 }, { x: s / 2, y: -s }, { x: 0, y: -s / 2 }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('rx', 5).attr('ry', 5).attr('transform', 'translate(' + -s / 2 + ',' + s * 2 / 4 + ')');
    node.intersect = function (point) {
      return _dagreD3Renderer2.default.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add custom shape for box with inverted arrow on left side
  render.shapes().rect_left_inv_arrow = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var points = [{ x: -h / 2, y: 0 }, { x: w, y: 0 }, { x: w, y: -h }, { x: -h / 2, y: -h }, { x: 0, y: -h / 2 }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('transform', 'translate(' + -w / 2 + ',' + h * 2 / 4 + ')');
    node.intersect = function (point) {
      return _dagreD3Renderer2.default.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add custom shape for box with inverted arrow on right side
  render.shapes().rect_right_inv_arrow = function (parent, bbox, node) {
    var w = bbox.width;
    var h = bbox.height;
    var points = [{ x: 0, y: 0 }, { x: w + h / 2, y: 0 }, { x: w, y: -h / 2 }, { x: w + h / 2, y: -h }, { x: 0, y: -h }];
    var shapeSvg = parent.insert('polygon', ':first-child').attr('points', points.map(function (d) {
      return d.x + ',' + d.y;
    }).join(' ')).attr('transform', 'translate(' + -w / 2 + ',' + h * 2 / 4 + ')');
    node.intersect = function (point) {
      return _dagreD3Renderer2.default.intersect.polygon(node, points, point);
    };
    return shapeSvg;
  };

  // Add our custom arrow - an empty arrowhead
  render.arrows().none = function normal(parent, id, edge, type) {
    var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

    var path = marker.append('path').attr('d', 'M 0 0 L 0 0 L 0 0 z');
    _dagreD3Renderer2.default.util.applyStyle(path, edge[type + 'Style']);
  };

  // Override normal arrowhead defined in d3. Remove style & add class to allow css styling.
  render.arrows().normal = function normal(parent, id, edge, type) {
    var marker = parent.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 9).attr('refY', 5).attr('markerUnits', 'strokeWidth').attr('markerWidth', 8).attr('markerHeight', 6).attr('orient', 'auto');

    marker.append('path').attr('d', 'M 0 0 L 10 5 L 0 10 z').attr('class', 'arrowheadPath').style('stroke-width', 1).style('stroke-dasharray', '1,0');
  };

  // Set up an SVG group so that we can translate the final graph.
  var svg = d3.select('[id="' + id + '"]');

  // Run the renderer. This is what draws the final graph.
  var element = d3.select('#' + id + ' g');
  render(element, g);

  element.selectAll('g.node').attr('title', function () {
    return _flowDb2.default.getTooltip(this.id);
  });

  var padding = 8;
  var width = g.maxX - g.minX + padding * 2;
  var height = g.maxY - g.minY + padding * 2;
  svg.attr('width', '100%');
  svg.attr('style', 'max-width: ' + width + 'px;');
  svg.attr('viewBox', '0 0 ' + width + ' ' + height);
  svg.select('g').attr('transform', 'translate(' + (padding - g.minX) + ', ' + (padding - g.minY) + ')');

  // Index nodes
  _flowDb2.default.indexNodes('subGraph' + i);

  for (i = 0; i < subGraphs.length; i++) {
    subG = subGraphs[i];

    if (subG.title !== 'undefined') {
      var clusterRects = document.querySelectorAll('#' + id + ' #' + subG.id + ' rect');
      var clusterEl = document.querySelectorAll('#' + id + ' #' + subG.id);

      var xPos = clusterRects[0].x.baseVal.value;
      var yPos = clusterRects[0].y.baseVal.value;
      var _width = clusterRects[0].width.baseVal.value;
      var cluster = d3.select(clusterEl[0]);
      var te = cluster.append('text');
      te.attr('x', xPos + _width / 2);
      te.attr('y', yPos + 14);
      te.attr('fill', 'black');
      te.attr('stroke', 'none');
      te.attr('id', id + 'Text');
      te.style('text-anchor', 'middle');

      if (typeof subG.title === 'undefined') {
        te.text('Undef');
      } else {
        te.text(subG.title);
      }
    }
  }

  // Add label rects for non html labels
  if (!conf.htmlLabels) {
    var labels = document.querySelectorAll('#' + id + ' .edgeLabel .label');
    for (var k = 0; k < labels.length; k++) {
      var label = labels[k];

      // Get dimensions of label
      var dim = label.getBBox();

      var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('rx', 0);
      rect.setAttribute('ry', 0);
      rect.setAttribute('width', dim.width);
      rect.setAttribute('height', dim.height);
      rect.setAttribute('style', 'fill:#e8e8e8;');

      label.insertBefore(rect, label.firstChild);
    }
  }
};

exports.default = {
  setConf: setConf,
  addVertices: addVertices,
  addEdges: addEdges,
  getClasses: getClasses,
  draw: draw
};

/***/ }),

/***/ "./src/diagrams/flowchart/parser/flow.js":
/*!***********************************************!*\
  !*** ./src/diagrams/flowchart/parser/flow.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 4],
        $V1 = [1, 3],
        $V2 = [1, 5],
        $V3 = [1, 8, 9, 10, 11, 13, 18, 30, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $V4 = [2, 2],
        $V5 = [1, 12],
        $V6 = [1, 13],
        $V7 = [1, 14],
        $V8 = [1, 15],
        $V9 = [1, 31],
        $Va = [1, 33],
        $Vb = [1, 22],
        $Vc = [1, 34],
        $Vd = [1, 24],
        $Ve = [1, 25],
        $Vf = [1, 26],
        $Vg = [1, 27],
        $Vh = [1, 28],
        $Vi = [1, 38],
        $Vj = [1, 40],
        $Vk = [1, 35],
        $Vl = [1, 39],
        $Vm = [1, 45],
        $Vn = [1, 44],
        $Vo = [1, 36],
        $Vp = [1, 37],
        $Vq = [1, 41],
        $Vr = [1, 42],
        $Vs = [1, 43],
        $Vt = [1, 8, 9, 10, 11, 13, 18, 30, 32, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $Vu = [1, 53],
        $Vv = [1, 52],
        $Vw = [1, 54],
        $Vx = [1, 72],
        $Vy = [1, 80],
        $Vz = [1, 81],
        $VA = [1, 66],
        $VB = [1, 65],
        $VC = [1, 85],
        $VD = [1, 84],
        $VE = [1, 82],
        $VF = [1, 83],
        $VG = [1, 73],
        $VH = [1, 68],
        $VI = [1, 67],
        $VJ = [1, 63],
        $VK = [1, 75],
        $VL = [1, 76],
        $VM = [1, 77],
        $VN = [1, 78],
        $VO = [1, 79],
        $VP = [1, 70],
        $VQ = [1, 69],
        $VR = [8, 9, 11],
        $VS = [8, 9, 11, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64],
        $VT = [1, 115],
        $VU = [8, 9, 10, 11, 13, 15, 18, 36, 38, 40, 42, 46, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $VV = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 30, 32, 36, 37, 38, 39, 40, 41, 42, 43, 46, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 78, 81, 84, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $VW = [1, 117],
        $VX = [1, 118],
        $VY = [8, 9, 10, 11, 13, 18, 30, 32, 46, 71, 72, 73, 74, 75, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $VZ = [8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 30, 32, 37, 39, 41, 43, 46, 50, 51, 52, 53, 54, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 78, 81, 84, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $V_ = [13, 18, 46, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $V$ = [13, 18, 46, 49, 65, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98],
        $V01 = [1, 191],
        $V11 = [1, 188],
        $V21 = [1, 195],
        $V31 = [1, 192],
        $V41 = [1, 189],
        $V51 = [1, 196],
        $V61 = [1, 186],
        $V71 = [1, 187],
        $V81 = [1, 190],
        $V91 = [1, 193],
        $Va1 = [1, 194],
        $Vb1 = [1, 213],
        $Vc1 = [8, 9, 11, 86],
        $Vd1 = [8, 9, 10, 11, 46, 71, 80, 81, 84, 86, 88, 89, 90, 91, 92];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "mermaidDoc": 3, "graphConfig": 4, "document": 5, "line": 6, "statement": 7, "SEMI": 8, "NEWLINE": 9, "SPACE": 10, "EOF": 11, "GRAPH": 12, "DIR": 13, "FirstStmtSeperator": 14, "TAGEND": 15, "TAGSTART": 16, "UP": 17, "DOWN": 18, "ending": 19, "endToken": 20, "spaceList": 21, "spaceListNewline": 22, "verticeStatement": 23, "separator": 24, "styleStatement": 25, "linkStyleStatement": 26, "classDefStatement": 27, "classStatement": 28, "clickStatement": 29, "subgraph": 30, "text": 31, "end": 32, "vertex": 33, "link": 34, "alphaNum": 35, "SQS": 36, "SQE": 37, "PS": 38, "PE": 39, "(-": 40, "-)": 41, "DIAMOND_START": 42, "DIAMOND_STOP": 43, "alphaNumStatement": 44, "alphaNumToken": 45, "MINUS": 46, "linkStatement": 47, "arrowText": 48, "TESTSTR": 49, "--": 50, "ARROW_POINT": 51, "ARROW_CIRCLE": 52, "ARROW_CROSS": 53, "ARROW_OPEN": 54, "-.": 55, "DOTTED_ARROW_POINT": 56, "DOTTED_ARROW_CIRCLE": 57, "DOTTED_ARROW_CROSS": 58, "DOTTED_ARROW_OPEN": 59, "==": 60, "THICK_ARROW_POINT": 61, "THICK_ARROW_CIRCLE": 62, "THICK_ARROW_CROSS": 63, "THICK_ARROW_OPEN": 64, "PIPE": 65, "textToken": 66, "STR": 67, "commentText": 68, "commentToken": 69, "keywords": 70, "STYLE": 71, "LINKSTYLE": 72, "CLASSDEF": 73, "CLASS": 74, "CLICK": 75, "textNoTags": 76, "textNoTagsToken": 77, "DEFAULT": 78, "stylesOpt": 79, "HEX": 80, "NUM": 81, "INTERPOLATE": 82, "commentStatement": 83, "PCT": 84, "style": 85, "COMMA": 86, "styleComponent": 87, "ALPHA": 88, "COLON": 89, "UNIT": 90, "BRKT": 91, "DOT": 92, "graphCodeTokens": 93, "PUNCTUATION": 94, "UNICODE_TEXT": 95, "PLUS": 96, "EQUALS": 97, "MULT": 98, "TAG_START": 99, "TAG_END": 100, "QUOTE": 101, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 8: "SEMI", 9: "NEWLINE", 10: "SPACE", 11: "EOF", 12: "GRAPH", 13: "DIR", 15: "TAGEND", 16: "TAGSTART", 17: "UP", 18: "DOWN", 30: "subgraph", 32: "end", 36: "SQS", 37: "SQE", 38: "PS", 39: "PE", 40: "(-", 41: "-)", 42: "DIAMOND_START", 43: "DIAMOND_STOP", 46: "MINUS", 49: "TESTSTR", 50: "--", 51: "ARROW_POINT", 52: "ARROW_CIRCLE", 53: "ARROW_CROSS", 54: "ARROW_OPEN", 55: "-.", 56: "DOTTED_ARROW_POINT", 57: "DOTTED_ARROW_CIRCLE", 58: "DOTTED_ARROW_CROSS", 59: "DOTTED_ARROW_OPEN", 60: "==", 61: "THICK_ARROW_POINT", 62: "THICK_ARROW_CIRCLE", 63: "THICK_ARROW_CROSS", 64: "THICK_ARROW_OPEN", 65: "PIPE", 67: "STR", 71: "STYLE", 72: "LINKSTYLE", 73: "CLASSDEF", 74: "CLASS", 75: "CLICK", 78: "DEFAULT", 80: "HEX", 81: "NUM", 82: "INTERPOLATE", 84: "PCT", 86: "COMMA", 88: "ALPHA", 89: "COLON", 90: "UNIT", 91: "BRKT", 92: "DOT", 94: "PUNCTUATION", 95: "UNICODE_TEXT", 96: "PLUS", 97: "EQUALS", 98: "MULT", 99: "TAG_START", 100: "TAG_END", 101: "QUOTE" },
        productions_: [0, [3, 2], [5, 0], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [4, 2], [4, 2], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [19, 2], [19, 1], [20, 1], [20, 1], [20, 1], [14, 1], [14, 1], [14, 2], [22, 2], [22, 2], [22, 1], [22, 1], [21, 2], [21, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 5], [7, 4], [24, 1], [24, 1], [24, 1], [23, 3], [23, 1], [33, 4], [33, 5], [33, 6], [33, 7], [33, 4], [33, 5], [33, 4], [33, 5], [33, 4], [33, 5], [33, 4], [33, 5], [33, 1], [33, 2], [35, 1], [35, 2], [44, 1], [44, 1], [44, 1], [44, 1], [34, 2], [34, 3], [34, 3], [34, 1], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [34, 3], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [47, 1], [48, 3], [31, 1], [31, 2], [31, 1], [68, 1], [68, 2], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [70, 1], [76, 1], [76, 2], [27, 5], [27, 5], [28, 5], [29, 5], [29, 7], [29, 5], [29, 7], [25, 5], [25, 5], [26, 5], [26, 5], [26, 9], [26, 9], [26, 7], [26, 7], [83, 3], [79, 1], [79, 3], [85, 1], [85, 2], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [87, 1], [69, 1], [69, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [66, 1], [77, 1], [77, 1], [77, 1], [77, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [45, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1], [93, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 2:
                    this.$ = [];
                    break;
                case 3:

                    if ($$[$0] !== []) {
                        $$[$0 - 1].push($$[$0]);
                    }
                    this.$ = $$[$0 - 1];
                    break;
                case 4:case 57:case 59:case 60:case 92:case 94:case 95:case 108:
                    this.$ = $$[$0];
                    break;
                case 11:
                    yy.setDirection($$[$0 - 1]);this.$ = $$[$0 - 1];
                    break;
                case 12:
                    yy.setDirection("LR");this.$ = $$[$0 - 1];
                    break;
                case 13:
                    yy.setDirection("RL");this.$ = $$[$0 - 1];
                    break;
                case 14:
                    yy.setDirection("BT");this.$ = $$[$0 - 1];
                    break;
                case 15:
                    yy.setDirection("TB");this.$ = $$[$0 - 1];
                    break;
                case 30:
                    this.$ = $$[$0 - 1];
                    break;
                case 31:case 32:case 33:case 34:case 35:
                    this.$ = [];
                    break;
                case 36:
                    this.$ = yy.addSubGraph($$[$0 - 1], $$[$0 - 3]);
                    break;
                case 37:
                    this.$ = yy.addSubGraph($$[$0 - 1], undefined);
                    break;
                case 41:
                    yy.addLink($$[$0 - 2], $$[$0], $$[$0 - 1]);this.$ = [$$[$0 - 2], $$[$0]];
                    break;
                case 42:
                    this.$ = [$$[$0]];
                    break;
                case 43:
                    this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'square');
                    break;
                case 44:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'square');
                    break;
                case 45:
                    this.$ = $$[$0 - 5];yy.addVertex($$[$0 - 5], $$[$0 - 2], 'circle');
                    break;
                case 46:
                    this.$ = $$[$0 - 6];yy.addVertex($$[$0 - 6], $$[$0 - 3], 'circle');
                    break;
                case 47:
                    this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'ellipse');
                    break;
                case 48:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'ellipse');
                    break;
                case 49:
                    this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'round');
                    break;
                case 50:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'round');
                    break;
                case 51:
                    this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'diamond');
                    break;
                case 52:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'diamond');
                    break;
                case 53:
                    this.$ = $$[$0 - 3];yy.addVertex($$[$0 - 3], $$[$0 - 1], 'odd');
                    break;
                case 54:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 4], $$[$0 - 2], 'odd');
                    break;
                case 55:
                    this.$ = $$[$0];yy.addVertex($$[$0]);
                    break;
                case 56:
                    this.$ = $$[$0 - 1];yy.addVertex($$[$0 - 1]);
                    break;
                case 58:case 93:case 96:case 109:
                    this.$ = $$[$0 - 1] + '' + $$[$0];
                    break;
                case 61:
                    this.$ = 'v';
                    break;
                case 62:
                    this.$ = '-';
                    break;
                case 63:
                    $$[$0 - 1].text = $$[$0];this.$ = $$[$0 - 1];
                    break;
                case 64:case 65:
                    $$[$0 - 2].text = $$[$0 - 1];this.$ = $$[$0 - 2];
                    break;
                case 66:
                    this.$ = $$[$0];
                    break;
                case 67:
                    this.$ = { "type": "arrow", "stroke": "normal", "text": $$[$0 - 1] };
                    break;
                case 68:
                    this.$ = { "type": "arrow_circle", "stroke": "normal", "text": $$[$0 - 1] };
                    break;
                case 69:
                    this.$ = { "type": "arrow_cross", "stroke": "normal", "text": $$[$0 - 1] };
                    break;
                case 70:
                    this.$ = { "type": "arrow_open", "stroke": "normal", "text": $$[$0 - 1] };
                    break;
                case 71:
                    this.$ = { "type": "arrow", "stroke": "dotted", "text": $$[$0 - 1] };
                    break;
                case 72:
                    this.$ = { "type": "arrow_circle", "stroke": "dotted", "text": $$[$0 - 1] };
                    break;
                case 73:
                    this.$ = { "type": "arrow_cross", "stroke": "dotted", "text": $$[$0 - 1] };
                    break;
                case 74:
                    this.$ = { "type": "arrow_open", "stroke": "dotted", "text": $$[$0 - 1] };
                    break;
                case 75:
                    this.$ = { "type": "arrow", "stroke": "thick", "text": $$[$0 - 1] };
                    break;
                case 76:
                    this.$ = { "type": "arrow_circle", "stroke": "thick", "text": $$[$0 - 1] };
                    break;
                case 77:
                    this.$ = { "type": "arrow_cross", "stroke": "thick", "text": $$[$0 - 1] };
                    break;
                case 78:
                    this.$ = { "type": "arrow_open", "stroke": "thick", "text": $$[$0 - 1] };
                    break;
                case 79:
                    this.$ = { "type": "arrow", "stroke": "normal" };
                    break;
                case 80:
                    this.$ = { "type": "arrow_circle", "stroke": "normal" };
                    break;
                case 81:
                    this.$ = { "type": "arrow_cross", "stroke": "normal" };
                    break;
                case 82:
                    this.$ = { "type": "arrow_open", "stroke": "normal" };
                    break;
                case 83:
                    this.$ = { "type": "arrow", "stroke": "dotted" };
                    break;
                case 84:
                    this.$ = { "type": "arrow_circle", "stroke": "dotted" };
                    break;
                case 85:
                    this.$ = { "type": "arrow_cross", "stroke": "dotted" };
                    break;
                case 86:
                    this.$ = { "type": "arrow_open", "stroke": "dotted" };
                    break;
                case 87:
                    this.$ = { "type": "arrow", "stroke": "thick" };
                    break;
                case 88:
                    this.$ = { "type": "arrow_circle", "stroke": "thick" };
                    break;
                case 89:
                    this.$ = { "type": "arrow_cross", "stroke": "thick" };
                    break;
                case 90:
                    this.$ = { "type": "arrow_open", "stroke": "thick" };
                    break;
                case 91:
                    this.$ = $$[$0 - 1];
                    break;
                case 110:case 111:
                    this.$ = $$[$0 - 4];yy.addClass($$[$0 - 2], $$[$0]);
                    break;
                case 112:
                    this.$ = $$[$0 - 4];yy.setClass($$[$0 - 2], $$[$0]);
                    break;
                case 113:
                    this.$ = $$[$0 - 4];yy.setClickEvent($$[$0 - 2], $$[$0], undefined, undefined);
                    break;
                case 114:
                    this.$ = $$[$0 - 6];yy.setClickEvent($$[$0 - 4], $$[$0 - 2], undefined, $$[$0]);
                    break;
                case 115:
                    this.$ = $$[$0 - 4];yy.setClickEvent($$[$0 - 2], undefined, $$[$0], undefined);
                    break;
                case 116:
                    this.$ = $$[$0 - 6];yy.setClickEvent($$[$0 - 4], undefined, $$[$0 - 2], $$[$0]);
                    break;
                case 117:
                    this.$ = $$[$0 - 4];yy.addVertex($$[$0 - 2], undefined, undefined, $$[$0]);
                    break;
                case 118:case 119:case 120:
                    this.$ = $$[$0 - 4];yy.updateLink($$[$0 - 2], $$[$0]);
                    break;
                case 121:case 122:
                    this.$ = $$[$0 - 8];yy.updateLinkInterpolate($$[$0 - 6], $$[$0 - 2]);yy.updateLink($$[$0 - 6], $$[$0]);
                    break;
                case 123:case 124:
                    this.$ = $$[$0 - 6];yy.updateLinkInterpolate($$[$0 - 4], $$[$0]);
                    break;
                case 126:
                    this.$ = [$$[$0]];
                    break;
                case 127:
                    $$[$0 - 2].push($$[$0]);this.$ = $$[$0 - 2];
                    break;
                case 129:
                    this.$ = $$[$0 - 1] + $$[$0];
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 9: $V0, 10: $V1, 12: $V2 }, { 1: [3] }, o($V3, $V4, { 5: 6 }), { 4: 7, 9: $V0, 10: $V1, 12: $V2 }, { 4: 8, 9: $V0, 10: $V1, 12: $V2 }, { 10: [1, 9] }, { 1: [2, 1], 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V3, [2, 9]), o($V3, [2, 10]), { 13: [1, 46], 15: [1, 47], 16: [1, 48], 17: [1, 49], 18: [1, 50] }, o($Vt, [2, 3]), o($Vt, [2, 4]), o($Vt, [2, 5]), o($Vt, [2, 6]), o($Vt, [2, 7]), o($Vt, [2, 8]), { 8: $Vu, 9: $Vv, 11: $Vw, 24: 51 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 55 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 56 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 57 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 58 }, { 8: $Vu, 9: $Vv, 11: $Vw, 24: 59 }, { 8: $Vu, 9: $Vv, 10: $Vx, 11: $Vw, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 24: 61, 30: $VE, 31: 60, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VR, [2, 42], { 34: 86, 47: 87, 50: [1, 88], 51: [1, 91], 52: [1, 92], 53: [1, 93], 54: [1, 94], 55: [1, 89], 56: [1, 95], 57: [1, 96], 58: [1, 97], 59: [1, 98], 60: [1, 90], 61: [1, 99], 62: [1, 100], 63: [1, 101], 64: [1, 102] }), { 10: [1, 103] }, { 10: [1, 104] }, { 10: [1, 105] }, { 10: [1, 106] }, { 10: [1, 107] }, o($VS, [2, 55], { 45: 32, 21: 113, 44: 114, 10: $VT, 13: $V9, 15: [1, 112], 18: $Va, 36: [1, 108], 38: [1, 109], 40: [1, 110], 42: [1, 111], 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VU, [2, 57]), o($VU, [2, 59]), o($VU, [2, 60]), o($VU, [2, 61]), o($VU, [2, 62]), o($VV, [2, 154]), o($VV, [2, 155]), o($VV, [2, 156]), o($VV, [2, 157]), o($VV, [2, 158]), o($VV, [2, 159]), o($VV, [2, 160]), o($VV, [2, 161]), o($VV, [2, 162]), o($VV, [2, 163]), o($VV, [2, 164]), { 8: $VW, 9: $VX, 10: $VT, 14: 116, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 120, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 121, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 122, 21: 119 }, { 8: $VW, 9: $VX, 10: $VT, 14: 123, 21: 119 }, o($Vt, [2, 30]), o($Vt, [2, 38]), o($Vt, [2, 39]), o($Vt, [2, 40]), o($Vt, [2, 31]), o($Vt, [2, 32]), o($Vt, [2, 33]), o($Vt, [2, 34]), o($Vt, [2, 35]), { 8: $Vu, 9: $Vv, 10: $Vx, 11: $Vw, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 24: 124, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VY, $V4, { 5: 126 }), o($VZ, [2, 92]), o($VZ, [2, 94]), o($VZ, [2, 143]), o($VZ, [2, 144]), o($VZ, [2, 145]), o($VZ, [2, 146]), o($VZ, [2, 147]), o($VZ, [2, 148]), o($VZ, [2, 149]), o($VZ, [2, 150]), o($VZ, [2, 151]), o($VZ, [2, 152]), o($VZ, [2, 153]), o($VZ, [2, 97]), o($VZ, [2, 98]), o($VZ, [2, 99]), o($VZ, [2, 100]), o($VZ, [2, 101]), o($VZ, [2, 102]), o($VZ, [2, 103]), o($VZ, [2, 104]), o($VZ, [2, 105]), o($VZ, [2, 106]), o($VZ, [2, 107]), { 13: $V9, 18: $Va, 33: 127, 35: 29, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V_, [2, 66], { 48: 128, 49: [1, 129], 65: [1, 130] }), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 131, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 132, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 133, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V$, [2, 79]), o($V$, [2, 80]), o($V$, [2, 81]), o($V$, [2, 82]), o($V$, [2, 83]), o($V$, [2, 84]), o($V$, [2, 85]), o($V$, [2, 86]), o($V$, [2, 87]), o($V$, [2, 88]), o($V$, [2, 89]), o($V$, [2, 90]), { 13: $V9, 18: $Va, 35: 134, 44: 30, 45: 32, 46: $Vc, 80: [1, 135], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 78: [1, 136], 81: [1, 137] }, { 13: $V9, 18: $Va, 35: 139, 44: 30, 45: 32, 46: $Vc, 78: [1, 138], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 140, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 141, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 142, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 144, 32: $VF, 38: [1, 143], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 145, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 146, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 147, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 56]), o($VU, [2, 58]), o($VS, [2, 29], { 21: 148, 10: $VT }), o($V3, [2, 11]), o($V3, [2, 21]), o($V3, [2, 22]), { 9: [1, 149] }, o($V3, [2, 12]), o($V3, [2, 13]), o($V3, [2, 14]), o($V3, [2, 15]), o($VY, $V4, { 5: 150 }), o($VZ, [2, 93]), { 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 32: [1, 151], 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VR, [2, 41]), o($V_, [2, 63], { 10: [1, 152] }), { 10: [1, 153] }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 154, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 51: [1, 155], 52: [1, 156], 53: [1, 157], 54: [1, 158], 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 56: [1, 159], 57: [1, 160], 58: [1, 161], 59: [1, 162], 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 61: [1, 163], 62: [1, 164], 63: [1, 165], 64: [1, 166], 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 167], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 168] }, { 10: [1, 169] }, { 10: [1, 170] }, { 10: [1, 171] }, { 10: [1, 172], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 173], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: [1, 174], 13: $V9, 18: $Va, 44: 114, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 37: [1, 175], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 31: 176, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 62, 67: $VJ, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 39: [1, 177], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 41: [1, 178], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 43: [1, 179], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 37: [1, 180], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 28]), o($V3, [2, 23]), { 6: 10, 7: 11, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 13: $V9, 18: $Va, 23: 16, 25: 17, 26: 18, 27: 19, 28: 20, 29: 21, 30: $Vb, 32: [1, 181], 33: 23, 35: 29, 44: 30, 45: 32, 46: $Vc, 71: $Vd, 72: $Ve, 73: $Vf, 74: $Vg, 75: $Vh, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($Vt, [2, 37]), o($V_, [2, 65]), o($V_, [2, 64]), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 45: 71, 46: $VG, 50: $VH, 60: $VI, 65: [1, 182], 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($V_, [2, 67]), o($V_, [2, 68]), o($V_, [2, 69]), o($V_, [2, 70]), o($V_, [2, 71]), o($V_, [2, 72]), o($V_, [2, 73]), o($V_, [2, 74]), o($V_, [2, 75]), o($V_, [2, 76]), o($V_, [2, 77]), o($V_, [2, 78]), { 10: $V01, 46: $V11, 71: $V21, 79: 183, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 197, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 198, 80: $V31, 81: $V41, 82: [1, 199], 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 200, 80: $V31, 81: $V41, 82: [1, 201], 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 202, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 203, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 13: $V9, 18: $Va, 35: 204, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 205, 44: 30, 45: 32, 46: $Vc, 67: [1, 206], 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 43], { 21: 207, 10: $VT }), { 10: $Vx, 12: $Vy, 13: $Vz, 15: $VA, 16: $VB, 17: $VC, 18: $VD, 30: $VE, 32: $VF, 39: [1, 208], 45: 71, 46: $VG, 50: $VH, 60: $VI, 66: 125, 70: 74, 71: $VK, 72: $VL, 73: $VM, 74: $VN, 75: $VO, 77: 64, 78: $VP, 81: $Vi, 84: $VQ, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, o($VS, [2, 49], { 21: 209, 10: $VT }), o($VS, [2, 47], { 21: 210, 10: $VT }), o($VS, [2, 51], { 21: 211, 10: $VT }), o($VS, [2, 53], { 21: 212, 10: $VT }), o($Vt, [2, 36]), o([10, 13, 18, 46, 81, 86, 88, 89, 91, 92, 94, 95, 96, 97, 98], [2, 91]), o($VR, [2, 117], { 86: $Vb1 }), o($Vc1, [2, 126], { 87: 214, 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }), o($Vd1, [2, 128]), o($Vd1, [2, 130]), o($Vd1, [2, 131]), o($Vd1, [2, 132]), o($Vd1, [2, 133]), o($Vd1, [2, 134]), o($Vd1, [2, 135]), o($Vd1, [2, 136]), o($Vd1, [2, 137]), o($Vd1, [2, 138]), o($Vd1, [2, 139]), o($Vd1, [2, 140]), o($VR, [2, 118], { 86: $Vb1 }), o($VR, [2, 119], { 86: $Vb1 }), { 10: [1, 215] }, o($VR, [2, 120], { 86: $Vb1 }), { 10: [1, 216] }, o($VR, [2, 110], { 86: $Vb1 }), o($VR, [2, 111], { 86: $Vb1 }), o($VR, [2, 112], { 45: 32, 44: 114, 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 113], { 45: 32, 44: 114, 10: [1, 217], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 115], { 10: [1, 218] }), o($VS, [2, 44]), { 39: [1, 219] }, o($VS, [2, 50]), o($VS, [2, 48]), o($VS, [2, 52]), o($VS, [2, 54]), { 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 85: 220, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, o($Vd1, [2, 129]), { 13: $V9, 18: $Va, 35: 221, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 13: $V9, 18: $Va, 35: 222, 44: 30, 45: 32, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }, { 67: [1, 223] }, { 67: [1, 224] }, o($VS, [2, 45], { 21: 225, 10: $VT }), o($Vc1, [2, 127], { 87: 214, 10: $V01, 46: $V11, 71: $V21, 80: $V31, 81: $V41, 84: $V51, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }), o($VR, [2, 123], { 45: 32, 44: 114, 10: [1, 226], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 124], { 45: 32, 44: 114, 10: [1, 227], 13: $V9, 18: $Va, 46: $Vc, 81: $Vi, 86: $Vj, 88: $Vk, 89: $Vl, 91: $Vm, 92: $Vn, 94: $Vo, 95: $Vp, 96: $Vq, 97: $Vr, 98: $Vs }), o($VR, [2, 114]), o($VR, [2, 116]), o($VS, [2, 46]), { 10: $V01, 46: $V11, 71: $V21, 79: 228, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, { 10: $V01, 46: $V11, 71: $V21, 79: 229, 80: $V31, 81: $V41, 84: $V51, 85: 184, 87: 185, 88: $V61, 89: $V71, 90: $V81, 91: $V91, 92: $Va1 }, o($VR, [2, 121], { 86: $Vb1 }), o($VR, [2, 122], { 86: $Vb1 })],
        defaultActions: {},
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = tstack.pop() || lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    if (token instanceof Array) {
                        tstack = token;
                        token = tstack.pop();
                    }
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: {},
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        /* do nothing */
                        break;
                    case 1:
                        this.begin("string");
                        break;
                    case 2:
                        this.popState();
                        break;
                    case 3:
                        return "STR";
                        break;
                    case 4:
                        return 71;
                        break;
                    case 5:
                        return 78;
                        break;
                    case 6:
                        return 72;
                        break;
                    case 7:
                        return 82;
                        break;
                    case 8:
                        return 73;
                        break;
                    case 9:
                        return 74;
                        break;
                    case 10:
                        return 75;
                        break;
                    case 11:
                        return 12;
                        break;
                    case 12:
                        return 30;
                        break;
                    case 13:
                        return 32;
                        break;
                    case 14:
                        return 13;
                        break;
                    case 15:
                        return 13;
                        break;
                    case 16:
                        return 13;
                        break;
                    case 17:
                        return 13;
                        break;
                    case 18:
                        return 13;
                        break;
                    case 19:
                        return 13;
                        break;
                    case 20:
                        return 81;
                        break;
                    case 21:
                        return 91;
                        break;
                    case 22:
                        return 89;
                        break;
                    case 23:
                        return 8;
                        break;
                    case 24:
                        return 86;
                        break;
                    case 25:
                        return 98;
                        break;
                    case 26:
                        return 16;
                        break;
                    case 27:
                        return 15;
                        break;
                    case 28:
                        return 17;
                        break;
                    case 29:
                        return 18;
                        break;
                    case 30:
                        return 53;
                        break;
                    case 31:
                        return 51;
                        break;
                    case 32:
                        return 52;
                        break;
                    case 33:
                        return 54;
                        break;
                    case 34:
                        return 58;
                        break;
                    case 35:
                        return 56;
                        break;
                    case 36:
                        return 57;
                        break;
                    case 37:
                        return 59;
                        break;
                    case 38:
                        return 58;
                        break;
                    case 39:
                        return 56;
                        break;
                    case 40:
                        return 57;
                        break;
                    case 41:
                        return 59;
                        break;
                    case 42:
                        return 63;
                        break;
                    case 43:
                        return 61;
                        break;
                    case 44:
                        return 62;
                        break;
                    case 45:
                        return 64;
                        break;
                    case 46:
                        return 50;
                        break;
                    case 47:
                        return 55;
                        break;
                    case 48:
                        return 60;
                        break;
                    case 49:
                        return 40;
                        break;
                    case 50:
                        return 41;
                        break;
                    case 51:
                        return 46;
                        break;
                    case 52:
                        return 92;
                        break;
                    case 53:
                        return 96;
                        break;
                    case 54:
                        return 84;
                        break;
                    case 55:
                        return 97;
                        break;
                    case 56:
                        return 97;
                        break;
                    case 57:
                        return 88;
                        break;
                    case 58:
                        return 94;
                        break;
                    case 59:
                        return 95;
                        break;
                    case 60:
                        return 65;
                        break;
                    case 61:
                        return 38;
                        break;
                    case 62:
                        return 39;
                        break;
                    case 63:
                        return 36;
                        break;
                    case 64:
                        return 37;
                        break;
                    case 65:
                        return 42;
                        break;
                    case 66:
                        return 43;
                        break;
                    case 67:
                        return 101;
                        break;
                    case 68:
                        return 9;
                        break;
                    case 69:
                        return 10;
                        break;
                    case 70:
                        return 11;
                        break;
                }
            },
            rules: [/^(?:%%[^\n]*)/, /^(?:["])/, /^(?:["])/, /^(?:[^"]*)/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:click\b)/, /^(?:graph\b)/, /^(?:subgraph\b)/, /^(?:end\b\s*)/, /^(?:LR\b)/, /^(?:RL\b)/, /^(?:TB\b)/, /^(?:BT\b)/, /^(?:TD\b)/, /^(?:BR\b)/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:v\b)/, /^(?:\s*--[x]\s*)/, /^(?:\s*-->\s*)/, /^(?:\s*--[o]\s*)/, /^(?:\s*---\s*)/, /^(?:\s*-\.-[x]\s*)/, /^(?:\s*-\.->\s*)/, /^(?:\s*-\.-[o]\s*)/, /^(?:\s*-\.-\s*)/, /^(?:\s*.-[x]\s*)/, /^(?:\s*\.->\s*)/, /^(?:\s*\.-[o]\s*)/, /^(?:\s*\.-\s*)/, /^(?:\s*==[x]\s*)/, /^(?:\s*==>\s*)/, /^(?:\s*==[o]\s*)/, /^(?:\s*==[\=]\s*)/, /^(?:\s*--\s*)/, /^(?:\s*-\.\s*)/, /^(?:\s*==\s*)/, /^(?:\(-)/, /^(?:-\))/, /^(?:-)/, /^(?:\.)/, /^(?:\+)/, /^(?:%)/, /^(?:=)/, /^(?:=)/, /^(?:[A-Za-z]+)/, /^(?:[!"#$%&'*+,-.`?\\_\/])/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\()/, /^(?:\))/, /^(?:\[)/, /^(?:\])/, /^(?:\{)/, /^(?:\})/, /^(?:")/, /^(?:\n+)/, /^(?:\s)/, /^(?:$)/],
            conditions: { "string": { "rules": [2, 3], "inclusive": false }, "INITIAL": { "rules": [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js").readFileSync(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js").normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/diagrams/gantt/ganttDb.js":
/*!***************************************!*\
  !*** ./src/diagrams/gantt/ganttDb.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addTaskOrg = exports.findTaskById = exports.addTask = exports.getTasks = exports.addSection = exports.getTitle = exports.setTitle = exports.setDateFormat = exports.getAxisFormat = exports.setAxisFormat = exports.clear = undefined;

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dateFormat = '';
var axisFormat = '';
var title = '';
var sections = [];
var tasks = [];
var currentSection = '';

var clear = exports.clear = function clear() {
  sections = [];
  tasks = [];
  currentSection = '';
  title = '';
  taskCnt = 0;
  lastTask = undefined;
  lastTaskID = undefined;
  rawTasks = [];
};

var setAxisFormat = exports.setAxisFormat = function setAxisFormat(txt) {
  axisFormat = txt;
};

var getAxisFormat = exports.getAxisFormat = function getAxisFormat() {
  return axisFormat;
};

var setDateFormat = exports.setDateFormat = function setDateFormat(txt) {
  dateFormat = txt;
};

var setTitle = exports.setTitle = function setTitle(txt) {
  title = txt;
};

var getTitle = exports.getTitle = function getTitle() {
  return title;
};

var addSection = exports.addSection = function addSection(txt) {
  currentSection = txt;
  sections.push(txt);
};

var getTasks = exports.getTasks = function getTasks() {
  var allItemsPricessed = compileTasks();
  var maxDepth = 10;
  var iterationCount = 0;
  while (!allItemsPricessed && iterationCount < maxDepth) {
    allItemsPricessed = compileTasks();
    iterationCount++;
  }

  tasks = rawTasks;

  return tasks;
};

var getStartDate = function getStartDate(prevTime, dateFormat, str) {
  str = str.trim();

  // Test for after
  var re = /^after\s+([\d\w-]+)/;
  var afterStatement = re.exec(str.trim());

  if (afterStatement !== null) {
    var task = findTaskById(afterStatement[1]);

    if (typeof task === 'undefined') {
      var dt = new Date();
      dt.setHours(0, 0, 0, 0);
      return dt;
    }
    return task.endTime;
  }

  // Check for actual date set
  if ((0, _moment2.default)(str, dateFormat.trim(), true).isValid()) {
    return (0, _moment2.default)(str, dateFormat.trim(), true).toDate();
  } else {
    _logger.logger.debug('Invalid date:' + str);
    _logger.logger.debug('With date format:' + dateFormat.trim());
  }

  // Default date - now
  return new Date();
};

var getEndDate = function getEndDate(prevTime, dateFormat, str) {
  str = str.trim();

  // Check for actual date
  if ((0, _moment2.default)(str, dateFormat.trim(), true).isValid()) {
    return (0, _moment2.default)(str, dateFormat.trim()).toDate();
  }

  var d = (0, _moment2.default)(prevTime);
  // Check for length
  var re = /^([\d]+)([wdhms])/;
  var durationStatement = re.exec(str.trim());

  if (durationStatement !== null) {
    switch (durationStatement[2]) {
      case 's':
        d.add(durationStatement[1], 'seconds');
        break;
      case 'm':
        d.add(durationStatement[1], 'minutes');
        break;
      case 'h':
        d.add(durationStatement[1], 'hours');
        break;
      case 'd':
        d.add(durationStatement[1], 'days');
        break;
      case 'w':
        d.add(durationStatement[1], 'weeks');
        break;
    }
    return d.toDate();
  }
  // Default date - now
  return d.toDate();
};

var taskCnt = 0;
var parseId = function parseId(idStr) {
  if (typeof idStr === 'undefined') {
    taskCnt = taskCnt + 1;
    return 'task' + taskCnt;
  }
  return idStr;
};
// id, startDate, endDate
// id, startDate, length
// id, after x, endDate
// id, after x, length
// startDate, endDate
// startDate, length
// after x, endDate
// after x, length
// endDate
// length

var compileData = function compileData(prevTask, dataStr) {
  var ds = void 0;

  if (dataStr.substr(0, 1) === ':') {
    ds = dataStr.substr(1, dataStr.length);
  } else {
    ds = dataStr;
  }

  var data = ds.split(',');

  var task = {};

  // Get tags like active, done cand crit
  var matchFound = true;
  while (matchFound) {
    matchFound = false;
    if (data[0].match(/^\s*active\s*$/)) {
      task.active = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*done\s*$/)) {
      task.done = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*crit\s*$/)) {
      task.crit = true;
      data.shift(1);
      matchFound = true;
    }
  }
  for (var i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
  }

  switch (data.length) {
    case 1:
      task.id = parseId();
      task.startTime = prevTask.endTime;
      task.endTime = getEndDate(task.startTime, dateFormat, data[0]);
      break;
    case 2:
      task.id = parseId();
      task.startTime = getStartDate(undefined, dateFormat, data[0]);
      task.endTime = getEndDate(task.startTime, dateFormat, data[1]);
      break;
    case 3:
      task.id = parseId(data[0]);
      task.startTime = getStartDate(undefined, dateFormat, data[1]);
      task.endTime = getEndDate(task.startTime, dateFormat, data[2]);
      break;
    default:
  }

  return task;
};

var parseData = function parseData(prevTaskId, dataStr) {
  var ds = void 0;
  if (dataStr.substr(0, 1) === ':') {
    ds = dataStr.substr(1, dataStr.length);
  } else {
    ds = dataStr;
  }

  var data = ds.split(',');

  var task = {};

  // Get tags like active, done cand crit
  var matchFound = true;
  while (matchFound) {
    matchFound = false;
    if (data[0].match(/^\s*active\s*$/)) {
      task.active = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*done\s*$/)) {
      task.done = true;
      data.shift(1);
      matchFound = true;
    }
    if (data[0].match(/^\s*crit\s*$/)) {
      task.crit = true;
      data.shift(1);
      matchFound = true;
    }
  }
  for (var i = 0; i < data.length; i++) {
    data[i] = data[i].trim();
  }

  switch (data.length) {
    case 1:
      task.id = parseId();
      task.startTime = { type: 'prevTaskEnd', id: prevTaskId };
      task.endTime = { data: data[0] };
      break;
    case 2:
      task.id = parseId();
      task.startTime = { type: 'getStartDate', startData: data[0] };
      task.endTime = { data: data[1] };
      break;
    case 3:
      task.id = parseId(data[0]);
      task.startTime = { type: 'getStartDate', startData: data[1] };
      task.endTime = { data: data[2] };
      break;
    default:
  }

  return task;
};

var lastTask = void 0;
var lastTaskID = void 0;
var rawTasks = [];
var taskDb = {};
var addTask = exports.addTask = function addTask(descr, data) {
  var rawTask = {
    section: currentSection,
    type: currentSection,
    processed: false,
    raw: { data: data },
    task: descr
  };
  var taskInfo = parseData(lastTaskID, data);
  rawTask.raw.startTime = taskInfo.startTime;
  rawTask.raw.endTime = taskInfo.endTime;
  rawTask.id = taskInfo.id;
  rawTask.prevTaskId = lastTaskID;
  rawTask.active = taskInfo.active;
  rawTask.done = taskInfo.done;
  rawTask.crit = taskInfo.crit;

  var pos = rawTasks.push(rawTask);

  lastTaskID = rawTask.id;
  // Store cross ref
  taskDb[rawTask.id] = pos - 1;
};

var findTaskById = exports.findTaskById = function findTaskById(id) {
  var pos = taskDb[id];
  return rawTasks[pos];
};

var addTaskOrg = exports.addTaskOrg = function addTaskOrg(descr, data) {
  var newTask = {
    section: currentSection,
    type: currentSection,
    description: descr,
    task: descr
  };
  var taskInfo = compileData(lastTask, data);
  newTask.startTime = taskInfo.startTime;
  newTask.endTime = taskInfo.endTime;
  newTask.id = taskInfo.id;
  newTask.active = taskInfo.active;
  newTask.done = taskInfo.done;
  newTask.crit = taskInfo.crit;
  lastTask = newTask;
  tasks.push(newTask);
};

var compileTasks = function compileTasks() {
  var compileTask = function compileTask(pos) {
    var task = rawTasks[pos];
    var startTime = '';
    switch (rawTasks[pos].raw.startTime.type) {
      case 'prevTaskEnd':
        var prevTask = findTaskById(task.prevTaskId);
        task.startTime = prevTask.endTime;
        break;
      case 'getStartDate':
        startTime = getStartDate(undefined, dateFormat, rawTasks[pos].raw.startTime.startData);
        if (startTime) {
          rawTasks[pos].startTime = startTime;
        }
        break;
    }

    if (rawTasks[pos].startTime) {
      rawTasks[pos].endTime = getEndDate(rawTasks[pos].startTime, dateFormat, rawTasks[pos].raw.endTime.data);
      if (rawTasks[pos].endTime) {
        rawTasks[pos].processed = true;
      }
    }

    return rawTasks[pos].processed;
  };

  var allProcessed = true;
  for (var i = 0; i < rawTasks.length; i++) {
    compileTask(i);

    allProcessed = allProcessed && rawTasks[i].processed;
  }
  return allProcessed;
};

exports.default = {
  clear: clear,
  setDateFormat: setDateFormat,
  setAxisFormat: setAxisFormat,
  getAxisFormat: getAxisFormat,
  setTitle: setTitle,
  getTitle: getTitle,
  addSection: addSection,
  getTasks: getTasks,
  addTask: addTask,
  findTaskById: findTaskById,
  addTaskOrg: addTaskOrg
};

/***/ }),

/***/ "./src/diagrams/gantt/ganttRenderer.js":
/*!*********************************************!*\
  !*** ./src/diagrams/gantt/ganttRenderer.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.setConf = undefined;

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _gantt = __webpack_require__(/*! ./parser/gantt */ "./src/diagrams/gantt/parser/gantt.js");

var _ganttDb = __webpack_require__(/*! ./ganttDb */ "./src/diagrams/gantt/ganttDb.js");

var _ganttDb2 = _interopRequireDefault(_ganttDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_gantt.parser.yy = _ganttDb2.default;

var conf = {
  titleTopMargin: 25,
  barHeight: 20,
  barGap: 4,
  topPadding: 50,
  rightPadding: 75,
  leftPadding: 75,
  gridLineStartPadding: 35,
  fontSize: 11,
  fontFamily: '"Open-Sans", "sans-serif"'
};
var setConf = exports.setConf = function setConf(cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};
var w = void 0;
var draw = exports.draw = function draw(text, id) {
  _gantt.parser.yy.clear();
  _gantt.parser.parse(text);

  var elem = document.getElementById(id);
  w = elem.parentElement.offsetWidth;

  if (typeof w === 'undefined') {
    w = 1200;
  }

  if (typeof conf.useWidth !== 'undefined') {
    w = conf.useWidth;
  }

  var taskArray = _gantt.parser.yy.getTasks();

  // Set height based on number of tasks
  var h = taskArray.length * (conf.barHeight + conf.barGap) + 2 * conf.topPadding;

  elem.setAttribute('height', '100%');
  // Set viewBox
  elem.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  var svg = d3.select('[id="' + id + '"]');

  // Set timescale
  var timeScale = d3.scaleTime().domain([d3.min(taskArray, function (d) {
    return d.startTime;
  }), d3.max(taskArray, function (d) {
    return d.endTime;
  })]).rangeRound([0, w - conf.leftPadding - conf.rightPadding]);

  var categories = [];

  for (var i = 0; i < taskArray.length; i++) {
    categories.push(taskArray[i].type);
  }

  var catsUnfiltered = categories; // for vert labels

  categories = checkUnique(categories);

  makeGant(taskArray, w, h);
  if (typeof conf.useWidth !== 'undefined') {
    elem.setAttribute('width', w);
  }

  svg.append('text').text(_gantt.parser.yy.getTitle()).attr('x', w / 2).attr('y', conf.titleTopMargin).attr('class', 'titleText');

  function makeGant(tasks, pageWidth, pageHeight) {
    var barHeight = conf.barHeight;
    var gap = barHeight + conf.barGap;
    var topPadding = conf.topPadding;
    var leftPadding = conf.leftPadding;

    var colorScale = d3.scaleLinear().domain([0, categories.length]).range(['#00B9FA', '#F95002']).interpolate(d3.interpolateHcl);

    makeGrid(leftPadding, topPadding, pageWidth, pageHeight);
    drawRects(tasks, gap, topPadding, leftPadding, barHeight, colorScale, pageWidth, pageHeight);
    vertLabels(gap, topPadding, leftPadding, barHeight, colorScale);
    drawToday(leftPadding, topPadding, pageWidth, pageHeight);
  }

  function drawRects(theArray, theGap, theTopPad, theSidePad, theBarHeight, theColorScale, w, h) {
    svg.append('g').selectAll('rect').data(theArray).enter().append('rect').attr('x', 0).attr('y', function (d, i) {
      return i * theGap + theTopPad - 2;
    }).attr('width', function () {
      return w - conf.rightPadding / 2;
    }).attr('height', theGap).attr('class', function (d) {
      for (var _i = 0; _i < categories.length; _i++) {
        if (d.type === categories[_i]) {
          return 'section section' + _i % conf.numberSectionStyles;
        }
      }
      return 'section section0';
    });

    var rectangles = svg.append('g').selectAll('rect').data(theArray).enter();

    rectangles.append('rect').attr('rx', 3).attr('ry', 3).attr('x', function (d) {
      return timeScale(d.startTime) + theSidePad;
    }).attr('y', function (d, i) {
      return i * theGap + theTopPad;
    }).attr('width', function (d) {
      return timeScale(d.endTime) - timeScale(d.startTime);
    }).attr('height', theBarHeight).attr('class', function (d) {
      var res = 'task ';

      var secNum = 0;
      for (var _i2 = 0; _i2 < categories.length; _i2++) {
        if (d.type === categories[_i2]) {
          secNum = _i2 % conf.numberSectionStyles;
        }
      }

      if (d.active) {
        if (d.crit) {
          return res + ' activeCrit' + secNum;
        } else {
          return res + ' active' + secNum;
        }
      }

      if (d.done) {
        if (d.crit) {
          return res + ' doneCrit' + secNum;
        } else {
          return res + ' done' + secNum;
        }
      }

      if (d.crit) {
        return res + ' crit' + secNum;
      }

      return res + ' task' + secNum;
    });

    rectangles.append('text').text(function (d) {
      return d.task;
    }).attr('font-size', conf.fontSize).attr('x', function (d) {
      var startX = timeScale(d.startTime);
      var endX = timeScale(d.endTime);
      var textWidth = this.getBBox().width;

      // Check id text width > width of rectangle
      if (textWidth > endX - startX) {
        if (endX + textWidth + 1.5 * conf.leftPadding > w) {
          return startX + theSidePad - 5;
        } else {
          return endX + theSidePad + 5;
        }
      } else {
        return (endX - startX) / 2 + startX + theSidePad;
      }
    }).attr('y', function (d, i) {
      return i * theGap + conf.barHeight / 2 + (conf.fontSize / 2 - 2) + theTopPad;
    }).attr('text-height', theBarHeight).attr('class', function (d) {
      var startX = timeScale(d.startTime);
      var endX = timeScale(d.endTime);
      var textWidth = this.getBBox().width;
      var secNum = 0;
      for (var _i3 = 0; _i3 < categories.length; _i3++) {
        if (d.type === categories[_i3]) {
          secNum = _i3 % conf.numberSectionStyles;
        }
      }

      var taskType = '';
      if (d.active) {
        if (d.crit) {
          taskType = 'activeCritText' + secNum;
        } else {
          taskType = 'activeText' + secNum;
        }
      }

      if (d.done) {
        if (d.crit) {
          taskType = taskType + ' doneCritText' + secNum;
        } else {
          taskType = taskType + ' doneText' + secNum;
        }
      } else {
        if (d.crit) {
          taskType = taskType + ' critText' + secNum;
        }
      }

      // Check id text width > width of rectangle
      if (textWidth > endX - startX) {
        if (endX + textWidth + 1.5 * conf.leftPadding > w) {
          return 'taskTextOutsideLeft taskTextOutside' + secNum + ' ' + taskType;
        } else {
          return 'taskTextOutsideRight taskTextOutside' + secNum + ' ' + taskType;
        }
      } else {
        return 'taskText taskText' + secNum + ' ' + taskType;
      }
    });
  }

  function makeGrid(theSidePad, theTopPad, w, h) {
    var xAxis = d3.axisBottom(timeScale).tickSize(-h + theTopPad + conf.gridLineStartPadding).tickFormat(d3.timeFormat(_gantt.parser.yy.getAxisFormat() || conf.axisFormat || '%Y-%m-%d'));

    svg.append('g').attr('class', 'grid').attr('transform', 'translate(' + theSidePad + ', ' + (h - 50) + ')').call(xAxis).selectAll('text').style('text-anchor', 'middle').attr('fill', '#000').attr('stroke', 'none').attr('font-size', 10).attr('dy', '1em');
  }

  function vertLabels(theGap, theTopPad) {
    var numOccurances = [];
    var prevGap = 0;

    for (var _i4 = 0; _i4 < categories.length; _i4++) {
      numOccurances[_i4] = [categories[_i4], getCount(categories[_i4], catsUnfiltered)];
    }

    svg.append('g') // without doing this, impossible to put grid lines behind text
    .selectAll('text').data(numOccurances).enter().append('text').text(function (d) {
      return d[0];
    }).attr('x', 10).attr('y', function (d, i) {
      if (i > 0) {
        for (var j = 0; j < i; j++) {
          prevGap += numOccurances[i - 1][1];
          return d[1] * theGap / 2 + prevGap * theGap + theTopPad;
        }
      } else {
        return d[1] * theGap / 2 + theTopPad;
      }
    }).attr('class', function (d) {
      for (var _i5 = 0; _i5 < categories.length; _i5++) {
        if (d[0] === categories[_i5]) {
          return 'sectionTitle sectionTitle' + _i5 % conf.numberSectionStyles;
        }
      }
      return 'sectionTitle';
    });
  }

  function drawToday(theSidePad, theTopPad, w, h) {
    var todayG = svg.append('g').attr('class', 'today');

    var today = new Date();

    todayG.append('line').attr('x1', timeScale(today) + theSidePad).attr('x2', timeScale(today) + theSidePad).attr('y1', conf.titleTopMargin).attr('y2', h - conf.titleTopMargin).attr('class', 'today');
  }

  // from this stackexchange question: http://stackoverflow.com/questions/1890203/unique-for-arrays-in-javascript
  function checkUnique(arr) {
    var hash = {};
    var result = [];
    for (var _i6 = 0, l = arr.length; _i6 < l; ++_i6) {
      if (!hash.hasOwnProperty(arr[_i6])) {
        // it works with objects! in FF, at least
        hash[arr[_i6]] = true;
        result.push(arr[_i6]);
      }
    }
    return result;
  }

  // from this stackexchange question: http://stackoverflow.com/questions/14227981/count-how-many-strings-in-an-array-have-duplicates-in-the-same-array
  function getCounts(arr) {
    var i = arr.length; // const to loop over
    var obj = {}; // obj to store results
    while (i) {
      obj[arr[--i]] = (obj[arr[i]] || 0) + 1; // count occurrences
    }
    return obj;
  }

  // get specific from everything
  function getCount(word, arr) {
    return getCounts(arr)[word] || 0;
  }
};

exports.default = {
  setConf: setConf,
  draw: draw
};

/***/ }),

/***/ "./src/diagrams/gantt/parser/gantt.js":
/*!********************************************!*\
  !*** ./src/diagrams/gantt/parser/gantt.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [6, 8, 10, 11, 12, 13, 14, 15],
        $V1 = [1, 9],
        $V2 = [1, 10],
        $V3 = [1, 11],
        $V4 = [1, 12],
        $V5 = [1, 13];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "start": 3, "gantt": 4, "document": 5, "EOF": 6, "line": 7, "SPACE": 8, "statement": 9, "NL": 10, "dateFormat": 11, "axisFormat": 12, "title": 13, "section": 14, "taskTxt": 15, "taskData": 16, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "gantt", 6: "EOF", 8: "SPACE", 10: "NL", 11: "dateFormat", 12: "axisFormat", 13: "title", 14: "section", 15: "taskTxt", 16: "taskData" },
        productions_: [0, [3, 3], [5, 0], [5, 2], [7, 2], [7, 1], [7, 1], [7, 1], [9, 1], [9, 1], [9, 1], [9, 1], [9, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    this.$ = [];
                    break;
                case 3:
                    $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
                    break;
                case 4:case 5:
                    this.$ = $$[$0];
                    break;
                case 6:case 7:
                    this.$ = [];
                    break;
                case 8:
                    yy.setDateFormat($$[$0].substr(11));this.$ = $$[$0].substr(11);
                    break;
                case 9:
                    yy.setAxisFormat($$[$0].substr(11));this.$ = $$[$0].substr(11);
                    break;
                case 10:
                    yy.setTitle($$[$0].substr(6));this.$ = $$[$0].substr(6);
                    break;
                case 11:
                    yy.addSection($$[$0].substr(8));this.$ = $$[$0].substr(8);
                    break;
                case 12:
                    yy.addTask($$[$0 - 1], $$[$0]);this.$ = 'task';
                    break;
            }
        },
        table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, o($V0, [2, 2], { 5: 3 }), { 6: [1, 4], 7: 5, 8: [1, 6], 9: 7, 10: [1, 8], 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5 }, o($V0, [2, 7], { 1: [2, 1] }), o($V0, [2, 3]), { 9: 14, 11: $V1, 12: $V2, 13: $V3, 14: $V4, 15: $V5 }, o($V0, [2, 5]), o($V0, [2, 6]), o($V0, [2, 8]), o($V0, [2, 9]), o($V0, [2, 10]), o($V0, [2, 11]), { 16: [1, 15] }, o($V0, [2, 4]), o($V0, [2, 12])],
        defaultActions: {},
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = tstack.pop() || lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    if (token instanceof Array) {
                        tstack = token;
                        token = tstack.pop();
                    }
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                // Pre-lexer code can go here

                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 10;
                        break;
                    case 1:
                        /* skip whitespace */
                        break;
                    case 2:
                        /* skip comments */
                        break;
                    case 3:
                        /* skip comments */
                        break;
                    case 4:
                        return 4;
                        break;
                    case 5:
                        return 11;
                        break;
                    case 6:
                        return 12;
                        break;
                    case 7:
                        return 'date';
                        break;
                    case 8:
                        return 13;
                        break;
                    case 9:
                        return 14;
                        break;
                    case 10:
                        return 15;
                        break;
                    case 11:
                        return 16;
                        break;
                    case 12:
                        return ':';
                        break;
                    case 13:
                        return 6;
                        break;
                    case 14:
                        return 'INVALID';
                        break;
                }
            },
            rules: [/^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gantt\b)/i, /^(?:dateFormat\s[^#\n;]+)/i, /^(?:axisFormat\s[^#\n;]+)/i, /^(?:\d\d\d\d-\d\d-\d\d\b)/i, /^(?:title\s[^#\n;]+)/i, /^(?:section\s[^#:\n;]+)/i, /^(?:[^#:\n;]+)/i, /^(?::[^#\n;]+)/i, /^(?::)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: { "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js").readFileSync(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js").normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/diagrams/git/gitGraphAst.js":
/*!*****************************************!*\
  !*** ./src/diagrams/git/gitGraphAst.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHead = exports.getDirection = exports.getCurrentBranch = exports.getCommitsArray = exports.getCommits = exports.getBranches = exports.getBranchesAsObjArray = exports.clear = exports.prettyPrint = exports.reset = exports.checkout = exports.merge = exports.branch = exports.commit = exports.getOptions = exports.setOptions = exports.setDirection = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commits = {};
var head = null;
var branches = { 'master': head };
var curBranch = 'master';
var direction = 'LR';
var seq = 0;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getId() {
  var pool = '0123456789abcdef';
  var id = '';
  for (var i = 0; i < 7; i++) {
    id += pool[getRandomInt(0, 16)];
  }
  return id;
}

function isfastforwardable(currentCommit, otherCommit) {
  _logger.logger.debug('Entering isfastforwardable:', currentCommit.id, otherCommit.id);
  while (currentCommit.seq <= otherCommit.seq && currentCommit !== otherCommit) {
    // only if other branch has more commits
    if (otherCommit.parent == null) break;
    if (Array.isArray(otherCommit.parent)) {
      _logger.logger.debug('In merge commit:', otherCommit.parent);
      return isfastforwardable(currentCommit, commits[otherCommit.parent[0]]) || isfastforwardable(currentCommit, commits[otherCommit.parent[1]]);
    } else {
      otherCommit = commits[otherCommit.parent];
    }
  }
  _logger.logger.debug(currentCommit.id, otherCommit.id);
  return currentCommit.id === otherCommit.id;
}

function isReachableFrom(currentCommit, otherCommit) {
  var currentSeq = currentCommit.seq;
  var otherSeq = otherCommit.seq;
  if (currentSeq > otherSeq) return isfastforwardable(otherCommit, currentCommit);
  return false;
}

var setDirection = exports.setDirection = function setDirection(dir) {
  direction = dir;
};
var options = {};
var setOptions = exports.setOptions = function setOptions(rawOptString) {
  _logger.logger.debug('options str', rawOptString);
  rawOptString = rawOptString && rawOptString.trim();
  rawOptString = rawOptString || '{}';
  try {
    options = JSON.parse(rawOptString);
  } catch (e) {
    _logger.logger.error('error while parsing gitGraph options', e.message);
  }
};

var getOptions = exports.getOptions = function getOptions() {
  return options;
};

var commit = exports.commit = function commit(msg) {
  var commit = {
    id: getId(),
    message: msg,
    seq: seq++,
    parent: head == null ? null : head.id
  };
  head = commit;
  commits[commit.id] = commit;
  branches[curBranch] = commit.id;
  _logger.logger.debug('in pushCommit ' + commit.id);
};

var branch = exports.branch = function branch(name) {
  branches[name] = head != null ? head.id : null;
  _logger.logger.debug('in createBranch');
};

var merge = exports.merge = function merge(otherBranch) {
  var currentCommit = commits[branches[curBranch]];
  var otherCommit = commits[branches[otherBranch]];
  if (isReachableFrom(currentCommit, otherCommit)) {
    _logger.logger.debug('Already merged');
    return;
  }
  if (isfastforwardable(currentCommit, otherCommit)) {
    branches[curBranch] = branches[otherBranch];
    head = commits[branches[curBranch]];
  } else {
    // create merge commit
    var _commit = {
      id: getId(),
      message: 'merged branch ' + otherBranch + ' into ' + curBranch,
      seq: seq++,
      parent: [head == null ? null : head.id, branches[otherBranch]]
    };
    head = _commit;
    commits[_commit.id] = _commit;
    branches[curBranch] = _commit.id;
  }
  _logger.logger.debug(branches);
  _logger.logger.debug('in mergeBranch');
};

var checkout = exports.checkout = function checkout(branch) {
  _logger.logger.debug('in checkout');
  curBranch = branch;
  var id = branches[curBranch];
  head = commits[id];
};

var reset = exports.reset = function reset(commitRef) {
  _logger.logger.debug('in reset', commitRef);
  var ref = commitRef.split(':')[0];
  var parentCount = parseInt(commitRef.split(':')[1]);
  var commit = ref === 'HEAD' ? head : commits[branches[ref]];
  _logger.logger.debug(commit, parentCount);
  while (parentCount > 0) {
    commit = commits[commit.parent];
    parentCount--;
    if (!commit) {
      var err = 'Critical error - unique parent commit not found during reset';
      _logger.logger.error(err);
      throw err;
    }
  }
  head = commit;
  branches[curBranch] = commit.id;
};

function upsert(arr, key, newval) {
  var index = arr.indexOf(key);
  if (index === -1) {
    arr.push(newval);
  } else {
    arr.splice(index, 1, newval);
  }
}

function prettyPrintCommitHistory(commitArr) {
  var commit = _lodash2.default.maxBy(commitArr, 'seq');
  var line = '';
  commitArr.forEach(function (c) {
    if (c === commit) {
      line += '\t*';
    } else {
      line += '\t|';
    }
  });
  var label = [line, commit.id, commit.seq];
  _lodash2.default.each(branches, function (value, key) {
    if (value === commit.id) label.push(key);
  });
  _logger.logger.debug(label.join(' '));
  if (Array.isArray(commit.parent)) {
    var newCommit = commits[commit.parent[0]];
    upsert(commitArr, commit, newCommit);
    commitArr.push(commits[commit.parent[1]]);
  } else if (commit.parent == null) {
    return;
  } else {
    var nextCommit = commits[commit.parent];
    upsert(commitArr, commit, nextCommit);
  }
  commitArr = _lodash2.default.uniqBy(commitArr, 'id');
  prettyPrintCommitHistory(commitArr);
}

var prettyPrint = exports.prettyPrint = function prettyPrint() {
  _logger.logger.debug(commits);
  var node = getCommitsArray()[0];
  prettyPrintCommitHistory([node]);
};

var clear = exports.clear = function clear() {
  commits = {};
  head = null;
  branches = { 'master': head };
  curBranch = 'master';
  seq = 0;
};

var getBranchesAsObjArray = exports.getBranchesAsObjArray = function getBranchesAsObjArray() {
  var branchArr = _lodash2.default.map(branches, function (value, key) {
    return { 'name': key, 'commit': commits[value] };
  });
  return branchArr;
};

var getBranches = exports.getBranches = function getBranches() {
  return branches;
};
var getCommits = exports.getCommits = function getCommits() {
  return commits;
};
var getCommitsArray = exports.getCommitsArray = function getCommitsArray() {
  var commitArr = Object.keys(commits).map(function (key) {
    return commits[key];
  });
  commitArr.forEach(function (o) {
    _logger.logger.debug(o.id);
  });
  return _lodash2.default.orderBy(commitArr, ['seq'], ['desc']);
};
var getCurrentBranch = exports.getCurrentBranch = function getCurrentBranch() {
  return curBranch;
};
var getDirection = exports.getDirection = function getDirection() {
  return direction;
};
var getHead = exports.getHead = function getHead() {
  return head;
};

exports.default = {
  setDirection: setDirection,
  setOptions: setOptions,
  getOptions: getOptions,
  commit: commit,
  branch: branch,
  merge: merge,
  checkout: checkout,
  reset: reset,
  prettyPrint: prettyPrint,
  clear: clear,
  getBranchesAsObjArray: getBranchesAsObjArray,
  getBranches: getBranches,
  getCommits: getCommits,
  getCommitsArray: getCommitsArray,
  getCurrentBranch: getCurrentBranch,
  getDirection: getDirection,
  getHead: getHead
};

/***/ }),

/***/ "./src/diagrams/git/gitGraphRenderer.js":
/*!**********************************************!*\
  !*** ./src/diagrams/git/gitGraphRenderer.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.setConf = undefined;

var _lodash = __webpack_require__(/*! lodash */ "lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _gitGraphAst = __webpack_require__(/*! ./gitGraphAst */ "./src/diagrams/git/gitGraphAst.js");

var _gitGraphAst2 = _interopRequireDefault(_gitGraphAst);

var _gitGraph = __webpack_require__(/*! ./parser/gitGraph */ "./src/diagrams/git/parser/gitGraph.js");

var _gitGraph2 = _interopRequireDefault(_gitGraph);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var _utils = __webpack_require__(/*! ../../utils */ "./src/utils.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allCommitsDict = {};
var branchNum = void 0;
var config = {
  nodeSpacing: 150,
  nodeFillColor: 'yellow',
  nodeStrokeWidth: 2,
  nodeStrokeColor: 'grey',
  lineStrokeWidth: 4,
  branchOffset: 50,
  lineColor: 'grey',
  leftMargin: 50,
  branchColors: ['#442f74', '#983351', '#609732', '#AA9A39'],
  nodeRadius: 10,
  nodeLabel: {
    width: 75,
    height: 100,
    x: -25,
    y: 0
  }
};
var apiConfig = {};
var setConf = exports.setConf = function setConf(c) {
  apiConfig = c;
};

function svgCreateDefs(svg) {
  svg.append('defs').append('g').attr('id', 'def-commit').append('circle').attr('r', config.nodeRadius).attr('cx', 0).attr('cy', 0);
  svg.select('#def-commit').append('foreignObject').attr('width', config.nodeLabel.width).attr('height', config.nodeLabel.height).attr('x', config.nodeLabel.x).attr('y', config.nodeLabel.y).attr('class', 'node-label').attr('requiredFeatures', 'http://www.w3.org/TR/SVG11/feature#Extensibility').append('p').html('');
}

function svgDrawLine(svg, points, colorIdx, interpolate) {
  var curve = (0, _utils.interpolateToCurve)(interpolate, d3.curveBasis);
  var color = config.branchColors[colorIdx % config.branchColors.length];
  var lineGen = d3.line().x(function (d) {
    return Math.round(d.x);
  }).y(function (d) {
    return Math.round(d.y);
  }).curve(curve);

  svg.append('svg:path').attr('d', lineGen(points)).style('stroke', color).style('stroke-width', config.lineStrokeWidth).style('fill', 'none');
}

// Pass in the element and its pre-transform coords
function getElementCoords(element, coords) {
  coords = coords || element.node().getBBox();
  var ctm = element.node().getCTM();
  var xn = ctm.e + coords.x * ctm.a;
  var yn = ctm.f + coords.y * ctm.d;
  return {
    left: xn,
    top: yn,
    width: coords.width,
    height: coords.height
  };
}

function svgDrawLineForCommits(svg, fromId, toId, direction, color) {
  _logger.logger.debug('svgDrawLineForCommits: ', fromId, toId);
  var fromBbox = getElementCoords(svg.select('#node-' + fromId + ' circle'));
  var toBbox = getElementCoords(svg.select('#node-' + toId + ' circle'));
  switch (direction) {
    case 'LR':
      // (toBbox)
      //  +--------
      //          + (fromBbox)
      if (fromBbox.left - toBbox.left > config.nodeSpacing) {
        var lineStart = { x: fromBbox.left - config.nodeSpacing, y: toBbox.top + toBbox.height / 2 };
        var lineEnd = { x: toBbox.left + toBbox.width, y: toBbox.top + toBbox.height / 2 };
        svgDrawLine(svg, [lineStart, lineEnd], color, 'linear');
        svgDrawLine(svg, [{ x: fromBbox.left, y: fromBbox.top + fromBbox.height / 2 }, { x: fromBbox.left - config.nodeSpacing / 2, y: fromBbox.top + fromBbox.height / 2 }, { x: fromBbox.left - config.nodeSpacing / 2, y: lineStart.y }, lineStart], color);
      } else {
        svgDrawLine(svg, [{
          'x': fromBbox.left,
          'y': fromBbox.top + fromBbox.height / 2
        }, {
          'x': fromBbox.left - config.nodeSpacing / 2,
          'y': fromBbox.top + fromBbox.height / 2
        }, {
          'x': fromBbox.left - config.nodeSpacing / 2,
          'y': toBbox.top + toBbox.height / 2
        }, {
          'x': toBbox.left + toBbox.width,
          'y': toBbox.top + toBbox.height / 2
        }], color);
      }
      break;
    case 'BT':
      //      +           (fromBbox)
      //      |
      //      |
      //              +   (toBbox)
      if (toBbox.top - fromBbox.top > config.nodeSpacing) {
        var _lineStart = { x: toBbox.left + toBbox.width / 2, y: fromBbox.top + fromBbox.height + config.nodeSpacing };
        var _lineEnd = { x: toBbox.left + toBbox.width / 2, y: toBbox.top };
        svgDrawLine(svg, [_lineStart, _lineEnd], color, 'linear');
        svgDrawLine(svg, [{ x: fromBbox.left + fromBbox.width / 2, y: fromBbox.top + fromBbox.height }, { x: fromBbox.left + fromBbox.width / 2, y: fromBbox.top + fromBbox.height + config.nodeSpacing / 2 }, { x: toBbox.left + toBbox.width / 2, y: _lineStart.y - config.nodeSpacing / 2 }, _lineStart], color);
      } else {
        svgDrawLine(svg, [{
          'x': fromBbox.left + fromBbox.width / 2,
          'y': fromBbox.top + fromBbox.height
        }, {
          'x': fromBbox.left + fromBbox.width / 2,
          'y': fromBbox.top + config.nodeSpacing / 2
        }, {
          'x': toBbox.left + toBbox.width / 2,
          'y': toBbox.top - config.nodeSpacing / 2
        }, {
          'x': toBbox.left + toBbox.width / 2,
          'y': toBbox.top
        }], color);
      }
      break;
  }
}

function cloneNode(svg, selector) {
  return svg.select(selector).node().cloneNode(true);
}

function renderCommitHistory(svg, commitid, branches, direction) {
  var commit = void 0;
  var numCommits = Object.keys(allCommitsDict).length;
  if (_lodash2.default.isString(commitid)) {
    do {
      commit = allCommitsDict[commitid];
      _logger.logger.debug('in renderCommitHistory', commit.id, commit.seq);
      if (svg.select('#node-' + commitid).size() > 0) {
        return;
      }
      svg.append(function () {
        return cloneNode(svg, '#def-commit');
      }).attr('class', 'commit').attr('id', function () {
        return 'node-' + commit.id;
      }).attr('transform', function () {
        switch (direction) {
          case 'LR':
            return 'translate(' + (commit.seq * config.nodeSpacing + config.leftMargin) + ', ' + branchNum * config.branchOffset + ')';
          case 'BT':
            return 'translate(' + (branchNum * config.branchOffset + config.leftMargin) + ', ' + (numCommits - commit.seq) * config.nodeSpacing + ')';
        }
      }).attr('fill', config.nodeFillColor).attr('stroke', config.nodeStrokeColor).attr('stroke-width', config.nodeStrokeWidth);

      var branch = _lodash2.default.find(branches, ['commit', commit]);
      if (branch) {
        _logger.logger.debug('found branch ', branch.name);
        svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'branch-label').text(branch.name + ', ');
      }
      svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'commit-id').text(commit.id);
      if (commit.message !== '' && direction === 'BT') {
        svg.select('#node-' + commit.id + ' p').append('xhtml:span').attr('class', 'commit-msg').text(', ' + commit.message);
      }
      commitid = commit.parent;
    } while (commitid && allCommitsDict[commitid]);
  }

  if (_lodash2.default.isArray(commitid)) {
    _logger.logger.debug('found merge commmit', commitid);
    renderCommitHistory(svg, commitid[0], branches, direction);
    branchNum++;
    renderCommitHistory(svg, commitid[1], branches, direction);
    branchNum--;
  }
}

function renderLines(svg, commit, direction, branchColor) {
  branchColor = branchColor || 0;
  while (commit.seq > 0 && !commit.lineDrawn) {
    if (_lodash2.default.isString(commit.parent)) {
      svgDrawLineForCommits(svg, commit.id, commit.parent, direction, branchColor);
      commit.lineDrawn = true;
      commit = allCommitsDict[commit.parent];
    } else if (_lodash2.default.isArray(commit.parent)) {
      svgDrawLineForCommits(svg, commit.id, commit.parent[0], direction, branchColor);
      svgDrawLineForCommits(svg, commit.id, commit.parent[1], direction, branchColor + 1);
      renderLines(svg, allCommitsDict[commit.parent[1]], direction, branchColor + 1);
      commit.lineDrawn = true;
      commit = allCommitsDict[commit.parent[0]];
    }
  }
}

var draw = exports.draw = function draw(txt, id, ver) {
  try {
    var parser = _gitGraph2.default.parser;
    parser.yy = _gitGraphAst2.default;

    _logger.logger.debug('in gitgraph renderer', txt, id, ver);
    // Parse the graph definition
    parser.parse(txt + '\n');

    config = _lodash2.default.extend(config, apiConfig, _gitGraphAst2.default.getOptions());
    _logger.logger.debug('effective options', config);
    var direction = _gitGraphAst2.default.getDirection();
    allCommitsDict = _gitGraphAst2.default.getCommits();
    var branches = _gitGraphAst2.default.getBranchesAsObjArray();
    if (direction === 'BT') {
      config.nodeLabel.x = branches.length * config.branchOffset;
      config.nodeLabel.width = '100%';
      config.nodeLabel.y = -1 * 2 * config.nodeRadius;
    }
    var svg = d3.select('[id="' + id + '"]');
    svgCreateDefs(svg);
    branchNum = 1;
    _lodash2.default.each(branches, function (v) {
      renderCommitHistory(svg, v.commit.id, branches, direction);
      renderLines(svg, v.commit, direction);
      branchNum++;
    });
    svg.attr('height', function () {
      if (direction === 'BT') return Object.keys(allCommitsDict).length * config.nodeSpacing;
      return (branches.length + 1) * config.branchOffset;
    });
  } catch (e) {
    _logger.logger.error('Error while rendering gitgraph');
    _logger.logger.error(e.message);
  }
};

exports.default = {
  setConf: setConf,
  draw: draw
};

/***/ }),

/***/ "./src/diagrams/git/parser/gitGraph.js":
/*!*********************************************!*\
  !*** ./src/diagrams/git/parser/gitGraph.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [2, 3],
        $V1 = [1, 7],
        $V2 = [7, 12, 15, 17, 19, 20, 21],
        $V3 = [7, 11, 12, 15, 17, 19, 20, 21],
        $V4 = [2, 20],
        $V5 = [1, 32];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "start": 3, "GG": 4, ":": 5, "document": 6, "EOF": 7, "DIR": 8, "options": 9, "body": 10, "OPT": 11, "NL": 12, "line": 13, "statement": 14, "COMMIT": 15, "commit_arg": 16, "BRANCH": 17, "ID": 18, "CHECKOUT": 19, "MERGE": 20, "RESET": 21, "reset_arg": 22, "STR": 23, "HEAD": 24, "reset_parents": 25, "CARET": 26, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "GG", 5: ":", 7: "EOF", 8: "DIR", 11: "OPT", 12: "NL", 15: "COMMIT", 17: "BRANCH", 18: "ID", 19: "CHECKOUT", 20: "MERGE", 21: "RESET", 23: "STR", 24: "HEAD", 26: "CARET" },
        productions_: [0, [3, 4], [3, 5], [6, 0], [6, 2], [9, 2], [9, 1], [10, 0], [10, 2], [13, 2], [13, 1], [14, 2], [14, 2], [14, 2], [14, 2], [14, 2], [16, 0], [16, 1], [22, 2], [22, 2], [25, 0], [25, 2]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1:
                    return $$[$0 - 1];
                    break;
                case 2:
                    yy.setDirection($$[$0 - 3]);return $$[$0 - 1];
                    break;
                case 4:
                    yy.setOptions($$[$0 - 1]);this.$ = $$[$0];
                    break;
                case 5:
                    $$[$0 - 1] += $$[$0];this.$ = $$[$0 - 1];
                    break;
                case 7:
                    this.$ = [];
                    break;
                case 8:
                    $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
                    break;
                case 9:
                    this.$ = $$[$0 - 1];
                    break;
                case 11:
                    yy.commit($$[$0]);
                    break;
                case 12:
                    yy.branch($$[$0]);
                    break;
                case 13:
                    yy.checkout($$[$0]);
                    break;
                case 14:
                    yy.merge($$[$0]);
                    break;
                case 15:
                    yy.reset($$[$0]);
                    break;
                case 16:
                    this.$ = "";
                    break;
                case 17:
                    this.$ = $$[$0];
                    break;
                case 18:
                    this.$ = $$[$0 - 1] + ":" + $$[$0];
                    break;
                case 19:
                    this.$ = $$[$0 - 1] + ":" + yy.count;yy.count = 0;
                    break;
                case 20:
                    yy.count = 0;
                    break;
                case 21:
                    yy.count += 1;
                    break;
            }
        },
        table: [{ 3: 1, 4: [1, 2] }, { 1: [3] }, { 5: [1, 3], 8: [1, 4] }, { 6: 5, 7: $V0, 9: 6, 12: $V1 }, { 5: [1, 8] }, { 7: [1, 9] }, o($V2, [2, 7], { 10: 10, 11: [1, 11] }), o($V3, [2, 6]), { 6: 12, 7: $V0, 9: 6, 12: $V1 }, { 1: [2, 1] }, { 7: [2, 4], 12: [1, 15], 13: 13, 14: 14, 15: [1, 16], 17: [1, 17], 19: [1, 18], 20: [1, 19], 21: [1, 20] }, o($V3, [2, 5]), { 7: [1, 21] }, o($V2, [2, 8]), { 12: [1, 22] }, o($V2, [2, 10]), { 12: [2, 16], 16: 23, 23: [1, 24] }, { 18: [1, 25] }, { 18: [1, 26] }, { 18: [1, 27] }, { 18: [1, 30], 22: 28, 24: [1, 29] }, { 1: [2, 2] }, o($V2, [2, 9]), { 12: [2, 11] }, { 12: [2, 17] }, { 12: [2, 12] }, { 12: [2, 13] }, { 12: [2, 14] }, { 12: [2, 15] }, { 12: $V4, 25: 31, 26: $V5 }, { 12: $V4, 25: 33, 26: $V5 }, { 12: [2, 18] }, { 12: $V4, 25: 34, 26: $V5 }, { 12: [2, 19] }, { 12: [2, 21] }],
        defaultActions: { 9: [2, 1], 21: [2, 2], 23: [2, 11], 24: [2, 17], 25: [2, 12], 26: [2, 13], 27: [2, 14], 28: [2, 15], 31: [2, 18], 33: [2, 19], 34: [2, 21] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = tstack.pop() || lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    if (token instanceof Array) {
                        tstack = token;
                        token = tstack.pop();
                    }
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };
    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 12;
                        break;
                    case 1:
                        /* skip all whitespace */
                        break;
                    case 2:
                        /* skip comments */
                        break;
                    case 3:
                        /* skip comments */
                        break;
                    case 4:
                        return 4;
                        break;
                    case 5:
                        return 15;
                        break;
                    case 6:
                        return 17;
                        break;
                    case 7:
                        return 20;
                        break;
                    case 8:
                        return 21;
                        break;
                    case 9:
                        return 19;
                        break;
                    case 10:
                        return 8;
                        break;
                    case 11:
                        return 8;
                        break;
                    case 12:
                        return 5;
                        break;
                    case 13:
                        return 26;
                        break;
                    case 14:
                        this.begin("options");
                        break;
                    case 15:
                        this.popState();
                        break;
                    case 16:
                        return 11;
                        break;
                    case 17:
                        this.begin("string");
                        break;
                    case 18:
                        this.popState();
                        break;
                    case 19:
                        return 23;
                        break;
                    case 20:
                        return 18;
                        break;
                    case 21:
                        return 7;
                        break;
                }
            },
            rules: [/^(?:(\r?\n)+)/i, /^(?:\s+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:gitGraph\b)/i, /^(?:commit\b)/i, /^(?:branch\b)/i, /^(?:merge\b)/i, /^(?:reset\b)/i, /^(?:checkout\b)/i, /^(?:LR\b)/i, /^(?:BT\b)/i, /^(?::)/i, /^(?:\^)/i, /^(?:options\r?\n)/i, /^(?:end\r?\n)/i, /^(?:[^\n]+\r?\n)/i, /^(?:["])/i, /^(?:["])/i, /^(?:[^"]*)/i, /^(?:[a-zA-Z][a-zA-Z0-9_]+)/i, /^(?:$)/i],
            conditions: { "options": { "rules": [15, 16], "inclusive": false }, "string": { "rules": [18, 19], "inclusive": false }, "INITIAL": { "rules": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 20, 21], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js").readFileSync(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js").normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/diagrams/sequence/parser/sequenceDiagram.js":
/*!*********************************************************!*\
  !*** ./src/diagrams/sequence/parser/sequenceDiagram.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, module) {

/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = function () {
    var o = function o(k, v, _o, l) {
        for (_o = _o || {}, l = k.length; l--; _o[k[l]] = v) {}return _o;
    },
        $V0 = [1, 2],
        $V1 = [1, 3],
        $V2 = [1, 4],
        $V3 = [2, 4],
        $V4 = [1, 9],
        $V5 = [1, 11],
        $V6 = [1, 12],
        $V7 = [1, 14],
        $V8 = [1, 15],
        $V9 = [1, 17],
        $Va = [1, 18],
        $Vb = [1, 19],
        $Vc = [1, 20],
        $Vd = [1, 21],
        $Ve = [1, 23],
        $Vf = [1, 24],
        $Vg = [1, 4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 27, 28, 29, 40],
        $Vh = [1, 32],
        $Vi = [4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 29, 40],
        $Vj = [4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 28, 29, 40],
        $Vk = [4, 5, 10, 15, 16, 18, 20, 21, 22, 23, 25, 27, 29, 40],
        $Vl = [38, 39, 40];
    var parser = { trace: function trace() {},
        yy: {},
        symbols_: { "error": 2, "start": 3, "SPACE": 4, "NL": 5, "SD": 6, "document": 7, "line": 8, "statement": 9, "participant": 10, "actor": 11, "AS": 12, "restOfLine": 13, "signal": 14, "activate": 15, "deactivate": 16, "note_statement": 17, "title": 18, "text2": 19, "loop": 20, "end": 21, "opt": 22, "alt": 23, "else_sections": 24, "par": 25, "par_sections": 26, "and": 27, "else": 28, "note": 29, "placement": 30, "over": 31, "actor_pair": 32, "spaceList": 33, ",": 34, "left_of": 35, "right_of": 36, "signaltype": 37, "+": 38, "-": 39, "ACTOR": 40, "SOLID_OPEN_ARROW": 41, "DOTTED_OPEN_ARROW": 42, "SOLID_ARROW": 43, "DOTTED_ARROW": 44, "SOLID_CROSS": 45, "DOTTED_CROSS": 46, "TXT": 47, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 4: "SPACE", 5: "NL", 6: "SD", 10: "participant", 12: "AS", 13: "restOfLine", 15: "activate", 16: "deactivate", 18: "title", 20: "loop", 21: "end", 22: "opt", 23: "alt", 25: "par", 27: "and", 28: "else", 29: "note", 31: "over", 34: ",", 35: "left_of", 36: "right_of", 38: "+", 39: "-", 40: "ACTOR", 41: "SOLID_OPEN_ARROW", 42: "DOTTED_OPEN_ARROW", 43: "SOLID_ARROW", 44: "DOTTED_ARROW", 45: "SOLID_CROSS", 46: "DOTTED_CROSS", 47: "TXT" },
        productions_: [0, [3, 2], [3, 2], [3, 2], [7, 0], [7, 2], [8, 2], [8, 1], [8, 1], [9, 5], [9, 3], [9, 2], [9, 3], [9, 3], [9, 2], [9, 3], [9, 4], [9, 4], [9, 4], [9, 4], [26, 1], [26, 4], [24, 1], [24, 4], [17, 4], [17, 4], [33, 2], [33, 1], [32, 3], [32, 1], [30, 1], [30, 1], [14, 5], [14, 5], [14, 4], [11, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [37, 1], [19, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
            /* this == yyval */

            var $0 = $$.length - 1;
            switch (yystate) {
                case 3:
                    yy.apply($$[$0]);return $$[$0];
                    break;
                case 4:
                    this.$ = [];
                    break;
                case 5:
                    $$[$0 - 1].push($$[$0]);this.$ = $$[$0 - 1];
                    break;
                case 6:case 7:
                    this.$ = $$[$0];
                    break;
                case 8:
                    this.$ = [];
                    break;
                case 9:
                    $$[$0 - 3].description = $$[$0 - 1];this.$ = $$[$0 - 3];
                    break;
                case 10:
                    this.$ = $$[$0 - 1];
                    break;
                case 12:
                    this.$ = { type: 'activeStart', signalType: yy.LINETYPE.ACTIVE_START, actor: $$[$0 - 1] };
                    break;
                case 13:
                    this.$ = { type: 'activeEnd', signalType: yy.LINETYPE.ACTIVE_END, actor: $$[$0 - 1] };
                    break;
                case 15:
                    this.$ = [{ type: 'setTitle', text: $$[$0 - 1] }];
                    break;
                case 16:

                    $$[$0 - 1].unshift({ type: 'loopStart', loopText: $$[$0 - 2], signalType: yy.LINETYPE.LOOP_START });
                    $$[$0 - 1].push({ type: 'loopEnd', loopText: $$[$0 - 2], signalType: yy.LINETYPE.LOOP_END });
                    this.$ = $$[$0 - 1];
                    break;
                case 17:

                    $$[$0 - 1].unshift({ type: 'optStart', optText: $$[$0 - 2], signalType: yy.LINETYPE.OPT_START });
                    $$[$0 - 1].push({ type: 'optEnd', optText: $$[$0 - 2], signalType: yy.LINETYPE.OPT_END });
                    this.$ = $$[$0 - 1];
                    break;
                case 18:

                    // Alt start
                    $$[$0 - 1].unshift({ type: 'altStart', altText: $$[$0 - 2], signalType: yy.LINETYPE.ALT_START });
                    // Content in alt is already in $$[$0-1]
                    // End
                    $$[$0 - 1].push({ type: 'altEnd', signalType: yy.LINETYPE.ALT_END });
                    this.$ = $$[$0 - 1];
                    break;
                case 19:

                    // Parallel start
                    $$[$0 - 1].unshift({ type: 'parStart', parText: $$[$0 - 2], signalType: yy.LINETYPE.PAR_START });
                    // Content in par is already in $$[$0-1]
                    // End
                    $$[$0 - 1].push({ type: 'parEnd', signalType: yy.LINETYPE.PAR_END });
                    this.$ = $$[$0 - 1];
                    break;
                case 21:
                    this.$ = $$[$0 - 3].concat([{ type: 'and', parText: $$[$0 - 1], signalType: yy.LINETYPE.PAR_AND }, $$[$0]]);
                    break;
                case 23:
                    this.$ = $$[$0 - 3].concat([{ type: 'else', altText: $$[$0 - 1], signalType: yy.LINETYPE.ALT_ELSE }, $$[$0]]);
                    break;
                case 24:

                    this.$ = [$$[$0 - 1], { type: 'addNote', placement: $$[$0 - 2], actor: $$[$0 - 1].actor, text: $$[$0] }];
                    break;
                case 25:

                    // Coerce actor_pair into a [to, from, ...] array
                    $$[$0 - 2] = [].concat($$[$0 - 1], $$[$0 - 1]).slice(0, 2);
                    $$[$0 - 2][0] = $$[$0 - 2][0].actor;
                    $$[$0 - 2][1] = $$[$0 - 2][1].actor;
                    this.$ = [$$[$0 - 1], { type: 'addNote', placement: yy.PLACEMENT.OVER, actor: $$[$0 - 2].slice(0, 2), text: $$[$0] }];
                    break;
                case 28:
                    this.$ = [$$[$0 - 2], $$[$0]];
                    break;
                case 29:
                    this.$ = $$[$0];
                    break;
                case 30:
                    this.$ = yy.PLACEMENT.LEFTOF;
                    break;
                case 31:
                    this.$ = yy.PLACEMENT.RIGHTOF;
                    break;
                case 32:
                    this.$ = [$$[$0 - 4], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 4].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 3], msg: $$[$0] }, { type: 'activeStart', signalType: yy.LINETYPE.ACTIVE_START, actor: $$[$0 - 1] }];
                    break;
                case 33:
                    this.$ = [$$[$0 - 4], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 4].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 3], msg: $$[$0] }, { type: 'activeEnd', signalType: yy.LINETYPE.ACTIVE_END, actor: $$[$0 - 4] }];
                    break;
                case 34:
                    this.$ = [$$[$0 - 3], $$[$0 - 1], { type: 'addMessage', from: $$[$0 - 3].actor, to: $$[$0 - 1].actor, signalType: $$[$0 - 2], msg: $$[$0] }];
                    break;
                case 35:
                    this.$ = { type: 'addActor', actor: $$[$0] };
                    break;
                case 36:
                    this.$ = yy.LINETYPE.SOLID_OPEN;
                    break;
                case 37:
                    this.$ = yy.LINETYPE.DOTTED_OPEN;
                    break;
                case 38:
                    this.$ = yy.LINETYPE.SOLID;
                    break;
                case 39:
                    this.$ = yy.LINETYPE.DOTTED;
                    break;
                case 40:
                    this.$ = yy.LINETYPE.SOLID_CROSS;
                    break;
                case 41:
                    this.$ = yy.LINETYPE.DOTTED_CROSS;
                    break;
                case 42:
                    this.$ = $$[$0].substring(1).trim().replace(/\\n/gm, "\n");
                    break;
            }
        },
        table: [{ 3: 1, 4: $V0, 5: $V1, 6: $V2 }, { 1: [3] }, { 3: 5, 4: $V0, 5: $V1, 6: $V2 }, { 3: 6, 4: $V0, 5: $V1, 6: $V2 }, o([1, 4, 5, 10, 15, 16, 18, 20, 22, 23, 25, 29, 40], $V3, { 7: 7 }), { 1: [2, 1] }, { 1: [2, 2] }, { 1: [2, 3], 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 22: $Vb, 23: $Vc, 25: $Vd, 29: $Ve, 40: $Vf }, o($Vg, [2, 5]), { 9: 25, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 22: $Vb, 23: $Vc, 25: $Vd, 29: $Ve, 40: $Vf }, o($Vg, [2, 7]), o($Vg, [2, 8]), { 11: 26, 40: $Vf }, { 5: [1, 27] }, { 11: 28, 40: $Vf }, { 11: 29, 40: $Vf }, { 5: [1, 30] }, { 19: 31, 47: $Vh }, { 13: [1, 33] }, { 13: [1, 34] }, { 13: [1, 35] }, { 13: [1, 36] }, { 37: 37, 41: [1, 38], 42: [1, 39], 43: [1, 40], 44: [1, 41], 45: [1, 42], 46: [1, 43] }, { 30: 44, 31: [1, 45], 35: [1, 46], 36: [1, 47] }, o([5, 12, 34, 41, 42, 43, 44, 45, 46, 47], [2, 35]), o($Vg, [2, 6]), { 5: [1, 49], 12: [1, 48] }, o($Vg, [2, 11]), { 5: [1, 50] }, { 5: [1, 51] }, o($Vg, [2, 14]), { 5: [1, 52] }, { 5: [2, 42] }, o($Vi, $V3, { 7: 53 }), o($Vi, $V3, { 7: 54 }), o($Vj, $V3, { 24: 55, 7: 56 }), o($Vk, $V3, { 26: 57, 7: 58 }), { 11: 61, 38: [1, 59], 39: [1, 60], 40: $Vf }, o($Vl, [2, 36]), o($Vl, [2, 37]), o($Vl, [2, 38]), o($Vl, [2, 39]), o($Vl, [2, 40]), o($Vl, [2, 41]), { 11: 62, 40: $Vf }, { 11: 64, 32: 63, 40: $Vf }, { 40: [2, 30] }, { 40: [2, 31] }, { 13: [1, 65] }, o($Vg, [2, 10]), o($Vg, [2, 12]), o($Vg, [2, 13]), o($Vg, [2, 15]), { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [1, 66], 22: $Vb, 23: $Vc, 25: $Vd, 29: $Ve, 40: $Vf }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [1, 67], 22: $Vb, 23: $Vc, 25: $Vd, 29: $Ve, 40: $Vf }, { 21: [1, 68] }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [2, 22], 22: $Vb, 23: $Vc, 25: $Vd, 28: [1, 69], 29: $Ve, 40: $Vf }, { 21: [1, 70] }, { 4: $V4, 5: $V5, 8: 8, 9: 10, 10: $V6, 11: 22, 14: 13, 15: $V7, 16: $V8, 17: 16, 18: $V9, 20: $Va, 21: [2, 20], 22: $Vb, 23: $Vc, 25: $Vd, 27: [1, 71], 29: $Ve, 40: $Vf }, { 11: 72, 40: $Vf }, { 11: 73, 40: $Vf }, { 19: 74, 47: $Vh }, { 19: 75, 47: $Vh }, { 19: 76, 47: $Vh }, { 34: [1, 77], 47: [2, 29] }, { 5: [1, 78] }, o($Vg, [2, 16]), o($Vg, [2, 17]), o($Vg, [2, 18]), { 13: [1, 79] }, o($Vg, [2, 19]), { 13: [1, 80] }, { 19: 81, 47: $Vh }, { 19: 82, 47: $Vh }, { 5: [2, 34] }, { 5: [2, 24] }, { 5: [2, 25] }, { 11: 83, 40: $Vf }, o($Vg, [2, 9]), o($Vj, $V3, { 7: 56, 24: 84 }), o($Vk, $V3, { 7: 58, 26: 85 }), { 5: [2, 32] }, { 5: [2, 33] }, { 47: [2, 28] }, { 21: [2, 23] }, { 21: [2, 21] }],
        defaultActions: { 5: [2, 1], 6: [2, 2], 32: [2, 42], 46: [2, 30], 47: [2, 31], 74: [2, 34], 75: [2, 24], 76: [2, 25], 81: [2, 32], 82: [2, 33], 83: [2, 28], 84: [2, 23], 85: [2, 21] },
        parseError: function parseError(str, hash) {
            if (hash.recoverable) {
                this.trace(str);
            } else {
                var error = new Error(str);
                error.hash = hash;
                throw error;
            }
        },
        parse: function parse(input) {
            var self = this,
                stack = [0],
                tstack = [],
                vstack = [null],
                lstack = [],
                table = this.table,
                yytext = '',
                yylineno = 0,
                yyleng = 0,
                recovering = 0,
                TERROR = 2,
                EOF = 1;
            var args = lstack.slice.call(arguments, 1);
            var lexer = Object.create(this.lexer);
            var sharedState = { yy: {} };
            for (var k in this.yy) {
                if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
                    sharedState.yy[k] = this.yy[k];
                }
            }
            lexer.setInput(input, sharedState.yy);
            sharedState.yy.lexer = lexer;
            sharedState.yy.parser = this;
            if (typeof lexer.yylloc == 'undefined') {
                lexer.yylloc = {};
            }
            var yyloc = lexer.yylloc;
            lstack.push(yyloc);
            var ranges = lexer.options && lexer.options.ranges;
            if (typeof sharedState.yy.parseError === 'function') {
                this.parseError = sharedState.yy.parseError;
            } else {
                this.parseError = Object.getPrototypeOf(this).parseError;
            }
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = tstack.pop() || lexer.lex() || EOF;
                if (typeof token !== 'number') {
                    if (token instanceof Array) {
                        tstack = token;
                        token = tstack.pop();
                    }
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol,
                preErrorSymbol,
                state,
                action,
                a,
                r,
                yyval = {},
                p,
                len,
                newState,
                expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol === null || typeof symbol == 'undefined') {
                        symbol = lex();
                    }
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === 'undefined' || !action.length || !action[0]) {
                    var errStr = '';
                    expected = [];
                    for (p in table[state]) {
                        if (this.terminals_[p] && p > TERROR) {
                            expected.push('\'' + this.terminals_[p] + '\'');
                        }
                    }
                    if (lexer.showPosition) {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                    } else {
                        errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                    }
                    this.parseError(errStr, {
                        text: lexer.match,
                        token: this.terminals_[symbol] || symbol,
                        line: lexer.yylineno,
                        loc: yyloc,
                        expected: expected
                    });
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(lexer.yytext);
                        lstack.push(lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = lexer.yyleng;
                            yytext = lexer.yytext;
                            yylineno = lexer.yylineno;
                            yyloc = lexer.yylloc;
                            if (recovering > 0) {
                                recovering--;
                            }
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = {
                            first_line: lstack[lstack.length - (len || 1)].first_line,
                            last_line: lstack[lstack.length - 1].last_line,
                            first_column: lstack[lstack.length - (len || 1)].first_column,
                            last_column: lstack[lstack.length - 1].last_column
                        };
                        if (ranges) {
                            yyval._$.range = [lstack[lstack.length - (len || 1)].range[0], lstack[lstack.length - 1].range[1]];
                        }
                        r = this.performAction.apply(yyval, [yytext, yyleng, yylineno, sharedState.yy, action[1], vstack, lstack].concat(args));
                        if (typeof r !== 'undefined') {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        } };

    /* generated by jison-lex 0.3.4 */
    var lexer = function () {
        var lexer = {

            EOF: 1,

            parseError: function parseError(str, hash) {
                if (this.yy.parser) {
                    this.yy.parser.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },

            // resets the lexer, sets new input
            setInput: function setInput(input, yy) {
                this.yy = yy || this.yy || {};
                this._input = input;
                this._more = this._backtrack = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = {
                    first_line: 1,
                    first_column: 0,
                    last_line: 1,
                    last_column: 0
                };
                if (this.options.ranges) {
                    this.yylloc.range = [0, 0];
                }
                this.offset = 0;
                return this;
            },

            // consumes and returns one char from the input
            input: function input() {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.offset++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno++;
                    this.yylloc.last_line++;
                } else {
                    this.yylloc.last_column++;
                }
                if (this.options.ranges) {
                    this.yylloc.range[1]++;
                }

                this._input = this._input.slice(1);
                return ch;
            },

            // unshifts one char (or a string) into the input
            unput: function unput(ch) {
                var len = ch.length;
                var lines = ch.split(/(?:\r\n?|\n)/g);

                this._input = ch + this._input;
                this.yytext = this.yytext.substr(0, this.yytext.length - len);
                //this.yyleng -= len;
                this.offset -= len;
                var oldLines = this.match.split(/(?:\r\n?|\n)/g);
                this.match = this.match.substr(0, this.match.length - 1);
                this.matched = this.matched.substr(0, this.matched.length - 1);

                if (lines.length - 1) {
                    this.yylineno -= lines.length - 1;
                }
                var r = this.yylloc.range;

                this.yylloc = {
                    first_line: this.yylloc.first_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.first_column,
                    last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
                };

                if (this.options.ranges) {
                    this.yylloc.range = [r[0], r[0] + this.yyleng - len];
                }
                this.yyleng = this.yytext.length;
                return this;
            },

            // When called from action, caches matched text and appends it on next action
            more: function more() {
                this._more = true;
                return this;
            },

            // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
            reject: function reject() {
                if (this.options.backtrack_lexer) {
                    this._backtrack = true;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
                return this;
            },

            // retain first n characters of the match
            less: function less(n) {
                this.unput(this.match.slice(n));
            },

            // displays already matched input, i.e. for error messages
            pastInput: function pastInput() {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },

            // displays upcoming input, i.e. for error messages
            upcomingInput: function upcomingInput() {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },

            // displays the character position where the lexing error occurred, i.e. for error messages
            showPosition: function showPosition() {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },

            // test the lexed token: return FALSE when not a match, otherwise return token
            test_match: function test_match(match, indexed_rule) {
                var token, lines, backup;

                if (this.options.backtrack_lexer) {
                    // save context
                    backup = {
                        yylineno: this.yylineno,
                        yylloc: {
                            first_line: this.yylloc.first_line,
                            last_line: this.last_line,
                            first_column: this.yylloc.first_column,
                            last_column: this.yylloc.last_column
                        },
                        yytext: this.yytext,
                        match: this.match,
                        matches: this.matches,
                        matched: this.matched,
                        yyleng: this.yyleng,
                        offset: this.offset,
                        _more: this._more,
                        _input: this._input,
                        yy: this.yy,
                        conditionStack: this.conditionStack.slice(0),
                        done: this.done
                    };
                    if (this.options.ranges) {
                        backup.yylloc.range = this.yylloc.range.slice(0);
                    }
                }

                lines = match[0].match(/(?:\r\n?|\n).*/g);
                if (lines) {
                    this.yylineno += lines.length;
                }
                this.yylloc = {
                    first_line: this.yylloc.last_line,
                    last_line: this.yylineno + 1,
                    first_column: this.yylloc.last_column,
                    last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
                };
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                if (this.options.ranges) {
                    this.yylloc.range = [this.offset, this.offset += this.yyleng];
                }
                this._more = false;
                this._backtrack = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
                if (this.done && this._input) {
                    this.done = false;
                }
                if (token) {
                    return token;
                } else if (this._backtrack) {
                    // recover context
                    for (var k in backup) {
                        this[k] = backup[k];
                    }
                    return false; // rule action called reject() implying the next rule should be tested instead.
                }
                return false;
            },

            // return next match in input
            next: function next() {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) {
                    this.done = true;
                }

                var token, match, tempMatch, index;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    tempMatch = this._input.match(this.rules[rules[i]]);
                    if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                        match = tempMatch;
                        index = i;
                        if (this.options.backtrack_lexer) {
                            token = this.test_match(tempMatch, rules[i]);
                            if (token !== false) {
                                return token;
                            } else if (this._backtrack) {
                                match = false;
                                continue; // rule action called reject() implying a rule MISmatch.
                            } else {
                                // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                                return false;
                            }
                        } else if (!this.options.flex) {
                            break;
                        }
                    }
                }
                if (match) {
                    token = this.test_match(match, rules[index]);
                    if (token !== false) {
                        return token;
                    }
                    // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                    return false;
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                        text: "",
                        token: null,
                        line: this.yylineno
                    });
                }
            },

            // return next match that has a token
            lex: function lex() {
                var r = this.next();
                if (r) {
                    return r;
                } else {
                    return this.lex();
                }
            },

            // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },

            // pop the previously active lexer condition state off the condition stack
            popState: function popState() {
                var n = this.conditionStack.length - 1;
                if (n > 0) {
                    return this.conditionStack.pop();
                } else {
                    return this.conditionStack[0];
                }
            },

            // produce the lexer rule set which is active for the currently active lexer condition state
            _currentRules: function _currentRules() {
                if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
                    return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                } else {
                    return this.conditions["INITIAL"].rules;
                }
            },

            // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
            topState: function topState(n) {
                n = this.conditionStack.length - 1 - Math.abs(n || 0);
                if (n >= 0) {
                    return this.conditionStack[n];
                } else {
                    return "INITIAL";
                }
            },

            // alias for begin(condition)
            pushState: function pushState(condition) {
                this.begin(condition);
            },

            // return the number of states currently on the stack
            stateStackSize: function stateStackSize() {
                return this.conditionStack.length;
            },
            options: { "case-insensitive": true },
            performAction: function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
                var YYSTATE = YY_START;
                switch ($avoiding_name_collisions) {
                    case 0:
                        return 5;
                        break;
                    case 1:
                        /* skip all whitespace */
                        break;
                    case 2:
                        /* skip same-line whitespace */
                        break;
                    case 3:
                        /* skip comments */
                        break;
                    case 4:
                        /* skip comments */
                        break;
                    case 5:
                        this.begin('ID');return 10;
                        break;
                    case 6:
                        this.begin('ALIAS');return 40;
                        break;
                    case 7:
                        this.popState();this.popState();this.begin('LINE');return 12;
                        break;
                    case 8:
                        this.popState();this.popState();return 5;
                        break;
                    case 9:
                        this.begin('LINE');return 20;
                        break;
                    case 10:
                        this.begin('LINE');return 22;
                        break;
                    case 11:
                        this.begin('LINE');return 23;
                        break;
                    case 12:
                        this.begin('LINE');return 28;
                        break;
                    case 13:
                        this.begin('LINE');return 25;
                        break;
                    case 14:
                        this.begin('LINE');return 27;
                        break;
                    case 15:
                        this.popState();return 13;
                        break;
                    case 16:
                        return 21;
                        break;
                    case 17:
                        return 35;
                        break;
                    case 18:
                        return 36;
                        break;
                    case 19:
                        return 31;
                        break;
                    case 20:
                        return 29;
                        break;
                    case 21:
                        this.begin('ID');return 15;
                        break;
                    case 22:
                        this.begin('ID');return 16;
                        break;
                    case 23:
                        return 18;
                        break;
                    case 24:
                        return 6;
                        break;
                    case 25:
                        return 34;
                        break;
                    case 26:
                        return 5;
                        break;
                    case 27:
                        yy_.yytext = yy_.yytext.trim();return 40;
                        break;
                    case 28:
                        return 43;
                        break;
                    case 29:
                        return 44;
                        break;
                    case 30:
                        return 41;
                        break;
                    case 31:
                        return 42;
                        break;
                    case 32:
                        return 45;
                        break;
                    case 33:
                        return 46;
                        break;
                    case 34:
                        return 47;
                        break;
                    case 35:
                        return 38;
                        break;
                    case 36:
                        return 39;
                        break;
                    case 37:
                        return 5;
                        break;
                    case 38:
                        return 'INVALID';
                        break;
                }
            },
            rules: [/^(?:[\n]+)/i, /^(?:\s+)/i, /^(?:((?!\n)\s)+)/i, /^(?:#[^\n]*)/i, /^(?:%[^\n]*)/i, /^(?:participant\b)/i, /^(?:[^\->:\n,;]+?(?=((?!\n)\s)+as(?!\n)\s|[#\n;]|$))/i, /^(?:as\b)/i, /^(?:(?:))/i, /^(?:loop\b)/i, /^(?:opt\b)/i, /^(?:alt\b)/i, /^(?:else\b)/i, /^(?:par\b)/i, /^(?:and\b)/i, /^(?:[^#\n;]*)/i, /^(?:end\b)/i, /^(?:left of\b)/i, /^(?:right of\b)/i, /^(?:over\b)/i, /^(?:note\b)/i, /^(?:activate\b)/i, /^(?:deactivate\b)/i, /^(?:title\b)/i, /^(?:sequenceDiagram\b)/i, /^(?:,)/i, /^(?:;)/i, /^(?:[^\+\->:\n,;]+)/i, /^(?:->>)/i, /^(?:-->>)/i, /^(?:->)/i, /^(?:-->)/i, /^(?:-[x])/i, /^(?:--[x])/i, /^(?::[^#\n;]+)/i, /^(?:\+)/i, /^(?:-)/i, /^(?:$)/i, /^(?:.)/i],
            conditions: { "LINE": { "rules": [2, 3, 15], "inclusive": false }, "ALIAS": { "rules": [2, 3, 7, 8], "inclusive": false }, "ID": { "rules": [2, 3, 6], "inclusive": false }, "INITIAL": { "rules": [0, 1, 3, 4, 5, 9, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], "inclusive": true } }
        };
        return lexer;
    }();
    parser.lexer = lexer;
    function Parser() {
        this.yy = {};
    }
    Parser.prototype = parser;parser.Parser = Parser;
    return new Parser();
}();

if (true) {
    exports.parser = parser;
    exports.Parser = parser.Parser;
    exports.parse = function () {
        return parser.parse.apply(parser, arguments);
    };
    exports.main = function commonjsMain(args) {
        if (!args[1]) {
            console.log('Usage: ' + args[0] + ' FILE');
            process.exit(1);
        }
        var source = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js").readFileSync(__webpack_require__(/*! path */ "./node_modules/path-browserify/index.js").normalize(args[1]), "utf8");
        return exports.parser.parse(source);
    };
    if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
        exports.main(process.argv.slice(1));
    }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../node_modules/process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../../../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/diagrams/sequence/sequenceDb.js":
/*!*********************************************!*\
  !*** ./src/diagrams/sequence/sequenceDb.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apply = exports.setTitle = exports.addNote = exports.PLACEMENT = exports.ARROWTYPE = exports.LINETYPE = exports.clear = exports.getTitle = exports.getActorKeys = exports.getActor = exports.getActors = exports.getMessages = exports.addSignal = exports.addMessage = exports.addActor = undefined;

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var actors = {};
var messages = [];
var notes = [];
var title = '';

var addActor = exports.addActor = function addActor(id, name, description) {
  // Don't allow description nulling
  var old = actors[id];
  if (old && name === old.name && description == null) return;

  // Don't allow null descriptions, either
  if (description == null) description = name;

  actors[id] = { name: name, description: description };
};

var addMessage = exports.addMessage = function addMessage(idFrom, idTo, message, answer) {
  messages.push({ from: idFrom, to: idTo, message: message, answer: answer });
};

var addSignal = exports.addSignal = function addSignal(idFrom, idTo, message, messageType) {
  _logger.logger.debug('Adding message from=' + idFrom + ' to=' + idTo + ' message=' + message + ' type=' + messageType);
  messages.push({ from: idFrom, to: idTo, message: message, type: messageType });
};

var getMessages = exports.getMessages = function getMessages() {
  return messages;
};

var getActors = exports.getActors = function getActors() {
  return actors;
};
var getActor = exports.getActor = function getActor(id) {
  return actors[id];
};
var getActorKeys = exports.getActorKeys = function getActorKeys() {
  return Object.keys(actors);
};
var getTitle = exports.getTitle = function getTitle() {
  return title;
};

var clear = exports.clear = function clear() {
  actors = {};
  messages = [];
};

var LINETYPE = exports.LINETYPE = {
  SOLID: 0,
  DOTTED: 1,
  NOTE: 2,
  SOLID_CROSS: 3,
  DOTTED_CROSS: 4,
  SOLID_OPEN: 5,
  DOTTED_OPEN: 6,
  LOOP_START: 10,
  LOOP_END: 11,
  ALT_START: 12,
  ALT_ELSE: 13,
  ALT_END: 14,
  OPT_START: 15,
  OPT_END: 16,
  ACTIVE_START: 17,
  ACTIVE_END: 18,
  PAR_START: 19,
  PAR_AND: 20,
  PAR_END: 21
};

var ARROWTYPE = exports.ARROWTYPE = {
  FILLED: 0,
  OPEN: 1
};

var PLACEMENT = exports.PLACEMENT = {
  LEFTOF: 0,
  RIGHTOF: 1,
  OVER: 2
};

var addNote = exports.addNote = function addNote(actor, placement, message) {
  var note = { actor: actor, placement: placement, message: message

    // Coerce actor into a [to, from, ...] array
  };var actors = [].concat(actor, actor);

  notes.push(note);
  messages.push({ from: actors[0], to: actors[1], message: message, type: LINETYPE.NOTE, placement: placement });
};

var setTitle = exports.setTitle = function setTitle(titleText) {
  title = titleText;
};

var apply = exports.apply = function apply(param) {
  if (param instanceof Array) {
    param.forEach(function (item) {
      apply(item);
    });
  } else {
    switch (param.type) {
      case 'addActor':
        addActor(param.actor, param.actor, param.description);
        break;
      case 'activeStart':
        addSignal(param.actor, undefined, undefined, param.signalType);
        break;
      case 'activeEnd':
        addSignal(param.actor, undefined, undefined, param.signalType);
        break;
      case 'addNote':
        addNote(param.actor, param.placement, param.text);
        break;
      case 'addMessage':
        addSignal(param.from, param.to, param.msg, param.signalType);
        break;
      case 'loopStart':
        addSignal(undefined, undefined, param.loopText, param.signalType);
        break;
      case 'loopEnd':
        addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'optStart':
        addSignal(undefined, undefined, param.optText, param.signalType);
        break;
      case 'optEnd':
        addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'altStart':
        addSignal(undefined, undefined, param.altText, param.signalType);
        break;
      case 'else':
        addSignal(undefined, undefined, param.altText, param.signalType);
        break;
      case 'altEnd':
        addSignal(undefined, undefined, undefined, param.signalType);
        break;
      case 'setTitle':
        setTitle(param.text);
        break;
      case 'parStart':
        addSignal(undefined, undefined, param.parText, param.signalType);
        break;
      case 'and':
        addSignal(undefined, undefined, param.parText, param.signalType);
        break;
      case 'parEnd':
        addSignal(undefined, undefined, undefined, param.signalType);
        break;
    }
  }
};

exports.default = {
  addActor: addActor,
  addMessage: addMessage,
  addSignal: addSignal,
  getMessages: getMessages,
  getActors: getActors,
  getActor: getActor,
  getActorKeys: getActorKeys,
  getTitle: getTitle,
  clear: clear,
  LINETYPE: LINETYPE,
  ARROWTYPE: ARROWTYPE,
  PLACEMENT: PLACEMENT,
  addNote: addNote,
  setTitle: setTitle,
  apply: apply
};

/***/ }),

/***/ "./src/diagrams/sequence/sequenceRenderer.js":
/*!***************************************************!*\
  !*** ./src/diagrams/sequence/sequenceRenderer.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.draw = exports.setConf = exports.drawActors = exports.bounds = undefined;

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _svgDraw = __webpack_require__(/*! ./svgDraw */ "./src/diagrams/sequence/svgDraw.js");

var _svgDraw2 = _interopRequireDefault(_svgDraw);

var _logger = __webpack_require__(/*! ../../logger */ "./src/logger.js");

var _sequenceDiagram = __webpack_require__(/*! ./parser/sequenceDiagram */ "./src/diagrams/sequence/parser/sequenceDiagram.js");

var _sequenceDb = __webpack_require__(/*! ./sequenceDb */ "./src/diagrams/sequence/sequenceDb.js");

var _sequenceDb2 = _interopRequireDefault(_sequenceDb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

_sequenceDiagram.parser.yy = _sequenceDb2.default;

var conf = {

  diagramMarginX: 50,
  diagramMarginY: 30,
  // Margin between actors
  actorMargin: 50,
  // Width of actor boxes
  width: 150,
  // Height of actor boxes
  height: 65,
  // Margin around loop boxes
  boxMargin: 10,
  boxTextMargin: 5,
  noteMargin: 10,
  // Space between messages
  messageMargin: 35,
  // mirror actors under diagram
  mirrorActors: false,
  // Depending on css styling this might need adjustment
  // Prolongs the edge of the diagram downwards
  bottomMarginAdj: 1,

  // width of activation box
  activationWidth: 10,

  // text placement as: tspan | fo | old only text as before
  textPlacement: 'tspan'
};

var bounds = exports.bounds = {
  data: {
    startx: undefined,
    stopx: undefined,
    starty: undefined,
    stopy: undefined
  },
  verticalPos: 0,

  sequenceItems: [],
  activations: [],
  init: function init() {
    this.sequenceItems = [];
    this.activations = [];
    this.data = {
      startx: undefined,
      stopx: undefined,
      starty: undefined,
      stopy: undefined
    };
    this.verticalPos = 0;
  },
  updateVal: function updateVal(obj, key, val, fun) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = val;
    } else {
      obj[key] = fun(val, obj[key]);
    }
  },
  updateBounds: function updateBounds(startx, starty, stopx, stopy) {
    var _self = this;
    var cnt = 0;
    function updateFn(type) {
      return function updateItemBounds(item) {
        cnt++;
        // The loop sequenceItems is a stack so the biggest margins in the beginning of the sequenceItems
        var n = _self.sequenceItems.length - cnt + 1;

        _self.updateVal(item, 'starty', starty - n * conf.boxMargin, Math.min);
        _self.updateVal(item, 'stopy', stopy + n * conf.boxMargin, Math.max);

        _self.updateVal(bounds.data, 'startx', startx - n * conf.boxMargin, Math.min);
        _self.updateVal(bounds.data, 'stopx', stopx + n * conf.boxMargin, Math.max);

        if (!(type === 'activation')) {
          _self.updateVal(item, 'startx', startx - n * conf.boxMargin, Math.min);
          _self.updateVal(item, 'stopx', stopx + n * conf.boxMargin, Math.max);

          _self.updateVal(bounds.data, 'starty', starty - n * conf.boxMargin, Math.min);
          _self.updateVal(bounds.data, 'stopy', stopy + n * conf.boxMargin, Math.max);
        }
      };
    }

    this.sequenceItems.forEach(updateFn());
    this.activations.forEach(updateFn('activation'));
  },
  insert: function insert(startx, starty, stopx, stopy) {
    var _startx = Math.min(startx, stopx);
    var _stopx = Math.max(startx, stopx);
    var _starty = Math.min(starty, stopy);
    var _stopy = Math.max(starty, stopy);

    this.updateVal(bounds.data, 'startx', _startx, Math.min);
    this.updateVal(bounds.data, 'starty', _starty, Math.min);
    this.updateVal(bounds.data, 'stopx', _stopx, Math.max);
    this.updateVal(bounds.data, 'stopy', _stopy, Math.max);

    this.updateBounds(_startx, _starty, _stopx, _stopy);
  },
  newActivation: function newActivation(message, diagram) {
    var actorRect = _sequenceDiagram.parser.yy.getActors()[message.from.actor];
    var stackedSize = actorActivations(message.from.actor).length;
    var x = actorRect.x + conf.width / 2 + (stackedSize - 1) * conf.activationWidth / 2;
    this.activations.push({
      startx: x,
      starty: this.verticalPos + 2,
      stopx: x + conf.activationWidth,
      stopy: undefined,
      actor: message.from.actor,
      anchored: _svgDraw2.default.anchorElement(diagram)
    });
  },
  endActivation: function endActivation(message) {
    // find most recent activation for given actor
    var lastActorActivationIdx = this.activations.map(function (activation) {
      return activation.actor;
    }).lastIndexOf(message.from.actor);
    var activation = this.activations.splice(lastActorActivationIdx, 1)[0];
    return activation;
  },
  newLoop: function newLoop(title) {
    this.sequenceItems.push({ startx: undefined, starty: this.verticalPos, stopx: undefined, stopy: undefined, title: title });
  },
  endLoop: function endLoop() {
    var loop = this.sequenceItems.pop();
    return loop;
  },
  addSectionToLoop: function addSectionToLoop(message) {
    var loop = this.sequenceItems.pop();
    loop.sections = loop.sections || [];
    loop.sectionTitles = loop.sectionTitles || [];
    loop.sections.push(bounds.getVerticalPos());
    loop.sectionTitles.push(message);
    this.sequenceItems.push(loop);
  },
  bumpVerticalPos: function bumpVerticalPos(bump) {
    this.verticalPos = this.verticalPos + bump;
    this.data.stopy = this.verticalPos;
  },
  getVerticalPos: function getVerticalPos() {
    return this.verticalPos;
  },
  getBounds: function getBounds() {
    return this.data;
  }
};

var _drawLongText = function _drawLongText(text, x, y, g, width) {
  var textHeight = 0;
  var lines = text.split(/<br\/?>/ig);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var line = _step.value;

      var textObj = _svgDraw2.default.getTextObj();
      textObj.x = x;
      textObj.y = y + textHeight;
      textObj.textMargin = conf.noteMargin;
      textObj.dy = '1em';
      textObj.text = line;
      textObj.class = 'noteText';
      var textElem = _svgDraw2.default.drawText(g, textObj, width);
      textHeight += (textElem._groups || textElem)[0][0].getBBox().height;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return textHeight;
};

/**
 * Draws an actor in the diagram with the attaced line
 * @param center - The center of the the actor
 * @param pos The position if the actor in the liost of actors
 * @param description The text in the box
 */
var drawNote = function drawNote(elem, startx, verticalPos, msg, forceWidth) {
  var rect = _svgDraw2.default.getNoteRect();
  rect.x = startx;
  rect.y = verticalPos;
  rect.width = forceWidth || conf.width;
  rect.class = 'note';

  var g = elem.append('g');
  var rectElem = _svgDraw2.default.drawRect(g, rect);

  var textHeight = _drawLongText(msg.message, startx - 4, verticalPos + 24, g, rect.width - conf.noteMargin);

  bounds.insert(startx, verticalPos, startx + rect.width, verticalPos + 2 * conf.noteMargin + textHeight);
  rectElem.attr('height', textHeight + 2 * conf.noteMargin);
  bounds.bumpVerticalPos(textHeight + 2 * conf.noteMargin);
};

/**
 * Draws a message
 * @param elem
 * @param startx
 * @param stopx
 * @param verticalPos
 * @param txtCenter
 * @param msg
 */
var drawMessage = function drawMessage(elem, startx, stopx, verticalPos, msg) {
  var g = elem.append('g');
  var txtCenter = startx + (stopx - startx) / 2;

  var textElem = g.append('text') // text label for the x axis
  .attr('x', txtCenter).attr('y', verticalPos - 7).style('text-anchor', 'middle').attr('class', 'messageText').text(msg.message);

  var textWidth = (textElem._groups || textElem)[0][0].getBBox().width;

  var line = void 0;
  if (startx === stopx) {
    line = g.append('path').attr('d', 'M ' + startx + ',' + verticalPos + ' C ' + (startx + 60) + ',' + (verticalPos - 10) + ' ' + (startx + 60) + ',' + (verticalPos + 30) + ' ' + startx + ',' + (verticalPos + 20));

    bounds.bumpVerticalPos(30);
    var dx = Math.max(textWidth / 2, 100);
    bounds.insert(startx - dx, bounds.getVerticalPos() - 10, stopx + dx, bounds.getVerticalPos());
  } else {
    line = g.append('line');
    line.attr('x1', startx);
    line.attr('y1', verticalPos);
    line.attr('x2', stopx);
    line.attr('y2', verticalPos);
    bounds.insert(startx, bounds.getVerticalPos() - 10, stopx, bounds.getVerticalPos());
  }
  // Make an SVG Container
  // Draw the line
  if (msg.type === _sequenceDiagram.parser.yy.LINETYPE.DOTTED || msg.type === _sequenceDiagram.parser.yy.LINETYPE.DOTTED_CROSS || msg.type === _sequenceDiagram.parser.yy.LINETYPE.DOTTED_OPEN) {
    line.style('stroke-dasharray', '3, 3');
    line.attr('class', 'messageLine1');
  } else {
    line.attr('class', 'messageLine0');
  }

  var url = '';
  if (conf.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  line.attr('stroke-width', 2);
  line.attr('stroke', 'black');
  line.style('fill', 'none'); // remove any fill colour
  if (msg.type === _sequenceDiagram.parser.yy.LINETYPE.SOLID || msg.type === _sequenceDiagram.parser.yy.LINETYPE.DOTTED) {
    line.attr('marker-end', 'url(' + url + '#arrowhead)');
  }

  if (msg.type === _sequenceDiagram.parser.yy.LINETYPE.SOLID_CROSS || msg.type === _sequenceDiagram.parser.yy.LINETYPE.DOTTED_CROSS) {
    line.attr('marker-end', 'url(' + url + '#crosshead)');
  }
};

var drawActors = exports.drawActors = function drawActors(diagram, actors, actorKeys, verticalPos) {
  // Draw the actors
  for (var i = 0; i < actorKeys.length; i++) {
    var key = actorKeys[i];

    // Add some rendering data to the object
    actors[key].x = i * conf.actorMargin + i * conf.width;
    actors[key].y = verticalPos;
    actors[key].width = conf.diagramMarginX;
    actors[key].height = conf.diagramMarginY;

    // Draw the box with the attached line
    _svgDraw2.default.drawActor(diagram, actors[key].x, verticalPos, actors[key].description, conf);
    bounds.insert(actors[key].x, verticalPos, actors[key].x + conf.width, conf.height);
  }

  // Add a margin between the actor boxes and the first arrow
  bounds.bumpVerticalPos(conf.height);
};

var setConf = exports.setConf = function setConf(cnf) {
  var keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};

var actorActivations = function actorActivations(actor) {
  return bounds.activations.filter(function (activation) {
    return activation.actor === actor;
  });
};

var actorFlowVerticaBounds = function actorFlowVerticaBounds(actor) {
  // handle multiple stacked activations for same actor
  var actors = _sequenceDiagram.parser.yy.getActors();
  var activations = actorActivations(actor);

  var left = activations.reduce(function (acc, activation) {
    return Math.min(acc, activation.startx);
  }, actors[actor].x + conf.width / 2);
  var right = activations.reduce(function (acc, activation) {
    return Math.max(acc, activation.stopx);
  }, actors[actor].x + conf.width / 2);
  return [left, right];
};

/**
 * Draws a flowchart in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
var draw = exports.draw = function draw(text, id) {
  _sequenceDiagram.parser.yy.clear();
  _sequenceDiagram.parser.parse(text + '\n');

  bounds.init();
  var diagram = d3.select('[id="' + id + '"]');

  var startx = void 0;
  var stopx = void 0;
  var forceWidth = void 0;

  // Fetch data from the parsing
  var actors = _sequenceDiagram.parser.yy.getActors();
  var actorKeys = _sequenceDiagram.parser.yy.getActorKeys();
  var messages = _sequenceDiagram.parser.yy.getMessages();
  var title = _sequenceDiagram.parser.yy.getTitle();
  drawActors(diagram, actors, actorKeys, 0);

  // The arrow head definition is attached to the svg once
  _svgDraw2.default.insertArrowHead(diagram);
  _svgDraw2.default.insertArrowCrossHead(diagram);

  function activeEnd(msg, verticalPos) {
    var activationData = bounds.endActivation(msg);
    if (activationData.starty + 18 > verticalPos) {
      activationData.starty = verticalPos - 6;
      verticalPos += 12;
    }
    _svgDraw2.default.drawActivation(diagram, activationData, verticalPos, conf);

    bounds.insert(activationData.startx, verticalPos - 10, activationData.stopx, verticalPos);
  }

  // const lastMsg

  // Draw the messages/signals
  messages.forEach(function (msg) {
    var loopData = void 0;
    switch (msg.type) {
      case _sequenceDiagram.parser.yy.LINETYPE.NOTE:
        bounds.bumpVerticalPos(conf.boxMargin);

        startx = actors[msg.from].x;
        stopx = actors[msg.to].x;

        if (msg.placement === _sequenceDiagram.parser.yy.PLACEMENT.RIGHTOF) {
          drawNote(diagram, startx + (conf.width + conf.actorMargin) / 2, bounds.getVerticalPos(), msg);
        } else if (msg.placement === _sequenceDiagram.parser.yy.PLACEMENT.LEFTOF) {
          drawNote(diagram, startx - (conf.width + conf.actorMargin) / 2, bounds.getVerticalPos(), msg);
        } else if (msg.to === msg.from) {
          // Single-actor over
          drawNote(diagram, startx, bounds.getVerticalPos(), msg);
        } else {
          // Multi-actor over
          forceWidth = Math.abs(startx - stopx) + conf.actorMargin;
          drawNote(diagram, (startx + stopx + conf.width - forceWidth) / 2, bounds.getVerticalPos(), msg, forceWidth);
        }
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.ACTIVE_START:
        bounds.newActivation(msg, diagram);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.ACTIVE_END:
        activeEnd(msg, bounds.getVerticalPos());
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.LOOP_START:
        bounds.bumpVerticalPos(conf.boxMargin);
        bounds.newLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.LOOP_END:
        loopData = bounds.endLoop();

        _svgDraw2.default.drawLoop(diagram, loopData, 'loop', conf);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.OPT_START:
        bounds.bumpVerticalPos(conf.boxMargin);
        bounds.newLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.OPT_END:
        loopData = bounds.endLoop();

        _svgDraw2.default.drawLoop(diagram, loopData, 'opt', conf);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.ALT_START:
        bounds.bumpVerticalPos(conf.boxMargin);
        bounds.newLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.ALT_ELSE:
        bounds.bumpVerticalPos(conf.boxMargin);
        loopData = bounds.addSectionToLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.ALT_END:
        loopData = bounds.endLoop();

        _svgDraw2.default.drawLoop(diagram, loopData, 'alt', conf);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.PAR_START:
        bounds.bumpVerticalPos(conf.boxMargin);
        bounds.newLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin + conf.boxTextMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.PAR_AND:
        bounds.bumpVerticalPos(conf.boxMargin);
        loopData = bounds.addSectionToLoop(msg.message);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      case _sequenceDiagram.parser.yy.LINETYPE.PAR_END:
        loopData = bounds.endLoop();
        _svgDraw2.default.drawLoop(diagram, loopData, 'par', conf);
        bounds.bumpVerticalPos(conf.boxMargin);
        break;
      default:
        try {
          // lastMsg = msg
          bounds.bumpVerticalPos(conf.messageMargin);
          var fromBounds = actorFlowVerticaBounds(msg.from);
          var toBounds = actorFlowVerticaBounds(msg.to);
          var fromIdx = fromBounds[0] <= toBounds[0] ? 1 : 0;
          var toIdx = fromBounds[0] < toBounds[0] ? 0 : 1;
          startx = fromBounds[fromIdx];
          stopx = toBounds[toIdx];

          var verticalPos = bounds.getVerticalPos();
          drawMessage(diagram, startx, stopx, verticalPos, msg);
          var allBounds = fromBounds.concat(toBounds);
          bounds.insert(Math.min.apply(null, allBounds), verticalPos, Math.max.apply(null, allBounds), verticalPos);
        } catch (e) {
          _logger.logger.error('error while drawing message', e);
        }
    }
  });

  if (conf.mirrorActors) {
    // Draw actors below diagram
    bounds.bumpVerticalPos(conf.boxMargin * 2);
    drawActors(diagram, actors, actorKeys, bounds.getVerticalPos());
  }

  var box = bounds.getBounds();

  // Adjust line height of actor lines now that the height of the diagram is known
  _logger.logger.debug('For line height fix Querying: #' + id + ' .actor-line');
  var actorLines = d3.selectAll('#' + id + ' .actor-line');
  actorLines.attr('y2', box.stopy);

  var height = box.stopy - box.starty + 2 * conf.diagramMarginY;
  if (conf.mirrorActors) {
    height = height - conf.boxMargin + conf.bottomMarginAdj;
  }

  var width = box.stopx - box.startx + 2 * conf.diagramMarginX;

  if (title) {
    diagram.append('text').text(title).attr('x', (box.stopx - box.startx) / 2 - 2 * conf.diagramMarginX).attr('y', -25);
  }

  if (conf.useMaxWidth) {
    diagram.attr('height', '100%');
    diagram.attr('width', '100%');
    diagram.attr('style', 'max-width:' + width + 'px;');
  } else {
    diagram.attr('height', height);
    diagram.attr('width', width);
  }
  var extraVertForTitle = title ? 40 : 0;
  diagram.attr('viewBox', box.startx - conf.diagramMarginX + ' -' + (conf.diagramMarginY + extraVertForTitle) + ' ' + width + ' ' + (height + extraVertForTitle));
};

exports.default = {
  bounds: bounds,
  drawActors: drawActors,
  setConf: setConf,
  draw: draw
};

/***/ }),

/***/ "./src/diagrams/sequence/svgDraw.js":
/*!******************************************!*\
  !*** ./src/diagrams/sequence/svgDraw.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var drawRect = exports.drawRect = function drawRect(elem, rectData) {
  var rectElem = elem.append('rect');
  rectElem.attr('x', rectData.x);
  rectElem.attr('y', rectData.y);
  rectElem.attr('fill', rectData.fill);
  rectElem.attr('stroke', rectData.stroke);
  rectElem.attr('width', rectData.width);
  rectElem.attr('height', rectData.height);
  rectElem.attr('rx', rectData.rx);
  rectElem.attr('ry', rectData.ry);

  if (typeof rectData.class !== 'undefined') {
    rectElem.attr('class', rectData.class);
  }

  return rectElem;
};

var drawText = exports.drawText = function drawText(elem, textData, width) {
  // Remove and ignore br:s
  var nText = textData.text.replace(/<br\/?>/ig, ' ');

  var textElem = elem.append('text');
  textElem.attr('x', textData.x);
  textElem.attr('y', textData.y);
  textElem.style('text-anchor', textData.anchor);
  textElem.attr('fill', textData.fill);
  if (typeof textData.class !== 'undefined') {
    textElem.attr('class', textData.class);
  }

  var span = textElem.append('tspan');
  span.attr('x', textData.x + textData.textMargin * 2);
  span.attr('fill', textData.fill);
  span.text(nText);

  return textElem;
};

var drawLabel = exports.drawLabel = function drawLabel(elem, txtObject) {
  function genPoints(x, y, width, height, cut) {
    return x + ',' + y + ' ' + (x + width) + ',' + y + ' ' + (x + width) + ',' + (y + height - cut) + ' ' + (x + width - cut * 1.2) + ',' + (y + height) + ' ' + x + ',' + (y + height);
  }
  var polygon = elem.append('polygon');
  polygon.attr('points', genPoints(txtObject.x, txtObject.y, 50, 20, 7));
  polygon.attr('class', 'labelBox');

  txtObject.y = txtObject.y + txtObject.labelMargin;
  txtObject.x = txtObject.x + 0.5 * txtObject.labelMargin;
  drawText(elem, txtObject);
};

var actorCnt = -1;
/**
 * Draws an actor in the diagram with the attaced line
 * @param center - The center of the the actor
 * @param pos The position if the actor in the liost of actors
 * @param description The text in the box
 */
var drawActor = exports.drawActor = function drawActor(elem, left, verticalPos, description, conf) {
  var center = left + conf.width / 2;
  var g = elem.append('g');
  if (verticalPos === 0) {
    actorCnt++;
    g.append('line').attr('id', 'actor' + actorCnt).attr('x1', center).attr('y1', 5).attr('x2', center).attr('y2', 2000).attr('class', 'actor-line').attr('stroke-width', '0.5px').attr('stroke', '#999');
  }

  var rect = getNoteRect();
  rect.x = left;
  rect.y = verticalPos;
  rect.fill = '#eaeaea';
  rect.width = conf.width;
  rect.height = conf.height;
  rect.class = 'actor';
  rect.rx = 3;
  rect.ry = 3;
  drawRect(g, rect);

  _drawTextCandidateFunc(conf)(description, g, rect.x, rect.y, rect.width, rect.height, { 'class': 'actor' });
};

var anchorElement = exports.anchorElement = function anchorElement(elem) {
  return elem.append('g');
};
/**
 * Draws an actor in the diagram with the attaced line
 * @param elem - element to append activation rect
 * @param bounds - activation box bounds
 * @param verticalPos - precise y cooridnate of bottom activation box edge
 */
var drawActivation = exports.drawActivation = function drawActivation(elem, bounds, verticalPos) {
  var rect = getNoteRect();
  var g = bounds.anchored;
  rect.x = bounds.startx;
  rect.y = bounds.starty;
  rect.fill = '#f4f4f4';
  rect.width = bounds.stopx - bounds.startx;
  rect.height = verticalPos - bounds.starty;
  drawRect(g, rect);
};

/**
 * Draws an actor in the diagram with the attaced line
 * @param center - The center of the the actor
 * @param pos The position if the actor in the list of actors
 * @param description The text in the box
 */
var drawLoop = exports.drawLoop = function drawLoop(elem, bounds, labelText, conf) {
  var g = elem.append('g');
  var drawLoopLine = function drawLoopLine(startx, starty, stopx, stopy) {
    return g.append('line').attr('x1', startx).attr('y1', starty).attr('x2', stopx).attr('y2', stopy).attr('class', 'loopLine');
  };
  drawLoopLine(bounds.startx, bounds.starty, bounds.stopx, bounds.starty);
  drawLoopLine(bounds.stopx, bounds.starty, bounds.stopx, bounds.stopy);
  drawLoopLine(bounds.startx, bounds.stopy, bounds.stopx, bounds.stopy);
  drawLoopLine(bounds.startx, bounds.starty, bounds.startx, bounds.stopy);
  if (typeof bounds.sections !== 'undefined') {
    bounds.sections.forEach(function (item) {
      drawLoopLine(bounds.startx, item, bounds.stopx, item).style('stroke-dasharray', '3, 3');
    });
  }

  var txt = getTextObj();
  txt.text = labelText;
  txt.x = bounds.startx;
  txt.y = bounds.starty;
  txt.labelMargin = 1.5 * 10; // This is the small box that says "loop"
  txt.class = 'labelText'; // Its size & position are fixed.

  drawLabel(g, txt);

  txt = getTextObj();
  txt.text = '[ ' + bounds.title + ' ]';
  txt.x = bounds.startx + (bounds.stopx - bounds.startx) / 2;
  txt.y = bounds.starty + 1.5 * conf.boxMargin;
  txt.anchor = 'middle';
  txt.class = 'loopText';

  drawText(g, txt);

  if (typeof bounds.sectionTitles !== 'undefined') {
    bounds.sectionTitles.forEach(function (item, idx) {
      if (item !== '') {
        txt.text = '[ ' + item + ' ]';
        txt.y = bounds.sections[idx] + 1.5 * conf.boxMargin;
        drawText(g, txt);
      }
    });
  }
};

/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
var insertArrowHead = exports.insertArrowHead = function insertArrowHead(elem) {
  elem.append('defs').append('marker').attr('id', 'arrowhead').attr('refX', 5).attr('refY', 2).attr('markerWidth', 6).attr('markerHeight', 4).attr('orient', 'auto').append('path').attr('d', 'M 0,0 V 4 L6,2 Z'); // this is actual shape for arrowhead
};
/**
 * Setup arrow head and define the marker. The result is appended to the svg.
 */
var insertArrowCrossHead = exports.insertArrowCrossHead = function insertArrowCrossHead(elem) {
  var defs = elem.append('defs');
  var marker = defs.append('marker').attr('id', 'crosshead').attr('markerWidth', 15).attr('markerHeight', 8).attr('orient', 'auto').attr('refX', 16).attr('refY', 4);

  // The arrow
  marker.append('path').attr('fill', 'black').attr('stroke', '#000000').style('stroke-dasharray', '0, 0').attr('stroke-width', '1px').attr('d', 'M 9,2 V 6 L16,4 Z');

  // The cross
  marker.append('path').attr('fill', 'none').attr('stroke', '#000000').style('stroke-dasharray', '0, 0').attr('stroke-width', '1px').attr('d', 'M 0,1 L 6,7 M 6,1 L 0,7');
  // this is actual shape for arrowhead
};

var getTextObj = exports.getTextObj = function getTextObj() {
  var txt = {
    x: 0,
    y: 0,
    'fill': 'black',
    'text-anchor': 'start',
    style: '#666',
    width: 100,
    height: 100,
    textMargin: 0,
    rx: 0,
    ry: 0
  };
  return txt;
};

var getNoteRect = exports.getNoteRect = function getNoteRect() {
  var rect = {
    x: 0,
    y: 0,
    fill: '#EDF2AE',
    stroke: '#666',
    width: 100,
    anchor: 'start',
    height: 100,
    rx: 0,
    ry: 0
  };
  return rect;
};

var _drawTextCandidateFunc = function () {
  function byText(content, g, x, y, width, height, textAttrs) {
    var text = g.append('text').attr('x', x + width / 2).attr('y', y + height / 2 + 5).style('text-anchor', 'middle').text(content);
    _setTextAttrs(text, textAttrs);
  }

  function byTspan(content, g, x, y, width, height, textAttrs) {
    var text = g.append('text').attr('x', x + width / 2).attr('y', y).style('text-anchor', 'middle');
    text.append('tspan').attr('x', x + width / 2).attr('dy', '0').text(content);

    text.attr('y', y + height / 2.0).attr('dominant-baseline', 'central').attr('alignment-baseline', 'central');

    _setTextAttrs(text, textAttrs);
  }

  function byFo(content, g, x, y, width, height, textAttrs) {
    var s = g.append('switch');
    var f = s.append('foreignObject').attr('x', x).attr('y', y).attr('width', width).attr('height', height);

    var text = f.append('div').style('display', 'table').style('height', '100%').style('width', '100%');

    text.append('div').style('display', 'table-cell').style('text-align', 'center').style('vertical-align', 'middle').text(content);

    byTspan(content, s, x, y, width, height, textAttrs);
    _setTextAttrs(text, textAttrs);
  }

  function _setTextAttrs(toText, fromTextAttrsDict) {
    for (var key in fromTextAttrsDict) {
      if (fromTextAttrsDict.hasOwnProperty(key)) {
        toText.attr(key, fromTextAttrsDict[key]);
      }
    }
  }

  return function (conf) {
    return conf.textPlacement === 'fo' ? byFo : conf.textPlacement === 'old' ? byText : byTspan;
  };
}();

exports.default = {
  drawRect: drawRect,
  drawText: drawText,
  drawLabel: drawLabel,
  drawActor: drawActor,
  anchorElement: anchorElement,
  drawActivation: drawActivation,
  drawLoop: drawLoop,
  insertArrowHead: insertArrowHead,
  insertArrowCrossHead: insertArrowCrossHead,
  getTextObj: getTextObj,
  getNoteRect: getNoteRect
};

/***/ }),

/***/ "./src/logger.js":
/*!***********************!*\
  !*** ./src/logger.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setLogLevel = exports.logger = exports.LEVELS = undefined;

var _moment = __webpack_require__(/*! moment */ "moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LEVELS = exports.LEVELS = {
  debug: 1,
  info: 2,
  warn: 3,
  error: 4,
  fatal: 5
};

var logger = exports.logger = {
  debug: function debug() {},
  info: function info() {},
  warn: function warn() {},
  error: function error() {},
  fatal: function fatal() {}
};

var setLogLevel = exports.setLogLevel = function setLogLevel(level) {
  logger.debug = function () {};
  logger.info = function () {};
  logger.warn = function () {};
  logger.error = function () {};
  logger.fatal = function () {};
  if (level <= LEVELS.fatal) {
    logger.fatal = console.log.bind(console, '\x1b[35m', format('FATAL'));
  }
  if (level <= LEVELS.error) {
    logger.error = console.log.bind(console, '\x1b[31m', format('ERROR'));
  }
  if (level <= LEVELS.warn) {
    logger.warn = console.log.bind(console, '\x1B[33m', format('WARN'));
  }
  if (level <= LEVELS.info) {
    logger.info = console.log.bind(console, '\x1b[34m', format('INFO'));
  }
  if (level <= LEVELS.debug) {
    logger.debug = console.log.bind(console, '\x1b[32m', format('DEBUG'));
  }
};

var format = function format(level) {
  var time = (0, _moment2.default)().format('HH:mm:ss.SSS');
  return time + ' : ' + level + ' : ';
};

/***/ }),

/***/ "./src/mermaid.js":
/*!************************!*\
  !*** ./src/mermaid.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _he = __webpack_require__(/*! he */ "he");

var _he2 = _interopRequireDefault(_he);

var _mermaidAPI = __webpack_require__(/*! ./mermaidAPI */ "./src/mermaidAPI.js");

var _mermaidAPI2 = _interopRequireDefault(_mermaidAPI);

var _logger = __webpack_require__(/*! ./logger */ "./src/logger.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * ## init
 * Function that goes through the document to find the chart definitions in there and render them.
 *
 * The function tags the processed attributes with the attribute data-processed and ignores found elements with the
 * attribute already set. This way the init function can be triggered several times.
 *
 * Optionally, `init` can accept in the second argument one of the following:
 * - a DOM Node
 * - an array of DOM nodes (as would come from a jQuery selector)
 * - a W3C selector, a la `.mermaid`
 *
 * ```mermaid
 * graph LR;
 *  a(Find elements)-->b{Processed}
 *  b-->|Yes|c(Leave element)
 *  b-->|No |d(Transform)
 * ```
 * Renders the mermaid diagrams
 * @param nodes a css selector or an array of nodes
 */
var init = function init() {
  var conf = _mermaidAPI2.default.getConfig();
  _logger.logger.debug('Starting rendering diagrams');
  var nodes = void 0;
  if (arguments.length >= 2) {
    /*! sequence config was passed as #1 */
    if (typeof arguments[0] !== 'undefined') {
      mermaid.sequenceConfig = arguments[0];
    }

    nodes = arguments[1];
  } else {
    nodes = arguments[0];
  }

  // if last argument is a function this is the callback function
  var callback = void 0;
  if (typeof arguments[arguments.length - 1] === 'function') {
    callback = arguments[arguments.length - 1];
    _logger.logger.debug('Callback function found');
  } else {
    if (typeof conf.mermaid !== 'undefined') {
      if (typeof conf.mermaid.callback === 'function') {
        callback = conf.mermaid.callback;
        _logger.logger.debug('Callback function found');
      } else {
        _logger.logger.debug('No Callback function found');
      }
    }
  }
  nodes = nodes === undefined ? document.querySelectorAll('.mermaid') : typeof nodes === 'string' ? document.querySelectorAll(nodes) : nodes instanceof window.Node ? [nodes] : nodes; // Last case  - sequence config was passed pick next

  _logger.logger.debug('Start On Load before: ' + mermaid.startOnLoad);
  if (typeof mermaid.startOnLoad !== 'undefined') {
    _logger.logger.debug('Start On Load inner: ' + mermaid.startOnLoad);
    _mermaidAPI2.default.initialize({ startOnLoad: mermaid.startOnLoad });
  }

  if (typeof mermaid.ganttConfig !== 'undefined') {
    _mermaidAPI2.default.initialize({ gantt: mermaid.ganttConfig });
  }

  var txt = void 0;

  var _loop = function _loop(i) {
    var element = nodes[i];

    /*! Check if previously processed */
    if (!element.getAttribute('data-processed')) {
      element.setAttribute('data-processed', true);
    } else {
      return 'continue';
    }

    var id = 'mermaid-' + Date.now();

    // Fetch the graph definition including tags
    txt = element.innerHTML;

    // transforms the html to pure text
    txt = _he2.default.decode(txt).trim().replace(/<br>/ig, '<br/>');

    _mermaidAPI2.default.render(id, txt, function (svgCode, bindFunctions) {
      element.innerHTML = svgCode;
      if (typeof callback !== 'undefined') {
        callback(id);
      }
      bindFunctions(element);
    }, element);
  };

  for (var i = 0; i < nodes.length; i++) {
    var _ret = _loop(i);

    if (_ret === 'continue') continue;
  }
}; /**
    * Web page integration module for the mermaid framework. It uses the mermaidAPI for mermaid functionality and to render
    * the diagrams to svg code.
    */


var initialize = function initialize(config) {
  _logger.logger.debug('Initializing mermaid');
  if (typeof config.mermaid !== 'undefined') {
    if (typeof config.mermaid.startOnLoad !== 'undefined') {
      mermaid.startOnLoad = config.mermaid.startOnLoad;
    }
    if (typeof config.mermaid.htmlLabels !== 'undefined') {
      mermaid.htmlLabels = config.mermaid.htmlLabels;
    }
  }
  _mermaidAPI2.default.initialize(config);
};

/**
 * ##contentLoaded
 * Callback function that is called when page is loaded. This functions fetches configuration for mermaid rendering and
 * calls init for rendering the mermaid diagrams on the page.
 */
var contentLoaded = function contentLoaded() {
  var config = void 0;

  if (mermaid.startOnLoad) {
    // No config found, do check API config
    config = _mermaidAPI2.default.getConfig();
    if (config.startOnLoad) {
      mermaid.init();
    }
  } else {
    if (typeof mermaid.startOnLoad === 'undefined') {
      _logger.logger.debug('In start, no config');
      config = _mermaidAPI2.default.getConfig();
      if (config.startOnLoad) {
        mermaid.init();
      }
    }
  }
};

if (typeof document !== 'undefined') {
  /*!
   * Wait for document loaded before starting the execution
   */
  window.addEventListener('load', function () {
    contentLoaded();
  }, false);
}

var mermaid = {
  startOnLoad: true,
  htmlLabels: true,

  mermaidAPI: _mermaidAPI2.default,
  parse: _mermaidAPI2.default.parse,
  render: _mermaidAPI2.default.render,

  init: init,
  initialize: initialize,

  contentLoaded: contentLoaded
};

exports.default = mermaid;

/***/ }),

/***/ "./src/mermaidAPI.js":
/*!***************************!*\
  !*** ./src/mermaidAPI.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeEntities = exports.encodeEntities = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * ---
                                                                                                                                                                                                                                                                               * title: mermaidAPI
                                                                                                                                                                                                                                                                               * order: 5
                                                                                                                                                                                                                                                                               * ---
                                                                                                                                                                                                                                                                               * # mermaidAPI
                                                                                                                                                                                                                                                                               * This is the api to be used when handling the integration with the web page instead of using the default integration
                                                                                                                                                                                                                                                                               * (mermaid.js).
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * The core of this api is the **render** function that given a graph definitionas text renders the graph/diagram and
                                                                                                                                                                                                                                                                               * returns a svg element for the graph. It is is then up to the user of the API to make use of the svg, either insert it
                                                                                                                                                                                                                                                                               * somewhere in the page or something completely different.
                                                                                                                                                                                                                                                                              */


var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

var _scopeCss = __webpack_require__(/*! scope-css */ "scope-css");

var _scopeCss2 = _interopRequireDefault(_scopeCss);

var _logger = __webpack_require__(/*! ./logger */ "./src/logger.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

var _flowRenderer = __webpack_require__(/*! ./diagrams/flowchart/flowRenderer */ "./src/diagrams/flowchart/flowRenderer.js");

var _flowRenderer2 = _interopRequireDefault(_flowRenderer);

var _flow = __webpack_require__(/*! ./diagrams/flowchart/parser/flow */ "./src/diagrams/flowchart/parser/flow.js");

var _flow2 = _interopRequireDefault(_flow);

var _flowDb = __webpack_require__(/*! ./diagrams/flowchart/flowDb */ "./src/diagrams/flowchart/flowDb.js");

var _flowDb2 = _interopRequireDefault(_flowDb);

var _sequenceRenderer = __webpack_require__(/*! ./diagrams/sequence/sequenceRenderer */ "./src/diagrams/sequence/sequenceRenderer.js");

var _sequenceRenderer2 = _interopRequireDefault(_sequenceRenderer);

var _sequenceDiagram = __webpack_require__(/*! ./diagrams/sequence/parser/sequenceDiagram */ "./src/diagrams/sequence/parser/sequenceDiagram.js");

var _sequenceDiagram2 = _interopRequireDefault(_sequenceDiagram);

var _sequenceDb = __webpack_require__(/*! ./diagrams/sequence/sequenceDb */ "./src/diagrams/sequence/sequenceDb.js");

var _sequenceDb2 = _interopRequireDefault(_sequenceDb);

var _ganttRenderer = __webpack_require__(/*! ./diagrams/gantt/ganttRenderer */ "./src/diagrams/gantt/ganttRenderer.js");

var _ganttRenderer2 = _interopRequireDefault(_ganttRenderer);

var _gantt = __webpack_require__(/*! ./diagrams/gantt/parser/gantt */ "./src/diagrams/gantt/parser/gantt.js");

var _gantt2 = _interopRequireDefault(_gantt);

var _ganttDb = __webpack_require__(/*! ./diagrams/gantt/ganttDb */ "./src/diagrams/gantt/ganttDb.js");

var _ganttDb2 = _interopRequireDefault(_ganttDb);

var _classRenderer = __webpack_require__(/*! ./diagrams/class/classRenderer */ "./src/diagrams/class/classRenderer.js");

var _classRenderer2 = _interopRequireDefault(_classRenderer);

var _classDiagram = __webpack_require__(/*! ./diagrams/class/parser/classDiagram */ "./src/diagrams/class/parser/classDiagram.js");

var _classDiagram2 = _interopRequireDefault(_classDiagram);

var _classDb = __webpack_require__(/*! ./diagrams/class/classDb */ "./src/diagrams/class/classDb.js");

var _classDb2 = _interopRequireDefault(_classDb);

var _gitGraphRenderer = __webpack_require__(/*! ./diagrams/git/gitGraphRenderer */ "./src/diagrams/git/gitGraphRenderer.js");

var _gitGraphRenderer2 = _interopRequireDefault(_gitGraphRenderer);

var _gitGraph = __webpack_require__(/*! ./diagrams/git/parser/gitGraph */ "./src/diagrams/git/parser/gitGraph.js");

var _gitGraph2 = _interopRequireDefault(_gitGraph);

var _gitGraphAst = __webpack_require__(/*! ./diagrams/git/gitGraphAst */ "./src/diagrams/git/gitGraphAst.js");

var _gitGraphAst2 = _interopRequireDefault(_gitGraphAst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var themes = {};
var _arr = ['default', 'forest', 'dark', 'neutral'];
for (var _i = 0; _i < _arr.length; _i++) {
  var themeName = _arr[_i];
  themes[themeName] = __webpack_require__("./src/themes sync recursive ^\\.\\/.*\\/index\\.scss$")("./" + themeName + '/index.scss');
}

/**
 * ## Configuration
 * These are the default options which can be overridden with the initialization call as in the example below:
 * ```
 * mermaid.initialize({
 *   flowchart:{
 *      htmlLabels: false
 *   }
 * });
 * ```
 */
var config = {
  theme: 'default',
  themeCSS: undefined,

  /**
   * logLevel , decides the amount of logging to be used.
   *    * debug: 1
   *    * info: 2
   *    * warn: 3
   *    * error: 4
   *    * fatal: 5
   */
  logLevel: 5,

  /**
   * **startOnLoad** - This options controls whether or mermaid starts when the page loads
   */
  startOnLoad: true,

  /**
   * **arrowMarkerAbsolute** - This options controls whether or arrow markers in html code will be absolute paths or
   * an anchor, #. This matters if you are using base tag settings.
   */
  arrowMarkerAbsolute: false,

  /**
   * ### flowchart
   * *The object containing configurations specific for flowcharts*
   */
  flowchart: {
    /**
     * **htmlLabels** - Flag for setting whether or not a html tag should be used for rendering labels
     * on the edges
     */
    htmlLabels: true,

    curve: 'linear'
  },

  /**
   * ###  sequenceDiagram
   * The object containing configurations specific for sequence diagrams
   */
  sequence: {

    /**
     * **diagramMarginX** - margin to the right and left of the sequence diagram
     */
    diagramMarginX: 50,

    /**
     * **diagramMarginY** - margin to the over and under the sequence diagram
     */
    diagramMarginY: 10,

    /**
     * **actorMargin** - Margin between actors
     */
    actorMargin: 50,

    /**
     * **width** - Width of actor boxes
     */
    width: 150,

    /**
     * **height** - Height of actor boxes
     */
    height: 65,

    /**
     * **boxMargin** - Margin around loop boxes
     */
    boxMargin: 10,

    /**
     * **boxTextMargin** - margin around the text in loop/alt/opt boxes
     */
    boxTextMargin: 5,

    /**
     * **noteMargin** - margin around notes
     */
    noteMargin: 10,

    /**
     * **messageMargin** - Space between messages
     */
    messageMargin: 35,

    /**
     * **mirrorActors** - mirror actors under diagram
     */
    mirrorActors: true,

    /**
     * **bottomMarginAdj** - Depending on css styling this might need adjustment.
     * Prolongs the edge of the diagram downwards
     */
    bottomMarginAdj: 1,

    /**
     * **useMaxWidth** - when this flag is set the height and width is set to 100% and is then scaling with the
     * available space if not the absolute space required is used
     */
    useMaxWidth: true
  },

  /** ### gantt
   * The object containing configurations specific for gantt diagrams*
   */
  gantt: {
    /**
     * **titleTopMargin** - margin top for the text over the gantt diagram
     */
    titleTopMargin: 25,

    /**
     * **barHeight** - the height of the bars in the graph
     */
    barHeight: 20,

    /**
     * **barGap** - the margin between the different activities in the gantt diagram
     */
    barGap: 4,

    /**
     *  **topPadding** - margin between title and gantt diagram and between axis and gantt diagram.
     */
    topPadding: 50,

    /**
     *  **leftPadding** - the space allocated for the section name to the left of the activities.
     */
    leftPadding: 75,

    /**
     *  **gridLineStartPadding** - Vertical starting position of the grid lines
     */
    gridLineStartPadding: 35,

    /**
     *  **fontSize** - font size ...
     */
    fontSize: 11,

    /**
     * **fontFamily** - font family ...
     */
    fontFamily: '"Open-Sans", "sans-serif"',

    /**
     * **numberSectionStyles** - the number of alternating section styles
     */
    numberSectionStyles: 4,

    /**
     * **axisFormat** - datetime format of the axis, this might need adjustment to match your locale and preferences
     */
    axisFormat: '%Y-%m-%d'
  },
  class: {},
  git: {}
};

(0, _logger.setLogLevel)(config.logLevel);

function parse(text) {
  var graphType = _utils2.default.detectType(text);
  var parser = void 0;

  switch (graphType) {
    case 'git':
      parser = _gitGraph2.default;
      parser.parser.yy = _gitGraphAst2.default;
      break;
    case 'flowchart':
      parser = _flow2.default;
      parser.parser.yy = _flowDb2.default;
      break;
    case 'sequence':
      parser = _sequenceDiagram2.default;
      parser.parser.yy = _sequenceDb2.default;
      break;
    case 'gantt':
      parser = _gantt2.default;
      parser.parser.yy = _ganttDb2.default;
      break;
    case 'class':
      parser = _classDiagram2.default;
      parser.parser.yy = _classDb2.default;
      break;
  }

  parser.parser.yy.parseError = function (str, hash) {
    var error = { str: str, hash: hash };
    throw error;
  };

  parser.parse(text);
}

var encodeEntities = exports.encodeEntities = function encodeEntities(text) {
  var txt = text;

  txt = txt.replace(/style.*:\S*#.*;/g, function (s) {
    var innerTxt = s.substring(0, s.length - 1);
    return innerTxt;
  });
  txt = txt.replace(/classDef.*:\S*#.*;/g, function (s) {
    var innerTxt = s.substring(0, s.length - 1);
    return innerTxt;
  });

  txt = txt.replace(/#\w+;/g, function (s) {
    var innerTxt = s.substring(1, s.length - 1);

    var isInt = /^\+?\d+$/.test(innerTxt);
    if (isInt) {
      return 'ﬂ°°' + innerTxt + '¶ß';
    } else {
      return 'ﬂ°' + innerTxt + '¶ß';
    }
  });

  return txt;
};

var decodeEntities = exports.decodeEntities = function decodeEntities(text) {
  var txt = text;

  txt = txt.replace(/ﬂ°°/g, function () {
    return '&#';
  });
  txt = txt.replace(/ﬂ°/g, function () {
    return '&';
  });
  txt = txt.replace(/¶ß/g, function () {
    return ';';
  });

  return txt;
};
/**
 * ##render
 * Function that renders an svg with a graph from a chart definition. Usage example below.
 *
 * ```
 * mermaidAPI.initialize({
 *      startOnLoad:true
 *  });
 *  $(function(){
 *      const graphDefinition = 'graph TB\na-->b';
 *      const cb = function(svgGraph){
 *          console.log(svgGraph);
 *      };
 *      mermaidAPI.render('id1',graphDefinition,cb);
 *  });
 *```
 * @param id the id of the element to be rendered
 * @param txt the graph definition
 * @param cb callback which is called after rendering is finished with the svg code as inparam.
 * @param container selector to element in which a div with the graph temporarily will be inserted. In one is
 * provided a hidden div will be inserted in the body of the page instead. The element will be removed when rendering is
 * completed.
 */
var render = function render(id, txt, cb, container) {
  if (typeof container !== 'undefined') {
    container.innerHTML = '';

    d3.select(container).append('div').attr('id', 'd' + id).append('svg').attr('id', id).attr('width', '100%').attr('xmlns', 'http://www.w3.org/2000/svg').append('g');
  } else {
    var _element = document.querySelector('#' + 'd' + id);
    if (_element) {
      _element.innerHTML = '';
    }

    d3.select('body').append('div').attr('id', 'd' + id).append('svg').attr('id', id).attr('width', '100%').attr('xmlns', 'http://www.w3.org/2000/svg').append('g');
  }

  window.txt = txt;
  txt = encodeEntities(txt);

  var element = d3.select('#d' + id).node();
  var graphType = _utils2.default.detectType(txt);

  // insert inline style into svg
  var svg = element.firstChild;
  var firstChild = svg.firstChild;

  // pre-defined theme
  var style = themes[config.theme];
  if (style === undefined) {
    style = '';
  }

  // user provided theme CSS
  if (config.themeCSS !== undefined) {
    style += '\n' + config.themeCSS;
  }

  // classDef
  if (graphType === 'flowchart') {
    var classes = _flowRenderer2.default.getClasses(txt);
    for (var className in classes) {
      style += '\n.' + className + ' > * { ' + classes[className].styles.join(' !important; ') + ' !important; }';
    }
  }

  var style1 = document.createElement('style');
  style1.innerHTML = (0, _scopeCss2.default)(style, '#' + id);
  svg.insertBefore(style1, firstChild);

  var style2 = document.createElement('style');
  var cs = window.getComputedStyle(svg);
  style2.innerHTML = '#' + id + ' {\n    color: ' + cs.color + ';\n    font: ' + cs.font + ';\n  }';
  svg.insertBefore(style2, firstChild);

  switch (graphType) {
    case 'git':
      config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      _gitGraphRenderer2.default.setConf(config.git);
      _gitGraphRenderer2.default.draw(txt, id, false);
      break;
    case 'flowchart':
      config.flowchart.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      _flowRenderer2.default.setConf(config.flowchart);
      _flowRenderer2.default.draw(txt, id, false);
      break;
    case 'sequence':
      config.sequence.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      if (config.sequenceDiagram) {
        // backwards compatibility
        _sequenceRenderer2.default.setConf(Object.assign(config.sequence, config.sequenceDiagram));
        console.error('`mermaid config.sequenceDiagram` has been renamed to `config.sequence`. Please update your mermaid config.');
      } else {
        _sequenceRenderer2.default.setConf(config.sequence);
      }
      _sequenceRenderer2.default.draw(txt, id);
      break;
    case 'gantt':
      config.gantt.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      _ganttRenderer2.default.setConf(config.gantt);
      _ganttRenderer2.default.draw(txt, id);
      break;
    case 'class':
      config.class.arrowMarkerAbsolute = config.arrowMarkerAbsolute;
      _classRenderer2.default.setConf(config.class);
      _classRenderer2.default.draw(txt, id);
      break;
  }

  d3.select('[id="' + id + '"]').selectAll('foreignobject > *').attr('xmlns', 'http://www.w3.org/1999/xhtml');

  var url = '';
  if (config.arrowMarkerAbsolute) {
    url = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, '\\(');
    url = url.replace(/\)/g, '\\)');
  }

  // Fix for when the base tag is used
  var svgCode = d3.select('#d' + id).node().innerHTML.replace(/url\(#arrowhead/g, 'url(' + url + '#arrowhead', 'g');

  svgCode = decodeEntities(svgCode);

  if (typeof cb !== 'undefined') {
    cb(svgCode, _flowDb2.default.bindFunctions);
  } else {
    _logger.logger.warn('CB = undefined!');
  }

  var node = d3.select('#d' + id).node();
  if (node !== null && typeof node.remove === 'function') {
    d3.select('#d' + id).node().remove();
  }

  return svgCode;
};

var setConf = function setConf(cnf) {
  // Top level initially mermaid, gflow, sequenceDiagram and gantt
  var lvl1Keys = Object.keys(cnf);
  for (var i = 0; i < lvl1Keys.length; i++) {
    if (_typeof(cnf[lvl1Keys[i]]) === 'object' && cnf[lvl1Keys[i]] != null) {
      var lvl2Keys = Object.keys(cnf[lvl1Keys[i]]);

      for (var j = 0; j < lvl2Keys.length; j++) {
        _logger.logger.debug('Setting conf ', lvl1Keys[i], '-', lvl2Keys[j]);
        if (typeof config[lvl1Keys[i]] === 'undefined') {
          config[lvl1Keys[i]] = {};
        }
        _logger.logger.debug('Setting config: ' + lvl1Keys[i] + ' ' + lvl2Keys[j] + ' to ' + cnf[lvl1Keys[i]][lvl2Keys[j]]);
        config[lvl1Keys[i]][lvl2Keys[j]] = cnf[lvl1Keys[i]][lvl2Keys[j]];
      }
    } else {
      config[lvl1Keys[i]] = cnf[lvl1Keys[i]];
    }
  }
};

function initialize(options) {
  _logger.logger.debug('Initializing mermaidAPI');
  // Update default config with options supplied at initialization
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    setConf(options);
  }
  (0, _logger.setLogLevel)(config.logLevel);
}

function getConfig() {
  return config;
}

var mermaidAPI = {
  render: render,
  parse: parse,
  initialize: initialize,
  getConfig: getConfig
};

exports.default = mermaidAPI;

/***/ }),

/***/ "./src/themes sync recursive ^\\.\\/.*\\/index\\.scss$":
/*!***********************************************!*\
  !*** ./src/themes sync ^\.\/.*\/index\.scss$ ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dark/index.scss": "./src/themes/dark/index.scss",
	"./default/index.scss": "./src/themes/default/index.scss",
	"./forest/index.scss": "./src/themes/forest/index.scss",
	"./neutral/index.scss": "./src/themes/neutral/index.scss"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	var module = __webpack_require__(id);
	return module;
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/themes sync recursive ^\\.\\/.*\\/index\\.scss$";

/***/ }),

/***/ "./src/themes/dark/index.scss":
/*!************************************!*\
  !*** ./src/themes/dark/index.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/dark/index.scss");

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),

/***/ "./src/themes/default/index.scss":
/*!***************************************!*\
  !*** ./src/themes/default/index.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/default/index.scss");

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),

/***/ "./src/themes/forest/index.scss":
/*!**************************************!*\
  !*** ./src/themes/forest/index.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/forest/index.scss");

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),

/***/ "./src/themes/neutral/index.scss":
/*!***************************************!*\
  !*** ./src/themes/neutral/index.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/sass-loader/lib/loader.js!./index.scss */ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./src/themes/neutral/index.scss");

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interpolateToCurve = exports.isSubstringInArray = exports.detectType = undefined;

var _d = __webpack_require__(/*! d3 */ "d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * @function detectType
 * Detects the type of the graph text.
 * ```mermaid
 * graph LR
 *  a-->b
 *  b-->c
 *  c-->d
 *  d-->e
 *  e-->f
 *  f-->g
 *  g-->h
 * ```
 *
 * @param {string} text The text defining the graph
 * @returns {string} A graph definition key
 */
var detectType = exports.detectType = function detectType(text) {
  text = text.replace(/^\s*%%.*\n/g, '\n');
  if (text.match(/^\s*sequenceDiagram/)) {
    return 'sequence';
  }

  if (text.match(/^\s*gantt/)) {
    return 'gantt';
  }

  if (text.match(/^\s*classDiagram/)) {
    return 'class';
  }

  if (text.match(/^\s*gitGraph/)) {
    return 'git';
  }
  return 'flowchart';
};

/**
 * @function isSubstringInArray
 * Detects whether a substring in present in a given array
 * @param {string} str The substring to detect
 * @param {array} arr The array to search
 * @returns {number} the array index containing the substring or -1 if not present
 **/
var isSubstringInArray = exports.isSubstringInArray = function isSubstringInArray(str, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].match(str)) return i;
  }
  return -1;
};

var interpolateToCurve = exports.interpolateToCurve = function interpolateToCurve(interpolate, defaultCurve) {
  if (!interpolate) {
    return defaultCurve;
  }
  var curveName = 'curve' + (interpolate.charAt(0).toUpperCase() + interpolate.slice(1));
  return d3[curveName] || defaultCurve;
};

exports.default = {
  detectType: detectType,
  isSubstringInArray: isSubstringInArray,
  interpolateToCurve: interpolateToCurve
};

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("d3");

/***/ }),

/***/ "dagre-d3-renderer":
/*!************************************!*\
  !*** external "dagre-d3-renderer" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dagre-d3-renderer");

/***/ }),

/***/ "dagre-layout":
/*!*******************************!*\
  !*** external "dagre-layout" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dagre-layout");

/***/ }),

/***/ "graphlibrary":
/*!*******************************!*\
  !*** external "graphlibrary" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("graphlibrary");

/***/ }),

/***/ "he":
/*!*********************!*\
  !*** external "he" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("he");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("moment");

/***/ }),

/***/ "scope-css":
/*!****************************!*\
  !*** external "scope-css" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scope-css");

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=mermaid.core.js.map