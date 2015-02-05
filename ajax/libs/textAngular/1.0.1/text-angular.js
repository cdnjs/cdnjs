/*
textAngular
Author : Austin Anderson
License : 2013 MIT
Version 1.0.0
How to Use:
1.Include textAngular.js in your project, alternatively grab all this code and throw it in your "directives.js" module file.
2.Create a div or something, and add the text-angular directive to it. ALSO add a text-angular-name="<YOUR TEXT EDITOR NAME>"
3.Create a textAngularOpts object and bind it to your local scope in the controller you want controlling textAngular
It should look something like:
$scope.textAngularOpts = {
..options go here..
}
4.IF YOU WANT ALL EDITORS TO HAVE INDIVIDUAL SETTINGS -> go to 6. Else go to 7.
5. Create the textAngularEditors property manually (it will get created regardless). Then add to it, a new property with the name of your editor you chose earlier,
if it was "coolMonkeyMan" it will look like this:
$scope.textAngularOpts = {
..options for ALL editors, unless they have their own property...
textAngularEditors : {
coolMonkeyMan : {
..options for this editor ALONE ...
}
}
}

7. Globally inherited settings for each editor or individual settings? Either way you'll need to supply some options!

**OPTIONS**
html <STRING> the default html to show in the editor on load (also will be the property to watch for HTML changes!!!)
toolbar <ARRAY of OBJECTS> holds the toolbar items to configure, more on that later
disableStyle <BOOLEAN> disable all styles on this editor
theme <OBJECT of OBJECTS> holds the theme objects, more on that later
**Toolbar Settings**
The list of available tools in textAngular is large.

Add tools to the toolbar like:

toolbar : [
{title : "<i class='icon-code'></i>", name : "html"},
{title : "h1", name : "h1"},
{title : "h2", name : "h2"}
..and more
]
**OPTIONS**
title <STRING> Can be an angular express, html, or text. Use this to add icons to each tool i,e "<i class='icon-code'></i>"
name <STRING> the command, the tool name, has to be one of the following:

h1
h2
h3
p
pre
ul
ol
quote
undo
redo
b
justifyLeft
justifyRight
justifyCenter
i
clear
insertImage
insertHtml
createLink


**Theme settings**
Every piece of textAngular has a specific class you can grab and style in CSS.
However, you can also use the theme object to specify styling.
Each property takes a normal, jQuery-like CSS property object.
Heres an example :
theme : {
editor : {
"background" : "white",
"color" : "gray",
"text-align" : "left",
"border" : "3px solid rgba(2,2,2,0.2)",
"border-radius" : "5px",
"font-size" : "1.3em",
"font-family" : "Tahoma"
},
toolbar : {
..some styling...
},
toolbarItems : {
..some more styling...
}
}
}

**OPTIONS**

editor -> the actual editor element
toolbar -> the toolbar wrapper
toolbarItems -> each toolbar item
insertForm -> the form that holds the insert stuff
insertFormBtn -> the button that submits the insert stuff


**HOW TO GET THE HTML**

To actually get the model (watch or bind),
simply follow this model:

textAngularOpts.textAngularEditors.<YOUR EDITORS NAME>.html

so to bind the expression:

{{textAngularOpts.textAngularEditors.<YOUR EDITORS NAME>.html}}

or to $watch for changes:

$scope.$watch('textAngularOpts.textAngularEditors.<YOUR EDITORS NAME>.html', function(oldHTML, newHTML){
console.log("My new html is: "+newHTML);
});

*/

var textAngular = angular.module('textAngular',[]);

textAngular.directive('compile', function ($compile) {
            // directive factory creates a link function
            return function (scope, element, attrs) {
                scope.$watch(
                    function (scope) {
                        return scope.$eval(attrs.compile);
                    },
                    function (value) {
                        element.html(value);
                        $compile(element.contents())(scope);
                    }
                );
            };
        });


textAngular.directive('textAngular', function ($compile, $sce, $window, $timeout) {
        var methods = {
            theme: function (scope, opts) {
                if (opts.disableStyle) {
                    return false;
                }
                scope.theme = !!!opts.theme ? {} : opts.theme;

                var editorDefault = {
                    "resize": "both",
                    "overflow-y": "auto",
                    "min-height": "300px",
                    "text-align": "left",
                    "padding": "4px"
                };
                var toolbarDefault = { //to prevent people from freaking out
                    'margin': '0.2em',
                    'text-align': 'right',
                    'overflow': 'hidden',
                    'border-radius': '3px',
                    'display': 'inline-block'
                };

                scope.theme.editor = !!!scope.theme.editor ? {
                    "background": "#FFFFFF",
                    "color": "#5E5E5E",
                    "border": "1px solid #C4C4C4",
                    "padding": "4px",
                    "resize": "both",
                    "overflow-y": "auto",
                    "min-height": "300px",
                    "text-align": "left",
                    "border-radius": "3px"
                } : angular.extend(scope.theme.editor, editorDefault);

                scope.theme.toolbar = !!!scope.theme.toolbar ? {
                    'margin': '0.2em',
                    'text-align': 'right',
                    'overflow': 'hidden',
                    'border-radius': '3px',
                    'border': '1px #C4C4C4',
                    'display': 'inline-block'
                } : angular.extend(scope.theme.toolbar, toolbarDefault);

                scope.theme.toolbarItems = !!!scope.theme.toolbarItems ? {
                    'cursor': 'pointer',
                    'display': 'inline-block',
                    'padding': '0.2em 0.4em',
                    'margin-left': '0em',
                    'background': 'gray',
                    'color': 'white',
                    "font-size": "14px"
                } : scope.theme.toolbarItems;

                scope.theme.insertForm = !!!scope.theme.insertForm ? {
                    'text-align': 'right',
                    'padding': '0.2em'
                } : scope.theme.insertForm;

                scope.theme.insertFormBtn = !!!scope.theme.insertFormBtn ? {
                    'margin-top': '0.2em'
                } : scope.theme.insertFormBtn;
            },
            compileHtml: function (scope, html) {
                var compHtml = $("<div>").append(html).html().replace(/(class="(.*?)")|(class='(.*?)')/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
                if (scope.showHtml == "load") {
                    scope.textAngularModel.text = $sce.trustAsHtml(compHtml);
                    scope.textAngularModel.html = $sce.trustAsHtml(compHtml.replace(/</g, "&lt;"));
                    scope.showHtml = (scope.showHtmlDefault || false);
                } else if (scope.showHtml) {
                    scope.textAngularModel.text = $sce.trustAsHtml(compHtml);
                } else {
                    scope.textAngularModel.html = $sce.trustAsHtml(compHtml.replace(/</g, "&lt;"));
                }
                scope.$parent.textAngularOpts.textAngularEditors[scope.name]["html"] = compHtml;
            },
            //wraps the selection in the provided tag
            wrapSelection: function (command, opt) {
                document.execCommand(command, false, opt);
            },
            toolbarFn: {
                html: function (scope, el) {
                    scope.showHtml = !scope.showHtml;
                    if (scope.showHtml) {
                        var ht = $(el).find('.textAngular-text').html();
                        $timeout(function () { //hacky!
                            $(el).find('.textAngular-html').focus();
                        }, 100)
                    } else {
                        var ht = $(el).find('.textAngular-html').html();
                        $timeout(function () { //hacky! but works!
                            $(el).find('.textAngular-text').focus();
                        }, 100);
                    }
                    methods.compileHtml(scope, ht);
                },
                h1: function (scope) {
                    methods.wrapSelection("formatBlock", "<H1>");
                },
                h2: function (scope) {
                    methods.wrapSelection("formatBlock", "<H2>");
                },
                h3: function (scope) {
                    methods.wrapSelection("formatBlock", "<H3>");
                },
                p: function (scope) {
                    methods.wrapSelection("formatBlock", "<P>");
                },
                pre: function (scope) {
                    methods.wrapSelection("formatBlock", "<PRE>");
                },
                ul: function (scope) {
                    methods.wrapSelection("insertUnorderedList", null);
                },
                ol: function (scope) {
                    methods.wrapSelection("insertOrderedList", null);
                },
                quote: function (scope) {
                    methods.wrapSelection("formatBlock", "<BLOCKQUOTE>");
                },
                undo: function (scope) {
                    methods.wrapSelection("undo", null);
                },
                redo: function (scope) {
                    methods.wrapSelection("redo", null);
                },
                b: function (scope) {
                    methods.wrapSelection("bold", null);
                },
                justifyLeft: function (scope) {
                    methods.wrapSelection("justifyLeft", null);
                },
                justifyRight: function (scope) {
                    methods.wrapSelection("justifyRight", null);
                },
                justifyCenter: function (scope) {
                    methods.wrapSelection("justifyCenter", null);
                },
                i: function (scope) {
                    methods.wrapSelection("italic", null);
                },
                clear: function (scope) {
                    console.log('asdasd');
                    methods.wrapSelection("FormatBlock", "<div>");
                },
                insertImage: function (scope) {
                    if (scope.inserting == true) {
                        scope.inserting = false;
                        return false;
                    }
                    scope.insert.model = "";
                    scope.inserting = true;
                    scope.insert.text = "Insert Image";
                    scope.currentInsert = "insertImage";

                },
                insertHtml: function (scope) {
                    if (scope.inserting == true) {
                        scope.inserting = false;
                        return false;
                    }
                    scope.insert.model = "";
                    scope.inserting = true;
                    scope.insert.text = "Insert HTML";
                    scope.currentInsert = "insertHtml";
                },
                createLink: function (scope) {
                    if (scope.inserting == true) {
                        scope.inserting = false;
                        return false;
                    }
                    scope.insert.model = "";
                    scope.inserting = true;
                    scope.insert.text = "Make a Link";
                    scope.currentInsert = "createLink";

                }

            }
        };

      
    return {
template : "<div class='textAngular-root' style='text-align:right;'>\
<div class='textAngular-toolbar' ng-style='theme.toolbar'><span ng-repeat='toolbarItem in toolbar' title='{{toolbarItem.title}}' class='textAngular-toolbar-item' ng-style='theme.toolbarItems' ng-mousedown='runToolbar(toolbarItem.name,$event)' unselectable='on' compile='toolbarItem.icon' name='toolbarItem.name'></span></div>\
<form class='textAngular-insert' ng-show='inserting' ng-style='theme.insertForm'><input type='text' ng-model='insert.model' required><div class='textAngular-insert-submit'><button ng-style='theme.insertFormBtn' ng-mousedown='finishInsert();'>{{insert.text}}</button></div></form>\
<pre contentEditable='true' ng-show='showHtml' class='textAngular-html' ng-style='theme.editor' ng-bind-html='textAngularModel.html' ></pre>\
<div contentEditable='true' ng-hide='showHtml' class='textAngular-text' ng-style='theme.editor' ng-bind-html='textAngularModel.text' ></div>\
</div>",
replace : true,
scope : {},
restrict : "A",
controller : function($scope,$element,$attrs){
console.log("Thank you for using textAngular! http://www.textangular.com");
$scope.insert = {};
$scope.finishInsert = function(){
methods.wrapSelection($scope.currentInsert,$scope.insert.model);
$scope.inserting = false;
}

$scope.runToolbar = function(name,$event){
$event.preventDefault();
var wd = methods.toolbarFn[name]($scope,$element);
if (name == "html") return;
if ($scope.showHtml) {
var ht = $($element).find('.textAngular-html').html();
}else{
var ht = $($element).find('.textAngular-text').html();
}
methods.compileHtml($scope,ht);
}
},
link : function(scope,el,attr){
scope.$parent.$watch('textAngularOpts', function(){
if (!!!scope.$parent.textAngularOpts) {
console.log("No textAngularOpts config object found in scope! Please create one!");
}
scope.showHtml = "load"; //first state for updating boths
if (!!!attr.textAngularName) {
console.log("No 'text-angular-name' directive found on directve root element. Please add one! ");
return false;
}
var name = attr.textAngularName;
scope.name = name;
//create a new object if one doesn't yet exist
if (!!!scope.$parent.textAngularOpts.textAngularEditors) scope.$parent.textAngularOpts.textAngularEditors = {};

if (!!!scope.$parent.textAngularOpts.textAngularEditors[name] ) {
scope.$parent.textAngularOpts.textAngularEditors[name] = {};
var opts = scope.$parent.textAngularOpts;
scope.toolbar = scope.$parent.textAngularOpts.toolbar; //go through each toolbar item and find matches against whats configured in the opts
}else{
var opts = scope.$parent.textAngularOpts.textAngularEditors[name];
scope.toolbar = scope.$parent.textAngularOpts.textAngularEditors[name].toolbar; //go through each toolbar item and find matches against whats configured in the opts
}

methods.theme(scope,opts);

scope.textAngularModel = {};
methods.compileHtml(scope,opts.html);

$(el).find('.textAngular-text,.textAngular-html').on('keyup', function(e){
if (scope.showHtml) {
var ht = $(this.parentNode).find('.textAngular-html').html();
}else{
var ht = $(this.parentNode).find('.textAngular-text').html();
}

scope.$apply(methods.compileHtml(scope,ht));


});
});
}


};
    });
