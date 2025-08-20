declare namespace _default {
    export { Cardinality };
    export { Identification };
    export function getConfig(): import("../../config.type.js").ErDiagramConfig | undefined;
    export { addEntity };
    export { addAttributes };
    export { getEntities };
    export { addRelationship };
    export { getRelationships };
    export { clear };
    export { setAccTitle };
    export { getAccTitle };
    export { setAccDescription };
    export { getAccDescription };
    export { setDiagramTitle };
    export { getDiagramTitle };
}
export default _default;
declare namespace Cardinality {
    let ZERO_OR_ONE: string;
    let ZERO_OR_MORE: string;
    let ONE_OR_MORE: string;
    let ONLY_ONE: string;
    let MD_PARENT: string;
}
declare namespace Identification {
    let NON_IDENTIFYING: string;
    let IDENTIFYING: string;
}
declare function addEntity(name: any, alias?: undefined): any;
declare function addAttributes(entityName: any, attribs: any): void;
declare function getEntities(): {};
/**
 * Add a relationship
 *
 * @param entA The first entity in the relationship
 * @param rolA The role played by the first entity in relation to the second
 * @param entB The second entity in the relationship
 * @param rSpec The details of the relationship between the two entities
 */
declare function addRelationship(entA: any, rolA: any, entB: any, rSpec: any): void;
declare function getRelationships(): any[];
declare function clear(): void;
import { setAccTitle } from '../common/commonDb.js';
import { getAccTitle } from '../common/commonDb.js';
import { setAccDescription } from '../common/commonDb.js';
import { getAccDescription } from '../common/commonDb.js';
import { setDiagramTitle } from '../common/commonDb.js';
import { getDiagramTitle } from '../common/commonDb.js';
