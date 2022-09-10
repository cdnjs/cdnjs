/// <reference types="jest" />
/**
 * @param text
 * @param parseError
 */
declare function parse(text: string, parseError?: Function): boolean;
export declare const mermaidAPI: {
    render: jest.Mock<any, any>;
    parse: typeof parse;
    parseDirective: jest.Mock<any, any>;
    initialize: jest.Mock<any, any>;
    getConfig: () => import("../config.type").MermaidConfig;
    setConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    getSiteConfig: () => import("../config.type").MermaidConfig;
    updateSiteConfig: (conf: import("../config.type").MermaidConfig) => import("../config.type").MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: import("../config.type").MermaidConfig;
};
export default mermaidAPI;
