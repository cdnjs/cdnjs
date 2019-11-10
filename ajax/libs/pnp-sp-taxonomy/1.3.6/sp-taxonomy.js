/**
 * @license
 * v1.3.6
 * MIT (https://github.com/pnp/pnpjs/blob/master/LICENSE)
 * Copyright (c) 2019 Microsoft
 * docs: https://pnp.github.io/pnpjs/
 * source: https://github.com/pnp/pnpjs
 * bugs: https://github.com/pnp/pnpjs/issues
 */
import { ClientSvcQueryable, MethodParams, property, setProperty, method, objConstructor, objectPath, objectProperties, opQuery, ObjectPathBatch, staticMethod } from '@pnp/sp-clientsvc';
import { stringIsNullOrEmpty, extend, sanitizeGuid, getGUID, objectDefinedNotNull } from '@pnp/common';
import { sp } from '@pnp/sp';

/**
 * Represents a collection of labels
 */
class Labels extends ClientSvcQueryable {
    constructor(parent = "", _objectPaths = null) {
        super(parent, _objectPaths);
        this._objectPaths.add(property("Labels"));
    }
    /**
     * Gets a label from the collection by its value
     *
     * @param value The value to retrieve
     */
    getByValue(value) {
        const params = MethodParams.build().string(value);
        return this.getChild(Label, "GetByValue", params);
    }
    /**
     * Loads the data and merges with with the ILabel instances
     */
    get() {
        return this.sendGetCollection((d) => {
            if (!stringIsNullOrEmpty(d.Value)) {
                return this.getByValue(d.Value);
            }
            throw Error("Could not find Value in Labels.get(). You must include at least one of these in your select fields.");
        });
    }
}
/**
 * Represents a label instance
 */
class Label extends ClientSvcQueryable {
    /**
     * Gets the data for this Label
     */
    get() {
        return this.sendGet(Label);
    }
    /**
     * Sets this label as the default
     */
    setAsDefaultForLanguage() {
        return this.invokeNonQuery("SetAsDefaultForLanguage");
    }
    /**
     * Deletes this label
     */
    delete() {
        return this.invokeNonQuery("DeleteObject");
    }
}

class Terms extends ClientSvcQueryable {
    /**
     * Gets the terms in this collection
     */
    get() {
        return this.sendGetCollection((d) => {
            if (!stringIsNullOrEmpty(d.Name)) {
                return this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in Terms.get(). You must include at least one of these in your select fields.");
        });
    }
    /**
     * Gets a term by id
     *
     * @param id The id of the term
     */
    getById(id) {
        const params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(Term, "GetById", params);
    }
    /**
     * Gets a term by name
     *
     * @param name Term name
     */
    getByName(name) {
        const params = MethodParams.build()
            .string(name);
        return this.getChild(Term, "GetByName", params);
    }
}
/**
 * Represents the operations available on a given term
 */
class Term extends ClientSvcQueryable {
    addTerm(name, lcid, isAvailableForTagging = true, id = getGUID()) {
        const params = MethodParams.build()
            .string(name)
            .number(lcid)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateTerm", params, setProperty("IsAvailableForTagging", "Boolean", `${isAvailableForTagging}`))
            .then(r => extend(this.termSet.getTermById(r.Id), r));
    }
    get terms() {
        return this.getChildProperty(Terms, "Terms");
    }
    get labels() {
        return new Labels(this);
    }
    get parent() {
        return this.getChildProperty(Term, "Parent");
    }
    get pinSourceTermSet() {
        return this.getChildProperty(TermSet, "PinSourceTermSet");
    }
    get reusedTerms() {
        return this.getChildProperty(Terms, "ReusedTerms");
    }
    get sourceTerm() {
        return this.getChildProperty(Term, "SourceTerm");
    }
    get termSet() {
        return this.getChildProperty(TermSet, "TermSet");
    }
    get termSets() {
        return this.getChildProperty(TermSets, "TermSets");
    }
    /**
     * Creates a new label for this Term
     *
     * @param name label value
     * @param lcid language code
     * @param isDefault Is the default label
     */
    createLabel(name, lcid, isDefault = false) {
        const params = MethodParams.build()
            .string(name)
            .number(lcid)
            .boolean(isDefault);
        this._useCaching = false;
        return this.invokeMethod("CreateLabel", params)
            .then(r => extend(this.labels.getByValue(name), r));
    }
    /**
     * Sets the deprecation flag on a term
     *
     * @param doDeprecate New value for the deprecation flag
     */
    deprecate(doDeprecate) {
        const params = MethodParams.build().boolean(doDeprecate);
        return this.invokeNonQuery("Deprecate", params);
    }
    /**
     * Loads the term data
     */
    get() {
        return this.sendGet(Term);
    }
    /**
     * Gets the appropriate description for a term
     *
     * @param lcid Language code
     */
    getDescription(lcid) {
        const params = MethodParams.build().number(lcid);
        return this.invokeMethodAction("GetDescription", params);
    }
    /**
     * Sets the description
     *
     * @param description Term description
     * @param lcid Language code
     */
    setDescription(description, lcid) {
        const params = MethodParams.build().string(description).number(lcid);
        return this.invokeNonQuery("SetDescription", params);
    }
    /**
     * Sets a custom property on this term
     *
     * @param name Property name
     * @param value Property value
     */
    setLocalCustomProperty(name, value) {
        const params = MethodParams.build().string(name).string(value);
        return this.invokeNonQuery("SetLocalCustomProperty", params);
    }
    /**
     * Updates the specified properties of this term, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    update(properties) {
        return this.invokeUpdate(properties, Term);
    }
    /**
     * Deletes a this term
     *
     */
    delete() {
        return this.invokeNonQuery("DeleteObject");
    }
}

class TermSets extends ClientSvcQueryable {
    /**
     * Gets the termsets in this collection
     */
    get() {
        return this.sendGetCollection((d) => {
            if (!stringIsNullOrEmpty(d.Name)) {
                return this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return this.getById(d.Id);
            }
            throw Error("Could not find Value in Labels.get(). You must include at least one of these in your select fields.");
        });
    }
    /**
     * Gets a TermSet from this collection by id
     *
     * @param id TermSet id
     */
    getById(id) {
        const params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermSet, "GetById", params);
    }
    /**
     * Gets a TermSet from this collection by name
     *
     * @param name TermSet name
     */
    getByName(name) {
        const params = MethodParams.build()
            .string(name);
        return this.getChild(TermSet, "GetByName", params);
    }
}
class TermSet extends ClientSvcQueryable {
    /**
     * Gets the group containing this Term set
     */
    get group() {
        return this.getChildProperty(TermGroup, "Group");
    }
    /**
     * Access all the terms in this termset
     */
    get terms() {
        return this.getChild(Terms, "GetAllTerms", null);
    }
    /**
     * Adds a stakeholder to the TermSet
     *
     * @param stakeholderName The login name of the user to be added as a stakeholder
     */
    addStakeholder(stakeholderName) {
        const params = MethodParams.build()
            .string(stakeholderName);
        return this.invokeNonQuery("DeleteStakeholder", params);
    }
    /**
     * Deletes a stakeholder to the TermSet
     *
     * @param stakeholderName The login name of the user to be added as a stakeholder
     */
    deleteStakeholder(stakeholderName) {
        const params = MethodParams.build()
            .string(stakeholderName);
        return this.invokeNonQuery("AddStakeholder", params);
    }
    /**
     * Gets the data for this TermSet
     */
    get() {
        return this.sendGet(TermSet);
    }
    /**
     * Get a term by id
     *
     * @param id Term id
     */
    getTermById(id) {
        const params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(Term, "GetTerm", params);
    }
    /**
     * Adds a term to this term set
     *
     * @param name Name for the term
     * @param lcid Language code
     * @param isAvailableForTagging set tagging availability (default: true)
     * @param id GUID id for the term (optional)
     */
    addTerm(name, lcid, isAvailableForTagging = true, id = getGUID()) {
        const params = MethodParams.build()
            .string(name)
            .number(lcid)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateTerm", params, setProperty("IsAvailableForTagging", "Boolean", `${isAvailableForTagging}`))
            .then(r => extend(this.getTermById(r.Id), r));
    }
    /**
     * Copies this term set immediately
     */
    copy() {
        return this.invokeMethod("Copy", null);
    }
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    update(properties) {
        return this.invokeUpdate(properties, TermSet);
    }
}

/**
 * Term Groups collection in Term Store
 */
class TermGroups extends ClientSvcQueryable {
    /**
     * Gets the groups in this collection
     */
    get() {
        return this.sendGetCollection((d) => {
            if (!stringIsNullOrEmpty(d.Name)) {
                return this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in TermGroups.get(). You must include at least one of these in your select fields.");
        });
    }
    /**
     * Gets a TermGroup from this collection by id
     *
     * @param id TermGroup id
     */
    getById(id) {
        const params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermGroup, "GetById", params);
    }
    /**
     * Gets a TermGroup from this collection by name
     *
     * @param name TErmGroup name
     */
    getByName(name) {
        const params = MethodParams.build()
            .string(name);
        return this.getChild(TermGroup, "GetByName", params);
    }
}
/**
 * Represents a group in the taxonomy heirarchy
 */
class TermGroup extends ClientSvcQueryable {
    constructor(parent = "", _objectPaths) {
        super(parent, _objectPaths);
        // this should mostly be true
        this.store = parent instanceof TermStore ? parent : null;
    }
    /**
     * Gets the collection of term sets in this group
     */
    get termSets() {
        return this.getChildProperty(TermSets, "TermSets");
    }
    /**
     * Adds a contributor to the Group
     *
     * @param principalName The login name of the user to be added as a contributor
     */
    addContributor(principalName) {
        const params = MethodParams.build().string(principalName);
        return this.invokeNonQuery("AddContributor", params);
    }
    /**
     * Adds a group manager to the Group
     *
     * @param principalName The login name of the user to be added as a group manager
     */
    addGroupManager(principalName) {
        const params = MethodParams.build().string(principalName);
        return this.invokeNonQuery("AddGroupManager", params);
    }
    /**
     * Creates a new TermSet in this Group using the provided language and unique identifier
     *
     * @param name The name of the new TermSet being created
     * @param lcid The language that the new TermSet name is in
     * @param id The unique identifier of the new TermSet being created (optional)
     */
    createTermSet(name, lcid, id = getGUID()) {
        const params = MethodParams.build()
            .string(name)
            .string(sanitizeGuid(id))
            .number(lcid);
        this._useCaching = false;
        return this.invokeMethod("CreateTermSet", params)
            .then(r => extend(this.store.getTermSetById(r.Id), r));
    }
    /**
     * Gets this term store's data
     */
    get() {
        return this.sendGet(TermGroup);
    }
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    update(properties) {
        return this.invokeUpdate(properties, TermGroup);
    }
}

/**
 * Represents the set of available term stores and the collection methods
 */
class TermStores extends ClientSvcQueryable {
    constructor(parent = "") {
        super(parent);
        this._objectPaths.add(property("TermStores", 
        // actions
        objectPath()));
    }
    /**
     * Gets the term stores
     */
    get() {
        return this.sendGetCollection((d) => {
            if (!stringIsNullOrEmpty(d.Name)) {
                return this.getByName(d.Name);
            }
            else if (!stringIsNullOrEmpty(d.Id)) {
                return this.getById(d.Id);
            }
            throw Error("Could not find Name or Id in TermStores.get(). You must include at least one of these in your select fields.");
        });
    }
    /**
     * Returns the TermStore specified by its index name
     *
     * @param name The index name of the TermStore to be returned
     */
    getByName(name) {
        return this.getChild(TermStore, "GetByName", MethodParams.build().string(name));
    }
    /**
     * Returns the TermStore specified by its GUID index
     *
     * @param id The GUID index of the TermStore to be returned
     */
    getById(id) {
        return this.getChild(TermStore, "GetById", MethodParams.build().string(sanitizeGuid(id)));
    }
}
class TermStore extends ClientSvcQueryable {
    constructor(parent = "", _objectPaths = null) {
        super(parent, _objectPaths);
    }
    get hashTagsTermSet() {
        return this.getChildProperty(TermSet, "HashTagsTermSet");
    }
    get keywordsTermSet() {
        return this.getChildProperty(TermSet, "KeywordsTermSet");
    }
    get orphanedTermsTermSet() {
        return this.getChildProperty(TermSet, "OrphanedTermsTermSet");
    }
    get systemGroup() {
        return this.getChildProperty(TermGroup, "SystemGroup");
    }
    get groups() {
        return this.getChildProperty(TermGroups, "Groups");
    }
    /**
     * Gets the term store data
     */
    get() {
        return this.sendGet(TermStore);
    }
    /**
     * Gets term sets
     *
     * @param name
     * @param lcid
     */
    getTermSetsByName(name, lcid) {
        const params = MethodParams.build()
            .string(name)
            .number(lcid);
        return this.getChild(TermSets, "GetTermSetsByName", params);
    }
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    getTermSetById(id) {
        const params = MethodParams.build().string(sanitizeGuid(id));
        return this.getChild(TermSet, "GetTermSet", params);
    }
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    getTermById(id) {
        const params = MethodParams.build().string(sanitizeGuid(id));
        return this.getChild(Term, "GetTerm", params);
    }
    /**
     * Provides access to an ITermSet by id
     *
     * @param id
     */
    getTermsById(...ids) {
        const params = MethodParams.build().strArray(ids.map(id => sanitizeGuid(id)));
        return this.getChild(Terms, "GetTermsById", params);
    }
    /**
     * Gets a term from a term set based on the supplied ids
     *
     * @param termId Term Id
     * @param termSetId Termset Id
     */
    getTermInTermSet(termId, termSetId) {
        const params = MethodParams.build().string(sanitizeGuid(termId)).string(sanitizeGuid(termSetId));
        return this.getChild(Term, "GetTermInTermSet", params);
    }
    /**
     * This method provides access to a ITermGroup by id
     *
     * @param id The group id
     */
    getTermGroupById(id) {
        const params = MethodParams.build()
            .string(sanitizeGuid(id));
        return this.getChild(TermGroup, "GetGroup", params);
    }
    /**
     * Gets the terms by the supplied information (see: https://msdn.microsoft.com/en-us/library/hh626704%28v=office.12%29.aspx)
     *
     * @param info
     */
    getTerms(info) {
        const objectPaths = this._objectPaths.copy();
        // this will be the parent of the GetTerms call, but we need to create the input param first
        const parentIndex = objectPaths.lastIndex;
        // this is our input object
        const input = objConstructor("{61a1d689-2744-4ea3-a88b-c95bee9803aa}", 
        // actions
        objectPath(), ...objectProperties(info));
        // add the input object path
        const inputIndex = objectPaths.add(input);
        // this sets up the GetTerms call
        const params = MethodParams.build().objectPath(inputIndex);
        // call the method
        const methodIndex = objectPaths.add(method("GetTerms", params, 
        // actions
        objectPath()));
        // setup the parent relationship even though they are seperated in the collection
        objectPaths.addChildRelationship(parentIndex, methodIndex);
        return new Terms(this, objectPaths);
    }
    /**
     * Gets the site collection group associated with the current site
     *
     * @param createIfMissing If true the group will be created, otherwise null (default: false)
     */
    getSiteCollectionGroup(createIfMissing = false) {
        const objectPaths = this._objectPaths.copy();
        const methodParent = objectPaths.lastIndex;
        const siteIndex = objectPaths.siteIndex;
        const params = MethodParams.build().objectPath(siteIndex).boolean(createIfMissing);
        const methodIndex = objectPaths.add(method("GetSiteCollectionGroup", params, 
        // actions
        objectPath()));
        // the parent of this method call is this instance, not the current/site
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return new TermGroup(this, objectPaths);
    }
    /**
     * Adds a working language to the TermStore
     *
     * @param lcid The locale identifier of the working language to add
     */
    addLanguage(lcid) {
        const params = MethodParams.build().number(lcid);
        return this.invokeNonQuery("AddLanguage", params);
    }
    /**
     * Creates a new Group in this TermStore
     *
     * @param name The name of the new Group being created
     * @param id The ID (Guid) that the new group should have
     */
    addGroup(name, id = getGUID()) {
        const params = MethodParams.build()
            .string(name)
            .string(sanitizeGuid(id));
        this._useCaching = false;
        return this.invokeMethod("CreateGroup", params)
            .then(r => extend(this.getTermGroupById(r.Id), r));
    }
    /**
     * Commits all updates to the database that have occurred since the last commit or rollback
     */
    commitAll() {
        return this.invokeNonQuery("CommitAll");
    }
    /**
     * Delete a working language from the TermStore
     *
     * @param lcid locale ID for the language to be deleted
     */
    deleteLanguage(lcid) {
        const params = MethodParams.build().number(lcid);
        return this.invokeNonQuery("DeleteLanguage", params);
    }
    /**
     * Discards all updates that have occurred since the last commit or rollback
     */
    rollbackAll() {
        return this.invokeNonQuery("RollbackAll");
    }
    /**
     * Updates the cache
     */
    updateCache() {
        return this.invokeNonQuery("UpdateCache");
    }
    /**
     * Updates the specified properties of this term set, not all properties can be updated
     *
     * @param properties Plain object representing the properties and new values to update
     */
    update(properties) {
        return this.invokeUpdate(properties, TermStore);
    }
    /**
     * This method makes sure that this instance is aware of all child terms that are used in the current site collection
     */
    updateUsedTermsOnSite() {
        const objectPaths = this._objectPaths.copy();
        const methodParent = objectPaths.lastIndex;
        const siteIndex = objectPaths.siteIndex;
        const params = MethodParams.build().objectPath(siteIndex);
        const methodIndex = objectPaths.add(method("UpdateUsedTermsOnSite", params));
        // the parent of this method call is this instance, not the current context/site
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return this.send(objectPaths);
    }
    /**
     * Gets a list of changes
     *
     * @param info Lookup information
     */
    getChanges(info) {
        const objectPaths = this._objectPaths.copy();
        const methodParent = objectPaths.lastIndex;
        const inputIndex = objectPaths.add(objConstructor("{1f849fb0-4fcb-4a54-9b01-9152b9e482d3}", 
        // actions
        objectPath(), ...objectProperties(info)));
        const params = MethodParams.build().objectPath(inputIndex);
        const methodIndex = objectPaths.add(method("GetChanges", params, 
        // actions
        objectPath(), opQuery([], this.getSelects())));
        objectPaths.addChildRelationship(methodParent, methodIndex);
        return this.send(objectPaths);
    }
}

/**
 * The root taxonomy object
 */
class Session extends ClientSvcQueryable {
    constructor(webUrl = "") {
        super(webUrl);
        // everything starts with the session
        this._objectPaths.add(staticMethod("GetTaxonomySession", "{981cbc68-9edc-4f8d-872f-71146fcbb84f}", 
        // actions
        objectPath()));
    }
    /**
     * The collection of term stores
     */
    get termStores() {
        return new TermStores(this);
    }
    /**
     * Provides access to sp.setup from @pnp/sp
     *
     * @param config Configuration
     */
    setup(config) {
        sp.setup(config);
    }
    /**
     * Creates a new batch
     */
    createBatch() {
        return new ObjectPathBatch(this.toUrl());
    }
    /**
     * Gets the default keyword termstore for this session
     */
    getDefaultKeywordTermStore() {
        return this.getChild(TermStore, "GetDefaultKeywordsTermStore", null);
    }
    /**
     * Gets the default site collection termstore for this session
     */
    getDefaultSiteCollectionTermStore() {
        return this.getChild(TermStore, "GetDefaultSiteCollectionTermStore", null);
    }
}

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
    const postData = {};
    postData[fieldName] = {
        "Label": term.Name,
        "TermGuid": sanitizeGuid(term.Id),
        "WssId": "-1",
        "__metadata": { "type": "SP.Taxonomy.TaxonomyFieldValue" },
    };
    return item.update(postData);
}
function setItemMetaDataMultiField(item, fieldName, ...terms) {
    if (terms.length < 1) {
        return Promise.resolve(null);
    }
    return item.list.fields.getByTitle(`${fieldName}_0`).select("InternalName").get().then(i => {
        const postData = {};
        postData[i.InternalName] = terms.map(term => `-1;#${term.Name}|${sanitizeGuid(term.Id)};#`).join("");
        return item.update(postData);
    });
}

// export an existing session instance
const taxonomy = new Session();

export { taxonomy, Labels, Label, Session, TermGroups, TermGroup, Terms, Term, TermSets, TermSet, TermStores, TermStore, StringMatchOption, ChangedItemType, ChangedOperationType, setItemMetaDataField, setItemMetaDataMultiField };
//# sourceMappingURL=sp-taxonomy.js.map
