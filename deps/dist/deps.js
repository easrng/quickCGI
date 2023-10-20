var commonjsGlobal = typeof globalThis !== "undefined"
  ? globalThis
  : typeof window !== "undefined"
  ? window
  : typeof global !== "undefined"
  ? global
  : typeof self !== "undefined"
  ? self
  : {};

function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default")
    ? x["default"]
    : x;
}

var fails$d = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$c = fails$d;

var functionBindNative = !fails$c(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () {/* empty */}).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != "function" || test.hasOwnProperty("prototype");
});

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$b = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$3 &&
  FunctionPrototype$2.bind.bind(call$b, call$b);

var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$b.apply(fn, arguments);
  };
};

var uncurryThis$f = functionUncurryThis;

var toString$6 = uncurryThis$f({}.toString);
var stringSlice$3 = uncurryThis$f("".slice);

var classofRaw$2 = function (it) {
  return stringSlice$3(toString$6(it), 8, -1);
};

var uncurryThis$e = functionUncurryThis;
var fails$b = fails$d;
var classof$7 = classofRaw$2;

var $Object$4 = Object;
var split$3 = uncurryThis$e("".split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$b(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins -- safe
    return !$Object$4("z").propertyIsEnumerable(0);
  })
  ? function (it) {
    return classof$7(it) === "String" ? split$3(it, "") : $Object$4(it);
  }
  : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$3 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$2 = isNullOrUndefined$3;

var $TypeError$8 = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$3 = function (it) {
  if (isNullOrUndefined$2(it)) {
    throw new $TypeError$8("Can't call method on " + it);
  }
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$1 = indexedObject;
var requireObjectCoercible$2 = requireObjectCoercible$3;

var toIndexedObject$5 = function (it) {
  return IndexedObject$1(requireObjectCoercible$2(it));
};

var iterators = {};

var check = function (it) {
  return it && it.Math === Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$e =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == "object" && globalThis) ||
  check(typeof window == "object" && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == "object" && self) ||
  check(typeof commonjsGlobal == "object" && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () {
    return this;
  })() || commonjsGlobal || Function("return this")();

var documentAll$2 = typeof document == "object" && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll$2 == "undefined" &&
  documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA,
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$e = $documentAll$1.IS_HTMLDDA
  ? function (argument) {
    return typeof argument == "function" || argument === documentAll$1;
  }
  : function (argument) {
    return typeof argument == "function";
  };

var global$d = global$e;
var isCallable$d = isCallable$e;

var WeakMap$1 = global$d.WeakMap;

var weakMapBasicDetection = isCallable$d(WeakMap$1) &&
  /native code/.test(String(WeakMap$1));

var isCallable$c = isCallable$e;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$7 = $documentAll.IS_HTMLDDA
  ? function (it) {
    return typeof it == "object"
      ? it !== null
      : isCallable$c(it) || it === documentAll;
  }
  : function (it) {
    return typeof it == "object" ? it !== null : isCallable$c(it);
  };

var fails$a = fails$d;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$a(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, {
    get: function () {
      return 7;
    },
  })[1] !== 7;
});

var objectDefineProperty = {};

var global$c = global$e;
var isObject$6 = isObject$7;

var document$1 = global$c.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$6(document$1) && isObject$6(document$1.createElement);

var documentCreateElement$1 = function (it) {
  return EXISTS$1 ? document$1.createElement(it) : {};
};

var DESCRIPTORS$a = descriptors;
var fails$9 = fails$d;
var createElement = documentCreateElement$1;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$a && !fails$9(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement("div"), "a", {
    get: function () {
      return 7;
    },
  }).a !== 7;
});

var DESCRIPTORS$9 = descriptors;
var fails$8 = fails$d;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$9 && fails$8(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () {/* empty */}, "prototype", {
    value: 42,
    writable: false,
  }).prototype !== 42;
});

var isObject$5 = isObject$7;

var $String$3 = String;
var $TypeError$7 = TypeError;

// `Assert: Type(argument) is Object`
var anObject$7 = function (argument) {
  if (isObject$5(argument)) return argument;
  throw new $TypeError$7($String$3(argument) + " is not an object");
};

var NATIVE_BIND$2 = functionBindNative;

var call$a = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$a.bind(call$a) : function () {
  return call$a.apply(call$a, arguments);
};

var path$4 = {};

var path$3 = path$4;
var global$b = global$e;
var isCallable$b = isCallable$e;

var aFunction = function (variable) {
  return isCallable$b(variable) ? variable : undefined;
};

var getBuiltIn$4 = function (namespace, method) {
  return arguments.length < 2
    ? aFunction(path$3[namespace]) || aFunction(global$b[namespace])
    : path$3[namespace] && path$3[namespace][method] ||
      global$b[namespace] && global$b[namespace][method];
};

var uncurryThis$d = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$d({}.isPrototypeOf);

var engineUserAgent =
  typeof navigator != "undefined" && String(navigator.userAgent) || "";

var global$a = global$e;
var userAgent = engineUserAgent;

var process = global$a.process;
var Deno = global$a.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split(".");
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = engineV8Version;
var fails$7 = fails$d;
var global$9 = global$e;

var $String$2 = global$9.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols &&
  !fails$7(function () {
    var symbol = Symbol("symbol detection");
    // Chrome 38 Symbol has incorrect toString conversion
    // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
    // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
    // of course, fail.
    return !$String$2(symbol) || !(Object(symbol) instanceof Symbol) ||
      // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
      !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  });

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1 &&
  !Symbol.sham &&
  typeof Symbol.iterator == "symbol";

var getBuiltIn$3 = getBuiltIn$4;
var isCallable$a = isCallable$e;
var isPrototypeOf$1 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1
  ? function (it) {
    return typeof it == "symbol";
  }
  : function (it) {
    var $Symbol = getBuiltIn$3("Symbol");
    return isCallable$a($Symbol) &&
      isPrototypeOf$1($Symbol.prototype, $Object$3(it));
  };

var $String$1 = String;

var tryToString$2 = function (argument) {
  try {
    return $String$1(argument);
  } catch (error) {
    return "Object";
  }
};

var isCallable$9 = isCallable$e;
var tryToString$1 = tryToString$2;

var $TypeError$6 = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$3 = function (argument) {
  if (isCallable$9(argument)) return argument;
  throw new $TypeError$6(tryToString$1(argument) + " is not a function");
};

var aCallable$2 = aCallable$3;
var isNullOrUndefined$1 = isNullOrUndefined$3;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$3 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$1(func) ? undefined : aCallable$2(func);
};

var call$9 = functionCall;
var isCallable$8 = isCallable$e;
var isObject$4 = isObject$7;

var $TypeError$5 = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (
    pref === "string" && isCallable$8(fn = input.toString) &&
    !isObject$4(val = call$9(fn, input))
  ) return val;
  if (
    isCallable$8(fn = input.valueOf) && !isObject$4(val = call$9(fn, input))
  ) return val;
  if (
    pref !== "string" && isCallable$8(fn = input.toString) &&
    !isObject$4(val = call$9(fn, input))
  ) return val;
  throw new $TypeError$5("Can't convert object to primitive value");
};

var shared$3 = { exports: {} };

var isPure = true;

var global$8 = global$e;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$3 = Object.defineProperty;

var defineGlobalProperty$1 = function (key, value) {
  try {
    defineProperty$3(global$8, key, {
      value: value,
      configurable: true,
      writable: true,
    });
  } catch (error) {
    global$8[key] = value;
  }
  return value;
};

var global$7 = global$e;
var defineGlobalProperty = defineGlobalProperty$1;

var SHARED = "__core-js_shared__";
var store$3 = global$7[SHARED] || defineGlobalProperty(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$3.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})("versions", []).push({
  version: "3.33.1",
  mode: "pure",
  copyright: "© 2014-2023 Denis Pushkarev (zloirock.ru)",
  license: "https://github.com/zloirock/core-js/blob/v3.33.1/LICENSE",
  source: "https://github.com/zloirock/core-js",
});

var sharedExports = shared$3.exports;

var requireObjectCoercible$1 = requireObjectCoercible$3;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$2(requireObjectCoercible$1(argument));
};

var uncurryThis$c = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$c({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$3(it), key);
};

var uncurryThis$b = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$5 = uncurryThis$b(1.0.toString);

var uid$2 = function (key) {
  return "Symbol(" + (key === undefined ? "" : key) + ")_" +
    toString$5(++id + postfix, 36);
};

var global$6 = global$e;
var shared$2 = sharedExports;
var hasOwn$9 = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var Symbol$1 = global$6.Symbol;
var WellKnownSymbolsStore = shared$2("wks");
var createWellKnownSymbol = USE_SYMBOL_AS_UID
  ? Symbol$1["for"] || Symbol$1
  : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$b = function (name) {
  if (!hasOwn$9(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn$9(Symbol$1, name)
      ? Symbol$1[name]
      : createWellKnownSymbol("Symbol." + name);
  }
  return WellKnownSymbolsStore[name];
};

var call$8 = functionCall;
var isObject$3 = isObject$7;
var isSymbol$1 = isSymbol$2;
var getMethod$2 = getMethod$3;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$a = wellKnownSymbol$b;

var $TypeError$4 = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$a("toPrimitive");

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$3(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$2(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = "default";
    result = call$8(exoticToPrim, input, pref);
    if (!isObject$3(result) || isSymbol$1(result)) return result;
    throw new $TypeError$4("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = "number";
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, "string");
  return isSymbol(key) ? key : key + "";
};

var DESCRIPTORS$8 = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$6 = anObject$7;
var toPropertyKey$2 = toPropertyKey$3;

var $TypeError$3 = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = "enumerable";
var CONFIGURABLE$1 = "configurable";
var WRITABLE = "writable";

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$8
  ? V8_PROTOTYPE_DEFINE_BUG$1
    ? function defineProperty(O, P, Attributes) {
      anObject$6(O);
      P = toPropertyKey$2(P);
      anObject$6(Attributes);
      if (
        typeof O === "function" && P === "prototype" && "value" in Attributes &&
        WRITABLE in Attributes && !Attributes[WRITABLE]
      ) {
        var current = $getOwnPropertyDescriptor$1(O, P);
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value;
          Attributes = {
            configurable: CONFIGURABLE$1 in Attributes
              ? Attributes[CONFIGURABLE$1]
              : current[CONFIGURABLE$1],
            enumerable: ENUMERABLE in Attributes
              ? Attributes[ENUMERABLE]
              : current[ENUMERABLE],
            writable: false,
          };
        }
      }
      return $defineProperty(O, P, Attributes);
    }
    : $defineProperty
  : function defineProperty(O, P, Attributes) {
    anObject$6(O);
    P = toPropertyKey$2(P);
    anObject$6(Attributes);
    if (IE8_DOM_DEFINE$1) {
      try {
        return $defineProperty(O, P, Attributes);
      } catch (error) { /* empty */ }
    }
    if ("get" in Attributes || "set" in Attributes) {
      throw new $TypeError$3("Accessors not supported");
    }
    if ("value" in Attributes) O[P] = Attributes.value;
    return O;
  };

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value,
  };
};

var DESCRIPTORS$7 = descriptors;
var definePropertyModule$2 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;

var createNonEnumerableProperty$5 = DESCRIPTORS$7
  ? function (object, key, value) {
    return definePropertyModule$2.f(
      object,
      key,
      createPropertyDescriptor$4(1, value),
    );
  }
  : function (object, key, value) {
    object[key] = value;
    return object;
  };

var shared$1 = sharedExports;
var uid = uid$2;

var keys = shared$1("keys");

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$3 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$5 = global$e;
var isObject$2 = isObject$7;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$8 = hasOwnProperty_1;
var shared = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$2 = hiddenKeys$3;

var OBJECT_ALREADY_INITIALIZED = "Object already initialized";
var TypeError$3 = global$5.TypeError;
var WeakMap = global$5.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$2(it) || (state = get(it)).type !== TYPE) {
      throw new TypeError$3("Incompatible receiver, " + TYPE + " required");
    }
    return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store$1 = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store$1.get = store$1.get;
  store$1.has = store$1.has;
  store$1.set = store$1.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store$1.has(it)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store$1.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store$1.get(it) || {};
  };
  has = function (it) {
    return store$1.has(it);
  };
} else {
  var STATE = sharedKey$2("state");
  hiddenKeys$2[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn$8(it, STATE)) throw new TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$8(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$8(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor,
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype$1 = Function.prototype;
var apply$1 = FunctionPrototype$1.apply;
var call$7 = FunctionPrototype$1.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == "object" && Reflect.apply ||
  (NATIVE_BIND$1 ? call$7.bind(apply$1) : function () {
    return call$7.apply(apply$1, arguments);
  });

var classofRaw$1 = classofRaw$2;
var uncurryThis$a = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw$1(fn) === "Function") return uncurryThis$a(fn);
};

var objectGetOwnPropertyDescriptor = {};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$2 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$2 &&
  !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG
  ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor$2(this, V);
    return !!descriptor && descriptor.enumerable;
  }
  : $propertyIsEnumerable;

var DESCRIPTORS$6 = descriptors;
var call$6 = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$3;
var hasOwn$7 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6
  ? $getOwnPropertyDescriptor
  : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject$4(O);
    P = toPropertyKey$1(P);
    if (IE8_DOM_DEFINE) {
      try {
        return $getOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ }
    }
    if (hasOwn$7(O, P)) {
      return createPropertyDescriptor$3(
        !call$6(propertyIsEnumerableModule$1.f, O, P),
        O[P],
      );
    }
  };

var fails$6 = fails$d;
var isCallable$7 = isCallable$e;

var replacement = /#|\.prototype\./;

var isForced$1 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value === POLYFILL
    ? true
    : value === NATIVE
    ? false
    : isCallable$7(detection)
    ? fails$6(detection)
    : !!detection;
};

var normalize = isForced$1.normalize = function (string) {
  return String(string).replace(replacement, ".").toLowerCase();
};

var data = isForced$1.data = {};
var NATIVE = isForced$1.NATIVE = "N";
var POLYFILL = isForced$1.POLYFILL = "P";

var isForced_1 = isForced$1;

var uncurryThis$9 = functionUncurryThisClause;
var aCallable$1 = aCallable$3;
var NATIVE_BIND = functionBindNative;

var bind$4 = uncurryThis$9(uncurryThis$9.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$1(fn);
  return that === undefined
    ? fn
    : NATIVE_BIND
    ? bind$4(fn, that)
    : function (/* ...args */) {
      return fn.apply(that, arguments);
    };
};

var global$4 = global$e;
var apply = functionApply;
var uncurryThis$8 = functionUncurryThisClause;
var isCallable$6 = isCallable$e;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var isForced = isForced_1;
var path$2 = path$4;
var bind$3 = functionBindContext;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var hasOwn$6 = hasOwnProperty_1;

var wrapConstructor = function (NativeConstructor) {
  var Wrapper = function (a, b, c) {
    if (this instanceof Wrapper) {
      switch (arguments.length) {
        case 0:
          return new NativeConstructor();
        case 1:
          return new NativeConstructor(a);
        case 2:
          return new NativeConstructor(a, b);
      }
      return new NativeConstructor(a, b, c);
    }
    return apply(NativeConstructor, this, arguments);
  };
  Wrapper.prototype = NativeConstructor.prototype;
  return Wrapper;
};

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var PROTO = options.proto;

  var nativeSource = GLOBAL
    ? global$4
    : STATIC
    ? global$4[TARGET]
    : (global$4[TARGET] || {}).prototype;

  var target = GLOBAL ? path$2 : path$2[TARGET] ||
    createNonEnumerableProperty$3(path$2, TARGET, {})[TARGET];
  var targetPrototype = target.prototype;

  var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
  var key,
    sourceProperty,
    targetProperty,
    nativeProperty,
    resultProperty,
    descriptor;

  for (key in source) {
    FORCED = isForced(
      GLOBAL ? key : TARGET + (STATIC ? "." : "#") + key,
      options.forced,
    );
    // contains in native
    USE_NATIVE = !FORCED && nativeSource && hasOwn$6(nativeSource, key);

    targetProperty = target[key];

    if (USE_NATIVE) {
      if (options.dontCallGetSet) {
        descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
        nativeProperty = descriptor && descriptor.value;
      } else nativeProperty = nativeSource[key];
    }

    // export native or implementation
    sourceProperty = (USE_NATIVE && nativeProperty)
      ? nativeProperty
      : source[key];

    if (USE_NATIVE && typeof targetProperty == typeof sourceProperty) continue;

    // bind methods to global for calling from export context
    if (options.bind && USE_NATIVE) {
      resultProperty = bind$3(sourceProperty, global$4);
    } // wrap global constructors for prevent changes in this version
    else if (options.wrap && USE_NATIVE) {
      resultProperty = wrapConstructor(sourceProperty);
    } // make static versions for prototype methods
    else if (PROTO && isCallable$6(sourceProperty)) {
      resultProperty = uncurryThis$8(sourceProperty);
    } // default case
    else resultProperty = sourceProperty;

    // add a flag to not completely full polyfills
    if (
      options.sham || (sourceProperty && sourceProperty.sham) ||
      (targetProperty && targetProperty.sham)
    ) {
      createNonEnumerableProperty$3(resultProperty, "sham", true);
    }

    createNonEnumerableProperty$3(target, key, resultProperty);

    if (PROTO) {
      VIRTUAL_PROTOTYPE = TARGET + "Prototype";
      if (!hasOwn$6(path$2, VIRTUAL_PROTOTYPE)) {
        createNonEnumerableProperty$3(path$2, VIRTUAL_PROTOTYPE, {});
      }
      // export virtual prototype methods
      createNonEnumerableProperty$3(
        path$2[VIRTUAL_PROTOTYPE],
        key,
        sourceProperty,
      );
      // export real prototype methods
      if (
        options.real && targetPrototype && (FORCED || !targetPrototype[key])
      ) {
        createNonEnumerableProperty$3(targetPrototype, key, sourceProperty);
      }
    }
  }
};

var DESCRIPTORS$5 = descriptors;
var hasOwn$5 = hasOwnProperty_1;

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$5 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$5(FunctionPrototype, "name");
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS &&
  (function something() {/* empty */}).name === "something";
var CONFIGURABLE = EXISTS &&
  (!DESCRIPTORS$5 ||
    (DESCRIPTORS$5 && getDescriptor(FunctionPrototype, "name").configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE,
};

var objectDefineProperties = {};

var ceil = Math.ceil;
var floor$3 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$3 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$3 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

var max$1 = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$2 = function (index, length) {
  var integer = toIntegerOrInfinity$2(index);
  return integer < 0 ? max$1(integer + length, 0) : min$1(integer, length);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$1 = function (argument) {
  return argument > 0
    ? min(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF)
    : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength = toLength$1;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$3 = function (obj) {
  return toLength(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex$1 = toAbsoluteIndex$2;
var lengthOfArrayLike$2 = lengthOfArrayLike$3;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$1 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$2(O);
    var index = toAbsoluteIndex$1(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el !== el) {
      while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare -- NaN check
        if (value !== value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      }
    } else {for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) {
          return IS_INCLUDES || index || 0;
        }
      }}
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$1(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$1(false),
};

var uncurryThis$7 = functionUncurryThis;
var hasOwn$4 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf = arrayIncludes.indexOf;
var hiddenKeys$1 = hiddenKeys$3;

var push$3 = uncurryThis$7([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    !hasOwn$4(hiddenKeys$1, key) && hasOwn$4(O, key) && push$3(result, key);
  }
  // Don't enum bug & hidden keys
  while (names.length > i) {
    if (hasOwn$4(O, key = names[i++])) {
      ~indexOf(result, key) || push$3(result, key);
    }
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$2 = [
  "constructor",
  "hasOwnProperty",
  "isPrototypeOf",
  "propertyIsEnumerable",
  "toLocaleString",
  "toString",
  "valueOf",
];

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$2;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$4 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$1 = objectDefineProperty;
var anObject$5 = anObject$7;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$4 && !V8_PROTOTYPE_DEFINE_BUG
  ? Object.defineProperties
  : function defineProperties(O, Properties) {
    anObject$5(O);
    var props = toIndexedObject$1(Properties);
    var keys = objectKeys$1(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) {
      definePropertyModule$1.f(O, key = keys[index++], props[key]);
    }
    return O;
  };

var getBuiltIn$2 = getBuiltIn$4;

var html$1 = getBuiltIn$2("document", "documentElement");

/* global ActiveXObject -- old IE, WSH */
var anObject$4 = anObject$7;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$2;
var hiddenKeys = hiddenKeys$3;
var html = html$1;
var documentCreateElement = documentCreateElement$1;
var sharedKey$1 = sharedKey$3;

var GT = ">";
var LT = "<";
var PROTOTYPE = "prototype";
var SCRIPT = "script";
var IE_PROTO$1 = sharedKey$1("IE_PROTO");

var EmptyConstructor = function () {/* empty */};

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + "/" + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(""));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement("iframe");
  var JS = "java" + SCRIPT + ":";
  var iframeDocument;
  iframe.style.display = "none";
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag("document.F=Object"));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject("htmlfile");
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != "undefined"
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$4(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined
    ? result
    : definePropertiesModule.f(result, Properties);
};

var fails$5 = fails$d;

var correctPrototypeGetter = !fails$5(function () {
  function F() {/* empty */}
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$3 = hasOwnProperty_1;
var isCallable$5 = isCallable$e;
var toObject$2 = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey("IE_PROTO");
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER
  ? $Object$1.getPrototypeOf
  : function (O) {
    var object = toObject$2(O);
    if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
    var constructor = object.constructor;
    if (isCallable$5(constructor) && object instanceof constructor) {
      return constructor.prototype;
    }
    return object instanceof $Object$1 ? ObjectPrototype : null;
  };

var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;

var defineBuiltIn$5 = function (target, key, value, options) {
  if (options && options.enumerable) target[key] = value;
  else createNonEnumerableProperty$2(target, key, value);
  return target;
};

var fails$4 = fails$d;
var isCallable$4 = isCallable$e;
var isObject$1 = isObject$7;
var create$2 = objectCreate;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$4 = defineBuiltIn$5;
var wellKnownSymbol$9 = wellKnownSymbol$b;

var ITERATOR$5 = wellKnownSymbol$9("iterator");
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$1, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!("next" in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(
      getPrototypeOf$1(arrayIterator),
    );
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) {
      IteratorPrototype$1 = PrototypeOfArrayIteratorPrototype;
    }
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$1(IteratorPrototype$1) ||
  fails$4(function () {
    var test = {};
    // FF44- legacy iterators case
    return IteratorPrototype$1[ITERATOR$5].call(test) !== test;
  });

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$1 = {};
else IteratorPrototype$1 = create$2(IteratorPrototype$1);

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$4(IteratorPrototype$1[ITERATOR$5])) {
  defineBuiltIn$4(IteratorPrototype$1, ITERATOR$5, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$1,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1,
};

var wellKnownSymbol$8 = wellKnownSymbol$b;

var TO_STRING_TAG$3 = wellKnownSymbol$8("toStringTag");
var test = {};

test[TO_STRING_TAG$3] = "z";

var toStringTagSupport = String(test) === "[object z]";

var TO_STRING_TAG_SUPPORT$2 = toStringTagSupport;
var isCallable$3 = isCallable$e;
var classofRaw = classofRaw$2;
var wellKnownSymbol$7 = wellKnownSymbol$b;

var TO_STRING_TAG$2 = wellKnownSymbol$7("toStringTag");
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) === "Arguments";

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$6 = TO_STRING_TAG_SUPPORT$2 ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? "Undefined" : it === null
    ? "Null"
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG$2)) == "string"
    ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS
    ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) === "Object" && isCallable$3(O.callee)
    ? "Arguments"
    : result;
};

var TO_STRING_TAG_SUPPORT$1 = toStringTagSupport;
var classof$5 = classof$6;

// `Object.prototype.toString` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.tostring
var objectToString = TO_STRING_TAG_SUPPORT$1
  ? {}.toString
  : function toString() {
    return "[object " + classof$5(this) + "]";
  };

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var defineProperty$2 = objectDefineProperty.f;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var hasOwn$2 = hasOwnProperty_1;
var toString$4 = objectToString;
var wellKnownSymbol$6 = wellKnownSymbol$b;

var TO_STRING_TAG$1 = wellKnownSymbol$6("toStringTag");

var setToStringTag$4 = function (it, TAG, STATIC, SET_METHOD) {
  if (it) {
    var target = STATIC ? it : it.prototype;
    if (!hasOwn$2(target, TO_STRING_TAG$1)) {
      defineProperty$2(target, TO_STRING_TAG$1, {
        configurable: true,
        value: TAG,
      });
    }
    if (SET_METHOD && !TO_STRING_TAG_SUPPORT) {
      createNonEnumerableProperty$1(target, "toString", toString$4);
    }
  }
};

var IteratorPrototype = iteratorsCore.IteratorPrototype;
var create$1 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$3 = setToStringTag$4;
var Iterators$5 = iterators;

var returnThis$1 = function () {
  return this;
};

var iteratorCreateConstructor = function (
  IteratorConstructor,
  NAME,
  next,
  ENUMERABLE_NEXT,
) {
  var TO_STRING_TAG = NAME + " Iterator";
  IteratorConstructor.prototype = create$1(IteratorPrototype, {
    next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next),
  });
  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators$5[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var $$3 = _export;
var call$5 = functionCall;
var FunctionName = functionName;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setToStringTag$2 = setToStringTag$4;
var defineBuiltIn$3 = defineBuiltIn$5;
var wellKnownSymbol$5 = wellKnownSymbol$b;
var Iterators$4 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
FunctionName.CONFIGURABLE;
IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$4 = wellKnownSymbol$5("iterator");
var KEYS = "keys";
var VALUES = "values";
var ENTRIES = "entries";

var returnThis = function () {
  return this;
};

var iteratorDefine = function (
  Iterable,
  NAME,
  IteratorConstructor,
  next,
  DEFAULT,
  IS_SET,
  FORCED,
) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) {
      return IterablePrototype[KIND];
    }

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };
      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };
      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + " Iterator";
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$4] ||
    IterablePrototype["@@iterator"] ||
    DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator ||
    getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME === "Array"
    ? IterablePrototype.entries || nativeIterator
    : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(
      anyNativeIterator.call(new Iterable()),
    );
    if (
      CurrentIteratorPrototype !== Object.prototype &&
      CurrentIteratorPrototype.next
    ) {
      // Set @@toStringTag to native iterators
      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      Iterators$4[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (
    PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator &&
    nativeIterator.name !== VALUES
  ) {
    {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() {
        return call$5(nativeIterator, this);
      };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES),
    };
    if (FORCED) {
      for (KEY in methods) {
        if (
          BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME ||
          !(KEY in IterablePrototype)
        ) {
          defineBuiltIn$3(IterablePrototype, KEY, methods[KEY]);
        }
      }
    } else {$$3({
        target: NAME,
        proto: true,
        forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME,
      }, methods);}
  }

  // define iterator
  if (FORCED && IterablePrototype[ITERATOR$4] !== defaultIterator) {
    defineBuiltIn$3(IterablePrototype, ITERATOR$4, defaultIterator, {
      name: DEFAULT,
    });
  }
  Iterators$4[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$3 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject = toIndexedObject$5;
var Iterators$3 = iterators;
var InternalStateModule$3 = internalState;
objectDefineProperty.f;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$2 = createIterResultObject$3;

var ARRAY_ITERATOR = "Array Iterator";
var setInternalState$3 = InternalStateModule$3.set;
var getInternalState$1 = InternalStateModule$3.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
defineIterator$1(Array, "Array", function (iterated, kind) {
  setInternalState$3(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0, // next index
    kind: kind, // kind
  });
  // `%ArrayIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$2(undefined, true);
  }
  switch (state.kind) {
    case "keys":
      return createIterResultObject$2(index, false);
    case "values":
      return createIterResultObject$2(target[index], false);
  }
  return createIterResultObject$2([index, target[index]], false);
}, "values");

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
Iterators$3.Arguments = Iterators$3.Array;

var fails$3 = fails$d;
var wellKnownSymbol$4 = wellKnownSymbol$b;
var DESCRIPTORS$3 = descriptors;
var IS_PURE = isPure;

var ITERATOR$3 = wellKnownSymbol$4("iterator");

var urlConstructorDetection = !fails$3(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL("b?a=1&b=2&c=3", "http://a");
  var params = url.searchParams;
  var params2 = new URLSearchParams("a=1&a=2&b=3");
  var result = "";
  url.pathname = "c%20d";
  params.forEach(function (value, key) {
    params["delete"]("b");
    result += key + value;
  });
  params2["delete"]("a", 2);
  // `undefined` case is a Chromium 117 bug
  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  params2["delete"]("b", undefined);
  return (IS_PURE &&
    (!url.toJSON || !params2.has("a", 1) || params2.has("a", 2) ||
      !params2.has("a", undefined) || params2.has("b"))) ||
    (!params.size && (IS_PURE || !DESCRIPTORS$3)) ||
    !params.sort ||
    url.href !== "http://a/c%20d?a=1&c=3" ||
    params.get("c") !== "3" ||
    String(new URLSearchParams("?a=1")) !== "a=1" ||
    !params[ITERATOR$3] ||
    // throws in Edge
    new URL("https://a@b").username !== "a" ||
    new URLSearchParams(new URLSearchParams("a=b")).get("a") !== "b" ||
    // not punycoded in Edge
    new URL("http://тест").host !== "xn--e1aybc" ||
    // not escaped in Chrome 62-
    new URL("http://a#б").hash !== "#%D0%B1" ||
    // fails in Chrome 66-
    result !== "a1c3" ||
    // throws in Safari
    new URL("http://x", undefined).host !== "x";
});

var defineProperty$1 = objectDefineProperty;

var defineBuiltInAccessor$2 = function (target, name, descriptor) {
  return defineProperty$1.f(target, name, descriptor);
};

var defineBuiltIn$2 = defineBuiltIn$5;

var defineBuiltIns$1 = function (target, src, options) {
  for (var key in src) {
    if (options && options.unsafe && target[key]) target[key] = src[key];
    else defineBuiltIn$2(target, key, src[key], options);
  }
  return target;
};

var isPrototypeOf = objectIsPrototypeOf;

var $TypeError$2 = TypeError;

var anInstance$2 = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw new $TypeError$2("Incorrect invocation");
};

var classof$4 = classof$6;

var $String = String;

var toString$3 = function (argument) {
  if (classof$4(argument) === "Symbol") {
    throw new TypeError("Cannot convert a Symbol value to a string");
  }
  return $String(argument);
};

var classof$3 = classof$6;
var getMethod$1 = getMethod$3;
var isNullOrUndefined = isNullOrUndefined$3;
var Iterators$2 = iterators;
var wellKnownSymbol$3 = wellKnownSymbol$b;

var ITERATOR$2 = wellKnownSymbol$3("iterator");

var getIteratorMethod$3 = function (it) {
  if (!isNullOrUndefined(it)) {
    return getMethod$1(it, ITERATOR$2) ||
      getMethod$1(it, "@@iterator") ||
      Iterators$2[classof$3(it)];
  }
};

var call$4 = functionCall;
var aCallable = aCallable$3;
var anObject$3 = anObject$7;
var tryToString = tryToString$2;
var getIteratorMethod$2 = getIteratorMethod$3;

var $TypeError$1 = TypeError;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2
    ? getIteratorMethod$2(argument)
    : usingIterator;
  if (aCallable(iteratorMethod)) {
    return anObject$3(call$4(iteratorMethod, argument));
  }
  throw new $TypeError$1(tryToString(argument) + " is not iterable");
};

var $TypeError = TypeError;

var validateArgumentsLength$3 = function (passed, required) {
  if (passed < required) throw new $TypeError("Not enough arguments");
  return passed;
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var createProperty$2 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) {
    definePropertyModule.f(
      object,
      propertyKey,
      createPropertyDescriptor$1(0, value),
    );
  } else object[propertyKey] = value;
};

var toAbsoluteIndex = toAbsoluteIndex$2;
var lengthOfArrayLike$1 = lengthOfArrayLike$3;
var createProperty$1 = createProperty$2;

var $Array$1 = Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$1(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array$1(max(fin - k, 0));
  var n = 0;
  for (; k < fin; k++, n++) createProperty$1(result, n, O[k]);
  result.length = n;
  return result;
};

var arraySlice$1 = arraySliceSimple;

var floor$2 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$2(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice$1(array, 0, middle), comparefn),
    mergeSort(arraySlice$1(array, middle), comparefn),
    comparefn,
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  }
  return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0
        ? left[lindex++]
        : right[rindex++]
      : lindex < llength
      ? left[lindex++]
      : right[rindex++];
  }
  return array;
};

var arraySort$1 = mergeSort;

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$2 = _export;
var global$3 = global$e;
var call$3 = functionCall;
var uncurryThis$6 = functionUncurryThis;
var DESCRIPTORS$2 = descriptors;
var USE_NATIVE_URL$2 = urlConstructorDetection;
var defineBuiltIn$1 = defineBuiltIn$5;
var defineBuiltInAccessor$1 = defineBuiltInAccessor$2;
var defineBuiltIns = defineBuiltIns$1;
var setToStringTag$1 = setToStringTag$4;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$2 = internalState;
var anInstance$1 = anInstance$2;
var isCallable$2 = isCallable$e;
var hasOwn$1 = hasOwnProperty_1;
var bind$2 = functionBindContext;
var classof$2 = classof$6;
var anObject$2 = anObject$7;
var isObject = isObject$7;
var $toString$1 = toString$3;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var getIterator$1 = getIterator$2;
var getIteratorMethod$1 = getIteratorMethod$3;
var createIterResultObject$1 = createIterResultObject$3;
var validateArgumentsLength$2 = validateArgumentsLength$3;
var wellKnownSymbol$2 = wellKnownSymbol$b;
var arraySort = arraySort$1;

var ITERATOR$1 = wellKnownSymbol$2("iterator");
var URL_SEARCH_PARAMS = "URLSearchParams";
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + "Iterator";
var setInternalState$2 = InternalStateModule$2.set;
var getInternalParamsState = InternalStateModule$2.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$2.getterFor(
  URL_SEARCH_PARAMS_ITERATOR,
);
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn = function (name) {
  if (!DESCRIPTORS$2) return global$3[name];
  var descriptor = getOwnPropertyDescriptor(global$3, name);
  return descriptor && descriptor.value;
};

var nativeFetch = safeGetBuiltIn("fetch");
var NativeRequest = safeGetBuiltIn("Request");
var Headers$1 = safeGetBuiltIn("Headers");
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers$1 && Headers$1.prototype;
var RegExp = global$3.RegExp;
var TypeError$2 = global$3.TypeError;
var decodeURIComponent = global$3.decodeURIComponent;
var encodeURIComponent$1 = global$3.encodeURIComponent;
var charAt$3 = uncurryThis$6("".charAt);
var join$2 = uncurryThis$6([].join);
var push$2 = uncurryThis$6([].push);
var replace$2 = uncurryThis$6("".replace);
var shift$1 = uncurryThis$6([].shift);
var splice = uncurryThis$6([].splice);
var split$2 = uncurryThis$6("".split);
var stringSlice$2 = uncurryThis$6("".slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] ||
    (sequences[bytes - 1] = RegExp("((?:%[\\da-f]{2}){" + bytes + "})", "gi"));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace$2(it, plus, " ");
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$2(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "~": "%7E",
  "%20": "+",
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace$2(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(
  function Iterator(params, kind) {
    setInternalState$2(this, {
      type: URL_SEARCH_PARAMS_ITERATOR,
      target: getInternalParamsState(params).entries,
      index: 0,
      kind: kind,
    });
  },
  URL_SEARCH_PARAMS,
  function next() {
    var state = getInternalIteratorState(this);
    var target = state.target;
    var index = state.index++;
    if (!target || index >= target.length) {
      state.target = undefined;
      return createIterResultObject$1(undefined, true);
    }
    var entry = target[index];
    switch (state.kind) {
      case "keys":
        return createIterResultObject$1(entry.key, false);
      case "values":
        return createIterResultObject$1(entry.value, false);
    }
    return createIterResultObject$1([entry.key, entry.value], false);
  },
  true,
);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else {this.parseQuery(
        typeof init == "string"
          ? charAt$3(init, 0) === "?" ? stringSlice$2(init, 1) : init
          : $toString$1(init),
      );}
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var entries = this.entries;
    var iteratorMethod = getIteratorMethod$1(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator$1(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$3(next, iterator)).done) {
        entryIterator = getIterator$1(anObject$2(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$3(entryNext, entryIterator)).done ||
          (second = call$3(entryNext, entryIterator)).done ||
          !call$3(entryNext, entryIterator).done
        ) throw new TypeError$2("Expected sequence with length 2");
        push$2(entries, {
          key: $toString$1(first.value),
          value: $toString$1(second.value),
        });
      }
    } else {for (var key in object) {
        if (hasOwn$1(object, key)) {
          push$2(entries, { key: key, value: $toString$1(object[key]) });
        }
      }}
  },
  parseQuery: function (query) {
    if (query) {
      var entries = this.entries;
      var attributes = split$2(query, "&");
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split$2(attribute, "=");
          push$2(entries, {
            key: deserialize(shift$1(entry)),
            value: deserialize(join$2(entry, "=")),
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push$2(result, serialize(entry.key) + "=" + serialize(entry.value));
    }
    return join$2(result, "&");
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  },
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance$1(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  var state = setInternalState$2(this, new URLSearchParamsState(init));
  if (!DESCRIPTORS$2) this.size = state.entries.length;
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$2(arguments.length, 2);
    push$2(state.entries, {
      key: $toString$1(name),
      value: $toString$1(value),
    });
    if (!DESCRIPTORS$2) this.length++;
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  "delete": function (name /* , value */) {
    var state = getInternalParamsState(this);
    var length = validateArgumentsLength$2(arguments.length, 1);
    var entries = state.entries;
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        splice(entries, index, 1);
        if (value !== undefined) break;
      } else index++;
    }
    if (!DESCRIPTORS$2) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$2(arguments.length, 1);
    var key = $toString$1(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    var entries = getInternalParamsState(this).entries;
    validateArgumentsLength$2(arguments.length, 1);
    var key = $toString$1(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push$2(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name /* , value */) {
    var entries = getInternalParamsState(this).entries;
    var length = validateArgumentsLength$2(arguments.length, 1);
    var key = $toString$1(name);
    var $value = length < 2 ? undefined : arguments[1];
    var value = $value === undefined ? $value : $toString$1($value);
    var index = 0;
    while (index < entries.length) {
      var entry = entries[index++];
      if (entry.key === key && (value === undefined || entry.value === value)) {
        return true;
      }
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    var state = getInternalParamsState(this);
    validateArgumentsLength$2(arguments.length, 1);
    var entries = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push$2(entries, { key: key, value: val });
    if (!DESCRIPTORS$2) this.size = entries.length;
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind$2(
      callback,
      arguments.length > 1 ? arguments[1] : undefined,
    );
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, "keys");
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, "values");
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, "entries");
  },
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn$1(
  URLSearchParamsPrototype,
  ITERATOR$1,
  URLSearchParamsPrototype.entries,
  { name: "entries" },
);

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn$1(URLSearchParamsPrototype, "toString", function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

// `URLSearchParams.prototype.size` getter
// https://github.com/whatwg/url/pull/734
if (DESCRIPTORS$2) {
  defineBuiltInAccessor$1(URLSearchParamsPrototype, "size", {
    get: function size() {
      return getInternalParamsState(this).entries.length;
    },
    configurable: true,
    enumerable: true,
  });
}

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$2({ global: true, constructor: true, forced: !USE_NATIVE_URL$2 }, {
  URLSearchParams: URLSearchParamsConstructor,
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$2 && isCallable$2(Headers$1)) {
  var headersHas = uncurryThis$6(HeadersPrototype.has);
  var headersSet = uncurryThis$6(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof$2(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers$1(init.headers) : new Headers$1();
        if (!headersHas(headers, "content-type")) {
          headersSet(
            headers,
            "content-type",
            "application/x-www-form-urlencoded;charset=UTF-8",
          );
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers),
        });
      }
    }
    return init;
  };

  if (isCallable$2(nativeFetch)) {
    $$2(
      { global: true, enumerable: true, dontCallGetSet: true, forced: true },
      {
        fetch: function fetch(input /* , init */) {
          return nativeFetch(
            input,
            arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {},
          );
        },
      },
    );
  }

  if (isCallable$2(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$1(this, RequestPrototype);
      return new NativeRequest(
        input,
        arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {},
      );
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$2(
      { global: true, constructor: true, dontCallGetSet: true, forced: true },
      {
        Request: RequestConstructor,
      },
    );
  }
}

var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState,
};

var path$1 = path$4;

var urlSearchParams$2 = path$1.URLSearchParams;

var uncurryThis$5 = functionUncurryThis;
var toIntegerOrInfinity = toIntegerOrInfinity$3;
var toString$2 = toString$3;
var requireObjectCoercible = requireObjectCoercible$3;

var charAt$2 = uncurryThis$5("".charAt);
var charCodeAt$1 = uncurryThis$5("".charCodeAt);
var stringSlice$1 = uncurryThis$5("".slice);

var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$2(requireObjectCoercible($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) {
      return CONVERT_TO_STRING ? "" : undefined;
    }
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size ||
        (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
      ? CONVERT_TO_STRING ? charAt$2(S, position) : first
      : CONVERT_TO_STRING
      ? stringSlice$1(S, position, position + 2)
      : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true),
};

var charAt$1 = stringMultibyte.charAt;
var toString$1 = toString$3;
var InternalStateModule$1 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$3;

var STRING_ITERATOR = "String Iterator";
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState = InternalStateModule$1.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, "String", function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: toString$1(iterated),
    index: 0,
  });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt$1(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var DESCRIPTORS$1 = descriptors;
var uncurryThis$4 = functionUncurryThis;
var call$2 = functionCall;
var fails$2 = fails$d;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$1 = toObject$4;
var IndexedObject = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty = Object.defineProperty;
var concat = uncurryThis$4([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$2(function () {
    // should have correct order of operations (Edge bug)
    if (
      DESCRIPTORS$1 && $assign(
          { b: 1 },
          $assign(
            defineProperty({}, "a", {
              enumerable: true,
              get: function () {
                defineProperty(this, "b", {
                  value: 3,
                  enumerable: false,
                });
              },
            }),
            { b: 2 },
          ),
        ).b !== 1
    ) return true;
    // should work with symbols and should have deterministic property order (V8 bug)
    var A = {};
    var B = {};
    // eslint-disable-next-line es/no-symbol -- safe
    var symbol = Symbol("assign detection");
    var alphabet = "abcdefghijklmnopqrst";
    A[symbol] = 7;
    alphabet.split("").forEach(function (chr) {
      B[chr] = chr;
    });
    return $assign({}, A)[symbol] !== 7 ||
      objectKeys($assign({}, B)).join("") !== alphabet;
  })
  ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
    var T = toObject$1(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
    var propertyIsEnumerable = propertyIsEnumerableModule.f;
    while (argumentsLength > index) {
      var S = IndexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols
        ? concat(objectKeys(S), getOwnPropertySymbols(S))
        : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;
      while (length > j) {
        key = keys[j++];
        if (!DESCRIPTORS$1 || call$2(propertyIsEnumerable, S, key)) {T[key] =
            S[key];}
      }
    }
    return T;
  }
  : $assign;

var call$1 = functionCall;
var anObject$1 = anObject$7;
var getMethod = getMethod$3;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$1(iterator);
  try {
    innerResult = getMethod(iterator, "return");
    if (!innerResult) {
      if (kind === "throw") throw value;
      return value;
    }
    innerResult = call$1(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === "throw") throw value;
  if (innerError) throw innerResult;
  anObject$1(innerResult);
  return value;
};

var anObject = anObject$7;
var iteratorClose = iteratorClose$1;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, "throw", error);
  }
};

var wellKnownSymbol$1 = wellKnownSymbol$b;
var Iterators$1 = iterators;

var ITERATOR = wellKnownSymbol$1("iterator");
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined &&
    (Iterators$1.Array === it || ArrayPrototype[ITERATOR] === it);
};

var uncurryThis$3 = functionUncurryThis;
var isCallable$1 = isCallable$e;
var store = sharedStore;

var functionToString = uncurryThis$3(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$1(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$1 = store.inspectSource;

var uncurryThis$2 = functionUncurryThis;
var fails$1 = fails$d;
var isCallable = isCallable$e;
var classof$1 = classof$6;
var getBuiltIn$1 = getBuiltIn$4;
var inspectSource = inspectSource$1;

var noop = function () {/* empty */};
var empty = [];
var construct = getBuiltIn$1("Reflect", "construct");
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$2 = uncurryThis$2(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable(argument)) return false;
  switch (classof$1(argument)) {
    case "AsyncFunction":
    case "GeneratorFunction":
    case "AsyncGeneratorFunction":
      return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING ||
      !!exec$2(constructorRegExp, inspectSource(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$1(function () {
    var called;
    return isConstructorModern(isConstructorModern.call) ||
      !isConstructorModern(Object) ||
      !isConstructorModern(function () {
        called = true;
      }) ||
      called;
  })
  ? isConstructorLegacy
  : isConstructorModern;

var bind$1 = functionBindContext;
var call = functionCall;
var toObject = toObject$4;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var isConstructor = isConstructor$1;
var lengthOfArrayLike = lengthOfArrayLike$3;
var createProperty = createProperty$2;
var getIterator = getIterator$2;
var getIteratorMethod = getIteratorMethod$3;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(
  arrayLike, /* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) {
    mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  }
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (
    iteratorMethod &&
    !(this === $Array && isArrayIteratorMethod(iteratorMethod))
  ) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (; !(step = call(next, iterator)).done; index++) {
      value = mapping
        ? callWithSafeIterationClosing(
          iterator,
          mapfn,
          [step.value, index],
          true,
        )
        : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (; length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis$1 = functionUncurryThis;

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = "-"; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = "Overflow: input needs wider integers to process";
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec$1 = uncurryThis$1(regexSeparators.exec);
var floor$1 = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis$1("".charCodeAt);
var join$1 = uncurryThis$1([].join);
var push$1 = uncurryThis$1([].push);
var replace$1 = uncurryThis$1("".replace);
var split$1 = uncurryThis$1("".split);
var toLowerCase$1 = uncurryThis$1("".toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
        push$1(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push$1(output, value);
        counter--;
      }
    } else {
      push$1(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$1(delta / baseMinusTMin);
    k += base;
  }
  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push$1(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push$1(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw new $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw new $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue === n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$1(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
          k += base;
        }

        push$1(output, fromCharCode(digitToBasic(q)));
        bias = adapt(
          delta,
          handledCPCountPlusOne,
          handledCPCount === basicLength,
        );
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join$1(output, "");
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = split$1(
    replace$1(toLowerCase$1(input), regexSeparators, "\u002E"),
    ".",
  );
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$1(
      encoded,
      exec$1(regexNonASCII, label) ? "xn--" + encode(label) : label,
    );
  }
  return join$1(encoded, ".");
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$1 = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var global$2 = global$e;
var bind = functionBindContext;
var uncurryThis = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$5;
var defineBuiltInAccessor = defineBuiltInAccessor$2;
var anInstance = anInstance$2;
var hasOwn = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySliceSimple;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$3;
var setToStringTag = setToStringTag$4;
var validateArgumentsLength$1 = validateArgumentsLength$3;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor("URL");
var URLSearchParams$2 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global$2.URL;
var TypeError$1 = global$2.TypeError;
var parseInt = global$2.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis("".charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis("".replace);
var shift = uncurryThis([].shift);
var split = uncurryThis("".split);
var stringSlice = uncurryThis("".slice);
var toLowerCase = uncurryThis("".toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = "Invalid authority";
var INVALID_SCHEME = "Invalid scheme";
var INVALID_HOST = "Invalid host";
var INVALID_PORT = "Invalid port";

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, ".");
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] === "") {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part === "") return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) === "0") {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix === 8 ? 1 : 2);
    }
    if (part === "") {
      number = 0;
    } else {
      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) {
        return input;
      }
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index === partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() === ":") {
    if (charAt(input, 1) !== ":") return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex === 8) return;
    if (chr() === ":") {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() === ".") {
      if (length === 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() === "." && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece === 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
      }
      if (numbersSeen !== 4) return;
      break;
    } else if (chr() === ":") {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex !== 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == "number") {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    }
    return join(result, ".");
    // ipv6
  } else if (typeof host == "object") {
    result = "";
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ":" : "::";
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ":";
      }
    }
    return "[" + result + "]";
  }
  return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  " ": 1,
  '"': 1,
  "<": 1,
  ">": 1,
  "`": 1,
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  "#": 1,
  "?": 1,
  "{": 1,
  "}": 1,
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  "/": 1,
  ":": 1,
  ";": 1,
  "=": 1,
  "@": 1,
  "[": 1,
  "\\": 1,
  "]": 1,
  "^": 1,
  "|": 1,
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr)
    ? chr
    : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length === 2 && exec(ALPHA, charAt(string, 0)) &&
    ((second = charAt(string, 1)) === ":" || (!normalized && second === "|"));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) &&
    (
      string.length === 2 ||
      ((third = charAt(string, 2)) === "/" || third === "\\" || third === "?" ||
        third === "#")
    );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === "." || toLowerCase(segment) === "%2e";
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === ".." || segment === "%2e." || segment === ".%2e" ||
    segment === "%2e%2e";
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw new TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw new TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$2());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: "URL",
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = "";
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = "";
      url.username = "";
      url.password = "";
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, "");
      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, "$1");
    }

    input = replace(input, TAB_AND_NEW_LINE, "");

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (
            chr &&
            (exec(ALPHANUMERIC, chr) || chr === "+" || chr === "-" ||
              chr === ".")
          ) {
            buffer += toLowerCase(chr);
          } else if (chr === ":") {
            if (
              stateOverride && (
                (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
                (buffer === "file" &&
                  (url.includesCredentials() || url.port !== null)) ||
                (url.scheme === "file" && !url.host)
              )
            ) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) {
                url.port = null;
              }
              return;
            }
            buffer = "";
            if (url.scheme === "file") {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] === "/") {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, "");
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = "";
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr !== "#")) {
            return INVALID_SCHEME;
          }
          if (base.cannotBeABaseURL && chr === "#") {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = "";
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme === "file" ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr === "/" && codePoints[pointer + 1] === "/") {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          }
          break;

        case PATH_OR_AUTHORITY:
          if (chr === "/") {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr === EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr === "/" || (chr === "\\" && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr === "?") {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = "";
            state = QUERY;
          } else if (chr === "#") {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = "";
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          }
          break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr === "/" || chr === "\\")) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr === "/") {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          }
          break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr !== "/" || charAt(buffer, pointer + 1) !== "/") continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr !== "/" && chr !== "\\") {
            state = AUTHORITY;
            continue;
          }
          break;

        case AUTHORITY:
          if (chr === "@") {
            if (seenAt) buffer = "%40" + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint === ":" && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(
                codePoint,
                userinfoPercentEncodeSet,
              );
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = "";
          } else if (
            chr === EOF || chr === "/" || chr === "?" || chr === "#" ||
            (chr === "\\" && url.isSpecial())
          ) {
            if (seenAt && buffer === "") return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = "";
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme === "file") {
            state = FILE_HOST;
            continue;
          } else if (chr === ":" && !seenBracket) {
            if (buffer === "") return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = "";
            state = PORT;
            if (stateOverride === HOSTNAME) return;
          } else if (
            chr === EOF || chr === "/" || chr === "?" || chr === "#" ||
            (chr === "\\" && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer === "") return INVALID_HOST;
            if (
              stateOverride && buffer === "" &&
              (url.includesCredentials() || url.port !== null)
            ) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = "";
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr === "[") seenBracket = true;
            else if (chr === "]") seenBracket = false;
            buffer += chr;
          }
          break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr === EOF || chr === "/" || chr === "?" || chr === "#" ||
            (chr === "\\" && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer !== "") {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port =
                (url.isSpecial() && port === specialSchemes[url.scheme])
                  ? null
                  : port;
              buffer = "";
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = "file";
          if (chr === "/" || chr === "\\") state = FILE_SLASH;
          else if (base && base.scheme === "file") {
            switch (chr) {
              case EOF:
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                break;
              case "?":
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = "";
                state = QUERY;
                break;
              case "#":
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.query = base.query;
                url.fragment = "";
                state = FRAGMENT;
                break;
              default:
                if (
                  !startsWithWindowsDriveLetter(
                    join(arraySlice(codePoints, pointer), ""),
                  )
                ) {
                  url.host = base.host;
                  url.path = arraySlice(base.path);
                  url.shortenPath();
                }
                state = PATH;
                continue;
            }
          } else {
            state = PATH;
            continue;
          }
          break;

        case FILE_SLASH:
          if (chr === "/" || chr === "\\") {
            state = FILE_HOST;
            break;
          }
          if (
            base && base.scheme === "file" &&
            !startsWithWindowsDriveLetter(
              join(arraySlice(codePoints, pointer), ""),
            )
          ) {
            if (isWindowsDriveLetter(base.path[0], true)) {
              push(url.path, base.path[0]);
            } else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (
            chr === EOF || chr === "/" || chr === "\\" || chr === "?" ||
            chr === "#"
          ) {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer === "") {
              url.host = "";
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host === "localhost") url.host = "";
              if (stateOverride) return;
              buffer = "";
              state = PATH_START;
            }
            continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr !== "/" && chr !== "\\") continue;
          } else if (!stateOverride && chr === "?") {
            url.query = "";
            state = QUERY;
          } else if (!stateOverride && chr === "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr !== EOF) {
            state = PATH;
            if (chr !== "/") continue;
          }
          break;

        case PATH:
          if (
            chr === EOF || chr === "/" ||
            (chr === "\\" && url.isSpecial()) ||
            (!stateOverride && (chr === "?" || chr === "#"))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr !== "/" && !(chr === "\\" && url.isSpecial())) {
                push(url.path, "");
              }
            } else if (isSingleDot(buffer)) {
              if (chr !== "/" && !(chr === "\\" && url.isSpecial())) {
                push(url.path, "");
              }
            } else {
              if (
                url.scheme === "file" && !url.path.length &&
                isWindowsDriveLetter(buffer)
              ) {
                if (url.host) url.host = "";
                buffer = charAt(buffer, 0) + ":"; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = "";
            if (
              url.scheme === "file" &&
              (chr === EOF || chr === "?" || chr === "#")
            ) {
              while (url.path.length > 1 && url.path[0] === "") {
                shift(url.path);
              }
            }
            if (chr === "?") {
              url.query = "";
              state = QUERY;
            } else if (chr === "#") {
              url.fragment = "";
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          }
          break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr === "?") {
            url.query = "";
            state = QUERY;
          } else if (chr === "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr !== EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          }
          break;

        case QUERY:
          if (!stateOverride && chr === "#") {
            url.fragment = "";
            state = FRAGMENT;
          } else if (chr !== EOF) {
            if (chr === "'" && url.isSpecial()) url.query += "%27";
            else if (chr === "#") url.query += "%23";
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          }
          break;

        case FRAGMENT:
          if (chr !== EOF) {
            url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          }
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) === "[") {
      if (charAt(input, input.length - 1) !== "]") return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
      // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) {
        return INVALID_HOST;
      }
      result = "";
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme === "file";
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username !== "" || this.password !== "";
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (
      pathSize &&
      (this.scheme !== "file" || pathSize !== 1 ||
        !isWindowsDriveLetter(path[0], true))
    ) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ":";
    if (host !== null) {
      output += "//";
      if (url.includesCredentials()) {
        output += username + (password ? ":" + password : "") + "@";
      }
      output += serializeHost(host);
      if (port !== null) output += ":" + port;
    } else if (scheme === "file") output += "//";
    output += url.cannotBeABaseURL
      ? path[0]
      : path.length
      ? "/" + join(path, "/")
      : "";
    if (query !== null) output += "?" + query;
    if (fragment !== null) output += "#" + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw new TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme === "blob") {
      try {
        return new URLConstructor(scheme.path[0]).origin;
      } catch (error) {
        return "null";
      }
    }
    if (scheme === "file" || !this.isSpecial()) return "null";
    return scheme + "://" + serializeHost(this.host) +
      (port !== null ? ":" + port : "");
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ":";
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ":", SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = "";
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = "";
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null
      ? ""
      : port === null
      ? serializeHost(host)
      : serializeHost(host) + ":" + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? "" : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? "" : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port === "") this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL
      ? path[0]
      : path.length
      ? "/" + join(path, "/")
      : "";
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? "?" + query : "";
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search === "") {
      this.query = null;
    } else {
      if (charAt(search, 0) === "?") search = stringSlice(search, 1);
      this.query = "";
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? "#" + fragment : "";
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash === "") {
      this.fragment = null;
      return;
    }
    if (charAt(hash, 0) === "#") hash = stringSlice(hash, 1);
    this.fragment = "";
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  },
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength$1(arguments.length, 1) > 1
    ? arguments[1]
    : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true,
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(
    URLPrototype,
    "href",
    accessorDescriptor("serialize", "setHref"),
  );
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(
    URLPrototype,
    "origin",
    accessorDescriptor("getOrigin"),
  );
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(
    URLPrototype,
    "protocol",
    accessorDescriptor("getProtocol", "setProtocol"),
  );
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(
    URLPrototype,
    "username",
    accessorDescriptor("getUsername", "setUsername"),
  );
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(
    URLPrototype,
    "password",
    accessorDescriptor("getPassword", "setPassword"),
  );
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(
    URLPrototype,
    "host",
    accessorDescriptor("getHost", "setHost"),
  );
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(
    URLPrototype,
    "hostname",
    accessorDescriptor("getHostname", "setHostname"),
  );
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(
    URLPrototype,
    "port",
    accessorDescriptor("getPort", "setPort"),
  );
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(
    URLPrototype,
    "pathname",
    accessorDescriptor("getPathname", "setPathname"),
  );
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(
    URLPrototype,
    "search",
    accessorDescriptor("getSearch", "setSearch"),
  );
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(
    URLPrototype,
    "searchParams",
    accessorDescriptor("getSearchParams"),
  );
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(
    URLPrototype,
    "hash",
    accessorDescriptor("getHash", "setHash"),
  );
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, "toJSON", function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, "toString", function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) {
    defineBuiltIn(
      URLConstructor,
      "createObjectURL",
      bind(nativeCreateObjectURL, NativeURL),
    );
  }
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) {
    defineBuiltIn(
      URLConstructor,
      "revokeObjectURL",
      bind(nativeRevokeObjectURL, NativeURL),
    );
  }
}

setToStringTag(URLConstructor, "URL");

$$1({
  global: true,
  constructor: true,
  forced: !USE_NATIVE_URL$1,
  sham: !DESCRIPTORS,
}, {
  URL: URLConstructor,
});

var $ = _export;
var getBuiltIn = getBuiltIn$4;
var fails = fails$d;
var validateArgumentsLength = validateArgumentsLength$3;
var toString = toString$3;
var USE_NATIVE_URL = urlConstructorDetection;

var URL$1 = getBuiltIn("URL");

// https://github.com/nodejs/node/issues/47505
// https://github.com/denoland/deno/issues/18893
var THROWS_WITHOUT_ARGUMENTS = USE_NATIVE_URL && fails(function () {
  URL$1.canParse();
});

// `URL.canParse` method
// https://url.spec.whatwg.org/#dom-url-canparse
$({ target: "URL", stat: true, forced: !THROWS_WITHOUT_ARGUMENTS }, {
  canParse: function canParse(url) {
    var length = validateArgumentsLength(arguments.length, 1);
    var urlString = toString(url);
    var base = length < 2 || arguments[1] === undefined
      ? undefined
      : toString(arguments[1]);
    try {
      return !!new URL$1(urlString, base);
    } catch (error) {
      return false;
    }
  },
});

var path = path$4;

var url$2 = path.URL;

var parent$3 = url$2;

var url$1 = parent$3;

var parent$2 = url$1;

var url = parent$2;

var index = /*@__PURE__*/ getDefaultExportFromCjs(url);

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0,
};

var DOMIterables = domIterables;
var global$1 = global$e;
var classof = classof$6;
var createNonEnumerableProperty = createNonEnumerableProperty$5;
var Iterators = iterators;
var wellKnownSymbol = wellKnownSymbol$b;

var TO_STRING_TAG = wellKnownSymbol("toStringTag");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global$1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype && classof(CollectionPrototype) !== TO_STRING_TAG) {
    createNonEnumerableProperty(
      CollectionPrototype,
      TO_STRING_TAG,
      COLLECTION_NAME,
    );
  }
  Iterators[COLLECTION_NAME] = Iterators.Array;
}

var parent$1 = urlSearchParams$2;

var urlSearchParams$1 = parent$1;

var parent = urlSearchParams$1;

var urlSearchParams = parent;

var URLSearchParams$1 = /*@__PURE__*/ getDefaultExportFromCjs(urlSearchParams);

class Emitter {
  constructor() {
    Object.defineProperty(this, "listeners", {
      value: {},
      writable: true,
      configurable: true,
    });
  }
  addEventListener(type, callback, options) {
    if (!(type in this.listeners)) {
      this.listeners[type] = [];
    }
    this.listeners[type].push({ callback, options });
  }
  removeEventListener(type, callback) {
    if (!(type in this.listeners)) {
      return;
    }
    const stack = this.listeners[type];
    for (let i = 0, l = stack.length; i < l; i++) {
      if (stack[i].callback === callback) {
        stack.splice(i, 1);
        return;
      }
    }
  }
  dispatchEvent(event) {
    if (!(event.type in this.listeners)) {
      return;
    }
    const stack = this.listeners[event.type];
    const stackToCall = stack.slice();
    for (let i = 0, l = stackToCall.length; i < l; i++) {
      const listener = stackToCall[i];
      try {
        listener.callback.call(this, event);
      } catch (e) {
        Promise.resolve().then(() => {
          throw e;
        });
      }
      if (listener.options && listener.options.once) {
        this.removeEventListener(event.type, listener.callback);
      }
    }
    return !event.defaultPrevented;
  }
}

class AbortSignal extends Emitter {
  constructor() {
    super();
    // Some versions of babel does not transpile super() correctly for IE <= 10, if the parent
    // constructor has failed to run, then "this.listeners" will still be undefined and then we call
    // the parent constructor directly instead as a workaround. For general details, see babel bug:
    // https://github.com/babel/babel/issues/3041
    // This hack was added as a fix for the issue described here:
    // https://github.com/Financial-Times/polyfill-library/pull/59#issuecomment-477558042
    if (!this.listeners) {
      Emitter.call(this);
    }

    // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
    // we want Object.keys(new AbortController().signal) to be [] for compat with the native impl
    Object.defineProperty(this, "aborted", {
      value: false,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(this, "onabort", {
      value: null,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(this, "reason", {
      value: undefined,
      writable: true,
      configurable: true,
    });
  }
  toString() {
    return "[object AbortSignal]";
  }
  dispatchEvent(event) {
    if (event.type === "abort") {
      this.aborted = true;
      if (typeof this.onabort === "function") {
        this.onabort.call(this, event);
      }
    }

    super.dispatchEvent(event);
  }
}

class AbortController {
  constructor() {
    // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
    // we want Object.keys(new AbortController()) to be [] for compat with the native impl
    Object.defineProperty(this, "signal", {
      value: new AbortSignal(),
      writable: true,
      configurable: true,
    });
  }
  abort(reason) {
    let event;
    try {
      event = new Event("abort");
    } catch (e) {
      if (typeof document !== "undefined") {
        if (!document.createEvent) {
          // For Internet Explorer 8:
          event = document.createEventObject();
          event.type = "abort";
        } else {
          // For Internet Explorer 11:
          event = document.createEvent("Event");
          event.initEvent("abort", false, false);
        }
      } else {
        // Fallback where document isn't available:
        event = {
          type: "abort",
          bubbles: false,
          cancelable: false,
        };
      }
    }

    let signalReason = reason;
    if (signalReason === undefined) {
      if (typeof document === "undefined") {
        signalReason = new Error("This operation was aborted");
        signalReason.name = "AbortError";
      } else {
        try {
          signalReason = new DOMException("signal is aborted without reason");
        } catch (err) {
          // IE 11 does not support calling the DOMException constructor, use a
          // regular error object on it instead.
          signalReason = new Error("This operation was aborted");
          signalReason.name = "AbortError";
        }
      }
    }
    this.signal.reason = signalReason;

    this.signal.dispatchEvent(event);
  }
  toString() {
    return "[object AbortController]";
  }
}

if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
  // These are necessary to make sure that we get correct output for:
  // Object.prototype.toString.call(new AbortController())
  AbortController.prototype[Symbol.toStringTag] = "AbortController";
  AbortSignal.prototype[Symbol.toStringTag] = "AbortSignal";
}

function B(r, e) {
  var f;
  return r instanceof Buffer
    ? f = r
    : f = Buffer.from(r.buffer, r.byteOffset, r.byteLength),
    f.toString(e);
}
var w = function (r) {
  return Buffer.from(r);
};
function h(r) {
  for (
    var e = 0,
      f = Math.min(256 * 256, r.length + 1),
      n = new Uint16Array(f),
      i = [],
      o = 0;;
  ) {
    var t = e < r.length;
    if (!t || o >= f - 1) {
      var s = n.subarray(0, o), m = s;
      if (i.push(String.fromCharCode.apply(null, m)), !t) return i.join("");
      r = r.subarray(e), e = 0, o = 0;
    }
    var a = r[e++];
    if ((a & 128) === 0) n[o++] = a;
    else if ((a & 224) === 192) {
      var d = r[e++] & 63;
      n[o++] = (a & 31) << 6 | d;
    } else if ((a & 240) === 224) {
      var d = r[e++] & 63, l = r[e++] & 63;
      n[o++] = (a & 31) << 12 | d << 6 | l;
    } else if ((a & 248) === 240) {
      var d = r[e++] & 63,
        l = r[e++] & 63,
        R = r[e++] & 63,
        c = (a & 7) << 18 | d << 12 | l << 6 | R;
      c > 65535 &&
      (c -= 65536, n[o++] = c >>> 10 & 1023 | 55296, c = 56320 | c & 1023),
        n[o++] = c;
    }
  }
}
function F(r) {
  for (
    var e = 0,
      f = r.length,
      n = 0,
      i = Math.max(32, f + (f >>> 1) + 7),
      o = new Uint8Array(i >>> 3 << 3);
    e < f;
  ) {
    var t = r.charCodeAt(e++);
    if (t >= 55296 && t <= 56319) {
      if (e < f) {
        var s = r.charCodeAt(e);
        (s & 64512) === 56320 &&
          (++e, t = ((t & 1023) << 10) + (s & 1023) + 65536);
      }
      if (t >= 55296 && t <= 56319) continue;
    }
    if (n + 4 > o.length) {
      i += 8, i *= 1 + e / r.length * 2, i = i >>> 3 << 3;
      var m = new Uint8Array(i);
      m.set(o), o = m;
    }
    if ((t & 4294967168) === 0) {
      o[n++] = t;
      continue;
    } else if ((t & 4294965248) === 0) o[n++] = t >>> 6 & 31 | 192;
    else if ((t & 4294901760) === 0) {
      o[n++] = t >>> 12 & 15 | 224, o[n++] = t >>> 6 & 63 | 128;
    } else if ((t & 4292870144) === 0) {
      o[n++] = t >>> 18 & 7 | 240,
        o[n++] = t >>> 12 & 63 | 128,
        o[n++] = t >>> 6 & 63 | 128;
    } else continue;
    o[n++] = t & 63 | 128;
  }
  return o.slice ? o.slice(0, n) : o.subarray(0, n);
}
var u = "Failed to ",
  p = function (r, e, f) {
    if (r) {
      throw new Error(
        "".concat(u).concat(e, ": the '").concat(f, "' option is unsupported."),
      );
    }
  };
var x = typeof Buffer == "function" && Buffer.from;
var A = x ? w : F;
function v() {
  this.encoding = "utf-8";
}
v.prototype.encode = function (r, e) {
  return p(e && e.stream, "encode", "stream"), A(r);
};
function U(r) {
  var e;
  try {
    var f = new Blob([r], { type: "text/plain;charset=UTF-8" });
    e = URL.createObjectURL(f);
    var n = new XMLHttpRequest();
    return n.open("GET", e, !1), n.send(), n.responseText;
  } finally {
    e && URL.revokeObjectURL(e);
  }
}
var O = !x && typeof Blob == "function" && typeof URL == "function" &&
    typeof URL.createObjectURL == "function",
  S = ["utf-8", "utf8", "unicode-1-1-utf-8"],
  T = h;
x ? T = B : O && (T = function (r) {
  try {
    return U(r);
  } catch (e) {
    return h(r);
  }
});
var y = "construct 'TextDecoder'", E = "".concat(u, " ").concat(y, ": the ");
function g(r, e) {
  p(e && e.fatal, y, "fatal"), r = r || "utf-8";
  var f;
  if (
    x ? f = Buffer.isEncoding(r) : f = S.indexOf(r.toLowerCase()) !== -1, !f
  ) {
    throw new RangeError(
      "".concat(E, " encoding label provided ('").concat(r, "') is invalid."),
    );
  }
  this.encoding = r, this.fatal = !1, this.ignoreBOM = !1;
}
g.prototype.decode = function (r, e) {
  p(e && e.stream, "decode", "stream");
  var f;
  return r instanceof Uint8Array
    ? f = r
    : r.buffer instanceof ArrayBuffer
    ? f = new Uint8Array(r.buffer)
    : f = new Uint8Array(r),
    T(f, this.encoding);
};

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

class Headers {
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

const decoder = new g();
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

const encoder = new v();

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
      URLSearchParams$1.prototype.isPrototypeOf(body)
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
        URLSearchParams$1.prototype.isPrototypeOf(body)
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

class Request {
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

class Response {
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

export {
  AbortController,
  AbortSignal,
  g as TextDecoder,
  Headers,
  index as URL,
  Request,
  Response,
  URLSearchParams$1 as URLSearchParams,
  v as TextEncoder,
};
