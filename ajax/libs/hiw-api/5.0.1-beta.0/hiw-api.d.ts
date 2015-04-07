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
    /** Contains properties and static functionality for the Age type. */
    class Age extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentAgeID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentAgeID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the Ages in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Ages */
        static getAll(api: API, callback: IAPICallback<Array<Age>>, page?: number): void;
        /** Gets how many Ages exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Ages method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Age with the specified primary key.
         *  @param id The primary key of the Age to return.
         *  @return The matching Age, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Age>): void;
        /** Returns a filtered collection of Ages based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Ages which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Age>>, page?: number): void;
        /** Returns a count of how many Ages exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Ages which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Ages exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Ageswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Ages by ParentAgeID.
         *  @return An Array of Ages. */
        getAges(api: API, callback: IAPICallback<Array<Age>>, page?: number): void;
        /** Gets Ages by ParentAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        static getByParentAgeID(ageID: number, api: API, callback: IAPICallback<Array<Age>>, page?: number): void;
        /** Gets how many Ages by ParentAgeID exist.
         *  @return An Array of Ages. */
        getAgesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Ages by ParentAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        static getByParentAgeIDCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Ages by ParentAgeID exist.
         *  @return An Array of Ages. */
        getAgesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Ages by ParentAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child Ages.
         *  @return An Array of Ages. */
        static getByParentAgeIDPageCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentAge based on the unique ID of the related Age.
         *  @return A single Age, or null. */
        getParentAge(api: API, callback: IAPICallback<Age>): void;
        /** Returns the related ParentAge based on the unique ID of the related Age.
         *  @param ageID The ID of the Age to retrieve.
         *  @return A single Age, or null. */
        static getParentAgeForAge(ageID: number, api: API, callback: IAPICallback<Age>): void;
    }
    /** Contains properties and static functionality for the AgeRelation type. */
    class AgeRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorAgeID: PropertyMap;
            descendantAgeID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorAgeID: number;
        descendantAgeID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the AgeRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of AgeRelations */
        static getAll(api: API, callback: IAPICallback<Array<AgeRelation>>, page?: number): void;
        /** Gets how many AgeRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the AgeRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the AgeRelation with the specified primary key.
         *  @param id The primary key of the AgeRelation to return.
         *  @return The matching AgeRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<AgeRelation>): void;
        /** Returns a filtered collection of AgeRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All AgeRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<AgeRelation>>, page?: number): void;
        /** Returns a count of how many AgeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of AgeRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of AgeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of AgeRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets AgeRelations by AncestorAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByAncestorAgeID(ageID: number, api: API, callback: IAPICallback<Array<AgeRelation>>, page?: number): void;
        /** Gets how many AgeRelations by AncestorAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByAncestorAgeIDCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of AgeRelations by AncestorAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByAncestorAgeIDPageCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorAge based on the unique ID of the related AgeRelation.
         *  @return A single AgeRelation, or null. */
        getAncestorAge(api: API, callback: IAPICallback<AgeRelation>): void;
        /** Returns the related AncestorAge based on the unique ID of the related AgeRelation.
         *  @param ageRelationID The ID of the AgeRelation to retrieve.
         *  @return A single AgeRelation, or null. */
        static getAncestorAgeForAgeRelation(ageRelationID: number, api: API, callback: IAPICallback<AgeRelation>): void;
        /** Gets AgeRelations by DescendantAgeID.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByDescendantAgeID(ageID: number, api: API, callback: IAPICallback<Array<AgeRelation>>, page?: number): void;
        /** Gets how many AgeRelations by DescendantAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByDescendantAgeIDCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of AgeRelations by DescendantAgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child AgeRelations.
         *  @return An Array of AgeRelations. */
        static getByDescendantAgeIDPageCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantAge based on the unique ID of the related AgeRelation.
         *  @return A single AgeRelation, or null. */
        getDescendantAge(api: API, callback: IAPICallback<AgeRelation>): void;
        /** Returns the related DescendantAge based on the unique ID of the related AgeRelation.
         *  @param ageRelationID The ID of the AgeRelation to retrieve.
         *  @return A single AgeRelation, or null. */
        static getDescendantAgeForAgeRelation(ageRelationID: number, api: API, callback: IAPICallback<AgeRelation>): void;
    }
    /** Contains properties and static functionality for the CharacteristicOfSchoolOrStudent type. */
    class CharacteristicOfSchoolOrStudent extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentCharacteristicOfSchoolOrStudentID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentCharacteristicOfSchoolOrStudentID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the CharacteristicOfSchoolOrStudents in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CharacteristicOfSchoolOrStudents */
        static getAll(api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudent>>, page?: number): void;
        /** Gets how many CharacteristicOfSchoolOrStudents exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the CharacteristicOfSchoolOrStudents method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the CharacteristicOfSchoolOrStudent with the specified primary key.
         *  @param id The primary key of the CharacteristicOfSchoolOrStudent to return.
         *  @return The matching CharacteristicOfSchoolOrStudent, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudent>): void;
        /** Returns a filtered collection of CharacteristicOfSchoolOrStudents based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CharacteristicOfSchoolOrStudents which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudent>>, page?: number): void;
        /** Returns a count of how many CharacteristicOfSchoolOrStudents exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CharacteristicOfSchoolOrStudents which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of CharacteristicOfSchoolOrStudents exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CharacteristicOfSchoolOrStudentswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        getCharacteristicOfSchoolOrStudents(api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudent>>, page?: number): void;
        /** Gets CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        static getByParentCharacteristicOfSchoolOrStudentID(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudent>>, page?: number): void;
        /** Gets how many CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        getCharacteristicOfSchoolOrStudentsCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        static getByParentCharacteristicOfSchoolOrStudentIDCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        getCharacteristicOfSchoolOrStudentsPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CharacteristicOfSchoolOrStudents by ParentCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudents.
         *  @return An Array of CharacteristicOfSchoolOrStudents. */
        static getByParentCharacteristicOfSchoolOrStudentIDPageCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudent.
         *  @return A single CharacteristicOfSchoolOrStudent, or null. */
        getParentCharacteristicOfSchoolOrStudent(api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudent>): void;
        /** Returns the related ParentCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudent.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudent, or null. */
        static getParentCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudent(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudent>): void;
    }
    /** Contains properties and static functionality for the CharacteristicOfSchoolOrStudentRelation type. */
    class CharacteristicOfSchoolOrStudentRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorCharacteristicOfSchoolOrStudentID: PropertyMap;
            descendantCharacteristicOfSchoolOrStudentID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorCharacteristicOfSchoolOrStudentID: number;
        descendantCharacteristicOfSchoolOrStudentID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the CharacteristicOfSchoolOrStudentRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CharacteristicOfSchoolOrStudentRelations */
        static getAll(api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudentRelation>>, page?: number): void;
        /** Gets how many CharacteristicOfSchoolOrStudentRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the CharacteristicOfSchoolOrStudentRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the CharacteristicOfSchoolOrStudentRelation with the specified primary key.
         *  @param id The primary key of the CharacteristicOfSchoolOrStudentRelation to return.
         *  @return The matching CharacteristicOfSchoolOrStudentRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudentRelation>): void;
        /** Returns a filtered collection of CharacteristicOfSchoolOrStudentRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CharacteristicOfSchoolOrStudentRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudentRelation>>, page?: number): void;
        /** Returns a count of how many CharacteristicOfSchoolOrStudentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CharacteristicOfSchoolOrStudentRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of CharacteristicOfSchoolOrStudentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CharacteristicOfSchoolOrStudentRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByAncestorCharacteristicOfSchoolOrStudentID(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudentRelation>>, page?: number): void;
        /** Gets how many CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByAncestorCharacteristicOfSchoolOrStudentIDCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CharacteristicOfSchoolOrStudentRelations by AncestorCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByAncestorCharacteristicOfSchoolOrStudentIDPageCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        getAncestorCharacteristicOfSchoolOrStudent(api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudentRelation>): void;
        /** Returns the related AncestorCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @param characteristicOfSchoolOrStudentRelationID The ID of the CharacteristicOfSchoolOrStudentRelation to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        static getAncestorCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation(characteristicOfSchoolOrStudentRelationID: number, api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudentRelation>): void;
        /** Gets CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByDescendantCharacteristicOfSchoolOrStudentID(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<Array<CharacteristicOfSchoolOrStudentRelation>>, page?: number): void;
        /** Gets how many CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByDescendantCharacteristicOfSchoolOrStudentIDCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CharacteristicOfSchoolOrStudentRelations by DescendantCharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child CharacteristicOfSchoolOrStudentRelations.
         *  @return An Array of CharacteristicOfSchoolOrStudentRelations. */
        static getByDescendantCharacteristicOfSchoolOrStudentIDPageCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        getDescendantCharacteristicOfSchoolOrStudent(api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudentRelation>): void;
        /** Returns the related DescendantCharacteristicOfSchoolOrStudent based on the unique ID of the related CharacteristicOfSchoolOrStudentRelation.
         *  @param characteristicOfSchoolOrStudentRelationID The ID of the CharacteristicOfSchoolOrStudentRelation to retrieve.
         *  @return A single CharacteristicOfSchoolOrStudentRelation, or null. */
        static getDescendantCharacteristicOfSchoolOrStudentForCharacteristicOfSchoolOrStudentRelation(characteristicOfSchoolOrStudentRelationID: number, api: API, callback: IAPICallback<CharacteristicOfSchoolOrStudentRelation>): void;
    }
    /** Contains properties and static functionality for the CountryOfBirth type. */
    class CountryOfBirth extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentCountryOfBirthID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentCountryOfBirthID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the CountryOfBirths in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CountryOfBirths */
        static getAll(api: API, callback: IAPICallback<Array<CountryOfBirth>>, page?: number): void;
        /** Gets how many CountryOfBirths exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the CountryOfBirths method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the CountryOfBirth with the specified primary key.
         *  @param id The primary key of the CountryOfBirth to return.
         *  @return The matching CountryOfBirth, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<CountryOfBirth>): void;
        /** Returns a filtered collection of CountryOfBirths based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CountryOfBirths which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<CountryOfBirth>>, page?: number): void;
        /** Returns a count of how many CountryOfBirths exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CountryOfBirths which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of CountryOfBirths exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CountryOfBirthswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets CountryOfBirths by ParentCountryOfBirthID.
         *  @return An Array of CountryOfBirths. */
        getCountryOfBirths(api: API, callback: IAPICallback<Array<CountryOfBirth>>, page?: number): void;
        /** Gets CountryOfBirths by ParentCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        static getByParentCountryOfBirthID(countryOfBirthID: number, api: API, callback: IAPICallback<Array<CountryOfBirth>>, page?: number): void;
        /** Gets how many CountryOfBirths by ParentCountryOfBirthID exist.
         *  @return An Array of CountryOfBirths. */
        getCountryOfBirthsCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many CountryOfBirths by ParentCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        static getByParentCountryOfBirthIDCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CountryOfBirths by ParentCountryOfBirthID exist.
         *  @return An Array of CountryOfBirths. */
        getCountryOfBirthsPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CountryOfBirths by ParentCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirths.
         *  @return An Array of CountryOfBirths. */
        static getByParentCountryOfBirthIDPageCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentCountryOfBirth based on the unique ID of the related CountryOfBirth.
         *  @return A single CountryOfBirth, or null. */
        getParentCountryOfBirth(api: API, callback: IAPICallback<CountryOfBirth>): void;
        /** Returns the related ParentCountryOfBirth based on the unique ID of the related CountryOfBirth.
         *  @param countryOfBirthID The ID of the CountryOfBirth to retrieve.
         *  @return A single CountryOfBirth, or null. */
        static getParentCountryOfBirthForCountryOfBirth(countryOfBirthID: number, api: API, callback: IAPICallback<CountryOfBirth>): void;
    }
    /** Contains properties and static functionality for the CountryOfBirthRelation type. */
    class CountryOfBirthRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorCountryOfBirthID: PropertyMap;
            descendantCountryOfBirthID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorCountryOfBirthID: number;
        descendantCountryOfBirthID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the CountryOfBirthRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of CountryOfBirthRelations */
        static getAll(api: API, callback: IAPICallback<Array<CountryOfBirthRelation>>, page?: number): void;
        /** Gets how many CountryOfBirthRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the CountryOfBirthRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the CountryOfBirthRelation with the specified primary key.
         *  @param id The primary key of the CountryOfBirthRelation to return.
         *  @return The matching CountryOfBirthRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<CountryOfBirthRelation>): void;
        /** Returns a filtered collection of CountryOfBirthRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All CountryOfBirthRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<CountryOfBirthRelation>>, page?: number): void;
        /** Returns a count of how many CountryOfBirthRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of CountryOfBirthRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of CountryOfBirthRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of CountryOfBirthRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets CountryOfBirthRelations by AncestorCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByAncestorCountryOfBirthID(countryOfBirthID: number, api: API, callback: IAPICallback<Array<CountryOfBirthRelation>>, page?: number): void;
        /** Gets how many CountryOfBirthRelations by AncestorCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByAncestorCountryOfBirthIDCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CountryOfBirthRelations by AncestorCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByAncestorCountryOfBirthIDPageCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @return A single CountryOfBirthRelation, or null. */
        getAncestorCountryOfBirth(api: API, callback: IAPICallback<CountryOfBirthRelation>): void;
        /** Returns the related AncestorCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @param countryOfBirthRelationID The ID of the CountryOfBirthRelation to retrieve.
         *  @return A single CountryOfBirthRelation, or null. */
        static getAncestorCountryOfBirthForCountryOfBirthRelation(countryOfBirthRelationID: number, api: API, callback: IAPICallback<CountryOfBirthRelation>): void;
        /** Gets CountryOfBirthRelations by DescendantCountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByDescendantCountryOfBirthID(countryOfBirthID: number, api: API, callback: IAPICallback<Array<CountryOfBirthRelation>>, page?: number): void;
        /** Gets how many CountryOfBirthRelations by DescendantCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByDescendantCountryOfBirthIDCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of CountryOfBirthRelations by DescendantCountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child CountryOfBirthRelations.
         *  @return An Array of CountryOfBirthRelations. */
        static getByDescendantCountryOfBirthIDPageCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @return A single CountryOfBirthRelation, or null. */
        getDescendantCountryOfBirth(api: API, callback: IAPICallback<CountryOfBirthRelation>): void;
        /** Returns the related DescendantCountryOfBirth based on the unique ID of the related CountryOfBirthRelation.
         *  @param countryOfBirthRelationID The ID of the CountryOfBirthRelation to retrieve.
         *  @return A single CountryOfBirthRelation, or null. */
        static getDescendantCountryOfBirthForCountryOfBirthRelation(countryOfBirthRelationID: number, api: API, callback: IAPICallback<CountryOfBirthRelation>): void;
    }
    /** Contains properties and static functionality for the DataCategory type. */
    class DataCategory extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            rank: PropertyMap;
            rankName: PropertyMap;
            parentDataCategoryID: PropertyMap;
            number: PropertyMap;
            acronym: PropertyMap;
            header: PropertyMap;
            name: PropertyMap;
            sortOrder: PropertyMap;
            description: PropertyMap;
            initiativeID: PropertyMap;
            treeGraph: PropertyMap;
            categoryGraph: PropertyMap;
            modifyDate: PropertyMap;
        };
        id: number;
        rank: number;
        rankName: string;
        parentDataCategoryID: number;
        number: string;
        acronym: string;
        header: string;
        name: string;
        sortOrder: number;
        description: string;
        initiativeID: number;
        treeGraph: string;
        categoryGraph: string;
        modifyDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the DataCategories in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataCategories */
        static getAll(api: API, callback: IAPICallback<Array<DataCategory>>, page?: number): void;
        /** Gets how many DataCategories exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataCategories method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataCategory with the specified primary key.
         *  @param id The primary key of the DataCategory to return.
         *  @return The matching DataCategory, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataCategory>): void;
        /** Returns a filtered collection of DataCategories based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataCategories which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataCategory>>, page?: number): void;
        /** Returns a count of how many DataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataCategories which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataCategorieswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DataCategories by ParentDataCategoryID.
         *  @return An Array of DataCategories. */
        getParentDataCategories(api: API, callback: IAPICallback<Array<DataCategory>>, page?: number): void;
        /** Gets DataCategories by ParentDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByParentDataCategoryID(dataCategoryID: number, api: API, callback: IAPICallback<Array<DataCategory>>, page?: number): void;
        /** Gets how many DataCategories by ParentDataCategoryID exist.
         *  @return An Array of DataCategories. */
        getParentDataCategoriesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many DataCategories by ParentDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByParentDataCategoryIDCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataCategories by ParentDataCategoryID exist.
         *  @return An Array of DataCategories. */
        getParentDataCategoriesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataCategories by ParentDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByParentDataCategoryIDPageCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentDataCategory based on the unique ID of the related DataCategory.
         *  @return A single DataCategory, or null. */
        getParentDataCategory(api: API, callback: IAPICallback<DataCategory>): void;
        /** Returns the related ParentDataCategory based on the unique ID of the related DataCategory.
         *  @param dataCategoryID The ID of the DataCategory to retrieve.
         *  @return A single DataCategory, or null. */
        static getParentDataCategoryForDataCategory(dataCategoryID: number, api: API, callback: IAPICallback<DataCategory>): void;
        /** Gets DataCategories by InitiativeID.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByInitiativeID(initiativeID: number, api: API, callback: IAPICallback<Array<DataCategory>>, page?: number): void;
        /** Gets how many DataCategories by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByInitiativeIDCount(initiativeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataCategories by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child DataCategories.
         *  @return An Array of DataCategories. */
        static getByInitiativeIDPageCount(initiativeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Initiative based on the unique ID of the related DataCategory.
         *  @return A single DataCategory, or null. */
        getInitiative(api: API, callback: IAPICallback<DataCategory>): void;
        /** Returns the related Initiative based on the unique ID of the related DataCategory.
         *  @param dataCategoryID The ID of the DataCategory to retrieve.
         *  @return A single DataCategory, or null. */
        static getInitiativeForDataCategory(dataCategoryID: number, api: API, callback: IAPICallback<DataCategory>): void;
    }
    /** Contains properties and static functionality for the DataCategoryRelation type. */
    class DataCategoryRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorDataCategoryID: PropertyMap;
            descendantDataCategoryID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorDataCategoryID: number;
        descendantDataCategoryID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the DataCategoryRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataCategoryRelations */
        static getAll(api: API, callback: IAPICallback<Array<DataCategoryRelation>>, page?: number): void;
        /** Gets how many DataCategoryRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataCategoryRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataCategoryRelation with the specified primary key.
         *  @param id The primary key of the DataCategoryRelation to return.
         *  @return The matching DataCategoryRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataCategoryRelation>): void;
        /** Returns a filtered collection of DataCategoryRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataCategoryRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataCategoryRelation>>, page?: number): void;
        /** Returns a count of how many DataCategoryRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataCategoryRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataCategoryRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataCategoryRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DataCategoryRelations by AncestorDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByAncestorDataCategoryID(dataCategoryID: number, api: API, callback: IAPICallback<Array<DataCategoryRelation>>, page?: number): void;
        /** Gets how many DataCategoryRelations by AncestorDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByAncestorDataCategoryIDCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataCategoryRelations by AncestorDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByAncestorDataCategoryIDPageCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @return A single DataCategoryRelation, or null. */
        getAncestorDataCategory(api: API, callback: IAPICallback<DataCategoryRelation>): void;
        /** Returns the related AncestorDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @param dataCategoryRelationID The ID of the DataCategoryRelation to retrieve.
         *  @return A single DataCategoryRelation, or null. */
        static getAncestorDataCategoryForDataCategoryRelation(dataCategoryRelationID: number, api: API, callback: IAPICallback<DataCategoryRelation>): void;
        /** Gets DataCategoryRelations by DescendantDataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByDescendantDataCategoryID(dataCategoryID: number, api: API, callback: IAPICallback<Array<DataCategoryRelation>>, page?: number): void;
        /** Gets how many DataCategoryRelations by DescendantDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByDescendantDataCategoryIDCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataCategoryRelations by DescendantDataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child DataCategoryRelations.
         *  @return An Array of DataCategoryRelations. */
        static getByDescendantDataCategoryIDPageCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @return A single DataCategoryRelation, or null. */
        getDescendantDataCategory(api: API, callback: IAPICallback<DataCategoryRelation>): void;
        /** Returns the related DescendantDataCategory based on the unique ID of the related DataCategoryRelation.
         *  @param dataCategoryRelationID The ID of the DataCategoryRelation to retrieve.
         *  @return A single DataCategoryRelation, or null. */
        static getDescendantDataCategoryForDataCategoryRelation(dataCategoryRelationID: number, api: API, callback: IAPICallback<DataCategoryRelation>): void;
    }
    /** Contains properties and static functionality for the DataSourceDataSupplier type. */
    class DataSourceDataSupplier extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            dataSourceID: PropertyMap;
            dataSupplierID: PropertyMap;
            modificationDate: PropertyMap;
        };
        id: number;
        dataSourceID: number;
        dataSupplierID: number;
        modificationDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the DataSourceDataSuppliers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSourceDataSuppliers */
        static getAll(api: API, callback: IAPICallback<Array<DataSourceDataSupplier>>, page?: number): void;
        /** Gets how many DataSourceDataSuppliers exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataSourceDataSuppliers method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataSourceDataSupplier with the specified primary key.
         *  @param id The primary key of the DataSourceDataSupplier to return.
         *  @return The matching DataSourceDataSupplier, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataSourceDataSupplier>): void;
        /** Returns a filtered collection of DataSourceDataSuppliers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSourceDataSuppliers which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataSourceDataSupplier>>, page?: number): void;
        /** Returns a count of how many DataSourceDataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSourceDataSuppliers which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataSourceDataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceDataSupplierswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DataSourceDataSuppliers by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSourceID(dataSourceID: number, api: API, callback: IAPICallback<Array<DataSourceDataSupplier>>, page?: number): void;
        /** Gets how many DataSourceDataSuppliers by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSourceIDCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataSourceDataSuppliers by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSourceIDPageCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DataSource based on the unique ID of the related DataSourceDataSupplier.
         *  @return A single DataSourceDataSupplier, or null. */
        getDataSource(api: API, callback: IAPICallback<DataSourceDataSupplier>): void;
        /** Returns the related DataSource based on the unique ID of the related DataSourceDataSupplier.
         *  @param dataSourceDataSupplierID The ID of the DataSourceDataSupplier to retrieve.
         *  @return A single DataSourceDataSupplier, or null. */
        static getDataSourceForDataSourceDataSupplier(dataSourceDataSupplierID: number, api: API, callback: IAPICallback<DataSourceDataSupplier>): void;
        /** Gets DataSourceDataSuppliers by DataSupplierID.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSupplierID(dataSupplierID: number, api: API, callback: IAPICallback<Array<DataSourceDataSupplier>>, page?: number): void;
        /** Gets how many DataSourceDataSuppliers by DataSupplierID exist.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSupplierIDCount(dataSupplierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataSourceDataSuppliers by DataSupplierID exist.
         *  @param dataSupplierID The ID of the DataSupplier for which to retrieve the child DataSourceDataSuppliers.
         *  @return An Array of DataSourceDataSuppliers. */
        static getByDataSupplierIDPageCount(dataSupplierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DataSupplier based on the unique ID of the related DataSourceDataSupplier.
         *  @return A single DataSourceDataSupplier, or null. */
        getDataSupplier(api: API, callback: IAPICallback<DataSourceDataSupplier>): void;
        /** Returns the related DataSupplier based on the unique ID of the related DataSourceDataSupplier.
         *  @param dataSourceDataSupplierID The ID of the DataSourceDataSupplier to retrieve.
         *  @return A single DataSourceDataSupplier, or null. */
        static getDataSupplierForDataSourceDataSupplier(dataSourceDataSupplierID: number, api: API, callback: IAPICallback<DataSourceDataSupplier>): void;
    }
    /** Contains properties and static functionality for the DataSource type. */
    class DataSource extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            acronym: PropertyMap;
            dataLimitations: PropertyMap;
            dataYearsAvailable: PropertyMap;
            periodicity: PropertyMap;
            mode: PropertyMap;
            description: PropertyMap;
            shortDescription: PropertyMap;
            selectedContent: PropertyMap;
            populationCovered: PropertyMap;
            methodology: PropertyMap;
            responseRateAndSampleSize: PropertyMap;
            interpretationIssues: PropertyMap;
            suppressionCriteria: PropertyMap;
            references1: PropertyMap;
            references2: PropertyMap;
            references3: PropertyMap;
            references4: PropertyMap;
            sortOrder: PropertyMap;
            modifyDate: PropertyMap;
            showMe: PropertyMap;
        };
        id: number;
        name: string;
        acronym: string;
        dataLimitations: string;
        dataYearsAvailable: string;
        periodicity: string;
        mode: string;
        description: string;
        shortDescription: string;
        selectedContent: string;
        populationCovered: string;
        methodology: string;
        responseRateAndSampleSize: string;
        interpretationIssues: string;
        suppressionCriteria: string;
        references1: string;
        references2: string;
        references3: string;
        references4: string;
        sortOrder: number;
        modifyDate: Date;
        showMe: boolean;
        protected getFields(): any;
        /** Gets a list of all of the DataSources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSources */
        static getAll(api: API, callback: IAPICallback<Array<DataSource>>, page?: number): void;
        /** Gets how many DataSources exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataSources method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataSource with the specified primary key.
         *  @param id The primary key of the DataSource to return.
         *  @return The matching DataSource, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataSource>): void;
        /** Returns a filtered collection of DataSources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSources which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataSource>>, page?: number): void;
        /** Returns a count of how many DataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSources which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the DataSourceURL type. */
    class DataSourceURL extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            dataSourceID: PropertyMap;
            urlID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        dataSourceID: number;
        urlID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the DataSourceURLs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSourceURLs */
        static getAll(api: API, callback: IAPICallback<Array<DataSourceURL>>, page?: number): void;
        /** Gets how many DataSourceURLs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataSourceURLs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataSourceURL with the specified primary key.
         *  @param id The primary key of the DataSourceURL to return.
         *  @return The matching DataSourceURL, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataSourceURL>): void;
        /** Returns a filtered collection of DataSourceURLs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSourceURLs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataSourceURL>>, page?: number): void;
        /** Returns a count of how many DataSourceURLs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSourceURLs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataSourceURLs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSourceURLswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DataSourceURLs by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByDataSourceID(dataSourceID: number, api: API, callback: IAPICallback<Array<DataSourceURL>>, page?: number): void;
        /** Gets how many DataSourceURLs by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByDataSourceIDCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataSourceURLs by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByDataSourceIDPageCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DataSource based on the unique ID of the related DataSourceURL.
         *  @return A single DataSourceURL, or null. */
        getDataSource(api: API, callback: IAPICallback<DataSourceURL>): void;
        /** Returns the related DataSource based on the unique ID of the related DataSourceURL.
         *  @param dataSourceURLID The ID of the DataSourceURL to retrieve.
         *  @return A single DataSourceURL, or null. */
        static getDataSourceForDataSourceURL(dataSourceURLID: number, api: API, callback: IAPICallback<DataSourceURL>): void;
        /** Gets DataSourceURLs by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<DataSourceURL>>, page?: number): void;
        /** Gets how many DataSourceURLs by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataSourceURLs by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSourceURLs.
         *  @return An Array of DataSourceURLs. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related DataSourceURL.
         *  @return A single DataSourceURL, or null. */
        getUrl(api: API, callback: IAPICallback<DataSourceURL>): void;
        /** Returns the related Url based on the unique ID of the related DataSourceURL.
         *  @param dataSourceURLID The ID of the DataSourceURL to retrieve.
         *  @return A single DataSourceURL, or null. */
        static getUrlForDataSourceURL(dataSourceURLID: number, api: API, callback: IAPICallback<DataSourceURL>): void;
    }
    /** Contains properties and static functionality for the DataSupplier type. */
    class DataSupplier extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            acronym: PropertyMap;
            name: PropertyMap;
            description: PropertyMap;
            shortDescription: PropertyMap;
            urlID: PropertyMap;
            sortOrder: PropertyMap;
            modifyDate: PropertyMap;
            validationDate: PropertyMap;
            validationStatus: PropertyMap;
        };
        id: number;
        acronym: string;
        name: string;
        description: string;
        shortDescription: string;
        urlID: number;
        sortOrder: number;
        modifyDate: Date;
        validationDate: Date;
        validationStatus: number;
        protected getFields(): any;
        /** Gets a list of all of the DataSuppliers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DataSuppliers */
        static getAll(api: API, callback: IAPICallback<Array<DataSupplier>>, page?: number): void;
        /** Gets how many DataSuppliers exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DataSuppliers method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DataSupplier with the specified primary key.
         *  @param id The primary key of the DataSupplier to return.
         *  @return The matching DataSupplier, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DataSupplier>): void;
        /** Returns a filtered collection of DataSuppliers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DataSuppliers which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DataSupplier>>, page?: number): void;
        /** Returns a count of how many DataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DataSuppliers which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DataSuppliers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DataSupplierswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DataSuppliers by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<DataSupplier>>, page?: number): void;
        /** Gets how many DataSuppliers by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DataSuppliers by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child DataSuppliers.
         *  @return An Array of DataSuppliers. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related DataSupplier.
         *  @return A single DataSupplier, or null. */
        getUrl(api: API, callback: IAPICallback<DataSupplier>): void;
        /** Returns the related Url based on the unique ID of the related DataSupplier.
         *  @param dataSupplierID The ID of the DataSupplier to retrieve.
         *  @return A single DataSupplier, or null. */
        static getUrlForDataSupplier(dataSupplierID: number, api: API, callback: IAPICallback<DataSupplier>): void;
    }
    /** Contains properties and static functionality for the DimensionBook type. */
    class DimensionBook extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            key: PropertyMap;
            dimension: PropertyMap;
            name: PropertyMap;
            IsHeader: PropertyMap;
            indentedName: PropertyMap;
            parentDimensionBookID: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
            dimensionListID: PropertyMap;
            chartName: PropertyMap;
            downloadName: PropertyMap;
        };
        id: number;
        key: string;
        dimension: string;
        name: string;
        IsHeader: boolean;
        indentedName: string;
        parentDimensionBookID: number;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        dimensionListID: number;
        chartName: string;
        downloadName: string;
        protected getFields(): any;
        /** Gets a list of all of the DimensionBooks in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionBooks */
        static getAll(api: API, callback: IAPICallback<Array<DimensionBook>>, page?: number): void;
        /** Gets how many DimensionBooks exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DimensionBooks method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DimensionBook with the specified primary key.
         *  @param id The primary key of the DimensionBook to return.
         *  @return The matching DimensionBook, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DimensionBook>): void;
        /** Returns a filtered collection of DimensionBooks based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionBooks which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DimensionBook>>, page?: number): void;
        /** Returns a count of how many DimensionBooks exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionBooks which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DimensionBooks exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionBookswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DimensionBooks by ParentDimensionBookID.
         *  @return An Array of DimensionBooks. */
        getDimensionBooks(api: API, callback: IAPICallback<Array<DimensionBook>>, page?: number): void;
        /** Gets DimensionBooks by ParentDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByParentDimensionBookID(dimensionBookID: number, api: API, callback: IAPICallback<Array<DimensionBook>>, page?: number): void;
        /** Gets how many DimensionBooks by ParentDimensionBookID exist.
         *  @return An Array of DimensionBooks. */
        getDimensionBooksCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many DimensionBooks by ParentDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByParentDimensionBookIDCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionBooks by ParentDimensionBookID exist.
         *  @return An Array of DimensionBooks. */
        getDimensionBooksPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionBooks by ParentDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByParentDimensionBookIDPageCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentDimensionBook based on the unique ID of the related DimensionBook.
         *  @return A single DimensionBook, or null. */
        getParentDimensionBook(api: API, callback: IAPICallback<DimensionBook>): void;
        /** Returns the related ParentDimensionBook based on the unique ID of the related DimensionBook.
         *  @param dimensionBookID The ID of the DimensionBook to retrieve.
         *  @return A single DimensionBook, or null. */
        static getParentDimensionBookForDimensionBook(dimensionBookID: number, api: API, callback: IAPICallback<DimensionBook>): void;
        /** Gets DimensionBooks by DimensionListID.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByDimensionListID(dimensionListID: number, api: API, callback: IAPICallback<Array<DimensionBook>>, page?: number): void;
        /** Gets how many DimensionBooks by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByDimensionListIDCount(dimensionListID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionBooks by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child DimensionBooks.
         *  @return An Array of DimensionBooks. */
        static getByDimensionListIDPageCount(dimensionListID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionList based on the unique ID of the related DimensionBook.
         *  @return A single DimensionBook, or null. */
        getDimensionList(api: API, callback: IAPICallback<DimensionBook>): void;
        /** Returns the related DimensionList based on the unique ID of the related DimensionBook.
         *  @param dimensionBookID The ID of the DimensionBook to retrieve.
         *  @return A single DimensionBook, or null. */
        static getDimensionListForDimensionBook(dimensionBookID: number, api: API, callback: IAPICallback<DimensionBook>): void;
        /** Gets a unique DimensionBook based on the provided values.
         *  @return A single DimensionBook, or null. */
        static getByKey(key: string, api: API, callback: IAPICallback<DimensionBook>): void;
    }
    /** Contains properties and static functionality for the DimensionBookRelation type. */
    class DimensionBookRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorDimensionBookID: PropertyMap;
            descendantDimensionBookID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorDimensionBookID: number;
        descendantDimensionBookID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the DimensionBookRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionBookRelations */
        static getAll(api: API, callback: IAPICallback<Array<DimensionBookRelation>>, page?: number): void;
        /** Gets how many DimensionBookRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DimensionBookRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DimensionBookRelation with the specified primary key.
         *  @param id The primary key of the DimensionBookRelation to return.
         *  @return The matching DimensionBookRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DimensionBookRelation>): void;
        /** Returns a filtered collection of DimensionBookRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionBookRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DimensionBookRelation>>, page?: number): void;
        /** Returns a count of how many DimensionBookRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionBookRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DimensionBookRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionBookRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DimensionBookRelations by AncestorDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByAncestorDimensionBookID(dimensionBookID: number, api: API, callback: IAPICallback<Array<DimensionBookRelation>>, page?: number): void;
        /** Gets how many DimensionBookRelations by AncestorDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByAncestorDimensionBookIDCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionBookRelations by AncestorDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByAncestorDimensionBookIDPageCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @return A single DimensionBookRelation, or null. */
        getAncestorDimensionBook(api: API, callback: IAPICallback<DimensionBookRelation>): void;
        /** Returns the related AncestorDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @param dimensionBookRelationID The ID of the DimensionBookRelation to retrieve.
         *  @return A single DimensionBookRelation, or null. */
        static getAncestorDimensionBookForDimensionBookRelation(dimensionBookRelationID: number, api: API, callback: IAPICallback<DimensionBookRelation>): void;
        /** Gets DimensionBookRelations by DescendantDimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByDescendantDimensionBookID(dimensionBookID: number, api: API, callback: IAPICallback<Array<DimensionBookRelation>>, page?: number): void;
        /** Gets how many DimensionBookRelations by DescendantDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByDescendantDimensionBookIDCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionBookRelations by DescendantDimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child DimensionBookRelations.
         *  @return An Array of DimensionBookRelations. */
        static getByDescendantDimensionBookIDPageCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @return A single DimensionBookRelation, or null. */
        getDescendantDimensionBook(api: API, callback: IAPICallback<DimensionBookRelation>): void;
        /** Returns the related DescendantDimensionBook based on the unique ID of the related DimensionBookRelation.
         *  @param dimensionBookRelationID The ID of the DimensionBookRelation to retrieve.
         *  @return A single DimensionBookRelation, or null. */
        static getDescendantDimensionBookForDimensionBookRelation(dimensionBookRelationID: number, api: API, callback: IAPICallback<DimensionBookRelation>): void;
    }
    /** Contains properties and static functionality for the DimensionGraph type. */
    class DimensionGraph extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            header: PropertyMap;
            label: PropertyMap;
            dimensionGraphLabel: PropertyMap;
            dimensionList: PropertyMap;
            dimensionValueIDList: PropertyMap;
            dimensionValueKeyList: PropertyMap;
            dimensionValueList: PropertyMap;
            dimensionCount: PropertyMap;
            headerSortOrder: PropertyMap;
            dimensionGraphSortOrder: PropertyMap;
            totalValue: PropertyMap;
            totalID: PropertyMap;
            totalKey: PropertyMap;
            totalSortOrder: PropertyMap;
            ageValue: PropertyMap;
            ageID: PropertyMap;
            ageKey: PropertyMap;
            ageSortOrder: PropertyMap;
            sexValue: PropertyMap;
            sexID: PropertyMap;
            sexKey: PropertyMap;
            sexSortOrder: PropertyMap;
            raceEthnicityValue: PropertyMap;
            raceEthnicityID: PropertyMap;
            raceEthnicityKey: PropertyMap;
            raceEthnicitySortOrder: PropertyMap;
            incomeAndPovertyStatusValue: PropertyMap;
            incomeAndPovertyStatusID: PropertyMap;
            incomeAndPovertyStatusKey: PropertyMap;
            incomeAndPovertyStatusSortOrder: PropertyMap;
            educationalAttainmentValue: PropertyMap;
            educationalAttainmentID: PropertyMap;
            educationalAttainmentKey: PropertyMap;
            educationalAttainmentSortOrder: PropertyMap;
            healthInsuranceStatusValue: PropertyMap;
            healthInsuranceStatusID: PropertyMap;
            healthInsuranceStatusKey: PropertyMap;
            healthInsuranceStatusSortOrder: PropertyMap;
            sexualOrientationValue: PropertyMap;
            sexualOrientationID: PropertyMap;
            sexualOrientationKey: PropertyMap;
            sexualOrientationSortOrder: PropertyMap;
            familyTypeValue: PropertyMap;
            familyTypeID: PropertyMap;
            familyTypeKey: PropertyMap;
            familyTypeSortOrder: PropertyMap;
            maritalStatusValue: PropertyMap;
            maritalStatusID: PropertyMap;
            maritalStatusKey: PropertyMap;
            maritalStatusSortOrder: PropertyMap;
            veteranStatusValue: PropertyMap;
            veteranStatusID: PropertyMap;
            veteranStatusKey: PropertyMap;
            veteranStatusSortOrder: PropertyMap;
            countryOfBirthValue: PropertyMap;
            countryOfBirthID: PropertyMap;
            countryOfBirthKey: PropertyMap;
            countryOfBirthSortOrder: PropertyMap;
            disabilityStatusValue: PropertyMap;
            disabilityStatusID: PropertyMap;
            disabilityStatusKey: PropertyMap;
            disabilityStatusSortOrder: PropertyMap;
            obesityStatusValue: PropertyMap;
            obesityStatusID: PropertyMap;
            obesityStatusKey: PropertyMap;
            obesityStatusSortOrder: PropertyMap;
            characteristicOfSchoolOrStudentValue: PropertyMap;
            characteristicOfSchoolOrStudentID: PropertyMap;
            characteristicOfSchoolOrStudentKey: PropertyMap;
            characteristicOfSchoolOrStudentSortOrder: PropertyMap;
            otherValue: PropertyMap;
            otherID: PropertyMap;
            otherKey: PropertyMap;
            otherSortOrder: PropertyMap;
            geographyValue: PropertyMap;
            geographyID: PropertyMap;
            geographyKey: PropertyMap;
            geographySortOrder: PropertyMap;
        };
        id: number;
        header: string;
        label: string;
        dimensionGraphLabel: string;
        dimensionList: string;
        dimensionValueIDList: string;
        dimensionValueKeyList: string;
        dimensionValueList: string;
        dimensionCount: number;
        headerSortOrder: number;
        dimensionGraphSortOrder: number;
        totalValue: string;
        totalID: number;
        totalKey: string;
        totalSortOrder: number;
        ageValue: string;
        ageID: number;
        ageKey: string;
        ageSortOrder: number;
        sexValue: string;
        sexID: number;
        sexKey: string;
        sexSortOrder: number;
        raceEthnicityValue: string;
        raceEthnicityID: number;
        raceEthnicityKey: string;
        raceEthnicitySortOrder: number;
        incomeAndPovertyStatusValue: string;
        incomeAndPovertyStatusID: number;
        incomeAndPovertyStatusKey: string;
        incomeAndPovertyStatusSortOrder: number;
        educationalAttainmentValue: string;
        educationalAttainmentID: number;
        educationalAttainmentKey: string;
        educationalAttainmentSortOrder: number;
        healthInsuranceStatusValue: string;
        healthInsuranceStatusID: number;
        healthInsuranceStatusKey: string;
        healthInsuranceStatusSortOrder: number;
        sexualOrientationValue: string;
        sexualOrientationID: number;
        sexualOrientationKey: string;
        sexualOrientationSortOrder: number;
        familyTypeValue: string;
        familyTypeID: number;
        familyTypeKey: string;
        familyTypeSortOrder: number;
        maritalStatusValue: string;
        maritalStatusID: number;
        maritalStatusKey: string;
        maritalStatusSortOrder: number;
        veteranStatusValue: string;
        veteranStatusID: number;
        veteranStatusKey: string;
        veteranStatusSortOrder: number;
        countryOfBirthValue: string;
        countryOfBirthID: number;
        countryOfBirthKey: string;
        countryOfBirthSortOrder: number;
        disabilityStatusValue: string;
        disabilityStatusID: number;
        disabilityStatusKey: string;
        disabilityStatusSortOrder: number;
        obesityStatusValue: string;
        obesityStatusID: number;
        obesityStatusKey: string;
        obesityStatusSortOrder: number;
        characteristicOfSchoolOrStudentValue: string;
        characteristicOfSchoolOrStudentID: number;
        characteristicOfSchoolOrStudentKey: string;
        characteristicOfSchoolOrStudentSortOrder: number;
        otherValue: string;
        otherID: number;
        otherKey: string;
        otherSortOrder: number;
        geographyValue: string;
        geographyID: number;
        geographyKey: string;
        geographySortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the DimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionGraphs */
        static getAll(api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DimensionGraphs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DimensionGraph with the specified primary key.
         *  @param id The primary key of the DimensionGraph to return.
         *  @return The matching DimensionGraph, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns a filtered collection of DimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionGraphs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Returns a count of how many DimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionGraphs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionGraphswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DimensionGraphs by TotalID.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByTotalID(totalID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by TotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByTotalIDCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by TotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByTotalIDPageCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Total based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getTotal(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related Total based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getTotalForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by AgeID.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByAgeID(ageID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by AgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByAgeIDCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by AgeID exist.
         *  @param ageID The ID of the Age for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByAgeIDPageCount(ageID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Age based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getAge(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related Age based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getAgeForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by SexID.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexID(sexID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by SexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexIDCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by SexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexIDPageCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Sex based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getSex(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related Sex based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getSexForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by RaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByRaceEthnicityID(raceEthnicityID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by RaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByRaceEthnicityIDCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by RaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByRaceEthnicityIDPageCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related RaceEthnicity based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getRaceEthnicity(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related RaceEthnicity based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getRaceEthnicityForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by IncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByIncomeAndPovertyStatusID(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by IncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByIncomeAndPovertyStatusIDCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by IncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByIncomeAndPovertyStatusIDPageCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IncomeAndPovertyStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getIncomeAndPovertyStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related IncomeAndPovertyStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getIncomeAndPovertyStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by EducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByEducationalAttainmentID(educationalAttainmentID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by EducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByEducationalAttainmentIDCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by EducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByEducationalAttainmentIDPageCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related EducationalAttainment based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getEducationalAttainment(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related EducationalAttainment based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getEducationalAttainmentForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by HealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByHealthInsuranceStatusID(healthInsuranceStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by HealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByHealthInsuranceStatusIDCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by HealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByHealthInsuranceStatusIDPageCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related HealthInsuranceStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getHealthInsuranceStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related HealthInsuranceStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getHealthInsuranceStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by SexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexualOrientationID(sexualOrientationID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by SexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexualOrientationIDCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by SexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getBySexualOrientationIDPageCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related SexualOrientation based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getSexualOrientation(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related SexualOrientation based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getSexualOrientationForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by FamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByFamilyTypeID(familyTypeID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by FamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByFamilyTypeIDCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by FamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByFamilyTypeIDPageCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related FamilyType based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getFamilyType(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related FamilyType based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getFamilyTypeForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by MaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByMaritalStatusID(maritalStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by MaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByMaritalStatusIDCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by MaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByMaritalStatusIDPageCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related MaritalStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getMaritalStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related MaritalStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getMaritalStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by VeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByVeteranStatusID(veteranStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by VeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByVeteranStatusIDCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by VeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByVeteranStatusIDPageCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related VeteranStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getVeteranStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related VeteranStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getVeteranStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by CountryOfBirthID.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCountryOfBirthID(countryOfBirthID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by CountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCountryOfBirthIDCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by CountryOfBirthID exist.
         *  @param countryOfBirthID The ID of the CountryOfBirth for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCountryOfBirthIDPageCount(countryOfBirthID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related CountryOfBirth based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getCountryOfBirth(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related CountryOfBirth based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getCountryOfBirthForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by DisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByDisabilityStatusID(disabilityStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by DisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByDisabilityStatusIDCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by DisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByDisabilityStatusIDPageCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DisabilityStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getDisabilityStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related DisabilityStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getDisabilityStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by ObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByObesityStatusID(obesityStatusID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by ObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByObesityStatusIDCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by ObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByObesityStatusIDPageCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ObesityStatus based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getObesityStatus(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related ObesityStatus based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getObesityStatusForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by CharacteristicOfSchoolOrStudentID.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCharacteristicOfSchoolOrStudentID(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by CharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCharacteristicOfSchoolOrStudentIDCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by CharacteristicOfSchoolOrStudentID exist.
         *  @param characteristicOfSchoolOrStudentID The ID of the CharacteristicOfSchoolOrStudent for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByCharacteristicOfSchoolOrStudentIDPageCount(characteristicOfSchoolOrStudentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related CharacteristicOfSchoolOrStudent based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getCharacteristicOfSchoolOrStudent(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related CharacteristicOfSchoolOrStudent based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getCharacteristicOfSchoolOrStudentForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by OtherID.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByOtherID(otherID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by OtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByOtherIDCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by OtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByOtherIDPageCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Other based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getOther(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related Other based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getOtherForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Gets DimensionGraphs by GeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByGeographyID(geographyID: number, api: API, callback: IAPICallback<Array<DimensionGraph>>, page?: number): void;
        /** Gets how many DimensionGraphs by GeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByGeographyIDCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DimensionGraphs by GeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child DimensionGraphs.
         *  @return An Array of DimensionGraphs. */
        static getByGeographyIDPageCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Geography based on the unique ID of the related DimensionGraph.
         *  @return A single DimensionGraph, or null. */
        getGeography(api: API, callback: IAPICallback<DimensionGraph>): void;
        /** Returns the related Geography based on the unique ID of the related DimensionGraph.
         *  @param dimensionGraphID The ID of the DimensionGraph to retrieve.
         *  @return A single DimensionGraph, or null. */
        static getGeographyForDimensionGraph(dimensionGraphID: number, api: API, callback: IAPICallback<DimensionGraph>): void;
    }
    /** Contains properties and static functionality for the DimensionList type. */
    class DimensionList extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            singular: PropertyMap;
            descriptiveName: PropertyMap;
            singularDescriptiveName: PropertyMap;
            IsActive: PropertyMap;
        };
        id: number;
        singular: string;
        descriptiveName: string;
        singularDescriptiveName: string;
        IsActive: boolean;
        protected getFields(): any;
        /** Gets a list of all of the DimensionLists in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DimensionLists */
        static getAll(api: API, callback: IAPICallback<Array<DimensionList>>, page?: number): void;
        /** Gets how many DimensionLists exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DimensionLists method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DimensionList with the specified primary key.
         *  @param id The primary key of the DimensionList to return.
         *  @return The matching DimensionList, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DimensionList>): void;
        /** Returns a filtered collection of DimensionLists based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DimensionLists which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DimensionList>>, page?: number): void;
        /** Returns a count of how many DimensionLists exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DimensionLists which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DimensionLists exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DimensionListswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the DisabilityStatus type. */
    class DisabilityStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentDisabilityStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentDisabilityStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the DisabilityStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DisabilityStatuses */
        static getAll(api: API, callback: IAPICallback<Array<DisabilityStatus>>, page?: number): void;
        /** Gets how many DisabilityStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DisabilityStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DisabilityStatus with the specified primary key.
         *  @param id The primary key of the DisabilityStatus to return.
         *  @return The matching DisabilityStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DisabilityStatus>): void;
        /** Returns a filtered collection of DisabilityStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DisabilityStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DisabilityStatus>>, page?: number): void;
        /** Returns a count of how many DisabilityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DisabilityStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DisabilityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DisabilityStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DisabilityStatuses by ParentDisabilityStatusID.
         *  @return An Array of DisabilityStatuses. */
        getDisabilityStatuses(api: API, callback: IAPICallback<Array<DisabilityStatus>>, page?: number): void;
        /** Gets DisabilityStatuses by ParentDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        static getByParentDisabilityStatusID(disabilityStatusID: number, api: API, callback: IAPICallback<Array<DisabilityStatus>>, page?: number): void;
        /** Gets how many DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @return An Array of DisabilityStatuses. */
        getDisabilityStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        static getByParentDisabilityStatusIDCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @return An Array of DisabilityStatuses. */
        getDisabilityStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DisabilityStatuses by ParentDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatuses.
         *  @return An Array of DisabilityStatuses. */
        static getByParentDisabilityStatusIDPageCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentDisabilityStatus based on the unique ID of the related DisabilityStatus.
         *  @return A single DisabilityStatus, or null. */
        getParentDisabilityStatus(api: API, callback: IAPICallback<DisabilityStatus>): void;
        /** Returns the related ParentDisabilityStatus based on the unique ID of the related DisabilityStatus.
         *  @param disabilityStatusID The ID of the DisabilityStatus to retrieve.
         *  @return A single DisabilityStatus, or null. */
        static getParentDisabilityStatusForDisabilityStatus(disabilityStatusID: number, api: API, callback: IAPICallback<DisabilityStatus>): void;
    }
    /** Contains properties and static functionality for the DisabilityStatusRelation type. */
    class DisabilityStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorDisabilityStatusID: PropertyMap;
            descendantDisabilityStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorDisabilityStatusID: number;
        descendantDisabilityStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the DisabilityStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of DisabilityStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<DisabilityStatusRelation>>, page?: number): void;
        /** Gets how many DisabilityStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the DisabilityStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the DisabilityStatusRelation with the specified primary key.
         *  @param id The primary key of the DisabilityStatusRelation to return.
         *  @return The matching DisabilityStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<DisabilityStatusRelation>): void;
        /** Returns a filtered collection of DisabilityStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All DisabilityStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<DisabilityStatusRelation>>, page?: number): void;
        /** Returns a count of how many DisabilityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of DisabilityStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of DisabilityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of DisabilityStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets DisabilityStatusRelations by AncestorDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByAncestorDisabilityStatusID(disabilityStatusID: number, api: API, callback: IAPICallback<Array<DisabilityStatusRelation>>, page?: number): void;
        /** Gets how many DisabilityStatusRelations by AncestorDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByAncestorDisabilityStatusIDCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DisabilityStatusRelations by AncestorDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByAncestorDisabilityStatusIDPageCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @return A single DisabilityStatusRelation, or null. */
        getAncestorDisabilityStatus(api: API, callback: IAPICallback<DisabilityStatusRelation>): void;
        /** Returns the related AncestorDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @param disabilityStatusRelationID The ID of the DisabilityStatusRelation to retrieve.
         *  @return A single DisabilityStatusRelation, or null. */
        static getAncestorDisabilityStatusForDisabilityStatusRelation(disabilityStatusRelationID: number, api: API, callback: IAPICallback<DisabilityStatusRelation>): void;
        /** Gets DisabilityStatusRelations by DescendantDisabilityStatusID.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByDescendantDisabilityStatusID(disabilityStatusID: number, api: API, callback: IAPICallback<Array<DisabilityStatusRelation>>, page?: number): void;
        /** Gets how many DisabilityStatusRelations by DescendantDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByDescendantDisabilityStatusIDCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of DisabilityStatusRelations by DescendantDisabilityStatusID exist.
         *  @param disabilityStatusID The ID of the DisabilityStatus for which to retrieve the child DisabilityStatusRelations.
         *  @return An Array of DisabilityStatusRelations. */
        static getByDescendantDisabilityStatusIDPageCount(disabilityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @return A single DisabilityStatusRelation, or null. */
        getDescendantDisabilityStatus(api: API, callback: IAPICallback<DisabilityStatusRelation>): void;
        /** Returns the related DescendantDisabilityStatus based on the unique ID of the related DisabilityStatusRelation.
         *  @param disabilityStatusRelationID The ID of the DisabilityStatusRelation to retrieve.
         *  @return A single DisabilityStatusRelation, or null. */
        static getDescendantDisabilityStatusForDisabilityStatusRelation(disabilityStatusRelationID: number, api: API, callback: IAPICallback<DisabilityStatusRelation>): void;
    }
    /** Contains properties and static functionality for the EducationalAttainment type. */
    class EducationalAttainment extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentEducationalAttainmentID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentEducationalAttainmentID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the EducationalAttainments in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of EducationalAttainments */
        static getAll(api: API, callback: IAPICallback<Array<EducationalAttainment>>, page?: number): void;
        /** Gets how many EducationalAttainments exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the EducationalAttainments method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the EducationalAttainment with the specified primary key.
         *  @param id The primary key of the EducationalAttainment to return.
         *  @return The matching EducationalAttainment, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<EducationalAttainment>): void;
        /** Returns a filtered collection of EducationalAttainments based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All EducationalAttainments which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<EducationalAttainment>>, page?: number): void;
        /** Returns a count of how many EducationalAttainments exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of EducationalAttainments which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of EducationalAttainments exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of EducationalAttainmentswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets EducationalAttainments by ParentEducationalAttainmentID.
         *  @return An Array of EducationalAttainments. */
        getEducationalAttainments(api: API, callback: IAPICallback<Array<EducationalAttainment>>, page?: number): void;
        /** Gets EducationalAttainments by ParentEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        static getByParentEducationalAttainmentID(educationalAttainmentID: number, api: API, callback: IAPICallback<Array<EducationalAttainment>>, page?: number): void;
        /** Gets how many EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @return An Array of EducationalAttainments. */
        getEducationalAttainmentsCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        static getByParentEducationalAttainmentIDCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @return An Array of EducationalAttainments. */
        getEducationalAttainmentsPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of EducationalAttainments by ParentEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainments.
         *  @return An Array of EducationalAttainments. */
        static getByParentEducationalAttainmentIDPageCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentEducationalAttainment based on the unique ID of the related EducationalAttainment.
         *  @return A single EducationalAttainment, or null. */
        getParentEducationalAttainment(api: API, callback: IAPICallback<EducationalAttainment>): void;
        /** Returns the related ParentEducationalAttainment based on the unique ID of the related EducationalAttainment.
         *  @param educationalAttainmentID The ID of the EducationalAttainment to retrieve.
         *  @return A single EducationalAttainment, or null. */
        static getParentEducationalAttainmentForEducationalAttainment(educationalAttainmentID: number, api: API, callback: IAPICallback<EducationalAttainment>): void;
    }
    /** Contains properties and static functionality for the EducationalAttainmentRelation type. */
    class EducationalAttainmentRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorEducationalAttainmentID: PropertyMap;
            descendantEducationalAttainmentID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorEducationalAttainmentID: number;
        descendantEducationalAttainmentID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the EducationalAttainmentRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of EducationalAttainmentRelations */
        static getAll(api: API, callback: IAPICallback<Array<EducationalAttainmentRelation>>, page?: number): void;
        /** Gets how many EducationalAttainmentRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the EducationalAttainmentRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the EducationalAttainmentRelation with the specified primary key.
         *  @param id The primary key of the EducationalAttainmentRelation to return.
         *  @return The matching EducationalAttainmentRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<EducationalAttainmentRelation>): void;
        /** Returns a filtered collection of EducationalAttainmentRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All EducationalAttainmentRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<EducationalAttainmentRelation>>, page?: number): void;
        /** Returns a count of how many EducationalAttainmentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of EducationalAttainmentRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of EducationalAttainmentRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of EducationalAttainmentRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets EducationalAttainmentRelations by AncestorEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByAncestorEducationalAttainmentID(educationalAttainmentID: number, api: API, callback: IAPICallback<Array<EducationalAttainmentRelation>>, page?: number): void;
        /** Gets how many EducationalAttainmentRelations by AncestorEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByAncestorEducationalAttainmentIDCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of EducationalAttainmentRelations by AncestorEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByAncestorEducationalAttainmentIDPageCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @return A single EducationalAttainmentRelation, or null. */
        getAncestorducationalAttainment(api: API, callback: IAPICallback<EducationalAttainmentRelation>): void;
        /** Returns the related AncestorducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @param educationalAttainmentRelationID The ID of the EducationalAttainmentRelation to retrieve.
         *  @return A single EducationalAttainmentRelation, or null. */
        static getAncestorducationalAttainmentForEducationalAttainmentRelation(educationalAttainmentRelationID: number, api: API, callback: IAPICallback<EducationalAttainmentRelation>): void;
        /** Gets EducationalAttainmentRelations by DescendantEducationalAttainmentID.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByDescendantEducationalAttainmentID(educationalAttainmentID: number, api: API, callback: IAPICallback<Array<EducationalAttainmentRelation>>, page?: number): void;
        /** Gets how many EducationalAttainmentRelations by DescendantEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByDescendantEducationalAttainmentIDCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of EducationalAttainmentRelations by DescendantEducationalAttainmentID exist.
         *  @param educationalAttainmentID The ID of the EducationalAttainment for which to retrieve the child EducationalAttainmentRelations.
         *  @return An Array of EducationalAttainmentRelations. */
        static getByDescendantEducationalAttainmentIDPageCount(educationalAttainmentID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantEducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @return A single EducationalAttainmentRelation, or null. */
        getDescendantEducationalAttainment(api: API, callback: IAPICallback<EducationalAttainmentRelation>): void;
        /** Returns the related DescendantEducationalAttainment based on the unique ID of the related EducationalAttainmentRelation.
         *  @param educationalAttainmentRelationID The ID of the EducationalAttainmentRelation to retrieve.
         *  @return A single EducationalAttainmentRelation, or null. */
        static getDescendantEducationalAttainmentForEducationalAttainmentRelation(educationalAttainmentRelationID: number, api: API, callback: IAPICallback<EducationalAttainmentRelation>): void;
    }
    /** Contains properties and static functionality for the FamilyType type. */
    class FamilyType extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentFamilyTypeID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentFamilyTypeID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the FamilyTypes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of FamilyTypes */
        static getAll(api: API, callback: IAPICallback<Array<FamilyType>>, page?: number): void;
        /** Gets how many FamilyTypes exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the FamilyTypes method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the FamilyType with the specified primary key.
         *  @param id The primary key of the FamilyType to return.
         *  @return The matching FamilyType, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<FamilyType>): void;
        /** Returns a filtered collection of FamilyTypes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All FamilyTypes which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<FamilyType>>, page?: number): void;
        /** Returns a count of how many FamilyTypes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of FamilyTypes which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of FamilyTypes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of FamilyTypeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets FamilyTypes by ParentFamilyTypeID.
         *  @return An Array of FamilyTypes. */
        getFamilyTypes(api: API, callback: IAPICallback<Array<FamilyType>>, page?: number): void;
        /** Gets FamilyTypes by ParentFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        static getByParentFamilyTypeID(familyTypeID: number, api: API, callback: IAPICallback<Array<FamilyType>>, page?: number): void;
        /** Gets how many FamilyTypes by ParentFamilyTypeID exist.
         *  @return An Array of FamilyTypes. */
        getFamilyTypesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many FamilyTypes by ParentFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        static getByParentFamilyTypeIDCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of FamilyTypes by ParentFamilyTypeID exist.
         *  @return An Array of FamilyTypes. */
        getFamilyTypesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of FamilyTypes by ParentFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypes.
         *  @return An Array of FamilyTypes. */
        static getByParentFamilyTypeIDPageCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentFamilyType based on the unique ID of the related FamilyType.
         *  @return A single FamilyType, or null. */
        getParentFamilyType(api: API, callback: IAPICallback<FamilyType>): void;
        /** Returns the related ParentFamilyType based on the unique ID of the related FamilyType.
         *  @param familyTypeID The ID of the FamilyType to retrieve.
         *  @return A single FamilyType, or null. */
        static getParentFamilyTypeForFamilyType(familyTypeID: number, api: API, callback: IAPICallback<FamilyType>): void;
    }
    /** Contains properties and static functionality for the FamilyTypeRelation type. */
    class FamilyTypeRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorFamilyTypeID: PropertyMap;
            descendantFamilyTypeID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorFamilyTypeID: number;
        descendantFamilyTypeID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the FamilyTypeRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of FamilyTypeRelations */
        static getAll(api: API, callback: IAPICallback<Array<FamilyTypeRelation>>, page?: number): void;
        /** Gets how many FamilyTypeRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the FamilyTypeRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the FamilyTypeRelation with the specified primary key.
         *  @param id The primary key of the FamilyTypeRelation to return.
         *  @return The matching FamilyTypeRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<FamilyTypeRelation>): void;
        /** Returns a filtered collection of FamilyTypeRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All FamilyTypeRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<FamilyTypeRelation>>, page?: number): void;
        /** Returns a count of how many FamilyTypeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of FamilyTypeRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of FamilyTypeRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of FamilyTypeRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets FamilyTypeRelations by AncestorFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByAncestorFamilyTypeID(familyTypeID: number, api: API, callback: IAPICallback<Array<FamilyTypeRelation>>, page?: number): void;
        /** Gets how many FamilyTypeRelations by AncestorFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByAncestorFamilyTypeIDCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of FamilyTypeRelations by AncestorFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByAncestorFamilyTypeIDPageCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @return A single FamilyTypeRelation, or null. */
        getAncestorFamilyType(api: API, callback: IAPICallback<FamilyTypeRelation>): void;
        /** Returns the related AncestorFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @param familyTypeRelationID The ID of the FamilyTypeRelation to retrieve.
         *  @return A single FamilyTypeRelation, or null. */
        static getAncestorFamilyTypeForFamilyTypeRelation(familyTypeRelationID: number, api: API, callback: IAPICallback<FamilyTypeRelation>): void;
        /** Gets FamilyTypeRelations by DescendantFamilyTypeID.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByDescendantFamilyTypeID(familyTypeID: number, api: API, callback: IAPICallback<Array<FamilyTypeRelation>>, page?: number): void;
        /** Gets how many FamilyTypeRelations by DescendantFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByDescendantFamilyTypeIDCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of FamilyTypeRelations by DescendantFamilyTypeID exist.
         *  @param familyTypeID The ID of the FamilyType for which to retrieve the child FamilyTypeRelations.
         *  @return An Array of FamilyTypeRelations. */
        static getByDescendantFamilyTypeIDPageCount(familyTypeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @return A single FamilyTypeRelation, or null. */
        getDescendantFamilyType(api: API, callback: IAPICallback<FamilyTypeRelation>): void;
        /** Returns the related DescendantFamilyType based on the unique ID of the related FamilyTypeRelation.
         *  @param familyTypeRelationID The ID of the FamilyTypeRelation to retrieve.
         *  @return A single FamilyTypeRelation, or null. */
        static getDescendantFamilyTypeForFamilyTypeRelation(familyTypeRelationID: number, api: API, callback: IAPICallback<FamilyTypeRelation>): void;
    }
    /** Contains properties and static functionality for the Geography type. */
    class Geography extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentGeographyID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentGeographyID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the Geographies in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Geographies */
        static getAll(api: API, callback: IAPICallback<Array<Geography>>, page?: number): void;
        /** Gets how many Geographies exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Geographies method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Geography with the specified primary key.
         *  @param id The primary key of the Geography to return.
         *  @return The matching Geography, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Geography>): void;
        /** Returns a filtered collection of Geographies based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Geographies which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Geography>>, page?: number): void;
        /** Returns a count of how many Geographies exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Geographies which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Geographies exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Geographieswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Geographies by ParentGeographyID.
         *  @return An Array of Geographies. */
        getGeographies(api: API, callback: IAPICallback<Array<Geography>>, page?: number): void;
        /** Gets Geographies by ParentGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        static getByParentGeographyID(geographyID: number, api: API, callback: IAPICallback<Array<Geography>>, page?: number): void;
        /** Gets how many Geographies by ParentGeographyID exist.
         *  @return An Array of Geographies. */
        getGeographiesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Geographies by ParentGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        static getByParentGeographyIDCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Geographies by ParentGeographyID exist.
         *  @return An Array of Geographies. */
        getGeographiesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Geographies by ParentGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child Geographies.
         *  @return An Array of Geographies. */
        static getByParentGeographyIDPageCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentGeography based on the unique ID of the related Geography.
         *  @return A single Geography, or null. */
        getParentGeography(api: API, callback: IAPICallback<Geography>): void;
        /** Returns the related ParentGeography based on the unique ID of the related Geography.
         *  @param geographyID The ID of the Geography to retrieve.
         *  @return A single Geography, or null. */
        static getParentGeographyForGeography(geographyID: number, api: API, callback: IAPICallback<Geography>): void;
    }
    /** Contains properties and static functionality for the GeographyRelation type. */
    class GeographyRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorGeographyID: PropertyMap;
            descendantGeographyID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorGeographyID: number;
        descendantGeographyID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the GeographyRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of GeographyRelations */
        static getAll(api: API, callback: IAPICallback<Array<GeographyRelation>>, page?: number): void;
        /** Gets how many GeographyRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the GeographyRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the GeographyRelation with the specified primary key.
         *  @param id The primary key of the GeographyRelation to return.
         *  @return The matching GeographyRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<GeographyRelation>): void;
        /** Returns a filtered collection of GeographyRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All GeographyRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<GeographyRelation>>, page?: number): void;
        /** Returns a count of how many GeographyRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of GeographyRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of GeographyRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of GeographyRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets GeographyRelations by AncestorGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByAncestorGeographyID(geographyID: number, api: API, callback: IAPICallback<Array<GeographyRelation>>, page?: number): void;
        /** Gets how many GeographyRelations by AncestorGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByAncestorGeographyIDCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of GeographyRelations by AncestorGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByAncestorGeographyIDPageCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorGeography based on the unique ID of the related GeographyRelation.
         *  @return A single GeographyRelation, or null. */
        getAncestorGeography(api: API, callback: IAPICallback<GeographyRelation>): void;
        /** Returns the related AncestorGeography based on the unique ID of the related GeographyRelation.
         *  @param geographyRelationID The ID of the GeographyRelation to retrieve.
         *  @return A single GeographyRelation, or null. */
        static getAncestorGeographyForGeographyRelation(geographyRelationID: number, api: API, callback: IAPICallback<GeographyRelation>): void;
        /** Gets GeographyRelations by DescendantGeographyID.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByDescendantGeographyID(geographyID: number, api: API, callback: IAPICallback<Array<GeographyRelation>>, page?: number): void;
        /** Gets how many GeographyRelations by DescendantGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByDescendantGeographyIDCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of GeographyRelations by DescendantGeographyID exist.
         *  @param geographyID The ID of the Geography for which to retrieve the child GeographyRelations.
         *  @return An Array of GeographyRelations. */
        static getByDescendantGeographyIDPageCount(geographyID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantGeography based on the unique ID of the related GeographyRelation.
         *  @return A single GeographyRelation, or null. */
        getDescendantGeography(api: API, callback: IAPICallback<GeographyRelation>): void;
        /** Returns the related DescendantGeography based on the unique ID of the related GeographyRelation.
         *  @param geographyRelationID The ID of the GeographyRelation to retrieve.
         *  @return A single GeographyRelation, or null. */
        static getDescendantGeographyForGeographyRelation(geographyRelationID: number, api: API, callback: IAPICallback<GeographyRelation>): void;
    }
    /** Contains properties and static functionality for the GlossaryTerm type. */
    class GlossaryTerm extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            term: PropertyMap;
            definition: PropertyMap;
            source: PropertyMap;
            sourceUrl1ID: PropertyMap;
            sourceUrl2ID: PropertyMap;
            modificationDate: PropertyMap;
        };
        id: number;
        term: string;
        definition: string;
        source: string;
        sourceUrl1ID: number;
        sourceUrl2ID: number;
        modificationDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the GlossaryTerms in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of GlossaryTerms */
        static getAll(api: API, callback: IAPICallback<Array<GlossaryTerm>>, page?: number): void;
        /** Gets how many GlossaryTerms exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the GlossaryTerms method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the GlossaryTerm with the specified primary key.
         *  @param id The primary key of the GlossaryTerm to return.
         *  @return The matching GlossaryTerm, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<GlossaryTerm>): void;
        /** Returns a filtered collection of GlossaryTerms based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All GlossaryTerms which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<GlossaryTerm>>, page?: number): void;
        /** Returns a count of how many GlossaryTerms exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of GlossaryTerms which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of GlossaryTerms exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of GlossaryTermswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets GlossaryTerms by SourceUrl1ID.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl1ID(urlID: number, api: API, callback: IAPICallback<Array<GlossaryTerm>>, page?: number): void;
        /** Gets how many GlossaryTerms by SourceUrl1ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl1IDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of GlossaryTerms by SourceUrl1ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl1IDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related SourceUrl1 based on the unique ID of the related GlossaryTerm.
         *  @return A single GlossaryTerm, or null. */
        getSourceUrl1(api: API, callback: IAPICallback<GlossaryTerm>): void;
        /** Returns the related SourceUrl1 based on the unique ID of the related GlossaryTerm.
         *  @param glossaryTermID The ID of the GlossaryTerm to retrieve.
         *  @return A single GlossaryTerm, or null. */
        static getSourceUrl1ForGlossaryTerm(glossaryTermID: number, api: API, callback: IAPICallback<GlossaryTerm>): void;
        /** Gets GlossaryTerms by SourceUrl2ID.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl2ID(urlID: number, api: API, callback: IAPICallback<Array<GlossaryTerm>>, page?: number): void;
        /** Gets how many GlossaryTerms by SourceUrl2ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl2IDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of GlossaryTerms by SourceUrl2ID exist.
         *  @param urlID The ID of the Url for which to retrieve the child GlossaryTerms.
         *  @return An Array of GlossaryTerms. */
        static getBySourceUrl2IDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related SourceUrl2 based on the unique ID of the related GlossaryTerm.
         *  @return A single GlossaryTerm, or null. */
        getSourceUrl2(api: API, callback: IAPICallback<GlossaryTerm>): void;
        /** Returns the related SourceUrl2 based on the unique ID of the related GlossaryTerm.
         *  @param glossaryTermID The ID of the GlossaryTerm to retrieve.
         *  @return A single GlossaryTerm, or null. */
        static getSourceUrl2ForGlossaryTerm(glossaryTermID: number, api: API, callback: IAPICallback<GlossaryTerm>): void;
    }
    /** Contains properties and static functionality for the HealthInsuranceStatus type. */
    class HealthInsuranceStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentHealthInsuranceStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentHealthInsuranceStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the HealthInsuranceStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HealthInsuranceStatuses */
        static getAll(api: API, callback: IAPICallback<Array<HealthInsuranceStatus>>, page?: number): void;
        /** Gets how many HealthInsuranceStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the HealthInsuranceStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the HealthInsuranceStatus with the specified primary key.
         *  @param id The primary key of the HealthInsuranceStatus to return.
         *  @return The matching HealthInsuranceStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<HealthInsuranceStatus>): void;
        /** Returns a filtered collection of HealthInsuranceStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HealthInsuranceStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<HealthInsuranceStatus>>, page?: number): void;
        /** Returns a count of how many HealthInsuranceStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HealthInsuranceStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of HealthInsuranceStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HealthInsuranceStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets HealthInsuranceStatuses by ParentHealthInsuranceStatusID.
         *  @return An Array of HealthInsuranceStatuses. */
        getHealthInsuranceStatuses(api: API, callback: IAPICallback<Array<HealthInsuranceStatus>>, page?: number): void;
        /** Gets HealthInsuranceStatuses by ParentHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        static getByParentHealthInsuranceStatusID(healthInsuranceStatusID: number, api: API, callback: IAPICallback<Array<HealthInsuranceStatus>>, page?: number): void;
        /** Gets how many HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @return An Array of HealthInsuranceStatuses. */
        getHealthInsuranceStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        static getByParentHealthInsuranceStatusIDCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @return An Array of HealthInsuranceStatuses. */
        getHealthInsuranceStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of HealthInsuranceStatuses by ParentHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatuses.
         *  @return An Array of HealthInsuranceStatuses. */
        static getByParentHealthInsuranceStatusIDPageCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatus.
         *  @return A single HealthInsuranceStatus, or null. */
        getParentHealthInsuranceStatus(api: API, callback: IAPICallback<HealthInsuranceStatus>): void;
        /** Returns the related ParentHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatus.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus to retrieve.
         *  @return A single HealthInsuranceStatus, or null. */
        static getParentHealthInsuranceStatusForHealthInsuranceStatus(healthInsuranceStatusID: number, api: API, callback: IAPICallback<HealthInsuranceStatus>): void;
    }
    /** Contains properties and static functionality for the HealthInsuranceStatusRelation type. */
    class HealthInsuranceStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorHealthInsuranceStatusID: PropertyMap;
            descendantHealthInsuranceStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorHealthInsuranceStatusID: number;
        descendantHealthInsuranceStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the HealthInsuranceStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HealthInsuranceStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<HealthInsuranceStatusRelation>>, page?: number): void;
        /** Gets how many HealthInsuranceStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the HealthInsuranceStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the HealthInsuranceStatusRelation with the specified primary key.
         *  @param id The primary key of the HealthInsuranceStatusRelation to return.
         *  @return The matching HealthInsuranceStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<HealthInsuranceStatusRelation>): void;
        /** Returns a filtered collection of HealthInsuranceStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HealthInsuranceStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<HealthInsuranceStatusRelation>>, page?: number): void;
        /** Returns a count of how many HealthInsuranceStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HealthInsuranceStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of HealthInsuranceStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HealthInsuranceStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByAncestorHealthInsuranceStatusID(healthInsuranceStatusID: number, api: API, callback: IAPICallback<Array<HealthInsuranceStatusRelation>>, page?: number): void;
        /** Gets how many HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByAncestorHealthInsuranceStatusIDCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of HealthInsuranceStatusRelations by AncestorHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByAncestorHealthInsuranceStatusIDPageCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        getAncestorHealthInsuranceStatus(api: API, callback: IAPICallback<HealthInsuranceStatusRelation>): void;
        /** Returns the related AncestorHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @param healthInsuranceStatusRelationID The ID of the HealthInsuranceStatusRelation to retrieve.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        static getAncestorHealthInsuranceStatusForHealthInsuranceStatusRelation(healthInsuranceStatusRelationID: number, api: API, callback: IAPICallback<HealthInsuranceStatusRelation>): void;
        /** Gets HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByDescendantHealthInsuranceStatusID(healthInsuranceStatusID: number, api: API, callback: IAPICallback<Array<HealthInsuranceStatusRelation>>, page?: number): void;
        /** Gets how many HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByDescendantHealthInsuranceStatusIDCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of HealthInsuranceStatusRelations by DescendantHealthInsuranceStatusID exist.
         *  @param healthInsuranceStatusID The ID of the HealthInsuranceStatus for which to retrieve the child HealthInsuranceStatusRelations.
         *  @return An Array of HealthInsuranceStatusRelations. */
        static getByDescendantHealthInsuranceStatusIDPageCount(healthInsuranceStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        getDescendantHealthInsuranceStatus(api: API, callback: IAPICallback<HealthInsuranceStatusRelation>): void;
        /** Returns the related DescendantHealthInsuranceStatus based on the unique ID of the related HealthInsuranceStatusRelation.
         *  @param healthInsuranceStatusRelationID The ID of the HealthInsuranceStatusRelation to retrieve.
         *  @return A single HealthInsuranceStatusRelation, or null. */
        static getDescendantHealthInsuranceStatusForHealthInsuranceStatusRelation(healthInsuranceStatusRelationID: number, api: API, callback: IAPICallback<HealthInsuranceStatusRelation>): void;
    }
    /** Contains properties and static functionality for the HP2020TSM type. */
    class HP2020TSM extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            HP2020TSMName: PropertyMap;
            modifyDate: PropertyMap;
        };
        id: number;
        HP2020TSMName: string;
        modifyDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the HP2020TSMs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of HP2020TSMs */
        static getAll(api: API, callback: IAPICallback<Array<HP2020TSM>>, page?: number): void;
        /** Gets how many HP2020TSMs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the HP2020TSMs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the HP2020TSM with the specified primary key.
         *  @param id The primary key of the HP2020TSM to return.
         *  @return The matching HP2020TSM, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<HP2020TSM>): void;
        /** Returns a filtered collection of HP2020TSMs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All HP2020TSMs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<HP2020TSM>>, page?: number): void;
        /** Returns a count of how many HP2020TSMs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of HP2020TSMs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of HP2020TSMs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of HP2020TSMswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the IncomeAndPovertyStatus type. */
    class IncomeAndPovertyStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentIncomeAndPovertyStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentIncomeAndPovertyStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the IncomeAndPovertyStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IncomeAndPovertyStatuses */
        static getAll(api: API, callback: IAPICallback<Array<IncomeAndPovertyStatus>>, page?: number): void;
        /** Gets how many IncomeAndPovertyStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IncomeAndPovertyStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IncomeAndPovertyStatus with the specified primary key.
         *  @param id The primary key of the IncomeAndPovertyStatus to return.
         *  @return The matching IncomeAndPovertyStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IncomeAndPovertyStatus>): void;
        /** Returns a filtered collection of IncomeAndPovertyStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IncomeAndPovertyStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IncomeAndPovertyStatus>>, page?: number): void;
        /** Returns a count of how many IncomeAndPovertyStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IncomeAndPovertyStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IncomeAndPovertyStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IncomeAndPovertyStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID.
         *  @return An Array of IncomeAndPovertyStatuses. */
        getIncomeAndPovertyStatuses(api: API, callback: IAPICallback<Array<IncomeAndPovertyStatus>>, page?: number): void;
        /** Gets IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        static getByParentIncomeAndPovertyStatusID(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<Array<IncomeAndPovertyStatus>>, page?: number): void;
        /** Gets how many IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @return An Array of IncomeAndPovertyStatuses. */
        getIncomeAndPovertyStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        static getByParentIncomeAndPovertyStatusIDCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @return An Array of IncomeAndPovertyStatuses. */
        getIncomeAndPovertyStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IncomeAndPovertyStatuses by ParentIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatuses.
         *  @return An Array of IncomeAndPovertyStatuses. */
        static getByParentIncomeAndPovertyStatusIDPageCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatus.
         *  @return A single IncomeAndPovertyStatus, or null. */
        getParentIncomeAndPovertyStatus(api: API, callback: IAPICallback<IncomeAndPovertyStatus>): void;
        /** Returns the related ParentIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatus.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus to retrieve.
         *  @return A single IncomeAndPovertyStatus, or null. */
        static getParentIncomeAndPovertyStatusForIncomeAndPovertyStatus(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<IncomeAndPovertyStatus>): void;
    }
    /** Contains properties and static functionality for the IncomeAndPovertyStatusRelation type. */
    class IncomeAndPovertyStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorIncomeAndPovertyStatusID: PropertyMap;
            descendantIncomeAndPovertyStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorIncomeAndPovertyStatusID: number;
        descendantIncomeAndPovertyStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the IncomeAndPovertyStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IncomeAndPovertyStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<IncomeAndPovertyStatusRelation>>, page?: number): void;
        /** Gets how many IncomeAndPovertyStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IncomeAndPovertyStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IncomeAndPovertyStatusRelation with the specified primary key.
         *  @param id The primary key of the IncomeAndPovertyStatusRelation to return.
         *  @return The matching IncomeAndPovertyStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IncomeAndPovertyStatusRelation>): void;
        /** Returns a filtered collection of IncomeAndPovertyStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IncomeAndPovertyStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IncomeAndPovertyStatusRelation>>, page?: number): void;
        /** Returns a count of how many IncomeAndPovertyStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IncomeAndPovertyStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IncomeAndPovertyStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IncomeAndPovertyStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByAncestorIncomeAndPovertyStatusID(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<Array<IncomeAndPovertyStatusRelation>>, page?: number): void;
        /** Gets how many IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByAncestorIncomeAndPovertyStatusIDCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IncomeAndPovertyStatusRelations by AncestorIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByAncestorIncomeAndPovertyStatusIDPageCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        getAncestorIncomeAndPovertyStatus(api: API, callback: IAPICallback<IncomeAndPovertyStatusRelation>): void;
        /** Returns the related AncestorIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @param incomeAndPovertyStatusRelationID The ID of the IncomeAndPovertyStatusRelation to retrieve.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        static getAncestorIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation(incomeAndPovertyStatusRelationID: number, api: API, callback: IAPICallback<IncomeAndPovertyStatusRelation>): void;
        /** Gets IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByDescendantIncomeAndPovertyStatusID(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<Array<IncomeAndPovertyStatusRelation>>, page?: number): void;
        /** Gets how many IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByDescendantIncomeAndPovertyStatusIDCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IncomeAndPovertyStatusRelations by DescendantIncomeAndPovertyStatusID exist.
         *  @param incomeAndPovertyStatusID The ID of the IncomeAndPovertyStatus for which to retrieve the child IncomeAndPovertyStatusRelations.
         *  @return An Array of IncomeAndPovertyStatusRelations. */
        static getByDescendantIncomeAndPovertyStatusIDPageCount(incomeAndPovertyStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        getDescendantIncomeAndPovertyStatus(api: API, callback: IAPICallback<IncomeAndPovertyStatusRelation>): void;
        /** Returns the related DescendantIncomeAndPovertyStatus based on the unique ID of the related IncomeAndPovertyStatusRelation.
         *  @param incomeAndPovertyStatusRelationID The ID of the IncomeAndPovertyStatusRelation to retrieve.
         *  @return A single IncomeAndPovertyStatusRelation, or null. */
        static getDescendantIncomeAndPovertyStatusForIncomeAndPovertyStatusRelation(incomeAndPovertyStatusRelationID: number, api: API, callback: IAPICallback<IncomeAndPovertyStatusRelation>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDataCategory type. */
    class IndicatorDescriptionDataCategory extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            dataCategoryID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        dataCategoryID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDataCategories in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDataCategories */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDataCategory>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataCategories exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDataCategories method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDataCategory with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDataCategory to return.
         *  @return The matching IndicatorDescriptionDataCategory, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDataCategory>): void;
        /** Returns a filtered collection of IndicatorDescriptionDataCategories based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDataCategories which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataCategory>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDataCategories which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDataCategories exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDataCategorieswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDataCategories by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataCategory>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataCategories by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDataCategories by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDataCategory>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @param indicatorDescriptionDataCategoryID The ID of the IndicatorDescriptionDataCategory to retrieve.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDataCategory(indicatorDescriptionDataCategoryID: number, api: API, callback: IAPICallback<IndicatorDescriptionDataCategory>): void;
        /** Gets IndicatorDescriptionDataCategories by DataCategoryID.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByDataCategoryID(dataCategoryID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataCategory>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataCategories by DataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByDataCategoryIDCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDataCategories by DataCategoryID exist.
         *  @param dataCategoryID The ID of the DataCategory for which to retrieve the child IndicatorDescriptionDataCategories.
         *  @return An Array of IndicatorDescriptionDataCategories. */
        static getByDataCategoryIDPageCount(dataCategoryID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DataCategory based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        getDataCategory(api: API, callback: IAPICallback<IndicatorDescriptionDataCategory>): void;
        /** Returns the related DataCategory based on the unique ID of the related IndicatorDescriptionDataCategory.
         *  @param indicatorDescriptionDataCategoryID The ID of the IndicatorDescriptionDataCategory to retrieve.
         *  @return A single IndicatorDescriptionDataCategory, or null. */
        static getDataCategoryForIndicatorDescriptionDataCategory(indicatorDescriptionDataCategoryID: number, api: API, callback: IAPICallback<IndicatorDescriptionDataCategory>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDataSource type. */
    class IndicatorDescriptionDataSource extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            dataDescription: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            dataSourceID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        dataDescription: IndicatorDescriptionDataSourceDataDescription;
        indicatorDescriptionID: number;
        dataSourceID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDataSources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDataSources */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDataSource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataSources exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDataSources method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDataSource with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDataSource to return.
         *  @return The matching IndicatorDescriptionDataSource, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDataSource>): void;
        /** Returns a filtered collection of IndicatorDescriptionDataSources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDataSources which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataSource>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDataSources which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDataSources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDataSourceswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDataSources by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataSource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataSources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDataSources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDataSource>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @param indicatorDescriptionDataSourceID The ID of the IndicatorDescriptionDataSource to retrieve.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDataSource(indicatorDescriptionDataSourceID: number, api: API, callback: IAPICallback<IndicatorDescriptionDataSource>): void;
        /** Gets IndicatorDescriptionDataSources by DataSourceID.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByDataSourceID(dataSourceID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDataSource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDataSources by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByDataSourceIDCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDataSources by DataSourceID exist.
         *  @param dataSourceID The ID of the DataSource for which to retrieve the child IndicatorDescriptionDataSources.
         *  @return An Array of IndicatorDescriptionDataSources. */
        static getByDataSourceIDPageCount(dataSourceID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DataSource based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        getDataSource(api: API, callback: IAPICallback<IndicatorDescriptionDataSource>): void;
        /** Returns the related DataSource based on the unique ID of the related IndicatorDescriptionDataSource.
         *  @param indicatorDescriptionDataSourceID The ID of the IndicatorDescriptionDataSource to retrieve.
         *  @return A single IndicatorDescriptionDataSource, or null. */
        static getDataSourceForIndicatorDescriptionDataSource(indicatorDescriptionDataSourceID: number, api: API, callback: IAPICallback<IndicatorDescriptionDataSource>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDefaultDimensionGraph type. */
    class IndicatorDescriptionDefaultDimensionGraph extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeLevelID: PropertyMap;
            dimensionGraphID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeLevelID: number;
        dimensionGraphID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDefaultDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDefaultDimensionGraphs */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDefaultDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDefaultDimensionGraphs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDefaultDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDefaultDimensionGraph to return.
         *  @return The matching IndicatorDescriptionDefaultDimensionGraph, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Returns a filtered collection of IndicatorDescriptionDefaultDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDefaultDimensionGraphs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDefaultDimensionGraph>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDefaultDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDefaultDimensionGraphs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDefaultDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDefaultDimensionGraphswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDefaultDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDefaultDimensionGraph(indicatorDescriptionDefaultDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByLocaleLevelID(localeLevelID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDefaultDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByLocaleLevelIDCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByLocaleLevelIDPageCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        getLocaleLevel(api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        static getLocaleLevelForIndicatorDescriptionDefaultDimensionGraph(indicatorDescriptionDefaultDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Gets IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByDimensionGraphID(dimensionGraphID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDefaultDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByDimensionGraphIDCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDefaultDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDefaultDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDefaultDimensionGraphs. */
        static getByDimensionGraphIDPageCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        getDimensionGraph(api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDefaultDimensionGraph.
         *  @param indicatorDescriptionDefaultDimensionGraphID The ID of the IndicatorDescriptionDefaultDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDefaultDimensionGraph, or null. */
        static getDimensionGraphForIndicatorDescriptionDefaultDimensionGraph(indicatorDescriptionDefaultDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDefaultDimensionGraph>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDimension type. */
    class IndicatorDescriptionDimension extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            dimensionListID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        dimensionListID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDimensions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensions */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDimension>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDimension with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimension to return.
         *  @return The matching IndicatorDescriptionDimension, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
        /** Returns a filtered collection of IndicatorDescriptionDimensions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimension>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDimensions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimension>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimension.
         *  @return A single IndicatorDescriptionDimension, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimension.
         *  @param indicatorDescriptionDimensionID The ID of the IndicatorDescriptionDimension to retrieve.
         *  @return A single IndicatorDescriptionDimension, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDimension(indicatorDescriptionDimensionID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
        /** Gets IndicatorDescriptionDimensions by DimensionListID.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByDimensionListID(dimensionListID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimension>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensions by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByDimensionListIDCount(dimensionListID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensions by DimensionListID exist.
         *  @param dimensionListID The ID of the DimensionList for which to retrieve the child IndicatorDescriptionDimensions.
         *  @return An Array of IndicatorDescriptionDimensions. */
        static getByDimensionListIDPageCount(dimensionListID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionList based on the unique ID of the related IndicatorDescriptionDimension.
         *  @return A single IndicatorDescriptionDimension, or null. */
        getDimensionList(api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
        /** Returns the related DimensionList based on the unique ID of the related IndicatorDescriptionDimension.
         *  @param indicatorDescriptionDimensionID The ID of the IndicatorDescriptionDimension to retrieve.
         *  @return A single IndicatorDescriptionDimension, or null. */
        static getDimensionListForIndicatorDescriptionDimension(indicatorDescriptionDimensionID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
        /** Gets a unique IndicatorDescriptionDimension based on the provided values.
         *  @return A single IndicatorDescriptionDimension, or null. */
        static getByIndicatorDescriptionIDAndDimensionListID(indicatorDescriptionID: string, dimensionListID: string, api: API, callback: IAPICallback<IndicatorDescriptionDimension>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDimensionGraph type. */
    class IndicatorDescriptionDimensionGraph extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeLevelID: PropertyMap;
            dimensionGraphID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeLevelID: number;
        dimensionGraphID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensionGraphs */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionGraphs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensionGraphs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimensionGraph to return.
         *  @return The matching IndicatorDescriptionDimensionGraph, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Returns a filtered collection of IndicatorDescriptionDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensionGraphs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionGraph>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensionGraphs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionGraphswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDimensionGraph(indicatorDescriptionDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Gets IndicatorDescriptionDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByLocaleLevelID(localeLevelID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByLocaleLevelIDCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByLocaleLevelIDPageCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        getLocaleLevel(api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        static getLocaleLevelForIndicatorDescriptionDimensionGraph(indicatorDescriptionDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Gets IndicatorDescriptionDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByDimensionGraphID(dimensionGraphID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByDimensionGraphIDCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDescriptionDimensionGraphs.
         *  @return An Array of IndicatorDescriptionDimensionGraphs. */
        static getByDimensionGraphIDPageCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        getDimensionGraph(api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDescriptionDimensionGraph.
         *  @param indicatorDescriptionDimensionGraphID The ID of the IndicatorDescriptionDimensionGraph to retrieve.
         *  @return A single IndicatorDescriptionDimensionGraph, or null. */
        static getDimensionGraphForIndicatorDescriptionDimensionGraph(indicatorDescriptionDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionGraph>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionDimensionValue type. */
    class IndicatorDescriptionDimensionValue extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            dimensionBookID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        dimensionBookID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionDimensionValues in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionDimensionValues */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionValue>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionValues exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionDimensionValues method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionDimensionValue with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionDimensionValue to return.
         *  @return The matching IndicatorDescriptionDimensionValue, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
        /** Returns a filtered collection of IndicatorDescriptionDimensionValues based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionDimensionValues which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionValue>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionDimensionValues exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionDimensionValues which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionDimensionValues exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionDimensionValueswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionDimensionValues by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionValue>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionValues by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensionValues by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @param indicatorDescriptionDimensionValueID The ID of the IndicatorDescriptionDimensionValue to retrieve.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionDimensionValue(indicatorDescriptionDimensionValueID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
        /** Gets IndicatorDescriptionDimensionValues by DimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByDimensionBookID(dimensionBookID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionDimensionValue>>, page?: number): void;
        /** Gets how many IndicatorDescriptionDimensionValues by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByDimensionBookIDCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionDimensionValues by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDescriptionDimensionValues.
         *  @return An Array of IndicatorDescriptionDimensionValues. */
        static getByDimensionBookIDPageCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        getDimensionBook(api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDescriptionDimensionValue.
         *  @param indicatorDescriptionDimensionValueID The ID of the IndicatorDescriptionDimensionValue to retrieve.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        static getDimensionBookForIndicatorDescriptionDimensionValue(indicatorDescriptionDimensionValueID: number, api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
        /** Gets a unique IndicatorDescriptionDimensionValue based on the provided values.
         *  @return A single IndicatorDescriptionDimensionValue, or null. */
        static getByIndicatorDescriptionIDAndDimensionBookID(indicatorDescriptionID: string, dimensionBookID: string, api: API, callback: IAPICallback<IndicatorDescriptionDimensionValue>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionInitiative type. */
    class IndicatorDescriptionInitiative extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            initiativeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        initiativeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionInitiatives in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionInitiatives */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionInitiative>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInitiatives exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionInitiatives method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionInitiative with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionInitiative to return.
         *  @return The matching IndicatorDescriptionInitiative, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionInitiative>): void;
        /** Returns a filtered collection of IndicatorDescriptionInitiatives based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionInitiatives which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionInitiative>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionInitiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionInitiatives which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionInitiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionInitiativeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionInitiatives by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionInitiative>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInitiatives by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionInitiatives by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionInitiative>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @param indicatorDescriptionInitiativeID The ID of the IndicatorDescriptionInitiative to retrieve.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionInitiative(indicatorDescriptionInitiativeID: number, api: API, callback: IAPICallback<IndicatorDescriptionInitiative>): void;
        /** Gets IndicatorDescriptionInitiatives by InitiativeID.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByInitiativeID(initiativeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionInitiative>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInitiatives by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByInitiativeIDCount(initiativeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionInitiatives by InitiativeID exist.
         *  @param initiativeID The ID of the Initiative for which to retrieve the child IndicatorDescriptionInitiatives.
         *  @return An Array of IndicatorDescriptionInitiatives. */
        static getByInitiativeIDPageCount(initiativeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Initiative based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        getInitiative(api: API, callback: IAPICallback<IndicatorDescriptionInitiative>): void;
        /** Returns the related Initiative based on the unique ID of the related IndicatorDescriptionInitiative.
         *  @param indicatorDescriptionInitiativeID The ID of the IndicatorDescriptionInitiative to retrieve.
         *  @return A single IndicatorDescriptionInitiative, or null. */
        static getInitiativeForIndicatorDescriptionInitiative(indicatorDescriptionInitiativeID: number, api: API, callback: IAPICallback<IndicatorDescriptionInitiative>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionIntervention type. */
    class IndicatorDescriptionIntervention extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            interventionID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        interventionID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionInterventions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionInterventions */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionIntervention>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInterventions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionInterventions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionIntervention with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionIntervention to return.
         *  @return The matching IndicatorDescriptionIntervention, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionIntervention>): void;
        /** Returns a filtered collection of IndicatorDescriptionInterventions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionInterventions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionIntervention>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionInterventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionInterventions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionInterventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionInterventionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionInterventions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionIntervention>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInterventions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionInterventions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionIntervention>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @param indicatorDescriptionInterventionID The ID of the IndicatorDescriptionIntervention to retrieve.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionIntervention(indicatorDescriptionInterventionID: number, api: API, callback: IAPICallback<IndicatorDescriptionIntervention>): void;
        /** Gets IndicatorDescriptionInterventions by InterventionID.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByInterventionID(interventionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionIntervention>>, page?: number): void;
        /** Gets how many IndicatorDescriptionInterventions by InterventionID exist.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByInterventionIDCount(interventionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionInterventions by InterventionID exist.
         *  @param interventionID The ID of the Intervention for which to retrieve the child IndicatorDescriptionInterventions.
         *  @return An Array of IndicatorDescriptionInterventions. */
        static getByInterventionIDPageCount(interventionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Interventions based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        getInterventions(api: API, callback: IAPICallback<IndicatorDescriptionIntervention>): void;
        /** Returns the related Interventions based on the unique ID of the related IndicatorDescriptionIntervention.
         *  @param indicatorDescriptionInterventionID The ID of the IndicatorDescriptionIntervention to retrieve.
         *  @return A single IndicatorDescriptionIntervention, or null. */
        static getInterventionsForIndicatorDescriptionIntervention(indicatorDescriptionInterventionID: number, api: API, callback: IAPICallback<IndicatorDescriptionIntervention>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionKeyword type. */
    class IndicatorDescriptionKeyword extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            keywordID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        keywordID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionKeywords in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionKeywords */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionKeyword>>, page?: number): void;
        /** Gets how many IndicatorDescriptionKeywords exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionKeywords method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionKeyword with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionKeyword to return.
         *  @return The matching IndicatorDescriptionKeyword, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
        /** Returns a filtered collection of IndicatorDescriptionKeywords based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionKeywords which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionKeyword>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionKeywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionKeywords which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionKeywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionKeywordswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionKeywords by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionKeyword>>, page?: number): void;
        /** Gets how many IndicatorDescriptionKeywords by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionKeywords by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @param indicatorDescriptionKeywordID The ID of the IndicatorDescriptionKeyword to retrieve.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionKeyword(indicatorDescriptionKeywordID: number, api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
        /** Gets IndicatorDescriptionKeywords by KeywordID.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByKeywordID(keywordID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionKeyword>>, page?: number): void;
        /** Gets how many IndicatorDescriptionKeywords by KeywordID exist.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByKeywordIDCount(keywordID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionKeywords by KeywordID exist.
         *  @param keywordID The ID of the Keyword for which to retrieve the child IndicatorDescriptionKeywords.
         *  @return An Array of IndicatorDescriptionKeywords. */
        static getByKeywordIDPageCount(keywordID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Keyword based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        getKeyword(api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
        /** Returns the related Keyword based on the unique ID of the related IndicatorDescriptionKeyword.
         *  @param indicatorDescriptionKeywordID The ID of the IndicatorDescriptionKeyword to retrieve.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        static getKeywordForIndicatorDescriptionKeyword(indicatorDescriptionKeywordID: number, api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
        /** Gets a unique IndicatorDescriptionKeyword based on the provided values.
         *  @return A single IndicatorDescriptionKeyword, or null. */
        static getByIndicatorDescriptionIDAndKeywordID(indicatorDescriptionID: string, keywordID: string, api: API, callback: IAPICallback<IndicatorDescriptionKeyword>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleCounty type. */
    class IndicatorDescriptionLocaleCounty extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionLocaleCounties in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleCounties */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleCounty>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleCounties exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleCounties method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionLocaleCounty with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleCounty to return.
         *  @return The matching IndicatorDescriptionLocaleCounty, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleCounty>): void;
        /** Returns a filtered collection of IndicatorDescriptionLocaleCounties based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleCounties which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleCounty>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionLocaleCounties exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleCounties which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionLocaleCounties exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleCountieswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionLocaleCounties by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleCounty>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleCounties by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleCounties by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionLocaleCounty>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @param indicatorDescriptionLocaleCountyID The ID of the IndicatorDescriptionLocaleCounty to retrieve.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionLocaleCounty(indicatorDescriptionLocaleCountyID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleCounty>): void;
        /** Gets IndicatorDescriptionLocaleCounties by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByLocaleID(localeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleCounty>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleCounties by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleCounties by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleCounties.
         *  @return An Array of IndicatorDescriptionLocaleCounties. */
        static getByLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        getLocale(api: API, callback: IAPICallback<IndicatorDescriptionLocaleCounty>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleCounty.
         *  @param indicatorDescriptionLocaleCountyID The ID of the IndicatorDescriptionLocaleCounty to retrieve.
         *  @return A single IndicatorDescriptionLocaleCounty, or null. */
        static getLocaleForIndicatorDescriptionLocaleCounty(indicatorDescriptionLocaleCountyID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleCounty>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleHospitalReferralRegion type. */
    class IndicatorDescriptionLocaleHospitalReferralRegion extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionLocaleHospitalReferralRegions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleHospitalReferralRegions */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleHospitalReferralRegion>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleHospitalReferralRegions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionLocaleHospitalReferralRegion with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleHospitalReferralRegion to return.
         *  @return The matching IndicatorDescriptionLocaleHospitalReferralRegion, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleHospitalReferralRegion>): void;
        /** Returns a filtered collection of IndicatorDescriptionLocaleHospitalReferralRegions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleHospitalReferralRegions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleHospitalReferralRegion>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionLocaleHospitalReferralRegions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleHospitalReferralRegions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionLocaleHospitalReferralRegions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleHospitalReferralRegionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleHospitalReferralRegion>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleHospitalReferralRegions by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionLocaleHospitalReferralRegion>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @param indicatorDescriptionLocaleHospitalReferralRegionID The ID of the IndicatorDescriptionLocaleHospitalReferralRegion to retrieve.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionLocaleHospitalReferralRegion(indicatorDescriptionLocaleHospitalReferralRegionID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleHospitalReferralRegion>): void;
        /** Gets IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByLocaleID(localeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleHospitalReferralRegion>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleHospitalReferralRegions by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleHospitalReferralRegions.
         *  @return An Array of IndicatorDescriptionLocaleHospitalReferralRegions. */
        static getByLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        getLocale(api: API, callback: IAPICallback<IndicatorDescriptionLocaleHospitalReferralRegion>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleHospitalReferralRegion.
         *  @param indicatorDescriptionLocaleHospitalReferralRegionID The ID of the IndicatorDescriptionLocaleHospitalReferralRegion to retrieve.
         *  @return A single IndicatorDescriptionLocaleHospitalReferralRegion, or null. */
        static getLocaleForIndicatorDescriptionLocaleHospitalReferralRegion(indicatorDescriptionLocaleHospitalReferralRegionID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleHospitalReferralRegion>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleLevel type. */
    class IndicatorDescriptionLocaleLevel extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeLevelID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeLevelID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionLocaleLevels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleLevels */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleLevel>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleLevels exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleLevels method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionLocaleLevel with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleLevel to return.
         *  @return The matching IndicatorDescriptionLocaleLevel, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleLevel>): void;
        /** Returns a filtered collection of IndicatorDescriptionLocaleLevels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleLevels which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleLevel>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionLocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleLevels which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionLocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleLevelswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionLocaleLevels by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleLevel>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleLevels by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleLevels by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionLocaleLevel>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @param indicatorDescriptionLocaleLevelID The ID of the IndicatorDescriptionLocaleLevel to retrieve.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionLocaleLevel(indicatorDescriptionLocaleLevelID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleLevel>): void;
        /** Gets IndicatorDescriptionLocaleLevels by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByLocaleLevelID(localeLevelID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleLevel>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleLevels by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByLocaleLevelIDCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleLevels by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDescriptionLocaleLevels.
         *  @return An Array of IndicatorDescriptionLocaleLevels. */
        static getByLocaleLevelIDPageCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        getLocaleLevel(api: API, callback: IAPICallback<IndicatorDescriptionLocaleLevel>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDescriptionLocaleLevel.
         *  @param indicatorDescriptionLocaleLevelID The ID of the IndicatorDescriptionLocaleLevel to retrieve.
         *  @return A single IndicatorDescriptionLocaleLevel, or null. */
        static getLocaleLevelForIndicatorDescriptionLocaleLevel(indicatorDescriptionLocaleLevelID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleLevel>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionLocale type. */
    class IndicatorDescriptionLocale extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionLocales in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocales */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionLocale>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocales exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionLocales method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionLocale with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocale to return.
         *  @return The matching IndicatorDescriptionLocale, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionLocale>): void;
        /** Returns a filtered collection of IndicatorDescriptionLocales based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocales which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocale>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionLocales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocales which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionLocales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionLocales by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocale>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocales by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocales by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocale.
         *  @return A single IndicatorDescriptionLocale, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionLocale>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocale.
         *  @param indicatorDescriptionLocaleID The ID of the IndicatorDescriptionLocale to retrieve.
         *  @return A single IndicatorDescriptionLocale, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionLocale(indicatorDescriptionLocaleID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocale>): void;
        /** Gets IndicatorDescriptionLocales by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByLocaleID(localeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocale>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocales by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocales by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocales.
         *  @return An Array of IndicatorDescriptionLocales. */
        static getByLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocale.
         *  @return A single IndicatorDescriptionLocale, or null. */
        getLocale(api: API, callback: IAPICallback<IndicatorDescriptionLocale>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocale.
         *  @param indicatorDescriptionLocaleID The ID of the IndicatorDescriptionLocale to retrieve.
         *  @return A single IndicatorDescriptionLocale, or null. */
        static getLocaleForIndicatorDescriptionLocale(indicatorDescriptionLocaleID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocale>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionLocaleState type. */
    class IndicatorDescriptionLocaleState extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionLocaleStates in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionLocaleStates */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleState>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleStates exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionLocaleStates method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionLocaleState with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionLocaleState to return.
         *  @return The matching IndicatorDescriptionLocaleState, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleState>): void;
        /** Returns a filtered collection of IndicatorDescriptionLocaleStates based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionLocaleStates which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleState>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionLocaleStates exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionLocaleStates which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionLocaleStates exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionLocaleStateswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionLocaleStates by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleState>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleStates by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleStates by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionLocaleState>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @param indicatorDescriptionLocaleStateID The ID of the IndicatorDescriptionLocaleState to retrieve.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionLocaleState(indicatorDescriptionLocaleStateID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleState>): void;
        /** Gets IndicatorDescriptionLocaleStates by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByLocaleID(localeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionLocaleState>>, page?: number): void;
        /** Gets how many IndicatorDescriptionLocaleStates by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionLocaleStates by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child IndicatorDescriptionLocaleStates.
         *  @return An Array of IndicatorDescriptionLocaleStates. */
        static getByLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        getLocale(api: API, callback: IAPICallback<IndicatorDescriptionLocaleState>): void;
        /** Returns the related Locale based on the unique ID of the related IndicatorDescriptionLocaleState.
         *  @param indicatorDescriptionLocaleStateID The ID of the IndicatorDescriptionLocaleState to retrieve.
         *  @return A single IndicatorDescriptionLocaleState, or null. */
        static getLocaleForIndicatorDescriptionLocaleState(indicatorDescriptionLocaleStateID: number, api: API, callback: IAPICallback<IndicatorDescriptionLocaleState>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionMethodologyNote type. */
    class IndicatorDescriptionMethodologyNote extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            methodologyNote: PropertyMap;
            methodologyNotePlain: PropertyMap;
            isHTML: PropertyMap;
            isAgeAdjusted: PropertyMap;
            isFootnote: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        methodologyNote: string;
        methodologyNotePlain: string;
        isHTML: boolean;
        isAgeAdjusted: boolean;
        isFootnote: boolean;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionMethodologyNotes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionMethodologyNotes */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionMethodologyNote>>, page?: number): void;
        /** Gets how many IndicatorDescriptionMethodologyNotes exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionMethodologyNotes method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionMethodologyNote with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionMethodologyNote to return.
         *  @return The matching IndicatorDescriptionMethodologyNote, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionMethodologyNote>): void;
        /** Returns a filtered collection of IndicatorDescriptionMethodologyNotes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionMethodologyNotes which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionMethodologyNote>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionMethodologyNotes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionMethodologyNotes which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionMethodologyNotes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionMethodologyNoteswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionMethodologyNote>>, page?: number): void;
        /** Gets how many IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionMethodologyNotes by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMethodologyNotes.
         *  @return An Array of IndicatorDescriptionMethodologyNotes. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMethodologyNote.
         *  @return A single IndicatorDescriptionMethodologyNote, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionMethodologyNote>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMethodologyNote.
         *  @param indicatorDescriptionMethodologyNoteID The ID of the IndicatorDescriptionMethodologyNote to retrieve.
         *  @return A single IndicatorDescriptionMethodologyNote, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionMethodologyNote(indicatorDescriptionMethodologyNoteID: number, api: API, callback: IAPICallback<IndicatorDescriptionMethodologyNote>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionMoreInfo type. */
    class IndicatorDescriptionMoreInfo extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            moreInfo: PropertyMap;
            urlID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        moreInfo: string;
        urlID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionMoreInfos in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionMoreInfos */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionMoreInfo>>, page?: number): void;
        /** Gets how many IndicatorDescriptionMoreInfos exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionMoreInfos method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionMoreInfo with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionMoreInfo to return.
         *  @return The matching IndicatorDescriptionMoreInfo, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionMoreInfo>): void;
        /** Returns a filtered collection of IndicatorDescriptionMoreInfos based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionMoreInfos which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionMoreInfo>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionMoreInfos exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionMoreInfos which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionMoreInfos exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionMoreInfoswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionMoreInfos by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionMoreInfo>>, page?: number): void;
        /** Gets how many IndicatorDescriptionMoreInfos by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionMoreInfos by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionMoreInfo>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @param indicatorDescriptionMoreInfoID The ID of the IndicatorDescriptionMoreInfo to retrieve.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionMoreInfo(indicatorDescriptionMoreInfoID: number, api: API, callback: IAPICallback<IndicatorDescriptionMoreInfo>): void;
        /** Gets IndicatorDescriptionMoreInfos by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionMoreInfo>>, page?: number): void;
        /** Gets how many IndicatorDescriptionMoreInfos by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionMoreInfos by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionMoreInfos.
         *  @return An Array of IndicatorDescriptionMoreInfos. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        getUrl(api: API, callback: IAPICallback<IndicatorDescriptionMoreInfo>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionMoreInfo.
         *  @param indicatorDescriptionMoreInfoID The ID of the IndicatorDescriptionMoreInfo to retrieve.
         *  @return A single IndicatorDescriptionMoreInfo, or null. */
        static getUrlForIndicatorDescriptionMoreInfo(indicatorDescriptionMoreInfoID: number, api: API, callback: IAPICallback<IndicatorDescriptionMoreInfo>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionReference type. */
    class IndicatorDescriptionReference extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            reference: PropertyMap;
            urlID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        reference: string;
        urlID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionReferences in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionReferences */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionReference>>, page?: number): void;
        /** Gets how many IndicatorDescriptionReferences exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionReferences method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionReference with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionReference to return.
         *  @return The matching IndicatorDescriptionReference, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionReference>): void;
        /** Returns a filtered collection of IndicatorDescriptionReferences based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionReferences which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionReference>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionReferences exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionReferences which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionReferences exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionReferenceswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionReferences by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionReference>>, page?: number): void;
        /** Gets how many IndicatorDescriptionReferences by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionReferences by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionReference.
         *  @return A single IndicatorDescriptionReference, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionReference>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionReference.
         *  @param indicatorDescriptionReferenceID The ID of the IndicatorDescriptionReference to retrieve.
         *  @return A single IndicatorDescriptionReference, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionReference(indicatorDescriptionReferenceID: number, api: API, callback: IAPICallback<IndicatorDescriptionReference>): void;
        /** Gets IndicatorDescriptionReferences by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionReference>>, page?: number): void;
        /** Gets how many IndicatorDescriptionReferences by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionReferences by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionReferences.
         *  @return An Array of IndicatorDescriptionReferences. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionReference.
         *  @return A single IndicatorDescriptionReference, or null. */
        getUrl(api: API, callback: IAPICallback<IndicatorDescriptionReference>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionReference.
         *  @param indicatorDescriptionReferenceID The ID of the IndicatorDescriptionReference to retrieve.
         *  @return A single IndicatorDescriptionReference, or null. */
        static getUrlForIndicatorDescriptionReference(indicatorDescriptionReferenceID: number, api: API, callback: IAPICallback<IndicatorDescriptionReference>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionResource type. */
    class IndicatorDescriptionResource extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            description: PropertyMap;
            urlID: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        description: string;
        urlID: number;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionResources in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionResources */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionResource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionResources exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionResources method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionResource with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionResource to return.
         *  @return The matching IndicatorDescriptionResource, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionResource>): void;
        /** Returns a filtered collection of IndicatorDescriptionResources based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionResources which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionResource>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionResources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionResources which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionResources exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionResourceswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionResources by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionResource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionResources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionResources by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionResource.
         *  @return A single IndicatorDescriptionResource, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionResource>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionResource.
         *  @param indicatorDescriptionResourceID The ID of the IndicatorDescriptionResource to retrieve.
         *  @return A single IndicatorDescriptionResource, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionResource(indicatorDescriptionResourceID: number, api: API, callback: IAPICallback<IndicatorDescriptionResource>): void;
        /** Gets IndicatorDescriptionResources by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionResource>>, page?: number): void;
        /** Gets how many IndicatorDescriptionResources by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionResources by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child IndicatorDescriptionResources.
         *  @return An Array of IndicatorDescriptionResources. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionResource.
         *  @return A single IndicatorDescriptionResource, or null. */
        getUrl(api: API, callback: IAPICallback<IndicatorDescriptionResource>): void;
        /** Returns the related Url based on the unique ID of the related IndicatorDescriptionResource.
         *  @param indicatorDescriptionResourceID The ID of the IndicatorDescriptionResource to retrieve.
         *  @return A single IndicatorDescriptionResource, or null. */
        static getUrlForIndicatorDescriptionResource(indicatorDescriptionResourceID: number, api: API, callback: IAPICallback<IndicatorDescriptionResource>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescription type. */
    class IndicatorDescription extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            shortDescription: PropertyMap;
            unlabeledShortDescription: PropertyMap;
            showMe: PropertyMap;
            isDevelopmental: PropertyMap;
            datatype: PropertyMap;
            fullDescription: PropertyMap;
            valueLabelID: PropertyMap;
            numeratorDescription: PropertyMap;
            denominatorDescription: PropertyMap;
            caveatsAndLimitations: PropertyMap;
            dataType: PropertyMap;
            trendIssues: PropertyMap;
            otherDataSource: PropertyMap;
            availableDimensions: PropertyMap;
            geographicLevels: PropertyMap;
            maxDecimal: PropertyMap;
            modificationDate: PropertyMap;
            minimumCacheValue: PropertyMap;
            maximumCacheValue: PropertyMap;
            modifyDate: PropertyMap;
        };
        id: number;
        shortDescription: string;
        unlabeledShortDescription: string;
        showMe: boolean;
        isDevelopmental: boolean;
        datatype: string;
        fullDescription: string;
        valueLabelID: number;
        numeratorDescription: string;
        denominatorDescription: string;
        caveatsAndLimitations: string;
        dataType: string;
        trendIssues: string;
        otherDataSource: string;
        availableDimensions: string;
        geographicLevels: string;
        maxDecimal: number;
        modificationDate: Date;
        minimumCacheValue: number;
        maximumCacheValue: number;
        modifyDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptions */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescription>>, page?: number): void;
        /** Gets how many IndicatorDescriptions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescription with the specified primary key.
         *  @param id The primary key of the IndicatorDescription to return.
         *  @return The matching IndicatorDescription, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescription>): void;
        /** Returns a filtered collection of IndicatorDescriptions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescription>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptions by ValueLabelID.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        static getByValueLabelID(valueLabelID: number, api: API, callback: IAPICallback<Array<IndicatorDescription>>, page?: number): void;
        /** Gets how many IndicatorDescriptions by ValueLabelID exist.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        static getByValueLabelIDCount(valueLabelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptions by ValueLabelID exist.
         *  @param valueLabelID The ID of the ValueLabel for which to retrieve the child IndicatorDescriptions.
         *  @return An Array of IndicatorDescriptions. */
        static getByValueLabelIDPageCount(valueLabelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ValueLabel based on the unique ID of the related IndicatorDescription.
         *  @return A single IndicatorDescription, or null. */
        getValueLabel(api: API, callback: IAPICallback<IndicatorDescription>): void;
        /** Returns the related ValueLabel based on the unique ID of the related IndicatorDescription.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription to retrieve.
         *  @return A single IndicatorDescription, or null. */
        static getValueLabelForIndicatorDescription(indicatorDescriptionID: number, api: API, callback: IAPICallback<IndicatorDescription>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionHP2020 type. */
    class IndicatorDescriptionHP2020 extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            indicatorNumber: PropertyMap;
            HP2020ID: PropertyMap;
            HP2020Target: PropertyMap;
            HP2020BaselineYear: PropertyMap;
            HP2020Baseline: PropertyMap;
            HP2020TSMID: PropertyMap;
            initiativeSpecificTopicArea: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        indicatorNumber: string;
        HP2020ID: string;
        HP2020Target: string;
        HP2020BaselineYear: string;
        HP2020Baseline: string;
        HP2020TSMID: number;
        initiativeSpecificTopicArea: string;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionHP2020s in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionHP2020s */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionHP2020>>, page?: number): void;
        /** Gets how many IndicatorDescriptionHP2020s exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionHP2020s method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionHP2020 with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionHP2020 to return.
         *  @return The matching IndicatorDescriptionHP2020, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionHP2020>): void;
        /** Returns a filtered collection of IndicatorDescriptionHP2020s based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionHP2020s which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionHP2020>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionHP2020s exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionHP2020s which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionHP2020s exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionHP2020swhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionHP2020s by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionHP2020>>, page?: number): void;
        /** Gets how many IndicatorDescriptionHP2020s by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionHP2020s by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionHP2020>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @param indicatorDescriptionHP2020ID The ID of the IndicatorDescriptionHP2020 to retrieve.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionHP2020(indicatorDescriptionHP2020ID: number, api: API, callback: IAPICallback<IndicatorDescriptionHP2020>): void;
        /** Gets IndicatorDescriptionHP2020s by HP2020TSMID.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByHP2020TSMID(hP2020TSMID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionHP2020>>, page?: number): void;
        /** Gets how many IndicatorDescriptionHP2020s by HP2020TSMID exist.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByHP2020TSMIDCount(hP2020TSMID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionHP2020s by HP2020TSMID exist.
         *  @param hP2020TSMID The ID of the HP2020TSM for which to retrieve the child IndicatorDescriptionHP2020s.
         *  @return An Array of IndicatorDescriptionHP2020s. */
        static getByHP2020TSMIDPageCount(hP2020TSMID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related HP2020TSM based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        getHP2020TSM(api: API, callback: IAPICallback<IndicatorDescriptionHP2020>): void;
        /** Returns the related HP2020TSM based on the unique ID of the related IndicatorDescriptionHP2020.
         *  @param indicatorDescriptionHP2020ID The ID of the IndicatorDescriptionHP2020 to retrieve.
         *  @return A single IndicatorDescriptionHP2020, or null. */
        static getHP2020TSMForIndicatorDescriptionHP2020(indicatorDescriptionHP2020ID: number, api: API, callback: IAPICallback<IndicatorDescriptionHP2020>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionTimeFrame type. */
    class IndicatorDescriptionTimeFrame extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            timeframeID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        timeframeID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionTimeFrames in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionTimeFrames */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionTimeFrame>>, page?: number): void;
        /** Gets how many IndicatorDescriptionTimeFrames exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionTimeFrames method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionTimeFrame with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionTimeFrame to return.
         *  @return The matching IndicatorDescriptionTimeFrame, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionTimeFrame>): void;
        /** Returns a filtered collection of IndicatorDescriptionTimeFrames based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionTimeFrames which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionTimeFrame>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionTimeFrames exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionTimeFrames which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionTimeFrames exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionTimeFrameswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionTimeFrames by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionTimeFrame>>, page?: number): void;
        /** Gets how many IndicatorDescriptionTimeFrames by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionTimeFrames by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionTimeFrame>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @param indicatorDescriptionTimeFrameID The ID of the IndicatorDescriptionTimeFrame to retrieve.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionTimeFrame(indicatorDescriptionTimeFrameID: number, api: API, callback: IAPICallback<IndicatorDescriptionTimeFrame>): void;
        /** Gets IndicatorDescriptionTimeFrames by TimeframeID.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByTimeframeID(timeframeID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionTimeFrame>>, page?: number): void;
        /** Gets how many IndicatorDescriptionTimeFrames by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByTimeframeIDCount(timeframeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionTimeFrames by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child IndicatorDescriptionTimeFrames.
         *  @return An Array of IndicatorDescriptionTimeFrames. */
        static getByTimeframeIDPageCount(timeframeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Timeframe based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        getTimeframe(api: API, callback: IAPICallback<IndicatorDescriptionTimeFrame>): void;
        /** Returns the related Timeframe based on the unique ID of the related IndicatorDescriptionTimeFrame.
         *  @param indicatorDescriptionTimeFrameID The ID of the IndicatorDescriptionTimeFrame to retrieve.
         *  @return A single IndicatorDescriptionTimeFrame, or null. */
        static getTimeframeForIndicatorDescriptionTimeFrame(indicatorDescriptionTimeFrameID: number, api: API, callback: IAPICallback<IndicatorDescriptionTimeFrame>): void;
    }
    /** Contains properties and static functionality for the IndicatorDescriptionYear type. */
    class IndicatorDescriptionYear extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            yearID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        yearID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDescriptionYears in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDescriptionYears */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDescriptionYear>>, page?: number): void;
        /** Gets how many IndicatorDescriptionYears exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDescriptionYears method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDescriptionYear with the specified primary key.
         *  @param id The primary key of the IndicatorDescriptionYear to return.
         *  @return The matching IndicatorDescriptionYear, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
        /** Returns a filtered collection of IndicatorDescriptionYears based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDescriptionYears which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDescriptionYear>>, page?: number): void;
        /** Returns a count of how many IndicatorDescriptionYears exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDescriptionYears which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDescriptionYears exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDescriptionYearswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDescriptionYears by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionYear>>, page?: number): void;
        /** Gets how many IndicatorDescriptionYears by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionYears by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionYear.
         *  @return A single IndicatorDescriptionYear, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDescriptionYear.
         *  @param indicatorDescriptionYearID The ID of the IndicatorDescriptionYear to retrieve.
         *  @return A single IndicatorDescriptionYear, or null. */
        static getIndicatorDescriptionForIndicatorDescriptionYear(indicatorDescriptionYearID: number, api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
        /** Gets IndicatorDescriptionYears by YearID.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByYearID(yearID: number, api: API, callback: IAPICallback<Array<IndicatorDescriptionYear>>, page?: number): void;
        /** Gets how many IndicatorDescriptionYears by YearID exist.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByYearIDCount(yearID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDescriptionYears by YearID exist.
         *  @param yearID The ID of the Year for which to retrieve the child IndicatorDescriptionYears.
         *  @return An Array of IndicatorDescriptionYears. */
        static getByYearIDPageCount(yearID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Year based on the unique ID of the related IndicatorDescriptionYear.
         *  @return A single IndicatorDescriptionYear, or null. */
        getYear(api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
        /** Returns the related Year based on the unique ID of the related IndicatorDescriptionYear.
         *  @param indicatorDescriptionYearID The ID of the IndicatorDescriptionYear to retrieve.
         *  @return A single IndicatorDescriptionYear, or null. */
        static getYearForIndicatorDescriptionYear(indicatorDescriptionYearID: number, api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
        /** Gets a unique IndicatorDescriptionYear based on the provided values.
         *  @return A single IndicatorDescriptionYear, or null. */
        static getByIndicatorDescriptionIDAndYearID(indicatorDescriptionID: string, yearID: string, api: API, callback: IAPICallback<IndicatorDescriptionYear>): void;
    }
    /** Contains properties and static functionality for the IndicatorDimensionGraph type. */
    class IndicatorDimensionGraph extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            localeLevelID: PropertyMap;
            dimensionGraphID: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        localeLevelID: number;
        dimensionGraphID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDimensionGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDimensionGraphs */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDimensionGraphs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDimensionGraphs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDimensionGraph with the specified primary key.
         *  @param id The primary key of the IndicatorDimensionGraph to return.
         *  @return The matching IndicatorDimensionGraph, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Returns a filtered collection of IndicatorDimensionGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDimensionGraphs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDimensionGraph>>, page?: number): void;
        /** Returns a count of how many IndicatorDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDimensionGraphs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDimensionGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDimensionGraphswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDimensionGraphs by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDimensionGraphs by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        static getIndicatorDescriptionForIndicatorDimensionGraph(indicatorDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Gets IndicatorDimensionGraphs by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByLocaleLevelID(localeLevelID: number, api: API, callback: IAPICallback<Array<IndicatorDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByLocaleLevelIDCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDimensionGraphs by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByLocaleLevelIDPageCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        getLocaleLevel(api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        static getLocaleLevelForIndicatorDimensionGraph(indicatorDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Gets IndicatorDimensionGraphs by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByDimensionGraphID(dimensionGraphID: number, api: API, callback: IAPICallback<Array<IndicatorDimensionGraph>>, page?: number): void;
        /** Gets how many IndicatorDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByDimensionGraphIDCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDimensionGraphs by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child IndicatorDimensionGraphs.
         *  @return An Array of IndicatorDimensionGraphs. */
        static getByDimensionGraphIDPageCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDimensionGraph.
         *  @return A single IndicatorDimensionGraph, or null. */
        getDimensionGraph(api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related IndicatorDimensionGraph.
         *  @param indicatorDimensionGraphID The ID of the IndicatorDimensionGraph to retrieve.
         *  @return A single IndicatorDimensionGraph, or null. */
        static getDimensionGraphForIndicatorDimensionGraph(indicatorDimensionGraphID: number, api: API, callback: IAPICallback<IndicatorDimensionGraph>): void;
    }
    /** Contains properties and static functionality for the IndicatorDimension type. */
    class IndicatorDimension extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorID: PropertyMap;
            dimensionBookID: PropertyMap;
        };
        id: number;
        indicatorID: number;
        dimensionBookID: number;
        protected getFields(): any;
        /** Gets a list of all of the IndicatorDimensions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of IndicatorDimensions */
        static getAll(api: API, callback: IAPICallback<Array<IndicatorDimension>>, page?: number): void;
        /** Gets how many IndicatorDimensions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the IndicatorDimensions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the IndicatorDimension with the specified primary key.
         *  @param id The primary key of the IndicatorDimension to return.
         *  @return The matching IndicatorDimension, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<IndicatorDimension>): void;
        /** Returns a filtered collection of IndicatorDimensions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All IndicatorDimensions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<IndicatorDimension>>, page?: number): void;
        /** Returns a count of how many IndicatorDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of IndicatorDimensions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of IndicatorDimensions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of IndicatorDimensionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets IndicatorDimensions by IndicatorID.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByIndicatorID(indicatorID: number, api: API, callback: IAPICallback<Array<IndicatorDimension>>, page?: number): void;
        /** Gets how many IndicatorDimensions by IndicatorID exist.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByIndicatorIDCount(indicatorID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDimensions by IndicatorID exist.
         *  @param indicatorID The ID of the Indicator for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByIndicatorIDPageCount(indicatorID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Indicator based on the unique ID of the related IndicatorDimension.
         *  @return A single IndicatorDimension, or null. */
        getIndicator(api: API, callback: IAPICallback<IndicatorDimension>): void;
        /** Returns the related Indicator based on the unique ID of the related IndicatorDimension.
         *  @param indicatorDimensionID The ID of the IndicatorDimension to retrieve.
         *  @return A single IndicatorDimension, or null. */
        static getIndicatorForIndicatorDimension(indicatorDimensionID: number, api: API, callback: IAPICallback<IndicatorDimension>): void;
        /** Gets IndicatorDimensions by DimensionBookID.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByDimensionBookID(dimensionBookID: number, api: API, callback: IAPICallback<Array<IndicatorDimension>>, page?: number): void;
        /** Gets how many IndicatorDimensions by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByDimensionBookIDCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDimensions by DimensionBookID exist.
         *  @param dimensionBookID The ID of the DimensionBook for which to retrieve the child IndicatorDimensions.
         *  @return An Array of IndicatorDimensions. */
        static getByDimensionBookIDPageCount(dimensionBookID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDimension.
         *  @return A single IndicatorDimension, or null. */
        getDimensionBook(api: API, callback: IAPICallback<IndicatorDimension>): void;
        /** Returns the related DimensionBook based on the unique ID of the related IndicatorDimension.
         *  @param indicatorDimensionID The ID of the IndicatorDimension to retrieve.
         *  @return A single IndicatorDimension, or null. */
        static getDimensionBookForIndicatorDimension(indicatorDimensionID: number, api: API, callback: IAPICallback<IndicatorDimension>): void;
        /** Gets a unique IndicatorDimension based on the provided values.
         *  @return A single IndicatorDimension, or null. */
        static getByDimensionBookIDAndIndicatorID(dimensionBookID: string, indicatorID: string, api: API, callback: IAPICallback<IndicatorDimension>): void;
    }
    /** Contains properties and static functionality for the Indicator type. */
    class Indicator extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            indicatorDescriptionID: PropertyMap;
            timeframeID: PropertyMap;
            localeID: PropertyMap;
            dimensionGraphID: PropertyMap;
            dimensionGraphSortOrder: PropertyMap;
            modifierGraphID: PropertyMap;
            modifierGraphSortOrder: PropertyMap;
            dimensionGraphHeader: PropertyMap;
            dimensionGraphLabel: PropertyMap;
            floatValue: PropertyMap;
            formattedValue: PropertyMap;
            graphValue: PropertyMap;
            textualValue: PropertyMap;
            confidenceIntervalLow: PropertyMap;
            confidenceIntervalLowFormatted: PropertyMap;
            graphCILowValue: PropertyMap;
            confidenceIntervalHigh: PropertyMap;
            confidenceIntervalHighFormatted: PropertyMap;
            graphCIHighValue: PropertyMap;
            standardError: PropertyMap;
            standardErrorGraphValue: PropertyMap;
            standardErrorFormatted: PropertyMap;
            floatTarget: PropertyMap;
            integralTarget: PropertyMap;
            formattedTarget: PropertyMap;
            numerator: PropertyMap;
            denominator: PropertyMap;
            fipsCode: PropertyMap;
            hrrCode: PropertyMap;
            ssaCode: PropertyMap;
        };
        id: number;
        indicatorDescriptionID: number;
        timeframeID: number;
        localeID: number;
        dimensionGraphID: number;
        dimensionGraphSortOrder: number;
        modifierGraphID: number;
        modifierGraphSortOrder: number;
        dimensionGraphHeader: string;
        dimensionGraphLabel: string;
        floatValue: number;
        formattedValue: string;
        graphValue: string;
        textualValue: string;
        confidenceIntervalLow: number;
        confidenceIntervalLowFormatted: string;
        graphCILowValue: string;
        confidenceIntervalHigh: number;
        confidenceIntervalHighFormatted: string;
        graphCIHighValue: string;
        standardError: number;
        standardErrorGraphValue: string;
        standardErrorFormatted: string;
        floatTarget: number;
        integralTarget: number;
        formattedTarget: string;
        numerator: number;
        denominator: number;
        fipsCode: number;
        hrrCode: number;
        ssaCode: number;
        protected getFields(): any;
        /** Gets a list of all of the Indicators in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Indicators */
        static getAll(api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Indicators method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Indicator with the specified primary key.
         *  @param id The primary key of the Indicator to return.
         *  @return The matching Indicator, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Indicator>): void;
        /** Returns a filtered collection of Indicators based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Indicators which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Returns a count of how many Indicators exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Indicators which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Indicators exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Indicatorswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Indicators by IndicatorDescriptionID.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Indicators by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        getIndicatorDescription(api: API, callback: IAPICallback<Indicator>): void;
        /** Returns the related IndicatorDescription based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        static getIndicatorDescriptionForIndicator(indicatorID: number, api: API, callback: IAPICallback<Indicator>): void;
        /** Gets Indicators by TimeframeID.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByTimeframeID(timeframeID: number, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByTimeframeIDCount(timeframeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Indicators by TimeframeID exist.
         *  @param timeframeID The ID of the Timeframe for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByTimeframeIDPageCount(timeframeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Timeframe based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        getTimeframe(api: API, callback: IAPICallback<Indicator>): void;
        /** Returns the related Timeframe based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        static getTimeframeForIndicator(indicatorID: number, api: API, callback: IAPICallback<Indicator>): void;
        /** Gets Indicators by LocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByLocaleID(localeID: number, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Indicators by LocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Locale based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        getLocale(api: API, callback: IAPICallback<Indicator>): void;
        /** Returns the related Locale based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        static getLocaleForIndicator(indicatorID: number, api: API, callback: IAPICallback<Indicator>): void;
        /** Gets Indicators by DimensionGraphID.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByDimensionGraphID(dimensionGraphID: number, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByDimensionGraphIDCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Indicators by DimensionGraphID exist.
         *  @param dimensionGraphID The ID of the DimensionGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByDimensionGraphIDPageCount(dimensionGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        getDimensionGraph(api: API, callback: IAPICallback<Indicator>): void;
        /** Returns the related DimensionGraph based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        static getDimensionGraphForIndicator(indicatorID: number, api: API, callback: IAPICallback<Indicator>): void;
        /** Gets Indicators by ModifierGraphID.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByModifierGraphID(modifierGraphID: number, api: API, callback: IAPICallback<Array<Indicator>>, page?: number): void;
        /** Gets how many Indicators by ModifierGraphID exist.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByModifierGraphIDCount(modifierGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Indicators by ModifierGraphID exist.
         *  @param modifierGraphID The ID of the ModifierGraph for which to retrieve the child Indicators.
         *  @return An Array of Indicators. */
        static getByModifierGraphIDPageCount(modifierGraphID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ModifierGraph based on the unique ID of the related Indicator.
         *  @return A single Indicator, or null. */
        getModifierGraph(api: API, callback: IAPICallback<Indicator>): void;
        /** Returns the related ModifierGraph based on the unique ID of the related Indicator.
         *  @param indicatorID The ID of the Indicator to retrieve.
         *  @return A single Indicator, or null. */
        static getModifierGraphForIndicator(indicatorID: number, api: API, callback: IAPICallback<Indicator>): void;
    }
    /** Contains properties and static functionality for the Initiative type. */
    class Initiative extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            acronym: PropertyMap;
            name: PropertyMap;
            sortOrder: PropertyMap;
            supplierAcronym: PropertyMap;
            supplierName: PropertyMap;
            acknowledgement: PropertyMap;
            minimumYear: PropertyMap;
            maximumYear: PropertyMap;
            IsSSA: PropertyMap;
            modifyDate: PropertyMap;
        };
        id: number;
        acronym: string;
        name: string;
        sortOrder: number;
        supplierAcronym: string;
        supplierName: string;
        acknowledgement: string;
        minimumYear: number;
        maximumYear: number;
        IsSSA: boolean;
        modifyDate: Date;
        protected getFields(): any;
        /** Gets a list of all of the Initiatives in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Initiatives */
        static getAll(api: API, callback: IAPICallback<Array<Initiative>>, page?: number): void;
        /** Gets how many Initiatives exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Initiatives method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Initiative with the specified primary key.
         *  @param id The primary key of the Initiative to return.
         *  @return The matching Initiative, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Initiative>): void;
        /** Returns a filtered collection of Initiatives based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Initiatives which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Initiative>>, page?: number): void;
        /** Returns a count of how many Initiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Initiatives which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Initiatives exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Initiativeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the Intervention type. */
    class Intervention extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            topic: PropertyMap;
            urlID: PropertyMap;
            proposedText: PropertyMap;
            taskForceOnCommunityPreventiveServicesFinding: PropertyMap;
            grade: PropertyMap;
            interventionSource: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        topic: string;
        urlID: number;
        proposedText: string;
        taskForceOnCommunityPreventiveServicesFinding: string;
        grade: string;
        interventionSource: string;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the Interventions in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Interventions */
        static getAll(api: API, callback: IAPICallback<Array<Intervention>>, page?: number): void;
        /** Gets how many Interventions exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Interventions method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Intervention with the specified primary key.
         *  @param id The primary key of the Intervention to return.
         *  @return The matching Intervention, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Intervention>): void;
        /** Returns a filtered collection of Interventions based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Interventions which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Intervention>>, page?: number): void;
        /** Returns a count of how many Interventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Interventions which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Interventions exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Interventionswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Interventions by UrlID.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        static getByUrlID(urlID: number, api: API, callback: IAPICallback<Array<Intervention>>, page?: number): void;
        /** Gets how many Interventions by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        static getByUrlIDCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Interventions by UrlID exist.
         *  @param urlID The ID of the Url for which to retrieve the child Interventions.
         *  @return An Array of Interventions. */
        static getByUrlIDPageCount(urlID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Url based on the unique ID of the related Intervention.
         *  @return A single Intervention, or null. */
        getUrl(api: API, callback: IAPICallback<Intervention>): void;
        /** Returns the related Url based on the unique ID of the related Intervention.
         *  @param interventionID The ID of the Intervention to retrieve.
         *  @return A single Intervention, or null. */
        static getUrlForIntervention(interventionID: number, api: API, callback: IAPICallback<Intervention>): void;
    }
    /** Contains properties and static functionality for the Keyword type. */
    class Keyword extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            showOnProfile: PropertyMap;
            forDevelopment: PropertyMap;
            enabled: PropertyMap;
            modifyDate: PropertyMap;
            countOfIndicatorDescription: PropertyMap;
        };
        id: number;
        name: string;
        showOnProfile: boolean;
        forDevelopment: boolean;
        enabled: boolean;
        modifyDate: Date;
        countOfIndicatorDescription: number;
        protected getFields(): any;
        /** Gets a list of all of the Keywords in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Keywords */
        static getAll(api: API, callback: IAPICallback<Array<Keyword>>, page?: number): void;
        /** Gets how many Keywords exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Keywords method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Keyword with the specified primary key.
         *  @param id The primary key of the Keyword to return.
         *  @return The matching Keyword, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Keyword>): void;
        /** Returns a filtered collection of Keywords based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Keywords which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Keyword>>, page?: number): void;
        /** Returns a count of how many Keywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Keywords which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Keywords exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Keywordswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the LocaleLevel type. */
    class LocaleLevel extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        name: LocaleLevelName;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the LocaleLevels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of LocaleLevels */
        static getAll(api: API, callback: IAPICallback<Array<LocaleLevel>>, page?: number): void;
        /** Gets how many LocaleLevels exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the LocaleLevels method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the LocaleLevel with the specified primary key.
         *  @param id The primary key of the LocaleLevel to return.
         *  @return The matching LocaleLevel, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<LocaleLevel>): void;
        /** Returns a filtered collection of LocaleLevels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All LocaleLevels which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<LocaleLevel>>, page?: number): void;
        /** Returns a count of how many LocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of LocaleLevels which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of LocaleLevels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of LocaleLevelswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the LocaleRelation type. */
    class LocaleRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorLocaleID: PropertyMap;
            descendantLocaleID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorLocaleID: number;
        descendantLocaleID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the LocaleRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of LocaleRelations */
        static getAll(api: API, callback: IAPICallback<Array<LocaleRelation>>, page?: number): void;
        /** Gets how many LocaleRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the LocaleRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the LocaleRelation with the specified primary key.
         *  @param id The primary key of the LocaleRelation to return.
         *  @return The matching LocaleRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<LocaleRelation>): void;
        /** Returns a filtered collection of LocaleRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All LocaleRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<LocaleRelation>>, page?: number): void;
        /** Returns a count of how many LocaleRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of LocaleRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of LocaleRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of LocaleRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets LocaleRelations by AncestorLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByAncestorLocaleID(localeID: number, api: API, callback: IAPICallback<Array<LocaleRelation>>, page?: number): void;
        /** Gets how many LocaleRelations by AncestorLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByAncestorLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of LocaleRelations by AncestorLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByAncestorLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorLocale based on the unique ID of the related LocaleRelation.
         *  @return A single LocaleRelation, or null. */
        getAncestorLocale(api: API, callback: IAPICallback<LocaleRelation>): void;
        /** Returns the related AncestorLocale based on the unique ID of the related LocaleRelation.
         *  @param localeRelationID The ID of the LocaleRelation to retrieve.
         *  @return A single LocaleRelation, or null. */
        static getAncestorLocaleForLocaleRelation(localeRelationID: number, api: API, callback: IAPICallback<LocaleRelation>): void;
        /** Gets LocaleRelations by DescendantLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByDescendantLocaleID(localeID: number, api: API, callback: IAPICallback<Array<LocaleRelation>>, page?: number): void;
        /** Gets how many LocaleRelations by DescendantLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByDescendantLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of LocaleRelations by DescendantLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child LocaleRelations.
         *  @return An Array of LocaleRelations. */
        static getByDescendantLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantLocale based on the unique ID of the related LocaleRelation.
         *  @return A single LocaleRelation, or null. */
        getDescendantLocale(api: API, callback: IAPICallback<LocaleRelation>): void;
        /** Returns the related DescendantLocale based on the unique ID of the related LocaleRelation.
         *  @param localeRelationID The ID of the LocaleRelation to retrieve.
         *  @return A single LocaleRelation, or null. */
        static getDescendantLocaleForLocaleRelation(localeRelationID: number, api: API, callback: IAPICallback<LocaleRelation>): void;
        /** Gets a unique LocaleRelation based on the provided values.
         *  @return A single LocaleRelation, or null. */
        static getByAncestorLocaleIDAndDescendantLocaleID(ancestorLocaleID: string, descendantLocaleID: string, api: API, callback: IAPICallback<LocaleRelation>): void;
    }
    /** Contains properties and static functionality for the Locale type. */
    class Locale extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            parentLocaleID: PropertyMap;
            fips_int: PropertyMap;
            stateFIPSCode: PropertyMap;
            countyFIPSCode: PropertyMap;
            countySSACode: PropertyMap;
            hrrCode: PropertyMap;
            fullName: PropertyMap;
            name: PropertyMap;
            sortOrder: PropertyMap;
            abbreviation: PropertyMap;
            localeLevelID: PropertyMap;
        };
        id: number;
        parentLocaleID: number;
        fips_int: number;
        stateFIPSCode: string;
        countyFIPSCode: string;
        countySSACode: string;
        hrrCode: string;
        fullName: string;
        name: string;
        sortOrder: number;
        abbreviation: string;
        localeLevelID: number;
        protected getFields(): any;
        /** Gets a list of all of the Locales in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Locales */
        static getAll(api: API, callback: IAPICallback<Array<Locale>>, page?: number): void;
        /** Gets how many Locales exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Locales method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Locale with the specified primary key.
         *  @param id The primary key of the Locale to return.
         *  @return The matching Locale, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Locale>): void;
        /** Returns a filtered collection of Locales based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Locales which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Locale>>, page?: number): void;
        /** Returns a count of how many Locales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Locales which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Locales exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Localeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Locales by ParentLocaleID.
         *  @return An Array of Locales. */
        getLocales(api: API, callback: IAPICallback<Array<Locale>>, page?: number): void;
        /** Gets Locales by ParentLocaleID.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByParentLocaleID(localeID: number, api: API, callback: IAPICallback<Array<Locale>>, page?: number): void;
        /** Gets how many Locales by ParentLocaleID exist.
         *  @return An Array of Locales. */
        getLocalesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Locales by ParentLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByParentLocaleIDCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Locales by ParentLocaleID exist.
         *  @return An Array of Locales. */
        getLocalesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Locales by ParentLocaleID exist.
         *  @param localeID The ID of the Locale for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByParentLocaleIDPageCount(localeID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentLocale based on the unique ID of the related Locale.
         *  @return A single Locale, or null. */
        getParentLocale(api: API, callback: IAPICallback<Locale>): void;
        /** Returns the related ParentLocale based on the unique ID of the related Locale.
         *  @param localeID The ID of the Locale to retrieve.
         *  @return A single Locale, or null. */
        static getParentLocaleForLocale(localeID: number, api: API, callback: IAPICallback<Locale>): void;
        /** Gets Locales by LocaleLevelID.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByLocaleLevelID(localeLevelID: number, api: API, callback: IAPICallback<Array<Locale>>, page?: number): void;
        /** Gets how many Locales by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByLocaleLevelIDCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Locales by LocaleLevelID exist.
         *  @param localeLevelID The ID of the LocaleLevel for which to retrieve the child Locales.
         *  @return An Array of Locales. */
        static getByLocaleLevelIDPageCount(localeLevelID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related Locale.
         *  @return A single Locale, or null. */
        getLocaleLevel(api: API, callback: IAPICallback<Locale>): void;
        /** Returns the related LocaleLevel based on the unique ID of the related Locale.
         *  @param localeID The ID of the Locale to retrieve.
         *  @return A single Locale, or null. */
        static getLocaleLevelForLocale(localeID: number, api: API, callback: IAPICallback<Locale>): void;
    }
    /** Contains properties and static functionality for the MaritalStatus type. */
    class MaritalStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentMaritalStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentMaritalStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the MaritalStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of MaritalStatuses */
        static getAll(api: API, callback: IAPICallback<Array<MaritalStatus>>, page?: number): void;
        /** Gets how many MaritalStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the MaritalStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the MaritalStatus with the specified primary key.
         *  @param id The primary key of the MaritalStatus to return.
         *  @return The matching MaritalStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<MaritalStatus>): void;
        /** Returns a filtered collection of MaritalStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All MaritalStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<MaritalStatus>>, page?: number): void;
        /** Returns a count of how many MaritalStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of MaritalStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of MaritalStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of MaritalStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets MaritalStatuses by ParentMaritalStatusID.
         *  @return An Array of MaritalStatuses. */
        getMaritalStatuses(api: API, callback: IAPICallback<Array<MaritalStatus>>, page?: number): void;
        /** Gets MaritalStatuses by ParentMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        static getByParentMaritalStatusID(maritalStatusID: number, api: API, callback: IAPICallback<Array<MaritalStatus>>, page?: number): void;
        /** Gets how many MaritalStatuses by ParentMaritalStatusID exist.
         *  @return An Array of MaritalStatuses. */
        getMaritalStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many MaritalStatuses by ParentMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        static getByParentMaritalStatusIDCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of MaritalStatuses by ParentMaritalStatusID exist.
         *  @return An Array of MaritalStatuses. */
        getMaritalStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of MaritalStatuses by ParentMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatuses.
         *  @return An Array of MaritalStatuses. */
        static getByParentMaritalStatusIDPageCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentMaritalStatus based on the unique ID of the related MaritalStatus.
         *  @return A single MaritalStatus, or null. */
        getParentMaritalStatus(api: API, callback: IAPICallback<MaritalStatus>): void;
        /** Returns the related ParentMaritalStatus based on the unique ID of the related MaritalStatus.
         *  @param maritalStatusID The ID of the MaritalStatus to retrieve.
         *  @return A single MaritalStatus, or null. */
        static getParentMaritalStatusForMaritalStatus(maritalStatusID: number, api: API, callback: IAPICallback<MaritalStatus>): void;
    }
    /** Contains properties and static functionality for the MaritalStatusRelation type. */
    class MaritalStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorMaritalStatusID: PropertyMap;
            descendantMaritalStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorMaritalStatusID: number;
        descendantMaritalStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the MaritalStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of MaritalStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<MaritalStatusRelation>>, page?: number): void;
        /** Gets how many MaritalStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the MaritalStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the MaritalStatusRelation with the specified primary key.
         *  @param id The primary key of the MaritalStatusRelation to return.
         *  @return The matching MaritalStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<MaritalStatusRelation>): void;
        /** Returns a filtered collection of MaritalStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All MaritalStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<MaritalStatusRelation>>, page?: number): void;
        /** Returns a count of how many MaritalStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of MaritalStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of MaritalStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of MaritalStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets MaritalStatusRelations by AncestorMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByAncestorMaritalStatusID(maritalStatusID: number, api: API, callback: IAPICallback<Array<MaritalStatusRelation>>, page?: number): void;
        /** Gets how many MaritalStatusRelations by AncestorMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByAncestorMaritalStatusIDCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of MaritalStatusRelations by AncestorMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByAncestorMaritalStatusIDPageCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @return A single MaritalStatusRelation, or null. */
        getAncestorMaritalStatus(api: API, callback: IAPICallback<MaritalStatusRelation>): void;
        /** Returns the related AncestorMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @param maritalStatusRelationID The ID of the MaritalStatusRelation to retrieve.
         *  @return A single MaritalStatusRelation, or null. */
        static getAncestorMaritalStatusForMaritalStatusRelation(maritalStatusRelationID: number, api: API, callback: IAPICallback<MaritalStatusRelation>): void;
        /** Gets MaritalStatusRelations by DescendantMaritalStatusID.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByDescendantMaritalStatusID(maritalStatusID: number, api: API, callback: IAPICallback<Array<MaritalStatusRelation>>, page?: number): void;
        /** Gets how many MaritalStatusRelations by DescendantMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByDescendantMaritalStatusIDCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of MaritalStatusRelations by DescendantMaritalStatusID exist.
         *  @param maritalStatusID The ID of the MaritalStatus for which to retrieve the child MaritalStatusRelations.
         *  @return An Array of MaritalStatusRelations. */
        static getByDescendantMaritalStatusIDPageCount(maritalStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @return A single MaritalStatusRelation, or null. */
        getDescendantMaritalStatus(api: API, callback: IAPICallback<MaritalStatusRelation>): void;
        /** Returns the related DescendantMaritalStatus based on the unique ID of the related MaritalStatusRelation.
         *  @param maritalStatusRelationID The ID of the MaritalStatusRelation to retrieve.
         *  @return A single MaritalStatusRelation, or null. */
        static getDescendantMaritalStatusForMaritalStatusRelation(maritalStatusRelationID: number, api: API, callback: IAPICallback<MaritalStatusRelation>): void;
    }
    /** Contains properties and static functionality for the Modifier type. */
    class Modifier extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            key: PropertyMap;
            type: PropertyMap;
            name: PropertyMap;
            isHeader: PropertyMap;
            isCompoundValue: PropertyMap;
            indentedName: PropertyMap;
            compoundName: PropertyMap;
            parentModifierID: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
            chartName: PropertyMap;
            downloadName: PropertyMap;
        };
        id: number;
        key: string;
        type: string;
        name: string;
        isHeader: boolean;
        isCompoundValue: boolean;
        indentedName: string;
        compoundName: string;
        parentModifierID: number;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        chartName: string;
        downloadName: string;
        protected getFields(): any;
        /** Gets a list of all of the Modifiers in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Modifiers */
        static getAll(api: API, callback: IAPICallback<Array<Modifier>>, page?: number): void;
        /** Gets how many Modifiers exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Modifiers method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Modifier with the specified primary key.
         *  @param id The primary key of the Modifier to return.
         *  @return The matching Modifier, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Modifier>): void;
        /** Returns a filtered collection of Modifiers based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Modifiers which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Modifier>>, page?: number): void;
        /** Returns a count of how many Modifiers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Modifiers which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Modifiers exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Modifierswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Modifiers by ParentModifierID.
         *  @return An Array of Modifiers. */
        getModifiers(api: API, callback: IAPICallback<Array<Modifier>>, page?: number): void;
        /** Gets Modifiers by ParentModifierID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        static getByParentModifierID(modifierID: number, api: API, callback: IAPICallback<Array<Modifier>>, page?: number): void;
        /** Gets how many Modifiers by ParentModifierID exist.
         *  @return An Array of Modifiers. */
        getModifiersCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Modifiers by ParentModifierID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        static getByParentModifierIDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Modifiers by ParentModifierID exist.
         *  @return An Array of Modifiers. */
        getModifiersPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Modifiers by ParentModifierID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child Modifiers.
         *  @return An Array of Modifiers. */
        static getByParentModifierIDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentModifier based on the unique ID of the related Modifier.
         *  @return A single Modifier, or null. */
        getParentModifier(api: API, callback: IAPICallback<Modifier>): void;
        /** Returns the related ParentModifier based on the unique ID of the related Modifier.
         *  @param modifierID The ID of the Modifier to retrieve.
         *  @return A single Modifier, or null. */
        static getParentModifierForModifier(modifierID: number, api: API, callback: IAPICallback<Modifier>): void;
    }
    /** Contains properties and static functionality for the ModifierGraph type. */
    class ModifierGraph extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            label: PropertyMap;
            modifierGraphLabel: PropertyMap;
            modifierValueIDList: PropertyMap;
            modifierValueKeyList: PropertyMap;
            modifierValueList: PropertyMap;
            modifierCount: PropertyMap;
            sortOrder: PropertyMap;
            modifier1Value: PropertyMap;
            modifier1ID: PropertyMap;
            modifier1Key: PropertyMap;
            modifier1SortOrder: PropertyMap;
            modifier2Value: PropertyMap;
            modifier2ID: PropertyMap;
            modifier2Key: PropertyMap;
            modifier2SortOrder: PropertyMap;
            modifier3Value: PropertyMap;
            modifier3ID: PropertyMap;
            modifier3Key: PropertyMap;
            modifierBook3SortOrder: PropertyMap;
            modifier4Value: PropertyMap;
            modifier4ID: PropertyMap;
            modifier4Key: PropertyMap;
            modifier4SortOrder: PropertyMap;
            modifier5Value: PropertyMap;
            modifier5ID: PropertyMap;
            modifier5Key: PropertyMap;
            modifier5SortOrder: PropertyMap;
        };
        id: number;
        label: string;
        modifierGraphLabel: string;
        modifierValueIDList: string;
        modifierValueKeyList: string;
        modifierValueList: string;
        modifierCount: number;
        sortOrder: number;
        modifier1Value: string;
        modifier1ID: number;
        modifier1Key: string;
        modifier1SortOrder: number;
        modifier2Value: string;
        modifier2ID: number;
        modifier2Key: string;
        modifier2SortOrder: number;
        modifier3Value: string;
        modifier3ID: number;
        modifier3Key: string;
        modifierBook3SortOrder: number;
        modifier4Value: string;
        modifier4ID: number;
        modifier4Key: string;
        modifier4SortOrder: number;
        modifier5Value: string;
        modifier5ID: number;
        modifier5Key: string;
        modifier5SortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the ModifierGraphs in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ModifierGraphs */
        static getAll(api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the ModifierGraphs method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the ModifierGraph with the specified primary key.
         *  @param id The primary key of the ModifierGraph to return.
         *  @return The matching ModifierGraph, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns a filtered collection of ModifierGraphs based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ModifierGraphs which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Returns a count of how many ModifierGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ModifierGraphs which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of ModifierGraphs exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ModifierGraphswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets ModifierGraphs by Modifier1ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier1ID(modifierID: number, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs by Modifier1ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier1IDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ModifierGraphs by Modifier1ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier1IDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Modifier1 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        getModifier1(api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns the related Modifier1 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        static getModifier1ForModifierGraph(modifierGraphID: number, api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Gets ModifierGraphs by Modifier2ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier2ID(modifierID: number, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs by Modifier2ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier2IDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ModifierGraphs by Modifier2ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier2IDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Modifier2 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        getModifier2(api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns the related Modifier2 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        static getModifier2ForModifierGraph(modifierGraphID: number, api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Gets ModifierGraphs by Modifier3ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier3ID(modifierID: number, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs by Modifier3ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier3IDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ModifierGraphs by Modifier3ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier3IDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Modifier3 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        getModifier3(api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns the related Modifier3 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        static getModifier3ForModifierGraph(modifierGraphID: number, api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Gets ModifierGraphs by Modifier4ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier4ID(modifierID: number, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs by Modifier4ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier4IDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ModifierGraphs by Modifier4ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier4IDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Modifier4 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        getModifier4(api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns the related Modifier4 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        static getModifier4ForModifierGraph(modifierGraphID: number, api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Gets ModifierGraphs by Modifier5ID.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier5ID(modifierID: number, api: API, callback: IAPICallback<Array<ModifierGraph>>, page?: number): void;
        /** Gets how many ModifierGraphs by Modifier5ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier5IDCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ModifierGraphs by Modifier5ID exist.
         *  @param modifierID The ID of the Modifier for which to retrieve the child ModifierGraphs.
         *  @return An Array of ModifierGraphs. */
        static getByModifier5IDPageCount(modifierID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related Modifier5 based on the unique ID of the related ModifierGraph.
         *  @return A single ModifierGraph, or null. */
        getModifier5(api: API, callback: IAPICallback<ModifierGraph>): void;
        /** Returns the related Modifier5 based on the unique ID of the related ModifierGraph.
         *  @param modifierGraphID The ID of the ModifierGraph to retrieve.
         *  @return A single ModifierGraph, or null. */
        static getModifier5ForModifierGraph(modifierGraphID: number, api: API, callback: IAPICallback<ModifierGraph>): void;
    }
    /** Contains properties and static functionality for the ObesityStatus type. */
    class ObesityStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentObesityStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentObesityStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the ObesityStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ObesityStatuses */
        static getAll(api: API, callback: IAPICallback<Array<ObesityStatus>>, page?: number): void;
        /** Gets how many ObesityStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the ObesityStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the ObesityStatus with the specified primary key.
         *  @param id The primary key of the ObesityStatus to return.
         *  @return The matching ObesityStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<ObesityStatus>): void;
        /** Returns a filtered collection of ObesityStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ObesityStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<ObesityStatus>>, page?: number): void;
        /** Returns a count of how many ObesityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ObesityStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of ObesityStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ObesityStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets ObesityStatuses by ParentObesityStatusID.
         *  @return An Array of ObesityStatuses. */
        getObesityStatuses(api: API, callback: IAPICallback<Array<ObesityStatus>>, page?: number): void;
        /** Gets ObesityStatuses by ParentObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        static getByParentObesityStatusID(obesityStatusID: number, api: API, callback: IAPICallback<Array<ObesityStatus>>, page?: number): void;
        /** Gets how many ObesityStatuses by ParentObesityStatusID exist.
         *  @return An Array of ObesityStatuses. */
        getObesityStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many ObesityStatuses by ParentObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        static getByParentObesityStatusIDCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ObesityStatuses by ParentObesityStatusID exist.
         *  @return An Array of ObesityStatuses. */
        getObesityStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ObesityStatuses by ParentObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatuses.
         *  @return An Array of ObesityStatuses. */
        static getByParentObesityStatusIDPageCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentObesityStatus based on the unique ID of the related ObesityStatus.
         *  @return A single ObesityStatus, or null. */
        getParentObesityStatus(api: API, callback: IAPICallback<ObesityStatus>): void;
        /** Returns the related ParentObesityStatus based on the unique ID of the related ObesityStatus.
         *  @param obesityStatusID The ID of the ObesityStatus to retrieve.
         *  @return A single ObesityStatus, or null. */
        static getParentObesityStatusForObesityStatus(obesityStatusID: number, api: API, callback: IAPICallback<ObesityStatus>): void;
    }
    /** Contains properties and static functionality for the ObesityStatusRelation type. */
    class ObesityStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorObesityStatusID: PropertyMap;
            descendantObesityStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorObesityStatusID: number;
        descendantObesityStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the ObesityStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ObesityStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<ObesityStatusRelation>>, page?: number): void;
        /** Gets how many ObesityStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the ObesityStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the ObesityStatusRelation with the specified primary key.
         *  @param id The primary key of the ObesityStatusRelation to return.
         *  @return The matching ObesityStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<ObesityStatusRelation>): void;
        /** Returns a filtered collection of ObesityStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ObesityStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<ObesityStatusRelation>>, page?: number): void;
        /** Returns a count of how many ObesityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ObesityStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of ObesityStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ObesityStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets ObesityStatusRelations by AncestorObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByAncestorObesityStatusID(obesityStatusID: number, api: API, callback: IAPICallback<Array<ObesityStatusRelation>>, page?: number): void;
        /** Gets how many ObesityStatusRelations by AncestorObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByAncestorObesityStatusIDCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ObesityStatusRelations by AncestorObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByAncestorObesityStatusIDPageCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @return A single ObesityStatusRelation, or null. */
        getAncestorObesityStatus(api: API, callback: IAPICallback<ObesityStatusRelation>): void;
        /** Returns the related AncestorObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @param obesityStatusRelationID The ID of the ObesityStatusRelation to retrieve.
         *  @return A single ObesityStatusRelation, or null. */
        static getAncestorObesityStatusForObesityStatusRelation(obesityStatusRelationID: number, api: API, callback: IAPICallback<ObesityStatusRelation>): void;
        /** Gets ObesityStatusRelations by DescendantObesityStatusID.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByDescendantObesityStatusID(obesityStatusID: number, api: API, callback: IAPICallback<Array<ObesityStatusRelation>>, page?: number): void;
        /** Gets how many ObesityStatusRelations by DescendantObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByDescendantObesityStatusIDCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of ObesityStatusRelations by DescendantObesityStatusID exist.
         *  @param obesityStatusID The ID of the ObesityStatus for which to retrieve the child ObesityStatusRelations.
         *  @return An Array of ObesityStatusRelations. */
        static getByDescendantObesityStatusIDPageCount(obesityStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @return A single ObesityStatusRelation, or null. */
        getDescendantObesityStatus(api: API, callback: IAPICallback<ObesityStatusRelation>): void;
        /** Returns the related DescendantObesityStatus based on the unique ID of the related ObesityStatusRelation.
         *  @param obesityStatusRelationID The ID of the ObesityStatusRelation to retrieve.
         *  @return A single ObesityStatusRelation, or null. */
        static getDescendantObesityStatusForObesityStatusRelation(obesityStatusRelationID: number, api: API, callback: IAPICallback<ObesityStatusRelation>): void;
    }
    /** Contains properties and static functionality for the Other type. */
    class Other extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentOtherID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentOtherID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the Others in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Others */
        static getAll(api: API, callback: IAPICallback<Array<Other>>, page?: number): void;
        /** Gets how many Others exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Others method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Other with the specified primary key.
         *  @param id The primary key of the Other to return.
         *  @return The matching Other, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Other>): void;
        /** Returns a filtered collection of Others based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Others which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Other>>, page?: number): void;
        /** Returns a count of how many Others exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Others which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Others exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Otherswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Others by ParentOtherID.
         *  @return An Array of Others. */
        getOthers(api: API, callback: IAPICallback<Array<Other>>, page?: number): void;
        /** Gets Others by ParentOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        static getByParentOtherID(otherID: number, api: API, callback: IAPICallback<Array<Other>>, page?: number): void;
        /** Gets how many Others by ParentOtherID exist.
         *  @return An Array of Others. */
        getOthersCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Others by ParentOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        static getByParentOtherIDCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Others by ParentOtherID exist.
         *  @return An Array of Others. */
        getOthersPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Others by ParentOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child Others.
         *  @return An Array of Others. */
        static getByParentOtherIDPageCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentOther based on the unique ID of the related Other.
         *  @return A single Other, or null. */
        getParentOther(api: API, callback: IAPICallback<Other>): void;
        /** Returns the related ParentOther based on the unique ID of the related Other.
         *  @param otherID The ID of the Other to retrieve.
         *  @return A single Other, or null. */
        static getParentOtherForOther(otherID: number, api: API, callback: IAPICallback<Other>): void;
    }
    /** Contains properties and static functionality for the OtherRelation type. */
    class OtherRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorOtherID: PropertyMap;
            descendantOtherID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorOtherID: number;
        descendantOtherID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the OtherRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of OtherRelations */
        static getAll(api: API, callback: IAPICallback<Array<OtherRelation>>, page?: number): void;
        /** Gets how many OtherRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the OtherRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the OtherRelation with the specified primary key.
         *  @param id The primary key of the OtherRelation to return.
         *  @return The matching OtherRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<OtherRelation>): void;
        /** Returns a filtered collection of OtherRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All OtherRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<OtherRelation>>, page?: number): void;
        /** Returns a count of how many OtherRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of OtherRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of OtherRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of OtherRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets OtherRelations by AncestorOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByAncestorOtherID(otherID: number, api: API, callback: IAPICallback<Array<OtherRelation>>, page?: number): void;
        /** Gets how many OtherRelations by AncestorOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByAncestorOtherIDCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of OtherRelations by AncestorOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByAncestorOtherIDPageCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorOther based on the unique ID of the related OtherRelation.
         *  @return A single OtherRelation, or null. */
        getAncestorOther(api: API, callback: IAPICallback<OtherRelation>): void;
        /** Returns the related AncestorOther based on the unique ID of the related OtherRelation.
         *  @param otherRelationID The ID of the OtherRelation to retrieve.
         *  @return A single OtherRelation, or null. */
        static getAncestorOtherForOtherRelation(otherRelationID: number, api: API, callback: IAPICallback<OtherRelation>): void;
        /** Gets OtherRelations by DescendantOtherID.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByDescendantOtherID(otherID: number, api: API, callback: IAPICallback<Array<OtherRelation>>, page?: number): void;
        /** Gets how many OtherRelations by DescendantOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByDescendantOtherIDCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of OtherRelations by DescendantOtherID exist.
         *  @param otherID The ID of the Other for which to retrieve the child OtherRelations.
         *  @return An Array of OtherRelations. */
        static getByDescendantOtherIDPageCount(otherID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantOther based on the unique ID of the related OtherRelation.
         *  @return A single OtherRelation, or null. */
        getDescendantOther(api: API, callback: IAPICallback<OtherRelation>): void;
        /** Returns the related DescendantOther based on the unique ID of the related OtherRelation.
         *  @param otherRelationID The ID of the OtherRelation to retrieve.
         *  @return A single OtherRelation, or null. */
        static getDescendantOtherForOtherRelation(otherRelationID: number, api: API, callback: IAPICallback<OtherRelation>): void;
    }
    /** Contains properties and static functionality for the RaceEthnicity type. */
    class RaceEthnicity extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentRaceEthnicityID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentRaceEthnicityID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the RaceEthnicities in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of RaceEthnicities */
        static getAll(api: API, callback: IAPICallback<Array<RaceEthnicity>>, page?: number): void;
        /** Gets how many RaceEthnicities exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the RaceEthnicities method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the RaceEthnicity with the specified primary key.
         *  @param id The primary key of the RaceEthnicity to return.
         *  @return The matching RaceEthnicity, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<RaceEthnicity>): void;
        /** Returns a filtered collection of RaceEthnicities based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All RaceEthnicities which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<RaceEthnicity>>, page?: number): void;
        /** Returns a count of how many RaceEthnicities exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of RaceEthnicities which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of RaceEthnicities exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of RaceEthnicitieswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets RaceEthnicities by ParentRaceEthnicityID.
         *  @return An Array of RaceEthnicities. */
        getRaceEthnicities(api: API, callback: IAPICallback<Array<RaceEthnicity>>, page?: number): void;
        /** Gets RaceEthnicities by ParentRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        static getByParentRaceEthnicityID(raceEthnicityID: number, api: API, callback: IAPICallback<Array<RaceEthnicity>>, page?: number): void;
        /** Gets how many RaceEthnicities by ParentRaceEthnicityID exist.
         *  @return An Array of RaceEthnicities. */
        getRaceEthnicitiesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many RaceEthnicities by ParentRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        static getByParentRaceEthnicityIDCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of RaceEthnicities by ParentRaceEthnicityID exist.
         *  @return An Array of RaceEthnicities. */
        getRaceEthnicitiesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of RaceEthnicities by ParentRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicities.
         *  @return An Array of RaceEthnicities. */
        static getByParentRaceEthnicityIDPageCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentRaceEthnicity based on the unique ID of the related RaceEthnicity.
         *  @return A single RaceEthnicity, or null. */
        getParentRaceEthnicity(api: API, callback: IAPICallback<RaceEthnicity>): void;
        /** Returns the related ParentRaceEthnicity based on the unique ID of the related RaceEthnicity.
         *  @param raceEthnicityID The ID of the RaceEthnicity to retrieve.
         *  @return A single RaceEthnicity, or null. */
        static getParentRaceEthnicityForRaceEthnicity(raceEthnicityID: number, api: API, callback: IAPICallback<RaceEthnicity>): void;
    }
    /** Contains properties and static functionality for the RaceEthnicityRelation type. */
    class RaceEthnicityRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorRaceEthnicityID: PropertyMap;
            descendantRaceEthnicityID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorRaceEthnicityID: number;
        descendantRaceEthnicityID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the RaceEthnicityRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of RaceEthnicityRelations */
        static getAll(api: API, callback: IAPICallback<Array<RaceEthnicityRelation>>, page?: number): void;
        /** Gets how many RaceEthnicityRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the RaceEthnicityRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the RaceEthnicityRelation with the specified primary key.
         *  @param id The primary key of the RaceEthnicityRelation to return.
         *  @return The matching RaceEthnicityRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<RaceEthnicityRelation>): void;
        /** Returns a filtered collection of RaceEthnicityRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All RaceEthnicityRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<RaceEthnicityRelation>>, page?: number): void;
        /** Returns a count of how many RaceEthnicityRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of RaceEthnicityRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of RaceEthnicityRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of RaceEthnicityRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets RaceEthnicityRelations by AncestorRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByAncestorRaceEthnicityID(raceEthnicityID: number, api: API, callback: IAPICallback<Array<RaceEthnicityRelation>>, page?: number): void;
        /** Gets how many RaceEthnicityRelations by AncestorRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByAncestorRaceEthnicityIDCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of RaceEthnicityRelations by AncestorRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByAncestorRaceEthnicityIDPageCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @return A single RaceEthnicityRelation, or null. */
        getAncestorRaceEthnicity(api: API, callback: IAPICallback<RaceEthnicityRelation>): void;
        /** Returns the related AncestorRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @param raceEthnicityRelationID The ID of the RaceEthnicityRelation to retrieve.
         *  @return A single RaceEthnicityRelation, or null. */
        static getAncestorRaceEthnicityForRaceEthnicityRelation(raceEthnicityRelationID: number, api: API, callback: IAPICallback<RaceEthnicityRelation>): void;
        /** Gets RaceEthnicityRelations by DescendantRaceEthnicityID.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByDescendantRaceEthnicityID(raceEthnicityID: number, api: API, callback: IAPICallback<Array<RaceEthnicityRelation>>, page?: number): void;
        /** Gets how many RaceEthnicityRelations by DescendantRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByDescendantRaceEthnicityIDCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of RaceEthnicityRelations by DescendantRaceEthnicityID exist.
         *  @param raceEthnicityID The ID of the RaceEthnicity for which to retrieve the child RaceEthnicityRelations.
         *  @return An Array of RaceEthnicityRelations. */
        static getByDescendantRaceEthnicityIDPageCount(raceEthnicityID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @return A single RaceEthnicityRelation, or null. */
        getDescendantRaceEthnicity(api: API, callback: IAPICallback<RaceEthnicityRelation>): void;
        /** Returns the related DescendantRaceEthnicity based on the unique ID of the related RaceEthnicityRelation.
         *  @param raceEthnicityRelationID The ID of the RaceEthnicityRelation to retrieve.
         *  @return A single RaceEthnicityRelation, or null. */
        static getDescendantRaceEthnicityForRaceEthnicityRelation(raceEthnicityRelationID: number, api: API, callback: IAPICallback<RaceEthnicityRelation>): void;
    }
    /** Contains properties and static functionality for the Sex type. */
    class Sex extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentSexID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentSexID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the Sexes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Sexes */
        static getAll(api: API, callback: IAPICallback<Array<Sex>>, page?: number): void;
        /** Gets how many Sexes exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Sexes method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Sex with the specified primary key.
         *  @param id The primary key of the Sex to return.
         *  @return The matching Sex, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Sex>): void;
        /** Returns a filtered collection of Sexes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Sexes which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Sex>>, page?: number): void;
        /** Returns a count of how many Sexes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Sexes which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Sexes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Sexeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Sexes by ParentSexID.
         *  @return An Array of Sexes. */
        getSexes(api: API, callback: IAPICallback<Array<Sex>>, page?: number): void;
        /** Gets Sexes by ParentSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        static getByParentSexID(sexID: number, api: API, callback: IAPICallback<Array<Sex>>, page?: number): void;
        /** Gets how many Sexes by ParentSexID exist.
         *  @return An Array of Sexes. */
        getSexesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Sexes by ParentSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        static getByParentSexIDCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Sexes by ParentSexID exist.
         *  @return An Array of Sexes. */
        getSexesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Sexes by ParentSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child Sexes.
         *  @return An Array of Sexes. */
        static getByParentSexIDPageCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentSex based on the unique ID of the related Sex.
         *  @return A single Sex, or null. */
        getParentSex(api: API, callback: IAPICallback<Sex>): void;
        /** Returns the related ParentSex based on the unique ID of the related Sex.
         *  @param sexID The ID of the Sex to retrieve.
         *  @return A single Sex, or null. */
        static getParentSexForSex(sexID: number, api: API, callback: IAPICallback<Sex>): void;
    }
    /** Contains properties and static functionality for the SexRelation type. */
    class SexRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorSexID: PropertyMap;
            descendantSexID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorSexID: number;
        descendantSexID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the SexRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexRelations */
        static getAll(api: API, callback: IAPICallback<Array<SexRelation>>, page?: number): void;
        /** Gets how many SexRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the SexRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the SexRelation with the specified primary key.
         *  @param id The primary key of the SexRelation to return.
         *  @return The matching SexRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<SexRelation>): void;
        /** Returns a filtered collection of SexRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<SexRelation>>, page?: number): void;
        /** Returns a count of how many SexRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of SexRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets SexRelations by AncestorSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByAncestorSexID(sexID: number, api: API, callback: IAPICallback<Array<SexRelation>>, page?: number): void;
        /** Gets how many SexRelations by AncestorSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByAncestorSexIDCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexRelations by AncestorSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByAncestorSexIDPageCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorSex based on the unique ID of the related SexRelation.
         *  @return A single SexRelation, or null. */
        getAncestorSex(api: API, callback: IAPICallback<SexRelation>): void;
        /** Returns the related AncestorSex based on the unique ID of the related SexRelation.
         *  @param sexRelationID The ID of the SexRelation to retrieve.
         *  @return A single SexRelation, or null. */
        static getAncestorSexForSexRelation(sexRelationID: number, api: API, callback: IAPICallback<SexRelation>): void;
        /** Gets SexRelations by DescendantSexID.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByDescendantSexID(sexID: number, api: API, callback: IAPICallback<Array<SexRelation>>, page?: number): void;
        /** Gets how many SexRelations by DescendantSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByDescendantSexIDCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexRelations by DescendantSexID exist.
         *  @param sexID The ID of the Sex for which to retrieve the child SexRelations.
         *  @return An Array of SexRelations. */
        static getByDescendantSexIDPageCount(sexID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantSex based on the unique ID of the related SexRelation.
         *  @return A single SexRelation, or null. */
        getDescendantSex(api: API, callback: IAPICallback<SexRelation>): void;
        /** Returns the related DescendantSex based on the unique ID of the related SexRelation.
         *  @param sexRelationID The ID of the SexRelation to retrieve.
         *  @return A single SexRelation, or null. */
        static getDescendantSexForSexRelation(sexRelationID: number, api: API, callback: IAPICallback<SexRelation>): void;
    }
    /** Contains properties and static functionality for the SexualOrientation type. */
    class SexualOrientation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentSexualOrientationID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentSexualOrientationID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the SexualOrientations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexualOrientations */
        static getAll(api: API, callback: IAPICallback<Array<SexualOrientation>>, page?: number): void;
        /** Gets how many SexualOrientations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the SexualOrientations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the SexualOrientation with the specified primary key.
         *  @param id The primary key of the SexualOrientation to return.
         *  @return The matching SexualOrientation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<SexualOrientation>): void;
        /** Returns a filtered collection of SexualOrientations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexualOrientations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<SexualOrientation>>, page?: number): void;
        /** Returns a count of how many SexualOrientations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexualOrientations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of SexualOrientations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexualOrientationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets SexualOrientations by ParentSexualOrientationID.
         *  @return An Array of SexualOrientations. */
        getSexualOrientations(api: API, callback: IAPICallback<Array<SexualOrientation>>, page?: number): void;
        /** Gets SexualOrientations by ParentSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        static getByParentSexualOrientationID(sexualOrientationID: number, api: API, callback: IAPICallback<Array<SexualOrientation>>, page?: number): void;
        /** Gets how many SexualOrientations by ParentSexualOrientationID exist.
         *  @return An Array of SexualOrientations. */
        getSexualOrientationsCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many SexualOrientations by ParentSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        static getByParentSexualOrientationIDCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexualOrientations by ParentSexualOrientationID exist.
         *  @return An Array of SexualOrientations. */
        getSexualOrientationsPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexualOrientations by ParentSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientations.
         *  @return An Array of SexualOrientations. */
        static getByParentSexualOrientationIDPageCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentSexualOrientation based on the unique ID of the related SexualOrientation.
         *  @return A single SexualOrientation, or null. */
        getParentSexualOrientation(api: API, callback: IAPICallback<SexualOrientation>): void;
        /** Returns the related ParentSexualOrientation based on the unique ID of the related SexualOrientation.
         *  @param sexualOrientationID The ID of the SexualOrientation to retrieve.
         *  @return A single SexualOrientation, or null. */
        static getParentSexualOrientationForSexualOrientation(sexualOrientationID: number, api: API, callback: IAPICallback<SexualOrientation>): void;
    }
    /** Contains properties and static functionality for the SexualOrientationRelation type. */
    class SexualOrientationRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorSexualOrientationID: PropertyMap;
            descendantSexualOrientationID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorSexualOrientationID: number;
        descendantSexualOrientationID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the SexualOrientationRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of SexualOrientationRelations */
        static getAll(api: API, callback: IAPICallback<Array<SexualOrientationRelation>>, page?: number): void;
        /** Gets how many SexualOrientationRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the SexualOrientationRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the SexualOrientationRelation with the specified primary key.
         *  @param id The primary key of the SexualOrientationRelation to return.
         *  @return The matching SexualOrientationRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<SexualOrientationRelation>): void;
        /** Returns a filtered collection of SexualOrientationRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All SexualOrientationRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<SexualOrientationRelation>>, page?: number): void;
        /** Returns a count of how many SexualOrientationRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of SexualOrientationRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of SexualOrientationRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of SexualOrientationRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets SexualOrientationRelations by AncestorSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByAncestorSexualOrientationID(sexualOrientationID: number, api: API, callback: IAPICallback<Array<SexualOrientationRelation>>, page?: number): void;
        /** Gets how many SexualOrientationRelations by AncestorSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByAncestorSexualOrientationIDCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexualOrientationRelations by AncestorSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByAncestorSexualOrientationIDPageCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @return A single SexualOrientationRelation, or null. */
        getAncestorSexualOrientation(api: API, callback: IAPICallback<SexualOrientationRelation>): void;
        /** Returns the related AncestorSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @param sexualOrientationRelationID The ID of the SexualOrientationRelation to retrieve.
         *  @return A single SexualOrientationRelation, or null. */
        static getAncestorSexualOrientationForSexualOrientationRelation(sexualOrientationRelationID: number, api: API, callback: IAPICallback<SexualOrientationRelation>): void;
        /** Gets SexualOrientationRelations by DescendantSexualOrientationID.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByDescendantSexualOrientationID(sexualOrientationID: number, api: API, callback: IAPICallback<Array<SexualOrientationRelation>>, page?: number): void;
        /** Gets how many SexualOrientationRelations by DescendantSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByDescendantSexualOrientationIDCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of SexualOrientationRelations by DescendantSexualOrientationID exist.
         *  @param sexualOrientationID The ID of the SexualOrientation for which to retrieve the child SexualOrientationRelations.
         *  @return An Array of SexualOrientationRelations. */
        static getByDescendantSexualOrientationIDPageCount(sexualOrientationID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @return A single SexualOrientationRelation, or null. */
        getDescendantSexualOrientation(api: API, callback: IAPICallback<SexualOrientationRelation>): void;
        /** Returns the related DescendantSexualOrientation based on the unique ID of the related SexualOrientationRelation.
         *  @param sexualOrientationRelationID The ID of the SexualOrientationRelation to retrieve.
         *  @return A single SexualOrientationRelation, or null. */
        static getDescendantSexualOrientationForSexualOrientationRelation(sexualOrientationRelationID: number, api: API, callback: IAPICallback<SexualOrientationRelation>): void;
    }
    /** Contains properties and static functionality for the Timeframe type. */
    class Timeframe extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            firstYear: PropertyMap;
            lastYear: PropertyMap;
            twoDigitFirstYear: PropertyMap;
            twoDigitLastYear: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        name: string;
        firstYear: number;
        lastYear: number;
        twoDigitFirstYear: string;
        twoDigitLastYear: string;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the Timeframes in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Timeframes */
        static getAll(api: API, callback: IAPICallback<Array<Timeframe>>, page?: number): void;
        /** Gets how many Timeframes exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Timeframes method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Timeframe with the specified primary key.
         *  @param id The primary key of the Timeframe to return.
         *  @return The matching Timeframe, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Timeframe>): void;
        /** Returns a filtered collection of Timeframes based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Timeframes which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Timeframe>>, page?: number): void;
        /** Returns a count of how many Timeframes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Timeframes which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Timeframes exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Timeframeswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the Total type. */
    class Total extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentTotalID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentTotalID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the Totals in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Totals */
        static getAll(api: API, callback: IAPICallback<Array<Total>>, page?: number): void;
        /** Gets how many Totals exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Totals method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Total with the specified primary key.
         *  @param id The primary key of the Total to return.
         *  @return The matching Total, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Total>): void;
        /** Returns a filtered collection of Totals based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Totals which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Total>>, page?: number): void;
        /** Returns a count of how many Totals exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Totals which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Totals exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Totalswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets Totals by ParentTotalID.
         *  @return An Array of Totals. */
        getTotals(api: API, callback: IAPICallback<Array<Total>>, page?: number): void;
        /** Gets Totals by ParentTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        static getByParentTotalID(totalID: number, api: API, callback: IAPICallback<Array<Total>>, page?: number): void;
        /** Gets how many Totals by ParentTotalID exist.
         *  @return An Array of Totals. */
        getTotalsCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many Totals by ParentTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        static getByParentTotalIDCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Totals by ParentTotalID exist.
         *  @return An Array of Totals. */
        getTotalsPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of Totals by ParentTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child Totals.
         *  @return An Array of Totals. */
        static getByParentTotalIDPageCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentTotal based on the unique ID of the related Total.
         *  @return A single Total, or null. */
        getParentTotal(api: API, callback: IAPICallback<Total>): void;
        /** Returns the related ParentTotal based on the unique ID of the related Total.
         *  @param totalID The ID of the Total to retrieve.
         *  @return A single Total, or null. */
        static getParentTotalForTotal(totalID: number, api: API, callback: IAPICallback<Total>): void;
    }
    /** Contains properties and static functionality for the TotalRelation type. */
    class TotalRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorTotalID: PropertyMap;
            descendantTotalID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorTotalID: number;
        descendantTotalID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the TotalRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of TotalRelations */
        static getAll(api: API, callback: IAPICallback<Array<TotalRelation>>, page?: number): void;
        /** Gets how many TotalRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the TotalRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the TotalRelation with the specified primary key.
         *  @param id The primary key of the TotalRelation to return.
         *  @return The matching TotalRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<TotalRelation>): void;
        /** Returns a filtered collection of TotalRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All TotalRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<TotalRelation>>, page?: number): void;
        /** Returns a count of how many TotalRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of TotalRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of TotalRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of TotalRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets TotalRelations by AncestorTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByAncestorTotalID(totalID: number, api: API, callback: IAPICallback<Array<TotalRelation>>, page?: number): void;
        /** Gets how many TotalRelations by AncestorTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByAncestorTotalIDCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of TotalRelations by AncestorTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByAncestorTotalIDPageCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorTotal based on the unique ID of the related TotalRelation.
         *  @return A single TotalRelation, or null. */
        getAncestorTotal(api: API, callback: IAPICallback<TotalRelation>): void;
        /** Returns the related AncestorTotal based on the unique ID of the related TotalRelation.
         *  @param totalRelationID The ID of the TotalRelation to retrieve.
         *  @return A single TotalRelation, or null. */
        static getAncestorTotalForTotalRelation(totalRelationID: number, api: API, callback: IAPICallback<TotalRelation>): void;
        /** Gets TotalRelations by DescendantTotalID.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByDescendantTotalID(totalID: number, api: API, callback: IAPICallback<Array<TotalRelation>>, page?: number): void;
        /** Gets how many TotalRelations by DescendantTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByDescendantTotalIDCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of TotalRelations by DescendantTotalID exist.
         *  @param totalID The ID of the Total for which to retrieve the child TotalRelations.
         *  @return An Array of TotalRelations. */
        static getByDescendantTotalIDPageCount(totalID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantTotal based on the unique ID of the related TotalRelation.
         *  @return A single TotalRelation, or null. */
        getDescendantTotal(api: API, callback: IAPICallback<TotalRelation>): void;
        /** Returns the related DescendantTotal based on the unique ID of the related TotalRelation.
         *  @param totalRelationID The ID of the TotalRelation to retrieve.
         *  @return A single TotalRelation, or null. */
        static getDescendantTotalForTotalRelation(totalRelationID: number, api: API, callback: IAPICallback<TotalRelation>): void;
    }
    /** Contains properties and static functionality for the Url type. */
    class Url extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            linkTag: PropertyMap;
            internal: PropertyMap;
            falsePositive: PropertyMap;
            path: PropertyMap;
            title: PropertyMap;
            modifyDate: PropertyMap;
            validationDate: PropertyMap;
            validationStatus: PropertyMap;
        };
        id: number;
        linkTag: string;
        internal: boolean;
        falsePositive: boolean;
        path: string;
        title: string;
        modifyDate: Date;
        validationDate: Date;
        validationStatus: number;
        protected getFields(): any;
        /** Gets a list of all of the Urls in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Urls */
        static getAll(api: API, callback: IAPICallback<Array<Url>>, page?: number): void;
        /** Gets how many Urls exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Urls method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Url with the specified primary key.
         *  @param id The primary key of the Url to return.
         *  @return The matching Url, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Url>): void;
        /** Returns a filtered collection of Urls based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Urls which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Url>>, page?: number): void;
        /** Returns a count of how many Urls exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Urls which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Urls exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Urlswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the ValueLabel type. */
    class ValueLabel extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            label: PropertyMap;
        };
        id: number;
        label: string;
        protected getFields(): any;
        /** Gets a list of all of the ValueLabels in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of ValueLabels */
        static getAll(api: API, callback: IAPICallback<Array<ValueLabel>>, page?: number): void;
        /** Gets how many ValueLabels exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the ValueLabels method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the ValueLabel with the specified primary key.
         *  @param id The primary key of the ValueLabel to return.
         *  @return The matching ValueLabel, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<ValueLabel>): void;
        /** Returns a filtered collection of ValueLabels based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All ValueLabels which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<ValueLabel>>, page?: number): void;
        /** Returns a count of how many ValueLabels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of ValueLabels which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of ValueLabels exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of ValueLabelswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
    /** Contains properties and static functionality for the VeteranStatus type. */
    class VeteranStatus extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            name: PropertyMap;
            parentVeteranStatusID: PropertyMap;
            dimensionKey: PropertyMap;
            treeGraph: PropertyMap;
            nameGraph: PropertyMap;
            sortOrder: PropertyMap;
            depth: PropertyMap;
        };
        id: number;
        name: string;
        parentVeteranStatusID: number;
        dimensionKey: string;
        treeGraph: string;
        nameGraph: string;
        sortOrder: number;
        depth: number;
        protected getFields(): any;
        /** Gets a list of all of the VeteranStatuses in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of VeteranStatuses */
        static getAll(api: API, callback: IAPICallback<Array<VeteranStatus>>, page?: number): void;
        /** Gets how many VeteranStatuses exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the VeteranStatuses method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the VeteranStatus with the specified primary key.
         *  @param id The primary key of the VeteranStatus to return.
         *  @return The matching VeteranStatus, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<VeteranStatus>): void;
        /** Returns a filtered collection of VeteranStatuses based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All VeteranStatuses which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<VeteranStatus>>, page?: number): void;
        /** Returns a count of how many VeteranStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of VeteranStatuses which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of VeteranStatuses exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of VeteranStatuseswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets VeteranStatuses by ParentVeteranStatusID.
         *  @return An Array of VeteranStatuses. */
        getVeteranStatuses(api: API, callback: IAPICallback<Array<VeteranStatus>>, page?: number): void;
        /** Gets VeteranStatuses by ParentVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        static getByParentVeteranStatusID(veteranStatusID: number, api: API, callback: IAPICallback<Array<VeteranStatus>>, page?: number): void;
        /** Gets how many VeteranStatuses by ParentVeteranStatusID exist.
         *  @return An Array of VeteranStatuses. */
        getVeteranStatusesCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many VeteranStatuses by ParentVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        static getByParentVeteranStatusIDCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of VeteranStatuses by ParentVeteranStatusID exist.
         *  @return An Array of VeteranStatuses. */
        getVeteranStatusesPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of VeteranStatuses by ParentVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatuses.
         *  @return An Array of VeteranStatuses. */
        static getByParentVeteranStatusIDPageCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related ParentVeteranStatus based on the unique ID of the related VeteranStatus.
         *  @return A single VeteranStatus, or null. */
        getParentVeteranStatus(api: API, callback: IAPICallback<VeteranStatus>): void;
        /** Returns the related ParentVeteranStatus based on the unique ID of the related VeteranStatus.
         *  @param veteranStatusID The ID of the VeteranStatus to retrieve.
         *  @return A single VeteranStatus, or null. */
        static getParentVeteranStatusForVeteranStatus(veteranStatusID: number, api: API, callback: IAPICallback<VeteranStatus>): void;
    }
    /** Contains properties and static functionality for the VeteranStatusRelation type. */
    class VeteranStatusRelation extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            ancestorVeteranStatusID: PropertyMap;
            descendantVeteranStatusID: PropertyMap;
            hops: PropertyMap;
        };
        id: number;
        ancestorVeteranStatusID: number;
        descendantVeteranStatusID: number;
        hops: number;
        protected getFields(): any;
        /** Gets a list of all of the VeteranStatusRelations in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of VeteranStatusRelations */
        static getAll(api: API, callback: IAPICallback<Array<VeteranStatusRelation>>, page?: number): void;
        /** Gets how many VeteranStatusRelations exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the VeteranStatusRelations method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the VeteranStatusRelation with the specified primary key.
         *  @param id The primary key of the VeteranStatusRelation to return.
         *  @return The matching VeteranStatusRelation, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<VeteranStatusRelation>): void;
        /** Returns a filtered collection of VeteranStatusRelations based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All VeteranStatusRelations which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<VeteranStatusRelation>>, page?: number): void;
        /** Returns a count of how many VeteranStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of VeteranStatusRelations which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of VeteranStatusRelations exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of VeteranStatusRelationswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Gets VeteranStatusRelations by AncestorVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByAncestorVeteranStatusID(veteranStatusID: number, api: API, callback: IAPICallback<Array<VeteranStatusRelation>>, page?: number): void;
        /** Gets how many VeteranStatusRelations by AncestorVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByAncestorVeteranStatusIDCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of VeteranStatusRelations by AncestorVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByAncestorVeteranStatusIDPageCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related AncestorVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @return A single VeteranStatusRelation, or null. */
        getAncestorVeteranStatus(api: API, callback: IAPICallback<VeteranStatusRelation>): void;
        /** Returns the related AncestorVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @param veteranStatusRelationID The ID of the VeteranStatusRelation to retrieve.
         *  @return A single VeteranStatusRelation, or null. */
        static getAncestorVeteranStatusForVeteranStatusRelation(veteranStatusRelationID: number, api: API, callback: IAPICallback<VeteranStatusRelation>): void;
        /** Gets VeteranStatusRelations by DescendantVeteranStatusID.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByDescendantVeteranStatusID(veteranStatusID: number, api: API, callback: IAPICallback<Array<VeteranStatusRelation>>, page?: number): void;
        /** Gets how many VeteranStatusRelations by DescendantVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByDescendantVeteranStatusIDCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of VeteranStatusRelations by DescendantVeteranStatusID exist.
         *  @param veteranStatusID The ID of the VeteranStatus for which to retrieve the child VeteranStatusRelations.
         *  @return An Array of VeteranStatusRelations. */
        static getByDescendantVeteranStatusIDPageCount(veteranStatusID: number, api: API, callback: IAPICallback<number>): void;
        /** Returns the related DescendantVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @return A single VeteranStatusRelation, or null. */
        getDescendantVeteranStatus(api: API, callback: IAPICallback<VeteranStatusRelation>): void;
        /** Returns the related DescendantVeteranStatus based on the unique ID of the related VeteranStatusRelation.
         *  @param veteranStatusRelationID The ID of the VeteranStatusRelation to retrieve.
         *  @return A single VeteranStatusRelation, or null. */
        static getDescendantVeteranStatusForVeteranStatusRelation(veteranStatusRelationID: number, api: API, callback: IAPICallback<VeteranStatusRelation>): void;
    }
    /** Contains properties and static functionality for the Year type. */
    class Year extends ServiceDataObject {
        static Fields: {
            id: PropertyMap;
            fullYear: PropertyMap;
            twoDigitYear: PropertyMap;
            sortOrder: PropertyMap;
        };
        id: number;
        fullYear: number;
        twoDigitYear: string;
        sortOrder: number;
        protected getFields(): any;
        /** Gets a list of all of the Years in the database.
         *  @param  page The page of data to retrieve.
         *  @return  An IEnumerable of Years */
        static getAll(api: API, callback: IAPICallback<Array<Year>>, page?: number): void;
        /** Gets how many Years exist. */
        static getAllCount(api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of data exist for the Years method. */
        static getAllPageCount(api: API, callback: IAPICallback<number>): void;
        /** Gets the Year with the specified primary key.
         *  @param id The primary key of the Year to return.
         *  @return The matching Year, if one exists, or null. */
        static getByID(id: number, api: API, callback: IAPICallback<Year>): void;
        /** Returns a filtered collection of Years based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return All Years which match the provided filter. */
        static filter(filter: Filter, api: API, callback: IAPICallback<Array<Year>>, page?: number): void;
        /** Returns a count of how many Years exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The count of Years which match the provided filter. */
        static filterCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
        /** Returns a count of how many pages of Years exist based on the provided filter.
         *  @param filter The Filter to apply.
         *  @return The page count of Yearswhich match the provided filter. */
        static filterPageCount(filter: Filter, api: API, callback: IAPICallback<number>): void;
    }
}
declare module hiw {
    class IndicatorDataItem extends ServiceDataObject {
        static Fields: {
            indicatorID: PropertyMap;
            dimensionList: PropertyMap;
            timeframe: PropertyMap;
            numericValue: PropertyMap;
            missingValueFlag: PropertyMap;
            confidenceIntervalLow: PropertyMap;
            confidenceIntervalHigh: PropertyMap;
            standardError: PropertyMap;
            locale: PropertyMap;
            localeLevel: PropertyMap;
            localeStateFIPSCode: PropertyMap;
            localeCountyFIPSCode: PropertyMap;
            localeCountySSACode: PropertyMap;
            localeHRRCode: PropertyMap;
            total: PropertyMap;
            age: PropertyMap;
            sex: PropertyMap;
            raceEthnicity: PropertyMap;
            incomeAndPovertyStatus: PropertyMap;
            educationalAttainment: PropertyMap;
            healthInsuranceStatus: PropertyMap;
            sexualOrientation: PropertyMap;
            maritalStatus: PropertyMap;
            familyType: PropertyMap;
            veteranStatus: PropertyMap;
            countryOfBirth: PropertyMap;
            disabilityStatus: PropertyMap;
            obesityStatus: PropertyMap;
            characteristicOfSchoolOrStudent: PropertyMap;
            other: PropertyMap;
            geography: PropertyMap;
            modifier1: PropertyMap;
            modifier2: PropertyMap;
            modifier3: PropertyMap;
            modifier4: PropertyMap;
            modifier5: PropertyMap;
            numerator: PropertyMap;
            denominator: PropertyMap;
        };
        indicatorID: string;
        dimensionList: string;
        timeframe: string;
        numericValue: string;
        missingValueFlag: string;
        confidenceIntervalLow: string;
        confidenceIntervalHigh: string;
        standardError: string;
        locale: string;
        localeLevel: string;
        localeStateFIPSCode: string;
        localeCountyFIPSCode: string;
        localeCountySSACode: string;
        localeHRRCode: string;
        total: string;
        age: string;
        sex: string;
        raceEthnicity: string;
        incomeAndPovertyStatus: string;
        educationalAttainment: string;
        healthInsuranceStatus: string;
        sexualOrientation: string;
        maritalStatus: string;
        familyType: string;
        veteranStatus: string;
        countryOfBirth: string;
        disabilityStatus: string;
        obesityStatus: string;
        characteristicOfSchoolOrStudent: string;
        other: string;
        geography: string;
        modifier1: string;
        modifier2: string;
        modifier3: string;
        modifier4: string;
        modifier5: string;
        numerator: string;
        denominator: string;
        protected getFields(): any;
        /** Gets a list of all of the (flattened) IndicatorDataItems in the database which are associated with the IndicatorDescription table via the ID column.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        static getByIndicatorDescriptionID(indicatorDescriptionID: number, api: API, callback: IAPICallback<Array<IndicatorDataItem>>, page?: number): void;
        /** Gets how many IndicatorDataItems by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        static getByIndicatorDescriptionIDCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
        /** Gets how many pages of IndicatorDataItems by IndicatorDescriptionID exist.
         *  @param indicatorDescriptionID The ID of the IndicatorDescription for which to retrieve the child IndicatorDataItems.
         *  @return An Array of IndicatorDataItems. */
        static getByIndicatorDescriptionIDPageCount(indicatorDescriptionID: number, api: API, callback: IAPICallback<number>): void;
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
declare module hiw {
    class VersionInfo extends ServiceDataObject {
        static Fields: {
            hiwVersion: PropertyMap;
            loadDate: PropertyMap;
            serviceVersion: PropertyMap;
        };
        hiwVersion: Version;
        loadDate: Date;
        serviceVersion: number;
        protected getFields(): any;
        static Version(api: API, callback: IAPICallback<VersionInfo>): void;
    }
}
declare module hiw {
}
