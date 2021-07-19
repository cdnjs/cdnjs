import { InMemory } from './inmemory';
import { FlatFile } from './flatfile';
import { LocalStorage } from './localstorage';
declare const DBFromEnv: () => InMemory | FlatFile;
export { InMemory, FlatFile, LocalStorage, DBFromEnv };
