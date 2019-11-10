/**
 * sp-pnp-js v0.0.10 - A reusable JavaScript library targeting SharePoint client-side development.
 * Copyright (c) 2016 Microsoft and other contributors
 * MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.$pnp = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectComposedLook = (function (_super) {
        __extends(ObjectComposedLook, _super);
        function ObjectComposedLook() {
            _super.call(this, "ComposedLook");
        }
        ObjectComposedLook.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var colorPaletteUrl = object.ColorPaletteUrl ? util_1.Util.replaceUrlTokens(object.ColorPaletteUrl) : "";
                var fontSchemeUrl = object.FontSchemeUrl ? util_1.Util.replaceUrlTokens(object.FontSchemeUrl) : "";
                var backgroundImageUrl = object.BackgroundImageUrl ? util_1.Util.replaceUrlTokens(object.BackgroundImageUrl) : null;
                web.applyTheme(util_1.Util.getRelativeUrl(colorPaletteUrl), util_1.Util.getRelativeUrl(fontSchemeUrl), backgroundImageUrl, true);
                web.update();
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectComposedLook;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectComposedLook = ObjectComposedLook;
});

},{"../../util":37,"./ObjectHandlerBase":5}],2:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectCustomActions = (function (_super) {
        __extends(ObjectCustomActions, _super);
        function ObjectCustomActions() {
            _super.call(this, "CustomActions");
        }
        ObjectCustomActions.prototype.ProvisionObjects = function (customactions) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var userCustomActions = clientContext.get_web().get_userCustomActions();
                clientContext.load(userCustomActions);
                clientContext.executeQueryAsync(function () {
                    customactions.forEach(function (obj) {
                        var objExists = userCustomActions.get_data().filter(function (userCustomAction) {
                            return userCustomAction.get_title() === obj.Title;
                        }).length > 0;
                        if (!objExists) {
                            var objCreationInformation = userCustomActions.add();
                            if (obj.Description) {
                                objCreationInformation.set_description(obj.Description);
                            }
                            if (obj.CommandUIExtension) {
                                objCreationInformation.set_commandUIExtension(obj.CommandUIExtension);
                            }
                            if (obj.Group) {
                                objCreationInformation.set_group(obj.Group);
                            }
                            if (obj.Title) {
                                objCreationInformation.set_title(obj.Title);
                            }
                            if (obj.Url) {
                                objCreationInformation.set_url(obj.Url);
                            }
                            if (obj.ScriptBlock) {
                                objCreationInformation.set_scriptBlock(obj.ScriptBlock);
                            }
                            if (obj.ScriptSrc) {
                                objCreationInformation.set_scriptSrc(obj.ScriptSrc);
                            }
                            if (obj.Location) {
                                objCreationInformation.set_location(obj.Location);
                            }
                            if (obj.ImageUrl) {
                                objCreationInformation.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Name) {
                                objCreationInformation.set_name(obj.Name);
                            }
                            if (obj.RegistrationId) {
                                objCreationInformation.set_registrationId(obj.RegistrationId);
                            }
                            if (obj.RegistrationType) {
                                objCreationInformation.set_registrationType(obj.RegistrationType);
                            }
                            if (obj.Rights) {
                                objCreationInformation.set_rights(obj.Rights);
                            }
                            if (obj.Sequence) {
                                objCreationInformation.set_sequence(obj.Sequence);
                            }
                            objCreationInformation.update();
                        }
                    });
                    clientContext.executeQueryAsync(function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectCustomActions;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectCustomActions = ObjectCustomActions;
});

},{"./ObjectHandlerBase":5}],3:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectFeatures = (function (_super) {
        __extends(ObjectFeatures, _super);
        function ObjectFeatures() {
            _super.call(this, "Features");
        }
        ObjectFeatures.prototype.ProvisionObjects = function (features) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var webFeatures = web.get_features();
                features.forEach(function (f) {
                    if (f.Deactivate === true) {
                        webFeatures.remove(new SP.Guid(f.ID), true);
                    }
                    else {
                        webFeatures.add(new SP.Guid(f.ID), true, SP.FeatureDefinitionScope.none);
                    }
                });
                web.update();
                clientContext.load(webFeatures);
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectFeatures;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectFeatures = ObjectFeatures;
});

},{"./ObjectHandlerBase":5}],4:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../../utils/util", "../../../sharepoint/util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var CoreUtil = require("../../../utils/util");
    var util_1 = require("../../../sharepoint/util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectFiles = (function (_super) {
        __extends(ObjectFiles, _super);
        function ObjectFiles() {
            _super.call(this, "Files");
        }
        ObjectFiles.prototype.ProvisionObjects = function (objects) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileInfos = [];
                var promises = [];
                objects.forEach(function (obj, index) {
                    promises.push(_this.httpClient.fetchRaw(util_1.Util.replaceUrlTokens(obj.Src)).then(function (response) {
                        return response.text();
                    }));
                });
                Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response, index) {
                        var obj = objects[index];
                        var filename = _this.GetFilenameFromFilePath(obj.Dest);
                        var webServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl;
                        var folder = web.getFolderByServerRelativeUrl(webServerRelativeUrl + "/" + _this.GetFolderFromFilePath(obj.Dest));
                        var fi = {
                            Contents: response,
                            Dest: obj.Dest,
                            Filename: filename,
                            Folder: folder,
                            Instance: null,
                            Overwrite: false,
                            Properties: [],
                            RemoveExistingWebParts: true,
                            ServerRelativeUrl: obj.Dest,
                            Src: obj.Src,
                            Views: [],
                            WebParts: [],
                        };
                        CoreUtil.Util.extend(fi, obj);
                        if (fi.Filename.indexOf("Form.aspx") !== -1) {
                            return;
                        }
                        var objCreationInformation = new SP.FileCreationInformation();
                        objCreationInformation.set_overwrite(fi.Overwrite);
                        objCreationInformation.set_url(fi.Filename);
                        objCreationInformation.set_content(new SP.Base64EncodedByteArray());
                        for (var i = 0; i < fi.Contents.length; i++) {
                            objCreationInformation.get_content().append(fi.Contents.charCodeAt(i));
                        }
                        clientContext.load(fi.Folder.get_files().add(objCreationInformation));
                        fileInfos.push(fi);
                    });
                });
                clientContext.executeQueryAsync(function () {
                    promises = [];
                    fileInfos.forEach(function (fi) {
                        if (fi.Properties && Object.keys(fi.Properties).length > 0) {
                            promises.push(_this.ApplyFileProperties(fi.Dest, fi.Properties));
                        }
                        if (fi.WebParts && fi.WebParts.length > 0) {
                            promises.push(_this.AddWebPartsToWebPartPage(fi.Dest, fi.Src, fi.WebParts, fi.RemoveExistingWebParts));
                        }
                    });
                    Promise.all(promises).then(function () {
                        _this.ModifyHiddenViews(objects).then(function (value) {
                            _super.prototype.scope_ended.call(_this);
                            resolve(value);
                        }, function (error) {
                            _super.prototype.scope_ended.call(_this);
                            reject(error);
                        });
                    });
                }, function (error) {
                    _super.prototype.scope_ended.call(_this);
                    reject(error);
                });
            });
        };
        ObjectFiles.prototype.RemoveWebPartsFromFileIfSpecified = function (clientContext, limitedWebPartManager, shouldRemoveExisting) {
            return new Promise(function (resolve, reject) {
                if (!shouldRemoveExisting) {
                    resolve();
                }
                var existingWebParts = limitedWebPartManager.get_webParts();
                clientContext.load(existingWebParts);
                clientContext.executeQueryAsync(function () {
                    existingWebParts.get_data().forEach(function (wp) {
                        wp.deleteWebPart();
                    });
                    clientContext.load(existingWebParts);
                    clientContext.executeQueryAsync(resolve, reject);
                }, reject);
            });
        };
        ObjectFiles.prototype.GetWebPartXml = function (webParts) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var promises = [];
                webParts.forEach(function (wp, index) {
                    if (wp.Contents.FileUrl) {
                        var fileUrl = util_1.Util.replaceUrlTokens(wp.Contents.FileUrl);
                        promises.push(_this.httpClient.fetchRaw(fileUrl).then(function (response) {
                            return response.text();
                        }));
                    }
                    else {
                        promises.push((function () {
                            return new Promise(function (res, rej) {
                                res();
                            });
                        })());
                    }
                });
                Promise.all(promises).then(function (responses) {
                    responses.forEach(function (response, index) {
                        var wp = webParts[index];
                        if (wp !== null && response && response.length > 0) {
                            wp.Contents.Xml = response;
                        }
                    });
                    resolve(webParts);
                });
            });
        };
        ObjectFiles.prototype.AddWebPartsToWebPartPage = function (dest, src, webParts, shouldRemoveExisting) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                clientContext.load(file);
                clientContext.executeQueryAsync(function () {
                    var limitedWebPartManager = file.getLimitedWebPartManager(SP.WebParts.PersonalizationScope.shared);
                    _this.RemoveWebPartsFromFileIfSpecified(clientContext, limitedWebPartManager, shouldRemoveExisting).then(function () {
                        _this.GetWebPartXml(webParts).then(function (webPartsWithXml) {
                            webPartsWithXml.forEach(function (wp) {
                                if (!wp.Contents.Xml) {
                                    return;
                                }
                                var oWebPartDefinition = limitedWebPartManager.importWebPart(util_1.Util.replaceUrlTokens(wp.Contents.Xml));
                                var oWebPart = oWebPartDefinition.get_webPart();
                                limitedWebPartManager.addWebPart(oWebPart, wp.Zone, wp.Order);
                            });
                            clientContext.executeQueryAsync(resolve, resolve);
                        });
                    });
                }, resolve);
            });
        };
        ObjectFiles.prototype.ApplyFileProperties = function (dest, fileProperties) {
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var fileServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + dest;
                var file = web.getFileByServerRelativeUrl(fileServerRelativeUrl);
                var listItemAllFields = file.get_listItemAllFields();
                Object.keys(fileProperties).forEach(function (key) {
                    listItemAllFields.set_item(key, fileProperties[key]);
                });
                listItemAllFields.update();
                clientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectFiles.prototype.GetViewFromCollectionByUrl = function (viewCollection, url) {
            var serverRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + url;
            var viewCollectionEnumerator = viewCollection.getEnumerator();
            while (viewCollectionEnumerator.moveNext()) {
                var view = viewCollectionEnumerator.get_current();
                if (view.get_serverRelativeUrl().toString().toLowerCase() === serverRelativeUrl.toLowerCase()) {
                    return view;
                }
            }
            return null;
        };
        ObjectFiles.prototype.ModifyHiddenViews = function (objects) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                var mapping = {};
                var lists = [];
                var listViewCollections = [];
                objects.forEach(function (obj) {
                    if (!obj.Views) {
                        return;
                    }
                    obj.Views.forEach(function (v) {
                        mapping[v.List] = mapping[v.List] || [];
                        mapping[v.List].push(CoreUtil.Util.extend(v, { "Url": obj.Dest }));
                    });
                });
                Object.keys(mapping).forEach(function (l, index) {
                    lists.push(web.get_lists().getByTitle(l));
                    listViewCollections.push(web.get_lists().getByTitle(l).get_views());
                    clientContext.load(lists[index]);
                    clientContext.load(listViewCollections[index]);
                });
                clientContext.executeQueryAsync(function () {
                    Object.keys(mapping).forEach(function (l, index) {
                        var views = mapping[l];
                        var list = lists[index];
                        var viewCollection = listViewCollections[index];
                        views.forEach(function (v) {
                            var view = _this.GetViewFromCollectionByUrl(viewCollection, v.Url);
                            if (view == null) {
                                return;
                            }
                            if (v.Paged) {
                                view.set_paged(v.Paged);
                            }
                            if (v.Query) {
                                view.set_viewQuery(v.Query);
                            }
                            if (v.RowLimit) {
                                view.set_rowLimit(v.RowLimit);
                            }
                            if (v.ViewFields && v.ViewFields.length > 0) {
                                var columns_1 = view.get_viewFields();
                                columns_1.removeAll();
                                v.ViewFields.forEach(function (vf) {
                                    columns_1.add(vf);
                                });
                            }
                            view.update();
                        });
                        clientContext.load(viewCollection);
                        list.update();
                    });
                    clientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectFiles.prototype.GetFolderFromFilePath = function (filePath) {
            var split = filePath.split("/");
            return split.splice(0, split.length - 1).join("/");
        };
        ObjectFiles.prototype.GetFilenameFromFilePath = function (filePath) {
            var split = filePath.split("/");
            return split[split.length - 1];
        };
        return ObjectFiles;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectFiles = ObjectFiles;
    ;
});

},{"../../../sharepoint/util":47,"../../../utils/util":55,"./ObjectHandlerBase":5}],5:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../../net/HttpClient", "../../../utils/logging"], factory);
    }
})(function (require, exports) {
    "use strict";
    var HttpClient_1 = require("../../../net/HttpClient");
    var logging_1 = require("../../../utils/logging");
    var ObjectHandlerBase = (function () {
        function ObjectHandlerBase(name) {
            this.name = name;
            this.httpClient = new HttpClient_1.HttpClient();
        }
        ObjectHandlerBase.prototype.ProvisionObjects = function (objects, parameters) {
            return new Promise(function (resolve, reject) { resolve("Not implemented."); });
        };
        ObjectHandlerBase.prototype.scope_started = function () {
            logging_1.Logger.write("Provisioning: " + this.name + " Code execution scope started");
        };
        ObjectHandlerBase.prototype.scope_ended = function () {
            logging_1.Logger.write("Provisioning: " + this.name + " Code execution scope stopped");
        };
        return ObjectHandlerBase;
    }());
    exports.ObjectHandlerBase = ObjectHandlerBase;
});

},{"../../../net/HttpClient":43,"../../../utils/logging":53}],6:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../Sequencer/Sequencer", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Sequencer_1 = require("../Sequencer/Sequencer");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectLists = (function (_super) {
        __extends(ObjectLists, _super);
        function ObjectLists() {
            _super.call(this, "Lists");
        }
        ObjectLists.prototype.ProvisionObjects = function (objects) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var lists = clientContext.get_web().get_lists();
                var listInstances = [];
                clientContext.load(lists);
                clientContext.executeQueryAsync(function () {
                    objects.forEach(function (obj, index) {
                        var existingObj = lists.get_data().filter(function (list) {
                            return list.get_title() === obj.Title;
                        })[0];
                        if (existingObj) {
                            if (obj.Description) {
                                existingObj.set_description(obj.Description);
                            }
                            if (obj.EnableVersioning !== undefined) {
                                existingObj.set_enableVersioning(obj.EnableVersioning);
                            }
                            if (obj.EnableMinorVersions !== undefined) {
                                existingObj.set_enableMinorVersions(obj.EnableMinorVersions);
                            }
                            if (obj.EnableModeration !== undefined) {
                                existingObj.set_enableModeration(obj.EnableModeration);
                            }
                            if (obj.EnableFolderCreation !== undefined) {
                                existingObj.set_enableFolderCreation(obj.EnableFolderCreation);
                            }
                            if (obj.EnableAttachments !== undefined) {
                                existingObj.set_enableAttachments(obj.EnableAttachments);
                            }
                            if (obj.NoCrawl !== undefined) {
                                existingObj.set_noCrawl(obj.NoCrawl);
                            }
                            if (obj.DefaultDisplayFormUrl) {
                                existingObj.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            }
                            if (obj.DefaultEditFormUrl) {
                                existingObj.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            }
                            if (obj.DefaultNewFormUrl) {
                                existingObj.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            }
                            if (obj.DraftVersionVisibility) {
                                existingObj.set_draftVersionVisibility(SP.DraftVisibilityType[obj.DraftVersionVisibility]);
                            }
                            if (obj.ImageUrl) {
                                existingObj.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Hidden !== undefined) {
                                existingObj.set_hidden(obj.Hidden);
                            }
                            if (obj.ForceCheckout !== undefined) {
                                existingObj.set_forceCheckout(obj.ForceCheckout);
                            }
                            existingObj.update();
                            listInstances.push(existingObj);
                            clientContext.load(listInstances[index]);
                        }
                        else {
                            var objCreationInformation = new SP.ListCreationInformation();
                            if (obj.Description) {
                                objCreationInformation.set_description(obj.Description);
                            }
                            if (obj.OnQuickLaunch !== undefined) {
                                var value = obj.OnQuickLaunch ? SP.QuickLaunchOptions.on : SP.QuickLaunchOptions.off;
                                objCreationInformation.set_quickLaunchOption(value);
                            }
                            if (obj.TemplateType) {
                                objCreationInformation.set_templateType(obj.TemplateType);
                            }
                            if (obj.Title) {
                                objCreationInformation.set_title(obj.Title);
                            }
                            if (obj.Url) {
                                objCreationInformation.set_url(obj.Url);
                            }
                            var createdList = lists.add(objCreationInformation);
                            if (obj.EnableVersioning !== undefined) {
                                createdList.set_enableVersioning(obj.EnableVersioning);
                            }
                            if (obj.EnableMinorVersions !== undefined) {
                                createdList.set_enableMinorVersions(obj.EnableMinorVersions);
                            }
                            if (obj.EnableModeration !== undefined) {
                                createdList.set_enableModeration(obj.EnableModeration);
                            }
                            if (obj.EnableFolderCreation !== undefined) {
                                createdList.set_enableFolderCreation(obj.EnableFolderCreation);
                            }
                            if (obj.EnableAttachments !== undefined) {
                                createdList.set_enableAttachments(obj.EnableAttachments);
                            }
                            if (obj.NoCrawl !== undefined) {
                                createdList.set_noCrawl(obj.NoCrawl);
                            }
                            if (obj.DefaultDisplayFormUrl) {
                                createdList.set_defaultDisplayFormUrl(obj.DefaultDisplayFormUrl);
                            }
                            if (obj.DefaultEditFormUrl) {
                                createdList.set_defaultEditFormUrl(obj.DefaultEditFormUrl);
                            }
                            if (obj.DefaultNewFormUrl) {
                                createdList.set_defaultNewFormUrl(obj.DefaultNewFormUrl);
                            }
                            if (obj.DraftVersionVisibility) {
                                var value = SP.DraftVisibilityType[obj.DraftVersionVisibility.toLocaleLowerCase()];
                                createdList.set_draftVersionVisibility(value);
                            }
                            if (obj.ImageUrl) {
                                createdList.set_imageUrl(obj.ImageUrl);
                            }
                            if (obj.Hidden !== undefined) {
                                createdList.set_hidden(obj.Hidden);
                            }
                            if (obj.ForceCheckout !== undefined) {
                                createdList.set_forceCheckout(obj.ForceCheckout);
                            }
                            listInstances.push(createdList);
                            clientContext.load(listInstances[index]);
                        }
                    });
                    clientContext.executeQueryAsync(function () {
                        var sequencer = new Sequencer_1.Sequencer([
                            _this.ApplyContentTypeBindings,
                            _this.ApplyListInstanceFieldRefs,
                            _this.ApplyFields,
                            _this.ApplyLookupFields,
                            _this.ApplyListSecurity,
                            _this.CreateViews,
                            _this.InsertDataRows,
                            _this.CreateFolders,
                        ], { ClientContext: clientContext, ListInstances: listInstances, Objects: objects }, _this);
                        sequencer.execute().then(function () {
                            _super.prototype.scope_ended.call(_this);
                            resolve();
                        });
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        ObjectLists.prototype.EnsureLocationBasedMetadataDefaultsReceiver = function (clientContext, list) {
            var eventReceivers = list.get_eventReceivers();
            var eventRecCreationInfo = new SP.EventReceiverDefinitionCreationInformation();
            eventRecCreationInfo.set_receiverName("LocationBasedMetadataDefaultsReceiver ItemAdded");
            eventRecCreationInfo.set_synchronization(1);
            eventRecCreationInfo.set_sequenceNumber(1000);
            eventRecCreationInfo.set_receiverAssembly("Microsoft.Office.DocumentManagement, Version=15.0.0.0, Culture=neutral, " +
                "PublicKeyToken=71e9bce111e9429c");
            eventRecCreationInfo.set_receiverClass("Microsoft.Office.DocumentManagement.LocationBasedMetadataDefaultsReceiver");
            eventRecCreationInfo.set_eventType(SP.EventReceiverType.itemAdded);
            eventReceivers.add(eventRecCreationInfo);
            list.update();
        };
        ObjectLists.prototype.CreateFolders = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (!obj.Folders) {
                        return;
                    }
                    var folderServerRelativeUrl = _spPageContextInfo.webServerRelativeUrl + "/" + obj.Url;
                    var rootFolder = l.get_rootFolder();
                    var metadataDefaults = "<MetadataDefaults>";
                    var setMetadataDefaults = false;
                    obj.Folders.forEach(function (f) {
                        var folderUrl = folderServerRelativeUrl + "/" + f.Name;
                        rootFolder.get_folders().add(folderUrl);
                        if (f.DefaultValues) {
                            var keys = Object.keys(f.DefaultValues).length;
                            if (keys > 0) {
                                metadataDefaults += "<a href='" + folderUrl + "'>";
                                Object.keys(f.DefaultValues).forEach(function (key) {
                                    metadataDefaults += "<DefaultValue FieldName=\"" + key + "\">" + f.DefaultValues[key] + "</DefaultValue>";
                                });
                                metadataDefaults += "</a>";
                            }
                            setMetadataDefaults = true;
                        }
                    });
                    metadataDefaults += "</MetadataDefaults>";
                    if (setMetadataDefaults) {
                        var metadataDefaultsFileCreateInfo = new SP.FileCreationInformation();
                        metadataDefaultsFileCreateInfo.set_url(folderServerRelativeUrl + "/Forms/client_LocationBasedDefaults.html");
                        metadataDefaultsFileCreateInfo.set_content(new SP.Base64EncodedByteArray());
                        metadataDefaultsFileCreateInfo.set_overwrite(true);
                        for (var i = 0; i < metadataDefaults.length; i++) {
                            metadataDefaultsFileCreateInfo.get_content().append(metadataDefaults.charCodeAt(i));
                        }
                        rootFolder.get_files().add(metadataDefaultsFileCreateInfo);
                        _this.EnsureLocationBasedMetadataDefaultsReceiver(params.ClientContext, l);
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyContentTypeBindings = function (params) {
            return new Promise(function (resolve, reject) {
                var webCts = params.ClientContext.get_site().get_rootWeb().get_contentTypes();
                var listCts = [];
                params.ListInstances.forEach(function (l, index) {
                    listCts.push(l.get_contentTypes());
                    params.ClientContext.load(listCts[index], "Include(Name,Id)");
                    if (params.Objects[index].ContentTypeBindings) {
                        l.set_contentTypesEnabled(true);
                        l.update();
                    }
                });
                params.ClientContext.load(webCts);
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (list, index) {
                        var obj = params.Objects[index];
                        if (!obj.ContentTypeBindings) {
                            return;
                        }
                        var listContentTypes = listCts[index];
                        var existingContentTypes = new Array();
                        if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                            listContentTypes.get_data().forEach(function (ct) {
                                existingContentTypes.push(ct);
                            });
                        }
                        obj.ContentTypeBindings.forEach(function (ctb) {
                            listContentTypes.addExistingContentType(webCts.getById(ctb.ContentTypeId));
                        });
                        if (obj.RemoveExistingContentTypes && obj.ContentTypeBindings.length > 0) {
                            for (var j = 0; j < existingContentTypes.length; j++) {
                                var ect = existingContentTypes[j];
                                ect.deleteObject();
                            }
                        }
                        list.update();
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.ApplyListInstanceFieldRefs = function (params) {
            return new Promise(function (resolve, reject) {
                var siteFields = params.ClientContext.get_site().get_rootWeb().get_fields();
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.FieldRefs) {
                        obj.FieldRefs.forEach(function (fr) {
                            var field = siteFields.getByInternalNameOrTitle(fr.Name);
                            l.get_fields().add(field);
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyFields = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.Fields) {
                        obj.Fields.forEach(function (f) {
                            var fieldXml = _this.GetFieldXml(f, params.ListInstances, l);
                            var fieldType = _this.GetFieldXmlAttr(fieldXml, "Type");
                            if (fieldType !== "Lookup" && fieldType !== "LookupMulti") {
                                l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes);
                            }
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.ApplyLookupFields = function (params) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.Fields) {
                        obj.Fields.forEach(function (f) {
                            var fieldXml = _this.GetFieldXml(f, params.ListInstances, l);
                            if (!fieldXml) {
                                return;
                            }
                            var fieldType = _this.GetFieldXmlAttr(fieldXml, "Type");
                            if (fieldType === "Lookup" || fieldType === "LookupMulti") {
                                l.get_fields().addFieldAsXml(fieldXml, true, SP.AddFieldOptions.addToAllContentTypes);
                            }
                        });
                        l.update();
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        ObjectLists.prototype.GetFieldXmlAttr = function (fieldXml, attr) {
            var regex = new RegExp(attr + '=[\'|\"](?:(.+?))[\'|\"]');
            var match = regex.exec(fieldXml);
            return match[1];
        };
        ObjectLists.prototype.GetFieldXml = function (field, lists, list) {
            var fieldXml = "";
            if (!field.SchemaXml) {
                var properties_1 = [];
                Object.keys(field).forEach(function (prop) {
                    var value = field[prop];
                    if (prop === "List") {
                        var targetList = lists.filter(function (v) {
                            return v.get_title() === value;
                        });
                        if (targetList.length > 0) {
                            value = "{" + targetList[0].get_id().toString() + "}";
                        }
                        else {
                            return null;
                        }
                        properties_1.push(prop + "=\"" + value + "\"");
                    }
                });
                fieldXml = "<Field " + properties_1.join(" ") + ">";
                if (field.Type === "Calculated") {
                    fieldXml += "<Formula>" + field.Formula + "</Formula>";
                }
                fieldXml += "</Field>";
            }
            return fieldXml;
        };
        ObjectLists.prototype.ApplyListSecurity = function (params) {
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (!obj.Security) {
                        return;
                    }
                    if (obj.Security.BreakRoleInheritance) {
                        l.breakRoleInheritance(obj.Security.CopyRoleAssignments, obj.Security.ClearSubscopes);
                        l.update();
                        params.ClientContext.load(l.get_roleAssignments());
                    }
                });
                var web = params.ClientContext.get_web();
                var allProperties = web.get_allProperties();
                var siteGroups = web.get_siteGroups();
                var roleDefinitions = web.get_roleDefinitions();
                params.ClientContext.load(allProperties);
                params.ClientContext.load(roleDefinitions);
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (l, index) {
                        var obj = params.Objects[index];
                        if (!obj.Security) {
                            return;
                        }
                        obj.Security.RoleAssignments.forEach(function (ra) {
                            var roleDef = null;
                            if (typeof ra.RoleDefinition === "number") {
                                roleDef = roleDefinitions.getById(ra.RoleDefinition);
                            }
                            else {
                                roleDef = roleDefinitions.getByName(ra.RoleDefinition);
                            }
                            var roleBindings = SP.RoleDefinitionBindingCollection.newObject(params.ClientContext);
                            roleBindings.add(roleDef);
                            var principal = null;
                            if (ra.Principal.match(/\{[A-Za-z]*\}+/g)) {
                                var token = ra.Principal.substring(1, ra.Principal.length - 1);
                                var groupId = allProperties.get_fieldValues()[("vti_" + token)];
                                principal = siteGroups.getById(groupId);
                            }
                            else {
                                principal = siteGroups.getByName(principal);
                            }
                            l.get_roleAssignments().add(principal, roleBindings);
                        });
                        l.update();
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.CreateViews = function (params) {
            return new Promise(function (resolve, reject) {
                var listViewCollections = [];
                params.ListInstances.forEach(function (l, index) {
                    listViewCollections.push(l.get_views());
                    params.ClientContext.load(listViewCollections[index]);
                });
                params.ClientContext.executeQueryAsync(function () {
                    params.ListInstances.forEach(function (l, index) {
                        var obj = params.Objects[index];
                        if (!obj.Views) {
                            return;
                        }
                        listViewCollections.push(l.get_views());
                        params.ClientContext.load(listViewCollections[index]);
                        obj.Views.forEach(function (v) {
                            var viewExists = listViewCollections[index].get_data().filter(function (ev) {
                                if (obj.RemoveExistingViews && obj.Views.length > 0) {
                                    ev.deleteObject();
                                    return false;
                                }
                                return ev.get_title() === v.Title;
                            }).length > 0;
                            if (viewExists) {
                                var view = listViewCollections[index].getByTitle(v.Title);
                                if (v.Paged) {
                                    view.set_paged(v.Paged);
                                }
                                if (v.Query) {
                                    view.set_viewQuery(v.Query);
                                }
                                if (v.RowLimit) {
                                    view.set_rowLimit(v.RowLimit);
                                }
                                if (v.ViewFields && v.ViewFields.length > 0) {
                                    var columns_1 = view.get_viewFields();
                                    columns_1.removeAll();
                                    v.ViewFields.forEach(function (vf) {
                                        columns_1.add(vf);
                                    });
                                }
                                if (v.Scope) {
                                    view.set_scope(v.Scope);
                                }
                                view.update();
                            }
                            else {
                                var viewCreationInformation = new SP.ViewCreationInformation();
                                if (v.Title) {
                                    viewCreationInformation.set_title(v.Title);
                                }
                                if (v.PersonalView) {
                                    viewCreationInformation.set_personalView(v.PersonalView);
                                }
                                if (v.Paged) {
                                    viewCreationInformation.set_paged(v.Paged);
                                }
                                if (v.Query) {
                                    viewCreationInformation.set_query(v.Query);
                                }
                                if (v.RowLimit) {
                                    viewCreationInformation.set_rowLimit(v.RowLimit);
                                }
                                if (v.SetAsDefaultView) {
                                    viewCreationInformation.set_setAsDefaultView(v.SetAsDefaultView);
                                }
                                if (v.ViewFields) {
                                    viewCreationInformation.set_viewFields(v.ViewFields);
                                }
                                if (v.ViewTypeKind) {
                                    viewCreationInformation.set_viewTypeKind(SP.ViewType.html);
                                }
                                var view = l.get_views().add(viewCreationInformation);
                                if (v.Scope) {
                                    view.set_scope(v.Scope);
                                    view.update();
                                }
                                l.update();
                            }
                            params.ClientContext.load(l.get_views());
                        });
                    });
                    params.ClientContext.executeQueryAsync(resolve, resolve);
                }, resolve);
            });
        };
        ObjectLists.prototype.InsertDataRows = function (params) {
            return new Promise(function (resolve, reject) {
                params.ListInstances.forEach(function (l, index) {
                    var obj = params.Objects[index];
                    if (obj.DataRows) {
                        obj.DataRows.forEach(function (r) {
                            var item = l.addItem(new SP.ListItemCreationInformation());
                            Object.keys(r).forEach(function (key) {
                                item.set_item(key, r[key]);
                            });
                            item.update();
                            params.ClientContext.load(item);
                        });
                    }
                });
                params.ClientContext.executeQueryAsync(resolve, resolve);
            });
        };
        return ObjectLists;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectLists = ObjectLists;
});

},{"../Sequencer/Sequencer":12,"./ObjectHandlerBase":5}],7:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectNavigation = (function (_super) {
        __extends(ObjectNavigation, _super);
        function ObjectNavigation() {
            _super.call(this, "Navigation");
        }
        ObjectNavigation.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            var clientContext = SP.ClientContext.get_current();
            var navigation = clientContext.get_web().get_navigation();
            return new Promise(function (resolve, reject) {
                _this.ConfigureQuickLaunch(object.QuickLaunch, clientContext, _this.httpClient, navigation).then(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    reject();
                });
            });
        };
        ObjectNavigation.prototype.getNodeFromCollectionByTitle = function (nodeCollection, title) {
            var f = nodeCollection.filter(function (val) {
                return val.get_title() === title;
            });
            return f[0] || null;
        };
        ;
        ObjectNavigation.prototype.ConfigureQuickLaunch = function (nodes, clientContext, httpClient, navigation) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (nodes.length === 0) {
                    resolve();
                }
                else {
                    var quickLaunchNodeCollection_1 = navigation.get_quickLaunch();
                    clientContext.load(quickLaunchNodeCollection_1);
                    clientContext.executeQueryAsync(function () {
                        var temporaryQuickLaunch = [];
                        var index = quickLaunchNodeCollection_1.get_count() - 1;
                        while (index >= 0) {
                            var oldNode = quickLaunchNodeCollection_1.itemAt(index);
                            temporaryQuickLaunch.push(oldNode);
                            oldNode.deleteObject();
                            index--;
                        }
                        clientContext.executeQueryAsync(function () {
                            nodes.forEach(function (n) {
                                var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                                var newNode = new SP.NavigationNodeCreationInformation();
                                newNode.set_title(n.Title);
                                newNode.set_url(existingNode ? existingNode.get_url() : util_1.Util.replaceUrlTokens(n.Url));
                                newNode.set_asLastNode(true);
                                quickLaunchNodeCollection_1.add(newNode);
                            });
                            clientContext.executeQueryAsync(function () {
                                httpClient.get(_spPageContextInfo.webAbsoluteUrl + "/_api/web/Navigation/QuickLaunch").then(function (data) {
                                    data = data.d.results;
                                    data.forEach(function (d) {
                                        var node = navigation.getNodeById(d.Id);
                                        var childrenNodeCollection = node.get_children();
                                        var parentNode = nodes.filter(function (value) { return value.Title === d.Title; })[0];
                                        if (parentNode && parentNode.Children) {
                                            parentNode.Children.forEach(function (n) {
                                                var existingNode = _this.getNodeFromCollectionByTitle(temporaryQuickLaunch, n.Title);
                                                var newNode = new SP.NavigationNodeCreationInformation();
                                                newNode.set_title(n.Title);
                                                newNode.set_url(existingNode ? existingNode.get_url() : util_1.Util.replaceUrlTokens(n.Url));
                                                newNode.set_asLastNode(true);
                                                childrenNodeCollection.add(newNode);
                                            });
                                        }
                                    });
                                    clientContext.executeQueryAsync(resolve, resolve);
                                });
                            }, resolve);
                        });
                    });
                }
            });
        };
        return ObjectNavigation;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectNavigation = ObjectNavigation;
});

},{"../../util":37,"./ObjectHandlerBase":5}],8:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../../sharepoint/util", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../../sharepoint/util");
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectPropertyBagEntries = (function (_super) {
        __extends(ObjectPropertyBagEntries, _super);
        function ObjectPropertyBagEntries() {
            _super.call(this, "PropertyBagEntries");
        }
        ObjectPropertyBagEntries.prototype.ProvisionObjects = function (entries) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                if (!entries || entries.length === 0) {
                    resolve();
                }
                else {
                    var clientContext_1 = SP.ClientContext.get_current();
                    var web_1 = clientContext_1.get_web();
                    var propBag_1 = web_1.get_allProperties();
                    var indexedProperties_1 = [];
                    for (var i = 0; i < entries.length; i++) {
                        var entry = entries[i];
                        propBag_1.set_item(entry.Key, entry.Value);
                        if (entry.Indexed) {
                            indexedProperties_1.push(util_1.Util.encodePropertyKey(entry.Key));
                        }
                        ;
                    }
                    ;
                    web_1.update();
                    clientContext_1.load(propBag_1);
                    clientContext_1.executeQueryAsync(function () {
                        if (indexedProperties_1.length > 0) {
                            propBag_1.set_item("vti_indexedpropertykeys", indexedProperties_1.join("|"));
                            web_1.update();
                            clientContext_1.executeQueryAsync(function () {
                                _super.prototype.scope_ended.call(_this);
                                resolve();
                            }, function () {
                                _super.prototype.scope_ended.call(_this);
                                resolve();
                            });
                        }
                        else {
                            _super.prototype.scope_ended.call(_this);
                            resolve();
                        }
                    }, function () {
                        _super.prototype.scope_ended.call(_this);
                        resolve();
                    });
                }
            });
        };
        return ObjectPropertyBagEntries;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectPropertyBagEntries = ObjectPropertyBagEntries;
});

},{"../../../sharepoint/util":47,"./ObjectHandlerBase":5}],9:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ObjectHandlerBase"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ObjectHandlerBase_1 = require("./ObjectHandlerBase");
    var ObjectWebSettings = (function (_super) {
        __extends(ObjectWebSettings, _super);
        function ObjectWebSettings() {
            _super.call(this, "WebSettings");
        }
        ObjectWebSettings.prototype.ProvisionObjects = function (object) {
            var _this = this;
            _super.prototype.scope_started.call(this);
            return new Promise(function (resolve, reject) {
                var clientContext = SP.ClientContext.get_current();
                var web = clientContext.get_web();
                if (object.WelcomePage) {
                    web.get_rootFolder().set_welcomePage(object.WelcomePage);
                    web.get_rootFolder().update();
                }
                if (object.MasterUrl) {
                    web.set_masterUrl(object.MasterUrl);
                }
                if (object.CustomMasterUrl) {
                    web.set_customMasterUrl(object.CustomMasterUrl);
                }
                if (object.SaveSiteAsTemplateEnabled !== undefined) {
                    web.set_saveSiteAsTemplateEnabled(object.SaveSiteAsTemplateEnabled);
                }
                if (object.QuickLaunchEnabled !== undefined) {
                    web.set_saveSiteAsTemplateEnabled(object.QuickLaunchEnabled);
                }
                if (object.TreeViewEnabled !== undefined) {
                    web.set_treeViewEnabled(object.TreeViewEnabled);
                }
                web.update();
                clientContext.load(web);
                clientContext.executeQueryAsync(function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                }, function () {
                    _super.prototype.scope_ended.call(_this);
                    resolve();
                });
            });
        };
        return ObjectWebSettings;
    }(ObjectHandlerBase_1.ObjectHandlerBase));
    exports.ObjectWebSettings = ObjectWebSettings;
});

},{"./ObjectHandlerBase":5}],10:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./ProvisioningStep", "./ObjectHandlers/ObjectNavigation", "./ObjectHandlers/ObjectPropertyBagEntries", "./ObjectHandlers/ObjectFeatures", "./ObjectHandlers/ObjectWebSettings", "./ObjectHandlers/ObjectComposedLook", "./ObjectHandlers/ObjectCustomActions", "./ObjectHandlers/ObjectFiles", "./ObjectHandlers/ObjectLists", "../../sharepoint/util", "../../utils/logging", "../../net/HttpClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ProvisioningStep_1 = require("./ProvisioningStep");
    var ObjectNavigation_1 = require("./ObjectHandlers/ObjectNavigation");
    var ObjectPropertyBagEntries_1 = require("./ObjectHandlers/ObjectPropertyBagEntries");
    var ObjectFeatures_1 = require("./ObjectHandlers/ObjectFeatures");
    var ObjectWebSettings_1 = require("./ObjectHandlers/ObjectWebSettings");
    var ObjectComposedLook_1 = require("./ObjectHandlers/ObjectComposedLook");
    var ObjectCustomActions_1 = require("./ObjectHandlers/ObjectCustomActions");
    var ObjectFiles_1 = require("./ObjectHandlers/ObjectFiles");
    var ObjectLists_1 = require("./ObjectHandlers/ObjectLists");
    var util_1 = require("../../sharepoint/util");
    var logging_1 = require("../../utils/logging");
    var HttpClient_1 = require("../../net/HttpClient");
    var Provisioning = (function () {
        function Provisioning() {
            this.handlers = {
                "Navigation": ObjectNavigation_1.ObjectNavigation,
                "PropertyBagEntries": ObjectPropertyBagEntries_1.ObjectPropertyBagEntries,
                "Features": ObjectFeatures_1.ObjectFeatures,
                "WebSettings": ObjectWebSettings_1.ObjectWebSettings,
                "ComposedLook": ObjectComposedLook_1.ObjectComposedLook,
                "CustomActions": ObjectCustomActions_1.ObjectCustomActions,
                "Files": ObjectFiles_1.ObjectFiles,
                "Lists": ObjectLists_1.ObjectLists,
            };
            this.httpClient = new HttpClient_1.HttpClient();
        }
        Provisioning.prototype.applyTemplate = function (path) {
            var _this = this;
            var url = util_1.Util.replaceUrlTokens(path);
            return new Promise(function (resolve, reject) {
                _this.httpClient.get(url).then(function (response) {
                    if (response.ok) {
                        response.json().then(function (template) {
                            _this.start(template, Object.keys(template)).then(resolve, reject);
                        });
                    }
                    else {
                        reject(response.statusText);
                    }
                }, function (error) {
                    logging_1.Logger.write("Provisioning: The provided template is invalid", logging_1.Logger.LogLevel.Error);
                });
            });
        };
        Provisioning.prototype.start = function (json, queue) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.startTime = new Date().getTime();
                _this.queueItems = [];
                queue.forEach(function (q, index) {
                    if (!_this.handlers[q]) {
                        return;
                    }
                    _this.queueItems.push(new ProvisioningStep_1.ProvisioningStep(q, index, json[q], json.Parameters, _this.handlers[q]));
                });
                var promises = [];
                promises.push(new Promise(function () {
                    logging_1.Logger.write("Provisioning: Code execution scope started", logging_1.Logger.LogLevel.Info);
                }));
                var index = 1;
                while (_this.queueItems[index - 1] !== undefined) {
                    var i = promises.length - 1;
                    promises.push(_this.queueItems[index - 1].execute(promises[i]));
                    index++;
                }
                ;
                Promise.all(promises).then(function (value) {
                    logging_1.Logger.write("Provisioning: Code execution scope ended", logging_1.Logger.LogLevel.Info);
                    resolve(value);
                }, function (error) {
                    logging_1.Logger.write("Provisioning: Code execution scope ended" + JSON.stringify(error), logging_1.Logger.LogLevel.Error);
                    reject(error);
                });
            });
        };
        return Provisioning;
    }());
    exports.Provisioning = Provisioning;
});

},{"../../net/HttpClient":43,"../../sharepoint/util":47,"../../utils/logging":53,"./ObjectHandlers/ObjectComposedLook":1,"./ObjectHandlers/ObjectCustomActions":2,"./ObjectHandlers/ObjectFeatures":3,"./ObjectHandlers/ObjectFiles":4,"./ObjectHandlers/ObjectLists":6,"./ObjectHandlers/ObjectNavigation":7,"./ObjectHandlers/ObjectPropertyBagEntries":8,"./ObjectHandlers/ObjectWebSettings":9,"./ProvisioningStep":11}],11:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ProvisioningStep = (function () {
        function ProvisioningStep(name, index, objects, parameters, handler) {
            this.name = name;
            this.index = index;
            this.objects = objects;
            this.parameters = parameters;
            this.handler = handler;
        }
        ProvisioningStep.prototype.execute = function (dependentPromise) {
            var _this = this;
            var _handler = new this.handler();
            if (!dependentPromise) {
                return _handler.ProvisionObjects(this.objects, this.parameters);
            }
            return new Promise(function (resolve, reject) {
                dependentPromise.then(function () {
                    return _handler.ProvisionObjects(_this.objects, _this.parameters).then(resolve, resolve);
                });
            });
        };
        return ProvisioningStep;
    }());
    exports.ProvisioningStep = ProvisioningStep;
});

},{}],12:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Sequencer = (function () {
        function Sequencer(__functions, __parameter, __scope) {
            this.parameter = __parameter;
            this.scope = __scope;
            this.functions = this.deferredArray(__functions);
        }
        Sequencer.prototype.execute = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var promises = [];
                var index = 1;
                promises.push(new Promise(function () {
                    if (index < 1) {
                        index = 1;
                    }
                }));
                while (_this.functions[index - 1] !== undefined) {
                    var i = promises.length - 1;
                    promises.push(_this.functions[index - 1].execute(promises[i]));
                    index++;
                }
                ;
                Promise.all(promises).then(resolve, reject);
            });
        };
        Sequencer.prototype.deferredArray = function (__functions) {
            var _this = this;
            var functions = [];
            __functions.forEach(function (f) { return functions.push(new DeferredObject(f, _this.parameter, _this.scope)); });
            return functions;
        };
        return Sequencer;
    }());
    exports.Sequencer = Sequencer;
    var DeferredObject = (function () {
        function DeferredObject(func, parameter, scope) {
            this.func = func;
            this.parameter = parameter;
            this.scope = scope;
        }
        DeferredObject.prototype.execute = function (depFunc) {
            var _this = this;
            if (!depFunc) {
                return this.func.apply(this.scope, [this.parameter]);
            }
            return new Promise(function (resolve, reject) {
                depFunc.then(function () {
                    _this.func.apply(_this.scope, [_this.parameter]).then(resolve, resolve);
                });
            });
        };
        return DeferredObject;
    }());
});

},{}],13:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../utils/util", "../../collections/collections", "../../net/HttpClient"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../../utils/util");
    var collections_1 = require("../../collections/collections");
    var HttpClient_1 = require("../../net/HttpClient");
    var Queryable = (function () {
        function Queryable(baseUrl, path) {
            this._query = new collections_1.Dictionary();
            if (typeof baseUrl === "string") {
                var urlStr = baseUrl;
                if (urlStr.lastIndexOf("/") < 0) {
                    this._parentUrl = urlStr;
                    this._url = util_1.Util.combinePaths(urlStr, path);
                }
                else if (urlStr.lastIndexOf("/") > urlStr.lastIndexOf("(")) {
                    var index = urlStr.lastIndexOf("/");
                    this._parentUrl = urlStr.slice(0, index);
                    path = util_1.Util.combinePaths(urlStr.slice(index), path);
                    this._url = util_1.Util.combinePaths(this._parentUrl, path);
                }
                else {
                    var index = urlStr.lastIndexOf("(");
                    this._parentUrl = urlStr.slice(0, index);
                    this._url = util_1.Util.combinePaths(urlStr, path);
                }
            }
            else {
                var q = baseUrl;
                this._parentUrl = q._url;
                this._query.merge(q._query);
                this._url = util_1.Util.combinePaths(this._parentUrl, path);
            }
        }
        Queryable.prototype.concat = function (pathPart) {
            this._url += pathPart;
        };
        Queryable.prototype.append = function (pathPart) {
            this._url = util_1.Util.combinePaths(this._url, pathPart);
        };
        Object.defineProperty(Queryable.prototype, "parentUrl", {
            get: function () {
                return this._parentUrl;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Queryable.prototype, "query", {
            get: function () {
                return this._query;
            },
            enumerable: true,
            configurable: true
        });
        Queryable.prototype.toUrl = function () {
            if (!util_1.Util.isUrlAbsolute(this._url)) {
                if (typeof _spPageContextInfo !== "undefined") {
                    if (_spPageContextInfo.hasOwnProperty("webAbsoluteUrl")) {
                        return util_1.Util.combinePaths(_spPageContextInfo.webAbsoluteUrl, this._url);
                    }
                    else if (_spPageContextInfo.hasOwnProperty("webServerRelativeUrl")) {
                        return util_1.Util.combinePaths(_spPageContextInfo.webServerRelativeUrl, this._url);
                    }
                }
            }
            return this._url;
        };
        Queryable.prototype.toUrlAndQuery = function () {
            var _this = this;
            var url = this.toUrl();
            if (this._query.count() > 0) {
                url += "?";
                var keys = this._query.getKeys();
                url += keys.map(function (key, ix, arr) { return (key + "=" + _this._query.get(key)); }).join("&");
            }
            return url;
        };
        Queryable.prototype.get = function (parser) {
            if (parser === void 0) { parser = this.defaultParser; }
            var client = new HttpClient_1.HttpClient();
            return client.get(this.toUrlAndQuery()).then(function (response) {
                if (!response.ok) {
                    throw "Error making GET request: " + response.statusText;
                }
                return parser(response);
            }).then(function (parsed) {
                return parsed.hasOwnProperty("d") ? parsed.d.hasOwnProperty("results") ? parsed.d.results : parsed.d : parsed;
            });
        };
        Queryable.prototype.post = function (postOptions, parser) {
            if (postOptions === void 0) { postOptions = {}; }
            if (parser === void 0) { parser = this.defaultParser; }
            var client = new HttpClient_1.HttpClient();
            return client.post(this.toUrlAndQuery(), postOptions).then(function (response) {
                if (!response.ok) {
                    throw "Error making POST request: " + response.statusText;
                }
                if ((response.headers.has("Content-Length") && parseFloat(response.headers.get("Content-Length")) === 0)
                    || response.status === 204) {
                    return new Promise(function (resolve, reject) { resolve({}); });
                }
                return parser(response);
            });
        };
        Queryable.prototype.getParent = function (factory, baseUrl) {
            if (baseUrl === void 0) { baseUrl = this.parentUrl; }
            var parent = new factory(baseUrl);
            var target = this.query.get("@target");
            if (target !== null) {
                parent.query.add("@target", target);
            }
            return parent;
        };
        Queryable.prototype.defaultParser = function (r) {
            return r.json().then(function (json) {
                if (json.hasOwnProperty("d")) {
                    if (json.d.hasOwnProperty("results")) {
                        return json.d.results;
                    }
                    return json.d;
                }
                else if (json.hasOwnProperty("value")) {
                    return json.value;
                }
                return json;
            });
        };
        return Queryable;
    }());
    exports.Queryable = Queryable;
    var QueryableCollection = (function (_super) {
        __extends(QueryableCollection, _super);
        function QueryableCollection() {
            _super.apply(this, arguments);
        }
        QueryableCollection.prototype.filter = function (filter) {
            this._query.add("$filter", filter);
            return this;
        };
        QueryableCollection.prototype.select = function () {
            var selects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selects[_i - 0] = arguments[_i];
            }
            this._query.add("$select", selects.join(","));
            return this;
        };
        return QueryableCollection;
    }(Queryable));
    exports.QueryableCollection = QueryableCollection;
    var QueryableInstance = (function (_super) {
        __extends(QueryableInstance, _super);
        function QueryableInstance() {
            _super.apply(this, arguments);
        }
        QueryableInstance.prototype.select = function () {
            var selects = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                selects[_i - 0] = arguments[_i];
            }
            this._query.add("$select", selects.join(","));
            return this;
        };
        return QueryableInstance;
    }(Queryable));
    exports.QueryableInstance = QueryableInstance;
});

},{"../../collections/collections":38,"../../net/HttpClient":43,"../../utils/util":55}],14:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./RoleAssignments", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var RoleAssignments_1 = require("./RoleAssignments");
    var Queryable_1 = require("./Queryable");
    var QueryableSecurable = (function (_super) {
        __extends(QueryableSecurable, _super);
        function QueryableSecurable() {
            _super.apply(this, arguments);
        }
        Object.defineProperty(QueryableSecurable.prototype, "roleAssignments", {
            get: function () {
                return new RoleAssignments_1.RoleAssignments(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(QueryableSecurable.prototype, "firstUniqueAncestorSecurableObject", {
            get: function () {
                this.append("FirstUniqueAncestorSecurableObject");
                return new Queryable_1.QueryableInstance(this);
            },
            enumerable: true,
            configurable: true
        });
        QueryableSecurable.prototype.getUserEffectivePermissions = function (loginName) {
            this.append("getUserEffectivePermissions(@user)");
            this._query.add("@user", "'" + encodeURIComponent(loginName) + "'");
            return new Queryable_1.Queryable(this);
        };
        QueryableSecurable.prototype.breakRoleInheritance = function (copyRoleAssignments, clearSubscopes) {
            if (copyRoleAssignments === void 0) { copyRoleAssignments = false; }
            if (clearSubscopes === void 0) { clearSubscopes = false; }
            var Breaker = (function (_super) {
                __extends(Breaker, _super);
                function Breaker(baseUrl, copy, clear) {
                    _super.call(this, baseUrl, "breakroleinheritance(copyroleassignments=" + copy + ", clearsubscopes=" + clear + ")");
                }
                Breaker.prototype.break = function () {
                    return this.post();
                };
                return Breaker;
            }(Queryable_1.Queryable));
            var b = new Breaker(this, copyRoleAssignments, clearSubscopes);
            return b.break();
        };
        QueryableSecurable.prototype.resetRoleInheritance = function () {
            var Resetter = (function (_super) {
                __extends(Resetter, _super);
                function Resetter(baseUrl) {
                    _super.call(this, baseUrl, "resetroleinheritance");
                }
                Resetter.prototype.reset = function () {
                    return this.post();
                };
                return Resetter;
            }(Queryable_1.Queryable));
            var r = new Resetter(this);
            return r.reset();
        };
        return QueryableSecurable;
    }(Queryable_1.QueryableInstance));
    exports.QueryableSecurable = QueryableSecurable;
});

},{"./Queryable":13,"./RoleAssignments":15}],15:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var RoleAssignments = (function (_super) {
        __extends(RoleAssignments, _super);
        function RoleAssignments(baseUrl) {
            _super.call(this, baseUrl, "RoleAssignments");
        }
        return RoleAssignments;
    }(Queryable_1.QueryableCollection));
    exports.RoleAssignments = RoleAssignments;
});

},{"./Queryable":13}],16:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var ContentTypes = (function (_super) {
        __extends(ContentTypes, _super);
        function ContentTypes(baseUrl, path) {
            if (path === void 0) { path = "contenttypes"; }
            _super.call(this, baseUrl, path);
        }
        ContentTypes.prototype.getById = function (id) {
            var ct = new ContentType(this);
            ct.concat("('" + id + "')");
            return ct;
        };
        return ContentTypes;
    }(Queryable_1.QueryableCollection));
    exports.ContentTypes = ContentTypes;
    var ContentType = (function (_super) {
        __extends(ContentType, _super);
        function ContentType(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(ContentType.prototype, "descriptionResource", {
            get: function () {
                return new Queryable_1.Queryable(this, "descriptionResource");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "fieldLinks", {
            get: function () {
                return new Queryable_1.Queryable(this, "fieldLinks");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "fields", {
            get: function () {
                return new Queryable_1.Queryable(this, "fields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "nameResource", {
            get: function () {
                return new Queryable_1.Queryable(this, "nameResource");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "parent", {
            get: function () {
                return new Queryable_1.Queryable(this, "parent");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "workflowAssociations", {
            get: function () {
                return new Queryable_1.Queryable(this, "workflowAssociations");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "description", {
            get: function () {
                return new Queryable_1.Queryable(this, "description");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "displayFormTemplateName", {
            get: function () {
                return new Queryable_1.Queryable(this, "displayFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "displayFormUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "displayFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "documentTemplate", {
            get: function () {
                return new Queryable_1.Queryable(this, "documentTemplate");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "documentTemplateUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "documentTemplateUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "editFormTemplateName", {
            get: function () {
                return new Queryable_1.Queryable(this, "editFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "editFormUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "editFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "group", {
            get: function () {
                return new Queryable_1.Queryable(this, "group");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "hidden", {
            get: function () {
                return new Queryable_1.Queryable(this, "hidden");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "jsLink", {
            get: function () {
                return new Queryable_1.Queryable(this, "jsLink");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "name", {
            get: function () {
                return new Queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "newFormTemplateName", {
            get: function () {
                return new Queryable_1.Queryable(this, "newFormTemplateName");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "newFormUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "newFormUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "readOnly", {
            get: function () {
                return new Queryable_1.Queryable(this, "readOnly");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "schemaXml", {
            get: function () {
                return new Queryable_1.Queryable(this, "schemaXml");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "scope", {
            get: function () {
                return new Queryable_1.Queryable(this, "scope");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "sealed", {
            get: function () {
                return new Queryable_1.Queryable(this, "sealed");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ContentType.prototype, "stringId", {
            get: function () {
                return new Queryable_1.Queryable(this, "stringId");
            },
            enumerable: true,
            configurable: true
        });
        return ContentType;
    }(Queryable_1.QueryableInstance));
    exports.ContentType = ContentType;
});

},{"./Queryable":13}],17:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"./Queryable":13,"dup":16}],18:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "../../utils/util", "./types"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var util_1 = require("../../utils/util");
    var Types = require("./types");
    var Fields = (function (_super) {
        __extends(Fields, _super);
        function Fields(baseUrl, path) {
            if (path === void 0) { path = "fields"; }
            _super.call(this, baseUrl, path);
        }
        Fields.prototype.getByTitle = function (title) {
            return new Field(this, "getByTitle('" + title + "')");
        };
        Fields.prototype.getById = function (id) {
            var f = new Field(this);
            f.concat("('" + id + "')");
            return f;
        };
        Fields.prototype.createFieldAsXml = function (xml) {
            var _this = this;
            var info;
            if (typeof xml === "string") {
                info = { SchemaXml: xml };
            }
            else {
                info = xml;
            }
            var postBody = JSON.stringify({
                "parameters": util_1.Util.extend({
                    "__metadata": {
                        "type": "SP.XmlSchemaFieldCreationInformation",
                    },
                }, info),
            });
            var q = new Fields(this, "createfieldasxml");
            return q.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    field: _this.getById(data.Id),
                };
            });
        };
        Fields.prototype.add = function (title, fieldType, properties) {
            var _this = this;
            if (properties === void 0) { properties = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": fieldType },
                "Title": title,
            }, properties));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    field: _this.getById(data.Id),
                };
            });
        };
        Fields.prototype.addText = function (title, maxLength, properties) {
            if (maxLength === void 0) { maxLength = 255; }
            var props = {
                FieldTypeKind: 2,
            };
            return this.add(title, "SP.FieldText", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addCalculated = function (title, formula, dateFormat, outputType, properties) {
            if (outputType === void 0) { outputType = Types.FieldTypes.Text; }
            var props = {
                DateFormat: dateFormat,
                FieldTypeKind: 17,
                Formula: formula,
                OutputType: outputType,
            };
            return this.add(title, "SP.FieldCalculated", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addDateTime = function (title, displayFormat, calendarType, friendlyDisplayFormat, properties) {
            if (displayFormat === void 0) { displayFormat = Types.DateTimeFieldFormatType.DateOnly; }
            if (calendarType === void 0) { calendarType = Types.CalendarType.Gregorian; }
            if (friendlyDisplayFormat === void 0) { friendlyDisplayFormat = 0; }
            var props = {
                DateTimeCalendarType: calendarType,
                DisplayFormat: displayFormat,
                FieldTypeKind: 4,
                FriendlyDisplayFormat: friendlyDisplayFormat,
            };
            return this.add(title, "SP.FieldDateTime", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addNumber = function (title, minValue, maxValue, properties) {
            var props = { FieldTypeKind: 9 };
            if (typeof minValue !== "undefined") {
                props = util_1.Util.extend({ MinimumValue: minValue }, props);
            }
            if (typeof maxValue !== "undefined") {
                props = util_1.Util.extend({ MaximumValue: maxValue }, props);
            }
            return this.add(title, "SP.FieldNumber", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addCurrency = function (title, minValue, maxValue, currencyLocalId, properties) {
            if (currencyLocalId === void 0) { currencyLocalId = 1033; }
            var props = {
                CurrencyLocaleId: currencyLocalId,
                FieldTypeKind: 10,
            };
            if (typeof minValue !== "undefined") {
                props = util_1.Util.extend({ MinimumValue: minValue }, props);
            }
            if (typeof maxValue !== "undefined") {
                props = util_1.Util.extend({ MaximumValue: maxValue }, props);
            }
            return this.add(title, "SP.FieldCurrency", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addMultilineText = function (title, numberOfLines, richText, restrictedMode, appendOnly, allowHyperlink, properties) {
            if (numberOfLines === void 0) { numberOfLines = 6; }
            if (richText === void 0) { richText = true; }
            if (restrictedMode === void 0) { restrictedMode = false; }
            if (appendOnly === void 0) { appendOnly = false; }
            if (allowHyperlink === void 0) { allowHyperlink = true; }
            var props = {
                AllowHyperlink: allowHyperlink,
                AppendOnly: appendOnly,
                FieldTypeKind: 3,
                NumberOfLines: numberOfLines,
                RestrictedMode: restrictedMode,
                RichText: richText,
            };
            return this.add(title, "SP.FieldMultiLineText", util_1.Util.extend(props, properties));
        };
        Fields.prototype.addUrl = function (title, displayFormat, properties) {
            if (displayFormat === void 0) { displayFormat = Types.UrlFieldFormatType.Hyperlink; }
            var props = {
                DisplayFormat: displayFormat,
                FieldTypeKind: 11,
            };
            return this.add(title, "SP.FieldUrl", util_1.Util.extend(props, properties));
        };
        return Fields;
    }(queryable_1.QueryableCollection));
    exports.Fields = Fields;
    var Field = (function (_super) {
        __extends(Field, _super);
        function Field(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Field.prototype.update = function (properties, fieldType) {
            var _this = this;
            if (fieldType === void 0) { fieldType = "SP.Field"; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": fieldType },
            }, properties));
            return this.post({
                body: postBody,
                headers: {
                    "X-HTTP-Method": "MERGE",
                },
            }).then(function (data) {
                return {
                    data: data,
                    field: _this,
                };
            });
        };
        Field.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Field.prototype.setShowInDisplayForm = function (show) {
            var q = new Field(this, "setshowindisplayform(" + show + ")");
            return q.post();
        };
        Field.prototype.setShowInEditForm = function (show) {
            var q = new Field(this, "setshowineditform(" + show + ")");
            return q.post();
        };
        Field.prototype.setShowInNewForm = function (show) {
            var q = new Field(this, "setshowinnewform(" + show + ")");
            return q.post();
        };
        return Field;
    }(queryable_1.QueryableInstance));
    exports.Field = Field;
});

},{"../../utils/util":55,"./queryable":24,"./types":31}],19:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "./items"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var items_1 = require("./items");
    var Files = (function (_super) {
        __extends(Files, _super);
        function Files(baseUrl, path) {
            if (path === void 0) { path = "files"; }
            _super.call(this, baseUrl, path);
        }
        Files.prototype.getByName = function (name) {
            var f = new File(this);
            f.concat("('" + name + "')");
            return f;
        };
        Files.prototype.add = function (url, content, shouldOverWrite) {
            var _this = this;
            if (shouldOverWrite === void 0) { shouldOverWrite = true; }
            return new Files(this, "add(overwrite=" + shouldOverWrite + ",url='" + url + "')")
                .post({ body: content }).then(function (response) {
                return {
                    data: response,
                    file: _this.getByName(url),
                };
            });
        };
        Files.prototype.addTemplateFile = function (fileUrl, templateFileType) {
            var _this = this;
            return new Files(this, "addTemplateFile(urloffile='" + fileUrl + "',templatefiletype=" + templateFileType + ")")
                .post().then(function (response) {
                return {
                    data: response,
                    file: _this.getByName(fileUrl),
                };
            });
        };
        return Files;
    }(Queryable_1.QueryableCollection));
    exports.Files = Files;
    var File = (function (_super) {
        __extends(File, _super);
        function File(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(File.prototype, "author", {
            get: function () {
                return new Queryable_1.Queryable(this, "author");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkedOutByUser", {
            get: function () {
                return new Queryable_1.Queryable(this, "checkedOutByUser");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkInComment", {
            get: function () {
                return new Queryable_1.Queryable(this, "checkInComment");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "checkOutType", {
            get: function () {
                return new Queryable_1.Queryable(this, "checkOutType");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "contentTag", {
            get: function () {
                return new Queryable_1.Queryable(this, "contentTag");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "customizedPageStatus", {
            get: function () {
                return new Queryable_1.Queryable(this, "customizedPageStatus");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "eTag", {
            get: function () {
                return new Queryable_1.Queryable(this, "eTag");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "exists", {
            get: function () {
                return new Queryable_1.Queryable(this, "exists");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "length", {
            get: function () {
                return new Queryable_1.Queryable(this, "length");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "level", {
            get: function () {
                return new Queryable_1.Queryable(this, "level");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "listItemAllFields", {
            get: function () {
                return new items_1.Item(this, "listItemAllFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "lockedByUser", {
            get: function () {
                return new Queryable_1.Queryable(this, "lockedByUser");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "majorVersion", {
            get: function () {
                return new Queryable_1.Queryable(this, "majorVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "minorVersion", {
            get: function () {
                return new Queryable_1.Queryable(this, "minorVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "modifiedBy", {
            get: function () {
                return new Queryable_1.Queryable(this, "modifiedBy");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "name", {
            get: function () {
                return new Queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "serverRelativeUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "serverRelativeUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "timeCreated", {
            get: function () {
                return new Queryable_1.Queryable(this, "timeCreated");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "timeLastModified", {
            get: function () {
                return new Queryable_1.Queryable(this, "timeLastModified");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "title", {
            get: function () {
                return new Queryable_1.Queryable(this, "title");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "uiVersion", {
            get: function () {
                return new Queryable_1.Queryable(this, "uiVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "uiVersionLabel", {
            get: function () {
                return new Queryable_1.Queryable(this, "uiVersionLabel");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "versions", {
            get: function () {
                return new Versions(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(File.prototype, "value", {
            get: function () {
                return new Queryable_1.Queryable(this, "$value");
            },
            enumerable: true,
            configurable: true
        });
        File.prototype.approve = function (comment) {
            return new File(this, "approve(comment='" + comment + "')").post();
        };
        File.prototype.cancelUpload = function (uploadId) {
            return new File(this, "cancelUpload(uploadId=guid'" + uploadId + "')").post();
        };
        File.prototype.checkin = function (comment, checkinType) {
            if (comment === void 0) { comment = ""; }
            if (checkinType === void 0) { checkinType = CheckinType.Major; }
            return new File(this, "checkin(comment='" + comment + "',checkintype=" + checkinType + ")").post();
        };
        File.prototype.checkout = function () {
            return new File(this, "checkout").post();
        };
        File.prototype.continueUpload = function (uploadId, fileOffset, fragment) {
            return new File(this, "continueUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")").post({ body: fragment });
        };
        File.prototype.copyTo = function (url, shouldOverWrite) {
            if (shouldOverWrite === void 0) { shouldOverWrite = true; }
            return new File(this, "copyTo(strnewurl='" + url + "',boverwrite=" + shouldOverWrite + ")").post();
        };
        File.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return new File(this).post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        File.prototype.deny = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "deny(comment='" + comment + "')").post();
        };
        File.prototype.finishUpload = function (uploadId, fileOffset, fragment) {
            return new File(this, "finishUpload(uploadId=guid'" + uploadId + "',fileOffset=" + fileOffset + ")")
                .post({ body: fragment }).then(function (response) {
                return {
                    data: response,
                    file: new File(response.ServerRelativeUrl),
                };
            });
        };
        File.prototype.getLimitedWebPartManager = function (scope) {
            if (scope === void 0) { scope = WebPartsPersonalizationScope.User; }
            return new Queryable_1.Queryable(this, "getLimitedWebPartManager(scope=" + scope + ")");
        };
        File.prototype.moveTo = function (url, moveOperations) {
            if (moveOperations === void 0) { moveOperations = MoveOperations.Overwrite; }
            return new File(this, "moveTo(newurl='" + url + "',flags=" + moveOperations + ")").post();
        };
        File.prototype.openBinaryStream = function () {
            return new Queryable_1.Queryable(this, "openBinaryStream");
        };
        File.prototype.publish = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "publish(comment='" + comment + "')").post();
        };
        File.prototype.recycle = function () {
            return new File(this, "recycle").post();
        };
        File.prototype.saveBinaryStream = function (data) {
            return new File(this, "saveBinary").post({ body: data });
        };
        File.prototype.startUpload = function (uploadId, fragment) {
            return new File(this, "startUpload(uploadId=guid'" + uploadId + "')").post({ body: fragment });
        };
        File.prototype.undoCheckout = function () {
            return new File(this, "undoCheckout").post();
        };
        File.prototype.unpublish = function (comment) {
            if (comment === void 0) { comment = ""; }
            return new File(this, "unpublish(comment='" + comment + "')").post();
        };
        return File;
    }(Queryable_1.QueryableInstance));
    exports.File = File;
    var Versions = (function (_super) {
        __extends(Versions, _super);
        function Versions(baseUrl, path) {
            if (path === void 0) { path = "versions"; }
            _super.call(this, baseUrl, path);
        }
        Versions.prototype.getById = function (versionId) {
            var v = new Version(this);
            v.concat("(" + versionId + ")");
            return v;
        };
        Versions.prototype.deleteAll = function () {
            return new Versions(this, "deleteAll").post();
        };
        Versions.prototype.deleteById = function (versionId) {
            return new Versions(this, "deleteById(vid=" + versionId + ")").post();
        };
        Versions.prototype.deleteByLabel = function (label) {
            return new Versions(this, "deleteByLabel(versionlabel='" + label + "')").post();
        };
        Versions.prototype.restoreByLabel = function (label) {
            return new Versions(this, "restoreByLabel(versionlabel='" + label + "')").post();
        };
        return Versions;
    }(Queryable_1.QueryableCollection));
    exports.Versions = Versions;
    var Version = (function (_super) {
        __extends(Version, _super);
        function Version(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Version.prototype, "checkInComment", {
            get: function () {
                return new Queryable_1.Queryable(this, "checkInComment");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "created", {
            get: function () {
                return new Queryable_1.Queryable(this, "created");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "createdBy", {
            get: function () {
                return new Queryable_1.Queryable(this, "createdBy");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "id", {
            get: function () {
                return new Queryable_1.Queryable(this, "id");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "isCurrentVersion", {
            get: function () {
                return new Queryable_1.Queryable(this, "isCurrentVersion");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "size", {
            get: function () {
                return new Queryable_1.Queryable(this, "size");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "url", {
            get: function () {
                return new Queryable_1.Queryable(this, "url");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Version.prototype, "versionLabel", {
            get: function () {
                return new Queryable_1.Queryable(this, "versionLabel");
            },
            enumerable: true,
            configurable: true
        });
        Version.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        return Version;
    }(Queryable_1.QueryableInstance));
    exports.Version = Version;
    (function (CheckinType) {
        CheckinType[CheckinType["Minor"] = 0] = "Minor";
        CheckinType[CheckinType["Major"] = 1] = "Major";
        CheckinType[CheckinType["Overwrite"] = 2] = "Overwrite";
    })(exports.CheckinType || (exports.CheckinType = {}));
    var CheckinType = exports.CheckinType;
    (function (WebPartsPersonalizationScope) {
        WebPartsPersonalizationScope[WebPartsPersonalizationScope["User"] = 0] = "User";
        WebPartsPersonalizationScope[WebPartsPersonalizationScope["Shared"] = 1] = "Shared";
    })(exports.WebPartsPersonalizationScope || (exports.WebPartsPersonalizationScope = {}));
    var WebPartsPersonalizationScope = exports.WebPartsPersonalizationScope;
    (function (MoveOperations) {
        MoveOperations[MoveOperations["Overwrite"] = 1] = "Overwrite";
        MoveOperations[MoveOperations["AllowBrokenThickets"] = 8] = "AllowBrokenThickets";
    })(exports.MoveOperations || (exports.MoveOperations = {}));
    var MoveOperations = exports.MoveOperations;
    (function (TemplateFileType) {
        TemplateFileType[TemplateFileType["StandardPage"] = 0] = "StandardPage";
        TemplateFileType[TemplateFileType["WikiPage"] = 1] = "WikiPage";
        TemplateFileType[TemplateFileType["FormPage"] = 2] = "FormPage";
    })(exports.TemplateFileType || (exports.TemplateFileType = {}));
    var TemplateFileType = exports.TemplateFileType;
});

},{"./Queryable":13,"./items":21}],20:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "./files", "./items"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var files_1 = require("./files");
    var items_1 = require("./items");
    var Folders = (function (_super) {
        __extends(Folders, _super);
        function Folders(baseUrl, path) {
            if (path === void 0) { path = "folders"; }
            _super.call(this, baseUrl, path);
        }
        Folders.prototype.getByName = function (name) {
            var f = new Folder(this);
            f.concat("('" + name + "')");
            return f;
        };
        Folders.prototype.add = function (url) {
            var _this = this;
            return new Folders(this, "add('" + url + "')").post().then(function (response) {
                return {
                    data: response,
                    folder: _this.getByName(url),
                };
            });
        };
        return Folders;
    }(Queryable_1.QueryableCollection));
    exports.Folders = Folders;
    var Folder = (function (_super) {
        __extends(Folder, _super);
        function Folder(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Folder.prototype, "contentTypeOrder", {
            get: function () {
                return new Queryable_1.QueryableCollection(this, "contentTypeOrder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "files", {
            get: function () {
                return new files_1.Files(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "folders", {
            get: function () {
                return new Folders(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "itemCount", {
            get: function () {
                return new Queryable_1.Queryable(this, "itemCount");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "listItemAllFields", {
            get: function () {
                return new items_1.Item(this, "listItemAllFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "name", {
            get: function () {
                return new Queryable_1.Queryable(this, "name");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "parentFolder", {
            get: function () {
                return new Folder(this, "parentFolder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "properties", {
            get: function () {
                return new Queryable_1.QueryableInstance(this, "properties");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "serverRelativeUrl", {
            get: function () {
                return new Queryable_1.Queryable(this, "serverRelativeUrl");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "uniqueContentTypeOrder", {
            get: function () {
                return new Queryable_1.QueryableCollection(this, "uniqueContentTypeOrder");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Folder.prototype, "welcomePage", {
            get: function () {
                return new Queryable_1.Queryable(this, "welcomePage");
            },
            enumerable: true,
            configurable: true
        });
        Folder.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return new Folder(this).post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Folder.prototype.recycle = function () {
            return new Folder(this, "recycle").post();
        };
        return Folder;
    }(Queryable_1.QueryableInstance));
    exports.Folder = Folder;
});

},{"./Queryable":13,"./files":19,"./items":21}],21:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "./QueryableSecurable", "./folders", "./contenttypes", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var QueryableSecurable_1 = require("./QueryableSecurable");
    var folders_1 = require("./folders");
    var contenttypes_1 = require("./contenttypes");
    var util_1 = require("../../utils/util");
    var Items = (function (_super) {
        __extends(Items, _super);
        function Items(baseUrl, path) {
            if (path === void 0) { path = "items"; }
            _super.call(this, baseUrl, path);
        }
        Items.prototype.getById = function (id) {
            var i = new Item(this);
            i.concat("(" + id + ")");
            return i;
        };
        Items.prototype.add = function (properties) {
            var _this = this;
            if (properties === void 0) { properties = {}; }
            var parentList = this.getParent(Queryable_1.QueryableInstance);
            return parentList.select("ListItemEntityTypeFullName").get().then(function (d) {
                var postBody = JSON.stringify(util_1.Util.extend({
                    "__metadata": { "type": d.ListItemEntityTypeFullName },
                }, properties));
                return _this.post({ body: postBody }).then(function (data) {
                    return {
                        data: data,
                        item: _this.getById(data.Id),
                    };
                });
            });
        };
        return Items;
    }(Queryable_1.QueryableCollection));
    exports.Items = Items;
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Item.prototype, "attachmentFiles", {
            get: function () {
                return new Queryable_1.QueryableCollection(this, "AttachmentFiles");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "contentType", {
            get: function () {
                return new contenttypes_1.ContentType(this, "ContentType");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "effectiveBasePermissions", {
            get: function () {
                return new Queryable_1.Queryable(this, "EffectiveBasePermissions");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "effectiveBasePermissionsForUI", {
            get: function () {
                return new Queryable_1.Queryable(this, "EffectiveBasePermissionsForUI");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesAsHTML", {
            get: function () {
                return new Queryable_1.QueryableInstance(this, "FieldValuesAsHTML");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesAsText", {
            get: function () {
                return new Queryable_1.QueryableInstance(this, "FieldValuesAsText");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "fieldValuesForEdit", {
            get: function () {
                return new Queryable_1.QueryableInstance(this, "FieldValuesForEdit");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Item.prototype, "folder", {
            get: function () {
                return new folders_1.Folder(this, "Folder");
            },
            enumerable: true,
            configurable: true
        });
        Item.prototype.update = function (properties, eTag) {
            var _this = this;
            if (eTag === void 0) { eTag = "*"; }
            var parentList = this.getParent(Queryable_1.QueryableInstance, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
            return parentList.select("ListItemEntityTypeFullName").get().then(function (d) {
                var postBody = JSON.stringify(util_1.Util.extend({
                    "__metadata": { "type": d.ListItemEntityTypeFullName },
                }, properties));
                return _this.post({
                    body: postBody,
                    headers: {
                        "IF-Match": eTag,
                        "X-HTTP-Method": "MERGE",
                    },
                }).then(function (data) {
                    return {
                        data: data,
                        item: _this,
                    };
                });
            });
        };
        Item.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Item.prototype.recycle = function () {
            var i = new Item(this, "recycle");
            return i.post();
        };
        Item.prototype.validateUpdateListItem = function (formValues, newDocumentUpdate) {
            if (newDocumentUpdate === void 0) { newDocumentUpdate = false; }
            var postBody = JSON.stringify({ "formValues": formValues, bNewDocumentUpdate: newDocumentUpdate });
            var item = new Item(this, "validateupdatelistitem");
            return item.post({ body: postBody });
        };
        return Item;
    }(QueryableSecurable_1.QueryableSecurable));
    exports.Item = Item;
});

},{"../../utils/util":55,"./Queryable":13,"./QueryableSecurable":14,"./contenttypes":17,"./folders":20}],22:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./items", "./views", "./contenttypes", "./fields", "./queryable", "./QueryableSecurable", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var items_1 = require("./items");
    var views_1 = require("./views");
    var contenttypes_1 = require("./contenttypes");
    var fields_1 = require("./fields");
    var queryable_1 = require("./queryable");
    var QueryableSecurable_1 = require("./QueryableSecurable");
    var util_1 = require("../../utils/util");
    var Lists = (function (_super) {
        __extends(Lists, _super);
        function Lists(baseUrl, path) {
            if (path === void 0) { path = "lists"; }
            _super.call(this, baseUrl, path);
        }
        Lists.prototype.getByTitle = function (title) {
            return new List(this, "getByTitle('" + title + "')");
        };
        Lists.prototype.getById = function (id) {
            var list = new List(this);
            list.concat("(guid'" + id + "')");
            return list;
        };
        Lists.prototype.add = function (title, description, template, enableContentTypes, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = 100; }
            if (enableContentTypes === void 0) { enableContentTypes = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.List" },
                "AllowContentTypes": enableContentTypes,
                "BaseTemplate": template,
                "ContentTypesEnabled": enableContentTypes,
                "Description": description,
                "Title": title,
            }, additionalSettings));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    list: _this.getByTitle(title),
                    data: data
                };
            });
        };
        Lists.prototype.ensure = function (title, description, template, enableContentTypes, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = 100; }
            if (enableContentTypes === void 0) { enableContentTypes = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            return new Promise(function (resolve, reject) {
                var list = _this.getByTitle(title);
                list.get().then(function (d) { return resolve({ created: false, list: list, data: d }); }).catch(function () {
                    _this.add(title, description, template, enableContentTypes, additionalSettings).then(function (r) {
                        resolve({ created: true, list: _this.getByTitle(title), data: r.data });
                    });
                }).catch(function (e) { return reject(e); });
            });
        };
        Lists.prototype.ensureSiteAssetsLibrary = function () {
            var q = new Lists(this, "ensuresiteassetslibrary");
            return q.post().then(function (json) {
                return new List(json["odata.id"]);
            });
        };
        Lists.prototype.ensureSitePagesLibrary = function () {
            var q = new Lists(this, "ensuresitepageslibrary");
            return q.post().then(function (json) {
                return new List(json["odata.id"]);
            });
        };
        return Lists;
    }(queryable_1.QueryableCollection));
    exports.Lists = Lists;
    var List = (function (_super) {
        __extends(List, _super);
        function List(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(List.prototype, "contentTypes", {
            get: function () {
                return new contenttypes_1.ContentTypes(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "items", {
            get: function () {
                return new items_1.Items(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "views", {
            get: function () {
                return new views_1.Views(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "fields", {
            get: function () {
                return new fields_1.Fields(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "defaultView", {
            get: function () {
                return new queryable_1.Queryable(this, "DefaultView");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "effectiveBasePermissions", {
            get: function () {
                return new queryable_1.Queryable(this, "EffectiveBasePermissions");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "eventReceivers", {
            get: function () {
                return new queryable_1.QueryableCollection(this, "EventReceivers");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "relatedFields", {
            get: function () {
                return new queryable_1.Queryable(this, "getRelatedFields");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "informationRightsManagementSettings", {
            get: function () {
                return new queryable_1.Queryable(this, "InformationRightsManagementSettings");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(List.prototype, "userCustomActions", {
            get: function () {
                return new queryable_1.Queryable(this, "UserCustomActions");
            },
            enumerable: true,
            configurable: true
        });
        List.prototype.getView = function (viewId) {
            return new views_1.View(this, "getView('" + viewId + "')");
        };
        List.prototype.update = function (properties, eTag) {
            var _this = this;
            if (eTag === void 0) { eTag = "*"; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.List" },
            }, properties));
            return this.post({
                body: postBody,
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "MERGE",
                },
            }).then(function (data) {
                var retList = _this;
                if (properties.hasOwnProperty("Title")) {
                    retList = _this.getParent(List);
                    retList.append("getByTitle('" + properties["Title"] + "')");
                }
                return {
                    data: data,
                    list: retList,
                };
            });
        };
        List.prototype.delete = function (eTag) {
            if (eTag === void 0) { eTag = "*"; }
            return this.post({
                headers: {
                    "IF-Match": eTag,
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        List.prototype.getChanges = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
            var q = new List(this, "getchanges");
            return q.post({ body: postBody });
        };
        List.prototype.getItemsByCAMLQuery = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.CamlQuery" } }, query) });
            var q = new List(this, "getitems");
            return q.post({ body: postBody });
        };
        List.prototype.getListItemChangesSinceToken = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeLogItemQuery" } }, query) });
            var q = new List(this, "getlistitemchangessincetoken");
            return q.post({ body: postBody }, function (r) { return r.text(); });
        };
        List.prototype.recycle = function () {
            this.append("recycle");
            return this.post();
        };
        List.prototype.renderListData = function (viewXml) {
            var q = new List(this, "renderlistdata(@viewXml)");
            q.query.add("@viewXml", "'" + viewXml + "'");
            return q.post();
        };
        List.prototype.renderListFormData = function (itemId, formId, mode) {
            var q = new List(this, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode=" + mode + ")");
            return q.post();
        };
        List.prototype.reserveListItemId = function () {
            var q = new List(this, "reservelistitemid");
            return q.post();
        };
        return List;
    }(QueryableSecurable_1.QueryableSecurable));
    exports.List = List;
});

},{"../../utils/util":55,"./QueryableSecurable":14,"./contenttypes":17,"./fields":18,"./items":21,"./queryable":24,"./views":33}],23:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./queryable", "./quickLaunch", "./topNavigationBar"], factory);
    }
})(function (require, exports) {
    "use strict";
    var queryable_1 = require("./queryable");
    var quickLaunch_1 = require("./quickLaunch");
    var topNavigationBar_1 = require("./topNavigationBar");
    var Navigation = (function (_super) {
        __extends(Navigation, _super);
        function Navigation(baseUrl) {
            _super.call(this, baseUrl, "navigation");
        }
        Object.defineProperty(Navigation.prototype, "quicklaunch", {
            get: function () {
                return new quickLaunch_1.QuickLaunch(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Navigation.prototype, "topNavigationBar", {
            get: function () {
                return new topNavigationBar_1.TopNavigationBar(this);
            },
            enumerable: true,
            configurable: true
        });
        return Navigation;
    }(queryable_1.Queryable));
    exports.Navigation = Navigation;
});

},{"./queryable":24,"./quickLaunch":25,"./topNavigationBar":30}],24:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"../../collections/collections":38,"../../net/HttpClient":43,"../../utils/util":55,"dup":13}],25:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var QuickLaunch = (function (_super) {
        __extends(QuickLaunch, _super);
        function QuickLaunch(baseUrl) {
            _super.call(this, baseUrl, "QuickLaunch");
        }
        return QuickLaunch;
    }(Queryable_1.Queryable));
    exports.QuickLaunch = QuickLaunch;
});

},{"./Queryable":13}],26:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./search", "./site", "./webs", "../../utils/util", "./userprofiles"], factory);
    }
})(function (require, exports) {
    "use strict";
    var search_1 = require("./search");
    var site_1 = require("./site");
    var webs_1 = require("./webs");
    var util_1 = require("../../utils/util");
    var userprofiles_1 = require("./userprofiles");
    var Rest = (function () {
        function Rest() {
        }
        Rest.prototype.search = function (query) {
            var finalQuery;
            if (typeof query === "string") {
                finalQuery = { Querytext: query };
            }
            else {
                finalQuery = query;
            }
            return new search_1.Search("_api/search", finalQuery).execute();
        };
        Object.defineProperty(Rest.prototype, "site", {
            get: function () {
                return new site_1.Site("_api", "site");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rest.prototype, "web", {
            get: function () {
                return new webs_1.Web("_api", "web");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Rest.prototype, "profiles", {
            get: function () {
                return new userprofiles_1.UserProfileQuery("_api");
            },
            enumerable: true,
            configurable: true
        });
        Rest.prototype.crossDomainSite = function (addInWebUrl, hostWebUrl) {
            return this._cdImpl(site_1.Site, addInWebUrl, hostWebUrl, "site");
        };
        Rest.prototype.crossDomainWeb = function (addInWebUrl, hostWebUrl) {
            return this._cdImpl(webs_1.Web, addInWebUrl, hostWebUrl, "web");
        };
        Rest.prototype._cdImpl = function (factory, addInWebUrl, hostWebUrl, urlPart) {
            if (!util_1.Util.isUrlAbsolute(addInWebUrl)) {
                throw "The addInWebUrl parameter must be an absolute url.";
            }
            if (!util_1.Util.isUrlAbsolute(hostWebUrl)) {
                throw "The hostWebUrl parameter must be an absolute url.";
            }
            var url = util_1.Util.combinePaths(addInWebUrl, "_api/SP.AppContextSite(@target)", urlPart);
            var instance = new factory(url);
            instance.query.add("@target", "'" + encodeURIComponent(hostWebUrl) + "'");
            return instance;
        };
        return Rest;
    }());
    exports.Rest = Rest;
});

},{"../../utils/util":55,"./search":27,"./site":28,"./userprofiles":32,"./webs":34}],27:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var Search = (function (_super) {
        __extends(Search, _super);
        function Search(baseUrl, query) {
            _super.call(this, baseUrl, "postquery");
            this.searchQuery = null;
            this.searchQuery = query;
        }
        Search.prototype.execute = function () {
            var formattedBody;
            formattedBody = this.searchQuery;
            if (formattedBody.SelectProperties) {
                formattedBody.SelectProperties = { results: this.searchQuery.SelectProperties };
            }
            if (formattedBody.RefinementFilters) {
                formattedBody.RefinementFilters = { results: this.searchQuery.RefinementFilters };
            }
            if (formattedBody.Refiners) {
                formattedBody.Refiners = { results: this.searchQuery.Refiners };
            }
            if (formattedBody.SortList) {
                formattedBody.SortList = { results: this.searchQuery.SortList };
            }
            if (formattedBody.HithighlightedProperties) {
                formattedBody.HithighlightedProperties = { results: this.searchQuery.HithighlightedProperties };
            }
            if (formattedBody.ReorderingRules) {
                formattedBody.ReorderingRules = { results: this.searchQuery.ReorderingRules };
            }
            var postBody = JSON.stringify({ request: formattedBody });
            return this.post({ body: postBody }).then(function (data) {
                return new SearchResults(data);
            });
        };
        return Search;
    }(Queryable_1.QueryableInstance));
    exports.Search = Search;
    var SearchResults = (function () {
        function SearchResults(response) {
            this.PrimarySearchResults = this.formatSearchResults(response.PrimaryQueryResult.RelevantResults.Table.Rows);
            this.RawSearchResults = response;
            this.ElapsedTime = response.ElapsedTime;
            this.RowCount = response.PrimaryQueryResult.RelevantResults.RowCount;
            this.TotalRows = response.PrimaryQueryResult.RelevantResults.TotalRows;
            this.TotalRowsIncludingDuplicates = response.PrimaryQueryResult.RelevantResults.TotalRowsIncludingDuplicates;
        }
        SearchResults.prototype.formatSearchResults = function (rawResults) {
            var results = new Array();
            for (var _i = 0, rawResults_1 = rawResults; _i < rawResults_1.length; _i++) {
                var i = rawResults_1[_i];
                results.push(new SearchResult(i.Cells));
            }
            return results;
        };
        return SearchResults;
    }());
    exports.SearchResults = SearchResults;
    var SearchResult = (function () {
        function SearchResult(item) {
            for (var _i = 0, item_1 = item; _i < item_1.length; _i++) {
                var i = item_1[_i];
                this[i.Key] = i.Value;
            }
        }
        return SearchResult;
    }());
    exports.SearchResult = SearchResult;
    (function (SortDirection) {
        SortDirection[SortDirection["Ascending"] = 0] = "Ascending";
        SortDirection[SortDirection["Descending"] = 1] = "Descending";
        SortDirection[SortDirection["FQLFormula"] = 2] = "FQLFormula";
    })(exports.SortDirection || (exports.SortDirection = {}));
    var SortDirection = exports.SortDirection;
    (function (ReorderingRuleMatchType) {
        ReorderingRuleMatchType[ReorderingRuleMatchType["ResultContainsKeyword"] = 0] = "ResultContainsKeyword";
        ReorderingRuleMatchType[ReorderingRuleMatchType["TitleContainsKeyword"] = 1] = "TitleContainsKeyword";
        ReorderingRuleMatchType[ReorderingRuleMatchType["TitleMatchesKeyword"] = 2] = "TitleMatchesKeyword";
        ReorderingRuleMatchType[ReorderingRuleMatchType["UrlStartsWith"] = 3] = "UrlStartsWith";
        ReorderingRuleMatchType[ReorderingRuleMatchType["UrlExactlyMatches"] = 4] = "UrlExactlyMatches";
        ReorderingRuleMatchType[ReorderingRuleMatchType["ContentTypeIs"] = 5] = "ContentTypeIs";
        ReorderingRuleMatchType[ReorderingRuleMatchType["FileExtensionMatches"] = 6] = "FileExtensionMatches";
        ReorderingRuleMatchType[ReorderingRuleMatchType["ResultHasTag"] = 7] = "ResultHasTag";
        ReorderingRuleMatchType[ReorderingRuleMatchType["ManualCondition"] = 8] = "ManualCondition";
    })(exports.ReorderingRuleMatchType || (exports.ReorderingRuleMatchType = {}));
    var ReorderingRuleMatchType = exports.ReorderingRuleMatchType;
    (function (QueryPropertyValueType) {
        QueryPropertyValueType[QueryPropertyValueType["None"] = 0] = "None";
        QueryPropertyValueType[QueryPropertyValueType["StringType"] = 1] = "StringType";
        QueryPropertyValueType[QueryPropertyValueType["Int32TYpe"] = 2] = "Int32TYpe";
        QueryPropertyValueType[QueryPropertyValueType["BooleanType"] = 3] = "BooleanType";
        QueryPropertyValueType[QueryPropertyValueType["StringArrayType"] = 4] = "StringArrayType";
        QueryPropertyValueType[QueryPropertyValueType["UnSupportedType"] = 5] = "UnSupportedType";
    })(exports.QueryPropertyValueType || (exports.QueryPropertyValueType = {}));
    var QueryPropertyValueType = exports.QueryPropertyValueType;
});

},{"./Queryable":13}],28:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "./webs", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var webs_1 = require("./webs");
    var util_1 = require("../../utils/util");
    var Site = (function (_super) {
        __extends(Site, _super);
        function Site(baseUrl, path) {
            var urlStr = baseUrl;
            if (urlStr.indexOf("_api") < 0) {
                baseUrl = util_1.Util.combinePaths(urlStr, "_api");
            }
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Site.prototype, "rootWeb", {
            get: function () {
                return new webs_1.Web(this, "rootweb");
            },
            enumerable: true,
            configurable: true
        });
        Site.prototype.getContextInfo = function () {
            var q = new Site("_api/contextinfo");
            return q.post();
        };
        Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
            var q = new Queryable_1.Queryable("_api/sp.web.getdocumentlibraries(@v)");
            q.query.add("@v", "'" + absoluteWebUrl + "'");
            return q.get();
        };
        Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
            var q = new Queryable_1.Queryable("_api/sp.web.getweburlfrompageurl(@v)");
            q.query.add("@v", "'" + absolutePageUrl + "'");
            return q.get();
        };
        return Site;
    }(Queryable_1.QueryableInstance));
    exports.Site = Site;
});

},{"../../utils/util":55,"./Queryable":13,"./webs":34}],29:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var SiteUsers = (function (_super) {
        __extends(SiteUsers, _super);
        function SiteUsers(baseUrl) {
            _super.call(this, baseUrl, "siteusers");
        }
        return SiteUsers;
    }(Queryable_1.QueryableCollection));
    exports.SiteUsers = SiteUsers;
});

},{"./Queryable":13}],30:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var TopNavigationBar = (function (_super) {
        __extends(TopNavigationBar, _super);
        function TopNavigationBar(baseUrl) {
            _super.call(this, baseUrl, "TopNavigationBar");
        }
        return TopNavigationBar;
    }(Queryable_1.QueryableInstance));
    exports.TopNavigationBar = TopNavigationBar;
});

},{"./Queryable":13}],31:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (ControlMode) {
        ControlMode[ControlMode["Display"] = 1] = "Display";
        ControlMode[ControlMode["Edit"] = 2] = "Edit";
        ControlMode[ControlMode["New"] = 3] = "New";
    })(exports.ControlMode || (exports.ControlMode = {}));
    var ControlMode = exports.ControlMode;
    (function (FieldTypes) {
        FieldTypes[FieldTypes["Invalid"] = 0] = "Invalid";
        FieldTypes[FieldTypes["Integer"] = 1] = "Integer";
        FieldTypes[FieldTypes["Text"] = 2] = "Text";
        FieldTypes[FieldTypes["Note"] = 3] = "Note";
        FieldTypes[FieldTypes["DateTime"] = 4] = "DateTime";
        FieldTypes[FieldTypes["Counter"] = 5] = "Counter";
        FieldTypes[FieldTypes["Choice"] = 6] = "Choice";
        FieldTypes[FieldTypes["Lookup"] = 7] = "Lookup";
        FieldTypes[FieldTypes["Boolean"] = 8] = "Boolean";
        FieldTypes[FieldTypes["Number"] = 9] = "Number";
        FieldTypes[FieldTypes["Currency"] = 10] = "Currency";
        FieldTypes[FieldTypes["URL"] = 11] = "URL";
        FieldTypes[FieldTypes["Computed"] = 12] = "Computed";
        FieldTypes[FieldTypes["Threading"] = 13] = "Threading";
        FieldTypes[FieldTypes["Guid"] = 14] = "Guid";
        FieldTypes[FieldTypes["MultiChoice"] = 15] = "MultiChoice";
        FieldTypes[FieldTypes["GridChoice"] = 16] = "GridChoice";
        FieldTypes[FieldTypes["Calculated"] = 17] = "Calculated";
        FieldTypes[FieldTypes["File"] = 18] = "File";
        FieldTypes[FieldTypes["Attachments"] = 19] = "Attachments";
        FieldTypes[FieldTypes["User"] = 20] = "User";
        FieldTypes[FieldTypes["Recurrence"] = 21] = "Recurrence";
        FieldTypes[FieldTypes["CrossProjectLink"] = 22] = "CrossProjectLink";
        FieldTypes[FieldTypes["ModStat"] = 23] = "ModStat";
        FieldTypes[FieldTypes["Error"] = 24] = "Error";
        FieldTypes[FieldTypes["ContentTypeId"] = 25] = "ContentTypeId";
        FieldTypes[FieldTypes["PageSeparator"] = 26] = "PageSeparator";
        FieldTypes[FieldTypes["ThreadIndex"] = 27] = "ThreadIndex";
        FieldTypes[FieldTypes["WorkflowStatus"] = 28] = "WorkflowStatus";
        FieldTypes[FieldTypes["AllDayEvent"] = 29] = "AllDayEvent";
        FieldTypes[FieldTypes["WorkflowEventType"] = 30] = "WorkflowEventType";
    })(exports.FieldTypes || (exports.FieldTypes = {}));
    var FieldTypes = exports.FieldTypes;
    (function (DateTimeFieldFormatType) {
        DateTimeFieldFormatType[DateTimeFieldFormatType["DateOnly"] = 0] = "DateOnly";
        DateTimeFieldFormatType[DateTimeFieldFormatType["DateTime"] = 1] = "DateTime";
    })(exports.DateTimeFieldFormatType || (exports.DateTimeFieldFormatType = {}));
    var DateTimeFieldFormatType = exports.DateTimeFieldFormatType;
    (function (AddFieldOptions) {
        AddFieldOptions[AddFieldOptions["DefaultValue"] = 0] = "DefaultValue";
        AddFieldOptions[AddFieldOptions["AddToDefaultContentType"] = 1] = "AddToDefaultContentType";
        AddFieldOptions[AddFieldOptions["AddToNoContentType"] = 2] = "AddToNoContentType";
        AddFieldOptions[AddFieldOptions["AddToAllContentTypes"] = 4] = "AddToAllContentTypes";
        AddFieldOptions[AddFieldOptions["AddFieldInternalNameHint"] = 8] = "AddFieldInternalNameHint";
        AddFieldOptions[AddFieldOptions["AddFieldToDefaultView"] = 16] = "AddFieldToDefaultView";
        AddFieldOptions[AddFieldOptions["AddFieldCheckDisplayName"] = 32] = "AddFieldCheckDisplayName";
    })(exports.AddFieldOptions || (exports.AddFieldOptions = {}));
    var AddFieldOptions = exports.AddFieldOptions;
    (function (CalendarType) {
        CalendarType[CalendarType["Gregorian"] = 1] = "Gregorian";
        CalendarType[CalendarType["Japan"] = 3] = "Japan";
        CalendarType[CalendarType["Taiwan"] = 4] = "Taiwan";
        CalendarType[CalendarType["Korea"] = 5] = "Korea";
        CalendarType[CalendarType["Hijri"] = 6] = "Hijri";
        CalendarType[CalendarType["Thai"] = 7] = "Thai";
        CalendarType[CalendarType["Hebrew"] = 8] = "Hebrew";
        CalendarType[CalendarType["GregorianMEFrench"] = 9] = "GregorianMEFrench";
        CalendarType[CalendarType["GregorianArabic"] = 10] = "GregorianArabic";
        CalendarType[CalendarType["GregorianXLITEnglish"] = 11] = "GregorianXLITEnglish";
        CalendarType[CalendarType["GregorianXLITFrench"] = 12] = "GregorianXLITFrench";
        CalendarType[CalendarType["KoreaJapanLunar"] = 14] = "KoreaJapanLunar";
        CalendarType[CalendarType["ChineseLunar"] = 15] = "ChineseLunar";
        CalendarType[CalendarType["SakaEra"] = 16] = "SakaEra";
        CalendarType[CalendarType["UmAlQura"] = 23] = "UmAlQura";
    })(exports.CalendarType || (exports.CalendarType = {}));
    var CalendarType = exports.CalendarType;
    (function (UrlFieldFormatType) {
        UrlFieldFormatType[UrlFieldFormatType["Hyperlink"] = 0] = "Hyperlink";
        UrlFieldFormatType[UrlFieldFormatType["Image"] = 1] = "Image";
    })(exports.UrlFieldFormatType || (exports.UrlFieldFormatType = {}));
    var UrlFieldFormatType = exports.UrlFieldFormatType;
});

},{}],32:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "../../utils/files"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var FileUtil = require("../../utils/files");
    var UserProfileQuery = (function (_super) {
        __extends(UserProfileQuery, _super);
        function UserProfileQuery(baseUrl, path) {
            if (path === void 0) { path = "sp.userprofiles.peoplemanager"; }
            _super.call(this, baseUrl, path);
            this.profileLoader = new ProfileLoader(baseUrl);
        }
        Object.defineProperty(UserProfileQuery.prototype, "editProfileLink", {
            get: function () {
                var q = new UserProfileQuery(this, "EditProfileLink");
                return q.get();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "isMyPeopleListPublic", {
            get: function () {
                var q = new UserProfileQuery(this, "IsMyPeopleListPublic");
                return q.get();
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.amIFollowedBy = function (loginName) {
            var q = new UserProfileQuery(this, "amifollowedby(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.amIFollowing = function (loginName) {
            var q = new UserProfileQuery(this, "amifollowing(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.getFollowedTags = function (maxCount) {
            if (maxCount === void 0) { maxCount = 20; }
            var q = new UserProfileQuery(this, "getfollowedtags(" + maxCount + ")");
            return q.get();
        };
        UserProfileQuery.prototype.getFollowersFor = function (loginName) {
            var q = new UserProfileQuery(this, "getfollowersfor(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        Object.defineProperty(UserProfileQuery.prototype, "myFollowers", {
            get: function () {
                return new Queryable_1.QueryableCollection(this, "getmyfollowers");
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "myProperties", {
            get: function () {
                return new UserProfileQuery(this, "getmyproperties");
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.getPeopleFollowedBy = function (loginName) {
            var q = new UserProfileQuery(this, "getpeoplefollowedby(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.getPropertiesFor = function (loginName) {
            var q = new UserProfileQuery(this, "getpropertiesfor(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        Object.defineProperty(UserProfileQuery.prototype, "trendingTags", {
            get: function () {
                var q = new UserProfileQuery(this, null);
                q.concat(".gettrendingtags");
                return q.get();
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.getUserProfilePropertyFor = function (loginName, propertyName) {
            var q = new UserProfileQuery(this, "getuserprofilepropertyfor(accountname=@v, propertyname='" + propertyName + "')");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.hideSuggestion = function (loginName) {
            var q = new UserProfileQuery(this, "hidesuggestion(@v)");
            q.query.add("@v", "'" + encodeURIComponent(loginName) + "'");
            return q.post();
        };
        UserProfileQuery.prototype.isFollowing = function (follower, followee) {
            var q = new UserProfileQuery(this, null);
            q.concat(".isfollowing(possiblefolloweraccountname=@v, possiblefolloweeaccountname=@y)");
            q.query.add("@v", "'" + encodeURIComponent(follower) + "'");
            q.query.add("@y", "'" + encodeURIComponent(followee) + "'");
            return q.get();
        };
        UserProfileQuery.prototype.setMyProfilePic = function (profilePicSource) {
            var _this = this;
            return FileUtil.readBlobAsArrayBuffer(profilePicSource).then(function (buffer) {
                var request = new UserProfileQuery(_this, "setmyprofilepicture");
                return request.post({
                    body: buffer,
                });
            });
        };
        UserProfileQuery.prototype.createPersonalSiteEnqueueBulk = function () {
            var emails = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                emails[_i - 0] = arguments[_i];
            }
            return this.profileLoader.createPersonalSiteEnqueueBulk(emails);
        };
        Object.defineProperty(UserProfileQuery.prototype, "ownerUserProfile", {
            get: function () {
                return this.profileLoader.ownerUserProfile;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserProfileQuery.prototype, "userProfile", {
            get: function () {
                return this.profileLoader.userProfile;
            },
            enumerable: true,
            configurable: true
        });
        UserProfileQuery.prototype.createPersonalSite = function (interactiveRequest) {
            if (interactiveRequest === void 0) { interactiveRequest = false; }
            return this.profileLoader.createPersonalSite(interactiveRequest);
        };
        UserProfileQuery.prototype.shareAllSocialData = function (share) {
            return this.profileLoader.shareAllSocialData(share);
        };
        return UserProfileQuery;
    }(Queryable_1.QueryableInstance));
    exports.UserProfileQuery = UserProfileQuery;
    var ProfileLoader = (function (_super) {
        __extends(ProfileLoader, _super);
        function ProfileLoader(baseUrl, path) {
            if (path === void 0) { path = "sp.userprofiles.profileloader.getprofileloader"; }
            _super.call(this, baseUrl, path);
        }
        ProfileLoader.prototype.createPersonalSiteEnqueueBulk = function (emails) {
            var q = new ProfileLoader(this, "createpersonalsiteenqueuebulk");
            var postBody = JSON.stringify({ "emailIDs": emails });
            return q.post({
                body: postBody,
            });
        };
        Object.defineProperty(ProfileLoader.prototype, "ownerUserProfile", {
            get: function () {
                var q = this.getParent(ProfileLoader);
                q.append("sp.userprofiles.profileloader.getowneruserprofile");
                return q.post();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ProfileLoader.prototype, "userProfile", {
            get: function () {
                var q = new ProfileLoader(this, "getuserprofile");
                return q.post();
            },
            enumerable: true,
            configurable: true
        });
        ProfileLoader.prototype.createPersonalSite = function (interactiveRequest) {
            if (interactiveRequest === void 0) { interactiveRequest = false; }
            var q = new ProfileLoader(this, "getuserprofile/createpersonalsiteenque(" + interactiveRequest + ")\",");
            return q.post();
        };
        ProfileLoader.prototype.shareAllSocialData = function (share) {
            var q = new ProfileLoader(this, "getuserprofile/shareallsocialdata(" + share + ")\",");
            return q.post();
        };
        return ProfileLoader;
    }(Queryable_1.Queryable));
});

},{"../../utils/files":52,"./Queryable":13}],33:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "../../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var util_1 = require("../../utils/util");
    var Views = (function (_super) {
        __extends(Views, _super);
        function Views(baseUrl) {
            _super.call(this, baseUrl, "views");
        }
        Views.prototype.getById = function (id) {
            var v = new View(this);
            v.concat("('" + id + "')");
            return v;
        };
        Views.prototype.getByTitle = function (title) {
            return new View(this, "getByTitle('" + title + "')");
        };
        Views.prototype.add = function (title, personalView, additionalSettings) {
            var _this = this;
            if (personalView === void 0) { personalView = false; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.View" },
                "Title": title,
                "PersonalView": personalView
            }, additionalSettings));
            return this.post({ body: postBody }).then(function (data) {
                return {
                    view: _this.getById(data.Id),
                    data: data
                };
            });
        };
        return Views;
    }(Queryable_1.QueryableCollection));
    exports.Views = Views;
    var View = (function (_super) {
        __extends(View, _super);
        function View(baseUrl, path) {
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(View.prototype, "fields", {
            get: function () {
                return new ViewFields(this);
            },
            enumerable: true,
            configurable: true
        });
        View.prototype.update = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.View" },
            }, properties));
            return this.post({
                body: postBody,
                headers: {
                    "X-HTTP-Method": "MERGE",
                },
            }).then(function (data) {
                return {
                    data: data,
                    view: _this,
                };
            });
        };
        View.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        View.prototype.renderAsHtml = function () {
            var q = new Queryable_1.Queryable(this, "renderashtml");
            return q.get();
        };
        return View;
    }(Queryable_1.QueryableInstance));
    exports.View = View;
    var ViewFields = (function (_super) {
        __extends(ViewFields, _super);
        function ViewFields(baseUrl, path) {
            if (path === void 0) { path = "viewfields"; }
            _super.call(this, baseUrl, path);
        }
        ViewFields.prototype.getSchemaXml = function () {
            var q = new Queryable_1.Queryable(this, "schemaxml");
            return q.get();
        };
        ViewFields.prototype.add = function (fieldTitleOrInternalName) {
            var q = new ViewFields(this, "addviewfield('" + fieldTitleOrInternalName + "')");
            return q.post();
        };
        ViewFields.prototype.move = function (fieldInternalName, index) {
            var q = new ViewFields(this, "moveviewfieldto");
            var postBody = JSON.stringify({ "field": fieldInternalName, "index": index });
            return q.post({ body: postBody });
        };
        ViewFields.prototype.removeAll = function () {
            var q = new ViewFields(this, "removeallviewfields");
            return q.post();
        };
        ViewFields.prototype.remove = function (fieldInternalName) {
            var q = new ViewFields(this, "removeviewfield('" + fieldInternalName + "')");
            return q.post();
        };
        return ViewFields;
    }(Queryable_1.QueryableCollection));
    exports.ViewFields = ViewFields;
});

},{"../../utils/util":55,"./Queryable":13}],34:[function(require,module,exports){
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Queryable", "./QueryableSecurable", "./lists", "./navigation", "./siteUsers", "./contentTypes", "./folders", "./files", "../../utils/util", "../../types/locale", "./lists"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Queryable_1 = require("./Queryable");
    var QueryableSecurable_1 = require("./QueryableSecurable");
    var lists_1 = require("./lists");
    var navigation_1 = require("./navigation");
    var siteUsers_1 = require("./siteUsers");
    var contentTypes_1 = require("./contentTypes");
    var folders_1 = require("./folders");
    var files_1 = require("./files");
    var util_1 = require("../../utils/util");
    var locale_1 = require("../../types/locale");
    var lists_2 = require("./lists");
    var Webs = (function (_super) {
        __extends(Webs, _super);
        function Webs(baseUrl, webPath) {
            if (webPath === void 0) { webPath = "webs"; }
            _super.call(this, baseUrl, webPath);
        }
        Webs.prototype.add = function (title, url, description, template, language, inheritPermissions, additionalSettings) {
            var _this = this;
            if (description === void 0) { description = ""; }
            if (template === void 0) { template = "STS"; }
            if (language === void 0) { language = locale_1.Locale.EnglishUnitedStates; }
            if (inheritPermissions === void 0) { inheritPermissions = true; }
            if (additionalSettings === void 0) { additionalSettings = {}; }
            var props = util_1.Util.extend({
                Description: description,
                Language: language,
                Title: title,
                Url: url,
                UseSamePermissionsAsParentSite: inheritPermissions,
                WebTemplate: template,
            }, additionalSettings);
            var postBody = JSON.stringify({
                "parameters": util_1.Util.extend({
                    "__metadata": { "type": "SP.WebCreationInformation" },
                }, props),
            });
            var q = new Webs(this, "add");
            return q.post({ body: postBody }).then(function (data) {
                return {
                    data: data,
                    web: new Web(_this, props.Url),
                };
            });
        };
        return Webs;
    }(Queryable_1.QueryableCollection));
    exports.Webs = Webs;
    var Web = (function (_super) {
        __extends(Web, _super);
        function Web(baseUrl, path) {
            var urlStr = baseUrl;
            if (urlStr.indexOf("_api") < 0) {
                baseUrl = util_1.Util.combinePaths(urlStr, "_api");
            }
            _super.call(this, baseUrl, path);
        }
        Object.defineProperty(Web.prototype, "webs", {
            get: function () {
                return new Webs(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "contentTypes", {
            get: function () {
                return new contentTypes_1.ContentTypes(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "lists", {
            get: function () {
                return new lists_1.Lists(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "navigation", {
            get: function () {
                return new navigation_1.Navigation(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "siteUsers", {
            get: function () {
                return new siteUsers_1.SiteUsers(this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Web.prototype, "folders", {
            get: function () {
                return new folders_1.Folders(this);
            },
            enumerable: true,
            configurable: true
        });
        Web.prototype.getFolderByServerRelativeUrl = function (folderRelativeUrl) {
            return new folders_1.Folder(this, "getFolderByServerRelativeUrl('" + folderRelativeUrl + "')");
        };
        Web.prototype.getFileByServerRelativeUrl = function (fileRelativeUrl) {
            return new files_1.File(this, "getFileByServerRelativeUrl('" + fileRelativeUrl + "')");
        };
        Web.prototype.update = function (properties) {
            var _this = this;
            var postBody = JSON.stringify(util_1.Util.extend({
                "__metadata": { "type": "SP.Web" },
            }, properties));
            return this.post({
                body: postBody,
                headers: {
                    "X-HTTP-Method": "MERGE",
                },
            }).then(function (data) {
                return {
                    data: data,
                    web: _this,
                };
            });
        };
        Web.prototype.delete = function () {
            return this.post({
                headers: {
                    "X-HTTP-Method": "DELETE",
                },
            });
        };
        Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
            var postBody = JSON.stringify({
                backgroundImageUrl: backgroundImageUrl,
                colorPaletteUrl: colorPaletteUrl,
                fontSchemeUrl: fontSchemeUrl,
                shareGenerated: shareGenerated,
            });
            var q = new Web(this, "applytheme");
            return q.post({ body: postBody });
        };
        Web.prototype.applyWebTemplate = function (template) {
            var q = new Web(this, "applywebtemplate");
            q.concat("(@t)");
            q.query.add("@t", template);
            return q.post();
        };
        Web.prototype.doesUserHavePermissions = function (perms) {
            var q = new Web(this, "doesuserhavepermissions");
            q.concat("(@p)");
            q.query.add("@p", JSON.stringify(perms));
            return q.get();
        };
        Web.prototype.ensureUser = function (loginName) {
            var postBody = JSON.stringify({
                logonName: loginName,
            });
            var q = new Web(this, "ensureuser");
            return q.post({ body: postBody });
        };
        Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
            if (language === void 0) { language = locale_1.Locale.EnglishUnitedStates; }
            if (includeCrossLanugage === void 0) { includeCrossLanugage = true; }
            return new Queryable_1.QueryableCollection(this, "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")");
        };
        Web.prototype.getCatalog = function (type) {
            var q = new Web(this, "getcatalog(" + type + ")");
            q.select("Id");
            return q.get().then(function (data) {
                return new lists_2.List(data["odata.id"]);
            });
        };
        Web.prototype.getChanges = function (query) {
            var postBody = JSON.stringify({ "query": util_1.Util.extend({ "__metadata": { "type": "SP.ChangeQuery" } }, query) });
            var q = new Web(this, "getchanges");
            return q.post({ body: postBody });
        };
        Object.defineProperty(Web.prototype, "customListTemplate", {
            get: function () {
                return new Queryable_1.QueryableCollection(this, "getcustomlisttemplates");
            },
            enumerable: true,
            configurable: true
        });
        Web.prototype.getUserById = function (id) {
            return new Queryable_1.QueryableInstance(this, "getUserById(" + id + ")");
        };
        Web.prototype.mapToIcon = function (filename, size, progId) {
            if (size === void 0) { size = 0; }
            if (progId === void 0) { progId = ""; }
            var q = new Web(this, "maptoicon(filename='" + filename + "', progid='" + progId + "', size=" + size + ")");
            return q.get();
        };
        return Web;
    }(QueryableSecurable_1.QueryableSecurable));
    exports.Web = Web;
});

},{"../../types/locale":48,"../../utils/util":55,"./Queryable":13,"./QueryableSecurable":14,"./contentTypes":16,"./files":19,"./folders":20,"./lists":22,"./navigation":23,"./siteUsers":29}],35:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Provisioning/Provisioning", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Provisioning_1 = require("./Provisioning/Provisioning");
    var Util_1 = require("./Util");
    var SharePoint = (function () {
        function SharePoint() {
            this.provisioning = new Provisioning_1.Provisioning();
            this.util = Util_1.Util;
        }
        return SharePoint;
    }());
    exports.SharePoint = SharePoint;
});

},{"./Provisioning/Provisioning":10,"./Util":36}],36:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Util = (function () {
        function Util() {
        }
        Util.getListId = function () {
            return _spPageContextInfo.hasOwnProperty("pageListId") ? _spPageContextInfo.pageListId.substring(1, 37) : "";
        };
        Util.getRelativeUrl = function (url) {
            return url.replace(document.location.protocol + "//" + document.location.hostname, "");
        };
        Util.replaceUrlTokens = function (url) {
            return url.replace(/{site}/g, _spPageContextInfo.webAbsoluteUrl)
                .replace(/{sitecollection}/g, _spPageContextInfo.siteAbsoluteUrl);
        };
        ;
        Util.encodePropertyKey = function (propKey) {
            var bytes = [];
            for (var i = 0; i < propKey.length; ++i) {
                bytes.push(propKey.charCodeAt(i));
                bytes.push(0);
            }
            var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
            return b64encoded;
        };
        return Util;
    }());
    exports.Util = Util;
});

},{}],37:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],38:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("../utils/util");
    var Dictionary = (function () {
        function Dictionary() {
            this.keys = [];
            this.values = [];
        }
        Dictionary.prototype.get = function (key) {
            var index = this.keys.indexOf(key);
            if (index < 0) {
                return null;
            }
            return this.values[index];
        };
        Dictionary.prototype.add = function (key, o) {
            var index = this.keys.indexOf(key);
            if (index > -1) {
                this.values[index] = o;
            }
            else {
                this.keys.push(key);
                this.values.push(o);
            }
        };
        Dictionary.prototype.merge = function (source) {
            if (util_1.Util.isFunction(source["getKeys"])) {
                var sourceAsDictionary = source;
                var keys = sourceAsDictionary.getKeys();
                var l = keys.length;
                for (var i = 0; i < l; i++) {
                    this.add(keys[i], sourceAsDictionary.get(keys[i]));
                }
            }
            else {
                var sourceAsHash = source;
                for (var key in sourceAsHash) {
                    if (sourceAsHash.hasOwnProperty(key)) {
                        this.add(key, source[key]);
                    }
                }
            }
        };
        Dictionary.prototype.remove = function (key) {
            var index = this.keys.indexOf(key);
            if (index < 0) {
                return null;
            }
            var val = this.values[index];
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
            return val;
        };
        Dictionary.prototype.getKeys = function () {
            return this.keys;
        };
        Dictionary.prototype.getValues = function () {
            return this.values;
        };
        Dictionary.prototype.clear = function () {
            this.keys = [];
            this.values = [];
        };
        Dictionary.prototype.count = function () {
            return this.keys.length;
        };
        return Dictionary;
    }());
    exports.Dictionary = Dictionary;
});

},{"../utils/util":55}],39:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../collections/collections", "./providers/providers"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Collections = require("../collections/collections");
    var providers = require("./providers/providers");
    var Settings = (function () {
        function Settings() {
            this.Providers = providers;
            this._settings = new Collections.Dictionary();
        }
        Settings.prototype.add = function (key, value) {
            this._settings.add(key, value);
        };
        Settings.prototype.addJSON = function (key, value) {
            this._settings.add(key, JSON.stringify(value));
        };
        Settings.prototype.apply = function (hash) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                try {
                    _this._settings.merge(hash);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        };
        Settings.prototype.load = function (provider) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                provider.getConfiguration().then(function (value) {
                    _this._settings.merge(value);
                    resolve();
                }).catch(function (reason) {
                    reject(reason);
                });
            });
        };
        Settings.prototype.get = function (key) {
            return this._settings.get(key);
        };
        Settings.prototype.getJSON = function (key) {
            var o = this.get(key);
            if (typeof o === "undefined" || o === null) {
                return o;
            }
            return JSON.parse(o);
        };
        return Settings;
    }());
    exports.Settings = Settings;
});

},{"../collections/collections":38,"./providers/providers":41}],40:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../../utils/storage"], factory);
    }
})(function (require, exports) {
    "use strict";
    var storage = require("../../utils/storage");
    var CachingConfigurationProvider = (function () {
        function CachingConfigurationProvider(wrappedProvider, cacheKey, cacheStore) {
            this.wrappedProvider = wrappedProvider;
            this.store = (cacheStore) ? cacheStore : this.selectPnPCache();
            this.cacheKey = "_configcache_" + cacheKey;
        }
        CachingConfigurationProvider.prototype.getWrappedProvider = function () {
            return this.wrappedProvider;
        };
        CachingConfigurationProvider.prototype.getConfiguration = function () {
            var _this = this;
            if ((!this.store) || (!this.store.enabled)) {
                return this.wrappedProvider.getConfiguration();
            }
            var cachedConfig = this.store.get(this.cacheKey);
            if (cachedConfig) {
                return new Promise(function (resolve, reject) {
                    resolve(cachedConfig);
                });
            }
            var providerPromise = this.wrappedProvider.getConfiguration();
            providerPromise.then(function (providedConfig) {
                _this.store.put(_this.cacheKey, providedConfig);
            });
            return providerPromise;
        };
        CachingConfigurationProvider.prototype.selectPnPCache = function () {
            var pnpCache = new storage.PnPClientStorage();
            if ((pnpCache.local) && (pnpCache.local.enabled)) {
                return pnpCache.local;
            }
            if ((pnpCache.session) && (pnpCache.session.enabled)) {
                return pnpCache.session;
            }
            throw new Error("Cannot create a caching configuration provider since cache is not available.");
        };
        return CachingConfigurationProvider;
    }());
    
    exports.default = CachingConfigurationProvider;
});

},{"../../utils/storage":54}],41:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./cachingConfigurationProvider", "./spListConfigurationProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    var cachingConfigurationProvider_1 = require("./cachingConfigurationProvider");
    var spListConfigurationProvider_1 = require("./spListConfigurationProvider");
    exports.CachingConfigurationProvider = cachingConfigurationProvider_1.default;
    exports.SPListConfigurationProvider = spListConfigurationProvider_1.default;
});

},{"./cachingConfigurationProvider":40,"./spListConfigurationProvider":42}],42:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./cachingConfigurationProvider"], factory);
    }
})(function (require, exports) {
    "use strict";
    var cachingConfigurationProvider_1 = require("./cachingConfigurationProvider");
    var SPListConfigurationProvider = (function () {
        function SPListConfigurationProvider(sourceWeb, sourceListTitle) {
            if (sourceListTitle === void 0) { sourceListTitle = "config"; }
            this.sourceWeb = sourceWeb;
            this.sourceListTitle = sourceListTitle;
        }
        Object.defineProperty(SPListConfigurationProvider.prototype, "web", {
            get: function () {
                return this.sourceWeb;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SPListConfigurationProvider.prototype, "listTitle", {
            get: function () {
                return this.sourceListTitle;
            },
            enumerable: true,
            configurable: true
        });
        SPListConfigurationProvider.prototype.getConfiguration = function () {
            return this.web.lists.getByTitle(this.listTitle).items.select("Title", "Value").get().then(function (data) {
                var configuration = {};
                data.forEach(function (i) {
                    configuration[i.Title] = i.Value;
                });
                return configuration;
            });
        };
        SPListConfigurationProvider.prototype.asCaching = function () {
            var cacheKey = "splist_" + this.web.toUrl() + "+" + this.listTitle;
            return new cachingConfigurationProvider_1.default(this, cacheKey);
        };
        return SPListConfigurationProvider;
    }());
    
    exports.default = SPListConfigurationProvider;
});

},{"./cachingConfigurationProvider":40}],43:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./fetchClient", "./digestCache", "../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var fetchClient_1 = require("./fetchClient");
    var digestCache_1 = require("./digestCache");
    var util_1 = require("../utils/util");
    var HttpClient = (function () {
        function HttpClient(_impl) {
            if (_impl === void 0) { _impl = new fetchClient_1.FetchClient(); }
            this._impl = _impl;
            this._digestCache = new digestCache_1.DigestCache(this);
        }
        HttpClient.prototype.fetch = function (url, options) {
            if (options === void 0) { options = {}; }
            var self = this;
            var opts = util_1.Util.extend(options, { cache: "no-cache", credentials: "same-origin" }, true);
            var headers = new Headers();
            if (typeof options.headers !== "undefined") {
                var temp = new Request("", { headers: options.headers });
                temp.headers.forEach(function (value, name) {
                    headers.append(name, value);
                });
            }
            if (!headers.has("Accept")) {
                headers.append("Accept", "application/json");
            }
            if (!headers.has("Content-type")) {
                headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
            }
            if (!headers.has("X-ClientService-ClientTag")) {
                headers.append("X-ClientService-ClientTag", "SharePoint.PnP.JavaScriptCore");
            }
            opts = util_1.Util.extend(opts, { headers: headers });
            if (opts.method && opts.method.toUpperCase() !== "GET") {
                if (!headers.has("X-RequestDigest")) {
                    var index = url.indexOf("/_api/");
                    if (index < 0) {
                        throw new Error("Unable to determine API url");
                    }
                    var webUrl = url.substr(0, index);
                    return this._digestCache.getDigest(webUrl)
                        .then(function (digest) {
                        headers.append("X-RequestDigest", digest);
                        return self.fetchRaw(url, opts);
                    });
                }
            }
            return self.fetchRaw(url, opts);
        };
        HttpClient.prototype.fetchRaw = function (url, options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            var retry = function (ctx) {
                _this._impl.fetch(url, options).then(function (response) { return ctx.resolve(response); }).catch(function (response) {
                    var delay = ctx.delay;
                    if (response.status !== 429 && response.status !== 503) {
                        ctx.reject(response);
                    }
                    ctx.delay *= 2;
                    ctx.attempts++;
                    if (ctx.retryCount <= ctx.attempts) {
                        ctx.reject(response);
                    }
                    setTimeout(util_1.Util.getCtxCallback(_this, retry, ctx), delay);
                });
            };
            return new Promise(function (resolve, reject) {
                var retryContext = {
                    attempts: 0,
                    delay: 100,
                    reject: reject,
                    resolve: resolve,
                    retryCount: 7,
                };
                retry.call(_this, retryContext);
            });
        };
        HttpClient.prototype.get = function (url, options) {
            if (options === void 0) { options = {}; }
            var opts = util_1.Util.extend(options, { method: "GET" });
            return this.fetch(url, opts);
        };
        HttpClient.prototype.post = function (url, options) {
            if (options === void 0) { options = {}; }
            var opts = util_1.Util.extend(options, { method: "POST" });
            return this.fetch(url, opts);
        };
        return HttpClient;
    }());
    exports.HttpClient = HttpClient;
});

},{"../utils/util":55,"./digestCache":44,"./fetchClient":45}],44:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "../collections/collections", "../utils/util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var collections_1 = require("../collections/collections");
    var util_1 = require("../utils/util");
    var CachedDigest = (function () {
        function CachedDigest() {
        }
        return CachedDigest;
    }());
    exports.CachedDigest = CachedDigest;
    var DigestCache = (function () {
        function DigestCache(_httpClient, _digests) {
            if (_digests === void 0) { _digests = new collections_1.Dictionary(); }
            this._httpClient = _httpClient;
            this._digests = _digests;
        }
        DigestCache.prototype.getDigest = function (webUrl) {
            var self = this;
            var cachedDigest = this._digests.get(webUrl);
            if (cachedDigest !== null) {
                var now = new Date();
                if (now < cachedDigest.expiration) {
                    return Promise.resolve(cachedDigest.value);
                }
            }
            var url = util_1.Util.combinePaths(webUrl, "/_api/contextinfo");
            return self._httpClient.fetchRaw(url, {
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json;odata=verbose;charset=utf-8",
                },
                method: "POST",
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                var newCachedDigest = new CachedDigest();
                newCachedDigest.value = data.FormDigestValue;
                var seconds = data.FormDigestTimeoutSeconds;
                var expiration = new Date();
                expiration.setTime(expiration.getTime() + 1000 * seconds);
                newCachedDigest.expiration = expiration;
                self._digests.add(webUrl, newCachedDigest);
                return newCachedDigest.value;
            });
        };
        DigestCache.prototype.clear = function () {
            this._digests.clear();
        };
        return DigestCache;
    }());
    exports.DigestCache = DigestCache;
});

},{"../collections/collections":38,"../utils/util":55}],45:[function(require,module,exports){
(function (global){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var FetchClient = (function () {
        function FetchClient() {
        }
        FetchClient.prototype.fetch = function (url, options) {
            return global.fetch(url, options);
        };
        return FetchClient;
    }());
    exports.FetchClient = FetchClient;
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],46:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./utils/Util", "./SharePoint/SharePoint", "./utils/Storage", "./configuration/configuration", "./utils/logging", "./SharePoint/Rest/rest"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Util_1 = require("./utils/Util");
    var SharePoint_1 = require("./SharePoint/SharePoint");
    var Storage_1 = require("./utils/Storage");
    var configuration_1 = require("./configuration/configuration");
    var logging_1 = require("./utils/logging");
    var rest_1 = require("./SharePoint/Rest/rest");
    var PnP = (function () {
        function PnP() {
        }
        PnP.util = Util_1.Util;
        PnP.sharepoint = new SharePoint_1.SharePoint();
        PnP.sp = new rest_1.Rest();
        PnP.storage = new Storage_1.PnPClientStorage();
        PnP.config = new configuration_1.Settings();
        PnP.log = logging_1.Logger;
        return PnP;
    }());
    
    return PnP;
});

},{"./SharePoint/Rest/rest":26,"./SharePoint/SharePoint":35,"./configuration/configuration":39,"./utils/Storage":49,"./utils/Util":50,"./utils/logging":53}],47:[function(require,module,exports){
arguments[4][36][0].apply(exports,arguments)
},{"dup":36}],48:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function (Locale) {
        Locale[Locale["AfrikaansSouthAfrica"] = 1078] = "AfrikaansSouthAfrica";
        Locale[Locale["AlbanianAlbania"] = 1052] = "AlbanianAlbania";
        Locale[Locale["Alsatian"] = 1156] = "Alsatian";
        Locale[Locale["AmharicEthiopia"] = 1118] = "AmharicEthiopia";
        Locale[Locale["ArabicSaudiArabia"] = 1025] = "ArabicSaudiArabia";
        Locale[Locale["ArabicAlgeria"] = 5121] = "ArabicAlgeria";
        Locale[Locale["ArabicBahrain"] = 15361] = "ArabicBahrain";
        Locale[Locale["ArabicEgypt"] = 3073] = "ArabicEgypt";
        Locale[Locale["ArabicIraq"] = 2049] = "ArabicIraq";
        Locale[Locale["ArabicJordan"] = 11265] = "ArabicJordan";
        Locale[Locale["ArabicKuwait"] = 13313] = "ArabicKuwait";
        Locale[Locale["ArabicLebanon"] = 12289] = "ArabicLebanon";
        Locale[Locale["ArabicLibya"] = 4097] = "ArabicLibya";
        Locale[Locale["ArabicMorocco"] = 6145] = "ArabicMorocco";
        Locale[Locale["ArabicOman"] = 8193] = "ArabicOman";
        Locale[Locale["ArabicQatar"] = 16385] = "ArabicQatar";
        Locale[Locale["ArabicSyria"] = 10241] = "ArabicSyria";
        Locale[Locale["ArabicTunisia"] = 7169] = "ArabicTunisia";
        Locale[Locale["ArabicUAE"] = 14337] = "ArabicUAE";
        Locale[Locale["ArabicYemen"] = 9217] = "ArabicYemen";
        Locale[Locale["ArmenianArmenia"] = 1067] = "ArmenianArmenia";
        Locale[Locale["Assamese"] = 1101] = "Assamese";
        Locale[Locale["AzeriCyrillic"] = 2092] = "AzeriCyrillic";
        Locale[Locale["AzeriLatin"] = 1068] = "AzeriLatin";
        Locale[Locale["Bashkir"] = 1133] = "Bashkir";
        Locale[Locale["Basque"] = 1069] = "Basque";
        Locale[Locale["Belarusian"] = 1059] = "Belarusian";
        Locale[Locale["BengaliIndia"] = 1093] = "BengaliIndia";
        Locale[Locale["BengaliBangladesh"] = 2117] = "BengaliBangladesh";
        Locale[Locale["BosnianBosniaHerzegovina"] = 5146] = "BosnianBosniaHerzegovina";
        Locale[Locale["Breton"] = 1150] = "Breton";
        Locale[Locale["Bulgarian"] = 1026] = "Bulgarian";
        Locale[Locale["Burmese"] = 1109] = "Burmese";
        Locale[Locale["Catalan"] = 1027] = "Catalan";
        Locale[Locale["CherokeeUnitedStates"] = 1116] = "CherokeeUnitedStates";
        Locale[Locale["ChinesePeoplesRepublicofChina"] = 2052] = "ChinesePeoplesRepublicofChina";
        Locale[Locale["ChineseSingapore"] = 4100] = "ChineseSingapore";
        Locale[Locale["ChineseTaiwan"] = 1028] = "ChineseTaiwan";
        Locale[Locale["ChineseHongKongSAR"] = 3076] = "ChineseHongKongSAR";
        Locale[Locale["ChineseMacaoSAR"] = 5124] = "ChineseMacaoSAR";
        Locale[Locale["Corsican"] = 1155] = "Corsican";
        Locale[Locale["Croatian"] = 1050] = "Croatian";
        Locale[Locale["CroatianBosniaHerzegovina"] = 4122] = "CroatianBosniaHerzegovina";
        Locale[Locale["Czech"] = 1029] = "Czech";
        Locale[Locale["Danish"] = 1030] = "Danish";
        Locale[Locale["Dari"] = 1164] = "Dari";
        Locale[Locale["Divehi"] = 1125] = "Divehi";
        Locale[Locale["DutchNetherlands"] = 1043] = "DutchNetherlands";
        Locale[Locale["DutchBelgium"] = 2067] = "DutchBelgium";
        Locale[Locale["Edo"] = 1126] = "Edo";
        Locale[Locale["EnglishUnitedStates"] = 1033] = "EnglishUnitedStates";
        Locale[Locale["EnglishUnitedKingdom"] = 2057] = "EnglishUnitedKingdom";
        Locale[Locale["EnglishAustralia"] = 3081] = "EnglishAustralia";
        Locale[Locale["EnglishBelize"] = 10249] = "EnglishBelize";
        Locale[Locale["EnglishCanada"] = 4105] = "EnglishCanada";
        Locale[Locale["EnglishCaribbean"] = 9225] = "EnglishCaribbean";
        Locale[Locale["EnglishHongKongSAR"] = 15369] = "EnglishHongKongSAR";
        Locale[Locale["EnglishIndia"] = 16393] = "EnglishIndia";
        Locale[Locale["EnglishIndonesia"] = 14345] = "EnglishIndonesia";
        Locale[Locale["EnglishIreland"] = 6153] = "EnglishIreland";
        Locale[Locale["EnglishJamaica"] = 8201] = "EnglishJamaica";
        Locale[Locale["EnglishMalaysia"] = 17417] = "EnglishMalaysia";
        Locale[Locale["EnglishNewZealand"] = 5129] = "EnglishNewZealand";
        Locale[Locale["EnglishPhilippines"] = 13321] = "EnglishPhilippines";
        Locale[Locale["EnglishSingapore"] = 18441] = "EnglishSingapore";
        Locale[Locale["EnglishSouthAfrica"] = 7177] = "EnglishSouthAfrica";
        Locale[Locale["EnglishTrinidad"] = 11273] = "EnglishTrinidad";
        Locale[Locale["EnglishZimbabwe"] = 12297] = "EnglishZimbabwe";
        Locale[Locale["Estonian"] = 1061] = "Estonian";
        Locale[Locale["Faroese"] = 1080] = "Faroese";
        Locale[Locale["Farsi"] = 1065] = "Farsi";
        Locale[Locale["Filipino"] = 1124] = "Filipino";
        Locale[Locale["Finnish"] = 1035] = "Finnish";
        Locale[Locale["FrenchFrance"] = 1036] = "FrenchFrance";
        Locale[Locale["FrenchBelgium"] = 2060] = "FrenchBelgium";
        Locale[Locale["FrenchCameroon"] = 11276] = "FrenchCameroon";
        Locale[Locale["FrenchCanada"] = 3084] = "FrenchCanada";
        Locale[Locale["FrenchDemocraticRepofCongo"] = 9228] = "FrenchDemocraticRepofCongo";
        Locale[Locale["FrenchCotedIvoire"] = 12300] = "FrenchCotedIvoire";
        Locale[Locale["FrenchHaiti"] = 15372] = "FrenchHaiti";
        Locale[Locale["FrenchLuxembourg"] = 5132] = "FrenchLuxembourg";
        Locale[Locale["FrenchMali"] = 13324] = "FrenchMali";
        Locale[Locale["FrenchMonaco"] = 6156] = "FrenchMonaco";
        Locale[Locale["FrenchMorocco"] = 14348] = "FrenchMorocco";
        Locale[Locale["FrenchNorthAfrica"] = 58380] = "FrenchNorthAfrica";
        Locale[Locale["FrenchReunion"] = 8204] = "FrenchReunion";
        Locale[Locale["FrenchSenegal"] = 10252] = "FrenchSenegal";
        Locale[Locale["FrenchSwitzerland"] = 4108] = "FrenchSwitzerland";
        Locale[Locale["FrenchWestIndies"] = 7180] = "FrenchWestIndies";
        Locale[Locale["FrisianNetherlands"] = 1122] = "FrisianNetherlands";
        Locale[Locale["FulfuldeNigeria"] = 1127] = "FulfuldeNigeria";
        Locale[Locale["FYROMacedonian"] = 1071] = "FYROMacedonian";
        Locale[Locale["Galician"] = 1110] = "Galician";
        Locale[Locale["Georgian"] = 1079] = "Georgian";
        Locale[Locale["GermanGermany"] = 1031] = "GermanGermany";
        Locale[Locale["GermanAustria"] = 3079] = "GermanAustria";
        Locale[Locale["GermanLiechtenstein"] = 5127] = "GermanLiechtenstein";
        Locale[Locale["GermanLuxembourg"] = 4103] = "GermanLuxembourg";
        Locale[Locale["GermanSwitzerland"] = 2055] = "GermanSwitzerland";
        Locale[Locale["Greek"] = 1032] = "Greek";
        Locale[Locale["Greenlandic"] = 1135] = "Greenlandic";
        Locale[Locale["GuaraniParaguay"] = 1140] = "GuaraniParaguay";
        Locale[Locale["Gujarati"] = 1095] = "Gujarati";
        Locale[Locale["HausaNigeria"] = 1128] = "HausaNigeria";
        Locale[Locale["HawaiianUnitedStates"] = 1141] = "HawaiianUnitedStates";
        Locale[Locale["Hebrew"] = 1037] = "Hebrew";
        Locale[Locale["Hindi"] = 1081] = "Hindi";
        Locale[Locale["Hungarian"] = 1038] = "Hungarian";
        Locale[Locale["IbibioNigeria"] = 1129] = "IbibioNigeria";
        Locale[Locale["Icelandic"] = 1039] = "Icelandic";
        Locale[Locale["IgboNigeria"] = 1136] = "IgboNigeria";
        Locale[Locale["Indonesian"] = 1057] = "Indonesian";
        Locale[Locale["Inuktitut"] = 1117] = "Inuktitut";
        Locale[Locale["Irish"] = 2108] = "Irish";
        Locale[Locale["ItalianItaly"] = 1040] = "ItalianItaly";
        Locale[Locale["ItalianSwitzerland"] = 2064] = "ItalianSwitzerland";
        Locale[Locale["Japanese"] = 1041] = "Japanese";
        Locale[Locale["Kiche"] = 1158] = "Kiche";
        Locale[Locale["Kannada"] = 1099] = "Kannada";
        Locale[Locale["KanuriNigeria"] = 1137] = "KanuriNigeria";
        Locale[Locale["Kashmiri"] = 2144] = "Kashmiri";
        Locale[Locale["KashmiriArabic"] = 1120] = "KashmiriArabic";
        Locale[Locale["Kazakh"] = 1087] = "Kazakh";
        Locale[Locale["Khmer"] = 1107] = "Khmer";
        Locale[Locale["Kinyarwanda"] = 1159] = "Kinyarwanda";
        Locale[Locale["Konkani"] = 1111] = "Konkani";
        Locale[Locale["Korean"] = 1042] = "Korean";
        Locale[Locale["KyrgyzCyrillic"] = 1088] = "KyrgyzCyrillic";
        Locale[Locale["Lao"] = 1108] = "Lao";
        Locale[Locale["Latin"] = 1142] = "Latin";
        Locale[Locale["Latvian"] = 1062] = "Latvian";
        Locale[Locale["Lithuanian"] = 1063] = "Lithuanian";
        Locale[Locale["Luxembourgish"] = 1134] = "Luxembourgish";
        Locale[Locale["MalayMalaysia"] = 1086] = "MalayMalaysia";
        Locale[Locale["MalayBruneiDarussalam"] = 2110] = "MalayBruneiDarussalam";
        Locale[Locale["Malayalam"] = 1100] = "Malayalam";
        Locale[Locale["Maltese"] = 1082] = "Maltese";
        Locale[Locale["Manipuri"] = 1112] = "Manipuri";
        Locale[Locale["MaoriNewZealand"] = 1153] = "MaoriNewZealand";
        Locale[Locale["Mapudungun"] = 1146] = "Mapudungun";
        Locale[Locale["Marathi"] = 1102] = "Marathi";
        Locale[Locale["Mohawk"] = 1148] = "Mohawk";
        Locale[Locale["MongolianCyrillic"] = 1104] = "MongolianCyrillic";
        Locale[Locale["MongolianMongolian"] = 2128] = "MongolianMongolian";
        Locale[Locale["Nepali"] = 1121] = "Nepali";
        Locale[Locale["NepaliIndia"] = 2145] = "NepaliIndia";
        Locale[Locale["NorwegianBokmål"] = 1044] = "NorwegianBokmål";
        Locale[Locale["NorwegianNynorsk"] = 2068] = "NorwegianNynorsk";
        Locale[Locale["Occitan"] = 1154] = "Occitan";
        Locale[Locale["Oriya"] = 1096] = "Oriya";
        Locale[Locale["Oromo"] = 1138] = "Oromo";
        Locale[Locale["Papiamentu"] = 1145] = "Papiamentu";
        Locale[Locale["Pashto"] = 1123] = "Pashto";
        Locale[Locale["Polish"] = 1045] = "Polish";
        Locale[Locale["PortugueseBrazil"] = 1046] = "PortugueseBrazil";
        Locale[Locale["PortuguesePortugal"] = 2070] = "PortuguesePortugal";
        Locale[Locale["Punjabi"] = 1094] = "Punjabi";
        Locale[Locale["PunjabiPakistan"] = 2118] = "PunjabiPakistan";
        Locale[Locale["QuechaBolivia"] = 1131] = "QuechaBolivia";
        Locale[Locale["QuechaEcuador"] = 2155] = "QuechaEcuador";
        Locale[Locale["QuechaPeru"] = 3179] = "QuechaPeru";
        Locale[Locale["RhaetoRomanic"] = 1047] = "RhaetoRomanic";
        Locale[Locale["Romanian"] = 1048] = "Romanian";
        Locale[Locale["RomanianMoldava"] = 2072] = "RomanianMoldava";
        Locale[Locale["Russian"] = 1049] = "Russian";
        Locale[Locale["RussianMoldava"] = 2073] = "RussianMoldava";
        Locale[Locale["SamiLappish"] = 1083] = "SamiLappish";
        Locale[Locale["Sanskrit"] = 1103] = "Sanskrit";
        Locale[Locale["ScottishGaelic"] = 1084] = "ScottishGaelic";
        Locale[Locale["Sepedi"] = 1132] = "Sepedi";
        Locale[Locale["SerbianCyrillic"] = 3098] = "SerbianCyrillic";
        Locale[Locale["SerbianLatin"] = 2074] = "SerbianLatin";
        Locale[Locale["SindhiIndia"] = 1113] = "SindhiIndia";
        Locale[Locale["SindhiPakistan"] = 2137] = "SindhiPakistan";
        Locale[Locale["SinhaleseSriLanka"] = 1115] = "SinhaleseSriLanka";
        Locale[Locale["Slovak"] = 1051] = "Slovak";
        Locale[Locale["Slovenian"] = 1060] = "Slovenian";
        Locale[Locale["Somali"] = 1143] = "Somali";
        Locale[Locale["Sorbian"] = 1070] = "Sorbian";
        Locale[Locale["SpanishSpainModernSort"] = 3082] = "SpanishSpainModernSort";
        Locale[Locale["SpanishSpainTraditionalSort"] = 1034] = "SpanishSpainTraditionalSort";
        Locale[Locale["SpanishArgentina"] = 11274] = "SpanishArgentina";
        Locale[Locale["SpanishBolivia"] = 16394] = "SpanishBolivia";
        Locale[Locale["SpanishChile"] = 13322] = "SpanishChile";
        Locale[Locale["SpanishColombia"] = 9226] = "SpanishColombia";
        Locale[Locale["SpanishCostaRica"] = 5130] = "SpanishCostaRica";
        Locale[Locale["SpanishDominicanRepublic"] = 7178] = "SpanishDominicanRepublic";
        Locale[Locale["SpanishEcuador"] = 12298] = "SpanishEcuador";
        Locale[Locale["SpanishElSalvador"] = 17418] = "SpanishElSalvador";
        Locale[Locale["SpanishGuatemala"] = 4106] = "SpanishGuatemala";
        Locale[Locale["SpanishHonduras"] = 18442] = "SpanishHonduras";
        Locale[Locale["SpanishLatinAmerica"] = 22538] = "SpanishLatinAmerica";
        Locale[Locale["SpanishMexico"] = 2058] = "SpanishMexico";
        Locale[Locale["SpanishNicaragua"] = 19466] = "SpanishNicaragua";
        Locale[Locale["SpanishPanama"] = 6154] = "SpanishPanama";
        Locale[Locale["SpanishParaguay"] = 15370] = "SpanishParaguay";
        Locale[Locale["SpanishPeru"] = 10250] = "SpanishPeru";
        Locale[Locale["SpanishPuertoRico"] = 20490] = "SpanishPuertoRico";
        Locale[Locale["SpanishUnitedStates"] = 21514] = "SpanishUnitedStates";
        Locale[Locale["SpanishUruguay"] = 14346] = "SpanishUruguay";
        Locale[Locale["SpanishVenezuela"] = 8202] = "SpanishVenezuela";
        Locale[Locale["Sutu"] = 1072] = "Sutu";
        Locale[Locale["Swahili"] = 1089] = "Swahili";
        Locale[Locale["Swedish"] = 1053] = "Swedish";
        Locale[Locale["SwedishFinland"] = 2077] = "SwedishFinland";
        Locale[Locale["Syriac"] = 1114] = "Syriac";
        Locale[Locale["Tajik"] = 1064] = "Tajik";
        Locale[Locale["TamazightArabic"] = 1119] = "TamazightArabic";
        Locale[Locale["TamazightLatin"] = 2143] = "TamazightLatin";
        Locale[Locale["Tamil"] = 1097] = "Tamil";
        Locale[Locale["Tatar"] = 1092] = "Tatar";
        Locale[Locale["Telugu"] = 1098] = "Telugu";
        Locale[Locale["Thai"] = 1054] = "Thai";
        Locale[Locale["TibetanBhutan"] = 2129] = "TibetanBhutan";
        Locale[Locale["TibetanPeoplesRepublicofChina"] = 1105] = "TibetanPeoplesRepublicofChina";
        Locale[Locale["TigrignaEritrea"] = 2163] = "TigrignaEritrea";
        Locale[Locale["TigrignaEthiopia"] = 1139] = "TigrignaEthiopia";
        Locale[Locale["Tsonga"] = 1073] = "Tsonga";
        Locale[Locale["Tswana"] = 1074] = "Tswana";
        Locale[Locale["Turkish"] = 1055] = "Turkish";
        Locale[Locale["Turkmen"] = 1090] = "Turkmen";
        Locale[Locale["UighurChina"] = 1152] = "UighurChina";
        Locale[Locale["Ukrainian"] = 1058] = "Ukrainian";
        Locale[Locale["Urdu"] = 1056] = "Urdu";
        Locale[Locale["UrduIndia"] = 2080] = "UrduIndia";
        Locale[Locale["UzbekCyrillic"] = 2115] = "UzbekCyrillic";
        Locale[Locale["UzbekLatin"] = 1091] = "UzbekLatin";
        Locale[Locale["Venda"] = 1075] = "Venda";
        Locale[Locale["Vietnamese"] = 1066] = "Vietnamese";
        Locale[Locale["Welsh"] = 1106] = "Welsh";
        Locale[Locale["Wolof"] = 1160] = "Wolof";
        Locale[Locale["Xhosa"] = 1076] = "Xhosa";
        Locale[Locale["Yakut"] = 1157] = "Yakut";
        Locale[Locale["Yi"] = 1144] = "Yi";
        Locale[Locale["Yiddish"] = 1085] = "Yiddish";
        Locale[Locale["Yoruba"] = 1130] = "Yoruba";
        Locale[Locale["Zulu"] = 1077] = "Zulu";
        Locale[Locale["HIDHumanInterfaceDevice"] = 1279] = "HIDHumanInterfaceDevice";
    })(exports.Locale || (exports.Locale = {}));
    var Locale = exports.Locale;
});

},{}],49:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./Util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Util_1 = require("./Util");
    var PnPClientStorageWrapper = (function () {
        function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
            this.store = store;
            this.defaultTimeoutMinutes = defaultTimeoutMinutes;
            this.defaultTimeoutMinutes = (defaultTimeoutMinutes === void 0) ? 5 : defaultTimeoutMinutes;
            this.enabled = this.test();
        }
        PnPClientStorageWrapper.prototype.get = function (key) {
            if (!this.enabled) {
                return null;
            }
            var o = this.store.getItem(key);
            if (o == null) {
                return o;
            }
            var persistable = JSON.parse(o);
            if (new Date(persistable.expiration) <= new Date()) {
                this.delete(key);
                return null;
            }
            else {
                return persistable.value;
            }
        };
        PnPClientStorageWrapper.prototype.put = function (key, o, expire) {
            if (this.enabled) {
                this.store.setItem(key, this.createPersistable(o, expire));
            }
        };
        PnPClientStorageWrapper.prototype.delete = function (key) {
            if (this.enabled) {
                this.store.removeItem(key);
            }
        };
        PnPClientStorageWrapper.prototype.getOrPut = function (key, getter, expire) {
            var _this = this;
            if (!this.enabled) {
                return getter();
            }
            if (!Util_1.Util.isFunction(getter)) {
                throw "Function expected for parameter 'getter'.";
            }
            return new Promise(function (resolve, reject) {
                var o = _this.get(key);
                if (o == null) {
                    getter().then(function (d) {
                        _this.put(key, d);
                        resolve(d);
                    });
                }
                else {
                    resolve(o);
                }
            });
        };
        PnPClientStorageWrapper.prototype.test = function () {
            var str = "test";
            try {
                this.store.setItem(str, str);
                this.store.removeItem(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        PnPClientStorageWrapper.prototype.createPersistable = function (o, expire) {
            if (typeof expire === "undefined") {
                expire = Util_1.Util.dateAdd(new Date(), "minute", this.defaultTimeoutMinutes);
            }
            return JSON.stringify({ expiration: expire, value: o });
        };
        return PnPClientStorageWrapper;
    }());
    exports.PnPClientStorageWrapper = PnPClientStorageWrapper;
    var PnPClientStorage = (function () {
        function PnPClientStorage() {
            this.local = typeof localStorage !== "undefined" ? new PnPClientStorageWrapper(localStorage) : null;
            this.session = typeof sessionStorage !== "undefined" ? new PnPClientStorageWrapper(sessionStorage) : null;
        }
        return PnPClientStorage;
    }());
    exports.PnPClientStorage = PnPClientStorage;
});

},{"./Util":50}],50:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Util = (function () {
        function Util() {
        }
        Util.getCtxCallback = function (context, method) {
            var params = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                params[_i - 2] = arguments[_i];
            }
            return function () {
                method.apply(context, params);
            };
        };
        Util.urlParamExists = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            return regex.test(location.search);
        };
        Util.getUrlParamByName = function (name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        };
        Util.getUrlParamBoolByName = function (name) {
            var p = this.getUrlParamByName(name);
            var isFalse = (p === "" || /false|0/i.test(p));
            return !isFalse;
        };
        Util.stringInsert = function (target, index, s) {
            if (index > 0) {
                return target.substring(0, index) + s + target.substring(index, target.length);
            }
            return s + target;
        };
        Util.dateAdd = function (date, interval, units) {
            var ret = new Date(date.toLocaleString());
            switch (interval.toLowerCase()) {
                case "year":
                    ret.setFullYear(ret.getFullYear() + units);
                    break;
                case "quarter":
                    ret.setMonth(ret.getMonth() + 3 * units);
                    break;
                case "month":
                    ret.setMonth(ret.getMonth() + units);
                    break;
                case "week":
                    ret.setDate(ret.getDate() + 7 * units);
                    break;
                case "day":
                    ret.setDate(ret.getDate() + units);
                    break;
                case "hour":
                    ret.setTime(ret.getTime() + units * 3600000);
                    break;
                case "minute":
                    ret.setTime(ret.getTime() + units * 60000);
                    break;
                case "second":
                    ret.setTime(ret.getTime() + units * 1000);
                    break;
                default:
                    ret = undefined;
                    break;
            }
            return ret;
        };
        Util.loadStylesheet = function (path, avoidCache) {
            if (avoidCache) {
                path += "?" + encodeURIComponent((new Date()).getTime().toString());
            }
            var head = document.getElementsByTagName("head");
            if (head.length > 1) {
                var e = document.createElement("link");
                head[0].appendChild(e);
                e.setAttribute("type", "text/css");
                e.setAttribute("rel", "stylesheet");
                e.setAttribute("href", path);
            }
        };
        Util.combinePaths = function () {
            var paths = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                paths[_i - 0] = arguments[_i];
            }
            var parts = [];
            for (var i = 0; i < paths.length; i++) {
                if (typeof paths[i] !== "undefined" && paths[i] !== null) {
                    parts.push(paths[i].replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, ""));
                }
            }
            return parts.join("/").replace(/\\/, "/");
        };
        Util.getRandomString = function (chars) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < chars; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
        Util.getGUID = function () {
            var d = new Date().getTime();
            var guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return guid;
        };
        Util.isFunction = function (candidateFunction) {
            return typeof candidateFunction === "function";
        };
        Util.stringIsNullOrEmpty = function (s) {
            return typeof s === "undefined" || s === null || s === "";
        };
        Util.extend = function (target, source, noOverwrite) {
            if (noOverwrite === void 0) { noOverwrite = false; }
            var result = {};
            for (var id in target) {
                result[id] = target[id];
            }
            var check = noOverwrite ? function (o, i) { return !o.hasOwnProperty(i); } : function (o, i) { return true; };
            for (var id in source) {
                if (check(result, id)) {
                    result[id] = source[id];
                }
            }
            return result;
        };
        Util.applyMixins = function (derivedCtor) {
            var baseCtors = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                baseCtors[_i - 1] = arguments[_i];
            }
            baseCtors.forEach(function (baseCtor) {
                Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
                    derivedCtor.prototype[name] = baseCtor.prototype[name];
                });
            });
        };
        Util.isUrlAbsolute = function (url) {
            return /^https?:\/\/|^\/\//i.test(url);
        };
        return Util;
    }());
    exports.Util = Util;
});

},{}],51:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./util"], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require("./util");
    function stringIsNullOrEmpty(value, parameterName) {
        if (util_1.Util.stringIsNullOrEmpty(value)) {
            throw "Parameter '" + parameterName + "' cannot be null or empty.";
        }
    }
    exports.stringIsNullOrEmpty = stringIsNullOrEmpty;
    function objectIsNull(value, parameterName) {
        if (typeof value === "undefined" || value === null) {
            throw "Parameter '" + parameterName + "' cannot be null.";
        }
    }
    exports.objectIsNull = objectIsNull;
});

},{"./util":55}],52:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function readBlobAsText(blob) {
        return readBlobAs(blob, "string");
    }
    exports.readBlobAsText = readBlobAsText;
    function readBlobAsArrayBuffer(blob) {
        return readBlobAs(blob, "buffer");
    }
    exports.readBlobAsArrayBuffer = readBlobAsArrayBuffer;
    function readBlobAs(blob, mode) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            switch (mode) {
                case "string":
                    reader.readAsText(blob);
                    break;
                case "buffer":
                    reader.readAsArrayBuffer(blob);
                    break;
            }
        });
    }
});

},{}],53:[function(require,module,exports){
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", "./args"], factory);
    }
})(function (require, exports) {
    "use strict";
    var Args = require("./args");
    var Logger = (function () {
        function Logger() {
        }
        Object.defineProperty(Logger, "activeLogLevel", {
            get: function () {
                return Logger.instance.activeLogLevel;
            },
            set: function (value) {
                Logger.instance.activeLogLevel = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Logger, "instance", {
            get: function () {
                if (typeof Logger._instance === "undefined" || Logger._instance === null) {
                    Logger._instance = new LoggerImpl();
                }
                return Logger._instance;
            },
            enumerable: true,
            configurable: true
        });
        Logger.subscribe = function () {
            var listeners = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                listeners[_i - 0] = arguments[_i];
            }
            for (var i = 0; i < listeners.length; i++) {
                Logger.instance.subscribe(listeners[i]);
            }
        };
        Logger.clearSubscribers = function () {
            return Logger.instance.clearSubscribers();
        };
        Object.defineProperty(Logger, "count", {
            get: function () {
                return Logger.instance.count;
            },
            enumerable: true,
            configurable: true
        });
        Logger.write = function (message, level) {
            if (level === void 0) { level = Logger.LogLevel.Verbose; }
            Logger.instance.log({ level: level, message: message });
        };
        Logger.log = function (entry) {
            Logger.instance.log(entry);
        };
        Logger.measure = function (name, f) {
            return Logger.instance.measure(name, f);
        };
        return Logger;
    }());
    exports.Logger = Logger;
    var LoggerImpl = (function () {
        function LoggerImpl(activeLogLevel, subscribers) {
            if (activeLogLevel === void 0) { activeLogLevel = Logger.LogLevel.Warning; }
            if (subscribers === void 0) { subscribers = []; }
            this.activeLogLevel = activeLogLevel;
            this.subscribers = subscribers;
        }
        LoggerImpl.prototype.subscribe = function (listener) {
            Args.objectIsNull(listener, "listener");
            this.subscribers.push(listener);
        };
        LoggerImpl.prototype.clearSubscribers = function () {
            var s = this.subscribers.slice(0);
            this.subscribers.length = 0;
            return s;
        };
        Object.defineProperty(LoggerImpl.prototype, "count", {
            get: function () {
                return this.subscribers.length;
            },
            enumerable: true,
            configurable: true
        });
        LoggerImpl.prototype.write = function (message, level) {
            if (level === void 0) { level = Logger.LogLevel.Verbose; }
            this.log({ level: level, message: message });
        };
        LoggerImpl.prototype.log = function (entry) {
            Args.objectIsNull(entry, "entry");
            if (entry.level < this.activeLogLevel) {
                return;
            }
            for (var i = 0; i < this.subscribers.length; i++) {
                this.subscribers[i].log(entry);
            }
        };
        LoggerImpl.prototype.measure = function (name, f) {
            console.profile(name);
            try {
                return f();
            }
            finally {
                console.profileEnd();
            }
        };
        return LoggerImpl;
    }());
    var Logger;
    (function (Logger) {
        (function (LogLevel) {
            LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
            LogLevel[LogLevel["Info"] = 1] = "Info";
            LogLevel[LogLevel["Warning"] = 2] = "Warning";
            LogLevel[LogLevel["Error"] = 3] = "Error";
            LogLevel[LogLevel["Off"] = 99] = "Off";
        })(Logger.LogLevel || (Logger.LogLevel = {}));
        var LogLevel = Logger.LogLevel;
        var ConsoleListener = (function () {
            function ConsoleListener() {
            }
            ConsoleListener.prototype.log = function (entry) {
                var msg = this.format(entry);
                switch (entry.level) {
                    case LogLevel.Verbose:
                    case LogLevel.Info:
                        console.log(msg);
                        break;
                    case LogLevel.Warning:
                        console.warn(msg);
                        break;
                    case LogLevel.Error:
                        console.error(msg);
                        break;
                }
            };
            ConsoleListener.prototype.format = function (entry) {
                return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
            };
            return ConsoleListener;
        }());
        Logger.ConsoleListener = ConsoleListener;
        var AzureInsightsListener = (function () {
            function AzureInsightsListener(azureInsightsInstrumentationKey) {
                this.azureInsightsInstrumentationKey = azureInsightsInstrumentationKey;
                Args.stringIsNullOrEmpty(azureInsightsInstrumentationKey, "azureInsightsInstrumentationKey");
                var appInsights = window["appInsights"] || function (config) {
                    function r(config) {
                        t[config] = function () {
                            var i = arguments;
                            t.queue.push(function () { t[config].apply(t, i); });
                        };
                    }
                    var t = { config: config }, u = document, e = window, o = "script", s = u.createElement(o), i, f;
                    for (s.src = config.url || "//az416426.vo.msecnd.net/scripts/a/ai.0.js", u.getElementsByTagName(o)[0].parentNode.appendChild(s), t.cookie = u.cookie, t.queue = [], i = ["Event", "Exception", "Metric", "PageView", "Trace"]; i.length;) {
                        r("track" + i.pop());
                    }
                    return r("setAuthenticatedUserContext"), r("clearAuthenticatedUserContext"), config.disableExceptionTracking || (i = "onerror", r("_" + i), f = e[i], e[i] = function (config, r, u, e, o) {
                        var s = f && f(config, r, u, e, o);
                        return s !== !0 && t["_" + i](config, r, u, e, o), s;
                    }), t;
                }({
                    instrumentationKey: this.azureInsightsInstrumentationKey
                });
                window["appInsights"] = appInsights;
            }
            AzureInsightsListener.prototype.log = function (entry) {
                var ai = window["appInsights"];
                var msg = this.format(entry);
                if (entry.level === LogLevel.Error) {
                    ai.trackException(msg);
                }
                else {
                    ai.trackEvent(msg);
                }
            };
            AzureInsightsListener.prototype.format = function (entry) {
                return "Message: " + entry.message + ". Data: " + JSON.stringify(entry.data);
            };
            return AzureInsightsListener;
        }());
        Logger.AzureInsightsListener = AzureInsightsListener;
        var FunctionListener = (function () {
            function FunctionListener(method) {
                this.method = method;
            }
            FunctionListener.prototype.log = function (entry) {
                this.method(entry);
            };
            return FunctionListener;
        }());
        Logger.FunctionListener = FunctionListener;
    })(Logger = exports.Logger || (exports.Logger = {}));
});

},{"./args":51}],54:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"./Util":50,"dup":49}],55:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}]},{},[46])(46)
});