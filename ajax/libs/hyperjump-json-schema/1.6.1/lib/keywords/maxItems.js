import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/maxItems";

const compile = (schema) => Schema.value(schema);
const interpret = (maxItems, instance) => !Instance.typeOf(instance, "array") || Instance.length(instance) <= maxItems;

export default { id, compile, interpret };
