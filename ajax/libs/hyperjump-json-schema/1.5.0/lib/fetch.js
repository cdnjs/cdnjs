import fs from "fs/promises";
import { fetch, Response } from "undici";
import Url from "url";
import * as MediaTypes from "./media-types.js";


export default async (url, options) => {
  if (url.startsWith("file://")) {
    const filePath = Url.fileURLToPath(url);
    const fd = await fs.open(filePath);
    const stream = fd.createReadStream();
    const response = new Response(stream, {
      headers: { "Content-Type": MediaTypes.getContentType(filePath) }
    });
    Object.defineProperty(response, "url", { value: url });
    return response;
  } else {
    return fetch(url, options);
  }
};
