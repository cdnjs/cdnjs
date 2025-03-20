declare namespace _default {
    export { RequirementType };
    export { RiskLevel };
    export { VerifyType };
    export { Relationships };
    export function getConfig(): any;
    export { addRequirement };
    export { getRequirements };
    export { setNewReqId };
    export { setNewReqText };
    export { setNewReqRisk };
    export { setNewReqVerifyMethod };
    export { setAccTitle };
    export { getAccTitle };
    export { setAccDescription };
    export { getAccDescription };
    export { addElement };
    export { getElements };
    export { setNewElementType };
    export { setNewElementDocRef };
    export { addRelationship };
    export { getRelationships };
    export { clear };
}
export default _default;
declare namespace RequirementType {
    let REQUIREMENT: string;
    let FUNCTIONAL_REQUIREMENT: string;
    let INTERFACE_REQUIREMENT: string;
    let PERFORMANCE_REQUIREMENT: string;
    let PHYSICAL_REQUIREMENT: string;
    let DESIGN_CONSTRAINT: string;
}
declare namespace RiskLevel {
    let LOW_RISK: string;
    let MED_RISK: string;
    let HIGH_RISK: string;
}
declare namespace VerifyType {
    let VERIFY_ANALYSIS: string;
    let VERIFY_DEMONSTRATION: string;
    let VERIFY_INSPECTION: string;
    let VERIFY_TEST: string;
}
declare namespace Relationships {
    let CONTAINS: string;
    let COPIES: string;
    let DERIVES: string;
    let SATISFIES: string;
    let VERIFIES: string;
    let REFINES: string;
    let TRACES: string;
}
declare function addRequirement(name: any, type: any): any;
declare function getRequirements(): {};
declare function setNewReqId(id: any): void;
declare function setNewReqText(text: any): void;
declare function setNewReqRisk(risk: any): void;
declare function setNewReqVerifyMethod(verifyMethod: any): void;
import { setAccTitle } from '../common/commonDb.js';
import { getAccTitle } from '../common/commonDb.js';
import { setAccDescription } from '../common/commonDb.js';
import { getAccDescription } from '../common/commonDb.js';
declare function addElement(name: any): any;
declare function getElements(): {};
declare function setNewElementType(type: any): void;
declare function setNewElementDocRef(docRef: any): void;
declare function addRelationship(type: any, src: any, dst: any): void;
declare function getRelationships(): any[];
declare function clear(): void;
