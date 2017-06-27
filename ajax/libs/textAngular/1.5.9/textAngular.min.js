!function(a,b){"function"==typeof define&&define.amd?
// AMD. Register as an anonymous module unless amdModuleId is set
define("textAngular",["rangy","rangy/lib/rangy-selectionsaverestore"],function(c,d){return a["textAngular.name"]=b(c,d)}):"object"==typeof exports?
// Node. Does not work with strict CommonJS, but
// only CommonJS-like environments that support module.exports,
// like Node.
module.exports=b(require("rangy"),require("rangy/lib/rangy-selectionsaverestore")):a.textAngular=b(rangy)}(this,function(a){
// tests against the current jqLite/jquery implementation if this can be an element
function b(a){try{return 0!==angular.element(a).length}catch(a){return!1}}/*
	A tool definition is an object with the following key/value parameters:
		action: [function(deferred, restoreSelection)]
				a function that is executed on clicking on the button - this will allways be executed using ng-click and will
				overwrite any ng-click value in the display attribute.
				The function is passed a deferred object ($q.defer()), if this is wanted to be used `return false;` from the action and
				manually call `deferred.resolve();` elsewhere to notify the editor that the action has finished.
				restoreSelection is only defined if the rangy library is included and it can be called as `restoreSelection()` to restore the users
				selection in the WYSIWYG editor.
		display: [string]?
				Optional, an HTML element to be displayed as the button. The `scope` of the button is the tool definition object with some additional functions
				If set this will cause buttontext and iconclass to be ignored
		class: [string]?
				Optional, if set will override the taOptions.classes.toolbarButton class.
		buttontext: [string]?
				if this is defined it will replace the contents of the element contained in the `display` element
		iconclass: [string]?
				if this is defined an icon (<i>) will be appended to the `display` element with this string as it's class
		tooltiptext: [string]?
				Optional, a plain text description of the action, used for the title attribute of the action button in the toolbar by default.
		activestate: [function(commonElement)]?
				this function is called on every caret movement, if it returns true then the class taOptions.classes.toolbarButtonActive
				will be applied to the `display` element, else the class will be removed
		disabled: [function()]?
				if this function returns true then the tool will have the class taOptions.classes.disabled applied to it, else it will be removed
	Other functions available on the scope are:
		name: [string]
				the name of the tool, this is the first parameter passed into taRegisterTool
		isDisabled: [function()]
				returns true if the tool is disabled, false if it isn't
		displayActiveToolClass: [function(boolean)]
				returns true if the tool is 'active' in the currently focussed toolbar
		onElementSelect: [Object]
				This object contains the following key/value pairs and is used to trigger the ta-element-select event
				element: [String]
					an element name, will only trigger the onElementSelect action if the tagName of the element matches this string
				filter: [function(element)]?
					an optional filter that returns a boolean, if true it will trigger the onElementSelect.
				action: [function(event, element, editorScope)]
					the action that should be executed if the onElementSelect function runs
*/
// name and toolDefinition to add into the tools available to be added on the toolbar
function c(a,c){if(!a||""===a||e.hasOwnProperty(a))throw"textAngular Error: A unique name is required for a Tool Definition";if(c.display&&(""===c.display||!b(c.display))||!c.display&&!c.buttontext&&!c.iconclass)throw'textAngular Error: Tool Definition for "'+a+'" does not have a valid display/iconclass/buttontext value';e[a]=c}
// usage is:
// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to do something!');
//
// turn html into pure text that shows visiblity
function d(a){var b=document.createElement("DIV");b.innerHTML=a;var c=b.textContent||b.innerText||"";// zero width space
return c.replace("​",""),c=c.trim()}
// setup the global contstant functions for setting up the toolbar
// all tool definitions
var e={};angular.module("textAngularSetup",[]).constant("taRegisterTool",c).value("taTools",e).value("taOptions",{
//////////////////////////////////////////////////////////////////////////////////////
// forceTextAngularSanitize
// set false to allow the textAngular-sanitize provider to be replaced
// with angular-sanitize or a custom provider.
forceTextAngularSanitize:!0,
///////////////////////////////////////////////////////////////////////////////////////
// keyMappings
// allow customizable keyMappings for specialized key boards or languages
//
// keyMappings provides key mappings that are attached to a given commandKeyCode.
// To modify a specific keyboard binding, simply provide function which returns true
// for the event you wish to map to.
// Or to disable a specific keyboard binding, provide a function which returns false.
// Note: 'RedoKey' and 'UndoKey' are internally bound to the redo and undo functionality.
// At present, the following commandKeyCodes are in use:
// 98, 'TabKey', 'ShiftTabKey', 105, 117, 'UndoKey', 'RedoKey'
//
// To map to an new commandKeyCode, add a new key mapping such as:
// {commandKeyCode: 'CustomKey', testForKey: function (event) {
//  if (event.keyCode=57 && event.ctrlKey && !event.shiftKey && !event.altKey) return true;
// } }
// to the keyMappings. This example maps ctrl+9 to 'CustomKey'
// Then where taRegisterTool(...) is called, add a commandKeyCode: 'CustomKey' and your
// tool will be bound to ctrl+9.
//
// To disble one of the already bound commandKeyCodes such as 'RedoKey' or 'UndoKey' add:
// {commandKeyCode: 'RedoKey', testForKey: function (event) { return false; } },
// {commandKeyCode: 'UndoKey', testForKey: function (event) { return false; } },
// to disable them.
//
keyMappings:[],toolbar:[["h1","h2","h3","h4","h5","h6","p","pre","quote"],["bold","italics","underline","strikeThrough","ul","ol","redo","undo","clear"],["justifyLeft","justifyCenter","justifyRight","justifyFull","indent","outdent"],["html","insertImage","insertLink","insertVideo","wordcount","charcount"]],classes:{focussed:"focussed",toolbar:"btn-toolbar",toolbarGroup:"btn-group",toolbarButton:"btn btn-default",toolbarButtonActive:"active",disabled:"disabled",textEditor:"form-control",htmlEditor:"form-control"},defaultTagAttributes:{a:{target:""}},setup:{
// wysiwyg mode
textEditorSetup:function(a){},
// raw html
htmlEditorSetup:function(a){}},defaultFileDropHandler:/* istanbul ignore next: untestable image processing */
function(a,b){var c=new FileReader;return"image"===a.type.substring(0,5)&&(c.onload=function(){""!==c.result&&b("insertImage",c.result,!0)},c.readAsDataURL(a),!0)}}).value("taSelectableElements",["a","img"]).value("taCustomRenderers",[{
// Parse back out: '<div class="ta-insert-video" ta-insert-video src="' + urlLink + '" allowfullscreen="true" width="300" frameborder="0" height="250"></div>'
// To correct video element. For now only support youtube
selector:"img",customAttribute:"ta-insert-video",renderLogic:function(a){var b=angular.element("<iframe></iframe>"),c=a.prop("attributes");
// loop through element attributes and apply them on iframe
angular.forEach(c,function(a){b.attr(a.name,a.value)}),b.attr("src",b.attr("ta-insert-video")),a.replaceWith(b)}}]).value("taTranslations",{
// moved to sub-elements
//toggleHTML: "Toggle HTML",
//insertImage: "Please enter a image URL to insert",
//insertLink: "Please enter a URL to insert",
//insertVideo: "Please enter a youtube URL to embed",
html:{tooltip:"Toggle html / Rich Text"},
// tooltip for heading - might be worth splitting
heading:{tooltip:"Heading "},p:{tooltip:"Paragraph"},pre:{tooltip:"Preformatted text"},ul:{tooltip:"Unordered List"},ol:{tooltip:"Ordered List"},quote:{tooltip:"Quote/unquote selection or paragraph"},undo:{tooltip:"Undo"},redo:{tooltip:"Redo"},bold:{tooltip:"Bold"},italic:{tooltip:"Italic"},underline:{tooltip:"Underline"},strikeThrough:{tooltip:"Strikethrough"},justifyLeft:{tooltip:"Align text left"},justifyRight:{tooltip:"Align text right"},justifyFull:{tooltip:"Justify text"},justifyCenter:{tooltip:"Center"},indent:{tooltip:"Increase indent"},outdent:{tooltip:"Decrease indent"},clear:{tooltip:"Clear formatting"},insertImage:{dialogPrompt:"Please enter an image URL to insert",tooltip:"Insert image",hotkey:"the - possibly language dependent hotkey ... for some future implementation"},insertVideo:{tooltip:"Insert video",dialogPrompt:"Please enter a youtube URL to embed"},insertLink:{tooltip:"Insert / edit link",dialogPrompt:"Please enter a URL to insert"},editLink:{reLinkButton:{tooltip:"Relink"},unLinkButton:{tooltip:"Unlink"},targetToggle:{buttontext:"Open in New Window"}},wordcount:{tooltip:"Display words Count"},charcount:{tooltip:"Display characters Count"}}).factory("taToolFunctions",["$window","taTranslations",function(a,b){return{imgOnSelectAction:function(a,b,c){
// setup the editor toolbar
// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic/display
var d=function(){c.updateTaBindtaTextElement(),c.hidePopover()};a.preventDefault(),c.displayElements.popover.css("width","375px");var e=c.displayElements.popoverContainer;e.empty();var f=angular.element('<div class="btn-group" style="padding-right: 6px;">'),g=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');g.on("click",function(a){a.preventDefault(),b.css({width:"100%",height:""}),d()});var h=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');h.on("click",function(a){a.preventDefault(),b.css({width:"50%",height:""}),d()});var i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');i.on("click",function(a){a.preventDefault(),b.css({width:"25%",height:""}),d()});var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');j.on("click",function(a){a.preventDefault(),b.css({width:"",height:""}),d()}),f.append(g),f.append(h),f.append(i),f.append(j),e.append(f),f=angular.element('<div class="btn-group" style="padding-right: 6px;">');var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');k.on("click",function(a){a.preventDefault(),
// webkit
b.css("float","left"),
// firefox
b.css("cssFloat","left"),
// IE < 8
b.css("styleFloat","left"),d()});var l=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');l.on("click",function(a){a.preventDefault(),
// webkit
b.css("float","right"),
// firefox
b.css("cssFloat","right"),
// IE < 8
b.css("styleFloat","right"),d()});var m=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');m.on("click",function(a){a.preventDefault(),
// webkit
b.css("float",""),
// firefox
b.css("cssFloat",""),
// IE < 8
b.css("styleFloat",""),d()}),f.append(k),f.append(m),f.append(l),e.append(f),f=angular.element('<div class="btn-group">');var n=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');n.on("click",function(a){a.preventDefault(),b.remove(),d()}),f.append(n),e.append(f),c.showPopover(b),c.showResizeOverlay(b)},aOnSelectAction:function(c,d,e){
// setup the editor toolbar
// Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic
c.preventDefault(),e.displayElements.popover.css("width","436px");var f=e.displayElements.popoverContainer;f.empty(),f.css("line-height","28px");var g=angular.element('<a href="'+d.attr("href")+'" target="_blank">'+d.attr("href")+"</a>");g.css({display:"inline-block","max-width":"200px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap","vertical-align":"middle"}),f.append(g);var h=angular.element('<div class="btn-group pull-right">'),i=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.reLinkButton.tooltip+'"><i class="fa fa-edit icon-edit"></i></button>');i.on("click",function(c){c.preventDefault();var f=a.prompt(b.insertLink.dialogPrompt,d.attr("href"));f&&""!==f&&"http://"!==f&&(d.attr("href",f),e.updateTaBindtaTextElement()),e.hidePopover()}),h.append(i);var j=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="'+b.editLink.unLinkButton.tooltip+'"><i class="fa fa-unlink icon-unlink"></i></button>');
// directly before this click event is fired a digest is fired off whereby the reference to $element is orphaned off
j.on("click",function(a){a.preventDefault(),d.replaceWith(d.contents()),e.updateTaBindtaTextElement(),e.hidePopover()}),h.append(j);var k=angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">'+b.editLink.targetToggle.buttontext+"</button>");"_blank"===d.attr("target")&&k.addClass("active"),k.on("click",function(a){a.preventDefault(),d.attr("target","_blank"===d.attr("target")?"":"_blank"),k.toggleClass("active"),e.updateTaBindtaTextElement()}),h.append(k),f.append(h),e.showPopover(d)},extractYoutubeVideoId:function(a){var b=/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i,c=a.match(b);return c&&c[1]||null}}}]).run(["taRegisterTool","$window","taTranslations","taSelection","taToolFunctions","$sanitize","taOptions","$log",function(a,b,c,d,e,f,g,h){
// test for the version of $sanitize that is in use
// You can disable this check by setting taOptions.textAngularSanitize == false
var i={};/* istanbul ignore next, throws error */
if(f("",i),g.forceTextAngularSanitize===!0&&"taSanitize"!==i.version)throw angular.$$minErr("textAngular")("textAngularSetup","The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");a("html",{iconclass:"fa fa-code",tooltiptext:c.html.tooltip,action:function(){this.$editor().switchView()},activeState:function(){return this.$editor().showHtml}});
// add the Header tools
// convenience functions so that the loop works correctly
var j=function(a){return function(){return this.$editor().queryFormatBlockState(a)}},k=function(){return this.$editor().wrapSelection("formatBlock","<"+this.name.toUpperCase()+">")};angular.forEach(["h1","h2","h3","h4","h5","h6"],function(b){a(b.toLowerCase(),{buttontext:b.toUpperCase(),tooltiptext:c.heading.tooltip+b.charAt(1),action:k,activeState:j(b.toLowerCase())})}),a("p",{buttontext:"P",tooltiptext:c.p.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<P>")},activeState:function(){return this.$editor().queryFormatBlockState("p")}}),
// key: pre -> taTranslations[key].tooltip, taTranslations[key].buttontext
a("pre",{buttontext:"pre",tooltiptext:c.pre.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<PRE>")},activeState:function(){return this.$editor().queryFormatBlockState("pre")}}),a("ul",{iconclass:"fa fa-list-ul",tooltiptext:c.ul.tooltip,action:function(){return this.$editor().wrapSelection("insertUnorderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertUnorderedList")}}),a("ol",{iconclass:"fa fa-list-ol",tooltiptext:c.ol.tooltip,action:function(){return this.$editor().wrapSelection("insertOrderedList",null)},activeState:function(){return this.$editor().queryCommandState("insertOrderedList")}}),a("quote",{iconclass:"fa fa-quote-right",tooltiptext:c.quote.tooltip,action:function(){return this.$editor().wrapSelection("formatBlock","<BLOCKQUOTE>")},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")}}),a("undo",{iconclass:"fa fa-undo",tooltiptext:c.undo.tooltip,action:function(){return this.$editor().wrapSelection("undo",null)}}),a("redo",{iconclass:"fa fa-repeat",tooltiptext:c.redo.tooltip,action:function(){return this.$editor().wrapSelection("redo",null)}}),a("bold",{iconclass:"fa fa-bold",tooltiptext:c.bold.tooltip,action:function(){return this.$editor().wrapSelection("bold",null)},activeState:function(){return this.$editor().queryCommandState("bold")},commandKeyCode:98}),a("justifyLeft",{iconclass:"fa fa-align-left",tooltiptext:c.justifyLeft.tooltip,action:function(){return this.$editor().wrapSelection("justifyLeft",null)},activeState:function(a){/* istanbul ignore next: */
if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="left"===a.css("text-align")||"left"===a.attr("align")||"right"!==a.css("text-align")&&"center"!==a.css("text-align")&&"justify"!==a.css("text-align")&&!this.$editor().queryCommandState("justifyRight")&&!this.$editor().queryCommandState("justifyCenter")&&!this.$editor().queryCommandState("justifyFull")),b=b||this.$editor().queryCommandState("justifyLeft")}}),a("justifyRight",{iconclass:"fa fa-align-right",tooltiptext:c.justifyRight.tooltip,action:function(){return this.$editor().wrapSelection("justifyRight",null)},activeState:function(a){/* istanbul ignore next: */
if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="right"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyRight")}}),a("justifyFull",{iconclass:"fa fa-align-justify",tooltiptext:c.justifyFull.tooltip,action:function(){return this.$editor().wrapSelection("justifyFull",null)},activeState:function(a){var b=!1;return a&&(b="justify"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyFull")}}),a("justifyCenter",{iconclass:"fa fa-align-center",tooltiptext:c.justifyCenter.tooltip,action:function(){return this.$editor().wrapSelection("justifyCenter",null)},activeState:function(a){/* istanbul ignore next: */
if(a&&"#document"===a.nodeName)return!1;var b=!1;return a&&(b="center"===a.css("text-align")),b=b||this.$editor().queryCommandState("justifyCenter")}}),a("indent",{iconclass:"fa fa-indent",tooltiptext:c.indent.tooltip,action:function(){return this.$editor().wrapSelection("indent",null)},activeState:function(){return this.$editor().queryFormatBlockState("blockquote")},commandKeyCode:"TabKey"}),a("outdent",{iconclass:"fa fa-outdent",tooltiptext:c.outdent.tooltip,action:function(){return this.$editor().wrapSelection("outdent",null)},activeState:function(){return!1},commandKeyCode:"ShiftTabKey"}),a("italics",{iconclass:"fa fa-italic",tooltiptext:c.italic.tooltip,action:function(){return this.$editor().wrapSelection("italic",null)},activeState:function(){return this.$editor().queryCommandState("italic")},commandKeyCode:105}),a("underline",{iconclass:"fa fa-underline",tooltiptext:c.underline.tooltip,action:function(){return this.$editor().wrapSelection("underline",null)},activeState:function(){return this.$editor().queryCommandState("underline")},commandKeyCode:117}),a("strikeThrough",{iconclass:"fa fa-strikethrough",tooltiptext:c.strikeThrough.tooltip,action:function(){return this.$editor().wrapSelection("strikeThrough",null)},activeState:function(){return document.queryCommandState("strikeThrough")}}),a("clear",{iconclass:"fa fa-ban",tooltiptext:c.clear.tooltip,action:function(a,b){var c;this.$editor().wrapSelection("removeFormat",null);var e=angular.element(d.getSelectionElement());c=d.getAllSelectedElements();
//$log.log('selectedElements:', selectedElements);
// remove lists
var f=function(a,b){a=angular.element(a);var c=b;return b||(c=a),angular.forEach(a.children(),function(a){if("ul"===a.tagName.toLowerCase()||"ol"===a.tagName.toLowerCase())c=f(a,c);else{var b=angular.element("<p></p>");b.html(angular.element(a).html()),c.after(b),c=b}}),a.remove(),c};angular.forEach(c,function(a){"ul"!==a.nodeName.toLowerCase()&&"ol"!==a.nodeName.toLowerCase()||
//console.log('removeListElements', element);
f(a)}),angular.forEach(e.find("ul"),f),angular.forEach(e.find("ol"),f);
// clear out all class attributes. These do not seem to be cleared via removeFormat
var g=this.$editor(),h=function(a){a=angular.element(a),/* istanbul ignore next: this is not triggered in tests any longer since we now never select the whole displayELement */
a[0]!==g.displayElements.text[0]&&a.removeAttr("class"),angular.forEach(a.children(),h)};angular.forEach(e,h),
// check if in list. If not in list then use formatBlock option
e[0]&&"li"!==e[0].tagName.toLowerCase()&&"ol"!==e[0].tagName.toLowerCase()&&"ul"!==e[0].tagName.toLowerCase()&&this.$editor().wrapSelection("formatBlock","default"),b()}});/* jshint -W099 */
/****************************
	 //  we don't use this code - since the previous way CLEAR is expected to work does not clear partially selected <li>

	 var removeListElement = function(listE){
				console.log(listE);
				var _list = listE.parentNode.childNodes;
				console.log('_list', _list);
				var _preLis = [], _postLis = [], _found = false;
				for (i = 0; i < _list.length; i++) {
					if (_list[i] === listE) {
						_found = true;
					} else if (!_found) _preLis.push(_list[i]);
					else _postLis.push(_list[i]);
				}
				var _parent = angular.element(listE.parentNode);
				var newElem = angular.element('<p></p>');
				newElem.html(angular.element(listE).html());
				if (_preLis.length === 0 || _postLis.length === 0) {
					if (_postLis.length === 0) _parent.after(newElem);
					else _parent[0].parentNode.insertBefore(newElem[0], _parent[0]);

					if (_preLis.length === 0 && _postLis.length === 0) _parent.remove();
					else angular.element(listE).remove();
				} else {
					var _firstList = angular.element('<' + _parent[0].tagName + '></' + _parent[0].tagName + '>');
					var _secondList = angular.element('<' + _parent[0].tagName + '></' + _parent[0].tagName + '>');
					for (i = 0; i < _preLis.length; i++) _firstList.append(angular.element(_preLis[i]));
					for (i = 0; i < _postLis.length; i++) _secondList.append(angular.element(_postLis[i]));
					_parent.after(_secondList);
					_parent.after(newElem);
					_parent.after(_firstList);
					_parent.remove();
				}
				taSelection.setSelectionToElementEnd(newElem[0]);
			};

	 elementsSeen = [];
	 if (selectedElements.length !==0) console.log(selectedElements);
	 angular.forEach(selectedElements, function (element) {
				if (elementsSeen.indexOf(element) !== -1 || elementsSeen.indexOf(element.parentElement) !== -1) {
					return;
				}
				elementsSeen.push(element);
				if (element.nodeName.toLowerCase() === 'li') {
					console.log('removeListElement', element);
					removeListElement(element);
				}
				else if (element.parentElement && element.parentElement.nodeName.toLowerCase() === 'li') {
					console.log('removeListElement', element.parentElement);
					elementsSeen.push(element.parentElement);
					removeListElement(element.parentElement);
				}
			});
	 **********************/
/**********************
	 if(possibleNodes[0].tagName.toLowerCase() === 'li'){
				var _list = possibleNodes[0].parentNode.childNodes;
				var _preLis = [], _postLis = [], _found = false;
				for(i = 0; i < _list.length; i++){
					if(_list[i] === possibleNodes[0]){
						_found = true;
					}else if(!_found) _preLis.push(_list[i]);
					else _postLis.push(_list[i]);
				}
				var _parent = angular.element(possibleNodes[0].parentNode);
				var newElem = angular.element('<p></p>');
				newElem.html(angular.element(possibleNodes[0]).html());
				if(_preLis.length === 0 || _postLis.length === 0){
					if(_postLis.length === 0) _parent.after(newElem);
					else _parent[0].parentNode.insertBefore(newElem[0], _parent[0]);

					if(_preLis.length === 0 && _postLis.length === 0) _parent.remove();
					else angular.element(possibleNodes[0]).remove();
				}else{
					var _firstList = angular.element('<'+_parent[0].tagName+'></'+_parent[0].tagName+'>');
					var _secondList = angular.element('<'+_parent[0].tagName+'></'+_parent[0].tagName+'>');
					for(i = 0; i < _preLis.length; i++) _firstList.append(angular.element(_preLis[i]));
					for(i = 0; i < _postLis.length; i++) _secondList.append(angular.element(_postLis[i]));
					_parent.after(_secondList);
					_parent.after(newElem);
					_parent.after(_firstList);
					_parent.remove();
				}
				taSelection.setSelectionToElementEnd(newElem[0]);
			}
	 *******************/
/* istanbul ignore next: if it's javascript don't worry - though probably should show some kind of error message */
var l=function(a){return a.toLowerCase().indexOf("javascript")!==-1};a("insertImage",{iconclass:"fa fa-picture-o",tooltiptext:c.insertImage.tooltip,action:function(){var a;if(a=b.prompt(c.insertImage.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a&&!l(a)){"a"===d.getSelectionElement().tagName.toLowerCase()&&
// due to differences in implementation between FireFox and Chrome, we must move the
// insertion point past the <a> element, otherwise FireFox inserts inside the <a>
// With this change, both FireFox and Chrome behave the same way!
d.setSelectionAfterElement(d.getSelectionElement());
// In the past we used the simple statement:
//return this.$editor().wrapSelection('insertImage', imageLink, true);
//
// However on Firefox only, when the content is empty this is a problem
// See Issue #1201
// Investigation reveals that Firefox only inserts a <p> only!!!!
// So now we use insertHTML here and all is fine.
// NOTE: this is what 'insertImage' is supposed to do anyway!
var e='<img src="'+a+'">';return this.$editor().wrapSelection("insertHTML",e,!0)}},onElementSelect:{element:"img",action:e.imgOnSelectAction}}),a("insertVideo",{iconclass:"fa fa-youtube-play",tooltiptext:c.insertVideo.tooltip,action:function(){var a;
// block javascript here
/* istanbul ignore else: if it's javascript don't worry - though probably should show some kind of error message */
if(a=b.prompt(c.insertVideo.dialogPrompt,"https://"),!l(a)&&a&&""!==a&&"https://"!==a&&(videoId=e.extractYoutubeVideoId(a),videoId)){
// create the embed link
var f="https://www.youtube.com/embed/"+videoId,g='<img class="ta-insert-video" src="https://img.youtube.com/vi/'+videoId+'/hqdefault.jpg" ta-insert-video="'+f+'" contenteditable="false" allowfullscreen="true" frameborder="0" />';
// insert
/* istanbul ignore next: don't know how to test this... since it needs a dialogPrompt */
// due to differences in implementation between FireFox and Chrome, we must move the
// insertion point past the <a> element, otherwise FireFox inserts inside the <a>
// With this change, both FireFox and Chrome behave the same way!
return"a"===d.getSelectionElement().tagName.toLowerCase()&&d.setSelectionAfterElement(d.getSelectionElement()),this.$editor().wrapSelection("insertHTML",g,!0)}},onElementSelect:{element:"img",onlyWithAttrs:["ta-insert-video"],action:e.imgOnSelectAction}}),a("insertLink",{tooltiptext:c.insertLink.tooltip,iconclass:"fa fa-link",action:function(){var a;if(
// if this link has already been set, we need to just edit the existing link
/* istanbul ignore if: we do not test this */
a="a"===d.getSelectionElement().tagName.toLowerCase()?b.prompt(c.insertLink.dialogPrompt,d.getSelectionElement().href):b.prompt(c.insertLink.dialogPrompt,"http://"),a&&""!==a&&"http://"!==a&&!l(a))return this.$editor().wrapSelection("createLink",a,!0)},activeState:function(a){return!!a&&"A"===a[0].tagName},onElementSelect:{element:"a",action:e.aOnSelectAction}}),a("wordcount",{display:'<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',disabled:!0,wordcount:0,activeState:function(){// this fires on keyup
var a=this.$editor().displayElements.text,b=a[0].innerHTML||"",c=0;/* istanbul ignore if: will default to '' when undefined */
//Set current scope
//Set editor scope
return""!==b.replace(/\s*<[^>]*?>\s*/g,"")&&(c=b.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi,"").replace(/(<[^>]*?>\s*<[^>]*?>)/gi," ").replace(/(<[^>]*?>)/gi,"").replace(/\s+/gi," ").match(/\S+/g).length),this.wordcount=c,this.$editor().wordcount=c,!1}}),a("charcount",{display:'<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',disabled:!0,charcount:0,activeState:function(){// this fires on keyup
var a=this.$editor().displayElements.text,b=a[0].innerText||a[0].textContent,c=b.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g," ").replace(/\s+$/g," ").length;
//Set current scope
//Set editor scope
return this.charcount=c,this.$editor().charcount=c,!1}})}]);// NOTE: textAngularVersion must match the Gruntfile.js 'setVersion' task.... and have format v/d+./d+./d+
var f="v1.5.9",g={ie:function(){for(var a,b=3,c=document.createElement("div"),d=c.getElementsByTagName("i");c.innerHTML="<!--[if gt IE "+ ++b+"]><i></i><![endif]-->",d[0];);return b>4?b:a}(),webkit:/AppleWebKit\/([\d.]+)/i.test(navigator.userAgent),isFirefox:navigator.userAgent.toLowerCase().indexOf("firefox")>-1},h=h||{};/* istanbul ignore next: untestable browser check */
h.now=function(){return h.now||h.mozNow||h.msNow||h.oNow||h.webkitNow||function(){return(new Date).getTime()}}();
// Global to textAngular REGEXP vars for block and list elements.
var i=/^(address|article|aside|audio|blockquote|canvas|center|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i,j=/^(ul|li|ol)$/i,k=/^(address|article|aside|audio|blockquote|canvas|center|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
/* istanbul ignore next: trim shim for older browsers */
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});/*
	Custom stylesheet for the placeholders rules.
	Credit to: http://davidwalsh.name/add-rules-stylesheets
*/
var l,m,n,o,p,q;/* istanbul ignore else: IE <8 test*/
if(g.ie>8||void 0===g.ie){/* istanbul ignore next: preference for stylesheet loaded externally */
for(var r=document.styleSheets,s=0;s<r.length;s++)if((0===r[s].media.length||r[s].media.mediaText.match(/(all|screen)/gi))&&r[s].href&&r[s].href.match(/textangular\.(min\.|)css/gi)){l=r[s];break}/* istanbul ignore next: preference for stylesheet loaded externally */
l||(
// this sheet is used for the placeholders later on.
l=function(){
// Create the <style> tag
var a=document.createElement("style");/* istanbul ignore else : WebKit hack :( */
// Add the <style> element to the page, add as first so the styles can be overridden by custom stylesheets
return g.webkit&&a.appendChild(document.createTextNode("")),document.getElementsByTagName("head")[0].appendChild(a),a.sheet}()),
// use as: addCSSRule("header", "float: left");
m=function(a,b){return o(l,a,b)},o=function(a,b,c){var d,e;
// return the inserted stylesheet rule
// This order is important as IE 11 has both cssRules and rules but they have different lengths - cssRules is correct, rules gives an error in IE 11
/* istanbul ignore next: browser catches */
/* istanbul ignore else: untestable IE option */
/* istanbul ignore next: browser catches */
return a.cssRules?d=Math.max(a.cssRules.length-1,0):a.rules&&(d=Math.max(a.rules.length-1,0)),a.insertRule?a.insertRule(b+"{"+c+"}",d):a.addRule(b,c,d),l.rules?e=l.rules[d]:l.cssRules&&(e=l.cssRules[d]),e},q=function(a,b){var c,d;for(c=0;c<b.length;c++)/* istanbul ignore else: check for correct rule */
if(b[c].cssText===a.cssText){d=c;break}return d},n=function(a){p(l,a)},/* istanbul ignore next: tests are browser specific */
p=function(a,b){var c=a.cssRules||a.rules;if(c&&0!==c.length){var d=q(b,c);a.removeRule?a.removeRule(d):a.deleteRule(d)}}}angular.module("textAngular.factories",[]).factory("taBrowserTag",[function(){return function(a){/* istanbul ignore next: ie specific test */
/* istanbul ignore next: ie specific test */
return a?""===a?void 0===g.ie?"div":g.ie<=8?"P":"p":g.ie<=8?a.toUpperCase():a:g.ie<=8?"P":"p"}}]).factory("taApplyCustomRenderers",["taCustomRenderers","taDOM",function(a,b){return function(c){var d=angular.element("<div></div>");return d[0].innerHTML=c,angular.forEach(a,function(a){var c=[];
// get elements based on what is defined. If both defined do secondary filter in the forEach after using selector string
a.selector&&""!==a.selector?c=d.find(a.selector):a.customAttribute&&""!==a.customAttribute&&(c=b.getByAttribute(d,a.customAttribute)),
// process elements if any found
angular.forEach(c,function(b){b=angular.element(b),a.selector&&""!==a.selector&&a.customAttribute&&""!==a.customAttribute?void 0!==b.attr(a.customAttribute)&&a.renderLogic(b):a.renderLogic(b)})}),d[0].innerHTML}}]).factory("taFixChrome",function(){
// get whaterever rubbish is inserted in chrome
// should be passed an html string, returns an html string
var a=function(a){if(!a||!angular.isString(a)||a.length<=0)return a;
// remove all the Apple-converted-space spans and replace with the content of the span
/* istanbul ignore next: apple-contereted-space span match */
for(
// grab all elements with a style attibute
var b,c,d,e,f=/<([^>\/]+?)style=("([^\"]+)"|'([^']+)')([^>]*)>/gi,g=/<span class="Apple-converted-space">([^<]+)<\/span>/gi,h="",i=0;b=g.exec(a);)d=b[1],d=d.replace(/&nbsp;/gi," "),h+=a.substring(i,b.index)+d,i=b.index+b[0].length;for(/* istanbul ignore next: apple-contereted-space span has matched */
i&&(
// modified....
h+=a.substring(i),a=h,h="",i=0);b=f.exec(a);)
// one of the quoted values ' or "
/* istanbul ignore next: quotations match */
c=b[3]||b[4],
// test for chrome inserted junk
c&&c.match(/line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;|color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/i)&&(
// replace original tag with new tag
c=c.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;|( |)color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|( |)background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/gi,""),e="<"+b[1].trim(),c.trim().length>0&&(e+=" style="+b[2].substring(0,1)+c+b[2].substring(0,1)),e+=b[5].trim()+">",h+=a.substring(i,b.index)+e,i=b.index+b[0].length);
// only replace when something has changed, else we get focus problems on inserting lists
// only replace when something has changed, else we get focus problems on inserting lists
return h+=a.substring(i),i>0?h.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/gi,"$1"):a};return a}).factory("taSanitize",["$sanitize",function(a){function b(a,b){for(var c,d=0,e=0,f=/<[^>]*>/gi;c=f.exec(a);)if(e=c.index,"/"===c[0].substr(1,1)){if(0===d)break;d--}else d++;
// get the start tags reversed - this is safe as we construct the strings with no content except the tags
return b+a.substring(0,e)+angular.element(b)[0].outerHTML.substring(b.length)+a.substring(e)}function c(a){if(!a||!angular.isString(a)||a.length<=0)return a;for(var d,f,g,h,i,k,l=/<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/gi,m="",n="",o=0;f=l.exec(a);){
// one of the quoted values ' or "
/* istanbul ignore next: quotations match */
h=f[3]||f[4];var p=new RegExp(j,"i");
// test for style values to change
if(angular.isString(h)&&p.test(h)){
// remove build tag list
i="";
// find relevand tags and build a string of them
for(
// init regex here for exec
var q=new RegExp(j,"ig");g=q.exec(h);)for(d=0;d<e.length;d++)g[2*d+2]&&(i+="<"+e[d].tag+">");
// recursively find more legacy styles in html before this tag and after the previous match (if any)
k=c(a.substring(o,f.index)),
// build up html
n+=m.length>0?b(k,m):k,
// grab the style val without the transformed values
h=h.replace(new RegExp(j,"ig"),""),
// build the html tag
n+="<"+f[1].trim(),h.length>0&&(n+=' style="'+h+'"'),n+=f[5]+">",
// update the start index to after this tag
o=f.index+f[0].length,m=i}}return n+=m.length>0?b(a.substring(o),m):a.substring(o)}function d(a){if(!a||!angular.isString(a)||a.length<=0)return a;
// match all attr tags
for(
// replace all align='...' tags with text-align attributes
var b,c=/<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/gi,d="",e=0;b=c.exec(a);){
// add all html before this tag
d+=a.substring(e,b.index),
// record last index after this tag
e=b.index+b[0].length;
// construct tag without the align attribute
var f="<"+b[1]+b[5];
// add the style attribute
/style=("([^"]+)"|'([^']+)')/gi.test(f)?/* istanbul ignore next: quotations match */
f=f.replace(/style=("([^"]+)"|'([^']+)')/i,'style="$2$3 text-align:'+(b[3]||b[4])+';"'):/* istanbul ignore next: quotations match */
f+=' style="text-align:'+(b[3]||b[4])+';"',f+=">",
// add to html
d+=f}
// return with remaining html
return d+a.substring(e)}for(var e=[{property:"font-weight",values:["bold"],tag:"b"},{property:"font-style",values:["italic"],tag:"i"}],f=[],g=0;g<e.length;g++){for(var h="("+e[g].property+":\\s*(",i=0;i<e[g].values.length;i++)/* istanbul ignore next: not needed to be tested yet */
i>0&&(h+="|"),h+=e[g].values[i];h+=");)",f.push(h)}var j="("+f.join("|")+")",k=new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/gi),l=new RegExp(/<span class="rangySelectionBoundary" id="selectionBoundary_\d+_\d+">[^<>]+?<\/span>/gi),m=new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/gi);return function(b,e,f){
// unsafe html should NEVER built into a DOM object via angular.element. This allows XSS to be inserted and run.
if(!f)try{b=c(b)}catch(a){}
// unsafe and oldsafe should be valid HTML strings
// any exceptions (lets say, color for example) should be made here but with great care
// setup unsafe element for modification
b=d(b),
// we had an issue in the past, where we dumped a whole bunch of <span>'s into the content...
// so we remove them here
// IN A FUTURE release this can be removed after all have updated through release 1.5.9
b&&(b=b.replace(k,""),b=b.replace(l,""),b=b.replace(k,""),b=b.replace(m,""));var g;try{g=a(b),
// do this afterwards, then the $sanitizer should still throw for bad markup
f&&(g=b)}catch(a){g=e||""}
// Do processing for <pre> tags, removing tabs and return carriages outside of them
var h,i=g.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/gi),j=g.replace(/(&#(9|10);)*/gi,""),n=/<pre[^>]*>.*?<\/pre[^>]*>/gi,o=0,p=0;for(g="";null!==(h=n.exec(j))&&o<i.length;)g+=j.substring(p,h.index)+i[o],p=h.index+h[0].length,o++;return g+j.substring(p)}}]).factory("taToolExecuteAction",["$q","$log",function(a,b){
// this must be called on a toolScope or instance
return function(c){void 0!==c&&(this.$editor=function(){return c});var d,e=a.defer(),f=e.promise,g=this.$editor();try{d=this.action(e,g.startAction()),
// We set the .finally callback here to make sure it doesn't get executed before any other .then callback.
f.finally(function(){g.endAction.call(g)})}catch(a){b.error(a)}(d||void 0===d)&&
// if true or undefined is returned then the action has finished. Otherwise the deferred action will be resolved manually.
e.resolve()}}]),angular.module("textAngular.DOM",["textAngular.factories"]).factory("taExecCommand",["taSelection","taBrowserTag","$document",function(b,c,d){var e=function(a,c){var d,e,f=a.find("li");for(e=f.length-1;e>=0;e--)d=angular.element("<"+c+">"+f[e].innerHTML+"</"+c+">"),a.after(d);a.remove(),b.setSelectionToElementEnd(d[0])},f=function(a){/(<br(|\/)>)$/i.test(a.innerHTML.trim())?b.setSelectionBeforeElement(angular.element(a).find("br")[0]):b.setSelectionToElementEnd(a)},g=function(a,b){var c=angular.element("<"+b+">"+a[0].innerHTML+"</"+b+">");a.after(c),a.remove(),f(c.find("li")[0])},h=function(a,b,d){for(var e="",g=0;g<a.length;g++)e+="<"+c("li")+">"+a[g].innerHTML+"</"+c("li")+">";var h=angular.element("<"+d+">"+e+"</"+d+">");b.after(h),b.remove(),f(h.find("li")[0])},k=function(a,b){for(var c=0;c<a.childNodes.length;c++){var d=a.childNodes[c];/* istanbul ignore next - more complex testing*/
d.tagName&&d.tagName.match(i)&&k(d,b)}/* istanbul ignore next - very rare condition that we do not test*/
if(null===a.parentNode)
// nothing left to do..
return a;var e=angular.element(b);return e[0].innerHTML=a.innerHTML,a.parentNode.insertBefore(e[0],a),a.parentNode.removeChild(a),e};return function(f,l){
// NOTE: here we are dealing with the html directly from the browser and not the html the user sees.
// IF you want to modify the html the user sees, do it when the user does a switchView
return f=c(f),function(m,n,o,p){var q,r,s,t,u,v,w,x,y=angular.element("<"+f+">");try{b.getSelection&&(x=b.getSelection()),w=b.getSelectionElement();
// special checks and fixes when we are selecting the whole container
var z,A;/* istanbul ignore next */
void 0!==w.tagName&&("div"===w.tagName.toLowerCase()&&/taTextElement.+/.test(w.id)&&x&&x.start&&1===x.start.offset&&1===x.end.offset?(
// opps we are actually selecting the whole container!
//console.log('selecting whole container!');
z=w.innerHTML,/<br>/i.test(z)&&(
// Firefox adds <br>'s and so we remove the <br>
z=z.replace(/<br>/i,"&#8203;")),/<br\/>/i.test(z)&&(
// Firefox adds <br/>'s and so we remove the <br/>
z=z.replace(/<br\/>/i,"&#8203;")),
// remove stacked up <span>'s
/<span>(<span>)+/i.test(z)&&(z=__.replace(/<span>(<span>)+/i,"<span>")),
// remove stacked up </span>'s
/<\/span>(<\/span>)+/i.test(z)&&(z=__.replace(/<\/span>(<\/span>)+/i,"</span>")),/<span><\/span>/i.test(z)&&(
// if we end up with a <span></span> here we remove it...
z=z.replace(/<span><\/span>/i,"")),
//console.log('inner whole container', selectedElement.childNodes);
A="<div>"+z+"</div>",w.innerHTML=A,
//console.log('childNodes:', selectedElement.childNodes);
b.setSelectionToElementEnd(w.childNodes[0]),w=b.getSelectionElement()):"span"===w.tagName.toLowerCase()&&x&&x.start&&1===x.start.offset&&1===x.end.offset?(
// just a span -- this is a problem...
//console.log('selecting span!');
z=w.innerHTML,/<br>/i.test(z)&&(
// Firefox adds <br>'s and so we remove the <br>
z=z.replace(/<br>/i,"&#8203;")),/<br\/>/i.test(z)&&(
// Firefox adds <br/>'s and so we remove the <br/>
z=z.replace(/<br\/>/i,"&#8203;")),
// remove stacked up <span>'s
/<span>(<span>)+/i.test(z)&&(z=__.replace(/<span>(<span>)+/i,"<span>")),
// remove stacked up </span>'s
/<\/span>(<\/span>)+/i.test(z)&&(z=__.replace(/<\/span>(<\/span>)+/i,"</span>")),/<span><\/span>/i.test(z)&&(
// if we end up with a <span></span> here we remove it...
z=z.replace(/<span><\/span>/i,"")),
//console.log('inner span', selectedElement.childNodes);
// we wrap this in a <div> because otherwise the browser get confused when we attempt to select the whole node
// and the focus is not set correctly no matter what we do
A="<div>"+z+"</div>",w.innerHTML=A,b.setSelectionToElementEnd(w.childNodes[0]),w=b.getSelectionElement()):"p"===w.tagName.toLowerCase()&&x&&x.start&&1===x.start.offset&&1===x.end.offset?(
//console.log('p special');
// we need to remove the </br> that firefox adds!
z=w.innerHTML,/<br>/i.test(z)&&(
// Firefox adds <br>'s and so we remove the <br>
z=z.replace(/<br>/i,"&#8203;")),w.innerHTML=z):"li"===w.tagName.toLowerCase()&&x&&x.start&&x.start.offset===x.end.offset&&(
// we need to remove the </br> that firefox adds!
z=w.innerHTML,/<br>/i.test(z)&&(
// Firefox adds <br>'s and so we remove the <br>
z=z.replace(/<br>/i,"")),w.innerHTML=z))}catch(a){}var B=angular.element(w),C=w.tagName.toLowerCase();if("insertorderedlist"===m.toLowerCase()||"insertunorderedlist"===m.toLowerCase()){var D=c("insertorderedlist"===m.toLowerCase()?"ol":"ul");if(C===D)
// if all selected then we should remove the list
// grab all li elements and convert to taDefaultWrap tags
return e(B,f);if("li"===C&&B.parent()[0].tagName.toLowerCase()===D&&1===B.parent().children().length)
// catch for the previous statement if only one li exists
return e(B.parent(),f);if("li"===C&&B.parent()[0].tagName.toLowerCase()!==D&&1===B.parent().children().length)
// catch for the previous statement if only one li exists
return g(B.parent(),D);if(C.match(i)&&!B.hasClass("ta-bind")){
// if it's one of those block elements we have to change the contents
// if it's a ol/ul we are changing from one to the other
if("ol"===C||"ul"===C)return g(B,D);var E=!1;return angular.forEach(B.children(),function(a){a.tagName.match(i)&&(E=!0)}),E?h(B.children(),B,D):h([angular.element("<div>"+w.innerHTML+"</div>")[0]],B,D)}if(C.match(i)){if(
// if we get here then all the contents of the ta-bind are selected
t=b.getOnlySelectedElements(),0===t.length)
// here is if there is only text in ta-bind ie <div ta-bind>test content</div>
r=angular.element("<"+D+"><li>"+w.innerHTML+"</li></"+D+">"),B.html(""),B.append(r);else{if(1===t.length&&("ol"===t[0].tagName.toLowerCase()||"ul"===t[0].tagName.toLowerCase()))return t[0].tagName.toLowerCase()===D?e(angular.element(t[0]),f):g(angular.element(t[0]),D);s="";var F=[];for(q=0;q<t.length;q++)/* istanbul ignore else: catch for real-world can't make it occur in testing */
if(3!==t[q].nodeType){var G=angular.element(t[q]);/* istanbul ignore if: browser check only, phantomjs doesn't return children nodes but chrome at least does */
if("li"===t[q].tagName.toLowerCase())continue;s+="ol"===t[q].tagName.toLowerCase()||"ul"===t[q].tagName.toLowerCase()?G[0].innerHTML:"span"!==t[q].tagName.toLowerCase()||"ol"!==t[q].childNodes[0].tagName.toLowerCase()&&"ul"!==t[q].childNodes[0].tagName.toLowerCase()?"<"+c("li")+">"+G[0].innerHTML+"</"+c("li")+">":G[0].childNodes[0].innerHTML,F.unshift(G)}r=angular.element("<"+D+">"+s+"</"+D+">"),F.pop().replaceWith(r),angular.forEach(F,function(a){a.remove()})}return void b.setSelectionToElementEnd(r[0])}}else{if("formatblock"===m.toLowerCase()){
// find the first blockElement
for(v=o.toLowerCase().replace(/[<>]/gi,""),"default"===v.trim()&&(v=f,o="<"+f+">"),r="li"===C?B.parent():B;!r[0].tagName||!r[0].tagName.match(i)&&!r.parent().attr("contenteditable");)r=r.parent(),/* istanbul ignore next */
C=(r[0].tagName||"").toLowerCase();if(C===v){
// $target is wrap element
t=r.children();var H=!1;for(q=0;q<t.length;q++)H=H||t[q].tagName.match(i);H?(r.after(t),u=r.next(),r.remove(),r=u):(y.append(r[0].childNodes),r.after(y),r.remove(),r=y)}else if(r.parent()[0].tagName.toLowerCase()!==v||r.parent().hasClass("ta-bind"))if(C.match(j))
// wrapping a list element
r.wrap(o);else{
// find the parent block element if any of the nodes are inline or text
for(
// default wrap behaviour
t=b.getOnlySelectedElements(),0===t.length&&(
// no nodes at all....
t=[r[0]]),q=0;q<t.length;q++)if(3===t[q].nodeType||!t[q].tagName.match(i))for(;3===t[q].nodeType||!t[q].tagName||!t[q].tagName.match(i);)t[q]=t[q].parentNode;if(
// remove any duplicates from the array of _nodes!
t=t.filter(function(a,b,c){return c.indexOf(a)===b}),
// remove all whole taTextElement if it is here... unless it is the only element!
t.length>1&&(t=t.filter(function(a,b,c){return!("div"===a.nodeName.toLowerCase()&&/^taTextElement/.test(a.id))})),angular.element(t[0]).hasClass("ta-bind"))r=angular.element(o),r[0].innerHTML=t[0].innerHTML,t[0].innerHTML=r[0].outerHTML;else if("blockquote"===v){for(
// blockquotes wrap other block elements
s="",q=0;q<t.length;q++)s+=t[q].outerHTML;for(r=angular.element(o),r[0].innerHTML=s,t[0].parentNode.insertBefore(r[0],t[0]),q=t.length-1;q>=0;q--)/* istanbul ignore else:  */
t[q].parentNode&&t[q].parentNode.removeChild(t[q])}else
// regular block elements replace other block elements
for(q=0;q<t.length;q++){var I=k(t[q],o);t[q]===r[0]&&(r=angular.element(I))}}else{
//unwrap logic for parent
var J=r.parent(),K=J.contents();for(q=0;q<K.length;q++)/* istanbul ignore next: can't test - some wierd thing with how phantomjs works */
J.parent().hasClass("ta-bind")&&3===K[q].nodeType&&(y=angular.element("<"+f+">"),y[0].innerHTML=K[q].outerHTML,K[q]=y[0]),J.parent()[0].insertBefore(K[q],J[0]);J.remove()}
// looses focus when we have the whole container selected and no text!
// refocus on the shown display element, this fixes a bug when using firefox
return b.setSelectionToElementEnd(r[0]),void r[0].focus()}if("createlink"===m.toLowerCase()){/* istanbul ignore next: firefox specific fix */
if("a"===b.getSelectionElement().tagName.toLowerCase())
// already a link!!! we are just replacing it...
return void(b.getSelectionElement().href=o);var L='<a href="'+o+'" target="'+(p.a.target?p.a.target:"")+'">',M="</a>",N=b.getSelection();if(N.collapsed)
// insert text at selection, then select then just let normal exec-command run
b.insertHtml(L+o+M,l);else if(a.getSelection().getRangeAt(0).canSurroundContents()){var O=angular.element(L+M)[0];a.getSelection().getRangeAt(0).surroundContents(O)}return}if("inserthtml"===m.toLowerCase())return void b.insertHtml(o,l)}try{d[0].execCommand(m,n,o)}catch(a){}}}}]).service("taSelection",["$document","taDOM","$log",/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
function(b,c,d){
// need to dereference the document else the calls don't work correctly
var e=b[0],f=function(a,b){/* check if selection is a BR element at the beginning of a container. If so, get
		* the parentNode instead.
		* offset should be zero in this case. Otherwise, return the original
		* element.
		*/
/* check if selection is a BR element at the beginning of a container. If so, get
		* the parentNode instead.
		* offset should be zero in this case. Otherwise, return the original
		* element.
		*/
return a.tagName&&a.tagName.match(/^br$/i)&&0===b&&!a.previousSibling?{element:a.parentNode,offset:0}:{element:a,offset:b}},g={getSelection:function(){var b=a.getSelection().getRangeAt(0),c=b.commonAncestorContainer,d={start:f(b.startContainer,b.startOffset),end:f(b.endContainer,b.endOffset),collapsed:b.collapsed};
//console.log('***selection container:', selection.container);
// This has problems under Firefox.
// On Firefox with
// <p>Try me !</p>
// <ul>
// <li>line 1</li>
// <li>line 2</li>
// </ul>
// <p>line 3</p>
// <ul>
// <li>line 4</li>
// <li>line 5</li>
// </ul>
// <p>Hello textAngular</p>
// WITH the cursor after the 3 on line 3, it gets the commonAncestorContainer as:
// <TextNode textContent='line 3'>
// AND Chrome gets the commonAncestorContainer as:
// <p>line 3</p>
//
// Check if the container is a text node and return its parent if so
// unless this is the whole taTextElement.  If so we return the textNode
//console.log('*********taTextElement************');
//for (var i=0; i<container.childNodes.length; i++) {
//	console.log(i, container.childNodes[i]);
//}
//console.log('getSelection start: end:', selection.start.offset, selection.end.offset);
//console.log('commonAncestorContainer:', container);
// fix this to be the <textNode>
return 3===c.nodeType&&("div"===c.parentNode.nodeName.toLowerCase()&&/^taTextElement/.test(c.parentNode.id)||(c=c.parentNode)),"div"===c.nodeName.toLowerCase()&&/^taTextElement/.test(c.id)?(d.end.element=d.start.element=d.container=c.childNodes[d.start.offset],d.start.offset=d.end.offset=0,d.collapsed=!0):c.parentNode===d.start.element||c.parentNode===d.end.element?d.container=c.parentNode:d.container=c,d},/* NOT FUNCTIONAL YET
        // under Firefox, we may have a selection that needs to be normalized
        isSelectionContainerWhole_taTextElement: function (){
            var range = rangy.getSelection().getRangeAt(0);
            var container = range.commonAncestorContainer;
            if (container.nodeName.toLowerCase() === 'div' &&
                /^taTextElement/.test(container.id)) {
                // container is the whole taTextElement
                return true;
            }
            return false;
        },
		setNormalizedSelection: function (){
			var range = rangy.getSelection().getRangeAt(0);
			var container = range.commonAncestorContainer;
			console.log(range);
			console.log(container.childNodes);
			if (range.collapsed) {
				// we know what to do...
				console.log(container.childNodes[range.startOffset]);
				api.setSelectionToElementStart(container.childNodes[range.startOffset]);
			}
		},
*/
getOnlySelectedElements:function(){var b=a.getSelection().getRangeAt(0),c=b.commonAncestorContainer;
// get the nodes in the range that are ELEMENT_NODE and are children of the container
// in this range...
// Node.TEXT_NODE === 3
// Node.ELEMENT_NODE === 1
// Node.COMMENT_NODE === 8
// Check if the container is a text node and return its parent if so
return c=3===c.nodeType?c.parentNode:c,b.getNodes([1],function(a){return a.parentNode===c})},
// this includes the container element if all children are selected
getAllSelectedElements:function(){var b=a.getSelection().getRangeAt(0),c=b.commonAncestorContainer;
// Node.TEXT_NODE === 3
// Node.ELEMENT_NODE === 1
// Node.COMMENT_NODE === 8
// Check if the container is a text node and return its parent if so
c=3===c.nodeType?c.parentNode:c;
// get the nodes in the range that are ELEMENT_NODE and are children of the container
// in this range...
var d=b.getNodes([1],function(a){return a.parentNode===c}),e=c.innerHTML;
//console.log(innerHtml);
//console.log(range.toHtml());
//console.log(innerHtml === range.toHtml());
if(
// remove the junk that rangy has put down
e=e.replace(/<span id=.selectionBoundary[^>]+>\ufeff?<\/span>/gi,""),e===b.toHtml()&&("div"!==c.nodeName.toLowerCase()||!/^taTextElement/.test(c.id))){for(var f=[],g=d.length;g--;f.unshift(d[g]));d=f,d.push(c)}return d},
// Some basic selection functions
getSelectionElement:function(){return g.getSelection().container},setSelection:function(b,c,d){var e=a.createRange();e.setStart(b,c),e.setEnd(b,d),a.getSelection().setSingleRange(e)},setSelectionBeforeElement:function(b){var c=a.createRange();c.selectNode(b),c.collapse(!0),a.getSelection().setSingleRange(c)},setSelectionAfterElement:function(b){var c=a.createRange();c.selectNode(b),c.collapse(!1),a.getSelection().setSingleRange(c)},setSelectionToElementStart:function(b){var c=a.createRange();c.selectNodeContents(b),c.collapse(!0),a.getSelection().setSingleRange(c)},setSelectionToElementEnd:function(b){var c=a.createRange();c.selectNodeContents(b),c.collapse(!1),b.childNodes&&b.childNodes[b.childNodes.length-1]&&"br"===b.childNodes[b.childNodes.length-1].nodeName&&(c.startOffset=c.endOffset=c.startOffset-1),a.getSelection().setSingleRange(c)},
// from http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
// topNode is the contenteditable normally, all manipulation MUST be inside this.
insertHtml:function(b,d){var f,h,j,l,m,n,o,p=angular.element("<div>"+b+"</div>"),q=a.getSelection().getRangeAt(0),r=e.createDocumentFragment(),s=p[0].childNodes,t=!0;if(s.length>0){for(
// NOTE!! We need to do the following:
// check for blockelements - if they exist then we have to split the current element in half (and all others up to the closest block element) and insert all children in-between.
// If there are no block elements, or there is a mixture we need to create textNodes for the non wrapped text (we don't want them spans messing up the picture).
l=[],j=0;j<s.length;j++)"p"===s[j].nodeName.toLowerCase()&&""===s[j].innerHTML.trim()||// empty p element
3===s[j].nodeType&&""===s[j].nodeValue.trim()||(t=t&&!i.test(s[j].nodeName),l.push(s[j]));for(var u=0;u<l.length;u++)n=r.appendChild(l[u]);!t&&q.collapsed&&/^(|<br(|\/)>)$/i.test(q.startContainer.innerHTML)&&q.selectNode(q.startContainer)}else t=!0,
// paste text of some sort
n=r=e.createTextNode(b);
// Other Edge case - selected data spans multiple blocks.
if(t)q.deleteContents();else// not inline insert
if(q.collapsed&&q.startContainer!==d)if(q.startContainer.innerHTML&&q.startContainer.innerHTML.match(/^<[^>]*>$/i))
// this log is to catch when innerHTML is something like `<img ...>`
f=q.startContainer,1===q.startOffset?(
// before single tag
q.setStartAfter(f),q.setEndAfter(f)):(
// after single tag
q.setStartBefore(f),q.setEndBefore(f));else{
// split element into 2 and insert block element in middle
if(3===q.startContainer.nodeType&&q.startContainer.parentNode!==d)
// Escape out of the inline tags like b
for(// if text node
f=q.startContainer.parentNode,h=f.cloneNode(),
// split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
c.splitNodes(f.childNodes,f,h,q.startContainer,q.startOffset);!k.test(f.nodeName);){angular.element(f).after(h),f=f.parentNode;var v=h;h=f.cloneNode(),
// split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
c.splitNodes(f.childNodes,f,h,v)}else f=q.startContainer,h=f.cloneNode(),c.splitNodes(f.childNodes,f,h,void 0,void 0,q.startOffset);if(angular.element(f).after(h),
// put cursor to end of inserted content
//console.log('setStartAfter', parent);
q.setStartAfter(f),q.setEndAfter(f),/^(|<br(|\/)>)$/i.test(f.innerHTML.trim())&&(q.setStartBefore(f),q.setEndBefore(f),angular.element(f).remove()),/^(|<br(|\/)>)$/i.test(h.innerHTML.trim())&&angular.element(h).remove(),"li"===f.nodeName.toLowerCase()){for(o=e.createDocumentFragment(),m=0;m<r.childNodes.length;m++)p=angular.element("<li>"),c.transferChildNodes(r.childNodes[m],p[0]),c.transferNodeAttributes(r.childNodes[m],p[0]),o.appendChild(p[0]);r=o,n&&(n=r.childNodes[r.childNodes.length-1],n=n.childNodes[n.childNodes.length-1])}}else q.deleteContents();q.insertNode(r),n&&g.setSelectionToElementEnd(n)}};return g}]).service("taDOM",function(){var a={
// recursive function that returns an array of angular.elements that have the passed attribute set on them
getByAttribute:function(b,c){var d=[],e=b.children();return e.length&&angular.forEach(e,function(b){d=d.concat(a.getByAttribute(angular.element(b),c))}),void 0!==b.attr(c)&&d.push(b),d},transferChildNodes:function(a,b){for(
// clear out target
b.innerHTML="";a.childNodes.length>0;)b.appendChild(a.childNodes[0]);return b},splitNodes:function(b,c,d,e,f,g){if(!e&&isNaN(g))throw new Error("taDOM.splitNodes requires a splitNode or splitIndex");for(var h=document.createDocumentFragment(),i=document.createDocumentFragment(),j=0;b.length>0&&(isNaN(g)||g!==j)&&b[0]!==e;)h.appendChild(b[0]),// this removes from the nodes array (if proper childNodes object.
j++;for(!isNaN(f)&&f>=0&&b[0]&&(h.appendChild(document.createTextNode(b[0].nodeValue.substring(0,f))),b[0].nodeValue=b[0].nodeValue.substring(f));b.length>0;)i.appendChild(b[0]);a.transferChildNodes(h,c),a.transferChildNodes(i,d)},transferNodeAttributes:function(a,b){for(var c=0;c<a.attributes.length;c++)b.setAttribute(a.attributes[c].name,a.attributes[c].value);return b}};return a}),angular.module("textAngular.validators",[]).directive("taMaxText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMaxText));if(isNaN(e))throw"Max text must be an integer";c.$observe("taMaxText",function(a){if(e=parseInt(a),isNaN(e))throw"Max text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMaxText=function(a){var b=angular.element("<div/>");return b.html(a),b.text().length<=e}}}}).directive("taMinText",function(){return{restrict:"A",require:"ngModel",link:function(a,b,c,d){var e=parseInt(a.$eval(c.taMinText));if(isNaN(e))throw"Min text must be an integer";c.$observe("taMinText",function(a){if(e=parseInt(a),isNaN(e))throw"Min text must be an integer";d.$dirty&&d.$validate()}),d.$validators.taMinText=function(a){var b=angular.element("<div/>");return b.html(a),!b.text().length||b.text().length>=e}}}}),angular.module("textAngular.taBind",["textAngular.factories","textAngular.DOM"]).service("_taBlankTest",[function(){return function(a){
// we radically restructure this code.
// what was here before was incredibly fragile.
// What we do now is to check that the html is non-blank visually
// which we check by looking at html->text
if(!a)return!0;
// find first non-tag match - ie start of string or after tag that is not whitespace
// var t0 = performance.now();
// Takes a small fraction of a mSec to do this...
var b=d(a);
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:');
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:');
return""===b&&!/<img[^>]+>/.test(a)}}]).directive("taButton",[function(){return{link:function(a,b,c){b.attr("unselectable","on"),b.on("mousedown",function(a,b){/* istanbul ignore else: this is for catching the jqLite testing*/
// this prevents focusout from firing on the editor when clicking toolbar buttons
return b&&angular.extend(a,b),a.preventDefault(),!1})}}}]).directive("taBind",["taSanitize","$timeout","$document","taFixChrome","taBrowserTag","taSelection","taSelectableElements","taApplyCustomRenderers","taOptions","_taBlankTest","$parse","taDOM","textAngularManager",function(b,c,d,e,f,h,j,l,o,p,q,r,s){
// Uses for this are textarea or input with ng-model and ta-bind='text'
// OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
return{priority:2,// So we override validators correctly
require:["ngModel","?ngModelOptions"],link:function(f,u,v,w){function x(a){var b;return Q.forEach(function(c){if(c.keyCode===a.keyCode){var d=(a.metaKey?N:0)+(a.ctrlKey?M:0)+(a.shiftKey?P:0)+(a.altKey?O:0);if(c.forbiddenModifiers&d)return;c.mustHaveModifiers.every(function(a){return d&a})&&(b=c.specialKey)}}),b}var y,z,A,B,C=w[0],D=w[1]||{},E=void 0!==u.attr("contenteditable")&&u.attr("contenteditable"),F=E||"textarea"===u[0].tagName.toLowerCase()||"input"===u[0].tagName.toLowerCase(),G=!1,H=!1,I=!1,J=v.taUnsafeSanitizer||o.disableSanitizer,K=/^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i,L=/^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i,M=1,N=2,O=4,P=8,Q=[
//		ctrl/command + z
{specialKey:"UndoKey",forbiddenModifiers:O+P,mustHaveModifiers:[N+M],keyCode:90},
//		ctrl/command + shift + z
{specialKey:"RedoKey",forbiddenModifiers:O,mustHaveModifiers:[N+M,P],keyCode:90},
//		ctrl/command + y
{specialKey:"RedoKey",forbiddenModifiers:O+P,mustHaveModifiers:[N+M],keyCode:89},
//		TabKey
{specialKey:"TabKey",forbiddenModifiers:N+P+O+M,mustHaveModifiers:[],keyCode:9},
//		shift + TabKey
{specialKey:"ShiftTabKey",forbiddenModifiers:N+O+M,mustHaveModifiers:[P],keyCode:9}];
// set the default to be a paragraph value
void 0===v.taDefaultWrap&&(v.taDefaultWrap="p"),/* istanbul ignore next: ie specific test */
""===v.taDefaultWrap?(A="",B=void 0===g.ie?"<div><br></div>":g.ie>=11?"<p><br></p>":g.ie<=8?"<P>&nbsp;</P>":"<p>&nbsp;</p>"):(A=void 0===g.ie||g.ie>=11?"<"+v.taDefaultWrap+"><br></"+v.taDefaultWrap+">":g.ie<=8?"<"+v.taDefaultWrap.toUpperCase()+"></"+v.taDefaultWrap.toUpperCase()+">":"<"+v.taDefaultWrap+"></"+v.taDefaultWrap+">",B=void 0===g.ie||g.ie>=11?"<"+v.taDefaultWrap+"><br></"+v.taDefaultWrap+">":g.ie<=8?"<"+v.taDefaultWrap.toUpperCase()+">&nbsp;</"+v.taDefaultWrap.toUpperCase()+">":"<"+v.taDefaultWrap+">&nbsp;</"+v.taDefaultWrap+">"),/* istanbul ignore else */
D.$options||(D.$options={});// ng-model-options support
var R=function(a){if(p(a))return a;var b=angular.element("<div>"+a+"</div>");
//console.log('domTest.children().length():', domTest.children().length);
//console.log('_ensureContentWrapped', domTest.children());
//console.log(value, attrs.taDefaultWrap);
if(0===b.children().length)
// if we have a <br> and the attrs.taDefaultWrap is a <p> we need to remove the <br>
//value = value.replace(/<br>/i, '');
a="<"+v.taDefaultWrap+">"+a+"</"+v.taDefaultWrap+">";else{var c,d=b[0].childNodes,e=!1;for(c=0;c<d.length&&!(e=d[c].nodeName.toLowerCase().match(i));c++);if(e)for(a="",c=0;c<d.length;c++){var f=d[c],g=f.nodeName.toLowerCase();
//console.log('node#:', i, 'name:', nodeName);
if("#comment"===g)a+="<!--"+f.nodeValue+"-->";else if("#text"===g){
// determine if this is all whitespace, if so, we will leave it as it is.
// otherwise, we will wrap it as it is
var h=f.textContent;
// not pure white space so wrap in <p>...</p> or whatever attrs.taDefaultWrap is set to.
a+=h.trim()?"<"+v.taDefaultWrap+">"+h+"</"+v.taDefaultWrap+">":h}else if(g.match(i))a+=f.outerHTML;else{/* istanbul ignore  next: Doesn't seem to trigger on tests */
var j=f.outerHTML||f.nodeValue;/* istanbul ignore else: Doesn't seem to trigger on tests, is tested though */
a+=""!==j.trim()?"<"+v.taDefaultWrap+">"+j+"</"+v.taDefaultWrap+">":j}}else a="<"+v.taDefaultWrap+">"+a+"</"+v.taDefaultWrap+">"}
//console.log(value);
return a};v.taPaste&&(z=q(v.taPaste)),u.addClass("ta-bind");var S;f["$undoManager"+(v.id||"")]=C.$undoManager={_stack:[],_index:0,_max:1e3,push:function(a){return"undefined"==typeof a||null===a||"undefined"!=typeof this.current()&&null!==this.current()&&a===this.current()?a:(this._index<this._stack.length-1&&(this._stack=this._stack.slice(0,this._index+1)),this._stack.push(a),S&&c.cancel(S),this._stack.length>this._max&&this._stack.shift(),this._index=this._stack.length-1,a)},undo:function(){return this.setToIndex(this._index-1)},redo:function(){return this.setToIndex(this._index+1)},setToIndex:function(a){if(!(a<0||a>this._stack.length-1))return this._index=a,this.current()},current:function(){return this._stack[this._index]}};
// in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
var T,U=function(){if(E)return u[0].innerHTML;if(F)return u.val();throw"textAngular Error: attempting to update non-editable taBind"},V=function(a){
// emit the element-select event, pass the element
return f.$emit("ta-element-select",this),a.preventDefault(),!1},W=f["reApplyOnSelectorHandlers"+(v.id||"")]=function(){/* istanbul ignore else */
G||angular.forEach(j,function(a){
// check we don't apply the handler twice
u.find(a).off("click",V).on("click",V)})},X=function(a,b,c){I=c||!1,"undefined"!=typeof b&&null!==b||(b=E),// if not contentEditable then the native undo/redo is fine
"undefined"!=typeof a&&null!==a||(a=U()),p(a)?(
// this avoids us from tripping the ng-pristine flag if we click in and out with out typing
""!==C.$viewValue&&C.$setViewValue(""),b&&""!==C.$undoManager.current()&&C.$undoManager.push("")):(W(),C.$viewValue!==a&&(C.$setViewValue(a),b&&C.$undoManager.push(a))),C.$render()},Y=function(a){u[0].innerHTML=a},Z=f["$undoTaBind"+(v.id||"")]=function(){/* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
if(!G&&E){var a=C.$undoManager.undo();"undefined"!=typeof a&&null!==a&&(Y(a),X(a,!1),T&&c.cancel(T),T=c(function(){u[0].focus(),h.setSelectionToElementEnd(u[0])},1))}},$=f["$redoTaBind"+(v.id||"")]=function(){/* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
if(!G&&E){var a=C.$undoManager.redo();"undefined"!=typeof a&&null!==a&&(Y(a),X(a,!1),/* istanbul ignore next */
T&&c.cancel(T),T=c(function(){u[0].focus(),h.setSelectionToElementEnd(u[0])},1))}};
//used for updating when inserting wrapped elements
f["updateTaBind"+(v.id||"")]=function(){G||X(void 0,void 0,!0)};
// catch DOM XSS via taSanitize
// Sanitizing both ways is identical
var _=function(a){return C.$oldViewValue=b(e(a),C.$oldViewValue,J)};
//this code is used to update the models when data is entered/deleted
if(
// trigger the validation calls
u.attr("required")&&(C.$validators.required=function(a,b){return!p(a||b)}),
// parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
C.$parsers.push(_),C.$parsers.unshift(R),
// because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
C.$formatters.push(_),C.$formatters.unshift(R),C.$formatters.unshift(function(a){return C.$undoManager.push(a||"")}),F)if(f.events={},E){
// all the code specific to contenteditable divs
var aa=!1,ba=function(a){var d=void 0!==a&&a.match(/content=["']*OneNote.File/i);/* istanbul ignore else: don't care if nothing pasted */
//console.log(text);
if(a&&a.trim().length){
// test paste from word/microsoft product
if(a.match(/class=["']*Mso(Normal|List)/i)||a.match(/content=["']*Word.Document/i)||a.match(/content=["']*OneNote.File/i)){var e=a.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);e=e?e[1]:a,e=e.replace(/<o:p>[\s\S]*?<\/o:p>/gi,"").replace(/class=(["']|)MsoNormal(["']|)/gi,"");var g=angular.element("<div>"+e+"</div>"),i=angular.element("<div></div>"),j={element:null,lastIndent:[],lastLi:null,isUl:!1};j.lastIndent.peek=function(){var a=this.length;if(a>0)return this[a-1]};for(var k=function(a){j.isUl=a,j.element=angular.element(a?"<ul>":"<ol>"),j.lastIndent=[],j.lastIndent.peek=function(){var a=this.length;if(a>0)return this[a-1]},j.lastLevelMatch=null},l=0;l<=g[0].childNodes.length;l++)if(g[0].childNodes[l]&&"#text"!==g[0].childNodes[l].nodeName){var m=g[0].childNodes[l].tagName.toLowerCase();if("p"===m||"h1"===m||"h2"===m||"h3"===m||"h4"===m||"h5"===m||"h6"===m){var n=angular.element(g[0].childNodes[l]),o=(n.attr("class")||"").match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);if(o){if(n[0].childNodes.length<2||n[0].childNodes[1].childNodes.length<1)continue;var p="bullet"===o[1].toLowerCase()||"number"!==o[1].toLowerCase()&&!(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(n[0].childNodes[1].innerHTML)||/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(n[0].childNodes[1].childNodes[0].innerHTML)),q=(n.attr("style")||"").match(/margin-left:([\-\.0-9]*)/i),s=parseFloat(q?q[1]:0),t=(n.attr("style")||"").match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);if(
// prefers the mso-list syntax
t&&t[2]&&(s=parseInt(t[2])),t&&(!j.lastLevelMatch||t[1]!==j.lastLevelMatch[1])||!o[3]||"first"===o[3].toLowerCase()||null===j.lastIndent.peek()||j.isUl!==p&&j.lastIndent.peek()===s)k(p),i.append(j.element);else if(null!=j.lastIndent.peek()&&j.lastIndent.peek()<s)j.element=angular.element(p?"<ul>":"<ol>"),j.lastLi.append(j.element);else if(null!=j.lastIndent.peek()&&j.lastIndent.peek()>s){for(;null!=j.lastIndent.peek()&&j.lastIndent.peek()>s;)if("li"!==j.element.parent()[0].tagName.toLowerCase()){if(!/[uo]l/i.test(j.element.parent()[0].tagName.toLowerCase()))// else it's it should be a sibling
break;j.element=j.element.parent(),j.lastIndent.pop()}else j.element=j.element.parent();j.isUl="ul"===j.element[0].tagName.toLowerCase(),p!==j.isUl&&(k(p),i.append(j.element))}j.lastLevelMatch=t,s!==j.lastIndent.peek()&&j.lastIndent.push(s),j.lastLi=angular.element("<li>"),j.element.append(j.lastLi),j.lastLi.html(n.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/gi,"")),n.remove()}else k(!1),i.append(n)}}var v=function(a){a=angular.element(a);for(var b=a[0].childNodes.length-1;b>=0;b--)a.after(a[0].childNodes[b]);a.remove()};angular.forEach(i.find("span"),function(a){a.removeAttribute("lang"),a.attributes.length<=0&&v(a)}),angular.forEach(i.find("font"),v),a=i.html(),d&&(a=i.html()||g.html())}else{if(
// remove unnecessary chrome insert
a=a.replace(/<(|\/)meta[^>]*?>/gi,""),a.match(/<[^>]*?(ta-bind)[^>]*?>/)){
// entire text-angular or ta-bind has been pasted, REMOVE AT ONCE!!
if(a.match(/<[^>]*?(text-angular)[^>]*?>/)){var w=angular.element("<div>"+a+"</div>");w.find("textarea").remove();for(var x=r.getByAttribute(w,"ta-bind"),y=0;y<x.length;y++){for(var A=x[y][0].parentNode.parentNode,B=0;B<x[y][0].childNodes.length;B++)A.parentNode.insertBefore(x[y][0].childNodes[B],A);A.parentNode.removeChild(A)}a=w.html().replace('<br class="Apple-interchange-newline">',"")}}else a.match(/^<span/)&&(
// in case of pasting only a span - chrome paste, remove them. THis is just some wierd formatting
// if we remove the '<span class="Apple-converted-space"> </span>' here we destroy the spacing
// on paste from even ourselves!
a.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/gi)||(a=a.replace(/<(|\/)span[^>]*?>/gi,"")));
// Webkit on Apple tags
a=a.replace(/<br class="Apple-interchange-newline"[^>]*?>/gi,"").replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/gi,"&nbsp;")}/<li(\s.*)?>/i.test(a)&&/(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(a)===!1&&(
// insert missing parent of li element
a=a.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i,"<ul>$&</ul>")),
// parse whitespace from plaintext input, starting with preceding spaces that get stripped on paste
a=a.replace(/^[ |\u00A0]+/gm,function(a){for(var b="",c=0;c<a.length;c++)b+="&nbsp;";return b}).replace(/\n|\r\n|\r/g,"<br />").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;"),z&&(a=z(f,{$html:a})||a),a=b(a,"",J),h.insertHtml(a,u[0]),c(function(){C.$setViewValue(U()),aa=!1,u.removeClass("processing-paste")},0)}else aa=!1,u.removeClass("processing-paste")};u.on("paste",f.events.paste=function(b,e){if(/* istanbul ignore else: this is for catching the jqLite testing*/
e&&angular.extend(b,e),G||aa)return b.stopPropagation(),b.preventDefault(),!1;
// Code adapted from http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718
aa=!0,u.addClass("processing-paste");var f,g=(b.originalEvent||b).clipboardData;if(g&&g.getData&&g.types.length>0){for(var h="",i=0;i<g.types.length;i++)h+=" "+g.types[i];/* istanbul ignore next: browser tests */
return/text\/html/i.test(h)?f=g.getData("text/html"):/text\/plain/i.test(h)&&(f=g.getData("text/plain")),ba(f),b.stopPropagation(),b.preventDefault(),!1}// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
var j=a.saveSelection(),k=angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');d.find("body").append(k),k[0].focus(),c(function(){
// restore selection
a.restoreSelection(j),ba(k[0].innerHTML),u[0].focus(),k.remove()},0)}),u.on("cut",f.events.cut=function(a){
// timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
G?a.preventDefault():c(function(){C.$setViewValue(U())},0)}),u.on("keydown",f.events.keydown=function(a,b){/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),a.specialKey=x(a);var c;/* istanbul ignore else: readonly check */
if(/* istanbul ignore next: difficult to test */
o.keyMappings.forEach(function(b){a.specialKey===b.commandKeyCode&&(
// taOptions has remapped this binding... so
// we disable our own
a.specialKey=void 0),b.testForKey(a)&&(c=b.commandKeyCode),"UndoKey"!==b.commandKeyCode&&"RedoKey"!==b.commandKeyCode||b.enablePropagation||a.preventDefault()}),/* istanbul ignore next: difficult to test */
"undefined"!=typeof c&&(a.specialKey=c),/* istanbul ignore next: difficult to test as can't seem to select */
"undefined"==typeof a.specialKey||"UndoKey"===a.specialKey&&"RedoKey"===a.specialKey||(a.preventDefault(),s.sendKeyCommand(f,a)),!G&&("UndoKey"===a.specialKey&&(Z(),a.preventDefault()),"RedoKey"===a.specialKey&&($(),a.preventDefault()),13===a.keyCode&&!a.shiftKey)){var d,e=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return!0;return!1},g=h.getSelectionElement();if(!g.tagName.match(k))return;var i=angular.element(A),j=["blockquote","ul","ol"];if(e(j,g.parentNode.tagName.toLowerCase())){if(/^<br(|\/)>$/i.test(g.innerHTML.trim())&&!g.nextSibling){
// if last element is blank, pull element outside.
d=angular.element(g);var l=d.parent();l.after(i),d.remove(),0===l.children().length&&l.remove(),h.setSelectionToElementStart(i[0]),a.preventDefault()}/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(g.innerHTML.trim())&&(d=angular.element(g),d.after(i),d.remove(),h.setSelectionToElementStart(i[0]),a.preventDefault())}}});var ca;
// Placeholders not supported on ie 8 and below
if(u.on("keyup",f.events.keyup=function(a,b){/* istanbul ignore next: FF specific bug fix */
if(/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),9===a.keyCode){var d=h.getSelection();return void(d.start.element===u[0]&&u.children().length&&h.setSelectionToElementStart(u.children()[0]))}if(S&&c.cancel(S),!G&&!K.test(a.keyCode)){
// if enter - insert new taDefaultWrap, if shift+enter insert <br/>
if(""!==A&&13===a.keyCode&&!a.shiftKey){for(
// new paragraph, br should be caught correctly
var e=h.getSelectionElement();!e.tagName.match(k)&&e!==u[0];)e=e.parentNode;if(e.tagName.toLowerCase()!==v.taDefaultWrap&&"li"!==e.tagName.toLowerCase()&&(""===e.innerHTML.trim()||"<br>"===e.innerHTML.trim())){var f=angular.element(A);angular.element(e).replaceWith(f),h.setSelectionToElementStart(f[0])}}var g=U();""===A||""!==g.trim()&&"<br>"!==g.trim()?"<"!==g.substring(0,1)&&""!==v.taDefaultWrap:(Y(A),h.setSelectionToElementStart(u.children()[0]));var i=y!==a.keyCode&&L.test(a.keyCode);ca&&c.cancel(ca),ca=c(function(){X(g,i,!0)},D.$options.debounce||400),i||(S=c(function(){C.$undoManager.push(g)},250)),y=a.keyCode}}),u.on("blur",f.events.blur=function(){H=!1,/* istanbul ignore else: if readonly don't update model */
G?(I=!0,// don't redo the whole thing, just check the placeholder logic
C.$render()):X(void 0,void 0,!0)}),v.placeholder&&(g.ie>8||void 0===g.ie)){var da;if(!v.id)throw"textAngular Error: An unique ID is required for placeholders to work";da=m("#"+v.id+".placeholder-text:before",'content: "'+v.placeholder+'"'),f.$on("$destroy",function(){n(da)})}u.on("focus",f.events.focus=function(){H=!0,u.removeClass("placeholder-text"),W()}),u.on("mouseup",f.events.mouseup=function(){var a=h.getSelection();a.start.element===u[0]&&u.children().length&&h.setSelectionToElementStart(u.children()[0])}),
// prevent propagation on mousedown in editor, see #206
u.on("mousedown",f.events.mousedown=function(a,b){/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),a.stopPropagation()})}else{
// if a textarea or input just add in change and blur handlers, everything else is done by angulars input directive
u.on("change blur",f.events.change=f.events.blur=function(){G||C.$setViewValue(U())}),u.on("keydown",f.events.keydown=function(a,b){
// Reference to http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
/* istanbul ignore else: otherwise normal functionality */
if(/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),9===a.keyCode){// tab was pressed
// get caret position/selection
var c=this.selectionStart,d=this.selectionEnd,e=u.val();if(a.shiftKey){
// find \t
var f=e.lastIndexOf("\n",c),g=e.lastIndexOf("\t",c);g!==-1&&g>=f&&(
// set textarea value to: text before caret + tab + text after caret
u.val(e.substring(0,g)+e.substring(g+1)),
// put caret at right position again (add one for the tab)
this.selectionStart=this.selectionEnd=c-1)}else
// set textarea value to: text before caret + tab + text after caret
u.val(e.substring(0,c)+"\t"+e.substring(d)),
// put caret at right position again (add one for the tab)
this.selectionStart=this.selectionEnd=c+1;
// prevent the focus lose
a.preventDefault()}});var ea=function(a,b){for(var c="",d=0;d<b;d++)c+=a;return c},fa=function(a,b,c){for(var d=0;d<a.length;d++)b.call(c,d,a[d])},ga=function(a,b){var c="",d=a.childNodes;
// tab out and add the <ul> or <ol> html piece
// now add on the </ol> or </ul> piece
return b++,c+=ea("\t",b-1)+a.outerHTML.substring(0,4),fa(d,function(a,d){/* istanbul ignore next: browser catch */
var e=d.nodeName.toLowerCase();/* istanbul ignore next: not tested, and this was original code -- so not wanting to possibly cause an issue, leaving it... */
return"#comment"===e?void(c+="<!--"+d.nodeValue+"-->"):"#text"===e?void(c+=d.textContent):void(d.outerHTML&&(c+="ul"===e||"ol"===e?"\n"+ga(d,b):"\n"+ea("\t",b)+d.outerHTML))}),c+="\n"+ea("\t",b-1)+a.outerHTML.substring(a.outerHTML.lastIndexOf("<"))};
// handle formating of something like:
// <ol><!--First comment-->
//  <li>Test Line 1<!--comment test list 1--></li>
//    <ul><!--comment ul-->
//      <li>Nested Line 1</li>
//        <!--comment between nested lines--><li>Nested Line 2</li>
//    </ul>
//  <li>Test Line 3</li>
// </ol>
C.$formatters.unshift(function(a){
// tabulate the HTML so it looks nicer
//
// first get a list of the nodes...
// we do this by using the element parser...
//
// doing this -- which is simpiler -- breaks our tests...
//var _nodes=angular.element(htmlValue);
var b=angular.element("<div>"+a+"</div>")[0].childNodes;
// do the reformatting of the layout...
return b.length>0&&(a="",fa(b,function(b,c){var d=c.nodeName.toLowerCase();/* istanbul ignore next: not tested, and this was original code -- so not wanting to possibly cause an issue, leaving it... */
// we aready have some content, so drop to a new line
// okay a set of list stuff we want to reformat in a nested way
return"#comment"===d?void(a+="<!--"+c.nodeValue+"-->"):"#text"===d?void(a+=c.textContent):void(c.outerHTML&&(a.length>0&&(a+="\n"),a+="ul"===d||"ol"===d?""+ga(c,0):""+c.outerHTML))})),a})}var ha,ia=function(a,b){
// emit the drop event, pass the element, preventing should be done elsewhere
if(/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),!t&&!G){t=!0;var d;d=a.originalEvent?a.originalEvent.dataTransfer:a.dataTransfer,f.$emit("ta-drop-event",this,a,d),c(function(){t=!1,X(void 0,void 0,!0)},100)}},ja=!1;
// changes to the model variable from outside the html/text inputs
C.$render=function(){/* istanbul ignore if: Catches rogue renders, hard to replicate in tests */
if(!ja){ja=!0;
// catch model being null or undefined
var a=C.$viewValue||"";
// if the editor isn't focused it needs to be updated, otherwise it's receiving user input
I||(/* istanbul ignore else: in other cases we don't care */
E&&H&&(
// update while focussed
u.removeClass("placeholder-text"),/* istanbul ignore next: don't know how to test this */
ha&&c.cancel(ha),ha=c(function(){/* istanbul ignore if: Can't be bothered testing this... */
H||(u[0].focus(),h.setSelectionToElementEnd(u.children()[u.children().length-1])),ha=void 0},1)),E?(
// blank
Y(
// WYSIWYG Mode
v.placeholder?""===a?A:a:""===a?A:a),
// if in WYSIWYG and readOnly we kill the use of links by clicking
G?u.off("drop",ia):(W(),u.on("drop",ia))):"textarea"!==u[0].tagName.toLowerCase()&&"input"!==u[0].tagName.toLowerCase()?
// make sure the end user can SEE the html code as a display. This is a read-only display element
Y(l(a)):
// only for input and textarea inputs
u.val(a)),E&&v.placeholder&&(""===a?H?u.removeClass("placeholder-text"):u.addClass("placeholder-text"):u.removeClass("placeholder-text")),ja=I=!1}},v.taReadonly&&(
//set initial value
G=f.$eval(v.taReadonly),G?(u.addClass("ta-readonly"),
// we changed to readOnly mode (taReadonly='true')
"textarea"!==u[0].tagName.toLowerCase()&&"input"!==u[0].tagName.toLowerCase()||u.attr("disabled","disabled"),void 0!==u.attr("contenteditable")&&u.attr("contenteditable")&&u.removeAttr("contenteditable")):(u.removeClass("ta-readonly"),
// we changed to NOT readOnly mode (taReadonly='false')
"textarea"===u[0].tagName.toLowerCase()||"input"===u[0].tagName.toLowerCase()?u.removeAttr("disabled"):E&&u.attr("contenteditable","true")),
// taReadonly only has an effect if the taBind element is an input or textarea or has contenteditable='true' on it.
// Otherwise it is readonly by default
f.$watch(v.taReadonly,function(a,b){b!==a&&(a?(u.addClass("ta-readonly"),
// we changed to readOnly mode (taReadonly='true')
"textarea"!==u[0].tagName.toLowerCase()&&"input"!==u[0].tagName.toLowerCase()||u.attr("disabled","disabled"),void 0!==u.attr("contenteditable")&&u.attr("contenteditable")&&u.removeAttr("contenteditable"),
// turn ON selector click handlers
angular.forEach(j,function(a){u.find(a).on("click",V)}),u.off("drop",ia)):(u.removeClass("ta-readonly"),
// we changed to NOT readOnly mode (taReadonly='false')
"textarea"===u[0].tagName.toLowerCase()||"input"===u[0].tagName.toLowerCase()?u.removeAttr("disabled"):E&&u.attr("contenteditable","true"),
// remove the selector click handlers
angular.forEach(j,function(a){u.find(a).off("click",V)}),u.on("drop",ia)),G=a)})),
// Initialise the selectableElements
// if in WYSIWYG and readOnly we kill the use of links by clicking
E&&!G&&(angular.forEach(j,function(a){u.find(a).on("click",V)}),u.on("drop",ia))}}}]);
// this global var is used to prevent multiple fires of the drop event. Needs to be global to the textAngular file.
var t=!1,u=angular.module("textAngular",["ngSanitize","textAngularSetup","textAngular.factories","textAngular.DOM","textAngular.validators","textAngular.taBind"]);//This makes ngSanitize required
return u.config([function(){
// clear taTools variable. Just catches testing and any other time that this config may run multiple times...
angular.forEach(e,function(a,b){delete e[b]})}]),u.directive("textAngular",["$compile","$timeout","taOptions","taSelection","taExecCommand","textAngularManager","$document","$animate","$log","$q","$parse",function(b,c,d,e,f,g,h,i,j,k,l){return{require:"?ngModel",scope:{},restrict:"EA",priority:2,// So we override validators correctly
link:function(m,n,o,p){
// all these vars should not be accessable outside this directive
var q,r,s,t,u,v,w,x,y,z,A,B=o.serial?o.serial:Math.floor(1e16*Math.random());m._name=o.name?o.name:"textAngularEditor"+B;var C=function(a,b,d){c(function(){
// shim the .one till fixed
var c=function(){a.off(b,c),d.apply(this,arguments)};a.on(b,c)},100)};if(y=f(o.taDefaultWrap),
// get the settings from the defaults and add our specific functions that need to be on the scope
angular.extend(m,angular.copy(d),{
// wraps the selection in the provided tag / execCommand function. Should only be called in WYSIWYG mode.
wrapSelection:function(a,b,c){
// we restore the saved selection that was saved when focus was lost
/* NOT FUNCTIONAL YET */
/* textAngularManager.restoreFocusSelection(scope._name, scope); */
"undo"===a.toLowerCase()?m["$undoTaBindtaTextElement"+B]():"redo"===a.toLowerCase()?m["$redoTaBindtaTextElement"+B]():(
// catch errors like FF erroring when you try to force an undo with nothing done
y(a,!1,b,m.defaultTagAttributes),c&&
// re-apply the selectable tool events
m["reApplyOnSelectorHandlerstaTextElement"+B](),
// refocus on the shown display element, this fixes a display bug when using :focus styles to outline the box.
// You still have focus on the text/html input it just doesn't show up
m.displayElements.text[0].focus())},showHtml:m.$eval(o.taShowHtml)||!1}),
// setup the options from the optional attributes
o.taFocussedClass&&(m.classes.focussed=o.taFocussedClass),o.taTextEditorClass&&(m.classes.textEditor=o.taTextEditorClass),o.taHtmlEditorClass&&(m.classes.htmlEditor=o.taHtmlEditorClass),o.taDefaultTagAttributes)try{
//	TODO: This should use angular.merge to enhance functionality once angular 1.4 is required
angular.extend(m.defaultTagAttributes,angular.fromJson(o.taDefaultTagAttributes))}catch(a){j.error(a)}
// optional setup functions
o.taTextEditorSetup&&(m.setup.textEditorSetup=m.$parent.$eval(o.taTextEditorSetup)),o.taHtmlEditorSetup&&(m.setup.htmlEditorSetup=m.$parent.$eval(o.taHtmlEditorSetup)),
// optional fileDropHandler function
o.taFileDrop?m.fileDropHandler=m.$parent.$eval(o.taFileDrop):m.fileDropHandler=m.defaultFileDropHandler,w=n[0].innerHTML,
// clear the original content
n[0].innerHTML="",
// Setup the HTML elements as variable references for use later
m.displayElements={
// we still need the hidden input even with a textarea as the textarea may have invalid/old input in it,
// wheras the input will ALLWAYS have the correct value.
forminput:angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),html:angular.element("<textarea></textarea>"),text:angular.element("<div></div>"),
// other toolbased elements
scrollWindow:angular.element("<div class='ta-scroll-window'></div>"),popover:angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),popoverArrow:angular.element('<div class="arrow"></div>'),popoverContainer:angular.element('<div class="popover-content"></div>'),resize:{overlay:angular.element('<div class="ta-resizer-handle-overlay"></div>'),background:angular.element('<div class="ta-resizer-handle-background"></div>'),anchors:[angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')],info:angular.element('<div class="ta-resizer-handle-info"></div>')}},
// Setup the popover
m.displayElements.popover.append(m.displayElements.popoverArrow),m.displayElements.popover.append(m.displayElements.popoverContainer),m.displayElements.scrollWindow.append(m.displayElements.popover),m.displayElements.popover.on("mousedown",function(a,b){/* istanbul ignore else: this is for catching the jqLite testing*/
// this prevents focusout from firing on the editor when clicking anything in the popover
return b&&angular.extend(a,b),a.preventDefault(),!1}),
// define the popover show and hide functions
m.showPopover=function(a){m.displayElements.popover.css("display","block"),m.reflowPopover(a),i.addClass(m.displayElements.popover,"in"),C(h.find("body"),"click keyup",function(){m.hidePopover()})},m.reflowPopover=function(a){/* istanbul ignore if: catches only if near bottom of editor */
m.displayElements.text[0].offsetHeight-51>a[0].offsetTop?(m.displayElements.popover.css("top",a[0].offsetTop+a[0].offsetHeight+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("top").addClass("bottom")):(m.displayElements.popover.css("top",a[0].offsetTop-54+m.displayElements.scrollWindow[0].scrollTop+"px"),m.displayElements.popover.removeClass("bottom").addClass("top"));var b=m.displayElements.text[0].offsetWidth-m.displayElements.popover[0].offsetWidth,c=a[0].offsetLeft+a[0].offsetWidth/2-m.displayElements.popover[0].offsetWidth/2;m.displayElements.popover.css("left",Math.max(0,Math.min(b,c))+"px"),m.displayElements.popoverArrow.css("margin-left",Math.min(c,Math.max(0,c-b))-11+"px")},m.hidePopover=function(){m.displayElements.popover.css("display",""),m.displayElements.popoverContainer.attr("style",""),m.displayElements.popoverContainer.attr("class","popover-content"),m.displayElements.popover.removeClass("in")},
// setup the resize overlay
m.displayElements.resize.overlay.append(m.displayElements.resize.background),angular.forEach(m.displayElements.resize.anchors,function(a){m.displayElements.resize.overlay.append(a)}),m.displayElements.resize.overlay.append(m.displayElements.resize.info),m.displayElements.scrollWindow.append(m.displayElements.resize.overlay),
// define the show and hide events
m.reflowResizeOverlay=function(a){a=angular.element(a)[0],m.displayElements.resize.overlay.css({display:"block",left:a.offsetLeft-5+"px",top:a.offsetTop-5+"px",width:a.offsetWidth+10+"px",height:a.offsetHeight+10+"px"}),m.displayElements.resize.info.text(a.offsetWidth+" x "+a.offsetHeight)},/* istanbul ignore next: pretty sure phantomjs won't test this */
m.showResizeOverlay=function(a){var b=h.find("body");z=function(c){var d={width:parseInt(a.attr("width")),height:parseInt(a.attr("height")),x:c.clientX,y:c.clientY};(void 0===d.width||isNaN(d.width))&&(d.width=a[0].offsetWidth),(void 0===d.height||isNaN(d.height))&&(d.height=a[0].offsetHeight),m.hidePopover();var e=d.height/d.width,f=function(b){function c(a){return Math.round(Math.max(0,a))}
// calculate new size
var f={x:Math.max(0,d.width+(b.clientX-d.x)),y:Math.max(0,d.height+(b.clientY-d.y))},g=void 0!==o.taResizeForceAspectRatio,h=o.taResizeMaintainAspectRatio,i=g||h&&!b.shiftKey;if(i){var j=f.y/f.x;f.x=e>j?f.x:f.y/e,f.y=e>j?f.x*e:f.y}var k=angular.element(a);k.css("height",c(f.y)+"px"),k.css("width",c(f.x)+"px"),
// reflow the popover tooltip
m.reflowResizeOverlay(a)};b.on("mousemove",f),C(b,"mouseup",function(a){a.preventDefault(),a.stopPropagation(),b.off("mousemove",f),
// at this point, we need to force the model to update! since the css has changed!
// this fixes bug: #862 - we now hide the popover -- as this seems more consitent.
// there are still issues under firefox, the window does not repaint. -- not sure
// how best to resolve this, but clicking anywhere works.
m.$apply(function(){m.hidePopover(),m.updateTaBindtaTextElement()},100)}),c.stopPropagation(),c.preventDefault()},m.displayElements.resize.anchors[3].off("mousedown"),m.displayElements.resize.anchors[3].on("mousedown",z),m.reflowResizeOverlay(a),C(b,"click",function(){m.hideResizeOverlay()})},/* istanbul ignore next: pretty sure phantomjs won't test this */
m.hideResizeOverlay=function(){m.displayElements.resize.anchors[3].off("mousedown",z),m.displayElements.resize.overlay.css("display","")},
// allow for insertion of custom directives on the textarea and div
m.setup.htmlEditorSetup(m.displayElements.html),m.setup.textEditorSetup(m.displayElements.text),m.displayElements.html.attr({id:"taHtmlElement"+B,"ng-show":"showHtml","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.text.attr({id:"taTextElement"+B,contentEditable:"true","ta-bind":"ta-bind","ng-model":"html","ng-model-options":n.attr("ng-model-options")}),m.displayElements.scrollWindow.attr({"ng-hide":"showHtml"}),o.taDefaultWrap&&
// taDefaultWrap is only applied to the text and not the html view
m.displayElements.text.attr("ta-default-wrap",o.taDefaultWrap),o.taUnsafeSanitizer&&(m.displayElements.text.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer),m.displayElements.html.attr("ta-unsafe-sanitizer",o.taUnsafeSanitizer)),
// add the main elements to the origional element
m.displayElements.scrollWindow.append(m.displayElements.text),n.append(m.displayElements.scrollWindow),n.append(m.displayElements.html),m.displayElements.forminput.attr("name",m._name),n.append(m.displayElements.forminput),o.tabindex&&(n.removeAttr("tabindex"),m.displayElements.text.attr("tabindex",o.tabindex),m.displayElements.html.attr("tabindex",o.tabindex)),o.placeholder&&(m.displayElements.text.attr("placeholder",o.placeholder),m.displayElements.html.attr("placeholder",o.placeholder)),o.taDisabled&&(m.displayElements.text.attr("ta-readonly","disabled"),m.displayElements.html.attr("ta-readonly","disabled"),m.disabled=m.$parent.$eval(o.taDisabled),m.$parent.$watch(o.taDisabled,function(a){m.disabled=a,m.disabled?n.addClass(m.classes.disabled):n.removeClass(m.classes.disabled)})),o.taPaste&&(m._pasteHandler=function(a){return l(o.taPaste)(m.$parent,{$html:a})},m.displayElements.text.attr("ta-paste","_pasteHandler($html)")),
// compile the scope with the text and html elements only - if we do this with the main element it causes a compile loop
b(m.displayElements.scrollWindow)(m),b(m.displayElements.html)(m),m.updateTaBindtaTextElement=m["updateTaBindtaTextElement"+B],m.updateTaBindtaHtmlElement=m["updateTaBindtaHtmlElement"+B],
// add the classes manually last
n.addClass("ta-root"),m.displayElements.scrollWindow.addClass("ta-text ta-editor "+m.classes.textEditor),m.displayElements.html.addClass("ta-html ta-editor "+m.classes.htmlEditor),
// used in the toolbar actions
m._actionRunning=!1;var D=!1;
// changes to the model variable from outside the html/text inputs
// if no ngModel, then the only input is from inside text-angular
if(m.startAction=function(){var b=!1,c=!1,d=!1,e=!1;
//console.log('B', _beforeStateBold, 'I', _beforeStateItalic, '_', _beforeStateUnderline, 'S', _beforeStateStrikethough);
// if rangy library is loaded return a function to reload the current selection
// rangy.saveSelection() clear the state of bold, italic, underline, strikethrough
// so we reset them here....!!!
// this fixes bugs #423, #1129, #1105, #693 which are actually rangy bugs!
/* istanbul ignore next: this only active when have bold set and it SHOULD not be necessary anyway... */
/* istanbul ignore next: this only active when have italic set and it SHOULD not be necessary anyway... */
/* istanbul ignore next: this only active when have underline set and it SHOULD not be necessary anyway... */
/* istanbul ignore next: this only active when have strikeThrough set and it SHOULD not be necessary anyway... */
return m._actionRunning=!0,b=h[0].queryCommandState("bold"),c=h[0].queryCommandState("italic"),d=h[0].queryCommandState("underline"),e=h[0].queryCommandState("strikeThrough"),D=a.saveSelection(),b&&!h[0].queryCommandState("bold")&&h[0].execCommand("bold",!1,null),c&&!h[0].queryCommandState("italic")&&h[0].execCommand("italic",!1,null),d&&!h[0].queryCommandState("underline")&&h[0].execCommand("underline",!1,null),e&&!h[0].queryCommandState("strikeThrough")&&h[0].execCommand("strikeThrough",!1,null),function(){D&&a.restoreSelection(D)}},m.endAction=function(){m._actionRunning=!1,D&&(m.showHtml?m.displayElements.html[0].focus():m.displayElements.text[0].focus(),
// rangy.restoreSelection(_savedSelection);
a.removeMarkers(D)),D=!1,m.updateSelectedStyles(),
// only update if in text or WYSIWYG mode
m.showHtml||m["updateTaBindtaTextElement"+B]()},
// note that focusout > focusin is called everytime we click a button - except bad support: http://www.quirksmode.org/dom/events/blurfocus.html
// cascades to displayElements.text and displayElements.html automatically.
u=function(a){m.focussed=!0,n.addClass(m.classes.focussed),/*******  NOT FUNCTIONAL YET
					if (e.target.id === 'taTextElement' + _serial) {
						console.log('_focusin taTextElement');
						// we only do this if NOT focussed
						textAngularManager.restoreFocusSelection(scope._name);
					}
*******/
x.focus(),n.triggerHandler("focus"),
// we call editorScope.updateSelectedStyles() here because we want the toolbar to be focussed
// as soon as we have focus.  Otherwise this only happens on mousedown or keydown etc...
/* istanbul ignore else: don't run if already running */
m.updateSelectedStyles&&!m._bUpdateSelectedStyles&&
// we don't set editorScope._bUpdateSelectedStyles here, because we do not want the
// updateSelectedStyles() to run twice which it will do after 200 msec if we have
// set editorScope._bUpdateSelectedStyles
//
// WOW, normally I would do a scope.$apply here, but this causes ERRORs when doing tests!
c(function(){m.updateSelectedStyles()},0)},m.displayElements.html.on("focus",u),m.displayElements.text.on("focus",u),v=function(a){/****************** NOT FUNCTIONAL YET
					try {
						var _s = rangy.getSelection();
						if (_s) {
							// we save the selection when we loose focus so that if do a wrapSelection, the
							// apropriate selection in the editor is restored before action.
							var _savedFocusRange = rangy.saveRange(_s.getRangeAt(0));
							textAngularManager.saveFocusSelection(scope._name, _savedFocusRange);
						}
					} catch(error) { }
					*****************/
// if we are NOT runnig an action and have NOT focussed again on the text etc then fire the blur events
// to prevent multiple apply error defer to next seems to work.
return m._actionRunning||h[0].activeElement===m.displayElements.html[0]||h[0].activeElement===m.displayElements.text[0]||(n.removeClass(m.classes.focussed),x.unfocus(),c(function(){m._bUpdateSelectedStyles=!1,n.triggerHandler("blur"),m.focussed=!1},0)),a.preventDefault(),!1},m.displayElements.html.on("blur",v),m.displayElements.text.on("blur",v),m.displayElements.text.on("paste",function(a){n.triggerHandler("paste",a)}),
// Setup the default toolbar tools, this way allows the user to add new tools like plugins.
// This is on the editor for future proofing if we find a better way to do this.
m.queryFormatBlockState=function(a){
// $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
return!m.showHtml&&a.toLowerCase()===h[0].queryCommandValue("formatBlock").toLowerCase()},m.queryCommandState=function(a){
// $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
return m.showHtml?"":h[0].queryCommandState(a)},m.switchView=function(){m.showHtml=!m.showHtml,i.enabled(!1,m.displayElements.html),i.enabled(!1,m.displayElements.text),
//Show the HTML view
/* istanbul ignore next: ngModel exists check */
/* THIS is not the correct thing to do, here....
   The ngModel is correct, but it is not formatted as the user as done it...
					var _model;
					if (ngModel) {
						_model = ngModel.$viewValue;
					} else {
						_model = scope.html;
					}
					var _html = scope.displayElements.html[0].value;
					if (getDomFromHtml(_html).childElementCount !== getDomFromHtml(_model).childElementCount) {
						// the model and the html do not agree
						// they can get out of sync and when they do, we correct that here...
						scope.displayElements.html.val(_model);
					}
*/
m.showHtml?
//defer until the element is visible
c(function(){
// [0] dereferences the DOM object from the angular.element
return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.html[0].focus()},100):
//Show the WYSIWYG view
//defer until the element is visible
c(function(){
// [0] dereferences the DOM object from the angular.element
return i.enabled(!0,m.displayElements.html),i.enabled(!0,m.displayElements.text),m.displayElements.text[0].focus()},100)},o.ngModel){var E=!0;p.$render=function(){if(E){
// we need this firstRun to set the originalContents otherwise it gets overrided by the setting of ngModel to undefined from NaN
E=!1;
// if view value is null or undefined initially and there was original content, set to the original content
var a=m.$parent.$eval(o.ngModel);void 0!==a&&null!==a||!w||""===w||
// on passing through to taBind it will be sanitised
p.$setViewValue(w)}m.displayElements.forminput.val(p.$viewValue),
// if the editors aren't focused they need to be updated, otherwise they are doing the updating
m.html=p.$viewValue||""},
// trigger the validation calls
n.attr("required")&&(p.$validators.required=function(a,b){var c=a||b;return!(!c||""===c.trim())})}else
// if no ngModel then update from the contents of the origional html.
m.displayElements.forminput.val(w),m.html=w;if(
// changes from taBind back up to here
m.$watch("html",function(a,b){a!==b&&(o.ngModel&&p.$viewValue!==a&&p.$setViewValue(a),m.displayElements.forminput.val(a))}),o.taTargetToolbars)x=g.registerEditor(m._name,m,o.taTargetToolbars.split(","));else{var F=angular.element('<div text-angular-toolbar name="textAngularToolbar'+B+'">');
// passthrough init of toolbar options
o.taToolbar&&F.attr("ta-toolbar",o.taToolbar),o.taToolbarClass&&F.attr("ta-toolbar-class",o.taToolbarClass),o.taToolbarGroupClass&&F.attr("ta-toolbar-group-class",o.taToolbarGroupClass),o.taToolbarButtonClass&&F.attr("ta-toolbar-button-class",o.taToolbarButtonClass),o.taToolbarActiveButtonClass&&F.attr("ta-toolbar-active-button-class",o.taToolbarActiveButtonClass),o.taFocussedClass&&F.attr("ta-focussed-class",o.taFocussedClass),n.prepend(F),b(F)(m.$parent),x=g.registerEditor(m._name,m,["textAngularToolbar"+B])}m.$on("$destroy",function(){g.unregisterEditor(m._name),angular.element(window).off("blur")}),
// catch element select event and pass to toolbar tools
m.$on("ta-element-select",function(a,b){x.triggerElementSelect(a,b)&&m["reApplyOnSelectorHandlerstaTextElement"+B]()}),m.$on("ta-drop-event",function(a,b,d,e){m.displayElements.text[0].focus(),e&&e.files&&e.files.length>0?(angular.forEach(e.files,function(a){
// taking advantage of boolean execution, if the fileDropHandler returns true, nothing else after it is executed
// If it is false then execute the defaultFileDropHandler if the fileDropHandler is NOT the default one
// Once one of these has been executed wrap the result as a promise, if undefined or variable update the taBind, else we should wait for the promise
try{k.when(m.fileDropHandler(a,m.wrapSelection)||m.fileDropHandler!==m.defaultFileDropHandler&&k.when(m.defaultFileDropHandler(a,m.wrapSelection))).then(function(){m["updateTaBindtaTextElement"+B]()})}catch(a){j.error(a)}}),d.preventDefault(),d.stopPropagation()):c(function(){m["updateTaBindtaTextElement"+B]()},0)}),
// the following is for applying the active states to the tools that support it
m._bUpdateSelectedStyles=!1,/* istanbul ignore next: browser window/tab leave check */
angular.element(window).on("blur",function(){m._bUpdateSelectedStyles=!1,m.focussed=!1}),
// loop through all the tools polling their activeState function if it exists
m.updateSelectedStyles=function(){var a;/* istanbul ignore next: This check is to ensure multiple timeouts don't exist */
A&&c.cancel(A),
// test if the common element ISN'T the root ta-text node
void 0!==(a=e.getSelectionElement())&&a.parentNode!==m.displayElements.text[0]?x.updateSelectedStyles(angular.element(a)):x.updateSelectedStyles(),
// used to update the active state when a key is held down, ie the left arrow
/* istanbul ignore else: browser only check */
m._bUpdateSelectedStyles&&(A=c(m.updateSelectedStyles,200))},
// start updating on keydown
q=function(){/* istanbul ignore next: ie catch */
/* istanbul ignore next: ie catch */
/* istanbul ignore else: don't run if already running */
return m.focussed?void(m._bUpdateSelectedStyles||(m._bUpdateSelectedStyles=!0,m.$apply(function(){m.updateSelectedStyles()}))):void(m._bUpdateSelectedStyles=!1)},m.displayElements.html.on("keydown",q),m.displayElements.text.on("keydown",q),
// stop updating on key up and update the display/model
r=function(){m._bUpdateSelectedStyles=!1},m.displayElements.html.on("keyup",r),m.displayElements.text.on("keyup",r),
// stop updating on key up and update the display/model
s=function(a,b){
// bug fix for Firefox.  If we are selecting a <a> already, any characters will
// be added within the <a> which is bad!
/* istanbul ignore next: don't see how to test this... */
if(e.getSelection){var c=e.getSelection();"a"===e.getSelectionElement().nodeName.toLowerCase()&&(
// check and see if we are at the edge of the <a>
3===c.start.element.nodeType&&c.start.element.textContent.length===c.end.offset&&
// we are at the end of the <a>!!!
// so move the selection to after the <a>!!
e.setSelectionAfterElement(e.getSelectionElement()),3===c.start.element.nodeType&&0===c.start.offset&&
// we are at the start of the <a>!!!
// so move the selection before the <a>!!
e.setSelectionBeforeElement(e.getSelectionElement()))}/* istanbul ignore else: this is for catching the jqLite testing*/
b&&angular.extend(a,b),m.$apply(function(){if(x.sendKeyCommand(a))/* istanbul ignore else: don't run if already running */
return m._bUpdateSelectedStyles||m.updateSelectedStyles(),a.preventDefault(),!1})},m.displayElements.html.on("keypress",s),m.displayElements.text.on("keypress",s),
// update the toolbar active states when we click somewhere in the text/html boxed
t=function(){
// ensure only one execution of updateSelectedStyles()
m._bUpdateSelectedStyles=!1,m.$apply(function(){m.updateSelectedStyles()})},m.displayElements.html.on("mouseup",t),m.displayElements.text.on("mouseup",t)}}}]),u.service("textAngularManager",["taToolExecuteAction","taTools","taRegisterTool","$interval","$rootScope","$log",function(a,b,c,d,e,g){
// this service is used to manage all textAngular editors and toolbars.
// All publicly published functions that modify/need to access the toolbar or editor scopes should be in here
// these contain references to all the editors and toolbars that have been initialised in this app
var h,i={},j={},k=0,l=function(a){angular.forEach(j,function(b){b.editorFunctions.updateSelectedStyles(a)})},m=50,n=function(){k=Date.now(),/* istanbul ignore next: setup a one time updateStyles() */
h=d(function(){l(),h=void 0},m,1)};/* istanbul ignore next: make sure clean up on destroy */
e.$on("destroy",function(){h&&(d.cancel(h),h=void 0)});var o=function(){Math.abs(Date.now()-k)>m&&
// we have already triggered the updateStyles a long time back... so setup it again...
n()};
// when we focus into a toolbar, we need to set the TOOLBAR's $parent to be the toolbars it's linked to.
// We also need to set the tools to be updated to be the toolbars...
return{
// register an editor and the toolbars that it is affected by
registerEditor:function(c,d,e){
// NOTE: name === editorScope._name
// targetToolbars is an [] of 'toolbar name's
// targetToolbars are optional, we don't require a toolbar to function
if(!c||""===c)throw"textAngular Error: An editor requires a name";if(!d)throw"textAngular Error: An editor requires a scope";if(j[c])throw'textAngular Error: An Editor with name "'+c+'" already exists';return j[c]={scope:d,toolbars:e,
// toolbarScopes used by this editor
toolbarScopes:[],_registerToolbarScope:function(a){
// add to the list late
this.toolbars.indexOf(a.name)>=0&&
// if this toolbarScope is being used by this editor we add it as one of the scopes
this.toolbarScopes.push(a)},
// this is a suite of functions the editor should use to update all it's linked toolbars
editorFunctions:{disable:function(){
// disable all linked toolbars
angular.forEach(j[c].toolbarScopes,function(a){a.disabled=!0})},enable:function(){
// enable all linked toolbars
angular.forEach(j[c].toolbarScopes,function(a){a.disabled=!1})},focus:function(){
// this should be called when the editor is focussed
angular.forEach(j[c].toolbarScopes,function(a){a._parent=d,a.disabled=!1,a.focussed=!0}),d.focussed=!0},unfocus:function(){
// this should be called when the editor becomes unfocussed
angular.forEach(j[c].toolbarScopes,function(a){a.disabled=!0,a.focussed=!1}),d.focussed=!1},updateSelectedStyles:function(a){
// update the active state of all buttons on liked toolbars
angular.forEach(j[c].toolbarScopes,function(b){angular.forEach(b.tools,function(c){c.activeState&&(b._parent=d,
// selectedElement may be undefined if nothing selected
c.active=c.activeState(a))})})},sendKeyCommand:function(e){
// we return true if we applied an action, false otherwise
var f=!1;return(e.ctrlKey||e.metaKey||e.specialKey)&&angular.forEach(b,function(b,g){if(b.commandKeyCode&&(b.commandKeyCode===e.which||b.commandKeyCode===e.specialKey))for(var h=0;h<j[c].toolbarScopes.length;h++)if(void 0!==j[c].toolbarScopes[h].tools[g]){a.call(j[c].toolbarScopes[h].tools[g],d),f=!0;break}}),f},triggerElementSelect:function(a,e){
// search through the taTools to see if a match for the tag is made.
// if there is, see if the tool is on a registered toolbar and not disabled.
// NOTE: This can trigger on MULTIPLE tools simultaneously.
var f=function(a,b){for(var c=!0,d=0;d<b.length;d++)c=c&&a.attr(b[d]);return c},g=[],h={},i=!1;e=angular.element(e);
// get all valid tools by element name, keep track if one matches the
var k=!1;
// Run the actions on the first visible filtered tool only
if(angular.forEach(b,function(a,b){a.onElementSelect&&a.onElementSelect.element&&a.onElementSelect.element.toLowerCase()===e[0].tagName.toLowerCase()&&(!a.onElementSelect.filter||a.onElementSelect.filter(e))&&(
// this should only end up true if the element matches the only attributes
k=k||angular.isArray(a.onElementSelect.onlyWithAttrs)&&f(e,a.onElementSelect.onlyWithAttrs),a.onElementSelect.onlyWithAttrs&&!f(e,a.onElementSelect.onlyWithAttrs)||(h[b]=a))}),
// if we matched attributes to filter on, then filter, else continue
k?(angular.forEach(h,function(a,b){a.onElementSelect.onlyWithAttrs&&f(e,a.onElementSelect.onlyWithAttrs)&&g.push({name:b,tool:a})}),
// sort most specific (most attrs to find) first
g.sort(function(a,b){return b.tool.onElementSelect.onlyWithAttrs.length-a.tool.onElementSelect.onlyWithAttrs.length})):angular.forEach(h,function(a,b){g.push({name:b,tool:a})}),g.length>0)for(var l=0;l<g.length;l++){for(var m=g[l].tool,n=g[l].name,o=0;o<j[c].toolbarScopes.length;o++)if(void 0!==j[c].toolbarScopes[o].tools[n]){m.onElementSelect.action.call(j[c].toolbarScopes[o].tools[n],a,e,d),i=!0;break}if(i)break}return i}}},angular.forEach(e,function(a){i[a]&&j[c].toolbarScopes.push(i[a])}),o(),j[c].editorFunctions},
// retrieve editor by name, largely used by testing suites only
retrieveEditor:function(a){return j[a]},unregisterEditor:function(a){delete j[a],o()},
// registers a toolbar such that it can be linked to editors
registerToolbar:function(a){if(!a)throw"textAngular Error: A toolbar requires a scope";if(!a.name||""===a.name)throw"textAngular Error: A toolbar requires a name";if(i[a.name])throw'textAngular Error: A toolbar with name "'+a.name+'" already exists';i[a.name]=a,
// walk all the editors and connect this toolbarScope to the editors.... if we need to.  This way, it does
// not matter if we register the editors after the toolbars or not
// Note the editor will ignore this toolbarScope if it is not connected to it...
angular.forEach(j,function(b){b._registerToolbarScope(a)}),o()},
// retrieve toolbar by name, largely used by testing suites only
retrieveToolbar:function(a){return i[a]},
// retrieve toolbars by editor name, largely used by testing suites only
retrieveToolbarsViaEditor:function(a){var b=[],c=this;return angular.forEach(this.retrieveEditor(a).toolbars,function(a){b.push(c.retrieveToolbar(a))}),b},unregisterToolbar:function(a){delete i[a],o()},
// functions for updating the toolbar buttons display
updateToolsDisplay:function(a){
// pass a partial struct of the taTools, this allows us to update the tools on the fly, will not change the defaults.
var b=this;angular.forEach(a,function(a,c){b.updateToolDisplay(c,a)})},
// this function resets all toolbars to their default tool definitions
resetToolsDisplay:function(){var a=this;angular.forEach(b,function(b,c){a.resetToolDisplay(c)}),o()},
// update a tool on all toolbars
updateToolDisplay:function(a,b){var c=this;angular.forEach(i,function(d,e){c.updateToolbarToolDisplay(e,a,b)}),o()},
// resets a tool to the default/starting state on all toolbars
resetToolDisplay:function(a){var b=this;angular.forEach(i,function(c,d){b.resetToolbarToolDisplay(d,a)}),o()},
// update a tool on a specific toolbar
updateToolbarToolDisplay:function(a,b,c){if(!i[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';i[a].updateToolDisplay(b,c)},
// reset a tool on a specific toolbar to it's default starting value
resetToolbarToolDisplay:function(a,c){if(!i[a])throw'textAngular Error: No Toolbar with name "'+a+'" exists';i[a].updateToolDisplay(c,b[c],!0)},
// removes a tool from all toolbars and it's definition
removeTool:function(a){delete b[a],angular.forEach(i,function(b){delete b.tools[a];for(var c=0;c<b.toolbar.length;c++){for(var d,e=0;e<b.toolbar[c].length;e++){if(b.toolbar[c][e]===a){d={group:c,index:e};break}if(void 0!==d)break}void 0!==d&&(b.toolbar[d.group].slice(d.index,1),b._$element.children().eq(d.group).children().eq(d.index).remove())}}),o()},
// toolkey, toolDefinition are required. If group is not specified will pick the last group, if index isnt defined will append to group
addTool:function(a,b,d,e){c(a,b),angular.forEach(i,function(c){c.addTool(a,b,d,e)}),o()},
// adds a Tool but only to one toolbar not all
addToolToToolbar:function(a,b,d,e,f){c(a,b),i[d].addTool(a,b,e,f),o()},
// this is used when externally the html of an editor has been changed and textAngular needs to be notified to update the model.
// this will call a $digest if not already happening
refreshEditor:function(a){if(!j[a])throw'textAngular Error: No Editor with name "'+a+'" exists';j[a].scope.updateTaBindtaTextElement(),/* istanbul ignore else: phase catch */
j[a].scope.$$phase||j[a].scope.$digest(),o()},
// this is used by taBind to send a key command in response to a special key event
sendKeyCommand:function(a,b){var c=j[a._name];/* istanbul ignore else: if nothing to do, do nothing */
if(c&&c.editorFunctions.sendKeyCommand(b))/* istanbul ignore else: don't run if already running */
return a._bUpdateSelectedStyles||a.updateSelectedStyles(),b.preventDefault(),!1},
//
// When a toolbar and tools are created, it isn't until there is a key event or mouse event
// that the updateSelectedStyles() is called behind the scenes.
// This function forces an update through the existing editors to help the application make sure
// the inital state is correct.
//
updateStyles:l,
// return the current version of textAngular in use to the user
getVersion:function(){return f},
// for testing
getToolbarScopes:function(){var a=[];return angular.forEach(j,function(b){a=a.concat(b.toolbarScopes)}),a}}}]),u.directive("textAngularToolbar",["$compile","textAngularManager","taOptions","taTools","taToolExecuteAction","$window",function(a,b,c,d,e,f){return{scope:{name:"@"},restrict:"EA",link:function(g,h,i){if(!g.name||""===g.name)throw"textAngular Error: A toolbar requires a name";angular.extend(g,angular.copy(c)),i.taToolbar&&(g.toolbar=g.$parent.$eval(i.taToolbar)),i.taToolbarClass&&(g.classes.toolbar=i.taToolbarClass),i.taToolbarGroupClass&&(g.classes.toolbarGroup=i.taToolbarGroupClass),i.taToolbarButtonClass&&(g.classes.toolbarButton=i.taToolbarButtonClass),i.taToolbarActiveButtonClass&&(g.classes.toolbarButtonActive=i.taToolbarActiveButtonClass),i.taFocussedClass&&(g.classes.focussed=i.taFocussedClass),g.disabled=!0,g.focussed=!1,g._$element=h,h[0].innerHTML="",h.addClass("ta-toolbar "+g.classes.toolbar),g.$watch("focussed",function(){g.focussed?h.addClass(g.classes.focussed):h.removeClass(g.classes.focussed)});var j=function(b,c){var d;if(d=b&&b.display?angular.element(b.display):angular.element("<button type='button'>"),b&&b.class?d.addClass(b.class):d.addClass(g.classes.toolbarButton),d.attr("name",c.name),
// important to not take focus from the main text/html entry
d.attr("ta-button","ta-button"),d.attr("ng-disabled","isDisabled()"),d.attr("tabindex","-1"),d.attr("ng-click","executeAction()"),d.attr("ng-class","displayActiveToolClass(active)"),b&&b.tooltiptext&&d.attr("title",b.tooltiptext),b&&!b.display&&!c._display&&(
// first clear out the current contents if any
d[0].innerHTML="",
// add the buttonText
b.buttontext&&(d[0].innerHTML=b.buttontext),b.iconclass)){var e=angular.element("<i>"),f=d[0].innerHTML;e.addClass(b.iconclass),d[0].innerHTML="",d.append(e),f&&""!==f&&d.append("&nbsp;"+f)}return c._lastToolDefinition=angular.copy(b),a(d)(c)};
// Keep a reference for updating the active states later
g.tools={},
// create the tools in the toolbar
// default functions and values to prevent errors in testing and on init
g._parent={disabled:!0,showHtml:!1,queryFormatBlockState:function(){return!1},queryCommandState:function(){return!1}};var k={$window:f,$editor:function(){
// dynamically gets the editor as it is set
return g._parent},isDisabled:function(){
// view selection button is always enabled since it doesn not depend on a selction!
// view selection button is always enabled since it doesn not depend on a selction!
// this bracket is important as without it it just returns the first bracket and ignores the rest
// when the button's disabled function/value evaluates to true
// all buttons except the HTML Switch button should be disabled in the showHtml (RAW html) mode
// if the toolbar is disabled
// if the current editor is disabled
return("html"!==this.name||!g._parent.startAction)&&("function"!=typeof this.$eval("disabled")&&this.$eval("disabled")||this.$eval("disabled()")||"html"!==this.name&&this.$editor().showHtml||this.$parent.disabled||this.$editor().disabled)},displayActiveToolClass:function(a){return a?g.classes.toolbarButtonActive:""},executeAction:e};angular.forEach(g.toolbar,function(a){
// setup the toolbar group
var b=angular.element("<div>");b.addClass(g.classes.toolbarGroup),angular.forEach(a,function(a){
// init and add the tools to the group
// a tool name (key name from taTools struct)
//creates a child scope of the main angularText scope and then extends the childScope with the functions of this particular tool
// reference to the scope and element kept
g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]),
// append the tool compiled with the childScope to the group element
b.append(g.tools[a].$element)}),
// append the group to the toolbar
h.append(b)}),
// update a tool
// if a value is set to null, remove from the display
// when forceNew is set to true it will ignore all previous settings, used to reset to taTools definition
// to reset to defaults pass in taTools[key] as _newTool and forceNew as true, ie `updateToolDisplay(key, taTools[key], true);`
g.updateToolDisplay=function(a,b,c){var d=g.tools[a];if(d){if(
// get the last toolDefinition, then override with the new definition
d._lastToolDefinition&&!c&&(b=angular.extend({},d._lastToolDefinition,b)),null===b.buttontext&&null===b.iconclass&&null===b.display)throw'textAngular Error: Tool Definition for updating "'+a+'" does not have a valid display/iconclass/buttontext value';
// if tool is defined on this toolbar, update/redo the tool
null===b.buttontext&&delete b.buttontext,null===b.iconclass&&delete b.iconclass,null===b.display&&delete b.display;var e=j(b,d);d.$element.replaceWith(e),d.$element=e}},
// we assume here that all values passed are valid and correct
g.addTool=function(a,b,c,e){g.tools[a]=angular.extend(g.$new(!0),d[a],k,{name:a}),g.tools[a].$element=j(d[a],g.tools[a]);var f;void 0===c&&(c=g.toolbar.length-1),f=angular.element(h.children()[c]),void 0===e?(f.append(g.tools[a].$element),g.toolbar[c][g.toolbar[c].length-1]=a):(f.children().eq(e).after(g.tools[a].$element),g.toolbar[c][e]=a)},b.registerToolbar(g),g.$on("$destroy",function(){b.unregisterToolbar(g.name)})}}}]),u.directive("textAngularVersion",["textAngularManager",function(a){var b=a.getVersion();return{restrict:"EA",link:function(a,c,d){c.html(b)}}}]),u.name});