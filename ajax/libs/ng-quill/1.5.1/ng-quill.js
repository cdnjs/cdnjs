'use strict';
var app;
// declare ngQuill module
app = angular.module('ngQuill', []);

app.provider('ngQuillConfig', function () {
    var config = {
        // default fontFamilies
        fontSizes: [{
            size: '10px',
            alias: 'small'
        }, {
            size: '13px',
            alias: 'normal'
        }, {
            size: '18px',
            alias: 'large'
        }, {
            size: '32px',
            alias: 'huge'
        }],
        // default fontFamilies
        fontFamilies: [{
            label: 'Sans Serif',
            alias: 'sans-serif'
        }, {
            label: 'Serif',
            alias: 'serif'
        }, {
            label: 'Monospace',
            alias: 'monospace'
        }],
        // formats list
        formats: [
            'link',
            'image',
            'bold',
            'italic',
            'underline',
            'strike',
            'color',
            'background',
            'align',
            'font',
            'size',
            'bullet',
            'list'
        ],
        // default translations
        translations: {
            font: 'Font',
            size: 'Size',
            small: 'Small',
            normal: 'Normal',
            large: 'Large',
            huge: 'Huge',
            bold: 'Bold',
            italic: 'Italic',
            underline: 'Underline',
            strike: 'Strikethrough',
            textColor: 'Text Color',
            backgroundColor: 'Background Color',
            list: 'List',
            bullet: 'Bullet',
            textAlign: 'Text Align',
            left: 'Left',
            center: 'Center',
            right: 'Right',
            justify: 'Justify',
            link: 'Link',
            image: 'Image',
            visitURL: 'Visit URL',
            change: 'Change',
            done: 'Done',
            cancel: 'Cancel',
            remove: 'Remove',
            insert: 'Insert',
            preview: 'Preview'
        }
    };

    this.set = function (fontSizes, fontFamilies) {
        if (fontSizes) {
            config.fontSizes = fontSizes;
        }
        if (fontFamilies) {
            config.fontFamilies = fontFamilies;
        }
    };

    this.$get = function () {
        return config;
    };
});

app.service('ngQuillService', ['ngQuillConfig', function (ngQuillConfig) {
    // validate formats
    this.validateFormats = function (checkFormats) {
        var correctFormats = [],
            i = 0;

        for (i; i < checkFormats.length; i = i + 1) {
            if (ngQuillConfig.formats.indexOf(checkFormats[i]) !== -1) {
                correctFormats.push(checkFormats[i]);
            }
        }

        return correctFormats;
    };
}]);

app.component('ngQuillEditor', {
    bindings: {
        'toolbarEntries': '@?',
        'toolbar': '@?',
        'showToolbar': '<?',
        'fontfamilyOptions': '<?',
        'fontsizeOptions': '<?',
        'linkTooltip': '@?',
        'imageTooltip': '@?',
        'theme': '@?',
        'save': '@?',
        'translations': '<?',
        'required': '@?editorRequired',
        'readOnly': '<?',
        'errorClass': '@?',
        'ngModel': '<',
        'callback': '&?',
        'name': '@?',
        'editorStyles': '<?'
    },
    require: {
        'ngModelController': 'ngModel'
    },
    restrict: 'E',
    templateUrl: 'ngQuill/template.html',
    controller: ['$scope', '$element', '$timeout', 'ngQuillService', 'ngQuillConfig', function ($scope, $element, $timeout, ngQuillService, ngQuillConfig) {
        console.log(this.ngModel);
        var config = {
                theme: this.theme || 'snow',
                save: this.save || 'html',
                readOnly: this.readOnly || false,
                formats: this.toolbarEntries ? ngQuillService.validateFormats(this.toolbarEntries.split(' ')) : ngQuillConfig.formats,
                modules: {},
                styles: this.editorStyles || false
            },
            changed = false,
            editor,
            setClass = function () {
                // if editor content length <= 1 and content is required -> add custom error clas and ng-invalid
                if (this.required && (!this.modelLength || this.modelLength <= 1)) {
                    $element.addClass('ng-invalid');
                    $element.removeClass('ng-valid');
                    // if form was reseted and input field set to empty
                    if (this.errorClass && changed && $element.hasClass('ng-dirty')) {
                        $element.children().addClass(this.errorClass);
                    }
                } else { // set to valid
                    $element.removeClass('ng-invalid');
                    $element.addClass('ng-valid');
                    if (this.errorClass) {
                        $element.children().removeClass(this.errorClass);
                    }
                }
            }.bind(this);

        // set required flag (if text editor is required)
        if (this.required && this.required === 'true') {
            this.required = true;
        } else {
            this.required = false;
        }

        // overwrite global settings dynamically
        this.fontsizeOptions = this.fontsizeOptions || ngQuillConfig.fontSizes;
        this.fontfamilyOptions = this.fontfamilyOptions || ngQuillConfig.fontFamilies;

        // default translations
        this.dict = ngQuillConfig.translations;

        this.shouldShow = function (formats) {
            var okay = false,
                i = 0;
            for (i; i < formats.length; i = i + 1) {
                if (config.formats.indexOf(formats[i]) !== -1) {
                    okay = true;
                    break;
                }
            }

            return okay;
        };

        // if there are custom translations
        if (this.translations) {
            this.dict = this.translations;
        }

        // add tooltip modules
        if (this.linkTooltip && this.linkTooltip === 'true') {
            config.modules['link-tooltip'] = {
                template: '<span class="title">' + this.dict.visitURL + ':&nbsp;</span>'
                            + '<a href="#" class="url" target="_blank" href="about:blank"></a>'
                            + '<input class="input" type="text">'
                            + '<span>&nbsp;&#45;&nbsp;</span>'
                            + '<a href="javascript:;" class="change">' + this.dict.change + '</a>'
                            + '<a href="javascript:;" class="remove">' + this.dict.remove + '</a>'
                            + '<a href="javascript:;" class="done">' + this.dict.done + '</a>'
            };
        }
        if (this.imageTooltip && this.imageTooltip === 'true') {
            config.modules['image-tooltip'] = {
                template: '<input class="input" type="textbox">'
                            + '<div class="preview">'
                            + '    <span>' + this.dict.preview + '</span>'
                            + '</div>'
                            + '<a href="javascript:;" class="cancel">' + this.dict.cancel + '</a>'
                            + '<a href="javascript:;" class="insert">' + this.dict.insert + '</a>'
            };
        }

        var settingInitValues = false;
        var settingWithEditor = false;

        function setChanges(changes) {
            // toggle readOnly
            if (changes.readOnly && changes.readOnly.currentValue !== changes.readOnly.previousValue) {
                editor.editor[changes.readOnly.currentValue ? 'disable' : 'enable']();
            }

            // set initial value
            if (changes.ngModel && changes.ngModel.currentValue !== changes.ngModel.previousValue) {
                if (config.save === 'text') {
                    return editor.setText(changes.ngModel.currentValue);
                }
                if (config.save === 'contents') {
                    return editor.setContents(changes.ngModel.currentValue);
                }
                return editor.setHTML(changes.ngModel.currentValue);
            }
        }

        this.$onChanges = function (changes) {
            // initial bindings
            if (!editor) {
                var deregister = $scope.$on('editorCreated', function () {
                    deregister();
                    settingInitValues = true;

                    setChanges(changes);
                });

                return;
            }

            if (settingWithEditor) {
                return;
            }

            setChanges(changes);
        };

        this.$onInit = function () {
            console.log(this);
            // init editor
            editor = new Quill($element[0].querySelector('.advanced-wrapper .editor-container'), config);

            // mark model as touched if editor lost focus
            editor.on('selection-change', function (range) {
                if (range) {
                    return;
                }
                $timeout(function () {
                    this.ngModelController.$setTouched();
                }.bind(this));
            }.bind(this));

            // add toolbar afterwards with a timeout to be sure that translations have been replaced.
            if (this.toolbar && this.toolbar === 'true') {
                $timeout(function () {
                    editor.addModule('toolbar', {
                        container: $element[0].querySelector('.advanced-wrapper .toolbar-container')
                    });
                    this.toolbarCreated = true;
                    this.showToolbar = this.hasOwnProperty('showToolbar') ? this.showToolbar : true;
                }.bind(this), 0);
            }

            // provide event to get informed when editor is created -> pass editor object.
            $timeout(function(){
                $scope.$emit('editorCreated', editor, this.name);

                // additional creation callback
                if (this.callback) {
                    this.callback({
                        editor: editor,
                        name: this.name
                    });
                }

                // clear history of undo manager to avoid removing inital model value via ctrl + z
                editor.getModule('undo-manager').clear();
            }.bind(this));

            this.regEx = /^([2-9]|[1-9][0-9]+)$/;

            // Update model on textchange
            editor.on('text-change', function () {
                var oldChange = changed;
                changed = true;

                if (settingInitValues) {
                    settingInitValues = false;
                    return;
                }

                settingWithEditor = true;

                $timeout(function () {
                    // Calculate content length
                    this.modelLength = editor.getLength();
                    // Check if error class should be set
                    if (oldChange) {
                        setClass();
                    }
                    var setValue;
                    if (config.save === 'text') {
                        setValue = editor.getText();
                    } else if (config.save === 'contents') {
                        setValue = editor.getContents();
                    } else {
                        setValue = editor.getHTML();
                    }
                    // Set new model value
                    if(editor.getLength() <= 1) {
                        this.ngModelController.$setViewValue('');
                    } else {
                        this.ngModelController.$setViewValue(setValue);
                    }

                    settingWithEditor = false;
                }.bind(this));
            }.bind(this));

            // Clean-up
            $element.on('$destroy', function () {
                editor.destroy();
            });
        };
    }]
});

app.run([
    '$templateCache',
    '$rootScope',
    '$window',
    function ($templateCache) {
        // put template in template cache
        return $templateCache.put('ngQuill/template.html',
            '<div id="content-container">' +
                '<div class="advanced-wrapper">' +
                    '<div class="toolbar toolbar-container" ng-if="$ctrl.toolbar" ng-show="$ctrl.toolbarCreated && $ctrl.showToolbar">' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'font\', \'size\'])">' +
                            '<select title="{{$ctrl.dict.font}}" class="ql-font" ng-if="$ctrl.shouldShow([\'font\'])">' +
                                '<option ng-repeat="option in $ctrl.fontfamilyOptions" value="{{option.alias}}">{{option.label}}</option>' +
                            '</select>' +
                            '<select title="{{$ctrl.dict.size}}" class="ql-size" ng-if="$ctrl.shouldShow([\'size\'])">' +
                                '<option ng-repeat="option in $ctrl.fontsizeOptions" ng-selected="$index === 1" value="{{option.size}}">{{$ctrl.dict[option.alias] || option.alias}}</option>' +
                            '</select>' +
                        '</span>' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'bold\', \'italic\', \'underline\', \'strike\'])">' +
                            '<span title="{{$ctrl.dict.bold}}" class="ql-format-button ql-bold" ng-if="$ctrl.shouldShow([\'bold\'])"></span>' +
                            '<span title="{{$ctrl.dict.italic}}" class="ql-format-button ql-italic" ng-if="$ctrl.shouldShow([\'italic\'])"></span>' +
                            '<span title="{{$ctrl.dict.underline}}" class="ql-format-button ql-underline" ng-if="$ctrl.shouldShow([\'underline\'])"></span>' +
                            '<span title="{{$ctrl.dict.strike}}" class="ql-format-button ql-strike" ng-if="$ctrl.shouldShow([\'strike\'])"></span>' +
                        '</span>' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'color\', \'background\'])">' +
                            '<select title="{{$ctrl.dict.textColor}}" class="ql-color" ng-if="$ctrl.shouldShow([\'color\'])">' +
                                '<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>' +
                                '<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>' +
                                '<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>' +
                                '<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>' +
                                '<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>' +
                                '<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>' +
                                '<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>' +
                                '<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>' +
                                '<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>' +
                                '<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>' +
                                '<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>' +
                                '<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>' +
                                '<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>' +
                                '<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>' +
                                '<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>' +
                                '<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>' +
                                '<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>' +
                                '<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>' +
                                '<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>' +
                                '<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>' +
                                '<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>' +
                                '<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>' +
                                '<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>' +
                                '<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>' +
                                '<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>' +
                                '<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>' +
                                '<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>' +
                                '<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>' +
                                '<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>' +
                                '<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>' +
                                '<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>' +
                                '<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>' +
                                '<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>' +
                                '<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>' +
                                '<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>' +
                            '</select>' +
                            '<select title="{{$ctrl.dict.backgroundColor}}" class="ql-background" ng-if="$ctrl.shouldShow([\'background\'])">' +
                                '<option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>' +
                                '<option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>' +
                                '<option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>' +
                                '<option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>' +
                                '<option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>' +
                                '<option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>' +
                                '<option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>' +
                                '<option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>' +
                                '<option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>' +
                                '<option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>' +
                                '<option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>' +
                                '<option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>' +
                                '<option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>' +
                                '<option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>' +
                                '<option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>' +
                                '<option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>' +
                                '<option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>' +
                                '<option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>' +
                                '<option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>' +
                                '<option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>' +
                                '<option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>' +
                                '<option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>' +
                                '<option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>' +
                                '<option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>' +
                                '<option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>' +
                                '<option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>' +
                                '<option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>' +
                                '<option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>' +
                                '<option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>' +
                                '<option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>' +
                                '<option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>' +
                                '<option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>' +
                                '<option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>' +
                                '<option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>' +
                                '<option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>' +
                            '</select>' +
                        '</span>' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'list\', \'bullet\'])">' +
                            '<span title="{{$ctrl.dict.list}}" class="ql-format-button ql-list" ng-if="$ctrl.shouldShow([\'list\'])"></span>' +
                            '<span title="{{$ctrl.dict.bullet}}" class="ql-format-button ql-bullet" ng-if="$ctrl.shouldShow([\'bullet\'])"></span>' +
                        '</span>' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'align\'])">' +
                            '<select title="{{$ctrl.dict.textAlign}}" class="ql-align">' +
                                '<option value="left" label="{{$ctrl.dict.left}}" selected=""></option>' +
                                '<option value="center" label="{{$ctrl.dict.center}}"></option>' +
                                '<option value="right" label="{{$ctrl.dict.right}}"></option>' +
                                '<option value="justify" label="{{$ctrl.dict.justify}}"></option>' +
                            '</select>' +
                        '</span>' +
                        '<span class="ql-format-group" ng-if="$ctrl.shouldShow([\'link\', \'image\'])">' +
                            '<span title="{{$ctrl.dict.link}}" class="ql-format-button ql-link" ng-if="$ctrl.shouldShow([\'link\'])"></span>' +
                            '<span title="{{$ctrl.dict.image}}" class="ql-format-button ql-image" ng-if="$ctrl.shouldShow([\'image\'])"></span>' +
                        '</span>' +
                    '</div>' +
                    '<div class="editor-container"></div>' +
                    '<input type="text" ng-model="$ctrl.modelLength" ng-if="$ctrl.required" ng-hide="true" ng-pattern="/^([2-9]|[1-9][0-9]+)$/">' +
                '</div>' +
            '</div>');
    }
]);
