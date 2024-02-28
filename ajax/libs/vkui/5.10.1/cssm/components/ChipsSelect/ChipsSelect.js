import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useChipsSelect } from '../../hooks/useChipsSelect';
import { useExternRef } from '../../hooks/useExternRef';
import { useGlobalEventListener } from '../../hooks/useGlobalEventListener';
import { useDOM } from '../../lib/dom';
import { defaultFilterFn } from '../../lib/select';
import { ChipsInputBase, chipsInputDefaultProps } from '../ChipsInputBase/ChipsInputBase';
import { CustomSelectDropdown } from '../CustomSelectDropdown/CustomSelectDropdown';
import { CustomSelectOption } from '../CustomSelectOption/CustomSelectOption';
import { DropdownIcon } from '../DropdownIcon/DropdownIcon';
import { FormField } from '../FormField/FormField';
import { IconButton } from '../IconButton/IconButton';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './ChipsSelect.module.css';
const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && !option.disabled);
};
const findIndexBefore = (options = [], endIndex = options.length)=>{
    let result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(let i = endIndex - 1; i >= 0; i--){
        let option = options[i];
        if (!option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
const FOCUS_ACTION_NEXT = 'next';
const FOCUS_ACTION_PREV = 'prev';
const chipsSelectDefaultProps = {
    ...chipsInputDefaultProps,
    emptyText: 'Ничего не найдено',
    creatableText: 'Создать значение',
    onChangeStart: noop,
    creatable: false,
    fetching: false,
    showSelected: true,
    closeAfterSelect: true,
    options: [],
    filterFn: defaultFilterFn,
    renderOption (props) {
        return /*#__PURE__*/ React.createElement(CustomSelectOption, props);
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/ChipsSelect
 */ export const ChipsSelect = (props)=>{
    const propsWithDefault = {
        ...chipsSelectDefaultProps,
        ...props
    };
    const { style, onFocus, onBlur, onKeyDown, className, fetching, renderOption, emptyText, getRef, getRootRef, disabled, placeholder, tabIndex, getOptionValue, getOptionLabel, showSelected, getNewOptionData, renderChip, popupDirection, creatable, filterFn, inputValue, creatableText, closeAfterSelect, onChangeStart, before, icon, options, fixDropdownWidth, forceDropdownPortal, noMaxHeight = false, ...restProps } = propsWithDefault;
    const { document } = useDOM();
    const [popperPlacement, setPopperPlacement] = React.useState(undefined);
    const scrollBoxRef = React.useRef(null);
    const rootRef = useExternRef(getRootRef);
    const { fieldValue, selectedOptions = [], opened, setOpened, addOptionFromInput, filteredOptions, addOption, handleInputChange, clearInput, focusedOption, setFocusedOption, focusedOptionIndex, setFocusedOptionIndex } = useChipsSelect(propsWithDefault);
    const showCreatable = Boolean(creatable && creatableText && !filteredOptions.length && fieldValue);
    const handleFocus = (e)=>{
        setOpened(true);
        setFocusedOptionIndex(null);
        onFocus(e);
    };
    const handleBlur = (e)=>{
        onBlur(e);
        // Не добавляем значение, если его нужно выбрать строго из списка
        if (!e.defaultPrevented && !creatable) {
            e.preventDefault();
        }
    };
    const handleClickOutside = (e)=>{
        const isClickOutsideFormField = !rootRef.current?.contains(e.target);
        const isClickOutsideDropdown = !scrollBoxRef.current?.contains(e.target);
        if (isClickOutsideFormField && isClickOutsideDropdown) {
            setOpened(false);
        }
    };
    const chipsSelectOptions = React.useRef([]).current;
    const scrollToElement = (index, center = false)=>{
        const dropdown = scrollBoxRef.current;
        const item = chipsSelectOptions[index];
        if (!item || !dropdown) {
            return;
        }
        const dropdownHeight = dropdown.offsetHeight;
        const scrollTop = dropdown.scrollTop;
        const itemTop = item.offsetTop;
        const itemHeight = item.offsetHeight;
        if (center) {
            dropdown.scrollTop = itemTop - dropdownHeight / 2 + itemHeight / 2;
        } else if (itemTop + itemHeight > dropdownHeight + scrollTop) {
            dropdown.scrollTop = itemTop - dropdownHeight + itemHeight;
        } else if (itemTop < scrollTop) {
            dropdown.scrollTop = itemTop;
        }
    };
    const focusOptionByIndex = (index, oldIndex)=>{
        const { length } = filteredOptions;
        if (index < 0) {
            index = length - 1;
        } else if (index >= length) {
            index = 0;
        }
        if (index === oldIndex) {
            return;
        }
        const option = filteredOptions[index];
        if (option?.disabled) {
            return;
        }
        scrollToElement(index);
        setFocusedOptionIndex(index);
    };
    const focusOption = (nextIndex, type)=>{
        let index = nextIndex === null ? -1 : nextIndex;
        if (type === FOCUS_ACTION_NEXT) {
            const nextIndex = findIndexAfter(filteredOptions, index);
            index = nextIndex === -1 ? findIndexAfter(filteredOptions) : nextIndex; // Следующий за index или первый валидный до index
        } else if (type === FOCUS_ACTION_PREV) {
            const beforeIndex = findIndexBefore(filteredOptions, index);
            index = beforeIndex === -1 ? findIndexBefore(filteredOptions) : beforeIndex; // Предшествующий index или последний валидный после index
        }
        focusOptionByIndex(index, focusedOptionIndex);
    };
    const handleKeyDown = (e)=>{
        onKeyDown(e);
        if (e.key === 'ArrowUp' && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                focusOption(null, FOCUS_ACTION_NEXT);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_PREV);
            }
        }
        if (e.key === 'ArrowDown' && !e.defaultPrevented) {
            e.preventDefault();
            if (!opened) {
                setOpened(true);
                focusOption(null, FOCUS_ACTION_NEXT);
            } else {
                focusOption(focusedOptionIndex, FOCUS_ACTION_NEXT);
            }
        }
        if (e.key === 'Enter' && !e.defaultPrevented && opened) {
            if (focusedOptionIndex != null) {
                const option = filteredOptions[focusedOptionIndex];
                if (option) {
                    onChangeStart(e, option);
                    if (!e.defaultPrevented) {
                        addOption(option);
                        setFocusedOptionIndex(null);
                        clearInput();
                        closeAfterSelect && setOpened(false);
                        e.preventDefault();
                    }
                } else if (!creatable) {
                    e.preventDefault();
                }
            } else if (!creatable) {
                e.preventDefault();
            }
        }
        if ([
            'Escape',
            'Tab'
        ].includes(e.key) && !e.defaultPrevented && opened) {
            setOpened(false);
        }
    };
    React.useEffect(()=>{
        if (focusedOptionIndex != null && filteredOptions[focusedOptionIndex]) {
            setFocusedOption(filteredOptions[focusedOptionIndex]);
        } else if (focusedOptionIndex === null || focusedOptionIndex === 0) {
            setFocusedOption(null);
        }
    }, [
        focusedOptionIndex,
        filteredOptions,
        setFocusedOption
    ]);
    useGlobalEventListener(document, 'click', handleClickOutside);
    const renderChipWrapper = (renderChipProps)=>{
        if (renderChipProps === undefined) {
            return null;
        }
        const onRemoveWrapper = (e, value)=>{
            e?.preventDefault();
            e?.stopPropagation();
            renderChipProps.onRemove?.(e, value);
        };
        return renderChip({
            ...renderChipProps,
            onRemove: onRemoveWrapper
        });
    };
    const isPopperDirectionTop = popperPlacement?.includes('top');
    const onPlacementChange = React.useCallback((placement)=>{
        setPopperPlacement(placement);
    }, [
        setPopperPlacement
    ]);
    const onDropdownMouseLeave = React.useCallback(()=>{
        setFocusedOptionIndex(null);
    }, [
        setFocusedOptionIndex
    ]);
    const toggleOpened = ()=>{
        setOpened((prevOpened)=>!prevOpened);
    };
    return /*#__PURE__*/ React.createElement(React.Fragment, null, /*#__PURE__*/ React.createElement(FormField, {
        getRootRef: rootRef,
        style: style,
        className: classNames(styles['ChipsSelect'], opened && (isPopperDirectionTop ? styles['ChipsSelect--pop-up'] : styles['ChipsSelect--pop-down']), className),
        disabled: disabled,
        role: "application",
        "aria-disabled": disabled,
        "aria-readonly": restProps.readOnly,
        after: /*#__PURE__*/ React.createElement(IconButton, {
            className: styles['ChipsSelect__dropdown'],
            activeMode: "",
            hoverMode: "",
            // TODO [>=6]: add label customization
            "aria-label": opened ? 'Скрыть' : 'Развернуть',
            onClick: toggleOpened
        }, icon ?? /*#__PURE__*/ React.createElement(DropdownIcon, {
            className: styles['ChipsSelect__icon'],
            opened: opened
        })),
        before: before
    }, /*#__PURE__*/ React.createElement(ChipsInputBase, {
        ...restProps,
        tabIndex: tabIndex,
        value: selectedOptions,
        inputValue: fieldValue,
        getNewOptionData: getNewOptionData,
        getOptionLabel: getOptionLabel,
        getOptionValue: getOptionValue,
        renderChip: renderChipWrapper,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
        placeholder: placeholder,
        getRef: getRef,
        disabled: disabled,
        onInputChange: handleInputChange
    })), opened && /*#__PURE__*/ React.createElement(CustomSelectDropdown, {
        targetRef: rootRef,
        placement: popupDirection,
        scrollBoxRef: scrollBoxRef,
        onPlacementChange: onPlacementChange,
        onMouseLeave: onDropdownMouseLeave,
        fetching: fetching,
        sameWidth: fixDropdownWidth,
        forcePortal: forceDropdownPortal,
        noMaxHeight: noMaxHeight
    }, showCreatable && /*#__PURE__*/ React.createElement(CustomSelectOption, {
        hovered: focusedOptionIndex === 0,
        onMouseDown: addOptionFromInput,
        onMouseEnter: ()=>setFocusedOptionIndex(0)
    }, creatableText), !filteredOptions?.length && !showCreatable && emptyText ? /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['ChipsSelect__empty']
    }, emptyText) : filteredOptions.map((option, index)=>{
        const label = getOptionLabel(option);
        const hovered = focusedOption && getOptionValue(option) === getOptionValue(focusedOption);
        const selected = selectedOptions.find((selectedOption)=>{
            return getOptionValue(selectedOption) === getOptionValue(option);
        });
        const value = getOptionValue(option);
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: `${typeof value}-${value}`
        }, renderOption({
            option,
            hovered: Boolean(hovered),
            children: label,
            disabled: option.disabled,
            selected: !!selected,
            getRootRef: (e)=>{
                if (e) {
                    return chipsSelectOptions[index] = e;
                }
                return undefined;
            },
            onMouseDown: (e)=>{
                if (option.disabled) {
                    return;
                }
                onChangeStart?.(e, option);
                if (!e.defaultPrevented) {
                    closeAfterSelect && setOpened(false);
                    addOption(option);
                    clearInput();
                }
            },
            onMouseEnter: ()=>setFocusedOptionIndex(index)
        }));
    })));
};

//# sourceMappingURL=ChipsSelect.js.map