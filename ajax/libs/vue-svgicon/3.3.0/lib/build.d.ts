export interface Options {
    sourcePath: string;
    targetPath: string;
    ext?: string;
    export?: boolean;
    es6?: boolean;
    tpl?: string;
    idSP?: string;
    svgo?: string | {
        [key: string]: any;
    };
}
/**
 * build svg icon
 */
export default function build(options: Options): Promise<unknown>;
