/*
 * autor: Miller Augusto S. Martins
 * e-mail: miller.augusto@gmail.com
 * github: miamarti
 * */
(function (window, document) {
    "use strict";
    (angular.module('ng.ckeditor', ['ng']))
    .directive('ngCkeditor', ['$timeout', function ($timeout) {

        CKEDITOR.on('instanceCreated', function (event) {
            var editor = event.editor,
                element = editor.element;

            if (element.getAttribute('class') == 'simpleEditor') {
                editor.on('configLoaded', function () {
                    editor.config.removePlugins = 'colorbutton,find,flash,font, forms,iframe,image,newpage,removeformat, smiley,specialchar,stylescombo,templates';
                    editor.removeButtons = 'About';
                    editor.config.toolbarGroups = [{
                        name: 'editing',
                        groups: ['basicstyles', 'links']
                    }, {
                        name: 'undo'
                    }, {
                        name: 'clipboard',
                        groups: ['selection', 'clipboard']
                    }];
                });
            }
        });

        return {
            restrict: 'E',
            scope: {
                ngModel: '=ngModel',
                ngChange: '=ngChange',
                ngDisabled: '=ngDisabled',
                ngConfig: '=ngConfig'
            },
            link: function (scope, elem, attrs) {
                elem[0].innerHTML = '<div class="ng-ckeditor"></div> <div class="totalTypedCharacters"></div>';

                var elemEditor = elem[0].querySelectorAll('.ng-ckeditor');
                var config = {
                    removeButtons: (attrs.removeButtons != undefined) ? 'About,' + attrs.removeButtons : 'About',
                    readOnly: scope.ngDisabled ? scope.ngDisabled : false
                };
                if (attrs.removePlugins != undefined) {
                    config.removePlugins = attrs.removePlugins;
                }
                if (attrs.skin != undefined) {
                    config.skin = attrs.skin;
                }
                if (attrs.width != undefined) {
                    config.width = attrs.width;
                }
                if (attrs.height != undefined) {
                    config.height = attrs.height;
                }
                if (attrs.resizeEnabled != undefined) {
                    config.resize_enabled = (attrs.resizeEnabled == "false") ? false : true;
                }

                var editor = CKEDITOR.appendTo(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');

                var addEventListener = function (editor) {
                    (editor).on('change', function (evt) {
                        scope.$apply(function () {
                            scope.ngModel = evt.editor.getData();
                        });
                        if (attrs.msnCount != undefined) {
                            element[0].querySelector('.totalTypedCharacters').innerHTML = attrs.msnCount + " " + evt.editor.getData().length;
                        }
                        if(scope.ngChange && typeof scope.ngChange === 'function'){
                            scope.ngChange(evt.editor.getData());
                        }
                    });
                    (editor).on('focus', function (evt) {
                        editor.setData(scope.ngModel);
                    });
                    (editor).on('key', function (evt) {
	                    $timeout(function () {
		                    scope.$apply(function () {
			                    scope.ngModel = evt.editor.getData();
		                    });
		                    if (attrs.msnCount != undefined) {
			                    element[0].querySelector('.totalTypedCharacters').innerHTML = attrs.msnCount + " " + evt.editor.getData().length;
		                    }
		                    if(scope.ngChange && typeof scope.ngChange === 'function'){
			                    scope.ngChange(evt.editor.getData());
		                    }
                        }, 0);
                    });
                };

                var interval = undefined;
                var setValue = function (value, editor) {
                    if (interval) {
                        clearTimeout(interval);
                    }
                    interval = setTimeout(function () {
                        if (value && editor) {
                            editor.setData(value);
                        } else if (editor) {
                            editor.setData('');
                        }
                    }, 1000);
                };

                addEventListener(editor);

                scope.$watch('ngModel', function (value) {
                    clearTimeout(interval);
                    if(value !== editor.getData()){
                        setValue(value, editor);   
                    }
                });

                scope.$watch('ngDisabled', function (value) {
                    if (value) {
                        config.readOnly = true;
                    } else {
                        config.readOnly = false;
                    }

                    //editor = CKEDITOR.replace(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');
                    editor.destroy();
                    editor = CKEDITOR.appendTo(elemEditor[0], (scope.ngConfig ? scope.ngConfig : config), '');
                    addEventListener(editor);
                    editor.setData(scope.ngModel);

                });

            }
        };
    }]);
})(window, document);
