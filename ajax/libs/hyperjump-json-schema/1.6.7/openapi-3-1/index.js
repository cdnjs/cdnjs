import { addKeyword, defineVocabulary, loadDialect } from "../lib/keywords.js";
import { addSchema } from "../lib/core.js";
import "../lib/openapi.js";

import dialectSchema from "./dialect/base.js";
import vocabularySchema from "./meta/base.js";
import schema20221007 from "./schema/2022-10-07.js";
import schemaBase20221007 from "./schema-base/2022-10-07.js";

import discriminator from "../openapi-3-0/discriminator.js";
import example from "../openapi-3-0/example.js";
import externalDocs from "../openapi-3-0/externalDocs.js";
import xml from "../openapi-3-0/xml.js";


addKeyword(discriminator);
addKeyword(example);
addKeyword(externalDocs);
addKeyword(xml);

defineVocabulary("https://spec.openapis.org/oas/3.1/vocab/base", {
  "discriminator": "https://spec.openapis.org/oas/3.0/keyword/discriminator",
  "example": "https://spec.openapis.org/oas/3.0/keyword/example",
  "externalDocs": "https://spec.openapis.org/oas/3.0/keyword/externalDocs",
  "xml": "https://spec.openapis.org/oas/3.0/keyword/xml"
});

loadDialect("https://spec.openapis.org/oas/3.1/schema-base", {
  "https://json-schema.org/draft/2020-12/vocab/core": true,
  "https://json-schema.org/draft/2020-12/vocab/applicator": true,
  "https://json-schema.org/draft/2020-12/vocab/validation": true,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
  "https://json-schema.org/draft/2020-12/vocab/content": true,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
  "https://spec.openapis.org/oas/3.1/vocab/base": false
}, true);

addSchema(vocabularySchema);
addSchema(dialectSchema);

// Current Schemas
addSchema(schema20221007, "https://spec.openapis.org/oas/3.1/schema");
addSchema(schema20221007, "https://spec.openapis.org/oas/3.1/schema/latest");
addSchema(schemaBase20221007, "https://spec.openapis.org/oas/3.1/schema-base");
addSchema(schemaBase20221007, "https://spec.openapis.org/oas/3.1/schema-base/latest");

export * from "../draft-2020-12/index.js";
