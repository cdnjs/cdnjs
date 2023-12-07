import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/exclusiveMaximum";

const compile = (schema) => Schema.value(schema);
const interpret = (exclusiveMaximum, instance) => !Instance.typeOf(instance, "number") || Instance.value(instance) < exclusiveMaximum;

export default { id, compile, interpret };
