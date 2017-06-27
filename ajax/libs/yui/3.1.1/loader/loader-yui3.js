YUI.add('loader-yui3', function(Y) {

/**
 * YUI 3 module metadata
 * @module loader
 * @submodule yui3
 */
YUI.Env[Y.version].modules = {
    "anim": {
        "submodules": {
            "anim-base": {
                "requires": [
                    "base-base", 
                    "node-style"
                ]
            }, 
            "anim-color": {
                "requires": [
                    "anim-base"
                ]
            }, 
            "anim-curve": {
                "requires": [
                    "anim-xy"
                ]
            }, 
            "anim-easing": {
                "requires": [
                    "anim-base"
                ]
            }, 
            "anim-node-plugin": {
                "requires": [
                    "node-pluginhost", 
                    "anim-base"
                ]
            }, 
            "anim-scroll": {
                "requires": [
                    "anim-base"
                ]
            }, 
            "anim-xy": {
                "requires": [
                    "anim-base", 
                    "node-screen"
                ]
            }
        }
    }, 
    "async-queue": {
        "requires": [
            "event-custom"
        ]
    }, 
    "attribute": {
        "submodules": {
            "attribute-base": {
                "requires": [
                    "event-custom"
                ]
            }, 
            "attribute-complex": {
                "requires": [
                    "attribute-base"
                ]
            }
        }
    }, 
    "base": {
        "submodules": {
            "base-base": {
                "requires": [
                    "attribute-base"
                ]
            }, 
            "base-build": {
                "requires": [
                    "base-base"
                ]
            }, 
            "base-pluginhost": {
                "requires": [
                    "base-base", 
                    "pluginhost"
                ]
            }
        }
    }, 
    "cache": {
        "requires": [
            "plugin"
        ]
    }, 
    "classnamemanager": {
        "requires": [
            "yui-base"
        ]
    }, 
    "collection": {
        "submodules": {
            "array-extras": {}, 
            "array-invoke": {}, 
            "arraylist": {}, 
            "arraylist-add": {
                "requires": [
                    "arraylist"
                ]
            }, 
            "arraylist-filter": {
                "requires": [
                    "arraylist"
                ]
            }
        }
    }, 
    "compat": {
        "requires": [
            "event-base", 
            "dom", 
            "dump", 
            "substitute"
        ]
    }, 
    "console": {
        "lang": [
            "en", 
            "es"
        ], 
        "plugins": {
            "console-filters": {
                "requires": [
                    "plugin", 
                    "console"
                ], 
                "skinnable": true
            }
        }, 
        "requires": [
            "yui-log", 
            "widget", 
            "substitute"
        ], 
        "skinnable": true
    }, 
    "cookie": {
        "requires": [
            "yui-base"
        ]
    }, 
    "cssbase": {
        "after": [
            "cssreset", 
            "cssfonts", 
            "cssgrids", 
            "cssreset-context", 
            "cssfonts-context", 
            "cssgrids-context"
        ], 
        "path": "cssbase/base-min.css", 
        "type": "css"
    }, 
    "cssbase-context": {
        "after": [
            "cssreset", 
            "cssfonts", 
            "cssgrids", 
            "cssreset-context", 
            "cssfonts-context", 
            "cssgrids-context"
        ], 
        "path": "cssbase/base-context-min.css", 
        "type": "css"
    }, 
    "cssfonts": {
        "path": "cssfonts/fonts-min.css", 
        "type": "css"
    }, 
    "cssfonts-context": {
        "path": "cssfonts/fonts-context-min.css", 
        "type": "css"
    }, 
    "cssgrids": {
        "optional": [
            "cssreset"
        ], 
        "path": "cssgrids/grids-min.css", 
        "requires": [
            "cssfonts"
        ], 
        "type": "css"
    }, 
    "cssgrids-context": {
        "optional": [
            "cssreset-context"
        ], 
        "path": "cssgrids/grids-context-min.css", 
        "requires": [
            "cssfonts-context"
        ], 
        "type": "css"
    }, 
    "cssreset": {
        "path": "cssreset/reset-min.css", 
        "type": "css"
    }, 
    "cssreset-context": {
        "path": "cssreset/reset-context-min.css", 
        "type": "css"
    }, 
    "dataschema": {
        "submodules": {
            "dataschema-array": {
                "requires": [
                    "dataschema-base"
                ]
            }, 
            "dataschema-base": {
                "requires": [
                    "base"
                ]
            }, 
            "dataschema-json": {
                "requires": [
                    "dataschema-base", 
                    "json"
                ]
            }, 
            "dataschema-text": {
                "requires": [
                    "dataschema-base"
                ]
            }, 
            "dataschema-xml": {
                "requires": [
                    "dataschema-base"
                ]
            }
        }
    }, 
    "datasource": {
        "submodules": {
            "datasource-arrayschema": {
                "requires": [
                    "datasource-local", 
                    "plugin", 
                    "dataschema-array"
                ]
            }, 
            "datasource-cache": {
                "requires": [
                    "datasource-local", 
                    "cache"
                ]
            }, 
            "datasource-function": {
                "requires": [
                    "datasource-local"
                ]
            }, 
            "datasource-get": {
                "requires": [
                    "datasource-local", 
                    "get"
                ]
            }, 
            "datasource-io": {
                "requires": [
                    "datasource-local", 
                    "io-base"
                ]
            }, 
            "datasource-jsonschema": {
                "requires": [
                    "datasource-local", 
                    "plugin", 
                    "dataschema-json"
                ]
            }, 
            "datasource-local": {
                "requires": [
                    "base"
                ]
            }, 
            "datasource-polling": {
                "requires": [
                    "datasource-local"
                ]
            }, 
            "datasource-textschema": {
                "requires": [
                    "datasource-local", 
                    "plugin", 
                    "dataschema-text"
                ]
            }, 
            "datasource-xmlschema": {
                "requires": [
                    "datasource-local", 
                    "plugin", 
                    "dataschema-xml"
                ]
            }
        }
    }, 
    "datatype": {
        "submodules": {
            "datatype-date": {
                "lang": [
                    "ar", 
                    "ar-JO", 
                    "ca", 
                    "ca-ES", 
                    "da", 
                    "da-DK", 
                    "de", 
                    "de-AT", 
                    "de-DE", 
                    "el", 
                    "el-GR", 
                    "en", 
                    "en-AU", 
                    "en-CA", 
                    "en-GB", 
                    "en-IE", 
                    "en-IN", 
                    "en-JO", 
                    "en-MY", 
                    "en-NZ", 
                    "en-PH", 
                    "en-SG", 
                    "en-US", 
                    "es", 
                    "es-AR", 
                    "es-BO", 
                    "es-CL", 
                    "es-CO", 
                    "es-EC", 
                    "es-ES", 
                    "es-MX", 
                    "es-PE", 
                    "es-PY", 
                    "es-US", 
                    "es-UY", 
                    "es-VE", 
                    "fi", 
                    "fi-FI", 
                    "fr", 
                    "fr-BE", 
                    "fr-CA", 
                    "fr-FR", 
                    "hi", 
                    "hi-IN", 
                    "id", 
                    "id-ID", 
                    "it", 
                    "it-IT", 
                    "ja", 
                    "ja-JP", 
                    "ko", 
                    "ko-KR", 
                    "ms", 
                    "ms-MY", 
                    "nb", 
                    "nb-NO", 
                    "nl", 
                    "nl-BE", 
                    "nl-NL", 
                    "pl", 
                    "pl-PL", 
                    "pt", 
                    "pt-BR", 
                    "ro", 
                    "ro-RO", 
                    "ru", 
                    "ru-RU", 
                    "sv", 
                    "sv-SE", 
                    "th", 
                    "th-TH", 
                    "tr", 
                    "tr-TR", 
                    "vi", 
                    "vi-VN", 
                    "zh-Hans", 
                    "zh-Hans-CN", 
                    "zh-Hant", 
                    "zh-Hant-HK", 
                    "zh-Hant-TW"
                ], 
                "requires": [
                    "yui-base"
                ], 
                "supersedes": [
                    "datatype-date-format"
                ]
            }, 
            "datatype-number": {
                "requires": [
                    "yui-base"
                ]
            }, 
            "datatype-xml": {
                "requires": [
                    "yui-base"
                ]
            }
        }
    }, 
    "datatype-date-format": {
        "path": "datatype/datatype-date-format-min.js"
    }, 
    "dd": {
        "submodules": {
            "dd-constrain": {
                "requires": [
                    "dd-drag"
                ]
            }, 
            "dd-ddm": {
                "requires": [
                    "dd-ddm-base", 
                    "event-resize"
                ]
            }, 
            "dd-ddm-base": {
                "requires": [
                    "node", 
                    "base", 
                    "yui-throttle"
                ]
            }, 
            "dd-ddm-drop": {
                "requires": [
                    "dd-ddm"
                ]
            }, 
            "dd-delegate": {
                "optional": [
                    "dd-drop-plugin"
                ], 
                "requires": [
                    "dd-drag", 
                    "event-mouseenter"
                ]
            }, 
            "dd-drag": {
                "requires": [
                    "dd-ddm-base"
                ]
            }, 
            "dd-drop": {
                "requires": [
                    "dd-ddm-drop"
                ]
            }, 
            "dd-drop-plugin": {
                "requires": [
                    "dd-drop"
                ]
            }, 
            "dd-plugin": {
                "optional": [
                    "dd-constrain", 
                    "dd-proxy"
                ], 
                "requires": [
                    "dd-drag"
                ]
            }, 
            "dd-proxy": {
                "requires": [
                    "dd-drag"
                ]
            }, 
            "dd-scroll": {
                "requires": [
                    "dd-drag"
                ]
            }
        }
    }, 
    "dom": {
        "plugins": {
            "selector-css3": {
                "requires": [
                    "selector-css2"
                ]
            }
        }, 
        "requires": [
            "oop"
        ], 
        "submodules": {
            "dom-base": {
                "requires": [
                    "oop"
                ]
            }, 
            "dom-screen": {
                "requires": [
                    "dom-base", 
                    "dom-style"
                ]
            }, 
            "dom-style": {
                "requires": [
                    "dom-base"
                ]
            }, 
            "selector": {
                "requires": [
                    "dom-base"
                ]
            }, 
            "selector-css2": {
                "requires": [
                    "selector-native"
                ]
            }, 
            "selector-native": {
                "requires": [
                    "dom-base"
                ]
            }
        }
    }, 
    "dump": {
        "requires": [
            "yui-base"
        ]
    }, 
    "event": {
        "expound": "node-base", 
        "plugins": {
            "event-synthetic": {
                "requires": [
                    "node-base"
                ]
            }
        }, 
        "submodules": {
            "event-base": {
                "expound": "node-base", 
                "requires": [
                    "event-custom-base"
                ]
            }, 
            "event-delegate": {
                "requires": [
                    "node-base"
                ]
            }, 
            "event-focus": {
                "requires": [
                    "node-base"
                ]
            }, 
            "event-key": {
                "requires": [
                    "node-base"
                ]
            }, 
            "event-mouseenter": {
                "requires": [
                    "node-base"
                ]
            }, 
            "event-mousewheel": {
                "requires": [
                    "node-base"
                ]
            }, 
            "event-resize": {
                "requires": [
                    "node-base"
                ]
            }
        }
    }, 
    "event-custom": {
        "submodules": {
            "event-custom-base": {
                "requires": [
                    "oop", 
                    "yui-later"
                ]
            }, 
            "event-custom-complex": {
                "requires": [
                    "event-custom-base"
                ]
            }
        }
    }, 
    "event-simulate": {
        "requires": [
            "event-base"
        ]
    }, 
    "history": {
        "requires": [
            "node"
        ]
    }, 
    "imageloader": {
        "requires": [
            "base-base", 
            "node-style", 
            "node-screen"
        ]
    }, 
    "intl": {
        "requires": [
            "intl-base", 
            "event-custom"
        ]
    }, 
    "io": {
        "submodules": {
            "io-base": {
                "optional": [
                    "querystring-stringify-simple"
                ], 
                "requires": [
                    "event-custom-base"
                ]
            }, 
            "io-form": {
                "requires": [
                    "io-base", 
                    "node-base", 
                    "node-style"
                ]
            }, 
            "io-queue": {
                "requires": [
                    "io-base", 
                    "queue-promote"
                ]
            }, 
            "io-upload-iframe": {
                "requires": [
                    "io-base", 
                    "node-base"
                ]
            }, 
            "io-xdr": {
                "requires": [
                    "io-base", 
                    "datatype-xml"
                ]
            }
        }
    }, 
    "json": {
        "submodules": {
            "json-parse": {
                "requires": [
                    "yui-base"
                ]
            }, 
            "json-stringify": {
                "requires": [
                    "yui-base"
                ]
            }
        }
    }, 
    "loader": {
        "requires": [
            "get"
        ], 
        "submodules": {
            "loader-base": {}, 
            "loader-rollup": {
                "requires": [
                    "loader-base"
                ]
            }, 
            "loader-yui3": {
                "requires": [
                    "loader-base"
                ]
            }
        }
    }, 
    "node": {
        "plugins": {
            "align-plugin": {
                "requires": [
                    "node-screen", 
                    "node-pluginhost"
                ]
            }, 
            "node-event-simulate": {
                "requires": [
                    "node-base", 
                    "event-simulate"
                ]
            }, 
            "shim-plugin": {
                "requires": [
                    "node-style", 
                    "node-pluginhost"
                ]
            }
        }, 
        "requires": [
            "dom", 
            "event-base"
        ], 
        "submodules": {
            "node-base": {
                "requires": [
                    "dom-base", 
                    "selector-css2", 
                    "event-base"
                ]
            }, 
            "node-event-delegate": {
                "requires": [
                    "node-base", 
                    "event-delegate"
                ]
            }, 
            "node-pluginhost": {
                "requires": [
                    "node-base", 
                    "pluginhost"
                ]
            }, 
            "node-screen": {
                "requires": [
                    "dom-screen", 
                    "node-base"
                ]
            }, 
            "node-style": {
                "requires": [
                    "dom-style", 
                    "node-base"
                ]
            }
        }
    }, 
    "node-focusmanager": {
        "requires": [
            "attribute", 
            "node", 
            "plugin", 
            "node-event-simulate", 
            "event-key", 
            "event-focus"
        ]
    }, 
    "node-menunav": {
        "requires": [
            "node", 
            "classnamemanager", 
            "plugin", 
            "node-focusmanager"
        ], 
        "skinnable": true
    }, 
    "oop": {
        "requires": [
            "yui-base"
        ]
    }, 
    "overlay": {
        "requires": [
            "widget", 
            "widget-stdmod", 
            "widget-position", 
            "widget-position-align", 
            "widget-stack", 
            "widget-position-constrain"
        ], 
        "skinnable": true
    }, 
    "plugin": {
        "requires": [
            "base-base"
        ]
    }, 
    "pluginhost": {
        "requires": [
            "yui-base"
        ]
    }, 
    "profiler": {
        "requires": [
            "yui-base"
        ]
    }, 
    "querystring": {
        "submodules": {
            "querystring-parse": {
                "requires": [
                    "yui-base", 
                    "array-extras"
                ]
            }, 
            "querystring-stringify": {
                "requires": [
                    "yui-base"
                ]
            }
        }
    }, 
    "querystring-parse-simple": {
        "path": "querystring/querystring-parse-simple-min.js", 
        "requires": [
            "yui-base"
        ]
    }, 
    "querystring-stringify-simple": {
        "path": "querystring/querystring-stringify-simple-min.js", 
        "requires": [
            "yui-base"
        ]
    }, 
    "queue-promote": {
        "requires": [
            "yui-base"
        ]
    }, 
    "queue-run": {
        "path": "async-queue/async-queue-min.js", 
        "requires": [
            "event-custom"
        ]
    }, 
    "slider": {
        "submodules": {
            "clickable-rail": {
                "requires": [
                    "slider-base"
                ]
            }, 
            "range-slider": {
                "requires": [
                    "slider-base", 
                    "slider-value-range", 
                    "clickable-rail"
                ]
            }, 
            "slider-base": {
                "requires": [
                    "widget", 
                    "dd-constrain", 
                    "substitute"
                ], 
                "skinnable": true
            }, 
            "slider-value-range": {
                "requires": [
                    "slider-base"
                ]
            }
        }
    }, 
    "sortable": {
        "requires": [
            "dd-delegate", 
            "dd-drop-plugin", 
            "dd-proxy"
        ]
    }, 
    "stylesheet": {
        "requires": [
            "yui-base"
        ]
    }, 
    "substitute": {
        "optional": [
            "dump"
        ]
    }, 
    "swf": {
        "requires": [
            "event-custom", 
            "node", 
            "swfdetect"
        ]
    }, 
    "swfdetect": {}, 
    "tabview": {
        "plugins": {
            "tabview-plugin": {
                "requires": [
                    "tabview-base"
                ], 
                "skinnable": true
            }
        }, 
        "requires": [
            "widget", 
            "widget-parent", 
            "widget-child", 
            "tabview-base"
        ], 
        "skinnable": true, 
        "submodules": {
            "tabview-base": {
                "requires": [
                    "node-event-delegate", 
                    "node-focusmanager", 
                    "classnamemanager"
                ]
            }
        }
    }, 
    "test": {
        "requires": [
            "substitute", 
            "node", 
            "json", 
            "event-simulate"
        ], 
        "skinnable": true
    }, 
    "widget": {
        "plugins": {
            "widget-child": {}, 
            "widget-parent": {
                "requires": [
                    "arraylist"
                ]
            }, 
            "widget-position": {}, 
            "widget-position-align": {
                "requires": [
                    "widget-position"
                ]
            }, 
            "widget-position-constrain": {
                "requires": [
                    "widget-position"
                ]
            }, 
            "widget-stack": {
                "skinnable": true
            }, 
            "widget-stdmod": {}
        }, 
        "skinnable": true, 
        "submodules": {
            "widget-base": {
                "requires": [
                    "attribute", 
                    "event-focus", 
                    "base", 
                    "node", 
                    "classnamemanager"
                ]
            }, 
            "widget-htmlparser": {
                "requires": [
                    "widget-base"
                ]
            }
        }
    }, 
    "widget-anim": {
        "requires": [
            "plugin", 
            "anim-base"
        ]
    }, 
    "widget-locale": {
        "path": "widget/widget-locale-min.js", 
        "requires": [
            "widget-base"
        ]
    }, 
    "yui": {
        "submodules": {
            "get": {}, 
            "intl-base": {}, 
            "yui-base": {}, 
            "yui-later": {}, 
            "yui-log": {}, 
            "yui-throttle": {}
        }
    }
};


}, '@VERSION@' ,{requires:['loader-base']});
