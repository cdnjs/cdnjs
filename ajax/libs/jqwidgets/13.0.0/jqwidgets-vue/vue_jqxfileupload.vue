<template>
    <div v-bind:id="id">
        <slot></slot>
    </div>
</template>

<script>
    import '../jqwidgets/jqxcore.js';
    import '../jqwidgets/jqxbuttons.js';
    import '../jqwidgets/jqxfileupload.js';

    export default {
        props: {
            autoUpload: Boolean,
            accept: String,
            browseTemplate: String,
            cancelTemplate: String,
            disabled: Boolean,
            fileInputName: String,
            height: [Number, String],
            localization: Object,
            multipleFilesUpload: Boolean,
            renderFiles: Function,
            rtl: Boolean,
            theme: String,
            uploadUrl: String,
            uploadTemplate: String,
            width: [Number, String],
            autoCreate: {
                default: true,
                type: Boolean
            }
        },
        created: function () {
            this.id = 'jqxFileUpload' + JQXLite.generateID();
            this.componentSelector = '#' + this.id;
        },
        mounted: function () {
            if (this.autoCreate) this.__createComponent__();
        },
        methods: {
            createComponent: function (options) {
                if (!this.autoCreate) this.__createComponent__(options)
                else console.warn('Component is already created! If you want to use createComponent, please set "autoCreate" property to "false".');
            },
            setOptions: function (options) {
                JQXLite(this.componentSelector).jqxFileUpload(options);
            },
            getOptions: function () {
                const usedProps = Object.keys(this.__manageProps__());
                const resultToReturn = {};
                for (let i = 0; i < usedProps.length; i++) {
                    resultToReturn[usedProps[i]] = JQXLite(this.componentSelector).jqxFileUpload(usedProps[i]);
                }
                return resultToReturn;
            },
            browse: function() {
                JQXLite(this.componentSelector).jqxFileUpload('browse');  
            },
            cancelFile: function(fileIndex) {
                JQXLite(this.componentSelector).jqxFileUpload('cancelFile', fileIndex);  
            },
            cancelAll: function() {
                JQXLite(this.componentSelector).jqxFileUpload('cancelAll');  
            },
            destroy: function() {
                JQXLite(this.componentSelector).jqxFileUpload('destroy');  
            },
            render: function() {
                JQXLite(this.componentSelector).jqxFileUpload('render');  
            },
            refresh: function() {
                JQXLite(this.componentSelector).jqxFileUpload('refresh');  
            },
            uploadFile: function(fileIndex) {
                JQXLite(this.componentSelector).jqxFileUpload('uploadFile', fileIndex);  
            },
            uploadAll: function() {
                JQXLite(this.componentSelector).jqxFileUpload('uploadAll');  
            },
            _autoUpload: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('autoUpload', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('autoUpload');
                }
            },
            _accept: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('accept', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('accept');
                }
            },
            _browseTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('browseTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('browseTemplate');
                }
            },
            _cancelTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('cancelTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('cancelTemplate');
                }
            },
            _disabled: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('disabled', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('disabled');
                }
            },
            _fileInputName: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('fileInputName', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('fileInputName');
                }
            },
            _height: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('height', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('height');
                }
            },
            _localization: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('localization', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('localization');
                }
            },
            _multipleFilesUpload: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('multipleFilesUpload', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('multipleFilesUpload');
                }
            },
            _renderFiles: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('renderFiles', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('renderFiles');
                }
            },
            _rtl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('rtl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('rtl');
                }
            },
            _theme: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('theme', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('theme');
                }
            },
            _uploadUrl: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('uploadUrl', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('uploadUrl');
                }
            },
            _uploadTemplate: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('uploadTemplate', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('uploadTemplate');
                }
            },
            _width: function(arg) {
                if (arg !== undefined) {
                    JQXLite(this.componentSelector).jqxFileUpload('width', arg)
                } else {
                    return JQXLite(this.componentSelector).jqxFileUpload('width');
                }
            },
            __createComponent__: function (options) {
                let widgetOptions;
                options ? widgetOptions = options : widgetOptions = this.__manageProps__();
                JQXLite(this.componentSelector).jqxFileUpload(widgetOptions);
                this.__extendProps__();
                this.__wireEvents__();
            },
            __manageProps__: function () {
                const widgetProps = ['autoUpload','accept','browseTemplate','cancelTemplate','disabled','fileInputName','height','localization','multipleFilesUpload','renderFiles','rtl','theme','uploadUrl','uploadTemplate','width'];
                const componentProps = this.$options.propsData;
                let options = {};

                for (let prop in componentProps) {
                    if (widgetProps.indexOf(prop) !== -1) {
                        options[prop] = componentProps[prop];
                    }
                }
                return options;
            },
            __extendProps__: function () {
                const that = this;

                Object.defineProperty(that, 'autoUpload', {
                    get: function() {
                        return that._autoUpload();
                    },
                    set: function(newValue) {
                        that._autoUpload(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'accept', {
                    get: function() {
                        return that._accept();
                    },
                    set: function(newValue) {
                        that._accept(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'browseTemplate', {
                    get: function() {
                        return that._browseTemplate();
                    },
                    set: function(newValue) {
                        that._browseTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'cancelTemplate', {
                    get: function() {
                        return that._cancelTemplate();
                    },
                    set: function(newValue) {
                        that._cancelTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'disabled', {
                    get: function() {
                        return that._disabled();
                    },
                    set: function(newValue) {
                        that._disabled(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'fileInputName', {
                    get: function() {
                        return that._fileInputName();
                    },
                    set: function(newValue) {
                        that._fileInputName(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'height', {
                    get: function() {
                        return that._height();
                    },
                    set: function(newValue) {
                        that._height(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'localization', {
                    get: function() {
                        return that._localization();
                    },
                    set: function(newValue) {
                        that._localization(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'multipleFilesUpload', {
                    get: function() {
                        return that._multipleFilesUpload();
                    },
                    set: function(newValue) {
                        that._multipleFilesUpload(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'renderFiles', {
                    get: function() {
                        return that._renderFiles();
                    },
                    set: function(newValue) {
                        that._renderFiles(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'rtl', {
                    get: function() {
                        return that._rtl();
                    },
                    set: function(newValue) {
                        that._rtl(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'theme', {
                    get: function() {
                        return that._theme();
                    },
                    set: function(newValue) {
                        that._theme(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'uploadUrl', {
                    get: function() {
                        return that._uploadUrl();
                    },
                    set: function(newValue) {
                        that._uploadUrl(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'uploadTemplate', {
                    get: function() {
                        return that._uploadTemplate();
                    },
                    set: function(newValue) {
                        that._uploadTemplate(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(that, 'width', {
                    get: function() {
                        return that._width();
                    },
                    set: function(newValue) {
                        that._width(newValue);
                    },
                    enumerable: true,
                    configurable: true
                });
            },
            __wireEvents__: function () {
                const that = this;

                JQXLite(this.componentSelector).on('remove', function (event) { that.$emit('remove', event); });
                JQXLite(this.componentSelector).on('select', function (event) { that.$emit('select', event); });
                JQXLite(this.componentSelector).on('uploadStart', function (event) { that.$emit('uploadStart', event); });
                JQXLite(this.componentSelector).on('uploadEnd', function (event) { that.$emit('uploadEnd', event); });
            }
        }
    }
</script>
