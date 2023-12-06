import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maximum";

const compile = (schema) => Schema.value(schema);
const interpret = (maximum, instance) => !Instance.typeOf(instance, "number") || Instance.value(instance) <= maximum;

export default { id, compile, interpret };
