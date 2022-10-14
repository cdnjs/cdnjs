import { MermaidConfig } from '../config.type';
import { DiagramDetector, DiagramLoader } from './types';
/**
 * @function detectType Detects the type of the graph text. Takes into consideration the possible
 *   existence of an %%init directive
 *
 *   ```mermaid
 *   %%{initialize: {"startOnLoad": true, logLevel: "fatal" }}%%
 *   graph LR
 *    a-->b
 *    b-->c
 *    c-->d
 *    d-->e
 *    e-->f
 *    f-->g
 *    g-->h
 * ```
 * @param {string} text The text defining the graph
 * @param {{
 *   class: { defaultRenderer: string } | undefined;
 *   state: { defaultRenderer: string } | undefined;
 *   flowchart: { defaultRenderer: string } | undefined;
 * }} [config]
 * @returns {string} A graph definition key
 */
export declare const detectType: (text: string, config?: MermaidConfig) => string;
export declare const addDetector: (key: string, detector: DiagramDetector, loader?: DiagramLoader) => void;
export declare const getDiagramLoader: (key: string) => DiagramLoader | undefined;
