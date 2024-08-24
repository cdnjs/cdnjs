export declare const mermaidAPI: {
    render: import("vitest").Mock<any, any>;
    parse: {
        (text: string, parseOptions: import("../types.js").ParseOptions & {
            suppressErrors: true;
        }): Promise<false | import("../types.js").ParseResult>;
        (text: string, parseOptions?: import("../types.js").ParseOptions | undefined): Promise<import("../types.js").ParseResult>;
    };
    initialize: import("vitest").Mock<any, any>;
    getConfig: () => import("../config.type.js").MermaidConfig;
    setConfig: (conf: import("../config.type.js").MermaidConfig) => import("../config.type.js").MermaidConfig;
    getSiteConfig: () => import("../config.type.js").MermaidConfig;
    updateSiteConfig: (conf: import("../config.type.js").MermaidConfig) => import("../config.type.js").MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: import("../config.type.js").MermaidConfig;
};
export default mermaidAPI;
