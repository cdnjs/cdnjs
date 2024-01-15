export declare const mermaidAPI: {
    render: import("@vitest/spy").Mock<any, any>;
    parse: (text: string, parseOptions?: import("../mermaidAPI.js").ParseOptions | undefined) => Promise<boolean>;
    initialize: import("@vitest/spy").Mock<any, any>;
    getConfig: () => import("../config.type.js").MermaidConfig;
    setConfig: (conf: import("../config.type.js").MermaidConfig) => import("../config.type.js").MermaidConfig;
    getSiteConfig: () => import("../config.type.js").MermaidConfig;
    updateSiteConfig: (conf: import("../config.type.js").MermaidConfig) => import("../config.type.js").MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: import("../config.type.js").MermaidConfig;
};
export default mermaidAPI;
