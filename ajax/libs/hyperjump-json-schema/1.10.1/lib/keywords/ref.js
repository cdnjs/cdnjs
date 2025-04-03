import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/ref";

const compile = (...args) => Validation.compile(...args);
const interpret = (...args) => Validation.interpret(...args);
const collectEvaluatedProperties = (...args) => Validation.collectEvaluatedProperties(...args);
const collectEvaluatedItems = (...args) => Validation.collectEvaluatedItems(...args);

export default { id, compile, interpret, collectEvaluatedProperties, collectEvaluatedItems };
