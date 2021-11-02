/*Type definitions for Survey JavaScript library v1.8.76
Copyright (c) 2015-2021 Devsoft Baltic OÜ  - http://surveyjs.io/
Definitions by: Devsoft Baltic OÜ <https://github.com/surveyjs/>
*/
// Dependencies for this module:
//   ../../../../survey-core
//   ../../../../react

export { ReactSurveyModel as Model };
export { ReactWindowModel as WindowModel };

export var Version: string;

export declare var surveyCss: any;
export declare var defaultStandardCss: {
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
        item: string;
        control: string;
        itemChecked: string;
        itemIndeterminate: string;
        itemDisabled: string;
        switch: string;
        slider: string;
        sliderText: string;
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
        itemSelectAll: string;
        itemNone: string;
        itemChecked: string;
        itemInline: string;
        label: string;
        labelChecked: string;
        itemControl: string;
        itemDecorator: string;
        controlLabel: string;
        materialDecorator: string;
        other: string;
        column: string;
    };
    ranking: {
        root: string;
        rootMobileMod: string;
        rootDragMod: string;
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
        control: string;
        selectWrapper: string;
        other: string;
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
        dragDropGhostPositionTop: string;
        dragDropGhostPositionBottom: string;
    };
    paneldynamic: {
        root: string;
        title: string;
        button: string;
        buttonAdd: string;
        buttonRemove: string;
        buttonRemoveRight: string;
        buttonPrev: string;
        buttonNext: string;
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
        panelWrapper: string;
        panelWrapperInRow: string;
        separatorV2: string;
        footer: string;
    };
    multipletext: {
        root: string;
        itemTitle: string;
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
        removeFileSvg: string;
        fileDecorator: string;
        fileSignBottom: string;
        removeButtonBottom: string;
        chooseFile: string;
        noFileChosen: string;
        dragAreaPlaceholder: string;
        fileList: string;
        defaultImage: string;
    };
    signaturepad: {
        root: string;
        controls: string;
        placeholder: string;
        clearButton: string;
    };
    saveData: {
        root: string;
        saving: string;
        error: string;
        success: string;
        saveAgainButton: string;
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

export declare var defaultBootstrapCss: {
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
    };
    panel: {
        title: string;
        titleExpandable: string;
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
        item: string;
        control: string;
        itemChecked: string;
        itemIndeterminate: string;
        itemDisabled: string;
        switch: string;
        slider: string;
        sliderText: string;
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
        control: string;
        other: string;
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
        dragDropGhostPositionTop: string;
        dragDropGhostPositionBottom: string;
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
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
        panelWrapper: string;
        panelWrapperInRow: string;
        separatorV2: string;
        footer: string;
    };
    multipletext: {
        root: string;
        itemTitle: string;
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
        removeFileSvg: string;
        fileDecorator: string;
        fileSignBottom: string;
        removeButtonBottom: string;
        dragAreaPlaceholder: string;
        fileList: string;
        defaultImage: string;
    };
    signaturepad: {
        root: string;
        controls: string;
        placeholder: string;
        clearButton: string;
    };
    saveData: {
        root: string;
        saving: string;
        error: string;
        success: string;
        saveAgainButton: string;
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

export declare var defaultBootstrapMaterialCss: {
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
        number: string;
        description: string;
        descriptionUnderInput: string;
        comment: string;
        required: string;
        titleRequired: string;
        hasError: string;
        indent: number;
        formGroup: string;
    };
    panel: {
        title: string;
        titleExpandable: string;
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
        item: string;
        control: string;
        itemChecked: string;
        itemIndeterminate: string;
        itemDisabled: string;
        switch: string;
        slider: string;
        sliderText: string;
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
        control: string;
        other: string;
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
        dragDropGhostPositionTop: string;
        dragDropGhostPositionBottom: string;
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
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
        panelWrapper: string;
        panelWrapperInRow: string;
        separatorV2: string;
        footer: string;
    };
    multipletext: {
        root: string;
        itemTitle: string;
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
        removeFile: string;
        removeFileSvg: string;
        fileDecorator: string;
        fileSignBottom: string;
        removeButtonBottom: string;
        dragAreaPlaceholder: string;
        fileList: string;
        defaultImage: string;
    };
    signaturepad: {
        root: string;
        controls: string;
        placeholder: string;
        clearButton: string;
    };
    saveData: {
        root: string;
        saving: string;
        error: string;
        success: string;
        saveAgainButton: string;
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

export declare var defaultV2Css: {
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
    panel: {
        title: string;
        titleExpandable: string;
        titleOnExpand: string;
        titleOnError: string;
        description: string;
        container: string;
        content: string;
        icon: string;
        iconExpanded: string;
        footer: string;
        requiredText: string;
    };
    paneldynamic: {
        mainRoot: string;
        root: string;
        navigation: string;
        title: string;
        button: string;
        buttonRemove: string;
        buttonAdd: string;
        progressTop: string;
        progressBottom: string;
        buttonPrev: string;
        buttonNext: string;
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
        separator: string;
        separatorV2: string;
        panelWrapper: string;
        footer: string;
        footerButtonsContainer: string;
        panelWrapperInRow: string;
    };
    progress: string;
    progressBar: string;
    progressText: string;
    progressTextInBar: string;
    page: {
        root: string;
        title: string;
        description: string;
    };
    pageTitle: string;
    pageDescription: string;
    row: string;
    rowMultiple: string;
    question: {
        mainRoot: string;
        flowRoot: string;
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
        controlLabel: string;
        materialDecorator: string;
        other: string;
        column: string;
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
        controlLabel: string;
        materialDecorator: string;
        other: string;
        clearButton: string;
        column: string;
    };
    boolean: {
        mainRoot: string;
        root: string;
        item: string;
        control: string;
        itemChecked: string;
        itemIndeterminate: string;
        itemDisabled: string;
        label: string;
        switch: string;
        disabledLabel: string;
        itemDecorator: string;
        materialDecorator: string;
        sliderText: string;
        slider: string;
    };
    text: {
        root: string;
        small: string;
        controlDisabled: string;
        onError: string;
    };
    multipletext: {
        root: string;
        item: string;
        itemTitle: string;
        row: string;
        cell: string;
    };
    dropdown: {
        root: string;
        small: string;
        control: string;
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
        controlDisabled: string;
        controlLabel: string;
        materialDecorator: string;
    };
    imagepicker: {
        mainRoot: string;
        root: string;
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
        mainRoot: string;
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
    };
    matrixdropdown: {
        mainRoot: string;
        root: string;
        cell: string;
        headerCell: string;
    };
    matrixdynamic: {
        mainRoot: string;
        root: string;
        cell: string;
        headerCell: string;
        button: string;
        detailRow: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
        actionsCell: string;
        buttonAdd: string;
        buttonRemove: string;
        iconAdd: string;
        iconRemove: string;
    };
    rating: {
        root: string;
        item: string;
        itemHover: string;
        selected: string;
        minText: string;
        itemText: string;
        maxText: string;
        itemDisabled: string;
    };
    comment: {
        root: string;
        small: string;
        controlDisabled: string;
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
        fileDecorator: string;
        fileDecoratorDrag: string;
        fileInput: string;
        noFileChosen: string;
        chooseFile: string;
        disabled: string;
        removeButton: string;
        removeButtonBottom: string;
        removeFile: string;
        removeFileSvg: string;
        wrapper: string;
        defaultImage: string;
        removeFileButton: string;
        dragAreaPlaceholder: string;
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
        saving: string;
        error: string;
        success: string;
        saveAgainButton: string;
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

export declare var modernCss: {
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
    panel: {
        title: string;
        titleExpandable: string;
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
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
        separator: string;
        panelWrapper: string;
        panelWrapperInRow: string;
        separatorV2: string;
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
        controlLabel: string;
        materialDecorator: string;
        other: string;
        column: string;
    };
    ranking: {
        root: string;
        rootMobileMod: string;
        rootDragMod: string;
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
        small: string;
        item: string;
        control: string;
        itemChecked: string;
        itemIndeterminate: string;
        itemDisabled: string;
        switch: string;
        slider: string;
        sliderText: string;
        label: string;
        disabledLabel: string;
        materialDecorator: string;
        itemDecorator: string;
        checkedPath: string;
        uncheckedPath: string;
        indeterminatePath: string;
    };
    text: {
        root: string;
        small: string;
        onError: string;
    };
    multipletext: {
        root: string;
        item: string;
        itemTitle: string;
        row: string;
        cell: string;
    };
    dropdown: {
        root: string;
        small: string;
        control: string;
        selectWrapper: string;
        other: string;
        onError: string;
    };
    imagepicker: {
        root: string;
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
        dragDropGhostPositionTop: string;
        dragDropGhostPositionBottom: string;
    };
    rating: {
        root: string;
        item: string;
        selected: string;
        minText: string;
        itemText: string;
        maxText: string;
        itemDisabled: string;
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
        fileSign: string;
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
        wrapper: string;
        dragAreaPlaceholder: string;
        fileList: string;
        defaultImage: string;
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
        saving: string;
        error: string;
        success: string;
        saveAgainButton: string;
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

export declare class RendererFactory {
    static Instance: RendererFactory;
    unregisterRenderer(questionType: string, rendererAs: string): void;
    registerRenderer(questionType: string, renderAs: string, renderer: any): void;
    getRenderer(questionType: string, renderAs: string): any;
    getRendererByQuestion(question: Question): any;
    clear(): void;
}

interface IDimensions {
    scroll: number;
    offset: number;
}
export declare class ResponsivityManager {
    protected container: HTMLDivElement;
    protected minDimensionConst: number;
    getComputedStyle: (elt: Element) => CSSStyleDeclaration;
    constructor(container: HTMLDivElement, model: AdaptiveActionContainer, itemsSelector: string, dotsItemSize?: number);
    protected getDimensions(element: HTMLElement): IDimensions;
    protected getAvailableSpace(): number;
    protected calcItemSize(item: HTMLDivElement): number;
    dispose(): void;
}
export declare class VerticalResponsivityManager extends ResponsivityManager {
    constructor(container: HTMLDivElement, model: AdaptiveActionContainer, itemsSelector: string, dotsItemSize?: number);
    protected getDimensions(): IDimensions;
    protected getAvailableSpace(): number;
    protected calcItemSize(item: HTMLDivElement): number;
}
export {};

declare function compareVersions(a: any, b: any): number;
declare function confirmAction(message: string): boolean;
declare function detectIEBrowser(): boolean;
declare function detectIEOrEdge(): any;
declare function loadFileFromBase64(b64Data: string, fileName: string): void;
declare function isMobile(): boolean;
declare function isElementVisible(element: HTMLElement, threshold?: number): boolean;
declare function findScrollableParent(element: HTMLElement): HTMLElement;
declare function scrollElementByChildId(id: string): void;
declare function getIconNameFromProxy(iconName: string): string;
declare function createSvg(size: number, width: number, height: number, iconName: string, svgElem: any): void;
export declare function unwrap<T>(value: T | (() => T)): T;
export declare function getSize(value: any): any;
declare function doKey2ClickUp(evt: KeyboardEvent, options?: {
    processEsc: boolean;
}): void;
declare function doKey2ClickDown(evt: KeyboardEvent, options?: {
    processEsc: boolean;
}): void;
declare function increaseHeightByContent(element: HTMLElement, getComputedStyle?: (elt: Element) => any): void;
declare function getOriginalEvent(event: any): any;
declare function preventDefaults(event: any): void;
export { compareVersions, confirmAction, detectIEOrEdge, detectIEBrowser, loadFileFromBase64, isMobile, isElementVisible, findScrollableParent, scrollElementByChildId, createSvg, doKey2ClickUp, doKey2ClickDown, getIconNameFromProxy, increaseHeightByContent, getOriginalEvent, preventDefaults };

/**
    * Defines an individual action. Action items can be displayed in certain survey elements - in Toolbar (or action bar), in titles (of pages, panels, questions), in matrix rows (as 'expand details' or 'remove row' buttons), and etc.
    */
export interface IAction {
        /**
            * Unique string id
            */
        id: string;
        /**
            * Set this property to false to make the toolbar item invisible.
            */
        visible?: boolean;
        /**
            * Toolbar item title
            */
        title?: string;
        /**
            * Toolbar item tooltip
            */
        tooltip?: string;
        /**
            * Set this property to false to disable the toolbar item.
            */
        enabled?: boolean;
        /**
            * Set this property to false to hide the toolbar item title.
            */
        showTitle?: boolean;
        /**
            * A callback that calls on toolbar item click.
            */
        action?: (context?: any) => void;
        /**
            * Toolbar item css class
            */
        css?: string;
        /**
            * Toolbar inner element css class
            */
        innerCss?: string;
        /**
            * Toolbar item data object. Used as data for custom template or component rendering
            */
        data?: any;
        popupModel?: any;
        needSeparator?: boolean;
        /**
            * Set this property to true to activate the toolbar item (page)
            */
        active?: boolean;
        /**
            * Toolbar item template name
            */
        template?: string;
        /**
            * Toolbar item component name
            */
        component?: string;
        /**
            * Toolbar item icon name
            */
        iconName?: string;
        /**
            * Toolbar item icon size
            */
        iconSize?: number;
        /**
            * Toolbar item child items. Can be used as contianer for options
            */
        items?: any;
        /**
            * Gets or sets an action's location in a matrix question's row.
            *
            * The following options are available:
            *
            * - `start` - An action is located at the beginning of a row.
            * - `end` - An action is located at the end of a row.
            */
        location?: string;
        /**
            * Set it to true to make the tabIndex -1 to disable keyboard navigation to this item
            */
        disableTabStop?: boolean;
        /**
            * Action button display mode
            */
        mode?: "large" | "small" | "popup";
        visibleIndex?: number;
}
export declare class Action extends Base implements IAction {
        innerItem: IAction;
        updateCallback: () => void;
        constructor(innerItem: IAction);
        location?: string;
        id: string;
        iconName: string;
        iconSize: number;
        visible: boolean;
        title: string;
        tooltip: string;
        enabled: boolean;
        showTitle: boolean;
        action: (context?: any) => void;
        css: string;
        innerCss: string;
        data: any;
        popupModel: any;
        needSeparator: boolean;
        active: boolean;
        template: string;
        component: string;
        items: any;
        visibleIndex: number;
        mode: "large" | "small" | "popup";
        disableTabStop: boolean;
        get disabled(): boolean;
        get hasTitle(): boolean;
        get isVisible(): boolean;
        get canShrink(): boolean;
        getActionRootCss(): string;
        getActionBarItemCss(): string;
        getActionBarItemActiveCss(): string;
        minDimension: number;
        maxDimension: number;
}

export declare class AdaptiveActionContainer<T extends Action = Action> extends ActionContainer<T> {
    protected dotsItem: Action;
    protected dotsItemPopupModel: PopupModel;
    minVisibleItemsCount: number;
    constructor();
    protected onSet(): void;
    protected onPush(item: T): void;
    protected getRenderedActions(): Array<T>;
    fit(dimension: number, dotsItemSize: number): void;
    initResponsivityManager(container: HTMLDivElement): void;
    resetResponsivityManager(): void;
    dispose(): void;
}

export declare class ActionContainer<T extends Action = Action> extends Base {
    actions: Array<T>;
    protected getRenderedActions(): Array<T>;
    updateCallback: (isResetInitialized: boolean) => void;
    containerCss: string;
    protected raiseUpdate(isResetInitialized: boolean): void;
    protected onSet(): void;
    protected onPush(item: T): void;
    protected onRemove(item: T): void;
    get hasActions(): boolean;
    get renderedActions(): Array<T>;
    get visibleActions(): Array<T>;
    get css(): string;
    setItems(items: Array<IAction>, sortByVisibleIndex?: boolean): void;
    initResponsivityManager(container: HTMLDivElement): void;
    resetResponsivityManager(): void;
}

export declare class Survey extends SurveyElementBase<any, any> implements ISurveyCreator {
    static get cssType(): string;
    static set cssType(value: string);
    protected survey: ReactSurveyModel;
    constructor(props: any);
    protected getStateElement(): Base;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    doRender(): JSX.Element;
    protected renderElement(): JSX.Element;
    get css(): any;
    set css(value: any);
    handleTryAgainClick(event: any): void;
    protected renderCompleted(): JSX.Element;
    protected renderCompletedBefore(): JSX.Element;
    protected renderLoading(): JSX.Element;
    protected renderStartPage(): JSX.Element;
    protected renderSurvey(): JSX.Element;
    protected renderTimerPanel(location: string): JSX.Element;
    protected renderPage(page: PageModel): JSX.Element;
    protected renderProgress(isTop: boolean): JSX.Element;
    protected renderNavigation(navPosition: string): JSX.Element;
    protected renderEmptySurvey(): JSX.Element;
    protected createSurvey(newProps: any): void;
    protected updateSurvey(newProps: any, oldProps?: any): void;
    protected setSurveyEvents(): void;
    createQuestionElement(question: Question): JSX.Element;
    renderError(key: string, error: SurveyError, cssClasses: any): JSX.Element;
    questionTitleLocation(): string;
    questionErrorLocation(): string;
}
export declare function attachKey2click(element: JSX.Element, viewModel?: any, options?: {
    processEsc: boolean;
}): JSX.Element;

export declare class ReactSurveyModel extends SurveyModel {
    renderCallback: () => void;
    constructor(jsonObj?: any);
    render(): void;
    mergeCss(src: any, dest: any): void;
    doAfterRenderSurvey(el: any): void;
    protected onLoadSurveyFromService(): void;
    protected onLoadingSurveyFromService(): void;
    setCompletedState(value: string, text: string): void;
    start(): boolean;
    wrapRow(element: JSX.Element, row: QuestionRowModel): JSX.Element;
    wrapElement(element: JSX.Element, question: SurveyElement): JSX.Element;
    wrapItemValue(element: JSX.Element, question: QuestionSelectBase, item: ItemValue): JSX.Element;
    wrapMatrixCell(element: JSX.Element, cell: QuestionMatrixDropdownRenderedCell, reason?: string): JSX.Element;
}
export declare class ReactWindowModel extends SurveyWindowModel {
    constructor(jsonObj?: any, model?: ReactSurveyModel);
    protected createSurvey(jsonObj: any): SurveyModel;
    get renderCallback(): () => void;
    set renderCallback(val: () => void);
}

export declare class SurveyNavigationBase extends React.Component<any, any> {
    constructor(props: any);
    protected get survey(): SurveyModel;
    protected get css(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
}

export declare class SurveyTimerPanel extends React.Component<any, any> {
    constructor(props: any);
    protected get survey(): SurveyModel;
    update: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}

export declare class SurveyNavigation extends SurveyNavigationBase {
    constructor(props: any);
    handlePrevClick(event: any): void;
    handleNextClick(event: any): void;
    handleNextMouseDown(event: any): boolean;
    handleMouseDown(event: any): boolean;
    handleCompleteClick(event: any): void;
    handlePreviewClick(event: any): void;
    handleStartClick(event: any): void;
    render(): JSX.Element;
    protected renderButton(click: any, mouseDown: any, text: string, btnClassName: string): JSX.Element;
}

export declare class SurveyPage extends SurveyPanelBase {
    constructor(props: any);
    protected getPanelBase(): PanelModelBase;
    get page(): PageModel;
    protected renderElement(): JSX.Element;
    protected renderTitle(): JSX.Element;
    protected renderDescription(): JSX.Element;
}

export declare class SurveyRow extends SurveyElementBase<any, any> {
    constructor(props: any);
    protected getStateElement(): Base;
    protected get css(): any;
    protected canRender(): boolean;
    protected renderElementContent(): JSX.Element;
    protected renderElement(): JSX.Element;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    protected createElement(element: IElement, elementIndex?: number): JSX.Element;
}

export declare class SurveyPanel extends SurveyPanelBase {
    constructor(props: any);
    get panel(): PanelModel;
    protected renderElement(): JSX.Element;
    protected wrapElement(element: JSX.Element): JSX.Element;
    protected renderContent(style: any, rows: JSX.Element[], className: string): JSX.Element;
    protected renderTitle(): JSX.Element;
    protected renderDescription(): JSX.Element;
    protected renderBottom(): JSX.Element;
}

export declare class SurveyFlowPanel extends SurveyPanel {
    constructor(props: any);
    get flowPanel(): FlowPanelModel;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getQuestion(name: string): Question;
    protected renderQuestion(question: Question): string;
    protected renderRows(): Array<JSX.Element>;
    protected renderHtml(): JSX.Element;
    protected renderNodes(domNodes: Array<Node>): Array<JSX.Element>;
    protected renderParentNode(node: Node): JSX.Element;
    protected renderNode(node: Node): JSX.Element;
    protected renderContent(style: any, rows: JSX.Element[]): JSX.Element;
}

export interface ISurveyCreator {
    createQuestionElement(question: Question): JSX.Element;
    renderError(key: string, error: SurveyError, cssClasses: any): JSX.Element;
    questionTitleLocation(): string;
    questionErrorLocation(): string;
}
export declare class SurveyQuestion extends SurveyElementBase<any, any> {
    static renderQuestionBody(creator: ISurveyCreator, question: Question): JSX.Element;
    constructor(props: any);
    protected getStateElement(): Base;
    protected get question(): Question;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected wrapElement(element: JSX.Element): JSX.Element;
    protected renderQuestion(): JSX.Element;
    protected renderDescription(cssClasses: any, isUnderInput?: boolean): JSX.Element;
    protected renderComment(cssClasses: any): JSX.Element;
    protected renderHeader(question: Question): JSX.Element;
    protected renderErrors(cssClasses: any, location: string): JSX.Element;
}
export declare class SurveyElementErrors extends ReactSurveyElement {
    constructor(props: any);
    protected get id(): string;
    protected get element(): SurveyElement;
    protected get location(): string;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionAndErrorsCell extends ReactSurveyElement {
    [index: string]: any;
    protected cellRef: React.RefObject<HTMLTableCellElement>;
    constructor(props: any);
    protected getStateElement(): Base;
    protected get itemCss(): string;
    protected get question(): Question;
    protected get creator(): ISurveyCreator;
    protected getQuestion(): Question;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected doAfterRender(): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected getShowErrors(): boolean;
    protected getCellStyle(): any;
    protected renderQuestion(): JSX.Element;
    protected getHeaderText(): string;
    protected wrapCell(cell: QuestionMatrixDropdownRenderedCell, element: JSX.Element): JSX.Element;
}

export declare class SurveyElementBase<P, S> extends React.Component<P, S> {
    static renderLocString(locStr: LocalizableString, style?: any, key?: string): JSX.Element;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
    protected wrapElement(element: JSX.Element): JSX.Element;
    protected get isRendering(): boolean;
    protected getRenderedElement(): Base;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected get changedStatePropName(): string;
    protected getStateElements(): Array<Base>;
    protected getStateElement(): Base;
    protected get isDisplayMode(): boolean;
    protected renderLocString(locStr: LocalizableString, style?: any): JSX.Element;
    protected canUsePropInState(key: string): boolean;
}
export declare class ReactSurveyElement extends SurveyElementBase<any, any> {
    constructor(props: any);
    protected get cssClasses(): any;
}
export declare class SurveyQuestionElementBase extends SurveyElementBase<any, any> {
    control: HTMLElement;
    constructor(props: any);
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected updateDomElement(): void;
    protected get questionBase(): Question;
    protected getRenderedElement(): Base;
    protected get creator(): ISurveyCreator;
    protected canRender(): boolean;
    shouldComponentUpdate(): boolean;
    protected get isDisplayMode(): boolean;
    protected wrapCell(cell: any, element: JSX.Element, reason: string): JSX.Element;
}
export declare class SurveyQuestionUncontrolledElement<T extends Question> extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): T;
    updateValueOnEvent: (event: any) => void;
    protected setValueCore(newValue: any): void;
    protected getValueCore(): any;
    protected updateDomElement(): void;
}

export declare class SurveyQuestionComment extends SurveyQuestionUncontrolledElement<QuestionCommentModel> {
    constructor(props: any);
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionCommentItem extends ReactSurveyElement {
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionCheckbox extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionCheckboxModel;
    protected renderElement(): JSX.Element;
    protected getColumns(cssClasses: any): JSX.Element[];
    protected getItems(cssClasses: any): Array<any>;
    protected get textStyle(): any;
    protected renderItem(key: string, item: any, isFirst: boolean, cssClasses: any, index: string): JSX.Element;
}
export declare class SurveyQuestionCheckboxItem extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): Base;
    protected get question(): QuestionCheckboxModel;
    protected get item(): ItemValue;
    protected get textStyle(): any;
    protected get isFirst(): any;
    protected get index(): number;
    shouldComponentUpdate(): boolean;
    handleOnChange: (event: any) => void;
    selectAllChanged: (event: any) => void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected get inputStyle(): any;
    protected renderCheckbox(isChecked: boolean, otherItem: JSX.Element): JSX.Element;
    protected renderOther(): JSX.Element;
}

export declare class SurveyQuestionRanking extends SurveyQuestionElementBase {
    protected get question(): QuestionRankingModel;
    protected renderElement(): JSX.Element;
    protected getItems(): Array<any>;
    protected renderItem(item: ItemValue, i: number, handleKeydown: (event: any) => void, handlePointerDown: (event: PointerEvent) => void, cssClasses: any, itemClass: string, question: QuestionRankingModel): JSX.Element;
}
export declare class SurveyQuestionRankingItem extends ReactSurveyElement {
    protected get text(): string;
    protected get index(): string;
    protected get indexText(): string;
    protected get handleKeydown(): (event: any) => void;
    protected get handlePointerDown(): (event: any) => void;
    protected get cssClasses(): any;
    protected get itemClass(): string;
    protected get question(): any;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionDropdown extends SurveyQuestionUncontrolledElement<QuestionDropdownModel> {
    constructor(props: any);
    protected setValueCore(newValue: any): void;
    protected getValueCore(): any;
    protected renderElement(): JSX.Element;
    protected renderSelect(cssClasses: any): JSX.Element;
    protected renderOther(cssClasses: any): JSX.Element;
}
export declare class SurveyQuestionOptionItem extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): Base;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionMatrix extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionMatrixModel;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionMatrixRow extends ReactSurveyElement {
    constructor(props: any);
    handleOnChange(event: any): void;
    protected wrapCell(cell: any, element: JSX.Element, reason: string): JSX.Element;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    generateTds(): JSX.Element[];
    cellClick(row: any, column: any): void;
}

export declare class SurveyQuestionHtml extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionHtmlModel;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionFile extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionFileModel;
    protected renderElement(): JSX.Element;
    protected renderFileDecorator(): JSX.Element;
    protected renderClearButton(className: string): JSX.Element;
    protected renderPreview(): JSX.Element;
}

export declare class SurveyQuestionMultipleText extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionMultipleTextModel;
    protected renderElement(): JSX.Element;
    protected renderRow(rowIndex: number, items: Array<MultipleTextItemModel>, cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionRadiogroup extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionRadiogroupModel;
    protected renderElement(): JSX.Element;
    protected getColumns(cssClasses: any): JSX.Element[];
    protected getItems(cssClasses: any): Array<any>;
    protected get textStyle(): any;
}
export declare class SurveyQuestionRadioItem extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): Base;
    protected get question(): QuestionRadiogroupModel;
    protected get item(): ItemValue;
    protected get textStyle(): any;
    protected get index(): number;
    protected get isChecked(): boolean;
    shouldComponentUpdate(): boolean;
    handleOnChange(event: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected renderOther(cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionText extends SurveyQuestionUncontrolledElement<QuestionTextModel> {
    constructor(props: any);
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionBoolean extends SurveyQuestionElementBase {
    protected checkRef: React.RefObject<HTMLInputElement>;
    constructor(props: any);
    protected getStateElement(): Base;
    protected get question(): QuestionBooleanModel;
    handleOnChange(event: any): void;
    handleOnClick(event: any): void;
    handleOnSwitchClick(event: any): void;
    handleOnLabelClick(event: any, value: boolean): void;
    protected updateDomElement(): void;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionBooleanCheckbox extends SurveyQuestionBoolean {
    constructor(props: any);
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionEmpty extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionEmptyModel;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionMatrixDropdownBase extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionMatrixDropdownModelBase;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected renderElement(): JSX.Element;
    renderTableDiv(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
    renderRows(): JSX.Element;
    renderRow(keyValue: any, row: QuestionMatrixDropdownRenderedRow, cssClasses: any): JSX.Element;
    renderCell(cell: QuestionMatrixDropdownRenderedCell, index: number, cssClasses: any): JSX.Element;
}
export declare class SurveyQuestionMatrixDropdownCell extends SurveyQuestionAndErrorsCell {
    constructor(props: any);
    protected getQuestion(): Question;
    protected doAfterRender(): void;
    protected getShowErrors(): boolean;
    protected getCellStyle(): any;
    protected getHeaderText(): string;
    protected renderQuestion(): JSX.Element;
}

export declare class SurveyQuestionMatrixDropdown extends SurveyQuestionMatrixDropdownBase {
    constructor(props: any);
}

export declare class SurveyQuestionMatrixDynamic extends SurveyQuestionMatrixDropdownBase {
    constructor(props: any);
    protected get matrix(): QuestionMatrixDynamicModel;
    handleOnRowAddClick(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderAddRowButtonOnTop(cssClasses: any): JSX.Element;
    protected renderAddRowButtonOnBottom(cssClasses: any): JSX.Element;
    protected renderNoRowsContent(cssClasses: any): JSX.Element;
    protected renderAddRowButton(cssClasses: any, isEmptySection?: boolean): JSX.Element;
}

export declare class SurveyQuestionPanelDynamic extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionPanelDynamicModel;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleOnPanelAddClick(event: any): void;
    handleOnPanelPrevClick(event: any): void;
    handleOnPanelNextClick(event: any): void;
    handleOnRangeChange(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderNavigator(): JSX.Element;
    protected rendrerPrevButton(viewBox?: string, icon?: JSX.Element): JSX.Element;
    protected rendrerNextButton(viewBox?: string, icon?: JSX.Element): JSX.Element;
    protected renderRange(): JSX.Element;
    protected renderAddRowButton(): JSX.Element;
    protected renderNavigatorV2(): JSX.Element;
}
export declare class SurveyQuestionPanelDynamicItem extends SurveyPanel {
    constructor(props: any);
    protected getSurvey(): SurveyModel;
    protected getCss(): any;
    handleOnPanelRemoveClick(event: any): void;
    render(): JSX.Element;
    protected renderButton(): JSX.Element;
}

export declare class SurveyProgress extends SurveyNavigationBase {
    constructor(props: any);
    protected get isTop(): boolean;
    protected get progress(): number;
    protected get progressText(): string;
    render(): JSX.Element;
}

export declare class SurveyProgressButtons extends SurveyNavigationBase {
    constructor(props: any);
    render(): JSX.Element;
    protected getListElements(): JSX.Element[];
    protected renderListElement(page: PageModel, index: number): JSX.Element;
    protected isListElementClickable(index: number): boolean;
    protected getListElementCss(index: number): string;
    protected clickListElement(index: number): void;
    protected getScrollButtonCss(isLeftScroll: boolean): string;
    protected clickScrollButton(listContainerElement: Element, isLeftScroll: boolean): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
}

export declare class SurveyQuestionRating extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionRatingModel;
    handleOnClick(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderItem(key: string, item: ItemValue, index: number, minText: JSX.Element, maxText: JSX.Element, cssClasses: any): JSX.Element;
    protected renderOther(cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionExpression extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionExpressionModel;
    protected renderElement(): JSX.Element;
}

export declare class SurveyWindow extends Survey {
    protected window: ReactWindowModel;
    constructor(props: any);
    protected getStateElements(): Array<Base>;
    handleOnExpanded(event: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected renderWindowHeader(): JSX.Element;
    protected renderBody(): JSX.Element;
    protected createSurvey(newProps: any): void;
}

export declare class ReactQuestionFactory {
    static Instance: ReactQuestionFactory;
    registerQuestion(questionType: string, questionCreator: (name: string) => JSX.Element): void;
    getAllTypes(): Array<string>;
    createQuestion(questionType: string, params: any): JSX.Element;
}

export declare class ReactElementFactory {
    static Instance: ReactElementFactory;
    registerElement(elementType: string, elementCreator: (props: any) => JSX.Element): void;
    getAllTypes(): Array<string>;
    isElementRegistered(elementType: string): boolean;
    createElement(elementType: string, params: any): JSX.Element;
}

export declare class SurveyQuestionImagePicker extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionImagePickerModel;
    handleOnChange(event: any): void;
    protected renderElement(): JSX.Element;
    protected getItems(cssClasses: any): Array<any>;
    protected get textStyle(): any;
    protected renderItem(key: string, item: ItemValue, cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionImage extends SurveyQuestionElementBase {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected get question(): QuestionImageModel;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionSignaturePad extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionSignaturePadModel;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionButtonGroup extends SurveyQuestionElementBase {
    constructor(props: any);
    protected get question(): QuestionButtonGroupModel;
    getStateElement(): QuestionButtonGroupModel;
    render(): JSX.Element;
    renderItems(): JSX.Element[];
}
export declare class SurveyButtonGroupItem extends SurveyElementBase<any, any> {
    model: ButtonGroupItemModel;
    constructor(props: any);
    get index(): number;
    get question(): QuestionButtonGroupModel;
    get item(): ButtonGroupItemValue;
    getStateElement(): ButtonGroupItemValue;
    render(): JSX.Element;
    protected renderIcon(): JSX.Element;
    protected renderInput(): JSX.Element;
    protected renderCaption(): JSX.Element;
}

export declare class SurveyQuestionCustom extends SurveyQuestionUncontrolledElement<QuestionCustomModel> {
    constructor(props: any);
    protected getStateElements(): Array<Base>;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionComposite extends SurveyQuestionUncontrolledElement<QuestionCompositeModel> {
    constructor(props: any);
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class DefaultTitle extends React.Component<any, any> {
    protected get cssClasses(): any;
    protected get element(): Question;
    render(): JSX.Element;
    componentDidMount(): void;
}

interface IPopupProps {
    model: PopupModel;
}
export declare class Popup extends SurveyElementBase<IPopupProps, any> {
    constructor(props: IPopupProps);
    get model(): PopupModel;
    protected getStateElement(): PopupModel<any>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    shouldComponentUpdate(nextProps: IPopupProps): boolean;
    render(): JSX.Element;
}
export declare class PopupContainer extends SurveyElementBase<any, any> {
    prevIsVisible: boolean;
    constructor(props: any);
    handleKeydown: (event: any) => void;
    get model(): PopupBaseViewModel;
    protected getStateElement(): PopupBaseViewModel;
    clickInside: (ev: any) => void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    renderContainer(): JSX.Element;
    renderPointer(): JSX.Element;
    renderHeader(): JSX.Element;
    renderContent(): JSX.Element;
    renderFooter(): JSX.Element;
    render(): JSX.Element;
}
export declare function showModal(componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, cssClass?: string, title?: string): void;
export {};

interface IListProps {
    model: ListModel;
}
export declare class List extends SurveyElementBase<IListProps, any> {
    get model(): ListModel;
    handleKeydown: (event: any) => void;
    getStateElement(): ListModel;
    render(): JSX.Element;
    renderItems(): JSX.Element[];
    searchElementContent(): JSX.Element;
}
export {};

export declare class TitleActions extends React.Component<any, any> {
    protected get cssClasses(): any;
    protected get element(): SurveyElement;
    render(): JSX.Element;
}

export declare class TitleElement extends React.Component<any, any> {
    constructor(props: any);
    render(): JSX.Element;
}

interface IActionBarProps {
    model: ActionContainer<Action>;
    handleClick?: boolean;
}
export declare class SurveyActionBar extends SurveyElementBase<IActionBarProps, any> {
    constructor(props: IActionBarProps);
    get model(): ActionContainer<Action>;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected getStateElement(): Base;
    renderElement(): any;
    renderItems(): JSX.Element[];
}

interface ILogoImageProps {
    data: SurveyModel;
}
export declare class LogoImage extends React.Component<ILogoImageProps, any> {
    constructor(props: ILogoImageProps);
    render(): JSX.Element;
}
export {};

interface ISurveyHeaderProps {
    survey: SurveyModel;
}
export declare class SurveyHeader extends React.Component<ISurveyHeaderProps, any> {
    constructor(props: ISurveyHeaderProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};

export declare class SvgIcon extends React.Component<any, any> {
    constructor(props: any);
    updateSvg(): void;
    componentDidUpdate(): void;
    render(): JSX.Element;
    componentDidMount(): void;
}

export declare class SurveyQuestionMatrixDynamicRemoveButton extends ReactSurveyElement {
    constructor(props: any);
    handleOnRowRemoveClick(event: any): void;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionMatrixDetailButton extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): any;
    get item(): Action;
    handleOnShowHideClick(event: any): void;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionMatrixDynamicDragDropIcon extends ReactSurveyElement {
    onPointerDownHandler(event: any): void;
    protected renderElement(): JSX.Element;
}

interface IMAtrixRowProps {
    model: QuestionMatrixDropdownRenderedRow;
}
export declare class MatrixRow extends SurveyElementBase<IMAtrixRowProps, any> {
    constructor(props: IMAtrixRowProps);
    get model(): QuestionMatrixDropdownRenderedRow;
    protected getStateElement(): QuestionMatrixDropdownRenderedRow;
    render(): JSX.Element;
}
export {};

export declare class Skeleton extends React.Component<any, any> {
    render(): JSX.Element;
}

export declare class SurveyLocStringViewer extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
}

export declare class SurveyLocStringEditor extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onInput: (event: any) => void;
    onClick: (event: any) => void;
    render(): JSX.Element;
}

/**
    * Global survey settings
    */
export declare var settings: {
        /**
            * Options for SurveyJS comparator. By default we trim strings and compare them as case insensitive. To change the behavior you can use following code:
            * settings.comparator.trimStrings = false; //"abc " will not equal to "abc". They are equal by default.
            * settings.comparator.caseSensitive = true; //"abc " will not equal to "Abc". They are equal by default.
            */
        comparator: {
                trimStrings: boolean;
                caseSensitive: boolean;
        };
        /**
            * The prefix that uses to store the question comment, as {questionName} + {commentPrefix}.
            * The default
            */
        commentPrefix: string;
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
            * default locale name for localizable strings that uses during serialization, {"default": "My text", "de": "Mein Text"}
            */
        defaultLocaleName: string;
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
            * Set this property to change the default value of the minWidth constraint
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
            * By default checkbox and radiogroup items are ordered in rows.
            * Set it "column", and items will be ordered in columns.
            */
        showItemsInOrder: string;
        /**
            * Supported validators by question types. You can modify this variable to add validators for new question types or add/remove for existing question types.
            */
        supportedValidators: {
                question: string[];
                comment: string[];
                text: string[];
                checkbox: string[];
        };
        /**
            * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that less than this value
            */
        minDate: string;
        /**
            * Set the value as string "yyyy-mm-dd". text questions with inputType "date" will not allow to set to survey date that greater than this value
            */
        maxDate: string;
        showModal: (componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, cssClass?: string, title?: string) => void;
        supportCreatorV2: boolean;
        /**
            * Specifies a list of custom icons.
            * Use this property to replace SurveyJS default icons (displayed in UI elements of SurveyJS Library or Creator) with your custom icons.
            * For every default icon to replace, add a key/value object with the default icon's name as a key and the name of your custom icon as a value.
            * For example: Survey.settings.customIcons["icon-redo"] = "my-own-redo-icon"
            */
        customIcons: {};
        titleTags: {
                survey: string;
                page: string;
                panel: string;
                question: string;
        };
};

export interface HashTable<T> {
    [key: string]: T;
}
export declare class Helpers {
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
    static correctAfterPlusMinis(a: number, b: number, res: number): number;
    static correctAfterMultiple(a: number, b: number, res: number): number;
}

export declare class ValidatorResult {
        value: any;
        error: SurveyError;
        constructor(value: any, error?: SurveyError);
}
/**
    * Base SurveyJS validator class.
    */
export declare class SurveyValidator extends Base {
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
export declare class ValidatorRunner {
        onAsyncCompleted: (errors: Array<SurveyError>) => void;
        run(owner: IValidatorOwner): Array<SurveyError>;
}
/**
    * Validate numeric values.
    */
export declare class NumericValidator extends SurveyValidator {
        constructor(minValue?: number, maxValue?: number);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): any;
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
export declare class TextValidator extends SurveyValidator {
        constructor(minLength?: number, maxLength?: number, allowDigits?: boolean);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): any;
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
export declare class AnswerCountValidator extends SurveyValidator {
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
export declare class RegexValidator extends SurveyValidator {
        constructor(regex?: string);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        /**
            * The regex property.
            */
        get regex(): string;
        set regex(val: string);
}
/**
    * Validate e-mail address in the text input
    */
export declare class EmailValidator extends SurveyValidator {
        constructor();
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): any;
}
/**
    * Show error if expression returns false
    */
export declare class ExpressionValidator extends SurveyValidator {
        constructor(expression?: string);
        getType(): string;
        get isValidateAllValues(): boolean;
        get isAsync(): boolean;
        get isRunning(): boolean;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected generateError(res: boolean, value: any, name: string): ValidatorResult;
        protected getDefaultErrorText(name: string): any;
        protected ensureConditionRunner(): boolean;
        /**
            * The expression property.
            */
        get expression(): string;
        set expression(val: string);
}

/**
  * Array of ItemValue is used in checkox, dropdown and radiogroup choices, matrix columns and rows.
  * It has two main properties: value and text. If text is empty, value is used for displaying.
  * The text property is localizable and support markdown.
  */
export declare class ItemValue extends Base {
    protected typeName: string;
    [index: string]: any;
    static get Separator(): string;
    static set Separator(val: string);
    static createArray(locOwner: ILocalizableOwner): Array<ItemValue>;
    static setupArray(items: Array<ItemValue>, locOwner: ILocalizableOwner): void;
    static setData(items: Array<ItemValue>, values: Array<any>): void;
    static getData(items: Array<ItemValue>): any;
    static getItemByValue(items: Array<ItemValue>, val: any): ItemValue;
    static getTextOrHtmlByValue(items: Array<ItemValue>, val: any): string;
    static locStrsChanged(items: Array<ItemValue>): void;
    static runConditionsForItems(items: Array<ItemValue>, filteredItems: Array<ItemValue>, runner: ConditionRunner, values: any, properties: any, useItemExpression?: boolean): boolean;
    static runEnabledConditionsForItems(items: Array<ItemValue>, runner: ConditionRunner, values: any, properties: any, onItemCallBack?: (item: ItemValue) => boolean): boolean;
    ownerPropertyName: string;
    constructor(value: any, text?: string, typeName?: string);
    onCreating(): any;
    getType(): string;
    getSurvey(live?: boolean): ISurvey;
    getLocale(): string;
    get locText(): LocalizableString;
    setLocText(locText: LocalizableString): void;
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
    getData(): any;
    toJSON(): any;
    setData(value: any): void;
    get visibleIf(): string;
    set visibleIf(val: string);
    get enableIf(): string;
    set enableIf(val: string);
    get isVisible(): boolean;
    setIsVisible(val: boolean): void;
    get isEnabled(): any;
    setIsEnabled(val: boolean): void;
    addUsedLocales(locales: Array<string>): void;
    locStrsChanged(): void;
    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
    protected getConditionRunner(isVisible: boolean): ConditionRunner;
    originalItem: any;
}

export declare class Bindings {
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
}
export declare class Dependencies {
        currentDependency: () => void;
        target: Base;
        property: string;
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
export declare class ComputedUpdater<T = any> {
        static readonly ComputedUpdaterType = "__dependency_computed";
        constructor(_updater: () => T);
        readonly type = "__dependency_computed";
        get updater(): () => T;
        setDependencies(dependencies: Dependencies): void;
        protected getDependencies(): Dependencies;
        dispose(): any;
}
/**
    * The base class for SurveyJS objects.
    */
export declare class Base {
        static finishCollectDependencies(): Dependencies;
        static startCollectDependencies(updater: () => void, target: Base, property: string): void;
        static get commentPrefix(): string;
        static set commentPrefix(val: string);
        static createItemValue: (item: any, type?: string) => any;
        static itemValueLocStrChanged: (arr: Array<any>) => void;
        /**
            * Returns true if a value undefined, null, empty string or empty array.
            *
            * @param value
            * @param trimString a boolean parameter, default value true. If true then it trims the string and functions returns true for a string that contains white spaces only.
            */
        isValueEmpty(value: any, trimString?: boolean): boolean;
        protected trimValue(value: any): any;
        protected IsPropertyEmpty(value: any): boolean;
        protected isLoadingFromJsonValue: boolean;
        loadingOwner: Base;
        /**
            * Event that raise on property change of the sender object
            * sender - the object that owns the property
            * options.name - the property name that has been changed
            * options.oldValue - old value. Please note, it equals to options.newValue if property is an array
            * options.newValue - new value.
            */
        onPropertyChanged: EventBase<Base>;
        /**
            * Event that raised on changing property of the ItemValue object.
            * sender - the object that owns the property
            * options.propertyName - the property name to which ItemValue array is belong. It can be "choices" for dropdown question
            * options.obj - the instance of ItemValue object which property has been changed
            * options.name - the property of ItemObject that has been changed
            * options.oldValue - old value
            * options.newValue - new value
            */
        onItemValuePropertyChanged: Event<(sender: Base, options: any) => any, any>;
        getPropertyValueCoreHandler: (propertiesHash: any, name: string) => any;
        setPropertyValueCoreHandler: (propertiesHash: any, name: string, val: any) => void;
        createArrayCoreHandler: (propertiesHash: any, name: string) => Array<any>;
        surveyChangedCallback: () => void;
        constructor();
        dispose(): void;
        get isDisposed(): boolean;
        protected addEvent<T>(): EventBase<T>;
        protected onBaseCreating(): void;
        /**
            * Returns the type of the object as a string as it represents in the json. It should be in lowcase.
            */
        getType(): string;
        getSurvey(isLive?: boolean): ISurvey;
        /**
            * Returns true if the object is inluded into survey, otherwise returns false.
            */
        get inSurvey(): boolean;
        get bindings(): Bindings;
        checkBindings(valueName: string, value: any): void;
        protected updateBindings(propertyName: string, value: any): void;
        protected updateBindingValue(valueName: string, value: any): void;
        /**
            * Returns the element template name without prefix. Typically it equals to getType().
            * @see getType
            */
        getTemplate(): string;
        /**
            * Returns true if the object is loading from Json at the current moment.
            */
        get isLoadingFromJson(): boolean;
        protected getIsLoadingFromJson(): boolean;
        startLoadingFromJson(): void;
        endLoadingFromJson(): void;
        /**
            * Deserialized the current object into JSON
            * @see fromJSON
            */
        toJSON(): any;
        /**
            * Load object properties and elements. It doesn't reset properties that was changed before and they are not defined in the json parameter.
            * @param json the object JSON definition
            * @see toJSON
            */
        fromJSON(json: any): void;
        onSurveyLoad(): void;
        /**
            * Make a clone of the existing object. Create a new object of the same type and load all properties into it.
            */
        clone(): Base;
        /**
            * Returns the serializable property that belongs to this instance by property name. It returns null if the property is not exists.
            * @param propName property name
            * @returns
            */
        getPropertyByName(propName: string): JsonObjectProperty;
        isPropertyVisible(propName: string): boolean;
        static createProgressInfo(): IProgressInfo;
        getProgressInfo(): IProgressInfo;
        localeChanged(): void;
        locStrsChanged(): void;
        /**
            * Returns the property value by name
            * @param name property name
            */
        getPropertyValue(name: string, defaultValue?: any): any;
        protected getPropertyValueCore(propertiesHash: any, name: string): any;
        geValueFromHash(): any;
        protected setPropertyValueCore(propertiesHash: any, name: string, val: any): void;
        protected get isEditingSurveyElement(): boolean;
        iteratePropertiesHash(func: (hash: any, key: any) => void): void;
        /**
            * set property value
            * @param name property name
            * @param val new property value
            */
        setPropertyValue(name: string, val: any): void;
        protected setPropertyValueDirectly(name: string, val: any): void;
        protected clearPropertyValue(name: string): void;
        onPropertyValueChangedCallback(name: string, oldValue: any, newValue: any, sender: Base, arrayChanges: ArrayChanges): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected propertyValueChanged(name: string, oldValue: any, newValue: any, arrayChanges?: ArrayChanges, target?: Base): void;
        protected get isInternal(): boolean;
        /**
            * Register a function that will be called on a property value changed.
            * @param name the property name
            * @param func the function with no parameters that will be called on property changed.
            * @param key an optional parameter. If there is already a registered function for this property with the same key, it will be overwritten.
            */
        registerFunctionOnPropertyValueChanged(name: string, func: any, key?: string): void;
        /**
            * Register a function that will be called on a property value changed from the names list.
            * @param names the list of properties names
            * @param func the function with no parameters that will be called on property changed.
            * @param key an optional parameter. If there is already a registered function for this property with the same key, it will be overwritten.
            */
        registerFunctionOnPropertiesValueChanged(names: Array<string>, func: any, key?: string): void;
        /**
            * Unregister notification on property value changed
            * @param name the property name
            * @param key the key with which you have registered the notification for this property. It can be null.
            */
        unRegisterFunctionOnPropertyValueChanged(name: string, key?: string): void;
        /**
            * Unregister notification on property value changed for all properties in the names list.
            * @param names the list of properties names
            * @param key the key with which you have registered the notification for this property. It can be null.
            */
        unRegisterFunctionOnPropertiesValueChanged(names: Array<string>, key?: string): void;
        createCustomLocalizableObj(name: string): void;
        protected createLocalizableString(name: string, owner: ILocalizableOwner, useMarkDown?: boolean, hasDefaultValue?: boolean): LocalizableString;
        getLocalizableString(name: string): LocalizableString;
        getLocalizableStringText(name: string, defaultStr?: string): string;
        setLocalizableStringText(name: string, value: string): void;
        addUsedLocales(locales: Array<string>): void;
        searchText(text: string, founded: Array<IFindElement>): void;
        protected getSearchableLocKeys(keys: Array<string>): void;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        protected AddLocStringToUsedLocales(locStr: LocalizableString, locales: Array<string>): void;
        protected createItemValues(name: string): Array<any>;
        protected createNewArrayCore(name: string): Array<any>;
        protected ensureArray(name: string, onPush?: any, onRemove?: any): any[];
        protected createNewArray(name: string, onPush?: any, onRemove?: any): Array<any>;
        protected getItemValueType(): string;
        protected setArray(name: string, src: any[], dest: any[], isItemValues: boolean, onPush: any): void;
        protected isTwoValueEquals(x: any, y: any, caseInSensitive?: boolean, trimString?: boolean): boolean;
        protected copyCssClasses(dest: any, source: any): void;
}
export declare class ArrayChanges {
        index: number;
        deleteCount: number;
        itemsToAdd: any[];
        deletedItems: any[];
        constructor(index: number, deleteCount: number, itemsToAdd: any[], deletedItems: any[]);
}
export declare class Event<T extends Function, Options> {
        onCallbacksChanged: () => void;
        protected callbacks: Array<T>;
        get isEmpty(): boolean;
        fire(sender: any, options: Options): void;
        clear(): void;
        add(func: T): void;
        remove(func: T): void;
        hasFunc(func: T): boolean;
}
export declare class EventBase<T> extends Event<(sender: T, options: any) => any, any> {
}

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
    getElementTitleTagName(element: Base, tagName: string): string;
    questionTitlePattern: string;
    getUpdatedQuestionTitle(question: IQuestion, title: string): string;
    getUpdatedQuestionNo(question: IQuestion, no: string): string;
    getUpdatedElementTitleActions(element: ISurveyElement, titleActions: Array<IAction>): Array<IAction>;
    getUpdatedMatrixRowActions(question: QuestionMatrixDropdownModelBase, row: MatrixDropdownRowModelBase, actions: Array<IAction>): Array<IAction>;
    questionStartIndex: string;
    questionTitleLocation: string;
    questionDescriptionLocation: string;
    questionErrorLocation: string;
    storeOthersAsComment: boolean;
    maxTextLength: number;
    maxOthersLength: number;
    clearValueOnDisableItems: boolean;
    uploadFiles(question: IQuestion, name: string, files: File[], uploadingCallback: (status: string, data: any) => any): any;
    downloadFile(name: string, content: string, callback: (status: string, data: any) => any): any;
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
    matrixCellValidate(question: IQuestion, options: any): SurveyError;
    dynamicPanelAdded(question: IQuestion): any;
    dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): any;
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
export interface ISurveyElement {
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
    isStarted: boolean;
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

export declare class SurveyError {
    text: string;
    protected errorOwner: ISurveyErrorOwner;
    visible: boolean;
    constructor(text?: string, errorOwner?: ISurveyErrorOwner);
    get locText(): LocalizableString;
    getText(): string;
    getErrorType(): string;
    protected getDefaultText(): string;
}

/**
    * Base class of SurveyJS Elements and Survey.
    */
export declare abstract class SurveyElementCore extends Base implements ILocalizableOwner {
        constructor();
        protected createLocTitleProperty(): LocalizableString;
        /**
            * Question, Panel, Page and Survey title. If page and panel is empty then they are not rendered.
            * Question renders question name if the title is empty. Use survey questionTitleTemplate property to change the title question rendering.
            * @see SurveyModel.questionTitleTemplate
         */
        get title(): string;
        set title(val: string);
        get locTitle(): LocalizableString;
        protected getDefaultTitleValue(): string;
        /**
            * Question, Panel and Page description. It renders under element title by using smaller font. Unlike the question title, description can be empty.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see title
         */
        get description(): string;
        set description(val: string);
        get locDescription(): LocalizableString;
        get titleTagName(): string;
        protected getDefaultTitleTagName(): string;
        get hasTitle(): boolean;
        get hasTitleActions(): boolean;
        get hasTitleEvents(): boolean;
        getTitleToolbar(): AdaptiveActionContainer;
        getTitleOwner(): ITitleOwner;
        get isTitleOwner(): boolean;
        toggleState(): boolean;
        get cssClasses(): any;
        get cssTitle(): string;
        get ariaTitleId(): string;
        get titleTabIndex(): number;
        get titleAriaExpanded(): boolean;
        abstract getLocale(): string;
        abstract getMarkdownHtml(text: string, name: string): string;
        abstract getRenderer(name: string): string;
        abstract getRendererContext(locStr: LocalizableString): any;
        abstract getProcessedText(text: string): string;
}
export declare enum DragTypeOverMeEnum {
        InsideEmptyPanel = 1,
        MultilineRight = 2,
        MultilineLeft = 3
}
/**
    * Base class of SurveyJS Elements.
    */
export declare class SurveyElement extends SurveyElementCore implements ISurveyElement {
        stateChangedCallback: () => void;
        static getProgressInfoByElements(children: Array<SurveyElement>, isRequired: boolean): IProgressInfo;
        dragTypeOverMe: DragTypeOverMeEnum;
        readOnlyChangedCallback: () => void;
        static ScrollElementToTop(elementId: string): boolean;
        static GetFirstNonTextElement(elements: any, removeSpaces?: boolean): any;
        static FocusElement(elementId: string): boolean;
        static CreateDisabledDesignElements: boolean;
        disableDesignActions: boolean;
        constructor(name: string);
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected getSkeletonComponentNameCore(): string;
        get skeletonComponentName(): string;
        /**
            * Set this property to "collapsed" to render only Panel title and expanded button and to "expanded" to render the collapsed button in the Panel caption
            */
        get state(): string;
        set state(val: string);
        /**
            * Returns true if the Element is in the collapsed state
            * @see state
            * @see collapse
            * @see isExpanded
            */
        get isCollapsed(): boolean;
        /**
            * Returns true if the Element is in the expanded state
            * @see state
            * @see expand
            * @see isCollapsed
            */
        get isExpanded(): boolean;
        /**
            * Collapse the Element
            * @see state
            */
        collapse(): void;
        /**
            * Expand the Element
            * @see state
            */
        expand(): void;
        /**
            * Toggle element's state
            * @see state
            */
        toggleState(): boolean;
        get hasStateButton(): boolean;
        getTitleToolbar(): AdaptiveActionContainer;
        get titleActions(): Array<any>;
        getTitleActions(): Array<any>;
        get hasTitleActions(): boolean;
        get hasTitleEvents(): boolean;
        getTitleComponentName(): string;
        get titleTabIndex(): number;
        get titleAriaExpanded(): boolean;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        protected get surveyImpl(): ISurveyImpl;
        get data(): ISurveyData;
        /**
            * Returns the survey object.
            */
        get survey(): ISurvey;
        getSurvey(live?: boolean): ISurvey;
        protected setSurveyCore(value: ISurvey): void;
        /**
            * Returns true if the question in design mode right now.
            */
        get isDesignMode(): boolean;
        isContentElement: boolean;
        isEditableTemplateElement: boolean;
        isInteractiveDesignElement: boolean;
        protected get isInternal(): boolean;
        get areInvisibleElementsShowing(): boolean;
        get isVisible(): boolean;
        get isReadOnly(): boolean;
        /**
            * Set it to true to make an element question/panel/page readonly.
            * Please note, this property is hidden for question without input, for example html question.
            * @see enableIf
            * @see isReadOnly
            */
        get readOnly(): boolean;
        set readOnly(val: boolean);
        protected onReadOnlyChanged(): void;
        cssClassesValue: any;
        /**
            * Returns all css classes that used for rendering the question, panel or page.
            * You can use survey.onUpdateQuestionCssClasses event to override css classes for a question, survey.onUpdatePanelCssClasses event for a panel and survey.onUpdatePageCssClasses for a page.
            * @see SurveyModel.updateQuestionCssClasses
            * @see SurveyModel.updatePanelCssClasses
            * @see SurveyModel.updatePageCssClasses
            */
        get cssClasses(): any;
        protected calcCssClasses(css: any): any;
        protected updateElementCssCore(cssClasses: any): void;
        get cssError(): string;
        updateElementCss(reNew?: boolean): void;
        protected getIsLoadingFromJson(): boolean;
        /**
            * This is the identifier of a survey element - question or panel.
            * @see valueName
            */
        get name(): string;
        set name(val: string);
        protected getValidName(name: string): string;
        protected onNameChanged(oldValue: string): void;
        protected updateBindingValue(valueName: string, value: any): void;
        /**
            * The list of errors. It is created by callig hasErrors functions
            * @see hasErrors
            */
        get errors(): Array<SurveyError>;
        set errors(val: Array<SurveyError>);
        hasVisibleErrors: boolean;
        /**
            * Returns true if a question or a container (panel/page) or their chidren have an error.
            * The value can be out of date. hasErrors function should be called to get the correct value.
            */
        get containsErrors(): boolean;
        updateContainsErrors(): void;
        protected getContainsErrors(): boolean;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        get selectedElementInDesign(): SurveyElement;
        set selectedElementInDesign(val: SurveyElement);
        updateCustomWidgets(): void;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        endLoadingFromJson(): void;
        setVisibleIndex(index: number): number;
        /**
            * Returns true if it is a page.
            */
        get isPage(): boolean;
        /**
            * Returns true if it is a panel.
            */
        get isPanel(): boolean;
        /**
            * Returns true if it is a question.
            */
        get isQuestion(): boolean;
        delete(): void;
        locOwner: ILocalizableOwner;
        /**
            * Returns the current survey locale
            * @see SurveyModel.locale
            */
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
        protected getUseDisplayValuesInTitle(): boolean;
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
}

/**
    * The calculated value is a way to define the variable in Survey Creator.
    * It has two main properties: name and expression. Based on expression the value read-only property is automatically calculated.
    * The name property should be unique though all calculated values.
    * It uses survey.getVariable/seruvey.setVariable functions to get/set its value. The class do not store its value internally.
    * You may set includeIntoResult property to true to store this calculated value into survey result.
    */
export declare class CalculatedValue extends Base {
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
            * <br/>Example: "({quantity} * {price}) * (100 - {discount}) / 100"
            */
        get expression(): string;
        set expression(val: string);
        locCalculation(): void;
        unlocCalculation(): void;
        resetCalculation(): void;
        doCalculation(calculatedValues: Array<CalculatedValue>, values: HashTable<any>, properties: HashTable<any>): void;
        runExpression(values: HashTable<any>, properties: HashTable<any>): void;
        get value(): any;
        protected setValue(val: any): void;
}

export declare class AnswerRequiredError extends SurveyError {
    text: string;
    constructor(text?: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class OneAnswerRequiredError extends SurveyError {
    text: string;
    constructor(text?: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class RequreNumericError extends SurveyError {
    text: string;
    constructor(text?: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class ExceedSizeError extends SurveyError {
    constructor(maxSize: number, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    getDefaultText(): string;
}
export declare class WebRequestError extends SurveyError {
    status: string;
    response: string;
    constructor(status: string, response: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class WebRequestEmptyError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class OtherEmptyError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class UploadingFileError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class RequiredInAllRowsError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class MinRowCountError extends SurveyError {
    minRowCount: number;
    constructor(minRowCount: number, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class KeyDuplicationError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
    protected getDefaultText(): string;
}
export declare class CustomError extends SurveyError {
    text: string;
    constructor(text: string, errorOwner?: ISurveyErrorOwner);
    getErrorType(): string;
}

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
export declare class LocalizableString implements ILocalizableString {
        owner: ILocalizableOwner;
        useMarkdown: boolean;
        name?: string;
        static SerializeAsObject: boolean;
        static get defaultLocale(): string;
        static set defaultLocale(val: string);
        static defaultRenderer: string;
        static editableRenderer: string;
        localizationName: string;
        onGetTextCallback: (str: string) => string;
        onGetDefaultTextCallback: () => string;
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
        get pureText(): string;
        get hasHtml(): boolean;
        get html(): string;
        get isEmpty(): boolean;
        get textOrHtml(): string;
        get renderedHtml(): string;
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, value: string): void;
        hasNonDefaultText(): boolean;
        getLocales(): Array<string>;
        getJson(): any;
        setJson(value: any): void;
        get renderAs(): string;
        get renderAsData(): any;
        equals(obj: any): boolean;
        setFindText(text: string): boolean;
        onChanged(): void;
        protected onCreating(): void;
        getHtmlValue(): string;
}
/**
    * The class represents the list of strings that supports multi-languages.
    */
export declare class LocalizableStrings implements ILocalizableString {
        owner: ILocalizableOwner;
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
        setValue(loc: string, val: Array<string>): void;
        hasValue(loc?: string): boolean;
        get isEmpty(): boolean;
        getLocales(): Array<string>;
        getJson(): any;
        setJson(value: any): void;
}

export declare class ExpressionItem extends Base implements ILocalizableOwner {
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
}
/**
    * A class that contains expression and html propeties. It uses in survey.completedHtmlOnCondition array.
    * If the expression returns true then html of this item uses instead of survey.completedHtml property
    * @see SurveyModel.completedHtmlOnCondition
    * @see SurveyModel.completedHtml
    */
export declare class HtmlConditionItem extends ExpressionItem {
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
export declare class UrlConditionItem extends ExpressionItem {
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

/**
    * A definition for filling choices for checkbox, dropdown and radiogroup questions from resfull services.
    * The run method call a restful service and results can be get on getResultCallback.
    */
export declare class ChoicesRestful extends Base {
        static get EncodeParameters(): boolean;
        static set EncodeParameters(val: boolean);
        static clearCache(): void;
        static onBeforeSendRequest: (sender: ChoicesRestful, options: {
                request: XMLHttpRequest;
        }) => void;
        protected processedUrl: string;
        protected processedPath: string;
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
        protected parseResponse(response: any): any;
        protected sendRequest(): void;
        getType(): string;
        get isEmpty(): boolean;
        getCustomPropertiesNames(): Array<string>;
        setData(json: any): void;
        getData(): any;
        /**
            * Gets or sets a link to a web service. You can use text preprocessing here.
            * For example, the following url: _https://surveyjs.io/api/CountriesExample?region={region}_ is changed based on the _region_ question's value.
            * SurveyJS automatically gets data from the web service when the value of the _region_ question changes.
            * @see path
            * @see valueName
            * @see titleName
            * @see [Example: RESTful Dropdown](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull)
            * @see [Docs: Fill Choices from a RESTful Service](https://surveyjs.io/Documentation/Library/?id=LibraryOverview#fill-the-choices-from-a-restful-service)
            */
        get url(): string;
        set url(val: string);
        /**
            * Use this property, if a web service returns a lot of information and you need only a part of it.
            * For example, a web service returns a list of countries and a list of capitals.
            * If you need a list of countries, set a correct path from which SurveyJS obtains the data, like: _DataList1\DataList2_
            * @see url
            * @see valueName
            * @see titleName
            * @see [Example: RESTful Dropdown](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull)
            * @see [Docs: Fill Choices from a RESTful Service](https://surveyjs.io/Documentation/Library/?id=LibraryOverview#fill-the-choices-from-a-restful-service)
            */
        get path(): string;
        set path(val: string);
        /**
            * Gets or sets the name of a property (in the obtained data object) to which SurveyJS binds to provide values for choice items.
            * @see url
            * @see path
            * @see titleName
            * @see [Example: RESTful Dropdown](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull)
            * @see [Docs: Fill Choices from a RESTful Service](https://surveyjs.io/Documentation/Library/?id=LibraryOverview#fill-the-choices-from-a-restful-service)
            */
        get valueName(): string;
        set valueName(val: string);
        /**
            * Gets or sets the name of a property (in the obtained data object) to which SurveyJS binds to provide display texts for choice items.
            * @see url
            * @see path
            * @see valueeName
            * @see [Example: RESTful Dropdown](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull)
            * @see [Docs: Fill Choices from a RESTful Service](https://surveyjs.io/Documentation/Library/?id=LibraryOverview#fill-the-choices-from-a-restful-service)
            */
        get titleName(): string;
        set titleName(val: string);
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
}
/**
    * Obsolete, please use ChoicesRestful
    */
export declare class ChoicesRestfull extends ChoicesRestful {
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

export declare class FunctionFactory {
    static Instance: FunctionFactory;
    register(name: string, func: (params: any[]) => any, isAsync?: boolean): void;
    unregister(name: string): void;
    hasFunction(name: string): boolean;
    isAsyncFunction(name: string): boolean;
    clear(): void;
    getAll(): Array<string>;
    run(name: string, params: any[], properties?: HashTable<any>): any;
}
export declare var registerFunction: (name: string, func: (params: any[]) => any, isAsync?: boolean) => void;

export declare class ExpressionRunnerBase {
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
export declare class ConditionRunner extends ExpressionRunnerBase {
    onRunComplete: (result: boolean) => void;
    run(values: HashTable<any>, properties?: HashTable<any>): boolean;
    protected doOnComplete(res: any): void;
}
export declare class ExpressionRunner extends ExpressionRunnerBase {
    onRunComplete: (result: any) => void;
    run(values: HashTable<any>, properties?: HashTable<any>): any;
    protected doOnComplete(res: any): void;
}

export declare abstract class Operand {
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
export declare class BinaryOperand extends Operand {
    constructor(operatorName: string, left?: any, right?: any, isArithmeticOp?: boolean);
    getType(): string;
    get isArithmetic(): boolean;
    get isConjunction(): boolean;
    get conjunction(): string;
    get operator(): string;
    get leftOperand(): any;
    get rightOperand(): any;
    protected isContentEqual(op: Operand): boolean;
    evaluate(processValue?: ProcessValue): any;
    toString(func?: (op: Operand) => string): string;
    setVariables(variables: Array<string>): void;
    hasFunction(): boolean;
    hasAsyncFunction(): boolean;
    addToAsyncList(list: Array<FunctionOperand>): void;
}
export declare class UnaryOperand extends Operand {
    constructor(expressionValue: Operand, operatorName: string);
    get operator(): string;
    get expression(): Operand;
    getType(): string;
    toString(func?: (op: Operand) => string): string;
    protected isContentEqual(op: Operand): boolean;
    evaluate(processValue?: ProcessValue): boolean;
    setVariables(variables: Array<string>): void;
}
export declare class ArrayOperand extends Operand {
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
export declare class Const extends Operand {
    constructor(value: any);
    getType(): string;
    toString(func?: (op: Operand) => string): string;
    get correctValue(): any;
    evaluate(): any;
    setVariables(variables: Array<string>): void;
    protected getCorrectValue(value: any): any;
    protected isContentEqual(op: Operand): boolean;
}
export declare class Variable extends Const {
    static DisableConversionChar: string;
    constructor(variableName: string);
    getType(): string;
    toString(func?: (op: Operand) => string): string;
    get variable(): string;
    evaluate(processValue?: ProcessValue): any;
    setVariables(variables: Array<string>): void;
    protected getCorrectValue(value: any): any;
    protected isContentEqual(op: Operand): boolean;
}
export declare class FunctionOperand extends Operand {
    onAsyncReady: () => void;
    constructor(originalValue: string, parameters: ArrayOperand);
    getType(): string;
    evaluateAsync(processValue: ProcessValue): void;
    evaluate(processValue?: ProcessValue): any;
    toString(func?: (op: Operand) => string): string;
    setVariables(variables: Array<string>): void;
    get isReady(): boolean;
    hasFunction(): boolean;
    hasAsyncFunction(): boolean;
    addToAsyncList(list: Array<FunctionOperand>): void;
    protected isContentEqual(op: Operand): boolean;
}
export declare class OperandMaker {
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

export declare class ConditionsParserError {
    at: number;
    code: string;
    constructor(at: number, code: string);
}
export declare class ConditionsParser {
    createCondition(text: string): Operand;
    parseExpression(text: string): Operand;
    get error(): ConditionsParserError;
}

export declare class ProcessValue {
    values: HashTable<any>;
    properties: HashTable<any>;
    constructor();
    getFirstName(text: string, obj?: any): string;
    hasValue(text: string, values?: HashTable<any>): boolean;
    getValue(text: string, values?: HashTable<any>): any;
    setValue(obj: any, text: string, value: any): void;
    getValueInfo(valueInfo: any): void;
}

export interface IPropertyDecoratorOptions {
        defaultValue?: any;
        defaultSource?: string;
        localizable?: {
                name?: string;
                onGetTextCallback?: (str: string) => string;
                defaultStr?: string;
        } | boolean;
        onSet?: (val: any, target: any) => void;
}
export declare function property(options?: IPropertyDecoratorOptions): (target: any, key: string) => void;
export interface IArrayPropertyDecoratorOptions {
        onPush?: any;
        onRemove?: any;
        onSet?: (val: any, target: any) => void;
}
export declare function propertyArray(options?: IArrayPropertyDecoratorOptions): (target: any, key: string) => void;
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
export declare class JsonObjectProperty implements IObject {
        name: string;
        static getItemValuesDefaultValue: (val: any) => any;
        [key: string]: any;
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
        layout: string;
        onGetValue: (obj: any) => any;
        onSetValue: (obj: any, value: any, jsonConv: JsonObject) => any;
        visibleIf: (obj: any) => boolean;
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
        get hasToUseGetValue(): string | ((obj: any) => any);
        get defaultValue(): any;
        set defaultValue(newValue: any);
        isDefaultValue(value: any): boolean;
        getValue(obj: any): any;
        getPropertyValue(obj: any): any;
        get hasToUseSetValue(): string | ((obj: any, value: any, jsonConv: JsonObject) => any);
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
}
export declare class CustomPropertiesCollection {
        static addProperty(className: string, property: any): void;
        static removeProperty(className: string, propertyName: string): void;
        static addClass(className: string, parentClassName: string): void;
        static getProperties(className: string): Array<any>;
        static createProperties(obj: any): void;
}
export declare class JsonMetadataClass {
        name: string;
        creator: (json?: any) => any;
        parentName: string;
        static requiredSymbol: string;
        static typeSymbol: string;
        properties: Array<JsonObjectProperty>;
        constructor(name: string, properties: Array<any>, creator?: (json?: any) => any, parentName?: string);
        find(name: string): JsonObjectProperty;
        createProperty(propInfo: any): JsonObjectProperty;
}
/**
    * The metadata object. It contains object properties' runtime information and allows you to modify it.
    */
export declare class JsonMetadata {
        getObjPropertyValue(obj: any, name: string): any;
        setObjPropertyValue(obj: any, name: string, val: any): void;
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
        getChildrenClasses(name: string, canBeCreated?: boolean): Array<JsonMetadataClass>;
        getRequiredProperties(name: string): Array<string>;
        addProperties(className: string, propertiesInfos: Array<any>): void;
        addProperty(className: string, propertyInfo: any): JsonObjectProperty;
        removeProperty(className: string, propertyName: string): boolean;
        findClass(name: string): JsonMetadataClass;
        isDescendantOf(className: string, ancestorClassName: string): boolean;
        addAlterNativeClassName(name: string, alternativeName: string): void;
        generateSchema(className?: string): any;
}
export declare class JsonError {
        type: string;
        message: string;
        description: string;
        at: Number;
        constructor(type: string, message: string);
        getFullDescription(): string;
}
export declare class JsonUnknownPropertyError extends JsonError {
        propertyName: string;
        className: string;
        constructor(propertyName: string, className: string);
}
export declare class JsonMissingTypeErrorBase extends JsonError {
        baseClassName: string;
        type: string;
        message: string;
        constructor(baseClassName: string, type: string, message: string);
}
export declare class JsonMissingTypeError extends JsonMissingTypeErrorBase {
        propertyName: string;
        baseClassName: string;
        constructor(propertyName: string, baseClassName: string);
}
export declare class JsonIncorrectTypeError extends JsonMissingTypeErrorBase {
        propertyName: string;
        baseClassName: string;
        constructor(propertyName: string, baseClassName: string);
}
export declare class JsonRequiredPropertyError extends JsonError {
        propertyName: string;
        className: string;
        constructor(propertyName: string, className: string);
}
export declare class JsonObject {
        static get metaData(): JsonMetadata;
        errors: JsonError[];
        lightSerializing: boolean;
        toJsonObject(obj: any, storeDefaults?: boolean): any;
        toObject(jsonObj: any, obj: any): void;
        toObjectCore(jsonObj: any, obj: any): void;
        toJsonObjectCore(obj: any, property: JsonObjectProperty, storeDefaults?: boolean): any;
        valueToJson(obj: any, result: any, property: JsonObjectProperty, storeDefaults?: boolean): void;
        valueToObj(value: any, obj: any, property: JsonObjectProperty): void;
}
/**
    * An alias for the metadata object. It contains object properties' runtime information and allows you to modify it.
    * @see JsonMetadata
    */
export declare var Serializer: JsonMetadata;

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
        getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
        onTotalValueChanged(): any;
        getSurvey(): ISurvey;
}
export declare class MatrixDropdownCell {
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        data: IMatrixDropdownData;
        constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
        locStrsChanged(): void;
        protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
        get question(): Question;
        get value(): any;
        set value(value: any);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
}
export declare class MatrixDropdownTotalCell extends MatrixDropdownCell {
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        data: IMatrixDropdownData;
        constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
        protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
        locStrsChanged(): void;
        updateCellQuestion(): void;
        getTotalExpression(): string;
}
export declare class MatrixDropdownRowModelBase implements ISurveyData, ISurveyImpl, ILocalizableOwner {
        static RowVariableName: string;
        static OwnerVariableName: string;
        static IndexVariableName: string;
        static RowValueVariableName: string;
        protected data: IMatrixDropdownData;
        protected isSettingValue: boolean;
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
        showDetailPanel(): void;
        hideDetailPanel(destroyPanel?: boolean): void;
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
        get isEmpty(): boolean;
        getQuestionByColumn(column: MatrixDropdownColumn): Question;
        getCellByColumn(column: MatrixDropdownColumn): MatrixDropdownCell;
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
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        get rowIndex(): number;
        get editingObj(): Base;
        dispose(): void;
}
export declare class MatrixDropdownTotalRowModel extends MatrixDropdownRowModelBase {
        constructor(data: IMatrixDropdownData);
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        setValue(name: string, newValue: any): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
}
/**
    * A base class for matrix dropdown and matrix dynamic questions.
    */
export declare class QuestionMatrixDropdownModelBase extends QuestionMatrixBaseModel<MatrixDropdownRowModelBase, MatrixDropdownColumn> implements IMatrixDropdownData {
        static get defaultCellType(): string;
        static set defaultCellType(val: string);
        static addDefaultColumns(matrix: QuestionMatrixDropdownModelBase): void;
        protected isRowChanging: boolean;
        columnsChangedCallback: () => void;
        onRenderedTableResetCallback: () => void;
        onRenderedTableCreatedCallback: (table: QuestionMatrixDropdownRenderedTable) => void;
        onCellCreatedCallback: (options: any) => void;
        onCellValueChangedCallback: (options: any) => void;
        onHasDetailPanelCallback: (row: MatrixDropdownRowModelBase) => boolean;
        onCreateDetailPanelCallback: (row: MatrixDropdownRowModelBase, panel: PanelModel) => void;
        onCreateDetailPanelRenderedRowCallback: (renderedRow: QuestionMatrixDropdownRenderedRow) => void;
        protected createColumnValues(): any[];
        constructor(name: string);
        getType(): string;
        dispose(): void;
        get hasSingleInput(): boolean;
        get isRowsDynamic(): boolean;
        protected get isUpdateLocked(): boolean;
        beginUpdate(): void;
        endUpdate(): void;
        protected updateColumnsAndRows(): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        /**
            * Set columnLayout to 'vertical' to place columns vertically and rows horizontally. It makes sense when we have many columns and few rows.
            * @see columns
            * @see rowCount
            */
        get columnLayout(): string;
        set columnLayout(val: string);
        get columnsLocation(): string;
        set columnsLocation(val: string);
        /**
            * Returns true if columns are located horizontally
            * @see columnLayout
            */
        get isColumnLayoutHorizontal(): boolean;
        /**
            * Set the value to "underRow" to show the detailPanel under the row.
            */
        get detailPanelMode(): string;
        set detailPanelMode(val: string);
        /**
            * The detail template Panel. This panel is used as a template on creating detail panel for a row.
            * @see  detailElements
            * @see detailPanelMode
            */
        get detailPanel(): PanelModel;
        getPanel(): IPanel;
        /**
            * The template Panel elements, questions and panels.
            * @see  detailPanel
            * @see detailPanelMode
            */
        get detailElements(): Array<IElement>;
        protected createNewDetailPanel(): PanelModel;
        get hasRowText(): boolean;
        getFooterText(): LocalizableString;
        get canAddRow(): boolean;
        get canRemoveRows(): boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        protected onRowsChanged(): void;
        protected onStartRowAddingRemoving(): void;
        protected onEndRowAdding(): void;
        protected onEndRowRemoving(row: MatrixDropdownRowModelBase): void;
        protected clearRowsAndResetRenderedTable(): void;
        protected resetRenderedTable(): void;
        protected clearGeneratedRows(): void;
        get renderedTable(): QuestionMatrixDropdownRenderedTable;
        protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
        protected onMatrixRowCreated(row: MatrixDropdownRowModelBase): void;
        /**
            * Use this property to change the default cell type.
            */
        get cellType(): string;
        set cellType(val: string);
        /**
            * The default column count for radiogroup and checkbox  cell types.
            */
        get columnColCount(): number;
        set columnColCount(value: number);
        /**
            * Use this property to set the minimum column width.
            */
        get columnMinWidth(): string;
        set columnMinWidth(val: string);
        /**
            * Set this property to true to show the horizontal scroll.
            */
        get horizontalScroll(): boolean;
        set horizontalScroll(val: boolean);
        /**
            * The Matrix toolbar and inner panel toolbars get adaptive if the property is set to true.
            */
        get allowAdaptiveActions(): boolean;
        set allowAdaptiveActions(val: boolean);
        getRequiredText(): string;
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
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected shouldRunColumnExpression(): boolean;
        protected runCellsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected runTotalsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        locStrsChanged(): void;
        /**
            * Returns the column by it's name. Returns null if a column with this name doesn't exist.
            * @param column
            */
        getColumnByName(columnName: string): MatrixDropdownColumn;
        getColumnName(columnName: string): MatrixDropdownColumn;
        /**
            * Returns the column width.
            * @param column
            */
        getColumnWidth(column: MatrixDropdownColumn): string;
        /**
            * The default choices for dropdown, checkbox and radiogroup cell types.
            */
        get choices(): Array<any>;
        set choices(val: Array<any>);
        /**
            * The default options caption for dropdown cell type.
            */
        get optionsCaption(): string;
        set optionsCaption(val: string);
        get locOptionsCaption(): LocalizableString;
        /**
            * The duplication value error text. Set it to show the text different from the default.
            * @see MatrixDropdownColumn.isUnique
            */
        get keyDuplicationError(): string;
        set keyDuplicationError(val: string);
        get locKeyDuplicationError(): LocalizableString;
        get storeOthersAsComment(): boolean;
        addColumn(name: string, title?: string): MatrixDropdownColumn;
        protected getVisibleRows(): Array<MatrixDropdownRowModelBase>;
        get totalValue(): any;
        protected getVisibleTotalRow(): MatrixDropdownRowModelBase;
        get visibleTotalRow(): MatrixDropdownRowModelBase;
        onSurveyLoad(): void;
        /**
            * Returns the row value. If the row value is empty, the object is empty: {}.
            * @param rowIndex row index from 0 to visible row count - 1.
            */
        getRowValue(rowIndex: number): any;
        checkIfValueInRowDuplicated(checkedRow: MatrixDropdownRowModelBase, cellQuestion: Question): boolean;
        /**
            * Set the row value.
            * @param rowIndex row index from 0 to visible row count - 1.
            * @param rowValue an object {"column name": columnValue,... }
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
        }): any;
        getProgressInfo(): IProgressInfo;
        protected onBeforeValueChanged(val: any): void;
        protected setQuestionValue(newValue: any): void;
        supportGoNextPageAutomatic(): boolean;
        protected getContainsErrors(): boolean;
        protected getIsAnswered(): boolean;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        protected getIsRunningValidators(): boolean;
        getAllErrors(): Array<SurveyError>;
        protected getUniqueColumns(): Array<MatrixDropdownColumn>;
        protected getFirstInputElementId(): string;
        protected getFirstErrorInputElementId(): string;
        protected getFirstCellQuestion(onError: boolean): Question;
        protected onReadOnlyChanged(): void;
        createQuestion(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
        protected createQuestionCore(row: MatrixDropdownRowModelBase, column: MatrixDropdownColumn): Question;
        protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
        onAnyValueChanged(name: string): void;
        protected isObject(value: any): boolean;
        protected onCellValueChanged(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): void;
        validateCell(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): SurveyError;
        get isValidateOnValueChanging(): boolean;
        onRowChanging(row: MatrixDropdownRowModelBase, columnName: string, rowValue: any): any;
        onRowChanged(row: MatrixDropdownRowModelBase, columnName: string, newRowValue: any, isDeletingValue: boolean): void;
        getRowIndex(row: MatrixDropdownRowModelBase): number;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        hasDetailPanel(row: MatrixDropdownRowModelBase): boolean;
        getIsDetailPanelShowing(row: MatrixDropdownRowModelBase): boolean;
        setIsDetailPanelShowing(row: MatrixDropdownRowModelBase, val: boolean): void;
        getDetailPanelButtonCss(row: MatrixDropdownRowModelBase): string;
        getDetailPanelIconCss(row: MatrixDropdownRowModelBase): string;
        createRowDetailPanel(row: MatrixDropdownRowModelBase): PanelModel;
        getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
        onTotalValueChanged(): any;
        getQuestionFromArray(name: string, index: number): IQuestion;
        getCellTemplateData(cell: QuestionMatrixDropdownRenderedCell): any;
        getCellWrapperComponentName(cell: MatrixDropdownCell): string;
        getCellWrapperComponentData(cell: MatrixDropdownCell): any;
        getColumnHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
        getColumnHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
        getRowHeaderWrapperComponentName(cell: MatrixDropdownCell): string;
        getRowHeaderWrapperComponentData(cell: MatrixDropdownCell): any;
}

export interface IMatrixColumnOwner extends ILocalizableOwner {
    getRequiredText(): string;
    onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
    onColumnItemValuePropertyChanged(column: MatrixDropdownColumn, propertyName: string, obj: ItemValue, name: string, newValue: any, oldValue: any): void;
    onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
    getCellType(): string;
    getCustomCellType(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, cellType: string): string;
    onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
}
export declare var matrixDropdownColumnTypes: {
    dropdown: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    checkbox: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    radiogroup: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    text: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    comment: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    boolean: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    expression: {
        properties: string[];
        onCellQuestionUpdate: (cellQuestion: any, column: any, question: any, data: any) => void;
    };
    rating: {
        properties: string[];
    };
};
export declare class MatrixDropdownColumn extends Base implements ILocalizableOwner, IWrapperObject {
    static getColumnTypes(): Array<string>;
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
    updateCellQuestion(cellQuestion: Question, data: any, onUpdateJson?: (json: any) => any): void;
    defaultCellTypeChanged(): void;
    protected calcCellQuestionType(row: MatrixDropdownRowModelBase): string;
    protected updateTemplateQuestion(): void;
    protected createNewQuestion(cellType: string): Question;
    protected setQuestionProperties(question: Question, onUpdateJson?: (json: any) => any): void;
    protected propertyValueChanged(name: string, oldValue: any, newValue: any): void;
}

export declare class QuestionMatrixDropdownRenderedCell {
    minWidth: string;
    width: string;
    locTitle: LocalizableString;
    cell: MatrixDropdownCell;
    column: MatrixDropdownColumn;
    row: MatrixDropdownRowModelBase;
    question: Question;
    isRemoveRow: boolean;
    choiceIndex: number;
    matrix: QuestionMatrixDropdownModelBase;
    requiredText: string;
    isEmpty: boolean;
    colSpans: number;
    panel: PanelModel;
    isShowHideDetail: boolean;
    isActionsCell: boolean;
    isDragHandlerCell: boolean;
    constructor();
    get hasQuestion(): boolean;
    get hasTitle(): boolean;
    get hasPanel(): boolean;
    get id(): number;
    get showErrorOnTop(): boolean;
    get showErrorOnBottom(): boolean;
    get item(): ItemValue;
    set item(val: ItemValue);
    get isChoice(): boolean;
    get choiceValue(): any;
    get isCheckbox(): boolean;
    get isFirstChoice(): boolean;
    set className(val: string);
    get className(): string;
    get headers(): string;
    calculateFinalClassName(matrixCssClasses: any): string;
}
export declare class QuestionMatrixDropdownRenderedRow extends Base {
    cssClasses: any;
    isDetailRow: boolean;
    ghostPosition: string;
    isAdditionalClasses: boolean;
    row: MatrixDropdownRowModelBase;
    cells: Array<QuestionMatrixDropdownRenderedCell>;
    constructor(cssClasses: any, isDetailRow?: boolean);
    onCreating(): void;
    get id(): number;
    get attributes(): {
        "data-sv-drop-target-matrix-row"?: undefined;
    } | {
        "data-sv-drop-target-matrix-row": string;
    };
    get className(): string;
}
export declare class QuestionMatrixDropdownRenderedTable extends Base {
    matrix: QuestionMatrixDropdownModelBase;
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
    get rows(): Array<QuestionMatrixDropdownRenderedRow>;
    protected build(): void;
    updateShowTableAndAddRow(): void;
    onAddedRow(): void;
    onRemovedRow(row: MatrixDropdownRowModelBase): void;
    onDetailPanelChangeVisibility(row: MatrixDropdownRowModelBase, isShowing: boolean): void;
    protected buildRowsActions(): void;
    protected buildHeader(): void;
    protected buildFooter(): void;
    protected buildRows(): void;
    protected setDefaultRowActions(row: MatrixDropdownRowModelBase, actions: Array<IAction>): void;
}

export declare class MatrixDropdownRowModel extends MatrixDropdownRowModelBase {
        name: string;
        constructor(name: string, item: ItemValue, data: IMatrixDropdownData, value: any);
        get rowName(): string;
        get text(): string;
        get locText(): LocalizableString;
}
/**
    * A Model for a matrix dropdown question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
    */
export declare class QuestionMatrixDropdownModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        constructor(name: string);
        getType(): string;
        /**
            * Set this property to show it on the first column for the total row.
            */
        get totalText(): string;
        set totalText(val: string);
        get locTotalText(): LocalizableString;
        getFooterText(): LocalizableString;
        /**
            * The column width for the first column, row title column.
            */
        get rowTitleWidth(): string;
        set rowTitleWidth(val: string);
        getRowTitleWidth(): string;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        clearIncorrectValues(): void;
        clearValueIfInvisible(): void;
        protected generateRows(): Array<MatrixDropdownRowModel>;
        protected createMatrixRow(item: ItemValue, value: any): MatrixDropdownRowModel;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
}

export declare class MatrixDynamicRowModel extends MatrixDropdownRowModelBase {
        index: number;
        constructor(index: number, data: IMatrixDropdownData, value: any);
        get rowName(): string;
}
/**
    * A Model for a matrix dymanic question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
    * An end-user may dynamically add/remove rows, unlike in matrix dropdown question.
    */
export declare class QuestionMatrixDynamicModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        onGetValueForNewRowCallBack: (sender: QuestionMatrixDynamicModel) => any;
        constructor(name: string);
        dragDropMatrixRows: DragDropMatrixRows;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        startDragMatrixRow(event: PointerEvent, row: MatrixDropdownRowModelBase): void;
        getType(): string;
        get isRowsDynamic(): boolean;
        /**
            * Set it to true, to show a confirmation dialog on removing a row
            * @see ConfirmDeleteText
            */
        get confirmDelete(): boolean;
        set confirmDelete(val: boolean);
        /**
            * Set it to a column name and the library shows duplication error, if there are same values in different rows in the column.
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
            * Set it to true to copy the value into new added row from the last row. If defaultRowValue is set and this property equals to true,
            * then the value for new added row is merging.
            * @see defaultValue
            * @see defaultRowValue
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
        /**
            * Set this property to true, to allow rows drag and drop.
            */
        get allowRowsDragAndDrop(): boolean;
        set allowRowsDragAndDrop(val: boolean);
        protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
        /**
            * The minimum row count. A user could not delete a row if the rowCount equals to minRowCount
            * @see rowCount
            * @see maxRowCount
            * @see allowAddRows
            */
        get minRowCount(): number;
        set minRowCount(val: number);
        /**
            * The maximum row count. A user could not add a row if the rowCount equals to maxRowCount
            * @see rowCount
            * @see minRowCount
            * @see allowAddRows
            */
        get maxRowCount(): number;
        set maxRowCount(val: number);
        /**
            * Set this property to false to disable ability to add new rows. "Add new Row" button becomes invsible in UI
            * @see canAddRow
            * @see allowRemoveRows
            */
        get allowAddRows(): boolean;
        set allowAddRows(val: boolean);
        /**
            * Set this property to false to disable ability to remove rows. "Remove" row buttons become invsible in UI
            * @see canRemoveRows
            * @see allowAddRows
            */
        get allowRemoveRows(): boolean;
        set allowRemoveRows(val: boolean);
        /**
            * Returns true, if a new row can be added.
            * @see allowAddRows
            * @see maxRowCount
            * @see canRemoveRows
            * @see rowCount
            */
        get canAddRow(): boolean;
        canRemoveRowsCallback: (allow: boolean) => boolean;
        /**
            * Returns true, if row can be removed.
            * @see minRowCount
            * @see canAddRow
            * @see rowCount
            */
        get canRemoveRows(): boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        /**
            * Creates and add a new row and focus the cell in the first column.
            */
        addRowUI(): void;
        /**
            * Creates and add a new row.
            */
        addRow(): void;
        /**
            * Set this property to true to show detail panel immediately on adding a new row.
            * @see detailPanelMode
            */
        get detailPanelShowOnAdding(): boolean;
        set detailPanelShowOnAdding(val: boolean);
        protected hasRowsAsItems(): boolean;
        unbindValue(): void;
        protected isValueSurveyElement(val: any): boolean;
        /**
            * Removes a row by it's index. If confirmDelete is true, show a confirmation dialog
            * @param index a row index, from 0 to rowCount - 1
            * @see removeRow
            * @see confirmDelete
            */
        removeRowUI(value: any): void;
        isRequireConfirmOnRowDelete(index: number): boolean;
        /**
            * Removes a row by it's index.
            * @param index a row index, from 0 to rowCount - 1
            */
        removeRow(index: number): void;
        /**
            * Use this property to change the default text showing in the confirmation delete dialog on removing a row.
            */
        get confirmDeleteText(): string;
        set confirmDeleteText(val: string);
        get locConfirmDeleteText(): LocalizableString;
        /**
            * Use this property to change the default value of add row button text.
            */
        get addRowText(): string;
        set addRowText(val: string);
        get locAddRowText(): LocalizableString;
        /**
            * By default the 'Add Row' button is shown on bottom if columnLayout is horizontal and on top if columnLayout is vertical. <br/>
            * You may set it to "top", "bottom" or "topBottom" (to show on top and bottom).
            * @see columnLayout
            */
        get addRowLocation(): string;
        set addRowLocation(val: string);
        getAddRowLocation(): string;
        /**
            * Set this property to true to hide matrix columns when there is no any row.
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
            * Use this property to change the default value of remove row button text.
            */
        get emptyRowsText(): string;
        set emptyRowsText(val: string);
        get locEmptyRowsText(): LocalizableString;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        supportGoNextPageAutomatic(): boolean;
        get hasRowText(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected getUniqueColumns(): Array<MatrixDropdownColumn>;
        protected generateRows(): Array<MatrixDynamicRowModel>;
        protected createMatrixRow(value: any): MatrixDynamicRowModel;
        protected onBeforeValueChanged(val: any): void;
        protected createNewValue(): any;
        protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
        protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
        getAddRowButtonCss(isEmptySection?: boolean): string;
        getRemoveRowButtonCss(): string;
}

export interface IMatrixData {
        onMatrixRowChanged(row: MatrixRowModel): void;
        getCorrectedRowValue(value: any): any;
}
export declare class MatrixRowModel extends Base {
        fullName: string;
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
export declare class MatrixCells {
        cellsOwner: IMatrixCellsOwner;
        constructor(cellsOwner: IMatrixCellsOwner);
        get isEmpty(): boolean;
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
        getJson(): any;
        setJson(value: any): void;
        protected createString(): LocalizableString;
}
/**
    * A Model for a simple matrix question.
    */
export declare class QuestionMatrixModel extends QuestionMatrixBaseModel<MatrixRowModel, ItemValue> implements IMatrixData, IMatrixCellsOwner {
        constructor(name: string);
        getType(): string;
        get hasSingleInput(): boolean;
        /**
            * Set this property to true, if you want a user to answer all rows.
            */
        get isAllRowRequired(): boolean;
        set isAllRowRequired(val: boolean);
        /**
            * Returns true, if there is at least one row.
            */
        get hasRows(): boolean;
        /**
            * Use this property to render items in a specific order: "random" or "initial". Default is "initial".
            */
        get rowsOrder(): string;
        set rowsOrder(val: string);
        /**
            * Set this property to true to hide the question if there is no visible rows in the matrix.
            */
        get hideIfRowsEmpty(): boolean;
        set hideIfRowsEmpty(val: boolean);
        getRows(): Array<any>;
        getColumns(): Array<any>;
        addColumn(value: any, text?: string): ItemValue;
        getItemClass(row: any, column: any): string;
        protected getQuizQuestionCount(): number;
        protected getCorrectAnswerCount(): number;
        protected getVisibleRows(): Array<MatrixRowModel>;
        protected sortVisibleRows(array: Array<MatrixRowModel>): Array<MatrixRowModel>;
        endLoadingFromJson(): void;
        protected processRowsOnSet(newRows: Array<any>): MatrixRowModel[];
        /**
            * Returns the list of visible rows as model objects.
            * @see rowsVisibleIf
            */
        get visibleRows(): Array<MatrixRowModel>;
        get cells(): MatrixCells;
        set cells(value: MatrixCells);
        get hasCellText(): boolean;
        setCellText(row: any, column: any, val: string): void;
        getCellText(row: any, column: any): string;
        setDefaultCellText(column: any, val: string): void;
        getDefaultCellText(column: any): string;
        getCellDisplayText(row: any, column: any): string;
        getCellDisplayLocText(row: any, column: any): LocalizableString;
        supportGoNextPageAutomatic(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected getIsAnswered(): boolean;
        protected onMatrixRowCreated(row: MatrixRowModel): void;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        getPlainData(options?: {
                includeEmpty?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        clearValueIfInvisible(): void;
        protected getFirstInputElementId(): string;
        protected onRowsChanged(): void;
        onMatrixRowChanged(row: MatrixRowModel): void;
        getCorrectedRowValue(value: any): any;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        getColumnHeaderWrapperComponentName(cell: ItemValue): string;
        getColumnHeaderWrapperComponentData(cell: ItemValue): any;
        getRowHeaderWrapperComponentName(cell: ItemValue): string;
        getRowHeaderWrapperComponentData(cell: ItemValue): any;
}

export interface IMultipleTextData extends ILocalizableOwner, IPanel {
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getAllValues(): any;
        getMultipleTextValue(name: string): any;
        setMultipleTextValue(name: string, value: any): any;
        getItemDefaultValue(name: string): any;
        getIsRequiredText(): string;
}
export declare class MultipleTextItemModel extends Base implements IValidatorOwner, ISurveyData, ISurveyImpl {
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
        /**
            * Returns the text or html for rendering the title.
            */
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
        getValidatorTitle(): string;
        get validatedValue(): any;
        set validatedValue(val: any);
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
}
/**
    * A Model for a multiple text question.
    */
export declare class QuestionMultipleTextModel extends Question implements IMultipleTextData, IPanel {
        static addDefaultItems(question: QuestionMultipleTextModel): void;
        colCountChangedCallback: () => void;
        constructor(name: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        get isAllowTitleLeft(): boolean;
        get hasSingleInput(): boolean;
        onSurveyLoad(): void;
        setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        /**
            * The list of input items.
            */
        get items(): Array<MultipleTextItemModel>;
        set items(val: Array<MultipleTextItemModel>);
        /**
            * Add a new text item.
            * @param name a item name
            * @param title a item title (optional)
            */
        addItem(name: string, title?: string): MultipleTextItemModel;
        getItemByName(name: string): MultipleTextItemModel;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        locStrsChanged(): void;
        supportGoNextPageAutomatic(): boolean;
        /**
            * The number of columns. Items are rendred in one line if the value is 0.
            */
        get colCount(): number;
        set colCount(val: number);
        /**
            * The default text input size.
            */
        get itemSize(): number;
        set itemSize(val: number);
        /**
            * Returns the list of rendered rows.
            */
        getRows(): Array<any>;
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
        getItemCss(): string;
        getItemTitleCss(): string;
}

export declare class DragDropInfo {
        source: IElement;
        target: IElement;
        nestedPanelDepth: number;
        constructor(source: IElement, target: IElement, nestedPanelDepth?: number);
        destination: ISurveyElement;
        isBottom: boolean;
        isEdge: boolean;
}
export declare class QuestionRowModel extends Base {
        panel: PanelModelBase;
        protected _scrollableParent: any;
        protected _updateVisibility: any;
        startLazyRendering(rowContainerDiv: HTMLElement, findScrollableContainer?: typeof findScrollableParent): void;
        ensureVisibility(): void;
        stopLazyRendering(): void;
        constructor(panel: PanelModelBase);
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
        setElementMaxMinWidth(el: IElement): void;
        dispose(): void;
        getRowCss(): string;
}
/**
    * A base class for a Panel and Page objects.
    */
export declare class PanelModelBase extends SurveyElement implements IPanel, IConditionRunner, ISurveyErrorOwner, ITitleOwner {
        addElementCallback: (element: IElement) => void;
        removeElementCallback: (element: IElement) => void;
        onGetQuestionTitleLocation: () => string;
        constructor(name?: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        endLoadingFromJson(): void;
        get hasTitle(): boolean;
        protected canShowTitle(): boolean;
        get _showDescription(): boolean;
        localeChanged(): void;
        locStrsChanged(): void;
        /**
            * Returns the char/string for a required panel.
            * @see SurveyModel.requiredText
            */
        get requiredText(): string;
        protected get titlePattern(): string;
        get isRequireTextOnStart(): boolean;
        get isRequireTextBeforeTitle(): boolean;
        get isRequireTextAfterTitle(): boolean;
        /**
            * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
            */
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        /**
            * Use this property to randomize questions. Set it to 'random' to randomize questions, 'initial' to keep them in the same order or 'default' to use the Survey questionsOrder property
            * @see SurveyModel.questionsOrder
            * @see areQuestionsRandomized
            */
        get questionsOrder(): string;
        set questionsOrder(val: string);
        protected isRandomizing: boolean;
        randomizeElements(isRandom: boolean): void;
        /**
            * A parent element. It is always null for the Page object and always not null for the Panel object. Panel object may contain Questions and other Panels.
            */
        get parent(): PanelModelBase;
        set parent(val: PanelModelBase);
        get depth(): number;
        /**
            * An expression that returns true or false. If it returns true the Panel becomes visible and if it returns false the Panel becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
            * @see visible
            */
        get visibleIf(): string;
        set visibleIf(val: string);
        protected calcCssClasses(css: any): any;
        /**
            * A unique element identificator. It is generated automatically.
            */
        get id(): string;
        set id(val: string);
        /**
            * Returns true if the current object is Panel. Returns false if the current object is Page (a root Panel).
            */
        get isPanel(): boolean;
        getPanel(): IPanel;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Returns the list of all questions located in the Panel/Page, including in the nested Panels.
            * @see Question
            * @see elements
            */
        get questions(): Array<Question>;
        protected getValidName(name: string): string;
        /**
            * Returns the question by its name
            * @param name the question name
            */
        getQuestionByName(name: string): Question;
        /**
            * Returns the element by its name. It works recursively.
            * @param name the element name
            */
        getElementByName(name: string): IElement;
        getQuestionByValueName(valueName: string): Question;
        /**
            * Returns question values on the current page
            */
        getValue(): any;
        /**
            * Return questions values as a JSON object with display text. For example, for dropdown, it would return the item text instead of item value.
            * @param keysAsText Set this value to true, to return key (in matrices questions) as display text as well.
            */
        getDisplayValue(keysAsText: boolean): any;
        /**
            * Returns question comments on the current page
            */
        getComments(): any;
        /**
            * Call this function to remove all question values from the current page/panel, that end-user will not be able to enter.
            * For example the value that doesn't exists in a radigroup/dropdown/checkbox choices or matrix rows/columns.
            * Please note, this function doesn't clear values for invisible questions or values that doesn't associated with questions.
            * @see Question.clearIncorrectValues
            */
        clearIncorrectValues(): void;
        /**
            * Call this function to clear all errors in the panel / page and all its child elements (panels and questions)
            */
        clearErrors(): void;
        /**
            * Returns the list of the elements in the object, Panel/Page. Elements can be questions or panels. The function doesn't return elements in the nested Panels.
            */
        get elements(): Array<IElement>;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        /**
            * Returns true if the current element belongs to the Panel/Page. It looks in nested Panels as well.
            * @param element
            * @see PanelModel
            */
        containsElement(element: IElement): boolean;
        /**
            * Set this property to true, to require the answer at least in one question in the panel.
            */
        get isRequired(): boolean;
        set isRequired(val: boolean);
        /**
            * An expression that returns true or false. If it returns true the Panel/Page becomes required.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
            * @see isRequired
            */
        get requiredIf(): string;
        set requiredIf(val: string);
        searchText(text: string, founded: Array<IFindElement>): void;
        /**
            * Returns true, if there is an error on this Page or inside the current Panel
            * @param fireCallback set it to true, to show errors in UI
            * @param focusOnFirstError set it to true to focus on the first question that doesn't pass the validation
            */
        hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, rec?: any): boolean;
        getErrorCustomText(text: string, error: SurveyError): string;
        protected hasErrorsCore(rec: any): void;
        protected getContainsErrors(): boolean;
        updateElementVisibility(): void;
        getFirstQuestionToFocus(withError?: boolean): Question;
        /**
            * Call it to focus the input on the first question
            */
        focusFirstQuestion(): void;
        /**
            * Call it to focus the input of the first question that has an error.
            */
        focusFirstErrorQuestion(): void;
        /**
            * Fill list array with the questions.
            * @param list
            * @param visibleOnly set it to true to get visible questions only
            */
        addQuestionsToList(list: Array<IQuestion>, visibleOnly?: boolean, includingDesignTime?: boolean): void;
        /**
            * Fill list array with the panels.
            * @param list
            */
        addPanelsIntoList(list: Array<IPanel>, visibleOnly?: boolean, includingDesignTime?: boolean): void;
        /**
            * Returns true if the current object is Page and it is the current page.
            */
        get isActive(): boolean;
        updateCustomWidgets(): void;
        /**
            * Set this property different from "default" to set the specific question title location for this panel/page.
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
        get rows(): Array<QuestionRowModel>;
        ensureRowsVisibility(): void;
        protected onRowsChanged(): void;
        protected onAddElement(element: IElement, index: number): void;
        protected onRemoveElement(element: IElement): void;
        protected canRenderFirstRows(): boolean;
        protected updateRowsRemoveElementFromRow(element: IElement, row: QuestionRowModel): void;
        elementWidthChanged(el: IElement): void;
        /**
            * Returns rendered title text or html.
            */
        get processedTitle(): string;
        protected getRenderedTitle(str: string): string;
        /**
            * Use it to get/set the object visibility.
            * @see visibleIf
            */
        get visible(): boolean;
        set visible(value: boolean);
        protected onVisibleChanged(): void;
        /**
            * Returns true if object is visible or survey is in design mode right now.
            */
        get isVisible(): boolean;
        getIsPageVisible(exceptionQuestion: IQuestion): boolean;
        setVisibleIndex(index: number): number;
        protected beforeSetVisibleIndex(index: number): number;
        protected getPanelStartIndex(index: number): number;
        protected isContinueNumbering(): boolean;
        /**
            * Returns true if readOnly property is true or survey is in display mode or parent panel/page is readOnly.
            * @see SurveyModel.model
            * @see readOnly
            */
        get isReadOnly(): boolean;
        protected onReadOnlyChanged(): void;
        updateElementCss(reNew?: boolean): void;
        /**
            * An expression that returns true or false. If it returns false the Panel/Page becomes read only and an end-user will not able to answer on qustions inside it.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
            * @see readOnly
            * @see isReadOnly
            */
        get enableIf(): string;
        set enableIf(val: string);
        /**
            * Add an element into Panel or Page. Returns true if the element added successfully. Otherwise returns false.
            * @param element
            * @param index element index in the elements array
            */
        addElement(element: IElement, index?: number): boolean;
        insertElementAfter(element: IElement, after: IElement): void;
        insertElementBefore(element: IElement, before: IElement): void;
        protected canAddElement(element: IElement): boolean;
        /**
            * Add a question into Panel or Page. Returns true if the question added successfully. Otherwise returns false.
            * @param question
            * @param index element index in the elements array
            */
        addQuestion(question: Question, index?: number): boolean;
        /**
            * Add a panel into Panel or Page.  Returns true if the panel added successfully. Otherwise returns false.
            * @param panel
            * @param index element index in the elements array
            */
        addPanel(panel: PanelModel, index?: number): boolean;
        /**
            * Creates a new question and adds it at location of index, by default the end of the elements list. Returns null, if the question could not be created or could not be added into page or panel.
            * @param questionType the possible values are: "text", "checkbox", "dropdown", "matrix", "html", "matrixdynamic", "matrixdropdown" and so on.
            * @param name a question name
            * @param index element index in the elements array
            */
        addNewQuestion(questionType: string, name?: string, index?: number): Question;
        /**
            * Creates a new panel and adds it into the end of the elements list. Returns null, if the panel could not be created or could not be added into page or panel.
            * @param name a panel name
            */
        addNewPanel(name?: string): PanelModel;
        /**
            * Returns the index of element parameter in the elements list.
            * @param element question or panel
            */
        indexOf(element: IElement): number;
        protected createNewPanel(name: string): PanelModel;
        /**
            * Remove an element (Panel or Question) from the elements list.
            * @param element
            * @see elements
            */
        removeElement(element: IElement): boolean;
        /**
            * Remove question  from the elements list.
            * @param question
            * @see elements
            * @see removeElement
            */
        removeQuestion(question: Question): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        onAnyValueChanged(name: string): void;
        checkBindings(valueName: string, value: any): void;
        protected dragDropAddTarget(dragDropInfo: DragDropInfo): void;
        dragDropFindRow(findElement: ISurveyElement): QuestionRowModel;
        dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
        needResponsiveWidth(): boolean;
        get no(): string;
        dispose(): void;
}
/**
    * A container element, similar to the Page objects. However, unlike the Page, Panel can't be a root.
    * It may contain questions and other panels.
    */
export declare class PanelModel extends PanelModelBase implements IElement {
        minWidth?: string;
        maxWidth?: string;
        constructor(name?: string);
        getType(): string;
        get contentId(): string;
        getSurvey(live?: boolean): ISurvey;
        onSurveyLoad(): void;
        protected onSetData(): void;
        get isPanel(): boolean;
        /**
            * Get/set the page where the panel is located.
            */
        get page(): IPage;
        set page(val: IPage);
        delete(): void;
        /**
            * Move panel to a new container Page/Panel. Add as a last element if insertBefore parameter is not used or inserted into the given index,
            * if insert parameter is number, or before the given element, if the insertBefore parameter is a question or panel
            * @param container Page or Panel to where a question is relocated.
            * @param insertBefore Use it if you want to set the panel to a specific position. You may use a number (use 0 to insert int the beginning) or element, if you want to insert before this element.
            */
        moveTo(container: IPanel, insertBefore?: any): boolean;
        /**
            * Returns the visible index of the panel in the survey. Commonly it is -1 and it doesn't show.
            * You have to set showNumber to true to show index/numbering for the Panel
            * @see showNumber
            */
        get visibleIndex(): number;
        getTitleOwner(): ITitleOwner;
        /**
            * Set showNumber to true to start showing the number for this panel.
            * @see visibleIndex
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
            * Gets or sets the first question index for elements inside the panel. The first question index is '1.' by default and it is taken from survey.questionStartIndex property.
            * You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
            * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
            * @see survey.questionStartIndex
            */
        get questionStartIndex(): string;
        set questionStartIndex(val: string);
        getQuestionStartIndex(): string;
        /**
            * The property returns the question number. If question is invisible then it returns empty string.
            * If visibleIndex is 1, then no is 2, or 'B' if survey.questionStartIndex is 'A'.
            * @see SurveyModel.questionStartIndex
            */
        get no(): string;
        protected setNo(visibleIndex: number): void;
        protected beforeSetVisibleIndex(index: number): number;
        protected getPanelStartIndex(index: number): number;
        protected isContinueNumbering(): boolean;
        protected hasErrorsCore(rec: any): void;
        protected getRenderedTitle(str: string): string;
        /**
            * The Panel width.
            */
        get width(): string;
        set width(val: string);
        /**
            * The left indent. Set this property to increase the panel left indent.
            */
        get indent(): number;
        set indent(val: number);
        /**
            * The inner indent. Set this property to increase the panel content margin.
            */
        get innerIndent(): number;
        set innerIndent(val: number);
        get renderWidth(): string;
        set renderWidth(val: string);
        /**
            * The Panel renders on the new line if the property is true. If the property is false, the panel tries to render on the same line/row with a previous question/panel.
            */
        get startWithNewLine(): boolean;
        set startWithNewLine(value: boolean);
        /**
            * The right indent of the Panel.
            */
        get rightIndent(): number;
        set rightIndent(val: number);
        /**
            * The Panel toolbar gets adaptive if the property is set to true.
            */
        get allowAdaptiveActions(): boolean;
        set allowAdaptiveActions(val: boolean);
        get paddingLeft(): string;
        set paddingLeft(val: string);
        get innerPaddingLeft(): string;
        set innerPaddingLeft(val: string);
        get paddingRight(): string;
        set paddingRight(val: string);
        clearOnDeletingContainer(): void;
        get footerActions(): Array<IAction>;
        getFooterToolbar(): ActionContainer;
        get hasEditButton(): boolean;
        cancelPreview(): void;
        get cssTitle(): string;
        get cssError(): string;
        protected getCssError(cssClasses: any): string;
        protected onVisibleChanged(): void;
        needResponsiveWidth(): boolean;
        focusIn: () => void;
}

/**
  * The flow panel object. It is a container with flow layout where you can mix questions with markdown text.
  *
  */
export declare class FlowPanelModel extends PanelModel {
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
    getElementContentText(element: IElement): string;
}

/**
    * The page object. It has elements collection, that contains questions and panels.
    */
export declare class PageModel extends PanelModelBase implements IPage {
        constructor(name?: string);
        getType(): string;
        toString(): string;
        get isPage(): boolean;
        protected canShowTitle(): boolean;
        /**
            * Use this property to show title in navigation buttons. If the value is empty then page name is used.
            * @see survey.progressBarType
            */
        get navigationTitle(): string;
        set navigationTitle(val: string);
        get locNavigationTitle(): LocalizableString;
        get navigationDescription(): string;
        set navigationDescription(val: string);
        get locNavigationDescription(): LocalizableString;
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
            * Returns true, if the page is started page in the survey. It can be shown on the start only and the end-user could not comeback to it after it passed it.
            */
        get isStarted(): boolean;
        protected calcCssClasses(css: any): any;
        get cssTitle(): string;
        get num(): number;
        set num(val: number);
        /**
            * Set this property to "hide" to make "Prev", "Next" and "Complete" buttons are invisible for this page. Set this property to "show" to make these buttons visible, even if survey showNavigationButtons property is false.
            * @see SurveyMode.showNavigationButtons
            */
        get navigationButtonsVisibility(): string;
        set navigationButtonsVisibility(val: string);
        /**
            * The property returns true, if the page has been shown to the end-user.
            */
        get wasShown(): boolean;
        get hasShown(): boolean;
        setWasShown(val: boolean): void;
        /**
            * The property returns true, if the elements are randomized on the page
            * @see hasShown
            * @see questionsOrder
            * @see SurveyModel.questionsOrder
            */
        get areQuestionsRandomized(): boolean;
        /**
            * Call it to scroll to the page top.
            */
        scrollToTop(): void;
        /**
            * Time in seconds end-user spent on this page
            */
        timeSpent: number;
        /**
            * Returns the list of all panels in the page
            */
        getPanels(visibleOnly?: boolean, includingDesignTime?: boolean): Array<IPanel>;
        /**
            * The maximum time in seconds that end-user has to complete the page. If the value is 0 or less, the end-user has unlimited number of time to finish the page.
            * @see startTimer
            * @see SurveyModel.maxTimeToFinishPage
            */
        get maxTimeToFinish(): number;
        set maxTimeToFinish(val: number);
        protected onNumChanged(value: number): void;
        protected onVisibleChanged(): void;
        dragDropStart(src: IElement, target: IElement, nestedPanelDepth?: number): void;
        dragDropMoveTo(destination: ISurveyElement, isBottom?: boolean, isEdge?: boolean): boolean;
        dragDropFinish(isCancel?: boolean): IElement;
        ensureRowsVisibility(): void;
}

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

export declare class DefaultTitleModel {
    static getIconCss(cssClasses: any, isCollapsed: boolean): string;
}

export interface IConditionObject {
        name: string;
        text: string;
        question: Question;
}
/**
    * A base class for all questions.
    */
export declare class Question extends SurveyElement implements IQuestion, IConditionRunner, IValidatorOwner, ITitleOwner {
        [index: string]: any;
        customWidgetData: {
                isNeedRender: boolean;
        };
        focusCallback: () => void;
        surveyLoadCallback: () => void;
        displayValueCallback: (text: string) => string;
        valueChangedCallback: () => void;
        commentChangedCallback: () => void;
        validateValueCallback: () => SurveyError;
        questionTitleTemplateCallback: () => string;
        afterRenderQuestionCallback: (question: Question, element: any) => any;
        valueFromDataCallback: (val: any) => any;
        valueToDataCallback: (val: any) => any;
        onGetSurvey: () => ISurvey;
        protected isReadyValue: boolean;
        /**
            * The event is fired when isReady property of question is changed.
            * <br/> options.question - the question
            * <br/> options.isReady - current value of isReady
            * <br/> options.oldIsReady - old value of isReady
            */
        onReadyChanged: EventBase<Question>;
        isReadOnlyRenderDiv(): boolean;
        constructor(name: string);
        protected createLocTitleProperty(): LocalizableString;
        getSurvey(live?: boolean): ISurvey;
        getValueName(): string;
        /**
            * Use this property if you want to store the question result in the name different from the question name.
            * Question name should be unique in the survey and valueName could be not unique. It allows to share data between several questions with the same valueName.
            * The library set the value automatically if the question.name property is not valid. For example, if it contains the period '.' symbol.
            * In this case if you set the question.name property to 'x.y' then the valueName becomes 'x y'.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see name
            */
        get valueName(): string;
        set valueName(val: string);
        protected onValueNameChanged(oldValue: string): void;
        protected onNameChanged(oldValue: string): void;
        get isReady(): boolean;
        /**
            * A11Y properties
            */
        get ariaRequired(): boolean;
        get ariaLabel(): string;
        get ariaInvalid(): boolean;
        get ariaDescribedBy(): string;
        /**
            * Get is question ready to use
            */
        choicesLoaded(): void;
        /**
            * Get/set the page where the question is located.
            */
        get page(): IPage;
        set page(val: IPage);
        getPanel(): IPanel;
        delete(): void;
        get isFlowLayout(): boolean;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Use it to get/set the question visibility.
            * @see visibleIf
            */
        get visible(): boolean;
        set visible(val: boolean);
        protected onVisibleChanged(): void;
        /**
            * Use it to choose how other question values will be rendered in title if referenced in {}.
            * Please note, this property is hidden for question without input, for example html question.
            */
        get useDisplayValuesInTitle(): boolean;
        set useDisplayValuesInTitle(val: boolean);
        protected getUseDisplayValuesInTitle(): boolean;
        /**
            * An expression that returns true or false. If it returns true the Question becomes visible and if it returns false the Question becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
            * @see visible
            */
        get visibleIf(): string;
        set visibleIf(val: string);
        /**
            * Returns true if the question is visible or survey is in design mode right now.
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
            * Set hideNumber to true to stop showing the number for this question. The question will not be counter
            * @see visibleIndex
            * @see titleLocation
            */
        get hideNumber(): boolean;
        set hideNumber(val: boolean);
        /**
            * Returns true if the question may have a title located on the left
            */
        get isAllowTitleLeft(): boolean;
        /**
            * Returns the type of the object as a string as it represents in the json.
            */
        getType(): string;
        get isQuestion(): boolean;
        /**
            * Move question to a new container Page/Panel. Add as a last element if insertBefore parameter is not used or inserted into the given index,
            * if insert parameter is number, or before the given element, if the insertBefore parameter is a question or panel
            * @param container Page or Panel to where a question is relocated.
            * @param insertBefore Use it if you want to set the question to a specific position. You may use a number (use 0 to insert int the beginning) or element, if you want to insert before this element.
            */
        moveTo(container: IPanel, insertBefore?: any): boolean;
        getProgressInfo(): IProgressInfo;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
        /**
            * A parent element. It can be panel or page.
            */
        get parent(): IPanel;
        set parent(val: IPanel);
        /**
            * A parent question. It can be a dynamic panel or dynamic/dropdown matrices. If the value is a matrix, it means that question is a cell question.
            * This property is null for a stand alone question.
            */
        get parentQuestion(): Question;
        setParentQuestion(val: Question): void;
        protected onParentQuestionChanged(): void;
        protected onParentChanged(): void;
        /**
            * Returns false if the question doesn't have a title property, for example: QuestionHtmlModel, or titleLocation property equals to "hidden"
            * @see titleLocation
            */
        get hasTitle(): boolean;
        /**
            * Set this property different from "default" to set the specific question title location for this panel/page.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see SurveyModel.questionTitleLocation
            */
        get titleLocation(): string;
        set titleLocation(value: string);
        getTitleOwner(): ITitleOwner;
        /**
            * Return the title location based on question titleLocation property and QuestionTitleLocation of it's parents
            * @see titleLocation
            * @see PanelModelBase.QuestionTitleLocation
            * @see SurveyModel.QuestionTitleLocation
            */
        getTitleLocation(): string;
        protected getTitleLocationCore(): string;
        get hasTitleOnLeft(): boolean;
        get hasTitleOnTop(): boolean;
        get hasTitleOnBottom(): boolean;
        get hasTitleOnLeftTop(): boolean;
        get errorLocation(): string;
        /**
            * Returns false if the question doesn't have an input element, for example: QuestionHtmlModel
            * @see hasSingleInput
            */
        get hasInput(): boolean;
        /**
            * Returns false if the question doesn't have an input element or have multiple inputs: matrices or panel dynamic
            * @see hasInput
            */
        get hasSingleInput(): boolean;
        get inputId(): string;
        protected getDefaultTitleValue(): string;
        protected getDefaultTitleTagName(): string;
        /**
            * Question description location. By default, value is "default" and it depends on survey questionDescriptionLocation property
            * You may change it to "underInput" to render it under question input or "underTitle" to rendered it under title.
            * @see description
            * @see Survey.questionDescriptionLocation
            */
        get descriptionLocation(): string;
        set descriptionLocation(val: string);
        get hasDescriptionUnderTitle(): boolean;
        get hasDescriptionUnderInput(): boolean;
        get clickTitleFunction(): any;
        /**
            * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
            * Please note, this property is hidden for question without input, for example html question.
            */
        get requiredErrorText(): string;
        set requiredErrorText(val: string);
        get locRequiredErrorText(): LocalizableString;
        /**
            * Use it to get or set the comment value.
            */
        get commentText(): string;
        set commentText(val: string);
        get locCommentText(): LocalizableString;
        /**
            * Returns a copy of question errors survey. For some questions like matrix and panel dynamic it includes the errors of nested questions.
            */
        getAllErrors(): Array<SurveyError>;
        getErrorByType(errorType: string): SurveyError;
        /**
            * The link to the custom widget.
            */
        get customWidget(): QuestionCustomWidget;
        updateCustomWidget(): void;
        get isCompositeQuestion(): boolean;
        updateCommentElement(): void;
        onCommentInput(event: any): void;
        onCommentChange(event: any): void;
        afterRenderQuestionElement(el: HTMLElement): void;
        afterRender(el: HTMLElement): void;
        beforeDestroyQuestionElement(el: HTMLElement): void;
        /**
            * Returns the rendred question title.
            */
        get processedTitle(): string;
        /**
            * Returns the title after processing the question template.
            * @see SurveyModel.questionTitleTemplate
            */
        get fullTitle(): string;
        protected get titlePattern(): string;
        get isRequireTextOnStart(): boolean;
        get isRequireTextBeforeTitle(): boolean;
        get isRequireTextAfterTitle(): boolean;
        /**
            * The Question renders on the new line if the property is true. If the property is false, the question tries to render on the same line/row with a previous question/panel.
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
        get cssError(): string;
        protected setCssError(val: string): void;
        protected getCssError(cssClasses: any): string;
        getRootCss(): string;
        updateElementCss(reNew?: boolean): void;
        protected updateQuestionCss(reNew?: boolean): void;
        protected updateElementCssCore(cssClasses: any): void;
        protected updateCssClasses(res: any, css: any): void;
        protected getCssType(): string;
        /**
            * Use it to set the specific width to the question like css style (%, px, em etc).
            */
        get width(): string;
        set width(val: string);
        /**
            * Use it to set the specific minWidth constraint to the question like css style (%, px, em etc).
            */
        get minWidth(): string;
        set minWidth(val: string);
        /**
            * Use it to set the specific maxWidth constraint to the question like css style (%, px, em etc).
            */
        get maxWidth(): string;
        set maxWidth(val: string);
        /**
            * The rendered width of the question.
            */
        get renderWidth(): string;
        set renderWidth(val: string);
        /**
            * Set it different from 0 to increase the left padding.
            */
        get indent(): number;
        set indent(val: number);
        /**
            * Set it different from 0 to increase the right padding.
            */
        get rightIndent(): number;
        set rightIndent(val: number);
        get paddingLeft(): string;
        set paddingLeft(val: string);
        get paddingRight(): string;
        set paddingRight(val: string);
        /**
            * Move the focus to the input of this question.
            * @param onError set this parameter to true, to focus the input with the first error, other wise the first input will be focused.
            */
        focus(onError?: boolean): void;
        focusIn: () => void;
        protected fireCallback(callback: () => void): void;
        getOthersMaxLength(): any;
        protected onCreating(): void;
        protected getFirstInputElementId(): string;
        protected getFirstErrorInputElementId(): string;
        protected getProcessedTextValue(textValue: TextPreProcessorValue): void;
        supportComment(): boolean;
        supportOther(): boolean;
        /**
            * Set this property to true, to make the question a required. If a user doesn't answer the question then a validation error will be generated.
            * Please note, this property is hidden for question without input, for example html question.
            */
        get isRequired(): boolean;
        set isRequired(val: boolean);
        /**
            * An expression that returns true or false. If it returns true the Question becomes required and an end-user has to answer it.
            * If it returns false the Question then an end-user may not answer it the Question maybe empty.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
            * Please note, this property is hidden for question without input, for example html question.
            * @see isRequired
            */
        get requiredIf(): string;
        set requiredIf(val: string);
        /**
            * Set it to true, to add a comment for the question.
            */
        get hasComment(): boolean;
        set hasComment(val: boolean);
        /**
            * The unique identificator. It is generated automatically.
            */
        get id(): string;
        set id(val: string);
        get ariaTitleId(): string;
        get ariaRole(): string;
        get hasOther(): boolean;
        set hasOther(val: boolean);
        protected hasOtherChanged(): void;
        get requireUpdateCommentValue(): boolean;
        /**
            * Returns true if readOnly property is true or survey is in display mode or parent panel/page is readOnly.
            * @see SurveyModel.model
            * @see readOnly
            */
        get isReadOnly(): boolean;
        get isInputReadOnly(): boolean;
        protected onReadOnlyChanged(): void;
        /**
            * An expression that returns true or false. If it returns false the Question becomes read only and an end-user will not able to answer on the qustion. The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
            * Please note, this property is hidden for question without input, for example html question.
            * @see readOnly
            * @see isReadOnly
            */
        get enableIf(): string;
        set enableIf(val: string);
        /**
            * Run visibleIf and enableIf expressions. If visibleIf or/and enabledIf are not empty, then the results of performing the expression (true or false) set to the visible/readOnly properties.
            * @param values Typically survey results
            * @see visible
            * @see visibleIf
            * @see readOnly
            * @see enableIf
            */
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        /**
            * The property returns the question number. If question is invisible then it returns empty string.
            * If visibleIndex is 1, then no is 2, or 'B' if survey.questionStartIndex is 'A'.
            * @see SurveyModel.questionStartIndex
            */
        get no(): string;
        protected getStartIndex(): string;
        onSurveyLoad(): void;
        protected onSetData(): void;
        protected initDataFromSurvey(): void;
        protected initCommentFromSurvey(): void;
        protected runExpression(expression: string): any;
        /**
            * Get/Set the question value.
            * @see SurveyMode.setValue
            * @see SurveyMode.getValue
            */
        get value(): any;
        set value(newValue: any);
        get valueForSurvey(): any;
        /**
            * Clear the question value. It clears the question comment as well.
            */
        clearValue(): void;
        unbindValue(): void;
        createValueCopy(): any;
        protected getUnbindValue(value: any): any;
        protected isValueSurveyElement(val: any): boolean;
        clearValueIfInvisible(): void;
        get displayValue(): any;
        /**
            * Return the question value as a display text. For example, for dropdown, it would return the item text instead of item value.
            * @param keysAsText Set this value to true, to return key (in matrices questions) as display text as well.
            * @param value use this parameter, if you want to get display value for this value and not question.value. It is undefined by default.
            */
        getDisplayValue(keysAsText: boolean, value?: any): any;
        protected getDisplayValueCore(keyAsText: boolean, value: any): any;
        protected getDisplayValueEmpty(): string;
        /**
            * Set the default value to the question. It will be assign to the question on loading the survey from JSON or adding a question to the survey or on setting this property of the value is empty.
            * Please note, this property is hidden for question without input, for example html question.
            */
        get defaultValue(): any;
        set defaultValue(val: any);
        get defaultValueExpression(): any;
        set defaultValueExpression(val: any);
        /**
            * Returns question answer data as a plain object: with question title, name, value and displayValue.
            * For complex questions (like matrix, etc.) isNode flag is set to true and data contains array of nested objects (rows)
            * set options.includeEmpty to false if you want to skip empty answers
            */
        getPlainData(options?: {
                includeEmpty?: boolean;
                includeQuestionTypes?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        /**
            * The correct answer on the question. Set this value if you are doing a quiz.
            * Please note, this property is hidden for question without input, for example html question.
            * @see SurveyModel.correctAnswers
            * @see SurveyModel.inCorrectAnswers
            */
        get correctAnswer(): any;
        set correctAnswer(val: any);
        protected convertDefaultValue(val: any): any;
        /**
            * Returns questions count: 1 for the non-matrix questions and all inner visible questions that has input(s) widgets for question of matrix types.
            * @see getQuizQuestions
            */
        get quizQuestionCount(): number;
        get correctAnswerCount(): number;
        protected getQuizQuestionCount(): number;
        protected getCorrectAnswerCount(): number;
        isAnswerCorrect(): boolean;
        updateValueWithDefaults(): void;
        getQuestionFromArray(name: string, index: number): IQuestion;
        getDefaultValue(): any;
        protected isDefaultValueEmpty(): boolean;
        protected setDefaultValue(): void;
        protected isValueExpression(val: any): boolean;
        protected setValueAndRunExpression(expression: string, defaultValue: any, setFunc: (val: any) => void, values?: HashTable<any>, properties?: HashTable<any>): void;
        /**
            * The question comment value.
            */
        get comment(): string;
        set comment(newValue: string);
        protected getQuestionComment(): string;
        protected setQuestionComment(newValue: string): void;
        /**
            * Returns true if the question value is empty
            */
        isEmpty(): boolean;
        get isAnswered(): boolean;
        set isAnswered(val: boolean);
        protected updateIsAnswered(): void;
        protected getIsAnswered(): boolean;
        /**
            * The list of question validators.
            * Please note, this property is hidden for question without input, for example html question.
            */
        get validators(): Array<SurveyValidator>;
        set validators(val: Array<SurveyValidator>);
        getValidators(): Array<SurveyValidator>;
        getSupportedValidators(): Array<string>;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        /**
            * Returns true if there is a validation error(s) in the question.
            * @param fireCallback set it to true to show an error in UI.
            */
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        /**
            * Returns the validation errors count.
            */
        get currentErrorCount(): number;
        /**
            * Returns the char/string for a required question.
            * @see SurveyModel.requiredText
            */
        get requiredText(): string;
        /**
            * Add error into the question error list.
            * @param error
            */
        addError(error: SurveyError | string): void;
        /**
            * Remove a particular error from the question error list.
            * @param error
            */
        removeError(error: SurveyError): void;
        protected canCollectErrors(): boolean;
        protected canRunValidators(isOnValueChanged: boolean): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected hasRequiredError(): boolean;
        onCompletedAsyncValidators: (hasErrors: boolean) => void;
        get isRunningValidators(): boolean;
        protected getIsRunningValidators(): boolean;
        protected runValidators(): Array<SurveyError>;
        protected raiseOnCompletedAsyncValidators(): void;
        protected allowNotifyValueChanged: boolean;
        protected setNewValue(newValue: any): void;
        protected isTextValue(): boolean;
        get isSurveyInputTextUpdate(): boolean;
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
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        setVisibleIndex(val: number): number;
        removeElement(element: IElement): boolean;
        supportGoNextPageAutomatic(): boolean;
        supportGoNextPageError(): boolean;
        /**
            * Call this function to remove values from the current question, that end-user will not be able to enter.
            * For example the value that doesn't exists in a radigroup/dropdown/checkbox choices or matrix rows/columns.
            */
        clearIncorrectValues(): void;
        clearOnDeletingContainer(): void;
        /**
            * Call this function to clear all errors in the question
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
        needResponsiveWidth(): boolean;
}

/**
  * A Model for non value question. This question doesn't add any new functionality. It hides some properties, including the value.
  */
export declare class QuestionNonValue extends Question {
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

/**
  * A Model for an question that renders empty "div" tag. It used as a base class for some custom widgets
  */
export declare class QuestionEmptyModel extends Question {
    constructor(name: string);
    getType(): string;
}

/**
    * It is a base class for checkbox, dropdown and radiogroup questions.
    */
export declare class QuestionSelectBase extends Question {
        visibleChoicesChangedCallback: () => void;
        constructor(name: string);
        getType(): string;
        dispose(): void;
        protected getItemValueType(): string;
        createItemValue(value: any): ItemValue;
        supportGoNextPageError(): boolean;
        isLayoutTypeSupported(layoutType: string): boolean;
        localeChanged(): void;
        locStrsChanged(): void;
        /**
            * Returns the other item. By using this property, you may change programmatically it's value and text.
            * @see hasOther
            */
        get otherItem(): ItemValue;
        /**
            * Returns true if a user select the 'other' item.
            */
        get isOtherSelected(): boolean;
        /**
            * Set this property to true, to show the "None" item on the bottom. If end-user checks this item, all other items would be unchecked.
            */
        get hasNone(): boolean;
        set hasNone(val: boolean);
        /**
            * Returns the none item. By using this property, you may change programmatically it's value and text.
            * @see hasNone
            */
        get noneItem(): ItemValue;
        /**
            * Use this property to set the different text for none item.
            */
        get noneText(): string;
        set noneText(val: string);
        get locNoneText(): LocalizableString;
        /**
            * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see visibleIf
            * @see choicesEnableIf
            */
        get choicesVisibleIf(): string;
        set choicesVisibleIf(val: string);
        /**
            * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is enabled otherwise the item becomes disabled. Please use {item} to get the current item value in the expression.
            * @see choicesVisibleIf
            */
        get choicesEnableIf(): string;
        set choicesEnableIf(val: string);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected isTextValue(): boolean;
        protected setDefaultValue(): void;
        protected getIsMultipleValue(): boolean;
        protected convertDefaultValue(val: any): any;
        protected filterItems(): boolean;
        protected runItemsCondition(values: HashTable<any>, properties: HashTable<any>): boolean;
        protected runItemsEnableCondition(values: HashTable<any>, properties: HashTable<any>): any;
        protected onAfterRunItemsEnableCondition(): void;
        protected onEnableItemCallBack(item: ItemValue): boolean;
        protected getHasOther(val: any): boolean;
        get validatedValue(): any;
        protected createRestful(): ChoicesRestful;
        protected getQuestionComment(): string;
        protected setQuestionComment(newValue: string): void;
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
        protected hasUnknownValue(val: any, includeOther?: boolean, isFilteredChoices?: boolean, checkEmptyValue?: boolean): boolean;
        protected isValueDisabled(val: any): boolean;
        /**
            * If the clearIncorrectValuesCallback is set, it is used to clear incorrect values instead of default behaviour.
            */
        clearIncorrectValuesCallback: () => void;
        /**
            * Use this property to fill the choices from a RESTful service.
            * @see choices
            * @see ChoicesRestful
            * @see [Example: RESTful Dropdown](https://surveyjs.io/Examples/Library/?id=questiontype-dropdownrestfull)
            * @see [Docs: Fill Choices from a RESTful Service](https://surveyjs.io/Documentation/Library/?id=LibraryOverview#fill-the-choices-from-a-restful-service)
            */
        get choicesByUrl(): ChoicesRestful;
        set choicesByUrl(val: ChoicesRestful);
        /**
            * The list of items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown.
            * @see choicesByUrl
            * @see choicesFromQuestion
            */
        get choices(): Array<any>;
        set choices(newValue: Array<any>);
        /**
            * Set this property to get choices from the specified question instead of defining them in the current question. This avoids duplication of choices declaration in your survey definition.
            * By setting this property, the "choices", "choicesVisibleIf", "choicesEnableIf" and "choicesOrder" properties become invisible, because these question characteristics depend on actions in another (specified) question.
            * Use the `choicesFromQuestionMode` property to filter choices obtained from the specified question.
            * @see choices
            * @see choicesFromQuestionMode
            */
        get choicesFromQuestion(): string;
        set choicesFromQuestion(val: string);
        /**
            * This property becomes visible when the `choicesFromQuestion` property is selected. The default value is "all" (all visible choices from another question are displayed as they are).
            * You can set this property to "selected" or "unselected" to display only selected or unselected choices from the specified question.
            * @see choicesFromQuestion
            */
        get choicesFromQuestionMode(): string;
        set choicesFromQuestionMode(val: string);
        /**
            * Set this property to true to hide the question if there is no visible choices.
            */
        get hideIfChoicesEmpty(): boolean;
        set hideIfChoicesEmpty(val: boolean);
        get keepIncorrectValues(): boolean;
        set keepIncorrectValues(val: boolean);
        /**
            * Please use survey.storeOthersAsComment to change the behavior on the survey level. This property is depricated and invisible in Survey Creator.
            * By default the entered text in the others input in the checkbox/radiogroup/dropdown are stored as "question name " + "-Comment". The value itself is "question name": "others". Set this property to false, to store the entered text directly in the "question name" key.
            * Possible values are: "default", true, false
            * @see SurveyModel.storeOthersAsComment
            */
        get storeOthersAsComment(): any;
        set storeOthersAsComment(val: any);
        protected hasOtherChanged(): void;
        /**
            * Use this property to render items in a specific order: "asc", "desc", "random". Default value is "none".
            */
        get choicesOrder(): string;
        set choicesOrder(val: string);
        /**
            * Use this property to set the different text for other item.
            */
        get otherText(): string;
        set otherText(val: string);
        get locOtherText(): LocalizableString;
        /**
            *  Use this property to set the place holder text for other or comment field  .
            */
        get otherPlaceHolder(): string;
        set otherPlaceHolder(val: string);
        get locOtherPlaceHolder(): LocalizableString;
        /**
            * The text that shows when the other item is choosed by the other input is empty.
            */
        get otherErrorText(): string;
        set otherErrorText(val: string);
        get locOtherErrorText(): LocalizableString;
        /**
            * The list of items as they will be rendered. If needed items are sorted and the other item is added.
            * @see hasOther
            * @see choicesOrder
            * @see enabledChoices
            */
        get visibleChoices(): Array<ItemValue>;
        /**
            * The list of enabled items as they will be rendered. The disabled items are not included
            * @see hasOther
            * @see choicesOrder
            * @see visibleChoices
            */
        get enabledChoices(): Array<ItemValue>;
        protected updateVisibleChoices(): void;
        protected canUseFilteredChoices(): boolean;
        setCanShowOptionItemCallback(func: (item: ItemValue) => boolean): void;
        protected addToVisibleChoices(items: Array<ItemValue>, isAddAll: boolean): void;
        protected canShowOptionItem(item: ItemValue): boolean;
        /**
            * For internal use in SurveyJS Creator V2.
            */
        isItemInList(item: ItemValue): boolean;
        protected get isAddDefaultItems(): boolean;
        getPlainData(options?: {
                includeEmpty?: boolean;
                includeQuestionTypes?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        /**
            * Returns the text for the current value. If the value is null then returns empty string. If 'other' is selected then returns the text for other value.
            */
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected getDisplayValueEmpty(): string;
        protected getChoicesDisplayValue(items: ItemValue[], val: any): any;
        protected get activeChoices(): Array<ItemValue>;
        protected getChoicesFromQuestion(question: QuestionSelectBase): Array<ItemValue>;
        protected get hasActiveChoices(): boolean;
        protected isBuiltInChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        protected getChoices(): Array<ItemValue>;
        supportComment(): boolean;
        supportOther(): boolean;
        supportNone(): boolean;
        protected isSupportProperty(propName: string): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        protected setSurveyCore(value: ISurvey): void;
        protected getStoreOthersAsComment(): boolean;
        onSurveyLoad(): void;
        onAnyValueChanged(name: string): void;
        updateValueFromSurvey(newValue: any): void;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        protected onBeforeSendRequest(): void;
        protected onLoadChoicesFromUrl(array: Array<ItemValue>): void;
        protected updateChoicesDependedQuestions(): void;
        onSurveyValueChanged(newValue: any): void;
        protected onVisibleChoicesChanged(): void;
        clearIncorrectValues(): void;
        clearValueIfInvisible(): void;
        /**
            * Returns true if item is selected
            * @param item checkbox or radio item value
            */
        isItemSelected(item: ItemValue): boolean;
        protected clearIncorrectValuesCore(): void;
        protected canClearValueAnUnknow(val: any): boolean;
        protected clearDisabledValuesCore(): void;
        clearUnusedValues(): void;
        getColumnClass(): string;
        getItemIndex(item: any): number;
        getItemClass(item: any): string;
        protected getItemClassCore(item: any, options: any): string;
        getLabelClass(item: ItemValue): string;
        getControlLabelClass(item: ItemValue): string;
        get columns(): ItemValue[][];
        get hasColumns(): boolean;
        choicesLoaded(): void;
        getItemValueWrapperComponentName(item: ItemValue): string;
        getItemValueWrapperComponentData(item: ItemValue): any;
}
/**
    * A base class for checkbox and radiogroup questions. It introduced a colCount property.
    */
export declare class QuestionCheckboxBase extends QuestionSelectBase {
        colCountChangedCallback: () => void;
        constructor(name: string);
        /**
            * The number of columns for radiogroup and checkbox questions. Items are rendred in one line if the value is 0.
            */
        get colCount(): number;
        set colCount(value: number);
        protected onParentChanged(): void;
        protected onParentQuestionChanged(): void;
        protected getSearchableItemValueKeys(keys: Array<string>): void;
        getItemEnabled(item: ItemValue): any;
        isOtherItem(item: ItemValue): boolean;
}

/**
    * A Model for a checkbox question
    */
export declare class QuestionCheckboxModel extends QuestionCheckboxBase {
        constructor(name: string);
        get ariaRole(): string;
        getType(): string;
        protected onCreating(): void;
        protected getFirstInputElementId(): string;
        /**
            * Returns the select all item. By using this property, you may change programmatically it's value and text.
            * @see hasSelectAll
            */
        get selectAllItem(): ItemValue;
        /**
            * Use this property to set the different text for Select All item.
            */
        get selectAllText(): string;
        set selectAllText(val: string);
        get locSelectAllText(): LocalizableString;
        /**
            * Set this property to true, to show the "Select All" item on the top. If end-user checks this item, then all items are checked.
            */
        get hasSelectAll(): boolean;
        set hasSelectAll(val: boolean);
        /**
            * Returns true if all items are selected
            * @see toggleSelectAll
            */
        get isAllSelected(): boolean;
        set isAllSelected(val: boolean);
        /**
            * It will select all items, except other and none. If all items have been already selected then it will clear the value
            * @see isAllSelected
            * @see selectAll
            */
        toggleSelectAll(): void;
        /**
            * Select all items, except other and none.
            */
        selectAll(): void;
        /**
            * Returns true if item is checked
            * @param item checkbox item value
            */
        isItemSelected(item: ItemValue): boolean;
        /**
            * Set this property different to 0 to limit the number of selected choices in the checkbox.
            */
        get maxSelectedChoices(): number;
        set maxSelectedChoices(val: number);
        /**
            * Return the selected items in the checkbox. Returns empty array if the value is empty
            */
        get selectedItems(): Array<ItemValue>;
        protected onEnableItemCallBack(item: ItemValue): boolean;
        protected onAfterRunItemsEnableCondition(): void;
        protected getItemClassCore(item: any, options: any): string;
        protected setNewValue(newValue: any): void;
        protected getIsMultipleValue(): boolean;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        protected canUseFilteredChoices(): boolean;
        protected supportSelectAll(): boolean;
        protected addToVisibleChoices(items: Array<ItemValue>, isAddAll: boolean): void;
        protected isBuiltInChoice(item: ItemValue, question: QuestionSelectBase): boolean;
        /**
            * For internal use in SurveyJS Creator V2.
            */
        isItemInList(item: ItemValue): boolean;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected clearIncorrectValuesCore(): void;
        protected clearDisabledValuesCore(): void;
        getConditionJson(operator?: string, path?: string): any;
        isAnswerCorrect(): boolean;
        protected setDefaultValueWithOthers(): void;
        protected getHasOther(val: any): boolean;
        protected valueFromData(val: any): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        get checkBoxSvgPath(): string;
        getItemId(item: ItemValue): string;
}

/**
  * A Model for a ranking question
  */
export declare class QuestionRankingModel extends QuestionCheckboxModel {
    constructor(name: string);
    getType(): string;
    get rootClass(): string;
    protected getItemClassCore(item: ItemValue, options: any): string;
    protected isItemCurrentDropTarget(item: ItemValue): boolean;
    get ghostPositionCssClass(): string;
    getNumberByIndex(index: number): string;
    setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
    onSurveyValueChanged(newValue: any): void;
    protected onVisibleChoicesChanged: () => void;
    localeChanged: () => void;
    get rankingChoices(): Array<ItemValue>;
    dragDropRankingChoices: DragDropRankingChoices;
    currentDropTarget: ItemValue;
    dropTargetNodeMove: string;
    endLoadingFromJson(): void;
    handlePointerDown: (event: PointerEvent, choice: ItemValue, node: HTMLElement) => void;
    afterRenderQuestionElement(el: HTMLElement): void;
    beforeDestroyQuestionElement(el: HTMLElement): void;
    handleKeydown: (event: KeyboardEvent, choice: ItemValue) => void;
    protected supportSelectAll(): boolean;
    supportOther(): boolean;
    supportNone(): boolean;
    get fallbackToSortableJS(): boolean;
    set fallbackToSortableJS(val: boolean);
    setValue: () => void;
    getIconHoverCss(): string;
    getIconFocusCss(): string;
}

/**
    * A Model for a comment question
    */
export declare class QuestionCommentModel extends QuestionTextBase {
        /**
            * The html rows attribute.
            */
        get rows(): number;
        set rows(val: number);
        /**
            * The html cols attribute.
            */
        get cols(): number;
        set cols(val: number);
        /**
            * Accepts pressing the Enter key by end-users and accepts carriage return symbols - \n - in the question value assigned.
            */
        get acceptCarriageReturn(): boolean;
        set acceptCarriageReturn(val: boolean);
        /**
            * Specifies whether the question's text area automatically expands its height to avoid the vertical scrollbar and to display the entire multi-line contents entered by respondents.
            * Default value is false.
            * @see SurveyModel.autoGrowComment
            */
        get autoGrow(): boolean;
        set autoGrow(val: boolean);
        getType(): string;
        afterRenderQuestionElement(el: HTMLElement): void;
        updateElement(): void;
        onInput(event: any): void;
        onKeyDown(event: any): void;
        onValueChanged(): void;
        protected setNewValue(newValue: string): any;
}

/**
    * A Model for a dropdown question
    */
export declare class QuestionDropdownModel extends QuestionSelectBase {
        constructor(name: string);
        /**
            * This flag controls whether to show options caption item ('Choose...').
            */
        get showOptionsCaption(): boolean;
        set showOptionsCaption(val: boolean);
        /**
            * Use this property to set the options caption different from the default value. The default value is taken from localization strings.
            */
        get optionsCaption(): string;
        set optionsCaption(val: string);
        get locOptionsCaption(): LocalizableString;
        getType(): string;
        get selectedItem(): ItemValue;
        supportGoNextPageAutomatic(): boolean;
        protected getChoices(): Array<ItemValue>;
        /**
            * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
            * @see choicesMax
            * @see choicesStep
            */
        get choicesMin(): number;
        set choicesMin(val: number);
        /**
            * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
            * @see choicesMin
            * @see choicesStep
            */
        get choicesMax(): number;
        set choicesMax(val: number);
        /**
            * The default value is 1. It tells the value of the iterator between choicesMin and choicesMax properties.
            * If choicesMin = 10, choicesMax = 30 and choicesStep = 10 then you will have only three additional choices: [10, 20, 30].
            * @see choicesMin
            * @see choicesMax
            */
        get choicesStep(): number;
        set choicesStep(val: number);
        /**
            * Dropdown auto complete
            */
        get autoComplete(): string;
        set autoComplete(val: string);
        getControlClass(): string;
}

export declare class QuestionFactory {
    static Instance: QuestionFactory;
    static get DefaultChoices(): string[];
    static get DefaultColums(): string[];
    static get DefaultRows(): string[];
    static get DefaultMutlipleTextItems(): string[];
    registerQuestion(questionType: string, questionCreator: (name: string) => Question): void;
    unregisterElement(elementType: string): void;
    clear(): void;
    getAllTypes(): Array<string>;
    createQuestion(questionType: string, name: string): Question;
}
export declare class ElementFactory {
    static Instance: ElementFactory;
    registerElement(elementType: string, elementCreator: (name: string) => IElement): void;
    clear(): void;
    unregisterElement(elementType: string, removeFromSerializer?: boolean): void;
    getAllTypes(): Array<string>;
    createElement(elementType: string, name: string): IElement;
}

/**
    * A Model for a file question
    */
export declare class QuestionFileModel extends Question {
        isDragging: boolean;
        /**
            * The event is fired after question state has been changed.
            * <br/> sender the question object that fires the event
            * <br/> options.state new question state value.
            */
        onStateChanged: EventBase<QuestionFileModel>;
        previewValue: any[];
        currentState: string;
        constructor(name: string);
        getType(): string;
        clearOnDeletingContainer(): void;
        /**
            * Set it to true, to show the preview for the image files.
            */
        get showPreview(): boolean;
        set showPreview(val: boolean);
        /**
            * Set it to true, to allow select multiple files.
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
            * Accepted file types. Passed to the 'accept' attribute of the file input tag. See https://www.w3schools.com/tags/att_input_accept.asp for more details.
            */
        get acceptedTypes(): string;
        set acceptedTypes(val: string);
        /**
            * Set it to false if you do not want to serialize file content as text in the survey.data.
            * In this case, you have to write the code onUploadFiles event to store the file content.
            * @see SurveyModel.onUploadFiles
            */
        get storeDataAsText(): boolean;
        set storeDataAsText(val: boolean);
        /**
            * Set it to true if you want to wait until files will be uploaded to your server.
            */
        get waitForUpload(): boolean;
        set waitForUpload(val: boolean);
        /**
            * Set it to false if you want to disable images preview.
            */
        get allowImagesPreview(): boolean;
        set allowImagesPreview(val: boolean);
        /**
            * Use this property to setup the maximum allowed file size.
            */
        get maxSize(): number;
        set maxSize(val: number);
        /**
            * Use this property to setup confirmation to remove file.
            */
        get needConfirmRemoveFile(): boolean;
        set needConfirmRemoveFile(val: boolean);
        /**
            * The remove file confirmation message.
            */
        getConfirmRemoveMessage(fileName: string): string;
        /**
            * The remove file confirmation message template.
            */
        confirmRemoveMessage: string;
        /**
            * The remove all files confirmation message.
            */
        confirmRemoveAllMessage: string;
        /**
            * The no file chosen caption for modern theme.
            */
        noFileChosenCaption: string;
        /**
            * The choose files button caption for modern theme.
            */
        chooseButtonCaption: string;
        /**
            * The clean files button caption.
            */
        cleanButtonCaption: string;
        /**
            * The remove file button caption.
            */
        removeFileCaption: string;
        /**
            * The loading file input title.
            */
        loadingFileTitle: string;
        /**
         * The choose file input title.
         */
        chooseFileTitle: string;
        dragAreaPlaceholder: string;
        /**
            * The input title value.
            */
        get inputTitle(): string;
        /**
            * Clear value programmatically.
            */
        clear(doneCallback?: () => void): void;
        /**
            * Remove file item programmatically.
            */
        removeFile(content: {
                name: string;
        }): void;
        /**
            * Load multiple files programmatically.
            * @param files
            */
        loadFiles(files: File[]): void;
        canPreviewImage(fileItem: any): boolean;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected stateChanged(state: string): void;
        getPlainData(options?: {
                includeEmpty?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        supportComment(): boolean;
        getChooseFileCss(): string;
        getReadOnlyFileCss(): string;
        getFileDecoratorCss(): string;
        onDragOver: (event: any) => boolean;
        onDrop: (event: any) => void;
        onDragLeave: (event: any) => void;
        doChange: (event: any) => void;
        doClean: (event: any) => void;
        doRemoveFile(data: any): void;
        doDownloadFile: (event: any, data: any) => void;
}

/**
    * A Model for html question. Unlike other questions it doesn't have value and title.
    */
export declare class QuestionHtmlModel extends QuestionNonValue {
        ignoreHtmlProgressing: boolean;
        constructor(name: string);
        getType(): string;
        get isCompositeQuestion(): boolean;
        getProcessedText(text: string): string;
        /**
            * Set html to display it
            */
        get html(): string;
        set html(val: string);
        get locHtml(): LocalizableString;
        get processedHtml(): string;
}

/**
    * A Model for a radiogroup question.
    */
export declare class QuestionRadiogroupModel extends QuestionCheckboxBase {
        constructor(name: string);
        getType(): string;
        protected getFirstInputElementId(): string;
        /**
            * Return the selected item in the radio group. Returns null if the value is empty
            */
        get selectedItem(): ItemValue;
        /**
            * Show "clear button" flag.
            */
        get showClearButton(): boolean;
        set showClearButton(val: boolean);
        get canShowClearButton(): boolean;
        get clearButtonCaption(): any;
        supportGoNextPageAutomatic(): boolean;
        get ariaRole(): string;
}

/**
    * A Model for a rating question.
    */
export declare class QuestionRatingModel extends Question {
        rateValuesChangedCallback: () => void;
        constructor(name: string);
        onSurveyLoad(): void;
        /**
            * The list of rate items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown. If it is empty the array is generated by using rateMin, rateMax and rateStep properties.
            * @see rateMin
            * @see rateMax
            * @see rateStep
            */
        get rateValues(): Array<any>;
        set rateValues(val: Array<any>);
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the first value in the rating. The default value is 1.
            * @see rateValues
            * @see rateMax
            * @see rateStep
            */
        get rateMin(): number;
        set rateMin(val: number);
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the last value in the rating. The default value is 5.
            * @see rateValues
            * @see rateMin
            * @see rateStep
            */
        get rateMax(): number;
        set rateMax(val: number);
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the step value. The number of rate values are (rateMax - rateMin) / rateStep. The default value is 1.
            * @see rateValues
            * @see rateMin
            * @see rateMax
            */
        get rateStep(): number;
        set rateStep(val: number);
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        get visibleRateValues(): ItemValue[];
        getType(): string;
        protected getFirstInputElementId(): string;
        supportGoNextPageAutomatic(): boolean;
        supportComment(): boolean;
        supportOther(): boolean;
        /**
            * The description of minimum (first) item.
            */
        get minRateDescription(): string;
        set minRateDescription(val: string);
        get locMinRateDescription(): LocalizableString;
        /**
            * The description of maximum (last) item.
            */
        get maxRateDescription(): string;
        set maxRateDescription(val: string);
        get locMaxRateDescription(): LocalizableString;
        protected valueToData(val: any): any;
        /**
            * Click value again to clear.
            */
        setValueFromClick(value: any): void;
        getItemClass(item: ItemValue): string;
}

/**
    * A Model for expression question. It is a read-only question. It calculates value based on epxression property.
    */
export declare class QuestionExpressionModel extends Question {
        constructor(name: string);
        getType(): string;
        get hasInput(): boolean;
        /**
            * Use this property to display the value in your own format. Make sure you have "{0}" substring in your string, to display the actual value.
            */
        get format(): string;
        set format(val: string);
        get locFormat(): LocalizableString;
        /**
            * The Expression that used to calculate the question value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
            * <br/>Example: "({quantity} * {price}) * (100 - {discount}) / 100"
            */
        get expression(): string;
        set expression(val: string);
        locCalculation(): void;
        unlocCalculation(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected canCollectErrors(): boolean;
        protected hasRequiredError(): boolean;
        /**
            * The maximum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
            */
        get maximumFractionDigits(): number;
        set maximumFractionDigits(val: number);
        /**
            * The minimum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
            */
        get minimumFractionDigits(): number;
        set minimumFractionDigits(val: number);
        get runIfReadOnly(): boolean;
        set runIfReadOnly(val: boolean);
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        /**
            * You may set this property to "decimal", "currency", "percent" or "date". If you set it to "currency", you may use the currency property to display the value in currency different from USD.
            * @see currency
            */
        get displayStyle(): string;
        set displayStyle(val: string);
        /**
            * Use it to display the value in the currency differen from USD. The displayStype should be set to "currency".
            * @see displayStyle
            */
        get currency(): string;
        set currency(val: string);
        /**
            * 	Determines whether to display grouping separators. The default value is true.
            */
        get useGrouping(): boolean;
        set useGrouping(val: boolean);
        protected getValueAsStr(val: any): string;
}
export declare function getCurrecyCodes(): Array<string>;

/**
    * A Model for an input text question.
    */
export declare class QuestionTextModel extends QuestionTextBase {
        constructor(name: string);
        protected isTextValue(): boolean;
        getType(): string;
        onSurveyLoad(): void;
        /**
            * Use this property to change the default input type.
            */
        get inputType(): string;
        set inputType(val: string);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        getValidators(): Array<SurveyValidator>;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * The text input size
            */
        get size(): number;
        set size(val: number);
        get isTextInput(): boolean;
        get inputSize(): number;
        get inputWidth(): string;
        updateInputSize(): void;
        /**
            * Text auto complete
            */
        get autoComplete(): string;
        set autoComplete(val: string);
        /**
            * The minimum value
            */
        get min(): string;
        set min(val: string);
        /**
            * The maximum value
            */
        get max(): string;
        set max(val: string);
        /**
            * The minimum value that you can setup as expression, for example today(-1) = yesterday;
            */
        get minValueExpression(): string;
        set minValueExpression(val: string);
        /**
            * The maximum value that you can setup as expression, for example today(1) = tomorrow;
            */
        get maxValueExpression(): string;
        set maxValueExpression(val: string);
        get renderedMin(): any;
        get renderedMax(): any;
        /**
            * The text that shows when value is less than min property.
            * @see min
            * @see maxErrorText
            */
        get minErrorText(): string;
        set minErrorText(val: string);
        get locMinErrorText(): LocalizableString;
        /**
            * The text that shows when value is greater than man property.
            * @see max
            * @see minErrorText
            */
        get maxErrorText(): string;
        set maxErrorText(val: string);
        get locMaxErrorText(): LocalizableString;
        /**
            * Readonly property that returns true if the current inputType allows to set min and max properties
            * @see inputType
            * @see min
            * @see max
            */
        get isMinMaxType(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected canSetValueToSurvey(): boolean;
        /**
            * The step value
            */
        get step(): string;
        set step(val: string);
        get renderedStep(): string;
        supportGoNextPageAutomatic(): boolean;
        supportGoNextPageError(): boolean;
        /**
            * The list of recommended options available to choose.
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
}

/**
    * A Model for a boolean question.
    */
export declare class QuestionBooleanModel extends Question {
        constructor(name: string);
        getType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        supportGoNextPageAutomatic(): boolean;
        /**
            * Returns true if the question check will be rendered in indeterminate mode. value is empty.
            */
        get isIndeterminate(): boolean;
        get hasTitle(): boolean;
        /**
            * Get/set question value in 3 modes: indeterminate (value is empty), true (check is set) and false (check is unset).
            * @see valueTrue
            * @see valueFalse
            */
        get checkedValue(): any;
        set checkedValue(val: any);
        /**
            * Set the default state of the check: "indeterminate" - default (value is empty/null), "true" - value equals valueTrue or true, "false" - value equals valueFalse or false.
            */
        get defaultValue(): any;
        set defaultValue(val: any);
        getDefaultValue(): any;
        get locTitle(): LocalizableString;
        /**
            * The checkbox label. If it is empty and showTitle is false then title is rendered
            * @see showTitle
            * @see title
            */
        label: string;
        get locDisplayLabel(): LocalizableString;
        /**
            * Set this property, if you want to have a different label for state when check is set.
            */
        get labelTrue(): any;
        set labelTrue(val: any);
        get locLabelTrue(): LocalizableString;
        /**
            * Set this property, if you want to have a different label for state when check is unset.
            */
        get labelFalse(): any;
        set labelFalse(val: any);
        get locLabelFalse(): LocalizableString;
        /**
            * Set this property to true to show the question title. It is hidden by default.
            */
        showTitle: boolean;
        /**
            * Set this property, if you want to have a different value from true when check is set.
            */
        valueTrue: any;
        /**
            * Set this property, if you want to have a different value from false when check is unset.
            */
        valueFalse: any;
        protected setDefaultValue(): void;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        getItemCss(): string;
        getLabelCss(checked: boolean): string;
        get allowClick(): boolean;
        onLabelClick(event: any, value: boolean): boolean;
        onSwitchClickModel(event: any): boolean;
}

export declare class ImageItemValue extends ItemValue implements ILocalizableOwner {
        protected typeName: string;
        constructor(value: any, text?: string, typeName?: string);
        getType(): string;
        /**
            * The image or video link property.
            */
        get imageLink(): string;
        set imageLink(val: string);
        get locImageLink(): LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererContext(locStr: LocalizableString): any;
        getProcessedText(text: string): string;
}
/**
    * A Model for a select image question.
    */
export declare class QuestionImagePickerModel extends QuestionCheckboxBase {
        constructor(name: string);
        getType(): string;
        supportGoNextPageAutomatic(): boolean;
        get hasSingleInput(): boolean;
        protected getItemValueType(): string;
        get isCompositeQuestion(): boolean;
        supportOther(): boolean;
        supportNone(): boolean;
        /**
            * Multi select option. If set to true, then allows to select multiple images.
            */
        get multiSelect(): boolean;
        set multiSelect(newValue: boolean);
        /**
            * Returns true if item is checked
            * @param item image picker item value
            */
        isItemSelected(item: ItemValue): boolean;
        clearIncorrectValues(): void;
        /**
            * Show label under the image.
            */
        get showLabel(): boolean;
        set showLabel(newValue: boolean);
        endLoadingFromJson(): void;
        protected getValueCore(): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
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
            * The image fit mode.
            */
        get imageFit(): string;
        set imageFit(val: string);
        /**
            * The content mode.
            */
        get contentMode(): string;
        set contentMode(val: string);
        protected convertDefaultValue(val: any): any;
        get hasColumns(): boolean;
}

/**
    * A Model for image question. This question hasn't any functionality and can be used to improve the appearance of the survey.
    */
export declare class QuestionImageModel extends QuestionNonValue {
        constructor(name: string);
        getType(): string;
        get isCompositeQuestion(): boolean;
        /**
            * The image URL.
            */
        get imageLink(): string;
        set imageLink(val: string);
        get locImageLink(): LocalizableString;
        /**
            * The image alt text.
            */
        get text(): string;
        set text(val: string);
        get locText(): LocalizableString;
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
            * The image fit mode.
            */
        get imageFit(): string;
        set imageFit(val: string);
        /**
            * The content mode.
            */
        get contentMode(): string;
        set contentMode(val: string);
}

/**
    * A Model for signature pad question.
    */
export declare class QuestionSignaturePadModel extends Question {
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
            * Use it to set the specific dataFormat for the signature pad image data.
            * formats: "" (default) - png, "image/jpeg" - jpeg, "image/svg+xml" - svg
            */
        dataFormat: string;
        /**
            * Use it to set the specific width for the signature pad.
            */
        get width(): string;
        set width(val: string);
        /**
            * Use it to set the specific height for the signature pad.
            */
        get height(): string;
        set height(val: string);
        /**
            * Use it to clear content of the signature pad.
            */
        get allowClear(): boolean;
        set allowClear(val: boolean);
        /**
            * Use it to set pen color for the signature pad.
            */
        get penColor(): string;
        set penColor(val: string);
        /**
            * Use it to set background color for the signature pad.
            */
        get backgroundColor(): string;
        set backgroundColor(val: string);
        /**
            * The clear signature button caption.
            */
        get clearButtonCaption(): string;
        needShowPlaceholder(): boolean;
        get placeHolderText(): string;
}

export interface IQuestionPanelDynamicData {
        getItemIndex(item: ISurveyData): number;
        getPanelItemData(item: ISurveyData): any;
        setPanelItemData(item: ISurveyData, name: string, val: any): any;
        getSharedQuestionFromArray(name: string, panelIndex: number): Question;
        getSurvey(): ISurvey;
        getRootData(): ISurveyData;
}
export declare class QuestionPanelDynamicItem implements ISurveyData, ISurveyImpl {
        static ItemVariableName: string;
        static ParentItemVariableName: string;
        static IndexVariableName: string;
        constructor(data: IQuestionPanelDynamicData, panel: PanelModel);
        get panel(): PanelModel;
        setSurveyImpl(): void;
        getValue(name: string): any;
        setValue(name: string, newValue: any): void;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): void;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
}
export declare class QuestionPanelDynamicTemplateSurveyImpl implements ISurveyImpl {
        data: IQuestionPanelDynamicData;
        constructor(data: IQuestionPanelDynamicData);
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
}
/**
    * A Model for a panel dymanic question. You setup the template panel, but adding elements (any question or a panel) and assign a text to it's title, and this panel will be used as a template on creating dynamic panels. The number of panels is defined by panelCount property.
    * An end-user may dynamically add/remove panels, unless you forbidden this.
    */
export declare class QuestionPanelDynamicModel extends Question implements IQuestionPanelDynamicData {
        renderModeChangedCallback: () => void;
        panelCountChangedCallback: () => void;
        currentIndexChangedCallback: () => void;
        constructor(name: string);
        get hasSingleInput(): boolean;
        setSurveyImpl(value: ISurveyImpl, isLight?: boolean): void;
        getType(): string;
        get isCompositeQuestion(): boolean;
        clearOnDeletingContainer(): void;
        get isAllowTitleLeft(): boolean;
        removeElement(element: IElement): boolean;
        /**
            * The template Panel. This panel is used as a template on creatign dynamic panels
            * @see  templateElements
            * @see templateTitle
            * @see panelCount
            */
        get template(): PanelModel;
        getPanel(): IPanel;
        /**
            * The template Panel elements, questions and panels.
            * @see  templateElements
            * @see template
            * @see panelCount
            */
        get templateElements(): Array<IElement>;
        /**
            * The template Panel title property.
            * @see  templateElements
            * @see template
            * @see panelCount
            */
        get templateTitle(): string;
        set templateTitle(newValue: string);
        get locTemplateTitle(): LocalizableString;
        /**
            * The template Panel description property.
            * @see  templateElements
            * @see template
            * @see panelCount
            * @see templateTitle
            */
        get templateDescription(): string;
        set templateDescription(newValue: string);
        get locTemplateDescription(): LocalizableString;
        protected get items(): Array<ISurveyData>;
        /**
            * The array of dynamic panels created based on panel template
            * @see template
            * @see panelCount
            */
        get panels(): Array<PanelModel>;
        /**
            * The index of current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns -1, otherwise it returns a value from 0 to panelCount - 1.
            * @see currentPanel
            * @see panels
            * @see panelCount
            * @see renderMode
            */
        get currentIndex(): number;
        set currentIndex(val: number);
        /**
            * The current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns null.
            * @see currenIndex
            * @see panels
            * @see panelCount
            * @see renderMode
            */
        get currentPanel(): PanelModel;
        /**
            * Set it to true, to show a confirmation dialog on removing a panel
            * @see ConfirmDeleteText
            */
        get confirmDelete(): boolean;
        set confirmDelete(val: boolean);
        /**
            * Set it to a question name used in the template panel and the library shows duplication error, if there are same values in different panels of this question.
            * @see keyDuplicationError
            */
        get keyName(): string;
        set keyName(val: string);
        /**
            * Use this property to change the default text showing in the confirmation delete dialog on removing a panel.
            */
        get confirmDeleteText(): string;
        set confirmDeleteText(val: string);
        get locConfirmDeleteText(): LocalizableString;
        /**
            * The duplication value error text. Set it to show the text different from the default.
            * @see keyName
            */
        get keyDuplicationError(): string;
        set keyDuplicationError(val: string);
        get locKeyDuplicationError(): LocalizableString;
        /**
            * Use this property to change the default previous button text. Previous button shows the previous panel, change the currentPanel, when the renderMode doesn't equal to "list".
            * @see currentPanel
            * @see currentIndex
            * @see renderMode
            */
        get panelPrevText(): string;
        set panelPrevText(val: string);
        get locPanelPrevText(): LocalizableString;
        /**
            * Use this property to change the default next button text. Next button shows the next panel, change the currentPanel, when the renderMode doesn't equal to "list".
            * @see currentPanel
            * @see currentIndex
            * @see renderMode
            */
        get panelNextText(): string;
        set panelNextText(val: string);
        get locPanelNextText(): LocalizableString;
        /**
            * Use this property to change the default value of add panel button text.
            */
        get panelAddText(): string;
        set panelAddText(value: string);
        get locPanelAddText(): LocalizableString;
        /**
            * Use this property to change the default value of remove panel button text.
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
            * Returns true when currentIndex is more than 0.
            * @see currenIndex
            * @see currenPanel
            */
        get isPrevButtonShowing(): boolean;
        /**
            * Returns true when currentIndex is more than or equal 0 and less than panelCount - 1.
            * @see currenIndex
            * @see currenPanel
            * @see panelCount
            */
        get isNextButtonShowing(): boolean;
        /**
            * Returns true when showRangeInProgress equals to true, renderMode doesn't equal to "list" and panelCount is >= 2.
            */
        get isRangeShowing(): boolean;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        protected getValueCore(): any;
        protected setValueCore(newValue: any): void;
        /**
            * Use this property to get/set the number of dynamic panels.
            * @see template
            * @see minPanelCount
            * @see maxPanelCount
            * @see addPanel
            * @see removePanel
            * @see removePanelUI
            */
        get panelCount(): number;
        set panelCount(val: number);
        /**
            * Use this property to allow the end-user to collapse/expand the panels. It works only if the renderMode property equals to "list" and templateTitle property is not empty. The following values are available:
            * <br/> default - the default value. User can't collapse/expand panels
            * <br/> expanded - User can collapse/expand panels and all panels are expanded by default
            * <br/> collapsed - User can collapse/expand panels and all panels are collapsed by default
            * <br/> firstExpanded - User can collapse/expand panels. The first panel is expanded and others are collapsed
            * @see renderMode
            * @see templateTitle
            */
        get panelsState(): string;
        set panelsState(val: string);
        /**
            * The minimum panel count. A user could not delete a panel if the panelCount equals to minPanelCount
            * @see panelCount
            * @see maxPanelCount
            */
        get minPanelCount(): number;
        set minPanelCount(val: number);
        /**
            * The maximum panel count. A user could not add a panel if the panelCount equals to maxPanelCount
            * @see panelCount
            * @see minPanelCount
            */
        get maxPanelCount(): number;
        set maxPanelCount(val: number);
        /**
            * Set this property to false to hide the 'Add New' button
            * @see allowRemovePanel
            */
        get allowAddPanel(): boolean;
        set allowAddPanel(val: boolean);
        /**
            * Set this property to false to hide the 'Remove' button
            * @see allowAddPanel
            */
        get allowRemovePanel(): boolean;
        set allowRemovePanel(val: boolean);
        /**
            * Set this property different from "default" to set the specific question title location for the template questions.
            * @see SurveyModel.questionTitleLocation
            * @see PanelModelBase.questionTitleLocation
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
            * Use this property to change the location of the remove button relative to the panel.
            * By default the value is "bottom". You may set it to "right" and remove button will appear to the right of the panel.
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
        /**
            * Returns true when renderMode equals to "list".
            * @see renderMode
            */
        get isRenderModeList(): boolean;
        setVisibleIndex(value: number): number;
        /**
            * Returns true when an end user may add a new panel. The question is not read only and panelCount less than maxPanelCount
            * @see isReadOnly
            * @see panelCount
            * @see maxPanelCount
            */
        get canAddPanel(): boolean;
        /**
            * Returns true when an end user may remove a panel. The question is not read only and panelCount is more than minPanelCount
            * @see isReadOnly
            * @see panelCount
            * @see minPanelCount
            */
        get canRemovePanel(): boolean;
        protected rebuildPanels(): void;
        /**
            * If it is not empty, then this value is set to every new panel, including panels created initially, unless the defaultValue is not empty
            * @see defaultValue
            * @see defaultValueFromLastRow
            */
        get defaultPanelValue(): any;
        set defaultPanelValue(val: any);
        /**
            * Set it to true to copy the value into new added panel from the last panel. If defaultPanelValue is set and this property equals to true,
            * then the value for new added panel is merging.
            * @see defaultValue
            * @see defaultPanelValue
            */
        get defaultValueFromLastPanel(): boolean;
        set defaultValueFromLastPanel(val: boolean);
        protected isDefaultValueEmpty(): boolean;
        protected setDefaultValue(): void;
        isEmpty(): boolean;
        getProgressInfo(): IProgressInfo;
        /**
            * Add a new dynamic panel based on the template Panel. It checks if canAddPanel returns true and then calls addPanel method.
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
            */
        addPanel(): PanelModel;
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
            * Goes to the next panel in the PanelDynamic
            *
            */
        goToNextPanel(): void;
        /**
            * Goes to the previous panel in the PanelDynamic
            *
            */
        goToPrevPanel(): void;
        /**
            * Removes a dynamic panel from the panels array.
            * @param value a panel or panel index
            * @see panels
            * @see template
            */
        removePanel(value: any): void;
        locStrsChanged(): void;
        clearIncorrectValues(): void;
        clearErrors(): void;
        getQuestionFromArray(name: string, index: number): IQuestion;
        getSharedQuestionFromArray(name: string, panelIndex: number): Question;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        getConditionJson(operator?: string, path?: string): any;
        protected onReadOnlyChanged(): void;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected runPanelsCondition(values: HashTable<any>, properties: HashTable<any>): void;
        onAnyValueChanged(name: string): void;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        protected getContainsErrors(): boolean;
        protected getIsAnswered(): boolean;
        clearValueIfInvisible(): void;
        protected getIsRunningValidators(): boolean;
        getAllErrors(): Array<SurveyError>;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        protected createNewPanel(): PanelModel;
        protected createAndSetupNewPanelObject(): PanelModel;
        protected createNewPanelObject(): PanelModel;
        setQuestionValue(newValue: any): void;
        onSurveyValueChanged(newValue: any): void;
        protected onSetData(): void;
        getItemIndex(item: ISurveyData): number;
        getPanelItemData(item: ISurveyData): any;
        setPanelItemData(item: ISurveyData, name: string, val: any): void;
        getRootData(): ISurveyData;
        getPlainData(options?: {
                includeEmpty?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        updateElementCss(reNew?: boolean): void;
        get progressText(): string;
        getPanelWrapperCss(): string;
        getPanelRemoveButtonCss(): string;
        getAddButtonCss(): string;
        getPrevButtonCss(): string;
        getNextButtonCss(): string;
}

export declare var surveyTimerFunctions: {
    setTimeout: (func: () => any) => number;
    clearTimeout: (timerId: number) => void;
};
export declare class SurveyTimer {
    static get instance(): SurveyTimer;
    onTimer: Event<() => any, any>;
    start(func?: () => any): void;
    stop(func?: () => any): void;
    doTimer(): void;
}

export declare class SurveyProgressModel {
    static getProgressTextInBarCss(css: any): string;
    static getProgressTextUnderBarCss(css: any): string;
}

export declare class SurveyProgressButtonsModel {
    constructor(survey: SurveyModel);
    isListElementClickable(index: number): boolean;
    getListElementCss(index: number): string;
    getScrollButtonCss(hasScroller: boolean, isLeftScroll: boolean): string;
    clickListElement(index: number): void;
}

/**
    * The `Survey` object contains information about the survey, Pages, Questions, flow logic and etc.
    */
export declare class SurveyModel extends SurveyElementCore implements ISurvey, ISurveyData, ISurveyImpl, ISurveyTriggerOwner, ISurveyErrorOwner {
        static readonly TemplateRendererComponentName: string;
        [index: string]: any;
        static platform: string;
        get platformName(): string;
        /**
            * You can display an additional field (comment field) for the most of questions; users can enter additional comments to their response.
            * The comment field input is saved as `'question name' + 'commentPrefix'`.
            * @see data
            * @see Question.hasComment
            */
        get commentPrefix(): string;
        set commentPrefix(val: string);
        /**
            * The event is fired before the survey is completed and the `onComplete` event is fired. You can prevent the survey from completing by setting `options.allowComplete` to `false`
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.allowComplete` - Specifies whether a user can complete a survey. Set this property to `false` to prevent the survey from completing. The default value is `true`.
            * <br/> `options.isCompleteOnTrigger` - returns true if the survey is completing on "complete" trigger.
            * @see onComplete
            */
        onCompleting: EventBase<SurveyModel>;
        /**
            * The event is fired after a user clicks the 'Complete' button and finishes a survey. Use this event to send the survey data to your web server.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.showDataSaving(text)` - call this method to show that the survey is saving survey data on your server. The `text` is an optional parameter to show a custom message instead of default.
            * <br/> `options.showDataSavingError(text)` - call this method to show that an error occurred while saving the data on your server. If you want to show a custom error, use an optional `text` parameter.
            * <br/> `options.showDataSavingSuccess(text)` - call this method to show that the data was successfully saved on the server.
            * <br/> `options.showDataSavingClear` - call this method to hide the text about the saving progress.
            * <br/> `options.isCompleteOnTrigger` - returns true if the survey is completed on "complete" trigger.
            *  @see data
            * @see clearInvisibleValues
            * @see completeLastPage
            * @see surveyPostId
            */
        onComplete: EventBase<SurveyModel>;
        /**
            * The event is fired before the survey is going to preview mode, state equals to `preview`. It happens when a user click on "Preview" button. It shows when "showPreviewBeforeComplete" proeprty equals to "showAllQuestions" or "showAnsweredQuestions".
            * You can prevent showing it by setting allowShowPreview to `false`.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.allowShowPreview` - Specifies whether a user can see a preview. Set this property to `false` to prevent from showing the preview. The default value is `true`.
            * @see showPreviewBeforeComplete
            */
        onShowingPreview: EventBase<SurveyModel>;
        /**
            * The event is fired after a user clicks the 'Complete' button. The event allows you to specify the URL opened after completing a survey.
            * Specify the `navigateToUrl` property to make survey navigate to another url.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.url` - Specifies a URL opened after completing a survey. Set this property to an empty string to cancel the navigation and show the completed survey page.
            * @see navigateToUrl
            * @see navigateToUrlOnCondition
            */
        onNavigateToUrl: EventBase<SurveyModel>;
        /**
            * The event is fired after the survey changed it's state from "starting" to "running". The "starting" state means that survey shows the started page.
            * The `firstPageIsStarted` property should be set to `true`, if you want to display a start page in your survey. In this case, an end user should click the "Start" button to start the survey.
            * @see firstPageIsStarted
            */
        onStarted: EventBase<SurveyModel>;
        /**
            * The event is fired on clicking the 'Next' button if the `sendResultOnPageNext` is set to `true`. You can use it to save the intermediate results, for example, if your survey is large enough.
            * <br/> `sender` - the survey object that fires the event.
            * @see sendResultOnPageNext
            */
        onPartialSend: EventBase<SurveyModel>;
        /**
            * The event is fired before the current page changes to another page. Typically it happens when a user click the 'Next' or 'Prev' buttons.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `option.oldCurrentPage` - the previous current/active page.
            * <br/> `option.newCurrentPage` - a new current/active page.
            * <br/> `option.allowChanging` - set it to `false` to disable the current page changing. It is `true` by default.
            * <br/> `option.isNextPage` - commonly means, that end-user press the next page button. In general, it means that options.newCurrentPage is the next page after options.oldCurrentPage
            * <br/> `option.isPrevPage` - commonly means, that end-user press the previous page button. In general, it means that options.newCurrentPage is the previous page before options.oldCurrentPage
            * @see currentPage
            * @see currentPageNo
            * @see nextPage
            * @see prevPage
            * @see completeLastPage
            * @see onCurrentPageChanged
            **/
        onCurrentPageChanging: EventBase<SurveyModel>;
        /**
            * The event is fired when the current page has been changed to another page. Typically it happens when a user click on 'Next' or 'Prev' buttons.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `option.oldCurrentPage` - a previous current/active page.
            * <br/> `option.newCurrentPage` - a new current/active page.
            * <br/> `option.isNextPage` - commonly means, that end-user press the next page button. In general, it means that options.newCurrentPage is the next page after options.oldCurrentPage
            * <br/> `option.isPrevPage` - commonly means, that end-user press the previous page button. In general, it means that options.newCurrentPage is the previous page before options.oldCurrentPage
            * @see currentPage
            * @see currentPageNo
            * @see nextPage
            * @see prevPage
            * @see completeLastPage
            * @see onCurrentPageChanging
            */
        onCurrentPageChanged: EventBase<SurveyModel>;
        /**
            * The event is fired before the question value (answer) is changed. It can be done via UI by a user or programmatically on calling the `setValue` method.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the value name that has being changed.
            * <br/> `options.question` - a question which `question.name` equals to the value name. If there are several questions with the same name, the first question is used. If there is no such questions, the `options.question` is null.
            * <br/> `options.oldValue` - an old, previous value.
            * <br/> `options.value` - a new value. You can change it.
            * @see setValue
            * @see onValueChanged
            */
        onValueChanging: EventBase<SurveyModel>;
        /**
            * The event is fired when the question value (i.e., answer) has been changed. The question value can be changed in UI (by a user) or programmatically (on calling `setValue` method).
            * Use the `onDynamicPanelItemValueChanged` and `onMatrixCellValueChanged` events to handle changes in a question in the Panel Dynamic and a cell question in matrices.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the value name that has been changed.
            * <br/> `options.question` - a question which `question.name` equals to the value name. If there are several questions with the same name, the first question is used. If there is no such questions, the `options.question` is `null`.
            * <br/> `options.value` - a new value.
            * @see setValue
            * @see onValueChanging
            * @see onDynamicPanelItemValueChanged
            * @see onMatrixCellValueChanged
            */
        onValueChanged: EventBase<SurveyModel>;
        /**
            * The event is fired when setVariable function is called. It can be called on changing a calculated value.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the variable name that has been changed.
            * <br/> `options.value` - a new value.
            * @see setVariable
            * @see onValueChanged
            * @see calculatedValues
            */
        onVariableChanged: EventBase<SurveyModel>;
        /**
            * The event is fired when a question visibility has been changed.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question which visibility has been changed.
            * <br/> `options.name` - a question name.
            * <br/> `options.visible` - a question `visible` boolean value.
            * @see Question.visibile
            * @see Question.visibileIf
            */
        onVisibleChanged: EventBase<SurveyModel>;
        /**
            * The event is fired on changing a page visibility.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page which visibility has been changed.
            * <br/> `options.visible` - a page `visible` boolean value.
            * @see PageModel.visibile
            * @see PageModel.visibileIf
            */
        onPageVisibleChanged: EventBase<SurveyModel>;
        /**
            * The event is fired on changing a panel visibility.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a panel which visibility has been changed.
            * <br/> `options.visible` - a panel `visible` boolean value.
            * @see PanelModel.visibile
            * @see PanelModel.visibileIf
            */
        onPanelVisibleChanged: EventBase<SurveyModel>;
        /**
            * The event is fired on creating a new question.
            * Unlike the onQuestionAdded event, this event calls for all question created in survey including inside: a page, panel, matrix cell, dynamic panel and multiple text.
            * or inside a matrix cell or it can be a text question in multiple text items or inside a panel of a panel dynamic.
            * You can use this event to set up properties to a question based on it's type for all questions, regardless where they are located, on the page or inside a matrix cell.
            * Please note: If you want to use this event for questions loaded from JSON then you have to create survey with empty/null JSON parameter, assign the event and call survey.fromJSON(yourJSON) function.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a newly created question object.
            * @see Question
            * @see onQuestionAdded
            */
        onQuestionCreated: EventBase<SurveyModel>;
        /**
            * The event is fired on adding a new question into survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a newly added question object.
            * <br/> `options.name` - a question name.
            * <br/> `options.index` - an index of the question in the container (page or panel).
            * <br/> `options.parentPanel` - a container where a new question is located. It can be a page or panel.
            * <br/> `options.rootPanel` - typically, it is a page.
            * @see Question
            * @see onQuestionCreated
            */
        onQuestionAdded: EventBase<SurveyModel>;
        /**
            * The event is fired on removing a question from survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a removed question object.
            * <br/> `options.name` - a question name.
            * @see Question
            */
        onQuestionRemoved: EventBase<SurveyModel>;
        /**
            * The event is fired on adding a panel into survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a newly added panel object.
            * <br/> `options.name` - a panel name.
            * <br/> `options.index` - an index of the panel in the container (a page or panel).
            * <br/> `options.parentPanel` - a container (a page or panel) where a new panel is located.
            * <br/> `options.rootPanel` - a root container, typically it is a page.
            * @see PanelModel
            */
        onPanelAdded: EventBase<SurveyModel>;
        /**
            * The event is fired on removing a panel from survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a removed panel object.
            * <br/> `options.name` - a panel name.
            * @see PanelModel
            */
        onPanelRemoved: EventBase<SurveyModel>;
        /**
            * The event is fired on adding a page into survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a newly added `panel` object.
            * @see PanelModel
            */
        onPageAdded: EventBase<SurveyModel>;
        /**
            * The event is fired on validating value in a question. You can specify a custom error message using `options.error`. The survey blocks completing the survey or going to the next page when the error messages are displayed.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a validated question.
            * <br/> `options.name` - a question name.
            * <br/> `options.value` - the current question value (answer).
            * <br/> `options.error` - an error string. It is empty by default.
            * @see onServerValidateQuestions
            * @see onSettingQuestionErrors
            */
        onValidateQuestion: EventBase<SurveyModel>;
        /**
            * The event is fired before errors are assigned to a question. You may add/remove/modify errors for a question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a validated question.
            * <br/> `options.errors` - the list of errors. The list is empty by default and remains empty if a validated question has no errors.
            * @see onValidateQuestion
            */
        onSettingQuestionErrors: EventBase<SurveyModel>;
        /**
            * Use this event to validate data on your server.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.data` - the values of all non-empty questions on the current page. You can get a question value as `options.data["myQuestionName"]`.
            * <br/> `options.errors` - set your errors to this object as: `options.errors["myQuestionName"] = "Error text";`. It will be shown as a question error.
            * <br/> `options.complete()` - call this function to tell survey that your server callback has been processed.
            * @see onValidateQuestion
            * @see onValidatePanel
            */
        onServerValidateQuestions: any;
        /**
            * The event is fired on validating a panel. Set your error to `options.error` and survey will show the error for the panel and block completing the survey or going to the next page.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - a panel name.
            * <br/> `options.error` - an error string. It is empty by default.
            * @see onValidateQuestion
            */
        onValidatePanel: EventBase<SurveyModel>;
        /**
            * Use the event to change the default error text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.text` - an error text.
            * <br/> `options.error` - an instance of the `SurveyError` object.
            * <br/> `options.name` - the error name. The following error names are available:
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
            * `options.html` - specifies the modified HTML content.
            * @see completedHtml
            * @see loadingHtml
            */
        onProcessHtml: EventBase<SurveyModel>;
        /**
            * Use this event to change the question title in code. If you want to remove question numbering then set showQuestionNumbers to "off".
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.title` - a calculated question title, based on question `title`, `name`.
            * <br/> `options.question` - a question object.
            * @see showQuestionNumbers
            * @see requiredText
            */
        onGetQuestionTitle: EventBase<SurveyModel>;
        /**
            * Use this event to change the element title tag name that renders by default.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - an element (question, panel, page and survey) that SurveyJS is going to render.
            * <br/> `options.tagName` - an element title tagName that are used to render a title. You can change it from the default value.
            * @see showQuestionNumbers
            * @see requiredText
            */
        onGetTitleTagName: EventBase<SurveyModel>;
        /**
            * Use this event to change the question no in code. If you want to remove question numbering then set showQuestionNumbers to "off".
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.no` - a calculated question no, based on question `visibleIndex`, survey `.questionStartIndex` properties. You can change it.
            * <br/> `options.question` - a question object.
            * @see showQuestionNumbers
            * @see questionStartIndex
            */
        onGetQuestionNo: EventBase<SurveyModel>;
        /**
            * Use this event to change the progress text in code.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.text` - a progress text, that SurveyJS will render in progress bar.
            * <br/> `options.questionCount` - a number of questions that have input(s). We do not count html or expression questions
            * <br/> `options.answeredQuestionCount` - a number of questions that have input(s) and an user has answered.
            * <br/> `options.requiredQuestionCount` - a number of required questions that have input(s). We do not count html or expression questions
            * <br/> `options.requiredAnsweredQuestionCount` - a number of required questions that have input(s) and an user has answered.
            *  @see progressBarType
            */
        onProgressText: EventBase<SurveyModel>;
        /**
            * Use this event to process the markdown text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
            * <br/> `options.name` - a property name is going to be rendered.
            * <br/> `options.text` - a text that is going to be rendered.
            * <br/> `options.html` - an HTML content. It is `null` by default. Use this property to specify the HTML content rendered instead of `options.text`.
            */
        onTextMarkdown: EventBase<SurveyModel>;
        /**
            * Use this event to specity render component name used for text rendering.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
            * <br/> `options.name` - a property name is going to be rendered.
            * <br/> `options.renderAs` - a component name used for text rendering.
            */
        onTextRenderAs: EventBase<SurveyModel>;
        /**
            * The event fires when it gets response from the [api.surveyjs.io](https://api.surveyjs.io) service on saving survey results. Use it to find out if the results have been saved successfully.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.success` - it is `true` if the results has been sent to the service successfully.
            * <br/> `options.response` - a response from the service.
            */
        onSendResult: EventBase<SurveyModel>;
        /**
            * Use it to get results after calling the `getResult` method. It returns a simple analytics from [api.surveyjs.io](https://api.surveyjs.io) service.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.success` - it is `true` if the results were got from the service successfully.
            * <br/> `options.data` - the object `{AnswersCount, QuestionResult : {} }`. `AnswersCount` is the number of posted survey results. `QuestionResult` is an object with all possible unique answers to the question and number of these answers.
            * <br/> `options.dataList` - an array of objects `{name, value}`, where `name` is a unique value/answer to the question and `value` is a number/count of such answers.
            * <br/> `options.response` - the server response.
            * @see getResult
            */
        onGetResult: EventBase<SurveyModel>;
        /**
            * The event is fired on uploading the file in QuestionFile when `storeDataAsText` is set to `false`. Use this event to change the uploaded file name or to prevent a particular file from being uploaded.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the file question instance.
            * <br/> `options.name` - the question name.
            * <br/> `options.files` - the Javascript File objects array to upload.
            * <br/> `options.callback` - a callback function to get the file upload status and the updloaded file content.
            * @see uploadFiles
            * @see QuestionFileModel.storeDataAsText
            * @see onDownloadFile
            * @see onClearFiles
            * @see [View Examples](https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fsurveyjs.io%2FExamples%2F+%22onUploadFiles%22)
            */
        onUploadFiles: EventBase<SurveyModel>;
        /**
            * The event is fired on downloading a file in QuestionFile. Use this event to pass the file to a preview.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the question name.
            * <br/> `options.content` - the file content.
            * <br/> `options.fileValue` - single file question value.
            * <br/> `options.callback` - a callback function to get the file downloading status and the downloaded file content.
            * @see downloadFile
            * @see onClearFiles
            * @see onUploadFiles
            * @see [View Examples](https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fsurveyjs.io%2FExamples%2F+%22onDownloadFile%22)
            */
        onDownloadFile: EventBase<SurveyModel>;
        /**
            * This event is fired on clearing the value in a QuestionFile. Use this event to remove files stored on your server.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `question` - the question instance.
            * <br/> `options.name` - the question name.
            * <br/> `options.value` - the question value.
            * <br/> `options.fileName` - a removed file's name, set it to `null` to clear all files.
            * <br/> `options.callback` - a callback function to get the operation status.
            * @see clearFiles
            * @see onDownloadFile
            * @see onUploadFiles
            * @see [View Examples](https://www.google.com/search?q=site%3Ahttps%3A%2F%2Fsurveyjs.io%2FExamples%2F+%22onClearFiles%22)
            */
        onClearFiles: EventBase<SurveyModel>;
        /**
            * The event is fired after choices for radiogroup, checkbox, and dropdown has been loaded from a RESTful service and before they are assigned to a question.
            * You may change the choices, before they are assigned or disable/enabled make visible/invisible question, based on loaded results.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `question` - the question where loaded choices are going to be assigned.
            * <br/> `choices` - the loaded choices. You can change the loaded choices to before they are assigned to question.
            * <br/> `serverResult` - a result that comes from the server as it is.
            */
        onLoadChoicesFromServer: EventBase<SurveyModel>;
        /**
            * The event is fired after survey is loaded from api.surveyjs.io service.
            * You can use this event to perform manipulation with the survey model after it was loaded from the web service.
            * <br/> `sender` - the survey object that fires the event.
            * @see surveyId
            * @see loadSurveyFromService
            */
        onLoadedSurveyFromService: EventBase<SurveyModel>;
        /**
            * The event is fired on processing the text when it finds a text in brackets: `{somevalue}`. By default, it uses the value of survey question values and variables.
            * For example, you may use the text processing in loading choices from the web. If your `choicesByUrl.url` equals to "UrlToServiceToGetAllCities/{country}/{state}",
            * you may set on this event `options.value` to "all" or empty string when the "state" value/question is non selected by a user.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the name of the processing value, for example, "state" in our example.
            * <br/> `options.value` - the value of the processing text.
            * <br/> `options.isExists` - a boolean value. Set it to `true` if you want to use the value and set it to `false` if you don't.
            */
        onProcessTextValue: EventBase<SurveyModel>;
        /**
            * The event is fired before rendering a question. Use it to override the default question CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{root: "table", button: "button"}`. You can change them to your own CSS classes.
            */
        onUpdateQuestionCssClasses: EventBase<SurveyModel>;
        /**
            * The event is fired before rendering a panel. Use it to override the default panel CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a panel for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
            */
        onUpdatePanelCssClasses: EventBase<SurveyModel>;
        /**
            * The event is fired before rendering a page. Use it to override the default page CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
            */
        onUpdatePageCssClasses: EventBase<SurveyModel>;
        /**
            * The event is fired before rendering a choice item in radiogroup, checkbox or dropdown questions. Use it to override the default choice item css.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question where choice item is rendered.
            * <br/> `options.item` - a choice item of ItemValue type. You can get value or text choice properties as options.item.value or options.choice.text
            * <br/> `options.css` - a string with css classes divided by space. You can change it.
            */
        onUpdateChoiceItemCss: EventBase<SurveyModel>;
        /**
            * The event is fired right after survey is rendered in DOM.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.htmlElement` - a root HTML element bound to the survey object.
            */
        onAfterRenderSurvey: EventBase<SurveyModel>;
        /**
            * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.htmlElement` - an HTML element bound to the survey header object.
            */
        onAfterRenderHeader: EventBase<SurveyModel>;
        /**
            * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page object for which the event is fired. Typically the current/active page.
            * <br/> `options.htmlElement` - an HTML element bound to the page object.
            */
        onAfterRenderPage: EventBase<SurveyModel>;
        /**
            * The event is fired right after a question is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question object for which the event is fired.
            * <br/> `options.htmlElement` - an HTML element bound to the question object.
            */
        onAfterRenderQuestion: EventBase<SurveyModel>;
        /**
            * The event is fired right after a non-composite question (text, comment, dropdown, radiogroup, checkbox) is rendered in DOM. Use it to modify HTML elements.
            * This event is not fired for matrices, panels, multiple text and image picker.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question object for which the event is fired.
            * <br/> `options.htmlElement` - an HTML element bound to the question object.
            */
        onAfterRenderQuestionInput: EventBase<SurveyModel>;
        /**
            * The event is fired right after a panel is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.panel` - a panel object for which the event is fired
            * <br/> `options.htmlElement` - an HTML element bound to the panel object
            */
        onAfterRenderPanel: EventBase<SurveyModel>;
        /**
            * The event occurs when an element within a question gets focus.
            * <br/> `sender` - A [survey](https://surveyjs.io/Documentation/Library?id=surveymodel) object that fires the event.
            * <br/> `options.question` - A [question](https://surveyjs.io/Documentation/Library?id=Question) whose child element gets focus.
            * @see onFocusInPanel
            */
        onFocusInQuestion: EventBase<SurveyModel>;
        /**
            * The event occurs when an element within a panel gets focus.
            * <br/> `sender` - A [survey](https://surveyjs.io/Documentation/Library?id=surveymodel) object that fires the event.
            * <br/> `options.panel` - A [panel](https://surveyjs.io/Documentation/Library?id=PanelModelBase) whose child element gets focus.
            * @see onFocusInQuestion
            */
        onFocusInPanel: EventBase<SurveyModel>;
        /**
            * The event is fired on adding a new row in Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.row` - a new added row.
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            */
        onMatrixRowAdded: EventBase<SurveyModel>;
        /**
            * The event is fired before adding a new row in Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.canAddRow` - specifies whether a new row can be added
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            */
        onMatrixBeforeRowAdded: EventBase<SurveyModel>;
        /**
            * The event is fired before removing a row from Matrix Dynamic question. You can disable removing and clear the data instead.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.rowIndex` - a row index.
            * <br/> `options.row` - a row object.
            * <br/> `options.allow` - a boolean property. Set it to `false` to disable the row removing.
            * @see QuestionMatrixDynamicModel
            * @see onMatrixRowRemoved
            * @see onMatrixAllowRemoveRow
            */
        onMatrixRowRemoving: EventBase<SurveyModel>;
        /**
            * The event is fired on removing a row from Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question
            * <br/> `options.rowIndex` - a removed row index
            * <br/> `options.row` - a removed row object
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            * @see onMatrixRowRemoving
            * @see onMatrixAllowRemoveRow
            */
        onMatrixRowRemoved: EventBase<SurveyModel>;
        /**
            * The event is fired before rendering "Remove" button for removing a row from Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.rowIndex` - a row index.
            * <br/> `options.row` - a row object.
            * <br/> `options.allow` - a boolean property. Set it to `false` to disable the row removing.
            * @see QuestionMatrixDynamicModel
            * @see onMatrixRowRemoving
            * @see onMatrixRowRemoved
            */
        onMatrixAllowRemoveRow: EventBase<SurveyModel>;
        /**
            * The event is fired before creating cell question in the matrix. You can change the cell question type by setting different options.cellType.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the matrix question.
            * <br/> `options.cellType` - the cell question type. You can change it.
            * <br/> `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
            * <br/> `options.column` - the matrix column object.
            * <br/> `options.columnName` - the matrix column name.
            * <br/> `options.row` - the matrix row object.
            * @see onMatrixBeforeRowAdded
            * @see onMatrixCellCreated
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixCellCreating: EventBase<SurveyModel>;
        /**
             * The event is fired for every cell created in Matrix Dynamic and Matrix Dropdown questions.
             * <br/> `sender` - the survey object that fires the event.
             * <br/> `options.question` - the matrix question.
             * <br/> `options.cell` - the matrix cell.
             * <br/> `options.cellQuestion` - the question/editor in the cell. You may customize it, change it's properties, like choices or visible.
             * <br/> `options.rowValue` - the value of the current row. To access a particular column's value within the current row, use: `options.rowValue["columnValue"]`.
             * <br/> `options.column` - the matrix column object.
             * <br/> `options.columnName` - the matrix column name.
             * <br/> `options.row` - the matrix row object.
             * @see onMatrixBeforeRowAdded
             * @see onMatrixCellCreating
             * @see onMatrixRowAdded
             * @see QuestionMatrixDynamicModel
             * @see QuestionMatrixDropdownModel
             */
        onMatrixCellCreated: EventBase<SurveyModel>;
        /**
            * The event is fired for every cell after is has been rendered in DOM.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the matrix question.
            * <br/> `options.cell` - the matrix cell.
            * <br/> `options.cellQuestion` - the question/editor in the cell.
            * <br/> `options.htmlElement` - an HTML element bound to the `cellQuestion` object.
            * <br/> `options.column` - the matrix column object.
            * <br/> `options.row` - the matrix row object.
            * @see onMatrixCellCreated
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixAfterCellRender: EventBase<SurveyModel>;
        /**
            * The event is fired when cell value is changed in Matrix Dynamic and Matrix Dropdown questions.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the matrix question.
            * <br/> `options.columnName` - the matrix column name.
            * <br/> `options.value` - a new value.
            * <br/> `options.row` - the matrix row object.
            * <br/> `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
            * @see onMatrixCellValueChanging
            * @see onMatrixBeforeRowAdded
            * @see onMatrixRowAdded
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixCellValueChanged: EventBase<SurveyModel>;
        /**
            * The event is fired on changing cell value in Matrix Dynamic and Matrix Dropdown questions. You may change the `options.value` property to change a cell value.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the matrix question.
            * <br/> `options.columnName` - the matrix column name.
            * <br/> `options.value` - a new value.
            * <br/> `options.oldValue` - the old value.
            * <br/> `options.row` - the matrix row object.
            * <br/> `options.getCellQuestion(columnName)` - the function that returns a cell question by column name.
            * @see onMatrixCellValueChanged
            * @see onMatrixBeforeRowAdded
            * @see onMatrixRowAdded
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixCellValueChanging: EventBase<SurveyModel>;
        /**
            * The event is fired when Matrix Dynamic and Matrix Dropdown questions validate the cell value.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.error` - an error string. It is empty by default.
            * <br/> `options.question` - the matrix question.
            * <br/> `options.columnName` - the matrix column name.
            * <br/> `options.value` - a cell value.
            * <br/> `options.row` - the matrix row object.
            * <br/> `options.getCellQuestion(columnName)` - the function that returns the cell question by column name.
            * @see onMatrixBeforeRowAdded
            * @see onMatrixRowAdded
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixCellValidate: EventBase<SurveyModel>;
        /**
            * The event is fired on adding a new panel in Panel Dynamic question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a panel question.
            * <br/> `options.panel` - an added panel.
            * @see QuestionPanelDynamicModel
            * @see QuestionPanelDynamicModel.panels
            */
        onDynamicPanelAdded: EventBase<SurveyModel>;
        /**
            * The event is fired on removing a panel from Panel Dynamic question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a panel question.
            * <br/> `options.panelIndex` - a removed panel index.
            * <br/> `options.panel` - a removed panel.
            * @see QuestionPanelDynamicModel
            * @see QuestionPanelDynamicModel.panels
            */
        onDynamicPanelRemoved: EventBase<SurveyModel>;
        /**
            * The event is fired every second if the method `startTimer` has been called.
            * @see startTimer
            * @see timeSpent
            * @see Page.timeSpent
            */
        onTimer: EventBase<SurveyModel>;
        /**
            * The event is fired before displaying a new information in the Timer Panel. Use it to change the default text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.text` - the timer panel info text.
            */
        onTimerPanelInfoText: EventBase<SurveyModel>;
        /**
            * The event is fired when item value is changed in Panel Dynamic question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the panel question.
            * <br/> `options.panel` - the dynamic panel item.
            * <br/> `options.name` - the item name.
            * <br/> `options.value` - a new value.
            * <br/> `options.itemIndex` - the panel item index.
            * <br/> `options.itemValue` - the panel item object.
            * @see onDynamicPanelAdded
            * @see QuestionPanelDynamicModel
            */
        onDynamicPanelItemValueChanged: EventBase<SurveyModel>;
        /**
            * Use this event to define, whether an answer to a question is correct or not.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question on which you have to decide if the answer is correct or not.
            * <br/> `options.result` - returns `true`, if an answer is correct, or `false`, if the answer is not correct. Use questions' `value` and `correctAnswer` properties to return the correct value.
            * <br/> `options.correctAnswers` - you may change the default number of correct or incorrect answers in the question, for example for matrix, where each row is a quiz question.
            * @see Question.value
            * @see Question.correctAnswer
            */
        onIsAnswerCorrect: EventBase<SurveyModel>;
        /**
            * Use this event to control drag&drop operations during design mode.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.allow` - set it to `false` to disable dragging.
            * <br/> `options.target` - a target element that is dragged.
            * <br/> `options.source` - a source element. It can be `null`, if it is a new element, dragging from toolbox.
            * <br/> `options.parent` - a page or panel where target element is dragging.
            * <br/> `options.insertBefore` - an element before the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging an element after the last element in a container.
            * <br/> `options.insertAfter` - an element after the target element is dragging. It can be `null` if parent container (page or panel) is empty or dragging element to the first position within the parent container.
            * @see setDesignMode
            * @see isDesignMode
            */
        onDragDropAllow: EventBase<SurveyModel>;
        /**
            * Use this event to control scrolling element to top. You can cancel the default behavior by setting options.cancel property to true.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - an element that is going to be scrolled on top.
            * <br/> `options.question` - a question that is going to be scrolled on top. It can be null if options.page is not null.
            * <br/> `options.page` - a page that is going to be scrolled on top. It can be null if options.question is not null.
            * <br/> `options.elementId` - the unique element DOM Id.
            * <br/> `options.cancel` - set this property to true to cancel the default scrolling.
            */
        onScrollingElementToTop: EventBase<SurveyModel>;
        onLocaleChangedEvent: EventBase<SurveyModel>;
        /**
            * Use this event to create/customize actions to be displayed in a question's title.
            * <br/> `sender` - A [Survey](https://surveyjs.io/Documentation/Library?id=SurveyModel) object that fires the event.
            * <br/> `options.question` - A [Question](https://surveyjs.io/Documentation/Library?id=Question) object for which the event is fired.
            * <br/> `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed question.
            * @see IAction
            * @see Question
            */
        onGetQuestionTitleActions: EventBase<SurveyModel>;
        /**
            * Use this event to create/customize actions to be displayed in a panel's title.
            * <br/> `sender` - A survey object that fires the event.
            * <br/> `options.panel` - A panel ([PanelModel](https://surveyjs.io/Documentation/Library?id=panelmodel) object) for which the event is fired.
            * <br/> `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed panel.
            * @see IAction
            * @see PanelModel
            */
        onGetPanelTitleActions: EventBase<SurveyModel>;
        /**
            * Use this event to create/customize actions to be displayed in a page's title.
            * <br/> `sender` - A survey object that fires the event.
            * <br/> `options.page` - A page ([PageModel](https://surveyjs.io/Documentation/Library?id=pagemodel) object) for which the event is fired.
            * <br/> `options.titleActions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed page.
            * @see IAction
            * @see PageModel
            */
        onGetPageTitleActions: EventBase<SurveyModel>;
        /**
            * Use this event to create/customize actions to be displayed in a matrix question's row.
            * <br/> `sender` - A survey object that fires the event.
            * <br/> `options.question` - A matrix question ([QuestionMatrixBaseModel](https://surveyjs.io/Documentation/Library?id=questionmatrixbasemodel) object) for which the event is fired.
            * <br/> `options.row` - A matrix row for which the event is fired.
            * <br/> `options.actions` - A list of actions ([IAction](https://surveyjs.io/Documentation/Library?id=IAction) objects) associated with the processed matrix question and row.
            * @see IAction
            * @see QuestionMatrixDropdownModelBase
            */
        onGetMatrixRowActions: EventBase<SurveyModel>;
        /**
            * The event is fired after the survey element content was collapsed or expanded.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - Specifies which survey element content was collapsed or expanded.
            * @see onElementContentVisibilityChanged
            */
        onElementContentVisibilityChanged: EventBase<SurveyModel>;
        /**
            * The event is fired before expression question convert it's value into display value for rendering.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - The expression question.
            * <br/> `options.value` - The question value.
            * <br/> `options.displayValue` - the display value that you can change before rendering.
            */
        onGetExpressionDisplayValue: EventBase<SurveyModel>;
        constructor(jsonObj?: any);
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
        getCss(): any;
        get css(): any;
        set css(value: any);
        get cssTitle(): string;
        get cssNavigationComplete(): string;
        get cssNavigationPreview(): string;
        get cssNavigationEdit(): string;
        get cssNavigationPrev(): string;
        get cssNavigationStart(): string;
        get cssNavigationNext(): string;
        get completedCss(): string;
        /**
            * By default all rows are rendered no matters if they are visible or not.
            * Set it true, and survey markup rows will be rendered only if they are visible in viewport.
            * This feature is experimantal and might do not support all the use cases.
            */
        get lazyRendering(): boolean;
        set lazyRendering(val: boolean);
        get isLazyRendering(): boolean;
        /**
            * Gets or sets a list of triggers in the survey.
            * @see SurveyTrigger
            */
        get triggers(): Array<SurveyTrigger>;
        set triggers(val: Array<SurveyTrigger>);
        /**
            * Gets or sets a list of calculated values in the survey.
            * @see CalculatedValue
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
            * Gets or sets whether to save survey results on completing every page. If the property value is set to `true`, the `onPartialSend` event is fired.
            * @see onPartialSend
            * @see clientId
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
            */
        get showTitle(): boolean;
        set showTitle(val: boolean);
        /**
            * Gets or sets whether the Survey displays page titles. Set it to `false` to hide page titles.
            * @see PageModel.title
            */
        get showPageTitles(): boolean;
        set showPageTitles(val: boolean);
        /**
            * On finishing the survey the complete page is shown. Set the property to `false`, to hide the complete page.
            * @see data
            * @see onComplete
            * @see navigateToUrl
            */
        get showCompletedPage(): boolean;
        set showCompletedPage(val: boolean);
        /**
            * Set this property to a url you want to navigate after a user completing the survey.
            * By default it uses after calling onComplete event. In case calling options.showDataSaving callback in onComplete event, navigateToUrl will be used on calling options.showDataSavingSuccess callback.
            */
        get navigateToUrl(): string;
        set navigateToUrl(val: string);
        /**
            * Gets or sets a list of URL condition items. If the expression of this item returns `true`, then survey will navigate to the item URL.
            * @see UrlConditionItem
            * @see navigateToUrl
            */
        get navigateToUrlOnCondition(): Array<UrlConditionItem>;
        set navigateToUrlOnCondition(val: Array<UrlConditionItem>);
        getNavigateToUrl(): string;
        /**
            * Gets or sets the required question mark. The required question mark is a char or string that is rendered in the required questions' titles.
            * @see Question.title
            */
        get requiredText(): string;
        set requiredText(val: string);
        /**
            * Gets or sets whether to hide all required errors.
            */
        hideRequiredErrors: boolean;
        beforeSettingQuestionErrors(question: IQuestion, errors: Array<SurveyError>): void;
        beforeSettingPanelErrors(question: IPanel, errors: Array<SurveyError>): void;
        /**
            * Gets or sets the first question index. The first question index is '1' by default. You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
            * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
            * @see Question.title
            * @see requiredText
            */
        get questionStartIndex(): string;
        set questionStartIndex(val: string);
        /**
            * Gets or sets whether the "Others" option text is stored as question comment.
            *
            * By default the entered text in the "Others" input in the checkbox/radiogroup/dropdown is stored as `"question name " + "-Comment"`. The value itself is `"question name": "others"`.
            * Set this property to `false`, to store the entered text directly in the `"question name"` key.
            * @see commentPrefix
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
            * @see Question.hasComment
            * @see Question.hasOther
            * @see maxTextLength
            */
        get maxOthersLength(): number;
        set maxOthersLength(val: number);
        /**
            * Gets or ses whether a user can navigate the next page automatically after answering all the questions on a page without pressing the "Next" button.
            * The available options:
            *
            * - `true` - navigate the next page and submit survey data automatically.
            * - `autogonext` - navigate the next page automatically but do not submit survey data.
            * - `false` - do not navigate the next page and do not submit survey data automatically.
            * @see showNavigationButtons
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
        /**
            * Gets or sets the survey locale. The default value it is empty, this means the 'en' locale is used.
            * You can set it to 'de' - German, 'fr' - French and so on. The library has built-in localization for several languages. The library has a multi-language support as well.
            */
        get locale(): string;
        set locale(value: string);
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
        getProcessedText(text: string): string;
        getLocString(str: string): any;
        getErrorCustomText(text: string, error: SurveyError): string;
        /**
            * Returns the text that is displayed when there are no any visible pages and questiona.
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
        get isLogoBefore(): boolean;
        get isLogoAfter(): boolean;
        get logoClassNames(): string;
        get renderedHasTitle(): boolean;
        get hasTitle(): boolean;
        get renderedHasLogo(): boolean;
        get renderedHasHeader(): boolean;
        /**
            * The logo fit mode.
            * @see logo
            */
        get logoFit(): string;
        set logoFit(val: string);
        setIsMobile(newVal?: boolean): void;
        protected isLogoImageChoosen(): string;
        get titleMaxWidth(): string;
        /**
            * Gets or sets the HTML content displayed on the complete page. Use this property to change the default complete page text.
            * @see showCompletedPage
            * @see completedHtmlOnCondition
            * @see locale
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
            */
        get questionTitlePattern(): string;
        set questionTitlePattern(val: string);
        getQuestionTitlePatternOptions(): Array<any>;
        /**
            * Gets or sets a question title template. Obsolete, please use questionTitlePattern
            * @see QuestionModel.title
            * @see questionTitlePattern
            */
        get questionTitleTemplate(): string;
        set questionTitleTemplate(value: string);
        get locQuestionTitleTemplate(): LocalizableString;
        getUpdatedQuestionTitle(question: IQuestion, title: string): string;
        getUpdatedQuestionNo(question: IQuestion, no: string): string;
        /**
            * Gets or sets whether the survey displays page numbers on pages titles.
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
            */
        get showQuestionNumbers(): string;
        set showQuestionNumbers(value: string);
        /**
            * Gets or sets the survey progress bar position.
            *
            * The following options are available:
            *
            * - `off` (default) - don't show progress bar
            * - `top` - show progress bar in the top
            * - `bottom` - show progress bar in the bottom
            * - `both` - show progress bar in both sides: top and bottom.
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
            */
        get progressBarType(): string;
        set progressBarType(newValue: string);
        get isShowProgressBarOnTop(): boolean;
        get isShowProgressBarOnBottom(): boolean;
        /**
            * Returns the text/HTML that is rendered as a survey title.
            */
        get processedTitle(): string;
        /**
            * Gets or sets the question title location.
            *
            * The following options are available:
            *
            * - `bottom` - show a question title to bottom
            * - `left` - show a question title to left
            * - `top` - show a question title to top.
            *
            * > Some questions, for example matrixes, do not support 'left' value. The title for them will be displayed to the top.
            */
        get questionTitleLocation(): string;
        set questionTitleLocation(value: string);
        protected updateElementCss(reNew?: boolean): void;
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
            */
        get mode(): string;
        set mode(value: string);
        /**
            * Gets or sets an object that stores the survey results/data. You can set it directly as `{ 'question name': questionValue, ... }`
            *
            * > If you set the `data` property after creating the survey, you may need to set the `currentPageNo` to `0`, if you are using `visibleIf` properties for questions/pages/panels to ensure that you are starting from the first page.
            * @see setValue
            * @see getValue
            * @see mergeData
            * @see currentPageNo
            */
        get data(): any;
        set data(data: any);
        /**
            * Merge the values into survey.data. It works as survey.data, except it doesn't clean the existing data, but overrides them.
            * @param data data to merge. It should be an object {keyValue: Value, ...}
            * @see data
            * @see setValue
            */
        mergeData(data: any): void;
        setDataCore(data: any): void;
        get editingObj(): Base;
        set editingObj(val: Base);
        get isEditingSurveyElement(): boolean;
        getAllValues(): any;
        /**
            * Returns survey result data as an array of plain objects: with question `title`, `name`, `value`, and `displayValue`.
            *
            * For complex questions (like matrix, etc.) `isNode` flag is set to `true` and data contains array of nested objects (rows).
            *
            * Set `options.includeEmpty` to `false` if you want to skip empty answers.
            */
        getPlainData(options?: {
                includeEmpty?: boolean;
                includeQuestionTypes?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any[];
        getFilteredValues(): any;
        getFilteredProperties(): any;
        getDataValueCore(valuesHash: any, key: string): any;
        setDataValueCore(valuesHash: any, key: string, value: any): void;
        deleteDataValueCore(valuesHash: any, key: string): void;
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
        /**
            * Returns `true` if the survey contains no pages. The survey is empty.
            */
        get isEmpty(): boolean;
        /**
            * Deprecated. Use the `pageCount` property instead.
            */
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
        /**
            * Returns the currentPage, unless the started page is showing. In this case returns the started page.
            * @see currentPage
            * @see firstPageIsStarted
            * @see startedPage
            */
        get activePage(): any;
        /**
            * The zero-based index of the current page in the visible pages array.
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
        scrollToTopOnPageChange(): void;
        /**
            * Returns the current survey state:
            *
            * - `loading` - the survey is being loaded from JSON,
            * - `empty` - there is nothing to display in the current survey,
            * - `starting` - the survey's start page is displayed,
            * - `running` - a respondent is answering survey questions right now,
            * - `preview` - a respondent is previewing answered questions before submitting the survey (see [example](https://surveyjs.io/Examples/Library?id=survey-showpreview)),
            * - `completed` - a respondent has completed the survey and submitted the results.
            *
            * Details: [Preview State](https://surveyjs.io/Documentation/Library#states)
            */
        get state(): string;
        get completedState(): string;
        get completedStateText(): string;
        protected setCompletedState(value: string, text: string): void;
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
        protected updateCustomWidgets(page: PageModel): void;
        protected currentPageChanging(newValue: PageModel, oldValue: PageModel): boolean;
        protected currentPageChanged(newValue: PageModel, oldValue: PageModel): void;
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
        /**
            * Returns `true` if the survey is in edit mode.
            * @see mode
            */
        get isEditMode(): boolean;
        get isCompleteButtonVisible(): boolean;
        get isPreviewButtonVisible(): boolean;
        get isCancelPreviewButtonVisible(): boolean;
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
            * @see isCurrentPageHasErrors
            * @see prevPage
            * @see completeLastPage
            */
        nextPage(): boolean;
        /**
            * Returns `true`, if the current page contains errors, for example, the required question is empty or a question validation is failed.
            * @see nextPage
            */
        get isCurrentPageHasErrors(): boolean;
        /**
            * Returns `true`, if the current page contains any error. If there is an async function in an expression, then the function will return `undefined` value.
            * In this case, you should use `onAsyncValidation` parameter, which is a callback function: (hasErrors: boolean) => void
            * @param onAsyncValidation use this parameter if you use async functions in your expressions. This callback function will be called with hasErrors value equals to `true` or `false`.
            * @see hasPageErrors
            * @see hasErrors
            * @see currentPage
            */
        hasCurrentPageErrors(onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
            * Returns `true`, if a page contains an error. If there is an async function in an expression, then the function will return `undefined` value.
            * In this case, you should use the second `onAsyncValidation` parameter,  which is a callback function: (hasErrors: boolean) => void
            * @param page the page that you want to validate. If the parameter is undefined then the `activePage` is using
            * @param onAsyncValidation use this parameter if you use async functions in your expressions. This callback function will be called with hasErrors value equals to `true` or `false`.
            * @see hasCurrentPageErrors
            * @see hasErrors
            * @see activePage
            * @see currentPage
            */
        hasPageErrors(page?: PageModel, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
            * Returns `true`, if any of the survey pages contains errors. If there is an async function in an expression, then the function will return `undefined` value.
            * In this case, you should use  the third `onAsyncValidation` parameter, which is a callback function: (hasErrors: boolean) => void
            * @param fireCallback set it to `true`, to show errors in UI.
            * @param focusOnFirstError set it to `true` to focus on the first question that doesn't pass the validation and make the page, where the question is located, the current.
            * @param onAsyncValidation use this parameter if you use async functions in your expressions. This callback function will be called with hasErrors value equals to `true` or `false`.
            * @see hasCurrentPageErrors
            * @see hasPageErrors
            */
        hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean, onAsyncValidation?: (hasErrors: boolean) => void): boolean;
        /**
            * Checks whether survey elements (pages, panels, and questions) have unique question names.
            * You can check for unique names for individual page and panel (and all their elements) or a question.
            * If the parameter is not specified, then a survey checks that all its elements have unique names.
            * @param element page, panel or question, it is `null` by default, that means all survey elements will be checked
            */
        ensureUniqueNames(element?: ISurveyElement): void;
        /**
            * Navigates user to a previous page. If the current page is the first page, `prevPage` returns `false`. `prevPage` does not perform any checks, required questions can be empty.
            * @see isFirstPage
            */
        prevPage(): boolean;
        /**
            * Completes the survey, if the current page is the last one. It returns `false` if the last page has errors.
            * If the last page has no errors, `completeLastPage` calls `doComplete` and returns `true`.
            * @see isCurrentPageHasErrors
            * @see nextPage
            * @see doComplete
            */
        completeLastPage(): boolean;
        navigationMouseDown(): boolean;
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
        /**
            * Obsolete. Use the `questionsOnPageMode` property instead.
            * @see questionsOnPageMode
            */
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
            * Set this property to "showAllQuestions" or "showAnsweredQuestions" to allow respondents to preview answers before submitting the survey results.
            *
            * Details: [Preview State](https://surveyjs.io/Documentation/Library#states-preview)
            * Example: [Show Preview Before Complete](https://surveyjs.io/Examples/Library?id=survey-showpreview)
            * @see showPreview
            * @see cancelPreview
            * @see state
            * @see previewText
            * @see editText
            */
        get showPreviewBeforeComplete(): string;
        set showPreviewBeforeComplete(val: string);
        get isShowPreviewBeforeComplete(): boolean;
        protected onFirstPageIsStartedChanged(): void;
        protected onQuestionsOnPageModeChanged(oldValue: string): void;
        /**
            * Gets whether the current page is the first one.
            */
        get isFirstPage(): boolean;
        /**
            * Gets whether the current page is the last one.
            */
        get isLastPage(): boolean;
        get isShowPrevButton(): boolean;
        get isShowNextButton(): boolean;
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
            * In case calling `options.showDataSaving` callback in the `onComplete` event, `navigateToUrl` is used on calling `options.showDataSavingSuccess` callback.
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
        protected onIsValidatingOnServerChanged(): void;
        protected doServerValidation(doComplete: boolean, isPreview?: boolean): boolean;
        protected doNextPage(): void;
        setCompleted(): void;
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
        updateProgressText(onValueChanged?: boolean): void;
        getProgressText(): string;
        protected afterRenderSurvey(htmlElement: any): void;
        updateQuestionCssClasses(question: IQuestion, cssClasses: any): void;
        updatePanelCssClasses(panel: IPanel, cssClasses: any): void;
        updatePageCssClasses(page: IPage, cssClasses: any): void;
        updateChoiceItemCss(question: IQuestion, options: any): void;
        afterRenderPage(htmlElement: HTMLElement): void;
        afterRenderHeader(htmlElement: HTMLElement): void;
        afterRenderQuestion(question: IQuestion, htmlElement: HTMLElement): void;
        afterRenderQuestionInput(question: IQuestion, htmlElement: HTMLElement): void;
        afterRenderPanel(panel: IElement, htmlElement: HTMLElement): void;
        whenQuestionFocusIn(question: IQuestion): void;
        whenPanelFocusIn(panel: IPanel): void;
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
        matrixCellValidate(question: IQuestion, options: any): SurveyError;
        dynamicPanelAdded(question: IQuestion): void;
        dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
        dynamicPanelItemValueChanged(question: IQuestion, options: any): void;
        dragAndDropAllow(options: any): boolean;
        elementContentVisibilityChanged(element: ISurveyElement): void;
        getUpdatedElementTitleActions(element: ISurveyElement, titleActions: Array<IAction>): Array<IAction>;
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
        downloadFile(questionName: string, fileValue: any, callback: (status: string, data: any) => any): void;
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
        getPanelByName(name: string, caseInsensitive?: boolean): IPanel;
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
        protected notifyQuestionOnValueChanged(valueName: string, newValue: any): void;
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
        protected onLoadingSurveyFromService(): void;
        protected onLoadSurveyFromService(): void;
        fromJSON(json: any): void;
        setJsonObject(jsonObj: any): void;
        endLoadingFromJson(): void;
        protected onBeforeCreating(): void;
        protected onCreating(): void;
        hasVisibleQuestionByValueName(valueName: string): boolean;
        questionCountByValueName(valueName: string): number;
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
        protected doOnPageAdded(page: PageModel): void;
        protected doOnPageRemoved(page: PageModel): void;
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
        panelAdded(panel: IElement, index: number, parentPanel: any, rootPanel: any): void;
        panelRemoved(panel: IElement): void;
        validateQuestion(question: IQuestion): SurveyError;
        validatePanel(panel: IPanel): SurveyError;
        processHtml(html: string): string;
        processText(text: string, returnDisplayValue: boolean): string;
        processTextEx(text: string, returnDisplayValue: boolean, doEncoding: boolean): any;
        getSurveyMarkdownHtml(element: Base, text: string, name: string): string;
        /**
            * Returns an amount of corrected quiz answers.
            */
        getCorrectedAnswerCount(): number;
        /**
            * Returns quiz question number. It may be different from `getQuizQuestions.length` because some widgets like matrix may have several questions.
            * @see getQuizQuestions
            */
        getQuizQuestionCount(): number;
        /**
            * Returns an amount of incorrect quiz answers.
            */
        getInCorrectedAnswerCount(): number;
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
        calculateWidthMode(): string;
        get timerInfoText(): string;
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
        timeSpent: number;
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
        protected doTimer(): void;
        get inSurvey(): boolean;
        getSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getObjects(pages: string[], questions: string[]): any[];
        setTriggerValue(name: string, value: any, isVariable: boolean): void;
        copyTriggerValue(name: string, fromName: string): void;
        focusQuestion(name: string): boolean;
        getElementWrapperComponentName(element: any, reason?: string): string;
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
}

/**
    * A base class for all triggers.
    * A trigger calls a method when the expression change the result: from false to true or from true to false.
    * Please note, it runs only one changing the expression result.
    */
export declare class Trigger extends Base {
        static operatorsValue: HashTable<Function>;
        static get operators(): HashTable<Function>;
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
        checkExpression(keys: any, values: HashTable<any>, properties?: HashTable<any>): void;
        check(value: any): void;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
        protected onFailure(): void;
        endLoadingFromJson(): void;
        buildExpression(): string;
}
export interface ISurveyTriggerOwner {
        getObjects(pages: string[], questions: string[]): any[];
        setCompleted(): any;
        setTriggerValue(name: string, value: any, isVariable: boolean): any;
        copyTriggerValue(name: string, fromName: string): any;
        focusQuestion(name: string): boolean;
}
/**
    * It extends the Trigger base class and add properties required for SurveyJS classes.
    */
export declare class SurveyTrigger extends Trigger {
        protected ownerValue: ISurveyTriggerOwner;
        constructor();
        get owner(): ISurveyTriggerOwner;
        setOwner(owner: ISurveyTriggerOwner): void;
        getSurvey(live?: boolean): ISurvey;
        get isOnNextPage(): boolean;
}
/**
    * If expression returns true, it makes questions/pages visible.
    * Ohterwise it makes them invisible.
    */
export declare class SurveyTriggerVisible extends SurveyTrigger {
        pages: string[];
        questions: string[];
        constructor();
        getType(): string;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
        protected onFailure(): void;
        protected onItemSuccess(item: any): void;
        protected onItemFailure(item: any): void;
}
/**
    * If expression returns true, it completes the survey.
    */
export declare class SurveyTriggerComplete extends SurveyTrigger {
        constructor();
        getType(): string;
        get isOnNextPage(): boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the value from property **setValue** will be set to **setToName**
    */
export declare class SurveyTriggerSetValue extends SurveyTrigger {
        constructor();
        getType(): string;
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
export declare class SurveyTriggerSkip extends SurveyTrigger {
        constructor();
        getType(): string;
        get gotoName(): string;
        set gotoName(val: string);
        get isOnNextPage(): boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the **runExpression** will be run. If **setToName** property is not empty then the result of **runExpression** will be set to it.
    */
export declare class SurveyTriggerRunExpression extends SurveyTrigger {
        constructor();
        getType(): string;
        get setToName(): string;
        set setToName(val: string);
        get runExpression(): string;
        set runExpression(val: string);
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the value from question **fromName** will be set into **setToName**.
    */
export declare class SurveyTriggerCopyValue extends SurveyTrigger {
        constructor();
        get setToName(): string;
        set setToName(val: string);
        get fromName(): string;
        set fromName(val: string);
        getType(): string;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}

/**
    * A Model for a survey running in the Window.
    */
export declare class SurveyWindowModel extends Base {
        static surveyElementName: string;
        surveyValue: SurveyModel;
        windowElement: HTMLDivElement;
        templateValue: string;
        expandedChangedCallback: () => void;
        showingChangedCallback: () => void;
        closeWindowOnCompleteCallback: () => void;
        constructor(jsonObj: any, initialModel?: SurveyModel);
        getType(): string;
        /**
            * A survey object.
            * @see SurveyModel
            */
        get survey(): SurveyModel;
        /**
            * Set this value to negative value, for example -1, to avoid closing the window on completing the survey. Leave it equals to 0 (default value) to close the window immediately, or set it to 3, 5, 10, ... to close the window in 3, 5, 10 seconds.
            */
        closeOnCompleteTimeout: number;
        /**
            * Returns true if the window is currently showing. Set it to true to show the window and false to hide it.
            * @see show
            * @see hide
            */
        get isShowing(): boolean;
        set isShowing(val: boolean);
        /**
            * Show the window
            * @see hide
            * @see isShowing
            */
        show(): void;
        /**
            * Hide the window
            * @see show
            * @see isShowing
            */
        hide(): void;
        /**
            * Returns true if the window is expanded. Set it to true to expand the window or false to collapse it.
            * @see expand
            * @see collapse
            */
        get isExpanded(): boolean;
        set isExpanded(val: boolean);
        /**
            * The window and survey title.
            */
        get title(): string;
        set title(value: string);
        get locTitle(): LocalizableString;
        /**
            * Expand the window to show the survey.
            */
        expand(): void;
        /**
            * Collapse the window and show survey title only.
            */
        collapse(): void;
        protected createSurvey(jsonObj: any): SurveyModel;
        protected expandcollapse(value: boolean): void;
        protected onSurveyComplete(): void;
        protected closeWindowOnComplete(): void;
}

export declare class TextPreProcessorItem {
    start: number;
    end: number;
}
export declare class TextPreProcessorValue {
    name: string;
    returnDisplayValue: boolean;
    constructor(name: string, returnDisplayValue: boolean);
    value: any;
    isExists: boolean;
    canProcess: boolean;
}
export declare class TextPreProcessor {
    onProcess: (textValue: TextPreProcessorValue) => void;
    constructor();
    process(text: string, returnDisplayValue?: boolean, doEncoding?: boolean): string;
    processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
    get hasAllValuesOnLastRun(): boolean;
}
export declare class QuestionTextProcessor implements ITextProcessor {
    protected variableName: string;
    constructor(variableName: string);
    processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
    protected get survey(): ISurvey;
    protected get panel(): PanelModel;
    protected getValues(): any;
    protected getQuestionByName(name: string): Question;
    protected onCustomProcessText(textValue: TextPreProcessorValue): boolean;
    processText(text: string, returnDisplayValue: boolean): string;
    processTextEx(text: string, returnDisplayValue: boolean): any;
}

/**
  * The class contains methods to work with api.surveyjs.io service.
  */
export declare class dxSurveyService {
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

export declare var englishStrings: {
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
    optionsCaption: string;
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
    cleanCaption: string;
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
    filteredTextPlaceholder: string;
};

export declare var surveyLocalization: {
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
    getCurrentStrings(): any;
    getString: (strName: string) => any;
    getLocales: (removeDefaultLoc?: boolean) => Array<string>;
};
export declare var surveyStrings: {
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
    optionsCaption: string;
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
    cleanCaption: string;
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
    filteredTextPlaceholder: string;
};

export declare class QuestionCustomWidget {
        name: string;
        widgetJson: any;
        htmlTemplate: string;
        isFirstRender: boolean;
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
        get isDefaultRender(): boolean;
        get pdfQuestionType(): string;
        get pdfRender(): any;
}
export declare class CustomWidgetCollection {
        static Instance: CustomWidgetCollection;
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

export declare class ComponentQuestionJSON {
    name: string;
    json: any;
    constructor(name: string, json: any);
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
export declare class ComponentCollection {
    static Instance: ComponentCollection;
    onCreateComposite: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCompositeModel;
    onCreateCustom: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCustomModel;
    onAddingJson: (name: string, isComposite: boolean) => void;
    add(json: any): void;
    get items(): Array<ComponentQuestionJSON>;
    getCustomQuestionByName(name: string): ComponentQuestionJSON;
    clear(): void;
    createQuestion(name: string, questionJSON: ComponentQuestionJSON): Question;
    protected createCompositeModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCompositeModel;
    protected createCustomModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCustomModel;
}
export declare abstract class QuestionCustomModelBase extends Question implements ISurveyImpl, ISurveyData, IPanel {
    customQuestion: ComponentQuestionJSON;
    constructor(name: string, customQuestion: ComponentQuestionJSON);
    getType(): string;
    locStrsChanged(): void;
    protected createWrapper(): void;
    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
    itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
    onFirstRendering(): void;
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
export declare class QuestionCustomModel extends QuestionCustomModelBase {
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
    protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
    onSurveyValueChanged(newValue: any): void;
    protected getValueCore(): any;
    protected initElement(el: SurveyElement): void;
    protected updateElementCssCore(cssClasses: any): void;
    protected getDisplayValueCore(keyAsText: boolean, value: any): any;
}
export declare class QuestionCompositeModel extends QuestionCustomModelBase {
    customQuestion: ComponentQuestionJSON;
    static ItemVariableName: string;
    constructor(name: string, customQuestion: ComponentQuestionJSON);
    protected createWrapper(): void;
    getTemplate(): string;
    protected getCssType(): string;
    protected getElement(): SurveyElement;
    get contentPanel(): PanelModel;
    hasErrors(fireCallback?: boolean, rec?: any): boolean;
    updateElementCss(reNew?: boolean): void;
    getTextProcessor(): ITextProcessor;
    clearValueIfInvisible(): void;
    onAnyValueChanged(name: string): void;
    protected createPanel(): PanelModel;
    protected onReadOnlyChanged(): void;
    onSurveyLoad(): void;
    setVisibleIndex(val: number): number;
    runCondition(values: HashTable<any>, properties: HashTable<any>): void;
    getValue(name: string): any;
    setValue(name: string, newValue: any, locNotification: any, allowNotifyValueChanged?: boolean): any;
    addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
    protected convertDataValue(name: string, newValue: any): any;
    protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
    protected getDisplayValueCore(keyAsText: boolean, value: any): any;
}

export declare class StylesManager {
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
        [key: string]: string;
    };
    static modernThemeCss: {
        [key: string]: string;
    };
    static bootstrapThemeCss: {
        [key: string]: string;
    };
    static bootstrapmaterialThemeCss: {
        [key: string]: string;
    };
    static findSheet(styleSheetId: string): any;
    static createSheet(styleSheetId: string): CSSStyleSheet;
    static applyTheme(themeName?: string, themeSelector?: string): void;
    static Enabled: boolean;
    constructor();
    initializeStyles(sheet: CSSStyleSheet): void;
}

export declare class ListModel extends ActionContainer {
    onItemSelect: (item: Action) => void;
    allowSelection: boolean;
    needFilter: boolean;
    isExpanded: boolean;
    selectedItem: IAction;
    filteredText: string;
    static INDENT: number;
    static MINELEMENTCOUNT: number;
    constructor(items: Array<IAction>, onItemSelect: (item: Action) => void, allowSelection: boolean, selectedItem?: IAction, onFilteredTextChange?: (text: string) => void);
    protected onSet(): void;
    selectItem: (itemValue: Action) => void;
    isItemDisabled: (itemValue: Action) => boolean;
    isItemSelected: (itemValue: Action) => boolean;
    getItemClass: (itemValue: Action) => string;
    getItemIndent: (itemValue: any) => string;
    get filteredTextPlaceholder(): any;
    onKeyDown(event: KeyboardEvent): void;
    refresh(): void;
}

export declare class PopupModel<T = any> extends Base {
    contentComponentName: string;
    contentComponentData: T;
    verticalPosition: VerticalPosition;
    horizontalPosition: HorizontalPosition;
    showPointer: boolean;
    isModal: boolean;
    onCancel: () => void;
    onApply: () => boolean;
    onHide: () => void;
    onShow: () => void;
    cssClass: string;
    title: string;
    constructor(contentComponentName: string, contentComponentData: T, verticalPosition?: VerticalPosition, horizontalPosition?: HorizontalPosition, showPointer?: boolean, isModal?: boolean, onCancel?: () => void, onApply?: () => boolean, onHide?: () => void, onShow?: () => void, cssClass?: string, title?: string);
    get isVisible(): boolean;
    set isVisible(value: boolean);
    toggleVisibility(): void;
    onVisibilityChanged: (isVisible: boolean) => void;
}
export declare function createPopupModalViewModel(componentName: string, data: any, onApply: () => boolean, onCancel?: () => void, onHide?: () => void, onShow?: () => void, cssClass?: string, title?: string): PopupBaseViewModel;
export declare class PopupBaseViewModel extends Base {
    targetElement?: HTMLElement;
    top: string;
    left: string;
    height: string;
    isVisible: boolean;
    popupDirection: string;
    pointerTarget: IPosition;
    container: HTMLElement;
    get model(): PopupModel;
    set model(model: PopupModel);
    constructor(model: PopupModel, targetElement?: HTMLElement);
    get title(): string;
    get contentComponentName(): string;
    get contentComponentData(): any;
    get showPointer(): boolean;
    get isModal(): boolean;
    get styleClass(): string;
    onKeyDown(event: any): void;
    updateOnShowing(): void;
    updateOnHiding(): void;
    clickOutside(): void;
    cancel(): void;
    apply(): void;
    get cancelButtonText(): any;
    get applyButtonText(): any;
    dispose(): void;
    createPopupContainer(): void;
    mountPopupContainer(): void;
    initializePopupContainer(): void;
    destroyPopupContainer(): void;
}

export declare class ButtonGroupItemValue extends ItemValue {
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
export declare class QuestionButtonGroupModel extends QuestionCheckboxBase {
        constructor(name: string);
        getType(): string;
        protected getItemValueType(): string;
        supportOther(): boolean;
}
export declare class ButtonGroupItemModel {
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
        get css(): {
                label: string;
                icon: any;
                control: any;
                caption: any;
                decorator: any;
        };
        onChange(): void;
}

export declare const IsMobile: boolean;

export declare class CssClassBuilder {
    isEmpty(): boolean;
    append(value: string, condition?: boolean): CssClassBuilder;
    toString(): string;
}

export declare class DragDropSurveyElements extends DragDropCore<any> {
    static newGhostPage: PageModel;
    static restrictDragQuestionBetweenPages: boolean;
    static edgeHeight: number;
    static nestedPanelDepth: number;
    static ghostSurveyElementName: string;
    protected isEdge: boolean;
    protected prevIsEdge: any;
    protected ghostSurveyElement: IElement;
    protected get draggedElementType(): string;
    startDragToolboxItem(event: PointerEvent, draggedElementJson: JsonObject): void;
    protected createElementFromJson(json: object): HTMLElement;
    protected getShortcutText(draggedElement: any): string;
    protected getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode: HTMLElement, event: PointerEvent): any;
    protected isDropTargetValid(dropTarget: SurveyElement): boolean;
    protected calculateIsBottom(clientY: number, dropTargetNode?: HTMLElement): boolean;
    protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
    protected findDeepestDropTargetChild(parent: HTMLElement): HTMLElement;
    protected afterDragOver(): void;
    protected doStartDrag(): void;
    protected doBanDropHere: () => void;
    protected doDrop: () => any;
    protected doClear: () => void;
    protected insertGhostElementIntoSurvey(): boolean;
    protected removeGhostElementFromSurvey(): void;
}

export declare class DragDropChoices extends DragDropCore<QuestionSelectBase> {
    protected get draggedElementType(): string;
    protected getShortcutText(draggedElement: ItemValue): string;
    protected createDraggedElementShortcut(text: string, draggedElementNode: HTMLElement): HTMLElement;
    protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
    protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
    protected isDropTargetValid(dropTarget: ItemValue): boolean;
    protected calculateIsBottom(clientY: number): boolean;
    protected afterDragOver(dropTargetNode: HTMLElement): void;
    protected doDrop(): any;
    protected doClear(): void;
}

export declare class SurveyPanelBase extends SurveyElementBase<any, any> {
    protected rootRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    protected getStateElement(): Base;
    protected canUsePropInState(key: string): boolean;
    protected get survey(): SurveyModel;
    protected get creator(): ISurveyCreator;
    protected get css(): any;
    get panelBase(): PanelModelBase;
    protected getPanelBase(): PanelModelBase;
    protected getSurvey(): SurveyModel;
    protected getCss(): any;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected canRender(): boolean;
    protected renderRows(css: any): Array<JSX.Element>;
    protected createRow(row: QuestionRowModel, css: any): JSX.Element;
}

export declare class SurveyActionBarItemDropdown extends SurveyActionBarItem {
    renderButtonContent(): JSX.Element;
}

export declare class SurveyActionBarSeparator extends React.Component<any, any> {
    constructor(props: any);
    render(): JSX.Element;
}

/**
    * A Model for a matrix base question.
    */
export declare class QuestionMatrixBaseModel<TRow, TColumn> extends Question {
        protected filteredColumns: Array<TColumn>;
        protected filteredRows: Array<ItemValue>;
        protected generatedVisibleRows: Array<TRow>;
        protected generatedTotalRow: TRow;
        visibleRowsChangedCallback: () => void;
        protected createColumnValues(): any;
        constructor(name: string);
        getType(): string;
        get isCompositeQuestion(): boolean;
        /**
            * Set this property to false, to hide table header. The default value is true.
            */
        get showHeader(): boolean;
        set showHeader(val: boolean);
        /**
            * The list of columns. A column has a value and an optional text
            */
        get columns(): Array<any>;
        set columns(newValue: Array<any>);
        get visibleColumns(): Array<any>;
        /**
            * The list of rows. A row has a value and an optional text
            */
        get rows(): Array<any>;
        set rows(newValue: Array<any>);
        protected processRowsOnSet(newRows: Array<any>): any[];
        protected getVisibleRows(): Array<TRow>;
        /**
            * Returns the list of visible rows as model objects.
            * @see rowsVisibleIf
            */
        get visibleRows(): Array<TRow>;
        /**
            * An expression that returns true or false. It runs against each row item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see visibleIf
            */
        get rowsVisibleIf(): string;
        set rowsVisibleIf(val: string);
        /**
            * An expression that returns true or false. It runs against each column item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see rowsVisibleIf
            */
        get columnsVisibleIf(): string;
        set columnsVisibleIf(val: string);
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected filterItems(): boolean;
        protected onColumnsChanged(): void;
        protected onRowsChanged(): void;
        protected shouldRunColumnExpression(): boolean;
        protected hasRowsAsItems(): boolean;
        protected runItemsCondition(values: HashTable<any>, properties: HashTable<any>): boolean;
        protected clearGeneratedRows(): void;
        clearIncorrectValues(): void;
        protected clearInvisibleValuesInRows(): void;
        needResponsiveWidth(): boolean;
}

export declare class DragDropMatrixRows extends DragDropCore<QuestionMatrixDynamicModel> {
    protected get draggedElementType(): string;
    protected ghostPositionChanged(): void;
    protected getShortcutText(draggedElement: any): string;
    protected getDropTargetByDataAttributeValue(dataAttributeValue: any): MatrixDropdownRowModelBase;
    protected isDropTargetValid(dropTarget: any): boolean;
    protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
    protected calculateIsBottom(clientY: number): boolean;
    protected doDrop: () => QuestionMatrixDynamicModel;
}

export declare class DragDropRankingChoices extends DragDropChoices {
    protected get draggedElementType(): string;
    protected createDraggedElementShortcut(text: string, draggedElementNode: HTMLElement): HTMLElement;
    protected getDropTargetByDataAttributeValue(dataAttributeValue: string): ItemValue;
    protected isDropTargetValid(dropTarget: ItemValue, dropTargetNode?: HTMLElement): boolean;
    protected calculateIsBottom(clientY: number): boolean;
    protected afterDragOver(dropTargetNode: HTMLElement): void;
    protected ghostPositionChanged(): void;
    protected doDrop: () => any;
    protected handleEscapeButton: (event: KeyboardEvent) => void;
    protected doClear: () => void;
}

/**
    * A Base Model for a comment and text questions
    */
export declare class QuestionTextBase extends Question {
        constructor(name: string);
        protected isTextValue(): boolean;
        /**
            * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
            * If it is 0, then the value is unlimited
            * @see SurveyModel.maxTextLength
            */
        get maxLength(): number;
        set maxLength(val: number);
        getMaxLength(): any;
        /**
            * Use this property to set the input place holder.
            */
        get placeHolder(): string;
        set placeHolder(val: string);
        get locPlaceHolder(): LocalizableString;
        getType(): string;
        isEmpty(): boolean;
        /**
            * Gets or sets a value that specifies how the question updates it's value.
            *
            * The following options are available:
            * - `default` - get the value from survey.textUpdateMode
            * - `onBlur` - the value is updated after an input loses the focus.
            * - `onTyping` - update the value of text questions, "text" and "comment", on every key press.
            *
            * Note, that setting to "onTyping" may lead to a performance degradation, in case you have many expressions in the survey.
            * @see survey.textUpdateMode
            */
        get textUpdateMode(): string;
        set textUpdateMode(val: string);
        get isSurveyInputTextUpdate(): boolean;
        get renderedPlaceHolder(): string;
        protected setRenderedPlaceHolder(val: string): void;
        protected onReadOnlyChanged(): void;
        onSurveyLoad(): void;
        localeChanged(): void;
        protected calcRenderedPlaceHolder(): void;
        protected hasPlaceHolder(): boolean;
        getControlClass(): string;
}

export declare type VerticalPosition = "top" | "bottom" | "middle";
export declare type HorizontalPosition = "left" | "right" | "center";
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
export declare class PopupUtils {
    static calculatePosition(targetRect: ClientRect, height: number, width: number, verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition, showPointer: boolean): INumberPosition;
    static updateVerticalDimensions(top: number, height: number, windowHeight: number): {
        height: number;
        top: number;
    };
    static updateVerticalPosition(targetRect: ClientRect, height: number, verticalPosition: VerticalPosition, showPointer: boolean, windowHeight: number): VerticalPosition;
    static calculatePopupDirection(verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition): string;
    static calculatePointerTarget(targetRect: ClientRect, top: number, left: number, verticalPosition: VerticalPosition, horizontalPosition: HorizontalPosition): INumberPosition;
}

export declare abstract class DragDropCore<T> extends Base {
    isBottom: boolean;
    onGhostPositionChanged: EventBase<Base>;
    protected ghostPositionChanged(): void;
    onBeforeDrop: EventBase<DragDropCore<T>>;
    onAfterDrop: EventBase<DragDropCore<T>>;
    draggedElement: any;
    protected abstract get draggedElementType(): string;
    protected parentElement: T;
    dropTarget: any;
    protected get dropTargetDataAttributeName(): string;
    protected get survey(): SurveyModel;
    prevDropTarget: any;
    protected draggedElementShortcut: HTMLElement;
    constructor(surveyValue?: ISurvey, creator?: any);
    startDrag(event: PointerEvent, draggedElement: any, parentElement?: any, draggedElementNode?: HTMLElement): void;
    protected isDropTargetDoesntChanged(newIsBottom: boolean): boolean;
    protected doStartDrag(): void;
    protected abstract getShortcutText(draggedElement: any): string;
    protected createDraggedElementShortcut(text: string, draggedElementNode?: HTMLElement): HTMLElement;
    protected doDragOver(dropTargetNode?: HTMLElement): void;
    protected afterDragOver(dropTargetNode?: HTMLElement): void;
    getGhostPosition(item: any): string;
    protected abstract isDropTargetValid(dropTarget: any, dropTargetNode?: HTMLElement): boolean;
    protected handleEscapeButton: (event: KeyboardEvent) => void;
    protected banDropHere: () => void;
    protected doBanDropHere: () => void;
    protected getDataAttributeValueByNode(node: HTMLElement): string;
    protected getDropTargetByNode(dropTargetNode: HTMLElement, event: PointerEvent): any;
    protected abstract getDropTargetByDataAttributeValue(dataAttributeValue: string, dropTargetNode?: HTMLElement, event?: PointerEvent): any;
    protected calculateMiddleOfHTMLElement(HTMLElement: HTMLElement): number;
    protected abstract calculateIsBottom(clientY: number, dropTargetNode?: HTMLElement): boolean;
    protected findDropTargetNodeByDragOverNode(dragOverNode: HTMLElement): HTMLElement;
    protected abstract doDrop(): any;
    protected clear: () => void;
    protected doClear(): void;
}

interface IActionBarItemProps {
    item: Action;
}
export declare class SurveyAction extends SurveyElementBase<IActionBarItemProps, any> {
    get item(): Action;
    protected getStateElement(): Base;
    renderElement(): JSX.Element;
}
export declare class SurveyActionBarItem extends SurveyElementBase<IActionBarItemProps, any> {
    get item(): Action;
    protected getStateElement(): Base;
    renderElement(): JSX.Element;
    renderText(): JSX.Element;
    renderButtonContent(): JSX.Element;
    renderInnerButton(): JSX.Element;
}
export {};

