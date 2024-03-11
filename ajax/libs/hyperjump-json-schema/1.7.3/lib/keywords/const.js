import jsonStringify from "fastest-stable-stringify";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/const";

const compile = (schema) => jsonStringify(Browser.value(schema));
const interpret = (const_, instance) => jsonStringify(Instance.value(instance)) === const_;

export default { id, compile, interpret };
