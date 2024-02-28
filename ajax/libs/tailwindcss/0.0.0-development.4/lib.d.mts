declare function optimizeCss(input: string): string;
declare function compile(css: string, rawCandidates: string[]): string;

export { compile, optimizeCss };
