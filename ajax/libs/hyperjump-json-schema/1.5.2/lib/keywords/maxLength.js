import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxLength";

const compile = (schema) => Schema.value(schema);
const interpret = (maxLength, instance) => !Instance.typeOf(instance, "string") || [...Instance.value(instance)].length <= maxLength;

export default { id, compile, interpret };
