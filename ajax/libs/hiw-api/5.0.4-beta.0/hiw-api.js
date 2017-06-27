/* Health Indicators Warehouse (HIW) JavaScript API
 *   v5.0.4 (beta)
 * 
 * Docs:    http://developers.healthindicators.gov
 * Source:  https://github.com/HealthIndicators/js-api
 * License: MIT - https://github.com/HealthIndicators/js-api/raw/master/LICENSE
 */

/********************************************************************
 *                                                                  *
 * This is pre-release software and comes with no warranties.       *
 *                                                                  *
 * Please report any issues or suggestions my emailing: hiw@s-3.com *
 *                                                                  *
 ********************************************************************/
var hiw;
(function (hiw) {
    hiw.getHttpRequest = null;
    function initialize() {
        var m = null;
        try {
            m = eval("module");
        }
        catch (ex) {
        }
        // Check if we're running under Node.JS.
        if (m != null && typeof m === "object" && typeof m.exports === "object") {
            var nodeJSXMLHttpRequest = eval("require(\"xmlhttprequest\")").XMLHttpRequest;
            hiw.getHttpRequest = function () {
                return new nodeJSXMLHttpRequest();
            };
            m.exports = hiw;
        }
        else {
            hiw.getHttpRequest = function () {
                return new XMLHttpRequest();
            };
        }
    }
    initialize();
    function extend(target, source) {
        var exclude = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            exclude[_i - 2] = arguments[_i];
        }
        if (source == null)
            return;
        for (name in source) {
            var targetName = pascalCaseToCamelCase(name);
            if (!exclude || exclude.indexOf(targetName) < 0) {
                var currentValue = target[targetName];
                var newValue = source[name];
                // Prevent never-ending loop.
                if (target !== newValue && currentValue !== newValue) {
                    var newValueIsArray = Array.isArray(newValue);
                    var newValueIsPlainObject = isPlainObject(newValue);
                    // Recurse if we're merging plain objects or arrays.
                    if (newValue && (newValueIsPlainObject || newValueIsArray)) {
                        var clone = null;
                        if (newValueIsArray) {
                            var currentValueIsArray = Array.isArray(currentValue);
                            clone = (currentValue && currentValueIsArray ? currentValue : []);
                        }
                        else {
                            var currentValueIsPlainObject = isPlainObject(currentValue);
                            clone = (currentValue && currentValueIsPlainObject ? currentValue : {});
                        }
                        // Never move original objects, clone them.
                        target[targetName] = extend(clone, newValue);
                    }
                    else if (newValue !== undefined)
                        target[targetName] = newValue;
                }
            }
        }
        // Return the modified object
        return target;
    }
    hiw.extend = extend;
    function pascalCaseToCamelCase(name) {
        if (name == null)
            return null;
        var matches = /^([A-Z]+?)(?:[A-Z][a-z].*|[^A-Z][a-z].*)?$/.exec(name);
        if (matches)
            return matches[1].toLowerCase() + name.substr(matches[1].length, name.length - matches[1].length);
    }
    hiw.pascalCaseToCamelCase = pascalCaseToCamelCase;
    function isPlainObject(obj) {
        if (obj == null || typeof obj !== "object" || obj.nodeType || obj === window)
            return false;
        if (obj.constructor && obj.constructor.prototype && typeof obj.constructor.prototype.isPrototypeOf !== "function")
            return false;
        return true;
    }
    hiw.isPlainObject = isPlainObject;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var Async = (function () {
        function Async() {
            this.isComplete = false;
            this.notifyCallback = null;
        }
        Async.prototype.complete = function () {
            this.isComplete = true;
            this.notify();
        };
        Async.prototype.subscribe = function (callback) {
            this.notifyCallback = callback;
            if (this.isComplete)
                this.notify();
        };
        Async.prototype.notify = function () {
            if (this.notifyCallback != null)
                this.notifyCallback(this);
        };
        return Async;
    })();
    hiw.Async = Async;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var Synchronizer = (function () {
        function Synchronizer(asyncs, completeCallback) {
            this.asyncs = null;
            this.completedAsyncs = null;
            this.completeCallback = null;
            this.asyncs = asyncs;
            this.completedAsyncs = new Array();
            this.completeCallback = completeCallback;
            this.subscribe();
        }
        Synchronizer.prototype.subscribe = function () {
            for (var i = 0; i < this.asyncs.length; i++)
                this.asyncs[i].subscribe(this.actionCompleted.bind(this));
        };
        Synchronizer.prototype.actionCompleted = function (async) {
            this.completedAsyncs.push(async);
            if (this.asyncs.length == this.completedAsyncs.length)
                this.notify();
        };
        Synchronizer.prototype.notify = function () {
            this.completeCallback();
        };
        Synchronizer.sync = function (asyncs, completeCallback) {
            return new Synchronizer(asyncs, completeCallback);
        };
        return Synchronizer;
    })();
    hiw.Synchronizer = Synchronizer;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** The valid set of boolean operators we can use to filter an API call. */
    (function (FilterType) {
        FilterType[FilterType["And"] = 0] = "And";
        FilterType[FilterType["Or"] = 1] = "Or";
    })(hiw.FilterType || (hiw.FilterType = {}));
    var FilterType = hiw.FilterType;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** The valid set of operators we can use to filter an API call. */
    (function (Operator) {
        Operator[Operator["LessThan"] = 0] = "LessThan";
        Operator[Operator["LessThanOrEqual"] = 1] = "LessThanOrEqual";
        Operator[Operator["Equal"] = 2] = "Equal";
        Operator[Operator["NotEqual"] = 3] = "NotEqual";
        Operator[Operator["GreaterThanOrEqual"] = 4] = "GreaterThanOrEqual";
        Operator[Operator["GreaterThan"] = 5] = "GreaterThan";
        Operator[Operator["Null"] = 6] = "Null";
        Operator[Operator["NotNull"] = 7] = "NotNull";
        Operator[Operator["In"] = 8] = "In";
        Operator[Operator["NotIn"] = 9] = "NotIn";
    })(hiw.Operator || (hiw.Operator = {}));
    var Operator = hiw.Operator;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Represents a single criterion. */
    var Criterion = (function () {
        /** Creates a new Criterion instance with the specified name, operator and value. */
        function Criterion(field, operator, value) {
            if (operator === void 0) { operator = 2 /* Equal */; }
            if (value === void 0) { value = null; }
            if (field == null)
                throw new Error("Parameter 'field' is required.");
            this.name = (field instanceof hiw.PropertyMap ? field.apiName : field.toString());
            this.operator = operator;
            this.value = value;
        }
        /** Converts this instance to JSON in the format the HIW API expects. */
        Criterion.prototype.toJSON = function () {
            var json = null;
            if (this.operator == 8 /* In */ || this.operator == 9 /* NotIn */) {
                if (this.value != null && !Array.isArray(this.value))
                    throw new Error("Value provided for \"" + this.operator + "\" criterion must be an array.");
                else if (this.value != null && this.value.length > 0) {
                    var group = new hiw.Group(this.operator == 8 /* In */ ? 1 /* Or */ : 0 /* And */);
                    for (var i = 0; i < this.value.length; i++)
                        group.add(this.name, (this.operator == 8 /* In */ ? 2 /* Equal */ : 3 /* NotEqual */), this.value[i]);
                    json = group.toJSON();
                }
            }
            else {
                json = {
                    "__type": "SearchParameter:#S3.Common.Search",
                    Name: this.name,
                    Operator: this.operator
                };
                if (this.operator != 6 /* Null */ && this.operator != 7 /* NotNull */)
                    json.Value = this.value;
            }
            return json;
        };
        return Criterion;
    })();
    hiw.Criterion = Criterion;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Represents a group of filter criterion. */
    var Group = (function () {
        /** Creates a new Group instance of the specified type. */
        function Group(type) {
            if (type === void 0) { type = 0 /* And */; }
            this.type = type;
            this.criteria = new Array();
        }
        /** Adds the specified filter part to the criteria. */
        Group.prototype.addPart = function (part) {
            this.criteria.push(part);
            return this;
        };
        /** Creates a new criterion and adds it to the criteria. */
        Group.prototype.add = function (field, operator, value) {
            if (operator === void 0) { operator = 2 /* Equal */; }
            if (value === void 0) { value = null; }
            this.criteria.push(new hiw.Criterion(field, operator, value));
            return this;
        };
        /** Converts this instance to JSON in the format the HIW API expects. */
        Group.prototype.toJSON = function () {
            var json = {
                "__type": "SearchGroup:#S3.Common.Search",
                Mode: hiw.FilterType[this.type],
                Elements: new Array()
            };
            if (this.criteria)
                for (var i = 0; i < this.criteria.length; i++)
                    json.Elements.push(this.criteria[i].toJSON());
            return json;
        };
        return Group;
    })();
    hiw.Group = Group;
})(hiw || (hiw = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var hiw;
(function (hiw) {
    /** Represents the outermost portion of a filter. */
    var Filter = (function (_super) {
        __extends(Filter, _super);
        /** Creates a new Filter instance for the specified page, type, and criteria. */
        function Filter(page, type) {
            if (page === void 0) { page = 1; }
            if (type === void 0) { type = 0 /* And */; }
            _super.call(this, type);
            this.page = page;
        }
        /** Adds the specified filter part to the criteria. */
        Filter.prototype.addPart = function (part) {
            _super.prototype.addPart.call(this, part);
            return this;
        };
        /** Creates a new criterion (using the default operator "Equal") and adds it to the criteria. */
        //public add(name: string, value: Object): Filter<T>;
        Filter.prototype.addEqual = function (field, value) {
            return this.add(field, 2 /* Equal */, value);
        };
        /** Creates a new criterion and adds it to the criteria. */
        Filter.prototype.add = function (field, operator, value) {
            if (operator === void 0) { operator = 2 /* Equal */; }
            if (value === void 0) { value = null; }
            _super.prototype.add.call(this, field, operator, value);
            return this;
        };
        /** Converts this instance to JSON in the format the HIW API expects. */
        Filter.prototype.toJSON = function (page) {
            if (page === void 0) { page = 1; }
            var json = _super.prototype.toJSON.call(this);
            delete json["__type"];
            json["Page"] = page;
            return json;
        };
        return Filter;
    })(hiw.Group);
    hiw.Filter = Filter;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Exposes functionality through one or more service end points. */
    (function (LinkType) {
        LinkType[LinkType["Age"] = 0] = "Age";
        LinkType[LinkType["Ages"] = 1] = "Ages";
        LinkType[LinkType["AgeRelation"] = 2] = "AgeRelation";
        LinkType[LinkType["AgeRelations"] = 3] = "AgeRelations";
        LinkType[LinkType["CharacteristicOfSchoolOrStudent"] = 4] = "CharacteristicOfSchoolOrStudent";
        LinkType[LinkType["CharacteristicOfSchoolOrStudents"] = 5] = "CharacteristicOfSchoolOrStudents";
        LinkType[LinkType["CharacteristicOfSchoolOrStudentRelation"] = 6] = "CharacteristicOfSchoolOrStudentRelation";
        LinkType[LinkType["CharacteristicOfSchoolOrStudentRelations"] = 7] = "CharacteristicOfSchoolOrStudentRelations";
        LinkType[LinkType["CountryOfBirth"] = 8] = "CountryOfBirth";
        LinkType[LinkType["CountryOfBirths"] = 9] = "CountryOfBirths";
        LinkType[LinkType["CountryOfBirthRelation"] = 10] = "CountryOfBirthRelation";
        LinkType[LinkType["CountryOfBirthRelations"] = 11] = "CountryOfBirthRelations";
        LinkType[LinkType["DataCategory"] = 12] = "DataCategory";
        LinkType[LinkType["DataCategories"] = 13] = "DataCategories";
        LinkType[LinkType["DataCategoryRelation"] = 14] = "DataCategoryRelation";
        LinkType[LinkType["DataCategoryRelations"] = 15] = "DataCategoryRelations";
        LinkType[LinkType["DataSourceDataSupplier"] = 16] = "DataSourceDataSupplier";
        LinkType[LinkType["DataSourceDataSuppliers"] = 17] = "DataSourceDataSuppliers";
        LinkType[LinkType["DataSource"] = 18] = "DataSource";
        LinkType[LinkType["DataSources"] = 19] = "DataSources";
        LinkType[LinkType["DataSourceURL"] = 20] = "DataSourceURL";
        LinkType[LinkType["DataSourceURLs"] = 21] = "DataSourceURLs";
        LinkType[LinkType["DataSupplier"] = 22] = "DataSupplier";
        LinkType[LinkType["DataSuppliers"] = 23] = "DataSuppliers";
        LinkType[LinkType["DimensionBook"] = 24] = "DimensionBook";
        LinkType[LinkType["DimensionBooks"] = 25] = "DimensionBooks";
        LinkType[LinkType["DimensionBookRelation"] = 26] = "DimensionBookRelation";
        LinkType[LinkType["DimensionBookRelations"] = 27] = "DimensionBookRelations";
        LinkType[LinkType["DimensionGraph"] = 28] = "DimensionGraph";
        LinkType[LinkType["DimensionGraphs"] = 29] = "DimensionGraphs";
        LinkType[LinkType["DimensionList"] = 30] = "DimensionList";
        LinkType[LinkType["DimensionLists"] = 31] = "DimensionLists";
        LinkType[LinkType["DisabilityStatus"] = 32] = "DisabilityStatus";
        LinkType[LinkType["DisabilityStatuses"] = 33] = "DisabilityStatuses";
        LinkType[LinkType["DisabilityStatusRelation"] = 34] = "DisabilityStatusRelation";
        LinkType[LinkType["DisabilityStatusRelations"] = 35] = "DisabilityStatusRelations";
        LinkType[LinkType["EducationalAttainment"] = 36] = "EducationalAttainment";
        LinkType[LinkType["EducationalAttainments"] = 37] = "EducationalAttainments";
        LinkType[LinkType["EducationalAttainmentRelation"] = 38] = "EducationalAttainmentRelation";
        LinkType[LinkType["EducationalAttainmentRelations"] = 39] = "EducationalAttainmentRelations";
        LinkType[LinkType["FamilyType"] = 40] = "FamilyType";
        LinkType[LinkType["FamilyTypes"] = 41] = "FamilyTypes";
        LinkType[LinkType["FamilyTypeRelation"] = 42] = "FamilyTypeRelation";
        LinkType[LinkType["FamilyTypeRelations"] = 43] = "FamilyTypeRelations";
        LinkType[LinkType["Geography"] = 44] = "Geography";
        LinkType[LinkType["Geographies"] = 45] = "Geographies";
        LinkType[LinkType["GeographyRelation"] = 46] = "GeographyRelation";
        LinkType[LinkType["GeographyRelations"] = 47] = "GeographyRelations";
        LinkType[LinkType["GlossaryTerm"] = 48] = "GlossaryTerm";
        LinkType[LinkType["GlossaryTerms"] = 49] = "GlossaryTerms";
        LinkType[LinkType["HealthInsuranceStatus"] = 50] = "HealthInsuranceStatus";
        LinkType[LinkType["HealthInsuranceStatuses"] = 51] = "HealthInsuranceStatuses";
        LinkType[LinkType["HealthInsuranceStatusRelation"] = 52] = "HealthInsuranceStatusRelation";
        LinkType[LinkType["HealthInsuranceStatusRelations"] = 53] = "HealthInsuranceStatusRelations";
        LinkType[LinkType["HP2020TSM"] = 54] = "HP2020TSM";
        LinkType[LinkType["HP2020TSMs"] = 55] = "HP2020TSMs";
        LinkType[LinkType["IncomeAndPovertyStatus"] = 56] = "IncomeAndPovertyStatus";
        LinkType[LinkType["IncomeAndPovertyStatuses"] = 57] = "IncomeAndPovertyStatuses";
        LinkType[LinkType["IncomeAndPovertyStatusRelation"] = 58] = "IncomeAndPovertyStatusRelation";
        LinkType[LinkType["IncomeAndPovertyStatusRelations"] = 59] = "IncomeAndPovertyStatusRelations";
        LinkType[LinkType["IndicatorDescriptionDataCategory"] = 60] = "IndicatorDescriptionDataCategory";
        LinkType[LinkType["IndicatorDescriptionDataCategories"] = 61] = "IndicatorDescriptionDataCategories";
        LinkType[LinkType["IndicatorDescriptionDataSource"] = 62] = "IndicatorDescriptionDataSource";
        LinkType[LinkType["IndicatorDescriptionDataSources"] = 63] = "IndicatorDescriptionDataSources";
        LinkType[LinkType["IndicatorDescriptionDefaultDimensionGraph"] = 64] = "IndicatorDescriptionDefaultDimensionGraph";
        LinkType[LinkType["IndicatorDescriptionDefaultDimensionGraphs"] = 65] = "IndicatorDescriptionDefaultDimensionGraphs";
        LinkType[LinkType["IndicatorDescriptionDimension"] = 66] = "IndicatorDescriptionDimension";
        LinkType[LinkType["IndicatorDescriptionDimensions"] = 67] = "IndicatorDescriptionDimensions";
        LinkType[LinkType["IndicatorDescriptionDimensionGraph"] = 68] = "IndicatorDescriptionDimensionGraph";
        LinkType[LinkType["IndicatorDescriptionDimensionGraphs"] = 69] = "IndicatorDescriptionDimensionGraphs";
        LinkType[LinkType["IndicatorDescriptionDimensionValue"] = 70] = "IndicatorDescriptionDimensionValue";
        LinkType[LinkType["IndicatorDescriptionDimensionValues"] = 71] = "IndicatorDescriptionDimensionValues";
        LinkType[LinkType["IndicatorDescriptionInitiative"] = 72] = "IndicatorDescriptionInitiative";
        LinkType[LinkType["IndicatorDescriptionInitiatives"] = 73] = "IndicatorDescriptionInitiatives";
        LinkType[LinkType["IndicatorDescriptionIntervention"] = 74] = "IndicatorDescriptionIntervention";
        LinkType[LinkType["IndicatorDescriptionInterventions"] = 75] = "IndicatorDescriptionInterventions";
        LinkType[LinkType["IndicatorDescriptionKeyword"] = 76] = "IndicatorDescriptionKeyword";
        LinkType[LinkType["IndicatorDescriptionKeywords"] = 77] = "IndicatorDescriptionKeywords";
        LinkType[LinkType["IndicatorDescriptionLocaleCounty"] = 78] = "IndicatorDescriptionLocaleCounty";
        LinkType[LinkType["IndicatorDescriptionLocaleCounties"] = 79] = "IndicatorDescriptionLocaleCounties";
        LinkType[LinkType["IndicatorDescriptionLocaleHospitalReferralRegion"] = 80] = "IndicatorDescriptionLocaleHospitalReferralRegion";
        LinkType[LinkType["IndicatorDescriptionLocaleHospitalReferralRegions"] = 81] = "IndicatorDescriptionLocaleHospitalReferralRegions";
        LinkType[LinkType["IndicatorDescriptionLocaleLevel"] = 82] = "IndicatorDescriptionLocaleLevel";
        LinkType[LinkType["IndicatorDescriptionLocaleLevels"] = 83] = "IndicatorDescriptionLocaleLevels";
        LinkType[LinkType["IndicatorDescriptionLocale"] = 84] = "IndicatorDescriptionLocale";
        LinkType[LinkType["IndicatorDescriptionLocales"] = 85] = "IndicatorDescriptionLocales";
        LinkType[LinkType["IndicatorDescriptionLocaleState"] = 86] = "IndicatorDescriptionLocaleState";
        LinkType[LinkType["IndicatorDescriptionLocaleStates"] = 87] = "IndicatorDescriptionLocaleStates";
        LinkType[LinkType["IndicatorDescriptionMethodologyNote"] = 88] = "IndicatorDescriptionMethodologyNote";
        LinkType[LinkType["IndicatorDescriptionMethodologyNotes"] = 89] = "IndicatorDescriptionMethodologyNotes";
        LinkType[LinkType["IndicatorDescriptionMoreInfo"] = 90] = "IndicatorDescriptionMoreInfo";
        LinkType[LinkType["IndicatorDescriptionMoreInfos"] = 91] = "IndicatorDescriptionMoreInfos";
        LinkType[LinkType["IndicatorDescriptionReference"] = 92] = "IndicatorDescriptionReference";
        LinkType[LinkType["IndicatorDescriptionReferences"] = 93] = "IndicatorDescriptionReferences";
        LinkType[LinkType["IndicatorDescriptionResource"] = 94] = "IndicatorDescriptionResource";
        LinkType[LinkType["IndicatorDescriptionResources"] = 95] = "IndicatorDescriptionResources";
        LinkType[LinkType["IndicatorDescription"] = 96] = "IndicatorDescription";
        LinkType[LinkType["IndicatorDescriptions"] = 97] = "IndicatorDescriptions";
        LinkType[LinkType["IndicatorDescriptionHP2020"] = 98] = "IndicatorDescriptionHP2020";
        LinkType[LinkType["IndicatorDescriptionHP2020s"] = 99] = "IndicatorDescriptionHP2020s";
        LinkType[LinkType["IndicatorDescriptionTimeFrame"] = 100] = "IndicatorDescriptionTimeFrame";
        LinkType[LinkType["IndicatorDescriptionTimeFrames"] = 101] = "IndicatorDescriptionTimeFrames";
        LinkType[LinkType["IndicatorDescriptionYear"] = 102] = "IndicatorDescriptionYear";
        LinkType[LinkType["IndicatorDescriptionYears"] = 103] = "IndicatorDescriptionYears";
        LinkType[LinkType["IndicatorDimensionGraph"] = 104] = "IndicatorDimensionGraph";
        LinkType[LinkType["IndicatorDimensionGraphs"] = 105] = "IndicatorDimensionGraphs";
        LinkType[LinkType["IndicatorDimension"] = 106] = "IndicatorDimension";
        LinkType[LinkType["IndicatorDimensions"] = 107] = "IndicatorDimensions";
        LinkType[LinkType["Indicator"] = 108] = "Indicator";
        LinkType[LinkType["Indicators"] = 109] = "Indicators";
        LinkType[LinkType["Initiative"] = 110] = "Initiative";
        LinkType[LinkType["Initiatives"] = 111] = "Initiatives";
        LinkType[LinkType["Intervention"] = 112] = "Intervention";
        LinkType[LinkType["Interventions"] = 113] = "Interventions";
        LinkType[LinkType["Keyword"] = 114] = "Keyword";
        LinkType[LinkType["Keywords"] = 115] = "Keywords";
        LinkType[LinkType["LocaleLevel"] = 116] = "LocaleLevel";
        LinkType[LinkType["LocaleLevels"] = 117] = "LocaleLevels";
        LinkType[LinkType["LocaleRelation"] = 118] = "LocaleRelation";
        LinkType[LinkType["LocaleRelations"] = 119] = "LocaleRelations";
        LinkType[LinkType["Locale"] = 120] = "Locale";
        LinkType[LinkType["Locales"] = 121] = "Locales";
        LinkType[LinkType["MaritalStatus"] = 122] = "MaritalStatus";
        LinkType[LinkType["MaritalStatuses"] = 123] = "MaritalStatuses";
        LinkType[LinkType["MaritalStatusRelation"] = 124] = "MaritalStatusRelation";
        LinkType[LinkType["MaritalStatusRelations"] = 125] = "MaritalStatusRelations";
        LinkType[LinkType["Modifier"] = 126] = "Modifier";
        LinkType[LinkType["Modifiers"] = 127] = "Modifiers";
        LinkType[LinkType["ModifierGraph"] = 128] = "ModifierGraph";
        LinkType[LinkType["ModifierGraphs"] = 129] = "ModifierGraphs";
        LinkType[LinkType["ObesityStatus"] = 130] = "ObesityStatus";
        LinkType[LinkType["ObesityStatuses"] = 131] = "ObesityStatuses";
        LinkType[LinkType["ObesityStatusRelation"] = 132] = "ObesityStatusRelation";
        LinkType[LinkType["ObesityStatusRelations"] = 133] = "ObesityStatusRelations";
        LinkType[LinkType["Other"] = 134] = "Other";
        LinkType[LinkType["Others"] = 135] = "Others";
        LinkType[LinkType["OtherRelation"] = 136] = "OtherRelation";
        LinkType[LinkType["OtherRelations"] = 137] = "OtherRelations";
        LinkType[LinkType["RaceEthnicity"] = 138] = "RaceEthnicity";
        LinkType[LinkType["RaceEthnicities"] = 139] = "RaceEthnicities";
        LinkType[LinkType["RaceEthnicityRelation"] = 140] = "RaceEthnicityRelation";
        LinkType[LinkType["RaceEthnicityRelations"] = 141] = "RaceEthnicityRelations";
        LinkType[LinkType["Sex"] = 142] = "Sex";
        LinkType[LinkType["Sexes"] = 143] = "Sexes";
        LinkType[LinkType["SexRelation"] = 144] = "SexRelation";
        LinkType[LinkType["SexRelations"] = 145] = "SexRelations";
        LinkType[LinkType["SexualOrientation"] = 146] = "SexualOrientation";
        LinkType[LinkType["SexualOrientations"] = 147] = "SexualOrientations";
        LinkType[LinkType["SexualOrientationRelation"] = 148] = "SexualOrientationRelation";
        LinkType[LinkType["SexualOrientationRelations"] = 149] = "SexualOrientationRelations";
        LinkType[LinkType["Timeframe"] = 150] = "Timeframe";
        LinkType[LinkType["Timeframes"] = 151] = "Timeframes";
        LinkType[LinkType["Total"] = 152] = "Total";
        LinkType[LinkType["Totals"] = 153] = "Totals";
        LinkType[LinkType["TotalRelation"] = 154] = "TotalRelation";
        LinkType[LinkType["TotalRelations"] = 155] = "TotalRelations";
        LinkType[LinkType["Url"] = 156] = "Url";
        LinkType[LinkType["Urls"] = 157] = "Urls";
        LinkType[LinkType["ValueLabel"] = 158] = "ValueLabel";
        LinkType[LinkType["ValueLabels"] = 159] = "ValueLabels";
        LinkType[LinkType["VeteranStatus"] = 160] = "VeteranStatus";
        LinkType[LinkType["VeteranStatuses"] = 161] = "VeteranStatuses";
        LinkType[LinkType["VeteranStatusRelation"] = 162] = "VeteranStatusRelation";
        LinkType[LinkType["VeteranStatusRelations"] = 163] = "VeteranStatusRelations";
        LinkType[LinkType["Year"] = 164] = "Year";
        LinkType[LinkType["Years"] = 165] = "Years";
    })(hiw.LinkType || (hiw.LinkType = {}));
    var LinkType = hiw.LinkType;
    (function (ExportFileTypeEnum) {
        ExportFileTypeEnum[ExportFileTypeEnum["Excel"] = 0] = "Excel";
        ExportFileTypeEnum[ExportFileTypeEnum["Excel2003"] = 1] = "Excel2003";
        ExportFileTypeEnum[ExportFileTypeEnum["CSV"] = 2] = "CSV";
    })(hiw.ExportFileTypeEnum || (hiw.ExportFileTypeEnum = {}));
    var ExportFileTypeEnum = hiw.ExportFileTypeEnum;
    (function (IndicatorDescriptionDataSourceDataDescription) {
        IndicatorDescriptionDataSourceDataDescription[IndicatorDescriptionDataSourceDataDescription["Numerator"] = 0] = "Numerator";
        IndicatorDescriptionDataSourceDataDescription[IndicatorDescriptionDataSourceDataDescription["Denominator"] = 1] = "Denominator";
        IndicatorDescriptionDataSourceDataDescription[IndicatorDescriptionDataSourceDataDescription["Both"] = 2] = "Both";
        IndicatorDescriptionDataSourceDataDescription[IndicatorDescriptionDataSourceDataDescription["Other"] = 3] = "Other";
    })(hiw.IndicatorDescriptionDataSourceDataDescription || (hiw.IndicatorDescriptionDataSourceDataDescription = {}));
    var IndicatorDescriptionDataSourceDataDescription = hiw.IndicatorDescriptionDataSourceDataDescription;
    (function (LocaleLevelName) {
        LocaleLevelName[LocaleLevelName["None"] = 0] = "None";
        LocaleLevelName[LocaleLevelName["National"] = 1] = "National";
        LocaleLevelName[LocaleLevelName["State"] = 2] = "State";
        LocaleLevelName[LocaleLevelName["County"] = 3] = "County";
        LocaleLevelName[LocaleLevelName["HospitalReferralRegion"] = 4] = "HospitalReferralRegion";
    })(hiw.LocaleLevelName || (hiw.LocaleLevelName = {}));
    var LocaleLevelName = hiw.LocaleLevelName;
    (function (SystemSettingKeyName) {
        SystemSettingKeyName[SystemSettingKeyName["AuditTableName"] = 0] = "AuditTableName";
        SystemSettingKeyName[SystemSettingKeyName["DataModelVersion"] = 1] = "DataModelVersion";
        SystemSettingKeyName[SystemSettingKeyName["DefaultGuestAccess"] = 2] = "DefaultGuestAccess";
        SystemSettingKeyName[SystemSettingKeyName["RequireStrongPasswords"] = 3] = "RequireStrongPasswords";
        SystemSettingKeyName[SystemSettingKeyName["RootDirectory"] = 4] = "RootDirectory";
        SystemSettingKeyName[SystemSettingKeyName["RootExportPath"] = 5] = "RootExportPath";
        SystemSettingKeyName[SystemSettingKeyName["SessionIDType"] = 6] = "SessionIDType";
        SystemSettingKeyName[SystemSettingKeyName["SessionTimeoutInMinutes"] = 7] = "SessionTimeoutInMinutes";
        SystemSettingKeyName[SystemSettingKeyName["ShadowType"] = 8] = "ShadowType";
        SystemSettingKeyName[SystemSettingKeyName["SystemAbbreviation"] = 9] = "SystemAbbreviation";
        SystemSettingKeyName[SystemSettingKeyName["SystemName"] = 10] = "SystemName";
        SystemSettingKeyName[SystemSettingKeyName["TableListTableName"] = 11] = "TableListTableName";
    })(hiw.SystemSettingKeyName || (hiw.SystemSettingKeyName = {}));
    var SystemSettingKeyName = hiw.SystemSettingKeyName;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var PropertyMap = (function () {
        function PropertyMap(name, apiName) {
            this.name = name;
            this.apiName = apiName;
        }
        PropertyMap.prototype.toString = function () {
            return this.apiName;
        };
        return PropertyMap;
    })();
    hiw.PropertyMap = PropertyMap;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    (function (HttpMethod) {
        HttpMethod[HttpMethod["GET"] = 0] = "GET";
        HttpMethod[HttpMethod["POST"] = 1] = "POST";
    })(hiw.HttpMethod || (hiw.HttpMethod = {}));
    var HttpMethod = hiw.HttpMethod;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var Endpoint = (function () {
        function Endpoint(initializer, method, uriTemplate, call) {
            this.initializer = initializer;
            this.method = method;
            this.uriTemplate = uriTemplate;
            this.call = call;
            this.call["endpoint"] = this;
        }
        Endpoint.addSimple = function (owningType, method, uriTemplate, call) {
            return Endpoint.add(function (o) { return null; }, method, uriTemplate, call);
        };
        Endpoint.addSingle = function (owningType, method, uriTemplate, call) {
            return Endpoint.add(function (o) { return new owningType(); }, method, uriTemplate, call);
        };
        Endpoint.addArray = function (owningType, method, uriTemplate, call) {
            return Endpoint.add(function (o) {
                var array = new Array();
                for (var i = 0; i < o.dataLength; i++)
                    array.push(new owningType());
                return array;
            }, method, uriTemplate, call);
        };
        Endpoint.add = function (initializer, method, uriTemplate, call) {
            var endpoint = new Endpoint(initializer, method, uriTemplate, call);
            hiw.API.Endpoints.push(endpoint);
            return endpoint;
        };
        Endpoint.fromSelf = function () {
            return arguments.callee.caller["endpoint"];
        };
        return Endpoint;
    })();
    hiw.Endpoint = Endpoint;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var Link = (function () {
        function Link() {
            this.relationship = null;
            this.type = null;
            this.typeName = null;
            this.href = null;
        }
        return Link;
    })();
    hiw.Link = Link;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var ServiceObject = (function () {
        function ServiceObject() {
        }
        return ServiceObject;
    })();
    hiw.ServiceObject = ServiceObject;
})(hiw || (hiw = {}));
/// <reference path="Common.ts"/>
var hiw;
(function (hiw) {
    var ServiceDataObject = (function (_super) {
        __extends(ServiceDataObject, _super);
        function ServiceDataObject() {
            _super.apply(this, arguments);
            this.links = new Array();
        }
        ServiceDataObject.prototype.getFields = function () {
            throw "Function not implemented in derived class.";
        };
        ServiceDataObject.prototype.getPropertyMaps = function () {
            var fields = this.getFields();
            var propertyMaps = new Array();
            for (var field in fields)
                propertyMaps.push(fields[field]);
            return propertyMaps;
        };
        ServiceDataObject.prototype.findLinks = function (typeName, relationship, first) {
            if (relationship === void 0) { relationship = null; }
            if (first === void 0) { first = false; }
            var matchingLinks = new Array();
            for (var i = 0; i < this.links.length; i++) {
                var link = this.links[i];
                if (link.typeName === hiw.LinkType[typeName] && (!relationship || link.relationship === relationship)) {
                    if (first)
                        return link;
                    matchingLinks.push(link);
                }
            }
            return matchingLinks;
        };
        /** Recusively fills this instance with the provided data.
         *  @param json A JSON object containing the properties and values to copy to this instance. */
        ServiceDataObject.prototype.fill = function (json, exclude) {
            if (json == null)
                return;
            var propertyMaps = this.getPropertyMaps();
            for (var name in propertyMaps) {
                var map = propertyMaps[name];
                if (json.hasOwnProperty(map.apiName)) {
                    var value = json[map.apiName];
                    if (this[map.name] instanceof ServiceDataObject)
                        this[map.name].fill(value);
                    else
                        this[map.name] = value;
                }
            }
            if (json.Links) {
                this.links = new Array();
                for (var i = 0; i < json.Links.length; i++)
                    this.links.push(hiw.extend(new hiw.Link(), json.Links[i]));
            }
        };
        return ServiceDataObject;
    })(hiw.ServiceObject);
    hiw.ServiceDataObject = ServiceDataObject;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Represents a response received from the API. */
    var APIResponse = (function (_super) {
        __extends(APIResponse, _super);
        function APIResponse(endpoint, url, postData) {
            _super.call(this);
            this.endpoint = endpoint;
            this.url = url;
            this.postData = postData;
        }
        APIResponse.prototype.fill = function (json) {
            if (json == null)
                return;
            this.status = json.Status;
            this.message = json.Message;
            this.dataLength = json.DataLength;
            this.data = APIResponse.fillInstance(this.endpoint.initializer(this), json.Data);
        };
        APIResponse.fillInstance = function (target, source) {
            if (source == null)
                target = null;
            else if (target instanceof hiw.ServiceDataObject)
                target.fill(source);
            else if (Array.isArray(target)) {
                if (Array.isArray(source)) {
                    var dataArray = target;
                    if (dataArray.length == source.length) {
                        for (var i = 0; i < dataArray.length; i++)
                            APIResponse.fillInstance(dataArray[i], source[i]);
                    }
                    else
                        throw "Attempted to fill data array [" + dataArray.length + "] with array [" + source.length + "].";
                }
                else
                    throw "Attempted to fill data array with non-array.";
            }
            else
                target = source;
            return target;
        };
        return APIResponse;
    })(hiw.ServiceObject);
    hiw.APIResponse = APIResponse;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Provides core functionality to interact with the HIW API. */
    var API = (function () {
        /** Creates a new API instance with the provided base URL. */
        function API(apiKey, baseURL) {
            if (apiKey === void 0) { apiKey = null; }
            if (baseURL === void 0) { baseURL = API.DefaultBaseURL; }
            this.apiKey = apiKey;
            this.baseURL = baseURL;
            this.initialize();
        }
        API.prototype.initialize = function () {
        };
        API.parameterizePath = function (path, params) {
            var parameterizedPath = path;
            if (params)
                for (var key in params)
                    parameterizedPath = parameterizedPath.replace("{" + key + "}", params[key]);
            return parameterizedPath;
        };
        API.prototype.executeEndpoint = function (endpoint, callback, params, postData, page) {
            if (page === void 0) { page = 1; }
            var parameterizedPath = null;
            var url = null;
            var async = null;
            if (page != null) {
                params = (params || {});
                params.page = page;
            }
            parameterizedPath = API.parameterizePath(endpoint.uriTemplate, params);
            url = this.baseURL + parameterizedPath;
            async = this.executeUrl(endpoint.method, url, postData, function (json, error) {
                var response = new hiw.APIResponse(endpoint, url, postData);
                if (error == null) {
                    try {
                        response.fill(json);
                    }
                    catch (e) {
                        error = "Error loading JSON into APIResponse instance: " + e.message;
                    }
                }
                //Prefer specific HTTP error message.
                if ("Error" === response.status)
                    error = "Error returned from HIW API call: " + response.message;
                if (callback)
                    callback((response ? response.data : null), response, error);
            });
            return async;
        };
        API.prototype.executeUrl = function (method, url, postData, callback) {
            var request = hiw.getHttpRequest();
            var async = new hiw.Async();
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    var json = null;
                    var error = null;
                    if (request.status === 200) {
                        try {
                            json = JSON.parse(request.responseText);
                        }
                        catch (e) {
                            error = "Error parsing HIW API response as JSON: " + e.message;
                        }
                        if (json == null)
                            error = "Call to HIW API endpoint returned no parsable data.";
                    }
                    else
                        error = "Call to HIW API endpoint \"" + url + "\" returned HTTP status code: " + request.status + " " + request.statusText;
                    if (callback)
                        callback(json, error);
                    async.complete();
                }
            };
            request.open(hiw.HttpMethod[method], url);
            request.setRequestHeader("X-HIW-API-Key", this.apiKey);
            request.setRequestHeader("Accept", "application/json");
            if (method == 1 /* POST */) {
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(postData));
            }
            else
                request.send();
            return async;
        };
        API.verifyApiKey = function (api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        API.DefaultBaseURL = "http://services.healthindicators.gov/v5/REST.svc/";
        API.Endpoints = new Array();
        return API;
    })();
    hiw.API = API;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    /** Contains properties and static functionality for the Age type. */
    var BaseAge = (function (_super) {
        __extends(BaseAge, _super);
        function BaseAge() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentAgeID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseAge.prototype.getFields = function () {
            return BaseAge.Fields;
        };
        /** Gets a list of all of the Ages in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Ages */
        BaseAge.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Ages exist. */
        BaseAge.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Ages method. */
        BaseAge.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Age with the specified primary key.
         *  @param id The primary key of the Age to return.
         *  @return The matching Age, if one exists, or null. */
        BaseAge.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Ages based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Ages which match the provided filter. */
        BaseAge.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Ages exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Ages which match the provided filter. */
        BaseAge.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Ages exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Ageswhich match the provided filter. */
        BaseAge.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Ages by ParentAgeID.
         *  @return An Array of Ages. */
        BaseAge.prototype.getAges = function (api, callback, page) {
            return Age.getByParentAgeID(this.id, api, callback, page);
        };
        /** Gets Ages by ParentAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        BaseAge.getByParentAgeID = function (ageID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID }, null, page);
        };
        /** Gets how many Ages by ParentAgeID exist.
         *  @return An Array of Ages. */
        BaseAge.prototype.getAgesCount = function (api, callback) {
            return Age.getByParentAgeIDCount(this.id, api, callback);
        };
        /** Gets how many Ages by ParentAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        BaseAge.getByParentAgeIDCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Gets how many pages of Ages by ParentAgeID exist.
         *  @return An Array of Ages. */
        BaseAge.prototype.getAgesPageCount = function (api, callback) {
            return Age.getByParentAgeIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Ages by ParentAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        BaseAge.getByParentAgeIDPageCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Returns the related ParentAge based on the unique ID of the related Age.
         *  @return A single Age, or null. */
        BaseAge.prototype.getParentAge = function (api, callback) {
            return Age.getParentAgeForAge(this.id, api, callback);
        };
        /** Returns the related ParentAge based on the unique ID of the related Age.
         *  @param ageID The ID of the Age to retrieve.
         *  @return A single Age, or null. */
        BaseAge.getParentAgeForAge = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        BaseAge.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentAgeID: new hiw.PropertyMap("parentAgeID", "ParentAgeID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseAge;
    })(hiw.ServiceDataObject);
    hiw.BaseAge = BaseAge;
    var Age = (function (_super) {
        __extends(Age, _super);
        function Age() {
            _super.apply(this, arguments);
        }
        return Age;
    })(BaseAge);
    hiw.Age = Age;
    /** Contains properties and static functionality for the AgeRelation type. */
    var BaseAgeRelation = (function (_super) {
        __extends(BaseAgeRelation, _super);
        function BaseAgeRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorAgeID = null;
            this.descendantAgeID = null;
            this.hops = null;
        }
        BaseAgeRelation.prototype.getFields = function () {
            return BaseAgeRelation.Fields;
        };
        /** Gets a list of all of the AgeRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of AgeRelations */
        BaseAgeRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many AgeRelations exist. */
        BaseAgeRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the AgeRelations method. */
        BaseAgeRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the AgeRelation with the specified primary key.
         *  @param id The primary key of the AgeRelation to return.
         *  @return The matching AgeRelation, if one exists, or null. */
        BaseAgeRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of AgeRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All AgeRelations which match the provided filter. */
        BaseAgeRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many AgeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of AgeRelations which match the provided filter. */
        BaseAgeRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of AgeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of AgeRelationswhich match the provided filter. */
        BaseAgeRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets AgeRelations by AncestorAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByAncestorAgeID = function (ageID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID }, null, page);
        };
        /** Gets how many AgeRelations by AncestorAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByAncestorAgeIDCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Gets how many pages of AgeRelations by AncestorAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByAncestorAgeIDPageCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Returns the related AncestorAge based on the unique ID of the related AgeRelation.
         *  @return A single AgeRelation, or null. */
        BaseAgeRelation.prototype.getAncestorAge = function (api, callback) {
            return AgeRelation.getAncestorAgeForAgeRelation(this.id, api, callback);
        };
        /** Returns the related AncestorAge based on the unique ID of the related AgeRelation.
         *  @param ageRelationID The ID of the AgeRelation to retrieve.
         *  @return A single AgeRelation, or null. */
        BaseAgeRelation.getAncestorAgeForAgeRelation = function (ageRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageRelationID: ageRelationID });
        };
        /** Gets AgeRelations by DescendantAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByDescendantAgeID = function (ageID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID }, null, page);
        };
        /** Gets how many AgeRelations by DescendantAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByDescendantAgeIDCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Gets how many pages of AgeRelations by DescendantAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        BaseAgeRelation.getByDescendantAgeIDPageCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Returns the related DescendantAge based on the unique ID of the related AgeRelation.
         *  @return A single AgeRelation, or null. */
        BaseAgeRelation.prototype.getDescendantAge = function (api, callback) {
            return AgeRelation.getDescendantAgeForAgeRelation(this.id, api, callback);
        };
        /** Returns the related DescendantAge based on the unique ID of the related AgeRelation.
         *  @param ageRelationID The ID of the AgeRelation to retrieve.
         *  @return A single AgeRelation, or null. */
        BaseAgeRelation.getDescendantAgeForAgeRelation = function (ageRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageRelationID: ageRelationID });
        };
        BaseAgeRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorAgeID: new hiw.PropertyMap("ancestorAgeID", "AncestorAgeID"),
            descendantAgeID: new hiw.PropertyMap("descendantAgeID", "DescendantAgeID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseAgeRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseAgeRelation = BaseAgeRelation;
    var AgeRelation = (function (_super) {
        __extends(AgeRelation, _super);
        function AgeRelation() {
            _super.apply(this, arguments);
        }
        return AgeRelation;
    })(BaseAgeRelation);
    hiw.AgeRelation = AgeRelation;
    /** Contains properties and static functionality for the CharacteristicOfSchoolOrStudent type. */
    var BaseCharacteristicOfSchoolOrStudent = (function (_super) {
        __extends(BaseCharacteristicOfSchoolOrStudent, _super);
        function BaseCharacteristicOfSchoolOrStudent() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentCharacteristicOfSchoolOrStudentID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseCharacteristicOfSchoolOrStudent.prototype.getFields = function () {
            return BaseCharacteristicOfSchoolOrStudent.Fields;
        };
        /** Gets a list of all of the CharacteristicOfSchoolOrStudents in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CharacteristicOfSchoolOrStudents */
        BaseCharacteristicOfSchoolOrStudent.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many CharacteristicOfSchoolOrStudents exist. */
        BaseCharacteristicOfSchoolOrStudent.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the CharacteristicOfSchoolOrStudents method. */
        BaseCharacteristicOfSchoolOrStudent.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the CharacteristicOfSchoolOrStudent with the specified primary key.
         *  @param id The primary key of the CharacteristicOfSchoolOrStudent to return.
         *  @return The matching CharacteristicOfSchoolOrStudent, if one exists, or null. */
        BaseCharacteristicOfSchoolOrStudent.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of CharacteristicOfSchoolOrStudents based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CharacteristicOfSchoolOrStudents which match the provided filter. */
        BaseCharacteristicOfSchoolOrStudent.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many CharacteristicOfSchoolOrStudents exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CharacteristicOfSchoolOrStudents which match the provided filter. */
        BaseCharacteristicOfSchoolOrStudent.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of CharacteristicOfSchoolOrStudents exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CharacteristicOfSchoolOrStudentswhich match the provided filter. */
        BaseCharacteristicOfSchoolOrStudent.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.prototype.getCharacteristicOfSchoolOrStudents = function (api, callback, page) {
            return CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentID(this.id, api, callback, page);
        };
        /** Gets CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentID = function (characteristicOfSchoolOrStudentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID }, null, page);
        };
        /** Gets how many CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.prototype.getCharacteristicOfSchoolOrStudentsCount = function (api, callback) {
            return CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDCount(this.id, api, callback);
        };
        /** Gets how many CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Gets how many pages of CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.prototype.getCharacteristicOfSchoolOrStudentsPageCount = function (api, callback) {
            return CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        BaseCharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDPageCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Returns the related ParentCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudent.
         *  @return A single CharacteristicOfSchoolOrStudent, or null. */
        BaseCharacteristicOfSchoolOrStudent.prototype.getParentCharacteristicOfSchoolOrStudent = function (api, callback) {
            return CharacteristicOfSchoolOrStudent.getParentCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudent(this.id, api, callback);
        };
        /** Returns the related ParentCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudent.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudent, or null. */
        BaseCharacteristicOfSchoolOrStudent.getParentCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudent = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        BaseCharacteristicOfSchoolOrStudent.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentCharacteristicOfSchoolOrStudentID: new hiw.PropertyMap("parentCharacteristicOfSchoolOrStudentID", "ParentCharacteristicOfSchoolOrStudentID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseCharacteristicOfSchoolOrStudent;
    })(hiw.ServiceDataObject);
    hiw.BaseCharacteristicOfSchoolOrStudent = BaseCharacteristicOfSchoolOrStudent;
    var CharacteristicOfSchoolOrStudent = (function (_super) {
        __extends(CharacteristicOfSchoolOrStudent, _super);
        function CharacteristicOfSchoolOrStudent() {
            _super.apply(this, arguments);
        }
        return CharacteristicOfSchoolOrStudent;
    })(BaseCharacteristicOfSchoolOrStudent);
    hiw.CharacteristicOfSchoolOrStudent = CharacteristicOfSchoolOrStudent;
    /** Contains properties and static functionality for the CharacteristicOfSchoolOrStudentRelation type. */
    var BaseCharacteristicOfSchoolOrStudentRelation = (function (_super) {
        __extends(BaseCharacteristicOfSchoolOrStudentRelation, _super);
        function BaseCharacteristicOfSchoolOrStudentRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorCharacteristicOfSchoolOrStudentID = null;
            this.descendantCharacteristicOfSchoolOrStudentID = null;
            this.hops = null;
        }
        BaseCharacteristicOfSchoolOrStudentRelation.prototype.getFields = function () {
            return BaseCharacteristicOfSchoolOrStudentRelation.Fields;
        };
        /** Gets a list of all of the CharacteristicOfSchoolOrStudentRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CharacteristicOfSchoolOrStudentRelations */
        BaseCharacteristicOfSchoolOrStudentRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many CharacteristicOfSchoolOrStudentRelations exist. */
        BaseCharacteristicOfSchoolOrStudentRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the CharacteristicOfSchoolOrStudentRelations method. */
        BaseCharacteristicOfSchoolOrStudentRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the CharacteristicOfSchoolOrStudentRelation with the specified primary key.
         *  @param id The primary key of the CharacteristicOfSchoolOrStudentRelation to return.
         *  @return The matching CharacteristicOfSchoolOrStudentRelation, if one exists, or null. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of CharacteristicOfSchoolOrStudentRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CharacteristicOfSchoolOrStudentRelations which match the provided filter. */
        BaseCharacteristicOfSchoolOrStudentRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many CharacteristicOfSchoolOrStudentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CharacteristicOfSchoolOrStudentRelations which match the provided filter. */
        BaseCharacteristicOfSchoolOrStudentRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of CharacteristicOfSchoolOrStudentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CharacteristicOfSchoolOrStudentRelationswhich match the provided filter. */
        BaseCharacteristicOfSchoolOrStudentRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentID = function (characteristicOfSchoolOrStudentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID }, null, page);
        };
        /** Gets how many CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentIDCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Gets how many pages of CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentIDPageCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Returns the related AncestorCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        BaseCharacteristicOfSchoolOrStudentRelation.prototype.getAncestorCharacteristicOfSchoolOrStudent = function (api, callback) {
            return CharacteristicOfSchoolOrStudentRelation.getAncestorCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation(this.id, api, callback);
        };
        /** Returns the related AncestorCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @param characteristicOfSchoolOrStudentRelationID The ID of the CharacteristicOfSchoolOrStudentRelation to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        BaseCharacteristicOfSchoolOrStudentRelation.getAncestorCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation = function (characteristicOfSchoolOrStudentRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentRelationID: characteristicOfSchoolOrStudentRelationID });
        };
        /** Gets CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentID = function (characteristicOfSchoolOrStudentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID }, null, page);
        };
        /** Gets how many CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentIDCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Gets how many pages of CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        BaseCharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentIDPageCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Returns the related DescendantCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        BaseCharacteristicOfSchoolOrStudentRelation.prototype.getDescendantCharacteristicOfSchoolOrStudent = function (api, callback) {
            return CharacteristicOfSchoolOrStudentRelation.getDescendantCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation(this.id, api, callback);
        };
        /** Returns the related DescendantCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @param characteristicOfSchoolOrStudentRelationID The ID of the CharacteristicOfSchoolOrStudentRelation to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        BaseCharacteristicOfSchoolOrStudentRelation.getDescendantCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation = function (characteristicOfSchoolOrStudentRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentRelationID: characteristicOfSchoolOrStudentRelationID });
        };
        BaseCharacteristicOfSchoolOrStudentRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorCharacteristicOfSchoolOrStudentID: new hiw.PropertyMap("ancestorCharacteristicOfSchoolOrStudentID", "AncestorCharacteristicOfSchoolOrStudentID"),
            descendantCharacteristicOfSchoolOrStudentID: new hiw.PropertyMap("descendantCharacteristicOfSchoolOrStudentID", "DescendantCharacteristicOfSchoolOrStudentID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseCharacteristicOfSchoolOrStudentRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseCharacteristicOfSchoolOrStudentRelation = BaseCharacteristicOfSchoolOrStudentRelation;
    var CharacteristicOfSchoolOrStudentRelation = (function (_super) {
        __extends(CharacteristicOfSchoolOrStudentRelation, _super);
        function CharacteristicOfSchoolOrStudentRelation() {
            _super.apply(this, arguments);
        }
        return CharacteristicOfSchoolOrStudentRelation;
    })(BaseCharacteristicOfSchoolOrStudentRelation);
    hiw.CharacteristicOfSchoolOrStudentRelation = CharacteristicOfSchoolOrStudentRelation;
    /** Contains properties and static functionality for the CountryOfBirth type. */
    var BaseCountryOfBirth = (function (_super) {
        __extends(BaseCountryOfBirth, _super);
        function BaseCountryOfBirth() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentCountryOfBirthID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseCountryOfBirth.prototype.getFields = function () {
            return BaseCountryOfBirth.Fields;
        };
        /** Gets a list of all of the CountryOfBirths in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CountryOfBirths */
        BaseCountryOfBirth.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many CountryOfBirths exist. */
        BaseCountryOfBirth.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the CountryOfBirths method. */
        BaseCountryOfBirth.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the CountryOfBirth with the specified primary key.
         *  @param id The primary key of the CountryOfBirth to return.
         *  @return The matching CountryOfBirth, if one exists, or null. */
        BaseCountryOfBirth.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of CountryOfBirths based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CountryOfBirths which match the provided filter. */
        BaseCountryOfBirth.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many CountryOfBirths exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CountryOfBirths which match the provided filter. */
        BaseCountryOfBirth.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of CountryOfBirths exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CountryOfBirthswhich match the provided filter. */
        BaseCountryOfBirth.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets CountryOfBirths by ParentCountryOfBirthID.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.prototype.getCountryOfBirths = function (api, callback, page) {
            return CountryOfBirth.getByParentCountryOfBirthID(this.id, api, callback, page);
        };
        /** Gets CountryOfBirths by ParentCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.getByParentCountryOfBirthID = function (countryOfBirthID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID }, null, page);
        };
        /** Gets how many CountryOfBirths by ParentCountryOfBirthID exist.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.prototype.getCountryOfBirthsCount = function (api, callback) {
            return CountryOfBirth.getByParentCountryOfBirthIDCount(this.id, api, callback);
        };
        /** Gets how many CountryOfBirths by ParentCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.getByParentCountryOfBirthIDCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Gets how many pages of CountryOfBirths by ParentCountryOfBirthID exist.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.prototype.getCountryOfBirthsPageCount = function (api, callback) {
            return CountryOfBirth.getByParentCountryOfBirthIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of CountryOfBirths by ParentCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        BaseCountryOfBirth.getByParentCountryOfBirthIDPageCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Returns the related ParentCountryOfBirth based on the unique ID of the related CountryOfBirth.
         *  @return A single CountryOfBirth, or null. */
        BaseCountryOfBirth.prototype.getParentCountryOfBirth = function (api, callback) {
            return CountryOfBirth.getParentCountryOfBirthForCountryOfBirth(this.id, api, callback);
        };
        /** Returns the related ParentCountryOfBirth based on the unique ID of the related CountryOfBirth.
         *  @param countryOfBirthID The ID of the CountryOfBirth to retrieve.
         *  @return A single CountryOfBirth, or null. */
        BaseCountryOfBirth.getParentCountryOfBirthForCountryOfBirth = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        BaseCountryOfBirth.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentCountryOfBirthID: new hiw.PropertyMap("parentCountryOfBirthID", "ParentCountryOfBirthID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseCountryOfBirth;
    })(hiw.ServiceDataObject);
    hiw.BaseCountryOfBirth = BaseCountryOfBirth;
    var CountryOfBirth = (function (_super) {
        __extends(CountryOfBirth, _super);
        function CountryOfBirth() {
            _super.apply(this, arguments);
        }
        return CountryOfBirth;
    })(BaseCountryOfBirth);
    hiw.CountryOfBirth = CountryOfBirth;
    /** Contains properties and static functionality for the CountryOfBirthRelation type. */
    var BaseCountryOfBirthRelation = (function (_super) {
        __extends(BaseCountryOfBirthRelation, _super);
        function BaseCountryOfBirthRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorCountryOfBirthID = null;
            this.descendantCountryOfBirthID = null;
            this.hops = null;
        }
        BaseCountryOfBirthRelation.prototype.getFields = function () {
            return BaseCountryOfBirthRelation.Fields;
        };
        /** Gets a list of all of the CountryOfBirthRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CountryOfBirthRelations */
        BaseCountryOfBirthRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many CountryOfBirthRelations exist. */
        BaseCountryOfBirthRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the CountryOfBirthRelations method. */
        BaseCountryOfBirthRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the CountryOfBirthRelation with the specified primary key.
         *  @param id The primary key of the CountryOfBirthRelation to return.
         *  @return The matching CountryOfBirthRelation, if one exists, or null. */
        BaseCountryOfBirthRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of CountryOfBirthRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CountryOfBirthRelations which match the provided filter. */
        BaseCountryOfBirthRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many CountryOfBirthRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CountryOfBirthRelations which match the provided filter. */
        BaseCountryOfBirthRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of CountryOfBirthRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CountryOfBirthRelationswhich match the provided filter. */
        BaseCountryOfBirthRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets CountryOfBirthRelations by AncestorCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByAncestorCountryOfBirthID = function (countryOfBirthID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID }, null, page);
        };
        /** Gets how many CountryOfBirthRelations by AncestorCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByAncestorCountryOfBirthIDCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Gets how many pages of CountryOfBirthRelations by AncestorCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByAncestorCountryOfBirthIDPageCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Returns the related AncestorCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @return A single CountryOfBirthRelation, or null. */
        BaseCountryOfBirthRelation.prototype.getAncestorCountryOfBirth = function (api, callback) {
            return CountryOfBirthRelation.getAncestorCountryOfBirthForCountryOfBirthRelation(this.id, api, callback);
        };
        /** Returns the related AncestorCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @param countryOfBirthRelationID The ID of the CountryOfBirthRelation to retrieve.
         *  @return A single CountryOfBirthRelation, or null. */
        BaseCountryOfBirthRelation.getAncestorCountryOfBirthForCountryOfBirthRelation = function (countryOfBirthRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthRelationID: countryOfBirthRelationID });
        };
        /** Gets CountryOfBirthRelations by DescendantCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByDescendantCountryOfBirthID = function (countryOfBirthID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID }, null, page);
        };
        /** Gets how many CountryOfBirthRelations by DescendantCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByDescendantCountryOfBirthIDCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Gets how many pages of CountryOfBirthRelations by DescendantCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        BaseCountryOfBirthRelation.getByDescendantCountryOfBirthIDPageCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Returns the related DescendantCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @return A single CountryOfBirthRelation, or null. */
        BaseCountryOfBirthRelation.prototype.getDescendantCountryOfBirth = function (api, callback) {
            return CountryOfBirthRelation.getDescendantCountryOfBirthForCountryOfBirthRelation(this.id, api, callback);
        };
        /** Returns the related DescendantCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @param countryOfBirthRelationID The ID of the CountryOfBirthRelation to retrieve.
         *  @return A single CountryOfBirthRelation, or null. */
        BaseCountryOfBirthRelation.getDescendantCountryOfBirthForCountryOfBirthRelation = function (countryOfBirthRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthRelationID: countryOfBirthRelationID });
        };
        BaseCountryOfBirthRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorCountryOfBirthID: new hiw.PropertyMap("ancestorCountryOfBirthID", "AncestorCountryOfBirthID"),
            descendantCountryOfBirthID: new hiw.PropertyMap("descendantCountryOfBirthID", "DescendantCountryOfBirthID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseCountryOfBirthRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseCountryOfBirthRelation = BaseCountryOfBirthRelation;
    var CountryOfBirthRelation = (function (_super) {
        __extends(CountryOfBirthRelation, _super);
        function CountryOfBirthRelation() {
            _super.apply(this, arguments);
        }
        return CountryOfBirthRelation;
    })(BaseCountryOfBirthRelation);
    hiw.CountryOfBirthRelation = CountryOfBirthRelation;
    /** Contains properties and static functionality for the DataCategory type. */
    var BaseDataCategory = (function (_super) {
        __extends(BaseDataCategory, _super);
        function BaseDataCategory() {
            _super.apply(this, arguments);
            this.id = null;
            this.rank = null;
            this.rankName = null;
            this.parentDataCategoryID = null;
            this.number = null;
            this.acronym = null;
            this.header = null;
            this.name = null;
            this.sortOrder = null;
            this.description = null;
            this.initiativeID = null;
            this.treeGraph = null;
            this.categoryGraph = null;
            this.modifyDate = null;
        }
        BaseDataCategory.prototype.getFields = function () {
            return BaseDataCategory.Fields;
        };
        /** Gets a list of all of the DataCategories in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataCategories */
        BaseDataCategory.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataCategories exist. */
        BaseDataCategory.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataCategories method. */
        BaseDataCategory.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataCategory with the specified primary key.
         *  @param id The primary key of the DataCategory to return.
         *  @return The matching DataCategory, if one exists, or null. */
        BaseDataCategory.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataCategories based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataCategories which match the provided filter. */
        BaseDataCategory.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataCategories which match the provided filter. */
        BaseDataCategory.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataCategorieswhich match the provided filter. */
        BaseDataCategory.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DataCategories by ParentDataCategoryID.
         *  @return An Array of DataCategories. */
        BaseDataCategory.prototype.getParentDataCategories = function (api, callback, page) {
            return DataCategory.getByParentDataCategoryID(this.id, api, callback, page);
        };
        /** Gets DataCategories by ParentDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByParentDataCategoryID = function (dataCategoryID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID }, null, page);
        };
        /** Gets how many DataCategories by ParentDataCategoryID exist.
         *  @return An Array of DataCategories. */
        BaseDataCategory.prototype.getParentDataCategoriesCount = function (api, callback) {
            return DataCategory.getByParentDataCategoryIDCount(this.id, api, callback);
        };
        /** Gets how many DataCategories by ParentDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByParentDataCategoryIDCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Gets how many pages of DataCategories by ParentDataCategoryID exist.
         *  @return An Array of DataCategories. */
        BaseDataCategory.prototype.getParentDataCategoriesPageCount = function (api, callback) {
            return DataCategory.getByParentDataCategoryIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of DataCategories by ParentDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByParentDataCategoryIDPageCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Returns the related ParentDataCategory based on the unique ID of the related DataCategory.
         *  @return A single DataCategory, or null. */
        BaseDataCategory.prototype.getParentDataCategory = function (api, callback) {
            return DataCategory.getParentDataCategoryForDataCategory(this.id, api, callback);
        };
        /** Returns the related ParentDataCategory based on the unique ID of the related DataCategory.
         *  @param dataCategoryID The ID of the DataCategory to retrieve.
         *  @return A single DataCategory, or null. */
        BaseDataCategory.getParentDataCategoryForDataCategory = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Gets DataCategories by InitiativeID.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByInitiativeID = function (initiativeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID }, null, page);
        };
        /** Gets how many DataCategories by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByInitiativeIDCount = function (initiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID });
        };
        /** Gets how many pages of DataCategories by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        BaseDataCategory.getByInitiativeIDPageCount = function (initiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID });
        };
        /** Returns the related Initiative based on the unique ID of the related DataCategory.
         *  @return A single DataCategory, or null. */
        BaseDataCategory.prototype.getInitiative = function (api, callback) {
            return DataCategory.getInitiativeForDataCategory(this.id, api, callback);
        };
        /** Returns the related Initiative based on the unique ID of the related DataCategory.
         *  @param dataCategoryID The ID of the DataCategory to retrieve.
         *  @return A single DataCategory, or null. */
        BaseDataCategory.getInitiativeForDataCategory = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        BaseDataCategory.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            rank: new hiw.PropertyMap("rank", "Rank"),
            rankName: new hiw.PropertyMap("rankName", "RankName"),
            parentDataCategoryID: new hiw.PropertyMap("parentDataCategoryID", "ParentDataCategoryID"),
            number: new hiw.PropertyMap("number", "Number"),
            acronym: new hiw.PropertyMap("acronym", "Acronym"),
            header: new hiw.PropertyMap("header", "Header"),
            name: new hiw.PropertyMap("name", "Name"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            description: new hiw.PropertyMap("description", "Description"),
            initiativeID: new hiw.PropertyMap("initiativeID", "InitiativeID"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            categoryGraph: new hiw.PropertyMap("categoryGraph", "CategoryGraph"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate")
        };
        return BaseDataCategory;
    })(hiw.ServiceDataObject);
    hiw.BaseDataCategory = BaseDataCategory;
    var DataCategory = (function (_super) {
        __extends(DataCategory, _super);
        function DataCategory() {
            _super.apply(this, arguments);
        }
        return DataCategory;
    })(BaseDataCategory);
    hiw.DataCategory = DataCategory;
    /** Contains properties and static functionality for the DataCategoryRelation type. */
    var BaseDataCategoryRelation = (function (_super) {
        __extends(BaseDataCategoryRelation, _super);
        function BaseDataCategoryRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorDataCategoryID = null;
            this.descendantDataCategoryID = null;
            this.hops = null;
        }
        BaseDataCategoryRelation.prototype.getFields = function () {
            return BaseDataCategoryRelation.Fields;
        };
        /** Gets a list of all of the DataCategoryRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataCategoryRelations */
        BaseDataCategoryRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataCategoryRelations exist. */
        BaseDataCategoryRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataCategoryRelations method. */
        BaseDataCategoryRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataCategoryRelation with the specified primary key.
         *  @param id The primary key of the DataCategoryRelation to return.
         *  @return The matching DataCategoryRelation, if one exists, or null. */
        BaseDataCategoryRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataCategoryRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataCategoryRelations which match the provided filter. */
        BaseDataCategoryRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataCategoryRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataCategoryRelations which match the provided filter. */
        BaseDataCategoryRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataCategoryRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataCategoryRelationswhich match the provided filter. */
        BaseDataCategoryRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DataCategoryRelations by AncestorDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByAncestorDataCategoryID = function (dataCategoryID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID }, null, page);
        };
        /** Gets how many DataCategoryRelations by AncestorDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByAncestorDataCategoryIDCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Gets how many pages of DataCategoryRelations by AncestorDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByAncestorDataCategoryIDPageCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Returns the related AncestorDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @return A single DataCategoryRelation, or null. */
        BaseDataCategoryRelation.prototype.getAncestorDataCategory = function (api, callback) {
            return DataCategoryRelation.getAncestorDataCategoryForDataCategoryRelation(this.id, api, callback);
        };
        /** Returns the related AncestorDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @param dataCategoryRelationID The ID of the DataCategoryRelation to retrieve.
         *  @return A single DataCategoryRelation, or null. */
        BaseDataCategoryRelation.getAncestorDataCategoryForDataCategoryRelation = function (dataCategoryRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryRelationID: dataCategoryRelationID });
        };
        /** Gets DataCategoryRelations by DescendantDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByDescendantDataCategoryID = function (dataCategoryID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID }, null, page);
        };
        /** Gets how many DataCategoryRelations by DescendantDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByDescendantDataCategoryIDCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Gets how many pages of DataCategoryRelations by DescendantDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        BaseDataCategoryRelation.getByDescendantDataCategoryIDPageCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Returns the related DescendantDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @return A single DataCategoryRelation, or null. */
        BaseDataCategoryRelation.prototype.getDescendantDataCategory = function (api, callback) {
            return DataCategoryRelation.getDescendantDataCategoryForDataCategoryRelation(this.id, api, callback);
        };
        /** Returns the related DescendantDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @param dataCategoryRelationID The ID of the DataCategoryRelation to retrieve.
         *  @return A single DataCategoryRelation, or null. */
        BaseDataCategoryRelation.getDescendantDataCategoryForDataCategoryRelation = function (dataCategoryRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryRelationID: dataCategoryRelationID });
        };
        BaseDataCategoryRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorDataCategoryID: new hiw.PropertyMap("ancestorDataCategoryID", "AncestorDataCategoryID"),
            descendantDataCategoryID: new hiw.PropertyMap("descendantDataCategoryID", "DescendantDataCategoryID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseDataCategoryRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseDataCategoryRelation = BaseDataCategoryRelation;
    var DataCategoryRelation = (function (_super) {
        __extends(DataCategoryRelation, _super);
        function DataCategoryRelation() {
            _super.apply(this, arguments);
        }
        return DataCategoryRelation;
    })(BaseDataCategoryRelation);
    hiw.DataCategoryRelation = DataCategoryRelation;
    /** Contains properties and static functionality for the DataSourceDataSupplier type. */
    var BaseDataSourceDataSupplier = (function (_super) {
        __extends(BaseDataSourceDataSupplier, _super);
        function BaseDataSourceDataSupplier() {
            _super.apply(this, arguments);
            this.id = null;
            this.dataSourceID = null;
            this.dataSupplierID = null;
            this.modificationDate = null;
        }
        BaseDataSourceDataSupplier.prototype.getFields = function () {
            return BaseDataSourceDataSupplier.Fields;
        };
        /** Gets a list of all of the DataSourceDataSuppliers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSourceDataSuppliers */
        BaseDataSourceDataSupplier.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataSourceDataSuppliers exist. */
        BaseDataSourceDataSupplier.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataSourceDataSuppliers method. */
        BaseDataSourceDataSupplier.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataSourceDataSupplier with the specified primary key.
         *  @param id The primary key of the DataSourceDataSupplier to return.
         *  @return The matching DataSourceDataSupplier, if one exists, or null. */
        BaseDataSourceDataSupplier.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataSourceDataSuppliers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSourceDataSuppliers which match the provided filter. */
        BaseDataSourceDataSupplier.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataSourceDataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSourceDataSuppliers which match the provided filter. */
        BaseDataSourceDataSupplier.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataSourceDataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceDataSupplierswhich match the provided filter. */
        BaseDataSourceDataSupplier.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DataSourceDataSuppliers by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSourceID = function (dataSourceID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID }, null, page);
        };
        /** Gets how many DataSourceDataSuppliers by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSourceIDCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Gets how many pages of DataSourceDataSuppliers by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSourceIDPageCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Returns the related DataSource based on the unique ID of the related DataSourceDataSupplier.
         *  @return A single DataSourceDataSupplier, or null. */
        BaseDataSourceDataSupplier.prototype.getDataSource = function (api, callback) {
            return DataSourceDataSupplier.getDataSourceForDataSourceDataSupplier(this.id, api, callback);
        };
        /** Returns the related DataSource based on the unique ID of the related DataSourceDataSupplier.
         *  @param dataSourceDataSupplierID The ID of the DataSourceDataSupplier to retrieve.
         *  @return A single DataSourceDataSupplier, or null. */
        BaseDataSourceDataSupplier.getDataSourceForDataSourceDataSupplier = function (dataSourceDataSupplierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceDataSupplierID: dataSourceDataSupplierID });
        };
        /** Gets DataSourceDataSuppliers by DataSupplierID.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSupplierID = function (dataSupplierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSupplierID: dataSupplierID }, null, page);
        };
        /** Gets how many DataSourceDataSuppliers by DataSupplierID exist.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSupplierIDCount = function (dataSupplierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSupplierID: dataSupplierID });
        };
        /** Gets how many pages of DataSourceDataSuppliers by DataSupplierID exist.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        BaseDataSourceDataSupplier.getByDataSupplierIDPageCount = function (dataSupplierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSupplierID: dataSupplierID });
        };
        /** Returns the related DataSupplier based on the unique ID of the related DataSourceDataSupplier.
         *  @return A single DataSourceDataSupplier, or null. */
        BaseDataSourceDataSupplier.prototype.getDataSupplier = function (api, callback) {
            return DataSourceDataSupplier.getDataSupplierForDataSourceDataSupplier(this.id, api, callback);
        };
        /** Returns the related DataSupplier based on the unique ID of the related DataSourceDataSupplier.
         *  @param dataSourceDataSupplierID The ID of the DataSourceDataSupplier to retrieve.
         *  @return A single DataSourceDataSupplier, or null. */
        BaseDataSourceDataSupplier.getDataSupplierForDataSourceDataSupplier = function (dataSourceDataSupplierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceDataSupplierID: dataSourceDataSupplierID });
        };
        BaseDataSourceDataSupplier.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            dataSourceID: new hiw.PropertyMap("dataSourceID", "DataSourceID"),
            dataSupplierID: new hiw.PropertyMap("dataSupplierID", "DataSupplierID"),
            modificationDate: new hiw.PropertyMap("modificationDate", "ModificationDate")
        };
        return BaseDataSourceDataSupplier;
    })(hiw.ServiceDataObject);
    hiw.BaseDataSourceDataSupplier = BaseDataSourceDataSupplier;
    var DataSourceDataSupplier = (function (_super) {
        __extends(DataSourceDataSupplier, _super);
        function DataSourceDataSupplier() {
            _super.apply(this, arguments);
        }
        return DataSourceDataSupplier;
    })(BaseDataSourceDataSupplier);
    hiw.DataSourceDataSupplier = DataSourceDataSupplier;
    /** Contains properties and static functionality for the DataSource type. */
    var BaseDataSource = (function (_super) {
        __extends(BaseDataSource, _super);
        function BaseDataSource() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.acronym = null;
            this.dataLimitations = null;
            this.dataYearsAvailable = null;
            this.periodicity = null;
            this.mode = null;
            this.description = null;
            this.shortDescription = null;
            this.selectedContent = null;
            this.populationCovered = null;
            this.methodology = null;
            this.responseRateAndSampleSize = null;
            this.interpretationIssues = null;
            this.suppressionCriteria = null;
            this.references1 = null;
            this.references2 = null;
            this.references3 = null;
            this.references4 = null;
            this.sortOrder = null;
            this.modifyDate = null;
            this.showMe = null;
        }
        BaseDataSource.prototype.getFields = function () {
            return BaseDataSource.Fields;
        };
        /** Gets a list of all of the DataSources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSources */
        BaseDataSource.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataSources exist. */
        BaseDataSource.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataSources method. */
        BaseDataSource.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataSource with the specified primary key.
         *  @param id The primary key of the DataSource to return.
         *  @return The matching DataSource, if one exists, or null. */
        BaseDataSource.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataSources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSources which match the provided filter. */
        BaseDataSource.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSources which match the provided filter. */
        BaseDataSource.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceswhich match the provided filter. */
        BaseDataSource.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseDataSource.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            acronym: new hiw.PropertyMap("acronym", "Acronym"),
            dataLimitations: new hiw.PropertyMap("dataLimitations", "DataLimitations"),
            dataYearsAvailable: new hiw.PropertyMap("dataYearsAvailable", "DataYearsAvailable"),
            periodicity: new hiw.PropertyMap("periodicity", "Periodicity"),
            mode: new hiw.PropertyMap("mode", "Mode"),
            description: new hiw.PropertyMap("description", "Description"),
            shortDescription: new hiw.PropertyMap("shortDescription", "ShortDescription"),
            selectedContent: new hiw.PropertyMap("selectedContent", "SelectedContent"),
            populationCovered: new hiw.PropertyMap("populationCovered", "PopulationCovered"),
            methodology: new hiw.PropertyMap("methodology", "Methodology"),
            responseRateAndSampleSize: new hiw.PropertyMap("responseRateAndSampleSize", "ResponseRateAndSampleSize"),
            interpretationIssues: new hiw.PropertyMap("interpretationIssues", "InterpretationIssues"),
            suppressionCriteria: new hiw.PropertyMap("suppressionCriteria", "SuppressionCriteria"),
            references1: new hiw.PropertyMap("references1", "References1"),
            references2: new hiw.PropertyMap("references2", "References2"),
            references3: new hiw.PropertyMap("references3", "References3"),
            references4: new hiw.PropertyMap("references4", "References4"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate"),
            showMe: new hiw.PropertyMap("showMe", "ShowMe")
        };
        return BaseDataSource;
    })(hiw.ServiceDataObject);
    hiw.BaseDataSource = BaseDataSource;
    var DataSource = (function (_super) {
        __extends(DataSource, _super);
        function DataSource() {
            _super.apply(this, arguments);
        }
        return DataSource;
    })(BaseDataSource);
    hiw.DataSource = DataSource;
    /** Contains properties and static functionality for the DataSourceURL type. */
    var BaseDataSourceURL = (function (_super) {
        __extends(BaseDataSourceURL, _super);
        function BaseDataSourceURL() {
            _super.apply(this, arguments);
            this.id = null;
            this.dataSourceID = null;
            this.urlID = null;
            this.sortOrder = null;
        }
        BaseDataSourceURL.prototype.getFields = function () {
            return BaseDataSourceURL.Fields;
        };
        /** Gets a list of all of the DataSourceURLs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSourceURLs */
        BaseDataSourceURL.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataSourceURLs exist. */
        BaseDataSourceURL.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataSourceURLs method. */
        BaseDataSourceURL.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataSourceURL with the specified primary key.
         *  @param id The primary key of the DataSourceURL to return.
         *  @return The matching DataSourceURL, if one exists, or null. */
        BaseDataSourceURL.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataSourceURLs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSourceURLs which match the provided filter. */
        BaseDataSourceURL.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataSourceURLs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSourceURLs which match the provided filter. */
        BaseDataSourceURL.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataSourceURLs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceURLswhich match the provided filter. */
        BaseDataSourceURL.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DataSourceURLs by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByDataSourceID = function (dataSourceID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID }, null, page);
        };
        /** Gets how many DataSourceURLs by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByDataSourceIDCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Gets how many pages of DataSourceURLs by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByDataSourceIDPageCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Returns the related DataSource based on the unique ID of the related DataSourceURL.
         *  @return A single DataSourceURL, or null. */
        BaseDataSourceURL.prototype.getDataSource = function (api, callback) {
            return DataSourceURL.getDataSourceForDataSourceURL(this.id, api, callback);
        };
        /** Returns the related DataSource based on the unique ID of the related DataSourceURL.
         *  @param dataSourceURLID The ID of the DataSourceURL to retrieve.
         *  @return A single DataSourceURL, or null. */
        BaseDataSourceURL.getDataSourceForDataSourceURL = function (dataSourceURLID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceURLID: dataSourceURLID });
        };
        /** Gets DataSourceURLs by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many DataSourceURLs by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of DataSourceURLs by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        BaseDataSourceURL.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related DataSourceURL.
         *  @return A single DataSourceURL, or null. */
        BaseDataSourceURL.prototype.getUrl = function (api, callback) {
            return DataSourceURL.getUrlForDataSourceURL(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related DataSourceURL.
         *  @param dataSourceURLID The ID of the DataSourceURL to retrieve.
         *  @return A single DataSourceURL, or null. */
        BaseDataSourceURL.getUrlForDataSourceURL = function (dataSourceURLID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceURLID: dataSourceURLID });
        };
        BaseDataSourceURL.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            dataSourceID: new hiw.PropertyMap("dataSourceID", "DataSourceID"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseDataSourceURL;
    })(hiw.ServiceDataObject);
    hiw.BaseDataSourceURL = BaseDataSourceURL;
    var DataSourceURL = (function (_super) {
        __extends(DataSourceURL, _super);
        function DataSourceURL() {
            _super.apply(this, arguments);
        }
        return DataSourceURL;
    })(BaseDataSourceURL);
    hiw.DataSourceURL = DataSourceURL;
    /** Contains properties and static functionality for the DataSupplier type. */
    var BaseDataSupplier = (function (_super) {
        __extends(BaseDataSupplier, _super);
        function BaseDataSupplier() {
            _super.apply(this, arguments);
            this.id = null;
            this.acronym = null;
            this.name = null;
            this.description = null;
            this.shortDescription = null;
            this.urlID = null;
            this.sortOrder = null;
            this.modifyDate = null;
            this.validationDate = null;
            this.validationStatus = null;
        }
        BaseDataSupplier.prototype.getFields = function () {
            return BaseDataSupplier.Fields;
        };
        /** Gets a list of all of the DataSuppliers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSuppliers */
        BaseDataSupplier.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DataSuppliers exist. */
        BaseDataSupplier.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DataSuppliers method. */
        BaseDataSupplier.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DataSupplier with the specified primary key.
         *  @param id The primary key of the DataSupplier to return.
         *  @return The matching DataSupplier, if one exists, or null. */
        BaseDataSupplier.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DataSuppliers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSuppliers which match the provided filter. */
        BaseDataSupplier.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSuppliers which match the provided filter. */
        BaseDataSupplier.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSupplierswhich match the provided filter. */
        BaseDataSupplier.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DataSuppliers by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        BaseDataSupplier.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many DataSuppliers by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        BaseDataSupplier.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of DataSuppliers by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        BaseDataSupplier.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related DataSupplier.
         *  @return A single DataSupplier, or null. */
        BaseDataSupplier.prototype.getUrl = function (api, callback) {
            return DataSupplier.getUrlForDataSupplier(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related DataSupplier.
         *  @param dataSupplierID The ID of the DataSupplier to retrieve.
         *  @return A single DataSupplier, or null. */
        BaseDataSupplier.getUrlForDataSupplier = function (dataSupplierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSupplierID: dataSupplierID });
        };
        BaseDataSupplier.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            acronym: new hiw.PropertyMap("acronym", "Acronym"),
            name: new hiw.PropertyMap("name", "Name"),
            description: new hiw.PropertyMap("description", "Description"),
            shortDescription: new hiw.PropertyMap("shortDescription", "ShortDescription"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate"),
            validationDate: new hiw.PropertyMap("validationDate", "ValidationDate"),
            validationStatus: new hiw.PropertyMap("validationStatus", "ValidationStatus")
        };
        return BaseDataSupplier;
    })(hiw.ServiceDataObject);
    hiw.BaseDataSupplier = BaseDataSupplier;
    var DataSupplier = (function (_super) {
        __extends(DataSupplier, _super);
        function DataSupplier() {
            _super.apply(this, arguments);
        }
        return DataSupplier;
    })(BaseDataSupplier);
    hiw.DataSupplier = DataSupplier;
    /** Contains properties and static functionality for the DimensionBook type. */
    var BaseDimensionBook = (function (_super) {
        __extends(BaseDimensionBook, _super);
        function BaseDimensionBook() {
            _super.apply(this, arguments);
            this.id = null;
            this.key = null;
            this.dimension = null;
            this.name = null;
            this.IsHeader = null;
            this.indentedName = null;
            this.parentDimensionBookID = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
            this.dimensionListID = null;
            this.chartName = null;
            this.downloadName = null;
        }
        BaseDimensionBook.prototype.getFields = function () {
            return BaseDimensionBook.Fields;
        };
        /** Gets a list of all of the DimensionBooks in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionBooks */
        BaseDimensionBook.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DimensionBooks exist. */
        BaseDimensionBook.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DimensionBooks method. */
        BaseDimensionBook.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DimensionBook with the specified primary key.
         *  @param id The primary key of the DimensionBook to return.
         *  @return The matching DimensionBook, if one exists, or null. */
        BaseDimensionBook.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DimensionBooks based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionBooks which match the provided filter. */
        BaseDimensionBook.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DimensionBooks exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionBooks which match the provided filter. */
        BaseDimensionBook.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DimensionBooks exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionBookswhich match the provided filter. */
        BaseDimensionBook.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DimensionBooks by ParentDimensionBookID.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.prototype.getDimensionBooks = function (api, callback, page) {
            return DimensionBook.getByParentDimensionBookID(this.id, api, callback, page);
        };
        /** Gets DimensionBooks by ParentDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByParentDimensionBookID = function (dimensionBookID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID }, null, page);
        };
        /** Gets how many DimensionBooks by ParentDimensionBookID exist.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.prototype.getDimensionBooksCount = function (api, callback) {
            return DimensionBook.getByParentDimensionBookIDCount(this.id, api, callback);
        };
        /** Gets how many DimensionBooks by ParentDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByParentDimensionBookIDCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets how many pages of DimensionBooks by ParentDimensionBookID exist.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.prototype.getDimensionBooksPageCount = function (api, callback) {
            return DimensionBook.getByParentDimensionBookIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of DimensionBooks by ParentDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByParentDimensionBookIDPageCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Returns the related ParentDimensionBook based on the unique ID of the related DimensionBook.
         *  @return A single DimensionBook, or null. */
        BaseDimensionBook.prototype.getParentDimensionBook = function (api, callback) {
            return DimensionBook.getParentDimensionBookForDimensionBook(this.id, api, callback);
        };
        /** Returns the related ParentDimensionBook based on the unique ID of the related DimensionBook.
         *  @param dimensionBookID The ID of the DimensionBook to retrieve.
         *  @return A single DimensionBook, or null. */
        BaseDimensionBook.getParentDimensionBookForDimensionBook = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets DimensionBooks by DimensionListID.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByDimensionListID = function (dimensionListID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID }, null, page);
        };
        /** Gets how many DimensionBooks by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByDimensionListIDCount = function (dimensionListID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID });
        };
        /** Gets how many pages of DimensionBooks by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        BaseDimensionBook.getByDimensionListIDPageCount = function (dimensionListID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID });
        };
        /** Returns the related DimensionList based on the unique ID of the related DimensionBook.
         *  @return A single DimensionBook, or null. */
        BaseDimensionBook.prototype.getDimensionList = function (api, callback) {
            return DimensionBook.getDimensionListForDimensionBook(this.id, api, callback);
        };
        /** Returns the related DimensionList based on the unique ID of the related DimensionBook.
         *  @param dimensionBookID The ID of the DimensionBook to retrieve.
         *  @return A single DimensionBook, or null. */
        BaseDimensionBook.getDimensionListForDimensionBook = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets a unique DimensionBook based on the provided values.
         *  @return A single DimensionBook, or null. */
        BaseDimensionBook.getByKey = function (key, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { key: key });
        };
        BaseDimensionBook.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            key: new hiw.PropertyMap("key", "Key"),
            dimension: new hiw.PropertyMap("dimension", "Dimension"),
            name: new hiw.PropertyMap("name", "Name"),
            IsHeader: new hiw.PropertyMap("IsHeader", "IsHeader"),
            indentedName: new hiw.PropertyMap("indentedName", "IndentedName"),
            parentDimensionBookID: new hiw.PropertyMap("parentDimensionBookID", "ParentDimensionBookID"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth"),
            dimensionListID: new hiw.PropertyMap("dimensionListID", "DimensionListID"),
            chartName: new hiw.PropertyMap("chartName", "ChartName"),
            downloadName: new hiw.PropertyMap("downloadName", "DownloadName")
        };
        return BaseDimensionBook;
    })(hiw.ServiceDataObject);
    hiw.BaseDimensionBook = BaseDimensionBook;
    var DimensionBook = (function (_super) {
        __extends(DimensionBook, _super);
        function DimensionBook() {
            _super.apply(this, arguments);
        }
        return DimensionBook;
    })(BaseDimensionBook);
    hiw.DimensionBook = DimensionBook;
    /** Contains properties and static functionality for the DimensionBookRelation type. */
    var BaseDimensionBookRelation = (function (_super) {
        __extends(BaseDimensionBookRelation, _super);
        function BaseDimensionBookRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorDimensionBookID = null;
            this.descendantDimensionBookID = null;
            this.hops = null;
        }
        BaseDimensionBookRelation.prototype.getFields = function () {
            return BaseDimensionBookRelation.Fields;
        };
        /** Gets a list of all of the DimensionBookRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionBookRelations */
        BaseDimensionBookRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DimensionBookRelations exist. */
        BaseDimensionBookRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DimensionBookRelations method. */
        BaseDimensionBookRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DimensionBookRelation with the specified primary key.
         *  @param id The primary key of the DimensionBookRelation to return.
         *  @return The matching DimensionBookRelation, if one exists, or null. */
        BaseDimensionBookRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DimensionBookRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionBookRelations which match the provided filter. */
        BaseDimensionBookRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DimensionBookRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionBookRelations which match the provided filter. */
        BaseDimensionBookRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DimensionBookRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionBookRelationswhich match the provided filter. */
        BaseDimensionBookRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DimensionBookRelations by AncestorDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByAncestorDimensionBookID = function (dimensionBookID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID }, null, page);
        };
        /** Gets how many DimensionBookRelations by AncestorDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByAncestorDimensionBookIDCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets how many pages of DimensionBookRelations by AncestorDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByAncestorDimensionBookIDPageCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Returns the related AncestorDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @return A single DimensionBookRelation, or null. */
        BaseDimensionBookRelation.prototype.getAncestorDimensionBook = function (api, callback) {
            return DimensionBookRelation.getAncestorDimensionBookForDimensionBookRelation(this.id, api, callback);
        };
        /** Returns the related AncestorDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @param dimensionBookRelationID The ID of the DimensionBookRelation to retrieve.
         *  @return A single DimensionBookRelation, or null. */
        BaseDimensionBookRelation.getAncestorDimensionBookForDimensionBookRelation = function (dimensionBookRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookRelationID: dimensionBookRelationID });
        };
        /** Gets DimensionBookRelations by DescendantDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByDescendantDimensionBookID = function (dimensionBookID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID }, null, page);
        };
        /** Gets how many DimensionBookRelations by DescendantDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByDescendantDimensionBookIDCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets how many pages of DimensionBookRelations by DescendantDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        BaseDimensionBookRelation.getByDescendantDimensionBookIDPageCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Returns the related DescendantDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @return A single DimensionBookRelation, or null. */
        BaseDimensionBookRelation.prototype.getDescendantDimensionBook = function (api, callback) {
            return DimensionBookRelation.getDescendantDimensionBookForDimensionBookRelation(this.id, api, callback);
        };
        /** Returns the related DescendantDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @param dimensionBookRelationID The ID of the DimensionBookRelation to retrieve.
         *  @return A single DimensionBookRelation, or null. */
        BaseDimensionBookRelation.getDescendantDimensionBookForDimensionBookRelation = function (dimensionBookRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookRelationID: dimensionBookRelationID });
        };
        BaseDimensionBookRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorDimensionBookID: new hiw.PropertyMap("ancestorDimensionBookID", "AncestorDimensionBookID"),
            descendantDimensionBookID: new hiw.PropertyMap("descendantDimensionBookID", "DescendantDimensionBookID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseDimensionBookRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseDimensionBookRelation = BaseDimensionBookRelation;
    var DimensionBookRelation = (function (_super) {
        __extends(DimensionBookRelation, _super);
        function DimensionBookRelation() {
            _super.apply(this, arguments);
        }
        return DimensionBookRelation;
    })(BaseDimensionBookRelation);
    hiw.DimensionBookRelation = DimensionBookRelation;
    /** Contains properties and static functionality for the DimensionGraph type. */
    var BaseDimensionGraph = (function (_super) {
        __extends(BaseDimensionGraph, _super);
        function BaseDimensionGraph() {
            _super.apply(this, arguments);
            this.id = null;
            this.header = null;
            this.label = null;
            this.dimensionGraphLabel = null;
            this.dimensionList = null;
            this.dimensionValueIDList = null;
            this.dimensionValueKeyList = null;
            this.dimensionValueList = null;
            this.dimensionCount = null;
            this.headerSortOrder = null;
            this.dimensionGraphSortOrder = null;
            this.totalValue = null;
            this.totalID = null;
            this.totalKey = null;
            this.totalSortOrder = null;
            this.ageValue = null;
            this.ageID = null;
            this.ageKey = null;
            this.ageSortOrder = null;
            this.sexValue = null;
            this.sexID = null;
            this.sexKey = null;
            this.sexSortOrder = null;
            this.raceEthnicityValue = null;
            this.raceEthnicityID = null;
            this.raceEthnicityKey = null;
            this.raceEthnicitySortOrder = null;
            this.incomeAndPovertyStatusValue = null;
            this.incomeAndPovertyStatusID = null;
            this.incomeAndPovertyStatusKey = null;
            this.incomeAndPovertyStatusSortOrder = null;
            this.educationalAttainmentValue = null;
            this.educationalAttainmentID = null;
            this.educationalAttainmentKey = null;
            this.educationalAttainmentSortOrder = null;
            this.healthInsuranceStatusValue = null;
            this.healthInsuranceStatusID = null;
            this.healthInsuranceStatusKey = null;
            this.healthInsuranceStatusSortOrder = null;
            this.sexualOrientationValue = null;
            this.sexualOrientationID = null;
            this.sexualOrientationKey = null;
            this.sexualOrientationSortOrder = null;
            this.familyTypeValue = null;
            this.familyTypeID = null;
            this.familyTypeKey = null;
            this.familyTypeSortOrder = null;
            this.maritalStatusValue = null;
            this.maritalStatusID = null;
            this.maritalStatusKey = null;
            this.maritalStatusSortOrder = null;
            this.veteranStatusValue = null;
            this.veteranStatusID = null;
            this.veteranStatusKey = null;
            this.veteranStatusSortOrder = null;
            this.countryOfBirthValue = null;
            this.countryOfBirthID = null;
            this.countryOfBirthKey = null;
            this.countryOfBirthSortOrder = null;
            this.disabilityStatusValue = null;
            this.disabilityStatusID = null;
            this.disabilityStatusKey = null;
            this.disabilityStatusSortOrder = null;
            this.obesityStatusValue = null;
            this.obesityStatusID = null;
            this.obesityStatusKey = null;
            this.obesityStatusSortOrder = null;
            this.characteristicOfSchoolOrStudentValue = null;
            this.characteristicOfSchoolOrStudentID = null;
            this.characteristicOfSchoolOrStudentKey = null;
            this.characteristicOfSchoolOrStudentSortOrder = null;
            this.otherValue = null;
            this.otherID = null;
            this.otherKey = null;
            this.otherSortOrder = null;
            this.geographyValue = null;
            this.geographyID = null;
            this.geographyKey = null;
            this.geographySortOrder = null;
        }
        BaseDimensionGraph.prototype.getFields = function () {
            return BaseDimensionGraph.Fields;
        };
        /** Gets a list of all of the DimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionGraphs */
        BaseDimensionGraph.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DimensionGraphs exist. */
        BaseDimensionGraph.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DimensionGraphs method. */
        BaseDimensionGraph.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DimensionGraph with the specified primary key.
         *  @param id The primary key of the DimensionGraph to return.
         *  @return The matching DimensionGraph, if one exists, or null. */
        BaseDimensionGraph.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionGraphs which match the provided filter. */
        BaseDimensionGraph.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionGraphs which match the provided filter. */
        BaseDimensionGraph.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionGraphswhich match the provided filter. */
        BaseDimensionGraph.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DimensionGraphs by TotalID.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByTotalID = function (totalID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID }, null, page);
        };
        /** Gets how many DimensionGraphs by TotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByTotalIDCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Gets how many pages of DimensionGraphs by TotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByTotalIDPageCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Returns the related Total based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getTotal = function (api, callback) {
            return DimensionGraph.getTotalForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related Total based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getTotalForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by AgeID.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByAgeID = function (ageID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID }, null, page);
        };
        /** Gets how many DimensionGraphs by AgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByAgeIDCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Gets how many pages of DimensionGraphs by AgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByAgeIDPageCount = function (ageID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ageID: ageID });
        };
        /** Returns the related Age based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getAge = function (api, callback) {
            return DimensionGraph.getAgeForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related Age based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getAgeForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by SexID.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexID = function (sexID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID }, null, page);
        };
        /** Gets how many DimensionGraphs by SexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexIDCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Gets how many pages of DimensionGraphs by SexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexIDPageCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Returns the related Sex based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getSex = function (api, callback) {
            return DimensionGraph.getSexForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related Sex based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getSexForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by RaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByRaceEthnicityID = function (raceEthnicityID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID }, null, page);
        };
        /** Gets how many DimensionGraphs by RaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByRaceEthnicityIDCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Gets how many pages of DimensionGraphs by RaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByRaceEthnicityIDPageCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Returns the related RaceEthnicity based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getRaceEthnicity = function (api, callback) {
            return DimensionGraph.getRaceEthnicityForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related RaceEthnicity based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getRaceEthnicityForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by IncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByIncomeAndPovertyStatusID = function (incomeAndPovertyStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by IncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByIncomeAndPovertyStatusIDCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Gets how many pages of DimensionGraphs by IncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByIncomeAndPovertyStatusIDPageCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Returns the related IncomeAndPovertyStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getIncomeAndPovertyStatus = function (api, callback) {
            return DimensionGraph.getIncomeAndPovertyStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related IncomeAndPovertyStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getIncomeAndPovertyStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by EducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByEducationalAttainmentID = function (educationalAttainmentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID }, null, page);
        };
        /** Gets how many DimensionGraphs by EducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByEducationalAttainmentIDCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Gets how many pages of DimensionGraphs by EducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByEducationalAttainmentIDPageCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Returns the related EducationalAttainment based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getEducationalAttainment = function (api, callback) {
            return DimensionGraph.getEducationalAttainmentForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related EducationalAttainment based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getEducationalAttainmentForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by HealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByHealthInsuranceStatusID = function (healthInsuranceStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by HealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByHealthInsuranceStatusIDCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Gets how many pages of DimensionGraphs by HealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByHealthInsuranceStatusIDPageCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Returns the related HealthInsuranceStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getHealthInsuranceStatus = function (api, callback) {
            return DimensionGraph.getHealthInsuranceStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related HealthInsuranceStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getHealthInsuranceStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by SexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexualOrientationID = function (sexualOrientationID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID }, null, page);
        };
        /** Gets how many DimensionGraphs by SexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexualOrientationIDCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Gets how many pages of DimensionGraphs by SexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getBySexualOrientationIDPageCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Returns the related SexualOrientation based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getSexualOrientation = function (api, callback) {
            return DimensionGraph.getSexualOrientationForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related SexualOrientation based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getSexualOrientationForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by FamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByFamilyTypeID = function (familyTypeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID }, null, page);
        };
        /** Gets how many DimensionGraphs by FamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByFamilyTypeIDCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Gets how many pages of DimensionGraphs by FamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByFamilyTypeIDPageCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Returns the related FamilyType based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getFamilyType = function (api, callback) {
            return DimensionGraph.getFamilyTypeForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related FamilyType based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getFamilyTypeForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by MaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByMaritalStatusID = function (maritalStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by MaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByMaritalStatusIDCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Gets how many pages of DimensionGraphs by MaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByMaritalStatusIDPageCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Returns the related MaritalStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getMaritalStatus = function (api, callback) {
            return DimensionGraph.getMaritalStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related MaritalStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getMaritalStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by VeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByVeteranStatusID = function (veteranStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by VeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByVeteranStatusIDCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Gets how many pages of DimensionGraphs by VeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByVeteranStatusIDPageCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Returns the related VeteranStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getVeteranStatus = function (api, callback) {
            return DimensionGraph.getVeteranStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related VeteranStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getVeteranStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by CountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCountryOfBirthID = function (countryOfBirthID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID }, null, page);
        };
        /** Gets how many DimensionGraphs by CountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCountryOfBirthIDCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Gets how many pages of DimensionGraphs by CountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCountryOfBirthIDPageCount = function (countryOfBirthID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { countryOfBirthID: countryOfBirthID });
        };
        /** Returns the related CountryOfBirth based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getCountryOfBirth = function (api, callback) {
            return DimensionGraph.getCountryOfBirthForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related CountryOfBirth based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getCountryOfBirthForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by DisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByDisabilityStatusID = function (disabilityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by DisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByDisabilityStatusIDCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Gets how many pages of DimensionGraphs by DisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByDisabilityStatusIDPageCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Returns the related DisabilityStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getDisabilityStatus = function (api, callback) {
            return DimensionGraph.getDisabilityStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related DisabilityStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getDisabilityStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by ObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByObesityStatusID = function (obesityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID }, null, page);
        };
        /** Gets how many DimensionGraphs by ObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByObesityStatusIDCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Gets how many pages of DimensionGraphs by ObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByObesityStatusIDPageCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Returns the related ObesityStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getObesityStatus = function (api, callback) {
            return DimensionGraph.getObesityStatusForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related ObesityStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getObesityStatusForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by CharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCharacteristicOfSchoolOrStudentID = function (characteristicOfSchoolOrStudentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID }, null, page);
        };
        /** Gets how many DimensionGraphs by CharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCharacteristicOfSchoolOrStudentIDCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Gets how many pages of DimensionGraphs by CharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByCharacteristicOfSchoolOrStudentIDPageCount = function (characteristicOfSchoolOrStudentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { characteristicOfSchoolOrStudentID: characteristicOfSchoolOrStudentID });
        };
        /** Returns the related CharacteristicOfSchoolOrStudent based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getCharacteristicOfSchoolOrStudent = function (api, callback) {
            return DimensionGraph.getCharacteristicOfSchoolOrStudentForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related CharacteristicOfSchoolOrStudent based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getCharacteristicOfSchoolOrStudentForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by OtherID.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByOtherID = function (otherID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID }, null, page);
        };
        /** Gets how many DimensionGraphs by OtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByOtherIDCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Gets how many pages of DimensionGraphs by OtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByOtherIDPageCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Returns the related Other based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getOther = function (api, callback) {
            return DimensionGraph.getOtherForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related Other based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getOtherForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets DimensionGraphs by GeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByGeographyID = function (geographyID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID }, null, page);
        };
        /** Gets how many DimensionGraphs by GeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByGeographyIDCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Gets how many pages of DimensionGraphs by GeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        BaseDimensionGraph.getByGeographyIDPageCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Returns the related Geography based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.prototype.getGeography = function (api, callback) {
            return DimensionGraph.getGeographyForDimensionGraph(this.id, api, callback);
        };
        /** Returns the related Geography based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        BaseDimensionGraph.getGeographyForDimensionGraph = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        BaseDimensionGraph.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            header: new hiw.PropertyMap("header", "Header"),
            label: new hiw.PropertyMap("label", "Label"),
            dimensionGraphLabel: new hiw.PropertyMap("dimensionGraphLabel", "DimensionGraphLabel"),
            dimensionList: new hiw.PropertyMap("dimensionList", "DimensionList"),
            dimensionValueIDList: new hiw.PropertyMap("dimensionValueIDList", "DimensionValueIDList"),
            dimensionValueKeyList: new hiw.PropertyMap("dimensionValueKeyList", "DimensionValueKeyList"),
            dimensionValueList: new hiw.PropertyMap("dimensionValueList", "DimensionValueList"),
            dimensionCount: new hiw.PropertyMap("dimensionCount", "DimensionCount"),
            headerSortOrder: new hiw.PropertyMap("headerSortOrder", "HeaderSortOrder"),
            dimensionGraphSortOrder: new hiw.PropertyMap("dimensionGraphSortOrder", "DimensionGraphSortOrder"),
            totalValue: new hiw.PropertyMap("totalValue", "TotalValue"),
            totalID: new hiw.PropertyMap("totalID", "TotalID"),
            totalKey: new hiw.PropertyMap("totalKey", "TotalKey"),
            totalSortOrder: new hiw.PropertyMap("totalSortOrder", "TotalSortOrder"),
            ageValue: new hiw.PropertyMap("ageValue", "AgeValue"),
            ageID: new hiw.PropertyMap("ageID", "AgeID"),
            ageKey: new hiw.PropertyMap("ageKey", "AgeKey"),
            ageSortOrder: new hiw.PropertyMap("ageSortOrder", "AgeSortOrder"),
            sexValue: new hiw.PropertyMap("sexValue", "SexValue"),
            sexID: new hiw.PropertyMap("sexID", "SexID"),
            sexKey: new hiw.PropertyMap("sexKey", "SexKey"),
            sexSortOrder: new hiw.PropertyMap("sexSortOrder", "SexSortOrder"),
            raceEthnicityValue: new hiw.PropertyMap("raceEthnicityValue", "RaceEthnicityValue"),
            raceEthnicityID: new hiw.PropertyMap("raceEthnicityID", "RaceEthnicityID"),
            raceEthnicityKey: new hiw.PropertyMap("raceEthnicityKey", "RaceEthnicityKey"),
            raceEthnicitySortOrder: new hiw.PropertyMap("raceEthnicitySortOrder", "RaceEthnicitySortOrder"),
            incomeAndPovertyStatusValue: new hiw.PropertyMap("incomeAndPovertyStatusValue", "IncomeAndPovertyStatusValue"),
            incomeAndPovertyStatusID: new hiw.PropertyMap("incomeAndPovertyStatusID", "IncomeAndPovertyStatusID"),
            incomeAndPovertyStatusKey: new hiw.PropertyMap("incomeAndPovertyStatusKey", "IncomeAndPovertyStatusKey"),
            incomeAndPovertyStatusSortOrder: new hiw.PropertyMap("incomeAndPovertyStatusSortOrder", "IncomeAndPovertyStatusSortOrder"),
            educationalAttainmentValue: new hiw.PropertyMap("educationalAttainmentValue", "EducationalAttainmentValue"),
            educationalAttainmentID: new hiw.PropertyMap("educationalAttainmentID", "EducationalAttainmentID"),
            educationalAttainmentKey: new hiw.PropertyMap("educationalAttainmentKey", "EducationalAttainmentKey"),
            educationalAttainmentSortOrder: new hiw.PropertyMap("educationalAttainmentSortOrder", "EducationalAttainmentSortOrder"),
            healthInsuranceStatusValue: new hiw.PropertyMap("healthInsuranceStatusValue", "HealthInsuranceStatusValue"),
            healthInsuranceStatusID: new hiw.PropertyMap("healthInsuranceStatusID", "HealthInsuranceStatusID"),
            healthInsuranceStatusKey: new hiw.PropertyMap("healthInsuranceStatusKey", "HealthInsuranceStatusKey"),
            healthInsuranceStatusSortOrder: new hiw.PropertyMap("healthInsuranceStatusSortOrder", "HealthInsuranceStatusSortOrder"),
            sexualOrientationValue: new hiw.PropertyMap("sexualOrientationValue", "SexualOrientationValue"),
            sexualOrientationID: new hiw.PropertyMap("sexualOrientationID", "SexualOrientationID"),
            sexualOrientationKey: new hiw.PropertyMap("sexualOrientationKey", "SexualOrientationKey"),
            sexualOrientationSortOrder: new hiw.PropertyMap("sexualOrientationSortOrder", "SexualOrientationSortOrder"),
            familyTypeValue: new hiw.PropertyMap("familyTypeValue", "FamilyTypeValue"),
            familyTypeID: new hiw.PropertyMap("familyTypeID", "FamilyTypeID"),
            familyTypeKey: new hiw.PropertyMap("familyTypeKey", "FamilyTypeKey"),
            familyTypeSortOrder: new hiw.PropertyMap("familyTypeSortOrder", "FamilyTypeSortOrder"),
            maritalStatusValue: new hiw.PropertyMap("maritalStatusValue", "MaritalStatusValue"),
            maritalStatusID: new hiw.PropertyMap("maritalStatusID", "MaritalStatusID"),
            maritalStatusKey: new hiw.PropertyMap("maritalStatusKey", "MaritalStatusKey"),
            maritalStatusSortOrder: new hiw.PropertyMap("maritalStatusSortOrder", "MaritalStatusSortOrder"),
            veteranStatusValue: new hiw.PropertyMap("veteranStatusValue", "VeteranStatusValue"),
            veteranStatusID: new hiw.PropertyMap("veteranStatusID", "VeteranStatusID"),
            veteranStatusKey: new hiw.PropertyMap("veteranStatusKey", "VeteranStatusKey"),
            veteranStatusSortOrder: new hiw.PropertyMap("veteranStatusSortOrder", "VeteranStatusSortOrder"),
            countryOfBirthValue: new hiw.PropertyMap("countryOfBirthValue", "CountryOfBirthValue"),
            countryOfBirthID: new hiw.PropertyMap("countryOfBirthID", "CountryOfBirthID"),
            countryOfBirthKey: new hiw.PropertyMap("countryOfBirthKey", "CountryOfBirthKey"),
            countryOfBirthSortOrder: new hiw.PropertyMap("countryOfBirthSortOrder", "CountryOfBirthSortOrder"),
            disabilityStatusValue: new hiw.PropertyMap("disabilityStatusValue", "DisabilityStatusValue"),
            disabilityStatusID: new hiw.PropertyMap("disabilityStatusID", "DisabilityStatusID"),
            disabilityStatusKey: new hiw.PropertyMap("disabilityStatusKey", "DisabilityStatusKey"),
            disabilityStatusSortOrder: new hiw.PropertyMap("disabilityStatusSortOrder", "DisabilityStatusSortOrder"),
            obesityStatusValue: new hiw.PropertyMap("obesityStatusValue", "ObesityStatusValue"),
            obesityStatusID: new hiw.PropertyMap("obesityStatusID", "ObesityStatusID"),
            obesityStatusKey: new hiw.PropertyMap("obesityStatusKey", "ObesityStatusKey"),
            obesityStatusSortOrder: new hiw.PropertyMap("obesityStatusSortOrder", "ObesityStatusSortOrder"),
            characteristicOfSchoolOrStudentValue: new hiw.PropertyMap("characteristicOfSchoolOrStudentValue", "CharacteristicOfSchoolOrStudentValue"),
            characteristicOfSchoolOrStudentID: new hiw.PropertyMap("characteristicOfSchoolOrStudentID", "CharacteristicOfSchoolOrStudentID"),
            characteristicOfSchoolOrStudentKey: new hiw.PropertyMap("characteristicOfSchoolOrStudentKey", "CharacteristicOfSchoolOrStudentKey"),
            characteristicOfSchoolOrStudentSortOrder: new hiw.PropertyMap("characteristicOfSchoolOrStudentSortOrder", "CharacteristicOfSchoolOrStudentSortOrder"),
            otherValue: new hiw.PropertyMap("otherValue", "OtherValue"),
            otherID: new hiw.PropertyMap("otherID", "OtherID"),
            otherKey: new hiw.PropertyMap("otherKey", "OtherKey"),
            otherSortOrder: new hiw.PropertyMap("otherSortOrder", "OtherSortOrder"),
            geographyValue: new hiw.PropertyMap("geographyValue", "GeographyValue"),
            geographyID: new hiw.PropertyMap("geographyID", "GeographyID"),
            geographyKey: new hiw.PropertyMap("geographyKey", "GeographyKey"),
            geographySortOrder: new hiw.PropertyMap("geographySortOrder", "GeographySortOrder")
        };
        return BaseDimensionGraph;
    })(hiw.ServiceDataObject);
    hiw.BaseDimensionGraph = BaseDimensionGraph;
    var DimensionGraph = (function (_super) {
        __extends(DimensionGraph, _super);
        function DimensionGraph() {
            _super.apply(this, arguments);
        }
        return DimensionGraph;
    })(BaseDimensionGraph);
    hiw.DimensionGraph = DimensionGraph;
    /** Contains properties and static functionality for the DimensionList type. */
    var BaseDimensionList = (function (_super) {
        __extends(BaseDimensionList, _super);
        function BaseDimensionList() {
            _super.apply(this, arguments);
            this.id = null;
            this.singular = null;
            this.descriptiveName = null;
            this.singularDescriptiveName = null;
            this.IsActive = null;
        }
        BaseDimensionList.prototype.getFields = function () {
            return BaseDimensionList.Fields;
        };
        /** Gets a list of all of the DimensionLists in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionLists */
        BaseDimensionList.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DimensionLists exist. */
        BaseDimensionList.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DimensionLists method. */
        BaseDimensionList.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DimensionList with the specified primary key.
         *  @param id The primary key of the DimensionList to return.
         *  @return The matching DimensionList, if one exists, or null. */
        BaseDimensionList.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DimensionLists based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionLists which match the provided filter. */
        BaseDimensionList.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DimensionLists exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionLists which match the provided filter. */
        BaseDimensionList.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DimensionLists exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionListswhich match the provided filter. */
        BaseDimensionList.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseDimensionList.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            singular: new hiw.PropertyMap("singular", "Singular"),
            descriptiveName: new hiw.PropertyMap("descriptiveName", "DescriptiveName"),
            singularDescriptiveName: new hiw.PropertyMap("singularDescriptiveName", "SingularDescriptiveName"),
            IsActive: new hiw.PropertyMap("IsActive", "IsActive")
        };
        return BaseDimensionList;
    })(hiw.ServiceDataObject);
    hiw.BaseDimensionList = BaseDimensionList;
    var DimensionList = (function (_super) {
        __extends(DimensionList, _super);
        function DimensionList() {
            _super.apply(this, arguments);
        }
        return DimensionList;
    })(BaseDimensionList);
    hiw.DimensionList = DimensionList;
    /** Contains properties and static functionality for the DisabilityStatus type. */
    var BaseDisabilityStatus = (function (_super) {
        __extends(BaseDisabilityStatus, _super);
        function BaseDisabilityStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentDisabilityStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseDisabilityStatus.prototype.getFields = function () {
            return BaseDisabilityStatus.Fields;
        };
        /** Gets a list of all of the DisabilityStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DisabilityStatuses */
        BaseDisabilityStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DisabilityStatuses exist. */
        BaseDisabilityStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DisabilityStatuses method. */
        BaseDisabilityStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DisabilityStatus with the specified primary key.
         *  @param id The primary key of the DisabilityStatus to return.
         *  @return The matching DisabilityStatus, if one exists, or null. */
        BaseDisabilityStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DisabilityStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DisabilityStatuses which match the provided filter. */
        BaseDisabilityStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DisabilityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DisabilityStatuses which match the provided filter. */
        BaseDisabilityStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DisabilityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DisabilityStatuseswhich match the provided filter. */
        BaseDisabilityStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DisabilityStatuses by ParentDisabilityStatusID.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.prototype.getDisabilityStatuses = function (api, callback, page) {
            return DisabilityStatus.getByParentDisabilityStatusID(this.id, api, callback, page);
        };
        /** Gets DisabilityStatuses by ParentDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.getByParentDisabilityStatusID = function (disabilityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID }, null, page);
        };
        /** Gets how many DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.prototype.getDisabilityStatusesCount = function (api, callback) {
            return DisabilityStatus.getByParentDisabilityStatusIDCount(this.id, api, callback);
        };
        /** Gets how many DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.getByParentDisabilityStatusIDCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Gets how many pages of DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.prototype.getDisabilityStatusesPageCount = function (api, callback) {
            return DisabilityStatus.getByParentDisabilityStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        BaseDisabilityStatus.getByParentDisabilityStatusIDPageCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Returns the related ParentDisabilityStatus based on the unique ID of the related DisabilityStatus.
         *  @return A single DisabilityStatus, or null. */
        BaseDisabilityStatus.prototype.getParentDisabilityStatus = function (api, callback) {
            return DisabilityStatus.getParentDisabilityStatusForDisabilityStatus(this.id, api, callback);
        };
        /** Returns the related ParentDisabilityStatus based on the unique ID of the related DisabilityStatus.
         *  @param disabilityStatusID The ID of the DisabilityStatus to retrieve.
         *  @return A single DisabilityStatus, or null. */
        BaseDisabilityStatus.getParentDisabilityStatusForDisabilityStatus = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        BaseDisabilityStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentDisabilityStatusID: new hiw.PropertyMap("parentDisabilityStatusID", "ParentDisabilityStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseDisabilityStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseDisabilityStatus = BaseDisabilityStatus;
    var DisabilityStatus = (function (_super) {
        __extends(DisabilityStatus, _super);
        function DisabilityStatus() {
            _super.apply(this, arguments);
        }
        return DisabilityStatus;
    })(BaseDisabilityStatus);
    hiw.DisabilityStatus = DisabilityStatus;
    /** Contains properties and static functionality for the DisabilityStatusRelation type. */
    var BaseDisabilityStatusRelation = (function (_super) {
        __extends(BaseDisabilityStatusRelation, _super);
        function BaseDisabilityStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorDisabilityStatusID = null;
            this.descendantDisabilityStatusID = null;
            this.hops = null;
        }
        BaseDisabilityStatusRelation.prototype.getFields = function () {
            return BaseDisabilityStatusRelation.Fields;
        };
        /** Gets a list of all of the DisabilityStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DisabilityStatusRelations */
        BaseDisabilityStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many DisabilityStatusRelations exist. */
        BaseDisabilityStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the DisabilityStatusRelations method. */
        BaseDisabilityStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the DisabilityStatusRelation with the specified primary key.
         *  @param id The primary key of the DisabilityStatusRelation to return.
         *  @return The matching DisabilityStatusRelation, if one exists, or null. */
        BaseDisabilityStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of DisabilityStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DisabilityStatusRelations which match the provided filter. */
        BaseDisabilityStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many DisabilityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DisabilityStatusRelations which match the provided filter. */
        BaseDisabilityStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of DisabilityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DisabilityStatusRelationswhich match the provided filter. */
        BaseDisabilityStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets DisabilityStatusRelations by AncestorDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByAncestorDisabilityStatusID = function (disabilityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID }, null, page);
        };
        /** Gets how many DisabilityStatusRelations by AncestorDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByAncestorDisabilityStatusIDCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Gets how many pages of DisabilityStatusRelations by AncestorDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByAncestorDisabilityStatusIDPageCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Returns the related AncestorDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @return A single DisabilityStatusRelation, or null. */
        BaseDisabilityStatusRelation.prototype.getAncestorDisabilityStatus = function (api, callback) {
            return DisabilityStatusRelation.getAncestorDisabilityStatusForDisabilityStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @param disabilityStatusRelationID The ID of the DisabilityStatusRelation to retrieve.
         *  @return A single DisabilityStatusRelation, or null. */
        BaseDisabilityStatusRelation.getAncestorDisabilityStatusForDisabilityStatusRelation = function (disabilityStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusRelationID: disabilityStatusRelationID });
        };
        /** Gets DisabilityStatusRelations by DescendantDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByDescendantDisabilityStatusID = function (disabilityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID }, null, page);
        };
        /** Gets how many DisabilityStatusRelations by DescendantDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByDescendantDisabilityStatusIDCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Gets how many pages of DisabilityStatusRelations by DescendantDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        BaseDisabilityStatusRelation.getByDescendantDisabilityStatusIDPageCount = function (disabilityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusID: disabilityStatusID });
        };
        /** Returns the related DescendantDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @return A single DisabilityStatusRelation, or null. */
        BaseDisabilityStatusRelation.prototype.getDescendantDisabilityStatus = function (api, callback) {
            return DisabilityStatusRelation.getDescendantDisabilityStatusForDisabilityStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @param disabilityStatusRelationID The ID of the DisabilityStatusRelation to retrieve.
         *  @return A single DisabilityStatusRelation, or null. */
        BaseDisabilityStatusRelation.getDescendantDisabilityStatusForDisabilityStatusRelation = function (disabilityStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { disabilityStatusRelationID: disabilityStatusRelationID });
        };
        BaseDisabilityStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorDisabilityStatusID: new hiw.PropertyMap("ancestorDisabilityStatusID", "AncestorDisabilityStatusID"),
            descendantDisabilityStatusID: new hiw.PropertyMap("descendantDisabilityStatusID", "DescendantDisabilityStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseDisabilityStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseDisabilityStatusRelation = BaseDisabilityStatusRelation;
    var DisabilityStatusRelation = (function (_super) {
        __extends(DisabilityStatusRelation, _super);
        function DisabilityStatusRelation() {
            _super.apply(this, arguments);
        }
        return DisabilityStatusRelation;
    })(BaseDisabilityStatusRelation);
    hiw.DisabilityStatusRelation = DisabilityStatusRelation;
    /** Contains properties and static functionality for the EducationalAttainment type. */
    var BaseEducationalAttainment = (function (_super) {
        __extends(BaseEducationalAttainment, _super);
        function BaseEducationalAttainment() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentEducationalAttainmentID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseEducationalAttainment.prototype.getFields = function () {
            return BaseEducationalAttainment.Fields;
        };
        /** Gets a list of all of the EducationalAttainments in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of EducationalAttainments */
        BaseEducationalAttainment.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many EducationalAttainments exist. */
        BaseEducationalAttainment.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the EducationalAttainments method. */
        BaseEducationalAttainment.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the EducationalAttainment with the specified primary key.
         *  @param id The primary key of the EducationalAttainment to return.
         *  @return The matching EducationalAttainment, if one exists, or null. */
        BaseEducationalAttainment.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of EducationalAttainments based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All EducationalAttainments which match the provided filter. */
        BaseEducationalAttainment.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many EducationalAttainments exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of EducationalAttainments which match the provided filter. */
        BaseEducationalAttainment.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of EducationalAttainments exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of EducationalAttainmentswhich match the provided filter. */
        BaseEducationalAttainment.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets EducationalAttainments by ParentEducationalAttainmentID.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.prototype.getEducationalAttainments = function (api, callback, page) {
            return EducationalAttainment.getByParentEducationalAttainmentID(this.id, api, callback, page);
        };
        /** Gets EducationalAttainments by ParentEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.getByParentEducationalAttainmentID = function (educationalAttainmentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID }, null, page);
        };
        /** Gets how many EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.prototype.getEducationalAttainmentsCount = function (api, callback) {
            return EducationalAttainment.getByParentEducationalAttainmentIDCount(this.id, api, callback);
        };
        /** Gets how many EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.getByParentEducationalAttainmentIDCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Gets how many pages of EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.prototype.getEducationalAttainmentsPageCount = function (api, callback) {
            return EducationalAttainment.getByParentEducationalAttainmentIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        BaseEducationalAttainment.getByParentEducationalAttainmentIDPageCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Returns the related ParentEducationalAttainment based on the unique ID of the related EducationalAttainment.
         *  @return A single EducationalAttainment, or null. */
        BaseEducationalAttainment.prototype.getParentEducationalAttainment = function (api, callback) {
            return EducationalAttainment.getParentEducationalAttainmentForEducationalAttainment(this.id, api, callback);
        };
        /** Returns the related ParentEducationalAttainment based on the unique ID of the related EducationalAttainment.
         *  @param educationalAttainmentID The ID of the EducationalAttainment to retrieve.
         *  @return A single EducationalAttainment, or null. */
        BaseEducationalAttainment.getParentEducationalAttainmentForEducationalAttainment = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        BaseEducationalAttainment.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentEducationalAttainmentID: new hiw.PropertyMap("parentEducationalAttainmentID", "ParentEducationalAttainmentID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseEducationalAttainment;
    })(hiw.ServiceDataObject);
    hiw.BaseEducationalAttainment = BaseEducationalAttainment;
    var EducationalAttainment = (function (_super) {
        __extends(EducationalAttainment, _super);
        function EducationalAttainment() {
            _super.apply(this, arguments);
        }
        return EducationalAttainment;
    })(BaseEducationalAttainment);
    hiw.EducationalAttainment = EducationalAttainment;
    /** Contains properties and static functionality for the EducationalAttainmentRelation type. */
    var BaseEducationalAttainmentRelation = (function (_super) {
        __extends(BaseEducationalAttainmentRelation, _super);
        function BaseEducationalAttainmentRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorEducationalAttainmentID = null;
            this.descendantEducationalAttainmentID = null;
            this.hops = null;
        }
        BaseEducationalAttainmentRelation.prototype.getFields = function () {
            return BaseEducationalAttainmentRelation.Fields;
        };
        /** Gets a list of all of the EducationalAttainmentRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of EducationalAttainmentRelations */
        BaseEducationalAttainmentRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many EducationalAttainmentRelations exist. */
        BaseEducationalAttainmentRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the EducationalAttainmentRelations method. */
        BaseEducationalAttainmentRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the EducationalAttainmentRelation with the specified primary key.
         *  @param id The primary key of the EducationalAttainmentRelation to return.
         *  @return The matching EducationalAttainmentRelation, if one exists, or null. */
        BaseEducationalAttainmentRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of EducationalAttainmentRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All EducationalAttainmentRelations which match the provided filter. */
        BaseEducationalAttainmentRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many EducationalAttainmentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of EducationalAttainmentRelations which match the provided filter. */
        BaseEducationalAttainmentRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of EducationalAttainmentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of EducationalAttainmentRelationswhich match the provided filter. */
        BaseEducationalAttainmentRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets EducationalAttainmentRelations by AncestorEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByAncestorEducationalAttainmentID = function (educationalAttainmentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID }, null, page);
        };
        /** Gets how many EducationalAttainmentRelations by AncestorEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByAncestorEducationalAttainmentIDCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Gets how many pages of EducationalAttainmentRelations by AncestorEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByAncestorEducationalAttainmentIDPageCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Returns the related AncestorducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @return A single EducationalAttainmentRelation, or null. */
        BaseEducationalAttainmentRelation.prototype.getAncestorducationalAttainment = function (api, callback) {
            return EducationalAttainmentRelation.getAncestorducationalAttainmentForEducationalAttainmentRelation(this.id, api, callback);
        };
        /** Returns the related AncestorducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @param educationalAttainmentRelationID The ID of the EducationalAttainmentRelation to retrieve.
         *  @return A single EducationalAttainmentRelation, or null. */
        BaseEducationalAttainmentRelation.getAncestorducationalAttainmentForEducationalAttainmentRelation = function (educationalAttainmentRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentRelationID: educationalAttainmentRelationID });
        };
        /** Gets EducationalAttainmentRelations by DescendantEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByDescendantEducationalAttainmentID = function (educationalAttainmentID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID }, null, page);
        };
        /** Gets how many EducationalAttainmentRelations by DescendantEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByDescendantEducationalAttainmentIDCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Gets how many pages of EducationalAttainmentRelations by DescendantEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        BaseEducationalAttainmentRelation.getByDescendantEducationalAttainmentIDPageCount = function (educationalAttainmentID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentID: educationalAttainmentID });
        };
        /** Returns the related DescendantEducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @return A single EducationalAttainmentRelation, or null. */
        BaseEducationalAttainmentRelation.prototype.getDescendantEducationalAttainment = function (api, callback) {
            return EducationalAttainmentRelation.getDescendantEducationalAttainmentForEducationalAttainmentRelation(this.id, api, callback);
        };
        /** Returns the related DescendantEducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @param educationalAttainmentRelationID The ID of the EducationalAttainmentRelation to retrieve.
         *  @return A single EducationalAttainmentRelation, or null. */
        BaseEducationalAttainmentRelation.getDescendantEducationalAttainmentForEducationalAttainmentRelation = function (educationalAttainmentRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { educationalAttainmentRelationID: educationalAttainmentRelationID });
        };
        BaseEducationalAttainmentRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorEducationalAttainmentID: new hiw.PropertyMap("ancestorEducationalAttainmentID", "AncestorEducationalAttainmentID"),
            descendantEducationalAttainmentID: new hiw.PropertyMap("descendantEducationalAttainmentID", "DescendantEducationalAttainmentID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseEducationalAttainmentRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseEducationalAttainmentRelation = BaseEducationalAttainmentRelation;
    var EducationalAttainmentRelation = (function (_super) {
        __extends(EducationalAttainmentRelation, _super);
        function EducationalAttainmentRelation() {
            _super.apply(this, arguments);
        }
        return EducationalAttainmentRelation;
    })(BaseEducationalAttainmentRelation);
    hiw.EducationalAttainmentRelation = EducationalAttainmentRelation;
    /** Contains properties and static functionality for the FamilyType type. */
    var BaseFamilyType = (function (_super) {
        __extends(BaseFamilyType, _super);
        function BaseFamilyType() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentFamilyTypeID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseFamilyType.prototype.getFields = function () {
            return BaseFamilyType.Fields;
        };
        /** Gets a list of all of the FamilyTypes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of FamilyTypes */
        BaseFamilyType.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many FamilyTypes exist. */
        BaseFamilyType.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the FamilyTypes method. */
        BaseFamilyType.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the FamilyType with the specified primary key.
         *  @param id The primary key of the FamilyType to return.
         *  @return The matching FamilyType, if one exists, or null. */
        BaseFamilyType.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of FamilyTypes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All FamilyTypes which match the provided filter. */
        BaseFamilyType.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many FamilyTypes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of FamilyTypes which match the provided filter. */
        BaseFamilyType.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of FamilyTypes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of FamilyTypeswhich match the provided filter. */
        BaseFamilyType.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets FamilyTypes by ParentFamilyTypeID.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.prototype.getFamilyTypes = function (api, callback, page) {
            return FamilyType.getByParentFamilyTypeID(this.id, api, callback, page);
        };
        /** Gets FamilyTypes by ParentFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.getByParentFamilyTypeID = function (familyTypeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID }, null, page);
        };
        /** Gets how many FamilyTypes by ParentFamilyTypeID exist.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.prototype.getFamilyTypesCount = function (api, callback) {
            return FamilyType.getByParentFamilyTypeIDCount(this.id, api, callback);
        };
        /** Gets how many FamilyTypes by ParentFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.getByParentFamilyTypeIDCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Gets how many pages of FamilyTypes by ParentFamilyTypeID exist.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.prototype.getFamilyTypesPageCount = function (api, callback) {
            return FamilyType.getByParentFamilyTypeIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of FamilyTypes by ParentFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        BaseFamilyType.getByParentFamilyTypeIDPageCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Returns the related ParentFamilyType based on the unique ID of the related FamilyType.
         *  @return A single FamilyType, or null. */
        BaseFamilyType.prototype.getParentFamilyType = function (api, callback) {
            return FamilyType.getParentFamilyTypeForFamilyType(this.id, api, callback);
        };
        /** Returns the related ParentFamilyType based on the unique ID of the related FamilyType.
         *  @param familyTypeID The ID of the FamilyType to retrieve.
         *  @return A single FamilyType, or null. */
        BaseFamilyType.getParentFamilyTypeForFamilyType = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        BaseFamilyType.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentFamilyTypeID: new hiw.PropertyMap("parentFamilyTypeID", "ParentFamilyTypeID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseFamilyType;
    })(hiw.ServiceDataObject);
    hiw.BaseFamilyType = BaseFamilyType;
    var FamilyType = (function (_super) {
        __extends(FamilyType, _super);
        function FamilyType() {
            _super.apply(this, arguments);
        }
        return FamilyType;
    })(BaseFamilyType);
    hiw.FamilyType = FamilyType;
    /** Contains properties and static functionality for the FamilyTypeRelation type. */
    var BaseFamilyTypeRelation = (function (_super) {
        __extends(BaseFamilyTypeRelation, _super);
        function BaseFamilyTypeRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorFamilyTypeID = null;
            this.descendantFamilyTypeID = null;
            this.hops = null;
        }
        BaseFamilyTypeRelation.prototype.getFields = function () {
            return BaseFamilyTypeRelation.Fields;
        };
        /** Gets a list of all of the FamilyTypeRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of FamilyTypeRelations */
        BaseFamilyTypeRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many FamilyTypeRelations exist. */
        BaseFamilyTypeRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the FamilyTypeRelations method. */
        BaseFamilyTypeRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the FamilyTypeRelation with the specified primary key.
         *  @param id The primary key of the FamilyTypeRelation to return.
         *  @return The matching FamilyTypeRelation, if one exists, or null. */
        BaseFamilyTypeRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of FamilyTypeRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All FamilyTypeRelations which match the provided filter. */
        BaseFamilyTypeRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many FamilyTypeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of FamilyTypeRelations which match the provided filter. */
        BaseFamilyTypeRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of FamilyTypeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of FamilyTypeRelationswhich match the provided filter. */
        BaseFamilyTypeRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets FamilyTypeRelations by AncestorFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByAncestorFamilyTypeID = function (familyTypeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID }, null, page);
        };
        /** Gets how many FamilyTypeRelations by AncestorFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByAncestorFamilyTypeIDCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Gets how many pages of FamilyTypeRelations by AncestorFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByAncestorFamilyTypeIDPageCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Returns the related AncestorFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @return A single FamilyTypeRelation, or null. */
        BaseFamilyTypeRelation.prototype.getAncestorFamilyType = function (api, callback) {
            return FamilyTypeRelation.getAncestorFamilyTypeForFamilyTypeRelation(this.id, api, callback);
        };
        /** Returns the related AncestorFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @param familyTypeRelationID The ID of the FamilyTypeRelation to retrieve.
         *  @return A single FamilyTypeRelation, or null. */
        BaseFamilyTypeRelation.getAncestorFamilyTypeForFamilyTypeRelation = function (familyTypeRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeRelationID: familyTypeRelationID });
        };
        /** Gets FamilyTypeRelations by DescendantFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByDescendantFamilyTypeID = function (familyTypeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID }, null, page);
        };
        /** Gets how many FamilyTypeRelations by DescendantFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByDescendantFamilyTypeIDCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Gets how many pages of FamilyTypeRelations by DescendantFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        BaseFamilyTypeRelation.getByDescendantFamilyTypeIDPageCount = function (familyTypeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeID: familyTypeID });
        };
        /** Returns the related DescendantFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @return A single FamilyTypeRelation, or null. */
        BaseFamilyTypeRelation.prototype.getDescendantFamilyType = function (api, callback) {
            return FamilyTypeRelation.getDescendantFamilyTypeForFamilyTypeRelation(this.id, api, callback);
        };
        /** Returns the related DescendantFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @param familyTypeRelationID The ID of the FamilyTypeRelation to retrieve.
         *  @return A single FamilyTypeRelation, or null. */
        BaseFamilyTypeRelation.getDescendantFamilyTypeForFamilyTypeRelation = function (familyTypeRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { familyTypeRelationID: familyTypeRelationID });
        };
        BaseFamilyTypeRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorFamilyTypeID: new hiw.PropertyMap("ancestorFamilyTypeID", "AncestorFamilyTypeID"),
            descendantFamilyTypeID: new hiw.PropertyMap("descendantFamilyTypeID", "DescendantFamilyTypeID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseFamilyTypeRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseFamilyTypeRelation = BaseFamilyTypeRelation;
    var FamilyTypeRelation = (function (_super) {
        __extends(FamilyTypeRelation, _super);
        function FamilyTypeRelation() {
            _super.apply(this, arguments);
        }
        return FamilyTypeRelation;
    })(BaseFamilyTypeRelation);
    hiw.FamilyTypeRelation = FamilyTypeRelation;
    /** Contains properties and static functionality for the Geography type. */
    var BaseGeography = (function (_super) {
        __extends(BaseGeography, _super);
        function BaseGeography() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentGeographyID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseGeography.prototype.getFields = function () {
            return BaseGeography.Fields;
        };
        /** Gets a list of all of the Geographies in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Geographies */
        BaseGeography.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Geographies exist. */
        BaseGeography.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Geographies method. */
        BaseGeography.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Geography with the specified primary key.
         *  @param id The primary key of the Geography to return.
         *  @return The matching Geography, if one exists, or null. */
        BaseGeography.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Geographies based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Geographies which match the provided filter. */
        BaseGeography.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Geographies exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Geographies which match the provided filter. */
        BaseGeography.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Geographies exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Geographieswhich match the provided filter. */
        BaseGeography.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Geographies by ParentGeographyID.
         *  @return An Array of Geographies. */
        BaseGeography.prototype.getGeographies = function (api, callback, page) {
            return Geography.getByParentGeographyID(this.id, api, callback, page);
        };
        /** Gets Geographies by ParentGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        BaseGeography.getByParentGeographyID = function (geographyID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID }, null, page);
        };
        /** Gets how many Geographies by ParentGeographyID exist.
         *  @return An Array of Geographies. */
        BaseGeography.prototype.getGeographiesCount = function (api, callback) {
            return Geography.getByParentGeographyIDCount(this.id, api, callback);
        };
        /** Gets how many Geographies by ParentGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        BaseGeography.getByParentGeographyIDCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Gets how many pages of Geographies by ParentGeographyID exist.
         *  @return An Array of Geographies. */
        BaseGeography.prototype.getGeographiesPageCount = function (api, callback) {
            return Geography.getByParentGeographyIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Geographies by ParentGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        BaseGeography.getByParentGeographyIDPageCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Returns the related ParentGeography based on the unique ID of the related Geography.
         *  @return A single Geography, or null. */
        BaseGeography.prototype.getParentGeography = function (api, callback) {
            return Geography.getParentGeographyForGeography(this.id, api, callback);
        };
        /** Returns the related ParentGeography based on the unique ID of the related Geography.
         *  @param geographyID The ID of the Geography to retrieve.
         *  @return A single Geography, or null. */
        BaseGeography.getParentGeographyForGeography = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        BaseGeography.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentGeographyID: new hiw.PropertyMap("parentGeographyID", "ParentGeographyID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseGeography;
    })(hiw.ServiceDataObject);
    hiw.BaseGeography = BaseGeography;
    var Geography = (function (_super) {
        __extends(Geography, _super);
        function Geography() {
            _super.apply(this, arguments);
        }
        return Geography;
    })(BaseGeography);
    hiw.Geography = Geography;
    /** Contains properties and static functionality for the GeographyRelation type. */
    var BaseGeographyRelation = (function (_super) {
        __extends(BaseGeographyRelation, _super);
        function BaseGeographyRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorGeographyID = null;
            this.descendantGeographyID = null;
            this.hops = null;
        }
        BaseGeographyRelation.prototype.getFields = function () {
            return BaseGeographyRelation.Fields;
        };
        /** Gets a list of all of the GeographyRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of GeographyRelations */
        BaseGeographyRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many GeographyRelations exist. */
        BaseGeographyRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the GeographyRelations method. */
        BaseGeographyRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the GeographyRelation with the specified primary key.
         *  @param id The primary key of the GeographyRelation to return.
         *  @return The matching GeographyRelation, if one exists, or null. */
        BaseGeographyRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of GeographyRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All GeographyRelations which match the provided filter. */
        BaseGeographyRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many GeographyRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of GeographyRelations which match the provided filter. */
        BaseGeographyRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of GeographyRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of GeographyRelationswhich match the provided filter. */
        BaseGeographyRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets GeographyRelations by AncestorGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByAncestorGeographyID = function (geographyID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID }, null, page);
        };
        /** Gets how many GeographyRelations by AncestorGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByAncestorGeographyIDCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Gets how many pages of GeographyRelations by AncestorGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByAncestorGeographyIDPageCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Returns the related AncestorGeography based on the unique ID of the related GeographyRelation.
         *  @return A single GeographyRelation, or null. */
        BaseGeographyRelation.prototype.getAncestorGeography = function (api, callback) {
            return GeographyRelation.getAncestorGeographyForGeographyRelation(this.id, api, callback);
        };
        /** Returns the related AncestorGeography based on the unique ID of the related GeographyRelation.
         *  @param geographyRelationID The ID of the GeographyRelation to retrieve.
         *  @return A single GeographyRelation, or null. */
        BaseGeographyRelation.getAncestorGeographyForGeographyRelation = function (geographyRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyRelationID: geographyRelationID });
        };
        /** Gets GeographyRelations by DescendantGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByDescendantGeographyID = function (geographyID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID }, null, page);
        };
        /** Gets how many GeographyRelations by DescendantGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByDescendantGeographyIDCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Gets how many pages of GeographyRelations by DescendantGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        BaseGeographyRelation.getByDescendantGeographyIDPageCount = function (geographyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyID: geographyID });
        };
        /** Returns the related DescendantGeography based on the unique ID of the related GeographyRelation.
         *  @return A single GeographyRelation, or null. */
        BaseGeographyRelation.prototype.getDescendantGeography = function (api, callback) {
            return GeographyRelation.getDescendantGeographyForGeographyRelation(this.id, api, callback);
        };
        /** Returns the related DescendantGeography based on the unique ID of the related GeographyRelation.
         *  @param geographyRelationID The ID of the GeographyRelation to retrieve.
         *  @return A single GeographyRelation, or null. */
        BaseGeographyRelation.getDescendantGeographyForGeographyRelation = function (geographyRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { geographyRelationID: geographyRelationID });
        };
        BaseGeographyRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorGeographyID: new hiw.PropertyMap("ancestorGeographyID", "AncestorGeographyID"),
            descendantGeographyID: new hiw.PropertyMap("descendantGeographyID", "DescendantGeographyID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseGeographyRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseGeographyRelation = BaseGeographyRelation;
    var GeographyRelation = (function (_super) {
        __extends(GeographyRelation, _super);
        function GeographyRelation() {
            _super.apply(this, arguments);
        }
        return GeographyRelation;
    })(BaseGeographyRelation);
    hiw.GeographyRelation = GeographyRelation;
    /** Contains properties and static functionality for the GlossaryTerm type. */
    var BaseGlossaryTerm = (function (_super) {
        __extends(BaseGlossaryTerm, _super);
        function BaseGlossaryTerm() {
            _super.apply(this, arguments);
            this.id = null;
            this.term = null;
            this.definition = null;
            this.source = null;
            this.sourceUrl1ID = null;
            this.sourceUrl2ID = null;
            this.modificationDate = null;
        }
        BaseGlossaryTerm.prototype.getFields = function () {
            return BaseGlossaryTerm.Fields;
        };
        /** Gets a list of all of the GlossaryTerms in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of GlossaryTerms */
        BaseGlossaryTerm.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many GlossaryTerms exist. */
        BaseGlossaryTerm.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the GlossaryTerms method. */
        BaseGlossaryTerm.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the GlossaryTerm with the specified primary key.
         *  @param id The primary key of the GlossaryTerm to return.
         *  @return The matching GlossaryTerm, if one exists, or null. */
        BaseGlossaryTerm.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of GlossaryTerms based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All GlossaryTerms which match the provided filter. */
        BaseGlossaryTerm.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many GlossaryTerms exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of GlossaryTerms which match the provided filter. */
        BaseGlossaryTerm.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of GlossaryTerms exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of GlossaryTermswhich match the provided filter. */
        BaseGlossaryTerm.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets GlossaryTerms by SourceUrl1ID.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl1ID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many GlossaryTerms by SourceUrl1ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl1IDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of GlossaryTerms by SourceUrl1ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl1IDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related SourceUrl1 based on the unique ID of the related GlossaryTerm.
         *  @return A single GlossaryTerm, or null. */
        BaseGlossaryTerm.prototype.getSourceUrl1 = function (api, callback) {
            return GlossaryTerm.getSourceUrl1ForGlossaryTerm(this.id, api, callback);
        };
        /** Returns the related SourceUrl1 based on the unique ID of the related GlossaryTerm.
         *  @param glossaryTermID The ID of the GlossaryTerm to retrieve.
         *  @return A single GlossaryTerm, or null. */
        BaseGlossaryTerm.getSourceUrl1ForGlossaryTerm = function (glossaryTermID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { glossaryTermID: glossaryTermID });
        };
        /** Gets GlossaryTerms by SourceUrl2ID.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl2ID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many GlossaryTerms by SourceUrl2ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl2IDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of GlossaryTerms by SourceUrl2ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        BaseGlossaryTerm.getBySourceUrl2IDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related SourceUrl2 based on the unique ID of the related GlossaryTerm.
         *  @return A single GlossaryTerm, or null. */
        BaseGlossaryTerm.prototype.getSourceUrl2 = function (api, callback) {
            return GlossaryTerm.getSourceUrl2ForGlossaryTerm(this.id, api, callback);
        };
        /** Returns the related SourceUrl2 based on the unique ID of the related GlossaryTerm.
         *  @param glossaryTermID The ID of the GlossaryTerm to retrieve.
         *  @return A single GlossaryTerm, or null. */
        BaseGlossaryTerm.getSourceUrl2ForGlossaryTerm = function (glossaryTermID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { glossaryTermID: glossaryTermID });
        };
        BaseGlossaryTerm.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            term: new hiw.PropertyMap("term", "Term"),
            definition: new hiw.PropertyMap("definition", "Definition"),
            source: new hiw.PropertyMap("source", "Source"),
            sourceUrl1ID: new hiw.PropertyMap("sourceUrl1ID", "SourceUrl1ID"),
            sourceUrl2ID: new hiw.PropertyMap("sourceUrl2ID", "SourceUrl2ID"),
            modificationDate: new hiw.PropertyMap("modificationDate", "ModificationDate")
        };
        return BaseGlossaryTerm;
    })(hiw.ServiceDataObject);
    hiw.BaseGlossaryTerm = BaseGlossaryTerm;
    var GlossaryTerm = (function (_super) {
        __extends(GlossaryTerm, _super);
        function GlossaryTerm() {
            _super.apply(this, arguments);
        }
        return GlossaryTerm;
    })(BaseGlossaryTerm);
    hiw.GlossaryTerm = GlossaryTerm;
    /** Contains properties and static functionality for the HealthInsuranceStatus type. */
    var BaseHealthInsuranceStatus = (function (_super) {
        __extends(BaseHealthInsuranceStatus, _super);
        function BaseHealthInsuranceStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentHealthInsuranceStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseHealthInsuranceStatus.prototype.getFields = function () {
            return BaseHealthInsuranceStatus.Fields;
        };
        /** Gets a list of all of the HealthInsuranceStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HealthInsuranceStatuses */
        BaseHealthInsuranceStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many HealthInsuranceStatuses exist. */
        BaseHealthInsuranceStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the HealthInsuranceStatuses method. */
        BaseHealthInsuranceStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the HealthInsuranceStatus with the specified primary key.
         *  @param id The primary key of the HealthInsuranceStatus to return.
         *  @return The matching HealthInsuranceStatus, if one exists, or null. */
        BaseHealthInsuranceStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of HealthInsuranceStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HealthInsuranceStatuses which match the provided filter. */
        BaseHealthInsuranceStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many HealthInsuranceStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HealthInsuranceStatuses which match the provided filter. */
        BaseHealthInsuranceStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of HealthInsuranceStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HealthInsuranceStatuseswhich match the provided filter. */
        BaseHealthInsuranceStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets HealthInsuranceStatuses by ParentHealthInsuranceStatusID.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.prototype.getHealthInsuranceStatuses = function (api, callback, page) {
            return HealthInsuranceStatus.getByParentHealthInsuranceStatusID(this.id, api, callback, page);
        };
        /** Gets HealthInsuranceStatuses by ParentHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.getByParentHealthInsuranceStatusID = function (healthInsuranceStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID }, null, page);
        };
        /** Gets how many HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.prototype.getHealthInsuranceStatusesCount = function (api, callback) {
            return HealthInsuranceStatus.getByParentHealthInsuranceStatusIDCount(this.id, api, callback);
        };
        /** Gets how many HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.getByParentHealthInsuranceStatusIDCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Gets how many pages of HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.prototype.getHealthInsuranceStatusesPageCount = function (api, callback) {
            return HealthInsuranceStatus.getByParentHealthInsuranceStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        BaseHealthInsuranceStatus.getByParentHealthInsuranceStatusIDPageCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Returns the related ParentHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatus.
         *  @return A single HealthInsuranceStatus, or null. */
        BaseHealthInsuranceStatus.prototype.getParentHealthInsuranceStatus = function (api, callback) {
            return HealthInsuranceStatus.getParentHealthInsuranceStatusForHealthInsuranceStatus(this.id, api, callback);
        };
        /** Returns the related ParentHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatus.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus to retrieve.
         *  @return A single HealthInsuranceStatus, or null. */
        BaseHealthInsuranceStatus.getParentHealthInsuranceStatusForHealthInsuranceStatus = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        BaseHealthInsuranceStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentHealthInsuranceStatusID: new hiw.PropertyMap("parentHealthInsuranceStatusID", "ParentHealthInsuranceStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseHealthInsuranceStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseHealthInsuranceStatus = BaseHealthInsuranceStatus;
    var HealthInsuranceStatus = (function (_super) {
        __extends(HealthInsuranceStatus, _super);
        function HealthInsuranceStatus() {
            _super.apply(this, arguments);
        }
        return HealthInsuranceStatus;
    })(BaseHealthInsuranceStatus);
    hiw.HealthInsuranceStatus = HealthInsuranceStatus;
    /** Contains properties and static functionality for the HealthInsuranceStatusRelation type. */
    var BaseHealthInsuranceStatusRelation = (function (_super) {
        __extends(BaseHealthInsuranceStatusRelation, _super);
        function BaseHealthInsuranceStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorHealthInsuranceStatusID = null;
            this.descendantHealthInsuranceStatusID = null;
            this.hops = null;
        }
        BaseHealthInsuranceStatusRelation.prototype.getFields = function () {
            return BaseHealthInsuranceStatusRelation.Fields;
        };
        /** Gets a list of all of the HealthInsuranceStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HealthInsuranceStatusRelations */
        BaseHealthInsuranceStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many HealthInsuranceStatusRelations exist. */
        BaseHealthInsuranceStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the HealthInsuranceStatusRelations method. */
        BaseHealthInsuranceStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the HealthInsuranceStatusRelation with the specified primary key.
         *  @param id The primary key of the HealthInsuranceStatusRelation to return.
         *  @return The matching HealthInsuranceStatusRelation, if one exists, or null. */
        BaseHealthInsuranceStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of HealthInsuranceStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HealthInsuranceStatusRelations which match the provided filter. */
        BaseHealthInsuranceStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many HealthInsuranceStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HealthInsuranceStatusRelations which match the provided filter. */
        BaseHealthInsuranceStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of HealthInsuranceStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HealthInsuranceStatusRelationswhich match the provided filter. */
        BaseHealthInsuranceStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusID = function (healthInsuranceStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID }, null, page);
        };
        /** Gets how many HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusIDCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Gets how many pages of HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusIDPageCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Returns the related AncestorHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        BaseHealthInsuranceStatusRelation.prototype.getAncestorHealthInsuranceStatus = function (api, callback) {
            return HealthInsuranceStatusRelation.getAncestorHealthInsuranceStatusForHealthInsuranceStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @param healthInsuranceStatusRelationID The ID of the HealthInsuranceStatusRelation to retrieve.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        BaseHealthInsuranceStatusRelation.getAncestorHealthInsuranceStatusForHealthInsuranceStatusRelation = function (healthInsuranceStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusRelationID: healthInsuranceStatusRelationID });
        };
        /** Gets HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusID = function (healthInsuranceStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID }, null, page);
        };
        /** Gets how many HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusIDCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Gets how many pages of HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        BaseHealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusIDPageCount = function (healthInsuranceStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusID: healthInsuranceStatusID });
        };
        /** Returns the related DescendantHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        BaseHealthInsuranceStatusRelation.prototype.getDescendantHealthInsuranceStatus = function (api, callback) {
            return HealthInsuranceStatusRelation.getDescendantHealthInsuranceStatusForHealthInsuranceStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @param healthInsuranceStatusRelationID The ID of the HealthInsuranceStatusRelation to retrieve.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        BaseHealthInsuranceStatusRelation.getDescendantHealthInsuranceStatusForHealthInsuranceStatusRelation = function (healthInsuranceStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { healthInsuranceStatusRelationID: healthInsuranceStatusRelationID });
        };
        BaseHealthInsuranceStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorHealthInsuranceStatusID: new hiw.PropertyMap("ancestorHealthInsuranceStatusID", "AncestorHealthInsuranceStatusID"),
            descendantHealthInsuranceStatusID: new hiw.PropertyMap("descendantHealthInsuranceStatusID", "DescendantHealthInsuranceStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseHealthInsuranceStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseHealthInsuranceStatusRelation = BaseHealthInsuranceStatusRelation;
    var HealthInsuranceStatusRelation = (function (_super) {
        __extends(HealthInsuranceStatusRelation, _super);
        function HealthInsuranceStatusRelation() {
            _super.apply(this, arguments);
        }
        return HealthInsuranceStatusRelation;
    })(BaseHealthInsuranceStatusRelation);
    hiw.HealthInsuranceStatusRelation = HealthInsuranceStatusRelation;
    /** Contains properties and static functionality for the HP2020TSM type. */
    var BaseHP2020TSM = (function (_super) {
        __extends(BaseHP2020TSM, _super);
        function BaseHP2020TSM() {
            _super.apply(this, arguments);
            this.id = null;
            this.HP2020TSMName = null;
            this.modifyDate = null;
        }
        BaseHP2020TSM.prototype.getFields = function () {
            return BaseHP2020TSM.Fields;
        };
        /** Gets a list of all of the HP2020TSMs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HP2020TSMs */
        BaseHP2020TSM.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many HP2020TSMs exist. */
        BaseHP2020TSM.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the HP2020TSMs method. */
        BaseHP2020TSM.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the HP2020TSM with the specified primary key.
         *  @param id The primary key of the HP2020TSM to return.
         *  @return The matching HP2020TSM, if one exists, or null. */
        BaseHP2020TSM.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of HP2020TSMs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HP2020TSMs which match the provided filter. */
        BaseHP2020TSM.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many HP2020TSMs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HP2020TSMs which match the provided filter. */
        BaseHP2020TSM.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of HP2020TSMs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HP2020TSMswhich match the provided filter. */
        BaseHP2020TSM.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseHP2020TSM.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            HP2020TSMName: new hiw.PropertyMap("HP2020TSMName", "HP2020TSMName"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate")
        };
        return BaseHP2020TSM;
    })(hiw.ServiceDataObject);
    hiw.BaseHP2020TSM = BaseHP2020TSM;
    var HP2020TSM = (function (_super) {
        __extends(HP2020TSM, _super);
        function HP2020TSM() {
            _super.apply(this, arguments);
        }
        return HP2020TSM;
    })(BaseHP2020TSM);
    hiw.HP2020TSM = HP2020TSM;
    /** Contains properties and static functionality for the IncomeAndPovertyStatus type. */
    var BaseIncomeAndPovertyStatus = (function (_super) {
        __extends(BaseIncomeAndPovertyStatus, _super);
        function BaseIncomeAndPovertyStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentIncomeAndPovertyStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseIncomeAndPovertyStatus.prototype.getFields = function () {
            return BaseIncomeAndPovertyStatus.Fields;
        };
        /** Gets a list of all of the IncomeAndPovertyStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IncomeAndPovertyStatuses */
        BaseIncomeAndPovertyStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IncomeAndPovertyStatuses exist. */
        BaseIncomeAndPovertyStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IncomeAndPovertyStatuses method. */
        BaseIncomeAndPovertyStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IncomeAndPovertyStatus with the specified primary key.
         *  @param id The primary key of the IncomeAndPovertyStatus to return.
         *  @return The matching IncomeAndPovertyStatus, if one exists, or null. */
        BaseIncomeAndPovertyStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IncomeAndPovertyStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IncomeAndPovertyStatuses which match the provided filter. */
        BaseIncomeAndPovertyStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IncomeAndPovertyStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IncomeAndPovertyStatuses which match the provided filter. */
        BaseIncomeAndPovertyStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IncomeAndPovertyStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IncomeAndPovertyStatuseswhich match the provided filter. */
        BaseIncomeAndPovertyStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.prototype.getIncomeAndPovertyStatuses = function (api, callback, page) {
            return IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusID(this.id, api, callback, page);
        };
        /** Gets IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusID = function (incomeAndPovertyStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID }, null, page);
        };
        /** Gets how many IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.prototype.getIncomeAndPovertyStatusesCount = function (api, callback) {
            return IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDCount(this.id, api, callback);
        };
        /** Gets how many IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Gets how many pages of IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.prototype.getIncomeAndPovertyStatusesPageCount = function (api, callback) {
            return IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        BaseIncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDPageCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Returns the related ParentIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatus.
         *  @return A single IncomeAndPovertyStatus, or null. */
        BaseIncomeAndPovertyStatus.prototype.getParentIncomeAndPovertyStatus = function (api, callback) {
            return IncomeAndPovertyStatus.getParentIncomeAndPovertyStatusForIncomeAndPovertyStatus(this.id, api, callback);
        };
        /** Returns the related ParentIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatus.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus to retrieve.
         *  @return A single IncomeAndPovertyStatus, or null. */
        BaseIncomeAndPovertyStatus.getParentIncomeAndPovertyStatusForIncomeAndPovertyStatus = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        BaseIncomeAndPovertyStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentIncomeAndPovertyStatusID: new hiw.PropertyMap("parentIncomeAndPovertyStatusID", "ParentIncomeAndPovertyStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseIncomeAndPovertyStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseIncomeAndPovertyStatus = BaseIncomeAndPovertyStatus;
    var IncomeAndPovertyStatus = (function (_super) {
        __extends(IncomeAndPovertyStatus, _super);
        function IncomeAndPovertyStatus() {
            _super.apply(this, arguments);
        }
        return IncomeAndPovertyStatus;
    })(BaseIncomeAndPovertyStatus);
    hiw.IncomeAndPovertyStatus = IncomeAndPovertyStatus;
    /** Contains properties and static functionality for the IncomeAndPovertyStatusRelation type. */
    var BaseIncomeAndPovertyStatusRelation = (function (_super) {
        __extends(BaseIncomeAndPovertyStatusRelation, _super);
        function BaseIncomeAndPovertyStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorIncomeAndPovertyStatusID = null;
            this.descendantIncomeAndPovertyStatusID = null;
            this.hops = null;
        }
        BaseIncomeAndPovertyStatusRelation.prototype.getFields = function () {
            return BaseIncomeAndPovertyStatusRelation.Fields;
        };
        /** Gets a list of all of the IncomeAndPovertyStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IncomeAndPovertyStatusRelations */
        BaseIncomeAndPovertyStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IncomeAndPovertyStatusRelations exist. */
        BaseIncomeAndPovertyStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IncomeAndPovertyStatusRelations method. */
        BaseIncomeAndPovertyStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IncomeAndPovertyStatusRelation with the specified primary key.
         *  @param id The primary key of the IncomeAndPovertyStatusRelation to return.
         *  @return The matching IncomeAndPovertyStatusRelation, if one exists, or null. */
        BaseIncomeAndPovertyStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IncomeAndPovertyStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IncomeAndPovertyStatusRelations which match the provided filter. */
        BaseIncomeAndPovertyStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IncomeAndPovertyStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IncomeAndPovertyStatusRelations which match the provided filter. */
        BaseIncomeAndPovertyStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IncomeAndPovertyStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IncomeAndPovertyStatusRelationswhich match the provided filter. */
        BaseIncomeAndPovertyStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusID = function (incomeAndPovertyStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID }, null, page);
        };
        /** Gets how many IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusIDCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Gets how many pages of IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusIDPageCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Returns the related AncestorIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        BaseIncomeAndPovertyStatusRelation.prototype.getAncestorIncomeAndPovertyStatus = function (api, callback) {
            return IncomeAndPovertyStatusRelation.getAncestorIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @param incomeAndPovertyStatusRelationID The ID of the IncomeAndPovertyStatusRelation to retrieve.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        BaseIncomeAndPovertyStatusRelation.getAncestorIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation = function (incomeAndPovertyStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusRelationID: incomeAndPovertyStatusRelationID });
        };
        /** Gets IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusID = function (incomeAndPovertyStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID }, null, page);
        };
        /** Gets how many IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusIDCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Gets how many pages of IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        BaseIncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusIDPageCount = function (incomeAndPovertyStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusID: incomeAndPovertyStatusID });
        };
        /** Returns the related DescendantIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        BaseIncomeAndPovertyStatusRelation.prototype.getDescendantIncomeAndPovertyStatus = function (api, callback) {
            return IncomeAndPovertyStatusRelation.getDescendantIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @param incomeAndPovertyStatusRelationID The ID of the IncomeAndPovertyStatusRelation to retrieve.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        BaseIncomeAndPovertyStatusRelation.getDescendantIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation = function (incomeAndPovertyStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { incomeAndPovertyStatusRelationID: incomeAndPovertyStatusRelationID });
        };
        BaseIncomeAndPovertyStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorIncomeAndPovertyStatusID: new hiw.PropertyMap("ancestorIncomeAndPovertyStatusID", "AncestorIncomeAndPovertyStatusID"),
            descendantIncomeAndPovertyStatusID: new hiw.PropertyMap("descendantIncomeAndPovertyStatusID", "DescendantIncomeAndPovertyStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseIncomeAndPovertyStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseIncomeAndPovertyStatusRelation = BaseIncomeAndPovertyStatusRelation;
    var IncomeAndPovertyStatusRelation = (function (_super) {
        __extends(IncomeAndPovertyStatusRelation, _super);
        function IncomeAndPovertyStatusRelation() {
            _super.apply(this, arguments);
        }
        return IncomeAndPovertyStatusRelation;
    })(BaseIncomeAndPovertyStatusRelation);
    hiw.IncomeAndPovertyStatusRelation = IncomeAndPovertyStatusRelation;
    /** Contains properties and static functionality for the IndicatorDescriptionDataCategory type. */
    var BaseIndicatorDescriptionDataCategory = (function (_super) {
        __extends(BaseIndicatorDescriptionDataCategory, _super);
        function BaseIndicatorDescriptionDataCategory() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.dataCategoryID = null;
        }
        BaseIndicatorDescriptionDataCategory.prototype.getFields = function () {
            return BaseIndicatorDescriptionDataCategory.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDataCategories in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDataCategories */
        BaseIndicatorDescriptionDataCategory.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDataCategories exist. */
        BaseIndicatorDescriptionDataCategory.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDataCategories method. */
        BaseIndicatorDescriptionDataCategory.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDataCategory with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDataCategory to return.
         *  @return The matching IndicatorDescriptionDataCategory, if one exists, or null. */
        BaseIndicatorDescriptionDataCategory.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDataCategories based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDataCategories which match the provided filter. */
        BaseIndicatorDescriptionDataCategory.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDataCategories which match the provided filter. */
        BaseIndicatorDescriptionDataCategory.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDataCategorieswhich match the provided filter. */
        BaseIndicatorDescriptionDataCategory.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDataCategories by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDataCategories by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDataCategories by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        BaseIndicatorDescriptionDataCategory.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDataCategory.getIndicatorDescriptionForIndicatorDescriptionDataCategory(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @param indicatorDescriptionDataCategoryID The ID of the IndicatorDescriptionDataCategory to retrieve.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        BaseIndicatorDescriptionDataCategory.getIndicatorDescriptionForIndicatorDescriptionDataCategory = function (indicatorDescriptionDataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDataCategoryID: indicatorDescriptionDataCategoryID });
        };
        /** Gets IndicatorDescriptionDataCategories by DataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByDataCategoryID = function (dataCategoryID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDataCategories by DataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByDataCategoryIDCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Gets how many pages of IndicatorDescriptionDataCategories by DataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        BaseIndicatorDescriptionDataCategory.getByDataCategoryIDPageCount = function (dataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataCategoryID: dataCategoryID });
        };
        /** Returns the related DataCategory based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        BaseIndicatorDescriptionDataCategory.prototype.getDataCategory = function (api, callback) {
            return IndicatorDescriptionDataCategory.getDataCategoryForIndicatorDescriptionDataCategory(this.id, api, callback);
        };
        /** Returns the related DataCategory based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @param indicatorDescriptionDataCategoryID The ID of the IndicatorDescriptionDataCategory to retrieve.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        BaseIndicatorDescriptionDataCategory.getDataCategoryForIndicatorDescriptionDataCategory = function (indicatorDescriptionDataCategoryID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDataCategoryID: indicatorDescriptionDataCategoryID });
        };
        BaseIndicatorDescriptionDataCategory.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            dataCategoryID: new hiw.PropertyMap("dataCategoryID", "DataCategoryID")
        };
        return BaseIndicatorDescriptionDataCategory;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDataCategory = BaseIndicatorDescriptionDataCategory;
    var IndicatorDescriptionDataCategory = (function (_super) {
        __extends(IndicatorDescriptionDataCategory, _super);
        function IndicatorDescriptionDataCategory() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDataCategory;
    })(BaseIndicatorDescriptionDataCategory);
    hiw.IndicatorDescriptionDataCategory = IndicatorDescriptionDataCategory;
    /** Contains properties and static functionality for the IndicatorDescriptionDataSource type. */
    var BaseIndicatorDescriptionDataSource = (function (_super) {
        __extends(BaseIndicatorDescriptionDataSource, _super);
        function BaseIndicatorDescriptionDataSource() {
            _super.apply(this, arguments);
            this.id = null;
            this.dataDescription = null;
            this.indicatorDescriptionID = null;
            this.dataSourceID = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionDataSource.prototype.getFields = function () {
            return BaseIndicatorDescriptionDataSource.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDataSources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDataSources */
        BaseIndicatorDescriptionDataSource.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDataSources exist. */
        BaseIndicatorDescriptionDataSource.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDataSources method. */
        BaseIndicatorDescriptionDataSource.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDataSource with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDataSource to return.
         *  @return The matching IndicatorDescriptionDataSource, if one exists, or null. */
        BaseIndicatorDescriptionDataSource.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDataSources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDataSources which match the provided filter. */
        BaseIndicatorDescriptionDataSource.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDataSources which match the provided filter. */
        BaseIndicatorDescriptionDataSource.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDataSourceswhich match the provided filter. */
        BaseIndicatorDescriptionDataSource.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDataSources by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDataSources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDataSources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        BaseIndicatorDescriptionDataSource.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDataSource.getIndicatorDescriptionForIndicatorDescriptionDataSource(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @param indicatorDescriptionDataSourceID The ID of the IndicatorDescriptionDataSource to retrieve.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        BaseIndicatorDescriptionDataSource.getIndicatorDescriptionForIndicatorDescriptionDataSource = function (indicatorDescriptionDataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDataSourceID: indicatorDescriptionDataSourceID });
        };
        /** Gets IndicatorDescriptionDataSources by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByDataSourceID = function (dataSourceID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDataSources by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByDataSourceIDCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Gets how many pages of IndicatorDescriptionDataSources by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        BaseIndicatorDescriptionDataSource.getByDataSourceIDPageCount = function (dataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dataSourceID: dataSourceID });
        };
        /** Returns the related DataSource based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        BaseIndicatorDescriptionDataSource.prototype.getDataSource = function (api, callback) {
            return IndicatorDescriptionDataSource.getDataSourceForIndicatorDescriptionDataSource(this.id, api, callback);
        };
        /** Returns the related DataSource based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @param indicatorDescriptionDataSourceID The ID of the IndicatorDescriptionDataSource to retrieve.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        BaseIndicatorDescriptionDataSource.getDataSourceForIndicatorDescriptionDataSource = function (indicatorDescriptionDataSourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDataSourceID: indicatorDescriptionDataSourceID });
        };
        BaseIndicatorDescriptionDataSource.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            dataDescription: new hiw.PropertyMap("dataDescription", "DataDescription"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            dataSourceID: new hiw.PropertyMap("dataSourceID", "DataSourceID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionDataSource;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDataSource = BaseIndicatorDescriptionDataSource;
    var IndicatorDescriptionDataSource = (function (_super) {
        __extends(IndicatorDescriptionDataSource, _super);
        function IndicatorDescriptionDataSource() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDataSource;
    })(BaseIndicatorDescriptionDataSource);
    hiw.IndicatorDescriptionDataSource = IndicatorDescriptionDataSource;
    /** Contains properties and static functionality for the IndicatorDescriptionDefaultDimensionGraph type. */
    var BaseIndicatorDescriptionDefaultDimensionGraph = (function (_super) {
        __extends(BaseIndicatorDescriptionDefaultDimensionGraph, _super);
        function BaseIndicatorDescriptionDefaultDimensionGraph() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeLevelID = null;
            this.dimensionGraphID = null;
        }
        BaseIndicatorDescriptionDefaultDimensionGraph.prototype.getFields = function () {
            return BaseIndicatorDescriptionDefaultDimensionGraph.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDefaultDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDefaultDimensionGraphs */
        BaseIndicatorDescriptionDefaultDimensionGraph.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs exist. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDefaultDimensionGraphs method. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDefaultDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDefaultDimensionGraph to return.
         *  @return The matching IndicatorDescriptionDefaultDimensionGraph, if one exists, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDefaultDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDefaultDimensionGraphs which match the provided filter. */
        BaseIndicatorDescriptionDefaultDimensionGraph.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDefaultDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDefaultDimensionGraphs which match the provided filter. */
        BaseIndicatorDescriptionDefaultDimensionGraph.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDefaultDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDefaultDimensionGraphswhich match the provided filter. */
        BaseIndicatorDescriptionDefaultDimensionGraph.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDefaultDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDefaultDimensionGraph(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDefaultDimensionGraph = function (indicatorDescriptionDefaultDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDefaultDimensionGraphID: indicatorDescriptionDefaultDimensionGraphID });
        };
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelID = function (localeLevelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelIDCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelIDPageCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.prototype.getLocaleLevel = function (api, callback) {
            return IndicatorDescriptionDefaultDimensionGraph.getLocaleLevelForIndicatorDescriptionDefaultDimensionGraph(this.id, api, callback);
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getLocaleLevelForIndicatorDescriptionDefaultDimensionGraph = function (indicatorDescriptionDefaultDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDefaultDimensionGraphID: indicatorDescriptionDefaultDimensionGraphID });
        };
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphID = function (dimensionGraphID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphIDCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphIDPageCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.prototype.getDimensionGraph = function (api, callback) {
            return IndicatorDescriptionDefaultDimensionGraph.getDimensionGraphForIndicatorDescriptionDefaultDimensionGraph(this.id, api, callback);
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        BaseIndicatorDescriptionDefaultDimensionGraph.getDimensionGraphForIndicatorDescriptionDefaultDimensionGraph = function (indicatorDescriptionDefaultDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDefaultDimensionGraphID: indicatorDescriptionDefaultDimensionGraphID });
        };
        BaseIndicatorDescriptionDefaultDimensionGraph.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeLevelID: new hiw.PropertyMap("localeLevelID", "LocaleLevelID"),
            dimensionGraphID: new hiw.PropertyMap("dimensionGraphID", "DimensionGraphID")
        };
        return BaseIndicatorDescriptionDefaultDimensionGraph;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDefaultDimensionGraph = BaseIndicatorDescriptionDefaultDimensionGraph;
    var IndicatorDescriptionDefaultDimensionGraph = (function (_super) {
        __extends(IndicatorDescriptionDefaultDimensionGraph, _super);
        function IndicatorDescriptionDefaultDimensionGraph() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDefaultDimensionGraph;
    })(BaseIndicatorDescriptionDefaultDimensionGraph);
    hiw.IndicatorDescriptionDefaultDimensionGraph = IndicatorDescriptionDefaultDimensionGraph;
    /** Contains properties and static functionality for the IndicatorDescriptionDimension type. */
    var BaseIndicatorDescriptionDimension = (function (_super) {
        __extends(BaseIndicatorDescriptionDimension, _super);
        function BaseIndicatorDescriptionDimension() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.dimensionListID = null;
        }
        BaseIndicatorDescriptionDimension.prototype.getFields = function () {
            return BaseIndicatorDescriptionDimension.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDimensions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensions */
        BaseIndicatorDescriptionDimension.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensions exist. */
        BaseIndicatorDescriptionDimension.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensions method. */
        BaseIndicatorDescriptionDimension.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDimension with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimension to return.
         *  @return The matching IndicatorDescriptionDimension, if one exists, or null. */
        BaseIndicatorDescriptionDimension.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDimensions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensions which match the provided filter. */
        BaseIndicatorDescriptionDimension.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensions which match the provided filter. */
        BaseIndicatorDescriptionDimension.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionswhich match the provided filter. */
        BaseIndicatorDescriptionDimension.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDimensions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimension.
         *  @return A single IndicatorDescriptionDimension, or null. */
        BaseIndicatorDescriptionDimension.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDimension.getIndicatorDescriptionForIndicatorDescriptionDimension(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimension.
         *  @param indicatorDescriptionDimensionID The ID of the IndicatorDescriptionDimension to retrieve.
         *  @return A single IndicatorDescriptionDimension, or null. */
        BaseIndicatorDescriptionDimension.getIndicatorDescriptionForIndicatorDescriptionDimension = function (indicatorDescriptionDimensionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionID: indicatorDescriptionDimensionID });
        };
        /** Gets IndicatorDescriptionDimensions by DimensionListID.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByDimensionListID = function (dimensionListID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensions by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByDimensionListIDCount = function (dimensionListID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensions by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        BaseIndicatorDescriptionDimension.getByDimensionListIDPageCount = function (dimensionListID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionListID: dimensionListID });
        };
        /** Returns the related DimensionList based on the unique ID of the related IndicatorDescriptionDimension.
         *  @return A single IndicatorDescriptionDimension, or null. */
        BaseIndicatorDescriptionDimension.prototype.getDimensionList = function (api, callback) {
            return IndicatorDescriptionDimension.getDimensionListForIndicatorDescriptionDimension(this.id, api, callback);
        };
        /** Returns the related DimensionList based on the unique ID of the related IndicatorDescriptionDimension.
         *  @param indicatorDescriptionDimensionID The ID of the IndicatorDescriptionDimension to retrieve.
         *  @return A single IndicatorDescriptionDimension, or null. */
        BaseIndicatorDescriptionDimension.getDimensionListForIndicatorDescriptionDimension = function (indicatorDescriptionDimensionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionID: indicatorDescriptionDimensionID });
        };
        /** Gets a unique IndicatorDescriptionDimension based on the provided values.
         *  @return A single IndicatorDescriptionDimension, or null. */
        BaseIndicatorDescriptionDimension.getByIndicatorDescriptionIDAndDimensionListID = function (indicatorDescriptionID, dimensionListID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID, dimensionListID: dimensionListID });
        };
        BaseIndicatorDescriptionDimension.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            dimensionListID: new hiw.PropertyMap("dimensionListID", "DimensionListID")
        };
        return BaseIndicatorDescriptionDimension;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDimension = BaseIndicatorDescriptionDimension;
    var IndicatorDescriptionDimension = (function (_super) {
        __extends(IndicatorDescriptionDimension, _super);
        function IndicatorDescriptionDimension() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDimension;
    })(BaseIndicatorDescriptionDimension);
    hiw.IndicatorDescriptionDimension = IndicatorDescriptionDimension;
    /** Contains properties and static functionality for the IndicatorDescriptionDimensionGraph type. */
    var BaseIndicatorDescriptionDimensionGraph = (function (_super) {
        __extends(BaseIndicatorDescriptionDimensionGraph, _super);
        function BaseIndicatorDescriptionDimensionGraph() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeLevelID = null;
            this.dimensionGraphID = null;
        }
        BaseIndicatorDescriptionDimensionGraph.prototype.getFields = function () {
            return BaseIndicatorDescriptionDimensionGraph.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensionGraphs */
        BaseIndicatorDescriptionDimensionGraph.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionGraphs exist. */
        BaseIndicatorDescriptionDimensionGraph.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensionGraphs method. */
        BaseIndicatorDescriptionDimensionGraph.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimensionGraph to return.
         *  @return The matching IndicatorDescriptionDimensionGraph, if one exists, or null. */
        BaseIndicatorDescriptionDimensionGraph.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensionGraphs which match the provided filter. */
        BaseIndicatorDescriptionDimensionGraph.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensionGraphs which match the provided filter. */
        BaseIndicatorDescriptionDimensionGraph.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionGraphswhich match the provided filter. */
        BaseIndicatorDescriptionDimensionGraph.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDimensionGraph(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDimensionGraph = function (indicatorDescriptionDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionGraphID: indicatorDescriptionDimensionGraphID });
        };
        /** Gets IndicatorDescriptionDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByLocaleLevelID = function (localeLevelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByLocaleLevelIDCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByLocaleLevelIDPageCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.prototype.getLocaleLevel = function (api, callback) {
            return IndicatorDescriptionDimensionGraph.getLocaleLevelForIndicatorDescriptionDimensionGraph(this.id, api, callback);
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.getLocaleLevelForIndicatorDescriptionDimensionGraph = function (indicatorDescriptionDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionGraphID: indicatorDescriptionDimensionGraphID });
        };
        /** Gets IndicatorDescriptionDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByDimensionGraphID = function (dimensionGraphID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByDimensionGraphIDCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        BaseIndicatorDescriptionDimensionGraph.getByDimensionGraphIDPageCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.prototype.getDimensionGraph = function (api, callback) {
            return IndicatorDescriptionDimensionGraph.getDimensionGraphForIndicatorDescriptionDimensionGraph(this.id, api, callback);
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        BaseIndicatorDescriptionDimensionGraph.getDimensionGraphForIndicatorDescriptionDimensionGraph = function (indicatorDescriptionDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionGraphID: indicatorDescriptionDimensionGraphID });
        };
        BaseIndicatorDescriptionDimensionGraph.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeLevelID: new hiw.PropertyMap("localeLevelID", "LocaleLevelID"),
            dimensionGraphID: new hiw.PropertyMap("dimensionGraphID", "DimensionGraphID")
        };
        return BaseIndicatorDescriptionDimensionGraph;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDimensionGraph = BaseIndicatorDescriptionDimensionGraph;
    var IndicatorDescriptionDimensionGraph = (function (_super) {
        __extends(IndicatorDescriptionDimensionGraph, _super);
        function IndicatorDescriptionDimensionGraph() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDimensionGraph;
    })(BaseIndicatorDescriptionDimensionGraph);
    hiw.IndicatorDescriptionDimensionGraph = IndicatorDescriptionDimensionGraph;
    /** Contains properties and static functionality for the IndicatorDescriptionDimensionValue type. */
    var BaseIndicatorDescriptionDimensionValue = (function (_super) {
        __extends(BaseIndicatorDescriptionDimensionValue, _super);
        function BaseIndicatorDescriptionDimensionValue() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.dimensionBookID = null;
        }
        BaseIndicatorDescriptionDimensionValue.prototype.getFields = function () {
            return BaseIndicatorDescriptionDimensionValue.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionDimensionValues in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensionValues */
        BaseIndicatorDescriptionDimensionValue.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionValues exist. */
        BaseIndicatorDescriptionDimensionValue.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensionValues method. */
        BaseIndicatorDescriptionDimensionValue.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionDimensionValue with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimensionValue to return.
         *  @return The matching IndicatorDescriptionDimensionValue, if one exists, or null. */
        BaseIndicatorDescriptionDimensionValue.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionDimensionValues based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensionValues which match the provided filter. */
        BaseIndicatorDescriptionDimensionValue.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionDimensionValues exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensionValues which match the provided filter. */
        BaseIndicatorDescriptionDimensionValue.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionDimensionValues exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionValueswhich match the provided filter. */
        BaseIndicatorDescriptionDimensionValue.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionDimensionValues by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionValues by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensionValues by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        BaseIndicatorDescriptionDimensionValue.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionDimensionValue.getIndicatorDescriptionForIndicatorDescriptionDimensionValue(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @param indicatorDescriptionDimensionValueID The ID of the IndicatorDescriptionDimensionValue to retrieve.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        BaseIndicatorDescriptionDimensionValue.getIndicatorDescriptionForIndicatorDescriptionDimensionValue = function (indicatorDescriptionDimensionValueID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionValueID: indicatorDescriptionDimensionValueID });
        };
        /** Gets IndicatorDescriptionDimensionValues by DimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByDimensionBookID = function (dimensionBookID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID }, null, page);
        };
        /** Gets how many IndicatorDescriptionDimensionValues by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByDimensionBookIDCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets how many pages of IndicatorDescriptionDimensionValues by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        BaseIndicatorDescriptionDimensionValue.getByDimensionBookIDPageCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        BaseIndicatorDescriptionDimensionValue.prototype.getDimensionBook = function (api, callback) {
            return IndicatorDescriptionDimensionValue.getDimensionBookForIndicatorDescriptionDimensionValue(this.id, api, callback);
        };
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @param indicatorDescriptionDimensionValueID The ID of the IndicatorDescriptionDimensionValue to retrieve.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        BaseIndicatorDescriptionDimensionValue.getDimensionBookForIndicatorDescriptionDimensionValue = function (indicatorDescriptionDimensionValueID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionDimensionValueID: indicatorDescriptionDimensionValueID });
        };
        /** Gets a unique IndicatorDescriptionDimensionValue based on the provided values.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        BaseIndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDAndDimensionBookID = function (indicatorDescriptionID, dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID, dimensionBookID: dimensionBookID });
        };
        BaseIndicatorDescriptionDimensionValue.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            dimensionBookID: new hiw.PropertyMap("dimensionBookID", "DimensionBookID")
        };
        return BaseIndicatorDescriptionDimensionValue;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionDimensionValue = BaseIndicatorDescriptionDimensionValue;
    var IndicatorDescriptionDimensionValue = (function (_super) {
        __extends(IndicatorDescriptionDimensionValue, _super);
        function IndicatorDescriptionDimensionValue() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionDimensionValue;
    })(BaseIndicatorDescriptionDimensionValue);
    hiw.IndicatorDescriptionDimensionValue = IndicatorDescriptionDimensionValue;
    /** Contains properties and static functionality for the IndicatorDescriptionInitiative type. */
    var BaseIndicatorDescriptionInitiative = (function (_super) {
        __extends(BaseIndicatorDescriptionInitiative, _super);
        function BaseIndicatorDescriptionInitiative() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.initiativeID = null;
        }
        BaseIndicatorDescriptionInitiative.prototype.getFields = function () {
            return BaseIndicatorDescriptionInitiative.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionInitiatives in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionInitiatives */
        BaseIndicatorDescriptionInitiative.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionInitiatives exist. */
        BaseIndicatorDescriptionInitiative.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionInitiatives method. */
        BaseIndicatorDescriptionInitiative.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionInitiative with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionInitiative to return.
         *  @return The matching IndicatorDescriptionInitiative, if one exists, or null. */
        BaseIndicatorDescriptionInitiative.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionInitiatives based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionInitiatives which match the provided filter. */
        BaseIndicatorDescriptionInitiative.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionInitiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionInitiatives which match the provided filter. */
        BaseIndicatorDescriptionInitiative.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionInitiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionInitiativeswhich match the provided filter. */
        BaseIndicatorDescriptionInitiative.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionInitiatives by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionInitiatives by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionInitiatives by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        BaseIndicatorDescriptionInitiative.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionInitiative.getIndicatorDescriptionForIndicatorDescriptionInitiative(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @param indicatorDescriptionInitiativeID The ID of the IndicatorDescriptionInitiative to retrieve.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        BaseIndicatorDescriptionInitiative.getIndicatorDescriptionForIndicatorDescriptionInitiative = function (indicatorDescriptionInitiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionInitiativeID: indicatorDescriptionInitiativeID });
        };
        /** Gets IndicatorDescriptionInitiatives by InitiativeID.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByInitiativeID = function (initiativeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionInitiatives by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByInitiativeIDCount = function (initiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID });
        };
        /** Gets how many pages of IndicatorDescriptionInitiatives by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        BaseIndicatorDescriptionInitiative.getByInitiativeIDPageCount = function (initiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { initiativeID: initiativeID });
        };
        /** Returns the related Initiative based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        BaseIndicatorDescriptionInitiative.prototype.getInitiative = function (api, callback) {
            return IndicatorDescriptionInitiative.getInitiativeForIndicatorDescriptionInitiative(this.id, api, callback);
        };
        /** Returns the related Initiative based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @param indicatorDescriptionInitiativeID The ID of the IndicatorDescriptionInitiative to retrieve.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        BaseIndicatorDescriptionInitiative.getInitiativeForIndicatorDescriptionInitiative = function (indicatorDescriptionInitiativeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionInitiativeID: indicatorDescriptionInitiativeID });
        };
        BaseIndicatorDescriptionInitiative.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            initiativeID: new hiw.PropertyMap("initiativeID", "InitiativeID")
        };
        return BaseIndicatorDescriptionInitiative;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionInitiative = BaseIndicatorDescriptionInitiative;
    var IndicatorDescriptionInitiative = (function (_super) {
        __extends(IndicatorDescriptionInitiative, _super);
        function IndicatorDescriptionInitiative() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionInitiative;
    })(BaseIndicatorDescriptionInitiative);
    hiw.IndicatorDescriptionInitiative = IndicatorDescriptionInitiative;
    /** Contains properties and static functionality for the IndicatorDescriptionIntervention type. */
    var BaseIndicatorDescriptionIntervention = (function (_super) {
        __extends(BaseIndicatorDescriptionIntervention, _super);
        function BaseIndicatorDescriptionIntervention() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.interventionID = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionIntervention.prototype.getFields = function () {
            return BaseIndicatorDescriptionIntervention.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionInterventions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionInterventions */
        BaseIndicatorDescriptionIntervention.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionInterventions exist. */
        BaseIndicatorDescriptionIntervention.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionInterventions method. */
        BaseIndicatorDescriptionIntervention.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionIntervention with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionIntervention to return.
         *  @return The matching IndicatorDescriptionIntervention, if one exists, or null. */
        BaseIndicatorDescriptionIntervention.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionInterventions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionInterventions which match the provided filter. */
        BaseIndicatorDescriptionIntervention.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionInterventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionInterventions which match the provided filter. */
        BaseIndicatorDescriptionIntervention.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionInterventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionInterventionswhich match the provided filter. */
        BaseIndicatorDescriptionIntervention.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionInterventions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionInterventions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionInterventions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        BaseIndicatorDescriptionIntervention.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionIntervention.getIndicatorDescriptionForIndicatorDescriptionIntervention(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @param indicatorDescriptionInterventionID The ID of the IndicatorDescriptionIntervention to retrieve.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        BaseIndicatorDescriptionIntervention.getIndicatorDescriptionForIndicatorDescriptionIntervention = function (indicatorDescriptionInterventionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionInterventionID: indicatorDescriptionInterventionID });
        };
        /** Gets IndicatorDescriptionInterventions by InterventionID.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByInterventionID = function (interventionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { interventionID: interventionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionInterventions by InterventionID exist.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByInterventionIDCount = function (interventionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { interventionID: interventionID });
        };
        /** Gets how many pages of IndicatorDescriptionInterventions by InterventionID exist.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        BaseIndicatorDescriptionIntervention.getByInterventionIDPageCount = function (interventionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { interventionID: interventionID });
        };
        /** Returns the related Interventions based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        BaseIndicatorDescriptionIntervention.prototype.getInterventions = function (api, callback) {
            return IndicatorDescriptionIntervention.getInterventionsForIndicatorDescriptionIntervention(this.id, api, callback);
        };
        /** Returns the related Interventions based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @param indicatorDescriptionInterventionID The ID of the IndicatorDescriptionIntervention to retrieve.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        BaseIndicatorDescriptionIntervention.getInterventionsForIndicatorDescriptionIntervention = function (indicatorDescriptionInterventionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionInterventionID: indicatorDescriptionInterventionID });
        };
        BaseIndicatorDescriptionIntervention.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            interventionID: new hiw.PropertyMap("interventionID", "InterventionID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionIntervention;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionIntervention = BaseIndicatorDescriptionIntervention;
    var IndicatorDescriptionIntervention = (function (_super) {
        __extends(IndicatorDescriptionIntervention, _super);
        function IndicatorDescriptionIntervention() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionIntervention;
    })(BaseIndicatorDescriptionIntervention);
    hiw.IndicatorDescriptionIntervention = IndicatorDescriptionIntervention;
    /** Contains properties and static functionality for the IndicatorDescriptionKeyword type. */
    var BaseIndicatorDescriptionKeyword = (function (_super) {
        __extends(BaseIndicatorDescriptionKeyword, _super);
        function BaseIndicatorDescriptionKeyword() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.keywordID = null;
        }
        BaseIndicatorDescriptionKeyword.prototype.getFields = function () {
            return BaseIndicatorDescriptionKeyword.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionKeywords in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionKeywords */
        BaseIndicatorDescriptionKeyword.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionKeywords exist. */
        BaseIndicatorDescriptionKeyword.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionKeywords method. */
        BaseIndicatorDescriptionKeyword.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionKeyword with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionKeyword to return.
         *  @return The matching IndicatorDescriptionKeyword, if one exists, or null. */
        BaseIndicatorDescriptionKeyword.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionKeywords based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionKeywords which match the provided filter. */
        BaseIndicatorDescriptionKeyword.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionKeywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionKeywords which match the provided filter. */
        BaseIndicatorDescriptionKeyword.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionKeywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionKeywordswhich match the provided filter. */
        BaseIndicatorDescriptionKeyword.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionKeywords by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionKeywords by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionKeywords by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        BaseIndicatorDescriptionKeyword.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionKeyword.getIndicatorDescriptionForIndicatorDescriptionKeyword(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @param indicatorDescriptionKeywordID The ID of the IndicatorDescriptionKeyword to retrieve.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        BaseIndicatorDescriptionKeyword.getIndicatorDescriptionForIndicatorDescriptionKeyword = function (indicatorDescriptionKeywordID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionKeywordID: indicatorDescriptionKeywordID });
        };
        /** Gets IndicatorDescriptionKeywords by KeywordID.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByKeywordID = function (keywordID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywordID: keywordID }, null, page);
        };
        /** Gets how many IndicatorDescriptionKeywords by KeywordID exist.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByKeywordIDCount = function (keywordID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywordID: keywordID });
        };
        /** Gets how many pages of IndicatorDescriptionKeywords by KeywordID exist.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        BaseIndicatorDescriptionKeyword.getByKeywordIDPageCount = function (keywordID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywordID: keywordID });
        };
        /** Returns the related Keyword based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        BaseIndicatorDescriptionKeyword.prototype.getKeyword = function (api, callback) {
            return IndicatorDescriptionKeyword.getKeywordForIndicatorDescriptionKeyword(this.id, api, callback);
        };
        /** Returns the related Keyword based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @param indicatorDescriptionKeywordID The ID of the IndicatorDescriptionKeyword to retrieve.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        BaseIndicatorDescriptionKeyword.getKeywordForIndicatorDescriptionKeyword = function (indicatorDescriptionKeywordID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionKeywordID: indicatorDescriptionKeywordID });
        };
        /** Gets a unique IndicatorDescriptionKeyword based on the provided values.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        BaseIndicatorDescriptionKeyword.getByIndicatorDescriptionIDAndKeywordID = function (indicatorDescriptionID, keywordID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID, keywordID: keywordID });
        };
        BaseIndicatorDescriptionKeyword.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            keywordID: new hiw.PropertyMap("keywordID", "KeywordID")
        };
        return BaseIndicatorDescriptionKeyword;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionKeyword = BaseIndicatorDescriptionKeyword;
    var IndicatorDescriptionKeyword = (function (_super) {
        __extends(IndicatorDescriptionKeyword, _super);
        function IndicatorDescriptionKeyword() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionKeyword;
    })(BaseIndicatorDescriptionKeyword);
    hiw.IndicatorDescriptionKeyword = IndicatorDescriptionKeyword;
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleCounty type. */
    var BaseIndicatorDescriptionLocaleCounty = (function (_super) {
        __extends(BaseIndicatorDescriptionLocaleCounty, _super);
        function BaseIndicatorDescriptionLocaleCounty() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeID = null;
        }
        BaseIndicatorDescriptionLocaleCounty.prototype.getFields = function () {
            return BaseIndicatorDescriptionLocaleCounty.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionLocaleCounties in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleCounties */
        BaseIndicatorDescriptionLocaleCounty.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleCounties exist. */
        BaseIndicatorDescriptionLocaleCounty.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleCounties method. */
        BaseIndicatorDescriptionLocaleCounty.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionLocaleCounty with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleCounty to return.
         *  @return The matching IndicatorDescriptionLocaleCounty, if one exists, or null. */
        BaseIndicatorDescriptionLocaleCounty.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionLocaleCounties based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleCounties which match the provided filter. */
        BaseIndicatorDescriptionLocaleCounty.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionLocaleCounties exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleCounties which match the provided filter. */
        BaseIndicatorDescriptionLocaleCounty.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionLocaleCounties exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleCountieswhich match the provided filter. */
        BaseIndicatorDescriptionLocaleCounty.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionLocaleCounties by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleCounties by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleCounties by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        BaseIndicatorDescriptionLocaleCounty.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionLocaleCounty.getIndicatorDescriptionForIndicatorDescriptionLocaleCounty(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @param indicatorDescriptionLocaleCountyID The ID of the IndicatorDescriptionLocaleCounty to retrieve.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        BaseIndicatorDescriptionLocaleCounty.getIndicatorDescriptionForIndicatorDescriptionLocaleCounty = function (indicatorDescriptionLocaleCountyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleCountyID: indicatorDescriptionLocaleCountyID });
        };
        /** Gets IndicatorDescriptionLocaleCounties by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleCounties by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleCounties by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        BaseIndicatorDescriptionLocaleCounty.getByLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        BaseIndicatorDescriptionLocaleCounty.prototype.getLocale = function (api, callback) {
            return IndicatorDescriptionLocaleCounty.getLocaleForIndicatorDescriptionLocaleCounty(this.id, api, callback);
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @param indicatorDescriptionLocaleCountyID The ID of the IndicatorDescriptionLocaleCounty to retrieve.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        BaseIndicatorDescriptionLocaleCounty.getLocaleForIndicatorDescriptionLocaleCounty = function (indicatorDescriptionLocaleCountyID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleCountyID: indicatorDescriptionLocaleCountyID });
        };
        BaseIndicatorDescriptionLocaleCounty.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeID: new hiw.PropertyMap("localeID", "LocaleID")
        };
        return BaseIndicatorDescriptionLocaleCounty;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionLocaleCounty = BaseIndicatorDescriptionLocaleCounty;
    var IndicatorDescriptionLocaleCounty = (function (_super) {
        __extends(IndicatorDescriptionLocaleCounty, _super);
        function IndicatorDescriptionLocaleCounty() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionLocaleCounty;
    })(BaseIndicatorDescriptionLocaleCounty);
    hiw.IndicatorDescriptionLocaleCounty = IndicatorDescriptionLocaleCounty;
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleHospitalReferralRegion type. */
    var BaseIndicatorDescriptionLocaleHospitalReferralRegion = (function (_super) {
        __extends(BaseIndicatorDescriptionLocaleHospitalReferralRegion, _super);
        function BaseIndicatorDescriptionLocaleHospitalReferralRegion() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeID = null;
        }
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.prototype.getFields = function () {
            return BaseIndicatorDescriptionLocaleHospitalReferralRegion.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionLocaleHospitalReferralRegions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleHospitalReferralRegions */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions exist. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleHospitalReferralRegions method. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionLocaleHospitalReferralRegion with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleHospitalReferralRegion to return.
         *  @return The matching IndicatorDescriptionLocaleHospitalReferralRegion, if one exists, or null. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionLocaleHospitalReferralRegions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleHospitalReferralRegions which match the provided filter. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionLocaleHospitalReferralRegions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleHospitalReferralRegions which match the provided filter. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionLocaleHospitalReferralRegions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleHospitalReferralRegionswhich match the provided filter. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionLocaleHospitalReferralRegion.getIndicatorDescriptionForIndicatorDescriptionLocaleHospitalReferralRegion(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @param indicatorDescriptionLocaleHospitalReferralRegionID The ID of the IndicatorDescriptionLocaleHospitalReferralRegion to retrieve.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getIndicatorDescriptionForIndicatorDescriptionLocaleHospitalReferralRegion = function (indicatorDescriptionLocaleHospitalReferralRegionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleHospitalReferralRegionID: indicatorDescriptionLocaleHospitalReferralRegionID });
        };
        /** Gets IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.prototype.getLocale = function (api, callback) {
            return IndicatorDescriptionLocaleHospitalReferralRegion.getLocaleForIndicatorDescriptionLocaleHospitalReferralRegion(this.id, api, callback);
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @param indicatorDescriptionLocaleHospitalReferralRegionID The ID of the IndicatorDescriptionLocaleHospitalReferralRegion to retrieve.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.getLocaleForIndicatorDescriptionLocaleHospitalReferralRegion = function (indicatorDescriptionLocaleHospitalReferralRegionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleHospitalReferralRegionID: indicatorDescriptionLocaleHospitalReferralRegionID });
        };
        BaseIndicatorDescriptionLocaleHospitalReferralRegion.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeID: new hiw.PropertyMap("localeID", "LocaleID")
        };
        return BaseIndicatorDescriptionLocaleHospitalReferralRegion;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionLocaleHospitalReferralRegion = BaseIndicatorDescriptionLocaleHospitalReferralRegion;
    var IndicatorDescriptionLocaleHospitalReferralRegion = (function (_super) {
        __extends(IndicatorDescriptionLocaleHospitalReferralRegion, _super);
        function IndicatorDescriptionLocaleHospitalReferralRegion() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionLocaleHospitalReferralRegion;
    })(BaseIndicatorDescriptionLocaleHospitalReferralRegion);
    hiw.IndicatorDescriptionLocaleHospitalReferralRegion = IndicatorDescriptionLocaleHospitalReferralRegion;
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleLevel type. */
    var BaseIndicatorDescriptionLocaleLevel = (function (_super) {
        __extends(BaseIndicatorDescriptionLocaleLevel, _super);
        function BaseIndicatorDescriptionLocaleLevel() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeLevelID = null;
        }
        BaseIndicatorDescriptionLocaleLevel.prototype.getFields = function () {
            return BaseIndicatorDescriptionLocaleLevel.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionLocaleLevels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleLevels */
        BaseIndicatorDescriptionLocaleLevel.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleLevels exist. */
        BaseIndicatorDescriptionLocaleLevel.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleLevels method. */
        BaseIndicatorDescriptionLocaleLevel.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionLocaleLevel with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleLevel to return.
         *  @return The matching IndicatorDescriptionLocaleLevel, if one exists, or null. */
        BaseIndicatorDescriptionLocaleLevel.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionLocaleLevels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleLevels which match the provided filter. */
        BaseIndicatorDescriptionLocaleLevel.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionLocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleLevels which match the provided filter. */
        BaseIndicatorDescriptionLocaleLevel.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionLocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleLevelswhich match the provided filter. */
        BaseIndicatorDescriptionLocaleLevel.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionLocaleLevels by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleLevels by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleLevels by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        BaseIndicatorDescriptionLocaleLevel.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionLocaleLevel.getIndicatorDescriptionForIndicatorDescriptionLocaleLevel(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @param indicatorDescriptionLocaleLevelID The ID of the IndicatorDescriptionLocaleLevel to retrieve.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        BaseIndicatorDescriptionLocaleLevel.getIndicatorDescriptionForIndicatorDescriptionLocaleLevel = function (indicatorDescriptionLocaleLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleLevelID: indicatorDescriptionLocaleLevelID });
        };
        /** Gets IndicatorDescriptionLocaleLevels by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByLocaleLevelID = function (localeLevelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleLevels by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByLocaleLevelIDCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleLevels by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        BaseIndicatorDescriptionLocaleLevel.getByLocaleLevelIDPageCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        BaseIndicatorDescriptionLocaleLevel.prototype.getLocaleLevel = function (api, callback) {
            return IndicatorDescriptionLocaleLevel.getLocaleLevelForIndicatorDescriptionLocaleLevel(this.id, api, callback);
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @param indicatorDescriptionLocaleLevelID The ID of the IndicatorDescriptionLocaleLevel to retrieve.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        BaseIndicatorDescriptionLocaleLevel.getLocaleLevelForIndicatorDescriptionLocaleLevel = function (indicatorDescriptionLocaleLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleLevelID: indicatorDescriptionLocaleLevelID });
        };
        BaseIndicatorDescriptionLocaleLevel.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeLevelID: new hiw.PropertyMap("localeLevelID", "LocaleLevelID")
        };
        return BaseIndicatorDescriptionLocaleLevel;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionLocaleLevel = BaseIndicatorDescriptionLocaleLevel;
    var IndicatorDescriptionLocaleLevel = (function (_super) {
        __extends(IndicatorDescriptionLocaleLevel, _super);
        function IndicatorDescriptionLocaleLevel() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionLocaleLevel;
    })(BaseIndicatorDescriptionLocaleLevel);
    hiw.IndicatorDescriptionLocaleLevel = IndicatorDescriptionLocaleLevel;
    /** Contains properties and static functionality for the IndicatorDescriptionLocale type. */
    var BaseIndicatorDescriptionLocale = (function (_super) {
        __extends(BaseIndicatorDescriptionLocale, _super);
        function BaseIndicatorDescriptionLocale() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeID = null;
        }
        BaseIndicatorDescriptionLocale.prototype.getFields = function () {
            return BaseIndicatorDescriptionLocale.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionLocales in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocales */
        BaseIndicatorDescriptionLocale.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionLocales exist. */
        BaseIndicatorDescriptionLocale.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionLocales method. */
        BaseIndicatorDescriptionLocale.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionLocale with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocale to return.
         *  @return The matching IndicatorDescriptionLocale, if one exists, or null. */
        BaseIndicatorDescriptionLocale.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionLocales based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocales which match the provided filter. */
        BaseIndicatorDescriptionLocale.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionLocales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocales which match the provided filter. */
        BaseIndicatorDescriptionLocale.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionLocales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleswhich match the provided filter. */
        BaseIndicatorDescriptionLocale.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionLocales by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocales by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionLocales by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocale.
         *  @return A single IndicatorDescriptionLocale, or null. */
        BaseIndicatorDescriptionLocale.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionLocale.getIndicatorDescriptionForIndicatorDescriptionLocale(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocale.
         *  @param indicatorDescriptionLocaleID The ID of the IndicatorDescriptionLocale to retrieve.
         *  @return A single IndicatorDescriptionLocale, or null. */
        BaseIndicatorDescriptionLocale.getIndicatorDescriptionForIndicatorDescriptionLocale = function (indicatorDescriptionLocaleID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleID: indicatorDescriptionLocaleID });
        };
        /** Gets IndicatorDescriptionLocales by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocales by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of IndicatorDescriptionLocales by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        BaseIndicatorDescriptionLocale.getByLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocale.
         *  @return A single IndicatorDescriptionLocale, or null. */
        BaseIndicatorDescriptionLocale.prototype.getLocale = function (api, callback) {
            return IndicatorDescriptionLocale.getLocaleForIndicatorDescriptionLocale(this.id, api, callback);
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocale.
         *  @param indicatorDescriptionLocaleID The ID of the IndicatorDescriptionLocale to retrieve.
         *  @return A single IndicatorDescriptionLocale, or null. */
        BaseIndicatorDescriptionLocale.getLocaleForIndicatorDescriptionLocale = function (indicatorDescriptionLocaleID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleID: indicatorDescriptionLocaleID });
        };
        BaseIndicatorDescriptionLocale.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeID: new hiw.PropertyMap("localeID", "LocaleID")
        };
        return BaseIndicatorDescriptionLocale;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionLocale = BaseIndicatorDescriptionLocale;
    var IndicatorDescriptionLocale = (function (_super) {
        __extends(IndicatorDescriptionLocale, _super);
        function IndicatorDescriptionLocale() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionLocale;
    })(BaseIndicatorDescriptionLocale);
    hiw.IndicatorDescriptionLocale = IndicatorDescriptionLocale;
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleState type. */
    var BaseIndicatorDescriptionLocaleState = (function (_super) {
        __extends(BaseIndicatorDescriptionLocaleState, _super);
        function BaseIndicatorDescriptionLocaleState() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeID = null;
        }
        BaseIndicatorDescriptionLocaleState.prototype.getFields = function () {
            return BaseIndicatorDescriptionLocaleState.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionLocaleStates in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleStates */
        BaseIndicatorDescriptionLocaleState.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleStates exist. */
        BaseIndicatorDescriptionLocaleState.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleStates method. */
        BaseIndicatorDescriptionLocaleState.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionLocaleState with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleState to return.
         *  @return The matching IndicatorDescriptionLocaleState, if one exists, or null. */
        BaseIndicatorDescriptionLocaleState.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionLocaleStates based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleStates which match the provided filter. */
        BaseIndicatorDescriptionLocaleState.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionLocaleStates exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleStates which match the provided filter. */
        BaseIndicatorDescriptionLocaleState.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionLocaleStates exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleStateswhich match the provided filter. */
        BaseIndicatorDescriptionLocaleState.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionLocaleStates by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleStates by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleStates by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        BaseIndicatorDescriptionLocaleState.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionLocaleState.getIndicatorDescriptionForIndicatorDescriptionLocaleState(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @param indicatorDescriptionLocaleStateID The ID of the IndicatorDescriptionLocaleState to retrieve.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        BaseIndicatorDescriptionLocaleState.getIndicatorDescriptionForIndicatorDescriptionLocaleState = function (indicatorDescriptionLocaleStateID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleStateID: indicatorDescriptionLocaleStateID });
        };
        /** Gets IndicatorDescriptionLocaleStates by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionLocaleStates by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of IndicatorDescriptionLocaleStates by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        BaseIndicatorDescriptionLocaleState.getByLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        BaseIndicatorDescriptionLocaleState.prototype.getLocale = function (api, callback) {
            return IndicatorDescriptionLocaleState.getLocaleForIndicatorDescriptionLocaleState(this.id, api, callback);
        };
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @param indicatorDescriptionLocaleStateID The ID of the IndicatorDescriptionLocaleState to retrieve.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        BaseIndicatorDescriptionLocaleState.getLocaleForIndicatorDescriptionLocaleState = function (indicatorDescriptionLocaleStateID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionLocaleStateID: indicatorDescriptionLocaleStateID });
        };
        BaseIndicatorDescriptionLocaleState.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeID: new hiw.PropertyMap("localeID", "LocaleID")
        };
        return BaseIndicatorDescriptionLocaleState;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionLocaleState = BaseIndicatorDescriptionLocaleState;
    var IndicatorDescriptionLocaleState = (function (_super) {
        __extends(IndicatorDescriptionLocaleState, _super);
        function IndicatorDescriptionLocaleState() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionLocaleState;
    })(BaseIndicatorDescriptionLocaleState);
    hiw.IndicatorDescriptionLocaleState = IndicatorDescriptionLocaleState;
    /** Contains properties and static functionality for the IndicatorDescriptionMethodologyNote type. */
    var BaseIndicatorDescriptionMethodologyNote = (function (_super) {
        __extends(BaseIndicatorDescriptionMethodologyNote, _super);
        function BaseIndicatorDescriptionMethodologyNote() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.methodologyNote = null;
            this.methodologyNotePlain = null;
            this.isHTML = null;
            this.isAgeAdjusted = null;
            this.isFootnote = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionMethodologyNote.prototype.getFields = function () {
            return BaseIndicatorDescriptionMethodologyNote.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionMethodologyNotes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionMethodologyNotes */
        BaseIndicatorDescriptionMethodologyNote.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionMethodologyNotes exist. */
        BaseIndicatorDescriptionMethodologyNote.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionMethodologyNotes method. */
        BaseIndicatorDescriptionMethodologyNote.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionMethodologyNote with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionMethodologyNote to return.
         *  @return The matching IndicatorDescriptionMethodologyNote, if one exists, or null. */
        BaseIndicatorDescriptionMethodologyNote.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionMethodologyNotes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionMethodologyNotes which match the provided filter. */
        BaseIndicatorDescriptionMethodologyNote.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionMethodologyNotes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionMethodologyNotes which match the provided filter. */
        BaseIndicatorDescriptionMethodologyNote.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionMethodologyNotes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionMethodologyNoteswhich match the provided filter. */
        BaseIndicatorDescriptionMethodologyNote.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        BaseIndicatorDescriptionMethodologyNote.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        BaseIndicatorDescriptionMethodologyNote.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        BaseIndicatorDescriptionMethodologyNote.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMethodologyNote.
         *  @return A single IndicatorDescriptionMethodologyNote, or null. */
        BaseIndicatorDescriptionMethodologyNote.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionMethodologyNote.getIndicatorDescriptionForIndicatorDescriptionMethodologyNote(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMethodologyNote.
         *  @param indicatorDescriptionMethodologyNoteID The ID of the IndicatorDescriptionMethodologyNote to retrieve.
         *  @return A single IndicatorDescriptionMethodologyNote, or null. */
        BaseIndicatorDescriptionMethodologyNote.getIndicatorDescriptionForIndicatorDescriptionMethodologyNote = function (indicatorDescriptionMethodologyNoteID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionMethodologyNoteID: indicatorDescriptionMethodologyNoteID });
        };
        BaseIndicatorDescriptionMethodologyNote.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            methodologyNote: new hiw.PropertyMap("methodologyNote", "MethodologyNote"),
            methodologyNotePlain: new hiw.PropertyMap("methodologyNotePlain", "MethodologyNotePlain"),
            isHTML: new hiw.PropertyMap("isHTML", "isHTML"),
            isAgeAdjusted: new hiw.PropertyMap("isAgeAdjusted", "isAgeAdjusted"),
            isFootnote: new hiw.PropertyMap("isFootnote", "isFootnote"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionMethodologyNote;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionMethodologyNote = BaseIndicatorDescriptionMethodologyNote;
    var IndicatorDescriptionMethodologyNote = (function (_super) {
        __extends(IndicatorDescriptionMethodologyNote, _super);
        function IndicatorDescriptionMethodologyNote() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionMethodologyNote;
    })(BaseIndicatorDescriptionMethodologyNote);
    hiw.IndicatorDescriptionMethodologyNote = IndicatorDescriptionMethodologyNote;
    /** Contains properties and static functionality for the IndicatorDescriptionMoreInfo type. */
    var BaseIndicatorDescriptionMoreInfo = (function (_super) {
        __extends(BaseIndicatorDescriptionMoreInfo, _super);
        function BaseIndicatorDescriptionMoreInfo() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.moreInfo = null;
            this.urlID = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionMoreInfo.prototype.getFields = function () {
            return BaseIndicatorDescriptionMoreInfo.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionMoreInfos in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionMoreInfos */
        BaseIndicatorDescriptionMoreInfo.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionMoreInfos exist. */
        BaseIndicatorDescriptionMoreInfo.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionMoreInfos method. */
        BaseIndicatorDescriptionMoreInfo.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionMoreInfo with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionMoreInfo to return.
         *  @return The matching IndicatorDescriptionMoreInfo, if one exists, or null. */
        BaseIndicatorDescriptionMoreInfo.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionMoreInfos based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionMoreInfos which match the provided filter. */
        BaseIndicatorDescriptionMoreInfo.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionMoreInfos exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionMoreInfos which match the provided filter. */
        BaseIndicatorDescriptionMoreInfo.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionMoreInfos exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionMoreInfoswhich match the provided filter. */
        BaseIndicatorDescriptionMoreInfo.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionMoreInfos by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionMoreInfos by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionMoreInfos by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        BaseIndicatorDescriptionMoreInfo.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionMoreInfo.getIndicatorDescriptionForIndicatorDescriptionMoreInfo(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @param indicatorDescriptionMoreInfoID The ID of the IndicatorDescriptionMoreInfo to retrieve.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        BaseIndicatorDescriptionMoreInfo.getIndicatorDescriptionForIndicatorDescriptionMoreInfo = function (indicatorDescriptionMoreInfoID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionMoreInfoID: indicatorDescriptionMoreInfoID });
        };
        /** Gets IndicatorDescriptionMoreInfos by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many IndicatorDescriptionMoreInfos by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of IndicatorDescriptionMoreInfos by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        BaseIndicatorDescriptionMoreInfo.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        BaseIndicatorDescriptionMoreInfo.prototype.getUrl = function (api, callback) {
            return IndicatorDescriptionMoreInfo.getUrlForIndicatorDescriptionMoreInfo(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @param indicatorDescriptionMoreInfoID The ID of the IndicatorDescriptionMoreInfo to retrieve.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        BaseIndicatorDescriptionMoreInfo.getUrlForIndicatorDescriptionMoreInfo = function (indicatorDescriptionMoreInfoID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionMoreInfoID: indicatorDescriptionMoreInfoID });
        };
        BaseIndicatorDescriptionMoreInfo.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            moreInfo: new hiw.PropertyMap("moreInfo", "MoreInfo"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionMoreInfo;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionMoreInfo = BaseIndicatorDescriptionMoreInfo;
    var IndicatorDescriptionMoreInfo = (function (_super) {
        __extends(IndicatorDescriptionMoreInfo, _super);
        function IndicatorDescriptionMoreInfo() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionMoreInfo;
    })(BaseIndicatorDescriptionMoreInfo);
    hiw.IndicatorDescriptionMoreInfo = IndicatorDescriptionMoreInfo;
    /** Contains properties and static functionality for the IndicatorDescriptionReference type. */
    var BaseIndicatorDescriptionReference = (function (_super) {
        __extends(BaseIndicatorDescriptionReference, _super);
        function BaseIndicatorDescriptionReference() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.reference = null;
            this.urlID = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionReference.prototype.getFields = function () {
            return BaseIndicatorDescriptionReference.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionReferences in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionReferences */
        BaseIndicatorDescriptionReference.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionReferences exist. */
        BaseIndicatorDescriptionReference.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionReferences method. */
        BaseIndicatorDescriptionReference.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionReference with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionReference to return.
         *  @return The matching IndicatorDescriptionReference, if one exists, or null. */
        BaseIndicatorDescriptionReference.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionReferences based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionReferences which match the provided filter. */
        BaseIndicatorDescriptionReference.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionReferences exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionReferences which match the provided filter. */
        BaseIndicatorDescriptionReference.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionReferences exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionReferenceswhich match the provided filter. */
        BaseIndicatorDescriptionReference.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionReferences by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionReferences by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionReferences by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionReference.
         *  @return A single IndicatorDescriptionReference, or null. */
        BaseIndicatorDescriptionReference.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionReference.getIndicatorDescriptionForIndicatorDescriptionReference(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionReference.
         *  @param indicatorDescriptionReferenceID The ID of the IndicatorDescriptionReference to retrieve.
         *  @return A single IndicatorDescriptionReference, or null. */
        BaseIndicatorDescriptionReference.getIndicatorDescriptionForIndicatorDescriptionReference = function (indicatorDescriptionReferenceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionReferenceID: indicatorDescriptionReferenceID });
        };
        /** Gets IndicatorDescriptionReferences by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many IndicatorDescriptionReferences by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of IndicatorDescriptionReferences by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        BaseIndicatorDescriptionReference.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionReference.
         *  @return A single IndicatorDescriptionReference, or null. */
        BaseIndicatorDescriptionReference.prototype.getUrl = function (api, callback) {
            return IndicatorDescriptionReference.getUrlForIndicatorDescriptionReference(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionReference.
         *  @param indicatorDescriptionReferenceID The ID of the IndicatorDescriptionReference to retrieve.
         *  @return A single IndicatorDescriptionReference, or null. */
        BaseIndicatorDescriptionReference.getUrlForIndicatorDescriptionReference = function (indicatorDescriptionReferenceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionReferenceID: indicatorDescriptionReferenceID });
        };
        BaseIndicatorDescriptionReference.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            reference: new hiw.PropertyMap("reference", "Reference"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionReference;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionReference = BaseIndicatorDescriptionReference;
    var IndicatorDescriptionReference = (function (_super) {
        __extends(IndicatorDescriptionReference, _super);
        function IndicatorDescriptionReference() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionReference;
    })(BaseIndicatorDescriptionReference);
    hiw.IndicatorDescriptionReference = IndicatorDescriptionReference;
    /** Contains properties and static functionality for the IndicatorDescriptionResource type. */
    var BaseIndicatorDescriptionResource = (function (_super) {
        __extends(BaseIndicatorDescriptionResource, _super);
        function BaseIndicatorDescriptionResource() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.description = null;
            this.urlID = null;
            this.sortOrder = null;
        }
        BaseIndicatorDescriptionResource.prototype.getFields = function () {
            return BaseIndicatorDescriptionResource.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionResources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionResources */
        BaseIndicatorDescriptionResource.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionResources exist. */
        BaseIndicatorDescriptionResource.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionResources method. */
        BaseIndicatorDescriptionResource.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionResource with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionResource to return.
         *  @return The matching IndicatorDescriptionResource, if one exists, or null. */
        BaseIndicatorDescriptionResource.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionResources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionResources which match the provided filter. */
        BaseIndicatorDescriptionResource.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionResources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionResources which match the provided filter. */
        BaseIndicatorDescriptionResource.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionResources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionResourceswhich match the provided filter. */
        BaseIndicatorDescriptionResource.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionResources by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionResources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionResources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionResource.
         *  @return A single IndicatorDescriptionResource, or null. */
        BaseIndicatorDescriptionResource.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionResource.getIndicatorDescriptionForIndicatorDescriptionResource(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionResource.
         *  @param indicatorDescriptionResourceID The ID of the IndicatorDescriptionResource to retrieve.
         *  @return A single IndicatorDescriptionResource, or null. */
        BaseIndicatorDescriptionResource.getIndicatorDescriptionForIndicatorDescriptionResource = function (indicatorDescriptionResourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionResourceID: indicatorDescriptionResourceID });
        };
        /** Gets IndicatorDescriptionResources by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many IndicatorDescriptionResources by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of IndicatorDescriptionResources by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        BaseIndicatorDescriptionResource.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionResource.
         *  @return A single IndicatorDescriptionResource, or null. */
        BaseIndicatorDescriptionResource.prototype.getUrl = function (api, callback) {
            return IndicatorDescriptionResource.getUrlForIndicatorDescriptionResource(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionResource.
         *  @param indicatorDescriptionResourceID The ID of the IndicatorDescriptionResource to retrieve.
         *  @return A single IndicatorDescriptionResource, or null. */
        BaseIndicatorDescriptionResource.getUrlForIndicatorDescriptionResource = function (indicatorDescriptionResourceID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionResourceID: indicatorDescriptionResourceID });
        };
        BaseIndicatorDescriptionResource.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            description: new hiw.PropertyMap("description", "Description"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIndicatorDescriptionResource;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionResource = BaseIndicatorDescriptionResource;
    var IndicatorDescriptionResource = (function (_super) {
        __extends(IndicatorDescriptionResource, _super);
        function IndicatorDescriptionResource() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionResource;
    })(BaseIndicatorDescriptionResource);
    hiw.IndicatorDescriptionResource = IndicatorDescriptionResource;
    /** Contains properties and static functionality for the IndicatorDescription type. */
    var BaseIndicatorDescription = (function (_super) {
        __extends(BaseIndicatorDescription, _super);
        function BaseIndicatorDescription() {
            _super.apply(this, arguments);
            this.id = null;
            this.shortDescription = null;
            this.unlabeledShortDescription = null;
            this.showMe = null;
            this.isDevelopmental = null;
            this.datatype = null;
            this.fullDescription = null;
            this.valueLabelID = null;
            this.numeratorDescription = null;
            this.denominatorDescription = null;
            this.caveatsAndLimitations = null;
            this.dataType = null;
            this.trendIssues = null;
            this.otherDataSource = null;
            this.availableDimensions = null;
            this.geographicLevels = null;
            this.maxDecimal = null;
            this.modificationDate = null;
            this.minimumCacheValue = null;
            this.maximumCacheValue = null;
            this.modifyDate = null;
        }
        BaseIndicatorDescription.prototype.getFields = function () {
            return BaseIndicatorDescription.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptions */
        BaseIndicatorDescription.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptions exist. */
        BaseIndicatorDescription.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptions method. */
        BaseIndicatorDescription.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescription with the specified primary key.
         *  @param id The primary key of the IndicatorDescription to return.
         *  @return The matching IndicatorDescription, if one exists, or null. */
        BaseIndicatorDescription.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptions which match the provided filter. */
        BaseIndicatorDescription.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptions which match the provided filter. */
        BaseIndicatorDescription.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionswhich match the provided filter. */
        BaseIndicatorDescription.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptions by ValueLabelID.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        BaseIndicatorDescription.getByValueLabelID = function (valueLabelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { valueLabelID: valueLabelID }, null, page);
        };
        /** Gets how many IndicatorDescriptions by ValueLabelID exist.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        BaseIndicatorDescription.getByValueLabelIDCount = function (valueLabelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { valueLabelID: valueLabelID });
        };
        /** Gets how many pages of IndicatorDescriptions by ValueLabelID exist.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        BaseIndicatorDescription.getByValueLabelIDPageCount = function (valueLabelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { valueLabelID: valueLabelID });
        };
        /** Returns the related ValueLabel based on the unique ID of the related IndicatorDescription.
         *  @return A single IndicatorDescription, or null. */
        BaseIndicatorDescription.prototype.getValueLabel = function (api, callback) {
            return hiw.IndicatorDescription.getValueLabelForIndicatorDescription(this.id, api, callback);
        };
        /** Returns the related ValueLabel based on the unique ID of the related IndicatorDescription.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription to retrieve.
         *  @return A single IndicatorDescription, or null. */
        BaseIndicatorDescription.getValueLabelForIndicatorDescription = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        BaseIndicatorDescription.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            shortDescription: new hiw.PropertyMap("shortDescription", "ShortDescription"),
            unlabeledShortDescription: new hiw.PropertyMap("unlabeledShortDescription", "UnlabeledShortDescription"),
            showMe: new hiw.PropertyMap("showMe", "ShowMe"),
            isDevelopmental: new hiw.PropertyMap("isDevelopmental", "isDevelopmental"),
            datatype: new hiw.PropertyMap("datatype", "Datatype"),
            fullDescription: new hiw.PropertyMap("fullDescription", "FullDescription"),
            valueLabelID: new hiw.PropertyMap("valueLabelID", "ValueLabelID"),
            numeratorDescription: new hiw.PropertyMap("numeratorDescription", "NumeratorDescription"),
            denominatorDescription: new hiw.PropertyMap("denominatorDescription", "DenominatorDescription"),
            caveatsAndLimitations: new hiw.PropertyMap("caveatsAndLimitations", "CaveatsAndLimitations"),
            dataType: new hiw.PropertyMap("dataType", "DataType"),
            trendIssues: new hiw.PropertyMap("trendIssues", "TrendIssues"),
            otherDataSource: new hiw.PropertyMap("otherDataSource", "OtherDataSource"),
            availableDimensions: new hiw.PropertyMap("availableDimensions", "AvailableDimensions"),
            geographicLevels: new hiw.PropertyMap("geographicLevels", "GeographicLevels"),
            maxDecimal: new hiw.PropertyMap("maxDecimal", "MaxDecimal"),
            modificationDate: new hiw.PropertyMap("modificationDate", "ModificationDate"),
            minimumCacheValue: new hiw.PropertyMap("minimumCacheValue", "MinimumCacheValue"),
            maximumCacheValue: new hiw.PropertyMap("maximumCacheValue", "MaximumCacheValue"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate")
        };
        return BaseIndicatorDescription;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescription = BaseIndicatorDescription;
    /** Contains properties and static functionality for the IndicatorDescriptionHP2020 type. */
    var BaseIndicatorDescriptionHP2020 = (function (_super) {
        __extends(BaseIndicatorDescriptionHP2020, _super);
        function BaseIndicatorDescriptionHP2020() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.indicatorNumber = null;
            this.HP2020ID = null;
            this.HP2020Target = null;
            this.HP2020BaselineYear = null;
            this.HP2020Baseline = null;
            this.HP2020TSMID = null;
            this.initiativeSpecificTopicArea = null;
        }
        BaseIndicatorDescriptionHP2020.prototype.getFields = function () {
            return BaseIndicatorDescriptionHP2020.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionHP2020s in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionHP2020s */
        BaseIndicatorDescriptionHP2020.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionHP2020s exist. */
        BaseIndicatorDescriptionHP2020.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionHP2020s method. */
        BaseIndicatorDescriptionHP2020.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionHP2020 with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionHP2020 to return.
         *  @return The matching IndicatorDescriptionHP2020, if one exists, or null. */
        BaseIndicatorDescriptionHP2020.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionHP2020s based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionHP2020s which match the provided filter. */
        BaseIndicatorDescriptionHP2020.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionHP2020s exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionHP2020s which match the provided filter. */
        BaseIndicatorDescriptionHP2020.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionHP2020s exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionHP2020swhich match the provided filter. */
        BaseIndicatorDescriptionHP2020.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionHP2020s by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionHP2020s by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionHP2020s by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        BaseIndicatorDescriptionHP2020.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionHP2020.getIndicatorDescriptionForIndicatorDescriptionHP2020(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @param indicatorDescriptionHP2020ID The ID of the IndicatorDescriptionHP2020 to retrieve.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        BaseIndicatorDescriptionHP2020.getIndicatorDescriptionForIndicatorDescriptionHP2020 = function (indicatorDescriptionHP2020ID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionHP2020ID: indicatorDescriptionHP2020ID });
        };
        /** Gets IndicatorDescriptionHP2020s by HP2020TSMID.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByHP2020TSMID = function (hP2020TSMID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { hP2020TSMID: hP2020TSMID }, null, page);
        };
        /** Gets how many IndicatorDescriptionHP2020s by HP2020TSMID exist.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByHP2020TSMIDCount = function (hP2020TSMID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { hP2020TSMID: hP2020TSMID });
        };
        /** Gets how many pages of IndicatorDescriptionHP2020s by HP2020TSMID exist.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        BaseIndicatorDescriptionHP2020.getByHP2020TSMIDPageCount = function (hP2020TSMID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { hP2020TSMID: hP2020TSMID });
        };
        /** Returns the related HP2020TSM based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        BaseIndicatorDescriptionHP2020.prototype.getHP2020TSM = function (api, callback) {
            return IndicatorDescriptionHP2020.getHP2020TSMForIndicatorDescriptionHP2020(this.id, api, callback);
        };
        /** Returns the related HP2020TSM based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @param indicatorDescriptionHP2020ID The ID of the IndicatorDescriptionHP2020 to retrieve.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        BaseIndicatorDescriptionHP2020.getHP2020TSMForIndicatorDescriptionHP2020 = function (indicatorDescriptionHP2020ID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionHP2020ID: indicatorDescriptionHP2020ID });
        };
        BaseIndicatorDescriptionHP2020.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            indicatorNumber: new hiw.PropertyMap("indicatorNumber", "IndicatorNumber"),
            HP2020ID: new hiw.PropertyMap("HP2020ID", "HP2020ID"),
            HP2020Target: new hiw.PropertyMap("HP2020Target", "HP2020Target"),
            HP2020BaselineYear: new hiw.PropertyMap("HP2020BaselineYear", "HP2020BaselineYear"),
            HP2020Baseline: new hiw.PropertyMap("HP2020Baseline", "HP2020Baseline"),
            HP2020TSMID: new hiw.PropertyMap("HP2020TSMID", "HP2020TSMID"),
            initiativeSpecificTopicArea: new hiw.PropertyMap("initiativeSpecificTopicArea", "InitiativeSpecificTopicArea")
        };
        return BaseIndicatorDescriptionHP2020;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionHP2020 = BaseIndicatorDescriptionHP2020;
    var IndicatorDescriptionHP2020 = (function (_super) {
        __extends(IndicatorDescriptionHP2020, _super);
        function IndicatorDescriptionHP2020() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionHP2020;
    })(BaseIndicatorDescriptionHP2020);
    hiw.IndicatorDescriptionHP2020 = IndicatorDescriptionHP2020;
    /** Contains properties and static functionality for the IndicatorDescriptionTimeFrame type. */
    var BaseIndicatorDescriptionTimeFrame = (function (_super) {
        __extends(BaseIndicatorDescriptionTimeFrame, _super);
        function BaseIndicatorDescriptionTimeFrame() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.timeframeID = null;
        }
        BaseIndicatorDescriptionTimeFrame.prototype.getFields = function () {
            return BaseIndicatorDescriptionTimeFrame.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionTimeFrames in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionTimeFrames */
        BaseIndicatorDescriptionTimeFrame.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionTimeFrames exist. */
        BaseIndicatorDescriptionTimeFrame.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionTimeFrames method. */
        BaseIndicatorDescriptionTimeFrame.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionTimeFrame with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionTimeFrame to return.
         *  @return The matching IndicatorDescriptionTimeFrame, if one exists, or null. */
        BaseIndicatorDescriptionTimeFrame.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionTimeFrames based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionTimeFrames which match the provided filter. */
        BaseIndicatorDescriptionTimeFrame.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionTimeFrames exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionTimeFrames which match the provided filter. */
        BaseIndicatorDescriptionTimeFrame.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionTimeFrames exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionTimeFrameswhich match the provided filter. */
        BaseIndicatorDescriptionTimeFrame.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionTimeFrames by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionTimeFrames by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionTimeFrames by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        BaseIndicatorDescriptionTimeFrame.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionTimeFrame.getIndicatorDescriptionForIndicatorDescriptionTimeFrame(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @param indicatorDescriptionTimeFrameID The ID of the IndicatorDescriptionTimeFrame to retrieve.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        BaseIndicatorDescriptionTimeFrame.getIndicatorDescriptionForIndicatorDescriptionTimeFrame = function (indicatorDescriptionTimeFrameID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionTimeFrameID: indicatorDescriptionTimeFrameID });
        };
        /** Gets IndicatorDescriptionTimeFrames by TimeframeID.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByTimeframeID = function (timeframeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID }, null, page);
        };
        /** Gets how many IndicatorDescriptionTimeFrames by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByTimeframeIDCount = function (timeframeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID });
        };
        /** Gets how many pages of IndicatorDescriptionTimeFrames by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        BaseIndicatorDescriptionTimeFrame.getByTimeframeIDPageCount = function (timeframeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID });
        };
        /** Returns the related Timeframe based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        BaseIndicatorDescriptionTimeFrame.prototype.getTimeframe = function (api, callback) {
            return IndicatorDescriptionTimeFrame.getTimeframeForIndicatorDescriptionTimeFrame(this.id, api, callback);
        };
        /** Returns the related Timeframe based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @param indicatorDescriptionTimeFrameID The ID of the IndicatorDescriptionTimeFrame to retrieve.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        BaseIndicatorDescriptionTimeFrame.getTimeframeForIndicatorDescriptionTimeFrame = function (indicatorDescriptionTimeFrameID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionTimeFrameID: indicatorDescriptionTimeFrameID });
        };
        BaseIndicatorDescriptionTimeFrame.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            timeframeID: new hiw.PropertyMap("timeframeID", "TimeframeID")
        };
        return BaseIndicatorDescriptionTimeFrame;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionTimeFrame = BaseIndicatorDescriptionTimeFrame;
    var IndicatorDescriptionTimeFrame = (function (_super) {
        __extends(IndicatorDescriptionTimeFrame, _super);
        function IndicatorDescriptionTimeFrame() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionTimeFrame;
    })(BaseIndicatorDescriptionTimeFrame);
    hiw.IndicatorDescriptionTimeFrame = IndicatorDescriptionTimeFrame;
    /** Contains properties and static functionality for the IndicatorDescriptionYear type. */
    var BaseIndicatorDescriptionYear = (function (_super) {
        __extends(BaseIndicatorDescriptionYear, _super);
        function BaseIndicatorDescriptionYear() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.yearID = null;
        }
        BaseIndicatorDescriptionYear.prototype.getFields = function () {
            return BaseIndicatorDescriptionYear.Fields;
        };
        /** Gets a list of all of the IndicatorDescriptionYears in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionYears */
        BaseIndicatorDescriptionYear.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDescriptionYears exist. */
        BaseIndicatorDescriptionYear.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDescriptionYears method. */
        BaseIndicatorDescriptionYear.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDescriptionYear with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionYear to return.
         *  @return The matching IndicatorDescriptionYear, if one exists, or null. */
        BaseIndicatorDescriptionYear.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDescriptionYears based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionYears which match the provided filter. */
        BaseIndicatorDescriptionYear.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDescriptionYears exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionYears which match the provided filter. */
        BaseIndicatorDescriptionYear.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDescriptionYears exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionYearswhich match the provided filter. */
        BaseIndicatorDescriptionYear.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDescriptionYears by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDescriptionYears by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDescriptionYears by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionYear.
         *  @return A single IndicatorDescriptionYear, or null. */
        BaseIndicatorDescriptionYear.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDescriptionYear.getIndicatorDescriptionForIndicatorDescriptionYear(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionYear.
         *  @param indicatorDescriptionYearID The ID of the IndicatorDescriptionYear to retrieve.
         *  @return A single IndicatorDescriptionYear, or null. */
        BaseIndicatorDescriptionYear.getIndicatorDescriptionForIndicatorDescriptionYear = function (indicatorDescriptionYearID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionYearID: indicatorDescriptionYearID });
        };
        /** Gets IndicatorDescriptionYears by YearID.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByYearID = function (yearID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { yearID: yearID }, null, page);
        };
        /** Gets how many IndicatorDescriptionYears by YearID exist.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByYearIDCount = function (yearID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { yearID: yearID });
        };
        /** Gets how many pages of IndicatorDescriptionYears by YearID exist.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        BaseIndicatorDescriptionYear.getByYearIDPageCount = function (yearID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { yearID: yearID });
        };
        /** Returns the related Year based on the unique ID of the related IndicatorDescriptionYear.
         *  @return A single IndicatorDescriptionYear, or null. */
        BaseIndicatorDescriptionYear.prototype.getYear = function (api, callback) {
            return IndicatorDescriptionYear.getYearForIndicatorDescriptionYear(this.id, api, callback);
        };
        /** Returns the related Year based on the unique ID of the related IndicatorDescriptionYear.
         *  @param indicatorDescriptionYearID The ID of the IndicatorDescriptionYear to retrieve.
         *  @return A single IndicatorDescriptionYear, or null. */
        BaseIndicatorDescriptionYear.getYearForIndicatorDescriptionYear = function (indicatorDescriptionYearID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionYearID: indicatorDescriptionYearID });
        };
        /** Gets a unique IndicatorDescriptionYear based on the provided values.
         *  @return A single IndicatorDescriptionYear, or null. */
        BaseIndicatorDescriptionYear.getByIndicatorDescriptionIDAndYearID = function (indicatorDescriptionID, yearID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID, yearID: yearID });
        };
        BaseIndicatorDescriptionYear.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            yearID: new hiw.PropertyMap("yearID", "YearID")
        };
        return BaseIndicatorDescriptionYear;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDescriptionYear = BaseIndicatorDescriptionYear;
    var IndicatorDescriptionYear = (function (_super) {
        __extends(IndicatorDescriptionYear, _super);
        function IndicatorDescriptionYear() {
            _super.apply(this, arguments);
        }
        return IndicatorDescriptionYear;
    })(BaseIndicatorDescriptionYear);
    hiw.IndicatorDescriptionYear = IndicatorDescriptionYear;
    /** Contains properties and static functionality for the IndicatorDimensionGraph type. */
    var BaseIndicatorDimensionGraph = (function (_super) {
        __extends(BaseIndicatorDimensionGraph, _super);
        function BaseIndicatorDimensionGraph() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.localeLevelID = null;
            this.dimensionGraphID = null;
        }
        BaseIndicatorDimensionGraph.prototype.getFields = function () {
            return BaseIndicatorDimensionGraph.Fields;
        };
        /** Gets a list of all of the IndicatorDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDimensionGraphs */
        BaseIndicatorDimensionGraph.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDimensionGraphs exist. */
        BaseIndicatorDimensionGraph.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDimensionGraphs method. */
        BaseIndicatorDimensionGraph.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDimensionGraph to return.
         *  @return The matching IndicatorDimensionGraph, if one exists, or null. */
        BaseIndicatorDimensionGraph.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDimensionGraphs which match the provided filter. */
        BaseIndicatorDimensionGraph.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDimensionGraphs which match the provided filter. */
        BaseIndicatorDimensionGraph.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDimensionGraphswhich match the provided filter. */
        BaseIndicatorDimensionGraph.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.prototype.getIndicatorDescription = function (api, callback) {
            return IndicatorDimensionGraph.getIndicatorDescriptionForIndicatorDimensionGraph(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.getIndicatorDescriptionForIndicatorDimensionGraph = function (indicatorDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDimensionGraphID: indicatorDimensionGraphID });
        };
        /** Gets IndicatorDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByLocaleLevelID = function (localeLevelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID }, null, page);
        };
        /** Gets how many IndicatorDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByLocaleLevelIDCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Gets how many pages of IndicatorDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByLocaleLevelIDPageCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.prototype.getLocaleLevel = function (api, callback) {
            return IndicatorDimensionGraph.getLocaleLevelForIndicatorDimensionGraph(this.id, api, callback);
        };
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.getLocaleLevelForIndicatorDimensionGraph = function (indicatorDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDimensionGraphID: indicatorDimensionGraphID });
        };
        /** Gets IndicatorDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByDimensionGraphID = function (dimensionGraphID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID }, null, page);
        };
        /** Gets how many IndicatorDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByDimensionGraphIDCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets how many pages of IndicatorDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        BaseIndicatorDimensionGraph.getByDimensionGraphIDPageCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.prototype.getDimensionGraph = function (api, callback) {
            return IndicatorDimensionGraph.getDimensionGraphForIndicatorDimensionGraph(this.id, api, callback);
        };
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        BaseIndicatorDimensionGraph.getDimensionGraphForIndicatorDimensionGraph = function (indicatorDimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDimensionGraphID: indicatorDimensionGraphID });
        };
        BaseIndicatorDimensionGraph.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            localeLevelID: new hiw.PropertyMap("localeLevelID", "LocaleLevelID"),
            dimensionGraphID: new hiw.PropertyMap("dimensionGraphID", "DimensionGraphID")
        };
        return BaseIndicatorDimensionGraph;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDimensionGraph = BaseIndicatorDimensionGraph;
    var IndicatorDimensionGraph = (function (_super) {
        __extends(IndicatorDimensionGraph, _super);
        function IndicatorDimensionGraph() {
            _super.apply(this, arguments);
        }
        return IndicatorDimensionGraph;
    })(BaseIndicatorDimensionGraph);
    hiw.IndicatorDimensionGraph = IndicatorDimensionGraph;
    /** Contains properties and static functionality for the IndicatorDimension type. */
    var BaseIndicatorDimension = (function (_super) {
        __extends(BaseIndicatorDimension, _super);
        function BaseIndicatorDimension() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorID = null;
            this.dimensionBookID = null;
        }
        BaseIndicatorDimension.prototype.getFields = function () {
            return BaseIndicatorDimension.Fields;
        };
        /** Gets a list of all of the IndicatorDimensions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDimensions */
        BaseIndicatorDimension.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many IndicatorDimensions exist. */
        BaseIndicatorDimension.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the IndicatorDimensions method. */
        BaseIndicatorDimension.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the IndicatorDimension with the specified primary key.
         *  @param id The primary key of the IndicatorDimension to return.
         *  @return The matching IndicatorDimension, if one exists, or null. */
        BaseIndicatorDimension.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of IndicatorDimensions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDimensions which match the provided filter. */
        BaseIndicatorDimension.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many IndicatorDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDimensions which match the provided filter. */
        BaseIndicatorDimension.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of IndicatorDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDimensionswhich match the provided filter. */
        BaseIndicatorDimension.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets IndicatorDimensions by IndicatorID.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByIndicatorID = function (indicatorID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID }, null, page);
        };
        /** Gets how many IndicatorDimensions by IndicatorID exist.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByIndicatorIDCount = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Gets how many pages of IndicatorDimensions by IndicatorID exist.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByIndicatorIDPageCount = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Returns the related Indicator based on the unique ID of the related IndicatorDimension.
         *  @return A single IndicatorDimension, or null. */
        BaseIndicatorDimension.prototype.getIndicator = function (api, callback) {
            return IndicatorDimension.getIndicatorForIndicatorDimension(this.id, api, callback);
        };
        /** Returns the related Indicator based on the unique ID of the related IndicatorDimension.
         *  @param indicatorDimensionID The ID of the IndicatorDimension to retrieve.
         *  @return A single IndicatorDimension, or null. */
        BaseIndicatorDimension.getIndicatorForIndicatorDimension = function (indicatorDimensionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDimensionID: indicatorDimensionID });
        };
        /** Gets IndicatorDimensions by DimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByDimensionBookID = function (dimensionBookID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID }, null, page);
        };
        /** Gets how many IndicatorDimensions by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByDimensionBookIDCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Gets how many pages of IndicatorDimensions by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        BaseIndicatorDimension.getByDimensionBookIDPageCount = function (dimensionBookID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID });
        };
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDimension.
         *  @return A single IndicatorDimension, or null. */
        BaseIndicatorDimension.prototype.getDimensionBook = function (api, callback) {
            return IndicatorDimension.getDimensionBookForIndicatorDimension(this.id, api, callback);
        };
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDimension.
         *  @param indicatorDimensionID The ID of the IndicatorDimension to retrieve.
         *  @return A single IndicatorDimension, or null. */
        BaseIndicatorDimension.getDimensionBookForIndicatorDimension = function (indicatorDimensionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDimensionID: indicatorDimensionID });
        };
        /** Gets a unique IndicatorDimension based on the provided values.
         *  @return A single IndicatorDimension, or null. */
        BaseIndicatorDimension.getByDimensionBookIDAndIndicatorID = function (dimensionBookID, indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionBookID: dimensionBookID, indicatorID: indicatorID });
        };
        BaseIndicatorDimension.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorID: new hiw.PropertyMap("indicatorID", "IndicatorID"),
            dimensionBookID: new hiw.PropertyMap("dimensionBookID", "DimensionBookID")
        };
        return BaseIndicatorDimension;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicatorDimension = BaseIndicatorDimension;
    var IndicatorDimension = (function (_super) {
        __extends(IndicatorDimension, _super);
        function IndicatorDimension() {
            _super.apply(this, arguments);
        }
        return IndicatorDimension;
    })(BaseIndicatorDimension);
    hiw.IndicatorDimension = IndicatorDimension;
    /** Contains properties and static functionality for the Indicator type. */
    var BaseIndicator = (function (_super) {
        __extends(BaseIndicator, _super);
        function BaseIndicator() {
            _super.apply(this, arguments);
            this.id = null;
            this.indicatorDescriptionID = null;
            this.timeframeID = null;
            this.localeID = null;
            this.dimensionGraphID = null;
            this.dimensionGraphSortOrder = null;
            this.modifierGraphID = null;
            this.modifierGraphSortOrder = null;
            this.dimensionGraphHeader = null;
            this.dimensionGraphLabel = null;
            this.floatValue = null;
            this.formattedValue = null;
            this.graphValue = null;
            this.textualValue = null;
            this.confidenceIntervalLow = null;
            this.confidenceIntervalLowFormatted = null;
            this.graphCILowValue = null;
            this.confidenceIntervalHigh = null;
            this.confidenceIntervalHighFormatted = null;
            this.graphCIHighValue = null;
            this.standardError = null;
            this.standardErrorGraphValue = null;
            this.standardErrorFormatted = null;
            this.floatTarget = null;
            this.integralTarget = null;
            this.formattedTarget = null;
            this.numerator = null;
            this.denominator = null;
            this.fipsCode = null;
            this.hrrCode = null;
            this.ssaCode = null;
        }
        BaseIndicator.prototype.getFields = function () {
            return BaseIndicator.Fields;
        };
        /** Gets a list of all of the Indicators in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Indicators */
        BaseIndicator.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Indicators exist. */
        BaseIndicator.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Indicators method. */
        BaseIndicator.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Indicator with the specified primary key.
         *  @param id The primary key of the Indicator to return.
         *  @return The matching Indicator, if one exists, or null. */
        BaseIndicator.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Indicators based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Indicators which match the provided filter. */
        BaseIndicator.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Indicators exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Indicators which match the provided filter. */
        BaseIndicator.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Indicators exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Indicatorswhich match the provided filter. */
        BaseIndicator.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Indicators by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many Indicators by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of Indicators by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        BaseIndicator.prototype.getIndicatorDescription = function (api, callback) {
            return Indicator.getIndicatorDescriptionForIndicator(this.id, api, callback);
        };
        /** Returns the related IndicatorDescription based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        BaseIndicator.getIndicatorDescriptionForIndicator = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Gets Indicators by TimeframeID.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByTimeframeID = function (timeframeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID }, null, page);
        };
        /** Gets how many Indicators by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByTimeframeIDCount = function (timeframeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID });
        };
        /** Gets how many pages of Indicators by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByTimeframeIDPageCount = function (timeframeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { timeframeID: timeframeID });
        };
        /** Returns the related Timeframe based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        BaseIndicator.prototype.getTimeframe = function (api, callback) {
            return Indicator.getTimeframeForIndicator(this.id, api, callback);
        };
        /** Returns the related Timeframe based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        BaseIndicator.getTimeframeForIndicator = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Gets Indicators by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many Indicators by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of Indicators by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related Locale based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        BaseIndicator.prototype.getLocale = function (api, callback) {
            return Indicator.getLocaleForIndicator(this.id, api, callback);
        };
        /** Returns the related Locale based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        BaseIndicator.getLocaleForIndicator = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Gets Indicators by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByDimensionGraphID = function (dimensionGraphID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID }, null, page);
        };
        /** Gets how many Indicators by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByDimensionGraphIDCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Gets how many pages of Indicators by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByDimensionGraphIDPageCount = function (dimensionGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { dimensionGraphID: dimensionGraphID });
        };
        /** Returns the related DimensionGraph based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        BaseIndicator.prototype.getDimensionGraph = function (api, callback) {
            return Indicator.getDimensionGraphForIndicator(this.id, api, callback);
        };
        /** Returns the related DimensionGraph based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        BaseIndicator.getDimensionGraphForIndicator = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        /** Gets Indicators by ModifierGraphID.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByModifierGraphID = function (modifierGraphID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID }, null, page);
        };
        /** Gets how many Indicators by ModifierGraphID exist.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByModifierGraphIDCount = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Gets how many pages of Indicators by ModifierGraphID exist.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        BaseIndicator.getByModifierGraphIDPageCount = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Returns the related ModifierGraph based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        BaseIndicator.prototype.getModifierGraph = function (api, callback) {
            return Indicator.getModifierGraphForIndicator(this.id, api, callback);
        };
        /** Returns the related ModifierGraph based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        BaseIndicator.getModifierGraphForIndicator = function (indicatorID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorID: indicatorID });
        };
        BaseIndicator.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            indicatorDescriptionID: new hiw.PropertyMap("indicatorDescriptionID", "IndicatorDescriptionID"),
            timeframeID: new hiw.PropertyMap("timeframeID", "TimeframeID"),
            localeID: new hiw.PropertyMap("localeID", "LocaleID"),
            dimensionGraphID: new hiw.PropertyMap("dimensionGraphID", "DimensionGraphID"),
            dimensionGraphSortOrder: new hiw.PropertyMap("dimensionGraphSortOrder", "DimensionGraphSortOrder"),
            modifierGraphID: new hiw.PropertyMap("modifierGraphID", "ModifierGraphID"),
            modifierGraphSortOrder: new hiw.PropertyMap("modifierGraphSortOrder", "ModifierGraphSortOrder"),
            dimensionGraphHeader: new hiw.PropertyMap("dimensionGraphHeader", "DimensionGraphHeader"),
            dimensionGraphLabel: new hiw.PropertyMap("dimensionGraphLabel", "DimensionGraphLabel"),
            floatValue: new hiw.PropertyMap("floatValue", "FloatValue"),
            formattedValue: new hiw.PropertyMap("formattedValue", "FormattedValue"),
            graphValue: new hiw.PropertyMap("graphValue", "GraphValue"),
            textualValue: new hiw.PropertyMap("textualValue", "TextualValue"),
            confidenceIntervalLow: new hiw.PropertyMap("confidenceIntervalLow", "ConfidenceIntervalLow"),
            confidenceIntervalLowFormatted: new hiw.PropertyMap("confidenceIntervalLowFormatted", "ConfidenceIntervalLowFormatted"),
            graphCILowValue: new hiw.PropertyMap("graphCILowValue", "GraphCILowValue"),
            confidenceIntervalHigh: new hiw.PropertyMap("confidenceIntervalHigh", "ConfidenceIntervalHigh"),
            confidenceIntervalHighFormatted: new hiw.PropertyMap("confidenceIntervalHighFormatted", "ConfidenceIntervalHighFormatted"),
            graphCIHighValue: new hiw.PropertyMap("graphCIHighValue", "GraphCIHighValue"),
            standardError: new hiw.PropertyMap("standardError", "StandardError"),
            standardErrorGraphValue: new hiw.PropertyMap("standardErrorGraphValue", "StandardErrorGraphValue"),
            standardErrorFormatted: new hiw.PropertyMap("standardErrorFormatted", "StandardErrorFormatted"),
            floatTarget: new hiw.PropertyMap("floatTarget", "FloatTarget"),
            integralTarget: new hiw.PropertyMap("integralTarget", "IntegralTarget"),
            formattedTarget: new hiw.PropertyMap("formattedTarget", "FormattedTarget"),
            numerator: new hiw.PropertyMap("numerator", "Numerator"),
            denominator: new hiw.PropertyMap("denominator", "Denominator"),
            fipsCode: new hiw.PropertyMap("fipsCode", "FIPSCode"),
            hrrCode: new hiw.PropertyMap("hrrCode", "HRRCode"),
            ssaCode: new hiw.PropertyMap("ssaCode", "SSACode")
        };
        return BaseIndicator;
    })(hiw.ServiceDataObject);
    hiw.BaseIndicator = BaseIndicator;
    var Indicator = (function (_super) {
        __extends(Indicator, _super);
        function Indicator() {
            _super.apply(this, arguments);
        }
        return Indicator;
    })(BaseIndicator);
    hiw.Indicator = Indicator;
    /** Contains properties and static functionality for the Initiative type. */
    var BaseInitiative = (function (_super) {
        __extends(BaseInitiative, _super);
        function BaseInitiative() {
            _super.apply(this, arguments);
            this.id = null;
            this.acronym = null;
            this.name = null;
            this.sortOrder = null;
            this.supplierAcronym = null;
            this.supplierName = null;
            this.acknowledgement = null;
            this.minimumYear = null;
            this.maximumYear = null;
            this.IsSSA = null;
            this.modifyDate = null;
        }
        BaseInitiative.prototype.getFields = function () {
            return BaseInitiative.Fields;
        };
        /** Gets a list of all of the Initiatives in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Initiatives */
        BaseInitiative.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Initiatives exist. */
        BaseInitiative.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Initiatives method. */
        BaseInitiative.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Initiative with the specified primary key.
         *  @param id The primary key of the Initiative to return.
         *  @return The matching Initiative, if one exists, or null. */
        BaseInitiative.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Initiatives based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Initiatives which match the provided filter. */
        BaseInitiative.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Initiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Initiatives which match the provided filter. */
        BaseInitiative.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Initiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Initiativeswhich match the provided filter. */
        BaseInitiative.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseInitiative.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            acronym: new hiw.PropertyMap("acronym", "Acronym"),
            name: new hiw.PropertyMap("name", "Name"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            supplierAcronym: new hiw.PropertyMap("supplierAcronym", "SupplierAcronym"),
            supplierName: new hiw.PropertyMap("supplierName", "SupplierName"),
            acknowledgement: new hiw.PropertyMap("acknowledgement", "Acknowledgement"),
            minimumYear: new hiw.PropertyMap("minimumYear", "MinimumYear"),
            maximumYear: new hiw.PropertyMap("maximumYear", "MaximumYear"),
            IsSSA: new hiw.PropertyMap("IsSSA", "IsSSA"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate")
        };
        return BaseInitiative;
    })(hiw.ServiceDataObject);
    hiw.BaseInitiative = BaseInitiative;
    var Initiative = (function (_super) {
        __extends(Initiative, _super);
        function Initiative() {
            _super.apply(this, arguments);
        }
        return Initiative;
    })(BaseInitiative);
    hiw.Initiative = Initiative;
    /** Contains properties and static functionality for the Intervention type. */
    var BaseIntervention = (function (_super) {
        __extends(BaseIntervention, _super);
        function BaseIntervention() {
            _super.apply(this, arguments);
            this.id = null;
            this.topic = null;
            this.urlID = null;
            this.proposedText = null;
            this.taskForceOnCommunityPreventiveServicesFinding = null;
            this.grade = null;
            this.interventionSource = null;
            this.sortOrder = null;
        }
        BaseIntervention.prototype.getFields = function () {
            return BaseIntervention.Fields;
        };
        /** Gets a list of all of the Interventions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Interventions */
        BaseIntervention.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Interventions exist. */
        BaseIntervention.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Interventions method. */
        BaseIntervention.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Intervention with the specified primary key.
         *  @param id The primary key of the Intervention to return.
         *  @return The matching Intervention, if one exists, or null. */
        BaseIntervention.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Interventions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Interventions which match the provided filter. */
        BaseIntervention.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Interventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Interventions which match the provided filter. */
        BaseIntervention.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Interventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Interventionswhich match the provided filter. */
        BaseIntervention.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Interventions by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        BaseIntervention.getByUrlID = function (urlID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID }, null, page);
        };
        /** Gets how many Interventions by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        BaseIntervention.getByUrlIDCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Gets how many pages of Interventions by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        BaseIntervention.getByUrlIDPageCount = function (urlID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { urlID: urlID });
        };
        /** Returns the related Url based on the unique ID of the related Intervention.
         *  @return A single Intervention, or null. */
        BaseIntervention.prototype.getUrl = function (api, callback) {
            return Intervention.getUrlForIntervention(this.id, api, callback);
        };
        /** Returns the related Url based on the unique ID of the related Intervention.
         *  @param interventionID The ID of the Intervention to retrieve.
         *  @return A single Intervention, or null. */
        BaseIntervention.getUrlForIntervention = function (interventionID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { interventionID: interventionID });
        };
        BaseIntervention.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            topic: new hiw.PropertyMap("topic", "Topic"),
            urlID: new hiw.PropertyMap("urlID", "UrlID"),
            proposedText: new hiw.PropertyMap("proposedText", "ProposedText"),
            taskForceOnCommunityPreventiveServicesFinding: new hiw.PropertyMap("taskForceOnCommunityPreventiveServicesFinding", "TaskForceOnCommunityPreventiveServicesFinding"),
            grade: new hiw.PropertyMap("grade", "Grade"),
            interventionSource: new hiw.PropertyMap("interventionSource", "InterventionSource"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseIntervention;
    })(hiw.ServiceDataObject);
    hiw.BaseIntervention = BaseIntervention;
    var Intervention = (function (_super) {
        __extends(Intervention, _super);
        function Intervention() {
            _super.apply(this, arguments);
        }
        return Intervention;
    })(BaseIntervention);
    hiw.Intervention = Intervention;
    /** Contains properties and static functionality for the Keyword type. */
    var BaseKeyword = (function (_super) {
        __extends(BaseKeyword, _super);
        function BaseKeyword() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.showOnProfile = null;
            this.forDevelopment = null;
            this.enabled = null;
            this.modifyDate = null;
            this.countOfIndicatorDescription = null;
        }
        BaseKeyword.prototype.getFields = function () {
            return BaseKeyword.Fields;
        };
        /** Gets a list of all of the Keywords in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Keywords */
        BaseKeyword.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Keywords exist. */
        BaseKeyword.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Keywords method. */
        BaseKeyword.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Keyword with the specified primary key.
         *  @param id The primary key of the Keyword to return.
         *  @return The matching Keyword, if one exists, or null. */
        BaseKeyword.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Keywords based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Keywords which match the provided filter. */
        BaseKeyword.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Keywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Keywords which match the provided filter. */
        BaseKeyword.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Keywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Keywordswhich match the provided filter. */
        BaseKeyword.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseKeyword.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            showOnProfile: new hiw.PropertyMap("showOnProfile", "ShowOnProfile"),
            forDevelopment: new hiw.PropertyMap("forDevelopment", "ForDevelopment"),
            enabled: new hiw.PropertyMap("enabled", "Enabled"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate"),
            countOfIndicatorDescription: new hiw.PropertyMap("countOfIndicatorDescription", "CountOfIndicatorDescription")
        };
        return BaseKeyword;
    })(hiw.ServiceDataObject);
    hiw.BaseKeyword = BaseKeyword;
    var Keyword = (function (_super) {
        __extends(Keyword, _super);
        function Keyword() {
            _super.apply(this, arguments);
        }
        return Keyword;
    })(BaseKeyword);
    hiw.Keyword = Keyword;
    /** Contains properties and static functionality for the LocaleLevel type. */
    var BaseLocaleLevel = (function (_super) {
        __extends(BaseLocaleLevel, _super);
        function BaseLocaleLevel() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.sortOrder = null;
        }
        BaseLocaleLevel.prototype.getFields = function () {
            return BaseLocaleLevel.Fields;
        };
        /** Gets a list of all of the LocaleLevels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of LocaleLevels */
        BaseLocaleLevel.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many LocaleLevels exist. */
        BaseLocaleLevel.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the LocaleLevels method. */
        BaseLocaleLevel.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the LocaleLevel with the specified primary key.
         *  @param id The primary key of the LocaleLevel to return.
         *  @return The matching LocaleLevel, if one exists, or null. */
        BaseLocaleLevel.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of LocaleLevels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All LocaleLevels which match the provided filter. */
        BaseLocaleLevel.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many LocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of LocaleLevels which match the provided filter. */
        BaseLocaleLevel.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of LocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of LocaleLevelswhich match the provided filter. */
        BaseLocaleLevel.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseLocaleLevel.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseLocaleLevel;
    })(hiw.ServiceDataObject);
    hiw.BaseLocaleLevel = BaseLocaleLevel;
    var LocaleLevel = (function (_super) {
        __extends(LocaleLevel, _super);
        function LocaleLevel() {
            _super.apply(this, arguments);
        }
        return LocaleLevel;
    })(BaseLocaleLevel);
    hiw.LocaleLevel = LocaleLevel;
    /** Contains properties and static functionality for the LocaleRelation type. */
    var BaseLocaleRelation = (function (_super) {
        __extends(BaseLocaleRelation, _super);
        function BaseLocaleRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorLocaleID = null;
            this.descendantLocaleID = null;
            this.hops = null;
        }
        BaseLocaleRelation.prototype.getFields = function () {
            return BaseLocaleRelation.Fields;
        };
        /** Gets a list of all of the LocaleRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of LocaleRelations */
        BaseLocaleRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many LocaleRelations exist. */
        BaseLocaleRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the LocaleRelations method. */
        BaseLocaleRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the LocaleRelation with the specified primary key.
         *  @param id The primary key of the LocaleRelation to return.
         *  @return The matching LocaleRelation, if one exists, or null. */
        BaseLocaleRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of LocaleRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All LocaleRelations which match the provided filter. */
        BaseLocaleRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many LocaleRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of LocaleRelations which match the provided filter. */
        BaseLocaleRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of LocaleRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of LocaleRelationswhich match the provided filter. */
        BaseLocaleRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets LocaleRelations by AncestorLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByAncestorLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many LocaleRelations by AncestorLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByAncestorLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of LocaleRelations by AncestorLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByAncestorLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related AncestorLocale based on the unique ID of the related LocaleRelation.
         *  @return A single LocaleRelation, or null. */
        BaseLocaleRelation.prototype.getAncestorLocale = function (api, callback) {
            return LocaleRelation.getAncestorLocaleForLocaleRelation(this.id, api, callback);
        };
        /** Returns the related AncestorLocale based on the unique ID of the related LocaleRelation.
         *  @param localeRelationID The ID of the LocaleRelation to retrieve.
         *  @return A single LocaleRelation, or null. */
        BaseLocaleRelation.getAncestorLocaleForLocaleRelation = function (localeRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeRelationID: localeRelationID });
        };
        /** Gets LocaleRelations by DescendantLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByDescendantLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many LocaleRelations by DescendantLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByDescendantLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of LocaleRelations by DescendantLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        BaseLocaleRelation.getByDescendantLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related DescendantLocale based on the unique ID of the related LocaleRelation.
         *  @return A single LocaleRelation, or null. */
        BaseLocaleRelation.prototype.getDescendantLocale = function (api, callback) {
            return LocaleRelation.getDescendantLocaleForLocaleRelation(this.id, api, callback);
        };
        /** Returns the related DescendantLocale based on the unique ID of the related LocaleRelation.
         *  @param localeRelationID The ID of the LocaleRelation to retrieve.
         *  @return A single LocaleRelation, or null. */
        BaseLocaleRelation.getDescendantLocaleForLocaleRelation = function (localeRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeRelationID: localeRelationID });
        };
        /** Gets a unique LocaleRelation based on the provided values.
         *  @return A single LocaleRelation, or null. */
        BaseLocaleRelation.getByAncestorLocaleIDAndDescendantLocaleID = function (ancestorLocaleID, descendantLocaleID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { ancestorLocaleID: ancestorLocaleID, descendantLocaleID: descendantLocaleID });
        };
        BaseLocaleRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorLocaleID: new hiw.PropertyMap("ancestorLocaleID", "AncestorLocaleID"),
            descendantLocaleID: new hiw.PropertyMap("descendantLocaleID", "DescendantLocaleID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseLocaleRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseLocaleRelation = BaseLocaleRelation;
    var LocaleRelation = (function (_super) {
        __extends(LocaleRelation, _super);
        function LocaleRelation() {
            _super.apply(this, arguments);
        }
        return LocaleRelation;
    })(BaseLocaleRelation);
    hiw.LocaleRelation = LocaleRelation;
    /** Contains properties and static functionality for the Locale type. */
    var BaseLocale = (function (_super) {
        __extends(BaseLocale, _super);
        function BaseLocale() {
            _super.apply(this, arguments);
            this.id = null;
            this.parentLocaleID = null;
            this.fips_int = null;
            this.stateFIPSCode = null;
            this.countyFIPSCode = null;
            this.countySSACode = null;
            this.hrrCode = null;
            this.fullName = null;
            this.name = null;
            this.sortOrder = null;
            this.abbreviation = null;
            this.localeLevelID = null;
        }
        BaseLocale.prototype.getFields = function () {
            return BaseLocale.Fields;
        };
        /** Gets a list of all of the Locales in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Locales */
        BaseLocale.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Locales exist. */
        BaseLocale.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Locales method. */
        BaseLocale.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Locale with the specified primary key.
         *  @param id The primary key of the Locale to return.
         *  @return The matching Locale, if one exists, or null. */
        BaseLocale.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Locales based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Locales which match the provided filter. */
        BaseLocale.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Locales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Locales which match the provided filter. */
        BaseLocale.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Locales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Localeswhich match the provided filter. */
        BaseLocale.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Locales by ParentLocaleID.
         *  @return An Array of Locales. */
        BaseLocale.prototype.getLocales = function (api, callback, page) {
            return Locale.getByParentLocaleID(this.id, api, callback, page);
        };
        /** Gets Locales by ParentLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByParentLocaleID = function (localeID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID }, null, page);
        };
        /** Gets how many Locales by ParentLocaleID exist.
         *  @return An Array of Locales. */
        BaseLocale.prototype.getLocalesCount = function (api, callback) {
            return Locale.getByParentLocaleIDCount(this.id, api, callback);
        };
        /** Gets how many Locales by ParentLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByParentLocaleIDCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets how many pages of Locales by ParentLocaleID exist.
         *  @return An Array of Locales. */
        BaseLocale.prototype.getLocalesPageCount = function (api, callback) {
            return Locale.getByParentLocaleIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Locales by ParentLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByParentLocaleIDPageCount = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Returns the related ParentLocale based on the unique ID of the related Locale.
         *  @return A single Locale, or null. */
        BaseLocale.prototype.getParentLocale = function (api, callback) {
            return Locale.getParentLocaleForLocale(this.id, api, callback);
        };
        /** Returns the related ParentLocale based on the unique ID of the related Locale.
         *  @param localeID The ID of the Locale to retrieve.
         *  @return A single Locale, or null. */
        BaseLocale.getParentLocaleForLocale = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        /** Gets Locales by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByLocaleLevelID = function (localeLevelID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID }, null, page);
        };
        /** Gets how many Locales by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByLocaleLevelIDCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Gets how many pages of Locales by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        BaseLocale.getByLocaleLevelIDPageCount = function (localeLevelID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeLevelID: localeLevelID });
        };
        /** Returns the related LocaleLevel based on the unique ID of the related Locale.
         *  @return A single Locale, or null. */
        BaseLocale.prototype.getLocaleLevel = function (api, callback) {
            return Locale.getLocaleLevelForLocale(this.id, api, callback);
        };
        /** Returns the related LocaleLevel based on the unique ID of the related Locale.
         *  @param localeID The ID of the Locale to retrieve.
         *  @return A single Locale, or null. */
        BaseLocale.getLocaleLevelForLocale = function (localeID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { localeID: localeID });
        };
        BaseLocale.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            parentLocaleID: new hiw.PropertyMap("parentLocaleID", "ParentLocaleID"),
            fips_int: new hiw.PropertyMap("fips_int", "FIPS_int"),
            stateFIPSCode: new hiw.PropertyMap("stateFIPSCode", "StateFIPSCode"),
            countyFIPSCode: new hiw.PropertyMap("countyFIPSCode", "CountyFIPSCode"),
            countySSACode: new hiw.PropertyMap("countySSACode", "CountySSACode"),
            hrrCode: new hiw.PropertyMap("hrrCode", "HRRCode"),
            fullName: new hiw.PropertyMap("fullName", "FullName"),
            name: new hiw.PropertyMap("name", "Name"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            abbreviation: new hiw.PropertyMap("abbreviation", "Abbreviation"),
            localeLevelID: new hiw.PropertyMap("localeLevelID", "LocaleLevelID")
        };
        return BaseLocale;
    })(hiw.ServiceDataObject);
    hiw.BaseLocale = BaseLocale;
    var Locale = (function (_super) {
        __extends(Locale, _super);
        function Locale() {
            _super.apply(this, arguments);
        }
        return Locale;
    })(BaseLocale);
    hiw.Locale = Locale;
    /** Contains properties and static functionality for the MaritalStatus type. */
    var BaseMaritalStatus = (function (_super) {
        __extends(BaseMaritalStatus, _super);
        function BaseMaritalStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentMaritalStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseMaritalStatus.prototype.getFields = function () {
            return BaseMaritalStatus.Fields;
        };
        /** Gets a list of all of the MaritalStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of MaritalStatuses */
        BaseMaritalStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many MaritalStatuses exist. */
        BaseMaritalStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the MaritalStatuses method. */
        BaseMaritalStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the MaritalStatus with the specified primary key.
         *  @param id The primary key of the MaritalStatus to return.
         *  @return The matching MaritalStatus, if one exists, or null. */
        BaseMaritalStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of MaritalStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All MaritalStatuses which match the provided filter. */
        BaseMaritalStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many MaritalStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of MaritalStatuses which match the provided filter. */
        BaseMaritalStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of MaritalStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of MaritalStatuseswhich match the provided filter. */
        BaseMaritalStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets MaritalStatuses by ParentMaritalStatusID.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.prototype.getMaritalStatuses = function (api, callback, page) {
            return MaritalStatus.getByParentMaritalStatusID(this.id, api, callback, page);
        };
        /** Gets MaritalStatuses by ParentMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.getByParentMaritalStatusID = function (maritalStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID }, null, page);
        };
        /** Gets how many MaritalStatuses by ParentMaritalStatusID exist.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.prototype.getMaritalStatusesCount = function (api, callback) {
            return MaritalStatus.getByParentMaritalStatusIDCount(this.id, api, callback);
        };
        /** Gets how many MaritalStatuses by ParentMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.getByParentMaritalStatusIDCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Gets how many pages of MaritalStatuses by ParentMaritalStatusID exist.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.prototype.getMaritalStatusesPageCount = function (api, callback) {
            return MaritalStatus.getByParentMaritalStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of MaritalStatuses by ParentMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        BaseMaritalStatus.getByParentMaritalStatusIDPageCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Returns the related ParentMaritalStatus based on the unique ID of the related MaritalStatus.
         *  @return A single MaritalStatus, or null. */
        BaseMaritalStatus.prototype.getParentMaritalStatus = function (api, callback) {
            return MaritalStatus.getParentMaritalStatusForMaritalStatus(this.id, api, callback);
        };
        /** Returns the related ParentMaritalStatus based on the unique ID of the related MaritalStatus.
         *  @param maritalStatusID The ID of the MaritalStatus to retrieve.
         *  @return A single MaritalStatus, or null. */
        BaseMaritalStatus.getParentMaritalStatusForMaritalStatus = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        BaseMaritalStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentMaritalStatusID: new hiw.PropertyMap("parentMaritalStatusID", "ParentMaritalStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseMaritalStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseMaritalStatus = BaseMaritalStatus;
    var MaritalStatus = (function (_super) {
        __extends(MaritalStatus, _super);
        function MaritalStatus() {
            _super.apply(this, arguments);
        }
        return MaritalStatus;
    })(BaseMaritalStatus);
    hiw.MaritalStatus = MaritalStatus;
    /** Contains properties and static functionality for the MaritalStatusRelation type. */
    var BaseMaritalStatusRelation = (function (_super) {
        __extends(BaseMaritalStatusRelation, _super);
        function BaseMaritalStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorMaritalStatusID = null;
            this.descendantMaritalStatusID = null;
            this.hops = null;
        }
        BaseMaritalStatusRelation.prototype.getFields = function () {
            return BaseMaritalStatusRelation.Fields;
        };
        /** Gets a list of all of the MaritalStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of MaritalStatusRelations */
        BaseMaritalStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many MaritalStatusRelations exist. */
        BaseMaritalStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the MaritalStatusRelations method. */
        BaseMaritalStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the MaritalStatusRelation with the specified primary key.
         *  @param id The primary key of the MaritalStatusRelation to return.
         *  @return The matching MaritalStatusRelation, if one exists, or null. */
        BaseMaritalStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of MaritalStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All MaritalStatusRelations which match the provided filter. */
        BaseMaritalStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many MaritalStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of MaritalStatusRelations which match the provided filter. */
        BaseMaritalStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of MaritalStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of MaritalStatusRelationswhich match the provided filter. */
        BaseMaritalStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets MaritalStatusRelations by AncestorMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByAncestorMaritalStatusID = function (maritalStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID }, null, page);
        };
        /** Gets how many MaritalStatusRelations by AncestorMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByAncestorMaritalStatusIDCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Gets how many pages of MaritalStatusRelations by AncestorMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByAncestorMaritalStatusIDPageCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Returns the related AncestorMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @return A single MaritalStatusRelation, or null. */
        BaseMaritalStatusRelation.prototype.getAncestorMaritalStatus = function (api, callback) {
            return MaritalStatusRelation.getAncestorMaritalStatusForMaritalStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @param maritalStatusRelationID The ID of the MaritalStatusRelation to retrieve.
         *  @return A single MaritalStatusRelation, or null. */
        BaseMaritalStatusRelation.getAncestorMaritalStatusForMaritalStatusRelation = function (maritalStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusRelationID: maritalStatusRelationID });
        };
        /** Gets MaritalStatusRelations by DescendantMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByDescendantMaritalStatusID = function (maritalStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID }, null, page);
        };
        /** Gets how many MaritalStatusRelations by DescendantMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByDescendantMaritalStatusIDCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Gets how many pages of MaritalStatusRelations by DescendantMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        BaseMaritalStatusRelation.getByDescendantMaritalStatusIDPageCount = function (maritalStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusID: maritalStatusID });
        };
        /** Returns the related DescendantMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @return A single MaritalStatusRelation, or null. */
        BaseMaritalStatusRelation.prototype.getDescendantMaritalStatus = function (api, callback) {
            return MaritalStatusRelation.getDescendantMaritalStatusForMaritalStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @param maritalStatusRelationID The ID of the MaritalStatusRelation to retrieve.
         *  @return A single MaritalStatusRelation, or null. */
        BaseMaritalStatusRelation.getDescendantMaritalStatusForMaritalStatusRelation = function (maritalStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { maritalStatusRelationID: maritalStatusRelationID });
        };
        BaseMaritalStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorMaritalStatusID: new hiw.PropertyMap("ancestorMaritalStatusID", "AncestorMaritalStatusID"),
            descendantMaritalStatusID: new hiw.PropertyMap("descendantMaritalStatusID", "DescendantMaritalStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseMaritalStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseMaritalStatusRelation = BaseMaritalStatusRelation;
    var MaritalStatusRelation = (function (_super) {
        __extends(MaritalStatusRelation, _super);
        function MaritalStatusRelation() {
            _super.apply(this, arguments);
        }
        return MaritalStatusRelation;
    })(BaseMaritalStatusRelation);
    hiw.MaritalStatusRelation = MaritalStatusRelation;
    /** Contains properties and static functionality for the Modifier type. */
    var BaseModifier = (function (_super) {
        __extends(BaseModifier, _super);
        function BaseModifier() {
            _super.apply(this, arguments);
            this.id = null;
            this.key = null;
            this.type = null;
            this.name = null;
            this.isHeader = null;
            this.isCompoundValue = null;
            this.indentedName = null;
            this.compoundName = null;
            this.parentModifierID = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
            this.chartName = null;
            this.downloadName = null;
        }
        BaseModifier.prototype.getFields = function () {
            return BaseModifier.Fields;
        };
        /** Gets a list of all of the Modifiers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Modifiers */
        BaseModifier.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Modifiers exist. */
        BaseModifier.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Modifiers method. */
        BaseModifier.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Modifier with the specified primary key.
         *  @param id The primary key of the Modifier to return.
         *  @return The matching Modifier, if one exists, or null. */
        BaseModifier.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Modifiers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Modifiers which match the provided filter. */
        BaseModifier.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Modifiers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Modifiers which match the provided filter. */
        BaseModifier.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Modifiers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Modifierswhich match the provided filter. */
        BaseModifier.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Modifiers by ParentModifierID.
         *  @return An Array of Modifiers. */
        BaseModifier.prototype.getModifiers = function (api, callback, page) {
            return Modifier.getByParentModifierID(this.id, api, callback, page);
        };
        /** Gets Modifiers by ParentModifierID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        BaseModifier.getByParentModifierID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many Modifiers by ParentModifierID exist.
         *  @return An Array of Modifiers. */
        BaseModifier.prototype.getModifiersCount = function (api, callback) {
            return Modifier.getByParentModifierIDCount(this.id, api, callback);
        };
        /** Gets how many Modifiers by ParentModifierID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        BaseModifier.getByParentModifierIDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of Modifiers by ParentModifierID exist.
         *  @return An Array of Modifiers. */
        BaseModifier.prototype.getModifiersPageCount = function (api, callback) {
            return Modifier.getByParentModifierIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Modifiers by ParentModifierID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        BaseModifier.getByParentModifierIDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related ParentModifier based on the unique ID of the related Modifier.
         *  @return A single Modifier, or null. */
        BaseModifier.prototype.getParentModifier = function (api, callback) {
            return Modifier.getParentModifierForModifier(this.id, api, callback);
        };
        /** Returns the related ParentModifier based on the unique ID of the related Modifier.
         *  @param modifierID The ID of the Modifier to retrieve.
         *  @return A single Modifier, or null. */
        BaseModifier.getParentModifierForModifier = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        BaseModifier.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            key: new hiw.PropertyMap("key", "Key"),
            type: new hiw.PropertyMap("type", "Type"),
            name: new hiw.PropertyMap("name", "Name"),
            isHeader: new hiw.PropertyMap("isHeader", "isHeader"),
            isCompoundValue: new hiw.PropertyMap("isCompoundValue", "isCompoundValue"),
            indentedName: new hiw.PropertyMap("indentedName", "IndentedName"),
            compoundName: new hiw.PropertyMap("compoundName", "CompoundName"),
            parentModifierID: new hiw.PropertyMap("parentModifierID", "ParentModifierID"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth"),
            chartName: new hiw.PropertyMap("chartName", "ChartName"),
            downloadName: new hiw.PropertyMap("downloadName", "DownloadName")
        };
        return BaseModifier;
    })(hiw.ServiceDataObject);
    hiw.BaseModifier = BaseModifier;
    var Modifier = (function (_super) {
        __extends(Modifier, _super);
        function Modifier() {
            _super.apply(this, arguments);
        }
        return Modifier;
    })(BaseModifier);
    hiw.Modifier = Modifier;
    /** Contains properties and static functionality for the ModifierGraph type. */
    var BaseModifierGraph = (function (_super) {
        __extends(BaseModifierGraph, _super);
        function BaseModifierGraph() {
            _super.apply(this, arguments);
            this.id = null;
            this.label = null;
            this.modifierGraphLabel = null;
            this.modifierValueIDList = null;
            this.modifierValueKeyList = null;
            this.modifierValueList = null;
            this.modifierCount = null;
            this.sortOrder = null;
            this.modifier1Value = null;
            this.modifier1ID = null;
            this.modifier1Key = null;
            this.modifier1SortOrder = null;
            this.modifier2Value = null;
            this.modifier2ID = null;
            this.modifier2Key = null;
            this.modifier2SortOrder = null;
            this.modifier3Value = null;
            this.modifier3ID = null;
            this.modifier3Key = null;
            this.modifierBook3SortOrder = null;
            this.modifier4Value = null;
            this.modifier4ID = null;
            this.modifier4Key = null;
            this.modifier4SortOrder = null;
            this.modifier5Value = null;
            this.modifier5ID = null;
            this.modifier5Key = null;
            this.modifier5SortOrder = null;
        }
        BaseModifierGraph.prototype.getFields = function () {
            return BaseModifierGraph.Fields;
        };
        /** Gets a list of all of the ModifierGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ModifierGraphs */
        BaseModifierGraph.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many ModifierGraphs exist. */
        BaseModifierGraph.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the ModifierGraphs method. */
        BaseModifierGraph.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the ModifierGraph with the specified primary key.
         *  @param id The primary key of the ModifierGraph to return.
         *  @return The matching ModifierGraph, if one exists, or null. */
        BaseModifierGraph.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of ModifierGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ModifierGraphs which match the provided filter. */
        BaseModifierGraph.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many ModifierGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ModifierGraphs which match the provided filter. */
        BaseModifierGraph.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of ModifierGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ModifierGraphswhich match the provided filter. */
        BaseModifierGraph.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets ModifierGraphs by Modifier1ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier1ID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many ModifierGraphs by Modifier1ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier1IDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of ModifierGraphs by Modifier1ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier1IDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related Modifier1 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.prototype.getModifier1 = function (api, callback) {
            return ModifierGraph.getModifier1ForModifierGraph(this.id, api, callback);
        };
        /** Returns the related Modifier1 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.getModifier1ForModifierGraph = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Gets ModifierGraphs by Modifier2ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier2ID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many ModifierGraphs by Modifier2ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier2IDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of ModifierGraphs by Modifier2ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier2IDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related Modifier2 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.prototype.getModifier2 = function (api, callback) {
            return ModifierGraph.getModifier2ForModifierGraph(this.id, api, callback);
        };
        /** Returns the related Modifier2 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.getModifier2ForModifierGraph = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Gets ModifierGraphs by Modifier3ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier3ID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many ModifierGraphs by Modifier3ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier3IDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of ModifierGraphs by Modifier3ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier3IDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related Modifier3 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.prototype.getModifier3 = function (api, callback) {
            return ModifierGraph.getModifier3ForModifierGraph(this.id, api, callback);
        };
        /** Returns the related Modifier3 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.getModifier3ForModifierGraph = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Gets ModifierGraphs by Modifier4ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier4ID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many ModifierGraphs by Modifier4ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier4IDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of ModifierGraphs by Modifier4ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier4IDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related Modifier4 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.prototype.getModifier4 = function (api, callback) {
            return ModifierGraph.getModifier4ForModifierGraph(this.id, api, callback);
        };
        /** Returns the related Modifier4 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.getModifier4ForModifierGraph = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        /** Gets ModifierGraphs by Modifier5ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier5ID = function (modifierID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID }, null, page);
        };
        /** Gets how many ModifierGraphs by Modifier5ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier5IDCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Gets how many pages of ModifierGraphs by Modifier5ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        BaseModifierGraph.getByModifier5IDPageCount = function (modifierID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierID: modifierID });
        };
        /** Returns the related Modifier5 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.prototype.getModifier5 = function (api, callback) {
            return ModifierGraph.getModifier5ForModifierGraph(this.id, api, callback);
        };
        /** Returns the related Modifier5 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        BaseModifierGraph.getModifier5ForModifierGraph = function (modifierGraphID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { modifierGraphID: modifierGraphID });
        };
        BaseModifierGraph.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            label: new hiw.PropertyMap("label", "Label"),
            modifierGraphLabel: new hiw.PropertyMap("modifierGraphLabel", "ModifierGraphLabel"),
            modifierValueIDList: new hiw.PropertyMap("modifierValueIDList", "ModifierValueIDList"),
            modifierValueKeyList: new hiw.PropertyMap("modifierValueKeyList", "ModifierValueKeyList"),
            modifierValueList: new hiw.PropertyMap("modifierValueList", "ModifierValueList"),
            modifierCount: new hiw.PropertyMap("modifierCount", "ModifierCount"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            modifier1Value: new hiw.PropertyMap("modifier1Value", "Modifier1Value"),
            modifier1ID: new hiw.PropertyMap("modifier1ID", "Modifier1ID"),
            modifier1Key: new hiw.PropertyMap("modifier1Key", "Modifier1Key"),
            modifier1SortOrder: new hiw.PropertyMap("modifier1SortOrder", "Modifier1SortOrder"),
            modifier2Value: new hiw.PropertyMap("modifier2Value", "Modifier2Value"),
            modifier2ID: new hiw.PropertyMap("modifier2ID", "Modifier2ID"),
            modifier2Key: new hiw.PropertyMap("modifier2Key", "Modifier2Key"),
            modifier2SortOrder: new hiw.PropertyMap("modifier2SortOrder", "Modifier2SortOrder"),
            modifier3Value: new hiw.PropertyMap("modifier3Value", "Modifier3Value"),
            modifier3ID: new hiw.PropertyMap("modifier3ID", "Modifier3ID"),
            modifier3Key: new hiw.PropertyMap("modifier3Key", "Modifier3Key"),
            modifierBook3SortOrder: new hiw.PropertyMap("modifierBook3SortOrder", "ModifierBook3SortOrder"),
            modifier4Value: new hiw.PropertyMap("modifier4Value", "Modifier4Value"),
            modifier4ID: new hiw.PropertyMap("modifier4ID", "Modifier4ID"),
            modifier4Key: new hiw.PropertyMap("modifier4Key", "Modifier4Key"),
            modifier4SortOrder: new hiw.PropertyMap("modifier4SortOrder", "Modifier4SortOrder"),
            modifier5Value: new hiw.PropertyMap("modifier5Value", "Modifier5Value"),
            modifier5ID: new hiw.PropertyMap("modifier5ID", "Modifier5ID"),
            modifier5Key: new hiw.PropertyMap("modifier5Key", "Modifier5Key"),
            modifier5SortOrder: new hiw.PropertyMap("modifier5SortOrder", "Modifier5SortOrder")
        };
        return BaseModifierGraph;
    })(hiw.ServiceDataObject);
    hiw.BaseModifierGraph = BaseModifierGraph;
    var ModifierGraph = (function (_super) {
        __extends(ModifierGraph, _super);
        function ModifierGraph() {
            _super.apply(this, arguments);
        }
        return ModifierGraph;
    })(BaseModifierGraph);
    hiw.ModifierGraph = ModifierGraph;
    /** Contains properties and static functionality for the ObesityStatus type. */
    var BaseObesityStatus = (function (_super) {
        __extends(BaseObesityStatus, _super);
        function BaseObesityStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentObesityStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseObesityStatus.prototype.getFields = function () {
            return BaseObesityStatus.Fields;
        };
        /** Gets a list of all of the ObesityStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ObesityStatuses */
        BaseObesityStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many ObesityStatuses exist. */
        BaseObesityStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the ObesityStatuses method. */
        BaseObesityStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the ObesityStatus with the specified primary key.
         *  @param id The primary key of the ObesityStatus to return.
         *  @return The matching ObesityStatus, if one exists, or null. */
        BaseObesityStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of ObesityStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ObesityStatuses which match the provided filter. */
        BaseObesityStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many ObesityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ObesityStatuses which match the provided filter. */
        BaseObesityStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of ObesityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ObesityStatuseswhich match the provided filter. */
        BaseObesityStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets ObesityStatuses by ParentObesityStatusID.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.prototype.getObesityStatuses = function (api, callback, page) {
            return ObesityStatus.getByParentObesityStatusID(this.id, api, callback, page);
        };
        /** Gets ObesityStatuses by ParentObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.getByParentObesityStatusID = function (obesityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID }, null, page);
        };
        /** Gets how many ObesityStatuses by ParentObesityStatusID exist.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.prototype.getObesityStatusesCount = function (api, callback) {
            return ObesityStatus.getByParentObesityStatusIDCount(this.id, api, callback);
        };
        /** Gets how many ObesityStatuses by ParentObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.getByParentObesityStatusIDCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Gets how many pages of ObesityStatuses by ParentObesityStatusID exist.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.prototype.getObesityStatusesPageCount = function (api, callback) {
            return ObesityStatus.getByParentObesityStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of ObesityStatuses by ParentObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        BaseObesityStatus.getByParentObesityStatusIDPageCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Returns the related ParentObesityStatus based on the unique ID of the related ObesityStatus.
         *  @return A single ObesityStatus, or null. */
        BaseObesityStatus.prototype.getParentObesityStatus = function (api, callback) {
            return ObesityStatus.getParentObesityStatusForObesityStatus(this.id, api, callback);
        };
        /** Returns the related ParentObesityStatus based on the unique ID of the related ObesityStatus.
         *  @param obesityStatusID The ID of the ObesityStatus to retrieve.
         *  @return A single ObesityStatus, or null. */
        BaseObesityStatus.getParentObesityStatusForObesityStatus = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        BaseObesityStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentObesityStatusID: new hiw.PropertyMap("parentObesityStatusID", "ParentObesityStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseObesityStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseObesityStatus = BaseObesityStatus;
    var ObesityStatus = (function (_super) {
        __extends(ObesityStatus, _super);
        function ObesityStatus() {
            _super.apply(this, arguments);
        }
        return ObesityStatus;
    })(BaseObesityStatus);
    hiw.ObesityStatus = ObesityStatus;
    /** Contains properties and static functionality for the ObesityStatusRelation type. */
    var BaseObesityStatusRelation = (function (_super) {
        __extends(BaseObesityStatusRelation, _super);
        function BaseObesityStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorObesityStatusID = null;
            this.descendantObesityStatusID = null;
            this.hops = null;
        }
        BaseObesityStatusRelation.prototype.getFields = function () {
            return BaseObesityStatusRelation.Fields;
        };
        /** Gets a list of all of the ObesityStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ObesityStatusRelations */
        BaseObesityStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many ObesityStatusRelations exist. */
        BaseObesityStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the ObesityStatusRelations method. */
        BaseObesityStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the ObesityStatusRelation with the specified primary key.
         *  @param id The primary key of the ObesityStatusRelation to return.
         *  @return The matching ObesityStatusRelation, if one exists, or null. */
        BaseObesityStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of ObesityStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ObesityStatusRelations which match the provided filter. */
        BaseObesityStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many ObesityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ObesityStatusRelations which match the provided filter. */
        BaseObesityStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of ObesityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ObesityStatusRelationswhich match the provided filter. */
        BaseObesityStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets ObesityStatusRelations by AncestorObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByAncestorObesityStatusID = function (obesityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID }, null, page);
        };
        /** Gets how many ObesityStatusRelations by AncestorObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByAncestorObesityStatusIDCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Gets how many pages of ObesityStatusRelations by AncestorObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByAncestorObesityStatusIDPageCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Returns the related AncestorObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @return A single ObesityStatusRelation, or null. */
        BaseObesityStatusRelation.prototype.getAncestorObesityStatus = function (api, callback) {
            return ObesityStatusRelation.getAncestorObesityStatusForObesityStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @param obesityStatusRelationID The ID of the ObesityStatusRelation to retrieve.
         *  @return A single ObesityStatusRelation, or null. */
        BaseObesityStatusRelation.getAncestorObesityStatusForObesityStatusRelation = function (obesityStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusRelationID: obesityStatusRelationID });
        };
        /** Gets ObesityStatusRelations by DescendantObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByDescendantObesityStatusID = function (obesityStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID }, null, page);
        };
        /** Gets how many ObesityStatusRelations by DescendantObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByDescendantObesityStatusIDCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Gets how many pages of ObesityStatusRelations by DescendantObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        BaseObesityStatusRelation.getByDescendantObesityStatusIDPageCount = function (obesityStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusID: obesityStatusID });
        };
        /** Returns the related DescendantObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @return A single ObesityStatusRelation, or null. */
        BaseObesityStatusRelation.prototype.getDescendantObesityStatus = function (api, callback) {
            return ObesityStatusRelation.getDescendantObesityStatusForObesityStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @param obesityStatusRelationID The ID of the ObesityStatusRelation to retrieve.
         *  @return A single ObesityStatusRelation, or null. */
        BaseObesityStatusRelation.getDescendantObesityStatusForObesityStatusRelation = function (obesityStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { obesityStatusRelationID: obesityStatusRelationID });
        };
        BaseObesityStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorObesityStatusID: new hiw.PropertyMap("ancestorObesityStatusID", "AncestorObesityStatusID"),
            descendantObesityStatusID: new hiw.PropertyMap("descendantObesityStatusID", "DescendantObesityStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseObesityStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseObesityStatusRelation = BaseObesityStatusRelation;
    var ObesityStatusRelation = (function (_super) {
        __extends(ObesityStatusRelation, _super);
        function ObesityStatusRelation() {
            _super.apply(this, arguments);
        }
        return ObesityStatusRelation;
    })(BaseObesityStatusRelation);
    hiw.ObesityStatusRelation = ObesityStatusRelation;
    /** Contains properties and static functionality for the Other type. */
    var BaseOther = (function (_super) {
        __extends(BaseOther, _super);
        function BaseOther() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentOtherID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseOther.prototype.getFields = function () {
            return BaseOther.Fields;
        };
        /** Gets a list of all of the Others in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Others */
        BaseOther.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Others exist. */
        BaseOther.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Others method. */
        BaseOther.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Other with the specified primary key.
         *  @param id The primary key of the Other to return.
         *  @return The matching Other, if one exists, or null. */
        BaseOther.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Others based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Others which match the provided filter. */
        BaseOther.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Others exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Others which match the provided filter. */
        BaseOther.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Others exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Otherswhich match the provided filter. */
        BaseOther.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Others by ParentOtherID.
         *  @return An Array of Others. */
        BaseOther.prototype.getOthers = function (api, callback, page) {
            return Other.getByParentOtherID(this.id, api, callback, page);
        };
        /** Gets Others by ParentOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        BaseOther.getByParentOtherID = function (otherID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID }, null, page);
        };
        /** Gets how many Others by ParentOtherID exist.
         *  @return An Array of Others. */
        BaseOther.prototype.getOthersCount = function (api, callback) {
            return Other.getByParentOtherIDCount(this.id, api, callback);
        };
        /** Gets how many Others by ParentOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        BaseOther.getByParentOtherIDCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Gets how many pages of Others by ParentOtherID exist.
         *  @return An Array of Others. */
        BaseOther.prototype.getOthersPageCount = function (api, callback) {
            return Other.getByParentOtherIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Others by ParentOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        BaseOther.getByParentOtherIDPageCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Returns the related ParentOther based on the unique ID of the related Other.
         *  @return A single Other, or null. */
        BaseOther.prototype.getParentOther = function (api, callback) {
            return Other.getParentOtherForOther(this.id, api, callback);
        };
        /** Returns the related ParentOther based on the unique ID of the related Other.
         *  @param otherID The ID of the Other to retrieve.
         *  @return A single Other, or null. */
        BaseOther.getParentOtherForOther = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        BaseOther.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentOtherID: new hiw.PropertyMap("parentOtherID", "ParentOtherID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseOther;
    })(hiw.ServiceDataObject);
    hiw.BaseOther = BaseOther;
    var Other = (function (_super) {
        __extends(Other, _super);
        function Other() {
            _super.apply(this, arguments);
        }
        return Other;
    })(BaseOther);
    hiw.Other = Other;
    /** Contains properties and static functionality for the OtherRelation type. */
    var BaseOtherRelation = (function (_super) {
        __extends(BaseOtherRelation, _super);
        function BaseOtherRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorOtherID = null;
            this.descendantOtherID = null;
            this.hops = null;
        }
        BaseOtherRelation.prototype.getFields = function () {
            return BaseOtherRelation.Fields;
        };
        /** Gets a list of all of the OtherRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of OtherRelations */
        BaseOtherRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many OtherRelations exist. */
        BaseOtherRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the OtherRelations method. */
        BaseOtherRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the OtherRelation with the specified primary key.
         *  @param id The primary key of the OtherRelation to return.
         *  @return The matching OtherRelation, if one exists, or null. */
        BaseOtherRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of OtherRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All OtherRelations which match the provided filter. */
        BaseOtherRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many OtherRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of OtherRelations which match the provided filter. */
        BaseOtherRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of OtherRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of OtherRelationswhich match the provided filter. */
        BaseOtherRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets OtherRelations by AncestorOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByAncestorOtherID = function (otherID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID }, null, page);
        };
        /** Gets how many OtherRelations by AncestorOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByAncestorOtherIDCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Gets how many pages of OtherRelations by AncestorOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByAncestorOtherIDPageCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Returns the related AncestorOther based on the unique ID of the related OtherRelation.
         *  @return A single OtherRelation, or null. */
        BaseOtherRelation.prototype.getAncestorOther = function (api, callback) {
            return OtherRelation.getAncestorOtherForOtherRelation(this.id, api, callback);
        };
        /** Returns the related AncestorOther based on the unique ID of the related OtherRelation.
         *  @param otherRelationID The ID of the OtherRelation to retrieve.
         *  @return A single OtherRelation, or null. */
        BaseOtherRelation.getAncestorOtherForOtherRelation = function (otherRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherRelationID: otherRelationID });
        };
        /** Gets OtherRelations by DescendantOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByDescendantOtherID = function (otherID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID }, null, page);
        };
        /** Gets how many OtherRelations by DescendantOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByDescendantOtherIDCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Gets how many pages of OtherRelations by DescendantOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        BaseOtherRelation.getByDescendantOtherIDPageCount = function (otherID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherID: otherID });
        };
        /** Returns the related DescendantOther based on the unique ID of the related OtherRelation.
         *  @return A single OtherRelation, or null. */
        BaseOtherRelation.prototype.getDescendantOther = function (api, callback) {
            return OtherRelation.getDescendantOtherForOtherRelation(this.id, api, callback);
        };
        /** Returns the related DescendantOther based on the unique ID of the related OtherRelation.
         *  @param otherRelationID The ID of the OtherRelation to retrieve.
         *  @return A single OtherRelation, or null. */
        BaseOtherRelation.getDescendantOtherForOtherRelation = function (otherRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { otherRelationID: otherRelationID });
        };
        BaseOtherRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorOtherID: new hiw.PropertyMap("ancestorOtherID", "AncestorOtherID"),
            descendantOtherID: new hiw.PropertyMap("descendantOtherID", "DescendantOtherID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseOtherRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseOtherRelation = BaseOtherRelation;
    var OtherRelation = (function (_super) {
        __extends(OtherRelation, _super);
        function OtherRelation() {
            _super.apply(this, arguments);
        }
        return OtherRelation;
    })(BaseOtherRelation);
    hiw.OtherRelation = OtherRelation;
    /** Contains properties and static functionality for the RaceEthnicity type. */
    var BaseRaceEthnicity = (function (_super) {
        __extends(BaseRaceEthnicity, _super);
        function BaseRaceEthnicity() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentRaceEthnicityID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseRaceEthnicity.prototype.getFields = function () {
            return BaseRaceEthnicity.Fields;
        };
        /** Gets a list of all of the RaceEthnicities in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of RaceEthnicities */
        BaseRaceEthnicity.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many RaceEthnicities exist. */
        BaseRaceEthnicity.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the RaceEthnicities method. */
        BaseRaceEthnicity.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the RaceEthnicity with the specified primary key.
         *  @param id The primary key of the RaceEthnicity to return.
         *  @return The matching RaceEthnicity, if one exists, or null. */
        BaseRaceEthnicity.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of RaceEthnicities based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All RaceEthnicities which match the provided filter. */
        BaseRaceEthnicity.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many RaceEthnicities exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of RaceEthnicities which match the provided filter. */
        BaseRaceEthnicity.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of RaceEthnicities exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of RaceEthnicitieswhich match the provided filter. */
        BaseRaceEthnicity.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets RaceEthnicities by ParentRaceEthnicityID.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.prototype.getRaceEthnicities = function (api, callback, page) {
            return RaceEthnicity.getByParentRaceEthnicityID(this.id, api, callback, page);
        };
        /** Gets RaceEthnicities by ParentRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.getByParentRaceEthnicityID = function (raceEthnicityID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID }, null, page);
        };
        /** Gets how many RaceEthnicities by ParentRaceEthnicityID exist.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.prototype.getRaceEthnicitiesCount = function (api, callback) {
            return RaceEthnicity.getByParentRaceEthnicityIDCount(this.id, api, callback);
        };
        /** Gets how many RaceEthnicities by ParentRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.getByParentRaceEthnicityIDCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Gets how many pages of RaceEthnicities by ParentRaceEthnicityID exist.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.prototype.getRaceEthnicitiesPageCount = function (api, callback) {
            return RaceEthnicity.getByParentRaceEthnicityIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of RaceEthnicities by ParentRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        BaseRaceEthnicity.getByParentRaceEthnicityIDPageCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Returns the related ParentRaceEthnicity based on the unique ID of the related RaceEthnicity.
         *  @return A single RaceEthnicity, or null. */
        BaseRaceEthnicity.prototype.getParentRaceEthnicity = function (api, callback) {
            return RaceEthnicity.getParentRaceEthnicityForRaceEthnicity(this.id, api, callback);
        };
        /** Returns the related ParentRaceEthnicity based on the unique ID of the related RaceEthnicity.
         *  @param raceEthnicityID The ID of the RaceEthnicity to retrieve.
         *  @return A single RaceEthnicity, or null. */
        BaseRaceEthnicity.getParentRaceEthnicityForRaceEthnicity = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        BaseRaceEthnicity.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentRaceEthnicityID: new hiw.PropertyMap("parentRaceEthnicityID", "ParentRaceEthnicityID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseRaceEthnicity;
    })(hiw.ServiceDataObject);
    hiw.BaseRaceEthnicity = BaseRaceEthnicity;
    var RaceEthnicity = (function (_super) {
        __extends(RaceEthnicity, _super);
        function RaceEthnicity() {
            _super.apply(this, arguments);
        }
        return RaceEthnicity;
    })(BaseRaceEthnicity);
    hiw.RaceEthnicity = RaceEthnicity;
    /** Contains properties and static functionality for the RaceEthnicityRelation type. */
    var BaseRaceEthnicityRelation = (function (_super) {
        __extends(BaseRaceEthnicityRelation, _super);
        function BaseRaceEthnicityRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorRaceEthnicityID = null;
            this.descendantRaceEthnicityID = null;
            this.hops = null;
        }
        BaseRaceEthnicityRelation.prototype.getFields = function () {
            return BaseRaceEthnicityRelation.Fields;
        };
        /** Gets a list of all of the RaceEthnicityRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of RaceEthnicityRelations */
        BaseRaceEthnicityRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many RaceEthnicityRelations exist. */
        BaseRaceEthnicityRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the RaceEthnicityRelations method. */
        BaseRaceEthnicityRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the RaceEthnicityRelation with the specified primary key.
         *  @param id The primary key of the RaceEthnicityRelation to return.
         *  @return The matching RaceEthnicityRelation, if one exists, or null. */
        BaseRaceEthnicityRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of RaceEthnicityRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All RaceEthnicityRelations which match the provided filter. */
        BaseRaceEthnicityRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many RaceEthnicityRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of RaceEthnicityRelations which match the provided filter. */
        BaseRaceEthnicityRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of RaceEthnicityRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of RaceEthnicityRelationswhich match the provided filter. */
        BaseRaceEthnicityRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets RaceEthnicityRelations by AncestorRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByAncestorRaceEthnicityID = function (raceEthnicityID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID }, null, page);
        };
        /** Gets how many RaceEthnicityRelations by AncestorRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByAncestorRaceEthnicityIDCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Gets how many pages of RaceEthnicityRelations by AncestorRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByAncestorRaceEthnicityIDPageCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Returns the related AncestorRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @return A single RaceEthnicityRelation, or null. */
        BaseRaceEthnicityRelation.prototype.getAncestorRaceEthnicity = function (api, callback) {
            return RaceEthnicityRelation.getAncestorRaceEthnicityForRaceEthnicityRelation(this.id, api, callback);
        };
        /** Returns the related AncestorRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @param raceEthnicityRelationID The ID of the RaceEthnicityRelation to retrieve.
         *  @return A single RaceEthnicityRelation, or null. */
        BaseRaceEthnicityRelation.getAncestorRaceEthnicityForRaceEthnicityRelation = function (raceEthnicityRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityRelationID: raceEthnicityRelationID });
        };
        /** Gets RaceEthnicityRelations by DescendantRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByDescendantRaceEthnicityID = function (raceEthnicityID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID }, null, page);
        };
        /** Gets how many RaceEthnicityRelations by DescendantRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByDescendantRaceEthnicityIDCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Gets how many pages of RaceEthnicityRelations by DescendantRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        BaseRaceEthnicityRelation.getByDescendantRaceEthnicityIDPageCount = function (raceEthnicityID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityID: raceEthnicityID });
        };
        /** Returns the related DescendantRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @return A single RaceEthnicityRelation, or null. */
        BaseRaceEthnicityRelation.prototype.getDescendantRaceEthnicity = function (api, callback) {
            return RaceEthnicityRelation.getDescendantRaceEthnicityForRaceEthnicityRelation(this.id, api, callback);
        };
        /** Returns the related DescendantRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @param raceEthnicityRelationID The ID of the RaceEthnicityRelation to retrieve.
         *  @return A single RaceEthnicityRelation, or null. */
        BaseRaceEthnicityRelation.getDescendantRaceEthnicityForRaceEthnicityRelation = function (raceEthnicityRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { raceEthnicityRelationID: raceEthnicityRelationID });
        };
        BaseRaceEthnicityRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorRaceEthnicityID: new hiw.PropertyMap("ancestorRaceEthnicityID", "AncestorRaceEthnicityID"),
            descendantRaceEthnicityID: new hiw.PropertyMap("descendantRaceEthnicityID", "DescendantRaceEthnicityID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseRaceEthnicityRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseRaceEthnicityRelation = BaseRaceEthnicityRelation;
    var RaceEthnicityRelation = (function (_super) {
        __extends(RaceEthnicityRelation, _super);
        function RaceEthnicityRelation() {
            _super.apply(this, arguments);
        }
        return RaceEthnicityRelation;
    })(BaseRaceEthnicityRelation);
    hiw.RaceEthnicityRelation = RaceEthnicityRelation;
    /** Contains properties and static functionality for the Sex type. */
    var BaseSex = (function (_super) {
        __extends(BaseSex, _super);
        function BaseSex() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentSexID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseSex.prototype.getFields = function () {
            return BaseSex.Fields;
        };
        /** Gets a list of all of the Sexes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Sexes */
        BaseSex.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Sexes exist. */
        BaseSex.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Sexes method. */
        BaseSex.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Sex with the specified primary key.
         *  @param id The primary key of the Sex to return.
         *  @return The matching Sex, if one exists, or null. */
        BaseSex.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Sexes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Sexes which match the provided filter. */
        BaseSex.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Sexes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Sexes which match the provided filter. */
        BaseSex.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Sexes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Sexeswhich match the provided filter. */
        BaseSex.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Sexes by ParentSexID.
         *  @return An Array of Sexes. */
        BaseSex.prototype.getSexes = function (api, callback, page) {
            return Sex.getByParentSexID(this.id, api, callback, page);
        };
        /** Gets Sexes by ParentSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        BaseSex.getByParentSexID = function (sexID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID }, null, page);
        };
        /** Gets how many Sexes by ParentSexID exist.
         *  @return An Array of Sexes. */
        BaseSex.prototype.getSexesCount = function (api, callback) {
            return Sex.getByParentSexIDCount(this.id, api, callback);
        };
        /** Gets how many Sexes by ParentSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        BaseSex.getByParentSexIDCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Gets how many pages of Sexes by ParentSexID exist.
         *  @return An Array of Sexes. */
        BaseSex.prototype.getSexesPageCount = function (api, callback) {
            return Sex.getByParentSexIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Sexes by ParentSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        BaseSex.getByParentSexIDPageCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Returns the related ParentSex based on the unique ID of the related Sex.
         *  @return A single Sex, or null. */
        BaseSex.prototype.getParentSex = function (api, callback) {
            return Sex.getParentSexForSex(this.id, api, callback);
        };
        /** Returns the related ParentSex based on the unique ID of the related Sex.
         *  @param sexID The ID of the Sex to retrieve.
         *  @return A single Sex, or null. */
        BaseSex.getParentSexForSex = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        BaseSex.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentSexID: new hiw.PropertyMap("parentSexID", "ParentSexID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseSex;
    })(hiw.ServiceDataObject);
    hiw.BaseSex = BaseSex;
    var Sex = (function (_super) {
        __extends(Sex, _super);
        function Sex() {
            _super.apply(this, arguments);
        }
        return Sex;
    })(BaseSex);
    hiw.Sex = Sex;
    /** Contains properties and static functionality for the SexRelation type. */
    var BaseSexRelation = (function (_super) {
        __extends(BaseSexRelation, _super);
        function BaseSexRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorSexID = null;
            this.descendantSexID = null;
            this.hops = null;
        }
        BaseSexRelation.prototype.getFields = function () {
            return BaseSexRelation.Fields;
        };
        /** Gets a list of all of the SexRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexRelations */
        BaseSexRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many SexRelations exist. */
        BaseSexRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the SexRelations method. */
        BaseSexRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the SexRelation with the specified primary key.
         *  @param id The primary key of the SexRelation to return.
         *  @return The matching SexRelation, if one exists, or null. */
        BaseSexRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of SexRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexRelations which match the provided filter. */
        BaseSexRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many SexRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexRelations which match the provided filter. */
        BaseSexRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of SexRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexRelationswhich match the provided filter. */
        BaseSexRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets SexRelations by AncestorSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByAncestorSexID = function (sexID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID }, null, page);
        };
        /** Gets how many SexRelations by AncestorSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByAncestorSexIDCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Gets how many pages of SexRelations by AncestorSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByAncestorSexIDPageCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Returns the related AncestorSex based on the unique ID of the related SexRelation.
         *  @return A single SexRelation, or null. */
        BaseSexRelation.prototype.getAncestorSex = function (api, callback) {
            return SexRelation.getAncestorSexForSexRelation(this.id, api, callback);
        };
        /** Returns the related AncestorSex based on the unique ID of the related SexRelation.
         *  @param sexRelationID The ID of the SexRelation to retrieve.
         *  @return A single SexRelation, or null. */
        BaseSexRelation.getAncestorSexForSexRelation = function (sexRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexRelationID: sexRelationID });
        };
        /** Gets SexRelations by DescendantSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByDescendantSexID = function (sexID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID }, null, page);
        };
        /** Gets how many SexRelations by DescendantSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByDescendantSexIDCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Gets how many pages of SexRelations by DescendantSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        BaseSexRelation.getByDescendantSexIDPageCount = function (sexID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexID: sexID });
        };
        /** Returns the related DescendantSex based on the unique ID of the related SexRelation.
         *  @return A single SexRelation, or null. */
        BaseSexRelation.prototype.getDescendantSex = function (api, callback) {
            return SexRelation.getDescendantSexForSexRelation(this.id, api, callback);
        };
        /** Returns the related DescendantSex based on the unique ID of the related SexRelation.
         *  @param sexRelationID The ID of the SexRelation to retrieve.
         *  @return A single SexRelation, or null. */
        BaseSexRelation.getDescendantSexForSexRelation = function (sexRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexRelationID: sexRelationID });
        };
        BaseSexRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorSexID: new hiw.PropertyMap("ancestorSexID", "AncestorSexID"),
            descendantSexID: new hiw.PropertyMap("descendantSexID", "DescendantSexID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseSexRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseSexRelation = BaseSexRelation;
    var SexRelation = (function (_super) {
        __extends(SexRelation, _super);
        function SexRelation() {
            _super.apply(this, arguments);
        }
        return SexRelation;
    })(BaseSexRelation);
    hiw.SexRelation = SexRelation;
    /** Contains properties and static functionality for the SexualOrientation type. */
    var BaseSexualOrientation = (function (_super) {
        __extends(BaseSexualOrientation, _super);
        function BaseSexualOrientation() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentSexualOrientationID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseSexualOrientation.prototype.getFields = function () {
            return BaseSexualOrientation.Fields;
        };
        /** Gets a list of all of the SexualOrientations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexualOrientations */
        BaseSexualOrientation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many SexualOrientations exist. */
        BaseSexualOrientation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the SexualOrientations method. */
        BaseSexualOrientation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the SexualOrientation with the specified primary key.
         *  @param id The primary key of the SexualOrientation to return.
         *  @return The matching SexualOrientation, if one exists, or null. */
        BaseSexualOrientation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of SexualOrientations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexualOrientations which match the provided filter. */
        BaseSexualOrientation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many SexualOrientations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexualOrientations which match the provided filter. */
        BaseSexualOrientation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of SexualOrientations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexualOrientationswhich match the provided filter. */
        BaseSexualOrientation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets SexualOrientations by ParentSexualOrientationID.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.prototype.getSexualOrientations = function (api, callback, page) {
            return SexualOrientation.getByParentSexualOrientationID(this.id, api, callback, page);
        };
        /** Gets SexualOrientations by ParentSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.getByParentSexualOrientationID = function (sexualOrientationID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID }, null, page);
        };
        /** Gets how many SexualOrientations by ParentSexualOrientationID exist.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.prototype.getSexualOrientationsCount = function (api, callback) {
            return SexualOrientation.getByParentSexualOrientationIDCount(this.id, api, callback);
        };
        /** Gets how many SexualOrientations by ParentSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.getByParentSexualOrientationIDCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Gets how many pages of SexualOrientations by ParentSexualOrientationID exist.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.prototype.getSexualOrientationsPageCount = function (api, callback) {
            return SexualOrientation.getByParentSexualOrientationIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of SexualOrientations by ParentSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        BaseSexualOrientation.getByParentSexualOrientationIDPageCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Returns the related ParentSexualOrientation based on the unique ID of the related SexualOrientation.
         *  @return A single SexualOrientation, or null. */
        BaseSexualOrientation.prototype.getParentSexualOrientation = function (api, callback) {
            return SexualOrientation.getParentSexualOrientationForSexualOrientation(this.id, api, callback);
        };
        /** Returns the related ParentSexualOrientation based on the unique ID of the related SexualOrientation.
         *  @param sexualOrientationID The ID of the SexualOrientation to retrieve.
         *  @return A single SexualOrientation, or null. */
        BaseSexualOrientation.getParentSexualOrientationForSexualOrientation = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        BaseSexualOrientation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentSexualOrientationID: new hiw.PropertyMap("parentSexualOrientationID", "ParentSexualOrientationID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseSexualOrientation;
    })(hiw.ServiceDataObject);
    hiw.BaseSexualOrientation = BaseSexualOrientation;
    var SexualOrientation = (function (_super) {
        __extends(SexualOrientation, _super);
        function SexualOrientation() {
            _super.apply(this, arguments);
        }
        return SexualOrientation;
    })(BaseSexualOrientation);
    hiw.SexualOrientation = SexualOrientation;
    /** Contains properties and static functionality for the SexualOrientationRelation type. */
    var BaseSexualOrientationRelation = (function (_super) {
        __extends(BaseSexualOrientationRelation, _super);
        function BaseSexualOrientationRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorSexualOrientationID = null;
            this.descendantSexualOrientationID = null;
            this.hops = null;
        }
        BaseSexualOrientationRelation.prototype.getFields = function () {
            return BaseSexualOrientationRelation.Fields;
        };
        /** Gets a list of all of the SexualOrientationRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexualOrientationRelations */
        BaseSexualOrientationRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many SexualOrientationRelations exist. */
        BaseSexualOrientationRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the SexualOrientationRelations method. */
        BaseSexualOrientationRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the SexualOrientationRelation with the specified primary key.
         *  @param id The primary key of the SexualOrientationRelation to return.
         *  @return The matching SexualOrientationRelation, if one exists, or null. */
        BaseSexualOrientationRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of SexualOrientationRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexualOrientationRelations which match the provided filter. */
        BaseSexualOrientationRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many SexualOrientationRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexualOrientationRelations which match the provided filter. */
        BaseSexualOrientationRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of SexualOrientationRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexualOrientationRelationswhich match the provided filter. */
        BaseSexualOrientationRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets SexualOrientationRelations by AncestorSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByAncestorSexualOrientationID = function (sexualOrientationID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID }, null, page);
        };
        /** Gets how many SexualOrientationRelations by AncestorSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByAncestorSexualOrientationIDCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Gets how many pages of SexualOrientationRelations by AncestorSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByAncestorSexualOrientationIDPageCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Returns the related AncestorSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @return A single SexualOrientationRelation, or null. */
        BaseSexualOrientationRelation.prototype.getAncestorSexualOrientation = function (api, callback) {
            return SexualOrientationRelation.getAncestorSexualOrientationForSexualOrientationRelation(this.id, api, callback);
        };
        /** Returns the related AncestorSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @param sexualOrientationRelationID The ID of the SexualOrientationRelation to retrieve.
         *  @return A single SexualOrientationRelation, or null. */
        BaseSexualOrientationRelation.getAncestorSexualOrientationForSexualOrientationRelation = function (sexualOrientationRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationRelationID: sexualOrientationRelationID });
        };
        /** Gets SexualOrientationRelations by DescendantSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByDescendantSexualOrientationID = function (sexualOrientationID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID }, null, page);
        };
        /** Gets how many SexualOrientationRelations by DescendantSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByDescendantSexualOrientationIDCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Gets how many pages of SexualOrientationRelations by DescendantSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        BaseSexualOrientationRelation.getByDescendantSexualOrientationIDPageCount = function (sexualOrientationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationID: sexualOrientationID });
        };
        /** Returns the related DescendantSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @return A single SexualOrientationRelation, or null. */
        BaseSexualOrientationRelation.prototype.getDescendantSexualOrientation = function (api, callback) {
            return SexualOrientationRelation.getDescendantSexualOrientationForSexualOrientationRelation(this.id, api, callback);
        };
        /** Returns the related DescendantSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @param sexualOrientationRelationID The ID of the SexualOrientationRelation to retrieve.
         *  @return A single SexualOrientationRelation, or null. */
        BaseSexualOrientationRelation.getDescendantSexualOrientationForSexualOrientationRelation = function (sexualOrientationRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { sexualOrientationRelationID: sexualOrientationRelationID });
        };
        BaseSexualOrientationRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorSexualOrientationID: new hiw.PropertyMap("ancestorSexualOrientationID", "AncestorSexualOrientationID"),
            descendantSexualOrientationID: new hiw.PropertyMap("descendantSexualOrientationID", "DescendantSexualOrientationID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseSexualOrientationRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseSexualOrientationRelation = BaseSexualOrientationRelation;
    var SexualOrientationRelation = (function (_super) {
        __extends(SexualOrientationRelation, _super);
        function SexualOrientationRelation() {
            _super.apply(this, arguments);
        }
        return SexualOrientationRelation;
    })(BaseSexualOrientationRelation);
    hiw.SexualOrientationRelation = SexualOrientationRelation;
    /** Contains properties and static functionality for the Timeframe type. */
    var BaseTimeframe = (function (_super) {
        __extends(BaseTimeframe, _super);
        function BaseTimeframe() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.firstYear = null;
            this.lastYear = null;
            this.twoDigitFirstYear = null;
            this.twoDigitLastYear = null;
            this.sortOrder = null;
        }
        BaseTimeframe.prototype.getFields = function () {
            return BaseTimeframe.Fields;
        };
        /** Gets a list of all of the Timeframes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Timeframes */
        BaseTimeframe.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Timeframes exist. */
        BaseTimeframe.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Timeframes method. */
        BaseTimeframe.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Timeframe with the specified primary key.
         *  @param id The primary key of the Timeframe to return.
         *  @return The matching Timeframe, if one exists, or null. */
        BaseTimeframe.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Timeframes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Timeframes which match the provided filter. */
        BaseTimeframe.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Timeframes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Timeframes which match the provided filter. */
        BaseTimeframe.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Timeframes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Timeframeswhich match the provided filter. */
        BaseTimeframe.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseTimeframe.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            firstYear: new hiw.PropertyMap("firstYear", "FirstYear"),
            lastYear: new hiw.PropertyMap("lastYear", "LastYear"),
            twoDigitFirstYear: new hiw.PropertyMap("twoDigitFirstYear", "TwoDigitFirstYear"),
            twoDigitLastYear: new hiw.PropertyMap("twoDigitLastYear", "TwoDigitLastYear"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseTimeframe;
    })(hiw.ServiceDataObject);
    hiw.BaseTimeframe = BaseTimeframe;
    var Timeframe = (function (_super) {
        __extends(Timeframe, _super);
        function Timeframe() {
            _super.apply(this, arguments);
        }
        return Timeframe;
    })(BaseTimeframe);
    hiw.Timeframe = Timeframe;
    /** Contains properties and static functionality for the Total type. */
    var BaseTotal = (function (_super) {
        __extends(BaseTotal, _super);
        function BaseTotal() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentTotalID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseTotal.prototype.getFields = function () {
            return BaseTotal.Fields;
        };
        /** Gets a list of all of the Totals in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Totals */
        BaseTotal.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Totals exist. */
        BaseTotal.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Totals method. */
        BaseTotal.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Total with the specified primary key.
         *  @param id The primary key of the Total to return.
         *  @return The matching Total, if one exists, or null. */
        BaseTotal.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Totals based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Totals which match the provided filter. */
        BaseTotal.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Totals exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Totals which match the provided filter. */
        BaseTotal.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Totals exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Totalswhich match the provided filter. */
        BaseTotal.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets Totals by ParentTotalID.
         *  @return An Array of Totals. */
        BaseTotal.prototype.getTotals = function (api, callback, page) {
            return Total.getByParentTotalID(this.id, api, callback, page);
        };
        /** Gets Totals by ParentTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        BaseTotal.getByParentTotalID = function (totalID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID }, null, page);
        };
        /** Gets how many Totals by ParentTotalID exist.
         *  @return An Array of Totals. */
        BaseTotal.prototype.getTotalsCount = function (api, callback) {
            return Total.getByParentTotalIDCount(this.id, api, callback);
        };
        /** Gets how many Totals by ParentTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        BaseTotal.getByParentTotalIDCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Gets how many pages of Totals by ParentTotalID exist.
         *  @return An Array of Totals. */
        BaseTotal.prototype.getTotalsPageCount = function (api, callback) {
            return Total.getByParentTotalIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of Totals by ParentTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        BaseTotal.getByParentTotalIDPageCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Returns the related ParentTotal based on the unique ID of the related Total.
         *  @return A single Total, or null. */
        BaseTotal.prototype.getParentTotal = function (api, callback) {
            return Total.getParentTotalForTotal(this.id, api, callback);
        };
        /** Returns the related ParentTotal based on the unique ID of the related Total.
         *  @param totalID The ID of the Total to retrieve.
         *  @return A single Total, or null. */
        BaseTotal.getParentTotalForTotal = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        BaseTotal.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentTotalID: new hiw.PropertyMap("parentTotalID", "ParentTotalID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseTotal;
    })(hiw.ServiceDataObject);
    hiw.BaseTotal = BaseTotal;
    var Total = (function (_super) {
        __extends(Total, _super);
        function Total() {
            _super.apply(this, arguments);
        }
        return Total;
    })(BaseTotal);
    hiw.Total = Total;
    /** Contains properties and static functionality for the TotalRelation type. */
    var BaseTotalRelation = (function (_super) {
        __extends(BaseTotalRelation, _super);
        function BaseTotalRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorTotalID = null;
            this.descendantTotalID = null;
            this.hops = null;
        }
        BaseTotalRelation.prototype.getFields = function () {
            return BaseTotalRelation.Fields;
        };
        /** Gets a list of all of the TotalRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of TotalRelations */
        BaseTotalRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many TotalRelations exist. */
        BaseTotalRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the TotalRelations method. */
        BaseTotalRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the TotalRelation with the specified primary key.
         *  @param id The primary key of the TotalRelation to return.
         *  @return The matching TotalRelation, if one exists, or null. */
        BaseTotalRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of TotalRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All TotalRelations which match the provided filter. */
        BaseTotalRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many TotalRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of TotalRelations which match the provided filter. */
        BaseTotalRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of TotalRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of TotalRelationswhich match the provided filter. */
        BaseTotalRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets TotalRelations by AncestorTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByAncestorTotalID = function (totalID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID }, null, page);
        };
        /** Gets how many TotalRelations by AncestorTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByAncestorTotalIDCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Gets how many pages of TotalRelations by AncestorTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByAncestorTotalIDPageCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Returns the related AncestorTotal based on the unique ID of the related TotalRelation.
         *  @return A single TotalRelation, or null. */
        BaseTotalRelation.prototype.getAncestorTotal = function (api, callback) {
            return TotalRelation.getAncestorTotalForTotalRelation(this.id, api, callback);
        };
        /** Returns the related AncestorTotal based on the unique ID of the related TotalRelation.
         *  @param totalRelationID The ID of the TotalRelation to retrieve.
         *  @return A single TotalRelation, or null. */
        BaseTotalRelation.getAncestorTotalForTotalRelation = function (totalRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalRelationID: totalRelationID });
        };
        /** Gets TotalRelations by DescendantTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByDescendantTotalID = function (totalID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID }, null, page);
        };
        /** Gets how many TotalRelations by DescendantTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByDescendantTotalIDCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Gets how many pages of TotalRelations by DescendantTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        BaseTotalRelation.getByDescendantTotalIDPageCount = function (totalID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalID: totalID });
        };
        /** Returns the related DescendantTotal based on the unique ID of the related TotalRelation.
         *  @return A single TotalRelation, or null. */
        BaseTotalRelation.prototype.getDescendantTotal = function (api, callback) {
            return TotalRelation.getDescendantTotalForTotalRelation(this.id, api, callback);
        };
        /** Returns the related DescendantTotal based on the unique ID of the related TotalRelation.
         *  @param totalRelationID The ID of the TotalRelation to retrieve.
         *  @return A single TotalRelation, or null. */
        BaseTotalRelation.getDescendantTotalForTotalRelation = function (totalRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { totalRelationID: totalRelationID });
        };
        BaseTotalRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorTotalID: new hiw.PropertyMap("ancestorTotalID", "AncestorTotalID"),
            descendantTotalID: new hiw.PropertyMap("descendantTotalID", "DescendantTotalID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseTotalRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseTotalRelation = BaseTotalRelation;
    var TotalRelation = (function (_super) {
        __extends(TotalRelation, _super);
        function TotalRelation() {
            _super.apply(this, arguments);
        }
        return TotalRelation;
    })(BaseTotalRelation);
    hiw.TotalRelation = TotalRelation;
    /** Contains properties and static functionality for the Url type. */
    var BaseUrl = (function (_super) {
        __extends(BaseUrl, _super);
        function BaseUrl() {
            _super.apply(this, arguments);
            this.id = null;
            this.linkTag = null;
            this.internal = null;
            this.falsePositive = null;
            this.path = null;
            this.title = null;
            this.modifyDate = null;
            this.validationDate = null;
            this.validationStatus = null;
        }
        BaseUrl.prototype.getFields = function () {
            return BaseUrl.Fields;
        };
        /** Gets a list of all of the Urls in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Urls */
        BaseUrl.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Urls exist. */
        BaseUrl.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Urls method. */
        BaseUrl.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Url with the specified primary key.
         *  @param id The primary key of the Url to return.
         *  @return The matching Url, if one exists, or null. */
        BaseUrl.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Urls based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Urls which match the provided filter. */
        BaseUrl.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Urls exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Urls which match the provided filter. */
        BaseUrl.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Urls exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Urlswhich match the provided filter. */
        BaseUrl.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseUrl.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            linkTag: new hiw.PropertyMap("linkTag", "LinkTag"),
            internal: new hiw.PropertyMap("internal", "Internal"),
            falsePositive: new hiw.PropertyMap("falsePositive", "FalsePositive"),
            path: new hiw.PropertyMap("path", "Path"),
            title: new hiw.PropertyMap("title", "Title"),
            modifyDate: new hiw.PropertyMap("modifyDate", "ModifyDate"),
            validationDate: new hiw.PropertyMap("validationDate", "ValidationDate"),
            validationStatus: new hiw.PropertyMap("validationStatus", "ValidationStatus")
        };
        return BaseUrl;
    })(hiw.ServiceDataObject);
    hiw.BaseUrl = BaseUrl;
    var Url = (function (_super) {
        __extends(Url, _super);
        function Url() {
            _super.apply(this, arguments);
        }
        return Url;
    })(BaseUrl);
    hiw.Url = Url;
    /** Contains properties and static functionality for the ValueLabel type. */
    var BaseValueLabel = (function (_super) {
        __extends(BaseValueLabel, _super);
        function BaseValueLabel() {
            _super.apply(this, arguments);
            this.id = null;
            this.label = null;
        }
        BaseValueLabel.prototype.getFields = function () {
            return BaseValueLabel.Fields;
        };
        /** Gets a list of all of the ValueLabels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ValueLabels */
        BaseValueLabel.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many ValueLabels exist. */
        BaseValueLabel.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the ValueLabels method. */
        BaseValueLabel.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the ValueLabel with the specified primary key.
         *  @param id The primary key of the ValueLabel to return.
         *  @return The matching ValueLabel, if one exists, or null. */
        BaseValueLabel.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of ValueLabels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ValueLabels which match the provided filter. */
        BaseValueLabel.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many ValueLabels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ValueLabels which match the provided filter. */
        BaseValueLabel.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of ValueLabels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ValueLabelswhich match the provided filter. */
        BaseValueLabel.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseValueLabel.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            label: new hiw.PropertyMap("label", "Label")
        };
        return BaseValueLabel;
    })(hiw.ServiceDataObject);
    hiw.BaseValueLabel = BaseValueLabel;
    var ValueLabel = (function (_super) {
        __extends(ValueLabel, _super);
        function ValueLabel() {
            _super.apply(this, arguments);
        }
        return ValueLabel;
    })(BaseValueLabel);
    hiw.ValueLabel = ValueLabel;
    /** Contains properties and static functionality for the VeteranStatus type. */
    var BaseVeteranStatus = (function (_super) {
        __extends(BaseVeteranStatus, _super);
        function BaseVeteranStatus() {
            _super.apply(this, arguments);
            this.id = null;
            this.name = null;
            this.parentVeteranStatusID = null;
            this.dimensionKey = null;
            this.treeGraph = null;
            this.nameGraph = null;
            this.sortOrder = null;
            this.depth = null;
        }
        BaseVeteranStatus.prototype.getFields = function () {
            return BaseVeteranStatus.Fields;
        };
        /** Gets a list of all of the VeteranStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of VeteranStatuses */
        BaseVeteranStatus.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many VeteranStatuses exist. */
        BaseVeteranStatus.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the VeteranStatuses method. */
        BaseVeteranStatus.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the VeteranStatus with the specified primary key.
         *  @param id The primary key of the VeteranStatus to return.
         *  @return The matching VeteranStatus, if one exists, or null. */
        BaseVeteranStatus.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of VeteranStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All VeteranStatuses which match the provided filter. */
        BaseVeteranStatus.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many VeteranStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of VeteranStatuses which match the provided filter. */
        BaseVeteranStatus.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of VeteranStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of VeteranStatuseswhich match the provided filter. */
        BaseVeteranStatus.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets VeteranStatuses by ParentVeteranStatusID.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.prototype.getVeteranStatuses = function (api, callback, page) {
            return VeteranStatus.getByParentVeteranStatusID(this.id, api, callback, page);
        };
        /** Gets VeteranStatuses by ParentVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.getByParentVeteranStatusID = function (veteranStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID }, null, page);
        };
        /** Gets how many VeteranStatuses by ParentVeteranStatusID exist.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.prototype.getVeteranStatusesCount = function (api, callback) {
            return VeteranStatus.getByParentVeteranStatusIDCount(this.id, api, callback);
        };
        /** Gets how many VeteranStatuses by ParentVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.getByParentVeteranStatusIDCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Gets how many pages of VeteranStatuses by ParentVeteranStatusID exist.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.prototype.getVeteranStatusesPageCount = function (api, callback) {
            return VeteranStatus.getByParentVeteranStatusIDPageCount(this.id, api, callback);
        };
        /** Gets how many pages of VeteranStatuses by ParentVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        BaseVeteranStatus.getByParentVeteranStatusIDPageCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Returns the related ParentVeteranStatus based on the unique ID of the related VeteranStatus.
         *  @return A single VeteranStatus, or null. */
        BaseVeteranStatus.prototype.getParentVeteranStatus = function (api, callback) {
            return VeteranStatus.getParentVeteranStatusForVeteranStatus(this.id, api, callback);
        };
        /** Returns the related ParentVeteranStatus based on the unique ID of the related VeteranStatus.
         *  @param veteranStatusID The ID of the VeteranStatus to retrieve.
         *  @return A single VeteranStatus, or null. */
        BaseVeteranStatus.getParentVeteranStatusForVeteranStatus = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        BaseVeteranStatus.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            name: new hiw.PropertyMap("name", "Name"),
            parentVeteranStatusID: new hiw.PropertyMap("parentVeteranStatusID", "ParentVeteranStatusID"),
            dimensionKey: new hiw.PropertyMap("dimensionKey", "DimensionKey"),
            treeGraph: new hiw.PropertyMap("treeGraph", "TreeGraph"),
            nameGraph: new hiw.PropertyMap("nameGraph", "NameGraph"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder"),
            depth: new hiw.PropertyMap("depth", "Depth")
        };
        return BaseVeteranStatus;
    })(hiw.ServiceDataObject);
    hiw.BaseVeteranStatus = BaseVeteranStatus;
    var VeteranStatus = (function (_super) {
        __extends(VeteranStatus, _super);
        function VeteranStatus() {
            _super.apply(this, arguments);
        }
        return VeteranStatus;
    })(BaseVeteranStatus);
    hiw.VeteranStatus = VeteranStatus;
    /** Contains properties and static functionality for the VeteranStatusRelation type. */
    var BaseVeteranStatusRelation = (function (_super) {
        __extends(BaseVeteranStatusRelation, _super);
        function BaseVeteranStatusRelation() {
            _super.apply(this, arguments);
            this.id = null;
            this.ancestorVeteranStatusID = null;
            this.descendantVeteranStatusID = null;
            this.hops = null;
        }
        BaseVeteranStatusRelation.prototype.getFields = function () {
            return BaseVeteranStatusRelation.Fields;
        };
        /** Gets a list of all of the VeteranStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of VeteranStatusRelations */
        BaseVeteranStatusRelation.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many VeteranStatusRelations exist. */
        BaseVeteranStatusRelation.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the VeteranStatusRelations method. */
        BaseVeteranStatusRelation.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the VeteranStatusRelation with the specified primary key.
         *  @param id The primary key of the VeteranStatusRelation to return.
         *  @return The matching VeteranStatusRelation, if one exists, or null. */
        BaseVeteranStatusRelation.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of VeteranStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All VeteranStatusRelations which match the provided filter. */
        BaseVeteranStatusRelation.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many VeteranStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of VeteranStatusRelations which match the provided filter. */
        BaseVeteranStatusRelation.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of VeteranStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of VeteranStatusRelationswhich match the provided filter. */
        BaseVeteranStatusRelation.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Gets VeteranStatusRelations by AncestorVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByAncestorVeteranStatusID = function (veteranStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID }, null, page);
        };
        /** Gets how many VeteranStatusRelations by AncestorVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByAncestorVeteranStatusIDCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Gets how many pages of VeteranStatusRelations by AncestorVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByAncestorVeteranStatusIDPageCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Returns the related AncestorVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @return A single VeteranStatusRelation, or null. */
        BaseVeteranStatusRelation.prototype.getAncestorVeteranStatus = function (api, callback) {
            return VeteranStatusRelation.getAncestorVeteranStatusForVeteranStatusRelation(this.id, api, callback);
        };
        /** Returns the related AncestorVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @param veteranStatusRelationID The ID of the VeteranStatusRelation to retrieve.
         *  @return A single VeteranStatusRelation, or null. */
        BaseVeteranStatusRelation.getAncestorVeteranStatusForVeteranStatusRelation = function (veteranStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusRelationID: veteranStatusRelationID });
        };
        /** Gets VeteranStatusRelations by DescendantVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByDescendantVeteranStatusID = function (veteranStatusID, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID }, null, page);
        };
        /** Gets how many VeteranStatusRelations by DescendantVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByDescendantVeteranStatusIDCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Gets how many pages of VeteranStatusRelations by DescendantVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        BaseVeteranStatusRelation.getByDescendantVeteranStatusIDPageCount = function (veteranStatusID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusID: veteranStatusID });
        };
        /** Returns the related DescendantVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @return A single VeteranStatusRelation, or null. */
        BaseVeteranStatusRelation.prototype.getDescendantVeteranStatus = function (api, callback) {
            return VeteranStatusRelation.getDescendantVeteranStatusForVeteranStatusRelation(this.id, api, callback);
        };
        /** Returns the related DescendantVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @param veteranStatusRelationID The ID of the VeteranStatusRelation to retrieve.
         *  @return A single VeteranStatusRelation, or null. */
        BaseVeteranStatusRelation.getDescendantVeteranStatusForVeteranStatusRelation = function (veteranStatusRelationID, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { veteranStatusRelationID: veteranStatusRelationID });
        };
        BaseVeteranStatusRelation.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            ancestorVeteranStatusID: new hiw.PropertyMap("ancestorVeteranStatusID", "AncestorVeteranStatusID"),
            descendantVeteranStatusID: new hiw.PropertyMap("descendantVeteranStatusID", "DescendantVeteranStatusID"),
            hops: new hiw.PropertyMap("hops", "Hops")
        };
        return BaseVeteranStatusRelation;
    })(hiw.ServiceDataObject);
    hiw.BaseVeteranStatusRelation = BaseVeteranStatusRelation;
    var VeteranStatusRelation = (function (_super) {
        __extends(VeteranStatusRelation, _super);
        function VeteranStatusRelation() {
            _super.apply(this, arguments);
        }
        return VeteranStatusRelation;
    })(BaseVeteranStatusRelation);
    hiw.VeteranStatusRelation = VeteranStatusRelation;
    /** Contains properties and static functionality for the Year type. */
    var BaseYear = (function (_super) {
        __extends(BaseYear, _super);
        function BaseYear() {
            _super.apply(this, arguments);
            this.id = null;
            this.fullYear = null;
            this.twoDigitYear = null;
            this.sortOrder = null;
        }
        BaseYear.prototype.getFields = function () {
            return BaseYear.Fields;
        };
        /** Gets a list of all of the Years in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Years */
        BaseYear.getAll = function (api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, null, page);
        };
        /** Gets how many Years exist. */
        BaseYear.getAllCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets how many pages of data exist for the Years method. */
        BaseYear.getAllPageCount = function (api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        /** Gets the Year with the specified primary key.
         *  @param id The primary key of the Year to return.
         *  @return The matching Year, if one exists, or null. */
        BaseYear.getByID = function (id, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { id: id });
        };
        /** Returns a filtered collection of Years based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Years which match the provided filter. */
        BaseYear.filter = function (filter, api, callback, page) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON(page));
        };
        /** Returns a count of how many Years exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Years which match the provided filter. */
        BaseYear.filterCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        /** Returns a count of how many pages of Years exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Yearswhich match the provided filter. */
        BaseYear.filterPageCount = function (filter, api, callback) {
            return api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, null, filter.toJSON());
        };
        BaseYear.Fields = {
            id: new hiw.PropertyMap("id", "ID"),
            fullYear: new hiw.PropertyMap("fullYear", "FullYear"),
            twoDigitYear: new hiw.PropertyMap("twoDigitYear", "TwoDigitYear"),
            sortOrder: new hiw.PropertyMap("sortOrder", "SortOrder")
        };
        return BaseYear;
    })(hiw.ServiceDataObject);
    hiw.BaseYear = BaseYear;
    var Year = (function (_super) {
        __extends(Year, _super);
        function Year() {
            _super.apply(this, arguments);
        }
        return Year;
    })(BaseYear);
    hiw.Year = Year;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var IndicatorDataItem = (function (_super) {
        __extends(IndicatorDataItem, _super);
        function IndicatorDataItem() {
            _super.apply(this, arguments);
            this.indicatorID = null;
            this.dimensionList = null;
            this.timeframe = null;
            this.numericValue = null;
            this.missingValueFlag = null;
            this.confidenceIntervalLow = null;
            this.confidenceIntervalHigh = null;
            this.standardError = null;
            this.locale = null;
            this.localeLevel = null;
            this.localeStateFIPSCode = null;
            this.localeCountyFIPSCode = null;
            this.localeCountySSACode = null;
            this.localeHRRCode = null;
            this.total = null;
            this.age = null;
            this.sex = null;
            this.raceEthnicity = null;
            this.incomeAndPovertyStatus = null;
            this.educationalAttainment = null;
            this.healthInsuranceStatus = null;
            this.sexualOrientation = null;
            this.maritalStatus = null;
            this.familyType = null;
            this.veteranStatus = null;
            this.countryOfBirth = null;
            this.disabilityStatus = null;
            this.obesityStatus = null;
            this.characteristicOfSchoolOrStudent = null;
            this.other = null;
            this.geography = null;
            this.modifier1 = null;
            this.modifier2 = null;
            this.modifier3 = null;
            this.modifier4 = null;
            this.modifier5 = null;
            this.numerator = null;
            this.denominator = null;
        }
        IndicatorDataItem.prototype.getFields = function () {
            return IndicatorDataItem.Fields;
        };
        /** Gets a list of all of the (flattened) IndicatorDataItems in the database which are associated with the IndicatorDescription table via the ID column.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        IndicatorDataItem.getByIndicatorDescriptionID = function (indicatorDescriptionID, api, callback, page) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID }, null, page);
        };
        /** Gets how many IndicatorDataItems by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        IndicatorDataItem.getByIndicatorDescriptionIDCount = function (indicatorDescriptionID, api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        /** Gets how many pages of IndicatorDataItems by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        IndicatorDataItem.getByIndicatorDescriptionIDPageCount = function (indicatorDescriptionID, api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { indicatorDescriptionID: indicatorDescriptionID });
        };
        IndicatorDataItem.Fields = {
            indicatorID: new hiw.PropertyMap("indicatorID", "IndicatorID"),
            dimensionList: new hiw.PropertyMap("dimensionList", "DimensionList"),
            timeframe: new hiw.PropertyMap("timeframe", "Timeframe"),
            numericValue: new hiw.PropertyMap("numericValue", "NumericValue"),
            missingValueFlag: new hiw.PropertyMap("missingValueFlag", "MissingValueFlag"),
            confidenceIntervalLow: new hiw.PropertyMap("confidenceIntervalLow", "ConfidenceIntervalLow"),
            confidenceIntervalHigh: new hiw.PropertyMap("confidenceIntervalHigh", "ConfidenceIntervalHigh"),
            standardError: new hiw.PropertyMap("standardError", "StandardError"),
            locale: new hiw.PropertyMap("locale", "Locale"),
            localeLevel: new hiw.PropertyMap("localeLevel", "LocaleLevel"),
            localeStateFIPSCode: new hiw.PropertyMap("localeStateFIPSCode", "LocaleStateFIPSCode"),
            localeCountyFIPSCode: new hiw.PropertyMap("localeCountyFIPSCode", "LocaleCountyFIPSCode"),
            localeCountySSACode: new hiw.PropertyMap("localeCountySSACode", "LocaleCountySSACode"),
            localeHRRCode: new hiw.PropertyMap("localeHRRCode", "LocaleHRRCode"),
            total: new hiw.PropertyMap("total", "Total"),
            age: new hiw.PropertyMap("age", "Age"),
            sex: new hiw.PropertyMap("sex", "Sex"),
            raceEthnicity: new hiw.PropertyMap("raceEthnicity", "RaceEthnicity"),
            incomeAndPovertyStatus: new hiw.PropertyMap("incomeAndPovertyStatus", "IncomeAndPovertyStatus"),
            educationalAttainment: new hiw.PropertyMap("educationalAttainment", "EducationalAttainment"),
            healthInsuranceStatus: new hiw.PropertyMap("healthInsuranceStatus", "HealthInsuranceStatus"),
            sexualOrientation: new hiw.PropertyMap("sexualOrientation", "SexualOrientation"),
            maritalStatus: new hiw.PropertyMap("maritalStatus", "MaritalStatus"),
            familyType: new hiw.PropertyMap("familyType", "FamilyType"),
            veteranStatus: new hiw.PropertyMap("veteranStatus", "VeteranStatus"),
            countryOfBirth: new hiw.PropertyMap("countryOfBirth", "CountryOfBirth"),
            disabilityStatus: new hiw.PropertyMap("disabilityStatus", "DisabilityStatus"),
            obesityStatus: new hiw.PropertyMap("obesityStatus", "ObesityStatus"),
            characteristicOfSchoolOrStudent: new hiw.PropertyMap("characteristicOfSchoolOrStudent", "CharacteristicOfSchoolOrStudent"),
            other: new hiw.PropertyMap("other", "Other"),
            geography: new hiw.PropertyMap("geography", "Geography"),
            modifier1: new hiw.PropertyMap("modifier1", "Modifier1"),
            modifier2: new hiw.PropertyMap("modifier2", "Modifier2"),
            modifier3: new hiw.PropertyMap("modifier3", "Modifier3"),
            modifier4: new hiw.PropertyMap("modifier4", "Modifier4"),
            modifier5: new hiw.PropertyMap("modifier5", "Modifier5"),
            numerator: new hiw.PropertyMap("numerator", "Numerator"),
            denominator: new hiw.PropertyMap("denominator", "Denominator")
        };
        return IndicatorDataItem;
    })(hiw.ServiceDataObject);
    hiw.IndicatorDataItem = IndicatorDataItem;
    hiw.Endpoint.addArray(IndicatorDataItem, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Data/{page}", IndicatorDataItem.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(IndicatorDataItem, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Data/Count", IndicatorDataItem.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(IndicatorDataItem, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Data/PageCount", IndicatorDataItem.getByIndicatorDescriptionIDPageCount);
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var IndicatorDescription = (function (_super) {
        __extends(IndicatorDescription, _super);
        function IndicatorDescription() {
            _super.apply(this, arguments);
        }
        /** Gets a list of all of the IndicatorDescriptions which match the specified search terms.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptions */
        IndicatorDescription.search = function (keywords, api, callback, page) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywords: keywords }, null, page);
        };
        /** Gets how many IndicatorDescriptions exist for the specified search terms. */
        IndicatorDescription.searchCount = function (keywords, api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywords: keywords });
        };
        /** Gets how many pages of IndicatorDescriptions exist for the specified search terms. */
        IndicatorDescription.searchPageCount = function (keywords, api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback, { keywords: keywords });
        };
        return IndicatorDescription;
    })(hiw.BaseIndicatorDescription);
    hiw.IndicatorDescription = IndicatorDescription;
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var Version = (function (_super) {
        __extends(Version, _super);
        function Version(major, minor, revision, build) {
            _super.call(this);
            this.major = major;
            this.minor = minor;
            this.revision = revision;
            this.build = build;
        }
        Version.prototype.getFields = function () {
            return Version.Fields;
        };
        Version.Fields = {
            major: new hiw.PropertyMap("major", "Major"),
            minor: new hiw.PropertyMap("minor", "Minor"),
            revision: new hiw.PropertyMap("revision", "Revision"),
            build: new hiw.PropertyMap("build", "Build")
        };
        return Version;
    })(hiw.ServiceDataObject);
    hiw.Version = Version;
    ;
    hiw.APIVersion = new Version(5, 0, 1, 0);
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    var VersionInfo = (function (_super) {
        __extends(VersionInfo, _super);
        function VersionInfo() {
            _super.apply(this, arguments);
            this.hiwVersion = new hiw.Version();
        }
        VersionInfo.prototype.getFields = function () {
            return VersionInfo.Fields;
        };
        VersionInfo.version = function (api, callback) {
            api.executeEndpoint(hiw.Endpoint.fromSelf(), callback);
        };
        VersionInfo.Fields = {
            hiwVersion: new hiw.PropertyMap("hiwVersion", "HIWVersion"),
            loadDate: new hiw.PropertyMap("loadDate", "LoadDate"),
            serviceVersion: new hiw.PropertyMap("serviceVersion", "ServiceVersion")
        };
        return VersionInfo;
    })(hiw.ServiceDataObject);
    hiw.VersionInfo = VersionInfo;
    hiw.Endpoint.addSingle(VersionInfo, 0 /* GET */, "/Version", VersionInfo.version);
})(hiw || (hiw = {}));
var hiw;
(function (hiw) {
    hiw.Endpoint.addSimple(hiw.API, 0 /* GET */, "/VerifyApiKey", hiw.API.verifyApiKey);
    hiw.Endpoint.addArray(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/{keywords}/Search/{page}", hiw.IndicatorDescription.search);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/{keywords}/Count", hiw.IndicatorDescription.searchCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/{keywords }/PageCount", hiw.IndicatorDescription.searchPageCount);
})(hiw || (hiw = {}));
/// <reference path="IFilterPart.ts"/>
/// <reference path="FilterType.ts"/>
/// <reference path="Operator.ts"/>
/// <reference path="Criterion.ts"/>
/// <reference path="Group.ts"/>
/// <reference path="Filter.ts"/>
/// <reference path="IAsyncCompleteCallback.ts"/>
/// <reference path="ISynchronizerCompleteCallback.ts"/>
/// <reference path="Async.ts"/>
/// <reference path="Synchronizer.ts"/>
/// <reference path="IAPIResponseInitializer.ts"/>
/// <reference path="PropertyMap.ts"/>
/// <reference path="HttpMethod.ts"/>
/// <reference path="Endpoint.ts"/>
/// <reference path="Link.ts"/>
/// <reference path="ServiceObject.ts"/>
/// <reference path="ServiceDataObject.ts"/>
/// <reference path="APIResponse.ts"/>
/// <reference path="IAPICallback.ts"/>
/// <reference path="Enumerations.Generated.ts"/>
/// <reference path="DataObjects.Generated.ts"/>
/// <reference path="API.ts"/>
/// <reference path="IndicatorDataItem.ts"/>
/// <reference path="IndicatorDescription.ts"/>
/// <reference path="Version.ts"/>
/// <reference path="VersionInfo.ts"/>
/// <reference path="Endpoints.ts"/>
/// <reference path="Endpoints.Generated.ts"/>
/// <reference path="_dependencies" />
var hiw;
(function (hiw) {
    hiw.Endpoint.addArray(hiw.Age, 0 /* GET */, "/Ages/{page}", hiw.Age.getAll);
    hiw.Endpoint.addSimple(hiw.Age, 0 /* GET */, "/Ages/Count", hiw.Age.getAllCount);
    hiw.Endpoint.addSimple(hiw.Age, 0 /* GET */, "/Ages/PageCount", hiw.Age.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Age, 0 /* GET */, "/Age/{id}", hiw.Age.getByID);
    hiw.Endpoint.addArray(hiw.Age, 1 /* POST */, "Ages/Filter", hiw.Age.filter);
    hiw.Endpoint.addSimple(hiw.Age, 1 /* POST */, "Ages/FilterCount", hiw.Age.filterCount);
    hiw.Endpoint.addSimple(hiw.Age, 1 /* POST */, "Ages/FilterPageCount", hiw.Age.filterPageCount);
    hiw.Endpoint.addArray(hiw.Age, 0 /* GET */, "/Age/{ageID}/Ages/{page}", hiw.Age.getByParentAgeID);
    hiw.Endpoint.addSimple(hiw.Age, 0 /* GET */, "/Age/{ageID}/Ages/Count", hiw.Age.getByParentAgeIDCount);
    hiw.Endpoint.addSimple(hiw.Age, 0 /* GET */, "/Age/{ageID}/Ages/PageCount", hiw.Age.getByParentAgeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Age, 0 /* GET */, "/Age/{ageID}/ParentAge", hiw.Age.getParentAgeForAge);
    hiw.Endpoint.addArray(hiw.AgeRelation, 0 /* GET */, "/AgeRelations/{page}", hiw.AgeRelation.getAll);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/AgeRelations/Count", hiw.AgeRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/AgeRelations/PageCount", hiw.AgeRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.AgeRelation, 0 /* GET */, "/AgeRelation/{id}", hiw.AgeRelation.getByID);
    hiw.Endpoint.addArray(hiw.AgeRelation, 1 /* POST */, "AgeRelations/Filter", hiw.AgeRelation.filter);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 1 /* POST */, "AgeRelations/FilterCount", hiw.AgeRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 1 /* POST */, "AgeRelations/FilterPageCount", hiw.AgeRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Ancestors/{page}", hiw.AgeRelation.getByAncestorAgeID);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Ancestors/Count", hiw.AgeRelation.getByAncestorAgeIDCount);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Ancestors/PageCount", hiw.AgeRelation.getByAncestorAgeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Age, 0 /* GET */, "/AgeRelation/{ageRelationID}/AncestorAge", hiw.AgeRelation.getAncestorAgeForAgeRelation);
    hiw.Endpoint.addArray(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Descendants/{page}", hiw.AgeRelation.getByDescendantAgeID);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Descendants/Count", hiw.AgeRelation.getByDescendantAgeIDCount);
    hiw.Endpoint.addSimple(hiw.AgeRelation, 0 /* GET */, "/Age/{ageID}/Descendants/PageCount", hiw.AgeRelation.getByDescendantAgeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Age, 0 /* GET */, "/AgeRelation/{ageRelationID}/DescendantAge", hiw.AgeRelation.getDescendantAgeForAgeRelation);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudents/{page}", hiw.CharacteristicOfSchoolOrStudent.getAll);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudents/Count", hiw.CharacteristicOfSchoolOrStudent.getAllCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudents/PageCount", hiw.CharacteristicOfSchoolOrStudent.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{id}", hiw.CharacteristicOfSchoolOrStudent.getByID);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudent, 1 /* POST */, "CharacteristicOfSchoolOrStudents/Filter", hiw.CharacteristicOfSchoolOrStudent.filter);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 1 /* POST */, "CharacteristicOfSchoolOrStudents/FilterCount", hiw.CharacteristicOfSchoolOrStudent.filterCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 1 /* POST */, "CharacteristicOfSchoolOrStudents/FilterPageCount", hiw.CharacteristicOfSchoolOrStudent.filterPageCount);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/CharacteristicOfSchoolOrStudents/{page}", hiw.CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentID);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/CharacteristicOfSchoolOrStudents/Count", hiw.CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/CharacteristicOfSchoolOrStudents/PageCount", hiw.CharacteristicOfSchoolOrStudent.getByParentCharacteristicOfSchoolOrStudentIDPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/ParentCharacteristicOfSchoolOrStudent", hiw.CharacteristicOfSchoolOrStudent.getParentCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudent);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelations/{page}", hiw.CharacteristicOfSchoolOrStudentRelation.getAll);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelations/Count", hiw.CharacteristicOfSchoolOrStudentRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelations/PageCount", hiw.CharacteristicOfSchoolOrStudentRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelation/{id}", hiw.CharacteristicOfSchoolOrStudentRelation.getByID);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudentRelation, 1 /* POST */, "CharacteristicOfSchoolOrStudentRelations/Filter", hiw.CharacteristicOfSchoolOrStudentRelation.filter);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 1 /* POST */, "CharacteristicOfSchoolOrStudentRelations/FilterCount", hiw.CharacteristicOfSchoolOrStudentRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 1 /* POST */, "CharacteristicOfSchoolOrStudentRelations/FilterPageCount", hiw.CharacteristicOfSchoolOrStudentRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Ancestors/{page}", hiw.CharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentID);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Ancestors/Count", hiw.CharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentIDCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Ancestors/PageCount", hiw.CharacteristicOfSchoolOrStudentRelation.getByAncestorCharacteristicOfSchoolOrStudentIDPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelation/{characteristicOfSchoolOrStudentRelationID}/AncestorCharacteristicOfSchoolOrStudent", hiw.CharacteristicOfSchoolOrStudentRelation.getAncestorCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation);
    hiw.Endpoint.addArray(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Descendants/{page}", hiw.CharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentID);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Descendants/Count", hiw.CharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentIDCount);
    hiw.Endpoint.addSimple(hiw.CharacteristicOfSchoolOrStudentRelation, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/Descendants/PageCount", hiw.CharacteristicOfSchoolOrStudentRelation.getByDescendantCharacteristicOfSchoolOrStudentIDPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/CharacteristicOfSchoolOrStudentRelation/{characteristicOfSchoolOrStudentRelationID}/DescendantCharacteristicOfSchoolOrStudent", hiw.CharacteristicOfSchoolOrStudentRelation.getDescendantCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation);
    hiw.Endpoint.addArray(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirths/{page}", hiw.CountryOfBirth.getAll);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirths/Count", hiw.CountryOfBirth.getAllCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirths/PageCount", hiw.CountryOfBirth.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirth/{id}", hiw.CountryOfBirth.getByID);
    hiw.Endpoint.addArray(hiw.CountryOfBirth, 1 /* POST */, "CountryOfBirths/Filter", hiw.CountryOfBirth.filter);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 1 /* POST */, "CountryOfBirths/FilterCount", hiw.CountryOfBirth.filterCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 1 /* POST */, "CountryOfBirths/FilterPageCount", hiw.CountryOfBirth.filterPageCount);
    hiw.Endpoint.addArray(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/CountryOfBirths/{page}", hiw.CountryOfBirth.getByParentCountryOfBirthID);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/CountryOfBirths/Count", hiw.CountryOfBirth.getByParentCountryOfBirthIDCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/CountryOfBirths/PageCount", hiw.CountryOfBirth.getByParentCountryOfBirthIDPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/ParentCountryOfBirth", hiw.CountryOfBirth.getParentCountryOfBirthForCountryOfBirth);
    hiw.Endpoint.addArray(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirthRelations/{page}", hiw.CountryOfBirthRelation.getAll);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirthRelations/Count", hiw.CountryOfBirthRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirthRelations/PageCount", hiw.CountryOfBirthRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirthRelation/{id}", hiw.CountryOfBirthRelation.getByID);
    hiw.Endpoint.addArray(hiw.CountryOfBirthRelation, 1 /* POST */, "CountryOfBirthRelations/Filter", hiw.CountryOfBirthRelation.filter);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 1 /* POST */, "CountryOfBirthRelations/FilterCount", hiw.CountryOfBirthRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 1 /* POST */, "CountryOfBirthRelations/FilterPageCount", hiw.CountryOfBirthRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Ancestors/{page}", hiw.CountryOfBirthRelation.getByAncestorCountryOfBirthID);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Ancestors/Count", hiw.CountryOfBirthRelation.getByAncestorCountryOfBirthIDCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Ancestors/PageCount", hiw.CountryOfBirthRelation.getByAncestorCountryOfBirthIDPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirthRelation/{countryOfBirthRelationID}/AncestorCountryOfBirth", hiw.CountryOfBirthRelation.getAncestorCountryOfBirthForCountryOfBirthRelation);
    hiw.Endpoint.addArray(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Descendants/{page}", hiw.CountryOfBirthRelation.getByDescendantCountryOfBirthID);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Descendants/Count", hiw.CountryOfBirthRelation.getByDescendantCountryOfBirthIDCount);
    hiw.Endpoint.addSimple(hiw.CountryOfBirthRelation, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/Descendants/PageCount", hiw.CountryOfBirthRelation.getByDescendantCountryOfBirthIDPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirth, 0 /* GET */, "/CountryOfBirthRelation/{countryOfBirthRelationID}/DescendantCountryOfBirth", hiw.CountryOfBirthRelation.getDescendantCountryOfBirthForCountryOfBirthRelation);
    hiw.Endpoint.addArray(hiw.DataCategory, 0 /* GET */, "/DataCategories/{page}", hiw.DataCategory.getAll);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/DataCategories/Count", hiw.DataCategory.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/DataCategories/PageCount", hiw.DataCategory.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategory, 0 /* GET */, "/DataCategory/{id}", hiw.DataCategory.getByID);
    hiw.Endpoint.addArray(hiw.DataCategory, 1 /* POST */, "DataCategories/Filter", hiw.DataCategory.filter);
    hiw.Endpoint.addSimple(hiw.DataCategory, 1 /* POST */, "DataCategories/FilterCount", hiw.DataCategory.filterCount);
    hiw.Endpoint.addSimple(hiw.DataCategory, 1 /* POST */, "DataCategories/FilterPageCount", hiw.DataCategory.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/ParentDataCategories/{page}", hiw.DataCategory.getByParentDataCategoryID);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/ParentDataCategories/Count", hiw.DataCategory.getByParentDataCategoryIDCount);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/ParentDataCategories/PageCount", hiw.DataCategory.getByParentDataCategoryIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/ParentDataCategory", hiw.DataCategory.getParentDataCategoryForDataCategory);
    hiw.Endpoint.addArray(hiw.DataCategory, 0 /* GET */, "/Initiative/{initiativeID}/DataCategories/{page}", hiw.DataCategory.getByInitiativeID);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/Initiative/{initiativeID}/DataCategories/Count", hiw.DataCategory.getByInitiativeIDCount);
    hiw.Endpoint.addSimple(hiw.DataCategory, 0 /* GET */, "/Initiative/{initiativeID}/DataCategories/PageCount", hiw.DataCategory.getByInitiativeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Initiative, 0 /* GET */, "/DataCategory/{dataCategoryID}/Initiative", hiw.DataCategory.getInitiativeForDataCategory);
    hiw.Endpoint.addArray(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategoryRelations/{page}", hiw.DataCategoryRelation.getAll);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategoryRelations/Count", hiw.DataCategoryRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategoryRelations/PageCount", hiw.DataCategoryRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategoryRelation/{id}", hiw.DataCategoryRelation.getByID);
    hiw.Endpoint.addArray(hiw.DataCategoryRelation, 1 /* POST */, "DataCategoryRelations/Filter", hiw.DataCategoryRelation.filter);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 1 /* POST */, "DataCategoryRelations/FilterCount", hiw.DataCategoryRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 1 /* POST */, "DataCategoryRelations/FilterPageCount", hiw.DataCategoryRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Ancestors/{page}", hiw.DataCategoryRelation.getByAncestorDataCategoryID);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Ancestors/Count", hiw.DataCategoryRelation.getByAncestorDataCategoryIDCount);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Ancestors/PageCount", hiw.DataCategoryRelation.getByAncestorDataCategoryIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategory, 0 /* GET */, "/DataCategoryRelation/{dataCategoryRelationID}/AncestorDataCategory", hiw.DataCategoryRelation.getAncestorDataCategoryForDataCategoryRelation);
    hiw.Endpoint.addArray(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Descendants/{page}", hiw.DataCategoryRelation.getByDescendantDataCategoryID);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Descendants/Count", hiw.DataCategoryRelation.getByDescendantDataCategoryIDCount);
    hiw.Endpoint.addSimple(hiw.DataCategoryRelation, 0 /* GET */, "/DataCategory/{dataCategoryID}/Descendants/PageCount", hiw.DataCategoryRelation.getByDescendantDataCategoryIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategory, 0 /* GET */, "/DataCategoryRelation/{dataCategoryRelationID}/DescendantDataCategory", hiw.DataCategoryRelation.getDescendantDataCategoryForDataCategoryRelation);
    hiw.Endpoint.addArray(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSourceDataSuppliers/{page}", hiw.DataSourceDataSupplier.getAll);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSourceDataSuppliers/Count", hiw.DataSourceDataSupplier.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSourceDataSuppliers/PageCount", hiw.DataSourceDataSupplier.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSourceDataSupplier/{id}", hiw.DataSourceDataSupplier.getByID);
    hiw.Endpoint.addArray(hiw.DataSourceDataSupplier, 1 /* POST */, "DataSourceDataSuppliers/Filter", hiw.DataSourceDataSupplier.filter);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 1 /* POST */, "DataSourceDataSuppliers/FilterCount", hiw.DataSourceDataSupplier.filterCount);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 1 /* POST */, "DataSourceDataSuppliers/FilterPageCount", hiw.DataSourceDataSupplier.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceDataSuppliers/{page}", hiw.DataSourceDataSupplier.getByDataSourceID);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceDataSuppliers/Count", hiw.DataSourceDataSupplier.getByDataSourceIDCount);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceDataSuppliers/PageCount", hiw.DataSourceDataSupplier.getByDataSourceIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataSource, 0 /* GET */, "/DataSourceDataSupplier/{dataSourceDataSupplierID}/DataSource", hiw.DataSourceDataSupplier.getDataSourceForDataSourceDataSupplier);
    hiw.Endpoint.addArray(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSupplier/{dataSupplierID}/DataSourceDataSuppliers/{page}", hiw.DataSourceDataSupplier.getByDataSupplierID);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSupplier/{dataSupplierID}/DataSourceDataSuppliers/Count", hiw.DataSourceDataSupplier.getByDataSupplierIDCount);
    hiw.Endpoint.addSimple(hiw.DataSourceDataSupplier, 0 /* GET */, "/DataSupplier/{dataSupplierID}/DataSourceDataSuppliers/PageCount", hiw.DataSourceDataSupplier.getByDataSupplierIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataSupplier, 0 /* GET */, "/DataSourceDataSupplier/{dataSourceDataSupplierID}/DataSupplier", hiw.DataSourceDataSupplier.getDataSupplierForDataSourceDataSupplier);
    hiw.Endpoint.addArray(hiw.DataSource, 0 /* GET */, "/DataSources/{page}", hiw.DataSource.getAll);
    hiw.Endpoint.addSimple(hiw.DataSource, 0 /* GET */, "/DataSources/Count", hiw.DataSource.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataSource, 0 /* GET */, "/DataSources/PageCount", hiw.DataSource.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataSource, 0 /* GET */, "/DataSource/{id}", hiw.DataSource.getByID);
    hiw.Endpoint.addArray(hiw.DataSource, 1 /* POST */, "DataSources/Filter", hiw.DataSource.filter);
    hiw.Endpoint.addSimple(hiw.DataSource, 1 /* POST */, "DataSources/FilterCount", hiw.DataSource.filterCount);
    hiw.Endpoint.addSimple(hiw.DataSource, 1 /* POST */, "DataSources/FilterPageCount", hiw.DataSource.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataSourceURL, 0 /* GET */, "/DataSourceURLs/{page}", hiw.DataSourceURL.getAll);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/DataSourceURLs/Count", hiw.DataSourceURL.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/DataSourceURLs/PageCount", hiw.DataSourceURL.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataSourceURL, 0 /* GET */, "/DataSourceURL/{id}", hiw.DataSourceURL.getByID);
    hiw.Endpoint.addArray(hiw.DataSourceURL, 1 /* POST */, "DataSourceURLs/Filter", hiw.DataSourceURL.filter);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 1 /* POST */, "DataSourceURLs/FilterCount", hiw.DataSourceURL.filterCount);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 1 /* POST */, "DataSourceURLs/FilterPageCount", hiw.DataSourceURL.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataSourceURL, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceURLs/{page}", hiw.DataSourceURL.getByDataSourceID);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceURLs/Count", hiw.DataSourceURL.getByDataSourceIDCount);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/DataSource/{dataSourceID}/DataSourceURLs/PageCount", hiw.DataSourceURL.getByDataSourceIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataSource, 0 /* GET */, "/DataSourceURL/{dataSourceURLID}/DataSource", hiw.DataSourceURL.getDataSourceForDataSourceURL);
    hiw.Endpoint.addArray(hiw.DataSourceURL, 0 /* GET */, "/Url/{urlID}/DataSourceURLs/{page}", hiw.DataSourceURL.getByUrlID);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/Url/{urlID}/DataSourceURLs/Count", hiw.DataSourceURL.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.DataSourceURL, 0 /* GET */, "/Url/{urlID}/DataSourceURLs/PageCount", hiw.DataSourceURL.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/DataSourceURL/{dataSourceURLID}/Url", hiw.DataSourceURL.getUrlForDataSourceURL);
    hiw.Endpoint.addArray(hiw.DataSupplier, 0 /* GET */, "/DataSuppliers/{page}", hiw.DataSupplier.getAll);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 0 /* GET */, "/DataSuppliers/Count", hiw.DataSupplier.getAllCount);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 0 /* GET */, "/DataSuppliers/PageCount", hiw.DataSupplier.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DataSupplier, 0 /* GET */, "/DataSupplier/{id}", hiw.DataSupplier.getByID);
    hiw.Endpoint.addArray(hiw.DataSupplier, 1 /* POST */, "DataSuppliers/Filter", hiw.DataSupplier.filter);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 1 /* POST */, "DataSuppliers/FilterCount", hiw.DataSupplier.filterCount);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 1 /* POST */, "DataSuppliers/FilterPageCount", hiw.DataSupplier.filterPageCount);
    hiw.Endpoint.addArray(hiw.DataSupplier, 0 /* GET */, "/Url/{urlID}/DataSuppliers/{page}", hiw.DataSupplier.getByUrlID);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 0 /* GET */, "/Url/{urlID}/DataSuppliers/Count", hiw.DataSupplier.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.DataSupplier, 0 /* GET */, "/Url/{urlID}/DataSuppliers/PageCount", hiw.DataSupplier.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/DataSupplier/{dataSupplierID}/Url", hiw.DataSupplier.getUrlForDataSupplier);
    hiw.Endpoint.addArray(hiw.DimensionBook, 0 /* GET */, "/DimensionBooks/{page}", hiw.DimensionBook.getAll);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionBooks/Count", hiw.DimensionBook.getAllCount);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionBooks/PageCount", hiw.DimensionBook.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/DimensionBook/{id}", hiw.DimensionBook.getByID);
    hiw.Endpoint.addArray(hiw.DimensionBook, 1 /* POST */, "DimensionBooks/Filter", hiw.DimensionBook.filter);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 1 /* POST */, "DimensionBooks/FilterCount", hiw.DimensionBook.filterCount);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 1 /* POST */, "DimensionBooks/FilterPageCount", hiw.DimensionBook.filterPageCount);
    hiw.Endpoint.addArray(hiw.DimensionBook, 0 /* GET */, "/DimensionBook/{dimensionBookID}/DimensionBooks/{page}", hiw.DimensionBook.getByParentDimensionBookID);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionBook/{dimensionBookID}/DimensionBooks/Count", hiw.DimensionBook.getByParentDimensionBookIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionBook/{dimensionBookID}/DimensionBooks/PageCount", hiw.DimensionBook.getByParentDimensionBookIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/DimensionBook/{dimensionBookID}/ParentDimensionBook", hiw.DimensionBook.getParentDimensionBookForDimensionBook);
    hiw.Endpoint.addArray(hiw.DimensionBook, 0 /* GET */, "/DimensionList/{dimensionListID}/DimensionBooks/{page}", hiw.DimensionBook.getByDimensionListID);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionList/{dimensionListID}/DimensionBooks/Count", hiw.DimensionBook.getByDimensionListIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionBook, 0 /* GET */, "/DimensionList/{dimensionListID}/DimensionBooks/PageCount", hiw.DimensionBook.getByDimensionListIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionList, 0 /* GET */, "/DimensionBook/{dimensionBookID}/DimensionList", hiw.DimensionBook.getDimensionListForDimensionBook);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/DimensionBook?Key={key}", hiw.DimensionBook.getByKey);
    hiw.Endpoint.addArray(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBookRelations/{page}", hiw.DimensionBookRelation.getAll);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBookRelations/Count", hiw.DimensionBookRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBookRelations/PageCount", hiw.DimensionBookRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBookRelation/{id}", hiw.DimensionBookRelation.getByID);
    hiw.Endpoint.addArray(hiw.DimensionBookRelation, 1 /* POST */, "DimensionBookRelations/Filter", hiw.DimensionBookRelation.filter);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 1 /* POST */, "DimensionBookRelations/FilterCount", hiw.DimensionBookRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 1 /* POST */, "DimensionBookRelations/FilterPageCount", hiw.DimensionBookRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Ancestors/{page}", hiw.DimensionBookRelation.getByAncestorDimensionBookID);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Ancestors/Count", hiw.DimensionBookRelation.getByAncestorDimensionBookIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Ancestors/PageCount", hiw.DimensionBookRelation.getByAncestorDimensionBookIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/DimensionBookRelation/{dimensionBookRelationID}/AncestorDimensionBook", hiw.DimensionBookRelation.getAncestorDimensionBookForDimensionBookRelation);
    hiw.Endpoint.addArray(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Descendants/{page}", hiw.DimensionBookRelation.getByDescendantDimensionBookID);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Descendants/Count", hiw.DimensionBookRelation.getByDescendantDimensionBookIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionBookRelation, 0 /* GET */, "/DimensionBook/{dimensionBookID}/Descendants/PageCount", hiw.DimensionBookRelation.getByDescendantDimensionBookIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/DimensionBookRelation/{dimensionBookRelationID}/DescendantDimensionBook", hiw.DimensionBookRelation.getDescendantDimensionBookForDimensionBookRelation);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/DimensionGraphs/{page}", hiw.DimensionGraph.getAll);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/DimensionGraphs/Count", hiw.DimensionGraph.getAllCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/DimensionGraphs/PageCount", hiw.DimensionGraph.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionGraph, 0 /* GET */, "/DimensionGraph/{id}", hiw.DimensionGraph.getByID);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 1 /* POST */, "DimensionGraphs/Filter", hiw.DimensionGraph.filter);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 1 /* POST */, "DimensionGraphs/FilterCount", hiw.DimensionGraph.filterCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 1 /* POST */, "DimensionGraphs/FilterPageCount", hiw.DimensionGraph.filterPageCount);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/Total/{totalID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByTotalID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Total/{totalID}/DimensionGraphs/Count", hiw.DimensionGraph.getByTotalIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Total/{totalID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByTotalIDPageCount);
    hiw.Endpoint.addSingle(hiw.Total, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Total", hiw.DimensionGraph.getTotalForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/Age/{ageID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByAgeID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Age/{ageID}/DimensionGraphs/Count", hiw.DimensionGraph.getByAgeIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Age/{ageID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByAgeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Age, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Age", hiw.DimensionGraph.getAgeForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/Sex/{sexID}/DimensionGraphs/{page}", hiw.DimensionGraph.getBySexID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Sex/{sexID}/DimensionGraphs/Count", hiw.DimensionGraph.getBySexIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Sex/{sexID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getBySexIDPageCount);
    hiw.Endpoint.addSingle(hiw.Sex, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Sex", hiw.DimensionGraph.getSexForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByRaceEthnicityID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/DimensionGraphs/Count", hiw.DimensionGraph.getByRaceEthnicityIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByRaceEthnicityIDPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicity, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/RaceEthnicity", hiw.DimensionGraph.getRaceEthnicityForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByIncomeAndPovertyStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByIncomeAndPovertyStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByIncomeAndPovertyStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IncomeAndPovertyStatus", hiw.DimensionGraph.getIncomeAndPovertyStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByEducationalAttainmentID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/DimensionGraphs/Count", hiw.DimensionGraph.getByEducationalAttainmentIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByEducationalAttainmentIDPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainment, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/EducationalAttainment", hiw.DimensionGraph.getEducationalAttainmentForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByHealthInsuranceStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByHealthInsuranceStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByHealthInsuranceStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/HealthInsuranceStatus", hiw.DimensionGraph.getHealthInsuranceStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/DimensionGraphs/{page}", hiw.DimensionGraph.getBySexualOrientationID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/DimensionGraphs/Count", hiw.DimensionGraph.getBySexualOrientationIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getBySexualOrientationIDPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientation, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/SexualOrientation", hiw.DimensionGraph.getSexualOrientationForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/FamilyType/{familyTypeID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByFamilyTypeID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/FamilyType/{familyTypeID}/DimensionGraphs/Count", hiw.DimensionGraph.getByFamilyTypeIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/FamilyType/{familyTypeID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByFamilyTypeIDPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyType, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/FamilyType", hiw.DimensionGraph.getFamilyTypeForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByMaritalStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByMaritalStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByMaritalStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/MaritalStatus", hiw.DimensionGraph.getMaritalStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByVeteranStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByVeteranStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByVeteranStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/VeteranStatus", hiw.DimensionGraph.getVeteranStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByCountryOfBirthID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/DimensionGraphs/Count", hiw.DimensionGraph.getByCountryOfBirthIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/CountryOfBirth/{countryOfBirthID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByCountryOfBirthIDPageCount);
    hiw.Endpoint.addSingle(hiw.CountryOfBirth, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/CountryOfBirth", hiw.DimensionGraph.getCountryOfBirthForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByDisabilityStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByDisabilityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByDisabilityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/DisabilityStatus", hiw.DimensionGraph.getDisabilityStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByObesityStatusID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/DimensionGraphs/Count", hiw.DimensionGraph.getByObesityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByObesityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatus, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/ObesityStatus", hiw.DimensionGraph.getObesityStatusForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByCharacteristicOfSchoolOrStudentID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/DimensionGraphs/Count", hiw.DimensionGraph.getByCharacteristicOfSchoolOrStudentIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/CharacteristicOfSchoolOrStudent/{characteristicOfSchoolOrStudentID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByCharacteristicOfSchoolOrStudentIDPageCount);
    hiw.Endpoint.addSingle(hiw.CharacteristicOfSchoolOrStudent, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/CharacteristicOfSchoolOrStudent", hiw.DimensionGraph.getCharacteristicOfSchoolOrStudentForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/Other/{otherID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByOtherID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Other/{otherID}/DimensionGraphs/Count", hiw.DimensionGraph.getByOtherIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Other/{otherID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByOtherIDPageCount);
    hiw.Endpoint.addSingle(hiw.Other, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Other", hiw.DimensionGraph.getOtherForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionGraph, 0 /* GET */, "/Geography/{geographyID}/DimensionGraphs/{page}", hiw.DimensionGraph.getByGeographyID);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Geography/{geographyID}/DimensionGraphs/Count", hiw.DimensionGraph.getByGeographyIDCount);
    hiw.Endpoint.addSimple(hiw.DimensionGraph, 0 /* GET */, "/Geography/{geographyID}/DimensionGraphs/PageCount", hiw.DimensionGraph.getByGeographyIDPageCount);
    hiw.Endpoint.addSingle(hiw.Geography, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Geography", hiw.DimensionGraph.getGeographyForDimensionGraph);
    hiw.Endpoint.addArray(hiw.DimensionList, 0 /* GET */, "/DimensionLists/{page}", hiw.DimensionList.getAll);
    hiw.Endpoint.addSimple(hiw.DimensionList, 0 /* GET */, "/DimensionLists/Count", hiw.DimensionList.getAllCount);
    hiw.Endpoint.addSimple(hiw.DimensionList, 0 /* GET */, "/DimensionLists/PageCount", hiw.DimensionList.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionList, 0 /* GET */, "/DimensionList/{id}", hiw.DimensionList.getByID);
    hiw.Endpoint.addArray(hiw.DimensionList, 1 /* POST */, "DimensionLists/Filter", hiw.DimensionList.filter);
    hiw.Endpoint.addSimple(hiw.DimensionList, 1 /* POST */, "DimensionLists/FilterCount", hiw.DimensionList.filterCount);
    hiw.Endpoint.addSimple(hiw.DimensionList, 1 /* POST */, "DimensionLists/FilterPageCount", hiw.DimensionList.filterPageCount);
    hiw.Endpoint.addArray(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatuses/{page}", hiw.DisabilityStatus.getAll);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatuses/Count", hiw.DisabilityStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatuses/PageCount", hiw.DisabilityStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatus/{id}", hiw.DisabilityStatus.getByID);
    hiw.Endpoint.addArray(hiw.DisabilityStatus, 1 /* POST */, "DisabilityStatuses/Filter", hiw.DisabilityStatus.filter);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 1 /* POST */, "DisabilityStatuses/FilterCount", hiw.DisabilityStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 1 /* POST */, "DisabilityStatuses/FilterPageCount", hiw.DisabilityStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DisabilityStatuses/{page}", hiw.DisabilityStatus.getByParentDisabilityStatusID);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DisabilityStatuses/Count", hiw.DisabilityStatus.getByParentDisabilityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/DisabilityStatuses/PageCount", hiw.DisabilityStatus.getByParentDisabilityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/ParentDisabilityStatus", hiw.DisabilityStatus.getParentDisabilityStatusForDisabilityStatus);
    hiw.Endpoint.addArray(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatusRelations/{page}", hiw.DisabilityStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatusRelations/Count", hiw.DisabilityStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatusRelations/PageCount", hiw.DisabilityStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatusRelation/{id}", hiw.DisabilityStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.DisabilityStatusRelation, 1 /* POST */, "DisabilityStatusRelations/Filter", hiw.DisabilityStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 1 /* POST */, "DisabilityStatusRelations/FilterCount", hiw.DisabilityStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 1 /* POST */, "DisabilityStatusRelations/FilterPageCount", hiw.DisabilityStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Ancestors/{page}", hiw.DisabilityStatusRelation.getByAncestorDisabilityStatusID);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Ancestors/Count", hiw.DisabilityStatusRelation.getByAncestorDisabilityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Ancestors/PageCount", hiw.DisabilityStatusRelation.getByAncestorDisabilityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatusRelation/{disabilityStatusRelationID}/AncestorDisabilityStatus", hiw.DisabilityStatusRelation.getAncestorDisabilityStatusForDisabilityStatusRelation);
    hiw.Endpoint.addArray(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Descendants/{page}", hiw.DisabilityStatusRelation.getByDescendantDisabilityStatusID);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Descendants/Count", hiw.DisabilityStatusRelation.getByDescendantDisabilityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.DisabilityStatusRelation, 0 /* GET */, "/DisabilityStatus/{disabilityStatusID}/Descendants/PageCount", hiw.DisabilityStatusRelation.getByDescendantDisabilityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.DisabilityStatus, 0 /* GET */, "/DisabilityStatusRelation/{disabilityStatusRelationID}/DescendantDisabilityStatus", hiw.DisabilityStatusRelation.getDescendantDisabilityStatusForDisabilityStatusRelation);
    hiw.Endpoint.addArray(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainments/{page}", hiw.EducationalAttainment.getAll);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainments/Count", hiw.EducationalAttainment.getAllCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainments/PageCount", hiw.EducationalAttainment.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainment/{id}", hiw.EducationalAttainment.getByID);
    hiw.Endpoint.addArray(hiw.EducationalAttainment, 1 /* POST */, "EducationalAttainments/Filter", hiw.EducationalAttainment.filter);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 1 /* POST */, "EducationalAttainments/FilterCount", hiw.EducationalAttainment.filterCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 1 /* POST */, "EducationalAttainments/FilterPageCount", hiw.EducationalAttainment.filterPageCount);
    hiw.Endpoint.addArray(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/EducationalAttainments/{page}", hiw.EducationalAttainment.getByParentEducationalAttainmentID);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/EducationalAttainments/Count", hiw.EducationalAttainment.getByParentEducationalAttainmentIDCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/EducationalAttainments/PageCount", hiw.EducationalAttainment.getByParentEducationalAttainmentIDPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/ParentEducationalAttainment", hiw.EducationalAttainment.getParentEducationalAttainmentForEducationalAttainment);
    hiw.Endpoint.addArray(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainmentRelations/{page}", hiw.EducationalAttainmentRelation.getAll);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainmentRelations/Count", hiw.EducationalAttainmentRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainmentRelations/PageCount", hiw.EducationalAttainmentRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainmentRelation/{id}", hiw.EducationalAttainmentRelation.getByID);
    hiw.Endpoint.addArray(hiw.EducationalAttainmentRelation, 1 /* POST */, "EducationalAttainmentRelations/Filter", hiw.EducationalAttainmentRelation.filter);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 1 /* POST */, "EducationalAttainmentRelations/FilterCount", hiw.EducationalAttainmentRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 1 /* POST */, "EducationalAttainmentRelations/FilterPageCount", hiw.EducationalAttainmentRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Ancestors/{page}", hiw.EducationalAttainmentRelation.getByAncestorEducationalAttainmentID);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Ancestors/Count", hiw.EducationalAttainmentRelation.getByAncestorEducationalAttainmentIDCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Ancestors/PageCount", hiw.EducationalAttainmentRelation.getByAncestorEducationalAttainmentIDPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainmentRelation/{educationalAttainmentRelationID}/AncestorducationalAttainment", hiw.EducationalAttainmentRelation.getAncestorducationalAttainmentForEducationalAttainmentRelation);
    hiw.Endpoint.addArray(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Descendants/{page}", hiw.EducationalAttainmentRelation.getByDescendantEducationalAttainmentID);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Descendants/Count", hiw.EducationalAttainmentRelation.getByDescendantEducationalAttainmentIDCount);
    hiw.Endpoint.addSimple(hiw.EducationalAttainmentRelation, 0 /* GET */, "/EducationalAttainment/{educationalAttainmentID}/Descendants/PageCount", hiw.EducationalAttainmentRelation.getByDescendantEducationalAttainmentIDPageCount);
    hiw.Endpoint.addSingle(hiw.EducationalAttainment, 0 /* GET */, "/EducationalAttainmentRelation/{educationalAttainmentRelationID}/DescendantEducationalAttainment", hiw.EducationalAttainmentRelation.getDescendantEducationalAttainmentForEducationalAttainmentRelation);
    hiw.Endpoint.addArray(hiw.FamilyType, 0 /* GET */, "/FamilyTypes/{page}", hiw.FamilyType.getAll);
    hiw.Endpoint.addSimple(hiw.FamilyType, 0 /* GET */, "/FamilyTypes/Count", hiw.FamilyType.getAllCount);
    hiw.Endpoint.addSimple(hiw.FamilyType, 0 /* GET */, "/FamilyTypes/PageCount", hiw.FamilyType.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyType, 0 /* GET */, "/FamilyType/{id}", hiw.FamilyType.getByID);
    hiw.Endpoint.addArray(hiw.FamilyType, 1 /* POST */, "FamilyTypes/Filter", hiw.FamilyType.filter);
    hiw.Endpoint.addSimple(hiw.FamilyType, 1 /* POST */, "FamilyTypes/FilterCount", hiw.FamilyType.filterCount);
    hiw.Endpoint.addSimple(hiw.FamilyType, 1 /* POST */, "FamilyTypes/FilterPageCount", hiw.FamilyType.filterPageCount);
    hiw.Endpoint.addArray(hiw.FamilyType, 0 /* GET */, "/FamilyType/{familyTypeID}/FamilyTypes/{page}", hiw.FamilyType.getByParentFamilyTypeID);
    hiw.Endpoint.addSimple(hiw.FamilyType, 0 /* GET */, "/FamilyType/{familyTypeID}/FamilyTypes/Count", hiw.FamilyType.getByParentFamilyTypeIDCount);
    hiw.Endpoint.addSimple(hiw.FamilyType, 0 /* GET */, "/FamilyType/{familyTypeID}/FamilyTypes/PageCount", hiw.FamilyType.getByParentFamilyTypeIDPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyType, 0 /* GET */, "/FamilyType/{familyTypeID}/ParentFamilyType", hiw.FamilyType.getParentFamilyTypeForFamilyType);
    hiw.Endpoint.addArray(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyTypeRelations/{page}", hiw.FamilyTypeRelation.getAll);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyTypeRelations/Count", hiw.FamilyTypeRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyTypeRelations/PageCount", hiw.FamilyTypeRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyTypeRelation/{id}", hiw.FamilyTypeRelation.getByID);
    hiw.Endpoint.addArray(hiw.FamilyTypeRelation, 1 /* POST */, "FamilyTypeRelations/Filter", hiw.FamilyTypeRelation.filter);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 1 /* POST */, "FamilyTypeRelations/FilterCount", hiw.FamilyTypeRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 1 /* POST */, "FamilyTypeRelations/FilterPageCount", hiw.FamilyTypeRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Ancestors/{page}", hiw.FamilyTypeRelation.getByAncestorFamilyTypeID);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Ancestors/Count", hiw.FamilyTypeRelation.getByAncestorFamilyTypeIDCount);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Ancestors/PageCount", hiw.FamilyTypeRelation.getByAncestorFamilyTypeIDPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyType, 0 /* GET */, "/FamilyTypeRelation/{familyTypeRelationID}/AncestorFamilyType", hiw.FamilyTypeRelation.getAncestorFamilyTypeForFamilyTypeRelation);
    hiw.Endpoint.addArray(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Descendants/{page}", hiw.FamilyTypeRelation.getByDescendantFamilyTypeID);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Descendants/Count", hiw.FamilyTypeRelation.getByDescendantFamilyTypeIDCount);
    hiw.Endpoint.addSimple(hiw.FamilyTypeRelation, 0 /* GET */, "/FamilyType/{familyTypeID}/Descendants/PageCount", hiw.FamilyTypeRelation.getByDescendantFamilyTypeIDPageCount);
    hiw.Endpoint.addSingle(hiw.FamilyType, 0 /* GET */, "/FamilyTypeRelation/{familyTypeRelationID}/DescendantFamilyType", hiw.FamilyTypeRelation.getDescendantFamilyTypeForFamilyTypeRelation);
    hiw.Endpoint.addArray(hiw.Geography, 0 /* GET */, "/Geographies/{page}", hiw.Geography.getAll);
    hiw.Endpoint.addSimple(hiw.Geography, 0 /* GET */, "/Geographies/Count", hiw.Geography.getAllCount);
    hiw.Endpoint.addSimple(hiw.Geography, 0 /* GET */, "/Geographies/PageCount", hiw.Geography.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Geography, 0 /* GET */, "/Geography/{id}", hiw.Geography.getByID);
    hiw.Endpoint.addArray(hiw.Geography, 1 /* POST */, "Geographies/Filter", hiw.Geography.filter);
    hiw.Endpoint.addSimple(hiw.Geography, 1 /* POST */, "Geographies/FilterCount", hiw.Geography.filterCount);
    hiw.Endpoint.addSimple(hiw.Geography, 1 /* POST */, "Geographies/FilterPageCount", hiw.Geography.filterPageCount);
    hiw.Endpoint.addArray(hiw.Geography, 0 /* GET */, "/Geography/{geographyID}/Geographies/{page}", hiw.Geography.getByParentGeographyID);
    hiw.Endpoint.addSimple(hiw.Geography, 0 /* GET */, "/Geography/{geographyID}/Geographies/Count", hiw.Geography.getByParentGeographyIDCount);
    hiw.Endpoint.addSimple(hiw.Geography, 0 /* GET */, "/Geography/{geographyID}/Geographies/PageCount", hiw.Geography.getByParentGeographyIDPageCount);
    hiw.Endpoint.addSingle(hiw.Geography, 0 /* GET */, "/Geography/{geographyID}/ParentGeography", hiw.Geography.getParentGeographyForGeography);
    hiw.Endpoint.addArray(hiw.GeographyRelation, 0 /* GET */, "/GeographyRelations/{page}", hiw.GeographyRelation.getAll);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/GeographyRelations/Count", hiw.GeographyRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/GeographyRelations/PageCount", hiw.GeographyRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.GeographyRelation, 0 /* GET */, "/GeographyRelation/{id}", hiw.GeographyRelation.getByID);
    hiw.Endpoint.addArray(hiw.GeographyRelation, 1 /* POST */, "GeographyRelations/Filter", hiw.GeographyRelation.filter);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 1 /* POST */, "GeographyRelations/FilterCount", hiw.GeographyRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 1 /* POST */, "GeographyRelations/FilterPageCount", hiw.GeographyRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Ancestors/{page}", hiw.GeographyRelation.getByAncestorGeographyID);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Ancestors/Count", hiw.GeographyRelation.getByAncestorGeographyIDCount);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Ancestors/PageCount", hiw.GeographyRelation.getByAncestorGeographyIDPageCount);
    hiw.Endpoint.addSingle(hiw.Geography, 0 /* GET */, "/GeographyRelation/{geographyRelationID}/AncestorGeography", hiw.GeographyRelation.getAncestorGeographyForGeographyRelation);
    hiw.Endpoint.addArray(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Descendants/{page}", hiw.GeographyRelation.getByDescendantGeographyID);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Descendants/Count", hiw.GeographyRelation.getByDescendantGeographyIDCount);
    hiw.Endpoint.addSimple(hiw.GeographyRelation, 0 /* GET */, "/Geography/{geographyID}/Descendants/PageCount", hiw.GeographyRelation.getByDescendantGeographyIDPageCount);
    hiw.Endpoint.addSingle(hiw.Geography, 0 /* GET */, "/GeographyRelation/{geographyRelationID}/DescendantGeography", hiw.GeographyRelation.getDescendantGeographyForGeographyRelation);
    hiw.Endpoint.addArray(hiw.GlossaryTerm, 0 /* GET */, "/GlossaryTerms/{page}", hiw.GlossaryTerm.getAll);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/GlossaryTerms/Count", hiw.GlossaryTerm.getAllCount);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/GlossaryTerms/PageCount", hiw.GlossaryTerm.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.GlossaryTerm, 0 /* GET */, "/GlossaryTerm/{id}", hiw.GlossaryTerm.getByID);
    hiw.Endpoint.addArray(hiw.GlossaryTerm, 1 /* POST */, "GlossaryTerms/Filter", hiw.GlossaryTerm.filter);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 1 /* POST */, "GlossaryTerms/FilterCount", hiw.GlossaryTerm.filterCount);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 1 /* POST */, "GlossaryTerms/FilterPageCount", hiw.GlossaryTerm.filterPageCount);
    hiw.Endpoint.addArray(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl1GlossaryTerms/{page}", hiw.GlossaryTerm.getBySourceUrl1ID);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl1GlossaryTerms/Count", hiw.GlossaryTerm.getBySourceUrl1IDCount);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl1GlossaryTerms/PageCount", hiw.GlossaryTerm.getBySourceUrl1IDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/GlossaryTerm/{glossaryTermID}/SourceUrl1", hiw.GlossaryTerm.getSourceUrl1ForGlossaryTerm);
    hiw.Endpoint.addArray(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl2GlossaryTerms/{page}", hiw.GlossaryTerm.getBySourceUrl2ID);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl2GlossaryTerms/Count", hiw.GlossaryTerm.getBySourceUrl2IDCount);
    hiw.Endpoint.addSimple(hiw.GlossaryTerm, 0 /* GET */, "/Url/{urlID}/SourceUrl2GlossaryTerms/PageCount", hiw.GlossaryTerm.getBySourceUrl2IDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/GlossaryTerm/{glossaryTermID}/SourceUrl2", hiw.GlossaryTerm.getSourceUrl2ForGlossaryTerm);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatuses/{page}", hiw.HealthInsuranceStatus.getAll);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatuses/Count", hiw.HealthInsuranceStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatuses/PageCount", hiw.HealthInsuranceStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatus/{id}", hiw.HealthInsuranceStatus.getByID);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatus, 1 /* POST */, "HealthInsuranceStatuses/Filter", hiw.HealthInsuranceStatus.filter);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 1 /* POST */, "HealthInsuranceStatuses/FilterCount", hiw.HealthInsuranceStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 1 /* POST */, "HealthInsuranceStatuses/FilterPageCount", hiw.HealthInsuranceStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/HealthInsuranceStatuses/{page}", hiw.HealthInsuranceStatus.getByParentHealthInsuranceStatusID);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/HealthInsuranceStatuses/Count", hiw.HealthInsuranceStatus.getByParentHealthInsuranceStatusIDCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/HealthInsuranceStatuses/PageCount", hiw.HealthInsuranceStatus.getByParentHealthInsuranceStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/ParentHealthInsuranceStatus", hiw.HealthInsuranceStatus.getParentHealthInsuranceStatusForHealthInsuranceStatus);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatusRelations/{page}", hiw.HealthInsuranceStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatusRelations/Count", hiw.HealthInsuranceStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatusRelations/PageCount", hiw.HealthInsuranceStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatusRelation/{id}", hiw.HealthInsuranceStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatusRelation, 1 /* POST */, "HealthInsuranceStatusRelations/Filter", hiw.HealthInsuranceStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 1 /* POST */, "HealthInsuranceStatusRelations/FilterCount", hiw.HealthInsuranceStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 1 /* POST */, "HealthInsuranceStatusRelations/FilterPageCount", hiw.HealthInsuranceStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Ancestors/{page}", hiw.HealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusID);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Ancestors/Count", hiw.HealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusIDCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Ancestors/PageCount", hiw.HealthInsuranceStatusRelation.getByAncestorHealthInsuranceStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatusRelation/{healthInsuranceStatusRelationID}/AncestorHealthInsuranceStatus", hiw.HealthInsuranceStatusRelation.getAncestorHealthInsuranceStatusForHealthInsuranceStatusRelation);
    hiw.Endpoint.addArray(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Descendants/{page}", hiw.HealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusID);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Descendants/Count", hiw.HealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusIDCount);
    hiw.Endpoint.addSimple(hiw.HealthInsuranceStatusRelation, 0 /* GET */, "/HealthInsuranceStatus/{healthInsuranceStatusID}/Descendants/PageCount", hiw.HealthInsuranceStatusRelation.getByDescendantHealthInsuranceStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.HealthInsuranceStatus, 0 /* GET */, "/HealthInsuranceStatusRelation/{healthInsuranceStatusRelationID}/DescendantHealthInsuranceStatus", hiw.HealthInsuranceStatusRelation.getDescendantHealthInsuranceStatusForHealthInsuranceStatusRelation);
    hiw.Endpoint.addArray(hiw.HP2020TSM, 0 /* GET */, "/HP2020TSMs/{page}", hiw.HP2020TSM.getAll);
    hiw.Endpoint.addSimple(hiw.HP2020TSM, 0 /* GET */, "/HP2020TSMs/Count", hiw.HP2020TSM.getAllCount);
    hiw.Endpoint.addSimple(hiw.HP2020TSM, 0 /* GET */, "/HP2020TSMs/PageCount", hiw.HP2020TSM.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.HP2020TSM, 0 /* GET */, "/HP2020TSM/{id}", hiw.HP2020TSM.getByID);
    hiw.Endpoint.addArray(hiw.HP2020TSM, 1 /* POST */, "HP2020TSMs/Filter", hiw.HP2020TSM.filter);
    hiw.Endpoint.addSimple(hiw.HP2020TSM, 1 /* POST */, "HP2020TSMs/FilterCount", hiw.HP2020TSM.filterCount);
    hiw.Endpoint.addSimple(hiw.HP2020TSM, 1 /* POST */, "HP2020TSMs/FilterPageCount", hiw.HP2020TSM.filterPageCount);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatuses/{page}", hiw.IncomeAndPovertyStatus.getAll);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatuses/Count", hiw.IncomeAndPovertyStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatuses/PageCount", hiw.IncomeAndPovertyStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatus/{id}", hiw.IncomeAndPovertyStatus.getByID);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatus, 1 /* POST */, "IncomeAndPovertyStatuses/Filter", hiw.IncomeAndPovertyStatus.filter);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 1 /* POST */, "IncomeAndPovertyStatuses/FilterCount", hiw.IncomeAndPovertyStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 1 /* POST */, "IncomeAndPovertyStatuses/FilterPageCount", hiw.IncomeAndPovertyStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/IncomeAndPovertyStatuses/{page}", hiw.IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusID);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/IncomeAndPovertyStatuses/Count", hiw.IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/IncomeAndPovertyStatuses/PageCount", hiw.IncomeAndPovertyStatus.getByParentIncomeAndPovertyStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/ParentIncomeAndPovertyStatus", hiw.IncomeAndPovertyStatus.getParentIncomeAndPovertyStatusForIncomeAndPovertyStatus);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatusRelations/{page}", hiw.IncomeAndPovertyStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatusRelations/Count", hiw.IncomeAndPovertyStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatusRelations/PageCount", hiw.IncomeAndPovertyStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatusRelation/{id}", hiw.IncomeAndPovertyStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatusRelation, 1 /* POST */, "IncomeAndPovertyStatusRelations/Filter", hiw.IncomeAndPovertyStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 1 /* POST */, "IncomeAndPovertyStatusRelations/FilterCount", hiw.IncomeAndPovertyStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 1 /* POST */, "IncomeAndPovertyStatusRelations/FilterPageCount", hiw.IncomeAndPovertyStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Ancestors/{page}", hiw.IncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusID);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Ancestors/Count", hiw.IncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusIDCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Ancestors/PageCount", hiw.IncomeAndPovertyStatusRelation.getByAncestorIncomeAndPovertyStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatusRelation/{incomeAndPovertyStatusRelationID}/AncestorIncomeAndPovertyStatus", hiw.IncomeAndPovertyStatusRelation.getAncestorIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation);
    hiw.Endpoint.addArray(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Descendants/{page}", hiw.IncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusID);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Descendants/Count", hiw.IncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusIDCount);
    hiw.Endpoint.addSimple(hiw.IncomeAndPovertyStatusRelation, 0 /* GET */, "/IncomeAndPovertyStatus/{incomeAndPovertyStatusID}/Descendants/PageCount", hiw.IncomeAndPovertyStatusRelation.getByDescendantIncomeAndPovertyStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.IncomeAndPovertyStatus, 0 /* GET */, "/IncomeAndPovertyStatusRelation/{incomeAndPovertyStatusRelationID}/DescendantIncomeAndPovertyStatus", hiw.IncomeAndPovertyStatusRelation.getDescendantIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescriptionDataCategories/{page}", hiw.IndicatorDescriptionDataCategory.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescriptionDataCategories/Count", hiw.IndicatorDescriptionDataCategory.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescriptionDataCategories/PageCount", hiw.IndicatorDescriptionDataCategory.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescriptionDataCategory/{id}", hiw.IndicatorDescriptionDataCategory.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataCategory, 1 /* POST */, "IndicatorDescriptionDataCategories/Filter", hiw.IndicatorDescriptionDataCategory.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 1 /* POST */, "IndicatorDescriptionDataCategories/FilterCount", hiw.IndicatorDescriptionDataCategory.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 1 /* POST */, "IndicatorDescriptionDataCategories/FilterPageCount", hiw.IndicatorDescriptionDataCategory.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataCategories/{page}", hiw.IndicatorDescriptionDataCategory.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataCategories/Count", hiw.IndicatorDescriptionDataCategory.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataCategories/PageCount", hiw.IndicatorDescriptionDataCategory.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDataCategory/{indicatorDescriptionDataCategoryID}/IndicatorDescription", hiw.IndicatorDescriptionDataCategory.getIndicatorDescriptionForIndicatorDescriptionDataCategory);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/IndicatorDescriptionDataCategories/{page}", hiw.IndicatorDescriptionDataCategory.getByDataCategoryID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/IndicatorDescriptionDataCategories/Count", hiw.IndicatorDescriptionDataCategory.getByDataCategoryIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataCategory, 0 /* GET */, "/DataCategory/{dataCategoryID}/IndicatorDescriptionDataCategories/PageCount", hiw.IndicatorDescriptionDataCategory.getByDataCategoryIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataCategory, 0 /* GET */, "/IndicatorDescriptionDataCategory/{indicatorDescriptionDataCategoryID}/DataCategory", hiw.IndicatorDescriptionDataCategory.getDataCategoryForIndicatorDescriptionDataCategory);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescriptionDataSources/{page}", hiw.IndicatorDescriptionDataSource.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescriptionDataSources/Count", hiw.IndicatorDescriptionDataSource.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescriptionDataSources/PageCount", hiw.IndicatorDescriptionDataSource.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescriptionDataSource/{id}", hiw.IndicatorDescriptionDataSource.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataSource, 1 /* POST */, "IndicatorDescriptionDataSources/Filter", hiw.IndicatorDescriptionDataSource.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 1 /* POST */, "IndicatorDescriptionDataSources/FilterCount", hiw.IndicatorDescriptionDataSource.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 1 /* POST */, "IndicatorDescriptionDataSources/FilterPageCount", hiw.IndicatorDescriptionDataSource.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataSources/{page}", hiw.IndicatorDescriptionDataSource.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataSources/Count", hiw.IndicatorDescriptionDataSource.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDataSources/PageCount", hiw.IndicatorDescriptionDataSource.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDataSource/{indicatorDescriptionDataSourceID}/IndicatorDescription", hiw.IndicatorDescriptionDataSource.getIndicatorDescriptionForIndicatorDescriptionDataSource);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/DataSource/{dataSourceID}/IndicatorDescriptionDataSources/{page}", hiw.IndicatorDescriptionDataSource.getByDataSourceID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/DataSource/{dataSourceID}/IndicatorDescriptionDataSources/Count", hiw.IndicatorDescriptionDataSource.getByDataSourceIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDataSource, 0 /* GET */, "/DataSource/{dataSourceID}/IndicatorDescriptionDataSources/PageCount", hiw.IndicatorDescriptionDataSource.getByDataSourceIDPageCount);
    hiw.Endpoint.addSingle(hiw.DataSource, 0 /* GET */, "/IndicatorDescriptionDataSource/{indicatorDescriptionDataSourceID}/DataSource", hiw.IndicatorDescriptionDataSource.getDataSourceForIndicatorDescriptionDataSource);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraphs/{page}", hiw.IndicatorDescriptionDefaultDimensionGraph.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraphs/Count", hiw.IndicatorDescriptionDefaultDimensionGraph.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraphs/PageCount", hiw.IndicatorDescriptionDefaultDimensionGraph.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraph/{id}", hiw.IndicatorDescriptionDefaultDimensionGraph.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDefaultDimensionGraph, 1 /* POST */, "IndicatorDescriptionDefaultDimensionGraphs/Filter", hiw.IndicatorDescriptionDefaultDimensionGraph.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 1 /* POST */, "IndicatorDescriptionDefaultDimensionGraphs/FilterCount", hiw.IndicatorDescriptionDefaultDimensionGraph.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 1 /* POST */, "IndicatorDescriptionDefaultDimensionGraphs/FilterPageCount", hiw.IndicatorDescriptionDefaultDimensionGraph.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDefaultDimensionGraphs/{page}", hiw.IndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDefaultDimensionGraphs/Count", hiw.IndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDefaultDimensionGraphs/PageCount", hiw.IndicatorDescriptionDefaultDimensionGraph.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraph/{indicatorDescriptionDefaultDimensionGraphID}/IndicatorDescription", hiw.IndicatorDescriptionDefaultDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDefaultDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDefaultDimensionGraphs/{page}", hiw.IndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDefaultDimensionGraphs/Count", hiw.IndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDefaultDimensionGraphs/PageCount", hiw.IndicatorDescriptionDefaultDimensionGraph.getByLocaleLevelIDPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraph/{indicatorDescriptionDefaultDimensionGraphID}/LocaleLevel", hiw.IndicatorDescriptionDefaultDimensionGraph.getLocaleLevelForIndicatorDescriptionDefaultDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDefaultDimensionGraphs/{page}", hiw.IndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDefaultDimensionGraphs/Count", hiw.IndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDefaultDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDefaultDimensionGraphs/PageCount", hiw.IndicatorDescriptionDefaultDimensionGraph.getByDimensionGraphIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionGraph, 0 /* GET */, "/IndicatorDescriptionDefaultDimensionGraph/{indicatorDescriptionDefaultDimensionGraphID}/DimensionGraph", hiw.IndicatorDescriptionDefaultDimensionGraph.getDimensionGraphForIndicatorDescriptionDefaultDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescriptionDimensions/{page}", hiw.IndicatorDescriptionDimension.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescriptionDimensions/Count", hiw.IndicatorDescriptionDimension.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescriptionDimensions/PageCount", hiw.IndicatorDescriptionDimension.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescriptionDimension/{id}", hiw.IndicatorDescriptionDimension.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimension, 1 /* POST */, "IndicatorDescriptionDimensions/Filter", hiw.IndicatorDescriptionDimension.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 1 /* POST */, "IndicatorDescriptionDimensions/FilterCount", hiw.IndicatorDescriptionDimension.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 1 /* POST */, "IndicatorDescriptionDimensions/FilterPageCount", hiw.IndicatorDescriptionDimension.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensions/{page}", hiw.IndicatorDescriptionDimension.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensions/Count", hiw.IndicatorDescriptionDimension.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensions/PageCount", hiw.IndicatorDescriptionDimension.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDimension/{indicatorDescriptionDimensionID}/IndicatorDescription", hiw.IndicatorDescriptionDimension.getIndicatorDescriptionForIndicatorDescriptionDimension);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/DimensionList/{dimensionListID}/IndicatorDescriptionDimensions/{page}", hiw.IndicatorDescriptionDimension.getByDimensionListID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/DimensionList/{dimensionListID}/IndicatorDescriptionDimensions/Count", hiw.IndicatorDescriptionDimension.getByDimensionListIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/DimensionList/{dimensionListID}/IndicatorDescriptionDimensions/PageCount", hiw.IndicatorDescriptionDimension.getByDimensionListIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionList, 0 /* GET */, "/IndicatorDescriptionDimension/{indicatorDescriptionDimensionID}/DimensionList", hiw.IndicatorDescriptionDimension.getDimensionListForIndicatorDescriptionDimension);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDimension, 0 /* GET */, "/IndicatorDescriptionDimension?IndicatorDescriptionID={indicatorDescriptionID}&DimensionListID={dimensionListID}", hiw.IndicatorDescriptionDimension.getByIndicatorDescriptionIDAndDimensionListID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDimensionGraphs/{page}", hiw.IndicatorDescriptionDimensionGraph.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDimensionGraphs/Count", hiw.IndicatorDescriptionDimensionGraph.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDimensionGraphs/PageCount", hiw.IndicatorDescriptionDimensionGraph.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescriptionDimensionGraph/{id}", hiw.IndicatorDescriptionDimensionGraph.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionGraph, 1 /* POST */, "IndicatorDescriptionDimensionGraphs/Filter", hiw.IndicatorDescriptionDimensionGraph.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 1 /* POST */, "IndicatorDescriptionDimensionGraphs/FilterCount", hiw.IndicatorDescriptionDimensionGraph.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 1 /* POST */, "IndicatorDescriptionDimensionGraphs/FilterPageCount", hiw.IndicatorDescriptionDimensionGraph.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionGraphs/{page}", hiw.IndicatorDescriptionDimensionGraph.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionGraphs/Count", hiw.IndicatorDescriptionDimensionGraph.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionGraphs/PageCount", hiw.IndicatorDescriptionDimensionGraph.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDimensionGraph/{indicatorDescriptionDimensionGraphID}/IndicatorDescription", hiw.IndicatorDescriptionDimensionGraph.getIndicatorDescriptionForIndicatorDescriptionDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDimensionGraphs/{page}", hiw.IndicatorDescriptionDimensionGraph.getByLocaleLevelID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDimensionGraphs/Count", hiw.IndicatorDescriptionDimensionGraph.getByLocaleLevelIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionDimensionGraphs/PageCount", hiw.IndicatorDescriptionDimensionGraph.getByLocaleLevelIDPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/IndicatorDescriptionDimensionGraph/{indicatorDescriptionDimensionGraphID}/LocaleLevel", hiw.IndicatorDescriptionDimensionGraph.getLocaleLevelForIndicatorDescriptionDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDimensionGraphs/{page}", hiw.IndicatorDescriptionDimensionGraph.getByDimensionGraphID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDimensionGraphs/Count", hiw.IndicatorDescriptionDimensionGraph.getByDimensionGraphIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDescriptionDimensionGraphs/PageCount", hiw.IndicatorDescriptionDimensionGraph.getByDimensionGraphIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionGraph, 0 /* GET */, "/IndicatorDescriptionDimensionGraph/{indicatorDescriptionDimensionGraphID}/DimensionGraph", hiw.IndicatorDescriptionDimensionGraph.getDimensionGraphForIndicatorDescriptionDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescriptionDimensionValues/{page}", hiw.IndicatorDescriptionDimensionValue.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescriptionDimensionValues/Count", hiw.IndicatorDescriptionDimensionValue.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescriptionDimensionValues/PageCount", hiw.IndicatorDescriptionDimensionValue.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescriptionDimensionValue/{id}", hiw.IndicatorDescriptionDimensionValue.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionValue, 1 /* POST */, "IndicatorDescriptionDimensionValues/Filter", hiw.IndicatorDescriptionDimensionValue.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 1 /* POST */, "IndicatorDescriptionDimensionValues/FilterCount", hiw.IndicatorDescriptionDimensionValue.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 1 /* POST */, "IndicatorDescriptionDimensionValues/FilterPageCount", hiw.IndicatorDescriptionDimensionValue.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionValues/{page}", hiw.IndicatorDescriptionDimensionValue.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionValues/Count", hiw.IndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionDimensionValues/PageCount", hiw.IndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionDimensionValue/{indicatorDescriptionDimensionValueID}/IndicatorDescription", hiw.IndicatorDescriptionDimensionValue.getIndicatorDescriptionForIndicatorDescriptionDimensionValue);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDescriptionDimensionValues/{page}", hiw.IndicatorDescriptionDimensionValue.getByDimensionBookID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDescriptionDimensionValues/Count", hiw.IndicatorDescriptionDimensionValue.getByDimensionBookIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDescriptionDimensionValues/PageCount", hiw.IndicatorDescriptionDimensionValue.getByDimensionBookIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/IndicatorDescriptionDimensionValue/{indicatorDescriptionDimensionValueID}/DimensionBook", hiw.IndicatorDescriptionDimensionValue.getDimensionBookForIndicatorDescriptionDimensionValue);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionDimensionValue, 0 /* GET */, "/IndicatorDescriptionDimensionValue?IndicatorDescriptionID={indicatorDescriptionID}&DimensionBookID={dimensionBookID}", hiw.IndicatorDescriptionDimensionValue.getByIndicatorDescriptionIDAndDimensionBookID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescriptionInitiatives/{page}", hiw.IndicatorDescriptionInitiative.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescriptionInitiatives/Count", hiw.IndicatorDescriptionInitiative.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescriptionInitiatives/PageCount", hiw.IndicatorDescriptionInitiative.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescriptionInitiative/{id}", hiw.IndicatorDescriptionInitiative.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionInitiative, 1 /* POST */, "IndicatorDescriptionInitiatives/Filter", hiw.IndicatorDescriptionInitiative.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 1 /* POST */, "IndicatorDescriptionInitiatives/FilterCount", hiw.IndicatorDescriptionInitiative.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 1 /* POST */, "IndicatorDescriptionInitiatives/FilterPageCount", hiw.IndicatorDescriptionInitiative.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInitiatives/{page}", hiw.IndicatorDescriptionInitiative.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInitiatives/Count", hiw.IndicatorDescriptionInitiative.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInitiatives/PageCount", hiw.IndicatorDescriptionInitiative.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionInitiative/{indicatorDescriptionInitiativeID}/IndicatorDescription", hiw.IndicatorDescriptionInitiative.getIndicatorDescriptionForIndicatorDescriptionInitiative);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/Initiative/{initiativeID}/IndicatorDescriptionInitiatives/{page}", hiw.IndicatorDescriptionInitiative.getByInitiativeID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/Initiative/{initiativeID}/IndicatorDescriptionInitiatives/Count", hiw.IndicatorDescriptionInitiative.getByInitiativeIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionInitiative, 0 /* GET */, "/Initiative/{initiativeID}/IndicatorDescriptionInitiatives/PageCount", hiw.IndicatorDescriptionInitiative.getByInitiativeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Initiative, 0 /* GET */, "/IndicatorDescriptionInitiative/{indicatorDescriptionInitiativeID}/Initiative", hiw.IndicatorDescriptionInitiative.getInitiativeForIndicatorDescriptionInitiative);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescriptionInterventions/{page}", hiw.IndicatorDescriptionIntervention.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescriptionInterventions/Count", hiw.IndicatorDescriptionIntervention.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescriptionInterventions/PageCount", hiw.IndicatorDescriptionIntervention.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescriptionIntervention/{id}", hiw.IndicatorDescriptionIntervention.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionIntervention, 1 /* POST */, "IndicatorDescriptionInterventions/Filter", hiw.IndicatorDescriptionIntervention.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 1 /* POST */, "IndicatorDescriptionInterventions/FilterCount", hiw.IndicatorDescriptionIntervention.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 1 /* POST */, "IndicatorDescriptionInterventions/FilterPageCount", hiw.IndicatorDescriptionIntervention.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInterventions/{page}", hiw.IndicatorDescriptionIntervention.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInterventions/Count", hiw.IndicatorDescriptionIntervention.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionInterventions/PageCount", hiw.IndicatorDescriptionIntervention.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionIntervention/{indicatorDescriptionInterventionID}/IndicatorDescription", hiw.IndicatorDescriptionIntervention.getIndicatorDescriptionForIndicatorDescriptionIntervention);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/Intervention/{interventionID}/IndicatorDescriptionInterventions/{page}", hiw.IndicatorDescriptionIntervention.getByInterventionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/Intervention/{interventionID}/IndicatorDescriptionInterventions/Count", hiw.IndicatorDescriptionIntervention.getByInterventionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionIntervention, 0 /* GET */, "/Intervention/{interventionID}/IndicatorDescriptionInterventions/PageCount", hiw.IndicatorDescriptionIntervention.getByInterventionIDPageCount);
    hiw.Endpoint.addSingle(hiw.Intervention, 0 /* GET */, "/IndicatorDescriptionIntervention/{indicatorDescriptionInterventionID}/Interventions", hiw.IndicatorDescriptionIntervention.getInterventionsForIndicatorDescriptionIntervention);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescriptionKeywords/{page}", hiw.IndicatorDescriptionKeyword.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescriptionKeywords/Count", hiw.IndicatorDescriptionKeyword.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescriptionKeywords/PageCount", hiw.IndicatorDescriptionKeyword.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescriptionKeyword/{id}", hiw.IndicatorDescriptionKeyword.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionKeyword, 1 /* POST */, "IndicatorDescriptionKeywords/Filter", hiw.IndicatorDescriptionKeyword.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 1 /* POST */, "IndicatorDescriptionKeywords/FilterCount", hiw.IndicatorDescriptionKeyword.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 1 /* POST */, "IndicatorDescriptionKeywords/FilterPageCount", hiw.IndicatorDescriptionKeyword.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionKeywords/{page}", hiw.IndicatorDescriptionKeyword.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionKeywords/Count", hiw.IndicatorDescriptionKeyword.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionKeywords/PageCount", hiw.IndicatorDescriptionKeyword.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionKeyword/{indicatorDescriptionKeywordID}/IndicatorDescription", hiw.IndicatorDescriptionKeyword.getIndicatorDescriptionForIndicatorDescriptionKeyword);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/Keyword/{keywordID}/IndicatorDescriptionKeywords/{page}", hiw.IndicatorDescriptionKeyword.getByKeywordID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/Keyword/{keywordID}/IndicatorDescriptionKeywords/Count", hiw.IndicatorDescriptionKeyword.getByKeywordIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/Keyword/{keywordID}/IndicatorDescriptionKeywords/PageCount", hiw.IndicatorDescriptionKeyword.getByKeywordIDPageCount);
    hiw.Endpoint.addSingle(hiw.Keyword, 0 /* GET */, "/IndicatorDescriptionKeyword/{indicatorDescriptionKeywordID}/Keyword", hiw.IndicatorDescriptionKeyword.getKeywordForIndicatorDescriptionKeyword);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionKeyword, 0 /* GET */, "/IndicatorDescriptionKeyword?IndicatorDescriptionID={indicatorDescriptionID}&KeywordID={keywordID}", hiw.IndicatorDescriptionKeyword.getByIndicatorDescriptionIDAndKeywordID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescriptionLocaleCounties/{page}", hiw.IndicatorDescriptionLocaleCounty.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescriptionLocaleCounties/Count", hiw.IndicatorDescriptionLocaleCounty.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescriptionLocaleCounties/PageCount", hiw.IndicatorDescriptionLocaleCounty.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescriptionLocaleCounty/{id}", hiw.IndicatorDescriptionLocaleCounty.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleCounty, 1 /* POST */, "IndicatorDescriptionLocaleCounties/Filter", hiw.IndicatorDescriptionLocaleCounty.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 1 /* POST */, "IndicatorDescriptionLocaleCounties/FilterCount", hiw.IndicatorDescriptionLocaleCounty.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 1 /* POST */, "IndicatorDescriptionLocaleCounties/FilterPageCount", hiw.IndicatorDescriptionLocaleCounty.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleCounties/{page}", hiw.IndicatorDescriptionLocaleCounty.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleCounties/Count", hiw.IndicatorDescriptionLocaleCounty.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleCounties/PageCount", hiw.IndicatorDescriptionLocaleCounty.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionLocaleCounty/{indicatorDescriptionLocaleCountyID}/IndicatorDescription", hiw.IndicatorDescriptionLocaleCounty.getIndicatorDescriptionForIndicatorDescriptionLocaleCounty);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleCounties/{page}", hiw.IndicatorDescriptionLocaleCounty.getByLocaleID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleCounties/Count", hiw.IndicatorDescriptionLocaleCounty.getByLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleCounty, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleCounties/PageCount", hiw.IndicatorDescriptionLocaleCounty.getByLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/IndicatorDescriptionLocaleCounty/{indicatorDescriptionLocaleCountyID}/Locale", hiw.IndicatorDescriptionLocaleCounty.getLocaleForIndicatorDescriptionLocaleCounty);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegions/{page}", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegions/Count", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegions/PageCount", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegion/{id}", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 1 /* POST */, "IndicatorDescriptionLocaleHospitalReferralRegions/Filter", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 1 /* POST */, "IndicatorDescriptionLocaleHospitalReferralRegions/FilterCount", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 1 /* POST */, "IndicatorDescriptionLocaleHospitalReferralRegions/FilterPageCount", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleHospitalReferralRegions/{page}", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleHospitalReferralRegions/Count", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleHospitalReferralRegions/PageCount", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegion/{indicatorDescriptionLocaleHospitalReferralRegionID}/IndicatorDescription", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getIndicatorDescriptionForIndicatorDescriptionLocaleHospitalReferralRegion);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleHospitalReferralRegions/{page}", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleHospitalReferralRegions/Count", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleHospitalReferralRegion, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleHospitalReferralRegions/PageCount", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getByLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/IndicatorDescriptionLocaleHospitalReferralRegion/{indicatorDescriptionLocaleHospitalReferralRegionID}/Locale", hiw.IndicatorDescriptionLocaleHospitalReferralRegion.getLocaleForIndicatorDescriptionLocaleHospitalReferralRegion);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescriptionLocaleLevels/{page}", hiw.IndicatorDescriptionLocaleLevel.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescriptionLocaleLevels/Count", hiw.IndicatorDescriptionLocaleLevel.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescriptionLocaleLevels/PageCount", hiw.IndicatorDescriptionLocaleLevel.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescriptionLocaleLevel/{id}", hiw.IndicatorDescriptionLocaleLevel.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleLevel, 1 /* POST */, "IndicatorDescriptionLocaleLevels/Filter", hiw.IndicatorDescriptionLocaleLevel.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 1 /* POST */, "IndicatorDescriptionLocaleLevels/FilterCount", hiw.IndicatorDescriptionLocaleLevel.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 1 /* POST */, "IndicatorDescriptionLocaleLevels/FilterPageCount", hiw.IndicatorDescriptionLocaleLevel.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleLevels/{page}", hiw.IndicatorDescriptionLocaleLevel.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleLevels/Count", hiw.IndicatorDescriptionLocaleLevel.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleLevels/PageCount", hiw.IndicatorDescriptionLocaleLevel.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionLocaleLevel/{indicatorDescriptionLocaleLevelID}/IndicatorDescription", hiw.IndicatorDescriptionLocaleLevel.getIndicatorDescriptionForIndicatorDescriptionLocaleLevel);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionLocaleLevels/{page}", hiw.IndicatorDescriptionLocaleLevel.getByLocaleLevelID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionLocaleLevels/Count", hiw.IndicatorDescriptionLocaleLevel.getByLocaleLevelIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleLevel, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDescriptionLocaleLevels/PageCount", hiw.IndicatorDescriptionLocaleLevel.getByLocaleLevelIDPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/IndicatorDescriptionLocaleLevel/{indicatorDescriptionLocaleLevelID}/LocaleLevel", hiw.IndicatorDescriptionLocaleLevel.getLocaleLevelForIndicatorDescriptionLocaleLevel);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescriptionLocales/{page}", hiw.IndicatorDescriptionLocale.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescriptionLocales/Count", hiw.IndicatorDescriptionLocale.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescriptionLocales/PageCount", hiw.IndicatorDescriptionLocale.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescriptionLocale/{id}", hiw.IndicatorDescriptionLocale.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocale, 1 /* POST */, "IndicatorDescriptionLocales/Filter", hiw.IndicatorDescriptionLocale.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 1 /* POST */, "IndicatorDescriptionLocales/FilterCount", hiw.IndicatorDescriptionLocale.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 1 /* POST */, "IndicatorDescriptionLocales/FilterPageCount", hiw.IndicatorDescriptionLocale.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocales/{page}", hiw.IndicatorDescriptionLocale.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocales/Count", hiw.IndicatorDescriptionLocale.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocales/PageCount", hiw.IndicatorDescriptionLocale.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionLocale/{indicatorDescriptionLocaleID}/IndicatorDescription", hiw.IndicatorDescriptionLocale.getIndicatorDescriptionForIndicatorDescriptionLocale);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocales/{page}", hiw.IndicatorDescriptionLocale.getByLocaleID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocales/Count", hiw.IndicatorDescriptionLocale.getByLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocale, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocales/PageCount", hiw.IndicatorDescriptionLocale.getByLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/IndicatorDescriptionLocale/{indicatorDescriptionLocaleID}/Locale", hiw.IndicatorDescriptionLocale.getLocaleForIndicatorDescriptionLocale);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescriptionLocaleStates/{page}", hiw.IndicatorDescriptionLocaleState.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescriptionLocaleStates/Count", hiw.IndicatorDescriptionLocaleState.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescriptionLocaleStates/PageCount", hiw.IndicatorDescriptionLocaleState.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescriptionLocaleState/{id}", hiw.IndicatorDescriptionLocaleState.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleState, 1 /* POST */, "IndicatorDescriptionLocaleStates/Filter", hiw.IndicatorDescriptionLocaleState.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 1 /* POST */, "IndicatorDescriptionLocaleStates/FilterCount", hiw.IndicatorDescriptionLocaleState.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 1 /* POST */, "IndicatorDescriptionLocaleStates/FilterPageCount", hiw.IndicatorDescriptionLocaleState.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleStates/{page}", hiw.IndicatorDescriptionLocaleState.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleStates/Count", hiw.IndicatorDescriptionLocaleState.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionLocaleStates/PageCount", hiw.IndicatorDescriptionLocaleState.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionLocaleState/{indicatorDescriptionLocaleStateID}/IndicatorDescription", hiw.IndicatorDescriptionLocaleState.getIndicatorDescriptionForIndicatorDescriptionLocaleState);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleStates/{page}", hiw.IndicatorDescriptionLocaleState.getByLocaleID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleStates/Count", hiw.IndicatorDescriptionLocaleState.getByLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionLocaleState, 0 /* GET */, "/Locale/{localeID}/IndicatorDescriptionLocaleStates/PageCount", hiw.IndicatorDescriptionLocaleState.getByLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/IndicatorDescriptionLocaleState/{indicatorDescriptionLocaleStateID}/Locale", hiw.IndicatorDescriptionLocaleState.getLocaleForIndicatorDescriptionLocaleState);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescriptionMethodologyNotes/{page}", hiw.IndicatorDescriptionMethodologyNote.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescriptionMethodologyNotes/Count", hiw.IndicatorDescriptionMethodologyNote.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescriptionMethodologyNotes/PageCount", hiw.IndicatorDescriptionMethodologyNote.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescriptionMethodologyNote/{id}", hiw.IndicatorDescriptionMethodologyNote.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMethodologyNote, 1 /* POST */, "IndicatorDescriptionMethodologyNotes/Filter", hiw.IndicatorDescriptionMethodologyNote.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 1 /* POST */, "IndicatorDescriptionMethodologyNotes/FilterCount", hiw.IndicatorDescriptionMethodologyNote.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 1 /* POST */, "IndicatorDescriptionMethodologyNotes/FilterPageCount", hiw.IndicatorDescriptionMethodologyNote.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMethodologyNotes/{page}", hiw.IndicatorDescriptionMethodologyNote.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMethodologyNotes/Count", hiw.IndicatorDescriptionMethodologyNote.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMethodologyNote, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMethodologyNotes/PageCount", hiw.IndicatorDescriptionMethodologyNote.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionMethodologyNote/{indicatorDescriptionMethodologyNoteID}/IndicatorDescription", hiw.IndicatorDescriptionMethodologyNote.getIndicatorDescriptionForIndicatorDescriptionMethodologyNote);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescriptionMoreInfos/{page}", hiw.IndicatorDescriptionMoreInfo.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescriptionMoreInfos/Count", hiw.IndicatorDescriptionMoreInfo.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescriptionMoreInfos/PageCount", hiw.IndicatorDescriptionMoreInfo.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescriptionMoreInfo/{id}", hiw.IndicatorDescriptionMoreInfo.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMoreInfo, 1 /* POST */, "IndicatorDescriptionMoreInfos/Filter", hiw.IndicatorDescriptionMoreInfo.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 1 /* POST */, "IndicatorDescriptionMoreInfos/FilterCount", hiw.IndicatorDescriptionMoreInfo.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 1 /* POST */, "IndicatorDescriptionMoreInfos/FilterPageCount", hiw.IndicatorDescriptionMoreInfo.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMoreInfos/{page}", hiw.IndicatorDescriptionMoreInfo.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMoreInfos/Count", hiw.IndicatorDescriptionMoreInfo.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionMoreInfos/PageCount", hiw.IndicatorDescriptionMoreInfo.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionMoreInfo/{indicatorDescriptionMoreInfoID}/IndicatorDescription", hiw.IndicatorDescriptionMoreInfo.getIndicatorDescriptionForIndicatorDescriptionMoreInfo);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionMoreInfoes/{page}", hiw.IndicatorDescriptionMoreInfo.getByUrlID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionMoreInfoes/Count", hiw.IndicatorDescriptionMoreInfo.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionMoreInfo, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionMoreInfoes/PageCount", hiw.IndicatorDescriptionMoreInfo.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/IndicatorDescriptionMoreInfo/{indicatorDescriptionMoreInfoID}/Url", hiw.IndicatorDescriptionMoreInfo.getUrlForIndicatorDescriptionMoreInfo);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescriptionReferences/{page}", hiw.IndicatorDescriptionReference.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescriptionReferences/Count", hiw.IndicatorDescriptionReference.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescriptionReferences/PageCount", hiw.IndicatorDescriptionReference.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescriptionReference/{id}", hiw.IndicatorDescriptionReference.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionReference, 1 /* POST */, "IndicatorDescriptionReferences/Filter", hiw.IndicatorDescriptionReference.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 1 /* POST */, "IndicatorDescriptionReferences/FilterCount", hiw.IndicatorDescriptionReference.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 1 /* POST */, "IndicatorDescriptionReferences/FilterPageCount", hiw.IndicatorDescriptionReference.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionReferences/{page}", hiw.IndicatorDescriptionReference.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionReferences/Count", hiw.IndicatorDescriptionReference.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionReferences/PageCount", hiw.IndicatorDescriptionReference.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionReference/{indicatorDescriptionReferenceID}/IndicatorDescription", hiw.IndicatorDescriptionReference.getIndicatorDescriptionForIndicatorDescriptionReference);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionReference, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionReferences/{page}", hiw.IndicatorDescriptionReference.getByUrlID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionReferences/Count", hiw.IndicatorDescriptionReference.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionReference, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionReferences/PageCount", hiw.IndicatorDescriptionReference.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/IndicatorDescriptionReference/{indicatorDescriptionReferenceID}/Url", hiw.IndicatorDescriptionReference.getUrlForIndicatorDescriptionReference);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescriptionResources/{page}", hiw.IndicatorDescriptionResource.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescriptionResources/Count", hiw.IndicatorDescriptionResource.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescriptionResources/PageCount", hiw.IndicatorDescriptionResource.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescriptionResource/{id}", hiw.IndicatorDescriptionResource.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionResource, 1 /* POST */, "IndicatorDescriptionResources/Filter", hiw.IndicatorDescriptionResource.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 1 /* POST */, "IndicatorDescriptionResources/FilterCount", hiw.IndicatorDescriptionResource.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 1 /* POST */, "IndicatorDescriptionResources/FilterPageCount", hiw.IndicatorDescriptionResource.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionResources/{page}", hiw.IndicatorDescriptionResource.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionResources/Count", hiw.IndicatorDescriptionResource.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionResources/PageCount", hiw.IndicatorDescriptionResource.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionResource/{indicatorDescriptionResourceID}/IndicatorDescription", hiw.IndicatorDescriptionResource.getIndicatorDescriptionForIndicatorDescriptionResource);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionResource, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionResources/{page}", hiw.IndicatorDescriptionResource.getByUrlID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionResources/Count", hiw.IndicatorDescriptionResource.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionResource, 0 /* GET */, "/Url/{urlID}/IndicatorDescriptionResources/PageCount", hiw.IndicatorDescriptionResource.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/IndicatorDescriptionResource/{indicatorDescriptionResourceID}/Url", hiw.IndicatorDescriptionResource.getUrlForIndicatorDescriptionResource);
    hiw.Endpoint.addArray(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/{page}", hiw.IndicatorDescription.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/Count", hiw.IndicatorDescription.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptions/PageCount", hiw.IndicatorDescription.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescription/{id}", hiw.IndicatorDescription.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescription, 1 /* POST */, "IndicatorDescriptions/Filter", hiw.IndicatorDescription.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 1 /* POST */, "IndicatorDescriptions/FilterCount", hiw.IndicatorDescription.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 1 /* POST */, "IndicatorDescriptions/FilterPageCount", hiw.IndicatorDescription.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescription, 0 /* GET */, "/ValueLabel/{valueLabelID}/IndicatorDescriptions/{page}", hiw.IndicatorDescription.getByValueLabelID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/ValueLabel/{valueLabelID}/IndicatorDescriptions/Count", hiw.IndicatorDescription.getByValueLabelIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescription, 0 /* GET */, "/ValueLabel/{valueLabelID}/IndicatorDescriptions/PageCount", hiw.IndicatorDescription.getByValueLabelIDPageCount);
    hiw.Endpoint.addSingle(hiw.ValueLabel, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/ValueLabel", hiw.IndicatorDescription.getValueLabelForIndicatorDescription);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescriptionHP2020s/{page}", hiw.IndicatorDescriptionHP2020.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescriptionHP2020s/Count", hiw.IndicatorDescriptionHP2020.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescriptionHP2020s/PageCount", hiw.IndicatorDescriptionHP2020.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescriptionHP2020/{id}", hiw.IndicatorDescriptionHP2020.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionHP2020, 1 /* POST */, "IndicatorDescriptionHP2020s/Filter", hiw.IndicatorDescriptionHP2020.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 1 /* POST */, "IndicatorDescriptionHP2020s/FilterCount", hiw.IndicatorDescriptionHP2020.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 1 /* POST */, "IndicatorDescriptionHP2020s/FilterPageCount", hiw.IndicatorDescriptionHP2020.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionsHP2020s/{page}", hiw.IndicatorDescriptionHP2020.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionsHP2020s/Count", hiw.IndicatorDescriptionHP2020.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionsHP2020s/PageCount", hiw.IndicatorDescriptionHP2020.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionHP2020/{indicatorDescriptionHP2020ID}/IndicatorDescription", hiw.IndicatorDescriptionHP2020.getIndicatorDescriptionForIndicatorDescriptionHP2020);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/HP2020TSM/{hP2020TSMID}/IndicatorDescriptionsHP2020s/{page}", hiw.IndicatorDescriptionHP2020.getByHP2020TSMID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/HP2020TSM/{hP2020TSMID}/IndicatorDescriptionsHP2020s/Count", hiw.IndicatorDescriptionHP2020.getByHP2020TSMIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionHP2020, 0 /* GET */, "/HP2020TSM/{hP2020TSMID}/IndicatorDescriptionsHP2020s/PageCount", hiw.IndicatorDescriptionHP2020.getByHP2020TSMIDPageCount);
    hiw.Endpoint.addSingle(hiw.HP2020TSM, 0 /* GET */, "/IndicatorDescriptionHP2020/{indicatorDescriptionHP2020ID}/HP2020TSM", hiw.IndicatorDescriptionHP2020.getHP2020TSMForIndicatorDescriptionHP2020);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescriptionTimeFrames/{page}", hiw.IndicatorDescriptionTimeFrame.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescriptionTimeFrames/Count", hiw.IndicatorDescriptionTimeFrame.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescriptionTimeFrames/PageCount", hiw.IndicatorDescriptionTimeFrame.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescriptionTimeFrame/{id}", hiw.IndicatorDescriptionTimeFrame.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionTimeFrame, 1 /* POST */, "IndicatorDescriptionTimeFrames/Filter", hiw.IndicatorDescriptionTimeFrame.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 1 /* POST */, "IndicatorDescriptionTimeFrames/FilterCount", hiw.IndicatorDescriptionTimeFrame.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 1 /* POST */, "IndicatorDescriptionTimeFrames/FilterPageCount", hiw.IndicatorDescriptionTimeFrame.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionTimeFrames/{page}", hiw.IndicatorDescriptionTimeFrame.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionTimeFrames/Count", hiw.IndicatorDescriptionTimeFrame.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionTimeFrames/PageCount", hiw.IndicatorDescriptionTimeFrame.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionTimeFrame/{indicatorDescriptionTimeFrameID}/IndicatorDescription", hiw.IndicatorDescriptionTimeFrame.getIndicatorDescriptionForIndicatorDescriptionTimeFrame);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/Timeframe/{timeframeID}/IndicatorDescriptionTimeFrames/{page}", hiw.IndicatorDescriptionTimeFrame.getByTimeframeID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/Timeframe/{timeframeID}/IndicatorDescriptionTimeFrames/Count", hiw.IndicatorDescriptionTimeFrame.getByTimeframeIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionTimeFrame, 0 /* GET */, "/Timeframe/{timeframeID}/IndicatorDescriptionTimeFrames/PageCount", hiw.IndicatorDescriptionTimeFrame.getByTimeframeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Timeframe, 0 /* GET */, "/IndicatorDescriptionTimeFrame/{indicatorDescriptionTimeFrameID}/Timeframe", hiw.IndicatorDescriptionTimeFrame.getTimeframeForIndicatorDescriptionTimeFrame);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescriptionYears/{page}", hiw.IndicatorDescriptionYear.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescriptionYears/Count", hiw.IndicatorDescriptionYear.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescriptionYears/PageCount", hiw.IndicatorDescriptionYear.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescriptionYear/{id}", hiw.IndicatorDescriptionYear.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionYear, 1 /* POST */, "IndicatorDescriptionYears/Filter", hiw.IndicatorDescriptionYear.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 1 /* POST */, "IndicatorDescriptionYears/FilterCount", hiw.IndicatorDescriptionYear.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 1 /* POST */, "IndicatorDescriptionYears/FilterPageCount", hiw.IndicatorDescriptionYear.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionYears/{page}", hiw.IndicatorDescriptionYear.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionYears/Count", hiw.IndicatorDescriptionYear.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDescriptionYears/PageCount", hiw.IndicatorDescriptionYear.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDescriptionYear/{indicatorDescriptionYearID}/IndicatorDescription", hiw.IndicatorDescriptionYear.getIndicatorDescriptionForIndicatorDescriptionYear);
    hiw.Endpoint.addArray(hiw.IndicatorDescriptionYear, 0 /* GET */, "/Year/{yearID}/IndicatorDescriptionYears/{page}", hiw.IndicatorDescriptionYear.getByYearID);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/Year/{yearID}/IndicatorDescriptionYears/Count", hiw.IndicatorDescriptionYear.getByYearIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDescriptionYear, 0 /* GET */, "/Year/{yearID}/IndicatorDescriptionYears/PageCount", hiw.IndicatorDescriptionYear.getByYearIDPageCount);
    hiw.Endpoint.addSingle(hiw.Year, 0 /* GET */, "/IndicatorDescriptionYear/{indicatorDescriptionYearID}/Year", hiw.IndicatorDescriptionYear.getYearForIndicatorDescriptionYear);
    hiw.Endpoint.addSingle(hiw.IndicatorDescriptionYear, 0 /* GET */, "/IndicatorDescriptionYear?IndicatorDescriptionID={indicatorDescriptionID}&YearID={yearID}", hiw.IndicatorDescriptionYear.getByIndicatorDescriptionIDAndYearID);
    hiw.Endpoint.addArray(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDimensionGraphs/{page}", hiw.IndicatorDimensionGraph.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDimensionGraphs/Count", hiw.IndicatorDimensionGraph.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDimensionGraphs/PageCount", hiw.IndicatorDimensionGraph.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDimensionGraph/{id}", hiw.IndicatorDimensionGraph.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDimensionGraph, 1 /* POST */, "IndicatorDimensionGraphs/Filter", hiw.IndicatorDimensionGraph.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 1 /* POST */, "IndicatorDimensionGraphs/FilterCount", hiw.IndicatorDimensionGraph.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 1 /* POST */, "IndicatorDimensionGraphs/FilterPageCount", hiw.IndicatorDimensionGraph.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDimensionGraphs/{page}", hiw.IndicatorDimensionGraph.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDimensionGraphs/Count", hiw.IndicatorDimensionGraph.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/IndicatorDimensionGraphs/PageCount", hiw.IndicatorDimensionGraph.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/IndicatorDimensionGraph/{indicatorDimensionGraphID}/IndicatorDescription", hiw.IndicatorDimensionGraph.getIndicatorDescriptionForIndicatorDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDimensionGraphs/{page}", hiw.IndicatorDimensionGraph.getByLocaleLevelID);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDimensionGraphs/Count", hiw.IndicatorDimensionGraph.getByLocaleLevelIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/LocaleLevel/{localeLevelID}/IndicatorDimensionGraphs/PageCount", hiw.IndicatorDimensionGraph.getByLocaleLevelIDPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/IndicatorDimensionGraph/{indicatorDimensionGraphID}/LocaleLevel", hiw.IndicatorDimensionGraph.getLocaleLevelForIndicatorDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDimensionGraphs/{page}", hiw.IndicatorDimensionGraph.getByDimensionGraphID);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDimensionGraphs/Count", hiw.IndicatorDimensionGraph.getByDimensionGraphIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimensionGraph, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/IndicatorDimensionGraphs/PageCount", hiw.IndicatorDimensionGraph.getByDimensionGraphIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionGraph, 0 /* GET */, "/IndicatorDimensionGraph/{indicatorDimensionGraphID}/DimensionGraph", hiw.IndicatorDimensionGraph.getDimensionGraphForIndicatorDimensionGraph);
    hiw.Endpoint.addArray(hiw.IndicatorDimension, 0 /* GET */, "/IndicatorDimensions/{page}", hiw.IndicatorDimension.getAll);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/IndicatorDimensions/Count", hiw.IndicatorDimension.getAllCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/IndicatorDimensions/PageCount", hiw.IndicatorDimension.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDimension, 0 /* GET */, "/IndicatorDimension/{id}", hiw.IndicatorDimension.getByID);
    hiw.Endpoint.addArray(hiw.IndicatorDimension, 1 /* POST */, "IndicatorDimensions/Filter", hiw.IndicatorDimension.filter);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 1 /* POST */, "IndicatorDimensions/FilterCount", hiw.IndicatorDimension.filterCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 1 /* POST */, "IndicatorDimensions/FilterPageCount", hiw.IndicatorDimension.filterPageCount);
    hiw.Endpoint.addArray(hiw.IndicatorDimension, 0 /* GET */, "/Indicator/{indicatorID}/IndicatorDimensions/{page}", hiw.IndicatorDimension.getByIndicatorID);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/Indicator/{indicatorID}/IndicatorDimensions/Count", hiw.IndicatorDimension.getByIndicatorIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/Indicator/{indicatorID}/IndicatorDimensions/PageCount", hiw.IndicatorDimension.getByIndicatorIDPageCount);
    hiw.Endpoint.addSingle(hiw.Indicator, 0 /* GET */, "/IndicatorDimension/{indicatorDimensionID}/Indicator", hiw.IndicatorDimension.getIndicatorForIndicatorDimension);
    hiw.Endpoint.addArray(hiw.IndicatorDimension, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDimensions/{page}", hiw.IndicatorDimension.getByDimensionBookID);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDimensions/Count", hiw.IndicatorDimension.getByDimensionBookIDCount);
    hiw.Endpoint.addSimple(hiw.IndicatorDimension, 0 /* GET */, "/DimensionBook/{dimensionBookID}/IndicatorDimensions/PageCount", hiw.IndicatorDimension.getByDimensionBookIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionBook, 0 /* GET */, "/IndicatorDimension/{indicatorDimensionID}/DimensionBook", hiw.IndicatorDimension.getDimensionBookForIndicatorDimension);
    hiw.Endpoint.addSingle(hiw.IndicatorDimension, 0 /* GET */, "/IndicatorDimension?DimensionBookID={dimensionBookID}&IndicatorID={indicatorID}", hiw.IndicatorDimension.getByDimensionBookIDAndIndicatorID);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/Indicators/{page}", hiw.Indicator.getAll);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Indicators/Count", hiw.Indicator.getAllCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Indicators/PageCount", hiw.Indicator.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Indicator, 0 /* GET */, "/Indicator/{id}", hiw.Indicator.getByID);
    hiw.Endpoint.addArray(hiw.Indicator, 1 /* POST */, "Indicators/Filter", hiw.Indicator.filter);
    hiw.Endpoint.addSimple(hiw.Indicator, 1 /* POST */, "Indicators/FilterCount", hiw.Indicator.filterCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 1 /* POST */, "Indicators/FilterPageCount", hiw.Indicator.filterPageCount);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Indicators/{page}", hiw.Indicator.getByIndicatorDescriptionID);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Indicators/Count", hiw.Indicator.getByIndicatorDescriptionIDCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/IndicatorDescription/{indicatorDescriptionID}/Indicators/PageCount", hiw.Indicator.getByIndicatorDescriptionIDPageCount);
    hiw.Endpoint.addSingle(hiw.IndicatorDescription, 0 /* GET */, "/Indicator/{indicatorID}/IndicatorDescription", hiw.Indicator.getIndicatorDescriptionForIndicator);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/Timeframe/{timeframeID}/Indicators/{page}", hiw.Indicator.getByTimeframeID);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Timeframe/{timeframeID}/Indicators/Count", hiw.Indicator.getByTimeframeIDCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Timeframe/{timeframeID}/Indicators/PageCount", hiw.Indicator.getByTimeframeIDPageCount);
    hiw.Endpoint.addSingle(hiw.Timeframe, 0 /* GET */, "/Indicator/{indicatorID}/Timeframe", hiw.Indicator.getTimeframeForIndicator);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/Locale/{localeID}/Indicators/{page}", hiw.Indicator.getByLocaleID);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Locale/{localeID}/Indicators/Count", hiw.Indicator.getByLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/Locale/{localeID}/Indicators/PageCount", hiw.Indicator.getByLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/Indicator/{indicatorID}/Locale", hiw.Indicator.getLocaleForIndicator);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Indicators/{page}", hiw.Indicator.getByDimensionGraphID);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Indicators/Count", hiw.Indicator.getByDimensionGraphIDCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/DimensionGraph/{dimensionGraphID}/Indicators/PageCount", hiw.Indicator.getByDimensionGraphIDPageCount);
    hiw.Endpoint.addSingle(hiw.DimensionGraph, 0 /* GET */, "/Indicator/{indicatorID}/DimensionGraph", hiw.Indicator.getDimensionGraphForIndicator);
    hiw.Endpoint.addArray(hiw.Indicator, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Indicators/{page}", hiw.Indicator.getByModifierGraphID);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Indicators/Count", hiw.Indicator.getByModifierGraphIDCount);
    hiw.Endpoint.addSimple(hiw.Indicator, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Indicators/PageCount", hiw.Indicator.getByModifierGraphIDPageCount);
    hiw.Endpoint.addSingle(hiw.ModifierGraph, 0 /* GET */, "/Indicator/{indicatorID}/ModifierGraph", hiw.Indicator.getModifierGraphForIndicator);
    hiw.Endpoint.addArray(hiw.Initiative, 0 /* GET */, "/Initiatives/{page}", hiw.Initiative.getAll);
    hiw.Endpoint.addSimple(hiw.Initiative, 0 /* GET */, "/Initiatives/Count", hiw.Initiative.getAllCount);
    hiw.Endpoint.addSimple(hiw.Initiative, 0 /* GET */, "/Initiatives/PageCount", hiw.Initiative.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Initiative, 0 /* GET */, "/Initiative/{id}", hiw.Initiative.getByID);
    hiw.Endpoint.addArray(hiw.Initiative, 1 /* POST */, "Initiatives/Filter", hiw.Initiative.filter);
    hiw.Endpoint.addSimple(hiw.Initiative, 1 /* POST */, "Initiatives/FilterCount", hiw.Initiative.filterCount);
    hiw.Endpoint.addSimple(hiw.Initiative, 1 /* POST */, "Initiatives/FilterPageCount", hiw.Initiative.filterPageCount);
    hiw.Endpoint.addArray(hiw.Intervention, 0 /* GET */, "/Interventions/{page}", hiw.Intervention.getAll);
    hiw.Endpoint.addSimple(hiw.Intervention, 0 /* GET */, "/Interventions/Count", hiw.Intervention.getAllCount);
    hiw.Endpoint.addSimple(hiw.Intervention, 0 /* GET */, "/Interventions/PageCount", hiw.Intervention.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Intervention, 0 /* GET */, "/Intervention/{id}", hiw.Intervention.getByID);
    hiw.Endpoint.addArray(hiw.Intervention, 1 /* POST */, "Interventions/Filter", hiw.Intervention.filter);
    hiw.Endpoint.addSimple(hiw.Intervention, 1 /* POST */, "Interventions/FilterCount", hiw.Intervention.filterCount);
    hiw.Endpoint.addSimple(hiw.Intervention, 1 /* POST */, "Interventions/FilterPageCount", hiw.Intervention.filterPageCount);
    hiw.Endpoint.addArray(hiw.Intervention, 0 /* GET */, "/Url/{urlID}/Interventions/{page}", hiw.Intervention.getByUrlID);
    hiw.Endpoint.addSimple(hiw.Intervention, 0 /* GET */, "/Url/{urlID}/Interventions/Count", hiw.Intervention.getByUrlIDCount);
    hiw.Endpoint.addSimple(hiw.Intervention, 0 /* GET */, "/Url/{urlID}/Interventions/PageCount", hiw.Intervention.getByUrlIDPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/Intervention/{interventionID}/Url", hiw.Intervention.getUrlForIntervention);
    hiw.Endpoint.addArray(hiw.Keyword, 0 /* GET */, "/Keywords/{page}", hiw.Keyword.getAll);
    hiw.Endpoint.addSimple(hiw.Keyword, 0 /* GET */, "/Keywords/Count", hiw.Keyword.getAllCount);
    hiw.Endpoint.addSimple(hiw.Keyword, 0 /* GET */, "/Keywords/PageCount", hiw.Keyword.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Keyword, 0 /* GET */, "/Keyword/{id}", hiw.Keyword.getByID);
    hiw.Endpoint.addArray(hiw.Keyword, 1 /* POST */, "Keywords/Filter", hiw.Keyword.filter);
    hiw.Endpoint.addSimple(hiw.Keyword, 1 /* POST */, "Keywords/FilterCount", hiw.Keyword.filterCount);
    hiw.Endpoint.addSimple(hiw.Keyword, 1 /* POST */, "Keywords/FilterPageCount", hiw.Keyword.filterPageCount);
    hiw.Endpoint.addArray(hiw.LocaleLevel, 0 /* GET */, "/LocaleLevels/{page}", hiw.LocaleLevel.getAll);
    hiw.Endpoint.addSimple(hiw.LocaleLevel, 0 /* GET */, "/LocaleLevels/Count", hiw.LocaleLevel.getAllCount);
    hiw.Endpoint.addSimple(hiw.LocaleLevel, 0 /* GET */, "/LocaleLevels/PageCount", hiw.LocaleLevel.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/LocaleLevel/{id}", hiw.LocaleLevel.getByID);
    hiw.Endpoint.addArray(hiw.LocaleLevel, 1 /* POST */, "LocaleLevels/Filter", hiw.LocaleLevel.filter);
    hiw.Endpoint.addSimple(hiw.LocaleLevel, 1 /* POST */, "LocaleLevels/FilterCount", hiw.LocaleLevel.filterCount);
    hiw.Endpoint.addSimple(hiw.LocaleLevel, 1 /* POST */, "LocaleLevels/FilterPageCount", hiw.LocaleLevel.filterPageCount);
    hiw.Endpoint.addArray(hiw.LocaleRelation, 0 /* GET */, "/LocaleRelations/{page}", hiw.LocaleRelation.getAll);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/LocaleRelations/Count", hiw.LocaleRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/LocaleRelations/PageCount", hiw.LocaleRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleRelation, 0 /* GET */, "/LocaleRelation/{id}", hiw.LocaleRelation.getByID);
    hiw.Endpoint.addArray(hiw.LocaleRelation, 1 /* POST */, "LocaleRelations/Filter", hiw.LocaleRelation.filter);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 1 /* POST */, "LocaleRelations/FilterCount", hiw.LocaleRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 1 /* POST */, "LocaleRelations/FilterPageCount", hiw.LocaleRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Ancestors/{page}", hiw.LocaleRelation.getByAncestorLocaleID);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Ancestors/Count", hiw.LocaleRelation.getByAncestorLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Ancestors/PageCount", hiw.LocaleRelation.getByAncestorLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/LocaleRelation/{localeRelationID}/AncestorLocale", hiw.LocaleRelation.getAncestorLocaleForLocaleRelation);
    hiw.Endpoint.addArray(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Descendants/{page}", hiw.LocaleRelation.getByDescendantLocaleID);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Descendants/Count", hiw.LocaleRelation.getByDescendantLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.LocaleRelation, 0 /* GET */, "/Locale/{localeID}/Descendants/PageCount", hiw.LocaleRelation.getByDescendantLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/LocaleRelation/{localeRelationID}/DescendantLocale", hiw.LocaleRelation.getDescendantLocaleForLocaleRelation);
    hiw.Endpoint.addSingle(hiw.LocaleRelation, 0 /* GET */, "/LocaleRelation?AncestorLocaleID={ancestorLocaleID}&DescendantLocaleID={descendantLocaleID}", hiw.LocaleRelation.getByAncestorLocaleIDAndDescendantLocaleID);
    hiw.Endpoint.addArray(hiw.Locale, 0 /* GET */, "/Locales/{page}", hiw.Locale.getAll);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/Locales/Count", hiw.Locale.getAllCount);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/Locales/PageCount", hiw.Locale.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/Locale/{id}", hiw.Locale.getByID);
    hiw.Endpoint.addArray(hiw.Locale, 1 /* POST */, "Locales/Filter", hiw.Locale.filter);
    hiw.Endpoint.addSimple(hiw.Locale, 1 /* POST */, "Locales/FilterCount", hiw.Locale.filterCount);
    hiw.Endpoint.addSimple(hiw.Locale, 1 /* POST */, "Locales/FilterPageCount", hiw.Locale.filterPageCount);
    hiw.Endpoint.addArray(hiw.Locale, 0 /* GET */, "/Locale/{localeID}/Locales/{page}", hiw.Locale.getByParentLocaleID);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/Locale/{localeID}/Locales/Count", hiw.Locale.getByParentLocaleIDCount);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/Locale/{localeID}/Locales/PageCount", hiw.Locale.getByParentLocaleIDPageCount);
    hiw.Endpoint.addSingle(hiw.Locale, 0 /* GET */, "/Locale/{localeID}/ParentLocale", hiw.Locale.getParentLocaleForLocale);
    hiw.Endpoint.addArray(hiw.Locale, 0 /* GET */, "/LocaleLevel/{localeLevelID}/Locales/{page}", hiw.Locale.getByLocaleLevelID);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/LocaleLevel/{localeLevelID}/Locales/Count", hiw.Locale.getByLocaleLevelIDCount);
    hiw.Endpoint.addSimple(hiw.Locale, 0 /* GET */, "/LocaleLevel/{localeLevelID}/Locales/PageCount", hiw.Locale.getByLocaleLevelIDPageCount);
    hiw.Endpoint.addSingle(hiw.LocaleLevel, 0 /* GET */, "/Locale/{localeID}/LocaleLevel", hiw.Locale.getLocaleLevelForLocale);
    hiw.Endpoint.addArray(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatuses/{page}", hiw.MaritalStatus.getAll);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatuses/Count", hiw.MaritalStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatuses/PageCount", hiw.MaritalStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatus/{id}", hiw.MaritalStatus.getByID);
    hiw.Endpoint.addArray(hiw.MaritalStatus, 1 /* POST */, "MaritalStatuses/Filter", hiw.MaritalStatus.filter);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 1 /* POST */, "MaritalStatuses/FilterCount", hiw.MaritalStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 1 /* POST */, "MaritalStatuses/FilterPageCount", hiw.MaritalStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/MaritalStatuses/{page}", hiw.MaritalStatus.getByParentMaritalStatusID);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/MaritalStatuses/Count", hiw.MaritalStatus.getByParentMaritalStatusIDCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/MaritalStatuses/PageCount", hiw.MaritalStatus.getByParentMaritalStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/ParentMaritalStatus", hiw.MaritalStatus.getParentMaritalStatusForMaritalStatus);
    hiw.Endpoint.addArray(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatusRelations/{page}", hiw.MaritalStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatusRelations/Count", hiw.MaritalStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatusRelations/PageCount", hiw.MaritalStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatusRelation/{id}", hiw.MaritalStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.MaritalStatusRelation, 1 /* POST */, "MaritalStatusRelations/Filter", hiw.MaritalStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 1 /* POST */, "MaritalStatusRelations/FilterCount", hiw.MaritalStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 1 /* POST */, "MaritalStatusRelations/FilterPageCount", hiw.MaritalStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Ancestors/{page}", hiw.MaritalStatusRelation.getByAncestorMaritalStatusID);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Ancestors/Count", hiw.MaritalStatusRelation.getByAncestorMaritalStatusIDCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Ancestors/PageCount", hiw.MaritalStatusRelation.getByAncestorMaritalStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatusRelation/{maritalStatusRelationID}/AncestorMaritalStatus", hiw.MaritalStatusRelation.getAncestorMaritalStatusForMaritalStatusRelation);
    hiw.Endpoint.addArray(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Descendants/{page}", hiw.MaritalStatusRelation.getByDescendantMaritalStatusID);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Descendants/Count", hiw.MaritalStatusRelation.getByDescendantMaritalStatusIDCount);
    hiw.Endpoint.addSimple(hiw.MaritalStatusRelation, 0 /* GET */, "/MaritalStatus/{maritalStatusID}/Descendants/PageCount", hiw.MaritalStatusRelation.getByDescendantMaritalStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.MaritalStatus, 0 /* GET */, "/MaritalStatusRelation/{maritalStatusRelationID}/DescendantMaritalStatus", hiw.MaritalStatusRelation.getDescendantMaritalStatusForMaritalStatusRelation);
    hiw.Endpoint.addArray(hiw.Modifier, 0 /* GET */, "/Modifiers/{page}", hiw.Modifier.getAll);
    hiw.Endpoint.addSimple(hiw.Modifier, 0 /* GET */, "/Modifiers/Count", hiw.Modifier.getAllCount);
    hiw.Endpoint.addSimple(hiw.Modifier, 0 /* GET */, "/Modifiers/PageCount", hiw.Modifier.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/Modifier/{id}", hiw.Modifier.getByID);
    hiw.Endpoint.addArray(hiw.Modifier, 1 /* POST */, "Modifiers/Filter", hiw.Modifier.filter);
    hiw.Endpoint.addSimple(hiw.Modifier, 1 /* POST */, "Modifiers/FilterCount", hiw.Modifier.filterCount);
    hiw.Endpoint.addSimple(hiw.Modifier, 1 /* POST */, "Modifiers/FilterPageCount", hiw.Modifier.filterPageCount);
    hiw.Endpoint.addArray(hiw.Modifier, 0 /* GET */, "/Modifier/{modifierID}/Modifiers/{page}", hiw.Modifier.getByParentModifierID);
    hiw.Endpoint.addSimple(hiw.Modifier, 0 /* GET */, "/Modifier/{modifierID}/Modifiers/Count", hiw.Modifier.getByParentModifierIDCount);
    hiw.Endpoint.addSimple(hiw.Modifier, 0 /* GET */, "/Modifier/{modifierID}/Modifiers/PageCount", hiw.Modifier.getByParentModifierIDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/Modifier/{modifierID}/ParentModifier", hiw.Modifier.getParentModifierForModifier);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/ModifierGraphs/{page}", hiw.ModifierGraph.getAll);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/ModifierGraphs/Count", hiw.ModifierGraph.getAllCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/ModifierGraphs/PageCount", hiw.ModifierGraph.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.ModifierGraph, 0 /* GET */, "/ModifierGraph/{id}", hiw.ModifierGraph.getByID);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 1 /* POST */, "ModifierGraphs/Filter", hiw.ModifierGraph.filter);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 1 /* POST */, "ModifierGraphs/FilterCount", hiw.ModifierGraph.filterCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 1 /* POST */, "ModifierGraphs/FilterPageCount", hiw.ModifierGraph.filterPageCount);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs1/{page}", hiw.ModifierGraph.getByModifier1ID);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs1/Count", hiw.ModifierGraph.getByModifier1IDCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs1/PageCount", hiw.ModifierGraph.getByModifier1IDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Modifier1", hiw.ModifierGraph.getModifier1ForModifierGraph);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs2/{page}", hiw.ModifierGraph.getByModifier2ID);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs2/Count", hiw.ModifierGraph.getByModifier2IDCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs2/PageCount", hiw.ModifierGraph.getByModifier2IDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Modifier2", hiw.ModifierGraph.getModifier2ForModifierGraph);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs3/{page}", hiw.ModifierGraph.getByModifier3ID);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs3/Count", hiw.ModifierGraph.getByModifier3IDCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs3/PageCount", hiw.ModifierGraph.getByModifier3IDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Modifier3", hiw.ModifierGraph.getModifier3ForModifierGraph);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs4/{page}", hiw.ModifierGraph.getByModifier4ID);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs4/Count", hiw.ModifierGraph.getByModifier4IDCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs4/PageCount", hiw.ModifierGraph.getByModifier4IDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Modifier4", hiw.ModifierGraph.getModifier4ForModifierGraph);
    hiw.Endpoint.addArray(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs5/{page}", hiw.ModifierGraph.getByModifier5ID);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs5/Count", hiw.ModifierGraph.getByModifier5IDCount);
    hiw.Endpoint.addSimple(hiw.ModifierGraph, 0 /* GET */, "/Modifier/{modifierID}/ModifierGraphs5/PageCount", hiw.ModifierGraph.getByModifier5IDPageCount);
    hiw.Endpoint.addSingle(hiw.Modifier, 0 /* GET */, "/ModifierGraph/{modifierGraphID}/Modifier5", hiw.ModifierGraph.getModifier5ForModifierGraph);
    hiw.Endpoint.addArray(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatuses/{page}", hiw.ObesityStatus.getAll);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatuses/Count", hiw.ObesityStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatuses/PageCount", hiw.ObesityStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatus/{id}", hiw.ObesityStatus.getByID);
    hiw.Endpoint.addArray(hiw.ObesityStatus, 1 /* POST */, "ObesityStatuses/Filter", hiw.ObesityStatus.filter);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 1 /* POST */, "ObesityStatuses/FilterCount", hiw.ObesityStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 1 /* POST */, "ObesityStatuses/FilterPageCount", hiw.ObesityStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/ObesityStatuses/{page}", hiw.ObesityStatus.getByParentObesityStatusID);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/ObesityStatuses/Count", hiw.ObesityStatus.getByParentObesityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/ObesityStatuses/PageCount", hiw.ObesityStatus.getByParentObesityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/ParentObesityStatus", hiw.ObesityStatus.getParentObesityStatusForObesityStatus);
    hiw.Endpoint.addArray(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatusRelations/{page}", hiw.ObesityStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatusRelations/Count", hiw.ObesityStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatusRelations/PageCount", hiw.ObesityStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatusRelation/{id}", hiw.ObesityStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.ObesityStatusRelation, 1 /* POST */, "ObesityStatusRelations/Filter", hiw.ObesityStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 1 /* POST */, "ObesityStatusRelations/FilterCount", hiw.ObesityStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 1 /* POST */, "ObesityStatusRelations/FilterPageCount", hiw.ObesityStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Ancestors/{page}", hiw.ObesityStatusRelation.getByAncestorObesityStatusID);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Ancestors/Count", hiw.ObesityStatusRelation.getByAncestorObesityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Ancestors/PageCount", hiw.ObesityStatusRelation.getByAncestorObesityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatusRelation/{obesityStatusRelationID}/AncestorObesityStatus", hiw.ObesityStatusRelation.getAncestorObesityStatusForObesityStatusRelation);
    hiw.Endpoint.addArray(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Descendants/{page}", hiw.ObesityStatusRelation.getByDescendantObesityStatusID);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Descendants/Count", hiw.ObesityStatusRelation.getByDescendantObesityStatusIDCount);
    hiw.Endpoint.addSimple(hiw.ObesityStatusRelation, 0 /* GET */, "/ObesityStatus/{obesityStatusID}/Descendants/PageCount", hiw.ObesityStatusRelation.getByDescendantObesityStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.ObesityStatus, 0 /* GET */, "/ObesityStatusRelation/{obesityStatusRelationID}/DescendantObesityStatus", hiw.ObesityStatusRelation.getDescendantObesityStatusForObesityStatusRelation);
    hiw.Endpoint.addArray(hiw.Other, 0 /* GET */, "/Others/{page}", hiw.Other.getAll);
    hiw.Endpoint.addSimple(hiw.Other, 0 /* GET */, "/Others/Count", hiw.Other.getAllCount);
    hiw.Endpoint.addSimple(hiw.Other, 0 /* GET */, "/Others/PageCount", hiw.Other.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Other, 0 /* GET */, "/Other/{id}", hiw.Other.getByID);
    hiw.Endpoint.addArray(hiw.Other, 1 /* POST */, "Others/Filter", hiw.Other.filter);
    hiw.Endpoint.addSimple(hiw.Other, 1 /* POST */, "Others/FilterCount", hiw.Other.filterCount);
    hiw.Endpoint.addSimple(hiw.Other, 1 /* POST */, "Others/FilterPageCount", hiw.Other.filterPageCount);
    hiw.Endpoint.addArray(hiw.Other, 0 /* GET */, "/Other/{otherID}/Others/{page}", hiw.Other.getByParentOtherID);
    hiw.Endpoint.addSimple(hiw.Other, 0 /* GET */, "/Other/{otherID}/Others/Count", hiw.Other.getByParentOtherIDCount);
    hiw.Endpoint.addSimple(hiw.Other, 0 /* GET */, "/Other/{otherID}/Others/PageCount", hiw.Other.getByParentOtherIDPageCount);
    hiw.Endpoint.addSingle(hiw.Other, 0 /* GET */, "/Other/{otherID}/ParentOther", hiw.Other.getParentOtherForOther);
    hiw.Endpoint.addArray(hiw.OtherRelation, 0 /* GET */, "/OtherRelations/{page}", hiw.OtherRelation.getAll);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/OtherRelations/Count", hiw.OtherRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/OtherRelations/PageCount", hiw.OtherRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.OtherRelation, 0 /* GET */, "/OtherRelation/{id}", hiw.OtherRelation.getByID);
    hiw.Endpoint.addArray(hiw.OtherRelation, 1 /* POST */, "OtherRelations/Filter", hiw.OtherRelation.filter);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 1 /* POST */, "OtherRelations/FilterCount", hiw.OtherRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 1 /* POST */, "OtherRelations/FilterPageCount", hiw.OtherRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Ancestors/{page}", hiw.OtherRelation.getByAncestorOtherID);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Ancestors/Count", hiw.OtherRelation.getByAncestorOtherIDCount);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Ancestors/PageCount", hiw.OtherRelation.getByAncestorOtherIDPageCount);
    hiw.Endpoint.addSingle(hiw.Other, 0 /* GET */, "/OtherRelation/{otherRelationID}/AncestorOther", hiw.OtherRelation.getAncestorOtherForOtherRelation);
    hiw.Endpoint.addArray(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Descendants/{page}", hiw.OtherRelation.getByDescendantOtherID);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Descendants/Count", hiw.OtherRelation.getByDescendantOtherIDCount);
    hiw.Endpoint.addSimple(hiw.OtherRelation, 0 /* GET */, "/Other/{otherID}/Descendants/PageCount", hiw.OtherRelation.getByDescendantOtherIDPageCount);
    hiw.Endpoint.addSingle(hiw.Other, 0 /* GET */, "/OtherRelation/{otherRelationID}/DescendantOther", hiw.OtherRelation.getDescendantOtherForOtherRelation);
    hiw.Endpoint.addArray(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicities/{page}", hiw.RaceEthnicity.getAll);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicities/Count", hiw.RaceEthnicity.getAllCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicities/PageCount", hiw.RaceEthnicity.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicity/{id}", hiw.RaceEthnicity.getByID);
    hiw.Endpoint.addArray(hiw.RaceEthnicity, 1 /* POST */, "RaceEthnicities/Filter", hiw.RaceEthnicity.filter);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 1 /* POST */, "RaceEthnicities/FilterCount", hiw.RaceEthnicity.filterCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 1 /* POST */, "RaceEthnicities/FilterPageCount", hiw.RaceEthnicity.filterPageCount);
    hiw.Endpoint.addArray(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/RaceEthnicities/{page}", hiw.RaceEthnicity.getByParentRaceEthnicityID);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/RaceEthnicities/Count", hiw.RaceEthnicity.getByParentRaceEthnicityIDCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/RaceEthnicities/PageCount", hiw.RaceEthnicity.getByParentRaceEthnicityIDPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/ParentRaceEthnicity", hiw.RaceEthnicity.getParentRaceEthnicityForRaceEthnicity);
    hiw.Endpoint.addArray(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicityRelations/{page}", hiw.RaceEthnicityRelation.getAll);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicityRelations/Count", hiw.RaceEthnicityRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicityRelations/PageCount", hiw.RaceEthnicityRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicityRelation/{id}", hiw.RaceEthnicityRelation.getByID);
    hiw.Endpoint.addArray(hiw.RaceEthnicityRelation, 1 /* POST */, "RaceEthnicityRelations/Filter", hiw.RaceEthnicityRelation.filter);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 1 /* POST */, "RaceEthnicityRelations/FilterCount", hiw.RaceEthnicityRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 1 /* POST */, "RaceEthnicityRelations/FilterPageCount", hiw.RaceEthnicityRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Ancestors/{page}", hiw.RaceEthnicityRelation.getByAncestorRaceEthnicityID);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Ancestors/Count", hiw.RaceEthnicityRelation.getByAncestorRaceEthnicityIDCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Ancestors/PageCount", hiw.RaceEthnicityRelation.getByAncestorRaceEthnicityIDPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicityRelation/{raceEthnicityRelationID}/AncestorRaceEthnicity", hiw.RaceEthnicityRelation.getAncestorRaceEthnicityForRaceEthnicityRelation);
    hiw.Endpoint.addArray(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Descendants/{page}", hiw.RaceEthnicityRelation.getByDescendantRaceEthnicityID);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Descendants/Count", hiw.RaceEthnicityRelation.getByDescendantRaceEthnicityIDCount);
    hiw.Endpoint.addSimple(hiw.RaceEthnicityRelation, 0 /* GET */, "/RaceEthnicity/{raceEthnicityID}/Descendants/PageCount", hiw.RaceEthnicityRelation.getByDescendantRaceEthnicityIDPageCount);
    hiw.Endpoint.addSingle(hiw.RaceEthnicity, 0 /* GET */, "/RaceEthnicityRelation/{raceEthnicityRelationID}/DescendantRaceEthnicity", hiw.RaceEthnicityRelation.getDescendantRaceEthnicityForRaceEthnicityRelation);
    hiw.Endpoint.addArray(hiw.Sex, 0 /* GET */, "/Sexes/{page}", hiw.Sex.getAll);
    hiw.Endpoint.addSimple(hiw.Sex, 0 /* GET */, "/Sexes/Count", hiw.Sex.getAllCount);
    hiw.Endpoint.addSimple(hiw.Sex, 0 /* GET */, "/Sexes/PageCount", hiw.Sex.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Sex, 0 /* GET */, "/Sex/{id}", hiw.Sex.getByID);
    hiw.Endpoint.addArray(hiw.Sex, 1 /* POST */, "Sexes/Filter", hiw.Sex.filter);
    hiw.Endpoint.addSimple(hiw.Sex, 1 /* POST */, "Sexes/FilterCount", hiw.Sex.filterCount);
    hiw.Endpoint.addSimple(hiw.Sex, 1 /* POST */, "Sexes/FilterPageCount", hiw.Sex.filterPageCount);
    hiw.Endpoint.addArray(hiw.Sex, 0 /* GET */, "/Sex/{sexID}/Sexes/{page}", hiw.Sex.getByParentSexID);
    hiw.Endpoint.addSimple(hiw.Sex, 0 /* GET */, "/Sex/{sexID}/Sexes/Count", hiw.Sex.getByParentSexIDCount);
    hiw.Endpoint.addSimple(hiw.Sex, 0 /* GET */, "/Sex/{sexID}/Sexes/PageCount", hiw.Sex.getByParentSexIDPageCount);
    hiw.Endpoint.addSingle(hiw.Sex, 0 /* GET */, "/Sex/{sexID}/ParentSex", hiw.Sex.getParentSexForSex);
    hiw.Endpoint.addArray(hiw.SexRelation, 0 /* GET */, "/SexRelations/{page}", hiw.SexRelation.getAll);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/SexRelations/Count", hiw.SexRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/SexRelations/PageCount", hiw.SexRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.SexRelation, 0 /* GET */, "/SexRelation/{id}", hiw.SexRelation.getByID);
    hiw.Endpoint.addArray(hiw.SexRelation, 1 /* POST */, "SexRelations/Filter", hiw.SexRelation.filter);
    hiw.Endpoint.addSimple(hiw.SexRelation, 1 /* POST */, "SexRelations/FilterCount", hiw.SexRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.SexRelation, 1 /* POST */, "SexRelations/FilterPageCount", hiw.SexRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Ancestors/{page}", hiw.SexRelation.getByAncestorSexID);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Ancestors/Count", hiw.SexRelation.getByAncestorSexIDCount);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Ancestors/PageCount", hiw.SexRelation.getByAncestorSexIDPageCount);
    hiw.Endpoint.addSingle(hiw.Sex, 0 /* GET */, "/SexRelation/{sexRelationID}/AncestorSex", hiw.SexRelation.getAncestorSexForSexRelation);
    hiw.Endpoint.addArray(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Descendants/{page}", hiw.SexRelation.getByDescendantSexID);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Descendants/Count", hiw.SexRelation.getByDescendantSexIDCount);
    hiw.Endpoint.addSimple(hiw.SexRelation, 0 /* GET */, "/Sex/{sexID}/Descendants/PageCount", hiw.SexRelation.getByDescendantSexIDPageCount);
    hiw.Endpoint.addSingle(hiw.Sex, 0 /* GET */, "/SexRelation/{sexRelationID}/DescendantSex", hiw.SexRelation.getDescendantSexForSexRelation);
    hiw.Endpoint.addArray(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientations/{page}", hiw.SexualOrientation.getAll);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientations/Count", hiw.SexualOrientation.getAllCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientations/PageCount", hiw.SexualOrientation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientation/{id}", hiw.SexualOrientation.getByID);
    hiw.Endpoint.addArray(hiw.SexualOrientation, 1 /* POST */, "SexualOrientations/Filter", hiw.SexualOrientation.filter);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 1 /* POST */, "SexualOrientations/FilterCount", hiw.SexualOrientation.filterCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 1 /* POST */, "SexualOrientations/FilterPageCount", hiw.SexualOrientation.filterPageCount);
    hiw.Endpoint.addArray(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/SexualOrientations/{page}", hiw.SexualOrientation.getByParentSexualOrientationID);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/SexualOrientations/Count", hiw.SexualOrientation.getByParentSexualOrientationIDCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/SexualOrientations/PageCount", hiw.SexualOrientation.getByParentSexualOrientationIDPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/ParentSexualOrientation", hiw.SexualOrientation.getParentSexualOrientationForSexualOrientation);
    hiw.Endpoint.addArray(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientationRelations/{page}", hiw.SexualOrientationRelation.getAll);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientationRelations/Count", hiw.SexualOrientationRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientationRelations/PageCount", hiw.SexualOrientationRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientationRelation/{id}", hiw.SexualOrientationRelation.getByID);
    hiw.Endpoint.addArray(hiw.SexualOrientationRelation, 1 /* POST */, "SexualOrientationRelations/Filter", hiw.SexualOrientationRelation.filter);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 1 /* POST */, "SexualOrientationRelations/FilterCount", hiw.SexualOrientationRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 1 /* POST */, "SexualOrientationRelations/FilterPageCount", hiw.SexualOrientationRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Ancestors/{page}", hiw.SexualOrientationRelation.getByAncestorSexualOrientationID);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Ancestors/Count", hiw.SexualOrientationRelation.getByAncestorSexualOrientationIDCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Ancestors/PageCount", hiw.SexualOrientationRelation.getByAncestorSexualOrientationIDPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientationRelation/{sexualOrientationRelationID}/AncestorSexualOrientation", hiw.SexualOrientationRelation.getAncestorSexualOrientationForSexualOrientationRelation);
    hiw.Endpoint.addArray(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Descendants/{page}", hiw.SexualOrientationRelation.getByDescendantSexualOrientationID);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Descendants/Count", hiw.SexualOrientationRelation.getByDescendantSexualOrientationIDCount);
    hiw.Endpoint.addSimple(hiw.SexualOrientationRelation, 0 /* GET */, "/SexualOrientation/{sexualOrientationID}/Descendants/PageCount", hiw.SexualOrientationRelation.getByDescendantSexualOrientationIDPageCount);
    hiw.Endpoint.addSingle(hiw.SexualOrientation, 0 /* GET */, "/SexualOrientationRelation/{sexualOrientationRelationID}/DescendantSexualOrientation", hiw.SexualOrientationRelation.getDescendantSexualOrientationForSexualOrientationRelation);
    hiw.Endpoint.addArray(hiw.Timeframe, 0 /* GET */, "/Timeframes/{page}", hiw.Timeframe.getAll);
    hiw.Endpoint.addSimple(hiw.Timeframe, 0 /* GET */, "/Timeframes/Count", hiw.Timeframe.getAllCount);
    hiw.Endpoint.addSimple(hiw.Timeframe, 0 /* GET */, "/Timeframes/PageCount", hiw.Timeframe.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Timeframe, 0 /* GET */, "/Timeframe/{id}", hiw.Timeframe.getByID);
    hiw.Endpoint.addArray(hiw.Timeframe, 1 /* POST */, "Timeframes/Filter", hiw.Timeframe.filter);
    hiw.Endpoint.addSimple(hiw.Timeframe, 1 /* POST */, "Timeframes/FilterCount", hiw.Timeframe.filterCount);
    hiw.Endpoint.addSimple(hiw.Timeframe, 1 /* POST */, "Timeframes/FilterPageCount", hiw.Timeframe.filterPageCount);
    hiw.Endpoint.addArray(hiw.Total, 0 /* GET */, "/Totals/{page}", hiw.Total.getAll);
    hiw.Endpoint.addSimple(hiw.Total, 0 /* GET */, "/Totals/Count", hiw.Total.getAllCount);
    hiw.Endpoint.addSimple(hiw.Total, 0 /* GET */, "/Totals/PageCount", hiw.Total.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Total, 0 /* GET */, "/Total/{id}", hiw.Total.getByID);
    hiw.Endpoint.addArray(hiw.Total, 1 /* POST */, "Totals/Filter", hiw.Total.filter);
    hiw.Endpoint.addSimple(hiw.Total, 1 /* POST */, "Totals/FilterCount", hiw.Total.filterCount);
    hiw.Endpoint.addSimple(hiw.Total, 1 /* POST */, "Totals/FilterPageCount", hiw.Total.filterPageCount);
    hiw.Endpoint.addArray(hiw.Total, 0 /* GET */, "/Total/{totalID}/Totals/{page}", hiw.Total.getByParentTotalID);
    hiw.Endpoint.addSimple(hiw.Total, 0 /* GET */, "/Total/{totalID}/Totals/Count", hiw.Total.getByParentTotalIDCount);
    hiw.Endpoint.addSimple(hiw.Total, 0 /* GET */, "/Total/{totalID}/Totals/PageCount", hiw.Total.getByParentTotalIDPageCount);
    hiw.Endpoint.addSingle(hiw.Total, 0 /* GET */, "/Total/{totalID}/ParentTotal", hiw.Total.getParentTotalForTotal);
    hiw.Endpoint.addArray(hiw.TotalRelation, 0 /* GET */, "/TotalRelations/{page}", hiw.TotalRelation.getAll);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/TotalRelations/Count", hiw.TotalRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/TotalRelations/PageCount", hiw.TotalRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.TotalRelation, 0 /* GET */, "/TotalRelation/{id}", hiw.TotalRelation.getByID);
    hiw.Endpoint.addArray(hiw.TotalRelation, 1 /* POST */, "TotalRelations/Filter", hiw.TotalRelation.filter);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 1 /* POST */, "TotalRelations/FilterCount", hiw.TotalRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 1 /* POST */, "TotalRelations/FilterPageCount", hiw.TotalRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Ancestors/{page}", hiw.TotalRelation.getByAncestorTotalID);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Ancestors/Count", hiw.TotalRelation.getByAncestorTotalIDCount);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Ancestors/PageCount", hiw.TotalRelation.getByAncestorTotalIDPageCount);
    hiw.Endpoint.addSingle(hiw.Total, 0 /* GET */, "/TotalRelation/{totalRelationID}/AncestorTotal", hiw.TotalRelation.getAncestorTotalForTotalRelation);
    hiw.Endpoint.addArray(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Descendants/{page}", hiw.TotalRelation.getByDescendantTotalID);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Descendants/Count", hiw.TotalRelation.getByDescendantTotalIDCount);
    hiw.Endpoint.addSimple(hiw.TotalRelation, 0 /* GET */, "/Total/{totalID}/Descendants/PageCount", hiw.TotalRelation.getByDescendantTotalIDPageCount);
    hiw.Endpoint.addSingle(hiw.Total, 0 /* GET */, "/TotalRelation/{totalRelationID}/DescendantTotal", hiw.TotalRelation.getDescendantTotalForTotalRelation);
    hiw.Endpoint.addArray(hiw.Url, 0 /* GET */, "/Urls/{page}", hiw.Url.getAll);
    hiw.Endpoint.addSimple(hiw.Url, 0 /* GET */, "/Urls/Count", hiw.Url.getAllCount);
    hiw.Endpoint.addSimple(hiw.Url, 0 /* GET */, "/Urls/PageCount", hiw.Url.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Url, 0 /* GET */, "/Url/{id}", hiw.Url.getByID);
    hiw.Endpoint.addArray(hiw.Url, 1 /* POST */, "Urls/Filter", hiw.Url.filter);
    hiw.Endpoint.addSimple(hiw.Url, 1 /* POST */, "Urls/FilterCount", hiw.Url.filterCount);
    hiw.Endpoint.addSimple(hiw.Url, 1 /* POST */, "Urls/FilterPageCount", hiw.Url.filterPageCount);
    hiw.Endpoint.addArray(hiw.ValueLabel, 0 /* GET */, "/ValueLabels/{page}", hiw.ValueLabel.getAll);
    hiw.Endpoint.addSimple(hiw.ValueLabel, 0 /* GET */, "/ValueLabels/Count", hiw.ValueLabel.getAllCount);
    hiw.Endpoint.addSimple(hiw.ValueLabel, 0 /* GET */, "/ValueLabels/PageCount", hiw.ValueLabel.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.ValueLabel, 0 /* GET */, "/ValueLabel/{id}", hiw.ValueLabel.getByID);
    hiw.Endpoint.addArray(hiw.ValueLabel, 1 /* POST */, "ValueLabels/Filter", hiw.ValueLabel.filter);
    hiw.Endpoint.addSimple(hiw.ValueLabel, 1 /* POST */, "ValueLabels/FilterCount", hiw.ValueLabel.filterCount);
    hiw.Endpoint.addSimple(hiw.ValueLabel, 1 /* POST */, "ValueLabels/FilterPageCount", hiw.ValueLabel.filterPageCount);
    hiw.Endpoint.addArray(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatuses/{page}", hiw.VeteranStatus.getAll);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatuses/Count", hiw.VeteranStatus.getAllCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatuses/PageCount", hiw.VeteranStatus.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatus/{id}", hiw.VeteranStatus.getByID);
    hiw.Endpoint.addArray(hiw.VeteranStatus, 1 /* POST */, "VeteranStatuses/Filter", hiw.VeteranStatus.filter);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 1 /* POST */, "VeteranStatuses/FilterCount", hiw.VeteranStatus.filterCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 1 /* POST */, "VeteranStatuses/FilterPageCount", hiw.VeteranStatus.filterPageCount);
    hiw.Endpoint.addArray(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/VeteranStatuses/{page}", hiw.VeteranStatus.getByParentVeteranStatusID);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/VeteranStatuses/Count", hiw.VeteranStatus.getByParentVeteranStatusIDCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/VeteranStatuses/PageCount", hiw.VeteranStatus.getByParentVeteranStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/ParentVeteranStatus", hiw.VeteranStatus.getParentVeteranStatusForVeteranStatus);
    hiw.Endpoint.addArray(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatusRelations/{page}", hiw.VeteranStatusRelation.getAll);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatusRelations/Count", hiw.VeteranStatusRelation.getAllCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatusRelations/PageCount", hiw.VeteranStatusRelation.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatusRelation/{id}", hiw.VeteranStatusRelation.getByID);
    hiw.Endpoint.addArray(hiw.VeteranStatusRelation, 1 /* POST */, "VeteranStatusRelations/Filter", hiw.VeteranStatusRelation.filter);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 1 /* POST */, "VeteranStatusRelations/FilterCount", hiw.VeteranStatusRelation.filterCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 1 /* POST */, "VeteranStatusRelations/FilterPageCount", hiw.VeteranStatusRelation.filterPageCount);
    hiw.Endpoint.addArray(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Ancestors/{page}", hiw.VeteranStatusRelation.getByAncestorVeteranStatusID);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Ancestors/Count", hiw.VeteranStatusRelation.getByAncestorVeteranStatusIDCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Ancestors/PageCount", hiw.VeteranStatusRelation.getByAncestorVeteranStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatusRelation/{veteranStatusRelationID}/AncestorVeteranStatus", hiw.VeteranStatusRelation.getAncestorVeteranStatusForVeteranStatusRelation);
    hiw.Endpoint.addArray(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Descendants/{page}", hiw.VeteranStatusRelation.getByDescendantVeteranStatusID);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Descendants/Count", hiw.VeteranStatusRelation.getByDescendantVeteranStatusIDCount);
    hiw.Endpoint.addSimple(hiw.VeteranStatusRelation, 0 /* GET */, "/VeteranStatus/{veteranStatusID}/Descendants/PageCount", hiw.VeteranStatusRelation.getByDescendantVeteranStatusIDPageCount);
    hiw.Endpoint.addSingle(hiw.VeteranStatus, 0 /* GET */, "/VeteranStatusRelation/{veteranStatusRelationID}/DescendantVeteranStatus", hiw.VeteranStatusRelation.getDescendantVeteranStatusForVeteranStatusRelation);
    hiw.Endpoint.addArray(hiw.Year, 0 /* GET */, "/Years/{page}", hiw.Year.getAll);
    hiw.Endpoint.addSimple(hiw.Year, 0 /* GET */, "/Years/Count", hiw.Year.getAllCount);
    hiw.Endpoint.addSimple(hiw.Year, 0 /* GET */, "/Years/PageCount", hiw.Year.getAllPageCount);
    hiw.Endpoint.addSingle(hiw.Year, 0 /* GET */, "/Year/{id}", hiw.Year.getByID);
    hiw.Endpoint.addArray(hiw.Year, 1 /* POST */, "Years/Filter", hiw.Year.filter);
    hiw.Endpoint.addSimple(hiw.Year, 1 /* POST */, "Years/FilterCount", hiw.Year.filterCount);
    hiw.Endpoint.addSimple(hiw.Year, 1 /* POST */, "Years/FilterPageCount", hiw.Year.filterPageCount);
})(hiw || (hiw = {}));
//# sourceMappingURL=hiw-api.js.map