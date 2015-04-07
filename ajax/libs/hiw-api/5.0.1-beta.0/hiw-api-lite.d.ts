/* Health Indicators Warehouse (HIW) JavaScript API
 *   v5.0.1-beta.0
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
declare module hiw {
    function extend(target: any, source: any, ...exclude: Array<string>): any;
    function pascalCaseToCamelCase(name: string): string;
    function isPlainObject(obj: any): boolean;
}
declare module hiw {
    interface IFilterPart {
        toJSON(): Object;
    }
}
declare module hiw {
    /** The valid set of boolean operators we can use to filter an API call. */
    enum FilterType {
        And = 0,
        Or = 1,
    }
}
declare module hiw {
    /** The valid set of operators we can use to filter an API call. */
    enum Operator {
        LessThan = 0,
        LessThanOrEqual = 1,
        Equal = 2,
        NotEqual = 3,
        GreaterThanOrEqual = 4,
        GreaterThan = 5,
        Null = 6,
        NotNull = 7,
        In = 8,
        NotIn = 9,
    }
}
declare module hiw {
    /** Represents a single criterion. */
    class Criterion implements IFilterPart {
        /** The name of the field upon which to apply this filter. */
        name: string;
        /** The operator to use. */
        operator: Operator;
        /** The value to use. */
        value: any;
        /** Creates a new Criterion instance with the specified name, operator and value. */
        constructor(field: PropertyMap | string, operator?: Operator, value?: any);
        /** Converts this instance to JSON in the format the HIW API expects. */
        toJSON(): Object;
    }
}
declare module hiw {
    /** Represents a group of filter criterion. */
    class Group implements IFilterPart {
        /** The joining type of this filter (And, Or - default is And). */
        type: FilterType;
        /** An array of criteria which are joined based on the provided Type. */
        criteria: Array<IFilterPart>;
        /** Creates a new Group instance of the specified type. */
        constructor(type?: FilterType);
        /** Adds the specified filter part to the criteria. */
        addPart(part: IFilterPart): Group;
        /** Creates a new criterion and adds it to the criteria. */
        add(field: PropertyMap | string, operator?: Operator, value?: Object): Group;
        /** Converts this instance to JSON in the format the HIW API expects. */
        toJSON(): Object;
    }
}
declare module hiw {
    /** Represents the outermost portion of a filter. */
    class Filter extends Group {
        /** The page of data to return (default is 1, the first page). */
        page: Number;
        /** Creates a new, default, Filter instance. */
        constructor();
        /** Creates a new Filter for the specified page. */
        constructor(page: number);
        /** Creates a new Filter instance of the specified page and type. */
        constructor(page: number, type: FilterType);
        /** Adds the specified filter part to the criteria. */
        addPart(part: IFilterPart): Filter;
        /** Creates a new criterion (using the default operator "Equal") and adds it to the criteria. */
        addEqual(field: PropertyMap | string, value: Object): Filter;
        /** Creates a new criterion and adds it to the criteria. */
        add(field: PropertyMap | string, operator?: Operator, value?: Object): Filter;
        /** Converts this instance to JSON in the format the HIW API expects. */
        toJSON(page?: number): Object;
    }
}
declare module hiw {
    interface IAPIResponseInitializer<T> {
        (apiResponse: APIResponse<T>): T;
    }
}
declare module hiw {
    /** Exposes functionality through one or more service end points. */
    enum LinkType {
        Age = 0,
        Ages = 1,
        AgeRelation = 2,
        AgeRelations = 3,
        CharacteristicOfSchoolOrStudent = 4,
        CharacteristicOfSchoolOrStudents = 5,
        CharacteristicOfSchoolOrStudentRelation = 6,
        CharacteristicOfSchoolOrStudentRelations = 7,
        CountryOfBirth = 8,
        CountryOfBirths = 9,
        CountryOfBirthRelation = 10,
        CountryOfBirthRelations = 11,
        DataCategory = 12,
        DataCategories = 13,
        DataCategoryRelation = 14,
        DataCategoryRelations = 15,
        DataSourceDataSupplier = 16,
        DataSourceDataSuppliers = 17,
        DataSource = 18,
        DataSources = 19,
        DataSourceURL = 20,
        DataSourceURLs = 21,
        DataSupplier = 22,
        DataSuppliers = 23,
        DimensionBook = 24,
        DimensionBooks = 25,
        DimensionBookRelation = 26,
        DimensionBookRelations = 27,
        DimensionGraph = 28,
        DimensionGraphs = 29,
        DimensionList = 30,
        DimensionLists = 31,
        DisabilityStatus = 32,
        DisabilityStatuses = 33,
        DisabilityStatusRelation = 34,
        DisabilityStatusRelations = 35,
        EducationalAttainment = 36,
        EducationalAttainments = 37,
        EducationalAttainmentRelation = 38,
        EducationalAttainmentRelations = 39,
        FamilyType = 40,
        FamilyTypes = 41,
        FamilyTypeRelation = 42,
        FamilyTypeRelations = 43,
        Geography = 44,
        Geographies = 45,
        GeographyRelation = 46,
        GeographyRelations = 47,
        GlossaryTerm = 48,
        GlossaryTerms = 49,
        HealthInsuranceStatus = 50,
        HealthInsuranceStatuses = 51,
        HealthInsuranceStatusRelation = 52,
        HealthInsuranceStatusRelations = 53,
        HP2020TSM = 54,
        HP2020TSMs = 55,
        IncomeAndPovertyStatus = 56,
        IncomeAndPovertyStatuses = 57,
        IncomeAndPovertyStatusRelation = 58,
        IncomeAndPovertyStatusRelations = 59,
        IndicatorDescriptionDataCategory = 60,
        IndicatorDescriptionDataCategories = 61,
        IndicatorDescriptionDataSource = 62,
        IndicatorDescriptionDataSources = 63,
        IndicatorDescriptionDefaultDimensionGraph = 64,
        IndicatorDescriptionDefaultDimensionGraphs = 65,
        IndicatorDescriptionDimension = 66,
        IndicatorDescriptionDimensions = 67,
        IndicatorDescriptionDimensionGraph = 68,
        IndicatorDescriptionDimensionGraphs = 69,
        IndicatorDescriptionDimensionValue = 70,
        IndicatorDescriptionDimensionValues = 71,
        IndicatorDescriptionInitiative = 72,
        IndicatorDescriptionInitiatives = 73,
        IndicatorDescriptionIntervention = 74,
        IndicatorDescriptionInterventions = 75,
        IndicatorDescriptionKeyword = 76,
        IndicatorDescriptionKeywords = 77,
        IndicatorDescriptionLocaleCounty = 78,
        IndicatorDescriptionLocaleCounties = 79,
        IndicatorDescriptionLocaleHospitalReferralRegion = 80,
        IndicatorDescriptionLocaleHospitalReferralRegions = 81,
        IndicatorDescriptionLocaleLevel = 82,
        IndicatorDescriptionLocaleLevels = 83,
        IndicatorDescriptionLocale = 84,
        IndicatorDescriptionLocales = 85,
        IndicatorDescriptionLocaleState = 86,
        IndicatorDescriptionLocaleStates = 87,
        IndicatorDescriptionMethodologyNote = 88,
        IndicatorDescriptionMethodologyNotes = 89,
        IndicatorDescriptionMoreInfo = 90,
        IndicatorDescriptionMoreInfos = 91,
        IndicatorDescriptionReference = 92,
        IndicatorDescriptionReferences = 93,
        IndicatorDescriptionResource = 94,
        IndicatorDescriptionResources = 95,
        IndicatorDescription = 96,
        IndicatorDescriptions = 97,
        IndicatorDescriptionHP2020 = 98,
        IndicatorDescriptionHP2020s = 99,
        IndicatorDescriptionTimeFrame = 100,
        IndicatorDescriptionTimeFrames = 101,
        IndicatorDescriptionYear = 102,
        IndicatorDescriptionYears = 103,
        IndicatorDimensionGraph = 104,
        IndicatorDimensionGraphs = 105,
        IndicatorDimension = 106,
        IndicatorDimensions = 107,
        Indicator = 108,
        Indicators = 109,
        Initiative = 110,
        Initiatives = 111,
        Intervention = 112,
        Interventions = 113,
        Keyword = 114,
        Keywords = 115,
        LocaleLevel = 116,
        LocaleLevels = 117,
        LocaleRelation = 118,
        LocaleRelations = 119,
        Locale = 120,
        Locales = 121,
        MaritalStatus = 122,
        MaritalStatuses = 123,
        MaritalStatusRelation = 124,
        MaritalStatusRelations = 125,
        Modifier = 126,
        Modifiers = 127,
        ModifierGraph = 128,
        ModifierGraphs = 129,
        ObesityStatus = 130,
        ObesityStatuses = 131,
        ObesityStatusRelation = 132,
        ObesityStatusRelations = 133,
        Other = 134,
        Others = 135,
        OtherRelation = 136,
        OtherRelations = 137,
        RaceEthnicity = 138,
        RaceEthnicities = 139,
        RaceEthnicityRelation = 140,
        RaceEthnicityRelations = 141,
        Sex = 142,
        Sexes = 143,
        SexRelation = 144,
        SexRelations = 145,
        SexualOrientation = 146,
        SexualOrientations = 147,
        SexualOrientationRelation = 148,
        SexualOrientationRelations = 149,
        Timeframe = 150,
        Timeframes = 151,
        Total = 152,
        Totals = 153,
        TotalRelation = 154,
        TotalRelations = 155,
        Url = 156,
        Urls = 157,
        ValueLabel = 158,
        ValueLabels = 159,
        VeteranStatus = 160,
        VeteranStatuses = 161,
        VeteranStatusRelation = 162,
        VeteranStatusRelations = 163,
        Year = 164,
        Years = 165,
    }
    enum ExportFileTypeEnum {
        Excel = 0,
        Excel2003 = 1,
        CSV = 2,
    }
    enum IndicatorDescriptionDataSourceDataDescription {
        Numerator = 0,
        Denominator = 1,
        Both = 2,
        Other = 3,
    }
    enum LocaleLevelName {
        None = 0,
        National = 1,
        State = 2,
        County = 3,
        HospitalReferralRegion = 4,
    }
    enum SystemSettingKeyName {
        AuditTableName = 0,
        DataModelVersion = 1,
        DefaultGuestAccess = 2,
        RequireStrongPasswords = 3,
        RootDirectory = 4,
        RootExportPath = 5,
        SessionIDType = 6,
        SessionTimeoutInMinutes = 7,
        ShadowType = 8,
        SystemAbbreviation = 9,
        SystemName = 10,
        TableListTableName = 11,
    }
}
declare module hiw {
    class PropertyMap {
        name: string;
        apiName: string;
        constructor(name: string, apiName: string);
        toString(): string;
    }
}
declare module hiw {
    enum HTTPMethod {
        GET = 0,
        POST = 1,
    }
}
declare module hiw {
    class Endpoint<T> {
        initializer: IAPIResponseInitializer<T>;
        method: HTTPMethod;
        uriTemplate: string;
        call: Function;
        constructor(initializer: IAPIResponseInitializer<T>, method: HTTPMethod, uriTemplate: string, call: Function);
        static addSimple<T, D>(owningType: {
            new (): T;
        }, method: HTTPMethod, uriTemplate: string, call: Function): Endpoint<D>;
        static addSingle<T>(owningType: {
            new (): T;
        }, method: HTTPMethod, uriTemplate: string, call: Function): Endpoint<T>;
        static addArray<T>(owningType: {
            new (): T;
        }, method: HTTPMethod, uriTemplate: string, call: Function): Endpoint<Array<T>>;
        static add<T>(initializer: IAPIResponseInitializer<T>, method: HTTPMethod, uriTemplate: string, call: Function): Endpoint<T>;
        static fromSelf<T>(): Endpoint<T>;
    }
}
declare module hiw {
    class Link {
        relationship: string;
        type: LinkType;
        typeName: string;
        href: string;
    }
}
declare module hiw {
    class ServiceObject {
    }
}
declare module hiw {
    class ServiceDataObject extends ServiceObject {
        links: Link[];
        protected getFields(): any;
        protected getPropertyMaps(): Array<PropertyMap>;
        findLinks(typeName: LinkType, relationship?: string, first?: boolean): Array<Link> | Link;
        /** Recusively fills this instance with the provided data.
         *  @param json A JSON object containing the properties and values to copy to this instance. */
        fill(json: any, exclude?: Array<string>): void;
    }
}
declare module hiw {
    /** Represents a response received from the API. */
    class APIResponse<T> extends ServiceObject {
        endpoint: Endpoint<T>;
        url: string;
        postData: any;
        status: string;
        message: string;
        data: T;
        dataLength: number;
        constructor(endpoint: Endpoint<T>, url: string, postData: any);
        fill(json: any): void;
        private static fillInstance<T>(target, source);
    }
}
declare module hiw {
    /** Provides a mechanism to interact with the HIW API. */
    interface IAPICallback<T> {
        (data: T, apiResponse: APIResponse<T>, error: string): void;
    }
}
declare module hiw {
    /** Provides core functionality to interact with the HIW API. */
    class API {
        static DefaultBaseURL: string;
        static Endpoints: Endpoint<any>[];
        /** The base URL of the HIW API. */
        baseURL: string;
        /** The API key to use when making calls to the HIW API. */
        apiKey: string;
        /** Creates a new API instance with the provided base URL. */
        constructor(apiKey?: string, baseURL?: string);
        static parameterizePath(path: string, params?: any): string;
        executeEndpoint<T>(endpoint: Endpoint<T>, callback: IAPICallback<T>, params?: any, postData?: any, page?: number): void;
        executeUrl(method: HTTPMethod, url: string, postData: any, callback: (json: Object, error: string) => void): void;
        static VerifyApiKey(api: API, callback: IAPICallback<boolean>): void;
    }
}
declare module hiw {
    class Version extends ServiceDataObject {
        static Fields: {
            major: PropertyMap;
            minor: PropertyMap;
            revision: PropertyMap;
            build: PropertyMap;
        };
        major: number;
        minor: number;
        revision: number;
        build: number;
        constructor(major?: number, minor?: number, revision?: number, build?: number);
        protected getFields(): any;
    }
    var APIVersion: Version;
}
