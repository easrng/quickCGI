import { AbortController } from "abortcontroller-polyfill/src/ponyfill.js";
import { default as URLSearchParams } from "core-js-pure/actual/url-search-params";
import { TextDecoder, TextEncoder } from "./encoding.js";

function normalizeName(name) {
  if (typeof name !== "string") {
    name = String(name);
  }
  if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === "") {
    throw new TypeError(`Invalid character in header field name: "${name}"`);
  }
  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return value;
}

// Build a destructive iterator for the value list
function iteratorFor(items) {
  const iterator = {
    next() {
      const value = items.shift();
      return { done: value === undefined, value };
    },
  };

  iterator[Symbol.iterator] = () => iterator;
  return iterator;
}

export class Headers {
  constructor(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function (value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function (header) {
        if (header.length != 2) {
          throw new TypeError(
            `Headers constructor: expected name/value pair to be length 2, found${header.length}`,
          );
        }
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function (name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  append(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    const oldValue = this.map[name];
    this.map[name] = oldValue ? `${oldValue}, ${value}` : value;
  }

  get(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null;
  }

  has(name) {
    return this.map.hasOwnProperty(normalizeName(name));
  }

  set(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  }

  forEach(callback, thisArg) {
    for (const name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  }

  keys() {
    const items = [];
    this.forEach((_value, name) => {
      items.push(name);
    });
    return iteratorFor(items);
  }

  values() {
    const items = [];
    this.forEach((value) => {
      items.push(value);
    });
    return iteratorFor(items);
  }

  entries() {
    const items = [];
    this.forEach((value, name) => {
      items.push([name, value]);
    });
    return iteratorFor(items);
  }
}

Headers.prototype["delete"] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype[Symbol.iterator] = Headers.prototype.entries;

function consumed(body) {
  if (body._noBody) return;
  if (body.bodyUsed) {
    return Promise.reject(new TypeError("Already read"));
  }
  body.bodyUsed = true;
}

const decoder = new TextDecoder();
function readArrayBufferAsText(buf) {
  return decoder.decode(buf);
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    const view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

const encoder = new TextEncoder();

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    /*
          fetch-mock wraps the Response object in an ES6 Proxy to
          provide useful test harness features such as flush. However, on
          ES5 browsers without fetch or Proxy support pollyfills must be used;
          the proxy-pollyfill is unable to proxy an attribute unless it exists
          on the object before the Proxy is created. This change ensures
          Response.bodyUsed exists on the instance, while maintaining the
          semantic of setting Request.bodyUsed in the constructor before
          _initBody is called.
        */
    // eslint-disable-next-line no-self-assign
    this._bodyInit = body;
    if (!body) {
      this._noBody = true;
      this._bodyText = "";
    } else if (typeof body === "string") {
      this._bodyText = body;
    } else if (
      URLSearchParams.prototype.isPrototypeOf(body)
    ) {
      this._bodyText = body.toString();
    } else if (
      ArrayBuffer.prototype.isPrototypeOf(body) || ArrayBuffer.isView(body)
    ) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get("content-type")) {
      if (typeof body === "string") {
        this.headers.set("content-type", "text/plain;charset=UTF-8");
      } else if (
        URLSearchParams.prototype.isPrototypeOf(body)
      ) {
        this.headers.set(
          "content-type",
          "application/x-www-form-urlencoded;charset=UTF-8",
        );
      }
    }
  };

  this.arrayBuffer = function () {
    if (this._bodyArrayBuffer) {
      const isConsumed = consumed(this);
      if (isConsumed) {
        return isConsumed;
      } else if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
        return Promise.resolve(
          this._bodyArrayBuffer.buffer.slice(
            this._bodyArrayBuffer.byteOffset,
            this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength,
          ),
        );
      } else {
        return Promise.resolve(this._bodyArrayBuffer);
      }
    } else if (typeof this._bodyText === "string") {
      return encoder.encode(this._bodyText);
    } else {
      throw new Error("could not read as ArrayBuffer");
    }
  };

  this.text = function () {
    const rejected = consumed(this);
    if (rejected) {
      return rejected;
    }

    if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
}

// HTTP methods whose capitalization should be normalized
const methods = [
  "CONNECT",
  "DELETE",
  "GET",
  "HEAD",
  "OPTIONS",
  "PATCH",
  "POST",
  "PUT",
  "TRACE",
];

function normalizeMethod(method) {
  const upcased = method.toUpperCase();
  return methods.includes(upcased) ? upcased : method;
}

export class Request {
  constructor(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
      );
    }

    options = options || {};
    let body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError("Already read");
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || "same-origin";
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || "GET");
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal || (() => {
      const ctrl = new AbortController();
      return ctrl.signal;
    })();
    this.referrer = null;

    if ((this.method === "GET" || this.method === "HEAD") && body) {
      throw new TypeError("Body not allowed for GET or HEAD requests");
    }
    this._initBody(body);

    if (this.method === "GET" || this.method === "HEAD") {
      if (options.cache === "no-store" || options.cache === "no-cache") {
        // Search for a '_' parameter in the query string
        const reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(
            reParamSearch,
            `$1_=${new Date().getTime()}`,
          );
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          const reQueryString = /\?/;
          this.url += `${reQueryString.test(this.url) ? "&" : "?"}_=${
            new Date().getTime()
          }`;
        }
      }
    }
  }

  clone() {
    return new Request(this, { body: this._bodyInit });
  }
}

Body.call(Request.prototype);

export class Response {
  constructor(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError(
        'Please use the "new" operator, this DOM object constructor cannot be called as a function.',
      );
    }
    if (!options) {
      options = {};
    }

    this.type = "default";
    this.status = options.status === undefined ? 200 : options.status;
    if (this.status < 200 || this.status > 599) {
      throw new RangeError(
        "Failed to construct 'Response': The status provided (0) is outside the range [200, 599].",
      );
    }
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = options.statusText === undefined
      ? ""
      : `${options.statusText}`;
    this.headers = new Headers(options.headers);
    this.url = options.url || "";
    this._initBody(bodyInit);
  }

  clone() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url,
    });
  }
}

Body.call(Response.prototype);

Response.error = () => {
  const response = new Response(null, { status: 200, statusText: "" });
  response.status = 0;
  response.type = "error";
  return response;
};

const redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = (url, status) => {
  if (!redirectStatuses.includes(status)) {
    throw new RangeError("Invalid status code");
  }

  return new Response(null, { status, headers: { location: url } });
};

Response.json = (data, options = {}) => {
  const headers = new Headers(options.headers);
  headers.set("content-type", "application/json");
  return new Response(JSON.stringify(data), {
    status: options.status,
    statusText: options.statusText,
    headers,
  });
};
