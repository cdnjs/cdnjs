import jsonStringify from "fastest-stable-stringify";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/const";

const compile = (schema) => jsonStringify(Schema.value(schema));
const interpret = (const_, instance) => jsonStringify(Instance.value(instance)) === const_;

export default { id, compile, interpret };
