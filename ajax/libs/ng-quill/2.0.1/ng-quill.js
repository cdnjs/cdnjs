'use strict';
var app;
// declare ngQuill module
app = angular.module('ngQuill', []);

app.provider('ngQuillConfig', function () {
    var config = {
        modules: {
            toolbar: [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{ 'header': 1 }, { 'header': 2 }],               // custom button values
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
                [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
                [{ 'direction': 'rtl' }],                         // text direction

                [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                [{ 'font': [] }],
                [{ 'align': [] }],

                ['clean'],                                         // remove formatting button

                ['link', 'image', 'video']                         // link and image, video
            ]
        },
        theme: 'snow',
        placeholder: 'Insert text here ...',
        readOnly: false,
        boundary: document.body
    };

    this.set = function (modules, theme, placeholder, formats, boundary, readOnly) {
        if (modules) {
            config.modules = modules;
        }
        if (theme) {
            config.theme = theme;
        }
        if (placeholder) {
            config.placeholder = placeholder;
        }
        if (boundary) {
            config.boundary = boundary;
        }
        if (readOnly) {
            config.readOnly = readOnly;
        }
        if (formats) {
            config.formats = formats;
        }
    };

    this.$get = function () {
        return config;
    };
});

app.component('ngQuillEditor', {
    bindings: {
        'modules': '<modules',
        'theme': '@?',
        'readOnly': '<?',
        'formats': '<?',
        'placeholder': '@?',
        'onEditorCreated': '&?',
        'onContentChanged': '&?',
        'ngModel': '<'
    },
    require: {
        ngModelCtrl: 'ngModel'
    },
    template: '<div></div>',
    controller: ['$element', '$timeout', 'ngQuillConfig', function ($element, $timeout, ngQuillConfig) {
        var config = {
                theme: this.theme || ngQuillConfig.theme,
                readOnly: this.readOnly || ngQuillConfig.readOnly,
                modules: this.modules || ngQuillConfig.modules,
                formats: this.formats || ngQuillConfig.formats,
                placeholder: this.placeholder ||  ngQuillConfig.placeholder,
                bounary: ngQuillConfig.boundary,
            },
            content,
            editorElem,
            modelChanged = false,
            editorChanged = false,
            editor;

        this.$onChanges = function (changes) {
            if (changes.ngModel && changes.ngModel.currentValue !== changes.ngModel.previousValue) {
                content = changes.ngModel.currentValue;

                if (editor && !editorChanged) {
                    modelChanged = true;
                    if (content) {
                        editor.pasteHTML(content);
                        return;
                    }
                    editor.setText('');
                }
                editorChanged = false;
            }
            if (editor && changes.readOnly) {
                editor.enable(!changes.readOnly.currentValue);
            }
        };

        this.$postLink = function () {
            editorElem = $element[0].children[0];
            // init editor
            editor = new Quill(editorElem, config);

            if (content) {
                modelChanged = true;

                editor.pasteHTML(content);
            }

            // provide event to get informed when editor is created -> pass editor object.
            if (this.onEditorCreated) {
                this.onEditorCreated({editor: editor});
            }

            // mark model as touched if editor lost focus
            editor.on('selection-change', function (range) {
                if (range) {
                    return;
                }
                $timeout(function () {
                    this.ngModelCtrl.$setTouched();
                }.bind(this));
            }.bind(this));

            // update model if text changes
            editor.on('text-change', function () {
                var html = editorElem.children[0].innerHTML;
                var text = editor.getText();

                if (html === '<p><br></p>') {
                    html = null;
                }

                if (!modelChanged) {
                    $timeout(function () {
                        editorChanged = true;

                        if (this.onContentChanged) {
                            this.onContentChanged({
                                editor: editor,
                                html: html,
                                text: text
                            });
                        }

                        this.ngModelCtrl.$setViewValue(html);
                    }.bind(this));
                }
                modelChanged = false;
            }.bind(this));
        };
    }]
});
