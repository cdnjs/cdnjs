import React from 'react';
export declare const getItem: (list: OptionListItem[], value: any) => OptionListItem;
export declare const getIndex: (list: OptionListItem[], value: string) => number;
interface IObjectKeys {
    [key: string]: string;
}
export interface OptionListItem extends IObjectKeys {
    id: string;
    name: string;
    icon?: string;
    displayText?: string;
    flag: string;
}
export interface ReactCustomFlagSelectProps {
    value?: string | number;
    disabled?: boolean;
    showSearch?: boolean;
    fields?: Array<string>;
    keyword?: string;
    showArrow?: boolean;
    animate?: boolean;
    optionList: OptionListItem[];
    onChange: (res: object, e: React.MouseEvent<HTMLElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLElement> | Event) => void;
    onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    classNameWrapper?: string;
    classNameContainer?: string;
    classNameSelect?: string;
    classNameButton?: string;
    classNameOptionListContainer?: string;
    classNameDropdownIconOptionListItem?: string;
    classNameOptionListItem?: string;
    customStyleWrapper?: React.CSSProperties;
    customStyleContainer?: React.CSSProperties;
    customStyleSelect?: React.CSSProperties;
    customStyleButton?: React.CSSProperties;
    customStyleOptionListContainer?: React.CSSProperties;
    customStyleOptionListItem?: React.CSSProperties;
    attributesWrapper?: React.HTMLAttributes<HTMLDivElement>;
    attributesInput?: React.HTMLAttributes<HTMLInputElement>;
    attributesButton?: React.HTMLAttributes<HTMLButtonElement>;
    selectHtml?: React.ReactElement<any>;
    selectOptionListItemHtml?: React.ReactElement<any>;
}
declare const ReactCustomFlagSelect: React.FC<ReactCustomFlagSelectProps>;
interface OptionProps {
    index?: number;
    id?: string;
    className?: string;
    item?: OptionListItem;
    customStyleOptionListItem?: React.CSSProperties;
    onClick?: (res: object | string, e: React.MouseEvent<HTMLElement>) => void;
    onMouseOver?: (res: number) => void;
    onMouseMove?: () => void;
    onMouseOut?: () => void;
    show: Boolean;
    $itemEls: Array<string>;
}
export declare const Option: React.FC<OptionProps>;
export default ReactCustomFlagSelect;
