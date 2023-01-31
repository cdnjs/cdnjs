/// <reference types="react" />
declare module "settings" {
    /**
     * Global survey settings
     */
    export var settings: {
        /**
         * Options for SurveyJS comparator. By default we trim strings and compare them as case insensitive. To change the behavior you can use following code:
         * settings.comparator.trimStrings = false; //"abc " will not equal to "abc". They are equal by default.
         * settings.comparator.caseSensitive = true; //"abc " will not equal to "Abc". They are equal by default.
         */
        comparator: {
            trimStrings: boolean;
            caseSensitive: boolean;
        };
        expressionDisableConversionChar: string;
        /**
         * Set this value to false, if you want to have UTC fuctions, for example setUTCHours inside our functions, like today.
         * By default it uses setHours function, with local date
         */
        useLocalTimeZone: boolean;
        commentPrefix: string;
        /**
         * The suffix that uses to store the question comment, as "questionName + commentSuffix".
         * The default value is "-Comment"
         */
        commentSuffix: string;
        /**
         * Encode parameter on calling restful web API
         */
        webserviceEncodeParameters: boolean;
        /**
         * Cache the result for choices getting from web services. Set this property to false, to disable the caching.
         */
        useCachingForChoicesRestful: boolean;
        useCachingForChoicesRestfull: boolean;
        /**
         * SurveyJS web service API url
         */
        surveyServiceUrl: string;
        /**
         * separator that can allow to set value and text of ItemValue object in one string as: "value|text"
         */
        itemValueSeparator: string;
        /**
         * Set it to true to serialize itemvalue instance always as object even if text property is empty
         * const item = new Survey.ItemValue(5);
         * item.toJSON(); //will return {value: 5}, instead of 5 by default.
         */
        itemValueAlwaysSerializeAsObject: boolean;
        /**
         * Set it to true to serialize itemvalue text property, even if it is empty or equals to value
         * const item = new Survey.ItemValue("item1");
         * item.toJSON(); //will return {value: item1, text: "item1"}, instead of "item1" by default.
         */
        itemValueAlwaysSerializeText: boolean;
        /**
         * default locale name for localizable strings that uses during serialization, {"default": "My text", "de": "Mein Text"}
         */
        defaultLocaleName: string;
        /**
         * By default we do not store a value for a locale if it equals to "default" locale value
         */
        storeDuplicatedTranslations: boolean;
        /**
         * Default row name for matrix (single choice)
         */
        matrixDefaultRowName: string;
        /**
         * Default cell type for dropdown and dynamic matrices
         */
        matrixDefaultCellType: string;
        /**
         * Total value postfix for dropdown and dynamic matrices. The total value stores as: {matrixName} + {postfix}
         */
        matrixTotalValuePostFix: string;
        /**
         * Maximum row count in dynamic matrix
         */
        matrixMaximumRowCount: number;
        /**
         * Maximum rowCount that returns in addConditionObjectsByContext function
         */
        matrixMaxRowCountInCondition: number;
        /**
         * Set this property to false, to render matrix dynamic remove action as button.
         * It is rendered as icon in new themes ("defaultV2") by default.
         */
        matrixRenderRemoveAsIcon: boolean;
        /**
         * Maximum panel count in dynamic panel
         */
        panelMaximumPanelCount: number;
        /**
         * Maximum rate value count in rating question
         */
        ratingMaximumRateValueCount: number;
        /**
         * Disable the question while choices are getting from the web service
         */
        disableOnGettingChoicesFromWeb: boolean;
        /**
         * Set to true to always serialize the localization string as object even if there is only one value for default locale. Instead of string "MyStr" serialize as {default: "MyStr"}
         */
        serializeLocalizableStringAsObject: boolean;
        /**
         * Set to false to hide empty page title and description in design mode
         */
        allowShowEmptyTitleInDesignMode: boolean;
        /**
         * Set to false to hide empty page description in design mode
         */
        allowShowEmptyDescriptionInDesignMode: boolean;
        /**
         * Set this property to true to execute the complete trigger on value change instead of on next page.
         */
        executeCompleteTriggerOnValueChanged: boolean;
        /**
         * Set this property to false to stop showing "Compete" button when the complete trigger is going to be executed.
         */
        changeNavigationButtonsOnCompleteTrigger: boolean;
        /**
         * Set this property to false to execute the skip trigger on next page instead of on value change.
         */
        executeSkipTriggerOnValueChanged: boolean;
        /**
         * Specifies how the input field of [Comment](https://surveyjs.io/Documentation/Library?id=questioncommentmodel) questions is rendered in the read-only mode.
         * Available values:
         * "textarea" (default) - A 'textarea' element is used to render a Comment question's input field.
         * "div" - A 'div' element is used to render a Comment question's input field.
         */
        readOnlyCommentRenderMode: string;
        /**
         * Specifies how the input field of [Text](https://surveyjs.io/Documentation/Library?id=questiontextmodel) questions is rendered in the read-only mode.
         * Available values:
         * "input" (default) - An 'input' element is used to render a Text question's input field.
         * "div" - A 'div' element is used to render a Text question's input field.
         */
        readOnlyTextRenderMode: string;
        /**
         * Override this function, set your function, if you want to show your own dialog confirm window instead of standard browser window.
         * @param message
         */
        confirmActionFunc: (message: string) => boolean;
        /**
         * Set this property to change the default value of the minWidth constraint
         */
        minWidth: string;
        /**
         * Set this property to change the default value of the maxWidth constraint
         */
        maxWidth: string;
        /**
         * This property tells how many times survey re-run expressions on value changes during condition running. We need it to avoid recursions in the expressions
         */
        maximumConditionRunCountOnValueChanged: number;
        /**
         * By default visibleIndex for question with titleLocation = "hidden" is -1, and survey doesn't count these questions when set questions numbers.
         * Set it true, and a question next to a question with hidden title will increase it's number.
         */
        setQuestionVisibleIndexForHiddenTitle: boolean;
        /**
         * By default visibleIndex for question with hideNumber = true is -1, and survey doesn't count these questions when set questions numbers.
         * Set it true, and a question next to a question with hidden title number will increase it's number.
         */
        setQuestionVisibleIndexForHiddenNumber: boolean;
        /**
         * By default all rows are rendered no matters whwther they are visible.
         * Set it true, and survey markup rows will be rendered only if they are visible in viewport.
         * This feature is experimantal and might do not support all the use cases.
         */
        lazyRowsRendering: boolean;
        lazyRowsRenderingStartRow: number;
        /**
         * Notification settings
         */
        notifications: {
            lifetime: number;
        };
        /**
         * By default checkbox and radiogroup items are ordered in rows.
         * Set it "column", and items will be ordered in columns.
         */
        showItemsInOrder: string;
        /**
         * A value to save in survey results when respondents select the None choice item.
         */
        noneItemValue: string;
        /**
         * Supported validators by question types. You can modify this variable to add validators for new question types or add/remove for existing question types.
         */
        supportedValidators: {
            question: string[];
            comment: string[];
            text: string[];
            checkbox: string[];
            imagepicker: string[];
        };
        /**
         * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that less than this value
         */
        minDate: string;
        /**
         * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that greater than this value
         */
        maxDate: string;
        showModal: (componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, cssClass?: string, title?: string, displayMode?: "popup" | "overlay") => any;
        supportCreatorV2: boolean;
        showDefaultItemsInCreatorV2: boolean;
        /**
         * Specifies a list of custom icons.
         * Use this property to replace SurveyJS default icons (displayed in UI elements of SurveyJS Library or Creator) with your custom icons.
         * For every default icon to replace, add a key/value object with the default icon's name as a key and the name of your custom icon as a value.
         * For example: Survey.settings.customIcons["icon-redo"] = "my-own-redo-icon"
         */
        customIcons: {};
        /**
         * Specifies which part of a choice item item responds to a drag gesture in Ranking questions.
         *
         * Possible values:
         *
         * - `"entireItem"` (default) - Users can use the entire choice item as a drag handle.
         * - `"icon"` - Users can only use the choice item icon as a drag handle.
         */
        rankingDragHandleArea: string;
        titleTags: {
            survey: string;
            page: string;
            panel: string;
            question: string;
        };
        questions: {
            inputTypes: string[];
            dataList: string[];
        };
    };
}
declare module "helpers" {
    export interface HashTable<T = any> {
        [key: string]: T;
    }
    export class Helpers {
        /**
         * A static methods that returns true if a value undefined, null, empty string or empty array.
         * @param value
         */
        static isValueEmpty(value: any): boolean;
        static isArrayContainsEqual(x: any, y: any): boolean;
        static isArraysEqual(x: any, y: any, ignoreOrder?: boolean, caseSensitive?: boolean, trimStrings?: boolean): boolean;
        static isTwoValueEquals(x: any, y: any, ignoreOrder?: boolean, caseSensitive?: boolean, trimStrings?: boolean): boolean;
        static randomizeArray<T>(array: Array<T>): Array<T>;
        static getUnbindValue(value: any): any;
        static createCopy(obj: any): any;
        static isConvertibleToNumber(value: any): boolean;
        static isNumber(value: any): boolean;
        static getMaxLength(maxLength: number, surveyLength: number): any;
        static getNumberByIndex(index: number, startIndexStr: string): string;
        static isCharNotLetterAndDigit(ch: string): boolean;
        static isCharDigit(ch: string): boolean;
        private static countDecimals;
        static correctAfterPlusMinis(a: number, b: number, res: number): number;
        static sumAnyValues(a: any, b: any): any;
        static correctAfterMultiple(a: number, b: number, res: number): number;
        static convertArrayValueToObject(src: Array<any>, propName: string, dest?: Array<any>): Array<any>;
        private static findObjByPropValue;
        static convertArrayObjectToValue(src: Array<any>, propName: string): Array<any>;
        static convertDateToString(date: Date): string;
        static convertDateTimeToString(date: Date): string;
        static convertValToQuestionVal(val: any, inputType?: string): any;
    }
}
declare module "localization/english" {
    export var englishStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        emptyMessage: string;
        noEntriesText: string;
        noEntriesReadonlyText: string;
        more: string;
        tagboxDoneButtonCaption: string;
    };
}
declare module "surveyStrings" {
    export var surveyLocalization: {
        currentLocaleValue: string;
        defaultLocaleValue: string;
        locales: {
            [index: string]: any;
        };
        localeNames: {
            [index: string]: any;
        };
        supportedLocales: any[];
        currentLocale: string;
        defaultLocale: string;
        getLocaleStrings(loc: string): any;
        getCurrentStrings(locale?: string): any;
        getString: (strName: string, locale?: string) => any;
        getLocales: (removeDefaultLoc?: boolean) => Array<string>;
        onGetExternalString: (name: string, locale: string) => string;
    };
    export var surveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        emptyMessage: string;
        noEntriesText: string;
        noEntriesReadonlyText: string;
        more: string;
        tagboxDoneButtonCaption: string;
    };
}
declare module "localizablestring" {
    import { EventBase } from "base";
    export interface ILocalizableOwner {
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getProcessedText(text: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
    }
    export interface ILocalizableString {
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, newValue: string): any;
        getJson(): any;
        getLocales(): Array<string>;
        getIsMultiple(): boolean;
    }
    /**
     * The class represents the string that supports multi-languages and markdown.
     * It uses in all objects where support for multi-languages and markdown is required.
     */
    export class LocalizableString implements ILocalizableString {
        owner: ILocalizableOwner;
        useMarkdown: boolean;
        name?: string;
        static SerializeAsObject: boolean;
        static get defaultLocale(): string;
        static set defaultLocale(val: string);
        static defaultRenderer: string;
        static editableRenderer: string;
        private values;
        private htmlValues;
        private renderedText;
        private calculatedTextValue;
        localizationName: string;
        onGetTextCallback: (str: string) => string;
        onGetDefaultTextCallback: () => string;
        storeDefaultText: boolean;
        onGetLocalizationTextCallback: (str: string) => string;
        onStrChanged: (oldValue: string, newValue: string) => void;
        onSearchChanged: () => void;
        sharedData: LocalizableString;
        searchText: string;
        searchIndex: number;
        constructor(owner: ILocalizableOwner, useMarkdown?: boolean, name?: string);
        getIsMultiple(): boolean;
        get locale(): string;
        strChanged(): void;
        get text(): string;
        set text(value: string);
        get calculatedText(): string;
        private calcText;
        get pureText(): string;
        private getRootDialect;
        private getLocalizationName;
        private getLocalizationStr;
        get hasHtml(): boolean;
        get html(): string;
        get isEmpty(): boolean;
        get textOrHtml(): string;
        get renderedHtml(): string;
        getLocaleText(loc: string): string;
        private getLocaleTextWithDefault;
        setLocaleText(loc: string, value: string): void;
        private canRemoveLocValue;
        private fireStrChanged;
        hasNonDefaultText(): boolean;
        getLocales(): Array<string>;
        getJson(): any;
        setJson(value: any): void;
        get renderAs(): string;
        get renderAsData(): any;
        equals(obj: any): boolean;
        private searchableText;
        setFindText(text: string): boolean;
        onChanged(): void;
        onStringChanged: EventBase<LocalizableString>;
        protected onCreating(): void;
        private hasHtmlValue;
        getHtmlValue(): string;
        private deleteValuesEqualsToDefault;
        private getValue;
        private setValue;
        private deleteValue;
        private getValuesKeys;
        private get defaultLoc();
    }
    /**
     * The class represents the list of strings that supports multi-languages.
     */
    export class LocalizableStrings implements ILocalizableString {
        owner: ILocalizableOwner;
        private values;
        onValueChanged: (oldValue: any, newValue: any) => void;
        constructor(owner: ILocalizableOwner);
        getIsMultiple(): boolean;
        get locale(): string;
        get value(): Array<string>;
        set value(val: Array<string>);
        get text(): string;
        set text(val: string);
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, newValue: string): any;
        getValue(loc: string): Array<string>;
        private getValueCore;
        setValue(loc: string, val: Array<string>): void;
        hasValue(loc?: string): boolean;
        get isEmpty(): boolean;
        private getLocale;
        getLocales(): Array<string>;
        getJson(): any;
        setJson(value: any): void;
        private getValuesKeys;
    }
}
declare module "jsonobject" {
    import { Base } from "base";
    export interface IPropertyDecoratorOptions<T = any> {
        defaultValue?: T;
        defaultSource?: string;
        getDefaultValue?: (objectInstance?: any) => T;
        localizable?: {
            name?: string;
            onGetTextCallback?: (str: string) => string;
            defaultStr?: string;
        } | boolean;
        onSet?: (val: T, objectInstance: any) => void;
    }
    export function property(options?: IPropertyDecoratorOptions): (target: any, key: string) => void;
    export interface IArrayPropertyDecoratorOptions {
        onPush?: any;
        onRemove?: any;
        onSet?: (val: any, target: any) => void;
    }
    export function propertyArray(options?: IArrayPropertyDecoratorOptions): (target: any, key: string) => void;
    export interface IObject {
        [key: string]: any;
    }
    /**
     * Contains information about a property of a survey element (page, panel, questions, and etc).
     * @see addProperty
     * @see removeProperty
     * @see [Add Properties](https://surveyjs.io/Documentation/Survey-Creator#addproperties)
     * @see [Remove Properties](https://surveyjs.io/Documentation/Survey-Creator#removeproperties)
     */
    export class JsonObjectProperty implements IObject {
        name: string;
        static getItemValuesDefaultValue: (val: any, type: string) => any;
        [key: string]: any;
        private static Index;
        private static mergableValues;
        private idValue;
        private classInfoValue;
        private typeValue;
        private choicesValue;
        private baseValue;
        private isRequiredValue;
        private isUniqueValue;
        private uniquePropertyValue;
        private readOnlyValue;
        private visibleValue;
        private isLocalizableValue;
        private choicesfunc;
        private dependedProperties;
        isSerializable: boolean;
        isLightSerializable: boolean;
        isCustom: boolean;
        isDynamicChoices: boolean;
        isBindable: boolean;
        className: string;
        alternativeName: string;
        classNamePart: string;
        baseClassName: string;
        defaultValueValue: any;
        serializationProperty: string;
        displayName: string;
        category: string;
        categoryIndex: number;
        visibleIndex: number;
        nextToProperty: string;
        showMode: string;
        maxLength: number;
        maxValue: any;
        minValue: any;
        private dataListValue;
        layout: string;
        onGetValue: (obj: any) => any;
        onSettingValue: (obj: any, value: any) => any;
        onSetValue: (obj: any, value: any, jsonConv: JsonObject) => any;
        visibleIf: (obj: any) => boolean;
        onExecuteExpression: (obj: any, res: any) => any;
        onPropertyEditorUpdate: (obj: any, propEditor: any) => any;
        constructor(classInfo: JsonMetadataClass, name: string, isRequired?: boolean);
        get id(): number;
        get classInfo(): JsonMetadataClass;
        get type(): string;
        set type(value: string);
        isArray: boolean;
        get isRequired(): boolean;
        set isRequired(val: boolean);
        get isUnique(): boolean;
        set isUnique(val: boolean);
        get uniquePropertyName(): string;
        set uniquePropertyName(val: string);
        get hasToUseGetValue(): string | ((obj: any) => any);
        get defaultValue(): any;
        set defaultValue(newValue: any);
        isDefaultValue(value: any): boolean;
        getValue(obj: any): any;
        getPropertyValue(obj: any): any;
        get hasToUseSetValue(): string | ((obj: any, value: any, jsonConv: JsonObject) => any);
        settingValue(obj: any, value: any): any;
        setValue(obj: any, value: any, jsonConv: JsonObject): void;
        getObjType(objType: string): string;
        getClassName(className: string): string;
        /**
         * Depricated, please use getChoices
         */
        get choices(): Array<any>;
        get hasChoices(): boolean;
        getChoices(obj: any, choicesCallback?: any): Array<any>;
        setChoices(value: Array<any>, valueFunc?: (obj: any) => Array<any>): void;
        getBaseValue(): string;
        setBaseValue(val: any): void;
        get readOnly(): boolean;
        set readOnly(val: boolean);
        isVisible(layout: string, obj?: any): boolean;
        get visible(): boolean;
        set visible(val: boolean);
        get isLocalizable(): boolean;
        set isLocalizable(val: boolean);
        get dataList(): Array<string>;
        set dataList(val: Array<string>);
        mergeWith(prop: JsonObjectProperty): void;
        addDependedProperty(name: string): void;
        getDependedProperties(): Array<string>;
        schemaType(): string;
        private mergeValue;
    }
    export class CustomPropertiesCollection {
        private static properties;
        private static parentClasses;
        static addProperty(className: string, property: any): void;
        static removeProperty(className: string, propertyName: string): void;
        static removeAllProperties(className: string): void;
        static addClass(className: string, parentClassName: string): void;
        static getProperties(className: string): Array<any>;
        static createProperties(obj: any): void;
        private static createPropertiesCore;
        private static createPropertiesInObj;
        private static createPropertyInObj;
        private static checkIsPropertyExists;
    }
    export class JsonMetadataClass {
        name: string;
        creator: (json?: any) => any;
        parentName: string;
        static requiredSymbol: string;
        static typeSymbol: string;
        properties: Array<JsonObjectProperty>;
        private isCustomValue;
        private allProperties;
        private hashProperties;
        constructor(name: string, properties: Array<any>, creator?: (json?: any) => any, parentName?: string);
        find(name: string): JsonObjectProperty;
        findProperty(name: string): JsonObjectProperty;
        getAllProperties(): Array<JsonObjectProperty>;
        resetAllProperties(): void;
        get isCustom(): boolean;
        private fillAllProperties;
        private addPropCore;
        private isOverridedProp;
        private hasRegularChildClass;
        private makeParentRegularClass;
        createProperty(propInfo: any, isCustom?: boolean): JsonObjectProperty;
        private addDependsOnProperties;
        private addDependsOnProperty;
        private getIsPropertyNameRequired;
        private getPropertyName;
    }
    /**
     * The metadata object. It contains object properties' runtime information and allows you to modify it.
     */
    export class JsonMetadata {
        private classes;
        private alternativeNames;
        private childrenClasses;
        onSerializingProperty: ((obj: Base, prop: JsonObjectProperty, value: any, json: any) => boolean) | undefined;
        getObjPropertyValue(obj: any, name: string): any;
        setObjPropertyValue(obj: any, name: string, val: any): void;
        private getObjPropertyValueCore;
        private isObjWrapper;
        addClass(name: string, properties: Array<any>, creator?: (json?: any) => any, parentName?: string): JsonMetadataClass;
        removeClass(name: string): void;
        overrideClassCreatore(name: string, creator: () => any): void;
        overrideClassCreator(name: string, creator: () => any): void;
        getProperties(className: string): Array<JsonObjectProperty>;
        getPropertiesByObj(obj: any): Array<JsonObjectProperty>;
        getDynamicPropertiesByObj(obj: any, dynamicType?: string): Array<JsonObjectProperty>;
        hasOriginalProperty(obj: Base, propName: string): boolean;
        getOriginalProperty(obj: Base, propName: string): JsonObjectProperty;
        getProperty(className: string, propertyName: string): JsonObjectProperty;
        findProperty(className: string, propertyName: string): JsonObjectProperty;
        findProperties(className: string, propertyNames: Array<string>): Array<JsonObjectProperty>;
        getAllPropertiesByName(propertyName: string): Array<JsonObjectProperty>;
        getAllClasses(): Array<string>;
        createClass(name: string, json?: any): any;
        private createCustomType;
        getChildrenClasses(name: string, canBeCreated?: boolean): Array<JsonMetadataClass>;
        getRequiredProperties(name: string): Array<string>;
        addProperties(className: string, propertiesInfos: Array<any>): void;
        addProperty(className: string, propertyInfo: any): JsonObjectProperty;
        private addCustomPropertyCore;
        removeProperty(className: string, propertyName: string): boolean;
        private removePropertyFromClass;
        private fillChildrenClasses;
        findClass(name: string): JsonMetadataClass;
        isDescendantOf(className: string, ancestorClassName: string): boolean;
        addAlterNativeClassName(name: string, alternativeName: string): void;
        generateSchema(className?: string): any;
        private generateSchemaProperties;
        private generateSchemaProperty;
        private generateChemaClass;
        private fillProperties;
        private addPropertyCore;
    }
    export class JsonError {
        type: string;
        message: string;
        description: string;
        at: Number;
        constructor(type: string, message: string);
        getFullDescription(): string;
    }
    export class JsonUnknownPropertyError extends JsonError {
        propertyName: string;
        className: string;
        constructor(propertyName: string, className: string);
    }
    export class JsonMissingTypeErrorBase extends JsonError {
        baseClassName: string;
        type: string;
        message: string;
        constructor(baseClassName: string, type: string, message: string);
    }
    export class JsonMissingTypeError extends JsonMissingTypeErrorBase {
        propertyName: string;
        baseClassName: string;
        constructor(propertyName: string, baseClassName: string);
    }
    export class JsonIncorrectTypeError extends JsonMissingTypeErrorBase {
        propertyName: string;
        baseClassName: string;
        constructor(propertyName: string, baseClassName: string);
    }
    export class JsonRequiredPropertyError extends JsonError {
        propertyName: string;
        className: string;
        constructor(propertyName: string, className: string);
    }
    export class JsonObject {
        private static typePropertyName;
        private static positionPropertyName;
        private static metaDataValue;
        static get metaData(): JsonMetadata;
        errors: JsonError[];
        lightSerializing: boolean;
        toJsonObject(obj: any, storeDefaults?: boolean): any;
        toObject(jsonObj: any, obj: any): void;
        toObjectCore(jsonObj: any, obj: any): void;
        toJsonObjectCore(obj: any, property: JsonObjectProperty, storeDefaults?: boolean): any;
        private getDynamicProperties;
        private addDynamicProperties;
        private propertiesToJson;
        valueToJson(obj: any, result: any, property: JsonObjectProperty, storeDefaults?: boolean): void;
        valueToObj(value: any, obj: any, property: JsonObjectProperty): void;
        private removePos;
        private removePosFromObj;
        private isValueArray;
        private createNewObj;
        private checkNewObjectOnErrors;
        private getRequiredError;
        private addNewError;
        private valueToArray;
        private addValuesIntoArray;
        private findProperty;
    }
    /**
     * An alias for the metadata object. It contains object properties' runtime information and allows you to modify it.
     * @see JsonMetadata
     */
    export var Serializer: JsonMetadata;
}
declare module "conditionProcessValue" {
    import { HashTable } from "helpers";
    export class ProcessValue {
        values: HashTable<any>;
        properties: HashTable<any>;
        constructor();
        getFirstName(text: string, obj?: any): string;
        hasValue(text: string, values?: HashTable<any>): boolean;
        getValue(text: string, values?: HashTable<any>): any;
        setValue(obj: any, text: string, value: any): void;
        getValueInfo(valueInfo: any): void;
        private getValueFromPath;
        private getValueCore;
        private getQuestionDirectly;
        private getValueFromSurvey;
        private getValueFromValues;
        private getNonNestedObject;
        private getObjInArray;
        private getFirstPropertyName;
        private getObjectValue;
        private getIntValue;
    }
}
declare module "functionsfactory" {
    import { HashTable } from "helpers";
    export class FunctionFactory {
        static Instance: FunctionFactory;
        private functionHash;
        private isAsyncHash;
        register(name: string, func: (params: any[]) => any, isAsync?: boolean): void;
        unregister(name: string): void;
        hasFunction(name: string): boolean;
        isAsyncFunction(name: string): boolean;
        clear(): void;
        getAll(): Array<string>;
        run(name: string, params: any[], properties?: HashTable<any>): any;
    }
    export var registerFunction: (name: string, func: (params: any[]) => any, isAsync?: boolean) => void;
}
declare module "expressions/expressions" {
    import { HashTable } from "helpers";
    import { ProcessValue } from "conditionProcessValue";
    export abstract class Operand {
        toString(func?: (op: Operand) => string): string;
        abstract getType(): string;
        abstract evaluate(processValue?: ProcessValue): any;
        abstract setVariables(variables: Array<string>): any;
        hasFunction(): boolean;
        hasAsyncFunction(): boolean;
        addToAsyncList(list: Array<FunctionOperand>): void;
        isEqual(op: Operand): boolean;
        protected abstract isContentEqual(op: Operand): boolean;
        protected areOperatorsEquals(op1: Operand, op2: Operand): boolean;
    }
    export class BinaryOperand extends Operand {
        private operatorName;
        private left;
        private right;
        private consumer;
        private isArithmeticValue;
        constructor(operatorName: string, left?: any, right?: any, isArithmeticOp?: boolean);
        getType(): string;
        get isArithmetic(): boolean;
        get isConjunction(): boolean;
        get conjunction(): string;
        get operator(): string;
        get leftOperand(): any;
        get rightOperand(): any;
        protected isContentEqual(op: Operand): boolean;
        private evaluateParam;
        evaluate(processValue?: ProcessValue): any;
        toString(func?: (op: Operand) => string): string;
        setVariables(variables: Array<string>): void;
        hasFunction(): boolean;
        hasAsyncFunction(): boolean;
        addToAsyncList(list: Array<FunctionOperand>): void;
    }
    export class UnaryOperand extends Operand {
        private expressionValue;
        private operatorName;
        private consumer;
        constructor(expressionValue: Operand, operatorName: string);
        get operator(): string;
        get expression(): Operand;
        getType(): string;
        toString(func?: (op: Operand) => string): string;
        protected isContentEqual(op: Operand): boolean;
        evaluate(processValue?: ProcessValue): boolean;
        setVariables(variables: Array<string>): void;
    }
    export class ArrayOperand extends Operand {
        values: Array<Operand>;
        constructor(values: Array<Operand>);
        getType(): string;
        toString(func?: (op: Operand) => string): string;
        evaluate(processValue?: ProcessValue): Array<any>;
        setVariables(variables: Array<string>): void;
        hasFunction(): boolean;
        hasAsyncFunction(): boolean;
        addToAsyncList(list: Array<FunctionOperand>): void;
        protected isContentEqual(op: Operand): boolean;
    }
    export class Const extends Operand {
        private value;
        constructor(value: any);
        getType(): string;
        toString(func?: (op: Operand) => string): string;
        get correctValue(): any;
        evaluate(): any;
        setVariables(variables: Array<string>): void;
        protected getCorrectValue(value: any): any;
        protected isContentEqual(op: Operand): boolean;
        private isQuote;
        private isBooleanValue;
    }
    export class Variable extends Const {
        private variableName;
        static get DisableConversionChar(): string;
        static set DisableConversionChar(val: string);
        private valueInfo;
        private useValueAsItIs;
        constructor(variableName: string);
        getType(): string;
        toString(func?: (op: Operand) => string): string;
        get variable(): string;
        evaluate(processValue?: ProcessValue): any;
        setVariables(variables: Array<string>): void;
        protected getCorrectValue(value: any): any;
        protected isContentEqual(op: Operand): boolean;
    }
    export class FunctionOperand extends Operand {
        private originalValue;
        private parameters;
        private isReadyValue;
        private asynResult;
        onAsyncReady: () => void;
        constructor(originalValue: string, parameters: ArrayOperand);
        getType(): string;
        evaluateAsync(processValue: ProcessValue): void;
        evaluate(processValue?: ProcessValue): any;
        private evaluateCore;
        toString(func?: (op: Operand) => string): string;
        setVariables(variables: Array<string>): void;
        get isReady(): boolean;
        hasFunction(): boolean;
        hasAsyncFunction(): boolean;
        addToAsyncList(list: Array<FunctionOperand>): void;
        protected isContentEqual(op: Operand): boolean;
    }
    export class OperandMaker {
        static throwInvalidOperatorError(op: string): void;
        static safeToString(operand: Operand, func: (op: Operand) => string): string;
        static toOperandString(value: string): string;
        static isSpaceString(str: string): boolean;
        static isNumeric(value: string): boolean;
        static isBooleanValue(value: string): boolean;
        static countDecimals(value: number): number;
        static plusMinus(a: number, b: number, res: number): number;
        static unaryFunctions: HashTable<Function>;
        static binaryFunctions: HashTable<Function>;
        static isTwoValueEquals(x: any, y: any): boolean;
        static operatorToString(operatorName: string): string;
        static signs: HashTable<string>;
    }
}
declare module "expressions/expressionParser" {
    export interface IFilePosition {
        offset: number;
        line: number;
        column: number;
    }
    export interface IFileRange {
        start: IFilePosition;
        end: IFilePosition;
    }
    export interface ILiteralExpectation {
        type: "literal";
        text: string;
        ignoreCase: boolean;
    }
    export interface IClassParts extends Array<string | IClassParts> {
    }
    export interface IClassExpectation {
        type: "class";
        parts: IClassParts;
        inverted: boolean;
        ignoreCase: boolean;
    }
    export interface IAnyExpectation {
        type: "any";
    }
    export interface IEndExpectation {
        type: "end";
    }
    export interface IOtherExpectation {
        type: "other";
        description: string;
    }
    export type Expectation = ILiteralExpectation | IClassExpectation | IAnyExpectation | IEndExpectation | IOtherExpectation;
    export class SyntaxError extends Error {
        static buildMessage(expected: Expectation[], found: string | null): string;
        message: string;
        expected: Expectation[];
        found: string | null;
        location: IFileRange;
        name: string;
        constructor(message: string, expected: Expectation[], found: string | null, location: IFileRange);
    }
    export interface ICached {
        nextPos: number;
        result: any;
    }
    export interface IParseOptions {
        filename?: string;
        startRule?: string;
        tracer?: any;
        [key: string]: any;
    }
    export type ParseFunction = (input: string, options?: IParseOptions) => any;
    export const parse: ParseFunction;
}
declare module "conditionsParser" {
    import { Operand } from "expressions/expressions";
    export class ConditionsParserError {
        at: number;
        code: string;
        constructor(at: number, code: string);
    }
    export class ConditionsParser {
        private conditionError;
        private static parserCache;
        private patchExpression;
        createCondition(text: string): Operand;
        parseExpression(text: string): Operand;
        get error(): ConditionsParserError;
    }
}
declare module "conditions" {
    import { HashTable } from "helpers";
    /**
     * Base interface for expression execution
     */
    export interface IExpresionExecutor {
        /**
         * This call back runs on executing expression if there is at least one async function
         */
        onComplete: (res: any) => void;
        /**
         * The expression as string, property with get
         */
        get expression(): string;
        /**
         * Returns true if the expression is valid and can be executed
         */
        canRun(): boolean;
        /**
         * Run the expression. Returns the result of execution.
         * The result can be undefined if there is an asyn function. In this case result will be returned onComplete callback.
         * @param values has with values names and their results. Normally it is question names and their values
         * @param properties the list of properties that are available in functions. Commonly it is survey and question, if expression execuited in a question context
         */
        run(values: HashTable<any>, properties: HashTable<any>): any;
        /**
         * Returns the list of variables that used in the expression. They defined as: {variableName} in default parser.
         */
        getVariables(): Array<string>;
        /**
         * Returns true if there is a function in the expression
         */
        hasFunction(): boolean;
        /**
         * Returns true if there is an async function in the expression
         */
        isAsync: boolean;
    }
    export class ExpressionExecutor implements IExpresionExecutor {
        static createExpressionExecutor: (expression: string) => IExpresionExecutor;
        onComplete: (res: any) => void;
        private expressionValue;
        private operand;
        private processValue;
        private parser;
        private isAsyncValue;
        private hasFunctionValue;
        private asyncFuncList;
        constructor(expression: string);
        get expression(): string;
        private setExpression;
        getVariables(): Array<string>;
        hasFunction(): boolean;
        get isAsync(): boolean;
        canRun(): boolean;
        run(values: HashTable<any>, properties?: HashTable<any>): any;
        private doAsyncFunctionReady;
        private runValues;
    }
    export class ExpressionRunnerBase {
        private expressionExecutor;
        constructor(expression: string);
        get expression(): string;
        set expression(value: string);
        getVariables(): Array<string>;
        hasFunction(): boolean;
        get isAsync(): boolean;
        canRun(): boolean;
        protected runCore(values: HashTable<any>, properties?: HashTable<any>): any;
        protected doOnComplete(res: any): void;
    }
    export class ConditionRunner extends ExpressionRunnerBase {
        onRunComplete: (result: boolean) => void;
        run(values: HashTable<any>, properties?: HashTable<any>): boolean;
        protected doOnComplete(res: any): void;
    }
    export class ExpressionRunner extends ExpressionRunnerBase {
        onRunComplete: (result: any) => void;
        run(values: HashTable<any>, properties?: HashTable<any>): any;
        protected doOnComplete(res: any): void;
    }
}
declare module "rendererFactory" {
    import { Question } from "question";
    export class RendererFactory {
        static Instance: RendererFactory;
        private renderersHash;
        unregisterRenderer(questionType: string, rendererAs: string): void;
        registerRenderer(questionType: string, renderAs: string, renderer: any): void;
        getRenderer(questionType: string, renderAs: string): any;
        getRendererByQuestion(question: Question): any;
        clear(): void;
    }
}
declare module "utils/cssClassBuilder" {
    export class CssClassBuilder {
        private classes;
        isEmpty(): boolean;
        append(value: string, condition?: boolean): CssClassBuilder;
        toString(): string;
    }
}
declare module "utils/utils" {
    function compareVersions(a: any, b: any): number;
    function confirmAction(message: string): boolean;
    function detectIEBrowser(): boolean;
    function detectIEOrEdge(): any;
    function loadFileFromBase64(b64Data: string, fileName: string): void;
    function isMobile(): boolean;
    function isElementVisible(element: HTMLElement, threshold?: number): boolean;
    function findScrollableParent(element: HTMLElement): HTMLElement;
    function scrollElementByChildId(id: string): void;
    function navigateToUrl(url: string): void;
    function getIconNameFromProxy(iconName: string): string;
    function createSvg(size: number | string, width: number, height: number, iconName: string, svgElem: any, title: string): void;
    export function unwrap<T>(value: T | (() => T)): T;
    export function getSize(value: any): any;
    export interface IAttachKey2clickOptions {
        processEsc?: boolean;
        disableTabStop?: boolean;
    }
    export function doKey2ClickBlur(evt: KeyboardEvent): void;
    export function doKey2ClickUp(evt: KeyboardEvent, options?: IAttachKey2clickOptions): void;
    export function doKey2ClickDown(evt: KeyboardEvent, options?: IAttachKey2clickOptions): void;
    function increaseHeightByContent(element: HTMLElement, getComputedStyle?: (elt: Element) => any): void;
    function getOriginalEvent(event: any): any;
    function preventDefaults(event: any): void;
    function classesToSelector(str: string): string;
    function getElementWidth(el: HTMLElement): number;
    function isContainerVisible(el: HTMLElement): boolean;
    function findParentByClassNames(element: HTMLElement, classNames: Array<string>): Element;
    export function sanitizeEditableContent(element: any): void;
    function mergeValues(src: any, dest: any): void;
    export class Logger {
        private _result;
        log(action: string): void;
        get result(): string;
    }
    export { mergeValues, getElementWidth, isContainerVisible, classesToSelector, compareVersions, confirmAction, detectIEOrEdge, detectIEBrowser, loadFileFromBase64, isMobile, isElementVisible, findScrollableParent, scrollElementByChildId, navigateToUrl, createSvg, getIconNameFromProxy, increaseHeightByContent, getOriginalEvent, preventDefaults, findParentByClassNames, };
}
declare module "actions/container" {
    import { Base } from "base";
    import { IAction, Action } from "actions/action";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    export let defaultActionBarCss: {
        root: string;
        defaultSizeMode: string;
        smallSizeMode: string;
        item: string;
        itemActive: string;
        itemPressed: string;
        itemIcon: string;
        itemTitle: string;
        itemTitleWithIcon: string;
    };
    export class ActionContainer<T extends Action = Action> extends Base implements ILocalizableOwner {
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        getLocale(): string;
        actions: Array<T>;
        private cssClassesValue;
        protected getRenderedActions(): Array<T>;
        updateCallback: (isResetInitialized: boolean) => void;
        containerCss: string;
        sizeMode: "default" | "small";
        locOwner: ILocalizableOwner;
        isEmpty: boolean;
        locStrsChanged(): void;
        protected raiseUpdate(isResetInitialized: boolean): void;
        protected onSet(): void;
        protected onPush(item: T): void;
        protected onRemove(item: T): void;
        private setActionCssClasses;
        get hasActions(): boolean;
        get renderedActions(): Array<T>;
        get visibleActions(): Array<T>;
        getRootCss(): string;
        protected getDefaultCssClasses(): any;
        set cssClasses(val: any);
        get cssClasses(): any;
        private createAction;
        addAction(val: IAction, sortByVisibleIndex?: boolean): Action;
        private sortItems;
        setItems(items: Array<IAction>, sortByVisibleIndex?: boolean): void;
        initResponsivityManager(container: HTMLDivElement): void;
        resetResponsivityManager(): void;
        getActionById(id: string): T;
    }
}
declare module "element-helper" {
    export class ElementHelper {
        static focusElement(element: Element): void;
        static visibility(node: Element): boolean;
        static getNextElementPreorder(element: Element): Element;
        static getNextElementPostorder(element: Element): Element;
        static hasHorizontalScroller(element: HTMLElement): boolean;
        static hasVerticalScroller(element: HTMLElement): boolean;
    }
}
declare module "list" {
    import { ActionContainer } from "actions/container";
    import { Action, IAction } from "actions/action";
    export let defaultListCss: {
        root: string;
        item: string;
        searchClearButtonIcon: string;
        loadingIndicator: string;
        itemSelected: string;
        itemWithIcon: string;
        itemDisabled: string;
        itemFocused: string;
        itemIcon: string;
        itemSeparator: string;
        itemBody: string;
        itemsContainer: string;
        filter: string;
        filterIcon: string;
        filterInput: string;
        emptyContainer: string;
        emptyText: string;
    };
    export interface IListModel {
        items: Array<IAction>;
        onSelectionChanged: (item: Action, ...params: any[]) => void;
        allowSelection?: boolean;
        selectedItem?: IAction;
        onFilterStringChangedCallback?: (text: string) => void;
    }
    export class ListModel extends ActionContainer {
        onSelectionChanged: (item: Action, ...params: any[]) => void;
        allowSelection: boolean;
        private onFilterStringChangedCallback?;
        private listContainerHtmlElement;
        private loadingIndicatorValue;
        searchEnabled: boolean;
        showFilter: boolean;
        isExpanded: boolean;
        selectedItem: IAction;
        focusedItem: Action;
        filterString: string;
        hasVerticalScroller: boolean;
        isAllDataLoaded: boolean;
        showSearchClearButton: boolean;
        static INDENT: number;
        static MINELEMENTCOUNT: number;
        scrollHandler: (e?: any) => void;
        private hasText;
        isItemVisible(item: Action): boolean;
        get visibleItems(): Array<Action>;
        private get shouldProcessFilter();
        private onFilterStringChanged;
        constructor(items: Array<IAction>, onSelectionChanged: (item: Action, ...params: any[]) => void, allowSelection: boolean, selectedItem?: IAction, onFilterStringChangedCallback?: (text: string) => void);
        setItems(items: Array<IAction>, sortByVisibleIndex?: boolean): void;
        protected onSet(): void;
        protected getDefaultCssClasses(): {
            root: string;
            item: string;
            searchClearButtonIcon: string;
            loadingIndicator: string;
            itemSelected: string;
            itemWithIcon: string;
            itemDisabled: string;
            itemFocused: string;
            itemIcon: string;
            itemSeparator: string;
            itemBody: string;
            itemsContainer: string;
            filter: string;
            filterIcon: string;
            filterInput: string;
            emptyContainer: string;
            emptyText: string;
        };
        protected updateItemActiveState(): void;
        onItemClick: (itemValue: Action) => void;
        isItemDisabled: (itemValue: Action) => boolean;
        isItemSelected: (itemValue: Action) => boolean;
        isItemFocused: (itemValue: Action) => boolean;
        getItemClass: (itemValue: Action) => string;
        getItemIndent: (itemValue: any) => string;
        get filterStringPlaceholder(): string;
        get emptyMessage(): string;
        get scrollableContainer(): HTMLElement;
        get loadingText(): string;
        get loadingIndicator(): Action;
        goToItems(event: KeyboardEvent): void;
        onMouseMove(event: MouseEvent): void;
        onKeyDown(event: KeyboardEvent): void;
        onPointerDown(event: PointerEvent, item: any): void;
        refresh(): void;
        onClickSearchClearButton(event: any): void;
        resetFocusedItem(): void;
        focusFirstVisibleItem(): void;
        focusLastVisibleItem(): void;
        initFocusedItem(): void;
        focusNextVisibleItem(): void;
        focusPrevVisibleItem(): void;
        selectFocusedItem(): void;
        initListContainerHtmlElement(htmlElement: HTMLElement): void;
        onLastItemRended(item: Action): void;
        scrollToFocusedItem(): void;
        addScrollEventListener(handler: (e?: any) => void): void;
        removeScrollEventListener(): void;
    }
}
declare module "utils/popup" {
    export type VerticalPosition = "top" | "bottom" | "middle";
    export type HorizontalPosition = "left" | "right" | "center";
    export type PositionMode = "flex" | "fixed";
    export interface IPosition {
        left?: number | string;
        top?: number | string;
    }
    export interface INumberPosition extends IPosition {
        left?: number;
        top?: number;
    }
    export interface ISize {
        width: number;
        height: number;
    }
    export class PopupUtils {
        static bottomIndent: number;
        static calculatePosition(targetRect: ClientRect, height: number, width: number, verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition, showPointer: boolean, positionMode?: PositionMode): INumberPosition;
        static updateVerticalDimensions(top: number, height: number, windowHeight: number): any;
        static updateHorizontalDimensions(left: number, width: number, windowWidth: number, horizontalPosition: HorizontalPosition, positionMode?: PositionMode, margins?: {
            left: number;
            right: number;
        }): {
            width: number;
            left: number;
        };
        static updateVerticalPosition(targetRect: ClientRect, height: number, verticalPosition: VerticalPosition, showPointer: boolean, windowHeight: number): VerticalPosition;
        static calculatePopupDirection(verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition): string;
        static calculatePointerTarget(targetRect: ClientRect, top: number, left: number, verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition, marginLeft?: number, marginRight?: number): INumberPosition;
    }
}
declare module "popup" {
    import { Base, EventBase } from "base";
    import { IAction } from "actions/action";
    import { VerticalPosition, HorizontalPosition, PositionMode } from "utils/popup";
    export interface IPopupOptionsBase {
        onHide?: () => void;
        onShow?: () => void;
        onApply?: () => boolean;
        onCancel?: () => void;
        cssClass?: string;
        title?: string;
        verticalPosition?: VerticalPosition;
        horizontalPosition?: HorizontalPosition;
        showPointer?: boolean;
        isModal?: boolean;
        displayMode?: "popup" | "overlay";
    }
    export interface IDialogOptions extends IPopupOptionsBase {
        componentName: string;
        data: any;
        onApply: () => boolean;
    }
    export interface IPopupModel<T = any> extends IDialogOptions {
        contentComponentName: string;
        contentComponentData: T;
    }
    export class PopupModel<T = any> extends Base {
        setWidthByTarget: boolean;
        focusFirstInputSelector: string;
        contentComponentName: string;
        contentComponentData: T;
        verticalPosition: VerticalPosition;
        horizontalPosition: HorizontalPosition;
        showPointer: boolean;
        isModal: boolean;
        isFocusedContent: boolean;
        onCancel: () => void;
        onApply: () => boolean;
        onHide: () => void;
        onShow: () => void;
        cssClass: string;
        title: string;
        displayMode: "popup" | "overlay";
        positionMode: PositionMode;
        onVisibilityChanged: EventBase<PopupModel>;
        onFooterActionsCreated: EventBase<Base>;
        onRecalculatePosition: EventBase<Base>;
        constructor(contentComponentName: string, contentComponentData: T, verticalPosition?: VerticalPosition, horizontalPosition?: HorizontalPosition, showPointer?: boolean, isModal?: boolean, onCancel?: () => void, onApply?: () => boolean, onHide?: () => void, onShow?: () => void, cssClass?: string, title?: string);
        get isVisible(): boolean;
        set isVisible(value: boolean);
        toggleVisibility(): void;
        recalculatePosition(isResetHeight: boolean): void;
        updateFooterActions(footerActions: Array<IAction>): Array<IAction>;
    }
    export function createDialogOptions(componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, onHide?: () => void, onShow?: () => void, cssClass?: string, title?: string, displayMode?: "popup" | "overlay"): IDialogOptions;
}
declare module "actions/action" {
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { Base } from "base";
    import { IListModel } from "list";
    import { IPopupOptionsBase } from "popup";
    export type actionModeType = "large" | "small" | "popup";
    /**
     * An action item.
     * Action items are used in the Toolbar, matrix rows, titles of pages, panels, questions, and other survey elements.
    
     */
    export interface IAction {
        /**
         * A unique action item identifier.
         */
        id: string;
        /**
         * Specifies the action item's visibility.
         * @see enabled
         * @see active
         */
        visible?: boolean;
        /**
         * The action item's title.
         * @see showTitle
         * @see disableShrink
         */
        title?: string;
        locTitle?: LocalizableString;
        locTitleName?: string;
        /**
         * The action item's tooltip.
         */
        tooltip?: string;
        locTooltipName?: string;
        /**
         * Specifies whether users can interact with the action item.
         * @see active
         * @see visible
         */
        enabled?: boolean;
        /**
         * Specifies the visibility of the action item's title.
         * @see title
         * @see disableShrink
         */
        showTitle?: boolean;
        /**
         * A function that is executed when users click the action item.
         */
        action?: (context?: any) => void;
        /**
         * One or several CSS classes that you want to apply to the outer `<div>` element.
         * In the markup, an action item is rendered as an `<input>` wrapped in a `<div>`. The `css` property applies classes to the `<div>`.
         * To apply several classes, separate them with a space character: "myclass1 myclass2".
         * @see innerCss
         */
        css?: string;
        /**
         * One or several CSS classes that you want to apply to the inner `<input>` element.
         * In the markup, an action item is rendered as an `<input>` wrapped in a `<div>`. The `innerCss` property applies classes to the `<input>`.
         * To apply several classes, separate them with a space character: "myclass1 myclass2".
         * @see css
         */
        innerCss?: string;
        /**
         * The action item's data object. Use it to pass required data to a custom template or component.
         */
        data?: any;
        popupModel?: any;
        needSeparator?: boolean;
        /**
         * Specifies whether the action item is active.
         * Use it as a flag to specify different action item appearances in different states.
         * @see enabled
         * @see visible
         */
        active?: boolean;
        pressed?: boolean;
        /**
         * Specifies the name of a template used to render the action item.
         * @see component
         */
        template?: string;
        /**
         * Specifies the name of a component used to render the action item.
         */
        component?: string;
        /**
         * The action item's icon name.
         * @see iconSize
         */
        iconName?: string;
        /**
         * The action item's icon size in pixels.
         * @see iconName
         */
        iconSize?: number;
        /**
         * The action item's location in a matrix question's row.
         *
         * The following values are available:
         *
         * - `"start"` - The action item is located at the beginning of the row.
         * - `"end"` - The action is located at the end of the row.
         */
        location?: string;
        /**
         * Set this property to `true` if you want to disable keyboard navigation for the action item (sets the `tabIndex` attribute to -1).
         */
        disableTabStop?: boolean;
        /**
         * Set this property to `true` if you want the item's `title` to be always visible.
         * If you set it to `false`, the `title` hides when the screen space is limited, and the item displays only the icon.
         * @see title
         * @see iconName
         */
        disableShrink?: boolean;
        disableHide?: boolean;
        mode?: actionModeType;
        visibleIndex?: number;
        needSpace?: boolean;
        ariaChecked?: boolean;
        ariaExpanded?: boolean;
        ariaRole?: string;
    }
    export interface IActionDropdownPopupOptions extends IListModel, IPopupOptionsBase {
    }
    export function createDropdownActionModel(actionOptions: IAction, dropdownOptions: IActionDropdownPopupOptions, locOwner?: ILocalizableOwner): Action;
    export function createDropdownActionModelAdvanced(actionOptions: IAction, listOptions: IListModel, popupOptions?: IPopupOptionsBase, locOwner?: ILocalizableOwner): Action;
    export class Action extends Base implements IAction, ILocalizableOwner {
        innerItem: IAction;
        private locTitleValue;
        updateCallback: () => void;
        private raiseUpdate;
        constructor(innerItem: IAction);
        private createLocTitle;
        owner: ILocalizableOwner;
        location?: string;
        id: string;
        iconName: string;
        iconSize: number;
        visible: boolean;
        tooltip: string;
        locTooltipName?: string;
        enabled: boolean;
        showTitle: boolean;
        action: (context?: any) => void;
        css: string;
        innerCss: string;
        data: any;
        popupModel: any;
        needSeparator: boolean;
        active: boolean;
        pressed: boolean;
        template: string;
        component: string;
        items: any;
        visibleIndex: number;
        mode: actionModeType;
        disableTabStop: boolean;
        disableShrink: boolean;
        disableHide: boolean;
        needSpace: boolean;
        ariaChecked: boolean;
        ariaExpanded: boolean;
        ariaRole: string;
        title: string;
        get locTitle(): LocalizableString;
        set locTitle(val: LocalizableString);
        get locTitleName(): string;
        set locTitleName(val: string);
        locStrsChanged(): void;
        private locStrChangedInPopupModel;
        private locTitleChanged;
        private locTooltipChanged;
        private cssClassesValue;
        set cssClasses(val: any);
        get cssClasses(): any;
        get disabled(): boolean;
        get hasTitle(): boolean;
        get isVisible(): boolean;
        get canShrink(): boolean;
        getActionRootCss(): string;
        getActionBarItemTitleCss(): string;
        getActionBarItemCss(): string;
        getTooltip(): string;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getProcessedText(text: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        minDimension: number;
        maxDimension: number;
    }
    export class ActionDropdownViewModel {
        private item;
        private popupModel;
        private funcKey;
        constructor(item: Action);
        private setupPopupCallbacks;
        private removePopupCallbacks;
        dispose(): void;
    }
}
declare module "utils/responsivity-manager" {
    import { Action } from "actions/action";
    import { AdaptiveActionContainer } from "actions/adaptive-container";
    interface IDimensions {
        scroll: number;
        offset: number;
    }
    export class ResponsivityManager {
        protected container: HTMLDivElement;
        private model;
        private itemsSelector;
        private dotsItemSize;
        private resizeObserver;
        private isInitialized;
        protected minDimensionConst: number;
        private separatorSize;
        private separatorAddConst;
        private paddingSizeConst;
        private dotsSizeConst;
        protected recalcMinDimensionConst: boolean;
        getComputedStyle: (elt: Element) => CSSStyleDeclaration;
        constructor(container: HTMLDivElement, model: AdaptiveActionContainer, itemsSelector: string, dotsItemSize?: number);
        protected getDimensions(element: HTMLElement): IDimensions;
        protected getAvailableSpace(): number;
        protected calcItemSize(item: HTMLDivElement): number;
        private calcMinDimension;
        private calcItemsSizes;
        protected calcActionDimensions(currentAction: Action, item: HTMLDivElement): void;
        private get isContainerVisible();
        private process;
        dispose(): void;
    }
    export class VerticalResponsivityManager extends ResponsivityManager {
        constructor(container: HTMLDivElement, model: AdaptiveActionContainer, itemsSelector: string, dotsItemSize?: number, minDimension?: number);
        protected getDimensions(): IDimensions;
        protected getAvailableSpace(): number;
        protected calcItemSize(item: HTMLDivElement): number;
        protected calcActionDimensions(currentAction: Action, item: HTMLDivElement): void;
    }
}
declare module "actions/adaptive-container" {
    import { ListModel } from "list";
    import { Action, actionModeType } from "actions/action";
    import { ActionContainer } from "actions/container";
    export class AdaptiveActionContainer<T extends Action = Action> extends ActionContainer<T> {
        protected dotsItem: Action;
        private responsivityManager;
        minVisibleItemsCount: number;
        isResponsivenessDisabled: boolean;
        private hideItemsGreaterN;
        private getVisibleItemsCount;
        private updateItemMode;
        private static ContainerID;
        constructor();
        get hiddenItemsListModel(): ListModel;
        protected hiddenItemSelected(item: T): void;
        protected onSet(): void;
        protected onPush(item: T): void;
        protected getRenderedActions(): Array<T>;
        protected raiseUpdate(isResetInitialized: boolean): void;
        fit(dimension: number, dotsItemSize: number): void;
        initResponsivityManager(container: HTMLDivElement): void;
        resetResponsivityManager(): void;
        setActionsMode(mode: actionModeType): void;
        dispose(): void;
    }
}
declare module "survey-error" {
    import { ISurveyErrorOwner } from "base-interfaces";
    import { LocalizableString } from "localizablestring";
    export class SurveyError {
        text: string;
        protected errorOwner: ISurveyErrorOwner;
        private locTextValue;
        visible: boolean;
        constructor(text?: string, errorOwner?: ISurveyErrorOwner);
        equalsTo(error: SurveyError): boolean;
        get locText(): LocalizableString;
        getText(): string;
        getErrorType(): string;
        protected getDefaultText(): string;
        protected getLocale(): string;
        protected getLocalizationString(locStrName: string): string;
        onUpdateErrorTextCallback: (error: SurveyError) => void;
        updateText(): void;
    }
}
declare module "survey-element" {
    import { Base } from "base";
    import { IAction } from "actions/action";
    import { AdaptiveActionContainer } from "actions/adaptive-container";
    import { ISurveyElement, IPage, IPanel, IProgressInfo, ISurvey, ISurveyData, ISurveyImpl, ITextProcessor, ITitleOwner } from "base-interfaces";
    import { SurveyError } from "survey-error";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { ActionContainer } from "actions/container";
    /**
     * A base class for the [`SurveyElement`](https://surveyjs.io/form-library/documentation/surveyelement) and [`SurveyModel`](https://surveyjs.io/form-library/documentation/surveymodel) classes.
     */
    export abstract class SurveyElementCore extends Base implements ILocalizableOwner {
        constructor();
        protected createLocTitleProperty(): LocalizableString;
        /**
         * A title for the survey element. If `title` is undefined, the `name` property value is displayed instead.
         *
         * Empty pages and panels do not display their titles or names.
         *
         * @see [Configure Question Titles](https://surveyjs.io/form-library/documentation/design-survey-question-titles)
        */
        get title(): string;
        set title(val: string);
        get locTitle(): LocalizableString;
        protected getDefaultTitleValue(): string;
        /**
         * Returns `true` if the survey element has a description.
         * @see description
        */
        hasDescription: boolean;
        /**
         * Explanatory text displayed under the title.
         * @see hasDescription
         */
        description: string;
        updateDescriptionVisibility(newDescription: any): void;
        get locDescription(): LocalizableString;
        get titleTagName(): string;
        protected getDefaultTitleTagName(): string;
        get hasTitle(): boolean;
        get hasTitleActions(): boolean;
        get hasTitleEvents(): boolean;
        getTitleToolbar(): AdaptiveActionContainer;
        getTitleOwner(): ITitleOwner;
        get isTitleOwner(): boolean;
        get isTitleRenderedAsString(): boolean;
        toggleState(): boolean;
        get cssClasses(): any;
        get cssTitle(): string;
        get ariaTitleId(): string;
        get titleTabIndex(): number;
        get titleAriaExpanded(): any;
        get ariaLabel(): string;
        get titleAriaLabel(): string | null;
        protected getIsTitleRenderedAsString(): boolean;
        abstract getLocale(): string;
        abstract getMarkdownHtml(text: string, name: string): string;
        abstract getRenderer(name: string): string;
        abstract getRendererContext(locStr: LocalizableString): any;
        abstract getProcessedText(text: string): string;
    }
    export enum DragTypeOverMeEnum {
        InsideEmptyPanel = 1,
        MultilineRight = 2,
        MultilineLeft = 3
    }
    /**
     * A base class for all survey elements.
     */
    export class SurveyElement<E = any> extends SurveyElementCore implements ISurveyElement {
        stateChangedCallback: () => void;
        static getProgressInfoByElements(children: Array<SurveyElement>, isRequired: boolean): IProgressInfo;
        private surveyImplValue;
        private surveyDataValue;
        private surveyValue;
        private textProcessorValue;
        private selectedElementInDesignValue;
        dragTypeOverMe: DragTypeOverMeEnum;
        isDragMe: boolean;
        readOnlyChangedCallback: () => void;
        static ScrollElementToTop(elementId: string): boolean;
        static GetFirstNonTextElement(elements: any, removeSpaces?: boolean): any;
        static FocusElement(elementId: string): boolean;
        private static focusElementCore;
        static CreateDisabledDesignElements: boolean;
        disableDesignActions: boolean;
        constructor(name: string);
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected getSkeletonComponentNameCore(): string;
        private parentQuestionValue;
        /**
         * A Dynamic Panel, Dynamic Matrix, or Dropdown Matrix that includes the current question.
         *
         * This property is `null` for standalone questions.
         */
        get parentQuestion(): E;
        setParentQuestion(val: E): void;
        protected onParentQuestionChanged(): void;
        get skeletonComponentName(): string;
        /**
         * Gets and sets the survey element's expand state.
         *
         * Possible values:
         *
         * - `"default"` (default) - The survey element is displayed in full and cannot be collapsed in the UI.
         * - `"expanded"` - The survey element is displayed in full and can be collapsed in the UI.
         * - `"collapsed"` - The survey element displays only `title` and `description` and can be expanded in the UI.
         *
         * @see toggleState
         * @see collapse
         * @see expand
         * @see isCollapsed
         * @see isExpanded
         */
        get state(): string;
        set state(val: string);
        private notifyStateChanged;
        /**
         * Returns `true` if the survey element is collapsed.
         * @see state
         * @see toggleState
         * @see collapse
         * @see expand
         * @see isExpanded
         */
        get isCollapsed(): boolean;
        /**
         * Returns `true` if the survey element is expanded.
         * @see state
         * @see toggleState
         * @see collapse
         * @see expand
         * @see isCollapsed
         */
        get isExpanded(): boolean;
        /**
         * Collapses the survey element.
         *
         * In collapsed state, the element displays only `title` and `description`.
         * @see title
         * @see description
         * @see state
         * @see toggleState
         * @see expand
         * @see isCollapsed
         * @see isExpanded
         */
        collapse(): void;
        /**
         * Expands the survey element.
         * @see state
         * @see toggleState
         * @see collapse
         * @see isCollapsed
         * @see isExpanded
         */
        expand(): void;
        /**
         * Toggles the survey element's `state` between collapsed and expanded.
         * @see state
         * @see collapse
         * @see expand
         * @see isCollapsed
         * @see isExpanded
         */
        toggleState(): boolean;
        get hasStateButton(): boolean;
        get shortcutText(): string;
        private titleToolbarValue;
        getTitleToolbar(): AdaptiveActionContainer;
        protected createActionContainer(allowAdaptiveActions?: boolean): ActionContainer;
        get titleActions(): Array<any>;
        private isTitleActionRequested;
        getTitleActions(): Array<any>;
        protected getDefaultTitleActions(): Array<IAction>;
        private updateTitleActions;
        get hasTitleActions(): boolean;
        get hasTitleEvents(): boolean;
        get titleTabIndex(): number;
        get titleAriaExpanded(): any;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        protected canRunConditions(): boolean;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
        protected get surveyImpl(): ISurveyImpl;
        __setData(data: ISurveyData): void;
        get data(): ISurveyData;
        /**
         * Returns the survey object.
         */
        get survey(): ISurvey;
        getSurvey(live?: boolean): ISurvey;
        protected setSurveyCore(value: ISurvey): void;
        isContentElement: boolean;
        isEditableTemplateElement: boolean;
        isInteractiveDesignElement: boolean;
        protected get isInternal(): boolean;
        get areInvisibleElementsShowing(): boolean;
        get isVisible(): boolean;
        /**
         * Returns `true` if the survey element or its parent element is read-only.
         *
         * If you want to switch a survey element to the read-only state based on a condition, specify the [`enableIf`](https://surveyjs.io/form-library/documentation/question#enableIf) property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see readOnly
         */
        get isReadOnly(): boolean;
        /**
         * Makes the survey element read-only.
         *
         * If you want to switch a survey element to the read-only state based on a condition, specify the [`enableIf`](https://surveyjs.io/form-library/documentation/question#enableIf) property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see isReadOnly
         */
        get readOnly(): boolean;
        set readOnly(val: boolean);
        protected onReadOnlyChanged(): void;
        private get css();
        cssClassesValue: any;
        private ensureCssClassesValue;
        /**
         * Returns an object in which keys are UI elements and values are CSS classes applied to them.
         *
         * Use the following events of the [`SurveyModel`](https://surveyjs.io/form-library/documentation/surveymodel) object to override CSS classes:
         *
         * - [`onUpdatePageCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdatePageCssClasses)
         * - [`onUpdatePanelCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdatePanelCssClasses)
         * - [`onUpdateQuestionCssClasses`](https://surveyjs.io/form-library/documentation/surveymodel#onUpdateQuestionCssClasses)
         */
        get cssClasses(): any;
        protected calcCssClasses(css: any): any;
        protected updateElementCssCore(cssClasses: any): void;
        get cssError(): string;
        updateElementCss(reNew?: boolean): void;
        protected clearCssClasses(): void;
        protected getIsLoadingFromJson(): boolean;
        /**
         * A survey element identifier.
         *
         * > Question names must be unique.
         */
        get name(): string;
        set name(val: string);
        protected getValidName(name: string): string;
        protected onNameChanged(oldValue: string): void;
        protected updateBindingValue(valueName: string, value: any): void;
        /**
         * Validation errors. Call the `validate()` method to validate survey element data.
         * @see validate
         */
        get errors(): Array<SurveyError>;
        set errors(val: Array<SurveyError>);
        hasVisibleErrors: boolean;
        private updateVisibleErrors;
        /**
         * Returns `true` if the survey element or its child elements have validation errors.
         *
         * This property contains the result of the most recent validation. This result may be outdated. Call the `validate` method to get an up-to-date value.
         * @see errors
         */
        get containsErrors(): boolean;
        updateContainsErrors(): void;
        protected getContainsErrors(): boolean;
        get selectedElementInDesign(): SurveyElement;
        set selectedElementInDesign(val: SurveyElement);
        updateCustomWidgets(): void;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        endLoadingFromJson(): void;
        setVisibleIndex(index: number): number;
        /**
         * Returns `true` if the survey element is a page.
         * @see Base.getType
         */
        get isPage(): boolean;
        /**
         * Returns `true` if the survey element is a panel.
         * @see Base.getType
         */
        get isPanel(): boolean;
        /**
         * Returns `true` if the survey element is a question.
         * @see Base.getType
         */
        get isQuestion(): boolean;
        delete(): void;
        locOwner: ILocalizableOwner;
        /**
         * Returns the survey's [locale](https://surveyjs.io/form-library/documentation/surveymodel#locale).
         *
         * If a default locale is used, this method returns an empty string. To get the applied locale in this case, use the following code:
         *
         * ```js
         * import { surveyLocalization } from 'survey-core';
         * const defaultLocale = surveyLocalization.defaultLocale;
         * ```
         *
         * @see [Localization & Globalization](https://surveyjs.io/form-library/documentation/localization)
         */
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        protected getUseDisplayValuesInDynamicTexts(): boolean;
        protected removeSelfFromList(list: Array<any>): void;
        protected get textProcessor(): ITextProcessor;
        protected getProcessedHtml(html: string): string;
        protected onSetData(): void;
        get parent(): IPanel;
        set parent(val: IPanel);
        protected getPage(parent: IPanel): IPage;
        protected moveToBase(parent: IPanel, container: IPanel, insertBefore?: any): boolean;
        protected setPage(parent: IPanel, newPage: IPage): void;
        protected getSearchableLocKeys(keys: Array<string>): void;
        get isDefaultV2Theme(): boolean;
        get isErrorsModeTooltip(): boolean;
        protected getIsErrorsModeTooltip(): boolean;
        protected getIsTooltipErrorSupportedByParent(): boolean;
        protected getIsTooltipErrorInsideSupported(): boolean;
        get hasParent(): boolean;
        isSingleInRow: boolean;
        protected get hasFrameV2(): boolean;
        /**
         * Sets survey element width in CSS values.
         *
         * Default value: ""
         * @see minWidth
         * @see maxWidth
        */
        get width(): string;
        set width(val: string);
        /**
         * Gets or sets minimum survey element width in CSS values.
         *
         * Default value: "300px" (taken from [`settings.minWidth`](https://surveyjs.io/form-library/documentation/settings#minWidth))
         * @see maxWidth
         * @see renderWidth
         * @see width
         */
        get minWidth(): string;
        set minWidth(val: string);
        /**
         * Gets or sets maximum survey element width in CSS values.
         *
         * Default value: "100%" (taken from [`settings.maxWidth`](https://surveyjs.io/form-library/documentation/settings#maxWidth))
         * @see minWidth
         * @see renderWidth
         * @see width
         */
        get maxWidth(): string;
        set maxWidth(val: string);
        /**
         * Returns a calculated width of the rendered survey element in CSS values.
         * @see width
         * @see minWidth
         * @see maxWidth
         */
        get renderWidth(): string;
        set renderWidth(val: string);
        /**
         * Increases or decreases an indent of survey element content from the left edge. Accepts positive integer values and 0. Does not apply in the Default V2 theme.
         * @see rightIndent
         */
        get indent(): number;
        set indent(val: number);
        /**
         * Increases or decreases an indent of survey element content from the right edge. Accepts positive integer values and 0. Does not apply in the Default V2 theme.
         * @see indent
         */
        get rightIndent(): number;
        set rightIndent(val: number);
        get paddingLeft(): string;
        set paddingLeft(val: string);
        get paddingRight(): string;
        set paddingRight(val: string);
        allowRootStyle: boolean;
        get rootStyle(): {
            [index: string]: any;
        };
        get clickTitleFunction(): any;
        protected needClickTitleFunction(): boolean;
        protected processTitleClick(): void;
        localeChanged(): void;
    }
}
declare module "error" {
    import { SurveyError } from "survey-error";
    import { ISurveyErrorOwner } from "base-interfaces";
    export class AnswerRequiredError extends SurveyError {
        text: string;
        constructor(text?: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class OneAnswerRequiredError extends SurveyError {
        text: string;
        constructor(text?: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class RequreNumericError extends SurveyError {
        text: string;
        constructor(text?: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class ExceedSizeError extends SurveyError {
        private maxSize;
        constructor(maxSize: number, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        getDefaultText(): string;
        private getTextSize;
    }
    export class WebRequestError extends SurveyError {
        status: string;
        response: string;
        constructor(status: string, response: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class WebRequestEmptyError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class OtherEmptyError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class UploadingFileError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class RequiredInAllRowsError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class MinRowCountError extends SurveyError {
        minRowCount: number;
        constructor(minRowCount: number, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class KeyDuplicationError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
        protected getDefaultText(): string;
    }
    export class CustomError extends SurveyError {
        text: string;
        constructor(text: string, errorOwner?: ISurveyErrorOwner);
        getErrorType(): string;
    }
}
declare module "questionfactory" {
    import { Question } from "question";
    import { IElement } from "base-interfaces";
    export class QuestionFactory {
        static Instance: QuestionFactory;
        static get DefaultChoices(): string[];
        static get DefaultColums(): string[];
        static get DefaultRows(): string[];
        static get DefaultMutlipleTextItems(): string[];
        private creatorHash;
        registerQuestion(questionType: string, questionCreator: (name: string) => Question): void;
        unregisterElement(elementType: string): void;
        clear(): void;
        getAllTypes(): Array<string>;
        createQuestion(questionType: string, name: string): Question;
    }
    export class ElementFactory {
        static Instance: ElementFactory;
        private creatorHash;
        registerElement(elementType: string, elementCreator: (name: string) => IElement): void;
        clear(): void;
        unregisterElement(elementType: string, removeFromSerializer?: boolean): void;
        getAllTypes(): Array<string>;
        createElement(elementType: string, name: string): IElement;
    }
}
declare module "defaultCss/defaultV2Css" {
    export var surveyCss: any;
    export var defaultV2Css: {
        root: string;
        rootMobile: string;
        rootReadOnly: string;
        container: string;
        header: string;
        body: string;
        bodyWithTimer: string;
        clockTimerRoot: string;
        clockTimerRootTop: string;
        clockTimerRootBottom: string;
        clockTimerProgress: string;
        clockTimerProgressAnimation: string;
        clockTimerTextContainer: string;
        clockTimerMinorText: string;
        clockTimerMajorText: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        headerClose: string;
        navigationButton: string;
        bodyNavigationButton: string;
        completedPage: string;
        timerRoot: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        panel: {
            number: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleDisabled: string;
            titleOnExpand: string;
            titleOnError: string;
            titleBar: string;
            description: string;
            container: string;
            withFrame: string;
            content: string;
            icon: string;
            iconExpanded: string;
            footer: string;
            requiredText: string;
            header: string;
            collapsed: string;
            expanded: string;
            nested: string;
            invisible: string;
            navigationButton: string;
        };
        paneldynamic: {
            mainRoot: string;
            empty: string;
            root: string;
            navigation: string;
            title: string;
            button: string;
            buttonRemove: string;
            buttonAdd: string;
            buttonPrev: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            buttonNext: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            separator: string;
            panelWrapper: string;
            footer: string;
            panelFooter: string;
            footerButtonsContainer: string;
            panelWrapperInRow: string;
            progressBtnIcon: string;
            noEntriesPlaceholder: string;
        };
        progress: string;
        progressTop: string;
        progressBottom: string;
        progressBar: string;
        progressText: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        progressTextInBar: string;
        page: {
            root: string;
            emptyHeaderRoot: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        rowMultiple: string;
        pageRow: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            withFrame: string;
            asCell: string;
            answered: string;
            header: string;
            headerLeft: string;
            headerTop: string;
            headerBottom: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            titleOnAnswer: string;
            titleOnError: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleDisabled: string;
            titleBar: string;
            requiredText: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            comment: string;
            other: string;
            required: string;
            titleRequired: string;
            indent: number;
            footer: string;
            formGroup: string;
            hasError: string;
            collapsed: string;
            expanded: string;
            nested: string;
            invisible: string;
            composite: string;
            disabled: string;
        };
        image: {
            mainRoot: string;
            root: string;
            image: string;
            adaptive: string;
            withFrame: string;
        };
        html: {
            mainRoot: string;
            root: string;
            withFrame: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            tooltip: string;
            outsideQuestion: string;
            aboveQuestion: string;
            belowQuestion: string;
            locationTop: string;
            locationBottom: string;
        };
        checkbox: {
            root: string;
            rootRow: string;
            rootMultiColumn: string;
            item: string;
            itemOnError: string;
            itemSelectAll: string;
            itemNone: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            itemDecorator: string;
            itemSvgIconId: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        radiogroup: {
            root: string;
            rootRow: string;
            rootMultiColumn: string;
            item: string;
            itemOnError: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemControl: string;
            itemDecorator: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        boolean: {
            mainRoot: string;
            root: string;
            rootRadio: string;
            item: string;
            itemOnError: string;
            control: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            label: string;
            switch: string;
            disabledLabel: string;
            sliderText: string;
            slider: string;
            radioItem: string;
            radioItemChecked: string;
            radioLabel: string;
            radioControlLabel: string;
            radioFieldset: string;
            itemRadioDecorator: string;
            materialRadioDecorator: string;
            itemRadioControl: string;
            rootCheckbox: string;
            checkboxItem: string;
            checkboxLabel: string;
            checkboxItemOnError: string;
            checkboxItemIndeterminate: string;
            checkboxItemChecked: string;
            checkboxItemDecorator: string;
            checkboxItemDisabled: string;
            controlCheckbox: string;
            checkboxMaterialDecorator: string;
            checkboxControlLabel: string;
            svgIconCheckedId: string;
        };
        text: {
            root: string;
            small: string;
            controlDisabled: string;
            onError: string;
        };
        multipletext: {
            root: string;
            itemLabel: string;
            itemLabelOnError: string;
            item: string;
            itemTitle: string;
            row: string;
            cell: string;
        };
        dropdown: {
            root: string;
            popup: string;
            small: string;
            selectWrapper: string;
            other: string;
            onError: string;
            label: string;
            item: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemControl: string;
            itemDecorator: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            control: string;
            controlInputFieldComponent: string;
            controlValue: string;
            controlDisabled: string;
            controlEmpty: string;
            controlLabel: string;
            filterStringInput: string;
            materialDecorator: string;
        };
        imagepicker: {
            mainRoot: string;
            root: string;
            rootColumn: string;
            item: string;
            itemOnError: string;
            itemInline: string;
            itemChecked: string;
            itemDisabled: string;
            itemHover: string;
            label: string;
            itemDecorator: string;
            imageContainer: string;
            itemControl: string;
            image: string;
            itemText: string;
            other: string;
            itemNoImage: string;
            itemNoImageSvgIcon: string;
            itemNoImageSvgIconId: string;
            column: string;
            checkedItemDecorator: string;
            checkedItemSvgIcon: string;
            checkedItemSvgIconId: string;
        };
        matrix: {
            mainRoot: string;
            tableWrapper: string;
            root: string;
            rootVerticalAlignTop: string;
            rootVerticalAlignMiddle: string;
            rootAlternateRows: string;
            rowError: string;
            cell: string;
            row: string;
            headerCell: string;
            rowTextCell: string;
            label: string;
            itemOnError: string;
            itemValue: string;
            itemChecked: string;
            itemDisabled: string;
            itemHover: string;
            materialDecorator: string;
            itemDecorator: string;
            cellText: string;
            cellTextSelected: string;
            cellTextDisabled: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            mainRoot: string;
            rootScroll: string;
            root: string;
            rootVerticalAlignTop: string;
            rootVerticalAlignMiddle: string;
            tableWrapper: string;
            rootAlternateRows: string;
            cell: string;
            itemCell: string;
            row: string;
            headerCell: string;
            rowTextCell: string;
            cellRequiredText: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailIconId: string;
            detailIconExpandedId: string;
            actionsCell: string;
            emptyCell: string;
            verticalCell: string;
            cellQuestionWrapper: string;
        };
        matrixdynamic: {
            mainRoot: string;
            rootScroll: string;
            empty: string;
            root: string;
            tableWrapper: string;
            cell: string;
            row: string;
            itemCell: string;
            headerCell: string;
            rowTextCell: string;
            cellRequiredText: string;
            button: string;
            detailRow: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailIconId: string;
            detailIconExpandedId: string;
            detailPanelCell: string;
            actionsCell: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            dragElementDecorator: string;
            iconDragElement: string;
            footer: string;
            emptyRowsSection: string;
            iconDrag: string;
            ghostRow: string;
            emptyCell: string;
            verticalCell: string;
            cellQuestionWrapper: string;
        };
        rating: {
            rootDropdown: string;
            root: string;
            rootWrappable: string;
            item: string;
            itemOnError: string;
            itemHover: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            itemDisabled: string;
            control: string;
            controlValue: string;
            controlDisabled: string;
            controlEmpty: string;
            filterStringInput: string;
            onError: string;
        };
        comment: {
            root: string;
            small: string;
            controlDisabled: string;
            onError: string;
        };
        expression: string;
        file: {
            root: string;
            other: string;
            placeholderInput: string;
            preview: string;
            fileSign: string;
            fileList: string;
            fileSignBottom: string;
            dragArea: string;
            dragAreaActive: string;
            fileDecorator: string;
            onError: string;
            fileDecoratorDrag: string;
            fileInput: string;
            noFileChosen: string;
            chooseFile: string;
            chooseFileAsText: string;
            chooseFileAsTextDisabled: string;
            chooseFileAsIcon: string;
            chooseFileIconId: string;
            disabled: string;
            removeButton: string;
            removeButtonBottom: string;
            removeButtonIconId: string;
            removeFile: string;
            removeFileSvg: string;
            removeFileSvgIconId: string;
            wrapper: string;
            defaultImage: string;
            defaultImageIconId: string;
            leftIconId: string;
            rightIconId: string;
            removeFileButton: string;
            dragAreaPlaceholder: string;
            imageWrapper: string;
            single: string;
            singleImage: string;
            mobile: string;
        };
        signaturepad: {
            mainRoot: string;
            root: string;
            small: string;
            controls: string;
            placeholder: string;
            clearButton: string;
            clearButtonIconId: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDesignMode: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
            itemOnError: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemHover: string;
            itemSelected: string;
            itemDisabled: string;
            itemControl: string;
        };
        list: {
            root: string;
            item: string;
            itemBody: string;
            itemSelected: string;
        };
        actionBar: {
            root: string;
            item: string;
            defaultSizeMode: string;
            smallSizeMode: string;
            itemPressed: string;
            itemAsIcon: string;
            itemIcon: string;
            itemTitle: string;
        };
        variables: {
            mobileWidth: string;
            imagepickerGapBetweenItems: string;
            themeMark: string;
        };
        tagbox: {
            root: string;
            popup: string;
            small: string;
            selectWrapper: string;
            other: string;
            onError: string;
            label: string;
            item: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemControl: string;
            itemDecorator: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            cleanItemButton: string;
            cleanItemButtonSvg: string;
            cleanItemButtonIconId: string;
            control: string;
            controlValue: string;
            controlValueItems: string;
            placeholderInput: string;
            controlDisabled: string;
            controlEmpty: string;
            controlLabel: string;
            filterStringInput: string;
            materialDecorator: string;
        };
    };
    export const defaultV2ThemeName = "defaultV2";
}
declare module "trigger" {
    import { HashTable } from "helpers";
    import { Base } from "base";
    import { ISurvey } from "base-interfaces";
    /**
     * A base class for all triggers.
     * A trigger calls a method when the expression change the result: from false to true or from true to false.
     * Please note, it runs only one changing the expression result.
     */
    export class Trigger extends Base {
        static operatorsValue: HashTable<Function>;
        static get operators(): HashTable<Function>;
        private conditionRunner;
        private usedNames;
        private hasFunction;
        constructor();
        getType(): string;
        toString(): string;
        get operator(): string;
        set operator(value: string);
        get value(): any;
        set value(val: any);
        get name(): string;
        set name(val: string);
        get expression(): string;
        set expression(val: string);
        protected canBeExecuted(isOnNextPage: boolean): boolean;
        protected isExecutingOnNextPage: boolean;
        checkExpression(isOnNextPage: boolean, keys: any, values: HashTable<any>, properties?: HashTable<any>): void;
        check(value: any): void;
        private perform;
        private triggerResult;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
        protected onFailure(): void;
        protected onSuccessExecuted(): void;
        endLoadingFromJson(): void;
        private oldPropertiesChanged;
        private onExpressionChanged;
        buildExpression(): string;
        private isCheckRequired;
        private buildUsedNames;
        private get isRequireValue();
    }
    export interface ISurveyTriggerOwner {
        getObjects(pages: string[], questions: string[]): any[];
        setCompleted(): void;
        canBeCompleted(): void;
        triggerExecuted(trigger: Trigger): void;
        setTriggerValue(name: string, value: any, isVariable: boolean): any;
        copyTriggerValue(name: string, fromName: string): any;
        focusQuestion(name: string): boolean;
    }
    /**
     * It extends the Trigger base class and add properties required for SurveyJS classes.
     */
    export class SurveyTrigger extends Trigger {
        protected ownerValue: ISurveyTriggerOwner;
        constructor();
        get owner(): ISurveyTriggerOwner;
        setOwner(owner: ISurveyTriggerOwner): void;
        getSurvey(live?: boolean): ISurvey;
        protected isRealExecution(): boolean;
        protected onSuccessExecuted(): void;
    }
    /**
     * If expression returns true, it makes questions/pages visible.
     * Ohterwise it makes them invisible.
     */
    export class SurveyTriggerVisible extends SurveyTrigger {
        pages: string[];
        questions: string[];
        constructor();
        getType(): string;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
        protected onFailure(): void;
        private onTrigger;
        protected onItemSuccess(item: any): void;
        protected onItemFailure(item: any): void;
    }
    /**
     * If expression returns true, it completes the survey.
     */
    export class SurveyTriggerComplete extends SurveyTrigger {
        constructor();
        getType(): string;
        protected isRealExecution(): boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
    }
    /**
     * If expression returns true, the value from property **setValue** will be set to **setToName**
     */
    export class SurveyTriggerSetValue extends SurveyTrigger {
        constructor();
        getType(): string;
        protected canBeExecuted(isOnNextPage: boolean): boolean;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        get setToName(): string;
        set setToName(val: string);
        get setValue(): any;
        set setValue(val: any);
        get isVariable(): boolean;
        set isVariable(val: boolean);
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
    }
    /**
     * If expression returns true, the survey go to question **gotoName** and focus it.
     */
    export class SurveyTriggerSkip extends SurveyTrigger {
        constructor();
        getType(): string;
        get gotoName(): string;
        set gotoName(val: string);
        protected canBeExecuted(isOnNextPage: boolean): boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
    }
    /**
     * If expression returns true, the **runExpression** will be run. If **setToName** property is not empty then the result of **runExpression** will be set to it.
     */
    export class SurveyTriggerRunExpression extends SurveyTrigger {
        constructor();
        getType(): string;
        get setToName(): string;
        set setToName(val: string);
        get runExpression(): string;
        set runExpression(val: string);
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
        private onCompleteRunExpression;
    }
    /**
     * If expression returns true, the value from question **fromName** will be set into **setToName**.
     */
    export class SurveyTriggerCopyValue extends SurveyTrigger {
        constructor();
        protected canBeExecuted(isOnNextPage: boolean): boolean;
        get setToName(): string;
        set setToName(val: string);
        get fromName(): string;
        set fromName(val: string);
        getType(): string;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
    }
}
declare module "calculatedValue" {
    import { HashTable } from "helpers";
    import { Base } from "base";
    import { ISurvey, ISurveyData } from "base-interfaces";
    /**
     * The calculated value is a way to define the variable in Survey Creator.
     * It has two main properties: name and expression. Based on expression the value read-only property is automatically calculated.
     * The name property should be unique though all calculated values.
     * It uses survey.getVariable/seruvey.setVariable functions to get/set its value. The class do not store its value internally.
     * You may set includeIntoResult property to true to store this calculated value into survey result.
     */
    export class CalculatedValue extends Base {
        private data;
        private expressionIsRunning;
        private expressionRunner;
        constructor(name?: string, expression?: string);
        setOwner(data: ISurveyData): void;
        getType(): string;
        getSurvey(live?: boolean): ISurvey;
        get owner(): ISurveyData;
        /**
         * The calculated value name. It should be non empty and unique.
         */
        get name(): string;
        set name(val: string);
        /**
         * Set this property to true to include the non-empty calculated value into survey result, survey.data property.
         */
        get includeIntoResult(): boolean;
        set includeIntoResult(val: boolean);
        /**
         * The Expression that used to calculate the value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
         * Example: "({quantity} * {price}) * (100 - {discount}) / 100"
         */
        get expression(): string;
        set expression(val: string);
        locCalculation(): void;
        unlocCalculation(): void;
        private isCalculated;
        resetCalculation(): void;
        doCalculation(calculatedValues: Array<CalculatedValue>, values: HashTable<any>, properties: HashTable<any>): void;
        runExpression(values: HashTable<any>, properties: HashTable<any>): void;
        get value(): any;
        protected setValue(val: any): void;
        private get canRunExpression();
        private rerunExpression;
        private runExpressionCore;
        private runDependentExpressions;
        private ensureExpression;
    }
}
declare module "dxSurveyService" {
    /**
     * The class contains methods to work with api.surveyjs.io service.
     */
    export class dxSurveyService {
        static get serviceUrl(): string;
        static set serviceUrl(val: string);
        constructor();
        loadSurvey(surveyId: string, onLoad: (success: boolean, result: string, response: any) => void): void;
        getSurveyJsonAndIsCompleted(surveyId: string, clientId: string, onLoad: (success: boolean, surveyJson: any, result: string, response: any) => void): void;
        sendResult(postId: string, result: JSON, onSendResult: (success: boolean, response: any, request?: any) => void, clientId?: string, isPartialCompleted?: boolean): void;
        sendFile(postId: string, file: File, onSendFile: (success: boolean, response: any) => void): void;
        getResult(resultId: string, name: string, onGetResult: (success: boolean, data: any, dataList: Array<any>, response: any) => void): void;
        isCompleted(resultId: string, clientId: string, onIsCompleted: (success: boolean, result: string, response: any) => void): void;
    }
}
declare module "stylesmanager" {
    import { Logger } from "utils/utils";
    export const modernThemeColors: {
        [key: string]: string;
    };
    export const defaultThemeColors: {
        [key: string]: string;
    };
    export const orangeThemeColors: {
        [key: string]: string;
    };
    export const darkblueThemeColors: {
        [key: string]: string;
    };
    export const darkroseThemeColors: {
        [key: string]: string;
    };
    export const stoneThemeColors: {
        [key: string]: string;
    };
    export const winterThemeColors: {
        [key: string]: string;
    };
    export const winterstoneThemeColors: {
        [key: string]: string;
    };
    export class StylesManager {
        private static SurveyJSStylesSheetId;
        private sheet;
        static Logger: Logger;
        static Styles: {
            [key: string]: string;
        };
        static Media: {
            [key: string]: {
                media: string;
                style: string;
            };
        };
        static ThemeColors: {
            [key: string]: {
                [key: string]: string;
            };
        };
        static ThemeCss: {
            [key: string]: {
                [key: string]: string;
            };
        };
        static ThemeSelector: {
            [key: string]: string;
        };
        static autoApplyTheme(): void;
        static getAvailableThemes(): Array<any>;
        static getIncludedThemeCss(): Array<any>;
        static findSheet(styleSheetId: string): any;
        static createSheet(styleSheetId: string): any;
        static applyTheme(themeName?: string, themeSelector?: string): void;
        static Enabled: boolean;
        constructor();
        initializeStyles(sheet: CSSStyleSheet): any;
    }
}
declare module "surveytimer" {
    import { Event } from "base";
    export var surveyTimerFunctions: {
        setTimeout: (func: () => any) => number;
        clearTimeout: (timerId: number) => void;
    };
    export class SurveyTimer {
        private static instanceValue;
        static get instance(): SurveyTimer;
        private listenerCounter;
        private timerId;
        onTimer: Event<() => any, any>;
        start(func?: () => any): void;
        stop(func?: () => any): void;
        doTimer(): void;
    }
}
declare module "surveyTimerModel" {
    import { ISurvey } from "base-interfaces";
    import { Base, EventBase } from "base";
    import { PageModel } from "page";
    import { SurveyModel } from "survey";
    export interface ISurveyTimerText {
        timerInfoText: string;
        timerInfo: {
            spent: number;
            limit?: number;
        };
        timerClock: {
            majorText: string;
            minorText?: string;
        };
        getCss(): any;
        isTimerPanelShowingOnBottom: boolean;
        isTimerPanelShowingOnTop: boolean;
        onCurrentPageChanged: EventBase<SurveyModel>;
    }
    export class SurveyTimerModel extends Base {
        onTimer: (page: PageModel) => void;
        private surveyValue;
        constructor(survey: ISurvey);
        text: string;
        progress: number;
        clockMajorText: string;
        clockMinorText: string;
        spent: number;
        get survey(): ISurveyTimerText;
        onCreating(): void;
        private timerFunc;
        start(): void;
        stop(): void;
        get isRunning(): boolean;
        private setIsRunning;
        private update;
        private doTimer;
        private updateProgress;
        private updateText;
        get showProgress(): boolean;
        get showTimerAsClock(): boolean;
        get rootCss(): string;
        getProgressCss(): string;
        get textContainerCss(): string;
        get minorTextCss(): string;
        get majorTextCss(): string;
    }
}
declare module "choicesRestful" {
    import { Base } from "base";
    import { ITextProcessor, IQuestion, ISurvey } from "base-interfaces";
    import { ItemValue } from "itemvalue";
    import { SurveyError } from "survey-error";
    /**
     * Configures access to a RESTful service that returns choices for [Checkbox](https://surveyjs.io/Examples/Library?id=questiontype-checkbox), [Dropdown](https://surveyjs.io/Examples/Library?id=questiontype-dropdown), [Radiogroup](https://surveyjs.io/Examples/Library?id=questiontype-radiogroup), and other multiple-choice question types.
     *
     * Use the following properties to configure this object:
     *
     * ```js
     * {
     *   url: "http://...", // A RESTful service's URL.
     *   valueName: "value", // Specifies which field contains choice values.
     *   titleName: "title", // Specifies which field contains display texts for choice values.
     *   imageLinkName: "imageUrl", // Specifies which field contains image URLs. Used in Image Picker questions.
     *   // Path to the array of choices. Specify `path` only if the array of choices is nested within the object returned by the service.
     *   // The following path separators are allowed: semicolon `;`, comma `,`.
     *   path: "myNestedArray"
     * }
     * ```
     *
     * Typically, you should assign this object to a question's [`choicesByUrl`](https://surveyjs.io/Documentation/Library?id=QuestionSelectBase#choicesByUrl) property.
     */
    export class ChoicesRestful extends Base {
        private static cacheText;
        private static noCacheText;
        static get EncodeParameters(): boolean;
        static set EncodeParameters(val: boolean);
        static clearCache(): void;
        private static itemsResult;
        private static sendingSameRequests;
        private static addSameRequest;
        private static unregisterSameRequests;
        static onBeforeSendRequest: (sender: ChoicesRestful, options: {
            request: XMLHttpRequest;
        }) => void;
        private static getCachedItemsResult;
        private lastObjHash;
        private isRunningValue;
        protected processedUrl: string;
        protected processedPath: string;
        private isUsingCacheFromUrl;
        onProcessedUrlCallback: (url: string, path: string) => void;
        getResultCallback: (items: Array<ItemValue>) => void;
        beforeSendRequestCallback: () => void;
        updateResultCallback: (items: Array<ItemValue>, serverResult: any) => Array<ItemValue>;
        getItemValueCallback: (item: any) => any;
        error: SurveyError;
        owner: IQuestion;
        createItemValue: (value: any) => ItemValue;
        constructor();
        getSurvey(live?: boolean): ISurvey;
        run(textProcessor?: ITextProcessor): void;
        get isUsingCache(): boolean;
        get isRunning(): boolean;
        protected getIsRunning(): boolean;
        get isWaitingForParameters(): boolean;
        protected useChangedItemsResults(): boolean;
        private doEmptyResultCallback;
        private processedText;
        protected parseResponse(response: any): any;
        protected sendRequest(): void;
        getType(): string;
        get isEmpty(): boolean;
        getCustomPropertiesNames(): Array<string>;
        private getCustomPropertyName;
        private getCustomProperties;
        setData(json: any): void;
        getData(): any;
        /**
         * A RESTful service's URL.
         *
         * This property supports [dynamic URLs](https://surveyjs.io/Documentation/Library?id=design-survey-conditional-logic#dynamic-texts). For example, the URL below depends on the `region` question's value. When the value changes, the survey automatically loads a new dataset that corresponds to the selected region.
         *
         * ```js
         * url: "https://surveyjs.io/api/CountriesExample?region={region}"
         * ```
         *
         * [View Demo](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull (linkStyle))
         * @see path
         * @see valueName
         * @see titleName
         */
        get url(): string;
        set url(val: string);
        /**
         * Path to the array of choices. The following path separators are allowed: semicolon `;`, comma `,`.
         *
         * Specify this property only if the array of choices is nested within the object returned by the service. For example, the service returns the following object:
         *
         * ```js
         * {
         *   countries: [ ... ],
         *   capitals: [ ... ]
         * }
         * ```
         *
         * To populate choices with values from the `countries` array, set the `path` property to `"countries"`. To use the `capitals` array, set this property to `"capitals"`.
         * @see url
         * @see valueName
         * @see titleName
         */
        get path(): string;
        set path(val: string);
        /**
         * Specifies which property in the obtained data object contains choice values.
         *
         * [View Demo](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull (linkStyle))
         *
         * @see url
         * @see path
         * @see titleName
         */
        get valueName(): string;
        set valueName(val: string);
        /**
         * Specifies which property in the obtained data object contains display texts for choices.
         *
         * @see url
         * @see path
         * @see valueName
         */
        get titleName(): string;
        set titleName(val: string);
        /**
         * Specifies which property in the obtained data object contains image URLs. Used only in [Image Picker](https://surveyjs.io/Examples/Library?id=questiontype-imagepicker) questions.
         *
         * @see url
         * @see path
         * @see valueName
         */
        get imageLinkName(): string;
        set imageLinkName(val: string);
        get allowEmptyResponse(): boolean;
        set allowEmptyResponse(val: boolean);
        get attachOriginalItems(): boolean;
        set attachOriginalItems(val: boolean);
        get itemValueType(): string;
        clear(): void;
        protected beforeSendRequest(): void;
        protected beforeLoadRequest(): void;
        protected onLoad(result: any, loadingObjHash?: string): void;
        protected callResultCallback(items: Array<ItemValue>, loadingObjHash: string): void;
        private setCustomProperties;
        private getPropertyBinding;
        private onError;
        private getResultAfterPath;
        private getPathes;
        private getValue;
        private setTitle;
        private getImageLink;
        private getValueCore;
        private get objHash();
    }
    /**
     * Obsolete, please use ChoicesRestful
     */
    export class ChoicesRestfull extends ChoicesRestful {
        static get EncodeParameters(): boolean;
        static set EncodeParameters(val: boolean);
        static clearCache(): void;
        static get onBeforeSendRequest(): (sender: ChoicesRestful, options: {
            request: XMLHttpRequest;
        }) => void;
        static set onBeforeSendRequest(val: (sender: ChoicesRestful, options: {
            request: XMLHttpRequest;
        }) => void);
    }
}
declare module "question_baseselect" {
    import { SurveyError } from "survey-error";
    import { ISurveyImpl, ISurvey } from "base-interfaces";
    import { Question } from "question";
    import { ItemValue } from "itemvalue";
    import { ChoicesRestful } from "choicesRestful";
    import { LocalizableString } from "localizablestring";
    import { HashTable } from "helpers";
    /**
     * A base class for multiple-choice question types ([Checkbox](https://surveyjs.io/form-library/documentation/questioncheckboxmodel), [Dropdown](https://surveyjs.io/form-library/documentation/questiondropdownmodel), [Radiogroup](https://surveyjs.io/form-library/documentation/questionradiogroupmodel), etc.).
     */
    export class QuestionSelectBase extends Question {
        visibleChoicesChangedCallback: () => void;
        loadedChoicesFromServerCallback: () => void;
        private filteredChoicesValue;
        private conditionChoicesVisibleIfRunner;
        private conditionChoicesEnableIfRunner;
        private prevOtherValue;
        private otherItemValue;
        private choicesFromUrl;
        private cachedValueForUrlRequests;
        private isChoicesLoaded;
        private enableOnLoadingChoices;
        private dependedQuestions;
        private noneItemValue;
        private newItemValue;
        private canShowOptionItemCallback;
        private isUsingCarrayForward;
        protected selectedItemValues: any;
        constructor(name: string);
        getType(): string;
        dispose(): void;
        get otherId(): string;
        protected getCommentElementsId(): Array<string>;
        protected getItemValueType(): string;
        createItemValue(value: any): ItemValue;
        supportGoNextPageError(): boolean;
        isLayoutTypeSupported(layoutType: string): boolean;
        localeChanged(): void;
        locStrsChanged(): void;
        get otherValue(): string;
        set otherValue(val: string);
        protected get otherValueCore(): string;
        protected set otherValueCore(val: string);
        /**
         * Returns the "Other" choice item. Use this property to change the item's `value` or `text`.
         * @see showOtherItem
         */
        get otherItem(): ItemValue;
        /**
         * Returns `true` if the "Other" choice item is selected.
         * @see showOtherItem
         */
        get isOtherSelected(): boolean;
        get isNoneSelected(): boolean;
        /**
         * Specifies whether to display the "None" choice item.
         *
         * When users select the "None" item in multi-select questions, all other items become unselected.
         * @see noneItem
         * @see noneText
         */
        get showNoneItem(): boolean;
        set showNoneItem(val: boolean);
        get hasNone(): boolean;
        set hasNone(val: boolean);
        /**
         * Returns the "None" choice item. Use this property to change the item's `value` or `text`.
         * @see showNoneItem
         */
        get noneItem(): ItemValue;
        /**
         * Gets or sets a caption for the "None" choice item.
         * @see showNoneItem
         */
        get noneText(): string;
        set noneText(val: string);
        get locNoneText(): LocalizableString;
        /**
         * A Boolean expression that is evaluated against each choice item. If the expression evaluates to `false`, the choice item becomes hidden.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Use the `{item}` placeholder to reference the current choice item in the expression.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see visibleIf
         * @see choicesEnableIf
         */
        get choicesVisibleIf(): string;
        set choicesVisibleIf(val: string);
        /**
         * A Boolean expression that is evaluated against each choice item. If the expression evaluates to `false`, the choice item becomes read-only.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Use the `{item}` placeholder to reference the current choice item in the expression.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see enableIf
         * @see choicesVisibleIf
         */
        get choicesEnableIf(): string;
        set choicesEnableIf(val: string);
        surveyChoiceItemVisibilityChange(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected isTextValue(): boolean;
        private isSettingDefaultValue;
        protected setDefaultValue(): void;
        protected getIsMultipleValue(): boolean;
        protected convertDefaultValue(val: any): any;
        protected filterItems(): boolean;
        protected runItemsCondition(values: HashTable<any>, properties: HashTable<any>): boolean;
        protected runItemsEnableCondition(values: HashTable<any>, properties: HashTable<any>): any;
        protected onAfterRunItemsEnableCondition(): void;
        protected onEnableItemCallBack(item: ItemValue): boolean;
        private setConditionalChoicesRunner;
        private setConditionalEnableChoicesRunner;
        private canSurveyChangeItemVisibility;
        changeItemVisisbility(): (item: ItemValue, val: boolean) => boolean;
        private runConditionsForItems;
        protected getHasOther(val: any): boolean;
        protected getIsItemValue(val: any, item: ItemValue): boolean;
        get validatedValue(): any;
        protected createRestful(): ChoicesRestful;
        private setNewRestfulProperty;
        get autoOtherMode(): boolean;
        set autoOtherMode(val: boolean);
        protected getQuestionComment(): string;
        protected selectOtherValueFromComment(val: boolean): void;
        private isSettingComment;
        protected setQuestionComment(newValue: string): void;
        private onUpdateCommentOnAutoOtherMode;
        private setOtherValueInternally;
        clearValue(): void;
        updateCommentFromSurvey(newValue: any): any;
        get renderedValue(): any;
        set renderedValue(val: any);
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean, updateComment?: boolean): void;
        protected setNewValue(newValue: any): void;
        protected valueFromData(val: any): any;
        protected rendredValueFromData(val: any): any;
        protected rendredValueToData(val: any): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        protected needConvertRenderedOtherToDataValue(): boolean;
        protected updateSelectedItemValues(): void;
        protected resetSelectedItemValues(): void;
        protected hasUnknownValue(val: any, includeOther?: boolean, isFilteredChoices?: boolean, checkEmptyValue?: boolean): boolean;
        protected isValueDisabled(val: any): boolean;
        /**
         * If the clearIncorrectValuesCallback is set, it is used to clear incorrect values instead of default behaviour.
         */
        clearIncorrectValuesCallback: () => void;
        /**
         * Configures access to a RESTful service that returns choice items. Refer to the [ChoicesRestful](https://surveyjs.io/form-library/documentation/choicesrestful) class description for more information.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/questiontype-dropdownrestfull/ (linkStyle))
         * @see choices
         */
        get choicesByUrl(): ChoicesRestful;
        set choicesByUrl(val: ChoicesRestful);
        /**
         * Gets or sets choice items. This property accepts an array of objects with the following structure:
         *
         * ```js
         * {
         *   "value": any, // A unique value to be saved in the survey results.
         *   "text": String, // A display text. This property supports Markdown. When `text` is undefined, `value` is used.
         *   "imageLink": String // A link to the image or video that represents this choice value. Applies only to Image Picker questions.
         *   "customProperty": any // Any property that you find useful.
         * }
         * ```
         *
         * To enable Markdown support for the `text` property, implement Markdown-to-HTML conversion in the [onTextMarkdown](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onTextMarkdown) event handler. For an example, refer to the following demo: [Convert Markdown to HTML with Showdown](https://surveyjs.io/form-library/examples/edit-survey-questions-markdown/).
         *
         * If you add custom properties, refer to the following help topic to learn how to serialize them into JSON: [Add Custom Properties to Property Grid](https://surveyjs.io/survey-creator/documentation/property-grid#add-custom-properties-to-the-property-grid).
         *
         * If you need to specify only the `value` property, you can set the `choices` property to an array of primitive values, for example, `[ "item1", "item2", "item3" ]`. These values are both saved in survey results and used as display text.
         * @see choicesByUrl
         * @see choicesFromQuestion
         */
        get choices(): Array<any>;
        set choices(newValue: Array<any>);
        /**
         * Inherits choice items from a specified question. Accepts a question name.
         *
         * If you specify this property, the `choices`, `choicesVisibleIf`, `choicesEnableIf`, and `choicesOrder` properties do not apply because their values are inherited.
         *
         * In addition, you can specify the `choicesFromQuestionMode` property if you do not want to inherit all choice items.
         * @see choicesFromQuestionMode
         * @see choices
         */
        get choicesFromQuestion(): string;
        set choicesFromQuestion(val: string);
        private addIntoDependedQuestion;
        private removeFromDependedQuestion;
        /**
         * Specifies which choice items to inherit from another question. Applies only when the `choicesFromQuestion` property is specified.
         *
         * Possible values:
         *
         * - `"all"` (default) - Inherits all choice items.
         * - `"selected"` - Inherits only selected choice items.
         * - `"unselected"` - Inherits only unselected choice items.
         *
         * Use the `visibleChoices` property to access inherited choice items.
         * @see choicesFromQuestion
         * @see visibleChoices
         */
        get choicesFromQuestionMode(): string;
        set choicesFromQuestionMode(val: string);
        /**
         * Specifies whether to hide the question if no choice items are visible.
         *
         * This property is useful if you show or hide choice items at runtime based on a [condition](https://surveyjs.io/form-library/documentation/questionselectbase#choicesVisibleIf).
         */
        get hideIfChoicesEmpty(): boolean;
        set hideIfChoicesEmpty(val: boolean);
        /**
         * Specifies whether to keep values that cannot be assigned to this question, for example, choices unlisted in the `choices` array.
         *
         * > This property cannot be specified in the survey JSON schema. Use dot notation to specify it.
         * @see clearIncorrectValues
         */
        get keepIncorrectValues(): boolean;
        set keepIncorrectValues(val: boolean);
        get storeOthersAsComment(): any;
        set storeOthersAsComment(val: any);
        protected hasOtherChanged(): void;
        /**
         * Specifies the sort order of choice items.
         *
         * Possible values:
         *
         * - `"none"` (default) - Preserves the original order of choice items.
         * - `"asc"`- Sorts choice items in ascending order.
         * - `"desc"`- Sorts choice items in ascending order.
         * - `"random"` - Displays choice items in random order.
         */
        get choicesOrder(): string;
        set choicesOrder(val: string);
        /**
         * Gets or sets a caption for the "Other" choice item.
         * @see showOtherItem
         */
        get otherText(): string;
        set otherText(val: string);
        get locOtherText(): LocalizableString;
        /**
         * Displays the "Select All", "None", and "Other" choices on individual rows.
         * @see showNoneItem
         * @see showOtherItem
         */
        separateSpecialChoices: boolean;
        /**
         * A placeholder for the comment area. Applies when the `showOtherItem` or `showCommentArea` property is `true`.
         * @see showOtherItem
         * @see showCommentArea
         */
        otherPlaceholder: string;
        get otherPlaceHolder(): string;
        set otherPlaceHolder(newValue: string);
        /**
         * Get or sets an error message displayed when users select the "Other" choice item but leave the comment area empty.
         * @see showOtherItem
         */
        get otherErrorText(): string;
        set otherErrorText(val: string);
        get locOtherErrorText(): LocalizableString;
        /**
         * An array of visible choice items. Includes the "Select All", "Other", and "None" choice items if they are visible. Items are sorted according to the `choicesOrder` value.
         * @see showNoneItem
         * @see showOtherItem
         * @see choicesOrder
         * @see choices
         * @see enabledChoices
         */
        get visibleChoices(): Array<ItemValue>;
        /**
         * An array of choice items with which users can interact. Includes the "Select All", "Other", and "None" choice items if they are not disabled. Items are sorted according to the `choicesOrder` value.
         * @see showNoneItem
         * @see showOtherItem
         * @see choicesOrder
         * @see choices
         * @see visibleChoices
         */
        get enabledChoices(): Array<ItemValue>;
        protected updateVisibleChoices(): void;
        private calcVisibleChoices;
        protected canUseFilteredChoices(): boolean;
        setCanShowOptionItemCallback(func: (item: ItemValue) => boolean): void;
        get newItem(): ItemValue;
        protected addToVisibleChoices(items: Array<ItemValue>, isAddAll: boolean): void;
        protected canShowOptionItem(item: ItemValue, isAddAll: boolean, hasItem: boolean): boolean;
        isItemInList(item: ItemValue): boolean;
        protected get isAddDefaultItems(): boolean;
        getPlainData(options?: {
            includeEmpty?: boolean;
            includeQuestionTypes?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): import("question").IQuestionPlainData;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected getDisplayValueEmpty(): string;
        protected getChoicesDisplayValue(items: ItemValue[], val: any): any;
        protected getDisplayArrayValue(keysAsText: boolean, value: any, onGetValueCallback?: (index: number) => any): string;
        private getFilteredChoices;
        protected get activeChoices(): Array<ItemValue>;
        private getQuestionWithChoices;
        protected getChoicesFromQuestion(question: QuestionSelectBase): Array<ItemValue>;
        protected get hasActiveChoices(): boolean;
        protected isHeadChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        protected isFootChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        protected isBuiltInChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        protected getChoices(): Array<ItemValue>;
        supportOther(): boolean;
        supportNone(): boolean;
        protected isSupportProperty(propName: string): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        protected setSurveyCore(value: ISurvey): void;
        getStoreOthersAsComment(): boolean;
        onSurveyLoad(): void;
        onAnyValueChanged(name: string): void;
        updateValueFromSurvey(newValue: any): void;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        onOtherValueInput(event: any): void;
        onOtherValueChange(event: any): void;
        private isRunningChoices;
        private runChoicesByUrl;
        private isFirstLoadChoicesFromUrl;
        protected onBeforeSendRequest(): void;
        protected onLoadChoicesFromUrl(array: Array<ItemValue>): void;
        private createCachedValueForUrlRequests;
        private updateCachedValueForUrlRequests;
        private isUpdatingChoicesDependedQuestions;
        protected updateChoicesDependedQuestions(): void;
        onSurveyValueChanged(newValue: any): void;
        protected onVisibleChoicesChanged(): void;
        private updateVisibilityBasedOnChoices;
        private sortVisibleChoices;
        private sortArray;
        private randomizeArray;
        clearIncorrectValues(): void;
        protected hasValueToClearIncorrectValues(): boolean;
        protected clearValueIfInvisibleCore(): void;
        /**
         * Returns `true` if a passed choice item is selected.
         *
         * To obtain a choice item to check, use the `noneItem` or `otherItem` property or the `choices` array.
         * @param item A choice item.
         * @see noneItem
         * @see otherItem
         * @see choices
         */
        isItemSelected(item: ItemValue): boolean;
        protected isItemSelectedCore(item: ItemValue): boolean;
        private clearDisabledValues;
        protected clearIncorrectValuesCore(): void;
        protected canClearValueAnUnknow(val: any): boolean;
        protected clearDisabledValuesCore(): void;
        clearUnusedValues(): void;
        getColumnClass(): string;
        getItemIndex(item: any): number;
        getItemClass(item: any): string;
        protected getCurrentColCount(): number;
        protected getItemClassCore(item: any, options: any): string;
        getLabelClass(item: ItemValue): string;
        getControlLabelClass(item: ItemValue): string;
        get headItems(): ItemValue[];
        get footItems(): ItemValue[];
        get dataChoices(): ItemValue[];
        get bodyItems(): ItemValue[];
        get hasHeadItems(): boolean;
        get hasFootItems(): boolean;
        get columns(): any[];
        get hasColumns(): boolean;
        get rowLayout(): boolean;
        get blockedRow(): boolean;
        choicesLoaded(): void;
        getItemValueWrapperComponentName(item: ItemValue): string;
        getItemValueWrapperComponentData(item: ItemValue): any;
        ariaItemChecked(item: ItemValue): "true" | "false";
        isOtherItem(item: ItemValue): boolean;
        get itemSvgIcon(): string;
        getSelectBaseRootCss(): string;
        getAriaItemLabel(item: ItemValue): string;
        getItemId(item: ItemValue): string;
        get questionName(): string;
        getItemEnabled(item: ItemValue): any;
        protected rootElement: HTMLElement;
        afterRender(el: HTMLElement): void;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        private focusOtherComment;
        private prevIsOtherSelected;
        protected onValueChanged(): void;
        protected getDefaultItemComponent(): string;
        /**
         * The name of a component used to render items.
         */
        get itemComponent(): string;
        set itemComponent(value: string);
        protected updateCssClasses(res: any, css: any): void;
        protected calcCssClasses(css: any): any;
    }
    /**
     * A base class for multiple-selection question types that can display choice items in multiple columns ([Checkbox](https://surveyjs.io/form-library/documentation/questioncheckboxmodel), [Radiogroup](https://surveyjs.io/form-library/documentation/questionradiogroupmodel), [Image Picker](https://surveyjs.io/form-library/documentation/questionimagepickermodel)).
     */
    export class QuestionCheckboxBase extends QuestionSelectBase {
        colCountChangedCallback: () => void;
        constructor(name: string);
        /**
         * Get or sets the number of columns used to arrange choice items.
         *
         * Set this property to 0 if you want to display all items in one line. The default value depends on the available width.
         * @see separateSpecialChoices
         */
        get colCount(): number;
        set colCount(value: number);
        protected onParentChanged(): void;
        protected onParentQuestionChanged(): void;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
    }
}
declare module "expressionItems" {
    import { Base } from "base";
    import { ISurvey } from "base-interfaces";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    /**
     * Base class for HtmlConditionItem and UrlConditionItem classes.
     */
    export class ExpressionItem extends Base implements ILocalizableOwner {
        locOwner: ILocalizableOwner;
        constructor(expression?: string);
        getType(): string;
        runCondition(values: any, properties: any): boolean;
        /**
         * The expression property. If this expression returns true, then survey will use html property to show on complete page.
         */
        get expression(): string;
        set expression(val: string);
        get locHtml(): LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        getSurvey(isLive?: boolean): ISurvey;
    }
    /**
     * A class that contains expression and html propeties. It uses in survey.completedHtmlOnCondition array.
     * If the expression returns true then html of this item uses instead of survey.completedHtml property
     * @see SurveyModel.completedHtmlOnCondition
     * @see SurveyModel.completedHtml
     */
    export class HtmlConditionItem extends ExpressionItem {
        constructor(expression?: string, html?: string);
        getType(): string;
        /**
         * The html that shows on completed ('Thank you') page. The expression should return true
         * @see expression
         */
        get html(): string;
        set html(value: string);
        get locHtml(): LocalizableString;
    }
    /**
     * A class that contains expression and url propeties. It uses in survey.navigateToUrlOnCondition array.
     * If the expression returns true then url of this item uses instead of survey.navigateToUrl property
     * @see SurveyModel.navigateToUrl
     */
    export class UrlConditionItem extends ExpressionItem {
        constructor(expression?: string, url?: string);
        getType(): string;
        /**
         * The url that survey navigates to on completing the survey. The expression should return true
         * @see expression
         */
        get url(): string;
        set url(value: string);
        get locUrl(): LocalizableString;
    }
}
declare module "question_paneldynamic" {
    import { HashTable } from "helpers";
    import { IElement, IQuestion, IPanel, ISurveyData, ISurvey, ISurveyImpl, ITextProcessor, IProgressInfo } from "base-interfaces";
    import { LocalizableString } from "localizablestring";
    import { Question, IConditionObject } from "question";
    import { PanelModel } from "panel";
    import { SurveyError } from "survey-error";
    import { ActionContainer } from "actions/container";
    import { IAction } from "actions/action";
    export interface IQuestionPanelDynamicData {
        getItemIndex(item: ISurveyData): number;
        getPanelItemData(item: ISurveyData): any;
        setPanelItemData(item: ISurveyData, name: string, val: any): any;
        getSharedQuestionFromArray(name: string, panelIndex: number): Question;
        getSurvey(): ISurvey;
        getRootData(): ISurveyData;
    }
    export class QuestionPanelDynamicItem implements ISurveyData, ISurveyImpl {
        static ItemVariableName: string;
        static ParentItemVariableName: string;
        static IndexVariableName: string;
        private panelValue;
        private data;
        private textPreProcessor;
        constructor(data: IQuestionPanelDynamicData, panel: PanelModel);
        get panel(): PanelModel;
        setSurveyImpl(): void;
        getValue(name: string): any;
        setValue(name: string, newValue: any): void;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): void;
        findQuestionByName(name: string): IQuestion;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
    }
    export class QuestionPanelDynamicTemplateSurveyImpl implements ISurveyImpl {
        data: IQuestionPanelDynamicData;
        constructor(data: IQuestionPanelDynamicData);
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
    }
    /**
      * A class that describes the Dynamic Panel question type.
      *
      * Dynamic Panel allows respondents to add panels based on a template panel and delete them. Specify the [`templateElements`](https://surveyjs.io/form-library/documentation/questionpaneldynamicmodel#templateElements) property to configure template panel elements.
      *
      * [View Demo](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/ (linkStyle))
      */
    export class QuestionPanelDynamicModel extends Question implements IQuestionPanelDynamicData {
        private templateValue;
        private loadingPanelCount;
        private isValueChangingInternally;
        private changingValueQuestion;
        private currentIndexValue;
        renderModeChangedCallback: () => void;
        panelCountChangedCallback: () => void;
        currentIndexChangedCallback: () => void;
        constructor(name: string);
        get hasSingleInput(): boolean;
        getFirstQuestionToFocus(withError: boolean): Question;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        private assignOnPropertyChangedToTemplate;
        private addOnPropertyChangedCallback;
        private onTemplateElementPropertyChanged;
        private get useTemplatePanel();
        getType(): string;
        get isCompositeQuestion(): boolean;
        clearOnDeletingContainer(): void;
        get isAllowTitleLeft(): boolean;
        removeElement(element: IElement): boolean;
        /**
         * A `PanelModel` object used as a template to create dynamic panels.
         * @see PanelModel
         * @see templateElements
         * @see templateTitle
         * @see panels
         * @see panelCount
         */
        get template(): PanelModel;
        getPanel(): IPanel;
        /**
         * An array of questions and panels included in the template panel.
         * @see template
         * @see panels
         * @see panelCount
         */
        get templateElements(): Array<IElement>;
        /**
         * A title for the template panel.
         * @see template
         * @see templateDescription
         * @see templateElements
         * @see panels
         * @see panelCount
         */
        get templateTitle(): string;
        set templateTitle(newValue: string);
        get locTemplateTitle(): LocalizableString;
        /**
         * A description for the template panel.
         * @see template
         * @see templateTitle
         * @see templateElements
         * @see panels
         * @see panelCount
         */
        get templateDescription(): string;
        set templateDescription(newValue: string);
        get locTemplateDescription(): LocalizableString;
        protected get items(): Array<ISurveyData>;
        /**
         * An array of `PanelModel` objects created based on the template panel.
         * @see PanelModel
         * @see template
         * @see panelCount
         */
        get panels(): Array<PanelModel>;
        /**
         * A zero-based index of the currently displayed panel.
         *
         * When `renderMode` is `"list"` or Dynamic Panel is empty (`panelCount` is 0), this property contains -1.
         * @see currentPanel
         * @see panels
         * @see panelCount
         * @see renderMode
         */
        get currentIndex(): number;
        set currentIndex(val: number);
        /**
         * A `PanelModel` object that is the currently displayed panel.
         *
         * When `renderMode` is `"list"` or Dynamic Panel is empty (`panelCount` is 0), this property contains `null`.
         * @see currentIndex
         * @see panels
         * @see panelCount
         * @see renderMode
         */
        get currentPanel(): PanelModel;
        /**
         * Specifies whether to display a confirmation dialog when a respondent wants to delete a panel.
         * @see confirmDeleteText
         */
        get confirmDelete(): boolean;
        set confirmDelete(val: boolean);
        /**
         * Specifies a key question. Set this property to the name of a question used in the template, and Dynamic Panel will display `keyDuplicationError` if a user tries to enter a duplicate value in this question.
         * @see keyDuplicationError
         */
        get keyName(): string;
        set keyName(val: string);
        /**
         * A message displayed in a confirmation dialog that appears when a respondent wants to delete a panel.
         * @see confirmDelete
         */
        get confirmDeleteText(): string;
        set confirmDeleteText(val: string);
        get locConfirmDeleteText(): LocalizableString;
        /**
         * An error message displayed when users enter a duplicate value into a question that accepts only unique values (`isUnique` is set to `true` or `keyName` is specified).
         *
         * A default value for this property is taken from a [localization dictionary](https://github.com/surveyjs/survey-library/tree/master/src/localization). Refer to the following help topic for more information: [Localization & Globalization](https://surveyjs.io/form-library/documentation/localization).
         * @see keyName
         */
        get keyDuplicationError(): string;
        set keyDuplicationError(val: string);
        get locKeyDuplicationError(): LocalizableString;
        /**
         * A caption for the Previous button. Applies only if `renderMode` is different from `"list"`.
         * @see renderMode
         * @see isPrevButtonVisible
         */
        get panelPrevText(): string;
        set panelPrevText(val: string);
        get locPanelPrevText(): LocalizableString;
        /**
         * A caption for the Next button. Applies only if `renderMode` is different from `"list"`.
         * @see renderMode
         * @see isNextButtonVisible
         */
        get panelNextText(): string;
        set panelNextText(val: string);
        get locPanelNextText(): LocalizableString;
        /**
         * A caption for the Add Panel button.
         */
        get panelAddText(): string;
        set panelAddText(value: string);
        get locPanelAddText(): LocalizableString;
        /**
         * A caption for the Delete Panel button.
         * @see panelRemoveButtonLocation
         */
        get panelRemoveText(): string;
        set panelRemoveText(val: string);
        get locPanelRemoveText(): LocalizableString;
        /**
         * Returns true when the renderMode equals to "progressTop" or "progressTopBottom"
         */
        get isProgressTopShowing(): boolean;
        /**
         * Returns true when the renderMode equals to "progressBottom" or "progressTopBottom"
         */
        get isProgressBottomShowing(): boolean;
        /**
         * Indicates whether the Previous button is visible.
         * @see currentIndex
         * @see currentPanel
         * @see panelPrevText
         */
        get isPrevButtonVisible(): boolean;
        get isPrevButtonShowing(): boolean;
        /**
         * Indicates whether the Next button is visible.
         * @see currentIndex
         * @see currentPanel
         * @see panelNextText
         */
        get isNextButtonVisible(): boolean;
        get isNextButtonShowing(): boolean;
        /**
         * Returns true when showRangeInProgress equals to true, renderMode doesn't equal to "list" and panelCount is >= 2.
         */
        get isRangeShowing(): boolean;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        private isAddingNewPanels;
        private addingNewPanelsValue;
        private isNewPanelsValueChanged;
        private prepareValueForPanelCreating;
        private setValueAfterPanelsCreating;
        protected getValueCore(): any;
        protected setValueCore(newValue: any): void;
        /**
         * The number of panels in Dynamic Panel.
         * @see minPanelCount
         * @see maxPanelCount
         */
        get panelCount(): number;
        set panelCount(val: number);
        /**
         * Specifies whether users can expand and collapse panels. Applies if `renderMode` is `"list"` and the `templateTitle` property is specified.
         *
         * Possible values:
         *
         * - `"default"` (default) - All panels are displayed in full and cannot be collapsed.
         * - `"expanded"` - All panels are displayed in full and can be collapsed in the UI.
         * - `"collapsed"` - All panels display only their titles and descriptions and can be expanded in the UI.
         * - `"firstExpanded"` - Only the first panel is displayed in full; other panels are collapsed and can be expanded in the UI.
         * @see renderMode
         * @see templateTitle
         */
        get panelsState(): string;
        set panelsState(val: string);
        private setTemplatePanelSurveyImpl;
        private setPanelsSurveyImpl;
        private setPanelsState;
        private setValueBasedOnPanelCount;
        /**
         * A minimum number of panels in Dynamic Panel. Users cannot delete panels if `panelCount` equals `minPanelCount`.
         *
         * Default value: 0
         * @see panelCount
         * @see maxPanelCount
         * @see allowRemovePanel
         */
        get minPanelCount(): number;
        set minPanelCount(val: number);
        /**
         * A maximum number of panels in Dynamic Panel. Users cannot add new panels if `panelCount` equals `maxPanelCount`.
         *
         * Default value: 100 (inherited from [`settings.panelMaximumPanelCount`](https://surveyjs.io/form-library/documentation/settings#panelMaximumPanelCount))
         * @see panelCount
         * @see minPanelCount
         * @see allowAddPanel
         */
        get maxPanelCount(): number;
        set maxPanelCount(val: number);
        /**
         * Specifies whether users are allowed to add new panels.
         *
         * Default value: `true`
         * @see canAddPanel
         * @see allowRemovePanel
         */
        get allowAddPanel(): boolean;
        set allowAddPanel(val: boolean);
        /**
         * Specifies whether users are allowed to delete panels.
         *
         * Default value: `true`
         * @see canRemovePanel
         * @see allowAddPanel
         */
        get allowRemovePanel(): boolean;
        set allowRemovePanel(val: boolean);
        /**
         * Gets or sets the location of question titles within the template panel relative to their input fields.
         *
         * - `"default"` (default) - Inherits the setting from the Dynamic Panel's `titleLocation` property, which in turn inherits the [`questionTitleLocation`](https://surveyjs.io/form-library/documentation/surveymodel#questionTitleLocation) property value specified for the Dynamic Panel's container (page or survey).
         * - `"top"` - Displays question titles above input fields.
         * - `"bottom"` - Displays question titles below input fields.
         * - `"left"` - Displays question titles to the left of input fields.
         * - `"hidden"` - Hides question titles.
         * @see titleLocation
         */
        get templateTitleLocation(): string;
        set templateTitleLocation(value: string);
        /**
         * Use this property to show/hide the numbers in titles in questions inside a dynamic panel.
         * By default the value is "off". You may set it to "onPanel" and the first question inside a dynamic panel will start with 1 or "onSurvey" to include nested questions in dymamic panels into global survey question numbering.
         */
        get showQuestionNumbers(): string;
        set showQuestionNumbers(val: string);
        /**
         * Specifies the location of the Delete Panel button relative to panel content.
         *
         * Possible values:
         *
         * - `"bottom"` (default) - Displays the Delete Panel button below panel content.
         * - `"right"` - Displays the Delete Panel button to the right of panel content.
         * @see panelRemoveText
         */
        get panelRemoveButtonLocation(): string;
        set panelRemoveButtonLocation(val: string);
        /**
         * Shows the range from 1 to panelCount when renderMode doesn't equal to "list". Set to false to hide this element.
         * @see panelCount
         * @see renderMode
         */
        get showRangeInProgress(): boolean;
        set showRangeInProgress(val: boolean);
        /**
         * By default the property equals to "list" and all dynamic panels are rendered one by one on the page. You may change it to: "progressTop", "progressBottom" or "progressTopBottom" to render only one dynamic panel at once. The progress and navigation elements can be rendred on top, bottom or both.
         */
        get renderMode(): string;
        set renderMode(val: string);
        get isRenderModeList(): boolean;
        setVisibleIndex(value: number): number;
        private setPanelVisibleIndex;
        /**
         * Indicates whether it is possible to add a new panel.
         *
         * This property returns `true` when all of the following conditions apply:
         *
         * - Users are allowed to add new panels (`allowAddPanel` is `true`).
         * - Dynamic Panel or its parent survey is not in read-only state.
         * - `panelCount` is less than `maxPanelCount`.
         * @see allowAddPanel
         * @see isReadOnly
         * @see panelCount
         * @see maxPanelCount
         * @see canRemovePanel
         */
        get canAddPanel(): boolean;
        /**
         * Indicates whether it is possible to delete panels.
         *
         * This property returns `true` when all of the following conditions apply:
         *
         * - Users are allowed to delete panels (`allowRemovePanel` is `true`).
         * - Dynamic Panel or its parent survey is not in read-only state.
         * - `panelCount` exceeds `minPanelCount`.
         * @see allowRemovePanel
         * @see isReadOnly
         * @see panelCount
         * @see minPanelCount
         * @see canAddPanel
         */
        get canRemovePanel(): boolean;
        protected rebuildPanels(): void;
        /**
         * If it is not empty, then this value is set to every new panel, including panels created initially, unless the defaultValue is not empty
         * @see defaultValue
         * @see defaultValueFromLastPanel
         */
        get defaultPanelValue(): any;
        set defaultPanelValue(val: any);
        /**
         * Specifies whether default values for a new panel should be copied from the last panel.
         *
         * If you also specify `defaultValue`, it will be merged with the copied values.
         * @see defaultValue
         */
        get defaultValueFromLastPanel(): boolean;
        set defaultValueFromLastPanel(val: boolean);
        protected isDefaultValueEmpty(): boolean;
        protected setDefaultValue(): void;
        isEmpty(): boolean;
        getProgressInfo(): IProgressInfo;
        private isRowEmpty;
        /**
         * Add a new dynamic panel based on the template Panel. It checks if canAddPanel returns true and then calls addPanel method.
         * If a renderMode is different from "list" and the current panel has erros, then
         * @see template
         * @see panelCount
         * @see panels
         * @see canAddPanel
         */
        addPanelUI(): PanelModel;
        /**
         * Add a new dynamic panel based on the template Panel.
         * @see template
         * @see panelCount
         * @see panels
         * @see renderMode
         */
        addPanel(): PanelModel;
        private canLeaveCurrentPanel;
        private copyValue;
        /**
         * Call removePanel function. Do nothing is canRemovePanel returns false. If confirmDelete set to true, it shows the confirmation dialog first.
         * @param value a panel or panel index
         * @see removePanel
         * @see confirmDelete
         * @see confirmDeleteText
         * @see canRemovePanel
         *
         */
        removePanelUI(value: any): void;
        /**
         * Switches Dynamic Panel to the next panel. Returns `true` in case of success, or `false` if `renderMode` is `"list"` or the current panel contains validation errors.
         * @see renderMode
         */
        goToNextPanel(): boolean;
        /**
         * Switches Dynamic Panel to the previous panel.
         */
        goToPrevPanel(): void;
        /**
         * Removes a dynamic panel from the panels array.
         * @param value a panel or panel index
         * @see panels
         * @see template
         */
        removePanel(value: any): void;
        private getPanelIndex;
        locStrsChanged(): void;
        clearIncorrectValues(): void;
        clearErrors(): void;
        getQuestionFromArray(name: string, index: number): IQuestion;
        private clearIncorrectValuesInPanel;
        private iscorrectValueWithPostPrefix;
        getSharedQuestionFromArray(name: string, panelIndex: number): Question;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        protected onReadOnlyChanged(): void;
        private updateNoEntriesTextDefaultLoc;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        localeChanged(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        private reRunCondition;
        protected runPanelsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        onAnyValueChanged(name: string): void;
        private hasKeysDuplicated;
        private updatePanelsContainsErrors;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        protected getContainsErrors(): boolean;
        protected getIsAnswered(): boolean;
        protected clearValueIfInvisibleCore(): void;
        protected getIsRunningValidators(): boolean;
        getAllErrors(): Array<SurveyError>;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        private getPanelDisplayValue;
        private hasErrorInPanels;
        private setOnCompleteAsyncInPanel;
        private isValueDuplicated;
        getPanelActions(panel: PanelModel): Array<IAction>;
        protected createNewPanel(): PanelModel;
        protected createAndSetupNewPanelObject(): PanelModel;
        private getTemplateQuestionTitleLocation;
        protected createNewPanelObject(): PanelModel;
        private setPanelCountBasedOnValue;
        setQuestionValue(newValue: any): void;
        onSurveyValueChanged(newValue: any): void;
        private isAllPanelsEmpty;
        private panelUpdateValueFromSurvey;
        private panelSurveyValueChanged;
        private onReadyChangedCallback;
        recalculateIsReadyValue(): void;
        protected onSetData(): void;
        getItemIndex(item: ISurveyData): number;
        getPanelItemData(item: ISurveyData): any;
        private isSetPanelItemData;
        private static maxCheckCount;
        setPanelItemData(item: ISurveyData, name: string, val: any): void;
        getRootData(): ISurveyData;
        getPlainData(options?: {
            includeEmpty?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): import("question").IQuestionPlainData;
        updateElementCss(reNew?: boolean): void;
        get progressText(): string;
        get progress(): string;
        getRootCss(): string;
        getPanelWrapperCss(): string;
        getPanelRemoveButtonCss(): string;
        getAddButtonCss(): string;
        getPrevButtonCss(): string;
        getNextButtonCss(): string;
        /**
         * A text displayed when Dynamic Panel contains no entries. Applies only in the Default V2 theme.
         */
        get noEntriesText(): string;
        set noEntriesText(val: string);
        get locNoEntriesText(): LocalizableString;
        getShowNoEntriesPlaceholder(): boolean;
        needResponsiveWidth(): boolean;
        private footerToolbarValue;
        get footerToolbar(): ActionContainer;
        legacyNavigation: boolean;
        private updateFooterActionsCallback;
        private updateFooterActions;
        private initFooterToolbar;
        private get showLegacyNavigation();
    }
}
declare module "notifier" {
    import { Base } from "base";
    import { ActionContainer } from "actions/container";
    import { IAction } from "actions/action";
    export class Notifier extends Base {
        private cssClasses;
        active: boolean;
        message: string;
        css: string;
        timeout: number;
        timer: any;
        private actionsVisibility;
        actionBar: ActionContainer;
        constructor(cssClasses: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        });
        getCssClass(type: string): string;
        updateActionsVisibility(type: string): void;
        notify(message: string, type?: string): void;
        addAction(action: IAction, notificationType: string): void;
    }
}
declare module "survey" {
    import { JsonError } from "jsonobject";
    import { Base, EventBase } from "base";
    import { ISurvey, ISurveyData, ISurveyImpl, ITextProcessor, IQuestion, IPanel, IElement, IPage, ISurveyErrorOwner, ISurveyElement, IProgressInfo, IFindElement } from "base-interfaces";
    import { SurveyElementCore } from "survey-element";
    import { ISurveyTriggerOwner, SurveyTrigger, Trigger } from "trigger";
    import { CalculatedValue } from "calculatedValue";
    import { PageModel } from "page";
    import { dxSurveyService } from "dxSurveyService";
    import { LocalizableString } from "localizablestring";
    import { SurveyTimerModel, ISurveyTimerText } from "surveyTimerModel";
    import { IQuestionPlainData, Question } from "question";
    import { QuestionSelectBase } from "question_baseselect";
    import { ItemValue } from "itemvalue";
    import { PanelModel, QuestionRowModel } from "panel";
    import { HtmlConditionItem, UrlConditionItem } from "expressionItems";
    import { SurveyError } from "survey-error";
    import { IAction, Action } from "actions/action";
    import { ActionContainer } from "actions/container";
    import { QuestionPanelDynamicModel } from "question_paneldynamic";
    import { Notifier } from "notifier";
    /**
     * The `SurveyModel` object contains properties and methods that allow you to control the survey and access its elements.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/nps-question/ (linkStyle))
     */
    export class SurveyModel extends SurveyElementCore implements ISurvey, ISurveyData, ISurveyImpl, ISurveyTriggerOwner, ISurveyErrorOwner, ISurveyTimerText {
        static readonly TemplateRendererComponentName: string;
        static get cssType(): string;
        static set cssType(value: string);
        [index: string]: any;
        private static stylesManager;
        static platform: string;
        get platformName(): string;
        notifier: Notifier;
        /**
         * A suffix added to the name of the property that stores comments.
         *
         * Default value: "-Comment"
         *
         * Many question types allow respondents to leave comments. To enable this functionality, set a question's [`showCommentArea`](https://surveyjs.io/form-library/documentation/api-reference/checkbox-question-model#showCommentArea) property to `true`. Comment values are saved in a separate property. The property name is composed of the question `name` and `commentSuffix`.
         *
         * Respondents can also leave a comment when they select "Other" in a single- or multi-select question, such as Dropdown or Checkboxes. The property name for the comment value is composed according to the same rules. However, you can use the question `name` as a key to store the comment value instead. Disable the [`storeOthersAsComment`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#storeOthersAsComment) property in this case.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/create-checkboxes-question-in-javascript/ (linkStyle))
         */
        get commentSuffix(): string;
        set commentSuffix(val: string);
        get commentPrefix(): string;
        set commentPrefix(val: string);
        private valuesHash;
        private variablesHash;
        private editingObjValue;
        private textPreProcessor;
        private timerModelValue;
        private navigationBarValue;
        /**
         * An event that is raised after a trigger is executed.
         *
         * - `sender`: `SurveyModel`- A survey instance that raised the event.
         * - `options.trigger`: [`Trigger`](https://surveyjs.io/form-library/documentation/api-reference/trigger) - A trigger that has been executed.
         *
         * For more information about triggers, refer to the following help topic: [Conditional Survey Logic (Triggers)](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-survey-logic-triggers).
         * @see triggers
         * @see runTriggers
         */
        onTriggerExecuted: EventBase<SurveyModel>;
        /**
         * An event that is raised before the survey is completed. Use this event to prevent survey completion.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.allow`: `Boolean`\
         * Set this property to `false` if you want to prevent survey completion.
         * - `options.isCompleteOnTrigger`: `Boolean`\
         * Returns `true` if survey completion is caused by the ["complete" trigger](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#complete).
         * @see onComplete
         * @see doComplete
         * @see allowCompleteSurveyAutomatic
         */
        onCompleting: EventBase<SurveyModel>;
        /**
         * An event that is raised after the survey is completed. Use this event to send survey results to the server.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event. Use `sender.data` to access survey results.
         * - `options.isCompleteOnTrigger`: `Boolean`\
         * Returns `true` if survey completion is caused by the ["complete" trigger](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#complete).
         * - `options.showSaveInProgress(text?: string)`\
         * Call this method to indicate that the save operation is in progress. You can use the `text` parameter to display a custom message.
         * - `options.showSaveError(text?: string)`\
         * Call this method to indicate that an error occurred during the save operation. You can use the `text` parameter to display a custom error message.
         * - `options.showSaveSuccess(text?: string)`\
         * Call this method to indicate that survey results are successfully saved. You can use the `text` parameter to display a custom message.
         * - `options.clearSaveMessages()`\
         * Call this method to hide the save operation messages.
         *
         * For an example of how to use the methods described above, refer to the following help topic: [Store Survey Results in Your Own Database](https://surveyjs.io/form-library/documentation/handle-survey-results-store#store-survey-results-in-your-own-database).
         *
         * > Do not disable the [`showCompletedPage`](https://surveyjs.io/form-library/documentation/surveymodel#showCompletedPage) property if you call one of the `options.showSave...` methods. This is required because the UI that indicates data saving progress is integrated into the complete page. If you hide the complete page, the UI also becomes invisible.
         * @see onPartialSend
         * @see doComplete
         * @see allowCompleteSurveyAutomatic
         */
        onComplete: EventBase<SurveyModel>;
        /**
         * An event that is raised before the survey displays a [preview](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#preview-page). Use this event to cancel the preview.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.allow`: `Boolean`\
         * Set this property to `false` if you want to cancel the preview.
         * @see showPreviewBeforeComplete
         */
        onShowingPreview: EventBase<SurveyModel>;
        /**
         * An event that is raised before the survey navigates to a specified URL. Use this event to change the URL or cancel the navigation.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.url`: `String`\
         * A URL to which respondents should be navigated. You can modify this parameter's value.
         * - `options.allow`: `Boolean`\
         * Set this property to `false` if you want to cancel the navigation and show the [complete page](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#complete-page).
         * @see navigateToUrl
         * @see navigateToUrlOnCondition
         */
        onNavigateToUrl: EventBase<SurveyModel>;
        /**
         * An event that is raised when the survey [`state`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#state) changes from `"starting"` to `"running"`. This occurs only if your survey includes a [start page](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#start-page).
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * @see firstPageIsStarted
         */
        onStarted: EventBase<SurveyModel>;
        /**
         * Use this event to save incomplete survey results. Enable the [`sendResultOnPageNext`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#sendResultOnPageNext) property for this event to occur.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         *
         * Refer to the following help topic for more information on the use case: [Continue an Incomplete Survey](https://surveyjs.io/form-library/documentation/handle-survey-results-continue-incomplete).
         */
        onPartialSend: EventBase<SurveyModel>;
        /**
         * An event that is raised before the current page is switched.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.oldCurrentPage`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * The current page.
         * - `options.newCurrentPage`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * A page that will be current.
         * - `options.allow`: `Boolean`\
         * Set this property to `false` if you do not want to switch the current page.
         * - `options.isNextPage`: `Boolean`\
         * Returns `true` if the respondent is going forward along the survey.
         * - `options.isPrevPage`: `Boolean`\
         * Returns `true` if the respondent is going backwards, that is, `newCurrentPage` is earlier in the survey than `oldCurrentPage`.
         * @see currentPageNo
         * @see nextPage
         * @see prevPage
         **/
        onCurrentPageChanging: EventBase<SurveyModel>;
        /**
         * An event that is raised after the current page is switched.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.oldCurrentPage`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * A page that used to be current.
         * - `options.newCurrentPage`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * The current page.
         * - `options.isNextPage`: `Boolean`\
         * Returns `true` if the respondent is going forward along the survey.
         * - `options.isPrevPage`: `Boolean`\
         * Returns `true` if the respondent is going backwards, that is, `newCurrentPage` is earlier in the survey than `oldCurrentPage`.
         * @see currentPageNo
         * @see nextPage
         * @see prevPage
         */
        onCurrentPageChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised before a question value is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.name`: `String`\
         * The `name` of the question whose value is being changed. If you use the [`valueName`](https://surveyjs.io/form-library/documentation/api-reference/text-entry-question-model#valueName) property, this parameter contains its value.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * The question whose value is being changed. If you use `valueName` and it is the same for several questions, this parameter contains the first question.
         * - `options.oldValue`: `any`\
         * A previous value.
         * - `options.value`: `any`\
         * A new value. You can change it if required.
         * @see setValue
         */
        onValueChanging: EventBase<SurveyModel>;
        /**
         * An event that is raised after a question value is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.name`: `String`\
         * The `name` of the question whose value has been changed. If you use the [`valueName`](https://surveyjs.io/form-library/documentation/api-reference/text-entry-question-model#valueName) property, this parameter contains its value.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * The question whose value has been changed. If you use `valueName`, and it is the same for several questions, this parameter contains the first question.
         * - `options.value`: `any`\
         * A new value.
         *
         * To handle value changes in matrix cells or panels within a [Dynamic Panel](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model), use the [`onMatrixCellValueChanged`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onMatrixCellValueChanged) or [`onDynamicPanelItemValueChanged`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onDynamicPanelItemValueChanged) event.
         * @see setValue
         */
        onValueChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised after a [variable](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#variables) or [calculated value](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#calculated-values) is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.name`: `String`\
         * The name of the variable or calculated value that has been changed.
         * - `options.value`: `any`\
         * A new value for the variable or calculated value.
         * @see setVariable
         * @see calculatedValues
         */
        onVariableChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised after question visibility is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * A question whose visibility has been changed.
         * - `options.name`: `String`\
         * The question's name.
         * - `options.visible`: `Boolean`\
         * Indicates whether the question is visible now.
         *
         * Refer to the following help topic for information on how to implement conditional visibility: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-visibility).
         */
        onQuestionVisibleChanged: EventBase<SurveyModel>;
        /**
         * Obsolete. Please use onQuestionVisibleChanged event.
         * @see onQuestionVisibleChanged
         */
        onVisibleChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised after page visibility is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.page`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * A page whose visibility has been changed.
         * - `options.visible`: `Boolean`\
         * Indicates whether the page is visible now.
         *
         * Refer to the following help topic for information on how to implement conditional visibility: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-visibility).
         */
        onPageVisibleChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised after page visibility is changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A panel whose visibility has been changed.
         * - `options.visible`: `Boolean`\
         * Indicates whether the panel is visible now.
         *
         * Refer to the following help topic for information on how to implement conditional visibility: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#conditional-visibility).
         */
        onPanelVisibleChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised when the survey creates any new object derived from [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question).
         *
         * In a survey, complex elements ([Dynamic Matrix](https://surveyjs.io/form-library/examples/questiontype-matrixdynamic/), [Multiple Text](https://surveyjs.io/form-library/examples/questiontype-multipletext/), and [Dynamic Panel](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/)) are composed of questions. Use this event to customize any question regardless of which survey element it belongs to.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * A created question.
         *
         * To use this event for questions loaded from JSON, create an empty survey model, add an event handler, and only then populate the model from the JSON object:
         *
         * ```js
         * import { Model } from "survey-core";
         *
         * const surveyJson = {
         *    // ...
         * };
         * // Create an empty model
         * const survey = new Model();
         * // Add an event handler
         * survey.onQuestionCreated.add((sender, options) => {
         *   //...
         * });
         * // Load the survey JSON schema
         * survey.fromJSON(surveyJson);
         * ```
         * @see onQuestionAdded
         */
        onQuestionCreated: EventBase<SurveyModel>;
        /**
         * An event that is raised when a new question is added to a panel or page.
         *
         * * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * A new question.
         * - `options.name`: `String`\
         * The question's name.
         * - `options.index`: `Number`\
         * The question's index within the parent container (panel or page).
         * - `options.parent`: [`PanelModelBase`](https://surveyjs.io/form-library/documentation/api-reference/panelmodelbase)\
         * The parent container (panel or page).
         * - `options.page`: [`PanelModelBase`](https://surveyjs.io/form-library/documentation/api-reference/panelmodelbase)\
         * A page that nests the added question.
         *
         * To use this event for questions loaded from JSON, create an empty survey model, add an event handler, and only then populate the model from the JSON object:
         *
         * ```js
         * import { Model } from "survey-core";
         *
         * const surveyJson = {
         *    // ...
         * };
         * // Create an empty model
         * const survey = new Model();
         * // Add an event handler
         * survey.onQuestionAdded.add((sender, options) => {
         *   //...
         * });
         * // Load the survey JSON schema
         * survey.fromJSON(surveyJson);
         * ```
         * @see onQuestionCreated
         */
        onQuestionAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised after a question is deleted from the survey.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * A deleted question.
         * - `options.name`: `String`\
         * The question's name.
         */
        onQuestionRemoved: EventBase<SurveyModel>;
        /**
         *  An event that is raised when a new panel is added to a page.
         *
         * * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A new panel.
         * - `options.name`: `String`\
         * The panel's name.
         * - `options.index`: `Number`\
         * The panel's index within the parent container (panel or page).
         * - `options.parent`: [`PanelModelBase`](https://surveyjs.io/form-library/documentation/api-reference/panelmodelbase)\
         * The parent container (panel or page).
         * - `options.page`: [`PanelModelBase`](https://surveyjs.io/form-library/documentation/api-reference/panelmodelbase)\
         * A page that nests the added panel.
         */
        onPanelAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised after a panel is deleted from the survey.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A deleted panel.
         * - `options.name`: `String`\
         * The panel's name.
         */
        onPanelRemoved: EventBase<SurveyModel>;
        /**
         *  An event that is raised when a new page is added to the survey.
         *
         * * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.page`: [`PageModel`](https://surveyjs.io/form-library/documentation/api-reference/page-model)\
         * A new page.
         * @see PanelModel
         */
        onPageAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised when a question value is being validated. Use this event to specify a custom error message.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`Question`](https://surveyjs.io/form-library/documentation/api-reference/question)\
         * A question being validated.
         * - `options.name`: `String`\
         * The question's name.
         * - `options.value`: `any`\
         * A question value being validated.
         * - `options.error`: `String`\
         * An error message that you should specify if validation fails.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/add-custom-input-validation/ (linkStyle))
         * @see onServerValidateQuestions
         * @see onValidatePanel
         * @see onMatrixCellValidate
         * @see onSettingQuestionErrors
         */
        onValidateQuestion: EventBase<SurveyModel>;
        /**
         * An event that is raised before errors are assigned to a question. You may add/remove/modify errors for a question.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a validated question.
         * - `options.errors` - the list of errors. The list is empty by default and remains empty if a validated question has no errors.
         * @see onValidateQuestion
         */
        onSettingQuestionErrors: EventBase<SurveyModel>;
        /**
         * Use this event to validate data on your server.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.data`: `Object`\
         * Question values. You can get an individual question value as follows: `options.data["questionName"]`.
         * - `options.errors`: `Object`\
         * An object for your error messages. Set error messages as follows: `options.errors["questionName"] = "My error message"`
         * - `options.complete()`: Method\
         * A method that you should call when a request to the server has completed.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/javascript-server-side-form-validation/ (linkStyle))
         * @see onValidateQuestion
         * @see onValidatePanel
         */
        onServerValidateQuestions: any;
        /**
         * An event that is raised when a panel is being validated. Use this event to specify a custom error message.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A panel being validated.
         * - `options.name`: `String`\
         * The panel's name.
         * - `options.error`: `String`\
         * An error message that you should specify if validation fails.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/add-custom-input-validation/ (linkStyle))
         * @see onValidateQuestion
         * @see onServerValidateQuestions
         */
        onValidatePanel: EventBase<SurveyModel>;
        /**
         * Use the event to change the default error text.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.text` - an error text.
         * - `options.error` - an instance of the `SurveyError` object.
         * - `options.obj` - an instance of Question, Panel or Survey object to where error is located.
         * - `options.name` - the error name. The following error names are available:
         * required, requireoneanswer, requirenumeric, exceedsize, webrequest, webrequestempty, otherempty,
         * uploadingfile, requiredinallrowserror, minrowcounterror, keyduplicationerror, custom
         */
        onErrorCustomText: EventBase<SurveyModel>;
        /**
         * Use the this event to be notified when the survey finished validate questions on the current page. It commonly happens when a user try to go to the next page or complete the survey
         * options.questions - the list of questions that have errors
         * options.errors - the list of errors
         * options.page - the page where question(s) are located
         */
        onValidatedErrorsOnCurrentPage: EventBase<SurveyModel>;
        /**
         * Use this event to modify the HTML content before rendering, for example `completeHtml` or `loadingHtml`.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.html` - an HTML that you may change before text processing and then rendering. specifies the modified HTML content.
         * @see completedHtml
         * @see loadingHtml
         * @see QuestionHtmlModel.html
         */
        onProcessHtml: EventBase<SurveyModel>;
        /**
         * Use this event to change the question title in code. If you want to remove question numbering then set showQuestionNumbers to "off".
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.title` - a calculated question title, based on question `title`, `name`.
         * - `options.question` - a question object.
         * @see showQuestionNumbers
         * @see requiredText
         */
        onGetQuestionTitle: EventBase<SurveyModel>;
        /**
         * Use this event to change the element title tag name that renders by default.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.element` - an element (question, panel, page and survey) that SurveyJS is going to render.
         * - `options.tagName` - an element title tagName that are used to render a title. You can change it from the default value.
         * @see showQuestionNumbers
         * @see requiredText
         */
        onGetTitleTagName: EventBase<SurveyModel>;
        /**
         * Use this event to change the question no in code. If you want to remove question numbering then set showQuestionNumbers to "off".
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.no` - a calculated question no, based on question `visibleIndex`, survey `.questionStartIndex` properties. You can change it.
         * - `options.question` - a question object.
         * @see showQuestionNumbers
         * @see questionStartIndex
         */
        onGetQuestionNo: EventBase<SurveyModel>;
        /**
         * Use this event to change the progress text in code.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.text` - a progress text, that SurveyJS will render in progress bar.
         * - `options.questionCount` - a number of questions that have input(s). We do not count html or expression questions
         * - `options.answeredQuestionCount` - a number of questions that have input(s) and an user has answered.
         * - `options.requiredQuestionCount` - a number of required questions that have input(s). We do not count html or expression questions
         * - `options.requiredAnsweredQuestionCount` - a number of required questions that have input(s) and an user has answered.
         *  @see progressBarType
         */
        onProgressText: EventBase<SurveyModel>;
        /**
         * Use this event to process the markdown text.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
         * - `options.name` - a property name is going to be rendered.
         * - `options.text` - a text that is going to be rendered.
         * - `options.html` - an HTML content. It is `null` by default. Use this property to specify the HTML content rendered instead of `options.text`.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/edit-survey-questions-markdown/ (linkStyle))
         */
        onTextMarkdown: EventBase<SurveyModel>;
        /**
         * Use this event to specity render component name used for text rendering.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
         * - `options.name` - a property name is going to be rendered.
         * - `options.renderAs` - a component name used for text rendering.
         */
        onTextRenderAs: EventBase<SurveyModel>;
        /**
         * The event fires when it gets response from the [api.surveyjs.io](https://api.surveyjs.io) service on saving survey results. Use it to find out if the results have been saved successfully.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.success` - it is `true` if the results has been sent to the service successfully.
         * - `options.response` - a response from the service.
         */
        onSendResult: EventBase<SurveyModel>;
        /**
         * Use it to get results after calling the `getResult` method. It returns a simple analytics from [api.surveyjs.io](https://api.surveyjs.io) service.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.success` - it is `true` if the results were got from the service successfully.
         * - `options.data` - the object `{AnswersCount, QuestionResult : {} }`. `AnswersCount` is the number of posted survey results. `QuestionResult` is an object with all possible unique answers to the question and number of these answers.
         * - `options.dataList` - an array of objects `{name, value}`, where `name` is a unique value/answer to the question and `value` is a number/count of such answers.
         * - `options.response` - the server response.
         * @see getResult
         */
        onGetResult: EventBase<SurveyModel>;
        /**
         * An event that is raised on uploading the file in QuestionFile when `storeDataAsText` is set to `false`. Use this event to change the uploaded file name or to prevent a particular file from being uploaded.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - the file question instance.
         * - `options.name` - the question name.
         * - `options.files` - the Javascript File objects array to upload.
         * - `options.callback` - a callback function to get the file upload status and the updloaded file content.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/questiontype-file/ (linkStyle))
         * @see uploadFiles
         * @see QuestionFileModel.storeDataAsText
         * @see onDownloadFile
         * @see onClearFiles
         */
        onUploadFiles: EventBase<SurveyModel>;
        /**
         * An event that is raised on downloading a file in QuestionFile. Use this event to pass the file to a preview.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `question` - the question instance.
         * - `options.name` - the question name.
         * - `options.content` - the file content.
         * - `options.fileValue` - single file question value.
         * - `options.callback` - a callback function to get the file downloading status and the downloaded file content.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/questiontype-file/ (linkStyle))
         * @see downloadFile
         * @see onClearFiles
         * @see onUploadFiles
         */
        onDownloadFile: EventBase<SurveyModel>;
        /**
         * This event is fired on clearing the value in a QuestionFile. Use this event to remove files stored on your server.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `question` - the question instance.
         * - `options.name` - the question name.
         * - `options.value` - the question value.
         * - `options.fileName` - a removed file's name, set it to `null` to clear all files.
         * - `options.callback` - a callback function to get the operation status.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/file-delayed-upload/ (linkStyle))
         * @see clearFiles
         * @see onDownloadFile
         * @see onUploadFiles
         */
        onClearFiles: EventBase<SurveyModel>;
        /**
         * An event that is raised after choices for radiogroup, checkbox, and dropdown has been loaded from a RESTful service and before they are assigned to a question.
         * You may change the choices, before they are assigned or disable/enabled make visible/invisible question, based on loaded results.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `question` - the question where loaded choices are going to be assigned.
         * - `choices` - the loaded choices. You can change the loaded choices to before they are assigned to question.
         * - `serverResult` - a result that comes from the server as it is.
         */
        onLoadChoicesFromServer: EventBase<SurveyModel>;
        /**
         * An event that is raised after survey is loaded from api.surveyjs.io service.
         * You can use this event to perform manipulation with the survey model after it was loaded from the web service.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * @see surveyId
         * @see loadSurveyFromService
         */
        onLoadedSurveyFromService: EventBase<SurveyModel>;
        /**
         * An event that is raised on processing the text when it finds a text in brackets: `{somevalue}`. By default, it uses the value of survey question values and variables.
         * For example, you may use the text processing in loading choices from the web. If your `choicesByUrl.url` equals to "UrlToServiceToGetAllCities/{country}/{state}",
         * you may set on this event `options.value` to "all" or empty string when the "state" value/question is non selected by a user.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.name` - the name of the processing value, for example, "state" in our example.
         * - `options.value` - the value of the processing text.
         * - `options.isExists` - a boolean value. Set it to `true` if you want to use the value and set it to `false` if you don't.
         */
        onProcessTextValue: EventBase<SurveyModel>;
        /**
         * An event that is raised before rendering a question. Use it to override the default question CSS classes.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a question for which you can change the CSS classes.
         * - `options.cssClasses` - an object with CSS classes. For example `{root: "table", button: "button"}`. You can change them to your own CSS classes.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-cssclasses/ (linkStyle))
         */
        onUpdateQuestionCssClasses: EventBase<SurveyModel>;
        /**
         * An event that is raised before rendering a panel. Use it to override the default panel CSS classes.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.panel` - a panel for which you can change the CSS classes.
         * - `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
         */
        onUpdatePanelCssClasses: EventBase<SurveyModel>;
        /**
         * An event that is raised before rendering a page. Use it to override the default page CSS classes.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.page` - a page for which you can change the CSS classes.
         * - `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
         */
        onUpdatePageCssClasses: EventBase<SurveyModel>;
        /**
         * An event that is raised before rendering a choice item in radiogroup, checkbox or dropdown questions. Use it to override the default choice item css.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a question where choice item is rendered.
         * - `options.item` - a choice item of ItemValue type. You can get value or text choice properties as options.item.value or options.choice.text
         * - `options.css` - a string with css classes divided by space. You can change it.
         */
        onUpdateChoiceItemCss: EventBase<SurveyModel>;
        /**
         * An event that is raised right after survey is rendered in DOM.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.htmlElement` - a root HTML element bound to the survey object.
         */
        onAfterRenderSurvey: EventBase<SurveyModel>;
        /**
         * An event that is raised right after a page is rendered in DOM. Use it to modify HTML elements.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.htmlElement` - an HTML element bound to the survey header object.
         */
        onAfterRenderHeader: EventBase<SurveyModel>;
        /**
         * An event that is raised right after a page is rendered in DOM. Use it to modify HTML elements.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.page` - a page object for which the event is fired. Typically the current/active page.
         * - `options.htmlElement` - an HTML element bound to the page object.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-afterrender/ (linkStyle))
         */
        onAfterRenderPage: EventBase<SurveyModel>;
        /**
         * An event that is raised right after a question is rendered in DOM. Use it to modify HTML elements.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a question object for which the event is fired.
         * - `options.htmlElement` - an HTML element bound to the question object.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-afterrender/ (linkStyle))
         */
        onAfterRenderQuestion: EventBase<SurveyModel>;
        /**
         * An event that is raised right after a non-composite question (text, comment, dropdown, radiogroup, checkbox) is rendered in DOM. Use it to modify HTML elements.
         * This event is not fired for matrices, panels, multiple text and image picker.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a question object for which the event is fired.
         * - `options.htmlElement` - an HTML element bound to the question object.
         */
        onAfterRenderQuestionInput: EventBase<SurveyModel>;
        /**
         * An event that is raised right after a panel is rendered in DOM. Use it to modify HTML elements.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.panel` - a panel object for which the event is fired
         * - `options.htmlElement` - an HTML element bound to the panel object
         */
        onAfterRenderPanel: EventBase<SurveyModel>;
        /**
         * The event occurs when an element within a question gets focus.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - A [question](https://surveyjs.io/Documentation/Library?id=Question) whose child element gets focus.
         * @see onFocusInPanel
         */
        onFocusInQuestion: EventBase<SurveyModel>;
        /**
         * The event occurs when an element within a panel gets focus.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.panel` - A [panel](https://surveyjs.io/Documentation/Library?id=PanelModelBase) whose child element gets focus.
         * @see onFocusInQuestion
         */
        onFocusInPanel: EventBase<SurveyModel>;
        /**
         * Use this event to change the visibility of an individual choice item in [Checkbox](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel), [Dropdown](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel), [Radiogroup](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel), and other similar question types.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`\
         * A Question instance to which the choice item belongs.
         * - `options.item`\
         * The choice item as specified in the [choices](https://surveyjs.io/Documentation/Library?id=QuestionSelectBase#choices) array.
         * - `options.visible`\
         * A Boolean value that specifies item visibility. Set it to `false` to hide the item.
         */
        onShowingChoiceItem: EventBase<SurveyModel>;
        /**
         * Use this event to load choice items in [Dropdown](https://surveyjs.io/form-library/documentation/questiondropdownmodel) and [Tag Box](https://surveyjs.io/form-library/documentation/questiontagboxmodel) questions on demand.
         *
         * This event is raised only for those questions that have the [`choicesLazyLoadEnabled`](https://surveyjs.io/form-library/documentation/questiondropdownmodel#choicesLazyLoadEnabled) property set to `true`.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`\
         * A Question instance for which the event is raised.
         * - `options.skip`: `Number`\
         * The number of choice items to skip.
         * - `options.take`: `Number`\
         * The number of choice items to load. You can use the question's [`choicesLazyLoadPageSize`](https://surveyjs.io/form-library/documentation/questiondropdownmodel#choicesLazyLoadPageSize) property to change this number.
         * - `options.filter`\
         * A search string used to filter choices.
         * - `options.setItems(items: Array<any>, totalCount: Number)`\
         * A method that you should call to assign loaded items to the question. Item objects should be structured as specified in the [`choices`](https://surveyjs.io/form-library/documentation/api-reference/dropdown-menu-model#choices) property description. If their structure is different, [map their properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to bring them to the required structure.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/lazy-loading-dropdown/ (linkStyle))
         */
        onChoicesLazyLoad: EventBase<SurveyModel>;
        /**
         * Use this event to load a display text for the [default choice item](https://surveyjs.io/form-library/documentation/questiondropdownmodel#defaultValue) in [Dropdown](https://surveyjs.io/form-library/documentation/questiondropdownmodel) and [Tag Box](https://surveyjs.io/form-library/documentation/questiontagboxmodel) questions.
         *
         * If you load choices from a server (use [`choicesByUrl`](https://surveyjs.io/form-library/documentation/questiondropdownmodel#choicesByUrl) or [`onChoicesLazyLoad`](https://surveyjs.io/form-library/documentation/surveymodel#onChoicesLazyLoad)), display texts become available only when data is loaded, which does not happen until a user opens the drop-down menu. However, a display text for a default choice item is required before that. In this case, you can load data individually for the default item within the `onGetChoiceDisplayValue` event handler.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`\
         * A Question instance for which the event is raised.
         * - `options.values`\
         * An array of one (in Dropdown) or more (in Tag Box) default values.
         * - `options.setItems(displayValues: Array<string>)`\
         * A method that you should call to assign display texts to the question.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/lazy-loading-dropdown/ (linkStyle))
         */
        onGetChoiceDisplayValue: EventBase<SurveyModel>;
        /**
         * An event that is raised on adding a new row in Matrix Dynamic question.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a matrix question.
         * - `options.row` - a new added row.
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDynamicModel.visibleRows
         */
        onMatrixRowAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised before adding a new row in Matrix Dynamic question.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a matrix question.
         * - `options.canAddRow` - specifies whether a new row can be added
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDynamicModel.visibleRows
         */
        onMatrixBeforeRowAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised before removing a row from Matrix Dynamic question. You can disable removing and clear the data instead.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a matrix question.
         * - `options.rowIndex` - a row index.
         * - `options.row` - a row object.
         * - `options.allow` - a boolean property. Set it to `false` to disable the row removing.
         * @see QuestionMatrixDynamicModel
         * @see onMatrixRowRemoved
         * @see onMatrixAllowRemoveRow
         */
        onMatrixRowRemoving: EventBase<SurveyModel>;
        /**
         * An event that is raised on removing a row from Matrix Dynamic question.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a matrix question
         * - `options.rowIndex` - a removed row index
         * - `options.row` - a removed row object
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDynamicModel.visibleRows
         * @see onMatrixRowRemoving
         * @see onMatrixAllowRemoveRow
         */
        onMatrixRowRemoved: EventBase<SurveyModel>;
        /**
         * An event that is raised before rendering "Remove" button for removing a row from Matrix Dynamic question.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a matrix question.
         * - `options.rowIndex` - a row index.
         * - `options.row` - a row object.
         * - `options.allow` - a boolean property. Set it to `false` to disable the row removing.
         * @see QuestionMatrixDynamicModel
         * @see onMatrixRowRemoving
         * @see onMatrixRowRemoved
         */
        onMatrixAllowRemoveRow: EventBase<SurveyModel>;
        /**
         * An event that is raised before creating cell question in the matrix. You can change the cell question type by setting different options.cellType.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - the matrix question.
         * - `options.cellType` - the cell question type. You can change it.
         * - `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
         * - `options.column` - the matrix column object.
         * - `options.columnName` - the matrix column name.
         * - `options.row` - the matrix row object.
         * @see onMatrixBeforeRowAdded
         * @see onMatrixCellCreated
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDropdownModel
         */
        onMatrixCellCreating: EventBase<SurveyModel>;
        /**
          * An event that is raised for every cell created in Matrix Dynamic and Matrix Dropdown questions.
          * - `sender`: `SurveyModel` - A survey instance that raised the event.
          * - `options.question` - the matrix question.
          * - `options.cell` - the matrix cell.
          * - `options.cellQuestion` - the question/editor in the cell. You may customize it, change it's properties, like choices or visible.
          * - `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
          * - `options.column` - the matrix column object.
          * - `options.columnName` - the matrix column name.
          * - `options.row` - the matrix row object.
          * @see onMatrixBeforeRowAdded
          * @see onMatrixCellCreating
          * @see onMatrixRowAdded
          * @see QuestionMatrixDynamicModel
          * @see QuestionMatrixDropdownModel
          */
        onMatrixCellCreated: EventBase<SurveyModel>;
        /**
         * An event that is raised for every cell after is has been rendered in DOM.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - the matrix question.
         * - `options.cell` - the matrix cell.
         * - `options.cellQuestion` - the question/editor in the cell.
         * - `options.htmlElement` - an HTML element bound to the `cellQuestion` object.
         * - `options.column` - the matrix column object.
         * - `options.row` - the matrix row object.
         * @see onMatrixCellCreated
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDropdownModel
         */
        onMatrixAfterCellRender: EventBase<SurveyModel>;
        /**
         * An event that is raised when cell value is changed in Matrix Dynamic and Matrix Dropdown questions.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - the matrix question.
         * - `options.columnName` - the matrix column name.
         * - `options.value` - a new value.
         * - `options.row` - the matrix row object.
         * - `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
         * @see onMatrixCellValueChanging
         * @see onMatrixBeforeRowAdded
         * @see onMatrixRowAdded
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDropdownModel
         */
        onMatrixCellValueChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised on changing cell value in Matrix Dynamic and Matrix Dropdown questions. You may change the `options.value` property to change a cell value.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - the matrix question.
         * - `options.columnName` - the matrix column name.
         * - `options.value` - a new value.
         * - `options.oldValue` - the old value.
         * - `options.row` - the matrix row object.
         * - `options.getCellQuestion(columnName)` - the function that returns a cell question by column name.
         * @see onMatrixCellValueChanged
         * @see onMatrixBeforeRowAdded
         * @see onMatrixRowAdded
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDropdownModel
         */
        onMatrixCellValueChanging: EventBase<SurveyModel>;
        /**
         * An event that is raised when Matrix Dynamic and Matrix Dropdown questions validate the cell value.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.error` - an error string. It is empty by default.
         * - `options.question` - the matrix question.
         * - `options.columnName` - the matrix column name.
         * - `options.value` - a cell value.
         * - `options.row` - the matrix row object.
         * - `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
         * @see onMatrixBeforeRowAdded
         * @see onMatrixRowAdded
         * @see QuestionMatrixDynamicModel
         * @see QuestionMatrixDropdownModel
         */
        onMatrixCellValidate: EventBase<SurveyModel>;
        /**
         * An event that is raised after a new panel is added to a [Dynamic Panel](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/) question.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`QuestionPanelDynamicModel`](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model)\
         * A Dynamic Panel question.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * An added panel.
         * - `options.panelIndex`: `Number`\
         * The panel's index within Dynamic Panel.
         */
        onDynamicPanelAdded: EventBase<SurveyModel>;
        /**
         * An event that is raised after a panel is deleted from a [Dynamic Panel](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/) question.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`QuestionPanelDynamicModel`](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model)\
         * A Dynamic Panel question.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A deleted panel.
         * - `options.panelIndex`: `Number`\
         * The panel's index within Dynamic Panel.
         */
        onDynamicPanelRemoved: EventBase<SurveyModel>;
        /**
         * An event that is raised before a panel is deleted from a [Dynamic Panel](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/) question. Use this event to cancel the deletion.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`QuestionPanelDynamicModel`](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model)\
         * A Dynamic Panel question.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A panel to be deleted.
         * - `options.panelIndex`: `Number`\
         * The panel's index within Dynamic Panel.
         * - `options.allow`: `Boolean`\
         * Set this property to `false` if you want to cancel the panel deletion.
         */
        onDynamicPanelRemoving: EventBase<SurveyModel>;
        /**
        * An event that is raised every second if the method `startTimer` has been called.
        * @see startTimer
        * @see timeSpent
        * @see Page.timeSpent
        */
        onTimer: EventBase<SurveyModel>;
        /**
         * An event that is raised before displaying a new information in the Timer Panel. Use it to change the default text.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.text` - the timer panel info text.
         */
        onTimerPanelInfoText: EventBase<SurveyModel>;
        /**
         * An event that is raised after an item value is changed in a panel within a [Dynamic Panel](https://surveyjs.io/form-library/examples/questiontype-paneldynamic/) question.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.question`: [`QuestionPanelDynamicModel`](https://surveyjs.io/form-library/documentation/api-reference/dynamic-panel-model)\
         * A Dynamic Panel question.
         * - `options.panel`: [`PanelModel`](https://surveyjs.io/form-library/documentation/api-reference/panel-model)\
         * A panel that nests the item with a changed value.
         * - `options.name`: `String`\
         * The item's name.
         * - `options.value`: `any`\
         * The item's new value.
         * - `options.panelIndex`: `Number`\
         * The panel's index within Dynamic Panel.
         * - `options.panelData`: `Object`\
         * The panel's data object that includes all item values.
         */
        onDynamicPanelItemValueChanged: EventBase<SurveyModel>;
        /**
         * Use this event to define, whether an answer to a question is correct or not.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - a question on which you have to decide if the answer is correct or not.
         * - `options.result` - returns `true`, if an answer is correct, or `false`, if the answer is not correct. Use questions' `value` and `correctAnswer` properties to return the correct value.
         * - `options.correctAnswers` - you may change the default number of correct or incorrect answers in the question, for example for matrix, where each row is a quiz question.
         * @see Question.value
         * @see Question.correctAnswer
         */
        onIsAnswerCorrect: EventBase<SurveyModel>;
        /**
         * Use this event to control drag&drop operations during design mode.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.allow` - set it to `false` to disable dragging.
         * - `options.target` - a target element that is dragged.
         * - `options.source` - a source element. It can be `null`, if it is a new element, dragging from toolbox.
         * - `options.parent` - a page or panel where target element is dragging.
         * - `options.insertBefore` - an element before the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging an element after the last element in a container.
         * - `options.insertAfter` - an element after the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging element to the first position within the parent container.
         * @see setDesignMode
         * @see isDesignMode
         */
        onDragDropAllow: EventBase<SurveyModel>;
        /**
         * Use this event to control scrolling element to top. You can cancel the default behavior by setting options.cancel property to true.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.element` - an element that is going to be scrolled on top.
         * - `options.question` - a question that is going to be scrolled on top. It can be null if options.page is not null.
         * - `options.page` - a page that is going to be scrolled on top. It can be null if options.question is not null.
         * - `options.elementId` - the unique element DOM Id.
         * - `options.cancel` - set this property to true to cancel the default scrolling.
         */
        onScrollingElementToTop: EventBase<SurveyModel>;
        onLocaleChangedEvent: EventBase<SurveyModel>;
        /**
         * Use this event to create/customize actions to be displayed in a question's title.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - A [Question](https://surveyjs.io/Documentation/Library?id=Question) object for which the event is fired.
         * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed question.
         * @see IAction
         * @see Question
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-titleactions/ (linkStyle))
         */
        onGetQuestionTitleActions: EventBase<SurveyModel>;
        /**
         * Use this event to create/customize actions to be displayed in a panel's title.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.panel` - A panel ([PanelModel](https://surveyjs.io/Documentation/Library?id=panelmodel) object) for which the event is fired.
         * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed panel.
         * @see IAction
         * @see PanelModel
         */
        onGetPanelTitleActions: EventBase<SurveyModel>;
        /**
         * Use this event to create/customize actions to be displayed in a page's title.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.page` - A page ([PageModel](https://surveyjs.io/Documentation/Library?id=pagemodel) object) for which the event is fired.
         * - `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed page.
         * @see IAction
         * @see PageModel
         */
        onGetPageTitleActions: EventBase<SurveyModel>;
        /**
         * An event that allows you to add, delete, or modify actions in the footer of a [Panel](https://surveyjs.io/form-library/documentation/panelmodel).
         *
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.panel` - A Panel whose actions are being modified.
         * - `options.actions` - An array of panel [actions](https://surveyjs.io/form-library/documentation/iaction). You can modify the entire array or individual actions within it.
         * - `options.question` - A [Dynamic Panel](https://surveyjs.io/form-library/documentation/questionpaneldynamicmodel) to which the Panel belongs. This field is `undefined` if the Panel does not belong to any Dynamic Panel.
         */
        onGetPanelFooterActions: EventBase<SurveyModel>;
        /**
         * Use this event to create/customize actions to be displayed in a matrix question's row.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - A matrix question ([QuestionMatrixBaseModel](https://surveyjs.io/Documentation/Library?id=questionmatrixbasemodel) object) for which the event is fired.
         * - `options.row` - A matrix row for which the event is fired.
         * - `options.actions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed matrix question and row.
         * @see IAction
         * @see QuestionMatrixDropdownModelBase
         */
        onGetMatrixRowActions: EventBase<SurveyModel>;
        /**
         * An event that is raised after the survey element content was collapsed or expanded.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.element` - Specifies which survey element content was collapsed or expanded.
         * @see onElementContentVisibilityChanged
         */
        onElementContentVisibilityChanged: EventBase<SurveyModel>;
        /**
         * An event that is raised before expression question convert it's value into display value for rendering.
         * - `sender`: `SurveyModel` - A survey instance that raised the event.
         * - `options.question` - The expression question.
         * - `options.value` - The question value.
         * - `options.displayValue` - the display value that you can change before rendering.
         */
        onGetExpressionDisplayValue: EventBase<SurveyModel>;
        constructor(jsonObj?: any, renderedElement?: any);
        private createHtmlLocString;
        /**
         * The list of errors on loading survey JSON. If the list is empty after loading a JSON, then the JSON is correct and has no errors.
         * @see JsonError
         */
        jsonErrors: Array<JsonError>;
        getType(): string;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        /**
         * Returns a list of all pages in the survey, including invisible pages.
         * @see PageModel
         * @see visiblePages
         */
        get pages(): Array<PageModel>;
        renderCallback: () => void;
        render(element?: any): void;
        updateSurvey(newProps: any, oldProps?: any): void;
        getCss(): any;
        private cssValue;
        private updateCompletedPageCss;
        private updateCss;
        get css(): any;
        set css(value: any);
        setCss(value: any, needMerge?: boolean): void;
        get cssTitle(): string;
        get cssNavigationComplete(): string;
        get cssNavigationPreview(): string;
        get cssNavigationEdit(): string;
        get cssNavigationPrev(): string;
        get cssNavigationStart(): string;
        get cssNavigationNext(): string;
        private get cssSurveyNavigationButton();
        get bodyCss(): string;
        completedCss: string;
        containerCss: string;
        private getNavigationCss;
        private lazyRenderingValue;
        showBrandInfo: boolean;
        /**
         * By default all rows are rendered no matters if they are visible or not.
         * Set it true, and survey markup rows will be rendered only if they are visible in viewport.
         * This feature is experimantal and might do not support all the use cases.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-lazy/ (linkStyle))
         */
        get lazyRendering(): boolean;
        set lazyRendering(val: boolean);
        get isLazyRendering(): boolean;
        private updateLazyRenderingRowsOnRemovingElements;
        /**
         * Gets or sets a list of triggers in the survey.
         * @see SurveyTrigger
         */
        get triggers(): Array<SurveyTrigger>;
        set triggers(val: Array<SurveyTrigger>);
        /**
         * Gets or sets a list of calculated values in the survey.
         * @see CalculatedValue
         *
         * For more information, refer to [Calculated Values](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#calculated-values).
         *
         */
        get calculatedValues(): Array<CalculatedValue>;
        set calculatedValues(val: Array<CalculatedValue>);
        /**
         * Gets or sets an identifier of a survey model loaded from the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey JSON is automatically loaded from [api.surveyjs.io](https://api.surveyjs.io) service.
         * @see loadSurveyFromService
         * @see onLoadedSurveyFromService
         */
        get surveyId(): string;
        set surveyId(val: string);
        /**
         * Gets or sets an identifier of a survey model saved to the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey data is automatically saved to the [api.surveyjs.io](https://api.surveyjs.io) service.
         * @see onComplete
         * @see surveyShowDataSaving
         */
        get surveyPostId(): string;
        set surveyPostId(val: string);
        /**
         * Gets or sets user's identifier (e.g., e-mail or unique customer id) in your web application.
         * If you load survey or post survey results from/to [api.surveyjs.io](https://api.surveyjs.io) service, then the library do not allow users to run the same survey the second time.
         * On the second run, the user will see the survey complete page.
         */
        get clientId(): string;
        set clientId(val: string);
        /**
         * Gets or sets a cookie name used to save information about completing the survey.
         * If the property is not empty, before starting the survey, the Survey library checks if the cookie with this name exists.
         * If it is `true`, the survey goes to complete mode and a user sees the survey complete page. On completing the survey the cookie with this name is created.
         */
        get cookieName(): string;
        set cookieName(val: string);
        /**
         * Specifies whether to save survey results when respondents swtich between pages. Handle the [`onPartialSend`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onPartialSend) event to implement the save operation.
         *
         * Refer to the following help topic for more information on the use case: [Continue an Incomplete Survey](https://surveyjs.io/form-library/documentation/handle-survey-results-continue-incomplete).
         */
        get sendResultOnPageNext(): boolean;
        set sendResultOnPageNext(val: boolean);
        /**
         * Gets or sets whether to show the progress on saving/sending data into the [api.surveyjs.io](https://api.surveyjs.io) service.
         * @see surveyPostId
         */
        get surveyShowDataSaving(): boolean;
        set surveyShowDataSaving(val: boolean);
        /**
         * Gets or sets whether the first input is focused on showing a next or a previous page.
         */
        get focusFirstQuestionAutomatic(): boolean;
        set focusFirstQuestionAutomatic(val: boolean);
        /**
         * Gets or sets whether the first input is focused if the current page has errors.
         * Set this property to `false` (the default value is `true`) if you do not want to bring the focus to the first question that has error on the page.
         */
        get focusOnFirstError(): boolean;
        set focusOnFirstError(val: boolean);
        /**
         * Gets or sets the navigation buttons position.
         * Possible values: 'bottom' (default), 'top', 'both' and 'none'. Set it to 'none' to hide 'Prev', 'Next' and 'Complete' buttons.
         * It makes sense if you are going to create a custom navigation, have only a single page, or the `goNextPageAutomatic` property is set to `true`.
         * @see goNextPageAutomatic
         * @see showPrevButton
         */
        get showNavigationButtons(): string | any;
        set showNavigationButtons(val: string | any);
        /**
         * Gets or sets whether the Survey displays "Prev" button in its pages. Set it to `false` to prevent end-users from going back to their answers.
         * @see showNavigationButtons
         */
        get showPrevButton(): boolean;
        set showPrevButton(val: boolean);
        /**
         * Gets or sets whether the Survey displays survey title in its pages. Set it to `false` to hide a survey title.
         * @see title
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get showTitle(): boolean;
        set showTitle(val: boolean);
        /**
         * Gets or sets whether the Survey displays page titles. Set it to `false` to hide page titles.
         * @see PageModel.title
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get showPageTitles(): boolean;
        set showPageTitles(val: boolean);
        /**
         * On finishing the survey the complete page is shown. Set the property to `false`, to hide the complete page.
         * @see data
         * @see onComplete
         * @see navigateToUrl
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get showCompletedPage(): boolean;
        set showCompletedPage(val: boolean);
        /**
         * A URL to which respondents should be navigated after survey completion.
         * @see onNavigateToUrl
         * @see navigateToUrlOnCondition
         */
        get navigateToUrl(): string;
        set navigateToUrl(val: string);
        /**
         * An array of objects that allows you to navigate respondents to different URLs after survey completion.
         *
         * Each object should include the [`expression`](https://surveyjs.io/form-library/documentation/api-reference/urlconditionitem#url) and [`url`](https://surveyjs.io/form-library/documentation/api-reference/urlconditionitem#expression) properties. When `expression` evaluates to `true`, the survey navigates to the corresponding `url`. Refer to the following help topic for more information about expressions: [Expressions](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#expressions).
         * @see onNavigateToUrl
         * @see navigateToUrl
         */
        get navigateToUrlOnCondition(): Array<UrlConditionItem>;
        set navigateToUrlOnCondition(val: Array<UrlConditionItem>);
        getNavigateToUrl(): string;
        private navigateTo;
        /**
         * Gets or sets the required question mark. The required question mark is a char or string that is rendered in the required questions' titles.
         * @see Question.title
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-processtext/ (linkStyle))
         */
        get requiredText(): string;
        set requiredText(val: string);
        /**
         * Gets or sets whether to hide all required errors.
         */
        hideRequiredErrors: boolean;
        beforeSettingQuestionErrors(question: IQuestion, errors: Array<SurveyError>): void;
        beforeSettingPanelErrors(question: IPanel, errors: Array<SurveyError>): void;
        private maakeRequiredErrorsInvisibgle;
        /**
         * Gets or sets the first question index. The first question index is '1' by default. You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
         * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
         * @see Question.title
         * @see requiredText
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-processtext/ (linkStyle))
         */
        get questionStartIndex(): string;
        set questionStartIndex(val: string);
        /**
         * Gets or sets whether the "Others" option text is stored as question comment.
         *
         * By default the entered text in the "Others" input in the checkbox/radiogroup/dropdown is stored as `"question name " + "-Comment"`. The value itself is `"question name": "others"`.
         * Set this property to `false`, to store the entered text directly in the `"question name"` key.
         * @see commentSuffix
         */
        get storeOthersAsComment(): boolean;
        set storeOthersAsComment(val: boolean);
        /**
         * Specifies the default maximum length for questions like text and comment, including matrix cell questions.
         *
         * The default value is `0`, that means that the text and comment have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
         * @see maxOthersLength
         */
        get maxTextLength(): number;
        set maxTextLength(val: number);
        /**
         * Gets or sets the default maximum length for question comments and others
         *
         * The default value is `0`, that means that the question comments have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
         * @see Question.showCommentArea
         * @see Question.showOtherItem
         * @see maxTextLength
         */
        get maxOthersLength(): number;
        set maxOthersLength(val: number);
        /**
         * Gets or ses whether user proceeds to the next page without pressing the "Next" button after answering all page questions.
         * The available options:
         *
         * - `true` - navigate to the next page and submit survey data automatically.
         * - `autogonext` - navigate to the next page automatically but do not submit survey data.
         * - `false` - do not navigate to the next page and do not submit survey data automatically.
         *
         * > If any of the following questions is answered last, the survey won't be switched to the next page: Checkbox, Boolean (rendered as Checkbox), Comment, Signature Pad, Image Picker (with Multi Select), File, Single-Choice Matrix (not all rows are answered), Dynamic Matrix, Panel Dynamic.
         *
         * @see showNavigationButtons
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-autonextpage/ (linkStyle))
         */
        get goNextPageAutomatic(): boolean | "autogonext";
        set goNextPageAutomatic(val: boolean | "autogonext");
        /**
         * Gets or sets whether a survey is automatically completed when `goNextPageAutomatic = true`. Set it to `false` if you do not want to submit survey automatically on completing the last survey page.
         * @see goNextPageAutomatic
         */
        get allowCompleteSurveyAutomatic(): boolean;
        set allowCompleteSurveyAutomatic(val: boolean);
        /**
         * Gets or sets a value that specifies how the survey validates the question answers.
         *
         * The following options are available:
         *
         * - `onNextPage` (default) - check errors on navigating to the next page or on completing the survey.
         * - `onValueChanged` - check errors on every question value (i.e., answer) changing.
         * - `onValueChanging` - check errors before setting value into survey. If there is an error, then survey data is not changed, but question value will be keeped.
         * - `onComplete` - to validate all visible questions on complete button click. If there are errors on previous pages, then the page with the first error becomes the current.
         */
        get checkErrorsMode(): string;
        set checkErrorsMode(val: string);
        /**
         * Specifies whether the text area of [comment](https://surveyjs.io/Documentation/Library?id=questioncommentmodel) questions/elements automatically expands its height to avoid the vertical scrollbar and to display the entire multi-line contents entered by respondents.
         * Default value is false.
         * @see QuestionCommentModel.autoGrow
         */
        get autoGrowComment(): boolean;
        set autoGrowComment(val: boolean);
        /**
         * Gets or sets a value that specifies how the survey updates its questions' text values.
         *
         * The following options are available:
         *
         * - `onBlur` (default) - the value is updated after an input loses the focus.
         * - `onTyping` - update the value of text questions, "text" and "comment", on every key press.
         *
         * Note, that setting to "onTyping" may lead to a performance degradation, in case you have many expressions in the survey.
         */
        get textUpdateMode(): string;
        set textUpdateMode(val: string);
        /**
         * Gets or sets a value that specifies how the invisible data is included in survey data.
         *
         * The following options are available:
         *
         * - `none` - include the invisible values into the survey data.
         * - `onHidden` - clear the question value when it becomes invisible. If a question has value and it was invisible initially then survey clears the value on completing.
         * - `onHiddenContainer` - clear the question value when it or its parent (page or panel) becomes invisible. If a question has value and it was invisible initially then survey clears the value on completing.
         * - `onComplete` (default) - clear invisible question values on survey complete. In this case, the invisible questions will not be stored on the server.
         * @see Question.visible
         * @see onComplete
         */
        get clearInvisibleValues(): any;
        set clearInvisibleValues(val: any);
        /**
         * Call this function to remove all question values from the survey, that end-user will not be able to enter.
         * For example the value that doesn't exists in a radiogroup/dropdown/checkbox choices or matrix rows/columns.
         * Please note, this function doesn't clear values for invisible questions or values that doesn't associated with questions.
         * In fact this function just call clearIncorrectValues function of all questions in the survey
         * @param removeNonExisingRootKeys - set this parameter to true to remove keys from survey.data that doesn't have corresponded questions and calculated values
         * @see Question.clearIncorrectValues
         * @see Page.clearIncorrectValues
         * @see Panel.clearIncorrectValues
         */
        clearIncorrectValues(removeNonExisingRootKeys?: boolean): void;
        private iscorrectValueWithPostPrefix;
        /**
         * Specifies whether to keep values that cannot be assigned to questions, for example, choices unlisted in the choices array.
         *
         * > This property cannot be specified in the survey JSON schema. Use dot notation to specify it.
         * @see clearIncorrectValues
         */
        get keepIncorrectValues(): boolean;
        set keepIncorrectValues(val: boolean);
        /**
         * Gets or sets the survey locale. The default value it is empty, this means the 'en' locale is used.
         * You can set it to 'de' - German, 'fr' - French and so on. The library has built-in localization for several languages. The library has a multi-language support as well.
         */
        get locale(): string;
        set locale(value: string);
        private onSurveyLocaleChanged;
        /**
         * Returns an array of locales that are used in the survey's translation.
         */
        getUsedLocales(): Array<string>;
        localeChanged(): void;
        getLocale(): string;
        locStrsChanged(): void;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): LocalizableString;
        getRendererForString(element: Base, name: string): string;
        getRendererContextForString(element: Base, locStr: LocalizableString): LocalizableString;
        getExpressionDisplayValue(question: IQuestion, value: any, displayValue: string): string;
        private getBuiltInRendererForString;
        getProcessedText(text: string): string;
        getLocString(str: string): string;
        getErrorCustomText(text: string, error: SurveyError): string;
        getSurveyErrorCustomText(obj: Base, text: string, error: SurveyError): string;
        /**
         * Returns the text displayed when a survey has no visible pages and questions.
         */
        get emptySurveyText(): string;
        /**
         * Gets or sets a survey logo.
         * @see title
         */
        get logo(): string;
        set logo(value: string);
        get locLogo(): LocalizableString;
        /**
         * Gets or sets a survey logo width.
         * @see logo
         */
        get logoWidth(): any;
        set logoWidth(value: any);
        /**
         * Gets or sets a survey logo height.
         * @see logo
         */
        get logoHeight(): any;
        set logoHeight(value: any);
        /**
         * Gets or sets a survey logo position.
         * @see logo
         */
        get logoPosition(): string;
        set logoPosition(value: string);
        get hasLogo(): boolean;
        private updateHasLogo;
        get isLogoBefore(): boolean;
        get isLogoAfter(): boolean;
        get logoClassNames(): string;
        get renderedHasTitle(): boolean;
        get renderedHasDescription(): boolean;
        get hasTitle(): boolean;
        get renderedHasLogo(): boolean;
        get renderedHasHeader(): boolean;
        /**
         * The logo fit mode.
         * @see logo
         */
        get logoFit(): string;
        set logoFit(val: string);
        _isMobile: boolean;
        setIsMobile(newVal?: boolean): void;
        private get isMobile();
        protected isLogoImageChoosen(): string;
        get titleMaxWidth(): string;
        /**
         * Gets or sets the HTML content displayed on the complete page. Use this property to change the default complete page text.
         * @see showCompletedPage
         * @see completedHtmlOnCondition
         * @see locale
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get completedHtml(): string;
        set completedHtml(value: string);
        get locCompletedHtml(): LocalizableString;
        /**
         * The list of HTML condition items. If the expression of this item returns `true`, then a survey will use this item HTML instead of `completedHtml`.
         * @see HtmlConditionItem
         * @see completeHtml
         */
        get completedHtmlOnCondition(): Array<HtmlConditionItem>;
        set completedHtmlOnCondition(val: Array<HtmlConditionItem>);
        /**
         * Calculates a given expression and returns a result value.
         * @param expression
         */
        runExpression(expression: string): any;
        /**
         * Calculates a given expression and returns `true` or `false`.
         * @param expression
         */
        runCondition(expression: string): boolean;
        /**
         * Run all triggers that performs on value changed and not on moving to the next page.
         */
        runTriggers(): void;
        get renderedCompletedHtml(): string;
        private getExpressionItemOnRunCondition;
        /**
         * The HTML content displayed to an end user that has already completed the survey.
         * @see clientId
         * @see locale
         */
        get completedBeforeHtml(): string;
        set completedBeforeHtml(value: string);
        get locCompletedBeforeHtml(): LocalizableString;
        /**
         * The HTML that shows on loading survey Json from the [api.surveyjs.io](https://api.surveyjs.io) service.
         * @see surveyId
         * @see locale
         */
        get loadingHtml(): string;
        set loadingHtml(value: string);
        get locLoadingHtml(): LocalizableString;
        /**
         * Default value for loadingHtml property
         * @see loadingHtml
         */
        get defaultLoadingHtml(): string;
        get navigationBar(): ActionContainer;
        /**
         * Adds a custom navigation item similar to the Previous Page, Next Page, and Complete buttons.
         * Accepts an object described in the [IAction](https://surveyjs.io/Documentation/Library?id=IAction) help section.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-changenavigation/ (linkStyle))
        */
        addNavigationItem(val: IAction): Action;
        /**
         * Gets or sets the 'Start' button caption.
         * The 'Start' button is shown on the started page. Set the `firstPageIsStarted` property to `true`, to display the started page.
         * @see firstPageIsStarted
         * @see locale
         */
        get startSurveyText(): string;
        set startSurveyText(newValue: string);
        get locStartSurveyText(): LocalizableString;
        /**
         * Gets or sets the 'Prev' button caption.
         * @see locale
         */
        get pagePrevText(): string;
        set pagePrevText(newValue: string);
        get locPagePrevText(): LocalizableString;
        /**
         * Gets or sets the 'Next' button caption.
         * @see locale
         */
        get pageNextText(): string;
        set pageNextText(newValue: string);
        get locPageNextText(): LocalizableString;
        /**
         *  Gets or sets the 'Complete' button caption.
         * @see locale
         */
        get completeText(): string;
        set completeText(newValue: string);
        get locCompleteText(): LocalizableString;
        /**
         *  Gets or sets the 'Preview' button caption.
         * @see locale
         * @see showPreviewBeforeComplete
         * @see editText
         * @see showPreview
         */
        get previewText(): string;
        set previewText(newValue: string);
        get locPreviewText(): LocalizableString;
        /**
         *  Gets or sets the 'Edit' button caption.
         * @see locale
         * @see showPreviewBeforeComplete
         * @see previewText
         * @see cancelPreview
         */
        get editText(): string;
        set editText(newValue: string);
        get locEditText(): LocalizableString;
        getElementTitleTagName(element: Base, tagName: string): string;
        /**
         * Set the pattern for question title. Default is "numTitleRequire", 1. What is your name? *,
         * You can set it to numRequireTitle: 1. * What is your name?
         * You can set it to requireNumTitle: * 1. What is your name?
         * You can set it to numTitle (remove require symbol completely): 1. What is your name?
         * @see QuestionModel.title
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-processtext/ (linkStyle))
         */
        get questionTitlePattern(): string;
        set questionTitlePattern(val: string);
        getQuestionTitlePatternOptions(): Array<any>;
        get questionTitleTemplate(): string;
        set questionTitleTemplate(value: string);
        private getNewTitlePattern;
        private getNewQuestionTitleElement;
        get locQuestionTitleTemplate(): LocalizableString;
        getUpdatedQuestionTitle(question: IQuestion, title: string): string;
        getUpdatedQuestionNo(question: IQuestion, no: string): string;
        /**
         * Gets or sets whether the survey displays page numbers on pages titles.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get showPageNumbers(): boolean;
        set showPageNumbers(value: boolean);
        /**
         * Gets or sets a value that specifies how the question numbers are displayed.
         *
         * The following options are available:
         *
         * - `on` - display question numbers
         * - `onpage` - display question numbers, start numbering on every page
         * - `off` - turn off the numbering for questions titles
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-options/ (linkStyle))
         */
        get showQuestionNumbers(): string;
        set showQuestionNumbers(value: string | boolean);
        /**
         * Gets or sets the survey progress bar position.
         *
         * The following options are available:
         *
         * - `off` (default) - don't show progress bar
         * - `top` - show progress bar in the top
         * - `bottom` - show progress bar in the bottom
         * - `both` - show progress bar in both sides: top and bottom.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/navigation-default/ (linkStyle))
         */
        get showProgressBar(): string;
        set showProgressBar(newValue: string);
        /**
         * Gets or sets the type of info in the progress bar.
         *
         * The following options are available:
         *
         * - `pages` (default),
         * - `questions`,
         * - `requiredQuestions`,
         * - `correctQuestions`,
         * - `buttons`
         *
         * [View Demo](https://surveyjs.io/form-library/examples/navigation-buttons/ (linkStyle))
         */
        get progressBarType(): string;
        set progressBarType(newValue: string);
        get isShowProgressBarOnTop(): boolean;
        get isShowProgressBarOnBottom(): boolean;
        getProgressCssClasses(): string;
        private canShowProresBar;
        get processedTitle(): string;
        /**
         * Gets or sets question title location relative to the input field: `"top"`, `"bottom"`, or `"left"`.
         *
         * > Certain question types (Matrix, Multiple Text) do not support the `"left"` value. For them, the `"top"` value is used.
         *
         * You can override this setting if you specify the `questionTitleLocation` property for an [individual page](https://surveyjs.io/form-library/documentation/pagemodel#questionTitleLocation) or [panel](https://surveyjs.io/form-library/documentation/panelmodel#questionTitleLocation) or set the `titleLocation` property for a [specific question](https://surveyjs.io/form-library/documentation/question#titleLocation).
         */
        get questionTitleLocation(): string;
        set questionTitleLocation(value: string);
        updateElementCss(reNew?: boolean): void;
        /**
         * Gets or sets the error message position.
         *
         * The following options are available:
         *
         * - `top` - to show question error(s) over the question,
         * - `bottom` - to show question error(s) under the question.
         */
        get questionErrorLocation(): string;
        set questionErrorLocation(value: string);
        /**
         * Gets or sets the question description position. The default value is `underTitle`.
         *
         * The following options are available:
         *
         * - `underTitle` - show question description under the question title,
         * - `underInput` - show question description under the question input instead of question title.
         */
        get questionDescriptionLocation(): string;
        set questionDescriptionLocation(value: string);
        /**
         * Gets or sets the survey edit mode.
         *
         * The following options are available:
         *
         * - `edit` (default) - make a survey editable,
         * - `display` - make a survey read-only.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-displaymode/ (linkStyle))
         */
        get mode(): string;
        set mode(value: string);
        private onModeChanged;
        /**
         * Gets or sets an object with survey results. You can set this property with an object of the following structure:
         *
         * ```js
         * {
         *   question1Name: question1Value,
         *   question2Name: question2Value,
         *   // ...
         * }
         * ```
         *
         * When you set this property in code, the new object overrides the old object that may contain default question values and entered data. If you want to *merge* the new and old objects, call the [`mergeData(newDataObj)`](https://surveyjs.io/form-library/documentation/surveymodel#mergeData) method.
         *
         * If you assign a new object while a respondent takes the survey, set the [`currentPageNo`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#currentPageNo) property to 0 to start the survey from the beginning. This will also cause the survey to re-evaluate the [`visibleIf`](https://surveyjs.io/form-library/documentation/api-reference/question#visibleIf), [`enableIf`](https://surveyjs.io/form-library/documentation/api-reference/question#enableIf), and other [expressions](https://surveyjs.io/form-library/documentation/design-survey/conditional-logic#expressions).
         * @see setValue
         * @see getValue
         */
        get data(): any;
        set data(data: any);
        /**
         * Merges a specified data object with the object from the [`data`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#data) property.
         *
         * Refer to the following help topic for more information: [Merge Question Values](https://surveyjs.io/form-library/documentation/design-survey/merge-question-values).
         *
         * @param data A data object to merge. It should have the following structure: `{ questionName: questionValue, ... }`
         * @see setValue
         */
        mergeData(data: any): void;
        setDataCore(data: any): void;
        private onEditingObjPropertyChanged;
        get editingObj(): Base;
        set editingObj(val: Base);
        get isEditingSurveyElement(): boolean;
        private setCalculatedValuesIntoResult;
        getAllValues(): any;
        /**
         * Returns survey results as an array of objects in which the question name, title, value, and other parameters are stored as individual properties.
         *
         * If a question can have more than one value (Matrix, Multiple Text), its object enables the `isNode` flag and stores information about these values in the `data` property. Refer to the following help topic for more information: [Access Full Survey Results](https://surveyjs.io/form-library/documentation/handle-survey-results-access#access-full-survey-results).
         *
         * If you want to skip empty answers, pass an object with the `includeEmpty` property set to `false`.
         */
        getPlainData(options?: {
            includeEmpty?: boolean;
            includeQuestionTypes?: boolean;
            includeValues?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): Array<IQuestionPlainData>;
        getFilteredValues(): any;
        private addCalculatedValuesIntoFilteredValues;
        getFilteredProperties(): any;
        private getValuesKeys;
        getDataValueCore(valuesHash: any, key: string): any;
        setDataValueCore(valuesHash: any, key: string, value: any): void;
        deleteDataValueCore(valuesHash: any, key: string): void;
        valueHashGetDataCallback: (valuesHash: any, key: string) => any;
        valueHashSetDataCallback: (valuesHash: any, key: string, value: any) => void;
        valueHashDeleteDataCallback: (valuesHash: any, key: string) => void;
        private getDataFromValueHash;
        private setDataToValueHash;
        private deleteDataFromValueHash;
        /**
         * Returns all comments from the data.
         * @see data
         */
        get comments(): any;
        /**
         * Returns a list of visible pages. If all pages are visible, then this property returns the same list as the `pages` property.
         * @see pages
         * @see PageModel.visible
         * @see PageModel.visibleIf
         */
        get visiblePages(): Array<PageModel>;
        private isPageInVisibleList;
        /**
         * Returns `true` if the survey contains no pages. The survey is empty.
         */
        get isEmpty(): boolean;
        get PageCount(): number;
        /**
         * Returns the survey page count.
         * @see visiblePageCount
         * @see pages
         */
        get pageCount(): number;
        /**
         * Returns a number of visible pages within the survey.
         * @see pageCount
         * @see visiblePages
         */
        get visiblePageCount(): number;
        /**
         * Returns the started page. This property works if the `firstPageIsStarted` property is set to `true`.
         * @see firstPageIsStarted
         */
        get startedPage(): PageModel;
        /**
         * Gets or sets the current survey page. If a survey is rendered, then this property returns a page that a user can see/edit.
         */
        get currentPage(): any;
        set currentPage(value: any);
        private updateCurrentPage;
        private get isCurrentPageAvailable();
        private isPageExistsInSurvey;
        /**
         * Returns the currentPage, unless the started page is showing. In this case returns the started page.
         * @see currentPage
         * @see firstPageIsStarted
         * @see startedPage
         */
        get activePage(): any;
        /**
         * The started page is showing right now. survey state equals to "starting"
         */
        get isShowStartingPage(): boolean;
        /**
         * Survey is showing a page right now. It is in "running", "preview" or starting state.
         */
        get isShowingPage(): boolean;
        private updateActivePage;
        private onStateAndCurrentPageChanged;
        private getPageByObject;
        /**
         * The zero-based index of the current page in the visible pages array.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-editprevious/ (linkStyle))
         */
        get currentPageNo(): number;
        set currentPageNo(value: number);
        /**
         * Gets or sets the question display order. Use this property to randomize questions. You can randomize questions on a specific page.
         *
         * The following options are available:
         *
         * - `random` - randomize questions
         * - `initial` - keep questions in the same order, as in a survey model.
         * @see SurveyPage.questionsOrder
         */
        get questionsOrder(): string;
        set questionsOrder(val: string);
        /**
         * Sets the input focus to the first question with the input field.
         */
        focusFirstQuestion(): void;
        scrollToTopOnPageChange(doScroll?: boolean): void;
        /**
         * Returns the current survey state.
         *
         * Possible values:
         *
         * - `"loading"` - The survey is being loaded from a JSON schema.
         * - `"empty"` - The survey has no elements to display.
         * - `"starting"` - The survey displays a [start page](https://surveyjs.io/form-library/documentation/design-survey/create-a-multi-page-survey#start-page).
         * - `"running"` - A respondent is taking the survey.
         * - `"preview"` - A respondent is [previewing](https://surveyjs.io/form-library/examples/survey-showpreview/) answers before submitting them.
         * - `"completed"` - A respondent has completed the survey and submitted the results.
         */
        get state(): string;
        private updateState;
        private calcState;
        private get isCompleted();
        private set isCompleted(value);
        private get isShowingPreview();
        private set isShowingPreview(value);
        private get isStartedState();
        private set isStartedState(value);
        private get isCompletedBefore();
        private set isCompletedBefore(value);
        private get isLoading();
        private set isLoading(value);
        get completedState(): string;
        get completedStateText(): string;
        protected setCompletedState(value: string, text: string): void;
        notify(message: string, type: string): void;
        /**
         * Clears the survey data and state. If the survey has a `completed` state, it will get a `running` state.
         * @param clearData clear the data
         * @param gotoFirstPage make the first page as a current page.
         * @see data
         * @see state
         * @see currentPage
         */
        clear(clearData?: boolean, gotoFirstPage?: boolean): void;
        mergeValues(src: any, dest: any): void;
        private updateValuesWithDefaults;
        protected updateCustomWidgets(page: PageModel): void;
        protected currentPageChanging(newValue: PageModel, oldValue: PageModel): boolean;
        protected currentPageChanged(newValue: PageModel, oldValue: PageModel): void;
        private isNextPage;
        private isPrevPage;
        /**
         * Returns the progress that a user made while going through the survey.
         * It depends from progressBarType property
         * @see progressBarType
         * @see progressValue
         */
        getProgress(): number;
        /**
         * Returns the progress that a user made while going through the survey.
         * It depends from progressBarType property
         * @see progressBarType
         */
        get progressValue(): number;
        /**
         * Returns the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') position.
         */
        get isNavigationButtonsShowing(): string;
        /**
         * Returns true if the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') are shows on top.
         */
        get isNavigationButtonsShowingOnTop(): boolean;
        /**
         * Returns true if the navigation buttons (i.e., 'Prev', 'Next', or 'Complete' and 'Preview') are shows on bottom.
         */
        get isNavigationButtonsShowingOnBottom(): boolean;
        private getIsNavigationButtonsShowingOn;
        /**
         * Returns `true` if the survey is in edit mode.
         * @see mode
         */
        get isEditMode(): boolean;
        /**
         * Returns `true` if the survey is in display mode or in preview mode.
         * @see mode
         * @see showPreviewBeforeComplete
         */
        get isDisplayMode(): boolean;
        get isUpdateValueTextOnTyping(): boolean;
        /**
         * Returns `true` if the survey is in design mode. It is used by SurveyJS Editor.
         * @see setDesignMode
         */
        get isDesignMode(): boolean;
        private _isDesignMode;
        /**
         * Sets the survey into design mode.
         * @param value use true to set the survey into the design mode.
         */
        setDesignMode(value: boolean): void;
        /**
         * Gets or sets whether to show all elements in the survey, regardless their visibility. The default value is `false`.
         */
        get showInvisibleElements(): boolean;
        set showInvisibleElements(val: boolean);
        private updateAllElementsVisibility;
        get areInvisibleElementsShowing(): boolean;
        get areEmptyElementsHidden(): boolean;
        /**
         * Returns `true`, if a user has already completed the survey in this browser and there is a cookie about it. Survey goes to `completed` state if the function returns `true`.
         * @see cookieName
         * @see setCookie
         * @see deleteCookie
         * @see state
         */
        get hasCookie(): boolean;
        /**
         * Set the cookie with `cookieName` in user's browser. It is done automatically on survey complete if the `cookieName` property value is not empty.
         * @see cookieName
         * @see hasCookie
         * @see deleteCookie
         */
        setCookie(): void;
        /**
         * Deletes the cookie with `cookieName` from the browser.
         * @see cookieName
         * @see hasCookie
         * @see setCookie
         */
        deleteCookie(): void;
        /**
         * Gets or sets whether the survey must ignore validation like required questions and others, on `nextPage` and `completeLastPage` function calls. The default is `false`.
         * @see nextPage
         * @see completeLastPage
         * @see mode
         */
        ignoreValidation: boolean;
        /**
         * Navigates user to the next page.
         *
         * Returns `false` in the following cases:
         *
         * - if the current page is the last page.
         * - if the current page contains errors (for example, a required question is empty).
         * @see isCurrentPageValid
         * @see prevPage
         * @see completeLastPage
         */
        nextPage(): boolean;
        private hasErrorsOnNavigate;
        private asyncValidationQuesitons;
        private checkForAsyncQuestionValidation;
        private clearAsyncValidationQuesitons;
        private onCompletedAsyncQuestionValidators;
        get isCurrentPageHasErrors(): boolean;
        /**
         * Returns `true` if the current page does not contain errors.
         * @see currentPage
         */
        get isCurrentPageValid(): boolean;
        hasCurrentPageErrors(onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
         * Validates all questions on the current page and returns `false` if the validation fails.
         *
         * If you use validation expressions and at least one of them calls an async function, the `validateCurrentPage` method returns `undefined`. In this case, you should pass a callback function as the `onAsyncValidation` parameter. The function's `hasErrors` Boolean parameter will contain the validation result.
         * @param onAsyncValidation *Optional.* Pass a callback function. It accepts a Boolean `hasErrors` parameter that equals `true` if the validation fails or `false` otherwise.
         * @see currentPage
         * @see validate
         * @see validateCurrentPage
         */
        validateCurrentPage(onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        hasPageErrors(page?: PageModel, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
         * Validates all questions on a specified page and returns `false` if the validation fails.
         *
         * If you use validation expressions and at least one of them calls an async function, the `validatePage` method returns `undefined`. In this case, you should pass a callback function as the `onAsyncValidation` parameter. The function's `hasErrors` Boolean parameter will contain the validation result.
         * @param page Pass the `PageModel` that you want to validate. You can pass `undefined` to validate the [`activePage`](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#activePage).
         * @param onAsyncValidation *Optional.* Pass a callback function. It accepts a Boolean `hasErrors` parameter that equals `true` if the validation fails or `false` otherwise.
         * @see validate
         * @see validateCurrentPage
         */
        validatePage(page?: PageModel, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
         * Validates all questions and returns `false` if the validation fails.
         *
         * If you use validation expressions and at least one of them calls an async function, the `validate` method returns `undefined`. In this case, you should pass a callback function as the `onAsyncValidation` parameter. The function's `hasErrors` Boolean parameter will contain the validation result.
         * @param fireCallback *Optional.* Pass `false` if you do not want to show validation errors in the UI.
         * @param focusOnFirstError *Optional.* Pass `true` if you want to focus the first question with a validation error. The survey will be switched to the page that contains this question if required.
         * @param onAsyncValidation *Optional.* Pass a callback function. It accepts a Boolean `hasErrors` parameter that equals `true` if the validation fails or `false` otherwise.
         * @see validateCurrentPage
         * @see validatePage
         */
        validate(fireCallback?: boolean, focusOnFirstError?: boolean, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
         * Checks whether survey elements (pages, panels, and questions) have unique question names.
         * You can check for unique names for individual page and panel (and all their elements) or a question.
         * If the parameter is not specified, then a survey checks that all its elements have unique names.
         * @param element page, panel or question, it is `null` by default, that means all survey elements will be checked
         */
        ensureUniqueNames(element?: ISurveyElement): void;
        private ensureUniqueName;
        private ensureUniquePageName;
        private ensureUniquePanelName;
        private ensureUniqueQuestionName;
        private ensureUniqueElementName;
        private getNewName;
        private checkIsCurrentPageHasErrors;
        private checkIsPageHasErrors;
        private fireValidatedErrorsOnPage;
        /**
         * Navigates user to a previous page. If the current page is the first page, `prevPage` returns `false`. `prevPage` does not perform any checks, required questions can be empty.
         * @see isFirstPage
         */
        prevPage(): boolean;
        /**
         * Completes the survey, if the current page is the last one. It returns `false` if the last page has errors.
         * If the last page has no errors, `completeLastPage` calls `doComplete` and returns `true`.
         * @see isCurrentPageValid
         * @see nextPage
         * @see doComplete
         */
        completeLastPage(): boolean;
        private isNavigationButtonPressed;
        navigationMouseDown(): boolean;
        private resetNavigationButton;
        private mouseDownPage;
        nextPageUIClick(): void;
        nextPageMouseDown(): boolean;
        /**
         * Shows preview for the survey. Switches the survey to the "preview" state.
         *
         * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
         * @see showPreviewBeforeComplete
         * @see cancelPreview
         * @see state
         * @see previewText
         * @see editText
         */
        showPreview(): boolean;
        private showPreviewCore;
        /**
         * Cancels preview and switches back to the "running" state.
         *
         * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
         * @param curPage - A new current page. If the parameter is undefined then the last page becomes the current.
         * @see showPreviewBeforeComplete
         * @see showPreview
         * @see state
         */
        cancelPreview(curPage?: any): void;
        cancelPreviewByPage(panel: IPanel): any;
        protected doCurrentPageComplete(doComplete: boolean): boolean;
        private doCurrentPageCompleteCore;
        get isSinglePage(): boolean;
        set isSinglePage(val: boolean);
        /**
         * Gets or sets a value that specifies how the survey combines questions, panels, and pages.
         *
         * The following options are available:
         *
         * - `singlePage` - combine all survey pages in a single page. Pages will be converted to panels.
         * - `questionPerPage` - show one question per page. Survey will create a separate page for every question.
         */
        get questionsOnPageMode(): string;
        set questionsOnPageMode(val: string);
        /**
         * Gets or sets whether the first survey page is a start page. Set this property to `true`, to make the first page a starting page.
         * An end user cannot navigate to the start page and the start page does not affect a survey progress.
         */
        get firstPageIsStarted(): boolean;
        set firstPageIsStarted(val: boolean);
        isPageStarted(page: IPage): boolean;
        /**
         * Allows respondents to preview answers before they are submitted.
         *
         * Possible values:
         *
         * - `"showAllQuestions"` - Displays all questions in the preview.
         * - `"showAnsweredQuestions"` - Displays only answered questions in the preview.
         * - `"noPreview"` (default) - Hides the preview.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/survey-showpreview/ (linkStyle))
         * @see showPreview
         * @see cancelPreview
         */
        get showPreviewBeforeComplete(): string;
        set showPreviewBeforeComplete(val: string);
        get isShowPreviewBeforeComplete(): boolean;
        protected onFirstPageIsStartedChanged(): void;
        private runningPages;
        private onShowingPreviewChanged;
        private origionalPages;
        protected onQuestionsOnPageModeChanged(oldValue: string): void;
        private restoreOrigionalPages;
        private getPageStartIndex;
        private setupPagesForPageModes;
        private createPagesForQuestionOnPageMode;
        private createSinglePage;
        private createPagesForEveryQuestion;
        /**
         * Gets whether the current page is the first one.
         */
        get isFirstPage(): boolean;
        /**
         * Gets whether the current page is the last one.
         */
        get isLastPage(): boolean;
        private updateButtonsVisibility;
        get isShowPrevButton(): boolean;
        get isShowNextButton(): boolean;
        get isCompleteButtonVisible(): boolean;
        get isPreviewButtonVisible(): boolean;
        get isCancelPreviewButtonVisible(): boolean;
        private updateIsFirstLastPageState;
        private calcIsShowPrevButton;
        private calcIsShowNextButton;
        calcIsCompleteButtonVisible(): boolean;
        private calcIsPreviewButtonVisible;
        private calcIsCancelPreviewButtonVisible;
        private get firstVisiblePage();
        private get lastVisiblePage();
        /**
         * Completes the survey.
         *
         * Calling this function performs the following tasks:
         *
         * - writes cookie if the `cookieName` property is not empty
         * - sets the survey into `completed` state
         * - fires the `onComplete` event
         * - calls `sendResult` function.
         *
         * Calling the `doComplete` function does not perform any validation, unlike the `completeLastPage` function.
         * The function can return false, if you set options.allowComplete to false in onCompleting event. Otherwise it returns true.
         * It calls `navigateToUrl` after calling `onComplete` event.
         * In case calling `options.showSaveInProgress` callback in the `onComplete` event, `navigateToUrl` is used on calling `options.showSaveSuccess` callback.
         * @see completeLastPage
         * @see onCompleting
         * @see cookieName
         * @see state
         * @see onComplete
         * @see surveyPostId
         * @see completeLastPage
         * @see navigateToUrl
         * @see navigateToUrlOnCondition
         */
        doComplete(isCompleteOnTrigger?: boolean): boolean;
        private checkOnCompletingEvent;
        /**
         * Starts the survey. Changes the survey mode from "starting" to "running". Call this function if your survey has a start page, otherwise this function does nothing.
         * @see firstPageIsStarted
         */
        start(): boolean;
        /**
         * Gets whether the question values on the current page are validating on the server at the current moment.
         * @see onServerValidateQuestions
         */
        get isValidatingOnServer(): boolean;
        private serverValidationEventCount;
        private setIsValidatingOnServer;
        private createServerValidationOptions;
        protected onIsValidatingOnServerChanged(): void;
        protected doServerValidation(doComplete: boolean, isPreview?: boolean): boolean;
        private completeServerValidation;
        protected doNextPage(): void;
        setCompleted(): void;
        canBeCompleted(): void;
        /**
         * Returns the HTML content for the complete page.
         * @see completedHtml
         */
        get processedCompletedHtml(): string;
        /**
         * Returns the HTML content, that is shown to a user that had completed the survey before.
         * @see completedHtml
         * @see cookieName
         */
        get processedCompletedBeforeHtml(): string;
        /**
         * Returns the HTML content, that is shows when a survey loads the survey JSON.
         */
        get processedLoadingHtml(): string;
        getProgressInfo(): IProgressInfo;
        /**
         * Returns the text for the current progress.
         */
        get progressText(): string;
        private isCalculatingProgressText;
        updateProgressText(onValueChanged?: boolean): void;
        getProgressText(): string;
        private getProgressTextCore;
        rootCss: string;
        getRootCss(): string;
        private resizeObserver;
        afterRenderSurvey(htmlElement: any): void;
        private processResponsiveness;
        destroyResizeObserver(): void;
        updateQuestionCssClasses(question: IQuestion, cssClasses: any): void;
        updatePanelCssClasses(panel: IPanel, cssClasses: any): void;
        updatePageCssClasses(page: IPage, cssClasses: any): void;
        updateChoiceItemCss(question: IQuestion, options: any): void;
        private isFirstPageRendering;
        private isCurrentPageRendering;
        afterRenderPage(htmlElement: HTMLElement): void;
        afterRenderHeader(htmlElement: HTMLElement): void;
        afterRenderQuestion(question: IQuestion, htmlElement: HTMLElement): void;
        afterRenderQuestionInput(question: IQuestion, htmlElement: HTMLElement): void;
        afterRenderPanel(panel: IElement, htmlElement: HTMLElement): void;
        whenQuestionFocusIn(question: IQuestion): void;
        whenPanelFocusIn(panel: IPanel): void;
        private rebuildQuestionChoices;
        canChangeChoiceItemsVisibility(): boolean;
        getChoiceItemVisibility(question: IQuestion, item: any, val: boolean): boolean;
        loadQuestionChoices(options: {
            question: IQuestion;
            filter: string;
            skip: number;
            take: number;
            setItems: (items: Array<any>, totalCount: number) => void;
        }): void;
        getChoiceDisplayValue(options: {
            question: IQuestion;
            values: Array<any>;
            setItems: (displayValues: Array<string>) => void;
        }): void;
        matrixBeforeRowAdded(options: any): void;
        matrixRowAdded(question: IQuestion, row: any): void;
        getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
        matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): void;
        matrixRowRemoving(question: IQuestion, rowIndex: number, row: any): boolean;
        matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
        matrixCellCreating(question: IQuestion, options: any): void;
        matrixCellCreated(question: IQuestion, options: any): void;
        matrixAfterCellRender(question: IQuestion, options: any): void;
        matrixCellValueChanged(question: IQuestion, options: any): void;
        matrixCellValueChanging(question: IQuestion, options: any): void;
        get isValidateOnValueChanging(): boolean;
        get isValidateOnValueChanged(): boolean;
        matrixCellValidate(question: IQuestion, options: any): SurveyError;
        dynamicPanelAdded(question: IQuestion, panelIndex?: number, panel?: IPanel): void;
        dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
        dynamicPanelRemoving(question: IQuestion, panelIndex: number, panel: IPanel): boolean;
        dynamicPanelItemValueChanged(question: IQuestion, options: any): void;
        dragAndDropAllow(options: any): boolean;
        elementContentVisibilityChanged(element: ISurveyElement): void;
        getUpdatedPanelFooterActions(panel: PanelModel, actions: Array<IAction>, question?: QuestionPanelDynamicModel): Array<IAction>;
        getUpdatedElementTitleActions(element: ISurveyElement, titleActions: Array<IAction>): Array<IAction>;
        private getUpdatedQuestionTitleActions;
        private getUpdatedPanelTitleActions;
        private getUpdatedPageTitleActions;
        getUpdatedMatrixRowActions(question: IQuestion, row: any, actions: Array<IAction>): IAction[];
        scrollElementToTop(element: ISurveyElement, question: IQuestion, page: IPage, id: string): any;
        /**
         * Uploads a file to server.
         * @param question a file question object
         * @param name a question name
         * @param files files to upload
         * @param uploadingCallback a call back function to get the status on uploading the files
         */
        uploadFiles(question: IQuestion, name: string, files: File[], uploadingCallback: (status: string, data: any) => any): void;
        /**
         * Downloads a file from server
         * @param name a question name
         * @param fileValue a single file question value
         * @param callback a call back function to get the status on downloading the file and the downloaded file content
         */
        downloadFile(question: IQuestion, questionName: string, fileValue: any, callback: (status: string, data: any) => any): void;
        /**
         * Clears files from server.
         * @param question question
         * @param name question name
         * @param value file question value
         * @param callback call back function to get the status of the clearing operation
         */
        clearFiles(question: IQuestion, name: string, value: any, fileName: string, callback: (status: string, data: any) => any): void;
        updateChoicesFromServer(question: IQuestion, choices: Array<ItemValue>, serverResult: any): Array<ItemValue>;
        loadedChoicesFromServer(question: IQuestion): void;
        protected createSurveyService(): dxSurveyService;
        protected uploadFilesCore(name: string, files: File[], uploadingCallback: (status: string, data: any) => any): void;
        getPage(index: number): PageModel;
        /**
         * Adds an existing page to the survey.
         * @param page a newly added page
         * @param index - a page index to where insert a page. It is -1 by default and the page will be added into the end.
         * @see addNewPage
         */
        addPage(page: PageModel, index?: number): void;
        /**
         * Creates a new page and adds it to a survey. Generates a new name if the `name` parameter is not specified.
         * @param name a page name
         * @param index - a page index to where insert a new page. It is -1 by default and the page will be added into the end.
         * @see addPage
         */
        addNewPage(name?: string, index?: number): PageModel;
        /**
         * Removes a page from a survey.
         * @param page
         */
        removePage(page: PageModel): void;
        /**
         * Returns a question by its name.
         * @param name a question name
         * @param caseInsensitive
         * @see getQuestionByValueName
         */
        getQuestionByName(name: string, caseInsensitive?: boolean): Question;
        findQuestionByName(name: string): IQuestion;
        /**
         * Returns a question by its value name
         * @param valueName a question name
         * @param caseInsensitive
         * @see getQuestionByName
         * @see getQuestionsByValueName
         * @see Question.valueName
         */
        getQuestionByValueName(valueName: string, caseInsensitive?: boolean): IQuestion;
        /**
         * Returns all questions by their valueName. name property is used if valueName property is empty.
         * @param valueName a question name
         * @param caseInsensitive
         * @see getQuestionByName
         * @see getQuestionByValueName
         * @see Question.valueName
         */
        getQuestionsByValueName(valueName: string, caseInsensitive?: boolean): Array<Question>;
        getCalculatedValueByName(name: string): CalculatedValue;
        /**
         * Gets a list of questions by their names.
         * @param names an array of question names
         * @param caseInsensitive
         */
        getQuestionsByNames(names: string[], caseInsensitive?: boolean): IQuestion[];
        /**
         * Returns a page on which an element (question or panel) is placed.
         * @param element Question or Panel
         */
        getPageByElement(element: IElement): PageModel;
        /**
         * Returns a page on which a question is located.
         * @param question
         */
        getPageByQuestion(question: IQuestion): PageModel;
        /**
         * Returns a page by it's name.
         * @param name
         */
        getPageByName(name: string): PageModel;
        /**
         * Returns a list of pages by their names.
         * @param names a list of page names
         */
        getPagesByNames(names: string[]): PageModel[];
        /**
         * Returns a list of all questions in a survey.
         * @param visibleOnly set it `true`, if you want to get only visible questions
         */
        getAllQuestions(visibleOnly?: boolean, includingDesignTime?: boolean): Array<Question>;
        /**
         * Returns quiz questions. All visible questions that has input(s) widgets.
         * @see getQuizQuestionCount
         */
        getQuizQuestions(): Array<IQuestion>;
        /**
         * Returns a panel by its name.
         * @param name a panel name
         * @param caseInsensitive
         * @see getQuestionByName
         */
        getPanelByName(name: string, caseInsensitive?: boolean): PanelModel;
        /**
         * Returns a list of all survey's panels.
         */
        getAllPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
        /**
         * Creates and returns a new page, but do not add it into the survey.
         * You can use addPage(page) function to add it into survey later.
         * @see addPage
         * @see addNewPage
         */
        createNewPage(name: string): PageModel;
        protected questionOnValueChanging(valueName: string, newValue: any): any;
        protected updateQuestionValue(valueName: string, newValue: any): void;
        private checkQuestionErrorOnValueChanged;
        private checkQuestionErrorOnValueChangedCore;
        private checkErrorsOnValueChanging;
        protected notifyQuestionOnValueChanged(valueName: string, newValue: any): void;
        private isRunningElementsBindings;
        private updateVisibleIndexAfterBindings;
        private checkElementsBindings;
        private notifyElementsOnAnyValueOrVariableChanged;
        private updateAllQuestionsValue;
        private notifyAllQuestionsOnValueChanged;
        private checkOnPageTriggers;
        private getCurrentPageQuestions;
        private isTriggerIsRunning;
        private triggerValues;
        private triggerKeys;
        private checkTriggers;
        private doElementsOnLoad;
        private conditionValues;
        private get isRunningConditions();
        private isValueChangedOnRunningCondition;
        private conditionRunnerCounter;
        private conditionUpdateVisibleIndexes;
        private conditionNotifyElementsOnAnyValueOrVariableChanged;
        private runConditions;
        private runConditionOnValueChanged;
        private runConditionsCore;
        private checkIfNewPagesBecomeVisible;
        /**
         * Sends a survey result to the [api.surveyjs.io](https://api.surveyjs.io) service.
         * @param postId [api.surveyjs.io](https://api.surveyjs.io) service postId
         * @param clientId Typically a customer e-mail or an identifier
         * @param isPartialCompleted Set it to `true` if the survey is not completed yet and the results are intermediate
         * @see surveyPostId
         * @see clientId
         */
        sendResult(postId?: string, clientId?: string, isPartialCompleted?: boolean): void;
        /**
         * Calls the [api.surveyjs.io](https://api.surveyjs.io) service and, on callback, fires the `onGetResult` event with all answers that your users made for a question.
         * @param resultId [api.surveyjs.io](https://api.surveyjs.io) service resultId
         * @param name The question name
         * @see onGetResult
         */
        getResult(resultId: string, name: string): void;
        /**
         * Loads the survey JSON from the [api.surveyjs.io](https://api.surveyjs.io) service.
         * If `clientId` is not `null` and a user had completed a survey before, the survey switches to `completedbefore` state.
         * @param surveyId [api.surveyjs.io](https://api.surveyjs.io) service surveyId
         * @param clientId users' indentifier, for example an e-mail or a unique customer id in your web application.
         * @see state
         * @see onLoadedSurveyFromService
         */
        loadSurveyFromService(surveyId?: string, cliendId?: string): void;
        private loadSurveyFromServiceJson;
        protected onLoadingSurveyFromService(): void;
        protected onLoadSurveyFromService(): void;
        private resetVisibleIndexes;
        private updateVisibleIndexes;
        private updatePageVisibleIndexes;
        fromJSON(json: any): void;
        setJsonObject(jsonObj: any): void;
        private isEndLoadingFromJson;
        endLoadingFromJson(): void;
        private updateNavigationCss;
        private updateNavigationItemCssCallback;
        private updateNavigationBarCss;
        protected createNavigationBar(): ActionContainer;
        protected createNavigationActions(): Array<IAction>;
        protected onBeforeCreating(): void;
        protected onCreating(): void;
        private getProcessedTextValue;
        getBuiltInVariableValue(name: string): number;
        private getProcessedTextValueCore;
        private getProcessedValuesWithoutQuestion;
        private getFirstName;
        private reduceFirstName;
        private clearUnusedValues;
        hasVisibleQuestionByValueName(valueName: string): boolean;
        questionCountByValueName(valueName: string): number;
        private clearInvisibleQuestionValues;
        /**
         * Returns a variable value. Variable, unlike values, are not stored in the survey results.
         * @param name A variable name
         * @see SetVariable
         */
        getVariable(name: string): any;
        /**
         * Sets a variable value. Variable, unlike values, are not stored in the survey results.
         * @param name A variable name
         * @param newValue A variable new value
         * @see GetVariable
         */
        setVariable(name: string, newValue: any): void;
        /**
         * Returns all variables in the survey. Use setVariable function to create a new variable.
         * @see getVariable
         * @see setVariable
         */
        getVariableNames(): Array<string>;
        protected getUnbindValue(value: any): any;
        /**
         * Returns a question value (answer) by a question's name.
         * @param name A question name
         * @see data
         * @see setValue
         */
        getValue(name: string): any;
        /**
         * Sets a question value (answer). It runs all triggers and conditions (`visibleIf` properties).
         *
         * Goes to the next page if `goNextPageAutomatic` is `true` and all questions on the current page are answered correctly.
         * @param name A question name
         * @param newValue A new question value
         * @see data
         * @see getValue
         * @see PageModel.visibleIf
         * @see Question.visibleIf
         * @see goNextPageAutomatic
         */
        setValue(name: string, newQuestionValue: any, locNotification?: any, allowNotifyValueChanged?: boolean): void;
        private updateOnSetValue;
        private isValueEqual;
        protected doOnPageAdded(page: PageModel): void;
        protected doOnPageRemoved(page: PageModel): void;
        private generateNewName;
        protected tryGoNextPageAutomatic(name: string): void;
        /**
         * Returns the comment value.
         * @param name A comment's name.
         * @see setComment
         */
        getComment(name: string): string;
        /**
         * Sets a comment value.
         * @param name A comment name.
         * @param newValue A new comment value.
         * @see getComment
         */
        setComment(name: string, newValue: string, locNotification?: any): void;
        /**
         * Removes a value from the survey results.
         * @param {string} name The name of the value. Typically it is a question name.
         */
        clearValue(name: string): void;
        /**
         * Gets or sets whether to clear value on disable items in checkbox, dropdown and radiogroup questions.
         * By default, values are not cleared on disabled the corresponded items. This property is not persisted in survey JSON and you have to set it in code.
         */
        get clearValueOnDisableItems(): boolean;
        set clearValueOnDisableItems(val: boolean);
        get isClearValueOnHidden(): boolean;
        get isClearValueOnHiddenContainer(): boolean;
        questionVisibilityChanged(question: IQuestion, newValue: boolean): void;
        pageVisibilityChanged(page: IPage, newValue: boolean): void;
        panelVisibilityChanged(panel: IPanel, newValue: boolean): void;
        questionCreated(question: IQuestion): any;
        questionAdded(question: IQuestion, index: number, parentPanel: any, rootPanel: any): void;
        questionRemoved(question: IQuestion): void;
        questionRenamed(question: IQuestion, oldName: string, oldValueName: string): any;
        private questionHashes;
        private questionHashesClear;
        private questionHashesPanelAdded;
        private questionHashesAdded;
        private questionHashesRemoved;
        private questionHashAddedCore;
        private questionHashRemovedCore;
        panelAdded(panel: IElement, index: number, parentPanel: any, rootPanel: any): void;
        panelRemoved(panel: IElement): void;
        validateQuestion(question: IQuestion): SurveyError;
        validatePanel(panel: IPanel): SurveyError;
        processHtml(html: string): string;
        processText(text: string, returnDisplayValue: boolean): string;
        processTextEx(text: string, returnDisplayValue: boolean, doEncoding: boolean): any;
        private processTextCore;
        getSurveyMarkdownHtml(element: Base, text: string, name: string): string;
        getCorrectedAnswerCount(): number;
        /**
         * Returns an amount of corrected quiz answers.
         */
        getCorrectAnswerCount(): number;
        /**
         * Returns quiz question number. It may be different from `getQuizQuestions.length` because some widgets like matrix may have several questions.
         * @see getQuizQuestions
         */
        getQuizQuestionCount(): number;
        getInCorrectedAnswerCount(): number;
        /**
         * Returns an amount of incorrect quiz answers.
         */
        getInCorrectAnswerCount(): number;
        private getCorrectedAnswerCountCore;
        getCorrectedAnswers(): number;
        getInCorrectedAnswers(): number;
        /**
         * Gets or sets a timer panel position. The timer panel displays information about how much time an end user spends on a survey/page.
         *
         * The available options:
         * - `top` - display timer panel in the top.
         * - `bottom` - display timer panel in the bottom.
         * - `none` - do not display a timer panel.
         *
         * If the value is not equal to 'none', the survey calls the `startTimer()` method on survey rendering.
         * @see showTimerPanelMode
         * @see startTimer
         * @see stopTimer
         */
        get showTimerPanel(): string;
        set showTimerPanel(val: string);
        get isTimerPanelShowingOnTop(): boolean;
        get isTimerPanelShowingOnBottom(): boolean;
        /**
         * Gets or set a value that specifies whether the timer displays information for the page or for the entire survey.
         *
         * The available options:
         *
         * - `page` - show timer information for page
         * - `survey` - show timer information for survey
         *
         * Use the `onTimerPanelInfoText` event to change the default text.
         * @see showTimerPanel
         * @see onTimerPanelInfoText
         */
        get showTimerPanelMode(): string;
        set showTimerPanelMode(val: string);
        /**
          * Gets or sets a value that specifies how the survey width is calculated.
          *
          * The available options:
          *
          * - `static` - A survey has a fixed width that mostly depends upon the applied theme. Resizing a browser window does not affect the survey width.
          * - `responsive` - A survey takes all available horizontal space. A survey stretches or shrinks horizonally according to the screen size.
          * - `auto` - Depends on the question type and corresponds to the static or responsive mode.
        */
        get widthMode(): string;
        set widthMode(val: string);
        private calculatedWidthModeUpdater;
        setCalculatedWidthModeUpdater(): void;
        calculatedWidthMode: string;
        calculateWidthMode(): string;
        /**
         * A survey width in CSS values.
         *
         * Default value: `undefined` (the survey inherits the width from its container)
         */
        get width(): string;
        set width(val: string);
        get renderedWidth(): string;
        get timerInfo(): {
            spent: number;
            limit?: number;
        };
        get timerClock(): {
            majorText: string;
            minorText?: string;
        };
        get timerInfoText(): string;
        private getTimerInfo;
        private getTimerInfoText;
        private getTimerInfoPageText;
        private getTimerInfoSurveyText;
        private getDisplayClockTime;
        private getDisplayTime;
        get timerModel(): SurveyTimerModel;
        /**
         * Starts a timer that will calculate how much time end-user spends on the survey or on pages.
         * @see stopTimer
         * @see timeSpent
         */
        startTimer(): void;
        startTimerFromUI(): void;
        /**
         * Stops the timer.
         * @see startTimer
         * @see timeSpent
         */
        stopTimer(): void;
        /**
         * Returns the time in seconds an end user spends on the survey
         * @see startTimer
         * @see PageModel.timeSpent
         */
        get timeSpent(): number;
        /**
         * Gets or sets the maximum time in seconds that end user has to complete a survey. If the value is 0 or less, an end user has no time limit to finish a survey.
         * @see startTimer
         * @see maxTimeToFinishPage
         */
        get maxTimeToFinish(): number;
        set maxTimeToFinish(val: number);
        /**
         * Gets or sets the maximum time in seconds that end user has to complete a page in the survey. If the value is 0 or less, an end user has no time limit.
         *
         * You may override this value for every page.
         * @see startTimer
         * @see maxTimeToFinish
         * @see PageModel.maxTimeToFinish
         */
        get maxTimeToFinishPage(): number;
        set maxTimeToFinishPage(val: number);
        private getPageMaxTimeToFinish;
        private doTimer;
        get inSurvey(): boolean;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getObjects(pages: string[], questions: string[]): any[];
        setTriggerValue(name: string, value: any, isVariable: boolean): void;
        copyTriggerValue(name: string, fromName: string): void;
        triggerExecuted(trigger: Trigger): void;
        private isFocusingQuestion;
        private afterRenderPageTasks;
        private isMovingQuestion;
        startMovingQuestion(): void;
        stopMovingQuestion(): void;
        private needRenderIcons;
        private skippedPages;
        /**
         * Focus question by its name. If needed change the current page on the page where question is located.
         * Function returns false if there is no question with this name or question is invisible, otherwise it returns true.
         * @param name question name
         */
        focusQuestion(name: string): boolean;
        getElementWrapperComponentName(element: any, reason?: string): string;
        getQuestionContentWrapperComponentName(element: any): string;
        getRowWrapperComponentName(row: QuestionRowModel): string;
        getElementWrapperComponentData(element: any, reason?: string): any;
        getRowWrapperComponentData(row: QuestionRowModel): any;
        getItemValueWrapperComponentName(item: ItemValue, question: QuestionSelectBase): string;
        getItemValueWrapperComponentData(item: ItemValue, question: QuestionSelectBase): any;
        getMatrixCellTemplateData(cell: any): any;
        searchText(text: string): Array<IFindElement>;
        skeletonComponentName: string;
        getSkeletonComponentName(element: ISurveyElement): string;
        /**
         * Use this method to dispose survey model properly.
         */
        dispose(): void;
        disposeCallback: () => void;
    }
}
declare module "page" {
    import { IPage, IPanel, IElement, ISurveyElement } from "base-interfaces";
    import { PanelModelBase } from "panel";
    import { LocalizableString } from "localizablestring";
    /**
     * The `PageModel` object describes a survey page and contains properties and methods that allow you to control the page and access its elements (panels and questions).
     *
     * [View Demo](https://surveyjs.io/form-library/examples/nps-question/ (linkStyle))
     */
    export class PageModel extends PanelModelBase implements IPage {
        private hasShownValue;
        constructor(name?: string);
        getType(): string;
        toString(): string;
        get isPage(): boolean;
        protected canShowPageNumber(): boolean;
        protected canShowTitle(): boolean;
        /**
         * A caption displayed on a navigation button in the progress bar. Applies only when [`showProgressBar`](https://surveyjs.io/form-library/documentation/surveymodel#showProgressBar) is `true` and [`progressBarType`](https://surveyjs.io/form-library/documentation/surveymodel#progressBarType) is `"buttons"`.
         *
         * If this property is undefined, the navigation button displays the page's [`name`](https://surveyjs.io/form-library/documentation/pagemodel#name).
         */
        get navigationTitle(): string;
        set navigationTitle(val: string);
        get locNavigationTitle(): LocalizableString;
        get navigationDescription(): string;
        set navigationDescription(val: string);
        get locNavigationDescription(): LocalizableString;
        navigationLocStrChanged(): void;
        get passed(): boolean;
        set passed(val: boolean);
        delete(): void;
        onFirstRendering(): void;
        /**
         * The visible index of the page. It has values from 0 to visible page count - 1.
         * @see SurveyModel.visiblePages
         * @see SurveyModel.pages
         */
        get visibleIndex(): number;
        set visibleIndex(val: number);
        protected canRenderFirstRows(): boolean;
        /**
         * Returns `true` if this page is a start page.
         *
         * Refer to the following help topic for more information on how to configure a start page: [Start Page](https://surveyjs.io/form-library/documentation/design-survey-create-a-multi-page-survey#start-page).
         */
        get isStartPage(): boolean;
        get isStarted(): boolean;
        protected calcCssClasses(css: any): any;
        get cssTitle(): string;
        get cssRoot(): string;
        num: number;
        /**
         * Set this property to "hide" to make "Prev", "Next" and "Complete" buttons are invisible for this page. Set this property to "show" to make these buttons visible, even if survey showNavigationButtons property is false.
         * @see SurveyMode.showNavigationButtons
         */
        get navigationButtonsVisibility(): string;
        set navigationButtonsVisibility(val: string);
        /**
         * Returns `true` if this is the current page.
         * @see SurveyModel.currentPage
         */
        get isActive(): boolean;
        /**
         * Returns `true` if the respondent has already seen this page during the current session.
         */
        get wasShown(): boolean;
        get hasShown(): boolean;
        setWasShown(val: boolean): void;
        /**
         * Scrolls this page to the top.
         */
        scrollToTop(): void;
        /**
         * A time period that a respondent spent on this page; measured in seconds. Applies only to [quiz surveys](https://surveyjs.io/form-library/documentation/design-survey-create-a-quiz).
         * @see maxTimeToFinish
         */
        timeSpent: number;
        /**
         * Returns a list of all panels on this page.
         * @param visibleOnly A Boolean value that specifies whether to include only visible panels.
         * @param includingDesignTime For internal use.
         */
        getAllPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
        getPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
        /**
         * A time period that a respondent has to complete this page; measured in seconds. Applies only to [quiz surveys](https://surveyjs.io/form-library/documentation/design-survey-create-a-quiz).
         *
         * A negative value or 0 sets an unlimited time period.
         *
         * Alternatively, you can use the `SurveyModel`'s [`maxTimeToFinishPage`](https://surveyjs.io/form-library/documentation/surveymodel#maxTimeToFinishPage) property to specify identical time periods for all survey pages.
         * @see timeSpent
         */
        get maxTimeToFinish(): number;
        set maxTimeToFinish(val: number);
        protected onNumChanged(value: number): void;
        protected onVisibleChanged(): void;
        private dragDropInfo;
        protected getDragDropInfo(): any;
        dragDropStart(src: IElement, target: IElement, nestedPanelDepth?: number): void;
        dragDropMoveTo(destination: ISurveyElement, isBottom?: boolean, isEdge?: boolean): boolean;
        private correctDragDropInfo;
        private dragDropAllowFromSurvey;
        dragDropFinish(isCancel?: boolean): IElement;
        private dragDropGetElementIndex;
        private dragDropCanDropTagert;
        private dragDropCanDropSource;
        private dragDropCanDropCore;
        private dragDropCanDropNotNext;
        private dragDropIsSameElement;
        ensureRowsVisibility(): void;
    }
}
declare module "panel" {
    import { HashTable } from "helpers";
    import { Base } from "base";
    import { ISurveyImpl, IPage, IPanel, IConditionRunner, IElement, ISurveyElement, IQuestion, ISurveyErrorOwner, ITitleOwner, IProgressInfo, ISurvey, IFindElement } from "base-interfaces";
    import { SurveyElement } from "survey-element";
    import { Question } from "question";
    import { LocalizableString } from "localizablestring";
    import { findScrollableParent } from "utils/utils";
    import { SurveyError } from "survey-error";
    import { IAction } from "actions/action";
    import { ActionContainer } from "actions/container";
    export class DragDropInfo {
        source: IElement;
        target: IElement;
        nestedPanelDepth: number;
        constructor(source: IElement, target: IElement, nestedPanelDepth?: number);
        destination: ISurveyElement;
        isBottom: boolean;
        isEdge: boolean;
    }
    export class QuestionRowModel extends Base {
        panel: PanelModelBase;
        private static rowCounter;
        private static getRowId;
        protected _scrollableParent: any;
        protected _updateVisibility: any;
        startLazyRendering(rowContainerDiv: HTMLElement, findScrollableContainer?: typeof findScrollableParent): void;
        ensureVisibility(): void;
        stopLazyRendering(): void;
        private idValue;
        constructor(panel: PanelModelBase);
        private isLazyRenderingValue;
        setIsLazyRendering(val: boolean): void;
        isLazyRendering(): boolean;
        get id(): string;
        get elements(): Array<IElement>;
        get visibleElements(): Array<IElement>;
        get visible(): boolean;
        set visible(val: boolean);
        get isNeedRender(): boolean;
        set isNeedRender(val: boolean);
        updateVisible(): void;
        addElement(q: IElement): void;
        get index(): number;
        private setWidth;
        setElementMaxMinWidth(el: IElement): void;
        private getRenderedCalcWidth;
        private getElementWidth;
        private getRenderedWidthFromWidth;
        private calcVisible;
        private needToUpdateVisibleElements;
        dispose(): void;
        getRowCss(): string;
    }
    /**
     * A base class for the [PanelModel](https://surveyjs.io/form-library/documentation/panelmodel) and [PageModel](https://surveyjs.io/form-library/documentation/pagemodel) classes.
     */
    export class PanelModelBase extends SurveyElement<Question> implements IPanel, IConditionRunner, ISurveyErrorOwner, ITitleOwner {
        private static panelCounter;
        private static getPanelId;
        private elementsValue;
        private isQuestionsReady;
        private questionsValue;
        addElementCallback: (element: IElement) => void;
        removeElementCallback: (element: IElement) => void;
        onGetQuestionTitleLocation: () => string;
        constructor(name?: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        endLoadingFromJson(): void;
        showTitle: boolean;
        get hasTitle(): boolean;
        protected canShowTitle(): boolean;
        showDescription: boolean;
        get _showDescription(): boolean;
        localeChanged(): void;
        locStrsChanged(): void;
        /**
         * Returns a character or text string that indicates a required panel/page.
         * @see SurveyModel.requiredText
         * @see isRequired
         */
        get requiredText(): string;
        protected get titlePattern(): string;
        get isRequireTextOnStart(): boolean;
        get isRequireTextBeforeTitle(): boolean;
        get isRequireTextAfterTitle(): boolean;
        /**
         * Specifies a custom error message for a required panel/page.
         * @see isRequired
         * @see requiredIf
         */
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        /**
         * Specifies the sort order of questions in the panel/page.
         *
         * Possible values:
         *
         * - `"initial"` - Preserves the original order of questions.
         * - `"random"` - Displays questions in random order.
         * - `"default"` (default) - Inherits the setting from the Survey's `questionsOrder` property.
         * @see SurveyModel.questionsOrder
         * @see areQuestionsRandomized
         */
        get questionsOrder(): string;
        set questionsOrder(val: string);
        private canRandomize;
        protected isRandomizing: boolean;
        randomizeElements(isRandom: boolean): void;
        /**
         * Returns `true` if elements in this panel/page are arranged in random order.
         * @see questionsOrder
         */
        get areQuestionsRandomized(): boolean;
        /**
         * Returns a survey element (panel or page) that contains this panel and allows you to move this question to a different survey element.
         *
         * This property is always `null` for the `PageModel` object.
         */
        get parent(): PanelModelBase;
        set parent(val: PanelModelBase);
        get depth(): number;
        /**
         * A Boolean expression. If it evaluates to `false`, this panel/page becomes hidden.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see visible
         * @see isVisible
         */
        get visibleIf(): string;
        set visibleIf(val: string);
        protected calcCssClasses(css: any): any;
        /**
         * An auto-generated unique element identifier.
         */
        get id(): string;
        set id(val: string);
        /**
         * Returns `true` if the survey element is a panel.
         * @see Base.getType
         */
        get isPanel(): boolean;
        getPanel(): IPanel;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
         * An array of all questions within this panel/page. Includes questions within nested panels.
         * @see elements
         */
        get questions(): Array<Question>;
        protected getValidName(name: string): string;
        /**
         * Returns a question with a specified `name`. This method does not find questions within nested panels.
         * @param name A question name.
         */
        getQuestionByName(name: string): Question;
        /**
         * Returns a survey element with a specified `name`. This method can find survey elements within nested elements.
         * @param name An element name.
         */
        getElementByName(name: string): IElement;
        getQuestionByValueName(valueName: string): Question;
        /**
         * Returns a JSON object with question values nested in the panel/page.
         * @see getDisplayValue
         */
        getValue(): any;
        /**
         * Returns a JSON object with display texts that correspond to question values nested in the panel/page.
         * @param keysAsText Pass `true` if not only values in the object should be display texts, but also keys. Default value: `false`.
         * @see getValue
         */
        getDisplayValue(keysAsText: boolean): any;
        /**
         * Returns a JSON object with comments left to questions within this panel/page. Question names are used as keys.
         */
        getComments(): any;
        /**
         * Removes values that cannot be assigned to nested questions, for example, choices unlisted in the `choices` array.
         *
         * Call this method after you assign new question values in code to ensure that they are acceptable.
         *
         * > This method does not remove values for invisible questions and values that fail validation. Call the `validate()` method to validate newly assigned values.
         *
         * @see validate
         */
        clearIncorrectValues(): void;
        /**
         * Empties the `errors` array for this panel/page and all its child elements (panels and questions).
         * @see errors
         */
        clearErrors(): void;
        private markQuestionListDirty;
        /**
         * An array of all survey elements (questions or panels) within this panel/page. Does not include questions within nested panels.
         * @see questions
         */
        get elements(): Array<IElement>;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        /**
         * Checks whether a given element belongs to this panel/page or nested panels.
         * @param element A survey element to check.
         */
        containsElement(element: IElement): boolean;
        /**
         * Makes the panel/page require an answer at least in one nested question. If a respondent leaves the panel/page without any answers, the survey displays a validation error.
         * @see requiredIf
         * @see [Data Validation](https://surveyjs.io/form-library/documentation/data-validation)
         */
        get isRequired(): boolean;
        set isRequired(val: boolean);
        /**
         * A Boolean expression. If it evaluates to `true`, this panel/page becomes required (at least one question in the panel/page should have an answer).
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see isRequired
         */
        get requiredIf(): string;
        set requiredIf(val: string);
        searchText(text: string, founded: Array<IFindElement>): void;
        hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, rec?: any): boolean;
        /**
         * Validates questions within this panel or page and returns `false` if the validation fails.
         * @param fireCallback *Optional.* Pass `false` if you do not want to show validation errors in the UI.
         * @param focusOnFirstError *Optional.* Pass `true` if you want to focus the first question with a validation error.
         * @see [Data Validation](https://surveyjs.io/form-library/documentation/data-validation)
         */
        validate(fireCallback?: boolean, focusOnFirstError?: boolean, rec?: any): boolean;
        private hasErrorsInPanels;
        getErrorCustomText(text: string, error: SurveyError): string;
        private hasRequiredError;
        protected hasErrorsCore(rec: any): void;
        protected getContainsErrors(): boolean;
        updateElementVisibility(): void;
        getFirstQuestionToFocus(withError?: boolean, ignoreCollapseState?: boolean): Question;
        /**
         * Sets focus on the input of the first question in this panel/page.
         */
        focusFirstQuestion(): void;
        /**
         * Sets focus on the input of the first question in this panel/page that has an error.
         * @see validate
         */
        focusFirstErrorQuestion(): void;
        addQuestionsToList(list: Array<IQuestion>, visibleOnly?: boolean, includingDesignTime?: boolean): void;
        addPanelsIntoList(list: Array<IPanel>, visibleOnly?: boolean, includingDesignTime?: boolean): void;
        private addElementsToList;
        private addElementsToListCore;
        updateCustomWidgets(): void;
        /**
         * Sets a title location relative to the input field for questions that belong to this panel/page.
         *
         * Use this property to override the `questionTitleLocation` property specified for the survey. You can also set the `titleLocation` property for individual questions.
         *
         * Possible values:
         *
         * - `"default"` (default) - Inherits the setting from the `questionTitleLocation` property specified for the survey.
         * - `"top"` - Displays the title above the input field.
         * - `"bottom"` - Displays the title below the input field.
         * - `"left"` - Displays the title to the left of the input field.
         * - `"hidden"` - Hides the question title.
         *
         * > Certain question types (Matrix, Multiple Text) do not support the `"left"` value. For them, the `"top"` value is used.
         * @see SurveyModel.questionTitleLocation
         */
        get questionTitleLocation(): string;
        set questionTitleLocation(value: string);
        getQuestionTitleLocation(): string;
        protected getStartIndex(): string;
        getQuestionStartIndex(): string;
        getChildrenLayoutType(): string;
        getProgressInfo(): IProgressInfo;
        protected get root(): PanelModelBase;
        protected childVisibilityChanged(): void;
        protected createRowAndSetLazy(index: number): QuestionRowModel;
        protected createRow(): QuestionRowModel;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        updateRows(): void;
        get rows(): Array<QuestionRowModel>;
        ensureRowsVisibility(): void;
        protected onRowsChanged(): void;
        protected onAddElement(element: IElement, index: number): void;
        protected onRemoveElement(element: IElement): void;
        private onElementVisibilityChanged;
        private onElementStartWithNewLineChanged;
        private updateRowsVisibility;
        private canBuildRows;
        private buildRows;
        private isLazyRenderInRow;
        protected canRenderFirstRows(): boolean;
        protected getDragDropInfo(): any;
        private updateRowsOnElementAdded;
        private updateRowsOnElementRemoved;
        protected updateRowsRemoveElementFromRow(element: IElement, row: QuestionRowModel): void;
        private findRowByElement;
        elementWidthChanged(el: IElement): void;
        get processedTitle(): string;
        protected getRenderedTitle(str: string): string;
        /**
         * Gets or sets panel/page visibility.
         *
         * If you want to display or hide a survey element based on a condition, specify the `visibleIf` property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see visibleIf
         * @see isVisible
         */
        get visible(): boolean;
        set visible(value: boolean);
        protected onVisibleChanged(): void;
        /**
         * Returns `true` if the panel/page is visible or the survey is currently in design mode.
         *
         * If you want to display or hide a question based on a condition, specify the `visibleIf` property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see visibleIf
         * @see visible
         */
        get isVisible(): boolean;
        getIsPageVisible(exceptionQuestion: IQuestion): boolean;
        private lastVisibleIndex;
        setVisibleIndex(index: number): number;
        private updateVisibleIndexes;
        private resetVisibleIndexes;
        protected beforeSetVisibleIndex(index: number): number;
        protected getPanelStartIndex(index: number): number;
        protected isContinueNumbering(): boolean;
        get isReadOnly(): boolean;
        protected onReadOnlyChanged(): void;
        updateElementCss(reNew?: boolean): void;
        /**
         * A Boolean expression. If it evaluates to `false`, this panel/page becomes read-only.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see readOnly
         * @see isReadOnly
         */
        get enableIf(): string;
        set enableIf(val: string);
        /**
         * Adds a survey element (question or panel) to this panel/page. Returns `true` if the element was added successfully; `false` otherwise.
         * @param element A survey element to add.
         * @param index A desired index of this element in the `elements` array.
         * @see addNewQuestion
         * @see addNewPanel
         */
        addElement(element: IElement, index?: number): boolean;
        insertElementAfter(element: IElement, after: IElement): void;
        insertElementBefore(element: IElement, before: IElement): void;
        protected canAddElement(element: IElement): boolean;
        addQuestion(question: Question, index?: number): boolean;
        addPanel(panel: PanelModel, index?: number): boolean;
        /**
         * Creates a new question of a given type and adds it to the `elements` array at a specified index.
         *
         * This method returns `null` if the question cannot be created or added to this panel/page; otherwise, the method returns the created question.
         *
         * @param questionType A [question type](https://surveyjs.io/form-library/documentation/question#getType).
         * @param name A question name.
         * @param index A desired index of the new question in the `elements` array.
         * @see elements
         * @see addElement
         */
        addNewQuestion(questionType: string, name?: string, index?: number): Question;
        /**
         * Creates a new panel and adds it to the end of the `elements` array.
         *
         * This method returns `null` if the panel cannot be created or added to this panel/page; otherwise, the method returns the created panel.
         * @param name A panel name.
         * @see elements
         * @see addElement
         */
        addNewPanel(name?: string): PanelModel;
        indexOf(element: IElement): number;
        protected createNewPanel(name: string): PanelModel;
        /**
         * Deletes a survey element (question or panel) from this panel/page. Returns `true` if the element was deleted successfully; `false` otherwise.
         * @param element A survey element to delete.
         * @see elements
         */
        removeElement(element: IElement): boolean;
        removeQuestion(question: Question): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        onAnyValueChanged(name: string): void;
        checkBindings(valueName: string, value: any): void;
        protected dragDropAddTarget(dragDropInfo: DragDropInfo): void;
        dragDropFindRow(findElement: ISurveyElement): QuestionRowModel;
        private dragDropAddTargetToRow;
        private dragDropAddTargetToEmptyPanel;
        private dragDropAddTargetToExistingRow;
        private dragDropAddTargetToNewRow;
        private dragDropAddTargetToEmptyPanelCore;
        dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
        needResponsiveWidth(): boolean;
        get hasDescriptionUnderTitle(): boolean;
        get cssHeader(): string;
        get cssDescription(): string;
        get no(): string;
        dispose(): void;
    }
    /**
     * A class that describes the Panel container element.
     *
     * A panel can contain questions and other panels. Refer to the following help topic for an illustration: [Survey Structure](https://surveyjs.io/form-library/documentation/design-survey-create-a-simple-survey#survey-structure).
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-panel/ (linkStyle))
     */
    export class PanelModel extends PanelModelBase implements IElement {
        constructor(name?: string);
        getType(): string;
        get contentId(): string;
        getSurvey(live?: boolean): ISurvey;
        onSurveyLoad(): void;
        protected onSetData(): void;
        get isPanel(): boolean;
        /**
         * Returns a page to which the panel belongs and allows you to move this panel to a different page.
         * @see PanelModelBase.parent
         */
        get page(): IPage;
        set page(val: IPage);
        delete(): void;
        moveTo(container: IPanel, insertBefore?: any): boolean;
        /**
         * Returns the visible index of the panel in the survey. Commonly it is -1 and it doesn't show.
         * You have to set showNumber to true to show index/numbering for the Panel
         * @see showNumber
         */
        get visibleIndex(): number;
        getTitleOwner(): ITitleOwner;
        /**
         * Specifies whether to show the panel number in the title.
         *
         * Default value: `false`
         * @see SurveyModel.showQuestionNumbers
         * @see SurveyModel.questionTitlePattern
         */
        get showNumber(): boolean;
        set showNumber(val: boolean);
        /**
         * Gets or sets a value that specifies how the elements numbers inside panel are displayed.
         *
         * The following options are available:
         *
         * - `default` - display questions numbers as defined in parent panel or survey
         * - `onpanel` - display questions numbers, start numbering from beginning of this page
         * - `off` - turn off the numbering for questions titles
         * @see showNumber
         */
        get showQuestionNumbers(): string;
        set showQuestionNumbers(value: string);
        /**
         * Specifies a number or letter used to start numbering of elements inside the panel.
         *
         * You can include desired prefixes and postfixes alongside the number or letter:
         *
         * ```js
         * "questionStartIndex": "a.", // a., b., c., ...
         * "questionStartIndex": "#3", // #3, #4, #5, ...
         * "questionStartIndex": "(B)." // (B)., (C)., (D)., ...
         * ```
         * Default value: `"1."` (inherited from `SurveyModel`'s `questionStartIndex` property)
         * @see SurveyModel.questionStartIndex
         * @see showQuestionNumbers
         */
        get questionStartIndex(): string;
        set questionStartIndex(val: string);
        getQuestionStartIndex(): string;
        /**
         * A question number or letter (depends on the `questionStartIndex` property).
         *
         * When the question number, title, or the entire question is invisible, this property returns an empty string.
         * @see questionStartIndex
         * @see showNumber
         * @see visibleIf
         */
        get no(): string;
        protected setNo(visibleIndex: number): void;
        protected beforeSetVisibleIndex(index: number): number;
        protected getPanelStartIndex(index: number): number;
        protected isContinueNumbering(): boolean;
        private notifySurveyOnVisibilityChanged;
        protected hasErrorsCore(rec: any): void;
        protected getRenderedTitle(str: string): string;
        /**
         * Increases or decreases an indent of panel content from the left edge. Accepts positive integer values and 0.
         */
        get innerIndent(): number;
        set innerIndent(val: number);
        /**
         * Disable this property if you want to render the current panel on the same line or row with the previous question or panel.
         */
        get startWithNewLine(): boolean;
        set startWithNewLine(value: boolean);
        get allowAdaptiveActions(): boolean;
        set allowAdaptiveActions(val: boolean);
        get innerPaddingLeft(): string;
        set innerPaddingLeft(val: string);
        private onIndentChanged;
        private getIndentSize;
        clearOnDeletingContainer(): void;
        get footerActions(): Array<IAction>;
        private footerToolbarValue;
        private footerToolbarCssValue;
        set footerToolbarCss(val: string);
        get footerToolbarCss(): string;
        onGetFooterActionsCallback: () => Array<IAction>;
        getFooterToolbar(): ActionContainer;
        get hasEditButton(): boolean;
        cancelPreview(): void;
        get cssTitle(): string;
        get cssError(): string;
        protected getCssError(cssClasses: any): string;
        protected onVisibleChanged(): void;
        needResponsiveWidth(): boolean;
        focusIn: () => void;
        getContainerCss(): string;
    }
}
declare module "textPreProcessor" {
    import { Question } from "question";
    import { PanelModel } from "panel";
    import { ISurvey, ITextProcessor } from "base-interfaces";
    export class TextPreProcessorItem {
        start: number;
        end: number;
    }
    export class TextPreProcessorValue {
        name: string;
        returnDisplayValue: boolean;
        constructor(name: string, returnDisplayValue: boolean);
        value: any;
        isExists: boolean;
        canProcess: boolean;
    }
    export class TextPreProcessor {
        private _unObservableValues;
        private get hasAllValuesOnLastRunValue();
        private set hasAllValuesOnLastRunValue(value);
        onProcess: (textValue: TextPreProcessorValue) => void;
        process(text: string, returnDisplayValue?: boolean, doEncoding?: boolean): string;
        processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
        get hasAllValuesOnLastRun(): boolean;
        private getItems;
        private getName;
    }
    export class QuestionTextProcessor implements ITextProcessor {
        protected variableName: string;
        private textPreProcessor;
        constructor(variableName: string);
        processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
        protected get survey(): ISurvey;
        protected get panel(): PanelModel;
        protected getValues(): any;
        protected getQuestionByName(name: string): Question;
        protected getParentTextProcessor(): ITextProcessor;
        protected onCustomProcessText(textValue: TextPreProcessorValue): boolean;
        protected getQuestionDisplayText(question: Question): string;
        private getProcessedTextValue;
        processText(text: string, returnDisplayValue: boolean): string;
        processTextEx(text: string, returnDisplayValue: boolean): any;
        private processTextCore;
    }
}
declare module "questionCustomWidgets" {
    import { Event } from "base";
    import { IQuestion } from "base-interfaces";
    export class QuestionCustomWidget {
        name: string;
        widgetJson: any;
        htmlTemplate: string;
        constructor(name: string, widgetJson: any);
        afterRender(question: IQuestion, el: any): void;
        willUnmount(question: IQuestion, el: any): void;
        getDisplayValue(question: IQuestion, value?: any): string;
        isFit(question: IQuestion): boolean;
        get canShowInToolbox(): boolean;
        get showInToolbox(): boolean;
        set showInToolbox(val: boolean);
        init(): void;
        activatedByChanged(activatedBy: string): void;
        private isLibraryLoaded;
        get isDefaultRender(): boolean;
        get pdfQuestionType(): string;
        get pdfRender(): any;
    }
    export class CustomWidgetCollection {
        static Instance: CustomWidgetCollection;
        private widgetsValues;
        private widgetsActivatedBy;
        onCustomWidgetAdded: Event<(customWidget: QuestionCustomWidget) => any, any>;
        get widgets(): Array<QuestionCustomWidget>;
        add(widgetJson: any, activatedBy?: string): void;
        addCustomWidget(widgetJson: any, activatedBy?: string): QuestionCustomWidget;
        /**
         * Returns the way the custom wiget is activated. It can be activated by a property ("property"), question type ("type") or by new/custom question type ("customtype").
         * @param widgetName the custom widget name
         * @see setActivatedBy
         */
        getActivatedBy(widgetName: string): string;
        /**
         * Sets the way the custom wiget is activated. The activation types are: property ("property"), question type ("type") or new/custom question type ("customtype"). A custom wiget may support all or only some of this activation types.
         * @param widgetName
         * @param activatedBy there are three possible variants: "property", "type" and "customtype"
         */
        setActivatedBy(widgetName: string, activatedBy: string): void;
        clear(): void;
        getCustomWidgetByName(name: string): QuestionCustomWidget;
        getCustomWidget(question: IQuestion): QuestionCustomWidget;
    }
}
declare module "question" {
    import { HashTable } from "helpers";
    import { EventBase } from "base";
    import { IElement, IQuestion, IPanel, IConditionRunner, ISurveyImpl, IPage, ITitleOwner, IProgressInfo, ISurvey } from "base-interfaces";
    import { SurveyElement } from "survey-element";
    import { SurveyValidator, IValidatorOwner } from "validator";
    import { TextPreProcessorValue } from "textPreProcessor";
    import { LocalizableString } from "localizablestring";
    import { ExpressionRunner } from "conditions";
    import { QuestionCustomWidget } from "questionCustomWidgets";
    import { SurveyError } from "survey-error";
    export interface IConditionObject {
        name: string;
        text: string;
        question: Question;
        context?: Question;
    }
    export interface IQuestionPlainData {
        name: string | number;
        title: string;
        value: any;
        displayValue: any;
        isNode: boolean;
        isComment?: boolean;
        questionType?: string;
        data?: Array<IQuestionPlainData>;
        getString: (val: any) => string;
        [key: string]: any;
    }
    /**
     * A base class for all questions.
     */
    export class Question extends SurveyElement<Question> implements IQuestion, IConditionRunner, IValidatorOwner, ITitleOwner {
        [index: string]: any;
        private static TextPreprocessorValuesMap;
        private static questionCounter;
        private static getQuestionId;
        private isCustomWidgetRequested;
        private customWidgetValue;
        customWidgetData: {
            isNeedRender: boolean;
        };
        focusCallback: () => void;
        surveyLoadCallback: () => void;
        displayValueCallback: (text: string) => string;
        private defaultValueRunner;
        private isChangingViaDefaultValue;
        private isValueChangedDirectly;
        valueChangedCallback: () => void;
        commentChangedCallback: () => void;
        localeChangedCallback: () => void;
        validateValueCallback: () => SurveyError;
        questionTitleTemplateCallback: () => string;
        afterRenderQuestionCallback: (question: Question, element: any) => any;
        valueFromDataCallback: (val: any) => any;
        valueToDataCallback: (val: any) => any;
        onGetSurvey: () => ISurvey;
        private locProcessedTitle;
        protected isReadyValue: boolean;
        private commentElements;
        /**
         * An event that is raised when the question's ready state has changed (expressions are evaluated, choices are loaded from a web resource specified by the `choicesByUrl` property, etc.).
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that contains the question whose ready state has changed.
         * - `options.isReady`: `Boolean`\
         * Indicates whether the question is ready.
         * - `options.oldIsReady`: `Boolean`\
         * Indicates the previous ready state.
         */
        onReadyChanged: EventBase<Question>;
        isReadOnlyRenderDiv(): boolean;
        isMobile: boolean;
        constructor(name: string);
        protected createLocTitleProperty(): LocalizableString;
        getSurvey(live?: boolean): ISurvey;
        getValueName(): string;
        /**
         * Specifies an object property that should store the question value.
         *
         * Refer to the [Merge Question Values](https://surveyjs.io/form-library/documentation/design-survey-merge-question-values) help topic for more information.
         */
        get valueName(): string;
        set valueName(val: string);
        protected onValueNameChanged(oldValue: string): void;
        protected onNameChanged(oldValue: string): void;
        get isReady(): boolean;
        get ariaRequired(): "true" | "false";
        get ariaInvalid(): "true" | "false";
        get ariaLabelledBy(): string;
        get ariaDescribedBy(): string;
        choicesLoaded(): void;
        /**
         * Returns a page to which the question belongs and allows you to move this question to a different page.
         */
        get page(): IPage;
        set page(val: IPage);
        getPanel(): IPanel;
        delete(): void;
        get isFlowLayout(): boolean;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
         * Gets or sets question visibility.
         *
         * If you want to display or hide a question based on a condition, specify the [`visibleIf`](https://surveyjs.io/form-library/documentation/question#visibleIf) property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see isVisible
         * @see visibleIf
         */
        get visible(): boolean;
        set visible(val: boolean);
        protected onVisibleChanged(): void;
        /**
         * Specifies whether to use display names for question values in placeholders.
         *
         * Default value: `true`
         *
         * This property applies to questions whose values are defined as objects with the `value` and `text` properties (for example, [choice items](https://surveyjs.io/form-library/documentation/questionradiogroupmodel#choices) in Radiogroup, Checkbox, and Dropdown questions).
         *
         * You can use question values as placeholders in the following places:
         *
         * - Survey element titles and descriptions
         * - The [`expression`](https://surveyjs.io/form-library/documentation/questionexpressionmodel#expression) property of the [Expression](https://surveyjs.io/form-library/documentation/questionexpressionmodel) question
         * - The [`html`](https://surveyjs.io/form-library/documentation/questionhtmlmodel#html) property of the [HTML](https://surveyjs.io/form-library/documentation/questionhtmlmodel) question
         *
         * To use a question value as a placeholder, specify the question `name` in curly brackets: `{questionName}`. Refer to the following help topic for more information: [Dynamic Texts - Question Values](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#question-values).
         */
        get useDisplayValuesInDynamicTexts(): boolean;
        set useDisplayValuesInDynamicTexts(val: boolean);
        protected getUseDisplayValuesInDynamicTexts(): boolean;
        /**
         * A Boolean expression. If it evaluates to `false`, this question becomes hidden.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see visible
         * @see isVisible
         */
        get visibleIf(): string;
        set visibleIf(val: string);
        /**
         * Returns `true` if the question is visible or the survey is currently in design mode.
         *
         * If you want to display or hide a question based on a condition, specify the [`visibleIf`](https://surveyjs.io/form-library/documentation/question#visibleIf) property. Refer to the following help topic for information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see visibleIf
         * @see visible
         * @see isParentVisible
         */
        get isVisible(): boolean;
        /**
         * Returns the visible index of the question in the survey. It can be from 0 to all visible questions count - 1
         * The visibleIndex is -1 if the title is 'hidden' or hideNumber is true
         * @see titleLocation
         * @see hideNumber
         */
        get visibleIndex(): number;
        /**
         * Hides the question number from the title and excludes the question from numbering.
         *
         * If you want to disable question numbering in the entire survey, set SurveyModel's `showQuestionNumbers` property to `false`.
         * @see SurveyModel.showQuestionNumbers
         */
        get hideNumber(): boolean;
        set hideNumber(val: boolean);
        /**
         * Returns `true` if the question can display its title to the left of the input field.
         * @see titleLocation
         * @see getTitleLocation
         * @see hasTitle
         */
        get isAllowTitleLeft(): boolean;
        /**
         * Returns the question type.
         * Possible values:
         * - [*"boolean"*](https://surveyjs.io/Documentation/Library?id=questionbooleanmodel)
         * - [*"checkbox"*](https://surveyjs.io/Documentation/Library?id=questioncheckboxmodel)
         * - [*"comment"*](https://surveyjs.io/Documentation/Library?id=questioncommentmodel)
         * - [*"dropdown"*](https://surveyjs.io/Documentation/Library?id=questiondropdownmodel)
         * - [*"tagbox"*](https://surveyjs.io/form-library/documentation/questiontagboxmodel)
         * - [*"expression"*](https://surveyjs.io/Documentation/Library?id=questionexpressionmodel)
         * - [*"file"*](https://surveyjs.io/Documentation/Library?id=questionfilemodel)
         * - [*"html"*](https://surveyjs.io/Documentation/Library?id=questionhtmlmodel)
         * - [*"image"*](https://surveyjs.io/Documentation/Library?id=questionimagemodel)
         * - [*"imagepicker"*](https://surveyjs.io/Documentation/Library?id=questionimagepickermodel)
         * - [*"matrix"*](https://surveyjs.io/Documentation/Library?id=questionmatrixmodel)
         * - [*"matrixdropdown"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdropdownmodel)
         * - [*"matrixdynamic"*](https://surveyjs.io/Documentation/Library?id=questionmatrixdynamicmodel)
         * - [*"multipletext"*](https://surveyjs.io/Documentation/Library?id=questionmultipletextmodel)
         * - [*"panel"*](https://surveyjs.io/Documentation/Library?id=panelmodel)
         * - [*"paneldynamic"*](https://surveyjs.io/Documentation/Library?id=questionpaneldynamicmodel)
         * - [*"radiogroup"*](https://surveyjs.io/Documentation/Library?id=questionradiogroupmodel)
         * - [*"rating"*](https://surveyjs.io/Documentation/Library?id=questionratingmodel)
         * - [*"ranking"*](https://surveyjs.io/Documentation/Library?id=questionrankingmodel)
         * - [*"signaturepad"*](https://surveyjs.io/Documentation/Library?id=questionsignaturepadmodel)
         * - [*"text"*](https://surveyjs.io/Documentation/Library?id=questiontextmodel)
         */
        getType(): string;
        get isQuestion(): boolean;
        moveTo(container: IPanel, insertBefore?: any): boolean;
        getProgressInfo(): IProgressInfo;
        private runConditions;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        /**
         * Returns a survey element (panel or page) that contains the question and allows you to move this question to a different survey element.
         */
        get parent(): IPanel;
        set parent(val: IPanel);
        protected onParentChanged(): void;
        /**
         * Returns `false` if the `titleLocation` property is set to `"hidden"` or if the question cannot have a title (for example, an [HTML](https://surveyjs.io/form-library/documentation/questionhtmlmodel) question).
         *
         * If the `title` property is `undefined` or set to an empty string, the `hasTitle` property returns `true`, because the question uses its `name` as a title in this case.
         * @see title
         * @see titleLocation
         */
        get hasTitle(): boolean;
        /**
         * Sets question title location relative to the input field. Overrides the `questionTitleLocation` property specified for the question's container (survey, page, or panel).
         *
         * Possible values:
         *
         * - `"default"` (default) - Inherits the setting from the `questionTitleLocation` property specified for the question's container.
         * - `"top"` - Displays the title above the input field.
         * - `"bottom"` - Displays the title below the input field.
         * - `"left"` - Displays the title to the left of the input field.
         * - `"hidden"` - Hides the question title.
         *
         * > Certain question types (Matrix, Multiple Text) do not support the `"left"` value. For them, the `"top"` value is used.
         * @see SurveyModel.questionTitleLocation
         * @see getTitleLocation
         * @see isAllowTitleLeft
         */
        get titleLocation(): string;
        set titleLocation(value: string);
        getTitleOwner(): ITitleOwner;
        protected getIsTitleRenderedAsString(): boolean;
        private notifySurveyVisibilityChanged;
        /**
         * Returns title location calculated based on the question's `titleLocation` property and the `questionTitleLocation` property of the question's containers (survey, page, or panel).
         * @see titleLocation
         * @see SurveyModel.questionTitleLocation
         */
        getTitleLocation(): string;
        protected getTitleLocationCore(): string;
        get hasTitleOnLeft(): boolean;
        get hasTitleOnTop(): boolean;
        get hasTitleOnBottom(): boolean;
        get hasTitleOnLeftTop(): boolean;
        get errorLocation(): string;
        /**
         * Returns `false` if the question has no input fields ([HTML](https://surveyjs.io/form-library/documentation/questionhtmlmodel), [Image](https://surveyjs.io/form-library/documentation/questionimagemodel), and similar question types).
         * @see hasSingleInput
         */
        get hasInput(): boolean;
        /**
         * Returns `false` if the question has no input fields ([HTML](https://surveyjs.io/form-library/documentation/questionhtmlmodel), [Image](https://surveyjs.io/form-library/documentation/questionimagemodel)) or has multiple input fields ([Matrix](https://surveyjs.io/form-library/documentation/questionmatrixmodel), [Multiple Text](https://surveyjs.io/form-library/documentation/questionmultipletextmodel)).
         * @see hasInput
         */
        get hasSingleInput(): boolean;
        get inputId(): string;
        protected getDefaultTitleValue(): string;
        protected getDefaultTitleTagName(): string;
        /**
         * Specifies where to display a question description.
         *
         * Possible values:
         *
         * - `"default"` (default) - Inherits the setting from the Survey's [`questionDescriptionLocation`](https://surveyjs.io/form-library/documentation/surveymodel#questionDescriptionLocation) property.
         * - `"underTitle"` - Displays the description under the question title.
         * - `"underInput"` - Displays the description under the interactive area.
         * @see description
         * @see hasDescription
         */
        get descriptionLocation(): string;
        set descriptionLocation(val: string);
        get hasDescriptionUnderTitle(): boolean;
        get hasDescriptionUnderInput(): boolean;
        private getDescriptionLocation;
        protected needClickTitleFunction(): boolean;
        protected processTitleClick(): boolean;
        /**
         * Specifies a custom error message for a required form field.
         * @see isRequired
         */
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        /**
         * Specifies a caption displayed above the comment area. Applies when the `showCommentArea` property is `true`.
         * @see showCommentArea
         * @see comment
         */
        get commentText(): string;
        set commentText(val: string);
        get locCommentText(): LocalizableString;
        /**
         * A placeholder for the comment area. Applies when the `showCommentArea` property is `true`.
         * @see showCommentArea
         * @see comment
         * @see commentText
         */
        commentPlaceholder: string;
        get commentPlaceHolder(): string;
        set commentPlaceHolder(newValue: string);
        getAllErrors(): Array<SurveyError>;
        getErrorByType(errorType: string): SurveyError;
        get customWidget(): QuestionCustomWidget;
        updateCustomWidget(): void;
        localeChanged(): void;
        get isCompositeQuestion(): boolean;
        protected updateCommentElements(): void;
        onCommentInput(event: any): void;
        onCommentChange(event: any): void;
        afterRenderQuestionElement(el: HTMLElement): void;
        afterRender(el: HTMLElement): void;
        protected getCommentElementsId(): Array<string>;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        get processedTitle(): string;
        get fullTitle(): string;
        protected get titlePattern(): string;
        get isRequireTextOnStart(): boolean;
        get isRequireTextBeforeTitle(): boolean;
        get isRequireTextAfterTitle(): boolean;
        /**
         * Disable this property if you want to render the current question on the same line or row with the previous question or panel.
         */
        get startWithNewLine(): boolean;
        set startWithNewLine(val: boolean);
        protected calcCssClasses(css: any): any;
        get cssRoot(): string;
        protected setCssRoot(val: string): void;
        protected getCssRoot(cssClasses: any): string;
        get cssHeader(): string;
        protected setCssHeader(val: string): void;
        protected getCssHeader(cssClasses: any): string;
        get cssContent(): string;
        protected setCssContent(val: string): void;
        protected getCssContent(cssClasses: any): string;
        get cssTitle(): string;
        protected setCssTitle(val: string): void;
        protected getCssTitle(cssClasses: any): string;
        get cssDescription(): string;
        protected setCssDescription(val: string): void;
        protected getCssDescription(cssClasses: any): string;
        protected getIsErrorsModeTooltip(): boolean;
        showErrorOnCore(location: string): boolean;
        get showErrorOnTop(): boolean;
        get showErrorOnBottom(): boolean;
        protected getIsTooltipErrorSupportedByParent(): boolean;
        private get showErrorsOutsideQuestion();
        get showErrorsAboveQuestion(): boolean;
        get showErrorsBelowQuestion(): boolean;
        get cssError(): string;
        protected setCssError(val: string): void;
        protected getCssError(cssClasses: any): string;
        getRootCss(): string;
        updateElementCss(reNew?: boolean): void;
        protected updateQuestionCss(reNew?: boolean): void;
        private ensureElementCss;
        protected updateElementCssCore(cssClasses: any): void;
        protected updateCssClasses(res: any, css: any): void;
        protected getCssType(): string;
        get renderCssRoot(): string;
        private onIndentChanged;
        private getIndentSize;
        /**
         * Moves focus to the input field of this question.
         * @param onError Pass `true` if you want to focus an input field with the first validation error. Default value: `false` (focuses the first input field). Applies to question types with multiple input fields.
         */
        focus(onError?: boolean): void;
        private expandAllParents;
        focusIn: () => void;
        protected fireCallback(callback: () => void): void;
        getOthersMaxLength(): any;
        protected onCreating(): void;
        getFirstQuestionToFocus(withError: boolean): Question;
        protected getFirstInputElementId(): string;
        protected getFirstErrorInputElementId(): string;
        protected getProcessedTextValue(textValue: TextPreProcessorValue): void;
        supportComment(): boolean;
        supportOther(): boolean;
        /**
         * Makes the question required. If a respondent skips a required question, the survey displays a validation error.
         * @see requiredIf
         * @see [Data Validation](https://surveyjs.io/form-library/documentation/data-validation)
         */
        get isRequired(): boolean;
        set isRequired(val: boolean);
        /**
         * A Boolean expression. If it evaluates to `true`, this question becomes required.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see isRequired
         */
        get requiredIf(): string;
        set requiredIf(val: string);
        /**
         * Specifies whether to display a comment area. Incompatible with the `showOtherItem` property.
         * @see comment
         * @see commentText
         * @see showOtherItem
         */
        get showCommentArea(): boolean;
        set showCommentArea(val: boolean);
        get hasComment(): boolean;
        set hasComment(val: boolean);
        /**
         * A value to assign to the `id` attribute of the rendered HTML element. A default `id` is generated automatically.
         */
        get id(): string;
        set id(val: string);
        get ariaTitleId(): string;
        get commentId(): string;
        get ariaRole(): string;
        /**
         * Specifies whether to display the "Other" choice item. Incompatible with the `showCommentArea` property.
         *
         * @see otherText
         * @see otherItem
         * @see otherErrorText
         * @see showCommentArea
         */
        get showOtherItem(): boolean;
        set showOtherItem(val: boolean);
        get hasOther(): boolean;
        set hasOther(val: boolean);
        protected hasOtherChanged(): void;
        get requireUpdateCommentValue(): boolean;
        get isReadOnly(): boolean;
        get isInputReadOnly(): boolean;
        get renderedInputReadOnly(): string;
        get renderedInputDisabled(): string;
        protected onReadOnlyChanged(): void;
        /**
         * A Boolean expression. If it evaluates to `false`, this question becomes read-only.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility)
         * @see readOnly
         * @see isReadOnly
         */
        get enableIf(): string;
        set enableIf(val: string);
        surveyChoiceItemVisibilityChange(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        /**
         * A question number or letter (depends on the `questionStartIndex` property of the question container (panel, page, or survey)).
         *
         * When the question number, title, or the entire question is invisible, this property returns an empty string.
         * @see SurveyModel.questionStartIndex
         * @see hideNumber
         * @see titleLocation
         * @see visibleIf
         */
        get no(): string;
        private calcNo;
        protected getStartIndex(): string;
        onSurveyLoad(): void;
        protected onSetData(): void;
        protected initDataFromSurvey(): void;
        protected initCommentFromSurvey(): void;
        protected runExpression(expression: string): any;
        private get autoGrowComment();
        private get questionValue();
        private set questionValue(value);
        private get questionComment();
        private set questionComment(value);
        /**
         * Gets or sets the question value.
         * @see SurveyModel.setValue
         * @see SurveyModel.getValue
         */
        get value(): any;
        set value(newValue: any);
        get valueForSurvey(): any;
        /**
         * Sets the question's `value` and `comment` properties to `undefined`.
         * @see value
         * @see comment
         */
        clearValue(): void;
        unbindValue(): void;
        createValueCopy(): any;
        protected getUnbindValue(value: any): any;
        protected isValueSurveyElement(val: any): boolean;
        private canClearValueAsInvisible;
        /**
         * Returns `true` if a parent element (page or panel) is visible.
         */
        get isParentVisible(): boolean;
        clearValueIfInvisible(reason?: string): void;
        protected clearValueIfInvisibleCore(): void;
        /**
         * Specifies when to clear the question value if the question becomes invisible.
         *
         * Possible values:
         *
         * - `"default"` (default) - Inherits the setting from the Survey's [`clearInvisibleValues`](https://surveyjs.io/form-library/documentation/surveymodel#clearInvisibleValues) property.
         * - `"onHidden"` - Clears the value when the question becomes invisible. If a question is invisible on startup and has an initial value, this value will be cleared when the survey is complete.
         * - `"onComplete"` - Clears the value when the survey is complete.
         * - `"none"` - Never clears the value of an invisible question.
         * @see SurveyModel.clearInvisibleValues
         * @see visible
         * @see SurveyModel.onComplete
         */
        get clearIfInvisible(): string;
        set clearIfInvisible(val: string);
        get displayValue(): any;
        /**
         * Returns a display text that corresponds to the question value. For example, if you call this method for a Dropdown question, it returns an item text instead of an item value.
         * @param keysAsText Applies when the question value is an object (in Matrix, Multiple Text, and similar questions). Pass `true` if not only values in the object should be display texts, but also keys. Default value: `false`.
         * @param value Specify this parameter to get a display text for a specific value, not for the current question value. If the question value is an object, this parameter should be a similar object.
         */
        getDisplayValue(keysAsText: boolean, value?: any): any;
        private calcDisplayValue;
        protected getDisplayValueCore(keyAsText: boolean, value: any): any;
        protected getDisplayValueEmpty(): string;
        /**
         * A default value for the question. Ignored for question types that cannot have a [value](https://surveyjs.io/form-library/documentation/question#value) (for example, HTML).
         *
         * The default value is used as a question value in the following cases:
         *
         * - While the survey is being loaded from JSON.
         * - The question is just added to the survey and does not yet have an answer.
         * - The respondent left the answer empty.
         * @see defaultValueExpression
         */
        get defaultValue(): any;
        set defaultValue(val: any);
        /**
         * An expression used to calculate the [defaultValue](https://surveyjs.io/form-library/documentation/question#defaultValue).
         *
         * This expression applies until the question [value](https://surveyjs.io/form-library/documentation/question#value) is specified by an end user or programmatically.
         *
         * An expression can reference other questions as follows:
         *
         * - `{other_question_name}`
         * - `{panel.other_question_name}` (to access questions inside the same dynamic panel)
         * - `{row.other_question_name}` (to access questions inside the same dynamic matrix or multi-column dropdown)
         *
         * An expression can also include built-in and custom functions for advanced calculations. For example, if the `defaultValue` should be today's date, set the `defaultValueExpression` to `"today()"`, and the corresponding built-in function will be executed each time the survey is loaded. Refer to the following help topic for more information: [Built-In Functions](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#built-in-functions).
         * @see defaultValue
         */
        get defaultValueExpression(): any;
        set defaultValueExpression(val: any);
        get resizeStyle(): "none" | "both";
        /**
         * Returns the question value as an object in which the question name, title, value, and other parameters are stored as individual properties.
         *
         * If the question can have more than one value (Matrix, Multiple Text), the object enables the `isNode` flag and stores information about these values in the `data` property. Refer to the following help topic for more information: [Access Full Survey Results](https://surveyjs.io/form-library/documentation/handle-survey-results-access#access-full-survey-results).
         *
         * Pass an object with the `includeEmpty` property set to `false` if you want to skip empty answers.
         */
        getPlainData(options?: {
            includeEmpty?: boolean;
            includeQuestionTypes?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): IQuestionPlainData;
        /**
         * A correct answer to this question. Specify this property if you want to [create a quiz](https://surveyjs.io/form-library/documentation/design-survey-create-a-quiz).
         * @see SurveyModel.getCorrectAnswerCount
         * @see SurveyModel.getInCorrectAnswerCount
         */
        get correctAnswer(): any;
        set correctAnswer(val: any);
        protected convertDefaultValue(val: any): any;
        /**
         * The number of quiz questions. A question counts if it is visible, has an input field, and specifies `correctAnswer`.
         * @see [Create a Quiz](https://surveyjs.io/form-library/documentation/design-survey-create-a-quiz)
         * @see correctAnswer
         * @see SurveyModel.getQuizQuestions
         */
        get quizQuestionCount(): number;
        get correctAnswerCount(): number;
        protected getQuizQuestionCount(): number;
        protected getCorrectAnswerCount(): number;
        /**
        * Returns `true` if a question answer matches the `correctAnswer` property value.
        *
        * [View Demo](https://surveyjs.io/form-library/examples/create-a-scored-quiz (linkStyle))
        * @see correctAnswer
        * @see SurveyModel.getQuizQuestions
        */
        isAnswerCorrect(): boolean;
        updateValueWithDefaults(): void;
        protected get isClearValueOnHidden(): boolean;
        getQuestionFromArray(name: string, index: number): IQuestion;
        getDefaultValue(): any;
        protected isDefaultValueEmpty(): boolean;
        protected getDefaultRunner(runner: ExpressionRunner, expression: string): ExpressionRunner;
        protected setDefaultValue(): void;
        protected isValueExpression(val: any): boolean;
        protected setValueAndRunExpression(runner: ExpressionRunner, defaultValue: any, setFunc: (val: any) => void, values?: HashTable<any>, properties?: HashTable<any>): void;
        protected convertFuncValuetoQuestionValue(val: any): any;
        private runExpressionSetValue;
        private runDefaultValueExpression;
        /**
         * A comment to the selected question value. Enable the `showCommentArea` property to allow users to leave comments.
         * @see showCommentArea
         * @see commentText
         */
        get comment(): string;
        set comment(newValue: string);
        protected getQuestionComment(): string;
        protected setQuestionComment(newValue: string): void;
        /**
         * Returns `true` if the question value is an empty string, array, or object or if it equals `undefined` or `null`.
         */
        isEmpty(): boolean;
        get isAnswered(): boolean;
        set isAnswered(val: boolean);
        protected updateIsAnswered(): void;
        protected getIsAnswered(): boolean;
        /**
         * Question validators.
         * @see [Data Validation](https://surveyjs.io/form-library/documentation/data-validation)
         */
        get validators(): Array<SurveyValidator>;
        set validators(val: Array<SurveyValidator>);
        getValidators(): Array<SurveyValidator>;
        getSupportedValidators(): Array<string>;
        private addSupportedValidators;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        /**
         * Validates this question and returns `false` if the validation fails.
         * @param fireCallback *Optional.* Pass `false` if you do not want to show validation errors in the UI.
         * @see [Data Validation](https://surveyjs.io/form-library/documentation/data-validation)
         */
        validate(fireCallback?: boolean, rec?: any): boolean;
        get currentErrorCount(): number;
        /**
         * Returns a character or text string that indicates a required question.
         * @see SurveyModel.requiredText
         * @see isRequired
         */
        get requiredText(): string;
        addError(error: SurveyError | string): void;
        removeError(error: SurveyError): void;
        private checkForErrors;
        protected canCollectErrors(): boolean;
        private collectErrors;
        protected canRunValidators(isOnValueChanged: boolean): boolean;
        private fireSurveyValidation;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected hasRequiredError(): boolean;
        private validatorRunner;
        private isRunningValidatorsValue;
        onCompletedAsyncValidators: (hasErrors: boolean) => void;
        get isRunningValidators(): boolean;
        protected getIsRunningValidators(): boolean;
        protected runValidators(): Array<SurveyError>;
        private doOnAsyncCompleted;
        protected raiseOnCompletedAsyncValidators(): void;
        private isValueChangedInSurvey;
        protected allowNotifyValueChanged: boolean;
        protected setNewValue(newValue: any): void;
        protected isTextValue(): boolean;
        get isSurveyInputTextUpdate(): boolean;
        private getDataLocNotification;
        get isInputTextUpdate(): boolean;
        protected setNewValueInData(newValue: any): void;
        protected getValueCore(): any;
        protected setValueCore(newValue: any): void;
        protected canSetValueToSurvey(): boolean;
        protected valueFromData(val: any): any;
        protected valueToData(val: any): any;
        protected onValueChanged(): void;
        protected setNewComment(newValue: string): void;
        protected getValidName(name: string): string;
        updateValueFromSurvey(newValue: any): void;
        updateCommentFromSurvey(newValue: any): any;
        protected onChangeQuestionValue(newValue: any): void;
        protected setValueChangedDirectly(): void;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        setVisibleIndex(val: number): number;
        removeElement(element: IElement): boolean;
        supportGoNextPageAutomatic(): boolean;
        supportGoNextPageError(): boolean;
        /**
         * Removes values that cannot be assigned to this question, for example, choices unlisted in the `choices` array.
         *
         * Call this method after you assign new question values in code to ensure that they are acceptable.
         *
         * > This method does not remove values that do not pass validation. Call the `validate()` method to validate newly assigned values.
         *
         * @see validate
         */
        clearIncorrectValues(): void;
        clearOnDeletingContainer(): void;
        /**
         * Empties the `errors` array.
         * @see errors
         */
        clearErrors(): void;
        clearUnusedValues(): void;
        onAnyValueChanged(name: string): void;
        checkBindings(valueName: string, value: any): void;
        getComponentName(): string;
        isDefaultRendering(): boolean;
        renderAs: string;
        getErrorCustomText(text: string, error: SurveyError): string;
        getValidatorTitle(): string;
        get validatedValue(): any;
        set validatedValue(val: any);
        getAllValues(): any;
        transformToMobileView(): void;
        transformToDesktopView(): void;
        needResponsiveWidth(): boolean;
        protected supportResponsiveness(): boolean;
        protected needResponsiveness(): boolean;
        protected checkForResponsiveness(el: HTMLElement): void;
        private resizeObserver;
        protected getObservedElementSelector(): string;
        private onMobileChanged;
        private onMobileChangedCallback;
        private initResponsiveness;
        protected getCompactRenderAs(): string;
        protected getDesktopRenderAs(): string;
        protected processResponsiveness(requiredWidth: number, availableWidth: number): any;
        private destroyResizeObserver;
        dispose(): void;
    }
}
declare module "martixBase" {
    import { HashTable } from "helpers";
    import { ItemValue } from "itemvalue";
    import { Question } from "question";
    /**
     * A base class for all matrix question types.
     */
    export class QuestionMatrixBaseModel<TRow, TColumn> extends Question {
        protected filteredColumns: Array<TColumn>;
        protected filteredRows: Array<ItemValue>;
        protected generatedVisibleRows: Array<TRow>;
        protected generatedTotalRow: TRow;
        visibleRowsChangedCallback: () => void;
        protected createColumnValues(): any;
        constructor(name: string);
        getType(): string;
        endLoadingFromJson(): void;
        get isCompositeQuestion(): boolean;
        /**
         * Specifies whether to display the table header that contains column captions.
         *
         * Default value: `true`
         */
        get showHeader(): boolean;
        set showHeader(val: boolean);
        /**
         * An array of matrix columns.
         *
         * This array can contain primitive values or objects with the `text` (display value) and `value` (value to be saved in survey results) properties.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/single-selection-matrix-table-question/ (linkStyle))
         */
        get columns(): Array<any>;
        set columns(newValue: Array<any>);
        get visibleColumns(): Array<any>;
        /**
         * An array of matrix rows.
         *
         * This array can contain primitive values or objects with the `text` (display value) and `value` (value to be saved in survey results) properties.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/single-selection-matrix-table-question/ (linkStyle))
         */
        get rows(): Array<any>;
        set rows(newValue: Array<any>);
        protected processRowsOnSet(newRows: Array<any>): any[];
        protected getVisibleRows(): Array<TRow>;
        /**
         * Returns an array of visible matrix rows.
         * @see rowsVisibleIf
         */
        get visibleRows(): Array<TRow>;
        /**
         * A Boolean expression that is evaluated against each matrix row. If the expression evaluates to `false`, the row becomes hidden.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Use the `{item}` placeholder to reference the current row in the expression.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see visibleRows
         * @see columnsVisibleIf
         */
        get rowsVisibleIf(): string;
        set rowsVisibleIf(val: string);
        /**
         * A Boolean expression that is evaluated against each matrix column. If the expression evaluates to `false`, the column becomes hidden.
         *
         * A survey parses and runs all expressions on startup. If any values used in the expression change, the survey re-evaluates it.
         *
         * Use the `{item}` placeholder to reference the current column in the expression.
         *
         * Refer to the following help topic for more information: [Conditional Visibility](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#conditional-visibility).
         * @see rowsVisibleIf
         */
        get columnsVisibleIf(): string;
        set columnsVisibleIf(val: string);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected filterItems(): boolean;
        protected onColumnsChanged(): void;
        protected onRowsChanged(): void;
        protected updateVisibilityBasedOnRows(): void;
        protected shouldRunColumnExpression(): boolean;
        protected hasRowsAsItems(): boolean;
        protected runItemsCondition(values: HashTable<any>, properties: HashTable<any>): boolean;
        protected clearGeneratedRows(): void;
        private runConditionsForRows;
        private runConditionsForColumns;
        clearIncorrectValues(): void;
        protected clearInvisibleValuesInRows(): void;
        private restoreNewVisibleRowsValues;
        needResponsiveWidth(): boolean;
        getTableCss(): string;
        /**
         * Aligns matrix cell content in the vertical direction.
         */
        verticalAlign: "top" | "middle";
        /**
         * Specifies whether to apply shading to alternate matrix rows.
         */
        alternateRows: boolean;
        /**
         * Minimum column width in CSS values.
         *
         * @see width
         */
        get columnMinWidth(): string;
        set columnMinWidth(val: string);
        /**
         * A width for the column that displays row titles (first column). Accepts CSS values.
         */
        get rowTitleWidth(): string;
        set rowTitleWidth(val: string);
    }
}
declare module "question_expression" {
    import { HashTable } from "helpers";
    import { Question } from "question";
    import { LocalizableString } from "localizablestring";
    /**
     * A class that describes the Expression question type. It is a read-only question type that calculates a value based on a specified expression.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-expression/ (linkStyle))
     */
    export class QuestionExpressionModel extends Question {
        private expressionIsRunning;
        private expressionRunner;
        constructor(name: string);
        getType(): string;
        get hasInput(): boolean;
        /**
         * A string that formats a question value. Use `{0}` to reference the question value in the format string.
         * @see displayStyle
         */
        get format(): string;
        set format(val: string);
        get locFormat(): LocalizableString;
        /**
         * An expression used to calculate the question value.
         *
         * Refer to the following help topic for more information: [Expressions](https://surveyjs.io/form-library/documentation/design-survey-conditional-logic#expressions).
         */
        get expression(): string;
        set expression(val: string);
        locCalculation(): void;
        unlocCalculation(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected canCollectErrors(): boolean;
        protected hasRequiredError(): boolean;
        /**
         * The maximum number of fraction digits. Applies only if the `displayStyle` property is not `"none"`. Accepts values in the range from -1 to 20, where -1 disables the property.
         *
         * Default value: -1
         * @see displayStyle
         * @see minimumFractionDigits
         */
        get maximumFractionDigits(): number;
        set maximumFractionDigits(val: number);
        /**
         * The minimum number of fraction digits. Applies only if the `displayStyle` property is not `"none"`. Accepts values in the range from -1 to 20, where -1 disables the property.
         *
         * Default value: -1
         * @see displayStyle
         * @see maximumFractionDigits
         */
        get minimumFractionDigits(): number;
        set minimumFractionDigits(val: number);
        private runIfReadOnlyValue;
        get runIfReadOnly(): boolean;
        set runIfReadOnly(val: boolean);
        get formatedValue(): string;
        protected updateFormatedValue(): void;
        protected onValueChanged(): void;
        updateValueFromSurvey(newValue: any): void;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        /**
         * Specifies a display style for the question value.
         *
         * Possible values:
         *
         * - `"decimal"`
         * - `"currency"`
         * - `"percent"`
         * - `"date"`
         * - `"none"` (default)
         *
         * If you use the `"currency"` display style, you can also set the `currency` property to specify a currency other than USD.
         * @see currency
         * @see minimumFractionDigits
         * @see maximumFractionDigits
         * @see format
         */
        get displayStyle(): string;
        set displayStyle(val: string);
        /**
         * A three-letter currency code. Applies only if the `displayStyle` property is set to `"currency"`.
         *
         * Default value: "USD".
         * @see displayStyle
         * @see minimumFractionDigits
         * @see maximumFractionDigits
         * @see format
         */
        get currency(): string;
        set currency(val: string);
        /**
         * Specifies whether to use grouping separators in number representation. Separators depend on the selected [locale](https://surveyjs.io/form-library/documentation/surveymodel#locale).
         *
         * Default value: `true`
         */
        get useGrouping(): boolean;
        set useGrouping(val: boolean);
        protected getValueAsStr(val: any): string;
    }
    export function getCurrecyCodes(): Array<string>;
}
declare module "question_matrixdropdowncolumn" {
    import { Question } from "question";
    import { Base } from "base";
    import { ISurvey, IWrapperObject } from "base-interfaces";
    import { ItemValue } from "itemvalue";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { SurveyValidator } from "validator";
    import { MatrixDropdownRowModelBase } from "question_matrixdropdownbase";
    export interface IMatrixColumnOwner extends ILocalizableOwner {
        getRequiredText(): string;
        hasChoices(): boolean;
        onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        onColumnItemValuePropertyChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
        onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
        getCellType(): string;
        getCustomCellType(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, cellType: string): string;
        onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
    }
    export var matrixDropdownColumnTypes: {
        dropdown: {
            onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
        };
        checkbox: {
            onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
        };
        radiogroup: {
            onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
        };
        tagbox: {};
        text: {};
        comment: {};
        boolean: {
            onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
        };
        expression: {};
        rating: {};
    };
    export class MatrixDropdownColumn extends Base implements ILocalizableOwner, IWrapperObject {
        static getColumnTypes(): Array<string>;
        private templateQuestionValue;
        private colOwnerValue;
        private indexValue;
        private _isVisible;
        private _hasVisibleCell;
        constructor(name: string, title?: string);
        getOriginalObj(): Base;
        getClassNameProperty(): string;
        getSurvey(live?: boolean): ISurvey;
        endLoadingFromJson(): void;
        getDynamicPropertyName(): string;
        getDynamicType(): string;
        get colOwner(): IMatrixColumnOwner;
        set colOwner(value: IMatrixColumnOwner);
        locStrsChanged(): void;
        addUsedLocales(locales: Array<string>): void;
        get index(): number;
        setIndex(val: number): void;
        getType(): string;
        get cellType(): string;
        set cellType(val: string);
        get templateQuestion(): Question;
        get value(): string;
        get isVisible(): boolean;
        setIsVisible(newVal: boolean): void;
        get hasVisibleCell(): boolean;
        set hasVisibleCell(newVal: boolean);
        get name(): string;
        set name(val: string);
        get title(): string;
        set title(val: string);
        get locTitle(): LocalizableString;
        get fullTitle(): string;
        get isRequired(): boolean;
        set isRequired(val: boolean);
        get isRenderedRequired(): boolean;
        set isRenderedRequired(val: boolean);
        updateIsRenderedRequired(val: boolean): void;
        get requiredText(): string;
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        get readOnly(): boolean;
        set readOnly(val: boolean);
        get hasOther(): boolean;
        set hasOther(val: boolean);
        get visibleIf(): string;
        set visibleIf(val: string);
        get enableIf(): string;
        set enableIf(val: string);
        get requiredIf(): string;
        set requiredIf(val: string);
        get isUnique(): boolean;
        set isUnique(val: boolean);
        get showInMultipleColumns(): boolean;
        set showInMultipleColumns(val: boolean);
        get isSupportMultipleColumns(): boolean;
        get isShowInMultipleColumns(): boolean;
        get validators(): Array<SurveyValidator>;
        set validators(val: Array<SurveyValidator>);
        get totalType(): string;
        set totalType(val: string);
        get totalExpression(): string;
        set totalExpression(val: string);
        get hasTotal(): boolean;
        get totalFormat(): string;
        set totalFormat(val: string);
        get locTotalFormat(): LocalizableString;
        get cellHint(): string;
        set cellHint(val: string);
        get locCellHint(): LocalizableString;
        get renderAs(): string;
        set renderAs(val: string);
        get totalMaximumFractionDigits(): number;
        set totalMaximumFractionDigits(val: number);
        get totalMinimumFractionDigits(): number;
        set totalMinimumFractionDigits(val: number);
        get totalDisplayStyle(): string;
        set totalDisplayStyle(val: string);
        get totalCurrency(): string;
        set totalCurrency(val: string);
        get minWidth(): string;
        set minWidth(val: string);
        get width(): string;
        set width(val: string);
        get colCount(): number;
        set colCount(val: number);
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        createCellQuestion(row: MatrixDropdownRowModelBase): Question;
        startLoadingFromJson(json?: any): void;
        updateCellQuestion(cellQuestion: Question, data: any, onUpdateJson?: (json: any) => any): void;
        private callOnCellQuestionUpdate;
        defaultCellTypeChanged(): void;
        protected calcCellQuestionType(row: MatrixDropdownRowModelBase): string;
        private getDefaultCellQuestionType;
        protected updateTemplateQuestion(newCellType?: string): void;
        protected createNewQuestion(cellType: string): Question;
        private setParentQuestionToTemplate;
        private previousChoicesId;
        protected setQuestionProperties(question: Question, onUpdateJson?: (json: any) => any): void;
        protected propertyValueChanged(name: string, oldValue: any, newValue: any): void;
        private doItemValuePropertyChanged;
        private doShowInMultipleColumnsChanged;
        private getProperties;
        private removeProperties;
        private addProperties;
        private addProperty;
    }
}
declare module "utils/devices" {
    export const IsMobile: boolean;
    export let IsTouch: boolean;
    export function _setIsTouch(val: boolean): void;
}
declare module "dragdrop/core" {
    import { SurveyModel } from "survey";
    import { Base, EventBase } from "base";
    import { IShortcutText, ISurvey } from "base-interfaces";
    export abstract class DragDropCore<T> extends Base {
        private surveyValue?;
        private creator?;
        private longTap?;
        isBottom: boolean;
        onGhostPositionChanged: EventBase<Base>;
        protected ghostPositionChanged(): void;
        static PreventScrolling: boolean;
        onBeforeDrop: EventBase<DragDropCore<T>>;
        onAfterDrop: EventBase<DragDropCore<T>>;
        draggedElement: any;
        protected abstract get draggedElementType(): string;
        protected parentElement: T;
        dropTarget: any;
        protected get dropTargetDataAttributeName(): string;
        protected get survey(): SurveyModel;
        prevDropTarget: any;
        protected draggedElementShortcut: any;
        private scrollIntervalId;
        protected allowDropHere: boolean;
        constructor(surveyValue?: ISurvey, creator?: any, longTap?: boolean);
        startDrag(event: PointerEvent, draggedElement: any, parentElement?: any, draggedElementNode?: HTMLElement, preventSaveTargetNode?: boolean): void;
        private timeoutID;
        private startX;
        private startY;
        private currentX;
        private currentY;
        private savedTargetNode;
        private startLongTapProcessing;
        private stopLongTapIfMoveEnough;
        private get isMicroMovement();
        private stopLongTap;
        private doStartDrag;
        private onContextMenu;
        private dragOver;
        private drop;
        protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
        protected onStartDrag(): void;
        protected getShortcutText(draggedElement: IShortcutText): string;
        protected createDraggedElementShortcut(text: string, draggedElementNode?: HTMLElement, event?: PointerEvent): HTMLElement;
        protected getDraggedElementClass(): string;
        protected doDragOver(dropTargetNode?: HTMLElement, event?: PointerEvent): void;
        protected afterDragOver(dropTargetNode?: HTMLElement, event?: PointerEvent): void;
        getGhostPosition(item: any): string;
        protected abstract isDropTargetValid(dropTarget: any, dropTargetNode?: HTMLElement): boolean;
        private handlePointerCancel;
        protected handleEscapeButton: (event: KeyboardEvent) => void;
        private moveShortcutElement;
        private getShortcutBottomCoordinate;
        private getShortcutRightCoordinate;
        private doScroll;
        protected banDropHere: () => void;
        protected doBanDropHere: () => void;
        protected getDataAttributeValueByNode(node: HTMLElement): string;
        protected getDropTargetByNode(dropTargetNode: HTMLElement, event: PointerEvent): any;
        private capitalizeFirstLetter;
        protected abstract getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode?: HTMLElement, event?: PointerEvent): any;
        protected calculateVerticalMiddleOfHTMLElement(HTMLElement: HTMLElement): number;
        protected calculateHorizontalMiddleOfHTMLElement(HTMLElement: HTMLElement): number;
        protected abstract calculateIsBottom(clientY: number, dropTargetNode?: HTMLElement): boolean;
        private findDropTargetNodeFromPoint;
        protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
        protected abstract doDrop(): any;
        protected clear: () => void;
        protected doClear(): void;
    }
}
declare module "dragdrop/matrix-rows" {
    import { MatrixDropdownRowModelBase } from "question_matrixdropdownbase";
    import { QuestionMatrixDynamicModel } from "question_matrixdynamic";
    import { DragDropCore } from "dragdrop/core";
    export class DragDropMatrixRows extends DragDropCore<QuestionMatrixDynamicModel> {
        protected get draggedElementType(): string;
        protected createDraggedElementShortcut(text: string, draggedElementNode: HTMLElement, event: PointerEvent): HTMLElement;
        private fromIndex;
        private toIndex;
        protected getDropTargetByDataAttributeValue(dataAttributeValue: any): MatrixDropdownRowModelBase;
        protected isDropTargetValid(dropTarget: any): boolean;
        protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
        protected calculateIsBottom(clientY: number): boolean;
        protected afterDragOver(dropTargetNode: HTMLElement): void;
        protected doDrop: () => QuestionMatrixDynamicModel;
        protected doClear(): void;
    }
}
declare module "utils/dragOrClickHelper" {
    export class DragOrClickHelper {
        private dragHandler;
        private pointerDownEvent;
        private currentTarget;
        private startX;
        private startY;
        private currentX;
        private currentY;
        private itemModel;
        constructor(dragHandler: any);
        onPointerDown(pointerDownEvent: any, itemModel?: any): void;
        private onPointerUp;
        private tryToStartDrag;
        private get isMicroMovement();
        private clearListeners;
    }
}
declare module "question_matrixdynamic" {
    import { QuestionMatrixDropdownModelBase, MatrixDropdownRowModelBase, IMatrixDropdownData } from "question_matrixdropdownbase";
    import { LocalizableString } from "localizablestring";
    import { SurveyError } from "survey-error";
    import { DragDropMatrixRows } from "dragdrop/matrix-rows";
    import { IShortcutText, ISurveyImpl, IProgressInfo } from "base-interfaces";
    import { QuestionMatrixDropdownRenderedTable } from "question_matrixdropdownrendered";
    import { MatrixDropdownColumn } from "question_matrixdropdowncolumn";
    export class MatrixDynamicRowModel extends MatrixDropdownRowModelBase implements IShortcutText {
        index: number;
        private dragOrClickHelper;
        constructor(index: number, data: IMatrixDropdownData, value: any);
        get rowName(): string;
        get shortcutText(): string;
    }
    /**
      * A class that describes the Dynamic Matrix question type.
      *
      * Dynamic Matrix allows respondents to add and delete matrix rows. You can use the [Dropdown](https://surveyjs.io/form-library/documentation/questiondropdownmodel), [Checkbox](https://surveyjs.io/form-library/documentation/questioncheckboxmodel), [Radiogroup](https://surveyjs.io/form-library/documentation/questionradiogroupmodel), [Text](https://surveyjs.io/form-library/documentation/questiontextmodel), and [Comment](https://surveyjs.io/form-library/documentation/questioncommentmodel) question types as cell editors.
      *
      * [View Demo](https://surveyjs.io/form-library/examples/questiontype-matrixdynamic/ (linkStyle))
      */
    export class QuestionMatrixDynamicModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        onGetValueForNewRowCallBack: (sender: QuestionMatrixDynamicModel) => any;
        private rowCounter;
        private initialRowCount;
        private setRowCountValueFromData;
        constructor(name: string);
        dragDropMatrixRows: DragDropMatrixRows;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        private draggedRow;
        private isBanStartDrag;
        onPointerDown(pointerDownEvent: PointerEvent, row: MatrixDropdownRowModelBase): void;
        startDragMatrixRow: (event: PointerEvent, currentTarget: HTMLElement) => void;
        getType(): string;
        get isRowsDynamic(): boolean;
        /**
         * Specifies whether to display a confirmation dialog when a respondent wants to delete a row.
         *
         * Default value: `false`
         * @see confirmDeleteText
         */
        get confirmDelete(): boolean;
        set confirmDelete(val: boolean);
        /**
         * Specifies a key column. Set this property to a column name, and the question will display `keyDuplicationError` if a user tries to enter a duplicate value in this column.
         * @see keyDuplicationError
         */
        get keyName(): string;
        set keyName(val: string);
        /**
         * If it is not empty, then this value is set to every new row, including rows created initially, unless the defaultValue is not empty
         * @see defaultValue
         * @see defaultValueFromLastRow
         */
        get defaultRowValue(): any;
        set defaultRowValue(val: any);
        /**
         * Specifies whether default values for a new row/column should be copied from the last row/column.
         *
         * If you also specify `defaultValue`, it will be merged with the copied values.
         * @see defaultValue
         */
        get defaultValueFromLastRow(): boolean;
        set defaultValueFromLastRow(val: boolean);
        protected isDefaultValueEmpty(): boolean;
        protected valueFromData(val: any): any;
        protected setDefaultValue(): void;
        moveRowByIndex: (fromIndex: number, toIndex: number) => void;
        /**
         * The number of rows in the matrix.
         * @see minRowCount
         * @see maxRowCount
         */
        get rowCount(): number;
        set rowCount(val: number);
        protected updateProgressInfoByValues(res: IProgressInfo): void;
        private getValueForNewRow;
        /**
         * Specifies whether users can drag and drop matrix rows to reorder them.
         *
         * Default value: `false`
         */
        get allowRowsDragAndDrop(): boolean;
        set allowRowsDragAndDrop(val: boolean);
        get iconDragElement(): string;
        protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
        private get rowCountValue();
        private set rowCountValue(value);
        /**
         * A minimum number of rows in the matrix. Users cannot delete rows if `rowCount` equals `minRowCount`.
         *
         * Default value: 0
         * @see rowCount
         * @see maxRowCount
         * @see allowRemoveRows
         */
        get minRowCount(): number;
        set minRowCount(val: number);
        /**
         * A maximum number of rows in the matrix. Users cannot add new rows if `rowCount` equals `maxRowCount`.
         *
         * Default value: 1000 (inherited from [`settings.matrixMaximumRowCount`](https://surveyjs.io/form-library/documentation/settings#matrixMaximumRowCount))
         * @see rowCount
         * @see minRowCount
         * @see allowAddRows
         */
        get maxRowCount(): number;
        set maxRowCount(val: number);
        /**
         * Specifies whether users are allowed to add new rows.
         *
         * Default value: `true`
         * @see canAddRow
         * @see allowRemoveRows
         */
        get allowAddRows(): boolean;
        set allowAddRows(val: boolean);
        /**
         * Specifies whether users are allowed to delete rows.
         *
         * Default value: `true`
         * @see canRemoveRows
         * @see allowAddRows
         */
        get allowRemoveRows(): boolean;
        set allowRemoveRows(val: boolean);
        /**
         * Indicates whether it is possible to add a new row.
         *
         * This property returns `true` when all of the following conditions apply:
         *
         * - Users are allowed to add new rows (`allowAddRows` is `true`).
         * - The question, its parent panel, or survey is not in read-only state.
         * - `rowCount` is less than `maxRowCount`.
         * @see allowAddRows
         * @see isReadOnly
         * @see rowCount
         * @see maxRowCount
         * @see canRemoveRows
         */
        get canAddRow(): boolean;
        canRemoveRowsCallback: (allow: boolean) => boolean;
        /**
         * Indicates whether it is possible to delete rows.
         *
         * This property returns `true` when all of the following conditions apply:
         *
         * - Users are allowed to delete rows (`allowRemoveRows` is `true`).
         * - The question, its parent panel, or survey is not in read-only state.
         * - `rowCount` exceeds `minRowCount`.
         * @see allowRemoveRows
         * @see isReadOnly
         * @see rowCount
         * @see minRowCount
         * @see canAddRow
         */
        get canRemoveRows(): boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        addRowUI(): void;
        private getQuestionToFocusOnAddingRow;
        /**
         * Creates and adds a new row to the matrix.
         * @param setFocus *Optional.* Pass `true` to focus the cell in the first column.
         */
        addRow(setFocus?: boolean): void;
        /**
         * Specifies whether to expand the detail section immediately when a respondent adds a new row.
         * @see detailPanelMode
         */
        get detailPanelShowOnAdding(): boolean;
        set detailPanelShowOnAdding(val: boolean);
        protected hasRowsAsItems(): boolean;
        unbindValue(): void;
        protected isValueSurveyElement(val: any): boolean;
        private addRowCore;
        private getDefaultRowValue;
        removeRowUI(value: any): void;
        isRequireConfirmOnRowDelete(index: number): boolean;
        /**
         * Removes a matrix row with a specified index.
         * @param index A zero-based row index.
         * @param confirmDelete *Optional.* A Boolean value that specifies whether to display a confirmation dialog. If you do not specify this parameter, the [`confirmDelete`](https://surveyjs.io/form-library/documentation/api-reference/dynamic-matrix-table-question-model#confirmDelete) property value is used.
         */
        removeRow(index: number, confirmDelete?: boolean): void;
        private removeRowCore;
        /**
         * A message displayed in a confirmation dialog that appears when a respondent wants to delete a row.
         * @see confirmDelete
         */
        get confirmDeleteText(): string;
        set confirmDeleteText(val: string);
        get locConfirmDeleteText(): LocalizableString;
        /**
         * A caption for the Add Row button.
         * @see addRowLocation
         */
        get addRowText(): string;
        set addRowText(val: string);
        get locAddRowText(): LocalizableString;
        private get defaultAddRowText();
        /**
         * Specifies the location of the Add Row button.
         *
         * Possible values:
         *
         * - `"top"` - Displays the Add Row button at the top of the matrix.
         * - `"bottom"` - Displays the Add Row button at the bottom of the matrix.
         * - `"topBottom"` - Displays the Add Row button at the top and bottom of the matrix.
         *
         * Default value: `"top"` if `columnLayout` is `vertical`; `"bottom"` if `columnLayout` is `"horizontal"` or the matrix is in compact mode.
         * @see columnLayout
         * @see addRowText
         */
        get addRowLocation(): string;
        set addRowLocation(val: string);
        getAddRowLocation(): string;
        /**
         * Specifies whether to hide columns when the matrix does not contain any rows. If you enable this property, the matrix displays the `emptyRowsText` message and the Add Row button.
         *
         * Default value: `false`
         * @see emptyRowsText
         */
        get hideColumnsIfEmpty(): boolean;
        set hideColumnsIfEmpty(val: boolean);
        getShowColumnsIfEmpty(): boolean;
        /**
         * Use this property to change the default value of remove row button text.
         */
        get removeRowText(): string;
        set removeRowText(val: string);
        get locRemoveRowText(): LocalizableString;
        /**
         * A message displayed when the matrix does not contain any rows. Applies only if `hideColumnsIfEmpty` is enabled.
         * @see hideColumnsIfEmpty
         */
        get emptyRowsText(): string;
        set emptyRowsText(val: string);
        get locEmptyRowsText(): LocalizableString;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected getConditionObjectRowName(index: number): string;
        protected getConditionObjectsRowIndeces(): Array<number>;
        supportGoNextPageAutomatic(): boolean;
        get hasRowText(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        private hasErrorInMinRows;
        protected getUniqueColumns(): Array<MatrixDropdownColumn>;
        protected generateRows(): Array<MatrixDynamicRowModel>;
        protected createMatrixRow(value: any): MatrixDynamicRowModel;
        protected onBeforeValueChanged(val: any): void;
        protected createNewValue(): any;
        protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
        private getRowValueByIndex;
        protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
        getAddRowButtonCss(isEmptySection?: boolean): string;
        getRemoveRowButtonCss(): string;
        getRootCss(): string;
    }
}
declare module "question_matrixdropdownrendered" {
    import { Question } from "question";
    import { Base } from "base";
    import { ItemValue } from "itemvalue";
    import { LocalizableString } from "localizablestring";
    import { PanelModel } from "panel";
    import { IAction } from "actions/action";
    import { MatrixDropdownColumn } from "question_matrixdropdowncolumn";
    import { MatrixDropdownCell, MatrixDropdownRowModelBase, QuestionMatrixDropdownModelBase } from "question_matrixdropdownbase";
    export class QuestionMatrixDropdownRenderedCell {
        private static counter;
        private idValue;
        private itemValue;
        minWidth: string;
        width: string;
        locTitle: LocalizableString;
        cell: MatrixDropdownCell;
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        question: Question;
        isRemoveRow: boolean;
        choiceIndex: number;
        isOtherChoice: boolean;
        matrix: QuestionMatrixDropdownModelBase;
        requiredText: string;
        isEmpty: boolean;
        colSpans: number;
        panel: PanelModel;
        isShowHideDetail: boolean;
        isActionsCell: boolean;
        isDragHandlerCell: boolean;
        private classNameValue;
        constructor();
        get hasQuestion(): boolean;
        get hasTitle(): boolean;
        get hasPanel(): boolean;
        get id(): number;
        get showErrorOnTop(): boolean;
        get showErrorOnBottom(): boolean;
        private showErrorOnCore;
        private getShowErrorLocation;
        get item(): ItemValue;
        set item(val: ItemValue);
        get isChoice(): boolean;
        get isItemChoice(): boolean;
        get choiceValue(): any;
        get isCheckbox(): boolean;
        get isRadio(): boolean;
        get isFirstChoice(): boolean;
        set className(val: string);
        get className(): string;
        get headers(): string;
        getTitle(): string;
        calculateFinalClassName(matrixCssClasses: any): string;
    }
    export class QuestionMatrixDropdownRenderedRow extends Base {
        cssClasses: any;
        isDetailRow: boolean;
        isGhostRow: boolean;
        isAdditionalClasses: boolean;
        row: MatrixDropdownRowModelBase;
        private static counter;
        private idValue;
        cells: Array<QuestionMatrixDropdownRenderedCell>;
        constructor(cssClasses: any, isDetailRow?: boolean);
        get id(): number;
        get attributes(): {
            "data-sv-drop-target-matrix-row"?: undefined;
        } | {
            "data-sv-drop-target-matrix-row": string;
        };
        get className(): string;
    }
    export class QuestionMatrixDropdownRenderedTable extends Base {
        matrix: QuestionMatrixDropdownModelBase;
        private headerRowValue;
        private footerRowValue;
        private hasRemoveRowsValue;
        private rowsActions;
        private cssClasses;
        renderedRowsChangedCallback: () => void;
        rows: Array<QuestionMatrixDropdownRenderedRow>;
        constructor(matrix: QuestionMatrixDropdownModelBase);
        get showTable(): boolean;
        get showHeader(): boolean;
        get showAddRowOnTop(): boolean;
        get showAddRowOnBottom(): boolean;
        get showFooter(): boolean;
        get hasFooter(): boolean;
        get hasRemoveRows(): boolean;
        isRequireReset(): boolean;
        get headerRow(): QuestionMatrixDropdownRenderedRow;
        get footerRow(): QuestionMatrixDropdownRenderedRow;
        get allowRowsDragAndDrop(): boolean;
        protected build(): void;
        updateShowTableAndAddRow(): void;
        onAddedRow(): void;
        private getRenderedDataRowCount;
        onRemovedRow(row: MatrixDropdownRowModelBase): void;
        onDetailPanelChangeVisibility(row: MatrixDropdownRowModelBase, isShowing: boolean): void;
        private getRenderedRowIndex;
        protected buildRowsActions(): void;
        protected createRenderedRow(cssClasses: any, isDetailRow?: boolean): QuestionMatrixDropdownRenderedRow;
        protected buildHeader(): void;
        protected buildFooter(): void;
        protected buildRows(): void;
        private hasActionCellInRowsValues;
        private hasActionCellInRows;
        private hasActionsCellInLocaltion;
        private canRemoveRow;
        private buildHorizontalRows;
        private addHorizontalRow;
        private getRowDragCell;
        private getActionsCellClassName;
        private getRowActionsCell;
        private getRowActions;
        private buildRowActions;
        private get showRemoveButtonAsIcon();
        protected setDefaultRowActions(row: MatrixDropdownRowModelBase, actions: Array<IAction>): void;
        private createHorizontalRow;
        private addRowActionsCell;
        private createDetailPanelRow;
        private buildVerticalRows;
        private createMutlipleVerticalRows;
        private createVerticalRow;
        private createEndVerticalActionRow;
        private createMutlipleEditCells;
        private setItemCellCssClasses;
        private createEditCell;
        private createMutlipleColumnsFooter;
        private createMutlipleColumnsHeader;
        private getMultipleColumnChoices;
        private setHeaderCellCssClasses;
        private createHeaderCell;
        private setHeaderCell;
        private setHeaderCellWidth;
        private setRequriedToHeaderCell;
        private createRemoveRowCell;
        private createTextCell;
        private createEmptyCell;
    }
}
declare module "question_matrixdropdownbase" {
    import { QuestionMatrixBaseModel } from "martixBase";
    import { Question, IConditionObject } from "question";
    import { HashTable } from "helpers";
    import { Base } from "base";
    import { IElement, IQuestion, ISurveyData, ISurvey, ISurveyImpl, ITextProcessor, IProgressInfo, IPanel } from "base-interfaces";
    import { ItemValue } from "itemvalue";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { PanelModel } from "panel";
    import { SurveyError } from "survey-error";
    import { MatrixDropdownColumn } from "question_matrixdropdowncolumn";
    import { QuestionMatrixDropdownRenderedCell, QuestionMatrixDropdownRenderedRow, QuestionMatrixDropdownRenderedTable } from "question_matrixdropdownrendered";
    export interface IMatrixDropdownData {
        value: any;
        onRowChanged(row: MatrixDropdownRowModelBase, columnName: string, newRowValue: any, isDeletingValue: boolean): void;
        onRowChanging(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): any;
        isValidateOnValueChanging: boolean;
        getRowIndex(row: MatrixDropdownRowModelBase): number;
        getRowValue(rowIndex: number): any;
        checkIfValueInRowDuplicated(checkedRow: MatrixDropdownRowModelBase, cellQuestion: Question): boolean;
        hasDetailPanel(row: MatrixDropdownRowModelBase): boolean;
        getIsDetailPanelShowing(row: MatrixDropdownRowModelBase): boolean;
        setIsDetailPanelShowing(row: MatrixDropdownRowModelBase, val: boolean): void;
        createRowDetailPanel(row: MatrixDropdownRowModelBase): PanelModel;
        validateCell(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): SurveyError;
        columns: Array<MatrixDropdownColumn>;
        createQuestion(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        getParentTextProcessor(): ITextProcessor;
        getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
        onTotalValueChanged(): any;
        getSurvey(): ISurvey;
    }
    export class MatrixDropdownCell {
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        data: IMatrixDropdownData;
        private questionValue;
        constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
        locStrsChanged(): void;
        protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
        get question(): Question;
        get value(): any;
        set value(value: any);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
    }
    export class MatrixDropdownTotalCell extends MatrixDropdownCell {
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        data: IMatrixDropdownData;
        constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
        protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
        locStrsChanged(): void;
        updateCellQuestion(): void;
        getTotalExpression(): string;
    }
    export class MatrixDropdownRowModelBase implements ISurveyData, ISurveyImpl, ILocalizableOwner {
        static RowVariableName: string;
        static OwnerVariableName: string;
        static IndexVariableName: string;
        static RowValueVariableName: string;
        private static idCounter;
        private static getId;
        protected data: IMatrixDropdownData;
        protected isSettingValue: boolean;
        private idValue;
        private textPreProcessor;
        private detailPanelValue;
        cells: Array<MatrixDropdownCell>;
        showHideDetailPanelClick: any;
        onDetailPanelShowingChanged: () => void;
        constructor(data: IMatrixDropdownData, value: any);
        get id(): string;
        get rowName(): any;
        get text(): any;
        get value(): any;
        set value(value: any);
        get locText(): LocalizableString;
        get hasPanel(): boolean;
        get detailPanel(): PanelModel;
        get detailPanelId(): string;
        get isDetailPanelShowing(): boolean;
        private setIsDetailPanelShowing;
        private showHideDetailPanel;
        private isCreatingDetailPanel;
        showDetailPanel(): void;
        hideDetailPanel(destroyPanel?: boolean): void;
        private ensureDetailPanel;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        clearValue(): void;
        onAnyValueChanged(name: string): void;
        getDataValueCore(valuesHash: any, key: string): any;
        getValue(name: string): any;
        setValue(name: string, newColumnValue: any): void;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): void;
        findQuestionByName(name: string): IQuestion;
        private setValueCore;
        private updateQuestionsValue;
        private hasQuestonError;
        get isEmpty(): boolean;
        getQuestionByColumn(column: MatrixDropdownColumn): Question;
        getCellByColumn(column: MatrixDropdownColumn): MatrixDropdownCell;
        private getCellByColumnName;
        getQuestionByColumnName(columnName: string): Question;
        get questions(): Array<Question>;
        getQuestionByName(name: string): Question;
        getQuestionsByName(name: string): Array<Question>;
        protected getSharedQuestionByName(columnName: string): Question;
        clearIncorrectValues(val: any): void;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        locStrsChanged(): void;
        updateCellQuestionOnColumnChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        updateCellQuestionOnColumnItemValueChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
        onQuestionReadOnlyChanged(parentIsReadOnly: boolean): void;
        hasErrors(fireCallback: boolean, rec: any, raiseOnCompletedAsyncValidators: () => void): boolean;
        protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
        updateCellOnColumnItemValueChanged(cell: MatrixDropdownCell, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
        protected buildCells(value: any): void;
        protected isTwoValueEquals(val1: any, val2: any): boolean;
        private getCellValue;
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        get rowIndex(): number;
        get editingObj(): Base;
        private onEditingObjPropertyChanged;
        private editingObjValue;
        dispose(): void;
        private subscribeToChanges;
        private updateOnSetValue;
    }
    export class MatrixDropdownTotalRowModel extends MatrixDropdownRowModelBase {
        constructor(data: IMatrixDropdownData);
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        setValue(name: string, newValue: any): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
    }
    /**
     * A base class for the [QuestionMatrixDropdownModel](https://surveyjs.io/form-library/documentation/questionmatrixdropdownmodel) and [QuestionMatrixDynamicModel](https://surveyjs.io/form-library/documentation/questionmatrixdynamicmodel) classes.
     */
    export class QuestionMatrixDropdownModelBase extends QuestionMatrixBaseModel<MatrixDropdownRowModelBase, MatrixDropdownColumn> implements IMatrixDropdownData {
        static get defaultCellType(): string;
        static set defaultCellType(val: string);
        static addDefaultColumns(matrix: QuestionMatrixDropdownModelBase): void;
        private detailPanelValue;
        private isUniqueCaseSensitiveValue;
        protected isRowChanging: boolean;
        columnsChangedCallback: () => void;
        onRenderedTableResetCallback: () => void;
        onRenderedTableCreatedCallback: (table: QuestionMatrixDropdownRenderedTable) => void;
        onCellCreatedCallback: (options: any) => void;
        onCellValueChangedCallback: (options: any) => void;
        onHasDetailPanelCallback: (row: MatrixDropdownRowModelBase) => boolean;
        onCreateDetailPanelCallback: (row: MatrixDropdownRowModelBase, panel: PanelModel) => void;
        onCreateDetailPanelRenderedRowCallback: (renderedRow: QuestionMatrixDropdownRenderedRow) => void;
        onAddColumn: (column: MatrixDropdownColumn) => void;
        onRemoveColumn: (column: MatrixDropdownColumn) => void;
        protected createColumnValues(): any[];
        constructor(name: string);
        getType(): string;
        dispose(): void;
        get hasSingleInput(): boolean;
        get isRowsDynamic(): boolean;
        private isUpdating;
        protected get isUpdateLocked(): boolean;
        beginUpdate(): void;
        endUpdate(): void;
        protected updateColumnsAndRows(): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        /**
         * Specifies the matrix layout. Set this property to `"vertical"` if you want to display columns instead of rows and rows instead of columns.
         *
         * Default value: `"horizontal"`
         * @see columns
         * @see rows
         * @see isColumnLayoutHorizontal
         */
        get columnLayout(): string;
        set columnLayout(val: string);
        get columnsLocation(): string;
        set columnsLocation(val: string);
        /**
         * Returns `true` if columns are placed in the horizontal direction and rows in the vertical direction.
         *
         * To specify the layout, use the `columnLayout` property. If you set it to `"vertical"`, the survey applies it only when the screen has enough space. Otherwise, the survey falls back to the horizontal layout, but the `columnLayout` property remains set to `"vertical"`. Unlike `columnLayout`, the `isColumnLayoutHorizontal` property always indicates the current layout.
         * @see columnLayout
         */
        get isColumnLayoutHorizontal(): boolean;
        /**
         * Enables case-sensitive comparison in columns with the `isUnique` property set to `true`.
         *
         * When this property is `true`, `"ABC"` and `"abc"` are considered different values.
         *
         * Default value: `false`
         * @see keyDuplicationError
         */
        get isUniqueCaseSensitive(): boolean;
        set isUniqueCaseSensitive(val: boolean);
        /**
         * Specifies the location of detail sections.
         *
         * Possible values:
         *
         * - `"underRow"` - Displays detail sections under their respective rows. Users can expand any number of detail sections.
         * - `"underRowSingle"` - Displays detail sections under their respective rows, but only one detail section can be expanded at a time.
         * - `"none"` (default) - Hides detail sections.
         *
         * Use the `detailElements` property to specify content of detail sections.
         * @see detailElements
         * @see detailPanel
         */
        get detailPanelMode(): string;
        set detailPanelMode(val: string);
        /**
         * Contains a [`PanelModel`](https://surveyjs.io/form-library/documentation/panelmodel) instance that represents a detail section template.
         * @see detailElements
         * @see detailPanelMode
         */
        get detailPanel(): PanelModel;
        getPanel(): IPanel;
        /**
         * An array of survey elements (questions and panels) to be displayed in detail sections.
         *
         * Detail sections are expandable panels displayed under each matrix row. You can use them to display questions that do not fit into the row.
         *
         * Set the `detailPanelMode` property to `"underRow"` or `"underRowSingle"` to display detail sections.
         * @see detailPanelMode
         * @see detailPanel
         */
        get detailElements(): Array<IElement>;
        protected createNewDetailPanel(): PanelModel;
        get hasRowText(): boolean;
        getFooterText(): LocalizableString;
        get canAddRow(): boolean;
        get canRemoveRows(): boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        onPointerDown(pointerDownEvent: PointerEvent, row: MatrixDropdownRowModelBase): void;
        protected onRowsChanged(): void;
        private lockResetRenderedTable;
        protected onStartRowAddingRemoving(): void;
        protected onEndRowAdding(): void;
        protected onEndRowRemoving(row: MatrixDropdownRowModelBase): void;
        private get renderedTableValue();
        private set renderedTableValue(value);
        protected clearRowsAndResetRenderedTable(): void;
        protected resetRenderedTable(): void;
        protected clearGeneratedRows(): void;
        get renderedTable(): QuestionMatrixDropdownRenderedTable;
        protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
        protected onMatrixRowCreated(row: MatrixDropdownRowModelBase): void;
        /**
         * Specifies the type of matrix cells. You can override this property for individual columns.
         *
         * Possible values:
         *
         * - `"dropdown"`
         * - `"checkbox"`
         * - `"radiogroup"`
         * - `"text"`
         * - `"comment"`
         * - `"boolean"`
         * - `"expression"`
         * - `"rating"`
         *
         * Default value: "dropdown" (inherited from [`settings.matrixDefaultCellType`](https://surveyjs.io/form-library/documentation/settings#matrixDefaultCellType))
         */
        get cellType(): string;
        set cellType(val: string);
        private updateColumnsCellType;
        private updateColumnsIndexes;
        /**
         * Specifies the number of columns in Radiogroup and Checkbox cells.
         *
         * Default value: 0 (the number of columns is selected automatically based on the available column width)
         * @see cellType
         */
        get columnColCount(): number;
        set columnColCount(value: number);
        get horizontalScroll(): boolean;
        set horizontalScroll(val: boolean);
        get allowAdaptiveActions(): boolean;
        set allowAdaptiveActions(val: boolean);
        getRequiredText(): string;
        hasChoices(): boolean;
        onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        onColumnItemValuePropertyChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
        onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
        onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
        getRowTitleWidth(): string;
        get hasFooter(): boolean;
        getAddRowLocation(): string;
        getShowColumnsIfEmpty(): boolean;
        protected updateShowTableAndAddRow(): void;
        protected updateHasFooter(): void;
        get hasTotal(): boolean;
        getCellType(): string;
        getCustomCellType(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, cellType: string): string;
        getConditionJson(operator?: string, path?: string): any;
        clearIncorrectValues(): void;
        clearErrors(): void;
        localeChanged(): void;
        private runFuncForCellQuestions;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected shouldRunColumnExpression(): boolean;
        protected runCellsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        private checkColumnsVisibility;
        private checkColumnsRenderedRequired;
        private isColumnVisibilityChanged;
        protected runTotalsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        private getRowConditionValues;
        locStrsChanged(): void;
        /**
         * Returns a matrix column with a given `name` or `null` if a column with this is not found.
         * @param columnName A column name.
         */
        getColumnByName(columnName: string): MatrixDropdownColumn;
        getColumnName(columnName: string): MatrixDropdownColumn;
        getColumnWidth(column: MatrixDropdownColumn): string;
        /**
         * Gets or sets choice items for Dropdown, Checkbox, and Radiogroup matrix cells. You can override this property for individual columns.
         *
         * This property accepts an array of objects with the following structure:
         *
         * ```js
         * {
         *   "value": any, // A value to be saved in survey results
         *   "text": String, // A display text. This property supports Markdown. When `text` is undefined, `value` is used.
         *   "customProperty": any // Any property that you find useful.
         * }
         * ```
         *
         * To enable Markdown support for the `text` property, implement Markdown-to-HTML conversion in the [onTextMarkdown](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onTextMarkdown) event handler. For an example, refer to the following demo: [Convert Markdown to HTML with Showdown](https://surveyjs.io/form-library/examples/edit-survey-questions-markdown/).
         *
         * If you add custom properties, refer to the following help topic to learn how to serialize them into JSON: [Add Custom Properties to Property Grid](https://surveyjs.io/survey-creator/documentation/property-grid#add-custom-properties-to-the-property-grid).
         *
         * If you need to specify only the `value` property, you can set the `choices` property to an array of primitive values, for example, `[ "item1", "item2", "item3" ]`. These values are both saved in survey results and used as display text.
         * @see cellType
         */
        get choices(): Array<any>;
        set choices(val: Array<any>);
        /**
         * A placeholder for Dropdown matrix cells.
         * @see cellType
         */
        get placeholder(): string;
        set placeholder(val: string);
        get locPlaceholder(): LocalizableString;
        get optionsCaption(): string;
        set optionsCaption(val: string);
        /**
         * An error message displayed when users enter a duplicate value into a column that accepts only unique values (`isUnique` is set to `true` or `keyName` is specified).
         *
         * A default value for this property is taken from a [localization dictionary](https://github.com/surveyjs/survey-library/tree/master/src/localization). Refer to the following help topic for more information: [Localization & Globalization](https://surveyjs.io/form-library/documentation/localization).
         * @see isUniqueCaseSensitive
         */
        get keyDuplicationError(): string;
        set keyDuplicationError(val: string);
        get locKeyDuplicationError(): LocalizableString;
        get storeOthersAsComment(): boolean;
        addColumn(name: string, title?: string): MatrixDropdownColumn;
        protected getVisibleRows(): Array<MatrixDropdownRowModelBase>;
        private updateValueOnRowsGeneration;
        get totalValue(): any;
        protected getVisibleTotalRow(): MatrixDropdownRowModelBase;
        get visibleTotalRow(): MatrixDropdownRowModelBase;
        onSurveyLoad(): void;
        /**
         * Returns an object with row values. If a row has no answers, this method returns an empty object.
         * @param rowIndex A zero-based row index.
         * @see setRowValue
         */
        getRowValue(rowIndex: number): any;
        checkIfValueInRowDuplicated(checkedRow: MatrixDropdownRowModelBase, cellQuestion: Question): boolean;
        /**
         * Assigns values to a row.
         * @param rowIndex A zero-based row index.
         * @param rowValue An object with the following structure: `{ "column_name": columnValue, ... }`
         * @see getRowValue
         */
        setRowValue(rowIndex: number, rowValue: any): any;
        protected generateRows(): Array<MatrixDropdownRowModelBase>;
        protected generateTotalRow(): MatrixDropdownRowModelBase;
        protected createNewValue(nullOnEmpty?: boolean): any;
        protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
        protected getRowObj(row: MatrixDropdownRowModelBase): any;
        protected getRowDisplayValue(keysAsText: boolean, row: MatrixDropdownRowModelBase, rowValue: any): any;
        getPlainData(options?: {
            includeEmpty?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): import("question").IQuestionPlainData;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        protected getConditionObjectRowName(index: number): string;
        protected getConditionObjectRowText(index: number): string;
        protected getConditionObjectsRowIndeces(): Array<number>;
        getProgressInfo(): IProgressInfo;
        protected updateProgressInfoByValues(res: IProgressInfo): void;
        protected updateProgressInfoByRow(res: IProgressInfo, rowValue: any): void;
        private getCellQuestions;
        protected onBeforeValueChanged(val: any): void;
        private onSetQuestionValue;
        protected setQuestionValue(newValue: any): void;
        supportGoNextPageAutomatic(): boolean;
        protected getContainsErrors(): boolean;
        protected getIsAnswered(): boolean;
        private checkForAnswersOrErrors;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        protected getIsRunningValidators(): boolean;
        getAllErrors(): Array<SurveyError>;
        private hasErrorInRows;
        private isValueDuplicated;
        private isValueInColumnDuplicated;
        protected getUniqueColumns(): Array<MatrixDropdownColumn>;
        private isValueDuplicatedInRow;
        private addDuplicationError;
        getFirstQuestionToFocus(withError: boolean): Question;
        protected getFirstInputElementId(): string;
        protected getFirstErrorInputElementId(): string;
        protected getFirstCellQuestion(onError: boolean): Question;
        protected onReadOnlyChanged(): void;
        createQuestion(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
        protected createQuestionCore(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
        protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
        private isDoingonAnyValueChanged;
        onAnyValueChanged(name: string): void;
        protected isObject(value: any): boolean;
        private getOnCellValueChangedOptions;
        protected onCellValueChanged(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): void;
        validateCell(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): SurveyError;
        get isValidateOnValueChanging(): boolean;
        onRowChanging(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): any;
        onRowChanged(row: MatrixDropdownRowModelBase, columnName: string, newRowValue: any, isDeletingValue: boolean): void;
        private getNewValueOnRowChanged;
        getRowIndex(row: MatrixDropdownRowModelBase): number;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        hasDetailPanel(row: MatrixDropdownRowModelBase): boolean;
        getIsDetailPanelShowing(row: MatrixDropdownRowModelBase): boolean;
        setIsDetailPanelShowing(row: MatrixDropdownRowModelBase, val: boolean): void;
        getDetailPanelButtonCss(row: MatrixDropdownRowModelBase): string;
        getDetailPanelIconCss(row: MatrixDropdownRowModelBase): string;
        getDetailPanelIconId(row: MatrixDropdownRowModelBase): string;
        private updateDetailPanelButtonCss;
        createRowDetailPanel(row: MatrixDropdownRowModelBase): PanelModel;
        getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
        onTotalValueChanged(): any;
        getParentTextProcessor(): ITextProcessor;
        getQuestionFromArray(name: string, index: number): IQuestion;
        private isMatrixValueEmpty;
        private get SurveyModel();
        getCellTemplateData(cell: QuestionMatrixDropdownRenderedCell): any;
        getCellWrapperComponentName(cell: MatrixDropdownCell): string;
        getCellWrapperComponentData(cell: MatrixDropdownCell): any;
        getColumnHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
        getColumnHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
        getRowHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
        getRowHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
        get showHorizontalScroll(): boolean;
        getRootCss(): string;
        protected getIsTooltipErrorInsideSupported(): boolean;
    }
}
declare module "base-interfaces" {
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { HashTable } from "helpers";
    import { MatrixDropdownRowModelBase, QuestionMatrixDropdownModelBase } from "question_matrixdropdownbase";
    import { AdaptiveActionContainer } from "actions/adaptive-container";
    import { SurveyError } from "survey-error";
    import { Base } from "base";
    import { IAction } from "actions/action";
    import { PanelModel } from "panel";
    import { QuestionPanelDynamicModel } from "question_paneldynamic";
    export interface ISurveyData {
        getValue(name: string): any;
        setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): any;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        findQuestionByName(name: string): IQuestion;
    }
    export interface ITextProcessor {
        processText(text: string, returnDisplayValue: boolean): string;
        processTextEx(text: string, returnDisplayValue: boolean, doEncoding: boolean): any;
    }
    export interface ISurveyErrorOwner extends ILocalizableOwner {
        getErrorCustomText(text: string, error: SurveyError): string;
    }
    export interface ISurvey extends ITextProcessor, ISurveyErrorOwner {
        getSkeletonComponentName(element: ISurveyElement): string;
        currentPage: IPage;
        pages: Array<IPage>;
        getCss(): any;
        isPageStarted(page: IPage): boolean;
        getQuestionByName(name: string): IQuestion;
        pageVisibilityChanged(page: IPage, newValue: boolean): any;
        panelVisibilityChanged(panel: IPanel, newValue: boolean): any;
        questionVisibilityChanged(question: IQuestion, newValue: boolean): any;
        isEditingSurveyElement: boolean;
        isClearValueOnHidden: boolean;
        isClearValueOnHiddenContainer: boolean;
        questionsOrder: string;
        keepIncorrectValues: boolean;
        questionCreated(question: IQuestion): any;
        questionAdded(question: IQuestion, index: number, parentPanel: any, rootPanel: any): any;
        panelAdded(panel: IElement, index: number, parentPanel: any, rootPanel: any): any;
        questionRemoved(question: IQuestion): any;
        panelRemoved(panel: IElement): any;
        questionRenamed(question: IQuestion, oldName: string, oldValueName: string): any;
        validateQuestion(question: IQuestion): SurveyError;
        validatePanel(panel: IPanel): SurveyError;
        hasVisibleQuestionByValueName(valueName: string): boolean;
        questionCountByValueName(valueName: string): number;
        processHtml(html: string): string;
        getSurveyMarkdownHtml(element: Base, text: string, name: string): string;
        getRendererForString(element: Base, name: string): string;
        getRendererContextForString(element: Base, locStr: LocalizableString): any;
        getExpressionDisplayValue(question: IQuestion, value: any, displayValue: string): string;
        isDisplayMode: boolean;
        isDesignMode: boolean;
        areInvisibleElementsShowing: boolean;
        areEmptyElementsHidden: boolean;
        isLoadingFromJson: boolean;
        isUpdateValueTextOnTyping: boolean;
        autoGrowComment: boolean;
        state: string;
        isLazyRendering: boolean;
        cancelPreviewByPage(panel: IPanel): any;
        editText: string;
        cssNavigationEdit: string;
        requiredText: string;
        beforeSettingQuestionErrors(question: IQuestion, errors: Array<SurveyError>): void;
        beforeSettingPanelErrors(question: IPanel, errors: Array<SurveyError>): void;
        getSurveyErrorCustomText(obj: Base, text: string, error: SurveyError): string;
        getElementTitleTagName(element: Base, tagName: string): string;
        questionTitlePattern: string;
        getUpdatedQuestionTitle(question: IQuestion, title: string): string;
        getUpdatedQuestionNo(question: IQuestion, no: string): string;
        getUpdatedElementTitleActions(element: ISurveyElement, titleActions: Array<IAction>): Array<IAction>;
        getUpdatedMatrixRowActions(question: QuestionMatrixDropdownModelBase, row: MatrixDropdownRowModelBase, actions: Array<IAction>): Array<IAction>;
        getUpdatedPanelFooterActions(panel: PanelModel, actions: Array<IAction>, question?: QuestionPanelDynamicModel): Array<IAction>;
        questionStartIndex: string;
        questionTitleLocation: string;
        questionDescriptionLocation: string;
        questionErrorLocation: string;
        storeOthersAsComment: boolean;
        maxTextLength: number;
        maxOthersLength: number;
        clearValueOnDisableItems: boolean;
        uploadFiles(question: IQuestion, name: string, files: File[], uploadingCallback: (status: string, data: any) => any): any;
        downloadFile(question: IQuestion, name: string, content: string, callback: (status: string, data: any) => any): any;
        clearFiles(question: IQuestion, name: string, value: any, fileName: string, clearCallback: (status: string, data: any) => any): any;
        updateChoicesFromServer(question: IQuestion, choices: Array<any>, serverResult: any): Array<any>;
        loadedChoicesFromServer(question: IQuestion): void;
        updateQuestionCssClasses(question: IQuestion, cssClasses: any): any;
        updatePanelCssClasses(panel: IPanel, cssClasses: any): any;
        updatePageCssClasses(panel: IPanel, cssClasses: any): any;
        updateChoiceItemCss(question: IQuestion, options: any): any;
        afterRenderQuestion(question: IQuestion, htmlElement: HTMLElement): any;
        afterRenderQuestionInput(question: IQuestion, htmlElement: HTMLElement): any;
        afterRenderPanel(panel: IElement, htmlElement: HTMLElement): any;
        afterRenderPage(htmlElement: HTMLElement): any;
        getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
        canChangeChoiceItemsVisibility(): boolean;
        getChoiceItemVisibility(question: IQuestion, item: any, val: boolean): boolean;
        loadQuestionChoices(options: {
            question: IQuestion;
            filter: string;
            skip: number;
            take: number;
            setItems: (items: Array<any>, totalCount: number) => void;
        }): void;
        getChoiceDisplayValue(options: {
            question: IQuestion;
            values: Array<any>;
            setItems: (displayValues: Array<string>) => void;
        }): void;
        matrixRowAdded(question: IQuestion, row: any): any;
        matrixBeforeRowAdded(options: {
            question: IQuestion;
            canAddRow: boolean;
        }): any;
        matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): any;
        matrixRowRemoving(question: IQuestion, rowIndex: number, row: any): boolean;
        matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
        matrixCellCreating(question: IQuestion, options: any): any;
        matrixCellCreated(question: IQuestion, options: any): any;
        matrixAfterCellRender(question: IQuestion, options: any): any;
        matrixCellValueChanged(question: IQuestion, options: any): any;
        matrixCellValueChanging(question: IQuestion, options: any): any;
        isValidateOnValueChanging: boolean;
        isValidateOnValueChanged: boolean;
        matrixCellValidate(question: IQuestion, options: any): SurveyError;
        dynamicPanelAdded(question: IQuestion, panelIndex?: number, panel?: IPanel): void;
        dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
        dynamicPanelRemoving(question: IQuestion, panelIndex: number, panel: IPanel): boolean;
        dynamicPanelItemValueChanged(question: IQuestion, options: any): any;
        dragAndDropAllow(options: any): boolean;
        scrollElementToTop(element: ISurveyElement, question: IQuestion, page: IPage, id: string): any;
        runExpression(expression: string): any;
        elementContentVisibilityChanged(element: ISurveyElement): void;
    }
    export interface ISurveyImpl {
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
    }
    export interface IConditionRunner {
        runCondition(values: HashTable<any>, properties: HashTable<any>): any;
    }
    export interface IShortcutText {
        shortcutText: string;
    }
    export interface ISurveyElement extends IShortcutText {
        name: string;
        isVisible: boolean;
        isReadOnly: boolean;
        isPage: boolean;
        isPanel: boolean;
        containsErrors: boolean;
        parent: IPanel;
        skeletonComponentName: string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): any;
        onSurveyLoad(): any;
        onFirstRendering(): any;
        getType(): string;
        setVisibleIndex(value: number): number;
        locStrsChanged(): any;
        delete(): any;
        toggleState(): void;
        stateChangedCallback(): void;
        getTitleToolbar(): AdaptiveActionContainer;
        get isCollapsed(): boolean;
        get isExpanded(): boolean;
        expand(): void;
        collapse(): void;
    }
    export interface IElement extends IConditionRunner, ISurveyElement {
        visible: boolean;
        renderWidth: string;
        width: string;
        minWidth?: string;
        maxWidth?: string;
        isExpanded: boolean;
        isCollapsed: boolean;
        rightIndent: number;
        startWithNewLine: boolean;
        registerPropertyChangedHandlers(propertyNames: Array<string>, handler: any, key: string): void;
        registerFunctionOnPropertyValueChanged(name: string, func: any, key: string): void;
        unRegisterFunctionOnPropertyValueChanged(name: string, key: string): void;
        getPanel(): IPanel;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        removeElement(el: IElement): boolean;
        onAnyValueChanged(name: string): any;
        updateCustomWidgets(): any;
        clearIncorrectValues(): any;
        clearErrors(): any;
        dispose(): void;
        needResponsiveWidth(): boolean;
    }
    export interface IQuestion extends IElement, ISurveyErrorOwner {
        hasTitle: boolean;
        isEmpty(): boolean;
        onSurveyValueChanged(newValue: any): any;
        updateValueFromSurvey(newValue: any): any;
        updateCommentFromSurvey(newValue: any): any;
        supportGoNextPageAutomatic(): boolean;
        clearUnusedValues(): any;
        getDisplayValue(keysAsText: boolean, value: any): any;
        getValueName(): string;
        clearValue(): any;
        clearValueIfInvisible(): any;
        isAnswerCorrect(): boolean;
        updateValueWithDefaults(): any;
        getQuestionFromArray(name: string, index: number): IQuestion;
        value: any;
        survey: any;
    }
    export interface IParentElement {
        addElement(element: IElement, index: number): any;
        removeElement(element: IElement): boolean;
        isReadOnly: boolean;
    }
    export interface IPanel extends ISurveyElement, IParentElement {
        getChildrenLayoutType(): string;
        getQuestionTitleLocation(): string;
        getQuestionStartIndex(): string;
        parent: IPanel;
        elementWidthChanged(el: IElement): any;
        indexOf(el: IElement): number;
        elements: Array<IElement>;
        ensureRowsVisibility(): void;
    }
    export interface IPage extends IPanel, IConditionRunner {
        isStartPage: boolean;
    }
    export interface ITitleOwner {
        name: string;
        no: string;
        requiredText: string;
        isRequireTextOnStart: boolean;
        isRequireTextBeforeTitle: boolean;
        isRequireTextAfterTitle: boolean;
        locTitle: LocalizableString;
    }
    export interface IProgressInfo {
        questionCount: number;
        answeredQuestionCount: number;
        requiredQuestionCount: number;
        requiredAnsweredQuestionCount: number;
    }
    export interface IWrapperObject {
        getOriginalObj(): Base;
        getClassNameProperty(): string;
    }
    export interface IFindElement {
        element: Base;
        str: LocalizableString;
    }
}
declare module "itemvalue" {
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { ConditionRunner } from "conditions";
    import { Base } from "base";
    import { IShortcutText, ISurvey } from "base-interfaces";
    /**
     * Array of ItemValue is used in checkox, dropdown and radiogroup choices, matrix columns and rows.
     * It has two main properties: value and text. If text is empty, value is used for displaying.
     * The text property is localizable and support markdown.
     */
    export class ItemValue extends Base implements ILocalizableOwner, IShortcutText {
        protected typeName: string;
        [index: string]: any;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        static get Separator(): string;
        static set Separator(val: string);
        /**
         * Resets the input array and fills it with values from the values array
         */
        static setData(items: Array<ItemValue>, values: Array<any>, type?: string): void;
        static getData(items: Array<ItemValue>): any;
        static getItemByValue(items: Array<ItemValue>, val: any): ItemValue;
        static getTextOrHtmlByValue(items: Array<ItemValue>, val: any): string;
        static locStrsChanged(items: Array<ItemValue>): void;
        static runConditionsForItems(items: Array<ItemValue>, filteredItems: Array<ItemValue>, runner: ConditionRunner, values: any, properties: any, useItemExpression?: boolean, onItemCallBack?: (item: ItemValue, val: boolean) => boolean): boolean;
        static runEnabledConditionsForItems(items: Array<ItemValue>, runner: ConditionRunner, values: any, properties: any, onItemCallBack?: (item: ItemValue, val: boolean) => boolean): boolean;
        private static runConditionsForItemsCore;
        ownerPropertyName: string;
        private locTextValue;
        private visibleConditionRunner;
        private enableConditionRunner;
        constructor(value: any, text?: string, typeName?: string);
        onCreating(): any;
        getType(): string;
        getSurvey(live?: boolean): ISurvey;
        getLocale(): string;
        get locText(): LocalizableString;
        setLocText(locText: LocalizableString): void;
        private _locOwner;
        get locOwner(): ILocalizableOwner;
        set locOwner(value: ILocalizableOwner);
        get value(): any;
        set value(newValue: any);
        get hasText(): boolean;
        get pureText(): string;
        set pureText(val: string);
        get text(): string;
        set text(newText: string);
        get calculatedText(): string;
        get shortcutText(): string;
        private canSerializeValue;
        getData(): any;
        toJSON(): any;
        setData(value: any): void;
        get visibleIf(): string;
        set visibleIf(val: string);
        get enableIf(): string;
        set enableIf(val: string);
        get isVisible(): any;
        setIsVisible(val: boolean): void;
        get isEnabled(): any;
        setIsEnabled(val: boolean): void;
        addUsedLocales(locales: Array<string>): void;
        locStrsChanged(): void;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected getConditionRunner(isVisible: boolean): ConditionRunner;
        private getVisibleConditionRunner;
        private getEnableConditionRunner;
        originalItem: any;
    }
}
declare module "base" {
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    import { HashTable } from "helpers";
    import { JsonObjectProperty } from "jsonobject";
    import { ItemValue } from "itemvalue";
    import { IElement, IFindElement, IProgressInfo, ISurvey } from "base-interfaces";
    export class Bindings {
        private obj;
        private properties;
        private values;
        constructor(obj: Base);
        getType(): string;
        getNames(): Array<string>;
        getProperties(): Array<JsonObjectProperty>;
        setBinding(propertyName: string, valueName: string): void;
        clearBinding(propertyName: string): void;
        isEmpty(): boolean;
        getValueNameByPropertyName(propertyName: string): string;
        getPropertiesByValueName(valueName: string): Array<string>;
        getJson(): any;
        setJson(value: any): void;
        private fillProperties;
        private onChangedJSON;
    }
    export class Dependencies {
        currentDependency: () => void;
        target: Base;
        property: string;
        private static DependenciesCount;
        constructor(currentDependency: () => void, target: Base, property: string);
        dependencies: Array<{
            obj: Base;
            prop: string;
            id: string;
        }>;
        id: string;
        addDependency(target: Base, property: string): void;
        dispose(): void;
    }
    export class ComputedUpdater<T = any> {
        private _updater;
        static readonly ComputedUpdaterType = "__dependency_computed";
        private dependencies;
        constructor(_updater: () => T);
        readonly type = "__dependency_computed";
        get updater(): () => T;
        setDependencies(dependencies: Dependencies): void;
        protected getDependencies(): Dependencies;
        private clearDependencies;
        dispose(): any;
    }
    /**
     * A base class for all SurveyJS objects.
     */
    export class Base {
        private static currentDependencis;
        static finishCollectDependencies(): Dependencies;
        static startCollectDependencies(updater: () => void, target: Base, property: string): void;
        private static collectDependency;
        static get commentSuffix(): string;
        static set commentSuffix(val: string);
        static get commentPrefix(): string;
        static set commentPrefix(val: string);
        static createItemValue: (item: any, type?: string) => any;
        static itemValueLocStrChanged: (arr: Array<any>) => void;
        /**
         * Returns `true` if a passed `value` is an empty string, array, or object or if it equals to `undefined` or `null`.
         *
         * @param value A value to be checked.
         * @param trimString (Optional) When this parameter is `true`, the method ignores whitespace characters at the beginning and end of a string value. Pass `false` to disable this functionality.
         */
        isValueEmpty(value: any, trimString?: boolean): boolean;
        protected trimValue(value: any): any;
        protected isPropertyEmpty(value: any): boolean;
        private propertyHash;
        private localizableStrings;
        private arraysInfo;
        private eventList;
        private expressionInfo;
        private bindingsValue;
        private isDisposedValue;
        private classMetaData;
        private onPropChangeFunctions;
        protected isLoadingFromJsonValue: boolean;
        loadingOwner: Base;
        /**
         * An event that is raised when a property of this SurveyJS object has changed.
         *
         * Parameters:
         *
         * - `sender`: `this`\
         * A SurveyJS object whose property has changed.
         * - `options.name`: `String`\
         * The name of the changed property.
         * - `options.newValue`: `any`\
         * A new value for the property.
         * - `options.oldValue`: `any`\
         * An old value of the property. If the property is an array, `oldValue` contains the same array as `newValue` does.
         */
        onPropertyChanged: EventBase<Base>;
        /**
         * An event that is raised when an [`ItemValue`](https://surveyjs.io/form-library/documentation/itemvalue) property is changed.
         *
         * Parameters:
         *
         * - `sender`: `this`\
         * A SurveyJS object whose property contains an array of `ItemValue` objects.
         * - `options.obj`: [`ItemValue`](https://surveyjs.io/form-library/documentation/itemvalue)\
         * An `ItemValue` object.
         * - `options.propertyName`: `String`\
         * The name of the property to which an array of `ItemValue` objects is assigned (for example, `"choices"` or `"rows"`).
         * - `options.name`: `"text"` | `"value"`\
         * The name of the changed property.
         * - `options.newValue: `any`\
         * A new value for the property.
         */
        onItemValuePropertyChanged: Event<(sender: Base, options: any) => any, any>;
        getPropertyValueCoreHandler: (propertiesHash: any, name: string) => any;
        setPropertyValueCoreHandler: (propertiesHash: any, name: string, val: any) => void;
        createArrayCoreHandler: (propertiesHash: any, name: string) => Array<any>;
        surveyChangedCallback: () => void;
        private isCreating;
        constructor();
        dispose(): void;
        get isDisposed(): boolean;
        protected addEvent<T>(): EventBase<T>;
        protected onBaseCreating(): void;
        /**
         * Returns the object type as it is used in the JSON schema.
         */
        getType(): string;
        /**
         * Use this method to find out if the current object is of a given `typeName` or inherited from it.
         *
         * @param typeName One of the values listed in the [getType()](https://surveyjs.io/form-library/documentation/question#getType) description.
         * @returns `true` if the current object is of a given `typeName` or inherited from it.
         * @see getType
         */
        isDescendantOf(typeName: string): boolean;
        getSurvey(isLive?: boolean): ISurvey;
        /**
         * Returns `true` if the survey is being designed in Survey Creator.
         */
        get isDesignMode(): boolean;
        /**
         * Returns `true` if the object is included in a survey.
         *
         * This property may return `false`, for example, when you [create a survey model dynamically](https://surveyjs.io/form-library/documentation/design-survey-create-a-simple-survey#create-or-change-a-survey-model-dynamically).
         */
        get inSurvey(): boolean;
        get bindings(): Bindings;
        checkBindings(valueName: string, value: any): void;
        protected updateBindings(propertyName: string, value: any): void;
        protected updateBindingValue(valueName: string, value: any): void;
        getTemplate(): string;
        /**
         * Returns `true` if the object configuration is being loaded from JSON.
         */
        get isLoadingFromJson(): boolean;
        protected getIsLoadingFromJson(): boolean;
        startLoadingFromJson(json?: any): void;
        endLoadingFromJson(): void;
        /**
         * Returns a JSON object that corresponds to the current SurveyJS object.
         * @see fromJSON
         */
        toJSON(): any;
        /**
         * Assigns a new configuration to the current SurveyJS object. This configuration is taken from a passed JSON object.
         *
         * The JSON object should contain only serializable properties of this SurveyJS object. Event handlers and properties that do not belong to the SurveyJS object are ignored.
         *
         * @param json A JSON object with properties that you want to apply to the current SurveyJS object.
         * @see toJSON
         */
        fromJSON(json: any): void;
        onSurveyLoad(): void;
        /**
         * Creates a new object that has the same type and properties as the current SurveyJS object.
         */
        clone(): Base;
        /**
         * Returns a `JsonObjectProperty` object with metadata about a serializable property that belongs to the current SurveyJS object.
         *
         * If the property is not found, this method returns `null`.
         * @param propName A property name.
         */
        getPropertyByName(propName: string): JsonObjectProperty;
        isPropertyVisible(propName: string): boolean;
        static createProgressInfo(): IProgressInfo;
        getProgressInfo(): IProgressInfo;
        localeChanged(): void;
        locStrsChanged(): void;
        /**
         * Returns the value of a property with a specified name.
         *
         * If the property is not found or does not have a value, this method returns either `undefined`, `defaultValue` specified in the property configuration, or a value passed as the `defaultValue` parameter.
         *
         * @param name A property name.
         * @param defaultValue (Optional) A value to return if the property is not found or does not have a value.
         */
        getPropertyValue(name: string, defaultValue?: any): any;
        private getDefaultValueFromProperty;
        protected getPropertyValueCore(propertiesHash: any, name: string): any;
        geValueFromHash(): any;
        protected setPropertyValueCore(propertiesHash: any, name: string, val: any): void;
        get isEditingSurveyElement(): boolean;
        iteratePropertiesHash(func: (hash: any, key: any) => void): void;
        /**
         * Assigns a new value to a specified property.
         * @param name A property name.
         * @param val A new value for the property.
         */
        setPropertyValue(name: string, val: any): void;
        protected setArrayPropertyDirectly(name: string, val: any, sendNotification?: boolean): void;
        protected setPropertyValueDirectly(name: string, val: any): void;
        protected clearPropertyValue(name: string): void;
        onPropertyValueChangedCallback(name: string, oldValue: any, newValue: any, sender: Base, arrayChanges: ArrayChanges): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected propertyValueChanged(name: string, oldValue: any, newValue: any, arrayChanges?: ArrayChanges, target?: Base): void;
        onBindingChanged(oldValue: any, newValue: any): void;
        protected get isInternal(): boolean;
        private doPropertyValueChangedCallback;
        addExpressionProperty(name: string, onExecute: (obj: Base, res: any) => void, canRun?: (obj: Base) => boolean): void;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
        protected runConditionCore(values: HashTable<any>, properties: HashTable<any>): void;
        protected canRunConditions(): boolean;
        private checkConditionPropertyChanged;
        private runConditionItemCore;
        /**
         * Registers a function to call when a property value changes.
         * @param propertyNames An array of one or multiple property names.
         * @param handler A function to call when one of the listed properties change.
         * @param key (Optional) A key that identifies the current registration. If a function for one of the properties is already registered with the same key, the function will be overwritten. You can also use the key to subsequently unregister handlers.
         * @see unregisterPropertyChangedHandlers
         */
        registerPropertyChangedHandlers(propertyNames: Array<string>, handler: any, key?: string): void;
        /**
         * Unregisters value change event handlers for the specified properties.
         * @param propertyNames An array of one or multiple property names.
         * @param key (Optional) A key of the registration that you want to cancel.
         * @see registerPropertyChangedHandlers
         */
        unregisterPropertyChangedHandlers(propertyNames: Array<string>, key?: string): void;
        registerFunctionOnPropertyValueChanged(name: string, func: any, key?: string): void;
        registerFunctionOnPropertiesValueChanged(names: Array<string>, func: any, key?: string): void;
        unRegisterFunctionOnPropertyValueChanged(name: string, key?: string): void;
        unRegisterFunctionOnPropertiesValueChanged(names: Array<string>, key?: string): void;
        createCustomLocalizableObj(name: string): void;
        getLocale(): string;
        getLocalizationString(strName: string): string;
        getLocalizationFormatString(strName: string, ...args: any[]): string;
        protected createLocalizableString(name: string, owner: ILocalizableOwner, useMarkDown?: boolean, defaultStr?: boolean | string): LocalizableString;
        getLocalizableString(name: string): LocalizableString;
        getLocalizableStringText(name: string, defaultStr?: string): string;
        setLocalizableStringText(name: string, value: string): void;
        addUsedLocales(locales: Array<string>): void;
        searchText(text: string, founded: Array<IFindElement>): void;
        private getSearchableLocalizedStrings;
        protected getSearchableLocKeys(keys: Array<string>): void;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        protected AddLocStringToUsedLocales(locStr: LocalizableString, locales: Array<string>): void;
        protected createItemValues(name: string): Array<any>;
        private notifyArrayChanged;
        protected createNewArrayCore(name: string): Array<any>;
        protected ensureArray(name: string, onPush?: any, onRemove?: any): any[];
        protected createNewArray(name: string, onPush?: any, onRemove?: any): Array<any>;
        protected getItemValueType(): string;
        protected setArray(name: string, src: any[], dest: any[], isItemValues: boolean, onPush: any): void;
        protected isTwoValueEquals(x: any, y: any, caseInSensitive?: boolean, trimString?: boolean): boolean;
        private static copyObject;
        protected copyCssClasses(dest: any, source: any): void;
        private getValueInLowCase;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
    }
    export class ArrayChanges {
        index: number;
        deleteCount: number;
        itemsToAdd: any[];
        deletedItems: any[];
        constructor(index: number, deleteCount: number, itemsToAdd: any[], deletedItems: any[]);
    }
    export class Event<T extends Function, Options> {
        onCallbacksChanged: () => void;
        protected callbacks: Array<T>;
        get isEmpty(): boolean;
        get length(): number;
        fireByCreatingOptions(sender: any, createOptions: () => Options): void;
        fire(sender: any, options: Options): void;
        clear(): void;
        add(func: T): void;
        remove(func: T): void;
        hasFunc(func: T): boolean;
        private fireCallbackChanged;
    }
    export class EventBase<T> extends Event<(sender: T, options: any) => any, any> {
    }
}
declare module "validator" {
    import { Base } from "base";
    import { ISurveyErrorOwner, ISurvey } from "base-interfaces";
    import { SurveyError } from "survey-error";
    import { LocalizableString } from "localizablestring";
    export class ValidatorResult {
        value: any;
        error: SurveyError;
        constructor(value: any, error?: SurveyError);
    }
    /**
     * Base SurveyJS validator class.
     */
    export class SurveyValidator extends Base {
        errorOwner: ISurveyErrorOwner;
        onAsyncCompleted: (result: ValidatorResult) => void;
        constructor();
        getSurvey(live?: boolean): ISurvey;
        get text(): string;
        set text(value: string);
        get isValidateAllValues(): boolean;
        get locText(): LocalizableString;
        protected getErrorText(name: string): string;
        protected getDefaultErrorText(name: string): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        get isRunning(): boolean;
        get isAsync(): boolean;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        protected createCustomError(name: string): SurveyError;
        toString(): string;
    }
    export interface IValidatorOwner {
        getValidators(): Array<SurveyValidator>;
        validatedValue: any;
        getValidatorTitle(): string;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
    }
    export class ValidatorRunner {
        private asyncValidators;
        onAsyncCompleted: (errors: Array<SurveyError>) => void;
        run(owner: IValidatorOwner): Array<SurveyError>;
        private prepareAsyncValidators;
    }
    /**
     * Validate numeric values.
     */
    export class NumericValidator extends SurveyValidator {
        constructor(minValue?: number, maxValue?: number);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
        /**
         * The minValue property.
         */
        get minValue(): number;
        set minValue(val: number);
        /**
         * The maxValue property.
         */
        get maxValue(): number;
        set maxValue(val: number);
    }
    /**
     * Validate text values.
     */
    export class TextValidator extends SurveyValidator {
        constructor();
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
        /**
         * The minLength property.
         */
        get minLength(): number;
        set minLength(val: number);
        /**
         * The maxLength property.
         */
        get maxLength(): number;
        set maxLength(val: number);
        /**
         * The allowDigits property.
         */
        get allowDigits(): boolean;
        set allowDigits(val: boolean);
    }
    /**
     * Validates the number of answers.
     */
    export class AnswerCountValidator extends SurveyValidator {
        constructor(minCount?: number, maxCount?: number);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
        /**
         * The minCount property.
         */
        get minCount(): number;
        set minCount(val: number);
        /**
         * The maxCount property.
         */
        get maxCount(): number;
        set maxCount(val: number);
    }
    /**
     * Use it to validate the text by regular expressions.
     */
    export class RegexValidator extends SurveyValidator {
        constructor(regex?: string);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        private hasError;
        /**
         * The regex property.
         */
        get regex(): string;
        set regex(val: string);
    }
    /**
     * Validate e-mail address in the text input
     */
    export class EmailValidator extends SurveyValidator {
        private re;
        constructor();
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
    }
    /**
     * Show error if expression returns false
     */
    export class ExpressionValidator extends SurveyValidator {
        private conditionRunner;
        private isRunningValue;
        constructor(expression?: string);
        getType(): string;
        get isValidateAllValues(): boolean;
        get isAsync(): boolean;
        get isRunning(): boolean;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected generateError(res: boolean, value: any, name: string): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
        protected ensureConditionRunner(): boolean;
        /**
         * The expression property.
         */
        get expression(): string;
        set expression(val: string);
    }
}
declare module "question_matrixdropdown" {
    import { QuestionMatrixDropdownModelBase, MatrixDropdownRowModelBase, IMatrixDropdownData } from "question_matrixdropdownbase";
    import { ItemValue } from "itemvalue";
    import { LocalizableString } from "localizablestring";
    import { IProgressInfo } from "base-interfaces";
    export class MatrixDropdownRowModel extends MatrixDropdownRowModelBase {
        name: string;
        private item;
        constructor(name: string, item: ItemValue, data: IMatrixDropdownData, value: any);
        get rowName(): string;
        get text(): string;
        get locText(): LocalizableString;
    }
    /**
      * A class that describes the Multiple-Choice Matrix question type. Multiple-Choice Matrix allows you to use the [Dropdown](https://surveyjs.io/form-library/documentation/questiondropdownmodel), [Checkbox](https://surveyjs.io/form-library/documentation/questioncheckboxmodel), [Radiogroup](https://surveyjs.io/form-library/documentation/questionradiogroupmodel), [Text](https://surveyjs.io/form-library/documentation/questiontextmodel), and [Comment](https://surveyjs.io/form-library/documentation/questioncommentmodel) question types as cell editors.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-matrixdropdown/ (linkStyle))
     */
    export class QuestionMatrixDropdownModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        constructor(name: string);
        getType(): string;
        /**
         * A title for the total row. Applies if at least one column displays total values.
         * @see rowTitleWidth
         * @see columns
         */
        get totalText(): string;
        set totalText(val: string);
        get locTotalText(): LocalizableString;
        getFooterText(): LocalizableString;
        getRowTitleWidth(): string;
        /**
         * Specifies whether to hide the question when the matrix has no visible rows.
         * @see rowsVisibleIf
         */
        get hideIfRowsEmpty(): boolean;
        set hideIfRowsEmpty(val: boolean);
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected getConditionObjectRowName(index: number): string;
        protected getConditionObjectRowText(index: number): string;
        protected getConditionObjectsRowIndeces(): Array<number>;
        protected setNewValue(newValue: any): void;
        clearIncorrectValues(): void;
        protected clearValueIfInvisibleCore(): void;
        protected generateRows(): Array<MatrixDropdownRowModel>;
        protected createMatrixRow(item: ItemValue, value: any): MatrixDropdownRowModel;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        protected updateProgressInfoByValues(res: IProgressInfo): void;
    }
}
declare module "dropdownListModel" {
    import { Action, IAction } from "actions/action";
    import { Base } from "base";
    import { ListModel } from "list";
    import { PopupModel } from "popup";
    import { Question } from "question";
    export class DropdownListModel extends Base {
        protected question: Question;
        protected onSelectionChanged?: (item: IAction, ...params: any[]) => void;
        readonly minPageSize = 25;
        readonly loadingItemHeight = 40;
        private _popupModel;
        private focusFirstInputSelector;
        private itemsSettings;
        private isRunningLoadQuestionChoices;
        protected listModel: ListModel;
        protected popupCssClasses: string;
        private resetItemsSettings;
        private updateListItems;
        private setItems;
        private updateQuestionChoices;
        private updatePopupFocusFirstInputSelector;
        protected createPopup(): void;
        private setFilterStringToListModel;
        protected popupRecalculatePosition(isResetHeight: boolean): void;
        protected onHidePopup(): void;
        protected getAvailableItems(): Array<Action>;
        protected createListModel(): ListModel;
        protected updateAfterListModelCreated(model: ListModel): void;
        updateCssClasses(popupCssClass: string, listCssClasses: any): void;
        protected resetFilterString(): void;
        protected onSetFilterString(): void;
        setInputHasValue(newValue: boolean): void;
        searchEnabled: boolean;
        filterString: string;
        hasScroll: boolean;
        constructor(question: Question, onSelectionChanged?: (item: IAction, ...params: any[]) => void);
        get popupModel(): PopupModel;
        get inputReadOnly(): boolean;
        get filterStringEnabled(): boolean;
        setSearchEnabled(newValue: boolean): void;
        updateItems(): void;
        onClick(event: any): void;
        onClear(event: any): void;
        getSelectedAction(): Action;
        keyHandler(event: any): void;
        onScroll(event: Event): void;
        onBlur(event: any): void;
        scrollToFocusedItem(): void;
    }
}
declare module "question_dropdown" {
    import { QuestionSelectBase } from "question_baseselect";
    import { LocalizableString } from "localizablestring";
    import { ItemValue } from "itemvalue";
    import { PopupModel } from "popup";
    import { EventBase } from "base";
    import { DropdownListModel } from "dropdownListModel";
    /**
     * A class that describes the Dropdown question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-dropdown/ (linkStyle))
     */
    export class QuestionDropdownModel extends QuestionSelectBase {
        dropdownListModel: DropdownListModel;
        lastSelectedItemValue: ItemValue;
        updateReadOnlyText(): void;
        constructor(name: string);
        locStrsChanged(): void;
        get showOptionsCaption(): boolean;
        set showOptionsCaption(val: boolean);
        get optionsCaption(): string;
        set optionsCaption(val: string);
        /**
         * A placeholder for the input field.
         */
        get placeholder(): string;
        set placeholder(val: string);
        get locPlaceholder(): LocalizableString;
        get clearCaption(): string;
        set clearCaption(value: string);
        get locClearCaption(): LocalizableString;
        getType(): string;
        get ariaRole(): string;
        get selectedItem(): ItemValue;
        supportGoNextPageAutomatic(): boolean;
        private minMaxChoices;
        protected getChoices(): Array<ItemValue>;
        /**
         * Use the `choicesMin`, `choicesMax`, and `choicesStep` properties to generate choice items automatically. For example, the configuration below generates three choice items: [10, 20, 30].
         *
         * ```js
         * "choicesMin": 10,
         * "choicesMax": 30
         * "choicesStep": 10
         * ```
         * @see choicesMax
         * @see choicesStep
         */
        get choicesMin(): number;
        set choicesMin(val: number);
        /**
         * Use the `choicesMin`, `choicesMax`, and `choicesStep` properties to generate choice items automatically. For example, the configuration below generates three choice items: [10, 20, 30].
         *
         * ```js
         * "choicesMin": 10,
         * "choicesMax": 30
         * "choicesStep": 10
         * ```
         * @see choicesMin
         * @see choicesStep
         */
        get choicesMax(): number;
        set choicesMax(val: number);
        /**
         * Use the `choicesMin`, `choicesMax`, and `choicesStep` properties to generate choice items automatically. For example, the configuration below generates three choice items: [10, 20, 30].
         *
         * ```js
         * "choicesMin": 10,
         * "choicesMax": 30
         * "choicesStep": 10
         * ```
         *
         * The default value of the `choicesStep` property is 1.
         * @see choicesMin
         * @see choicesMax
         */
        get choicesStep(): number;
        set choicesStep(val: number);
        get autocomplete(): string;
        set autocomplete(val: string);
        /**
         * Specifies whether to display a button that clears the selected value.
         */
        allowClear: boolean;
        /**
         * Specifies whether users can enter a value into the input field to filter the drop-down list.
         */
        searchEnabled: boolean;
        inputHasValue: boolean;
        readOnlyText: string;
        /**
         * Enables lazy loading. If you set this property to `true`, you should implement the Survey's [`onChoicesLazyLoad`](https://surveyjs.io/form-library/documentation/surveymodel#onChoicesLazyLoad) event handler.
         * @see choicesLazyLoadPageSize
         * @see SurveyModel.onChoicesLazyLoad
         */
        choicesLazyLoadEnabled: boolean;
        /**
         * Specifies the number of choice items to load at a time when choices are loaded on demand.
         * @see choicesLazyLoadEnabled
         * @see SurveyModel.onChoicesLazyLoad
         */
        choicesLazyLoadPageSize: number;
        getControlClass(): string;
        get selectedItemLocText(): LocalizableString;
        get inputFieldComponentName(): string;
        get showSelectedItemLocText(): boolean;
        get showInputFieldComponent(): boolean;
        private get selectedItemText();
        get popupModel(): PopupModel;
        onOpened: EventBase<QuestionDropdownModel>;
        onOpenedCallBack(): void;
        protected onVisibleChoicesChanged(): void;
        protected getFirstInputElementId(): string;
        getInputId(): string;
        clearValue(): void;
        onClick(e: any): void;
        onKeyUp(event: any): void;
    }
}
declare module "question_matrix" {
    import { ItemValue } from "itemvalue";
    import { QuestionMatrixBaseModel } from "martixBase";
    import { Base } from "base";
    import { SurveyError } from "survey-error";
    import { LocalizableString, ILocalizableOwner } from "localizablestring";
    import { IConditionObject } from "question";
    export interface IMatrixData {
        onMatrixRowChanged(row: MatrixRowModel): void;
        getCorrectedRowValue(value: any): any;
    }
    export class MatrixRowModel extends Base {
        fullName: string;
        private data;
        private item;
        cellClick: any;
        constructor(item: ItemValue, fullName: string, data: IMatrixData, value: any);
        get name(): string;
        get text(): string;
        get locText(): LocalizableString;
        get value(): any;
        set value(newValue: any);
        get rowClasses(): string;
    }
    export interface IMatrixCellsOwner extends ILocalizableOwner {
        getRows(): Array<any>;
        getColumns(): Array<any>;
    }
    export class MatrixCells {
        cellsOwner: IMatrixCellsOwner;
        private values;
        constructor(cellsOwner: IMatrixCellsOwner);
        get isEmpty(): boolean;
        onValuesChanged: () => void;
        private valuesChanged;
        setCellText(row: any, column: any, val: string): void;
        setDefaultCellText(column: any, val: string): void;
        getCellLocText(row: any, column: any): LocalizableString;
        getDefaultCellLocText(column: any, val: string): LocalizableString;
        getCellDisplayLocText(row: any, column: any): LocalizableString;
        getCellText(row: any, column: any): string;
        getDefaultCellText(column: any): string;
        getCellDisplayText(row: any, column: any): string;
        get rows(): Array<any>;
        get columns(): Array<any>;
        private getCellRowColumnValue;
        getJson(): any;
        setJson(value: any): void;
        locStrsChanged(): void;
        protected createString(): LocalizableString;
    }
    /**
      * A class that describes the Single-Choice Matrix question type.
      *
      * [View Demo](https://surveyjs.io/form-library/examples/single-selection-matrix-table-question/ (linkStyle))
      */
    export class QuestionMatrixModel extends QuestionMatrixBaseModel<MatrixRowModel, ItemValue> implements IMatrixData, IMatrixCellsOwner {
        private isRowChanging;
        private cellsValue;
        constructor(name: string);
        getType(): string;
        get hasSingleInput(): boolean;
        /**
         * Specifies whether each row requires an answer. If a respondent skips a row, the question displays a validation error.
         * @see isRequired
         */
        get isAllRowRequired(): boolean;
        set isAllRowRequired(val: boolean);
        get hasRows(): boolean;
        /**
         * Specifies a sort order for matrix rows.
         *
         * Possible values:
         *
         * - "initial" (default) - Preserves the original order of the `rows` array.
         * - "random" - Arranges matrix rows in random order each time the question is displayed.
         * @see rows
         */
        get rowsOrder(): string;
        set rowsOrder(val: string);
        /**
         * Specifies whether to hide the question when the matrix has no visible rows.
         * @see rowsVisibleIf
         */
        get hideIfRowsEmpty(): boolean;
        set hideIfRowsEmpty(val: boolean);
        getRows(): Array<any>;
        getColumns(): Array<any>;
        addColumn(value: any, text?: string): ItemValue;
        getItemClass(row: any, column: any): string;
        get itemSvgIcon(): string;
        locStrsChanged(): void;
        protected getQuizQuestionCount(): number;
        protected getCorrectAnswerCount(): number;
        protected getVisibleRows(): Array<MatrixRowModel>;
        protected sortVisibleRows(array: Array<MatrixRowModel>): Array<MatrixRowModel>;
        endLoadingFromJson(): void;
        protected processRowsOnSet(newRows: Array<any>): MatrixRowModel[];
        get visibleRows(): Array<MatrixRowModel>;
        get cells(): MatrixCells;
        set cells(value: MatrixCells);
        get hasCellText(): boolean;
        protected updateHasCellText(): void;
        setCellText(row: any, column: any, val: string): void;
        getCellText(row: any, column: any): string;
        setDefaultCellText(column: any, val: string): void;
        getDefaultCellText(column: any): string;
        getCellDisplayText(row: any, column: any): string;
        private emptyLocalizableString;
        getCellDisplayLocText(row: any, column: any): LocalizableString;
        supportGoNextPageAutomatic(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        private hasErrorInRows;
        private hasValuesInAllRows;
        protected getIsAnswered(): boolean;
        private createMatrixRow;
        protected onMatrixRowCreated(row: MatrixRowModel): void;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        getPlainData(options?: {
            includeEmpty?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): import("question").IQuestionPlainData;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        protected clearValueIfInvisibleCore(): void;
        protected getFirstInputElementId(): string;
        onMatrixRowChanged(row: MatrixRowModel): void;
        getCorrectedRowValue(value: any): any;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        private get SurveyModel();
        getColumnHeaderWrapperComponentName(cell: ItemValue): string;
        getColumnHeaderWrapperComponentData(cell: ItemValue): any;
        getRowHeaderWrapperComponentName(cell: ItemValue): string;
        getRowHeaderWrapperComponentData(cell: ItemValue): any;
    }
}
declare module "question_textbase" {
    import { Question } from "question";
    import { LocalizableString } from "localizablestring";
    /**
     * A base class for the [Text](https://surveyjs.io/form-library/documentation/questiontextmodel) and [Comment](https://surveyjs.io/form-library/documentation/questioncommentmodel) question types.
     */
    export class QuestionTextBase extends Question {
        constructor(name: string);
        protected isTextValue(): boolean;
        /**
         * The maximum text length measured in characters. Assign 0 if the length should be unlimited.
         *
         * Default value: -1 (inherits the actual value from the `SurveyModel`'s [`maxTextLength`](https://surveyjs.io/form-library/documentation/surveymodel#maxTextLength) property).
         */
        get maxLength(): number;
        set maxLength(val: number);
        getMaxLength(): any;
        /**
         * A placeholder for the input field.
         */
        placeholder: string;
        get placeHolder(): string;
        set placeHolder(val: string);
        get locPlaceHolder(): LocalizableString;
        getType(): string;
        isEmpty(): boolean;
        /**
         * Gets or sets a value that specifies when to update the question value.
         *
         * Possible values:
         *
         * - `"onBlur"` - Updates the value after the input field loses focus.
         * - `"onTyping"` - Updates the value on every key press.
         * - `"default"` (default) - Inherits the value from the `SurveyModel`'s [`textUpdateMode`](https://surveyjs.io/form-library/documentation/surveymodel#textUpdateMode) property.
         *
         * > Do not use the `"onTyping"` mode if your survey contains many expressions. Expressions are reevaluated each time a question value is changed. In `"onTyping"` mode, the question value changes frequently. This may cause performance degradation.
         */
        get textUpdateMode(): string;
        set textUpdateMode(val: string);
        get isSurveyInputTextUpdate(): boolean;
        get renderedPlaceholder(): string;
        protected setRenderedPlaceholder(val: string): void;
        protected onReadOnlyChanged(): void;
        onSurveyLoad(): void;
        localeChanged(): void;
        protected calcRenderedPlaceholder(): void;
        protected hasPlaceHolder(): boolean;
        getControlClass(): string;
        get ariaRole(): string;
    }
}
declare module "question_text" {
    import { LocalizableString, LocalizableStrings } from "localizablestring";
    import { HashTable } from "helpers";
    import { SurveyValidator } from "validator";
    import { SurveyError } from "survey-error";
    import { QuestionTextBase } from "question_textbase";
    /**
     * A class that describes the Text question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-text/ (linkStyle))
     */
    export class QuestionTextModel extends QuestionTextBase {
        private locDataListValue;
        private minValueRunner;
        private maxValueRunner;
        constructor(name: string);
        protected isTextValue(): boolean;
        getType(): string;
        onSurveyLoad(): void;
        /**
         * A value passed on to the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types) attribute of the underlying `<input>` element.
         */
        get inputType(): string;
        set inputType(val: string);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        getValidators(): Array<SurveyValidator>;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
         * A value passed on to the [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size) attribute of the underlying `<input>` element.
         */
        get size(): number;
        set size(val: number);
        get isTextInput(): boolean;
        get inputSize(): number;
        get renderedInputSize(): number;
        get inputWidth(): string;
        updateInputSize(): void;
        /**
         * A value passed on to the [`autocomplete`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attribute of the underlying `<input>` element.
         */
        get autocomplete(): string;
        set autocomplete(val: string);
        /**
         * A value passed on to the [`min`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/min) attribute of the underlying `<input>` element.
         * @see minValueExpression
         */
        get min(): string;
        set min(val: string);
        /**
         * A value passed on to the [`max`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/max) attribute of the underlying `<input>` element.
         * @see maxValueExpression
         */
        get max(): string;
        set max(val: string);
        /**
         * The minimum value specified as an expression. For example, `"minValueExpression": "today(-1)"` sets the minimum value to yesterday.
         * @see min
         */
        get minValueExpression(): string;
        set minValueExpression(val: string);
        /**
         * The maximum value specified as an expression. For example, `"maxValueExpression": "today(1)"` sets the maximum value to tomorrow.
         * @see max
         */
        get maxValueExpression(): string;
        set maxValueExpression(val: string);
        get renderedMin(): any;
        get renderedMax(): any;
        /**
         * An error message to display when the question value is less than the minimum accepted value.
         * @see min
         * @see minValueExpression
         */
        get minErrorText(): string;
        set minErrorText(val: string);
        get locMinErrorText(): LocalizableString;
        /**
         * An error message to display when the question value exceeds the maximum accepted value.
         * @see max
         * @see maxValueExpression
         */
        get maxErrorText(): string;
        set maxErrorText(val: string);
        get locMaxErrorText(): LocalizableString;
        /**
         * Returns `true` if the specified `inputType` supports the `min` and `max` properties.
         * @see inputType
         * @see min
         * @see max
         */
        get isMinMaxType(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected canSetValueToSurvey(): boolean;
        protected convertFuncValuetoQuestionValue(val: any): any;
        private getMinMaxErrorText;
        private get isValueLessMin();
        private get isValueGreaterMax();
        private get isDateInputType();
        private getCalculatedMinMax;
        private setRenderedMinMax;
        /**
         * A value passed on to the [`step`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/step) attribute of the underlying `<input>` element.
         */
        get step(): string;
        set step(val: string);
        get renderedStep(): string;
        supportGoNextPageAutomatic(): boolean;
        supportGoNextPageError(): boolean;
        /**
         * An array of predefined options from which users can select. This property configures an HTML [`<datalist>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) element and associates it with the underlying `input` element.
         */
        get dataList(): Array<string>;
        set dataList(val: Array<string>);
        get locDataList(): LocalizableStrings;
        get dataListId(): string;
        protected canRunValidators(isOnValueChanged: boolean): boolean;
        protected setNewValue(newValue: any): void;
        protected correctValueType(newValue: any): any;
        protected hasPlaceHolder(): boolean;
        isReadOnlyRenderDiv(): boolean;
        get inputStyle(): any;
        private _isWaitingForEnter;
        private updateValueOnEvent;
        onCompositionUpdate: (event: any) => void;
        onKeyUp: (event: any) => void;
        onKeyDown: (event: any) => void;
        onChange: (event: any) => void;
        onBlur: (event: any) => void;
    }
}
declare module "question_multipletext" {
    import { Base } from "base";
    import { ISurveyData, ISurveyImpl, ISurvey, IPanel, IElement, IQuestion, ITextProcessor, IProgressInfo } from "base-interfaces";
    import { SurveyValidator, IValidatorOwner } from "validator";
    import { Question, IConditionObject } from "question";
    import { QuestionTextModel } from "question_text";
    import { SurveyError } from "survey-error";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    export interface IMultipleTextData extends ILocalizableOwner, IPanel {
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getAllValues(): any;
        getMultipleTextValue(name: string): any;
        setMultipleTextValue(name: string, value: any): any;
        getItemDefaultValue(name: string): any;
        getIsRequiredText(): string;
    }
    export class MultipleTextItemModel extends Base implements IValidatorOwner, ISurveyData, ISurveyImpl {
        private editorValue;
        private data;
        valueChangedCallback: (newValue: any) => void;
        constructor(name?: any, title?: string);
        getType(): string;
        get id(): string;
        getOriginalObj(): Base;
        /**
         * The item name.
         */
        get name(): string;
        set name(val: string);
        get question(): Question;
        get editor(): QuestionTextModel;
        protected createEditor(name: string): QuestionTextModel;
        addUsedLocales(locales: Array<string>): void;
        localeChanged(): void;
        locStrsChanged(): void;
        setData(data: IMultipleTextData): void;
        /**
         * Set this property to true, to make the item a required. If a user doesn't fill the item then a validation error will be generated.
         */
        get isRequired(): boolean;
        set isRequired(val: boolean);
        /**
         * Use this property to change the default input type.
         */
        get inputType(): string;
        set inputType(val: string);
        /**
         * Item title. If it is empty, the item name is rendered as title. This property supports markdown.
         * @see name
         */
        get title(): string;
        set title(val: string);
        get locTitle(): LocalizableString;
        get fullTitle(): string;
        /**
         * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
         * If it is 0, then the value is unlimited
         * @see SurveyModel.maxTextLength
         */
        get maxLength(): number;
        set maxLength(val: number);
        getMaxLength(): any;
        /**
         * The input place holder.
         */
        get placeholder(): string;
        set placeholder(val: string);
        get locPlaceholder(): LocalizableString;
        get placeHolder(): string;
        set placeHolder(val: string);
        get locPlaceHolder(): LocalizableString;
        /**
         * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
         */
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        /**
         * The input size.
         */
        get size(): number;
        set size(val: number);
        /**
         * The list of question validators.
         */
        get validators(): Array<SurveyValidator>;
        set validators(val: Array<SurveyValidator>);
        getValidators(): Array<SurveyValidator>;
        /**
         * The item value.
         */
        get value(): any;
        set value(value: any);
        isEmpty(): boolean;
        onValueChanged(newValue: any): void;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getValue(name: string): any;
        setValue(name: string, value: any): void;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string): void;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        findQuestionByName(name: string): IQuestion;
        getValidatorTitle(): string;
        get validatedValue(): any;
        set validatedValue(val: any);
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
    }
    /**
     * A class that describes the Multiple Text question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-multipletext/ (linkStyle))
     */
    export class QuestionMultipleTextModel extends Question implements IMultipleTextData, IPanel {
        static addDefaultItems(question: QuestionMultipleTextModel): void;
        colCountChangedCallback: () => void;
        constructor(name: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        get isAllowTitleLeft(): boolean;
        get hasSingleInput(): boolean;
        get id(): string;
        set id(val: string);
        onSurveyLoad(): void;
        setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        private updateItemsSize;
        private editorsOnSurveyLoad;
        private performForEveryEditor;
        /**
         * An array of `MultipleTextItemModel` objects that represent input items.
         * @see addItem
         */
        get items(): Array<MultipleTextItemModel>;
        set items(val: Array<MultipleTextItemModel>);
        /**
         * Adds a new input item.
         * @param name An item name
         * @param title (Optional) An item title
         * @see items
         */
        addItem(name: string, title?: string): MultipleTextItemModel;
        getItemByName(name: string): MultipleTextItemModel;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        locStrsChanged(): void;
        localeChanged(): void;
        supportGoNextPageAutomatic(): boolean;
        /**
         * The number of columns used to arrange input items. Accepts the following values: 1, 2, 3, 4, 5.
         *
         * Default value: 1
         */
        get colCount(): number;
        set colCount(val: number);
        /**
         * A value passed on to the [`size`](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/size) attribute of the underlying `<input>` elements.
         */
        get itemSize(): number;
        set itemSize(val: number);
        getRows(): Array<any>;
        private isMultipleItemValueChanging;
        protected onValueChanged(): void;
        protected createTextItem(name: string, title: string): MultipleTextItemModel;
        protected onItemValueChanged(): void;
        protected getIsRunningValidators(): boolean;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        getAllErrors(): Array<SurveyError>;
        clearErrors(): void;
        protected getContainsErrors(): boolean;
        protected getIsAnswered(): boolean;
        getProgressInfo(): IProgressInfo;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        getMultipleTextValue(name: string): any;
        setMultipleTextValue(name: string, value: any): void;
        getItemDefaultValue(name: string): any;
        getTextProcessor(): ITextProcessor;
        getAllValues(): any;
        getIsRequiredText(): string;
        addElement(element: IElement, index: number): void;
        removeElement(element: IElement): boolean;
        getQuestionTitleLocation(): string;
        getQuestionStartIndex(): string;
        getChildrenLayoutType(): string;
        elementWidthChanged(el: IElement): void;
        get elements(): Array<IElement>;
        indexOf(el: IElement): number;
        ensureRowsVisibility(): void;
        getItemLabelCss(item: MultipleTextItemModel): string;
        getItemCss(): string;
        getItemTitleCss(): string;
        protected getIsTooltipErrorInsideSupported(): boolean;
    }
}
declare module "flowpanel" {
    import { IElement } from "base-interfaces";
    import { PanelModel } from "panel";
    import { LocalizableString } from "localizablestring";
    import { Question } from "question";
    /**
     * The flow panel object. It is a container with flow layout where you can mix questions with markdown text.
     *
     */
    export class FlowPanelModel extends PanelModel {
        static contentElementNamePrefix: string;
        contentChangedCallback: () => void;
        onGetHtmlForQuestion: (question: Question) => string;
        onCustomHtmlProducing: () => string;
        constructor(name?: string);
        getType(): string;
        getChildrenLayoutType(): string;
        onSurveyLoad(): any;
        get content(): string;
        set content(val: string);
        get locContent(): LocalizableString;
        get html(): string;
        set html(val: string);
        protected onContentChanged(): any;
        produceHtml(): string;
        getQuestionFromText(str: string): Question;
        protected getHtmlForQuestion(question: Question): string;
        protected getQuestionHtmlId(question: Question): string;
        protected onAddElement(element: IElement, index: number): void;
        protected onRemoveElement(element: IElement): void;
        dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
        private addElementToContent;
        private insertTextAtCursor;
        getElementContentText(element: IElement): string;
    }
}
declare module "template-renderer" {
    export interface SurveyTemplateRendererTemplateData {
        name: string;
        data: any;
        nodes?: HTMLElement[];
        afterRender: (el: HTMLElement, context: any) => void;
    }
    export interface SurveyTemplateRendererViewModel {
        componentData: any;
        templateData: SurveyTemplateRendererTemplateData;
    }
}
declare module "defaultTitle" {
    export class DefaultTitleModel {
        static getIconCss(cssClasses: any, isCollapsed: boolean): string;
    }
}
declare module "questionnonvalue" {
    import { Question, IConditionObject } from "question";
    import { SurveyError } from "survey-error";
    /**
     * A base class for question types that cannot have a value ([Html](https://surveyjs.io/form-library/documentation/questionhtmlmodel), [Image](https://surveyjs.io/form-library/documentation/questionimagemodel)).
     *
     * This class does not implement new functionality&mdash;it only redefines default values of certain properties inherited from the [`Question`](https://surveyjs.io/form-library/documentation/question) class.
     */
    export class QuestionNonValue extends Question {
        constructor(name: string);
        getType(): string;
        get hasInput(): boolean;
        get hasTitle(): boolean;
        getTitleLocation(): string;
        get hasComment(): boolean;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        getAllErrors(): Array<SurveyError>;
        supportGoNextPageAutomatic(): boolean;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
    }
}
declare module "question_empty" {
    import { Question } from "question";
    /**
     * A Model for an question that renders empty "div" tag. It used as a base class for some custom widgets
     */
    export class QuestionEmptyModel extends Question {
        constructor(name: string);
        getType(): string;
    }
}
declare module "question_checkbox" {
    import { QuestionCheckboxBase, QuestionSelectBase } from "question_baseselect";
    import { ItemValue } from "itemvalue";
    import { LocalizableString } from "localizablestring";
    import { IQuestion } from "base-interfaces";
    /**
     * A class that describes the Checkbox question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-checkbox/ (linkStyle))
     */
    export class QuestionCheckboxModel extends QuestionCheckboxBase {
        private selectAllItemValue;
        private invisibleOldValues;
        private initialSelectedItemValues;
        constructor(name: string);
        protected getDefaultItemComponent(): string;
        get ariaRole(): string;
        getType(): string;
        protected onCreating(): void;
        protected getFirstInputElementId(): string;
        /**
         * Specifies a property name used to store selected values.
         *
         * Set this property if you want to store selected values in an array of objects instead of an array of primitive values. For example, if you set `valuePropertyName` to `"car"`, the `value` property will contain an array of objects `[{ car: "Ford" }, { car: "Tesla" }]`, not an array of string values `[ "Ford", "Tesla" ]`.
         */
        get valuePropertyName(): string;
        set valuePropertyName(val: string);
        getQuestionFromArray(name: string, index: number): IQuestion;
        /**
         * Returns the "Select All" choice item. Use this property to change the item's `value` or `text`.
         * @see showSelectAllItem
         */
        get selectAllItem(): ItemValue;
        /**
         * Gets or sets a caption for the "Select All" choice item.
         * @see showSelectAllItem
         */
        get selectAllText(): string;
        set selectAllText(val: string);
        get locSelectAllText(): LocalizableString;
        /**
         * Enable this property to display a "Select All" item. When users select it, all other choice items, except "Other" and "None", also become selected.
         * @see selectAll
         * @see isAllSelected
         * @see separateSpecialChoices
         */
        get showSelectAllItem(): boolean;
        set showSelectAllItem(val: boolean);
        get hasSelectAll(): boolean;
        set hasSelectAll(val: boolean);
        /**
         * Returns `true` if all choice items, except "Other" and "None", are selected.
         * @see showSelectAllItem
         */
        get isAllSelected(): boolean;
        set isAllSelected(val: boolean);
        toggleSelectAll(): void;
        /**
         * Selects all choice items, except "Other" and "None".
         *
         * To clear selection, call the `clearValue()` method.
         * @see clearValue
         */
        selectAll(): void;
        protected isItemSelectedCore(item: ItemValue): boolean;
        private getRealValue;
        /**
         * Sets a limit on the number of selected choices.
         *
         * Default value: 0 (unlimited)
         *
         * > This property only limits the number of choice items that can be selected by users. You can select any number of choice items in code, regardless of the `maxSelectedChoices` value.
         */
        get maxSelectedChoices(): number;
        set maxSelectedChoices(val: number);
        /**
         * An array of selected choice items. Includes the "Other" and "None" choice items if they are selected, but not "Select All". Items are sorted in the order they were selected.
         * @see visibleChoices
         * @see enabledChoices
         */
        get selectedChoices(): Array<ItemValue>;
        get selectedItems(): Array<ItemValue>;
        protected onEnableItemCallBack(item: ItemValue): boolean;
        protected onAfterRunItemsEnableCondition(): void;
        private shouldCheckMaxSelectedChoices;
        protected getItemClassCore(item: any, options: any): string;
        updateValueFromSurvey(newValue: any): void;
        protected setDefaultValue(): void;
        private addIntoInvisibleOldValues;
        protected hasValueToClearIncorrectValues(): boolean;
        protected setNewValue(newValue: any): void;
        protected getIsMultipleValue(): boolean;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        private getFirstUnknownIndex;
        private noneIndexInArray;
        protected canUseFilteredChoices(): boolean;
        protected supportSelectAll(): boolean;
        protected addToVisibleChoices(items: Array<ItemValue>, isAddAll: boolean): void;
        protected isHeadChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        isItemInList(item: ItemValue): boolean;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected clearIncorrectValuesCore(): void;
        protected clearDisabledValuesCore(): void;
        private isChangingValueOnClearIncorrect;
        private clearIncorrectAndDisabledValues;
        private restoreValuesFromInvisible;
        getConditionJson(operator?: string, path?: string): any;
        isAnswerCorrect(): boolean;
        protected setDefaultValueWithOthers(): void;
        protected getIsItemValue(val: any, item: ItemValue): boolean;
        protected valueFromData(val: any): any;
        protected rendredValueFromData(val: any): any;
        protected rendredValueToData(val: any): any;
        protected convertValueFromObject(val: any): any;
        protected convertValueToObject(val: any): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        protected selectOtherValueFromComment(val: boolean): void;
        get checkBoxSvgPath(): string;
    }
}
declare module "multiSelectListModel" {
    import { Action, IAction } from "actions/action";
    import { ListModel } from "list";
    export class MultiSelectListModel extends ListModel {
        selectedItems: Array<IAction>;
        hideSelectedItems: boolean;
        private updateItemState;
        constructor(items: Array<IAction>, onSelectionChanged: (item: Action, status: string) => void, allowSelection: boolean, selectedItems?: Array<IAction>, onFilterStringChangedCallback?: (text: string) => void);
        onItemClick: (item: Action) => void;
        isItemDisabled: (itemValue: Action) => boolean;
        isItemSelected: (itemValue: Action) => boolean;
        updateState(): void;
        setSelectedItems(newItems: Array<IAction>): void;
        selectFocusedItem(): void;
    }
}
declare module "dropdownMultiSelectListModel" {
    import { IAction } from "actions/action";
    import { DropdownListModel } from "dropdownListModel";
    import { MultiSelectListModel } from "multiSelectListModel";
    import { Question } from "question";
    export class DropdownMultiSelectListModel extends DropdownListModel {
        filterStringPlaceholder: string;
        closeOnSelect: boolean;
        private updateListState;
        private syncFilterStringPlaceholder;
        private getSelectedActions;
        protected createListModel(): MultiSelectListModel;
        previousValue: any;
        doneButtonCaption: string;
        private get shouldResetAfterCancel();
        protected createPopup(): void;
        selectAllItems(): void;
        selectNoneItem(): void;
        selectItem(id: string): void;
        deselectItem(id: string): void;
        onClear(event: any): void;
        setHideSelectedItems(newValue: boolean): void;
        removeLastSelectedItem(): void;
        constructor(question: Question, onSelectionChanged?: (item: IAction, ...params: any[]) => void);
        inputKeyHandler(event: any): void;
    }
}
declare module "question_tagbox" {
    import { LocalizableString } from "localizablestring";
    import { QuestionCheckboxModel } from "question_checkbox";
    import { PopupModel } from "popup";
    import { DropdownMultiSelectListModel } from "dropdownMultiSelectListModel";
    import { EventBase } from "base";
    /**
     * A Model for a tagbox question
     *
     * [View Demo](https://surveyjs.io/form-library/examples/how-to-create-multiselect-tag-box/ (linkStyle))
     */
    export class QuestionTagboxModel extends QuestionCheckboxModel {
        dropdownListModel: DropdownMultiSelectListModel;
        constructor(name: string);
        protected getDefaultItemComponent(): string;
        get readOnlyText(): any;
        onSurveyLoad(): void;
        /**
         * Specifies whether to display a button that clears the selected value.
         */
        allowClear: boolean;
        /**
         * Specifies whether users can enter a value into the input field to filter the drop-down list.
         */
        searchEnabled: boolean;
        /**
         * Specifies whether to remove selected items from the drop-down list.
         */
        hideSelectedItems: boolean;
        /**
         * Enables lazy loading. If you set this property to `true`, you should implement the Survey's [`onChoicesLazyLoad`](https://surveyjs.io/form-library/documentation/surveymodel#onChoicesLazyLoad) event handler.
         * @see choicesLazyLoadPageSize
         * @see SurveyModel.onChoicesLazyLoad
         */
        choicesLazyLoadEnabled: boolean;
        /**
         * Specifies the number of choice items to load at a time when choices are loaded on demand.
         * @see choicesLazyLoadEnabled
         * @see SurveyModel.onChoicesLazyLoad
         */
        choicesLazyLoadPageSize: number;
        /**
         * A text displayed in the input field when it doesn't have a value.
         */
        get placeholder(): string;
        set placeholder(val: string);
        get locPlaceholder(): LocalizableString;
        get clearCaption(): string;
        set clearCaption(value: string);
        get locClearCaption(): LocalizableString;
        getType(): string;
        get ariaRole(): string;
        get popupModel(): PopupModel;
        getControlClass(): string;
        onOpened: EventBase<QuestionTagboxModel>;
        onOpenedCallBack(): void;
        protected onVisibleChoicesChanged(): void;
        protected getFirstInputElementId(): string;
        getInputId(): string;
    }
}
declare module "question_imagepicker" {
    import { QuestionCheckboxBase, QuestionSelectBase } from "question_baseselect";
    import { ItemValue } from "itemvalue";
    import { ILocalizableOwner, LocalizableString } from "localizablestring";
    export class ImageItemValue extends ItemValue implements ILocalizableOwner {
        protected typeName: string;
        constructor(value: any, text?: string, typeName?: string);
        getType(): string;
        /**
         * The image or video link property.
         */
        get imageLink(): string;
        set imageLink(val: string);
        private aspectRatio;
        get locImageLink(): LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
    }
    /**
      * A class that describes the Image Picker question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/image-picker-question/ (linkStyle))
     */
    export class QuestionImagePickerModel extends QuestionCheckboxBase {
        constructor(name: string);
        getType(): string;
        supportGoNextPageAutomatic(): boolean;
        get hasSingleInput(): boolean;
        protected getItemValueType(): string;
        get isCompositeQuestion(): boolean;
        supportOther(): boolean;
        supportNone(): boolean;
        isAnswerCorrect(): boolean;
        /**
         * Specifies whether users can select multiple images or videos.
         *
         * Default value: `false`
         */
        get multiSelect(): boolean;
        set multiSelect(newValue: boolean);
        isItemSelected(item: ItemValue): boolean;
        clearIncorrectValues(): void;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        /**
         * Specifies whether to display labels under images or videos. Labels text are taken from the `text` property of each object in the `choices` array.
         * @see choices
         */
        get showLabel(): boolean;
        set showLabel(newValue: boolean);
        endLoadingFromJson(): void;
        protected getValueCore(): any;
        private convertValToArrayForMultSelect;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        /**
         * Specifies the height of containers for images or videos. Accepts positive numbers and CSS values.
         *
         * Default value: undefined
         *
         * Use the `imageFit` property to specify how to fit the images or videos into their containers.
         * @see imageWidth
         * @see imageFit
         */
        get imageHeight(): number;
        set imageHeight(val: number);
        private responsiveImageHeight;
        get renderedImageHeight(): string;
        /**
         * Specifies the width of containers for images or videos. Accepts positive numbers and CSS values.
         *
         * Default value: 200
         *
         * Use the `imageFit` property to specify how to fit the images or videos into their containers.
         * @see imageHeight
         * @see imageFit
         */
        get imageWidth(): number;
        set imageWidth(val: number);
        private responsiveImageWidth;
        get renderedImageWidth(): string;
        /**
         * Specifies how to resize images or videos to fit them into their containers.
         *
         * Refer to the [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) CSS property description for information on accepted values.
         * @see imageHeight
         * @see imageWidth
         */
        get imageFit(): string;
        set imageFit(val: string);
        /**
         * Specifies the type of content that choice items display.
         *
         * Possible values:
         *
         * - `"image"` - Images in one of the following formats: JPEG, GIF, PNG, APNG, SVG, BMP, ICO.
         * - `"video"` - Videos in one of the following formats: MP4, MOV, WMV, FLV, AVI, MKV.
         * - `"youtube"` - Links to YouTube videos.
         * - `"auto"` (default) - Selects one of the above based on the `imageLink` property value of each choice item.
         */
        get contentMode(): string;
        set contentMode(val: string);
        protected convertDefaultValue(val: any): any;
        get inputType(): "checkbox" | "radio";
        protected isFootChoice(_item: ItemValue, _question: QuestionSelectBase): boolean;
        getSelectBaseRootCss(): string;
        private isResponsiveValue;
        maxImageWidth: number;
        minImageWidth: number;
        maxImageHeight: number;
        minImageHeight: number;
        private get isResponsive();
        private get exactSizesAreEmpty();
        private calcIsResponsive;
        protected getObservedElementSelector(): string;
        protected supportResponsiveness(): boolean;
        protected needResponsiveness(): boolean;
        private _width;
        onContentLoaded: (item: ImageItemValue, event: any) => void;
        private responsiveColCount;
        protected getCurrentColCount(): number;
        protected processResponsiveness(_: number, availableWidth: number): boolean;
        private gapBetweenItems;
        afterRender(el: HTMLElement): void;
    }
}
declare module "dragdrop/choices" {
    import { ItemValue } from "itemvalue";
    import { QuestionSelectBase } from "question_baseselect";
    import { DragDropCore } from "dragdrop/core";
    export class DragDropChoices extends DragDropCore<QuestionSelectBase> {
        protected get draggedElementType(): string;
        protected createDraggedElementShortcut(text: string, draggedElementNode: HTMLElement, event: PointerEvent): HTMLElement;
        private createImagePickerShortcut;
        protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
        protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
        private getVisibleChoices;
        protected doDragOver: () => any;
        protected isDropTargetValid(dropTarget: ItemValue): boolean;
        protected doBanDropHere: () => any;
        protected calculateIsBottom(clientY: number): boolean;
        protected afterDragOver(dropTargetNode: HTMLElement): void;
        protected doDrop(): any;
        protected doClear(): void;
        private updateVisibleChoices;
    }
}
declare module "dragdrop/ranking-choices" {
    import { ItemValue } from "itemvalue";
    import { DragDropChoices } from "dragdrop/choices";
    export class DragDropRankingChoices extends DragDropChoices {
        protected get draggedElementType(): string;
        protected createDraggedElementShortcut(text: string, draggedElementNode: HTMLElement, event: PointerEvent): HTMLElement;
        private get shortcutClass();
        protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
        private isDragOverRootNode;
        protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
        private getIsDragOverRootNode;
        protected isDropTargetValid(dropTarget: ItemValue, dropTargetNode?: HTMLElement): boolean;
        protected calculateIsBottom(clientY: number): boolean;
        protected doDragOver: () => any;
        protected afterDragOver(dropTargetNode: HTMLElement): void;
        private updateDraggedElementShortcut;
        protected ghostPositionChanged(): void;
        protected doBanDropHere: () => any;
        protected doDrop: () => any;
        protected doClear: () => void;
    }
}
declare module "question_ranking" {
    import { ISurveyImpl } from "base-interfaces";
    import { DragDropRankingChoices } from "dragdrop/ranking-choices";
    import { ItemValue } from "itemvalue";
    import { QuestionCheckboxModel } from "question_checkbox";
    import { QuestionSelectBase } from "question_baseselect";
    /**
     * A class that describes the Ranking question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-ranking/ (linkStyle))
     */
    export class QuestionRankingModel extends QuestionCheckboxModel {
        private domNode;
        constructor(name: string);
        protected getDefaultItemComponent(): string;
        getType(): string;
        getItemTabIndex(item: ItemValue): number;
        get rootClass(): string;
        protected getItemClassCore(item: ItemValue, options: any): string;
        protected isItemCurrentDropTarget(item: ItemValue): boolean;
        get ghostPositionCssClass(): string;
        getNumberByIndex(index: number): string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        isAnswerCorrect(): boolean;
        onSurveyValueChanged(newValue: any): void;
        protected onVisibleChoicesChanged: () => void;
        localeChanged: () => void;
        private addToValueByVisibleChoices;
        private removeFromValueByVisibleChoices;
        get rankingChoices(): Array<ItemValue>;
        private updateRankingChoices;
        dragDropRankingChoices: DragDropRankingChoices;
        currentDropTarget: ItemValue;
        dropTargetNodeMove: string;
        endLoadingFromJson(): void;
        handlePointerDown: (event: PointerEvent, choice: ItemValue, node: HTMLElement) => void;
        private isDragStartNodeValid;
        private get allowStartDrag();
        afterRenderQuestionElement(el: HTMLElement): void;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        handleKeydown: (event: KeyboardEvent, choice: ItemValue) => void;
        protected supportSelectAll(): boolean;
        supportOther(): boolean;
        supportNone(): boolean;
        private handleArrowUp;
        private handleArrowDown;
        private focusItem;
        setValue: () => void;
        protected getChoicesFromQuestion(question: QuestionSelectBase): Array<ItemValue>;
        private setValueFromUI;
        private syncNumbers;
        private setGhostText;
        getIconHoverCss(): string;
        getIconFocusCss(): string;
        /**
         * Specifies whether to use a long tap (press and hold) gesture to start dragging.
         *
         * Default value: `true`
         *
         * Disable this property if you want to start dragging when users perform a scroll gesture.
        */
        get longTap(): boolean;
        set longTap(val: boolean);
    }
}
declare module "question_comment" {
    import { QuestionTextBase } from "question_textbase";
    /**
     * A class that describes the Comment question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-comment/ (linkStyle))
     */
    export class QuestionCommentModel extends QuestionTextBase {
        private element;
        /**
         * Specifies the visible height of the comment area, measured in lines.
         *
         * The value of this property is passed on to the `rows` attribute of the underlying `<textarea>` element.
         * @see cols
         */
        get rows(): number;
        set rows(val: number);
        /**
         * Specifies the visible width of the comment area, measured in average character width.
         *
         * The value of this property is passed on to the `cols` attribute of the underlying `<textarea>` element.
         * @see rows
         */
        get cols(): number;
        set cols(val: number);
        /**
         * Specifies whether the question allows line breaks.
         *
         * When this property is enabled, a user can press Enter to insert line breaks. They are saved as `\n` in survey results. The Comment question also recognizes and interprets the `\n` sequence as a line break when you set the question `value` in code.
         */
        get acceptCarriageReturn(): boolean;
        set acceptCarriageReturn(val: boolean);
        /**
         * Specifies whether the comment area automatically increases its height to accomodate multi-line content.
         *
         * Default value: `false` (inherited from `SurveyModel`'s [`autoGrowComment`](https://surveyjs.io/form-library/documentation/surveymodel#autoGrowComment) property)
         */
        get autoGrow(): boolean;
        set autoGrow(val: boolean);
        getType(): string;
        afterRenderQuestionElement(el: HTMLElement): void;
        updateElement(): void;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        onInput(event: any): void;
        onKeyDown(event: any): void;
        onValueChanged(): void;
        protected setNewValue(newValue: string): any;
        get className(): string;
    }
}
declare module "question_file" {
    import { Question } from "question";
    import { EventBase } from "base";
    import { SurveyError } from "survey-error";
    import { ActionContainer } from "actions/container";
    import { Action } from "actions/action";
    /**
     * A class that describes the File question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-file/ (linkStyle))
     */
    export class QuestionFileModel extends Question {
        private isUploading;
        isDragging: boolean;
        /**
         * An event that is raised after the upload state has changed.
         *
         * Parameters:
         *
         * - `sender`: `SurveyModel`\
         * A survey instance that raised the event.
         * - `options.state`: `String`\
         * The current upload state: `"empty"`, `"loading"`, `"loaded"`, or `"error"`.
         */
        onUploadStateChanged: EventBase<QuestionFileModel>;
        onStateChanged: EventBase<QuestionFileModel>;
        previewValue: any[];
        currentState: string;
        indexToShow: number;
        containsMultiplyFiles: boolean;
        mobileFileNavigator: ActionContainer;
        protected prevFileAction: Action;
        protected nextFileAction: Action;
        protected fileIndexAction: Action;
        get mobileFileNavigatorVisible(): boolean;
        constructor(name: string);
        protected updateElementCssCore(cssClasses: any): void;
        private getFileIndexCaption;
        isPreviewVisible(index: number): boolean;
        getType(): string;
        clearOnDeletingContainer(): void;
        /**
         * Disable this property only to implement a custom preview.
         *
         * [View Demo](https://surveyjs.io/form-library/examples/file-custom-preview/ (linkStyle))
         * @see allowImagesPreview
         */
        get showPreview(): boolean;
        set showPreview(val: boolean);
        /**
         * Specifies whether users can upload multiple files.
         *
         * Default value: `false`
         */
        get allowMultiple(): boolean;
        set allowMultiple(val: boolean);
        /**
         * The image height.
         */
        get imageHeight(): string;
        set imageHeight(val: string);
        /**
         * The image width.
         */
        get imageWidth(): string;
        set imageWidth(val: string);
        /**
         * An [accept](https://www.w3schools.com/tags/att_input_accept.asp) attribute value for the underlying `<input>` element.
         */
        get acceptedTypes(): string;
        set acceptedTypes(val: string);
        /**
         * Specifies whether to store file content as text in `SurveyModel`'s [`data`](https://surveyjs.io/form-library/documentation/surveymodel#data) property.
         *
         * If you disable this property, implement `SurveyModel`'s [`onUploadFiles`](https://surveyjs.io/form-library/documentation/surveymodel#onUploadFiles) event handler to specify how to store file content.
         */
        get storeDataAsText(): boolean;
        set storeDataAsText(val: boolean);
        /**
         * Enable this property if you want to wait until files are uploaded to complete the survey.
         *
         * Default value: `false`
         */
        get waitForUpload(): boolean;
        set waitForUpload(val: boolean);
        /**
         * Specifies whether to show a preview of image files.
         */
        get allowImagesPreview(): boolean;
        set allowImagesPreview(val: boolean);
        /**
         * Maximum allowed file size, measured in bytes.
         *
         * Default value: 0 (unlimited)
         */
        get maxSize(): number;
        set maxSize(val: number);
        /**
         * Specifies whether users should confirm file deletion.
         *
         * Default value: `false`
         */
        get needConfirmRemoveFile(): boolean;
        set needConfirmRemoveFile(val: boolean);
        getConfirmRemoveMessage(fileName: string): string;
        confirmRemoveMessage: string;
        confirmRemoveAllMessage: string;
        noFileChosenCaption: string;
        chooseButtonCaption: string;
        clearButtonCaption: string;
        removeFileCaption: string;
        loadingFileTitle: string;
        chooseFileTitle: string;
        dragAreaPlaceholder: string;
        get inputTitle(): string;
        clear(doneCallback?: () => void): void;
        get multipleRendered(): string;
        get showRemoveButton(): any;
        get showRemoveButtonBottom(): any;
        defaultImage(data: any): boolean;
        /**
         * Removes a file with a specified name.
         */
        removeFile(name: string): void;
        protected removeFileByContent(content: any): void;
        /**
         * Loads multiple files into the question.
         * @param files An array of [File](https://developer.mozilla.org/en-US/docs/Web/API/File) objects.
         */
        loadFiles(files: File[]): void;
        canPreviewImage(fileItem: any): boolean;
        protected loadPreview(newValue: any): void;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected stateChanged(state: string): void;
        private allFilesOk;
        private isFileImage;
        getPlainData(options?: {
            includeEmpty?: boolean;
            calculations?: Array<{
                propertyName: string;
            }>;
        }): import("question").IQuestionPlainData;
        getChooseFileCss(): string;
        getReadOnlyFileCss(): string;
        get fileRootCss(): string;
        getFileDecoratorCss(): string;
        private onChange;
        protected onChangeQuestionValue(newValue: any): void;
        private rootElement;
        afterRender(el: HTMLElement): void;
        private dragCounter;
        onDragEnter: (event: any) => void;
        onDragOver: (event: any) => boolean;
        onDrop: (event: any) => void;
        onDragLeave: (event: any) => void;
        doChange: (event: any) => void;
        doClean: (event: any) => void;
        doRemoveFile(data: any): void;
        doDownloadFile: (event: any, data: any) => void;
    }
    export class FileLoader {
        private fileQuestion;
        private callback;
        constructor(fileQuestion: QuestionFileModel, callback: (status: string, files: any[]) => void);
        loaded: any[];
        load(files: Array<any>): void;
        dispose(): void;
    }
}
declare module "question_html" {
    import { QuestionNonValue } from "questionnonvalue";
    import { LocalizableString } from "localizablestring";
    /**
      * A class that describes the Html question type. Unlike other question types, Html cannot have a title or value.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-html/ (linkStyle))
     */
    export class QuestionHtmlModel extends QuestionNonValue {
        ignoreHtmlProgressing: boolean;
        constructor(name: string);
        getType(): string;
        get isCompositeQuestion(): boolean;
        getProcessedText(text: string): string;
        /**
         * HTML markup to display.
         *
         * > IMPORTANT: If you get the markup from a third party, ensure that it does not contain malicious code.
         */
        get html(): string;
        set html(val: string);
        get locHtml(): LocalizableString;
        get processedHtml(): string;
    }
}
declare module "question_radiogroup" {
    import { QuestionCheckboxBase } from "question_baseselect";
    import { ItemValue } from "itemvalue";
    import { Action } from "actions/action";
    /**
     * A class that describes the Radiogroup question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-radiogroup/ (linkStyle))
     */
    export class QuestionRadiogroupModel extends QuestionCheckboxBase {
        constructor(name: string);
        protected getDefaultItemComponent(): string;
        getType(): string;
        get ariaRole(): string;
        get titleAriaLabel(): string | null;
        protected getFirstInputElementId(): string;
        /**
         * Returns the selected choice item. If no item is selected, returns `null`.
         */
        get selectedItem(): ItemValue;
        /**
         * Specifies whether to display a button that clears the question value.
         *
         * Default value: `false`
         */
        get showClearButton(): boolean;
        set showClearButton(val: boolean);
        get canShowClearButton(): boolean;
        get clearButtonCaption(): string;
        supportGoNextPageAutomatic(): boolean;
        get showClearButtonInContent(): boolean;
        protected getDefaultTitleActions(): Array<Action>;
    }
}
declare module "question_rating" {
    import { ItemValue } from "itemvalue";
    import { Question } from "question";
    import { LocalizableString } from "localizablestring";
    import { Base } from "base";
    export class RenderedRatingItem extends Base {
        itemValue: ItemValue;
        private locString;
        get value(): number;
        get locText(): LocalizableString;
        constructor(itemValue: ItemValue, locString?: LocalizableString);
    }
    /**
     * A Model for a rating question.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-rating/ (linkStyle))
     */
    export class QuestionRatingModel extends Question {
        constructor(name: string);
        endLoadingFromJson(): void;
        /**
         * A list of rate values.
         *
         * This property accepts an array of objects with the following structure:
         *
         * ```js
         * {
         *   "value": any, // A value to be saved in survey results
         *   "text": String, // A display text. This property supports Markdown. When `text` is undefined, `value` is used.
         *   "customProperty": any // Any property that you find useful.
         * }
         * ```
         *
         * If you add custom properties, refer to the following help topic to learn how to serialize them into JSON: [Add Custom Properties to Property Grid](https://surveyjs.io/survey-creator/documentation/property-grid#add-custom-properties-to-the-property-grid).
         *
         * To enable Markdown support for the `text` property, implement Markdown-to-HTML conversion in the [onTextMarkdown](https://surveyjs.io/form-library/documentation/api-reference/survey-data-model#onTextMarkdown) event handler. For an example, refer to the following demo: [Convert Markdown to HTML with Showdown](https://surveyjs.io/form-library/examples/edit-survey-questions-markdown/).
         *
         * If you need to specify only the `value` property, you can set the `rateValues` property to an array of numbers, for example, `[ 3, 6, 10 ]`. These values are both saved in survey results and used as display text.
         *
         * If you do not specify the `rateValues` property, rate values are generated automatically based upon the `rateMin`, `rateMax`, and `rateStep` property values.
         * @see rateMin
         * @see rateMax
         * @see rateStep
         */
        get rateValues(): Array<any>;
        set rateValues(val: Array<any>);
        /**
         * Specifies the first rate value in the generated sequence of rate values. Applies if the `rateValues` array is empty.
         *
         * Default value: 1
         * @see rateValues
         * @see rateMax
         * @see rateStep
         */
        get rateMin(): number;
        set rateMin(val: number);
        /**
         * Specifies the last rate value in the generated sequence of rate values. Applies if the `rateValues` array is empty.
         *
         * Default value: 5
         * @see rateValues
         * @see rateMin
         * @see rateStep
         */
        get rateMax(): number;
        set rateMax(val: number);
        /**
         * Specifies a step with which to generate rate values. Applies if the `rateValues` array is empty.
         *
         * Default value: 1
         * @see rateValues
         * @see rateMin
         * @see rateMax
         */
        get rateStep(): number;
        set rateStep(val: number);
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        get visibleRateValues(): ItemValue[];
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        private createRenderedRateItems;
        renderedRateItems: Array<RenderedRatingItem>;
        private correctValue;
        getType(): string;
        protected getFirstInputElementId(): string;
        getInputId(index: number): string;
        supportGoNextPageAutomatic(): boolean;
        supportOther(): boolean;
        /**
         * Specifies a description for the minimum (first) rate value.
         * @see rateValues
         * @see rateMin
         * @see displayRateDescriptionsAsExtremeItems
         */
        get minRateDescription(): string;
        set minRateDescription(val: string);
        get locMinRateDescription(): LocalizableString;
        /**
         * Specifies a description for the maximum (last) rate value.
         * @see rateValues
         * @see rateMax
         * @see displayRateDescriptionsAsExtremeItems
         */
        get maxRateDescription(): string;
        set maxRateDescription(val: string);
        get locMaxRateDescription(): LocalizableString;
        hasMinRateDescription: boolean;
        hasMaxRateDescription: boolean;
        get hasMinLabel(): boolean;
        get hasMaxLabel(): boolean;
        /**
        * Specifies whether to display `minRateDescription` and `maxRateDescription` values as captions for buttons that correspond to the extreme (first and last) rate values.
        *
        * Default value: `false`
        *
        * If this property is disabled, the `minRateDescription` and `maxRateDescription` values are displayed as plain non-clickable texts.
        *
        * If any of the `minRateDescription` and `maxRateDescription` properties is empty, the corresponding rate value's `value` or `text` is displayed as a button caption.
        * @see minRateDescription
        * @see maxRateDescription
        * @see rateMin
        * @see rateMax
        * @see rateValues
        */
        displayRateDescriptionsAsExtremeItems: boolean;
        /**
        * Specifies how a Rating question displays rate values.
        *
        * Possible values:
        *
        * - `"buttons"` - Displays rate values as buttons in a row.
        * - `"dropdown"` - Displays rate values as items in a drop-down list.
        * - `"auto"` (default) - Selects between the `"buttons"` and `"dropdown"` modes based on the available width. When the width is insufficient to display buttons, the question displays a dropdown.
        */
        displayMode: "dropdown" | "buttons" | "auto";
        protected valueToData(val: any): any;
        setValueFromClick(value: any): void;
        get ratingRootCss(): string;
        getItemClass(item: ItemValue): string;
        getControlClass(): string;
        get placeholder(): string;
        set placeholder(val: string);
        get locPlaceholder(): LocalizableString;
        get allowClear(): boolean;
        get searchEnabled(): boolean;
        get renderedValue(): boolean;
        set renderedValue(val: any);
        isItemSelected(item: ItemValue): boolean;
        get visibleChoices(): ItemValue[];
        get readOnlyText(): any;
        needResponsiveWidth(): boolean;
        protected supportResponsiveness(): boolean;
        protected getCompactRenderAs(): string;
        protected getDesktopRenderAs(): string;
    }
}
declare module "question_boolean" {
    import { Question } from "question";
    import { LocalizableString } from "localizablestring";
    /**
     * A class that describes the Boolean question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-boolean/ (linkStyle))
     */
    export class QuestionBooleanModel extends Question {
        constructor(name: string);
        getType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        supportGoNextPageAutomatic(): boolean;
        get isIndeterminate(): boolean;
        get hasTitle(): boolean;
        /**
         * Gets or sets the question value as a Boolean value.
         *
         * If you set the `valueTrue` and `valueFalse` properties, the `value` property contains their values instead of Boolean values. This may be inconvenient when you operate the question value in code. To access the standard Boolean values, use the `booleanValue` property.
         * @see valueTrue
         * @see valueFalse
         */
        get booleanValue(): any;
        set booleanValue(val: any);
        booleanValueRendered: boolean;
        get checkedValue(): any;
        set checkedValue(val: any);
        private setBooleanValue;
        get defaultValue(): any;
        set defaultValue(val: any);
        getDefaultValue(): any;
        get locTitle(): LocalizableString;
        get labelRenderedAriaID(): string;
        showTitle: boolean;
        label: string;
        get isLabelRendered(): boolean;
        get canRenderLabelDescription(): boolean;
        /**
         * Gets or sets a text label that corresponds to a positive answer.
         *
         * Default value: "Yes"
         * @see valueTrue
         * @see valueFalse
         */
        get labelTrue(): any;
        set labelTrue(val: any);
        get locLabelTrue(): LocalizableString;
        get isDeterminated(): boolean;
        /**
         * Gets or sets a text label that corresponds to a negative answer.
         *
         * Default value: "No"
         * @see valueTrue
         * @see valueFalse
         */
        get labelFalse(): any;
        set labelFalse(val: any);
        get locLabelFalse(): LocalizableString;
        /**
         * A value to save in survey results when respondents give a positive answer.
         *
         * Default value: `true`
         * @see labelTrue
         * @see labelFalse
         */
        valueTrue: any;
        /**
         * A value to save in survey results when respondents give a negative answer.
         *
         * Default value: `false`
         * @see labelTrue
         * @see labelFalse
         */
        valueFalse: any;
        getValueTrue(): any;
        getValueFalse(): any;
        protected setDefaultValue(): void;
        private isDefaultValueSet;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        private getItemCssValue;
        getItemCss(): string;
        getCheckboxItemCss(): string;
        getLabelCss(checked: boolean): string;
        get svgIcon(): string;
        get allowClick(): boolean;
        getCheckedLabel(): LocalizableString;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onLabelClick(event: any, value: boolean): boolean;
        private calculateBooleanValueByEvent;
        onSwitchClickModel(event: any): boolean;
        onKeyDownCore(event: any): boolean;
        getRadioItemClass(css: any, value: any): string;
        protected supportResponsiveness(): boolean;
        protected getCompactRenderAs(): string;
    }
}
declare module "question_image" {
    import { QuestionNonValue } from "questionnonvalue";
    import { LocalizableString } from "localizablestring";
    /**
      * A class that describes the Image question type. Unlike other question types, Image cannot have a title or value.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/questiontype-image/ (linkStyle))
     */
    export class QuestionImageModel extends QuestionNonValue {
        constructor(name: string);
        getType(): string;
        get isCompositeQuestion(): boolean;
        onSurveyLoad(): void;
        /**
         * Specifies an image or video URL.
         * @see contentMode
         */
        get imageLink(): string;
        set imageLink(val: string);
        get locImageLink(): LocalizableString;
        /**
         * Specifies a value for the `alt` attribute of the underlying `<img>` element.
         */
        get altText(): string;
        set altText(val: string);
        get locAltText(): LocalizableString;
        /**
         * Specifies the height of a container for the image or video. Accepts positive numbers and CSS values.
         *
         * Default value: 150
         *
         * Use the `imageFit` property to specify how to fit the image or video into the container.
         * @see imageWidth
         * @see imageFit
         */
        get imageHeight(): string;
        set imageHeight(val: string);
        get renderedHeight(): string;
        /**
         * Specifies the width of a container for the image or video. Accepts positive numbers and CSS values.
         *
         * Default value: 200
         *
         * Use the `imageFit` property to specify how to fit the image or video into the container.
         * @see imageHeight
         * @see imageFit
         */
        get imageWidth(): string;
        set imageWidth(val: string);
        get renderedWidth(): string;
        /**
         * Specifies how to resize the image or video to fit it into its container.
         *
         * Refer to the [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) CSS property description for information on accepted values.
         * @see imageHeight
         * @see imageWidth
         */
        get imageFit(): string;
        set imageFit(val: string);
        /**
         * Specifies the type of content that the Image question displays.
         *
         * Possible values:
         *
         * - `"image"` - An image in one of the following formats: JPEG, GIF, PNG, APNG, SVG, BMP, ICO.
         * - `"video"` - A video in one of the following formats: MP4, MOV, WMV, FLV, AVI, MKV.
         * - `"youtube"` - A link to a YouTube video.
         * - `"auto"` (default) - Selects one of the above based on the [`imageLink`](https://surveyjs.io/form-library/documentation/questionimagemodel#imageLink) property.
         */
        get contentMode(): string;
        set contentMode(val: string);
        /**
         * Returns the type of content that the Image question displays: `"image"`, `"video"`, or `"youtube"`.
         * @see contentMode
         */
        get renderedMode(): string;
        getImageCss(): string;
        private setRenderedMode;
        protected calculateRenderedMode(): void;
        private isYoutubeVideo;
        private isVideo;
    }
}
declare module "question_signaturepad" {
    import { Question } from "question";
    /**
     * A class that describes the Signature Page question type.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/signature-pad-widget-javascript/ (linkStyle))
     */
    export class QuestionSignaturePadModel extends Question {
        isDrawingValue: boolean;
        protected getCssRoot(cssClasses: any): string;
        protected updateValue(): void;
        constructor(name: string);
        getType(): string;
        afterRenderQuestionElement(el: HTMLElement): void;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        initSignaturePad(el: HTMLElement): void;
        destroySignaturePad(el: HTMLElement): void;
        /**
         * Specifies the format in which to store the signature image.
         *
         * Possible values:
         *
         * - `""` (default) - PNG
         * - `"image/jpeg"` - JPEG
         * - `"image/svg+xml"` - SVG
         */
        dataFormat: string;
        /**
         * Specifies the width of the signature area. Accepts positive integer numbers.
         */
        get signatureWidth(): number;
        set signatureWidth(val: number);
        /**
         * Specifies the height of the signature area. Accepts positive integer numbers.
         */
        get signatureHeight(): number;
        set signatureHeight(val: number);
        get height(): number;
        set height(val: number);
        /**
         * Specifies whether to display a button that clears the signature area.
         *
         * Default value: `true`
         */
        get allowClear(): boolean;
        set allowClear(val: boolean);
        get canShowClearButton(): boolean;
        /**
         * Specifies a color for the pen. Accepts hexadecimal colors (`"#FF0000"`), RGB colors (`"rgb(255,0,0)"`), or color names (`"red"`).
         * @see backgroundColor
         */
        get penColor(): string;
        set penColor(val: string);
        /**
         * Specifies a color for the signature area background.  Accepts hexadecimal colors (`"#FF0000"`), RGB colors (`"rgb(255,0,0)"`), or color names (`"red"`).
         * @see penColor
         */
        get backgroundColor(): string;
        set backgroundColor(val: string);
        get clearButtonCaption(): string;
        needShowPlaceholder(): boolean;
        get placeHolderText(): string;
        endLoadingFromJson(): void;
    }
}
declare module "surveyProgress" {
    export class SurveyProgressModel {
        static getProgressTextInBarCss(css: any): string;
        static getProgressTextUnderBarCss(css: any): string;
    }
}
declare module "surveyProgressButtons" {
    import { SurveyModel } from "survey";
    export class SurveyProgressButtonsModel {
        private survey;
        constructor(survey: SurveyModel);
        isListElementClickable(index: number): boolean;
        getListElementCss(index: number): string;
        getScrollButtonCss(hasScroller: boolean, isLeftScroll: boolean): string;
        clickListElement(index: number): void;
    }
}
declare module "popup-survey" {
    import { Base } from "base";
    import { SurveyModel } from "survey";
    import { LocalizableString } from "localizablestring";
    /**
     * A Model for a survey running in the Popup Window.
     *
     * [View Demo](https://surveyjs.io/form-library/examples/popup-survey/ (linkStyle))
     */
    export class PopupSurveyModel extends Base {
        surveyValue: SurveyModel;
        windowElement: HTMLDivElement;
        templateValue: string;
        expandedChangedCallback: () => void;
        showingChangedCallback: () => void;
        constructor(jsonObj: any, initialModel?: SurveyModel);
        protected onCreating(): void;
        getType(): string;
        /**
         * A survey object.
         * @see SurveyModel
         */
        get survey(): SurveyModel;
        /**
         * Set this value to negative value, for example -1, to avoid closing the popup window on completing the survey. Leave it equals to 0 (default value) to close the popup window immediately, or set it to 3, 5, 10, ... to close the popup window in 3, 5, 10 seconds.
         */
        closeOnCompleteTimeout: number;
        /**
         * Returns true if the popup window is currently showing. Set it to true to show the popup window and false to hide it.
         * @see show
         * @see hide
         */
        get isShowing(): boolean;
        set isShowing(val: boolean);
        /**
         * Show the popup window
         * @see hide
         * @see isShowing
         */
        show(): void;
        /**
         * Hide the popup window
         * @see show
         * @see isShowing
         */
        hide(): void;
        /**
         * Returns true if the popup window is expanded. Set it to true to expand the popup window or false to collapse it.
         * @see expand
         * @see collapse
         */
        get isExpanded(): boolean;
        set isExpanded(val: boolean);
        protected onExpandedChanged(): void;
        /**
         * The popup window and survey title.
         */
        get title(): string;
        set title(value: string);
        get locTitle(): LocalizableString;
        /**
         * Expand the popup window to show the survey.
         */
        expand(): void;
        /**
         * Collapse the popup window and show survey title only.
         */
        collapse(): void;
        changeExpandCollapse(): void;
        get css(): any;
        get cssButton(): string;
        get cssRoot(): string;
        get cssBody(): string;
        get cssHeaderRoot(): string;
        get cssHeaderTitle(): string;
        get renderedWidth(): string;
        width: string;
        private updateCss;
        private updateCssButton;
        private setCssButton;
        protected createSurvey(jsonObj: any): SurveyModel;
        protected onSurveyComplete(): void;
    }
    /**
     * Obsolete. Please use PopupSurvey
     */
    export class SurveyWindowModel extends PopupSurveyModel {
    }
}
declare module "question_custom" {
    import { Question, IConditionObject } from "question";
    import { ISurveyImpl, ISurveyData, ITextProcessor, IPanel, IElement, IQuestion, IProgressInfo } from "base-interfaces";
    import { SurveyElement } from "survey-element";
    import { PanelModel } from "panel";
    import { HashTable } from "helpers";
    import { ItemValue } from "itemvalue";
    /**
     * An interface used to create custom question types.
     *
     * Refer to the following articles for more information:
     *
     * - [Create Specialized Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-specialized-question-types)
     * - [Create Composite Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types)
     */
    export interface ICustomQuestionTypeConfiguration {
        /**
         * A name used to identify a custom question type.
         *
         * @see title
         */
        name: string;
        /**
         * A title used for this custom question type in the UI. When `title` is not specified, the `name` property value is used.
         *
         * @see name
         */
        title?: string;
        /**
         * An icon for the custom question type.
         */
        icon?: string;
        /**
         * A function that is called when the custom question type is initialized. Use it to add, remove, or modify the type's properties (see [Override Base Question Properties](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types#override-base-question-properties)).
         */
        onInit?(): void;
        /**
         * Specifies whether the custom question type is available in the Toolbox and the Add Question menu.
         *
         * Default value: `true`
         *
         * Set this property to `false` if your custom question type is used only to customize Property Grid content and is not meant for a survey.
         */
        showInToolbox?: boolean;
        /**
         * A function that is called when the custom question is created. Use it to access questions nested within a [composite question type](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types).
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * The custom question.
         */
        onCreated?(question: Question): void;
        /**
         * A function that is called when JSON schemas are loaded.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A custom question.
         */
        onLoaded?(question: Question): void;
        /**
         * A function that is called after the entire question is rendered.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A custom question.
         * - `htmlElement`: `any`\
         * An HTML element that represents the custom question.
         */
        onAfterRender?(question: Question, htmlElement: any): void;
        /**
         * A function that is called each time a question nested within a [composite question](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types) is rendered.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A composite question.
         * - `element`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A nested question.
         * - `htmlElement`: `any`\
         * An HTML element that represents a nested question.
         */
        onAfterRenderContentElement?(question: Question, element: Question, htmlElement: any): void;
        /**
         * A function that is called when a custom question type property is changed. Use it to handle property changes.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A custom question.
         * - `propertyName`: `String`\
         * The name of the changed property.
         * - `newValue`: `any`\
         * A new value for the property.
         */
        onPropertyChanged?(question: Question, propertyName: string, newValue: any): void;
        /**
         * A function that is called when the question value is changed.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A custom question.
         * - `name`: `String`\
         * The question's [name](https://surveyjs.io/Documentation/Library?id=Question#name).
         * - `newValue`: `any`\
         * A new value for the question.
         */
        onValueChanged?(question: Question, name: string, newValue: any): void;
        /**
         * A function that is called when an [ItemValue](https://surveyjs.io/Documentation/Library?id=itemvalue) property is changed.
         *
         * Parameters:
         *
         * - `question`: [Question](https://surveyjs.io/Documentation/Library?id=Question)\
         * A custom question.
         * - `options.obj`: [ItemValue](https://surveyjs.io/Documentation/Library?id=itemvalue)\
         * An `ItemValue` object.
         * - `options.propertyName`: `String`\
         * The name of the property to which an array of `ItemValue` objects is assigned (for example, `"choices"` or `"rows"`).
         * - `options.name`: `String`\
         * The name of the changed property: `"text"` or `"value"`.
         * - `options.newValue`: `any`\
         * A new value for the property.
         */
        onItemValuePropertyChanged?(question: Question, options: {
            obj: ItemValue;
            propertyName: string;
            name: string;
            newValue: any;
        }): void;
        /**
         * A function that allows you to override the default `getDisplayValue()` implementation.
         */
        getDisplayValue?: ((keyAsText: boolean, value: any) => any) | ((question: Question) => any);
        /**
         * JSON schemas of nested questions. Specify this property to create a [composite question type](https://surveyjs.io/Documentation/Survey-Creator?id=create-composite-question-types).
         */
        elementsJSON?: any;
        /**
         * A function that allows you to create nested questions if you do not specify the `elementsJSON` property.
         *
         * @see elementsJSON
         */
        createElements?: any;
        /**
         * A JSON schema for a built-in question type on which the custom question type is based.
         *
         * Refer to the [Create Specialized Question Types](https://surveyjs.io/Documentation/Survey-Creator?id=create-specialized-question-types) help topic for more information.
         */
        questionJSON?: any;
        /**
         * A function that allows you to create a custom question if you do not specify the `questionJSON` property.
         *
         * @see questionJSON
         */
        createQuestion?: any;
    }
    export class ComponentQuestionJSON {
        name: string;
        json: ICustomQuestionTypeConfiguration;
        constructor(name: string, json: ICustomQuestionTypeConfiguration);
        onInit(): void;
        onCreated(question: Question): void;
        onLoaded(question: Question): void;
        onAfterRender(question: Question, htmlElement: any): void;
        onAfterRenderContentElement(question: Question, element: Question, htmlElement: any): void;
        onPropertyChanged(question: Question, propertyName: string, newValue: any): void;
        onValueChanged(question: Question, name: string, newValue: any): void;
        onItemValuePropertyChanged(question: Question, item: ItemValue, propertyName: string, name: string, newValue: any): void;
        getDisplayValue(keyAsText: boolean, value: any, question: Question): any;
        get isComposite(): boolean;
    }
    export class ComponentCollection {
        static Instance: ComponentCollection;
        private customQuestionValues;
        onCreateComposite: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCompositeModel;
        onCreateCustom: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCustomModel;
        onAddingJson: (name: string, isComposite: boolean) => void;
        add(json: ICustomQuestionTypeConfiguration): void;
        get items(): Array<ComponentQuestionJSON>;
        getCustomQuestionByName(name: string): ComponentQuestionJSON;
        clear(): void;
        createQuestion(name: string, questionJSON: ComponentQuestionJSON): Question;
        protected createCompositeModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCompositeModel;
        protected createCustomModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCustomModel;
    }
    export abstract class QuestionCustomModelBase extends Question implements ISurveyImpl, ISurveyData, IPanel {
        customQuestion: ComponentQuestionJSON;
        constructor(name: string, customQuestion: ComponentQuestionJSON);
        getType(): string;
        locStrsChanged(): void;
        protected createWrapper(): void;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        onFirstRendering(): void;
        getProgressInfo(): IProgressInfo;
        protected abstract getElement(): SurveyElement;
        protected initElement(el: SurveyElement): void;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        onSurveyLoad(): void;
        afterRenderQuestionElement(el: HTMLElement): void;
        afterRender(el: any): void;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected setNewValue(newValue: any): void;
        getSurveyData(): ISurveyData;
        getTextProcessor(): ITextProcessor;
        getValue(name: string): any;
        setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
        protected convertDataName(name: string): string;
        protected convertDataValue(name: string, newValue: any): any;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): any;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        findQuestionByName(name: string): IQuestion;
        addElement(element: IElement, index: number): void;
        removeElement(element: IElement): boolean;
        getQuestionTitleLocation(): string;
        getQuestionStartIndex(): string;
        getChildrenLayoutType(): string;
        elementWidthChanged(el: IElement): void;
        get elements(): Array<IElement>;
        indexOf(el: IElement): number;
        ensureRowsVisibility(): void;
        protected getContentDisplayValueCore(keyAsText: boolean, value: any, question: Question): any;
    }
    export class QuestionCustomModel extends QuestionCustomModelBase {
        private questionWrapper;
        getTemplate(): string;
        protected createWrapper(): void;
        protected getElement(): SurveyElement;
        onAnyValueChanged(name: string): void;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        focus(onError?: boolean): void;
        get contentQuestion(): Question;
        protected createQuestion(): Question;
        onSurveyLoad(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected convertDataName(name: string): string;
        protected convertDataValue(name: string, newValue: any): any;
        protected canSetValueToSurvey(): boolean;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        protected getValueCore(): any;
        protected initElement(el: SurveyElement): void;
        updateElementCss(reNew?: boolean): void;
        protected updateElementCssCore(cssClasses: any): void;
        protected getDisplayValueCore(keyAsText: boolean, value: any): any;
    }
    export class QuestionCompositeModel extends QuestionCustomModelBase {
        customQuestion: ComponentQuestionJSON;
        static ItemVariableName: string;
        private panelWrapper;
        private textProcessing;
        constructor(name: string, customQuestion: ComponentQuestionJSON);
        protected createWrapper(): void;
        getTemplate(): string;
        protected getElement(): SurveyElement;
        protected getCssRoot(cssClasses: any): string;
        get contentPanel(): PanelModel;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        updateElementCss(reNew?: boolean): void;
        getTextProcessor(): ITextProcessor;
        findQuestionByName(name: string): IQuestion;
        protected clearValueIfInvisibleCore(): void;
        onAnyValueChanged(name: string): void;
        protected createPanel(): PanelModel;
        protected onReadOnlyChanged(): void;
        onSurveyLoad(): void;
        private setIsContentElement;
        setVisibleIndex(val: number): number;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        getValue(name: string): any;
        private settingNewValue;
        setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        protected convertDataValue(name: string, newValue: any): any;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected getDisplayValueCore(keyAsText: boolean, value: any): any;
        private setAfterRenderCallbacks;
    }
}
declare module "popup-view-model" {
    import { Base } from "base";
    import { PopupModel } from "popup";
    import { CssClassBuilder } from "utils/cssClassBuilder";
    import { ActionContainer } from "actions/container";
    export const FOCUS_INPUT_SELECTOR = "input:not(:disabled):not([readonly]):not([type=hidden]),select:not(:disabled):not([readonly]),textarea:not(:disabled):not([readonly]), button:not(:disabled):not([readonly]), [tabindex]:not([tabindex^=\"-\"])";
    export class PopupBaseViewModel extends Base {
        protected prevActiveElement: HTMLElement;
        protected footerToolbarValue: ActionContainer;
        top: string;
        left: string;
        height: string;
        width: string;
        minWidth: string;
        isVisible: boolean;
        locale: string;
        container: HTMLElement;
        private createdContainer;
        getLocale(): string;
        protected hidePopup(): void;
        protected getStyleClass(): CssClassBuilder;
        protected getShowFooter(): boolean;
        protected getShowHeader(): boolean;
        protected getPopupHeaderTemplate(): string;
        protected createFooterActionBar(): void;
        private setupModel;
        private _model;
        get model(): PopupModel;
        set model(model: PopupModel);
        constructor(model: PopupModel);
        get title(): string;
        get contentComponentName(): string;
        get contentComponentData(): any;
        get isModal(): boolean;
        get isFocusedContent(): boolean;
        get showFooter(): boolean;
        get showHeader(): boolean;
        get popupHeaderTemplate(): string;
        get isOverlay(): boolean;
        get styleClass(): string;
        get cancelButtonText(): string;
        get footerToolbar(): ActionContainer;
        onKeyDown(event: any): void;
        private trapFocus;
        switchFocus(): void;
        updateOnShowing(): void;
        updateOnHiding(): void;
        private focusFirstInput;
        clickOutside(): void;
        cancel(): void;
        dispose(): void;
        initializePopupContainer(): void;
        unmountPopupContainer(): void;
    }
}
declare module "popup-dropdown-view-model" {
    import { IPosition } from "utils/popup";
    import { CssClassBuilder } from "utils/cssClassBuilder";
    import { PopupModel } from "popup";
    import { PopupBaseViewModel } from "popup-view-model";
    export class PopupDropdownViewModel extends PopupBaseViewModel {
        targetElement?: HTMLElement;
        private scrollEventCallBack;
        private resizeEventCallback;
        private _updatePosition;
        protected getActualHorizontalPosition(): "left" | "center" | "right";
        protected getStyleClass(): CssClassBuilder;
        protected getShowHeader(): boolean;
        protected getPopupHeaderTemplate(): string;
        popupDirection: string;
        pointerTarget: IPosition;
        constructor(model: PopupModel, targetElement?: HTMLElement);
        updateOnShowing(): void;
        private get shouldCreateResizeCallback();
        updatePosition(isResetHeight: boolean, isDelayUpdating?: boolean): void;
        updateOnHiding(): void;
    }
}
declare module "popup-modal-view-model" {
    import { CssClassBuilder } from "utils/cssClassBuilder";
    import { PopupModel } from "popup";
    import { PopupBaseViewModel } from "popup-view-model";
    export class PopupModalViewModel extends PopupBaseViewModel {
        protected getStyleClass(): CssClassBuilder;
        protected getShowFooter(): boolean;
        protected createFooterActionBar(): void;
        constructor(model: PopupModel);
        get applyButtonText(): string;
        apply(): void;
        clickOutside(): void;
        onKeyDown(event: any): void;
    }
}
declare module "popup-utils" {
    import { IDialogOptions, PopupModel } from "popup";
    import { PopupBaseViewModel } from "popup-view-model";
    export function createPopupModalViewModel(options: IDialogOptions): PopupBaseViewModel;
    export function createPopupViewModel(model: PopupModel, targetElement?: HTMLElement): PopupBaseViewModel;
}
declare module "question_buttongroup" {
    import { ItemValue } from "itemvalue";
    import { QuestionCheckboxBase } from "question_baseselect";
    import { LocalizableString } from "localizablestring";
    export class ButtonGroupItemValue extends ItemValue {
        protected typeName: string;
        constructor(value: any, text?: string, typeName?: string);
        iconName: string;
        iconSize: number;
        /**
         * By default item caption is visible.
         * Set it 'false' to hide item caption.
         */
        showCaption: boolean;
        getType(): string;
    }
    /**
     * A Model for a button group question.
     */
    export class QuestionButtonGroupModel extends QuestionCheckboxBase {
        constructor(name: string);
        getType(): string;
        protected getItemValueType(): string;
        supportOther(): boolean;
    }
    export class ButtonGroupItemModel {
        question: QuestionButtonGroupModel;
        item: ItemValue;
        index: number;
        constructor(question: QuestionButtonGroupModel, item: ItemValue, index: number);
        get value(): any;
        get iconName(): any;
        get iconSize(): any;
        get caption(): LocalizableString;
        get showCaption(): any;
        get isRequired(): boolean;
        get selected(): boolean;
        get readOnly(): boolean;
        get name(): string;
        get id(): string;
        get hasErrors(): boolean;
        get describedBy(): string;
        private get labelClass();
        get css(): {
            label: string;
            icon: any;
            control: any;
            caption: any;
            decorator: any;
        };
        onChange(): void;
    }
}
declare module "dragdrop/survey-elements" {
    import { IElement, IShortcutText } from "base-interfaces";
    import { JsonObject } from "jsonobject";
    import { PageModel } from "page";
    import { DragDropCore } from "dragdrop/core";
    export class DragDropSurveyElements extends DragDropCore<any> {
        static newGhostPage: PageModel;
        static restrictDragQuestionBetweenPages: boolean;
        static edgeHeight: number;
        static nestedPanelDepth: number;
        static ghostSurveyElementName: string;
        protected isEdge: boolean;
        protected prevIsEdge: any;
        protected ghostSurveyElement: IElement;
        protected get draggedElementType(): string;
        protected isDraggedElementSelected: boolean;
        private isRight;
        protected prevIsRight: boolean;
        startDragToolboxItem(event: PointerEvent, draggedElementJson: JsonObject, toolboxItemTitle: string): void;
        startDragSurveyElement(event: PointerEvent, draggedElement: any, isElementSelected?: boolean): void;
        protected getShortcutText(draggedElement: IShortcutText): string;
        protected createDraggedElementShortcut(text: string, draggedElementNode?: HTMLElement, event?: PointerEvent): HTMLElement;
        protected createDraggedElementIcon(): HTMLElement;
        protected getDraggedElementClass(): string;
        protected createElementFromJson(json: object): HTMLElement;
        private createNewElement;
        protected getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode: HTMLElement, event: PointerEvent): any;
        protected isDropTargetValid(): boolean;
        protected calculateIsBottom(clientY: number, dropTargetNode?: HTMLElement): boolean;
        protected calculateIsRight(clientX: number, dropTargetNode?: HTMLElement): boolean;
        protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
        private shouldRestricDragQuestionBetweenPages;
        private getPanelDropTarget;
        protected findDeepestDropTargetChild(parent: HTMLElement): HTMLElement;
        private calculateIsEdge;
        protected doDragOver(dropTargetNode?: HTMLElement, event?: PointerEvent): void;
        protected afterDragOver(dropTargetNode: HTMLElement, event: PointerEvent): void;
        protected onStartDrag(): void;
        protected doBanDropHere: () => void;
        protected doDrop: () => any;
        protected doClear: () => void;
        protected insertGhostElementIntoSurvey(): boolean;
        private calcTargetRowMultiple;
        private getTargetParent;
        private getTargetRow;
        private isDragOverInsideEmptyPanel;
        protected removeGhostElementFromSurvey(): void;
        private insertRealElementIntoSurvey;
        private createFakeTargetElement;
        private createGhostSurveyElement;
    }
}
declare module "entries/chunks/model" {
    export var Version: string;
    export function checkLibraryVersion(ver: string, libraryName: string): void;
    export { settings } from "settings";
    export { Helpers, HashTable } from "helpers";
    export { AnswerCountValidator, EmailValidator, NumericValidator, RegexValidator, SurveyValidator, TextValidator, ValidatorResult, ExpressionValidator, ValidatorRunner } from "validator";
    export { ItemValue } from "itemvalue";
    export { Base, Event, EventBase, ArrayChanges, ComputedUpdater } from "base";
    export { ISurvey, ISurveyElement, IElement, IQuestion, IPage, IPanel, ISurveyData, ITitleOwner } from "base-interfaces";
    export { SurveyError } from "survey-error";
    export { SurveyElementCore, SurveyElement, DragTypeOverMeEnum } from "survey-element";
    export { CalculatedValue } from "calculatedValue";
    export { CustomError, AnswerRequiredError, OneAnswerRequiredError, RequreNumericError, ExceedSizeError } from "error";
    export { ILocalizableOwner, ILocalizableString, LocalizableString, LocalizableStrings } from "localizablestring";
    export { HtmlConditionItem, UrlConditionItem } from "expressionItems";
    export { ChoicesRestful, ChoicesRestfull } from "choicesRestful";
    export { FunctionFactory, registerFunction } from "functionsfactory";
    export { ConditionRunner, ExpressionRunner, IExpresionExecutor, ExpressionExecutor } from "conditions";
    export { Operand, Const, BinaryOperand, Variable, FunctionOperand, ArrayOperand, UnaryOperand } from "expressions/expressions";
    export { ConditionsParser } from "conditionsParser";
    export { ProcessValue } from "conditionProcessValue";
    export { JsonError, JsonIncorrectTypeError, JsonMetadata, JsonMetadataClass, JsonMissingTypeError, JsonMissingTypeErrorBase, JsonObject, JsonObjectProperty, JsonRequiredPropertyError, JsonUnknownPropertyError, Serializer, property, propertyArray } from "jsonobject";
    export { IMatrixDropdownData, MatrixDropdownCell, MatrixDropdownRowModelBase, QuestionMatrixDropdownModelBase } from "question_matrixdropdownbase";
    export { MatrixDropdownColumn, matrixDropdownColumnTypes } from "question_matrixdropdowncolumn";
    export { QuestionMatrixDropdownRenderedCell, QuestionMatrixDropdownRenderedRow, QuestionMatrixDropdownRenderedTable } from "question_matrixdropdownrendered";
    export { MatrixDropdownRowModel, QuestionMatrixDropdownModel } from "question_matrixdropdown";
    export { MatrixDynamicRowModel, QuestionMatrixDynamicModel } from "question_matrixdynamic";
    export { MatrixRowModel, MatrixCells, QuestionMatrixModel, IMatrixData } from "question_matrix";
    export { QuestionMatrixBaseModel } from "martixBase";
    export { MultipleTextItemModel, QuestionMultipleTextModel } from "question_multipletext";
    export { PanelModel, PanelModelBase, QuestionRowModel } from "panel";
    export { FlowPanelModel } from "flowpanel";
    export { PageModel } from "page";
    export * from "template-renderer";
    export { DefaultTitleModel } from "defaultTitle";
    export { Question } from "question";
    export { QuestionNonValue } from "questionnonvalue";
    export { QuestionEmptyModel } from "question_empty";
    export { QuestionCheckboxBase, QuestionSelectBase } from "question_baseselect";
    export { QuestionCheckboxModel } from "question_checkbox";
    export { QuestionTagboxModel } from "question_tagbox";
    export { QuestionRankingModel } from "question_ranking";
    export { QuestionCommentModel } from "question_comment";
    export { QuestionDropdownModel } from "question_dropdown";
    export { QuestionFactory, ElementFactory } from "questionfactory";
    export { QuestionFileModel } from "question_file";
    export { QuestionHtmlModel } from "question_html";
    export { QuestionRadiogroupModel } from "question_radiogroup";
    export { QuestionRatingModel, RenderedRatingItem } from "question_rating";
    export { QuestionExpressionModel } from "question_expression";
    export { QuestionTextBase } from "question_textbase";
    export { QuestionTextModel } from "question_text";
    export { QuestionBooleanModel } from "question_boolean";
    export { QuestionImagePickerModel, ImageItemValue } from "question_imagepicker";
    export { QuestionImageModel } from "question_image";
    export { QuestionSignaturePadModel } from "question_signaturepad";
    export { QuestionPanelDynamicModel, QuestionPanelDynamicItem } from "question_paneldynamic";
    export { SurveyTimer } from "surveytimer";
    export { SurveyTimerModel } from "surveyTimerModel";
    export { SurveyProgressModel } from "surveyProgress";
    export { SurveyProgressButtonsModel } from "surveyProgressButtons";
    export { SurveyModel } from "survey";
    export { SurveyTrigger, SurveyTriggerComplete, SurveyTriggerSetValue, SurveyTriggerVisible, SurveyTriggerCopyValue, SurveyTriggerRunExpression, Trigger } from "trigger";
    export { PopupSurveyModel, SurveyWindowModel } from "popup-survey";
    export { TextPreProcessor } from "textPreProcessor";
    export { Notifier } from "notifier";
    export { dxSurveyService } from "dxSurveyService";
    export { englishStrings } from "localization/english";
    export { surveyLocalization, surveyStrings } from "surveyStrings";
    export { QuestionCustomWidget, CustomWidgetCollection, } from "questionCustomWidgets";
    export { QuestionCustomModel, QuestionCompositeModel, ComponentQuestionJSON, ComponentCollection, ICustomQuestionTypeConfiguration } from "question_custom";
    export { StylesManager } from "stylesmanager";
    export { ListModel } from "list";
    export { MultiSelectListModel } from "multiSelectListModel";
    export { PopupModel, createDialogOptions, IDialogOptions } from "popup";
    export { PopupBaseViewModel } from "popup-view-model";
    export { PopupDropdownViewModel } from "popup-dropdown-view-model";
    export { PopupModalViewModel } from "popup-modal-view-model";
    export { createPopupViewModel, createPopupModalViewModel } from "popup-utils";
    export { DropdownListModel } from "dropdownListModel";
    export { DropdownMultiSelectListModel } from "dropdownMultiSelectListModel";
    export { QuestionButtonGroupModel, ButtonGroupItemModel, ButtonGroupItemValue } from "question_buttongroup";
    export { IsMobile, IsTouch, _setIsTouch } from "utils/devices";
    export { confirmAction, detectIEOrEdge, doKey2ClickUp, doKey2ClickDown, doKey2ClickBlur, loadFileFromBase64, increaseHeightByContent, createSvg, sanitizeEditableContent, IAttachKey2clickOptions } from "utils/utils";
    export * from "utils/cssClassBuilder";
    export { surveyCss, defaultV2Css, defaultV2ThemeName } from "defaultCss/defaultV2Css";
    export { DragDropSurveyElements } from "dragdrop/survey-elements";
    export { DragDropChoices } from "dragdrop/choices";
}
declare module "defaultCss/cssstandard" {
    export var defaultStandardCss: {
        root: string;
        container: string;
        header: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        progress: string;
        progressBar: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            header: string;
            headerLeft: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            requiredText: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            number: string;
            description: string;
            comment: string;
            required: string;
            titleRequired: string;
            hasError: string;
            indent: number;
            footer: string;
            formGroup: string;
            asCell: string;
            icon: string;
            iconExpanded: string;
            disabled: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            icon: string;
            iconExpanded: string;
            description: string;
            container: string;
            footer: string;
            number: string;
            requiredText: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            item: string;
            control: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            rootCheckbox: string;
            checkboxItem: string;
            checkboxItemChecked: string;
            controlCheckbox: string;
            checkboxControlLabel: string;
            checkboxItemIndeterminate: string;
            checkboxItemDisabled: string;
            checkboxMaterialDecorator: string;
            checkboxItemDecorator: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemSelectAll: string;
            itemNone: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            itemDecorator: string;
            controlLabel: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        comment: string;
        dropdown: {
            root: string;
            popup: string;
            control: string;
            controlInputFieldComponent: string;
            selectWrapper: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            controlValue: string;
            filterStringInput: string;
        };
        html: {
            root: string;
        };
        image: {
            root: string;
            image: string;
        };
        matrix: {
            root: string;
            label: string;
            itemChecked: string;
            itemDecorator: string;
            cell: string;
            cellText: string;
            cellTextSelected: string;
            cellLabel: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            root: string;
            cell: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            choiceCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            root: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            cell: string;
            headerCell: string;
            row: string;
            detailRow: string;
            detailCell: string;
            choiceCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        paneldynamic: {
            root: string;
            title: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonPrev: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            buttonNext: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            footer: string;
            progressBtnIcon: string;
        };
        multipletext: {
            root: string;
            itemTitle: string;
            item: string;
            row: string;
            itemLabel: string;
            itemValue: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            itemDecorator: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            controlLabel: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemHover: string;
            itemSelected: string;
            itemDisabled: string;
            itemControl: string;
        };
        imagepicker: {
            root: string;
            item: string;
            itemChecked: string;
            label: string;
            itemControl: string;
            image: string;
            itemInline: string;
            itemText: string;
            clearButton: string;
            column: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
        };
        text: string;
        expression: string;
        file: {
            root: string;
            placeholderInput: string;
            preview: string;
            removeButton: string;
            fileInput: string;
            removeFile: string;
            fileDecorator: string;
            fileSign: string;
            chooseFile: string;
            noFileChosen: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
        variables: {
            themeMark: string;
        };
        tagbox: {
            root: string;
            popup: string;
            small: string;
            selectWrapper: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            cleanItemButton: string;
            cleanItemButtonSvg: string;
            cleanItemButtonIconId: string;
            control: string;
            controlValue: string;
            controlEmpty: string;
            placeholderInput: string;
            filterStringInput: string;
        };
    };
}
declare module "defaultCss/cssmodern" {
    export var modernCss: {
        root: string;
        timerRoot: string;
        container: string;
        header: string;
        headerClose: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            description: string;
            container: string;
            content: string;
            icon: string;
            iconExpanded: string;
            footer: string;
            requiredText: string;
            number: string;
        };
        paneldynamic: {
            root: string;
            navigation: string;
            title: string;
            button: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonAdd: string;
            progressTop: string;
            progressBottom: string;
            buttonPrev: string;
            buttonNext: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            separator: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            progressBtnIcon: string;
            footer: string;
        };
        progress: string;
        progressBar: string;
        progressText: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            asCell: string;
            header: string;
            headerLeft: string;
            headerTop: string;
            headerBottom: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            answered: string;
            titleOnAnswer: string;
            titleOnError: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            icon: string;
            iconExpanded: string;
            requiredText: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            comment: string;
            required: string;
            titleRequired: string;
            indent: number;
            footer: string;
            formGroup: string;
            hasError: string;
            disabled: string;
        };
        image: {
            root: string;
            image: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemSelectAll: string;
            itemNone: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            itemDecorator: string;
            itemSvgIconId: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemDisabled: string;
            itemChecked: string;
            itemHover: string;
            itemControl: string;
            itemDecorator: string;
            itemSvgIconId: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemSelected: string;
            itemHover: string;
            itemDisabled: string;
            itemControl: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            small: string;
            item: string;
            control: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            rootCheckbox: string;
            checkboxItem: string;
            checkboxItemChecked: string;
            controlCheckbox: string;
            checkboxControlLabel: string;
            checkboxItemIndeterminate: string;
            checkboxItemDisabled: string;
            checkboxMaterialDecorator: string;
            checkboxItemDecorator: string;
            indeterminatePath: string;
            svgIconCheckedId: string;
            svgIconUncheckedId: string;
            svgIconIndId: string;
        };
        text: {
            root: string;
            small: string;
            onError: string;
        };
        multipletext: {
            root: string;
            item: string;
            itemLabel: string;
            itemTitle: string;
            row: string;
            cell: string;
        };
        dropdown: {
            root: string;
            popup: string;
            small: string;
            control: string;
            selectWrapper: string;
            other: string;
            onError: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
            controlValue: string;
            controlInputFieldComponent: string;
        };
        tagbox: {
            root: string;
            popup: string;
            small: string;
            selectWrapper: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            cleanItemButton: string;
            cleanItemButtonSvg: string;
            cleanItemButtonIconId: string;
            control: string;
            controlValue: string;
            controlEmpty: string;
            placeholderInput: string;
            filterStringInput: string;
        };
        imagepicker: {
            root: string;
            column: string;
            item: string;
            itemInline: string;
            itemChecked: string;
            itemDisabled: string;
            itemHover: string;
            label: string;
            itemControl: string;
            image: string;
            itemText: string;
            clearButton: string;
            other: string;
        };
        matrix: {
            tableWrapper: string;
            root: string;
            rowError: string;
            cell: string;
            headerCell: string;
            label: string;
            itemValue: string;
            itemChecked: string;
            itemDisabled: string;
            itemHover: string;
            materialDecorator: string;
            itemDecorator: string;
            cellText: string;
            cellTextSelected: string;
            cellTextDisabled: string;
            cellResponsiveTitle: string;
            itemSvgIconId: string;
        };
        matrixdropdown: {
            root: string;
            cell: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            choiceCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            root: string;
            cell: string;
            headerCell: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            row: string;
            detailRow: string;
            detailCell: string;
            choiceCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            itemDisabled: string;
            filterStringInput: string;
            control: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            controlValue: string;
            controlInputFieldComponent: string;
        };
        comment: {
            root: string;
            small: string;
        };
        expression: string;
        file: {
            root: string;
            other: string;
            placeholderInput: string;
            preview: string;
            fileSignBottom: string;
            fileDecorator: string;
            fileInput: string;
            noFileChosen: string;
            chooseFile: string;
            controlDisabled: string;
            removeButton: string;
            removeButtonBottom: string;
            removeFile: string;
            removeFileSvg: string;
            removeFileSvgIconId: string;
            wrapper: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            small: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
        variables: {
            themeMark: string;
        };
    };
}
declare module "svgbundle" {
    class SvgIconData {
        [key: string]: string;
    }
    export class SvgIconRegistry {
        icons: SvgIconData;
        private iconPrefix;
        registerIconFromSymbol(iconId: string, iconSymbolSvg: string): void;
        registerIconFromSvgViaElement(iconId: string, iconSvg: string, iconPrefix?: string): void;
        registerIconFromSvg(iconId: string, iconSvg: string, iconPrefix?: string): boolean;
        registerIconsFromFolder(r: any): void;
        iconsRenderedHtml(): string;
        renderIcons(): void;
    }
    export var SvgRegistry: SvgIconRegistry;
    export var SvgBundleViewModel: any;
}
declare module "utils/tooltip" {
    export class TooltipManager {
        tooltipElement: HTMLElement;
        private targetElement;
        constructor(tooltipElement: HTMLElement);
        dispose(): void;
        private onMouseMoveCallback;
    }
}
declare module "entries/core-wo-model" {
    export * from "entries/chunks/model";
    export { defaultStandardCss } from "defaultCss/cssstandard";
    export { modernCss } from "defaultCss/cssmodern";
    export * from "svgbundle";
    export * from "rendererFactory";
    export * from "utils/responsivity-manager";
    export { unwrap, getOriginalEvent } from "utils/utils";
    export * from "actions/action";
    export * from "actions/adaptive-container";
    export * from "actions/container";
    export * from "utils/tooltip";
    export * from "utils/dragOrClickHelper";
}
declare module "entries/core" {
    export * from "entries/core-wo-model";
    export { SurveyModel as Model } from "survey";
}
declare module "plugins/themes/bootstrap/cssbootstrap" {
    export var defaultCss: {
        root: string;
        container: string;
        header: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        progress: string;
        progressBar: string;
        progressTextUnderBar: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            header: string;
            headerLeft: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            requiredText: string;
            comment: string;
            required: string;
            titleRequired: string;
            hasError: string;
            indent: number;
            formGroup: string;
            disabled: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            icon: string;
            iconExpanded: string;
            description: string;
            container: string;
            footer: string;
            number: string;
            requiredText: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            item: string;
            control: string;
            controlCheckbox: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            materialDecorator: string;
            itemDecorator: string;
            checkedPath: string;
            uncheckedPath: string;
            indeterminatePath: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemChecked: string;
            itemSelectAll: string;
            itemNone: string;
            itemInline: string;
            itemControl: string;
            itemDecorator: string;
            label: string;
            labelChecked: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        comment: string;
        dropdown: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        tagbox: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        html: {
            root: string;
        };
        image: {
            root: string;
            image: string;
        };
        matrix: {
            root: string;
            label: string;
            itemChecked: string;
            itemDecorator: string;
            cellText: string;
            cellTextSelected: string;
            cellLabel: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            root: string;
            cell: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            root: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            headerCell: string;
            row: string;
            detailRow: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        paneldynamic: {
            root: string;
            navigation: string;
            progressTop: string;
            progressBottom: string;
            title: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonPrev: string;
            buttonNext: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            footer: string;
            progressBtnIcon: string;
        };
        multipletext: {
            root: string;
            itemTitle: string;
            item: string;
            itemLabel: string;
            row: string;
            itemValue: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            itemDecorator: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemHover: string;
            itemSelected: string;
            itemDisabled: string;
            itemControl: string;
        };
        imagepicker: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            itemControl: string;
            image: string;
            itemText: string;
            clearButton: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            disabled: string;
        };
        text: string;
        expression: string;
        file: {
            root: string;
            placeholderInput: string;
            preview: string;
            removeButton: string;
            fileInput: string;
            removeFile: string;
            fileDecorator: string;
            fileSign: string;
            removeButtonBottom: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
    };
}
declare module "plugins/themes/bootstrapmaterial/cssbootstrapmaterial" {
    export var defaultCss: {
        root: string;
        container: string;
        header: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        progress: string;
        progressBar: string;
        progressTextUnderBar: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            header: string;
            headerLeft: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            requiredText: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            comment: string;
            required: string;
            titleRequired: string;
            hasError: string;
            indent: number;
            formGroup: string;
            disabled: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            icon: string;
            iconExpanded: string;
            description: string;
            container: string;
            footer: string;
            number: string;
            requiredText: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            item: string;
            control: string;
            controlCheckbox: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            materialDecorator: string;
            itemDecorator: string;
            checkedPath: string;
            uncheckedPath: string;
            indeterminatePath: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemChecked: string;
            itemSelectAll: string;
            itemNone: string;
            itemInline: string;
            itemDecorator: string;
            itemControl: string;
            label: string;
            labelChecked: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        comment: string;
        dropdown: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        tagbox: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        html: {
            root: string;
        };
        image: {
            root: string;
            image: string;
        };
        matrix: {
            root: string;
            row: string;
            label: string;
            cellText: string;
            cellTextSelected: string;
            cellLabel: string;
            itemValue: string;
            itemChecked: string;
            itemDecorator: string;
            materialDecorator: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            root: string;
            itemValue: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            mainRoot: string;
            flowRoot: string;
            root: string;
            button: string;
            itemValue: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            headerCell: string;
            row: string;
            detailRow: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        paneldynamic: {
            root: string;
            navigation: string;
            progressTop: string;
            progressBottom: string;
            title: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonPrev: string;
            buttonNext: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            progressBtnIcon: string;
            footer: string;
        };
        multipletext: {
            root: string;
            itemTitle: string;
            item: string;
            itemLabel: string;
            row: string;
            itemValue: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            itemDecorator: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemSelected: string;
            itemHover: string;
            itemDisabled: string;
            itemControl: string;
        };
        imagepicker: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            itemControl: string;
            image: string;
            itemText: string;
            clearButton: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            disabled: string;
        };
        text: string;
        expression: string;
        file: {
            root: string;
            placeholderInput: string;
            preview: string;
            removeButton: string;
            fileInput: string;
            fileSign: string;
            removeFile: string;
            fileDecorator: string;
            removeButtonBottom: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
    };
}
declare module "plugins/themes/common-theme-settings" {
    export function setMediaStyles(): void;
    export function setStyles(): void;
}
declare module "plugins/themes/bootstrap/theme-settings" {
    export const bootstrapThemeName = "bootstrap";
    export const bootstrapThemeColors: {
        [key: string]: string;
    };
    export const bootstrapThemeCssRules: {
        ".sv_main .sv_q_imgsel.checked label>div": string;
        ".sv_main .sv_p_description": string;
        ".sv_main .sv_qstn_error_bottom": string;
        ".sv_main .progress": string;
        ".sv_main .progress-bar": string;
        ".sv_main .table>tbody>tr>td": string;
        ".sv_main f-panel .sv_qstn": string;
        ".sv_main .sv_q_image": string;
        ".sv_main .sv_row .sv_qstn:first-child:last-child": string;
        ".sv_main .sv_row .sv_p_container:first-child:last-child": string;
        ".sv_main .sv-progress": string;
        ".sv_main .sv-progress__bar": string;
        ".sv_main .sv_progress-buttons__list li:before": string;
        ".sv_main .sv_progress-buttons__list li:after": string;
        ".sv_main .sv_progress-buttons__list .sv_progress-buttons__page-title": string;
        ".sv_main .sv_progress-buttons__list .sv_progress-buttons__page-description": string;
        ".sv_main .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed:before": string;
        ".sv_main .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed + li:after": string;
        ".sv_main .sv_progress-buttons__list li.sv_progress-buttons__list-element--current:before": string;
        ".sv_main .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed.sv_progress-buttons__list-element--current:before": string;
        ".sv_main .sv-paneldynamic__prev-btn.sv-paneldynamic__prev-btn--disabled, .sv_main .sv-paneldynamic__next-btn.sv-paneldynamic__next-btn--disabled": string;
        ".sv_main .sv-paneldynamic__progress-text": string;
        ".sv_main .sv-paneldynamic__prev-btn, .sv_main .sv-paneldynamic__next-btn": string;
        ".sv_main .sv-boolean__switch": string;
        ".sv_main .sv-boolean__slider": string;
        ".sv_main .sv-boolean__label--disabled": string;
        ".sv_main .sv-boolean--disabled .sv-boolean__switch": string;
        ".sv_main .sv-boolean--disabled  .sv-boolean__slider": string;
        ".sv_main .sjs_sp_container": string;
        ".sv_main .sjs_sp_placeholder": string;
        ".sv_main .sv_matrix_detail_row": string;
        ".sv_main .sv-action-bar-item": string;
        ".sv_main .sv-action-bar-item__icon use": string;
        ".sv_main .sv-action-bar-item:hover": string;
        ".sv-skeleton-element": string;
    };
}
declare module "plugins/themes/bootstrapmaterial/theme-settings" {
    export const bootstrapMaterialThemeName = "bootstrapmaterial";
    export const bootstrapMaterialThemeColors: {
        [key: string]: string;
    };
    export const bootstrapMaterialThemeCssRules: {
        ".sv_main.sv_bootstrapmaterial_css .form-group.is-focused .form-control": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_qstn": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_qstn label.sv_q_m_label": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_q_image": string;
        ".sv_main .sv_row .sv_qstn:first-child:last-child": string;
        ".sv_main .sv_row .sv_p_container:first-child:last-child": string;
        ".sv_main.sv_bootstrapmaterial_css .checkbox input[type=checkbox]:checked + .checkbox-material .check": string;
        ".sv_main.sv_bootstrapmaterial_css label.checkbox-inline input[type=checkbox]:checked + .checkbox-material .check": string;
        ".sv_main.sv_bootstrapmaterial_css .checkbox input[type=checkbox]:checked + .checkbox-material .check:before": string;
        ".sv_main.sv_bootstrapmaterial_css label.checkbox-inline input[type=checkbox]:checked + .checkbox-material .check:before": string;
        ".sv_main.sv_bootstrapmaterial_css .radio input[type=radio]:checked ~ .circle": string;
        ".sv_main.sv_bootstrapmaterial_css label.radio-inline input[type=radio]:checked ~ .circle": string;
        ".sv_main.sv_bootstrapmaterial_css .radio input[type=radio]:checked ~ .check": string;
        ".sv_main.sv_bootstrapmaterial_css label.radio-inline input[type=radio]:checked ~ .check": string;
        ".sv_main.sv_bootstrapmaterial_css .btn-default.active": string;
        ".sv_main.sv_bootstrapmaterial_css .btn-default:active": string;
        ".sv_main.sv_bootstrapmaterial_css .btn-secondary.active": string;
        ".sv_main.sv_bootstrapmaterial_css .btn-secondary:active": string;
        ".sv_main.sv_bootstrapmaterial_css .open>.dropdown-toggle.btn-default": string;
        ".sv_main.sv_bootstrapmaterial_css input[type='button'].btn-primary, .sv_main.sv_bootstrapmaterial_css button.btn-primary": string;
        ".sv_main.sv_bootstrapmaterial_css input[type='button'].btn-primary:hover, .sv_main.sv_bootstrapmaterial_css button.btn-primary:hover": string;
        ".sv_main .sv_q_imgsel.checked label>div": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_q_file_remove:hover": string;
        ".sv_main.sv_bootstrapmaterial_css .form-group input[type=file]": string;
        ".sv_main.sv_bootstrapmaterial_css .progress": string;
        ".sv_main.sv_bootstrapmaterial_css .progress-bar": string;
        ".sv_main .sv-progress": string;
        ".sv_main .sv-progress__bar": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li:before": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li:after": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list .sv_progress-buttons__page-title": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list .sv_progress-buttons__page-description": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed:before": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed + li:after": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li.sv_progress-buttons__list-element--current:before": string;
        ".sv_main.sv_bootstrapmaterial_css .sv_progress-buttons__list li.sv_progress-buttons__list-element--passed.sv_progress-buttons__list-element--current:before": string;
        ".sv_main .sv-paneldynamic__prev-btn.sv-paneldynamic__prev-btn--disabled, .sv_main .sv-paneldynamic__next-btn.sv-paneldynamic__next-btn--disabled": string;
        ".sv_main .sv-paneldynamic__progress-text": string;
        ".sv_main .sv-paneldynamic__prev-btn, .sv_main .sv-paneldynamic__next-btn": string;
        ".sv_main .sv-boolean .checkbox-decorator": string;
        ".sv_main .sv-boolean__switch": string;
        ".sv_main .sv-boolean__slider": string;
        ".sv_main .sv-boolean__label.sv-boolean__label--disabled": string;
        ".sv_main .sv-boolean__label": string;
        ".sv_main .sv-boolean--disabled .sv-boolean__switch": string;
        ".sv_main .sv-boolean--disabled  .sv-boolean__slider": string;
        ".sv_main .sv_matrix_detail_row": string;
        ".sv_main .sjs_sp_container": string;
        ".sv_main .sjs_sp_placeholder": string;
        ".sv_main .sv-action-bar-item": string;
        ".sv_main .sv-action-bar-item__icon use": string;
        ".sv_main .sv-action-bar-item:hover": string;
        ".sv-skeleton-element": string;
    };
}
declare module "entries/plugins" {
    export * from "plugins/themes/bootstrap/theme-settings";
    export * from "plugins/themes/bootstrapmaterial/theme-settings";
    export var defaultBootstrapCss: {
        root: string;
        container: string;
        header: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        progress: string;
        progressBar: string;
        progressTextUnderBar: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            header: string;
            headerLeft: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            requiredText: string;
            comment: string;
            required: string;
            titleRequired: string;
            hasError: string;
            indent: number;
            formGroup: string;
            disabled: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            icon: string;
            iconExpanded: string;
            description: string;
            container: string;
            footer: string;
            number: string;
            requiredText: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            item: string;
            control: string;
            controlCheckbox: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            materialDecorator: string;
            itemDecorator: string;
            checkedPath: string;
            uncheckedPath: string;
            indeterminatePath: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemChecked: string;
            itemSelectAll: string;
            itemNone: string;
            itemInline: string;
            itemControl: string;
            itemDecorator: string;
            label: string;
            labelChecked: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        comment: string;
        dropdown: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        tagbox: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        html: {
            root: string;
        };
        image: {
            root: string;
            image: string;
        };
        matrix: {
            root: string;
            label: string;
            itemChecked: string;
            itemDecorator: string;
            cellText: string;
            cellTextSelected: string;
            cellLabel: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            root: string;
            cell: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            root: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            headerCell: string;
            row: string;
            detailRow: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        paneldynamic: {
            root: string;
            navigation: string;
            progressTop: string;
            progressBottom: string;
            title: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonPrev: string;
            buttonNext: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            footer: string;
            progressBtnIcon: string;
        };
        multipletext: {
            root: string;
            itemTitle: string;
            item: string;
            itemLabel: string;
            row: string;
            itemValue: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            itemDecorator: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemHover: string;
            itemSelected: string;
            itemDisabled: string;
            itemControl: string;
        };
        imagepicker: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            itemControl: string;
            image: string;
            itemText: string;
            clearButton: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            disabled: string;
        };
        text: string;
        expression: string;
        file: {
            root: string;
            placeholderInput: string;
            preview: string;
            removeButton: string;
            fileInput: string;
            removeFile: string;
            fileDecorator: string;
            fileSign: string;
            removeButtonBottom: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
    };
    export var defaultBootstrapMaterialCss: {
        root: string;
        container: string;
        header: string;
        body: string;
        bodyEmpty: string;
        footer: string;
        title: string;
        description: string;
        logo: string;
        logoImage: string;
        headerText: string;
        navigationButton: string;
        completedPage: string;
        navigation: {
            complete: string;
            prev: string;
            next: string;
            start: string;
            preview: string;
            edit: string;
        };
        progress: string;
        progressBar: string;
        progressTextUnderBar: string;
        progressTextInBar: string;
        progressButtonsContainerCenter: string;
        progressButtonsContainer: string;
        progressButtonsImageButtonLeft: string;
        progressButtonsImageButtonRight: string;
        progressButtonsImageButtonHidden: string;
        progressButtonsListContainer: string;
        progressButtonsList: string;
        progressButtonsListElementPassed: string;
        progressButtonsListElementCurrent: string;
        progressButtonsListElementNonClickable: string;
        progressButtonsPageTitle: string;
        progressButtonsPageDescription: string;
        page: {
            root: string;
            title: string;
            description: string;
        };
        pageTitle: string;
        pageDescription: string;
        row: string;
        question: {
            mainRoot: string;
            flowRoot: string;
            header: string;
            headerLeft: string;
            content: string;
            contentLeft: string;
            titleLeftRoot: string;
            requiredText: string;
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            number: string;
            description: string;
            descriptionUnderInput: string;
            comment: string;
            required: string;
            titleRequired: string;
            hasError: string;
            indent: number;
            formGroup: string;
            disabled: string;
        };
        panel: {
            title: string;
            titleExpandable: string;
            titleExpanded: string;
            titleCollapsed: string;
            titleOnError: string;
            icon: string;
            iconExpanded: string;
            description: string;
            container: string;
            footer: string;
            number: string;
            requiredText: string;
        };
        error: {
            root: string;
            icon: string;
            item: string;
            locationTop: string;
            locationBottom: string;
        };
        boolean: {
            root: string;
            rootRadio: string;
            item: string;
            control: string;
            controlCheckbox: string;
            itemChecked: string;
            itemIndeterminate: string;
            itemDisabled: string;
            switch: string;
            slider: string;
            label: string;
            disabledLabel: string;
            materialDecorator: string;
            itemDecorator: string;
            checkedPath: string;
            uncheckedPath: string;
            indeterminatePath: string;
        };
        checkbox: {
            root: string;
            item: string;
            itemChecked: string;
            itemSelectAll: string;
            itemNone: string;
            itemInline: string;
            itemDecorator: string;
            itemControl: string;
            label: string;
            labelChecked: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            column: string;
        };
        ranking: {
            root: string;
            rootMobileMod: string;
            rootDragMod: string;
            rootDisabled: string;
            rootDragHandleAreaIcon: string;
            item: string;
            itemContent: string;
            itemIndex: string;
            controlLabel: string;
            itemGhostNode: string;
            itemIconContainer: string;
            itemIcon: string;
            itemIconHoverMod: string;
            itemIconFocusMod: string;
            itemGhostMod: string;
            itemDragMod: string;
        };
        comment: string;
        dropdown: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        tagbox: {
            root: string;
            popup: string;
            selectWrapper: string;
            control: string;
            controlValue: string;
            other: string;
            cleanButton: string;
            cleanButtonSvg: string;
            cleanButtonIconId: string;
            filterStringInput: string;
        };
        html: {
            root: string;
        };
        image: {
            root: string;
            image: string;
        };
        matrix: {
            root: string;
            row: string;
            label: string;
            cellText: string;
            cellTextSelected: string;
            cellLabel: string;
            itemValue: string;
            itemChecked: string;
            itemDecorator: string;
            materialDecorator: string;
            cellResponsiveTitle: string;
        };
        matrixdropdown: {
            root: string;
            itemValue: string;
            headerCell: string;
            row: string;
            rowAdditional: string;
            detailRow: string;
            detailRowText: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
        };
        matrixdynamic: {
            mainRoot: string;
            flowRoot: string;
            root: string;
            button: string;
            itemValue: string;
            buttonAdd: string;
            buttonRemove: string;
            iconAdd: string;
            iconRemove: string;
            iconDrag: string;
            headerCell: string;
            row: string;
            detailRow: string;
            detailCell: string;
            detailButton: string;
            detailButtonExpanded: string;
            detailIcon: string;
            detailIconExpanded: string;
            detailPanelCell: string;
            actionsCell: string;
            emptyRowsSection: string;
            emptyRowsText: string;
            emptyRowsButton: string;
            ghostRow: string;
        };
        paneldynamic: {
            root: string;
            navigation: string;
            progressTop: string;
            progressBottom: string;
            title: string;
            button: string;
            buttonAdd: string;
            buttonRemove: string;
            buttonRemoveRight: string;
            buttonPrev: string;
            buttonNext: string;
            buttonPrevDisabled: string;
            buttonNextDisabled: string;
            progressContainer: string;
            progress: string;
            progressBar: string;
            progressText: string;
            panelWrapper: string;
            panelWrapperInRow: string;
            progressBtnIcon: string;
            footer: string;
        };
        multipletext: {
            root: string;
            itemTitle: string;
            item: string;
            itemLabel: string;
            row: string;
            itemValue: string;
        };
        radiogroup: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            itemDecorator: string;
            label: string;
            labelChecked: string;
            itemControl: string;
            controlLabel: string;
            materialDecorator: string;
            other: string;
            clearButton: string;
            column: string;
        };
        buttongroup: {
            root: string;
            item: string;
            itemIcon: string;
            itemDecorator: string;
            itemCaption: string;
            itemSelected: string;
            itemHover: string;
            itemDisabled: string;
            itemControl: string;
        };
        imagepicker: {
            root: string;
            item: string;
            itemChecked: string;
            itemInline: string;
            label: string;
            itemControl: string;
            image: string;
            itemText: string;
            clearButton: string;
        };
        rating: {
            root: string;
            item: string;
            selected: string;
            minText: string;
            itemText: string;
            maxText: string;
            disabled: string;
        };
        text: string;
        expression: string;
        file: {
            root: string;
            placeholderInput: string;
            preview: string;
            removeButton: string;
            fileInput: string;
            fileSign: string;
            removeFile: string;
            fileDecorator: string;
            removeButtonBottom: string;
            dragAreaPlaceholder: string;
            fileList: string;
        };
        signaturepad: {
            root: string;
            controls: string;
            placeholder: string;
            clearButton: string;
        };
        saveData: {
            root: string;
            info: string;
            error: string;
            success: string;
            button: string;
        };
        window: {
            root: string;
            body: string;
            header: {
                root: string;
                title: string;
                button: string;
                buttonExpanded: string;
                buttonCollapsed: string;
            };
        };
    };
}
declare module "localization/arabic" {
    export var arabicSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/basque" {
    export var basqueSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
    };
}
declare module "localization/bulgarian" {
    export var bulgarianStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/catalan" {
    export var catalanSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        otherItemText: string;
        progressText: string;
        emptySurvey: string;
        completingSurvey: string;
        loadingSurvey: string;
        placeholder: string;
        requiredError: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        addRow: string;
        removeRow: string;
        matrix_column: string;
        matrix_row: string;
    };
}
declare module "localization/croatian" {
    export var croatianStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
    };
}
declare module "localization/czech" {
    export var czechSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/danish" {
    export var danishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/dutch" {
    export var dutchSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/nl-BE" { }
declare module "localization/estonian" {
    export var estonianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/finnish" {
    export var finnishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/french" {
    export var frenchSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/georgian" {
    export var georgianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        otherItemText: string;
        progressText: string;
        emptySurvey: string;
        completingSurvey: string;
        loadingSurvey: string;
        placeholder: string;
        requiredError: string;
        numericError: string;
        textMinLength: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
    };
}
declare module "localization/german" {
    export var germanSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/greek" {
    export var greekSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/hebrew" {
    export var hebrewSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/hindi" {
    export var hindiStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/hungarian" {
    export var hungarianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/icelandic" {
    export var icelandicSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/indonesian" {
    export var indonesianStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/italian" {
    export var italianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/japanese" {
    export var japaneseSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/kazakh" {
    export var kazakhStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/korean" {
    export var koreanStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
        more: string;
    };
}
declare module "localization/latvian" {
    export var latvianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/lithuanian" {
    export var lithuaniaSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/macedonian" {
    export var macedonianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
    };
}
declare module "localization/malay" {
    export var malaySurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/norwegian" {
    export var norwegianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/persian" {
    export var persianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/polish" {
    export var polishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/portuguese" {
    export var portugueseSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/portuguese-br" {
    /**
     * You don't need to translate strings that have the same value as Portuguese translation
     */
    export var portugueseBrSurveyStrings: {
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        maxSelectError: string;
        invalidEmail: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
    };
}
declare module "localization/romanian" {
    export var romanianSurveyStrings: any;
}
declare module "localization/russian" {
    export var russianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/serbian" {
    export var serbianStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
    };
}
declare module "localization/simplified-chinese" {
    export var simplifiedChineseSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
    };
}
declare module "localization/slovak" {
    export var slovakSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/spanish" {
    export var spanishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        fileDragAreaPlaceholder: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        emptyRowsText: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        noEntriesText: string;
    };
}
declare module "localization/swahili" {
    export var swahiliStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/swedish" {
    export var swedishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        indexText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        ratingOptionsCaption: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        minError: string;
        maxError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        multipletext_itemname: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        signaturePlaceHolder: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
        modalCancelButtonText: string;
        modalApplyButtonText: string;
        filterStringPlaceholder: string;
        emptyMessage: string;
        noEntriesText: string;
        more: string;
    };
}
declare module "localization/tajik" {
    export var tajikSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        removeFileCaption: string;
    };
}
declare module "localization/thai" {
    export var thaiStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/traditional-chinese" {
    export var traditionalChineseSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        otherItemText: string;
        progressText: string;
        emptySurvey: string;
        completingSurvey: string;
        loadingSurvey: string;
        placeholder: string;
        requiredError: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        addRow: string;
        removeRow: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
    };
}
declare module "localization/turkish" {
    export var turkishSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/ukrainian" {
    export var ukrainianSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/vietnamese" {
    export var vietnameseSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/welsh" {
    export var welshSurveyStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        noneItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "localization/telugu" {
    export var teluguStrings: {
        pagePrevText: string;
        pageNextText: string;
        completeText: string;
        previewText: string;
        editText: string;
        startSurveyText: string;
        otherItemText: string;
        selectAllItemText: string;
        progressText: string;
        panelDynamicProgressText: string;
        questionsProgressText: string;
        emptySurvey: string;
        completingSurvey: string;
        completingSurveyBefore: string;
        loadingSurvey: string;
        placeholder: string;
        value: string;
        requiredError: string;
        requiredErrorInPanel: string;
        requiredInAllRowsError: string;
        numericError: string;
        textMinLength: string;
        textMaxLength: string;
        textMinMaxLength: string;
        minRowCountError: string;
        minSelectError: string;
        maxSelectError: string;
        numericMinMax: string;
        numericMin: string;
        numericMax: string;
        invalidEmail: string;
        invalidExpression: string;
        urlRequestError: string;
        urlGetChoicesError: string;
        exceedMaxSize: string;
        otherRequiredError: string;
        uploadingFile: string;
        loadingFile: string;
        chooseFile: string;
        noFileChosen: string;
        confirmDelete: string;
        keyDuplicationError: string;
        addColumn: string;
        addRow: string;
        removeRow: string;
        addPanel: string;
        removePanel: string;
        choices_Item: string;
        matrix_column: string;
        matrix_row: string;
        savingData: string;
        savingDataError: string;
        savingDataSuccess: string;
        saveAgainButton: string;
        timerMin: string;
        timerSec: string;
        timerSpentAll: string;
        timerSpentPage: string;
        timerSpentSurvey: string;
        timerLimitAll: string;
        timerLimitPage: string;
        timerLimitSurvey: string;
        clearCaption: string;
        chooseFileCaption: string;
        removeFileCaption: string;
        booleanCheckedLabel: string;
        booleanUncheckedLabel: string;
        confirmRemoveFile: string;
        confirmRemoveAllFiles: string;
        questionTitlePatternText: string;
    };
}
declare module "entries/chunks/localization" {
    import "localization/arabic";
    import "localization/basque";
    import "localization/bulgarian";
    import "localization/catalan";
    import "localization/croatian";
    import "localization/czech";
    import "localization/danish";
    import "localization/dutch";
    import "localization/nl-BE";
    import "localization/estonian";
    import "localization/finnish";
    import "localization/french";
    import "localization/georgian";
    import "localization/german";
    import "localization/greek";
    import "localization/hebrew";
    import "localization/hindi";
    import "localization/hungarian";
    import "localization/icelandic";
    import "localization/indonesian";
    import "localization/italian";
    import "localization/japanese";
    import "localization/kazakh";
    import "localization/korean";
    import "localization/latvian";
    import "localization/lithuanian";
    import "localization/macedonian";
    import "localization/malay";
    import "localization/norwegian";
    import "localization/persian";
    import "localization/polish";
    import "localization/portuguese";
    import "localization/portuguese-br";
    import "localization/romanian";
    import "localization/russian";
    import "localization/serbian";
    import "localization/simplified-chinese";
    import "localization/slovak";
    import "localization/spanish";
    import "localization/swahili";
    import "localization/swedish";
    import "localization/tajik";
    import "localization/thai";
    import "localization/traditional-chinese";
    import "localization/turkish";
    import "localization/ukrainian";
    import "localization/vietnamese";
    import "localization/welsh";
    import "localization/telugu";
}
declare module "react/element-factory" {
    export class ReactElementFactory {
        static Instance: ReactElementFactory;
        private creatorHash;
        registerElement(elementType: string, elementCreator: (props: any) => JSX.Element): void;
        getAllTypes(): Array<string>;
        isElementRegistered(elementType: string): boolean;
        createElement(elementType: string, params: any): JSX.Element | any;
    }
}
declare module "react/reactsurveymodel" {
    import { SurveyModel, QuestionMatrixDropdownRenderedCell, SurveyElement, QuestionRowModel, ItemValue, QuestionSelectBase } from "entries/core";
    export class ReactSurveyElementsWrapper {
        static wrapRow(survey: SurveyModel, element: JSX.Element, row: QuestionRowModel): JSX.Element;
        static wrapElement(survey: SurveyModel, element: JSX.Element, question: SurveyElement): JSX.Element;
        static wrapQuestionContent(survey: SurveyModel, element: JSX.Element, question: SurveyElement): JSX.Element;
        static wrapItemValue(survey: SurveyModel, element: JSX.Element, question: QuestionSelectBase, item: ItemValue): JSX.Element;
        static wrapMatrixCell(survey: SurveyModel, element: JSX.Element, cell: QuestionMatrixDropdownRenderedCell, reason?: string): JSX.Element;
    }
}
declare module "react/reactquestion_factory" {
    export class ReactQuestionFactory {
        static Instance: ReactQuestionFactory;
        private creatorHash;
        registerQuestion(questionType: string, questionCreator: (name: string) => JSX.Element): void;
        getAllTypes(): Array<string>;
        createQuestion(questionType: string, params: any): JSX.Element | null;
    }
}
declare module "react/reactquestion_comment" {
    import { ReactSurveyElement, SurveyQuestionUncontrolledElement } from "react/reactquestion_element";
    import { QuestionCommentModel } from "entries/core";
    export class SurveyQuestionComment extends SurveyQuestionUncontrolledElement<QuestionCommentModel> {
        constructor(props: any);
        protected renderElement(): JSX.Element;
    }
    export class SurveyQuestionCommentItem extends ReactSurveyElement {
        protected canRender(): boolean;
        protected onCommentChange(event: any): void;
        protected onCommentInput(event: any): void;
        protected getComment(): string;
        protected getId(): string;
        protected getPlaceholder(): string;
        protected renderElement(): JSX.Element;
    }
    export class SurveyQuestionOtherValueItem extends SurveyQuestionCommentItem {
        protected onCommentChange(event: any): void;
        protected onCommentInput(event: any): void;
        protected getComment(): string;
        protected getId(): string;
        protected getPlaceholder(): string;
    }
}
declare module "react/custom-widget" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    export class SurveyCustomWidget extends SurveyQuestionElementBase {
        private widgetRef;
        constructor(props: any);
        private _afterRender;
        componentDidMount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentWillUnmount(): void;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/svg-icon/svg-icon" {
    import React from "react";
    export class SvgIcon extends React.Component<any, any> {
        private svgIconRef;
        constructor(props: any);
        updateSvg(): void;
        componentDidUpdate(): void;
        render(): JSX.Element;
        componentDidMount(): void;
    }
}
declare module "react/components/action-bar/action-bar-separator" {
    import React from "react";
    export class SurveyActionBarSeparator extends React.Component<any, any> {
        constructor(props: any);
        render(): JSX.Element;
    }
}
declare module "react/components/action-bar/action-bar-item" {
    import { Base, Action } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface IActionBarItemProps {
        item: Action;
    }
    export class SurveyAction extends SurveyElementBase<IActionBarItemProps, any> {
        get item(): Action;
        protected getStateElement(): Base;
        renderElement(): JSX.Element;
    }
    export class SurveyActionBarItem extends SurveyElementBase<IActionBarItemProps, any> {
        get item(): Action;
        protected getStateElement(): Base;
        renderElement(): JSX.Element;
        renderText(): JSX.Element;
        renderButtonContent(): JSX.Element;
        renderInnerButton(): JSX.Element;
    }
}
declare module "react/components/popup/popup" {
    import { Base, PopupModel, PopupBaseViewModel, IDialogOptions } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface IPopupProps {
        model: PopupModel;
    }
    export class Popup extends SurveyElementBase<IPopupProps, any> {
        private popup;
        private containerRef;
        constructor(props: IPopupProps);
        get model(): PopupModel;
        protected getStateElement(): Base;
        private createModel;
        private setTargetElement;
        componentDidMount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentWillUnmount(): void;
        shouldComponentUpdate(nextProps: IPopupProps, nextState: any): boolean;
        render(): JSX.Element;
    }
    export class PopupContainer extends SurveyElementBase<any, any> {
        prevIsVisible: boolean;
        constructor(props: any);
        handleKeydown: (event: any) => void;
        get model(): PopupBaseViewModel;
        protected getStateElement(): Base;
        clickInside: (ev: any) => void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        renderContainer(PopupBaseViewModel: PopupBaseViewModel): JSX.Element;
        renderHeaderContent(): JSX.Element;
        renderContent(): JSX.Element;
        protected renderHeaderPopup(popupModel: PopupBaseViewModel): JSX.Element | null;
        protected renderFooter(popuModel: PopupBaseViewModel): JSX.Element | null;
        render(): JSX.Element;
    }
    export class PopupDropdownContainer extends PopupContainer {
        protected renderHeaderPopup(popupModel: PopupBaseViewModel): JSX.Element | null;
    }
    export function showModal(componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, cssClass?: string, title?: string, displayMode?: "popup" | "overlay"): PopupBaseViewModel;
    export function showDialog(dialogOptions: IDialogOptions): PopupBaseViewModel;
}
declare module "react/components/action-bar/action-bar-item-dropdown" {
    import { SurveyActionBarItem } from "react/components/action-bar/action-bar-item";
    export class SurveyActionBarItemDropdown extends SurveyActionBarItem {
        private viewModel;
        constructor(props: any);
        renderButtonContent(): JSX.Element;
        componentWillUnmount(): void;
    }
}
declare module "react/components/action-bar/action-bar" {
    import { Base, Action, ActionContainer } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    export * from "react/components/action-bar/action-bar-item-dropdown";
    export * from "react/components/action-bar/action-bar-separator";
    interface IActionBarProps {
        model: ActionContainer<Action>;
        handleClick?: boolean;
    }
    export class SurveyActionBar extends SurveyElementBase<IActionBarProps, any> {
        private rootRef;
        constructor(props: IActionBarProps);
        private get handleClick();
        get model(): ActionContainer<Action>;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected getStateElement(): Base;
        renderElement(): any;
        renderItems(): JSX.Element[];
    }
}
declare module "react/components/title/title-content" {
    import React from "react";
    import { ITitleOwner } from "entries/core";
    export class TitleContent extends React.Component<any, any> {
        constructor(props: any);
        private get cssClasses();
        private get element();
        render(): JSX.Element;
        protected renderTitleSpans(element: ITitleOwner, cssClasses: any): Array<JSX.Element>;
        private renderRequireText;
    }
}
declare module "react/components/title/title-actions" {
    import React from "react";
    import { SurveyElement } from "entries/core";
    export class TitleActions extends React.Component<any, any> {
        protected get cssClasses(): any;
        protected get element(): SurveyElement;
        render(): JSX.Element;
    }
}
declare module "react/components/title/title-element" {
    import React from "react";
    export class TitleElement extends React.Component<any, any> {
        constructor(props: any);
        private get element();
        render(): JSX.Element | any;
    }
}
declare module "react/element-header" {
    import React from "react";
    export class SurveyElementHeader extends React.Component<any, any> {
        private get element();
        render(): JSX.Element;
    }
}
declare module "react/reactquestion" {
    import * as React from "react";
    import { Base, SurveyElement, SurveyError, Question, QuestionMatrixDropdownRenderedCell } from "entries/core";
    import { SurveyElementBase, ReactSurveyElement } from "react/reactquestion_element";
    export interface ISurveyCreator {
        createQuestionElement(question: Question): JSX.Element | null;
        renderError(key: string, error: SurveyError, cssClasses: any): JSX.Element;
        questionTitleLocation(): string;
        questionErrorLocation(): string;
    }
    export class SurveyQuestion extends SurveyElementBase<any, any> {
        private isNeedFocus;
        static renderQuestionBody(creator: ISurveyCreator, question: Question): JSX.Element | any;
        private rootRef;
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): Question;
        private get creator();
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private doAfterRender;
        protected canRender(): boolean;
        protected renderQuestionContent(): JSX.Element;
        protected renderElement(): JSX.Element;
        protected wrapElement(element: JSX.Element): JSX.Element;
        protected wrapQuestionContent(element: JSX.Element): JSX.Element;
        protected renderQuestion(): JSX.Element;
        protected renderDescription(): JSX.Element;
        protected renderComment(cssClasses: any): JSX.Element;
        protected renderHeader(question: Question): JSX.Element;
        protected renderErrors(cssClasses: any, location: string): JSX.Element;
    }
    export class SurveyElementErrors extends ReactSurveyElement {
        constructor(props: any);
        protected get id(): string;
        protected get element(): SurveyElement;
        private get creator();
        protected get location(): string;
        private getState;
        protected canRender(): boolean;
        private tooltipManager;
        private tooltipRef;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentWillUnmount(): void;
        private disposeTooltipManager;
        protected renderElement(): JSX.Element;
    }
    export abstract class SurveyQuestionAndErrorsWrapped extends ReactSurveyElement {
        [index: string]: any;
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): Question;
        protected get creator(): ISurveyCreator;
        protected getQuestion(): Question;
        protected get itemCss(): string;
        componentDidMount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        protected doAfterRender(): void;
        protected canRender(): boolean;
        protected renderErrors(errorsLocation: string): JSX.Element;
        protected renderContent(): JSX.Element;
        protected abstract renderElement(): JSX.Element;
        protected getShowErrors(): boolean;
        protected renderQuestion(): JSX.Element;
    }
    export class SurveyQuestionAndErrorsCell extends SurveyQuestionAndErrorsWrapped {
        [index: string]: any;
        protected cellRef: React.RefObject<HTMLTableCellElement>;
        constructor(props: any);
        componentWillUnmount(): void;
        protected renderElement(): JSX.Element;
        protected getCellStyle(): any;
        protected getHeaderText(): string;
        protected wrapCell(cell: QuestionMatrixDropdownRenderedCell, element: JSX.Element): JSX.Element;
    }
}
declare module "react/reactquestion_element" {
    import * as React from "react";
    import { Base, PanelModel, LocalizableString, Question } from "entries/core";
    import { ISurveyCreator } from "react/reactquestion";
    export class SurveyElementBase<P, S> extends React.Component<P, S> {
        static renderLocString(locStr: LocalizableString, style?: any, key?: string): JSX.Element;
        static renderQuestionDescription(question: Question | PanelModel): JSX.Element;
        private changedStatePropNameValue;
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private _allowComponentUpdate;
        protected allowComponentUpdate(): void;
        protected denyComponentUpdate(): void;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        render(): JSX.Element | null;
        protected wrapElement(element: JSX.Element): JSX.Element;
        protected get isRendering(): boolean;
        protected getRenderedElements(): Base[];
        private startEndRendering;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element | null;
        protected get changedStatePropName(): string | undefined;
        private makeBaseElementsReact;
        private unMakeBaseElementsReact;
        protected getStateElements(): Array<Base>;
        protected getStateElement(): Base | null;
        protected get isDisplayMode(): boolean;
        protected renderLocString(locStr: LocalizableString, style?: any, key?: string): JSX.Element;
        private canMakeReact;
        private makeBaseElementReact;
        protected canUsePropInState(key: string): boolean;
        private unMakeBaseElementReact;
    }
    export class ReactSurveyElement extends SurveyElementBase<any, any> {
        constructor(props: any);
        protected get cssClasses(): any;
    }
    export class SurveyQuestionElementBase extends SurveyElementBase<any, any> {
        control: HTMLElement;
        constructor(props: any);
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected updateDomElement(): void;
        protected get questionBase(): Question;
        protected getRenderedElements(): Base[];
        protected get creator(): ISurveyCreator;
        protected canRender(): boolean;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        protected get isDisplayMode(): boolean;
        protected wrapCell(cell: any, element: JSX.Element, reason: string): JSX.Element;
        setControl(element: HTMLElement | null): void;
    }
    export class SurveyQuestionUncontrolledElement<T extends Question> extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): T;
        updateValueOnEvent: (event: any) => void;
        protected setValueCore(newValue: any): void;
        protected getValueCore(): any;
        protected updateDomElement(): void;
        private getValue;
    }
}
declare module "react/row" {
    import { IElement, Base } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    export class SurveyRow extends SurveyElementBase<any, any> {
        private rootRef;
        constructor(props: any);
        private recalculateCss;
        protected getStateElement(): Base;
        private get row();
        private get survey();
        private get creator();
        protected get css(): any;
        protected canRender(): boolean;
        protected renderElementContent(): JSX.Element;
        protected renderElement(): JSX.Element;
        componentDidMount(): void;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        private stopLazyRendering;
        componentWillUnmount(): void;
        protected createElement(element: IElement, elementIndex?: number): JSX.Element;
    }
}
declare module "react/panel-base" {
    import * as React from "react";
    import { ISurveyCreator } from "react/reactquestion";
    import { Base, SurveyModel, QuestionRowModel, PanelModelBase } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    export class SurveyPanelBase extends SurveyElementBase<any, any> {
        protected rootRef: React.RefObject<HTMLDivElement>;
        constructor(props: any);
        protected getStateElement(): Base;
        protected canUsePropInState(key: string): boolean;
        protected get survey(): SurveyModel | null;
        protected get creator(): ISurveyCreator;
        protected get css(): any;
        get panelBase(): PanelModelBase;
        protected getPanelBase(): PanelModelBase;
        protected getSurvey(): SurveyModel | null;
        protected getCss(): any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private doAfterRender;
        protected canRender(): boolean;
        private renderedRowsCache;
        protected renderRows(css: any): Array<JSX.Element>;
        protected createRow(row: QuestionRowModel, css: any): JSX.Element;
    }
}
declare module "react/page" {
    import { PageModel, PanelModelBase } from "entries/core";
    import { SurveyPanelBase } from "react/panel-base";
    export class SurveyPage extends SurveyPanelBase {
        constructor(props: any);
        protected getPanelBase(): PanelModelBase;
        get page(): PageModel;
        protected renderElement(): JSX.Element;
        protected renderTitle(): JSX.Element;
        protected renderDescription(): JSX.Element | null;
    }
}
declare module "react/string-viewer" {
    import React from "react";
    export class SurveyLocStringViewer extends React.Component<any, any> {
        constructor(props: any);
        private rootRef;
        private get locStr();
        private get style();
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private isRendering;
        private onChangedHandler;
        private reactOnStrChanged;
        render(): JSX.Element | null;
        protected renderString(): JSX.Element;
    }
}
declare module "react/components/survey-header/survey-header" {
    import React from "react";
    import { SurveyModel } from "entries/core";
    interface ISurveyHeaderProps {
        survey: SurveyModel;
    }
    export class SurveyHeader extends React.Component<ISurveyHeaderProps, any> {
        constructor(props: ISurveyHeaderProps);
        private get survey();
        private get css();
        componentDidMount(): void;
        componentWillUnmount(): void;
        private renderTitle;
        private renderLogoImage;
        render(): JSX.Element | null;
    }
}
declare module "react/reacttimerpanel" {
    import { Base, SurveyTimerModel } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyTimerPanel extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): Base;
        protected get timerModel(): SurveyTimerModel;
        private readonly circleLength;
        private get progress();
        render(): JSX.Element;
    }
}
declare module "react/components/brand-info" {
    import React from "react";
    export class BrandInfo extends React.Component<any, any> {
        render(): JSX.Element;
    }
}
declare module "react/components/notifier" {
    import { Base, Notifier } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    export interface INotifierComponentProps {
        notifier: Notifier;
    }
    export class NotifierComponent extends SurveyElementBase<INotifierComponentProps, any> {
        get notifier(): Notifier;
        protected getStateElement(): Base;
        renderElement(): JSX.Element | null;
    }
}
declare module "react/reactSurvey" {
    import { Base, Question, PageModel, SurveyError, SurveyModel, IAttachKey2clickOptions } from "entries/core";
    import { ISurveyCreator } from "react/reactquestion";
    import { SurveyElementBase } from "react/reactquestion_element";
    export class Survey extends SurveyElementBase<any, any> implements ISurveyCreator {
        private previousJSON;
        private rootRef;
        static get cssType(): string;
        static set cssType(value: string);
        protected survey: SurveyModel;
        private rootNodeId;
        private rootNodeClassName;
        constructor(props: any);
        protected getStateElement(): Base;
        private isSurveyUpdated;
        private onSurveyUpdated;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentDidMount(): void;
        destroySurvey(): void;
        componentWillUnmount(): void;
        doRender(): JSX.Element;
        protected renderElement(): JSX.Element;
        get css(): any;
        set css(value: any);
        protected renderCompleted(): JSX.Element | null;
        protected renderCompletedBefore(): JSX.Element;
        protected renderLoading(): JSX.Element;
        protected renderSurvey(): JSX.Element;
        protected renderTimerPanel(location: string): JSX.Element;
        protected renderPage(page: PageModel): JSX.Element;
        protected renderProgress(isTop: boolean): JSX.Element | null;
        protected renderNavigation(navPosition: string): JSX.Element | null;
        protected renderEmptySurvey(): JSX.Element;
        protected createSurvey(newProps: any): void;
        private isModelJSONChanged;
        protected updateSurvey(newProps: any, oldProps?: any): void;
        protected setSurveyEvents(): void;
        createQuestionElement(question: Question): JSX.Element | null;
        renderError(key: string, error: SurveyError, cssClasses: any): JSX.Element;
        questionTitleLocation(): string;
        questionErrorLocation(): string;
    }
    export function attachKey2click(element: JSX.Element, viewModel?: any, options?: IAttachKey2clickOptions): JSX.Element;
}
declare module "react/reactSurveyNavigationBase" {
    import * as React from "react";
    import { SurveyModel } from "entries/core";
    export class SurveyNavigationBase extends React.Component<any, any> {
        constructor(props: any);
        protected get survey(): SurveyModel;
        protected get css(): any;
        private updateStateFunction;
        componentDidMount(): void;
        componentWillUnmount(): void;
    }
}
declare module "react/panel" {
    import { SurveyPanelBase } from "react/panel-base";
    import { PanelModel } from "entries/core";
    export class SurveyPanel extends SurveyPanelBase {
        private hasBeenExpanded;
        constructor(props: any);
        get panel(): PanelModel;
        protected renderElement(): JSX.Element;
        protected renderHeader(): JSX.Element;
        protected wrapElement(element: JSX.Element): JSX.Element;
        protected renderContent(style: any, rows: JSX.Element[], className: string): JSX.Element;
        protected renderTitle(): JSX.Element | null;
        protected renderDescription(): JSX.Element | null;
        protected renderBottom(): JSX.Element | null;
    }
}
declare module "react/flow-panel" {
    import { FlowPanelModel, Question } from "entries/core";
    import { SurveyPanel } from "react/panel";
    export class SurveyFlowPanel extends SurveyPanel {
        constructor(props: any);
        get flowPanel(): FlowPanelModel;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected getQuestion(name: string): Question;
        protected renderQuestion(question: Question): string;
        protected renderRows(): Array<JSX.Element>;
        private renderedIndex;
        private getNodeIndex;
        protected renderHtml(): JSX.Element | null;
        protected renderNodes(domNodes: Array<Node>): Array<JSX.Element>;
        private getStyle;
        protected renderParentNode(node: Node): JSX.Element;
        protected renderNode(node: Node): JSX.Element | null;
        private getChildDomNodes;
        private hasTextChildNodesOnly;
        protected renderContent(style: any, rows: JSX.Element[]): JSX.Element;
    }
}
declare module "react/reactquestion_checkbox" {
    import { ReactSurveyElement, SurveyQuestionElementBase } from "react/reactquestion_element";
    import { Base, ItemValue, QuestionCheckboxModel } from "entries/core";
    export class SurveyQuestionCheckbox extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionCheckboxModel;
        protected renderElement(): JSX.Element;
        protected getHeader(): JSX.Element[];
        protected getFooter(): JSX.Element[];
        protected getColumnedBody(cssClasses: any): JSX.Element;
        protected getColumns(cssClasses: any): JSX.Element[];
        protected getBody(cssClasses: any): JSX.Element;
        protected getItems(cssClasses: any, choices: Array<ItemValue>): Array<any>;
        protected get textStyle(): any;
        protected renderOther(): JSX.Element;
        protected renderItem(key: string, item: any, isFirst: boolean, cssClasses: any, index?: string): JSX.Element;
    }
    export class SurveyQuestionCheckboxItem extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): QuestionCheckboxModel;
        protected get item(): ItemValue;
        protected get textStyle(): any;
        protected get isFirst(): any;
        protected get index(): number;
        private get hideCaption();
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        handleOnChange: (event: any) => void;
        selectAllChanged: (event: any) => void;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
        protected get inputStyle(): any;
        protected renderCheckbox(isChecked: boolean, otherItem: JSX.Element | null): JSX.Element;
    }
}
declare module "react/reactquestion_ranking" {
    import { ReactSurveyElement, SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionRankingModel, ItemValue } from "entries/core";
    export class SurveyQuestionRanking extends SurveyQuestionElementBase {
        protected get question(): QuestionRankingModel;
        protected renderElement(): JSX.Element;
        protected getItems(): Array<any>;
        protected renderItem(item: ItemValue, i: number, handleKeydown: (event: any) => void, handlePointerDown: (event: PointerEvent) => void, cssClasses: any, itemClass: string, question: QuestionRankingModel): JSX.Element;
    }
    export class SurveyQuestionRankingItem extends ReactSurveyElement {
        protected get text(): string;
        protected get index(): string;
        protected get indexText(): string;
        protected get handleKeydown(): (event: any) => void;
        protected get handlePointerDown(): (event: any) => void;
        protected get cssClasses(): any;
        protected get itemClass(): string;
        protected get itemTabIndex(): number;
        protected get question(): any;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/tagbox-filter" {
    import { DropdownMultiSelectListModel, QuestionTagboxModel } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface ITagboxFilterProps {
        model: DropdownMultiSelectListModel;
        question: QuestionTagboxModel;
    }
    export class TagboxFilterString extends SurveyElementBase<ITagboxFilterProps, any> {
        inputElement: HTMLInputElement | null;
        get model(): DropdownMultiSelectListModel;
        get question(): QuestionTagboxModel;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentDidMount(): void;
        updateDomElement(): void;
        onChange(e: any): void;
        keyhandler(e: any): void;
        onBlur(e: any): void;
        constructor(props: any);
        getStateElement(): DropdownMultiSelectListModel;
        render(): JSX.Element;
    }
}
declare module "react/dropdown-item" {
    import { ReactSurveyElement } from "react/reactquestion_element";
    import { Base } from "entries/core";
    export class SurveyQuestionOptionItem extends ReactSurveyElement {
        constructor(props: any);
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentWillUnmount(): void;
        private setupModel;
        protected getStateElement(): Base;
        private get item();
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/dropdown-base" {
    import { Question, DropdownListModel } from "entries/core";
    import { SurveyQuestionUncontrolledElement } from "react/reactquestion_element";
    export class SurveyQuestionDropdownBase<T extends Question> extends SurveyQuestionUncontrolledElement<T> {
        inputElement: HTMLInputElement | null;
        click: (event: any) => void;
        clear: (event: any) => void;
        keyhandler: (event: any) => void;
        blur: (event: any) => void;
        protected setValueCore(newValue: any): void;
        protected getValueCore(): any;
        protected renderSelect(cssClasses: any): JSX.Element;
        renderValueElement(dropdownListModel: DropdownListModel): JSX.Element | null;
        protected renderInput(dropdownListModel: DropdownListModel): JSX.Element;
        createClearButton(): JSX.Element | null;
        protected renderOther(cssClasses: any): JSX.Element;
        componentDidUpdate(prevProps: any, prevState: any): void;
        componentDidMount(): void;
        updateInputDomElement(): void;
    }
}
declare module "react/reactquestion_dropdown" {
    import { Question } from "entries/core";
    import { SurveyQuestionDropdownBase } from "react/dropdown-base";
    export class SurveyQuestionDropdown extends SurveyQuestionDropdownBase<Question> {
        constructor(props: any);
        protected renderElement(): JSX.Element;
    }
}
declare module "react/tagbox-item" {
    import { ReactSurveyElement } from "react/reactquestion_element";
    import { Base, QuestionTagboxModel, ItemValue } from "entries/core";
    export class SurveyQuestionTagboxItem extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): QuestionTagboxModel;
        protected get item(): ItemValue;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_tagbox" {
    import { QuestionTagboxModel, DropdownListModel } from "entries/core";
    import { SurveyQuestionDropdownBase } from "react/dropdown-base";
    export class SurveyQuestionTagbox extends SurveyQuestionDropdownBase<QuestionTagboxModel> {
        constructor(props: any);
        protected renderItem(key: string, item: any): JSX.Element;
        protected renderInput(dropdownListModel: DropdownListModel): JSX.Element;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/dropdown-select" {
    import { SurveyQuestionDropdown } from "react/reactquestion_dropdown";
    export class SurveyQuestionDropdownSelect extends SurveyQuestionDropdown {
        constructor(props: any);
        protected renderSelect(cssClasses: any): JSX.Element;
    }
}
declare module "react/reactquestion_matrix" {
    import { ReactSurveyElement, SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionMatrixModel } from "entries/core";
    export class SurveyQuestionMatrix extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionMatrixModel;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected renderElement(): JSX.Element;
    }
    export class SurveyQuestionMatrixRow extends ReactSurveyElement {
        constructor(props: any);
        private get question();
        private get row();
        handleOnChange(event: any): void;
        protected wrapCell(cell: any, element: JSX.Element, reason: string): JSX.Element;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
        generateTds(): JSX.Element[];
        cellClick(row: any, column: any): void;
    }
}
declare module "react/reactquestion_html" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionHtmlModel } from "entries/core";
    export class SurveyQuestionHtml extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionHtmlModel;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private reactOnStrChanged;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_file" {
    import { QuestionFileModel } from "entries/core";
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    export class SurveyQuestionFile extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionFileModel;
        protected renderElement(): JSX.Element;
        protected renderFileDecorator(): JSX.Element;
        protected renderClearButton(className: string): JSX.Element | null;
        protected renderFileSign(className: string, val: any): JSX.Element | null;
        protected renderPreview(): JSX.Element | null;
    }
}
declare module "react/reactquestion_multipletext" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { SurveyQuestionAndErrorsWrapped } from "react/reactquestion";
    import { QuestionMultipleTextModel, MultipleTextItemModel } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionMultipleText extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionMultipleTextModel;
        protected renderElement(): JSX.Element;
        protected renderRow(rowIndex: number, items: Array<MultipleTextItemModel>, cssClasses: any): JSX.Element;
    }
    export class SurveyMultipleTextItem extends ReactSurveyElement {
        private get question();
        private get item();
        protected getStateElements(): (import("question_text").QuestionTextModel | MultipleTextItemModel)[];
        private get creator();
        protected renderElement(): JSX.Element;
        protected renderItemTooltipError(item: MultipleTextItemModel, cssClasses: any): JSX.Element | null;
    }
    export class SurveyMultipleTextItemEditor extends SurveyQuestionAndErrorsWrapped {
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_radiogroup" {
    import { SurveyQuestionElementBase, ReactSurveyElement } from "react/reactquestion_element";
    import { QuestionRadiogroupModel, ItemValue, Base } from "entries/core";
    export class SurveyQuestionRadiogroup extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionRadiogroupModel;
        protected renderElement(): JSX.Element;
        protected getFooter(): JSX.Element[];
        protected getColumnedBody(cssClasses: any): JSX.Element;
        protected getColumns(cssClasses: any): JSX.Element[];
        protected getBody(cssClasses: any): JSX.Element;
        protected getItems(cssClasses: any, choices: Array<ItemValue>): Array<any>;
        protected get textStyle(): any;
        protected renderOther(cssClasses: any): JSX.Element;
        private renderItem;
        private getStateValue;
    }
    export class SurveyQuestionRadioItem extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): QuestionRadiogroupModel;
        protected get item(): ItemValue;
        protected get textStyle(): any;
        protected get index(): number;
        protected get isChecked(): boolean;
        private get hideCaption();
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        handleOnChange(event: any): void;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_text" {
    import { SurveyQuestionUncontrolledElement } from "react/reactquestion_element";
    import { QuestionTextModel } from "entries/core";
    export class SurveyQuestionText extends SurveyQuestionUncontrolledElement<QuestionTextModel> {
        constructor(props: any);
        protected renderInput(): JSX.Element;
        protected renderElement(): JSX.Element;
        private renderDataList;
    }
}
declare module "react/boolean" {
    import * as React from "react";
    import { QuestionBooleanModel, Base } from "entries/core";
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    export class SurveyQuestionBoolean extends SurveyQuestionElementBase {
        protected checkRef: React.RefObject<HTMLInputElement>;
        constructor(props: any);
        protected getStateElement(): Base;
        protected get question(): QuestionBooleanModel;
        private doCheck;
        handleOnChange(event: any): void;
        handleOnClick(event: any): void;
        handleOnSwitchClick(event: any): void;
        handleOnLabelClick(event: any, value: boolean): void;
        handleOnKeyDown(event: any): void;
        protected updateDomElement(): void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/boolean-checkbox" {
    import { SurveyQuestionBoolean } from "react/boolean";
    export class SurveyQuestionBooleanCheckbox extends SurveyQuestionBoolean {
        constructor(props: any);
        protected renderElement(): JSX.Element;
    }
}
declare module "react/boolean-radio" {
    import { SurveyQuestionBoolean } from "react/boolean";
    export class SurveyQuestionBooleanRadio extends SurveyQuestionBoolean {
        constructor(props: any);
        private renderRadioItem;
        handleOnChange: (event: any) => void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_empty" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionEmptyModel } from "entries/core";
    export class SurveyQuestionEmpty extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionEmptyModel;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/matrix/row" {
    import { QuestionMatrixDropdownRenderedRow, QuestionMatrixDropdownModelBase } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface IMatrixRowProps {
        model: QuestionMatrixDropdownRenderedRow;
        parentMatrix: QuestionMatrixDropdownModelBase;
    }
    export class MatrixRow extends SurveyElementBase<IMatrixRowProps, any> {
        constructor(props: IMatrixRowProps);
        get model(): QuestionMatrixDropdownRenderedRow;
        get parentMatrix(): QuestionMatrixDropdownModelBase;
        protected getStateElement(): QuestionMatrixDropdownRenderedRow;
        protected onPointerDownHandler: (event: any) => void;
        render(): JSX.Element;
    }
}
declare module "react/components/matrix-actions/drag-drop-icon/drag-drop-icon" {
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionMatrixDynamicDragDropIcon extends ReactSurveyElement {
        private get question();
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_matrixdropdownbase" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { SurveyQuestionAndErrorsCell } from "react/reactquestion";
    import { QuestionMatrixDropdownModelBase, QuestionMatrixDropdownRenderedRow, QuestionMatrixDropdownRenderedCell, Question } from "entries/core";
    export class SurveyQuestionMatrixDropdownBase extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionMatrixDropdownModelBase;
        private getState;
        private updateStateOnCallback;
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected renderElement(): JSX.Element;
        renderTableDiv(): JSX.Element;
        renderHeader(): JSX.Element | null;
        renderFooter(): JSX.Element | null;
        renderRows(): JSX.Element;
        renderRow(keyValue: any, row: QuestionMatrixDropdownRenderedRow, cssClasses: any): JSX.Element;
        renderCell(cell: QuestionMatrixDropdownRenderedCell, index: number, cssClasses: any): JSX.Element;
        private renderCellContent;
    }
    export class SurveyQuestionMatrixDropdownCell extends SurveyQuestionAndErrorsCell {
        constructor(props: any);
        private get cell();
        protected get itemCss(): string;
        protected getQuestion(): Question | any;
        protected doAfterRender(): void;
        protected getShowErrors(): boolean;
        protected getCellStyle(): any;
        protected getHeaderText(): string;
        protected renderQuestion(): JSX.Element;
        private renderOtherComment;
        private renderCellCheckboxButton;
        private renderCellRadiogroupButton;
    }
}
declare module "react/reactquestion_matrixdropdown" {
    import { SurveyQuestionMatrixDropdownBase } from "react/reactquestion_matrixdropdownbase";
    export class SurveyQuestionMatrixDropdown extends SurveyQuestionMatrixDropdownBase {
        constructor(props: any);
    }
}
declare module "react/reactquestion_matrixdynamic" {
    import { SurveyQuestionMatrixDropdownBase } from "react/reactquestion_matrixdropdownbase";
    import { QuestionMatrixDynamicModel } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionMatrixDynamic extends SurveyQuestionMatrixDropdownBase {
        constructor(props: any);
        protected get matrix(): QuestionMatrixDynamicModel;
        handleOnRowAddClick(event: any): void;
        protected renderElement(): JSX.Element;
        protected renderAddRowButtonOnTop(cssClasses: any): JSX.Element | null;
        protected renderAddRowButtonOnBottom(cssClasses: any): JSX.Element | null;
        protected renderNoRowsContent(cssClasses: any): JSX.Element;
        protected renderAddRowButton(cssClasses: any, isEmptySection?: boolean): JSX.Element;
    }
    export class SurveyQuestionMatrixDynamicAddButton extends ReactSurveyElement {
        constructor(props: any);
        protected get matrix(): QuestionMatrixDynamicModel;
        handleOnRowAddClick(event: any): void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/paneldynamic-actions/paneldynamic-add-btn" {
    import { QuestionPanelDynamicModel } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionPanelDynamicAction extends ReactSurveyElement {
        constructor(props: any);
        protected get data(): any;
        protected get question(): QuestionPanelDynamicModel;
    }
    export class SurveyQuestionPanelDynamicAddButton extends SurveyQuestionPanelDynamicAction {
        protected handleClick: (event: any) => void;
        protected renderElement(): JSX.Element | null;
    }
}
declare module "react/components/paneldynamic-actions/paneldynamic-next-btn" {
    import { SurveyQuestionPanelDynamicAction } from "react/components/paneldynamic-actions/paneldynamic-add-btn";
    export class SurveyQuestionPanelDynamicNextButton extends SurveyQuestionPanelDynamicAction {
        protected handleClick: (event: any) => void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/paneldynamic-actions/paneldynamic-prev-btn" {
    import { SurveyQuestionPanelDynamicAction } from "react/components/paneldynamic-actions/paneldynamic-add-btn";
    export class SurveyQuestionPanelDynamicPrevButton extends SurveyQuestionPanelDynamicAction {
        protected handleClick: (event: any) => void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/paneldynamic-actions/paneldynamic-progress-text" {
    import { SurveyQuestionPanelDynamicAction } from "react/components/paneldynamic-actions/paneldynamic-add-btn";
    export class SurveyQuestionPanelDynamicProgressText extends SurveyQuestionPanelDynamicAction {
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/paneldynamic-actions/paneldynamic-remove-btn" {
    import { SurveyQuestionPanelDynamicAction } from "react/components/paneldynamic-actions/paneldynamic-add-btn";
    export class SurveyQuestionPanelDynamicRemoveButton extends SurveyQuestionPanelDynamicAction {
        protected handleClick: (event: any) => void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_paneldynamic" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { SurveyModel, QuestionPanelDynamicModel } from "entries/core";
    import { SurveyPanel } from "react/panel";
    export class SurveyQuestionPanelDynamic extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionPanelDynamicModel;
        componentDidMount(): void;
        componentWillUnmount(): void;
        private updateQuestionRendering;
        protected renderElement(): JSX.Element;
        protected renderNavigator(): JSX.Element | null;
        private renderProgressText;
        protected rendrerPrevButton(): JSX.Element;
        protected rendrerNextButton(): JSX.Element;
        protected renderRange(): JSX.Element;
        protected renderAddRowButton(): JSX.Element | null;
        protected renderNavigatorV2(): JSX.Element | null;
        protected renderPlaceholder(): JSX.Element | null;
    }
    export class SurveyQuestionPanelDynamicItem extends SurveyPanel {
        private get question();
        private get index();
        protected getSurvey(): SurveyModel | null;
        protected getCss(): any;
        render(): JSX.Element;
        protected renderButton(): JSX.Element | null;
    }
}
declare module "react/reactSurveyProgress" {
    import { SurveyNavigationBase } from "react/reactSurveyNavigationBase";
    export class SurveyProgress extends SurveyNavigationBase {
        constructor(props: any);
        protected get isTop(): boolean;
        protected get progress(): number;
        protected get progressText(): string;
        render(): JSX.Element;
    }
}
declare module "react/reactSurveyProgressButtons" {
    import { PageModel } from "entries/core";
    import { SurveyNavigationBase } from "react/reactSurveyNavigationBase";
    export class SurveyProgressButtons extends SurveyNavigationBase {
        private progressButtonsModel;
        private updateScroller;
        private listContainerRef;
        constructor(props: any);
        render(): JSX.Element;
        protected getListElements(): JSX.Element[];
        protected renderListElement(page: PageModel, index: number): JSX.Element;
        protected isListElementClickable(index: number): boolean;
        protected getListElementCss(index: number): string;
        protected clickListElement(index: number): void;
        protected getScrollButtonCss(isLeftScroll: boolean): string;
        protected clickScrollButton(listContainerElement: Element | null, isLeftScroll: boolean): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
    }
}
declare module "react/reactquestion_rating" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionRatingModel, RenderedRatingItem } from "entries/core";
    export class SurveyQuestionRating extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionRatingModel;
        handleOnClick(event: any): void;
        protected renderElement(): JSX.Element;
        protected renderItem(key: string, item: RenderedRatingItem, index: number, cssClasses: any): JSX.Element;
    }
}
declare module "react/rating-dropdown" {
    import { QuestionRatingModel } from "entries/core";
    import { SurveyQuestionDropdownBase } from "react/dropdown-base";
    export class SurveyQuestionRatingDropdown extends SurveyQuestionDropdownBase<QuestionRatingModel> {
        constructor(props: any);
        protected renderElement(): JSX.Element;
    }
}
declare module "react/reactquestion_expression" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionExpressionModel } from "entries/core";
    export class SurveyQuestionExpression extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionExpressionModel;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/react-popup-survey" {
    import { Survey } from "react/reactSurvey";
    import { Base, PopupSurveyModel } from "entries/core";
    export class PopupSurvey extends Survey {
        protected popup: PopupSurveyModel;
        constructor(props: any);
        protected getStateElements(): Array<Base>;
        handleOnExpanded(event: any): void;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
        protected renderWindowHeader(): JSX.Element;
        protected renderBody(): JSX.Element;
        protected createSurvey(newProps: any): void;
    }
    /**
     * Obsolete. Please use PopupSurvey
     */
    export class SurveyWindow extends PopupSurvey {
    }
}
declare module "react/imagepicker" {
    import { ReactSurveyElement, SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionImagePickerModel, ImageItemValue } from "entries/core";
    export class SurveyQuestionImagePicker extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionImagePickerModel;
        protected renderElement(): JSX.Element;
        protected getColumns(cssClasses: any): JSX.Element[];
        protected getItems(cssClasses: any): Array<any>;
        protected get textStyle(): any;
        protected renderItem(key: string, item: ImageItemValue, cssClasses: any): JSX.Element;
    }
    export class SurveyQuestionImagePickerItem extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): any;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentDidUpdate(prevProps: any, prevState: any): void;
        private reactOnStrChanged;
        protected get cssClasses(): any;
        protected get item(): any;
        protected get question(): any;
        handleOnChange(event: any): void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/image" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionImageModel } from "entries/core";
    export class SurveyQuestionImage extends SurveyQuestionElementBase {
        constructor(props: any);
        componentDidMount(): void;
        componentWillUnmount(): void;
        protected get question(): QuestionImageModel;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/signaturepad" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { QuestionSignaturePadModel } from "entries/core";
    export class SurveyQuestionSignaturePad extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionSignaturePadModel;
        protected renderElement(): JSX.Element;
        renderCleanButton(): JSX.Element | null;
    }
}
declare module "react/reactquestion_buttongroup" {
    import { SurveyQuestionElementBase } from "react/reactquestion_element";
    import { SurveyElementBase } from "react/reactquestion_element";
    import { QuestionButtonGroupModel, ButtonGroupItemValue, ButtonGroupItemModel } from "entries/core";
    export class SurveyQuestionButtonGroup extends SurveyQuestionElementBase {
        constructor(props: any);
        protected get question(): QuestionButtonGroupModel;
        getStateElement(): QuestionButtonGroupModel;
        renderElement(): JSX.Element;
        renderItems(): JSX.Element[];
    }
    export class SurveyButtonGroupItem extends SurveyElementBase<any, any> {
        model: ButtonGroupItemModel;
        constructor(props: any);
        get index(): number;
        get question(): QuestionButtonGroupModel;
        get item(): ButtonGroupItemValue;
        getStateElement(): ButtonGroupItemValue;
        renderElement(): JSX.Element;
        protected renderIcon(): JSX.Element;
        protected renderInput(): JSX.Element;
        protected renderCaption(): JSX.Element;
    }
}
declare module "react/reactquestion_custom" {
    import { SurveyQuestionUncontrolledElement } from "react/reactquestion_element";
    import { Base, QuestionCustomModel, QuestionCompositeModel } from "entries/core";
    export class SurveyQuestionCustom extends SurveyQuestionUncontrolledElement<QuestionCustomModel> {
        constructor(props: any);
        protected getStateElements(): Array<Base>;
        protected renderElement(): JSX.Element;
    }
    export class SurveyQuestionComposite extends SurveyQuestionUncontrolledElement<QuestionCompositeModel> {
        constructor(props: any);
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/list/list-item" {
    import { ListModel } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface IListItemProps {
        model: ListModel;
        item: any;
    }
    export class ListItem extends SurveyElementBase<IListItemProps, any> {
        get model(): ListModel;
        get item(): any;
        handleKeydown: (event: any) => void;
        getStateElement(): any;
        render(): JSX.Element | null;
        componentDidMount(): void;
    }
}
declare module "react/components/list/list" {
    import { ListModel } from "entries/core";
    import { SurveyElementBase } from "react/reactquestion_element";
    interface IListProps {
        model: ListModel;
    }
    export class List extends SurveyElementBase<IListProps, any> {
        private listContainerRef;
        constructor(props: any);
        get model(): ListModel;
        handleKeydown: (event: any) => void;
        handleMouseMove: (event: any) => void;
        getStateElement(): ListModel;
        componentDidMount(): void;
        renderElement(): JSX.Element;
        renderItems(): JSX.Element[];
        searchElementContent(): JSX.Element;
        emptyContent(): JSX.Element;
    }
}
declare module "react/components/survey-header/logo-image" {
    import React from "react";
    import { SurveyModel } from "entries/core";
    interface ILogoImageProps {
        data: SurveyModel;
    }
    export class LogoImage extends React.Component<ILogoImageProps, any> {
        constructor(props: ILogoImageProps);
        private get survey();
        render(): JSX.Element;
    }
}
declare module "react/components/matrix-actions/remove-button/remove-button" {
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionMatrixDynamicRemoveButton extends ReactSurveyElement {
        constructor(props: any);
        private get question();
        private get row();
        handleOnRowRemoveClick(event: any): void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/matrix-actions/detail-button/detail-button" {
    import { Action } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyQuestionMatrixDetailButton extends ReactSurveyElement {
        constructor(props: any);
        protected getStateElement(): any;
        get item(): Action;
        private get question();
        private get row();
        handleOnShowHideClick(event: any): void;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/survey-actions/survey-nav-button" {
    import { Action } from "entries/core";
    import { ReactSurveyElement } from "react/reactquestion_element";
    export class SurveyNavigationButton extends ReactSurveyElement {
        protected get item(): Action;
        protected canRender(): boolean;
        protected renderElement(): JSX.Element;
    }
}
declare module "react/components/skeleton" {
    import React from "react";
    export class Skeleton extends React.Component<any, any> {
        render(): JSX.Element;
    }
}
declare module "react/string-editor" {
    import React from "react";
    export class SurveyLocStringEditor extends React.Component<any, any> {
        constructor(props: any);
        private get locStr();
        private get style();
        componentDidMount(): void;
        componentWillUnmount(): void;
        onInput: (event: any) => void;
        onClick: (event: any) => void;
        render(): JSX.Element | null;
    }
}
declare module "entries/react-ui-model" {
    export { Survey, attachKey2click } from "react/reactSurvey";
    export { ReactSurveyElementsWrapper } from "react/reactsurveymodel";
    export { SurveyNavigationBase } from "react/reactSurveyNavigationBase";
    export { SurveyTimerPanel } from "react/reacttimerpanel";
    export { SurveyPage } from "react/page";
    export { SurveyRow } from "react/row";
    export { SurveyPanel } from "react/panel";
    export { SurveyFlowPanel } from "react/flow-panel";
    export { SurveyQuestion, SurveyElementErrors, SurveyQuestionAndErrorsCell, ISurveyCreator } from "react/reactquestion";
    export { ReactSurveyElement, SurveyElementBase, SurveyQuestionElementBase, } from "react/reactquestion_element";
    export { SurveyQuestionCommentItem, SurveyQuestionComment, } from "react/reactquestion_comment";
    export { SurveyQuestionCheckbox, SurveyQuestionCheckboxItem, } from "react/reactquestion_checkbox";
    export { SurveyQuestionRanking, SurveyQuestionRankingItem, } from "react/reactquestion_ranking";
    export { TagboxFilterString } from "react/tagbox-filter";
    export { SurveyQuestionOptionItem } from "react/dropdown-item";
    export { SurveyQuestionDropdownBase } from "react/dropdown-base";
    export { SurveyQuestionDropdown } from "react/reactquestion_dropdown";
    export { SurveyQuestionTagboxItem } from "react/tagbox-item";
    export { SurveyQuestionTagbox } from "react/reactquestion_tagbox";
    export { SurveyQuestionDropdownSelect } from "react/dropdown-select";
    export { SurveyQuestionMatrix, SurveyQuestionMatrixRow, } from "react/reactquestion_matrix";
    export { SurveyQuestionHtml } from "react/reactquestion_html";
    export { SurveyQuestionFile } from "react/reactquestion_file";
    export { SurveyQuestionMultipleText } from "react/reactquestion_multipletext";
    export { SurveyQuestionRadiogroup, SurveyQuestionRadioItem } from "react/reactquestion_radiogroup";
    export { SurveyQuestionText } from "react/reactquestion_text";
    export { SurveyQuestionBoolean } from "react/boolean";
    export { SurveyQuestionBooleanCheckbox } from "react/boolean-checkbox";
    export { SurveyQuestionBooleanRadio } from "react/boolean-radio";
    export { SurveyQuestionEmpty } from "react/reactquestion_empty";
    export { SurveyQuestionMatrixDropdownCell, SurveyQuestionMatrixDropdownBase } from "react/reactquestion_matrixdropdownbase";
    export { SurveyQuestionMatrixDropdown } from "react/reactquestion_matrixdropdown";
    export { SurveyQuestionMatrixDynamic, SurveyQuestionMatrixDynamicAddButton } from "react/reactquestion_matrixdynamic";
    export { SurveyQuestionPanelDynamic } from "react/reactquestion_paneldynamic";
    export { SurveyProgress } from "react/reactSurveyProgress";
    export { SurveyProgressButtons } from "react/reactSurveyProgressButtons";
    export { SurveyQuestionRating } from "react/reactquestion_rating";
    export { SurveyQuestionRatingDropdown } from "react/rating-dropdown";
    export { SurveyQuestionExpression } from "react/reactquestion_expression";
    export { PopupSurvey, SurveyWindow } from "react/react-popup-survey";
    export { ReactQuestionFactory } from "react/reactquestion_factory";
    export { ReactElementFactory } from "react/element-factory";
    export { SurveyQuestionImagePicker } from "react/imagepicker";
    export { SurveyQuestionImage } from "react/image";
    export { SurveyQuestionSignaturePad } from "react/signaturepad";
    export { SurveyQuestionButtonGroup } from "react/reactquestion_buttongroup";
    export { SurveyQuestionCustom, SurveyQuestionComposite } from "react/reactquestion_custom";
    export { Popup } from "react/components/popup/popup";
    export { List } from "react/components/list/list";
    export { TitleActions } from "react/components/title/title-actions";
    export { TitleElement } from "react/components/title/title-element";
    export { SurveyActionBar } from "react/components/action-bar/action-bar";
    export { LogoImage } from "react/components/survey-header/logo-image";
    export { SurveyHeader } from "react/components/survey-header/survey-header";
    export { SvgIcon } from "react/components/svg-icon/svg-icon";
    export { SurveyQuestionMatrixDynamicRemoveButton } from "react/components/matrix-actions/remove-button/remove-button";
    export { SurveyQuestionMatrixDetailButton } from "react/components/matrix-actions/detail-button/detail-button";
    export { SurveyQuestionMatrixDynamicDragDropIcon } from "react/components/matrix-actions/drag-drop-icon/drag-drop-icon";
    export { SurveyQuestionPanelDynamicAddButton } from "react/components/paneldynamic-actions/paneldynamic-add-btn";
    export { SurveyQuestionPanelDynamicRemoveButton } from "react/components/paneldynamic-actions/paneldynamic-remove-btn";
    export { SurveyQuestionPanelDynamicPrevButton } from "react/components/paneldynamic-actions/paneldynamic-prev-btn";
    export { SurveyQuestionPanelDynamicNextButton } from "react/components/paneldynamic-actions/paneldynamic-next-btn";
    export { SurveyQuestionPanelDynamicProgressText } from "react/components/paneldynamic-actions/paneldynamic-progress-text";
    export { SurveyNavigationButton } from "react/components/survey-actions/survey-nav-button";
    export { MatrixRow } from "react/components/matrix/row";
    export { Skeleton } from "react/components/skeleton";
    export { NotifierComponent } from "react/components/notifier";
    export { SurveyLocStringViewer } from "react/string-viewer";
    export { SurveyLocStringEditor } from "react/string-editor";
}
declare module "entries/react" {
    export * from "entries/core";
    export * from "entries/plugins";
    import "entries/chunks/localization";
    export * from "entries/react-ui-model";
}

declare module "survey-react" { import main = require("entries/react"); export = main; }