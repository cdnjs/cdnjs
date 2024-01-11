import jsonStringify from "fastest-stable-stringify";
import { pipe, asyncMap, asyncCollectArray } from "@hyperjump/pact";
import * as Browser from "@hyperjump/browser";
import * as Instance from "../instance.js";


const id = "https://json-schema.org/keyword/enum";

const compile = (schema) => pipe(
  Browser.iter(schema),
  asyncMap(Browser.value),
  asyncMap(jsonStringify),
  asyncCollectArray
);

const interpret = (enum_, instance) => enum_.some((enumValue) => jsonStringify(Instance.value(instance)) === enumValue);

export default { id, compile, interpret };
