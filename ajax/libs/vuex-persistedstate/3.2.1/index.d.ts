import { Store, MutationPayload } from "vuex";
interface Storage {
    getItem: (key: string) => any;
    setItem: (key: string, value: any) => void;
    removeItem: (key: string) => void;
}
interface Options<State> {
    key?: string;
    paths?: string[];
    reducer?: (state: State, paths: string[]) => object;
    subscriber?: (store: Store<State>) => (handler: (mutation: any, state: State) => void) => void;
    storage?: Storage;
    getState?: (key: string, storage: Storage) => any;
    setState?: (key: string, state: any, storage: Storage) => void;
    filter?: (mutation: MutationPayload) => boolean;
    arrayMerger?: (state: any[], saved: any[]) => any;
    rehydrated?: (store: Store<State>) => void;
    fetchBeforeUse?: boolean;
    overwrite?: boolean;
    assertStorage?: (storage: Storage) => void | Error;
}
export default function <State>(options?: Options<State>): (store: Store<State>) => void;
export {};
