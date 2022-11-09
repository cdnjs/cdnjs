import { MermaidConfig } from './config.type';
/**
 * @param text
 * @param parseError
 */
declare function parse(text: string, parseError?: Function): boolean;
/**
 *
 * @param text
 * @param parseError
 */
declare function parseAsync(text: string, parseError?: Function): Promise<boolean>;
export declare const encodeEntities: (text: string) => string;
export declare const decodeEntities: (text: string) => string;
/** @param {MermaidConfig} options */
declare function initialize(options?: MermaidConfig): void;
export declare const mermaidAPI: Readonly<{
    render: (id: string, text: string, cb?: ((svgCode: string, bindFunctions?: ((element: Element) => void) | undefined) => void) | undefined, container?: Element) => string;
    renderAsync: (id: string, text: string, cb?: ((svgCode: string, bindFunctions?: ((element: Element) => void) | undefined) => void) | undefined, container?: Element) => Promise<string>;
    parse: typeof parse;
    parseAsync: typeof parseAsync;
    parseDirective: (p: any, statement: string, context: string, type: string) => void;
    initialize: typeof initialize;
    getConfig: () => MermaidConfig;
    setConfig: (conf: MermaidConfig) => MermaidConfig;
    getSiteConfig: () => MermaidConfig;
    updateSiteConfig: (conf: MermaidConfig) => MermaidConfig;
    reset: () => void;
    globalReset: () => void;
    defaultConfig: MermaidConfig;
}>;
export default mermaidAPI;
/**
 * ## mermaidAPI configuration defaults
 *
 * ```html
 * <script>
 *   var config = {
 *     theme: 'default',
 *     logLevel: 'fatal',
 *     securityLevel: 'strict',
 *     startOnLoad: true,
 *     arrowMarkerAbsolute: false,
 *
 *     er: {
 *       diagramPadding: 20,
 *       layoutDirection: 'TB',
 *       minEntityWidth: 100,
 *       minEntityHeight: 75,
 *       entityPadding: 15,
 *       stroke: 'gray',
 *       fill: 'honeydew',
 *       fontSize: 12,
 *       useMaxWidth: true,
 *     },
 *     flowchart: {
 *       diagramPadding: 8,
 *       htmlLabels: true,
 *       curve: 'basis',
 *     },
 *     sequence: {
 *       diagramMarginX: 50,
 *       diagramMarginY: 10,
 *       actorMargin: 50,
 *       width: 150,
 *       height: 65,
 *       boxMargin: 10,
 *       boxTextMargin: 5,
 *       noteMargin: 10,
 *       messageMargin: 35,
 *       messageAlign: 'center',
 *       mirrorActors: true,
 *       bottomMarginAdj: 1,
 *       useMaxWidth: true,
 *       rightAngles: false,
 *       showSequenceNumbers: false,
 *     },
 *     gantt: {
 *       titleTopMargin: 25,
 *       barHeight: 20,
 *       barGap: 4,
 *       topPadding: 50,
 *       leftPadding: 75,
 *       gridLineStartPadding: 35,
 *       fontSize: 11,
 *       fontFamily: '"Open Sans", sans-serif',
 *       numberSectionStyles: 4,
 *       axisFormat: '%Y-%m-%d',
 *       topAxis: false,
 *     },
 *   };
 *   mermaid.initialize(config);
 * </script>
 * ```
 */
