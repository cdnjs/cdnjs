declare module "intl-tel-input/data" {
    export type Country = {
        name: string;
        iso2: string;
        dialCode: string;
        priority: number;
        areaCodes: string[] | null;
        nodeById: object;
    };
    const allCountries: Country[];
    export default allCountries;
}
declare module "intl-tel-input/i18n/types" {
    export type I18n = {
        af?: string;
        al?: string;
        dz?: string;
        as?: string;
        ad?: string;
        ao?: string;
        ai?: string;
        ag?: string;
        ar?: string;
        am?: string;
        aw?: string;
        ac?: string;
        au?: string;
        at?: string;
        az?: string;
        bs?: string;
        bh?: string;
        bd?: string;
        bb?: string;
        by?: string;
        be?: string;
        bz?: string;
        bj?: string;
        bm?: string;
        bt?: string;
        bo?: string;
        ba?: string;
        bw?: string;
        br?: string;
        io?: string;
        vg?: string;
        bn?: string;
        bg?: string;
        bf?: string;
        bi?: string;
        kh?: string;
        cm?: string;
        ca?: string;
        cv?: string;
        bq?: string;
        ky?: string;
        cf?: string;
        td?: string;
        cl?: string;
        cn?: string;
        cx?: string;
        cc?: string;
        co?: string;
        km?: string;
        cg?: string;
        cd?: string;
        ck?: string;
        cr?: string;
        hr?: string;
        cu?: string;
        cw?: string;
        cy?: string;
        cz?: string;
        ci?: string;
        dk?: string;
        dj?: string;
        dm?: string;
        do?: string;
        ec?: string;
        eg?: string;
        sv?: string;
        gq?: string;
        er?: string;
        ee?: string;
        sz?: string;
        et?: string;
        fk?: string;
        fo?: string;
        fj?: string;
        fi?: string;
        fr?: string;
        gf?: string;
        pf?: string;
        ga?: string;
        gm?: string;
        ge?: string;
        de?: string;
        gh?: string;
        gi?: string;
        gr?: string;
        gl?: string;
        gd?: string;
        gp?: string;
        gu?: string;
        gt?: string;
        gg?: string;
        gn?: string;
        gw?: string;
        gy?: string;
        ht?: string;
        hn?: string;
        hk?: string;
        hu?: string;
        is?: string;
        in?: string;
        id?: string;
        ir?: string;
        iq?: string;
        ie?: string;
        im?: string;
        il?: string;
        it?: string;
        jm?: string;
        jp?: string;
        je?: string;
        jo?: string;
        kz?: string;
        ke?: string;
        ki?: string;
        xk?: string;
        kw?: string;
        kg?: string;
        la?: string;
        lv?: string;
        lb?: string;
        ls?: string;
        lr?: string;
        ly?: string;
        li?: string;
        lt?: string;
        lu?: string;
        mo?: string;
        mg?: string;
        mw?: string;
        my?: string;
        mv?: string;
        ml?: string;
        mt?: string;
        mh?: string;
        mq?: string;
        mr?: string;
        mu?: string;
        yt?: string;
        mx?: string;
        fm?: string;
        md?: string;
        mc?: string;
        mn?: string;
        me?: string;
        ms?: string;
        ma?: string;
        mz?: string;
        mm?: string;
        na?: string;
        nr?: string;
        np?: string;
        nl?: string;
        nc?: string;
        nz?: string;
        ni?: string;
        ne?: string;
        ng?: string;
        nu?: string;
        nf?: string;
        kp?: string;
        mk?: string;
        mp?: string;
        no?: string;
        om?: string;
        pk?: string;
        pw?: string;
        ps?: string;
        pa?: string;
        pg?: string;
        py?: string;
        pe?: string;
        ph?: string;
        pl?: string;
        pt?: string;
        pr?: string;
        qa?: string;
        ro?: string;
        ru?: string;
        rw?: string;
        re?: string;
        ws?: string;
        sm?: string;
        sa?: string;
        sn?: string;
        rs?: string;
        sc?: string;
        sl?: string;
        sg?: string;
        sx?: string;
        sk?: string;
        si?: string;
        sb?: string;
        so?: string;
        za?: string;
        kr?: string;
        ss?: string;
        es?: string;
        lk?: string;
        bl?: string;
        sh?: string;
        kn?: string;
        lc?: string;
        mf?: string;
        pm?: string;
        vc?: string;
        sd?: string;
        sr?: string;
        sj?: string;
        se?: string;
        ch?: string;
        sy?: string;
        st?: string;
        tw?: string;
        tj?: string;
        tz?: string;
        th?: string;
        tl?: string;
        tg?: string;
        tk?: string;
        to?: string;
        tt?: string;
        tn?: string;
        tr?: string;
        tm?: string;
        tc?: string;
        tv?: string;
        vi?: string;
        ug?: string;
        ua?: string;
        ae?: string;
        gb?: string;
        us?: string;
        uy?: string;
        uz?: string;
        vu?: string;
        va?: string;
        ve?: string;
        vn?: string;
        wf?: string;
        eh?: string;
        ye?: string;
        zm?: string;
        zw?: string;
        ax?: string;
        selectedCountryAriaLabel?: string;
        searchPlaceholder?: string;
        countryListAriaLabel?: string;
        oneSearchResult?: string;
        multipleSearchResults?: string;
        noCountrySelected?: string;
        zeroSearchResults?: string;
    };
}
declare module "intl-tel-input/i18n/en/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/en/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/en" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/en/countries";
    import interfaceTranslations from "intl-tel-input/i18n/en/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input" {
    import { Country } from "intl-tel-input/data";
    import { I18n } from "intl-tel-input/i18n/types";
    type UtilsLoader = () => Promise<{
        default: ItiUtils;
    }>;
    interface IntlTelInputInterface {
        (input: HTMLInputElement, options?: SomeOptions): Iti;
        autoCountry?: string;
        defaults: AllOptions;
        documentReady: () => boolean;
        getCountryData: () => Country[];
        getInstance: (input: HTMLInputElement) => Iti | null;
        instances: {
            [key: string]: Iti;
        };
        loadUtils: (source: string | UtilsLoader) => Promise<unknown> | null;
        startedLoadingAutoCountry: boolean;
        startedLoadingUtilsScript: boolean;
        version: string | undefined;
        utils?: ItiUtils;
    }
    type ItiUtils = {
        formatNumber(number: string, iso2: string | undefined, format?: number): string;
        formatNumberAsYouType(number: string, iso2: string | undefined): string;
        getCoreNumber(number: string, iso2: string | undefined): string;
        getExampleNumber(iso2: string | undefined, nationalMode: boolean, numberType: number, useE164?: boolean): string;
        getExtension(number: string, iso2: string | undefined): string;
        getNumberType: (number: string, iso2: string | undefined) => number;
        getValidationError(number: string, iso2: string | undefined): number;
        isPossibleNumber(number: string, iso2: string | undefined, numberType?: string): boolean;
        isValidNumber: (number: string, iso2: string | undefined) => boolean;
        numberFormat: {
            NATIONAL: number;
            INTERNATIONAL: number;
            E164: number;
            RFC3966: number;
        };
        numberType: object;
    };
    type NumberType = "FIXED_LINE_OR_MOBILE" | "FIXED_LINE" | "MOBILE" | "PAGER" | "PERSONAL_NUMBER" | "PREMIUM_RATE" | "SHARED_COST" | "TOLL_FREE" | "UAN" | "UNKNOWN" | "VOICEMAIL" | "VOIP";
    type SelectedCountryData = Country | {
        name?: string;
        iso2?: string;
        dialCode?: string;
    };
    interface AllOptions {
        allowDropdown: boolean;
        autoPlaceholder: string;
        containerClass: string;
        countryOrder: string[];
        countrySearch: boolean;
        customPlaceholder: ((selectedCountryPlaceholder: string, selectedCountryData: object) => string) | null;
        dropdownContainer: HTMLElement | null;
        excludeCountries: string[];
        fixDropdownWidth: boolean;
        formatAsYouType: boolean;
        formatOnDisplay: boolean;
        geoIpLookup: ((success: (iso2: string) => void, failure: () => void) => void) | null;
        hiddenInput: ((telInputName: string) => {
            phone: string;
            country?: string;
        }) | null;
        i18n: I18n;
        initialCountry: string;
        loadUtilsOnInit: string | UtilsLoader;
        nationalMode: boolean;
        onlyCountries: string[];
        placeholderNumberType: NumberType;
        showFlags: boolean;
        separateDialCode: boolean;
        strictMode: boolean;
        useFullscreenPopup: boolean;
        /** @deprecated Please use the `loadUtilsOnInit` option. */
        utilsScript: string | UtilsLoader;
        validationNumberType: NumberType | null;
    }
    export type SomeOptions = Partial<AllOptions>;
    export class Iti {
        id: number;
        promise: Promise<[unknown, unknown]>;
        private telInput;
        private highlightedItem;
        private options;
        private hadInitialPlaceholder;
        private isRTL;
        private showSelectedCountryOnLeft;
        private isAndroid;
        private selectedCountryData;
        private countries;
        private dialCodeMaxLen;
        private dialCodeToIso2Map;
        private dialCodes;
        private countryContainer;
        private selectedCountry;
        private selectedCountryInner;
        private selectedCountryA11yText;
        private selectedDialCode;
        private dropdownArrow;
        private dropdownContent;
        private searchInput;
        private searchResultsA11yText;
        private countryList;
        private dropdown;
        private hiddenInput;
        private hiddenInputCountry;
        private maxCoreNumberLength;
        private defaultCountry;
        private originalPaddingRight;
        private originalPaddingLeft;
        private _handleHiddenInputSubmit;
        private _handleLabelClick;
        private _handleClickSelectedCountry;
        private _handleCountryContainerKeydown;
        private _handleInputEvent;
        private _handleKeydownEvent;
        private _handleWindowScroll;
        private _handleMouseoverCountryList;
        private _handleClickCountryList;
        private _handleClickOffToClose;
        private _handleKeydownOnDropdown;
        private _handleSearchChange;
        private _handlePageLoad;
        private resolveAutoCountryPromise;
        private rejectAutoCountryPromise;
        private resolveUtilsScriptPromise;
        private rejectUtilsScriptPromise;
        constructor(input: HTMLInputElement, customOptions?: SomeOptions);
        _init(): void;
        private _processCountryData;
        private _sortCountries;
        private _addToDialCodeMap;
        private _processAllCountries;
        private _translateCountryNames;
        private _processDialCodes;
        private _generateMarkup;
        private _appendListItems;
        private _setInitialState;
        private _initListeners;
        private _initHiddenInputListener;
        private _initDropdownListeners;
        private _initRequests;
        private _loadAutoCountry;
        private _openDropdownWithPlus;
        private _initTelInputListeners;
        private _cap;
        private _trigger;
        private _openDropdown;
        private _setDropdownPosition;
        private _bindDropdownListeners;
        private _searchForCountry;
        private _filterCountries;
        private _updateSearchResultsText;
        private _handleUpDownKey;
        private _handleEnterKey;
        private _updateValFromNumber;
        private _updateCountryFromNumber;
        private _getCountryFromNumber;
        private _highlightListItem;
        private _getCountryData;
        private _setCountry;
        private _updateInputPadding;
        private _updateMaxLength;
        private _setSelectedCountryTitleAttribute;
        private _getHiddenSelectedCountryWidth;
        private _updatePlaceholder;
        private _selectListItem;
        private _closeDropdown;
        private _scrollTo;
        private _updateDialCode;
        private _getDialCode;
        private _getFullNumber;
        private _beforeSetNumber;
        private _triggerCountryChange;
        private _formatNumberAsYouType;
        handleAutoCountry(): void;
        handleUtils(): void;
        destroy(): void;
        getExtension(): string;
        getNumber(format?: number): string;
        getNumberType(): number;
        getSelectedCountryData(): SelectedCountryData;
        getValidationError(): number;
        isValidNumber(): boolean | null;
        private _utilsIsPossibleNumber;
        isValidNumberPrecise(): boolean | null;
        private _utilsIsValidNumber;
        setCountry(iso2: string): void;
        setNumber(number: string): void;
        setPlaceholderNumberType(type: NumberType): void;
        setDisabled(disabled: boolean): void;
    }
    const intlTelInput: IntlTelInputInterface;
    export default intlTelInput;
}
declare module "intl-tel-input/utils-compiled" {
    export default utils;
    const utils: any;
}
declare module "intl-tel-input/intlTelInputWithUtils" {
    import intlTelInput from "intl-tel-input";
    export default intlTelInput;
}
declare module "intl-tel-input/i18n/ar/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ar/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ar" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ar/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ar/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/bg/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/bg/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/bg" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/bg/countries";
    import interfaceTranslations from "intl-tel-input/i18n/bg/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/bn/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/bn/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/bn" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/bn/countries";
    import interfaceTranslations from "intl-tel-input/i18n/bn/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/bs/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/bs/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/bs" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/bs/countries";
    import interfaceTranslations from "intl-tel-input/i18n/bs/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ca/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ca/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ca" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ca/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ca/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/cs/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/cs/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/cs" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/cs/countries";
    import interfaceTranslations from "intl-tel-input/i18n/cs/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/da/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/da/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/da" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/da/countries";
    import interfaceTranslations from "intl-tel-input/i18n/da/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/de/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/de/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/de" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/de/countries";
    import interfaceTranslations from "intl-tel-input/i18n/de/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/el/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/el/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/el" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/el/countries";
    import interfaceTranslations from "intl-tel-input/i18n/el/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/es/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/es/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/es" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/es/countries";
    import interfaceTranslations from "intl-tel-input/i18n/es/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/fa/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/fa/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/fa" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/fa/countries";
    import interfaceTranslations from "intl-tel-input/i18n/fa/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/fi/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/fi/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/fi" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/fi/countries";
    import interfaceTranslations from "intl-tel-input/i18n/fi/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/fr/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/fr/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/fr" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/fr/countries";
    import interfaceTranslations from "intl-tel-input/i18n/fr/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/hi/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/hi/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/hi" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/hi/countries";
    import interfaceTranslations from "intl-tel-input/i18n/hi/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/hr/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/hr/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/hr" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/hr/countries";
    import interfaceTranslations from "intl-tel-input/i18n/hr/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/hu/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/hu/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/hu" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/hu/countries";
    import interfaceTranslations from "intl-tel-input/i18n/hu/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/id/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/id/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/id" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/id/countries";
    import interfaceTranslations from "intl-tel-input/i18n/id/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/it/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/it/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/it" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/it/countries";
    import interfaceTranslations from "intl-tel-input/i18n/it/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ja/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ja/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ja" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ja/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ja/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ko/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ko/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ko" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ko/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ko/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/mr/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/mr/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/mr" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/mr/countries";
    import interfaceTranslations from "intl-tel-input/i18n/mr/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/nl/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/nl/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/nl" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/nl/countries";
    import interfaceTranslations from "intl-tel-input/i18n/nl/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/no/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/no/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/no" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/no/countries";
    import interfaceTranslations from "intl-tel-input/i18n/no/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/pl/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/pl/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/pl" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/pl/countries";
    import interfaceTranslations from "intl-tel-input/i18n/pl/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/pt/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/pt/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/pt" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/pt/countries";
    import interfaceTranslations from "intl-tel-input/i18n/pt/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ro/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ro/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ro" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ro/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ro/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ru/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ru/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ru" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ru/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ru/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/sk/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/sk/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/sk" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/sk/countries";
    import interfaceTranslations from "intl-tel-input/i18n/sk/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/sv/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/sv/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/sv" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/sv/countries";
    import interfaceTranslations from "intl-tel-input/i18n/sv/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/te/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/te/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/te" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/te/countries";
    import interfaceTranslations from "intl-tel-input/i18n/te/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/th/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/th/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/th" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/th/countries";
    import interfaceTranslations from "intl-tel-input/i18n/th/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/tr/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/tr/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/tr" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/tr/countries";
    import interfaceTranslations from "intl-tel-input/i18n/tr/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/ur/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/ur/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/ur" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/ur/countries";
    import interfaceTranslations from "intl-tel-input/i18n/ur/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/vi/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/vi/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/vi" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/vi/countries";
    import interfaceTranslations from "intl-tel-input/i18n/vi/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n/zh/countries" {
    import { I18n } from "intl-tel-input/i18n/types";
    const countryTranslations: I18n;
    export default countryTranslations;
}
declare module "intl-tel-input/i18n/zh/interface" {
    import { I18n } from "intl-tel-input/i18n/types";
    const interfaceTranslations: I18n;
    export default interfaceTranslations;
}
declare module "intl-tel-input/i18n/zh" {
    import { I18n } from "intl-tel-input/i18n/types";
    import countryTranslations from "intl-tel-input/i18n/zh/countries";
    import interfaceTranslations from "intl-tel-input/i18n/zh/interface";
    export { countryTranslations, interfaceTranslations };
    const allTranslations: I18n;
    export default allTranslations;
}
declare module "intl-tel-input/i18n" {
    export { default as ar, countryTranslations as arCountryTranslations, interfaceTranslations as arInterfaceTranslations } from "intl-tel-input/i18n/ar";
    export { default as bg, countryTranslations as bgCountryTranslations, interfaceTranslations as bgInterfaceTranslations } from "intl-tel-input/i18n/bg";
    export { default as bn, countryTranslations as bnCountryTranslations, interfaceTranslations as bnInterfaceTranslations } from "intl-tel-input/i18n/bn";
    export { default as bs, countryTranslations as bsCountryTranslations, interfaceTranslations as bsInterfaceTranslations } from "intl-tel-input/i18n/bs";
    export { default as ca, countryTranslations as caCountryTranslations, interfaceTranslations as caInterfaceTranslations } from "intl-tel-input/i18n/ca";
    export { default as cs, countryTranslations as csCountryTranslations, interfaceTranslations as csInterfaceTranslations } from "intl-tel-input/i18n/cs";
    export { default as da, countryTranslations as daCountryTranslations, interfaceTranslations as daInterfaceTranslations } from "intl-tel-input/i18n/da";
    export { default as de, countryTranslations as deCountryTranslations, interfaceTranslations as deInterfaceTranslations } from "intl-tel-input/i18n/de";
    export { default as el, countryTranslations as elCountryTranslations, interfaceTranslations as elInterfaceTranslations } from "intl-tel-input/i18n/el";
    export { default as en, countryTranslations as enCountryTranslations, interfaceTranslations as enInterfaceTranslations } from "intl-tel-input/i18n/en";
    export { default as es, countryTranslations as esCountryTranslations, interfaceTranslations as esInterfaceTranslations } from "intl-tel-input/i18n/es";
    export { default as fa, countryTranslations as faCountryTranslations, interfaceTranslations as faInterfaceTranslations } from "intl-tel-input/i18n/fa";
    export { default as fi, countryTranslations as fiCountryTranslations, interfaceTranslations as fiInterfaceTranslations } from "intl-tel-input/i18n/fi";
    export { default as fr, countryTranslations as frCountryTranslations, interfaceTranslations as frInterfaceTranslations } from "intl-tel-input/i18n/fr";
    export { default as hi, countryTranslations as hiCountryTranslations, interfaceTranslations as hiInterfaceTranslations } from "intl-tel-input/i18n/hi";
    export { default as hr, countryTranslations as hrCountryTranslations, interfaceTranslations as hrInterfaceTranslations } from "intl-tel-input/i18n/hr";
    export { default as hu, countryTranslations as huCountryTranslations, interfaceTranslations as huInterfaceTranslations } from "intl-tel-input/i18n/hu";
    export { default as id, countryTranslations as idCountryTranslations, interfaceTranslations as idInterfaceTranslations } from "intl-tel-input/i18n/id";
    export { default as it, countryTranslations as itCountryTranslations, interfaceTranslations as itInterfaceTranslations } from "intl-tel-input/i18n/it";
    export { default as ja, countryTranslations as jaCountryTranslations, interfaceTranslations as jaInterfaceTranslations } from "intl-tel-input/i18n/ja";
    export { default as ko, countryTranslations as koCountryTranslations, interfaceTranslations as koInterfaceTranslations } from "intl-tel-input/i18n/ko";
    export { default as mr, countryTranslations as mrCountryTranslations, interfaceTranslations as mrInterfaceTranslations } from "intl-tel-input/i18n/mr";
    export { default as nl, countryTranslations as nlCountryTranslations, interfaceTranslations as nlInterfaceTranslations } from "intl-tel-input/i18n/nl";
    export { default as no, countryTranslations as noCountryTranslations, interfaceTranslations as noInterfaceTranslations } from "intl-tel-input/i18n/no";
    export { default as pl, countryTranslations as plCountryTranslations, interfaceTranslations as plInterfaceTranslations } from "intl-tel-input/i18n/pl";
    export { default as pt, countryTranslations as ptCountryTranslations, interfaceTranslations as ptInterfaceTranslations } from "intl-tel-input/i18n/pt";
    export { default as ro, countryTranslations as roCountryTranslations, interfaceTranslations as roInterfaceTranslations } from "intl-tel-input/i18n/ro";
    export { default as ru, countryTranslations as ruCountryTranslations, interfaceTranslations as ruInterfaceTranslations } from "intl-tel-input/i18n/ru";
    export { default as sk, countryTranslations as skCountryTranslations, interfaceTranslations as skInterfaceTranslations } from "intl-tel-input/i18n/sk";
    export { default as sv, countryTranslations as svCountryTranslations, interfaceTranslations as svInterfaceTranslations } from "intl-tel-input/i18n/sv";
    export { default as te, countryTranslations as teCountryTranslations, interfaceTranslations as teInterfaceTranslations } from "intl-tel-input/i18n/te";
    export { default as th, countryTranslations as thCountryTranslations, interfaceTranslations as thInterfaceTranslations } from "intl-tel-input/i18n/th";
    export { default as tr, countryTranslations as trCountryTranslations, interfaceTranslations as trInterfaceTranslations } from "intl-tel-input/i18n/tr";
    export { default as ur, countryTranslations as urCountryTranslations, interfaceTranslations as urInterfaceTranslations } from "intl-tel-input/i18n/ur";
    export { default as vi, countryTranslations as viCountryTranslations, interfaceTranslations as viInterfaceTranslations } from "intl-tel-input/i18n/vi";
    export { default as zh, countryTranslations as zhCountryTranslations, interfaceTranslations as zhInterfaceTranslations } from "intl-tel-input/i18n/zh";
}
