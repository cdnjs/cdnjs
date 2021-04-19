import { RawSourceMap } from 'source-map';
import { ResourceNode } from './parser';
import { CodeGenOptions } from './options';
export interface CodeGenResult {
    code: string;
    ast: ResourceNode;
    map?: RawSourceMap;
}
export declare const generate: (ast: ResourceNode, options?: CodeGenOptions) => CodeGenResult;
//# sourceMappingURL=generator.d.ts.map