/**
 * Merges the value of `conf` with the passed `cnf`
 *
 * @param {object} cnf Config to merge
 */
export declare const setConf: (cnf: any) => void;
/**
 * Draws a an info picture in the tag with id: id based on the graph definition in text.
 *
 * @param {string} id The text for the error
 * @param {string} mermaidVersion The version
 */
export declare const draw: (id: string, mermaidVersion: string) => void;
declare const _default: {
    setConf: (cnf: any) => void;
    draw: (id: string, mermaidVersion: string) => void;
};
export default _default;
