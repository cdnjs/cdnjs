import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/minimum";

const compile = (schema) => Schema.value(schema);
const interpret = (minimum, instance) => !Instance.typeOf(instance, "number") || Instance.value(instance) >= minimum;

export default { id, compile, interpret };
