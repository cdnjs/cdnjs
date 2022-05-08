import { InMemory } from './inmemory';
import { FlatFile } from './flatfile';
declare const DBFromEnv: () => FlatFile | InMemory;
export { InMemory, FlatFile, DBFromEnv };
