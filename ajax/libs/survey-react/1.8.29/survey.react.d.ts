/*Type definitions for Survey JavaScript library v1.8.29
Copyright (c) 2015-2020 Devsoft Baltic OÜ  - http://surveyjs.io/
Definitions by: Devsoft Baltic OÜ <https://github.com/surveyjs/>
*/
// Dependencies for this module:
//   ../../../../react

import * as React from "react";
import React from "react";

import "./chunks/localization";
export { ReactSurveyModel as Model };
export { ReactWindowModel as WindowModel };

import "../../main.scss";
import "../../modern.scss";
export let Version: string;

export var __assign: any;
export function __extends(thisClass: any, baseClass: any): void;
export var __decorate: (decorators: any, target: any, key: any, desc: any) => any;
export var __spreadArrays: () => any[];

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
        itemText: string;
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
        cellText: string;
        cellTextSelected: string;
        cellLabel: string;
    };
    matrixdropdown: {
        root: string;
        cell: string;
        headerCell: string;
        row: string;
        detailRow: string;
        detailRowText: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
    };
    matrixdynamic: {
        root: string;
        button: string;
        buttonAdd: string;
        buttonRemove: string;
        iconAdd: string;
        iconRemove: string;
        cell: string;
        headerCell: string;
        row: string;
        detailRow: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
        emptyRowsSection: string;
        emptyRowsText: string;
        emptyRowsButton: string;
    };
    paneldynamic: {
        root: string;
        title: string;
        button: string;
        buttonAdd: string;
        buttonRemove: string;
        buttonPrev: string;
        buttonNext: string;
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
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
        chooseFile: string;
        noFileChosen: string;
    };
    signaturepad: {
        root: string;
        controls: string;
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
        itemText: string;
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
        detailRow: string;
        detailRowText: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
    };
    matrixdynamic: {
        root: string;
        button: string;
        buttonAdd: string;
        buttonRemove: string;
        iconAdd: string;
        iconRemove: string;
        headerCell: string;
        row: string;
        detailRow: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
        emptyRowsSection: string;
        emptyRowsText: string;
        emptyRowsButton: string;
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
        buttonPrev: string;
        buttonNext: string;
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
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
    };
    signaturepad: {
        root: string;
        controls: string;
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
        itemText: string;
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
        detailRow: string;
        detailRowText: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
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
        headerCell: string;
        row: string;
        detailRow: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
        emptyRowsSection: string;
        emptyRowsText: string;
        emptyRowsButton: string;
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
        buttonPrev: string;
        buttonNext: string;
        progressContainer: string;
        progress: string;
        progressBar: string;
        progressText: string;
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
    };
    signaturepad: {
        root: string;
        controls: string;
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
        itemText: string;
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
        detailRow: string;
        detailRowText: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
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
        row: string;
        detailRow: string;
        detailCell: string;
        detailButton: string;
        detailButtonExpanded: string;
        detailIcon: string;
        detailIconExpanded: string;
        detailPanelCell: string;
        emptyRowsSection: string;
        emptyRowsText: string;
        emptyRowsButton: string;
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
        disabled: string;
        removeButton: string;
        removeButtonBottom: string;
        removeFile: string;
        removeFileSvg: string;
        wrapper: string;
    };
    signaturepad: {
        root: string;
        small: string;
        controls: string;
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

export declare class Survey extends SurveyElementBase implements ISurveyCreator {
    static cssType: string;
    protected survey: ReactSurveyModel;
    constructor(props: any);
    protected getStateElement(): Base;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    doRender(): JSX.Element;
    protected renderElement(): JSX.Element;
    css: any;
    handleTryAgainClick(event: any): void;
    protected renderCompleted(): JSX.Element;
    protected renderCompletedBefore(): JSX.Element;
    protected renderLoading(): JSX.Element;
    protected renderStartPage(): JSX.Element;
    protected renderSurvey(): JSX.Element;
    protected renderTitle(): JSX.Element;
    protected renderHeader(): JSX.Element;
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
}
export declare class ReactWindowModel extends SurveyWindowModel {
    constructor(jsonObj?: any, model?: ReactSurveyModel);
    protected createSurvey(jsonObj: any): SurveyModel;
    renderCallback: () => void;
}

export declare class SurveyNavigationBase extends React.Component<any, any> {
    constructor(props: any);
    protected readonly survey: SurveyModel;
    protected readonly css: any;
    componentDidMount(): void;
    componentWillUnmount(): void;
}

export declare class SurveyTimerPanel extends React.Component<any, any> {
    constructor(props: any);
    protected readonly survey: SurveyModel;
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
    readonly page: PageModel;
    protected renderElement(): JSX.Element;
    protected renderTitle(): JSX.Element;
    protected renderDescription(): JSX.Element;
}

export declare class SurveyRow extends SurveyElementBase {
    constructor(props: any);
    protected getStateElement(): Base;
    protected readonly css: any;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: any, nextState: any): boolean;
    componentWillUnmount(): void;
    protected createElement(element: IElement): JSX.Element;
}

export declare class SurveyPanel extends SurveyPanelBase {
    constructor(props: any);
    readonly panel: PanelModel;
    handleEditClick(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderContent(style: any, rows: JSX.Element[], className: string): JSX.Element;
    protected renderTitle(): JSX.Element;
    protected renderDescription(): JSX.Element;
    protected renderBottom(): JSX.Element;
}

export declare class SurveyFlowPanel extends SurveyPanel {
    constructor(props: any);
    readonly flowPanel: FlowPanelModel;
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
export declare class SurveyQuestion extends SurveyElementBase {
    static renderQuestionBody(creator: ISurveyCreator, question: Question): JSX.Element;
    constructor(props: any);
    protected getStateElement(): Base;
    protected readonly question: Question;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected renderQuestion(): JSX.Element;
    protected renderTitle(cssClasses: any): JSX.Element;
    protected renderDescription(cssClasses: any, isUnderInput?: boolean): JSX.Element;
    protected renderComment(cssClasses: any): JSX.Element;
    protected renderHeader(question: Question): JSX.Element;
    protected renderErrors(cssClasses: any, location: string): JSX.Element;
}
export declare class SurveyElementErrors extends ReactSurveyElement {
    constructor(props: any);
    protected readonly id: string;
    protected readonly element: SurveyElement;
    protected readonly location: string;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionAndErrorsCell extends ReactSurveyElement {
    [index: string]: any;
    protected cellRef: React.RefObject<HTMLTableCellElement>;
    constructor(props: any);
    protected getStateElement(): Base;
    protected readonly question: Question;
    protected readonly creator: ISurveyCreator;
    protected getQuestion(): Question;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected doAfterRender(): void;
    protected getCellClass(): any;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected getShowErrors(): boolean;
    protected getCellStyle(): any;
    protected renderQuestion(): JSX.Element;
    protected getHeaderText(): string;
}

export declare class SurveyElementBase extends React.Component<any, any> {
    static renderLocString(locStr: LocalizableString, style?: any, key?: string): JSX.Element;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: any, prevState: any): void;
    render(): JSX.Element;
    protected readonly isRendering: boolean;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected readonly changedStatePropName: string;
    protected modifyNonStateProps(nonStateProps: Array<string>): void;
    protected getStateElements(): Array<Base>;
    protected getStateElement(): Base;
    protected readonly isDisplayMode: boolean;
    protected renderLocString(locStr: LocalizableString, style?: any): JSX.Element;
}
export declare class ReactSurveyElement extends SurveyElementBase {
    constructor(props: any);
    protected readonly cssClasses: any;
}
export declare class SurveyQuestionElementBase extends SurveyElementBase {
    control: any;
    constructor(props: any);
    componentDidUpdate(prevProps: any, prevState: any): void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected updateDomElement(): void;
    protected readonly questionBase: Question;
    protected readonly creator: ISurveyCreator;
    protected canRender(): boolean;
    shouldComponentUpdate(): boolean;
}
export declare class SurveyQuestionUncontrolledElement<T extends Question> extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: T;
    updateValueOnEvent: (event: any) => void;
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
    protected readonly question: QuestionCheckboxModel;
    protected renderElement(): JSX.Element;
    protected getColumns(cssClasses: any): JSX.Element[];
    protected getItems(cssClasses: any): Array<any>;
    protected readonly textStyle: any;
    protected renderItem(key: string, item: any, isFirst: boolean, cssClasses: any, index: string): JSX.Element;
}
export declare class SurveyQuestionCheckboxItem extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): Base;
    protected readonly question: QuestionCheckboxModel;
    protected readonly item: ItemValue;
    protected readonly textStyle: any;
    protected readonly isFirst: any;
    protected readonly index: number;
    shouldComponentUpdate(): boolean;
    handleOnChange(event: any): void;
    selectAllChanged(event: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    protected readonly inputStyle: any;
    protected renderCheckbox(isChecked: boolean, otherItem: JSX.Element): JSX.Element;
    protected renderOther(): JSX.Element;
}

export declare class SurveyQuestionRanking extends SurveyQuestionElementBase {
    protected readonly question: QuestionRankingModel;
    componentDidUpdate(prevProps: any, prevState: any): void;
    protected renderElement(): JSX.Element;
    protected getItems(): Array<any>;
    protected renderItem(key: string, text: JSX.Element, index: number, handleKeydown: (event: any) => void, cssClasses: any, itemClass: string): JSX.Element;
}
export declare class SurveyQuestionRankingItem extends ReactSurveyElement {
    protected readonly text: string;
    protected readonly index: number;
    protected readonly handleKeydown: (event: any) => void;
    protected readonly cssClasses: any;
    protected readonly itemClass: string;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionDropdown extends SurveyQuestionUncontrolledElement<QuestionDropdownModel> {
    constructor(props: any);
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
    protected readonly question: QuestionMatrixModel;
    componentDidMount(): void;
    componentWillUnmount(): void;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionMatrixRow extends ReactSurveyElement {
    constructor(props: any);
    handleOnChange(event: any): void;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
    generateTds(): JSX.Element[];
    cellClick(row: any, column: any): void;
}

export declare class SurveyQuestionHtml extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionHtmlModel;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionFile extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionFileModel;
    handleOnDragOver: (event: any) => boolean;
    handleOnDrop: (event: any) => void;
    handleOnChange: (event: any) => void;
    handleOnClean: (event: any) => void;
    handleOnRemoveFile: (event: any) => void;
    handleOnDownloadFile: (event: any, data: any) => void;
    protected renderElement(): JSX.Element;
    protected renderFileDecorator(): JSX.Element;
    protected renderClearButton(className: string): JSX.Element;
    protected renderPreview(): JSX.Element;
}

export declare class SurveyQuestionMultipleText extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionMultipleTextModel;
    protected renderElement(): JSX.Element;
    protected renderRow(rowIndex: number, items: Array<MultipleTextItemModel>, cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionRadiogroup extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionRadiogroupModel;
    protected renderElement(): JSX.Element;
    protected getColumns(cssClasses: any): JSX.Element[];
    protected getItems(cssClasses: any): Array<any>;
    protected readonly textStyle: any;
}
export declare class SurveyQuestionRadioItem extends ReactSurveyElement {
    constructor(props: any);
    protected getStateElement(): Base;
    protected readonly question: QuestionRadiogroupModel;
    protected readonly item: ItemValue;
    protected readonly textStyle: any;
    protected readonly index: number;
    protected readonly isChecked: boolean;
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
    protected readonly question: QuestionBooleanModel;
    handleOnChange(event: any): void;
    handleOnClick(event: any): void;
    handleOnSwitchClick(event: any): void;
    handleOnLabelClick(event: any, value: boolean): void;
    protected updateDomElement(): void;
    protected getItemClass(): string;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionBooleanCheckbox extends SurveyQuestionBoolean {
    constructor(props: any);
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionEmpty extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionEmptyModel;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionMatrixDropdownBase extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionMatrixDropdownModelBase;
    componentDidMount(): void;
    protected renderElement(): JSX.Element;
    renderTableDiv(): JSX.Element;
    renderHeader(): JSX.Element;
    renderFooter(): JSX.Element;
    renderRows(): JSX.Element;
    renderRow(keyValue: any, row: QuestionMatrixDropdownRenderedRow, cssClasses: any): JSX.Element;
    renderCell(cell: QuestionMatrixDropdownRenderedCell, index: number, cssClasses: any): JSX.Element;
    renderRemoveButton(row: MatrixDropdownRowModelBase): JSX.Element;
}
export declare class SurveyQuestionMatrixDetailButton extends ReactSurveyElement {
    constructor(props: any);
    handleOnShowHideClick(event: any): void;
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionMatrixDropdownCell extends SurveyQuestionAndErrorsCell {
    constructor(props: any);
    protected getQuestion(): Question;
    protected doAfterRender(): void;
    protected getShowErrors(): boolean;
    protected getCellClass(): any;
    protected getCellStyle(): any;
    protected getHeaderText(): string;
    protected renderQuestion(): JSX.Element;
}

export declare class SurveyQuestionMatrixDropdown extends SurveyQuestionMatrixDropdownBase {
    constructor(props: any);
}

export declare class SurveyQuestionMatrixDynamic extends SurveyQuestionMatrixDropdownBase {
    constructor(props: any);
    protected readonly matrix: QuestionMatrixDynamicModel;
    handleOnRowAddClick(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderAddRowButtonOnTop(cssClasses: any): JSX.Element;
    protected renderAddRowButtonOnBottom(cssClasses: any): JSX.Element;
    protected renderNoRowsContent(cssClasses: any): JSX.Element;
    protected renderAddRowButton(cssClasses: any, isEmptySection?: boolean): JSX.Element;
    renderRemoveButton(row: MatrixDropdownRowModelBase): JSX.Element;
}
export declare class SurveyQuestionMatrixDynamicRemoveButton extends ReactSurveyElement {
    constructor(props: any);
    handleOnRowRemoveClick(event: any): void;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionPanelDynamic extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionPanelDynamicModel;
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleOnPanelAddClick(event: any): void;
    handleOnPanelPrevClick(event: any): void;
    handleOnPanelNextClick(event: any): void;
    handleOnRangeChange(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderNavigator(): JSX.Element;
    protected rendrerPrevButton(): JSX.Element;
    protected rendrerNextButton(): JSX.Element;
    protected renderRange(): JSX.Element;
    protected renderAddRowButton(): JSX.Element;
}
export declare class SurveyQuestionPanelDynamicItem extends SurveyPanel {
    constructor(props: any);
    protected getSurvey(): SurveyModel;
    protected getCss(): any;
    handleOnPanelRemoveClick(event: any): void;
    protected renderBottom(): JSX.Element;
    protected renderButton(): JSX.Element;
}

export declare class SurveyProgress extends SurveyNavigationBase {
    constructor(props: any);
    protected readonly isTop: boolean;
    protected readonly progress: number;
    protected readonly progressText: string;
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
    protected readonly question: QuestionRatingModel;
    handleOnChange(event: any): void;
    protected renderElement(): JSX.Element;
    protected renderItem(key: string, item: ItemValue, index: number, minText: JSX.Element, maxText: JSX.Element, cssClasses: any): JSX.Element;
    protected renderOther(cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionExpression extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionExpressionModel;
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
    registerElement(elementType: string, elementCreator: (name: string) => JSX.Element): void;
    getAllTypes(): Array<string>;
    isElementRegisgered(elementType: string): boolean;
    createElement(elementType: string, params: any): JSX.Element;
}

export declare class SurveyQuestionImagePicker extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionImagePickerModel;
    handleOnChange(event: any): void;
    protected renderElement(): JSX.Element;
    protected getItems(cssClasses: any): Array<any>;
    protected readonly textStyle: any;
    protected renderItem(key: string, item: ItemValue, cssClasses: any): JSX.Element;
}

export declare class SurveyQuestionImage extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionImageModel;
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionSignaturePad extends SurveyQuestionElementBase {
    constructor(props: any);
    protected readonly question: QuestionSignaturePadModel;
    protected renderElement(): JSX.Element;
}

export declare class SurveyQuestionCustom extends SurveyQuestionUncontrolledElement<QuestionCustomModel> {
    constructor(props: any);
    protected renderElement(): JSX.Element;
}
export declare class SurveyQuestionComposite extends SurveyQuestionUncontrolledElement<QuestionCompositeModel> {
    constructor(props: any);
    protected canRender(): boolean;
    protected renderElement(): JSX.Element;
}

export declare class DefaultTitle extends React.Component<any, any> {
    protected readonly cssClasses: any;
    protected readonly element: Question;
    render(): JSX.Element;
    componentDidMount(): void;
}

export declare class TitleActions extends React.Component<any, any> {
    protected readonly cssClasses: any;
    protected readonly element: ISurveyElement;
    render(): JSX.Element;
}

export declare class SurveyLocStringViewer extends React.Component<any, any> {
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
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
            * The prefix that uses to store the question comment, as {questionName} + {commentPrefix}.
            * The default
            */
        commentPrefix: string;
        /**
            * Encode parameter on calling restfull web API
            */
        webserviceEncodeParameters: boolean;
        /**
            * Cache the result for choices getting from web services. Set this property to false, to disable the caching.
            */
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
            * Set this property to change readOnlyCommentRenderMode: "textarea" (default) or (div)
            */
        readOnlyCommentRenderMode: string;
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
};

export interface HashTable<T> {
    [key: string]: T;
}
export declare class Helpers {
    /**
      * A static methods that returns true if a value underfined, null, empty string or empty array.
      * @param value
      */
    static isValueEmpty(value: any): boolean;
    static isArrayContainsEqual(x: any, y: any): boolean;
    static isArraysEqual(x: any, y: any, ignoreOrder?: boolean): boolean;
    static isTwoValueEquals(x: any, y: any, ignoreOrder?: boolean): boolean;
    static randomizeArray<T>(array: Array<T>): Array<T>;
    static getUnbindValue(value: any): any;
    static createCopy(obj: any): any;
    static isConvertibleToNumber(value: any): boolean;
    static isNumber(value: any): boolean;
    static getMaxLength(maxLength: number, surveyLength: number): any;
    static getNumberByIndex(index: number, startIndexStr: string): string;
    static isCharNotLetterAndDigit(ch: string): boolean;
    static isCharDigit(ch: string): boolean;
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
        text: string;
        readonly isValidateAllValues: boolean;
        readonly locText: LocalizableString;
        protected getErrorText(name: string): string;
        protected getDefaultErrorText(name: string): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        readonly isRunning: boolean;
        readonly isAsync: boolean;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
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
        minValue: number;
        /**
            * The maxValue property.
            */
        maxValue: number;
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
        minLength: number;
        /**
            * The maxLength property.
            */
        maxLength: number;
        /**
            * The allowDigits property.
            */
        allowDigits: boolean;
}
export declare class AnswerCountValidator extends SurveyValidator {
        constructor(minCount?: number, maxCount?: number);
        getType(): string;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected getDefaultErrorText(name: string): string;
        /**
            * The minCount property.
            */
        minCount: number;
        /**
            * The maxCount property.
            */
        maxCount: number;
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
        regex: string;
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
        readonly isValidateAllValues: boolean;
        readonly isAsync: boolean;
        readonly isRunning: boolean;
        validate(value: any, name?: string, values?: any, properties?: any): ValidatorResult;
        protected generateError(res: boolean, value: any): ValidatorResult;
        protected getDefaultErrorText(name: string): any;
        protected ensureConditionRunner(): boolean;
        /**
            * The expression property.
            */
        expression: string;
}

/**
  * Array of ItemValue is used in checkox, dropdown and radiogroup choices, matrix columns and rows.
  * It has two main properties: value and text. If text is empty, value is used for displaying.
  * The text property is localizable and support markdown.
  */
export declare class ItemValue extends Base {
    protected typeName: string;
    [index: string]: any;
    static Separator: string;
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
    getLocale(): string;
    readonly locText: LocalizableString;
    setLocText(locText: LocalizableString): void;
    locOwner: ILocalizableOwner;
    value: any;
    readonly hasText: boolean;
    pureText: string;
    text: string;
    readonly calculatedText: string;
    getData(): any;
    toJSON(): any;
    setData(value: any): void;
    visibleIf: string;
    enableIf: string;
    readonly isVisible: boolean;
    setIsVisible(val: boolean): void;
    readonly isEnabled: any;
    setIsEnabled(val: boolean): void;
    addUsedLocales(locales: Array<string>): void;
    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
    protected getConditionRunner(isVisible: boolean): ConditionRunner;
    originalItem: any;
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
        isDisplayMode: boolean;
        isDesignMode: boolean;
        areInvisibleElementsShowing: boolean;
        areEmptyElementsHidden: boolean;
        isLoadingFromJson: boolean;
        isUpdateValueTextOnTyping: boolean;
        state: string;
        cancelPreviewByPage(panel: IPanel): any;
        requiredText: string;
        beforeSettingQuestionErrors(question: IQuestion, errors: Array<SurveyError>): void;
        questionTitlePattern: string;
        getUpdatedQuestionTitle(question: IQuestion, title: string): string;
        getUpdatedQuestionNo(question: IQuestion, no: string): string;
        getUpdatedQuestionTitleActions(question: IQuestion, titleActions: Array<any>): Array<any>;
        getUpdatedPanelTitleActions(question: IPanel, titleActions: Array<any>): Array<any>;
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
        updateQuestionCssClasses(question: IQuestion, cssClasses: any): any;
        updatePanelCssClasses(panel: IPanel, cssClasses: any): any;
        updatePageCssClasses(panel: IPanel, cssClasses: any): any;
        afterRenderQuestion(question: IQuestion, htmlElement: any): any;
        afterRenderQuestionInput(question: IQuestion, htmlElement: any): any;
        afterRenderPanel(panel: IElement, htmlElement: any): any;
        afterRenderPage(htmlElement: any): any;
        getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
        matrixRowAdded(question: IQuestion, row: any): any;
        matrixBeforeRowAdded(options: {
                question: IQuestion;
                canAddRow: boolean;
        }): any;
        matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): any;
        matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
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
        renderTitleActions(element: ISurveyElement): boolean;
        elementContentVisibilityChanged(element: ISurveyElement): void;
}
export interface ISurveyImpl {
        geSurveyData(): ISurveyData;
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
        setSurveyImpl(value: ISurveyImpl): any;
        onSurveyLoad(): any;
        onFirstRendering(): any;
        getType(): string;
        setVisibleIndex(value: number): number;
        locStrsChanged(): any;
        delete(): any;
        toggleState(): void;
        stateChangedCallback(): void;
        getTitleActions(): Array<any>;
}
export interface IElement extends IConditionRunner, ISurveyElement {
        visible: boolean;
        parent: IPanel;
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
/**
    * The base class for SurveyJS objects.
    */
export declare class Base {
        static isSurveyElement(val: any): boolean;
        static commentPrefix: string;
        static createItemValue: (item: any, type?: string) => any;
        static itemValueLocStrChanged: (arr: Array<any>) => void;
        /**
            * A static methods that returns true if a value underfined, null, empty string or empty array.
            * @param value
            */
        isValueEmpty(value: any): boolean;
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
        onPropertyChanged: Event<(sender: Base, options: any) => any, any>;
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
        constructor();
        protected onBaseCreating(): void;
        /**
            * Returns the type of the object as a string as it represents in the json. It should be in lowcase.
            */
        getType(): string;
        readonly bindings: Bindings;
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
        readonly isLoadingFromJson: boolean;
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
        /**
            * Make a clone of the existing object. Create a new object of the same type and load all properties into it.
            */
        clone(): Base;
        getProgressInfo(): IProgressInfo;
        locStrsChanged(): void;
        /**
            * Returns the property value by name
            * @param name property name
            */
        getPropertyValue(name: string, defaultValue?: any): any;
        protected getPropertyValueCore(propertiesHash: any, name: string): any;
        geValueFromHash(): any;
        protected setPropertyValueCore(propertiesHash: any, name: string, val: any): void;
        iteratePropertiesHash(func: (hash: any, key: any) => void): void;
        /**
            * set property value
            * @param name property name
            * @param val new property value
            */
        setPropertyValue(name: string, val: any): void;
        protected clearPropertyValue(name: string): void;
        onPropertyValueChangedCallback(name: string, oldValue: any, newValue: any, sender: Base, arrayChanges: ArrayChanges): void;
        itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        protected propertyValueChanged(name: string, oldValue: any, newValue: any, arrayChanges?: ArrayChanges, target?: Base): void;
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
        protected createLocalizableString(name: string, owner: ILocalizableOwner, useMarkDown?: boolean): LocalizableString;
        getLocalizableString(name: string): LocalizableString;
        getLocalizableStringText(name: string, defaultStr?: string): string;
        setLocalizableStringText(name: string, value: string): void;
        addUsedLocales(locales: Array<string>): void;
        protected AddLocStringToUsedLocales(locStr: LocalizableString, locales: Array<string>): void;
        protected createItemValues(name: string): Array<any>;
        protected createNewArrayCore(name: string): Array<any>;
        protected createNewArray(name: string, onPush?: any, onRemove?: any): Array<any>;
        protected getItemValueType(): string;
        protected setArray(name: string, src: any[], dest: any[], isItemValues: boolean, onPush: any): void;
        protected isTwoValueEquals(x: any, y: any, caseInSensitive?: boolean): boolean;
        protected copyCssClasses(dest: any, source: any): void;
}
export declare class ArrayChanges {
        index: number;
        deleteCount: number;
        itemsToAdd: any[];
        deletedItems: any[];
        constructor(index: number, deleteCount: number, itemsToAdd: any[], deletedItems: any[]);
}
export declare class SurveyError {
        text: string;
        protected errorOwner: ISurveyErrorOwner;
        visible: boolean;
        constructor(text?: string, errorOwner?: ISurveyErrorOwner);
        readonly locText: LocalizableString;
        getText(): string;
        getErrorType(): string;
        protected getDefaultText(): string;
}
/**
    * Base class of SurveyJS Elements.
    */
export declare class SurveyElement extends Base implements ISurveyElement {
        protected titleActions: any[];
        stateChangedCallback: () => void;
        static createProgressInfo(): IProgressInfo;
        static getProgressInfoByElements(children: Array<SurveyElement>, isRequired: boolean): IProgressInfo;
        readOnlyChangedCallback: () => void;
        static ScrollElementToTop(elementId: string): boolean;
        static GetFirstNonTextElement(elements: any, removeSpaces?: boolean): any;
        static FocusElement(elementId: string): boolean;
        static CreateDisabledDesignElements: boolean;
        disableDesignActions: boolean;
        constructor(name: string);
        /**
            * Set this property to "collapsed" to render only Panel title and expanded button and to "expanded" to render the collapsed button in the Panel caption
            */
        state: string;
        /**
            * Returns true if the Element is in the collapsed state
            * @see state
            * @see collapse
            * @see isExpanded
            */
        readonly isCollapsed: boolean;
        /**
            * Returns true if the Element is in the expanded state
            * @see state
            * @see expand
            * @see isCollapsed
            */
        readonly isExpanded: boolean;
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
        toggleState(): void;
        getTitleActions(): Array<any>;
        getTitleComponentName(): string;
        setSurveyImpl(value: ISurveyImpl): void;
        protected readonly surveyImpl: ISurveyImpl;
        readonly data: ISurveyData;
        /**
            * Returns the survey object.
            */
        readonly survey: ISurvey;
        /**
            * Returns true if the question in design mode right now.
            */
        readonly isDesignMode: boolean;
        isContentElement: boolean;
        readonly areInvisibleElementsShowing: boolean;
        readonly isVisible: boolean;
        readonly isReadOnly: boolean;
        /**
            * Set it to true to make an element question/panel/page readonly.
            * Please note, this property is hidden for question without input, for example html question.
            * @see enableIf
            * @see isReadOnly
            */
        readOnly: boolean;
        protected onReadOnlyChanged(): void;
        updateElementCss(): void;
        protected getIsLoadingFromJson(): boolean;
        /**
            * This is the identifier of a survey element - question or panel.
            * @see valueName
            */
        name: string;
        protected getValidName(name: string): string;
        protected onNameChanged(oldValue: string): void;
        protected updateBindingValue(valueName: string, value: any): void;
        /**
            * The list of errors. It is created by callig hasErrors functions
            * @see hasErrors
            */
        errors: Array<SurveyError>;
        /**
            * Returns true if a question or a container (panel/page) or their chidren have an error.
            * The value can be out of date. hasErrors function should be called to get the correct value.
            */
        readonly containsErrors: boolean;
        updateContainsErrors(): void;
        protected getContainsErrors(): boolean;
        getElementsInDesign(includeHidden?: boolean): Array<IElement>;
        selectedElementInDesign: SurveyElement;
        updateCustomWidgets(): void;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        endLoadingFromJson(): void;
        setVisibleIndex(index: number): number;
        readonly isPage: boolean;
        /**
            * Return false if it is not panel.
            */
        readonly isPanel: boolean;
        delete(): void;
        protected removeSelfFromList(list: Array<any>): void;
        protected readonly textProcessor: ITextProcessor;
        protected getProcessedHtml(html: string): string;
        protected onSetData(): void;
        protected getPage(parent: IPanel): IPage;
        protected moveToBase(parent: IPanel, container: IPanel, insertBefore?: any): boolean;
        protected setPage(parent: IPanel, val: IPage): void;
}
export declare class Event<T extends Function, Options> {
        onCallbacksChanged: () => void;
        protected callbacks: Array<T>;
        readonly isEmpty: boolean;
        fire(sender: any, options: Options): void;
        clear(): void;
        add(func: T): void;
        remove(func: T): void;
        hasFunc(func: T): boolean;
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
        readonly owner: ISurveyData;
        /**
            * The calculated value name. It should be non empty and unique.
            */
        name: string;
        /**
            * Set this property to true to include the non-empty calculated value into survey result, survey.data property.
            */
        includeIntoResult: boolean;
        /**
            * The Expression that used to calculate the value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
            * <br/>Example: "({quantity} * {price}) * (100 - {discount}) / 100"
            */
        expression: string;
        locCalculation(): void;
        unlocCalculation(): void;
        resetCalculation(): void;
        doCalculation(calculatedValues: Array<CalculatedValue>, values: HashTable<any>, properties: HashTable<any>): void;
        runExpression(values: HashTable<any>, properties: HashTable<any>): void;
        readonly value: any;
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
}
export interface ILocalizableString {
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, newValue: string): any;
        getLocales(): Array<string>;
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
        static defaultLocale: string;
        static defaultRenderer: string;
        static editableRenderer: string;
        onGetTextCallback: (str: string) => string;
        onStrChanged: () => void;
        sharedData: LocalizableString;
        constructor(owner: ILocalizableOwner, useMarkdown?: boolean, name?: string);
        readonly locale: string;
        strChanged(): void;
        text: string;
        readonly calculatedText: string;
        readonly pureText: string;
        readonly hasHtml: boolean;
        readonly html: string;
        readonly isEmpty: boolean;
        readonly textOrHtml: string;
        readonly renderedHtml: string;
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, value: string): void;
        hasNonDefaultText(): boolean;
        getLocales(): Array<string>;
        getJson(): any;
        setJson(value: any): void;
        readonly renderAs: string;
        equals(obj: any): boolean;
        onChanged(): void;
        protected onCreating(): void;
}
/**
    * The class represents the list of strings that supports multi-languages.
    */
export declare class LocalizableStrings implements ILocalizableString {
        owner: ILocalizableOwner;
        constructor(owner: ILocalizableOwner);
        readonly locale: string;
        value: Array<string>;
        text: string;
        getLocaleText(loc: string): string;
        setLocaleText(loc: string, newValue: string): any;
        getValue(loc: string): Array<string>;
        setValue(loc: string, val: Array<string>): void;
        readonly isEmpty: boolean;
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
        expression: string;
        readonly locHtml: LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
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
        html: string;
        readonly locHtml: LocalizableString;
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
        url: string;
        readonly locUrl: LocalizableString;
}

/**
  * A definition for filling choices for checkbox, dropdown and radiogroup questions from resfull services.
  * The run method call a restfull service and results can be get on getResultCallback.
  */
export declare class ChoicesRestfull extends Base {
    static EncodeParameters: boolean;
    static clearCache(): void;
    static onBeforeSendRequest: (sender: ChoicesRestfull, options: {
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
    constructor();
    run(textProcessor?: ITextProcessor): void;
    readonly isUsingCache: boolean;
    readonly isRunning: boolean;
    readonly isWaitingForParameters: boolean;
    protected useChangedItemsResults(): boolean;
    protected parseResponse(response: any): any;
    protected sendRequest(): void;
    getType(): string;
    readonly isEmpty: boolean;
    getCustomPropertiesNames(): Array<string>;
    setData(json: any): void;
    getData(): any;
    url: string;
    path: string;
    valueName: string;
    titleName: string;
    imageLinkName: string;
    allowEmptyResponse: boolean;
    attachOriginalItems: boolean;
    readonly itemValueType: string;
    clear(): void;
    protected beforeSendRequest(): void;
    protected onLoad(result: any, loadingObjHash?: string): void;
    protected callResultCallback(items: Array<ItemValue>, loadingObjHash: string): void;
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
    expression: string;
    getVariables(): Array<string>;
    hasFunction(): boolean;
    readonly isAsync: boolean;
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
}
export declare class BinaryOperand extends Operand {
    constructor(operatorName: string, left?: any, right?: any, isArithmeticOp?: boolean);
    getType(): string;
    readonly isArithmetic: boolean;
    readonly isConjunction: boolean;
    readonly conjunction: string;
    readonly operator: string;
    readonly leftOperand: any;
    readonly rightOperand: any;
    evaluate(processValue?: ProcessValue): any;
    toString(func?: (op: Operand) => string): string;
    setVariables(variables: Array<string>): void;
    hasFunction(): boolean;
    hasAsyncFunction(): boolean;
    addToAsyncList(list: Array<FunctionOperand>): void;
}
export declare class UnaryOperand extends Operand {
    constructor(expressionValue: Operand, operatorName: string);
    readonly operator: string;
    readonly expression: Operand;
    getType(): string;
    toString(func?: (op: Operand) => string): string;
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
}
export declare class Const extends Operand {
    constructor(value: any);
    getType(): string;
    toString(func?: (op: Operand) => string): string;
    readonly correctValue: any;
    evaluate(): any;
    setVariables(variables: Array<string>): void;
    protected getCorrectValue(value: any): any;
}
export declare class Variable extends Const {
    static DisableConversionChar: string;
    constructor(variableName: string);
    getType(): string;
    toString(func?: (op: Operand) => string): string;
    readonly variable: string;
    evaluate(processValue?: ProcessValue): any;
    setVariables(variables: Array<string>): void;
    protected getCorrectValue(value: any): any;
}
export declare class FunctionOperand extends Operand {
    onAsyncReady: () => void;
    constructor(origionalValue: string, parameters: ArrayOperand);
    getType(): string;
    evaluateAsync(processValue: ProcessValue): void;
    evaluate(processValue?: ProcessValue): any;
    toString(func?: (op: Operand) => string): string;
    setVariables(variables: Array<string>): void;
    readonly isReady: boolean;
    hasFunction(): boolean;
    hasAsyncFunction(): boolean;
    addToAsyncList(list: Array<FunctionOperand>): void;
}
export declare class OperandMaker {
    static throwInvalidOperatorError(op: string): void;
    static safeToString(operand: Operand, func: (op: Operand) => string): string;
    static toOperandString(value: string): string;
    static isSpaceString(str: string): boolean;
    static isNumeric(value: string): boolean;
    static isBooleanValue(value: string): boolean;
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
    readonly error: ConditionsParserError;
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
                name: string;
                onGetTextCallback?: (str: string) => string;
        } | boolean;
}
export declare function property(options?: IPropertyDecoratorOptions): (target: any, key: string) => void;
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
        readonly id: number;
        readonly classInfo: JsonMetadataClass;
        type: string;
        isArray: boolean;
        isRequired: boolean;
        isUnique: boolean;
        readonly hasToUseGetValue: string | ((obj: any) => any);
        defaultValue: any;
        isDefaultValue(value: any): boolean;
        getValue(obj: any): any;
        getPropertyValue(obj: any): any;
        readonly hasToUseSetValue: string | ((obj: any, value: any, jsonConv: JsonObject) => any);
        setValue(obj: any, value: any, jsonConv: JsonObject): void;
        getObjType(objType: string): string;
        getClassName(className: string): string;
        /**
            * Depricated, please use getChoices
            */
        readonly choices: Array<any>;
        readonly hasChoices: boolean;
        getChoices(obj: any, choicesCallback?: any): Array<any>;
        setChoices(value: Array<any>, valueFunc?: (obj: any) => Array<any>): void;
        getBaseValue(): string;
        setBaseValue(val: any): void;
        readOnly: boolean;
        isVisible(layout: string, obj?: any): boolean;
        visible: boolean;
        isLocalizable: boolean;
        dataList: Array<string>;
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
        addClass(name: string, properties: Array<any>, creator?: (json?: any) => any, parentName?: string): JsonMetadataClass;
        removeClass(name: string): void;
        overrideClassCreatore(name: string, creator: () => any): void;
        overrideClassCreator(name: string, creator: () => any): void;
        getProperties(className: string): Array<JsonObjectProperty>;
        getPropertiesByObj(obj: any): Array<JsonObjectProperty>;
        getDynamicPropertiesByObj(obj: any, dynamicType?: string): Array<JsonObjectProperty>;
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
        static readonly metaData: JsonMetadata;
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
        getProcessedText(text: string): string;
        getSharedQuestionByName(columnName: string, row: MatrixDropdownRowModelBase): Question;
        onTotalValueChanged(): any;
        getSurvey(): ISurvey;
}
export interface IMatrixColumnOwner extends ILocalizableOwner {
        getRequiredText(): string;
        onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
        getCellType(): string;
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
export declare class MatrixDropdownColumn extends Base implements ILocalizableOwner {
        static getColumnTypes(): Array<string>;
        constructor(name: string, title?: string);
        endLoadingFromJson(): void;
        getDynamicPropertyName(): string;
        getDynamicType(): string;
        colOwner: IMatrixColumnOwner;
        locStrsChanged(): void;
        addUsedLocales(locales: Array<string>): void;
        readonly index: number;
        setIndex(val: number): void;
        getType(): string;
        cellType: string;
        readonly templateQuestion: Question;
        readonly value: string;
        readonly isVisible: boolean;
        setIsVisible(newVal: boolean): void;
        hasVisibleCell: boolean;
        name: string;
        title: string;
        readonly locTitle: LocalizableString;
        readonly fullTitle: string;
        isRequired: boolean;
        readonly requiredText: string;
        requiredErrorText: string;
        readonly locRequiredErrorText: LocalizableString;
        readOnly: boolean;
        hasOther: boolean;
        visibleIf: string;
        enableIf: string;
        requiredIf: string;
        showInMultipleColumns: boolean;
        readonly isSupportMultipleColumns: boolean;
        readonly isShowInMultipleColumns: boolean;
        validators: Array<SurveyValidator>;
        totalType: string;
        totalExpression: string;
        readonly hasTotal: boolean;
        totalFormat: string;
        readonly locTotalFormat: LocalizableString;
        renderAs: string;
        totalMaximumFractionDigits: number;
        totalMinimumFractionDigits: number;
        totalDisplayStyle: string;
        totalCurrency: string;
        minWidth: string;
        width: string;
        colCount: number;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getProcessedText(text: string): string;
        createCellQuestion(data: any): Question;
        updateCellQuestion(cellQuestion: Question, data: any, onUpdateJson?: (json: any) => any): void;
        defaultCellTypeChanged(): void;
        protected calcCellQuestionType(): string;
        protected updateTemplateQuestion(): void;
        protected createNewQuestion(cellType: string): Question;
        protected setQuestionProperties(question: Question, onUpdateJson?: (json: any) => any): void;
        protected propertyValueChanged(name: string, oldValue: any, newValue: any): void;
}
export declare class MatrixDropdownCell {
        column: MatrixDropdownColumn;
        row: MatrixDropdownRowModelBase;
        data: IMatrixDropdownData;
        constructor(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData);
        locStrsChanged(): void;
        protected createQuestion(column: MatrixDropdownColumn, row: MatrixDropdownRowModelBase, data: IMatrixDropdownData): Question;
        readonly question: Question;
        value: any;
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
        constructor(data: IMatrixDropdownData, value: any);
        readonly id: string;
        readonly rowName: any;
        value: any;
        readonly locText: LocalizableString;
        readonly hasPanel: boolean;
        readonly detailPanel: PanelModel;
        readonly detailPanelId: string;
        readonly isDetailPanelShowing: boolean;
        showDetailPanel(): void;
        hideDetailPanel(destroyPanel?: boolean): void;
        getAllValues(): any;
        getFilteredValues(): any;
        getFilteredProperties(): any;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        onAnyValueChanged(name: string): void;
        getDataValueCore(valuesHash: any, key: string): any;
        getValue(name: string): any;
        setValue(name: string, newColumnValue: any): void;
        getVariable(name: string): any;
        setVariable(name: string, newValue: any): void;
        getComment(name: string): string;
        setComment(name: string, newValue: string, locNotification: any): void;
        readonly isEmpty: boolean;
        getQuestionByColumn(column: MatrixDropdownColumn): Question;
        getQuestionByColumnName(columnName: string): Question;
        readonly questions: Array<Question>;
        getQuestionByName(name: string): Question;
        getQuestionsByName(name: string): Array<Question>;
        protected getSharedQuestionByName(columnName: string): Question;
        clearIncorrectValues(val: any): void;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getProcessedText(text: string): string;
        locStrsChanged(): void;
        updateCellQuestionOnColumnChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        onQuestionReadOnlyChanged(parentIsReadOnly: boolean): void;
        hasErrors(fireCallback: boolean, rec: any, raiseOnCompletedAsyncValidators: () => void): boolean;
        protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
        protected buildCells(value: any): void;
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        geSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        readonly rowIndex: number;
        readonly editingObj: Base;
        dispose(): void;
}
export declare class MatrixDropdownTotalRowModel extends MatrixDropdownRowModelBase {
        constructor(data: IMatrixDropdownData);
        protected createCell(column: MatrixDropdownColumn): MatrixDropdownCell;
        setValue(name: string, newValue: any): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        protected updateCellOnColumnChanged(cell: MatrixDropdownCell, name: string, newValue: any): void;
}
export declare class QuestionMatrixDropdownRenderedCell {
        minWidth: string;
        width: string;
        locTitle: LocalizableString;
        cell: MatrixDropdownCell;
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
        className: string;
        constructor();
        readonly hasQuestion: boolean;
        readonly hasTitle: boolean;
        readonly hasPanel: boolean;
        readonly id: number;
        readonly showErrorOnTop: boolean;
        readonly showErrorOnBottom: boolean;
        item: ItemValue;
        readonly isChoice: boolean;
        readonly choiceValue: any;
        readonly isCheckbox: boolean;
        readonly isFirstChoice: boolean;
}
export declare class QuestionMatrixDropdownRenderedRow {
        isDetailRow: boolean;
        row: MatrixDropdownRowModelBase;
        cells: Array<QuestionMatrixDropdownRenderedCell>;
        className: string;
        constructor();
        readonly id: number;
}
export declare class QuestionMatrixDropdownRenderedTable extends Base {
        matrix: QuestionMatrixDropdownModelBase;
        constructor(matrix: QuestionMatrixDropdownModelBase);
        readonly showTable: boolean;
        readonly showHeader: boolean;
        readonly showAddRowOnTop: boolean;
        readonly showAddRowOnBottom: boolean;
        readonly showFooter: boolean;
        readonly hasFooter: boolean;
        readonly hasRemoveRows: boolean;
        isRequireReset(): boolean;
        readonly headerRow: QuestionMatrixDropdownRenderedRow;
        readonly footerRow: QuestionMatrixDropdownRenderedRow;
        readonly rows: Array<QuestionMatrixDropdownRenderedRow>;
        protected build(): void;
        updateShowTableAndAddRow(): void;
        onAddedRow(): void;
        onRemovedRow(row: MatrixDropdownRowModelBase): void;
        onDetailPanelChangeVisibility(row: MatrixDropdownRowModelBase, isShowing: boolean): void;
        protected buildHeader(): void;
        protected buildFooter(): void;
        protected buildRows(): void;
}
/**
    * A base class for matrix dropdown and matrix dynamic questions.
    */
export declare class QuestionMatrixDropdownModelBase extends QuestionMatrixBaseModel<MatrixDropdownRowModelBase, MatrixDropdownColumn> implements IMatrixDropdownData {
        name: string;
        static defaultCellType: string;
        static addDefaultColumns(matrix: QuestionMatrixDropdownModelBase): void;
        protected isRowChanging: boolean;
        columnsChangedCallback: () => void;
        updateCellsCallback: () => void;
        onRenderedTableResetCallback: () => void;
        onRenderedTableCreatedCallback: (table: QuestionMatrixDropdownRenderedTable) => void;
        onCellCreatedCallback: (options: any) => void;
        onCellValueChangedCallback: (options: any) => void;
        onHasDetailPanelCallback: (row: MatrixDropdownRowModelBase) => boolean;
        onCreateDetailPanelCallback: (row: MatrixDropdownRowModelBase, panel: PanelModel) => void;
        protected createColumnValues(): any[];
        constructor(name: string);
        getType(): string;
        readonly hasSingleInput: boolean;
        readonly isRowsDynamic: boolean;
        /**
            * Set columnLayout to 'vertical' to place columns vertically and rows horizontally. It makes sense when we have many columns and few rows.
            * @see columns
            * @see rowCount
            */
        columnLayout: string;
        columnsLocation: string;
        /**
            * Returns true if columns are located horizontally
            * @see columnLayout
            */
        readonly isColumnLayoutHorizontal: boolean;
        /**
            * Set the value to "underRow" to show the detailPanel under the row.
            */
        detailPanelMode: string;
        /**
            * The detail template Panel. This panel is used as a template on creating detail panel for a row.
            * @see  detailElements
            * @see detailPanelMode
            */
        readonly detailPanel: PanelModel;
        getPanel(): IPanel;
        /**
            * The template Panel elements, questions and panels.
            * @see  detailPanel
            * @see detailPanelMode
            */
        readonly detailElements: Array<IElement>;
        protected createNewDetailPanel(): PanelModel;
        readonly hasRowText: boolean;
        getFooterText(): LocalizableString;
        readonly canAddRow: boolean;
        readonly canRemoveRows: boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        protected onRowsChanged(): void;
        protected onStartRowAddingRemoving(): void;
        protected onEndRowAdding(): void;
        protected onEndRowRemoving(row: MatrixDropdownRowModelBase): void;
        protected resetRenderedTable(): void;
        protected clearGeneratedRows(): void;
        readonly renderedTable: QuestionMatrixDropdownRenderedTable;
        protected createRenderedTable(): QuestionMatrixDropdownRenderedTable;
        protected onMatrixRowCreated(row: MatrixDropdownRowModelBase): void;
        /**
            * Use this property to change the default cell type.
            */
        cellType: string;
        /**
            * The default column count for radiogroup and checkbox  cell types.
            */
        columnColCount: number;
        /**
            * Use this property to set the minimum column width.
            */
        columnMinWidth: string;
        /**
            * Set this property to true to show the horizontal scroll.
            */
        horizontalScroll: boolean;
        getRequiredText(): string;
        onColumnPropertyChanged(column: MatrixDropdownColumn, name: string, newValue: any): void;
        onShowInMultipleColumnsChanged(column: MatrixDropdownColumn): void;
        onColumnCellTypeChanged(column: MatrixDropdownColumn): void;
        getRowTitleWidth(): string;
        readonly hasFooter: boolean;
        getAddRowLocation(): string;
        getShowColumnsIfEmpty(): boolean;
        protected setShowColumnsIfEmpty(): void;
        protected updateHasFooter(): void;
        readonly hasTotal: boolean;
        getCellType(): string;
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
        choices: Array<any>;
        /**
            * The default options caption for dropdown cell type.
            */
        optionsCaption: string;
        readonly locOptionsCaption: LocalizableString;
        readonly storeOthersAsComment: boolean;
        addColumn(name: string, title?: string): MatrixDropdownColumn;
        protected getVisibleRows(): Array<MatrixDropdownRowModelBase>;
        readonly totalValue: any;
        protected getVisibleTotalRow(): MatrixDropdownRowModelBase;
        readonly visibleTotalRow: MatrixDropdownRowModelBase;
        onSurveyLoad(): void;
        /**
            * Returns the row value. If the row value is empty, the object is empty: {}.
            * @param rowIndex row index from 0 to visible row count - 1.
            */
        getRowValue(rowIndex: number): any;
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
        protected getRowDisplayValue(row: MatrixDropdownRowModelBase, rowValue: any): any;
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
        readonly isValidateOnValueChanging: boolean;
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
        getSurvey(): ISurvey;
}

export declare class MatrixDropdownRowModel extends MatrixDropdownRowModelBase {
        name: string;
        constructor(name: string, item: ItemValue, data: IMatrixDropdownData, value: any);
        readonly rowName: string;
        readonly text: string;
        readonly locText: LocalizableString;
}
/**
    * A Model for a matrix dropdown question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
    */
export declare class QuestionMatrixDropdownModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        name: string;
        constructor(name: string);
        getType(): string;
        /**
            * Set this property to show it on the first column for the total row.
            */
        totalText: string;
        readonly locTotalText: LocalizableString;
        getFooterText(): LocalizableString;
        /**
            * The column width for the first column, row title column.
            */
        rowTitleWidth: string;
        getRowTitleWidth(): string;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        clearIncorrectValues(): void;
        clearValueIfInvisible(): void;
        protected generateRows(): Array<MatrixDropdownRowModel>;
        protected createMatrixRow(item: ItemValue, value: any): MatrixDropdownRowModel;
}

export declare class MatrixDynamicRowModel extends MatrixDropdownRowModelBase {
        index: number;
        constructor(index: number, data: IMatrixDropdownData, value: any);
        readonly rowName: string;
}
/**
    * A Model for a matrix dymanic question. You may use a dropdown, checkbox, radiogroup, text and comment questions as a cell editors.
    * An end-user may dynamically add/remove rows, unlike in matrix dropdown question.
    */
export declare class QuestionMatrixDynamicModel extends QuestionMatrixDropdownModelBase implements IMatrixDropdownData {
        name: string;
        onGetValueForNewRowCallBack: (sender: QuestionMatrixDynamicModel) => any;
        constructor(name: string);
        getType(): string;
        readonly isRowsDynamic: boolean;
        /**
            * Set it to true, to show a confirmation dialog on removing a row
            * @see ConfirmDeleteText
            */
        confirmDelete: boolean;
        /**
            * Set it to a column name and the library shows duplication error, if there are same values in different rows in the column.
            * @see keyDuplicationError
            */
        keyName: string;
        /**
            * If it is not empty, then this value is set to every new row, including rows created initially, unless the defaultValue is not empty
            * @see defaultValue
            * @see defaultValueFromLastRow
            */
        defaultRowValue: any;
        /**
            * Set it to true to copy the value into new added row from the last row. If defaultRowValue is set and this property equals to true,
            * then the value for new added row is merging.
            * @see defaultValue
            * @see defaultRowValue
            */
        defaultValueFromLastRow: boolean;
        protected isDefaultValueEmpty(): boolean;
        protected valueFromData(val: any): any;
        protected setDefaultValue(): void;
        protected isEditingSurveyElement(value: any): boolean;
        /**
            * The number of rows in the matrix.
            * @see minRowCount
            * @see maxRowCount
            */
        rowCount: number;
        /**
            * The minimum row count. A user could not delete a row if the rowCount equals to minRowCount
            * @see rowCount
            * @see maxRowCount
            * @see allowAddRows
            */
        minRowCount: number;
        /**
            * The maximum row count. A user could not add a row if the rowCount equals to maxRowCount
            * @see rowCount
            * @see minRowCount
            * @see allowAddRows
            */
        maxRowCount: number;
        /**
            * Set this property to false to disable ability to add new rows. "Add new Row" button becomes invsible in UI
            * @see canAddRow
            * @see allowRemoveRows
            */
        allowAddRows: boolean;
        /**
            * Set this property to false to disable ability to remove rows. "Remove" row buttons become invsible in UI
            * @see canRemoveRows
            * @see allowAddRows
            */
        allowRemoveRows: boolean;
        /**
            * Returns true, if a new row can be added.
            * @see allowAddRows
            * @see maxRowCount
            * @see canRemoveRows
            * @see rowCount
            */
        readonly canAddRow: boolean;
        /**
            * Returns true, if row can be removed.
            * @see minRowCount
            * @see canAddRow
            * @see rowCount
            */
        readonly canRemoveRows: boolean;
        canRemoveRow(row: MatrixDropdownRowModelBase): boolean;
        /**
            * Creates and add a new row.
            */
        addRow(): void;
        protected hasRowsAsItems(): boolean;
        unbindValue(): void;
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
        confirmDeleteText: string;
        readonly locConfirmDeleteText: LocalizableString;
        /**
            * The duplication value error text. Set it to show the text different from the default.
            * @see keyName
            */
        keyDuplicationError: string;
        readonly locKeyDuplicationError: LocalizableString;
        /**
            * Use this property to change the default value of add row button text.
            */
        addRowText: string;
        readonly locAddRowText: LocalizableString;
        /**
            * By default the 'Add Row' button is shown on bottom if columnLayout is horizontal and on top if columnLayout is vertical. <br/>
            * You may set it to "top", "bottom" or "topBottom" (to show on top and bottom).
            * @see columnLayout
            */
        addRowLocation: string;
        getAddRowLocation(): string;
        /**
            * Set this property to true to hide matrix columns when there is no any row.
            */
        hideColumnsIfEmpty: boolean;
        getShowColumnsIfEmpty(): boolean;
        /**
            * Use this property to change the default value of remove row button text.
            */
        removeRowText: string;
        readonly locRemoveRowText: LocalizableString;
        /**
            * Use this property to change the default value of remove row button text.
            */
        emptyRowsText: string;
        readonly locEmptyRowsText: LocalizableString;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        addConditionObjectsByContext(objects: Array<IConditionObject>, context: any): void;
        supportGoNextPageAutomatic(): boolean;
        readonly hasRowText: boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        protected generateRows(): Array<MatrixDynamicRowModel>;
        protected createMatrixRow(value: any): MatrixDynamicRowModel;
        protected onBeforeValueChanged(val: any): void;
        protected createNewValue(): any;
        protected deleteRowValue(newValue: any, row: MatrixDropdownRowModelBase): any;
        protected getRowValueCore(row: MatrixDropdownRowModelBase, questionValue: any, create?: boolean): any;
}

export interface IMatrixData {
        onMatrixRowChanged(row: MatrixRowModel): void;
        getCorrectedRowValue(value: any): any;
}
export declare class MatrixRowModel extends Base {
        fullName: string;
        cellClick: any;
        constructor(item: ItemValue, fullName: string, data: IMatrixData, value: any);
        readonly name: string;
        readonly text: string;
        readonly locText: LocalizableString;
        value: any;
        readonly rowClasses: string;
}
export interface IMatrixCellsOwner extends ILocalizableOwner {
        getRows(): Array<any>;
        getColumns(): Array<any>;
}
export declare class MartrixCells {
        cellsOwner: IMatrixCellsOwner;
        constructor(cellsOwner: IMatrixCellsOwner);
        readonly isEmpty: boolean;
        setCellText(row: any, column: any, val: string): void;
        setDefaultCellText(column: any, val: string): void;
        getCellLocText(row: any, column: any): LocalizableString;
        getDefaultCellLocText(column: any, val: string): LocalizableString;
        getCellDisplayLocText(row: any, column: any): LocalizableString;
        getCellText(row: any, column: any): string;
        getDefaultCellText(column: any): string;
        getCellDisplayText(row: any, column: any): string;
        readonly rows: Array<any>;
        readonly columns: Array<any>;
        getJson(): any;
        setJson(value: any): void;
        protected createString(): LocalizableString;
}
/**
    * A Model for a simple matrix question.
    */
export declare class QuestionMatrixModel extends QuestionMatrixBaseModel<MatrixRowModel, ItemValue> implements IMatrixData, IMatrixCellsOwner {
        name: string;
        constructor(name: string);
        getType(): string;
        readonly hasSingleInput: boolean;
        /**
            * Set this property to true, if you want a user to answer all rows.
            */
        isAllRowRequired: boolean;
        /**
            * Returns true, if there is at least one row.
            */
        readonly hasRows: boolean;
        /**
            * Use this property to render items in a specific order: "random" or "initial". Default is "initial".
            */
        rowsOrder: string;
        /**
            * Set this property to true to hide the question if there is no visible rows in the matrix.
            */
        hideIfRowsEmpty: boolean;
        getRows(): Array<any>;
        getColumns(): Array<any>;
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
        readonly visibleRows: Array<MatrixRowModel>;
        cells: MartrixCells;
        readonly hasCellText: boolean;
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
        readonly id: string;
        /**
            * The item name.
            */
        name: string;
        readonly question: Question;
        readonly editor: QuestionTextModel;
        protected createEditor(name: string): QuestionTextModel;
        addUsedLocales(locales: Array<string>): void;
        locStrsChanged(): void;
        setData(data: IMultipleTextData): void;
        /**
            * Set this property to true, to make the item a required. If a user doesn't fill the item then a validation error will be generated.
            */
        isRequired: boolean;
        /**
            * Use this property to change the default input type.
            */
        inputType: string;
        /**
            * Item title. If it is empty, the item name is rendered as title. This property supports markdown.
            * @see name
            */
        title: string;
        readonly locTitle: LocalizableString;
        /**
            * Returns the text or html for rendering the title.
            */
        readonly fullTitle: string;
        /**
            * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
            * If it is 0, then the value is unlimited
            * @see SurveyModel.maxTextLength
            */
        maxLength: number;
        getMaxLength(): any;
        /**
            * The input place holder.
            */
        placeHolder: string;
        readonly locPlaceHolder: LocalizableString;
        /**
            * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
            */
        requiredErrorText: string;
        readonly locRequiredErrorText: LocalizableString;
        /**
            * The list of question validators.
            */
        validators: Array<SurveyValidator>;
        getValidators(): Array<SurveyValidator>;
        /**
            * The item value.
            */
        value: any;
        isEmpty(): boolean;
        onValueChanged(newValue: any): void;
        geSurveyData(): ISurveyData;
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
        validatedValue: any;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
}
/**
    * A Model for a multiple text question.
    */
export declare class QuestionMultipleTextModel extends Question implements IMultipleTextData, IPanel {
        name: string;
        colCountChangedCallback: () => void;
        constructor(name: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl): void;
        readonly isAllowTitleLeft: boolean;
        readonly hasSingleInput: boolean;
        onSurveyLoad(): void;
        setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        onSurveyValueChanged(newValue: any): void;
        /**
            * The list of input items.
            */
        items: Array<MultipleTextItemModel>;
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
        colCount: number;
        /**
            * The default text input size.
            */
        itemSize: number;
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
        getMultipleTextValue(name: string): any;
        setMultipleTextValue(name: string, value: any): void;
        getItemDefaultValue(name: string): any;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getAllValues(): any;
        getIsRequiredText(): string;
        addElement(element: IElement, index: number): void;
        removeElement(element: IElement): boolean;
        getQuestionTitleLocation(): string;
        getQuestionStartIndex(): string;
        getChildrenLayoutType(): string;
        elementWidthChanged(el: IElement): void;
        readonly elements: Array<IElement>;
        indexOf(el: IElement): number;
        ensureRowsVisibility(): void;
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
        readonly id: string;
        readonly elements: Array<IElement>;
        visible: boolean;
        isNeedRender: boolean;
        readonly visibleElements: Array<IElement>;
        updateVisible(): void;
        addElement(q: IElement): void;
        readonly index: number;
        setElementMaxMinWidth(el: IElement): void;
}
/**
    * A base class for a Panel and Page objects.
    */
export declare class PanelModelBase extends SurveyElement implements IPanel, IConditionRunner, ILocalizableOwner, ISurveyErrorOwner {
        name: string;
        addElementCallback: (element: IElement) => void;
        removeElementCallback: (element: IElement) => void;
        onGetQuestionTitleLocation: () => string;
        constructor(name?: string);
        getType(): string;
        setSurveyImpl(value: ISurveyImpl): void;
        endLoadingFromJson(): void;
        /**
            * PanelModel or PageModel title property.
            * @description
            */
        title: string;
        readonly locTitle: LocalizableString;
        readonly _showTitle: boolean;
        getTitleActions(): Array<any>;
        readonly _showDescription: boolean;
        /**
            * PanelModel or PageModel description property. It renders under title by using smaller font. Unlike the title, description can be empty.
            * @see title
            */
        description: string;
        readonly locDescription: LocalizableString;
        locStrsChanged(): void;
        /**
            * Returns the char/string for a required panel.
            * @see SurveyModel.requiredText
            */
        readonly requiredText: string;
        protected readonly titlePattern: string;
        readonly isRequireTextOnStart: boolean;
        readonly isRequireTextBeforeTitle: boolean;
        readonly isRequireTextAfterTitle: boolean;
        /**
            * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
            */
        requiredErrorText: string;
        readonly locRequiredErrorText: LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getProcessedText(text: string): string;
        /**
            * A parent element. It is always null for the Page object and always not null for the Panel object. Panel object may contain Questions and other Panels.
            */
        parent: PanelModelBase;
        readonly depth: number;
        /**
            * An expression that returns true or false. If it returns true the Panel becomes visible and if it returns false the Panel becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
            * @see visible
            */
        visibleIf: string;
        readonly cssClasses: any;
        protected readonly css: any;
        /**
            * A unique element identificator. It is generated automatically.
            */
        id: string;
        /**
            * Returns true if the current object is Panel. Returns false if the current object is Page (a root Panel).
            */
        readonly isPanel: boolean;
        getPanel(): IPanel;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Returns the list of all questions located in the Panel/Page, including in the nested Panels.
            * @see Question
            * @see elements
            */
        readonly questions: Array<Question>;
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
        readonly elements: Array<IElement>;
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
        isRequired: boolean;
        /**
            * An expression that returns true or false. If it returns true the Panel/Page becomes required.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
            * @see isRequired
            */
        requiredIf: string;
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
        readonly isActive: boolean;
        updateCustomWidgets(): void;
        /**
            * Set this property different from "default" to set the specific question title location for this panel/page.
            * @see SurveyModel.questionTitleLocation
            */
        questionTitleLocation: string;
        getQuestionTitleLocation(): string;
        protected getStartIndex(): string;
        getQuestionStartIndex(): string;
        getChildrenLayoutType(): string;
        getProgressInfo(): IProgressInfo;
        protected readonly root: PanelModelBase;
        protected childVisibilityChanged(): void;
        protected createRow(): QuestionRowModel;
        onSurveyLoad(): void;
        onFirstRendering(): void;
        readonly rows: Array<QuestionRowModel>;
        ensureRowsVisibility(): void;
        protected onRowsChanged(): void;
        protected onAddElement(element: IElement, index: number): void;
        protected onRemoveElement(element: IElement): void;
        protected updateRowsRemoveElementFromRow(element: IElement, row: QuestionRowModel): void;
        elementWidthChanged(el: IElement): void;
        /**
            * Returns rendered title text or html.
            */
        readonly processedTitle: string;
        protected getRenderedTitle(str: string): string;
        /**
            * Use it to get/set the object visibility.
            * @see visibleIf
            */
        visible: boolean;
        protected onVisibleChanged(): void;
        /**
            * Returns true if object is visible or survey is in design mode right now.
            */
        readonly isVisible: boolean;
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
        readonly isReadOnly: boolean;
        protected onReadOnlyChanged(): void;
        updateElementCss(): void;
        /**
            * An expression that returns true or false. If it returns false the Panel/Page becomes read only and an end-user will not able to answer on qustions inside it.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
            * @see readOnly
            * @see isReadOnly
            */
        enableIf: string;
        /**
            * Add an element into Panel or Page. Returns true if the element added successfully. Otherwise returns false.
            * @param element
            * @param index element index in the elements array
            */
        addElement(element: IElement, index?: number): boolean;
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
        protected dragDropFindRow(findElement: ISurveyElement): QuestionRowModel;
        dragDropMoveElement(src: IElement, target: IElement, targetIndex: number): void;
        dispose(): void;
}
/**
    * A container element, similar to the Page objects. However, unlike the Page, Panel can't be a root.
    * It may contain questions and other panels.
    */
export declare class PanelModel extends PanelModelBase implements IElement, ITitleOwner {
        name: string;
        minWidth?: string;
        maxWidth?: string;
        constructor(name?: string);
        getType(): string;
        readonly contentId: string;
        onSurveyLoad(): void;
        readonly isPanel: boolean;
        /**
            * Get/set the page where the panel is located.
            */
        page: IPage;
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
        readonly visibleIndex: number;
        /**
            * Set showNumber to true to start showing the number for this panel.
            * @see visibleIndex
            */
        showNumber: boolean;
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
        showQuestionNumbers: string;
        /**
            * Gets or sets the first question index for elements inside the panel. The first question index is '1.' by default and it is taken from survey.questionStartIndex property.
            * You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
            * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
            * @see survey.questionStartIndex
            */
        questionStartIndex: string;
        getQuestionStartIndex(): string;
        /**
            * The property returns the question number. If question is invisible then it returns empty string.
            * If visibleIndex is 1, then no is 2, or 'B' if survey.questionStartIndex is 'A'.
            * @see SurveyModel.questionStartIndex
            */
        readonly no: string;
        protected setNo(visibleIndex: number): void;
        protected beforeSetVisibleIndex(index: number): number;
        protected getPanelStartIndex(index: number): number;
        protected isContinueNumbering(): boolean;
        protected hasErrorsCore(rec: any): void;
        protected getRenderedTitle(str: string): string;
        /**
            * The Panel width.
            */
        width: string;
        /**
            * The left indent. Set this property to increase the panel left indent.
            */
        indent: number;
        /**
            * The inner indent. Set this property to increase the panel content margin.
            */
        innerIndent: number;
        renderWidth: string;
        /**
            * The Panel renders on the new line if the property is true. If the property is false, the panel tries to render on the same line/row with a previous question/panel.
            */
        startWithNewLine: boolean;
        /**
            * The right indent of the Panel.
            */
        rightIndent: number;
        paddingLeft: string;
        innerPaddingLeft: string;
        paddingRight: string;
        clearOnDeletingContainer(): void;
        readonly hasEditButton: boolean;
        cancelPreview(): void;
        protected onVisibleChanged(): void;
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
    content: string;
    readonly locContent: LocalizableString;
    html: string;
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
        name: string;
        constructor(name?: string);
        getType(): string;
        toString(): string;
        readonly isPage: boolean;
        navigationTitle: string;
        readonly locNavigationTitle: LocalizableString;
        navigationDescription: string;
        readonly locNavigationDescription: LocalizableString;
        passed: boolean;
        delete(): void;
        onFirstRendering(): void;
        /**
            * The visible index of the page. It has values from 0 to visible page count - 1.
            * @see SurveyModel.visiblePages
            * @see SurveyModel.pages
            */
        visibleIndex: number;
        /**
            * Returns true, if the page is started page in the survey. It can be shown on the start only and the end-user could not comeback to it after it passed it.
            */
        readonly isStarted: boolean;
        readonly cssClasses: any;
        getIsPageVisible(exceptionQuestion: IQuestion): boolean;
        num: number;
        /**
            * Set this property to "hide" to make "Prev", "Next" and "Complete" buttons are invisible for this page. Set this property to "show" to make these buttons visible, even if survey showNavigationButtons property is false.
            * @see SurveyMode.showNavigationButtons
            */
        navigationButtonsVisibility: string;
        /**
            * The property returns true, if the page has been shown to the end-user.
            */
        readonly wasShown: boolean;
        readonly hasShown: boolean;
        setWasShown(val: boolean): void;
        /**
            * The property returns true, if the elements are randomized on the page
            * @see hasShown
            * @see questionsOrder
            * @see SurveyModel.questionsOrder
            */
        readonly areQuestionsRandomized: boolean;
        /**
            * Use this property to randomize questions. Set it to 'random' to randomize questions, 'initial' to keep them in the same order or 'default' to use the Survey questionsOrder property
            * @see SurveyModel.questionsOrder
            * @see areQuestionsRandomized
            */
        questionsOrder: string;
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
        maxTimeToFinish: number;
        protected onNumChanged(value: number): void;
        protected onVisibleChanged(): void;
        dragDropStart(src: IElement, target: IElement, nestedPanelDepth?: number): void;
        dragDropMoveTo(destination: ISurveyElement, isBottom?: boolean, isEdge?: boolean): boolean;
        dragDropFinish(isCancel?: boolean): IElement;
        ensureRowsVisibility(): void;
}

export interface IConditionObject {
        name: string;
        text: string;
        question: Question;
}
/**
    * A base class for all questions.
    */
export declare class Question extends SurveyElement implements IQuestion, IConditionRunner, ILocalizableOwner, IValidatorOwner, ITitleOwner {
        name: string;
        [index: string]: any;
        customWidgetData: {
                isNeedRender: boolean;
        };
        focusCallback: () => void;
        surveyLoadCallback: () => void;
        valueChangedCallback: () => void;
        commentChangedCallback: () => void;
        validateValueCallback: () => SurveyError;
        questionTitleTemplateCallback: () => string;
        afterRenderQuestionCallback: (question: Question, element: any) => any;
        valueFromDataCallback: (val: any) => any;
        valueToDataCallback: (val: any) => any;
        protected isReadyValue: boolean;
        /**
            * The event is fired when isReady property of question is changed.
            * <br/> options.question - the question
            * <br/> options.isReady - current value of isReady
            * <br/> options.oldIsReady - old value of isReady
            */
        onReadyChanged: Event<(sender: Question, options: any) => any, any>;
        isReadOnlyRenderDiv(): boolean;
        constructor(name: string);
        getValueName(): string;
        /**
            * Use this property if you want to store the question result in the name different from the question name.
            * Question name should be unique in the survey and valueName could be not unique. It allows to share data between several questions with the same valueName.
            * The library set the value automatically if the question.name property is not valid. For example, if it contains the period '.' symbol.
            * In this case if you set the question.name property to 'x.y' then the valueName becomes 'x y'.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see name
            */
        valueName: string;
        protected onValueNameChanged(oldValue: string): void;
        protected onNameChanged(oldValue: string): void;
        readonly isReady: boolean;
        /**
            * Get is question ready to use
            */
        choicesLoaded(): void;
        /**
            * Get/set the page where the question is located.
            */
        page: IPage;
        getPanel(): IPanel;
        delete(): void;
        readonly isFlowLayout: boolean;
        getLayoutType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Use it to get/set the question visibility.
            * @see visibleIf
            */
        visible: boolean;
        protected onVisibleChanged(): void;
        /**
            * Use it to choose how other question values will be rendered in title if referenced in {}.
            * Please note, this property is hidden for question without input, for example html question.
            */
        useDisplayValuesInTitle: boolean;
        /**
            * An expression that returns true or false. If it returns true the Question becomes visible and if it returns false the Question becomes invisible. The library runs the expression on survey start and on changing a question value. If the property is empty then visible property is used.
            * @see visible
            */
        visibleIf: string;
        /**
            * Returns true if the question is visible or survey is in design mode right now.
            */
        readonly isVisible: boolean;
        /**
            * Returns the visible index of the question in the survey. It can be from 0 to all visible questions count - 1
            * The visibleIndex is -1 if the title is 'hidden' or hideNumber is true
            * @see titleLocation
            * @see hideNumber
            */
        readonly visibleIndex: number;
        /**
            * Set hideNumber to true to stop showing the number for this question. The question will not be counter
            * @see visibleIndex
            * @see titleLocation
            */
        hideNumber: boolean;
        /**
            * Returns true if the question may have a title located on the left
            */
        readonly isAllowTitleLeft: boolean;
        /**
            * Returns the type of the object as a string as it represents in the json.
            */
        getType(): string;
        /**
            * Move question to a new container Page/Panel. Add as a last element if insertBefore parameter is not used or inserted into the given index,
            * if insert parameter is number, or before the given element, if the insertBefore parameter is a question or panel
            * @param container Page or Panel to where a question is relocated.
            * @param insertBefore Use it if you want to set the question to a specific position. You may use a number (use 0 to insert int the beginning) or element, if you want to insert before this element.
            */
        moveTo(container: IPanel, insertBefore?: any): boolean;
        getProgressInfo(): IProgressInfo;
        setSurveyImpl(value: ISurveyImpl): void;
        getDataFilteredValues(): any;
        getDataFilteredProperties(): any;
        /**
            * A parent element. It can be panel or page.
            */
        parent: IPanel;
        /**
            * A parent question. It can be a dynamic panel or dynamic/dropdown matrices. If the value is a matrix, it means that question is a cell question.
            * This property is null for a stand alone question.
            */
        readonly parentQuestion: Question;
        setParentQuestion(val: Question): void;
        protected onParentChanged(): void;
        /**
            * Returns false if the question doesn't have a title property, for example: QuestionHtmlModel, or titleLocation property equals to "hidden"
            * @see titleLocation
            */
        readonly hasTitle: boolean;
        /**
            * Set this property different from "default" to set the specific question title location for this panel/page.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see SurveyModel.questionTitleLocation
            */
        titleLocation: string;
        /**
            * Return the title location based on question titleLocation property and QuestionTitleLocation of it's parents
            * @see titleLocation
            * @see PanelModelBase.QuestionTitleLocation
            * @see SurveyModel.QuestionTitleLocation
            */
        getTitleLocation(): string;
        protected getTitleLocationCore(): string;
        readonly hasTitleOnLeft: boolean;
        readonly hasTitleOnTop: boolean;
        readonly hasTitleOnBottom: boolean;
        readonly hasTitleOnLeftTop: boolean;
        readonly errorLocation: string;
        /**
            * Returns false if the question doesn't have an input element, for example: QuestionHtmlModel
            * @see hasSingleInput
            */
        readonly hasInput: boolean;
        /**
            * Returns false if the question doesn't have an input element or have multiple inputs: matrices or panel dynamic
            * @see hasInput
            */
        readonly hasSingleInput: boolean;
        readonly inputId: string;
        /**
            * Question title. Use survey questionTitleTemplate property to change the title question is rendered. If it is empty, then question name property is used.
            * @see SurveyModel.questionTitleTemplate
            */
        title: string;
        readonly locTitle: LocalizableString;
        /**
            * Question description. It renders under question title by using smaller font. Unlike the title, description can be empty.
            * Please note, this property is hidden for questions without input, for example html question.
            * @see title
            */
        description: string;
        /**
            * Question description location. By default, value is "default" and it depends on survey questionDescriptionLocation property
            * You may change it to "underInput" to render it under question input or "underTitle" to rendered it under title.
            * @see description
            * @see Survey.questionDescriptionLocation
            */
        descriptionLocation: string;
        readonly hasDescriptionUnderTitle: boolean;
        readonly hasDescriptionUnderInput: boolean;
        readonly clickTitleFunction: any;
        /**
            * The custom text that will be shown on required error. Use this property, if you do not want to show the default text.
            * Please note, this property is hidden for question without input, for example html question.
            */
        requiredErrorText: string;
        readonly locRequiredErrorText: LocalizableString;
        /**
            * Use it to get or set the comment value.
            */
        commentText: string;
        readonly locCommentText: LocalizableString;
        /**
            * Returns a copy of question errors survey. For some questions like matrix and panel dynamic it includes the errors of nested questions.
            */
        getAllErrors(): Array<SurveyError>;
        getErrorByType(errorType: string): SurveyError;
        /**
            * The link to the custom widget.
            */
        readonly customWidget: QuestionCustomWidget;
        updateCustomWidget(): void;
        readonly isCompositeQuestion: boolean;
        afterRenderQuestionElement(el: any): void;
        afterRender(el: any): void;
        beforeDestroyQuestionElement(el: any): void;
        /**
            * Returns the rendred question title.
            */
        readonly processedTitle: string;
        /**
            * Returns the title after processing the question template.
            * @see SurveyModel.questionTitleTemplate
            */
        readonly fullTitle: string;
        protected readonly titlePattern: string;
        readonly isRequireTextOnStart: boolean;
        readonly isRequireTextBeforeTitle: boolean;
        readonly isRequireTextAfterTitle: boolean;
        /**
            * The Question renders on the new line if the property is true. If the property is false, the question tries to render on the same line/row with a previous question/panel.
            */
        startWithNewLine: boolean;
        /**
            * Returns all css classes that used for rendering the question. You may use survey.updateQuestionCssClasses event to override css classes for a question.
            * @see SurveyModel.updateQuestionCssClasses
            */
        readonly cssClasses: any;
        readonly cssRoot: string;
        protected setCssRoot(val: string): void;
        protected getCssRoot(cssClasses: any): string;
        readonly cssHeader: string;
        protected setCssHeader(val: string): void;
        protected getCssHeader(cssClasses: any): string;
        readonly cssContent: string;
        protected setCssContent(val: string): void;
        protected getCssContent(cssClasses: any): string;
        readonly cssTitle: string;
        protected setCssTitle(val: string): void;
        protected getCssTitle(cssClasses: any): string;
        readonly cssError: string;
        protected setCssError(val: string): void;
        protected getCssError(cssClasses: any): string;
        updateElementCss(): void;
        protected updateElementCssCore(cssClasses: any): void;
        protected updateCssClasses(res: any, css: any): void;
        protected getCssType(): string;
        /**
            * Use it to set the specific width to the question like css style (%, px, em etc).
            */
        width: string;
        /**
            * Use it to set the specific minWidth constraint to the question like css style (%, px, em etc).
            */
        minWidth: string;
        /**
            * Use it to set the specific maxWidth constraint to the question like css style (%, px, em etc).
            */
        maxWidth: string;
        /**
            * The rendered width of the question.
            */
        renderWidth: string;
        /**
            * Set it different from 0 to increase the left padding.
            */
        indent: number;
        /**
            * Set it different from 0 to increase the right padding.
            */
        rightIndent: number;
        paddingLeft: string;
        paddingRight: string;
        /**
            * Move the focus to the input of this question.
            * @param onError set this parameter to true, to focus the input with the first error, other wise the first input will be focused.
            */
        focus(onError?: boolean): void;
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
        isRequired: boolean;
        /**
            * An expression that returns true or false. If it returns true the Question becomes required and an end-user has to answer it.
            * If it returns false the Question then an end-user may not answer it the Question maybe empty.
            * The library runs the expression on survey start and on changing a question value. If the property is empty then isRequired property is used.
            * Please note, this property is hidden for question without input, for example html question.
            * @see isRequired
            */
        requiredIf: string;
        /**
            * Set it to true, to add a comment for the question.
            */
        hasComment: boolean;
        /**
            * The unique identificator. It is generated automatically.
            */
        id: string;
        readonly ariaTitleId: string;
        readonly ariaRole: string;
        hasOther: boolean;
        protected hasOtherChanged(): void;
        readonly requireUpdateCommentValue: boolean;
        /**
            * Returns true if readOnly property is true or survey is in display mode or parent panel/page is readOnly.
            * @see SurveyModel.model
            * @see readOnly
            */
        readonly isReadOnly: boolean;
        /**
            * An expression that returns true or false. If it returns false the Question becomes read only and an end-user will not able to answer on the qustion. The library runs the expression on survey start and on changing a question value. If the property is empty then readOnly property is used.
            * Please note, this property is hidden for question without input, for example html question.
            * @see readOnly
            * @see isReadOnly
            */
        enableIf: string;
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
        readonly no: string;
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
        value: any;
        readonly valueForSurvey: any;
        /**
            * Clear the question value. It clears the question comment as well.
            */
        clearValue(): void;
        unbindValue(): void;
        createValueCopy(): any;
        protected isEditingSurveyElement(value: any): boolean;
        protected getUnbindValue(value: any): any;
        clearValueIfInvisible(): void;
        readonly displayValue: any;
        protected updateDisplayValue(): any;
        /**
            * Return the question value as a display text. For example, for dropdown, it would return the item text instead of item value.
            * @param keysAsText Set this value to true, to return key (in matrices questions) as display text as well.
            * @param value use this parameter, if you want to get display value for this value and not question.value. It is undefined by default.
            */
        getDisplayValue(keysAsText: boolean, value?: any): any;
        protected getDisplayValueCore(keyAsText: boolean, value: any): any;
        /**
            * Set the default value to the question. It will be assign to the question on loading the survey from JSON or adding a question to the survey or on setting this property of the value is empty.
            * Please note, this property is hidden for question without input, for example html question.
            */
        defaultValue: any;
        defaultValueExpression: any;
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
        correctAnswer: any;
        protected convertDefaultValue(val: any): any;
        /**
            * Returns questions count: 1 for the non-matrix questions and all inner visible questions that has input(s) widgets for question of matrix types.
            * @see getQuizQuestions
            */
        readonly quizQuestionCount: number;
        readonly correctAnswerCount: number;
        protected getQuizQuestionCount(): number;
        protected getCorrectAnswerCount(): number;
        isAnswerCorrect(): boolean;
        updateValueWithDefaults(): void;
        getQuestionFromArray(name: string, index: number): IQuestion;
        getDefaultValue(): any;
        protected isDefaultValueEmpty(): boolean;
        protected setDefaultValue(): void;
        protected isValueExpression(val: any): boolean;
        protected setValueAndRunExpression(expression: string, defaultValue: any, setFunc: (val: any) => void): void;
        /**
            * The question comment value.
            */
        comment: string;
        protected getQuestionComment(): string;
        protected setQuestionComment(newValue: string): void;
        /**
            * Returns true if the question value is empty
            */
        isEmpty(): boolean;
        isAnswered: boolean;
        protected updateIsAnswered(): void;
        protected getIsAnswered(): boolean;
        /**
            * The list of question validators.
            * Please note, this property is hidden for question without input, for example html question.
            */
        validators: Array<SurveyValidator>;
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
        readonly currentErrorCount: number;
        /**
            * Returns the char/string for a required question.
            * @see SurveyModel.requiredText
            */
        readonly requiredText: string;
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
        protected canRunValidators(isOnValueChanged: boolean): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected hasRequiredError(): boolean;
        onCompletedAsyncValidators: (hasErrors: boolean) => void;
        readonly isRunningValidators: boolean;
        protected getIsRunningValidators(): boolean;
        protected runValidators(): Array<SurveyError>;
        protected raiseOnCompletedAsyncValidators(): void;
        protected allowNotifyValueChanged: boolean;
        protected setNewValue(newValue: any): void;
        protected isTextValue(): boolean;
        readonly isSurveyInputTextUpdate: boolean;
        readonly isInputTextUpdate: boolean;
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
        locOwner: ILocalizableOwner;
        /**
            * Returns the current survey locale
            * @see SurveyModel.locale
            */
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getProcessedText(text: string): string;
        getComponentName(): string;
        getTitleActions(): Array<any>;
        isDefaultRendering(): boolean;
        renderAs: string;
        getErrorCustomText(text: string, error: SurveyError): string;
        getValidatorTitle(): string;
        validatedValue: any;
        getAllValues(): any;
        dispose(): void;
}

/**
  * A Model for non value question. This question doesn't add any new functionality. It hides some properties, including the value.
  */
export declare class QuestionNonValue extends Question {
    name: string;
    constructor(name: string);
    getType(): string;
    readonly hasInput: boolean;
    readonly hasTitle: boolean;
    getTitleLocation(): string;
    readonly hasComment: boolean;
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
    name: string;
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
        supportGoNextPageError(): boolean;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Returns the other item. By using this property, you may change programmatically it's value and text.
            * @see hasOther
            */
        readonly otherItem: ItemValue;
        /**
            * Returns true if a user select the 'other' item.
            */
        readonly isOtherSelected: boolean;
        /**
            * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see visibleIf
            * @see choicesEnableIf
            */
        choicesVisibleIf: string;
        /**
            * An expression that returns true or false. It runs against each choices item and if for this item it returns true, then the item is enabled otherwise the item becomes disabled. Please use {item} to get the current item value in the expression.
            * @see choicesVisibleIf
            */
        choicesEnableIf: string;
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
        readonly validatedValue: any;
        protected createRestfull(): ChoicesRestfull;
        protected getQuestionComment(): string;
        protected setQuestionComment(newValue: string): void;
        renderedValue: any;
        protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
        protected setNewValue(newValue: any): void;
        protected valueFromData(val: any): any;
        protected rendredValueFromData(val: any): any;
        protected rendredValueToData(val: any): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        protected hasUnknownValue(val: any, includeOther?: boolean): boolean;
        protected isValueDisabled(val: any): boolean;
        /**
            * If the clearIncorrectValuesCallback is set, it is used to clear incorrect values instead of default behaviour.
            */
        clearIncorrectValuesCallback: () => void;
        /**
            * Use this property to fill the choices from a restful service.
            * @see choices
            */
        readonly choicesByUrl: ChoicesRestfull;
        /**
            * The list of items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown.
            * @see choicesByUrl
            * @see choicesFromQuestion
            */
        choices: Array<any>;
        /**
            * Set this property to get choices from the specified question instead of defining them in the current question. This avoids duplication of choices declaration in your survey definition.
            * By setting this property, the "choices", "choicesVisibleIf", "choicesEnableIf" and "choicesOrder" properties become invisible, because these question characteristics depend on actions in another (specified) question.
            * Use the `choicesFromQuestionMode` property to filter choices obtained from the specified question.
            * @see choices
            * @see choicesFromQuestionMode
            */
        choicesFromQuestion: string;
        /**
            * This property becomes visible when the `choicesFromQuestion` property is selected. The default value is "all" (all visible choices from another question are displayed as they are).
            * You can set this property to "selected" or "unselected" to display only selected or unselected choices from the specified question.
            * @see choicesFromQuestion
            */
        choicesFromQuestionMode: string;
        /**
            * Set this property to true to hide the question if there is no visible choices.
            */
        hideIfChoicesEmpty: boolean;
        keepIncorrectValues: boolean;
        /**
            * Please use survey.storeOthersAsComment to change the behavior on the survey level. This property is depricated and invisible in Survey Creator.
            * By default the entered text in the others input in the checkbox/radiogroup/dropdown are stored as "question name " + "-Comment". The value itself is "question name": "others". Set this property to false, to store the entered text directly in the "question name" key.
            * Possible values are: "default", true, false
            * @see SurveyModel.storeOthersAsComment
            */
        storeOthersAsComment: any;
        protected hasOtherChanged(): void;
        /**
            * Use this property to render items in a specific order: "asc", "desc", "random". Default value is "none".
            */
        choicesOrder: string;
        /**
            * Use this property to set the different text for other item.
            */
        otherText: string;
        readonly locOtherText: LocalizableString;
        /**
            *  Use this property to set the place holder text for other or comment field  .
            */
        otherPlaceHolder: string;
        readonly locOtherPlaceHolder: LocalizableString;
        /**
            * The text that shows when the other item is choosed by the other input is empty.
            */
        otherErrorText: string;
        readonly locOtherErrorText: LocalizableString;
        /**
            * The list of items as they will be rendered. If needed items are sorted and the other item is added.
            * @see hasOther
            * @see choicesOrder
            * @see enabledChoices
            */
        readonly visibleChoices: Array<ItemValue>;
        /**
            * The list of enabled items as they will be rendered. The disabled items are not included
            * @see hasOther
            * @see choicesOrder
            * @see visibleChoices
            */
        readonly enabledChoices: Array<ItemValue>;
        protected updateVisibleChoices(): void;
        protected canUseFilteredChoices(): boolean;
        protected addToVisibleChoices(items: Array<ItemValue>): void;
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
        protected getChoicesDisplayValue(items: ItemValue[], val: any): any;
        protected readonly activeChoices: Array<ItemValue>;
        protected getChoices(): Array<ItemValue>;
        supportComment(): boolean;
        supportOther(): boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        setSurveyImpl(value: ISurveyImpl): void;
        protected getStoreOthersAsComment(): boolean;
        onSurveyLoad(): void;
        onAnyValueChanged(name: string): void;
        updateValueFromSurvey(newValue: any): void;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        protected onBeforeSendRequest(): void;
        protected onLoadChoicesFromUrl(array: Array<ItemValue>): void;
        protected updateChoicesDependedQuestions(): void;
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
        getColumnClass(): any;
        getLabelClass(item: ItemValue): any;
        getControlLabelClass(item: ItemValue): any;
        readonly columns: ItemValue[][];
        readonly hasColumns: boolean;
        choicesLoaded(): void;
}
/**
    * A base class for checkbox and radiogroup questions. It introduced a colCount property.
    */
export declare class QuestionCheckboxBase extends QuestionSelectBase {
        name: string;
        colCountChangedCallback: () => void;
        constructor(name: string);
        /**
            * The number of columns for radiogroup and checkbox questions. Items are rendred in one line if the value is 0.
            */
        colCount: number;
        getItemIndex(item: any): number;
        protected onParentChanged(): void;
}

/**
    * A Model for a checkbox question
    */
export declare class QuestionCheckboxModel extends QuestionCheckboxBase {
        name: string;
        constructor(name: string);
        readonly ariaRole: string;
        getType(): string;
        protected onCreating(): void;
        protected getFirstInputElementId(): string;
        /**
            * Returns the select all item. By using this property, you may change programmatically it's value and text.
            * @see hasSelectAll
            */
        readonly selectAllItem: ItemValue;
        /**
            * Returns the none item. By using this property, you may change programmatically it's value and text.
            * @see hasNone
            */
        readonly noneItem: ItemValue;
        /**
            * Use this property to set the different text for none item.
            */
        noneText: string;
        readonly locNoneText: LocalizableString;
        /**
            * Use this property to set the different text for Select All item.
            */
        selectAllText: string;
        readonly locSelectAllText: LocalizableString;
        /**
            * Set this property to true, to show the "Select All" item on the top. If end-user checks this item, then all items are checked.
            */
        hasSelectAll: boolean;
        /**
            * Returns true if all items are selected
            * @see toggleSelectAll
            */
        isAllSelected: boolean;
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
            * Set this property to true, to show the "None" item on the bottom. If end-user checks this item, all other items would be unchecked.
            */
        hasNone: boolean;
        /**
            * Returns true if item is checked
            * @param item checkbox item value
            */
        isItemSelected(item: ItemValue): boolean;
        /**
            * Set this property different to 0 to limit the number of selected choices in the checkbox.
            */
        maxSelectedChoices: number;
        protected onEnableItemCallBack(item: ItemValue): boolean;
        protected onAfterRunItemsEnableCondition(): void;
        getItemClass(item: any): any;
        protected setNewValue(newValue: any): void;
        protected getIsMultipleValue(): boolean;
        protected getCommentFromValue(newValue: any): string;
        protected setOtherValueIntoValue(newValue: any): any;
        protected canUseFilteredChoices(): boolean;
        protected addToVisibleChoices(items: Array<ItemValue>): void;
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
        protected hasUnknownValue(val: any, includeOther?: boolean): boolean;
}

/**
  * A Model for a ranking question
  */
export declare class QuestionRankingModel extends QuestionCheckboxModel {
    domNode: HTMLElement;
    sortableInst: any;
    isIndeterminate: boolean;
    update: () => void;
    getType(): string;
    afterRenderQuestionElement(el: any): void;
    beforeDestroyQuestionElement(el: any): void;
    initSortable(domNode: HTMLElement): void;
    readonly rootClass: any;
    handleKeydown: (event: any) => void;
    handleArrowUp: (index: number) => void;
    handleArrowDown: (index: number) => void;
    moveArrayItemBack: (array: string[], index: number) => void;
    moveArrayItemForward: (array: string[], index: number) => void;
    syncNumbers: () => void;
    focusItem: (index: number) => void;
    setValue: () => void;
    setGhostText: (text: string) => void;
}

/**
    * A Model for a comment question
    */
export declare class QuestionCommentModel extends Question {
        name: string;
        constructor(name: string);
        protected isTextValue(): boolean;
        /**
            * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
            * If it is 0, then the value is unlimited
            * @see SurveyModel.maxTextLength
            */
        maxLength: number;
        getMaxLength(): any;
        /**
            * Use this property to set the input place holder.
            */
        placeHolder: string;
        readonly locPlaceHolder: LocalizableString;
        /**
            * The html rows attribute.
            */
        rows: number;
        /**
            * The html cols attribute.
            */
        cols: number;
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
        textUpdateMode: string;
        readonly isSurveyInputTextUpdate: boolean;
}

/**
    * A Model for a dropdown question
    */
export declare class QuestionDropdownModel extends QuestionSelectBase {
        name: string;
        constructor(name: string);
        /**
            * This flag controls whether to show options caption item ('Choose...').
            */
        showOptionsCaption: boolean;
        /**
            * Use this property to set the options caption different from the default value. The default value is taken from localization strings.
            */
        optionsCaption: string;
        readonly locOptionsCaption: LocalizableString;
        getType(): string;
        readonly selectedItem: ItemValue;
        supportGoNextPageAutomatic(): boolean;
        protected getChoices(): Array<ItemValue>;
        /**
            * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
            * @see choicesMax
            * @see choicesStep
            */
        choicesMin: number;
        /**
            * Use this and choicesMax property to automatically add choices. For example choicesMin = 1 and choicesMax = 10 will generate ten additional choices from 1 to 10.
            * @see choicesMin
            * @see choicesStep
            */
        choicesMax: number;
        /**
            * The default value is 1. It tells the value of the iterator between choicesMin and choicesMax properties.
            * If choicesMin = 10, choicesMax = 30 and choicesStep = 10 then you will have only three additional choices: [10, 20, 30].
            * @see choicesMin
            * @see choicesMax
            */
        choicesStep: number;
}

export declare class QuestionFactory {
    static Instance: QuestionFactory;
    static readonly DefaultChoices: string[];
    static readonly DefaultColums: string[];
    static readonly DefaultRows: string[];
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
        name: string;
        /**
            * The event is fired after question state has been changed.
            * <br/> sender the question object that fires the event
            * <br/> options.state new question state value.
            */
        onStateChanged: Event<(sender: QuestionFileModel, options: any) => any, any>;
        previewValue: any[];
        currentState: string;
        constructor(name: string);
        getType(): string;
        clearOnDeletingContainer(): void;
        /**
            * Set it to true, to show the preview for the image files.
            */
        showPreview: boolean;
        /**
            * Set it to true, to allow select multiple files.
            */
        allowMultiple: boolean;
        /**
            * The image height.
            */
        imageHeight: string;
        /**
            * The image width.
            */
        imageWidth: string;
        /**
            * Accepted file types. Passed to the 'accept' attribute of the file input tag. See https://www.w3schools.com/tags/att_input_accept.asp for more details.
            */
        acceptedTypes: string;
        /**
            * Set it to false if you do not want to serialize file content as text in the survey.data.
            * In this case, you have to write the code onUploadFiles event to store the file content.
            * @see SurveyModel.onUploadFiles
            */
        storeDataAsText: boolean;
        /**
            * Set it to true if you want to wait until files will be uploaded to your server.
            */
        waitForUpload: boolean;
        /**
            * Set it to false if you want to disable images preview.
            */
        allowImagesPreview: boolean;
        /**
            * Use this property to setup the maximum allowed file size.
            */
        maxSize: number;
        /**
            * Use this property to setup confirmation to remove file.
            */
        needConfirmRemoveFile: boolean;
        /**
            * The remove file confirmation message.
            */
        getConfirmRemoveMessage(fileName: string): string;
        /**
            * The remove all files confirmation message.
            */
        readonly confirmRemoveAllMessage: string;
        /**
            * The no file chosen caption for modern theme.
            */
        readonly noFileChosenCaption: string;
        /**
            * The choose files button caption for modern theme.
            */
        readonly chooseButtonCaption: string;
        /**
            * The clean files button caption.
            */
        readonly cleanButtonCaption: string;
        /**
            * The remove file button caption.
            */
        readonly removeFileCaption: string;
        /**
            * The input title value.
            */
        readonly inputTitle: string;
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
}

/**
    * A Model for html question. Unlike other questions it doesn't have value and title.
    */
export declare class QuestionHtmlModel extends QuestionNonValue {
        name: string;
        constructor(name: string);
        getType(): string;
        readonly isCompositeQuestion: boolean;
        /**
            * Set html to display it
            */
        html: string;
        readonly locHtml: LocalizableString;
        readonly processedHtml: string;
}

/**
    * A Model for a radiogroup question.
    */
export declare class QuestionRadiogroupModel extends QuestionCheckboxBase {
        name: string;
        constructor(name: string);
        getType(): string;
        protected getFirstInputElementId(): string;
        readonly selectedItem: ItemValue;
        /**
            * Show "clear button" flag.
            */
        showClearButton: boolean;
        readonly canShowClearButton: boolean;
        readonly clearButtonCaption: any;
        supportGoNextPageAutomatic(): boolean;
        getItemClass(item: any): any;
}

/**
    * A Model for a rating question.
    */
export declare class QuestionRatingModel extends Question {
        name: string;
        rateValuesChangedCallback: () => void;
        constructor(name: string);
        onSurveyLoad(): void;
        /**
            * The list of rate items. Every item has value and text. If text is empty, the value is rendered. The item text supports markdown. If it is empty the array is generated by using rateMin, rateMax and rateStep properties.
            * @see rateMin
            * @see rateMax
            * @see rateStep
            */
        rateValues: Array<any>;
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the first value in the rating. The default value is 1.
            * @see rateValues
            * @see rateMax
            * @see rateStep
            */
        rateMin: number;
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the last value in the rating. The default value is 5.
            * @see rateValues
            * @see rateMin
            * @see rateStep
            */
        rateMax: number;
        /**
            * This property is used to generate rate values if rateValues array is empty. It is the step value. The number of rate values are (rateMax - rateMin) / rateStep. The default value is 1.
            * @see rateValues
            * @see rateMin
            * @see rateMax
            */
        rateStep: number;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        readonly visibleRateValues: ItemValue[];
        getType(): string;
        protected getFirstInputElementId(): string;
        supportGoNextPageAutomatic(): boolean;
        supportComment(): boolean;
        supportOther(): boolean;
        /**
            * The description of minimum (first) item.
            */
        minRateDescription: string;
        readonly locMinRateDescription: LocalizableString;
        /**
            * The description of maximum (last) item.
            */
        maxRateDescription: string;
        readonly locMaxRateDescription: LocalizableString;
        protected valueToData(val: any): any;
}

/**
    * A Model for expression question. It is a read-only question. It calculates value based on epxression property.
    */
export declare class QuestionExpressionModel extends Question {
        name: string;
        constructor(name: string);
        getType(): string;
        readonly hasInput: boolean;
        /**
            * Use this property to display the value in your own format. Make sure you have "{0}" substring in your string, to display the actual value.
            */
        format: string;
        readonly locFormat: LocalizableString;
        /**
            * The Expression that used to calculate the question value. You may use standard operators like +, -, * and /, squares (). Here is the example of accessing the question value {questionname}.
            * <br/>Example: "({quantity} * {price}) * (100 - {discount}) / 100"
            */
        expression: string;
        locCalculation(): void;
        unlocCalculation(): void;
        runCondition(values: HashTable<any>, properties: HashTable<any>): void;
        hasErrors(fireCallback?: boolean, rec?: any): boolean;
        getAllErrors(): Array<SurveyError>;
        /**
            * The maximum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
            */
        maximumFractionDigits: number;
        /**
            * The minimum number of fraction digits to use if displayStyle is not "none". Possible values are from 0 to 20. The default value is -1 and it means that this property is not used.
            */
        minimumFractionDigits: number;
        protected getDisplayValueCore(keysAsText: boolean, value: any): any;
        /**
            * You may set this property to "decimal", "currency", "percent" or "date". If you set it to "currency", you may use the currency property to display the value in currency different from USD.
            * @see currency
            */
        displayStyle: string;
        /**
            * Use it to display the value in the currency differen from USD. The displayStype should be set to "currency".
            * @see displayStyle
            */
        currency: string;
        /**
            * 	Determines whether to display grouping separators. The default value is true.
            */
        useGrouping: boolean;
        protected getValueAsStr(val: any): string;
}
export declare function getCurrecyCodes(): Array<string>;

/**
    * A Model for an input text question.
    */
export declare class QuestionTextModel extends Question {
        name: string;
        constructor(name: string);
        protected isTextValue(): boolean;
        getType(): string;
        onSurveyLoad(): void;
        /**
            * Use this property to change the default input type.
            */
        inputType: string;
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
        textUpdateMode: string;
        readonly isSurveyInputTextUpdate: boolean;
        getValidators(): Array<SurveyValidator>;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * The maximum text length. If it is -1, defaul value, then the survey maxTextLength property will be used.
            * If it is 0, then the value is unlimited
            * @see SurveyModel.maxTextLength
            */
        maxLength: number;
        getMaxLength(): any;
        /**
            * The text input size
            */
        size: number;
        autoComplete: string;
        /**
            * The minimum value
            */
        min: string;
        /**
            * The maximum value
            */
        max: string;
        /**
            * The minimum value that you can setup as expression, for example today(-1) = yesterday;
            */
        minValueExpression: string;
        /**
            * The maximum value that you can setup as expression, for example today(1) = tomorrow;
            */
        maxValueExpression: string;
        readonly renderedMin: any;
        readonly renderedMax: any;
        /**
            * The text that shows when value is less than min property.
            * @see min
            * @see maxErrorText
            */
        minErrorText: string;
        readonly locMinErrorText: LocalizableString;
        /**
            * The text that shows when value is greater than man property.
            * @see max
            * @see minErrorText
            */
        maxErrorText: string;
        readonly locMaxErrorText: LocalizableString;
        /**
            * Readonly property that returns true if the current inputType allows to set min and max properties
            * @see inputType
            * @see min
            * @see max
            */
        readonly isMinMaxType: boolean;
        protected onCheckForErrors(errors: Array<SurveyError>, isOnValueChanged: boolean): void;
        protected canSetValueToSurvey(): boolean;
        /**
            * The step value
            */
        step: string;
        readonly renderedStep: string;
        isEmpty(): boolean;
        supportGoNextPageAutomatic(): boolean;
        supportGoNextPageError(): boolean;
        /**
            * The input place holder.
            */
        placeHolder: string;
        readonly locPlaceHolder: LocalizableString;
        /**
            * The list of recommended options available to choose.
            */
        dataList: Array<string>;
        readonly locDataList: LocalizableStrings;
        readonly dataListId: string;
        protected canRunValidators(isOnValueChanged: boolean): boolean;
        protected setNewValue(newValue: any): void;
        protected correctValueType(newValue: any): any;
}

/**
    * A Model for a boolean question.
    */
export declare class QuestionBooleanModel extends Question {
        name: string;
        constructor(name: string);
        getType(): string;
        isLayoutTypeSupported(layoutType: string): boolean;
        /**
            * Returns true if the question check will be rendered in indeterminate mode. value is empty.
            */
        readonly isIndeterminate: boolean;
        readonly hasTitle: boolean;
        /**
            * Get/set question value in 3 modes: indeterminate (value is empty), true (check is set) and false (check is unset).
            * @see valueTrue
            * @see valueFalse
            */
        checkedValue: any;
        /**
            * Set the default state of the check: "indeterminate" - default (value is empty/null), "true" - value equals valueTrue or true, "false" - value equals valueFalse or false.
            */
        defaultValue: any;
        getDefaultValue(): any;
        readonly locTitle: LocalizableString;
        /**
            * The checkbox label. If it is empty and showTitle is false then title is rendered
            * @see showTitle
            * @see title
            */
        label: string;
        readonly locDisplayLabel: LocalizableString;
        /**
            * Set this property, if you want to have a different label for state when check is set.
            */
        labelTrue: any;
        readonly locLabelTrue: LocalizableString;
        /**
            * Set this property, if you want to have a different label for state when check is unset.
            */
        labelFalse: any;
        readonly locLabelFalse: LocalizableString;
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
}

export declare class ImageItemValue extends ItemValue implements ILocalizableOwner {
        protected typeName: string;
        constructor(value: any, text?: string, typeName?: string);
        getType(): string;
        /**
            * The image or video link property.
            */
        imageLink: string;
        readonly locImageLink: LocalizableString;
        getLocale(): string;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getProcessedText(text: string): string;
}
/**
    * A Model for a select image question.
    */
export declare class QuestionImagePickerModel extends QuestionCheckboxBase {
        name: string;
        constructor(name: string);
        getType(): string;
        supportGoNextPageAutomatic(): boolean;
        readonly hasSingleInput: boolean;
        protected getItemValueType(): string;
        readonly isCompositeQuestion: boolean;
        supportOther(): boolean;
        /**
            * Multi select option. If set to true, then allows to select multiple images.
            */
        multiSelect: boolean;
        /**
            * Returns true if item is checked
            * @param item image picker item value
            */
        isItemSelected(item: ItemValue): boolean;
        clearIncorrectValues(): void;
        /**
            * Show label under the image.
            */
        showLabel: boolean;
        endLoadingFromJson(): void;
        protected getValueCore(): any;
        protected renderedValueFromDataCore(val: any): any;
        protected rendredValueToDataCore(val: any): any;
        /**
            * The image height.
            */
        imageHeight: string;
        /**
            * The image width.
            */
        imageWidth: string;
        /**
            * The image fit mode.
            */
        imageFit: string;
        /**
            * The content mode.
            */
        contentMode: string;
        getItemClass(item: any): string;
        protected convertDefaultValue(val: any): any;
}

/**
    * A Model for image question. This question hasn't any functionality and can be used to improve the appearance of the survey.
    */
export declare class QuestionImageModel extends QuestionNonValue {
        name: string;
        constructor(name: string);
        getType(): string;
        readonly isCompositeQuestion: boolean;
        /**
            * The image URL.
            */
        imageLink: string;
        readonly locImageLink: LocalizableString;
        /**
            * The image alt text.
            */
        text: string;
        readonly locText: LocalizableString;
        /**
            * The image height.
            */
        imageHeight: string;
        /**
            * The image width.
            */
        imageWidth: string;
        /**
            * The image fit mode.
            */
        imageFit: string;
        /**
            * The content mode.
            */
        contentMode: string;
}

/**
    * A Model for signature pad question.
    */
export declare class QuestionSignaturePadModel extends Question {
        name: string;
        protected getCssRoot(cssClasses: any): string;
        protected updateValue(): void;
        constructor(name: string);
        getType(): string;
        afterRenderQuestionElement(el: any): void;
        beforeDestroyQuestionElement(el: any): void;
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
        width: string;
        /**
            * Use it to set the specific height for the signature pad.
            */
        height: string;
        /**
            * Use it to clear content of the signature pad.
            */
        allowClear: boolean;
        /**
            * Use it to set pen color for the signature pad.
            */
        penColor: string;
        /**
            * The clear signature button caption.
            */
        readonly clearButtonCaption: string;
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
        readonly panel: PanelModel;
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
        geSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
}
export declare class QuestionPanelDynamicTemplateSurveyImpl implements ISurveyImpl {
        data: IQuestionPanelDynamicData;
        constructor(data: IQuestionPanelDynamicData);
        geSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
}
/**
    * A Model for a panel dymanic question. You setup the template panel, but adding elements (any question or a panel) and assign a text to it's title, and this panel will be used as a template on creating dynamic panels. The number of panels is defined by panelCount property.
    * An end-user may dynamically add/remove panels, unless you forbidden this.
    */
export declare class QuestionPanelDynamicModel extends Question implements IQuestionPanelDynamicData {
        name: string;
        renderModeChangedCallback: () => void;
        panelCountChangedCallback: () => void;
        currentIndexChangedCallback: () => void;
        constructor(name: string);
        readonly hasSingleInput: boolean;
        setSurveyImpl(value: ISurveyImpl): void;
        getType(): string;
        readonly isCompositeQuestion: boolean;
        clearOnDeletingContainer(): void;
        readonly isAllowTitleLeft: boolean;
        removeElement(element: IElement): boolean;
        /**
            * The template Panel. This panel is used as a template on creatign dynamic panels
            * @see  templateElements
            * @see templateTitle
            * @see panelCount
            */
        readonly template: PanelModel;
        getPanel(): IPanel;
        /**
            * The template Panel elements, questions and panels.
            * @see  templateElements
            * @see template
            * @see panelCount
            */
        readonly templateElements: Array<IElement>;
        /**
            * The template Panel title property.
            * @see  templateElements
            * @see template
            * @see panelCount
            */
        templateTitle: string;
        readonly locTemplateTitle: LocalizableString;
        /**
            * The template Panel description property.
            * @see  templateElements
            * @see template
            * @see panelCount
            * @see templateTitle
            */
        templateDescription: string;
        readonly locTemplateDescription: LocalizableString;
        protected readonly items: Array<ISurveyData>;
        /**
            * The array of dynamic panels created based on panel template
            * @see template
            * @see panelCount
            */
        readonly panels: Array<PanelModel>;
        /**
            * The index of current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns -1, otherwise it returns a value from 0 to panelCount - 1.
            * @see currentPanel
            * @see panels
            * @see panelCount
            * @see renderMode
            */
        currentIndex: number;
        /**
            * The current active dynamical panel when the renderMode is not "list". If there is no dymamic panel (panelCount = 0) or renderMode equals "list" it returns null.
            * @see currenIndex
            * @see panels
            * @see panelCount
            * @see renderMode
            */
        readonly currentPanel: PanelModel;
        /**
            * Set it to true, to show a confirmation dialog on removing a panel
            * @see ConfirmDeleteText
            */
        confirmDelete: boolean;
        /**
            * Set it to a question name used in the template panel and the library shows duplication error, if there are same values in different panels of this question.
            * @see keyDuplicationError
            */
        keyName: string;
        /**
            * Use this property to change the default text showing in the confirmation delete dialog on removing a panel.
            */
        confirmDeleteText: string;
        readonly locConfirmDeleteText: LocalizableString;
        /**
            * The duplication value error text. Set it to show the text different from the default.
            * @see keyName
            */
        keyDuplicationError: string;
        readonly locKeyDuplicationError: LocalizableString;
        /**
            * Use this property to change the default previous button text. Previous button shows the previous panel, change the currentPanel, when the renderMode doesn't equal to "list".
            * @see currentPanel
            * @see currentIndex
            * @see renderMode
            */
        panelPrevText: string;
        readonly locPanelPrevText: LocalizableString;
        /**
            * Use this property to change the default next button text. Next button shows the next panel, change the currentPanel, when the renderMode doesn't equal to "list".
            * @see currentPanel
            * @see currentIndex
            * @see renderMode
            */
        panelNextText: string;
        readonly locPanelNextText: LocalizableString;
        /**
            * Use this property to change the default value of add panel button text.
            */
        panelAddText: string;
        readonly locPanelAddText: LocalizableString;
        /**
            * Use this property to change the default value of remove panel button text.
            */
        panelRemoveText: string;
        readonly locPanelRemoveText: LocalizableString;
        /**
            * Returns true when the renderMode equals to "progressTop" or "progressTopBottom"
            */
        readonly isProgressTopShowing: boolean;
        /**
            * Returns true when the renderMode equals to "progressBottom" or "progressTopBottom"
            */
        readonly isProgressBottomShowing: boolean;
        /**
            * Returns true when currentIndex is more than 0.
            * @see currenIndex
            * @see currenPanel
            */
        readonly isPrevButtonShowing: boolean;
        /**
            * Returns true when currentIndex is more than or equal 0 and less than panelCount - 1.
            * @see currenIndex
            * @see currenPanel
            * @see panelCount
            */
        readonly isNextButtonShowing: boolean;
        /**
            * Returns true when showRangeInProgress equals to true, renderMode doesn't equal to "list" and panelCount is >= 2.
            */
        readonly isRangeShowing: boolean;
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
        panelCount: number;
        /**
            * Use this property to allow the end-user to collapse/expand the panels. It works only if the renderMode property equals to "list" and templateTitle property is not empty. The following values are available:
            * <br/> default - the default value. User can't collapse/expand panels
            * <br/> expanded - User can collapse/expand panels and all panels are expanded by default
            * <br/> collapsed - User can collapse/expand panels and all panels are collapsed by default
            * <br/> firstExpanded - User can collapse/expand panels. The first panel is expanded and others are collapsed
            * @see renderMode
            * @see templateTitle
            */
        panelsState: string;
        /**
            * The minimum panel count. A user could not delete a panel if the panelCount equals to minPanelCount
            * @see panelCount
            * @see maxPanelCount
            */
        minPanelCount: number;
        /**
            * The maximum panel count. A user could not add a panel if the panelCount equals to maxPanelCount
            * @see panelCount
            * @see minPanelCount
            */
        maxPanelCount: number;
        /**
            * Set this property to false to hide the 'Add New' button
            * @see allowRemovePanel
            */
        allowAddPanel: boolean;
        /**
            * Set this property to false to hide the 'Remove' button
            * @see allowAddPanel
            */
        allowRemovePanel: boolean;
        /**
            * Set this property different from "default" to set the specific question title location for the template questions.
            * @see SurveyModel.questionTitleLocation
            * @see PanelModelBase.questionTitleLocation
            */
        templateTitleLocation: string;
        /**
            * Use this property to show/hide the numbers in titles in questions inside a dynamic panel.
            * By default the value is "off". You may set it to "onPanel" and the first question inside a dynamic panel will start with 1 or "onSurvey" to include nested questions in dymamic panels into global survey question numbering.
            */
        showQuestionNumbers: string;
        /**
            * Shows the range from 1 to panelCount when renderMode doesn't equal to "list". Set to false to hide this element.
            * @see panelCount
            * @see renderMode
            */
        showRangeInProgress: boolean;
        /**
            * By default the property equals to "list" and all dynamic panels are rendered one by one on the page. You may change it to: "progressTop", "progressBottom" or "progressTopBottom" to render only one dynamic panel at once. The progress and navigation elements can be rendred on top, bottom or both.
            */
        renderMode: string;
        /**
            * Returns true when renderMode equals to "list".
            * @see renderMode
            */
        readonly isRenderModeList: boolean;
        setVisibleIndex(value: number): number;
        /**
            * Returns true when an end user may add a new panel. The question is not read only and panelCount less than maxPanelCount
            * @see isReadOnly
            * @see panelCount
            * @see maxPanelCount
            */
        readonly canAddPanel: boolean;
        /**
            * Returns true when an end user may remove a panel. The question is not read only and panelCount is more than minPanelCount
            * @see isReadOnly
            * @see panelCount
            * @see minPanelCount
            */
        readonly canRemovePanel: boolean;
        protected rebuildPanels(): void;
        /**
            * If it is not empty, then this value is set to every new panel, including panels created initially, unless the defaultValue is not empty
            * @see defaultValue
            * @see defaultValueFromLastRow
            */
        defaultPanelValue: any;
        /**
            * Set it to true to copy the value into new added panel from the last panel. If defaultPanelValue is set and this property equals to true,
            * then the value for new added panel is merging.
            * @see defaultValue
            * @see defaultPanelValue
            */
        defaultValueFromLastPanel: boolean;
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
        getSurvey(): ISurvey;
        getRootData(): ISurveyData;
        getPlainData(options?: {
                includeEmpty?: boolean;
                calculations?: Array<{
                        propertyName: string;
                }>;
        }): any;
        updateElementCss(): void;
        readonly progressText: string;
}

export declare var surveyTimerFunctions: {
    setTimeout: (func: () => any) => number;
    clearTimeout: (timerId: number) => void;
};
export declare class SurveyTimer {
    static readonly instance: SurveyTimer;
    onTimer: Event<() => any, any>;
    start(func?: () => any): void;
    stop(func?: () => any): void;
    doTimer(): void;
}

export declare class SurveyProgressButtonsModel {
    constructor(survey: SurveyModel);
    isListElementClickable(index: number): boolean;
    getListElementCss(index: number): string;
    clickListElement(index: number): void;
}

/**
    * The `Survey` object contains information about the survey, Pages, Questions, flow logic and etc.
    */
export declare class SurveyModel extends Base implements ISurvey, ISurveyData, ISurveyImpl, ISurveyTriggerOwner, ISurveyErrorOwner, ILocalizableOwner {
        [index: string]: any;
        static platform: string;
        readonly platformName: string;
        /**
            * You can display an additional field (comment field) for the most of questions; users can enter additional comments to their response.
            * The comment field input is saved as `'question name' + 'commentPrefix'`.
            * @see data
            * @see Question.hasComment
            */
        commentPrefix: string;
        /**
            * The event is fired before the survey is completed and the `onComplete` event is fired. You can prevent the survey from completing by setting `options.allowComplete` to `false`
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.allowComplete` - Specifies whether a user can complete a survey. Set this property to `false` to prevent the survey from completing. The default value is `true`.
            * <br/> `options.isCompleteOnTrigger` - returns true if the survey is completing on "complete" trigger.
            * @see onComplete
            */
        onCompleting: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onComplete: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired after a user clicks the 'Complete' button. The event allows you to specify the URL opened after completing a survey.
            * Specify the `navigateToUrl` property to make survey navigate to another url.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.url` - Specifies a URL opened after completing a survey. Set this property to an empty string to cancel the navigation and show the completed survey page.
            * @see navigateToUrl
            * @see navigateToUrlOnCondition
            */
        onNavigateToUrl: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired after the survey changed it's state from "starting" to "running". The "starting" state means that survey shows the started page.
            * The `firstPageIsStarted` property should be set to `true`, if you want to display a start page in your survey. In this case, an end user should click the "Start" button to start the survey.
            * @see firstPageIsStarted
            */
        onStarted: Event<(sender: SurveyModel) => any, any>;
        /**
            * The event is fired on clicking the 'Next' button if the `sendResultOnPageNext` is set to `true`. You can use it to save the intermediate results, for example, if your survey is large enough.
            * <br/> `sender` - the survey object that fires the event.
            * @see sendResultOnPageNext
            */
        onPartialSend: Event<(sender: SurveyModel) => any, any>;
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
        onCurrentPageChanging: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onCurrentPageChanged: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onValueChanging: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onValueChanged: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired when a question visibility has been changed.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question which visibility has been changed.
            * <br/> `options.name` - a question name.
            * <br/> `options.visible` - a question `visible` boolean value.
            * @see Question.visibile
            * @see Question.visibileIf
            */
        onVisibleChanged: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on changing a page visibility.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page which visibility has been changed.
            * <br/> `options.visible` - a page `visible` boolean value.
            * @see PageModel.visibile
            * @see PageModel.visibileIf
            */
        onPageVisibleChanged: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on changing a panel visibility.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a panel which visibility has been changed.
            * <br/> `options.visible` - a panel `visible` boolean value.
            * @see PanelModel.visibile
            * @see PanelModel.visibileIf
            */
        onPanelVisibleChanged: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onQuestionCreated: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onQuestionAdded: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on removing a question from survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a removed question object.
            * <br/> `options.name` - a question name.
            * @see Question
            */
        onQuestionRemoved: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onPanelAdded: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on removing a panel from survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a removed panel object.
            * <br/> `options.name` - a panel name.
            * @see PanelModel
            */
        onPanelRemoved: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on adding a page into survey.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a newly added `panel` object.
            * @see PanelModel
            */
        onPageAdded: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onValidateQuestion: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before errors are assigned to a question. You may add/remove/modify errors for a question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a validated question.
            * <br/> `options.errors` - the list of errors. The list is empty by default and remains empty if a validated question has no errors.
            * @see onValidateQuestion
            */
        onSettingQuestionErrors: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onValidatePanel: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use the event to change the default error text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.text` - an error text.
            * <br/> `options.error` - an instance of the `SurveyError` object.
            * <br/> `options.name` - the error name. The following error names are available:
            * required, requireoneanswer, requirenumeric, exceedsize, webrequest, webrequestempty, otherempty,
            * uploadingfile, requiredinallrowserror, minrowcounterror, keyduplicationerror, custom
            */
        onErrorCustomText: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use the this event to be notified when the survey finished validate questions on the current page. It commonly happens when a user try to go to the next page or complete the survey
            * options.questions - the list of questions that have errors
            * options.errors - the list of errors
            * options.page - the page where question(s) are located
            */
        onValidatedErrorsOnCurrentPage: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to modify the HTML content before rendering, for example `completeHtml` or `loadingHtml`.
            * `options.html` - specifies the modified HTML content.
            * @see completedHtml
            * @see loadingHtml
            */
        onProcessHtml: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to change the question title in code. If you want to remove question numbering then set showQuestionNumbers to "off".
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.title` - a calculated question title, based on question `title`, `name`.
            * <br/> `options.question` - a question object.
            * @see showQuestionNumbers
            * @see requiredText
            */
        onGetQuestionTitle: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to change the question no in code. If you want to remove question numbering then set showQuestionNumbers to "off".
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.no` - a calculated question no, based on question `visibleIndex`, survey `.questionStartIndex` properties. You can change it.
            * <br/> `options.question` - a question object.
            * @see showQuestionNumbers
            * @see questionStartIndex
            */
        onGetQuestionNo: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onProgressText: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to process the markdown text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
            * <br/> `options.name` - a property name is going to be rendered.
            * <br/> `options.text` - a text that is going to be rendered.
            * <br/> `options.html` - an HTML content. It is `null` by default. Use this property to specify the HTML content rendered instead of `options.text`.
            */
        onTextMarkdown: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to specity render component name used for text rendering.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - SurveyJS element (a question, panel, page, or survey) where the string is going to be rendered.
            * <br/> `options.name` - a property name is going to be rendered.
            * <br/> `options.renderAs` - a component name used for text rendering.
            */
        onTextRenderAs: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event fires when it gets response from the [api.surveyjs.io](https://api.surveyjs.io) service on saving survey results. Use it to find out if the results have been saved successfully.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.success` - it is `true` if the results has been sent to the service successfully.
            * <br/> `options.response` - a response from the service.
            */
        onSendResult: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use it to get results after calling the `getResult` method. It returns a simple analytics from [api.surveyjs.io](https://api.surveyjs.io) service.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.success` - it is `true` if the results were got from the service successfully.
            * <br/> `options.data` - the object `{AnswersCount, QuestionResult : {} }`. `AnswersCount` is the number of posted survey results. `QuestionResult` is an object with all possible unique answers to the question and number of these answers.
            * <br/> `options.dataList` - an array of objects `{name, value}`, where `name` is a unique value/answer to the question and `value` is a number/count of such answers.
            * <br/> `options.response` - the server response.
            * @see getResult
            */
        onGetResult: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on uploading the file in QuestionFile when `storeDataAsText` is set to `false`. Use this event to change the uploaded file name or to prevent a particular file from being uploaded.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - the file question instance.
            * <br/> `options.name` - the file question name.
            * <br/> `options.files` - the Javascript File objects array to upload.
            * @see uploadFiles
            * @see QuestionFileModel.storeDataAsText
            */
        onUploadFiles: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on downloading a file in QuestionFile. Use this event to pass the file to a preview.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the question name.
            * <br/> `options.content` - the file content.
            * <br/> `options.fileValue` - single file question value.
            * <br/> `options.callback` - a call back function to get the status on downloading the file and the downloaded file content.
            * @see downloadFile
            */
        onDownloadFile: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * This event is fired on clearing the value in a QuestionFile. Use this event to remove files stored on your server.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `question` - the question instance.
            * <br/> `options.name` - the question name.
            * <br/> `options.value` - the question value.
            * <br/> `options.fileName` - a removed file's name, set it to `null` to clear all files.
            * <br/> `options.callback` - a call back function to get the status on clearing the files operation.
            * @see clearFiles
            */
        onClearFiles: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired after choices for radiogroup, checkbox, and dropdown has been loaded from a RESTful service and before they are assigned to a question.
            * You may change the choices, before they are assigned or disable/enabled make visible/invisible question, based on loaded results.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `question` - the question where loaded choices are going to be assigned.
            * <br/> `choices` - the loaded choices. You can change the loaded choices to before they are assigned to question.
            * <br/> `serverResult` - a result that comes from the server as it is.
            */
        onLoadChoicesFromServer: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired after survey is loaded from api.surveyjs.io service.
            * You can use this event to perform manipulation with the survey model after it was loaded from the web service.
            * <br/> `sender` - the survey object that fires the event.
            * @see surveyId
            * @see loadSurveyFromService
            */
        onLoadedSurveyFromService: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on processing the text when it finds a text in brackets: `{somevalue}`. By default, it uses the value of survey question values and variables.
            * For example, you may use the text processing in loading choices from the web. If your `choicesByUrl.url` equals to "UrlToServiceToGetAllCities/{country}/{state}",
            * you may set on this event `options.value` to "all" or empty string when the "state" value/question is non selected by a user.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.name` - the name of the processing value, for example, "state" in our example.
            * <br/> `options.value` - the value of the processing text.
            * <br/> `options.isExists` - a boolean value. Set it to `true` if you want to use the value and set it to `false` if you don't.
            */
        onProcessTextValue: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before rendering a question. Use it to override the default question CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{root: "table", button: "button"}`. You can change them to your own CSS classes.
            */
        onUpdateQuestionCssClasses: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before rendering a panel. Use it to override the default panel CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.panel` - a panel for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
            */
        onUpdatePanelCssClasses: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before rendering a page. Use it to override the default page CSS classes.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page for which you can change the CSS classes.
            * <br/> `options.cssClasses` - an object with CSS classes. For example `{title: "sv_p_title", description: "small"}`. You can change them to your own CSS classes.
            */
        onUpdatePageCssClasses: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after survey is rendered in DOM.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.htmlElement` - a root HTML element bound to the survey object.
            */
        onAfterRenderSurvey: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.htmlElement` - an HTML element bound to the survey header object.
            */
        onAfterRenderHeader: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after a page is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.page` - a page object for which the event is fired. Typically the current/active page.
            * <br/> `options.htmlElement` - an HTML element bound to the page object.
            */
        onAfterRenderPage: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after a question is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question object for which the event is fired.
            * <br/> `options.htmlElement` - an HTML element bound to the question object.
            */
        onAfterRenderQuestion: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after a non-composite question (text, comment, dropdown, radiogroup, checkbox) is rendered in DOM. Use it to modify HTML elements.
            * This event is not fired for matrices, panels, multiple text and image picker.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question object for which the event is fired.
            * <br/> `options.htmlElement` - an HTML element bound to the question object.
            */
        onAfterRenderQuestionInput: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired right after a panel is rendered in DOM. Use it to modify HTML elements.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.panel` - a panel object for which the event is fired
            * <br/> `options.htmlElement` - an HTML element bound to the panel object
            */
        onAfterRenderPanel: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on adding a new row in Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.row` - a new added row.
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            */
        onMatrixRowAdded: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before adding a new row in Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.canAddRow` - specifies whether a new row can be added
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            */
        onMatrixBeforeRowAdded: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on removing a row from Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question
            * <br/> `options.rowIndex` - a removed row index
            * <br/> `options.row` - a removed row object
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDynamicModel.visibleRows
            */
        onMatrixRowRemoved: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired before rendering "Remove" button for removing a row from Matrix Dynamic question.
            * <br/> `sender` - the survey object that fires the event
            * <br/> `options.question` - a matrix question.
            * <br/> `options.rowIndex` - a row index.
            * <br/> `options.row` - a row object.
            * <br/> `options.allow` - a boolean property. Set it to `false` to disable the row removing.
            * @see QuestionMatrixDynamicModel
            */
        onMatrixAllowRemoveRow: Event<(sender: SurveyModel, options: any) => any, any>;
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
            * @see onMatrixRowAdded
            * @see QuestionMatrixDynamicModel
            * @see QuestionMatrixDropdownModel
            */
        onMatrixCellCreated: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onMatrixAfterCellRender: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onMatrixCellValueChanged: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onMatrixCellValueChanging: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onMatrixCellValidate: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on adding a new panel in Panel Dynamic question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a panel question.
            * @see QuestionPanelDynamicModel
            * @see QuestionPanelDynamicModel.panels
            */
        onDynamicPanelAdded: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired on removing a panel from Panel Dynamic question.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a panel question.
            * <br/> `options.panelIndex` - a removed panel index.
            * <br/> `options.panel` - a removed panel.
            * @see QuestionPanelDynamicModel
            * @see QuestionPanelDynamicModel.panels
            */
        onDynamicPanelRemoved: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired every second if the method `startTimer` has been called.
            * @see startTimer
            * @see timeSpent
            * @see Page.timeSpent
            */
        onTimer: Event<(sender: SurveyModel) => any, any>;
        /**
            * The event is fired before displaying a new information in the Timer Panel. Use it to change the default text.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.text` - the timer panel info text.
            */
        onTimerPanelInfoText: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onDynamicPanelItemValueChanged: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to define, whether an answer to a question is correct or not.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.question` - a question on which you have to decide if the answer is correct or not.
            * <br/> `options.result` - returns `true`, if an answer is correct, or `false`, if the answer is not correct. Use questions' `value` and `correctAnswer` properties to return the correct value.
            * <br/> `options.correctAnswers` - you may change the default number of correct or incorrect answers in the question, for example for matrix, where each row is a quiz question.
            * @see Question.value
            * @see Question.correctAnswer
            */
        onIsAnswerCorrect: Event<(sender: SurveyModel, options: any) => any, any>;
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
        onDragDropAllow: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * Use this event to control scrolling element to top. You can cancel the default behavior by setting options.cancel property to true.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - an element that is going to be scrolled on top.
            * <br/> `options.question` - a question that is going to be scrolled on top. It can be null if options.page is not null.
            * <br/> `options.page` - a page that is going to be scrolled on top. It can be null if options.question is not null.
            * <br/> `options.elementId` - the unique element DOM Id.
            * <br/> `options.cancel` - set this property to true to cancel the default scrolling.
            */
        onScrollingElementToTop: Event<(sender: SurveyModel, options: any) => any, any>;
        onLocaleChangedEvent: Event<(sender: SurveyModel, value: string) => any, any>;
        onGetQuestionTitleActions: Event<(sender: SurveyModel, options: any) => any, any>;
        onGetPanelTitleActions: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The event is fired after the survey element content was collapsed or expanded.
            * <br/> `sender` - the survey object that fires the event.
            * <br/> `options.element` - Specifies which survey element content was collapsed or expanded.
            * @see onElementContentVisibilityChanged
            */
        onElementContentVisibilityChanged: Event<(sender: SurveyModel, options: any) => any, any>;
        /**
            * The list of errors on loading survey JSON. If the list is empty after loading a JSON, then the JSON is correct and has no errors.
            * @see JsonError
            */
        jsonErrors: Array<JsonError>;
        constructor(jsonObj?: any);
        getType(): string;
        protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
        /**
            * Returns a list of all pages in the survey, including invisible pages.
            * @see PageModel
            * @see visiblePages
            */
        readonly pages: Array<PageModel>;
        getCss(): any;
        css: any;
        readonly cssNavigationComplete: string;
        readonly cssNavigationPreview: string;
        readonly cssNavigationEdit: string;
        readonly cssNavigationPrev: string;
        readonly cssNavigationStart: string;
        readonly cssNavigationNext: string;
        readonly completedCss: string;
        /**
            * Gets or sets a list of triggers in the survey.
            * @see SurveyTrigger
            */
        triggers: Array<SurveyTrigger>;
        /**
            * Gets or sets a list of calculated values in the survey.
            * @see CalculatedValue
            */
        calculatedValues: Array<CalculatedValue>;
        /**
            * Gets or sets an identifier of a survey model loaded from the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey JSON is automatically loaded from [api.surveyjs.io](https://api.surveyjs.io) service.
            * @see loadSurveyFromService
            * @see onLoadedSurveyFromService
            */
        surveyId: string;
        /**
            * Gets or sets an identifier of a survey model saved to the [api.surveyjs.io](https://api.surveyjs.io) service. When specified, the survey data is automatically saved to the [api.surveyjs.io](https://api.surveyjs.io) service.
            * @see onComplete
            * @see surveyShowDataSaving
            */
        surveyPostId: string;
        /**
            * Gets or sets user's identifier (e.g., e-mail or unique customer id) in your web application.
            * If you load survey or post survey results from/to [api.surveyjs.io](https://api.surveyjs.io) service, then the library do not allow users to run the same survey the second time.
            * On the second run, the user will see the survey complete page.
            */
        clientId: string;
        /**
            * Gets or sets a cookie name used to save information about completing the survey.
            * If the property is not empty, before starting the survey, the Survey library checks if the cookie with this name exists.
            * If it is `true`, the survey goes to complete mode and a user sees the survey complete page. On completing the survey the cookie with this name is created.
            */
        cookieName: string;
        /**
            * Gets or sets whether to save survey results on completing every page. If the property value is set to `true`, the `onPartialSend` event is fired.
            * @see onPartialSend
            * @see clientId
            */
        sendResultOnPageNext: boolean;
        /**
            * Gets or sets whether to show the progress on saving/sending data into the [api.surveyjs.io](https://api.surveyjs.io) service.
            * @see surveyPostId
            */
        surveyShowDataSaving: boolean;
        /**
            * Gets or sets whether the first input is focused on showing a next or a previous page.
            */
        focusFirstQuestionAutomatic: boolean;
        /**
            * Gets or sets whether the first input is focused if the current page has errors.
            * Set this property to `false` (the default value is `true`) if you do not want to bring the focus to the first question that has error on the page.
            */
        focusOnFirstError: boolean;
        /**
            * Gets or sets the navigation buttons position.
            * Possible values: 'bottom' (default), 'top', 'both' and 'none'. Set it to 'none' to hide 'Prev', 'Next' and 'Complete' buttons.
            * It makes sense if you are going to create a custom navigation, have only a single page, or the `goNextPageAutomatic` property is set to `true`.
            * @see goNextPageAutomatic
            * @see showPrevButton
            */
        showNavigationButtons: string | any;
        /**
            * Gets or sets whether the Survey displays "Prev" button in its pages. Set it to `false` to prevent end-users from going back to their answers.
            * @see showNavigationButtons
            */
        showPrevButton: boolean;
        /**
            * Gets or sets whether the Survey displays survey title in its pages. Set it to `false` to hide a survey title.
            * @see title
            */
        showTitle: boolean;
        /**
            * Gets or sets whether the Survey displays page titles. Set it to `false` to hide page titles.
            * @see PageModel.title
            */
        showPageTitles: boolean;
        /**
            * On finishing the survey the complete page is shown. Set the property to `false`, to hide the complete page.
            * @see data
            * @see onComplete
            * @see navigateToUrl
            */
        showCompletedPage: boolean;
        /**
            * Set this property to a url you want to navigate after a user completing the survey.
            * By default it uses after calling onComplete event. In case calling options.showDataSaving callback in onComplete event, navigateToUrl will be used on calling options.showDataSavingSuccess callback.
            */
        navigateToUrl: string;
        /**
            * Gets or sets a list of URL condition items. If the expression of this item returns `true`, then survey will navigate to the item URL.
            * @see UrlConditionItem
            * @see navigateToUrl
            */
        navigateToUrlOnCondition: Array<UrlConditionItem>;
        getNavigateToUrl(): string;
        /**
            * Gets or sets the required question mark. The required question mark is a char or string that is rendered in the required questions' titles.
            * @see Question.title
            */
        requiredText: string;
        /**
            * Gets or sets whether to hide all required errors.
            */
        hideRequiredErrors: boolean;
        beforeSettingQuestionErrors(question: IQuestion, errors: Array<SurveyError>): void;
        /**
            * Gets or sets the first question index. The first question index is '1' by default. You may start it from '100' or from 'A', by setting '100' or 'A' to this property.
            * You can set the start index to "(1)" or "# A)" or "a)" to render question number as (1), # A) and a) accordingly.
            * @see Question.title
            * @see requiredText
            */
        questionStartIndex: string;
        /**
            * Gets or sets whether the "Others" option text is stored as question comment.
            *
            * By default the entered text in the "Others" input in the checkbox/radiogroup/dropdown is stored as `"question name " + "-Comment"`. The value itself is `"question name": "others"`.
            * Set this property to `false`, to store the entered text directly in the `"question name"` key.
            * @see commentPrefix
            */
        storeOthersAsComment: boolean;
        /**
            * Specifies the default maximum length for questions like text and comment, including matrix cell questions.
            *
            * The default value is `0`, that means that the text and comment have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
            * @see maxOthersLength
            */
        maxTextLength: number;
        /**
            * Gets or sets the default maximum length for question comments and others
            *
            * The default value is `0`, that means that the question comments have the same max length as the standard HTML input - 524288 characters: https://www.w3schools.com/tags/att_input_maxlength.asp.
            * @see Question.hasComment
            * @see Question.hasOther
            * @see maxTextLength
            */
        maxOthersLength: number;
        /**
            * Gets or ses whether a user can navigate the next page automatically after answering all the questions on a page without pressing the "Next" button.
            * The available options:
            *
            * - `true` - navigate the next page and submit survey data automatically.
            * - `autogonext` - navigate the next page automatically but do not submit survey data.
            * - `false` - do not navigate the next page and do not submit survey data automatically.
            * @see showNavigationButtons
            */
        goNextPageAutomatic: boolean | "autogonext";
        /**
            * Gets or sets whether a survey is automatically completed when `goNextPageAutomatic = true`. Set it to `false` if you do not want to submit survey automatically on completing the last survey page.
            * @see goNextPageAutomatic
            */
        allowCompleteSurveyAutomatic: boolean;
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
        checkErrorsMode: string;
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
        textUpdateMode: string;
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
        clearInvisibleValues: any;
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
        locale: string;
        /**
            * Returns an array of locales that are used in the survey's translation.
            */
        getUsedLocales(): Array<string>;
        protected onLocaleChanged(): void;
        getLocale(): string;
        locStrsChanged(): void;
        getMarkdownHtml(text: string, name: string): string;
        getRenderer(name: string): string;
        getRendererForString(element: Base, name: string): string;
        getProcessedText(text: string): string;
        getLocString(str: string): any;
        getErrorCustomText(text: string, error: SurveyError): string;
        /**
            * Returns the text that is displayed when there are no any visible pages and questiona.
            */
        readonly emptySurveyText: string;
        /**
            * Gets or sets a survey title.
            * @see description
            */
        title: string;
        readonly locTitle: LocalizableString;
        /**
            * Gets or sets a survey description. The survey description is displayed under a survey title.
            * @see title
            */
        description: string;
        readonly locDescription: LocalizableString;
        /**
            * Gets or sets a survey logo.
            * @see title
            */
        logo: string;
        readonly locLogo: LocalizableString;
        /**
            * Gets or sets a survey logo width.
            * @see logo
            */
        logoWidth: number;
        /**
            * Gets or sets a survey logo height.
            * @see logo
            */
        logoHeight: number;
        /**
            * Gets or sets a survey logo position.
            * @see logo
            */
        logoPosition: string;
        readonly hasLogo: boolean;
        readonly isLogoBefore: boolean;
        readonly isLogoAfter: boolean;
        readonly logoClassNames: string;
        /**
            * The logo fit mode.
            * @see logo
            */
        logoFit: string;
        readonly titleMaxWidth: string;
        /**
            * Gets or sets the HTML content displayed on the complete page. Use this property to change the default complete page text.
            * @see showCompletedPage
            * @see completedHtmlOnCondition
            * @see locale
            */
        completedHtml: string;
        readonly locCompletedHtml: LocalizableString;
        /**
            * The list of HTML condition items. If the expression of this item returns `true`, then a survey will use this item HTML instead of `completedHtml`.
            * @see HtmlConditionItem
            * @see completeHtml
            */
        completedHtmlOnCondition: Array<HtmlConditionItem>;
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
        readonly renderedCompletedHtml: string;
        /**
            * The HTML content displayed to an end user that has already completed the survey.
            * @see clientId
            * @see locale
            */
        completedBeforeHtml: string;
        readonly locCompletedBeforeHtml: LocalizableString;
        /**
            * The HTML that shows on loading survey Json from the [api.surveyjs.io](https://api.surveyjs.io) service.
            * @see surveyId
            * @see locale
            */
        loadingHtml: string;
        readonly locLoadingHtml: LocalizableString;
        /**
            * Gets or sets the 'Start' button caption.
            * The 'Start' button is shown on the started page. Set the `firstPageIsStarted` property to `true`, to display the started page.
            * @see firstPageIsStarted
            * @see locale
            */
        startSurveyText: string;
        readonly locStartSurveyText: LocalizableString;
        /**
            * Gets or sets the 'Prev' button caption.
            * @see locale
            */
        pagePrevText: string;
        readonly locPagePrevText: LocalizableString;
        /**
            * Gets or sets the 'Next' button caption.
            * @see locale
            */
        pageNextText: string;
        readonly locPageNextText: LocalizableString;
        /**
            *  Gets or sets the 'Complete' button caption.
            * @see locale
            */
        completeText: string;
        readonly locCompleteText: LocalizableString;
        /**
            *  Gets or sets the 'Preview' button caption.
            * @see locale
            * @see showPreviewBeforeComplete
            * @see editText
            * @see showPreview
            */
        previewText: string;
        readonly locPreviewText: LocalizableString;
        /**
            *  Gets or sets the 'Edit' button caption.
            * @see locale
            * @see showPreviewBeforeComplete
            * @see previewText
            * @see cancelPreview
            */
        editText: string;
        readonly locEditText: LocalizableString;
        /**
            * Set the pattern for question title. Default is "numTitleRequire", 1. What is your name? *,
            * You can set it to numRequireTitle: 1. * What is your name?
            * You can set it to requireNumTitle: * 1. What is your name?
            * You can set it to numTitle (remove require symbol completely): 1. What is your name?
            * @see QuestionModel.title
            */
        questionTitlePattern: string;
        getQuestionTitlePatternOptions(): Array<any>;
        /**
            * Gets or sets a question title template. Obsolete, please use questionTitlePattern
            * @see QuestionModel.title
            * @see questionTitlePattern
            */
        questionTitleTemplate: string;
        readonly locQuestionTitleTemplate: LocalizableString;
        getUpdatedQuestionTitle(question: IQuestion, title: string): string;
        getUpdatedQuestionNo(question: IQuestion, no: string): string;
        /**
            * Gets or sets whether the survey displays page numbers on pages titles.
            */
        showPageNumbers: boolean;
        /**
            * Gets or sets a value that specifies how the question numbers are displayed.
            *
            * The following options are available:
            *
            * - `on` - display question numbers
            * - `onpage` - display question numbers, start numbering on every page
            * - `off` - turn off the numbering for questions titles
            */
        showQuestionNumbers: string;
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
        showProgressBar: string;
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
        progressBarType: string;
        readonly isShowProgressBarOnTop: boolean;
        readonly isShowProgressBarOnBottom: boolean;
        /**
            * Returns the text/HTML that is rendered as a survey title.
            */
        readonly processedTitle: string;
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
        questionTitleLocation: string;
        protected updateElementCss(): void;
        /**
            * Gets or sets the error message position.
            *
            * The following options are available:
            *
            * - `top` - to show question error(s) over the question,
            * - `bottom` - to show question error(s) under the question.
            */
        questionErrorLocation: string;
        /**
            * Gets or sets the question description position.
            *
            * The following options are available:
            *
            * - `underTitle` - show question description under the question title,
            * - `underInput` - show question description under the question input instead of question title.
            */
        questionDescriptionLocation: string;
        /**
            * Gets or sets the survey edit mode.
            *
            * The following options are available:
            *
            * - `edit` (default) - make a survey editable,
            * - `display` - make a survey read-only.
            */
        mode: string;
        /**
            * Gets or sets an object that stores the survey results/data. You can set it directly as `{ 'question name': questionValue, ... }`
            *
            * > If you set the `data` property after creating the survey, you may need to set the `currentPageNo` to `0`, if you are using `visibleIf` properties for questions/pages/panels to ensure that you are starting from the first page.
            * @see setValue
            * @see getValue
            * @see mergeData
            * @see currentPageNo
            */
        data: any;
        /**
            * Merge the values into survey.data. It works as survey.data, except it doesn't clean the existing data, but overrides them.
            * @param data data to merge. It should be an object {keyValue: Value, ...}
            * @see data
            * @see setValue
            */
        mergeData(data: any): void;
        setDataCore(data: any): void;
        editingObj: Base;
        readonly isEditingSurveyElement: boolean;
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
        readonly comments: any;
        /**
            * Returns a list of visible pages. If all pages are visible, then this property returns the same list as the `pages` property.
            * @see pages
            * @see PageModel.visible
            * @see PageModel.visibleIf
            */
        readonly visiblePages: Array<PageModel>;
        /**
            * Returns `true` if the survey contains no pages. The survey is empty.
            */
        readonly isEmpty: boolean;
        /**
            * Deprecated. Use the `pageCount` property instead.
            */
        readonly PageCount: number;
        /**
            * Returns the survey page count.
            * @see visiblePageCount
            * @see pages
            */
        readonly pageCount: number;
        /**
            * Returns a number of visible pages within the survey.
            * @see pageCount
            * @see visiblePages
            */
        readonly visiblePageCount: number;
        /**
            * Returns the started page. This property works if the `firstPageIsStarted` property is set to `true`.
            * @see firstPageIsStarted
            */
        readonly startedPage: PageModel;
        /**
            * Gets or sets the current survey page. If a survey is rendered, then this property returns a page that a user can see/edit.
            */
        currentPage: any;
        /**
            * The zero-based index of the current page in the visible pages array.
            */
        currentPageNo: number;
        /**
            * Gets or sets the question display order. Use this property to randomize questions. You can randomize questions on a specific page.
            *
            * The following options are available:
            *
            * - `random` - randomize questions
            * - `initial` - keep questions in the same order, as in a survey model.
            * @see SurveyPage.questionsOrder
            */
        questionsOrder: string;
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
        readonly state: string;
        readonly completedState: string;
        readonly completedStateText: string;
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
        readonly progressValue: number;
        /**
            * Returns the navigation buttons (i.e., 'Prev', 'Next', or 'Complete') position.
            */
        readonly isNavigationButtonsShowing: string;
        /**
            * Returns `true` if the survey is in edit mode.
            * @see mode
            */
        readonly isEditMode: boolean;
        readonly isCompleteButtonVisible: boolean;
        readonly isPreviewButtonVisible: boolean;
        readonly isCancelPreviewButtonVisible: boolean;
        /**
            * Returns `true` if the survey is in display mode or in preview mode.
            * @see mode
            * @see showPreviewBeforeComplete
            */
        readonly isDisplayMode: boolean;
        readonly isUpdateValueTextOnTyping: boolean;
        /**
            * Returns `true` if the survey is in design mode. It is used by SurveyJS Editor.
            * @see setDesignMode
            */
        readonly isDesignMode: boolean;
        /**
            * Sets the survey into design mode.
            * @param value use true to set the survey into the design mode.
            */
        setDesignMode(value: boolean): void;
        /**
            * Gets or sets whether to show all elements in the survey, regardless their visibility. The default value is `false`.
            */
        showInvisibleElements: boolean;
        readonly areInvisibleElementsShowing: boolean;
        readonly areEmptyElementsHidden: boolean;
        /**
            * Returns `true`, if a user has already completed the survey in this browser and there is a cookie about it. Survey goes to `completed` state if the function returns `true`.
            * @see cookieName
            * @see setCookie
            * @see deleteCookie
            * @see state
            */
        readonly hasCookie: boolean;
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
        readonly isCurrentPageHasErrors: boolean;
        /**
            * Returns `true`, if any of the survey pages contains errors.
            * @param fireCallback set it to `true`, to show errors in UI.
            * @param focusOnFirstError set it to `true` to focus on the first question that doesn't pass the validation and make the page, where the question is located, the current.
            */
        hasErrors(fireCallback?: boolean, focusOnFirstError?: boolean): boolean;
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
        isSinglePage: boolean;
        /**
            * Gets or sets a value that specifies how the survey combines questions, panels, and pages.
            *
            * The following options are available:
            *
            * - `singlePage` - combine all survey pages in a single page. Pages will be converted to panels.
            * - `questionPerPage` - show one question per page. Survey will create a separate page for every question.
            */
        questionsOnPageMode: string;
        /**
            * Gets or sets whether the first survey page is a start page. Set this property to `true`, to make the first page a starting page.
            * An end user cannot navigate to the start page and the start page does not affect a survey progress.
            */
        firstPageIsStarted: boolean;
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
        showPreviewBeforeComplete: string;
        readonly isShowPreviewBeforeComplete: boolean;
        protected onFirstPageIsStartedChanged(): void;
        runningPages: any;
        origionalPages: any;
        protected onQuestionsOnPageModeChanged(oldValue: string): void;
        /**
            * Gets whether the current page is the first one.
            */
        readonly isFirstPage: boolean;
        readonly isShowPrevButton: boolean;
        /**
            * Gets whether the current page is the last one.
            */
        readonly isLastPage: boolean;
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
            * It calls `navigateToUrl` after calling `onComplete` event.
            * In case calling `options.showDataSaving` callback in the `onComplete` event, `navigateToUrl` is used on calling `options.showDataSavingSuccess` callback.
            * @see completeLastPage
            * @see cookieName
            * @see state
            * @see onComplete
            * @see surveyPostId
            * @see completeLastPage
            * @see navigateToUrl
            * @see navigateToUrlOnCondition
            */
        doComplete(isCompleteOnTrigger?: boolean): void;
        /**
            * Starts the survey. Changes the survey mode from "starting" to "running". Call this function if your survey has a start page, otherwise this function does nothing.
            * @see firstPageIsStarted
            */
        start(): boolean;
        /**
            * Gets whether the question values on the current page are validating on the server at the current moment.
            * @see onServerValidateQuestions
            */
        readonly isValidatingOnServer: boolean;
        protected onIsValidatingOnServerChanged(): void;
        protected doServerValidation(doComplete: boolean, isPreview?: boolean): boolean;
        protected doNextPage(): void;
        setCompleted(): void;
        /**
            * Returns the HTML content for the complete page.
            * @see completedHtml
            */
        readonly processedCompletedHtml: string;
        /**
            * Returns the HTML content, that is shown to a user that had completed the survey before.
            * @see completedHtml
            * @see cookieName
            */
        readonly processedCompletedBeforeHtml: string;
        /**
            * Returns the HTML content, that is shows when a survey loads the survey JSON.
            */
        readonly processedLoadingHtml: string;
        getProgressInfo(): IProgressInfo;
        /**
            * Returns the text for the current progress.
            */
        readonly progressText: string;
        updateProgressText(onValueChanged?: boolean): void;
        getProgressText(): string;
        protected afterRenderSurvey(htmlElement: any): void;
        updateQuestionCssClasses(question: IQuestion, cssClasses: any): void;
        updatePanelCssClasses(panel: IPanel, cssClasses: any): void;
        updatePageCssClasses(page: IPage, cssClasses: any): void;
        afterRenderPage(htmlElement: any): void;
        afterRenderHeader(htmlElement: any): void;
        afterRenderQuestion(question: IQuestion, htmlElement: any): void;
        afterRenderQuestionInput(question: IQuestion, htmlElement: any): void;
        afterRenderPanel(panel: IElement, htmlElement: any): void;
        matrixBeforeRowAdded(options: any): void;
        matrixRowAdded(question: IQuestion, row: any): void;
        getQuestionByValueNameFromArray(valueName: string, name: string, index: number): IQuestion;
        matrixRowRemoved(question: IQuestion, rowIndex: number, row: any): void;
        matrixAllowRemoveRow(question: IQuestion, rowIndex: number, row: any): boolean;
        matrixCellCreated(question: IQuestion, options: any): void;
        matrixAfterCellRender(question: IQuestion, options: any): void;
        matrixCellValueChanged(question: IQuestion, options: any): void;
        matrixCellValueChanging(question: IQuestion, options: any): void;
        readonly isValidateOnValueChanging: boolean;
        matrixCellValidate(question: IQuestion, options: any): SurveyError;
        dynamicPanelAdded(question: IQuestion): void;
        dynamicPanelRemoved(question: IQuestion, panelIndex: number, panel: IPanel): void;
        dynamicPanelItemValueChanged(question: IQuestion, options: any): void;
        dragAndDropAllow(options: any): boolean;
        renderTitleActions(element: ISurveyElement): boolean;
        elementContentVisibilityChanged(element: ISurveyElement): void;
        getUpdatedQuestionTitleActions(question: IQuestion, titleActions: Array<any>): any[];
        getUpdatedPanelTitleActions(panel: IPanel, titleActions: Array<any>): any[];
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
        clearValueOnDisableItems: boolean;
        readonly isClearValueOnHidden: boolean;
        readonly isClearValueOnHiddenContainer: boolean;
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
        showTimerPanel: string;
        readonly isTimerPanelShowingOnTop: boolean;
        readonly isTimerPanelShowingOnBottom: boolean;
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
        showTimerPanelMode: string;
        readonly timerInfoText: string;
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
        maxTimeToFinish: number;
        /**
            * Gets or sets the maximum time in seconds that end user has to complete a page in the survey. If the value is 0 or less, an end user has no time limit.
            *
            * You may override this value for every page.
            * @see startTimer
            * @see maxTimeToFinish
            * @see PageModel.maxTimeToFinish
            */
        maxTimeToFinishPage: number;
        protected doTimer(): void;
        geSurveyData(): ISurveyData;
        getSurvey(): ISurvey;
        getTextProcessor(): ITextProcessor;
        getObjects(pages: string[], questions: string[]): any[];
        setTriggerValue(name: string, value: any, isVariable: boolean): void;
        copyTriggerValue(name: string, fromName: string): void;
        focusQuestion(name: string): boolean;
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
        static readonly operators: HashTable<Function>;
        constructor();
        getType(): string;
        toString(): string;
        operator: string;
        value: any;
        name: string;
        expression: string;
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
        readonly owner: ISurveyTriggerOwner;
        setOwner(owner: ISurveyTriggerOwner): void;
        readonly isOnNextPage: boolean;
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
        readonly isOnNextPage: boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the value from property **setValue** will be set to **setToName**
    */
export declare class SurveyTriggerSetValue extends SurveyTrigger {
        constructor();
        getType(): string;
        setToName: string;
        setValue: any;
        isVariable: boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the survey go to question **gotoName** and focus it.
    */
export declare class SurveyTriggerSkip extends SurveyTrigger {
        constructor();
        getType(): string;
        gotoName: string;
        readonly isOnNextPage: boolean;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the **runExpression** will be run. If **setToName** property is not empty then the result of **runExpression** will be set to it.
    */
export declare class SurveyTriggerRunExpression extends SurveyTrigger {
        constructor();
        getType(): string;
        setToName: string;
        runExpression: string;
        protected onSuccess(values: HashTable<any>, properties: HashTable<any>): void;
}
/**
    * If expression returns true, the value from question **fromName** will be set into **setToName**.
    */
export declare class SurveyTriggerCopyValue extends SurveyTrigger {
        constructor();
        setToName: string;
        fromName: string;
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
        readonly survey: SurveyModel;
        /**
            * Set this value to negative value, for example -1, to avoid closing the window on completing the survey. Leave it equals to 0 (default value) to close the window immediately, or set it to 3, 5, 10, ... to close the window in 3, 5, 10 seconds.
            */
        closeOnCompleteTimeout: number;
        /**
            * Returns true if the window is currently showing. Set it to true to show the window and false to hide it.
            * @see show
            * @see hide
            */
        isShowing: boolean;
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
        isExpanded: boolean;
        /**
            * The window and survey title.
            */
        title: string;
        readonly locTitle: LocalizableString;
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
    readonly hasAllValuesOnLastRun: boolean;
}
export declare class QuestionTextProcessor implements ITextProcessor {
    protected variableName: string;
    constructor(variableName: string);
    processValue(name: string, returnDisplayValue: boolean): TextPreProcessorValue;
    protected readonly survey: ISurvey;
    protected readonly panel: PanelModel;
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
    static serviceUrl: string;
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
    cleanCaption: string;
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
    getLocales: (removeDefaultLoc?: boolean) => string[];
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
    cleanCaption: string;
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
        init(): void;
        activatedByChanged(activatedBy: string): void;
        readonly isDefaultRender: boolean;
        readonly pdfQuestionType: string;
        readonly pdfRender: any;
}
export declare class CustomWidgetCollection {
        static Instance: CustomWidgetCollection;
        onCustomWidgetAdded: Event<(customWidget: QuestionCustomWidget) => any, any>;
        readonly widgets: Array<QuestionCustomWidget>;
        add(widgetJson: any, activatedBy?: string): void;
        addCustomWidget(widgetJson: any, activatedBy?: string): void;
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
    readonly isComposite: boolean;
}
export declare class ComponentCollection {
    static Instance: ComponentCollection;
    onCreateComposite: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCompositeModel;
    onCreateCustom: (name: string, questionJSON: ComponentQuestionJSON) => QuestionCustomModel;
    onAddingJson: (name: string, isComposite: boolean) => void;
    add(json: any): void;
    readonly items: Array<ComponentQuestionJSON>;
    getCustomQuestionByName(name: string): ComponentQuestionJSON;
    clear(): void;
    createQuestion(name: string, questionJSON: ComponentQuestionJSON): Question;
    protected createCompositeModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCompositeModel;
    protected createCustomModel(name: string, questionJSON: ComponentQuestionJSON): QuestionCustomModel;
}
export declare abstract class QuestionCustomModelBase extends Question implements ISurveyImpl, ISurveyData, IPanel {
    name: string;
    customQuestion: ComponentQuestionJSON;
    constructor(name: string, customQuestion: ComponentQuestionJSON);
    getType(): string;
    protected createWrapper(): void;
    protected onPropertyValueChanged(name: string, oldValue: any, newValue: any): void;
    itemValuePropertyChanged(item: ItemValue, name: string, oldValue: any, newValue: any): void;
    onFirstRendering(): void;
    protected abstract getElement(): SurveyElement;
    protected initElement(el: SurveyElement): void;
    setSurveyImpl(value: ISurveyImpl): void;
    onSurveyLoad(): void;
    afterRenderQuestionElement(el: any): void;
    afterRender(el: any): void;
    protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
    protected setNewValue(newValue: any): void;
    geSurveyData(): ISurveyData;
    getSurvey(): ISurvey;
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
    readonly elements: Array<IElement>;
    indexOf(el: IElement): number;
    ensureRowsVisibility(): void;
}
export declare class QuestionCustomModel extends QuestionCustomModelBase {
    getTemplate(): string;
    protected createWrapper(): void;
    protected getElement(): SurveyElement;
    onAnyValueChanged(name: string): void;
    hasErrors(fireCallback?: boolean, rec?: any): boolean;
    focus(onError?: boolean): void;
    readonly contentQuestion: Question;
    protected createQuestion(): Question;
    onSurveyLoad(): void;
    runCondition(values: HashTable<any>, properties: HashTable<any>): void;
    protected convertDataName(name: string): string;
    protected convertDataValue(name: string, newValue: any): any;
    protected setQuestionValue(newValue: any, updateIsAnswered?: boolean): void;
    onSurveyValueChanged(newValue: any): void;
    protected initElement(el: SurveyElement): void;
    protected updateElementCssCore(cssClasses: any): void;
}
export declare class QuestionCompositeModel extends QuestionCustomModelBase {
    name: string;
    customQuestion: ComponentQuestionJSON;
    static ItemVariableName: string;
    constructor(name: string, customQuestion: ComponentQuestionJSON);
    protected createWrapper(): void;
    getTemplate(): string;
    protected getCssType(): string;
    protected getElement(): SurveyElement;
    readonly contentPanel: PanelModel;
    hasErrors(fireCallback?: boolean, rec?: any): boolean;
    updateElementCss(): void;
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

export interface IActionBarItem {
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
        active?: (() => boolean) | boolean;
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
            * Toolbar item child items. Can be used as contianer for options
            */
        items?: any;
}
export declare class ActionBarItem extends Base implements IActionBarItem {
        constructor(item: IActionBarItem);
        id: string;
        visible?: boolean;
        title?: string;
        tooltip?: string;
        enabled?: boolean;
        showTitle?: boolean;
        action?: (context?: any) => void;
        css?: string;
        innerCss?: string;
        data?: any;
        popupModel?: any;
        needSeparator?: boolean;
        active?: boolean | (() => boolean);
        template?: string;
        component?: string;
        iconName?: string;
        items?: any;
}
export declare class AdaptiveActionBarItemWrapper extends Base implements IActionBarItem {
        constructor(owner: AdaptiveElement, item: IActionBarItem);
        readonly wrappedItem: IActionBarItem;
        readonly id: string;
        readonly visible: boolean;
        readonly title: string;
        readonly tooltip: string;
        readonly enabled: boolean;
        readonly showTitle: boolean;
        action(context?: any): void;
        readonly css: string;
        readonly innerCss: string;
        readonly data: any;
        readonly popupModel: any;
        readonly active: boolean;
        readonly template: string;
        readonly component: string;
        readonly iconName: string;
        readonly items: any;
        isVisible: boolean;
        needSeparator: boolean;
}
export declare abstract class AdaptiveElement extends Base {
        showTitles: boolean;
        protected dotsItem: AdaptiveActionBarItemWrapper;
        constructor();
        readonly hasItems: boolean;
        items: Array<AdaptiveActionBarItemWrapper>;
        invisibleItems: AdaptiveActionBarItemWrapper[];
        invisibleItemSelected(item: AdaptiveActionBarItemWrapper): void;
        protected dotsItemPopupModel: PopupModel;
        showFirstN(visibleItemsCount: number): void;
        readonly canShrink: boolean;
        readonly canGrow = true;
        shrink(): void;
        grow(): void;
}

export declare class PopupModel {
    contentComponentName: string;
    contentComponentData: any;
    verticalPosition: "top" | "bottom" | "middle";
    horizontalPosition: "left" | "right" | "center";
    showPointer: boolean;
    isModal: boolean;
    onCancel: () => void;
    onApply: () => void;
    onHide: () => void;
    onShow: () => void;
    cssClass: string;
    constructor(contentComponentName: string, contentComponentData: any, verticalPosition?: "top" | "bottom" | "middle", horizontalPosition?: "left" | "right" | "center", showPointer?: boolean, isModal?: boolean, onCancel?: () => void, onApply?: () => void, onHide?: () => void, onShow?: () => void, cssClass?: string);
    toggleVisibility(): void;
    onToggleVisibility: () => void;
}

export declare const IsMobile: boolean;

export declare class SurveyPanelBase extends SurveyElementBase {
    protected rootRef: React.RefObject<HTMLDivElement>;
    constructor(props: any);
    protected getStateElement(): Base;
    protected modifyNonStateProps(nonStateProps: Array<string>): void;
    protected readonly survey: SurveyModel;
    protected readonly creator: ISurveyCreator;
    protected readonly css: any;
    readonly panelBase: PanelModelBase;
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

/**
    * A Model for a matrix base question.
    */
export declare class QuestionMatrixBaseModel<TRow, TColumn> extends Question {
        name: string;
        protected filteredColumns: Array<TColumn>;
        protected filteredRows: Array<ItemValue>;
        protected generatedVisibleRows: Array<TRow>;
        protected generatedTotalRow: TRow;
        visibleRowsChangedCallback: () => void;
        protected createColumnValues(): any;
        constructor(name: string);
        getType(): string;
        readonly isCompositeQuestion: boolean;
        /**
            * Set this property to false, to hide table header. The default value is true.
            */
        showHeader: boolean;
        /**
            * The list of columns. A column has a value and an optional text
            */
        columns: Array<any>;
        readonly visibleColumns: Array<any>;
        /**
            * The list of rows. A row has a value and an optional text
            */
        rows: Array<any>;
        protected processRowsOnSet(newRows: Array<any>): any[];
        protected getVisibleRows(): Array<TRow>;
        /**
            * Returns the list of visible rows as model objects.
            * @see rowsVisibleIf
            */
        readonly visibleRows: Array<TRow>;
        /**
            * An expression that returns true or false. It runs against each row item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see visibleIf
            */
        rowsVisibleIf: string;
        /**
            * An expression that returns true or false. It runs against each column item and if for this item it returns true, then the item is visible otherwise the item becomes invisible. Please use {item} to get the current item value in the expression.
            * @see rowsVisibleIf
            */
        columnsVisibleIf: string;
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
}

declare function compareVersions(a: any, b: any): number;
declare function confirmAction(message: string): boolean;
declare function detectIEBrowser(): boolean;
declare function detectIEOrEdge(): any;
declare function loadFileFromBase64(b64Data: string, fileName: string): void;
declare function isMobile(): boolean;
declare function isElementVisible(element: HTMLElement, threshold?: number): boolean;
declare function findScrollableParent(element: HTMLElement): HTMLElement;
declare function createSvg(size: number, width: number, height: number, iconName: string, svgElem: any): void;
export { compareVersions, confirmAction, detectIEOrEdge, detectIEBrowser, loadFileFromBase64, isMobile, isElementVisible, findScrollableParent, createSvg, };

