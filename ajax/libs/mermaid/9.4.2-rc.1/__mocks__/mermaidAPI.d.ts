import { type ParseErrorFunction } from '../Diagram';
/** {@inheritDoc mermaidAPI.parse} */
declare function parse(text: string, parseError?: ParseErrorFunction): boolean;
export declare const mermaidAPI: {
    render: import("@vitest/spy").Mock<any[], any>;
    renderAsync: import("@vitest/spy").Mock<any[], any>;
    parse: typeof parse;
    parseDirective: import("@vitest/spy").Mock<any[], any>;
    initialize: import("@vitest/spy").Mock<any[], any>;
    getConfig: () => import("../config.type").MermaidConfig;
    setConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    getSiteConfig: () => import("../config.type").MermaidConfig;
    updateSiteConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: import("../config.type").MermaidConfig;
};
export default mermaidAPI;
