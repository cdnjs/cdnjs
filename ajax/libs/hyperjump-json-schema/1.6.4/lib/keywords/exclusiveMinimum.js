import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/exclusiveMinimum";

const compile = (schema) => Schema.value(schema);
const interpret = (exclusiveMinimum, instance) => !Instance.typeOf(instance, "number") || Instance.value(instance) > exclusiveMinimum;

export default { id, compile, interpret };
