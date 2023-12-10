import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minLength";

const compile = (schema) => Schema.value(schema);
const interpret = (minLength, instance) => !Instance.typeOf(instance, "string") || [...Instance.value(instance)].length >= minLength;

export default { id, compile, interpret };
