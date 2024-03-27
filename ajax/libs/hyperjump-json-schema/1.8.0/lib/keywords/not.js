import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/not";

const compile = Validation.compile;
const interpret = (not, instance, ast, dynamicAnchors, quiet) => !Validation.interpret(not, instance, ast, dynamicAnchors, quiet);

export default { id, compile, interpret };
