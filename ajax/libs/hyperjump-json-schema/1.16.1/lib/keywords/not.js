import { Validation } from "../experimental.js";


const id = "https://json-schema.org/keyword/not";

const compile = (...args) => Validation.compile(...args);
const interpret = (...args) => !Validation.interpret(...args);

export default { id, compile, interpret };
