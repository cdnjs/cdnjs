import * as React from 'react';
import { Icon24ChevronCompactLeft, Icon24ChevronCompactRight } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { usePagination } from '../../hooks/usePagination';
import { SizeType } from '../../lib/adaptivity';
import { Button } from '../Button/Button';
import { Tappable } from '../Tappable/Tappable';
import { Text } from '../Typography/Text/Text';
import styles from './Pagination.module.css';
function getPageAriaLabelDefault(page, isCurrent) {
    return isCurrent ? `${page} страница` : `Перейти на ${page} страницу`;
}
/**
 * @see https://vkcom.github.io/VKUI/#/Pagination
 */ export const Pagination = ({ currentPage = 1, siblingCount = 1, boundaryCount = 1, totalPages = 1, disabled, getPageAriaLabel = getPageAriaLabelDefault, prevButtonAriaLabel = 'Перейти на предыдущую страницу', nextButtonAriaLabel = 'Перейти на следующую страницу', getRootRef, onChange, ...resetProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const pages = usePagination({
        currentPage,
        totalPages,
        siblingCount,
        boundaryCount
    });
    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPages;
    const handlePrevClick = React.useCallback(()=>{
        if (onChange && !isFirstPage) {
            onChange(currentPage - 1);
        }
    }, [
        currentPage,
        isFirstPage,
        onChange
    ]);
    const handleClick = React.useCallback((event)=>{
        const page = event.currentTarget.dataset.page || '1';
        onChange?.(Number(page));
    }, [
        onChange
    ]);
    const handleNextClick = React.useCallback(()=>{
        if (onChange && !isLastPage) {
            onChange(currentPage + 1);
        }
    }, [
        currentPage,
        isLastPage,
        onChange
    ]);
    const renderPages = React.useCallback((page)=>{
        switch(page){
            case 'start-ellipsis':
            case 'end-ellipsis':
                return /*#__PURE__*/ React.createElement("li", {
                    key: page
                }, /*#__PURE__*/ React.createElement(Text, {
                    className: classNames(styles['Pagination__page'], styles['Pagination__page--type-ellipsis'], sizeY === 'none' && styles['Pagination__page--sizeY-none'], sizeY === SizeType.COMPACT && styles['Pagination__page--sizeY-compact'], disabled && styles['Pagination__page--disabled'])
                }, "…"));
            default:
                {
                    const isCurrent = page === currentPage;
                    return /*#__PURE__*/ React.createElement("li", {
                        key: page
                    }, /*#__PURE__*/ React.createElement(Tappable, {
                        className: classNames(styles['Pagination__page'], sizeY === 'none' && styles['Pagination__page--sizeY-none'], sizeY === SizeType.COMPACT && styles['Pagination__page--sizeY-compact'], isCurrent && styles['Pagination__page--current'], disabled && styles['Pagination__page--disabled']),
                        activeMode: styles['Pagination__page--state-active'],
                        hoverMode: styles['Pagination__page--state-hover'],
                        hasActive: !isCurrent,
                        hasHover: !isCurrent,
                        focusVisibleMode: "outside",
                        disabled: disabled,
                        "data-page": page,
                        "aria-current": isCurrent ? true : undefined,
                        "aria-label": getPageAriaLabel(page, isCurrent),
                        onClick: handleClick
                    }, /*#__PURE__*/ React.createElement(Text, {
                        normalize: false
                    }, page)));
                }
        }
    }, [
        sizeY,
        currentPage,
        disabled,
        getPageAriaLabel,
        handleClick
    ]);
    return /*#__PURE__*/ React.createElement("nav", {
        role: "navigation",
        "aria-label": "Навигация по страницам",
        ref: getRootRef,
        ...resetProps
    }, /*#__PURE__*/ React.createElement("ul", {
        className: styles['Pagination__list']
    }, /*#__PURE__*/ React.createElement("li", {
        className: styles['Pagination__prevButtonContainer']
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        before: /*#__PURE__*/ React.createElement(Icon24ChevronCompactLeft, {
            width: 24
        }),
        appearance: "accent",
        mode: "tertiary",
        disabled: isFirstPage || disabled,
        "aria-label": prevButtonAriaLabel,
        onClick: handlePrevClick
    })), pages.map(renderPages), /*#__PURE__*/ React.createElement("li", {
        className: styles['Pagination__nextButtonContainer']
    }, /*#__PURE__*/ React.createElement(Button, {
        size: "l",
        after: /*#__PURE__*/ React.createElement(Icon24ChevronCompactRight, {
            width: 24
        }),
        appearance: "accent",
        mode: "tertiary",
        disabled: isLastPage || disabled,
        "aria-label": nextButtonAriaLabel,
        onClick: handleNextClick
    }))));
};

//# sourceMappingURL=Pagination.js.map