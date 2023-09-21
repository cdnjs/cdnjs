import { StateManagerProps } from './useStateManager';
import { GroupBase, OptionsOrGroups } from './types';
declare type AsyncManagedPropKeys = 'options' | 'isLoading' | 'onInputChange' | 'filterOption';
export interface AsyncAdditionalProps<Option, Group extends GroupBase<Option>> {
    /**
     * The default set of options to show before the user starts searching. When
     * set to `true`, the results for loadOptions('') will be autoloaded.
     */
    defaultOptions?: OptionsOrGroups<Option, Group> | boolean;
    /**
     * If cacheOptions is truthy, then the loaded data will be cached. The cache
     * will remain until `cacheOptions` changes value.
     */
    cacheOptions?: any;
    /**
     * Function that returns a promise, which is the set of options to be used
     * once the promise resolves.
     */
    loadOptions?: (inputValue: string, callback: (options: OptionsOrGroups<Option, Group>) => void) => Promise<OptionsOrGroups<Option, Group>> | void;
    /**
     * Will cause the select to be displayed in the loading state, even if the
     * Async select is not currently waiting for loadOptions to resolve
     */
    isLoading?: boolean;
}
export declare type AsyncProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = StateManagerProps<Option, IsMulti, Group> & AsyncAdditionalProps<Option, Group>;
export default function useAsync<Option, IsMulti extends boolean, Group extends GroupBase<Option>, AdditionalProps>({ defaultOptions: propsDefaultOptions, cacheOptions, loadOptions: propsLoadOptions, options: propsOptions, isLoading: propsIsLoading, onInputChange: propsOnInputChange, filterOption, ...restSelectProps }: AsyncProps<Option, IsMulti, Group> & AdditionalProps): StateManagerProps<Option, IsMulti, Group> & Omit<AdditionalProps, keyof AsyncAdditionalProps<Option, Group> | AsyncManagedPropKeys>;
export {};
