import {
  Headers,
  Request,
  Response,
  TextEncoder,
  URL,
} from "./deps/dist/deps.js";
export * from "./deps/dist/deps.js";
const encoder = new TextEncoder();
import { getenviron, in as stdin, out, err } from "std";
const rn = new Uint8Array([13, 10]).buffer;
export async function runHandler(handler) {
  let response;
  try {
    const env = getenviron();
    const headers = new Headers();
    for (
      const [key, value] of Object.entries(env).filter(([key]) =>
        key.startsWith("HTTP_")
      )
    ) {
      headers.set(key.slice(5).replaceAll("_", "-").toLowerCase(), value);
    }
    if (env.CONTENT_LENGTH) {
      headers.set("content-length", env.CONTENT_LENGTH);
    }
    if (env.CONTENT_TYPE) {
      headers.set("content-type", env.CONTENT_TYPE);
    }
    let body;
    const method = env.REQUEST_METHOD
      ? env.REQUEST_METHOD.toUpperCase()
      : "GET";
    if (method !== "GET" && method !== "HEAD") {
      const inChunks = [];
      let inSize = 0;
      while (!stdin.eof()) {
        const buf = new ArrayBuffer(1024);
        const length = stdin.read(buf, 0, buf.byteLength);
        if (length) {
          inSize += length;
          inChunks.push(new Uint8Array(buf, 0, length));
        }
      }
      body = new Uint8Array(inSize);
      let length = 0;
      for (const chunk of inChunks) {
        body.set(chunk, length);
        length += chunk.length;
      }
    }
    response = await handler(
      new Request(
        Object.assign(new URL("http://example"), {
          hostname: env.HTTP_HOST || env.SERVER_NAME,
          port: env.HTTPS
            ? (env.SERVER_PORT === "443" ? "" : env.SERVER_PORT)
            : (env.SERVER_PORT === "80" ? "" : env.SERVER_PORT),
          pathname: env.SCRIPT_NAME + env.PATH_INFO,
          search: env.QUERY_STRING,
          protocol: env.HTTPS ? "https:" : "http:",
        }),
        {
          headers,
          method,
          body,
        },
      ),
    );
  } catch (e) {
    const buf = encoder.encode(e.message + "\n" + e.stack + "\n");
    err.write(buf.buffer ? buf.buffer : buf, 0, buf.byteLength);
    response = new Response("Internal Server Error", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  response.headers.set("status", response.status + " " + response.statusText);
  for (const [name, value] of response.headers) {
    const buf = encoder.encode(name + ": " + value + "\r\n");
    out.write(buf.buffer ? buf.buffer : buf, 0, buf.byteLength);
  }
  out.write(rn, 0, rn.byteLength);
  const responseBody = await response.arrayBuffer();
  out.write(
    responseBody.buffer ? responseBody.buffer : responseBody,
    0,
    responseBody.byteLength,
  );
}
