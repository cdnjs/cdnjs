Ext.define('KitchenSink.data.FileTree', {
    requires: [
        'KitchenSink.data.Init',
        'Ext.ux.ajax.XmlSimlet'
    ],

    /*
    This script produced the data below:

         var file = new java.io.File('src');
         console.log('Listing ' + file.getAbsolutePath());

         function listDir(dir) {
            var files  = dir.listFiles(),
                ret    = [],
                i      = 0,
                length = files.length,
                months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                file, data, modified, hour, modStr, size;

            for (; i < length; ++i) {
                file     = files[i];
                data     = { text : file.getName() + '' };
                modified = new Date(file.lastModified());
                hour     = modified.getHours();
                modStr   = months[modified.getMonth()] + ' ' + modified.getDate() + ', ' + modified.getFullYear() + ', ' + (hour < 12 ? hour : (hour - 12)) + ':' + modified.getMinutes() + ' ' + (hour < 12 ? 'am' : 'pm');

                if (file.isDirectory()) {
                    data.qtip     = 'Type: Folder<br />Last Modified: ' + modStr;
                    data.children = listDir(file);
                } else {
                    size = (file.length() / 1024).toFixed(2);

                    data.qtip = 'Type: JavaScript File<br />Last Modified: ' + modStr + '<br />Size: ' + size + ' KB';
                }

                ret.push(data);
            }

            return ret;
         }

         var obj = listDir(file);
         console.log(JSON.stringify(obj));

    Steps:
        1) Save to ./ext/dump.js
        2) sencha js dump.js > tree.json
        3) Copy/pretty print/paste
    */
    tree: [{
        text: 'src',
        children: [
            {
                "text": "AbstractPlugin.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.37 KB"
            },
            {
                "text": "Action.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.09 KB"
            },
            {
                "text": "app",
                "qtip": "Type: Folder<br />Last Modified: Mar 23, 2014, 10:28 am",
                "children": [
                    {
                        "text": "Application.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 17.45 KB"
                    },
                    {
                        "text": "BaseController.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 15.20 KB"
                    },
                    {
                        "text": "bindinspector",
                        "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 11:46 am",
                        "children": [
                            {
                                "text": "ComponentDetail.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 11:46 am<br />Size: 5.48 KB"
                            },
                            {
                                "text": "ComponentList.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 2.25 KB"
                            },
                            {
                                "text": "Container.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 1.81 KB"
                            },
                            {
                                "text": "Environment.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 11.65 KB"
                            },
                            {
                                "text": "Inspector.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 2:36 pm<br />Size: 0.83 KB"
                            },
                            {
                                "text": "noconflict",
                                "qtip": "Type: Folder<br />Last Modified: Mar 23, 2014, 10:28 am",
                                "children": [
                                    {
                                        "text": "BaseModel.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 0.19 KB"
                                    }
                                ]
                            },
                            {
                                "text": "Util.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 1.02 KB"
                            },
                            {
                                "text": "ViewModelDetail.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 5.68 KB"
                            }
                        ]
                    },
                    {
                        "text": "Controller.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 35.51 KB"
                    },
                    {
                        "text": "domain",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Component.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.48 KB"
                            },
                            {
                                "text": "Controller.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.10 KB"
                            },
                            {
                                "text": "Direct.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.58 KB"
                            },
                            {
                                "text": "Global.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.01 KB"
                            },
                            {
                                "text": "Store.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.58 KB"
                            },
                            {
                                "text": "View.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.62 KB"
                            }
                        ]
                    },
                    {
                        "text": "EventBus.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.97 KB"
                    },
                    {
                        "text": "EventDomain.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.63 KB"
                    },
                    {
                        "text": "route",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Queue.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.18 KB"
                            },
                            {
                                "text": "Route.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.80 KB"
                            },
                            {
                                "text": "Router.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.72 KB"
                            }
                        ]
                    },
                    {
                        "text": "Util.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.84 KB"
                    },
                    {
                        "text": "ViewController.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 2:55 pm<br />Size: 8.11 KB"
                    }
                ]
            },
            {
                "text": "button",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "Button.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 50.75 KB"
                    },
                    {
                        "text": "Cycle.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.52 KB"
                    },
                    {
                        "text": "Manager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.08 KB"
                    },
                    {
                        "text": "Split.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.13 KB"
                    }
                ]
            },
            {
                "text": "Component.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 11:38 pm<br />Size: 233.92 KB"
            },
            {
                "text": "ComponentLoader.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.68 KB"
            },
            {
                "text": "container",
                "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 8:0 pm",
                "children": [
                    {
                        "text": "ButtonGroup.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.52 KB"
                    },
                    {
                        "text": "Container.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 8:0 pm<br />Size: 67.41 KB"
                    },
                    {
                        "text": "DockingContainer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 10.32 KB"
                    },
                    {
                        "text": "Monitor.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.17 KB"
                    },
                    {
                        "text": "plugin",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Viewport.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.67 KB"
                            }
                        ]
                    },
                    {
                        "text": "Viewport.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.94 KB"
                    }
                ]
            },
            {
                "text": "dashboard",
                "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 2:34 pm",
                "children": [
                    {
                        "text": "Column.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.80 KB"
                    },
                    {
                        "text": "Dashboard.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 8.02 KB"
                    },
                    {
                        "text": "DropZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.80 KB"
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.37 KB"
                    },
                    {
                        "text": "Part.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.52 KB"
                    }
                ]
            },
            {
                "text": "dd",
                "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 8:20 am",
                "children": [
                    {
                        "text": "DD.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 10.61 KB"
                    },
                    {
                        "text": "DDProxy.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.84 KB"
                    },
                    {
                        "text": "DDTarget.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.76 KB"
                    },
                    {
                        "text": "DragDrop.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 34.55 KB"
                    },
                    {
                        "text": "DragDropManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 41.85 KB"
                    },
                    {
                        "text": "DragSource.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.99 KB"
                    },
                    {
                        "text": "DragTracker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 19.16 KB"
                    },
                    {
                        "text": "DragZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.68 KB"
                    },
                    {
                        "text": "DropTarget.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.02 KB"
                    },
                    {
                        "text": "DropZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.47 KB"
                    },
                    {
                        "text": "Registry.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.84 KB"
                    },
                    {
                        "text": "ScrollManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.71 KB"
                    },
                    {
                        "text": "StatusProxy.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.37 KB"
                    }
                ]
            },
            {
                "text": "dom",
                "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 8:20 am",
                "children": [
                    {
                        "text": "Layer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 13.86 KB"
                    }
                ]
            },
            {
                "text": "Editor.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.35 KB"
            },
            {
                "text": "ElementLoader.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.30 KB"
            },
            {
                "text": "enums.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.36 KB"
            },
            {
                "text": "flash",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "Component.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.54 KB"
                    }
                ]
            },
            {
                "text": "FocusManager.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 21.58 KB"
            },
            {
                "text": "form",
                "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 8:20 am",
                "children": [
                    {
                        "text": "action",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Action.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 10.74 KB"
                            },
                            {
                                "text": "DirectLoad.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.54 KB"
                            },
                            {
                                "text": "DirectSubmit.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.29 KB"
                            },
                            {
                                "text": "Load.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.62 KB"
                            },
                            {
                                "text": "StandardSubmit.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.25 KB"
                            },
                            {
                                "text": "Submit.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.14 KB"
                            }
                        ]
                    },
                    {
                        "text": "Basic.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 39.97 KB"
                    },
                    {
                        "text": "CheckboxGroup.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.70 KB"
                    },
                    {
                        "text": "CheckboxManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.39 KB"
                    },
                    {
                        "text": "field",
                        "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 2:42 pm",
                        "children": [
                            {
                                "text": "Base.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 9:17 am<br />Size: 33.19 KB"
                            },
                            {
                                "text": "Checkbox.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 18.77 KB"
                            },
                            {
                                "text": "ComboBox.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 4:10 pm<br />Size: 62.29 KB"
                            },
                            {
                                "text": "Date.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 18.46 KB"
                            },
                            {
                                "text": "Display.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.11 KB"
                            },
                            {
                                "text": "Field.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 1:2 pm<br />Size: 19.77 KB"
                            },
                            {
                                "text": "File.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 9:3 am<br />Size: 9.61 KB"
                            },
                            {
                                "text": "FileButton.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 2:42 pm<br />Size: 3.20 KB"
                            },
                            {
                                "text": "Hidden.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.38 KB"
                            },
                            {
                                "text": "HtmlEditor.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 54.50 KB"
                            },
                            {
                                "text": "Number.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.08 KB"
                            },
                            {
                                "text": "Picker.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 10.91 KB"
                            },
                            {
                                "text": "Radio.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 0:30 am<br />Size: 8.99 KB"
                            },
                            {
                                "text": "Spinner.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 9:17 am<br />Size: 8.18 KB"
                            },
                            {
                                "text": "Tag.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 4:29 pm<br />Size: 48.94 KB"
                            },
                            {
                                "text": "Text.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 9:3 am<br />Size: 41.99 KB"
                            },
                            {
                                "text": "TextArea.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.56 KB"
                            },
                            {
                                "text": "Time.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.60 KB"
                            },
                            {
                                "text": "Trigger.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.49 KB"
                            },
                            {
                                "text": "VTypes.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.77 KB"
                            }
                        ]
                    },
                    {
                        "text": "FieldAncestor.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.84 KB"
                    },
                    {
                        "text": "FieldContainer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 10.89 KB"
                    },
                    {
                        "text": "FieldSet.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 18.89 KB"
                    },
                    {
                        "text": "Label.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.02 KB"
                    },
                    {
                        "text": "Labelable.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 33.90 KB"
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 13.97 KB"
                    },
                    {
                        "text": "RadioGroup.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.74 KB"
                    },
                    {
                        "text": "RadioManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.77 KB"
                    },
                    {
                        "text": "trigger",
                        "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 9:3 am",
                        "children": [
                            {
                                "text": "Component.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.04 KB"
                            },
                            {
                                "text": "Spinner.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.29 KB"
                            },
                            {
                                "text": "Trigger.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 9:3 am<br />Size: 9.71 KB"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "fx",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "Anim.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.00 KB"
                    },
                    {
                        "text": "Animator.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.94 KB"
                    },
                    {
                        "text": "CubicBezier.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.11 KB"
                    },
                    {
                        "text": "DrawPath.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 14.21 KB"
                    },
                    {
                        "text": "Easing.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.02 KB"
                    },
                    {
                        "text": "Manager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.80 KB"
                    },
                    {
                        "text": "PropertyHandler.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.75 KB"
                    },
                    {
                        "text": "Queue.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.20 KB"
                    },
                    {
                        "text": "target",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Component.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.51 KB"
                            },
                            {
                                "text": "CompositeElement.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.28 KB"
                            },
                            {
                                "text": "CompositeElementCSS.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.74 KB"
                            },
                            {
                                "text": "CompositeSprite.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.90 KB"
                            },
                            {
                                "text": "Element.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.35 KB"
                            },
                            {
                                "text": "ElementCSS.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.92 KB"
                            },
                            {
                                "text": "Sprite.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.07 KB"
                            },
                            {
                                "text": "Target.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.12 KB"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "grid",
                "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 2:34 pm",
                "children": [
                    {
                        "text": "CellContext.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.34 KB"
                    },
                    {
                        "text": "CellEditor.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 8.69 KB"
                    },
                    {
                        "text": "column",
                        "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 0:19 am",
                        "children": [
                            {
                                "text": "Action.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 18.78 KB"
                            },
                            {
                                "text": "Boolean.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.61 KB"
                            },
                            {
                                "text": "Check.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.31 KB"
                            },
                            {
                                "text": "Column.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 0:19 am<br />Size: 47.06 KB"
                            },
                            {
                                "text": "Date.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.64 KB"
                            },
                            {
                                "text": "Number.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.18 KB"
                            },
                            {
                                "text": "RowNumberer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.41 KB"
                            },
                            {
                                "text": "Template.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.68 KB"
                            },
                            {
                                "text": "Widget.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 9:17 am<br />Size: 10.57 KB"
                            }
                        ]
                    },
                    {
                        "text": "ColumnComponentLayout.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.38 KB"
                    },
                    {
                        "text": "ColumnLayout.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.13 KB"
                    },
                    {
                        "text": "ColumnManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.75 KB"
                    },
                    {
                        "text": "feature",
                        "qtip": "Type: Folder<br />Last Modified: Mar 21, 2014, 3:5 pm",
                        "children": [
                            {
                                "text": "AbstractSummary.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.93 KB"
                            },
                            {
                                "text": "Feature.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.81 KB"
                            },
                            {
                                "text": "Grouping.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 43.73 KB"
                            },
                            {
                                "text": "GroupingSummary.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.31 KB"
                            },
                            {
                                "text": "GroupStore.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.02 KB"
                            },
                            {
                                "text": "RowBody.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 3:5 pm<br />Size: 8.05 KB"
                            },
                            {
                                "text": "Summary.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.92 KB"
                            }
                        ]
                    },
                    {
                        "text": "header",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Container.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 46.04 KB"
                            },
                            {
                                "text": "DragZone.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.06 KB"
                            },
                            {
                                "text": "DropZone.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.93 KB"
                            }
                        ]
                    },
                    {
                        "text": "locking",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "HeaderContainer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.91 KB"
                            },
                            {
                                "text": "Lockable.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 44.77 KB"
                            },
                            {
                                "text": "View.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.71 KB"
                            }
                        ]
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.30 KB"
                    },
                    {
                        "text": "plugin",
                        "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 8:47 am",
                        "children": [
                            {
                                "text": "BufferedRenderer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 8:47 am<br />Size: 43.09 KB"
                            },
                            {
                                "text": "CellEditing.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 24.81 KB"
                            },
                            {
                                "text": "DragDrop.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.18 KB"
                            },
                            {
                                "text": "Editing.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 23.11 KB"
                            },
                            {
                                "text": "HeaderReorderer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.14 KB"
                            },
                            {
                                "text": "HeaderResizer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.25 KB"
                            },
                            {
                                "text": "RowEditing.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.20 KB"
                            },
                            {
                                "text": "RowExpander.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 8:54 pm<br />Size: 15.04 KB"
                            }
                        ]
                    },
                    {
                        "text": "property",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Grid.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 20.69 KB"
                            },
                            {
                                "text": "HeaderContainer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.44 KB"
                            },
                            {
                                "text": "Property.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.37 KB"
                            },
                            {
                                "text": "Store.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.38 KB"
                            }
                        ]
                    },
                    {
                        "text": "RowEditor.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 33.46 KB"
                    },
                    {
                        "text": "RowEditorButtons.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.80 KB"
                    },
                    {
                        "text": "Scroller.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.09 KB"
                    },
                    {
                        "text": "View.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.93 KB"
                    },
                    {
                        "text": "ViewDropZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.70 KB"
                    }
                ]
            },
            {
                "text": "Img.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.12 KB"
            },
            {
                "text": "layout",
                "qtip": "Type: Folder<br />Last Modified: Mar 23, 2014, 10:28 am",
                "children": [
                    {
                        "text": "ClassList.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.42 KB"
                    },
                    {
                        "text": "component",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Auto.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.52 KB"
                            },
                            {
                                "text": "Body.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.20 KB"
                            },
                            {
                                "text": "BoundList.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.04 KB"
                            },
                            {
                                "text": "Button.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.43 KB"
                            },
                            {
                                "text": "Component.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 17.67 KB"
                            },
                            {
                                "text": "Dock.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 61.64 KB"
                            },
                            {
                                "text": "field",
                                "qtip": "Type: Folder<br />Last Modified: Mar 23, 2014, 10:28 am",
                                "children": [
                                    {
                                        "text": "FieldContainer.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 2.23 KB"
                                    },
                                    {
                                        "text": "HtmlEditor.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.15 KB"
                                    }
                                ]
                            },
                            {
                                "text": "FieldSet.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.94 KB"
                            },
                            {
                                "text": "ProgressBar.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.33 KB"
                            }
                        ]
                    },
                    {
                        "text": "container",
                        "qtip": "Type: Folder<br />Last Modified: Mar 20, 2014, 1:26 pm",
                        "children": [
                            {
                                "text": "Absolute.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.94 KB"
                            },
                            {
                                "text": "Accordion.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.24 KB"
                            },
                            {
                                "text": "Anchor.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 12.62 KB"
                            },
                            {
                                "text": "Auto.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 29.70 KB"
                            },
                            {
                                "text": "border",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Region.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.03 KB"
                                    }
                                ]
                            },
                            {
                                "text": "Border.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 34.96 KB"
                            },
                            {
                                "text": "Box.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 63.21 KB"
                            },
                            {
                                "text": "boxOverflow",
                                "qtip": "Type: Folder<br />Last Modified: Mar 20, 2014, 1:26 pm",
                                "children": [
                                    {
                                        "text": "Menu.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 14.42 KB"
                                    },
                                    {
                                        "text": "None.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.97 KB"
                                    },
                                    {
                                        "text": "Scroller.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.30 KB"
                                    }
                                ]
                            },
                            {
                                "text": "Card.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.77 KB"
                            },
                            {
                                "text": "Center.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.03 KB"
                            },
                            {
                                "text": "CheckboxGroup.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 14.64 KB"
                            },
                            {
                                "text": "Column.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 7.13 KB"
                            },
                            {
                                "text": "ColumnSplitter.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.58 KB"
                            },
                            {
                                "text": "ColumnSplitterTracker.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.86 KB"
                            },
                            {
                                "text": "Container.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 16.97 KB"
                            },
                            {
                                "text": "Editor.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.95 KB"
                            },
                            {
                                "text": "Fit.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.02 KB"
                            },
                            {
                                "text": "Form.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.92 KB"
                            },
                            {
                                "text": "HBox.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.12 KB"
                            },
                            {
                                "text": "SplitColumn.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.84 KB"
                            },
                            {
                                "text": "Table.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.15 KB"
                            },
                            {
                                "text": "VBox.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.19 KB"
                            }
                        ]
                    },
                    {
                        "text": "Context.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 8:7 am<br />Size: 66.67 KB"
                    },
                    {
                        "text": "ContextItem.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 72.77 KB"
                    },
                    {
                        "text": "Layout.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 19.52 KB"
                    },
                    {
                        "text": "SizeModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.18 KB"
                    },
                    {
                        "text": "SizePolicy.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.83 KB"
                    }
                ]
            },
            {
                "text": "LoadMask.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.88 KB"
            },
            {
                "text": "menu",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "CheckItem.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.30 KB"
                    },
                    {
                        "text": "ColorPicker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.58 KB"
                    },
                    {
                        "text": "DatePicker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.67 KB"
                    },
                    {
                        "text": "Item.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 20.65 KB"
                    },
                    {
                        "text": "KeyNav.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.02 KB"
                    },
                    {
                        "text": "Manager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.17 KB"
                    },
                    {
                        "text": "Menu.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 17.26 KB"
                    },
                    {
                        "text": "Separator.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.29 KB"
                    }
                ]
            },
            {
                "text": "panel",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 8:47 am",
                "children": [
                    {
                        "text": "DD.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.70 KB"
                    },
                    {
                        "text": "Header.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 21.04 KB"
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 107.62 KB"
                    },
                    {
                        "text": "Pinnable.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.30 KB"
                    },
                    {
                        "text": "Proxy.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.65 KB"
                    },
                    {
                        "text": "Table.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 8:47 am<br />Size: 47.40 KB"
                    },
                    {
                        "text": "Tool.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.41 KB"
                    }
                ]
            },
            {
                "text": "picker",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "Color.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.15 KB"
                    },
                    {
                        "text": "Date.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 37.76 KB"
                    },
                    {
                        "text": "Month.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.58 KB"
                    },
                    {
                        "text": "Time.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.04 KB"
                    }
                ]
            },
            {
                "text": "PluginManager.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.67 KB"
            },
            {
                "text": "ProgressBar.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:27 pm<br />Size: 11.46 KB"
            },
            {
                "text": "ProgressBarWidget.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:36 pm<br />Size: 3.32 KB"
            },
            {
                "text": "resizer",
                "qtip": "Type: Folder<br />Last Modified: Mar 23, 2014, 10:28 am",
                "children": [
                    {
                        "text": "BorderSplitter.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.50 KB"
                    },
                    {
                        "text": "BorderSplitterTracker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.87 KB"
                    },
                    {
                        "text": "Handle.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.65 KB"
                    },
                    {
                        "text": "Resizer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 15.49 KB"
                    },
                    {
                        "text": "ResizeTracker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.21 KB"
                    },
                    {
                        "text": "Splitter.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.04 KB"
                    },
                    {
                        "text": "SplitterTracker.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.87 KB"
                    }
                ]
            },
            {
                "text": "rtl",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "button",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Button.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.63 KB"
                            }
                        ]
                    },
                    {
                        "text": "Component.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.46 KB"
                    },
                    {
                        "text": "dd",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "DD.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.76 KB"
                            }
                        ]
                    },
                    {
                        "text": "dom",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Element.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.04 KB"
                            },
                            {
                                "text": "Layer.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.25 KB"
                            }
                        ]
                    },
                    {
                        "text": "event",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Event.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.35 KB"
                            }
                        ]
                    },
                    {
                        "text": "form",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "field",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Checkbox.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.27 KB"
                                    },
                                    {
                                        "text": "File.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.20 KB"
                                    },
                                    {
                                        "text": "FileButton.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.56 KB"
                                    },
                                    {
                                        "text": "Spinner.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.27 KB"
                                    }
                                ]
                            },
                            {
                                "text": "Labelable.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.20 KB"
                            }
                        ]
                    },
                    {
                        "text": "grid",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "CellEditor.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.38 KB"
                            },
                            {
                                "text": "column",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Column.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.52 KB"
                                    }
                                ]
                            },
                            {
                                "text": "ColumnLayout.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.80 KB"
                            },
                            {
                                "text": "feature",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Summary.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.26 KB"
                                    }
                                ]
                            },
                            {
                                "text": "plugin",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "HeaderResizer.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.06 KB"
                                    },
                                    {
                                        "text": "RowEditing.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.24 KB"
                                    }
                                ]
                            },
                            {
                                "text": "RowEditor.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.61 KB"
                            }
                        ]
                    },
                    {
                        "text": "layout",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "component",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Dock.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.54 KB"
                                    }
                                ]
                            },
                            {
                                "text": "container",
                                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                "children": [
                                    {
                                        "text": "Absolute.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.42 KB"
                                    },
                                    {
                                        "text": "Border.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.39 KB"
                                    },
                                    {
                                        "text": "Box.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.62 KB"
                                    },
                                    {
                                        "text": "boxOverflow",
                                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                                        "children": [
                                            {
                                                "text": "Menu.js",
                                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.48 KB"
                                            },
                                            {
                                                "text": "Scroller.js",
                                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.38 KB"
                                            }
                                        ]
                                    },
                                    {
                                        "text": "Column.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.50 KB"
                                    },
                                    {
                                        "text": "HBox.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.37 KB"
                                    },
                                    {
                                        "text": "VBox.js",
                                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.19 KB"
                                    }
                                ]
                            },
                            {
                                "text": "ContextItem.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.58 KB"
                            }
                        ]
                    },
                    {
                        "text": "panel",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Header.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.44 KB"
                            },
                            {
                                "text": "Panel.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.42 KB"
                            }
                        ]
                    },
                    {
                        "text": "resizer",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "BorderSplitterTracker.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.50 KB"
                            },
                            {
                                "text": "ResizeTracker.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.46 KB"
                            },
                            {
                                "text": "SplitterTracker.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.46 KB"
                            }
                        ]
                    },
                    {
                        "text": "scroll",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Manager.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.53 KB"
                            },
                            {
                                "text": "Scroller.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.62 KB"
                            }
                        ]
                    },
                    {
                        "text": "selection",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "CellModel.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.40 KB"
                            },
                            {
                                "text": "TreeModel.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.45 KB"
                            }
                        ]
                    },
                    {
                        "text": "slider",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Multi.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.27 KB"
                            }
                        ]
                    },
                    {
                        "text": "tab",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Bar.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.19 KB"
                            }
                        ]
                    },
                    {
                        "text": "tip",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "QuickTipManager.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.81 KB"
                            }
                        ]
                    },
                    {
                        "text": "tree",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "Column.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.23 KB"
                            }
                        ]
                    },
                    {
                        "text": "util",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 11:28 pm",
                        "children": [
                            {
                                "text": "Floating.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.37 KB"
                            },
                            {
                                "text": "Renderable.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 11:28 pm<br />Size: 3.65 KB"
                            }
                        ]
                    },
                    {
                        "text": "view",
                        "qtip": "Type: Folder<br />Last Modified: Mar 20, 2014, 1:26 pm",
                        "children": [
                            {
                                "text": "Table.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 20, 2014, 1:26 pm<br />Size: 1.37 KB"
                            }
                        ]
                    }
                ]
            },
            {
                "text": "scroll",
                "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 2:34 pm",
                "children": [
                    {
                        "text": "Indicator.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 5.30 KB"
                    },
                    {
                        "text": "Manager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 8.63 KB"
                    }
                ]
            },
            {
                "text": "selection",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 11:46 am",
                "children": [
                    {
                        "text": "CellModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.68 KB"
                    },
                    {
                        "text": "CheckboxModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.93 KB"
                    },
                    {
                        "text": "DataViewModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.26 KB"
                    },
                    {
                        "text": "Model.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 11:46 am<br />Size: 36.38 KB"
                    },
                    {
                        "text": "RowModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 11:46 am<br />Size: 18.38 KB"
                    },
                    {
                        "text": "TreeModel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.53 KB"
                    }
                ]
            },
            {
                "text": "Shadow.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.47 KB"
            },
            {
                "text": "ShadowPool.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.16 KB"
            },
            {
                "text": "slider",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 4:36 pm",
                "children": [
                    {
                        "text": "Multi.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:27 pm<br />Size: 27.27 KB"
                    },
                    {
                        "text": "Single.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.08 KB"
                    },
                    {
                        "text": "Thumb.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.70 KB"
                    },
                    {
                        "text": "Tip.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.02 KB"
                    },
                    {
                        "text": "Widget.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:36 pm<br />Size: 16.75 KB"
                    }
                ]
            },
            {
                "text": "sparkline",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 4:26 pm",
                "children": [
                    {
                        "text": "Bar.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:23 pm<br />Size: 10.23 KB"
                    },
                    {
                        "text": "BarBase.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:24 pm<br />Size: 1.31 KB"
                    },
                    {
                        "text": "Base.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:26 pm<br />Size: 10.48 KB"
                    },
                    {
                        "text": "Box.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:24 pm<br />Size: 8.93 KB"
                    },
                    {
                        "text": "Bullet.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:20 pm<br />Size: 5.13 KB"
                    },
                    {
                        "text": "CanvasBase.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:20 pm<br />Size: 2.64 KB"
                    },
                    {
                        "text": "CanvasCanvas.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:21 pm<br />Size: 6.04 KB"
                    },
                    {
                        "text": "Discrete.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:21 pm<br />Size: 2.79 KB"
                    },
                    {
                        "text": "Line.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:22 pm<br />Size: 13.19 KB"
                    },
                    {
                        "text": "Pie.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:21 pm<br />Size: 3.92 KB"
                    },
                    {
                        "text": "RangeMap.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:22 pm<br />Size: 1.07 KB"
                    },
                    {
                        "text": "Shape.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:22 pm<br />Size: 0.29 KB"
                    },
                    {
                        "text": "TriState.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:23 pm<br />Size: 3.75 KB"
                    },
                    {
                        "text": "VmlCanvas.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 4:23 pm<br />Size: 7.41 KB"
                    }
                ]
            },
            {
                "text": "state",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 11:10 pm",
                "children": [
                    {
                        "text": "CookieProvider.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.45 KB"
                    },
                    {
                        "text": "LocalStorageProvider.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.81 KB"
                    },
                    {
                        "text": "Manager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.99 KB"
                    },
                    {
                        "text": "Provider.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.58 KB"
                    },
                    {
                        "text": "Stateful.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 11:10 pm<br />Size: 13.42 KB"
                    }
                ]
            },
            {
                "text": "tab",
                "qtip": "Type: Folder<br />Last Modified: Mar 24, 2014, 8:0 pm",
                "children": [
                    {
                        "text": "Bar.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.24 KB"
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 8:0 pm<br />Size: 22.24 KB"
                    },
                    {
                        "text": "Tab.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 9.65 KB"
                    }
                ]
            },
            {
                "text": "tip",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "QuickTip.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 13.23 KB"
                    },
                    {
                        "text": "QuickTipManager.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.21 KB"
                    },
                    {
                        "text": "Tip.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.31 KB"
                    },
                    {
                        "text": "ToolTip.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 24.86 KB"
                    }
                ]
            },
            {
                "text": "toolbar",
                "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                "children": [
                    {
                        "text": "Fill.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.79 KB"
                    },
                    {
                        "text": "Item.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.46 KB"
                    },
                    {
                        "text": "Paging.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 19.59 KB"
                    },
                    {
                        "text": "Separator.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.69 KB"
                    },
                    {
                        "text": "Spacer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 0.95 KB"
                    },
                    {
                        "text": "TextItem.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.37 KB"
                    },
                    {
                        "text": "Toolbar.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 16.04 KB"
                    }
                ]
            },
            {
                "text": "tree",
                "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 2:42 pm",
                "children": [
                    {
                        "text": "Column.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.17 KB"
                    },
                    {
                        "text": "Panel.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 26.84 KB"
                    },
                    {
                        "text": "plugin",
                        "qtip": "Type: Folder<br />Last Modified: Mar 19, 2014, 1:21 pm",
                        "children": [
                            {
                                "text": "TreeViewDragDrop.js",
                                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 12.76 KB"
                            }
                        ]
                    },
                    {
                        "text": "View.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 2:42 pm<br />Size: 27.11 KB"
                    },
                    {
                        "text": "ViewDragZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 2.09 KB"
                    },
                    {
                        "text": "ViewDropZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.74 KB"
                    }
                ]
            },
            {
                "text": "util",
                "qtip": "Type: Folder<br />Last Modified: Mar 26, 2014, 8:20 am",
                "children": [
                    {
                        "text": "Animate.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 11.96 KB"
                    },
                    {
                        "text": "Bindable.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 4:29 pm<br />Size: 4.08 KB"
                    },
                    {
                        "text": "ClickRepeater.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.04 KB"
                    },
                    {
                        "text": "ComponentDragger.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.20 KB"
                    },
                    {
                        "text": "Cookies.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.95 KB"
                    },
                    {
                        "text": "CSS.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 21, 2014, 9:17 am<br />Size: 9.72 KB"
                    },
                    {
                        "text": "ElementContainer.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 10.42 KB"
                    },
                    {
                        "text": "Floating.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 14.71 KB"
                    },
                    {
                        "text": "History.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.11 KB"
                    },
                    {
                        "text": "KeyMap.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 17.64 KB"
                    },
                    {
                        "text": "KeyNav.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.87 KB"
                    },
                    {
                        "text": "Memento.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 4.41 KB"
                    },
                    {
                        "text": "Positionable_ext.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 8:20 am<br />Size: 6.47 KB"
                    },
                    {
                        "text": "ProtoElement.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.23 KB"
                    },
                    {
                        "text": "Queue.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 1.49 KB"
                    },
                    {
                        "text": "Renderable.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 51.22 KB"
                    },
                    {
                        "text": "TextMetrics.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 5.59 KB"
                    }
                ]
            },
            {
                "text": "view",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 1:56 pm",
                "children": [
                    {
                        "text": "AbstractView.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 8:47 am<br />Size: 56.60 KB"
                    },
                    {
                        "text": "BoundList.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 7.16 KB"
                    },
                    {
                        "text": "BoundListKeyNav.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 3.12 KB"
                    },
                    {
                        "text": "DragZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 24, 2014, 2:34 pm<br />Size: 4.87 KB"
                    },
                    {
                        "text": "DropZone.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 8.24 KB"
                    },
                    {
                        "text": "MultiSelector.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 0:56 pm<br />Size: 4.26 KB"
                    },
                    {
                        "text": "MultiSelectorSearch.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 1:56 pm<br />Size: 7.83 KB"
                    },
                    {
                        "text": "NodeCache.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 15.56 KB"
                    },
                    {
                        "text": "Table.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 26, 2014, 2:42 pm<br />Size: 89.33 KB"
                    },
                    {
                        "text": "TableLayout.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 6.47 KB"
                    },
                    {
                        "text": "View.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 26.11 KB"
                    }
                ]
            },
            {
                "text": "widget",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 4:29 pm",
                "children": []
            },
            {
                "text": "window",
                "qtip": "Type: Folder<br />Last Modified: Mar 27, 2014, 8:47 am",
                "children": [
                    {
                        "text": "MessageBox.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 8:47 am<br />Size: 33.01 KB"
                    },
                    {
                        "text": "Toast.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 27, 2014, 8:47 am<br />Size: 15.71 KB"
                    },
                    {
                        "text": "Window.js",
                        "qtip": "Type: JavaScript File<br />Last Modified: Mar 23, 2014, 10:28 am<br />Size: 29.93 KB"
                    }
                ]
            },
            {
                "text": "ZIndexManager.js",
                "qtip": "Type: JavaScript File<br />Last Modified: Mar 19, 2014, 1:21 pm<br />Size: 19.65 KB"
            }
        ]
    }]
},
function () {
    var data = this.prototype.tree;

    Ext.ux.ajax.SimManager.register({
        '/tree/get-nodes.php': {
            type: 'json',
            tree: Ext.clone(data)
        },
        '/xml-tree/get-nodes.php': {
            type: 'xml',
            xmlTpl: '',
            tree: Ext.clone(data),
            rootProperty: 'nodes',
            recordProperty: 'node'
        }
    });
});
