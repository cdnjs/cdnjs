import { MermaidConfig } from './config.type';
/**
 * **Configuration methods in Mermaid version 8.6.0 have been updated, to learn more[[click
 * here](8.6.0_docs.md)].**
 *
 * ## **What follows are config instructions for older versions**
 *
 * These are the default options which can be overridden with the initialization call like so:
 *
 * **Example 1:**<pre> mermaid.initialize({ flowchart:{ htmlLabels: false } }); </pre>
 *
 * **Example 2:**<pre> <script> var config = { startOnLoad:true, flowchart:{ useMaxWidth:true,
 * htmlLabels:true, curve:'cardinal', },
 *
 *     securityLevel:'loose',
 *
 * }; mermaid.initialize(config); </script> </pre>
 *
 * A summary of all options and their defaults is found [here](#mermaidapi-configuration-defaults).
 * A description of each option follows below.
 *
 * @name Configuration
 */
declare const config: Partial<MermaidConfig>;
export declare const configKeys: string[];
export default config;
