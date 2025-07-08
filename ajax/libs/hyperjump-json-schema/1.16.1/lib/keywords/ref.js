import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/ref";

const compile = (...args) => Validation.compile(...args);
const interpret = (...args) => Validation.interpret(...args);

const simpleApplicator = true;

export default { id, compile, interpret, simpleApplicator };
