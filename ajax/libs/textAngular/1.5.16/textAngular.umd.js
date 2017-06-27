(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('textAngular', ["rangy","rangy/lib/rangy-selectionsaverestore"], function (a0,b1) {
      return (root['textAngular.name'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("rangy"),require("rangy/lib/rangy-selectionsaverestore"));
  } else {
    root['textAngular'] = factory(rangy);
  }
}(this, function (rangy) {


// tests against the current jqLite/jquery implementation if this can be an element
function validElementString(string){
    try{
        return angular.element(string).length !== 0;
    }catch(any){
        return false;
    }
}
// setup the global contstant functions for setting up the toolbar

// all tool definitions
var taTools = {};
/*
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
function registerTextAngularTool(name, toolDefinition){
    if(!name || name === '' || taTools.hasOwnProperty(name)) throw('textAngular Error: A unique name is required for a Tool Definition');
    if(
        (toolDefinition.display && (toolDefinition.display === '' || !validElementString(toolDefinition.display))) ||
        (!toolDefinition.display && !toolDefinition.buttontext && !toolDefinition.iconclass)
    )
        throw('textAngular Error: Tool Definition for "' + name + '" does not have a valid display/iconclass/buttontext value');
    taTools[name] = toolDefinition;
}

angular.module('textAngularSetup', [])
.constant('taRegisterTool', registerTextAngularTool)
.value('taTools', taTools)
// Here we set up the global display defaults, to set your own use a angular $provider#decorator.
.value('taOptions',  {
    //////////////////////////////////////////////////////////////////////////////////////
    // forceTextAngularSanitize
    // set false to allow the textAngular-sanitize provider to be replaced
    // with angular-sanitize or a custom provider.
    forceTextAngularSanitize: true,
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
    keyMappings : [],
    toolbar: [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote'],
        ['bold', 'italics', 'underline', 'strikeThrough', 'ul', 'ol', 'redo', 'undo', 'clear'],
        ['justifyLeft','justifyCenter','justifyRight','justifyFull','indent','outdent'],
        ['html', 'insertImage', 'insertLink', 'insertVideo', 'wordcount', 'charcount']
    ],
    classes: {
        focussed: "focussed",
        toolbar: "btn-toolbar",
        toolbarGroup: "btn-group",
        toolbarButton: "btn btn-default",
        toolbarButtonActive: "active",
        disabled: "disabled",
        textEditor: 'form-control',
        htmlEditor: 'form-control'
    },
    defaultTagAttributes : {
        a: {target:""}
    },
    setup: {
        // wysiwyg mode
        textEditorSetup: function($element){ /* Do some processing here */ },
        // raw html
        htmlEditorSetup: function($element){ /* Do some processing here */ }
    },
    defaultFileDropHandler:
        /* istanbul ignore next: untestable image processing */
        function(file, insertAction){
            var reader = new FileReader();
            if(file.type.substring(0, 5) === 'image'){
                reader.onload = function() {
                    if(reader.result !== '') insertAction('insertImage', reader.result, true);
                };

                reader.readAsDataURL(file);
                // NOTE: For async procedures return a promise and resolve it when the editor should update the model.
                return true;
            }
            return false;
        }
})

// This is the element selector string that is used to catch click events within a taBind, prevents the default and $emits a 'ta-element-select' event
// these are individually used in an angular.element().find() call. What can go here depends on whether you have full jQuery loaded or just jQLite with angularjs.
// div is only used as div.ta-insert-video caught in filter.
.value('taSelectableElements', ['a','img'])

// This is an array of objects with the following options:
//				selector: <string> a jqLite or jQuery selector string
//				customAttribute: <string> an attribute to search for
//				renderLogic: <function(element)>
// Both or one of selector and customAttribute must be defined.
.value('taCustomRenderers', [
    {
        // Parse back out: '<div class="ta-insert-video" ta-insert-video src="' + urlLink + '" allowfullscreen="true" width="300" frameborder="0" height="250"></div>'
        // To correct video element. For now only support youtube
        selector: 'img',
        customAttribute: 'ta-insert-video',
        renderLogic: function(element){
            var iframe = angular.element('<iframe></iframe>');
            var attributes = element.prop("attributes");
            // loop through element attributes and apply them on iframe
            angular.forEach(attributes, function(attr) {
                iframe.attr(attr.name, attr.value);
            });
            iframe.attr('src', iframe.attr('ta-insert-video'));
            element.replaceWith(iframe);
        }
    }
])

.value('taTranslations', {
    // moved to sub-elements
    //toggleHTML: "Toggle HTML",
    //insertImage: "Please enter a image URL to insert",
    //insertLink: "Please enter a URL to insert",
    //insertVideo: "Please enter a youtube URL to embed",
    html: {
        tooltip: 'Toggle html / Rich Text'
    },
    // tooltip for heading - might be worth splitting
    heading: {
        tooltip: 'Heading '
    },
    p: {
        tooltip: 'Paragraph'
    },
    pre: {
        tooltip: 'Preformatted text'
    },
    ul: {
        tooltip: 'Unordered List'
    },
    ol: {
        tooltip: 'Ordered List'
    },
    quote: {
        tooltip: 'Quote/unquote selection or paragraph'
    },
    undo: {
        tooltip: 'Undo'
    },
    redo: {
        tooltip: 'Redo'
    },
    bold: {
        tooltip: 'Bold'
    },
    italic: {
        tooltip: 'Italic'
    },
    underline: {
        tooltip: 'Underline'
    },
    strikeThrough:{
        tooltip: 'Strikethrough'
    },
    justifyLeft: {
        tooltip: 'Align text left'
    },
    justifyRight: {
        tooltip: 'Align text right'
    },
    justifyFull: {
        tooltip: 'Justify text'
    },
    justifyCenter: {
        tooltip: 'Center'
    },
    indent: {
        tooltip: 'Increase indent'
    },
    outdent: {
        tooltip: 'Decrease indent'
    },
    clear: {
        tooltip: 'Clear formatting'
    },
    insertImage: {
        dialogPrompt: 'Please enter an image URL to insert',
        tooltip: 'Insert image',
        hotkey: 'the - possibly language dependent hotkey ... for some future implementation'
    },
    insertVideo: {
        tooltip: 'Insert video',
        dialogPrompt: 'Please enter a youtube URL to embed'
    },
    insertLink: {
        tooltip: 'Insert / edit link',
        dialogPrompt: "Please enter a URL to insert"
    },
    editLink: {
        reLinkButton: {
            tooltip: "Relink"
        },
        unLinkButton: {
            tooltip: "Unlink"
        },
        targetToggle: {
            buttontext: "Open in New Window"
        }
    },
    wordcount: {
        tooltip: 'Display words Count'
    },
        charcount: {
        tooltip: 'Display characters Count'
    }
})
.factory('taToolFunctions', ['$window','taTranslations', function($window, taTranslations) {
    return {
        imgOnSelectAction: function(event, $element, editorScope){
            // setup the editor toolbar
            // Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic/display
            var finishEdit = function(){
                editorScope.updateTaBindtaTextElement();
                editorScope.hidePopover();
            };
            event.preventDefault();
            editorScope.displayElements.popover.css('width', '375px');
            var container = editorScope.displayElements.popoverContainer;
            container.empty();
            var buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
            var fullButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">100% </button>');
            fullButton.on('click', function(event){
                event.preventDefault();
                $element.css({
                    'width': '100%',
                    'height': ''
                });
                finishEdit();
            });
            var halfButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">50% </button>');
            halfButton.on('click', function(event){
                event.preventDefault();
                $element.css({
                    'width': '50%',
                    'height': ''
                });
                finishEdit();
            });
            var quartButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">25% </button>');
            quartButton.on('click', function(event){
                event.preventDefault();
                $element.css({
                    'width': '25%',
                    'height': ''
                });
                finishEdit();
            });
            var resetButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1">Reset</button>');
            resetButton.on('click', function(event){
                event.preventDefault();
                $element.css({
                    width: '',
                    height: ''
                });
                finishEdit();
            });
            buttonGroup.append(fullButton);
            buttonGroup.append(halfButton);
            buttonGroup.append(quartButton);
            buttonGroup.append(resetButton);
            container.append(buttonGroup);

            buttonGroup = angular.element('<div class="btn-group" style="padding-right: 6px;">');
            var floatLeft = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-left"></i></button>');
            floatLeft.on('click', function(event){
                event.preventDefault();
                // webkit
                $element.css('float', 'left');
                // firefox
                $element.css('cssFloat', 'left');
                // IE < 8
                $element.css('styleFloat', 'left');
                finishEdit();
            });
            var floatRight = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-right"></i></button>');
            floatRight.on('click', function(event){
                event.preventDefault();
                // webkit
                $element.css('float', 'right');
                // firefox
                $element.css('cssFloat', 'right');
                // IE < 8
                $element.css('styleFloat', 'right');
                finishEdit();
            });
            var floatNone = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-align-justify"></i></button>');
            floatNone.on('click', function(event){
                event.preventDefault();
                // webkit
                $element.css('float', '');
                // firefox
                $element.css('cssFloat', '');
                // IE < 8
                $element.css('styleFloat', '');
                finishEdit();
            });
            buttonGroup.append(floatLeft);
            buttonGroup.append(floatNone);
            buttonGroup.append(floatRight);
            container.append(buttonGroup);

            buttonGroup = angular.element('<div class="btn-group">');
            var remove = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" unselectable="on" tabindex="-1"><i class="fa fa-trash-o"></i></button>');
            remove.on('click', function(event){
                event.preventDefault();
                $element.remove();
                finishEdit();
            });
            buttonGroup.append(remove);
            container.append(buttonGroup);

            editorScope.showPopover($element);
            editorScope.showResizeOverlay($element);
        },
        aOnSelectAction: function(event, $element, editorScope){
            // setup the editor toolbar
            // Credit to the work at http://hackerwins.github.io/summernote/ for this editbar logic
            event.preventDefault();
            editorScope.displayElements.popover.css('width', '436px');
            var container = editorScope.displayElements.popoverContainer;
            container.empty();
            container.css('line-height', '28px');
            var link = angular.element('<a href="' + $element.attr('href') + '" target="_blank">' + $element.attr('href') + '</a>');
            link.css({
                'display': 'inline-block',
                'max-width': '200px',
                'overflow': 'hidden',
                'text-overflow': 'ellipsis',
                'white-space': 'nowrap',
                'vertical-align': 'middle'
            });
            container.append(link);
            var buttonGroup = angular.element('<div class="btn-group pull-right">');
            var reLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.reLinkButton.tooltip + '"><i class="fa fa-edit icon-edit"></i></button>');
            reLinkButton.on('click', function(event){
                event.preventDefault();
                var urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, $element.attr('href'));
                if(urlLink && urlLink !== '' && urlLink !== 'http://'){
                    $element.attr('href', urlLink);
                    editorScope.updateTaBindtaTextElement();
                }
                editorScope.hidePopover();
            });
            buttonGroup.append(reLinkButton);
            var unLinkButton = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on" title="' + taTranslations.editLink.unLinkButton.tooltip + '"><i class="fa fa-unlink icon-unlink"></i></button>');
            // directly before this click event is fired a digest is fired off whereby the reference to $element is orphaned off
            unLinkButton.on('click', function(event){
                event.preventDefault();
                $element.replaceWith($element.contents());
                editorScope.updateTaBindtaTextElement();
                editorScope.hidePopover();
            });
            buttonGroup.append(unLinkButton);
            var targetToggle = angular.element('<button type="button" class="btn btn-default btn-sm btn-small" tabindex="-1" unselectable="on">' + taTranslations.editLink.targetToggle.buttontext + '</button>');
            if($element.attr('target') === '_blank'){
                targetToggle.addClass('active');
            }
            targetToggle.on('click', function(event){
                event.preventDefault();
                $element.attr('target', ($element.attr('target') === '_blank') ? '' : '_blank');
                targetToggle.toggleClass('active');
                editorScope.updateTaBindtaTextElement();
            });
            buttonGroup.append(targetToggle);
            container.append(buttonGroup);
            editorScope.showPopover($element);
        },
        extractYoutubeVideoId: function(url) {
            var re = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/i;
            var match = url.match(re);
            return (match && match[1]) || null;
        }
    };
}])
.run(['taRegisterTool', '$window', 'taTranslations', 'taSelection', 'taToolFunctions', '$sanitize', 'taOptions', '$log',
    function(taRegisterTool, $window, taTranslations, taSelection, taToolFunctions, $sanitize, taOptions, $log){
    // test for the version of $sanitize that is in use
    // You can disable this check by setting taOptions.textAngularSanitize == false
    var gv = {}; $sanitize('', gv);
    /* istanbul ignore next, throws error */
    if ((taOptions.forceTextAngularSanitize===true) && (gv.version !== 'taSanitize')) {
        throw angular.$$minErr('textAngular')("textAngularSetup", "The textAngular-sanitize provider has been replaced by another -- have you included angular-sanitize by mistake?");
    }
    taRegisterTool("html", {
        iconclass: 'fa fa-code',
        tooltiptext: taTranslations.html.tooltip,
        action: function(){
            this.$editor().switchView();
        },
        activeState: function(){
            return this.$editor().showHtml;
        }
    });
    // add the Header tools
    // convenience functions so that the loop works correctly
    var _retActiveStateFunction = function(q){
        return function(){ return this.$editor().queryFormatBlockState(q); };
    };
    var headerAction = function(){
        return this.$editor().wrapSelection("formatBlock", "<" + this.name.toUpperCase() +">");
    };
    angular.forEach(['h1','h2','h3','h4','h5','h6'], function(h){
        taRegisterTool(h.toLowerCase(), {
            buttontext: h.toUpperCase(),
            tooltiptext: taTranslations.heading.tooltip + h.charAt(1),
            action: headerAction,
            activeState: _retActiveStateFunction(h.toLowerCase())
        });
    });
    taRegisterTool('p', {
        buttontext: 'P',
        tooltiptext: taTranslations.p.tooltip,
        action: function(){
            return this.$editor().wrapSelection("formatBlock", "<P>");
        },
        activeState: function(){ return this.$editor().queryFormatBlockState('p'); }
    });
    // key: pre -> taTranslations[key].tooltip, taTranslations[key].buttontext
    taRegisterTool('pre', {
        buttontext: 'pre',
        tooltiptext: taTranslations.pre.tooltip,
        action: function(){
            return this.$editor().wrapSelection("formatBlock", "<PRE>");
        },
        activeState: function(){ return this.$editor().queryFormatBlockState('pre'); }
    });
    taRegisterTool('ul', {
        iconclass: 'fa fa-list-ul',
        tooltiptext: taTranslations.ul.tooltip,
        action: function(){
            return this.$editor().wrapSelection("insertUnorderedList", null);
        },
        activeState: function(){ return this.$editor().queryCommandState('insertUnorderedList'); }
    });
    taRegisterTool('ol', {
        iconclass: 'fa fa-list-ol',
        tooltiptext: taTranslations.ol.tooltip,
        action: function(){
            return this.$editor().wrapSelection("insertOrderedList", null);
        },
        activeState: function(){ return this.$editor().queryCommandState('insertOrderedList'); }
    });
    taRegisterTool('quote', {
        iconclass: 'fa fa-quote-right',
        tooltiptext: taTranslations.quote.tooltip,
        action: function(){
            return this.$editor().wrapSelection("formatBlock", "<BLOCKQUOTE>");
        },
        activeState: function(){ return this.$editor().queryFormatBlockState('blockquote'); }
    });
    taRegisterTool('undo', {
        iconclass: 'fa fa-undo',
        tooltiptext: taTranslations.undo.tooltip,
        action: function(){
            return this.$editor().wrapSelection("undo", null);
        }
    });
    taRegisterTool('redo', {
        iconclass: 'fa fa-repeat',
        tooltiptext: taTranslations.redo.tooltip,
        action: function(){
            return this.$editor().wrapSelection("redo", null);
        }
    });
    taRegisterTool('bold', {
        iconclass: 'fa fa-bold',
        tooltiptext: taTranslations.bold.tooltip,
        action: function(){
            return this.$editor().wrapSelection("bold", null);
        },
        activeState: function(){
            return this.$editor().queryCommandState('bold');
        },
        commandKeyCode: 98
    });
    taRegisterTool('justifyLeft', {
        iconclass: 'fa fa-align-left',
        tooltiptext: taTranslations.justifyLeft.tooltip,
        action: function(){
            return this.$editor().wrapSelection("justifyLeft", null);
        },
        activeState: function(commonElement){
            /* istanbul ignore next: */
            if (commonElement && commonElement.nodeName === '#document') return false;
            var result = false;
            if (commonElement) {
                // commonELement.css('text-align') can throw an error 'Cannot read property 'defaultView' of null' in rare conditions
                // so we do try catch here...
                try {
                    result =
                        commonElement.css('text-align') === 'left' ||
                        commonElement.attr('align') === 'left' ||
                        (
                            commonElement.css('text-align') !== 'right' &&
                            commonElement.css('text-align') !== 'center' &&
                            commonElement.css('text-align') !== 'justify' && !this.$editor().queryCommandState('justifyRight') && !this.$editor().queryCommandState('justifyCenter')
                        ) && !this.$editor().queryCommandState('justifyFull');
                } catch(e) {
                    /* istanbul ignore next: error handler */
                    //console.log(e);
                    result = false;
                }
            }
            result = result || this.$editor().queryCommandState('justifyLeft');
            return result;
        }
    });
    taRegisterTool('justifyRight', {
        iconclass: 'fa fa-align-right',
        tooltiptext: taTranslations.justifyRight.tooltip,
        action: function(){
            return this.$editor().wrapSelection("justifyRight", null);
        },
        activeState: function(commonElement){
            /* istanbul ignore next: */
            if (commonElement && commonElement.nodeName === '#document') return false;
            var result = false;
            if(commonElement) {
                // commonELement.css('text-align') can throw an error 'Cannot read property 'defaultView' of null' in rare conditions
                // so we do try catch here...
                try {
                    result = commonElement.css('text-align') === 'right';
                } catch(e) {
                    /* istanbul ignore next: error handler */
                    //console.log(e);
                    result = false;
                }
            }
            result = result || this.$editor().queryCommandState('justifyRight');
            return result;
        }
    });
    taRegisterTool('justifyFull', {
        iconclass: 'fa fa-align-justify',
        tooltiptext: taTranslations.justifyFull.tooltip,
        action: function(){
            return this.$editor().wrapSelection("justifyFull", null);
        },
        activeState: function(commonElement){
            var result = false;
            if(commonElement) {
                // commonELement.css('text-align') can throw an error 'Cannot read property 'defaultView' of null' in rare conditions
                // so we do try catch here...
                try {
                    result = commonElement.css('text-align') === 'justify';
                } catch(e) {
                    /* istanbul ignore next: error handler */
                    //console.log(e);
                    result = false;
                }
            }
            result = result || this.$editor().queryCommandState('justifyFull');
            return result;
        }
    });
    taRegisterTool('justifyCenter', {
        iconclass: 'fa fa-align-center',
        tooltiptext: taTranslations.justifyCenter.tooltip,
        action: function(){
            return this.$editor().wrapSelection("justifyCenter", null);
        },
        activeState: function(commonElement){
            /* istanbul ignore next: */
            if (commonElement && commonElement.nodeName === '#document') return false;
            var result = false;
            if(commonElement) {
                // commonELement.css('text-align') can throw an error 'Cannot read property 'defaultView' of null' in rare conditions
                // so we do try catch here...
                try {
                    result = commonElement.css('text-align') === 'center';
                } catch(e) {
                    /* istanbul ignore next: error handler */
                    //console.log(e);
                    result = false;
                }

            }
            result = result || this.$editor().queryCommandState('justifyCenter');
            return result;
        }
    });
    taRegisterTool('indent', {
        iconclass: 'fa fa-indent',
        tooltiptext: taTranslations.indent.tooltip,
        action: function(){
            return this.$editor().wrapSelection("indent", null);
        },
        activeState: function(){
            return this.$editor().queryFormatBlockState('blockquote');
        },
        commandKeyCode: 'TabKey'
    });
    taRegisterTool('outdent', {
        iconclass: 'fa fa-outdent',
        tooltiptext: taTranslations.outdent.tooltip,
        action: function(){
            return this.$editor().wrapSelection("outdent", null);
        },
        activeState: function(){
            return false;
        },
        commandKeyCode: 'ShiftTabKey'
    });
    taRegisterTool('italics', {
        iconclass: 'fa fa-italic',
        tooltiptext: taTranslations.italic.tooltip,
        action: function(){
            return this.$editor().wrapSelection("italic", null);
        },
        activeState: function(){
            return this.$editor().queryCommandState('italic');
        },
        commandKeyCode: 105
    });
    taRegisterTool('underline', {
        iconclass: 'fa fa-underline',
        tooltiptext: taTranslations.underline.tooltip,
        action: function(){
            return this.$editor().wrapSelection("underline", null);
        },
        activeState: function(){
            return this.$editor().queryCommandState('underline');
        },
        commandKeyCode: 117
    });
    taRegisterTool('strikeThrough', {
        iconclass: 'fa fa-strikethrough',
        tooltiptext: taTranslations.strikeThrough.tooltip,
        action: function(){
            return this.$editor().wrapSelection("strikeThrough", null);
        },
        activeState: function(){
            return document.queryCommandState('strikeThrough');
        }
    });
    taRegisterTool('clear', {
        iconclass: 'fa fa-ban',
        tooltiptext: taTranslations.clear.tooltip,
        action: function(deferred, restoreSelection){
            var i, selectedElements, elementsSeen;

            this.$editor().wrapSelection("removeFormat", null);
            var possibleNodes = angular.element(taSelection.getSelectionElement());
            selectedElements = taSelection.getAllSelectedElements();
            //$log.log('selectedElements:', selectedElements);
            // remove lists
            var removeListElements = function(list, pe){
                list = angular.element(list);
                var prevElement = pe;
                if (!pe) {
                    prevElement = list;
                }
                angular.forEach(list.children(), function(liElem){
                    if (liElem.tagName.toLowerCase() === 'ul' ||
                        liElem.tagName.toLowerCase() === 'ol') {
                        prevElement = removeListElements(liElem, prevElement);
                    } else {
                        var newElem = angular.element('<p></p>');
                        newElem.html(angular.element(liElem).html());
                        prevElement.after(newElem);
                        prevElement = newElem;
                    }
                });
                list.remove();
                return prevElement;
            };

            angular.forEach(selectedElements, function(element) {
                if (element.nodeName.toLowerCase() === 'ul' ||
                    element.nodeName.toLowerCase() === 'ol') {
                    //console.log('removeListElements', element);
                    removeListElements(element);
                }
            });

            angular.forEach(possibleNodes.find("ul"), removeListElements);
            angular.forEach(possibleNodes.find("ol"), removeListElements);

            // clear out all class attributes. These do not seem to be cleared via removeFormat
            var $editor = this.$editor();
            var recursiveRemoveClass = function(node){
                node = angular.element(node);
                /* istanbul ignore next: this is not triggered in tests any longer since we now never select the whole displayELement */
                if(node[0] !== $editor.displayElements.text[0]) {
                    node.removeAttr('class');
                }
                angular.forEach(node.children(), recursiveRemoveClass);
            };
            angular.forEach(possibleNodes, recursiveRemoveClass);
            // check if in list. If not in list then use formatBlock option
            if(possibleNodes[0] && possibleNodes[0].tagName.toLowerCase() !== 'li' &&
                possibleNodes[0].tagName.toLowerCase() !== 'ol' &&
                possibleNodes[0].tagName.toLowerCase() !== 'ul' &&
                possibleNodes[0].getAttribute("contenteditable") !== "true") {
                this.$editor().wrapSelection("formatBlock", "default");
            }
            restoreSelection();
        }
    });

        /* jshint -W099 */
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
    var blockJavascript = function (link) {
        if (link.toLowerCase().indexOf('javascript')!==-1) {
            return true;
        }
        return false;
    };

    taRegisterTool('insertImage', {
        iconclass: 'fa fa-picture-o',
        tooltiptext: taTranslations.insertImage.tooltip,
        action: function(){
            var imageLink;
            imageLink = $window.prompt(taTranslations.insertImage.dialogPrompt, 'http://');
            if(imageLink && imageLink !== '' && imageLink !== 'http://'){
                /* istanbul ignore next: don't know how to test this... since it needs a dialogPrompt */
                // block javascript here
                if (!blockJavascript(imageLink)) {
                    if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {
                        // due to differences in implementation between FireFox and Chrome, we must move the
                        // insertion point past the <a> element, otherwise FireFox inserts inside the <a>
                        // With this change, both FireFox and Chrome behave the same way!
                        taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                    }
                    // In the past we used the simple statement:
                    //return this.$editor().wrapSelection('insertImage', imageLink, true);
                    //
                    // However on Firefox only, when the content is empty this is a problem
                    // See Issue #1201
                    // Investigation reveals that Firefox only inserts a <p> only!!!!
                    // So now we use insertHTML here and all is fine.
                    // NOTE: this is what 'insertImage' is supposed to do anyway!
                    var embed = '<img src="' + imageLink + '">';
                    return this.$editor().wrapSelection('insertHTML', embed, true);
                }
            }
        },
        onElementSelect: {
            element: 'img',
            action: taToolFunctions.imgOnSelectAction
        }
    });
    taRegisterTool('insertVideo', {
        iconclass: 'fa fa-youtube-play',
        tooltiptext: taTranslations.insertVideo.tooltip,
        action: function(){
            var urlPrompt;
            urlPrompt = $window.prompt(taTranslations.insertVideo.dialogPrompt, 'https://');
            // block javascript here
            /* istanbul ignore else: if it's javascript don't worry - though probably should show some kind of error message */
            if (!blockJavascript(urlPrompt)) {

                if (urlPrompt && urlPrompt !== '' && urlPrompt !== 'https://') {

                    videoId = taToolFunctions.extractYoutubeVideoId(urlPrompt);

                    /* istanbul ignore else: if it's invalid don't worry - though probably should show some kind of error message */
                    if (videoId) {
                        // create the embed link
                        var urlLink = "https://www.youtube.com/embed/" + videoId;
                        // create the HTML
                        // for all options see: http://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
                        // maxresdefault.jpg seems to be undefined on some.
                        var embed = '<img class="ta-insert-video" src="https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg" ta-insert-video="' + urlLink + '" contenteditable="false" allowfullscreen="true" frameborder="0" />';
                        /* istanbul ignore next: don't know how to test this... since it needs a dialogPrompt */
                        if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {
                            // due to differences in implementation between FireFox and Chrome, we must move the
                            // insertion point past the <a> element, otherwise FireFox inserts inside the <a>
                            // With this change, both FireFox and Chrome behave the same way!
                            taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                        }
                        // insert
                        return this.$editor().wrapSelection('insertHTML', embed, true);
                    }
                }
            }
        },
        onElementSelect: {
            element: 'img',
            onlyWithAttrs: ['ta-insert-video'],
            action: taToolFunctions.imgOnSelectAction
        }
    });
    taRegisterTool('insertLink', {
        tooltiptext: taTranslations.insertLink.tooltip,
        iconclass: 'fa fa-link',
        action: function(){
            var urlLink;
            // if this link has already been set, we need to just edit the existing link
            /* istanbul ignore if: we do not test this */
            if (taSelection.getSelectionElement().tagName && taSelection.getSelectionElement().tagName.toLowerCase() === 'a') {
                urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, taSelection.getSelectionElement().href);
            } else {
                urlLink = $window.prompt(taTranslations.insertLink.dialogPrompt, 'http://');
            }
            if(urlLink && urlLink !== '' && urlLink !== 'http://'){
                // block javascript here
                /* istanbul ignore else: if it's javascript don't worry - though probably should show some kind of error message */
                if (!blockJavascript(urlLink)) {
                    return this.$editor().wrapSelection('createLink', urlLink, true);
                }
            }
        },
        activeState: function(commonElement){
            if(commonElement) return commonElement[0].tagName === 'A';
            return false;
        },
        onElementSelect: {
            element: 'a',
            action: taToolFunctions.aOnSelectAction
        }
    });
    taRegisterTool('wordcount', {
        display: '<div id="toolbarWC" style="display:block; min-width:100px;">Words: <span ng-bind="wordcount"></span></div>',
        disabled: true,
        wordcount: 0,
        activeState: function(){ // this fires on keyup
            var textElement = this.$editor().displayElements.text;
            /* istanbul ignore next: will default to '' when undefined */
            var workingHTML = textElement[0].innerHTML || '';
            var noOfWords = 0;

            /* istanbul ignore if: will default to '' when undefined */
            if (workingHTML.replace(/\s*<[^>]*?>\s*/g, '') !== '') {
                if (workingHTML.trim() !== '') {
                    noOfWords = workingHTML.replace(/<\/?(b|i|em|strong|span|u|strikethrough|a|img|small|sub|sup|label)( [^>*?])?>/gi, '') // remove inline tags without adding spaces
                        .replace(/(<[^>]*?>\s*<[^>]*?>)/ig, ' ') // replace adjacent tags with possible space between with a space
                        .replace(/(<[^>]*?>)/ig, '') // remove any singular tags
                        .replace(/\s+/ig, ' ') // condense spacing
                        .match(/\S+/g).length; // count remaining non-space strings
                }
            }

            //Set current scope
            this.wordcount = noOfWords;
            //Set editor scope
            this.$editor().wordcount = noOfWords;

            return false;
        }
    });
    taRegisterTool('charcount', {
        display: '<div id="toolbarCC" style="display:block; min-width:120px;">Characters: <span ng-bind="charcount"></span></div>',
        disabled: true,
        charcount: 0,
        activeState: function(){ // this fires on keyup
            var textElement = this.$editor().displayElements.text;
            var sourceText = textElement[0].innerText || textElement[0].textContent; // to cover the non-jquery use case.

            // Caculate number of chars
            var noOfChars = sourceText.replace(/(\r\n|\n|\r)/gm,"").replace(/^\s+/g,' ').replace(/\s+$/g, ' ').length;
            //Set current scope
            this.charcount = noOfChars;
            //Set editor scope
            this.$editor().charcount = noOfChars;
            return false;
        }
    });
}]);

/*
@license textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.5.16

See README.md or https://github.com/fraywing/textAngular/wiki for requirements and use.
*/

/*
Commonjs package manager support (eg componentjs).
*/


"use strict";// NOTE: textAngularVersion must match the Gruntfile.js 'setVersion' task.... and have format v/d+./d+./d+
var textAngularVersion = 'v1.5.16';   // This is automatically updated during the build process to the current release!


// IE version detection - http://stackoverflow.com/questions/4169160/javascript-ie-detection-why-not-use-simple-conditional-comments
// We need this as IE sometimes plays funny tricks with the contenteditable.
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9, IE10 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
/* istanbul ignore next: untestable browser check */
var _browserDetect = {
	ie: (function(){
		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (
			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;
	}()),
	webkit: /AppleWebKit\/([\d.]+)/i.test(navigator.userAgent),
	isFirefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1
};

// Global to textAngular to measure performance where needed
/* istanbul ignore next: untestable browser check */
var performance = performance || {};
/* istanbul ignore next: untestable browser check */
performance.now = (function() {
	return performance.now       ||
		performance.mozNow    ||
		performance.msNow     ||
		performance.oNow      ||
		performance.webkitNow ||
		function() { return new Date().getTime(); };
})();
// usage is:
// var t0 = performance.now();
// doSomething();
// var t1 = performance.now();
// console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to do something!');
//

// turn html into pure text that shows visiblity
function stripHtmlToText(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	var res = tmp.textContent || tmp.innerText || '';
	res.replace('\u200B', ''); // zero width space
	res = res.trim();
	return res;
}
// get html
function getDomFromHtml(html)
{
	var tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp;
}


// Global to textAngular REGEXP vars for block and list elements.

var BLOCKELEMENTS = /^(address|article|aside|audio|blockquote|canvas|center|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video)$/i;
var LISTELEMENTS = /^(ul|li|ol)$/i;
// updated VALIDELEMENTS to include #text and span so that we can use nodeName instead of tagName
var VALIDELEMENTS = /^(#text|span|address|article|aside|audio|blockquote|canvas|center|dd|div|dl|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|noscript|ol|output|p|pre|section|table|tfoot|ul|video|li)$/i;


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Compatibility
/* istanbul ignore next: trim shim for older browsers */
if (!String.prototype.trim) {
	String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g, '');
	};
}

/*
	Custom stylesheet for the placeholders rules.
	Credit to: http://davidwalsh.name/add-rules-stylesheets
*/
var sheet, addCSSRule, removeCSSRule, _addCSSRule, _removeCSSRule, _getRuleIndex;
/* istanbul ignore else: IE <8 test*/
if(_browserDetect.ie > 8 || _browserDetect.ie === undefined){
	var _sheets = document.styleSheets;
	/* istanbul ignore next: preference for stylesheet loaded externally */
	for(var i = 0; i < _sheets.length; i++){
		if(_sheets[i].media.length === 0 || _sheets[i].media.mediaText.match(/(all|screen)/ig)){
			if(_sheets[i].href){
				if(_sheets[i].href.match(/textangular\.(min\.|)css/ig)){
					sheet = _sheets[i];
					break;
				}
			}
		}
	}
	/* istanbul ignore next: preference for stylesheet loaded externally */
	if(!sheet){
		// this sheet is used for the placeholders later on.
		sheet = (function() {
			// Create the <style> tag
			var style = document.createElement("style");
			/* istanbul ignore else : WebKit hack :( */
			if(_browserDetect.webkit) style.appendChild(document.createTextNode(""));

			// Add the <style> element to the page, add as first so the styles can be overridden by custom stylesheets
			document.getElementsByTagName('head')[0].appendChild(style);

			return style.sheet;
		})();
	}

	// use as: addCSSRule("header", "float: left");
	addCSSRule = function(selector, rules) {
		return _addCSSRule(sheet, selector, rules);
	};
	_addCSSRule = function(_sheet, selector, rules){
		var insertIndex;
		var insertedRule;
		// This order is important as IE 11 has both cssRules and rules but they have different lengths - cssRules is correct, rules gives an error in IE 11
		/* istanbul ignore next: browser catches */
		if(_sheet.cssRules) insertIndex = Math.max(_sheet.cssRules.length - 1, 0);
		else if(_sheet.rules) insertIndex = Math.max(_sheet.rules.length - 1, 0);

		/* istanbul ignore else: untestable IE option */
		if(_sheet.insertRule) {
			_sheet.insertRule(selector + "{" + rules + "}", insertIndex);
		}
		else {
			_sheet.addRule(selector, rules, insertIndex);
		}
		/* istanbul ignore next: browser catches */
		if(sheet.rules) insertedRule = sheet.rules[insertIndex];
		else if(sheet.cssRules) insertedRule = sheet.cssRules[insertIndex];
		// return the inserted stylesheet rule
		return insertedRule;
	};

	_getRuleIndex = function(rule, rules) {
		var i, ruleIndex;
		for (i=0; i < rules.length; i++) {
			/* istanbul ignore else: check for correct rule */
			if (rules[i].cssText === rule.cssText) {
				ruleIndex = i;
				break;
			}
		}
		return ruleIndex;
	};

	removeCSSRule = function(rule){
		_removeCSSRule(sheet, rule);
	};
	/* istanbul ignore next: tests are browser specific */
	_removeCSSRule = function(sheet, rule){
		var rules = sheet.cssRules || sheet.rules;
		if(!rules || rules.length === 0) return;
		var ruleIndex = _getRuleIndex(rule, rules);
		if(sheet.removeRule){
			sheet.removeRule(ruleIndex);
		}else{
			sheet.deleteRule(ruleIndex);
		}
	};
}

angular.module('textAngular.factories', [])
.factory('taBrowserTag', [function(){
    return function(tag){
        /* istanbul ignore next: ie specific test */
        if(!tag) return (_browserDetect.ie <= 8)? 'P' : 'p';
        else if(tag === '') return (_browserDetect.ie === undefined)? 'div' : (_browserDetect.ie <= 8)? 'P' : 'p';
        else return (_browserDetect.ie <= 8)? tag.toUpperCase() : tag;
    };
}]).factory('taApplyCustomRenderers', ['taCustomRenderers', 'taDOM', function(taCustomRenderers, taDOM){
    return function(val){
        var element = angular.element('<div></div>');
        element[0].innerHTML = val;

        angular.forEach(taCustomRenderers, function(renderer){
            var elements = [];
            // get elements based on what is defined. If both defined do secondary filter in the forEach after using selector string
            if(renderer.selector && renderer.selector !== '')
                elements = element.find(renderer.selector);
            /* istanbul ignore else: shouldn't fire, if it does we're ignoring everything */
            else if(renderer.customAttribute && renderer.customAttribute !== '')
                elements = taDOM.getByAttribute(element, renderer.customAttribute);
            // process elements if any found
            angular.forEach(elements, function(_element){
                _element = angular.element(_element);
                if(renderer.selector && renderer.selector !== '' && renderer.customAttribute && renderer.customAttribute !== ''){
                    if(_element.attr(renderer.customAttribute) !== undefined) renderer.renderLogic(_element);
                } else renderer.renderLogic(_element);
            });
        });

        return element[0].innerHTML;
    };
}]).factory('taFixChrome', function(){
    // get whaterever rubbish is inserted in chrome
    // should be passed an html string, returns an html string
    var taFixChrome = function(html, keepStyles){
        if(!html || !angular.isString(html) || html.length <= 0) return html;
        // grab all elements with a style attibute
        // a betterSpanMatch matches only a style=... with matching quotes
        // this captures the whole:
        // 'style="background-color: rgb(255, 255, 255);"'
        var betterSpanMatch = /style\s?=\s?(["'])(?:(?=(\\?))\2.)*?\1/ig;
        // where the original spanMatch = /<([^>\/]+?)style=("([^\"]+)"|'([^']+)')([^>]*)>/ig;
        // captures too much and includes the front tag!
        var spanMatch = /<([^>\/]+?)style=("([^\"]+)"|'([^']+)')([^>]*)>/ig;
        var appleConvertedSpaceMatch = /<span class="Apple-converted-space">([^<]+)<\/span>/ig;
        var match, styleVal, appleSpaceVal, newTag, finalHtml = '', lastIndex = 0;
        // remove all the Apple-converted-space spans and replace with the content of the span
        //console.log('before:', html);
        /* istanbul ignore next: apple-contereted-space span match */
        while(match = appleConvertedSpaceMatch.exec(html)){
            appleSpaceVal = match[1];
            appleSpaceVal = appleSpaceVal.replace(/&nbsp;/ig, ' ');
            finalHtml += html.substring(lastIndex, match.index) + appleSpaceVal;
            lastIndex = match.index + match[0].length;
        }
        /* istanbul ignore next: apple-contereted-space span has matched */
        if (lastIndex) {
            // modified....
            finalHtml += html.substring(lastIndex);
            html=finalHtml;
            finalHtml='';
            lastIndex=0;
        }
        /////////////////////////////////////////////////////////////
        //
        // Allow control of this modification
        // taKeepStyles: False - removes these modification
        //
        // taFixChrome removes the following styles:
        //    font-family: inherit;
        //    line-height: <number>
        //    color: inherit;
        //    color: rgb( <rgb-component>#{3} )
        //    background-color: rgb( <rgb-component>#{3} )
        //
        /////////////////////////////////////////////////////////////
        if (!keepStyles) {
            while (match = betterSpanMatch.exec(html)) {
                finalHtml += html.substring(lastIndex, match.index-1);
                styleVal = match[0];
                // test for chrome inserted junk
                match = /font-family: inherit;|line-height: 1.[0-9]{3,12};|color: inherit; line-height: 1.1;|color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/gi.exec(styleVal);
                if (match) {
                    styleVal = styleVal.replace(/( |)font-family: inherit;|( |)line-height: 1.[0-9]{3,12};|( |)color: inherit;|( |)color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);|( |)background-color: rgb\(\d{1,3}, \d{1,3}, \d{1,3}\);/ig, '');
                    //console.log(styleVal, styleVal.length);
                    if (styleVal.length > 8) {
                        finalHtml += ' ' + styleVal;
                    }
                } else {
                    finalHtml += ' ' + styleVal;
                }
                lastIndex = betterSpanMatch.lastIndex;
            }
            finalHtml += html.substring(lastIndex);
        }
        //console.log('final:', finalHtml);
        // only replace when something has changed, else we get focus problems on inserting lists
        if(lastIndex > 0){
            // replace all empty strings
            var fe = finalHtml.replace(/<span\s?>(.*?)<\/span>(<br(\/|)>|)/ig, '$1');
            return fe;
        } else return html;
    };
    return taFixChrome;
}).factory('taSanitize', ['$sanitize', function taSanitizeFactory($sanitize){

    var convert_infos = [
        {
            property: 'font-weight',
            values: [ 'bold' ],
            tag: 'b'
        },
        {
            property: 'font-style',
            values: [ 'italic' ],
            tag: 'i'
        }
    ];

    var styleMatch = [];
    for(var i = 0; i < convert_infos.length; i++){
        var _partialStyle = '(' + convert_infos[i].property + ':\\s*(';
        for(var j = 0; j < convert_infos[i].values.length; j++){
            /* istanbul ignore next: not needed to be tested yet */
            if(j > 0) _partialStyle += '|';
            _partialStyle += convert_infos[i].values[j];
        }
        _partialStyle += ');)';
        styleMatch.push(_partialStyle);
    }
    var styleRegexString = '(' + styleMatch.join('|') + ')';

    function wrapNested(html, wrapTag) {
        var depth = 0;
        var lastIndex = 0;
        var match;
        var tagRegex = /<[^>]*>/ig;
        while(match = tagRegex.exec(html)){
            lastIndex = match.index;
            if(match[0].substr(1, 1) === '/'){
                if(depth === 0) break;
                else depth--;
            }else depth++;
        }
        return wrapTag +
            html.substring(0, lastIndex) +
            // get the start tags reversed - this is safe as we construct the strings with no content except the tags
            angular.element(wrapTag)[0].outerHTML.substring(wrapTag.length) +
            html.substring(lastIndex);
    }

    function transformLegacyStyles(html){
        if(!html || !angular.isString(html) || html.length <= 0) return html;
        var i;
        var styleElementMatch = /<([^>\/]+?)style=("([^"]+)"|'([^']+)')([^>]*)>/ig;
        var match, subMatch, styleVal, newTag, lastNewTag = '', newHtml, finalHtml = '', lastIndex = 0;
        while(match = styleElementMatch.exec(html)){
            // one of the quoted values ' or "
            /* istanbul ignore next: quotations match */
            styleVal = match[3] || match[4];
            var styleRegex = new RegExp(styleRegexString, 'i');
            // test for style values to change
            if(angular.isString(styleVal) && styleRegex.test(styleVal)){
                // remove build tag list
                newTag = '';
                // init regex here for exec
                var styleRegexExec = new RegExp(styleRegexString, 'ig');
                // find relevand tags and build a string of them
                while(subMatch = styleRegexExec.exec(styleVal)){
                    for(i = 0; i < convert_infos.length; i++){
                        if(!!subMatch[(i*2) + 2]){
                            newTag += '<' + convert_infos[i].tag + '>';
                        }
                    }
                }
                // recursively find more legacy styles in html before this tag and after the previous match (if any)
                newHtml = transformLegacyStyles(html.substring(lastIndex, match.index));
                // build up html
                if(lastNewTag.length > 0){
                    finalHtml += wrapNested(newHtml, lastNewTag);
                }else finalHtml += newHtml;
                // grab the style val without the transformed values
                styleVal = styleVal.replace(new RegExp(styleRegexString, 'ig'), '');
                // build the html tag
                finalHtml += '<' + match[1].trim();
                if(styleVal.length > 0) finalHtml += ' style="' + styleVal + '"';
                finalHtml += match[5] + '>';
                // update the start index to after this tag
                lastIndex = match.index + match[0].length;
                lastNewTag = newTag;
            }
        }
        if(lastNewTag.length > 0){
            finalHtml += wrapNested(html.substring(lastIndex), lastNewTag);
        }
        else finalHtml += html.substring(lastIndex);
        return finalHtml;
    }

    function transformLegacyAttributes(html){
        if(!html || !angular.isString(html) || html.length <= 0) return html;
        // replace all align='...' tags with text-align attributes
        var attrElementMatch = /<([^>\/]+?)align=("([^"]+)"|'([^']+)')([^>]*)>/ig;
        var match, finalHtml = '', lastIndex = 0;
        // match all attr tags
        while(match = attrElementMatch.exec(html)){
            // add all html before this tag
            finalHtml += html.substring(lastIndex, match.index);
            // record last index after this tag
            lastIndex = match.index + match[0].length;
            // construct tag without the align attribute
            var newTag = '<' + match[1] + match[5];
            // add the style attribute
            if(/style=("([^"]+)"|'([^']+)')/ig.test(newTag)){
                /* istanbul ignore next: quotations match */
                newTag = newTag.replace(/style=("([^"]+)"|'([^']+)')/i, 'style="$2$3 text-align:' + (match[3] || match[4]) + ';"');
            }else{
                /* istanbul ignore next: quotations match */
                newTag += ' style="text-align:' + (match[3] || match[4]) + ';"';
            }
            newTag += '>';
            // add to html
            finalHtml += newTag;
        }
        // return with remaining html
        return finalHtml + html.substring(lastIndex);
    }

    // use precompiled regexp for speed
    var rsb1 = new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/ig);
    var rsb2 = new RegExp(/<span class="rangySelectionBoundary" id="selectionBoundary_\d+_\d+">[^<>]+?<\/span>/ig);
    var rsb3 = new RegExp(/<span id="selectionBoundary_\d+_\d+" class="rangySelectionBoundary">[^<>]+?<\/span>/ig);

    return function taSanitize(unsafe, oldsafe, ignore){
        // unsafe html should NEVER built into a DOM object via angular.element. This allows XSS to be inserted and run.
        if ( !ignore ) {
            try {
                unsafe = transformLegacyStyles(unsafe);
            } catch (e) {
            }
        }

        // unsafe and oldsafe should be valid HTML strings
        // any exceptions (lets say, color for example) should be made here but with great care
        // setup unsafe element for modification
        unsafe = transformLegacyAttributes(unsafe);

        // we had an issue in the past, where we dumped a whole bunch of <span>'s into the content...
        // so we remove them here
        // IN A FUTURE release this can be removed after all have updated through release 1.5.9
        if (unsafe) {
            try {
                unsafe = unsafe.replace(rsb1, '');
                unsafe = unsafe.replace(rsb2, '');
                unsafe = unsafe.replace(rsb1, '');
                unsafe = unsafe.replace(rsb3, '');
            } catch (e) {
            }
        }

        var safe;
        try {
            safe = $sanitize(unsafe);
            // do this afterwards, then the $sanitizer should still throw for bad markup
            if(ignore) safe = unsafe;
        } catch (e){
            safe = oldsafe || '';
        }

        // Do processing for <pre> tags, removing tabs and return carriages outside of them

        var _preTags = safe.match(/(<pre[^>]*>.*?<\/pre[^>]*>)/ig);
        var processedSafe = safe.replace(/(&#(9|10);)*/ig, '');
        var re = /<pre[^>]*>.*?<\/pre[^>]*>/ig;
        var index = 0;
        var lastIndex = 0;
        var origTag;
        safe = '';
        while((origTag = re.exec(processedSafe)) !== null && index < _preTags.length){
            safe += processedSafe.substring(lastIndex, origTag.index) + _preTags[index];
            lastIndex = origTag.index + origTag[0].length;
            index++;
        }
        return safe + processedSafe.substring(lastIndex);
    };
}]).factory('taToolExecuteAction', ['$q', '$log', function($q, $log){
    // this must be called on a toolScope or instance
    return function(editor){
        if(editor !== undefined) this.$editor = function(){ return editor; };
        var deferred = $q.defer(),
            promise = deferred.promise,
            _editor = this.$editor();
        // pass into the action the deferred function and also the function to reload the current selection if rangy available
        var result;
        try{
            result = this.action(deferred, _editor.startAction());
            // We set the .finally callback here to make sure it doesn't get executed before any other .then callback.
            promise['finally'](function(){
                _editor.endAction.call(_editor);
            });
        }catch(exc){
            $log.error(exc);
        }
        if(result || result === undefined){
            // if true or undefined is returned then the action has finished. Otherwise the deferred action will be resolved manually.
            deferred.resolve();
        }
    };
}]);

angular.module('textAngular.DOM', ['textAngular.factories'])
.factory('taExecCommand', ['taSelection', 'taBrowserTag', '$document', function(taSelection, taBrowserTag, $document){
    var listToDefault = function(listElement, defaultWrap){
        var $target, i;
        // if all selected then we should remove the list
        // grab all li elements and convert to taDefaultWrap tags
        var children = listElement.find('li');
        for(i = children.length - 1; i >= 0; i--){
            $target = angular.element('<' + defaultWrap + '>' + children[i].innerHTML + '</' + defaultWrap + '>');
            listElement.after($target);
        }
        listElement.remove();
        taSelection.setSelectionToElementEnd($target[0]);
    };
    var listElementToSelfTag = function(list, listElement, selfTag, bDefault, defaultWrap){
        var $target, i;
        // if all selected then we should remove the list
        // grab all li elements
        var priorElement;
        var nextElement;
        var children = list.find('li');
        var foundIndex;
        for (i = 0; i<children.length; i++) {
            if (children[i].outerHTML === listElement[0].outerHTML) {
                // found it...
                foundIndex = i;
                if (i>0) {
                    priorElement = children[i-1];
                }
                if (i+1<children.length) {
                    nextElement = children[i+1];
                }
                break;
            }
        }
        //console.log('listElementToSelfTag', list, listElement, selfTag, bDefault, priorElement, nextElement);
        // un-list the listElement
        var html = '';
        if (bDefault) {
            html += '<' + defaultWrap + '>' + listElement[0].innerHTML + '</' + defaultWrap + '>';
        } else {
            html += '<' + taBrowserTag(selfTag) + '>';
            html += '<li>' + listElement[0].innerHTML + '</li>';
            html += '</' + taBrowserTag(selfTag) + '>';
        }
        $target = angular.element(html);
        //console.log('$target', $target[0]);
        if (!priorElement) {
            // this is the first the list, so we just remove it...
            listElement.remove();
            list.after(angular.element(list[0].outerHTML));
            list.after($target);
            list.remove();
            taSelection.setSelectionToElementEnd($target[0]);
            return;
        } else if (!nextElement) {
            // this is the last in the list, so we just remove it..
            listElement.remove();
            list.after($target);
            taSelection.setSelectionToElementEnd($target[0]);
        } else {
            var p = list.parent();
            // okay it was some where in the middle... so we need to break apart the list...
            var html1 = '';
            var listTag = list[0].nodeName.toLowerCase();
            html1 += '<' + listTag + '>';
            for(i = 0; i < foundIndex; i++){
                html1 += '<li>' + children[i].innerHTML + '</li>';
            }
            html1 += '</' + listTag + '>';
            var html2 = '';
            html2 += '<' + listTag + '>';
            for(i = foundIndex+1; i < children.length; i++){
                html2 += '<li>' + children[i].innerHTML + '</li>';
            }
            html2 += '</' + listTag + '>';
            //console.log(html1, $target[0], html2);
            list.after(angular.element(html2));
            list.after($target);
            list.after(angular.element(html1));
            list.remove();
            //console.log('parent ******XXX*****', p[0]);
            taSelection.setSelectionToElementEnd($target[0]);
        }
    };
    var listElementsToSelfTag = function(list, listElements, selfTag, bDefault, defaultWrap){
        var $target, i, j, p;
        // grab all li elements
        var priorElement;
        var afterElement;
        //console.log('list:', list, 'listElements:', listElements, 'selfTag:', selfTag, 'bDefault:', bDefault);
        var children = list.find('li');
        var foundIndexes = [];
        for (i = 0; i<children.length; i++) {
            for (j = 0; j<listElements.length; j++) {
                if (children[i].isEqualNode(listElements[j])) {
                    // found it...
                    foundIndexes[j] = i;
                }
            }
        }
        if (foundIndexes[0] > 0) {
            priorElement = children[foundIndexes[0] - 1];
        }
        if (foundIndexes[listElements.length-1] + 1 < children.length) {
            afterElement = children[foundIndexes[listElements.length-1] + 1];
        }
        //console.log('listElementsToSelfTag', list, listElements, selfTag, bDefault, !priorElement, !afterElement, foundIndexes[listElements.length-1], children.length);
        // un-list the listElements
        var html = '';
        if (bDefault) {
            for (j = 0; j < listElements.length; j++) {
                html += '<' + defaultWrap + '>' + listElements[j].innerHTML + '</' + defaultWrap + '>';
                listElements[j].remove();
            }
        } else {
            html += '<' + taBrowserTag(selfTag) + '>';
            for (j = 0; j < listElements.length; j++) {
                html += listElements[j].outerHTML;
                listElements[j].remove();
            }
            html += '</' + taBrowserTag(selfTag) + '>';
        }
        $target = angular.element(html);
        if (!priorElement) {
            // this is the first the list, so we just remove it...
            list.after(angular.element(list[0].outerHTML));
            list.after($target);
            list.remove();
            taSelection.setSelectionToElementEnd($target[0]);
            return;
        } else if (!afterElement) {
            // this is the last in the list, so we just remove it..
            list.after($target);
            taSelection.setSelectionToElementEnd($target[0]);
            return;
        } else {
            // okay it was some where in the middle... so we need to break apart the list...
            var html1 = '';
            var listTag = list[0].nodeName.toLowerCase();
            html1 += '<' + listTag + '>';
            for(i = 0; i < foundIndexes[0]; i++){
                html1 += '<li>' + children[i].innerHTML + '</li>';
            }
            html1 += '</' + listTag + '>';
            var html2 = '';
            html2 += '<' + listTag + '>';
            for(i = foundIndexes[listElements.length-1]+1; i < children.length; i++){
                html2 += '<li>' + children[i].innerHTML + '</li>';
            }
            html2 += '</' + listTag + '>';
            list.after(angular.element(html2));
            list.after($target);
            list.after(angular.element(html1));
            list.remove();
            //console.log('parent ******YYY*****', list.parent()[0]);
            taSelection.setSelectionToElementEnd($target[0]);
        }
    };
    var selectLi = function(liElement){
        if(/(<br(|\/)>)$/i.test(liElement.innerHTML.trim())) taSelection.setSelectionBeforeElement(angular.element(liElement).find("br")[0]);
        else taSelection.setSelectionToElementEnd(liElement);
    };
    var listToList = function(listElement, newListTag){
        var $target = angular.element('<' + newListTag + '>' + listElement[0].innerHTML + '</' + newListTag + '>');
        listElement.after($target);
        listElement.remove();
        selectLi($target.find('li')[0]);
    };
    var childElementsToList = function(elements, listElement, newListTag){
        var html = '';
        for(var i = 0; i < elements.length; i++){
            html += '<' + taBrowserTag('li') + '>' + elements[i].innerHTML + '</' + taBrowserTag('li') + '>';
        }
        var $target = angular.element('<' + newListTag + '>' + html + '</' + newListTag + '>');
        listElement.after($target);
        listElement.remove();
        selectLi($target.find('li')[0]);
    };
    var turnBlockIntoBlocks = function(element, options) {
        for(var i = 0; i<element.childNodes.length; i++) {
            var _n = element.childNodes[i];
            /* istanbul ignore next - more complex testing*/
            if (_n.tagName && _n.tagName.match(BLOCKELEMENTS)) {
                turnBlockIntoBlocks(_n, options);
            }
        }
        /* istanbul ignore next - very rare condition that we do not test*/
        if (element.parentNode === null) {
            // nothing left to do..
            return element;
        }
        /* istanbul ignore next - not sure have to test this */
        if (options === '<br>'){
            return element;
        }
        else {
            var $target = angular.element(options);
            $target[0].innerHTML = element.innerHTML;
            element.parentNode.insertBefore($target[0], element);
            element.parentNode.removeChild(element);
            return $target;
        }
    };
    return function(taDefaultWrap, topNode){
        // NOTE: here we are dealing with the html directly from the browser and not the html the user sees.
        // IF you want to modify the html the user sees, do it when the user does a switchView
        taDefaultWrap = taBrowserTag(taDefaultWrap);
        return function(command, showUI, options, defaultTagAttributes){
            var i, $target, html, _nodes, next, optionsTagName, selectedElement, ourSelection;
            var defaultWrapper = angular.element('<' + taDefaultWrap + '>');
            try{
                if (taSelection.getSelection) {
                    ourSelection = taSelection.getSelection();
                }
                selectedElement = taSelection.getSelectionElement();
                // special checks and fixes when we are selecting the whole container
                var __h, _innerNode;
                /* istanbul ignore next */
                if (selectedElement.tagName !== undefined) {
                    if (selectedElement.tagName.toLowerCase() === 'div' &&
                        /taTextElement.+/.test(selectedElement.id) &&
                        ourSelection && ourSelection.start &&
                        ourSelection.start.offset === 1 &&
                        ourSelection.end.offset === 1) {
                        // opps we are actually selecting the whole container!
                        //console.log('selecting whole container!');
                        __h = selectedElement.innerHTML;
                        if (/<br>/i.test(__h)) {
                            // Firefox adds <br>'s and so we remove the <br>
                            __h = __h.replace(/<br>/i, '&#8203;');  // no space-space
                        }
                        if (/<br\/>/i.test(__h)) {
                            // Firefox adds <br/>'s and so we remove the <br/>
                            __h = __h.replace(/<br\/>/i, '&#8203;');  // no space-space
                        }
                        // remove stacked up <span>'s
                        if (/<span>(<span>)+/i.test(__h)) {
                            __h = __.replace(/<span>(<span>)+/i, '<span>');
                        }
                        // remove stacked up </span>'s
                        if (/<\/span>(<\/span>)+/i.test(__h)) {
                            __h = __.replace(/<\/span>(<\/span>)+/i, '<\/span>');
                        }
                        if (/<span><\/span>/i.test(__h)) {
                            // if we end up with a <span></span> here we remove it...
                            __h = __h.replace(/<span><\/span>/i, '');
                        }
                        //console.log('inner whole container', selectedElement.childNodes);
                        _innerNode = '<div>' + __h + '</div>';
                        selectedElement.innerHTML = _innerNode;
                        taSelection.setSelectionToElementEnd(selectedElement.childNodes[0]);
                        selectedElement = taSelection.getSelectionElement();
                    } else if (selectedElement.tagName.toLowerCase() === 'span' &&
                        ourSelection && ourSelection.start &&
                        ourSelection.start.offset === 1 &&
                        ourSelection.end.offset === 1) {
                        // just a span -- this is a problem...
                        //console.log('selecting span!');
                        __h = selectedElement.innerHTML;
                        if (/<br>/i.test(__h)) {
                            // Firefox adds <br>'s and so we remove the <br>
                            __h = __h.replace(/<br>/i, '&#8203;');  // no space-space
                        }
                        if (/<br\/>/i.test(__h)) {
                            // Firefox adds <br/>'s and so we remove the <br/>
                            __h = __h.replace(/<br\/>/i, '&#8203;');  // no space-space
                        }
                        // remove stacked up <span>'s
                        if (/<span>(<span>)+/i.test(__h)) {
                            __h = __.replace(/<span>(<span>)+/i, '<span>');
                        }
                        // remove stacked up </span>'s
                        if (/<\/span>(<\/span>)+/i.test(__h)) {
                            __h = __.replace(/<\/span>(<\/span>)+/i, '<\/span>');
                        }
                        if (/<span><\/span>/i.test(__h)) {
                            // if we end up with a <span></span> here we remove it...
                            __h = __h.replace(/<span><\/span>/i, '');
                        }
                        //console.log('inner span', selectedElement.childNodes);
                        // we wrap this in a <div> because otherwise the browser get confused when we attempt to select the whole node
                        // and the focus is not set correctly no matter what we do
                        _innerNode = '<div>' + __h + '</div>';
                        selectedElement.innerHTML = _innerNode;
                        taSelection.setSelectionToElementEnd(selectedElement.childNodes[0]);
                        selectedElement = taSelection.getSelectionElement();
                        //console.log(selectedElement.innerHTML);
                    } else if (selectedElement.tagName.toLowerCase() === 'p' &&
                        ourSelection && ourSelection.start &&
                        ourSelection.start.offset === 1 &&
                        ourSelection.end.offset === 1) {
                        //console.log('p special');
                        // we need to remove the </br> that firefox adds!
                        __h = selectedElement.innerHTML;
                        if (/<br>/i.test(__h)) {
                            // Firefox adds <br>'s and so we remove the <br>
                            __h = __h.replace(/<br>/i, '&#8203;');  // no space-space
                            selectedElement.innerHTML = __h;
                        }
                    } else if (selectedElement.tagName.toLowerCase() === 'li' &&
                        ourSelection && ourSelection.start &&
                        ourSelection.start.offset === ourSelection.end.offset) {
                        // we need to remove the </br> that firefox adds!
                        __h = selectedElement.innerHTML;
                        if (/<br>/i.test(__h)) {
                            // Firefox adds <br>'s and so we remove the <br>
                            __h = __h.replace(/<br>/i, '');  // nothing
                            selectedElement.innerHTML = __h;
                        }
                    }
                }
            }catch(e){}
            //console.log('************** selectedElement:', selectedElement);
            /* istanbul ignore if: */
            if (!selectedElement){return;}
            var $selected = angular.element(selectedElement);
            var tagName = (selectedElement && selectedElement.tagName && selectedElement.tagName.toLowerCase()) ||
                /* istanbul ignore next: */ "";
            if(command.toLowerCase() === 'insertorderedlist' || command.toLowerCase() === 'insertunorderedlist'){
                var selfTag = taBrowserTag((command.toLowerCase() === 'insertorderedlist')? 'ol' : 'ul');
                var selectedElements = taSelection.getOnlySelectedElements();
                //console.log('PPPPPPPPPPPPP', tagName, selfTag, selectedElements, tagName.match(BLOCKELEMENTS), $selected.hasClass('ta-bind'), $selected.parent()[0].tagName);
                if (selectedElements.length>1 && (tagName === 'ol' ||  tagName === 'ul' )) {
                    return listElementsToSelfTag($selected, selectedElements, selfTag, selfTag===tagName, taDefaultWrap);
                }
                if(tagName === selfTag){
                    // if all selected then we should remove the list
                    // grab all li elements and convert to taDefaultWrap tags
                    //console.log('tagName===selfTag');
                    if ($selected[0].childNodes.length !== selectedElements.length && selectedElements.length===1) {
                        $selected = angular.element(selectedElements[0]);
                        return listElementToSelfTag($selected.parent(), $selected, selfTag, true, taDefaultWrap);
                    } else {
                        return listToDefault($selected, taDefaultWrap);
                    }
                }else if(tagName === 'li' &&
                    $selected.parent()[0].tagName.toLowerCase() === selfTag &&
                    $selected.parent().children().length === 1){
                    // catch for the previous statement if only one li exists
                    return listToDefault($selected.parent(), taDefaultWrap);
                }else if(tagName === 'li' &&
                    $selected.parent()[0].tagName.toLowerCase() !== selfTag &&
                    $selected.parent().children().length === 1){
                    // catch for the previous statement if only one li exists
                    return listToList($selected.parent(), selfTag);
                }else if(tagName.match(BLOCKELEMENTS) && !$selected.hasClass('ta-bind')){
                    // if it's one of those block elements we have to change the contents
                    // if it's a ol/ul we are changing from one to the other
                    if (selectedElements.length) {
                        if ($selected[0].childNodes.length !== selectedElements.length && selectedElements.length===1) {
                            //console.log('&&&&&&&&&&&&&&& --------- &&&&&&&&&&&&&&&&', selectedElements[0], $selected[0].childNodes);
                            $selected = angular.element(selectedElements[0]);
                            return listElementToSelfTag($selected.parent(), $selected, selfTag, selfTag===tagName, taDefaultWrap);
                        }
                    }
                    if(tagName === 'ol' || tagName === 'ul'){
                        // now if this is a set of selected elements... behave diferently
                        return listToList($selected, selfTag);
                    }else{
                        var childBlockElements = false;
                        angular.forEach($selected.children(), function(elem){
                            if(elem.tagName.match(BLOCKELEMENTS)) {
                                childBlockElements = true;
                            }
                        });
                        if(childBlockElements){
                            return childElementsToList($selected.children(), $selected, selfTag);
                        }else{
                            return childElementsToList([angular.element('<div>' + selectedElement.innerHTML + '</div>')[0]], $selected, selfTag);
                        }
                    }
                }else if(tagName.match(BLOCKELEMENTS)){
                    // if we get here then the contents of the ta-bind are selected
                    _nodes = taSelection.getOnlySelectedElements();
                    //console.log('_nodes', _nodes, tagName);
                    if(_nodes.length === 0){
                        // here is if there is only text in ta-bind ie <div ta-bind>test content</div>
                        $target = angular.element('<' + selfTag + '><li>' + selectedElement.innerHTML + '</li></' + selfTag + '>');
                        $selected.html('');
                        $selected.append($target);
                    }else if(_nodes.length === 1 && (_nodes[0].tagName.toLowerCase() === 'ol' || _nodes[0].tagName.toLowerCase() === 'ul')){
                        if(_nodes[0].tagName.toLowerCase() === selfTag){
                            // remove
                            return listToDefault(angular.element(_nodes[0]), taDefaultWrap);
                        }else{
                            return listToList(angular.element(_nodes[0]), selfTag);
                        }
                    }else{
                        html = '';
                        var $nodes = [];
                        for(i = 0; i < _nodes.length; i++){
                            /* istanbul ignore else: catch for real-world can't make it occur in testing */
                            if(_nodes[i].nodeType !== 3){
                                var $n = angular.element(_nodes[i]);
                                /* istanbul ignore if: browser check only, phantomjs doesn't return children nodes but chrome at least does */
                                if(_nodes[i].tagName.toLowerCase() === 'li') continue;
                                else if(_nodes[i].tagName.toLowerCase() === 'ol' || _nodes[i].tagName.toLowerCase() === 'ul'){
                                    html += $n[0].innerHTML; // if it's a list, add all it's children
                                }else if(_nodes[i].tagName.toLowerCase() === 'span' && (_nodes[i].childNodes[0].tagName.toLowerCase() === 'ol' || _nodes[i].childNodes[0].tagName.toLowerCase() === 'ul')){
                                    html += $n[0].childNodes[0].innerHTML; // if it's a list, add all it's children
                                }else{
                                    html += '<' + taBrowserTag('li') + '>' + $n[0].innerHTML + '</' + taBrowserTag('li') + '>';
                                }
                                $nodes.unshift($n);
                            }
                        }
                        //console.log('$nodes', $nodes);
                        $target = angular.element('<' + selfTag + '>' + html + '</' + selfTag + '>');
                        $nodes.pop().replaceWith($target);
                        angular.forEach($nodes, function($node){ $node.remove(); });
                    }
                    taSelection.setSelectionToElementEnd($target[0]);
                    return;
                }
            }else if(command.toLowerCase() === 'formatblock'){
                optionsTagName = options.toLowerCase().replace(/[<>]/ig, '');
                if(optionsTagName.trim() === 'default') {
                    optionsTagName = taDefaultWrap;
                    options = '<' + taDefaultWrap + '>';
                }
                if(tagName === 'li') {
                    $target = $selected.parent();
                }
                else {
                    $target = $selected;
                }
                // find the first blockElement
                while(!$target[0].tagName || !$target[0].tagName.match(BLOCKELEMENTS) && !$target.parent().attr('contenteditable')){
                    $target = $target.parent();
                    /* istanbul ignore next */
                    tagName = ($target[0].tagName || '').toLowerCase();
                }
                if(tagName === optionsTagName){
                    // $target is wrap element
                    _nodes = $target.children();
                    var hasBlock = false;
                    for(i = 0; i < _nodes.length; i++){
                        hasBlock = hasBlock || _nodes[i].tagName.match(BLOCKELEMENTS);
                    }
                    if(hasBlock){
                        $target.after(_nodes);
                        next = $target.next();
                        $target.remove();
                        $target = next;
                    }else{
                        defaultWrapper.append($target[0].childNodes);
                        $target.after(defaultWrapper);
                        $target.remove();
                        $target = defaultWrapper;
                    }
                }else if($target.parent()[0].tagName.toLowerCase() === optionsTagName &&
                    !$target.parent().hasClass('ta-bind')){
                    //unwrap logic for parent
                    var blockElement = $target.parent();
                    var contents = blockElement.contents();
                    for(i = 0; i < contents.length; i ++){
                        /* istanbul ignore next: can't test - some wierd thing with how phantomjs works */
                        if(blockElement.parent().hasClass('ta-bind') && contents[i].nodeType === 3){
                            defaultWrapper = angular.element('<' + taDefaultWrap + '>');
                            defaultWrapper[0].innerHTML = contents[i].outerHTML;
                            contents[i] = defaultWrapper[0];
                        }
                        blockElement.parent()[0].insertBefore(contents[i], blockElement[0]);
                    }
                    blockElement.remove();
                }else if(tagName.match(LISTELEMENTS)){
                    // wrapping a list element
                    $target.wrap(options);
                }else{
                    // default wrap behaviour
                    _nodes = taSelection.getOnlySelectedElements();
                    if(_nodes.length === 0) {
                        // no nodes at all....
                        _nodes = [$target[0]];
                    }
                    // find the parent block element if any of the nodes are inline or text
                    for(i = 0; i < _nodes.length; i++){
                        if(_nodes[i].nodeType === 3 || !_nodes[i].tagName.match(BLOCKELEMENTS)){
                            while(_nodes[i].nodeType === 3 || !_nodes[i].tagName || !_nodes[i].tagName.match(BLOCKELEMENTS)){
                                _nodes[i] = _nodes[i].parentNode;
                            }
                        }
                    }
                    // remove any duplicates from the array of _nodes!
                    _nodes = _nodes.filter(function(value, index, self) {
                        return self.indexOf(value) === index;
                    });
                    // remove all whole taTextElement if it is here... unless it is the only element!
                    if (_nodes.length>1) {
                        _nodes = _nodes.filter(function (value, index, self) {
                            return !(value.nodeName.toLowerCase() === 'div' && /^taTextElement/.test(value.id));
                        });
                    }
                    if(angular.element(_nodes[0]).hasClass('ta-bind')){
                        $target = angular.element(options);
                        $target[0].innerHTML = _nodes[0].innerHTML;
                        _nodes[0].innerHTML = $target[0].outerHTML;
                    }else if(optionsTagName === 'blockquote'){
                        // blockquotes wrap other block elements
                        html = '';
                        for(i = 0; i < _nodes.length; i++){
                            html += _nodes[i].outerHTML;
                        }
                        $target = angular.element(options);
                        $target[0].innerHTML = html;
                        _nodes[0].parentNode.insertBefore($target[0],_nodes[0]);
                        for(i = _nodes.length - 1; i >= 0; i--){
                            /* istanbul ignore else:  */
                            if (_nodes[i].parentNode) _nodes[i].parentNode.removeChild(_nodes[i]);
                        }
                    } else /* istanbul ignore next: not tested since identical to blockquote */
                    if (optionsTagName === 'pre' && taSelection.getStateShiftKey()) {
                        //console.log('shift pre', _nodes);
                        // pre wrap other block elements
                        html = '';
                        for (i = 0; i < _nodes.length; i++) {
                            html += _nodes[i].outerHTML;
                        }
                        $target = angular.element(options);
                        $target[0].innerHTML = html;
                        _nodes[0].parentNode.insertBefore($target[0], _nodes[0]);
                        for (i = _nodes.length - 1; i >= 0; i--) {
                            /* istanbul ignore else:  */
                            if (_nodes[i].parentNode) _nodes[i].parentNode.removeChild(_nodes[i]);
                        }
                    }
                    else {
                        //console.log(optionsTagName, _nodes);
                        // regular block elements replace other block elements
                        for (i = 0; i < _nodes.length; i++) {
                            var newBlock = turnBlockIntoBlocks(_nodes[i], options);
                            if (_nodes[i] === $target[0]) {
                                $target = angular.element(newBlock);
                            }
                        }
                    }
                }
                taSelection.setSelectionToElementEnd($target[0]);
                // looses focus when we have the whole container selected and no text!
                // refocus on the shown display element, this fixes a bug when using firefox
                $target[0].focus();
                return;
            }else if(command.toLowerCase() === 'createlink'){
                /* istanbul ignore next: firefox specific fix */
                if (tagName === 'a') {
                    // already a link!!! we are just replacing it...
                    taSelection.getSelectionElement().href = options;
                    return;
                }
                var tagBegin = '<a href="' + options + '" target="' +
                        (defaultTagAttributes.a.target ? defaultTagAttributes.a.target : '') +
                        '">',
                    tagEnd = '</a>',
                    _selection = taSelection.getSelection();
                if(_selection.collapsed){
                    //console.log('collapsed');
                    // insert text at selection, then select then just let normal exec-command run
                    taSelection.insertHtml(tagBegin + options + tagEnd, topNode);
                }else if(rangy.getSelection().getRangeAt(0).canSurroundContents()){
                    var node = angular.element(tagBegin + tagEnd)[0];
                    rangy.getSelection().getRangeAt(0).surroundContents(node);
                }
                return;
            }else if(command.toLowerCase() === 'inserthtml'){
                //console.log('inserthtml');
                taSelection.insertHtml(options, topNode);
                return;
            }
            try{
                $document[0].execCommand(command, showUI, options);
            }catch(e){}
        };
    };
}]).service('taSelection', ['$document', 'taDOM', '$log',
/* istanbul ignore next: all browser specifics and PhantomJS dosen't seem to support half of it */
function($document, taDOM, $log){
    // need to dereference the document else the calls don't work correctly
    var _document = $document[0];
    var bShiftState;
    var brException = function (element, offset) {
        /* check if selection is a BR element at the beginning of a container. If so, get
        * the parentNode instead.
        * offset should be zero in this case. Otherwise, return the original
        * element.
        */
        if (element.tagName && element.tagName.match(/^br$/i) && offset === 0 && !element.previousSibling) {
            return {
                element: element.parentNode,
                offset: 0
            };
        } else {
            return {
                element: element,
                offset: offset
            };
        }
    };
    var api = {
        getSelection: function(){
            var range;
            try {
                // catch any errors from rangy and ignore the issue
                range = rangy.getSelection().getRangeAt(0);
            } catch(e) {
                //console.info(e);
                return undefined;
            }
            var container = range.commonAncestorContainer;
            var selection = {
                start: brException(range.startContainer, range.startOffset),
                end: brException(range.endContainer, range.endOffset),
                collapsed: range.collapsed
            };
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
            if (container.nodeType === 3) {
                if (container.parentNode.nodeName.toLowerCase() === 'div' &&
                    /^taTextElement/.test(container.parentNode.id)) {
                    // textNode where the parent is the whole <div>!!!
                    //console.log('textNode ***************** container:', container);
                } else {
                    container = container.parentNode;
                }
            }
            if (container.nodeName.toLowerCase() === 'div' &&
                /^taTextElement/.test(container.id)) {
                //console.log('*********taTextElement************');
                //console.log('commonAncestorContainer:', container);
                selection.start.element = container.childNodes[selection.start.offset];
                selection.end.element = container.childNodes[selection.end.offset];
                selection.container = container;
            } else {
                if (container.parentNode === selection.start.element ||
                    container.parentNode === selection.end.element) {
                    selection.container = container.parentNode;
                } else {
                    selection.container = container;
                }
            }
            //console.log('***selection container:', selection.container.nodeName, selection.start.offset, selection.container);
            return selection;
        },
        // if we use the LEFT_ARROW and we are at the special place <span>&#65279;</span> we move the cursor over by one...
        // Chrome and Firefox behave differently so so fix this for Firefox here.  No adjustment needed for Chrome.
        updateLeftArrowKey: function(element) {
            var range = rangy.getSelection().getRangeAt(0);
            if (range && range.collapsed) {
                var _nodes = api.getFlattenedDom(range);
                if (!_nodes.findIndex) return;
                var _node = range.startContainer;
                var indexStartContainer = _nodes.findIndex(function(element, index){
                    if (element.node===_node) return true;
                    var _indexp = element.parents.indexOf(_node);
                    return (_indexp !== -1);
                });
                var m;
                var nextNodeToRight;
                //console.log('indexStartContainer', indexStartContainer, _nodes.length, 'startContainer:', _node, _node === _nodes[indexStartContainer].node);
                _nodes.forEach(function (n, i) {
                    //console.log(i, n.node);
                    n.parents.forEach(function (nn, j){
                        //console.log(i, j, nn);
                    });
                });
                if (indexStartContainer+1 < _nodes.length) {
                    // we need the node just after this startContainer
                    // so we can check and see it this is a special place
                    nextNodeToRight = _nodes[indexStartContainer+1].node;
                    //console.log(nextNodeToRight, range.startContainer);
                }
                //console.log('updateLeftArrowKey', range.startOffset, range.startContainer.textContent);
                // this first section handles the case for Chrome browser
                // if the first character of the nextNode is a \ufeff we know that we are just before the special span...
                // and so we most left by one character
                if (nextNodeToRight && nextNodeToRight.textContent) {
                    m = /^\ufeff([^\ufeff]*)$/.exec(nextNodeToRight.textContent);
                    if (m) {
                        // we are before the special node with begins with a \ufeff character
                        //console.log('LEFT ...found it...', 'startOffset:', range.startOffset, m[0].length, m[1].length);
                        // no need to change anything in this case
                        return;
                    }
                }
                var nextNodeToLeft;
                if (indexStartContainer > 0) {
                    // we need the node just after this startContainer
                    // so we can check and see it this is a special place
                    nextNodeToLeft = _nodes[indexStartContainer-1].node;
                    //console.log(nextNodeToLeft, nextNodeToLeft);
                }
                if (range.startOffset === 0 && nextNodeToLeft) {
                    //console.log(nextNodeToLeft, range.startOffset, nextNodeToLeft.textContent);
                    m = /^\ufeff([^\ufeff]*)$/.exec(nextNodeToLeft.textContent);
                    if (m) {
                        //console.log('LEFT &&&&&&&&&&&&&&&&&&&...found it...&&&&&&&&&&&', nextNodeToLeft, m[0].length, m[1].length);
                        // move over to the left my one -- Firefox triggers this case
                        api.setSelectionToElementEnd(nextNodeToLeft);
                        return;
                    }
                }
            }
            return;
        },
        // if we use the RIGHT_ARROW and we are at the special place <span>&#65279;</span> we move the cursor over by one...
        updateRightArrowKey: function(element) {
            // we do not need to make any adjustments here, so we ignore all this code
            if (false) {
                var range = rangy.getSelection().getRangeAt(0);
                if (range && range.collapsed) {
                    var _nodes = api.getFlattenedDom(range);
                    if (!_nodes.findIndex) return;
                    var _node = range.startContainer;
                    var indexStartContainer = _nodes.findIndex(function (element, index) {
                        if (element.node === _node) return true;
                        var _indexp = element.parents.indexOf(_node);
                        return (_indexp !== -1);
                    });
                    var _sel;
                    var i;
                    var m;

                    // if the last character is a \ufeff we know that we are just before the special span...
                    // and so we most right by one character
                    var indexFound = _nodes.findIndex(function (n, index) {
                        if (n.textContent) {
                            var m = /^\ufeff([^\ufeff]*)$/.exec(n.textContent);
                            if (m) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    });
                    if (indexFound === -1) {
                        return;
                    }
                    //console.log(indexFound, range.startContainer, range.startOffset);
                    _node = _nodes[indexStartContainer];
                    //console.log('indexStartContainer', indexStartContainer);
                    if (_node && _node.textContent) {
                        m = /^\ufeff([^\ufeff]*)$/.exec(_node.textContent);
                        if (m && range.startOffset - 1 === m[1].length) {
                            //console.log('RIGHT found it...&&&&&&&&&&&', range.startOffset);
                            // no need to make any adjustment
                            return;
                        }
                    }
                    //console.log(range.startOffset);
                    if (_nodes && range.startOffset === 0) {
                        indexStartContainer = _nodes.indexOf(range.startContainer);
                        if (indexStartContainer !== -1 && indexStartContainer > 0) {
                            _node = _nodes[indexStartContainer - 1];
                            if (_node.textContent) {
                                m = /\ufeff([^\ufeff]*)$/.exec(_node.textContent);
                                if (m && true || range.startOffset === m[1].length + 1) {
                                    //console.log('RIGHT &&&&&&&&&&&&&&&&&&&...found it...&&&&&&&&&&&', range.startOffset, m[1].length);
                                    // no need to make any adjustment
                                    return;
                                }
                            }
                        }
                    }
                }
            }
        },
        getFlattenedDom: function(range) {
            var parent = range.commonAncestorContainer.parentNode;
            if (!parent) {
                return range.commonAncestorContainer.childNodes;
            }
            var nodes = Array.prototype.slice.call(parent.childNodes); // converts NodeList to Array
            var indexStartContainer = nodes.indexOf(range.startContainer);
            // make sure that we have a big enough set of nodes
            if (indexStartContainer+1 < nodes.length && indexStartContainer > 0) {
                // we are good
                // we can go down one node or up one node
            } else {
                if (parent.parentNode) {
                    parent = parent.parentNode;
                }
            }
            // now walk the parent
            nodes = [];
            function addNodes(_set) {
                if (_set.node.childNodes.length) {
                    var childNodes = Array.prototype.slice.call(_set.node.childNodes); // converts NodeList to Array
                    childNodes.forEach(function(n) {
                        var _t = _set.parents.slice();
                        if (_t.slice(-1)[0]!==_set.node) {
                            _t.push(_set.node);
                        }
                        addNodes({parents: _t, node: n});
                    });
                } else {
                    nodes.push({parents: _set.parents, node: _set.node});
                }
            }
            addNodes({parents: [parent], node: parent});
            return nodes;
        },
        getOnlySelectedElements: function(){
            var range = rangy.getSelection().getRangeAt(0);
            var container = range.commonAncestorContainer;
            // Node.TEXT_NODE === 3
            // Node.ELEMENT_NODE === 1
            // Node.COMMENT_NODE === 8
            // Check if the container is a text node and return its parent if so
            container = container.nodeType === 3 ? container.parentNode : container;
            // get the nodes in the range that are ELEMENT_NODE and are children of the container
            // in this range...
            return range.getNodes([1], function(node){
                return node.parentNode === container;
            });
        },
        // this includes the container element if all children are selected
        getAllSelectedElements: function(){
            var range = rangy.getSelection().getRangeAt(0);
            var container = range.commonAncestorContainer;
            // Node.TEXT_NODE === 3
            // Node.ELEMENT_NODE === 1
            // Node.COMMENT_NODE === 8
            // Check if the container is a text node and return its parent if so
            container = container.nodeType === 3 ? container.parentNode : container;
            // get the nodes in the range that are ELEMENT_NODE and are children of the container
            // in this range...
            var selectedNodes = range.getNodes([1], function(node){
                return node.parentNode === container;
            });
            var innerHtml = container.innerHTML;
            // remove the junk that rangy has put down
            innerHtml = innerHtml.replace(/<span id=.selectionBoundary[^>]+>\ufeff?<\/span>/ig, '');
            //console.log(innerHtml);
            //console.log(range.toHtml());
            //console.log(innerHtml === range.toHtml());
            if (innerHtml === range.toHtml() &&
                // not the whole taTextElement
                (!(container.nodeName.toLowerCase() === 'div' &&  /^taTextElement/.test(container.id)))
            ) {
                var arr = [];
                for(var i = selectedNodes.length; i--; arr.unshift(selectedNodes[i]));
                selectedNodes = arr;
                selectedNodes.push(container);
                //$log.debug(selectedNodes);
            }
            return selectedNodes;
        },
        // Some basic selection functions
        getSelectionElement: function () {
            var s = api.getSelection();
            if (s) {
                return api.getSelection().container;
            } else {
                return undefined;
            }
        },
        setSelection: function(elStart, elEnd, start, end){
            var range = rangy.createRange();

            range.setStart(elStart, start);
            range.setEnd(elEnd, end);

            rangy.getSelection().setSingleRange(range);
        },
        setSelectionBeforeElement: function (el){
            var range = rangy.createRange();

            range.selectNode(el);
            range.collapse(true);

            rangy.getSelection().setSingleRange(range);
        },
        setSelectionAfterElement: function (el){
            var range = rangy.createRange();

            range.selectNode(el);
            range.collapse(false);

            rangy.getSelection().setSingleRange(range);
        },
        setSelectionToElementStart: function (el){
            var range = rangy.createRange();

            range.selectNodeContents(el);
            range.collapse(true);

            rangy.getSelection().setSingleRange(range);
        },
        setSelectionToElementEnd: function (el){
            var range = rangy.createRange();

            range.selectNodeContents(el);
            range.collapse(false);
            if(el.childNodes && el.childNodes[el.childNodes.length - 1] && el.childNodes[el.childNodes.length - 1].nodeName === 'br'){
                range.startOffset = range.endOffset = range.startOffset - 1;
            }
            rangy.getSelection().setSingleRange(range);
        },
        setStateShiftKey: function(bS) {
            bShiftState = bS;
        },
        getStateShiftKey: function() {
            return bShiftState;
        },
        // from http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
        // topNode is the contenteditable normally, all manipulation MUST be inside this.
        insertHtml: function(html, topNode){
            var parent, secondParent, _childI, nodes, i, lastNode, _tempFrag;
            var element = angular.element("<div>" + html + "</div>");
            var range = rangy.getSelection().getRangeAt(0);
            var frag = _document.createDocumentFragment();
            var children = element[0].childNodes;
            var isInline = true;

            if(children.length > 0){
                // NOTE!! We need to do the following:
                // check for blockelements - if they exist then we have to split the current element in half (and all others up to the closest block element) and insert all children in-between.
                // If there are no block elements, or there is a mixture we need to create textNodes for the non wrapped text (we don't want them spans messing up the picture).
                nodes = [];
                for(_childI = 0; _childI < children.length; _childI++){
                    var _cnode = children[_childI];
                    if (_cnode.nodeName.toLowerCase() === 'p' &&
                        _cnode.innerHTML.trim() === '') { // empty p element
                        continue;
                    }
                    /****************
                     *  allow any text to be inserted...
                    if((   _cnode.nodeType === 3 &&
                           _cnode.nodeValue === '\ufeff'[0] &&
                           _cnode.nodeValue.trim() === '') // empty no-space space element
                        ) {
                        // no change to isInline
                        nodes.push(_cnode);
                        continue;
                    }
                    if(_cnode.nodeType === 3 &&
                         _cnode.nodeValue.trim() === '') { // empty text node
                        continue;
                    }
                    *****************/
                    isInline = isInline && !BLOCKELEMENTS.test(_cnode.nodeName);
                    nodes.push(_cnode);
                }
                for(var _n = 0; _n < nodes.length; _n++) {
                    lastNode = frag.appendChild(nodes[_n]);
                }
                if( !isInline &&
                    range.collapsed &&
                    /^(|<br(|\/)>)$/i.test(range.startContainer.innerHTML) ) {
                    range.selectNode(range.startContainer);
                }
            }else{
                isInline = true;
                // paste text of some sort
                lastNode = frag = _document.createTextNode(html);
            }

            // Other Edge case - selected data spans multiple blocks.
            if(isInline){
                range.deleteContents();
            }else{ // not inline insert
                if(range.collapsed && range.startContainer !== topNode){
                    if(range.startContainer.innerHTML && range.startContainer.innerHTML.match(/^<[^>]*>$/i)){
                        // this log is to catch when innerHTML is something like `<img ...>`
                        parent = range.startContainer;
                        if(range.startOffset === 1){
                            // before single tag
                            range.setStartAfter(parent);
                            range.setEndAfter(parent);
                        }else{
                            // after single tag
                            range.setStartBefore(parent);
                            range.setEndBefore(parent);
                        }
                    }else{
                        // split element into 2 and insert block element in middle
                        if(range.startContainer.nodeType === 3 && range.startContainer.parentNode !== topNode){ // if text node
                            parent = range.startContainer.parentNode;
                            secondParent = parent.cloneNode();
                            // split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
                            taDOM.splitNodes(parent.childNodes, parent, secondParent, range.startContainer, range.startOffset);

                            // Escape out of the inline tags like b
                            while(!VALIDELEMENTS.test(parent.nodeName)){
                                angular.element(parent).after(secondParent);
                                parent = parent.parentNode;
                                var _lastSecondParent = secondParent;
                                secondParent = parent.cloneNode();
                                // split the nodes into two lists - before and after, splitting the node with the selection into 2 text nodes.
                                taDOM.splitNodes(parent.childNodes, parent, secondParent, _lastSecondParent);
                            }
                        }else{
                            parent = range.startContainer;
                            secondParent = parent.cloneNode();
                            taDOM.splitNodes(parent.childNodes, parent, secondParent, undefined, undefined, range.startOffset);
                        }

                        angular.element(parent).after(secondParent);
                        // put cursor to end of inserted content
                        //console.log('setStartAfter', parent);
                        range.setStartAfter(parent);
                        range.setEndAfter(parent);

                        if(/^(|<br(|\/)>)$/i.test(parent.innerHTML.trim())){
                            range.setStartBefore(parent);
                            range.setEndBefore(parent);
                            angular.element(parent).remove();
                        }
                        if(/^(|<br(|\/)>)$/i.test(secondParent.innerHTML.trim())) angular.element(secondParent).remove();
                        if(parent.nodeName.toLowerCase() === 'li'){
                            _tempFrag = _document.createDocumentFragment();
                            for(i = 0; i < frag.childNodes.length; i++){
                                element = angular.element('<li>');
                                taDOM.transferChildNodes(frag.childNodes[i], element[0]);
                                taDOM.transferNodeAttributes(frag.childNodes[i], element[0]);
                                _tempFrag.appendChild(element[0]);
                            }
                            frag = _tempFrag;
                            if(lastNode){
                                lastNode = frag.childNodes[frag.childNodes.length - 1];
                                lastNode = lastNode.childNodes[lastNode.childNodes.length - 1];
                            }
                        }
                    }
                }else{
                    range.deleteContents();
                }
            }

            range.insertNode(frag);
            if(lastNode){
                api.setSelectionToElementEnd(lastNode);
            }
        }

        /* NOT FUNCTIONAL YET
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
    };
    return api;
}]).service('taDOM', function(){
    var taDOM = {
        // recursive function that returns an array of angular.elements that have the passed attribute set on them
        getByAttribute: function(element, attribute){
            var resultingElements = [];
            var childNodes = element.children();
            if(childNodes.length){
                angular.forEach(childNodes, function(child){
                    resultingElements = resultingElements.concat(taDOM.getByAttribute(angular.element(child), attribute));
                });
            }
            if(element.attr(attribute) !== undefined) resultingElements.push(element);
            return resultingElements;
        },

        transferChildNodes: function(source, target){
            // clear out target
            target.innerHTML = '';
            while(source.childNodes.length > 0) target.appendChild(source.childNodes[0]);
            return target;
        },

        splitNodes: function(nodes, target1, target2, splitNode, subSplitIndex, splitIndex){
            if(!splitNode && isNaN(splitIndex)) throw new Error('taDOM.splitNodes requires a splitNode or splitIndex');
            var startNodes = document.createDocumentFragment();
            var endNodes = document.createDocumentFragment();
            var index = 0;

            while(nodes.length > 0 && (isNaN(splitIndex) || splitIndex !== index) && nodes[0] !== splitNode){
                startNodes.appendChild(nodes[0]); // this removes from the nodes array (if proper childNodes object.
                index++;
            }

            if(!isNaN(subSplitIndex) && subSplitIndex >= 0 && nodes[0]){
                startNodes.appendChild(document.createTextNode(nodes[0].nodeValue.substring(0, subSplitIndex)));
                nodes[0].nodeValue = nodes[0].nodeValue.substring(subSplitIndex);
            }
            while(nodes.length > 0) endNodes.appendChild(nodes[0]);

            taDOM.transferChildNodes(startNodes, target1);
            taDOM.transferChildNodes(endNodes, target2);
        },

        transferNodeAttributes: function(source, target){
            for(var i = 0; i < source.attributes.length; i++) target.setAttribute(source.attributes[i].name, source.attributes[i].value);
            return target;
        }
    };
    return taDOM;
});

angular.module('textAngular.validators', [])
.directive('taMaxText', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl){
            var max = parseInt(scope.$eval(attrs.taMaxText));
            if (isNaN(max)){
                throw('Max text must be an integer');
            }
            attrs.$observe('taMaxText', function(value){
                max = parseInt(value);
                if (isNaN(max)){
                    throw('Max text must be an integer');
                }
                if (ctrl.$dirty){
                    ctrl.$validate();
                }
            });
            ctrl.$validators.taMaxText = function(viewValue){
                var source = angular.element('<div/>');
                source.html(viewValue);
                return source.text().length <= max;
            };
        }
    };
}).directive('taMinText', function(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl){
            var min = parseInt(scope.$eval(attrs.taMinText));
            if (isNaN(min)){
                throw('Min text must be an integer');
            }
            attrs.$observe('taMinText', function(value){
                min = parseInt(value);
                if (isNaN(min)){
                    throw('Min text must be an integer');
                }
                if (ctrl.$dirty){
                    ctrl.$validate();
                }
            });
            ctrl.$validators.taMinText = function(viewValue){
                var source = angular.element('<div/>');
                source.html(viewValue);
                return !source.text().length || source.text().length >= min;
            };
        }
    };
});
angular.module('textAngular.taBind', ['textAngular.factories', 'textAngular.DOM'])
.service('_taBlankTest', [function(){
    return function(_blankVal){
        // we radically restructure this code.
        // what was here before was incredibly fragile.
        // What we do now is to check that the html is non-blank visually
        // which we check by looking at html->text
        if(!_blankVal) return true;
        // find first non-tag match - ie start of string or after tag that is not whitespace
        // var t0 = performance.now();
        // Takes a small fraction of a mSec to do this...
        var _text_ = stripHtmlToText(_blankVal);
        // var t1 = performance.now();
        // console.log('Took', (t1 - t0).toFixed(4), 'milliseconds to generate:');
        if (_text_=== '') {
            // img generates a visible item so it is not blank!
            if (/<img[^>]+>/.test(_blankVal)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    };
}])
.directive('taButton', [function(){
    return {
        link: function(scope, element, attrs){
            element.attr('unselectable', 'on');
            element.on('mousedown', function(e, eventData){
                /* istanbul ignore else: this is for catching the jqLite testing*/
                if(eventData) angular.extend(e, eventData);
                // this prevents focusout from firing on the editor when clicking toolbar buttons
                e.preventDefault();
                return false;
            });
        }
    };
}])
.directive('taBind', [
        'taSanitize', '$timeout', '$document', 'taFixChrome', 'taBrowserTag',
        'taSelection', 'taSelectableElements', 'taApplyCustomRenderers', 'taOptions',
        '_taBlankTest', '$parse', 'taDOM', 'textAngularManager',
        function(
            taSanitize, $timeout, $document, taFixChrome, taBrowserTag,
            taSelection, taSelectableElements, taApplyCustomRenderers, taOptions,
            _taBlankTest, $parse, taDOM, textAngularManager){
    // Uses for this are textarea or input with ng-model and ta-bind='text'
    // OR any non-form element with contenteditable="contenteditable" ta-bind="html|text" ng-model
    return {
        priority: 2, // So we override validators correctly
        require: ['ngModel','?ngModelOptions'],
        link: function(scope, element, attrs, controller){
            var ngModel = controller[0];
            var ngModelOptions = controller[1] || {};
            // the option to use taBind on an input or textarea is required as it will sanitize all input into it correctly.
            var _isContentEditable = element.attr('contenteditable') !== undefined && element.attr('contenteditable');
            var _isInputFriendly = _isContentEditable || element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input';
            var _isReadonly = false;
            var _focussed = false;
            var _skipRender = false;
            var _disableSanitizer = attrs.taUnsafeSanitizer || taOptions.disableSanitizer;
            var _keepStyles = attrs.taKeepStyles || taOptions.keepStyles;
            var _lastKey;
            // see http://www.javascripter.net/faq/keycodes.htm for good information
            // NOTE Mute On|Off 173 (Opera MSIE Safari Chrome) 181 (Firefox)
            // BLOCKED_KEYS are special keys...
            // Tab, pause/break, CapsLock, Esc, Page Up, End, Home,
            // Left arrow, Up arrow, Right arrow, Down arrow, Insert, Delete,
            // f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12
            // NumLock, ScrollLock
            var BLOCKED_KEYS = /^(9|19|20|27|33|34|35|36|37|38|39|40|45|112|113|114|115|116|117|118|119|120|121|122|123|144|145)$/i;
            // UNDO_TRIGGER_KEYS - spaces, enter, delete, backspace, all punctuation
            // Backspace, Enter, Space, Delete, (; :) (Firefox), (= +) (Firefox),
            // Numpad +, Numpad -, (; :), (= +),
            // (, <), (- _), (. >), (/ ?), (` ~), ([ {), (\ |), (] }), (' ")
            // NOTE - Firefox: 173 = (- _) -- adding this to UNDO_TRIGGER_KEYS
            var UNDO_TRIGGER_KEYS = /^(8|13|32|46|59|61|107|109|173|186|187|188|189|190|191|192|219|220|221|222)$/i;
            var _pasteHandler;

            // defaults to the paragraph element, but we need the line-break or it doesn't allow you to type into the empty element
            // non IE is '<p><br/></p>', ie is '<p></p>' as for once IE gets it correct...
            var _defaultVal, _defaultTest;

            var _CTRL_KEY = 0x0001;
            var _META_KEY = 0x0002;
            var _ALT_KEY = 0x0004;
            var _SHIFT_KEY = 0x0008;
            // KEYCODEs we use
            var _ENTER_KEYCODE = 13;
            var _SHIFT_KEYCODE = 16;
            var _TAB_KEYCODE = 9;
            var _LEFT_ARROW_KEYCODE = 37;
            var _RIGHT_ARROW_KEYCODE = 39;
            // map events to special keys...
            // mappings is an array of maps from events to specialKeys as declared in textAngularSetup
            var _keyMappings = [
                //		ctrl/command + z
                {
                    specialKey: 'UndoKey',
                    forbiddenModifiers: _ALT_KEY + _SHIFT_KEY,
                    mustHaveModifiers: [_META_KEY + _CTRL_KEY],
                    keyCode: 90
                },
                //		ctrl/command + shift + z
                {
                    specialKey: 'RedoKey',
                    forbiddenModifiers: _ALT_KEY,
                    mustHaveModifiers: [_META_KEY + _CTRL_KEY, _SHIFT_KEY],
                    keyCode: 90
                },
                //		ctrl/command + y
                {
                    specialKey: 'RedoKey',
                    forbiddenModifiers: _ALT_KEY + _SHIFT_KEY,
                    mustHaveModifiers: [_META_KEY + _CTRL_KEY],
                    keyCode: 89
                },
                //		TabKey
                {
                    specialKey: 'TabKey',
                    forbiddenModifiers: _META_KEY + _SHIFT_KEY + _ALT_KEY + _CTRL_KEY,
                    mustHaveModifiers: [],
                    keyCode: _TAB_KEYCODE
                },
                //		shift + TabKey
                {
                    specialKey: 'ShiftTabKey',
                    forbiddenModifiers: _META_KEY + _ALT_KEY + _CTRL_KEY,
                    mustHaveModifiers: [_SHIFT_KEY],
                    keyCode: _TAB_KEYCODE
                }
            ];
            function _mapKeys(event) {
                var specialKey;
                _keyMappings.forEach(function (map){
                    if (map.keyCode === event.keyCode) {
                        var netModifiers = (event.metaKey ? _META_KEY: 0) +
                            (event.ctrlKey ? _CTRL_KEY: 0) +
                            (event.shiftKey ? _SHIFT_KEY: 0) +
                            (event.altKey ? _ALT_KEY: 0);
                        if (map.forbiddenModifiers & netModifiers) return;
                        if (map.mustHaveModifiers.every(function (modifier) { return netModifiers & modifier; })){
                            specialKey = map.specialKey;
                        }
                    }
                });
                return specialKey;
            }

            // set the default to be a paragraph value
            if(attrs.taDefaultWrap === undefined) attrs.taDefaultWrap = 'p';
            /* istanbul ignore next: ie specific test */
            if(attrs.taDefaultWrap === ''){
                _defaultVal = '';
                _defaultTest = (_browserDetect.ie === undefined)? '<div><br></div>' : (_browserDetect.ie >= 11)? '<p><br></p>' : (_browserDetect.ie <= 8)? '<P>&nbsp;</P>' : '<p>&nbsp;</p>';
            }else{
                _defaultVal = (_browserDetect.ie === undefined || _browserDetect.ie >= 11)?
                    (attrs.taDefaultWrap.toLowerCase() === 'br' ? '<BR><BR>' : '<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>') :
                    (_browserDetect.ie <= 8)?
                        '<' + attrs.taDefaultWrap.toUpperCase() + '></' + attrs.taDefaultWrap.toUpperCase() + '>' :
                        '<' + attrs.taDefaultWrap + '></' + attrs.taDefaultWrap + '>';
                _defaultTest = (_browserDetect.ie === undefined || _browserDetect.ie >= 11)?
                    (attrs.taDefaultWrap.toLowerCase() === 'br' ? '<br><br>' : '<' + attrs.taDefaultWrap + '><br></' + attrs.taDefaultWrap + '>') :
                    (_browserDetect.ie <= 8)?
                        '<' + attrs.taDefaultWrap.toUpperCase() + '>&nbsp;</' + attrs.taDefaultWrap.toUpperCase() + '>' :
                        '<' + attrs.taDefaultWrap + '>&nbsp;</' + attrs.taDefaultWrap + '>';
            }

            /* istanbul ignore else */
            if(!ngModelOptions.$options) ngModelOptions.$options = {}; // ng-model-options support

            var _ensureContentWrapped = function(value) {
                if (_taBlankTest(value)) return value;
                var domTest = angular.element("<div>" + value + "</div>");
                //console.log('domTest.children().length():', domTest.children().length);
                //console.log('_ensureContentWrapped', domTest.children());
                //console.log(value, attrs.taDefaultWrap);
                if (domTest.children().length === 0) {
                    // if we have a <br> and the attrs.taDefaultWrap is a <p> we need to remove the <br>
                    //value = value.replace(/<br>/i, '');
                    value = "<" + attrs.taDefaultWrap + ">" + value + "</" + attrs.taDefaultWrap + ">";
                } else {
                    var _children = domTest[0].childNodes;
                    var i;
                    var _foundBlockElement = false;
                    for (i = 0; i < _children.length; i++) {
                        if (_foundBlockElement = _children[i].nodeName.toLowerCase().match(BLOCKELEMENTS)) break;
                    }
                    if (!_foundBlockElement) {
                        value = "<" + attrs.taDefaultWrap + ">" + value + "</" + attrs.taDefaultWrap + ">";
                    }
                    else{
                        value = "";
                        for(i = 0; i < _children.length; i++){
                            var node = _children[i];
                            var nodeName = node.nodeName.toLowerCase();
                            //console.log('node#:', i, 'name:', nodeName);
                            if(nodeName === '#comment') {
                                value += '<!--' + node.nodeValue + '-->';
                            } else if(nodeName === '#text') {
                                // determine if this is all whitespace, if so, we will leave it as it is.
                                // otherwise, we will wrap it as it is
                                var text = node.textContent;
                                if (!text.trim()) {
                                    // just whitespace
                                    value += text;
                                } else {
                                    // not pure white space so wrap in <p>...</p> or whatever attrs.taDefaultWrap is set to.
                                    value += "<" + attrs.taDefaultWrap + ">" + text + "</" + attrs.taDefaultWrap + ">";
                                }
                            } else if(!nodeName.match(BLOCKELEMENTS)){
                                /* istanbul ignore  next: Doesn't seem to trigger on tests */
                                var _subVal = (node.outerHTML || node.nodeValue);
                                /* istanbul ignore else: Doesn't seem to trigger on tests, is tested though */
                                if(_subVal.trim() !== '')
                                    value += "<" + attrs.taDefaultWrap + ">" + _subVal + "</" + attrs.taDefaultWrap + ">";
                                else value += _subVal;
                            } else {
                                value += node.outerHTML;
                            }
                            //console.log(value);
                        }
                    }
                }
                //console.log(value);
                return value;
            };

            if(attrs.taPaste) {
                _pasteHandler = $parse(attrs.taPaste);
            }

            element.addClass('ta-bind');

            var _undoKeyupTimeout;

            scope['$undoManager' + (attrs.id || '')] = ngModel.$undoManager = {
                _stack: [],
                _index: 0,
                _max: 1000,
                push: function(value){
                    if((typeof value === "undefined" || value === null) ||
                        ((typeof this.current() !== "undefined" && this.current() !== null) && value === this.current())) return value;
                    if(this._index < this._stack.length - 1){
                        this._stack = this._stack.slice(0,this._index+1);
                    }
                    this._stack.push(value);
                    if(_undoKeyupTimeout) $timeout.cancel(_undoKeyupTimeout);
                    if(this._stack.length > this._max) this._stack.shift();
                    this._index = this._stack.length - 1;
                    return value;
                },
                undo: function(){
                    return this.setToIndex(this._index-1);
                },
                redo: function(){
                    return this.setToIndex(this._index+1);
                },
                setToIndex: function(index){
                    if(index < 0 || index > this._stack.length - 1){
                        return undefined;
                    }
                    this._index = index;
                    return this.current();
                },
                current: function(){
                    return this._stack[this._index];
                }
            };

            // in here we are undoing the converts used elsewhere to prevent the < > and & being displayed when they shouldn't in the code.
            var _compileHtml = function(){
                if(_isContentEditable) {
                    return element[0].innerHTML;
                }
                if(_isInputFriendly) {
                    return element.val();
                }
                throw ('textAngular Error: attempting to update non-editable taBind');
            };

            var selectorClickHandler = function(event){
                // emit the element-select event, pass the element
                scope.$emit('ta-element-select', this);
                event.preventDefault();
                return false;
            };

            //used for updating when inserting wrapped elements
            var _reApplyOnSelectorHandlers = scope['reApplyOnSelectorHandlers' + (attrs.id || '')] = function(){
                /* istanbul ignore else */
                if(!_isReadonly) angular.forEach(taSelectableElements, function(selector){
                    // check we don't apply the handler twice
                    element.find(selector)
                        .off('click', selectorClickHandler)
                        .on('click', selectorClickHandler);
                });
            };

            var _setViewValue = function(_val, triggerUndo, skipRender){
                _skipRender = skipRender || false;
                if(typeof triggerUndo === "undefined" || triggerUndo === null) triggerUndo = true && _isContentEditable; // if not contentEditable then the native undo/redo is fine
                if(typeof _val === "undefined" || _val === null) _val = _compileHtml();
                if(_taBlankTest(_val)){
                    // this avoids us from tripping the ng-pristine flag if we click in and out with out typing
                    if(ngModel.$viewValue !== '') ngModel.$setViewValue('');
                    if(triggerUndo && ngModel.$undoManager.current() !== '') ngModel.$undoManager.push('');
                }else{
                    _reApplyOnSelectorHandlers();
                    if(ngModel.$viewValue !== _val){
                        ngModel.$setViewValue(_val);
                        if(triggerUndo) ngModel.$undoManager.push(_val);
                    }
                }
                ngModel.$render();
            };

            var _setInnerHTML = function(newval){
                element[0].innerHTML = newval;
            };

            var _redoUndoTimeout;
            var _undo = scope['$undoTaBind' + (attrs.id || '')] = function(){
                /* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
                if(!_isReadonly && _isContentEditable){
                    var content = ngModel.$undoManager.undo();
                    if(typeof content !== "undefined" && content !== null){
                        _setInnerHTML(content);
                        _setViewValue(content, false);
                        if(_redoUndoTimeout) $timeout.cancel(_redoUndoTimeout);
                        _redoUndoTimeout = $timeout(function(){
                            element[0].focus();
                            taSelection.setSelectionToElementEnd(element[0]);
                        }, 1);
                    }
                }
            };

            var _redo = scope['$redoTaBind' + (attrs.id || '')] = function(){
                /* istanbul ignore else: can't really test it due to all changes being ignored as well in readonly */
                if(!_isReadonly && _isContentEditable){
                    var content = ngModel.$undoManager.redo();
                    if(typeof content !== "undefined" && content !== null){
                        _setInnerHTML(content);
                        _setViewValue(content, false);
                        /* istanbul ignore next */
                        if(_redoUndoTimeout) $timeout.cancel(_redoUndoTimeout);
                        _redoUndoTimeout = $timeout(function(){
                            element[0].focus();
                            taSelection.setSelectionToElementEnd(element[0]);
                        }, 1);
                    }
                }
            };

            //used for updating when inserting wrapped elements
            scope['updateTaBind' + (attrs.id || '')] = function(){
                if(!_isReadonly) _setViewValue(undefined, undefined, true);
            };

            // catch DOM XSS via taSanitize
            // Sanitizing both ways is identical
            var _sanitize = function(unsafe){
                return (ngModel.$oldViewValue = taSanitize(taFixChrome(unsafe, _keepStyles), ngModel.$oldViewValue, _disableSanitizer));
            };

            // trigger the validation calls
            if(element.attr('required')) ngModel.$validators.required = function(modelValue, viewValue) {
                return !_taBlankTest(modelValue || viewValue);
            };
            // parsers trigger from the above keyup function or any other time that the viewValue is updated and parses it for storage in the ngModel
            ngModel.$parsers.push(_sanitize);
            ngModel.$parsers.unshift(_ensureContentWrapped);
            // because textAngular is bi-directional (which is awesome) we need to also sanitize values going in from the server
            ngModel.$formatters.push(_sanitize);
            ngModel.$formatters.unshift(_ensureContentWrapped);
            ngModel.$formatters.unshift(function(value){
                return ngModel.$undoManager.push(value || '');
            });

            //this code is used to update the models when data is entered/deleted
            if(_isInputFriendly){
                scope.events = {};
                if(!_isContentEditable){
                    // if a textarea or input just add in change and blur handlers, everything else is done by angulars input directive
                    element.on('change blur', scope.events.change = scope.events.blur = function(){
                        if(!_isReadonly) ngModel.$setViewValue(_compileHtml());
                    });

                    element.on('keydown', scope.events.keydown = function(event, eventData){
                        /* istanbul ignore else: this is for catching the jqLite testing*/
                        if(eventData) angular.extend(event, eventData);
                        // Reference to http://stackoverflow.com/questions/6140632/how-to-handle-tab-in-textarea
                        /* istanbul ignore else: otherwise normal functionality */
                        if(event.keyCode === _TAB_KEYCODE){ // tab was pressed
                            // get caret position/selection
                            var start = this.selectionStart;
                            var end = this.selectionEnd;

                            var value = element.val();
                            if(event.shiftKey){
                                // find \t
                                var _linebreak = value.lastIndexOf('\n', start), _tab = value.lastIndexOf('\t', start);
                                if(_tab !== -1 && _tab >= _linebreak){
                                    // set textarea value to: text before caret + tab + text after caret
                                    element.val(value.substring(0, _tab) + value.substring(_tab + 1));

                                    // put caret at right position again (add one for the tab)
                                    this.selectionStart = this.selectionEnd = start - 1;
                                }
                            }else{
                                // set textarea value to: text before caret + tab + text after caret
                                element.val(value.substring(0, start) + "\t" + value.substring(end));

                                // put caret at right position again (add one for the tab)
                                this.selectionStart = this.selectionEnd = start + 1;
                            }
                            // prevent the focus lose
                            event.preventDefault();
                        }
                    });

                    var _repeat = function(string, n){
                        var result = '';
                        for(var _n = 0; _n < n; _n++) result += string;
                        return result;
                    };

                    // add a forEach function that will work on a NodeList, etc..
                    var forEach = function (array, callback, scope) {
                        for (var i= 0; i<array.length; i++) {
                            callback.call(scope, i, array[i]);
                        }
                    };

                    // handle <ul> or <ol> nodes
                    var recursiveListFormat = function(listNode, tablevel){
                        var _html = '';
                        var _subnodes = listNode.childNodes;
                        tablevel++;
                        // tab out and add the <ul> or <ol> html piece
                        _html += _repeat('\t', tablevel-1) + listNode.outerHTML.substring(0, 4);
                        forEach(_subnodes, function (index, node) {
                            /* istanbul ignore next: browser catch */
                            var nodeName = node.nodeName.toLowerCase();
                            if (nodeName === '#comment') {
                                _html += '<!--' + node.nodeValue + '-->';
                                return;
                            }
                            if (nodeName === '#text') {
                                _html += node.textContent;
                                return;
                            }
                            /* istanbul ignore next: not tested, and this was original code -- so not wanting to possibly cause an issue, leaving it... */
                            if(!node.outerHTML) {
                                // no html to add
                                return;
                            }
                            if(nodeName === 'ul' || nodeName === 'ol') {
                                _html += '\n' + recursiveListFormat(node, tablevel);
                            }
                            else {
                                // no reformatting within this subnode, so just do the tabing...
                                _html += '\n' + _repeat('\t', tablevel) + node.outerHTML;
                            }
                        });
                        // now add on the </ol> or </ul> piece
                        _html += '\n' + _repeat('\t', tablevel-1) + listNode.outerHTML.substring(listNode.outerHTML.lastIndexOf('<'));
                        return _html;
                    };
                    // handle formating of something like:
                    // <ol><!--First comment-->
                    //  <li>Test Line 1<!--comment test list 1--></li>
                    //    <ul><!--comment ul-->
                    //      <li>Nested Line 1</li>
                    //        <!--comment between nested lines--><li>Nested Line 2</li>
                    //    </ul>
                    //  <li>Test Line 3</li>
                    // </ol>
                    ngModel.$formatters.unshift(function(htmlValue){
                        // tabulate the HTML so it looks nicer
                        //
                        // first get a list of the nodes...
                        // we do this by using the element parser...
                        //
                        // doing this -- which is simpiler -- breaks our tests...
                        //var _nodes=angular.element(htmlValue);
                        var _nodes = angular.element('<div>' + htmlValue + '</div>')[0].childNodes;
                        if(_nodes.length > 0){
                            // do the reformatting of the layout...
                            htmlValue = '';
                            forEach(_nodes, function (index, node) {
                                var nodeName = node.nodeName.toLowerCase();
                                if (nodeName === '#comment') {
                                    htmlValue += '<!--' + node.nodeValue + '-->';
                                    return;
                                }
                                if (nodeName === '#text') {
                                    htmlValue += node.textContent;
                                    return;
                                }
                                /* istanbul ignore next: not tested, and this was original code -- so not wanting to possibly cause an issue, leaving it... */
                                if(!node.outerHTML)
                                {
                                    // nothing to format!
                                    return;
                                }
                                if(htmlValue.length > 0) {
                                    // we aready have some content, so drop to a new line
                                    htmlValue += '\n';
                                }
                                if(nodeName === 'ul' || nodeName === 'ol') {
                                    // okay a set of list stuff we want to reformat in a nested way
                                    htmlValue += '' + recursiveListFormat(node, 0);
                                }
                                else {
                                    // just use the original without any additional formating
                                    htmlValue += '' + node.outerHTML;
                                }
                            });
                        }
                        return htmlValue;
                    });
                }else{
                    // all the code specific to contenteditable divs
                    var _processingPaste = false;
                    /* istanbul ignore next: phantom js cannot test this for some reason */
                    var processpaste = function(text) {
                       var _isOneNote = text!==undefined? text.match(/content=["']*OneNote.File/i): false;
                        /* istanbul ignore else: don't care if nothing pasted */
                        //console.log(text);
                        if(text && text.trim().length){
                            // test paste from word/microsoft product
                            if(text.match(/class=["']*Mso(Normal|List)/i) || text.match(/content=["']*Word.Document/i) || text.match(/content=["']*OneNote.File/i)){
                                var textFragment = text.match(/<!--StartFragment-->([\s\S]*?)<!--EndFragment-->/i);
                                if(!textFragment) textFragment = text;
                                else textFragment = textFragment[1];
                                textFragment = textFragment.replace(/<o:p>[\s\S]*?<\/o:p>/ig, '').replace(/class=(["']|)MsoNormal(["']|)/ig, '');
                                var dom = angular.element("<div>" + textFragment + "</div>");
                                var targetDom = angular.element("<div></div>");
                                var _list = {
                                    element: null,
                                    lastIndent: [],
                                    lastLi: null,
                                    isUl: false
                                };
                                _list.lastIndent.peek = function(){
                                    var n = this.length;
                                    if (n>0) return this[n-1];
                                };
                                var _resetList = function(isUl){
                                    _list.isUl = isUl;
                                    _list.element = angular.element(isUl ? "<ul>" : "<ol>");
                                    _list.lastIndent = [];
                                    _list.lastIndent.peek = function(){
                                        var n = this.length;
                                        if (n>0) return this[n-1];
                                    };
                                    _list.lastLevelMatch = null;
                                };
                                for(var i = 0; i <= dom[0].childNodes.length; i++){
                                    if(!dom[0].childNodes[i] || dom[0].childNodes[i].nodeName === "#text"){
                                        continue;
                                    } else {
                                        var tagName = dom[0].childNodes[i].tagName.toLowerCase();
                                        if(tagName !== 'p' &&
                                            tagName !== 'ul' &&
                                            tagName !== 'h1' &&
                                            tagName !== 'h2' &&
                                            tagName !== 'h3' &&
                                            tagName !== 'h4' &&
                                            tagName !== 'h5' &&
                                            tagName !== 'h6' &&
                                            tagName !== 'table'){
                                            continue;
                                        }
                                    }
                                    var el = angular.element(dom[0].childNodes[i]);
                                    var _listMatch = (el.attr('class') || '').match(/MsoList(Bullet|Number|Paragraph)(CxSp(First|Middle|Last)|)/i);

                                    if(_listMatch){
                                        if(el[0].childNodes.length < 2 || el[0].childNodes[1].childNodes.length < 1){
                                            continue;
                                        }
                                        var isUl = _listMatch[1].toLowerCase() === 'bullet' || (_listMatch[1].toLowerCase() !== 'number' && !(/^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(el[0].childNodes[1].innerHTML) || /^[^0-9a-z<]*[0-9a-z]+[^0-9a-z<>]</i.test(el[0].childNodes[1].childNodes[0].innerHTML)));
                                        var _indentMatch = (el.attr('style') || '').match(/margin-left:([\-\.0-9]*)/i);
                                        var indent = parseFloat((_indentMatch)?_indentMatch[1]:0);
                                        var _levelMatch = (el.attr('style') || '').match(/mso-list:l([0-9]+) level([0-9]+) lfo[0-9+]($|;)/i);
                                        // prefers the mso-list syntax

                                        if(_levelMatch && _levelMatch[2]) indent = parseInt(_levelMatch[2]);

                                        if ((_levelMatch && (!_list.lastLevelMatch || _levelMatch[1] !== _list.lastLevelMatch[1])) || !_listMatch[3] || _listMatch[3].toLowerCase() === 'first' || (_list.lastIndent.peek() === null) || (_list.isUl !== isUl && _list.lastIndent.peek() === indent)) {
                                            _resetList(isUl);
                                            targetDom.append(_list.element);
                                        } else if (_list.lastIndent.peek() != null && _list.lastIndent.peek() < indent){
                                            _list.element = angular.element(isUl ? '<ul>' : '<ol>');
                                            _list.lastLi.append(_list.element);
                                        } else if (_list.lastIndent.peek() != null && _list.lastIndent.peek() > indent){
                                            while(_list.lastIndent.peek() != null && _list.lastIndent.peek() > indent){
                                                if(_list.element.parent()[0].tagName.toLowerCase() === 'li'){
                                                    _list.element = _list.element.parent();
                                                    continue;
                                                }else if(/[uo]l/i.test(_list.element.parent()[0].tagName.toLowerCase())){
                                                    _list.element = _list.element.parent();
                                                }else{ // else it's it should be a sibling
                                                    break;
                                                }
                                                _list.lastIndent.pop();
                                            }
                                            _list.isUl = _list.element[0].tagName.toLowerCase() === 'ul';
                                            if (isUl !== _list.isUl) {
                                                _resetList(isUl);
                                                targetDom.append(_list.element);
                                            }
                                        }

                                        _list.lastLevelMatch = _levelMatch;
                                        if(indent !== _list.lastIndent.peek()) _list.lastIndent.push(indent);
                                        _list.lastLi = angular.element('<li>');
                                        _list.element.append(_list.lastLi);
                                        _list.lastLi.html(el.html().replace(/<!(--|)\[if !supportLists\](--|)>[\s\S]*?<!(--|)\[endif\](--|)>/ig, ''));
                                        el.remove();
                                    }else{
                                        _resetList(false);
                                        targetDom.append(el);
                                    }
                                }
                                var _unwrapElement = function(node){
                                    node = angular.element(node);
                                    for(var _n = node[0].childNodes.length - 1; _n >= 0; _n--) node.after(node[0].childNodes[_n]);
                                    node.remove();
                                };

                                angular.forEach(targetDom.find('span'), function(node){
                                    node.removeAttribute('lang');
                                    if(node.attributes.length <= 0) _unwrapElement(node);
                                });
                                angular.forEach(targetDom.find('font'), _unwrapElement);

                                text = targetDom.html();
                                if(_isOneNote){
                                    text = targetDom.html() || dom.html();
                                }
                                // LF characters instead of spaces in some spots and they are replaced by '/n', so we need to just swap them to spaces
                                text = text.replace(/\n/g, ' ');
                            }else{
                                // remove unnecessary chrome insert
                                text = text.replace(/<(|\/)meta[^>]*?>/ig, '');
                                if(text.match(/<[^>]*?(ta-bind)[^>]*?>/)){
                                    // entire text-angular or ta-bind has been pasted, REMOVE AT ONCE!!
                                    if(text.match(/<[^>]*?(text-angular)[^>]*?>/)){
                                        var _el = angular.element('<div>' + text + '</div>');
                                        _el.find('textarea').remove();
                                        for(var _b = 0; _b < binds.length; _b++){
                                            var _target = binds[_b][0].parentNode.parentNode;
                                            for(var _c = 0; _c < binds[_b][0].childNodes.length; _c++){
                                                _target.parentNode.insertBefore(binds[_b][0].childNodes[_c], _target);
                                            }
                                            _target.parentNode.removeChild(_target);
                                        }
                                        text = _el.html().replace('<br class="Apple-interchange-newline">', '');
                                    }
                                }else if(text.match(/^<span/)){
                                    // in case of pasting only a span - chrome paste, remove them. THis is just some wierd formatting
                                    // if we remove the '<span class="Apple-converted-space"> </span>' here we destroy the spacing
                                    // on paste from even ourselves!
                                    if (!text.match(/<span class=(\"Apple-converted-space\"|\'Apple-converted-space\')>.<\/span>/ig)) {
                                        text = text.replace(/<(|\/)span[^>]*?>/ig, '');
                                    }
                                }
                                // Webkit on Apple tags
                                text = text.replace(/<br class="Apple-interchange-newline"[^>]*?>/ig, '').replace(/<span class="Apple-converted-space">( |&nbsp;)<\/span>/ig, '&nbsp;');
                            }

                            if (/<li(\s.*)?>/i.test(text) && /(<ul(\s.*)?>|<ol(\s.*)?>).*<li(\s.*)?>/i.test(text) === false) {
                                // insert missing parent of li element
                                text = text.replace(/<li(\s.*)?>.*<\/li(\s.*)?>/i, '<ul>$&</ul>');
                            }

                            // parse whitespace from plaintext input, starting with preceding spaces that get stripped on paste
                            text = text.replace(/^[ |\u00A0]+/gm, function (match) {
                                var result = '';
                                for (var i = 0; i < match.length; i++) {
                                    result += '&nbsp;';
                                }
                                return result;
                            }).replace(/\n|\r\n|\r/g, '<br />').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');

                            if(_pasteHandler) text = _pasteHandler(scope, {$html: text}) || text;

                            // turn span vertical-align:super into <sup></sup>
                            text = text.replace(/<span style=("|')([^<]*?)vertical-align\s*:\s*super;?([^>]*?)("|')>([^<]+?)<\/span>/g, "<sup style='$2$3'>$5</sup>");

                            text = taSanitize(text, '', _disableSanitizer);
                            //console.log('DONE\n', text);

                            taSelection.insertHtml(text, element[0]);
                            $timeout(function(){
                                ngModel.$setViewValue(_compileHtml());
                                _processingPaste = false;
                                element.removeClass('processing-paste');
                            }, 0);
                        }else{
                            _processingPaste = false;
                            element.removeClass('processing-paste');
                        }
                    };

                    element.on('paste', scope.events.paste = function(e, eventData){
                        /* istanbul ignore else: this is for catching the jqLite testing*/
                        if(eventData) angular.extend(e, eventData);
                        if(_isReadonly || _processingPaste){
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }

                        // Code adapted from http://stackoverflow.com/questions/2176861/javascript-get-clipboard-data-on-paste-event-cross-browser/6804718#6804718
                        _processingPaste = true;
                        element.addClass('processing-paste');
                        var pastedContent;
                        var clipboardData = (e.originalEvent || e).clipboardData;
                        /* istanbul ignore next: Handle legacy IE paste */
                        if ( !clipboardData && window.clipboardData && window.clipboardData.getData ){
                            pastedContent = window.clipboardData.getData("Text");
                            processpaste(pastedContent);
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        }
                        if (clipboardData && clipboardData.getData && clipboardData.types.length > 0) {// Webkit - get data from clipboard, put into editdiv, cleanup, then cancel event
                            var _types = "";
                            for(var _t = 0; _t < clipboardData.types.length; _t++){
                                _types += " " + clipboardData.types[_t];
                            }
                            /* istanbul ignore next: browser tests */
                            if (/text\/html/i.test(_types)) {
                                pastedContent = clipboardData.getData('text/html');
                            } else if (/text\/plain/i.test(_types)) {
                                pastedContent = clipboardData.getData('text/plain');
                            }
                            processpaste(pastedContent);
                            e.stopPropagation();
                            e.preventDefault();
                            return false;
                        } else {// Everything else - empty editdiv and allow browser to paste content into it, then cleanup
                            var _savedSelection = rangy.saveSelection(),
                                _tempDiv = angular.element('<div class="ta-hidden-input" contenteditable="true"></div>');
                            $document.find('body').append(_tempDiv);
                            _tempDiv[0].focus();
                            $timeout(function(){
                                // restore selection
                                rangy.restoreSelection(_savedSelection);
                                processpaste(_tempDiv[0].innerHTML);
                                element[0].focus();
                                _tempDiv.remove();
                            }, 0);
                        }
                    });
                    element.on('cut', scope.events.cut = function(e){
                        // timeout to next is needed as otherwise the paste/cut event has not finished actually changing the display
                        if(!_isReadonly) $timeout(function(){
                            ngModel.$setViewValue(_compileHtml());
                        }, 0);
                        else e.preventDefault();
                    });

                    element.on('keydown', scope.events.keydown = function(event, eventData){
                        /* istanbul ignore else: this is for catching the jqLite testing*/
                        if(eventData) angular.extend(event, eventData);
                        if (event.keyCode === _SHIFT_KEYCODE) {
                            taSelection.setStateShiftKey(true);
                        } else {
                            taSelection.setStateShiftKey(false);
                        }
                        event.specialKey = _mapKeys(event);
                        var userSpecialKey;
                        /* istanbul ignore next: difficult to test */
                        taOptions.keyMappings.forEach(function (mapping) {
                            if (event.specialKey === mapping.commandKeyCode) {
                                // taOptions has remapped this binding... so
                                // we disable our own
                                event.specialKey = undefined;
                            }
                            if (mapping.testForKey(event)) {
                                userSpecialKey = mapping.commandKeyCode;
                            }
                            if ((mapping.commandKeyCode === 'UndoKey') || (mapping.commandKeyCode === 'RedoKey')) {
                                // this is necessary to fully stop the propagation.
                                if (!mapping.enablePropagation) {
                                    event.preventDefault();
                                }
                            }
                        });
                        /* istanbul ignore next: difficult to test */
                        if (typeof userSpecialKey !== 'undefined') {
                            event.specialKey = userSpecialKey;
                        }
                        /* istanbul ignore next: difficult to test as can't seem to select */
                        if ((typeof event.specialKey !== 'undefined') && (
                                event.specialKey !== 'UndoKey' || event.specialKey !== 'RedoKey'
                            )) {
                            event.preventDefault();
                            textAngularManager.sendKeyCommand(scope, event);
                        }
                        /* istanbul ignore else: readonly check */
                        if(!_isReadonly){
                            if (event.specialKey==='UndoKey') {
                                _undo();
                                event.preventDefault();
                            }
                            if (event.specialKey==='RedoKey') {
                                _redo();
                                event.preventDefault();
                            }
                            /* istanbul ignore next: difficult to test as can't seem to select */
                            if(event.keyCode === _ENTER_KEYCODE && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey)
                            {
                                var contains = function(a, obj) {
                                    for (var i = 0; i < a.length; i++) {
                                        if (a[i] === obj) {
                                            return true;
                                        }
                                    }
                                    return false;
                                };
                                var $selection;
                                var selection = taSelection.getSelectionElement();
                                // shifted to nodeName here from tagName since it is more widely supported see: http://stackoverflow.com/questions/4878484/difference-between-tagname-and-nodename
                                if(!selection.nodeName.match(VALIDELEMENTS)) return;
                                var _new = angular.element(_defaultVal);
                                // if we are in the last element of a blockquote, or ul or ol and the element is blank
                                // we need to pull the element outside of the said type
                                var moveOutsideElements = ['blockquote', 'ul', 'ol'];
                                if (contains(moveOutsideElements, selection.parentNode.tagName.toLowerCase())) {
                                    if (/^<br(|\/)>$/i.test(selection.innerHTML.trim()) && !selection.nextSibling) {
                                        // if last element is blank, pull element outside.
                                        $selection = angular.element(selection);
                                        var _parent = $selection.parent();
                                        _parent.after(_new);
                                        $selection.remove();
                                        if (_parent.children().length === 0) _parent.remove();
                                        taSelection.setSelectionToElementStart(_new[0]);
                                        event.preventDefault();
                                    }
                                    if (/^<[^>]+><br(|\/)><\/[^>]+>$/i.test(selection.innerHTML.trim())) {
                                        $selection = angular.element(selection);
                                        $selection.after(_new);
                                        $selection.remove();
                                        taSelection.setSelectionToElementStart(_new[0]);
                                        event.preventDefault();
                                    }
                                }
                            }
                        }
                    });
                    var _keyupTimeout;
                    element.on('keyup', scope.events.keyup = function(event, eventData){
                        /* istanbul ignore else: this is for catching the jqLite testing*/
                        if(eventData) angular.extend(event, eventData);
                        taSelection.setStateShiftKey(false);	// clear the ShiftKey state
                        /* istanbul ignore next: FF specific bug fix */
                        if (event.keyCode === _TAB_KEYCODE) {
                            var _selection = taSelection.getSelection();
                            if(_selection.start.element === element[0] && element.children().length) taSelection.setSelectionToElementStart(element.children()[0]);
                            return;
                        }
                        // we do this here during the 'keyup' so that the browser has already moved the slection by one character...
                        if (event.keyCode === _LEFT_ARROW_KEYCODE && !event.shiftKey) {
                            taSelection.updateLeftArrowKey(element);
                        }
                        // we do this here during the 'keyup' so that the browser has already moved the slection by one character...
                        if (event.keyCode === _RIGHT_ARROW_KEYCODE && !event.shiftKey) {
                            taSelection.updateRightArrowKey(element);
                        }
                        if(_undoKeyupTimeout) $timeout.cancel(_undoKeyupTimeout);
                        if(!_isReadonly && !BLOCKED_KEYS.test(event.keyCode)){
                            /* istanbul ignore next: Ignore any _ENTER_KEYCODE that has ctrlKey, metaKey or alKey */
                            if (event.keyCode === _ENTER_KEYCODE && (event.ctrlKey || event.metaKey || event.altKey)) {
                                // we ignore any ENTER_	KEYCODE that is anything but plain or a shift one...
                            } else {
                                // if enter - insert new taDefaultWrap, if shift+enter insert <br/>
                                if(_defaultVal !== '' && _defaultVal !== '<BR><BR>' && event.keyCode === _ENTER_KEYCODE && !event.ctrlKey && !event.metaKey && !event.altKey){
                                    var selection = taSelection.getSelectionElement();
                                    while(!selection.nodeName.match(VALIDELEMENTS) && selection !== element[0]){
                                        selection = selection.parentNode;
                                    }
                                    if(!event.shiftKey){
                                        // new paragraph, br should be caught correctly
                                        // shifted to nodeName here from tagName since it is more widely supported see: http://stackoverflow.com/questions/4878484/difference-between-tagname-and-nodename
                                        //console.log('Enter', selection.nodeName, attrs.taDefaultWrap, selection.innerHTML.trim());
                                        if(selection.tagName.toLowerCase() !==
                                            attrs.taDefaultWrap &&
                                            selection.nodeName.toLowerCase() !== 'li' &&
                                            (selection.innerHTML.trim() === '' || selection.innerHTML.trim() === '<br>')
                                        ) {
                                            // Chrome starts with a <div><br></div> after an EnterKey
                                            // so we replace this with the _defaultVal
                                            var _new = angular.element(_defaultVal);
                                            angular.element(selection).replaceWith(_new);
                                            taSelection.setSelectionToElementStart(_new[0]);
                                        }
                                    } else {
                                        // shift + Enter
                                        var tagName = selection.tagName.toLowerCase();
                                        //console.log('Shift+Enter', selection.tagName, attrs.taDefaultWrap, selection.innerHTML.trim());
                                        // For an LI: We see: LI p ....<br><br>
                                        // For a P: We see: P p ....<br><br>
                                        // on Safari, the browser ignores the Shift+Enter and acts just as an Enter Key
                                        // For an LI: We see: LI p <br>
                                        // For a P: We see: P p <br>
                                        if((tagName === attrs.taDefaultWrap ||
                                            tagName === 'li' ||
                                            tagName === 'pre' ||
                                            tagName === 'div') &&
                                            !/.+<br><br>/.test(selection.innerHTML.trim())) {
                                            var ps = selection.previousSibling;
                                            //console.log('wrong....', ps);
                                            // we need to remove this selection and fix the previousSibling up...
                                            if (ps) {
                                                ps.innerHTML = ps.innerHTML + '<br><br>';
                                                angular.element(selection).remove();
                                                taSelection.setSelectionToElementEnd(ps);
                                            }
                                        }
                                    }
                                }
                                var val = _compileHtml();
                                if(_defaultVal !== '' && (val.trim() === '' || val.trim() === '<br>')){
                                    _setInnerHTML(_defaultVal);
                                    taSelection.setSelectionToElementStart(element.children()[0]);
                                }else if(val.substring(0, 1) !== '<' && attrs.taDefaultWrap !== ''){
                                    /* we no longer do this, since there can be comments here and white space
                                     var _savedSelection = rangy.saveSelection();
                                     val = _compileHtml();
                                     val = "<" + attrs.taDefaultWrap + ">" + val + "</" + attrs.taDefaultWrap + ">";
                                     _setInnerHTML(val);
                                     rangy.restoreSelection(_savedSelection);
                                     */
                                }
                                var triggerUndo = _lastKey !== event.keyCode && UNDO_TRIGGER_KEYS.test(event.keyCode);
                                if(_keyupTimeout) $timeout.cancel(_keyupTimeout);
                                _keyupTimeout = $timeout(function() {
                                    _setViewValue(val, triggerUndo, true);
                                }, ngModelOptions.$options.debounce || 400);
                                if(!triggerUndo) _undoKeyupTimeout = $timeout(function(){ ngModel.$undoManager.push(val); }, 250);
                                _lastKey = event.keyCode;
                            }
                        }
                    });

                    // when there is a change from a spelling correction in the browser, the only
                    // change that is seen is a 'input' and the $watch('html') sees nothing... So
                    // we added this element.on('input') to catch this change and call the _setViewValue()
                    // so the ngModel is updated and all works as it should.
                    var _inputTimeout;
                    element.on('input', function() {
                        if (_compileHtml() !== ngModel.$viewValue) {
                            // we wait a time now to allow the natural $watch('html') to handle this change
                            // and then after a 1 second delay, if there is still a difference we will do the
                            // _setViewValue() call.
                            /* istanbul ignore if: can't test */
                            if(_inputTimeout) $timeout.cancel(_inputTimeout);
                            /* istanbul ignore next: cant' test? */
                            _inputTimeout = $timeout(function() {
                                var _savedSelection = rangy.saveSelection();
                                var _val = _compileHtml();
                                if (_val !== ngModel.$viewValue) {
                                    //console.log('_setViewValue');
                                    //console.log('old:', ngModel.$viewValue);
                                    //console.log('new:', _val);
                                    _setViewValue(_val, true);
                                }
                                // if the savedSelection marker is gone at this point, we cannot restore the selection!!!
                                //console.log('rangy.restoreSelection', ngModel.$viewValue.length, _savedSelection);
                                if (ngModel.$viewValue.length !== 0) {
                                    rangy.restoreSelection(_savedSelection);
                                }
                            }, 1000);
                        }
                    });

                    element.on('blur', scope.events.blur = function(){
                        _focussed = false;
                        /* istanbul ignore else: if readonly don't update model */
                        if(!_isReadonly){
                            _setViewValue(undefined, undefined, true);
                        }else{
                            _skipRender = true; // don't redo the whole thing, just check the placeholder logic
                            ngModel.$render();
                        }
                    });

                    // Placeholders not supported on ie 8 and below
                    if(attrs.placeholder && (_browserDetect.ie > 8 || _browserDetect.ie === undefined)){
                        var rule;
                        if(attrs.id) rule = addCSSRule('#' + attrs.id + '.placeholder-text:before', 'content: "' + attrs.placeholder + '"');
                        else throw('textAngular Error: An unique ID is required for placeholders to work');

                        scope.$on('$destroy', function(){
                            removeCSSRule(rule);
                        });
                    }

                    element.on('focus', scope.events.focus = function(){
                        _focussed = true;
                        element.removeClass('placeholder-text');
                        _reApplyOnSelectorHandlers();
                    });

                    element.on('mouseup', scope.events.mouseup = function(){
                        var _selection = taSelection.getSelection();
                        if(_selection && _selection.start.element === element[0] && element.children().length) taSelection.setSelectionToElementStart(element.children()[0]);
                    });

                    // prevent propagation on mousedown in editor, see #206
                    element.on('mousedown', scope.events.mousedown = function(event, eventData){
                        /* istanbul ignore else: this is for catching the jqLite testing*/
                        if(eventData) angular.extend(event, eventData);
                        event.stopPropagation();
                    });
                }
            }

            var fileDropHandler = function(event, eventData){
                /* istanbul ignore else: this is for catching the jqLite testing*/
                if(eventData) angular.extend(event, eventData);
                // emit the drop event, pass the element, preventing should be done elsewhere
                if(!dropFired && !_isReadonly){
                    dropFired = true;
                    var dataTransfer;
                    if(event.originalEvent) dataTransfer = event.originalEvent.dataTransfer;
                    else dataTransfer = event.dataTransfer;
                    scope.$emit('ta-drop-event', this, event, dataTransfer);
                    $timeout(function(){
                        dropFired = false;
                        _setViewValue(undefined, undefined, true);
                    }, 100);
                }
            };

            var _renderTimeout;
            var _renderInProgress = false;
            // changes to the model variable from outside the html/text inputs
            ngModel.$render = function(){
                /* istanbul ignore if: Catches rogue renders, hard to replicate in tests */
                if(_renderInProgress) return;
                else _renderInProgress = true;
                // catch model being null or undefined
                var val = ngModel.$viewValue || '';
                // if the editor isn't focused it needs to be updated, otherwise it's receiving user input
                if(!_skipRender){
                    /* istanbul ignore else: in other cases we don't care */
                    if(_isContentEditable && _focussed){
                        // update while focussed
                        element.removeClass('placeholder-text');
                        /* istanbul ignore next: don't know how to test this */
                        if(_renderTimeout) $timeout.cancel(_renderTimeout);
                        _renderTimeout = $timeout(function(){
                            /* istanbul ignore if: Can't be bothered testing this... */
                            if(!_focussed){
                                element[0].focus();
                                taSelection.setSelectionToElementEnd(element.children()[element.children().length - 1]);
                            }
                            _renderTimeout = undefined;
                        }, 1);
                    }
                    if(_isContentEditable){
                        // WYSIWYG Mode
                        if(attrs.placeholder){
                            if(val === ''){
                                // blank
                                _setInnerHTML(_defaultVal);
                            }else{
                                // not-blank
                                _setInnerHTML(val);
                            }
                        }else{
                            _setInnerHTML((val === '') ? _defaultVal : val);
                        }
                        // if in WYSIWYG and readOnly we kill the use of links by clicking
                        if(!_isReadonly){
                            _reApplyOnSelectorHandlers();
                            element.on('drop', fileDropHandler);
                        }else{
                            element.off('drop', fileDropHandler);
                        }
                    }else if(element[0].tagName.toLowerCase() !== 'textarea' && element[0].tagName.toLowerCase() !== 'input'){
                        // make sure the end user can SEE the html code as a display. This is a read-only display element
                        _setInnerHTML(taApplyCustomRenderers(val));
                    }else{
                        // only for input and textarea inputs
                        element.val(val);
                    }
                }
                if(_isContentEditable && attrs.placeholder){
                    if(val === ''){
                        if(_focussed) element.removeClass('placeholder-text');
                        else element.addClass('placeholder-text');
                    }else{
                        element.removeClass('placeholder-text');
                    }
                }
                _renderInProgress = _skipRender = false;
            };

            if(attrs.taReadonly){
                //set initial value
                _isReadonly = scope.$eval(attrs.taReadonly);
                if(_isReadonly){
                    element.addClass('ta-readonly');
                    // we changed to readOnly mode (taReadonly='true')
                    if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
                        element.attr('disabled', 'disabled');
                    }
                    if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')){
                        element.removeAttr('contenteditable');
                    }
                }else{
                    element.removeClass('ta-readonly');
                    // we changed to NOT readOnly mode (taReadonly='false')
                    if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
                        element.removeAttr('disabled');
                    }else if(_isContentEditable){
                        element.attr('contenteditable', 'true');
                    }
                }
                // taReadonly only has an effect if the taBind element is an input or textarea or has contenteditable='true' on it.
                // Otherwise it is readonly by default
                scope.$watch(attrs.taReadonly, function(newVal, oldVal){
                    if(oldVal === newVal) return;
                    if(newVal){
                        element.addClass('ta-readonly');
                        // we changed to readOnly mode (taReadonly='true')
                        if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
                            element.attr('disabled', 'disabled');
                        }
                        if(element.attr('contenteditable') !== undefined && element.attr('contenteditable')){
                            element.removeAttr('contenteditable');
                        }
                        // turn ON selector click handlers
                        angular.forEach(taSelectableElements, function(selector){
                            element.find(selector).on('click', selectorClickHandler);
                        });
                        element.off('drop', fileDropHandler);
                    }else{
                        element.removeClass('ta-readonly');
                        // we changed to NOT readOnly mode (taReadonly='false')
                        if(element[0].tagName.toLowerCase() === 'textarea' || element[0].tagName.toLowerCase() === 'input'){
                            element.removeAttr('disabled');
                        }else if(_isContentEditable){
                            element.attr('contenteditable', 'true');
                        }
                        // remove the selector click handlers
                        angular.forEach(taSelectableElements, function(selector){
                            element.find(selector).off('click', selectorClickHandler);
                        });
                        element.on('drop', fileDropHandler);
                    }
                    _isReadonly = newVal;
                });
            }

            // Initialise the selectableElements
            // if in WYSIWYG and readOnly we kill the use of links by clicking
            if(_isContentEditable && !_isReadonly){
                angular.forEach(taSelectableElements, function(selector){
                    element.find(selector).on('click', selectorClickHandler);
                });
                element.on('drop', fileDropHandler);
            }
        }
    };
}]);

// this global var is used to prevent multiple fires of the drop event. Needs to be global to the textAngular file.
var dropFired = false;
var textAngular = angular.module("textAngular", ['ngSanitize', 'textAngularSetup', 'textAngular.factories', 'textAngular.DOM', 'textAngular.validators', 'textAngular.taBind']); //This makes ngSanitize required

textAngular.config([function(){
    // clear taTools variable. Just catches testing and any other time that this config may run multiple times...
    angular.forEach(taTools, function(value, key){ delete taTools[key];	});
}]);

textAngular.directive("textAngular", [
    '$compile', '$timeout', 'taOptions', 'taSelection', 'taExecCommand',
    'textAngularManager', '$document', '$animate', '$log', '$q', '$parse',
    function($compile, $timeout, taOptions, taSelection, taExecCommand,
        textAngularManager, $document, $animate, $log, $q, $parse){
        return {
            require: '?ngModel',
            scope: {},
            restrict: "EA",
            priority: 2, // So we override validators correctly
            link: function(scope, element, attrs, ngModel){
                // all these vars should not be accessable outside this directive
                var _keydown, _keyup, _keypress, _mouseup, _focusin, _focusout,
                    _originalContents, _editorFunctions,
                    _serial = (attrs.serial) ? attrs.serial : Math.floor(Math.random() * 10000000000000000),
                    _taExecCommand, _resizeMouseDown, _updateSelectedStylesTimeout;
                var _resizeTimeout;

                scope._name = (attrs.name) ? attrs.name : 'textAngularEditor' + _serial;

                var oneEvent = function(_element, event, action){
                    $timeout(function(){
                        _element.one(event, action);
                    }, 100);
                };
                _taExecCommand = taExecCommand(attrs.taDefaultWrap);
                // get the settings from the defaults and add our specific functions that need to be on the scope
                angular.extend(scope, angular.copy(taOptions), {
                    // wraps the selection in the provided tag / execCommand function. Should only be called in WYSIWYG mode.
                    wrapSelection: function(command, opt, isSelectableElementTool){
                        // we restore the saved selection that was saved when focus was lost
                        /* NOT FUNCTIONAL YET */
                        /* textAngularManager.restoreFocusSelection(scope._name, scope); */
                        if(command.toLowerCase() === "undo"){
                            scope['$undoTaBindtaTextElement' + _serial]();
                        }else if(command.toLowerCase() === "redo"){
                            scope['$redoTaBindtaTextElement' + _serial]();
                        }else{
                            // catch errors like FF erroring when you try to force an undo with nothing done
                            _taExecCommand(command, false, opt, scope.defaultTagAttributes);
                            if(isSelectableElementTool){
                                // re-apply the selectable tool events
                                scope['reApplyOnSelectorHandlerstaTextElement' + _serial]();
                            }
                            // refocus on the shown display element, this fixes a display bug when using :focus styles to outline the box.
                            // You still have focus on the text/html input it just doesn't show up
                            scope.displayElements.text[0].focus();
                        }
                    },
                    showHtml: scope.$eval(attrs.taShowHtml) || false
                });
                // setup the options from the optional attributes
                if(attrs.taFocussedClass)			scope.classes.focussed = attrs.taFocussedClass;
                if(attrs.taTextEditorClass)			scope.classes.textEditor = attrs.taTextEditorClass;
                if(attrs.taHtmlEditorClass)			scope.classes.htmlEditor = attrs.taHtmlEditorClass;
                if(attrs.taDefaultTagAttributes){
                    try	{
                        //	TODO: This should use angular.merge to enhance functionality once angular 1.4 is required
                        angular.extend(scope.defaultTagAttributes, angular.fromJson(attrs.taDefaultTagAttributes));
                    } catch (error) {
                        $log.error(error);
                    }
                }
                // optional setup functions
                if(attrs.taTextEditorSetup)			scope.setup.textEditorSetup = scope.$parent.$eval(attrs.taTextEditorSetup);
                if(attrs.taHtmlEditorSetup)			scope.setup.htmlEditorSetup = scope.$parent.$eval(attrs.taHtmlEditorSetup);
                // optional fileDropHandler function
                if(attrs.taFileDrop)				scope.fileDropHandler = scope.$parent.$eval(attrs.taFileDrop);
                else								scope.fileDropHandler = scope.defaultFileDropHandler;

                _originalContents = element[0].innerHTML;
                // clear the original content
                element[0].innerHTML = '';

                // Setup the HTML elements as variable references for use later
                scope.displayElements = {
                    // we still need the hidden input even with a textarea as the textarea may have invalid/old input in it,
                    // wheras the input will ALLWAYS have the correct value.
                    forminput: angular.element("<input type='hidden' tabindex='-1' style='display: none;'>"),
                    html: angular.element("<textarea></textarea>"),
                    text: angular.element("<div></div>"),
                    // other toolbased elements
                    scrollWindow: angular.element("<div class='ta-scroll-window'></div>"),
                    popover: angular.element('<div class="popover fade bottom" style="max-width: none; width: 305px;"></div>'),
                    popoverArrow: angular.element('<div class="arrow"></div>'),
                    popoverContainer: angular.element('<div class="popover-content"></div>'),
                    resize: {
                        overlay: angular.element('<div class="ta-resizer-handle-overlay"></div>'),
                        background: angular.element('<div class="ta-resizer-handle-background"></div>'),
                        anchors: [
                            angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tl"></div>'),
                            angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-tr"></div>'),
                            angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-bl"></div>'),
                            angular.element('<div class="ta-resizer-handle-corner ta-resizer-handle-corner-br"></div>')
                        ],
                        info: angular.element('<div class="ta-resizer-handle-info"></div>')
                    }
                };

                // Setup the popover
                scope.displayElements.popover.append(scope.displayElements.popoverArrow);
                scope.displayElements.popover.append(scope.displayElements.popoverContainer);
                scope.displayElements.scrollWindow.append(scope.displayElements.popover);

                scope.displayElements.popover.on('mousedown', function(e, eventData){
                    /* istanbul ignore else: this is for catching the jqLite testing*/
                    if(eventData) angular.extend(e, eventData);
                    // this prevents focusout from firing on the editor when clicking anything in the popover
                    e.preventDefault();
                    return false;
                });

                /* istanbul ignore next: popover resize and scroll events handled */
                scope.handlePopoverEvents = function() {
                    if (scope.displayElements.popover.css('display')==='block') {
                        if(_resizeTimeout) $timeout.cancel(_resizeTimeout);
                        _resizeTimeout = $timeout(function() {
                            //console.log('resize', scope.displayElements.popover.css('display'));
                            scope.reflowPopover(scope.resizeElement);
                            scope.reflowResizeOverlay(scope.resizeElement);
                        }, 100);
                    }
                };

                /* istanbul ignore next: browser resize check */
                angular.element(window).on('resize', scope.handlePopoverEvents);

                /* istanbul ignore next: browser scroll check */
                angular.element(window).on('scroll', scope.handlePopoverEvents);

                // we want to know if a given node has a scrollbar!
                // credit to lotif on http://stackoverflow.com/questions/4880381/check-whether-html-element-has-scrollbars
                var isScrollable = function(node) {
                    var cs;
                    var _notScrollable = {
                        vertical: false,
                        horizontal: false,
                    };
                    try {
                        cs = window.getComputedStyle(node);
                        if (cs === null) {
                            return _notScrollable;
                        }
                    } catch (e) {
                        /* istanbul ignore next: error handler */
                        return _notScrollable;
                    }
                    var overflowY = cs['overflow-y'];
                    var overflowX = cs['overflow-x'];
                    return {
                        vertical: (overflowY === 'scroll' || overflowY === 'auto') &&
                                    /* istanbul ignore next: not tested */
                                    node.scrollHeight > node.clientHeight,
                        horizontal: (overflowX === 'scroll' || overflowX === 'auto') &&
                                    /* istanbul ignore next: not tested */
                                    node.scrollWidth > node.clientWidth,
                    };
                };

                // getScrollTop
                //
                // we structure this so that it can climb the parents of the _el and when it finds
                // one with scrollbars, it adds an EventListener, so that no matter how the
                // DOM is structured in the user APP, if there is a scrollbar not as part of the
                // ta-scroll-window, we will still capture the 'scroll' events...
                // and handle the scroll event properly and do the resize, etc.
                //
                scope.getScrollTop = function (_el, bAddListener) {
                    var scrollTop = _el.scrollTop;
                    if (typeof scrollTop === 'undefined') {
                        scrollTop = 0;
                    }
                    /* istanbul ignore next: triggered only if has scrollbar */
                    if (bAddListener && isScrollable(_el).vertical) {
                        // remove element eventListener
                        _el.removeEventListener('scroll', scope._scrollListener, false);
                        _el.addEventListener('scroll', scope._scrollListener, false);
                    }
                    /* istanbul ignore next: triggered only if has scrollbar and scrolled */
                    if (scrollTop !== 0) {
                        return { node:_el.nodeName, top:scrollTop };
                    }
                    /* istanbul ignore else: catches only if no scroll */
                    if (_el.parentNode) {
                        return scope.getScrollTop(_el.parentNode, bAddListener);
                    } else {
                        return { node:'<none>', top:0 };
                    }
                };

                // define the popover show and hide functions
                scope.showPopover = function(_el){
                    scope.getScrollTop(scope.displayElements.scrollWindow[0], true);
                    scope.displayElements.popover.css('display', 'block');
                    // we must use a $timeout here, or the css change to the
                    // displayElements.resize.overlay will not take!!!
                    // WHY???
                    $timeout(function() {
                        scope.displayElements.resize.overlay.css('display', 'block');
                    });
                    scope.resizeElement = _el;
                    scope.reflowPopover(_el);
                    $animate.addClass(scope.displayElements.popover, 'in');
                    oneEvent($document.find('body'), 'click keyup', function(){scope.hidePopover();});
                };

                /* istanbul ignore next: browser scroll event handler */
                scope._scrollListener = function (e, eventData){
                    scope.handlePopoverEvents();
                };

                scope.reflowPopover = function(_el){
                    var scrollTop = scope.getScrollTop(scope.displayElements.scrollWindow[0], false);
                    var spaceAboveImage = _el[0].offsetTop-scrollTop.top;
                    //var spaceBelowImage = scope.displayElements.text[0].offsetHeight - _el[0].offsetHeight - spaceAboveImage;
                    //console.log(spaceAboveImage, spaceBelowImage);

                    /* istanbul ignore if: catches only if near bottom of editor */
                    if(spaceAboveImage < 51) {
                        scope.displayElements.popover.css('top', _el[0].offsetTop + _el[0].offsetHeight + scope.displayElements.scrollWindow[0].scrollTop + 'px');
                        scope.displayElements.popover.removeClass('top').addClass('bottom');
                    } else {
                        scope.displayElements.popover.css('top', _el[0].offsetTop - 54 + scope.displayElements.scrollWindow[0].scrollTop + 'px');
                        scope.displayElements.popover.removeClass('bottom').addClass('top');
                    }
                    var _maxLeft = scope.displayElements.text[0].offsetWidth - scope.displayElements.popover[0].offsetWidth;
                    var _targetLeft = _el[0].offsetLeft + (_el[0].offsetWidth / 2.0) - (scope.displayElements.popover[0].offsetWidth / 2.0);
                    var _rleft = Math.max(0, Math.min(_maxLeft, _targetLeft));
                    var _marginLeft = (Math.min(_targetLeft, (Math.max(0, _targetLeft - _maxLeft))) - 11);
                    _rleft += window.scrollX;
                    _marginLeft -= window.scrollX;
                    scope.displayElements.popover.css('left', _rleft + 'px');
                    scope.displayElements.popoverArrow.css('margin-left', _marginLeft + 'px');
                };
                scope.hidePopover = function(){
                    scope.displayElements.popover.css('display', 'none');
                    scope.displayElements.popoverContainer.attr('style', '');
                    scope.displayElements.popoverContainer.attr('class', 'popover-content');
                    scope.displayElements.popover.removeClass('in');
                    scope.displayElements.resize.overlay.css('display', 'none');
                };

                // setup the resize overlay
                scope.displayElements.resize.overlay.append(scope.displayElements.resize.background);
                angular.forEach(scope.displayElements.resize.anchors, function(anchor){ scope.displayElements.resize.overlay.append(anchor);});
                scope.displayElements.resize.overlay.append(scope.displayElements.resize.info);
                scope.displayElements.scrollWindow.append(scope.displayElements.resize.overlay);

                // A click event on the resize.background will now shift the focus to the editor
                /* istanbul ignore next: click on the resize.background to focus back to editor */
                scope.displayElements.resize.background.on('click', function(e) {
                    scope.displayElements.text[0].focus();
                });

                // define the show and hide events
                scope.reflowResizeOverlay = function(_el){
                    _el = angular.element(_el)[0];
                    scope.displayElements.resize.overlay.css({
                        'display': 'block',
                        'left': _el.offsetLeft - 5 + 'px',
                        'top': _el.offsetTop - 5 + 'px',
                        'width': _el.offsetWidth + 10 + 'px',
                        'height': _el.offsetHeight + 10 + 'px'
                    });
                    scope.displayElements.resize.info.text(_el.offsetWidth + ' x ' + _el.offsetHeight);
                };
                /* istanbul ignore next: pretty sure phantomjs won't test this */
                scope.showResizeOverlay = function(_el){
                    var _body = $document.find('body');
                    _resizeMouseDown = function(event){
                        var startPosition = {
                            width: parseInt(_el.attr('width')),
                            height: parseInt(_el.attr('height')),
                            x: event.clientX,
                            y: event.clientY
                        };
                        if(startPosition.width === undefined || isNaN(startPosition.width)) startPosition.width = _el[0].offsetWidth;
                        if(startPosition.height === undefined || isNaN(startPosition.height)) startPosition.height = _el[0].offsetHeight;
                        scope.hidePopover();
                        var ratio = startPosition.height / startPosition.width;
                        var mousemove = function(event){
                            // calculate new size
                            var pos = {
                                x: Math.max(0, startPosition.width + (event.clientX - startPosition.x)),
                                y: Math.max(0, startPosition.height + (event.clientY - startPosition.y))
                            };

                            // DEFAULT: the aspect ratio is not locked unless the Shift key is pressed.
                            //
                            // attribute: ta-resize-force-aspect-ratio -- locks resize into maintaing the aspect ratio
                            var bForceAspectRatio = (attrs.taResizeForceAspectRatio !== undefined);
                            // attribute: ta-resize-maintain-aspect-ratio=true causes the space ratio to remain locked
                            // unless the Shift key is pressed
                            var bFlipKeyBinding = attrs.taResizeMaintainAspectRatio;
                            var bKeepRatio =  bForceAspectRatio || (bFlipKeyBinding && !event.shiftKey);
                            if(bKeepRatio) {
                                var newRatio = pos.y / pos.x;
                                pos.x = ratio > newRatio ? pos.x : pos.y / ratio;
                                pos.y = ratio > newRatio ? pos.x * ratio : pos.y;
                            }
                            var el = angular.element(_el);
                            function roundedMaxVal(val) {
                                return Math.round(Math.max(0, val));
                            }
                            el.css('height', roundedMaxVal(pos.y) + 'px');
                            el.css('width', roundedMaxVal(pos.x) + 'px');

                            // reflow the popover tooltip
                            scope.reflowResizeOverlay(_el);
                        };
                        _body.on('mousemove', mousemove);
                        oneEvent(_body, 'mouseup', function(event){
                            event.preventDefault();
                            event.stopPropagation();
                            _body.off('mousemove', mousemove);
                            // at this point, we need to force the model to update! since the css has changed!
                            // this fixes bug: #862 - we now hide the popover -- as this seems more consitent.
                            // there are still issues under firefox, the window does not repaint. -- not sure
                            // how best to resolve this, but clicking anywhere works.
                            scope.$apply(function (){
                                scope.hidePopover();
                                scope.updateTaBindtaTextElement();
                            }, 100);
                        });
                        event.stopPropagation();
                        event.preventDefault();
                    };

                    scope.displayElements.resize.anchors[3].off('mousedown');
                    scope.displayElements.resize.anchors[3].on('mousedown', _resizeMouseDown);

                    scope.reflowResizeOverlay(_el);
                    oneEvent(_body, 'click', function(){scope.hideResizeOverlay();});
                };
                /* istanbul ignore next: pretty sure phantomjs won't test this */
                scope.hideResizeOverlay = function(){
                    scope.displayElements.resize.anchors[3].off('mousedown', _resizeMouseDown);
                    scope.displayElements.resize.overlay.css('display', 'none');
                };

                // allow for insertion of custom directives on the textarea and div
                scope.setup.htmlEditorSetup(scope.displayElements.html);
                scope.setup.textEditorSetup(scope.displayElements.text);
                scope.displayElements.html.attr({
                    'id': 'taHtmlElement' + _serial,
                    'ng-show': 'showHtml',
                    'ta-bind': 'ta-bind',
                    'ng-model': 'html',
                    'ng-model-options': element.attr('ng-model-options')
                });
                scope.displayElements.text.attr({
                    'id': 'taTextElement' + _serial,
                    'contentEditable': 'true',
                    'ta-bind': 'ta-bind',
                    'ng-model': 'html',
                    'ng-model-options': element.attr('ng-model-options')
                });
                scope.displayElements.scrollWindow.attr({'ng-hide': 'showHtml'});
                if(attrs.taDefaultWrap) {
                    // taDefaultWrap is only applied to the text and not the html view
                    scope.displayElements.text.attr('ta-default-wrap', attrs.taDefaultWrap);
                }

                if(attrs.taUnsafeSanitizer){
                    scope.displayElements.text.attr('ta-unsafe-sanitizer', attrs.taUnsafeSanitizer);
                    scope.displayElements.html.attr('ta-unsafe-sanitizer', attrs.taUnsafeSanitizer);
                }

                if(attrs.taKeepStyles){
                    scope.displayElements.text.attr('ta-keep-styles', attrs.taKeepStyles);
                    scope.displayElements.html.attr('ta-keep-styles', attrs.taKeepStyles);
                }

                // add the main elements to the origional element
                scope.displayElements.scrollWindow.append(scope.displayElements.text);
                element.append(scope.displayElements.scrollWindow);
                element.append(scope.displayElements.html);

                scope.displayElements.forminput.attr('name', scope._name);
                element.append(scope.displayElements.forminput);

                if(attrs.tabindex){
                    element.removeAttr('tabindex');
                    scope.displayElements.text.attr('tabindex', attrs.tabindex);
                    scope.displayElements.html.attr('tabindex', attrs.tabindex);
                }

                if (attrs.placeholder) {
                    scope.displayElements.text.attr('placeholder', attrs.placeholder);
                    scope.displayElements.html.attr('placeholder', attrs.placeholder);
                }

                if(attrs.taDisabled){
                    scope.displayElements.text.attr('ta-readonly', 'disabled');
                    scope.displayElements.html.attr('ta-readonly', 'disabled');
                    scope.disabled = scope.$parent.$eval(attrs.taDisabled);
                    scope.$parent.$watch(attrs.taDisabled, function(newVal){
                        scope.disabled = newVal;
                        if(scope.disabled){
                            element.addClass(scope.classes.disabled);
                        }else{
                            element.removeClass(scope.classes.disabled);
                        }
                    });
                }

                if(attrs.taPaste){
                    scope._pasteHandler = function(_html){
                        return $parse(attrs.taPaste)(scope.$parent, {$html: _html});
                    };
                    scope.displayElements.text.attr('ta-paste', '_pasteHandler($html)');
                }

                // compile the scope with the text and html elements only - if we do this with the main element it causes a compile loop
                $compile(scope.displayElements.scrollWindow)(scope);
                $compile(scope.displayElements.html)(scope);

                scope.updateTaBindtaTextElement = scope['updateTaBindtaTextElement' + _serial];
                scope.updateTaBindtaHtmlElement = scope['updateTaBindtaHtmlElement' + _serial];

                // add the classes manually last
                element.addClass("ta-root");
                scope.displayElements.scrollWindow.addClass("ta-text ta-editor " + scope.classes.textEditor);
                scope.displayElements.html.addClass("ta-html ta-editor " + scope.classes.htmlEditor);

                var testAndSet = function(choice, beforeState) {
                    /* istanbul ignore next: this is only here because of a bug in rangy where rangy.saveSelection() has cleared the state */
                    if (beforeState !== $document[0].queryCommandState(choice)) {
                        $document[0].execCommand(choice, false, null);
                    }
                };
                // used in the toolbar actions
                scope._actionRunning = false;
                var _savedSelection = false;
                scope.startAction = function(){
                    var _beforeStateBold = false;
                    var _beforeStateItalic = false;
                    var _beforeStateUnderline = false;
                    var _beforeStateStrikethough = false;
                    scope._actionRunning = true;
                    _beforeStateBold = $document[0].queryCommandState('bold');
                    _beforeStateItalic = $document[0].queryCommandState('italic');
                    _beforeStateUnderline = $document[0].queryCommandState('underline');
                    _beforeStateStrikethough = $document[0].queryCommandState('strikeThrough');
                    //console.log('B', _beforeStateBold, 'I', _beforeStateItalic, '_', _beforeStateUnderline, 'S', _beforeStateStrikethough);
                    // if rangy library is loaded return a function to reload the current selection
                    _savedSelection = rangy.saveSelection();
                    // rangy.saveSelection() clear the state of bold, italic, underline, strikethrough
                    // so we reset them here....!!!
                    // this fixes bugs #423, #1129, #1105, #693 which are actually rangy bugs!
                    testAndSet('bold', _beforeStateBold);
                    testAndSet('italic', _beforeStateItalic);
                    testAndSet('underline', _beforeStateUnderline);
                    testAndSet('strikeThrough', _beforeStateStrikethough);
                    //console.log('B', $document[0].queryCommandState('bold'), 'I', $document[0].queryCommandState('italic'), '_', $document[0].queryCommandState('underline'), 'S', $document[0].queryCommandState('strikeThrough') );
                    return function(){
                        if(_savedSelection) rangy.restoreSelection(_savedSelection);
                        // perhaps if we restore the selections here, we would do better overall???
                        // BUT what we do above does well in 90% of the cases...
                    };
                };
                scope.endAction = function(){
                    scope._actionRunning = false;
                    if(_savedSelection){
                        if(scope.showHtml){
                            scope.displayElements.html[0].focus();
                        }else{
                            scope.displayElements.text[0].focus();
                        }
                        // rangy.restoreSelection(_savedSelection);
                        rangy.removeMarkers(_savedSelection);
                    }
                    _savedSelection = false;
                    scope.updateSelectedStyles();
                    // only update if in text or WYSIWYG mode
                    if(!scope.showHtml) scope['updateTaBindtaTextElement' + _serial]();
                };

                // note that focusout > focusin is called everytime we click a button - except bad support: http://www.quirksmode.org/dom/events/blurfocus.html
                // cascades to displayElements.text and displayElements.html automatically.
                _focusin = function(e){
                    scope.focussed = true;
                    element.addClass(scope.classes.focussed);
/*******  NOT FUNCTIONAL YET
                    if (e.target.id === 'taTextElement' + _serial) {
                        console.log('_focusin taTextElement');
                        // we only do this if NOT focussed
                        textAngularManager.restoreFocusSelection(scope._name);
                    }
*******/
                    _editorFunctions.focus();
                    element.triggerHandler('focus');
                    // we call editorScope.updateSelectedStyles() here because we want the toolbar to be focussed
                    // as soon as we have focus.  Otherwise this only happens on mousedown or keydown etc...
                    /* istanbul ignore else: don't run if already running */
                    if(scope.updateSelectedStyles && !scope._bUpdateSelectedStyles){
                        // we don't set editorScope._bUpdateSelectedStyles here, because we do not want the
                        // updateSelectedStyles() to run twice which it will do after 200 msec if we have
                        // set editorScope._bUpdateSelectedStyles
                        //
                        // WOW, normally I would do a scope.$apply here, but this causes ERRORs when doing tests!
                        $timeout(function () {
                            scope.updateSelectedStyles();
                        }, 0);
                    }
                };
                scope.displayElements.html.on('focus', _focusin);
                scope.displayElements.text.on('focus', _focusin);
                _focusout = function(e){
                    /****************** NOT FUNCTIONAL YET
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
                    if(!scope._actionRunning &&
                        $document[0].activeElement !== scope.displayElements.html[0] &&
                        $document[0].activeElement !== scope.displayElements.text[0])
                    {
                        element.removeClass(scope.classes.focussed);
                        _editorFunctions.unfocus();
                        // to prevent multiple apply error defer to next seems to work.
                        $timeout(function(){
                            scope._bUpdateSelectedStyles = false;
                            element.triggerHandler('blur');
                            scope.focussed = false;
                        }, 0);
                    }
                    e.preventDefault();
                    return false;
                };
                scope.displayElements.html.on('blur', _focusout);
                scope.displayElements.text.on('blur', _focusout);

                scope.displayElements.text.on('paste', function(event){
                    element.triggerHandler('paste', event);
                });

                // Setup the default toolbar tools, this way allows the user to add new tools like plugins.
                // This is on the editor for future proofing if we find a better way to do this.
                scope.queryFormatBlockState = function(command){
                    // $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
                    return !scope.showHtml && command.toLowerCase() === $document[0].queryCommandValue('formatBlock').toLowerCase();
                };
                scope.queryCommandState = function(command){
                    // $document[0].queryCommandValue('formatBlock') errors in Firefox if we call this when focussed on the textarea
                    return (!scope.showHtml) ? $document[0].queryCommandState(command) : '';
                };
                scope.switchView = function(){
                    scope.showHtml = !scope.showHtml;
                    $animate.enabled(false, scope.displayElements.html);
                    $animate.enabled(false, scope.displayElements.text);
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
                    if(scope.showHtml){
                        //defer until the element is visible
                        $timeout(function(){
                            $animate.enabled(true, scope.displayElements.html);
                            $animate.enabled(true, scope.displayElements.text);
                            // [0] dereferences the DOM object from the angular.element
                            return scope.displayElements.html[0].focus();
                        }, 100);
                    }else{
                        //Show the WYSIWYG view
                        //defer until the element is visible
                        $timeout(function(){
                            $animate.enabled(true, scope.displayElements.html);
                            $animate.enabled(true, scope.displayElements.text);
                            // [0] dereferences the DOM object from the angular.element
                            return scope.displayElements.text[0].focus();
                        }, 100);
                    }
                };

                // changes to the model variable from outside the html/text inputs
                // if no ngModel, then the only input is from inside text-angular
                if(attrs.ngModel){
                    var _firstRun = true;
                    ngModel.$render = function(){
                        if(_firstRun){
                            // we need this firstRun to set the originalContents otherwise it gets overrided by the setting of ngModel to undefined from NaN
                            _firstRun = false;
                            // if view value is null or undefined initially and there was original content, set to the original content
                            var _initialValue = scope.$parent.$eval(attrs.ngModel);
                            if((_initialValue === undefined || _initialValue === null) && (_originalContents && _originalContents !== '')){
                                // on passing through to taBind it will be sanitised
                                ngModel.$setViewValue(_originalContents);
                            }
                        }
                        scope.displayElements.forminput.val(ngModel.$viewValue);
                        // if the editors aren't focused they need to be updated, otherwise they are doing the updating
                        scope.html = ngModel.$viewValue || '';
                    };
                    // trigger the validation calls
                    if(element.attr('required')) ngModel.$validators.required = function(modelValue, viewValue) {
                        var value = modelValue || viewValue;
                        return !(!value || value.trim() === '');
                    };
                }else{
                    // if no ngModel then update from the contents of the origional html.
                    scope.displayElements.forminput.val(_originalContents);
                    scope.html = _originalContents;
                }

                // changes from taBind back up to here
                scope.$watch('html', function(newValue, oldValue){
                    if(newValue !== oldValue){
                        if(attrs.ngModel && ngModel.$viewValue !== newValue) {
                            ngModel.$setViewValue(newValue);
                        }
                        scope.displayElements.forminput.val(newValue);
                    }
                });

                if(attrs.taTargetToolbars) {
                    _editorFunctions = textAngularManager.registerEditor(scope._name, scope, attrs.taTargetToolbars.split(','));
                }
                else{
                    var _toolbar = angular.element('<div text-angular-toolbar name="textAngularToolbar' + _serial + '">');
                    // passthrough init of toolbar options
                    if(attrs.taToolbar)						_toolbar.attr('ta-toolbar', attrs.taToolbar);
                    if(attrs.taToolbarClass)				_toolbar.attr('ta-toolbar-class', attrs.taToolbarClass);
                    if(attrs.taToolbarGroupClass)			_toolbar.attr('ta-toolbar-group-class', attrs.taToolbarGroupClass);
                    if(attrs.taToolbarButtonClass)			_toolbar.attr('ta-toolbar-button-class', attrs.taToolbarButtonClass);
                    if(attrs.taToolbarActiveButtonClass)	_toolbar.attr('ta-toolbar-active-button-class', attrs.taToolbarActiveButtonClass);
                    if(attrs.taFocussedClass)				_toolbar.attr('ta-focussed-class', attrs.taFocussedClass);

                    element.prepend(_toolbar);
                    $compile(_toolbar)(scope.$parent);
                    _editorFunctions = textAngularManager.registerEditor(scope._name, scope, ['textAngularToolbar' + _serial]);
                }

                scope.$on('$destroy', function(){
                    textAngularManager.unregisterEditor(scope._name);
                    angular.element(window).off('blur');
                    angular.element(window).off('resize', scope.handlePopoverEvents);
                    angular.element(window).off('scroll', scope.handlePopoverEvents);
                });

                // catch element select event and pass to toolbar tools
                scope.$on('ta-element-select', function(event, element){
                    if(_editorFunctions.triggerElementSelect(event, element)){
                        scope['reApplyOnSelectorHandlerstaTextElement' + _serial]();
                    }
                });

/******************* no working fully
                var distanceFromPoint = function (px, py, x, y) {
                    return Math.sqrt((px-x)*(px-x)+(py-y)*(py-y));
                };
                // because each object is a rectangle and we have a single point,
                // we need to give priority if the point is inside the rectangle
                var getPositionDistance = function(el, x, y) {
                    var range = document.createRange();
                    range.selectNode(el);
                    var rect = range.getBoundingClientRect();
                    console.log(el, rect);
                    range.detach();
                    var bcr = rect;
                    // top left
                    var d1 = distanceFromPoint(bcr.left, bcr.top, x, y);
                    // bottom left
                    var d2 = distanceFromPoint(bcr.left, bcr.bottom, x, y);
                    // top right
                    var d3 = distanceFromPoint(bcr.right, bcr.top, x, y);
                    // bottom right
                    var d4 = distanceFromPoint(bcr.right, bcr.bottom, x, y);
                    return Math.min(d1, d2, d3, d4);
                };
                var findClosest = function(el, minElement, maxDistance, x, y) {
                    var _d=0;
                    for (var i = 0; i < el.childNodes.length; i++) {
                        var _n = el.childNodes[i];
                        if (!_n.childNodes.length) {
                            _d = getPositionDistance(_n, x, y);
                            //console.log(_n, _n.childNodes, _d);
                            if (_d < maxDistance) {
                                maxDistance = _d;
                                minElement = _n;
                            }
                        }
                        var res = findClosest(_n, minElement, maxDistance, x, y);
                        if (res.max < maxDistance) {
                            maxDistance = res.max;
                            minElement = res.min;
                        }
                    }
                    return { max: maxDistance, min: minElement };
                };
                var getClosestElement = function (el, x, y) {
                    return findClosest(el, null, 12341234124, x, y);
                };
****************/

                scope.$on('ta-drop-event', function(event, element, dropEvent, dataTransfer){
                    if(dataTransfer && dataTransfer.files && dataTransfer.files.length > 0){
                        scope.displayElements.text[0].focus();
                        // we must set the location of the drop!
                        //console.log(dropEvent.clientX, dropEvent.clientY, dropEvent.target);
                        taSelection.setSelectionToElementEnd(dropEvent.target);
                        angular.forEach(dataTransfer.files, function(file){
                            // taking advantage of boolean execution, if the fileDropHandler returns true, nothing else after it is executed
                            // If it is false then execute the defaultFileDropHandler if the fileDropHandler is NOT the default one
                            // Once one of these has been executed wrap the result as a promise, if undefined or variable update the taBind, else we should wait for the promise
                            try{
                                $q.when(scope.fileDropHandler(file, scope.wrapSelection) ||
                                    (scope.fileDropHandler !== scope.defaultFileDropHandler &&
                                    $q.when(scope.defaultFileDropHandler(file, scope.wrapSelection)))).then(function(){
                                        scope['updateTaBindtaTextElement' + _serial]();
                                    });
                            }catch(error){
                                $log.error(error);
                            }
                        });
                        dropEvent.preventDefault();
                        dropEvent.stopPropagation();
                    /* istanbul ignore else, the updates if moved text */
                    }else{
                        $timeout(function(){
                            scope['updateTaBindtaTextElement' + _serial]();
                        }, 0);
                    }
                });

                // the following is for applying the active states to the tools that support it
                scope._bUpdateSelectedStyles = false;
                /* istanbul ignore next: browser window/tab leave check */
                angular.element(window).on('blur', function(){
                    scope._bUpdateSelectedStyles = false;
                    scope.focussed = false;
                });
                // loop through all the tools polling their activeState function if it exists
                scope.updateSelectedStyles = function(){
                    var _selection;
                    /* istanbul ignore next: This check is to ensure multiple timeouts don't exist */
                    if(_updateSelectedStylesTimeout) $timeout.cancel(_updateSelectedStylesTimeout);
                    // test if the common element ISN'T the root ta-text node
                    if((_selection = taSelection.getSelectionElement()) !== undefined && _selection.parentNode !== scope.displayElements.text[0]){
                        _editorFunctions.updateSelectedStyles(angular.element(_selection));
                    }else _editorFunctions.updateSelectedStyles();
                    // used to update the active state when a key is held down, ie the left arrow
                    /* istanbul ignore else: browser only check */
                    if(scope._bUpdateSelectedStyles) _updateSelectedStylesTimeout = $timeout(scope.updateSelectedStyles, 200);
                };
                // start updating on keydown
                _keydown = function(){
                    /* istanbul ignore next: ie catch */
                    if(!scope.focussed){
                        scope._bUpdateSelectedStyles = false;
                        return;
                    }
                    /* istanbul ignore else: don't run if already running */
                    if(!scope._bUpdateSelectedStyles){
                        scope._bUpdateSelectedStyles = true;
                        scope.$apply(function(){
                            scope.updateSelectedStyles();
                        });
                    }
                };
                scope.displayElements.html.on('keydown', _keydown);
                scope.displayElements.text.on('keydown', _keydown);
                // stop updating on key up and update the display/model
                _keyup = function(){
                    scope._bUpdateSelectedStyles = false;
                };
                scope.displayElements.html.on('keyup', _keyup);
                scope.displayElements.text.on('keyup', _keyup);
                // stop updating on key up and update the display/model
                _keypress = function(event, eventData){
                    // bug fix for Firefox.  If we are selecting a <a> already, any characters will
                    // be added within the <a> which is bad!
                    /* istanbul ignore next: don't see how to test this... */
                    if (taSelection.getSelection) {
                        var _selection = taSelection.getSelection();
                        // in a weird case (can't reproduce) taSelection.getSelectionElement() can be undefined!!
                        // this comes from range.commonAncestorContainer;
                        // so I check for this here which fixes the error case
                        if (taSelection.getSelectionElement() && taSelection.getSelectionElement().nodeName.toLowerCase() === 'a') {
                            // check and see if we are at the edge of the <a>
                            if (_selection.start.element.nodeType === 3 &&
                                _selection.start.element.textContent.length === _selection.end.offset) {
                                // we are at the end of the <a>!!!
                                // so move the selection to after the <a>!!
                                taSelection.setSelectionAfterElement(taSelection.getSelectionElement());
                            }
                            if (_selection.start.element.nodeType === 3 &&
                                _selection.start.offset === 0) {
                                // we are at the start of the <a>!!!
                                // so move the selection before the <a>!!
                                taSelection.setSelectionBeforeElement(taSelection.getSelectionElement());
                            }
                        }
                    }
                    /* istanbul ignore else: this is for catching the jqLite testing*/
                    if(eventData) angular.extend(event, eventData);
                    scope.$apply(function(){
                        if(_editorFunctions.sendKeyCommand(event)){
                            /* istanbul ignore else: don't run if already running */
                            if(!scope._bUpdateSelectedStyles){
                                scope.updateSelectedStyles();
                            }
                            event.preventDefault();
                            return false;
                        }
                    });
                };
                scope.displayElements.html.on('keypress', _keypress);
                scope.displayElements.text.on('keypress', _keypress);
                // update the toolbar active states when we click somewhere in the text/html boxed
                _mouseup = function(){
                    // ensure only one execution of updateSelectedStyles()
                    scope._bUpdateSelectedStyles = false;
                    // for some reason, unless we do a $timeout here, after a _mouseup when the line is
                    // highlighted, and instead use a scope.$apply(function(){ scope.updateSelectedStyles(); });
                    // doesn't work properly, so we replaced this with:
                    /* istanbul ignore next: not tested  */
                    $timeout(function() { scope.updateSelectedStyles(); }, 0);
                };
                scope.displayElements.html.on('mouseup', _mouseup);
                scope.displayElements.text.on('mouseup', _mouseup);
            }
        };
    }
]);
textAngular.service('textAngularManager', ['taToolExecuteAction', 'taTools', 'taRegisterTool', '$interval', '$rootScope', '$log',
    function(taToolExecuteAction, taTools, taRegisterTool, $interval, $rootScope, $log){
    // this service is used to manage all textAngular editors and toolbars.
    // All publicly published functions that modify/need to access the toolbar or editor scopes should be in here
    // these contain references to all the editors and toolbars that have been initialised in this app
    var toolbars = {}, editors = {};
    // we touch the time any change occurs through register of an editor or tool so that we
    // in the future will fire and event to trigger an updateSelection
    var timeRecentModification = 0;
    var updateStyles = function(selectedElement){
        angular.forEach(editors, function(editor) {
            editor.editorFunctions.updateSelectedStyles(selectedElement);
        });
    };
    var triggerInterval = 50;
    var triggerIntervalTimer;
    var setupTriggerUpdateStyles = function() {
        timeRecentModification = Date.now();
        /* istanbul ignore next: setup a one time updateStyles() */
        triggerIntervalTimer = $interval(function() {
            updateStyles();
            triggerIntervalTimer = undefined;
        }, triggerInterval, 1); // only trigger once
    };
    /* istanbul ignore next: make sure clean up on destroy */
    $rootScope.$on('destroy', function() {
        if (triggerIntervalTimer) {
            $interval.cancel(triggerIntervalTimer);
            triggerIntervalTimer = undefined;
        }
    });
    var touchModification = function() {
        if (Math.abs(Date.now() - timeRecentModification) > triggerInterval) {
            // we have already triggered the updateStyles a long time back... so setup it again...
            setupTriggerUpdateStyles();
        }
    };
    // when we focus into a toolbar, we need to set the TOOLBAR's $parent to be the toolbars it's linked to.
    // We also need to set the tools to be updated to be the toolbars...
    return {
        // register an editor and the toolbars that it is affected by
        registerEditor: function(editorName, editorScope, targetToolbars){
            // NOTE: name === editorScope._name
            // targetToolbars is an [] of 'toolbar name's
            // targetToolbars are optional, we don't require a toolbar to function
            if(!editorName || editorName === '') throw('textAngular Error: An editor requires a name');
            if(!editorScope) throw('textAngular Error: An editor requires a scope');
            if(editors[editorName]) throw('textAngular Error: An Editor with name "' + editorName + '" already exists');
            editors[editorName] = {
                scope: editorScope,
                toolbars: targetToolbars,
                // toolbarScopes used by this editor
                toolbarScopes: [],
                _registerToolbarScope: function(toolbarScope){
                    // add to the list late
                    if(this.toolbars.indexOf(toolbarScope.name) >= 0) {
                        // if this toolbarScope is being used by this editor we add it as one of the scopes
                        this.toolbarScopes.push(toolbarScope);
                    }
                },
                // this is a suite of functions the editor should use to update all it's linked toolbars
                editorFunctions: {
                    disable: function(){
                        // disable all linked toolbars
                        angular.forEach(editors[editorName].toolbarScopes, function(toolbarScope){
                            toolbarScope.disabled = true;
                        });
                    },
                    enable: function(){
                        // enable all linked toolbars
                        angular.forEach(editors[editorName].toolbarScopes, function(toolbarScope){
                            toolbarScope.disabled = false;
                        });
                    },
                    focus: function(){
                        // this should be called when the editor is focussed
                        angular.forEach(editors[editorName].toolbarScopes, function(toolbarScope){
                            toolbarScope._parent = editorScope;
                            toolbarScope.disabled = false;
                            toolbarScope.focussed = true;
                        });
                        editorScope.focussed = true;
                    },
                    unfocus: function(){
                        // this should be called when the editor becomes unfocussed
                        angular.forEach(editors[editorName].toolbarScopes, function(toolbarScope){
                            toolbarScope.disabled = true;
                            toolbarScope.focussed = false;
                        });
                        editorScope.focussed = false;
                    },
                    updateSelectedStyles: function(selectedElement){
                        // update the active state of all buttons on liked toolbars
                        angular.forEach(editors[editorName].toolbarScopes, function(toolbarScope){
                            angular.forEach(toolbarScope.tools, function(toolScope){
                                if(toolScope.activeState){
                                    toolbarScope._parent = editorScope;
                                    // selectedElement may be undefined if nothing selected
                                    toolScope.active = toolScope.activeState(selectedElement);
                                }
                            });
                        });
                    },
                    sendKeyCommand: function(event){
                        // we return true if we applied an action, false otherwise
                        var result = false;
                        if(event.ctrlKey || event.metaKey || event.specialKey) angular.forEach(taTools, function(tool, name){
                            if(tool.commandKeyCode && (tool.commandKeyCode === event.which || tool.commandKeyCode === event.specialKey)){
                                for(var _t = 0; _t < editors[editorName].toolbarScopes.length; _t++){
                                    if(editors[editorName].toolbarScopes[_t].tools[name] !== undefined){
                                        taToolExecuteAction.call(editors[editorName].toolbarScopes[_t].tools[name], editorScope);
                                        result = true;
                                        break;
                                    }
                                }
                            }
                        });
                        return result;
                    },
                    triggerElementSelect: function(event, element){
                        // search through the taTools to see if a match for the tag is made.
                        // if there is, see if the tool is on a registered toolbar and not disabled.
                        // NOTE: This can trigger on MULTIPLE tools simultaneously.
                        var elementHasAttrs = function(_element, attrs){
                            var result = true;
                            for(var i = 0; i < attrs.length; i++) result = result && _element.attr(attrs[i]);
                            return result;
                        };
                        var workerTools = [];
                        var unfilteredTools = {};
                        var result = false;
                        element = angular.element(element);
                        // get all valid tools by element name, keep track if one matches the
                        var onlyWithAttrsFilter = false;
                        angular.forEach(taTools, function(tool, name){
                            if(
                                tool.onElementSelect &&
                                tool.onElementSelect.element &&
                                tool.onElementSelect.element.toLowerCase() === element[0].tagName.toLowerCase() &&
                                (!tool.onElementSelect.filter || tool.onElementSelect.filter(element))
                            ){
                                // this should only end up true if the element matches the only attributes
                                onlyWithAttrsFilter = onlyWithAttrsFilter ||
                                    (angular.isArray(tool.onElementSelect.onlyWithAttrs) && elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs));
                                if(!tool.onElementSelect.onlyWithAttrs || elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs)) unfilteredTools[name] = tool;
                            }
                        });
                        // if we matched attributes to filter on, then filter, else continue
                        if(onlyWithAttrsFilter){
                            angular.forEach(unfilteredTools, function(tool, name){
                                if(tool.onElementSelect.onlyWithAttrs && elementHasAttrs(element, tool.onElementSelect.onlyWithAttrs)) workerTools.push({'name': name, 'tool': tool});
                            });
                            // sort most specific (most attrs to find) first
                            workerTools.sort(function(a,b){
                                return b.tool.onElementSelect.onlyWithAttrs.length - a.tool.onElementSelect.onlyWithAttrs.length;
                            });
                        }else{
                            angular.forEach(unfilteredTools, function(tool, name){
                                workerTools.push({'name': name, 'tool': tool});
                            });
                        }
                        // Run the actions on the first visible filtered tool only
                        if(workerTools.length > 0){
                            for(var _i = 0; _i < workerTools.length; _i++){
                                var tool = workerTools[_i].tool;
                                var name = workerTools[_i].name;
                                for(var _t = 0; _t < editors[editorName].toolbarScopes.length; _t++){
                                    if(editors[editorName].toolbarScopes[_t].tools[name] !== undefined){
                                        tool.onElementSelect.action.call(editors[editorName].toolbarScopes[_t].tools[name], event, element, editorScope);
                                        result = true;
                                        break;
                                    }
                                }
                                if(result) break;
                            }
                        }
                        return result;
                    }
                }
            };
            angular.forEach(targetToolbars, function(_name){
                if(toolbars[_name]) {
                    editors[editorName].toolbarScopes.push(toolbars[_name]);
                }
                // if it doesn't exist it may not have been compiled yet and it will be added later
            });
            touchModification();
            return editors[editorName].editorFunctions;
        },
        // retrieve editor by name, largely used by testing suites only
        retrieveEditor: function(name){
            return editors[name];
        },
        unregisterEditor: function(name){
            delete editors[name];
            touchModification();
        },
        // registers a toolbar such that it can be linked to editors
        registerToolbar: function(toolbarScope){
            if(!toolbarScope) throw('textAngular Error: A toolbar requires a scope');
            if(!toolbarScope.name || toolbarScope.name === '') throw('textAngular Error: A toolbar requires a name');
            if(toolbars[toolbarScope.name]) throw('textAngular Error: A toolbar with name "' + toolbarScope.name + '" already exists');
            toolbars[toolbarScope.name] = toolbarScope;
            // walk all the editors and connect this toolbarScope to the editors.... if we need to.  This way, it does
            // not matter if we register the editors after the toolbars or not
            // Note the editor will ignore this toolbarScope if it is not connected to it...
            angular.forEach(editors, function(_editor){
                _editor._registerToolbarScope(toolbarScope);
            });
            touchModification();
        },
        // retrieve toolbar by name, largely used by testing suites only
        retrieveToolbar: function(name){
            return toolbars[name];
        },
        // retrieve toolbars by editor name, largely used by testing suites only
        retrieveToolbarsViaEditor: function(name){
            var result = [], _this = this;
            angular.forEach(this.retrieveEditor(name).toolbars, function(name){
                result.push(_this.retrieveToolbar(name));
            });
            return result;
        },
        unregisterToolbar: function(name){
            delete toolbars[name];
            touchModification();
        },
        // functions for updating the toolbar buttons display
        updateToolsDisplay: function(newTaTools){
            // pass a partial struct of the taTools, this allows us to update the tools on the fly, will not change the defaults.
            var _this = this;
            angular.forEach(newTaTools, function(_newTool, key){
                _this.updateToolDisplay(key, _newTool);
            });
        },
        // this function resets all toolbars to their default tool definitions
        resetToolsDisplay: function(){
            var _this = this;
            angular.forEach(taTools, function(_newTool, key){
                _this.resetToolDisplay(key);
            });
            touchModification();
        },
        // update a tool on all toolbars
        updateToolDisplay: function(toolKey, _newTool){
            var _this = this;
            angular.forEach(toolbars, function(toolbarScope, toolbarKey){
                _this.updateToolbarToolDisplay(toolbarKey, toolKey, _newTool);
            });
            touchModification();
        },
        // resets a tool to the default/starting state on all toolbars
        resetToolDisplay: function(toolKey){
            var _this = this;
            angular.forEach(toolbars, function(toolbarScope, toolbarKey){
                _this.resetToolbarToolDisplay(toolbarKey, toolKey);
            });
            touchModification();
        },
        // update a tool on a specific toolbar
        updateToolbarToolDisplay: function(toolbarKey, toolKey, _newTool){
            if(toolbars[toolbarKey]) toolbars[toolbarKey].updateToolDisplay(toolKey, _newTool);
            else throw('textAngular Error: No Toolbar with name "' + toolbarKey + '" exists');
        },
        // reset a tool on a specific toolbar to it's default starting value
        resetToolbarToolDisplay: function(toolbarKey, toolKey){
            if(toolbars[toolbarKey]) toolbars[toolbarKey].updateToolDisplay(toolKey, taTools[toolKey], true);
            else throw('textAngular Error: No Toolbar with name "' + toolbarKey + '" exists');
        },
        // removes a tool from all toolbars and it's definition
        removeTool: function(toolKey){
            delete taTools[toolKey];
            angular.forEach(toolbars, function(toolbarScope){
                delete toolbarScope.tools[toolKey];
                for(var i = 0; i < toolbarScope.toolbar.length; i++){
                    var toolbarIndex;
                    for(var j = 0; j < toolbarScope.toolbar[i].length; j++){
                        if(toolbarScope.toolbar[i][j] === toolKey){
                            toolbarIndex = {
                                group: i,
                                index: j
                            };
                            break;
                        }
                        if(toolbarIndex !== undefined) break;
                    }
                    if(toolbarIndex !== undefined){
                        toolbarScope.toolbar[toolbarIndex.group].slice(toolbarIndex.index, 1);
                        toolbarScope._$element.children().eq(toolbarIndex.group).children().eq(toolbarIndex.index).remove();
                    }
                }
            });
            touchModification();
        },
        // toolkey, toolDefinition are required. If group is not specified will pick the last group, if index isnt defined will append to group
        addTool: function(toolKey, toolDefinition, group, index){
            taRegisterTool(toolKey, toolDefinition);
            angular.forEach(toolbars, function(toolbarScope){
                toolbarScope.addTool(toolKey, toolDefinition, group, index);
            });
            touchModification();
        },
        // adds a Tool but only to one toolbar not all
        addToolToToolbar: function(toolKey, toolDefinition, toolbarKey, group, index){
            taRegisterTool(toolKey, toolDefinition);
            toolbars[toolbarKey].addTool(toolKey, toolDefinition, group, index);
            touchModification();
        },
        // this is used when externally the html of an editor has been changed and textAngular needs to be notified to update the model.
        // this will call a $digest if not already happening
        refreshEditor: function(name){
            if(editors[name]){
                editors[name].scope.updateTaBindtaTextElement();
                /* istanbul ignore else: phase catch */
                if(!editors[name].scope.$$phase) editors[name].scope.$digest();
            }else throw('textAngular Error: No Editor with name "' + name + '" exists');
            touchModification();
        },
        // this is used by taBind to send a key command in response to a special key event
        sendKeyCommand: function(scope, event){
            var _editor = editors[scope._name];
            /* istanbul ignore else: if nothing to do, do nothing */
            if (_editor && _editor.editorFunctions.sendKeyCommand(event)) {
                /* istanbul ignore else: don't run if already running */
                if(!scope._bUpdateSelectedStyles){
                    scope.updateSelectedStyles();
                }
                event.preventDefault();
                return false;
            }
        },
        //
        // When a toolbar and tools are created, it isn't until there is a key event or mouse event
        // that the updateSelectedStyles() is called behind the scenes.
        // This function forces an update through the existing editors to help the application make sure
        // the inital state is correct.
        //
        updateStyles: updateStyles,
        // return the current version of textAngular in use to the user
        getVersion: function () { return textAngularVersion; },
        // for testing
        getToolbarScopes: function () {
            var tmp=[];
            angular.forEach(editors, function (_editor) {
                tmp = tmp.concat(_editor.toolbarScopes);
            });
            return tmp;
        }
/********************** not functional yet
        // save the selection ('range') for the given editor
        saveFocusSelection: function (name, range) {
            editors[name].savedFocusRange = range;
        },
        // restore the saved selection from when the focus was lost
        restoreFocusSelection: function(name, scope) {
            // we only do this if NOT focussed and saved...
            if (editors[name].savedFocusRange && !scope.focussed) {
                try {
                    var _r = rangy.restoreRange(editors[name].savedFocusRange);
                    var _sel = rangy.getSelection();
                    _sel.addRange(_r);
                } catch(e) {}
            }
        }
*************/
    };
}]);
textAngular.directive('textAngularToolbar', [
    '$compile', 'textAngularManager', 'taOptions', 'taTools', 'taToolExecuteAction', '$window',
    function($compile, textAngularManager, taOptions, taTools, taToolExecuteAction, $window){
        return {
            scope: {
                name: '@' // a name IS required
            },
            restrict: "EA",
            link: function(scope, element, attrs){
                if(!scope.name || scope.name === '') throw('textAngular Error: A toolbar requires a name');
                angular.extend(scope, angular.copy(taOptions));
                if(attrs.taToolbar)						scope.toolbar = scope.$parent.$eval(attrs.taToolbar);
                if(attrs.taToolbarClass)				scope.classes.toolbar = attrs.taToolbarClass;
                if(attrs.taToolbarGroupClass)			scope.classes.toolbarGroup = attrs.taToolbarGroupClass;
                if(attrs.taToolbarButtonClass)			scope.classes.toolbarButton = attrs.taToolbarButtonClass;
                if(attrs.taToolbarActiveButtonClass)	scope.classes.toolbarButtonActive = attrs.taToolbarActiveButtonClass;
                if(attrs.taFocussedClass)				scope.classes.focussed = attrs.taFocussedClass;

                scope.disabled = true;
                scope.focussed = false;
                scope._$element = element;
                element[0].innerHTML = '';
                element.addClass("ta-toolbar " + scope.classes.toolbar);

                scope.$watch('focussed', function(){
                    if(scope.focussed) element.addClass(scope.classes.focussed);
                    else element.removeClass(scope.classes.focussed);
                });

                var setupToolElement = function(toolDefinition, toolScope){
                    var toolElement;
                    if(toolDefinition && toolDefinition.display){
                        toolElement = angular.element(toolDefinition.display);
                    }
                    else toolElement = angular.element("<button type='button'>");

                    if(toolDefinition && toolDefinition["class"]) toolElement.addClass(toolDefinition["class"]);
                    else toolElement.addClass(scope.classes.toolbarButton);

                    toolElement.attr('name', toolScope.name);
                    // important to not take focus from the main text/html entry
                    toolElement.attr('ta-button', 'ta-button');
                    toolElement.attr('ng-disabled', 'isDisabled()');
                    toolElement.attr('tabindex', '-1');
                    toolElement.attr('ng-click', 'executeAction()');
                    toolElement.attr('ng-class', 'displayActiveToolClass(active)');

                    if (toolDefinition && toolDefinition.tooltiptext) {
                        toolElement.attr('title', toolDefinition.tooltiptext);
                    }
                    if(toolDefinition && !toolDefinition.display && !toolScope._display){
                        // first clear out the current contents if any
                        toolElement[0].innerHTML = '';
                        // add the buttonText
                        if(toolDefinition.buttontext) toolElement[0].innerHTML = toolDefinition.buttontext;
                        // add the icon to the front of the button if there is content
                        if(toolDefinition.iconclass){
                            var icon = angular.element('<i>'), content = toolElement[0].innerHTML;
                            icon.addClass(toolDefinition.iconclass);
                            toolElement[0].innerHTML = '';
                            toolElement.append(icon);
                            if(content && content !== '') toolElement.append('&nbsp;' + content);
                        }
                    }

                    toolScope._lastToolDefinition = angular.copy(toolDefinition);

                    return $compile(toolElement)(toolScope);
                };

                // Keep a reference for updating the active states later
                scope.tools = {};
                // create the tools in the toolbar
                // default functions and values to prevent errors in testing and on init
                scope._parent = {
                    disabled: true,
                    showHtml: false,
                    queryFormatBlockState: function(){ return false; },
                    queryCommandState: function(){ return false; }
                };
                var defaultChildScope = {
                    $window: $window,
                    $editor: function(){
                        // dynamically gets the editor as it is set
                        return scope._parent;
                    },
                    isDisabled: function(){
                        // view selection button is always enabled since it doesn not depend on a selction!
                        if (this.name === 'html' && scope._parent.startAction) {
                            return false;
                        }
                        // to set your own disabled logic set a function or boolean on the tool called 'disabled'
                        return ( // this bracket is important as without it it just returns the first bracket and ignores the rest
                            // when the button's disabled function/value evaluates to true
                            (typeof this.$eval('disabled') !== 'function' && this.$eval('disabled')) || this.$eval('disabled()') ||
                            // all buttons except the HTML Switch button should be disabled in the showHtml (RAW html) mode
                            (this.name !== 'html' && this.$editor().showHtml) ||
                            // if the toolbar is disabled
                            this.$parent.disabled ||
                            // if the current editor is disabled
                            this.$editor().disabled
                        );
                    },
                    displayActiveToolClass: function(active){
                        return (active)? scope.classes.toolbarButtonActive : '';
                    },
                    executeAction: taToolExecuteAction
                };

                angular.forEach(scope.toolbar, function(group){
                    // setup the toolbar group
                    var groupElement = angular.element("<div>");
                    groupElement.addClass(scope.classes.toolbarGroup);
                    angular.forEach(group, function(tool){
                        // init and add the tools to the group
                        // a tool name (key name from taTools struct)
                        //creates a child scope of the main angularText scope and then extends the childScope with the functions of this particular tool
                        // reference to the scope and element kept
                        scope.tools[tool] = angular.extend(scope.$new(true), taTools[tool], defaultChildScope, {name: tool});
                        scope.tools[tool].$element = setupToolElement(taTools[tool], scope.tools[tool]);
                        // append the tool compiled with the childScope to the group element
                        groupElement.append(scope.tools[tool].$element);
                    });
                    // append the group to the toolbar
                    element.append(groupElement);
                });

                // update a tool
                // if a value is set to null, remove from the display
                // when forceNew is set to true it will ignore all previous settings, used to reset to taTools definition
                // to reset to defaults pass in taTools[key] as _newTool and forceNew as true, ie `updateToolDisplay(key, taTools[key], true);`
                scope.updateToolDisplay = function(key, _newTool, forceNew){
                    var toolInstance = scope.tools[key];
                    if(toolInstance){
                        // get the last toolDefinition, then override with the new definition
                        if(toolInstance._lastToolDefinition && !forceNew) _newTool = angular.extend({}, toolInstance._lastToolDefinition, _newTool);
                        if(_newTool.buttontext === null && _newTool.iconclass === null && _newTool.display === null)
                            throw('textAngular Error: Tool Definition for updating "' + key + '" does not have a valid display/iconclass/buttontext value');

                        // if tool is defined on this toolbar, update/redo the tool
                        if(_newTool.buttontext === null){
                            delete _newTool.buttontext;
                        }
                        if(_newTool.iconclass === null){
                            delete _newTool.iconclass;
                        }
                        if(_newTool.display === null){
                            delete _newTool.display;
                        }

                        var toolElement = setupToolElement(_newTool, toolInstance);
                        toolInstance.$element.replaceWith(toolElement);
                        toolInstance.$element = toolElement;
                    }
                };

                // we assume here that all values passed are valid and correct
                scope.addTool = function(key, _newTool, groupIndex, index){
                    scope.tools[key] = angular.extend(scope.$new(true), taTools[key], defaultChildScope, {name: key});
                    scope.tools[key].$element = setupToolElement(taTools[key], scope.tools[key]);
                    var group;
                    if(groupIndex === undefined) groupIndex = scope.toolbar.length - 1;
                    group = angular.element(element.children()[groupIndex]);

                    if(index === undefined){
                        group.append(scope.tools[key].$element);
                        scope.toolbar[groupIndex][scope.toolbar[groupIndex].length - 1] = key;
                    }else{
                        group.children().eq(index).after(scope.tools[key].$element);
                        scope.toolbar[groupIndex][index] = key;
                    }
                };

                textAngularManager.registerToolbar(scope);

                scope.$on('$destroy', function(){
                    textAngularManager.unregisterToolbar(scope.name);
                });
            }
        };
    }
]);
textAngular.directive('textAngularVersion', ['textAngularManager',
    function(textAngularManager) {
        var version = textAngularManager.getVersion();
        return {
            restrict: "EA",
            link: function (scope, element, attrs) {
                element.html(version);
            }
        };
    }
]);

return textAngular.name;

}));
