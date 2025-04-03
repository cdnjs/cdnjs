import { addKeyword, defineVocabulary } from "../lib/keywords.js";
import { registerSchema } from "../lib/index.js";
import "../lib/openapi.js";

import dialectSchema from "./dialect/base.js";
import vocabularySchema from "./meta/base.js";
import schema from "./schema.js";
import schemaBase from "./schema-base.js";
import schemaDraft2020 from "./schema-draft-2020-12.js";
import schemaDraft2019 from "./schema-draft-2019-09.js";
import schemaDraft07 from "./schema-draft-07.js";
import schemaDraft06 from "./schema-draft-06.js";
import schemaDraft04 from "./schema-draft-04.js";

import discriminator from "../openapi-3-0/discriminator.js";
import example from "../openapi-3-0/example.js";
import externalDocs from "../openapi-3-0/externalDocs.js";
import xml from "../openapi-3-0/xml.js";


export * from "../draft-2020-12/index.js";

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

registerSchema(vocabularySchema);
registerSchema(dialectSchema);

// Current Schemas
registerSchema(schema, "https://spec.openapis.org/oas/3.1/schema");
registerSchema(schema, "https://spec.openapis.org/oas/3.1/schema/latest");
registerSchema(schemaBase, "https://spec.openapis.org/oas/3.1/schema-base");
registerSchema(schemaBase, "https://spec.openapis.org/oas/3.1/schema-base/latest");

// Alternative dialect schemas
registerSchema(schemaDraft2020, "https://spec.openapis.org/oas/3.1/schema-draft-2020-12");
registerSchema(schemaDraft2019, "https://spec.openapis.org/oas/3.1/schema-draft-2019-09");
registerSchema(schemaDraft07, "https://spec.openapis.org/oas/3.1/schema-draft-07");
registerSchema(schemaDraft06, "https://spec.openapis.org/oas/3.1/schema-draft-06");
registerSchema(schemaDraft04, "https://spec.openapis.org/oas/3.1/schema-draft-04");
