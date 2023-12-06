import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minItems";

const compile = (schema) => Schema.value(schema);
const interpret = (minItems, instance) => !Instance.typeOf(instance, "array") || Instance.length(instance) >= minItems;

export default { id, compile, interpret };
