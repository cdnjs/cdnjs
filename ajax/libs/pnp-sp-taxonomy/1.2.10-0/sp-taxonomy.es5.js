/**
 * @license
 * v1.2.10-0
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { ClientSvcQueryable, MethodParams, property, setProperty, method, objConstructor, objectPath, objectProperties, opQuery, ObjectPathBatch, staticMethod } from '@pnp/sp-clientsvc';
import { stringIsNullOrEmpty, extend, sanitizeGuid, getGUID, objectDefinedNotNull } from '@pnp/common';
import { sp } from '@pnp/sp';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

/**
 * Represents a collection of labels
 */
var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels(parent, _objectPaths) {
        if (parent === void 0) { parent = ""; }
        if (_objectPaths === void 0) { _objectPaths = null; }
        var _this = _super.call(this, parent, _objectPaths) || this;
        _this._objectPaths.add(property("Labels"));
        return _this;
    }
    /**
     * Gets a label from the collection by its value
     *
     * @param value The value to retrieve
     */
    Labels.prototype.getByValue = function (value) {
        var params = MethodParams.build().string(value);
        return this.getChild(Label, "GetByValue", params);
    };
    /**
     * Loads the data and merges with with the ILabel instances
     */
    Labels.prototype.get = function () {
        var _this = this;
        return this.sendGetCollection(function (d) {
            if (!stringIsNullOrEmpty(d.Value)) {
                return _this.getByValue(d.Value);
            }
            throw Error("Could not find Value in Labels.get(). You must include at least one of these in your select fields.");
        });
    };
    return Labels;
}(ClientSvcQueryable));
/**
 * Represents a label instance
 */
var Label = /** @class */ (function (_super) {
    __extends(Label, _super);
    function Label() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the data for this Label
     */
    Label.prototype.get = function () {
        return this.sendGet(Label);
    };
    /**
     * Sets this label as the default
     */
    Label.prototype.setAsDefaultForLanguage = function () {
        return this.invokeNonQuery("SetAsDefaultForLanguage");
    };
    /**
     * Deletes this label
     */
    Label.prototype.delete = function () {
        return this.invokeNonQuery("DeleteObject");
    };
    return Label;
}(ClientSvcQueryable));

var Terms = /** @class */ (function (_super) {
    __extends(Terms, _super);
    function Terms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the terms in this collection
     */
    Terms.prototype.get = function () {
        var _this = this;
        return this.sendGetCollection(function (d) {
            if (!stringIsNullOrEmpty(d.Name)) {
                return _this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return _this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in Terms.get(). You must include at least one of these in your select fields.");
        });
    };
    /**
     * Gets a term by id
     *
     * @param id The id of the term
     */
    Terms.prototype.getById = function (id) {
        var params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(Term, "GetById", params);
    };
    /**
     * Gets a term by name
     *
     * @param name Term name
     */
    Terms.prototype.getByName = function (name) {
        var params = MethodParams.build()
            .string(name);
        return this.getChild(Term, "GetByName", params);
    };
    return Terms;
}(ClientSvcQueryable));
/**
 * Represents the operations available on a given term
 */
var Term = /** @class */ (function (_super) {
    __extends(Term, _super);
    function Term() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Term.prototype.addTerm = function (name, lcid, isAvailableForTagging, id) {
        var _this = this;
        if (isAvailableForTagging === void 0) { isAvailableForTagging = true; }
        if (id === void 0) { id = getGUID(); }
        var params = MethodParams.build()
            .string(name)
            .number(lcid)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateTerm", params, setProperty("IsAvailableForTagging", "Boolean", "" + isAvailableForTagging))
            .then(function (r) { return extend(_this.termSet.getTermById(r.Id), r); });
    };
    Object.defineProperty(Term.prototype, "terms", {
        get: function () {
            return this.getChildProperty(Terms, "Terms");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "labels", {
        get: function () {
            return new Labels(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "parent", {
        get: function () {
            return this.getChildProperty(Term, "Parent");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "pinSourceTermSet", {
        get: function () {
            return this.getChildProperty(TermSet, "PinSourceTermSet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "reusedTerms", {
        get: function () {
            return this.getChildProperty(Terms, "ReusedTerms");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "sourceTerm", {
        get: function () {
            return this.getChildProperty(Term, "SourceTerm");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "termSet", {
        get: function () {
            return this.getChildProperty(TermSet, "TermSet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Term.prototype, "termSets", {
        get: function () {
            return this.getChildProperty(TermSets, "TermSets");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Creates a new label for this Term
     *
     * @param name label value
     * @param lcid language code
     * @param isDefault Is the default label
     */
    Term.prototype.createLabel = function (name, lcid, isDefault) {
        var _this = this;
        if (isDefault === void 0) { isDefault = false; }
        var params = MethodParams.build()
            .string(name)
            .number(lcid)
            .boolean(isDefault);
        this._useCaching = false;
        return this.invokeMethod("CreateLabel", params)
            .then(function (r) { return extend(_this.labels.getByValue(name), r); });
    };
    /**
     * Sets the deprecation flag on a term
     *
     * @param doDeprecate New value for the deprecation flag
     */
    Term.prototype.deprecate = function (doDeprecate) {
        var params = MethodParams.build().boolean(doDeprecate);
        return this.invokeNonQuery("Deprecate", params);
    };
    /**
     * Loads the term data
     */
    Term.prototype.get = function () {
        return this.sendGet(Term);
    };
    /**
     * Gets the appropriate description for a term
     *
     * @param lcid Language code
     */
    Term.prototype.getDescription = function (lcid) {
        var params = MethodParams.build().number(lcid);
        return this.invokeMethodAction("GetDescription", params);
    };
    /**
     * Sets the description
     *
     * @param description Term description
     * @param lcid Language code
     */
    Term.prototype.setDescription = function (description, lcid) {
        var params = MethodParams.build().string(description).number(lcid);
        return this.invokeNonQuery("SetDescription", params);
    };
    /**
     * Sets a custom property on this term
     *
     * @param name Property name
     * @param value Property value
     */
    Term.prototype.setLocalCustomProperty = function (name, value) {
        var params = MethodParams.build().string(name).string(value);
        return this.invokeNonQuery("SetLocalCustomProperty", params);
    };
    /**
     * Updates the specified properties of this term, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    Term.prototype.update = function (properties) {
        return this.invokeUpdate(properties, Term);
    };
    return Term;
}(ClientSvcQueryable));

var TermSets = /** @class */ (function (_super) {
    __extends(TermSets, _super);
    function TermSets() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the termsets in this collection
     */
    TermSets.prototype.get = function () {
        var _this = this;
        return this.sendGetCollection(function (d) {
            if (!stringIsNullOrEmpty(d.Name)) {
                return _this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return _this.getById(d.Id);
            }
            throw Error("Could not find Value in Labels.get(). You must include at least one of these in your select fields.");
        });
    };
    /**
     * Gets a TermSet from this collection by id
     *
     * @param id TermSet id
     */
    TermSets.prototype.getById = function (id) {
        var params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermSet, "GetById", params);
    };
    /**
     * Gets a TermSet from this collection by name
     *
     * @param name TermSet name
     */
    TermSets.prototype.getByName = function (name) {
        var params = MethodParams.build()
            .string(name);
        return this.getChild(TermSet, "GetByName", params);
    };
    return TermSets;
}(ClientSvcQueryable));
var TermSet = /** @class */ (function (_super) {
    __extends(TermSet, _super);
    function TermSet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TermSet.prototype, "group", {
        /**
         * Gets the group containing this Term set
         */
        get: function () {
            return this.getChildProperty(TermGroup, "Group");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermSet.prototype, "terms", {
        /**
         * Access all the terms in this termset
         */
        get: function () {
            return this.getChild(Terms, "GetAllTerms", null);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a stakeholder to the TermSet
     *
     * @param stakeholderName The login name of the user to be added as a stakeholder
     */
    TermSet.prototype.addStakeholder = function (stakeholderName) {
        var params = MethodParams.build()
            .string(stakeholderName);
        return this.invokeNonQuery("DeleteStakeholder", params);
    };
    /**
     * Deletes a stakeholder to the TermSet
     *
     * @param stakeholderName The login name of the user to be added as a stakeholder
     */
    TermSet.prototype.deleteStakeholder = function (stakeholderName) {
        var params = MethodParams.build()
            .string(stakeholderName);
        return this.invokeNonQuery("AddStakeholder", params);
    };
    /**
     * Gets the data for this TermSet
     */
    TermSet.prototype.get = function () {
        return this.sendGet(TermSet);
    };
    /**
     * Get a term by id
     *
     * @param id Term id
     */
    TermSet.prototype.getTermById = function (id) {
        var params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(Term, "GetTerm", params);
    };
    /**
     * Adds a term to this term set
     *
     * @param name Name for the term
     * @param lcid Language code
     * @param isAvailableForTagging set tagging availability (default: true)
     * @param id GUID id for the term (optional)
     */
    TermSet.prototype.addTerm = function (name, lcid, isAvailableForTagging, id) {
        var _this = this;
        if (isAvailableForTagging === void 0) { isAvailableForTagging = true; }
        if (id === void 0) { id = getGUID(); }
        var params = MethodParams.build()
            .string(name)
            .number(lcid)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateTerm", params, setProperty("IsAvailableForTagging", "Boolean", "" + isAvailableForTagging))
            .then(function (r) { return extend(_this.getTermById(r.Id), r); });
    };
    /**
     * Copies this term set immediately
     */
    TermSet.prototype.copy = function () {
        return this.invokeMethod("Copy", null);
    };
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    TermSet.prototype.update = function (properties) {
        return this.invokeUpdate(properties, TermSet);
    };
    return TermSet;
}(ClientSvcQueryable));

/**
 * Term Groups collection in Term Store
 */
var TermGroups = /** @class */ (function (_super) {
    __extends(TermGroups, _super);
    function TermGroups() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Gets the groups in this collection
     */
    TermGroups.prototype.get = function () {
        var _this = this;
        return this.sendGetCollection(function (d) {
            if (!stringIsNullOrEmpty(d.Name)) {
                return _this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return _this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in TermGroups.get(). You must include at least one of these in your select fields.");
        });
    };
    /**
     * Gets a TermGroup from this collection by id
     *
     * @param id TermGroup id
     */
    TermGroups.prototype.getById = function (id) {
        var params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermGroup, "GetById", params);
    };
    /**
     * Gets a TermGroup from this collection by name
     *
     * @param name TErmGroup name
     */
    TermGroups.prototype.getByName = function (name) {
        var params = MethodParams.build()
            .string(name);
        return this.getChild(TermGroup, "GetByName", params);
    };
    return TermGroups;
}(ClientSvcQueryable));
/**
 * Represents a group in the taxonomy heirarchy
 */
var TermGroup = /** @class */ (function (_super) {
    __extends(TermGroup, _super);
    function TermGroup(parent, _objectPaths) {
        if (parent === void 0) { parent = ""; }
        var _this = _super.call(this, parent, _objectPaths) || this;
        // this should mostly be true
        _this.store = parent instanceof TermStore ? parent : null;
        return _this;
    }
    Object.defineProperty(TermGroup.prototype, "termSets", {
        /**
         * Gets the collection of term sets in this group
         */
        get: function () {
            return this.getChildProperty(TermSets, "TermSets");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Adds a contributor to the Group
     *
     * @param principalName The login name of the user to be added as a contributor
     */
    TermGroup.prototype.addContributor = function (principalName) {
        var params = MethodParams.build().string(principalName);
        return this.invokeNonQuery("AddContributor", params);
    };
    /**
     * Adds a group manager to the Group
     *
     * @param principalName The login name of the user to be added as a group manager
     */
    TermGroup.prototype.addGroupManager = function (principalName) {
        var params = MethodParams.build().string(principalName);
        return this.invokeNonQuery("AddGroupManager", params);
    };
    /**
     * Creates a new TermSet in this Group using the provided language and unique identifier
     *
     * @param name The name of the new TermSet being created
     * @param lcid The language that the new TermSet name is in
     * @param id The unique identifier of the new TermSet being created (optional)
     */
    TermGroup.prototype.createTermSet = function (name, lcid, id) {
        var _this = this;
        if (id === void 0) { id = getGUID(); }
        var params = MethodParams.build()
            .string(name)
            .string(sanitizeGuid(id))
            .number(lcid);
        this._useCaching = false;
        return this.invokeMethod("CreateTermSet", params)
            .then(function (r) { return extend(_this.store.getTermSetById(r.Id), r); });
    };
    /**
     * Gets this term store's data
     */
    TermGroup.prototype.get = function () {
        return this.sendGet(TermGroup);
    };
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    TermGroup.prototype.update = function (properties) {
        return this.invokeUpdate(properties, TermGroup);
    };
    return TermGroup;
}(ClientSvcQueryable));

/**
 * Represents the set of available term stores and the collection methods
 */
var TermStores = /** @class */ (function (_super) {
    __extends(TermStores, _super);
    function TermStores(parent) {
        if (parent === void 0) { parent = ""; }
        var _this = _super.call(this, parent) || this;
        _this._objectPaths.add(property("TermStores", 
        // actions
        objectPath()));
        return _this;
    }
    /**
     * Gets the term stores
     */
    TermStores.prototype.get = function () {
        var _this = this;
        return this.sendGetCollection(function (d) {
            if (!stringIsNullOrEmpty(d.Name)) {
                return _this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return _this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in TermStores.get(). You must include at least one of these in your select fields.");
        });
    };
    /**
     * Returns the TermStore specified by its index name
     *
     * @param name The index name of the TermStore to be returned
     */
    TermStores.prototype.getByName = function (name) {
        return this.getChild(TermStore, "GetByName", MethodParams.build().string(name));
    };
    /**
     * Returns the TermStore specified by its GUID index
     *
     * @param id The GUID index of the TermStore to be returned
     */
    TermStores.prototype.getById = function (id) {
        return this.getChild(TermStore, "GetById", MethodParams.build().string(sanitizeGuid(id)));
    };
    return TermStores;
}(ClientSvcQueryable));
var TermStore = /** @class */ (function (_super) {
    __extends(TermStore, _super);
    function TermStore(parent, _objectPaths) {
        if (parent === void 0) { parent = ""; }
        if (_objectPaths === void 0) { _objectPaths = null; }
        return _super.call(this, parent, _objectPaths) || this;
    }
    Object.defineProperty(TermStore.prototype, "hashTagsTermSet", {
        get: function () {
            return this.getChildProperty(TermSet, "HashTagsTermSet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermStore.prototype, "keywordsTermSet", {
        get: function () {
            return this.getChildProperty(TermSet, "KeywordsTermSet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermStore.prototype, "orphanedTermsTermSet", {
        get: function () {
            return this.getChildProperty(TermSet, "OrphanedTermsTermSet");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermStore.prototype, "systemGroup", {
        get: function () {
            return this.getChildProperty(TermGroup, "SystemGroup");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TermStore.prototype, "groups", {
        get: function () {
            return this.getChildProperty(TermGroups, "Groups");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the term store data
     */
    TermStore.prototype.get = function () {
        return this.sendGet(TermStore);
    };
    /**
     * Gets term sets
     *
     * @param name
     * @param lcid
     */
    TermStore.prototype.getTermSetsByName = function (name, lcid) {
        var params = MethodParams.build()
            .string(name)
            .number(lcid);
        return this.getChild(TermSets, "GetTermSetsByName", params);
    };
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    TermStore.prototype.getTermSetById = function (id) {
        var params = MethodParams.build().string(sanitizeGuid(id));
        return this.getChild(TermSet, "GetTermSet", params);
    };
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    TermStore.prototype.getTermById = function (id) {
        var params = MethodParams.build().string(sanitizeGuid(id));
        return this.getChild(Term, "GetTerm", params);
    };
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    TermStore.prototype.getTermsById = function () {
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        var params = MethodParams.build().strArray(ids.map(function (id) { return sanitizeGuid(id); }));
        return this.getChild(Terms, "GetTermsById", params);
    };
    /**
     * Gets a term from a term set based on the supplied ids
     *
     * @param termId Term Id
     * @param termSetId Termset Id
     */
    TermStore.prototype.getTermInTermSet = function (termId, termSetId) {
        var params = MethodParams.build().string(sanitizeGuid(termId)).string(sanitizeGuid(termSetId));
        return this.getChild(Term, "GetTermInTermSet", params);
    };
    /**
     * This method provides access to a ITermGroup by id
     *
     * @param id The group id
     */
    TermStore.prototype.getTermGroupById = function (id) {
        var params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermGroup, "GetGroup", params);
    };
    /**
     * Gets the terms by the supplied information (see: https://msdn.microsoft.com/en-us/library/hh626704%28v=office.12%29.aspx)
     *
     * @param info
     */
    TermStore.prototype.getTerms = function (info) {
        var objectPaths = this._objectPaths.copy();
        // this will be the parent of the GetTerms call, but we need to create the input param first
        var parentIndex = objectPaths.lastIndex;
        // this is our input object
        var input = objConstructor.apply(void 0, ["{61a1d689-2744-4ea3-a88b-c95bee9803aa}",
            // actions
            objectPath()].concat(objectProperties(info)));
        // add the input object path
        var inputIndex = objectPaths.add(input);
        // this sets up the GetTerms call
        var params = MethodParams.build().objectPath(inputIndex);
        // call the method
        var methodIndex = objectPaths.add(method("GetTerms", params, 
        // actions
        objectPath()));
        // setup the parent relationship even though they are seperated in the collection
        objectPaths.addChildRelationship(parentIndex, methodIndex);
        return new Terms(this, objectPaths);
    };
    /**
     * Gets the site collection group associated with the current site
     *
     * @param createIfMissing If true the group will be created, otherwise null (default: false)
     */
    TermStore.prototype.getSiteCollectionGroup = function (createIfMissing) {
        if (createIfMissing === void 0) { createIfMissing = false; }
        var objectPaths = this._objectPaths.copy();
        var methodParent = objectPaths.lastIndex;
        var siteIndex = objectPaths.siteIndex;
        var params = MethodParams.build().objectPath(siteIndex).boolean(createIfMissing);
        var methodIndex = objectPaths.add(method("GetSiteCollectionGroup", params, 
        // actions
        objectPath()));
        // the parent of this method call is this instance, not the current/site
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return new TermGroup(this, objectPaths);
    };
    /**
     * Adds a working language to the TermStore
     *
     * @param lcid The locale identifier of the working language to add
     */
    TermStore.prototype.addLanguage = function (lcid) {
        var params = MethodParams.build().number(lcid);
        return this.invokeNonQuery("AddLanguage", params);
    };
    /**
     * Creates a new Group in this TermStore
     *
     * @param name The name of the new Group being created
     * @param id The ID (Guid) that the new group should have
     */
    TermStore.prototype.addGroup = function (name, id) {
        var _this = this;
        if (id === void 0) { id = getGUID(); }
        var params = MethodParams.build()
            .string(name)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateGroup", params)
            .then(function (r) { return extend(_this.getTermGroupById(r.Id), r); });
    };
    /**
     * Commits all updates to the database that have occurred since the last commit or rollback
     */
    TermStore.prototype.commitAll = function () {
        return this.invokeNonQuery("CommitAll");
    };
    /**
     * Delete a working language from the TermStore
     *
     * @param lcid locale ID for the language to be deleted
     */
    TermStore.prototype.deleteLanguage = function (lcid) {
        var params = MethodParams.build().number(lcid);
        return this.invokeNonQuery("DeleteLanguage", params);
    };
    /**
     * Discards all updates that have occurred since the last commit or rollback
     */
    TermStore.prototype.rollbackAll = function () {
        return this.invokeNonQuery("RollbackAll");
    };
    /**
     * Updates the cache
     */
    TermStore.prototype.updateCache = function () {
        return this.invokeNonQuery("UpdateCache");
    };
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    TermStore.prototype.update = function (properties) {
        return this.invokeUpdate(properties, TermStore);
    };
    /**
     * This method makes sure that this instance is aware of all child terms that are used in the current site collection
     */
    TermStore.prototype.updateUsedTermsOnSite = function () {
        var objectPaths = this._objectPaths.copy();
        var methodParent = objectPaths.lastIndex;
        var siteIndex = objectPaths.siteIndex;
        var params = MethodParams.build().objectPath(siteIndex);
        var methodIndex = objectPaths.add(method("UpdateUsedTermsOnSite", params));
        // the parent of this method call is this instance, not the current context/site
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return this.send(objectPaths);
    };
    /**
     * Gets a list of changes
     *
     * @param info Lookup information
     */
    TermStore.prototype.getChanges = function (info) {
        var objectPaths = this._objectPaths.copy();
        var methodParent = objectPaths.lastIndex;
        var inputIndex = objectPaths.add(objConstructor.apply(void 0, ["{1f849fb0-4fcb-4a54-9b01-9152b9e482d3}",
            // actions
            objectPath()].concat(objectProperties(info))));
        var params = MethodParams.build().objectPath(inputIndex);
        var methodIndex = objectPaths.add(method("GetChanges", params, 
        // actions
        objectPath(), opQuery([], this.getSelects())));
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return this.send(objectPaths);
    };
    return TermStore;
}(ClientSvcQueryable));

/**
 * The root taxonomy object
 */
var Session = /** @class */ (function (_super) {
    __extends(Session, _super);
    function Session(webUrl) {
        if (webUrl === void 0) { webUrl = ""; }
        var _this = _super.call(this, webUrl) || this;
        // everything starts with the session
        _this._objectPaths.add(staticMethod("GetTaxonomySession", "{981cbc68-9edc-4f8d-872f-71146fcbb84f}", 
        // actions
        objectPath()));
        return _this;
    }
    Object.defineProperty(Session.prototype, "termStores", {
        /**
         * The collection of term stores
         */
        get: function () {
            return new TermStores(this);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Provides access to sp.setup from @pnp/sp
     *
     * @param config Configuration
     */
    Session.prototype.setup = function (config) {
        sp.setup(config);
    };
    /**
     * Creates a new batch
     */
    Session.prototype.createBatch = function () {
        return new ObjectPathBatch(this.toUrl());
    };
    /**
     * Gets the default keyword termstore for this session
     */
    Session.prototype.getDefaultKeywordTermStore = function () {
        return this.getChild(TermStore, "GetDefaultKeywordsTermStore", null);
    };
    /**
     * Gets the default site collection termstore for this session
     */
    Session.prototype.getDefaultSiteCollectionTermStore = function () {
        return this.getChild(TermStore, "GetDefaultSiteCollectionTermStore", null);
    };
    return Session;
}(ClientSvcQueryable));

var StringMatchOption;
(function (StringMatchOption) {
    StringMatchOption[StringMatchOption["StartsWith"] = 0] = "StartsWith";
    StringMatchOption[StringMatchOption["ExactMatch"] = 1] = "ExactMatch";
})(StringMatchOption || (StringMatchOption = {}));
var ChangedItemType;
(function (ChangedItemType) {
    ChangedItemType[ChangedItemType["Unknown"] = 0] = "Unknown";
    ChangedItemType[ChangedItemType["Term"] = 1] = "Term";
    ChangedItemType[ChangedItemType["TermSet"] = 2] = "TermSet";
    ChangedItemType[ChangedItemType["Group"] = 3] = "Group";
    ChangedItemType[ChangedItemType["TermStore"] = 4] = "TermStore";
    ChangedItemType[ChangedItemType["Site"] = 5] = "Site";
})(ChangedItemType || (ChangedItemType = {}));
var ChangedOperationType;
(function (ChangedOperationType) {
    ChangedOperationType[ChangedOperationType["Unknown"] = 0] = "Unknown";
    ChangedOperationType[ChangedOperationType["Add"] = 1] = "Add";
    ChangedOperationType[ChangedOperationType["Edit"] = 2] = "Edit";
    ChangedOperationType[ChangedOperationType["DeleteObject"] = 3] = "DeleteObject";
    ChangedOperationType[ChangedOperationType["Move"] = 4] = "Move";
    ChangedOperationType[ChangedOperationType["Copy"] = 5] = "Copy";
    ChangedOperationType[ChangedOperationType["PathChange"] = 6] = "PathChange";
    ChangedOperationType[ChangedOperationType["Merge"] = 7] = "Merge";
    ChangedOperationType[ChangedOperationType["ImportObject"] = 8] = "ImportObject";
    ChangedOperationType[ChangedOperationType["Restore"] = 9] = "Restore";
})(ChangedOperationType || (ChangedOperationType = {}));

function setItemMetaDataField(item, fieldName, term) {
    if (!objectDefinedNotNull(term)) {
        return Promise.resolve(null);
    }
    var postData = {};
    postData[fieldName] = {
        "Label": term.Name,
        "TermGuid": sanitizeGuid(term.Id),
        "WssId": "-1",
        "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
    };
    return item.update(postData);
}
function setItemMetaDataMultiField(item, fieldName) {
    var terms = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        terms[_i - 2] = arguments[_i];
    }
    if (terms.length < 1) {
        return Promise.resolve(null);
    }
    return item.list.fields.getByTitle(fieldName + "_0").select("InternalName").get().then(function (i) {
        var postData = {};
        postData[i.InternalName] = terms.map(function (term) { return "-1;#" + term.Name + "|" + sanitizeGuid(term.Id) + ";#"; }).join("");
        return item.update(postData);
    });
}

// export an existing session instance
var taxonomy = new Session();

export { taxonomy, Labels, Label, Session, TermGroups, TermGroup, Terms, Term, TermSets, TermSet, TermStores, TermStore, StringMatchOption, ChangedItemType, ChangedOperationType, setItemMetaDataField, setItemMetaDataMultiField };
//# sourceMappingURL=sp-taxonomy.es5.js.map
