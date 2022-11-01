/**
 * @param text
 * @param parseError
 */
declare function parse(text: string, parseError?: Function): boolean;
export declare const mermaidAPI: {
    render: import("vitest/dist/index-6e18a03a").r<any[], any>;
    renderAsync: import("vitest/dist/index-6e18a03a").r<any[], any>;
    parse: typeof parse;
    parseDirective: import("vitest/dist/index-6e18a03a").r<any[], any>;
    initialize: import("vitest/dist/index-6e18a03a").r<any[], any>;
    getConfig: () => import("../config.type").MermaidConfig;
    setConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    getSiteConfig: () => import("../config.type").MermaidConfig;
    updateSiteConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: import("../config.type").MermaidConfig;
};
export default mermaidAPI;
