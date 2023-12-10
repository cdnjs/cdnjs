import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import jsonStringify from "fastest-stable-stringify";
import * as Schema from "../schema.js";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/enum";

const compile = (schema) => pipe(
  Schema.iter(schema),
  asyncMap(Schema.value),
  asyncMap(jsonStringify),
  asyncCollectArray
);

const interpret = (enum_, instance) => enum_.some((enumValue) => jsonStringify(Instance.value(instance)) === enumValue);

export default { id, compile, interpret };
