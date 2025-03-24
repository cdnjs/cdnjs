import * as Browser from "@hyperjump/browser";
import * as Instance from "../../annotations/annotated-instance.js";
import { pointerSegments } from "@hyperjump/json-pointer";


const id = "https://json-schema.org/keyword/unknown";

const compile = (schema) => {
  const keywordName = [...pointerSegments(schema.cursor)].pop();
  return [keywordName, Browser.value(schema)];
};

const interpret = ([keywordName, value], instance, _ast, _dynamicAnchors, _quiet, schemaLocation) => {
  const keywordId = `${id}#${keywordName}`;
  Instance.setAnnotation(instance, keywordId, schemaLocation, value);
  return true;
};

export default { id, compile, interpret };
