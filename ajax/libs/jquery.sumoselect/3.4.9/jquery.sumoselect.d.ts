export type SumoProps = {
  placeholder?: string;
  csvDispCount?: number;
  captionFormat?: string;
  captionFormatAllSelected?: string;
  floatWidth?: number;
  forceCustomRendering?: boolean;
  nativeOnDevice?: string[];
  outputAsCSV?: boolean;
  csvSepChar?: string;
  okCancelInMulti?: boolean;
  isClickAwayOk?: boolean;
  triggerChangeCombined?: boolean;
  selectAll?: boolean;
  selectAllPartialCheck?: boolean;
  search?: boolean;
  searchText?: string;
  searchFn?: (haystack: string, needle: string) => boolean;
  noMatch?: string;
  prefix?: string;
  locale?: [string, string, string, string];
  up?: boolean;
  showTitle?: boolean;
  clearAll?: boolean;
  closeAfterClearAll?: boolean;
  max?: number;
  renderLi?: (li: JQuery, originalOption: JQuery) => JQuery;
}

export interface SumoJQuery<TElement = HTMLElement> extends JQuery<TElement> {
  [n: number]: TElement & {
    sumo: SumoJQuery;
  };
  unload(): JQuery;
  add(name: string): SumoJQuery;
  add(name: string, index: number): SumoJQuery;
  add(name: string, html: string): SumoJQuery;
  add(name: string, html: string, index: number): SumoJQuery;
  remove(index: number): SumoJQuery;
  selectItem(index: number): SumoJQuery;
  selectItem(value: string): SumoJQuery;
  unSelectItem(index: number): SumoJQuery;
  unSelectItem(value: string): SumoJQuery;
  disableItem(index: number): SumoJQuery;
  enableItem(index: number): SumoJQuery;
  selectAll(): SumoJQuery;
  unSelectAll(): SumoJQuery;
  enable(): SumoJQuery;
  disable(): SumoJQuery;
  reload(): SumoJQuery;
}


declare global {
  interface JQuery {
    SumoSelect(options: SumoProps): SumoJQuery;
  }
}