import * as React from 'react';
declare class JqxTagCloud extends React.PureComponent<ITagCloudProps, IState> {
    protected static getDerivedStateFromProps(props: ITagCloudProps, state: IState): null | IState;
    private _jqx;
    private _id;
    private _componentSelector;
    constructor(props: ITagCloudProps);
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): React.ReactNode;
    setOptions(options: ITagCloudProps): void;
    getOptions(option: string): any;
    destroy(): void;
    findTagIndex(tag: string): number;
    getHiddenTagsList(): any[];
    getRenderedTags(): any[];
    getTagsList(): any[];
    hideItem(index: number): void;
    insertAt(index: number, item: any): void;
    removeAt(index: number): void;
    updateAt(index: number, item: any): void;
    showItem(index: number): void;
    private _manageProps;
    private _wireEvents;
}
export default JqxTagCloud;
export declare const jqx: any;
export declare const JQXLite: any;
interface IState {
    lastProps: object;
}
export interface ITagCloudTagRenderer {
    itemData?: any;
    minValue?: number;
    valueRange?: number;
}
export interface ITagCloudSource {
    url?: string;
    data?: any;
    localdata?: string;
    datatype?: 'xml' | 'json' | 'jsonp' | 'tsv' | 'csv' | 'local' | 'array' | 'observablearray';
    type?: string;
    id?: string;
    root?: string;
    record?: string;
}
interface ITagCloudOptions {
    alterTextCase?: 'none' | 'allLower' | 'allUpper' | 'firstUpper' | 'titleCase';
    disabled?: boolean;
    displayLimit?: number;
    displayMember?: string;
    displayValue?: boolean;
    fontSizeUnit?: 'px' | 'em' | '%';
    height?: number | string;
    maxColor?: string;
    maxFontSize?: number;
    maxValueToDisplay?: number;
    minColor?: string;
    minFontSize?: number;
    minValueToDisplay?: number;
    rtl?: boolean;
    sortBy?: 'none' | 'label' | 'value';
    sortOrder?: 'ascending' | 'descending';
    source?: ITagCloudSource;
    tagRenderer?: (itemData: ITagCloudTagRenderer['itemData'], minValue: ITagCloudTagRenderer['minValue'], valueRange: ITagCloudTagRenderer['valueRange']) => any;
    takeTopWeightedItems?: boolean;
    textColor?: string;
    urlBase?: string;
    urlMember?: string;
    valueMember?: string;
    width?: string | number;
}
export interface ITagCloudProps extends ITagCloudOptions {
    className?: string;
    style?: React.CSSProperties;
    onBindingComplete?: (e?: Event) => void;
    onItemClick?: (e?: Event) => void;
}
