import type { CompileOptions } from '@intlify/message-compiler';
import type { MessageFunction } from '@intlify/runtime';
export declare function clearCompileCache(): void;
export declare function compileToFunction<T = string>(source: string, options?: CompileOptions): MessageFunction<T>;
//# sourceMappingURL=compile.d.ts.map