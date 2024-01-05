import { DocumentReference, CollectionReference, Query } from 'firebase/firestore';
import { Ref, ShallowRef } from 'vue-demi';

/**
 * Allow resetting a subscription vue ref when the source changes or is removed. `false` keeps the value as is while
 * true resets it to `null` for objects and `[]` for arrays. A function allows to specify a custom reset value.
 */
type ResetOption = boolean | (() => unknown);
/**
 * Flattens out a type.
 *
 * @internal
 */
type _Simplify<T> = {
    [KeyType in keyof T]: T[KeyType];
} & {};
/**
 * @internal
 */
type _Nullable<T> = T | null | undefined;
type _FirestoreDataSource = DocumentReference<unknown> | CollectionReference<unknown> | Query<unknown>;
/**
 * @internal
 */
interface _RefWithState<T, E = Error> extends Ref<T> {
    /**
     * Realtime data wrapped in a Vue `ref`
     */
    get data(): Ref<T>;
    /**
     * Reactive Error if the firebase operation fails
     */
    get error(): Ref<E | undefined>;
    /**
     * Reactive loading state
     */
    get pending(): Ref<boolean>;
    /**
     * Reactive promise that resolves when the data is loaded or rejects if there is an error
     */
    get promise(): ShallowRef<Promise<T>>;
    /**
     * Stops listening to the data changes and stops the Vue watcher.
     */
    stop: (reset?: ResetOption) => void;
}
/**
 * Base options for the data source options in both Firestore and Realtime Database.
 *
 * @internal
 */
interface _DataSourceOptions<DataT = unknown> {
    /**
     * Use the `target` ref instead of creating one.
     */
    target?: Ref<DataT>;
    /**
     * Optional key to handle SSR hydration. **Necessary for Queries** or when the same source is used in multiple places
     * with different converters.
     */
    ssrKey?: string;
    /**
     * If true, the data will be reset when the data source is unbound. Pass a function to specify a custom reset value.
     */
    reset?: ResetOption;
    /**
     * If true, wait until the data is loaded before setting the data for the first time. For Firestore, this includes
     * nested refs. This is only useful for lists and collections. Objects and documents do not need this.
     */
    wait?: boolean;
    /**
     * Should the data be fetched once rather than subscribing to changes.
     */
    once?: boolean;
}

export type { ResetOption as R, _RefWithState as _, _Simplify as a, _DataSourceOptions as b, _Nullable as c, _FirestoreDataSource as d };
